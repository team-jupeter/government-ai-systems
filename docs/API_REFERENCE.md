# 오픈해시 API 레퍼런스

## 기본 정보

- Base URL: `http://localhost:8080`
- Content-Type: `application/json`

## 엔드포인트

### GET /health

헬스 체크

**응답:**
```json
{
  "status": "healthy",
  "uptime_seconds": 123.45,
  "version": "1.0.0"
}
```

### GET /info

시스템 정보

**응답:**
```json
{
  "name": "OpenHash Patent Simulation",
  "patent_title": "확률적 계층 분산 기반 데이터 무결성 검증 시스템",
  "components": {...},
  "performance": {...}
}
```

### GET /layer/select

계층 선택

**파라미터:**
- `hash` (optional): 문서 해시

**응답:**
```json
{
  "document_hash": "abc123...",
  "selected_layer": "Layer1",
  "n_value": 42,
  "details": {...}
}
```

### GET /layer/simulate

분포 시뮬레이션

**파라미터:**
- `count` (optional, default=1000): 시뮬레이션 횟수

### POST /transaction

트랜잭션 제출

**요청:**
```json
{
  "tx_id": "TX-001",
  "data": "transaction data"
}
```

**응답:**
```json
{
  "tx_id": "TX-001",
  "status": "COMMITTED",
  "consensus_time_ms": 0.05
}
```

### GET /transaction/{tx_id}

트랜잭션 조회
