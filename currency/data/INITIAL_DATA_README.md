# 초기 데이터 생성 가이드

## ⚠️ 개인정보 보호

### GitHub에 포함되는 파일
- ✅ `generate_initial_data.example.py` - 예시 템플릿
- ✅ `INITIAL_DATA_README.md` - 이 문서

### 서버에만 존재하는 파일 (.gitignore)
- 🔒 `generate_initial_data.py` - 실제 개인정보 포함
- 🔒 `activation_links.csv` - 활성화 링크 목록
- 🔒 `holders.json` - 실제 보유자 정보

## 사용 방법

### 1. 예시 템플릿 확인
```bash
cat generate_initial_data.example.py
```

### 2. 실제 스크립트 실행 (서버에서만)
```bash
cd /var/www/government-ai-systems/currency/data
python3 generate_initial_data.py
```

### 3. 생성되는 파일
- `holders.json` - 임시 public key + 잔액
- `genesis_transaction.json` - Genesis 거래
- `utxo_set.json` - 초기 UTXO
- `activation_links.csv` - 이메일 발송용

## Git 상태 확인
```bash
cd /var/www/government-ai-systems
git status currency/data/

# 출력 예시 (정상):
# Untracked files:
#   currency/data/generate_initial_data.example.py
#   currency/data/INITIAL_DATA_README.md
#
# generate_initial_data.py는 표시되지 않음 (정상)
```

## 보안 원칙

1. **절대 커밋하지 말 것**
   - `generate_initial_data.py`
   - `activation_links.csv`
   - `holders.json`

2. **커밋 전 항상 확인**
```bash
   git status | grep -E "generate_initial_data.py|activation_links"
   # 아무것도 출력되지 않아야 함
```

3. **실수로 커밋한 경우**
   - 즉시 히스토리에서 제거
   - 또는 새 repository로 이전
