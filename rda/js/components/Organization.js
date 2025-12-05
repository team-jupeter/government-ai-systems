const Organization = () => {
    const institutes = [
        { name: '국립식량과학원', staff: 385, location: '전북 완주' },
        { name: '국립원예특작과학원', staff: 342, location: '전북 완주' },
        { name: '국립축산과학원', staff: 298, location: '전북 완주' },
        { name: '국립농업과학원', staff: 425, location: '전북 완주' },
        { name: '강원도농업기술원', staff: 185, location: '강원 춘천' },
        { name: '경기도농업기술원', staff: 220, location: '경기 화성' }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">조직 구조</h2>
                <p className="text-sm text-gray-600 mt-1">농촌진흥청 본부 및 소속 연구기관</p>
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
                                <td className="px-6 py-4 text-sm text-gray-900">조재호</td>
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
                                <td className="px-6 py-4 text-sm text-center text-gray-900">92명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">정책기획, 예산, 국제협력</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">연구정책국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">128명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">연구관리, 성과확산</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">기술협력국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">105명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">기술보급, 농업인 교육</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">소속 연구기관</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">연구기관명</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">연구인력</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">위치</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {institutes.map((inst, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{inst.name}</td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-900">{inst.staff}명</td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-900">{inst.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
