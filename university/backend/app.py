from flask import Flask, request, jsonify
from flask_cors import CORS
import hashlib
import time
import random
from datetime import datetime
import requests
import os

app = Flask(__name__)
CORS(app)

# Claude API 설정
CLAUDE_API_KEY = os.environ.get('ANTHROPIC_API_KEY', '')
CLAUDE_API_URL = "https://api.anthropic.com/v1/messages"

# 대화 히스토리 저장
CHAT_HISTORIES = {
    'professor': {},      # AI 교수 대화
    'thesis': {},         # 논문 작성
    'career': {},         # 진로 상담
    'help': {},           # 도움말 상담
    'community': {},      # 커뮤니티 상담
    'aptitude': {}        # 적성 분석
}

# AI 교수 데이터베이스
AI_PROFESSORS = {
    'prof-algorithm': {
        'id': 'prof-algorithm',
        'name_ko': '알고리즘 AI 교수',
        'subject': '알고리즘 이론',
        'icon': '🧮',
        'field': 'computer',
        'field_name': '컴퓨터공학',
        'description': '정렬, 탐색, 그래프, 동적 프로그래밍 등 알고리즘의 설계와 분석을 학습합니다.',
        'difficulty': 4,
        'credits': 3,
        'total_students': 45230,
        'avg_score': 78.5,
        'expertise': '정렬 알고리즘, 탐색 알고리즘, 그래프 알고리즘, 동적 프로그래밍, 분할 정복, 그리디 알고리즘, NP-완전 문제, 시간/공간 복잡도 분석',
        'curriculum': [
            {'week': 1, 'topic': '알고리즘 개요 및 복잡도 분석'},
            {'week': 2, 'topic': '분할 정복 알고리즘'},
            {'week': 3, 'topic': '정렬 알고리즘'},
            {'week': 4, 'topic': '탐색 알고리즘'},
            {'week': 5, 'topic': '그래프 기초 (BFS, DFS)'},
            {'week': 6, 'topic': '최단 경로 알고리즘'},
            {'week': 7, 'topic': '중간고사'},
            {'week': 8, 'topic': '동적 프로그래밍 기초'},
            {'week': 9, 'topic': '동적 프로그래밍 응용'},
            {'week': 10, 'topic': '그리디 알고리즘'},
            {'week': 11, 'topic': '백트래킹'},
            {'week': 12, 'topic': 'NP-완전 문제'},
            {'week': 13, 'topic': '근사 알고리즘'},
            {'week': 14, 'topic': '기말고사'}
        ]
    },
    'prof-datastructure': {
        'id': 'prof-datastructure',
        'name_ko': '자료구조 AI 교수',
        'subject': '자료구조',
        'icon': '🗂️',
        'field': 'computer',
        'field_name': '컴퓨터공학',
        'description': '배열, 연결리스트, 트리, 그래프 등 기본 자료구조를 학습합니다.',
        'difficulty': 3,
        'credits': 3,
        'total_students': 52100,
        'avg_score': 75.2,
        'expertise': '배열, 연결 리스트, 스택, 큐, 트리(이진 트리, AVL, 레드블랙), 힙, 그래프, 해시 테이블, 자료구조 선택 기준',
        'curriculum': []
    },
    'prof-os': {
        'id': 'prof-os',
        'name_ko': '운영체제 AI 교수',
        'subject': '운영체제',
        'icon': '💻',
        'field': 'computer',
        'field_name': '컴퓨터공학',
        'description': '프로세스, 메모리, 파일시스템 등 운영체제의 핵심 개념을 학습합니다.',
        'difficulty': 4,
        'credits': 3,
        'total_students': 38500,
        'avg_score': 72.8,
        'expertise': '프로세스 관리, 스레드, CPU 스케줄링, 메모리 관리, 가상 메모리, 파일 시스템, 동기화, 데드락, Linux/Windows 내부 구조',
        'curriculum': []
    },
    'prof-network': {
        'id': 'prof-network',
        'name_ko': '네트워크 AI 교수',
        'subject': '컴퓨터네트워크',
        'icon': '🌐',
        'field': 'computer',
        'field_name': '컴퓨터공학',
        'description': 'TCP/IP, 라우팅, 네트워크 보안 등 컴퓨터 네트워크를 학습합니다.',
        'difficulty': 3,
        'credits': 3,
        'total_students': 35200,
        'avg_score': 76.3,
        'expertise': 'OSI 7계층, TCP/IP, HTTP/HTTPS, DNS, 라우팅, 스위칭, 네트워크 보안, 소켓 프로그래밍',
        'curriculum': []
    },
    'prof-database': {
        'id': 'prof-database',
        'name_ko': '데이터베이스 AI 교수',
        'subject': '데이터베이스',
        'icon': '🗄️',
        'field': 'computer',
        'field_name': '컴퓨터공학',
        'description': '관계형 데이터베이스, SQL, 트랜잭션, 정규화를 학습합니다.',
        'difficulty': 3,
        'credits': 3,
        'total_students': 41300,
        'avg_score': 77.1,
        'expertise': '관계형 데이터베이스, SQL, 정규화, 트랜잭션, ACID, 인덱싱, 쿼리 최적화, NoSQL',
        'curriculum': []
    },
    'prof-calculus': {
        'id': 'prof-calculus',
        'name_ko': '미적분학 AI 교수',
        'subject': '미적분학',
        'icon': '∫',
        'field': 'math',
        'field_name': '수학',
        'description': '함수의 극한, 미분, 적분의 기초와 응용을 학습합니다.',
        'difficulty': 4,
        'credits': 3,
        'total_students': 68500,
        'avg_score': 71.2,
        'expertise': '극한, 연속, 미분, 적분, 다변수 미적분, 미분방정식, 테일러 급수',
        'curriculum': []
    },
    'prof-linear-algebra': {
        'id': 'prof-linear-algebra',
        'name_ko': '선형대수학 AI 교수',
        'subject': '선형대수학',
        'icon': '📐',
        'field': 'math',
        'field_name': '수학',
        'description': '벡터, 행렬, 선형변환, 고유값을 학습합니다.',
        'difficulty': 3,
        'credits': 3,
        'total_students': 55200,
        'avg_score': 73.5,
        'expertise': '벡터, 행렬, 선형변환, 고유값/고유벡터, 직교화, SVD, 선형 시스템, 머신러닝 응용',
        'curriculum': []
    },
    'prof-statistics': {
        'id': 'prof-statistics',
        'name_ko': '확률통계 AI 교수',
        'subject': '확률과 통계',
        'icon': '📊',
        'field': 'math',
        'field_name': '수학',
        'description': '확률론, 통계적 추론, 가설검정을 학습합니다.',
        'difficulty': 3,
        'credits': 3,
        'total_students': 48900,
        'avg_score': 74.8,
        'expertise': '확률분포, 베이즈 정리, 추정, 가설검정, 회귀분석, 분산분석, Python 통계 분석',
        'curriculum': []
    },
    'prof-ml': {
        'id': 'prof-ml',
        'name_ko': '머신러닝 AI 교수',
        'subject': '머신러닝',
        'icon': '🤖',
        'field': 'ai',
        'field_name': '인공지능',
        'description': '지도학습, 비지도학습, 강화학습의 이론과 실습을 학습합니다.',
        'difficulty': 4,
        'credits': 3,
        'total_students': 62300,
        'avg_score': 76.9,
        'expertise': '지도학습(회귀, 분류), 비지도학습(클러스터링, 차원축소), 강화학습, 앙상블 방법, 모델 평가, scikit-learn, 하이퍼파라미터 튜닝',
        'curriculum': [
            {'week': 1, 'topic': '머신러닝 개요'},
            {'week': 2, 'topic': '선형 회귀'},
            {'week': 3, 'topic': '로지스틱 회귀'},
            {'week': 4, 'topic': '결정 트리'},
            {'week': 5, 'topic': 'SVM'},
            {'week': 6, 'topic': '모델 평가'},
            {'week': 7, 'topic': '중간고사'},
            {'week': 8, 'topic': '클러스터링'},
            {'week': 9, 'topic': '차원 축소'},
            {'week': 10, 'topic': '앙상블'},
            {'week': 11, 'topic': '신경망 기초'},
            {'week': 12, 'topic': '강화학습'},
            {'week': 13, 'topic': 'ML 파이프라인'},
            {'week': 14, 'topic': '기말고사'}
        ]
    },
    'prof-dl': {
        'id': 'prof-dl',
        'name_ko': '딥러닝 AI 교수',
        'subject': '딥러닝',
        'icon': '🧠',
        'field': 'ai',
        'field_name': '인공지능',
        'description': 'CNN, RNN, Transformer 등 심층신경망을 학습합니다.',
        'difficulty': 5,
        'credits': 3,
        'total_students': 58700,
        'avg_score': 75.4,
        'expertise': 'CNN, RNN, LSTM, Transformer, GAN, VAE, 최적화, 정규화, 전이학습, PyTorch, TensorFlow, GPT, Diffusion Model',
        'curriculum': []
    },
    'prof-nlp': {
        'id': 'prof-nlp',
        'name_ko': '자연어처리 AI 교수',
        'subject': '자연어처리',
        'icon': '💬',
        'field': 'ai',
        'field_name': '인공지능',
        'description': '텍스트 분석, 기계번역, 질의응답 시스템을 학습합니다.',
        'difficulty': 4,
        'credits': 3,
        'total_students': 42100,
        'avg_score': 74.2,
        'expertise': '토큰화, 임베딩, Attention, Transformer, BERT, GPT, 기계번역, 감성분석, Hugging Face',
        'curriculum': []
    },
    'prof-physics': {
        'id': 'prof-physics',
        'name_ko': '일반물리학 AI 교수',
        'subject': '일반물리학',
        'icon': '⚛️',
        'field': 'physics',
        'field_name': '물리학',
        'description': '역학, 전자기학, 열역학, 광학의 기초를 학습합니다.',
        'difficulty': 4,
        'credits': 3,
        'total_students': 72500,
        'avg_score': 70.5,
        'expertise': '역학, 전자기학, 열역학, 파동, 광학, 현대물리학',
        'curriculum': []
    },
    'prof-chemistry': {
        'id': 'prof-chemistry',
        'name_ko': '일반화학 AI 교수',
        'subject': '일반화학',
        'icon': '🧪',
        'field': 'chemistry',
        'field_name': '화학',
        'description': '원자구조, 화학결합, 반응속도, 평형을 학습합니다.',
        'difficulty': 3,
        'credits': 3,
        'total_students': 58300,
        'avg_score': 72.1,
        'expertise': '원자 구조, 화학 결합, 화학 반응, 열화학, 평형, 산-염기, 전기화학',
        'curriculum': []
    },
    'prof-economics': {
        'id': 'prof-economics',
        'name_ko': '경제학원론 AI 교수',
        'subject': '경제학원론',
        'icon': '📈',
        'field': 'business',
        'field_name': '경영/경제',
        'description': '미시경제, 거시경제의 기본 원리를 학습합니다.',
        'difficulty': 2,
        'credits': 3,
        'total_students': 85200,
        'avg_score': 76.8,
        'expertise': '수요와 공급, 시장균형, 탄력성, GDP, 인플레이션, 실업, 통화정책, 재정정책',
        'curriculum': []
    },
    'prof-management': {
        'id': 'prof-management',
        'name_ko': '경영학원론 AI 교수',
        'subject': '경영학원론',
        'icon': '🏢',
        'field': 'business',
        'field_name': '경영/경제',
        'description': '경영의 기본 원리, 조직, 전략을 학습합니다.',
        'difficulty': 2,
        'credits': 3,
        'total_students': 78900,
        'avg_score': 78.2,
        'expertise': '경영 기획, 조직관리, 인사관리, 마케팅, 재무관리, 전략경영',
        'curriculum': []
    }
}

FIELDS = {
    'computer': {'name': '컴퓨터공학', 'icon': '💻', 'color': '#3B82F6'},
    'math': {'name': '수학', 'icon': '📐', 'color': '#8B5CF6'},
    'ai': {'name': '인공지능', 'icon': '🤖', 'color': '#10B981'},
    'physics': {'name': '물리학', 'icon': '⚛️', 'color': '#F59E0B'},
    'chemistry': {'name': '화학', 'icon': '🧪', 'color': '#EF4444'},
    'business': {'name': '경영/경제', 'icon': '📈', 'color': '#6366F1'}
}

STUDENT_DATA = {}

def get_student_data(student_id):
    if student_id not in STUDENT_DATA:
        STUDENT_DATA[student_id] = {
            'enrolled_courses': [],
            'grades': [],
            'learning_hours': {},
            'thesis': None,
            'profile': {
                'interests': [],
                'strengths': [],
                'goals': []
            }
        }
    return STUDENT_DATA[student_id]

def generate_openhash(data):
    timestamp = str(time.time())
    content = f"{data}{timestamp}"
    return hashlib.sha256(content.encode()).hexdigest()

def call_claude(system_prompt, user_message, history=None, max_tokens=2048):
    """Claude API 통합 호출 함수"""
    if not CLAUDE_API_KEY:
        return None
    
    try:
        headers = {
            "Content-Type": "application/json",
            "x-api-key": CLAUDE_API_KEY,
            "anthropic-version": "2023-06-01"
        }
        
        messages = []
        if history:
            for msg in history[-10:]:
                messages.append({"role": msg['role'], "content": msg['content']})
        messages.append({"role": "user", "content": user_message})
        
        payload = {
            "model": "claude-sonnet-4-20250514",
            "max_tokens": max_tokens,
            "system": system_prompt,
            "messages": messages
        }
        
        response = requests.post(CLAUDE_API_URL, headers=headers, json=payload, timeout=60)
        
        if response.status_code == 200:
            return response.json()['content'][0]['text']
        else:
            print(f"Claude API Error: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"Claude API Exception: {str(e)}")
        return None

def update_history(category, key, role, content):
    """대화 히스토리 업데이트"""
    if key not in CHAT_HISTORIES[category]:
        CHAT_HISTORIES[category][key] = []
    CHAT_HISTORIES[category][key].append({'role': role, 'content': content})
    if len(CHAT_HISTORIES[category][key]) > 40:
        CHAT_HISTORIES[category][key] = CHAT_HISTORIES[category][key][-40:]

# ============== 기본 API ==============

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'ok',
        'service': 'ai-university',
        'version': '2.0.0',
        'claude_api': 'connected' if CLAUDE_API_KEY else 'simulation',
        'timestamp': datetime.now().isoformat(),
        'total_courses': len(AI_PROFESSORS),
        'total_students': sum(p['total_students'] for p in AI_PROFESSORS.values())
    })

@app.route('/courses', methods=['GET'])
def get_courses():
    field = request.args.get('field')
    courses = []
    for prof_id, prof in AI_PROFESSORS.items():
        if field and prof['field'] != field:
            continue
        courses.append({
            'id': prof_id,
            'name': prof['subject'],
            'professor': prof['name_ko'],
            'icon': prof['icon'],
            'field': prof['field'],
            'field_name': prof['field_name'],
            'description': prof['description'],
            'difficulty': prof['difficulty'],
            'credits': prof['credits'],
            'total_students': prof['total_students'],
            'avg_score': prof['avg_score']
        })
    return jsonify({'courses': courses, 'fields': FIELDS})

@app.route('/courses/<course_id>', methods=['GET'])
def get_course_detail(course_id):
    prof = AI_PROFESSORS.get(course_id)
    if not prof:
        return jsonify({'error': 'Course not found'}), 404
    return jsonify({'course': prof})

@app.route('/courses/<course_id>/enroll', methods=['POST'])
def enroll_course(course_id):
    data = request.json
    student_id = data.get('student_id', 'anonymous')
    
    prof = AI_PROFESSORS.get(course_id)
    if not prof:
        return jsonify({'error': 'Course not found'}), 404
    
    student = get_student_data(student_id)
    if course_id not in student['enrolled_courses']:
        student['enrolled_courses'].append(course_id)
    
    return jsonify({
        'success': True,
        'message': f"'{prof['subject']}' 강좌에 수강 신청되었습니다.",
        'openhash': generate_openhash(f"{student_id}-{course_id}"),
        'timestamp': datetime.now().isoformat()
    })

@app.route('/my-courses', methods=['GET'])
def get_my_courses():
    student_id = request.args.get('student_id', 'anonymous')
    student = get_student_data(student_id)
    
    courses = []
    for course_id in student['enrolled_courses']:
        prof = AI_PROFESSORS.get(course_id)
        if prof:
            progress = random.randint(30, 85)
            courses.append({
                'course_id': course_id,
                'course_name': prof['subject'],
                'professor': prof['name_ko'],
                'icon': prof['icon'],
                'progress': progress,
                'current_week': min(int(progress / 7) + 1, 14),
                'total_weeks': 14,
                'status': 'active'
            })
    
    return jsonify({'courses': courses})

# ============== AI 교수 채팅 (Claude API) ==============

@app.route('/professor/<prof_id>/chat', methods=['POST'])
def chat_with_professor(prof_id):
    data = request.json
    student_id = data.get('student_id', 'anonymous')
    message = data.get('message', '')
    
    if not message:
        return jsonify({'error': 'Message is required'}), 400
    
    prof = AI_PROFESSORS.get(prof_id)
    if not prof:
        return jsonify({'error': 'Professor not found'}), 404
    
    system_prompt = f"""당신은 AI 통합대학의 {prof['name_ko']}입니다.

담당 과목: {prof['subject']}
전문 분야: {prof['expertise']}
현재 수강생: {prof['total_students']:,}명

교육 철학:
- 학생의 질문 의도를 정확히 파악하여 맞춤형 답변을 제공합니다
- 복잡한 개념은 쉬운 예시와 비유로 설명합니다
- 필요시 코드 예시(Python)나 수식을 포함합니다
- 학생의 수준에 맞춰 설명 깊이를 조절합니다
- 단순 답변보다 이해를 돕는 설명을 우선합니다

응답 지침:
- 한국어로 친절하고 전문적으로 답변하세요
- 학생이 "누구세요", "자기소개" 등을 물으면 자신을 소개하세요
- 과목 관련 질문에는 상세하게 설명하세요
- 시험, 과제, 학습 방법에 대한 조언도 제공하세요
- 적절한 이모지를 사용하여 친근한 분위기를 만드세요"""

    history_key = f"{student_id}-{prof_id}"
    history = CHAT_HISTORIES['professor'].get(history_key, [])
    
    response_text = call_claude(system_prompt, message, history)
    
    if response_text:
        update_history('professor', history_key, 'user', message)
        update_history('professor', history_key, 'assistant', response_text)
    else:
        response_text = f"안녕하세요! 저는 {prof['name_ko']}입니다. 현재 시스템 연결에 문제가 있어 잠시 후 다시 시도해 주세요."
    
    return jsonify({
        'response': response_text,
        'professor': prof['name_ko'],
        'subject': prof['subject'],
        'timestamp': datetime.now().isoformat()
    })

# ============== 논문 작성 AI (Claude API) ==============

@app.route('/thesis/chat', methods=['POST'])
def thesis_chat():
    data = request.json
    student_id = data.get('student_id', 'anonymous')
    message = data.get('message', '')
    current_step = data.get('current_step', 1)
    thesis_info = data.get('thesis_info', {})
    
    if not message:
        return jsonify({'error': 'Message is required'}), 400
    
    step_names = {1: '주제 선정', 2: '문헌 조사', 3: '개요 작성', 4: '본문 작성', 5: '검토/수정', 6: '제출/심사'}
    
    system_prompt = f"""당신은 AI 통합대학의 논문 작성 보조 AI입니다.

현재 단계: {current_step}단계 - {step_names.get(current_step)}
{'논문 제목: ' + thesis_info.get('title') if thesis_info.get('title') else '논문 주제 미정'}

역할:
1단계 (주제 선정): 학생의 관심사를 파악하고 구체적이고 실현 가능한 연구 주제를 제안합니다. 연구의 필요성, 참신성, 기여도를 설명합니다.
2단계 (문헌 조사): 관련 선행 연구를 분석하고, 연구 동향과 연구 갭을 파악합니다.
3단계 (개요 작성): 논문 구조(서론, 이론적 배경, 연구 방법, 실험/결과, 결론)를 설계합니다.
4단계 (본문 작성): 각 섹션의 학술적 글쓰기를 도와줍니다. 논리적 흐름과 학술적 문체를 유지합니다.
5단계 (검토/수정): 논리적 일관성, 문법, 인용 형식을 점검하고 개선점을 제안합니다.
6단계 (제출/심사): 최종 점검 사항을 안내하고 제출을 준비합니다.

응답 지침:
- 학생의 질문 의도를 정확히 이해하고 그에 맞게 답변하세요
- "전공에 상관없이 논문 작성을 도와주냐"는 질문에는 "네, 모든 분야의 논문 작성을 도와드립니다"라고 답하세요
- 구체적이고 실행 가능한 조언을 제공하세요
- 한국어로 친절하게 답변하세요"""

    history_key = f"thesis-{student_id}"
    history = CHAT_HISTORIES['thesis'].get(history_key, [])
    
    response_text = call_claude(system_prompt, message, history)
    
    if response_text:
        update_history('thesis', history_key, 'user', message)
        update_history('thesis', history_key, 'assistant', response_text)
    else:
        response_text = "현재 AI 서비스에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요."
    
    return jsonify({
        'response': response_text,
        'timestamp': datetime.now().isoformat()
    })

# ============== 진로/적성 상담 AI (Claude API) ==============

@app.route('/career/chat', methods=['POST'])
def career_chat():
    data = request.json
    student_id = data.get('student_id', 'anonymous')
    message = data.get('message', '')
    
    if not message:
        return jsonify({'error': 'Message is required'}), 400
    
    student = get_student_data(student_id)
    enrolled = [AI_PROFESSORS[c]['subject'] for c in student['enrolled_courses'] if c in AI_PROFESSORS]
    
    system_prompt = f"""당신은 AI 통합대학의 진로/취업 상담 AI입니다.

학생 정보:
- 수강 중인 과목: {', '.join(enrolled) if enrolled else '정보 없음'}

역할:
- 학생의 학습 이력, 성적, 관심사를 분석하여 적합한 진로를 추천합니다
- 직업별 필요 역량, 연봉, 성장 전망, 취업 전략을 안내합니다
- 부족한 역량을 보완할 수 있는 학습 경로를 제안합니다
- 이력서, 자기소개서, 면접 준비를 도와줍니다

추천 가능 직업군:
- IT: 소프트웨어 엔지니어, 백엔드/프론트엔드 개발자, DevOps 엔지니어
- AI/Data: 데이터 사이언티스트, ML 엔지니어, AI 연구원
- Finance: 퀀트 애널리스트, 핀테크 개발자
- Research: 학계 연구원, R&D 엔지니어

응답 지침:
- 학생의 상황과 목표에 맞는 맞춤형 조언을 제공하세요
- 구체적인 실행 계획과 로드맵을 제시하세요
- 한국어로 친절하게 답변하세요"""

    history_key = f"career-{student_id}"
    history = CHAT_HISTORIES['career'].get(history_key, [])
    
    response_text = call_claude(system_prompt, message, history)
    
    if response_text:
        update_history('career', history_key, 'user', message)
        update_history('career', history_key, 'assistant', response_text)
    else:
        response_text = "현재 AI 서비스에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요."
    
    return jsonify({
        'response': response_text,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/career/recommend', methods=['GET'])
def get_career_recommendations():
    student_id = request.args.get('student_id', 'anonymous')
    
    return jsonify({
        'recommendations': [
            {'id': 'data-scientist', 'title': '데이터 사이언티스트', 'field': 'AI/Data', 'avg_salary': 75000000, 'demand': '매우 높음', 'match_rate': 92, 'growth_rate': 35, 'missing_skills': []},
            {'id': 'ai-researcher', 'title': 'AI 연구원', 'field': 'AI/Research', 'avg_salary': 85000000, 'demand': '높음', 'match_rate': 85, 'growth_rate': 40, 'missing_skills': ['자연어처리']},
            {'id': 'software-engineer', 'title': '소프트웨어 엔지니어', 'field': 'IT', 'avg_salary': 65000000, 'demand': '매우 높음', 'match_rate': 78, 'growth_rate': 25, 'missing_skills': ['운영체제', '네트워크']},
            {'id': 'quant-analyst', 'title': '퀀트 애널리스트', 'field': 'Finance', 'avg_salary': 95000000, 'demand': '높음', 'match_rate': 65, 'growth_rate': 20, 'missing_skills': ['금융공학', '시계열분석']}
        ]
    })

# ============== 적성 분석 AI (Claude API) ==============

@app.route('/aptitude/analyze', methods=['POST'])
def analyze_aptitude():
    data = request.json
    student_id = data.get('student_id', 'anonymous')
    message = data.get('message', '')
    
    student = get_student_data(student_id)
    enrolled = [AI_PROFESSORS[c]['subject'] for c in student['enrolled_courses'] if c in AI_PROFESSORS]
    grades = student['grades']
    
    system_prompt = f"""당신은 AI 통합대학의 적성/역량 분석 AI입니다.

학생 정보:
- 수강 과목: {', '.join(enrolled) if enrolled else '정보 없음'}
- 성적 기록: {len(grades)}건

역할:
- 학생의 학습 패턴, 성적, 관심사를 종합 분석합니다
- 강점과 약점을 파악하고 객관적으로 평가합니다
- 적성에 맞는 학습 방향과 진로를 제안합니다
- 역량 개발을 위한 구체적인 조언을 제공합니다

분석 영역:
- 논리적 사고력, 창의성, 분석력, 커뮤니케이션, 문제해결력, 협업 능력

응답 지침:
- 객관적이고 건설적인 피드백을 제공하세요
- 구체적인 개선 방안을 제시하세요
- 한국어로 친절하게 답변하세요"""

    history_key = f"aptitude-{student_id}"
    history = CHAT_HISTORIES['aptitude'].get(history_key, [])
    
    response_text = call_claude(system_prompt, message, history)
    
    if response_text:
        update_history('aptitude', history_key, 'user', message)
        update_history('aptitude', history_key, 'assistant', response_text)
    else:
        response_text = "현재 AI 서비스에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요."
    
    return jsonify({
        'response': response_text,
        'timestamp': datetime.now().isoformat()
    })

# ============== 도움말 상담 AI (Claude API) ==============

@app.route('/help/chat', methods=['POST'])
def help_chat():
    data = request.json
    message = data.get('message', '')
    
    if not message:
        return jsonify({'error': 'Message is required'}), 400
    
    system_prompt = """당신은 AI 통합대학의 종합 상담 도우미입니다.

AI 통합대학 시스템 안내:
- 수강 신청: 인원 제한 없이 모든 과목 수강 가능. "강좌 탐색"에서 신청
- AI 교수: 각 과목별 전담 AI 교수가 24시간 질문 응답
- 시험: 퀴즈(주차별, 30분), 중간고사(7주, 90분), 기말고사(14주, 90분)
- 성적: 전국 백분위 제공, OpenHash 체인에 영구 저장
- 논문: 6단계 AI 보조 작성(주제선정→문헌조사→개요→본문→검토→심사)
- 졸업: AI 자동 논문 심사(24시간)로 졸업 판정
- 커뮤니티: AI가 적성/성향 분석하여 학습 동료 자동 매칭
- 개인정보 금고(PDV): 모든 기록 암호화 저장, 인증서 발급 가능
- 진로 상담: AI가 학습 이력 분석하여 직업 추천

응답 지침:
- 학생의 질문에 정확하고 친절하게 답변하세요
- 시스템 사용법을 쉽게 설명하세요
- 한국어로 답변하고 적절한 이모지를 사용하세요
- 관련 메뉴 위치도 안내해 주세요"""

    history_key = "help-general"
    history = CHAT_HISTORIES['help'].get(history_key, [])
    
    response_text = call_claude(system_prompt, message, history, max_tokens=1024)
    
    if response_text:
        update_history('help', history_key, 'user', message)
        update_history('help', history_key, 'assistant', response_text)
    else:
        response_text = "현재 AI 서비스에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요."
    
    return jsonify({
        'response': response_text,
        'timestamp': datetime.now().isoformat()
    })

# ============== 커뮤니티 AI (Claude API) ==============

@app.route('/community/chat', methods=['POST'])
def community_chat():
    data = request.json
    student_id = data.get('student_id', 'anonymous')
    message = data.get('message', '')
    community_id = data.get('community_id', '')
    
    if not message:
        return jsonify({'error': 'Message is required'}), 400
    
    system_prompt = """당신은 AI 통합대학 학습 커뮤니티의 AI 매니저입니다.

역할:
- 커뮤니티 활동 안내 및 지원
- 스터디 그룹 매칭 도움
- 학습 자료 추천
- 프로젝트 협업 조언
- 커뮤니티 내 질문 답변

커뮤니티 종류:
- 알고리즘 마스터즈: 알고리즘과 문제해결
- AI 개척자들: 인공지능과 머신러닝
- 데이터 마법사: 데이터 분석과 시각화
- 스타트업 랩: 창업과 사업화

응답 지침:
- 커뮤니티 활동을 장려하고 지원하세요
- 협업과 네트워킹의 가치를 강조하세요
- 한국어로 친절하게 답변하세요"""

    history_key = f"community-{student_id}"
    history = CHAT_HISTORIES['community'].get(history_key, [])
    
    response_text = call_claude(system_prompt, message, history)
    
    if response_text:
        update_history('community', history_key, 'user', message)
        update_history('community', history_key, 'assistant', response_text)
    else:
        response_text = "현재 AI 서비스에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요."
    
    return jsonify({
        'response': response_text,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/communities', methods=['GET'])
def get_communities():
    return jsonify({
        'communities': [
            {'id': 'algo-masters', 'name': '알고리즘 마스터즈', 'description': '알고리즘과 문제해결', 'member_count': 1245, 'active_projects': 12},
            {'id': 'ai-pioneers', 'name': 'AI 개척자들', 'description': '인공지능과 머신러닝', 'member_count': 2380, 'active_projects': 28},
            {'id': 'data-wizards', 'name': '데이터 마법사', 'description': '데이터 분석과 시각화', 'member_count': 890, 'active_projects': 8}
        ]
    })

# ============== 시험/성적 API ==============

@app.route('/exam/take', methods=['POST'])
def take_exam():
    data = request.json
    student_id = data.get('student_id', 'anonymous')
    course_id = data.get('course_id')
    exam_type = data.get('exam_type', 'quiz')
    
    score = random.randint(70, 98)
    percentile = random.randint(5, 30)
    
    student = get_student_data(student_id)
    student['grades'].append({
        'course_id': course_id,
        'exam_type': exam_type,
        'score': score,
        'percentile': percentile,
        'taken_at': datetime.now().isoformat()
    })
    
    return jsonify({
        'success': True,
        'result': {'score': score, 'percentile': percentile, 'rank': f'상위 {percentile}%'},
        'openhash': generate_openhash(f"{student_id}-{course_id}-{exam_type}")
    })

@app.route('/grades', methods=['GET'])
def get_grades():
    student_id = request.args.get('student_id', 'anonymous')
    student = get_student_data(student_id)
    return jsonify({'grades': student['grades']})

@app.route('/analytics', methods=['GET'])
def get_analytics():
    return jsonify({
        'learning_time': {'알고리즘 이론': 45, '자료구조': 38, '머신러닝': 52, '선형대수학': 21},
        'total_hours': 156,
        'score_trend': [
            {'week': 1, 'score': 75}, {'week': 2, 'score': 78}, {'week': 3, 'score': 72},
            {'week': 4, 'score': 85}, {'week': 5, 'score': 82}, {'week': 6, 'score': 88},
            {'week': 7, 'score': 85}, {'week': 8, 'score': 90}
        ],
        'competencies': {'알고리즘': 85, '자료구조': 78, '수학': 72, 'AI/ML': 88, '프로그래밍': 82, '문제해결': 80}
    })

@app.route('/stats/dashboard', methods=['GET'])
def get_dashboard_stats():
    student_id = request.args.get('student_id', 'anonymous')
    student = get_student_data(student_id)
    
    return jsonify({
        'stats': {
            'enrolled_courses': len(student['enrolled_courses']) or 5,
            'completed_exams': len(student['grades']) or 12,
            'avg_score': sum(g['score'] for g in student['grades']) / len(student['grades']) if student['grades'] else 82.5,
            'total_learning_hours': 156,
            'current_rank': '상위 15%',
            'credits_earned': len(student['enrolled_courses']) * 3 or 15,
            'thesis_status': '미시작'
        }
    })

@app.route('/pdv/records', methods=['GET'])
def get_pdv_records():
    student_id = request.args.get('student_id', 'anonymous')
    student = get_student_data(student_id)
    
    enrollments = []
    for course_id in student['enrolled_courses']:
        prof = AI_PROFESSORS.get(course_id)
        if prof:
            enrollments.append({'course_id': course_id, 'course_name': prof['subject'], 'enrolled_at': '2025-09-01'})
    
    return jsonify({
        'records': {
            'enrollments': enrollments or [
                {'course_id': 'prof-algorithm', 'course_name': '알고리즘 이론', 'enrolled_at': '2025-09-01'},
                {'course_id': 'prof-ml', 'course_name': '머신러닝', 'enrolled_at': '2025-09-01'}
            ],
            'grades': student['grades'] or [
                {'course_name': '알고리즘 이론', 'exam_type': 'quiz', 'score': 92, 'taken_at': '2025-11-25'}
            ],
            'thesis': [],
            'total_learning_hours': 156,
            'pdv_hash': generate_openhash(f"{student_id}-pdv")
        }
    })

if __name__ == '__main__':
    print("🎓 AI 통합대학 시스템 백엔드 v2.0")
    print(f"📚 등록된 강좌: {len(AI_PROFESSORS)}개")
    print(f"👥 총 수강생: {sum(p['total_students'] for p in AI_PROFESSORS.values()):,}명")
    print(f"🤖 Claude API: {'연결됨' if CLAUDE_API_KEY else '시뮬레이션 모드'}")
    app.run(host='0.0.0.0', port=5022)
