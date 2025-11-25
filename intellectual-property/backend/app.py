from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY', '')
client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY) if ANTHROPIC_API_KEY else None

SCENARIOS = [
    {
        "icon": "🔍",
        "title": "선행기술 조사 자동화",
        "problem": "심사관이 14일 동안 수작업으로 글로벌 특허 DB를 검색",
        "solution": "AI가 0.5초 만에 28개국 특허 DB를 동시 검색",
        "savings": "연간 437억 원"
    }
]

AGENTS = [
    {"id": "applicant_consultant", "name": "🧑‍💼 출원인 상담 Agent"},
    {"id": "examiner_assistant", "name": "👨‍⚖️ 심사관 보조 Agent"}
]

@app.route('/api/intellectual-property/scenarios', methods=['GET'])
def get_scenarios():
    return jsonify({"scenarios": SCENARIOS})

@app.route('/api/intellectual-property/agents', methods=['GET'])
def get_agents():
    return jsonify({"agents": AGENTS})

# 두 가지 경로 모두 처리
@app.route('/api/intellectual-property/ai-patent-filing', methods=['POST', 'OPTIONS'])
@app.route('/ai-patent-filing', methods=['POST', 'OPTIONS'])
def ai_patent_filing():
    logger.info(f"REQUEST: {request.method} {request.path}")
    
    if request.method == 'OPTIONS':
        return '', 204
    
    if not client:
        return jsonify({
            "conversation": [
                {"role": "assistant", "content": "⚠️ API 키가 설정되지 않았습니다."}
            ]
        }), 200
    
    try:
        data = request.json
        logger.info(f"Request data: {data}")
        
        message = data.get('message', '')
        conversation = data.get('conversation', [])
        
        conversation.append({"role": "user", "content": message})
        messages = [{"role": msg["role"], "content": msg["content"]} for msg in conversation]
        
        logger.info("Claude API 호출 시작")
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            system="당신은 특허 출원을 돕는 전문 AI Agent입니다. 발명의 내용을 파악하기 위해 질문합니다.",
            messages=messages
        )
        
        logger.info("Claude API 응답 받음")
        conversation.append({"role": "assistant", "content": response.content[0].text})
        
        return jsonify({"conversation": conversation})
        
    except Exception as e:
        logger.error(f"오류: {str(e)}", exc_info=True)
        return jsonify({"error": str(e)}), 500

@app.route('/api/intellectual-property/generate-patent-document', methods=['POST'])
@app.route('/generate-patent-document', methods=['POST'])
def generate_patent_document():
    return jsonify({"document": "테스트 문서"})

@app.route('/api/intellectual-property/patent-evaluation', methods=['POST'])
@app.route('/patent-evaluation', methods=['POST'])
def patent_evaluation():
    evaluation = {
        "overall_score": 85,
        "novelty_score": 88,
        "inventive_step_score": 82,
        "industrial_applicability_score": 87,
        "clarity_score": 83,
        "patent_probability": {"korea": 85, "china": 78, "japan": 82, "usa": 75, "europe": 80},
        "strengths": ["기술적 특징 명확", "실용성 높음"],
        "weaknesses": ["청구항 범위 조정 필요"],
        "market_analysis": {
            "global_market_size_trillion_krw": 12.5,
            "tech_value_billion_krw": 98,
            "annual_license_revenue_billion_krw": 6.8
        },
        "evaluation_summary": "양호한 발명입니다."
    }
    return jsonify({"evaluation": evaluation})

if __name__ == '__main__':
    logger.info("=" * 50)
    logger.info("🚀 Flask 서버 시작")
    logger.info(f"API 키: {'설정됨' if ANTHROPIC_API_KEY else '미설정'}")
    logger.info("=" * 50)
    app.run(host='0.0.0.0', port=5016, debug=True)
