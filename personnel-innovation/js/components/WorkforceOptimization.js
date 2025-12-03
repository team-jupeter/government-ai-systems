const WorkforceOptimization = () => {
    const [optimizationData, setOptimizationData] = React.useState(null);
    const [isOptimizing, setIsOptimizing] = React.useState(false);
    const [selectedScenario, setSelectedScenario] = React.useState('balanced');

    const RechartsLib = window.Recharts || {};
    const { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
            ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } = RechartsLib;

    const scenarios = [
        { id: 'balanced', name: '균형 최적화', icon: 'fa-balance-scale', desc: '복지와 성장의 균형' },
        { id: 'growth', name: '성장 우선', icon: 'fa-chart-line', desc: 'GDP 최대화 중점' },
        { id: 'welfare', name: '복지 우선', icon: 'fa-heart', desc: '근로자 만족도 중점' },
        { id: 'innovation', name: '혁신 중심', icon: 'fa-lightbulb', desc: 'AI/기술 전환 가속' }
    ];

    const capabilityData = [
        { subject: '창의성', A: 85, B: 70, fullMark: 100 },
        { subject: '논리력', A: 90, B: 85, fullMark: 100 },
        { subject: '대인관계', A: 75, B: 80, fullMark: 100 },
        { subject: '기술적성', A: 88, B: 65, fullMark: 100 },
        { subject: '언어능력', A: 82, B: 90, fullMark: 100 },
        { subject: '리더십', A: 70, B: 75, fullMark: 100 }
    ];

    const optimizationHistory = [
        { month: '7월', efficiency: 85.2, satisfaction: 72.5, matching: 88.1 },
        { month: '8월', efficiency: 86.8, satisfaction: 74.2, matching: 89.3 },
        { month: '9월', efficiency: 88.1, satisfaction: 76.8, matching: 90.5 },
        { month: '10월', efficiency: 89.5, satisfaction: 78.5, matching: 91.2 },
        { month: '11월', efficiency: 91.2, satisfaction: 80.1, matching: 92.4 },
        { month: '12월', efficiency: 92.4, satisfaction: 82.3, matching: 93.8 }
    ];

    const agentResults = [
        { agent: '능력-적성 분석 Agent', status: 'active', accuracy: 94.2, processed: '2.8M' },
        { agent: '국가 총생산 최적화 Agent', status: 'active', accuracy: 91.8, processed: '1.5M' },
        { agent: '복지 우선 Agent', status: 'active', accuracy: 89.5, processed: '1.2M' },
        { agent: '정책 중재 Agent', status: 'active', accuracy: 96.1, processed: '850K' }
    ];

    const runOptimization = () => {
        setIsOptimizing(true);
        setTimeout(() => {
            setOptimizationData({
                totalOptimized: 2850000,
                efficiencyGain: 8.5,
                satisfactionGain: 12.3,
                costSaving: 4200,
                timestamp: new Date().toISOString()
            });
            setIsOptimizing(false);
        }, 3000);
    };

    return (
        <div className="space-y-6">
            {/* 상단 시나리오 선택 */}
            <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">🎯 최적화 시나리오 선택</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {scenarios.map((scenario) => (
                        <button
                            key={scenario.id}
                            onClick={() => setSelectedScenario(scenario.id)}
                            className={`p-4 rounded-xl border-2 transition-all ${
                                selectedScenario === scenario.id
                                    ? 'border-blue-500 bg-blue-500/20'
                                    : 'border-slate-600 hover:border-slate-500'
                            }`}
                        >
                            <i className={`fas ${scenario.icon} text-2xl mb-2 ${
                                selectedScenario === scenario.id ? 'text-blue-400' : 'text-slate-400'
                            }`}></i>
                            <p className="font-medium text-white">{scenario.name}</p>
                            <p className="text-xs text-slate-400 mt-1">{scenario.desc}</p>
                        </button>
                    ))}
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={runOptimization}
                        disabled={isOptimizing}
                        className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                            isOptimizing
                                ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                    >
                        {isOptimizing ? (
                            <React.Fragment>
                                <i className="fas fa-spinner fa-spin"></i>
                                <span>최적화 진행 중...</span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <i className="fas fa-play"></i>
                                <span>Nash 균형 최적화 실행</span>
                            </React.Fragment>
                        )}
                    </button>
                </div>
            </div>

            {/* 최적화 결과 (실행 후) */}
            {optimizationData && (
                <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded-xl p-6 border border-green-500/30">
                    <div className="flex items-center gap-2 mb-4">
                        <i className="fas fa-check-circle text-green-400 text-xl"></i>
                        <h3 className="text-lg font-bold text-white">최적화 완료</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                            <p className="text-2xl font-bold text-blue-400">{(optimizationData.totalOptimized / 1000000).toFixed(1)}M</p>
                            <p className="text-xs text-slate-400">최적화된 인력</p>
                        </div>
                        <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                            <p className="text-2xl font-bold text-green-400">+{optimizationData.efficiencyGain}%</p>
                            <p className="text-xs text-slate-400">효율성 향상</p>
                        </div>
                        <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                            <p className="text-2xl font-bold text-purple-400">+{optimizationData.satisfactionGain}%</p>
                            <p className="text-xs text-slate-400">만족도 향상</p>
                        </div>
                        <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                            <p className="text-2xl font-bold text-yellow-400">{optimizationData.costSaving}억</p>
                            <p className="text-xs text-slate-400">연간 절감액</p>
                        </div>
                    </div>
                </div>
            )}

            {/* AI Agent 상태 */}
            <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">🤖 Multi-Agent 시스템 상태</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {agentResults.map((agent, index) => (
                        <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-white">{agent.agent}</span>
                                <span className="flex items-center gap-1 text-xs">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    <span className="text-green-400">Active</span>
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-400">정확도: <span className="text-white">{agent.accuracy}%</span></span>
                                <span className="text-slate-400">처리: <span className="text-white">{agent.processed}</span></span>
                            </div>
                            <div className="mt-2 w-full bg-slate-600 rounded-full h-2">
                                <div 
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                                    style={{ width: agent.accuracy + '%' }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 차트 영역 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 능력-적성 레이더 차트 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">능력-적성 분석 (샘플)</h3>
                    {RadarChart ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <RadarChart data={capabilityData}>
                                <PolarGrid stroke="#334155" />
                                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={12} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" />
                                <Radar name="현재 역할" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                                <Radar name="최적 역할" dataKey="B" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-slate-400">차트 로딩 중...</div>
                    )}
                    <div className="flex justify-center gap-6 mt-2">
                        <span className="flex items-center gap-2 text-sm">
                            <span className="w-3 h-3 bg-blue-500 rounded"></span>
                            <span className="text-slate-400">현재 역할</span>
                        </span>
                        <span className="flex items-center gap-2 text-sm">
                            <span className="w-3 h-3 bg-green-500 rounded"></span>
                            <span className="text-slate-400">최적 역할</span>
                        </span>
                    </div>
                </div>

                {/* 최적화 추이 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">최적화 성과 추이</h3>
                    {LineChart ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={optimizationHistory}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                                <YAxis stroke="#94a3b8" fontSize={12} domain={[70, 100]} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                                <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeWidth={2} name="효율성" />
                                <Line type="monotone" dataKey="satisfaction" stroke="#22c55e" strokeWidth={2} name="만족도" />
                                <Line type="monotone" dataKey="matching" stroke="#f59e0b" strokeWidth={2} name="매칭률" />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-slate-400">차트 로딩 중...</div>
                    )}
                </div>
            </div>

            {/* Nash 균형 설명 */}
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-brain text-2xl text-purple-400"></i>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Nash 균형 기반 최적화</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            본 시스템은 <span className="text-purple-400 font-medium">개인별 능력-적성 분석 Agent</span>, 
                            <span className="text-blue-400 font-medium"> 국가 총생산 최적화 Agent</span>, 
                            <span className="text-green-400 font-medium"> 복지 우선 Agent</span>가 상호 경쟁하며, 
                            <span className="text-yellow-400 font-medium"> 정책 중재 Agent</span>가 Nash 균형점에서 
                            최적의 타협안을 도출합니다. 이를 통해 개인 만족도와 국가 경제성장을 동시에 달성합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
