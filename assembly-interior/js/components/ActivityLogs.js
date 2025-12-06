const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x9d4e7a3c...2f8b', type: '재난 대응', data: '경북 산불 특별재난지역 선포 의결', timestamp: '2025-12-05 09:30:22', nodes: 21, status: '검증완료' },
        { id: 2, hash: '0x3f8c2d7a...9e4b', type: '지방자치', data: '지방자치법 개정안 - 자치경찰제 확대', timestamp: '2025-12-04 14:00:47', nodes: 21, status: '검증완료' },
        { id: 3, hash: '0x7e4a9d3c...5f8b', type: '경찰 행정', data: '경찰법 개정안 - 수사권 조정', timestamp: '2025-12-03 11:15:33', nodes: 21, status: '검증완료' },
        { id: 4, hash: '0x2d8f7c4e...9a3b', type: '법안 의결', data: '재난안전법 개정안 가결', timestamp: '2025-12-02 16:30:18', nodes: 21, status: '검증완료' },
        { id: 5, hash: '0x9c4f2e8d...7a3b', type: '국정감사', data: '행안부 업무보고 - 119 출동 체계', timestamp: '2025-12-01 10:00:29', nodes: 21, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('재난 대응')} className={`px-4 py-2 rounded text-sm ${filter === '재난 대응' ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>재난</button>
                    <button onClick={() => setFilter('지방자치')} className={`px-4 py-2 rounded text-sm ${filter === '지방자치' ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>자치</button>
                </div>
            </div>
            
            <div className="space-y-3">
                {filteredLogs.map(log => (
                    <div key={log.id} className="bg-white rounded-lg shadow-md p-5 border-l-4 border-orange-500">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded-full">{log.type}</span>
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
