# 🏛️ 정부 기관 사이트 작성 지침서

**OpenHash 기반 국가 자동화 플랫폼 - 정부 기관 웹사이트 디자인 & 개발 가이드**

---

## 📋 목차

1. [개요](#개요)
2. [디자인 철학](#디자인-철학)
3. [색상 체계](#색상-체계)
4. [타이포그래피](#타이포그래피)
5. [레이아웃 구조](#레이아웃-구조)
6. [컴포넌트 가이드](#컴포넌트-가이드)
7. [기술 스택](#기술-스택)
8. [코드 예제](#코드-예제)
9. [체크리스트](#체크리스트)

---

## 개요

### 목적
OpenHash 기술 실증을 위한 정부 기관 웹사이트의 일관된 디자인과 사용자 경험 제공

### 대상
- 중앙행정기관 (19부 3처 20청 8위원회)
- 입법부, 사법부
- 사회 인프라 자동화 시스템

### 핵심 원칙
1. **일관성**: 모든 정부 기관 사이트가 통일된 디자인 언어 사용
2. **접근성**: 모든 사용자가 쉽게 이용 가능
3. **전문성**: 신뢰할 수 있는 정부 기관의 이미지
4. **효율성**: 빠른 정보 접근과 명확한 구조

---

## 디자인 철학

### 정부24 스타일
- **밝고 깔끔한 디자인**: 흰색 배경 기반
- **파란색 강조**: 신뢰와 안정감
- **심플함**: 불필요한 장식 최소화
- **전문적**: 공공 서비스의 권위

### 디자인 키워드
```
밝음 | 깔끔함 | 심플함 | 전문적 | 신뢰감 | 접근성
```

---

## 색상 체계

### 주요 색상 팔레트
```css
:root {
    /* 메인 블루 (강조색) */
    --gov-blue: #0046FF;
    --gov-blue-mid: #1E40AF;
    --gov-blue-dark: #0066CC;
    --gov-navy: #1e3a5f;
    
    /* 배경색 */
    --bg-white: #ffffff;
    --bg-light: #f8f9fa;
    --bg-gray: #f3f4f6;
    
    /* 텍스트 */
    --text-primary: #212529;
    --text-secondary: #6b7280;
    --text-tertiary: #9ca3af;
    
    /* 테두리 */
    --border-light: #e5e7eb;
    --border-medium: #d1d5db;
    
    /* 상태 색상 */
    --success: #10b981;
    --warning: #f59e0b;
    --error: #ef4444;
    --info: #3b82f6;
}
```

### 색상 사용 규칙

#### ✅ 권장 사용
- **배경**: white, #f8f9fa, #f3f4f6
- **텍스트**: #212529 (제목), #6b7280 (본문)
- **강조**: 파란색 그라데이션만 사용

#### ❌ 금지 사항
- 다크 배경 (bg-gray-900 등)
- 다양한 색상 혼용 (빨강, 노랑, 보라 등)
- 흰색 텍스트 (다크 테마)

### 그라데이션
```css
/* 메인 헤더용 */
.gradient-header {
    background: linear-gradient(135deg, #0046FF 0%, #1E40AF 50%, #0066CC 100%);
}

/* 카드 강조용 */
.gradient-card {
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
}
```

---

## 타이포그래피

### 폰트 패밀리
```css
font-family: 'Noto Sans KR', 'Malgun Gothic', '맑은 고딕', 
             -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### 폰트 크기 체계
```css
/* 제목 */
h1 { font-size: 2.5rem; font-weight: 700; }      /* 40px */
h2 { font-size: 2rem; font-weight: 700; }        /* 32px */
h3 { font-size: 1.5rem; font-weight: 600; }      /* 24px */
h4 { font-size: 1.25rem; font-weight: 600; }     /* 20px */

/* 본문 */
.text-large { font-size: 1.125rem; }              /* 18px */
.text-base { font-size: 1rem; }                   /* 16px */
.text-small { font-size: 0.875rem; }              /* 14px */
.text-xs { font-size: 0.75rem; }                  /* 12px */
```

### 폰트 굵기
```css
font-weight: 300;  /* Light - 거의 사용 안 함 */
font-weight: 400;  /* Regular - 본문 */
font-weight: 500;  /* Medium - 강조 본문 */
font-weight: 600;  /* SemiBold - 소제목 */
font-weight: 700;  /* Bold - 제목 */
```

---

## 레이아웃 구조

### 기본 페이지 구조
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[기관명] | 국가 자동화</title>
    <!-- 폰트 -->
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- 아이콘 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- 헤더 -->
    <header class="header">
        <!-- 네비게이션 -->
    </header>
    
    <!-- 메인 컨텐츠 -->
    <main class="main-content">
        <!-- 페이지 내용 -->
    </main>
    
    <!-- 푸터 -->
    <footer class="footer">
        <!-- 저작권 정보 -->
    </footer>
    
    <!-- Floating Button (선택) -->
    <button class="floating-button">
        <i class="fas fa-question"></i>
    </button>
</body>
</html>
```

### 헤더 구조
```html
<header class="header">
    <!-- 메인 헤더 -->
    <div class="header-main">
        <div class="badge">🔐 OpenHash 기반</div>
        <h1>🏛️ [기관명] AI 자동화 시스템</h1>
        <p>[기관 설명]</p>
    </div>
    
    <!-- 네비게이션 -->
    <nav class="nav">
        <a href="/portal/">포털</a>
        <a href="/portal/government.html">행정부</a>
        <a href="#about">소개</a>
        <a href="#features">기능</a>
    </nav>
</header>
```

### 콘텐츠 영역
```html
<main class="main-content">
    <!-- 섹션 1: 소개 -->
    <section class="section">
        <h2>시스템 소개</h2>
        <div class="grid-3">
            <!-- 카드들 -->
        </div>
    </section>
    
    <!-- 섹션 2: 기능 -->
    <section class="section">
        <h2>주요 기능</h2>
        <!-- 내용 -->
    </section>
</main>
```

---

## 컴포넌트 가이드

### 1. 카드 컴포넌트
```html
<div class="card">
    <div class="card-icon">🔐</div>
    <h3 class="card-title">카드 제목</h3>
    <p class="card-description">카드 설명</p>
    <div class="card-badge">OpenHash</div>
</div>

<style>
.card {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    border: 2px solid #e5e7eb;
    transition: all 0.3s;
}
.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 70, 255, 0.2);
    border-color: #0046FF;
}
.card-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}
.card-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #212529;
    margin-bottom: 0.5rem;
}
.card-description {
    color: #6b7280;
    line-height: 1.6;
}
.card-badge {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: #dbeafe;
    color: #1e40af;
    border-radius: 20px;
    font-size: 0.875rem;
}
</style>
```

### 2. 버튼 컴포넌트
```html
<!-- Primary Button -->
<button class="btn-primary">
    <i class="fas fa-check"></i> 확인
</button>

<!-- Secondary Button -->
<button class="btn-secondary">
    취소
</button>

<style>
.btn-primary {
    background: linear-gradient(135deg, #0046FF, #0066CC);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}
.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 70, 255, 0.3);
}
.btn-secondary {
    background: white;
    color: #0046FF;
    border: 2px solid #0046FF;
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}
.btn-secondary:hover {
    background: #f8f9fa;
}
</style>
```

### 3. Floating Button
```html
<button class="floating-button" onclick="toggleHelp()">
    <i class="fas fa-question"></i>
</button>

<style>
.floating-button {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0046FF, #0066CC);
    color: white;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 70, 255, 0.3);
    transition: all 0.3s;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
}
.floating-button:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 70, 255, 0.4);
}
</style>
```

### 4. 통계 카드
```html
<div class="stat-card">
    <div class="stat-icon">📊</div>
    <div class="stat-value">1,234</div>
    <div class="stat-label">처리 건수</div>
</div>

<style>
.stat-card {
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
    padding: 2rem;
    border-radius: 16px;
    text-align: center;
}
.stat-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}
.stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #0046FF;
    margin-bottom: 0.5rem;
}
.stat-label {
    color: #6b7280;
    font-size: 0.875rem;
}
</style>
```

---

## 기술 스택

### 권장 기술

#### 순수 HTML/CSS
```
✅ 간단한 정적 페이지
✅ 빠른 개발 필요시
✅ 유지보수 용이
```

#### React (UMD)
```
✅ 복잡한 인터랙션
✅ 동적 데이터 표시
✅ 컴포넌트 재사용
```

### 필수 CDN
```html
<!-- 폰트 -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- 아이콘 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- Tailwind (선택) -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- React (필요시) -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

---

## 코드 예제

### 예제 1: 기본 정부 기관 페이지 (순수 HTML)
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>교육부 AI 자동화 | 국가 자동화</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; 
            font-family: 'Noto Sans KR', sans-serif; }
        body { background: #f8f9fa; color: #212529; }
        
        .header {
            background: linear-gradient(135deg, #0046FF, #0066CC);
            color: white;
            padding: 3rem 2rem;
            text-align: center;
        }
        .header h1 { font-size: 2.5rem; margin-bottom: 1rem; }
        .header p { font-size: 1.1rem; opacity: 0.95; }
        
        .main-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 3rem 2rem;
        }
        
        .grid-3 {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .card {
            background: white;
            padding: 2rem;
            border-radius: 16px;
            border: 2px solid #e5e7eb;
            transition: all 0.3s;
        }
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 70, 255, 0.2);
            border-color: #0046FF;
        }
    </style>
</head>
<body>
    <header class="header">
        <h1>🎓 교육부 AI 자동화 시스템</h1>
        <p>OpenHash 기반 교육 행정 자동화</p>
    </header>
    
    <main class="main-content">
        <h2>주요 기능</h2>
        <div class="grid-3">
            <div class="card">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📚</div>
                <h3>학생 관리</h3>
                <p style="color: #6b7280; margin-top: 0.5rem;">
                    전국 학생 정보 통합 관리
                </p>
            </div>
            <div class="card">
                <div style="font-size: 3rem; margin-bottom: 1rem;">👨‍🏫</div>
                <h3>교원 관리</h3>
                <p style="color: #6b7280; margin-top: 0.5rem;">
                    교원 인사 및 배치 자동화
                </p>
            </div>
            <div class="card">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📊</div>
                <h3>통계 분석</h3>
                <p style="color: #6b7280; margin-top: 0.5rem;">
                    교육 데이터 실시간 분석
                </p>
            </div>
        </div>
    </main>
</body>
</html>
```

### 예제 2: React 컴포넌트 스타일
```jsx
const FeatureCard = ({ icon, title, description }) => {
    return React.createElement('div', {
        className: 'bg-white p-8 rounded-2xl border-2 border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-blue-600 hover:-translate-y-2'
    },
        React.createElement('div', { 
            className: 'text-5xl mb-4' 
        }, icon),
        React.createElement('h3', { 
            className: 'text-xl font-semibold text-gray-900 mb-2' 
        }, title),
        React.createElement('p', { 
            className: 'text-gray-600' 
        }, description)
    );
};
```

---

## 체크리스트

### 디자인 체크리스트

- [ ] 배경색이 밝은가? (white, #f8f9fa)
- [ ] 텍스트 색상이 진한가? (#212529, #6b7280)
- [ ] 강조색이 파란색 계열인가? (#0046FF)
- [ ] 다크 테마 요소가 없는가?
- [ ] 다양한 색상을 사용하지 않았는가?
- [ ] Noto Sans KR 폰트를 사용하는가?
- [ ] 카드에 호버 효과가 있는가?
- [ ] 그라데이션이 파란색 계열인가?

### 기능 체크리스트

- [ ] 반응형 디자인 (모바일 대응)
- [ ] Font Awesome 아이콘 사용
- [ ] Floating Button 추가 (선택)
- [ ] 포털로 돌아가기 링크
- [ ] 푸터에 저작권 정보
- [ ] 페이지 로딩 속도 최적화

### 접근성 체크리스트

- [ ] 충분한 색상 대비 (4.5:1 이상)
- [ ] 키보드 네비게이션 가능
- [ ] alt 텍스트 제공
- [ ] 의미 있는 HTML 구조
- [ ] 폰트 크기 충분 (최소 14px)

### 코드 품질 체크리스트

- [ ] HTML 유효성 검사 통과
- [ ] CSS 최적화
- [ ] 불필요한 코드 제거
- [ ] 주석 작성
- [ ] 파일 크기 최적화

---

## 참고 사이트

### 완성된 사이트 예제

1. **포털**: http://100.30.14.224/portal/
2. **행정부**: http://100.30.14.224/portal/government.html
3. **입법부**: http://100.30.14.224/legislation/
4. **사법부**: http://100.30.14.224/judicial/
5. **의료**: http://100.30.14.224/healthcare/
6. **교육**: http://100.30.14.224/education/

### 디자인 참고

- 정부24: https://www.gov.kr
- 대한민국 정부: https://www.korea.go.kr
- 행정안전부: https://www.mois.go.kr

---

## 문의

프로젝트 관련 문의사항은 GitHub Issues를 통해 제출해주세요.

---

**© 2025 OpenHash 기술 실증 프로젝트 | 국가 자동화 플랫폼**
