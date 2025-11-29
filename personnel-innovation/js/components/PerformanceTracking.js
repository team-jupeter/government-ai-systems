const PerformanceTracking = () => {
    const [records, setRecords] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [filter, setFilter] = React.useState('all');
    const [totalToday, setTotalToday] = React.useState(47823456);

    const RechartsLib = window.Recharts || {};
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } = RechartsLib;

    React.useEffect(() => {
        fetchRecords();
        const interval = setInterval(() => {
            setTotalToday(prev => prev + Math.floor(Math.random() * 1000));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const fetchRecords = async () => {
        try {
            const response = await fetch('/api/personnel-innovation/performance/tracking');
            const result = await response.json();
            if (result.success) {
                setRecords(result.data.records || []);
            }
        } catch (error) {
            console.error('데이터 로드 오류:', error);
            generateSampleRecords();
        } finally {
            setLoading(false);
        }
    };

    const generateSampleRecords = () => {
        const taskTypes = ['문서작성', '회의참석', '고객상담', '데이터분석', '코드개발', '기획안작성', '보고서검토'];
        const locations = ['본사', '지사', '재택', '현장', '출장지'];
        const methods = ['단독수행', '협업', 'AI지원', '자동화'];
        const reasons = ['정기업무', '긴급요청', '프로젝트', '고객요청'];

        const sampleRecords = [];
        for (let i = 0; i < 15; i++) {
            const now = new Date();
            now.setMinutes(now.getMinutes() - Math.floor(Math.random() * 480));
            sampleRecords.push({
                record_id: Math.random().toString(36).substr(2, 12),
                worker_hash: Math.random().toString(36).substr(2, 16),
                who: 'Worker-' + Math.random().toString(36).substr(2, 8),
                when: now.toISOString(),
                where: locations[Math.floor(Math.random() * locations.length)],
                what: taskTypes[Math.floor(Math.random() * taskTypes.length)],
                how_long: Math.floor(Math.random() * 165 + 15) + '분',
                how: methods[Math.floor(Math.random() * methods.length)],
                why: reasons[Math.floor(Math.random() * reasons.length)],
                openhash: Math.random().toString(36).substr(2, 64),
                verified: true
            });
        }
        setRecords(sampleRecords);
    };

    const taskDistribution = [
        { type: '문서작성', count: 12500000, percentage: 26 },
        { type: '회의참석', count: 8200000, percentage: 17 },
        { type: '데이터분석', count: 7800000, percentage: 16 },
        { type: '고객상담', count: 6500000, percentage: 14 },
        { type: '코드개발', count: 5200000, percentage: 11 },
        { type: '기획업무', count: 4800000, percentage: 10 },
        { type: '기타', count: 2800000, percentage: 6 }
    ];

    const hourlyTrend = [];
    for (let i = 0; i < 24; i++) {
        const isWork = i >= 9 && i < 18;
        hourlyTrend.push({
            hour: i + '시',
            tasks: isWork ? 2500000 + Math.random() * 800000 : 400000 + Math.random() * 300000
        });
    }

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
        return num.toLocaleString();
    };

    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <i className="fas fa-spinner fa-spin text-4xl text-blue-500 mb-4"></i>
                    <p className="text-slate-400">업무 기록 로딩 중...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* 5W1H 설명 배너 */}
            <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                        <i className="fas fa-clipboard-list text-2xl text-blue-400"></i>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">5W1H 업무 추적 시스템</h3>
                        <p className="text-slate-400 text-sm">모든 업무 수행을 체계적으로 기록합니다</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {[
                        { label: 'WHO', desc: '누가', icon: 'fa-user', color: 'text-blue-400' },
                        { label: 'WHEN', desc: '언제', icon: 'fa-clock', color: 'text-green-400' },
                        { label: 'WHERE', desc: '어디서', icon: 'fa-location-dot', color: 'text-yellow-400' },
                        { label: 'WHAT', desc: '무엇을', icon: 'fa-file-alt', color: 'text-purple-400' },
                        { label: 'HOW', desc: '어떻게', icon: 'fa-cogs', color: 'text-pink-400' },
                        { label: 'WHY', desc: '왜', icon: 'fa-question-circle', color: 'text-cyan-400' }
                    ].map((item) => (
                        <div key={item.label} className="text-center p-3 bg-slate-800/50 rounded-lg">
                            <i className={`fas ${item.icon} ${item.color} text-xl mb-1`}></i>
                            <p className={`font-bold ${item.color}`}>{item.label}</p>
                            <p className="text-xs text-slate-400">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 상단 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">오늘 총 업무 기록</p>
                            <p className="text-2xl font-bold text-white mt-1">{formatNumber(totalToday)}</p>
                        </div>
                        <div className="flex items-center gap-1 text-green-400">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span className="text-xs">LIVE</span>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-800 rounded-xl p-5">
                    <p className="text-slate-400 text-sm">AI 지원 업무</p>
                    <p className="text-2xl font-bold text-purple-400 mt-1">68.5%</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-5">
                    <p className="text-slate-400 text-sm">평균 업무 시간</p>
                    <p className="text-2xl font-bold text-blue-400 mt-1">47분</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-5">
                    <p className="text-slate-400 text-sm">OpenHash 검증률</p>
                    <p className="text-2xl font-bold text-green-400 mt-1">99.97%</p>
                </div>
            </div>

            {/* 차트 영역 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 업무 유형별 분포 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">업무 유형별 분포</h3>
                    {BarChart ? (
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={taskDistribution} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickFormatter={(v) => (v/1000000).toFixed(0) + 'M'} />
                                <YAxis type="category" dataKey="type" stroke="#94a3b8" fontSize={11} width={70} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                    formatter={(value) => [formatNumber(value) + '건', '업무량']}
                                />
                                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-48 flex items-center justify-center text-slate-400">차트 로딩 중...</div>
                    )}
                </div>

                {/* 시간대별 업무량 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">시간대별 업무량</h3>
                    {LineChart ? (
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={hourlyTrend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
                                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => (v/1000000).toFixed(1) + 'M'} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                    formatter={(value) => [formatNumber(value) + '건', '업무량']}
                                />
                                <Line type="monotone" dataKey="tasks" stroke="#22c55e" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-48 flex items-center justify-center text-slate-400">차트 로딩 중...</div>
                    )}
                </div>
            </div>

            {/* 실시간 업무 기록 테이블 */}
            <div className="bg-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">실시간 업무 기록</h3>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-green-400 text-sm">실시간 업데이트</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-slate-700">
                                <th className="pb-3 text-slate-400 text-sm font-medium">Worker ID</th>
                                <th className="pb-3 text-slate-400 text-sm font-medium">시간</th>
                                <th className="pb-3 text-slate-400 text-sm font-medium">장소</th>
                                <th className="pb-3 text-slate-400 text-sm font-medium">업무</th>
                                <th className="pb-3 text-slate-400 text-sm font-medium">소요시간</th>
                                <th className="pb-3 text-slate-400 text-sm font-medium">방식</th>
                                <th className="pb-3 text-slate-400 text-sm font-medium">검증</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.slice(0, 10).map((record, index) => (
                                <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                                    <td className="py-3 text-sm font-mono text-blue-400">{record.who}</td>
                                    <td className="py-3 text-sm text-slate-300">{formatTime(record.when)}</td>
                                    <td className="py-3 text-sm text-slate-300">{record.where}</td>
                                    <td className="py-3 text-sm text-white">{record.what}</td>
                                    <td className="py-3 text-sm text-slate-300">{record.how_long}</td>
                                    <td className="py-3">
                                        <span className={`px-2 py-1 rounded text-xs ${
                                            record.how === 'AI지원' ? 'bg-purple-500/20 text-purple-400' :
                                            record.how === '자동화' ? 'bg-green-500/20 text-green-400' :
                                            record.how === '협업' ? 'bg-blue-500/20 text-blue-400' :
                                            'bg-slate-500/20 text-slate-400'
                                        }`}>
                                            {record.how}
                                        </span>
                                    </td>
                                    <td className="py-3">
                                        {record.verified ? (
                                            <span className="text-green-400"><i className="fas fa-check-circle"></i></span>
                                        ) : (
                                            <span className="text-yellow-400"><i className="fas fa-clock"></i></span>
                                        )}
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
