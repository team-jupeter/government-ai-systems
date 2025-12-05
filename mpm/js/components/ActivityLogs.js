const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-03 16:34:56',
            department: '인사관리국',
            action: '승진 심사 완료',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 5급 승진 대상자 234명 평가 완료. 추천 순위 산정.'
        },
        {
            timestamp: '2025-12-03 16:28:12',
            department: '인재개발국',
            action: 'AI 교육과정 이수 현황',
            user: 'AI 자동분석',
            status: 'success',
            details: '공무원 8,456명 AI 교육 완료. 평균 점수 87.3점.'
        },
        {
            timestamp: '2025-12-03 16:15:43',
            department: '윤리복무국',
            action: '재산공개 검증',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 재산공개 1,234건 자동 검증. 이상 징후 3건 발견.'
        },
        {
            timestamp: '2025-12-03 16:05:21',
            department: '연금정책국',
            action: '연금 급여 산정',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 계산: 퇴직연금 567건 자동 산정. 지급 준비 완료.'
        },
        {
            timestamp: '2025-12-03 15:52:08',
            department: '인사관리국',
            action: '공무원 채용 시험 채점',
            user: 'AI 자동분석',
            status: 'success',
            details: '7급 공채 8,456명 답안 자동 채점 완료. 합격선 산출.'
        },
        {
            timestamp: '2025-12-03 15:38:15',
            department: '윤리복무국',
            action: '복무 이상 징후 탐지',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 탐지: 비정상 근무패턴 5건. 추가 조사 필요.'
        },
        {
            timestamp: '2025-12-03 15:20:47',
            department: '인재개발국',
            action: '역량평가 분석',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 공무원 3,456명 역량평가 결과 분석. 맞춤형 교육과정 추천.'
        },
        {
            timestamp: '2025-12-03 15:05:33',
            department: '연금정책국',
            action: '연금재정 추계',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 예측: 향후 10년 연금재정 시뮬레이션 완료.'
        },
        {
            timestamp: '2025-12-03 14:45:19',
            department: '인사관리국',
            action: '성과평가 자동 산출',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 전 부처 공무원 2만명 성과평가 자동 산출 완료.'
        },
        {
            timestamp: '2025-12-03 14:28:55',
            department: '윤리복무국',
            action: '공직자 윤리교육 이수',
            user: 'AI 자동분석',
            status: 'success',
            details: '공직윤리 온라인 교육 5,678명 이수 확인. 수료증 자동 발급.'
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-700 to-green-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 인사 업무 로그</h2>
                <p className="text-teal-100 text-sm">
                    모든 인사·윤리·복무·연금 업무는 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="오늘 업무" 
                    value="1,024건" 
                    subtitle="전일 대비 +6%"
                    icon="📊" 
                    color="blue" 
                />
                <StatCard 
                    title="AI 자동처리" 
                    value="985건" 
                    subtitle="96.2%"
                    icon="🤖" 
                    color="purple" 
                />
                <StatCard 
                    title="담당자 검토" 
                    value="39건" 
                    subtitle="3.8%"
                    icon="👤" 
                    color="green" 
                />
                <StatCard 
                    title="이상 징후" 
                    value="3건" 
                    subtitle="즉시 대응"
                    icon="⚠️" 
                    color="orange" 
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
                            모든 인사 업무는 오픈해시로 기록되어 투명하게 관리됩니다.
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
                            <div className="text-xl font-bold text-gray-900">4,123,456</div>
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
