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
        const sampleLogs = generateSampleLogs(20);
        setLogs(sampleLogs);
    }, []);
    
    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };
    
    // 필터링된 로그
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">실시간 업무 로그</h2>
                <p className="text-sm text-gray-600">
                    모든 직원의 국가데이터처 접근 기록과 업무 처리 내역을 실시간으로 추적합니다.
                    오픈해시로 위변조가 불가능합니다.
                </p>
            </div>
            
            {/* 필터 패널 */}
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
            
            {/* 통계 요약 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="총 업무 처리" 
                    value={`${stats.total}건`}
                    subtitle="필터링된 결과"
                    icon="📊" 
                    color="blue" 
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
                    subtitle="NDR → 방미통위"
                    icon="📥" 
                    color="green" 
                />
                <StatCard 
                    title="데이터 저장" 
                    value={`${stats.ndrStore}건`}
                    subtitle="방미통위 → NDR"
                    icon="📤" 
                    color="orange" 
                />
            </div>
            
            {/* 로그 스트림 */}
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

// 샘플 로그 생성 함수
function generateSampleLogs(count) {
    const departments = ['방송정책국', '미디어정책국', '통신정책국', '시장조사국', '방송광고정책과', '기획조정실'];
    const names = ['홍길동', '김철수', '이영희', '박민수', '정지은', '최동욱', '강미라', '윤서준'];
    const positions = ['사무관', '국장', '과장', '심의관', '전산관리자'];
    const taskTypes = ['방송심의', '통신민원', '미디어정책', '시장조사', '광고심의'];
    const targets = ['KBS', 'MBC 드라마', 'SKT 고객', 'LG유플러스', 'OTT 플랫폼', '민원인 김OO', 'CJ ENM'];
    
    const logs = [];
    const now = new Date();
    
    for (let i = 0; i < count; i++) {
        const timestamp = new Date(now.getTime() - Math.random() * 3600000);
        const aiAssisted = Math.random() > 0.2;
        const operationType = Math.random() > 0.5 ? 'RETRIEVE' : 'STORE';
        
        logs.push({
            logId: `KMCC-${Date.now()}-${i}`,
            timestamp: timestamp.toISOString(),
            employee: {
                id: `EMP-KMCC-${String(i+1).padStart(3, '0')}`,
                name: names[Math.floor(Math.random() * names.length)],
                department: departments[Math.floor(Math.random() * departments.length)],
                position: positions[Math.floor(Math.random() * positions.length)],
                grade: `${Math.floor(Math.random() * 3) + 5}급`
            },
            task: {
                type: taskTypes[Math.floor(Math.random() * taskTypes.length)],
                caseNumber: `CASE-2025-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
                targetEntity: targets[Math.floor(Math.random() * targets.length)],
                purpose: '정기 심의 및 조사'
            },
            ndrOperation: {
                operationType: operationType,
                dataCategory: ['방송심의_기록', '통신민원_내역', '시청률_데이터', '통신품질_지표'][Math.floor(Math.random() * 4)],
                dataPath: `/ndr/broadcasting/審의/${Math.floor(Math.random() * 1000)}`,
                recordCount: Math.floor(Math.random() * 200) + 30,
                dataSize: `${(Math.random() * 3 + 0.3).toFixed(1)}MB`,
                retrievedFields: ['방송내용', '심의기준', '처리결과', '민원내용']
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
                humanApprovalRequired: aiAssisted && Math.random() > 0.3,
                approver: aiAssisted && Math.random() > 0.3 ? {
                    name: names[Math.floor(Math.random() * names.length)],
                    position: '국장',
                    approvedAt: new Date(timestamp.getTime() + 300000).toISOString()
                } : null
            },
            resultData: operationType === 'STORE' ? {
                operationType: 'STORE',
                dataCategory: ['심의_결과', '민원_처리결과', '정책_분석보고서'][Math.floor(Math.random() * 3)],
                dataPath: `/ndr/results/2025/CASE-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
                conclusion: ['적정 방송으로 판단', '경고 조치', '주의 권고', '민원 승인', '정책 개선 권고'][Math.floor(Math.random() * 5)],
                storedAt: new Date(timestamp.getTime() + 600000).toISOString()
            } : null
        });
    }
    
    return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

window.ActivityLogs = ActivityLogs;
