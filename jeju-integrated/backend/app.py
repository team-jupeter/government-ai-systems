import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import anthropic
import hashlib
from datetime import datetime
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Anthropic API 클라이언트
client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

# 제주 통합 시스템 정보 (3계층 통합)
SYSTEM_INFO = {
    "system_name": "제주 통합 행정 시스템",
    "description": "도청-시청-읍면동 3계층 통합 플랫폼",
    "total_population": 670000,
    "total_ai_agents": 29,
    "automation_rate": "96.5%",
    "energy_savings": "98.5%",
    "layers": {
        "layer_3": {
            "name": "광역 (제주특별자치도청)",
            "agents": 11,
            "jurisdiction": "제주시 + 서귀포시"
        },
        "layer_2": {
            "name": "시군구 (제주시청)",
            "agents": 9,
            "jurisdiction": "19개 읍면동"
        },
        "layer_1": {
            "name": "읍면동 (행정복지센터)",
            "agents": 9,
            "jurisdiction": "19개 센터"
        }
    }
}

# 29개 AI 에이전트 통합
AI_AGENTS = {
    "layer_3": [
        {"id": "special_autonomy", "name": "🏛️ 특별자치 Agent", "layer": "도청", "description": "자치권한 관리"},
        {"id": "tourism_marketing", "name": "🌏 관광마케팅 Agent", "layer": "도청", "description": "글로벌 관광 브랜드"},
        {"id": "future_industry", "name": "🚀 미래산업 Agent", "layer": "도청", "description": "우주항공/수소/디지털"},
        {"id": "jobs_economy", "name": "💼 일자리경제 Agent", "layer": "도청", "description": "일자리 창출"},
        {"id": "health_welfare_regional", "name": "🏥 광역복지 Agent", "layer": "도청", "description": "광역 의료 체계"},
        {"id": "environment", "name": "🌿 환경보전 Agent", "layer": "도청", "description": "세계자연유산 관리"},
        {"id": "agriculture", "name": "🐄 농축산 Agent", "layer": "도청", "description": "도 단위 1차 산업"},
        {"id": "marine_fishery", "name": "🐟 해양수산 Agent", "layer": "도청", "description": "수산업 광역 관리"},
        {"id": "infrastructure", "name": "🏗️ 인프라건설 Agent", "layer": "도청", "description": "제2공항, 광역 교통"},
        {"id": "pdv_regional", "name": "🔐 광역PDV Agent", "layer": "도청", "description": "도 단위 데이터 관리"},
        {"id": "openhash_layer3", "name": "⛓️ 오픈해시(L3) Agent", "layer": "도청", "description": "계층 3 기록"}
    ],
    "layer_2": [
        {"id": "city_civil", "name": "📄 시민민원 Agent", "layer": "시청", "description": "시 전체 민원 통합"},
        {"id": "certificate", "name": "📋 증명발급 Agent", "layer": "시청", "description": "시청 증명서 발급"},
        {"id": "welfare_city", "name": "🏠 시복지 Agent", "layer": "시청", "description": "시 단위 복지"},
        {"id": "tax_city", "name": "💰 시세처리 Agent", "layer": "시청", "description": "재산세, 자동차세"},
        {"id": "citrus_fishery", "name": "🍊 감귤수산 Agent", "layer": "시청", "description": "감귤/수산 지원"},
        {"id": "tourism_city", "name": "🌴 관광진흥 Agent", "layer": "시청", "description": "관광객 응대"},
        {"id": "call_center", "name": "📞 120콜센터 Agent", "layer": "시청", "description": "24시간 상담"},
        {"id": "pdv_city", "name": "🔐 시PDV Agent", "layer": "시청", "description": "시민 데이터 관리"},
        {"id": "openhash_layer2", "name": "⛓️ 오픈해시(L2) Agent", "layer": "시청", "description": "계층 2 기록"}
    ],
    "layer_1": [
        {"id": "civil_affairs", "name": "📋 민원처리 Agent", "layer": "읍면동", "description": "주민등록, 증명서"},
        {"id": "welfare_local", "name": "🏠 복지지원 Agent", "layer": "읍면동", "description": "기초생활보장"},
        {"id": "tax_local", "name": "💰 지방세 Agent", "layer": "읍면동", "description": "세무 안내"},
        {"id": "health_local", "name": "🏥 보건의료 Agent", "layer": "읍면동", "description": "건강관리"},
        {"id": "senior_care", "name": "👴 경로당 Agent", "layer": "읍면동", "description": "노인 돌봄"},
        {"id": "resident_consultation", "name": "💬 주민상담 Agent", "layer": "읍면동", "description": "24시간 상담"},
        {"id": "community", "name": "🏘️ 마을공동체 Agent", "layer": "읍면동", "description": "주민자치"},
        {"id": "pdv_local", "name": "🔐 동PDV Agent", "layer": "읍면동", "description": "주민 데이터"},
        {"id": "openhash_layer1", "name": "⛓️ 오픈해시(L1) Agent", "layer": "읍면동", "description": "계층 1 기록"}
    ]
}

# 통합 서비스 (계층 간 연계)
INTEGRATED_SERVICES = [
    {
        "id": "citizen_petition_routing",
        "name": "민원 자동 배정",
        "description": "도민 민원을 AI가 자동으로 도청/시청/읍면동에 배정",
        "layers_involved": ["도청", "시청", "읍면동"],
        "processing_time": "1분"
    },
    {
        "id": "welfare_integration",
        "name": "복지 통합 심사",
        "description": "3계층 복지 정보를 통합하여 자격 자동 판단",
        "layers_involved": ["도청", "시청", "읍면동"],
        "processing_time": "2분"
    },
    {
        "id": "tax_collection",
        "name": "세금 통합 징수",
        "description": "지방세, 시세, 구세를 통합 관리",
        "layers_involved": ["도청", "시청", "읍면동"],
        "processing_time": "3분"
    },
    {
        "id": "tourism_dataflow",
        "name": "관광 데이터 연계",
        "description": "도청 마케팅 → 시청 안내 → 읍면동 민박 연계",
        "layers_involved": ["도청", "시청", "읍면동"],
        "processing_time": "실시간"
    },
    {
        "id": "emergency_response",
        "name": "재난 통합 대응",
        "description": "태풍, 지진 시 3계층 동시 알림 및 대피",
        "layers_involved": ["도청", "시청", "읍면동"],
        "processing_time": "즉시"
    }
]

def generate_hash(data):
    """SHA-256 해시 생성"""
    return hashlib.sha256(str(data).encode()).hexdigest()

def probabilistic_layer_selection(initial_hash):
    """확률적 계층 선택 (25% 확률로 상위 계층 전파)"""
    selected_layers = []
    current_hash = initial_hash
    
    layers = [
        {"name": "읍면동 (Layer 1)", "nodes": 43},
        {"name": "시군구 (Layer 2)", "nodes": 2},
        {"name": "광역 (Layer 3)", "nodes": 1},
        {"name": "중앙정부 (Layer 4)", "nodes": 1}
    ]
    
    for idx, layer in enumerate(layers):
        rehash = generate_hash(current_hash)
        probability = int(rehash[:8], 16) % 100
        
        if probability < 25:
            node_index = int(rehash[8:16], 16) % layer["nodes"]
            selected_layers.append({
                "layer": f"Layer {idx+1}",
                "layer_name": layer["name"],
                "node_id": f"layer{idx+1}_node_{node_index}",
                "probability": f"{probability}%"
            })
        
        current_hash = rehash
    
    return selected_layers

@app.route('/info', methods=['GET'])
def get_info():
    return jsonify(SYSTEM_INFO)

@app.route('/agents', methods=['GET'])
def get_agents():
    """29개 AI 에이전트 목록"""
    return jsonify({
        "total_agents": 29,
        "by_layer": {
            "layer_3": AI_AGENTS["layer_3"],
            "layer_2": AI_AGENTS["layer_2"],
            "layer_1": AI_AGENTS["layer_1"]
        }
    })

@app.route('/services', methods=['GET'])
def get_services():
    """통합 서비스 목록"""
    return jsonify({"services": INTEGRATED_SERVICES})

@app.route('/simulate/citizen-petition-routing', methods=['POST'])
def simulate_petition_routing():
    """민원 자동 배정 시뮬레이션"""
    steps = [
        {"step": 1, "layer": "시청", "action": "시청 통합창구 민원 접수", "time": 0.2},
        {"step": 2, "layer": "시청", "action": "AI 민원 분류 (주민등록 변경)", "time": 0.3},
        {"step": 3, "layer": "읍면동", "action": "관할 읍면동 자동 선택 (용담1동)", "time": 0.2},
        {"step": 4, "layer": "읍면동", "action": "용담1동 AI가 처리 시작", "time": 0.2},
        {"step": 5, "layer": "전체", "action": "오픈해시 3계층 분산 기록", "time": 0.1}
    ]
    
    tx_hash = generate_hash({"service": "petition_routing", "timestamp": datetime.now().isoformat()})
    layers = probabilistic_layer_selection(tx_hash)
    
    return jsonify({
        "service": "민원 자동 배정",
        "status": "completed",
        "flow": "시청 → 읍면동",
        "steps": steps,
        "transaction": {
            "hash_value": tx_hash,
            "layers": layers
        }
    })

@app.route('/simulate/welfare-integration', methods=['POST'])
def simulate_welfare_integration():
    """복지 통합 심사 시뮬레이션"""
    steps = [
        {"step": 1, "layer": "읍면동", "action": "주민이 읍면동에 복지 신청", "time": 0.3},
        {"step": 2, "layer": "읍면동", "action": "읍면동 AI가 1차 자격 심사", "time": 0.5},
        {"step": 3, "layer": "시청", "action": "시청 AI가 2차 통합 심사", "time": 0.7},
        {"step": 4, "layer": "도청", "action": "도청 AI가 최종 승인 및 예산 배정", "time": 0.4},
        {"step": 5, "layer": "전체", "action": "3계층 재무제표 동시 갱신", "time": 0.1}
    ]
    
    tx_hash = generate_hash({"service": "welfare_integration", "timestamp": datetime.now().isoformat()})
    layers = probabilistic_layer_selection(tx_hash)
    
    return jsonify({
        "service": "복지 통합 심사",
        "status": "completed",
        "flow": "읍면동 → 시청 → 도청",
        "steps": steps,
        "transaction": {
            "hash_value": tx_hash,
            "layers": layers
        }
    })

@app.route('/simulate/tax-collection', methods=['POST'])
def simulate_tax_collection():
    """세금 통합 징수 시뮬레이션"""
    steps = [
        {"step": 1, "layer": "도청", "action": "도청이 도세 부과 (취득세)", "time": 0.5},
        {"step": 2, "layer": "시청", "action": "시청이 시세 부과 (재산세)", "time": 0.8},
        {"step": 3, "layer": "읍면동", "action": "읍면동이 주민에게 통합 고지", "time": 0.5},
        {"step": 4, "layer": "전체", "action": "납부 시 3계층 재무제표 자동 분배", "time": 1.0},
        {"step": 5, "layer": "전체", "action": "오픈해시 분산 기록", "time": 0.2}
    ]
    
    tx_hash = generate_hash({"service": "tax_collection", "timestamp": datetime.now().isoformat()})
    layers = probabilistic_layer_selection(tx_hash)
    
    return jsonify({
        "service": "세금 통합 징수",
        "status": "completed",
        "flow": "도청 ↔ 시청 ↔ 읍면동",
        "steps": steps,
        "total_tax": 1500000,
        "distribution": {
            "provincial_tax": 500000,
            "city_tax": 700000,
            "district_tax": 300000
        },
        "transaction": {
            "hash_value": tx_hash,
            "layers": layers
        }
    })

@app.route('/simulate/tourism-dataflow', methods=['POST'])
def simulate_tourism_dataflow():
    """관광 데이터 연계 시뮬레이션 - AI 채팅 자동 열기"""
    return jsonify({
        "action": "open_ai_chat",
        "service": "관광 데이터 연계",
        "initial_message": "안녕하세요! 제주 통합 관광 AI입니다.\n\n도청의 글로벌 마케팅부터 시청의 관광 안내, 읍면동의 민박 예약까지 원스톱으로 도와드립니다. 무엇을 도와드릴까요?"
    })

@app.route('/simulate/emergency-response', methods=['POST'])
def simulate_emergency_response():
    """재난 통합 대응 시뮬레이션"""
    steps = [
        {"step": 1, "layer": "도청", "action": "태풍 경보 발령 (도청 기상 센터)", "time": 0.1},
        {"step": 2, "layer": "전체", "action": "3계층 동시 재난문자 발송", "time": 0.2},
        {"step": 3, "layer": "시청", "action": "시청이 대피소 개방 지시", "time": 0.3},
        {"step": 4, "layer": "읍면동", "action": "19개 읍면동이 주민 대피 안내", "time": 0.5},
        {"step": 5, "layer": "전체", "action": "실시간 상황 모니터링 (AI 분석)", "time": 0.0}
    ]
    
    tx_hash = generate_hash({"service": "emergency", "timestamp": datetime.now().isoformat()})
    layers = probabilistic_layer_selection(tx_hash)
    
    return jsonify({
        "service": "재난 통합 대응",
        "status": "completed",
        "emergency_type": "태풍 경보",
        "alert_sent": 670000,
        "shelters_opened": 43,
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
                "content": f"당신은 제주 통합 행정 시스템의 AI 상담원입니다. 도청, 시청, 읍면동의 모든 행정 서비스에 대해 안내할 수 있습니다.\n\n주민 질문: {user_message}"
            }]
        )
        
        return jsonify({
            "response": response.content[0].text
        })
    except Exception as e:
        logger.error(f"AI 상담 오류: {e}")
        return jsonify({
            "response": "죄송합니다. 일시적인 오류가 발생했습니다."
        }), 500

if __name__ == '__main__':
    logger.info("🚀 제주 통합 행정 시스템 백엔드 시작 (포트 5008)")
    app.run(host='0.0.0.0', port=5008, debug=False)
