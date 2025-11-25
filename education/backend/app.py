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
    "system_name": "7단계 개인-사회 통합 최적화 AI 교육 시스템",
    "description": "OpenHash 기반 맞춤형 평생교육 플랫폼",
    "total_learners": 52000000,
    "ai_tutors": 15000,
    "learning_paths": 2800,
    "success_rate": "94.7%"
}

SEVEN_STAGES = [
    {"stage": 1, "name": "유아기 (0-6세)", "focus": "감각 발달, 기초 인지", "ai_support": "놀이 기반 학습 AI"},
    {"stage": 2, "name": "아동기 (7-12세)", "focus": "기초 학력, 사회성", "ai_support": "적응형 학습 AI"},
    {"stage": 3, "name": "청소년기 (13-18세)", "focus": "진로 탐색, 심화 학습", "ai_support": "진로 추천 AI"},
    {"stage": 4, "name": "청년기 (19-29세)", "focus": "전문성 개발, 취업", "ai_support": "직무 매칭 AI"},
    {"stage": 5, "name": "장년기 (30-49세)", "focus": "경력 개발, 재교육", "ai_support": "스킬업 AI"},
    {"stage": 6, "name": "중년기 (50-64세)", "focus": "전환기 교육, 건강", "ai_support": "커리어 전환 AI"},
    {"stage": 7, "name": "노년기 (65세+)", "focus": "평생학습, 사회참여", "ai_support": "시니어 러닝 AI"}
]

SCENARIOS = [
    {
        "icon": "🎯",
        "title": "개인 맞춤형 학습 경로",
        "problem": "획일적 교육과정으로 개인별 적성과 속도 무시",
        "solution": "AI가 학습자 데이터 분석하여 최적의 개인별 커리큘럼 설계",
        "savings": "학습 효율 340% 향상"
    },
    {
        "icon": "🤖",
        "title": "24시간 AI 튜터",
        "problem": "교사 부족, 질문 응답 지연, 개별 지도 어려움",
        "solution": "15,000개 AI 튜터가 실시간 1:1 맞춤 지도",
        "savings": "교육비 연간 8.2조 원 절감"
    },
    {
        "icon": "📊",
        "title": "실시간 학습 분석",
        "problem": "학습 성과 측정에 수개월 소요, 즉각 피드백 불가",
        "solution": "오픈해시 기반 실시간 학습 데이터 분석 및 즉시 피드백",
        "savings": "학습 성취도 47% 향상"
    }
]

AGENTS = [
    {"id": "learning_advisor", "name": "📚 학습 상담 Agent"},
    {"id": "career_guide", "name": "🎯 진로 지도 Agent"},
    {"id": "curriculum_designer", "name": "📋 커리큘럼 설계 Agent"},
    {"id": "assessment_expert", "name": "📊 학습 평가 Agent"}
]

@app.route('/api/education/info', methods=['GET'])
def get_info():
    return jsonify(SYSTEM_INFO)

@app.route('/api/education/stages', methods=['GET'])
def get_stages():
    return jsonify({"stages": SEVEN_STAGES})

@app.route('/api/education/scenarios', methods=['GET'])
def get_scenarios():
    return jsonify({"scenarios": SCENARIOS})

@app.route('/api/education/agents', methods=['GET'])
def get_agents():
    return jsonify({"agents": AGENTS})

@app.route('/api/education/consultation', methods=['POST', 'OPTIONS'])
def consultation():
    if request.method == 'OPTIONS':
        return '', 204
    
    if not client:
        return jsonify({"response": "⚠️ API 키가 설정되지 않았습니다."}), 200
    
    try:
        data = request.json
        message = data.get('message', '')
        agent_type = data.get('agent_type', 'learning_advisor')
        
        prompts = {
            "learning_advisor": "당신은 AI 학습 상담 전문가입니다. 개인 맞춤형 학습 전략을 제안합니다.",
            "career_guide": "당신은 진로 지도 전문가입니다. 적성과 관심사에 맞는 진로를 추천합니다.",
            "curriculum_designer": "당신은 교육과정 설계 전문가입니다. 최적의 학습 경로를 설계합니다.",
            "assessment_expert": "당신은 학습 평가 전문가입니다. 학습 성과를 분석하고 개선점을 제안합니다."
        }
        
        system_prompt = prompts.get(agent_type, prompts["learning_advisor"])
        system_prompt += "\n\n7단계 평생교육 시스템과 AI 기반 맞춤형 학습의 장점을 강조하여 답변하세요."
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            system=system_prompt,
            messages=[{"role": "user", "content": message}]
        )
        
        return jsonify({"response": response.content[0].text})
        
    except Exception as e:
        return jsonify({"response": f"오류: {str(e)}"}), 500

@app.route('/api/education/recommend-path', methods=['POST'])
def recommend_path():
    data = request.json
    age = data.get('age', 25)
    interests = data.get('interests', [])
    
    # 나이에 따른 단계 결정
    if age <= 6:
        stage = 1
    elif age <= 12:
        stage = 2
    elif age <= 18:
        stage = 3
    elif age <= 29:
        stage = 4
    elif age <= 49:
        stage = 5
    elif age <= 64:
        stage = 6
    else:
        stage = 7
    
    return jsonify({
        "recommended_stage": SEVEN_STAGES[stage-1],
        "personalized_courses": [
            {"name": "AI 기초", "duration": "3개월", "match_score": 95},
            {"name": "데이터 분석", "duration": "4개월", "match_score": 88},
            {"name": "프로젝트 관리", "duration": "2개월", "match_score": 82}
        ]
    })

if __name__ == '__main__':
    logger.info("🚀 7단계 AI 교육 시스템 백엔드 시작 (포트 5002)")
    app.run(host='0.0.0.0', port=5002, debug=False)
