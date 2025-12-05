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
        logging.FileHandler('/tmp/nhrck.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# AI 응답 템플릿 (국가인권위원회 맞춤)
RESPONSES = {
    'default': """안녕하세요. 국가인권위원회 AI 상담 시스템입니다.

인권침해, 차별행위 진정 접수, 처리 현황 조회, 인권 상담 등을 도와드립니다.
무엇을 도와드릴까요?""",
    
    '진정': """진정을 접수하시려면 다음 정보가 필요합니다:

1. 진정인 정보 (이름, 연락처)
2. 피진정인 정보 (이름, 소속)
3. 인권침해 또는 차별행위 내용
4. 발생 일시 및 장소
5. 증거 자료

전화(국번없이 1331), 온라인, 방문 접수가 가능하며, 모든 진정은 오픈해시로 안전하게 보호됩니다.""",
    
    '조회': """진정 처리 현황은 진정번호로 조회하실 수 있습니다.

현재 처리 중인 주요 진정:
- 인권침해: 1,856건
- 차별행위: 1,245건
- 장애인차별: 289건

평균 처리 기간은 28일이며, AI가 사례 분석을 지원하여 신속한 처리가 가능합니다.""",
    
    '인권': """국가인권위원회는 다음과 같은 인권침해를 다룹니다:

1. 국가기관의 인권침해 (헌법 제10조~제22조)
2. 차별행위 (성별, 장애, 나이, 출신 등)
3. 장애인 차별
4. 고용상 연령 차별
5. 성희롱

진정은 1년 이내에 제기하셔야 하며, 무료로 진행됩니다."""
}

# ⚠️ 중요: /health와 /api/health 두 개 모두 필요!
@app.route('/health', methods=['GET'])
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': '국가인권위원회 AI System',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/ai/chat', methods=['POST'])
def ai_chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '').lower()
        
        logger.info(f"User message: {user_message[:50]}...")
        
        # 키워드 기반 응답 선택
        if '진정' in user_message or '신고' in user_message or '접수' in user_message:
            response = RESPONSES['진정']
        elif '조회' in user_message or '현황' in user_message or '확인' in user_message:
            response = RESPONSES['조회']
        elif '인권' in user_message or '차별' in user_message or '침해' in user_message:
            response = RESPONSES['인권']
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
    # ⚠️ 중요: 포트 5074 사용!
    app.run(host='0.0.0.0', port=5074, debug=False)
