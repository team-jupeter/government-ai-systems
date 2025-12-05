const ActivityLogs = () => {
    const logs = [
        { id: 1, type: '법안 심사', title: '금융소비자보호법 개정안 - 불완전판매 제재 강화', date: '2025-12-05 10:00', status: '가결' },
        { id: 2, type: '공정거래', title: '대형 플랫폼 담합 의혹 조사 요구', date: '2025-12-04 14:30', status: '진행중' },
        { id: 3, type: '금융감독', title: '증권사 내부통제 강화 방안 논의', date: '2025-12-03 15:00', status: '의결' },
        { id: 4, type: '개인정보', title: '개인정보 유출 사고 대응 체계 점검', date: '2025-12-02 11:00', status: '완료' },
        { id: 5, type: '법안 의결', title: '공정거래법 개정안 - 과징금 상한 인상', date: '2025-12-01 16:00', status: '가결' },
        { id: 6, type: '국정감사', title: '금융위원회 업무보고 및 질의응답', date: '2025-11-30 10:00', status: '완료' }
    ];
    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 정무위원회 최근 활동</h2>
                <div className="flex gap-2">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-sm ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>전체</button>
                    <button onClick={() => setFilter('금융감독')} className={`px-4 py-2 rounded text-sm ${filter === '금융감독' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>금융감독</button>
                    <button onClick={() => setFilter('공정거래')} className={`px-4 py-2 rounded text-sm ${filter === '공정거래' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>공정거래</button>
                </div>
            </div>
            <div className="space-y-3">
                {filteredLogs.map(log => (
                    <div key={log.id} className="bg-white rounded-lg shadow-md p-5">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">{log.type}</span>
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">{log.status}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{log.title}</h3>
                        <p className="text-xs text-gray-500">{log.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
