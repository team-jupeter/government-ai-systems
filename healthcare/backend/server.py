from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os
import json
import hashlib
import random
import time
from datetime import datetime

app = Flask(__name__)
CORS(app)

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

# =====================================================
# 기존 엔드포인트 (유지)
# =====================================================

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "ok", 
        "service": "openhash-healthcare-system",
        "version": "2.0",
        "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/start-healthcare-simulation', methods=['POST'])
def start_simulation():
    try:
        data = request.json
        patient_name = data.get('patient_name', '김민수')
        patient_age = data.get('patient_age', 45)
        
        prompt = f"""당신은 AI 의료 시스템 전문가입니다. 다음 환자 사례를 분석하여 JSON 형식으로 응답하세요.

환자 정보:
- 이름: {patient_name}
- 나이: {patient_age}세
- 기저질환: 당뇨병 전단계, 고혈압 가족력
- 생활습관: 운동 부족, 불규칙한 식사

다음 JSON 형식으로 응답하세요:
{{
  "five_dimensional_analysis": {{"physiological": 0.35, "genetic": 0.25, "environmental": 0.20, "psychological": 0.15, "age": 0.05}},
  "diagnostic_accuracy": 0.99,
  "long_term_prediction": {{
    "short_term": {{"confidence": 0.96, "period": "1-6개월", "risk": "중등도"}},
    "mid_term": {{"confidence": 0.87, "period": "7개월-10년", "risk": "고위험"}},
    "long_term": {{"confidence": 0.73, "period": "11-30년", "risk": "당뇨병 발생 가능성 높음"}}
  }},
  "chi_score": 84.5,
  "recommendations": [
    {{"title": "운동 프로그램", "description": "주 3회 이상 유산소 운동", "priority": "높음"}},
    {{"title": "식단 관리", "description": "저염식 및 균형잡힌 영양 섭취", "priority": "높음"}}
  ]
}}"""

        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            messages=[{"role": "user", "content": prompt}]
        )
        
        response_text = message.content[0].text
        if '```json' in response_text:
            response_text = response_text.split('```json')[1].split('```')[0].strip()
        elif '```' in response_text:
            response_text = response_text.split('```')[1].split('```')[0].strip()
        
        result = json.loads(response_text)
        return jsonify(result), 200
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

# =====================================================
# 신규 엔드포인트: AI 의사 상담 시뮬레이션
# =====================================================

@app.route('/ai-consultation', methods=['POST'])
def ai_consultation():
    try:
        data = request.json
        symptoms = data.get('symptoms', '')
        age = data.get('age', 30)
        gender = data.get('gender', '남성')
        medical_history = data.get('medical_history', [])
        pdv_records = data.get('pdv_records', [])
        
        history_text = ', '.join(medical_history) if medical_history else '특이사항 없음'
        pdv_text = '\n'.join([f"- {r.get('date', '')}: {r.get('diagnosis', '')} ({r.get('hospital', '')})" for r in pdv_records]) if pdv_records else '기록 없음'
        
        prompt = f"""당신은 오픈해시 기반 권역 의료 통합 시스템의 AI 의료 상담 보조입니다.

【환자 정보】
- 나이: {age}세
- 성별: {gender}
- 기저질환: {history_text}

【프라이빗 데이터 금고(PDV) 과거 기록】
{pdv_text}

【현재 증상】
{symptoms}

다음 JSON 형식으로 응답하세요:
{{
  "symptom_summary": "증상 요약 (2-3문장)",
  "initial_assessment": [
    {{"condition": "가능한 원인 1", "probability": 0.0-1.0, "description": "설명"}},
    {{"condition": "가능한 원인 2", "probability": 0.0-1.0, "description": "설명"}}
  ],
  "recommended_actions": ["권장 조치 1", "권장 조치 2", "권장 조치 3"],
  "facility_type": "1차/2차/3차 의료기관 중 선택",
  "facility_recommendation": "구체적 권장 (예: 내과 의원, 대학병원 응급실 등)",
  "urgency_level": 1-5,
  "urgency_description": "응급도 설명",
  "precautions": ["주의사항 1", "주의사항 2"],
  "disclaimer": "본 상담은 참고용이며, 정확한 진단은 의료진의 직접 진찰이 필요합니다."
}}

응급도 기준: 1=일반(1주 내 진료), 2=주의(2-3일 내), 3=관심필요(24시간 내), 4=긴급(즉시 병원), 5=응급(119 호출)"""

        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            messages=[{"role": "user", "content": prompt}]
        )
        
        response_text = message.content[0].text
        if '```json' in response_text:
            response_text = response_text.split('```json')[1].split('```')[0].strip()
        elif '```' in response_text:
            response_text = response_text.split('```')[1].split('```')[0].strip()
        
        result = json.loads(response_text)
        result['consultation_id'] = hashlib.sha256(f"{symptoms}{time.time()}".encode()).hexdigest()[:16]
        result['timestamp'] = datetime.now().isoformat()
        
        return jsonify(result), 200
        
    except Exception as e:
        print(f"AI Consultation Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

# =====================================================
# 신규 엔드포인트: PDV 진료 기록 생성
# =====================================================

@app.route('/pdv/create-record', methods=['POST'])
def pdv_create_record():
    try:
        data = request.json
        
        record = {
            "record_id": hashlib.sha256(f"{time.time()}{random.random()}".encode()).hexdigest()[:12],
            "timestamp": datetime.now().isoformat(),
            "who": data.get('patient_name', '익명'),
            "when": data.get('visit_date', datetime.now().strftime('%Y-%m-%d')),
            "where": data.get('hospital', ''),
            "what": data.get('diagnosis', ''),
            "how": data.get('treatment', ''),
            "why": data.get('symptoms', ''),
            "amount": data.get('cost', 0),
            "counterparty": data.get('doctor', ''),
            "prescription": data.get('prescription', []),
            "test_results": data.get('test_results', [])
        }
        
        record_json = json.dumps(record, ensure_ascii=False, sort_keys=True)
        record_hash = hashlib.sha256(record_json.encode()).hexdigest()
        
        rehash1 = hashlib.sha256(f"{record_hash}{record['timestamp']}".encode()).hexdigest()
        rehash2 = hashlib.sha256(rehash1.encode()).hexdigest()
        
        layer_value = int(rehash2[:4], 16) % 100
        if layer_value < 70:
            selected_layer = 1
            layer_name = "Edge Device (보건소)"
        elif layer_value < 90:
            selected_layer = 2
            layer_name = "Edge Server (대학병원)"
        elif layer_value < 99:
            selected_layer = 3
            layer_name = "Core Engine (국가)"
        else:
            selected_layer = 4
            layer_name = "Cloud Archive (영구)"
        
        return jsonify({
            "success": True,
            "record": record,
            "openhash": {
                "original_hash": record_hash,
                "rehash_1": rehash1,
                "rehash_2": rehash2,
                "layer_value": layer_value,
                "selected_layer": selected_layer,
                "layer_name": layer_name,
                "block_number": random.randint(1000000, 9999999),
                "energy_consumed_kwh": round(random.uniform(0.001, 0.005), 4),
                "processing_time_ms": round(random.uniform(10, 50), 2)
            },
            "message": f"진료 기록이 PDV에 저장되고 Layer {selected_layer}에 해시가 기록되었습니다."
        }), 200
        
    except Exception as e:
        print(f"PDV Create Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

# =====================================================
# 신규 엔드포인트: 교차 검증 시뮬레이션
# =====================================================

@app.route('/pdv/verify', methods=['POST'])
def pdv_verify():
    try:
        data = request.json
        patient_record = data.get('patient_record', {})
        hospital_record = data.get('hospital_record', {})
        
        patient_json = json.dumps(patient_record, ensure_ascii=False, sort_keys=True)
        hospital_json = json.dumps(hospital_record, ensure_ascii=False, sort_keys=True)
        
        h_patient = hashlib.sha256(patient_json.encode()).hexdigest()
        h_hospital = hashlib.sha256(hospital_json.encode()).hexdigest()
        
        metadata = f"{patient_record.get('visit_date', '')}{patient_record.get('hospital', '')}"
        h_cross = hashlib.sha256(f"{h_patient}{h_hospital}{metadata}".encode()).hexdigest()
        
        is_match = (h_patient == h_hospital)
        
        return jsonify({
            "verification_id": hashlib.sha256(f"{time.time()}".encode()).hexdigest()[:12],
            "timestamp": datetime.now().isoformat(),
            "patient_hash": h_patient,
            "hospital_hash": h_hospital,
            "cross_hash": h_cross,
            "is_match": is_match,
            "status": "교차 검증 완료 ✓" if is_match else "불일치 감지 ⚠️",
            "message": "환자와 병원의 기록이 일치합니다." if is_match else "기록 불일치가 감지되었습니다. 분쟁 해결 프로세스를 개시합니다.",
            "blockchain_comparison": {
                "bitcoin_tps": 7,
                "ethereum_tps": 15,
                "openhash_tps": 25907,
                "energy_saving_percent": 98.5
            }
        }), 200
        
    except Exception as e:
        print(f"PDV Verify Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

# =====================================================
# 신규 엔드포인트: 오픈해시 계층 선택 시뮬레이션
# =====================================================

@app.route('/openhash/select-layer', methods=['POST'])
def openhash_select_layer():
    try:
        data = request.json
        input_data = data.get('data', str(time.time()))
        
        original_hash = hashlib.sha256(input_data.encode()).hexdigest()
        timestamp = datetime.now().isoformat()
        
        rehash1 = hashlib.sha256(f"{original_hash}{timestamp}".encode()).hexdigest()
        rehash2 = hashlib.sha256(rehash1.encode()).hexdigest()
        
        layer_value = int(rehash2[:4], 16) % 100
        
        if layer_value < 70:
            layer = {"number": 1, "name": "Edge Device", "description": "226개 시군구 보건소 노드", "probability": "70%"}
        elif layer_value < 90:
            layer = {"number": 2, "name": "Edge Server", "description": "43개 권역별 대학병원 노드", "probability": "20%"}
        elif layer_value < 99:
            layer = {"number": 3, "name": "Core Engine", "description": "국가 의료정보원 노드", "probability": "9%"}
        else:
            layer = {"number": 4, "name": "Cloud Archive", "description": "영구 보관소", "probability": "1%"}
        
        return jsonify({
            "input_data": input_data[:50] + "..." if len(input_data) > 50 else input_data,
            "original_hash": original_hash,
            "timestamp": timestamp,
            "rehash_1": rehash1,
            "rehash_2": rehash2,
            "layer_value": layer_value,
            "selected_layer": layer,
            "layer_distribution": {
                "layer_1": {"range": "0-69", "probability": "70%", "nodes": "226개 보건소"},
                "layer_2": {"range": "70-89", "probability": "20%", "nodes": "43개 대학병원"},
                "layer_3": {"range": "90-98", "probability": "9%", "nodes": "1개 국가노드"},
                "layer_4": {"range": "99", "probability": "1%", "nodes": "영구보관소"}
            }
        }), 200
        
    except Exception as e:
        print(f"Layer Selection Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

# =====================================================
# 신규 엔드포인트: 활동 증명서 발급
# =====================================================

@app.route('/certificate/generate', methods=['POST'])
def generate_certificate():
    try:
        data = request.json
        patient_name = data.get('patient_name', '홍길동')
        record_type = data.get('record_type', '진료')
        records = data.get('records', [])
        purpose = data.get('purpose', '보험 청구')
        
        cert_id = hashlib.sha256(f"{patient_name}{time.time()}".encode()).hexdigest()[:16].upper()
        
        record_hashes = []
        prev_hash = "0" * 64
        for i, record in enumerate(records):
            record_json = json.dumps(record, ensure_ascii=False, sort_keys=True)
            current_hash = hashlib.sha256(f"{prev_hash}{record_json}".encode()).hexdigest()
            record_hashes.append({
                "index": i + 1,
                "record_summary": record.get('summary', f'기록 {i+1}'),
                "hash": current_hash,
                "prev_hash": prev_hash
            })
            prev_hash = current_hash
        
        merkle_root = hashlib.sha256("".join([r['hash'] for r in record_hashes]).encode()).hexdigest()
        
        return jsonify({
            "certificate": {
                "id": f"CERT-{cert_id}",
                "issue_date": datetime.now().isoformat(),
                "patient_name_masked": patient_name[0] + "*" * (len(patient_name) - 1),
                "record_type": record_type,
                "record_count": len(records),
                "purpose": purpose,
                "validity_period": "발급일로부터 30일"
            },
            "verification": {
                "merkle_root": merkle_root,
                "hash_chain": record_hashes,
                "bls_signature": hashlib.sha256(f"BLS{merkle_root}".encode()).hexdigest()[:32],
                "verification_url": f"https://verify.openhash-medical.kr/cert/{cert_id}"
            },
            "openhash_proof": {
                "block_number": random.randint(1000000, 9999999),
                "timestamp": datetime.now().isoformat(),
                "layer_recorded": random.choice([1, 2, 3]),
                "consensus_nodes": random.randint(10, 50),
                "tamper_proof": True
            },
            "legal_notice": "본 증명서는 오픈해시 기술로 위변조가 불가능하며, 법적 증명력을 갖습니다."
        }), 200
        
    except Exception as e:
        print(f"Certificate Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("🏥 오픈해시 기반 권역 의료 통합 시스템 백엔드 시작")
    print(f"⏰ 시작 시간: {datetime.now().isoformat()}")
    print("📡 포트: 5003")
    app.run(host='0.0.0.0', port=5005, debug=False)
