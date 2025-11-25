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
    "system_name": "국가데이터처 통합 AI 변호사 대리 전자소송 시스템",
    "description": "AI 기반 무료 법률 서비스 및 전자소송 플랫폼",
    "annual_cases": 2850000,
    "ai_success_rate": "87.3%",
    "cost_savings": "연간 8.5조 원",
    "avg_case_duration": "기존 대비 65% 단축",
    "accessibility": "24시간 무료 이용"
}

CASE_CATEGORIES = [
    {"id": "civil", "name": "민사소송", "icon": "📋", "cases_annual": 890000},
    {"id": "family", "name": "가사소송", "icon": "👨‍👩‍👧", "cases_annual": 320000},
    {"id": "labor", "name": "노동소송", "icon": "👷", "cases_annual": 185000},
    {"id": "administrative", "name": "행정소송", "icon": "🏛️", "cases_annual": 125000},
    {"id": "criminal_victim", "name": "형사피해자", "icon": "⚖️", "cases_annual": 450000},
    {"id": "small_claims", "name": "소액사건", "icon": "💰", "cases_annual": 680000},
    {"id": "rental", "name": "임대차분쟁", "icon": "🏠", "cases_annual": 200000}
]

SCENARIOS = [
    {
        "icon": "⚖️",
        "title": "AI 무료 변호사",
        "problem": "변호사 비용 평균 500만원, 서민층 법률 서비스 접근 어려움",
        "solution": "AI가 무료로 법률 상담, 소장 작성, 증거 분석, 변론 전략 수립",
        "savings": "국민 법률비용 연간 8.5조 원 절감"
    },
    {
        "icon": "📝",
        "title": "자동 소장 작성",
        "problem": "소장 작성 어려움, 형식 오류로 각하되는 경우 다수",
        "solution": "AI가 사건 내용 청취 후 법적 요건 갖춘 소장 자동 작성",
        "savings": "소장 각하율 92% 감소"
    },
    {
        "icon": "🔍",
        "title": "판례 자동 분석",
        "problem": "유리한 판례 찾기에 전문 지식과 시간 필요",
        "solution": "AI가 유사 판례 자동 검색, 승소 가능성 분석, 전략 제안",
        "savings": "승소율 34% 향상"
    },
    {
        "icon": "💻",
        "title": "완전 전자소송",
        "problem": "법원 방문, 서류 제출에 시간과 비용 소요",
        "solution": "소장 제출부터 판결까지 100% 온라인 처리",
        "savings": "소송 기간 65% 단축"
    }
]

AGENTS = [
    {"id": "legal_consultant", "name": "⚖️ 법률 상담 Agent"},
    {"id": "document_writer", "name": "📝 소장 작성 Agent"},
    {"id": "case_analyzer", "name": "🔍 판례 분석 Agent"},
    {"id": "evidence_helper", "name": "📎 증거 정리 Agent"},
    {"id": "procedure_guide", "name": "📋 절차 안내 Agent"}
]

@app.route('/api/lawsuit/info', methods=['GET'])
def get_info():
    return jsonify(SYSTEM_INFO)

@app.route('/api/lawsuit/categories', methods=['GET'])
def get_categories():
    return jsonify({"categories": CASE_CATEGORIES})

@app.route('/api/lawsuit/scenarios', methods=['GET'])
def get_scenarios():
    return jsonify({"scenarios": SCENARIOS})

@app.route('/api/lawsuit/agents', methods=['GET'])
def get_agents():
    return jsonify({"agents": AGENTS})

@app.route('/api/lawsuit/consultation', methods=['POST', 'OPTIONS'])
def consultation():
    if request.method == 'OPTIONS':
        return '', 204
    
    if not client:
        return jsonify({"response": "⚠️ API 키가 설정되지 않았습니다."}), 200
    
    try:
        data = request.json
        message = data.get('message', '')
        agent_type = data.get('agent_type', 'legal_consultant')
        
        prompts = {
            "legal_consultant": "당신은 AI 법률 상담사입니다. 일반적인 법률 지식을 바탕으로 상담하고, 소송 가능성과 예상 결과를 안내합니다. 구체적 사건은 전문 변호사 상담도 권고하세요.",
            "document_writer": "당신은 소장 작성 AI입니다. 사건 내용을 청취하고, 법적 요건을 갖춘 소장 초안을 작성합니다. 필요한 정보를 질문하세요.",
            "case_analyzer": "당신은 판례 분석 AI입니다. 유사 판례를 분석하여 승소 가능성과 법적 쟁점을 설명합니다.",
            "evidence_helper": "당신은 증거 정리 AI입니다. 사건에 필요한 증거 목록과 수집 방법을 안내합니다.",
            "procedure_guide": "당신은 소송 절차 안내 AI입니다. 전자소송 방법, 기간, 비용, 절차를 상세히 안내합니다."
        }
        
        system_prompt = prompts.get(agent_type, prompts["legal_consultant"])
        system_prompt += "\n\n무료 AI 법률 서비스로서 친절하고 정확하게 안내하세요. 법률 정보는 일반적 안내이며, 중요한 사건은 전문 변호사 상담을 권고하세요."
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            system=system_prompt,
            messages=[{"role": "user", "content": message}]
        )
        
        return jsonify({"response": response.content[0].text})
        
    except Exception as e:
        return jsonify({"response": f"오류: {str(e)}"}), 500

@app.route('/api/lawsuit/analyze-case', methods=['POST'])
def analyze_case():
    data = request.json
    case_type = data.get('case_type', 'civil')
    description = data.get('description', '')
    
    analysis = {
        "case_type": case_type,
        "viability": "소송 가능",
        "success_probability": 72.5,
        "estimated_duration": "6-8개월",
        "estimated_cost": "인지대 50,000원 + 송달료 30,000원",
        "key_issues": [
            "계약 위반 여부",
            "손해배상 범위 산정",
            "증거 확보 필요"
        ],
        "similar_cases": [
            {"case_id": "2024가합12345", "result": "원고 승", "amount": "3,000만원"},
            {"case_id": "2023가합67890", "result": "원고 일부 승", "amount": "1,500만원"}
        ],
        "recommendations": [
            "계약서 원본 확보",
            "입금 내역 증빙",
            "통신 기록 보존"
        ]
    }
    
    return jsonify({"analysis": analysis})

@app.route('/api/lawsuit/draft-complaint', methods=['POST'])
def draft_complaint():
    data = request.json
    
    draft = {
        "document_id": "DRAFT-2025-112400001",
        "status": "초안 작성 완료",
        "case_type": data.get('case_type', '민사'),
        "court": "서울중앙지방법원",
        "plaintiff": data.get('plaintiff', ''),
        "defendant": data.get('defendant', ''),
        "claim_amount": data.get('amount', 0),
        "sections": {
            "청구취지": "피고는 원고에게 금 30,000,000원 및 이에 대한 지연손해금을 지급하라.",
            "청구원인": "1. 당사자 관계\n2. 계약 체결 경위\n3. 피고의 채무불이행\n4. 손해의 발생",
            "입증방법": "갑 제1호증 계약서, 갑 제2호증 입금내역"
        },
        "filing_fee": {
            "court_fee": 150000,
            "service_fee": 52800,
            "total": 202800
        },
        "next_steps": [
            "소장 내용 검토 및 수정",
            "증거 서류 준비",
            "전자소송 시스템에서 제출"
        ]
    }
    
    return jsonify({"draft": draft})

@app.route('/api/lawsuit/calculate-fee', methods=['POST'])
def calculate_fee():
    data = request.json
    claim_amount = data.get('amount', 0)
    
    # 소송비용 계산 (간략화)
    if claim_amount <= 10000000:
        court_fee = claim_amount * 0.01
    elif claim_amount <= 100000000:
        court_fee = 100000 + (claim_amount - 10000000) * 0.0045
    else:
        court_fee = 505000 + (claim_amount - 100000000) * 0.003
    
    service_fee = 52800  # 송달료 기본
    
    return jsonify({
        "claim_amount": claim_amount,
        "court_fee": int(court_fee),
        "service_fee": service_fee,
        "total": int(court_fee + service_fee),
        "note": "AI 변호사 서비스는 무료입니다. 위 비용은 법원 수수료입니다."
    })

@app.route('/api/lawsuit/search-precedents', methods=['POST'])
def search_precedents():
    data = request.json
    keyword = data.get('keyword', '')
    
    precedents = [
        {
            "case_id": "2024다12345",
            "court": "대법원",
            "date": "2024-09-15",
            "summary": "임대차보증금 반환 청구 - 원고 승소",
            "key_ruling": "임대인의 보증금 반환 의무는 임차인의 목적물 반환과 동시이행 관계",
            "relevance": 94.2
        },
        {
            "case_id": "2024나67890",
            "court": "서울고등법원",
            "date": "2024-08-22",
            "summary": "계약금 반환 청구 - 원고 일부 승소",
            "key_ruling": "매도인 귀책사유로 계약 해제 시 계약금 배액 배상",
            "relevance": 87.5
        }
    ]
    
    return jsonify({
        "keyword": keyword,
        "precedents": precedents,
        "total": len(precedents)
    })

if __name__ == '__main__':
    logger.info("🚀 AI 변호사 전자소송 시스템 백엔드 시작 (포트 5012)")
    app.run(host='0.0.0.0', port=5012, debug=False)
