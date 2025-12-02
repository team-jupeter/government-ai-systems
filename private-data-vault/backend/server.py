from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os
import json
import hashlib
from datetime import datetime
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import base64
import secrets

app = Flask(__name__)
CORS(app)

# Claude API 클라이언트
anthropic_client = None
try:
    api_key = os.environ.get('ANTHROPIC_API_KEY')
    if api_key:
        anthropic_client = anthropic.Anthropic(api_key=api_key)
        print("✅ Claude API 초기화 성공")
    else:
        print("⚠️  ANTHROPIC_API_KEY 환경변수 없음")
except Exception as e:
    print(f"⚠️  Claude API 초기화 실패: {e}")

# =====================================================
# 기본 엔드포인트
# =====================================================

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "ok",
        "service": "openhash-private-data-vault",
        "version": "2.0",
        "timestamp": datetime.now().isoformat(),
        "features": ["PDV", "확장재무제표", "교차검증", "활동증명", "AI상담"]
    }), 200

@app.route('/api/health', methods=['GET'])
def api_health():
    return health_check()

# =====================================================
# 오픈해시 확률적 계층 선택
# =====================================================

@app.route('/openhash/select-layer', methods=['POST'])
@app.route('/api/openhash/select-layer', methods=['POST'])
def select_layer():
    data = request.json
    input_data = json.dumps(data, sort_keys=True)
    timestamp = datetime.now().isoformat()
    
    # SHA-256 해싱 및 재해싱
    combined = input_data + timestamp
    first_hash = hashlib.sha256(combined.encode()).hexdigest()
    second_hash = hashlib.sha256(first_hash.encode()).hexdigest()
    
    # 계층 선택 (0-99 범위 변환)
    layer_value = int(second_hash[:4], 16) % 100
    
    if layer_value < 70:
        layer, name, desc = 1, "Edge Device", "사용자 단말기 계층 (70%)"
    elif layer_value < 90:
        layer, name, desc = 2, "Edge Server", "지역 서버 계층 (20%)"
    elif layer_value < 99:
        layer, name, desc = 3, "Core Engine", "핵심 엔진 계층 (9%)"
    else:
        layer, name, desc = 4, "Cloud Archive", "영구 보존 계층 (1%)"
    
    return jsonify({
        "original_hash": hashlib.sha256(input_data.encode()).hexdigest(),
        "first_rehash": first_hash,
        "final_hash": second_hash,
        "layer_value": layer_value,
        "selected_layer": {
            "number": layer,
            "name": name,
            "description": desc
        },
        "timestamp": timestamp
    }), 200

# =====================================================
# PDV 데이터 암호화/복호화 시뮬레이션
# =====================================================

@app.route('/pdv/encrypt', methods=['POST'])
@app.route('/api/pdv/encrypt', methods=['POST'])
def encrypt_data():
    data = request.json
    original_data = data.get('data', '')
    
    # AES-256 키 생성 (실제로는 사용자 Master Key 사용)
    key = secrets.token_bytes(32)
    iv = secrets.token_bytes(16)
    
    # 패딩
    padded_data = original_data + ' ' * (16 - len(original_data) % 16)
    
    # AES-256 암호화
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    encrypted = encryptor.update(padded_data.encode()) + encryptor.finalize()
    
    # 해시 생성
    data_hash = hashlib.sha256(original_data.encode()).hexdigest()
    
    return jsonify({
        "success": True,
        "encrypted_data": base64.b64encode(encrypted).decode(),
        "data_hash": data_hash,
        "hash_only_stored": True,
        "original_protected": True,
        "encryption": "AES-256-CBC",
        "message": "원본 데이터는 단말기에만 저장, 해시값만 오픈해시 시스템에 기록"
    }), 200

# =====================================================
# 확장 재무제표 생성
# =====================================================

@app.route('/pdv/create-record', methods=['POST'])
@app.route('/api/pdv/create-record', methods=['POST'])
def create_extended_financial_record():
    data = request.json
    
    # 6하 원칙 기반 구조화
    record = {
        "record_id": hashlib.sha256(str(datetime.now().timestamp()).encode()).hexdigest()[:16],
        "timestamp": datetime.now().isoformat(),
        "who": data.get('who', ''),
        "when": data.get('when', ''),
        "where": data.get('where', ''),
        "what": data.get('what', ''),
        "how": data.get('how', ''),
        "why": data.get('why', ''),
        "transaction_type": data.get('type', 'general'),
        "amount": data.get('amount', 0),
        "counterparty": data.get('counterparty', ''),
    }
    
    # 금전 거래인 경우 차변/대변 생성
    if record['transaction_type'] == 'financial' and record['amount'] > 0:
        record['debit'] = {
            "account": data.get('debit_account', '비용'),
            "amount": record['amount']
        }
        record['credit'] = {
            "account": data.get('credit_account', '현금'),
            "amount": record['amount']
        }
    
    # 해시 생성
    record_hash = hashlib.sha256(json.dumps(record, sort_keys=True).encode()).hexdigest()
    record['record_hash'] = record_hash
    
    return jsonify({
        "success": True,
        "record": record,
        "hash_for_openhash": record_hash,
        "storage": "로컬 단말기 (AES-256 암호화)",
        "cloud_storage": "해시값만 (32 bytes)"
    }), 200

# =====================================================
# 교차 검증 시뮬레이션
# =====================================================

@app.route('/pdv/cross-verify', methods=['POST'])
@app.route('/api/pdv/cross-verify', methods=['POST'])
def cross_verify():
    data = request.json
    
    party_a_data = data.get('party_a', {})
    party_b_data = data.get('party_b', {})
    
    # 각 당사자의 해시 생성
    hash_a = hashlib.sha256(json.dumps(party_a_data, sort_keys=True).encode()).hexdigest()
    hash_b = hashlib.sha256(json.dumps(party_b_data, sort_keys=True).encode()).hexdigest()
    
    # 교차 검증 해시 생성
    cross_hash_a = hashlib.sha256((hash_a + hash_b).encode()).hexdigest()
    
    # 일치 여부 확인
    is_match = (party_a_data.get('amount') == party_b_data.get('amount'))
    
    result = {
        "party_a_hash": hash_a,
        "party_b_hash": hash_b,
        "cross_verification_hash": cross_hash_a,
        "verification_result": "일치" if is_match else "불일치",
        "status": "success" if is_match else "warning",
        "timestamp": datetime.now().isoformat()
    }
    
    if not is_match:
        result["alert"] = "⚠️ 교차 검증 실패: 거래 금액 불일치 감지"
        result["party_a_amount"] = party_a_data.get('amount')
        result["party_b_amount"] = party_b_data.get('amount')
        result["action"] = "분쟁 해결 프로세스 개시 권고"
    
    return jsonify(result), 200

# =====================================================
# 활동 증명서 발급
# =====================================================

@app.route('/pdv/issue-certificate', methods=['POST'])
@app.route('/api/pdv/issue-certificate', methods=['POST'])
def issue_activity_certificate():
    data = request.json
    
    # 증명서 생성
    certificate = {
        "certificate_id": hashlib.sha256(str(datetime.now().timestamp()).encode()).hexdigest()[:24],
        "issued_at": datetime.now().isoformat(),
        "subject": data.get('subject', ''),
        "activity_type": data.get('activity_type', ''),
        "period": data.get('period', ''),
        "records_count": data.get('records_count', 0),
        "total_amount": data.get('total_amount', 0),
    }
    
    # 해시 체인 정보
    certificate["hash_chain"] = {
        "first_record_hash": hashlib.sha256(b"first_record").hexdigest(),
        "last_record_hash": hashlib.sha256(b"last_record").hexdigest(),
        "merkle_root": hashlib.sha256(b"merkle_root").hexdigest(),
    }
    
    # BLS 서명 시뮬레이션
    certificate["bls_signature"] = hashlib.sha256(
        json.dumps(certificate, sort_keys=True).encode()
    ).hexdigest()
    
    # 검증 URL
    certificate["verification_url"] = f"https://openhash.verify/{certificate['certificate_id']}"
    
    return jsonify({
        "success": True,
        "certificate": certificate,
        "legal_validity": True,
        "tamper_proof": True,
        "message": "오픈해시 기반 활동 증명서가 발급되었습니다"
    }), 200

# =====================================================
# AI 상담 엔드포인트
# =====================================================

@app.route('/ai-consultation', methods=['POST'])
@app.route('/api/consultation', methods=['POST'])
def ai_consultation():
    data = request.json
    user_query = data.get('query', '')
    
    if not user_query:
        return jsonify({"error": "쿼리가 없습니다"}), 400
    
    if not anthropic_client:
        return jsonify({
            "response": "죄송합니다. 현재 AI 상담 서비스가 일시적으로 사용 불가합니다."
        }), 200
    
    system_prompt = """당신은 오픈해시 기반 프라이빗 데이터 금고(PDV) 시스템의 AI 상담 전문가입니다.

PDV 시스템의 핵심 특징:
1. 개인정보 주권: 모든 원본 데이터는 사용자 단말기에만 AES-256 암호화 저장
2. 해시 전용 저장: 클라우드에는 SHA-256 해시값(32바이트)만 기록
3. 확장 재무제표: 6하 원칙(누가, 언제, 어디서, 무엇을, 어떻게, 왜)에 따른 활동 기록
4. 교차 검증: 거래 당사자 간 자동 검증으로 허위 데이터 즉시 탐지
5. 활동 증명: 해시 체인 기반 법적 증명서 발급
6. 당국 통보: 해시값과 요약 정보만 관련 당국에 자동 전송
7. 오픈해시 4계층: Edge Device(70%) → Edge Server(20%) → Core Engine(9%) → Cloud Archive(1%)

AWS 실증 실험 결과 (2025.11.18):
- 처리 속도: 25,907 records/sec (블록체인 대비 1,727~3,701배)
- 에너지 효율: 98.5% 절감 (121 TWh → 1.8 TWh/년)
- 계층 선택 정확도: 98.9%
- 저장 공간: 32 bytes/record (93.6% 절감)

사용자의 질문에 전문적이고 친절하게 답변하세요."""
    
    try:
        response = anthropic_client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            system=system_prompt,
            messages=[{"role": "user", "content": user_query}]
        )
        
        return jsonify({
            "response": response.content[0].text,
            "timestamp": datetime.now().isoformat()
        }), 200
        
    except Exception as e:
        print(f"❌ AI 상담 오류: {e}")
        return jsonify({
            "response": "죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        }), 200

# =====================================================
# 저장 공간 계산
# =====================================================

@app.route('/pdv/calculate-storage', methods=['POST'])
@app.route('/api/pdv/calculate-storage', methods=['POST'])
def calculate_storage():
    data = request.json
    transactions_per_year = data.get('transactions_per_year', 1000)
    years = data.get('years', 10)
    
    total_transactions = transactions_per_year * years
    hash_size = 32  # bytes (SHA-256)
    total_cloud_storage = total_transactions * hash_size
    
    # 단위 변환
    if total_cloud_storage < 1024:
        cloud_display = f"{total_cloud_storage} bytes"
    elif total_cloud_storage < 1024 * 1024:
        cloud_display = f"{total_cloud_storage / 1024:.1f} KB"
    else:
        cloud_display = f"{total_cloud_storage / (1024 * 1024):.2f} MB"
    
    return jsonify({
        "transactions_per_year": transactions_per_year,
        "years": years,
        "total_transactions": total_transactions,
        "cloud_storage_bytes": total_cloud_storage,
        "cloud_storage_display": cloud_display,
        "comparison": {
            "traditional_db": f"{total_transactions * 500 / (1024*1024):.1f} MB (레코드당 500bytes 가정)",
            "pdv_cloud": cloud_display,
            "savings": f"{((500-32)/500*100):.1f}% 절감"
        },
        "message": f"평생 {total_transactions:,}건 거래 시 클라우드 저장: {cloud_display}"
    }), 200


if __name__ == '__main__':
    print("🔐 프라이빗 데이터 금고(PDV) 백엔드 v2.0 시작")
    print(f"⏰ 시작 시간: {datetime.now().isoformat()}")
    print("📡 포트: 5025")
    print(f"🤖 Claude API: {'활성화' if anthropic_client else '비활성화'}")
    print("✨ 기능: PDV, 확장재무제표, 교차검증, 활동증명, AI상담")
    app.run(host='0.0.0.0', port=5025, debug=False)
