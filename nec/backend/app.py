from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
from datetime import datetime

app = Flask(__name__)
CORS(app)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('/tmp/nec.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

RESPONSES = {
    'default': """안녕하세요. 국가교육위원회 AI 상담 시스템입니다.

국가교육발전계획, 교육과정 기준, 정책 심의, 국민 의견 수렴 등을 도와드립니다.
무엇을 도와드릴까요?""",
    
    '교육과정': """국가교육위원회는 국가교육과정의 기준과 내용을 심의하고 고시합니다.

주요 업무:
- 교육과정 기준 수립
- 교과서 검토 및 승인
- 평가 기준 마련

2022 개정 교육과정이 현재 적용 중이며, AI가 교육 데이터를 분석하여 개선 방향을 제안합니다.""",
    
    '정책': """국가교육위원회는 10년 단위 국가교육발전계획을 수립합니다.

심의 분야:
- 학제 및 교원 정책
- 대학 입학 정책
- 학급당 적정 학생 수
- 교육 제도 및 여건 개선

모든 정책은 사회적 합의를 통해 결정되며, 평균 심의 기간은 12일입니다.""",
    
    '참여': """국민 여러분의 의견을 적극 수렴하고 있습니다.

참여 방법:
- 온라인 의견 제출
- 공청회 및 토론회
- 설문조사 참여
- 국민참여단 활동

월평균 12,450명이 온라인으로 의견을 제출하고 있으며, 모든 의견은 AI가 분류하여 검토됩니다."""
}

@app.route('/health', methods=['GET'])
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': '국가교육위원회 AI System',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/ai/chat', methods=['POST'])
def ai_chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '').lower()
        
        logger.info(f"User message: {user_message[:50]}...")
        
        if '교육과정' in user_message or '교과' in user_message or '과정' in user_message:
            response = RESPONSES['교육과정']
        elif '정책' in user_message or '계획' in user_message or '심의' in user_message:
            response = RESPONSES['정책']
        elif '참여' in user_message or '의견' in user_message or '수렴' in user_message:
            response = RESPONSES['참여']
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
    app.run(host='0.0.0.0', port=5075, debug=False)
