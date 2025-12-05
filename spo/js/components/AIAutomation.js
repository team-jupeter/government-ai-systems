const AIAutomation = () => {
    const automationData = [
        { category: '사건 접수 및 배당', rate: 99, daily: '12,500건', description: '자동 접수 및 검사 배당' },
        { category: '사건 기록 분석', rate: 99, daily: '18,000건', description: 'AI 기반 증거 및 기록 분석' },
        { category: '공소장 작성 지원', rate: 99, daily: '3,800건', description: 'AI 공소장 초안 작성' },
        { category: '판례 검색 및 분석', rate: 100, daily: '25,000건', description: '관련 판례 자동 검색' },
        { category: '증거물 관리', rate: 98, daily: '8,500건', description: '디지털 증거물 분석' },
        { category: '형 집행 지휘', rate: 99, daily: '2,200건', description: '형 집행 명령 자동 처리' }
    ];

    const benefits = [
        { metric: '사건 처리 시간', before: '30일', after: '2.4일', improvement: '92%' },
        { metric: '검사 1인당 처리', before: '120건/년', after: '1,500건/년', improvement: '1,150%' },
        { metric: '공소장 작성 시간', before: '4시간', after: '15분', improvement: '93.8%' },
        { metric: '판례 검색 정확도', before: '75%', after: '99.2%', improvement: '24.2%p' }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">AI 자동화 현황</h2>
                <p className="text-sm text-gray-600 mt-1">DeepSeek R1 기반 검찰 업무 자동화</p>
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
                                    <td className="px-6 py-4 text-sm text-center text-blue-900 font-semibold">{item.rate}%</td>
                                    <td className="px-6 py-4 text-sm text-right text-gray-900">{item.daily}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-50 border-t">
                            <tr>
                                <td colSpan="2" className="px-6 py-3 text-sm font-semibold text-gray-900">전체 평균</td>
                                <td className="px-6 py-3 text-sm text-center font-semibold text-blue-900">99.2%</td>
                                <td className="px-6 py-3 text-sm text-right font-semibold text-gray-900">70,000건</td>
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
                                    <td className="px-6 py-4 text-sm text-center text-blue-900 font-semibold">{benefit.after}</td>
                                    <td className="px-6 py-4 text-sm text-center text-blue-900 font-semibold">{benefit.improvement}</td>
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
                        <span className="ml-2">DeepSeek R1 (법률 특화)</span>
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
