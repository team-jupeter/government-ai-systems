from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os
import json
import hashlib
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

LAYER_STRUCTURE = {
    0: {"name": "국가데이터처 통합 관리 센터", "nodes": 3, "tps": 500,
        "locations": ["대전 정부청사", "서울 분소", "부산 분소"],
        "role": "전체 네트워크 거버넌스, 통계 기준 설정, 최종 승인"},
    1: {"name": "기관·단말 Edge 클라우드", "nodes": 5030000, "tps": 4024000,
        "components": {"중앙부처": 18, "지자체": 226, "병원": 3500, "학교": 24000, "개인단말": 5000000},
        "role": "데이터 수집, LPBFT 합의, Edge Storage"},
    2: {"name": "광역시도·이동통신 Edge", "nodes": 32, "tps": 4448,
        "role": "지역/통신사별 해시 집약, 1차 검증"},
    3: {"name": "국가 Core Engine", "nodes": 10, "tps": 1420,
        "role": "PBFT 합의, 국가통계 최종 검증, BLS 7/10 다중 서명"},
    4: {"name": "국가·글로벌 Archive", "nodes": "무제한", "tps": "-",
        "role": "장기 보존, CRYSTALS-Dilithium 암호화"}
}

MINISTRY_DATA = {
    "국세청": {"data": "종합소득세 신고 내역", "legal_basis": "사회보장급여법 제37조"},
    "보건복지부": {"data": "수급자 정보", "legal_basis": "국민기초생활보장법 제22조"},
    "고용노동부": {"data": "고용보험 가입 이력", "legal_basis": "고용보험법 제15조"},
    "국토교통부": {"data": "부동산 등기 정보", "legal_basis": "전자정부법 제44조"}
}

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "service": "national-data-registry"}), 200

@app.route('/layers', methods=['GET'])
def get_layers():
    return jsonify({"success": True, "layers": LAYER_STRUCTURE, "total_tps": 4238450}), 200

@app.route('/data-linkage', methods=['POST'])
def inter_ministry_data_linkage():
    data = request.json
    requesting = data.get('requesting_ministry', '보건복지부')
    target = data.get('target_ministry', '국세청')
    target_data = MINISTRY_DATA.get(target, {"data": "요청 데이터", "legal_basis": "전자정부법 제44조"})
    return jsonify({"success": True, "linkage_id": f"LINK-{random.randint(100000, 999999)}",
        "requesting_ministry": requesting, "target_ministry": target,
        "data_requested": target_data["data"], "legal_basis": target_data["legal_basis"],
        "total_verification_time_ms": 2300, "traditional_time_days": 14, "time_reduction": "99.998%",
        "shap_explanation": {"primary_factor": "법적 근거 명확성", "secondary_factor": "공익 목적 해당"}}), 200

@app.route('/ai-consultation', methods=['POST'])
def ai_consultation():
    data = request.json
    query = data.get('query', '')
    system_prompt = "당신은 국가데이터처 AI 상담 전문가입니다. 503만+ 노드, 424만 TPS, 5계층 구조를 설명하세요."
    try:
        response = client.messages.create(model="claude-sonnet-4-20250514", max_tokens=2000,
            system=system_prompt, messages=[{"role": "user", "content": query}])
        return jsonify({"success": True, "response": response.content[0].text}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    print("🏛️ 국가데이터처 백엔드 시작 (포트 5026)")
    app.run(host='0.0.0.0', port=5026, debug=False)
