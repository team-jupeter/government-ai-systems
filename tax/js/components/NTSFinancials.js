const NTSFinancials = () => {
    const [data, setData] = React.useState({
        revenue: { total: 336500000000000, income: 115000000000000, corporate: 82000000000000, vat: 78000000000000, inheritance: 18000000000000, other: 43500000000000 },
        today: { collected: 124730000000, processed: 847293, pending: 28473 },
        expenses: { personnel: 2100000000000, operations: 850000000000, systems: 250000000000 },
        efficiency: { automationRate: 87.3, processingTime: 2.8, satisfaction: 87 }
    });

    React.useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => ({
                ...prev,
                today: {
                    collected: prev.today.collected + Math.floor(Math.random() * 100000000),
                    processed: prev.today.processed + Math.floor(Math.random() * 50),
                    pending: Math.max(0, prev.today.pending - Math.floor(Math.random() * 20))
                }
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const formatKRW = (num) => {
        if (num >= 1000000000000) return (num / 1000000000000).toFixed(1) + '조';
        if (num >= 100000000) return (num / 100000000).toFixed(1) + '억';
        return num.toLocaleString();
    };

    const RechartsLib = window.Recharts || {};
    const { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } = RechartsLib;
    const chartsAvailable = PieChart && ResponsiveContainer;

    const revenueData = [
        { name: '소득세', value: 115, color: '#06B6D4' },
        { name: '법인세', value: 82, color: '#8B5CF6' },
        { name: '부가세', value: 78, color: '#10B981' },
        { name: '상속증여', value: 18, color: '#F59E0B' },
        { name: '기타', value: 43.5, color: '#6B7280' }
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-6 border border-blue-500/30 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                            <i className="fas fa-landmark text-3xl text-blue-400"></i>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">대한민국 국세청 재무제표</h1>
                            <p className="text-gray-400">2024 회계연도 | 실시간 갱신</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-lg">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span>OpenHash 실시간 검증</span>
                    </div>
                </div>
            </div>

            {/* 실시간 지표 */}
            <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="text-gray-400 text-sm">2024년 총 세수</div>
                    <div className="text-2xl font-bold text-white">₩{formatKRW(data.revenue.total)}</div>
                    <div className="text-xs text-green-400 mt-1"><i className="fas fa-arrow-up mr-1"></i>8.2% YoY</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 text-sm"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>오늘 징수</div>
                    <div className="text-2xl font-bold text-green-400">₩{formatKRW(data.today.collected)}</div>
                    <div className="text-xs text-gray-400 mt-1">실시간 갱신</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="text-gray-400 text-sm">처리 건수</div>
                    <div className="text-2xl font-bold text-cyan-400">{data.today.processed.toLocaleString()}</div>
                    <div className="text-xs text-gray-400 mt-1">자동화율 {data.efficiency.automationRate}%</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="text-gray-400 text-sm">미처리</div>
                    <div className="text-2xl font-bold text-yellow-400">{data.today.pending.toLocaleString()}</div>
                    <div className="text-xs text-gray-400 mt-1">AI 처리 중</div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* 세입 현황 */}
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold mb-4"><i className="fas fa-chart-pie text-cyan-400 mr-2"></i>세목별 세입 현황</h3>
                    {chartsAvailable ? (
                        <div className="flex items-center">
                            <div className="w-48 h-48">
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie data={revenueData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                                            {revenueData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                                        </Pie>
                                        <Tooltip formatter={(v) => `${v}조원`} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex-1 space-y-2">
                                {revenueData.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                                            <span className="text-gray-300">{item.name}</span>
                                        </div>
                                        <span className="text-white font-medium">₩{item.value}조</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : <div className="h-48 flex items-center justify-center text-gray-400">차트 로딩 중...</div>}
                </div>

                {/* 운영 효율성 */}
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold mb-4"><i className="fas fa-tachometer-alt text-green-400 mr-2"></i>운영 효율성</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-400">업무 자동화율</span>
                                <span className="text-green-400 font-bold">{data.efficiency.automationRate}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-3">
                                <div className="bg-green-500 h-3 rounded-full" style={{width: `${data.efficiency.automationRate}%`}}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-400">평균 처리 시간</span>
                                <span className="text-cyan-400 font-bold">{data.efficiency.processingTime}일</span>
                            </div>
                            <div className="text-xs text-gray-500">기존 30일 → 2.8일 (90% 단축)</div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-400">납세자 만족도</span>
                                <span className="text-yellow-400 font-bold">{data.efficiency.satisfaction}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-3">
                                <div className="bg-yellow-500 h-3 rounded-full" style={{width: `${data.efficiency.satisfaction}%`}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 세출 현황 */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mt-6">
                <h3 className="text-xl font-bold mb-4"><i className="fas fa-money-bill-wave text-red-400 mr-2"></i>운영 비용</h3>
                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-gray-700/50 rounded-xl p-4">
                        <div className="text-sm text-gray-400">인건비</div>
                        <div className="text-2xl font-bold text-white">₩{formatKRW(data.expenses.personnel)}</div>
                        <div className="text-xs text-gray-500 mt-1">약 20,000명 직원</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-xl p-4">
                        <div className="text-sm text-gray-400">운영비</div>
                        <div className="text-2xl font-bold text-white">₩{formatKRW(data.expenses.operations)}</div>
                        <div className="text-xs text-green-400 mt-1">64% 절감 달성</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-xl p-4">
                        <div className="text-sm text-gray-400">시스템 유지</div>
                        <div className="text-2xl font-bold text-white">₩{formatKRW(data.expenses.systems)}</div>
                        <div className="text-xs text-cyan-400 mt-1">OpenHash + AI</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
