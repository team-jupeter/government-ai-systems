const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-04 15:42:28',
            department: '보훈예우국',
            action: '보훈급여 자동 지급',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 처리: 12월 보훈급여 지급. 참전유공자 보상금 32만건, 유족 연금 25만건 자동 이체 완료.'
        },
        {
            timestamp: '2025-12-04 15:35:15',
            department: '보훈의료복지국',
            action: '보훈병원 진료 처리',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 관리: 금일 보훈병원 진료 3,850건. 외래 2,800건, 입원 1,050건. 대기시간 평균 12분.'
        },
        {
            timestamp: '2025-12-04 15:28:47',
            department: '제대군인정책국',
            action: '제대군인 취업 상담',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 상담: 금일 취업상담 520건. 직업훈련 안내 180건, 채용정보 제공 340건 처리.'
        },
        {
            timestamp: '2025-12-04 15:21:33',
            department: '보훈문화국',
            action: '국립묘지 안장 신청',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 심사: 국립묘지 안장 신청 8건 접수. 참전유공자 5건, 순직군경 3건. 자격 심사 완료.'
        },
        {
            timestamp: '2025-12-04 15:14:19',
            department: '보훈예우국',
            action: '국가유공자 등록 심사',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 심사: 신규 국가유공자 등록 45건. 참전유공자 28건, 공상군경 17건 심사 완료.'
        },
        {
            timestamp: '2025-12-04 15:07:52',
            department: '보훈의료복지국',
            action: '위탁병원 의료비 지급',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 처리: 위탁병원 의료비 2,450건 심사. 총 12억원 지급 승인. 평균 처리시간 3분.'
        },
        {
            timestamp: '2025-12-04 15:00:38',
            department: '제대군인정책국',
            action: '제대군인 창업 지원',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 심사: 창업자금 대부 신청 35건. 적격 심사 완료 28건, 부적격 7건. 승인금액 14억원.'
        },
        {
            timestamp: '2025-12-04 14:53:24',
            department: '보훈문화국',
            action: '현충시설 방문 관리',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 관제: 금일 국립묘지 방문객 4,850명. 서울현충원 3,200명, 대전현충원 1,650명.'
        },
        {
            timestamp: '2025-12-04 14:46:11',
            department: '보훈예우국',
            action: '보훈수당 자격 심사',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 심사: 생활조정수당 신규 신청 280건. 적격 235건, 보완 필요 45건. 자동 통지 발송.'
        },
        {
            timestamp: '2025-12-04 14:38:57',
            department: '제대군인정책국',
            action: '제대군인 직업훈련',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 경고: 직업훈련 수료율 저조 과정 5개 탐지. 교육기관 관리 강화 권고.'
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
            <div className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 보훈 로그</h2>
                <p className="text-purple-100 text-sm">
                    모든 보훈급여·의료지원·제대군인지원은 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">오늘 처리건수</p>
                            <p className="text-2xl font-bold text-purple-800">42,850건</p>
                            <p className="text-xs text-gray-500">전일 대비 +3%</p>
                        </div>
                        <span className="text-3xl">🎖️</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동처리</p>
                            <p className="text-2xl font-bold text-indigo-800">41,908건</p>
                            <p className="text-xs text-gray-500">97.8%</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">장관 결재</p>
                            <p className="text-2xl font-bold text-purple-700">942건</p>
                            <p className="text-xs text-gray-500">2.2%</p>
                        </div>
                        <span className="text-3xl">📝</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">긴급 지원</p>
                            <p className="text-2xl font-bold text-indigo-700">12건</p>
                            <p className="text-xs text-gray-500">의료·복지</p>
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
                        <option value="보훈예우국">보훈예우국</option>
                        <option value="보훈의료복지국">보훈의료복지국</option>
                        <option value="제대군인정책국">제대군인정책국</option>
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
                    <h3 className="text-xl font-bold text-gray-900">보훈 로그</h3>
                    <button className="px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-900 text-sm font-medium">
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
            
            <div className="bg-purple-50 border-l-4 border-purple-800 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">ℹ️</span>
                    <div>
                        <h4 className="font-semibold text-purple-900 mb-1">개인정보 보호</h4>
                        <p className="text-sm text-purple-800">
                            본 로그는 공개 가능한 정보만 표시됩니다. 
                            국가유공자 및 제대군인 개인정보는 개인정보보호법에 따라 엄격히 보호됩니다.
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
                            <div className="text-xl font-bold text-gray-900">128,456,789</div>
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
