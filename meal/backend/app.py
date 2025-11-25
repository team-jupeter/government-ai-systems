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
    "system_name": "AI 기반 국가 자율 급식 시스템",
    "description": "전국민 맞춤형 영양 급식 자동화 플랫폼",
    "daily_meals": 18500000,
    "facilities": 52000,
    "food_waste_reduction": "67.3%",
    "nutrition_optimization": "94.5%",
    "annual_savings": "연간 2.8조 원"
}

FACILITY_TYPES = [
    {"id": "school", "name": "학교 급식", "icon": "🏫", "facilities": 12000, "daily_meals": 6200000},
    {"id": "military", "name": "군 급식", "icon": "🎖️", "facilities": 3500, "daily_meals": 850000},
    {"id": "hospital", "name": "병원 급식", "icon": "🏥", "facilities": 4200, "daily_meals": 1200000},
    {"id": "welfare", "name": "복지시설 급식", "icon": "🏠", "facilities": 8500, "daily_meals": 950000},
    {"id": "elderly", "name": "노인 급식", "icon": "👴", "facilities": 15000, "daily_meals": 2800000},
    {"id": "public", "name": "공공기관 급식", "icon": "🏛️", "facilities": 8800, "daily_meals": 6500000}
]

MENU_CATEGORIES = [
    {"id": "korean", "name": "한식", "icon": "🍚", "popularity": 65},
    {"id": "western", "name": "양식", "icon": "🍝", "popularity": 18},
    {"id": "chinese", "name": "중식", "icon": "🥡", "popularity": 10},
    {"id": "japanese", "name": "일식", "icon": "🍱", "popularity": 5},
    {"id": "special", "name": "특식", "icon": "🍖", "popularity": 2}
]

SCENARIOS = [
    {
        "icon": "🤖",
        "title": "AI 맞춤 메뉴 추천",
        "problem": "획일적 급식으로 잔반 발생, 영양 불균형",
        "solution": "AI가 개인별 건강 데이터, 알레르기, 선호도 분석하여 맞춤 메뉴 제공",
        "savings": "잔반 67.3% 감소"
    },
    {
        "icon": "📊",
        "title": "수요 예측 시스템",
        "problem": "급식 인원 예측 실패로 과잉/부족 발생",
        "solution": "AI가 날씨, 행사, 패턴 분석하여 정확한 식수 예측",
        "savings": "식재료 낭비 58% 감소"
    },
    {
        "icon": "🥗",
        "title": "영양 최적화",
        "problem": "연령별, 건강상태별 영양 요구량 다름",
        "solution": "AI가 대상별 최적 영양소 조합 메뉴 자동 설계",
        "savings": "영양 충족률 94.5% 달성"
    },
    {
        "icon": "🚚",
        "title": "스마트 식자재 관리",
        "problem": "식자재 유통기한 관리 어려움, 폐기 손실",
        "solution": "AI가 재고 실시간 모니터링, 최적 발주량 자동 계산",
        "savings": "식자재 비용 23% 절감"
    }
]

AGENTS = [
    {"id": "menu_planner", "name": "🍽️ 메뉴 설계 Agent"},
    {"id": "nutrition_advisor", "name": "🥗 영양 상담 Agent"},
    {"id": "inventory_manager", "name": "📦 재고 관리 Agent"},
    {"id": "allergy_checker", "name": "⚠️ 알레르기 체크 Agent"},
    {"id": "waste_reducer", "name": "♻️ 잔반 감소 Agent"}
]

@app.route('/api/meal/info', methods=['GET'])
def get_info():
    return jsonify(SYSTEM_INFO)

@app.route('/api/meal/facility-types', methods=['GET'])
def get_facility_types():
    return jsonify({"facility_types": FACILITY_TYPES})

@app.route('/api/meal/menu-categories', methods=['GET'])
def get_menu_categories():
    return jsonify({"categories": MENU_CATEGORIES})

@app.route('/api/meal/scenarios', methods=['GET'])
def get_scenarios():
    return jsonify({"scenarios": SCENARIOS})

@app.route('/api/meal/agents', methods=['GET'])
def get_agents():
    return jsonify({"agents": AGENTS})

@app.route('/api/meal/consultation', methods=['POST', 'OPTIONS'])
def consultation():
    if request.method == 'OPTIONS':
        return '', 204
    
    if not client:
        return jsonify({"response": "⚠️ API 키가 설정되지 않았습니다."}), 200
    
    try:
        data = request.json
        message = data.get('message', '')
        agent_type = data.get('agent_type', 'nutrition_advisor')
        
        prompts = {
            "menu_planner": "당신은 급식 메뉴 설계 AI입니다. 영양, 비용, 선호도를 고려하여 최적의 급식 메뉴를 설계합니다.",
            "nutrition_advisor": "당신은 영양 상담 AI입니다. 연령별, 건강상태별 맞춤 영양 정보를 제공합니다.",
            "inventory_manager": "당신은 식자재 재고 관리 AI입니다. 최적 발주량, 유통기한 관리, 비용 절감 방안을 안내합니다.",
            "allergy_checker": "당신은 알레르기 체크 AI입니다. 식품 알레르기 정보와 대체 식품을 안내합니다.",
            "waste_reducer": "당신은 잔반 감소 AI입니다. 음식물 쓰레기 줄이기 방안과 적정 배식량을 안내합니다."
        }
        
        system_prompt = prompts.get(agent_type, prompts["nutrition_advisor"])
        system_prompt += "\n\n국가 급식 시스템의 AI로서 영양, 안전, 효율성을 중시하여 안내하세요."
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            system=system_prompt,
            messages=[{"role": "user", "content": message}]
        )
        
        return jsonify({"response": response.content[0].text})
        
    except Exception as e:
        return jsonify({"response": f"오류: {str(e)}"}), 500

@app.route('/api/meal/today-menu', methods=['GET'])
def today_menu():
    menu = {
        "date": "2025-11-24",
        "meals": {
            "breakfast": {
                "main": "현미밥",
                "soup": "된장국",
                "side1": "계란말이",
                "side2": "김치",
                "side3": "우유",
                "calories": 520,
                "nutrients": {"protein": 18, "carbs": 72, "fat": 15}
            },
            "lunch": {
                "main": "잡곡밥",
                "soup": "미역국",
                "side1": "제육볶음",
                "side2": "시금치나물",
                "side3": "깍두기",
                "dessert": "사과",
                "calories": 780,
                "nutrients": {"protein": 28, "carbs": 95, "fat": 22}
            },
            "dinner": {
                "main": "흰쌀밥",
                "soup": "북어국",
                "side1": "생선구이",
                "side2": "콩나물무침",
                "side3": "배추김치",
                "calories": 650,
                "nutrients": {"protein": 32, "carbs": 78, "fat": 18}
            }
        },
        "total_calories": 1950,
        "allergy_info": ["계란", "우유", "대두", "밀"]
    }
    
    return jsonify({"menu": menu})

@app.route('/api/meal/recommend-menu', methods=['POST'])
def recommend_menu():
    data = request.json
    target_group = data.get('target_group', 'school')
    preferences = data.get('preferences', [])
    allergies = data.get('allergies', [])
    
    recommendation = {
        "target_group": target_group,
        "weekly_menu": [
            {"day": "월", "main": "불고기덮밥", "soup": "계란국", "calories": 750},
            {"day": "화", "main": "카레라이스", "soup": "콩나물국", "calories": 720},
            {"day": "수", "main": "비빔밥", "soup": "미역국", "calories": 680},
            {"day": "목", "main": "돈까스", "soup": "유부장국", "calories": 820},
            {"day": "금", "main": "김치볶음밥", "soup": "달걀탕", "calories": 700}
        ],
        "excluded_ingredients": allergies,
        "nutrition_score": 92,
        "cost_per_meal": 4500,
        "satisfaction_prediction": 88.5
    }
    
    return jsonify({"recommendation": recommendation})

@app.route('/api/meal/predict-demand', methods=['POST'])
def predict_demand():
    data = request.json
    facility_id = data.get('facility_id', '')
    date = data.get('date', '2025-11-25')
    
    prediction = {
        "facility_id": facility_id,
        "date": date,
        "predicted_meals": 1250,
        "confidence": 94.2,
        "factors": [
            {"factor": "날씨", "impact": "맑음 → +5%"},
            {"factor": "요일", "impact": "월요일 → +3%"},
            {"factor": "행사", "impact": "없음 → 0%"}
        ],
        "recommended_prep": {
            "rice": "62.5kg",
            "meat": "37.5kg",
            "vegetables": "50kg"
        },
        "historical_accuracy": "96.3%"
    }
    
    return jsonify({"prediction": prediction})

@app.route('/api/meal/nutrition-analysis', methods=['POST'])
def nutrition_analysis():
    data = request.json
    
    analysis = {
        "daily_intake": {
            "calories": {"target": 2000, "actual": 1950, "status": "적정"},
            "protein": {"target": 55, "actual": 78, "status": "양호"},
            "carbs": {"target": 300, "actual": 245, "status": "적정"},
            "fat": {"target": 65, "actual": 55, "status": "적정"},
            "fiber": {"target": 25, "actual": 18, "status": "부족"},
            "sodium": {"target": 2000, "actual": 2400, "status": "초과"}
        },
        "recommendations": [
            "식이섬유 섭취를 위해 채소 반찬 추가 권장",
            "나트륨 감소를 위해 국물 섭취량 조절 권장"
        ],
        "weekly_trend": "전반적으로 양호, 나트륨 관리 필요"
    }
    
    return jsonify({"analysis": analysis})

if __name__ == '__main__':
    logger.info("🚀 국가 자율 급식 시스템 백엔드 시작 (포트 5017)")
    app.run(host='0.0.0.0', port=5017, debug=False)
