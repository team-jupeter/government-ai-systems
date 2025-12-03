from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import anthropic

app = Flask(__name__)
CORS(app)

# Claude API 클라이언트
anthropic_client = None
try:
    api_key = os.environ.get('ANTHROPIC_API_KEY')
    if api_key:
        anthropic_client = anthropic.Anthropic(api_key=api_key)
except Exception as e:
    print(f"⚠️ Claude API 초기화 실패: {e}")

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "service": "openhash-system"}), 200

@app.route('/api/consultation', methods=['POST'])
def consultation():
    """AI 상담 엔드포인트"""
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({"success": False, "error": "메시지가 없습니다"}), 400
        
        if not anthropic_client:
            return jsonify({
                "success": True,
                "response": "죄송합니다. 현재 AI 상담 서비스가 일시적으로 사용 불가합니다. 관리자에게 문의해주세요."
            }), 200
        
        # Claude API 호출
        system_prompt = """당신은 오픈해시(OpenHash) 기술 전문가입니다. 다음 정보를 바탕으로 정확하고 전문적으로 답변하세요:

**오픈해시 핵심 개념:**
- 블록체인을 대체하는 차세대 분산 신뢰 기술
- SHA-256 재해싱 기반 확률적 계층 선택 알고리즘 사용
- 4계층 아키텍처: Layer 1(Edge Device), Layer 2(Edge Server), Layer 3(Core Engine), Layer 4(Cloud Archive)
- 작업증명/지분증명 불필요, LPBFT/PBFT 합의 메커니즘 사용

**성능 지표:**
- TPS: 초당 424만 트랜잭션 처리
- 에너지 효율: 비트코인 대비 98.5% 절감 (121 TWh → 1.8 TWh/년)
- 트랜잭션 확인 시간: 0.05초
- 확장성: 노드 수 증가에 비례한 선형 확장

**확률적 계층 선택:**
- Layer 1: 70% 확률 (0-178 값)
- Layer 2: 20% 확률 (179-229 값)
- Layer 3: 10% 확률 (230-255 값)
- SHA-256 재해싱 후 마지막 2바이트로 계층 결정

**보안:**
- CRYSTALS-Dilithium 포스트퀀텀 암호화
- Merkle Tree 기반 데이터 무결성 검증
- BLS 서명, 계층 간 상호 검증

답변은 명확하고 전문적이며, 필요시 숫자와 구체적 예시를 포함하세요."""

        message = anthropic_client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1000,
            system=system_prompt,
            messages=[
                {"role": "user", "content": user_message}
            ]
        )
        
        response_text = message.content[0].text
        
        return jsonify({
            "success": True,
            "response": response_text
        }), 200
        
    except Exception as e:
        print(f"❌ 상담 오류: {e}")
        return jsonify({
            "success": True,
            "response": "죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        }), 200

if __name__ == '__main__':
    print("⛓️  오픈해시 시스템 백엔드 시작 (포트 5037)")
    print(f"📡 Claude API: {'활성화' if anthropic_client else '비활성화'}")
    app.run(host='0.0.0.0', port=5037, debug=False)
