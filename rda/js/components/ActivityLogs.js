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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">실시간 농업연구 로그</h2>
                <p className="text-sm text-gray-600">
                    모든 연구원의 국가데이터처 접근 기록과 연구 활동 내역을 실시간으로 추적합니다.
                </p>
            </div>
            
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="총 연구 활동" 
                    value={`${stats.total}건`}
                    subtitle="필터링된 결과"
                    icon="📊" 
                    color="green" 
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
                    subtitle="NDR → 농촌진흥청"
                    icon="📥" 
                    color="green" 
                />
                <StatCard 
                    title="데이터 저장" 
                    value={`${stats.ndrStore}건`}
                    subtitle="농촌진흥청 → NDR"
                    icon="📤" 
                    color="orange" 
                />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">
                        연구 활동 내역 ({filteredLogs.length}건)
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
    const departments = ['국립식량과학원 작물연구부', '국립원예특작과학원 채소연구부', '국립축산과학원 가축연구부', '국립농업과학원 토양비료과', '기술협력국 지도정책과'];
    const names = ['김농업', '이연구', '박품종', '정기술', '최개발', '강보급', '윤육종', '한실험'];
    const positions = ['농업연구사', '농업연구관', '농촌지도사', '농촌지도관', '기술사무관'];
    const taskTypes = ['품종개발', '재배시험', '토양분석', '병해충연구', '기술지도'];
    const targets = ['벼 신품종', '토마토 재배', '한우 사육', '토양 개량', '스마트팜'];
    
    const logs = [];
    const now = new Date();
    
    for (let i = 0; i < count; i++) {
        const timestamp = new Date(now.getTime() - Math.random() * 3600000);
        const aiAssisted = Math.random() > 0.25;
        const operationType = Math.random() > 0.5 ? 'RETRIEVE' : 'STORE';
        
        logs.push({
            logId: `RDA-${Date.now()}-${i}`,
            timestamp: timestamp.toISOString(),
            employee: {
                id: `EMP-RDA-${String(i+1).padStart(3, '0')}`,
                name: names[Math.floor(Math.random() * names.length)],
                department: departments[Math.floor(Math.random() * departments.length)],
                position: positions[Math.floor(Math.random() * positions.length)],
                grade: `${Math.floor(Math.random() * 4) + 5}급`
            },
            task: {
                type: taskTypes[Math.floor(Math.random() * taskTypes.length)],
                caseNumber: `RESEARCH-2025-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
                targetEntity: targets[Math.floor(Math.random() * targets.length)],
                purpose: '농업기술 향상 및 농가 소득 증대'
            },
            ndrOperation: {
                operationType: operationType,
                dataCategory: '농업연구_데이터',
                dataPath: `/ndr/agriculture/research/2025/${Math.floor(Math.random() * 1000)}`,
                recordCount: Math.floor(Math.random() * 500) + 100,
                dataSize: `${(Math.random() * 5 + 1).toFixed(1)}MB`,
                retrievedFields: ['품종정보', '재배데이터', '수확량', '병해충기록']
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
                    position: '농업연구관',
                    approvedAt: new Date(timestamp.getTime() + 300000).toISOString()
                } : null
            },
            resultData: operationType === 'STORE' ? {
                operationType: 'STORE',
                dataCategory: '연구_성과',
                dataPath: `/ndr/agriculture/results/2025/RESEARCH-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
                conclusion: `${['품종개발 완료', '재배시험 성공', '기술보급 등록', '특허출원 완료'][Math.floor(Math.random() * 4)]}`,
                storedAt: new Date(timestamp.getTime() + 600000).toISOString()
            } : null
        });
    }
    
    return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

window.ActivityLogs = ActivityLogs;
