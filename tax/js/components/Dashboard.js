const Dashboard = () => {
    const [stats, setStats] = React.useState({
        totalTaxCollected: 336500000000000, // 336.5조
        todayCollection: 124730000000,      // 1247.3억
        pendingReturns: 2847392,
        activeTransactions: 15892,
        layerStats: {
            layer1: { name: '읍면동', nodes: 3496, transactions: 847293, collected: 12500000000000 },
            layer2: { name: '시군구', nodes: 226, transactions: 234892, collected: 45200000000000 },
            layer3: { name: '광역시도', nodes: 17, transactions: 89234, collected: 128300000000000 },
            layer4: { name: '국가', nodes: 1, transactions: 12847, collected: 150500000000000 }
        }
    });
    
    const [recentTransactions, setRecentTransactions] = React.useState([]);
    
    // 실시간 데이터 시뮬레이션
    React.useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                todayCollection: prev.todayCollection + Math.random() * 100000000,
                activeTransactions: Math.floor(Math.random() * 5000) + 12000,
                pendingReturns: prev.pendingReturns - Math.floor(Math.random() * 100)
            }));
            
            // 새 거래 추가
            const newTx = {
                id: `TX-${Date.now()}`,
                type: ['소득세', '법인세', '부가세', '종합소득세'][Math.floor(Math.random() * 4)],
                amount: Math.floor(Math.random() * 50000000) + 100000,
                layer: Math.floor(Math.random() * 4) + 1,
                timestamp: new Date().toISOString(),
                status: 'verified'
            };
            setRecentTransactions(prev => [newTx, ...prev.slice(0, 9)]);
        }, 3000);
        
        return () => clearInterval(interval);
    }, []);

    const formatKRW = (num) => {
        if (num >= 1000000000000) return `₩ ${(num / 1000000000000).toFixed(1)}조`;
        if (num >= 100000000) return `₩ ${(num / 100000000).toFixed(1)}억`;
        if (num >= 10000) return `₩ ${(num / 10000).toFixed(1)}만`;
        return `₩ ${num.toLocaleString()}`;
    };

    const RechartsLib = window.Recharts || {};
    const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } = RechartsLib;
    const chartsAvailable = AreaChart && ResponsiveContainer;

    // 월별 징수 데이터
    const monthlyData = [
        { month: '1월', amount: 28.5 }, { month: '2월', amount: 26.2 },
        { month: '3월', amount: 31.4 }, { month: '4월', amount: 29.8 },
        { month: '5월', amount: 27.6 }, { month: '6월', amount: 30.2 },
        { month: '7월', amount: 28.9 }, { month: '8월', amount: 27.1 },
        { month: '9월', amount: 29.5 }, { month: '10월', amount: 31.8 },
        { month: '11월', amount: 33.2 }, { month: '12월', amount: 32.3 }
    ];

    // 세목별 비율
    const taxTypeData = [
        { name: '소득세', value: 34.2, color: '#06B6D4' },
        { name: '법인세', value: 24.4, color: '#8B5CF6' },
        { name: '부가가치세', value: 23.2, color: '#10B981' },
        { name: '상속증여세', value: 5.3, color: '#F59E0B' },
        { name: '기타', value: 12.9, color: '#6B7280' }
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* 상단 통계 카드 */}
            <div className="grid grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 rounded-2xl p-6 border border-cyan-500/30 card-hover">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-coins text-cyan-400 text-xl"></i>
                        </div>
                        <span className="text-xs text-cyan-400 bg-cyan-500/20 px-2 py-1 rounded-full">2024년</span>
                    </div>
                    <div className="text-gray-400 text-sm mb-1">총 국세 징수</div>
                    <div className="text-3xl font-bold text-white number-ticker">
                        {formatKRW(stats.totalTaxCollected)}
                    </div>
                    <div className="text-xs text-green-400 mt-2">
                        <i className="fas fa-arrow-up mr-1"></i>8.2% YoY 증가
                    </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-2xl p-6 border border-green-500/30 card-hover">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-clock text-green-400 text-xl"></i>
                        </div>
                        <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full animate-pulse">LIVE</span>
                    </div>
                    <div className="text-gray-400 text-sm mb-1">오늘 징수액</div>
                    <div className="text-3xl font-bold text-white number-ticker">
                        {formatKRW(stats.todayCollection)}
                    </div>
                    <div className="text-xs text-green-400 mt-2">
                        <i className="fas fa-sync mr-1"></i>실시간 갱신 중
                    </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border border-purple-500/30 card-hover">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-file-alt text-purple-400 text-xl"></i>
                        </div>
                        <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">처리중</span>
                    </div>
                    <div className="text-gray-400 text-sm mb-1">미처리 신고</div>
                    <div className="text-3xl font-bold text-white number-ticker">
                        {stats.pendingReturns.toLocaleString()}
                    </div>
                    <div className="text-xs text-yellow-400 mt-2">
                        <i className="fas fa-robot mr-1"></i>AI 자동 처리 중
                    </div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 rounded-2xl p-6 border border-orange-500/30 card-hover">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-exchange-alt text-orange-400 text-xl"></i>
                        </div>
                        <span className="text-xs text-orange-400 bg-orange-500/20 px-2 py-1 rounded-full animate-pulse">LIVE</span>
                    </div>
                    <div className="text-gray-400 text-sm mb-1">활성 거래</div>
                    <div className="text-3xl font-bold text-white number-ticker">
                        {stats.activeTransactions.toLocaleString()}
                    </div>
                    <div className="text-xs text-cyan-400 mt-2">
                        <i className="fas fa-bolt mr-1"></i>374.76 TPS
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
                {/* 월별 징수 차트 */}
                <div className="col-span-2 bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold">월별 국세 징수 추이</h3>
                        <span className="text-sm text-gray-400">단위: 조원</span>
                    </div>
                    {chartsAvailable ? (
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={monthlyData}>
                                    <defs>
                                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="month" stroke="#9CA3AF" />
                                    <YAxis stroke="#9CA3AF" />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                                        formatter={(value) => [`${value}조원`, '징수액']}
                                    />
                                    <Area type="monotone" dataKey="amount" stroke="#06B6D4" strokeWidth={2} fill="url(#colorAmount)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="h-64 flex items-center justify-center bg-gray-700 rounded-lg">
                            <p className="text-gray-400">차트 로딩 중...</p>
                        </div>
                    )}
                </div>

                {/* 세목별 비율 */}
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold mb-6">세목별 비율</h3>
                    {chartsAvailable && PieChart ? (
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={taxTypeData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={70}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {taxTypeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                                        formatter={(value) => [`${value}%`, '']}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="h-48 flex items-center justify-center bg-gray-700 rounded-lg">
                            <p className="text-gray-400">차트 로딩 중...</p>
                        </div>
                    )}
                    <div className="space-y-2 mt-4">
                        {taxTypeData.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                                    <span className="text-gray-300">{item.name}</span>
                                </div>
                                <span className="text-white font-medium">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Layer 계층 현황 */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">OpenHash Layer 계층 현황</h3>
                    <div className="flex items-center gap-2 text-sm text-cyan-400">
                        <i className="fas fa-link"></i>
                        <span>분산 네트워크 활성</span>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {Object.entries(stats.layerStats).map(([key, layer], idx) => (
                        <div key={key} className={`bg-gray-700/50 rounded-xl p-4 border ${
                            idx === 0 ? 'border-blue-500/30' :
                            idx === 1 ? 'border-green-500/30' :
                            idx === 2 ? 'border-purple-500/30' :
                            'border-cyan-500/30'
                        }`}>
                            <div className="flex items-center justify-between mb-3">
                                <span className={`text-sm font-bold ${
                                    idx === 0 ? 'text-blue-400' :
                                    idx === 1 ? 'text-green-400' :
                                    idx === 2 ? 'text-purple-400' :
                                    'text-cyan-400'
                                }`}>
                                    Layer {idx + 1}
                                </span>
                                <span className="text-xs text-gray-400">{layer.name}</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-400 text-xs">노드 수</span>
                                    <span className="text-white font-medium">{layer.nodes.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400 text-xs">거래 수</span>
                                    <span className="text-white font-medium">{layer.transactions.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400 text-xs">징수액</span>
                                    <span className="text-white font-medium">{formatKRW(layer.collected)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Layer 흐름도 */}
                <div className="mt-6 flex items-center justify-center gap-4">
                    <div className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg border border-blue-500/30">
                        읍면동 (3,496)
                    </div>
                    <i className="fas fa-arrow-right text-gray-500 animate-flow"></i>
                    <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg border border-green-500/30">
                        시군구 (226)
                    </div>
                    <i className="fas fa-arrow-right text-gray-500 animate-flow"></i>
                    <div className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-lg border border-purple-500/30">
                        광역시도 (17)
                    </div>
                    <i className="fas fa-arrow-right text-gray-500 animate-flow"></i>
                    <div className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-lg border border-cyan-500/30">
                        국가 (1)
                    </div>
                </div>
            </div>

            {/* 최근 거래 스트림 */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">실시간 거래 스트림</h3>
                    <span className="flex items-center gap-2 text-sm text-green-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        실시간
                    </span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                    {recentTransactions.map((tx, idx) => (
                        <div key={tx.id} className={`flex items-center justify-between p-3 rounded-lg ${
                            idx === 0 ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-gray-700/50'
                        }`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                    tx.type === '소득세' ? 'bg-blue-500/20 text-blue-400' :
                                    tx.type === '법인세' ? 'bg-purple-500/20 text-purple-400' :
                                    tx.type === '부가세' ? 'bg-green-500/20 text-green-400' :
                                    'bg-orange-500/20 text-orange-400'
                                }`}>
                                    <i className="fas fa-receipt text-sm"></i>
                                </div>
                                <div>
                                    <div className="text-white font-medium">{tx.type}</div>
                                    <div className="text-xs text-gray-400">{tx.id}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-white font-medium">{formatKRW(tx.amount)}</div>
                                <div className="text-xs text-gray-400">Layer {tx.layer}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">
                                    <i className="fas fa-check mr-1"></i>검증됨
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
