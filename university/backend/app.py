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
    "system_name": "오픈해시 기반 대학교육 자동화 시스템",
    "description": "AI 기반 고등교육 혁신 통합 플랫폼",
    "universities": 430,
    "students": 3250000,
    "professors": 92000,
    "courses": 285000,
    "research_papers": 125000,
    "graduation_rate_improvement": "18.5%",
    "employment_rate_improvement": "24.3%"
}

UNIVERSITY_TYPES = [
    {"id": "national", "name": "국립대학", "icon": "🏛️", "count": 51, "students": 520000},
    {"id": "public", "name": "공립대학", "icon": "🏫", "count": 9, "students": 35000},
    {"id": "private", "name": "사립대학", "icon": "🎓", "count": 370, "students": 2695000}
]

ACADEMIC_FIELDS = [
    {"id": "engineering", "name": "공학", "icon": "⚙️", "students": 680000, "employment": 72.5},
    {"id": "natural_science", "name": "자연과학", "icon": "🔬", "students": 320000, "employment": 65.3},
    {"id": "social_science", "name": "사회과학", "icon": "📊", "students": 450000, "employment": 58.7},
    {"id": "humanities", "name": "인문학", "icon": "📚", "students": 280000, "employment": 52.4},
    {"id": "medicine", "name": "의약학", "icon": "🏥", "students": 95000, "employment": 94.2},
    {"id": "arts", "name": "예체능", "icon": "🎨", "students": 320000, "employment": 48.6},
    {"id": "business", "name": "경영학", "icon": "💼", "students": 520000, "employment": 62.8},
    {"id": "education", "name": "교육학", "icon": "👩‍🏫", "students": 185000, "employment": 68.5},
    {"id": "it", "name": "IT·컴퓨터", "icon": "💻", "students": 400000, "employment": 78.3}
]

SCENARIOS = [
    {
        "icon": "🤖",
        "title": "AI 맞춤형 학습",
        "problem": "대형 강의로 개인별 학습 지원 한계, 학업 중도 포기 증가",
        "solution": "AI가 학생별 학습 패턴 분석, 맞춤형 커리큘럼 및 튜터링 제공",
        "savings": "학업 중도포기율 42% 감소"
    },
    {
        "icon": "📝",
        "title": "자동 학사 관리",
        "problem": "수강신청, 학점 관리, 졸업 심사에 많은 행정 인력 소요",
        "solution": "AI가 학사 업무 자동화, 실시간 학점 분석 및 졸업 요건 체크",
        "savings": "행정 비용 68% 절감"
    },
    {
        "icon": "🎯",
        "title": "진로·취업 매칭",
        "problem": "전공-직업 미스매치, 취업률 저조",
        "solution": "AI가 학생 역량·관심사 분석하여 최적 진로 및 채용 공고 매칭",
        "savings": "취업률 24.3% 향상"
    },
    {
        "icon": "🔬",
        "title": "연구 지원 시스템",
        "problem": "연구비 신청, 논문 관리, 공동 연구 매칭에 시간 소요",
        "solution": "AI가 연구 트렌드 분석, 연구비 매칭, 협력 연구자 추천",
        "savings": "연구 생산성 35% 향상"
    }
]

AGENTS = [
    {"id": "academic_advisor", "name": "🎓 학사 상담 Agent"},
    {"id": "course_recommender", "name": "📚 수강 추천 Agent"},
    {"id": "career_counselor", "name": "💼 진로 상담 Agent"},
    {"id": "research_assistant", "name": "🔬 연구 지원 Agent"},
    {"id": "scholarship_finder", "name": "💰 장학금 안내 Agent"},
    {"id": "campus_guide", "name": "🏫 캠퍼스 안내 Agent"}
]

@app.route('/api/university/info', methods=['GET'])
def get_info():
    return jsonify(SYSTEM_INFO)

@app.route('/api/university/types', methods=['GET'])
def get_types():
    return jsonify({"types": UNIVERSITY_TYPES})

@app.route('/api/university/fields', methods=['GET'])
def get_fields():
    return jsonify({"fields": ACADEMIC_FIELDS})

@app.route('/api/university/scenarios', methods=['GET'])
def get_scenarios():
    return jsonify({"scenarios": SCENARIOS})

@app.route('/api/university/agents', methods=['GET'])
def get_agents():
    return jsonify({"agents": AGENTS})

@app.route('/api/university/consultation', methods=['POST', 'OPTIONS'])
def consultation():
    if request.method == 'OPTIONS':
        return '', 204
    
    if not client:
        return jsonify({"response": "⚠️ API 키가 설정되지 않았습니다."}), 200
    
    try:
        data = request.json
        message = data.get('message', '')
        agent_type = data.get('agent_type', 'academic_advisor')
        
        prompts = {
            "academic_advisor": "당신은 대학 학사 상담 AI입니다. 수강신청, 학점, 졸업요건, 휴학, 복학 등 학사 관련 상담을 제공합니다.",
            "course_recommender": "당신은 수강 추천 AI입니다. 학생의 전공, 관심사, 학점 현황을 고려하여 최적의 수강 과목을 추천합니다.",
            "career_counselor": "당신은 진로 상담 AI입니다. 학생의 전공, 역량, 관심사를 분석하여 진로 방향과 취업 전략을 조언합니다.",
            "research_assistant": "당신은 연구 지원 AI입니다. 연구 주제 탐색, 논문 검색, 연구비 신청, 학술 대회 정보를 제공합니다.",
            "scholarship_finder": "당신은 장학금 안내 AI입니다. 학생 조건에 맞는 교내외 장학금을 찾아 안내합니다.",
            "campus_guide": "당신은 캠퍼스 안내 AI입니다. 시설 이용, 동아리, 학생 복지, 기숙사 등 캠퍼스 생활 정보를 안내합니다."
        }
        
        system_prompt = prompts.get(agent_type, prompts["academic_advisor"])
        system_prompt += "\n\n대학교육 통합 AI 시스템으로서 학생들에게 친절하고 정확한 정보를 제공합니다."
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            system=system_prompt,
            messages=[{"role": "user", "content": message}]
        )
        
        return jsonify({"response": response.content[0].text})
        
    except Exception as e:
        return jsonify({"response": f"오류: {str(e)}"}), 500

@app.route('/api/university/recommend-courses', methods=['POST'])
def recommend_courses():
    data = request.json
    major = data.get('major', '컴퓨터공학')
    semester = data.get('semester', 5)
    interests = data.get('interests', [])
    
    recommendations = {
        "major": major,
        "semester": semester,
        "required_courses": [
            {"code": "CS301", "name": "운영체제", "credits": 3, "priority": "필수", "difficulty": "중"},
            {"code": "CS302", "name": "데이터베이스", "credits": 3, "priority": "필수", "difficulty": "중"},
            {"code": "CS303", "name": "컴퓨터네트워크", "credits": 3, "priority": "필수", "difficulty": "중상"}
        ],
        "recommended_electives": [
            {"code": "CS401", "name": "인공지능", "credits": 3, "match": 95, "reason": "AI 관심사 반영"},
            {"code": "CS402", "name": "머신러닝", "credits": 3, "match": 92, "reason": "AI 연계 과목"},
            {"code": "CS403", "name": "빅데이터분석", "credits": 3, "match": 88, "reason": "취업 연계 높음"}
        ],
        "general_education": [
            {"code": "GE201", "name": "창의적 문제해결", "credits": 3, "type": "핵심교양"},
            {"code": "GE105", "name": "영어회화", "credits": 2, "type": "기초교양"}
        ],
        "total_credits": 18,
        "graduation_progress": {
            "required": 130,
            "completed": 85,
            "remaining": 45,
            "on_track": True
        }
    }
    
    return jsonify({"recommendations": recommendations})

@app.route('/api/university/graduation-check', methods=['POST'])
def graduation_check():
    data = request.json
    student_id = data.get('student_id', '')
    
    check_result = {
        "student_id": student_id,
        "major": "컴퓨터공학",
        "admission_year": 2022,
        "current_semester": 6,
        "graduation_eligible": False,
        "requirements": {
            "total_credits": {"required": 130, "completed": 98, "status": "미충족"},
            "major_credits": {"required": 60, "completed": 52, "status": "미충족"},
            "general_credits": {"required": 30, "completed": 28, "status": "미충족"},
            "gpa": {"required": 2.0, "current": 3.45, "status": "충족"},
            "english": {"required": "TOEIC 700", "current": "TOEIC 820", "status": "충족"},
            "graduation_thesis": {"required": True, "submitted": False, "status": "미충족"}
        },
        "remaining_courses": [
            {"type": "전공필수", "name": "캡스톤디자인", "credits": 3},
            {"type": "전공선택", "name": "전공선택 5학점", "credits": 5},
            {"type": "교양", "name": "교양 2학점", "credits": 2}
        ],
        "expected_graduation": "2026년 2월",
        "recommendation": "7학기에 캡스톤디자인 필수 수강, 졸업논문 준비 시작 권장"
    }
    
    return jsonify({"result": check_result})

@app.route('/api/university/find-scholarships', methods=['POST'])
def find_scholarships():
    data = request.json
    gpa = data.get('gpa', 3.5)
    income_level = data.get('income_level', 5)
    
    scholarships = {
        "eligible": [
            {
                "name": "국가장학금 I유형",
                "type": "국가",
                "amount": "등록금 전액",
                "eligibility": "소득분위 8구간 이하",
                "deadline": "2025-02-28",
                "match": 95
            },
            {
                "name": "교내 성적우수장학금",
                "type": "교내",
                "amount": "등록금 50%",
                "eligibility": "직전학기 GPA 3.5 이상",
                "deadline": "매학기 자동 심사",
                "match": 90
            },
            {
                "name": "삼성꿈장학재단",
                "type": "민간",
                "amount": "연 500만원",
                "eligibility": "공학계열, GPA 3.0 이상",
                "deadline": "2025-03-15",
                "match": 85
            },
            {
                "name": "한국장학재단 국가근로장학금",
                "type": "국가",
                "amount": "시급 11,200원",
                "eligibility": "소득분위 9구간 이하",
                "deadline": "상시 모집",
                "match": 80
            }
        ],
        "total_potential": 12500000,
        "application_tips": [
            "국가장학금 신청 기간 확인 필수",
            "성적증명서 미리 준비",
            "소득 증빙 서류 확인"
        ]
    }
    
    return jsonify({"scholarships": scholarships})

@app.route('/api/university/career-match', methods=['POST'])
def career_match():
    data = request.json
    major = data.get('major', '컴퓨터공학')
    skills = data.get('skills', [])
    interests = data.get('interests', [])
    
    career_paths = {
        "major": major,
        "recommended_careers": [
            {
                "title": "소프트웨어 개발자",
                "match": 95,
                "avg_salary": 5500,
                "growth": "높음",
                "required_skills": ["프로그래밍", "알고리즘", "협업"],
                "companies": ["삼성전자", "네이버", "카카오", "라인"]
            },
            {
                "title": "데이터 사이언티스트",
                "match": 88,
                "avg_salary": 6200,
                "growth": "매우 높음",
                "required_skills": ["Python", "통계", "머신러닝"],
                "companies": ["쿠팡", "배민", "토스", "당근마켓"]
            },
            {
                "title": "AI 엔지니어",
                "match": 85,
                "avg_salary": 7000,
                "growth": "매우 높음",
                "required_skills": ["딥러닝", "PyTorch", "수학"],
                "companies": ["OpenAI", "구글", "메타", "네이버"]
            }
        ],
        "skill_gaps": [
            {"skill": "클라우드(AWS)", "importance": "높음", "learning_path": "AWS 자격증"},
            {"skill": "영어", "importance": "중간", "learning_path": "비즈니스 영어 과정"}
        ],
        "job_openings": 2850,
        "avg_time_to_employment": "3.2개월"
    }
    
    return jsonify({"career_paths": career_paths})

@app.route('/api/university/research-support', methods=['POST'])
def research_support():
    data = request.json
    field = data.get('field', 'AI')
    keyword = data.get('keyword', '')
    
    support = {
        "trending_topics": [
            {"topic": "대규모 언어 모델(LLM)", "papers_2024": 12500, "growth": "+340%"},
            {"topic": "멀티모달 AI", "papers_2024": 8200, "growth": "+180%"},
            {"topic": "AI 안전성", "papers_2024": 4500, "growth": "+220%"}
        ],
        "funding_opportunities": [
            {
                "name": "한국연구재단 기본연구",
                "amount": "연 1억원",
                "duration": "3년",
                "deadline": "2025-03-31",
                "success_rate": "28%"
            },
            {
                "name": "과기정통부 AI 핵심기술개발",
                "amount": "연 5억원",
                "duration": "5년",
                "deadline": "2025-04-15",
                "success_rate": "15%"
            }
        ],
        "potential_collaborators": [
            {"name": "서울대 AI연구원", "expertise": "NLP", "papers": 450},
            {"name": "KAIST AI대학원", "expertise": "Computer Vision", "papers": 380}
        ],
        "conferences": [
            {"name": "NeurIPS 2025", "deadline": "2025-05-15", "location": "밴쿠버"},
            {"name": "ICML 2025", "deadline": "2025-02-01", "location": "비엔나"}
        ]
    }
    
    return jsonify({"support": support})

@app.route('/api/university/learning-analysis', methods=['POST'])
def learning_analysis():
    data = request.json
    student_id = data.get('student_id', '')
    
    analysis = {
        "student_id": student_id,
        "learning_style": "시각적 학습자",
        "strengths": ["프로그래밍 실습", "프로젝트 기반 학습", "협업 과제"],
        "improvement_areas": ["이론 암기", "장시간 집중"],
        "study_pattern": {
            "peak_hours": "오후 2-6시",
            "avg_session": "45분",
            "preferred_location": "도서관"
        },
        "ai_recommendations": [
            "시각 자료 중심 학습 권장",
            "45분 학습 + 10분 휴식 패턴 유지",
            "스터디 그룹 참여로 협업 학습"
        ],
        "predicted_performance": {
            "next_semester_gpa": 3.65,
            "confidence": 82
        }
    }
    
    return jsonify({"analysis": analysis})

if __name__ == '__main__':
    logger.info("🚀 대학교육 자동화 시스템 백엔드 시작 (포트 5022)")
    app.run(host='0.0.0.0', port=5022, debug=False)
