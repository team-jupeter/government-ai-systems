const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x7d3e9a4c...2f8b', type: '농산물', data: '쌀 목표가격 인상 - 80kg당 19만7천원', timestamp: '2025-12-05 10:30:22', nodes: 19, status: '검증완료' },
        { id: 2, hash: '0x4c8f2d9a...7e3b', type: '수산물', data: '불법 조업 단속 강화 - AI 감시 시스템', timestamp: '2025-12-04 14:00:47', nodes: 19, status: '검증완료' },
        { id: 3, hash: '0x9e4a7d3c...5f8b', type: '보조금', data: '청년 농업인 정착 지원금 2조원 승인', timestamp: '2025-12-03 11:15:33', nodes: 19, status: '검증완료' },
        { id: 4, hash: '0x3f7d2e8c...9a4b', type: '법안 의결', data: '농수산물 유통법 개정안 가결', timestamp: '2025-12-02 16:30:18', nodes: 19, status: '검증완료' },
        { id: 5, hash: '0x8d4c9f2a...7e3b', type: '국정감사', data: '농림부 업무보고 - 스마트팜 육성', timestamp: '2025-12-01 09:00:29', nodes: 19, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('농산물')} className={`px-4 py-2 rounded text-sm ${filter === '농산물' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>농산물</button>
                    <button onClick={() => setFilter('수산물')} className={`px-4 py-2 rounded text-sm ${filter === '수산물' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>수산물</button>
                </div>
            </div>
            
            <div className="space-y-3">
                {filteredLogs.map(log => (
                    <div key={log.id} className="bg-white rounded-lg shadow-md p-5 border-l-4 border-green-500">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">{log.type}</span>
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">✓ {log.status}</span>
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
