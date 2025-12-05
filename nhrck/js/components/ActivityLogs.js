const { useState, useEffect } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        department: '전체 부서',
        operationType: '전체 작업',
        dateRange: 'today',
        employee: ''
    });
    
    const [logs, setLogs] = useState([]);
    
    useEffect(() => {
        const departments = ['침해구제국', '차별시정국', '정책교육국', '장애인차별조사과', '인권상담조정센터'];
        const operations = ['진정접수', '사례분석', '조사진행', '권고작성', '결정통보'];
        const sampleLogs = Array.from({length: 20}, (_, i) => ({
            id: `log-${i}`,
            timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
            employee: {
                name: `조사관${i + 1}`,
                department: departments[Math.floor(Math.random() * departments.length)],
                position: Math.random() > 0.7 ? '팀장' : '조사관'
            },
            task: {
                type: operations[Math.floor(Math.random() * operations.length)],
                description: `진정번호 2025진정${1000 + i} 관련 ${operations[Math.floor(Math.random() * operations.length)]}`
            },
            ndrOperation: {
                operationType: Math.random() > 0.5 ? 'RETRIEVE' : 'STORE',
                dataCategory: ['판례정보', '결정례', '인권통계', '국제조약'][Math.floor(Math.random() * 4)],
                recordCount: Math.floor(Math.random() * 30) + 1
            },
            automation: {
                aiAssisted: Math.random() > 0.15,
                confidence: Math.random() > 0.15 ? (88 + Math.random() * 12).toFixed(1) : null
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
    
    const stats = {
        total: filteredLogs.length,
        aiProcessed: filteredLogs.filter(l => l.automation.aiAssisted).length,
        ndrRetrieve: filteredLogs.filter(l => l.ndrOperation.operationType === 'RETRIEVE').length,
        ndrStore: filteredLogs.filter(l => l.ndrOperation.operationType === 'STORE').length
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">실시간 진정 처리 로그</h2>
                <p className="text-sm text-gray-600">
                    모든 직원의 국가데이터처 접근 기록과 진정 처리 내역을 실시간으로 추적합니다.
                    오픈해시로 위변조가 불가능합니다.
                </p>
            </div>
            
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
