const AIAutomation = () => {
    const automationData = [
        { category: '발사체 데이터 분석', rate: 99, daily: '1.2TB', description: '텔레메트리 실시간 분석' },
        { category: '위성 관제 모니터링', rate: 99, daily: '850GB', description: '24시간 자동 관제' },
        { category: '우주환경 예측', rate: 99, daily: '480건', description: 'AI 기반 우주기상 예측' },
        { category: 'R&D 과제 심사', rate: 100, daily: '320건', description: '자동 기술평가 시스템' },
        { category: '우주자산 관리', rate: 98, daily: '1,250건', description: '위성·발사체 자산 추적' },
        { category: '국제협력 문서', rate: 97, daily: '180건', description: '협약서 자동 분석' }
    ];

    const benefits = [
        { metric: '데이터 처리 시간', before: '30일', after: '2.4일', improvement: '92%' },
        { metric: '관제 인력', before: '120명', after: '12명', improvement: '90%' },
        { metric: '발사 성공률', before: '75%', after: '100%', improvement: '25%p' },
        { metric: '예산 집행 속도', before: '90일', after: '7일', improvement: '92.2%' }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">AI 자동화 현황</h2>
                <p className="text-sm text-gray-600 mt-1">DeepSeek R1 기반 우주항공 업무 자동화</p>
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
                                <td className="px-6 py-3 text-sm text-center font-semibold text-blue-700">99.2%</td>
                                <td className="px-6 py-3 text-sm text-right font-semibold text-gray-900">-</td>
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
                        <span className="ml-2">DeepSeek R1 (우주 데이터 특화)</span>
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
