const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-04 15:35:42',
            department: '재난안전관리본부',
            action: '재난 실시간 모니터링',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 감시: 전국 재난상황 실시간 모니터링. 호우주의보 3개 지역. 산불위험 보통. 이상무.'
        },
        {
            timestamp: '2025-12-04 15:28:35',
            department: '디지털정부국',
            action: '정부24 민원처리',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 처리: 금일 민원 45,800건. 주민등록등본 12,500건, 건축물대장 8,200건 자동발급.'
        },
        {
            timestamp: '2025-12-04 15:21:18',
            department: '지방재정경제실',
            action: '지방교부세 배분 분석',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 산정: 12월 지방교부세 5.8조원 배분. 243개 지자체별 재정수요·수입 분석 완료.'
        },
        {
            timestamp: '2025-12-04 15:14:52',
            department: '자치분권국',
            action: '지자체 조례 검토',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 검토: 신규 조례 28건 제출. 법령 충돌 0건. 상위법 위배 0건. 승인 권고.'
        },
        {
            timestamp: '2025-12-04 15:07:36',
            department: '경찰청',
            action: '범죄 예방순찰',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 범죄다발지역 850개소 중점순찰. 112신고 1,250건 접수. 긴급출동 95건.'
        },
        {
            timestamp: '2025-12-04 15:00:29',
            department: '소방청',
            action: '화재·구조 출동',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 관제: 금일 화재 15건, 구조 28건, 구급 3,450건. 평균 출동시간 5분 12초.'
        },
        {
            timestamp: '2025-12-04 14:53:14',
            department: '기획조정실',
            action: '정부조직 개편안 검토',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 정부조직 개편안 타당성 검토. 정원 증감 분석. 예산영향 평가 완료.'
        },
        {
            timestamp: '2025-12-04 14:46:07',
            department: '디지털정부국',
            action: '공공데이터 개방',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 처리: 공공데이터 신규 개방 125개 데이터셋. 개방율 99.2%. API 호출 850만건.'
        },
        {
            timestamp: '2025-12-04 14:38:52',
            department: '재난안전관리본부',
            action: '민방위 훈련 실시',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 관리: 전국 민방위 훈련 진행. 참가율 92%. 대피 소요시간 평균 3분 28초.'
        },
        {
            timestamp: '2025-12-04 14:31:45',
            department: '지방재정경제실',
            action: '지자체 재정분석',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 경고: 재정위기 주의 지자체 5개 탐지. 채무비율 초과. 긴급 재정진단 권고.'
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
            <div className="bg-gradient-to-r from-red-700 to-orange-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 행정안전 로그</h2>
                <p className="text-red-100 text-sm">
                    모든 정부조직·전자정부·지방재정·재난대응은 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">오늘 처리건수</p>
                            <p className="text-2xl font-bold text-red-700">58,920건</p>
                            <p className="text-xs text-gray-500">전일 대비 +2%</p>
                        </div>
                        <span className="text-3xl">🏛️</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동처리</p>
                            <p className="text-2xl font-bold text-orange-700">58,038건</p>
                            <p className="text-xs text-gray-500">98.5%</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">장관 결재</p>
                            <p className="text-2xl font-bold text-red-800">882건</p>
                            <p className="text-xs text-gray-500">1.5%</p>
                        </div>
                        <span className="text-3xl">📝</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">긴급 대응</p>
                            <p className="text-2xl font-bold text-red-600">8건</p>
                            <p className="text-xs text-gray-500">재난·안전</p>
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
                        <option value="재난안전관리본부">재난안전관리본부</option>
                        <option value="디지털정부국">디지털정부국</option>
                        <option value="지방재정경제실">지방재정경제실</option>
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
                    <h3 className="text-xl font-bold text-gray-900">행정안전 로그</h3>
                    <button className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 text-sm font-medium">
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
                                        오픈해시 기록됨
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">ℹ️</span>
                    <div>
                        <h4 className="font-semibold text-red-900 mb-1">투명성 안내</h4>
                        <p className="text-sm text-red-800">
                            본 로그는 공개 가능한 정보만 표시됩니다. 
                            국가안보 및 개인정보는 관련 법령에 따라 별도 관리됩니다.
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
                            <div className="text-xl font-bold text-gray-900">152,345,678</div>
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
