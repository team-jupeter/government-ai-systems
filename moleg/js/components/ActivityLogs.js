const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-03 17:34:56',
            department: '행정법제국',
            action: '행정절차법 개정안 심사 완료',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 체계 적합, 자구 수정 3건, 법리 검토 완료. 법제관 최종 확인 필요.'
        },
        {
            timestamp: '2025-12-03 17:28:12',
            department: '법령해석국',
            action: '근로기준법 제50조 해석 완료',
            user: 'AI 자동분석',
            status: 'success',
            details: '유사 판례 15건 분석. 해석례 23건 검토. 일관된 해석 방향 제시.'
        },
        {
            timestamp: '2025-12-03 17:15:43',
            department: '경제법제국',
            action: '자본시장법 시행령 심사',
            user: '법제심의관',
            status: 'success',
            details: 'AI 분석: 상위법 위배 없음. 규제영향분석 적정. 심사 완료.'
        },
        {
            timestamp: '2025-12-03 17:05:21',
            department: '법제정책국',
            action: '알기 쉬운 법령 개선 제안',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 가독성 분석: 어려운 문장 67개 발견. 쉬운 표현으로 개선안 제시.'
        },
        {
            timestamp: '2025-12-03 16:52:08',
            department: '사회문화법제국',
            action: '의료법 개정안 검토',
            user: '법제심의관',
            status: 'warning',
            details: 'AI 분석: 타법과 충돌 가능성 3건. 추가 검토 필요.'
        },
        {
            timestamp: '2025-12-03 16:38:15',
            department: '법제지원국',
            action: '지자체 조례 검토 지원',
            user: 'AI 자동분석',
            status: 'success',
            details: '서울시 조례안 234건 자동 검토. 상위법 적합성 확인 완료.'
        },
        {
            timestamp: '2025-12-03 16:20:47',
            department: '법령해석국',
            action: '공직선거법 해석 요청 처리',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 관련 판례 8건, 해석례 12건 검토. 해석 초안 작성.'
        },
        {
            timestamp: '2025-12-03 16:05:33',
            department: '행정법제국',
            action: '정부조직법 개정안 심사',
            user: '법제관',
            status: 'success',
            details: 'AI 사전분석 완료. 체계·자구·법리 검토 후 심사 완료.'
        },
        {
            timestamp: '2025-12-03 15:45:19',
            department: '경제법제국',
            action: '산업안전법 시행규칙 심사',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 규제영향 분석: 중소기업 부담 예측. 완화 방안 제시.'
        },
        {
            timestamp: '2025-12-03 15:28:55',
            department: '법제정책국',
            action: '법령정비 계획 수립',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 5년 이상 미개정 법령 345건 발견. 우선순위 산정 완료.'
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-700 to-yellow-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 법령 업무 로그</h2>
                <p className="text-amber-100 text-sm">
                    모든 법령 심사·해석 업무는 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="오늘 업무" 
                    value="1,856건" 
                    subtitle="전일 대비 +12%"
                    icon="📊" 
                    color="blue" 
                />
                <StatCard 
                    title="AI 자동처리" 
                    value="1,760건" 
                    subtitle="94.8%"
                    icon="🤖" 
                    color="purple" 
                />
                <StatCard 
                    title="법제관 검토" 
                    value="96건" 
                    subtitle="5.2%"
                    icon="👤" 
                    color="green" 
                />
                <StatCard 
                    title="긴급 심사" 
                    value="7건" 
                    subtitle="우선 처리"
                    icon="⚠️" 
                    color="orange" 
                />
            </div>
            
            <FilterPanel onFilterChange={setFilters} />
            
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">업무 로그</h3>
                    <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-medium">
                        전체 보고서 생성
                    </button>
                </div>
                
                <div className="space-y-3">
                    {mockLogs.map((log, index) => (
                        <LogCard key={index} {...log} />
                    ))}
                </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">ℹ️</span>
                    <div>
                        <h4 className="font-semibold text-blue-900 mb-1">투명성 안내</h4>
                        <p className="text-sm text-blue-800">
                            본 로그는 공개 가능한 정보만 표시됩니다. 
                            모든 법령 심사·해석 과정은 오픈해시로 기록되어 투명하게 관리됩니다.
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">오픈해시 무결성 검증</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                            <div className="font-semibold text-gray-900">모든 로그 검증 완료</div>
                            <div className="text-sm text-gray-600">분산원장에 안전하게 기록됨</div>
                        </div>
                        <OpenHashBadge type="verified" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-gray-600 mb-1">총 블록 수</div>
                            <div className="text-xl font-bold text-gray-900">6,234,567</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-gray-600 mb-1">마지막 검증</div>
                            <div className="text-xl font-bold text-gray-900">1초 전</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-gray-600 mb-1">위변조 시도</div>
                            <div className="text-xl font-bold text-red-600">0건</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.ActivityLogs = ActivityLogs;
