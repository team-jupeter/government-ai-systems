from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os
import logging

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY', '')
client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY) if ANTHROPIC_API_KEY else None

SYSTEM_INFO = {
    "system_name": "AI 기반 국가 무상 의료 시스템",
    "description": "OpenHash 기술 기반 전국민 무상 의료 플랫폼",
    "covered_population": 52000000,
    "hospitals_connected": 4200,
    "daily_consultations": 850000,
    "ai_diagnosis_accuracy": "97.3%",
    "avg_wait_time": "12분"
}

MEDICAL_SERVICES = [
    {"id": "primary_care", "name": "1차 진료", "icon": "🏥", "coverage": "100%"},
    {"id": "specialist", "name": "전문 진료", "icon": "👨‍⚕️", "coverage": "100%"},
    {"id": "emergency", "name": "응급 의료", "icon": "🚑", "coverage": "100%"},
    {"id": "surgery", "name": "수술", "icon": "🔪", "coverage": "100%"},
    {"id": "dental", "name": "치과", "icon": "🦷", "coverage": "100%"},
    {"id": "mental_health", "name": "정신건강", "icon": "🧠", "coverage": "100%"},
    {"id": "rehabilitation", "name": "재활", "icon": "🏃", "coverage": "100%"},
    {"id": "oriental", "name": "한방", "icon": "🌿", "coverage": "100%"}
]

SCENARIOS = [
    {
        "icon": "🤖",
        "title": "AI 초진 시스템",
        "problem": "의사 부족으로 진료 대기 평균 3시간, 오진율 12%",
        "solution": "AI가 증상 분석 후 97.3% 정확도로 사전 진단, 적합 전문의 자동 연결",
        "savings": "대기시간 87% 단축, 오진율 2.1%로 감소"
    },
    {
        "icon": "💊",
        "title": "맞춤형 처방 시스템",
        "problem": "약물 상호작용, 개인별 부작용 고려 어려움",
        "solution": "AI가 환자 유전체·복용약·병력 분석하여 최적 처방 추천",
        "savings": "약물 부작용 76% 감소"
    },
    {
        "icon": "📊",
        "title": "건강 예측 시스템",
        "problem": "질병 발견 시 이미 진행된 경우 많음, 예방 어려움",
        "solution": "AI가 건강데이터 분석하여 질병 발생 5년 전 예측",
        "savings": "의료비 연간 23조 원 절감"
    },
    {
        "icon": "🏠",
        "title": "원격 의료 시스템",
        "problem": "도서·산간 지역 의료 접근성 낮음",
        "solution": "AI+원격진료로 전국 어디서나 전문의 진료 가능",
        "savings": "의료 사각지대 98% 해소"
    }
]

AGENTS = [
    {"id": "symptom_checker", "name": "🩺 증상 체크 Agent"},
    {"id": "hospital_finder", "name": "🏥 병원 찾기 Agent"},
    {"id": "prescription_info", "name": "💊 처방 정보 Agent"},
    {"id": "health_advisor", "name": "❤️ 건강 상담 Agent"},
    {"id": "insurance_guide", "name": "📋 의료비 안내 Agent"}
]

@app.route('/api/healthcare/info', methods=['GET'])
def get_info():
    return jsonify(SYSTEM_INFO)

@app.route('/api/healthcare/services', methods=['GET'])
def get_services():
    return jsonify({"services": MEDICAL_SERVICES})

@app.route('/api/healthcare/scenarios', methods=['GET'])
def get_scenarios():
    return jsonify({"scenarios": SCENARIOS})

@app.route('/api/healthcare/agents', methods=['GET'])
def get_agents():
    return jsonify({"agents": AGENTS})

@app.route('/api/healthcare/consultation', methods=['POST', 'OPTIONS'])
def consultation():
    if request.method == 'OPTIONS':
        return '', 204
    
    if not client:
        return jsonify({"response": "⚠️ API 키가 설정되지 않았습니다."}), 200
    
    try:
        data = request.json
        message = data.get('message', '')
        agent_type = data.get('agent_type', 'health_advisor')
        
        prompts = {
            "symptom_checker": "당신은 AI 증상 체크 전문가입니다. 증상을 듣고 가능한 원인과 권장 진료과를 안내합니다. 단, 정확한 진단은 의사만 할 수 있음을 명시하세요.",
            "hospital_finder": "당신은 병원 찾기 AI입니다. 증상, 위치, 시간에 맞는 적합한 병원을 추천합니다.",
            "prescription_info": "당신은 처방 정보 AI입니다. 약물 효능, 복용법, 부작용, 상호작용을 안내합니다.",
            "health_advisor": "당신은 건강 상담 AI입니다. 생활습관, 영양, 운동, 예방접종 등 건강 관리를 조언합니다.",
            "insurance_guide": "당신은 의료비 안내 AI입니다. 국가 무상의료 적용 범위와 절차를 안내합니다."
        }
        
        system_prompt = prompts.get(agent_type, prompts["health_advisor"])
        system_prompt += "\n\n국가 무상의료 시스템 하에서 모든 의료서비스가 무료임을 안내하세요. 응급상황이나 심각한 증상은 즉시 119 또는 응급실 방문을 권고하세요."
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            system=system_prompt,
            messages=[{"role": "user", "content": message}]
        )
        
        return jsonify({"response": response.content[0].text})
        
    except Exception as e:
        return jsonify({"response": f"오류: {str(e)}"}), 500

@app.route('/api/healthcare/check-symptoms', methods=['POST'])
def check_symptoms():
    data = request.json
    symptoms = data.get('symptoms', [])
    
    result = {
        "analysis_id": "SYM-2025-112400001",
        "symptoms": symptoms,
        "possible_conditions": [
            {"name": "감기", "probability": 72, "severity": "경미"},
            {"name": "독감", "probability": 18, "severity": "중등도"},
            {"name": "알레르기", "probability": 10, "severity": "경미"}
        ],
        "recommended_department": "내과",
        "urgency": "일반",
        "advice": "충분한 휴식과 수분 섭취를 권장합니다. 증상이 3일 이상 지속되면 병원 방문을 권장합니다.",
        "disclaimer": "이 결과는 AI 분석이며, 정확한 진단은 의사의 진료가 필요합니다."
    }
    
    return jsonify({"result": result})

@app.route('/api/healthcare/find-hospital', methods=['POST'])
def find_hospital():
    data = request.json
    department = data.get('department', '내과')
    location = data.get('location', '제주시')
    
    hospitals = [
        {"name": "제주대학교병원", "distance": "2.3km", "wait_time": "15분", "rating": 4.8},
        {"name": "한라병원", "distance": "3.1km", "wait_time": "25분", "rating": 4.6},
        {"name": "제주시립병원", "distance": "4.5km", "wait_time": "10분", "rating": 4.5}
    ]
    
    return jsonify({
        "department": department,
        "location": location,
        "hospitals": hospitals,
        "note": "무상의료 적용으로 모든 병원에서 진료비 무료"
    })

if __name__ == '__main__':
    logger.info("🚀 국가 무상 의료 시스템 백엔드 시작 (포트 5005)")
    app.run(host='0.0.0.0', port=5005, debug=False)
