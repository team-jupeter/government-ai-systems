// ============================================
// 대시보드 - 핵심 KPI 및 시스템 현황
// ============================================

const Dashboard = ({ systemStatus, setCurrentPage }) => {
    const [realTimeData, setRealTimeData] = React.useState({
        workersOnline: 24500000,
        tasksCompleted: 47823456,
        aiMatchSuccess: 92.4,
        dataVerified: 99.97
    });
    
    const [trendData, setTrendData] = React.useState([]);
    const [recentActivities, setRecentActivities] = React.useState([]);

    // Recharts 가져오기
    const RechartsLib = window.Recharts || {};
    const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
            PieChart, Pie, Cell, BarChart, Bar, LineChart, Line } = RechartsLib;

    // 실시간 데이터 업데이트
    React.useEffect(() => {
        const generateTrendData = () => {
            const hours = [];
            for (let i = 23; i >= 0; i--) {
                const hour = new Date();
                hour.setHours(hour.getHours() - i);
                const isWorkHour = hour.getHours() >= 9 && hour.getHours() < 18;
                hours.push({
                    time: `${hour.getHours()}시`,
                    workers: isWorkHour ? 24000000 + Math.random() * 2000000 : 8000000 + Math.random() * 2000000,
                    tasks: isWorkHour ? 2000000 + Math.random() * 500000 : 500000 + Math.random() * 200000,
                    efficiency: 85 + Math.random() * 10
                });
            }
            return hours;
        };

        setTrendData(generateTrendData());

        const activities = [
            { id: 1, type: 'match', message: '서울시 IT기업 → 개발자 A 매칭 완료', time: '방금 전', icon: 'fa-handshake', color: 'text-green-400' },
            { id: 2, type: 'task', message: '경기도 제조업 업무 1,234건 할당', time: '2분 전', icon: 'fa-tasks', color: 'text-blue-400' },
            { id: 3, type: 'verify', message: 'OpenHash 블록 #4,521,893 검증', time: '5분 전', icon: 'fa-shield-halved', color: 'text-purple-400' },
            { id: 4, type: 'eval', message: '삼성전자 Q4 성과평가 데이터 동기화', time: '8분 전', icon: 'fa-chart-line', color: 'text-yellow-400' },
            { id: 5, type: 'ai', message: 'AI 경력추천: 5,892명 새 경로 제안', time: '12분 전', icon: 'fa-robot', color: 'text-pink-400' }
        ];
        setRecentActivities(activities);

        const interval = setInterval(() => {
            setRealTimeData(prev => ({
                workersOnline: prev.workersOnline + Math.floor(Math.random() * 10000 - 5000),
                tasksCompleted: prev.tasksCompleted + Math.floor(Math.random() * 1000),
                aiMatchSuccess: 92 + Math.random() * 2,
                dataVerified: 99.9 + Math.random() * 0.09
            }));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // 섹터별 인력 분포
    const sectorData = [
        { name: '제조업', value: 4500000, color: '#3b82f6' },
        { name: 'IT/SW', value: 3200000, color: '#8b5cf6' },
        { name: '서비스업', value: 6800000, color: '#22c55e' },
        { name: '금융/보험', value: 1800000, color: '#f59e0b' },
        { name: '공공부문', value: 1150000, color: '#ef4444' },
        { name: '건설/부동산', value: 2100000, color: '#06b6d4' },
        { name: '기타', value: 10450000, color: '#64748b' }
    ];

    // 지역별 인력 현황
    const regionalData = [
        { region: '서울', workers: 5200000, efficiency: 94.2 },
        { region: '경기', workers: 6800000, efficiency: 92.8 },
        { region: '부산', workers: 1650000, efficiency: 91.5 },
        { region: '인천', workers: 1520000, efficiency: 90.8 },
        { region: '대구', workers: 1180000, efficiency: 89.7 },
        { region: '대전', workers: 780000, efficiency: 93.1 },
        { region: '광주', workers: 720000, efficiency: 88.9 }
    ];

    // 숫자 포맷팅
    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
        return num.toString();
    };

    // 퀵 액세스 카드
    const quickAccessCards = [
        { id: 'national-workforce', title: '국가 노동인구', value: '30M', sub: '경제활동인구', icon: 'fa-users', color: 'from-blue-600 to-blue-800' },
        { id: 'performance-tracking', title: '오늘 업무 기록', value: formatNumber(realTimeData.tasksCompleted), sub: '5W1H 추적', icon: 'fa-clipboard-list', color: 'from-green-600 to-green-800' },
        { id: 'job-matching', title: 'AI 매칭률', value: realTimeData.aiMatchSuccess.toFixed(1) + '%', sub: '능력-적성 기반', icon: 'fa-handshake', color: 'from-purple-600 to-purple-800' },
        { id: 'openhash-verification', title: '데이터 검증률', value: realTimeData.dataVerified.toFixed(2) + '%', sub: 'OpenHash 무결성', icon: 'fa-shield-halved', color: 'from-yellow-600 to-yellow-800' }
    ];

    return (
        <div className="space-y-6">
            {/* 핵심 KPI 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickAccessCards.map((card) => (
                    <div
                        key={card.id}
                        onClick={() => setCurrentPage(card.id)}
                        className={`bg-gradient-to-br ${card.color} rounded-xl p-5 cursor-pointer card-hover`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-white/70 text-sm">{card.title}</p>
                                <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
                                <p className="text-white/60 text-xs mt-1">{card.sub}</p>
                            </div>
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                <i className={`fas ${card.icon} text-2xl text-white`}></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 메인 차트 영역 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 24시간 활동 추이 */}
                <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">24시간 노동인구 활동 추이</h3>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-green-400 text-sm">실시간</span>
                        </div>
                    </div>
                    {AreaChart ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="colorWorkers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => (v/1000000).toFixed(0) + 'M'} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                    formatter={(value) => [formatNumber(value), '근무자']}
                                />
                                <Area type="monotone" dataKey="workers" stroke="#3b82f6" fillOpacity={1} fill="url(#colorWorkers)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-slate-400">
                            차트 로딩 중...
                        </div>
                    )}
                </div>

                {/* 섹터별 인력 분포 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">섹터별 인력 분포</h3>
                    {PieChart ? (
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={sectorData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {sectorData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                    formatter={(value) => [formatNumber(value) + '명', '']}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-48 flex items-center justify-center text-slate-400">
                            차트 로딩 중...
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        {sectorData.slice(0, 6).map((sector) => (
                            <div key={sector.name} className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: sector.color }}></span>
                                <span className="text-xs text-slate-400">{sector.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 하단 정보 영역 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 지역별 현황 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">주요 지역별 인력 현황</h3>
                    {BarChart ? (
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={regionalData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis type="number" stroke="#94a3b8" fontSize={12} tickFormatter={(v) => (v/1000000).toFixed(1) + 'M'} />
                                <YAxis type="category" dataKey="region" stroke="#94a3b8" fontSize={12} width={40} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                    formatter={(value, name) => [formatNumber(value) + '명', name === 'workers' ? '노동인구' : '효율성']}
                                />
                                <Bar dataKey="workers" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-slate-400">
                            차트 로딩 중...
                        </div>
                    )}
                </div>

                {/* 실시간 활동 피드 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">실시간 활동</h3>
                        <span className="text-xs text-slate-400">자동 업데이트</span>
                    </div>
                    <div className="space-y-3">
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg">
                                <div className={`w-8 h-8 rounded-lg bg-slate-600 flex items-center justify-center ${activity.color}`}>
                                    <i className={`fas ${activity.icon}`}></i>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-white">{activity.message}</p>
                                    <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 시스템 핵심 지표 */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">🎯 시스템 핵심 가치</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                        <p className="text-3xl font-bold text-blue-400">3천만</p>
                        <p className="text-sm text-slate-400 mt-1">노동인구 통합 관리</p>
                    </div>
                    <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                        <p className="text-3xl font-bold text-green-400">5W1H</p>
                        <p className="text-sm text-slate-400 mt-1">업무 추적 시스템</p>
                    </div>
                    <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                        <p className="text-3xl font-bold text-purple-400">익명화</p>
                        <p className="text-sm text-slate-400 mt-1">개인정보 보호</p>
                    </div>
                    <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                        <p className="text-3xl font-bold text-yellow-400">OpenHash</p>
                        <p className="text-sm text-slate-400 mt-1">데이터 무결성 보장</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
