const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x3f8a2e9d...4b7c', type: '체계자구', data: '코로나19 예방접종 피해보상 특별법 외 31건', timestamp: '2025-12-05 15:30:22', nodes: 24, status: '검증완료' },
        { id: 2, hash: '0x7c4b9a1e...6d3f', type: '법안 의결', data: '헌법재판소법 개정안 가결', timestamp: '2025-12-04 10:15:47', nodes: 24, status: '검증완료' },
        { id: 3, hash: '0x2e9f7d4a...8c1b', type: '청문회', data: '조희대 대법원장 사법부 개입 의혹', timestamp: '2025-12-03 14:45:33', nodes: 24, status: '검증완료' },
        { id: 4, hash: '0x9a5c3d8f...2e7b', type: '법안 의결', data: '12·29여객기참사 특별법', timestamp: '2025-12-02 11:22:18', nodes: 24, status: '검증완료' },
        { id: 5, hash: '0x4d7e2a9c...5f8a', type: '위헌 차단', data: '기본권 침해 소지 법안 반려', timestamp: '2025-12-01 16:50:29', nodes: 24, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('체계자구')} className={`px-4 py-2 rounded text-sm ${filter === '체계자구' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>체계자구</button>
                    <button onClick={() => setFilter('법안 의결')} className={`px-4 py-2 rounded text-sm ${filter === '법안 의결' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>법안</button>
                </div>
            </div>
            
            <div className="space-y-3">
                {filteredLogs.map(log => (
                    <div key={log.id} className="bg-white rounded-lg shadow-md p-5 border-l-4 border-purple-500">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">{log.type}</span>
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
            
            <div className="bg-purple-50 border-l-4 border-purple-600 p-4 mt-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 체계·자구 심사:</strong> 모든 상임위 통과 법안은 법사위 체계·자구 심사를 거쳐야 하며, OpenHash로 수정 이력이 영구 보존됩니다.
                </p>
            </div>
        </div>
    );
};
