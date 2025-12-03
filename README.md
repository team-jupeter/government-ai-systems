# 🏛️ 국가 자동화 플랫폼 - OpenHash 기술 실증 프로젝트

OpenHash 분산원장 기술과 AI를 결합한 대한민국 정부 및 사회 인프라 자동화 시스템

## 📋 프로젝트 개요

본 프로젝트는 **OpenHash 기술의 효용성**을 실증하기 위해 대한민국의 입법부, 사법부, 행정부 및 주요 사회 인프라(의료, 교육, 교통, 물류, 시장, 산업 등)의 자동화 시스템을 구축한 기술 실증(PoC) 프로젝트입니다.

### 핵심 기술
- **OpenHash**: 블록체인 대비 98.5% 에너지 절감, 150,000배 빠른 응답속도
- **AI 자동화**: Claude AI 기반 대화형 인터페이스
- **확률적 계층 선택**: SHA-256 기반 4계층 분산 저장

### 구성 시스템 (총 25개)
- **3부**: 행정부(57개 기관), 입법부, 사법부
- **22개 사회 체제 자동화**: 교육, 의료, 금융, 법률, 지적재산, 의식주, 인프라 등

---

## 🚀 빠른 시작 (복원 가이드)

### 1️⃣ 시스템 요구사항
```bash
OS: Ubuntu 22.04 LTS 이상
Web Server: Nginx 1.18+
Node.js: 18+ (선택 사항)
```

### 2️⃣ 저장소 클론
```bash
# 저장소 클론
git clone https://github.com/YOUR_USERNAME/government-ai-systems.git
cd government-ai-systems

# 또는 직접 다운로드
wget https://github.com/YOUR_USERNAME/government-ai-systems/archive/main.zip
unzip main.zip
```

### 3️⃣ 파일 배포
```bash
# 웹 루트 디렉토리로 파일 복사
sudo mkdir -p /var/www/government-ai-systems
sudo cp -r * /var/www/government-ai-systems/

# 파일 권한 설정
sudo chown -R www-data:www-data /var/www/government-ai-systems
sudo chmod -R 755 /var/www/government-ai-systems
```

### 4️⃣ Nginx 설정
```bash
# Nginx 설정 파일 생성
sudo tee /etc/nginx/sites-available/gov-ai-portal > /dev/null << 'NGINX_EOF'
server {
    listen 80;
    server_name _;
    
    root /var/www/government-ai-systems;
    index index.html;
    
    # 포털 메인 페이지
    location = / {
        try_files /portal/index.html =404;
    }
    
    location = /portal {
        return 301 /portal/;
    }
    
    location = /portal/ {
        try_files /portal/index.html =404;
    }
    
    # 포털 파일들
    location ~ ^/portal/(index\.html|government\.html|systems\.html|openhash\.html)$ {
        try_files $uri =404;
    }
    
    # 포털 기타 리소스
    location /portal/ {
        try_files $uri $uri/ =404;
    }
    
    # 각 시스템 디렉토리
    location ~ ^/(education|k12|university|intellectual-property|judicial|legislation|healthcare|currency|market|patents|lawsuit|local-admin|personnel-innovation|tax|food-drug-safety|meal|jeju-hospital|jeju-integrated|traffic|openhash-system|private-data-vault|national-data-registry)/ {
        try_files $uri $uri/ =404;
    }
    
    # openhash.html 직접 접근
    location = /openhash.html {
        try_files $uri =404;
    }
    
    # 기타 HTML 파일
    location ~ \.html$ {
        try_files $uri =404;
    }
    
    # 404 처리
    error_page 404 /404.html;
    location = /404.html {
        internal;
    }
}
NGINX_EOF

# 심볼릭 링크 생성
sudo ln -sf /etc/nginx/sites-available/gov-ai-portal /etc/nginx/sites-enabled/

# 기본 사이트 비활성화 (선택)
sudo rm -f /etc/nginx/sites-enabled/default

# Nginx 설정 테스트
sudo nginx -t

# Nginx 재시작
sudo systemctl restart nginx
```

### 5️⃣ 환경 변수 설정 (선택 사항)

Claude API 기능을 사용하려면 프론트엔드에서 직접 API를 호출합니다.  
프로덕션 환경에서는 백엔드 프록시 사용을 권장합니다.
```bash
# 환경 변수 설정 (백엔드 사용 시)
export ANTHROPIC_API_KEY="your-api-key-here"
```

### 6️⃣ 서비스 확인
```bash
# Nginx 상태 확인
sudo systemctl status nginx

# 포트 확인
sudo netstat -tulpn | grep :80

# 로그 확인
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 7️⃣ 접속 테스트
```bash
# 로컬 테스트
curl -I http://localhost/portal/

# 원격 테스트
curl -I http://YOUR_SERVER_IP/portal/
```

브라우저에서 접속:
- 포털: `http://YOUR_SERVER_IP/portal/`
- 행정부: `http://YOUR_SERVER_IP/portal/government.html`
- 체제 자동화: `http://YOUR_SERVER_IP/portal/systems.html`

---

## 📁 디렉토리 구조
```
/var/www/government-ai-systems/
├── portal/
│   ├── index.html              # 포털 메인 페이지
│   ├── government.html         # 행정부 (57개 기관)
│   ├── systems.html            # 사회 체제 자동화 (18개 시스템)
│   └── openhash.html           # OpenHash 기술 문서
├── openhash.html               # OpenHash 기술 문서 (루트)
├── education/                  # AI 맞춤형 교육
├── k12/                        # K-12 교육 시스템
├── university/                 # AI 통합대학
├── intellectual-property/      # 지식재산권 시스템
├── judicial/                   # AI 예방적 사법
├── legislation/                # AI 입법 지원
├── healthcare/                 # 권역 의료 시스템
├── currency/                   # 디지털 화폐
├── market/                     # FPGA 시장
├── patents/                    # 특허 AI 포털
├── lawsuit/                    # 소송 지원
├── local-admin/                # 지방자치
├── personnel-innovation/       # 인사혁신
├── tax/                        # 세무 시스템
├── food-drug-safety/          # 식약 안전
├── meal/                       # 국가 급식
├── jeju-hospital/              # 제주 병원
├── jeju-integrated/            # 제주 통합
├── traffic/                    # 교통 관리
├── openhash-system/            # OpenHash 시스템
├── private-data-vault/         # 프라이빗 금고
├── national-data-registry/     # 국가 데이터
└── README.md                   # 본 문서
```

---

## 🎨 디자인 가이드라인

### 색상 체계 (정부24 스타일)
```css
--gov-blue: #2563eb;
--gov-blue-dark: #1d4ed8;
--gov-navy: #1e3a5f;
--background: #f8f9fa;
--text-primary: #212529;
--text-secondary: #6b7280;
```

### 그라데이션
```css
background: linear-gradient(135deg, #0046FF 0%, #1E40AF 50%, #0066CC 100%);
```

### 폰트
- 기본: Noto Sans KR, Malgun Gothic, 맑은 고딕
- 영문: -apple-system, BlinkMacSystemFont, "Segoe UI"

---

## 🔧 트러블슈팅

### 문제 1: 404 오류
```bash
# 파일 존재 확인
ls -la /var/www/government-ai-systems/portal/

# 권한 확인
ls -la /var/www/government-ai-systems/

# Nginx 설정 확인
sudo nginx -t
```

### 문제 2: Nginx 시작 실패
```bash
# 포트 충돌 확인
sudo netstat -tulpn | grep :80

# 기존 프로세스 종료
sudo killall nginx
sudo systemctl start nginx
```

### 문제 3: 파일 접근 권한
```bash
# 권한 재설정
sudo chown -R www-data:www-data /var/www/government-ai-systems
sudo chmod -R 755 /var/www/government-ai-systems
```

### 문제 4: 캐시 문제
```bash
# 브라우저 강력 새로고침
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)

# 또는 시크릿 모드 사용
```

---

## 🔐 보안 고려사항

### Claude API Key 보호
- ⚠️ 프론트엔드에서 직접 API 호출 시 키 노출 위험
- ✅ 프로덕션: 백엔드 프록시 서버 구축 권장
- ✅ 개발/테스트: 환경 변수로 관리

### HTTPS 설정 (프로덕션)
```bash
# Let's Encrypt SSL 인증서 설치
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 📊 시스템 통계

- **총 페이지 수**: 25+
- **중앙행정기관**: 57개 (19부 3처 20청 8위원회)
- **사회 체제 자동화**: 18개 시스템
- **기술 스택**: HTML5, CSS3, JavaScript, React 18, Tailwind CSS
- **OpenHash 특성**: 98.5% 에너지 절감, 50,000 TPS

---

## 🤝 기여 방법

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 라이선스

This project is licensed under the MIT License - see the LICENSE file for details

---

## 👨‍💻 제작자

- **프로젝트 관리**: 주피터
- **기술 스택**: OpenHash + Claude AI
- **목적**: OpenHash 기술 실증

---

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해주세요.

---

**⚠️ 주의사항**
- 본 프로젝트는 기술 실증(PoC) 목적으로 제작되었습니다.
- 실제 정부 시스템과는 무관합니다.
- 상업적 사용 시 별도 라이선스가 필요할 수 있습니다.
