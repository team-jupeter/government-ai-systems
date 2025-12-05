const AIAutomation = () => {
    const automationData = [
        { category: '영사 민원 처리', rate: 99, daily: '8,500건', description: '아포스티유, 비자, 증명서 자동 발급' },
        { category: '동포 정보 관리', rate: 99, daily: '12,000건', description: '750만 동포 데이터 실시간 업데이트' },
        { category: '지원사업 심사', rate: 98, daily: '2,800건', description: '장학금, 창업지원금 자동 심사' },
        { category: '네트워크 매칭', rate: 99, daily: '4,200건', description: 'AI 기반 동포단체 매칭' },
        { category: '교육 프로그램', rate: 97, daily: '6,500건', description: '한국어·문화 교육 자동 배정' },
        { category: '민원 상담', rate: 98, daily: '15,000건', description: '24시간 AI 자동 상담' }
    ];

    const benefits = [
        { metric: '민원 처리 시간', before: '10일', after: '1일', improvement: '90%' },
        { metric: '처리 인력', before: '280명', after: '28명', improvement: '90%' },
        { metric: '동포 만족도', before: '68%', after: '94%', improvement: '26%p' },
        { metric: '지원금 집행 속도', before: '30일', after: '3일', improvement: '90%' }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">AI 자동화 현황</h2>
                <p className="text-sm text-gray-600 mt-1">DeepSeek R1 기반 재외동포 업무 자동화</p>
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
                                    <td className="px-6 py-4 text-sm text-center text-green-700 font-semibold">{item.rate}%</td>
                                    <td className="px-6 py-4 text-sm text-right text-gray-900">{item.daily}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-50 border-t">
                            <tr>
                                <td colSpan="2" className="px-6 py-3 text-sm font-semibold text-gray-900">전체 평균</td>
                                <td className="px-6 py-3 text-sm text-center font-semibold text-green-700">98.8%</td>
                                <td className="px-6 py-3 text-sm text-right font-semibold text-gray-900">49,000건</td>
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
                                    <td className="px-6 py-4 text-sm text-center text-green-700 font-semibold">{benefit.after}</td>
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
                        <span className="ml-2">DeepSeek R1 (다국어 지원)</span>
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
