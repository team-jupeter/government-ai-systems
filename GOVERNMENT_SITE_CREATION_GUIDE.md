# 정부 기관 사이트 작성 완벽 가이드

> **작성일:** 2025-12-01  
> **기준 사이트:** 대통령실 (http://100.30.14.224/presidential-office/)  
> **기술 스택:** HTML5, CSS3, JavaScript, OpenHash, Claude AI

---

## 📋 목차

1. [사전 준비](#1-사전-준비)
2. [디렉토리 구조](#2-디렉토리-구조)
3. [메인 페이지 작성](#3-메인-페이지-작성)
4. [서브 모듈 작성](#4-서브-모듈-작성)
5. [공통 컴포넌트 적용](#5-공통-컴포넌트-적용)
6. [체크리스트](#6-체크리스트)

---

## 1. 사전 준비

### 1.1 기관 정보 수집 (웹 검색)

새 정부 기관 사이트를 작성하기 전에 반드시 웹 검색으로 다음 정보를 수집하세요:
```bash
# 예시: 교육부 사이트를 만든다면
웹 검색 키워드:
- "교육부 조직도"
- "교육부 주요 업무"
- "교육부 산하 기관"
- "교육부 부서 역할"
```

**수집해야 할 정보:**
- ✅ 기관의 주요 역할 및 미션
- ✅ 조직도 (실/국/과 구조)
- ✅ 각 부서의 주요 업무
- ✅ 산하기관 목록
- ✅ 주요 정책 및 서비스

### 1.2 디렉토리 생성
```bash
cd /var/www/government-ai-systems

# 예시: 교육부
sudo mkdir -p education
sudo mkdir -p education/divisions
```

---

## 2. 디렉토리 구조

모든 정부 기관은 다음 구조를 따릅니다:
```
/var/www/government-ai-systems/
├── common/                          # 공통 컴포넌트 (전체 기관 공유)
│   ├── floating-chat.css           # AI 상담창 스타일
│   └── floating-chat.js            # AI 상담창 로직
├── [기관명]/                        # 예: education, healthcare
│   ├── index.html                  # 메인 페이지
│   └── divisions/                  # 서브 모듈 (각 부서)
│       ├── [부서1].html
│       ├── [부서2].html
│       └── ...
└── api/                            # 백엔드 API (전체 기관 공유)
    └── server.js
```

---

## 3. 메인 페이지 작성

### 3.1 기본 템플릿

메인 페이지(`index.html`)는 다음 구조를 따릅니다:
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[기관명] AI 자동화 시스템 | 국가 자동화</title>
    
    <!-- 폰트 -->
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- 🔥 공통 컴포넌트 (필수!) -->
    <link rel="stylesheet" href="/common/floating-chat.css">
    <script src="/common/floating-chat.js"></script>
    
    <style>
        /* CSS는 GOVERNMENT_SITE_GUIDELINE.md 참조 */
        /* 핵심 원칙: 
           - 색상: 파란색 계열만 (#0046FF, #0066CC)
           - 배경: 흰색, 연한 회색
           - 폰트: Noto Sans KR
        */
    </style>
</head>
<body>
    <!-- 상단 바 -->
    <nav class="top-bar">
        <div>OpenHash 기술 실증을 위한 [기관명] 자동화 시범 프로젝트</div>
        <div>
            <a href="/portal/">포털</a>
            <a href="/portal/government.html">행정부</a>
            <a href="/openhash.html" target="_blank">OpenHash 기술</a>
        </div>
    </nav>

    <!-- 헤더 (파란색 그라데이션) -->
    <header class="header" style="position: relative;">
        <!-- 🔥 우측 상단 OpenHash 배너 (필수!) -->
        <div style="position: absolute; top: 1rem; right: 2rem;">
            <a href="/openhash.html" target="_blank" 
               style="background: rgba(255,255,255,0.2); color: white; padding: 0.5rem 1rem; border-radius: 8px; text-decoration: none; font-size: 0.9rem; font-weight: 500;">
                📘 OpenHash 기술 설명
            </a>
        </div>
        
        <div class="header-badge">
            <i class="fas fa-shield-alt"></i> OpenHash 기반 시스템
        </div>
        <h1>🏛️ [기관명] AI 자동화 시스템</h1>
        <p>[영문명]</p>
    </header>

    <!-- 네비게이션 탭 -->
    <div class="nav-tabs">
        <div class="nav-tab active" onclick="switchTab('organization')">
            <i class="fas fa-sitemap"></i> 조직도
        </div>
        <div class="nav-tab" onclick="switchTab('agents')">
            <i class="fas fa-robot"></i> AI 에이전트
        </div>
        <div class="nav-tab" onclick="switchTab('collaboration')">
            <i class="fas fa-link"></i> 연동 기관
        </div>
        <div class="nav-tab" onclick="switchTab('stats')">
            <i class="fas fa-chart-line"></i> 시스템 상태
        </div>
    </div>

    <!-- 메인 컨테이너 -->
    <main class="main-container">
        <!-- 탭 1: 조직도 -->
        <div id="organization" class="tab-content active">
            <div class="org-chart">
                <h2 class="org-title">🏛️ [기관명] AI 에이전트 조직도</h2>
                <p class="org-subtitle">각 부서 클릭 시 상세 정보 확인</p>
                
                <!-- 🔥 조직도는 웹 검색한 실제 구조를 반영! -->
                <!-- 예시: 장관 → 차관 → 실/국 → 과 -->
                
                <div class="org-grid">
                    <a href="divisions/[부서1].html" target="_blank" class="org-box">
                        [부서1명]<br><small>X Agents</small>
                    </a>
                    <!-- ... 반복 -->
                </div>
            </div>
        </div>

        <!-- 탭 2, 3, 4는 대통령실 패턴 참조 -->
    </main>

    <!-- 푸터 -->
    <footer class="footer">
        <p>© 2025 [기관명] AI 자동화 시스템 | OpenHash 기술 실증 프로젝트</p>
    </footer>

    <!-- JavaScript -->
    <script>
        function switchTab(tabName) {
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            document.getElementById(tabName).classList.add('active');
            event.target.closest('.nav-tab').classList.add('active');
        }
    </script>
</body>
</html>
```

### 3.2 핵심 요소 체크리스트

메인 페이지에 **반드시** 포함해야 하는 요소:

- [ ] **공통 컴포넌트 로드**
```html
  <link rel="stylesheet" href="/common/floating-chat.css">
  <script src="/common/floating-chat.js"></script>
```

- [ ] **우측 상단 OpenHash 배너**
```html
  <div style="position: absolute; top: 1rem; right: 2rem;">
      <a href="/openhash.html" target="_blank" ...>📘 OpenHash 기술 설명</a>
  </div>
```

- [ ] **헤더에 `position: relative` 설정**
```html
  <header class="header" style="position: relative;">
```

- [ ] **조직도의 각 부서를 `<a>` 태그로 링크**
```html
  <a href="divisions/[부서명].html" target="_blank" class="org-box">
      [부서명]<br><small>X Agents</small>
  </a>
```

---

## 4. 서브 모듈 작성

### 4.1 서브 모듈 템플릿

각 부서별 상세 페이지는 다음 구조를 따릅니다:
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>[부서명] | [기관명]</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- 🔥 공통 컴포넌트 (필수!) -->
    <link rel="stylesheet" href="/common/floating-chat.css">
    <script src="/common/floating-chat.js"></script>
    
    <style>
        /* 동일한 CSS (GOVERNMENT_SITE_GUIDELINE.md 참조) */
    </style>
</head>
<body>
    <nav class="top-bar">
        <div>[기관명] [부서명]</div>
        <div>
            <a href="/[기관명]/">메인</a>
            <a href="/portal/">포털</a>
        </div>
    </nav>

    <header class="header">
        <h1>📋 [부서명]</h1>
        <p>[영문명]</p>
    </header>

    <main class="container">
        <!-- 섹션 1: 부서 소개 -->
        <div class="section">
            <h2>[부서명] 소개</h2>
            <p>[웹 검색으로 찾은 부서 역할 및 미션]</p>
        </div>

        <!-- 섹션 2: 주요 업무 -->
        <div class="section">
            <h2>주요 업무</h2>
            <ul>
                <li><strong>[업무1]:</strong> [설명]</li>
                <li><strong>[업무2]:</strong> [설명]</li>
                <!-- 웹 검색으로 찾은 실제 업무 -->
            </ul>
        </div>

        <!-- 섹션 3: AI 에이전트 -->
        <div class="section">
            <h2>AI 에이전트 (X개)</h2>
            <ul>
                <li><strong>[에이전트명]:</strong> [기능 설명]</li>
                <!-- 각 업무에 맞는 AI 에이전트 설계 -->
            </ul>
        </div>

        <!-- 🔥 섹션 4: 국가데이터처 연동 (필수!) -->
        <div class="section">
            <h2>🔗 국가데이터처 연동</h2>
            <div class="data-flow">
                <h3>📥 입력 데이터 (국가데이터처로부터)</h3>
                <ul>
                    <li>[연동 기관1]: [데이터 종류]</li>
                    <li>[연동 기관2]: [데이터 종류]</li>
                    <!-- 이 부서가 받아야 할 데이터 -->
                </ul>
            </div>
            <div class="data-flow">
                <h3>📤 출력 데이터 (국가데이터처로)</h3>
                <ul>
                    <li>[생성 데이터1]</li>
                    <li>[생성 데이터2]</li>
                    <!-- 이 부서가 생성하는 데이터 -->
                </ul>
            </div>
        </div>

        <!-- 섹션 5: 실시간 현황 -->
        <div class="section">
            <h2>실시간 운영 현황</h2>
            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value">X</div>
                    <div class="stat-label">AI 에이전트</div>
                </div>
                <!-- 추가 통계 -->
            </div>
        </div>
    </main>

    <footer class="footer">
        <p>© 2025 [기관명] [부서명] | OpenHash 기반 시스템</p>
    </footer>
</body>
</html>
```

### 4.2 서브 모듈 작성 가이드

**단계별 프로세스:**

1. **웹 검색으로 부서 정보 수집**
```bash
   # 예: 교육부 > 교육과정정책관
   검색 키워드: "교육과정정책관 역할", "교육과정정책관 업무"
```

2. **주요 업무 파악 및 나열**
   - 검색 결과를 바탕으로 3~5개 핵심 업무 추출

3. **AI 에이전트 설계**
   - 각 업무에 필요한 AI 에이전트 기능 정의
   - 예: "교육과정 분석 AI", "교과서 검토 AI" 등

4. **국가데이터처 연동 설계**
   - **입력:** 이 부서가 업무 수행에 필요한 데이터
   - **출력:** 이 부서가 생성하는 결과물

---

## 5. 공통 컴포넌트 적용

### 5.1 Floating AI 상담창

**모든 페이지에 자동으로 표시됩니다!**

공통 컴포넌트를 로드하기만 하면:
```html
<link rel="stylesheet" href="/common/floating-chat.css">
<script src="/common/floating-chat.js"></script>
```

**특징:**
- ✅ 우측 하단 "?" 버튼 자동 생성
- ✅ 현재 페이지와 부서 자동 인식
- ✅ Claude AI 기반 업무 지원
- ✅ OpenHash 3-Layer 기록 시스템
- ✅ 크기 조절 가능 (드래그)

**사용자 경험:**
1. 공무원이 "?" 버튼 클릭
2. 채팅창에서 질문 입력 (예: "보고서 작성해줘")
3. AI가 현재 부서 맥락을 고려하여 답변
4. 모든 대화는 OpenHash에 자동 기록

### 5.2 백엔드 API

이미 구축된 API 서버를 사용합니다:
```
http://100.30.14.224:3000/api/chat
```

**새 기관을 추가해도 API 수정 불필요!**  
API는 요청에서 `department` 정보를 자동으로 받아 처리합니다.

---

## 6. 체크리스트

### 6.1 작업 시작 전

- [ ] 기관/부서 정보 웹 검색 완료
- [ ] 조직도 구조 파악 완료
- [ ] 각 부서 주요 업무 3~5개 정리 완료
- [ ] 디렉토리 생성 완료

### 6.2 메인 페이지 작성 후

- [ ] 공통 컴포넌트 로드 확인
- [ ] 우측 상단 OpenHash 배너 존재
- [ ] 헤더에 `position: relative` 설정
- [ ] 조직도의 모든 부서가 `<a>` 태그로 링크
- [ ] 4개 탭 모두 작동 (조직도, AI, 연동, 상태)
- [ ] 푸터 정보 정확

### 6.3 서브 모듈 작성 후

- [ ] 공통 컴포넌트 로드 확인
- [ ] 부서명과 업무 정보 정확
- [ ] AI 에이전트 X개 명시
- [ ] 국가데이터처 연동 섹션 존재
  - [ ] 📥 입력 데이터 나열
  - [ ] 📤 출력 데이터 나열
- [ ] 통계 카드 데이터 합리적

### 6.4 전체 테스트

- [ ] 브라우저에서 메인 페이지 열기
- [ ] 우측 하단 "?" 버튼 클릭
- [ ] AI 상담창 정상 작동
- [ ] "오픈해시란?" 링크 클릭 → 설명 페이지 이동
- [ ] 조직도 각 부서 클릭 → 서브 모듈 페이지 열림
- [ ] 서브 모듈에서도 "?" 버튼 작동
- [ ] AI가 현재 부서를 정확히 인식

---

## 7. 실제 작업 예시

### 예시: 보건복지부 사이트 생성
```bash
# 1. 웹 검색
웹 검색: "보건복지부 조직도", "보건복지부 주요 업무"

# 2. 정보 정리
기관명: 보건복지부
영문명: Ministry of Health and Welfare
주요 부서: 
  - 보건의료정책실
  - 사회복지정책실
  - 인구정책실
  - 연금정책국
  등...

# 3. 디렉토리 생성
cd /var/www/government-ai-systems
sudo mkdir -p healthcare
sudo mkdir -p healthcare/divisions

# 4. 메인 페이지 작성
sudo nano healthcare/index.html
# 위 템플릿을 복사하고 [기관명] → 보건복지부로 교체

# 5. 서브 모듈 작성
sudo nano healthcare/divisions/health-policy.html
# 보건의료정책실 페이지 작성
# 웹 검색한 업무 정보 반영

# 6. 테스트
# 브라우저: http://100.30.14.224/healthcare/
```

---

## 8. 주의사항

### 8.1 절대 하지 말 것

❌ 공통 컴포넌트 파일 수정 (`/common/floating-chat.js`, `.css`)  
❌ 다른 색상 사용 (파란색 이외)  
❌ React, Vue 등 프레임워크 사용  
❌ 국가데이터처 연동 섹션 생략  
❌ OpenHash 배너 생략

### 8.2 반드시 할 것

✅ 웹 검색으로 실제 정보 수집  
✅ 모든 페이지에 공통 컴포넌트 로드  
✅ 정부24 스타일 유지 (밝고 깔끔)  
✅ HTML5 표준 준수  
✅ 링크는 새 탭에서 열기 (`target="_blank"`)

---

## 9. CSS 참조

모든 페이지에 사용할 공통 CSS는 `/var/www/government-ai-systems/GOVERNMENT_SITE_GUIDELINE.md`에 상세히 기술되어 있습니다.

**핵심 클래스:**
- `.org-box`: 조직도 카드
- `.section`: 섹션 컨테이너
- `.data-flow`: 데이터 연동 박스
- `.stat-box`: 통계 카드

---

## 10. 문제 해결

### Q1. "?" 버튼이 안 보여요
**A:** 공통 컴포넌트가 로드되었는지 확인하세요.
```html
<link rel="stylesheet" href="/common/floating-chat.css">
<script src="/common/floating-chat.js"></script>
```

### Q2. AI 상담창이 작동하지 않아요
**A:** API 서버 상태를 확인하세요.
```bash
pm2 status
pm2 logs government-ai-api
```

### Q3. 디자인이 깨졌어요
**A:** CSS를 건드렸는지 확인하고, GOVERNMENT_SITE_GUIDELINE.md를 참조하세요.

---

## 11. 완성 예시

**작성 완료된 사이트:**
- 대통령실: http://100.30.14.224/presidential-office/
  - 서브 모듈 15개 (3실장 + 12수석)
  - AI 상담창 정상 작동
  - 국가데이터처 연동 설계

---

## 12. 추가 리소스

- **OpenHash 설명:** http://100.30.14.224/openhash.html
- **디자인 가이드:** /var/www/government-ai-systems/GOVERNMENT_SITE_GUIDELINE.md
- **API 문서:** /var/www/government-ai-systems/api/server.js

---

## 📞 도움말

이 가이드를 따라도 문제가 있다면:
1. 대통령실 사이트 코드를 참조하세요
2. GOVERNMENT_SITE_GUIDELINE.md를 다시 읽으세요
3. 공통 컴포넌트가 제대로 로드되었는지 확인하세요

**성공의 핵심:** 웹 검색 → 정보 정리 → 템플릿 적용 → 테스트

---

**작성 완료일:** 2025-12-01  
**버전:** 1.0  
**기준 사이트:** 대통령실 AI 자동화 시스템
