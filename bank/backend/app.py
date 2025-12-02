from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os
import logging

app = Flask(__name__)
CORS(app)

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('/tmp/bank.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Claude API 클라이언트
client = anthropic.Anthropic(
    api_key=os.environ.get("ANTHROPIC_API_KEY")
)

# 시스템 프롬프트
SYSTEM_PROMPT = """당신은 오픈해시 은행 시스템의 전문 AI 상담원입니다.

## 역할
- 오픈해시 은행 시스템의 기능과 서비스를 친절하고 정확하게 안내
- 전화번호 기반 계정, PDV 통합, 오픈해시 기록 등 핵심 기능 설명
- 예금, 대출, 신용평가, 자산관리 등 은행 서비스 상담

## 핵심 정보
1. **전화번호 ID 시스템**: 휴대전화번호만으로 즉시 계좌 개설 가능
2. **개인정보금고(PDV)**: 모든 계좌 정보를 암호화하여 PDV에 자동 저장
3. **재무제표 연동**: 예금 잔액은 재무제표의 디지털 화폐 항목과 동일
4. **오픈해시 기록**: 모든 거래를 4계층 구조로 불변 기록 (L1: 100%, L2: 25%, L3: 12.5%, L4: 6.25%)
5. **성능**: 0.015ms 처리 속도, 99.4% 검증 정확도, 88.6% 전력 절감

## 응답 스타일
- 간결하고 전문적인 톤
- 기술적 내용은 쉽게 풀어서 설명
- 필요시 구체적인 수치와 예시 제공
- 한국어로 응답
"""

@app.route('/health', methods=['GET'])
def health():
    """헬스체크 엔드포인트"""
    return jsonify({
        'status': 'healthy',
        'service': 'bank',
        'port': 5004
    })

@app.route('/api/ai/chat', methods=['POST'])
def ai_chat():
    """Claude AI 상담 엔드포인트"""
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': '메시지를 입력해주세요.'}), 400
        
        logger.info(f"AI 상담 요청: {user_message[:50]}...")
        
        # Claude API 호출
        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1000,
            system=SYSTEM_PROMPT,
            messages=[
                {"role": "user", "content": user_message}
            ]
        )
        
        response_text = message.content[0].text
        logger.info(f"AI 응답 생성 완료: {len(response_text)} 글자")
        
        return jsonify({
            'response': response_text,
            'model': 'claude-sonnet-4-20250514'
        })
        
    except anthropic.APIError as e:
        logger.error(f"Claude API 오류: {str(e)}")
        return jsonify({
            'error': 'AI 서비스 일시 오류',
            'details': str(e)
        }), 500
    except Exception as e:
        logger.error(f"서버 오류: {str(e)}")
        return jsonify({
            'error': '서버 내부 오류',
            'details': str(e)
        }), 500

@app.route('/api/deposit/info', methods=['GET'])
def deposit_info():
    """예금 정보 조회 (샘플)"""
    return jsonify({
        'service': '예금',
        'processing_time': '0.015ms',
        'fee': '무료',
        'availability': '24/7',
        'features': [
            '전화번호 기반 계좌',
            'PDV 자동 저장',
            '재무제표 실시간 연동',
            '오픈해시 4계층 기록'
        ]
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004, debug=False)
