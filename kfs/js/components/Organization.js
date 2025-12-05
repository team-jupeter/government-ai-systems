const Organization = () => {
    const regionalOffices = [
        { name: '동부지방산림청', staff: 485, location: '강원 원주' },
        { name: '서부지방산림청', staff: 420, location: '충남 홍성' },
        { name: '남부지방산림청', staff: 395, location: '경남 진주' },
        { name: '북부지방산림청', staff: 440, location: '강원 춘천' },
        { name: '중부지방산림청', staff: 380, location: '경기 수원' }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">조직 구조</h2>
                <p className="text-sm text-gray-600 mt-1">산림청 본부 및 지방산림청</p>
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
                                <td className="px-6 py-4 text-sm text-gray-900">임상섭</td>
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
                                <td className="px-6 py-4 text-sm text-center text-gray-900">88명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">정책기획, 예산, 국제협력</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">산림정책국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">125명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">산림정책, 산림경영</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">산림보호국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">142명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">산불 예방, 병해충 방제</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">산림복지국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">95명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">휴양림, 산림교육</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">지방산림청 (5개)</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">지방산림청</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">직원</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">위치</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {regionalOffices.map((office, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{office.name}</td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-900">{office.staff}명</td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-900">{office.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
