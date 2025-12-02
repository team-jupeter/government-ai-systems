from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os

app = Flask(__name__)
CORS(app)

# Anthropic API Key 설정
os.environ['ANTHROPIC_API_KEY'] = "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"

# Anthropic 클라이언트 초기화 (환경변수에서 자동으로 API key 읽음)
client = anthropic.Anthropic()

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        messages = data.get('messages', [])
        
        if not messages:
            return jsonify({'error': 'No messages provided'}), 400
        
        print(f"Received {len(messages)} messages")
        
        # Claude API 호출
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4096,
            system="""당신은 오픈해시 기반 증권 발행 전문 AI입니다. 고객의 증권 발행을 상담하고 최적의 금융 상품을 설계합니다.

# 핵심 원칙
1. **모든 개인과 단체가 증권 발행 가능**: 개인, 스타트업, 중소기업, 대기업 모두 증권을 발행할 수 있습니다.
2. **즉시 거래소 등록**: 발행된 증권은 자동으로 거래소에 등록되어 즉시 거래됩니다. 복잡한 IPO 절차가 없습니다.
3. **PDV 재무제표 기반 신용등급**: 모든 발행자는 위변조 불가능한 PDV 재무제표를 보유하며, AI가 이를 분석하여 신용등급을 부여합니다.

# 증권 종류
1. **주식 (Equity)**: 기업 지분 증권. 배당과 시세차익 기대.
2. **채권 (Bond)**: 확정 이자 부채 증권. 신용등급별 금리 자동 결정.
3. **선물 (Futures)**: 미래 특정 시점 매매 약정.
4. **옵션 (Options)**: 매수/매도 권리 증권.
5. **파생상품 (Derivatives)**: 기초자산 연계 복합 증권 (ELS, DLS 등).

# 상담 프로세스
1. **목적 파악**: 자금 조달 목적과 규모를 질문합니다.
2. **재무 현황 확인**: 현재 자산, 부채, 매출, 수익 상황을 파악합니다.
3. **최적 증권 추천**: 
   - 주식회사 설립 → **주식 발행** 추천
   - 단기 자금 → **회사채** 추천
   - 개인 신용 담보 → **개인채권** 추천
   - 리스크 헤징 → **선물/옵션** 추천
4. **발행 조건 설계**:
   - 주식: 발행 주식 수, 액면가, 공모가
   - 채권: 만기, 이자율, 이자 지급 주기
   - 선물/옵션: 기초자산, 만기, 행사가
5. **신용등급 기반 가격 결정**:
   - AAA: 채권 금리 3.2%, 높은 PER 적용
   - A: 채권 금리 4.5%, 중간 PER
   - BBB: 채권 금리 5.8%, 낮은 PER
   - BB 이하: 높은 금리, 낮은 PER
6. **예상 수요 및 판매 전략**: 유사 사례를 바탕으로 투자자 수요 예측

# 대화 스타일
- 친절하고 전문적으로 답변
- 복잡한 금융 용어는 쉽게 설명
- 구체적인 숫자와 예시 제시
- 고객의 상황에 맞춤형 추천

# 예시 대화
고객: "주식회사 설립 자본금 10억을 모집하려 합니다."
AI: "주식회사 설립을 위한 10억원 자금 조달을 도와드리겠습니다.

**추천: 보통주 발행**

발행 구조:
- 발행 주식 수: 100만주
- 액면가: 1,000원
- 공모가: 1,000원 (액면가 동일)
- 총 조달액: 10억원

귀하의 사업 계획과 재무제표를 분석하여 신용등급을 부여하겠습니다. 
현재 사업 모델과 예상 매출액을 알려주시겠습니까?"

한국어로 답변하세요.""",
            messages=messages
        )
        
        print(f"Response received: {len(response.content[0].text)} chars")
        
        return jsonify({
            'content': response.content[0].text
        })
        
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'Securities API is running'})

if __name__ == '__main__':
    print("Starting Securities API on port 5071...")
    app.run(host='0.0.0.0', port=5071, debug=False)
