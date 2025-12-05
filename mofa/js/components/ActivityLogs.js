const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-04 15:08:42',
            department: '아주국',
            action: '한·중·일 정상회의 준비',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 3국 정상회의 의제 조정. 경제협력·환경·보건 협력 중점. 일정 협의 진행 중.'
        },
        {
            timestamp: '2025-12-04 15:01:35',
            department: '재외동포영사국',
            action: '재외국민 안전 경보',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 경보: 중동 지역 정세 불안. 5개국 여행경보 상향 권고. 재외국민 3,200명 안전 점검.'
        },
        {
            timestamp: '2025-12-04 14:54:18',
            department: '국제법률국',
            action: '한·싱가포르 FTA 개정안',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 검토: 디지털무역·서비스 분야 개정. 법률 검토 완료. 국회 비준 준비.'
        },
        {
            timestamp: '2025-12-04 14:46:27',
            department: '미주국',
            action: '한·미 고위급 경제협의',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 보고: 반도체·배터리 협력 강화. 공급망 안정화 논의. 다음주 워싱턴 개최.'
        },
        {
            timestamp: '2025-12-04 14:38:55',
            department: '국제기구국',
            action: 'UN 안보리 의제 분석',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 12월 안보리 의제 18건. 기후변화·평화유지 중점. 한국 입장 정리 완료.'
        },
        {
            timestamp: '2025-12-04 14:31:12',
            department: '구주국',
            action: '한·EU FTA 10주년 기념',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 교역액 1,420억 달러. 전략적 동반자 관계 격상 논의 진행 중.'
        },
        {
            timestamp: '2025-12-04 14:23:48',
            department: '재외동포영사국',
            action: '여권 발급 현황',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 처리: 오늘 여권 신청 12,450건. 발급 11,820건. 평균 처리시간 3.2일.'
        },
        {
            timestamp: '2025-12-04 14:16:33',
            department: '한반도평화교섭본부',
            action: '북한 정세 모니터링',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 감시: 북한 동향 실시간 분석. 대화 가능성 타진. 관련국 협의 진행.'
        },
        {
            timestamp: '2025-12-04 14:08:19',
            department: '아프리카중동국',
            action: '중동 평화협정 지지',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 성명: 중동 평화 프로세스 환영. 인도적 지원 확대. 재건 협력 제안.'
        },
        {
            timestamp: '2025-12-04 14:00:57',
            department: '문화외교국',
            action: 'K-컬처 해외홍보',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 76개국 한류 행사. 한국어 학습자 180만명. 공공외교 효과 극대화.'
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
            <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 외교 활동 로그</h2>
                <p className="text-blue-100 text-sm">
                    모든 외교활동·조약·영사업무는 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">오늘 외교활동</p>
                            <p className="text-2xl font-bold text-blue-600">4,567건</p>
                            <p className="text-xs text-gray-500">전일 대비 +3%</p>
                        </div>
                        <span className="text-3xl">🌐</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동처리</p>
                            <p className="text-2xl font-bold text-indigo-600">4,467건</p>
                            <p className="text-xs text-gray-500">97.8%</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">장관 결재</p>
                            <p className="text-2xl font-bold text-purple-600">100건</p>
                            <p className="text-xs text-gray-500">2.2%</p>
                        </div>
                        <span className="text-3xl">📝</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">긴급 대응</p>
                            <p className="text-2xl font-bold text-red-600">5건</p>
                            <p className="text-xs text-gray-500">재외국민 보호</p>
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
                        <option value="아주국">아주국</option>
                        <option value="미주국">미주국</option>
                        <option value="구주국">구주국</option>
                        <option value="재외동포영사국">재외동포영사국</option>
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
                    <h3 className="text-xl font-bold text-gray-900">외교활동 로그</h3>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
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
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">ℹ️</span>
                    <div>
                        <h4 className="font-semibold text-blue-900 mb-1">투명성 안내</h4>
                        <p className="text-sm text-blue-800">
                            본 로그는 공개 가능한 정보만 표시됩니다. 
                            외교기밀 및 민감 정보는 보안등급에 따라 별도 관리됩니다.
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
                            <div className="text-xl font-bold text-gray-900">52,345,892</div>
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
