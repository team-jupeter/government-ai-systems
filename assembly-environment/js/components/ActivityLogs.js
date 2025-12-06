const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x7d4e9a3c...8f2b', type: '환경 정책', data: '탄소중립기본법 개정안 - 2040년 목표 강화', timestamp: '2025-12-05 14:30:22', nodes: 20, status: '검증완료' },
        { id: 2, hash: '0x4c8f2d9a...7e3b', type: '근로 정책', data: '중대재해처벌법 개정안 - 처벌 강화', timestamp: '2025-12-04 11:00:47', nodes: 20, status: '검증완료' },
        { id: 3, hash: '0x9e4a7d3c...5f8b', type: '산업재해', data: '건설 현장 안전 기준 강화 의결', timestamp: '2025-12-03 16:15:33', nodes: 20, status: '검증완료' },
        { id: 4, hash: '0x3f7d2e8c...9a4b', type: '법안 의결', data: '환경영향평가법 개정안 가결', timestamp: '2025-12-02 10:30:18', nodes: 20, status: '검증완료' },
        { id: 5, hash: '0x8d4c9f2a...7e3b', type: '국정감사', data: '환경부 업무보고 - 미세먼지 저감', timestamp: '2025-12-01 09:00:29', nodes: 20, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('환경 정책')} className={`px-4 py-2 rounded text-sm ${filter === '환경 정책' ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>환경</button>
                    <button onClick={() => setFilter('근로 정책')} className={`px-4 py-2 rounded text-sm ${filter === '근로 정책' ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>노동</button>
                </div>
            </div>
            
            <div className="space-y-3">
                {filteredLogs.map(log => (
                    <div key={log.id} className="bg-white rounded-lg shadow-md p-5 border-l-4 border-emerald-500">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">{log.type}</span>
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
