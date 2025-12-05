const { useState } = React;

const ActivityLogs = () => {
    const mockLogs = [
        {
            timestamp: '2025-12-04 16:32:18',
            department: '무역투자실',
            action: '수출입 통관 자동화',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 처리: 금일 통관 35,800건. 수출 18,500건, 수입 17,300건 자동 승인.'
        },
        {
            timestamp: '2025-12-04 16:25:05',
            department: '통상교섭본부',
            action: 'FTA 원산지 검증',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 검증: FTA 원산지증명 12,850건 자동 심사. 적격 12,720건, 부적격 130건.'
        },
        {
            timestamp: '2025-12-04 16:17:52',
            department: '에너지자원실',
            action: '전력수급 실시간 예측',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 예측: 금일 전력수요 85,200MW. 공급여력 충분, 예비율 15.2% 유지.'
        },
        {
            timestamp: '2025-12-04 16:10:39',
            department: '산업정책실',
            action: '산업기술 R&D 과제 평가',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 심사: 신규과제 280건 평가. 우수 85건, 보통 180건, 부적격 15건 선정.'
        },
        {
            timestamp: '2025-12-04 16:03:26',
            department: '무역투자실',
            action: '외국인투자 신고 처리',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 처리: 외국인투자 신고 45건. 제조업 28건, 서비스업 17건 자동 승인.'
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-800 to-indigo-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 산업통상 로그</h2>
                <p className="text-blue-100 text-sm">
                    모든 수출입통관·FTA원산지·전력거래는 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-sm text-gray-600">오늘 처리건수</p>
                    <p className="text-2xl font-bold text-blue-800">158,230건</p>
                    <p className="text-xs text-gray-500">전일 대비 +4%</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-sm text-gray-600">AI 자동처리</p>
                    <p className="text-2xl font-bold text-indigo-800">156,331건</p>
                    <p className="text-xs text-gray-500">98.8%</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-sm text-gray-600">장관 결재</p>
                    <p className="text-2xl font-bold text-blue-700">1,899건</p>
                    <p className="text-xs text-gray-500">1.2%</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-sm text-gray-600">긴급 대응</p>
                    <p className="text-2xl font-bold text-indigo-700">0건</p>
                    <p className="text-xs text-gray-500">안정</p>
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
