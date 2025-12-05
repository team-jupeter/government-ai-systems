const ActivityLogs = () => {
    const [logs, setLogs] = React.useState([]);
    const [filter, setFilter] = React.useState('all');

    const categories = [
        { id: 'all', name: '전체', color: 'gray' },
        { id: 'startup', name: '창업', color: 'blue' },
        { id: 'loan', name: '융자', color: 'indigo' },
        { id: 'market', name: '판로', color: 'blue' },
        { id: 'venture', name: '벤처', color: 'indigo' }
    ];

    const generateLog = () => {
        const logTypes = [
            { category: 'startup', type: '창업지원금 승인', detail: '예비창업패키지 2억원 지원 결정', status: 'success' },
            { category: 'startup', type: '창업교육 완료', detail: '스타트업 아카데미 100명 수료', status: 'success' },
            { category: 'loan', type: '정책자금 융자', detail: '중소기업 시설자금 15억원 승인', status: 'success' },
            { category: 'market', type: '판로개척 매칭', detail: '수출 바이어 5개사 연결 완료', status: 'success' },
            { category: 'venture', type: '벤처인증 심사', detail: '벤처기업 확인서 발급 - AI 기술기업', status: 'success' },
            { category: 'venture', type: '투자유치 지원', detail: '시리즈A 투자 50억원 유치', status: 'success' }
        ];
        const log = logTypes[Math.floor(Math.random() * logTypes.length)];
        return {
            id: Date.now() + Math.random(),
            timestamp: new Date().toLocaleTimeString('ko-KR'),
            category: log.category,
            type: log.type,
            detail: log.detail,
            status: log.status,
            aiProcessed: true
        };
    };

    React.useEffect(() => {
        const initialLogs = Array.from({ length: 10 }, () => generateLog());
        setLogs(initialLogs);
        const interval = setInterval(() => {
            const newLog = generateLog();
            setLogs(prev => [newLog, ...prev].slice(0, 50));
        }, Math.random() * 3000 + 2000);
        return () => clearInterval(interval);
    }, []);

    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.category === filter);
    const getStatusColor = (status) => status === 'success' ? 'text-green-700 bg-green-100' : 'text-gray-700 bg-gray-100';

    const stats = {
        total: logs.length,
        startup: logs.filter(l => l.category === 'startup').length,
        loan: logs.filter(l => l.category === 'loan').length,
        market: logs.filter(l => l.category === 'market').length,
        venture: logs.filter(l => l.category === 'venture').length
    };

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-3xl font-bold text-gray-900">실시간 업무 로그</h2>
                <p className="text-gray-600 mt-2">중소벤처기업부 AI 에이전트 실시간 처리 현황</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600">전체</div>
                    <div className="text-2xl font-bold text-gray-700">{stats.total}</div>
                </div>
                <div className="bg-blue-100 rounded-lg p-4 text-center">
                    <div className="text-sm text-blue-700">창업</div>
                    <div className="text-2xl font-bold text-blue-700">{stats.startup}</div>
                </div>
                <div className="bg-indigo-100 rounded-lg p-4 text-center">
                    <div className="text-sm text-indigo-700">융자</div>
                    <div className="text-2xl font-bold text-indigo-700">{stats.loan}</div>
                </div>
                <div className="bg-blue-100 rounded-lg p-4 text-center">
                    <div className="text-sm text-blue-700">판로</div>
                    <div className="text-2xl font-bold text-blue-700">{stats.market}</div>
                </div>
                <div className="bg-indigo-100 rounded-lg p-4 text-center">
                    <div className="text-sm text-indigo-700">벤처</div>
                    <div className="text-2xl font-bold text-indigo-700">{stats.venture}</div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <button key={cat.id} onClick={() => setFilter(cat.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            filter === cat.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                        {cat.name}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-lg border-2 border-gray-200">
                <div className="max-h-[600px] overflow-y-auto">
                    <div className="divide-y">
                        {filteredLogs.map((log) => (
                            <div key={log.id} className="p-4 hover:bg-gray-50">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                                                ✓ 완료
                                            </span>
                                            <span className="text-xs text-gray-500">{log.timestamp}</span>
                                            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">🤖 AI 처리</span>
                                        </div>
                                        <div className="font-semibold text-gray-900">{log.type}</div>
                                        <div className="text-sm text-gray-600 mt-1">{log.detail}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

(() => ActivityLogs)();
