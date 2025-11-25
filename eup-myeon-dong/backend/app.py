from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os
import logging
import hashlib
import time
from datetime import datetime
import random

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY', '')
client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY) if ANTHROPIC_API_KEY else None

SYSTEM_INFO = {
    "system_name": "오픈해시 기반 스마트 읍면동 행정 자동화 시스템",
    "description": "프라이빗 데이터 금고(PDV)와 AI 에이전트 기반 무인 행정복지센터",
    "total_offices": 3551,
    "openhash_layers": 4,
    "ai_agents": 8,
    "automation_rate": "98.7%",
    "energy_savings": "98.5%",
    "processing_speed": "60-80% faster"
}

SERVICES = [
    {"id": "resident_registration", "name": "주민등록 관리", "category": "민원", "processing_time": "30초"},
    {"id": "certificate_issuance", "name": "증명서 발급", "category": "민원", "processing_time": "10초"},
    {"id": "welfare_service", "name": "복지 서비스", "category": "복지", "processing_time": "5분"},
    {"id": "local_tax", "name": "지방세 업무", "category": "세무", "processing_time": "2분"},
    {"id": "civil_complaint", "name": "민원 접수/처리", "category": "민원", "processing_time": "실시간"}
]

AI_AGENTS = [
    {"id": "civil_service_agent", "name": "📄 민원처리 Agent", "description": "주민등록, 전입/전출 신고 등 기본 민원 자동 처리"},
    {"id": "certificate_agent", "name": "📋 증명발급 Agent", "description": "각종 증명서 자동 발급 및 진위 확인"},
    {"id": "welfare_agent", "name": "🏠 복지상담 Agent", "description": "복지 자격 판단 및 신청 지원"},
    {"id": "tax_agent", "name": "💰 세무처리 Agent", "description": "지방세 부과/징수 자동화"},
    {"id": "complaint_agent", "name": "📞 민원상담 Agent", "description": "24시간 주민 불편사항 접수 및 처리"},
    {"id": "verification_agent", "name": "🔍 교차검증 Agent", "description": "거래 당사자 간 데이터 일치 여부 검증"},
    {"id": "pdv_agent", "name": "🔐 PDV관리 Agent", "description": "개인 프라이빗 데이터 금고 관리"},
    {"id": "openhash_agent", "name": "⛓️ 오픈해시 Agent", "description": "분산 해시 체인 기록 및 검증"}
]

def get_openhash_layers():
    return [
        {"id": "layer_1", "name": "계층 1: 시군구", "node_count": 226, "description": "226개 시군구 서버"},
        {"id": "layer_2", "name": "계층 2: 읍면동", "node_count": 3551, "description": "3,551개 읍면동 행정복지센터"},
        {"id": "layer_3", "name": "계층 3: 광역", "node_count": 17, "description": "17개 시도 서버"},
        {"id": "layer_4", "name": "계층 4: 중앙", "node_count": 1, "description": "행정안전부 중앙 서버"}
    ]

def generate_sha256_hash(data):
    return hashlib.sha256(str(data).encode()).hexdigest()

def probabilistic_layer_selection(hash_value):
    layers = get_openhash_layers()
    selected_layers = []
    for layer in layers:
        rehash = hashlib.sha256((hash_value + layer["id"]).encode()).hexdigest()
        if int(rehash[:2], 16) < 64:
            selected_layers.append({
                "layer_id": layer["id"],
                "layer_name": layer["name"],
                "node_id": f"NODE-{random.randint(1, layer['node_count'])}",
                "timestamp": datetime.now().isoformat(),
                "hash_stored": hash_value[:12]
            })
    return selected_layers

def create_pdv_transaction(transaction_data):
    transaction = {
        "transaction_id": hashlib.sha256(str(time.time()).encode()).hexdigest()[:16],
        "timestamp": datetime.now().isoformat(),
        "who": transaction_data.get("who", "주민"),
        "what": transaction_data.get("what", "민원 서비스"),
        "where": transaction_data.get("where", "읍면동"),
        "category": transaction_data.get("category", "행정"),
        "amount": transaction_data.get("amount", 0)
    }
    transaction["hash_value"] = generate_sha256_hash(transaction)
    transaction["layers"] = probabilistic_layer_selection(transaction["hash_value"])
    return transaction

@app.route('/info', methods=['GET'])
def get_info():
    return jsonify(SYSTEM_INFO)

@app.route('/services', methods=['GET'])
def get_services():
    return jsonify({"services": SERVICES})

@app.route('/agents', methods=['GET'])
def get_agents():
    return jsonify({"agents": AI_AGENTS})

@app.route('/layers', methods=['GET'])
def get_layers():
    return jsonify({"layers": get_openhash_layers()})

@app.route('/pdv-transaction', methods=['POST'])
def pdv_transaction():
    try:
        data = request.json
        transaction = create_pdv_transaction(data)
        return jsonify({"status": "success", "transaction": transaction})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/consultation', methods=['POST'])
def consultation():
    if not client:
        return jsonify({"response": "⚠️ API 키가 설정되지 않았습니다."}), 200
    
    try:
        data = request.json
        message = data.get('message', '')
        
        system_prompt = """당신은 오픈해시 기반 스마트 읍면동 행정 자동화 시스템의 AI 상담원입니다.
        
주요 업무:
- 주민등록, 전입/전출 신고
- 각종 증명서 발급 (인감, 가족관계, 토지/건축물대장, 납세증명)
- 복지 서비스 안내 (기초생활수급, 장애인/노인/아동 복지)
- 지방세 관련 문의
- 민원 접수 및 처리

모든 거래는 프라이빗 데이터 금고(PDV)에 암호화 저장되며, 해시값만 오픈해시 시스템의 4계층 분산 네트워크에 기록됩니다.
친절하고 정확하게 안내해주세요."""
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            system=system_prompt,
            messages=[{"role": "user", "content": message}]
        )
        
        return jsonify({"response": response.content[0].text})
    except Exception as e:
        return jsonify({"response": f"오류: {str(e)}"}), 500



# ============================================================================
# 재무제표 관리
# ============================================================================
class FinancialStatement:
    """확장 재무제표 클래스"""
    def __init__(self, owner_id, owner_name, owner_type="individual"):
        self.owner_id = owner_id
        self.owner_name = owner_name
        self.owner_type = owner_type  # individual, corporation, government
        self.assets = 1000000  # 자산
        self.liabilities = 0  # 부채
        self.equity = 1000000  # 자본
        self.revenue = 0  # 수익
        self.expenses = 0  # 비용
        self.transactions = []
    
    def debit(self, amount, description):
        """차변 처리 (자산 증가 또는 비용 발생)"""
        self.assets += amount
        self.transactions.append({
            "type": "debit",
            "amount": amount,
            "description": description,
            "timestamp": datetime.now().isoformat(),
            "balance": self.assets - self.liabilities
        })
    
    def credit(self, amount, description):
        """대변 처리 (부채 증가 또는 수익 발생)"""
        self.assets -= amount
        self.expenses += amount
        self.transactions.append({
            "type": "credit",
            "amount": amount,
            "description": description,
            "timestamp": datetime.now().isoformat(),
            "balance": self.assets - self.liabilities
        })
    
    def to_dict(self):
        return {
            "owner_id": self.owner_id,
            "owner_name": self.owner_name,
            "owner_type": self.owner_type,
            "assets": self.assets,
            "liabilities": self.liabilities,
            "equity": self.equity,
            "revenue": self.revenue,
            "expenses": self.expenses,
            "net_worth": self.assets - self.liabilities,
            "recent_transactions": self.transactions[-5:]
        }

# 임시 재무제표 저장소
financial_statements = {}

def get_or_create_statement(owner_id, owner_name, owner_type="individual"):
    if owner_id not in financial_statements:
        financial_statements[owner_id] = FinancialStatement(owner_id, owner_name, owner_type)
    return financial_statements[owner_id]

# ============================================================================
# 업무별 시뮬레이션 엔드포인트
# ============================================================================

@app.route('/simulate/resident-registration', methods=['POST'])
def simulate_resident_registration():
    """주민등록 업무 시뮬레이션"""
    try:
        data = request.json
        citizen_name = data.get('name', '김철수')
        
        # 1단계: PDV에서 개인정보 조회
        pdv_data = {
            "name": citizen_name,
            "birth_date": "1990-05-15",
            "address": "서울시 강남구 역삼동 123-45",
            "id_number": "900515-1******",
            "encrypted": True
        }
        
        # 2단계: 주민등록 처리
        transaction = create_pdv_transaction({
            "who": citizen_name,
            "what": "주민등록등본 발급",
            "where": "역삼동 행정복지센터",
            "category": "민원",
            "amount": 0
        })
        
        # 3단계: 오픈해시 계층에 기록
        steps = [
            {"step": 1, "action": "PDV 접근", "status": "completed", "time": 0.1},
            {"step": 2, "action": "신원 확인", "status": "completed", "time": 0.3},
            {"step": 3, "action": "주민등록 조회", "status": "completed", "time": 0.5},
            {"step": 4, "action": "등본 생성", "status": "completed", "time": 0.8},
            {"step": 5, "action": "오픈해시 기록", "status": "completed", "time": 1.0}
        ]
        
        return jsonify({
            "status": "success",
            "service": "주민등록 관리",
            "pdv_data": pdv_data,
            "transaction": transaction,
            "steps": steps,
            "document": {
                "type": "주민등록등본",
                "issued_to": citizen_name,
                "issued_at": datetime.now().isoformat(),
                "document_number": f"REG-{random.randint(100000, 999999)}"
            }
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/simulate/certificate-issuance', methods=['POST'])
def simulate_certificate_issuance():
    """증명서 발급 시뮬레이션"""
    try:
        data = request.json
        cert_type = data.get('type', '인감증명서')
        citizen_name = data.get('name', '이영희')
        
        transaction = create_pdv_transaction({
            "who": citizen_name,
            "what": f"{cert_type} 발급",
            "where": "삼성동 행정복지센터",
            "category": "민원",
            "amount": 0
        })
        
        steps = [
            {"step": 1, "action": "PDV 인증", "status": "completed", "time": 0.1},
            {"step": 2, "action": "증명서 조회", "status": "completed", "time": 0.3},
            {"step": 3, "action": "디지털 서명", "status": "completed", "time": 0.5},
            {"step": 4, "action": "PDF 생성", "status": "completed", "time": 0.7},
            {"step": 5, "action": "오픈해시 기록", "status": "completed", "time": 1.0}
        ]
        
        return jsonify({
            "status": "success",
            "service": "증명서 발급",
            "certificate_type": cert_type,
            "transaction": transaction,
            "steps": steps
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/simulate/welfare-service', methods=['POST'])
def simulate_welfare_service():
    """복지 서비스 시뮬레이션"""
    try:
        data = request.json
        citizen_name = data.get('name', '박순자')
        
        # PDV에서 복지 자격 판단
        pdv_analysis = {
            "age": 75,
            "income": 800000,
            "household_size": 1,
            "disability": None,
            "eligible_programs": ["기초연금", "노인장기요양", "에너지바우처"]
        }
        
        transaction = create_pdv_transaction({
            "who": citizen_name,
            "what": "복지 서비스 신청",
            "where": "논현동 행정복지센터",
            "category": "복지",
            "amount": 0
        })
        
        steps = [
            {"step": 1, "action": "PDV 소득분석", "status": "completed", "time": 0.2},
            {"step": 2, "action": "자격요건 검토", "status": "completed", "time": 0.4},
            {"step": 3, "action": "수급자 매칭", "status": "completed", "time": 0.6},
            {"step": 4, "action": "신청서 자동작성", "status": "completed", "time": 0.8},
            {"step": 5, "action": "오픈해시 기록", "status": "completed", "time": 1.0}
        ]
        
        return jsonify({
            "status": "success",
            "service": "복지 서비스",
            "pdv_analysis": pdv_analysis,
            "transaction": transaction,
            "steps": steps
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/simulate/local-tax', methods=['POST'])
def simulate_local_tax():
    """지방세 업무 시뮬레이션 - 재무제표 간 거래"""
    try:
        data = request.json
        taxpayer_name = data.get('name', '최사장')
        tax_amount = data.get('amount', 250000)
        
        # 납세자 재무제표 (기업)
        taxpayer = get_or_create_statement("CORP-001", taxpayer_name, "corporation")
        taxpayer.credit(tax_amount, "재산세 납부")
        
        # 읍면동 재무제표 (정부)
        government = get_or_create_statement("GOV-역삼동", "역삼동사무소", "government")
        government.debit(tax_amount, f"{taxpayer_name}로부터 재산세 수납")
        
        transaction = create_pdv_transaction({
            "who": taxpayer_name,
            "what": "재산세 납부",
            "where": "역삼동 행정복지센터",
            "category": "세무",
            "amount": tax_amount,
            "counterparty": "역삼동사무소"
        })
        
        steps = [
            {"step": 1, "action": "PDV 재무제표 조회", "status": "completed", "time": 0.2},
            {"step": 2, "action": "과세표준 계산", "status": "completed", "time": 0.4},
            {"step": 3, "action": "납세자 차변 처리", "status": "completed", "time": 0.6},
            {"step": 4, "action": "정부 대변 처리", "status": "completed", "time": 0.8},
            {"step": 5, "action": "오픈해시 기록", "status": "completed", "time": 1.0}
        ]
        
        return jsonify({
            "status": "success",
            "service": "지방세 업무",
            "tax_amount": tax_amount,
            "taxpayer_statement": taxpayer.to_dict(),
            "government_statement": government.to_dict(),
            "transaction": transaction,
            "steps": steps
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/simulate/civil-complaint', methods=['POST'])
def simulate_civil_complaint():
    """민원 상담 시뮬레이션 - AI 상담 시작"""
    try:
        data = request.json
        complaint = data.get('complaint', '도로 파손 신고')
        
        return jsonify({
            "status": "success",
            "service": "민원 접수/처리",
            "action": "open_ai_chat",
            "initial_message": f"안녕하세요. {complaint} 건으로 연락주셨군요. 자세한 내용을 말씀해주시면 즉시 처리하겠습니다."
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == '__main__':
    logger.info("🚀 오픈해시 기반 읍면동 시스템 백엔드 시작 (포트 5003)")
    app.run(host='0.0.0.0', port=5003, debug=False)
