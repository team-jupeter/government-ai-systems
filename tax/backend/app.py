from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import random
import hashlib
import json

app = Flask(__name__)
CORS(app)

# 시뮬레이션 데이터
REGIONS = ['서울', '경기', '부산', '인천', '대전', '광주', '대구', '울산', '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주']
TAX_TYPES = ['종합소득세', '법인세', '부가가치세', '원천세', '양도소득세', '상속세', '증여세', '교통세', '주세', '인지세']
LAYERS = {
    1: {'name': '읍면동', 'probability': 0.65},
    2: {'name': '시군구', 'probability': 0.25},
    3: {'name': '광역시도', 'probability': 0.09},
    4: {'name': '국가', 'probability': 0.01}
}

def generate_hash():
    return hashlib.sha256(str(datetime.now().timestamp()).encode()).hexdigest()

def select_layer():
    r = random.random()
    cumulative = 0
    for layer, data in LAYERS.items():
        cumulative += data['probability']
        if r <= cumulative:
            return layer
    return 1

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "ok",
        "service": "tax-automation-system",
        "version": "2.0.0",
        "timestamp": datetime.now().isoformat(),
        "features": {
            "openhash": True,
            "ai_detection": True,
            "fpga_acceleration": True,
            "layer_network": True
        }
    }), 200

@app.route('/stats', methods=['GET'])
def get_stats():
    return jsonify({
        "total_tax_collected": 336500000000000,
        "today_collection": random.randint(100000000000, 150000000000),
        "tps": round(350 + random.random() * 50, 2),
        "active_transactions": random.randint(12000, 18000),
        "pending_returns": random.randint(2800000, 2900000),
        "ai_detection_rate": 99.2,
        "registered_taxpayers": {
            "individuals": 50000000,
            "businesses": 3247891
        },
        "layer_stats": {
            "layer1": {"nodes": 3496, "transactions": random.randint(800000, 900000)},
            "layer2": {"nodes": 226, "transactions": random.randint(200000, 250000)},
            "layer3": {"nodes": 17, "transactions": random.randint(80000, 100000)},
            "layer4": {"nodes": 1, "transactions": random.randint(10000, 15000)}
        }
    })

@app.route('/transactions/stream', methods=['GET'])
def get_transaction_stream():
    count = int(request.args.get('count', 10))
    transactions = []
    
    for _ in range(count):
        layer = select_layer()
        tx = {
            "id": f"TX-{generate_hash()[:16]}",
            "type": random.choice(TAX_TYPES),
            "amount": random.randint(100000, 500000000),
            "region": random.choice(REGIONS),
            "layer": layer,
            "layer_name": LAYERS[layer]['name'],
            "taxpayer_type": random.choice(['개인', '법인']),
            "taxpayer_id": f"{'P' if random.random() < 0.7 else 'C'}-{generate_hash()[:8].upper()}",
            "timestamp": datetime.now().isoformat(),
            "hash_chain": f"0x{generate_hash()}",
            "verified": True,
            "verification_time_ms": round(random.random() * 0.05, 4)
        }
        transactions.append(tx)
    
    return jsonify({"transactions": transactions})

@app.route('/taxpayer/<taxpayer_id>/financial-statements', methods=['GET'])
def get_financial_statements(taxpayer_id):
    # 시뮬레이션 재무제표 데이터
    base_revenue = random.randint(50000000, 5000000000)
    
    return jsonify({
        "taxpayer_id": taxpayer_id,
        "type": "개인" if taxpayer_id.startswith('P') else "법인",
        "financial_statements": {
            "income_statement": {
                "revenue": base_revenue,
                "cost_of_sales": int(base_revenue * 0.6),
                "gross_profit": int(base_revenue * 0.4),
                "operating_expenses": int(base_revenue * 0.25),
                "operating_income": int(base_revenue * 0.15),
                "net_income": int(base_revenue * 0.1)
            },
            "balance_sheet": {
                "assets": {
                    "current_assets": int(base_revenue * 0.5),
                    "non_current_assets": int(base_revenue * 1.2),
                    "total": int(base_revenue * 1.7)
                },
                "liabilities": {
                    "current_liabilities": int(base_revenue * 0.3),
                    "non_current_liabilities": int(base_revenue * 0.5),
                    "total": int(base_revenue * 0.8)
                },
                "equity": int(base_revenue * 0.9)
            },
            "cash_flow": {
                "operating": int(base_revenue * 0.12),
                "investing": int(base_revenue * -0.08),
                "financing": int(base_revenue * -0.02),
                "net_change": int(base_revenue * 0.02)
            },
            "equity_statement": {
                "beginning_equity": int(base_revenue * 0.8),
                "net_income": int(base_revenue * 0.1),
                "dividends": int(base_revenue * -0.02),
                "ending_equity": int(base_revenue * 0.88)
            },
            "retained_earnings": {
                "beginning_balance": int(base_revenue * 0.5),
                "net_income": int(base_revenue * 0.1),
                "dividends": int(base_revenue * -0.02),
                "ending_balance": int(base_revenue * 0.58)
            }
        },
        "credit_score": round(random.uniform(0.7, 0.98), 2),
        "last_updated": datetime.now().isoformat(),
        "openhash_verified": True
    })

@app.route('/taxlaw/search', methods=['GET'])
def search_taxlaw():
    query = request.args.get('q', '')
    
    # 시뮬레이션 세법 검색 결과
    laws = [
        {"code": "소득세법 제14조", "title": "과세표준의 계산", "relevance": 0.95},
        {"code": "법인세법 제13조", "title": "각 사업연도의 소득", "relevance": 0.88},
        {"code": "부가가치세법 제29조", "title": "과세표준", "relevance": 0.82},
        {"code": "국세기본법 제26조의2", "title": "기한후신고", "relevance": 0.75}
    ]
    
    return jsonify({
        "query": query,
        "results": laws[:3] if query else laws,
        "total_laws": 18,
        "total_regulations": 352,
        "total_rulings": 612
    })

@app.route('/layers/hierarchy', methods=['GET'])
def get_layer_hierarchy():
    return jsonify({
        "layers": [
            {
                "level": 1,
                "name": "읍면동",
                "description": "개인/소규모 사업자 관할",
                "nodes": 3496,
                "coverage": "전국 읍면동 세무서",
                "tps": 63.34,
                "response_time_ms": 124.82,
                "tax_types": ["종합소득세", "부가가치세", "간이과세"]
            },
            {
                "level": 2,
                "name": "시군구",
                "description": "중소기업/법인 관할, Layer 1 취합",
                "nodes": 226,
                "coverage": "전국 시군구 세무서",
                "tps": 292.12,
                "response_time_ms": 126.62,
                "tax_types": ["법인세", "원천세", "특별소비세"]
            },
            {
                "level": 3,
                "name": "광역시도",
                "description": "대기업 관할, Layer 2 취합",
                "nodes": 17,
                "coverage": "7개 지방국세청",
                "tps": 374.76,
                "response_time_ms": 126.45,
                "tax_types": ["대규모 집계", "국제조세", "이전가격"]
            },
            {
                "level": 4,
                "name": "국가",
                "description": "전국 총괄, 국제조세",
                "nodes": 1,
                "coverage": "국세청 본청",
                "tps": 1500,
                "response_time_ms": 50,
                "tax_types": ["OECD 국제조세", "조세조약", "상호합의절차"]
            }
        ],
        "probabilistic_distribution": {
            "layer1": 0.65,
            "layer2": 0.25,
            "layer3": 0.09,
            "layer4": 0.01
        }
    })

@app.route('/nts/financial-statements', methods=['GET'])
def get_nts_financials():
    """국세청 자체 재무제표"""
    return jsonify({
        "entity": "대한민국 국세청",
        "fiscal_year": 2024,
        "statement_date": datetime.now().isoformat(),
        "income_statement": {
            "tax_revenue": 336500000000000,
            "other_revenue": 2500000000000,
            "total_revenue": 339000000000000,
            "operating_expenses": 3200000000000,
            "net_income": 335800000000000
        },
        "balance_sheet": {
            "assets": {
                "receivables": 15200000000000,
                "equipment": 850000000000,
                "other": 2100000000000,
                "total": 18150000000000
            },
            "liabilities": {
                "refunds_payable": 8500000000000,
                "other": 1200000000000,
                "total": 9700000000000
            }
        },
        "realtime_metrics": {
            "today_collection": random.randint(100000000000, 150000000000),
            "pending_refunds": random.randint(500000000000, 800000000000),
            "active_audits": random.randint(10000, 15000)
        },
        "openhash_verified": True,
        "last_updated": datetime.now().isoformat()
    })

if __name__ == '__main__':
    print("🚀 OpenHash 국세 행정 자동화 시스템 백엔드 시작 (포트 5020)")
    print("📊 Features: OpenHash, AI Detection, FPGA Acceleration, Layer Network")
    app.run(host='0.0.0.0', port=5020, debug=False)
