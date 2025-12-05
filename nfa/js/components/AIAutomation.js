const AIAutomation = () => {
    const automationData = [
        { category: '119 신고 접수', rate: 99, daily: '8,800건', model: 'DeepSeek R1' },
        { category: '화재 진압', rate: 99, daily: '115건', model: 'DeepSeek R1' },
        { category: '구조 활동', rate: 99, daily: '225건', model: 'DeepSeek R1' },
        { category: '구급 이송', rate: 99, daily: '6,500건', model: 'DeepSeek R1' }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">AI 자동화 현황</h2>
                <p className="text-sm text-gray-600 mt-1">DeepSeek R1 기반 소방 업무 자동화</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {automationData.map((item, idx) => (
                    <StatCard
                        key={idx}
                        title={item.category}
                        value={`${item.rate}%`}
                        icon="🤖"
                        color="red"
                        description={`일일 ${item.daily} 처리`}
                    />
                ))}
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">분야별 자동화</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">업무 분야</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">AI 모델</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">자동화율</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">일일 처리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {automationData.map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.category}</td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-700">{item.model}</td>
                                    <td className="px-6 py-4 text-sm text-center font-semibold text-red-600">{item.rate}%</td>
                                    <td className="px-6 py-4 text-sm text-right text-gray-900">{item.daily}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
