#!/usr/bin/env python3
"""국가정보원 AI 자동화 시스템 백엔드"""
import os
import json
import hashlib
import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# OpenHash 체인 (메모리 저장)
hash_chain = []

def generate_hash(data):
    return hashlib.sha3_256(json.dumps(data, sort_keys=True, default=str).encode()).hexdigest()

def add_to_chain(action, data):
    prev_hash = hash_chain[-1]['hash'] if hash_chain else '0' * 64
    block = {
        'index': len(hash_chain),
        'timestamp': datetime.datetime.now().isoformat(),
        'action': action,
        'data': data,
        'prev_hash': prev_hash,
        'hash': generate_hash({'action': action, 'data': data, 'prev_hash': prev_hash, 'timestamp': datetime.datetime.now().isoformat()})
    }
    hash_chain.append(block)
    return block

# 초기 블록 생성
add_to_chain('시스템 초기화', {'agency': '국가정보원', 'id': 'national-intelligence'})

@app.route('/health', methods=['GET'])
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'service': 'national-intelligence-ai-system', 'agency': '국가정보원'})

@app.route('/hash-chain', methods=['GET'])
@app.route('/api/hash-chain', methods=['GET'])
def get_hash_chain():
    limit = request.args.get('limit', 10, type=int)
    return jsonify({'chain': hash_chain[-limit:]})

@app.route('/ai/chat', methods=['POST'])
@app.route('/api/ai/chat', methods=['POST'])
def ai_chat():
    data = request.get_json()
    message = data.get('message', '')
    
    # Claude API 호출
    api_key = os.environ.get('ANTHROPIC_API_KEY')
    if not api_key:
        return jsonify({'response': 'AI 서비스가 설정되지 않았습니다.', 'error': 'no_api_key'})
    
    try:
        response = requests.post(
            'https://api.anthropic.com/v1/messages',
            headers={
                'Content-Type': 'application/json',
                'x-api-key': api_key,
                'anthropic-version': '2023-06-01'
            },
            json={
                'model': 'claude-sonnet-4-20250514',
                'max_tokens': 2048,
                'system': '''당신은 국가정보원의 AI 업무 보조 에이전트입니다.
                
주요 역할:
1. 국가정보원 관련 정책 및 업무 안내
2. 민원 상담 및 안내
3. 관련 법령 및 규정 설명
4. 다른 정부 부처와의 협업 지원

OpenHash 기반으로 모든 상담 내역이 투명하게 기록됩니다.
친절하고 정확하게 답변해 주세요.''',
                'messages': [{'role': 'user', 'content': message}]
            },
            timeout=60
        )
        
        if response.status_code == 200:
            result = response.json()
            ai_response = result['content'][0]['text']
            add_to_chain('AI 상담', {'query': message[:100], 'response_length': len(ai_response)})
            return jsonify({'response': ai_response})
        else:
            return jsonify({'response': f'AI 서비스 오류: {response.status_code}'})
            
    except Exception as e:
        return jsonify({'response': f'오류가 발생했습니다: {str(e)}'})

@app.route('/verify', methods=['POST'])
@app.route('/api/verify', methods=['POST'])
def verify_hash():
    data = request.get_json()
    hash_to_verify = data.get('hash', '')
    
    for block in hash_chain:
        if block['hash'] == hash_to_verify:
            return jsonify({'verified': True, 'block': block})
    
    return jsonify({'verified': False})

if __name__ == '__main__':
    print(f"🚀 국가정보원 AI 시스템 시작 (포트: 5028)")
    app.run(host='0.0.0.0', port=5028, debug=False)
