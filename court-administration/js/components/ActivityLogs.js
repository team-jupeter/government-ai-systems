const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x8d4f9c2a...7e3b', type: '예산', data: '2025년도 법원 예산안 편성 완료 (3.2조원)', timestamp: '2025-12-05 10:00:00', nodes: 10, status: '검증완료' },
        { id: 2, hash: '0x7e3d4f8c...9a2b', type: '인사', data: '판사 정기인사 발령 (327명)', timestamp: '2025-12-04 09:30:15', nodes: 10, status: '검증완료' },
        { id: 3, hash: '0x9a2d7f4c...8e1b', type: '통계', data: '11월 사법통계 월보 발간', timestamp: '2025-12-03 14:20:30', nodes: 10, status: '검증완료' },
        { id: 4, hash: '0x8e1f9d2a...4c3b', type: '시설', data: '서울중앙지법 청사 보수공사 계약', timestamp: '2025-12-02 11:45:45', nodes: 10, status: '검증완료' },
        { id: 5, hash: '0x4c7d8f2a...9e1b', type: 'IT', data: '전자소송 시스템 업그레이드 완료', timestamp: '2025-12-01 16:15:20', nodes: 10, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('예산')} className={`px-4 py-2 rounded text-sm ${filter === '예산' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>예산</button>
                    <button onClick={() => setFilter('인사')} className={`px-4 py-2 rounded text-sm ${filter === '인사' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>인사</button>
                </div>
            </div>
            
            <div className="space-y-3">
                {filteredLogs.map(log => (
                    <div key={log.id} className="bg-white rounded-lg shadow-md p-5 border-l-4 border-teal-500">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs font-bold rounded-full">{log.type}</span>
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
