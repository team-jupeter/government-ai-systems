from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "service": "k12-education"}), 200

@app.route('/subjects', methods=['GET'])
def get_subjects():
    subjects = {
        "korean": {"name": "국어 AI 교사", "icon": "📚", "students": "120만"},
        "english": {"name": "영어 AI 교사", "icon": "🌍", "students": "120만"},
        "math": {"name": "수학 AI 교사", "icon": "📐", "students": "120만"},
        "physics": {"name": "물리 AI 교사", "icon": "⚛️", "students": "45만"},
        "chemistry": {"name": "화학 AI 교사", "icon": "🧪", "students": "45만"},
        "biology": {"name": "생물 AI 교사", "icon": "🧬", "students": "45만"},
        "history": {"name": "역사 AI 교사", "icon": "📜", "students": "80만"},
        "social": {"name": "사회 AI 교사", "icon": "🌏", "students": "80만"},
        "coding": {"name": "코딩 AI 교사", "icon": "💻", "students": "60만"}
    }
    return jsonify({"success": True, "subjects": subjects}), 200

@app.route('/student-analysis', methods=['POST'])
def student_analysis():
    subjects = ["국어", "영어", "수학", "과학", "사회", "코딩"]
    scores = {s: random.randint(60, 100) for s in subjects}
    return jsonify({
        "success": True,
        "student_id": f"STU-{random.randint(10000,99999)}",
        "current_scores": scores,
        "individual_utility": round(random.uniform(0.82, 0.92), 3),
        "social_utility": round(random.uniform(0.70, 0.78), 3),
        "balance_point": round(random.uniform(0.78, 0.85), 3)
    }), 200

@app.route('/ai-teacher', methods=['POST'])
def ai_teacher():
    data = request.json
    return jsonify({
        "success": True,
        "teacher": "AI 교사",
        "response": f"안녕하세요! {data.get('subject', '수학')} 질문에 답변드리겠습니다. '{data.get('query', '')}' - 자세한 설명을 원하시면 구체적으로 질문해주세요!"
    }), 200

if __name__ == '__main__':
    print("🎓 K-12 AI 교육 시스템 (포트 5011)")
    app.run(host='0.0.0.0', port=5011, debug=False)
