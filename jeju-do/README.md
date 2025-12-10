# 제주특별자치도 AI 시스템

제주특별자치도 정부 업무 자동화를 위한 AI 기반 통합 시스템

## 🎯 프로젝트 개요

이 시스템은 제주특별자치도의 행정 업무를 AI로 자동화하고, 도민과 단체가 개인데이터금고(PDV)를 통해 서류를 안전하게 관리할 수 있도록 지원합니다.

### 주요 기능

- **개인데이터금고(PDV)**: 도민 및 단체의 서류 중앙 관리
- **AWS DynamoDB 연동**: 클라우드 기반 데이터 저장소
- **실시간 동기화**: 모든 기기에서 데이터 접근 가능
- **정부 부서 자동화**: 제주도청, 제주시청, 서귀포시청
- **OpenHash 기술**: 블록체인 대체 해시 체인 시스템

## 🏗 시스템 아키텍처
```
[브라우저] ←→ [API Client] ←→ [Node.js API:3001] ←→ [DynamoDB]
                                        ↓
                                  [localStorage 폴백]
```

### 기술 스택

**프론트엔드:**
- Vanilla JavaScript (ES6+)
- HTML5 + CSS3
- 반응형 디자인

**백엔드:**
- Node.js 20.x
- Express.js 5.2
- AWS SDK v3

**데이터베이스:**
- AWS DynamoDB (us-east-1)
- Pay-per-request 모드

**인프라:**
- Ubuntu 24.04 (EC2)
- Nginx
- PM2 (추후 적용 예정)

## 📁 파일 구조
```
jeju-do/
├── index.html              # 메인 페이지
├── server.js               # Node.js API 서버
├── package.json            # Node.js 의존성
├── .env                    # 환경 변수 (Git 제외)
├── .gitignore              # Git 제외 목록
├── css/
│   ├── style.css          # 기본 스타일
│   ├── main.css           # 메인 스타일
│   ├── mypage.css         # My Page 스타일
│   └── dept.css           # 부서별 스타일
├── js/
│   ├── api-client.js      # API 통신 클라이언트
│   ├── pdv-manager.js     # PDV 관리 (API 기반)
│   ├── auth.js            # 인증 시스템
│   ├── mypage.js          # My Page 로직
│   ├── main.js            # 메인 애플리케이션
│   └── ...                # 기타 모듈
└── tabs/
    ├── mypage.html        # My Page 템플릿
    ├── dochung.html       # 도청 탭
    ├── jejusi.html        # 제주시청 탭
    └── seogwipo.html      # 서귀포시청 탭
```

## 🚀 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/team-jupeter/government-ai-systems.git
cd government-ai-systems/jeju-do
```

### 2. Node.js 패키지 설치
```bash
npm install
```

### 3. 환경 변수 설정

`.env` 파일 생성:
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
DYNAMODB_TABLE_NAME=jeju-pdv-data
PORT=3001
NODE_ENV=production
```

⚠️ **주의**: `.env` 파일은 절대 Git에 커밋하지 마세요!

### 4. API 서버 실행

**개발 모드:**
```bash
npm run dev
```

**프로덕션 모드:**
```bash
npm start
```

**백그라운드 실행:**
```bash
nohup npm start > server.log 2>&1 &
```

### 5. 웹 서버 접속

- **로컬**: http://localhost:3001
- **외부**: http://your-server-ip:3001

## 🔐 보안 설정

### AWS 보안 그룹

포트 3001을 인바운드 규칙에 추가:
- 유형: 사용자 지정 TCP
- 포트: 3001
- 소스: 0.0.0.0/0 (또는 특정 IP)

### 방화벽 (UFW)
```bash
sudo ufw allow 3001/tcp
sudo ufw status
```

## 📊 API 엔드포인트

### 헬스 체크
```
GET /health
```

### PDV 관리
```
GET    /api/pdv                    # 모든 PDV 조회
GET    /api/pdv/:pdvId             # PDV ID로 조회
GET    /api/pdv/phone/:phoneNumber # 전화번호로 조회
POST   /api/pdv                    # PDV 생성
PUT    /api/pdv/:pdvId             # PDV 업데이트
DELETE /api/pdv/:pdvId             # PDV 삭제
```

### 예시
```bash
# PDV 조회
curl http://localhost:3001/api/pdv

# 특정 PDV 조회
curl http://localhost:3001/api/pdv/PDV-12345

# 전화번호로 조회
curl http://localhost:3001/api/pdv/phone/064-111-1111
```

## 🧪 테스트

### 테스트 계정

**개인 사용자:**
- 전화번호: 064-111-1111 (김민준)
- 전화번호: 064-222-2222 (이서연)

**단체 사용자:**
- 전화번호: 064-700-1000 (제주IT산업 주식회사)
- 전화번호: 064-700-5000 (제주국제학교)

### 기능 테스트

1. **로그인**: 테스트 전화번호로 로그인
2. **My Page**: 서류 추가/제거 확인
3. **탭 전환**: 모든 탭 정상 작동 확인
4. **데이터 동기화**: 다른 브라우저에서 동일 계정 확인

## 🛠 개발

### 로컬 개발 환경
```bash
# API 서버 시작
npm run dev

# 로그 확인
tail -f server.log
```

### 브라우저 개발자 도구

- F12 → Console: JavaScript 에러 확인
- F12 → Network: API 호출 확인
- F12 → Application: localStorage 확인

## 📝 주요 변경사항

### v1.1.0 (2025-12-10)
- ✅ AWS DynamoDB 통합
- ✅ Node.js API 서버 구축
- ✅ 프론트엔드 API 연동
- ✅ async/await 완전 적용
- ✅ My Page 이중 리스트박스
- ✅ 17개 테스트 데이터

### v1.0.0 (2025-12-09)
- ✅ 초기 시스템 구축
- ✅ localStorage 기반 PDV
- ✅ 정부 부서별 페이지

## 🔄 향후 계획

- [ ] HTTPS 설정 (SSL/TLS)
- [ ] JWT 인증 시스템
- [ ] 서류 파일 업로드 (S3)
- [ ] 실시간 알림 (WebSocket)
- [ ] PM2 프로세스 관리
- [ ] CloudWatch 모니터링
- [ ] 자동 백업 시스템

## 🤝 기여

이 프로젝트는 제주특별자치도 AI 자동화 시스템입니다.

## 📄 라이선스

Copyright © 2024-2025 Team Jupeter. All rights reserved.

## 📞 문의

- GitHub: https://github.com/team-jupeter/government-ai-systems
- 프로젝트: 제주특별자치도 AI 시스템

---

**Made with ❤️ by Team Jupeter**
