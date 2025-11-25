import os
import sys
from flask import Flask, jsonify, request
from flask_cors import CORS
import anthropic
import hashlib
import random
from datetime import datetime
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Anthropic API 클라이언트
client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

# 오픈해시 계층 구조 (제주도청은 계층 3 - 광역)
OPENHASH_LAYERS = {
    "layer_4": {"name": "중앙정부 (행정안전부)", "nodes": 1, "probability": 0.25},
    "layer_3": {"name": "광역 (제주특별자치도)", "nodes": 17, "probability": 0.25},
    "layer_2": {"name": "시군구 (제주시/서귀포시)", "nodes": 2, "probability": 0.25},
    "layer_1": {"name": "읍면동", "nodes": 43, "probability": 0.25}
}

# 제주도청 시스템 정보
SYSTEM_INFO = {
    "system_name": "오픈해시 기반 제주특별자치도청 광역 행정 시스템",
    "level": "광역 (Layer 3)",
    "jurisdiction": "제주시 + 서귀포시 (2개 행정시)",
    "population": 670000,
    "ai_agents": 11,
    "automation_rate": "96.8%",
    "energy_savings": "98.5%",
    "openhash_layers": 4
}

# 11개 AI 에이전트
AI_AGENTS = [
    {
        "id": "special_autonomy_agent",
        "name": "🏛️ 특별자치 Agent",
        "description": "자치권한 관리, 4·3평화재단 지원, 특별자치 입법"
    },
    {
        "id": "tourism_marketing_agent",
        "name": "🌏 관광마케팅 Agent",
        "description": "글로벌 관광 브랜드, 마케팅 캠페인, 관광 빅데이터 분석"
    },
    {
        "id": "future_industry_agent",
        "name": "🚀 미래산업 Agent",
        "description": "우주항공산업, 수소경제, 디지털 전환 지원"
    },
    {
        "id": "jobs_economy_agent",
        "name": "💼 일자리경제 Agent",
        "description": "도 단위 일자리 창출, 창업 지원, 통상 진흥"
    },
    {
        "id": "health_welfare_agent",
        "name": "🏥 보건복지 Agent",
        "description": "광역 의료 체계, 복지 정책, 여성 권익"
    },
    {
        "id": "environment_agent",
        "name": "🌿 환경보전 Agent",
        "description": "세계자연유산 관리, 환경 모니터링, 청정 에너지"
    },
    {
        "id": "agriculture_agent",
        "name": "🐄 농축산 Agent",
        "description": "도 단위 농축산 정책, 친환경 농업, 6차 산업"
    },
    {
        "id": "marine_fishery_agent",
        "name": "🐟 해양수산 Agent",
        "description": "수산업 광역 관리, 어항 개발, 해양 레저"
    },
    {
        "id": "infrastructure_agent",
        "name": "🏗️ 인프라건설 Agent",
        "description": "도로/항만/공항 인프라, 제2공항, 광역 교통"
    },
    {
        "id": "pdv_agent",
        "name": "🔐 PDV관리 Agent",
        "description": "프라이빗 데이터 금고 관리"
    },
    {
        "id": "openhash_agent",
        "name": "⛓️ 오픈해시 Agent",
        "description": "계층 3(광역) 분산 해시 체인 기록"
    }
]

# 5개 서비스
SERVICES = [
    {
        "id": "regional_admin",
        "name": "광역 행정 통합관리",
        "category": "행정",
        "processing_time": "3분"
    },
    {
        "id": "tourism_campaign",
        "name": "관광마케팅 캠페인",
        "category": "관광",
        "processing_time": "5분"
    },
    {
        "id": "future_industry_support",
        "name": "미래산업 지원금",
        "category": "산업",
        "processing_time": "2분"
    },
    {
        "id": "environment_monitoring",
        "name": "환경보전 모니터링",
        "category": "환경",
        "processing_time": "실시간"
    },
    {
        "id": "infrastructure_management",
        "name": "인프라 건설 관리",
        "category": "건설",
        "processing_time": "10분"
    }
]

class FinancialStatement:
    """확장 재무제표 - 복식부기"""
    def __init__(self, owner_name, initial_assets=0, initial_liabilities=0):
        self.owner_name = owner_name
        self.assets = initial_assets
        self.liabilities = initial_liabilities
        self.equity = initial_assets - initial_liabilities
        self.transactions = []
    
    def record_transaction(self, description, debit_account, credit_account, amount):
        self.transactions.append({
            "timestamp": datetime.now().isoformat(),
            "description": description,
            "debit": debit_account,
            "credit": credit_account,
            "amount": amount
        })
        
        if debit_account == "assets":
            self.assets += amount
        elif credit_account == "assets":
            self.assets -= amount
        
        self.equity = self.assets - self.liabilities
    
    def to_dict(self):
        return {
            "owner_name": self.owner_name,
            "assets": self.assets,
            "liabilities": self.liabilities,
            "equity": self.equity,
            "transaction_count": len(self.transactions)
        }

def generate_hash(data):
    """SHA-256 해시 생성"""
    return hashlib.sha256(str(data).encode()).hexdigest()

def probabilistic_layer_selection(initial_hash):
    """확률적 계층 선택 (25% 확률로 상위 계층 전파)"""
    selected_layers = []
    current_hash = initial_hash
    
    for layer_name in ["layer_1", "layer_2", "layer_3", "layer_4"]:
        rehash = generate_hash(current_hash)
        probability = int(rehash[:8], 16) % 100
        
        if probability < 25:
            layer = OPENHASH_LAYERS[layer_name]
            node_index = int(rehash[8:16], 16) % layer["nodes"]
            selected_layers.append({
                "layer": layer_name,
                "layer_name": layer["name"],
                "node_id": f"{layer_name}_node_{node_index}",
                "probability": f"{probability}%"
            })
        
        current_hash = rehash
    
    return selected_layers

def get_pdv_data(citizen_id="67000012345"):
    """PDV 데이터 조회 시뮬레이션"""
    return {
        "citizen_id": citizen_id,
        "name": "홍길동",
        "address": "제주특별자치도 제주시 첨단로 213",
        "birth_date": "1985-03-15",
        "household_members": 4,
        "vehicle_owned": True,
        "property_owned": True,
        "business_registration": "관광민박업"
    }

@app.route('/info', methods=['GET'])
def get_info():
    return jsonify(SYSTEM_INFO)

@app.route('/services', methods=['GET'])
def get_services():
    return jsonify({"services": SERVICES})

@app.route('/agents', methods=['GET'])
def get_agents():
    return jsonify({"agents": AI_AGENTS})

@app.route('/simulate/regional-admin', methods=['POST'])
def simulate_regional_admin():
    """광역 행정 통합관리 시뮬레이션"""
    pdv_data = get_pdv_data()
    
    steps = [
        {"step": 1, "action": "PDV 데이터 조회 (제주시+서귀포시)", "time": 0.5},
        {"step": 2, "action": "AI 자동 분류 (시/도 업무)", "time": 1.0},
        {"step": 3, "action": "관할 시청 배정", "time": 0.8},
        {"step": 4, "action": "오픈해시 기록 (계층 3)", "time": 0.5},
        {"step": 5, "action": "통합 모니터링 대시보드 갱신", "time": 0.2}
    ]
    
    tx_hash = generate_hash({"service": "regional_admin", "timestamp": datetime.now().isoformat()})
    layers = probabilistic_layer_selection(tx_hash)
    
    return jsonify({
        "service": "광역 행정 통합관리",
        "status": "completed",
        "pdv_data": pdv_data,
        "steps": steps,
        "transaction": {
            "hash_value": tx_hash,
            "layers": layers
        }
    })

@app.route('/simulate/tourism-campaign', methods=['POST'])
def simulate_tourism_campaign():
    """관광마케팅 캠페인 시뮬레이션"""
    pdv_data = get_pdv_data()
    
    steps = [
        {"step": 1, "action": "관광 빅데이터 분석", "time": 1.5},
        {"step": 2, "action": "타겟 시장 선정 (중국/일본/동남아)", "time": 1.0},
        {"step": 3, "action": "AI 캠페인 콘텐츠 생성", "time": 1.5},
        {"step": 4, "action": "다국어 번역 (10개 언어)", "time": 0.8},
        {"step": 5, "action": "글로벌 플랫폼 자동 배포", "time": 0.2}
    ]
    
    tx_hash = generate_hash({"service": "tourism_campaign", "timestamp": datetime.now().isoformat()})
    layers = probabilistic_layer_selection(tx_hash)
    
    return jsonify({
        "service": "관광마케팅 캠페인",
        "status": "completed",
        "campaign_data": {
            "target_countries": ["중국", "일본", "동남아시아", "미국"],
            "budget": "50억원",
            "expected_visitors": "150만명 증가"
        },
        "steps": steps,
        "transaction": {
            "hash_value": tx_hash,
            "layers": layers
        }
    })

@app.route('/simulate/future-industry-support', methods=['POST'])
def simulate_future_industry():
    """미래산업 지원금 시뮬레이션"""
    pdv_data = get_pdv_data()
    
    # 재무제표
    company_statement = FinancialStatement("제주 우주항공 스타트업", initial_assets=500000000)
    gov_statement = FinancialStatement("제주특별자치도청", initial_assets=5000000000000)
    
    support_amount = 300000000  # 3억원
    
    company_statement.record_transaction(
        "미래산업 지원금 수령", "assets", "revenue", support_amount
    )
    gov_statement.record_transaction(
        "미래산업 지원금 지급", "expense", "assets", support_amount
    )
    
    steps = [
        {"step": 1, "action": "기업 PDV 데이터 조회", "time": 0.3},
        {"step": 2, "action": "AI 자격 심사 (우주항공/수소/디지털)", "time": 0.8},
        {"step": 3, "action": "지원금 자동 계산", "time": 0.5},
        {"step": 4, "action": "복식부기 재무제표 기록", "time": 0.3},
        {"step": 5, "action": "오픈해시 분산 기록", "time": 0.1}
    ]
    
    tx_hash = generate_hash({"service": "future_industry", "amount": support_amount})
    layers = probabilistic_layer_selection(tx_hash)
    
    return jsonify({
        "service": "미래산업 지원금",
        "status": "completed",
        "pdv_data": pdv_data,
        "support_amount": support_amount,
        "company_statement": company_statement.to_dict(),
        "government_statement": gov_statement.to_dict(),
        "steps": steps,
        "transaction": {
            "hash_value": tx_hash,
            "layers": layers
        }
    })

@app.route('/simulate/environment-monitoring', methods=['POST'])
def simulate_environment():
    """환경보전 모니터링 시뮬레이션 - AI 채팅 자동 열기"""
    return jsonify({
        "action": "open_ai_chat",
        "service": "환경보전 모니터링",
        "initial_message": "안녕하세요! 제주 세계자연유산 환경 모니터링 AI입니다. 한라산, 성산일출봉, 거문오름 등의 실시간 환경 데이터를 제공하고 있습니다. 무엇을 도와드릴까요?"
    })

@app.route('/simulate/infrastructure-management', methods=['POST'])
def simulate_infrastructure():
    """인프라 건설 관리 시뮬레이션"""
    pdv_data = get_pdv_data()
    
    steps = [
        {"step": 1, "action": "프로젝트 PDV 데이터 조회 (제2공항)", "time": 1.0},
        {"step": 2, "action": "AI 진척도 분석", "time": 2.0},
        {"step": 3, "action": "예산 집행 모니터링", "time": 2.5},
        {"step": 4, "action": "리스크 자동 탐지", "time": 2.0},
        {"step": 5, "action": "통합 보고서 생성", "time": 1.5},
        {"step": 6, "action": "오픈해시 분산 기록", "time": 1.0}
    ]
    
    tx_hash = generate_hash({"service": "infrastructure", "timestamp": datetime.now().isoformat()})
    layers = probabilistic_layer_selection(tx_hash)
    
    return jsonify({
        "service": "인프라 건설 관리",
        "status": "completed",
        "project_data": {
            "project_name": "제주 제2공항 건설",
            "budget": "4조 8천억원",
            "progress": "설계 단계 (15%)",
            "completion_date": "2030년 목표"
        },
        "steps": steps,
        "transaction": {
            "hash_value": tx_hash,
            "layers": layers
        }
    })

@app.route('/consultation', methods=['POST'])
def consultation():
    """AI 상담 (Claude API)"""
    try:
        data = request.json
        user_message = data.get('message', '')
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1000,
            messages=[{
                "role": "user",
                "content": f"당신은 제주특별자치도청의 AI 상담원입니다. 특별자치, 관광, 미래산업, 환경보전 등에 대해 친절하게 안내해주세요.\n\n시민 질문: {user_message}"
            }]
        )
        
        return jsonify({
            "response": response.content[0].text
        })
    except Exception as e:
        logger.error(f"AI 상담 오류: {e}")
        return jsonify({
            "response": "죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        }), 500

if __name__ == '__main__':
    logger.info("🚀 제주특별자치도청 백엔드 시작 (포트 5006)")
    app.run(host='0.0.0.0', port=5006, debug=False)
