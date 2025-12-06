const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x4e9a7d3c...8f2b', type: '문화 예산', data: '한국영화 진흥 예산 2,400억원 승인', timestamp: '2025-12-05 14:30:22', nodes: 17, status: '검증완료' },
        { id: 2, hash: '0x8c3f2d9a...7e4b', type: '저작권', data: 'AI 창작물 저작권법 개정안 가결', timestamp: '2025-12-04 11:00:47', nodes: 17, status: '검증완료' },
        { id: 3, hash: '0x7b4e9a2d...5c8f', type: '체육 정책', data: '2030 월드컵 유치 지원 예산 의결', timestamp: '2025-12-03 16:15:33', nodes: 17, status: '검증완료' },
        { id: 4, hash: '0x2e8d4c7f...9a3b', type: '법안 의결', data: '관광진흥법 개정안 - K-관광 활성화', timestamp: '2025-12-02 10:30:18', nodes: 17, status: '검증완료' },
        { id: 5, hash: '0x9f3c8e2d...4a7b', type: '국정감사', data: '문체부 업무보고 - 한류 콘텐츠 수출', timestamp: '2025-12-01 09:00:29', nodes: 17, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-fuchsia-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('문화 예산')} className={`px-4 py-2 rounded text-sm ${filter === '문화 예산' ? 'bg-fuchsia-600 text-white' : 'bg-gray-200'}`}>문화</button>
                    <button onClick={() => setFilter('저작권')} className={`px-4 py-2 rounded text-sm ${filter === '저작권' ? 'bg-fuchsia-600 text-white' : 'bg-gray-200'}`}>저작권</button>
                </div>
            </div>
            
            <div className="space-y-3">
                {filteredLogs.map(log => (
                    <div key={log.id} className="bg-white rounded-lg shadow-md p-5 border-l-4 border-fuchsia-500">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-800 text-xs font-bold rounded-full">{log.type}</span>
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
