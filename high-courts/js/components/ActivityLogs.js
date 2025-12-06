const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x7d4f8c2a...9e1b', type: '항소기각', data: '서울고법 2024나12345 손해배상 항소 기각', timestamp: '2025-12-05 15:30:00', nodes: 13, status: '검증완료' },
        { id: 2, hash: '0x9e3a7f1c...4d8b', type: '항소인용', data: '수원고법 2024나23456 계약금 항소 일부 인용', timestamp: '2025-12-04 14:20:15', nodes: 13, status: '검증완료' },
        { id: 3, hash: '0x4d8c9f2a...7e3b', type: '항소기각', data: '대전고법 2024노34567 사기 항소 기각', timestamp: '2025-12-03 11:45:30', nodes: 13, status: '검증완료' },
        { id: 4, hash: '0x7e2d4f8c...9a3b', type: '파기환송', data: '부산고법 2024나45678 부당해고 파기환송', timestamp: '2025-12-02 10:15:45', nodes: 13, status: '검증완료' },
        { id: 5, hash: '0x3f7d9e2a...8c1b', type: '항소인용', data: '광주고법 2024나56789 재산분할 항소 인용', timestamp: '2025-12-01 09:30:20', nodes: 13, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('항소기각')} className={`px-4 py-2 rounded text-sm ${filter === '항소기각' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>기각</button>
                    <button onClick={() => setFilter('항소인용')} className={`px-4 py-2 rounded text-sm ${filter === '항소인용' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>인용</button>
                </div>
            </div>
            
            <div className="space-y-3">
                {filteredLogs.map(log => (
                    <div key={log.id} className="bg-white rounded-lg shadow-md p-5 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">{log.type}</span>
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
