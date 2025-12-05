const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-03 19:48:33',
            department: '고충처리국',
            action: '고충민원 접수 및 분류',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 건강보험 민원. 유사 사례 23건 검색. 담당 부서 자동 배정.'
        },
        {
            timestamp: '2025-12-03 19:42:15',
            department: '부패방지국',
            action: '부패신고 접수',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 분석: 공무원 금품수수 의심. 청탁금지법 위반 가능성. 조사 필요.'
        },
        {
            timestamp: '2025-12-03 19:35:47',
            department: '중앙행정심판위원회',
            action: '행정심판 청구 접수',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 건축허가 거부처분 불복. 유사 판례 15건 검색 완료.'
        },
        {
            timestamp: '2025-12-03 19:28:19',
            department: '청렴정책국',
            action: '청렴도 측정 실시',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: A공공기관 청렴도 87.5점. 전년 대비 2.3점 상승.'
        },
        {
            timestamp: '2025-12-03 19:15:52',
            department: '권익개선정책국',
            action: '제도개선 권고',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 민원 1,234건 분석. 3개 제도 개선 필요 발견.'
        },
        {
            timestamp: '2025-12-03 19:08:28',
            department: '부패방지국',
            action: '공익신고 보호 조치',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 검토: 공익신고자 신원 보호. 불이익 조치 모니터링 시작.'
        },
        {
            timestamp: '2025-12-03 18:55:14',
            department: '고충처리국',
            action: '민원 처리 완료',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 처리: 복지급여 지연 민원. 해당 기관 시정 조치 완료.'
        },
        {
            timestamp: '2025-12-03 18:42:39',
            department: '중앙행정심판위원회',
            action: '행정심판 재결',
            user: '심판관',
            status: 'success',
            details: 'AI 지원: 과징금 부과처분 취소. 판례 분석 자료 제공.'
        },
        {
            timestamp: '2025-12-03 18:28:05',
            department: '청렴정책국',
            action: '청탁금지법 위반 신고',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 탐지: 공무원 식사·선물 수수 의심. 3만원 초과 여부 조사.'
        },
        {
            timestamp: '2025-12-03 18:15:41',
            department: '권익개선정책국',
            action: '민원 빅데이터 분석',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 이번 주 민원 5,678건 분석. 주요 이슈 10건 도출.'
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-700 to-cyan-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 민원 처리 로그</h2>
                <p className="text-teal-100 text-sm">
                    모든 고충민원·부패신고·행정심판 업무는 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="오늘 민원" 
                    value="5,678건" 
                    subtitle="전일 대비 +12%"
                    icon="📊" 
                    color="blue" 
                />
                <StatCard 
                    title="AI 자동처리" 
                    value="5,440건" 
                    subtitle="95.8%"
                    icon="🤖" 
                    color="teal" 
                />
                <StatCard 
                    title="위원회 심의" 
                    value="238건" 
                    subtitle="4.2%"
                    icon="⚖️" 
                    color="green" 
                />
                <StatCard 
                    title="긴급 민원" 
                    value="15건" 
                    subtitle="우선 처리"
                    icon="⚠️" 
                    color="red" 
                />
            </div>
            
            <FilterPanel onFilterChange={setFilters} />
            
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">업무 로그</h3>
                    <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm font-medium">
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
                            모든 민원·신고·심판 과정은 오픈해시로 기록되어 투명하게 관리됩니다.
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
                            <div className="text-xl font-bold text-gray-900">15,234,567</div>
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
