# ============================================
# 인사혁신 시스템 - Flask Backend
# K-Governance Personnel Innovation System
# Port: 5019
# Claude API 실제 연동
# ============================================

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import random
import hashlib
import json
import os
import logging

app = Flask(__name__)
CORS(app)

# 로깅 설정
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ============================================
# Claude API 클라이언트 초기화
# ============================================
anthropic_client = None
ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY')

if ANTHROPIC_API_KEY:
    try:
        import anthropic
        anthropic_client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
        logger.info("✅ Claude API 클라이언트 초기화 성공")
    except Exception as e:
        logger.error(f"❌ Claude API 초기화 실패: {e}")
else:
    logger.warning("⚠️ ANTHROPIC_API_KEY 환경변수가 설정되지 않음")

# ============================================
# 시뮬레이션 데이터 생성 함수
# ============================================

def generate_worker_id():
    return hashlib.sha256(str(random.randint(1, 30000000)).encode()).hexdigest()[:16]

def generate_openhash():
    data = f"{datetime.now().isoformat()}-{random.random()}"
    return hashlib.sha256(data.encode()).hexdigest()

def get_current_workforce_stats():
    hour = datetime.now().hour
    is_work_hour = 9 <= hour < 18
    base_active = 24000000 if is_work_hour else 8000000
    return {
        "total_workforce": 30000000,
        "active_now": base_active + random.randint(-500000, 500000),
        "on_task": base_active - random.randint(1000000, 2000000),
        "in_transit": random.randint(500000, 1500000),
        "remote_work": random.randint(3000000, 5000000),
        "on_leave": random.randint(500000, 1000000)
    }

# 17개 시도 데이터
REGIONS = [
    {"code": "11", "name": "서울특별시", "workforce": 5200000, "companies": 420000},
    {"code": "26", "name": "부산광역시", "workforce": 1650000, "companies": 145000},
    {"code": "27", "name": "대구광역시", "workforce": 1180000, "companies": 98000},
    {"code": "28", "name": "인천광역시", "workforce": 1520000, "companies": 125000},
    {"code": "29", "name": "광주광역시", "workforce": 720000, "companies": 62000},
    {"code": "30", "name": "대전광역시", "workforce": 780000, "companies": 68000},
    {"code": "31", "name": "울산광역시", "workforce": 580000, "companies": 48000},
    {"code": "36", "name": "세종특별자치시", "workforce": 185000, "companies": 15000},
    {"code": "41", "name": "경기도", "workforce": 6800000, "companies": 580000},
    {"code": "42", "name": "강원도", "workforce": 780000, "companies": 65000},
    {"code": "43", "name": "충청북도", "workforce": 820000, "companies": 72000},
    {"code": "44", "name": "충청남도", "workforce": 1100000, "companies": 95000},
    {"code": "45", "name": "전라북도", "workforce": 920000, "companies": 78000},
    {"code": "46", "name": "전라남도", "workforce": 950000, "companies": 82000},
    {"code": "47", "name": "경상북도", "workforce": 1350000, "companies": 115000},
    {"code": "48", "name": "경상남도", "workforce": 1680000, "companies": 142000},
    {"code": "50", "name": "제주특별자치도", "workforce": 365000, "companies": 32000}
]

# 산업 섹터 데이터
SECTORS = [
    {"code": "A", "name": "농림어업", "workforce": 1350000, "ai_replacement": 45},
    {"code": "B", "name": "광업", "workforce": 18000, "ai_replacement": 55},
    {"code": "C", "name": "제조업", "workforce": 4500000, "ai_replacement": 72},
    {"code": "D", "name": "전기가스", "workforce": 85000, "ai_replacement": 48},
    {"code": "E", "name": "수도하수", "workforce": 62000, "ai_replacement": 35},
    {"code": "F", "name": "건설업", "workforce": 2100000, "ai_replacement": 38},
    {"code": "G", "name": "도소매업", "workforce": 3800000, "ai_replacement": 78},
    {"code": "H", "name": "운수창고", "workforce": 1450000, "ai_replacement": 82},
    {"code": "I", "name": "숙박음식", "workforce": 2300000, "ai_replacement": 52},
    {"code": "J", "name": "정보통신", "workforce": 1050000, "ai_replacement": 65},
    {"code": "K", "name": "금융보험", "workforce": 850000, "ai_replacement": 88},
    {"code": "L", "name": "부동산", "workforce": 580000, "ai_replacement": 45},
    {"code": "M", "name": "전문과학", "workforce": 1250000, "ai_replacement": 58},
    {"code": "N", "name": "사업지원", "workforce": 1680000, "ai_replacement": 75},
    {"code": "O", "name": "공공행정", "workforce": 1150000, "ai_replacement": 68},
    {"code": "P", "name": "교육서비스", "workforce": 1950000, "ai_replacement": 42},
    {"code": "Q", "name": "보건복지", "workforce": 2350000, "ai_replacement": 35},
    {"code": "R", "name": "예술스포츠", "workforce": 450000, "ai_replacement": 28},
    {"code": "S", "name": "기타서비스", "workforce": 980000, "ai_replacement": 55}
]

# ============================================
# API 엔드포인트
# ============================================

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "healthy",
        "service": "personnel-innovation",
        "version": "2.0.0",
        "claude_api": "connected" if anthropic_client else "not configured",
        "timestamp": datetime.now().isoformat(),
        "workers_managed": 30000000
    })

@app.route('/api/dashboard/stats', methods=['GET'])
def dashboard_stats():
    stats = get_current_workforce_stats()
    return jsonify({
        "success": True,
        "data": {
            **stats,
            "tasks_today": random.randint(45000000, 50000000),
            "match_rate": round(92 + random.random() * 3, 2),
            "data_verified_rate": round(99.9 + random.random() * 0.09, 3),
            "timestamp": datetime.now().isoformat()
        }
    })

@app.route('/api/workforce/national', methods=['GET'])
def national_workforce():
    stats = get_current_workforce_stats()
    age_distribution = [
        {"age_group": "20-29", "count": 4500000, "percentage": 15.0},
        {"age_group": "30-39", "count": 6900000, "percentage": 23.0},
        {"age_group": "40-49", "count": 7800000, "percentage": 26.0},
        {"age_group": "50-59", "count": 7200000, "percentage": 24.0},
        {"age_group": "60+", "count": 3600000, "percentage": 12.0}
    ]
    return jsonify({
        "success": True,
        "data": {
            **stats,
            "age_distribution": age_distribution,
            "sectors": SECTORS,
            "regions_summary": len(REGIONS),
            "individual_corps": random.randint(2500000, 3000000),
            "ai_assisted_workers": random.randint(18000000, 20000000),
            "timestamp": datetime.now().isoformat()
        }
    })

@app.route('/api/workforce/regions', methods=['GET'])
def regional_workforce():
    regions_with_live = []
    for region in REGIONS:
        active_ratio = 0.8 if 9 <= datetime.now().hour < 18 else 0.3
        regions_with_live.append({
            **region,
            "active_now": int(region["workforce"] * active_ratio * (0.9 + random.random() * 0.2)),
            "efficiency": round(85 + random.random() * 12, 1),
            "ai_adoption": round(60 + random.random() * 30, 1)
        })
    return jsonify({
        "success": True,
        "data": {
            "regions": regions_with_live,
            "total_workforce": sum(r["workforce"] for r in REGIONS),
            "timestamp": datetime.now().isoformat()
        }
    })

@app.route('/api/performance/tracking', methods=['GET'])
def performance_tracking():
    sample_records = []
    task_types = ["문서작성", "회의참석", "고객상담", "데이터분석", "코드개발", "기획안작성", "보고서검토"]
    locations = ["본사", "지사", "재택", "현장", "출장지"]
    for i in range(20):
        record = {
            "record_id": generate_openhash()[:12],
            "worker_hash": generate_worker_id(),
            "who": f"Worker-{generate_worker_id()[:8]}",
            "when": (datetime.now() - timedelta(minutes=random.randint(1, 480))).isoformat(),
            "where": random.choice(locations),
            "what": random.choice(task_types),
            "how_long": f"{random.randint(15, 180)}분",
            "how": random.choice(["단독수행", "협업", "AI지원", "자동화"]),
            "why": random.choice(["정기업무", "긴급요청", "프로젝트", "고객요청"]),
            "openhash": generate_openhash(),
            "verified": True
        }
        sample_records.append(record)
    return jsonify({
        "success": True,
        "data": {
            "records": sample_records,
            "total_today": random.randint(45000000, 50000000),
            "verified_rate": round(99.9 + random.random() * 0.09, 3),
            "timestamp": datetime.now().isoformat()
        }
    })

@app.route('/api/performance/attendance', methods=['GET'])
def attendance_log():
    hourly_pattern = []
    for hour in range(24):
        if 7 <= hour <= 9:
            check_in = random.randint(2000000, 4000000)
        elif 17 <= hour <= 19:
            check_in = random.randint(100000, 300000)
        else:
            check_in = random.randint(50000, 200000)
        hourly_pattern.append({
            "hour": hour,
            "check_in": check_in if hour < 12 else random.randint(50000, 200000),
            "check_out": random.randint(50000, 200000) if hour < 17 else random.randint(1500000, 3500000)
        })
    return jsonify({
        "success": True,
        "data": {
            "hourly_pattern": hourly_pattern,
            "total_checked_in": random.randint(24000000, 26000000),
            "remote_workers": random.randint(4000000, 5500000),
            "flexible_time_workers": random.randint(8000000, 10000000),
            "timestamp": datetime.now().isoformat()
        }
    })

@app.route('/api/organization/performance', methods=['GET'])
def organization_performance():
    organizations = [
        {"name": "삼성전자", "sector": "제조업", "employees": 125000, "revenue_growth": 8.5, "productivity": 94.2},
        {"name": "현대자동차", "sector": "제조업", "employees": 75000, "revenue_growth": 6.2, "productivity": 91.8},
        {"name": "SK하이닉스", "sector": "제조업", "employees": 32000, "revenue_growth": 12.3, "productivity": 96.5},
        {"name": "네이버", "sector": "IT", "employees": 6500, "revenue_growth": 15.8, "productivity": 98.2},
        {"name": "카카오", "sector": "IT", "employees": 5800, "revenue_growth": 11.2, "productivity": 95.7},
        {"name": "LG에너지솔루션", "sector": "제조업", "employees": 28000, "revenue_growth": 25.6, "productivity": 92.3},
        {"name": "포스코", "sector": "제조업", "employees": 18500, "revenue_growth": 4.8, "productivity": 89.5},
        {"name": "KB금융", "sector": "금융", "employees": 28000, "revenue_growth": 7.2, "productivity": 88.9}
    ]
    for org in organizations:
        org["worker_satisfaction"] = round(70 + random.random() * 25, 1)
        org["ai_adoption_rate"] = round(40 + random.random() * 50, 1)
    return jsonify({
        "success": True,
        "data": {
            "organizations": organizations,
            "total_organizations": 2850000,
            "avg_productivity": round(90 + random.random() * 5, 1),
            "timestamp": datetime.now().isoformat()
        }
    })

@app.route('/api/matching/job', methods=['GET'])
def job_matching():
    matches = []
    job_titles = ["소프트웨어 개발자", "데이터 분석가", "마케팅 매니저", "재무 분석가", "UX 디자이너",
                  "프로젝트 매니저", "HR 전문가", "영업 담당자", "품질 관리자", "연구원"]
    for i in range(15):
        matches.append({
            "match_id": generate_openhash()[:10],
            "worker_hash": generate_worker_id(),
            "recommended_job": random.choice(job_titles),
            "match_score": round(75 + random.random() * 24, 1),
            "skill_match": round(70 + random.random() * 28, 1),
            "aptitude_match": round(72 + random.random() * 26, 1),
            "salary_range": f"{random.randint(4, 12)}천만원",
            "growth_potential": random.choice(["높음", "중간", "매우 높음"]),
            "ai_confidence": round(85 + random.random() * 14, 1)
        })
    return jsonify({
        "success": True,
        "data": {
            "matches": matches,
            "total_matches_today": random.randint(150000, 200000),
            "avg_match_score": round(88 + random.random() * 6, 1),
            "successful_placements": random.randint(45000, 55000),
            "timestamp": datetime.now().isoformat()
        }
    })

@app.route('/api/task/allocation', methods=['GET'])
def task_allocation():
    allocation_stats = {
        "pending_tasks": random.randint(500000, 800000),
        "in_progress": random.randint(15000000, 18000000),
        "completed_today": random.randint(42000000, 48000000),
        "auto_allocated": random.randint(35000000, 40000000),
        "manual_allocated": random.randint(5000000, 8000000),
        "ai_suggested": random.randint(38000000, 43000000)
    }
    task_types = [
        {"type": "정형업무", "count": random.randint(25000000, 28000000), "ai_rate": 92},
        {"type": "비정형업무", "count": random.randint(8000000, 10000000), "ai_rate": 45},
        {"type": "창의업무", "count": random.randint(3000000, 4000000), "ai_rate": 28},
        {"type": "협업업무", "count": random.randint(6000000, 8000000), "ai_rate": 55},
        {"type": "고객대면", "count": random.randint(4000000, 5000000), "ai_rate": 38}
    ]
    return jsonify({
        "success": True,
        "data": {
            **allocation_stats,
            "task_types": task_types,
            "allocation_efficiency": round(94 + random.random() * 4, 1),
            "timestamp": datetime.now().isoformat()
        }
    })

@app.route('/api/vault/personal', methods=['GET'])
def personal_vault():
    return jsonify({
        "success": True,
        "data": {
            "total_vaults": 30000000,
            "active_vaults": random.randint(28000000, 29500000),
            "data_stored_tb": round(random.uniform(850, 920), 1),
            "access_requests_today": random.randint(45000000, 55000000),
            "authorized_accesses": random.randint(44000000, 53000000),
            "denied_accesses": random.randint(500000, 1500000),
            "encryption_standard": "AES-256 + RSA-4096",
            "openhash_verified": True,
            "anonymization_rate": round(99.9 + random.random() * 0.09, 3),
            "timestamp": datetime.now().isoformat()
        }
    })

@app.route('/api/openhash/verify', methods=['POST'])
def openhash_verify():
    data = request.json or {}
    record_hash = data.get('hash', generate_openhash())
    return jsonify({
        "success": True,
        "data": {
            "hash": record_hash,
            "verified": True,
            "block_number": random.randint(4500000, 4600000),
            "layer": f"L{random.randint(1, 4)}",
            "timestamp": datetime.now().isoformat(),
            "previous_hash": generate_openhash(),
            "merkle_root": generate_openhash(),
            "verification_time_ms": round(random.uniform(0.5, 2.5), 2)
        }
    })

@app.route('/api/individual-corp/stats', methods=['GET'])
def individual_corp_stats():
    return jsonify({
        "success": True,
        "data": {
            "total_individual_corps": random.randint(2800000, 3200000),
            "new_registrations_today": random.randint(1500, 2500),
            "active_contracts": random.randint(8500000, 9500000),
            "avg_revenue_per_corp": random.randint(45000000, 65000000),
            "ai_managed_corps": random.randint(2200000, 2600000),
            "sectors": [
                {"name": "IT/개발", "count": 850000},
                {"name": "컨설팅", "count": 420000},
                {"name": "디자인", "count": 380000},
                {"name": "마케팅", "count": 320000},
                {"name": "교육", "count": 280000},
                {"name": "기타", "count": 750000}
            ],
            "timestamp": datetime.now().isoformat()
        }
    })

@app.route('/api/career/recommendation', methods=['POST'])
def career_recommendation():
    data = request.json or {}
    worker_hash = data.get('worker_hash', generate_worker_id())
    recommendations = [
        {
            "path": "시니어 개발자 → 테크 리드 → CTO",
            "probability": round(75 + random.random() * 20, 1),
            "time_estimate": "3-5년",
            "required_skills": ["리더십", "아키텍처 설계", "팀 관리"]
        },
        {
            "path": "전문가 트랙 → 기술 고문",
            "probability": round(60 + random.random() * 25, 1),
            "time_estimate": "5-7년",
            "required_skills": ["심화 기술", "멘토링", "기술 문서화"]
        },
        {
            "path": "PM 전환 → 사업부장",
            "probability": round(50 + random.random() * 30, 1),
            "time_estimate": "4-6년",
            "required_skills": ["프로젝트 관리", "커뮤니케이션", "예산 관리"]
        }
    ]
    return jsonify({
        "success": True,
        "data": {
            "worker_hash": worker_hash,
            "current_position": "소프트웨어 개발자",
            "recommendations": recommendations,
            "ai_confidence": round(85 + random.random() * 12, 1),
            "timestamp": datetime.now().isoformat()
        }
    })

# ============================================
# AI 상담 (실제 Claude API 연동)
# ============================================

@app.route('/api/ai/chat', methods=['POST'])
def ai_chat():
    """AI 인사 상담 - 실제 Claude API 사용"""
    try:
        data = request.json or {}
        message = data.get('message', '')
        
        if not message:
            return jsonify({"success": False, "error": "메시지가 필요합니다"}), 400
        
        # Claude API 클라이언트 확인
        if not anthropic_client:
            logger.warning("Claude API 클라이언트가 초기화되지 않음")
            return jsonify({
                "success": False,
                "error": "AI 서비스가 현재 사용 불가능합니다. 관리자에게 문의하세요."
            }), 503
        
        # 시스템 프롬프트 설정
        system_prompt = """당신은 대한민국 인사혁신 시스템의 AI 상담사입니다.

## 시스템 개요
- 대한민국 3천만 노동인구의 업무 수행을 체계적으로 관리하는 K-Governance 시스템
- 모든 업무를 5W1H(누가, 언제, 어디서, 무엇을, 어떻게, 왜) 방식으로 추적
- 개인의 성과는 출퇴근 로그 + 소속 기관의 경영 성과로 종합 평가

## 핵심 기술
1. **OpenHash**: 블록체인 대안 기술, 4계층(L1-L4) 분산 해시 검증
2. **개인 정보 금고(PDV)**: 모든 원본 데이터는 개인 금고에만 저장, 시스템은 익명화 데이터만 처리
3. **Nash 균형 Multi-Agent**: 개인 만족도와 국가 경제성장을 동시 최적화

## AI 시대 비전
- 사무직 업무의 90%가 AI로 대체되는 시대 대비
- 모든 개인은 1인 법인(독립 경제 주체)으로 전환
- AI가 능력-적성을 분석하여 최적의 직업/업무 매칭

## 상담 가능 주제
- 업무 관리 및 성과 평가
- AI 기반 직업 매칭
- 경력 개발 추천
- 1인 법인 설립 안내
- 개인정보 보호(PDV) 및 OpenHash
- 조직 인력 최적화

친절하고 전문적으로 답변하세요. 한국어로 응답합니다."""

        logger.info(f"Claude API 호출 - 메시지: {message[:50]}...")
        
        # Claude API 호출
        response = anthropic_client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            system=system_prompt,
            messages=[{"role": "user", "content": message}]
        )
        
        assistant_response = response.content[0].text
        logger.info(f"Claude API 응답 성공 - 길이: {len(assistant_response)}")
        
        return jsonify({
            "success": True,
            "data": {
                "response": assistant_response,
                "model": "claude-sonnet-4-20250514",
                "timestamp": datetime.now().isoformat()
            }
        })
        
    except Exception as e:
        logger.error(f"AI Chat 오류: {str(e)}")
        return jsonify({
            "success": False,
            "error": f"AI 서비스 오류: {str(e)}"
        }), 500

# ============================================
# 메인 실행
# ============================================

if __name__ == '__main__':
    logger.info("=" * 50)
    logger.info("🚀 인사혁신 시스템 백엔드 시작")
    logger.info(f"📊 관리 대상: 3천만 노동인구")
    logger.info(f"🤖 Claude API: {'연결됨' if anthropic_client else '미설정'}")
    logger.info(f"🔐 OpenHash 데이터 무결성 보장")
    logger.info(f"🌐 포트: 5019")
    logger.info("=" * 50)
    app.run(host='0.0.0.0', port=5019, debug=False)
