const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-04 14:55:42',
            department: '예산실',
            action: '2026년 예산안 편성',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 2026년 총지출 685조원. 복지 212조, 교육 95조, 국방 68조 자동배정.'
        },
        {
            timestamp: '2025-12-04 14:48:15',
            department: '경제정책국',
            action: '2025년 4분기 경제전망',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 예측: GDP 성장률 2.3%, 물가상승률 2.1%. 고용률 68.5%. 정상 범위.'
        },
        {
            timestamp: '2025-12-04 14:42:08',
            department: '세제실',
            action: '2026년 세법개정안',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 검토: 법인세율 조정, 종부세 완화, 상속세 개편. 세수효과 5조원 예상.'
        },
        {
            timestamp: '2025-12-04 14:35:33',
            department: '국고국',
            action: '국채 발행 계획',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 산정: 12월 국채 15조원 발행. 금리 3.2%, 만기 10년. 시장수요 충분.'
        },
        {
            timestamp: '2025-12-04 14:28:19',
            department: '공공정책국',
            action: '공공기관 경영평가',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 평가: 370개 공공기관 경영실적 분석. S등급 45개, A등급 128개, B등급 152개.'
        },
        {
            timestamp: '2025-12-04 14:15:47',
            department: '국제금융국',
            action: 'IMF 연차협의',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 준비: IMF Article IV 협의 자료 작성. 경제지표 100개 항목 자동 정리.'
        },
        {
            timestamp: '2025-12-04 14:08:25',
            department: '재정정책국',
            action: '중장기 재정전망',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 경고: 2030년 국가채무비율 55% 예상. 재정건전성 관리 필요.'
        },
        {
            timestamp: '2025-12-04 13:55:13',
            department: '대외경제국',
            action: 'ODA 집행 현황',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 모니터링: 2025년 ODA 3.5조원 집행. 아시아 1.8조, 아프리카 1.2조.'
        },
        {
            timestamp: '2025-12-04 13:42:08',
            department: '예산실',
            action: '지방교부세 교부',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 산정: 12월 지방교부세 5.2조원 자동배분. 243개 지자체 교부 완료.'
        },
        {
            timestamp: '2025-12-04 13:28:35',
            department: '경제정책국',
            action: '민생경제 점검',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 소비자물가 2.1%, 실업률 2.8%, 가계소득 증가율 3.2%. 안정적.'
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
                <h2 className="text-2xl font-bold mb-2">실시간 재정·경제정책 로그</h2>
                <p className="text-blue-100 text-sm">
                    모든 예산편성·세제개편·경제정책은 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">오늘 정책결정</p>
                            <p className="text-2xl font-bold text-blue-600">3,456건</p>
                            <p className="text-xs text-gray-500">전일 대비 +3%</p>
                        </div>
                        <span className="text-3xl">💰</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동처리</p>
                            <p className="text-2xl font-bold text-indigo-600">3,378건</p>
                            <p className="text-xs text-gray-500">97.7%</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">장관 결재</p>
                            <p className="text-2xl font-bold text-purple-600">78건</p>
                            <p className="text-xs text-gray-500">2.3%</p>
                        </div>
                        <span className="text-3xl">📝</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">긴급 조치</p>
                            <p className="text-2xl font-bold text-red-600">2건</p>
                            <p className="text-xs text-gray-500">경제위기 대응</p>
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
                        <option value="예산실">예산실</option>
                        <option value="경제정책국">경제정책국</option>
                        <option value="세제실">세제실</option>
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
                            모든 재정·경제정책 과정은 오픈해시로 기록되어 투명하게 관리됩니다.
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
                            <div className="text-xl font-bold text-gray-900">42,789,012</div>
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
