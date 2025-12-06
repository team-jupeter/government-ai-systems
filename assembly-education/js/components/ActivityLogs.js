const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x4e9a7d3c...2f8b', type: '법안 의결', data: '초·중등교육법 개정안 - AI 교육 의무화', timestamp: '2025-12-05 14:30:22', nodes: 19, status: '검증완료' },
        { id: 2, hash: '0x8c3f2d9a...7b4e', type: '학생 보호', data: '9.2M 학생 개인정보 OpenHash 마이그레이션', timestamp: '2025-12-04 10:15:47', nodes: 19, status: '검증완료' },
        { id: 3, hash: '0x7b4e9a2d...5c8f', type: '교육과정', data: '2025 개정 교육과정 검정 완료', timestamp: '2025-12-03 16:00:33', nodes: 19, status: '검증완료' },
        { id: 4, hash: '0x2e8d4c7f...9a3b', type: '예산 심사', data: '학교 무상급식 예산 47조원 승인', timestamp: '2025-12-02 11:45:18', nodes: 19, status: '검증완료' },
        { id: 5, hash: '0x9f3c8e2d...4a7b', type: '국정감사', data: '교육부 업무보고 - 사교육비 절감 대책', timestamp: '2025-12-01 09:30:29', nodes: 19, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('학생 보호')} className={`px-4 py-2 rounded text-sm ${filter === '학생 보호' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>학생보호</button>
                    <button onClick={() => setFilter('법안 의결')} className={`px-4 py-2 rounded text-sm ${filter === '법안 의결' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>법안</button>
                </div>
            </div>
            
            <div className="space-y-3">
                {filteredLogs.map(log => (
                    <div key={log.id} className="bg-white rounded-lg shadow-md p-5 border-l-4 border-purple-500">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">{log.type}</span>
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
