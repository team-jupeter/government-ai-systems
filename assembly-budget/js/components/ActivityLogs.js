const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x9d7e4a3c...8f2b', type: '예산안', data: '2025년 본예산 677조원 확정', timestamp: '2025-12-05 18:30:22', nodes: 51, status: '검증완료' },
        { id: 2, hash: '0x4c8f2d9a...7e3b', type: '결산', data: '2024년 결산 승인 - 세입 650조원', timestamp: '2025-12-04 14:00:47', nodes: 51, status: '검증완료' },
        { id: 3, hash: '0x7e9a4d3c...5f8b', type: '추경', data: '제1회 추가경정예산 12조원 의결', timestamp: '2025-12-03 11:15:33', nodes: 51, status: '검증완료' },
        { id: 4, hash: '0x3f7d2e8c...9a4b', type: '예비비', data: '예비비 3조원 지출 승인', timestamp: '2025-12-02 16:30:18', nodes: 51, status: '검증완료' },
        { id: 5, hash: '0x8d4c9f2a...7e3b', type: '심사', data: '주요 사업 예산 심사 - 신공항 건설', timestamp: '2025-12-01 10:00:29', nodes: 51, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('예산안')} className={`px-4 py-2 rounded text-sm ${filter === '예산안' ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}>예산</button>
                    <button onClick={() => setFilter('결산')} className={`px-4 py-2 rounded text-sm ${filter === '결산' ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}>결산</button>
                </div>
            </div>
            
            <div className="space-y-3">
                {filteredLogs.map(log => (
                    <div key={log.id} className="bg-white rounded-lg shadow-md p-5 border-l-4 border-amber-500">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">{log.type}</span>
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
