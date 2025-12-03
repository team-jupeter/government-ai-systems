const MyLearning = ({ studentId, onNavigate }) => {
    const [myCourses, setMyCourses] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [selectedCourse, setSelectedCourse] = React.useState(null);
    const [currentWeek, setCurrentWeek] = React.useState(1);
    const [showChat, setShowChat] = React.useState(false);
    const [chatMessages, setChatMessages] = React.useState([]);
    const [inputText, setInputText] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const chatEndRef = React.useRef(null);

    // 강좌별 커리큘럼 데이터
    const curriculumData = {
        'prof-algorithm': {
            name: '알고리즘 이론',
            professor: '알고리즘 AI 교수',
            icon: '🧮',
            weeks: [
                { week: 1, title: '알고리즘 개요 및 복잡도 분석', video: '알고리즘의 정의와 중요성, Big-O 표기법', duration: '45분', materials: ['강의 슬라이드', '복잡도 연습문제'] },
                { week: 2, title: '분할 정복 알고리즘', video: '분할 정복 패러다임, 병합 정렬, 퀵 정렬', duration: '50분', materials: ['코드 예제', '실습 과제'] },
                { week: 3, title: '정렬 알고리즘', video: '버블, 선택, 삽입, 힙 정렬 비교', duration: '55분', materials: ['정렬 시각화 자료', '성능 비교표'] },
                { week: 4, title: '탐색 알고리즘', video: '이진 탐색, 해시 테이블, 탐색 트리', duration: '50분', materials: ['탐색 알고리즘 구현', '퀴즈'] },
                { week: 5, title: '그래프 기초 (BFS, DFS)', video: '그래프 표현, 너비/깊이 우선 탐색', duration: '60분', materials: ['그래프 시각화', '미로 탐색 실습'] },
                { week: 6, title: '최단 경로 알고리즘', video: '다익스트라, 벨만-포드, 플로이드-워셜', duration: '55분', materials: ['경로 탐색 시뮬레이터', '실습 과제'] },
                { week: 7, title: '중간고사', video: '1-6주차 내용 종합 평가', duration: '90분', materials: ['모의고사', '기출문제'] },
                { week: 8, title: '동적 프로그래밍 기초', video: 'DP 개념, 메모이제이션, 타뷸레이션', duration: '60분', materials: ['DP 패턴 정리', '피보나치 변형 문제'] },
                { week: 9, title: '동적 프로그래밍 응용', video: 'LCS, 배낭 문제, 행렬 체인 곱셈', duration: '55분', materials: ['고급 DP 문제집', '코딩 테스트 대비'] },
                { week: 10, title: '그리디 알고리즘', video: '탐욕적 선택, 활동 선택, 허프만 코딩', duration: '50분', materials: ['그리디 vs DP 비교', '실습'] },
                { week: 11, title: '백트래킹', video: 'N-Queens, 부분집합, 순열 생성', duration: '50분', materials: ['백트래킹 템플릿', '연습문제'] },
                { week: 12, title: 'NP-완전 문제', video: 'P vs NP, NP-완전성, 대표 문제들', duration: '45분', materials: ['NP 문제 목록', '증명 연습'] },
                { week: 13, title: '근사 알고리즘', video: '근사 비율, 정점 커버, TSP 근사', duration: '50분', materials: ['근사 알고리즘 분석', '프로젝트'] },
                { week: 14, title: '기말고사', video: '전체 내용 종합 평가', duration: '120분', materials: ['종합 모의고사', '핵심 정리'] }
            ]
        },
        'prof-datastructure': {
            name: '자료구조',
            professor: '자료구조 AI 교수',
            icon: '🗂️',
            weeks: [
                { week: 1, title: '자료구조 개요', video: '자료구조의 중요성과 분류', duration: '40분', materials: ['강의 노트', '개념 정리'] },
                { week: 2, title: '배열과 문자열', video: '정적/동적 배열, 문자열 처리', duration: '45분', materials: ['배열 연산 실습', '문자열 알고리즘'] },
                { week: 3, title: '연결 리스트', video: '단일/이중/원형 연결 리스트', duration: '50분', materials: ['리스트 구현', '포인터 연습'] },
                { week: 4, title: '스택과 큐', video: '스택/큐 구현과 응용', duration: '45분', materials: ['괄호 검사', '큐 시뮬레이션'] },
                { week: 5, title: '재귀', video: '재귀 함수, 꼬리 재귀, 스택 프레임', duration: '50분', materials: ['재귀 패턴', '하노이 탑'] },
                { week: 6, title: '트리 기초', video: '트리 용어, 이진 트리, 순회', duration: '55분', materials: ['트리 시각화', '순회 구현'] },
                { week: 7, title: '중간고사', video: '1-6주차 종합 평가', duration: '90분', materials: ['모의고사'] },
                { week: 8, title: '이진 탐색 트리', video: 'BST 삽입/삭제/검색', duration: '50분', materials: ['BST 구현', '균형 분석'] },
                { week: 9, title: '균형 트리', video: 'AVL 트리, 레드블랙 트리', duration: '60분', materials: ['회전 연산', '삽입 시뮬레이션'] },
                { week: 10, title: '힙과 우선순위 큐', video: '힙 속성, 힙 정렬, 우선순위 큐', duration: '50분', materials: ['힙 구현', '응용 문제'] },
                { week: 11, title: '해시 테이블', video: '해시 함수, 충돌 해결', duration: '50분', materials: ['해시 구현', '성능 분석'] },
                { week: 12, title: '그래프 표현', video: '인접 행렬/리스트, 가중치 그래프', duration: '45분', materials: ['그래프 구현', '탐색 실습'] },
                { week: 13, title: '고급 자료구조', video: '트라이, 세그먼트 트리, 유니온 파인드', duration: '55분', materials: ['고급 구현', '활용 사례'] },
                { week: 14, title: '기말고사', video: '전체 종합 평가', duration: '120분', materials: ['종합 모의고사'] }
            ]
        },
        'prof-ml': {
            name: '머신러닝',
            professor: '머신러닝 AI 교수',
            icon: '🤖',
            weeks: [
                { week: 1, title: '머신러닝 개요', video: 'ML 정의, 유형, 파이프라인', duration: '45분', materials: ['환경 설정 가이드', 'Python 복습'] },
                { week: 2, title: '선형 회귀', video: '단순/다중 회귀, 경사하강법', duration: '55분', materials: ['회귀 실습 노트북', '수학적 유도'] },
                { week: 3, title: '로지스틱 회귀', video: '이진 분류, 시그모이드, 손실 함수', duration: '50분', materials: ['분류 실습', '혼동 행렬'] },
                { week: 4, title: '결정 트리', video: '정보 이득, 가지치기, 랜덤 포레스트', duration: '55분', materials: ['트리 시각화', '앙상블 기초'] },
                { week: 5, title: 'SVM', video: '서포트 벡터, 커널 트릭, 마진', duration: '60분', materials: ['SVM 실습', '커널 비교'] },
                { week: 6, title: '모델 평가', video: '교차 검증, 과적합, 정규화', duration: '50분', materials: ['평가 지표 정리', '실습 프로젝트'] },
                { week: 7, title: '중간고사', video: '1-6주차 종합', duration: '90분', materials: ['모의고사', '실습 문제'] },
                { week: 8, title: '클러스터링', video: 'K-means, DBSCAN, 계층적 클러스터링', duration: '55분', materials: ['클러스터링 실습', '시각화'] },
                { week: 9, title: '차원 축소', video: 'PCA, t-SNE, 특성 선택', duration: '50분', materials: ['차원 축소 실습', '시각화 기법'] },
                { week: 10, title: '앙상블 학습', video: '배깅, 부스팅, XGBoost', duration: '55분', materials: ['앙상블 실습', '하이퍼파라미터'] },
                { week: 11, title: '신경망 기초', video: '퍼셉트론, 역전파, 활성화 함수', duration: '60분', materials: ['신경망 구현', '딥러닝 입문'] },
                { week: 12, title: '강화학습 입문', video: 'MDP, Q-learning, 정책 경사', duration: '55분', materials: ['RL 환경 설정', '간단한 에이전트'] },
                { week: 13, title: 'ML 파이프라인', video: '전처리, 특성 공학, 배포', duration: '50분', materials: ['파이프라인 구축', '프로젝트'] },
                { week: 14, title: '기말고사', video: '전체 종합', duration: '120분', materials: ['종합 프로젝트', '포트폴리오'] }
            ]
        }
    };

    // 기본 커리큘럼 (데이터가 없는 강좌용)
    const defaultCurriculum = {
        weeks: Array.from({ length: 14 }, (_, i) => ({
            week: i + 1,
            title: `${i + 1}주차 강의`,
            video: i === 6 ? '중간고사' : i === 13 ? '기말고사' : '강의 내용',
            duration: i === 6 || i === 13 ? '90분' : '50분',
            materials: ['강의 자료', '실습 과제']
        }))
    };

    React.useEffect(() => {
        fetchMyCourses();
    }, [studentId]);

    React.useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages]);

    const fetchMyCourses = async () => {
        try {
            const response = await fetch(`/api/university/my-courses?student_id=${studentId}`);
            const data = await response.json();
            setMyCourses(data.courses || []);
        } catch (error) {
            // 데모 데이터
            setMyCourses([
                { course_id: 'prof-algorithm', course_name: '알고리즘 이론', professor: '알고리즘 AI 교수', icon: '🧮', progress: 45, current_week: 6, total_weeks: 14 },
                { course_id: 'prof-datastructure', course_name: '자료구조', professor: '자료구조 AI 교수', icon: '🗂️', progress: 65, current_week: 9, total_weeks: 14 },
                { course_id: 'prof-ml', course_name: '머신러닝', professor: '머신러닝 AI 교수', icon: '🤖', progress: 30, current_week: 4, total_weeks: 14 }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const startLearning = (course) => {
        const curriculum = curriculumData[course.course_id] || {
            ...defaultCurriculum,
            name: course.course_name,
            professor: course.professor,
            icon: course.icon
        };
        setSelectedCourse({ ...course, curriculum });
        setCurrentWeek(course.current_week || 1);
        setChatMessages([]);
        setShowChat(false);
    };

    const openProfessorChat = () => {
        setShowChat(true);
        if (chatMessages.length === 0) {
            const curriculum = curriculumData[selectedCourse.course_id] || defaultCurriculum;
            const weekData = curriculum.weeks?.[currentWeek - 1];
            setChatMessages([{
                id: 1,
                type: 'ai',
                content: `안녕하세요! ${selectedCourse.professor}입니다. ${selectedCourse.icon}\n\n현재 ${currentWeek}주차 "${weekData?.title || '강의'}"를 학습 중이시군요.\n\n이 주제에 대해 궁금한 점이 있으시면 무엇이든 질문해 주세요!`,
                timestamp: new Date().toISOString()
            }]);
        }
    };

    const sendMessage = async () => {
        if (!inputText.trim() || isLoading) return;

        const userMessage = {
            id: chatMessages.length + 1,
            type: 'user',
            content: inputText,
            timestamp: new Date().toISOString()
        };
        setChatMessages(prev => [...prev, userMessage]);
        const query = inputText;
        setInputText('');
        setIsLoading(true);

        try {
            const response = await fetch(`/api/university/professor/${selectedCourse.course_id}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ student_id: studentId, message: query })
            });
            const data = await response.json();
            
            setChatMessages(prev => [...prev, {
                id: prev.length + 1,
                type: 'ai',
                content: data.response || '죄송합니다. 잠시 후 다시 시도해 주세요.',
                timestamp: new Date().toISOString()
            }]);
        } catch (error) {
            setChatMessages(prev => [...prev, {
                id: prev.length + 1,
                type: 'ai',
                content: '네트워크 오류가 발생했습니다.',
                timestamp: new Date().toISOString()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <i className="fas fa-spinner fa-spin text-4xl text-yellow-400"></i>
            </div>
        );
    }

    // 강의 학습 화면
    if (selectedCourse) {
        const curriculum = selectedCourse.curriculum || curriculumData[selectedCourse.course_id] || defaultCurriculum;
        const weekData = curriculum.weeks?.[currentWeek - 1] || { title: `${currentWeek}주차`, video: '강의', duration: '50분', materials: [] };

        return (
            <div className="space-y-6">
                {/* 헤더 */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={() => setSelectedCourse(null)}
                            className="text-gray-400 hover:text-gray-900"
                        >
                            <i className="fas fa-arrow-left text-xl"></i>
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold flex items-center">
                                <span className="mr-2">{selectedCourse.icon}</span>
                                {selectedCourse.course_name}
                            </h1>
                            <p className="text-gray-400">{selectedCourse.professor}</p>
                        </div>
                    </div>
                    <button
                        onClick={openProfessorChat}
                        className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg font-medium"
                    >
                        <i className="fas fa-comments mr-2"></i>AI 교수에게 질문
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 왼쪽: 커리큘럼 */}
                    <div className="bg-gray-50 rounded-xl p-4 lg:col-span-1 max-h-[600px] overflow-y-auto">
                        <h3 className="font-semibold mb-4 flex items-center">
                            <i className="fas fa-list text-yellow-400 mr-2"></i>
                            커리큘럼 (14주)
                        </h3>
                        <div className="space-y-2">
                            {(curriculum.weeks || defaultCurriculum.weeks).map((week, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentWeek(week.week)}
                                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                                        currentWeek === week.week 
                                            ? 'bg-yellow-500 bg-opacity-20 border border-yellow-500' 
                                            : idx < selectedCourse.current_week 
                                                ? 'bg-green-500 bg-opacity-10 hover:bg-gray-100'
                                                : 'bg-gray-100 hover:bg-gray-600'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                            {idx < selectedCourse.current_week && <i className="fas fa-check text-green-400 mr-2"></i>}
                                            {week.week}주차
                                        </span>
                                        <span className="text-xs text-gray-400">{week.duration}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1 truncate">{week.title}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 오른쪽: 강의 콘텐츠 또는 AI 채팅 */}
                    <div className="lg:col-span-2 space-y-4">
                        {!showChat ? (
                            <>
                                {/* 강의 영상 영역 */}
                                <div className="bg-gray-50 rounded-xl overflow-hidden">
                                    <div className="aspect-video bg-white flex items-center justify-center relative">
                                        <div className="text-center">
                                            <i className="fas fa-play-circle text-6xl text-yellow-400 mb-4"></i>
                                            <h3 className="text-xl font-semibold mb-2">{currentWeek}주차: {weekData.title}</h3>
                                            <p className="text-gray-400">{weekData.video}</p>
                                            <p className="text-sm text-gray-500 mt-2">강의 시간: {weekData.duration}</p>
                                        </div>
                                        {/* 재생 컨트롤 바 */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                            <div className="flex items-center space-x-4">
                                                <button className="text-gray-900 hover:text-yellow-400">
                                                    <i className="fas fa-play text-xl"></i>
                                                </button>
                                                <div className="flex-1 h-1 bg-gray-100 rounded-full">
                                                    <div className="w-1/3 h-full bg-yellow-500 rounded-full"></div>
                                                </div>
                                                <span className="text-sm text-gray-400">15:23 / {weekData.duration}</span>
                                                <button className="text-gray-900 hover:text-yellow-400">
                                                    <i className="fas fa-expand"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 강의 정보 */}
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <h3 className="font-semibold mb-4">{currentWeek}주차 학습 내용</h3>
                                    <p className="text-gray-600 mb-4">{weekData.video}</p>
                                    
                                    {/* 학습 자료 */}
                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium text-gray-400 mb-2">학습 자료</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {(weekData.materials || []).map((material, idx) => (
                                                <button 
                                                    key={idx}
                                                    className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-600 px-3 py-2 rounded-lg text-sm"
                                                >
                                                    <i className="fas fa-file-pdf text-red-400"></i>
                                                    <span>{material}</span>
                                                    <i className="fas fa-download text-gray-500"></i>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 액션 버튼 */}
                                    <div className="flex space-x-4 mt-6">
                                        <button 
                                            onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
                                            disabled={currentWeek === 1}
                                            className="bg-gray-100 hover:bg-gray-600 px-4 py-2 rounded-lg disabled:opacity-50"
                                        >
                                            <i className="fas fa-chevron-left mr-2"></i>이전 강의
                                        </button>
                                        <button 
                                            onClick={() => setCurrentWeek(Math.min(14, currentWeek + 1))}
                                            disabled={currentWeek === 14}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg disabled:opacity-50"
                                        >
                                            다음 강의<i className="fas fa-chevron-right ml-2"></i>
                                        </button>
                                        <button 
                                            onClick={openProfessorChat}
                                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                                        >
                                            <i className="fas fa-question-circle mr-2"></i>질문하기
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            /* AI 교수 채팅 */
                            <div className="bg-gray-50 rounded-xl overflow-hidden h-[500px] flex flex-col">
                                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">{selectedCourse.icon}</span>
                                        <div>
                                            <h3 className="font-semibold">{selectedCourse.professor}</h3>
                                            <p className="text-xs text-gray-400">{currentWeek}주차 학습 중</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setShowChat(false)} className="text-gray-400 hover:text-gray-900">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {chatMessages.map(message => (
                                        <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            {message.type === 'ai' && (
                                                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                                                    {selectedCourse.icon}
                                                </div>
                                            )}
                                            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.type === 'user' ? 'bg-yellow-600' : 'bg-gray-100'}`}>
                                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-sm mr-2">
                                                {selectedCourse.icon}
                                            </div>
                                            <div className="bg-gray-100 rounded-2xl px-4 py-3">
                                                <div className="flex space-x-1">
                                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={chatEndRef}></div>
                                </div>

                                <div className="p-4 border-t border-gray-200">
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            value={inputText}
                                            onChange={(e) => setInputText(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="질문을 입력하세요..."
                                            className="flex-1 bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        />
                                        <button
                                            onClick={sendMessage}
                                            disabled={!inputText.trim() || isLoading}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 rounded-lg disabled:opacity-50"
                                        >
                                            <i className="fas fa-paper-plane"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // 내 강좌 목록 화면
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">내 강좌</h1>
                <p className="text-gray-400 mt-1">수강 중인 강좌를 학습하세요</p>
            </div>

            {/* 학습 요약 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">수강 강좌</p>
                            <p className="text-2xl font-bold mt-1">{myCourses.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-book text-blue-400 text-xl"></i>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">평균 진도율</p>
                            <p className="text-2xl font-bold mt-1">
                                {myCourses.length > 0 
                                    ? Math.round(myCourses.reduce((sum, c) => sum + c.progress, 0) / myCourses.length)
                                    : 0}%
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-green-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-chart-line text-green-400 text-xl"></i>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">이수 예정 학점</p>
                            <p className="text-2xl font-bold mt-1">{myCourses.length * 3}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-graduation-cap text-yellow-400 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* 강좌 목록 */}
            {myCourses.length === 0 ? (
                <div className="bg-gray-50 rounded-xl p-12 text-center">
                    <i className="fas fa-book-open text-4xl text-gray-600 mb-4"></i>
                    <h3 className="text-lg font-semibold mb-2">수강 중인 강좌가 없습니다</h3>
                    <p className="text-gray-400 mb-4">강좌 탐색에서 원하는 과목을 수강 신청하세요</p>
                    <button 
                        onClick={() => onNavigate('courses')}
                        className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-2 rounded-lg font-medium"
                    >
                        강좌 탐색하기
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {myCourses.map(course => (
                        <div key={course.course_id} className="bg-gray-50 rounded-xl p-6 card-hover">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                                        {course.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{course.course_name}</h3>
                                        <p className="text-sm text-gray-400">{course.professor}</p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">{course.current_week}/{course.total_weeks}주차</span>
                            </div>

                            {/* 진도 바 */}
                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-400">진도율</span>
                                    <span className="text-yellow-400">{course.progress}%</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all"
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* 주차 표시 */}
                            <div className="flex space-x-1 mb-4">
                                {Array.from({ length: 14 }, (_, i) => (
                                    <div 
                                        key={i}
                                        className={`flex-1 h-1.5 rounded-full ${
                                            i < course.current_week ? 'bg-green-500' : 
                                            i === course.current_week ? 'bg-yellow-500' : 'bg-gray-100'
                                        }`}
                                        title={`${i + 1}주차`}
                                    ></div>
                                ))}
                            </div>

                            <button 
                                onClick={() => startLearning(course)}
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-2 rounded-lg font-medium"
                            >
                                <i className="fas fa-play mr-2"></i>학습하기
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
