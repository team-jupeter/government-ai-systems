const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-04 11:55:42',
            department: '원자로안전심사국',
            action: '신고리 3호기 일일점검',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 1차 계통 압력 155bar, 온도 315℃. 정상 범위. 이상 없음.'
        },
        {
            timestamp: '2025-12-04 11:48:15',
            department: '방사선방재국',
            action: '방사선 환경감시',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 모니터링: 전국 200개 지점 방사선량 측정. 평균 0.08μSv/h. 자연방사선 수준.'
        },
        {
            timestamp: '2025-12-04 11:42:08',
            department: '원전지역사무소',
            action: '월성 2호기 증기발생기 점검',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 검사: 증기발생기 전열관 와전류 검사. 1,245개 전열관 건전성 확인. 이상 없음.'
        },
        {
            timestamp: '2025-12-04 11:35:33',
            department: '핵안보국',
            action: '핵물질 계량관리',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 확인: 고리 원전 핵연료 재고 관리. IAEA 안전조치 보고 자동 작성 완료.'
        },
        {
            timestamp: '2025-12-04 11:28:19',
            department: '원자로안전심사국',
            action: 'SMR 사전설계검토',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 검토: 소형모듈원자로 설계안전성 분석. 피동안전계통 설계 적정. 승인.'
        },
        {
            timestamp: '2025-12-04 11:15:47',
            department: '방사선방재국',
            action: '의료기관 방사선 안전점검',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 점검: A병원 방사선치료기 안전관리 현황. 차폐시설 적정. 정상.'
        },
        {
            timestamp: '2025-12-04 11:08:25',
            department: '규제기준국',
            action: '안전규제 기준 개정',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 검토: 중대사고 관리 기준 개정안 분석. IAEA 기준 부합. 위원회 상정.'
        },
        {
            timestamp: '2025-12-04 10:55:13',
            department: '원전지역사무소',
            action: '한빛 5호기 방사성폐기물 관리',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 확인: 저준위 방폐물 드럼 1,234개 저장. 관리기준 준수. 이상 없음.'
        },
        {
            timestamp: '2025-12-04 10:42:08',
            department: '원자력안전정책국',
            action: 'IAEA 정기보고',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 작성: 분기별 원자력 안전규제 현황 보고서 자동 생성. IAEA 제출 준비.'
        },
        {
            timestamp: '2025-12-04 10:28:35',
            department: '원자로안전심사국',
            action: '고리 2호기 계속운전 심사',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 검토: 주요 설비 건전성 평가 완료. 안전성 분석 보고서 검토 완료.'
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
            <div className="bg-gradient-to-r from-green-700 to-emerald-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 원자력 안전규제 로그</h2>
                <p className="text-green-100 text-sm">
                    모든 원전 안전점검·방사선 관리·허가심사는 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">오늘 안전점검</p>
                            <p className="text-2xl font-bold text-green-600">2,345건</p>
                            <p className="text-xs text-gray-500">전일 대비 +5%</p>
                        </div>
                        <span className="text-3xl">⚛️</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동처리</p>
                            <p className="text-2xl font-bold text-emerald-600">2,309건</p>
                            <p className="text-xs text-gray-500">98.5%</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">전문가 검토</p>
                            <p className="text-2xl font-bold text-teal-600">36건</p>
                            <p className="text-xs text-gray-500">1.5%</p>
                        </div>
                        <span className="text-3xl">👨‍🔬</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">긴급 대응</p>
                            <p className="text-2xl font-bold text-red-600">0건</p>
                            <p className="text-xs text-gray-500">정상 운영</p>
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
                        <option value="안전심사국">안전심사국</option>
                        <option value="방재국">방재국</option>
                        <option value="핵안보국">핵안보국</option>
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
                    <h3 className="text-xl font-bold text-gray-900">안전규제 로그</h3>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium">
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
            
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">ℹ️</span>
                    <div>
                        <h4 className="font-semibold text-green-900 mb-1">투명성 안내</h4>
                        <p className="text-sm text-green-800">
                            본 로그는 공개 가능한 정보만 표시됩니다. 
                            모든 원자력 안전규제 과정은 오픈해시로 기록되어 투명하게 관리됩니다.
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
                            <div className="text-xl font-bold text-gray-900">34,678,901</div>
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
