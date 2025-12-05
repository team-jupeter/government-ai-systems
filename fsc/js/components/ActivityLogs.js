const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-03 19:55:42',
            department: '금융산업국',
            action: '은행 건전성 검사',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: A은행 BIS 자기자본비율 15.2%. 적정 수준. 위험자산 비율 정상.'
        },
        {
            timestamp: '2025-12-03 19:48:15',
            department: '증권선물위원회',
            action: '불공정거래 의심 탐지',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 탐지: B증권 내부자거래 의심. 공시 전 대량 매수 패턴 발견. 조사 필요.'
        },
        {
            timestamp: '2025-12-03 19:42:08',
            department: '금융소비자국',
            action: '불완전판매 적발',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 탐지: C은행 ELS 상품 설명의무 위반 의심. 15건 분석 완료.'
        },
        {
            timestamp: '2025-12-03 19:35:33',
            department: '디지털금융정책관',
            action: '핀테크 인허가 심사',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 검토: D핀테크 간편결제 라이선스 신청. 보안성 평가 완료. 승인 권고.'
        },
        {
            timestamp: '2025-12-03 19:28:19',
            department: '금융정책국',
            action: '시장 리스크 분석',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 금융시장 안정성 평가. 변동성 지수 12.5. 정상 범위.'
        },
        {
            timestamp: '2025-12-03 19:15:47',
            department: '구조개선정책관',
            action: '기업구조조정 심사',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: E그룹 워크아웃 신청. 재무구조 개선 가능성 85%. 승인.'
        },
        {
            timestamp: '2025-12-03 19:08:25',
            department: '금융산업국',
            action: '보험사 자산건전성 검사',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: F생명 지급여력비율(RBC) 285%. 적정 수준. 건전성 양호.'
        },
        {
            timestamp: '2025-12-03 18:55:13',
            department: '증권선물위원회',
            action: '기업회계 감리',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 탐지: G기업 회계처리 이상. 매출 인식 시점 검토 필요.'
        },
        {
            timestamp: '2025-12-03 18:42:08',
            department: '금융소비자국',
            action: '서민금융 지원 심사',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 처리: 햇살론 신청 1,245건 자동 심사. 승인 980건.'
        },
        {
            timestamp: '2025-12-03 18:28:35',
            department: '디지털금융정책관',
            action: '금융데이터 공유 승인',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 검토: H은행-I테크 데이터 공유 협약. 개인정보보호 검토 완료.'
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 금융감독 로그</h2>
                <p className="text-blue-100 text-sm">
                    모든 금융기관 감독·소비자 보호·자본시장 감시는 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="오늘 감독" 
                    value="3,456건" 
                    subtitle="전일 대비 +10%"
                    icon="📊" 
                    color="blue" 
                />
                <StatCard 
                    title="AI 자동처리" 
                    value="3,335건" 
                    subtitle="96.5%"
                    icon="🤖" 
                    color="indigo" 
                />
                <StatCard 
                    title="위원회 심의" 
                    value="121건" 
                    subtitle="3.5%"
                    icon="⚖️" 
                    color="purple" 
                />
                <StatCard 
                    title="긴급 조치" 
                    value="12건" 
                    subtitle="즉시 대응"
                    icon="⚠️" 
                    color="red" 
                />
            </div>
            
            <FilterPanel onFilterChange={setFilters} />
            
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">감독 로그</h3>
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
                            모든 감독·제재 과정은 오픈해시로 기록되어 투명하게 관리됩니다.
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
                            <div className="text-xl font-bold text-gray-900">28,456,789</div>
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
