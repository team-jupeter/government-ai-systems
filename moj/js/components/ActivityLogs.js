const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-04 15:28:53',
            department: '검찰국',
            action: '범죄 패턴 AI 분석',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 금융사기 패턴 28건 탐지. 유사사건 연결 분석. 검거 우선순위 자동 산정.'
        },
        {
            timestamp: '2025-12-04 15:21:37',
            department: '출입국·외국인정책본부',
            action: '자동출입국 심사',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 심사: 인천공항 출국 1,245명. 안면인식 99.8% 정확도. 평균 처리시간 8초.'
        },
        {
            timestamp: '2025-12-04 15:14:22',
            department: '교정본부',
            action: '수형자 처우 관리',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 관리: 전국 교정시설 수용자 39,850명. 건강검진 125건, 면회 485건 처리.'
        },
        {
            timestamp: '2025-12-04 15:07:18',
            department: '범죄예방정책국',
            action: '전자감독 모니터링',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 경보: 전자발찌 착용자 18,500명 중 위치이탈 2건 탐지. 즉시 대응 조치 완료.'
        },
        {
            timestamp: '2025-12-04 15:00:45',
            department: '법무실',
            action: '법령안 AI 검토',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 검토: 형법 개정안 검토. 기존 법령과 충돌 0건. 판례 분석 완료. 승인 권고.'
        },
        {
            timestamp: '2025-12-04 14:53:31',
            department: '인권국',
            action: '인권침해 신고 접수',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 처리: 금일 신고 15건 접수. 긴급사안 0건. 일반조사 12건, 조정 3건 분류.'
        },
        {
            timestamp: '2025-12-04 14:46:27',
            department: '출입국·외국인정책본부',
            action: '불법체류자 단속',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 불법체류 의심자 35명 탐지. 현장단속 12명 적발. 출국명령 집행.'
        },
        {
            timestamp: '2025-12-04 14:39:13',
            department: '검찰국',
            action: '범죄피해자 구조금 지급',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 산정: 12월 구조금 신청 85건. 심사 완료 78건. 총 12억원 지급 결정.'
        },
        {
            timestamp: '2025-12-04 14:32:58',
            department: '범죄예방정책국',
            action: '보호관찰 대상자 관리',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 관리: 보호관찰 대상자 85,200명. 금주 면담 1,250건. 재범위험 평가 완료.'
        },
        {
            timestamp: '2025-12-04 14:25:44',
            department: '교정본부',
            action: '가석방 심사',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 심사: 가석방 신청 45건. 재범위험 평가·교화성적 분석. 승인 28건, 보류 17건.'
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
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 법무행정 로그</h2>
                <p className="text-blue-100 text-sm">
                    모든 범죄수사·교정처우·출입국심사는 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">오늘 처리건수</p>
                            <p className="text-2xl font-bold text-blue-800">12,458건</p>
                            <p className="text-xs text-gray-500">전일 대비 +3%</p>
                        </div>
                        <span className="text-3xl">⚖️</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동처리</p>
                            <p className="text-2xl font-bold text-indigo-800">12,183건</p>
                            <p className="text-xs text-gray-500">97.8%</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">장관 결재</p>
                            <p className="text-2xl font-bold text-blue-700">275건</p>
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
                            <p className="text-xs text-gray-500">위치이탈·범죄</p>
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
                        <option value="검찰국">검찰국</option>
                        <option value="교정본부">교정본부</option>
                        <option value="출입국·외국인정책본부">출입국·외국인정책본부</option>
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
                    <h3 className="text-xl font-bold text-gray-900">법무행정 로그</h3>
                    <button className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 text-sm font-medium">
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
            
            <div className="bg-blue-50 border-l-4 border-blue-700 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">🔒</span>
                    <div>
                        <h4 className="font-semibold text-blue-900 mb-1">개인정보 보호 안내</h4>
                        <p className="text-sm text-blue-800">
                            본 로그는 공개 가능한 정보만 표시됩니다. 
                            수사·재판 기밀 및 개인정보는 법령에 따라 별도 관리됩니다.
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
                            <div className="text-xl font-bold text-gray-900">67,892,345</div>
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
