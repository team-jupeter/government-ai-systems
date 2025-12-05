const Organization = () => {
    const departments = [
        { name: '기획조정실', staff: 58, desc: '정책기획, 예산' },
        { name: '개발사업국', staff: 92, desc: '간척지 개발 총괄' },
        { name: '산업입지국', staff: 78, desc: '산업단지 조성' },
        { name: '관광개발국', staff: 52, desc: '관광·레저 개발' },
        { name: '수자원관리단', staff: 40, desc: '수질·환경 관리' }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">조직 구조</h2>
                <p className="text-sm text-gray-600 mt-1">새만금개발청 본부</p>
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
                                <td className="px-6 py-4 text-sm text-gray-900">김경안</td>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-3">주요 개발 구역</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">구역명</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">면적</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">용도</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">산업·연구 용지</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">150㎢</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-700">첨단산업, R&D</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">관광·레저 용지</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">74㎢</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-700">관광, 해양레저</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">농생명 용지</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">72㎢</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-700">농업, 바이오</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
