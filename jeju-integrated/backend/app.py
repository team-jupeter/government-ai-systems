from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import requests
from datetime import datetime
import re

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
        category = data.get('category', '')
        service = data.get('service', '')
        
        # 상품 검색 요청 감지
        last_message = messages[-1]['content'] if messages else ''
        is_product_search = any(keyword in last_message for keyword in ['검색', '추천', '상품', '구매', '가격', '어디서'])
        
        # 시스템 메시지 추가
        if category == '구매' or is_product_search:
            system_content = f'''당신은 제주특별자치도 AI 포털의 쇼핑 도우미입니다. 
사용자가 상품을 검색하면 다음 형식으로 답변하세요:

1. 상품명과 간단한 설명
2. 예상 가격대
3. 구매 가능한 쇼핑몰 (네이버쇼핑, 쿠팡, G마켓 등)

**중요: 각 쇼핑몰은 반드시 다음 형식으로 링크를 포함하세요:**
- [네이버쇼핑](https://search.shopping.naver.com/search/all?query=상품명)
- [쿠팡](https://www.coupang.com/np/search?q=상품명)
- [G마켓](http://gsearch.gmarket.co.kr/search?query=상품명)

예시:
삼성 갤럭시 S24를 검색하셨네요!

**가격:** 약 1,000,000원~1,200,000원
**주요 스펙:** 6.2인치, Snapdragon 8 Gen 3

**구매처:**
- [네이버쇼핑](https://search.shopping.naver.com/search/all?query=갤럭시S24)
- [쿠팡](https://www.coupang.com/np/search?q=갤럭시S24)
- [G마켓](http://gsearch.gmarket.co.kr/search?query=갤럭시S24)'''
        else:
            system_content = f'당신은 제주특별자치도 AI 포털의 친절한 상담원입니다. {f"사용자의 전화번호는 {user_phone}입니다." if user_phone else ""} 사용자가 요청하는 {category} {service} 서비스에 대해 안내하고 도와주세요.'
        
        system_message = {
            'role': 'system',
            'content': system_content
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
