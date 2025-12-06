const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x9d7e4a3c...8f2b', type: '예산 분석', data: '2025년 본예산 677조원 분석 보고서', timestamp: '2025-12-05 14:30:22', nodes: 6, status: '검증완료' },
        { id: 2, hash: '0x4c8f2d9a...7e3b', type: '결산 검토', data: '2024년 결산 650조원 적정성 평가', timestamp: '2025-12-04 11:00:47', nodes: 6, status: '검증완료' },
        { id: 3, hash: '0x7e9a4d3c...5f8b', type: '재정 전망', data: '중장기 재정 전망 2025-2029', timestamp: '2025-12-03 16:15:33', nodes: 6, status: '검증완료' },
        { id: 4, hash: '0x3f7d2e8c...9a4b', type: '법안 추계', data: '저출산 대책 법안 재정 영향 3.2조원', timestamp: '2025-12-02 10:30:18', nodes: 6, status: '검증완료' },
        { id: 5, hash: '0x8d4c9f2a...7e3b', type: '사업 평가', data: 'SOC 사업 타당성 평가 147건', timestamp: '2025-12-01 09:00:29', nodes: 6, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('예산 분석')} className={`px-4 py-2 rounded text-sm ${filter === '예산 분석' ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}>예산분석</button>
                    <button onClick={() => setFilter('재정 전망')} className={`px-4 py-2 rounded text-sm ${filter === '재정 전망' ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}>재정전망</button>
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
