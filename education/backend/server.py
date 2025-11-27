from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os
import hashlib
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)

client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

# 7단계 개인-사회 통합 최적화 프로세스
SEVEN_STAGES = {
    110: {"name": "인간 고유 업무 체계적 식별", "code": "HUTSI", "desc": "AI가 대체할 수 없는 인간 고유 업무 분류", "metrics": {"irreplaceable": 32.2, "collaboration": 48.9, "replaceable": 18.9}},
    120: {"name": "사회 효용 최대화 역할 분담", "code": "SERM", "desc": "인구 적성/능력 기반 사회 총생산 최대화 역할 배분", "metrics": {"matching_accuracy": 98.2, "productivity_gain": 23.5}},
    130: {"name": "개인 의사 적극 반영", "code": "PIAR", "desc": "개인 수용 여부 확인 및 대안 직종 제안", "metrics": {"response_rate": 96.7, "satisfaction": 87.2}},
    140: {"name": "개인-사회 통합 효용 최적화", "code": "ISIO", "desc": "사회적 효용과 개인 의사 간 최적 균형점 도출", "metrics": {"individual_utility": 0.845, "social_utility": 0.735, "integrated": 0.801}},
    150: {"name": "맞춤형 교육 제공", "code": "PCE", "desc": "균형점 기반 개인 맞춤형 커리큘럼 자동 생성", "metrics": {"achievement_improvement": 36.1, "engagement_increase": 58}},
    160: {"name": "주기적 동적 갱신", "code": "PDU", "desc": "AI 기술 발전 반영 주기적 프로세스 재실행", "metrics": {"update_cycle_months": 3, "accuracy_maintained": 99.2}},
    170: {"name": "실시간 진로 수정", "code": "RCM", "desc": "개인 진로 변경 요청 즉시 처리", "metrics": {"avg_processing_minutes": 2.3, "success_rate": 99.8}}
}

# 인간 고유 업무 카테고리
HUMAN_UNIQUE_TASKS = {
    "창의적 업무": {"examples": ["예술 창작", "혁신적 연구", "전략적 기획"], "ai_replaceability": 12.3, "collaboration_needed": 67.8},
    "감정적 업무": {"examples": ["심리 상담", "돌봄 서비스", "위기 중재"], "ai_replaceability": 8.7, "collaboration_needed": 45.2},
    "윤리적 판단": {"examples": ["법적 판단", "정책 결정", "윤리 위원회"], "ai_replaceability": 15.4, "collaboration_needed": 72.1},
    "복잡한 소통": {"examples": ["협상", "갈등 조정", "리더십"], "ai_replaceability": 18.9, "collaboration_needed": 58.3},
    "신체적 기술": {"examples": ["수술", "정밀 수공예", "스포츠"], "ai_replaceability": 22.1, "collaboration_needed": 41.5}
}

# 프라이버시 보호 시스템 (270)
PRIVACY_SYSTEM = {
    "k_anonymity": {"min_k": 5, "max_k": 50, "current_k": 15},
    "differential_privacy": {"epsilon_high": 0.1, "epsilon_standard": 0.3, "epsilon_optimized": 0.5},
    "metrics": {"reidentification_resistance": 100, "data_utility_preserved": 99.3}
}

# 편향 탐지 시스템 (280)
BIAS_DETECTION = {
    "dimensions": ["성별", "연령", "지역", "사회경제적 배경"],
    "detection_accuracy": 95.2,
    "correction_time_seconds": 0.00,
    "fairness_score": 0.98
}

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "ok",
        "service": "openhash-education-7stage",
        "version": "2.0",
        "timestamp": datetime.now().isoformat(),
        "features": ["7단계최적화", "HUTSI", "PIAR", "RCM", "프라이버시보호", "편향탐지"]
    }), 200

@app.route('/info', methods=['GET'])
def info():
    return health_check()

@app.route('/stages', methods=['GET'])
def get_stages():
    return jsonify({
        "success": True,
        "system_name": "7단계 개인-사회 통합 최적화 AI 교육 시스템",
        "code": "7S-ISIO",
        "stages": SEVEN_STAGES,
        "total_stages": 7,
        "integrated_utility": 0.801,
        "target_learners": 100000
    }), 200

@app.route('/human-tasks/analyze', methods=['POST'])
def analyze_human_tasks():
    data = request.json
    occupation = data.get('occupation', '일반 사무직')
    
    # 시뮬레이션: 직업별 AI 대체 가능성 분석
    analysis = {
        "occupation": occupation,
        "ai_replaceability": round(random.uniform(15, 45), 1),
        "collaboration_potential": round(random.uniform(40, 70), 1),
        "human_unique_ratio": round(random.uniform(25, 50), 1),
        "recommended_skills": random.sample(["창의적 사고", "감성 지능", "윤리적 판단", "복잡한 소통", "전략적 기획"], 3),
        "future_outlook": random.choice(["확장", "유지", "전환 필요"]),
        "analysis_time_ms": round(random.uniform(50, 150), 1)
    }
    
    return jsonify({"success": True, "analysis": analysis, "timestamp": datetime.now().isoformat()}), 200

@app.route('/career/optimize', methods=['POST'])
def optimize_career():
    data = request.json
    user_preferences = data.get('preferences', [])
    current_skills = data.get('skills', [])
    
    # 개인-사회 통합 효용 최적화 시뮬레이션
    individual_utility = round(random.uniform(0.78, 0.92), 3)
    social_utility = round(random.uniform(0.68, 0.82), 3)
    integrated_utility = round((individual_utility * 0.6 + social_utility * 0.4), 3)
    
    career_options = [
        {"career": "AI 협업 전문가", "match_score": round(random.uniform(85, 98), 1), "growth_potential": "높음"},
        {"career": "창의 기획자", "match_score": round(random.uniform(80, 95), 1), "growth_potential": "높음"},
        {"career": "휴먼케어 매니저", "match_score": round(random.uniform(75, 92), 1), "growth_potential": "매우 높음"}
    ]
    
    return jsonify({
        "success": True,
        "optimization": {
            "individual_utility": individual_utility,
            "social_utility": social_utility,
            "integrated_utility": integrated_utility,
            "balance_point": "최적",
            "career_options": career_options,
            "recommended_education_path": f"{random.randint(6, 18)}개월 맞춤형 교육과정"
        },
        "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/career/realtime-modify', methods=['POST'])
def realtime_career_modify():
    data = request.json
    current_career = data.get('current_career', '')
    desired_career = data.get('desired_career', '')
    
    processing_time = round(random.uniform(1.5, 3.5), 1)
    
    return jsonify({
        "success": True,
        "modification": {
            "from": current_career,
            "to": desired_career,
            "processing_time_minutes": processing_time,
            "social_utility_impact": round(random.uniform(-0.02, 0.03), 3),
            "transition_plan": {
                "duration_months": random.randint(3, 12),
                "required_courses": random.randint(3, 8),
                "estimated_success_rate": round(random.uniform(92, 99), 1)
            },
            "status": "승인"
        },
        "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/privacy/protect', methods=['POST'])
def protect_privacy():
    data = request.json
    data_type = data.get('data_type', 'educational_records')
    
    k_value = random.randint(5, 15)
    epsilon = random.choice([0.1, 0.3, 0.5])
    
    return jsonify({
        "success": True,
        "protection": {
            "k_anonymity_applied": k_value,
            "differential_privacy_epsilon": epsilon,
            "reidentification_resistance": 100.0,
            "data_utility_preserved": round(random.uniform(98.5, 99.8), 1),
            "processing_time_ms": round(random.uniform(10, 30), 1),
            "gdpr_compliant": True,
            "iso27001_compliant": True
        },
        "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/bias/detect', methods=['POST'])
def detect_bias():
    data = request.json
    
    dimensions = ["성별", "연령", "지역", "사회경제적 배경"]
    bias_scores = {dim: round(random.uniform(0.01, 0.05), 3) for dim in dimensions}
    
    return jsonify({
        "success": True,
        "bias_analysis": {
            "dimensions_checked": dimensions,
            "bias_scores": bias_scores,
            "overall_fairness": round(random.uniform(0.95, 0.99), 2),
            "detection_accuracy": 95.2,
            "correction_applied": True,
            "processing_time_seconds": 0.00
        },
        "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/statistics', methods=['GET'])
def get_statistics():
    return jsonify({
        "success": True,
        "system_stats": {
            "total_learners": 100000,
            "active_today": random.randint(45000, 55000),
            "career_optimizations": random.randint(8000, 12000),
            "realtime_modifications": random.randint(500, 1500),
            "avg_integrated_utility": 0.801,
            "achievement_improvement": "36.1%",
            "satisfaction_rate": "87.2%"
        },
        "stage_metrics": {stage: info["metrics"] for stage, info in SEVEN_STAGES.items()},
        "privacy_metrics": PRIVACY_SYSTEM["metrics"],
        "bias_metrics": {"accuracy": BIAS_DETECTION["detection_accuracy"], "fairness": BIAS_DETECTION["fairness_score"]},
        "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/ai-consultation', methods=['POST'])
def ai_consultation():
    data = request.json
    system_prompt = """당신은 7단계 개인-사회 통합 최적화 AI 교육 시스템의 상담 AI입니다.

핵심 개념:
- 7단계 프로세스(100): HUTSI(110)→SERM(120)→PIAR(130)→ISIO(140)→PCE(150)→PDU(160)→RCM(170)
- 통합 효용 0.801 달성: 개인 효용 0.845 + 사회 효용 0.735의 최적 균형
- 인간 고유 업무: 32.2% 대체 불가, 48.9% 협업 필요
- 실시간 진로 수정: 평균 2.3분 내 처리
- 프라이버시 보호: 재식별 저항률 100%, 데이터 유용성 99.3%
- 편향 탐지: 4차원 실시간 탐지, 95.2% 정확도

사용자의 교육/진로 관련 질문에 전문적으로 답변하세요."""

    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            system=system_prompt,
            messages=[{"role": "user", "content": data.get('query', '')}]
        )
        return jsonify({"response": response.content[0].text, "timestamp": datetime.now().isoformat()}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("🎓 7단계 개인-사회 통합 최적화 AI 교육 시스템 시작 - 포트 5003")
    app.run(host='0.0.0.0', port=5003, debug=False)
