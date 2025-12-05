const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x7a4f9e2b...3c8d', type: '의안 통과', data: '22대 국회 운영규칙 개정안', timestamp: '2025-12-05 14:23:17', nodes: 24, status: '검증완료' },
        { id: 2, hash: '0x9b3e7a1c...5f2a', type: '예산 심사', data: '국회사무처 추경 승인', timestamp: '2025-12-04 11:45:32', nodes: 24, status: '검증완료' },
        { id: 3, hash: '0x4d8c2f9a...7b1e', type: '인사 동의', data: '헌법재판관 임명동의안', timestamp: '2025-12-03 16:12:08', nodes: 24, status: '검증완료' },
        { id: 4, hash: '0x6e1a4b7c...9d3f', type: '의결', data: '본회의 일정 조정', timestamp: '2025-12-02 09:34:51', nodes: 24, status: '검증완료' },
        { id: 5, hash: '0x2c9f5d8a...4e6b', type: '위원 변경', data: '상임위 위원 교체', timestamp: '2025-12-01 13:22:44', nodes: 24, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('의안 통과')} className={`px-4 py-2 rounded text-sm ${filter === '의안 통과' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>의안</button>
                    <button onClick={() => setFilter('예산 심사')} className={`px-4 py-2 rounded text-sm ${filter === '예산 심사' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>예산</button>
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
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mt-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 실시간 동기화:</strong> 모든 트랜잭션은 24개 노드에 0.6초 이내 전파되며, CRYSTALS-Dilithium 서명으로 검증됩니다.
                </p>
            </div>
        </div>
    );
};
