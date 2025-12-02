from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import anthropic
import hashlib
import random
import json
from datetime import datetime
from copy import deepcopy

app = Flask(__name__)
CORS(app)

anthropic_client = None
ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY')
if ANTHROPIC_API_KEY:
    anthropic_client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

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

layers = {
    'layer1': [OpenHashLayer(f"읍면동_{i}", f"L1-{i}") for i in range(1, 6)],
    'layer2': [OpenHashLayer(f"시군구_{i}", f"L2-{i}") for i in range(1, 4)],
    'layer3': [OpenHashLayer(f"광역시도_{i}", f"L3-{i}") for i in range(1, 3)],
    'layer4': [OpenHashLayer("대한민국", "L4-1")]
}

# 더 상세한 사업자 재무제표
businesses = [
    {
        "id": "B001", "name": "테크코리아", "type": "IT서비스",
        "balance_sheet": {
            "assets": {
                "current": {
                    "cash": 150000000,
                    "accounts_receivable": 200000000,
                    "inventory": 100000000,
                    "prepaid_expenses": 50000000,
                    "total": 500000000
                },
                "fixed": {
                    "land": 300000000,
                    "buildings": 400000000,
                    "equipment": 200000000,
                    "vehicles": 100000000,
                    "total": 1000000000
                },
                "total": 1500000000
            },
            "liabilities": {
                "current": {
                    "accounts_payable": 100000000,
                    "notes_payable": 50000000,
                    "accrued_expenses": 50000000,
                    "total": 200000000
                },
                "long_term": {
                    "long_term_debt": 200000000,
                    "bonds_payable": 100000000,
                    "total": 300000000
                },
                "total": 500000000
            },
            "equity": {
                "capital_stock": 800000000,
                "retained_earnings": 200000000,
                "total": 1000000000
            }
        },
        "income_statement": {
            "revenue": 1000000000,
            "cogs": 600000000,
            "gross_profit": 400000000,
            "operating_expenses": {
                "salaries": 100000000,
                "rent": 30000000,
                "utilities": 20000000,
                "marketing": 30000000,
                "depreciation": 20000000,
                "total": 200000000
            },
            "operating_income": 200000000,
            "interest_expense": 30000000,
            "income_before_tax": 170000000,
            "income_tax": 20000000,
            "net_income": 150000000
        },
        "cash_flow": {
            "operating": 180000000,
            "investing": -50000000,
            "financing": -30000000,
            "net_change": 100000000
        },
        "hash_chain": ["GENESIS"]
    }
]

# 나머지 9개 사업자도 추가 (간략화)
for i in range(2, 11):
    businesses.append({
        "id": f"B{i:03d}",
        "name": ["글로벌무역", "제조산업", "식품유통", "건설개발", "금융투자", "부동산관리", "의료서비스", "교육컨설팅", "물류운송"][i-2],
        "type": ["무역", "제조", "유통", "건설", "금융", "부동산", "의료", "교육", "물류"][i-2],
        "balance_sheet": {
            "assets": {
                "current": {"cash": 100000000 + i*10000000, "accounts_receivable": 150000000, "inventory": 80000000, "prepaid_expenses": 20000000, "total": 350000000 + i*10000000},
                "fixed": {"land": 250000000, "buildings": 350000000, "equipment": 150000000, "vehicles": 50000000, "total": 800000000},
                "total": 1150000000 + i*10000000
            },
            "liabilities": {
                "current": {"accounts_payable": 80000000, "notes_payable": 40000000, "accrued_expenses": 30000000, "total": 150000000},
                "long_term": {"long_term_debt": 150000000, "bonds_payable": 50000000, "total": 200000000},
                "total": 350000000
            },
            "equity": {"capital_stock": 600000000 + i*10000000, "retained_earnings": 200000000, "total": 800000000 + i*10000000}
        },
        "income_statement": {
            "revenue": 800000000 + i*50000000,
            "cogs": 500000000 + i*30000000,
            "gross_profit": 300000000 + i*20000000,
            "operating_expenses": {"salaries": 80000000, "rent": 25000000, "utilities": 15000000, "marketing": 25000000, "depreciation": 15000000, "total": 160000000},
            "operating_income": 140000000 + i*20000000,
            "interest_expense": 20000000,
            "income_before_tax": 120000000 + i*20000000,
            "income_tax": 15000000,
            "net_income": 105000000 + i*20000000
        },
        "cash_flow": {"operating": 120000000, "investing": -40000000, "financing": -20000000, "net_change": 60000000},
        "hash_chain": ["GENESIS"]
    })

# 개인 재무제표
individuals = []
for i in range(1, 11):
    individuals.append({
        "id": f"P{i:03d}",
        "name": ["김*수", "이*영", "박*민", "최*아", "정*호", "강*희", "윤*준", "조*서", "장*우", "임*진"][i-1],
        "occupation": ["회사원", "자영업", "프리랜서", "교사", "의사", "변호사", "엔지니어", "디자이너", "농업인", "공무원"][i-1],
        "balance_sheet": {
            "assets": {
                "current": {"cash": 30000000 + i*5000000, "savings": 20000000, "total": 50000000 + i*5000000},
                "fixed": {"real_estate": 150000000, "vehicles": 30000000, "investments": 20000000, "total": 200000000},
                "total": 250000000 + i*5000000
            },
            "liabilities": {
                "mortgage": 80000000,
                "car_loan": 15000000,
                "credit_card": 5000000,
                "total": 100000000
            },
            "equity": {"net_worth": 150000000 + i*5000000, "total": 150000000 + i*5000000}
        },
        "income_statement": {
            "salary": 50000000 + i*5000000,
            "business_income": 5000000 if i % 2 == 0 else 0,
            "investment_income": 3000000,
            "other_income": 2000000,
            "total_income": 60000000 + i*5000000,
            "expenses": {
                "housing": 15000000,
                "food": 8000000,
                "transportation": 5000000,
                "utilities": 3000000,
                "insurance": 4000000,
                "education": 3000000,
                "entertainment": 2000000,
                "total": 40000000
            },
            "net_income": 20000000 + i*5000000
        },
        "cash_flow": {"income": 60000000 + i*5000000, "expenses": -40000000, "net_change": 20000000 + i*5000000},
        "hash_chain": ["GENESIS"]
    })

transaction_history = []

def find_entity(entity_id):
    """엔티티 찾기"""
    for b in businesses:
        if b['id'] == entity_id:
            return b
    for i in individuals:
        if i['id'] == entity_id:
            return i
    return None

def update_financials_after_transaction(from_entity, to_entity, amount):
    """거래 후 재무제표 업데이트"""
    # 송신자 - 현금 감소, 지출 증가
    if from_entity['id'].startswith('B'):
        from_entity['balance_sheet']['assets']['current']['cash'] -= amount
        from_entity['balance_sheet']['assets']['current']['total'] -= amount
        from_entity['balance_sheet']['assets']['total'] -= amount
        from_entity['income_statement']['operating_expenses']['total'] += amount
    else:
        from_entity['balance_sheet']['assets']['current']['cash'] -= amount
        from_entity['balance_sheet']['assets']['current']['total'] -= amount
        from_entity['balance_sheet']['assets']['total'] -= amount
        from_entity['income_statement']['expenses']['total'] += amount
        from_entity['cash_flow']['expenses'] -= amount
    
    # 수신자 - 현금 증가, 수입 증가
    if to_entity['id'].startswith('B'):
        to_entity['balance_sheet']['assets']['current']['cash'] += amount
        to_entity['balance_sheet']['assets']['current']['total'] += amount
        to_entity['balance_sheet']['assets']['total'] += amount
        to_entity['income_statement']['revenue'] += amount
    else:
        to_entity['balance_sheet']['assets']['current']['cash'] += amount
        to_entity['balance_sheet']['assets']['current']['total'] += amount
        to_entity['balance_sheet']['assets']['total'] += amount
        to_entity['income_statement']['total_income'] += amount
        to_entity['cash_flow']['income'] += amount

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
            "step": len(steps) + 1, "description": f"{selected_node.name}에 송신 및 해시 체인 갱신",
            "layer": layer_name, "node": selected_node.name,
            "sent_hash": current_hash[:16] + "...", "response_hash": layer_response_hash[:16] + "...",
            "chain_length": len(selected_node.hash_chain)
        })
        current_hash = layer_response_hash
    
    final_hash = hashlib.sha256(f"{initial_hash}{current_hash}".encode()).hexdigest()
    steps.append({"step": len(steps) + 1, "description": "최종 해시 생성 및 당사자 해시 체인에 추가", "final_hash": final_hash[:32] + "..."})
    return {"initial_hash": initial_hash, "final_hash": final_hash, "steps": steps}

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "service": "national-financial-statements", 
                    "claude_api": "connected" if anthropic_client else "not configured"})

@app.route('/api/entities', methods=['GET'])
def get_entities():
    return jsonify({"businesses": businesses, "individuals": individuals})

@app.route('/api/entity/<entity_id>', methods=['GET'])
def get_entity(entity_id):
    entity = find_entity(entity_id)
    if entity:
        return jsonify(entity)
    return jsonify({"error": "Entity not found"}), 404

@app.route('/api/transaction/simulate', methods=['POST'])
def simulate_transaction():
    data = request.json or {}
    from_id = data.get('from')
    to_id = data.get('to')
    amount = int(data.get('amount', 0))
    
    from_entity = find_entity(from_id)
    to_entity = find_entity(to_id)
    
    if not from_entity or not to_entity:
        return jsonify({"success": False, "error": "Invalid entity"}), 400
    
    # 거래 전 상태 저장
    from_before = deepcopy(from_entity)
    to_before = deepcopy(to_entity)
    
    transaction = {
        "timestamp": datetime.now().isoformat(),
        "from": from_id, "to": to_id,
        "amount": amount, "description": data.get('description', '거래')
    }
    
    # OpenHash 처리
    openhash_result = process_openhash_transaction(transaction)
    
    # 재무제표 업데이트
    update_financials_after_transaction(from_entity, to_entity, amount)
    
    transaction['openhash'] = openhash_result
    transaction['from_before'] = from_before
    transaction['to_before'] = to_before
    transaction['from_after'] = deepcopy(from_entity)
    transaction['to_after'] = deepcopy(to_entity)
    
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
- 금액: {transaction.get('amount'):,}원
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

# AI 채팅 엔드포인트
@app.route('/api/chat', methods=['POST'])
def chat():
    """Claude AI 채팅"""
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        conversation_history = data.get('history', [])
        
        if not user_message:
            return jsonify({'success': False, 'error': '메시지를 입력해주세요'}), 400
        
        # Claude API 호출
        headers = {
            'Content-Type': 'application/json',
            'x-api-key': ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01'
        }
        
        # 시스템 프롬프트
        system_prompt = """당신은 OpenHash 기반 국가 재무제표 시스템의 AI 상담원입니다. 

OpenHash는 블록체인의 대안 기술로, 다음과 같은 특징을 가지고 있습니다:
- 4계층 분산 검증 구조 (읍면동 → 시군구 → 광역시도 → 국가)
- 확률적 노드 선택으로 98.5% 에너지 절감
- 작업증명(PoW) 없이 암호학적 보안 유지
- 모든 거래가 Hash Chain으로 상호 연동되어 위변조 불가능

이 시스템은:
- 한국 5천만 국민 + 1천만 사업자의 실시간 재무제표 자동 생성
- 거래 발생 시 즉시 모든 당사자의 재무제표가 자동 갱신
- Claude AI 기반 이상거래 실시간 감지 및 자동 대응

사용자의 질문에 친절하고 명확하게 답변해주세요. 기술적인 내용은 쉽게 설명하고, 필요시 예시를 들어주세요."""
        
        # 대화 이력 포맷팅
        messages = []
        for msg in conversation_history:
            messages.append({
                'role': msg['role'],
                'content': msg['content']
            })
        
        # 새 메시지 추가
        messages.append({
            'role': 'user',
            'content': user_message
        })
        
        # Claude API 요청
        claude_response = requests.post(
            'https://api.anthropic.com/v1/messages',
            headers=headers,
            json={
                'model': 'claude-sonnet-4-20250514',
                'max_tokens': 1000,
                'system': system_prompt,
                'messages': messages
            },
            timeout=30
        )
        
        if claude_response.status_code == 200:
            response_data = claude_response.json()
            assistant_message = response_data['content'][0]['text']
            
            return jsonify({
                'success': True,
                'message': assistant_message
            })
        else:
            return jsonify({
                'success': False,
                'error': 'AI 응답 실패'
            }), 500
            
    except Exception as e:
        print(f"채팅 오류: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

