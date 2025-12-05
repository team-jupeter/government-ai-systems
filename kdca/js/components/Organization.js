const Organization = () => {
    const centers = [
        { name: '감염병위기대응센터', staff: 320, location: '충북 청주' },
        { name: '감염병진단분석센터', staff: 280, location: '충북 청주' },
        { name: '만성질환관리센터', staff: 240, location: '충북 청주' },
        { name: '국립보건연구원', staff: 420, location: '충북 청주' },
        { name: '국립검역소', staff: 350, location: '전국 13개소' }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">조직 구조</h2>
                <p className="text-sm text-gray-600 mt-1">질병관리청 본부 및 소속기관</p>
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
                                <td className="px-6 py-4 text-sm text-gray-900">지영미</td>
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
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">기획조정관</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">105명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">정책기획, 예산, 국제협력</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">감염병정책국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">158명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">감염병 예방·관리 정책</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">만성질환예방관리국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">132명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">만성질환 예방·관리</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">검역지원국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">95명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">검역 업무 총괄</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">주요 센터 및 소속기관</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">기관명</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">직원</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">위치</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {centers.map((center, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{center.name}</td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-900">{center.staff}명</td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-900">{center.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
