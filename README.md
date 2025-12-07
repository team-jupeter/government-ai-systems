# OpenHash-based Government AI Systems

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![OpenHash](https://img.shields.io/badge/Technology-OpenHash-blue.svg)](http://100.30.14.224/openhash-system/)
[![FPGA AI](https://img.shields.io/badge/AI-FPGA%20Accelerated-green.svg)](http://100.30.14.224/currency/)

## 🏛️ 프로젝트 소개

OpenHash 분산원장 기술 기반의 정부 AI 시스템 데모 프로젝트입니다.

### 주요 시스템

- **디지털 화폐 (EGCT)**: http://100.30.14.224/currency/
  - OpenHash 분산원장 기반 디지털 화폐
  - FPGA AI 검증 (0.032ms, 99.4% 정확도)
  - 481 TPS 실측 성능

- **OpenHash 시스템**: http://100.30.14.224/openhash-system/
  - 블록체인 대체 분산원장
  - 98.5% 에너지 절감
  - 확률적 계층 선택 알고리즘

- **정부 포털**: http://100.30.14.224/portal/
  - 200+ 정부기관 통합
  - AI 에이전트 자동화
  - 국가 데이터처 연동

## 🔧 핵심 기술

### OpenHash 분산원장
- 블록체인 대비 98.5% 에너지 절감
- 기존 통신 인프라 활용
- 확률적 계층 선택으로 확장성 확보

### FPGA AI 검증
- 처리 속도: 0.032ms
- 정확도: 99.4%
- 하드웨어 가속 실시간 검증

### BLS 서명 집계
- 99.9% 대역폭 절감
- Layer 간 효율적 통신
- 암호학적 안전성 보장

### UTXO 모델
- 비트코인 방식 거래 모델
- 이중 지불 방지
- 투명한 거래 추적

## 📊 성능 지표

| 항목 | 수치 | 비고 |
|------|------|------|
| 처리 속도 | 481 TPS | 11노드 실측 |
| 이론 확장성 | 424만 TPS | 100,000노드 |
| 에너지 효율 | 98.5% 절감 | 블록체인 대비 |
| AI 검증 속도 | 0.032ms | FPGA 가속 |
| AI 정확도 | 99.4% | 실측 평균 |

## 📜 라이선스

이 프로젝트는 **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)** 라이선스 하에 배포됩니다.

### ✅ 허용사항
- 연구 및 교육 목적 사용
- 소스 코드 자유 열람 및 학습
- 수정 및 재배포 (동일 라이선스 적용)
- 정부 및 공공기관 무료 사용

### ❌ 제한사항
- 상업적 판매 및 라이선싱
- 저작자 표시 없이 사용
- 다른 라이선스로 재배포

### 💼 상업적 이용 문의
상업적 라이선스가 필요한 경우 별도 문의 바랍니다.

**전체 라이선스**: [LICENSE](./LICENSE) 파일 참조  
**법적 조항**: https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode

## 🚀 시작하기

### 저장소 클론
```bash
git clone https://github.com/team-jupeter/government-ai-systems.git
cd government-ai-systems
```

### 웹서버 설정
```bash
# Nginx 예시
sudo ln -s /path/to/government-ai-systems /var/www/
sudo systemctl reload nginx
```

### 주요 디렉토리 구조
```
government-ai-systems/
├── currency/              # EGCT 디지털 화폐 시스템
├── openhash-system/       # OpenHash 기술 소개
├── portal/                # 정부 통합 포털
├── bank/                  # 은행 시스템
├── insurance/             # 보험 시스템
├── securities/            # 증권 시스템
└── [200+ 정부기관 디렉토리]
```

## 📖 문서

- [OpenHash 기술 백서](http://100.30.14.224/openhash-system/)
- [디지털 화폐 가이드](http://100.30.14.224/currency/)
- [API 문서](http://100.30.14.224/portal/)

## 🤝 기여하기

이 프로젝트는 연구 및 교육 목적의 데모 시스템입니다. 기여는 다음과 같이 가능합니다:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**주의**: 모든 기여는 CC BY-NC-SA 4.0 라이선스를 따라야 합니다.

## 📞 문의

- **GitHub**: https://github.com/team-jupeter/government-ai-systems
- **데모 사이트**: http://100.30.14.224/
- **이슈 트래커**: https://github.com/team-jupeter/government-ai-systems/issues

## 🏢 저작권

Copyright © 2025 AI City Inc. (ACI)

Licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)

---

**면책조항**: 이 프로젝트는 기술 실증을 위한 데모 시스템입니다. 실제 정부 서비스가 아닙니다.
