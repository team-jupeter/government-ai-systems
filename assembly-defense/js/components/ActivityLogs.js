const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x7d9a4e3c...8f2b', type: '무기 도입', data: 'KF-21 전투기 120대 도입 계획 승인 (8.2조원)', timestamp: '2025-12-05 14:30:22', nodes: 19, status: '검증완료' },
        { id: 2, hash: '0x4c8f2d9a...7e3b', type: '국방 예산', data: '2025년 국방예산 57조원 심사 완료', timestamp: '2025-12-04 11:00:47', nodes: 19, status: '검증완료' },
        { id: 3, hash: '0x9e3a7d4c...5f8b', type: '병력 관리', data: '병역법 개정안 - 복무 기간 18개월로 단축', timestamp: '2025-12-03 16:15:33', nodes: 19, status: '검증완료' },
        { id: 4, hash: '0x3f7d2e8c...9a4b', type: '법안 의결', data: '군사기밀보호법 개정안 가결', timestamp: '2025-12-02 10:30:18', nodes: 19, status: '검증완료' },
        { id: 5, hash: '0x8d4c9f2a...7e3b', type: '국정감사', data: '국방부 업무보고 - 한미연합훈련', timestamp: '2025-12-01 09:00:29', nodes: 19, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('무기 도입')} className={`px-4 py-2 rounded text-sm ${filter === '무기 도입' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}>무기</button>
                    <button onClick={() => setFilter('국방 예산')} className={`px-4 py-2 rounded text-sm ${filter === '국방 예산' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}>예산</button>
                </div>
            </div>
            
            <div className="space-y-3">
                {filteredLogs.map(log => (
                    <div key={log.id} className="bg-white rounded-lg shadow-md p-5 border-l-4 border-red-500">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">{log.type}</span>
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
