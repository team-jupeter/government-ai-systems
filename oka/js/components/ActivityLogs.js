const ActivityLogs = () => {
    const [logs, setLogs] = React.useState([]);
    const [filter, setFilter] = React.useState('all');

    const categories = [
        { id: 'all', name: '전체', color: 'gray' },
        { id: 'consular', name: '영사민원', color: 'green' },
        { id: 'support', name: '지원사업', color: 'emerald' },
        { id: 'network', name: '네트워크', color: 'teal' },
        { id: 'education', name: '교육문화', color: 'cyan' }
    ];

    const generateLog = () => {
        const logTypes = [
            { category: 'consular', type: '영사 민원 처리', detail: '아포스티유 발급 150건 자동 처리', status: 'success' },
            { category: 'consular', type: '비자 연장 승인', detail: 'F-4 비자 연장 85건 승인', status: 'success' },
            { category: 'support', type: '지원금 심사', detail: '창업지원금 35건 자동 심사 완료', status: 'success' },
            { category: 'support', type: '장학금 지급', detail: '차세대 동포 장학금 120건 지급', status: 'success' },
            { category: 'network', type: '네트워크 매칭', detail: '한인단체 협력 매칭 28건', status: 'success' },
            { category: 'education', type: '한국어 교육', detail: '온라인 한국어 수업 380명 참여', status: 'success' }
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

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">실시간 업무 로그</h2>
                <p className="text-sm text-gray-600 mt-1">재외동포청 AI 에이전트 실시간 처리 현황</p>
            </div>

            <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <button key={cat.id} onClick={() => setFilter(cat.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            filter === cat.id ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                        {cat.name}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-lg border">
                <div className="max-h-[600px] overflow-y-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b sticky top-0">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">시각</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">업무</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">상세</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">상태</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filteredLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-600">{log.timestamp}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{log.type}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{log.detail}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">완료</span>
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

(() => ActivityLogs)();
