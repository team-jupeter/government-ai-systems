const ActivityLogs = () => {
    const logs = [
        { id: 1, type: '회의', title: '제395회 국회(정기회) 제1차 전체회의', date: '2025-12-05 10:00', status: '완료' },
        { id: 2, type: '심사', title: '2026년도 국회 예산안 심사', date: '2025-12-04 14:00', status: '진행중' },
        { id: 3, type: '의결', title: '위원회 운영 규칙 개정안', date: '2025-12-03 15:30', status: '가결' },
        { id: 4, type: '회의', title: '소위원회 구성 협의', date: '2025-12-02 11:00', status: '완료' }
    ];

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 최근 활동</h2>
                <FilterPanel />
            </div>
            <div className="space-y-3">
                {logs.map(log => (
                    <LogCard key={log.id} log={log} />
                ))}
            </div>
        </div>
    );
};
