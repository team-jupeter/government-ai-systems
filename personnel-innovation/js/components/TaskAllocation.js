const TaskAllocation = () => {
    const [stats, setStats] = React.useState({
        pending: 782450,
        inProgress: 16250000,
        completed: 45820000,
        autoAllocated: 38500000
    });

    const RechartsLib = window.Recharts || {};
    const { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } = RechartsLib;

    React.useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                pending: prev.pending + Math.floor(Math.random() * 1000 - 500),
                inProgress: prev.inProgress + Math.floor(Math.random() * 5000 - 2500),
                completed: prev.completed + Math.floor(Math.random() * 2000),
                autoAllocated: prev.autoAllocated + Math.floor(Math.random() * 1500)
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const taskTypeData = [
        { name: '정형업무', value: 25000000, color: '#3b82f6', aiRate: 92 },
        { name: '비정형업무', value: 8500000, color: '#8b5cf6', aiRate: 45 },
        { name: '창의업무', value: 3200000, color: '#22c55e', aiRate: 28 },
        { name: '협업업무', value: 6800000, color: '#f59e0b', aiRate: 55 },
        { name: '고객대면', value: 4500000, color: '#ef4444', aiRate: 38 }
    ];

    const hourlyAllocation = [];
    for (let i = 0; i < 24; i++) {
        const isWork = i >= 9 && i < 18;
        hourlyAllocation.push({
            hour: i + '시',
            allocated: isWork ? 2200000 + Math.random() * 600000 : 350000 + Math.random() * 200000,
            completed: isWork ? 2000000 + Math.random() * 500000 : 300000 + Math.random() * 150000
        });
    }

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
        return num.toLocaleString();
    };

    const recentAllocations = [
        { task: '월간 보고서 작성', assignee: 'Worker-a8f3', type: 'AI지원', time: '2분 전', status: 'progress' },
        { task: '고객 문의 응대', assignee: 'Worker-b2c1', type: '자동할당', time: '5분 전', status: 'completed' },
        { task: '데이터 분석 리포트', assignee: 'Worker-c9d4', type: 'AI지원', time: '8분 전', status: 'progress' },
        { task: '시스템 점검', assignee: 'Worker-e5f2', type: '자동할당', time: '12분 전', status: 'completed' },
        { task: '신규 프로젝트 기획', assignee: 'Worker-g7h8', type: '수동할당', time: '15분 전', status: 'pending' }
    ];

    return (
        <div className="space-y-6">
            {/* 실시간 현황 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">대기 중</p>
                            <p className="text-2xl font-bold text-yellow-400 mt-1">{formatNumber(stats.pending)}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-clock text-xl text-yellow-400"></i>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">진행 중</p>
                            <p className="text-2xl font-bold text-blue-400 mt-1">{formatNumber(stats.inProgress)}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-spinner text-xl text-blue-400"></i>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">오늘 완료</p>
                            <p className="text-2xl font-bold text-green-400 mt-1">{formatNumber(stats.completed)}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-check text-xl text-green-400"></i>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">AI 자동 할당</p>
                            <p className="text-2xl font-bold text-purple-400 mt-1">{formatNumber(stats.autoAllocated)}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-robot text-xl text-purple-400"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* 차트 영역 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 업무 유형별 분포 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">업무 유형별 할당</h3>
                    {PieChart ? (
                        <div className="flex items-center">
                            <ResponsiveContainer width="50%" height={220}>
                                <PieChart>
                                    <Pie
                                        data={taskTypeData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={85}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {taskTypeData.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                        formatter={(value) => [formatNumber(value) + '건', '']}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="w-1/2 space-y-2">
                                {taskTypeData.map((item) => (
                                    <div key={item.name} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                                            <span className="text-xs text-slate-300">{item.name}</span>
                                        </div>
                                        <span className="text-xs text-purple-400">AI {item.aiRate}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="h-48 flex items-center justify-center text-slate-400">차트 로딩 중...</div>
                    )}
                </div>

                {/* 시간대별 할당 추이 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">시간대별 업무 할당</h3>
                    {AreaChart ? (
                        <ResponsiveContainer width="100%" height={220}>
                            <AreaChart data={hourlyAllocation}>
                                <defs>
                                    <linearGradient id="allocGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
                                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => (v/1000000).toFixed(1) + 'M'} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                    formatter={(value) => [formatNumber(value) + '건', '']}
                                />
                                <Area type="monotone" dataKey="allocated" stroke="#3b82f6" fill="url(#allocGrad)" name="할당" />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-48 flex items-center justify-center text-slate-400">차트 로딩 중...</div>
                    )}
                </div>
            </div>

            {/* 최근 할당 목록 */}
            <div className="bg-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">최근 업무 할당</h3>
                    <span className="flex items-center gap-2 text-xs text-green-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        실시간
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-slate-700">
                                <th className="pb-3 text-slate-400 text-sm font-medium">업무</th>
                                <th className="pb-3 text-slate-400 text-sm font-medium">담당자</th>
                                <th className="pb-3 text-slate-400 text-sm font-medium">할당 방식</th>
                                <th className="pb-3 text-slate-400 text-sm font-medium">시간</th>
                                <th className="pb-3 text-slate-400 text-sm font-medium">상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentAllocations.map((item, index) => (
                                <tr key={index} className="border-b border-slate-700/50">
                                    <td className="py-3 text-sm text-white">{item.task}</td>
                                    <td className="py-3 text-sm font-mono text-blue-400">{item.assignee}</td>
                                    <td className="py-3">
                                        <span className={`px-2 py-1 rounded text-xs ${
                                            item.type === 'AI지원' ? 'bg-purple-500/20 text-purple-400' :
                                            item.type === '자동할당' ? 'bg-green-500/20 text-green-400' :
                                            'bg-slate-500/20 text-slate-400'
                                        }`}>
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="py-3 text-sm text-slate-400">{item.time}</td>
                                    <td className="py-3">
                                        <span className={`px-2 py-1 rounded text-xs ${
                                            item.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                            item.status === 'progress' ? 'bg-blue-500/20 text-blue-400' :
                                            'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                            {item.status === 'completed' ? '완료' : item.status === 'progress' ? '진행중' : '대기'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
