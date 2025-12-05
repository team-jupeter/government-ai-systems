const ActivityLogs = () => {
    const [logs, setLogs] = React.useState([]);
    const [filter, setFilter] = React.useState('all');

    const categories = [
        { id: 'all', name: '전체', color: 'gray' },
        { id: 'investigation', name: '수사', color: 'blue' },
        { id: 'prosecution', name: '공소제기', color: 'indigo' },
        { id: 'trial', name: '공판', color: 'purple' },
        { id: 'execution', name: '형집행', color: 'violet' }
    ];

    const generateLog = () => {
        const logTypes = [
            { category: 'investigation', type: '사건 접수', detail: '형사사건 280건 자동 접수 및 배당', status: 'success' },
            { category: 'investigation', type: '증거 분석', detail: '디지털 포렌식 150건 AI 분석 완료', status: 'success' },
            { category: 'prosecution', type: '공소장 작성', detail: '공소장 85건 AI 작성 지원 완료', status: 'success' },
            { category: 'prosecution', type: '기소 결정', detail: '기소 120건, 불기소 45건 처리', status: 'success' },
            { category: 'trial', type: '공판 준비', detail: '공소유지 서류 95건 작성', status: 'success' },
            { category: 'trial', type: '판례 검색', detail: '관련 판례 1,200건 AI 검색', status: 'success' },
            { category: 'execution', type: '형 집행 지휘', detail: '형 집행 명령 38건 발부', status: 'success' }
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
                <h2 className="text-2xl font-bold text-gray-900">실시간 수사 로그</h2>
                <p className="text-sm text-gray-600 mt-1">대검찰청 AI 에이전트 실시간 처리 현황</p>
            </div>

            <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <button key={cat.id} onClick={() => setFilter(cat.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            filter === cat.id ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                                        <span className="px-2 py-1 bg-blue-100 text-blue-900 rounded text-xs font-medium">완료</span>
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
