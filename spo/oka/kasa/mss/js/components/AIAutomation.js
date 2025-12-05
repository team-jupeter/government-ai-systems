const AIAutomation = () => {
    const automationData = [
        { category: '창업지원 심사', rate: 99, daily: '2,450건', description: '사업계획서 자동 분석 및 평가' },
        { category: '자금융자 처리', rate: 98, daily: '1,850건', description: '신용평가 및 대출 심사 자동화' },
        { category: '판로개척 매칭', rate: 99, daily: '3,200건', description: 'AI 기반 바이어 자동 매칭' },
        { category: '벤처인증 심사', rate: 97, daily: '850건', description: '기술력 평가 및 인증 발급' },
        { category: '지원사업 추천', rate: 99, daily: '12,500건', description: '기업 맞춤형 지원 정보 제공' },
        { category: '경영진단 분석', rate: 96, daily: '4,200건', description: '재무·경영 상태 자동 진단' }
    ];

    const benefits = [
        { metric: '심사 처리 시간', before: '15일', after: '2일', improvement: '86.7%' },
        { metric: '인력 효율성', before: '850명', after: '85명', improvement: '90%' },
        { metric: '창업 성공률', before: '62%', after: '89%', improvement: '27%p' },
        { metric: '지원금 집행 속도', before: '60일', after: '7일', improvement: '88.3%' }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">AI 자동화 현황</h2>
                <p className="text-sm text-gray-600 mt-1">DeepSeek R1 기반 중소벤처 업무 자동화</p>
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
                                    <td className="px-6 py-4 text-sm text-center text-blue-700 font-semibold">{item.rate}%</td>
                                    <td className="px-6 py-4 text-sm text-right text-gray-900">{item.daily}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-50 border-t">
                            <tr>
                                <td colSpan="2" className="px-6 py-3 text-sm font-semibold text-gray-900">전체 평균</td>
                                <td className="px-6 py-3 text-sm text-center font-semibold text-blue-700">98.7%</td>
                                <td className="px-6 py-3 text-sm text-right font-semibold text-gray-900">24,050건</td>
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
                                    <td className="px-6 py-4 text-sm text-center text-blue-700 font-semibold">{benefit.after}</td>
                                    <td className="px-6 py-4 text-sm text-center text-green-700 font-semibold">{benefit.improvement}</td>
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
                        <span className="ml-2">DeepSeek R1 (추론 최적화)</span>
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
