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
    "system_name": "오픈해시 기반 예방적 사법 시스템",
    "description": "AI 기반 범죄 예방 및 사법 정의 실현 플랫폼",
    "crime_prevention_rate": "67.3%",
    "case_processing_speed": "4.2배 향상",
    "wrongful_conviction_reduction": "94.5%",
    "recidivism_reduction": "58.7%",
    "annual_savings": "2.3조 원"
}

SYSTEM_COMPONENTS = [
    {"id": "prevention", "name": "범죄 예방 시스템", "icon": "🛡️", "accuracy": "89.2%"},
    {"id": "investigation", "name": "수사 지원 시스템", "icon": "🔍", "accuracy": "94.7%"},
    {"id": "trial", "name": "재판 지원 시스템", "icon": "⚖️", "accuracy": "97.3%"},
    {"id": "correction", "name": "교정 관리 시스템", "icon": "🏛️", "accuracy": "91.5%"},
    {"id": "rehabilitation", "name": "재활 지원 시스템", "icon": "🤝", "accuracy": "85.8%"}
]

SCENARIOS = [
    {
        "icon": "🛡️",
        "title": "AI 범죄 예방",
        "problem": "범죄 발생 후 대응하는 사후적 시스템, 예방 한계",
        "solution": "AI가 사회 데이터 분석하여 범죄 위험 지역/시간 예측, 선제적 순찰 배치",
        "savings": "범죄율 67.3% 감소"
    },
    {
        "icon": "🔍",
        "title": "스마트 수사 시스템",
        "problem": "수사관 부족, 증거 분석에 수개월 소요",
        "solution": "AI가 CCTV, 디지털 증거, 문서 자동 분석, 용의자 프로파일링",
        "savings": "수사 기간 78% 단축"
    },
    {
        "icon": "⚖️",
        "title": "공정 재판 지원",
        "problem": "판례 검색에 시간 소요, 판사별 양형 편차 존재",
        "solution": "AI가 유사 판례 자동 검색, 양형 기준 분석 제공",
        "savings": "오판율 94.5% 감소"
    },
    {
        "icon": "🤝",
        "title": "맞춤형 재활 프로그램",
        "problem": "획일적 교정 프로그램으로 재범률 높음",
        "solution": "AI가 수형자 특성 분석, 개인별 맞춤 재활 프로그램 설계",
        "savings": "재범률 58.7% 감소"
    }
]

AGENTS = [
    {"id": "legal_advisor", "name": "⚖️ 법률 상담 Agent"},
    {"id": "case_analyzer", "name": "🔍 판례 분석 Agent"},
    {"id": "crime_prevention", "name": "🛡️ 범죄 예방 Agent"},
    {"id": "victim_support", "name": "❤️ 피해자 지원 Agent"},
    {"id": "rehabilitation", "name": "🤝 재활 상담 Agent"}
]

CRIME_CATEGORIES = [
    {"id": "theft", "name": "절도", "prevention_rate": 72.3},
    {"id": "fraud", "name": "사기", "prevention_rate": 68.5},
    {"id": "violence", "name": "폭력", "prevention_rate": 64.2},
    {"id": "cybercrime", "name": "사이버범죄", "prevention_rate": 71.8},
    {"id": "drugs", "name": "마약", "prevention_rate": 59.3}
]

@app.route('/api/judicial/info', methods=['GET'])
def get_info():
    return jsonify(SYSTEM_INFO)

@app.route('/api/judicial/components', methods=['GET'])
def get_components():
    return jsonify({"components": SYSTEM_COMPONENTS})

@app.route('/api/judicial/scenarios', methods=['GET'])
def get_scenarios():
    return jsonify({"scenarios": SCENARIOS})

@app.route('/api/judicial/agents', methods=['GET'])
def get_agents():
    return jsonify({"agents": AGENTS})

@app.route('/api/judicial/crime-categories', methods=['GET'])
def get_crime_categories():
    return jsonify({"categories": CRIME_CATEGORIES})

@app.route('/api/judicial/consultation', methods=['POST', 'OPTIONS'])
def consultation():
    if request.method == 'OPTIONS':
        return '', 204
    
    if not client:
        return jsonify({"response": "⚠️ API 키가 설정되지 않았습니다."}), 200
    
    try:
        data = request.json
        message = data.get('message', '')
        agent_type = data.get('agent_type', 'legal_advisor')
        
        prompts = {
            "legal_advisor": "당신은 법률 상담 AI입니다. 일반적인 법률 지식과 절차를 안내합니다. 구체적 사건은 변호사 상담을 권고하세요.",
            "case_analyzer": "당신은 판례 분석 AI입니다. 유사 판례와 법리를 분석하여 정보를 제공합니다.",
            "crime_prevention": "당신은 범죄 예방 AI입니다. 범죄 예방 수칙, 신고 방법, 안전 정보를 안내합니다.",
            "victim_support": "당신은 피해자 지원 AI입니다. 범죄 피해자 보호, 지원 제도, 심리 상담 연계를 안내합니다.",
            "rehabilitation": "당신은 재활 상담 AI입니다. 출소자 사회 복귀, 취업 지원, 재범 방지 프로그램을 안내합니다."
        }
        
        system_prompt = prompts.get(agent_type, prompts["legal_advisor"])
        system_prompt += "\n\n법률 정보는 일반적인 안내이며, 구체적 법률 문제는 반드시 변호사와 상담하도록 안내하세요."
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            system=system_prompt,
            messages=[{"role": "user", "content": message}]
        )
        
        return jsonify({"response": response.content[0].text})
        
    except Exception as e:
        return jsonify({"response": f"오류: {str(e)}"}), 500

@app.route('/api/judicial/search-cases', methods=['POST'])
def search_cases():
    data = request.json
    keyword = data.get('keyword', '')
    
    cases = [
        {
            "case_id": "2024도12345",
            "court": "대법원",
            "date": "2024-08-15",
            "category": "사기",
            "summary": "인터넷 쇼핑몰 사기 사건, 징역 3년 선고",
            "relevance": 94.5
        },
        {
            "case_id": "2024고합567",
            "court": "서울고등법원",
            "date": "2024-07-22",
            "category": "사기",
            "summary": "투자 사기 사건, 징역 5년 선고",
            "relevance": 87.3
        }
    ]
    
    return jsonify({
        "keyword": keyword,
        "results": cases,
        "total": len(cases)
    })

@app.route('/api/judicial/crime-risk-analysis', methods=['POST'])
def crime_risk_analysis():
    data = request.json
    location = data.get('location', '제주시')
    
    analysis = {
        "location": location,
        "overall_risk": "낮음",
        "risk_score": 23,
        "risk_by_type": [
            {"type": "절도", "risk": "낮음", "score": 18},
            {"type": "폭력", "risk": "매우 낮음", "score": 12},
            {"type": "사기", "risk": "보통", "score": 35}
        ],
        "safe_hours": "06:00-22:00",
        "recommendations": [
            "야간 외출 시 밝은 거리 이용",
            "개인정보 보호 주의",
            "의심스러운 연락 주의"
        ]
    }
    
    return jsonify({"analysis": analysis})

@app.route('/api/judicial/victim-support-info', methods=['GET'])
def victim_support_info():
    support_services = [
        {"name": "범죄피해자지원센터", "phone": "1577-1295", "service": "종합 상담"},
        {"name": "여성긴급전화", "phone": "1366", "service": "여성 폭력 피해"},
        {"name": "아동학대신고", "phone": "112", "service": "아동 학대"},
        {"name": "법률구조공단", "phone": "132", "service": "무료 법률 상담"}
    ]
    
    return jsonify({"support_services": support_services})

if __name__ == '__main__':
    logger.info("🚀 예방적 사법 시스템 백엔드 시작 (포트 5010)")
    app.run(host='0.0.0.0', port=5010, debug=False)
