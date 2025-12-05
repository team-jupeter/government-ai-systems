const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-04 14:58:32',
            department: '연구개발정책실',
            action: 'AI 반도체 R&D 과제 심사',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 평가: 신청 127건 분석. 기술성 S급 15건, A급 42건 선정. 예산 2,500억원 배분.'
        },
        {
            timestamp: '2025-12-04 14:52:18',
            department: '전파정책국',
            action: '불법 전파 자동 탐지',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 탐지: 서울·경기 불법 중계기 3개 발견. 위치 GPS 좌표 확보. 단속반 출동 지시.'
        },
        {
            timestamp: '2025-12-04 14:45:09',
            department: '정보통신정책실',
            action: '5G 네트워크 품질 분석',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 전국 5G 평균속도 1.2Gbps. 서울 1.5Gbps, 지방 950Mbps. 품질 정상.'
        },
        {
            timestamp: '2025-12-04 14:38:47',
            department: '과학기술혁신본부',
            action: '국가R&D 예산 심의',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 심의: 2026년 R&D 33조원. AI 5조, 반도체 4조, 바이오 3조, 우주 2조 배분.'
        },
        {
            timestamp: '2025-12-04 14:31:25',
            department: '통신정책국',
            action: '6G 기술개발 로드맵',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 6G 2028년 상용화 목표. 핵심기술 12개 선정. 투자 1.5조원 필요.'
        },
        {
            timestamp: '2025-12-04 14:24:13',
            department: '미래인재정책국',
            action: '이공계 장학금 심사',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 심사: 박사과정 신청자 2,345명. 성적·연구업적 분석. 장학생 500명 선발.'
        },
        {
            timestamp: '2025-12-04 14:17:08',
            department: '정보통신정책실',
            action: '사이버 위협 탐지',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 경고: 중국발 DDoS 공격 징후 포착. 초당 500GB 트래픽. 즉시 차단 조치.'
        },
        {
            timestamp: '2025-12-04 14:08:55',
            department: '방송진흥정책국',
            action: 'OTT 플랫폼 시장 분석',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: OTT 가입자 4,200만명. 넷플릭스 35%, 웨이브 18%, 티빙 15%.'
        },
        {
            timestamp: '2025-12-04 13:59:42',
            department: '연구개발정책실',
            action: '기초연구 성과 평가',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 평가: 2024년 SCI 논문 12,458편(+8%). Nature/Science 32편. 세계 12위.'
        },
        {
            timestamp: '2025-12-04 13:51:38',
            department: '우정사업본부',
            action: '우편물 배송 최적화',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 최적화: 일일 1,200만건 배송경로 자동생성. 배송시간 15% 단축 예상.'
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
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 과학기술·ICT 정책 로그</h2>
                <p className="text-purple-100 text-sm">
                    모든 R&D 심의·전파관리·정보보호는 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">오늘 정책결정</p>
                            <p className="text-2xl font-bold text-purple-600">4,567건</p>
                            <p className="text-xs text-gray-500">전일 대비 +5%</p>
                        </div>
                        <span className="text-3xl">🔬</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동처리</p>
                            <p className="text-2xl font-bold text-indigo-600">4,485건</p>
                            <p className="text-xs text-gray-500">98.2%</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">장관 결재</p>
                            <p className="text-2xl font-bold text-violet-600">82건</p>
                            <p className="text-xs text-gray-500">1.8%</p>
                        </div>
                        <span className="text-3xl">📝</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">긴급 조치</p>
                            <p className="text-2xl font-bold text-red-600">3건</p>
                            <p className="text-xs text-gray-500">사이버 위협 대응</p>
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
                        <option value="연구개발정책실">연구개발정책실</option>
                        <option value="정보통신정책실">정보통신정책실</option>
                        <option value="전파정책국">전파정책국</option>
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
                    <h3 className="text-xl font-bold text-gray-900">정책결정 로그</h3>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium">
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
            
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">ℹ️</span>
                    <div>
                        <h4 className="font-semibold text-purple-900 mb-1">투명성 안내</h4>
                        <p className="text-sm text-purple-800">
                            본 로그는 공개 가능한 정보만 표시됩니다. 
                            모든 과학기술·ICT 정책 과정은 오픈해시로 기록되어 투명하게 관리됩니다.
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
                            <div className="text-xl font-bold text-gray-900">58,234,567</div>
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
