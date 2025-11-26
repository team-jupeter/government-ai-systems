# 오픈해시 기반 적응형 계층 구조 시스템 - 실증 시뮬레이션

## 개요

본 저장소는 **"확률적 계층 분산 기반 데이터 무결성 검증 시스템 및 그 운영 방법"** 특허의 핵심 기술 요소에 대한 AWS 클라우드 기반 실증 시뮬레이션 코드를 포함합니다.

## 특허 정보

- **발명의 명칭**: 확률적 계층 분산 기반 데이터 무결성 검증 시스템 및 그 운영 방법
- **영문 명칭**: Probabilistic Layer Distribution-Based Data Integrity Verification System and Operating Method Thereof
- **IPC 분류**: H04L 9/32, G06F 16/23, H04L 67/1097, G06N 20/00

## 디렉토리 구조
```
openhash-patent-sim/
├── layers/                    # 핵심 계층 모듈
│   ├── probabilistic_layer_selector.py   # 확률적 계층 선택
│   ├── inter_layer_verification.py       # 계층 간 상호 검증
│   ├── lpbft_consensus.py                # LPBFT 합의
│   ├── linear_scaling_tps.py             # 선형 확장 TPS
│   └── dynamic_node_management.py        # 동적 노드 관리
├── crypto/                    # 암호화 모듈
│   ├── sha256_double_hash.py             # SHA-256 이중 해싱
│   ├── merkle_tree.py                    # Merkle Tree
│   └── bls_signature.py                  # BLS 서명
├── network/                   # 네트워크 시뮬레이션
│   ├── node_network.py                   # 노드 네트워크
│   └── latency_simulator.py              # 지연 시뮬레이터
├── benchmark/                 # 벤치마크 도구
│   ├── tps_benchmark.py                  # TPS 벤치마크
│   └── energy_benchmark.py               # 에너지 벤치마크
├── api/                       # REST API
│   └── openhash_api.py                   # API 서버
├── config/                    # 설정
│   └── default_config.py                 # 기본 설정
├── tests/                     # 테스트
│   └── integrated_test.py                # 통합 테스트
├── results/                   # 결과
│   └── test_results.json                 # 테스트 결과
├── docs/                      # 문서
│   ├── ARCHITECTURE.md                   # 아키텍처
│   └── API_REFERENCE.md                  # API 레퍼런스
└── README.md
```

## 핵심 기술 요소

| # | 기술 요소 | 모듈 | 설명 |
|---|----------|------|------|
| 1 | 확률적 계층 선택 | `layers/`, `crypto/sha256_double_hash.py` | SHA-256 이중 해싱 기반 계층 분배 |
| 2 | 계층 간 상호 검증 | `layers/`, `crypto/merkle_tree.py`, `crypto/bls_signature.py` | BLS 서명 + Merkle Proof 양방향 검증 |
| 3 | LPBFT 합의 | `layers/lpbft_consensus.py` | Byzantine Fault Tolerance (n ≥ 3f+1) |
| 4 | 선형 확장 TPS | `layers/`, `benchmark/tps_benchmark.py` | 노드 수 비례 처리량 증가 |
| 5 | 동적 노드 관리 | `layers/dynamic_node_management.py` | 무중단 진입/퇴출 |
| 6 | 에너지 효율 | `benchmark/energy_benchmark.py` | 비트코인 대비 98.5% 절감 |

## 실행 환경

- **플랫폼**: AWS EC2 (Ubuntu 24.04 LTS)
- **언어**: Python 3.12+
- **의존성**: 표준 라이브러리만 사용 (외부 패키지 불필요)

## 빠른 시작

### 1. 개별 모듈 테스트
```bash
# 암호화 모듈
python3 crypto/sha256_double_hash.py
python3 crypto/merkle_tree.py
python3 crypto/bls_signature.py

# 네트워크 모듈
python3 network/node_network.py
python3 network/latency_simulator.py

# 벤치마크
python3 benchmark/tps_benchmark.py
python3 benchmark/energy_benchmark.py

# 핵심 계층 모듈
python3 layers/probabilistic_layer_selector.py
python3 layers/inter_layer_verification.py
python3 layers/lpbft_consensus.py
python3 layers/linear_scaling_tps.py
python3 layers/dynamic_node_management.py
```

### 2. 통합 테스트
```bash
python3 tests/integrated_test.py
```

### 3. API 서버 실행
```bash
python3 api/openhash_api.py --port 8080
```

## 검증 결과 요약

| 테스트 항목 | 결과 | 핵심 수치 |
|------------|------|----------|
| 확률적 계층 선택 | ✅ PASS | 이론값 대비 편차 ±0.2% 이내 |
| Merkle Tree 검증 | ✅ PASS | 대역폭 90% 절감 |
| BLS 서명 집약 | ✅ PASS | 크기 85%, 시간 90% 절감 |
| 계층 간 상호 검증 | ✅ PASS | 검증 시간 0.033ms |
| LPBFT 합의 | ✅ PASS | 10노드 중 7개 합의 |
| 선형 확장 TPS | ✅ PASS | 비트코인 대비 68.8배 |
| 네트워크 지연 | ✅ PASS | 평균 4ms 이내 |
| 동적 노드 관리 | ✅ PASS | 다운타임 0초 |
| 에너지 효율 | ✅ PASS | 98.5% 절감 |

## 성능 비교

| 시스템 | TPS | 에너지 (연간) | 트랜잭션당 에너지 |
|--------|-----|--------------|------------------|
| 비트코인 | 7 | 121 TWh | 1,200 kWh |
| 이더리움 | 30 | - | - |
| **오픈해시 (11노드)** | **481.4** | **1.8 TWh** | **18 Wh** |

- 비트코인 대비 **68.8배** 성능 향상
- 에너지 소비 **98.5%** 절감
- 트랜잭션당 에너지 **66,667배** 효율

## API 엔드포인트

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | /health | 헬스 체크 |
| GET | /info | 시스템 정보 |
| GET | /layer/select | 계층 선택 |
| GET | /layer/simulate | 분포 시뮬레이션 |
| POST | /transaction | 트랜잭션 제출 |
| GET | /transaction/{id} | 트랜잭션 조회 |

## 라이선스

본 코드는 특허 출원 명세서의 실증 자료로 제공되며, 특허권자의 허가 없이 상업적 사용을 금합니다.

## 시뮬레이션 정보

- **실행 환경**: AWS EC2 (us-east-1)
- **시뮬레이션 일자**: 2025년 11월 26일
- **Python 버전**: 3.12

---

© 2025. All rights reserved.
