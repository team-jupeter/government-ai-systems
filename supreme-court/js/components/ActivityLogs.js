const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x9d7e4a3c...8f2b', type: '판결', data: '2024다12345 손해배상 상고 기각', timestamp: '2025-12-05 14:00:00', nodes: 15, status: '검증완료' },
        { id: 2, hash: '0x4c8f2d9a...7e3b', type: '결정', data: '2024마5678 가처분 신청 인용', timestamp: '2025-12-04 11:30:22', nodes: 15, status: '검증완료' },
        { id: 3, hash: '0x7e9a4d3c...5f8b', type: '판결', data: '2024도9012 특정경제범죄 상고 기각', timestamp: '2025-12-03 10:00:47', nodes: 15, status: '검증완료' },
        { id: 4, hash: '0x3f7d2e8c...9a4b', type: '전원합의체', data: '헌법 해석 - 재산권 제한 기준', timestamp: '2025-12-02 14:00:18', nodes: 15, status: '검증완료' },
        { id: 5, hash: '0x8d4c9f2a...7e3b', type: '판결', data: '2024두3456 행정처분 취소 상고 기각', timestamp: '2025-12-01 09:30:29', nodes: 15, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('판결')} className={`px-4 py-2 rounded text-sm ${filter === '판결' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>판결</button>
                    <button onClick={() => setFilter('전원합의체')} className={`px-4 py-2 rounded text-sm ${filter === '전원합의체' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>전원합의체</button>
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
        </div>
    );
};
