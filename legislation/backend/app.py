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
    "system_name": "법제처 업무자동화 시스템",
    "description": "AI 기반 법령 입안·심사·해석 통합 플랫폼",
    "total_laws": 15200,
    "annual_reviews": 4500,
    "processing_speed": "기존 대비 78% 향상",
    "accuracy_rate": "99.2%",
    "annual_savings": "연간 1,850억 원"
}

DEPARTMENTS = [
    {"id": "planning", "name": "기획조정관실", "icon": "📊", "tasks": ["법제 정책", "국제 협력"]},
    {"id": "review1", "name": "법령심사1과", "icon": "📋", "tasks": ["헌법·행정법", "경제법"]},
    {"id": "review2", "name": "법령심사2과", "icon": "📋", "tasks": ["사회법", "환경법"]},
    {"id": "drafting", "name": "법령입안과", "icon": "✏️", "tasks": ["법령 입안", "표준안 작성"]},
    {"id": "interpretation", "name": "법령해석과", "icon": "🔍", "tasks": ["법령 해석", "질의 회신"]},
    {"id": "info", "name": "법령정보과", "icon": "💻", "tasks": ["법령 DB", "정보 제공"]}
]

LAW_CATEGORIES = [
    {"id": "constitution", "name": "헌법", "icon": "📜", "count": 1},
    {"id": "act", "name": "법률", "icon": "📘", "count": 1850},
    {"id": "decree", "name": "대통령령", "icon": "📗", "count": 2100},
    {"id": "ordinance", "name": "총리령·부령", "icon": "📕", "count": 4200},
    {"id": "rule", "name": "행정규칙", "icon": "📒", "count": 7050}
]

SCENARIOS = [
    {
        "icon": "✏️",
        "title": "AI 법령 입안",
        "problem": "법령 초안 작성에 평균 45일 소요, 용어·형식 오류 빈발",
        "solution": "AI가 정책 목표 분석하여 표준화된 법령 초안 자동 생성",
        "savings": "입안 기간 82% 단축"
    },
    {
        "icon": "🔍",
        "title": "자동 법령 심사",
        "problem": "연간 4,500건 심사, 인력 부족으로 심사 지연",
        "solution": "AI가 헌법 합치성, 법체계 정합성, 용어 적정성 자동 검토",
        "savings": "심사 정확도 99.2%, 기간 78% 단축"
    },
    {
        "icon": "⚖️",
        "title": "법령 해석 자동화",
        "problem": "동일 조문 해석 요청 반복, 일관성 유지 어려움",
        "solution": "AI가 기존 해석례 분석하여 일관된 해석 자동 제공",
        "savings": "해석 회신 기간 90% 단축"
    },
    {
        "icon": "🔗",
        "title": "법령 충돌 탐지",
        "problem": "15,200개 법령 간 충돌·모순 파악 어려움",
        "solution": "AI가 전체 법령 실시간 분석, 충돌 조항 자동 탐지",
        "savings": "법적 안정성 95% 향상"
    }
]

AGENTS = [
    {"id": "drafting_assistant", "name": "✏️ 법령 입안 Agent"},
    {"id": "review_assistant", "name": "🔍 법령 심사 Agent"},
    {"id": "interpretation", "name": "⚖️ 법령 해석 Agent"},
    {"id": "search_assistant", "name": "📚 법령 검색 Agent"},
    {"id": "conflict_detector", "name": "⚠️ 충돌 탐지 Agent"}
]

@app.route('/api/legislation/info', methods=['GET'])
def get_info():
    return jsonify(SYSTEM_INFO)

@app.route('/api/legislation/departments', methods=['GET'])
def get_departments():
    return jsonify({"departments": DEPARTMENTS})

@app.route('/api/legislation/categories', methods=['GET'])
def get_categories():
    return jsonify({"categories": LAW_CATEGORIES})

@app.route('/api/legislation/scenarios', methods=['GET'])
def get_scenarios():
    return jsonify({"scenarios": SCENARIOS})

@app.route('/api/legislation/agents', methods=['GET'])
def get_agents():
    return jsonify({"agents": AGENTS})

@app.route('/api/legislation/consultation', methods=['POST', 'OPTIONS'])
def consultation():
    if request.method == 'OPTIONS':
        return '', 204
    
    if not client:
        return jsonify({"response": "⚠️ API 키가 설정되지 않았습니다."}), 200
    
    try:
        data = request.json
        message = data.get('message', '')
        agent_type = data.get('agent_type', 'interpretation')
        
        prompts = {
            "drafting_assistant": "당신은 법령 입안 전문 AI입니다. 정책 목표에 맞는 법령 조문을 표준 형식으로 작성합니다. 법제처 입법기술 지침을 준수합니다.",
            "review_assistant": "당신은 법령 심사 전문 AI입니다. 법령안의 헌법 합치성, 법체계 정합성, 용어 적정성을 검토합니다.",
            "interpretation": "당신은 법령 해석 전문 AI입니다. 법령 조문의 의미와 적용 범위를 명확히 해석합니다. 기존 해석례와 판례를 참고합니다.",
            "search_assistant": "당신은 법령 검색 AI입니다. 키워드, 조문, 시행일 등으로 관련 법령을 찾아 안내합니다.",
            "conflict_detector": "당신은 법령 충돌 탐지 AI입니다. 법령 간 모순, 중복, 상충 조항을 분석합니다."
        }
        
        system_prompt = prompts.get(agent_type, prompts["interpretation"])
        system_prompt += "\n\n법제처의 AI 서비스로서 정확하고 전문적인 법률 용어를 사용하여 답변하세요."
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            system=system_prompt,
            messages=[{"role": "user", "content": message}]
        )
        
        return jsonify({"response": response.content[0].text})
        
    except Exception as e:
        return jsonify({"response": f"오류: {str(e)}"}), 500

@app.route('/api/legislation/search-law', methods=['POST'])
def search_law():
    data = request.json
    keyword = data.get('keyword', '')
    
    results = [
        {
            "law_id": "LAW-001234",
            "name": "행정절차법",
            "category": "법률",
            "enacted": "1996-12-31",
            "last_amended": "2024-01-16",
            "articles": 53,
            "relevance": 95.2
        },
        {
            "law_id": "LAW-002345",
            "name": "행정절차법 시행령",
            "category": "대통령령",
            "enacted": "1998-06-30",
            "last_amended": "2024-02-20",
            "articles": 28,
            "relevance": 88.7
        }
    ]
    
    return jsonify({
        "keyword": keyword,
        "results": results,
        "total": len(results)
    })

@app.route('/api/legislation/draft-article', methods=['POST'])
def draft_article():
    data = request.json
    purpose = data.get('purpose', '')
    
    draft = {
        "draft_id": "DRAFT-2025-112400001",
        "purpose": purpose,
        "article_draft": {
            "title": "제O조(목적)",
            "content": "이 법은 [정책목표]에 관한 사항을 규정함으로써 [기대효과]를 목적으로 한다.",
            "notes": [
                "목적 조항은 법률의 첫 번째 조문으로 배치",
                "규율 대상과 기대 효과를 명확히 기술",
                "다른 법률과의 관계 고려 필요"
            ]
        },
        "standard_terms": [
            {"term": "~하여야 한다", "usage": "의무 규정"},
            {"term": "~할 수 있다", "usage": "재량 규정"},
            {"term": "~하여서는 아니 된다", "usage": "금지 규정"}
        ]
    }
    
    return jsonify({"draft": draft})

@app.route('/api/legislation/review-article', methods=['POST'])
def review_article():
    data = request.json
    article_text = data.get('text', '')
    
    review = {
        "review_id": "REV-2025-112400001",
        "overall_score": 87.5,
        "checks": [
            {"item": "헌법 합치성", "status": "적합", "score": 95},
            {"item": "법체계 정합성", "status": "적합", "score": 88},
            {"item": "용어 적정성", "status": "일부 수정 필요", "score": 78},
            {"item": "문장 명확성", "status": "적합", "score": 90}
        ],
        "suggestions": [
            {"type": "용어", "original": "실시", "suggested": "시행", "reason": "표준 법령 용어"},
            {"type": "문장", "issue": "주어 불명확", "suggestion": "주체를 명시할 것"}
        ],
        "related_laws": [
            {"name": "행정절차법 제5조", "relation": "참고 필요"},
            {"name": "정부조직법 제2조", "relation": "연계 조항"}
        ]
    }
    
    return jsonify({"review": review})

@app.route('/api/legislation/interpret', methods=['POST'])
def interpret():
    data = request.json
    law_name = data.get('law_name', '')
    article = data.get('article', '')
    question = data.get('question', '')
    
    interpretation = {
        "interpretation_id": "INT-2025-112400001",
        "law_name": law_name,
        "article": article,
        "question": question,
        "answer": "해당 조문의 '행정청'은 국가 및 지방자치단체의 행정기관을 의미하며, 공공기관의 운영에 관한 법률에 따른 공공기관은 포함되지 않습니다.",
        "legal_basis": [
            "행정절차법 제2조 제1호",
            "법제처 법령해석 2023-0123"
        ],
        "precedents": [
            {"case": "대법원 2022다12345", "summary": "행정청의 범위 관련 판시"}
        ]
    }
    
    return jsonify({"interpretation": interpretation})

if __name__ == '__main__':
    logger.info("🚀 법제처 업무자동화 시스템 백엔드 시작 (포트 5013)")
    app.run(host='0.0.0.0', port=5013, debug=False)
