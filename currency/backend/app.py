from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Claude API 클라이언트
ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY', '')
client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY) if ANTHROPIC_API_KEY else None

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'service': 'currency'}), 200

@app.route('/api/currency/consultation', methods=['POST', 'OPTIONS'])
def consultation():
    if request.method == 'OPTIONS':
        return '', 204
    
    if not client:
        return jsonify({
            "response": "⚠️ API 키가 설정되지 않았습니다. 관리자에게 문의하세요."
        }), 200
    
    try:
        data = request.json
        message = data.get('message', '')
        
        if not message:
            return jsonify({
                "response": "질문을 입력해주세요."
            }), 400
        
        system_prompt = """당신은 'FPGA 및 AI 기반 초고속·저전력 통합 디지털 화폐 및 자율 금융 서비스 시스템'의 전문 상담 AI입니다.

시스템 핵심 사양:
- 처리 속도: 0.015ms (기존 대비 3,333배 향상)
- AI 검증 정확도: 99.4% (BERT + CNN + LSTM 앙상블)
- 전력 절감: GPU 대비 88.6%
- FPGA: 400MHz 동작, BN254 타원곡선 페어링

주요 기능:
1. 실시간 재무제표 자동생성 (99% 정확도, 분식회계 원천 차단)
2. 세무 완전 자동화 (개인소득세 0.002ms, 법인세 0.003ms)
3. 크로스체인 연동 (Lock-and-Mint, 60초 이하)
4. 통합 금융 서비스 (은행+보험+증권)
5. 글로벌 규제 자동 준수 (50개국 이상)

경제적 효과:
- 개인: 연 492만원 절감
- 중소기업: 연 2,580만원 절감
- 금융기관: 지점당 12.75억원 절감

친절하고 전문적으로 답변하며, 기술적 질문에는 구체적인 수치와 함께 설명하세요."""
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            system=system_prompt,
            messages=[{"role": "user", "content": message}]
        )
        
        return jsonify({
            "response": response.content[0].text
        })
        
    except Exception as e:
        logger.error(f"Consultation error: {str(e)}")
        return jsonify({
            "response": f"죄송합니다. 오류가 발생했습니다: {str(e)}"
        }), 500

if __name__ == '__main__':
    logger.info("🚀 FPGA 및 AI 기반 통합 디지털 화폐 백엔드 시작 (포트 5001)")
    app.run(host='0.0.0.0', port=5001, debug=False)
