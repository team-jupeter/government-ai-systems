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
    "system_name": "지능형 국세 행정 자동화 시스템",
    "description": "AI 기반 세금 신고·납부·환급 통합 플랫폼",
    "taxpayers": 28500000,
    "annual_revenue": "382조 원",
    "automation_rate": "94.5%",
    "error_reduction": "97.2%",
    "processing_speed": "기존 대비 85% 향상",
    "annual_savings": "연간 1.2조 원"
}

TAX_TYPES = [
    {"id": "income", "name": "소득세", "icon": "💰", "annual_revenue": "98조 원"},
    {"id": "corporate", "name": "법인세", "icon": "🏢", "annual_revenue": "72조 원"},
    {"id": "vat", "name": "부가가치세", "icon": "🧾", "annual_revenue": "82조 원"},
    {"id": "inheritance", "name": "상속·증여세", "icon": "🎁", "annual_revenue": "15조 원"},
    {"id": "securities", "name": "증권거래세", "icon": "📈", "annual_revenue": "8조 원"},
    {"id": "comprehensive_real_estate", "name": "종합부동산세", "icon": "🏠", "annual_revenue": "6조 원"},
    {"id": "customs", "name": "관세", "icon": "🚢", "annual_revenue": "12조 원"},
    {"id": "education", "name": "교육세", "icon": "📚", "annual_revenue": "5조 원"}
]

TAX_CALENDAR = [
    {"month": 1, "events": ["부가세 확정신고(2기)", "면세사업자 사업장현황신고"]},
    {"month": 3, "events": ["법인세 신고"]},
    {"month": 4, "events": ["부가세 예정신고(1기)"]},
    {"month": 5, "events": ["종합소득세 신고"]},
    {"month": 7, "events": ["부가세 확정신고(1기)", "재산세 납부(1기)"]},
    {"month": 9, "events": ["재산세 납부(2기)"]},
    {"month": 10, "events": ["부가세 예정신고(2기)"]},
    {"month": 11, "events": ["종합부동산세 납부"]},
    {"month": 12, "events": ["연말정산 준비"]}
]

SCENARIOS = [
    {
        "icon": "🤖",
        "title": "AI 자동 세금 계산",
        "problem": "복잡한 세법으로 신고 오류 발생, 세무사 비용 부담",
        "solution": "AI가 소득·지출 데이터 분석하여 최적 절세 방안 포함 자동 계산",
        "savings": "신고 오류 97.2% 감소"
    },
    {
        "icon": "🔍",
        "title": "지능형 탈세 탐지",
        "problem": "수작업 세무조사 한계, 탈세 적발률 낮음",
        "solution": "AI가 빅데이터 분석으로 이상 거래 패턴 자동 탐지",
        "savings": "탈세 적발률 340% 향상"
    },
    {
        "icon": "💳",
        "title": "실시간 환급 시스템",
        "problem": "환급까지 평균 14일 소요, 서류 심사 지연",
        "solution": "AI가 환급 요건 실시간 검증, 즉시 환급 처리",
        "savings": "환급 처리 시간 92% 단축"
    },
    {
        "icon": "📊",
        "title": "맞춤형 절세 안내",
        "problem": "납세자가 공제 항목 누락, 세금 과다 납부",
        "solution": "AI가 개인별 데이터 분석, 적용 가능한 공제 항목 자동 안내",
        "savings": "평균 환급액 23% 증가"
    }
]

AGENTS = [
    {"id": "tax_calculator", "name": "🧮 세금 계산 Agent"},
    {"id": "deduction_finder", "name": "💡 공제 탐색 Agent"},
    {"id": "filing_assistant", "name": "📝 신고 도우미 Agent"},
    {"id": "refund_tracker", "name": "💳 환급 조회 Agent"},
    {"id": "audit_advisor", "name": "🔍 세무조사 상담 Agent"},
    {"id": "business_tax", "name": "🏢 사업자 세금 Agent"}
]

@app.route('/api/tax/info', methods=['GET'])
def get_info():
    return jsonify(SYSTEM_INFO)

@app.route('/api/tax/types', methods=['GET'])
def get_types():
    return jsonify({"types": TAX_TYPES})

@app.route('/api/tax/calendar', methods=['GET'])
def get_calendar():
    return jsonify({"calendar": TAX_CALENDAR})

@app.route('/api/tax/scenarios', methods=['GET'])
def get_scenarios():
    return jsonify({"scenarios": SCENARIOS})

@app.route('/api/tax/agents', methods=['GET'])
def get_agents():
    return jsonify({"agents": AGENTS})

@app.route('/api/tax/consultation', methods=['POST', 'OPTIONS'])
def consultation():
    if request.method == 'OPTIONS':
        return '', 204
    
    if not client:
        return jsonify({"response": "⚠️ API 키가 설정되지 않았습니다."}), 200
    
    try:
        data = request.json
        message = data.get('message', '')
        agent_type = data.get('agent_type', 'filing_assistant')
        
        prompts = {
            "tax_calculator": "당신은 세금 계산 AI입니다. 소득세, 부가세, 법인세 등 각종 세금을 정확하게 계산합니다.",
            "deduction_finder": "당신은 세금 공제 탐색 AI입니다. 납세자가 받을 수 있는 모든 공제 항목을 찾아 안내합니다.",
            "filing_assistant": "당신은 세금 신고 도우미 AI입니다. 신고 절차, 필요 서류, 기한을 안내합니다.",
            "refund_tracker": "당신은 환급 조회 AI입니다. 환급 진행 상황, 예상 환급액, 환급 일정을 안내합니다.",
            "audit_advisor": "당신은 세무조사 상담 AI입니다. 세무조사 대응 방법, 권리, 절차를 안내합니다.",
            "business_tax": "당신은 사업자 세금 AI입니다. 사업자등록, 부가세, 종합소득세 등 사업자 관련 세금을 안내합니다."
        }
        
        system_prompt = prompts.get(agent_type, prompts["filing_assistant"])
        system_prompt += "\n\n국세청 AI 서비스로서 정확한 세금 정보를 제공합니다. 복잡한 사안은 세무사 상담을 권고하세요."
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            system=system_prompt,
            messages=[{"role": "user", "content": message}]
        )
        
        return jsonify({"response": response.content[0].text})
        
    except Exception as e:
        return jsonify({"response": f"오류: {str(e)}"}), 500

@app.route('/api/tax/calculate-income-tax', methods=['POST'])
def calculate_income_tax():
    data = request.json
    annual_income = data.get('annual_income', 0)
    deductions = data.get('deductions', {})
    
    # 간단한 소득세 계산 (2024년 기준 세율)
    taxable_income = annual_income - sum(deductions.values())
    
    if taxable_income <= 14000000:
        tax = taxable_income * 0.06
    elif taxable_income <= 50000000:
        tax = 840000 + (taxable_income - 14000000) * 0.15
    elif taxable_income <= 88000000:
        tax = 6240000 + (taxable_income - 50000000) * 0.24
    elif taxable_income <= 150000000:
        tax = 15360000 + (taxable_income - 88000000) * 0.35
    elif taxable_income <= 300000000:
        tax = 37060000 + (taxable_income - 150000000) * 0.38
    elif taxable_income <= 500000000:
        tax = 94060000 + (taxable_income - 300000000) * 0.40
    elif taxable_income <= 1000000000:
        tax = 174060000 + (taxable_income - 500000000) * 0.42
    else:
        tax = 384060000 + (taxable_income - 1000000000) * 0.45
    
    local_tax = tax * 0.1  # 지방소득세 10%
    
    result = {
        "annual_income": annual_income,
        "total_deductions": sum(deductions.values()),
        "taxable_income": taxable_income,
        "income_tax": int(tax),
        "local_income_tax": int(local_tax),
        "total_tax": int(tax + local_tax),
        "effective_rate": round((tax + local_tax) / annual_income * 100, 2) if annual_income > 0 else 0,
        "deduction_details": deductions
    }
    
    return jsonify({"result": result})

@app.route('/api/tax/find-deductions', methods=['POST'])
def find_deductions():
    data = request.json
    profile = data.get('profile', {})
    
    available_deductions = [
        {"name": "근로소득공제", "amount": 15000000, "eligible": True, "description": "근로소득자 기본 공제"},
        {"name": "인적공제 (본인)", "amount": 1500000, "eligible": True, "description": "기본공제 150만원"},
        {"name": "인적공제 (배우자)", "amount": 1500000, "eligible": profile.get('married', False), "description": "배우자 공제"},
        {"name": "인적공제 (자녀)", "amount": 1500000 * profile.get('children', 0), "eligible": profile.get('children', 0) > 0, "description": "자녀 1인당 150만원"},
        {"name": "국민연금 공제", "amount": 4500000, "eligible": True, "description": "연금보험료 전액 공제"},
        {"name": "건강보험료 공제", "amount": 3200000, "eligible": True, "description": "건강보험료 전액 공제"},
        {"name": "주택자금공제", "amount": 3000000, "eligible": profile.get('housing_loan', False), "description": "주택담보대출 이자"},
        {"name": "교육비 공제", "amount": 2000000, "eligible": profile.get('children', 0) > 0, "description": "자녀 교육비"},
        {"name": "의료비 공제", "amount": 1500000, "eligible": True, "description": "총급여 3% 초과분"},
        {"name": "신용카드 공제", "amount": 2500000, "eligible": True, "description": "총급여 25% 초과 사용분"}
    ]
    
    eligible = [d for d in available_deductions if d['eligible']]
    total_deduction = sum(d['amount'] for d in eligible)
    
    return jsonify({
        "deductions": eligible,
        "total_available": total_deduction,
        "tax_savings_estimate": int(total_deduction * 0.15)  # 평균 세율 15% 가정
    })

@app.route('/api/tax/check-refund-status', methods=['POST'])
def check_refund_status():
    data = request.json
    tax_id = data.get('tax_id', '')
    
    status = {
        "tax_id": tax_id,
        "status": "환급 진행중",
        "stages": [
            {"stage": "신고 접수", "completed": True, "date": "2025-05-25"},
            {"stage": "자동 검증", "completed": True, "date": "2025-05-25"},
            {"stage": "AI 심사", "completed": True, "date": "2025-05-26"},
            {"stage": "환급 결정", "completed": True, "date": "2025-05-27"},
            {"stage": "환급금 지급", "completed": False, "expected": "2025-05-30"}
        ],
        "refund_amount": 1250000,
        "refund_account": "***-***-123456",
        "expected_date": "2025-05-30",
        "processing_time": "5일 (AI 자동 처리)"
    }
    
    return jsonify({"status": status})

@app.route('/api/tax/vat-calculate', methods=['POST'])
def vat_calculate():
    data = request.json
    sales = data.get('sales', 0)
    purchases = data.get('purchases', 0)
    
    output_vat = sales * 0.1
    input_vat = purchases * 0.1
    vat_payable = output_vat - input_vat
    
    result = {
        "sales": sales,
        "purchases": purchases,
        "output_vat": int(output_vat),
        "input_vat": int(input_vat),
        "vat_payable": int(vat_payable) if vat_payable > 0 else 0,
        "vat_refund": int(-vat_payable) if vat_payable < 0 else 0,
        "filing_deadline": "2025-01-25",
        "payment_deadline": "2025-01-25"
    }
    
    return jsonify({"result": result})

@app.route('/api/tax/business-registration', methods=['POST'])
def business_registration():
    data = request.json
    business_type = data.get('type', 'individual')
    
    requirements = {
        "individual": {
            "type": "개인사업자",
            "documents": [
                "사업자등록신청서",
                "신분증 사본",
                "임대차계약서",
                "사업허가증 (해당 시)"
            ],
            "processing_time": "즉시 (AI 자동 처리)",
            "fee": "무료",
            "tax_obligations": ["부가가치세", "종합소득세", "원천세 (직원 있는 경우)"]
        },
        "corporation": {
            "type": "법인사업자",
            "documents": [
                "법인설립신고서",
                "정관 사본",
                "주주명부",
                "임대차계약서",
                "법인등기부등본"
            ],
            "processing_time": "1-2일",
            "fee": "무료",
            "tax_obligations": ["부가가치세", "법인세", "원천세"]
        }
    }
    
    return jsonify({"requirements": requirements.get(business_type, requirements["individual"])})

if __name__ == '__main__':
    logger.info("🚀 지능형 국세 행정 시스템 백엔드 시작 (포트 5020)")
    app.run(host='0.0.0.0', port=5020, debug=False)
