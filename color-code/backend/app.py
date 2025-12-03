from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
import json
import re

app = Flask(__name__)
CORS(app)

ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY')

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'api_key_exists': bool(ANTHROPIC_API_KEY)})

@app.route('/api/auto-color', methods=['POST'])
def auto_color():
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        if not text:
            return jsonify({'success': False, 'error': '텍스트를 입력해주세요'}), 400
        
        if not ANTHROPIC_API_KEY:
            return jsonify({'success': False, 'error': 'API Key가 없습니다'}), 500
        
        headers = {
            'Content-Type': 'application/json',
            'x-api-key': ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01'
        }
        
        system_prompt = """색상 이론 전문가입니다. 텍스트 각 글자에 0-63 범위의 색상 인덱스를 할당하세요.

원칙:
1. 첫 글자는 항상 32 (기준색)
2. 의미와 연관된 색상 (바다→파란색, 불→빨간색, 나무→녹색)
3. 인접 글자 간 색상 조화
4. 가독성 고려

반드시 JSON 형식만 답변:
{"colors": [32, 15, 42], "reasoning": "설명"}"""
        
        claude_response = requests.post(
            'https://api.anthropic.com/v1/messages',
            headers=headers,
            json={
                'model': 'claude-sonnet-4-20250514',
                'max_tokens': 1000,
                'system': system_prompt,
                'messages': [{'role': 'user', 'content': f'"{text}" 각 글자에 색상 할당하세요. 글자 수는 {len(text)}개입니다.'}]
            },
            timeout=30
        )
        
        if claude_response.status_code == 200:
            response_data = claude_response.json()
            assistant_message = response_data['content'][0]['text']
            
            # JSON 추출
            json_match = re.search(r'\{[^}]*"colors"[^}]*\}', assistant_message, re.DOTALL)
            if json_match:
                result = json.loads(json_match.group(0))
            else:
                assistant_message = re.sub(r'```json\s*', '', assistant_message)
                assistant_message = re.sub(r'```\s*$', '', assistant_message)
                result = json.loads(assistant_message.strip())
            
            colors = result.get('colors', [])
            colors = [min(max(int(c), 0), 63) for c in colors]
            
            if len(colors) > 0:
                colors[0] = 32
            
            while len(colors) < len(text):
                colors.append(32)
            colors = colors[:len(text)]
            
            return jsonify({
                'success': True,
                'colors': colors,
                'reasoning': result.get('reasoning', 'AI가 색상을 자동 할당했습니다.')
            })
        else:
            return jsonify({'success': False, 'error': f'API 오류: {claude_response.status_code}'}), 500
            
    except Exception as e:
        print(f"오류: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    print("🚀 색상 코드 백엔드 시작 (포트 5001)")
    if ANTHROPIC_API_KEY:
        print(f"✅ API Key: {ANTHROPIC_API_KEY[:10]}...{ANTHROPIC_API_KEY[-4:]}")
    else:
        print("⚠️ API Key 없음")
    app.run(host='0.0.0.0', port=5001, debug=False)
