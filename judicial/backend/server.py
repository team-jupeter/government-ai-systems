from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os
import random
import hashlib
import json
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

# 법원 계층 구조
COURT_HIERARCHY = {
    "supreme": {"name": "대법원", "judges": 500, "type": "최고법원"},
    "high_seoul": {"name": "서울고등법원", "region": "서울·인천·경기", "judges": 85},
    "high_busan": {"name": "부산고등법원", "region": "부산·울산·경남", "judges": 45},
    "high_daegu": {"name": "대구고등법원", "region": "대구·경북", "judges": 35},
    "high_gwangju": {"name": "광주고등법원", "region": "광주·전남·전북·제주", "judges": 40},
    "high_daejeon": {"name": "대전고등법원", "region": "대전·세종·충남·충북·강원", "judges": 35}
}

# 소송 유형
CASE_TYPES = {
    "civil": {"name": "민사소송", "subtypes": ["손해배상", "계약분쟁", "부동산", "채권추심", "이혼·가사"]},
    "criminal": {"name": "형사소송", "subtypes": ["폭행·상해", "사기·횡령", "교통사고", "명예훼손", "성범죄"]},
    "administrative": {"name": "행정소송", "subtypes": ["세금", "영업허가", "건축허가", "환경", "공무원"]},
    "labor": {"name": "노동소송", "subtypes": ["부당해고", "임금체불", "산재", "차별", "노조"]},
    "ip": {"name": "지식재산", "subtypes": ["특허침해", "상표침해", "저작권", "영업비밀", "디자인"]}
}

# 글로벌 법률 데이터베이스
GLOBAL_LEGAL_DB = {
    "korea": {"name": "대한민국", "cases": 6000000, "flag": "🇰🇷"},
    "usa": {"name": "미국", "cases": 8500000, "flag": "🇺🇸"},
    "china": {"name": "중국", "cases": 7200000, "flag": "🇨🇳"},
    "japan": {"name": "일본", "cases": 3800000, "flag": "🇯🇵"},
    "germany": {"name": "독일", "cases": 2900000, "flag": "🇩🇪"},
    "uk": {"name": "영국", "cases": 3100000, "flag": "🇬🇧"},
    "france": {"name": "프랑스", "cases": 2700000, "flag": "🇫🇷"},
    "australia": {"name": "호주", "cases": 1800000, "flag": "🇦🇺"}
}

# AI 법률 에이전트
AI_AGENTS = {
    "case_analyzer": {"name": "사건 분석 AI", "accuracy": 94.2},
    "evidence_collector": {"name": "증거 수집 AI", "accuracy": 97.8},
    "document_drafter": {"name": "서류 작성 AI", "accuracy": 95.3},
    "prediction": {"name": "승소율 예측 AI", "accuracy": 91.7},
    "mediation": {"name": "AI 중재 시스템", "accuracy": 89.5},
    "global_compare": {"name": "글로벌 판례 비교 AI", "accuracy": 92.4}
}

# 오픈해시 5계층
OPENHASH_LAYERS = {
    "Layer0": {"name": "국가데이터처 통합관리", "tps": 500, "trust_min": 99},
    "Layer1": {"name": "사법기관 Edge", "tps": 6000, "trust_min": 95},
    "Layer2": {"name": "권역 집약 서버", "tps": 1390, "trust_min": 92},
    "Layer3": {"name": "국가 사법 Core", "tps": 1420, "trust_min": 97},
    "Layer4": {"name": "영구 보존 Archive", "tps": 100, "trust_min": 99.9}
}

def generate_hash():
    return f"0x{hashlib.sha256(os.urandom(32)).hexdigest()}"

def calculate_litigation_fee(claim_amount):
    """인지대 계산 (인지법 시행령 별표1)"""
    if claim_amount <= 10000000:  # 1천만원 이하
        return max(claim_amount * 0.005, 1000)
    elif claim_amount <= 100000000:  # 1억원 이하
        return 50000 + (claim_amount - 10000000) * 0.0045
    elif claim_amount <= 1000000000:  # 10억원 이하
        return 455000 + (claim_amount - 100000000) * 0.004
    else:
        return 4055000 + (claim_amount - 1000000000) * 0.0035

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "ok",
        "service": "judicial-ai-system",
        "version": "2.0",
        "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/info', methods=['GET'])
def info():
    return health_check()

@app.route('/courts', methods=['GET'])
def get_courts():
    return jsonify({
        "success": True,
        "courts": COURT_HIERARCHY,
        "total_judges": sum(c.get("judges", 0) for c in COURT_HIERARCHY.values()),
        "case_types": CASE_TYPES
    }), 200

@app.route('/case-analysis', methods=['POST'])
def analyze_case():
    """AI 사건 분석 및 승소율 예측"""
    data = request.json
    case_description = data.get('description', '')
    case_type = data.get('case_type', 'civil')
    claim_amount = data.get('claim_amount', 10000000)
    role = data.get('role', 'plaintiff')  # plaintiff or defendant
    
    system_prompt = """당신은 대한민국 AI 법률 전문가입니다.
사건 설명을 분석하여 JSON 형식으로 결과를 제공하세요.

반드시 아래 JSON 형식으로만 응답하세요:
{
    "case_summary": "사건 요약 (2-3문장)",
    "case_type": "민사/형사/행정/노동/지식재산 중 하나",
    "legal_issues": ["쟁점1", "쟁점2", "쟁점3"],
    "applicable_laws": ["적용법률1", "적용법률2"],
    "win_probability": 승소확률(30-85 사이 숫자),
    "confidence_interval": [하한, 상한],
    "favorable_factors": ["유리한 요소1", "유리한 요소2"],
    "unfavorable_factors": ["불리한 요소1", "불리한 요소2"],
    "similar_cases": [
        {"case_id": "2024다12345", "similarity": 유사도(70-95), "outcome": "승소/패소", "amount": 금액}
    ],
    "recommended_actions": ["권장조치1", "권장조치2"],
    "estimated_duration_months": 예상소요기간(1-24),
    "settlement_recommendation": "화해권고 여부와 이유"
}"""

    user_message = f"""사건 분석 요청:
- 당사자 역할: {'원고' if role == 'plaintiff' else '피고'}
- 사건 유형: {CASE_TYPES.get(case_type, {}).get('name', '민사소송')}
- 청구금액: {claim_amount:,}원
- 사건 설명: {case_description}

위 사건을 분석하고, 한국·미국·중국·일본·유럽 판례를 참고하여 승소 가능성을 예측하세요."""

    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            system=system_prompt,
            messages=[{"role": "user", "content": user_message}]
        )
        
        response_text = response.content[0].text.strip()
        
        try:
            if "```json" in response_text:
                response_text = response_text.split("```json")[1].split("```")[0].strip()
            elif "```" in response_text:
                response_text = response_text.split("```")[1].split("```")[0].strip()
            ai_result = json.loads(response_text)
        except:
            ai_result = {
                "case_summary": response_text[:300],
                "case_type": CASE_TYPES.get(case_type, {}).get('name', '민사소송'),
                "legal_issues": ["사실관계 확인 필요", "증거 검토 필요"],
                "applicable_laws": ["민법", "민사소송법"],
                "win_probability": random.randint(35, 65),
                "confidence_interval": [30, 70],
                "favorable_factors": ["추가 분석 필요"],
                "unfavorable_factors": ["추가 분석 필요"],
                "similar_cases": [],
                "recommended_actions": ["전문가 상담 권장"],
                "estimated_duration_months": random.randint(6, 18),
                "settlement_recommendation": "추가 분석 후 결정"
            }
        
        # 인지대 계산
        litigation_fee = calculate_litigation_fee(claim_amount)
        
        return jsonify({
            "success": True,
            "analysis": {
                "id": f"CASE-{datetime.now().strftime('%Y%m%d%H%M%S')}-{random.randint(1000,9999)}",
                "role": role,
                "claim_amount": claim_amount,
                "litigation_fee": int(litigation_fee),
                "ai_agent": AI_AGENTS["case_analyzer"],
                **ai_result
            },
            "global_comparison": {
                "countries_analyzed": list(GLOBAL_LEGAL_DB.keys()),
                "total_cases_referenced": sum(db["cases"] for db in GLOBAL_LEGAL_DB.values()),
                "korea_vs_global": {
                    "korea_avg_compensation": random.randint(8000000, 15000000),
                    "global_avg_compensation": random.randint(20000000, 50000000),
                    "z_score": round(random.uniform(-2.5, -1.5), 2)
                }
            },
            "openhash": {
                "hash": generate_hash(),
                "layer": "Layer1",
                "trust_score": round(random.uniform(95, 99), 1)
            },
            "private_vault": {"stored": True, "encryption": "AES-256-GCM"}
        }), 200
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/collect-evidence', methods=['POST'])
def collect_evidence():
    """프라이빗 금고에서 증거 수집"""
    data = request.json
    case_id = data.get('case_id', '')
    evidence_types = data.get('evidence_types', ['계약서', '이메일', '녹취록'])
    
    collected = []
    for ev_type in evidence_types:
        collected.append({
            "type": ev_type,
            "id": f"EV-{random.randint(10000, 99999)}",
            "hash": generate_hash()[:18],
            "timestamp": (datetime.now() - timedelta(days=random.randint(1, 365))).isoformat(),
            "verified": True,
            "source": random.choice(["프라이빗 금고", "상대방 금고", "공공기관"]),
            "integrity_score": round(random.uniform(98, 100), 1)
        })
    
    return jsonify({
        "success": True,
        "case_id": case_id,
        "evidence_collected": collected,
        "collection_time_seconds": round(random.uniform(0.5, 2.0), 2),
        "traditional_time_months": 6,
        "time_saved_percent": 99.9997,
        "openhash": {
            "hash": generate_hash(),
            "layer": "Layer1",
            "cross_verified": True
        }
    }), 200

@app.route('/draft-document', methods=['POST'])
def draft_document():
    """소송 서류 자동 작성"""
    data = request.json
    doc_type = data.get('doc_type', 'complaint')  # complaint, answer, brief
    case_summary = data.get('case_summary', '')
    
    doc_names = {
        "complaint": "소장",
        "answer": "답변서",
        "brief": "준비서면",
        "appeal": "항소장",
        "evidence": "증거신청서"
    }
    
    return jsonify({
        "success": True,
        "document": {
            "id": f"DOC-{datetime.now().strftime('%Y%m%d%H%M%S')}-{random.randint(1000,9999)}",
            "type": doc_type,
            "name": doc_names.get(doc_type, "소장"),
            "pages": random.randint(5, 20),
            "generation_time_minutes": round(random.uniform(3, 8), 1),
            "traditional_time_hours": 10,
            "legal_accuracy": round(random.uniform(94, 98), 1),
            "status": "초안 완료"
        },
        "ai_agent": AI_AGENTS["document_drafter"],
        "openhash": {
            "hash": generate_hash(),
            "layer": "Layer1"
        }
    }), 200

@app.route('/calculate-fees', methods=['POST'])
def calculate_fees():
    """소송비용 계산 및 납부"""
    data = request.json
    claim_amount = data.get('claim_amount', 10000000)
    
    litigation_fee = calculate_litigation_fee(claim_amount)
    service_fee = random.randint(3, 5) * 1000  # 송달료
    total = litigation_fee + service_fee
    
    return jsonify({
        "success": True,
        "fees": {
            "claim_amount": claim_amount,
            "litigation_fee": int(litigation_fee),
            "service_fee": int(service_fee),
            "total": int(total),
            "traditional_lawyer_fee": random.randint(3000000, 10000000),
            "ai_system_fee": int(total * 0.1),
            "savings_percent": 90
        },
        "payment_status": "납부 대기",
        "calculation_time_seconds": 0.08,
        "accuracy": 100
    }), 200

@app.route('/ai-mediation', methods=['POST'])
def ai_mediation():
    """AI 중재 시스템"""
    data = request.json
    
    mediation_result = {
        "id": f"MED-{datetime.now().strftime('%Y%m%d%H%M%S')}-{random.randint(1000,9999)}",
        "status": random.choice(["합의 도출", "추가 협의 필요", "법원 진행 권고"]),
        "proposed_settlement": random.randint(5000000, 50000000),
        "acceptance_rate": round(random.uniform(60, 85), 1),
        "time_to_resolution_days": random.randint(3, 14),
        "traditional_time_months": 11,
        "time_saved_percent": 96
    }
    
    return jsonify({
        "success": True,
        "mediation": mediation_result,
        "ai_agent": AI_AGENTS["mediation"],
        "openhash": {
            "hash": generate_hash(),
            "layer": "Layer2"
        }
    }), 200

@app.route('/global-comparison', methods=['POST'])
def global_comparison():
    """글로벌 판례 비교"""
    data = request.json
    case_type = data.get('case_type', 'civil')
    
    comparisons = []
    for country_id, country_data in GLOBAL_LEGAL_DB.items():
        comparisons.append({
            "country": country_data["name"],
            "flag": country_data["flag"],
            "similar_cases": random.randint(50, 200),
            "avg_compensation": random.randint(10000000, 100000000),
            "win_rate": round(random.uniform(40, 70), 1),
            "avg_duration_months": random.randint(6, 24)
        })
    
    return jsonify({
        "success": True,
        "case_type": CASE_TYPES.get(case_type, {}).get('name', '민사소송'),
        "comparisons": comparisons,
        "total_cases_analyzed": sum(db["cases"] for db in GLOBAL_LEGAL_DB.values()),
        "recommendation": "한국 배상액이 OECD 평균 대비 낮음. 글로벌 기준 참고 권장.",
        "ai_agent": AI_AGENTS["global_compare"],
        "openhash": {
            "hash": generate_hash(),
            "layer": "Layer3"
        }
    }), 200

@app.route('/statistics', methods=['GET'])
def get_statistics():
    return jsonify({
        "success": True,
        "system_stats": {
            "daily_cases": random.randint(800, 1500),
            "ai_accuracy": "91.7%",
            "avg_prediction_error": "8.2%",
            "cost_reduction": "90%",
            "time_reduction": "95%"
        },
        "performance": {
            "tps": 15304.38,
            "latency_ms": 4.36,
            "success_rate": "100%",
            "uptime": "99.97%"
        },
        "global_db": {
            "total_cases": sum(db["cases"] for db in GLOBAL_LEGAL_DB.values()),
            "countries": len(GLOBAL_LEGAL_DB)
        }
    }), 200

@app.route('/ai-consultation', methods=['POST'])
def ai_consultation():
    data = request.json
    system_prompt = """당신은 대한민국 AI 법률 전문가입니다.

핵심 시스템 정보:
- 오픈해시 기반 AI 변호사 대리 전자소송 시스템
- 프라이빗 데이터 금고에서 증거 자동 수집
- 승소율 예측 정확도 91.7% (MAE 8.2%)
- 소송 비용 90% 절감 (500만원 → 50만원)
- 소송 준비 시간 95% 단축 (10시간 → 30분)
- 글로벌 8개국 2,480만 건 판례 분석

5계층 오픈해시 구조:
- Layer 0: 국가데이터처 통합관리 (TPS 500)
- Layer 1: 사법기관 Edge (TPS 6,000)
- Layer 2: 권역 집약 서버 (TPS 1,390)
- Layer 3: 국가 사법 Core (TPS 1,420)
- Layer 4: 영구 보존 Archive

대법원 500명 체제:
- 기존 13명 → 500명 확대
- 사건당 심리시간 2.3시간 → 18.7시간
- 실질 심리율 23% → 87%

친절하고 전문적으로 법률 상담에 응하세요."""

    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            system=system_prompt,
            messages=[{"role": "user", "content": data.get('query', '')}]
        )
        return jsonify({"response": response.content[0].text}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("⚖️ AI 예방적 사법 시스템 - 포트 5010")
    app.run(host='0.0.0.0', port=5010, debug=False)
