#!/usr/bin/env python3
"""
국가 재무제표 시스템 Backend API
포트: 5070
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import hashlib
import time
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)

# ===== 데이터 =====
ENTITIES = {
    'individuals': [
        {
            'id': 'P001',
            'name': '김철수',
            'type': 'individual',
            'region': '서울 종로구',
            'assets': 250000000,
            'liabilities': 100000000,
            'netWorth': 150000000,
            'annualIncome': 60000000
        },
        {
            'id': 'P002',
            'name': '이영희',
            'type': 'individual',
            'region': '서울 강남구',
            'assets': 450000000,
            'liabilities': 180000000,
            'netWorth': 270000000,
            'annualIncome': 85000000
        },
        {
            'id': 'P003',
            'name': '박민수',
            'type': 'individual',
            'region': '경기 성남시',
            'assets': 180000000,
            'liabilities': 60000000,
            'netWorth': 120000000,
            'annualIncome': 45000000
        },
        {
            'id': 'P004',
            'name': '정수진',
            'type': 'individual',
            'region': '부산 해운대구',
            'assets': 320000000,
            'liabilities': 140000000,
            'netWorth': 180000000,
            'annualIncome': 72000000
        }
    ],
    'businesses': [
        {
            'id': 'B001',
            'name': '테크스타트(주)',
            'type': 'business',
            'region': '서울 강남구',
            'industry': 'IT',
            'totalAssets': 5000000000,
            'totalLiabilities': 2000000000,
            'equity': 3000000000,
            'revenue': 8000000000,
            'operatingIncome': 1200000000,
            'netIncome': 900000000
        },
        {
            'id': 'B002',
            'name': '한국제조(주)',
            'type': 'business',
            'region': '경기 수원시',
            'industry': '제조',
            'totalAssets': 12000000000,
            'totalLiabilities': 5000000000,
            'equity': 7000000000,
            'revenue': 15000000000,
            'operatingIncome': 2100000000,
            'netIncome': 1600000000
        },
        {
            'id': 'B003',
            'name': '서울유통(주)',
            'type': 'business',
            'region': '서울 종로구',
            'industry': '유통',
            'totalAssets': 8000000000,
            'totalLiabilities': 3500000000,
            'equity': 4500000000,
            'revenue': 20000000000,
            'operatingIncome': 1500000000,
            'netIncome': 1100000000
        },
        {
            'id': 'B004',
            'name': '금융서비스(주)',
            'type': 'business',
            'region': '서울 여의도',
            'industry': '금융',
            'totalAssets': 50000000000,
            'totalLiabilities': 42000000000,
            'equity': 8000000000,
            'revenue': 6000000000,
            'operatingIncome': 2500000000,
            'netIncome': 1900000000
        },
        {
            'id': 'B005',
            'name': '건설개발(주)',
            'type': 'business',
            'region': '경기 화성시',
            'industry': '건설',
            'totalAssets': 18000000000,
            'totalLiabilities': 10000000000,
            'equity': 8000000000,
            'revenue': 25000000000,
            'operatingIncome': 2800000000,
            'netIncome': 2100000000
        },
        {
            'id': 'B006',
            'name': '의료법인 서울병원',
            'type': 'business',
            'region': '서울 송파구',
            'industry': '의료',
            'totalAssets': 15000000000,
            'totalLiabilities': 6000000000,
            'equity': 9000000000,
            'revenue': 12000000000,
            'operatingIncome': 1800000000,
            'netIncome': 1400000000
        }
    ]
}

TRANSACTIONS = [
    {
        'id': 'TX001',
        'from': 'B001',
        'to': 'P001',
        'type': '급여',
        'amount': 5000000,
        'date': '2024-11-25',
        'hash': 'a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890'
    },
    {
        'id': 'TX002',
        'from': 'P001',
        'to': 'B003',
        'type': '물품 구매',
        'amount': 250000,
        'date': '2024-11-26',
        'hash': 'b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890ab'
    },
    {
        'id': 'TX003',
        'from': 'P002',
        'to': 'B003',
        'type': '상품 구매',
        'amount': 150000,
        'date': '2024-11-27',
        'hash': 'c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890abc3'
    },
    {
        'id': 'TX004',
        'from': 'B004',
        'to': 'P003',
        'type': '대출',
        'amount': 50000000,
        'date': '2024-11-28',
        'hash': 'd4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890abcd4e'
    },
    {
        'id': 'TX005',
        'from': 'P004',
        'to': 'B006',
        'type': '의료비',
        'amount': 1200000,
        'date': '2024-11-29',
        'hash': 'e5f67890abcdef1234567890abcdef1234567890abcdef1234567890abcde5f6'
    }
]

# ===== API 엔드포인트 =====

@app.route('/api/health', methods=['GET'])
def health_check():
    """헬스 체크"""
    return jsonify({
        'status': 'healthy',
        'service': 'national-financial-statements',
        'port': 5070,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/entities', methods=['GET'])
def get_entities():
    """엔티티 목록 조회"""
    entity_type = request.args.get('type', 'all')
    
    if entity_type == 'individuals':
        return jsonify(ENTITIES['individuals'])
    elif entity_type == 'businesses':
        return jsonify(ENTITIES['businesses'])
    else:
        return jsonify(ENTITIES)

@app.route('/api/entities/<entity_id>', methods=['GET'])
def get_entity(entity_id):
    """특정 엔티티 조회"""
    # 개인 검색
    for individual in ENTITIES['individuals']:
        if individual['id'] == entity_id:
            return jsonify(individual)
    
    # 기업 검색
    for business in ENTITIES['businesses']:
        if business['id'] == entity_id:
            return jsonify(business)
    
    return jsonify({'error': 'Entity not found'}), 404

@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    """거래 내역 조회"""
    entity_id = request.args.get('entity_id')
    
    if entity_id:
        # 특정 엔티티의 거래만 필터링
        filtered = [
            tx for tx in TRANSACTIONS 
            if tx['from'] == entity_id or tx['to'] == entity_id
        ]
        return jsonify(filtered)
    
    return jsonify(TRANSACTIONS)

@app.route('/api/verify-hash', methods=['POST'])
def verify_hash():
    """Hash 검증"""
    data = request.get_json()
    
    if not data or 'transaction_id' not in data:
        return jsonify({'error': 'transaction_id is required'}), 400
    
    transaction_id = data['transaction_id']
    
    # 거래 찾기
    transaction = next((tx for tx in TRANSACTIONS if tx['id'] == transaction_id), None)
    
    if not transaction:
        return jsonify({'error': 'Transaction not found'}), 404
    
    # Hash 재계산 (시뮬레이션)
    original_hash = transaction['hash']
    
    # 실제로는 거래 데이터를 SHA-256으로 해싱
    transaction_data = f"{transaction['from']}{transaction['to']}{transaction['amount']}{transaction['date']}"
    calculated_hash = hashlib.sha256(transaction_data.encode()).hexdigest()
    
    # 시뮬레이션: 10% 확률로 불일치
    is_valid = random.random() > 0.1
    
    if is_valid:
        return jsonify({
            'valid': True,
            'transaction_id': transaction_id,
            'original_hash': original_hash,
            'calculated_hash': calculated_hash,
            'message': 'Hash 검증 성공 - 위변조 없음'
        })
    else:
        return jsonify({
            'valid': False,
            'transaction_id': transaction_id,
            'original_hash': original_hash,
            'calculated_hash': 'different_hash_value',
            'message': 'Hash 불일치 - 위변조 의심'
        })

@app.route('/api/layer-stats', methods=['GET'])
def get_layer_stats():
    """Layer 통계 조회"""
    layer = request.args.get('layer', '4')
    
    stats = {
        '1': {
            'layer': 1,
            'name': '종로1동',
            'population': 12000,
            'businesses': 1500,
            'totalRevenue': 50000000000,
            'totalAssets': 150000000000
        },
        '2': {
            'layer': 2,
            'name': '종로구',
            'population': 150000,
            'businesses': 18000,
            'totalRevenue': 600000000000,
            'totalAssets': 1800000000000
        },
        '3': {
            'layer': 3,
            'name': '서울특별시',
            'population': 10000000,
            'businesses': 1200000,
            'totalRevenue': 40000000000000,
            'totalAssets': 120000000000000
        },
        '4': {
            'layer': 4,
            'name': '대한민국',
            'population': 50000000,
            'businesses': 10000000,
            'totalRevenue': 500000000000000,
            'totalAssets': 1500000000000000
        }
    }
    
    return jsonify(stats.get(layer, stats['4']))

@app.route('/api/ai-verify', methods=['POST'])
def ai_verify():
    """AI 검증 실행"""
    data = request.get_json()
    
    if not data or 'case_type' not in data:
        return jsonify({'error': 'case_type is required'}), 400
    
    case_type = data['case_type']
    
    # 검증 시뮬레이션 (2초 대기)
    time.sleep(2)
    
    results = {
        'anomaly': {
            'detected': True,
            'type': 'anomaly',
            'confidence': 95.8,
            'description': '평소와 다른 패턴의 거래 감지 (10배 증가)',
            'algorithm': 'Isolation Forest',
            'actions': [
                '관련 당사자에게 알림 전송',
                '거래 일시 중단',
                '관할 기관 자동 통보',
                '상세 조사 대기'
            ]
        },
        'tampering': {
            'detected': True,
            'type': 'tampering',
            'confidence': 100,
            'description': 'Hash 불일치 및 데이터 조작 시도 탐지',
            'algorithm': 'SHA-256 재검증',
            'actions': [
                '위변조된 데이터 격리',
                '원본 Hash와 비교',
                '법적 조치 준비',
                '감사 로그 기록'
            ]
        },
        'pattern': {
            'detected': True,
            'type': 'pattern',
            'confidence': 87.3,
            'description': '다수 계좌 순환 거래 패턴 식별 (22회)',
            'algorithm': 'LSTM 시계열 분석',
            'actions': [
                '금융정보분석원(FIU) 통보',
                '관련 계좌 모니터링 강화',
                '거래 패턴 상세 분석',
                '법적 절차 개시'
            ]
        },
        'cross-verify': {
            'detected': True,
            'type': 'cross-verify',
            'confidence': 100,
            'description': '거래 당사자 간 기록 불일치 (송금 1,000만원 vs 수령 500만원)',
            'algorithm': '교차 검증 알고리즘',
            'actions': [
                '양측 데이터 동결',
                '원인 분석 시작',
                '관련 당사자 확인 요청',
                '시스템 로그 검토'
            ]
        }
    }
    
    result = results.get(case_type, results['anomaly'])
    result['timestamp'] = datetime.now().isoformat()
    
    return jsonify(result)

@app.route('/api/hash-distribution', methods=['POST'])
def hash_distribution():
    """Hash 분산 시뮬레이션"""
    data = request.get_json()
    
    if not data or 'hash_value' not in data:
        return jsonify({'error': 'hash_value is required'}), 400
    
    hash_value = data['hash_value']
    
    # Hash를 숫자로 변환하여 확률적 Layer 선택
    hash_int = int(hash_value[:8], 16) % 100
    
    if hash_int < 70:
        layer = 1
        probability = 70
    elif hash_int < 90:
        layer = 2
        probability = 20
    elif hash_int < 98:
        layer = 3
        probability = 8
    else:
        layer = 4
        probability = 2
    
    return jsonify({
        'hash': hash_value,
        'hash_int': hash_int,
        'selected_layer': layer,
        'probability': probability,
        'timestamp': datetime.now().isoformat()
    })

# ===== 메인 =====
if __name__ == '__main__':
    print("=" * 50)
    print("국가 재무제표 시스템 Backend API")
    print("포트: 5070")
    print("=" * 50)
    app.run(host='0.0.0.0', port=5070, debug=True)
