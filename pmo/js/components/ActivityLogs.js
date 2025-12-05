const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-03 15:34:56',
            department: '정무실',
            action: '국회 질의 답변 자료 준비',
            user: '정무비서관',
            status: 'success',
            details: 'AI 분석: 국정감사 예상 질문 15건. 답변 초안 작성 완료.'
        },
        {
            timestamp: '2025-12-03 15:28:12',
            department: '민정실',
            action: '민원 1,234건 분류 완료',
            user: 'AI 자동분석',
            status: 'success',
            details: '긴급 민원 23건, 일반 민원 1,211건. 담당 부서 자동 배정.'
        },
        {
            timestamp: '2025-12-03 15:15:43',
            department: '공보실',
            action: '국정 브리핑 자료 작성',
            user: 'AI 자동분석',
            status: 'success',
            details: '주요 정책 3건 분석. 홍보 포인트 및 예상 질문 정리.'
        },
        {
            timestamp: '2025-12-03 15:05:21',
            department: '정무실',
            action: '당정협의 안건 검토',
            user: '정무기획비서관',
            status: 'warning',
            details: 'AI 분석: 당정 입장 차이 발견. 추가 협의 필요.'
        },
        {
            timestamp: '2025-12-03 14:52:08',
            department: '민정실',
            action: '시민단체 의견 수렴',
            user: '시민사회비서관',
            status: 'success',
            details: '15개 시민단체 의견 취합. 정책 반영 방안 마련.'
        },
        {
            timestamp: '2025-12-03 14:38:15',
            department: '공보실',
            action: '언론 모니터링 분석',
            user: 'AI 자동분석',
            status: 'success',
            details: '오늘 주요 언론 보도 87건 분석. 긍정 68%, 중립 27%, 부정 5%.'
        },
        {
            timestamp: '2025-12-03 14:20:47',
            department: '의전비서관',
            action: '외빈 접견 일정 조율',
            user: '의전비서관',
            status: 'success',
            details: 'AI 일정관리: 최적 시간대 제안. 경호 계획 자동 수립.'
        },
        {
            timestamp: '2025-12-03 14:05:33',
            department: '민정실',
            action: '민원 긴급 처리 필요',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 우선순위 분석: 긴급 민원 3건 즉시 대응 필요.'
        },
        {
            timestamp: '2025-12-03 13:45:19',
            department: '공보실',
            action: 'SNS 여론 분석 완료',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 감성분석: 주요 정책 긍정 반응 73%. 개선점 3건 도출.'
        },
        {
            timestamp: '2025-12-03 13:28:55',
            department: '정무실',
            action: '국회 일정 협의',
            user: '정무협력비서관',
            status: 'success',
            details: 'AI 일정분석으로 국회 협의 최적 시점 제안 완료.'
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-700 to-cyan-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 총리 보좌 로그</h2>
                <p className="text-blue-100 text-sm">
                    모든 총리 보좌 업무는 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="오늘 업무" 
                    value="156건" 
                    subtitle="전일 대비 +8%"
                    icon="📊" 
                    color="blue" 
                />
                <StatCard 
                    title="AI 자동처리" 
                    value="118건" 
                    subtitle="75.6%"
                    icon="🤖" 
                    color="purple" 
                />
                <StatCard 
                    title="비서관 검토" 
                    value="38건" 
                    subtitle="24.4%"
                    icon="👤" 
                    color="green" 
                />
                <StatCard 
                    title="긴급 처리" 
                    value="5건" 
                    subtitle="즉시 대응"
                    icon="⚠️" 
                    color="orange" 
                />
            </div>
            
            <FilterPanel onFilterChange={setFilters} />
            
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">업무 로그</h3>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
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
                            모든 업무 과정은 오픈해시로 기록되어 투명하게 관리됩니다.
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
                            <div className="text-xl font-bold text-gray-900">2,567,890</div>
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
