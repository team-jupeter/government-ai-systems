from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import anthropic
import hashlib
import random
import time
from datetime import datetime, timedelta
import json

app = Flask(__name__)
CORS(app)

# Claude API 클라이언트
anthropic_client = None
ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY')
if ANTHROPIC_API_KEY:
    anthropic_client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

# OpenHash 계층 구조
class OpenHashLayer:
    def __init__(self, name, layer_id):
        self.name = name
        self.layer_id = layer_id
        self.hash_chain = ["GENESIS_HASH"]
    
    def add_hash(self, transaction_hash):
        last_hash = self.hash_chain[-1]
        combined = f"{last_hash}{transaction_hash}"
        new_hash = hashlib.sha256(combined.encode()).hexdigest()
        self.hash_chain.append(new_hash)
        return new_hash

# 계층 초기화
layers = {
    'layer1': [OpenHashLayer(f"읍면동_{i}", f"L1-{i}") for i in range(1, 6)],
    'layer2': [OpenHashLayer(f"시군구_{i}", f"L2-{i}") for i in range(1, 4)],
    'layer3': [OpenHashLayer(f"광역시도_{i}", f"L3-{i}") for i in range(1, 3)],
    'layer4': [OpenHashLayer("대한민국", "L4-1")]
}

# 가상 사업자 10곳
businesses = [
    {"id": "B001", "name": "테크코리아", "type": "IT서비스", "balance_sheet": {}, "income_statement": {}, "cash_flow": {}, "hash_chain": ["GENESIS"]},
    {"id": "B002", "name": "글로벌무역", "type": "무역", "balance_sheet": {}, "income_statement": {}, "cash_flow": {}, "hash_chain": ["GENESIS"]},
    {"id": "B003", "name": "제조산업", "type": "제조", "balance_sheet": {}, "income_statement": {}, "cash_flow": {}, "hash_chain": ["GENESIS"]},
    {"id": "B004", "name": "식품유통", "type": "유통", "balance_sheet": {}, "income_statement": {}, "cash_flow": {}, "hash_chain": ["GENESIS"]},
    {"id": "B005", "name": "건설개발", "type": "건설", "balance_sheet": {}, "income_statement": {}, "cash_flow": {}, "hash_chain": ["GENESIS"]},
    {"id": "B006", "name": "금융투자", "type": "금융", "balance_sheet": {}, "income_statement": {}, "cash_flow": {}, "hash_chain": ["GENESIS"]},
    {"id": "B007", "name": "부동산관리", "type": "부동산", "balance_sheet": {}, "income_statement": {}, "cash_flow": {}, "hash_chain": ["GENESIS"]},
    {"id": "B008", "name": "의료서비스", "type": "의료", "balance_sheet": {}, "income_statement": {}, "cash_flow": {}, "hash_chain": ["GENESIS"]},
    {"id": "B009", "name": "교육컨설팅", "type": "교육", "balance_sheet": {}, "income_statement": {}, "cash_flow": {}, "hash_chain": ["GENESIS"]},
    {"id": "B010", "name": "물류운송", "type": "물류", "balance_sheet": {}, "income_statement": {}, "cash_flow": {}, "hash_chain": ["GENESIS"]}
]

# 가상 개인 10명
individuals = [
    {"id": "P001", "name": "김*수", "occupation": "회사원", "balance_sheet": {}, "income_statement": {}, "cash_flow": {}, "hash_chain": ["GENESIS"]},
    {"id": "P002", "name": "이*영", "occupation": "자영업", "balance_sheet": {}, "income_statement": {}, "cash_flow": {}, "hash_chain": ["GENESIS"]},
    {"id": "P003", "name": "박*민", "occupation": "프리랜서", "balance_sheet": {}, "income_statement": {}, "cash_flow": {}, "hash_chain": ["GENESIS"]},
    {"id": "P004", "name": "최*아", "occupation": "교사", "balance_sheet": {}, "income_statement": {}, "cash_flow": {}, "hash_chain": ["GENESIS"]},
    {"id": "P005", "name": "정*호", "occupation": "의사", "balance_sheet": {}, "income_statement": {}, "cash_flow": {}, "hash_chain": ["GENESIS"]},
    {"id": "P006", "name": "강*희", "occupation": "변호사", "balance_sheet": {}, "income_statement": {}, "cash_flow": {}, "hash_chain": ["GENESIS"]},
    {"id": "P007", "name": "윤*준", "occupation": "엔지니어", "balance_sheet": {}, "income_statement": {}, "cash_flow": {}, "hash_chain": ["GENESIS"]},
    {"id": "P008", "name": "조*서", "occupation": "디자이너", "balance_sheet": {}, "income_statement": {}, "cash_flow": {}, "hash_chain": ["GENESIS"]},
    {"id": "P009", "name": "장*우", "occupation": "농업인", "balance_sheet": {}, "income_statement": {}, "cash_flow": {}, "hash_chain": ["GENESIS"]},
    {"id": "P010", "name": "임*진", "occupation": "공무원", "balance_sheet": {}, "income_statement": {}, "cash_flow": {}, "hash_chain": ["GENESIS"]}
]

def initialize_financials():
    for business in businesses:
        business["balance_sheet"] = {
            "assets": {"current": 500000000, "fixed": 1000000000, "total": 1500000000},
            "liabilities": {"current": 200000000, "long_term": 300000000, "total": 500000000},
            "equity": {"capital": 800000000, "retained_earnings": 200000000, "total": 1000000000}
        }
        business["income_statement"] = {
            "revenue": 1000000000, "cogs": 600000000, "gross_profit": 400000000,
            "operating_expenses": 200000000, "operating_income": 200000000, "net_income": 150000000
        }
        business["cash_flow"] = {"operating": 180000000, "investing": -50000000, "financing": -30000000, "net_change": 100000000}
    
    for individual in individuals:
        individual["balance_sheet"] = {
            "assets": {"cash": 50000000, "property": 200000000, "total": 250000000},
            "liabilities": {"loans": 100000000, "total": 100000000},
            "equity": {"net_worth": 150000000, "total": 150000000}
        }
        individual["income_statement"] = {
            "salary": 60000000, "other_income": 5000000, "total_income": 65000000,
            "expenses": 40000000, "net_income": 25000000
        }
        individual["cash_flow"] = {"income": 65000000, "expenses": -40000000, "net_change": 25000000}

initialize_financials()
transaction_history = []

def process_openhash_transaction(transaction_data):
    steps = []
    tx_string = json.dumps(transaction_data, sort_keys=True)
    initial_hash = hashlib.sha256(tx_string.encode()).hexdigest()
    steps.append({"step": 1, "description": "거래 데이터로부터 초기 해시 생성", "hash": initial_hash})
    
    current_hash = initial_hash
    for layer_name, layer_list in [('layer1', layers['layer1']), ('layer2', layers['layer2']), 
                                     ('layer3', layers['layer3']), ('layer4', layers['layer4'])]:
        selected_node = random.choice(layer_list)
        layer_response_hash = selected_node.add_hash(current_hash)
        steps.append({
            "step": len(steps) + 1,
            "description": f"{selected_node.name}에 송신 및 해시 체인 갱신",
            "layer": layer_name, "node": selected_node.name,
            "sent_hash": current_hash, "response_hash": layer_response_hash,
            "chain_length": len(selected_node.hash_chain)
        })
        current_hash = layer_response_hash
    
    final_hash = hashlib.sha256(f"{initial_hash}{current_hash}".encode()).hexdigest()
    steps.append({"step": len(steps) + 1, "description": "최종 해시 생성 및 당사자 해시 체인에 추가", "final_hash": final_hash})
    
    return {"initial_hash": initial_hash, "final_hash": final_hash, "steps": steps}

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "service": "national-financial-statements", 
                    "claude_api": "connected" if anthropic_client else "not configured"})

@app.route('/api/entities', methods=['GET'])
def get_entities():
    return jsonify({"businesses": businesses, "individuals": individuals})

@app.route('/api/entity/<entity_id>', methods=['GET'])
def get_entity(entity_id):
    for b in businesses:
        if b['id'] == entity_id:
            return jsonify(b)
    for i in individuals:
        if i['id'] == entity_id:
            return jsonify(i)
    return jsonify({"error": "Entity not found"}), 404

@app.route('/api/transaction/simulate', methods=['POST'])
def simulate_transaction():
    data = request.json or {}
    transaction = {
        "timestamp": datetime.now().isoformat(),
        "from": data.get('from'), "to": data.get('to'),
        "amount": data.get('amount', 0), "description": data.get('description', '거래')
    }
    openhash_result = process_openhash_transaction(transaction)
    transaction['openhash'] = openhash_result
    transaction_history.append(transaction)
    return jsonify({"success": True, "transaction": transaction, "openhash": openhash_result})

@app.route('/api/analyze', methods=['POST'])
def analyze_transaction():
    if not anthropic_client:
        return jsonify({"success": False, "error": "Claude API not configured"}), 503
    
    data = request.json or {}
    transaction = data.get('transaction', {})
    
    prompt = f"""다음 거래를 분석하여 이상 패턴이 있는지 검토하세요:

거래 정보:
- 보내는 사람: {transaction.get('from')}
- 받는 사람: {transaction.get('to')}
- 금액: {transaction.get('amount')}원
- 설명: {transaction.get('description')}

다음 관점에서 분석하세요:
1. 거래 금액의 적정성
2. 거래 패턴의 정상성
3. 잠재적 위험 요소
4. 권장 조치사항"""

    try:
        response = anthropic_client.messages.create(
            model="claude-sonnet-4-20250514", max_tokens=2000,
            messages=[{"role": "user", "content": prompt}]
        )
        return jsonify({"success": True, "analysis": response.content[0].text})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/transactions/history', methods=['GET'])
def get_transaction_history():
    return jsonify({"transactions": transaction_history[-50:]})

@app.route('/api/layers/status', methods=['GET'])
def get_layers_status():
    status = {}
    for layer_name, layer_list in layers.items():
        status[layer_name] = [{"name": node.name, "id": node.layer_id, 
                                "chain_length": len(node.hash_chain),
                                "last_hash": node.hash_chain[-1][:16] + "..."} 
                               for node in layer_list]
    return jsonify(status)

if __name__ == '__main__':
    print("🚀 국가 재무제표 시스템 시작 (포트 5000)")
    print(f"✅ Claude API: {'연결됨' if anthropic_client else '미연결'}")
    app.run(host='0.0.0.0', port=5000, debug=False)
