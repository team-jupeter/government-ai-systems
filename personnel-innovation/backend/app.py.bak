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
    "system_name": "인사혁신처 - 국가데이터처 연동 AI 통합 인사관리 시스템",
    "description": "AI 기반 공무원 인사·채용·평가·교육 통합 플랫폼",
    "total_employees": 1150000,
    "agencies_connected": 485,
    "annual_recruitments": 25000,
    "training_programs": 8500,
    "automation_rate": "91.2%",
    "satisfaction_rate": "93.5%"
}

HR_CATEGORIES = [
    {"id": "recruitment", "name": "채용관리", "icon": "👥", "annual_volume": 25000},
    {"id": "appointment", "name": "임용관리", "icon": "📋", "annual_volume": 85000},
    {"id": "evaluation", "name": "성과평가", "icon": "📊", "annual_volume": 1150000},
    {"id": "training", "name": "교육훈련", "icon": "📚", "annual_volume": 520000},
    {"id": "promotion", "name": "승진관리", "icon": "📈", "annual_volume": 45000},
    {"id": "transfer", "name": "전보·파견", "icon": "🔄", "annual_volume": 62000},
    {"id": "retirement", "name": "퇴직관리", "icon": "🏖️", "annual_volume": 35000},
    {"id": "welfare", "name": "복지후생", "icon": "❤️", "annual_volume": 1150000}
]

GRADE_SYSTEM = [
    {"grade": "1급", "title": "관리관", "count": 450, "avg_salary": 12500},
    {"grade": "2급", "title": "이사관", "count": 1200, "avg_salary": 10800},
    {"grade": "3급", "title": "부이사관", "count": 3500, "avg_salary": 9200},
    {"grade": "4급", "title": "서기관", "count": 12000, "avg_salary": 7800},
    {"grade": "5급", "title": "사무관", "count": 45000, "avg_salary": 6200},
    {"grade": "6급", "title": "주사", "count": 120000, "avg_salary": 4800},
    {"grade": "7급", "title": "주사보", "count": 280000, "avg_salary": 3800},
    {"grade": "8급", "title": "서기", "count": 350000, "avg_salary": 3200},
    {"grade": "9급", "title": "서기보", "count": 338000, "avg_salary": 2800}
]

SCENARIOS = [
    {
        "icon": "🤖",
        "title": "AI 채용 시스템",
        "problem": "연간 25,000명 채용에 막대한 인력·비용, 공정성 논란",
        "solution": "AI가 서류 심사, 역량 평가, 면접 분석 자동화",
        "savings": "채용 비용 68% 절감, 공정성 99.2%"
    },
    {
        "icon": "📊",
        "title": "객관적 성과 평가",
        "problem": "평가자 주관 개입, 부서별 편차, 불만 발생",
        "solution": "AI가 업무 데이터 분석하여 객관적 성과 지표 산출",
        "savings": "평가 불만 87% 감소"
    },
    {
        "icon": "🎯",
        "title": "맞춤형 경력 개발",
        "problem": "획일적 교육, 개인별 역량 개발 한계",
        "solution": "AI가 개인별 역량 분석, 맞춤형 교육·경력 경로 추천",
        "savings": "역량 향상 속도 2.4배"
    },
    {
        "icon": "⚖️",
        "title": "공정한 승진 관리",
        "problem": "승진 기준 불명확, 연공서열 중심",
        "solution": "AI가 성과, 역량, 잠재력 종합 분석하여 승진 추천",
        "savings": "승진 만족도 94% 향상"
    }
]

AGENTS = [
    {"id": "recruitment_advisor", "name": "👥 채용 상담 Agent"},
    {"id": "career_planner", "name": "🎯 경력 개발 Agent"},
    {"id": "evaluation_guide", "name": "📊 성과 평가 Agent"},
    {"id": "training_recommender", "name": "📚 교육 추천 Agent"},
    {"id": "welfare_consultant", "name": "❤️ 복지 상담 Agent"},
    {"id": "policy_advisor", "name": "📋 인사 정책 Agent"}
]

@app.route('/api/personnel-innovation/info', methods=['GET'])
def get_info():
    return jsonify(SYSTEM_INFO)

@app.route('/api/personnel-innovation/categories', methods=['GET'])
def get_categories():
    return jsonify({"categories": HR_CATEGORIES})

@app.route('/api/personnel-innovation/grades', methods=['GET'])
def get_grades():
    return jsonify({"grades": GRADE_SYSTEM})

@app.route('/api/personnel-innovation/scenarios', methods=['GET'])
def get_scenarios():
    return jsonify({"scenarios": SCENARIOS})

@app.route('/api/personnel-innovation/agents', methods=['GET'])
def get_agents():
    return jsonify({"agents": AGENTS})

@app.route('/api/personnel-innovation/consultation', methods=['POST', 'OPTIONS'])
def consultation():
    if request.method == 'OPTIONS':
        return '', 204
    
    if not client:
        return jsonify({"response": "⚠️ API 키가 설정되지 않았습니다."}), 200
    
    try:
        data = request.json
        message = data.get('message', '')
        agent_type = data.get('agent_type', 'policy_advisor')
        
        prompts = {
            "recruitment_advisor": "당신은 공무원 채용 상담 AI입니다. 공무원 시험 종류, 응시 자격, 준비 방법, 채용 절차를 안내합니다.",
            "career_planner": "당신은 공무원 경력 개발 AI입니다. 승진 경로, 전문 분야 선택, 역량 개발 방안을 안내합니다.",
            "evaluation_guide": "당신은 성과 평가 안내 AI입니다. 평가 기준, 절차, 이의 신청 방법을 안내합니다.",
            "training_recommender": "당신은 교육 훈련 추천 AI입니다. 직무 교육, 역량 교육, 온라인 과정을 추천합니다.",
            "welfare_consultant": "당신은 공무원 복지 상담 AI입니다. 연금, 건강보험, 휴가, 복지 포인트 등을 안내합니다.",
            "policy_advisor": "당신은 인사 정책 안내 AI입니다. 인사 규정, 복무 규정, 최신 정책 변화를 안내합니다."
        }
        
        system_prompt = prompts.get(agent_type, prompts["policy_advisor"])
        system_prompt += "\n\n인사혁신처 AI로서 공무원 인사 관련 정확한 정보를 제공합니다. 복잡한 사안은 인사담당관 상담을 권고하세요."
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            system=system_prompt,
            messages=[{"role": "user", "content": message}]
        )
        
        return jsonify({"response": response.content[0].text})
        
    except Exception as e:
        return jsonify({"response": f"오류: {str(e)}"}), 500

@app.route('/api/personnel-innovation/exam-info', methods=['GET'])
def exam_info():
    exams = [
        {
            "name": "5급 공채 (행정고시)",
            "type": "고등고시",
            "requirements": "학력 제한 없음",
            "stages": ["PSAT", "논문형 필기", "면접"],
            "annual_recruits": 350,
            "competition_rate": "약 50:1"
        },
        {
            "name": "7급 공채",
            "type": "보통고시",
            "requirements": "학력 제한 없음",
            "stages": ["PSAT", "전공 필기", "면접"],
            "annual_recruits": 2800,
            "competition_rate": "약 35:1"
        },
        {
            "name": "9급 공채",
            "type": "보통고시",
            "requirements": "학력 제한 없음",
            "stages": ["필기시험", "면접"],
            "annual_recruits": 8500,
            "competition_rate": "약 25:1"
        }
    ]
    
    return jsonify({"exams": exams})

@app.route('/api/personnel-innovation/career-path', methods=['POST'])
def career_path():
    data = request.json
    current_grade = data.get('grade', '7급')
    field = data.get('field', '일반행정')
    
    path = {
        "current": {"grade": current_grade, "field": field},
        "recommended_path": [
            {"year": 0, "grade": "7급", "position": "주사보", "focus": "실무 역량 습득"},
            {"year": 3, "grade": "6급", "position": "주사", "focus": "팀 리더십 개발"},
            {"year": 7, "grade": "5급", "position": "사무관", "focus": "정책 기획 역량"},
            {"year": 12, "grade": "4급", "position": "서기관", "focus": "부서 관리 역량"},
            {"year": 18, "grade": "3급", "position": "부이사관", "focus": "조직 경영 역량"}
        ],
        "required_training": [
            {"name": "신규자 기본교육", "duration": "4주", "timing": "임용 후 1년 내"},
            {"name": "승진자 역량교육", "duration": "2주", "timing": "승진 시"},
            {"name": "관리자 리더십", "duration": "1주", "timing": "5급 이상"}
        ],
        "key_competencies": ["정책 분석", "의사소통", "리더십", "문제 해결"],
        "alternative_paths": [
            {"name": "전문관 경로", "description": "특정 분야 전문성 심화"},
            {"name": "국제 경로", "description": "국제기구 파견, 해외 연수"}
        ]
    }
    
    return jsonify({"path": path})

@app.route('/api/personnel-innovation/performance-analysis', methods=['POST'])
def performance_analysis():
    data = request.json
    employee_id = data.get('employee_id', '')
    
    analysis = {
        "employee_id": employee_id,
        "period": "2025년 상반기",
        "overall_score": 87.5,
        "grade": "우수",
        "metrics": {
            "업무 성과": {"score": 88, "weight": 40},
            "직무 역량": {"score": 85, "weight": 30},
            "협업·소통": {"score": 90, "weight": 20},
            "자기 개발": {"score": 87, "weight": 10}
        },
        "strengths": [
            "정책 분석 능력 우수",
            "팀워크 및 협업 능력",
            "업무 처리 속도"
        ],
        "improvement_areas": [
            "프레젠테이션 스킬",
            "외국어 역량"
        ],
        "recommended_training": [
            {"name": "스피치 역량 강화", "duration": "3일"},
            {"name": "비즈니스 영어", "duration": "온라인 3개월"}
        ],
        "promotion_readiness": {
            "score": 78,
            "estimated_time": "2-3년 후",
            "requirements": ["리더십 교육 이수", "성과 평가 연속 우수"]
        }
    }
    
    return jsonify({"analysis": analysis})

@app.route('/api/personnel-innovation/training-recommend', methods=['POST'])
def training_recommend():
    data = request.json
    grade = data.get('grade', '7급')
    interests = data.get('interests', [])
    
    recommendations = {
        "mandatory": [
            {"name": "공직 가치 교육", "type": "필수", "duration": "2일", "online": True},
            {"name": "청렴 교육", "type": "필수", "duration": "1일", "online": True},
            {"name": "성희롱 예방 교육", "type": "필수", "duration": "1일", "online": True}
        ],
        "recommended": [
            {"name": "AI 활용 업무혁신", "type": "직무", "duration": "3일", "online": False},
            {"name": "데이터 분석 기초", "type": "역량", "duration": "5일", "online": True},
            {"name": "정책 기획 실무", "type": "직무", "duration": "4일", "online": False}
        ],
        "elective": [
            {"name": "협상의 기술", "type": "리더십", "duration": "2일", "online": False},
            {"name": "창의적 문제해결", "type": "역량", "duration": "3일", "online": True}
        ],
        "total_hours_required": 100,
        "completed_hours": 65,
        "deadline": "2025-12-31"
    }
    
    return jsonify({"recommendations": recommendations})

@app.route('/api/personnel-innovation/welfare-info', methods=['GET'])
def welfare_info():
    welfare = {
        "pension": {
            "name": "공무원연금",
            "contribution_rate": "9%",
            "retirement_benefit": "평균 보수월액 × 재직연수 × 1.9%"
        },
        "health_insurance": {
            "name": "공무원 건강보험",
            "coverage": "본인 및 부양가족"
        },
        "leave": {
            "annual": "15-26일 (근속연수별)",
            "sick": "연 60일",
            "maternity": "90일",
            "paternity": "10일"
        },
        "welfare_points": {
            "annual_amount": 800000,
            "usage": ["건강검진", "자기개발", "여행", "문화생활"]
        },
        "housing": {
            "loan": "주택 구입·전세 자금 대출",
            "dormitory": "공무원 기숙사 (지방 근무 시)"
        }
    }
    
    return jsonify({"welfare": welfare})

if __name__ == '__main__':
    logger.info("🚀 인사혁신처 AI 통합 인사관리 시스템 백엔드 시작 (포트 5019)")
    app.run(host='0.0.0.0', port=5019, debug=False)
