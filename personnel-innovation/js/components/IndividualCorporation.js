const IndividualCorporation = () => {
    const [stats, setStats] = React.useState({
        totalCorps: 2850000,
        newToday: 1823,
        activeContracts: 8750000,
        avgRevenue: 58000000
    });
    const [selectedSector, setSelectedSector] = React.useState('all');

    const RechartsLib = window.Recharts || {};
    const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
            PieChart, Pie, Cell, BarChart, Bar } = RechartsLib;

    React.useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                totalCorps: prev.totalCorps + Math.floor(Math.random() * 10),
                newToday: prev.newToday + Math.floor(Math.random() * 3),
                activeContracts: prev.activeContracts + Math.floor(Math.random() * 100)
            }));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const sectorDistribution = [
        { name: 'IT/개발', count: 850000, percentage: 29.8, color: '#3b82f6', growth: 25.3 },
        { name: '컨설팅', count: 420000, percentage: 14.7, color: '#8b5cf6', growth: 18.2 },
        { name: '디자인', count: 380000, percentage: 13.3, color: '#22c55e', growth: 22.1 },
        { name: '마케팅', count: 320000, percentage: 11.2, color: '#f59e0b', growth: 15.8 },
        { name: '교육', count: 280000, percentage: 9.8, color: '#ef4444', growth: 12.5 },
        { name: '콘텐츠', count: 250000, percentage: 8.8, color: '#06b6d4', growth: 28.7 },
        { name: '기타', count: 350000, percentage: 12.4, color: '#64748b', growth: 8.5 }
    ];

    const growthTrend = [
        { year: '2020', corps: 1200000, revenue: 42 },
        { year: '2021', corps: 1650000, revenue: 48 },
        { year: '2022', corps: 2100000, revenue: 52 },
        { year: '2023', corps: 2450000, revenue: 55 },
        { year: '2024', corps: 2850000, revenue: 58 },
        { year: '2025(E)', corps: 3500000, revenue: 65 }
    ];

    const benefits = [
        { icon: 'fa-shield-halved', title: '법적 보호', desc: '개인 자산과 사업 자산 분리로 리스크 최소화' },
        { icon: 'fa-percent', title: '세제 혜택', desc: '법인세율 적용으로 소득세 대비 절세 효과' },
        { icon: 'fa-handshake', title: '계약 신뢰도', desc: '법인 간 계약으로 거래 안정성 확보' },
        { icon: 'fa-robot', title: 'AI 지원', desc: '회계, 세무, 법률 AI 자동화 서비스' },
        { icon: 'fa-chart-line', title: '성장 기회', desc: '투자 유치 및 사업 확장 용이' },
        { icon: 'fa-users', title: '네트워크', desc: '1인 법인 간 협업 플랫폼 제공' }
    ];

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
        return num.toLocaleString();
    };

    return (
        <div className="space-y-6">
            {/* 상단 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-200 text-sm">총 1인 법인 수</p>
                            <p className="text-3xl font-bold text-white mt-1">{formatNumber(stats.totalCorps)}</p>
                            <p className="text-blue-200 text-xs mt-1">+12.5% 전년비</p>
                        </div>
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-building-user text-3xl text-white"></i>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-200 text-sm">오늘 신규 등록</p>
                            <p className="text-3xl font-bold text-white mt-1">{stats.newToday.toLocaleString()}</p>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                                <p className="text-green-200 text-xs">실시간</p>
                            </div>
                        </div>
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-user-plus text-3xl text-white"></i>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-200 text-sm">활성 계약 건수</p>
                            <p className="text-3xl font-bold text-white mt-1">{formatNumber(stats.activeContracts)}</p>
                            <p className="text-purple-200 text-xs mt-1">법인 간 계약</p>
                        </div>
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-file-contract text-3xl text-white"></i>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-yellow-200 text-sm">평균 연매출</p>
                            <p className="text-3xl font-bold text-white mt-1">5,800만</p>
                            <p className="text-yellow-200 text-xs mt-1">+8.2% 전년비</p>
                        </div>
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-won-sign text-3xl text-white"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI 시대 안내 배너 */}
            <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl p-6 border border-indigo-500/30">
                <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-indigo-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-rocket text-3xl text-indigo-400"></i>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">AI 시대, 모든 개인은 독립된 경제 주체입니다</h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4">
                            사무직 업무의 90%가 AI로 대체되는 시대, 기존의 고용 관계는 <span className="text-indigo-400 font-medium">법인 간 계약 관계</span>로 전환됩니다.
                            각 개인은 자신만의 1인 법인을 설립하여 독립적인 경제 주체로 활동하며, AI의 지원을 받아 전문 서비스를 제공합니다.
                        </p>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm text-white transition-all">
                                <i className="fas fa-plus mr-2"></i>1인 법인 설립하기
                            </button>
                            <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white transition-all">
                                <i className="fas fa-info-circle mr-2"></i>자세히 알아보기
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 차트 영역 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 업종별 분포 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">업종별 1인 법인 분포</h3>
                    {PieChart ? (
                        <div className="flex items-center">
                            <ResponsiveContainer width="50%" height={220}>
                                <PieChart>
                                    <Pie
                                        data={sectorDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={85}
                                        paddingAngle={2}
                                        dataKey="count"
                                    >
                                        {sectorDistribution.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                        formatter={(value) => [formatNumber(value) + '개', '']}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="w-1/2 space-y-2">
                                {sectorDistribution.map((item) => (
                                    <div key={item.name} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                                            <span className="text-xs text-slate-300">{item.name}</span>
                                        </div>
                                        <span className="text-xs text-green-400">+{item.growth}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="h-48 flex items-center justify-center text-slate-400">차트 로딩 중...</div>
                    )}
                </div>

                {/* 성장 추이 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">1인 법인 성장 추이</h3>
                    {AreaChart ? (
                        <ResponsiveContainer width="100%" height={220}>
                            <AreaChart data={growthTrend}>
                                <defs>
                                    <linearGradient id="corpGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} />
                                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => (v/1000000).toFixed(1) + 'M'} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                    formatter={(value, name) => {
                                        if (name === 'corps') return [formatNumber(value) + '개', '1인 법인'];
                                        return [value + '백만원', '평균 매출'];
                                    }}
                                />
                                <Area type="monotone" dataKey="corps" stroke="#8b5cf6" fill="url(#corpGradient)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-48 flex items-center justify-center text-slate-400">차트 로딩 중...</div>
                    )}
                </div>
            </div>

            {/* 1인 법인 혜택 */}
            <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">🎁 1인 법인 혜택</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i className={`fas ${benefit.icon} text-blue-400`}></i>
                                </div>
                                <div>
                                    <p className="font-medium text-white">{benefit.title}</p>
                                    <p className="text-xs text-slate-400 mt-1">{benefit.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 전환 프로세스 */}
            <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">📋 직장인 → 1인 법인 전환 프로세스</h3>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    {[
                        { step: 1, title: 'AI 적성 분석', desc: '능력-적성 매칭', icon: 'fa-brain' },
                        { step: 2, title: '사업 영역 선정', desc: 'AI 추천 기반', icon: 'fa-lightbulb' },
                        { step: 3, title: '법인 설립', desc: '자동화 서류 처리', icon: 'fa-file-signature' },
                        { step: 4, title: '계약 매칭', desc: '첫 고객 연결', icon: 'fa-handshake' },
                        { step: 5, title: '독립 운영', desc: 'AI 지원 경영', icon: 'fa-rocket' }
                    ].map((item, index) => (
                        <React.Fragment key={item.step}>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-2">
                                    <i className={`fas ${item.icon} text-xl text-white`}></i>
                                </div>
                                <p className="text-xs text-blue-400 font-medium">STEP {item.step}</p>
                                <p className="text-sm font-medium text-white">{item.title}</p>
                                <p className="text-xs text-slate-400">{item.desc}</p>
                            </div>
                            {index < 4 && (
                                <i className="fas fa-chevron-right text-slate-600 hidden md:block"></i>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};
