const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x9d4e7a3c...8f2b', type: '예산안', data: '2025년 정부 예산안 심사 (677조원)', timestamp: '2025-12-05 14:00:22', nodes: 28, status: '검증완료' },
        { id: 2, hash: '0x3f8c2d9a...7e4b', type: '세제 개편', data: '소득세법 개정안 - 과세표준 조정', timestamp: '2025-12-04 11:30:47', nodes: 28, status: '검증완료' },
        { id: 3, hash: '0x7b3e9f4d...2c8a', type: '통화정책', data: '한국은행 기준금리 동결 (3.5%)', timestamp: '2025-12-03 16:45:33', nodes: 28, status: '검증완료' },
        { id: 4, hash: '0x2e9d4c7f...5a3b', type: '법안 의결', data: '국가재정법 개정안 가결', timestamp: '2025-12-02 10:15:18', nodes: 28, status: '검증완료' },
        { id: 5, hash: '0x8f2c7e4a...9d3b', type: '국정감사', data: '기획재정부 업무보고', timestamp: '2025-12-01 09:00:29', nodes: 28, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('예산안')} className={`px-4 py-2 rounded text-sm ${filter === '예산안' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>예산안</button>
                    <button onClick={() => setFilter('세제 개편')} className={`px-4 py-2 rounded text-sm ${filter === '세제 개편' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>세제</button>
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
