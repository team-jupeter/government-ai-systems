const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x9d4e7a3c...8f2b', type: '중소기업', data: '스타트업 R&D 지원 예산 3.2조원 승인', timestamp: '2025-12-05 14:00:22', nodes: 21, status: '검증완료' },
        { id: 2, hash: '0x4c8f2d9a...7e3b', type: '무역 정책', data: 'FTA 체결국 확대 - 인도·베트남 추가', timestamp: '2025-12-04 11:30:47', nodes: 21, status: '검증완료' },
        { id: 3, hash: '0x7e9a4d3c...5f8b', type: '특허', data: 'AI 특허 심사 기간 단축 - 6개월→3개월', timestamp: '2025-12-03 16:15:33', nodes: 21, status: '검증완료' },
        { id: 4, hash: '0x3f7d2e8c...9a4b', type: '법안 의결', data: '산업발전법 개정안 - 탄소중립 지원', timestamp: '2025-12-02 10:30:18', nodes: 21, status: '검증완료' },
        { id: 5, hash: '0x8d4c9f2a...7e3b', type: '국정감사', data: '산업부 업무보고 - 반도체 클러스터', timestamp: '2025-12-01 09:00:29', nodes: 21, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-sky-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('중소기업')} className={`px-4 py-2 rounded text-sm ${filter === '중소기업' ? 'bg-sky-600 text-white' : 'bg-gray-200'}`}>중소기업</button>
                    <button onClick={() => setFilter('무역 정책')} className={`px-4 py-2 rounded text-sm ${filter === '무역 정책' ? 'bg-sky-600 text-white' : 'bg-gray-200'}`}>무역</button>
                </div>
            </div>
            
            <div className="space-y-3">
                {filteredLogs.map(log => (
                    <div key={log.id} className="bg-white rounded-lg shadow-md p-5 border-l-4 border-sky-500">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-sky-100 text-sky-800 text-xs font-bold rounded-full">{log.type}</span>
                                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">✓ {log.status}</span>
                            </div>
                            <span className="text-xs text-gray-500 font-mono">{log.nodes} nodes</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{log.data}</h3>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <span className="font-mono bg-gray-100 px-2 py-1 rounded">{log.hash}</span>
                            <span>{log.timestamp}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
