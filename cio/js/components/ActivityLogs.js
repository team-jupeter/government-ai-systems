const { useState, useEffect } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        department: '전체 부서',
        operationType: '전체 작업',
        dateRange: 'today',
        employee: ''
    });
    
    const [logs, setLogs] = useState([]);
    
    // 샘플 로그 데이터 생성
    useEffect(() => {
        const departments = ['수사1부', '수사2부', '수사3부', '수사4부', '디지털포렌식팀'];
        const operations = ['증거수집', '피의자조사', '영장신청', '기소장작성', '판례검색'];
        const sampleLogs = Array.from({length: 20}, (_, i) => ({
            id: `log-${i}`,
            timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
            employee: {
                name: `검사${i + 1}`,
                department: departments[Math.floor(Math.random() * departments.length)],
                position: Math.random() > 0.7 ? '부장검사' : '검사'
            },
            task: {
                type: operations[Math.floor(Math.random() * operations.length)],
                description: `사건번호 2025고단${1000 + i} 관련 ${operations[Math.floor(Math.random() * operations.length)]}`
            },
            ndrOperation: {
                operationType: Math.random() > 0.5 ? 'RETRIEVE' : 'STORE',
                dataCategory: ['금융거래내역', '통신기록', '재산정보', '공직자정보'][Math.floor(Math.random() * 4)],
                recordCount: Math.floor(Math.random() * 50) + 1
            },
            automation: {
                aiAssisted: Math.random() > 0.2,
                confidence: Math.random() > 0.2 ? (85 + Math.random() * 15).toFixed(1) : null
            },
            openhash: {
                hash: `0x${Math.random().toString(16).substr(2, 8)}...`,
                verified: true
            }
        }));
        setLogs(sampleLogs);
    }, []);
    
    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };
    
    // 필터링된 로그
    const filteredLogs = logs.filter(log => {
        if (filters.department !== '전체 부서' && log.employee.department !== filters.department) {
            return false;
        }
        if (filters.operationType !== '전체 작업' && !log.task.type.includes(filters.operationType.replace('업무', ''))) {
            return false;
        }
        if (filters.employee && !log.employee.name.includes(filters.employee)) {
            return false;
        }
        return true;
    });
    
    // 통계 계산
    const stats = {
        total: filteredLogs.length,
        aiProcessed: filteredLogs.filter(l => l.automation.aiAssisted).length,
        ndrRetrieve: filteredLogs.filter(l => l.ndrOperation.operationType === 'RETRIEVE').length,
        ndrStore: filteredLogs.filter(l => l.ndrOperation.operationType === 'STORE').length
    };
    
    return (
        <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">실시간 수사 로그</h2>
                <p className="text-sm text-gray-600">
                    모든 검사의 국가데이터처 접근 기록과 수사 처리 내역을 실시간으로 추적합니다.
                    오픈해시로 위변조가 불가능합니다.
                </p>
            </div>
            
            {/* 통계 요약 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="총 작업" 
                    value={`${stats.total}건`}
                    subtitle="오늘"
                    icon="📋" 
                    color="blue" 
                />
                <StatCard 
                    title="AI 지원" 
                    value={`${stats.aiProcessed}건`}
                    subtitle={`${((stats.aiProcessed/stats.total)*100).toFixed(1)}%`}
                    icon="🤖" 
                    color="purple" 
                />
                <StatCard 
                    title="데이터 조회" 
                    value={`${stats.ndrRetrieve}건`}
                    subtitle="국가데이터처"
                    icon="📥" 
                    color="green" 
                />
                <StatCard 
                    title="데이터 저장" 
                    value={`${stats.ndrStore}건`}
                    subtitle="국가데이터처"
                    icon="📤" 
                    color="orange" 
                />
            </div>
            
            {/* 로그 목록 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">최근 활동 내역</h3>
                <div className="space-y-3">
                    {filteredLogs.slice(0, 10).map(log => (
                        <LogCard key={log.id} log={log} />
                    ))}
                </div>
            </div>
        </div>
    );
};
window.ActivityLogs = ActivityLogs;
