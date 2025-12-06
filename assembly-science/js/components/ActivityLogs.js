const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x7d3e9a4c...8f2b', type: 'R&D 과제', data: '차세대 반도체 개발 예산 2.3조원 승인', timestamp: '2025-12-05 14:00:22', nodes: 19, status: '검증완료' },
        { id: 2, hash: '0x9a4f2c8d...7e3b', type: '통신 정책', data: '6G 인프라 투자 계획 의결', timestamp: '2025-12-04 11:30:47', nodes: 19, status: '검증완료' },
        { id: 3, hash: '0x4c8e7a2d...9f3b', type: '방송 규제', data: 'OTT 서비스 공정성 가이드라인', timestamp: '2025-12-03 16:45:33', nodes: 19, status: '검증완료' },
        { id: 4, hash: '0x3b7f9e2d...4c8a', type: '법안 의결', data: '과학기술기본법 개정안 가결', timestamp: '2025-12-02 10:15:18', nodes: 19, status: '검증완료' },
        { id: 5, hash: '0x8d2c4f9a...7e3b', type: '국정감사', data: '과기정통부 R&D 예산 집행 점검', timestamp: '2025-12-01 09:00:29', nodes: 19, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-cyan-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('R&D 과제')} className={`px-4 py-2 rounded text-sm ${filter === 'R&D 과제' ? 'bg-cyan-600 text-white' : 'bg-gray-200'}`}>R&D</button>
                    <button onClick={() => setFilter('통신 정책')} className={`px-4 py-2 rounded text-sm ${filter === '통신 정책' ? 'bg-cyan-600 text-white' : 'bg-gray-200'}`}>통신</button>
                </div>
            </div>
            
            <div className="space-y-3">
                {filteredLogs.map(log => (
                    <div key={log.id} className="bg-white rounded-lg shadow-md p-5 border-l-4 border-cyan-500">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-xs font-bold rounded-full">{log.type}</span>
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
