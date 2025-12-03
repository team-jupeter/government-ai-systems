const ExamCenter = ({ studentId, onNavigate }) => {
    const [exams, setExams] = React.useState([]);
    const [examHistory, setExamHistory] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [activeExam, setActiveExam] = React.useState(null);
    const [examInProgress, setExamInProgress] = React.useState(false);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [answers, setAnswers] = React.useState({});
    const [timeLeft, setTimeLeft] = React.useState(0);

    React.useEffect(() => {
        fetchExamData();
    }, [studentId]);

    const fetchExamData = async () => {
        // 데모 데이터
        setExams([
            { id: 'exam-1', course_id: 'prof-algorithm', course_name: '알고리즘 이론', type: 'midterm', title: '중간고사', duration: 90, questions: 25, status: 'available', deadline: '2025-12-05' },
            { id: 'exam-2', course_id: 'prof-algorithm', course_name: '알고리즘 이론', type: 'quiz', title: '9주차 퀴즈', duration: 30, questions: 10, status: 'available', deadline: '2025-12-02' },
            { id: 'exam-3', course_id: 'prof-ml', course_name: '머신러닝', type: 'quiz', title: '6주차 퀴즈', duration: 30, questions: 10, status: 'available', deadline: '2025-12-03' }
        ]);
        setExamHistory([
            { id: 'hist-1', course_name: '알고리즘 이론', title: '8주차 퀴즈', score: 92, max_score: 100, percentile: 85, taken_at: '2025-11-25' },
            { id: 'hist-2', course_name: '선형대수학', title: '중간고사', score: 88, max_score: 100, percentile: 78, taken_at: '2025-11-20' },
            { id: 'hist-3', course_name: '머신러닝', title: '5주차 퀴즈', score: 85, max_score: 100, percentile: 72, taken_at: '2025-11-18' }
        ]);
        setLoading(false);
    };

    const sampleQuestions = [
        {
            id: 1,
            question: '퀵 정렬(Quick Sort)의 평균 시간 복잡도는?',
            options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
            correct: 1
        },
        {
            id: 2,
            question: '다음 중 분할 정복(Divide and Conquer) 알고리즘이 아닌 것은?',
            options: ['머지 소트', '퀵 소트', '버블 소트', '이진 탐색'],
            correct: 2
        },
        {
            id: 3,
            question: '동적 프로그래밍의 핵심 개념은?',
            options: ['재귀', '메모이제이션', '분할', '정복'],
            correct: 1
        }
    ];

    const startExam = (exam) => {
        setActiveExam(exam);
        setExamInProgress(true);
        setCurrentQuestion(0);
        setAnswers({});
        setTimeLeft(exam.duration * 60);
    };

    const submitExam = async () => {
        try {
            const response = await fetch('/api/university/exam/take', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    student_id: studentId,
                    course_id: activeExam.course_id,
                    exam_type: activeExam.type,
                    answers: answers
                })
            });
            const data = await response.json();
            
            alert(`시험 완료!\n점수: ${data.result?.score || Math.floor(Math.random() * 20 + 80)}점\n백분위: 상위 ${data.result?.percentile || Math.floor(Math.random() * 20 + 10)}%`);
            
            setExamInProgress(false);
            setActiveExam(null);
            fetchExamData();
        } catch (error) {
            console.error('Exam submission failed:', error);
            alert('시험 제출에 실패했습니다.');
        }
    };

    React.useEffect(() => {
        if (examInProgress && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (examInProgress && timeLeft === 0) {
            submitExam();
        }
    }, [examInProgress, timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <i className="fas fa-spinner fa-spin text-4xl text-yellow-400"></i>
            </div>
        );
    }

    if (examInProgress && activeExam) {
        const question = sampleQuestions[currentQuestion];
        
        return (
            <div className="space-y-6">
                {/* 시험 헤더 */}
                <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <h2 className="font-semibold">{activeExam.course_name} - {activeExam.title}</h2>
                        <p className="text-sm text-gray-400">문제 {currentQuestion + 1} / {sampleQuestions.length}</p>
                    </div>
                    <div className={`text-2xl font-mono font-bold ${timeLeft < 300 ? 'text-red-400' : 'text-yellow-400'}`}>
                        <i className="fas fa-clock mr-2"></i>
                        {formatTime(timeLeft)}
                    </div>
                </div>

                {/* 문제 */}
                <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl mb-6">Q{currentQuestion + 1}. {question.question}</h3>
                    <div className="space-y-3">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => setAnswers({ ...answers, [question.id]: index })}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                                    answers[question.id] === index
                                        ? 'border-yellow-500 bg-yellow-500 bg-opacity-20'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <span className="inline-block w-8 h-8 rounded-full bg-gray-100 text-center leading-8 mr-3">
                                    {String.fromCharCode(65 + index)}
                                </span>
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 네비게이션 */}
                <div className="flex justify-between">
                    <button
                        onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                        disabled={currentQuestion === 0}
                        className="bg-gray-100 hover:bg-gray-600 px-6 py-3 rounded-lg disabled:opacity-50"
                    >
                        <i className="fas fa-chevron-left mr-2"></i>이전
                    </button>
                    
                    {currentQuestion === sampleQuestions.length - 1 ? (
                        <button
                            onClick={submitExam}
                            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-medium"
                        >
                            <i className="fas fa-check mr-2"></i>제출하기
                        </button>
                    ) : (
                        <button
                            onClick={() => setCurrentQuestion(Math.min(sampleQuestions.length - 1, currentQuestion + 1))}
                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg font-medium"
                        >
                            다음<i className="fas fa-chevron-right ml-2"></i>
                        </button>
                    )}
                </div>

                {/* 문제 번호 표시 */}
                <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-400 mb-3">문제 목록</p>
                    <div className="flex flex-wrap gap-2">
                        {sampleQuestions.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentQuestion(index)}
                                className={`w-10 h-10 rounded-lg font-medium ${
                                    currentQuestion === index
                                        ? 'bg-yellow-500 text-gray-900'
                                        : answers[sampleQuestions[index].id] !== undefined
                                            ? 'bg-green-600'
                                            : 'bg-gray-100'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div>
                <h1 className="text-2xl font-bold">시험 센터</h1>
                <p className="text-gray-400 mt-1">시험에 응시하고 성적을 확인하세요</p>
            </div>

            {/* 응시 가능한 시험 */}
            <div>
                <h2 className="text-lg font-semibold mb-4">
                    <i className="fas fa-clipboard-list text-yellow-400 mr-2"></i>
                    응시 가능한 시험
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {exams.map(exam => (
                        <div key={exam.id} className="bg-gray-50 rounded-xl p-5 card-hover">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <span className={`badge ${
                                        exam.type === 'midterm' || exam.type === 'final'
                                            ? 'bg-red-500 bg-opacity-20 text-red-400'
                                            : 'bg-blue-500 bg-opacity-20 text-blue-400'
                                    }`}>
                                        {exam.type === 'midterm' ? '중간고사' : exam.type === 'final' ? '기말고사' : '퀴즈'}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                    마감: {exam.deadline}
                                </span>
                            </div>
                            <h3 className="font-semibold mb-1">{exam.course_name}</h3>
                            <p className="text-gray-400 text-sm mb-4">{exam.title}</p>
                            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                                <span><i className="fas fa-clock mr-1"></i>{exam.duration}분</span>
                                <span><i className="fas fa-question-circle mr-1"></i>{exam.questions}문항</span>
                            </div>
                            <button
                                onClick={() => startExam(exam)}
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-2.5 rounded-lg font-medium"
                            >
                                <i className="fas fa-play mr-2"></i>시험 시작
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* 시험 기록 */}
            <div>
                <h2 className="text-lg font-semibold mb-4">
                    <i className="fas fa-history text-blue-400 mr-2"></i>
                    시험 기록
                </h2>
                <div className="bg-gray-50 rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left p-4">과목</th>
                                <th className="text-left p-4">시험</th>
                                <th className="text-center p-4">점수</th>
                                <th className="text-center p-4">백분위</th>
                                <th className="text-center p-4">응시일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {examHistory.map(record => (
                                <tr key={record.id} className="border-t border-gray-200">
                                    <td className="p-4">{record.course_name}</td>
                                    <td className="p-4">{record.title}</td>
                                    <td className="p-4 text-center">
                                        <span className="text-yellow-400 font-semibold">{record.score}</span>
                                        <span className="text-gray-500">/{record.max_score}</span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="text-green-400">상위 {100 - record.percentile}%</span>
                                    </td>
                                    <td className="p-4 text-center text-gray-400">{record.taken_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
