const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-03 14:34:56',
            department: '정책조정실',
            action: '주택정책 부처간 조정 완료',
            user: '조정관 A',
            status: 'success',
            details: 'AI 분석: 국토부·기재부 정책 충돌 해소. 통합 조정안 도출.'
        },
        {
            timestamp: '2025-12-03 14:28:12',
            department: '규제조정실',
            action: '불필요 규제 15건 발견',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 탐지: 중복 규제 12건, 과도 규제 3건. 개선 권고안 작성 중.'
        },
        {
            timestamp: '2025-12-03 14:15:43',
            department: '국정운영실',
            action: '차관회의 안건 검토 완료',
            user: 'AI 자동분석',
            status: 'success',
            details: '12월 차관회의 안건 8건 사전 검토. 주요 이슈: 예산편성, 규제개혁.'
        },
        {
            timestamp: '2025-12-03 14:05:21',
            department: '정책조정실',
            action: '경제정책 긴급 조정',
            user: '실장',
            status: 'warning',
            details: 'AI 예측: 부처간 정책 시차로 혼선 우려. 긴급 조정회의 소집.'
        },
        {
            timestamp: '2025-12-03 13:52:08',
            department: '규제조정실',
            action: '정부업무평가 진행',
            user: '평가관 C',
            status: 'success',
            details: '18개 부처 2024년 성과 평가. AI 분석으로 객관성 확보.'
        },
        {
            timestamp: '2025-12-03 13:38:15',
            department: '국정운영실',
            action: '국가데이터처 정책데이터 조회',
            user: '담당관 D',
            status: 'success',
            details: '각 부처 정책현황, 예산집행률, 성과지표 통합 조회 완료.'
        },
        {
            timestamp: '2025-12-03 13:20:47',
            department: '정책조정실',
            action: '사회갈등 조정안 마련',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 갈등분석: 이해관계자 5개 그룹 의견 수렴. 조정안 3개 도출.'
        },
        {
            timestamp: '2025-12-03 13:05:33',
            department: '규제조정실',
            action: '규제샌드박스 심사',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 리스크 분석: 일부 항목 보완 필요. 추가 검토 권고.'
        },
        {
            timestamp: '2025-12-03 12:45:19',
            department: '국정운영실',
            action: '국무회의 상정안건 준비',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 문서분석: 안건 12건 적합성 검토. 모두 상정 가능.'
        },
        {
            timestamp: '2025-12-03 12:28:55',
            department: '정책조정실',
            action: '신재생에너지 정책조정',
            user: '조정관 E',
            status: 'success',
            details: 'AI 네트워크 분석으로 관련 부처 7개 정책 연계방안 마련.'
        }
    ];
    
    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 정책조정 로그</h2>
                <p className="text-indigo-100 text-sm">
                    모든 정책조정 및 부처협의 활동은 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            {/* 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="오늘 조정" 
                    value="127건" 
                    subtitle="전일 대비 +15%"
                    icon="📊" 
                    color="blue" 
                />
                <StatCard 
                    title="AI 자동처리" 
                    value="98건" 
                    subtitle="77.2%"
                    icon="🤖" 
                    color="purple" 
                />
                <StatCard 
                    title="실무자 검토" 
                    value="29건" 
                    subtitle="22.8%"
                    icon="👤" 
                    color="green" 
                />
                <StatCard 
                    title="긴급조정" 
                    value="3건" 
                    subtitle="즉시 대응"
                    icon="⚠️" 
                    color="orange" 
                />
            </div>
            
            {/* 필터 */}
            <FilterPanel onFilterChange={setFilters} />
            
            {/* 로그 목록 */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">조정 로그</h3>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
                        전체 보고서 생성
                    </button>
                </div>
                
                <div className="space-y-3">
                    {mockLogs.map((log, index) => (
                        <LogCard key={index} {...log} />
                    ))}
                </div>
            </div>
            
            {/* 안내 */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">ℹ️</span>
                    <div>
                        <h4 className="font-semibold text-blue-900 mb-1">투명성 안내</h4>
                        <p className="text-sm text-blue-800">
                            본 로그는 공개 가능한 정보만 표시됩니다. 
                            모든 조정 과정은 오픈해시로 기록되어 투명하게 관리됩니다.
                        </p>
                    </div>
                </div>
            </div>
            
            {/* 오픈해시 검증 */}
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
                            <div className="text-xl font-bold text-gray-900">3,456,789</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-gray-600 mb-1">마지막 검증</div>
                            <div className="text-xl font-bold text-gray-900">2초 전</div>
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
