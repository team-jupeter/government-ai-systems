const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-03 19:34:56',
            department: '특허심사기획국',
            action: '특허 출원 심사 완료',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 선행기술 234건 검토. 신규성 인정. 진보성 확인. 등록 결정.'
        },
        {
            timestamp: '2025-12-03 19:28:12',
            department: '상표디자인심사국',
            action: '상표 유사도 판단',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 기존 상표 15,678건과 비교. 유사 상표 없음. 식별력 인정.'
        },
        {
            timestamp: '2025-12-03 19:15:43',
            department: '특허심판원',
            action: '무효심판 청구 접수',
            user: '심판관',
            status: 'success',
            details: 'AI 분석: 유사 판례 8건 검색. 심판 자료 자동 구성 완료.'
        },
        {
            timestamp: '2025-12-03 19:05:21',
            department: '국제협력국',
            action: 'PCT 국제출원 접수',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 검토: 출원서류 완비 확인. 국제조사기관 송부 준비.'
        },
        {
            timestamp: '2025-12-03 18:52:08',
            department: '지식재산분쟁대응국',
            action: '특허침해 의심 탐지',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 탐지: 유사 기술 3건 발견. 침해 가능성 분석 필요.'
        },
        {
            timestamp: '2025-12-03 18:38:15',
            department: '상표디자인심사국',
            action: '디자인 심사 완료',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 이미지 분석: 유사 디자인 없음. 창작성 인정. 등록 결정.'
        },
        {
            timestamp: '2025-12-03 18:20:47',
            department: '특허심사기획국',
            action: '실용신안 우선심사',
            user: '심사관',
            status: 'success',
            details: 'AI 분석: 긴급성 인정. 1개월 내 심사 완료 예정.'
        },
        {
            timestamp: '2025-12-03 18:05:33',
            department: '지식재산정책국',
            action: 'IP 거래 매칭',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 매칭: 기술 수요자 5개 기업 발굴. 거래 상담 주선.'
        },
        {
            timestamp: '2025-12-03 17:45:19',
            department: '특허심판원',
            action: '거절결정 불복심판',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 심사 오류 가능성 검토. 보정안 제시.'
        },
        {
            timestamp: '2025-12-03 17:28:55',
            department: '국제협력국',
            action: '해외 특허 동향 분석',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 미국·중국·유럽 출원 동향. 주요 기술분야 리포트 생성.'
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-violet-700 to-purple-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 특허 심사 로그</h2>
                <p className="text-violet-100 text-sm">
                    모든 특허·상표·디자인 심사 업무는 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="오늘 업무" 
                    value="4,567건" 
                    subtitle="전일 대비 +15%"
                    icon="📊" 
                    color="blue" 
                />
                <StatCard 
                    title="AI 자동처리" 
                    value="4,439건" 
                    subtitle="97.2%"
                    icon="🤖" 
                    color="purple" 
                />
                <StatCard 
                    title="심사관 검토" 
                    value="128건" 
                    subtitle="2.8%"
                    icon="👤" 
                    color="green" 
                />
                <StatCard 
                    title="긴급 심사" 
                    value="23건" 
                    subtitle="우선 처리"
                    icon="⚠️" 
                    color="orange" 
                />
            </div>
            
            <FilterPanel onFilterChange={setFilters} />
            
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">업무 로그</h3>
                    <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 text-sm font-medium">
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
                            모든 심사·심판 과정은 오픈해시로 기록되어 투명하게 관리됩니다.
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
                            <div className="text-xl font-bold text-gray-900">12,345,678</div>
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
