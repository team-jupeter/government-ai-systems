const CourseList = ({ studentId, onNavigate }) => {
    const [courses, setCourses] = React.useState([]);
    const [fields, setFields] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [selectedField, setSelectedField] = React.useState('all');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [enrollingCourse, setEnrollingCourse] = React.useState(null);
    const [enrolledCourses, setEnrolledCourses] = React.useState([]);

    React.useEffect(() => {
        fetchCourses();
        fetchEnrolledCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch('/api/university/courses');
            const data = await response.json();
            setCourses(data.courses || []);
            setFields(data.fields || {});
        } catch (error) {
            console.error('Failed to fetch courses:', error);
            // 데모 데이터
            setCourses([
                { id: 'prof-algorithm', name: '알고리즘 이론', professor: '알고리즘 AI 교수', field: 'computer', field_name: '컴퓨터공학', icon: '🧮', description: '정렬, 탐색, 그래프, 동적 프로그래밍 등', total_students: 45230, avg_score: 78.5, difficulty: 4, credits: 3 },
                { id: 'prof-datastructure', name: '자료구조', professor: '자료구조 AI 교수', field: 'computer', field_name: '컴퓨터공학', icon: '🗂️', description: '배열, 연결리스트, 트리, 그래프 등', total_students: 52100, avg_score: 75.2, difficulty: 3, credits: 3 },
                { id: 'prof-ml', name: '머신러닝', professor: '머신러닝 AI 교수', field: 'ai', field_name: '인공지능', icon: '🤖', description: '지도학습, 비지도학습, 강화학습', total_students: 62300, avg_score: 76.9, difficulty: 4, credits: 3 },
                { id: 'prof-dl', name: '딥러닝', professor: '딥러닝 AI 교수', field: 'ai', field_name: '인공지능', icon: '🧠', description: 'CNN, RNN, Transformer 등', total_students: 58700, avg_score: 75.4, difficulty: 5, credits: 3 },
                { id: 'prof-calculus', name: '미적분학', professor: '미적분학 AI 교수', field: 'math', field_name: '수학', icon: '∫', description: '함수의 극한, 미분, 적분', total_students: 68500, avg_score: 71.2, difficulty: 4, credits: 3 },
                { id: 'prof-linear-algebra', name: '선형대수학', professor: '선형대수학 AI 교수', field: 'math', field_name: '수학', icon: '📐', description: '벡터, 행렬, 선형변환, 고유값', total_students: 55200, avg_score: 73.5, difficulty: 3, credits: 3 },
                { id: 'prof-statistics', name: '확률과 통계', professor: '확률통계 AI 교수', field: 'math', field_name: '수학', icon: '📊', description: '확률론, 통계적 추론, 가설검정', total_students: 48900, avg_score: 74.8, difficulty: 3, credits: 3 },
                { id: 'prof-physics', name: '일반물리학', professor: '일반물리학 AI 교수', field: 'physics', field_name: '물리학', icon: '⚛️', description: '역학, 전자기학, 열역학, 광학', total_students: 72500, avg_score: 70.5, difficulty: 4, credits: 3 },
                { id: 'prof-economics', name: '경제학원론', professor: '경제학원론 AI 교수', field: 'business', field_name: '경영/경제', icon: '📈', description: '미시경제, 거시경제의 기본 원리', total_students: 85200, avg_score: 76.8, difficulty: 2, credits: 3 }
            ]);
            setFields({
                computer: { name: '컴퓨터공학', icon: '💻', color: '#3B82F6' },
                math: { name: '수학', icon: '📐', color: '#8B5CF6' },
                ai: { name: '인공지능', icon: '🤖', color: '#10B981' },
                physics: { name: '물리학', icon: '⚛️', color: '#F59E0B' },
                business: { name: '경영/경제', icon: '📈', color: '#6366F1' }
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchEnrolledCourses = async () => {
        try {
            const response = await fetch(`/api/university/my-courses?student_id=${studentId}`);
            const data = await response.json();
            setEnrolledCourses((data.courses || []).map(c => c.course_id));
        } catch (error) {
            console.error('Failed to fetch enrolled courses:', error);
        }
    };

    const handleEnroll = async (courseId) => {
        setEnrollingCourse(courseId);
        try {
            const response = await fetch(`/api/university/courses/${courseId}/enroll`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ student_id: studentId })
            });
            const data = await response.json();
            if (data.success) {
                setEnrolledCourses(prev => [...prev, courseId]);
                alert(data.message || '수강 신청이 완료되었습니다!');
            }
        } catch (error) {
            console.error('Enrollment failed:', error);
            alert('수강 신청에 실패했습니다. 다시 시도해 주세요.');
        } finally {
            setEnrollingCourse(null);
        }
    };

    const filteredCourses = courses.filter(course => {
        const matchesField = selectedField === 'all' || course.field === selectedField;
        const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            course.professor.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesField && matchesSearch;
    });

    const renderDifficulty = (level) => {
        return Array(5).fill(0).map((_, i) => (
            <i key={i} className={`fas fa-star text-xs ${i < level ? 'text-yellow-400' : 'text-gray-600'}`}></i>
        ));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <i className="fas fa-spinner fa-spin text-4xl text-yellow-400 mb-4"></i>
                    <p className="text-gray-400">강좌 목록 로딩 중...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div>
                <h1 className="text-2xl font-bold">강좌 탐색</h1>
                <p className="text-gray-400 mt-1">AI 교수와 함께하는 맞춤형 학습</p>
            </div>

            {/* 검색 및 필터 */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="강좌명 또는 AI 교수 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-yellow-500"
                    />
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                    <button
                        onClick={() => setSelectedField('all')}
                        className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                            selectedField === 'all' 
                                ? 'bg-yellow-500 text-gray-900' 
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                        전체
                    </button>
                    {Object.entries(fields).map(([key, field]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedField(key)}
                            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
                                selectedField === key 
                                    ? 'bg-yellow-500 text-gray-900' 
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            <span>{field.icon}</span>
                            <span>{field.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-400">{courses.length}</p>
                    <p className="text-sm text-gray-400">전체 강좌</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-blue-400">{Object.keys(fields).length}</p>
                    <p className="text-sm text-gray-400">학문 분야</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-green-400">
                        {(courses.reduce((sum, c) => sum + c.total_students, 0) / 1000).toFixed(0)}K
                    </p>
                    <p className="text-sm text-gray-400">총 수강생</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-purple-400">{enrolledCourses.length}</p>
                    <p className="text-sm text-gray-400">내 수강 강좌</p>
                </div>
            </div>

            {/* 강좌 목록 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => {
                    const isEnrolled = enrolledCourses.includes(course.id);
                    const isEnrolling = enrollingCourse === course.id;
                    
                    return (
                        <div key={course.id} className="bg-gray-800 rounded-xl overflow-hidden card-hover">
                            {/* 헤더 */}
                            <div className="p-4 border-b border-gray-700" style={{ borderLeftColor: fields[course.field]?.color, borderLeftWidth: '4px' }}>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center text-2xl">
                                            {course.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{course.name}</h3>
                                            <p className="text-sm text-gray-400">{course.professor}</p>
                                        </div>
                                    </div>
                                    <span className="badge bg-gray-700 text-gray-300">{course.credits}학점</span>
                                </div>
                            </div>
                            
                            {/* 본문 */}
                            <div className="p-4">
                                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{course.description}</p>
                                
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">분야</span>
                                        <span className="text-gray-300">{course.field_name}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">난이도</span>
                                        <div className="flex gap-0.5">{renderDifficulty(course.difficulty)}</div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">수강생</span>
                                        <span className="text-gray-300">{course.total_students.toLocaleString()}명</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">평균 성적</span>
                                        <span className="text-yellow-400">{course.avg_score}점</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* 버튼 */}
                            <div className="p-4 border-t border-gray-700">
                                {isEnrolled ? (
                                    <button
                                        onClick={() => onNavigate('my-learning')}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-2.5 font-medium transition-colors"
                                    >
                                        <i className="fas fa-check mr-2"></i>수강 중 - 학습하기
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEnroll(course.id)}
                                        disabled={isEnrolling}
                                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-lg py-2.5 font-medium transition-colors disabled:opacity-50"
                                    >
                                        {isEnrolling ? (
                                            <><i className="fas fa-spinner fa-spin mr-2"></i>신청 중...</>
                                        ) : (
                                            <><i className="fas fa-plus mr-2"></i>수강 신청</>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                    <i className="fas fa-search text-4xl text-gray-600 mb-4"></i>
                    <p className="text-gray-400">검색 결과가 없습니다</p>
                </div>
            )}
        </div>
    );
};
