const GradeReport = ({ studentId, onNavigate }) => {
    const [grades, setGrades] = React.useState([]);
    const [analytics, setAnalytics] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const RechartsLib = window.Recharts || {};
    const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
            BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } = RechartsLib;

    const chartsAvailable = LineChart && ResponsiveContainer;

    React.useEffect(() => {
        fetchGradeData();
    }, [studentId]);

    const fetchGradeData = async () => {
        setGrades([
            { course_name: '알고리즘 이론', scores: [85, 92, 88], avg: 88.3, rank: '상위 12%', credits: 3 },
            { course_name: '머신러닝', scores: [78, 85, 82], avg: 81.7, rank: '상위 18%', credits: 3 },
            { course_name: '선형대수학', scores: [90, 88, 92], avg: 90.0, rank: '상위 8%', credits: 3 },
            { course_name: '자료구조', scores: [82, 86, 84], avg: 84.0, rank: '상위 15%', credits: 3 }
        ]);
        
        setAnalytics({
            overall_avg: 86.0,
            overall_rank: '상위 13%',
            total_credits: 12,
            gpa: 3.8,
            trend: [
                { month: '9월', score: 82 },
                { month: '10월', score: 85 },
                { month: '11월', score: 88 },
                { month: '12월', score: 86 }
            ],
            competencies: [
                { subject: '알고리즘', score: 88 },
                { subject: '수학', score: 90 },
                { subject: 'AI/ML', score: 82 },
                { subject: '프로그래밍', score: 85 },
                { subject: '이론', score: 80 },
                { subject: '실습', score: 87 }
            ],
            distribution: [
                { range: '90-100', count: 8, percent: 20 },
                { range: '80-89', count: 15, percent: 37.5 },
                { range: '70-79', count: 12, percent: 30 },
                { range: '60-69', count: 4, percent: 10 },
                { range: '0-59', count: 1, percent: 2.5 }
            ]
        });
        
        setLoading(false);
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
            <div>
                <h1 className="text-2xl font-bold">성적 및 학습 분석</h1>
                <p className="text-gray-400 mt-1">전체 학습 성취도와 상세 분석을 확인하세요</p>
            </div>

            {/* 요약 카드 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-5 text-gray-900">
                    <p className="text-yellow-900 text-sm">전체 평균</p>
                    <p className="text-3xl font-bold">{analytics.overall_avg}</p>
                    <p className="text-sm mt-1">{analytics.overall_rank}</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-5">
                    <p className="text-gray-400 text-sm">GPA</p>
                    <p className="text-3xl font-bold text-blue-400">{analytics.gpa}</p>
                    <p className="text-sm text-gray-500 mt-1">/ 4.5</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-5">
                    <p className="text-gray-400 text-sm">이수 학점</p>
                    <p className="text-3xl font-bold text-green-400">{analytics.total_credits}</p>
                    <p className="text-sm text-gray-500 mt-1">학점</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-5">
                    <p className="text-gray-400 text-sm">수강 과목</p>
                    <p className="text-3xl font-bold text-purple-400">{grades.length}</p>
                    <p className="text-sm text-gray-500 mt-1">과목</p>
                </div>
            </div>

            {/* 차트 영역 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 성적 추이 */}
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        <i className="fas fa-chart-line text-yellow-400 mr-2"></i>
                        월별 성적 추이
                    </h3>
                    <div className="h-64">
                        {chartsAvailable ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={analytics.trend}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="month" stroke="#9CA3AF" />
                                    <YAxis stroke="#9CA3AF" domain={[0, 100]} />
                                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                                    <Line type="monotone" dataKey="score" stroke="#d4af37" strokeWidth={3} dot={{ fill: '#d4af37' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="space-y-2">
                                {analytics.trend.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between bg-gray-700 p-3 rounded">
                                        <span>{item.month}</span>
                                        <span className="text-yellow-400 font-bold">{item.score}점</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* 역량 분석 */}
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        <i className="fas fa-bullseye text-blue-400 mr-2"></i>
                        역량 분석
                    </h3>
                    <div className="h-64">
                        {chartsAvailable && RadarChart ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart data={analytics.competencies}>
                                    <PolarGrid stroke="#374151" />
                                    <PolarAngleAxis dataKey="subject" stroke="#9CA3AF" />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#374151" />
                                    <Radar dataKey="score" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                                </RadarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                {analytics.competencies.map((item, i) => (
                                    <div key={i} className="bg-gray-700 p-2 rounded">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>{item.subject}</span>
                                            <span className="text-blue-400">{item.score}</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="progress-fill bg-blue-500" style={{ width: `${item.score}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* 성적 분포 */}
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        <i className="fas fa-chart-bar text-green-400 mr-2"></i>
                        전국 성적 분포 (내 위치)
                    </h3>
                    <div className="h-64">
                        {chartsAvailable && BarChart ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={analytics.distribution}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="range" stroke="#9CA3AF" />
                                    <YAxis stroke="#9CA3AF" />
                                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                                    <Bar dataKey="percent" fill="#10B981" />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="space-y-2">
                                {analytics.distribution.map((item, i) => (
                                    <div key={i} className="flex items-center">
                                        <span className="w-16 text-sm">{item.range}</span>
                                        <div className="flex-1 progress-bar mx-2">
                                            <div className="progress-fill bg-green-500" style={{ width: `${item.percent}%` }}></div>
                                        </div>
                                        <span className="text-sm text-gray-400">{item.percent}%</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="mt-4 text-center">
                        <span className="badge bg-yellow-500 bg-opacity-20 text-yellow-400 px-4 py-2">
                            내 위치: 80-89점 구간 ({analytics.overall_rank})
                        </span>
                    </div>
                </div>

                {/* 과목별 상세 */}
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        <i className="fas fa-list text-purple-400 mr-2"></i>
                        과목별 성적
                    </h3>
                    <div className="space-y-4">
                        {grades.map((grade, index) => (
                            <div key={index} className="bg-gray-700 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium">{grade.course_name}</span>
                                    <span className="text-yellow-400 font-bold">{grade.avg.toFixed(1)}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex space-x-2">
                                        {grade.scores.map((score, i) => (
                                            <span key={i} className="bg-gray-600 px-2 py-0.5 rounded">
                                                {i === 0 ? '퀴즈' : i === 1 ? '중간' : '기말'}: {score}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-green-400">{grade.rank}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* PDV 저장 안내 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-yellow-500 border-opacity-30">
                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500 bg-opacity-20 flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-shield-alt text-yellow-400 text-xl"></i>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">개인정보 금고(PDV)에 안전하게 저장됨</h3>
                        <p className="text-gray-400 text-sm">
                            모든 성적 기록은 OpenHash 체인에 기록되어 위변조가 불가능하며, 
                            개인정보 금고에 안전하게 보관됩니다.
                        </p>
                        <button 
                            onClick={() => onNavigate('vault')}
                            className="mt-3 text-yellow-400 hover:text-yellow-300 text-sm"
                        >
                            내 정보 금고 확인 <i className="fas fa-arrow-right ml-1"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
