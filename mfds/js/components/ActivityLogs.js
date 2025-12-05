const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-03 18:34:56',
            department: '의약품안전국',
            action: '신약 임상시험 승인',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 임상자료 적합. 안전성·유효성 확인. 3상 임상시험 승인.'
        },
        {
            timestamp: '2025-12-03 18:28:12',
            department: '식품안전정책국',
            action: '식품첨가물 위해 평가',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 일일섭취허용량 검토. 안전기준 충족 확인.'
        },
        {
            timestamp: '2025-12-03 18:15:43',
            department: '수입식품정책국',
            action: '수입식품 검역 완료',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 검사: 잔류농약 불검출. 중금속 기준 적합. 통관 승인.'
        },
        {
            timestamp: '2025-12-03 18:05:21',
            department: '의료기기안전국',
            action: '의료기기 등급 분류',
            user: '심사관',
            status: 'success',
            details: 'AI 분석: 3등급 의료기기 적합. 품목 허가 진행.'
        },
        {
            timestamp: '2025-12-03 17:52:08',
            department: '소비자위해예방국',
            action: '위해식품 긴급 차단',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 탐지: 유해물질 기준 초과 3건. 긴급 회수 명령.'
        },
        {
            timestamp: '2025-12-03 17:38:15',
            department: '바이오생약국',
            action: '바이오의약품 심사',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 생물학적 동등성 확인. 품질관리 적합.'
        },
        {
            timestamp: '2025-12-03 17:20:47',
            department: '의약품안전국',
            action: '마약류 수급 관리',
            user: '마약정책과',
            status: 'success',
            details: 'AI 모니터링: 의료용 마약류 수급 적정. 오남용 징후 없음.'
        },
        {
            timestamp: '2025-12-03 17:05:33',
            department: '농축수산물안전정책국',
            action: '잔류농약 검사',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 검사: 234개 시료 분석. 부적합 2건 발견.'
        },
        {
            timestamp: '2025-12-03 16:45:19',
            department: '의료기기안전국',
            action: '화장품 성분 검토',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 유해성분 불검출. 알레르기 유발물질 표시 확인.'
        },
        {
            timestamp: '2025-12-03 16:28:55',
            department: '식품안전정책국',
            action: '영양성분 표시 검증',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 검증: 영양성분표 567건 분석. 허위표시 3건 적발.'
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-700 to-pink-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 안전 관리 로그</h2>
                <p className="text-red-100 text-sm">
                    모든 식·의약품 안전 업무는 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="오늘 업무" 
                    value="3,245건" 
                    subtitle="전일 대비 +9%"
                    icon="📊" 
                    color="blue" 
                />
                <StatCard 
                    title="AI 자동처리" 
                    value="3,105건" 
                    subtitle="95.7%"
                    icon="🤖" 
                    color="purple" 
                />
                <StatCard 
                    title="전문가 검토" 
                    value="140건" 
                    subtitle="4.3%"
                    icon="👤" 
                    color="green" 
                />
                <StatCard 
                    title="위해 차단" 
                    value="12건" 
                    subtitle="긴급 조치"
                    icon="⚠️" 
                    color="orange" 
                />
            </div>
            
            <FilterPanel onFilterChange={setFilters} />
            
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">업무 로그</h3>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium">
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
                            모든 심사·검사 과정은 오픈해시로 기록되어 투명하게 관리됩니다.
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
                            <div className="text-xl font-bold text-gray-900">8,456,789</div>
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
