# AI 사이트 생성 시스템 - 개발자 가이드

## 📁 디렉토리 구조
```
jeju-integrated/
├── index.html                           # 메인 페이지
├── contents/
│   ├── tab11-content.html              # AI 사이트 탭 (목록, 검색)
│   └── modules/
│       ├── site-generator.html         # 🔴 메인 로더
│       ├── site-preview.html           # 사이트 프리뷰 (기존)
│       └── generator/                  # 🆕 모듈화된 생성기
│           ├── json-parser.js          # JSON 파싱
│           ├── generator-core.js       # 핵심 로직
│           ├── generator-prompts.js    # System Prompts
│           ├── generator-file-upload.js # 파일 업로드
│           └── generator-styles.css    # 스타일
├── site-preview-standalone.html        # 독립 프리뷰 (새 탭)
└── proxy-server.js                     # DeepSeek API 프록시
```

---

## 🔧 모듈별 변수 및 함수 목록

### 1️⃣ json-parser.js

**전역 객체:** `window.GeneratorJSONParser`

**주요 메서드:**
```javascript
GeneratorJSONParser = {
    // JSON 추출 및 파싱
    extractAndParse(aiMessage, siteData)
        - 입력: AI 응답 메시지, 사이트 데이터 객체
        - 출력: 파싱된 JSON 객체 또는 null
        - 역할: JSON_DATA 패턴 찾기 → 파싱 → siteData 병합
    
    // JSON 정규화
    normalizeJSON(jsonStr)
        - 입력: JSON 문자열
        - 출력: 정규화된 JSON 문자열
        - 역할: 따옴표 통일, trailing comma 제거
    
    // 수동 파싱
    manualParse(aiMessage, siteData)
        - 입력: AI 응답, 사이트 데이터
        - 출력: 수동 파싱된 객체
        - 역할: 정규식 실패 시 키-값 쌍 추출
    
    // JSON 제거 (표시용)
    removeJSON(text)
        - 입력: 원본 텍스트
        - 출력: JSON_DATA 제거된 텍스트
        - 역할: 사용자에게 JSON 숨기기
}
```

**내부 변수:**
- 없음 (stateless 함수만)

---

### 2️⃣ generator-core.js

**전역 객체:** `window.GeneratorCore`

**전역 함수:** `window.handleGenKeypress`, `window.sendGenMessage`

**주요 상태 변수:**
```javascript
GeneratorCore = {
    siteData: {},              // 수집된 사이트 정보
    conversationHistory: [],   // AI 대화 기록
    
    // 메서드들...
}
```

**주요 메서드:**
```javascript
init()
    - 역할: 초기화, 환영 메시지 표시
    
addMessage(text, sender)
    - 입력: 메시지 내용, 발신자 ('ai' | 'user')
    - 출력: DOM 요소
    - 역할: 채팅창에 메시지 추가
    
addThinking()
    - 출력: thinking 메시지 ID
    - 역할: "생각하는 중..." 표시
    
removeMessage(id)
    - 입력: 메시지 ID
    - 역할: 메시지 제거
    
sendMessage()
    - 역할: 사용자 입력 → AI 응답 → JSON 파싱 → 완료 체크
    
getAIResponse()
    - 출력: Promise<string>
    - 역할: DeepSeek API 호출
    
checkCompletion()
    - 출력: boolean
    - 역할: 필수 필드 모두 수집되었는지 체크
    
showCollectedInfo()
    - 역할: 수집된 정보 카드 표시
    
completeSite()
    - 역할: localStorage 저장 → 새 탭 열기
```

**DOM 요소 의존성:**
- `#genChatMessages` - 채팅 메시지 컨테이너
- `#genChatInput` - 입력 필드

---

### 3️⃣ generator-prompts.js

**전역 객체:** `window.GeneratorPrompts`

**주요 데이터:**
```javascript
GeneratorPrompts = {
    structures: {
        food: {
            name: '음식점',
            sections: [...],    // 8개 섹션
            questions: [...]    // 6개 질문
        },
        government: { ... },
        medical: { ... },
        retail: { ... }
    },
    
    getSystemPrompt(siteData)
        - 입력: 현재 수집된 사이트 데이터
        - 출력: System Prompt 문자열
        - 역할: 업종별 맞춤 프롬프트 생성
}
```

**수정 방법:**
```javascript
// 새 업종 추가 예시
structures.education = {
    name: '교육기관',
    sections: ['hero', 'courses', 'teachers', 'tuition'],
    questions: [
        '어떤 과정을 제공하나요?',
        '강사진 구성은?'
    ]
};
```

---

### 4️⃣ generator-file-upload.js

**전역 객체:** `window.GeneratorFileUpload`

**전역 함수:** `window.handleFileUpload`, `window.removeFile`

**주요 상태 변수:**
```javascript
GeneratorFileUpload = {
    uploadedFiles: [],   // 업로드된 파일 배열
    
    // [{
    //     type: 'image' | 'video' | 'audio',
    //     name: 'filename.jpg',
    //     mimeType: 'image/jpeg',
    //     data: 'data:image/jpeg;base64,...',
    //     uploadedAt: '2025-12-13T...'
    // }]
}
```

**주요 메서드:**
```javascript
handleUpload(event, type)
    - 입력: File input event, 파일 타입
    - 역할: 파일 → Base64 → uploadedFiles 추가
    
fileToBase64(file)
    - 입력: File 객체
    - 출력: Promise<string> (Base64)
    
addPreview(fileData, index)
    - 입력: 파일 데이터, 인덱스
    - 역할: 미리보기 썸네일 추가
    
removeFile(index)
    - 입력: 파일 인덱스
    - 역할: uploadedFiles에서 제거
```

**DOM 요소 의존성:**
- `#filePreviewArea` - 미리보기 컨테이너

---

### 5️⃣ site-generator.html (메인 로더)

**구조:**
```html
<!-- 1. JavaScript 로드 (순서 중요!) -->
<script src="contents/modules/generator/json-parser.js"></script>
<script src="contents/modules/generator/generator-prompts.js"></script>
<script src="contents/modules/generator/generator-file-upload.js"></script>
<script src="contents/modules/generator/generator-core.js"></script>

<!-- 2. CSS -->
<link rel="stylesheet" href="contents/modules/generator/generator-styles.css">

<!-- 3. HTML -->
<div class="gen-container">...</div>

<!-- 4. 이벤트 바인딩 -->
<script>
(function() {
    // DOM 요소에 이벤트 리스너 추가
    // inline handler 없이 addEventListener 사용
})();
</script>
```

**이벤트 바인딩:**
```javascript
// 전송 버튼
sendBtn.addEventListener('click', () => GeneratorCore.sendMessage());

// Enter 키
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        GeneratorCore.sendMessage();
    }
});

// 파일 업로드
imageUpload.addEventListener('change', (e) => 
    GeneratorFileUpload.handleUpload(e, 'image')
);
```

---

## 🔄 데이터 흐름
```
사용자 입력
    ↓
GeneratorCore.sendMessage()
    ↓
conversationHistory.push(user message)
    ↓
getAIResponse() → DeepSeek API
    ↓
AI 응답 받음
    ↓
GeneratorJSONParser.extractAndParse(aiMessage, siteData)
    ↓
siteData 업데이트
    ↓
showCollectedInfo() → 화면 표시
    ↓
checkCompletion() → 완료 체크
    ↓
completeSite() → localStorage + 새 탭
```

---

## 🛠️ 수정 가이드

### 📌 새로운 업종 추가

**파일:** `generator-prompts.js`
```javascript
// 1. structures에 추가
structures.construction = {
    name: '건설업',
    sections: [
        'hero',
        'projects',
        'certifications',
        'equipment',
        'team',
        'contact'
    ],
    questions: [
        '주요 공사 분야는?',
        '보유 장비는?',
        '자격증/면허는?',
        '과거 프로젝트 사례는?'
    ]
};
```

**테스트:**
1. 브라우저 새로고침
2. "건설업"이라고 입력
3. AI가 해당 질문들을 하는지 확인

---

### 📌 필수 필드 변경

**파일:** `generator-core.js`
```javascript
// checkCompletion() 메서드 수정
checkCompletion: function() {
    const required = [
        'businessType',
        'businessName',
        'phone',
        'email',
        'address',
        'industry',
        'description',
        // 'website'  // 새로운 필수 필드 추가
    ];
    return required.every(field => this.siteData[field]);
}
```

---

### 📌 JSON 파싱 규칙 수정

**파일:** `json-parser.js`
```javascript
// normalizeJSON() 메서드에 규칙 추가
normalizeJSON: function(jsonStr) {
    return jsonStr
        .replace(/'/g, '"')
        .replace(/(\w+):/g, '"$1":')
        .replace(/,\s*}/g, '}')
        .replace(/,\s*]/g, ']')
        // 새로운 정규화 규칙 추가
        .replace(/\s+/g, ' ')  // 공백 정규화
        .trim();
}
```

---

### 📌 스타일 수정

**파일:** `generator-styles.css`
```css
/* 채팅 버블 색상 변경 */
.gen-bubble.ai {
    background: white;
    border: 2px solid #E5E7EB;
    /* background: #F0F9FF;  /* 새로운 색상 */
}

/* 전송 버튼 색상 변경 */
.gen-send-btn {
    background: #0B4DA2;
    /* background: #10B981;  /* 녹색으로 변경 */
}
```

---

### 📌 파일 크기 제한 변경

**파일:** `generator-file-upload.js`
```javascript
handleUpload: async function(event, type) {
    // 파일 크기 제한 수정
    const maxSize = type === 'image' ? 5 : 
                    type === 'video' ? 50 : 10;
    
    // const maxSize = type === 'image' ? 10 :   // 10MB로 증가
    //                 type === 'video' ? 100 :  // 100MB로 증가
    //                 20;                        // 오디오 20MB
}
```

---

## 🐛 디버깅 가이드

### 문제 1: GeneratorCore not loaded

**원인:** JavaScript 파일 로드 실패

**확인:**
```bash
# 파일 존재 확인
ls -la contents/modules/generator/*.js

# 브라우저 Network 탭 확인
# 404 오류가 있는지 확인
```

**해결:**
```bash
# 파일 경로 확인
grep -n "generator-core.js" contents/modules/site-generator.html

# 상대 경로가 올바른지 확인
```

---

### 문제 2: JSON 파싱 실패

**원인:** AI가 잘못된 JSON 형식 생성

**확인:**
```javascript
// json-parser.js의 extractAndParse에 로그 추가
console.log('원본 AI 메시지:', aiMessage);
console.log('추출된 JSON:', jsonStr);
```

**해결:**
```javascript
// normalizeJSON()에 더 많은 정규화 규칙 추가
// 또는 manualParse() 로직 강화
```

---

### 문제 3: 파일 업로드 안 됨

**원인:** MIME type 또는 크기 문제

**확인:**
```javascript
// generator-file-upload.js에 로그 추가
console.log('파일:', file.name, file.type, file.size);
```

**해결:**
```javascript
// accept 속성 확장
<input type="file" accept="image/*,image/heic,image/heif">
```

---

## 📊 변수 의존성 맵
```
GeneratorCore
├── siteData (상태)
│   └── GeneratorJSONParser.extractAndParse()에서 업데이트
├── conversationHistory (상태)
│   └── sendMessage()에서 추가
└── uploadedFiles (의존)
    └── GeneratorFileUpload.uploadedFiles 참조

GeneratorJSONParser
└── stateless (상태 없음)

GeneratorPrompts
├── structures (정적 데이터)
└── getSystemPrompt()
    └── siteData 읽기

GeneratorFileUpload
└── uploadedFiles (상태)
    └── completeSite()에서 siteData.gallery로 복사
```

---

## 🔒 보안 고려사항

### 1. XSS 방지
```javascript
// addMessage()에서 텍스트 이스케이프
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

### 2. 파일 크기 제한
- 이미지: 5MB
- 동영상: 50MB
- 오디오: 10MB

### 3. Base64 용량 주의
- localStorage는 5-10MB 제한
- 파일 많으면 용량 초과 가능

---

## 📝 코드 컨벤션

### 변수 명명
```javascript
// 카멜케이스
let siteData = {};
let conversationHistory = [];

// 상수는 대문자
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// 함수는 동사로 시작
function sendMessage() {}
function getAIResponse() {}
```

### 함수 구조
```javascript
// 주석 필수
/**
 * AI 응답 파싱 및 데이터 추출
 * @param {string} aiMessage - AI 응답 메시지
 * @param {object} siteData - 사이트 데이터 객체
 * @returns {object|null} 파싱된 데이터 또는 null
 */
extractAndParse: function(aiMessage, siteData) {
    // ...
}
```

---

## 🚀 배포 체크리스트

- [ ] 모든 .js 파일 존재 확인
- [ ] 경로가 올바른지 확인
- [ ] proxy-server.js 실행 중
- [ ] localStorage 초기화 (테스트용)
- [ ] 브라우저 캐시 삭제
- [ ] 다양한 업종으로 테스트
- [ ] 파일 업로드 테스트
- [ ] 새 탭 프리뷰 작동 확인

---

## 📞 도움말

### 로그 활성화
```javascript
// 모든 모듈 상단에 추가
const DEBUG = true;

function log(...args) {
    if (DEBUG) console.log('[ModuleName]', ...args);
}
```

### 완전 초기화
```javascript
// 브라우저 Console에서
localStorage.clear();
location.reload(true);
```

---

**작성일:** 2025-12-13
**버전:** 1.0.0
**작성자:** Claude AI
**문의:** 각 파일 상단 주석 참조
