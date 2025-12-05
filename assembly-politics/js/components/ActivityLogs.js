const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x8c3f7a2d...9e4b', type: '금융감독', data: '금융소비자보호법 개정안 - 불완전판매 제재 강화', timestamp: '2025-12-05 10:00:22', nodes: 31, status: '검증완료' },
        { id: 2, hash: '0x4d9e8b1c...7f3a', type: '공정거래', data: '대형 플랫폼 담합 의혹 조사 착수', timestamp: '2025-12-04 14:30:47', nodes: 31, status: '검증완료' },
        { id: 3, hash: '0x7b2a5f9d...4c8e', type: '법안 의결', data: '공정거래법 개정안 - 과징금 상한 인상', timestamp: '2025-12-03 15:00:33', nodes: 31, status: '검증완료' },
        { id: 4, hash: '0x3e8d7c4a...2b9f', type: '개인정보', data: '개인정보 유출 사고 대응 체계 점검', timestamp: '2025-12-02 11:00:18', nodes: 31, status: '검증완료' },
        { id: 5, hash: '0x9f4c2e8d...5a7b', type: '국정감사', data: '금융위원회 업무보고 및 질의응답', timestamp: '2025-11-30 10:00:29', nodes: 31, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('금융감독')} className={`px-4 py-2 rounded text-sm ${filter === '금융감독' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>금융감독</button>
                    <button onClick={() => setFilter('공정거래')} className={`px-4 py-2 rounded text-sm ${filter === '공정거래' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>공정거래</button>
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
