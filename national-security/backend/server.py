from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os
import json
import hashlib
import time
from datetime import datetime

app = Flask(__name__)
CORS(app)

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

class OpenHashVerifier:
    def __init__(self):
        self.hash_chain = []

    def compute_hash(self, data: dict) -> str:
        data_str = json.dumps(data, sort_keys=True, ensure_ascii=False)
        return hashlib.sha3_256(data_str.encode()).hexdigest()

    def add_to_chain(self, data: dict) -> dict:
        prev_hash = self.hash_chain[-1]['hash'] if self.hash_chain else "0" * 64
        current_hash = self.compute_hash({**data, "prev_hash": prev_hash, "timestamp": datetime.now().isoformat()})
        entry = {"data": data, "hash": current_hash, "prev_hash": prev_hash, "timestamp": datetime.now().isoformat()}
        self.hash_chain.append(entry)
        return entry

openhash = OpenHashVerifier()

# 국가안보실 조직 구조
ORG_STRUCTURE = {
    "nsc_office": {
        "name": "국가안보실",
        "agents": {
            "nsc_secretary": {"name": "국가안보실장", "role": "국가안보 총괄 및 대통령 보좌", "priority": 1},
            "nsc_deputy": {"name": "국가안보실 차장", "role": "안보실 업무 총괄 지원", "priority": 1},
            "strategy_planning": {"name": "전략기획비서관", "role": "국가안보전략 기획 및 조정", "priority": 1},
            "security_policy": {"name": "안보정책비서관", "role": "안보정책 수립 및 조정", "priority": 1},
            "defense_policy": {"name": "국방정책비서관", "role": "국방 관련 정책 조정", "priority": 1},
            "foreign_policy": {"name": "외교정책비서관", "role": "외교안보 정책 조정", "priority": 1},
            "unification_policy": {"name": "통일정책비서관", "role": "남북관계 및 통일정책", "priority": 1},
            "cyber_security": {"name": "사이버안보비서관", "role": "사이버 위협 대응 및 보안", "priority": 1},
            "economic_security": {"name": "경제안보비서관", "role": "공급망 및 경제안보", "priority": 1},
            "crisis_management": {"name": "위기관리센터", "role": "24시간 위기상황 모니터링", "priority": 1}
        }
    }
}

CONNECTED_AGENCIES = {
    "mnd": {"name": "국방부", "capabilities": ["국방정책", "군사작전", "방위력"]},
    "mofa": {"name": "외교부", "capabilities": ["외교협상", "국제협력", "재외국민"]},
    "nis": {"name": "국가정보원", "capabilities": ["정보수집", "방첩", "사이버보안"]},
    "mou": {"name": "통일부", "capabilities": ["대북정책", "남북교류", "통일준비"]},
    "police": {"name": "경찰청", "capabilities": ["치안", "대테러", "경비"]},
    "coast_guard": {"name": "해양경찰청", "capabilities": ["해양안보", "불법조업", "해상구조"]}
}

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "service": "national-security-ai", "timestamp": datetime.now().isoformat()}), 200

@app.route('/structure', methods=['GET'])
def get_structure():
    return jsonify({"success": True, "structure": ORG_STRUCTURE, "total_agents": 10}), 200

@app.route('/agents', methods=['GET'])
def get_all_agents():
    agents = []
    for dept_key, dept in ORG_STRUCTURE.items():
        for agent_key, agent in dept["agents"].items():
            agents.append({"id": f"{dept_key}.{agent_key}", "department": dept["name"], **agent, "status": "active"})
    return jsonify({"success": True, "agents": agents, "count": len(agents)}), 200

@app.route('/agent/query', methods=['POST'])
def agent_query():
    data = request.json
    agent_id = data.get('agent_id', 'nsc_office.nsc_secretary')
    query = data.get('query', '')

    system_prompt = """당신은 대한민국 국가안보실 AI 에이전트입니다.
국가 안보 관련 정책 분석, 위기 상황 대응, 안보 전략 수립을 지원합니다.
모든 응답은 국익을 최우선으로 하며, 기밀 정보는 적절히 보호합니다."""

    try:
        response = client.messages.create(model="claude-sonnet-4-20250514", max_tokens=2000,
            system=system_prompt, messages=[{"role": "user", "content": query}])
        hash_entry = openhash.add_to_chain({"agent_id": agent_id, "query": query[:100], "model": "claude-sonnet-4-20250514"})
        return jsonify({"success": True, "response": response.content[0].text, "verification": {"hash": hash_entry["hash"], "timestamp": hash_entry["timestamp"]}}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/agencies', methods=['GET'])
def get_agencies():
    return jsonify({"success": True, "agencies": CONNECTED_AGENCIES, "count": len(CONNECTED_AGENCIES)}), 200

@app.route('/collaboration', methods=['POST'])
def collaboration():
    data = request.json
    hash_entry = openhash.add_to_chain({"type": "collaboration", "data": data})
    return jsonify({"success": True, "collaboration_id": f"NSC-{int(time.time())}", "verification": {"hash": hash_entry["hash"]}}), 200

@app.route('/hash-chain', methods=['GET'])
def get_hash_chain():
    limit = request.args.get('limit', 10, type=int)
    return jsonify({"success": True, "chain": openhash.hash_chain[-limit:], "total_entries": len(openhash.hash_chain)}), 200

@app.route('/verify', methods=['POST'])
def verify_data():
    data = request.json
    payload = data.get('data', {})
    expected_hash = data.get('hash', '')
    computed = openhash.compute_hash(payload)
    return jsonify({"success": True, "verified": computed == expected_hash, "computed_hash": computed}), 200

@app.route('/ai-consultation', methods=['POST'])
def ai_consultation():
    data = request.json
    query = data.get('query', '')
    system_prompt = "당신은 국가안보실 AI 통합 상담 시스템입니다. 국가 안보 전략, 위기 관리, 사이버 보안 등 안보 관련 상담을 제공합니다."
    try:
        response = client.messages.create(model="claude-sonnet-4-20250514", max_tokens=2000, system=system_prompt, messages=[{"role": "user", "content": query}])
        hash_entry = openhash.add_to_chain({"type": "consultation", "query": query[:100]})
        return jsonify({"success": True, "response": response.content[0].text, "verification": {"hash": hash_entry["hash"], "timestamp": hash_entry["timestamp"]}}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/stats', methods=['GET'])
def get_stats():
    return jsonify({"success": True, "stats": {"total_secretariats": 1, "total_ai_agents": 10, "connected_agencies": 6, "system_status": "operational"}}), 200

if __name__ == '__main__':
    print("🛡️ 국가안보실 AI 시스템 시작 (포트 5024)")
    app.run(host='0.0.0.0', port=5024, debug=False)
