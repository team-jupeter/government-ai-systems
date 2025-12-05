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
        logging.FileHandler('/tmp/nis.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

RESPONSES = {
    'spy_report': """간첩 신고에 대해 안내해 드리겠습니다.

📞 긴급 신고: 111 (국가정보원 신고센터, 24시간)

더 자세한 상담이 필요하시면 111로 연락주시기 바랍니다.""",
    
    'cyber_report': """사이버 공격 신고에 대해 안내해 드리겠습니다.

📞 긴급 신고: 111 (국가정보원 신고센터, 24시간)

긴급한 경우 즉시 111로 연락주시기 바랍니다.""",
    
    'terror_report': """테러 정보 제보에 대해 안내해 드리겠습니다.

📞 긴급 신고: 111 (국가정보원 신고센터, 24시간)""",
    
    'industrial_spy': """산업기밀 유출에 대해 안내해 드리겠습니다.

📞 신고: 111 (국가정보원 신고센터)""",
    
    'default': """안녕하세요. 국가정보원 AI 상담 시스템입니다.

📞 긴급 신고: 111 (24시간 운영)

구체적으로 어떤 도움이 필요하신가요?"""
}

@app.route('/health', methods=['GET'])
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': 'NIS AI System',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/ai/chat', methods=['POST'])
def ai_chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '').lower()
        
        logger.info(f"User message: {user_message[:50]}...")
        
        if any(k in user_message for k in ['간첩', '스파이']):
            response = RESPONSES['spy_report']
        elif any(k in user_message for k in ['사이버', '해킹']):
            response = RESPONSES['cyber_report']
        elif any(k in user_message for k in ['테러']):
            response = RESPONSES['terror_report']
        elif any(k in user_message for k in ['산업', '기밀']):
            response = RESPONSES['industrial_spy']
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
    app.run(host='0.0.0.0', port=5002, debug=False)
