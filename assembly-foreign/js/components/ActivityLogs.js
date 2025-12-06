const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x4e7a9d3c...2f8b', type: '조약 비준', data: '한-미 첨단기술 협력 조약 비준 동의', timestamp: '2025-12-05 15:30:22', nodes: 18, status: '검증완료' },
        { id: 2, hash: '0x8c2f9d7a...4e3b', type: '대북 정책', data: '대북 인도적 지원 1,200만 달러 승인', timestamp: '2025-12-04 11:00:47', nodes: 18, status: '검증완료' },
        { id: 3, hash: '0x7b3e4a9d...5c8f', type: '법안 의결', data: '재외동포법 개정안 가결', timestamp: '2025-12-03 14:15:33', nodes: 18, status: '검증완료' },
        { id: 4, hash: '0x3d8f2c7e...9a4b', type: '외교 정책', data: 'ASEAN+3 정상회의 대응 전략', timestamp: '2025-12-02 10:30:18', nodes: 18, status: '검증완료' },
        { id: 5, hash: '0x9a4c8f2d...7e3b', type: '국정감사', data: '외교부 업무보고 - 다자외교 성과', timestamp: '2025-12-01 09:00:29', nodes: 18, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('조약 비준')} className={`px-4 py-2 rounded text-sm ${filter === '조약 비준' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>조약</button>
                    <button onClick={() => setFilter('대북 정책')} className={`px-4 py-2 rounded text-sm ${filter === '대북 정책' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>대북</button>
                </div>
            </div>
            
            <div className="space-y-3">
                {filteredLogs.map(log => (
                    <div key={log.id} className="bg-white rounded-lg shadow-md p-5 border-l-4 border-green-500">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">{log.type}</span>
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">✓ {log.status}</span>
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
