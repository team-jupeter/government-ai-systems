const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-03 12:34:56',
            department: '해외정보국',
            action: '중동 정세 정보 수집 완료',
            user: '요원 A-***',
            status: 'success',
            details: 'AI 분석: 지정학적 리스크 지수 +2.3% 상승. 관련 정보 3건 추가 수집 필요.'
        },
        {
            timestamp: '2025-12-03 12:28:12',
            department: '사이버안보국',
            action: 'APT 공격 시도 탐지',
            user: 'AI 자동분석',
            status: 'warning',
            details: '출처: 미상 IP (192.168.***.**), 대상: 국가 주요 인프라. 자동 차단 조치 완료.'
        },
        {
            timestamp: '2025-12-03 12:15:43',
            department: '대북정보국',
            action: '북한 매체 분석 완료',
            user: 'AI 자동분석',
            status: 'success',
            details: '노동신문 3건, 조선중앙TV 2건 분석. 주요 키워드: 군사훈련, 경제개발.'
        },
        {
            timestamp: '2025-12-03 12:05:21',
            department: '방첩국',
            action: '산업기밀 접근 이상징후',
            user: '요원 B-***',
            status: 'warning',
            details: 'AI 탐지: 비정상 시간대 기밀문서 접근. 추가 조사 진행 중.'
        },
        {
            timestamp: '2025-12-03 11:52:08',
            department: '국제범죄정보센터',
            action: '마약 밀거래 정보 입수',
            user: '요원 C-***',
            status: 'success',
            details: '해외 협력기관 제공 정보. 국내 유입 경로 분석 완료.'
        },
        {
            timestamp: '2025-12-03 11:38:15',
            department: '해외정보국',
            action: '국가데이터처 정보 조회',
            user: '요원 D-***',
            status: 'classified',
            details: '기밀 정보로 상세 내용 비공개.'
        },
        {
            timestamp: '2025-12-03 11:20:47',
            department: '국제테러정보통합센터',
            action: 'SNS 테러 선전물 탐지',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 탐지: 테러 관련 게시물 12건. 관련 계정 모니터링 시작.'
        },
        {
            timestamp: '2025-12-03 11:05:33',
            department: '사이버안보국',
            action: '제로데이 취약점 발견',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 예측 모델이 새로운 취약점 패턴 탐지. 긴급 패치 권고.'
        },
        {
            timestamp: '2025-12-03 10:45:19',
            department: '대북정보국',
            action: '위성사진 분석 완료',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 비교 분석: 군사시설 변화 없음. 정상 가동 중.'
        },
        {
            timestamp: '2025-12-03 10:28:55',
            department: '방첩국',
            action: '외국 정보기관 활동 포착',
            user: '요원 E-***',
            status: 'warning',
            details: 'AI 네트워크 분석으로 연관 인물 3명 추가 식별.'
        }
    ];
    
    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 정보활동 로그</h2>
                <p className="text-gray-300 text-sm">
                    모든 정보수집 및 분석 활동은 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            {/* 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="오늘 활동" 
                    value="365건" 
                    subtitle="전일 대비 +8%"
                    icon="📊" 
                    color="blue" 
                />
                <StatCard 
                    title="AI 자동처리" 
                    value="250건" 
                    subtitle="68.5%"
                    icon="🤖" 
                    color="purple" 
                />
                <StatCard 
                    title="요원 검토" 
                    value="115건" 
                    subtitle="31.5%"
                    icon="👤" 
                    color="green" 
                />
                <StatCard 
                    title="이상징후" 
                    value="8건" 
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
                    <h3 className="text-xl font-bold text-gray-900">활동 로그</h3>
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
            
            {/* 보안 안내 */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">⚠️</span>
                    <div>
                        <h4 className="font-semibold text-yellow-900 mb-1">보안 안내</h4>
                        <p className="text-sm text-yellow-800">
                            본 로그는 공개 가능한 정보만 표시됩니다. 
                            기밀 정보 및 세부 작전 내용은 허가된 요원만 접근 가능합니다.
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
                            <div className="text-xl font-bold text-gray-900">2,847,392</div>
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
