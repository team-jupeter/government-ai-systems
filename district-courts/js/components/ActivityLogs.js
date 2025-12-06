const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x3f7e9d2a...8c4b', type: '민사', data: '서울중앙지법 2024가단123456 대여금 청구 원고 승소', timestamp: '2025-12-05 16:45:00', nodes: 18, status: '검증완료' },
        { id: 2, hash: '0x8c4d9f3a...7e2b', type: '형사', data: '수원지법 2024고단234567 사기 징역 2년', timestamp: '2025-12-04 15:30:22', nodes: 18, status: '검증완료' },
        { id: 3, hash: '0x7e2d4f9c...8a3b', type: '행정', data: '대전지법 2024구단345678 과세처분 취소 원고 일부 승소', timestamp: '2025-12-03 14:20:47', nodes: 18, status: '검증완료' },
        { id: 4, hash: '0x9a3f7d2e...8c1b', type: '가사', data: '부산가정법원 2024드단456789 이혼 청구 인용', timestamp: '2025-12-02 11:15:18', nodes: 18, status: '검증완료' },
        { id: 5, hash: '0x4d8c9f2a...7e3b', type: '민사', data: '광주지법 2024가합567890 손해배상 피고 승소', timestamp: '2025-12-01 10:30:29', nodes: 18, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('민사')} className={`px-4 py-2 rounded text-sm ${filter === '민사' ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>민사</button>
                    <button onClick={() => setFilter('형사')} className={`px-4 py-2 rounded text-sm ${filter === '형사' ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>형사</button>
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
