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
        const sampleLogs = generateSampleLogs(20);
        setLogs(sampleLogs);
    }, []);
    
    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };
    
    const filteredLogs = logs.filter(log => {
        if (filters.department !== '전체 부서' && !log.employee.department.includes(filters.department)) {
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">실시간 질병 관리 로그</h2>
                <p className="text-sm text-gray-600">
                    모든 질병관리 담당자의 국가데이터처 접근 기록과 업무 처리 내역을 실시간으로 추적합니다.
                </p>
            </div>
            
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="총 업무 처리" 
                    value={`${stats.total}건`}
                    subtitle="필터링된 결과"
                    icon="📊" 
                    color="cyan" 
                />
                <StatCard 
                    title="AI 자동 처리" 
                    value={`${stats.aiProcessed}건`}
                    subtitle={`${Math.round(stats.aiProcessed/stats.total*100)}%`}
                    icon="🤖" 
                    color="purple" 
                />
                <StatCard 
                    title="데이터 인출" 
                    value={`${stats.ndrRetrieve}건`}
                    subtitle="NDR → 질병관리청"
                    icon="📥" 
                    color="green" 
                />
                <StatCard 
                    title="데이터 저장" 
                    value={`${stats.ndrStore}건`}
                    subtitle="질병관리청 → NDR"
                    icon="📤" 
                    color="orange" 
                />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">
                        업무 활동 내역 ({filteredLogs.length}건)
                    </h3>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">실시간 업데이트</span>
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                    </div>
                </div>
                
                {filteredLogs.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <div className="text-4xl mb-4">🔍</div>
                        <p>필터 조건에 맞는 로그가 없습니다.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredLogs.map((log, index) => (
                            <LogCard key={index} log={log} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

function generateSampleLogs(count) {
    const departments = ['감염병위기대응센터 역학조사과', '감염병진단분석센터 검사관리과', '만성질환관리센터 암관리과', '국립보건연구원 감염병연구과', '검역지원국 검역관리과'];
    const names = ['김질병', '이감염', '박역학', '정검역', '최백신', '강진단', '윤방역', '한예방'];
    const positions = ['방역관', '역학조사관', '검역관', '보건연구관', '질병연구사'];
    const taskTypes = ['역학조사', '감염병신고', '예방접종', '검역검사', '진단검사'];
    const targets = ['코로나19 확진', '인플루엔자 의심', '예방접종 기록', '입국자 검역', '결핵 신고'];
    
    const logs = [];
    const now = new Date();
    
    for (let i = 0; i < count; i++) {
        const timestamp = new Date(now.getTime() - Math.random() * 3600000);
        const aiAssisted = Math.random() > 0.2;
        const operationType = Math.random() > 0.5 ? 'RETRIEVE' : 'STORE';
        
        logs.push({
            logId: `KDCA-${Date.now()}-${i}`,
            timestamp: timestamp.toISOString(),
            employee: {
                id: `EMP-KDCA-${String(i+1).padStart(3, '0')}`,
                name: names[Math.floor(Math.random() * names.length)],
                department: departments[Math.floor(Math.random() * departments.length)],
                position: positions[Math.floor(Math.random() * positions.length)],
                grade: `${Math.floor(Math.random() * 4) + 5}급`
            },
            task: {
                type: taskTypes[Math.floor(Math.random() * taskTypes.length)],
                caseNumber: `DISEASE-2025-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
                targetEntity: targets[Math.floor(Math.random() * targets.length)],
                purpose: '국민건강 보호 및 감염병 예방'
            },
            ndrOperation: {
                operationType: operationType,
                dataCategory: '감염병_관리기록',
                dataPath: `/ndr/disease/control/2025/${Math.floor(Math.random() * 1000)}`,
                recordCount: Math.floor(Math.random() * 800) + 200,
                dataSize: `${(Math.random() * 6 + 1).toFixed(1)}MB`,
                retrievedFields: ['환자정보', '역학정보', '검사결과', '접촉자추적']
            },
            openHash: {
                blockId: `BLK-0x${Math.random().toString(16).substr(2, 16)}`,
                layer: 'Layer 2 - Government',
                transactionHash: `0x${Math.random().toString(16).substr(2, 16)}`,
                verified: true,
                timestamp: timestamp.toISOString()
            },
            automation: {
                aiAssisted: aiAssisted,
                aiModel: 'DeepSeek-R1',
                aiConfidence: aiAssisted ? Math.random() * 0.25 + 0.7 : 0,
                humanApprovalRequired: aiAssisted && Math.random() > 0.4,
                approver: aiAssisted && Math.random() > 0.4 ? {
                    name: names[Math.floor(Math.random() * names.length)],
                    position: '보건연구관',
                    approvedAt: new Date(timestamp.getTime() + 300000).toISOString()
                } : null
            },
            resultData: operationType === 'STORE' ? {
                operationType: 'STORE',
                dataCategory: '감염병_대응결과',
                dataPath: `/ndr/disease/response/2025/DISEASE-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
                conclusion: `${['역학조사 완료', '격리 조치', '검사 완료', '예방접종 완료'][Math.floor(Math.random() * 4)]}`,
                storedAt: new Date(timestamp.getTime() + 600000).toISOString()
            } : null
        });
    }
    
    return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

window.ActivityLogs = ActivityLogs;
