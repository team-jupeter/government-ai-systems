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
    "system_name": "오픈해시 기반 통합 자치행정 시스템",
    "description": "전국 지방자치단체 행정 통합 AI 플랫폼",
    "local_governments": 243,
    "total_employees": 385000,
    "daily_services": 2850000,
    "automation_rate": "87.5%",
    "citizen_satisfaction": "94.2%",
    "annual_savings": "연간 4.8조 원"
}

LOCAL_GOV_TYPES = [
    {"id": "metro", "name": "광역시·도", "icon": "🏛️", "count": 17, "population": 51000000},
    {"id": "city", "name": "시", "icon": "🏙️", "count": 75, "population": 32000000},
    {"id": "county", "name": "군", "icon": "🌾", "count": 82, "population": 4500000},
    {"id": "district", "name": "구", "icon": "🏢", "count": 69, "population": 14500000}
]

ADMIN_SERVICES = [
    {"id": "resident", "name": "주민등록", "icon": "🪪", "digital_rate": 98},
    {"id": "tax", "name": "지방세", "icon": "💰", "digital_rate": 95},
    {"id": "welfare", "name": "복지서비스", "icon": "❤️", "digital_rate": 88},
    {"id": "construction", "name": "건축인허가", "icon": "🏗️", "digital_rate": 82},
    {"id": "business", "name": "사업자등록", "icon": "💼", "digital_rate": 94},
    {"id": "environment", "name": "환경관리", "icon": "🌿", "digital_rate": 79},
    {"id": "traffic", "name": "교통행정", "icon": "🚗", "digital_rate": 85},
    {"id": "culture", "name": "문화체육", "icon": "🎭", "digital_rate": 76}
]

SCENARIOS = [
    {
        "icon": "🔗",
        "title": "전국 행정 통합",
        "problem": "243개 지자체별 시스템 분리, 이사 시 7개 기관 개별 신고 필요",
        "solution": "오픈해시로 전국 행정 데이터 통합, 원스톱 서비스 제공",
        "savings": "민원 처리 시간 89% 단축"
    },
    {
        "icon": "🤖",
        "title": "AI 민원 자동 처리",
        "problem": "단순 민원에도 공무원 수작업 필요, 인력 낭비",
        "solution": "AI가 단순 민원 98% 자동 처리, 복잡 민원만 담당자 연결",
        "savings": "공무원 업무량 72% 절감"
    },
    {
        "icon": "📊",
        "title": "실시간 행정 분석",
        "problem": "정책 효과 측정에 수개월 소요, 즉각적 대응 어려움",
        "solution": "AI가 전국 행정 데이터 실시간 분석, 정책 효과 즉시 측정",
        "savings": "정책 대응 속도 95% 향상"
    },
    {
        "icon": "💰",
        "title": "예산 최적화",
        "problem": "지자체별 유사 사업 중복, 예산 낭비",
        "solution": "AI가 전국 사업 분석, 중복 제거 및 우수사례 공유",
        "savings": "예산 효율 38% 향상"
    }
]

AGENTS = [
    {"id": "civil_service", "name": "📋 민원 상담 Agent"},
    {"id": "local_info", "name": "📍 지역 정보 Agent"},
    {"id": "welfare_guide", "name": "❤️ 복지 안내 Agent"},
    {"id": "permit_guide", "name": "🏗️ 인허가 안내 Agent"},
    {"id": "tax_consultant", "name": "💰 지방세 상담 Agent"},
    {"id": "policy_analyst", "name": "📊 정책 분석 Agent"}
]

@app.route('/api/local-admin/info', methods=['GET'])
def get_info():
    return jsonify(SYSTEM_INFO)

@app.route('/api/local-admin/gov-types', methods=['GET'])
def get_gov_types():
    return jsonify({"gov_types": LOCAL_GOV_TYPES})

@app.route('/api/local-admin/services', methods=['GET'])
def get_services():
    return jsonify({"services": ADMIN_SERVICES})

@app.route('/api/local-admin/scenarios', methods=['GET'])
def get_scenarios():
    return jsonify({"scenarios": SCENARIOS})

@app.route('/api/local-admin/agents', methods=['GET'])
def get_agents():
    return jsonify({"agents": AGENTS})

@app.route('/api/local-admin/consultation', methods=['POST', 'OPTIONS'])
def consultation():
    if request.method == 'OPTIONS':
        return '', 204
    
    if not client:
        return jsonify({"response": "⚠️ API 키가 설정되지 않았습니다."}), 200
    
    try:
        data = request.json
        message = data.get('message', '')
        agent_type = data.get('agent_type', 'civil_service')
        
        prompts = {
            "civil_service": "당신은 통합 자치행정 민원 상담 AI입니다. 전국 243개 지자체의 민원 서비스를 안내합니다.",
            "local_info": "당신은 지역 정보 안내 AI입니다. 전국 지자체별 특성, 인구, 예산, 주요 정책을 안내합니다.",
            "welfare_guide": "당신은 지방 복지 서비스 안내 AI입니다. 지자체별 복지 정책과 신청 방법을 안내합니다.",
            "permit_guide": "당신은 지방 인허가 안내 AI입니다. 건축, 영업, 환경 등 각종 인허가 절차를 안내합니다.",
            "tax_consultant": "당신은 지방세 상담 AI입니다. 취득세, 재산세, 자동차세 등 지방세를 안내합니다.",
            "policy_analyst": "당신은 지방 정책 분석 AI입니다. 지자체 정책 효과와 우수 사례를 분석합니다."
        }
        
        system_prompt = prompts.get(agent_type, prompts["civil_service"])
        system_prompt += "\n\n전국 지방자치단체 통합 행정 시스템의 AI입니다. 친절하고 정확하게 안내하세요."
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            system=system_prompt,
            messages=[{"role": "user", "content": message}]
        )
        
        return jsonify({"response": response.content[0].text})
        
    except Exception as e:
        return jsonify({"response": f"오류: {str(e)}"}), 500

@app.route('/api/local-admin/search-gov', methods=['POST'])
def search_gov():
    data = request.json
    keyword = data.get('keyword', '')
    
    results = [
        {
            "code": "50",
            "name": "제주특별자치도",
            "type": "광역",
            "population": 676000,
            "area": "1849km²",
            "budget": "7.2조 원",
            "employees": 4500
        },
        {
            "code": "50110",
            "name": "제주시",
            "type": "시",
            "population": 492000,
            "area": "978km²",
            "budget": "1.8조 원",
            "employees": 1850
        }
    ]
    
    return jsonify({
        "keyword": keyword,
        "results": results,
        "total": len(results)
    })

@app.route('/api/local-admin/move-notification', methods=['POST'])
def move_notification():
    data = request.json
    from_region = data.get('from', '')
    to_region = data.get('to', '')
    
    result = {
        "notification_id": "MOVE-2025-112400001",
        "status": "처리완료",
        "from_region": from_region,
        "to_region": to_region,
        "auto_updated": [
            {"agency": "주민센터", "service": "주민등록", "status": "완료"},
            {"agency": "국민건강보험공단", "service": "건강보험", "status": "완료"},
            {"agency": "국민연금공단", "service": "국민연금", "status": "완료"},
            {"agency": "상수도사업소", "service": "수도", "status": "완료"},
            {"agency": "한국전력", "service": "전기", "status": "완료"},
            {"agency": "가스공사", "service": "가스", "status": "완료"},
            {"agency": "우체국", "service": "우편물 전송", "status": "완료"}
        ],
        "processing_time": "2.3초",
        "message": "7개 기관 주소가 일괄 변경되었습니다."
    }
    
    return jsonify({"result": result})

@app.route('/api/local-admin/compare-regions', methods=['POST'])
def compare_regions():
    data = request.json
    regions = data.get('regions', [])
    
    comparison = {
        "regions": [
            {
                "name": "서울특별시",
                "population": 9500000,
                "budget_per_capita": 380,
                "welfare_score": 92,
                "digital_score": 95
            },
            {
                "name": "제주특별자치도",
                "population": 676000,
                "budget_per_capita": 1065,
                "welfare_score": 88,
                "digital_score": 87
            }
        ],
        "best_practices": [
            {"region": "서울", "policy": "디지털 민원 서비스", "effect": "대기시간 90% 감소"},
            {"region": "제주", "policy": "탄소 중립 정책", "effect": "탄소배출 25% 감소"}
        ]
    }
    
    return jsonify({"comparison": comparison})

@app.route('/api/local-admin/local-tax-info', methods=['POST'])
def local_tax_info():
    data = request.json
    region = data.get('region', '제주')
    
    tax_info = {
        "region": region,
        "taxes": [
            {"name": "취득세", "rate": "1-3%", "target": "부동산·차량 취득"},
            {"name": "재산세", "rate": "0.1-0.4%", "target": "토지·건물"},
            {"name": "자동차세", "rate": "cc당 18-200원", "target": "자동차"},
            {"name": "주민세", "rate": "개인 1만원, 법인 5-50만원", "target": "주민·법인"},
            {"name": "지방소득세", "rate": "소득세의 10%", "target": "소득"}
        ],
        "payment_methods": ["위택스", "은행", "편의점", "카드"],
        "due_dates": {
            "재산세": "7월, 9월",
            "자동차세": "6월, 12월",
            "주민세": "8월"
        }
    }
    
    return jsonify({"tax_info": tax_info})

if __name__ == '__main__':
    logger.info("🚀 통합 자치행정 시스템 백엔드 시작 (포트 5014)")
    app.run(host='0.0.0.0', port=5014, debug=False)
