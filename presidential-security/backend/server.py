from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic, os, json, hashlib, time
from datetime import datetime

app = Flask(__name__)
CORS(app)
client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

class OpenHashVerifier:
    def __init__(self):
        self.hash_chain = []
    def compute_hash(self, data): return hashlib.sha3_256(json.dumps(data, sort_keys=True, ensure_ascii=False).encode()).hexdigest()
    def add_to_chain(self, data):
        prev_hash = self.hash_chain[-1]['hash'] if self.hash_chain else "0" * 64
        entry = {"data": data, "hash": self.compute_hash({**data, "prev_hash": prev_hash}), "prev_hash": prev_hash, "timestamp": datetime.now().isoformat()}
        self.hash_chain.append(entry)
        return entry

openhash = OpenHashVerifier()

ORG_STRUCTURE = {
    "pss": {
        "name": "대통령경호처",
        "agents": {
            "chief": {"name": "경호처장", "role": "대통령 경호 총괄", "priority": 1},
            "deputy": {"name": "차장", "role": "경호 업무 지원", "priority": 1},
            "security_ops": {"name": "경호본부", "role": "근접 경호 및 경비", "priority": 1},
            "security_planning": {"name": "경비안전본부", "role": "시설 경비 및 안전", "priority": 1},
            "protection": {"name": "경호지원본부", "role": "경호 장비 및 지원", "priority": 1},
            "cyber_security": {"name": "사이버보안팀", "role": "사이버 위협 대응", "priority": 1},
            "intelligence": {"name": "정보분석팀", "role": "위협 정보 수집 분석", "priority": 1},
            "emergency": {"name": "비상대응팀", "role": "긴급 상황 대응", "priority": 1}
        }
    }
}

@app.route('/health', methods=['GET'])
def health(): return jsonify({"status": "ok", "service": "presidential-security-ai"}), 200

@app.route('/structure', methods=['GET'])
def structure(): return jsonify({"success": True, "structure": ORG_STRUCTURE}), 200

@app.route('/agents', methods=['GET'])
def agents():
    result = [{"id": f"pss.{k}", "department": "대통령경호처", **v, "status": "active"} for k, v in ORG_STRUCTURE["pss"]["agents"].items()]
    return jsonify({"success": True, "agents": result, "count": len(result)}), 200

@app.route('/agent/query', methods=['POST'])
def query():
    data = request.json
    try:
        response = client.messages.create(model="claude-sonnet-4-20250514", max_tokens=2000,
            system="당신은 대통령경호처 AI입니다. 경호, 보안, 위협 대응 관련 업무를 지원합니다.",
            messages=[{"role": "user", "content": data.get('query', '')}])
        entry = openhash.add_to_chain({"agent_id": data.get('agent_id'), "query": data.get('query', '')[:100]})
        return jsonify({"success": True, "response": response.content[0].text, "verification": {"hash": entry["hash"]}}), 200
    except Exception as e: return jsonify({"success": False, "error": str(e)}), 500

@app.route('/agencies', methods=['GET'])
def agencies(): return jsonify({"success": True, "agencies": {"police": {"name": "경찰청"}, "nis": {"name": "국가정보원"}}, "count": 2}), 200

@app.route('/collaboration', methods=['POST'])
def collab():
    entry = openhash.add_to_chain({"type": "collaboration", "data": request.json})
    return jsonify({"success": True, "collaboration_id": f"PSS-{int(time.time())}", "verification": {"hash": entry["hash"]}}), 200

@app.route('/hash-chain', methods=['GET'])
def chain(): return jsonify({"success": True, "chain": openhash.hash_chain[-10:], "total_entries": len(openhash.hash_chain)}), 200

@app.route('/verify', methods=['POST'])
def verify():
    data = request.json
    computed = openhash.compute_hash(data.get('data', {}))
    return jsonify({"success": True, "verified": computed == data.get('hash', ''), "computed_hash": computed}), 200

@app.route('/ai-consultation', methods=['POST'])
def consult():
    try:
        response = client.messages.create(model="claude-sonnet-4-20250514", max_tokens=2000,
            system="당신은 대통령경호처 AI 상담 시스템입니다.", messages=[{"role": "user", "content": request.json.get('query', '')}])
        entry = openhash.add_to_chain({"type": "consultation"})
        return jsonify({"success": True, "response": response.content[0].text, "verification": {"hash": entry["hash"]}}), 200
    except Exception as e: return jsonify({"success": False, "error": str(e)}), 500

@app.route('/stats', methods=['GET'])
def stats(): return jsonify({"success": True, "stats": {"total_ai_agents": 8, "connected_agencies": 2, "system_status": "operational"}}), 200

if __name__ == '__main__':
    print("🛡️ 대통령경호처 AI 시스템 (포트 5025)")
    app.run(host='0.0.0.0', port=5025, debug=False)
