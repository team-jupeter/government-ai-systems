const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x4e7a9d3c...8f2b', type: '징계', data: 'A의원 품위유지 위반 - 경고 처분', timestamp: '2025-12-05 14:30:22', nodes: 15, status: '검증완료' },
        { id: 2, hash: '0x8c2f9d7a...4e3b', type: '재산신고', data: 'B의원 재산 변동 조사 - 적법', timestamp: '2025-12-04 11:00:47', nodes: 15, status: '검증완료' },
        { id: 3, hash: '0x7e4a9d2c...5f8b', type: '이해충돌', data: 'C의원 이해충돌 방지법 위반 조사', timestamp: '2025-12-03 16:15:33', nodes: 15, status: '검증완료' },
        { id: 4, hash: '0x3f7d8e2c...9a4b', type: '윤리강령', data: '국회의원 윤리강령 개정안 의결', timestamp: '2025-12-02 10:30:18', nodes: 15, status: '검증완료' },
        { id: 5, hash: '0x9d4c8f2a...7e3b', type: '심사', data: 'D의원 비위 제보 조사 착수', timestamp: '2025-12-01 09:00:29', nodes: 15, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-violet-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('징계')} className={`px-4 py-2 rounded text-sm ${filter === '징계' ? 'bg-violet-600 text-white' : 'bg-gray-200'}`}>징계</button>
                    <button onClick={() => setFilter('재산신고')} className={`px-4 py-2 rounded text-sm ${filter === '재산신고' ? 'bg-violet-600 text-white' : 'bg-gray-200'}`}>재산</button>
                </div>
            </div>
            
            <div className="space-y-3">
                {filteredLogs.map(log => (
                    <div key={log.id} className="bg-white rounded-lg shadow-md p-5 border-l-4 border-violet-500">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-violet-100 text-violet-800 text-xs font-bold rounded-full">{log.type}</span>
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
