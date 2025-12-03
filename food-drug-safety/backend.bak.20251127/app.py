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

SYSTEM_INFO = {
    "system_name": "식품의약품안전처 AI 자동화 시스템",
    "description": "식품·의약품 안전 관리 AI 통합 플랫폼",
    "monitored_products": 2850000,
    "daily_inspections": 45000,
    "recall_detection_rate": "99.7%",
    "response_time": "평균 2.3초"
}

CATEGORIES = [
    {"id": "food", "name": "식품안전", "icon": "🍎", "items": 1250000},
    {"id": "drug", "name": "의약품", "icon": "💊", "items": 85000},
    {"id": "medical_device", "name": "의료기기", "icon": "🏥", "items": 120000},
    {"id": "cosmetics", "name": "화장품", "icon": "💄", "items": 350000},
    {"id": "bio", "name": "바이오", "icon": "🧬", "items": 45000}
]

SCENARIOS = [
    {
        "icon": "🔬",
        "title": "AI 식품 안전 검사",
        "problem": "연간 280만 건 식품 검사에 6,000명 인력 필요, 샘플링 한계",
        "solution": "AI가 생산 데이터 실시간 분석, 위험 제품 99.7% 사전 탐지",
        "savings": "연간 3,200억 원 검사비용 절감"
    },
    {
        "icon": "💊",
        "title": "의약품 부작용 모니터링",
        "problem": "부작용 신고 접수 후 분석까지 평균 14일 소요",
        "solution": "AI가 전국 부작용 데이터 실시간 분석, 위험 패턴 즉시 탐지",
        "savings": "부작용 피해 82% 감소"
    },
    {
        "icon": "📦",
        "title": "자동 리콜 시스템",
        "problem": "위해 식품 발견 시 리콜까지 평균 72시간 소요",
        "solution": "AI가 위험 탐지 즉시 유통경로 추적, 2시간 내 리콜 완료",
        "savings": "식품사고 피해 94% 감소"
    },
    {
        "icon": "🏭",
        "title": "제조시설 실시간 감시",
        "problem": "현장 점검 인력 부족으로 연 1회 정기점검이 한계",
        "solution": "IoT+AI로 24시간 위생상태 모니터링, 이상 즉시 알림",
        "savings": "위생사고 예방 연간 1.8조 원"
    }
]

AGENTS = [
    {"id": "food_safety", "name": "🍎 식품안전 상담 Agent"},
    {"id": "drug_info", "name": "💊 의약품 정보 Agent"},
    {"id": "side_effect", "name": "⚠️ 부작용 신고 Agent"},
    {"id": "recall_check", "name": "📦 리콜 조회 Agent"},
    {"id": "license_guide", "name": "📋 인허가 안내 Agent"}
]

RECENT_RECALLS = [
    {"id": "RC-2025-1101", "product": "OO식품 돈까스", "reason": "알레르기 미표시", "date": "2025-11-20", "status": "회수중"},
    {"id": "RC-2025-1098", "product": "XX제약 감기약", "reason": "함량 부적합", "date": "2025-11-18", "status": "회수완료"},
    {"id": "RC-2025-1095", "product": "YY화장품 선크림", "reason": "유해물질 검출", "date": "2025-11-15", "status": "회수완료"}
]

@app.route('/api/food-drug-safety/info', methods=['GET'])
def get_info():
    return jsonify(SYSTEM_INFO)

@app.route('/api/food-drug-safety/categories', methods=['GET'])
def get_categories():
    return jsonify({"categories": CATEGORIES})

@app.route('/api/food-drug-safety/scenarios', methods=['GET'])
def get_scenarios():
    return jsonify({"scenarios": SCENARIOS})

@app.route('/api/food-drug-safety/agents', methods=['GET'])
def get_agents():
    return jsonify({"agents": AGENTS})

@app.route('/api/food-drug-safety/recalls', methods=['GET'])
def get_recalls():
    return jsonify({"recalls": RECENT_RECALLS})

@app.route('/api/food-drug-safety/consultation', methods=['POST', 'OPTIONS'])
def consultation():
    if request.method == 'OPTIONS':
        return '', 204
    
    if not client:
        return jsonify({"response": "⚠️ API 키가 설정되지 않았습니다."}), 200
    
    try:
        data = request.json
        message = data.get('message', '')
        agent_type = data.get('agent_type', 'food_safety')
        
        prompts = {
            "food_safety": "당신은 식품안전 전문 AI입니다. 식품 위생, 영양 정보, 유통기한, 보관방법 등을 안내합니다.",
            "drug_info": "당신은 의약품 정보 전문 AI입니다. 의약품 효능, 복용법, 주의사항, 상호작용을 안내합니다.",
            "side_effect": "당신은 의약품 부작용 신고 접수 AI입니다. 부작용 증상을 청취하고 신고 절차를 안내합니다.",
            "recall_check": "당신은 리콜 제품 조회 AI입니다. 리콜 대상 제품 확인 및 환불/교환 절차를 안내합니다.",
            "license_guide": "당신은 식품/의약품 인허가 안내 AI입니다. 제조·수입·판매 허가 절차를 안내합니다."
        }
        
        system_prompt = prompts.get(agent_type, prompts["food_safety"])
        system_prompt += "\n\n정확한 정보를 제공하고, 건강과 안전에 관한 사항은 신중하게 답변하세요. 심각한 부작용이나 응급상황은 즉시 의료기관 방문을 권고하세요."
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            system=system_prompt,
            messages=[{"role": "user", "content": message}]
        )
        
        return jsonify({"response": response.content[0].text})
        
    except Exception as e:
        return jsonify({"response": f"오류: {str(e)}"}), 500

@app.route('/api/food-drug-safety/report-side-effect', methods=['POST'])
def report_side_effect():
    data = request.json
    
    report = {
        "report_id": "SE-2025-112400001",
        "status": "접수완료",
        "product_name": data.get('product_name', ''),
        "symptoms": data.get('symptoms', ''),
        "submitted_at": "2025-11-24T07:35:00Z",
        "expected_review": "24시간 이내 검토 예정",
        "message": "신고가 접수되었습니다. 증상이 심각하면 즉시 의료기관을 방문하세요."
    }
    
    return jsonify({"report": report})

@app.route('/api/food-drug-safety/check-product', methods=['POST'])
def check_product():
    data = request.json
    barcode = data.get('barcode', '')
    
    result = {
        "barcode": barcode,
        "product_name": "OO식품 우유 1L",
        "manufacturer": "OO유업",
        "safety_status": "안전",
        "recall_status": "해당없음",
        "expiry_date": "2025-12-15",
        "certifications": ["HACCP", "친환경인증"],
        "nutritional_info": {
            "calories": 130,
            "protein": 6.5,
            "fat": 7.2,
            "carbs": 9.8
        }
    }
    
    return jsonify({"product": result})

if __name__ == '__main__':
    logger.info("🚀 식품의약품안전처 AI 시스템 백엔드 시작 (포트 5004)")
    app.run(host='0.0.0.0', port=5004, debug=False)
