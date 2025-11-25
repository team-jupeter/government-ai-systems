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
    "system_name": "오픈해시 기반 초중고 교육 자동화 시스템",
    "description": "K-12 맞춤형 AI 교육 플랫폼",
    "total_students": 5320000,
    "total_schools": 11800,
    "ai_tutors": 52000,
    "subjects_covered": 45,
    "learning_improvement": "47.3%",
    "dropout_reduction": "82.5%"
}

EDUCATION_LEVELS = [
    {"id": "elementary", "name": "초등학교", "icon": "🎒", "grades": "1-6학년", "students": 2680000},
    {"id": "middle", "name": "중학교", "icon": "📚", "grades": "1-3학년", "students": 1340000},
    {"id": "high", "name": "고등학교", "icon": "🎓", "grades": "1-3학년", "students": 1300000}
]

SUBJECTS = [
    {"id": "korean", "name": "국어", "icon": "📖", "ai_support": True},
    {"id": "math", "name": "수학", "icon": "🔢", "ai_support": True},
    {"id": "english", "name": "영어", "icon": "🔤", "ai_support": True},
    {"id": "science", "name": "과학", "icon": "🔬", "ai_support": True},
    {"id": "social", "name": "사회", "icon": "🌍", "ai_support": True},
    {"id": "history", "name": "역사", "icon": "📜", "ai_support": True},
    {"id": "music", "name": "음악", "icon": "🎵", "ai_support": True},
    {"id": "art", "name": "미술", "icon": "🎨", "ai_support": True},
    {"id": "pe", "name": "체육", "icon": "⚽", "ai_support": True},
    {"id": "coding", "name": "코딩", "icon": "💻", "ai_support": True}
]

SCENARIOS = [
    {
        "icon": "🎯",
        "title": "개인 맞춤형 학습",
        "problem": "30명 학급에서 개인별 수준 차이 고려 불가, 상위권/하위권 학생 방치",
        "solution": "AI가 학생별 학습 데이터 분석, 개인 맞춤 커리큘럼 및 문제 제공",
        "savings": "학습 성취도 47.3% 향상"
    },
    {
        "icon": "🤖",
        "title": "24시간 AI 튜터",
        "problem": "방과 후 질문할 곳 없음, 사교육 의존도 높음",
        "solution": "AI 튜터가 24시간 1:1 질문 응답, 개념 설명, 문제 풀이 지원",
        "savings": "사교육비 연간 12조 원 절감"
    },
    {
        "icon": "📊",
        "title": "학습 진단 시스템",
        "problem": "시험 후에야 취약점 파악, 즉각적 피드백 불가",
        "solution": "AI가 실시간 학습 패턴 분석, 취약 영역 즉시 진단 및 보충 학습 제공",
        "savings": "학습 효율 68% 향상"
    },
    {
        "icon": "❤️",
        "title": "정서 지원 시스템",
        "problem": "학교 폭력, 우울증 등 조기 발견 어려움",
        "solution": "AI가 학생 행동 패턴 분석, 정서적 위험 신호 조기 탐지 및 상담 연계",
        "savings": "학교 부적응 82.5% 감소"
    }
]

AGENTS = [
    {"id": "tutor", "name": "📚 AI 튜터 Agent"},
    {"id": "homework", "name": "✏️ 숙제 도우미 Agent"},
    {"id": "career", "name": "🎯 진로 상담 Agent"},
    {"id": "counselor", "name": "❤️ 정서 상담 Agent"},
    {"id": "parent", "name": "👨‍👩‍👧 학부모 상담 Agent"}
]

@app.route('/api/k12/info', methods=['GET'])
def get_info():
    return jsonify(SYSTEM_INFO)

@app.route('/api/k12/levels', methods=['GET'])
def get_levels():
    return jsonify({"levels": EDUCATION_LEVELS})

@app.route('/api/k12/subjects', methods=['GET'])
def get_subjects():
    return jsonify({"subjects": SUBJECTS})

@app.route('/api/k12/scenarios', methods=['GET'])
def get_scenarios():
    return jsonify({"scenarios": SCENARIOS})

@app.route('/api/k12/agents', methods=['GET'])
def get_agents():
    return jsonify({"agents": AGENTS})

@app.route('/api/k12/consultation', methods=['POST', 'OPTIONS'])
def consultation():
    if request.method == 'OPTIONS':
        return '', 204
    
    if not client:
        return jsonify({"response": "⚠️ API 키가 설정되지 않았습니다."}), 200
    
    try:
        data = request.json
        message = data.get('message', '')
        agent_type = data.get('agent_type', 'tutor')
        
        prompts = {
            "tutor": "당신은 초중고 학생을 위한 AI 튜터입니다. 학생의 학년 수준에 맞게 친절하고 이해하기 쉽게 설명합니다. 수학, 과학, 영어 등 모든 과목을 지원합니다.",
            "homework": "당신은 숙제 도우미 AI입니다. 숙제 문제를 직접 풀어주지 않고, 힌트와 풀이 방법을 안내하여 학생이 스스로 해결하도록 돕습니다.",
            "career": "당신은 진로 상담 AI입니다. 학생의 적성, 흥미, 성적을 고려하여 적합한 진로와 대학, 학과를 추천합니다.",
            "counselor": "당신은 학생 정서 상담 AI입니다. 학교생활, 친구관계, 스트레스 등 고민을 들어주고 따뜻하게 조언합니다. 심각한 문제는 전문 상담사 연결을 안내합니다.",
            "parent": "당신은 학부모 상담 AI입니다. 자녀 교육, 학습 지도, 진로 상담, 학교생활 관련 정보를 제공합니다."
        }
        
        system_prompt = prompts.get(agent_type, prompts["tutor"])
        system_prompt += "\n\n학생 눈높이에 맞춰 친절하고 격려하는 톤으로 대화하세요."
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            system=system_prompt,
            messages=[{"role": "user", "content": message}]
        )
        
        return jsonify({"response": response.content[0].text})
        
    except Exception as e:
        return jsonify({"response": f"오류: {str(e)}"}), 500

@app.route('/api/k12/solve-problem', methods=['POST'])
def solve_problem():
    data = request.json
    subject = data.get('subject', 'math')
    problem = data.get('problem', '')
    
    result = {
        "subject": subject,
        "problem": problem,
        "hint": "이 문제는 방정식을 세워서 풀 수 있어요. x를 미지수로 놓고 식을 만들어보세요.",
        "steps": [
            "1단계: 문제에서 구하려는 것이 무엇인지 파악하기",
            "2단계: 미지수 x 설정하기",
            "3단계: 방정식 세우기",
            "4단계: 방정식 풀기",
            "5단계: 답 확인하기"
        ],
        "similar_problems": [
            "교과서 52페이지 예제 3",
            "학습지 4단원 문제 7"
        ]
    }
    
    return jsonify({"result": result})

@app.route('/api/k12/learning-analysis', methods=['POST'])
def learning_analysis():
    data = request.json
    student_id = data.get('student_id', '')
    
    analysis = {
        "student_id": student_id,
        "overall_level": "중상위권",
        "strengths": ["영어 독해", "수학 계산", "과학 탐구"],
        "weaknesses": ["수학 도형", "국어 문법"],
        "recommended_focus": [
            {"subject": "수학", "topic": "도형의 성질", "priority": "높음"},
            {"subject": "국어", "topic": "문장 성분", "priority": "중간"}
        ],
        "daily_study_plan": {
            "total_time": "2시간",
            "subjects": [
                {"name": "수학", "time": "50분", "focus": "도형 문제 풀이"},
                {"name": "국어", "time": "30분", "focus": "문법 개념 복습"},
                {"name": "영어", "time": "40분", "focus": "단어 암기 및 독해"}
            ]
        }
    }
    
    return jsonify({"analysis": analysis})

@app.route('/api/k12/career-recommend', methods=['POST'])
def career_recommend():
    data = request.json
    interests = data.get('interests', [])
    grades = data.get('grades', {})
    
    recommendations = {
        "career_paths": [
            {"name": "소프트웨어 개발자", "match": 92, "reason": "수학, 논리력 우수"},
            {"name": "데이터 과학자", "match": 88, "reason": "수학, 과학 성적 우수"},
            {"name": "의사", "match": 85, "reason": "생물, 화학 관심도 높음"}
        ],
        "recommended_universities": [
            {"name": "KAIST", "department": "전산학부", "admission_score": "상위 1%"},
            {"name": "서울대", "department": "컴퓨터공학부", "admission_score": "상위 1%"},
            {"name": "고려대", "department": "컴퓨터학과", "admission_score": "상위 2%"}
        ],
        "preparation_advice": "코딩 실력을 키우고, 수학 심화 학습을 권장합니다."
    }
    
    return jsonify({"recommendations": recommendations})

if __name__ == '__main__':
    logger.info("🚀 초중고 교육 자동화 시스템 백엔드 시작 (포트 5011)")
    app.run(host='0.0.0.0', port=5011, debug=False)
