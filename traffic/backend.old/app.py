from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os
import logging

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY', '')
client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY) if ANTHROPIC_API_KEY else None

SYSTEM_INFO = {
    "system_name": "오픈해시 기반 지능형 교통 통합 시스템",
    "description": "AI 기반 전국 교통 관제·최적화·안전 플랫폼",
    "monitored_roads": 112000,
    "traffic_signals": 85000,
    "cctv_cameras": 125000,
    "daily_vehicles": 24500000,
    "congestion_reduction": "38.5%",
    "accident_reduction": "52.3%",
    "annual_savings": "연간 18.5조 원"
}

TRAFFIC_DOMAINS = [
    {"id": "highway", "name": "고속도로", "icon": "🛣️", "length": "4,900km", "daily_traffic": 4800000},
    {"id": "national", "name": "국도", "icon": "🚗", "length": "14,200km", "daily_traffic": 8500000},
    {"id": "urban", "name": "도시도로", "icon": "🏙️", "length": "92,000km", "daily_traffic": 11200000},
    {"id": "public_transit", "name": "대중교통", "icon": "🚌", "routes": 25000, "daily_passengers": 15000000},
    {"id": "railway", "name": "철도", "icon": "🚄", "length": "4,200km", "daily_passengers": 4200000},
    {"id": "aviation", "name": "항공", "icon": "✈️", "airports": 15, "daily_flights": 1850}
]

TRAFFIC_SERVICES = [
    {"id": "realtime", "name": "실시간 교통정보", "icon": "📡", "update_cycle": "30초"},
    {"id": "navigation", "name": "최적 경로 안내", "icon": "🗺️", "accuracy": "98.7%"},
    {"id": "signal", "name": "신호 최적화", "icon": "🚦", "efficiency": "34% 향상"},
    {"id": "parking", "name": "주차 안내", "icon": "🅿️", "coverage": "전국 15,000개소"},
    {"id": "accident", "name": "사고 감지·대응", "icon": "🚨", "detection_time": "8초"},
    {"id": "weather", "name": "기상 연계 교통", "icon": "🌧️", "forecast": "24시간"}
]

SCENARIOS = [
    {
        "icon": "🚦",
        "title": "AI 신호 최적화",
        "problem": "고정 신호 체계로 교통량 변화 대응 불가, 불필요한 대기",
        "solution": "AI가 실시간 교통량 분석하여 신호 주기 동적 최적화",
        "savings": "통행 시간 34% 단축"
    },
    {
        "icon": "🚨",
        "title": "실시간 사고 대응",
        "problem": "사고 인지까지 평균 8분, 후속 사고 위험",
        "solution": "AI가 CCTV 분석으로 8초 내 사고 감지, 자동 긴급 대응",
        "savings": "2차 사고 78% 감소"
    },
    {
        "icon": "🗺️",
        "title": "동적 경로 안내",
        "problem": "고정 경로 안내로 특정 도로 과밀, 교통 불균형",
        "solution": "AI가 전체 교통망 분석하여 차량별 분산 경로 제공",
        "savings": "전체 교통량 균형 38.5% 개선"
    },
    {
        "icon": "🚌",
        "title": "스마트 대중교통",
        "problem": "고정 배차로 출퇴근 혼잡, 한산 시간대 비효율",
        "solution": "AI가 수요 예측하여 동적 배차, 노선 최적화",
        "savings": "대중교통 이용률 27% 증가"
    }
]

AGENTS = [
    {"id": "route_planner", "name": "🗺️ 경로 안내 Agent"},
    {"id": "traffic_reporter", "name": "📡 실시간 교통 Agent"},
    {"id": "parking_finder", "name": "🅿️ 주차 안내 Agent"},
    {"id": "transit_guide", "name": "🚌 대중교통 Agent"},
    {"id": "accident_reporter", "name": "🚨 사고 신고 Agent"},
    {"id": "driving_advisor", "name": "🚗 운전 상담 Agent"}
]

@app.route('/api/traffic/info', methods=['GET'])
def get_info():
    return jsonify(SYSTEM_INFO)

@app.route('/api/traffic/domains', methods=['GET'])
def get_domains():
    return jsonify({"domains": TRAFFIC_DOMAINS})

@app.route('/api/traffic/services', methods=['GET'])
def get_services():
    return jsonify({"services": TRAFFIC_SERVICES})

@app.route('/api/traffic/scenarios', methods=['GET'])
def get_scenarios():
    return jsonify({"scenarios": SCENARIOS})

@app.route('/api/traffic/agents', methods=['GET'])
def get_agents():
    return jsonify({"agents": AGENTS})

@app.route('/api/traffic/consultation', methods=['POST', 'OPTIONS'])
def consultation():
    if request.method == 'OPTIONS':
        return '', 204
    
    if not client:
        return jsonify({"response": "⚠️ API 키가 설정되지 않았습니다."}), 200
    
    try:
        data = request.json
        message = data.get('message', '')
        agent_type = data.get('agent_type', 'route_planner')
        
        prompts = {
            "route_planner": "당신은 경로 안내 AI입니다. 출발지와 목적지를 받아 최적 경로, 예상 시간, 교통 상황을 안내합니다.",
            "traffic_reporter": "당신은 실시간 교통 정보 AI입니다. 현재 교통 상황, 정체 구간, 사고 정보를 안내합니다.",
            "parking_finder": "당신은 주차 안내 AI입니다. 목적지 주변 주차장, 요금, 빈자리 정보를 안내합니다.",
            "transit_guide": "당신은 대중교통 안내 AI입니다. 버스, 지하철, KTX 등 대중교통 노선과 시간표를 안내합니다.",
            "accident_reporter": "당신은 사고 신고 접수 AI입니다. 교통사고 신고 접수 및 긴급 서비스 연결을 안내합니다.",
            "driving_advisor": "당신은 운전 상담 AI입니다. 운전면허, 교통법규, 과태료, 보험 관련 상담을 제공합니다."
        }
        
        system_prompt = prompts.get(agent_type, prompts["route_planner"])
        system_prompt += "\n\n국가 교통 시스템 AI로서 정확한 교통 정보를 제공합니다. 긴급 상황 시 112, 119 신고를 안내하세요."
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            system=system_prompt,
            messages=[{"role": "user", "content": message}]
        )
        
        return jsonify({"response": response.content[0].text})
        
    except Exception as e:
        return jsonify({"response": f"오류: {str(e)}"}), 500

@app.route('/api/traffic/realtime-status', methods=['GET'])
def realtime_status():
    status = {
        "timestamp": "2025-11-24T16:55:00+09:00",
        "overall_congestion": "보통",
        "congestion_index": 58,
        "major_roads": [
            {"name": "경부고속도로", "section": "서울-수원", "status": "정체", "speed": 25, "travel_time": 45},
            {"name": "서해안고속도로", "section": "서울-평택", "status": "서행", "speed": 45, "travel_time": 38},
            {"name": "영동고속도로", "section": "서울-용인", "status": "원활", "speed": 85, "travel_time": 22},
            {"name": "중부고속도로", "section": "하남-이천", "status": "서행", "speed": 55, "travel_time": 28}
        ],
        "incidents": [
            {"type": "사고", "location": "경부고속도로 서울방향 374km", "time": "16:32", "lanes_blocked": 2},
            {"type": "공사", "location": "올림픽대로 여의도 구간", "time": "09:00-18:00", "lanes_blocked": 1}
        ],
        "weather_impact": {
            "condition": "맑음",
            "visibility": "좋음",
            "road_condition": "건조"
        }
    }
    
    return jsonify({"status": status})

@app.route('/api/traffic/find-route', methods=['POST'])
def find_route():
    data = request.json
    origin = data.get('origin', '서울역')
    destination = data.get('destination', '부산역')
    
    routes = {
        "origin": origin,
        "destination": destination,
        "calculated_at": "2025-11-24T16:55:00+09:00",
        "routes": [
            {
                "type": "최단 시간",
                "distance": 325,
                "duration": 195,
                "toll": 28400,
                "fuel_cost": 42500,
                "path": ["경부고속도로", "대전-통영고속도로"],
                "congestion_level": "보통"
            },
            {
                "type": "최단 거리",
                "distance": 312,
                "duration": 215,
                "toll": 25600,
                "fuel_cost": 40800,
                "path": ["경부고속도로"],
                "congestion_level": "혼잡"
            },
            {
                "type": "무료 도로",
                "distance": 385,
                "duration": 280,
                "toll": 0,
                "fuel_cost": 50300,
                "path": ["국도 1호선", "국도 25호선"],
                "congestion_level": "원활"
            }
        ],
        "recommendation": "최단 시간 경로 추천 (현재 경부고속도로 정체 구간 우회)"
    }
    
    return jsonify({"routes": routes})

@app.route('/api/traffic/find-parking', methods=['POST'])
def find_parking():
    data = request.json
    location = data.get('location', '강남역')
    
    parking = {
        "location": location,
        "search_radius": "500m",
        "results": [
            {
                "name": "강남역 공영주차장",
                "type": "공영",
                "distance": 120,
                "total_spaces": 450,
                "available": 23,
                "rate": "10분당 600원",
                "max_daily": 48000,
                "operating": "24시간"
            },
            {
                "name": "역삼타워 주차장",
                "type": "민영",
                "distance": 180,
                "total_spaces": 320,
                "available": 45,
                "rate": "10분당 1,000원",
                "max_daily": 없음,
                "operating": "06:00-24:00"
            },
            {
                "name": "강남역 환승주차장",
                "type": "공영",
                "distance": 350,
                "total_spaces": 200,
                "available": 78,
                "rate": "1일 5,000원 (지하철 환승 시)",
                "max_daily": 5000,
                "operating": "05:00-01:00"
            }
        ],
        "tip": "대중교통 이용 시 환승주차장이 경제적입니다."
    }
    
    return jsonify({"parking": parking})

@app.route('/api/traffic/transit-route', methods=['POST'])
def transit_route():
    data = request.json
    origin = data.get('origin', '서울역')
    destination = data.get('destination', '강남역')
    
    transit = {
        "origin": origin,
        "destination": destination,
        "routes": [
            {
                "type": "최소 환승",
                "duration": 35,
                "transfers": 1,
                "fare": 1400,
                "steps": [
                    {"mode": "지하철 1호선", "from": "서울역", "to": "시청역", "duration": 3},
                    {"mode": "환승", "line": "2호선", "duration": 5},
                    {"mode": "지하철 2호선", "from": "시청역", "to": "강남역", "duration": 27}
                ]
            },
            {
                "type": "최단 시간",
                "duration": 28,
                "transfers": 2,
                "fare": 1400,
                "steps": [
                    {"mode": "지하철 4호선", "from": "서울역", "to": "동대문역사문화공원", "duration": 8},
                    {"mode": "환승", "line": "2호선", "duration": 4},
                    {"mode": "지하철 2호선", "from": "동대문역사문화공원", "to": "강남역", "duration": 16}
                ]
            }
        ],
        "first_train": "05:30",
        "last_train": "23:50",
        "realtime": {
            "next_departure": "2분 후",
            "crowding": "보통"
        }
    }
    
    return jsonify({"transit": transit})

@app.route('/api/traffic/report-accident', methods=['POST'])
def report_accident():
    data = request.json
    
    report = {
        "report_id": "ACC-2025-112400125",
        "status": "접수 완료",
        "received_at": "2025-11-24T16:55:32+09:00",
        "location": data.get('location', ''),
        "type": data.get('type', '교통사고'),
        "description": data.get('description', ''),
        "dispatched": {
            "police": {"status": "출동 중", "eta": "8분"},
            "ambulance": {"status": "출동 중", "eta": "6분"},
            "tow_truck": {"status": "대기 중", "eta": "15분"}
        },
        "traffic_control": {
            "status": "시행 중",
            "affected_lanes": 2,
            "detour": "우회 경로 안내 중"
        },
        "instructions": [
            "안전한 곳으로 대피하세요",
            "2차 사고 예방을 위해 삼각대를 설치하세요",
            "부상자가 있으면 119에 연락하세요"
        ]
    }
    
    return jsonify({"report": report})

@app.route('/api/traffic/signal-status', methods=['GET'])
def signal_status():
    status = {
        "total_signals": 85000,
        "ai_controlled": 62000,
        "optimization_rate": "72.9%",
        "average_wait_time": {
            "before": 45,
            "after": 29,
            "improvement": "35.6%"
        },
        "peak_performance": {
            "morning_rush": {"efficiency": 87, "avg_delay": 32},
            "evening_rush": {"efficiency": 82, "avg_delay": 38}
        },
        "recent_optimizations": [
            {"location": "강남대로-테헤란로 교차로", "improvement": "42%"},
            {"location": "종로-세종대로 교차로", "improvement": "38%"},
            {"location": "영등포로-국회대로 교차로", "improvement": "35%"}
        ]
    }
    
    return jsonify({"status": status})

if __name__ == '__main__':
    logger.info("🚀 지능형 교통 통합 시스템 백엔드 시작 (포트 5021)")
    app.run(host='0.0.0.0', port=5021, debug=False)
