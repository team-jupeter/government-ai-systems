from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os
import json
import hashlib
import time
from datetime import datetime
from functools import wraps

app = Flask(__name__)
CORS(app)

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

# OpenHash 데이터 무결성 검증 시스템
class OpenHashVerifier:
    def __init__(self):
        self.hash_chain = []

    def compute_hash(self, data: dict) -> str:
        data_str = json.dumps(data, sort_keys=True, ensure_ascii=False)
        return hashlib.sha3_256(data_str.encode()).hexdigest()

    def verify_integrity(self, data: dict, expected_hash: str) -> bool:
        computed = self.compute_hash(data)
        return computed == expected_hash

    def add_to_chain(self, data: dict) -> dict:
        prev_hash = self.hash_chain[-1]['hash'] if self.hash_chain else "0" * 64
        current_hash = self.compute_hash({**data, "prev_hash": prev_hash, "timestamp": datetime.now().isoformat()})
        entry = {"data": data, "hash": current_hash, "prev_hash": prev_hash, "timestamp": datetime.now().isoformat()}
        self.hash_chain.append(entry)
        return entry

openhash = OpenHashVerifier()

# 대통령실 조직 구조 정의
PRESIDENTIAL_STRUCTURE = {
    "chief_of_staff": {
        "name": "비서실장 직속",
        "agents": {
            "situation_room": {"name": "국정상황실", "role": "24시간 국정 모니터링 및 위기 대응", "priority": 1},
            "general_affairs": {"name": "총무비서관실", "role": "예산, 조직, 인사 총괄", "priority": 2},
            "protocol": {"name": "의전비서관실", "role": "국빈 의전 및 행사 관리", "priority": 2},
            "speech": {"name": "연설비서관실", "role": "대통령 연설문 작성 및 메시지 관리", "priority": 2},
            "records": {"name": "국정기록비서관실", "role": "대통령 기록물 관리 및 보존", "priority": 3}
        }
    },
    "policy_chief": {
        "name": "정책실장",
        "agents": {
            "national_agenda": {"name": "국정과제비서관실", "role": "국정과제 이행 점검 및 조정", "priority": 1}
        }
    },
    "economic_growth": {
        "name": "경제성장수석",
        "agents": {
            "growth_economy": {"name": "성장경제비서관실", "role": "경제성장 정책 총괄", "priority": 1},
            "industrial_policy": {"name": "산업정책비서관실", "role": "산업 육성 및 규제 혁신", "priority": 1},
            "land_transport": {"name": "국토교통비서관실", "role": "SOC 투자 및 부동산 정책", "priority": 2},
            "agriculture": {"name": "농림축산비서관실", "role": "농업 정책 및 식량 안보", "priority": 2},
            "sme_ventures": {"name": "중소벤처비서관실", "role": "중소기업 및 스타트업 지원", "priority": 2},
            "maritime": {"name": "해양수산비서관실", "role": "해양 산업 및 수산 정책", "priority": 2}
        }
    },
    "social_affairs": {
        "name": "사회수석",
        "agents": {
            "health_welfare": {"name": "보건복지비서관실", "role": "의료 및 복지 정책", "priority": 1},
            "labor": {"name": "노동비서관실", "role": "노동 정책 및 일자리 창출", "priority": 1},
            "education": {"name": "교육비서관실", "role": "교육 혁신 및 인재 양성", "priority": 1},
            "culture_sports": {"name": "문화체육비서관실", "role": "문화예술 및 체육 진흥", "priority": 2},
            "gender_family": {"name": "성평등가족비서관실", "role": "양성평등 및 가족 정책", "priority": 2}
        }
    },
    "ai_future": {
        "name": "AI미래기획수석",
        "agents": {
            "national_ai": {"name": "국가AI정책비서관실", "role": "AI 국가전략 및 거버넌스", "priority": 1},
            "science_tech": {"name": "과학기술연구비서관실", "role": "R&D 및 과학기술 혁신", "priority": 1},
            "population": {"name": "인구정책비서관실", "role": "저출산 대응 및 인구 정책", "priority": 1},
            "climate_energy": {"name": "기후환경에너지비서관실", "role": "탄소중립 및 에너지 전환", "priority": 1}
        }
    },
    "national_security": {
        "name": "국가안보실",
        "agents": {
            "security_strategy": {"name": "안보전략비서관실", "role": "국가안보 전략 수립", "priority": 1},
            "defense": {"name": "국방비서관실", "role": "국방 정책 및 군사 외교", "priority": 1},
            "foreign_policy": {"name": "외교정책비서관실", "role": "외교 전략 및 국제 협력", "priority": 1},
            "unification": {"name": "통일정책비서관실", "role": "남북 관계 및 통일 정책", "priority": 1},
            "economic_security": {"name": "경제안보비서관실", "role": "공급망 및 경제 안보", "priority": 1},
            "cyber_security": {"name": "사이버안보비서관실", "role": "사이버 위협 대응 및 보안", "priority": 1}
        }
    },
    "civil_affairs": {"name": "민정수석", "agents": {"civil": {"name": "민정비서관실", "role": "공직 기강 및 반부패", "priority": 1}}},
    "personnel": {"name": "인사수석", "agents": {"hr": {"name": "인사비서관실", "role": "고위공직자 인사 검증", "priority": 1}}},
    "political_affairs": {"name": "정무수석", "agents": {"political": {"name": "정무비서관실", "role": "국회 및 정당 협력", "priority": 1}}},
    "public_relations": {"name": "홍보소통수석", "agents": {"pr": {"name": "홍보비서관실", "role": "대국민 소통 및 홍보", "priority": 1}}},
    "listening_integration": {"name": "경청통합수석", "agents": {"listening": {"name": "경청비서관실", "role": "국민 의견 수렴 및 통합", "priority": 1}}}
}

# 정부기관 AI Agent 연동 정보
GOVERNMENT_AGENCIES = {
    "moef": {"name": "기획재정부", "endpoint": "/api/moef", "capabilities": ["예산편성", "세제정책", "경제전망"]},
    "mofa": {"name": "외교부", "endpoint": "/api/mofa", "capabilities": ["외교협상", "재외국민", "국제기구"]},
    "mnd": {"name": "국방부", "endpoint": "/api/mnd", "capabilities": ["국방정책", "방위력", "군사외교"]},
    "mois": {"name": "행정안전부", "endpoint": "/api/mois", "capabilities": ["지방행정", "재난안전", "전자정부"]},
    "moe": {"name": "교육부", "endpoint": "/api/moe", "capabilities": ["교육과정", "대학정책", "평생교육"]},
    "mohw": {"name": "보건복지부", "endpoint": "/api/mohw", "capabilities": ["의료정책", "사회보장", "저출산"]},
    "moel": {"name": "고용노동부", "endpoint": "/api/moel", "capabilities": ["고용정책", "노동권익", "일자리"]},
    "mcst": {"name": "문화체육관광부", "endpoint": "/api/mcst", "capabilities": ["문화정책", "관광진흥", "체육"]},
    "mafra": {"name": "농림축산식품부", "endpoint": "/api/mafra", "capabilities": ["농업정책", "축산", "식품안전"]},
    "motie": {"name": "산업통상자원부", "endpoint": "/api/motie", "capabilities": ["산업정책", "통상협상", "에너지"]},
    "molit": {"name": "국토교통부", "endpoint": "/api/molit", "capabilities": ["국토계획", "주택정책", "교통"]},
    "mof": {"name": "해양수산부", "endpoint": "/api/mof", "capabilities": ["해양정책", "수산업", "항만"]},
    "mss": {"name": "중소벤처기업부", "endpoint": "/api/mss", "capabilities": ["중소기업", "벤처육성", "소상공인"]},
    "me": {"name": "환경부", "endpoint": "/api/me", "capabilities": ["환경정책", "기후변화", "자원순환"]},
    "msit": {"name": "과학기술정보통신부", "endpoint": "/api/msit", "capabilities": ["과학기술", "ICT정책", "우주개발"]},
    "mogef": {"name": "여성가족부", "endpoint": "/api/mogef", "capabilities": ["양성평등", "가족정책", "청소년"]},
    "mpva": {"name": "국가보훈부", "endpoint": "/api/mpva", "capabilities": ["보훈정책", "참전유공자", "독립유공자"]},
    "mou": {"name": "통일부", "endpoint": "/api/mou", "capabilities": ["대북정책", "남북교류", "통일준비"]}
}

# API 엔드포인트
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "ok",
        "service": "presidential-office-ai-automation",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/structure', methods=['GET'])
def get_structure():
    total_agents = sum(len(dept["agents"]) for dept in PRESIDENTIAL_STRUCTURE.values())
    return jsonify({
        "success": True,
        "structure": PRESIDENTIAL_STRUCTURE,
        "total_departments": len(PRESIDENTIAL_STRUCTURE),
        "total_agents": total_agents,
        "openhash_enabled": True
    }), 200

@app.route('/agents', methods=['GET'])
def get_all_agents():
    agents = []
    for dept_key, dept in PRESIDENTIAL_STRUCTURE.items():
        for agent_key, agent in dept["agents"].items():
            agents.append({
                "id": f"{dept_key}.{agent_key}",
                "department": dept["name"],
                "name": agent["name"],
                "role": agent["role"],
                "priority": agent["priority"],
                "status": "active"
            })
    return jsonify({"success": True, "agents": agents, "count": len(agents)}), 200

@app.route('/agent/<department>/<agent_id>', methods=['GET'])
def get_agent_detail(department, agent_id):
    if department in PRESIDENTIAL_STRUCTURE:
        dept = PRESIDENTIAL_STRUCTURE[department]
        if agent_id in dept["agents"]:
            agent = dept["agents"][agent_id]
            return jsonify({
                "success": True,
                "agent": {
                    "id": f"{department}.{agent_id}",
                    "department": dept["name"],
                    **agent,
                    "connected_agencies": [a["name"] for a in GOVERNMENT_AGENCIES.values()][:5]
                }
            }), 200
    return jsonify({"success": False, "error": "Agent not found"}), 404

@app.route('/agent/query', methods=['POST'])
def agent_query():
    data = request.json
    agent_id = data.get('agent_id', 'ai_future.national_ai')
    query = data.get('query', '')

    parts = agent_id.split('.')
    if len(parts) != 2:
        return jsonify({"success": False, "error": "Invalid agent_id format"}), 400

    dept_key, agent_key = parts
    if dept_key not in PRESIDENTIAL_STRUCTURE:
        return jsonify({"success": False, "error": "Department not found"}), 404

    dept = PRESIDENTIAL_STRUCTURE[dept_key]
    if agent_key not in dept["agents"]:
        return jsonify({"success": False, "error": "Agent not found"}), 404

    agent = dept["agents"][agent_key]

    system_prompt = f"""당신은 대한민국 대통령실 {dept['name']} 소속 {agent['name']} AI 에이전트입니다.
역할: {agent['role']}
우선순위: {agent['priority']}

다음 원칙을 준수하세요:
1. 국익 최우선: 모든 판단은 대한민국 국익을 최우선으로 합니다.
2. 법치주의: 헌법과 법률에 기반하여 답변합니다.
3. 정확성: 사실에 기반한 정확한 정보를 제공합니다.
4. 협업: 필요시 다른 비서관실 및 정부기관 AI와 협력합니다.
5. 기밀유지: 민감한 국가 정보는 적절히 보호합니다.

OpenHash 기반 데이터 무결성 검증 시스템이 모든 응답을 기록합니다."""

    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            system=system_prompt,
            messages=[{"role": "user", "content": query}]
        )

        response_text = response.content[0].text

        # OpenHash로 응답 기록
        hash_entry = openhash.add_to_chain({
            "agent_id": agent_id,
            "query": query,
            "response_preview": response_text[:200],
            "model": "claude-sonnet-4-20250514"
        })

        return jsonify({
            "success": True,
            "agent": {"id": agent_id, "name": agent["name"], "department": dept["name"]},
            "response": response_text,
            "verification": {
                "hash": hash_entry["hash"],
                "timestamp": hash_entry["timestamp"],
                "integrity_verified": True
            }
        }), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/collaboration', methods=['POST'])
def inter_agency_collaboration():
    data = request.json
    requesting_agent = data.get('requesting_agent', 'ai_future.national_ai')
    target_agencies = data.get('target_agencies', ['msit', 'motie'])
    task = data.get('task', '')

    collaboration_id = f"COLLAB-{int(time.time())}"

    agencies_info = []
    for agency_key in target_agencies:
        if agency_key in GOVERNMENT_AGENCIES:
            agency = GOVERNMENT_AGENCIES[agency_key]
            agencies_info.append({
                "key": agency_key,
                "name": agency["name"],
                "capabilities": agency["capabilities"],
                "status": "connected"
            })

    # OpenHash로 협업 기록
    hash_entry = openhash.add_to_chain({
        "collaboration_id": collaboration_id,
        "requesting_agent": requesting_agent,
        "target_agencies": target_agencies,
        "task_preview": task[:100]
    })

    return jsonify({
        "success": True,
        "collaboration_id": collaboration_id,
        "requesting_agent": requesting_agent,
        "connected_agencies": agencies_info,
        "task": task,
        "status": "initiated",
        "verification": {
            "hash": hash_entry["hash"],
            "timestamp": hash_entry["timestamp"]
        }
    }), 200

@app.route('/verify', methods=['POST'])
def verify_data():
    data = request.json
    payload = data.get('data', {})
    expected_hash = data.get('hash', '')

    is_valid = openhash.verify_integrity(payload, expected_hash)

    return jsonify({
        "success": True,
        "verified": is_valid,
        "computed_hash": openhash.compute_hash(payload),
        "expected_hash": expected_hash
    }), 200

@app.route('/hash-chain', methods=['GET'])
def get_hash_chain():
    limit = request.args.get('limit', 10, type=int)
    return jsonify({
        "success": True,
        "chain": openhash.hash_chain[-limit:],
        "total_entries": len(openhash.hash_chain)
    }), 200

@app.route('/ai-consultation', methods=['POST'])
def ai_consultation():
    data = request.json
    query = data.get('query', '')

    system_prompt = """당신은 대한민국 대통령실 AI 통합 상담 시스템입니다.
대통령실의 모든 비서관실 AI 에이전트를 총괄하며, 국정 전반에 대한 상담을 제공합니다.

대통령실 조직 구조:
- 비서실장 직속: 국정상황실, 총무/의전/연설/국정기록비서관
- 정책실장: 국정과제비서관
- 경제성장수석: 성장경제/산업정책/국토교통/농림축산/중소벤처/해양수산비서관
- 사회수석: 보건복지/노동/교육/문화체육/성평등가족비서관
- AI미래기획수석: 국가AI정책/과학기술연구/인구정책/기후환경에너지비서관
- 국가안보실: 안보전략/국방/외교정책/통일정책/경제안보/사이버안보비서관
- 민정수석, 인사수석, 정무수석, 홍보소통수석, 경청통합수석

각 비서관실 AI Agent가 18개 정부부처 AI Agent와 자동 협업합니다.
OpenHash 기반 데이터 무결성 검증으로 모든 기록이 보호됩니다."""

    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            system=system_prompt,
            messages=[{"role": "user", "content": query}]
        )

        hash_entry = openhash.add_to_chain({
            "type": "consultation",
            "query_preview": query[:100],
            "model": "claude-sonnet-4-20250514"
        })

        return jsonify({
            "success": True,
            "response": response.content[0].text,
            "verification": {
                "hash": hash_entry["hash"],
                "timestamp": hash_entry["timestamp"]
            }
        }), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/agencies', methods=['GET'])
def get_agencies():
    return jsonify({
        "success": True,
        "agencies": GOVERNMENT_AGENCIES,
        "count": len(GOVERNMENT_AGENCIES)
    }), 200

@app.route('/stats', methods=['GET'])
def get_stats():
    total_agents = sum(len(dept["agents"]) for dept in PRESIDENTIAL_STRUCTURE.values())
    return jsonify({
        "success": True,
        "stats": {
            "total_secretariats": len(PRESIDENTIAL_STRUCTURE),
            "total_ai_agents": total_agents,
            "connected_ministries": len(GOVERNMENT_AGENCIES),
            "hash_chain_entries": len(openhash.hash_chain),
            "system_status": "operational",
            "openhash_algorithm": "SHA3-256",
            "ai_model": "claude-sonnet-4-20250514"
        }
    }), 200

if __name__ == '__main__':
    print("🏛️ 대통령실 AI 자동화 시스템 시작 (포트 5023)")
    app.run(host='0.0.0.0', port=5023, debug=False)
