const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-04 15:22:45',
            department: '정책실',
            action: '안보위협 실시간 탐지',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 북한 동향 모니터링. 이상징후 0건. 한반도 안보상황 정상. 실시간 감시 지속.'
        },
        {
            timestamp: '2025-12-04 15:15:28',
            department: '합동참모본부',
            action: '군사작전 시뮬레이션',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 시뮬레이션: 동해 연합훈련 작전계획. 해·공군 협동작전. 시나리오 125개 분석 완료.'
        },
        {
            timestamp: '2025-12-04 15:08:13',
            department: '국방인력정책실',
            action: '신병 입영 처리',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 처리: 12월 입영자 12,450명. 육군 8,200명, 해군 2,100명, 공군 2,150명 배치 완료.'
        },
        {
            timestamp: '2025-12-04 15:01:57',
            department: '전력자원관리실',
            action: '방위력 개선사업 심의',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 심의: KF-21 양산 3차분 계약. 차세대 구축함 설계 승인. 총 3.2조원 집행 계획.'
        },
        {
            timestamp: '2025-12-04 14:54:32',
            department: '정보화기획관',
            action: '사이버 공격 차단',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 경보: 국방망 대상 DDoS 공격 탐지. 즉시 차단 조치. 피해 없음. 역추적 진행 중.'
        },
        {
            timestamp: '2025-12-04 14:47:18',
            department: '합동참모본부',
            action: '전투준비태세 점검',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 점검: 전 부대 전투준비태세 정상. DEFCON 4 유지. 24시간 감시체계 가동.'
        },
        {
            timestamp: '2025-12-04 14:39:55',
            department: '기획조정실',
            action: '2026년 국방예산 심의',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 심의: 2026년 국방예산 62.8조원. 전력증강 38%, 병력운영 35%, 방위력개선 27%.'
        },
        {
            timestamp: '2025-12-04 14:32:41',
            department: '육군본부',
            action: '훈련병 교육 현황',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 모니터링: 신병교육대 15개소. 훈련병 18,500명 교육 중. 5주차 훈련 진행. 이상 무.'
        },
        {
            timestamp: '2025-12-04 14:25:27',
            department: '방위사업청',
            action: '무기체계 조달 계약',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 계약: K2 전차 추가 생산 50대. 천궁-II 포대 3개. 총 1.8조원 계약 체결.'
        },
        {
            timestamp: '2025-12-04 14:18:13',
            department: '병무청',
            action: '병역판정검사 실시',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 처리: 금주 병역판정검사 3,250명. 현역 2,680명, 보충역 420명, 면제 150명 판정.'
        }
    ];
    
    const getStatusColor = (status) => {
        switch(status) {
            case 'success': return 'bg-green-100 text-green-800 border-green-300';
            case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'error': return 'bg-red-100 text-red-800 border-red-300';
            default: return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };
    
    const getStatusIcon = (status) => {
        switch(status) {
            case 'success': return '✅';
            case 'warning': return '⚠️';
            case 'error': return '❌';
            default: return '📋';
        }
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-800 to-green-900 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 국방작전 로그</h2>
                <p className="text-green-100 text-sm">
                    모든 군사작전·병력관리·무기조달은 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">오늘 작전지시</p>
                            <p className="text-2xl font-bold text-green-700">5,892건</p>
                            <p className="text-xs text-gray-500">전일 대비 +1%</p>
                        </div>
                        <span className="text-3xl">🎯</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동처리</p>
                            <p className="text-2xl font-bold text-green-800">5,785건</p>
                            <p className="text-xs text-gray-500">98.2%</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">장관 결재</p>
                            <p className="text-2xl font-bold text-lime-700">107건</p>
                            <p className="text-xs text-gray-500">1.8%</p>
                        </div>
                        <span className="text-3xl">📝</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">긴급 대응</p>
                            <p className="text-2xl font-bold text-red-600">2건</p>
                            <p className="text-xs text-gray-500">사이버 공격</p>
                        </div>
                        <span className="text-3xl">🚨</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex flex-wrap gap-3 mb-4">
                    <select 
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        value={filters.dateRange}
                        onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                    >
                        <option value="today">오늘</option>
                        <option value="week">최근 7일</option>
                        <option value="month">최근 30일</option>
                    </select>
                    
                    <select 
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        value={filters.department}
                        onChange={(e) => setFilters({...filters, department: e.target.value})}
                    >
                        <option value="all">모든 부서</option>
                        <option value="정책실">정책실</option>
                        <option value="합동참모본부">합동참모본부</option>
                        <option value="전력자원관리실">전력자원관리실</option>
                    </select>
                    
                    <select 
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        value={filters.level}
                        onChange={(e) => setFilters({...filters, level: e.target.value})}
                    >
                        <option value="all">모든 상태</option>
                        <option value="success">정상</option>
                        <option value="warning">경고</option>
                        <option value="error">오류</option>
                    </select>
                </div>
            </div>
            
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">국방작전 로그</h3>
                    <button className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 text-sm font-medium">
                        전체 보고서 생성
                    </button>
                </div>
                
                <div className="space-y-3">
                    {mockLogs.map((log, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">{getStatusIcon(log.status)}</span>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{log.action}</h4>
                                            <p className="text-sm text-gray-600">{log.department}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(log.status)}`}>
                                            {log.status === 'success' ? '정상' : log.status === 'warning' ? '경고' : '오류'}
                                        </span>
                                        <p className="text-xs text-gray-500 mt-1">{log.timestamp}</p>
                                    </div>
                                </div>
                                
                                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-700">{log.details}</p>
                                </div>
                                
                                <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                    <span>처리자: {log.user}</span>
                                    <span className="flex items-center">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                                        오픈해시 기록됨 (군사기밀)
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">🔒</span>
                    <div>
                        <h4 className="font-semibold text-green-900 mb-1">보안 안내</h4>
                        <p className="text-sm text-green-800">
                            본 로그는 공개 가능한 정보만 표시됩니다. 
                            군사기밀 및 작전계획은 보안등급에 따라 별도 관리됩니다.
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">오픈해시 무결성 검증</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <div>
                            <div className="font-semibold text-gray-900">모든 로그 검증 완료</div>
                            <div className="text-sm text-gray-600">분산원장에 안전하게 기록됨</div>
                        </div>
                        <span className="text-3xl">✅</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-gray-600 mb-1">총 블록 수</div>
                            <div className="text-xl font-bold text-gray-900">85,234,567</div>
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
