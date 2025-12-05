const ActivityLogs = () => {
    const [logs, setLogs] = React.useState([]);
    const [filter, setFilter] = React.useState('all');

    const categories = [
        { id: 'all', name: '전체', color: 'gray' },
        { id: 'launch', name: '발사체', color: 'blue' },
        { id: 'satellite', name: '위성', color: 'indigo' },
        { id: 'space', name: '우주탐사', color: 'purple' },
        { id: 'aviation', name: '항공', color: 'violet' }
    ];

    const generateLog = () => {
        const logTypes = [
            { category: 'launch', type: '누리호 텔레메트리 분석', detail: '4차 발사 비행 데이터 1.2TB 처리 완료', status: 'success' },
            { category: 'launch', type: '재사용발사체 시험', detail: '엔진 연소 시험 250초 성공', status: 'success' },
            { category: 'satellite', type: '위성 관제', detail: '아리랑 7호 정상 교신 확인', status: 'success' },
            { category: 'satellite', type: 'KPS 개발', detail: '한국형 위성항법 시스템 설계 검토', status: 'success' },
            { category: 'space', type: '다누리 운영', detail: '달 표면 고해상도 영상 수신', status: 'success' },
            { category: 'aviation', type: 'AAM 개발', detail: '미래항공모빌리티 시험비행 완료', status: 'success' }
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
                <p className="text-sm text-gray-600 mt-1">우주항공청 AI 에이전트 실시간 처리 현황</p>
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
