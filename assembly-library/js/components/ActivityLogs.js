const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x4e7a9d3c...8f2b', type: '자료 제공', data: '의원 연구실 입법 자료 387건 제공', timestamp: '2025-12-05 14:30:22', nodes: 5, status: '검증완료' },
        { id: 2, hash: '0x8c2f9d7a...7e3b', type: '디지털화', data: '고문헌 1,247권 스캔 완료', timestamp: '2025-12-04 11:00:47', nodes: 5, status: '검증완료' },
        { id: 3, hash: '0x7e4a9d2c...5f8b', type: '입법 동향', data: '주요국 AI 규제 입법례 비교 보고서', timestamp: '2025-12-03 16:15:33', nodes: 5, status: '검증완료' },
        { id: 4, hash: '0x3f7d8e2c...9a4b', type: '국제 협력', data: '미 의회도서관 자료 교환 협약', timestamp: '2025-12-02 10:30:18', nodes: 5, status: '검증완료' },
        { id: 5, hash: '0x9d4c8f2a...7e3b', type: '장서 확충', data: '신간 도서 2,847권 등록', timestamp: '2025-12-01 09:00:29', nodes: 5, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('자료 제공')} className={`px-4 py-2 rounded text-sm ${filter === '자료 제공' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>자료제공</button>
                    <button onClick={() => setFilter('입법 동향')} className={`px-4 py-2 rounded text-sm ${filter === '입법 동향' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>입법동향</button>
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
