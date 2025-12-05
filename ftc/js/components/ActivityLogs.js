const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-03 19:42:18',
            department: '시장감시국',
            action: '입찰담합 혐의 탐지',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 분석: 건설업체 5개사 입찰가격 유사도 99.2%. 담합 의심. 조사 필요.'
        },
        {
            timestamp: '2025-12-03 19:35:42',
            department: '소비자정책국',
            action: '허위광고 적발',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 건강기능식품 과대광고 45건 탐지. 시정명령 발송.'
        },
        {
            timestamp: '2025-12-03 19:28:05',
            department: '경쟁정책국',
            action: '기업결합 심사 완료',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: A사-B사 합병. 시장점유율 분석 완료. 경쟁제한 없음. 승인.'
        },
        {
            timestamp: '2025-12-03 19:15:33',
            department: '기업거래정책국',
            action: '하도급 부당행위 발견',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 탐지: 원사업자 C사, 하도급대금 30일 초과 지연. 조사 착수.'
        },
        {
            timestamp: '2025-12-03 19:08:21',
            department: '기업집단정책국',
            action: '대기업집단 내부거래 검토',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: D그룹 계열사 간 거래 1,245건 분석. 부당지원 없음.'
        },
        {
            timestamp: '2025-12-03 18:55:47',
            department: '시장감시국',
            action: '가격담합 혐의 조사',
            user: '조사관',
            status: 'success',
            details: 'AI 지원: 정유사 3개 가격 동조화율 97.8%. 현장 조사 실시.'
        },
        {
            timestamp: '2025-12-03 18:42:15',
            department: '소비자정책국',
            action: '약관 불공정조항 심사',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 통신사 약관 8개 조항 불공정. 시정 요구.'
        },
        {
            timestamp: '2025-12-03 18:28:39',
            department: '경쟁정책국',
            action: '시장지배적지위 남용 탐지',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 탐지: E사 경쟁사 거래거절 의심. 시장점유율 75%. 조사 필요.'
        },
        {
            timestamp: '2025-12-03 18:15:08',
            department: '기업거래정책국',
            action: '가맹사업 불공정행위 조사',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: F프랜차이즈 가맹점주 125명 피해 신고. 조사 진행.'
        },
        {
            timestamp: '2025-12-03 18:02:54',
            department: '심판관리관',
            action: '시정조치 불복 심판',
            user: '심판관',
            status: 'success',
            details: 'AI 지원: 유사 판례 23건 검색. 심판 자료 구성 완료.'
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-700 to-amber-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 불공정거래 조사 로그</h2>
                <p className="text-orange-100 text-sm">
                    모든 조사·심의 업무는 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="오늘 조사" 
                    value="2,345건" 
                    subtitle="전일 대비 +18%"
                    icon="📊" 
                    color="blue" 
                />
                <StatCard 
                    title="AI 자동처리" 
                    value="2,270건" 
                    subtitle="96.8%"
                    icon="🤖" 
                    color="orange" 
                />
                <StatCard 
                    title="위원회 심의" 
                    value="75건" 
                    subtitle="3.2%"
                    icon="⚖️" 
                    color="green" 
                />
                <StatCard 
                    title="긴급 조사" 
                    value="18건" 
                    subtitle="우선 처리"
                    icon="⚠️" 
                    color="red" 
                />
            </div>
            
            <FilterPanel onFilterChange={setFilters} />
            
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">조사 로그</h3>
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-medium">
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
                            모든 조사·심의 과정은 오픈해시로 기록되어 투명하게 관리됩니다.
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
                            <div className="text-xl font-bold text-gray-900">9,876,543</div>
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
