const AIAutomation = () => {
    const automationData = [
        { category: '수산물 유통 관리', rate: 99, daily: '58,250건', description: '원산지 검증, 위판 데이터 처리' },
        { category: '항만 물동량 처리', rate: 99, daily: '165,800TEU', description: '선박 입출항, 화물 처리' },
        { category: '해양환경 감시', rate: 98, daily: '1,285개 지점', description: '수질 분석, 적조 감지' },
        { category: '어업 허가 심사', rate: 97, daily: '2,450건', description: '어업면허, TAC 관리' },
        { category: '선박 안전 검사', rate: 96, daily: '1,680척', description: '정기검사, 출항 전 점검' },
        { category: '수산물 품질 검사', rate: 98, daily: '12,350건', description: '안전성 검사, 중금속 분석' }
    ];

    const benefits = [
        { metric: '업무 처리 시간', before: '평균 4.2시간', after: '평균 8분', improvement: '96.8% 단축' },
        { metric: '인력 효율성', before: '1,850명 필요', after: '185명 운영', improvement: '90% 절감' },
        { metric: '수산물 안전성', before: '표본 검사 5%', after: '전수 검사 100%', improvement: '95%p 향상' },
        { metric: '항만 처리 능력', before: '12시간/척', after: '2시간/척', improvement: '83.3% 증가' }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-3xl font-bold text-gray-900">AI 자동화 현황</h2>
                <p className="text-gray-600 mt-2">DeepSeek R1 기반 해양수산 업무 자동화</p>
            </div>

            <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-8 text-white">
                <div className="text-center">
                    <div className="text-lg opacity-90">해양수산부 전체 AI 자동화율</div>
                    <div className="text-6xl font-bold mt-4">98.5%</div>
                    <div className="text-sm mt-2 opacity-90">DeepSeek R1 + OpenHash 기반</div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">📊 분야별 자동화 현황</h3>
                <div className="space-y-4">
                    {automationData.map((item, idx) => (
                        <div key={idx} className="bg-white border-2 border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-bold text-gray-900">{item.category}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-teal-600">{item.rate}%</div>
                                    <div className="text-xs text-gray-500">일일 {item.daily}</div>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-gradient-to-r from-teal-500 to-blue-600 h-3 rounded-full" style={{width: `${item.rate}%`}}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">📈 자동화 효과</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {benefits.map((benefit, idx) => (
                        <div key={idx} className="bg-white border-2 border-blue-200 rounded-lg p-4">
                            <h4 className="font-bold text-gray-900 mb-3">{benefit.metric}</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">이전</span>
                                    <span className="font-semibold text-gray-700">{benefit.before}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">현재</span>
                                    <span className="font-semibold text-teal-600">{benefit.after}</span>
                                </div>
                                <div className="pt-2 border-t text-center">
                                    <span className="text-lg font-bold text-blue-600">{benefit.improvement}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

(() => AIAutomation)();
