const AIProfessor = ({ courseId, studentId, onBack }) => {
    const [courseInfo, setCourseInfo] = React.useState(null);
    const [activeTab, setActiveTab] = React.useState('lecture');
    const [currentWeek, setCurrentWeek] = React.useState(1);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetchCourseInfo();
    }, [courseId]);

    const fetchCourseInfo = async () => {
        try {
            const response = await fetch(`/api/university/courses/${courseId}`);
            const data = await response.json();
            setCourseInfo(data.course);
        } catch (error) {
            console.error('Failed to fetch course info:', error);
            // 데모 데이터
            setCourseInfo({
                id: 'prof-algorithm',
                name_ko: '알고리즘 AI 교수',
                subject: '알고리즘 이론',
                icon: '🧮',
                description: '정렬, 탐색, 그래프, 동적 프로그래밍 등 알고리즘의 설계와 분석을 학습합니다.',
                curriculum: [
                    { week: 1, topic: '알고리즘 개요 및 복잡도 분석', hours: 3 },
                    { week: 2, topic: '분할 정복 알고리즘', hours: 3 },
                    { week: 3, topic: '정렬 알고리즘', hours: 3 },
                    { week: 4, topic: '탐색 알고리즘', hours: 3 },
                    { week: 5, topic: '그래프 기초', hours: 3 },
                    { week: 6, topic: '최단 경로 알고리즘', hours: 3 },
                    { week: 7, topic: '중간고사', hours: 2 },
                    { week: 8, topic: '동적 프로그래밍 기초', hours: 3 },
                    { week: 9, topic: '동적 프로그래밍 응용', hours: 3 },
                    { week: 10, topic: '그리디 알고리즘', hours: 3 },
                    { week: 11, topic: '백트래킹', hours: 3 },
                    { week: 12, topic: 'NP-완전 문제', hours: 3 },
                    { week: 13, topic: '근사 알고리즘', hours: 3 },
                    { week: 14, topic: '기말고사', hours: 2 }
                ]
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <i className="fas fa-spinner fa-spin text-4xl text-yellow-400"></i>
            </div>
        );
    }

    const tabs = [
        { id: 'lecture', label: '강의', icon: 'fa-play-circle' },
        { id: 'chat', label: 'AI 교수 Q&A', icon: 'fa-comments' },
        { id: 'curriculum', label: '커리큘럼', icon: 'fa-list-ol' },
        { id: 'materials', label: '학습자료', icon: 'fa-folder-open' }
    ];

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center text-3xl">
                            {courseInfo?.icon || '📚'}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{courseInfo?.subject}</h1>
                            <p className="text-gray-400">{courseInfo?.name_ko}</p>
                        </div>
                    </div>
                    <button
                        onClick={onBack}
                        className="text-gray-400 hover:text-gray-900"
                    >
                        <i className="fas fa-times text-xl"></i>
                    </button>
                </div>
            </div>

            {/* 탭 */}
            <div className="flex space-x-2 border-b border-gray-200 pb-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-t-lg transition-colors ${
                            activeTab === tab.id
                                ? 'bg-gray-50 text-yellow-400 border-b-2 border-yellow-400'
                                : 'text-gray-400 hover:text-gray-900'
                        }`}
                    >
                        <i className={`fas ${tab.icon} mr-2`}></i>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* 탭 콘텐츠 */}
            <div className="bg-gray-50 rounded-xl p-6 min-h-[400px]">
                {activeTab === 'lecture' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">
                                {currentWeek}주차: {courseInfo?.curriculum?.[currentWeek - 1]?.topic}
                            </h3>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
                                    disabled={currentWeek === 1}
                                    className="p-2 bg-gray-100 rounded-lg disabled:opacity-50"
                                >
                                    <i className="fas fa-chevron-left"></i>
                                </button>
                                <span className="px-4">{currentWeek} / {courseInfo?.curriculum?.length}</span>
                                <button
                                    onClick={() => setCurrentWeek(Math.min(courseInfo?.curriculum?.length || 14, currentWeek + 1))}
                                    disabled={currentWeek === courseInfo?.curriculum?.length}
                                    className="p-2 bg-gray-100 rounded-lg disabled:opacity-50"
                                >
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                        
                        {/* 강의 영상 영역 (플레이스홀더) */}
                        <div className="bg-white rounded-xl aspect-video flex items-center justify-center">
                            <div className="text-center">
                                <i className="fas fa-play-circle text-6xl text-yellow-400 mb-4"></i>
                                <p className="text-xl font-semibold">AI 강의 시작</p>
                                <p className="text-gray-400 mt-2">클릭하여 {currentWeek}주차 강의를 시작하세요</p>
                            </div>
                        </div>
                        
                        <div className="flex space-x-4">
                            <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-3 rounded-lg font-medium">
                                <i className="fas fa-play mr-2"></i>강의 시작
                            </button>
                            <button className="bg-gray-100 hover:bg-gray-600 px-6 py-3 rounded-lg">
                                <i className="fas fa-bookmark"></i>
                            </button>
                            <button className="bg-gray-100 hover:bg-gray-600 px-6 py-3 rounded-lg">
                                <i className="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'chat' && (
                    <div className="h-[500px]">
                        <AIChat
                            professorId={courseId}
                            professorName={courseInfo?.name_ko}
                            professorIcon={courseInfo?.icon}
                        />
                    </div>
                )}

                {activeTab === 'curriculum' && (
                    <div className="space-y-2">
                        {courseInfo?.curriculum?.map((week, index) => (
                            <div
                                key={week.week}
                                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                                    currentWeek === week.week
                                        ? 'bg-yellow-500 bg-opacity-20 border border-yellow-500'
                                        : 'bg-gray-100 hover:bg-gray-600'
                                }`}
                                onClick={() => {
                                    setCurrentWeek(week.week);
                                    setActiveTab('lecture');
                                }}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        index < currentWeek - 1
                                            ? 'bg-green-500'
                                            : currentWeek === week.week
                                                ? 'bg-yellow-500'
                                                : 'bg-gray-600'
                                    }`}>
                                        {index < currentWeek - 1 ? (
                                            <i className="fas fa-check text-gray-900"></i>
                                        ) : (
                                            <span className="font-bold">{week.week}</span>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium">{week.topic}</p>
                                        <p className="text-sm text-gray-400">{week.hours}시간</p>
                                    </div>
                                </div>
                                <i className="fas fa-chevron-right text-gray-500"></i>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'materials' && (
                    <div className="space-y-4">
                        <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <i className="fas fa-file-pdf text-red-400 text-2xl"></i>
                                <div>
                                    <p className="font-medium">강의 슬라이드 (전체)</p>
                                    <p className="text-sm text-gray-400">PDF, 15.2MB</p>
                                </div>
                            </div>
                            <button className="text-yellow-400 hover:text-yellow-300">
                                <i className="fas fa-download"></i>
                            </button>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <i className="fas fa-file-code text-blue-400 text-2xl"></i>
                                <div>
                                    <p className="font-medium">예제 코드</p>
                                    <p className="text-sm text-gray-400">ZIP, 2.8MB</p>
                                </div>
                            </div>
                            <button className="text-yellow-400 hover:text-yellow-300">
                                <i className="fas fa-download"></i>
                            </button>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <i className="fas fa-book text-green-400 text-2xl"></i>
                                <div>
                                    <p className="font-medium">추천 교재 목록</p>
                                    <p className="text-sm text-gray-400">PDF, 0.5MB</p>
                                </div>
                            </div>
                            <button className="text-yellow-400 hover:text-yellow-300">
                                <i className="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
