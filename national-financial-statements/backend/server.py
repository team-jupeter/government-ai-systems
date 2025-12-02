from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os

app = Flask(__name__)
CORS(app)

# Claude API 클라이언트
client = anthropic.Anthropic(
    api_key=os.environ.get("ANTHROPIC_API_KEY")
)

SYSTEM_PROMPT = """당신은 국가데이터처 오픈해시 기반 통합 데이터 네트워크의 전문 상담원입니다.

[핵심 정보]
- 발명의 명칭: 오픈해시 기반 국가데이터처 통합 데이터 네트워크 구축 방법 및 시스템
- 특허출원: 2025년 11월 12일

[5계층 하이브리드 구조]
1. Layer 0: 국가데이터처 통합 관리 센터 (3개 노드)
   - 대전·서울·부산
   - 통계 기준 설정, 데이터 거버넌스, 정책 수립
   - TPS: 500

2. Layer 1: 기관·단말 Edge 클라우드 (503만+ 노드)
   - 중앙부처 18개, 지자체 226개
   - 병원 3,500개, 학교 24,000개, 교통 302개, 시장 1,500개
   - 개인·법인 단말기 500만+
   - TPS: 4,024,000

3. Layer 2: 광역시도·이동통신 Edge (32개 노드)
   - 17개 광역시도 + KT/SK/LG U+ 15개
   - TPS: 4,448

4. Layer 3: 국가 Core Engine (10개 노드)
   - 국가정보자원관리원, AWS GovCloud, Azure Government
   - PBFT 변형 합의 (7/10 BLS 다중 서명)
   - TPS: 1,420

5. Layer 4: 국가·글로벌 Archive (6개 노드)
   - 국가기록원, AWS Glacier, Azure, Google Cloud
   - TPS: 208,082

[주요 성과]
- 총 TPS: 4,238,450 (약 424만)
- 평균 지연: 3.2ms, P99 지연: 18ms
- 합의 성공률: 99.97%
- 에너지 절감: 98.5% (비트코인 대비 21만 배)
- 5년 TCO 절감: 1,463억 원 (70.4%)
- 부처 간 연계 비용: 450억 원 → 0원

[핵심 기술]
1. 확률적 계층 선택: SHA-512 기반 노드 타입별 동적 할당
2. AI 멀티에이전트: Llama 3.1 Fine-tuned, PIPA/AI법/GDPR 2.3초 내 자동 검증
3. 통계 신뢰성: 블록체인 기록으로 정치적 압력 차단
4. 부처 간 연계: Open API 자동화
5. 개인 데이터 주권: 해시(137 bytes)만 전송, 원본은 단말기 보관
6. 양자 내성 암호: CRYSTALS-Dilithium NIST Level 3

[국제 표준]
- W3C DID v1.0
- ITU-T Y.4805
- ISO/IEC 22989
- GDPR (EU 2016/679)
- APEC CBPR
- UN Statistical Commission

사용자의 질문에 정확하고 전문적으로 답변하세요. 기술적 세부사항이 필요한 경우 명세서의 내용을 활용하세요.
"""

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok', 'service': 'national-data-registry'})

@app.route('/api/consultation', methods=['POST'])
def consultation():
    try:
        data = request.json
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'Message is required'}), 400

        # Claude API 호출
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            system=SYSTEM_PROMPT,
            messages=[
                {"role": "user", "content": user_message}
            ]
        )
        
        reply = response.content[0].text
        
        return jsonify({
            'reply': reply,
            'model': 'claude-sonnet-4-20250514'
        })
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5026, debug=True)
