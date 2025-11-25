from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY', '')
client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY) if ANTHROPIC_API_KEY else None

SYSTEM_INFO = {
    "system_name": "AI 기반 FPGA 가속 자율 시장 통합 플랫폼",
    "description": "초고속 AI 시장 분석 및 자율 거래 시스템",
    "processing_speed": "0.00003초 (30마이크로초)",
    "daily_transactions": 285000000,
    "markets_connected": 47,
    "prediction_accuracy": "94.7%",
    "annual_efficiency": "연간 15.2조 원 시장 효율화"
}

MARKET_SECTORS = [
    {"id": "stock", "name": "주식시장", "icon": "📈", "daily_volume": "25조 원"},
    {"id": "bond", "name": "채권시장", "icon": "📊", "daily_volume": "18조 원"},
    {"id": "forex", "name": "외환시장", "icon": "💱", "daily_volume": "42조 원"},
    {"id": "commodity", "name": "원자재시장", "icon": "🛢️", "daily_volume": "8조 원"},
    {"id": "crypto", "name": "디지털자산", "icon": "🪙", "daily_volume": "3조 원"},
    {"id": "derivatives", "name": "파생상품", "icon": "📉", "daily_volume": "35조 원"},
    {"id": "realestate", "name": "부동산", "icon": "🏠", "daily_volume": "2조 원"}
]

FPGA_SPECS = {
    "chip_model": "OpenHash FPGA X1000",
    "cores": 16000,
    "clock_speed": "500MHz",
    "latency": "30μs",
    "throughput": "10억 연산/초",
    "power_consumption": "45W",
    "advantage": "GPU 대비 100배 빠른 거래 처리"
}

SCENARIOS = [
    {
        "icon": "⚡",
        "title": "초저지연 거래",
        "problem": "기존 시스템 거래 지연 50ms, 고빈도 거래에서 손실 발생",
        "solution": "FPGA 가속으로 30μs 거래 처리, 시장 기회 실시간 포착",
        "savings": "거래 효율 1,600배 향상"
    },
    {
        "icon": "🤖",
        "title": "AI 시장 예측",
        "problem": "인간 분석가 한계, 복잡한 시장 패턴 파악 어려움",
        "solution": "AI가 47개 시장 실시간 분석, 94.7% 정확도 예측",
        "savings": "투자 수익률 34% 향상"
    },
    {
        "icon": "🛡️",
        "title": "시장 이상 탐지",
        "problem": "시세 조종, 내부자 거래 탐지에 수일 소요",
        "solution": "AI가 실시간 거래 패턴 분석, 이상 거래 0.001초 내 탐지",
        "savings": "시장 조작 피해 97% 감소"
    },
    {
        "icon": "⚖️",
        "title": "자동 가격 균형",
        "problem": "시장 간 가격 차이로 비효율 발생",
        "solution": "AI가 47개 시장 가격 실시간 조정, 최적 균형 유지",
        "savings": "시장 효율성 89% 향상"
    }
]

AGENTS = [
    {"id": "market_analyst", "name": "📈 시장 분석 Agent"},
    {"id": "trading_advisor", "name": "💹 거래 자문 Agent"},
    {"id": "risk_manager", "name": "🛡️ 리스크 관리 Agent"},
    {"id": "portfolio_optimizer", "name": "📊 포트폴리오 Agent"},
    {"id": "regulation_monitor", "name": "⚖️ 규제 모니터 Agent"}
]

@app.route('/api/market/info', methods=['GET'])
def get_info():
    return jsonify(SYSTEM_INFO)

@app.route('/api/market/sectors', methods=['GET'])
def get_sectors():
    return jsonify({"sectors": MARKET_SECTORS})

@app.route('/api/market/fpga-specs', methods=['GET'])
def get_fpga_specs():
    return jsonify({"fpga": FPGA_SPECS})

@app.route('/api/market/scenarios', methods=['GET'])
def get_scenarios():
    return jsonify({"scenarios": SCENARIOS})

@app.route('/api/market/agents', methods=['GET'])
def get_agents():
    return jsonify({"agents": AGENTS})

@app.route('/api/market/consultation', methods=['POST', 'OPTIONS'])
def consultation():
    if request.method == 'OPTIONS':
        return '', 204
    
    if not client:
        return jsonify({"response": "⚠️ API 키가 설정되지 않았습니다."}), 200
    
    try:
        data = request.json
        message = data.get('message', '')
        agent_type = data.get('agent_type', 'market_analyst')
        
        prompts = {
            "market_analyst": "당신은 AI 시장 분석 전문가입니다. 주식, 채권, 외환, 원자재 등 다양한 시장을 분석합니다. 투자 권유가 아닌 정보 제공임을 명시하세요.",
            "trading_advisor": "당신은 거래 자문 AI입니다. 거래 전략, 시장 타이밍, 진입/청산 포인트를 분석합니다. 투자 결정은 본인 책임임을 안내하세요.",
            "risk_manager": "당신은 리스크 관리 AI입니다. 포트폴리오 위험 분석, 헤지 전략, 손절매 기준을 안내합니다.",
            "portfolio_optimizer": "당신은 포트폴리오 최적화 AI입니다. 자산 배분, 분산 투자, 리밸런싱 전략을 제안합니다.",
            "regulation_monitor": "당신은 금융 규제 모니터링 AI입니다. 시장 규제, 공시 의무, 거래 제한 사항을 안내합니다."
        }
        
        system_prompt = prompts.get(agent_type, prompts["market_analyst"])
        system_prompt += "\n\n이 정보는 교육 목적이며, 실제 투자 결정은 전문가 상담 후 본인 판단으로 하시기 바랍니다."
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            system=system_prompt,
            messages=[{"role": "user", "content": message}]
        )
        
        return jsonify({"response": response.content[0].text})
        
    except Exception as e:
        return jsonify({"response": f"오류: {str(e)}"}), 500

@app.route('/api/market/realtime-data', methods=['GET'])
def realtime_data():
    market_data = {
        "timestamp": "2025-11-24T07:55:00Z",
        "kospi": {"value": 2534.21, "change": 1.23, "volume": "8.2조"},
        "kosdaq": {"value": 821.45, "change": -0.45, "volume": "5.1조"},
        "usd_krw": {"value": 1325.50, "change": -0.32},
        "wti_oil": {"value": 78.45, "change": 1.15},
        "gold": {"value": 2045.30, "change": 0.82},
        "bitcoin": {"value": 97250000, "change": 2.34}
    }
    
    return jsonify({"data": market_data})

@app.route('/api/market/analyze-stock', methods=['POST'])
def analyze_stock():
    data = request.json
    symbol = data.get('symbol', 'SAMSUNG')
    
    analysis = {
        "symbol": symbol,
        "name": "삼성전자",
        "current_price": 72500,
        "target_price": 85000,
        "recommendation": "매수",
        "ai_score": 78.5,
        "technical_indicators": {
            "rsi": 45.2,
            "macd": "상승 전환",
            "moving_avg_20": 71200,
            "moving_avg_60": 69800,
            "support": 70000,
            "resistance": 75000
        },
        "fundamental": {
            "per": 12.5,
            "pbr": 1.2,
            "roe": 15.3,
            "dividend_yield": 2.1
        },
        "ai_prediction": {
            "1week": {"price": 73500, "confidence": 82},
            "1month": {"price": 76000, "confidence": 75},
            "3month": {"price": 82000, "confidence": 65}
        },
        "risks": [
            "반도체 시장 경쟁 심화",
            "환율 변동 리스크",
            "글로벌 경기 둔화 우려"
        ]
    }
    
    return jsonify({"analysis": analysis})

@app.route('/api/market/detect-anomaly', methods=['POST'])
def detect_anomaly():
    data = request.json
    
    anomalies = [
        {
            "id": "ANO-2025-001",
            "type": "급등 이상",
            "symbol": "XXX제약",
            "detected_at": "2025-11-24T07:45:32Z",
            "description": "30분 내 15% 급등, 거래량 평소 대비 800% 증가",
            "risk_level": "높음",
            "recommendation": "투자 주의 필요"
        },
        {
            "id": "ANO-2025-002",
            "type": "대량 매도",
            "symbol": "YYY전자",
            "detected_at": "2025-11-24T07:52:15Z",
            "description": "주요 주주 대량 매도 포착",
            "risk_level": "중간",
            "recommendation": "동향 모니터링"
        }
    ]
    
    return jsonify({
        "anomalies": anomalies,
        "scan_time": "0.00003초",
        "markets_scanned": 47
    })

@app.route('/api/market/optimize-portfolio', methods=['POST'])
def optimize_portfolio():
    data = request.json
    risk_tolerance = data.get('risk_tolerance', 'medium')
    
    portfolio = {
        "risk_profile": risk_tolerance,
        "expected_return": "8.5%",
        "expected_volatility": "12.3%",
        "sharpe_ratio": 0.69,
        "allocation": [
            {"asset": "국내주식", "weight": 35, "expected_return": 12},
            {"asset": "해외주식", "weight": 25, "expected_return": 10},
            {"asset": "채권", "weight": 25, "expected_return": 4},
            {"asset": "대체투자", "weight": 10, "expected_return": 7},
            {"asset": "현금", "weight": 5, "expected_return": 2}
        ],
        "rebalancing": "분기별 권장",
        "disclaimer": "이 포트폴리오는 참고용이며, 실제 투자는 전문가 상담 후 결정하세요."
    }
    
    return jsonify({"portfolio": portfolio})

if __name__ == '__main__':
    logger.info("🚀 자율 시장 통합 플랫폼 백엔드 시작 (포트 5015)")
    app.run(host='0.0.0.0', port=5015, debug=False)
