const Dashboard = ({ studentId, onNavigate }) => {
    const [stats, setStats] = React.useState(null);
    const [analytics, setAnalytics] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [showTimeline, setShowTimeline] = React.useState(false);

    const RechartsLib = window.Recharts || {};
    const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } = RechartsLib;
    const chartsAvailable = LineChart && ResponsiveContainer;

    // 학습 여정 데모 데이터 (유치원 ~ 현재)
    const learningJourney = [
        { 
            period: '유치원', 
            year: '2010-2012', 
            age: '5-7세',
            icon: '💒',
            subjects: ['기초 한글', '숫자 세기', '그림 그리기', '신체 활동'],
            highlights: ['호기심 지수 상위 15%', '사회성 발달 우수'],
            analysis: '창의적 활동에 높은 흥미, 또래 관계 원만'
        },
        { 
            period: '초등학교', 
            year: '2013-2018', 
            age: '8-13세',
            icon: '📚',
            subjects: ['국어', '수학', '과학', '사회', '영어', '음악', '미술', '체육'],
            highlights: ['수학 경시대회 입상', '과학탐구 우수상', '독서왕 선정'],
            scores: { '국어': 92, '수학': 95, '과학': 94, '사회': 88, '영어': 90 },
            analysis: '논리-수학적 지능 두각, 과학적 탐구심 발현'
        },
        { 
            period: '중학교', 
            year: '2019-2021', 
            age: '14-16세',
            icon: '🎒',
            subjects: ['국어', '수학', '영어', '과학', '사회', '기술가정', '정보'],
            highlights: ['정보올림피아드 동상', '수학 내신 1등급', '영재학급 선발'],
            scores: { '국어': 88, '수학': 97, '영어': 91, '과학': 95, '정보': 98 },
            analysis: '프로그래밍 재능 발견, 알고리즘적 사고력 급성장'
        },
        { 
            period: '고등학교', 
            year: '2022-2024', 
            age: '17-19세',
            icon: '🏫',
            subjects: ['국어', '수학', '영어', '물리', '화학', '정보', '진로'],
            highlights: ['정보올림피아드 금상', 'AI 경진대회 대상', '수능 수학 만점'],
            scores: { '국어': 85, '수학': 100, '영어': 92, '물리': 96, '정보': 100 },
            analysis: 'AI/ML 분야 심화 학습, 자기주도 학습 능력 최상위'
        },
        { 
            period: 'AI 통합대학', 
            year: '2025-현재', 
            age: '20세',
            icon: '🎓',
            subjects: ['알고리즘', '자료구조', '머신러닝', '딥러닝', '선형대수'],
            highlights: ['AI 교수 피드백 우수', '프로젝트 완료 3건', '커뮤니티 활동 상위 10%'],
            scores: { '알고리즘': 92, '자료구조': 88, '머신러닝': 95, '선형대수': 85 },
            analysis: '실무 적용 능력 탁월, 협업 역량 성장 중'
        }
    ];

    // 성적 추이 데이터 (10년간)
    const scoreHistory = [
        { year: '2013', 수학: 88, 과학: 85, 언어: 90, 평균: 87 },
        { year: '2014', 수학: 90, 과학: 87, 언어: 88, 평균: 88 },
        { year: '2015', 수학: 92, 과학: 90, 언어: 89, 평균: 90 },
        { year: '2016', 수학: 91, 과학: 92, 언어: 87, 평균: 90 },
        { year: '2017', 수학: 94, 과학: 93, 언어: 88, 평균: 92 },
        { year: '2018', 수학: 95, 과학: 94, 언어: 88, 평균: 92 },
        { year: '2019', 수학: 97, 과학: 95, 언어: 88, 평균: 93 },
        { year: '2020', 수학: 96, 과학: 96, 언어: 89, 평균: 94 },
        { year: '2021', 수학: 98, 과학: 97, 언어: 90, 평균: 95 },
        { year: '2022', 수학: 99, 과학: 96, 언어: 88, 평균: 94 },
        { year: '2023', 수학: 100, 과학: 98, 언어: 89, 평균: 96 },
        { year: '2024', 수학: 100, 과학: 97, 언어: 90, 평균: 96 },
        { year: '2025', 수학: 95, 과학: 92, 언어: 88, 평균: 92 }
    ];

    // AI 분석 결과
    const aiAnalysis = {
        strengths: ['논리적 사고력', '알고리즘 설계', '자기주도 학습', '문제 해결력'],
        growthAreas: ['언어 표현력', '협업 커뮤니케이션'],
        careerMatch: [
            { job: 'AI 연구원', match: 94 },
            { job: '데이터 사이언티스트', match: 92 },
            { job: '소프트웨어 엔지니어', match: 88 },
            { job: '퀀트 애널리스트', match: 82 }
        ],
        insight: '12년간의 학습 데이터 분석 결과, 논리-수학적 지능이 지속적으로 상위권을 유지하고 있으며, 특히 2019년 이후 프로그래밍 및 AI 분야에서 급격한 성장을 보였습니다. 현재 진로 방향인 AI/ML 분야는 학습 이력과 98% 일치합니다.'
    };

    React.useEffect(() => {
        fetchDashboardData();
    }, [studentId]);

    const fetchDashboardData = async () => {
        try {
            const [statsRes, analyticsRes] = await Promise.all([
                fetch(`/api/university/stats/dashboard?student_id=${studentId}`),
                fetch(`/api/university/analytics?student_id=${studentId}`)
            ]);
            const statsData = await statsRes.json();
            const analyticsData = await analyticsRes.json();
            setStats(statsData.stats);
            setAnalytics(analyticsData);
        } catch (error) {
            console.error('Dashboard data fetch error:', error);
            setStats({
                enrolled_courses: 5,
                completed_exams: 12,
                avg_score: 82.5,
                total_learning_hours: 156,
                current_rank: '상위 15%',
                credits_earned: 15
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

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">대시보드</h1>
                    <p className="text-gray-400 mt-1">나의 학습 현황을 한눈에 확인하세요</p>
                </div>
                <button 
                    onClick={() => setShowTimeline(!showTimeline)}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                >
                    <i className="fas fa-history"></i>
                    <span>{showTimeline ? '현재 현황 보기' : '내 학습 여정 보기'}</span>
                </button>
            </div>

            {/* 학습 여정 타임라인 (토글) */}
            {showTimeline ? (
                <div className="space-y-6">
                    {/* 소개 배너 */}
                    <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-2xl p-6 border border-purple-500">
                        <div className="flex items-start space-x-4">
                            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center text-3xl">
                                🔐
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold mb-2">개인정보 금고(PDV)에 저장된 나의 학습 여정</h2>
                                <p className="text-gray-300">
                                    유치원부터 현재까지 <span className="text-yellow-400 font-semibold">15년간의 모든 학습 기록</span>이 
                                    OpenHash 체인에 안전하게 저장되어 있습니다. 
                                    이 데이터는 오직 본인만 접근할 수 있으며, 위변조가 불가능합니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 타임라인 */}
                    <div className="bg-gray-800 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-6 flex items-center">
                            <i className="fas fa-road text-yellow-400 mr-2"></i>
                            학습 여정 타임라인
                        </h3>
                        <div className="relative">
                            {/* 타임라인 라인 */}
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-500 via-purple-500 to-blue-500"></div>
                            
                            <div className="space-y-8">
                                {learningJourney.map((period, index) => (
                                    <div key={index} className="relative pl-20">
                                        {/* 타임라인 노드 */}
                                        <div className="absolute left-4 w-8 h-8 bg-gray-900 rounded-full border-4 border-yellow-500 flex items-center justify-center text-lg">
                                            {period.icon}
                                        </div>
                                        
                                        <div className="bg-gray-700 rounded-xl p-5 hover:bg-gray-650 transition-colors">
                                            <div className="flex items-center justify-between mb-3">
                                                <div>
                                                    <h4 className="text-lg font-semibold text-yellow-400">{period.period}</h4>
                                                    <p className="text-sm text-gray-400">{period.year} ({period.age})</p>
                                                </div>
                                                {period.scores && (
                                                    <div className="text-right">
                                                        <span className="text-2xl font-bold text-green-400">
                                                            {Math.round(Object.values(period.scores).reduce((a,b) => a+b, 0) / Object.values(period.scores).length)}
                                                        </span>
                                                        <span className="text-sm text-gray-400 ml-1">평균</span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* 과목 태그 */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {period.subjects.slice(0, 6).map((subject, i) => (
                                                    <span key={i} className="text-xs bg-gray-600 px-2 py-1 rounded-full">{subject}</span>
                                                ))}
                                                {period.subjects.length > 6 && (
                                                    <span className="text-xs bg-gray-600 px-2 py-1 rounded-full">+{period.subjects.length - 6}</span>
                                                )}
                                            </div>
                                            
                                            {/* 하이라이트 */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {period.highlights.map((h, i) => (
                                                    <span key={i} className="text-xs bg-yellow-500 bg-opacity-20 text-yellow-400 px-2 py-1 rounded-full">
                                                        🏆 {h}
                                                    </span>
                                                ))}
                                            </div>
                                            
                                            {/* AI 분석 */}
                                            <p className="text-sm text-gray-400 italic">
                                                <i className="fas fa-robot text-purple-400 mr-1"></i>
                                                AI 분석: {period.analysis}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 10년 성적 추이 그래프 */}
                    <div className="bg-gray-800 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <i className="fas fa-chart-line text-green-400 mr-2"></i>
                            12년간 성적 변화 추이
                        </h3>
                        {chartsAvailable ? (
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={scoreHistory}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis dataKey="year" stroke="#9CA3AF" />
                                        <YAxis domain={[70, 100]} stroke="#9CA3AF" />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                                            labelStyle={{ color: '#F3F4F6' }}
                                        />
                                        <Area type="monotone" dataKey="수학" stackId="1" stroke="#EAB308" fill="#EAB308" fillOpacity={0.3} />
                                        <Area type="monotone" dataKey="과학" stackId="2" stroke="#22C55E" fill="#22C55E" fillOpacity={0.3} />
                                        <Area type="monotone" dataKey="언어" stackId="3" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="h-64 flex items-center justify-center bg-gray-700 rounded-lg">
                                <p className="text-gray-400">차트 로딩 중...</p>
                            </div>
                        )}
                        <div className="flex justify-center space-x-6 mt-4">
                            <span className="flex items-center"><span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>수학/논리</span>
                            <span className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>과학/탐구</span>
                            <span className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>언어/표현</span>
                        </div>
                    </div>

                    {/* AI 종합 분석 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-gray-800 rounded-xl p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <i className="fas fa-brain text-purple-400 mr-2"></i>
                                AI 역량 분석
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-400 mb-2">핵심 강점</p>
                                    <div className="flex flex-wrap gap-2">
                                        {aiAnalysis.strengths.map((s, i) => (
                                            <span key={i} className="bg-green-500 bg-opacity-20 text-green-400 px-3 py-1 rounded-full text-sm">{s}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-2">성장 영역</p>
                                    <div className="flex flex-wrap gap-2">
                                        {aiAnalysis.growthAreas.map((s, i) => (
                                            <span key={i} className="bg-yellow-500 bg-opacity-20 text-yellow-400 px-3 py-1 rounded-full text-sm">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-xl p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <i className="fas fa-briefcase text-blue-400 mr-2"></i>
                                AI 진로 매칭
                            </h3>
                            <div className="space-y-3">
                                {aiAnalysis.careerMatch.map((career, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <span>{career.job}</span>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-gradient-to-r from-yellow-500 to-green-500 rounded-full"
                                                    style={{ width: `${career.match}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-yellow-400 font-semibold w-12 text-right">{career.match}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* AI 인사이트 */}
                    <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 border-l-4 border-yellow-500">
                        <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-yellow-500 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                                <i className="fas fa-lightbulb text-yellow-400"></i>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">AI 종합 인사이트</h4>
                                <p className="text-gray-300">{aiAnalysis.insight}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {/* 기존 대시보드 내용 */}
                    {/* 통계 카드 */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">수강 강좌</p>
                                    <p className="text-2xl font-bold mt-1">{stats?.enrolled_courses || 0}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                                    <i className="fas fa-book text-blue-400 text-xl"></i>
                                </div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">완료 시험</p>
                                    <p className="text-2xl font-bold mt-1">{stats?.completed_exams || 0}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                                    <i className="fas fa-clipboard-check text-green-400 text-xl"></i>
                                </div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">평균 성적</p>
                                    <p className="text-2xl font-bold mt-1">{stats?.avg_score?.toFixed(1) || 0}</p>
                                </div>
                                <div className="w-12 h-12 bg-yellow-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                                    <i className="fas fa-star text-yellow-400 text-xl"></i>
                                </div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">전국 순위</p>
                                    <p className="text-2xl font-bold mt-1">{stats?.current_rank || '-'}</p>
                                </div>
                                <div className="w-12 h-12 bg-purple-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                                    <i className="fas fa-trophy text-purple-400 text-xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 학습 여정 미리보기 배너 */}
                    <div 
                        onClick={() => setShowTimeline(true)}
                        className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-xl p-6 cursor-pointer hover:from-purple-700 hover:to-blue-700 transition-all border border-purple-500 border-opacity-50"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center text-2xl">
                                    🔐
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">내 학습 여정 탐색하기</h3>
                                    <p className="text-gray-300 text-sm mt-1">
                                        유치원부터 현재까지 <span className="text-yellow-400">15년간의 학습 기록</span>이 개인정보 금고에 안전하게 보관되어 있습니다
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="hidden md:flex space-x-2">
                                    <span className="text-2xl">💒</span>
                                    <span className="text-gray-400">→</span>
                                    <span className="text-2xl">📚</span>
                                    <span className="text-gray-400">→</span>
                                    <span className="text-2xl">🎒</span>
                                    <span className="text-gray-400">→</span>
                                    <span className="text-2xl">🏫</span>
                                    <span className="text-gray-400">→</span>
                                    <span className="text-2xl">🎓</span>
                                </div>
                                <i className="fas fa-chevron-right text-yellow-400 text-xl"></i>
                            </div>
                        </div>
                    </div>

                    {/* 성적 추이 차트 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-gray-800 rounded-xl p-6">
                            <h3 className="text-lg font-semibold mb-4">
                                <i className="fas fa-chart-line text-yellow-400 mr-2"></i>
                                최근 성적 추이
                            </h3>
                            {chartsAvailable && analytics?.score_trend ? (
                                <div className="h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={analytics.score_trend}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                            <XAxis dataKey="week" stroke="#9CA3AF" />
                                            <YAxis domain={[60, 100]} stroke="#9CA3AF" />
                                            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                                            <Line type="monotone" dataKey="score" stroke="#EAB308" strokeWidth={2} dot={{ fill: '#EAB308' }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            ) : (
                                <div className="h-48 flex items-center justify-center bg-gray-700 rounded-lg">
                                    <p className="text-gray-400">데이터 로딩 중...</p>
                                </div>
                            )}
                        </div>

                        <div className="bg-gray-800 rounded-xl p-6">
                            <h3 className="text-lg font-semibold mb-4">
                                <i className="fas fa-clock text-blue-400 mr-2"></i>
                                과목별 학습 시간
                            </h3>
                            {analytics?.learning_time && (
                                <div className="space-y-3">
                                    {Object.entries(analytics.learning_time).map(([subject, hours]) => (
                                        <div key={subject}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>{subject}</span>
                                                <span className="text-gray-400">{hours}시간</span>
                                            </div>
                                            <div className="progress-bar">
                                                <div 
                                                    className="progress-fill bg-blue-500"
                                                    style={{ width: `${(hours / 60) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 빠른 액션 */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button onClick={() => onNavigate('courses')} className="bg-gray-800 hover:bg-gray-700 rounded-xl p-4 text-center transition-colors">
                            <i className="fas fa-search text-2xl text-yellow-400 mb-2"></i>
                            <p className="font-medium">강좌 탐색</p>
                        </button>
                        <button onClick={() => onNavigate('my-learning')} className="bg-gray-800 hover:bg-gray-700 rounded-xl p-4 text-center transition-colors">
                            <i className="fas fa-play-circle text-2xl text-green-400 mb-2"></i>
                            <p className="font-medium">학습 계속</p>
                        </button>
                        <button onClick={() => onNavigate('exam')} className="bg-gray-800 hover:bg-gray-700 rounded-xl p-4 text-center transition-colors">
                            <i className="fas fa-clipboard-list text-2xl text-blue-400 mb-2"></i>
                            <p className="font-medium">시험 응시</p>
                        </button>
                        <button onClick={() => onNavigate('career')} className="bg-gray-800 hover:bg-gray-700 rounded-xl p-4 text-center transition-colors">
                            <i className="fas fa-briefcase text-2xl text-purple-400 mb-2"></i>
                            <p className="font-medium">진로 상담</p>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
