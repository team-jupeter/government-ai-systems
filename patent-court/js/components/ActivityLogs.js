const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x4f8d9c2a...7e3b', type: '심결취소', data: '2024허1234 특허무효심판 심결취소소송 청구 인용', timestamp: '2025-12-05 14:30:00', nodes: 5, status: '검증완료' },
        { id: 2, hash: '0x7e3d4f9c...8a2b', type: '침해소송', data: '2024나2345 특허침해금지 항소 기각', timestamp: '2025-12-04 11:20:15', nodes: 5, status: '검증완료' },
        { id: 3, hash: '0x8a2d7f4c...9e1b', type: '심결취소', data: '2024허3456 상표등록무효 심결취소소송 청구 기각', timestamp: '2025-12-03 10:45:30', nodes: 5, status: '검증완료' },
        { id: 4, hash: '0x9e1f8d2a...4c3b', type: '침해소송', data: '2024나4567 디자인권 침해 항소 일부 인용', timestamp: '2025-12-02 09:15:45', nodes: 5, status: '검증완료' },
        { id: 5, hash: '0x3c7d9f2a...8e1b', type: '심결취소', data: '2024허5678 특허거절결정 심결취소소송 청구 인용', timestamp: '2025-12-01 15:30:20', nodes: 5, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('심결취소')} className={`px-4 py-2 rounded text-sm ${filter === '심결취소' ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>심결취소</button>
                    <button onClick={() => setFilter('침해소송')} className={`px-4 py-2 rounded text-sm ${filter === '침해소송' ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>침해소송</button>
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
