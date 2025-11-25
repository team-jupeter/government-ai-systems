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
    "system_name": "제주대학병원 오픈해시 AI 진료 시스템",
    "description": "AI 기반 스마트 병원 통합 운영 플랫폼",
    "beds": 680,
    "departments": 38,
    "daily_patients": 2800,
    "ai_diagnosis_rate": "94.7%",
    "avg_wait_time": "18분",
    "satisfaction_rate": "96.2%"
}

DEPARTMENTS = [
    {"id": "internal", "name": "내과", "icon": "🩺", "doctors": 32, "wait_time": "15분"},
    {"id": "surgery", "name": "외과", "icon": "🔪", "doctors": 28, "wait_time": "20분"},
    {"id": "pediatrics", "name": "소아청소년과", "icon": "👶", "doctors": 18, "wait_time": "25분"},
    {"id": "obgyn", "name": "산부인과", "icon": "🤰", "doctors": 15, "wait_time": "20분"},
    {"id": "orthopedics", "name": "정형외과", "icon": "🦴", "doctors": 20, "wait_time": "30분"},
    {"id": "neurology", "name": "신경과", "icon": "🧠", "doctors": 12, "wait_time": "25분"},
    {"id": "cardiology", "name": "심장내과", "icon": "❤️", "doctors": 14, "wait_time": "20분"},
    {"id": "dermatology", "name": "피부과", "icon": "🧴", "doctors": 10, "wait_time": "35분"},
    {"id": "ophthalmology", "name": "안과", "icon": "👁️", "doctors": 12, "wait_time": "30분"},
    {"id": "ent", "name": "이비인후과", "icon": "👂", "doctors": 11, "wait_time": "25분"},
    {"id": "emergency", "name": "응급의학과", "icon": "🚑", "doctors": 24, "wait_time": "즉시"},
    {"id": "radiology", "name": "영상의학과", "icon": "📷", "doctors": 16, "wait_time": "40분"}
]

SCENARIOS = [
    {
        "icon": "🤖",
        "title": "AI 영상 진단",
        "problem": "CT/MRI 판독에 평균 48시간 소요, 방사선과 전문의 부족",
        "solution": "AI가 영상 1차 판독 3초 완료, 이상 소견 자동 알림",
        "savings": "판독 시간 99% 단축, 조기 발견율 42% 향상"
    },
    {
        "icon": "💊",
        "title": "스마트 처방 시스템",
        "problem": "약물 상호작용, 알레르기 확인에 시간 소요",
        "solution": "AI가 환자 정보 실시간 분석, 위험 처방 자동 경고",
        "savings": "처방 오류 91% 감소"
    },
    {
        "icon": "🛏️",
        "title": "병상 최적화",
        "problem": "병상 배정 비효율로 대기 환자 발생",
        "solution": "AI가 퇴원 예측, 병상 수요 분석하여 최적 배정",
        "savings": "병상 회전율 35% 향상"
    },
    {
        "icon": "📋",
        "title": "전자의무기록 자동화",
        "problem": "의사가 진료 후 기록에 30% 시간 소요",
        "solution": "AI가 진료 내용 자동 기록, 음성 인식 차트 작성",
        "savings": "기록 시간 85% 절감"
    }
]

AGENTS = [
    {"id": "appointment", "name": "📅 예약 안내 Agent"},
    {"id": "symptom_guide", "name": "🩺 증상 안내 Agent"},
    {"id": "department_finder", "name": "🏥 진료과 찾기 Agent"},
    {"id": "test_result", "name": "📊 검사 결과 Agent"},
    {"id": "billing_info", "name": "💳 수납 안내 Agent"},
    {"id": "visitor_guide", "name": "🚶 방문 안내 Agent"}
]

@app.route('/api/jeju-hospital/info', methods=['GET'])
def get_info():
    return jsonify(SYSTEM_INFO)

@app.route('/api/jeju-hospital/departments', methods=['GET'])
def get_departments():
    return jsonify({"departments": DEPARTMENTS})

@app.route('/api/jeju-hospital/scenarios', methods=['GET'])
def get_scenarios():
    return jsonify({"scenarios": SCENARIOS})

@app.route('/api/jeju-hospital/agents', methods=['GET'])
def get_agents():
    return jsonify({"agents": AGENTS})

@app.route('/api/jeju-hospital/consultation', methods=['POST', 'OPTIONS'])
def consultation():
    if request.method == 'OPTIONS':
        return '', 204
    
    if not client:
        return jsonify({"response": "⚠️ API 키가 설정되지 않았습니다."}), 200
    
    try:
        data = request.json
        message = data.get('message', '')
        agent_type = data.get('agent_type', 'symptom_guide')
        
        prompts = {
            "appointment": "당신은 제주대학병원 예약 안내 AI입니다. 진료 예약, 변경, 취소를 도와드립니다.",
            "symptom_guide": "당신은 제주대학병원 증상 안내 AI입니다. 증상에 맞는 진료과를 추천합니다. 응급 상황은 즉시 응급실 방문을 안내하세요.",
            "department_finder": "당신은 제주대학병원 진료과 안내 AI입니다. 각 진료과의 전문 분야와 진료 시간을 안내합니다.",
            "test_result": "당신은 제주대학병원 검사 결과 안내 AI입니다. 검사 일정, 결과 확인 방법을 안내합니다.",
            "billing_info": "당신은 제주대학병원 수납 안내 AI입니다. 진료비, 보험, 수납 방법을 안내합니다.",
            "visitor_guide": "당신은 제주대학병원 방문 안내 AI입니다. 위치, 주차, 면회 시간을 안내합니다."
        }
        
        system_prompt = prompts.get(agent_type, prompts["symptom_guide"])
        system_prompt += "\n\n제주대학병원의 AI 진료 시스템입니다. 친절하고 정확하게 안내하되, 의료 상담은 실제 의사의 진료가 필요함을 안내하세요."
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            system=system_prompt,
            messages=[{"role": "user", "content": message}]
        )
        
        return jsonify({"response": response.content[0].text})
        
    except Exception as e:
        return jsonify({"response": f"오류: {str(e)}"}), 500

@app.route('/api/jeju-hospital/make-appointment', methods=['POST'])
def make_appointment():
    data = request.json
    department = data.get('department', 'internal')
    date = data.get('date', '2025-11-25')
    
    dept_info = next((d for d in DEPARTMENTS if d["id"] == department), DEPARTMENTS[0])
    
    result = {
        "appointment_id": "JH-APT-2025-112400001",
        "status": "예약완료",
        "department": dept_info["name"],
        "date": date,
        "time": "10:30",
        "doctor": "김OO 교수",
        "location": "본관 3층 내과 외래",
        "estimated_wait": dept_info["wait_time"],
        "notice": "진료 30분 전까지 도착해주세요. 신분증을 지참하세요."
    }
    
    return jsonify({"appointment": result})

@app.route('/api/jeju-hospital/check-wait-time', methods=['GET'])
def check_wait_time():
    wait_times = [
        {"department": d["name"], "current_wait": d["wait_time"], "patients_waiting": 5 + i*2}
        for i, d in enumerate(DEPARTMENTS[:8])
    ]
    
    return jsonify({
        "updated_at": "2025-11-24T07:45:00Z",
        "wait_times": wait_times
    })

@app.route('/api/jeju-hospital/get-directions', methods=['POST'])
def get_directions():
    data = request.json
    destination = data.get('destination', '내과')
    
    directions = {
        "destination": destination,
        "building": "본관",
        "floor": "3층",
        "steps": [
            "정문 입구에서 직진",
            "로비에서 우측 엘리베이터 이용",
            "3층에서 내려 좌측 100m",
            "내과 외래 도착"
        ],
        "estimated_time": "3분",
        "accessibility": "휠체어 이용 가능"
    }
    
    return jsonify({"directions": directions})

if __name__ == '__main__':
    logger.info("🚀 제주대학병원 AI 진료 시스템 백엔드 시작 (포트 5007)")
    app.run(host='0.0.0.0', port=5007, debug=False)
