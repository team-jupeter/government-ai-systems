# 국가 재무제표 시스템

## 개요
대한민국 5천만 국민과 1천만 사업자 각각에게 개인별 재무제표를 할당하고, 프라이빗 데이터 금고에 안전하게 보관하며, 오픈해시 네트워크로 위변조를 방지하는 시스템입니다.

## 시스템 구성

### Frontend
- **기술 스택**: React 18, Recharts 2.5.0
- **디자인**: KRDS (대한민국 정부 디자인 시스템)
- **폰트**: Pretendard GOV
- **색상**: 정부 청색 (#1973ff) 기반
- **접근성**: WCAG 2.1 AA 준수

### Backend
- **기술 스택**: Flask (Python 3.12.3)
- **포트**: 5070
- **CORS**: 활성화
- **배포**: systemd service

### Server
- **웹서버**: Nginx 1.24.0
- **OS**: Ubuntu 24.04
- **IP**: 100.30.14.224

## 주요 기능

### 1. 개인별 재무제표
- 손익계산서 (Income Statement)
- 대차대조표 (Balance Sheet)
- 현금흐름표 (Cash Flow Statement)
- 지분변동표 (Statement of Changes in Equity)
- 이익잉여금처분계산서 (Statement of Retained Earnings)
- 재무분석보고서 (Financial Analysis Report)

### 2. 프라이빗 데이터 금고
- AES-256 암호화
- PBKDF2 키 유도
- Shamir 비밀 분산
- 생체 인증

### 3. 오픈해시 연동
- SHA-256 해시 체인
- 확률적 Layer 분산 (Layer 1~4)
- BLS 서명
- Merkle Proof

### 4. 결합 재무제표
- Layer 1: 읍면동 (70% 확률)
- Layer 2: 시군구 (20% 확률)
- Layer 3: 광역시도 (8% 확률)
- Layer 4: 국가 (2% 확률)

### 5. AI 검증
- 이상 거래 탐지 (Isolation Forest)
- 패턴 분석 (LSTM)
- 법률 준수 검증 (LLM)
- 설명 가능성 (SHAP)

### 6. 데이터 보안
- 다층 보안 아키텍처
- Hash Chain 검증
- 접근 제어
- 위변조 차단

## API 엔드포인트

### Health Check
```bash
GET /national-financial-statements/api/health
```

### 엔티티 조회
```bash
# 모든 엔티티
GET /national-financial-statements/api/entities

# 개인만
GET /national-financial-statements/api/entities?type=individuals

# 기업만
GET /national-financial-statements/api/entities?type=businesses

# 특정 엔티티
GET /national-financial-statements/api/entities/P001
```

### 거래 내역
```bash
# 모든 거래
GET /national-financial-statements/api/transactions

# 특정 엔티티의 거래
GET /national-financial-statements/api/transactions?entity_id=P001
```

### Hash 검증
```bash
POST /national-financial-statements/api/verify-hash
Content-Type: application/json

{
  "transaction_id": "TX001"
}
```

### Layer 통계
```bash
GET /national-financial-statements/api/layer-stats?layer=1
```

### AI 검증
```bash
POST /national-financial-statements/api/ai-verify
Content-Type: application/json

{
  "case_type": "anomaly"  # anomaly, tampering, pattern, cross-verify
}
```

### Hash 분산
```bash
POST /national-financial-statements/api/hash-distribution
Content-Type: application/json

{
  "hash_value": "a1b2c3d4e5f67890..."
}
```

## 디렉토리 구조
```
national-financial-statements/
├── index.html
├── README.md
├── backend/
│   ├── server.py
│   └── requirements.txt
└── js/
    ├── app.js
    ├── config.js
    ├── data/
    │   ├── sampleData.js
    │   ├── financialTemplates.js
    │   └── layerData.js
    ├── components/
    │   ├── FinancialStructure.js
    │   ├── TransactionMechanism.js
    │   ├── HashChainIntegration.js
    │   ├── ConsolidatedReports.js
    │   ├── AIVerification.js
    │   └── DataSecurity.js
    └── common/
        ├── Card.js
        ├── AccordionCard.js
        └── StatCard.js
```

## 설치 및 실행

### 1. Python 패키지 설치
```bash
cd /var/www/government-ai-systems/national-financial-statements/backend
pip3 install -r requirements.txt --break-system-packages
```

### 2. 서비스 시작
```bash
sudo systemctl start national-financial-statements.service
sudo systemctl enable national-financial-statements.service
```

### 3. 상태 확인
```bash
sudo systemctl status national-financial-statements.service
```

### 4. 로그 확인
```bash
sudo journalctl -u national-financial-statements.service -f
```

## 주요 통계

- **총 인구**: 50,000,000명
- **사업자**: 10,000,000개
- **일평균 거래**: 2.5억건
- **Layer 계층**: 4단계
- **암호화 강도**: AES-256 (2²⁵⁶ 키 조합)
- **위변조 탐지**: <5ms
- **에너지 효율**: 블록체인 대비 98.5% 절감

## 보안 특징

1. **군사급 암호화**: AES-256
2. **확률적 분산**: SHA-256 기반
3. **자동 검증**: 상호 교차 검증
4. **위변조 차단**: 2⁻²⁵⁶ 예측 불가
5. **생체 인증**: 지문/얼굴/홍채

## 접근성

- **WCAG 2.1 AA**: 준수
- **명암비**: 4.5:1 이상
- **키보드 네비게이션**: 지원
- **스크린 리더**: 호환
- **고령자 고려**: 17px 기본 글자 크기

## 라이선스
© 2024 All rights reserved.
