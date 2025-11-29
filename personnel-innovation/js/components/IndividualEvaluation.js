const IndividualEvaluation = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [evaluationData, setEvaluationData] = React.useState(null);

    const RechartsLib = window.Recharts || {};
    const { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } = RechartsLib;

    const sampleEvaluation = {
        worker_hash: 'WKR-a8f3...2d1e',
        overall_score: 87.5,
        rank_percentile: 15,
        attendance_score: 95.2,
        task_completion: 89.8,
        quality_score: 85.3,
        collaboration: 82.1,
        innovation: 78.5,
        org_contribution: 12.3,
        monthly_trend: [
            { month: '7월', score: 82.1 },
            { month: '8월', score: 84.5 },
            { month: '9월', score: 85.8 },
            { month: '10월', score: 86.2 },
            { month: '11월', score: 87.5 },
            { month: '12월', score: 88.9 }
        ]
    };

    const radarData = [
        { subject: '출근율', score: 95 },
        { subject: '업무완수', score: 90 },
        { subject: '품질', score: 85 },
        { subject: '협업', score: 82 },
        { subject: '혁신', score: 78 },
        { subject: '기여도', score: 88 }
    ];

    const handleAuthenticate = () => {
        setIsAuthenticated(true);
        setEvaluationData(sampleEvaluation);
    };

    if (!isAuthenticated) {
        return (
            <div className="max-w-md mx-auto mt-12">
                <div className="bg-slate-800 rounded-xl p-8 text-center">
                    <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="fas fa-lock text-4xl text-yellow-400"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">개인 성과 평가</h2>
                    <p className="text-slate-400 mb-6">
                        본인 인증 후 개인 성과 평가 결과를 확인할 수 있습니다.
                        모든 데이터는 개인 정보 금고(PDV)에서 안전하게 보호됩니다.
                    </p>
                    <div className="space-y-3">
                        <button
                            onClick={handleAuthenticate}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2"
                        >
                            <i className="fas fa-fingerprint"></i>
                            생체 인증으로 확인
                        </button>
                        <button className="w-full py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2">
                            <i className="fas fa-mobile-alt"></i>
                            모바일 인증
                        </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-4">
                        <i className="fas fa-shield-halved mr-1"></i>
                        OpenHash 기반 3단계 본인 확인
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* 인증 상태 표시 */}
            <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-green-400 text-xl"></i>
                    <div>
                        <p className="text-green-400 font-medium">본인 인증 완료</p>
                        <p className="text-slate-400 text-sm">Worker ID: {evaluationData.worker_hash}</p>
                    </div>
                </div>
            </div>

            {/* 종합 점수 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl p-6 md:col-span-1">
                    <p className="text-blue-200 text-sm">종합 성과 점수</p>
                    <p className="text-5xl font-bold text-white mt-2">{evaluationData.overall_score}</p>
                    <p className="text-blue-200 text-sm mt-2">100점 만점</p>
                    <div className="mt-4 p-3 bg-white/10 rounded-lg">
                        <p className="text-white text-sm">
                            <i className="fas fa-trophy text-yellow-400 mr-2"></i>
                            상위 {evaluationData.rank_percentile}% 성과
                        </p>
                    </div>
                </div>

                <div className="md:col-span-2 bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">월별 성과 추이</h3>
                    {LineChart ? (
                        <ResponsiveContainer width="100%" height={180}>
                            <LineChart data={evaluationData.monthly_trend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                                <YAxis stroke="#94a3b8" fontSize={12} domain={[70, 100]} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-44 flex items-center justify-center text-slate-400">차트 로딩 중...</div>
                    )}
                </div>
            </div>

            {/* 세부 평가 항목 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 레이더 차트 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">역량별 평가</h3>
                    {RadarChart ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <RadarChart data={radarData}>
                                <PolarGrid stroke="#334155" />
                                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={12} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" />
                                <Radar name="점수" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-slate-400">차트 로딩 중...</div>
                    )}
                </div>

                {/* 세부 점수 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">세부 평가 항목</h3>
                    <div className="space-y-4">
                        {[
                            { label: '출근율', score: evaluationData.attendance_score, color: 'bg-green-500' },
                            { label: '업무 완수율', score: evaluationData.task_completion, color: 'bg-blue-500' },
                            { label: '품질 점수', score: evaluationData.quality_score, color: 'bg-purple-500' },
                            { label: '협업 점수', score: evaluationData.collaboration, color: 'bg-yellow-500' },
                            { label: '혁신 기여', score: evaluationData.innovation, color: 'bg-pink-500' }
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-slate-300">{item.label}</span>
                                    <span className="text-sm font-bold text-white">{item.score}점</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2">
                                    <div className={`${item.color} h-2 rounded-full transition-all`} style={{ width: item.score + '%' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 기관 기여도 */}
            <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">소속 기관 경영성과 기여도</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-700/50 rounded-lg text-center">
                        <p className="text-3xl font-bold text-blue-400">{evaluationData.org_contribution}%</p>
                        <p className="text-sm text-slate-400 mt-1">매출 기여도</p>
                    </div>
                    <div className="p-4 bg-slate-700/50 rounded-lg text-center">
                        <p className="text-3xl font-bold text-green-400">A등급</p>
                        <p className="text-sm text-slate-400 mt-1">팀 내 순위</p>
                    </div>
                    <div className="p-4 bg-slate-700/50 rounded-lg text-center">
                        <p className="text-3xl font-bold text-purple-400">+8.5%</p>
                        <p className="text-sm text-slate-400 mt-1">성과급 반영률</p>
                    </div>
                </div>
            </div>

            {/* 보안 안내 */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <i className="fas fa-shield-halved text-green-400"></i>
                    <span>이 데이터는 귀하의 개인 정보 금고(PDV)에서 조회되었으며, OpenHash로 무결성이 검증되었습니다.</span>
                </div>
            </div>
        </div>
    );
};
