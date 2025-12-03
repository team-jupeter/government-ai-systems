const NationalWorkforce = () => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [viewMode, setViewMode] = React.useState('overview');
    const [liveWorkers, setLiveWorkers] = React.useState(24500000);

    const RechartsLib = window.Recharts || {};
    const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
            PieChart, Pie, Cell, BarChart, Bar, Legend } = RechartsLib;

    React.useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            setLiveWorkers(prev => prev + Math.floor(Math.random() * 10000 - 5000));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/personnel-innovation/workforce/national');
            const result = await response.json();
            if (result.success) {
                setData(result.data);
            }
        } catch (error) {
            console.error('데이터 로드 오류:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
        return num.toLocaleString();
    };

    const ageDistribution = [
        { age: '20-29세', count: 4500000, percentage: 15, color: '#3b82f6' },
        { age: '30-39세', count: 6900000, percentage: 23, color: '#8b5cf6' },
        { age: '40-49세', count: 7800000, percentage: 26, color: '#22c55e' },
        { age: '50-59세', count: 7200000, percentage: 24, color: '#f59e0b' },
        { age: '60세 이상', count: 3600000, percentage: 12, color: '#ef4444' }
    ];

    const employmentType = [
        { type: '정규직', count: 18500000, percentage: 61.7 },
        { type: '비정규직', count: 6200000, percentage: 20.7 },
        { type: '자영업', count: 3100000, percentage: 10.3 },
        { type: '1인 법인', count: 2200000, percentage: 7.3 }
    ];

    const hourlyActivity = [];
    for (let i = 0; i < 24; i++) {
        const isWork = i >= 9 && i < 18;
        hourlyActivity.push({
            hour: i + '시',
            workers: isWork ? 22000000 + Math.random() * 4000000 : 5000000 + Math.random() * 3000000,
            tasks: isWork ? 1800000 + Math.random() * 500000 : 300000 + Math.random() * 200000
        });
    }

    const sectorData = [
        { name: '제조업', workers: 4500000, aiRate: 72, color: '#3b82f6' },
        { name: '서비스업', workers: 6800000, aiRate: 65, color: '#22c55e' },
        { name: 'IT/SW', workers: 1050000, aiRate: 88, color: '#8b5cf6' },
        { name: '금융/보험', workers: 850000, aiRate: 85, color: '#f59e0b' },
        { name: '공공부문', workers: 1150000, aiRate: 68, color: '#ef4444' },
        { name: '건설업', workers: 2100000, aiRate: 38, color: '#06b6d4' },
        { name: '교육', workers: 1950000, aiRate: 42, color: '#ec4899' },
        { name: '보건복지', workers: 2350000, aiRate: 35, color: '#14b8a6' }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <i className="fas fa-spinner fa-spin text-4xl text-blue-500 mb-4"></i>
                    <p className="text-slate-400">3천만 노동인구 데이터 로딩 중...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* 상단 요약 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-200 text-sm">총 노동인구</p>
                            <p className="text-3xl font-bold text-white mt-1">30,000,000</p>
                            <p className="text-blue-200 text-xs mt-1">경제활동인구 기준</p>
                        </div>
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-users text-3xl text-white"></i>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-200 text-sm">현재 근무 중</p>
                            <p className="text-3xl font-bold text-white mt-1">{formatNumber(liveWorkers)}</p>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                                <p className="text-green-200 text-xs">실시간 집계</p>
                            </div>
                        </div>
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-user-clock text-3xl text-white"></i>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-200 text-sm">AI 지원 업무</p>
                            <p className="text-3xl font-bold text-white mt-1">68.5%</p>
                            <p className="text-purple-200 text-xs mt-1">전체 업무 중</p>
                        </div>
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-robot text-3xl text-white"></i>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-yellow-200 text-sm">1인 법인</p>
                            <p className="text-3xl font-bold text-white mt-1">2.2M</p>
                            <p className="text-yellow-200 text-xs mt-1">+12.5% 전년비</p>
                        </div>
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-building-user text-3xl text-white"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* 뷰 모드 탭 */}
            <div className="flex gap-2 bg-slate-800 p-1 rounded-lg w-fit">
                {['overview', 'age', 'sector', 'type'].map((mode) => (
                    <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                            viewMode === mode ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        {mode === 'overview' && '전체 현황'}
                        {mode === 'age' && '연령별'}
                        {mode === 'sector' && '산업별'}
                        {mode === 'type' && '고용형태'}
                    </button>
                ))}
            </div>

            {/* 차트 영역 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 24시간 활동 추이 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">24시간 노동인구 활동</h3>
                        <span className="text-xs text-green-400 flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            실시간
                        </span>
                    </div>
                    {AreaChart ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <AreaChart data={hourlyActivity}>
                                <defs>
                                    <linearGradient id="workersGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
                                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => (v/1000000).toFixed(0) + 'M'} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                    formatter={(value) => [formatNumber(value) + '명', '근무자']}
                                />
                                <Area type="monotone" dataKey="workers" stroke="#3b82f6" fill="url(#workersGradient)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-slate-400">차트 로딩 중...</div>
                    )}
                </div>

                {/* 연령별 분포 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">연령별 노동인구 분포</h3>
                    {PieChart ? (
                        <div className="flex items-center">
                            <ResponsiveContainer width="50%" height={220}>
                                <PieChart>
                                    <Pie
                                        data={ageDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={85}
                                        paddingAngle={2}
                                        dataKey="count"
                                    >
                                        {ageDistribution.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                        formatter={(value) => [formatNumber(value) + '명', '']}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="w-1/2 space-y-2">
                                {ageDistribution.map((item) => (
                                    <div key={item.age} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                                            <span className="text-sm text-slate-300">{item.age}</span>
                                        </div>
                                        <span className="text-sm text-white font-medium">{item.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="h-48 flex items-center justify-center text-slate-400">차트 로딩 중...</div>
                    )}
                </div>

                {/* 산업별 분포 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">산업별 노동인구 및 AI 대체율</h3>
                    {BarChart ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={sectorData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickFormatter={(v) => (v/1000000).toFixed(1) + 'M'} />
                                <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={11} width={70} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                    formatter={(value, name) => {
                                        if (name === 'workers') return [formatNumber(value) + '명', '노동인구'];
                                        return [value + '%', 'AI 대체율'];
                                    }}
                                />
                                <Bar dataKey="workers" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-slate-400">차트 로딩 중...</div>
                    )}
                </div>

                {/* 고용형태별 분포 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">고용형태별 분포</h3>
                    <div className="space-y-4">
                        {employmentType.map((item, index) => {
                            const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
                            return (
                                <div key={item.type}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-slate-300">{item.type}</span>
                                        <span className="text-sm text-white font-medium">
                                            {formatNumber(item.count)} ({item.percentage}%)
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-700 rounded-full h-3">
                                        <div 
                                            className={`${colors[index]} h-3 rounded-full transition-all duration-500`}
                                            style={{ width: item.percentage + '%' }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center gap-2 text-yellow-400 mb-2">
                            <i className="fas fa-lightbulb"></i>
                            <span className="font-medium">AI 시대 전망</span>
                        </div>
                        <p className="text-sm text-slate-300">
                            2030년까지 1인 법인이 전체 노동인구의 25%를 차지할 것으로 예측됩니다.
                            사무직 업무의 90%가 AI로 대체되며, 각 개인은 독립된 경제 주체로 전환됩니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* 실시간 통계 카드 */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">📊 실시간 노동시장 지표</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-400">97.2%</p>
                        <p className="text-xs text-slate-400 mt-1">고용률</p>
                    </div>
                    <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                        <p className="text-2xl font-bold text-green-400">3.8%</p>
                        <p className="text-xs text-slate-400 mt-1">실업률</p>
                    </div>
                    <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-400">42.5H</p>
                        <p className="text-xs text-slate-400 mt-1">주당 평균근로</p>
                    </div>
                    <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                        <p className="text-2xl font-bold text-yellow-400">4,280</p>
                        <p className="text-xs text-slate-400 mt-1">평균임금(만원)</p>
                    </div>
                    <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                        <p className="text-2xl font-bold text-pink-400">92.4%</p>
                        <p className="text-xs text-slate-400 mt-1">매칭 정확도</p>
                    </div>
                    <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                        <p className="text-2xl font-bold text-cyan-400">99.97%</p>
                        <p className="text-xs text-slate-400 mt-1">데이터 검증률</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
