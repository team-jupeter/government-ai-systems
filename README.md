# 오픈해시 기반 적응형 계층 구조 시스템 - 실증 시뮬레이션

## 개요

본 저장소는 **"확률적 계층 분산 기반 데이터 무결성 검증 시스템 및 그 운영 방법"** 특허의 핵심 기술 요소에 대한 AWS 클라우드 기반 실증 시뮬레이션 코드를 포함합니다.

## 특허 정보

- **발명의 명칭**: 확률적 계층 분산 기반 데이터 무결성 검증 시스템 및 그 운영 방법
- **영문 명칭**: Probabilistic Layer Distribution-Based Data Integrity Verification System and Operating Method Thereof
- **IPC 분류**: H04L 9/32, G06F 16/23, H04L 67/1097, G06N 20/00

## 핵심 기술 요소

| # | 기술 요소 | 파일 | 설명 |
|---|----------|------|------|
| 1 | 확률적 계층 선택 알고리즘 | `layers/probabilistic_layer_selector.py` | SHA-256 이중 해싱 기반 계층 분배 |
| 2 | 계층 간 상호 검증 | `layers/inter_layer_verification.py` | BLS 서명 + Merkle Proof 양방향 검증 |
| 3 | LPBFT 합의 알고리즘 | `layers/lpbft_consensus.py` | Byzantine Fault Tolerance (n ≥ 3f+1) |
| 4 | 선형 확장 TPS | `layers/linear_scaling_tps.py` | 노드 수 비례 처리량 증가 |
| 5 | 동적 노드 관리 | `layers/dynamic_node_management.py` | 무중단 진입/퇴출 |

## 디렉토리 구조
```
openhash-patent-sim/
├── layers/                          # 핵심 기술 모듈
│   ├── probabilistic_layer_selector.py
│   ├── inter_layer_verification.py
│   ├── lpbft_consensus.py
│   ├── linear_scaling_tps.py
│   └── dynamic_node_management.py
├── tests/                           # 통합 테스트
│   └── integrated_test.py
├── results/                         # 테스트 결과
│   └── test_results.json
└── README.md
```

## 실행 환경

- **플랫폼**: AWS EC2 (Ubuntu 24.04 LTS)
- **언어**: Python 3.12+
- **의존성**: 표준 라이브러리만 사용 (외부 패키지 불필요)

## 실행 방법

### 개별 모듈 테스트
```bash
# 1. 확률적 계층 선택 알고리즘
python3 layers/probabilistic_layer_selector.py

# 2. 계층 간 상호 검증
python3 layers/inter_layer_verification.py

# 3. LPBFT 합의 알고리즘
python3 layers/lpbft_consensus.py

# 4. 선형 확장 TPS
python3 layers/linear_scaling_tps.py

# 5. 동적 노드 관리
python3 layers/dynamic_node_management.py
```

### 통합 테스트
```bash
python3 tests/integrated_test.py
```

## 검증 결과 요약

| 테스트 항목 | 결과 | 비고 |
|------------|------|------|
| 확률적 계층 선택 | ✅ PASS | 이론값 대비 편차 ±1% 이내 |
| 계층 간 상호 검증 | ✅ PASS | 검증 소요시간 0.033ms |
| LPBFT 합의 | ✅ PASS | 10노드 중 7개 합의 검증 |
| 선형 확장 TPS | ✅ PASS | 비트코인 대비 68.8배 |
| 동적 노드 관리 | ✅ PASS | 무중단 진입/퇴출 |

## 성능 비교

| 시스템 | TPS | 에너지 소비 (연간) | 트랜잭션당 에너지 |
|--------|-----|-------------------|------------------|
| 비트코인 | 7 | 121 TWh | 1,200 kWh |
| 이더리움 | 30 | - | - |
| **오픈해시 (11노드)** | **481.4** | **1.8 TWh** | **18 Wh** |

- 비트코인 대비 **68.8배** 성능 향상
- 에너지 소비 **98.5%** 절감

## 라이선스

본 코드는 특허 출원 명세서의 실증 자료로 제공되며, 특허권자의 허가 없이 상업적 사용을 금합니다.

## 시뮬레이션 일자

2025년 11월 26일

---

© 2025. All rights reserved.
