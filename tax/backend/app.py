from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import random
import hashlib
import os
import sys

app = Flask(__name__)
CORS(app)

# Claude API 클라이언트 초기화
client = None
api_key = None

def init_anthropic():
    global client, api_key
    try:
        import anthropic
        
        # 환경 변수에서 API 키 로드
        api_key = os.environ.get('ANTHROPIC_API_KEY')
        
        # .bashrc에서도 확인 (백업)
        if not api_key:
            bashrc_path = os.path.expanduser('~/.bashrc')
            if os.path.exists(bashrc_path):
                with open(bashrc_path, 'r') as f:
                    for line in f:
                        if 'ANTHROPIC_API_KEY' in line and 'export' in line:
                            try:
                                key_part = line.split('=')[1].strip().strip('"').strip("'")
                                if key_part and key_part.startswith('sk-'):
                                    api_key = key_part
                                    os.environ['ANTHROPIC_API_KEY'] = api_key
                                    break
                            except:
                                pass
        
        if api_key and api_key.startswith('sk-'):
            client = anthropic.Anthropic(api_key=api_key)
            print(f"✅ Claude API 연결 성공 (키: {api_key[:10]}...)")
            return True
        else:
            print("⚠️ ANTHROPIC_API_KEY가 설정되지 않았거나 유효하지 않습니다")
            return False
    except ImportError:
        print("⚠️ anthropic 패키지가 설치되지 않았습니다")
        return False
    except Exception as e:
        print(f"⚠️ Claude API 초기화 실패: {e}")
        return False

# 초기화 실행
init_anthropic()

# 세무 AI 시스템 프롬프트
TAX_SYSTEM_PROMPT = """당신은 대한민국 국세청의 OpenHash 기반 AI 세무상담 전문가입니다.

## 역할
- 세금 신고, 절세 방법, 세법 해석에 대한 전문적인 상담 제공
- 종합소득세, 법인세, 부가가치세, 양도소득세, 상속증여세 등 모든 세목 상담
- 세법 조문 인용 및 관련 예규/판례 안내

## 지식 범위
- 국세기본법, 소득세법, 법인세법, 부가가치세법 등 18개 세법
- 시행령 352개, 시행규칙 487개, 예규 612개
- 최신 세법 개정 사항 반영

## 응답 원칙
1. 정확한 세법 조문을 근거로 답변
2. 실무적이고 구체적인 조언 제공
3. 복잡한 내용은 단계별로 설명
4. 전문 용어 사용 시 쉬운 설명 병행
5. 불확실한 사항은 세무서/세무사 상담 권유

## 주의사항
- 탈세나 불법적 조세회피 조언 금지
- 개별 사안의 최종 판단은 관할 세무서 확인 권고
- 응답 마지막에 참조한 세법 조문 명시

한국어로 친절하고 전문적으로 답변해주세요."""

# 시뮬레이션 데이터
REGIONS = ['서울', '경기', '부산', '인천', '대전', '광주', '대구', '울산', '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주']
TAX_TYPES = ['종합소득세', '법인세', '부가가치세', '원천세', '양도소득세', '상속세', '증여세', '교통세', '주세', '인지세']

def generate_hash():
    return hashlib.sha256(str(datetime.now().timestamp()).encode()).hexdigest()

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "ok",
        "service": "tax-automation-system",
        "version": "2.1.0",
        "timestamp": datetime.now().isoformat(),
        "ai_enabled": client is not None,
        "api_key_present": api_key is not None and len(api_key) > 0,
        "features": ["openhash", "ai_detection", "fpga_acceleration", "layer_network", "claude_ai"]
    }), 200

@app.route('/ai/chat', methods=['POST'])
def ai_chat():
    """Claude API를 사용한 실제 AI 세무상담"""
    global client
    
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        history = data.get('history', [])
        
        if not user_message:
            return jsonify({"error": "메시지가 비어있습니다", "response": "메시지를 입력해주세요."}), 400
        
        # 클라이언트가 없으면 다시 초기화 시도
        if not client:
            init_anthropic()
        
        if not client:
            return jsonify({
                "response": "AI 서비스에 연결할 수 없습니다. 관리자에게 문의하세요.\n\n일반적인 세무 상담은 국세청 126 콜센터(국번없이 126)를 이용해주세요.",
                "references": [],
                "error": "API 클라이언트 미초기화"
            })
        
        # 대화 히스토리 구성
        messages = []
        for msg in history[-6:]:
            if msg.get('role') in ['user', 'assistant'] and msg.get('content'):
                messages.append({
                    "role": msg['role'],
                    "content": msg['content']
                })
        messages.append({"role": "user", "content": user_message})
        
        # Claude API 호출
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            system=TAX_SYSTEM_PROMPT,
            messages=messages
        )
        
        ai_response = response.content[0].text
        
        # 참조 세법 추출
        references = []
        law_keywords = ['소득세법', '법인세법', '부가가치세법', '국세기본법', '상속세법', '증여세법', '조세특례제한법', '국세징수법']
        for law in law_keywords:
            if law in ai_response:
                references.append(law)
        
        return jsonify({
            "response": ai_response,
            "references": list(set(references))[:5],
            "model": "claude-sonnet-4-20250514",
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        error_msg = str(e)
        print(f"AI Chat Error: {error_msg}")
        
        # 특정 오류 메시지에 따른 처리
        if 'authentication' in error_msg.lower() or 'api_key' in error_msg.lower():
            return jsonify({
                "response": "API 인증에 실패했습니다. 관리자에게 문의하세요.",
                "references": [],
                "error": "인증 오류"
            }), 401
        elif 'rate' in error_msg.lower() or 'limit' in error_msg.lower():
            return jsonify({
                "response": "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
                "references": [],
                "error": "요청 제한"
            }), 429
        else:
            return jsonify({
                "response": f"일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
                "references": [],
                "error": error_msg
            }), 500

@app.route('/stats', methods=['GET'])
def get_stats():
    return jsonify({
        "total_tax_collected": 336500000000000,
        "today_collection": random.randint(100000000000, 150000000000),
        "tps": round(350 + random.random() * 50, 2),
        "active_transactions": random.randint(12000, 18000),
        "pending_returns": random.randint(2800000, 2900000),
        "ai_detection_rate": 99.2,
        "registered_taxpayers": {"individuals": 50000000, "businesses": 3247891},
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
        r = random.random()
        layer = 1 if r < 0.65 else 2 if r < 0.9 else 3 if r < 0.99 else 4
        tx = {
            "id": f"TX-{generate_hash()[:16]}",
            "type": random.choice(TAX_TYPES),
            "amount": random.randint(100000, 500000000),
            "region": random.choice(REGIONS),
            "layer": layer,
            "layer_name": ['읍면동', '시군구', '광역시도', '국가'][layer - 1],
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
                "total_assets": int(base_revenue * 1.7),
                "total_liabilities": int(base_revenue * 0.8),
                "equity": int(base_revenue * 0.9)
            },
            "cash_flow": {
                "operating": int(base_revenue * 0.12),
                "investing": int(base_revenue * -0.08),
                "financing": int(base_revenue * -0.02)
            }
        },
        "credit_score": round(random.uniform(0.7, 0.98), 2),
        "last_updated": datetime.now().isoformat(),
        "openhash_verified": True
    })

@app.route('/taxlaw/search', methods=['GET'])
def search_taxlaw():
    query = request.args.get('q', '')
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
            {"level": 1, "name": "읍면동", "nodes": 3496, "tps": 63.34, "probability": "65%"},
            {"level": 2, "name": "시군구", "nodes": 226, "tps": 292.12, "probability": "25%"},
            {"level": 3, "name": "광역시도", "nodes": 17, "tps": 374.76, "probability": "9%"},
            {"level": 4, "name": "국가", "nodes": 1, "tps": 1500, "probability": "1%"}
        ]
    })

@app.route('/nts/financial-statements', methods=['GET'])
def get_nts_financials():
    return jsonify({
        "entity": "대한민국 국세청",
        "fiscal_year": 2024,
        "income_statement": {
            "tax_revenue": 336500000000000,
            "total_revenue": 339000000000000,
            "operating_expenses": 3200000000000
        },
        "realtime_metrics": {
            "today_collection": random.randint(100000000000, 150000000000),
            "pending_refunds": random.randint(500000000000, 800000000000)
        },
        "openhash_verified": True,
        "last_updated": datetime.now().isoformat()
    })

if __name__ == '__main__':
    print("")
    print("=" * 60)
    print("🚀 OpenHash 국세 행정 자동화 시스템 백엔드 v2.1.0")
    print("=" * 60)
    print(f"📊 AI 활성화: {'✅ 예' if client else '❌ 아니오'}")
    print(f"🔑 API 키: {'✅ 설정됨' if api_key else '❌ 미설정'}")
    print("=" * 60)
    print("")
    app.run(host='0.0.0.0', port=5020, debug=False)
