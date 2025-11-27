from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

# 10대 우선 업무
TEN_PRIORITY_TASKS = {
    "drug_approval": {"name": "의약품 허가 심사", "annual_volume": 1527, "avg_days": 279, "agent": "DrugApprovalExaminer", "automation_rate": 94.2},
    "clinical_trial": {"name": "임상시험 승인 심사", "annual_volume": 1850, "avg_days": 84, "agent": "ClinicalTrialApprover", "automation_rate": 91.8},
    "food_permit": {"name": "식품 허가·신고", "annual_volume": 185000, "avg_days": 23, "agent": "FoodPermitProcessor", "automation_rate": 96.7},
    "import_inspection": {"name": "수입식품 검사", "annual_volume": 420000, "avg_days": 3, "agent": "ImportFoodInspector", "automation_rate": 98.2},
    "medical_device": {"name": "의료기기 허가", "annual_volume": 28000, "avg_days": 171, "agent": "MedicalDeviceApprover", "automation_rate": 89.5},
    "cosmetic_notify": {"name": "화장품 신고", "annual_volume": 92000, "avg_days": 7, "agent": "CosmeticNotifier", "automation_rate": 97.8},
    "safety_info": {"name": "안전성 정보 관리", "annual_volume": 58000, "avg_days": 14, "agent": "SafetyInfoManager", "automation_rate": 93.4},
    "adverse_monitor": {"name": "부작용 모니터링", "annual_volume": 145000, "avg_days": 7, "agent": "AdverseEventMonitor", "automation_rate": 95.6},
    "recall_manage": {"name": "리콜·회수 관리", "annual_volume": 2800, "avg_days": 21, "agent": "RecallManager", "automation_rate": 88.3},
    "civil_petition": {"name": "민원·질의응답", "annual_volume": 165000, "avg_days": 5, "agent": "CivilPetitionHandler", "automation_rate": 97.1}
}

# 조직 구조
ORGANIZATION = {
    "본부": ["대변인", "글로벌수출전략담당관", "규제과학정책추진단", "감사담당관", "위해사범중앙조사단"],
    "기획조정관": ["기획재정담당관", "혁신행정담당관", "규제개혁법무담당관", "국제협력담당관", "정보화담당관"],
    "소비자위해예방국": ["위해예방정책과", "위해정보과", "통합식품데이터기획과", "시험검사정책과"],
    "식품안전정책국": ["식품정책과", "식품안전관리과", "식품기준과", "건강기능식품정책과"],
    "의약품안전국": ["의약품정책과", "의약품품질과", "의약품관리과", "마약정책과"],
    "바이오생약국": ["바이오의약품정책과", "생물제제과", "첨단바이오제품과", "한약정책과"],
    "의료기기안전국": ["의료기기정책과", "의료기기심사과", "의료기기관리과"]
}

# 오픈해시 4계층 구조
OPENHASH_LAYERS = {
    "Layer4": {"name": "신약허가·리콜명령", "tps": 1200000, "trust_min": 97, "examples": ["신약 허가증", "긴급 리콜 명령"]},
    "Layer3": {"name": "의약품·의료기기 허가", "tps": 120000, "trust_min": 88, "examples": ["의약품 허가증", "의료기기 인증서"]},
    "Layer2": {"name": "식품·임상시험 허가", "tps": 12000, "trust_min": 73, "examples": ["식품 영업허가증", "임상시험 승인서"]},
    "Layer1": {"name": "화장품·일반신고", "tps": 1200, "trust_min": 58, "examples": ["화장품 신고증", "단순 변경 신고"]}
}

# AI Agent 진화 파라미터
AGENT_EVOLUTION = {
    "population_size": 250,
    "generations": 25,
    "fitness_weights": {"accuracy": 0.42, "efficiency": 0.27, "consistency": 0.18, "safety": 0.09, "learning": 0.04},
    "mutation_rates": {"fine": 0.04, "medium": 0.025, "bold": 0.008}
}

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "ok",
        "service": "openhash-mfds-automation",
        "version": "2.0",
        "timestamp": datetime.now().isoformat(),
        "features": ["10대업무자동화", "A2A프로토콜", "오픈해시검증", "진화Agent", "68%처리단축"]
    }), 200

@app.route('/info', methods=['GET'])
def info():
    return health_check()

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify({
        "success": True,
        "organization": "식품의약품안전처 (MFDS)",
        "total_annual_volume": 520000,
        "automation_target": "68% 처리시간 단축",
        "cost_saving": "1,247억원/년",
        "tasks": TEN_PRIORITY_TASKS,
        "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/organization', methods=['GET'])
def get_organization():
    return jsonify({"success": True, "organization": ORGANIZATION, "total_staff": 1200, "headquarters": "청주 오송", "regional_offices": 6}), 200

@app.route('/task/process', methods=['POST'])
def process_task():
    data = request.json
    task_id = data.get('task_id', 'drug_approval')
    document_type = data.get('document_type', '허가신청서')
    
    task = TEN_PRIORITY_TASKS.get(task_id, TEN_PRIORITY_TASKS["drug_approval"])
    
    # AI 처리 시뮬레이션
    ai_processing_seconds = round(random.uniform(0.5, 3.0), 2)
    original_days = task["avg_days"]
    ai_days = round(original_days * (1 - task["automation_rate"]/100) + random.uniform(0.5, 2), 1)
    
    return jsonify({
        "success": True,
        "task": task["name"],
        "agent": task["agent"],
        "processing": {
            "ai_time_seconds": ai_processing_seconds,
            "original_days": original_days,
            "ai_optimized_days": ai_days,
            "time_saved_percent": round((1 - ai_days/original_days) * 100, 1),
            "automation_rate": task["automation_rate"]
        },
        "result": {
            "status": random.choice(["승인", "조건부 승인", "보완 요청"]),
            "confidence": round(random.uniform(92, 99), 1),
            "similar_cases_found": random.randint(15, 150),
            "law_references": random.randint(3, 12)
        },
        "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/document/verify', methods=['POST'])
def verify_document():
    data = request.json
    doc_type = data.get('document_type', '의약품 허가증')
    
    # 오픈해시 검증 시뮬레이션
    layer = random.choice(["Layer1", "Layer2", "Layer3", "Layer4"])
    layer_info = OPENHASH_LAYERS[layer]
    
    trust_score = round(random.uniform(layer_info["trust_min"], 99.9), 1)
    
    return jsonify({
        "success": True,
        "document_type": doc_type,
        "verification": {
            "hash": f"0x{os.urandom(16).hex()}",
            "layer": layer,
            "layer_name": layer_info["name"],
            "tps_capacity": layer_info["tps"],
            "trust_score": trust_score,
            "trust_minimum": layer_info["trust_min"],
            "verification_time_ms": round(random.uniform(50, 180), 1),
            "tamper_detected": False,
            "signature_valid": True
        },
        "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/agent/interact', methods=['POST'])
def agent_interact():
    data = request.json
    external_agent = data.get('external_agent', '제약회사 허가신청 Agent')
    request_type = data.get('request_type', '신약 허가 신청')
    
    # A2A 프로토콜 시뮬레이션
    mfds_agent = random.choice(list(set([t["agent"] for t in TEN_PRIORITY_TASKS.values()])))
    
    return jsonify({
        "success": True,
        "interaction": {
            "external_agent": external_agent,
            "mfds_agent": mfds_agent,
            "request_type": request_type,
            "protocol": "A2A-MFDS-v1.0",
            "authentication": "ECDSA-P256 verified",
            "encryption": "TLS 1.3 + AES-256-GCM",
            "response_time_ms": round(random.uniform(100, 500), 1),
            "status": "processed",
            "next_steps": random.sample(["서류 보완 요청", "심사 진행 중", "전문가 검토 배정", "승인 준비", "추가 자료 요청"], 2)
        },
        "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/agent/evolution', methods=['GET'])
def get_evolution_status():
    agents = []
    for task_id, task in TEN_PRIORITY_TASKS.items():
        agents.append({
            "agent_name": task["agent"],
            "task": task["name"],
            "fitness_score": round(random.uniform(0.78, 0.96), 3),
            "generation": random.randint(15, 25),
            "accuracy": round(random.uniform(93, 99), 1),
            "efficiency": round(random.uniform(85, 98), 1)
        })
    
    return jsonify({
        "success": True,
        "evolution": {
            "population_size": AGENT_EVOLUTION["population_size"],
            "current_generation": random.randint(20, 25),
            "target_generations": AGENT_EVOLUTION["generations"],
            "fitness_weights": AGENT_EVOLUTION["fitness_weights"],
            "agents": agents
        },
        "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/openhash/layers', methods=['GET'])
def get_layers():
    return jsonify({"success": True, "layers": OPENHASH_LAYERS, "total_tps": 1333200}), 200

@app.route('/statistics', methods=['GET'])
def get_statistics():
    return jsonify({
        "success": True,
        "daily_stats": {
            "total_processed": random.randint(1800, 2500),
            "ai_automated": random.randint(1600, 2200),
            "human_reviewed": random.randint(150, 300),
            "pending": random.randint(50, 150)
        },
        "performance": {
            "avg_processing_reduction": "68%",
            "annual_cost_saving": "1,247억원",
            "document_verification_time": "0.18초",
            "forgery_detection_increase": "520%"
        },
        "agent_stats": {
            "active_agents": 10,
            "avg_fitness": round(random.uniform(0.85, 0.92), 3),
            "a2a_interactions_today": random.randint(500, 1200)
        },
        "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/ai-consultation', methods=['POST'])
def ai_consultation():
    data = request.json
    system_prompt = """당신은 식품의약품안전처(MFDS) AI 업무 자동화 시스템의 상담 AI입니다.

핵심 정보:
- 10대 우선 업무: 의약품허가, 임상시험승인, 식품허가, 수입식품검사, 의료기기허가, 화장품신고, 안전성정보, 부작용모니터링, 리콜관리, 민원처리
- 연간 처리량: 약 52만건
- 자동화 효과: 처리시간 68% 단축, 연간 1,247억원 절감
- 오픈해시 4계층: Layer1(화장품/일반) ~ Layer4(신약/리콜)
- 진화 Agent: 10개 특화 Agent가 업무별 최적화
- A2A 프로토콜: 외부 기관 Agent와 직접 통신 지원
- 문서 검증: 0.18초 내 위변조 탐지, 재식별 저항률 100%

사용자의 식의약 안전 관련 질문에 전문적으로 답변하세요."""

    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            system=system_prompt,
            messages=[{"role": "user", "content": data.get('query', '')}]
        )
        return jsonify({"response": response.content[0].text, "timestamp": datetime.now().isoformat()}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("🏥 식품의약품안전처 AI 업무 자동화 시스템 시작 - 포트 5006")
    app.run(host='0.0.0.0', port=5006, debug=False)
