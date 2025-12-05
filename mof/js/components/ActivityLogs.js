const ActivityLogs = () => {
    const [logs, setLogs] = React.useState([]);
    const [filter, setFilter] = React.useState('all');

    const categories = [
        { id: 'all', name: '전체', color: 'gray' },
        { id: 'fishery', name: '수산', color: 'teal' },
        { id: 'port', name: '항만', color: 'blue' },
        { id: 'marine', name: '해양', color: 'cyan' },
        { id: 'safety', name: '안전', color: 'red' }
    ];

    const generateLog = () => {
        const logTypes = [
            { category: 'fishery', type: '수산물 유통 승인', detail: '부산공동어시장 위판 데이터 처리 완료', status: 'success' },
            { category: 'fishery', type: '어업 허가 심사', detail: '동해 오징어 채낚기어업 허가 승인', status: 'success' },
            { category: 'port', type: '선박 입항 처리', detail: '부산항 컨테이너선 자동 접안', status: 'success' },
            { category: 'port', type: '물동량 처리', detail: '인천항 수입 화물 3,250TEU 처리 완료', status: 'success' },
            { category: 'marine', type: '해양환경 감시', detail: '서해 적조 발생 징후 감지', status: 'warning' },
            { category: 'safety', type: '선박 안전 검사', detail: '여객선 정기 안전검사 통과', status: 'success' }
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
    const getStatusColor = (status) => {
        switch(status) {
            case 'success': return 'text-green-700 bg-green-100';
            case 'warning': return 'text-yellow-700 bg-yellow-100';
            default: return 'text-gray-700 bg-gray-100';
        }
    };

    const stats = {
        total: logs.length,
        fishery: logs.filter(l => l.category === 'fishery').length,
        port: logs.filter(l => l.category === 'port').length,
        marine: logs.filter(l => l.category === 'marine').length,
        safety: logs.filter(l => l.category === 'safety').length
    };

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-3xl font-bold text-gray-900">실시간 업무 로그</h2>
                <p className="text-gray-600 mt-2">해양수산부 AI 에이전트 실시간 처리 현황</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600">전체</div>
                    <div className="text-2xl font-bold text-gray-700">{stats.total}</div>
                </div>
                <div className="bg-teal-100 rounded-lg p-4 text-center">
                    <div className="text-sm text-teal-700">수산</div>
                    <div className="text-2xl font-bold text-teal-700">{stats.fishery}</div>
                </div>
                <div className="bg-blue-100 rounded-lg p-4 text-center">
                    <div className="text-sm text-blue-700">항만</div>
                    <div className="text-2xl font-bold text-blue-700">{stats.port}</div>
                </div>
                <div className="bg-cyan-100 rounded-lg p-4 text-center">
                    <div className="text-sm text-cyan-700">해양</div>
                    <div className="text-2xl font-bold text-cyan-700">{stats.marine}</div>
                </div>
                <div className="bg-red-100 rounded-lg p-4 text-center">
                    <div className="text-sm text-red-700">안전</div>
                    <div className="text-2xl font-bold text-red-700">{stats.safety}</div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <button key={cat.id} onClick={() => setFilter(cat.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            filter === cat.id ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                                                {log.status === 'success' ? '✓ 완료' : '⚠ 주의'}
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

            <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-blue-900 mb-3">🔐 OpenHash 블록체인 검증</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white rounded p-3">
                        <div className="text-gray-600">총 기록 수</div>
                        <div className="text-2xl font-bold text-blue-700">{stats.total}</div>
                    </div>
                    <div className="bg-white rounded p-3">
                        <div className="text-gray-600">블록체인 저장율</div>
                        <div className="text-2xl font-bold text-green-700">100%</div>
                    </div>
                    <div className="bg-white rounded p-3">
                        <div className="text-gray-600">위변조 시도</div>
                        <div className="text-2xl font-bold text-red-700">0건</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

(() => ActivityLogs)();
