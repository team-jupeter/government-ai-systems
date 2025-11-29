from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import random
import json
import os
import anthropic

app = Flask(__name__)
CORS(app)

# Claude API 클라이언트
client = None
try:
    api_key = os.environ.get('ANTHROPIC_API_KEY')
    if api_key:
        client = anthropic.Anthropic(api_key=api_key)
        print(f"✅ Claude API 연결됨: {api_key[:20]}...")
    else:
        print("⚠️ ANTHROPIC_API_KEY 환경변수 없음")
except Exception as e:
    print(f"❌ Claude API 초기화 실패: {e}")

# ============================================
# 시뮬레이션 데이터: 대한민국 행정구역
# ============================================

REGIONS = {
    "seoul": {"name": "서울특별시", "population": 9411000, "kitchens": 424, "supply_centers": 25},
    "busan": {"name": "부산광역시", "population": 3359000, "kitchens": 198, "supply_centers": 16},
    "daegu": {"name": "대구광역시", "population": 2385000, "kitchens": 139, "supply_centers": 8},
    "incheon": {"name": "인천광역시", "population": 2948000, "kitchens": 157, "supply_centers": 10},
    "gwangju": {"name": "광주광역시", "population": 1441000, "kitchens": 95, "supply_centers": 5},
    "daejeon": {"name": "대전광역시", "population": 1452000, "kitchens": 79, "supply_centers": 5},
    "ulsan": {"name": "울산광역시", "population": 1121000, "kitchens": 58, "supply_centers": 5},
    "sejong": {"name": "세종특별자치시", "population": 371000, "kitchens": 24, "supply_centers": 1},
    "gyeonggi": {"name": "경기도", "population": 13530000, "kitchens": 556, "supply_centers": 31},
    "gangwon": {"name": "강원특별자치도", "population": 1538000, "kitchens": 188, "supply_centers": 18},
    "chungbuk": {"name": "충청북도", "population": 1597000, "kitchens": 153, "supply_centers": 11},
    "chungnam": {"name": "충청남도", "population": 2119000, "kitchens": 210, "supply_centers": 15},
    "jeonbuk": {"name": "전북특별자치도", "population": 1786000, "kitchens": 243, "supply_centers": 14},
    "jeonnam": {"name": "전라남도", "population": 1832000, "kitchens": 295, "supply_centers": 22},
    "gyeongbuk": {"name": "경상북도", "population": 2626000, "kitchens": 331, "supply_centers": 23},
    "gyeongnam": {"name": "경상남도", "population": 3314000, "kitchens": 309, "supply_centers": 18},
    "jeju": {"name": "제주특별자치도", "population": 676000, "kitchens": 43, "supply_centers": 2}
}

SAMPLE_CITIZENS = [
    {"id": "PDV-2024-KR-00001", "name": "김*철", "age": 35, "gender": "남", "home_region": "jeju", "current_region": "seoul", "bmi": 23.5, "allergies": ["견과류"], "preferences": ["한식", "저염식"], "daily_calories": 2200, "health_score": 82.3},
    {"id": "PDV-2024-KR-00002", "name": "이*영", "age": 28, "gender": "여", "home_region": "busan", "current_region": "busan", "bmi": 21.2, "allergies": [], "preferences": ["채식", "유기농"], "daily_calories": 1800, "health_score": 91.7},
    {"id": "PDV-2024-KR-00003", "name": "박*수", "age": 62, "gender": "남", "home_region": "gyeonggi", "current_region": "gyeonggi", "bmi": 25.8, "allergies": ["갑각류", "유제품"], "preferences": ["저당식", "고단백"], "daily_calories": 1900, "health_score": 68.4},
    {"id": "PDV-2024-KR-00004", "name": "최*희", "age": 8, "gender": "여", "home_region": "daegu", "current_region": "daegu", "bmi": 16.5, "allergies": ["계란"], "preferences": ["어린이식", "성장식"], "daily_calories": 1500, "health_score": 95.2},
    {"id": "PDV-2024-KR-00005", "name": "정*호", "age": 45, "gender": "남", "home_region": "seoul", "current_region": "jeju", "bmi": 27.3, "allergies": [], "preferences": ["당뇨식", "저칼로리"], "daily_calories": 1700, "health_score": 58.9}
]

INGREDIENTS = {
    "rice": {"name": "쌀", "unit": "kg", "weekly_need": 15000000, "current_stock": 18500000, "price_per_unit": 3500},
    "kimchi": {"name": "배추김치", "unit": "kg", "weekly_need": 8000000, "current_stock": 9200000, "price_per_unit": 8000},
    "pork": {"name": "돼지고기", "unit": "kg", "weekly_need": 5500000, "current_stock": 5800000, "price_per_unit": 15000},
    "chicken": {"name": "닭고기", "unit": "kg", "weekly_need": 4200000, "current_stock": 4500000, "price_per_unit": 12000},
    "beef": {"name": "소고기", "unit": "kg", "weekly_need": 2800000, "current_stock": 3100000, "price_per_unit": 45000},
    "fish": {"name": "생선류", "unit": "kg", "weekly_need": 3500000, "current_stock": 3200000, "price_per_unit": 18000},
    "vegetables": {"name": "채소류", "unit": "kg", "weekly_need": 12000000, "current_stock": 14000000, "price_per_unit": 2500},
    "tofu": {"name": "두부", "unit": "kg", "weekly_need": 2200000, "current_stock": 2600000, "price_per_unit": 4500},
    "egg": {"name": "계란", "unit": "개", "weekly_need": 150000000, "current_stock": 165000000, "price_per_unit": 200},
    "milk": {"name": "우유", "unit": "L", "weekly_need": 25000000, "current_stock": 28000000, "price_per_unit": 2800}
}

DELIVERY_VEHICLES = []
for i in range(100):
    DELIVERY_VEHICLES.append({
        "id": f"AV-MEAL-{str(i+1).zfill(5)}",
        "type": random.choice(["소형", "중형", "대형"]),
        "status": random.choice(["배송중", "대기중", "충전중", "복귀중"]),
        "capacity": random.choice([50, 100, 200]),
        "current_load": random.randint(0, 100),
        "battery": random.randint(20, 100),
        "region": random.choice(list(REGIONS.keys())),
        "speed": random.randint(30, 60)
    })

# 급식 시스템 정보 (AI 상담용)
MEAL_SYSTEM_INFO = """
# OpenHash 기반 국가 급식 자동화 시스템

## 시스템 개요
- 대한민국 5천만 국민에게 하루 3끼, 총 1억 5천만 식의 5성급 호텔 수준 맞춤형 도시락을 제공
- OpenHash 기술로 모든 급식 데이터의 무결성과 진실성 보장
- 개인정보금고(PDV)에 저장된 식습관, 체중, 신장, 나이 등을 기반으로 개인 맞춤 영양 설계

## 4계층 인프라 구조
1. **Layer 1 (읍면동)**: 전국 3,500개+ 조리 시설, 1,700대 로봇셰프가 조리
2. **Layer 2 (시군구)**: 226개 배급 센터, 식재료를 Layer 1에 배급
3. **Layer 3 (광역시도)**: 17개 대형 공급 시설, 주간 단위로 식재료 공급
4. **Layer 4 (국가)**: 통합 관제, 식량 생산 계획 및 관리 감독

## 핵심 기술
- **OpenHash**: 블록체인 대비 99.7% 에너지 절감, 25,000+ TPS, 위변조 불가능
- **5차원 영양분석**: 생체지표(35%), 활동수준(25%), 질병관리(20%), 기호문화(15%), 경제형평(5%)
- **1,700대 로봇셰프**: 6축 로봇팔, ±1℃ 온도 제어, ±3g 중량 제어, 100% 충돌방지
- **자율주행 배송**: 15,000대 차량, 지상(85%) + 드론(10%) + 지하터널(5%)

## 스마트워치 연동
- 5천만 국민의 실시간 위치 추적
- 거주지와 다른 지역 방문 시 해당 지역 급식센터에서 식사 제공
- 생체 데이터(심박수, 혈압, 걸음 수) 연동

## 식재료 조달
- 농협, 수협, 축협, 로컬팜 등과 연계
- 주간 단위 조달 계획 수립
- 실시간 재고 모니터링 및 자동 발주

## 무오류 데이터 보장
- 출생 시점부터 모든 식사 기록을 OpenHash에 영구 저장
- 위변조 불가능한 진실의 기록
- 식습관 패턴 분석으로 질병 조기 감지
- 식량 생산 현황 실시간 모니터링

## 품질 목표
- 1년차: 3성급 호텔 수준 (8,000-10,000원)
- 3년차: 4성급 호텔 수준 (10,000-12,000원)  
- 5년차: 5성급 호텔 수준 (12,000-15,000원)

## 현재 운영 현황
- 등록 인구: 4,900만 명
- 일일 급식: 1억 5천만 식
- 만족도: 94%
- 배송 정시율: 96%
- 영양 준수율: 97%
"""

# ============================================
# API 엔드포인트
# ============================================

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "ok",
        "service": "meal-system",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0",
        "claude_api": "connected" if client else "not_configured"
    }), 200


@app.route('/chat', methods=['POST'])
def chat():
    """Claude AI 상담 엔드포인트"""
    if not client:
        return jsonify({
            "error": "Claude API가 설정되지 않았습니다.",
            "response": "죄송합니다. 현재 AI 상담 서비스를 이용할 수 없습니다. 관리자에게 문의해주세요."
        }), 503
    
    try:
        data = request.json
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({"error": "메시지가 없습니다."}), 400
        
        # Claude API 호출
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            system=f"""당신은 OpenHash 기반 국가 급식 자동화 시스템의 AI 상담사입니다.
친절하고 전문적으로 급식 시스템에 대한 질문에 답변해주세요.
답변은 한국어로 하고, 간결하면서도 정확하게 설명해주세요.

다음은 급식 시스템에 대한 상세 정보입니다:
{MEAL_SYSTEM_INFO}

사용자가 급식 시스템과 관련 없는 질문을 하면, 정중하게 급식 시스템 관련 질문을 해달라고 안내해주세요.
""",
            messages=[
                {"role": "user", "content": user_message}
            ]
        )
        
        ai_response = response.content[0].text
        
        return jsonify({
            "response": ai_response,
            "timestamp": datetime.now().isoformat()
        })
        
    except anthropic.APIError as e:
        print(f"Claude API 오류: {e}")
        return jsonify({
            "error": "AI 서비스 오류",
            "response": "죄송합니다. AI 서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
        }), 500
    except Exception as e:
        print(f"채팅 오류: {e}")
        return jsonify({
            "error": str(e),
            "response": "오류가 발생했습니다. 다시 시도해주세요."
        }), 500


@app.route('/national/overview', methods=['GET'])
def national_overview():
    total_population = sum(r["population"] for r in REGIONS.values())
    total_kitchens = sum(r["kitchens"] for r in REGIONS.values())
    total_supply_centers = sum(r["supply_centers"] for r in REGIONS.values())
    
    meals_today = random.randint(148000000, 152000000)
    meals_delivered = int(meals_today * random.uniform(0.85, 0.95))
    meals_preparing = meals_today - meals_delivered
    
    return jsonify({
        "timestamp": datetime.now().isoformat(),
        "population": {
            "total": total_population,
            "registered": int(total_population * 0.98),
            "active_today": int(total_population * random.uniform(0.92, 0.96))
        },
        "infrastructure": {
            "layer1_kitchens": total_kitchens,
            "layer2_distribution": 226,
            "layer3_supply": total_supply_centers,
            "layer4_national": 1
        },
        "meals": {
            "target_today": meals_today,
            "delivered": meals_delivered,
            "preparing": meals_preparing,
            "delivery_rate": round(meals_delivered / meals_today * 100, 1)
        },
        "vehicles": {
            "total": 15000,
            "active": random.randint(12000, 14000),
            "charging": random.randint(500, 1000),
            "maintenance": random.randint(100, 300)
        },
        "quality": {
            "satisfaction_rate": round(random.uniform(92, 96), 1),
            "nutrition_compliance": round(random.uniform(95, 99), 1),
            "delivery_on_time": round(random.uniform(94, 98), 1)
        }
    })


@app.route('/regions', methods=['GET'])
def get_regions():
    result = []
    for region_id, data in REGIONS.items():
        daily_meals = int(data["population"] * 3 * random.uniform(0.95, 1.0))
        result.append({
            "id": region_id,
            "name": data["name"],
            "population": data["population"],
            "kitchens": data["kitchens"],
            "supply_centers": data["supply_centers"],
            "daily_meals": daily_meals,
            "delivery_rate": round(random.uniform(92, 99), 1),
            "stock_level": round(random.uniform(85, 110), 1),
            "status": "정상" if random.random() > 0.1 else "주의"
        })
    return jsonify({"timestamp": datetime.now().isoformat(), "regions": result})


@app.route('/region/<region_id>/kitchens', methods=['GET'])
def get_region_kitchens(region_id):
    if region_id not in REGIONS:
        return jsonify({"error": "Invalid region"}), 404
    
    region = REGIONS[region_id]
    kitchens = []
    for i in range(min(region["kitchens"], 20)):
        kitchens.append({
            "id": f"KIT-{region_id.upper()}-{str(i+1).zfill(4)}",
            "name": f"{region['name']} {i+1}동 급식센터",
            "capacity": random.choice([500, 1000, 2000, 3000]),
            "current_load": random.randint(60, 100),
            "robot_chefs": random.randint(10, 50),
            "status": random.choice(["운영중", "운영중", "운영중", "점검중"]),
            "meals_today": random.randint(1000, 5000),
            "next_meal_time": (datetime.now() + timedelta(hours=random.randint(1, 4))).strftime("%H:%M")
        })
    
    return jsonify({
        "region_id": region_id,
        "region_name": region["name"],
        "total_kitchens": region["kitchens"],
        "kitchens": kitchens
    })


@app.route('/citizens/sample', methods=['GET'])
def get_sample_citizens():
    updated_citizens = []
    for citizen in SAMPLE_CITIZENS:
        c = citizen.copy()
        if random.random() < 0.1:
            c["current_region"] = random.choice(list(REGIONS.keys()))
        c["last_updated"] = datetime.now().isoformat()
        c["vital_signs"] = {
            "heart_rate": random.randint(60, 100),
            "blood_pressure": f"{random.randint(110, 130)}/{random.randint(70, 85)}",
            "steps_today": random.randint(3000, 15000),
            "calories_burned": random.randint(1000, 2500)
        }
        updated_citizens.append(c)
    
    return jsonify({"timestamp": datetime.now().isoformat(), "citizens": updated_citizens})


@app.route('/citizen/<citizen_id>/nutrition', methods=['GET'])
def get_citizen_nutrition(citizen_id):
    citizen = next((c for c in SAMPLE_CITIZENS if c["id"] == citizen_id), None)
    if not citizen:
        return jsonify({"error": "Citizen not found"}), 404
    
    return jsonify({
        "citizen_id": citizen_id,
        "name": citizen["name"],
        "analysis": {
            "biometric": {"score": round(random.uniform(70, 95), 1), "bmi": citizen["bmi"], "weight_status": "정상" if 18.5 <= citizen["bmi"] <= 25 else ("과체중" if citizen["bmi"] > 25 else "저체중")},
            "activity": {"score": round(random.uniform(60, 90), 1), "daily_steps": random.randint(5000, 12000), "exercise_minutes": random.randint(0, 60)},
            "disease_management": {"score": round(random.uniform(65, 95), 1), "chronic_conditions": random.randint(0, 2), "medication_interactions": 0},
            "preference_culture": {"score": round(random.uniform(80, 98), 1), "preferences": citizen["preferences"], "allergies": citizen["allergies"]},
            "economic_equity": {"score": round(random.uniform(85, 100), 1), "meal_cost_target": random.randint(8000, 12000)}
        },
        "recommended_menu": {
            "breakfast": {"main": "현미밥", "side": ["미역국", "계란찜", "시금치나물", "김치"], "calories": 650},
            "lunch": {"main": "잡곡밥", "side": ["된장찌개", "제육볶음", "콩나물무침", "깍두기"], "calories": 780},
            "dinner": {"main": "백미밥", "side": ["북어국", "생선구이", "무생채", "배추김치"], "calories": 720}
        },
        "openhash_verified": True,
        "timestamp": datetime.now().isoformat()
    })


@app.route('/ingredients', methods=['GET'])
def get_ingredients():
    result = []
    for ing_id, data in INGREDIENTS.items():
        stock_ratio = data["current_stock"] / data["weekly_need"]
        result.append({
            "id": ing_id,
            "name": data["name"],
            "unit": data["unit"],
            "weekly_need": data["weekly_need"],
            "current_stock": data["current_stock"],
            "stock_ratio": round(stock_ratio * 100, 1),
            "status": "충분" if stock_ratio >= 1.1 else ("정상" if stock_ratio >= 0.9 else "부족"),
            "price_per_unit": data["price_per_unit"],
            "next_delivery": (datetime.now() + timedelta(days=random.randint(1, 3))).strftime("%Y-%m-%d")
        })
    return jsonify({"timestamp": datetime.now().isoformat(), "ingredients": result})


@app.route('/ingredients/plan', methods=['GET'])
def get_ingredient_plan():
    week_start = datetime.now()
    plan = []
    for i in range(7):
        day = week_start + timedelta(days=i)
        day_plan = {
            "date": day.strftime("%Y-%m-%d"),
            "day_name": ["월", "화", "수", "목", "금", "토", "일"][day.weekday()],
            "deliveries": []
        }
        for ing_id in random.sample(list(INGREDIENTS.keys()), random.randint(2, 4)):
            ing = INGREDIENTS[ing_id]
            day_plan["deliveries"].append({
                "ingredient": ing["name"],
                "quantity": int(ing["weekly_need"] / 7 * random.uniform(0.8, 1.2)),
                "unit": ing["unit"],
                "supplier": random.choice(["농협중앙회", "수협", "축협", "로컬팜", "청과물류"]),
                "destination_count": random.randint(50, 200)
            })
        plan.append(day_plan)
    
    return jsonify({"timestamp": datetime.now().isoformat(), "week_plan": plan})


@app.route('/vehicles', methods=['GET'])
def get_vehicles():
    updated_vehicles = []
    for v in DELIVERY_VEHICLES[:50]:
        vehicle = v.copy()
        vehicle["battery"] = max(10, min(100, vehicle["battery"] + random.randint(-5, 5)))
        vehicle["current_load"] = random.randint(0, vehicle["capacity"])
        vehicle["status"] = random.choice(["배송중", "배송중", "배송중", "대기중", "충전중"])
        vehicle["deliveries_today"] = random.randint(10, 50)
        vehicle["distance_today"] = random.randint(50, 200)
        updated_vehicles.append(vehicle)
    
    stats = {
        "total": len(DELIVERY_VEHICLES),
        "delivering": len([v for v in updated_vehicles if v["status"] == "배송중"]),
        "waiting": len([v for v in updated_vehicles if v["status"] == "대기중"]),
        "charging": len([v for v in updated_vehicles if v["status"] == "충전중"]),
        "avg_battery": round(sum(v["battery"] for v in updated_vehicles) / len(updated_vehicles), 1)
    }
    
    return jsonify({"timestamp": datetime.now().isoformat(), "stats": stats, "vehicles": updated_vehicles})


@app.route('/openhash/stats', methods=['GET'])
def get_openhash_stats():
    return jsonify({
        "timestamp": datetime.now().isoformat(),
        "daily_transactions": random.randint(450000000, 460000000),
        "hash_verifications": random.randint(890000000, 910000000),
        "data_integrity_rate": round(random.uniform(99.9990, 99.9999), 4),
        "cross_verification_success": round(random.uniform(99.95, 99.99), 2),
        "layer_distribution": {"layer1": 70.2, "layer2": 20.9, "layer3": 8.9},
        "energy_savings_vs_blockchain": 99.7,
        "tps": random.randint(25000, 27000)
    })


if __name__ == '__main__':
    print("🍱 OpenHash 국가 급식 시스템 백엔드 시작 (포트 5017)")
    app.run(host='0.0.0.0', port=5017, debug=False)
