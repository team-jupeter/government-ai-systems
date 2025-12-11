from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('/tmp/jeju-integrated.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

DEEPSEEK_API_KEY = 'sk-8ccf979aea6d423ca8cefeeb3b9f60b3'
DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'jeju-integrated'
    })

@app.route('/api/health', methods=['GET'])
def api_health():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'jeju-integrated-api'
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        
        if not data or 'messages' not in data:
            return jsonify({'error': '메시지가 필요합니다.'}), 400
        
        messages = data.get('messages', [])
        user_phone = data.get('userPhone', None)
        
        # 시스템 메시지 추가
        system_message = {
            'role': 'system',
            'content': f'당신은 제주특별자치도 AI 포털의 친절한 상담원입니다. {f"사용자의 전화번호는 {user_phone}입니다." if user_phone else ""} 사용자가 요청하는 행정 서비스에 대해 안내하고 도와주세요.'
        }
        
        full_messages = [system_message] + messages
        
        # DeepSeek API 호출
        response = requests.post(
            DEEPSEEK_API_URL,
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {DEEPSEEK_API_KEY}'
            },
            json={
                'model': 'deepseek-chat',
                'messages': full_messages,
                'temperature': 0.7,
                'max_tokens': 2000
            },
            timeout=30
        )
        
        if response.status_code != 200:
            logger.error(f'DeepSeek API error: {response.status_code} - {response.text}')
            return jsonify({'error': 'AI 서비스 오류가 발생했습니다.'}), 500
        
        result = response.json()
        ai_message = result['choices'][0]['message']['content']
        
        return jsonify({
            'message': ai_message,
            'timestamp': datetime.now().isoformat()
        })
        
    except requests.exceptions.Timeout:
        logger.error('DeepSeek API timeout')
        return jsonify({'error': '응답 시간이 초과되었습니다.'}), 504
    except Exception as e:
        logger.error(f'Chat error: {str(e)}')
        return jsonify({'error': '오류가 발생했습니다.'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5008, debug=False)
