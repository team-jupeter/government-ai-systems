from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic, os, json, hashlib, time
from datetime import datetime

app = Flask(__name__)
CORS(app)
client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

class OpenHashVerifier:
    def __init__(self): self.hash_chain = []
    def compute_hash(self, data): return hashlib.sha3_256(json.dumps(data, sort_keys=True, ensure_ascii=False).encode()).hexdigest()
    def add_to_chain(self, data):
        prev_hash = self.hash_chain[-1]['hash'] if self.hash_chain else "0" * 64
        entry = {"data": data, "hash": self.compute_hash({**data, "prev_hash": prev_hash}), "prev_hash": prev_hash, "timestamp": datetime.now().isoformat()}
        self.hash_chain.append(entry)
        return entry

openhash = OpenHashVerifier()

ORG_STRUCTURE = {
    "bai": {
        "name": "감사원",
        "agents": {
            "chairman": {"name": "감사원장", "role": "감사원 총괄", "priority": 1},
            "secretary_general": {"name": "사무총장", "role": "사무 총괄", "priority": 1},
            "audit_bureau1": {"name": "제1사무차장", "role": "재정경제 분야 감사", "priority": 1},
            "audit_bureau2": {"name": "제2사무차장", "role": "행정사회 분야 감사", "priority": 1},
            "audit_bureau3": {"name": "제3사무차장", "role": "국방안보 분야 감사", "priority": 1},
            "inspection": {"name": "감찰관실", "role": "공직자 비위 감찰", "priority": 1},
            "audit_research": {"name": "감사연구원", "role": "감사 기법 연구", "priority": 2},
            "public_audit": {"name": "국민감사청구심사위", "role": "국민 감사 청구 심사", "priority": 2}
        }
    }
}

@app.route('/health', methods=['GET'])
def health(): return jsonify({"status": "ok", "service": "board-of-audit-ai"}), 200

@app.route('/structure', methods=['GET'])
def structure(): return jsonify({"success": True, "structure": ORG_STRUCTURE}), 200

@app.route('/agents', methods=['GET'])
def agents():
    result = [{"id": f"bai.{k}", "department": "감사원", **v, "status": "active"} for k, v in ORG_STRUCTURE["bai"]["agents"].items()]
    return jsonify({"success": True, "agents": result, "count": len(result)}), 200

@app.route('/agent/query', methods=['POST'])
def query():
    data = request.json
    try:
        response = client.messages.create(model="claude-sonnet-4-20250514", max_tokens=2000,
            system="당신은 대한민국 감사원 AI입니다. 회계 감사, 직무 감찰, 공공기관 감사 업무를 지원합니다. 정확하고 공정한 감사 원칙을 준수합니다.",
            messages=[{"role": "user", "content": data.get('query', '')}])
        entry = openhash.add_to_chain({"agent_id": data.get('agent_id'), "query": data.get('query', '')[:100]})
        return jsonify({"success": True, "response": response.content[0].text, "verification": {"hash": entry["hash"]}}), 200
    except Exception as e: return jsonify({"success": False, "error": str(e)}), 500

@app.route('/agencies', methods=['GET'])
def agencies(): return jsonify({"success": True, "agencies": {"moef": {"name": "기획재정부"}, "mois": {"name": "행정안전부"}, "mnd": {"name": "국방부"}}, "count": 3}), 200

@app.route('/collaboration', methods=['POST'])
def collab():
    entry = openhash.add_to_chain({"type": "collaboration", "data": request.json})
    return jsonify({"success": True, "collaboration_id": f"BAI-{int(time.time())}", "verification": {"hash": entry["hash"]}}), 200

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
            system="당신은 감사원 AI 상담 시스템입니다. 회계감사, 직무감찰, 공익신고 관련 상담을 제공합니다.",
            messages=[{"role": "user", "content": request.json.get('query', '')}])
        entry = openhash.add_to_chain({"type": "consultation"})
        return jsonify({"success": True, "response": response.content[0].text, "verification": {"hash": entry["hash"]}}), 200
    except Exception as e: return jsonify({"success": False, "error": str(e)}), 500

@app.route('/stats', methods=['GET'])
def stats(): return jsonify({"success": True, "stats": {"total_ai_agents": 8, "connected_agencies": 3, "system_status": "operational"}}), 200

if __name__ == '__main__':
    print("⚖️ 감사원 AI 시스템 (포트 5027)")
    app.run(host='0.0.0.0', port=5027, debug=False)
