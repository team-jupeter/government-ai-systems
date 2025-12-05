const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-04 10:55:42',
            department: '개인정보침해조사국',
            action: '개인정보 유출 신고 접수',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 분석: A쇼핑몰 고객정보 12만건 유출 의심. 신용카드 정보 포함. 긴급 조사 필요.'
        },
        {
            timestamp: '2025-12-04 10:48:15',
            department: '개인정보분쟁조정국',
            action: '분쟁조정 신청',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 처리: B은행 개인정보 무단수집 관련 분쟁조정 신청. 유사사례 검색 완료.'
        },
        {
            timestamp: '2025-12-04 10:42:08',
            department: '개인정보침해조사국',
            action: '과징금 부과 결정',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 산정: C플랫폼 개인정보 보호법 위반. 과징금 8억 5천만원 부과 결정.'
        },
        {
            timestamp: '2025-12-04 10:35:33',
            department: '개인정보보호기반국',
            action: '개인정보 영향평가',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 검토: D공공기관 마이데이터 시스템 영향평가. 보안조치 적정. 승인.'
        },
        {
            timestamp: '2025-12-04 10:28:19',
            department: '개인정보침해조사국',
            action: 'CCTV 불법 설치 적발',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 탐지: E아파트 화장실 인근 CCTV 설치. 개인정보 침해. 시정명령 준비.'
        },
        {
            timestamp: '2025-12-04 10:15:47',
            department: '개인정보정책국',
            action: '개인정보 보호지침 개정',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 검토: AI 활용 개인정보 처리 표준지침 개정안 검토 완료. 위원회 상정.'
        },
        {
            timestamp: '2025-12-04 10:08:25',
            department: '개인정보분쟁조정국',
            action: '집단분쟁조정 개시',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분류: F통신사 개인정보 무단제공 집단분쟁조정 신청 450건. 통합 처리.'
        },
        {
            timestamp: '2025-12-04 09:55:13',
            department: '개인정보침해조사국',
            action: '마이데이터 사업자 점검',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 점검: G핀테크 마이데이터 보안조치 현황 점검. 암호화 적정. 정상.'
        },
        {
            timestamp: '2025-12-04 09:42:08',
            department: '개인정보보호기반국',
            action: 'AI 프라이버시 가이드 발간',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 작성: 생성형 AI 개인정보 보호 가이드라인 초안 작성 완료.'
        },
        {
            timestamp: '2025-12-04 09:28:35',
            department: '개인정보침해조사국',
            action: '해외 사업자 과징금',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 산정: H글로벌플랫폼 국외이전 규정 위반. 과징금 13억원 부과.'
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
            <div className="bg-gradient-to-r from-indigo-800 to-blue-900 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 개인정보 보호 로그</h2>
                <p className="text-indigo-100 text-sm">
                    모든 개인정보 침해조사·분쟁조정·과징금 부과는 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">오늘 신고</p>
                            <p className="text-2xl font-bold text-indigo-600">4,567건</p>
                            <p className="text-xs text-gray-500">전일 대비 +8%</p>
                        </div>
                        <span className="text-3xl">📞</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동처리</p>
                            <p className="text-2xl font-bold text-blue-600">4,456건</p>
                            <p className="text-xs text-gray-500">97.5%</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">조사 진행</p>
                            <p className="text-2xl font-bold text-purple-600">111건</p>
                            <p className="text-xs text-gray-500">2.5%</p>
                        </div>
                        <span className="text-3xl">🔍</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">긴급 대응</p>
                            <p className="text-2xl font-bold text-red-600">8건</p>
                            <p className="text-xs text-gray-500">즉시 조치</p>
                        </div>
                        <span className="text-3xl">⚠️</span>
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
                        <option value="침해조사국">침해조사국</option>
                        <option value="분쟁조정국">분쟁조정국</option>
                        <option value="정책국">정책국</option>
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
                    <h3 className="text-xl font-bold text-gray-900">침해조사 로그</h3>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
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
            
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">ℹ️</span>
                    <div>
                        <h4 className="font-semibold text-indigo-900 mb-1">투명성 안내</h4>
                        <p className="text-sm text-indigo-800">
                            본 로그는 공개 가능한 정보만 표시됩니다. 
                            모든 침해조사·과징금 부과 과정은 오픈해시로 기록되어 투명하게 관리됩니다.
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
                            <div className="text-xl font-bold text-gray-900">31,567,890</div>
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
