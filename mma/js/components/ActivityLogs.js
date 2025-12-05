const ActivityLogs = () => {
    const [logs, setLogs] = React.useState([]);
    const [filter, setFilter] = React.useState('all');

    const categories = [
        { id: 'all', name: '전체', color: 'gray' },
        { id: 'examination', name: '병역판정', color: 'yellow' },
        { id: 'enlistment', name: '입영', color: 'lime' },
        { id: 'social', name: '사회복무', color: 'green' },
        { id: 'industry', name: '산업기능', color: 'emerald' }
    ];

    const generateLog = () => {
        const logTypes = [
            { category: 'examination', type: '병역판정검사 예약', detail: '신규 예약 280건 자동 접수', status: 'success' },
            { category: 'examination', type: '신체검사 결과', detail: '검사 완료 250건 판정 처리', status: 'success' },
            { category: 'enlistment', type: '입영통지서 발송', detail: '현역 120건, 보충역 85건 발송', status: 'success' },
            { category: 'enlistment', type: '입영일자 조정', detail: '연기 신청 45건 승인 처리', status: 'success' },
            { category: 'social', type: '사회복무요원 배정', detail: '복무기관 배정 180건 완료', status: 'success' },
            { category: 'social', type: '복무관리', detail: '일일 출결 15,000건 확인', status: 'success' },
            { category: 'industry', type: '산업기능요원 편입', detail: '신규 편입 35건 승인', status: 'success' }
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
                <h2 className="text-2xl font-bold text-gray-900">실시간 병무 로그</h2>
                <p className="text-sm text-gray-600 mt-1">병무청 AI 에이전트 실시간 처리 현황</p>
            </div>

            <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <button key={cat.id} onClick={() => setFilter(cat.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            filter === cat.id ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        style={filter === cat.id ? {backgroundColor: '#65671f'} : {}}>
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
                                        <span className="px-2 py-1 rounded text-xs font-medium" style={{backgroundColor: '#f7fee7', color: '#65671f'}}>완료</span>
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
