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
    "system_name": "오픈해시 기반 특허 AI 시뮬레이션 포털",
    "description": "AI 기반 특허 출원·심사·분석 통합 플랫폼",
    "total_patents": 2850000,
    "annual_applications": 285000,
    "ai_search_speed": "0.3초",
    "prior_art_accuracy": "99.2%",
    "processing_time_reduction": "78%",
    "annual_savings": "연간 4,500억 원"
}

PATENT_TYPES = [
    {"id": "invention", "name": "특허(발명)", "icon": "💡", "duration": "20년", "annual": 125000},
    {"id": "utility", "name": "실용신안", "icon": "🔧", "duration": "10년", "annual": 45000},
    {"id": "design", "name": "디자인", "icon": "🎨", "duration": "20년", "annual": 72000},
    {"id": "trademark", "name": "상표", "icon": "™️", "duration": "10년(갱신가능)", "annual": 185000}
]

TECH_FIELDS = [
    {"id": "it", "name": "IT·소프트웨어", "icon": "💻", "share": 28.5},
    {"id": "bio", "name": "바이오·의료", "icon": "🧬", "share": 18.2},
    {"id": "electronics", "name": "전기·전자", "icon": "⚡", "share": 22.3},
    {"id": "mechanical", "name": "기계·자동차", "icon": "⚙️", "share": 15.8},
    {"id": "chemical", "name": "화학·소재", "icon": "🧪", "share": 10.5},
    {"id": "ai", "name": "AI·빅데이터", "icon": "🤖", "share": 4.7}
]

SCENARIOS = [
    {
        "icon": "🔍",
        "title": "AI 선행기술 조사",
        "problem": "심사관이 14일간 수작업 검색, 유사 특허 누락 위험",
        "solution": "AI가 0.3초 만에 전세계 1.5억 건 특허 DB 검색, 유사도 99.2% 자동 탐지",
        "savings": "조사 시간 99.9% 단축"
    },
    {
        "icon": "📝",
        "title": "명세서 자동 작성",
        "problem": "명세서 작성에 변리사 비용 300만원+, 2-4주 소요",
        "solution": "AI가 발명 내용 분석하여 청구항, 명세서 자동 생성",
        "savings": "출원 비용 85% 절감"
    },
    {
        "icon": "⚖️",
        "title": "특허성 자동 판단",
        "problem": "출원 전 특허 가능성 판단 어려움, 거절 시 비용 손실",
        "solution": "AI가 신규성, 진보성, 산업상 이용가능성 사전 분석",
        "savings": "불필요 출원 72% 감소"
    },
    {
        "icon": "💰",
        "title": "특허 가치 평가",
        "problem": "특허 기술이전, 매매 시 가치 산정 어려움",
        "solution": "AI가 시장성, 기술성, 권리범위 분석하여 객관적 가치 평가",
        "savings": "기술거래 활성화 340% 증가"
    }
]

AGENTS = [
    {"id": "prior_art_search", "name": "🔍 선행기술 조사 Agent"},
    {"id": "drafting_assistant", "name": "📝 명세서 작성 Agent"},
    {"id": "patentability_judge", "name": "⚖️ 특허성 판단 Agent"},
    {"id": "valuation_expert", "name": "💰 가치 평가 Agent"},
    {"id": "infringement_analyzer", "name": "⚠️ 침해 분석 Agent"},
    {"id": "application_guide", "name": "📋 출원 안내 Agent"}
]

@app.route('/api/patents/info', methods=['GET'])
def get_info():
    return jsonify(SYSTEM_INFO)

@app.route('/api/patents/types', methods=['GET'])
def get_types():
    return jsonify({"types": PATENT_TYPES})

@app.route('/api/patents/tech-fields', methods=['GET'])
def get_tech_fields():
    return jsonify({"fields": TECH_FIELDS})

@app.route('/api/patents/scenarios', methods=['GET'])
def get_scenarios():
    return jsonify({"scenarios": SCENARIOS})

@app.route('/api/patents/agents', methods=['GET'])
def get_agents():
    return jsonify({"agents": AGENTS})

@app.route('/api/patents/consultation', methods=['POST', 'OPTIONS'])
def consultation():
    if request.method == 'OPTIONS':
        return '', 204
    
    if not client:
        return jsonify({"response": "⚠️ API 키가 설정되지 않았습니다."}), 200
    
    try:
        data = request.json
        message = data.get('message', '')
        agent_type = data.get('agent_type', 'application_guide')
        
        prompts = {
            "prior_art_search": "당신은 선행기술 조사 AI입니다. 발명 내용을 분석하여 유사한 기존 특허와 기술을 찾아 설명합니다.",
            "drafting_assistant": "당신은 특허 명세서 작성 AI입니다. 발명 내용을 청구항, 상세 설명 형식으로 작성합니다.",
            "patentability_judge": "당신은 특허성 판단 AI입니다. 신규성, 진보성, 산업상 이용가능성을 분석합니다.",
            "valuation_expert": "당신은 특허 가치 평가 AI입니다. 기술성, 시장성, 권리범위를 분석하여 가치를 평가합니다.",
            "infringement_analyzer": "당신은 특허 침해 분석 AI입니다. 제품/기술의 특허 침해 가능성을 분석합니다.",
            "application_guide": "당신은 특허 출원 안내 AI입니다. 출원 절차, 비용, 기간, 필요 서류를 안내합니다."
        }
        
        system_prompt = prompts.get(agent_type, prompts["application_guide"])
        system_prompt += "\n\n특허 전문 AI로서 정확한 정보를 제공하되, 최종 판단은 변리사 상담을 권고하세요."
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            system=system_prompt,
            messages=[{"role": "user", "content": message}]
        )
        
        return jsonify({"response": response.content[0].text})
        
    except Exception as e:
        return jsonify({"response": f"오류: {str(e)}"}), 500

@app.route('/api/patents/search-prior-art', methods=['POST'])
def search_prior_art():
    data = request.json
    invention = data.get('invention', '')
    
    results = {
        "query": invention,
        "search_time": "0.32초",
        "total_found": 847,
        "top_similar": [
            {
                "patent_id": "KR10-2023-0012345",
                "title": "인공지능 기반 데이터 처리 시스템",
                "applicant": "삼성전자",
                "date": "2023-05-15",
                "similarity": 87.3,
                "status": "등록"
            },
            {
                "patent_id": "KR10-2022-0098765",
                "title": "머신러닝을 이용한 예측 방법",
                "applicant": "LG전자",
                "date": "2022-11-20",
                "similarity": 72.8,
                "status": "등록"
            },
            {
                "patent_id": "US11234567B2",
                "title": "AI-based Data Processing Method",
                "applicant": "Google LLC",
                "date": "2023-01-10",
                "similarity": 68.5,
                "status": "등록"
            }
        ],
        "novelty_assessment": "유사 기술 존재, 차별점 명확화 필요"
    }
    
    return jsonify({"results": results})

@app.route('/api/patents/check-patentability', methods=['POST'])
def check_patentability():
    data = request.json
    invention = data.get('invention', '')
    
    assessment = {
        "invention_summary": invention[:100] + "...",
        "overall_score": 72,
        "criteria": {
            "novelty": {"score": 75, "status": "보통", "comment": "유사 선행기술 존재, 차별점 보완 필요"},
            "inventive_step": {"score": 68, "status": "보통", "comment": "기술적 효과 명확화 필요"},
            "industrial_applicability": {"score": 85, "status": "양호", "comment": "실용성 높음"}
        },
        "patent_probability": {
            "korea": 72,
            "usa": 65,
            "china": 70,
            "japan": 68,
            "europe": 62
        },
        "recommendations": [
            "청구항 범위 조정 권장",
            "기술적 효과 구체화 필요",
            "도면 보완 권장"
        ],
        "estimated_processing": "12-18개월"
    }
    
    return jsonify({"assessment": assessment})

@app.route('/api/patents/evaluate-value', methods=['POST'])
def evaluate_value():
    data = request.json
    patent_id = data.get('patent_id', '')
    
    valuation = {
        "patent_id": patent_id,
        "valuation_date": "2025-11-24",
        "technology_score": 82,
        "market_score": 75,
        "legal_score": 88,
        "overall_grade": "A-",
        "estimated_value": {
            "min": 250000000,
            "max": 450000000,
            "expected": 350000000
        },
        "market_analysis": {
            "target_market_size": "2.5조 원",
            "growth_rate": "12.5%",
            "competitors": 8
        },
        "license_potential": {
            "annual_royalty": "3-5%",
            "expected_revenue": "연간 35억 원"
        },
        "recommendations": [
            "해외 출원 확대 권장",
            "기술 이전 협상 유리",
            "포트폴리오 구축 권장"
        ]
    }
    
    return jsonify({"valuation": valuation})

@app.route('/api/patents/draft-claims', methods=['POST'])
def draft_claims():
    data = request.json
    invention = data.get('invention', '')
    
    draft = {
        "draft_id": "DRAFT-PAT-2025-001",
        "title": "AI 기반 데이터 처리 시스템 및 방법",
        "claims": {
            "independent": [
                "【청구항 1】\n데이터를 수신하는 입력부;\n상기 데이터를 인공지능 모델을 이용하여 분석하는 처리부; 및\n분석 결과를 출력하는 출력부를 포함하는 AI 기반 데이터 처리 시스템.",
                "【청구항 5】\n데이터를 수신하는 단계;\n인공지능 모델을 이용하여 상기 데이터를 분석하는 단계; 및\n분석 결과를 출력하는 단계를 포함하는 AI 기반 데이터 처리 방법."
            ],
            "dependent": [
                "【청구항 2】\n제1항에 있어서, 상기 처리부는 딥러닝 알고리즘을 이용하는 것을 특징으로 하는 시스템.",
                "【청구항 3】\n제1항에 있어서, 상기 입력부는 실시간 스트리밍 데이터를 수신하는 것을 특징으로 하는 시스템."
            ]
        },
        "abstract": "본 발명은 인공지능을 이용한 데이터 처리 시스템에 관한 것으로...",
        "estimated_filing_cost": 450000,
        "disclaimer": "본 초안은 AI가 생성한 것으로, 최종 출원 전 변리사 검토가 필요합니다."
    }
    
    return jsonify({"draft": draft})

if __name__ == '__main__':
    logger.info("🚀 특허 AI 시뮬레이션 포털 백엔드 시작 (포트 5018)")
    app.run(host='0.0.0.0', port=5018, debug=False)
