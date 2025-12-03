from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os
import json
import hashlib
import random
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "ok",
        "service": "openhash-local-admin",
        "version": "2.0",
        "timestamp": datetime.now().isoformat(),
        "features": ["도청AI", "시청AI", "읍면동AI", "PDV연동", "화폐연동", "실시간정책집행"]
    }), 200

@app.route('/info', methods=['GET'])
def info():
    return health_check()

JEJU_DO_DEPARTMENTS = {
    "특별자치행정국": {"자치행정과": ["자치행정", "인권", "민원"], "4·3지원과": ["4·3지원", "유적관리"], "회계과": ["경리", "계약"], "평생교육과": ["평생교육", "교육지원"]},
    "기획조정실": {"정책기획관": ["정책기획", "규제개혁"], "예산담당관": ["예산편성", "성과관리"], "인구정책담당관": ["인구정책", "청년정책"]},
    "경제산업국": {"경제정책과": ["경제정책", "기업지원"], "관광정책과": ["관광정책", "MICE산업"], "농축산식품국": ["친환경농업", "감귤산업"]},
    "복지건강국": {"복지정책과": ["복지정책", "기초생활보장"], "노인장애인과": ["노인복지", "돌봄서비스"], "건강정책과": ["건강증진", "감염병관리"]},
    "도시건설국": {"도시계획과": ["도시계획", "도시재생"], "건축지적과": ["건축허가", "주거복지"], "도로관리과": ["도로계획", "교통시설"]},
    "환경보전국": {"환경정책과": ["환경정책", "탄소중립"], "자원순환과": ["폐기물관리", "재활용"]}
}

JEJU_SI_DEPARTMENTS = {
    "행정지원국": {"총무과": ["인사", "행정지원"], "기획예산과": ["기획", "예산"], "세무과": ["지방세부과", "체납관리"]},
    "민원봉사과": {"종합민원실": ["민원접수", "민원처리"], "가족관계팀": ["출생신고", "혼인신고", "사망신고"], "지적팀": ["지적측량", "토지이동"]},
    "복지환경국": {"주민복지과": ["기초생활", "긴급복지"], "노인청소년과": ["노인복지", "아동보호"], "환경과": ["환경관리", "폐기물"]},
    "경제산업국": {"경제정책과": ["중소기업", "창업지원"], "관광과": ["관광진흥", "축제"], "농업정책과": ["영농지원", "귀농귀촌"]},
    "건설교통국": {"건축과": ["건축허가", "위반건축물"], "도로과": ["도로관리", "교통시설"], "주택과": ["주택정책", "임대주택"]}
}

JEJU_EUPMYEONDONG = {
    "제주시_읍면": ["한림읍", "애월읍", "구좌읍", "조천읍", "한경면", "추자면", "우도면"],
    "제주시_동": ["일도1동", "일도2동", "이도1동", "이도2동", "삼도1동", "삼도2동", "건입동", "화북동", "삼양동", "봉개동", "아라동", "오라동", "연동", "노형동", "외도동", "이호동", "도두동"],
    "서귀포시_읍면": ["대정읍", "남원읍", "성산읍", "안덕면", "표선면"],
    "서귀포시_동": ["송산동", "정방동", "중앙동", "천지동", "효돈동", "영천동", "동홍동", "서홍동", "대륜동", "대천동", "중문동", "예래동"]
}

CIVIL_SERVICES = {
    "증명서발급": {"items": ["주민등록등본", "주민등록초본", "가족관계증명서", "인감증명서"], "processing_time": 0.5, "traditional_days": 0.5},
    "신고업무": {"items": ["전입신고", "출생신고", "사망신고", "혼인신고"], "processing_time": 1.0, "traditional_days": 1},
    "인허가": {"items": ["건축허가", "영업허가", "옥외광고허가"], "processing_time": 3.0, "traditional_days": 14},
    "복지서비스": {"items": ["기초생활수급신청", "긴급복지지원", "장애인등록", "노인돌봄서비스"], "processing_time": 2.0, "traditional_days": 7},
    "세무업무": {"items": ["지방세납부", "세목별과세증명", "납세증명서"], "processing_time": 0.3, "traditional_days": 0.5}
}

@app.route('/do/departments', methods=['GET'])
def get_do_departments():
    return jsonify({"success": True, "level": "제주특별자치도청", "departments": JEJU_DO_DEPARTMENTS, "total_departments": sum(len(v) for v in JEJU_DO_DEPARTMENTS.values())}), 200

@app.route('/do/process', methods=['POST'])
def process_do_request():
    data = request.json
    department = data.get('department', '')
    task_type = data.get('task_type', '')
    citizen_pdv_id = data.get('citizen_pdv_id', '')
    processing_time = random.uniform(0.5, 2.0)
    return jsonify({
        "success": True, "level": "도청", "department": department, "task_type": task_type,
        "pdv_integration": {"identity_verified": True, "verification_hash": hashlib.sha256(f"{citizen_pdv_id}{datetime.now().isoformat()}".encode()).hexdigest()[:32]},
        "processing": {"ai_agent": f"{department}_AI", "processing_time_seconds": round(processing_time, 2), "traditional_time_days": 7, "efficiency_gain": f"{7*24*3600/processing_time:.0f}x"},
        "result": {"status": "승인", "document_hash": hashlib.sha256(f"{task_type}{datetime.now().isoformat()}".encode()).hexdigest()[:32]},
        "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/si/departments', methods=['GET'])
def get_si_departments():
    return jsonify({"success": True, "level": "제주시청", "departments": JEJU_SI_DEPARTMENTS, "total_departments": sum(len(v) for v in JEJU_SI_DEPARTMENTS.values())}), 200

@app.route('/si/process', methods=['POST'])
def process_si_request():
    data = request.json
    processing_time = random.uniform(0.3, 1.5)
    return jsonify({
        "success": True, "level": "시청", "department": data.get('department', ''),
        "processing": {"processing_time_seconds": round(processing_time, 2), "traditional_time_days": 5, "efficiency_gain": f"{5*24*3600/processing_time:.0f}x"},
        "result": {"status": "처리완료"}, "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/eupmyeondong/list', methods=['GET'])
def get_eupmyeondong_list():
    total = sum(len(v) for v in JEJU_EUPMYEONDONG.values())
    return jsonify({"success": True, "level": "읍면동 주민센터", "regions": JEJU_EUPMYEONDONG, "total_centers": total, "ai_agents_per_center": 5, "total_ai_agents": total * 5}), 200

@app.route('/eupmyeondong/services', methods=['GET'])
def get_civil_services():
    return jsonify({"success": True, "services": CIVIL_SERVICES, "total_service_types": len(CIVIL_SERVICES)}), 200

@app.route('/eupmyeondong/process', methods=['POST'])
def process_eupmyeondong_request():
    data = request.json
    center = data.get('center', '연동')
    service_type = data.get('service_type', '증명서발급')
    item = data.get('item', '주민등록등본')
    citizen_pdv_id = data.get('citizen_pdv_id', 'PDV_TEST')
    service_info = CIVIL_SERVICES.get(service_type, CIVIL_SERVICES["증명서발급"])
    processing_time = max(0.1, service_info["processing_time"] + random.uniform(-0.2, 0.3))
    fee_amount = random.choice([0, 400, 600, 1000])
    return jsonify({
        "success": True, "center": f"{center} 주민센터", "service_type": service_type, "item": item,
        "pdv_integration": {"pdv_id": citizen_pdv_id, "identity_verified": True, "retrieval_time_ms": 15},
        "currency_integration": {"fee_amount": fee_amount, "payment_status": "완료" if fee_amount > 0 else "무료"},
        "processing": {"ai_agent": f"{center}_민원AI", "processing_time_seconds": round(processing_time, 2), "traditional_time_days": service_info["traditional_days"], "time_saved": f"{service_info['traditional_days']}일 → {processing_time:.1f}초"},
        "result": {"status": "발급완료", "stored_in_pdv": True}, "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/policy/execute', methods=['POST'])
def execute_policy():
    data = request.json
    policy_type = data.get('policy_type', 'consumption_voucher')
    amount = data.get('amount', 300000)
    target_count = int(670000 * 0.75)
    processing_time = 0.8 + random.uniform(0, 0.3)
    return jsonify({
        "success": True,
        "policy": {"type": policy_type, "amount_per_person": amount},
        "execution": {"target_population": target_count, "successful_transfers": target_count, "total_amount_distributed": target_count * amount, "processing_time_seconds": round(processing_time, 3), "traditional_time_weeks": 4},
        "infrastructure": {"parallel_threads": 10000, "cloud_scaling": "auto"},
        "verification": {"audit_hash": hashlib.sha256(f"policy_{policy_type}_{datetime.now().isoformat()}".encode()).hexdigest()},
        "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/statistics', methods=['GET'])
def get_statistics():
    return jsonify({
        "success": True,
        "today": {"total_requests": random.randint(5000, 8000), "processed_by_ai": random.randint(4800, 7800), "average_processing_time_seconds": round(random.uniform(1.5, 3.0), 2), "citizen_satisfaction": round(random.uniform(95, 99), 1)},
        "savings": {"time_saved_hours": random.randint(40000, 60000), "cost_saved_krw": random.randint(500000000, 800000000), "paper_saved_sheets": random.randint(100000, 150000)},
        "ai_agents": {"do_level": 25, "si_level": 20, "eupmyeondong_level": 215, "total_active": 260},
        "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/ai-consultation', methods=['POST'])
def ai_consultation():
    data = request.json
    system_prompt = """당신은 오픈해시 기반 통합 자치 행정 시스템의 AI 상담 보조입니다.
시스템 특징: 도청+시청+읍면동 AI 통합, PDV 연동, Currency 연동, 처리시간 7일→7초
제주도 행정: 도청 6실국 25과, 시청 5국 20과, 43개 읍면동 주민센터
민원 서비스: 증명서발급(0.5초), 신고업무(1초), 인허가(3초), 복지(2초), 세무(0.3초)"""
    try:
        response = client.messages.create(model="claude-sonnet-4-20250514", max_tokens=2000, system=system_prompt, messages=[{"role": "user", "content": data.get('query', '')}])
        return jsonify({"response": response.content[0].text, "timestamp": datetime.now().isoformat()}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("🏛️ 통합 자치 행정 시스템 백엔드 시작 - 포트 5014")
    app.run(host='0.0.0.0', port=5014, debug=False)
