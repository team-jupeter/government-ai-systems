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
        logging.FileHandler('/tmp/cio.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# AI 응답 템플릿 (공수처 맞춤)
RESPONSES = {
    'default': """안녕하세요. 고위공직자범죄수사처 AI 상담 시스템입니다.

고위공직자 범죄 신고, 수사 진행 상황 조회, 법률 상담 등을 도와드립니다.
무엇을 도와드릴까요?""",
    
    '신고': """고위공직자 범죄 신고를 접수하시려면 다음 정보가 필요합니다:

1. 신고 대상자 정보 (이름, 직위, 소속)
2. 범죄 혐의 내용 (직권남용, 수뢰, 정치자금법 위반 등)
3. 증거 자료 (문서, 녹음, 사진 등)
4. 신고인 연락처

신고는 익명으로도 가능하며, 모든 신고 내역은 오픈해시로 안전하게 보호됩니다.""",
    
    '수사': """수사 진행 상황은 사건번호로 조회하실 수 있습니다.

현재 진행 중인 주요 수사:
- 직권남용 사건: 85건
- 수뢰 사건: 43건
- 정치자금법 위반: 15건

평균 수사 기간은 42일이며, AI가 증거 분석을 지원하여 신속한 수사가 가능합니다.""",
    
    '법률': """공수처 관할 범죄는 다음과 같습니다:

1. 직권남용권리행사방해죄
2. 뇌물죄 (수뢰, 증뢰)
3. 알선수재죄
4. 정치자금법 위반
5. 공직선거법 위반
6. 허위공문서 작성

대상: 국회의원, 법관, 검사, 3급 이상 공무원, 광역단체장, 경무관 이상 경찰 등"""
}

# ⚠️ 중요: /health와 /api/health 두 개 모두 필요!
@app.route('/health', methods=['GET'])
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': '고위공직자범죄수사처 AI System',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/ai/chat', methods=['POST'])
def ai_chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '').lower()
        
        logger.info(f"User message: {user_message[:50]}...")
        
        # 키워드 기반 응답 선택
        if '신고' in user_message or '고발' in user_message:
            response = RESPONSES['신고']
        elif '수사' in user_message or '진행' in user_message or '조회' in user_message:
            response = RESPONSES['수사']
        elif '법률' in user_message or '범죄' in user_message or '관할' in user_message:
            response = RESPONSES['법률']
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
    # ⚠️ 중요: 포트 5073 사용!
    app.run(host='0.0.0.0', port=5073, debug=False)
