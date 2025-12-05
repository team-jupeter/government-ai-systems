from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
from datetime import datetime

app = Flask(__name__)
CORS(app)

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('/tmp/kcc.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# AI 응답 템플릿
RESPONSES = {
    'default': """안녕하세요. 방송미디어통신위원회 AI 상담 시스템입니다.

방송·미디어·통신 관련 문의사항을 도와드리겠습니다.""",
    '방송': """방송 심의는 방송법과 방송심의에 관한 규정에 따라 진행됩니다.
    
주요 심의 기준:
- 공정성 및 공공성
- 품위 유지
- 청소년 보호
- 광고 규정 준수

자세한 내용은 방송통신심의위원회를 통해 확인하실 수 있습니다.""",
    '통신': """통신 서비스 관련 민원은 다음과 같이 처리됩니다:

1. 민원 접수 (전화, 온라인)
2. AI 자동 분류 및 분석
3. 담당 부서 배정
4. 처리 및 회신 (평균 1.5일)

긴급한 경우 대표전화 02-500-9000으로 연락주시기 바랍니다.""",
    'ott': """OTT 사업자 등록은 다음 절차를 따릅니다:

1. 사업계획서 제출
2. 기술 및 재무 검토
3. 심의위원회 승인
4. 사업자 등록증 발급

필요 서류 및 자세한 절차는 방미통위 누리집에서 확인하실 수 있습니다."""
}

@app.route('/health', methods=['GET'])
@app.route('/api/health', methods=['GET'])
def health_check():
    """헬스체크 엔드포인트"""
    return jsonify({
        'status': 'healthy',
        'service': '방송미디어통신위원회 AI System',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/ai/chat', methods=['POST'])
def ai_chat():
    """AI 상담 엔드포인트"""
    try:
        data = request.get_json()
        user_message = data.get('message', '').lower()
        
        logger.info(f"User message: {user_message[:50]}...")
        
        # 키워드 기반 응답 선택
        if '방송' in user_message or '심의' in user_message:
            response = RESPONSES['방송']
        elif '통신' in user_message or '민원' in user_message:
            response = RESPONSES['통신']
        elif 'ott' in user_message or '사업자' in user_message:
            response = RESPONSES['ott']
        else:
            response = RESPONSES['default']
        
        return jsonify({
            'status': 'success',
            'response': response,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': '처리 중 오류가 발생했습니다.'
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5072, debug=False)
