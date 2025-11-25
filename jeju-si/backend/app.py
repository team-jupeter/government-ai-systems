# -*- coding: utf-8 -*-
from flask import Flask, jsonify, request
from flask_cors import CORS
import hashlib
import random
from datetime import datetime
import anthropic
import os

app = Flask(__name__)
CORS(app)

anthropic_api_key = os.environ.get('ANTHROPIC_API_KEY')
if anthropic_api_key:
    client = anthropic.Anthropic(api_key=anthropic_api_key)

SYSTEM_INFO = {
    "system_name": "오픈해시 기반 스마트 제주시청 행정 자동화 시스템",
    "level": "시군구 (Layer 1)",
    "jurisdiction": "19개 읍면동",
    "population": 500000,
    "ai_agents": 9,
    "automation_rate": "97.5%",
    "energy_savings": "98.5%",
    "openhash_layers": 4
}

AGENTS = [
    {"id": "city_civil_agent", "name": "📄 시민민원 Agent", "description": "제주시 전체 민원 통합 처리 및 읍면동 배정"},
    {"id": "certificate_agent", "name": "📋 증명발급 Agent", "description": "각종 시청 증명서 자동 발급 및 진위 확인"},
    {"id": "welfare_agent", "name": "🏠 복지서비스 Agent", "description": "시 단위 복지 서비스 통합 관리"},
    {"id": "tax_agent", "name": "💰 시세처리 Agent", "description": "재산세, 자동차세 등 시세 자동 부과/징수"},
    {"id": "citrus_fishery_agent", "name": "🍊 감귤수산 Agent", "description": "감귤 유통, 수산업 지원 AI 컨설팅"},
    {"id": "tourism_agent", "name": "🌴 관광진흥 Agent", "description": "관광객 문의 응대 및 관광정보 제공"},
    {"id": "call_center_agent", "name": "📞 120콜센터 Agent", "description": "24시간 시민 상담 및 민원 접수"},
    {"id": "pdv_agent", "name": "🔐 PDV관리 Agent", "description": "프라이빗 데이터 금고 관리"},
    {"id": "openhash_agent", "name": "⛓️ 오픈해시 Agent", "description": "계층 1(시군구) 분산 해시 체인 기록"}
]

SERVICES = [
    {"id": "city_registration", "name": "주민등록 통합관리", "category": "민원", "processing_time": "1분"},
    {"id": "certificate_issuance", "name": "증명서 통합발급", "category": "증명", "processing_time": "30초"},
    {"id": "city_tax", "name": "시세 부과/징수", "category": "세무", "processing_time": "3분"},
    {"id": "citrus_fishery", "name": "감귤/수산 지원", "category": "산업", "processing_time": "5분"},
    {"id": "tourism_info", "name": "관광정보 제공", "category": "관광", "processing_time": "실시간"}
]

OPENHASH_LAYERS = [
    {"layer": 1, "name": "시군구 계층", "nodes": 226, "description": "제주시청"},
    {"layer": 2, "name": "읍면동 계층", "nodes": 3551, "description": "19개 읍면동"},
    {"layer": 3, "name": "광역 계층", "nodes": 17, "description": "제주도청"},
    {"layer": 4, "name": "중앙 계층", "nodes": 1, "description": "행정안전부"}
]

def generate_sha256_hash(data):
    return hashlib.sha256(str(data).encode()).hexdigest()

def probabilistic_layer_selection(hash_value):
    selected_layers = []
    for layer in OPENHASH_LAYERS:
        rehash = generate_sha256_hash(hash_value + str(layer["layer"]))
        if int(rehash[:2], 16) < 64:
            selected_layers.append({
                "layer_name": layer["name"],
                "layer_number": layer["layer"],
                "node_id": f"Layer{layer['layer']}-Node-{rehash[:8]}",
                "timestamp": datetime.now().isoformat()
            })
    return selected_layers

class FinancialStatement:
    def __init__(self, owner_id, owner_name, owner_type):
        self.owner_id = owner_id
        self.owner_name = owner_name
        self.owner_type = owner_type
        self.assets = 10000000 if owner_type == "individual" else 500000000
        self.liabilities = 0
        self.equity = self.assets
        self.transactions = []
    
    def debit(self, amount, description):
        self.assets -= amount
        self.equity -= amount
        self.transactions.append({"type": "debit", "amount": amount, "description": description, "timestamp": datetime.now().isoformat()})
    
    def credit(self, amount, description):
        self.assets += amount
        self.equity += amount
        self.transactions.append({"type": "credit", "amount": amount, "description": description, "timestamp": datetime.now().isoformat()})
    
    def to_dict(self):
        return {"owner_id": self.owner_id, "owner_name": self.owner_name, "owner_type": self.owner_type, "assets": self.assets, "liabilities": self.liabilities, "equity": self.equity, "transactions": self.transactions[-5:]}

financial_statements = {}

@app.route('/info', methods=['GET'])
def get_info():
    return jsonify(SYSTEM_INFO)

@app.route('/services', methods=['GET'])
def get_services():
    return jsonify({"services": SERVICES})

@app.route('/agents', methods=['GET'])
def get_agents():
    return jsonify({"agents": AGENTS})

@app.route('/layers', methods=['GET'])
def get_layers():
    return jsonify({"layers": OPENHASH_LAYERS})

@app.route('/simulate/city-registration', methods=['POST'])
def simulate_city_registration():
    pdv_data = {"이름": "김제주", "생년월일": "1985-03-15", "주소": "제주시 연동", "세대주": True}
    steps = [
        {"step": 1, "action": "PDV 신원 확인", "time": 0.3},
        {"step": 2, "action": "19개 읍면동 데이터 통합", "time": 0.6},
        {"step": 3, "action": "주민등록표 생성", "time": 1.0},
        {"step": 4, "action": "오픈해시 기록", "time": 1.5}
    ]
    transaction_data = {"who": f"JEJU-{random.randint(100000, 999999)}", "what": "주민등록", "where": "제주시청", "when": datetime.now().isoformat()}
    hash_value = generate_sha256_hash(transaction_data)
    return jsonify({"service": "주민등록 통합관리", "pdv_data": pdv_data, "steps": steps, "transaction": {"hash_value": hash_value, "layers": probabilistic_layer_selection(hash_value)}})

@app.route('/simulate/certificate-issuance', methods=['POST'])
def simulate_certificate():
    pdv_data = {"신청자": "박한라", "증명서": "주민등록등본", "용도": "금융기관"}
    steps = [
        {"step": 1, "action": "PDV 인증", "time": 0.2},
        {"step": 2, "action": "디지털 서명", "time": 0.5},
        {"step": 3, "action": "PDF 생성", "time": 0.8}
    ]
    transaction_data = {"who": f"CERT-{random.randint(100000, 999999)}", "what": "증명서 발급", "where": "제주시청"}
    hash_value = generate_sha256_hash(transaction_data)
    return jsonify({"service": "증명서 통합발급", "pdv_data": pdv_data, "steps": steps, "transaction": {"hash_value": hash_value, "layers": probabilistic_layer_selection(hash_value)}})

@app.route('/simulate/city-tax', methods=['POST'])
def simulate_city_tax():
    taxpayer_id = f"TAX-{random.randint(10000, 99999)}"
    government_id = "JEJU-CITY-GOVT"
    if taxpayer_id not in financial_statements:
        financial_statements[taxpayer_id] = FinancialStatement(taxpayer_id, "이제주", "individual")
    if government_id not in financial_statements:
        financial_statements[government_id] = FinancialStatement(government_id, "제주시청", "government")
    taxpayer = financial_statements[taxpayer_id]
    government = financial_statements[government_id]
    tax_amount = 350000
    taxpayer.debit(tax_amount, "재산세")
    government.credit(tax_amount, "재산세 수납")
    pdv_data = {"납세자": "이제주", "과세대상": "재산세", "세액": f"{tax_amount:,}원"}
    steps = [
        {"step": 1, "action": "PDV 재산조회", "time": 0.5},
        {"step": 2, "action": "세액 계산", "time": 1.5},
        {"step": 3, "action": "재무제표 처리", "time": 2.0}
    ]
    transaction_data = {"who": taxpayer_id, "what": "재산세", "amount": tax_amount}
    hash_value = generate_sha256_hash(transaction_data)
    return jsonify({"service": "시세 부과/징수", "pdv_data": pdv_data, "steps": steps, "tax_amount": tax_amount, "taxpayer_statement": taxpayer.to_dict(), "government_statement": government.to_dict(), "transaction": {"hash_value": hash_value, "layers": probabilistic_layer_selection(hash_value)}})

@app.route('/simulate/citrus-fishery', methods=['POST'])
def simulate_citrus():
    pdv_data = {"신청자": "강감귤", "업종": "감귤농가", "면적": "3,000㎡"}
    steps = [
        {"step": 1, "action": "농가정보 확인", "time": 0.5},
        {"step": 2, "action": "AI 시세분석", "time": 1.5},
        {"step": 3, "action": "보조금 승인", "time": 3.0}
    ]
    transaction_data = {"who": "CITRUS-001", "what": "감귤지원"}
    hash_value = generate_sha256_hash(transaction_data)
    return jsonify({"service": "감귤/수산 지원", "pdv_data": pdv_data, "steps": steps, "transaction": {"hash_value": hash_value, "layers": probabilistic_layer_selection(hash_value)}})

@app.route('/simulate/tourism-info', methods=['POST'])
def simulate_tourism():
    return jsonify({"action": "open_ai_chat", "initial_message": "안녕하세요! 제주시 관광 AI입니다. 🌴 관광지, 맛집, 숙박 정보를 안내해드립니다."})

@app.route('/consultation', methods=['POST'])
def consultation():
    data = request.json
    user_message = data.get('message', '')
    if not anthropic_api_key:
        return jsonify({"response": "API 키가 설정되지 않았습니다."})
    try:
        message = client.messages.create(model="claude-sonnet-4-20250514", max_tokens=1000, system="당신은 제주시청 AI 상담원입니다.", messages=[{"role": "user", "content": user_message}])
        return jsonify({"response": message.content[0].text})
    except Exception as e:
        return jsonify({"response": f"오류: {str(e)}"})

if __name__ == '__main__':
    import logging
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)
    logger.info("🚀 제주시청 백엔드 시작 (포트 5012)")
    app.run(host='0.0.0.0', port=5012, debug=False)
