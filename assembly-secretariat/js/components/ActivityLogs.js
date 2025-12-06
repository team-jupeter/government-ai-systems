const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x9d7e4a3c...8f2b', type: '본회의', data: '제417회 국회 정기회 개회 - 의사록 생성', timestamp: '2025-12-05 10:00:00', nodes: 8, status: '검증완료' },
        { id: 2, hash: '0x4c8f2d9a...7e3b', type: '위원회', data: '기획재정위원회 전체회의 - 의사록 생성', timestamp: '2025-12-04 14:30:22', nodes: 8, status: '검증완료' },
        { id: 3, hash: '0x7e9a4d3c...5f8b', type: '시설관리', data: '국회의사당 냉난방 시스템 점검', timestamp: '2025-12-03 09:15:33', nodes: 8, status: '검증완료' },
        { id: 4, hash: '0x3f7d2e8c...9a4b', type: '의원지원', data: '신규 의원 300명 비서관 배정 완료', timestamp: '2025-12-02 16:00:18', nodes: 8, status: '검증완료' },
        { id: 5, hash: '0x8d4c9f2a...7e3b', type: '문서관리', data: '의사록 47.3M건 디지털화 완료', timestamp: '2025-12-01 11:20:29', nodes: 8, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('본회의')} className={`px-4 py-2 rounded text-sm ${filter === '본회의' ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>본회의</button>
                    <button onClick={() => setFilter('위원회')} className={`px-4 py-2 rounded text-sm ${filter === '위원회' ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>위원회</button>
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
