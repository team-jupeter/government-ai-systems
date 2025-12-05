const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-04 16:15:42',
            department: '식량정책국',
            action: '농업직불금 자동 지급',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 심사: 12월 직불금 85,200농가 지급. 공익직불금 78,500농가, 쌀직불금 6,700농가 승인.'
        },
        {
            timestamp: '2025-12-04 16:08:28',
            department: '축산정책국',
            action: '가축질병 실시간 감시',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 모니터링: 전국 축산농가 50,000호 실시간 감시. 구제역·AI 의심증상 0건. 정상.'
        },
        {
            timestamp: '2025-12-04 16:01:15',
            department: '농업혁신정책실',
            action: '스마트팜 지원금 심사',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 처리: 스마트팜 보급사업 350건 심사. 시설원예 200건, 축사자동화 150건 승인.'
        },
        {
            timestamp: '2025-12-04 15:54:03',
            department: '유통소비정책관',
            action: '농산물 가격 예측',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 금주 배추 가격 안정 예측. 공급량 충분, 김장수요 대비 가격 하락 전망.'
        },
        {
            timestamp: '2025-12-04 15:46:51',
            department: '농촌정책국',
            action: '귀농귀촌 지원금 지급',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 심사: 귀농귀촌 지원금 280건 승인. 창업자금 180건, 주택구입 100건 지급.'
        },
        {
            timestamp: '2025-12-04 15:39:37',
            department: '축산정책국',
            action: '축산물 이력제 관리',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 관제: 금일 도축·가공 이력 28,500건 등록. 한우 12,000두, 돼지 16,500두 추적 완료.'
        },
        {
            timestamp: '2025-12-04 15:32:24',
            department: '식량정책국',
            action: '쌀 수급 조절 분석',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 2025년 쌀 생산량 380만톤 예측. 적정재고 유지, 가격 안정 전망.'
        },
        {
            timestamp: '2025-12-04 15:25:11',
            department: '농업혁신정책실',
            action: '농작물 재해보험 보상',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 심사: 태풍 피해 재해보험금 1,250건 산정. 총 38억원 자동 지급 승인.'
        },
        {
            timestamp: '2025-12-04 15:17:58',
            department: '유통소비정책관',
            action: '농산물 수출 실적 분석',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 11월 농식품 수출 8.5억달러. 신선농산물 3.2억, 가공식품 5.3억 달러.'
        },
        {
            timestamp: '2025-12-04 15:10:45',
            department: '축산정책국',
            action: '가축분뇨 처리시설 점검',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 경고: 경기 일부 지역 가축분뇨 처리시설 과부하 감지. 즉각 점검 필요.'
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
            <div className="bg-gradient-to-r from-green-700 to-emerald-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 농림축산 로그</h2>
                <p className="text-green-100 text-sm">
                    모든 농업직불금·가축질병관리·재해보험은 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">오늘 처리건수</p>
                            <p className="text-2xl font-bold text-green-700">126,850건</p>
                            <p className="text-xs text-gray-500">전일 대비 +3%</p>
                        </div>
                        <span className="text-3xl">🌾</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동처리</p>
                            <p className="text-2xl font-bold text-emerald-700">124,947건</p>
                            <p className="text-xs text-gray-500">98.5%</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">장관 결재</p>
                            <p className="text-2xl font-bold text-green-800">1,903건</p>
                            <p className="text-xs text-gray-500">1.5%</p>
                        </div>
                        <span className="text-3xl">📝</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">긴급 대응</p>
                            <p className="text-2xl font-bold text-emerald-800">1건</p>
                            <p className="text-xs text-gray-500">가축질병</p>
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
                        <option value="식량정책국">식량정책국</option>
                        <option value="축산정책국">축산정책국</option>
                        <option value="농촌정책국">농촌정책국</option>
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
                    <h3 className="text-xl font-bold text-gray-900">농림축산 로그</h3>
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
                                        오픈해시 기록됨
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-700 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">ℹ️</span>
                    <div>
                        <h4 className="font-semibold text-green-900 mb-1">투명성 안내</h4>
                        <p className="text-sm text-green-800">
                            본 로그는 공개 가능한 정보만 표시됩니다. 
                            농가 개인정보 및 정부기밀은 관련 법령에 따라 별도 관리됩니다.
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
                            <div className="text-xl font-bold text-gray-900">192,567,890</div>
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
