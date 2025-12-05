const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-04 15:02:18',
            department: '인재정책실',
            action: '2026학년도 수능 채점 분석',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 응시자 48만명. 국어 표준점수 최고 145점, 수학 142점. 1등급컷 자동산출.'
        },
        {
            timestamp: '2025-12-04 14:56:09',
            department: '책임교육정책실',
            action: '2026 교육과정 개정안',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 검토: AI·디지털 교육 강화. 고교학점제 확대. 창의·융합 역량 중심 개편.'
        },
        {
            timestamp: '2025-12-04 14:48:37',
            department: '영유아정책국',
            action: '유보통합 추진 현황',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 모니터링: 전국 유치원 8,750개, 어린이집 28,500개. 2026년 통합 목표 진행률 78%.'
        },
        {
            timestamp: '2025-12-04 14:41:25',
            department: '지방교육지원국',
            action: '지방교육재정교부금 배분',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 산정: 2026년 교부금 81조원. 서울 8.2조, 경기 15.8조, 부산 4.1조 배분.'
        },
        {
            timestamp: '2025-12-04 14:33:58',
            department: '디지털교육기획관',
            action: 'AI 디지털교과서 적용',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 평가: 수학·영어·정보 과목 AI 교과서 시범운영. 학습효과 23% 향상.'
        },
        {
            timestamp: '2025-12-04 14:26:13',
            department: '평생직업교육국',
            action: '평생교육 이수자 분석',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 2025년 평생학습 참여자 1,280만명. 온라인 학습 68%, 오프라인 32%.'
        },
        {
            timestamp: '2025-12-04 14:18:47',
            department: '인재정책실',
            action: '국가장학금 지급 현황',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 산정: 2학기 장학금 4.2조원 지급. 소득분위별 자동산정. 수혜자 125만명.'
        },
        {
            timestamp: '2025-12-04 14:10:32',
            department: '교육복지돌봄지원국',
            action: '학교급식 품질 점검',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 경고: 전국 11,500개교 급식 모니터링. 3개교 식재료 품질 기준 미달 발견.'
        },
        {
            timestamp: '2025-12-04 14:02:55',
            department: '책임교육정책실',
            action: '학교안전 실시간 모니터링',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 감시: CCTV 24시간 분석. 이상행동 0건. 화재·침입 탐지 시스템 정상.'
        },
        {
            timestamp: '2025-12-04 13:54:18',
            department: '기획조정실',
            action: '2026년 교육예산 심의',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 심의: 총 97조원 배분. 유아교육 12조, 초중등 58조, 고등 27조 편성.'
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
            <div className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 교육정책 로그</h2>
                <p className="text-teal-100 text-sm">
                    모든 교육정책·입학전형·장학금은 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">오늘 정책결정</p>
                            <p className="text-2xl font-bold text-teal-600">3,892건</p>
                            <p className="text-xs text-gray-500">전일 대비 +4%</p>
                        </div>
                        <span className="text-3xl">📚</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동처리</p>
                            <p className="text-2xl font-bold text-cyan-600">3,825건</p>
                            <p className="text-xs text-gray-500">98.3%</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">장관 결재</p>
                            <p className="text-2xl font-bold text-emerald-600">67건</p>
                            <p className="text-xs text-gray-500">1.7%</p>
                        </div>
                        <span className="text-3xl">📝</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">긴급 조치</p>
                            <p className="text-2xl font-bold text-red-600">2건</p>
                            <p className="text-xs text-gray-500">학교안전 대응</p>
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
                        <option value="인재정책실">인재정책실</option>
                        <option value="책임교육정책실">책임교육정책실</option>
                        <option value="영유아정책국">영유아정책국</option>
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
                    <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm font-medium">
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
            
            <div className="bg-teal-50 border-l-4 border-teal-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">ℹ️</span>
                    <div>
                        <h4 className="font-semibold text-teal-900 mb-1">투명성 안내</h4>
                        <p className="text-sm text-teal-800">
                            본 로그는 공개 가능한 정보만 표시됩니다. 
                            모든 교육정책 과정은 오픈해시로 기록되어 투명하게 관리됩니다.
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
                            <div className="text-xl font-bold text-gray-900">47,892,345</div>
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
