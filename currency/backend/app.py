from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY', '')
client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY) if ANTHROPIC_API_KEY else None

CURRENCY_INFO = {
    "system_name": "민간 경쟁형 디지털 화폐 시스템",
    "description": "세계 최초 완전 자율 금융 생태계",
    "total_currencies": 15,
    "total_transactions_daily": 2850000
}

DIGITAL_CURRENCIES = [
    {"id": "KDC", "name": "한국디지털원", "issuer": "한국은행", "market_share": 35.2},
    {"id": "SDC", "name": "삼성페이코인", "issuer": "삼성금융", "market_share": 18.7},
    {"id": "KKC", "name": "카카오코인", "issuer": "카카오뱅크", "market_share": 15.3}
]

SCENARIOS = [
    {
        "icon": "💰",
        "title": "실시간 환율 경쟁",
        "problem": "중앙은행 단일 통화로 인한 경쟁 부재",
        "solution": "15개 민간 디지털 화폐가 실시간 경쟁",
        "savings": "연간 12.3조 원 절감"
    }
]

AGENTS = [
    {"id": "currency_advisor", "name": "💰 디지털 화폐 상담 Agent"},
    {"id": "exchange_optimizer", "name": "📊 환율 최적화 Agent"}
]

@app.route('/api/currency/info', methods=['GET'])
def get_info():
    return jsonify(CURRENCY_INFO)

@app.route('/api/currency/currencies', methods=['GET'])
def get_currencies():
    return jsonify({"currencies": DIGITAL_CURRENCIES})

@app.route('/api/currency/scenarios', methods=['GET'])
def get_scenarios():
    return jsonify({"scenarios": SCENARIOS})

@app.route('/api/currency/agents', methods=['GET'])
def get_agents():
    return jsonify({"agents": AGENTS})

@app.route('/api/currency/consultation', methods=['POST', 'OPTIONS'])
def consultation():
    if request.method == 'OPTIONS':
        return '', 204
    
    if not client:
        return jsonify({"response": "⚠️ API 키가 설정되지 않았습니다."}), 200
    
    try:
        data = request.json
        message = data.get('message', '')
        agent_type = data.get('agent_type', 'currency_advisor')
        
        system_prompt = "당신은 민간 경쟁형 디지털 화폐 시스템 전문 상담사입니다. 디지털 화폐의 개념, 장점, 사용법을 쉽게 설명합니다."
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            system=system_prompt,
            messages=[{"role": "user", "content": message}]
        )
        
        return jsonify({"response": response.content[0].text})
        
    except Exception as e:
        return jsonify({"response": f"오류: {str(e)}"}), 500

if __name__ == '__main__':
    logger.info("🚀 민간 경쟁형 디지털 화폐 백엔드 시작 (포트 5001)")
    app.run(host='0.0.0.0', port=5001, debug=False)
