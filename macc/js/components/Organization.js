const Organization = () => {
    const departments = [
        { name: '기획조정실', staff: 85, desc: '정책기획, 예산' },
        { name: '건설사업국', staff: 145, desc: '도시 건설 총괄' },
        { name: '도시조성국', staff: 128, desc: '토지 조성, 기반시설' },
        { name: '이전지원국', staff: 92, desc: '기관 이전 지원' },
        { name: '주택공급국', staff: 75, desc: '주택 공급·관리' }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">조직 구조</h2>
                <p className="text-sm text-gray-600 mt-1">행정중심복합도시건설청 본부</p>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">수뇌부</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">직위</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">성명</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">비고</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">청장</td>
                                <td className="px-6 py-4 text-sm text-gray-900">황명선</td>
                                <td className="px-6 py-4 text-sm text-gray-700">차관급</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">본부 조직</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">부서명</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">인원</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">주요 업무</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {departments.map((dept, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{dept.name}</td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-900">{dept.staff}명</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{dept.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">주요 이전 기관</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">기관명</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">이전 연도</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">상태</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">국무조정실</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">2013년</td>
                                <td className="px-6 py-4 text-sm text-center">
                                    <span className="px-2 py-1 bg-orange-100 text-orange-900 rounded text-xs font-medium">완료</span>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">기획재정부</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">2014년</td>
                                <td className="px-6 py-4 text-sm text-center">
                                    <span className="px-2 py-1 bg-orange-100 text-orange-900 rounded text-xs font-medium">완료</span>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">교육부</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">2015년</td>
                                <td className="px-6 py-4 text-sm text-center">
                                    <span className="px-2 py-1 bg-orange-100 text-orange-900 rounded text-xs font-medium">완료</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
