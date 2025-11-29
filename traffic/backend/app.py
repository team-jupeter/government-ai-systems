from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import random
import os
import anthropic
import logging
import subprocess

app = Flask(__name__)
CORS(app)

# 로깅 설정
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ============================================
# Claude API 클라이언트 초기화
# ============================================
client = None

def get_api_key():
    """환경변수에서 API 키 가져오기"""
    # 1. 직접 환경변수
    api_key = os.environ.get('ANTHROPIC_API_KEY')
    if api_key and not api_key.startswith('$'):
        return api_key
    
    # 2. /etc/environment에서 로드
    try:
        with open('/etc/environment', 'r') as f:
            for line in f:
                if line.startswith('ANTHROPIC_API_KEY='):
                    key = line.strip().split('=', 1)[1].strip('"\'')
                    if key and not key.startswith('$'):
                        return key
    except:
        pass
    
    # 3. .bashrc에서 로드
    try:
        result = subprocess.run(
            ['bash', '-c', 'source ~/.bashrc && echo $ANTHROPIC_API_KEY'],
            capture_output=True, text=True, cwd='/home/ubuntu'
        )
        if result.stdout.strip():
            return result.stdout.strip()
    except:
        pass
    
    return None

# API 클라이언트 초기화
try:
    api_key = get_api_key()
    if api_key:
        client = anthropic.Anthropic(api_key=api_key)
        logger.info(f"✅ Claude API 연결됨: {api_key[:20]}...")
    else:
        logger.warning("⚠️ ANTHROPIC_API_KEY를 찾을 수 없습니다")
except Exception as e:
    logger.error(f"❌ Claude API 초기화 실패: {e}")

# ============================================
# 시뮬레이션 데이터
# ============================================
REGIONS = {
    "seoul": {"name": "서울특별시", "vehicles": 520000, "capacity": 600000},
    "gyeonggi": {"name": "경기도", "vehicles": 680000, "capacity": 750000},
    "busan": {"name": "부산광역시", "vehicles": 280000, "capacity": 320000},
    "daegu": {"name": "대구광역시", "vehicles": 195000, "capacity": 220000},
    "incheon": {"name": "인천광역시", "vehicles": 230000, "capacity": 280000},
    "gwangju": {"name": "광주광역시", "vehicles": 125000, "capacity": 150000},
    "daejeon": {"name": "대전광역시", "vehicles": 130000, "capacity": 160000},
    "ulsan": {"name": "울산광역시", "vehicles": 98000, "capacity": 120000},
    "sejong": {"name": "세종특별자치시", "vehicles": 45000, "capacity": 60000},
    "gangwon": {"name": "강원특별자치도", "vehicles": 125000, "capacity": 180000},
    "chungbuk": {"name": "충청북도", "vehicles": 132000, "capacity": 160000},
    "chungnam": {"name": "충청남도", "vehicles": 175000, "capacity": 200000},
    "jeonbuk": {"name": "전북특별자치도", "vehicles": 148000, "capacity": 180000},
    "jeonnam": {"name": "전라남도", "vehicles": 152000, "capacity": 190000},
    "gyeongbuk": {"name": "경상북도", "vehicles": 218000, "capacity": 260000},
    "gyeongnam": {"name": "경상남도", "vehicles": 275000, "capacity": 320000},
    "jeju": {"name": "제주특별자치도", "vehicles": 72000, "capacity": 100000}
}

# ============================================
# API 엔드포인트
# ============================================

@app.route('/api/traffic/health', methods=['GET'])
def health_check():
    """헬스 체크"""
    return jsonify({
        "status": "healthy",
        "claude_api": "connected" if client else "disconnected",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/api/traffic/overview', methods=['GET'])
def get_overview():
    """전체 시스템 현황"""
    total_vehicles = sum(r["vehicles"] for r in REGIONS.values())
    active = int(total_vehicles * (0.93 + random.random() * 0.05))
    
    return jsonify({
        "fleet": {
            "total": 3000000,
            "active": active,
            "idle": int(total_vehicles * 0.03),
            "charging": int(total_vehicles * 0.02),
            "maintenance": int(total_vehicles * 0.01)
        },
        "requests": {
            "passenger": 150000 + random.randint(0, 20000),
            "cargo": 40000 + random.randint(0, 10000),
            "total": 190000 + random.randint(0, 30000)
        },
        "performance": {
            "avg_match_time": round(5 + random.random() * 8, 1),
            "avg_speed": round(55 + random.random() * 15, 1),
            "route_efficiency": round(92 + random.random() * 6, 1)
        },
        "safety": {
            "accidents_today": 0,
            "hazards_prevented": 847 + random.randint(0, 50),
            "data_integrity": 100
        },
        "timestamp": datetime.now().isoformat()
    })

@app.route('/api/traffic/regions', methods=['GET'])
def get_regions():
    """17개 광역 시도 현황"""
    result = []
    for rid, data in REGIONS.items():
        active = int(data["vehicles"] * (0.93 + random.random() * 0.05))
        result.append({
            "id": rid,
            "name": data["name"],
            "vehicles": data["vehicles"],
            "capacity": data["capacity"],
            "active": active,
            "utilization": round(active / data["capacity"] * 100, 1)
        })
    return jsonify({"regions": result, "timestamp": datetime.now().isoformat()})

@app.route('/api/traffic/ai-chat', methods=['POST'])
def ai_chat():
    """AI 교통 상담 (Claude API)"""
    data = request.json
    user_message = data.get('message', '')
    
    logger.info(f"📩 AI 상담 요청: {user_message[:50]}...")
    
    # Claude API 클라이언트 확인
    if not client:
        logger.error("❌ Claude API 클라이언트가 초기화되지 않았습니다")
        return jsonify({
            "response": "AI 상담 서비스 연결 중입니다. 잠시 후 다시 시도해 주세요.\n\n기본 안내:\n• 사회적 자율주행: 중앙 서버가 모든 차량 제어\n• 차량 감축: 3천만대 → 300만대 (1/10)\n• 무사고 목표: OpenHash로 데이터 진실성 보장",
            "source": "fallback",
            "error": "API client not initialized"
        })
    
    system_prompt = """당신은 '사회적 자율주행 교통 관제 시스템'의 AI 상담사입니다.

## 핵심 개념

1. **사회적 자율주행**: 
   - 기존 자율주행: 개별 차량이 독립적으로 경로 결정
   - 사회적 자율주행: 중앙 서버가 모든 차량의 속도, 경로, 배정을 통합 결정
   - 전역 최적화로 교통 체증 87% 감소, 사고 0건 목표

2. **차량 감축**:
   - 한국의 등록 차량 3천만대 → 300만대(1/10)로 감축
   - 개인 소유 대신 공유 차량 호출 방식
   - 차량 가동률: 기존 5% → 95%로 대폭 향상

3. **OpenHash 기술**:
   - 모든 차량 데이터(위치, 속도, 경로)의 진실성을 암호학적으로 보장
   - 4계층 구조: 읍면동(L1) → 시군구(L2) → 광역시도(L3) → 국가(L4)
   - 블록체인 대비 수백만 배 빠른 처리 속도, 극도로 낮은 에너지 소비
   - 데이터 위변조 시 즉시 탐지 및 차단

4. **무사고 보장**:
   - 중앙 서버가 모든 차량 경로를 계산하므로 충돌 불가능
   - 허위 데이터는 OpenHash로 즉시 탐지되어 사고 예방
   - AI 기반 오염 탐지: CNN + LSTM 융합 모델

5. **요금 체계**:
   - 이동 거리 + 시간 기반 요금
   - 개인 차량 유지비 대비 70-80% 절감
   - 태양광 도로에서 생산된 전력으로 운영

## 답변 지침
- 친절하고 전문적으로 설명합니다.
- 사회적 자율주행의 장점을 구체적으로 설명합니다.
- OpenHash의 중요성(데이터 진실성 = 안전)을 강조합니다.
- 한국어로 자연스럽게 답변합니다.
- 기술적인 내용도 일반인이 이해하기 쉽게 설명합니다."""

    try:
        logger.info("🤖 Claude API 호출 중...")
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            system=system_prompt,
            messages=[{"role": "user", "content": user_message}]
        )
        
        ai_response = response.content[0].text
        logger.info(f"✅ Claude API 응답 성공: {len(ai_response)}자")
        
        return jsonify({
            "response": ai_response,
            "source": "claude",
            "model": "claude-sonnet-4-20250514"
        })
        
    except anthropic.AuthenticationError as e:
        logger.error(f"❌ API 인증 오류: {e}")
        return jsonify({
            "response": "API 인증에 실패했습니다. 관리자에게 문의해 주세요.",
            "source": "error",
            "error": str(e)
        })
    except anthropic.RateLimitError as e:
        logger.error(f"❌ API 속도 제한: {e}")
        return jsonify({
            "response": "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.",
            "source": "error",
            "error": str(e)
        })
    except Exception as e:
        logger.error(f"❌ Claude API 오류: {e}")
        return jsonify({
            "response": f"AI 응답 생성 중 오류가 발생했습니다.\n\n기본 안내:\n• 사회적 자율주행은 중앙 서버가 모든 차량을 통합 관제합니다\n• 개인 차량 대신 공유 차량을 호출하여 이용합니다\n• 모든 데이터는 OpenHash로 무결성이 보장됩니다",
            "source": "fallback",
            "error": str(e)
        })

@app.route('/api/traffic/ai-analyze', methods=['POST'])
def ai_analyze():
    """AI 데이터 분석 (Claude API)"""
    data = request.json
    analysis_type = data.get('type', 'general')
    analysis_data = data.get('data', {})
    
    if not client:
        return jsonify({
            "analysis": "AI 분석 서비스를 사용할 수 없습니다.",
            "source": "fallback"
        })
    
    prompts = {
        'traffic_flow': f"다음 교통 흐름 데이터를 분석해 주세요: {analysis_data}",
        'anomaly': f"다음 데이터에서 이상치를 탐지해 주세요: {analysis_data}",
        'prediction': f"다음 데이터를 기반으로 향후 교통 상황을 예측해 주세요: {analysis_data}",
        'general': f"다음 데이터를 분석해 주세요: {analysis_data}"
    }
    
    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            system="당신은 교통 데이터 분석 전문가입니다. 주어진 데이터를 분석하고 인사이트를 제공합니다.",
            messages=[{"role": "user", "content": prompts.get(analysis_type, prompts['general'])}]
        )
        
        return jsonify({
            "analysis": response.content[0].text,
            "source": "claude",
            "type": analysis_type
        })
    except Exception as e:
        logger.error(f"분석 오류: {e}")
        return jsonify({
            "analysis": "분석 중 오류가 발생했습니다.",
            "source": "error",
            "error": str(e)
        })

@app.route('/api/traffic/vehicles/<vehicle_id>', methods=['GET'])
def get_vehicle(vehicle_id):
    """개별 차량 정보"""
    return jsonify({
        "id": vehicle_id,
        "type": random.choice(["sedan", "suv", "van", "bus", "truck"]),
        "status": "active",
        "speed": round(30 + random.random() * 50, 1),
        "battery": random.randint(20, 100),
        "location": {
            "lat": 37.5 + random.random() * 0.1,
            "lng": 127.0 + random.random() * 0.1
        },
        "openhash_verified": True,
        "last_verified": datetime.now().isoformat()
    })

@app.route('/api/traffic/safety/alerts', methods=['GET'])
def get_safety_alerts():
    """안전 경고 목록"""
    return jsonify({
        "alerts": [
            {"id": 1, "level": "warning", "type": "기상", "message": "폭설 예보", "affected": 45000},
            {"id": 2, "level": "info", "type": "공사", "message": "도로 공사", "affected": 12000}
        ],
        "accidents_today": 0,
        "hazards_prevented": 847 + random.randint(0, 50)
    })

# ============================================
# 서버 실행
# ============================================

if __name__ == '__main__':
    logger.info("=" * 50)
    logger.info("🚗 사회적 자율주행 교통 관제 시스템 백엔드")
    logger.info(f"📍 포트: 5021")
    logger.info(f"🤖 Claude API: {'연결됨' if client else '미연결'}")
    logger.info("=" * 50)
    app.run(host='0.0.0.0', port=5021, debug=False)
