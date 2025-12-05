const { useState } = React;
const ActivityLogs = () => {
    const mockLogs = [
        { timestamp: '2025-12-04 16:45:12', department: '건강보험정책국', action: '예산 자동 배분', user: 'AI 자동분석', status: 'success', details: 'AI 심사: 금일 진료비 청구 285,000건. 자동 승인 282,150건, 추가심사 2,850건.' },
        { timestamp: '2025-12-04 16:38:05', department: '사회복지정책실', action: '기초수급자 선정', user: 'AI 자동분석', status: 'success', details: 'AI 조사: 기초수급 신청 1,850건. 소득·재산 자동조사 완료. 적격 1,685건 승인.' },
        { timestamp: '2025-12-04 16:30:51', department: '노인정책관', action: '노인장기요양 등급판정', user: 'AI 자동분석', status: 'success', details: 'AI 판정: 장기요양 신청 580건. 1등급 85건, 2등급 180건, 3등급 220건 판정.' },
        { timestamp: '2025-12-04 16:23:38', department: '장애인정책국', action: '장애인활동지원 지급', user: 'AI 자동분석', status: 'success', details: 'AI 처리: 활동지원급여 32,500명 자동 지급. 월 평균 135만원.' }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-slate-700 to-gray-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 보건복지 로그</h2>
                <p className="text-blue-100 text-sm">모든 건강보험·복지급여는 실시간으로 기록됩니다</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-sm text-gray-600">오늘 처리건수</p>
                    <p className="text-2xl font-bold text-slate-500">325,180건</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-sm text-gray-600">AI 자동처리</p>
                    <p className="text-2xl font-bold text-slate-500">321,603건</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-sm text-gray-600">장관 결재</p>
                    <p className="text-2xl font-bold text-slate-600">3,577건</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-sm text-gray-600">긴급 대응</p>
                    <p className="text-2xl font-bold text-slate-600">0건</p>
                </div>
            </div>
            
            <div className="space-y-3">
                {mockLogs.map((log, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <h4 className="font-semibold text-gray-900">{log.action}</h4>
                                <p className="text-sm text-gray-600">{log.department}</p>
                            </div>
                            <p className="text-xs text-gray-500">{log.timestamp}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">{log.details}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
window.ActivityLogs = ActivityLogs;
