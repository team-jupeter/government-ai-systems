const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x4e7a9d3c...8f2b', type: '정보 활동', data: '대북 정보 수집 활동 승인 (기밀)', timestamp: '2025-12-05 14:30:22', nodes: 14, status: '검증완료' },
        { id: 2, hash: '0x8c2f9d7a...4e3b', type: '예산 심사', data: '국정원 예산 7.2조원 승인', timestamp: '2025-12-04 11:00:47', nodes: 14, status: '검증완료' },
        { id: 3, hash: '0x7e4a9d2c...5f8b', type: '사이버 안보', data: '사이버안보법 개정안 - AI 방어 강화', timestamp: '2025-12-03 16:15:33', nodes: 14, status: '검증완료' },
        { id: 4, hash: '0x3f7d8e2c...9a4b', type: '법안 의결', data: '국가정보원법 개정안 가결', timestamp: '2025-12-02 10:30:18', nodes: 14, status: '검증완료' },
        { id: 5, hash: '0x9d4c8f2a...7e3b', type: '국정감사', data: '국정원 업무보고 (비공개)', timestamp: '2025-12-01 09:00:29', nodes: 14, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('정보 활동')} className={`px-4 py-2 rounded text-sm ${filter === '정보 활동' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>정보</button>
                    <button onClick={() => setFilter('사이버 안보')} className={`px-4 py-2 rounded text-sm ${filter === '사이버 안보' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>사이버</button>
                </div>
            </div>
            
            <div className="space-y-3">
                {filteredLogs.map(log => (
                    <div key={log.id} className="bg-white rounded-lg shadow-md p-5 border-l-4 border-indigo-500">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full">{log.type}</span>
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
