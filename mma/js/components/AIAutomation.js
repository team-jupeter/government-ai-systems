const AIAutomation = () => {
    const automationData = [
        { category: '병역판정검사 예약', rate: 99, daily: '2,500건', description: '온라인 자동 예약 및 확인' },
        { category: '입영통지서 발송', rate: 99, daily: '1,200건', description: 'AI 기반 자동 발송' },
        { category: '국외여행 허가', rate: 99, daily: '8,500건', description: '실시간 자동 심사' },
        { category: '사회복무요원 관리', rate: 98, daily: '15,000건', description: '출결 및 복무 자동 관리' },
        { category: '산업기능요원 심사', rate: 98, daily: '850건', description: '편입 자격 자동 검증' },
        { category: '병적기록 관리', rate: 99, daily: '50,000건', description: '실시간 기록 업데이트' }
    ];

    const benefits = [
        { metric: '민원 처리 시간', before: '7일', after: '0.84일', improvement: '88%' },
        { metric: '입영통지 발송', before: '3일', after: '즉시', improvement: '100%' },
        { metric: '국외여행 허가', before: '5일', after: '0.5일', improvement: '90%' },
        { metric: '복무관리 효율', before: '수동 점검', after: 'AI 자동', improvement: '95%' }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">AI 자동화 현황</h2>
                <p className="text-sm text-gray-600 mt-1">DeepSeek R1 기반 병무행정 자동화</p>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">분야별 자동화 현황</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">업무 분야</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">설명</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">자동화율</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">일일 처리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {automationData.map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.category}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{item.description}</td>
                                    <td className="px-6 py-4 text-sm text-center font-semibold" style={{color: '#65671f'}}>{item.rate}%</td>
                                    <td className="px-6 py-4 text-sm text-right text-gray-900">{item.daily}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-50 border-t">
                            <tr>
                                <td colSpan="2" className="px-6 py-3 text-sm font-semibold text-gray-900">전체 평균</td>
                                <td className="px-6 py-3 text-sm text-center font-semibold" style={{color: '#65671f'}}>98.9%</td>
                                <td className="px-6 py-3 text-sm text-right font-semibold text-gray-900">78,050건</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">자동화 효과 분석</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">평가 지표</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">이전</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">현재</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">개선율</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {benefits.map((benefit, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{benefit.metric}</td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-700">{benefit.before}</td>
                                    <td className="px-6 py-4 text-sm text-center font-semibold" style={{color: '#65671f'}}>{benefit.after}</td>
                                    <td className="px-6 py-4 text-sm text-center font-semibold" style={{color: '#65671f'}}>{benefit.improvement}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-gray-50 border rounded-lg p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">기술 스택</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                        <span className="font-semibold text-gray-900">AI 모델:</span>
                        <span className="ml-2">DeepSeek R1 (병무 특화)</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-900">블록체인:</span>
                        <span className="ml-2">OpenHash (에너지 효율 98.5%)</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-900">데이터 연동:</span>
                        <span className="ml-2">국가데이터처 실시간 동기화</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-900">처리 방식:</span>
                        <span className="ml-2">AI 에이전트 기반 자동 처리</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

(() => AIAutomation)();
