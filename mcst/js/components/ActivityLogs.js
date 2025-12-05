const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-04 15:48:35',
            department: '문화예술정책실',
            action: '예술인 창작지원금 지급',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 심사: 12월 창작지원금 3,850건. 시각예술 1,200건, 공연예술 1,450건, 문학 1,200건 승인.'
        },
        {
            timestamp: '2025-12-04 15:41:22',
            department: '관광정책국',
            action: '관광안내 AI 서비스',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 처리: 금일 관광정보 제공 28,500건. 외국인 18,200건, 내국인 10,300건. 다국어 자동 번역.'
        },
        {
            timestamp: '2025-12-04 15:34:18',
            department: '체육국',
            action: '공공체육시설 예약',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 관리: 금일 체육시설 예약 12,850건. 수영장 4,200건, 체육관 5,300건, 운동장 3,350건.'
        },
        {
            timestamp: '2025-12-04 15:27:05',
            department: '문화콘텐츠산업실',
            action: '저작권 침해 신고 처리',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 심사: 저작권 침해 신고 850건 접수. 음악 350건, 영상 300건, 출판 200건 검토 완료.'
        },
        {
            timestamp: '2025-12-04 15:19:52',
            department: '국민소통실',
            action: '정부정책 브리핑',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 금일 정책브리핑 15건 발표. 언론보도 450건, SNS 반응 85,000건 실시간 모니터링.'
        },
        {
            timestamp: '2025-12-04 15:12:38',
            department: '문화예술정책실',
            action: '박물관·미술관 운영',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 관제: 금일 박물관·미술관 방문객 45,200명. 온라인 전시 조회 128,500건.'
        },
        {
            timestamp: '2025-12-04 15:05:24',
            department: '관광정책국',
            action: '관광숙박업소 점검',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 점검: 전국 관광숙박업소 5,200개소 자동 점검. 위생·안전 기준 충족 5,150개소.'
        },
        {
            timestamp: '2025-12-04 14:58:11',
            department: '체육국',
            action: '체육인 복지 지원',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 처리: 은퇴 선수 지원금 280건 심사. 직업전환 교육 150건, 취업 지원 130건 승인.'
        },
        {
            timestamp: '2025-12-04 14:50:57',
            department: '문화콘텐츠산업실',
            action: '콘텐츠 제작 지원',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 심사: 콘텐츠 제작지원금 320건. 영화 85건, 드라마 120건, 게임 115건 승인.'
        },
        {
            timestamp: '2025-12-04 14:43:42',
            department: '국민소통실',
            action: '언론 모니터링',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 경고: 정책 관련 부정 여론 3건 탐지. 즉각 대응 권고. 팩트체크 자료 준비 중.'
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
            <div className="bg-gradient-to-r from-pink-700 to-rose-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 문화체육관광 로그</h2>
                <p className="text-pink-100 text-sm">
                    모든 문화예술지원·체육지원·관광진흥은 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">오늘 처리건수</p>
                            <p className="text-2xl font-bold text-pink-700">65,820건</p>
                            <p className="text-xs text-gray-500">전일 대비 +5%</p>
                        </div>
                        <span className="text-3xl">🎭</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동처리</p>
                            <p className="text-2xl font-bold text-rose-700">64,635건</p>
                            <p className="text-xs text-gray-500">98.2%</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">장관 결재</p>
                            <p className="text-2xl font-bold text-pink-800">1,185건</p>
                            <p className="text-xs text-gray-500">1.8%</p>
                        </div>
                        <span className="text-3xl">📝</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">긴급 브리핑</p>
                            <p className="text-2xl font-bold text-rose-800">3건</p>
                            <p className="text-xs text-gray-500">정부대변인</p>
                        </div>
                        <span className="text-3xl">📢</span>
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
                        <option value="문화예술정책실">문화예술정책실</option>
                        <option value="관광정책국">관광정책국</option>
                        <option value="체육국">체육국</option>
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
                    <h3 className="text-xl font-bold text-gray-900">문화체육관광 로그</h3>
                    <button className="px-4 py-2 bg-pink-700 text-white rounded-lg hover:bg-pink-800 text-sm font-medium">
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
            
            <div className="bg-pink-50 border-l-4 border-pink-700 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">ℹ️</span>
                    <div>
                        <h4 className="font-semibold text-pink-900 mb-1">투명성 안내</h4>
                        <p className="text-sm text-pink-800">
                            본 로그는 공개 가능한 정보만 표시됩니다. 
                            예술인 개인정보 및 정부기밀은 관련 법령에 따라 별도 관리됩니다.
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
                            <div className="text-xl font-bold text-gray-900">186,234,567</div>
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
