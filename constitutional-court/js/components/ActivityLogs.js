const ActivityLogs = () => {
    const logs = [
        { id: 1, hash: '0x9f2a8d4c...7b3e', type: '위헌법률심판', data: '정보통신망법 제44조의2 위헌 결정 (표현의 자유 침해)', timestamp: '2025-12-05 14:00:00', nodes: 13, status: '검증완료' },
        { id: 2, hash: '0x8e3d7f9a...4c2b', type: '헌법소원', data: '공직선거법 선거권 제한 조항 합헌 결정', timestamp: '2025-12-04 11:30:00', nodes: 13, status: '검증완료' },
        { id: 3, hash: '0x7d4f8e2a...9b1c', type: '권한쟁의', data: '국회 vs 대통령 권한쟁의 심판 접수', timestamp: '2025-12-03 16:45:00', nodes: 13, status: '검증완료' },
        { id: 4, hash: '0x6c7d9f3a...8e2b', type: '헌법소원', data: '병역법 대체복무 조항 헌법불합치 결정', timestamp: '2025-12-02 10:15:00', nodes: 13, status: '검증완료' },
        { id: 5, hash: '0x5b8e7f4a...7d1c', type: '위헌법률심판', data: '낙태죄 헌법불합치 결정 (자기결정권)', timestamp: '2025-12-01 15:20:00', nodes: 13, status: '검증완료' }
    ];
    
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 OpenHash 트랜잭션 로그</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('위헌법률심판')} className={`px-4 py-2 rounded text-sm ${filter === '위헌법률심판' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>위헌심판</button>
                    <button onClick={() => setFilter('헌법소원')} className={`px-4 py-2 rounded text-sm ${filter === '헌법소원' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}>헌법소원</button>
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
