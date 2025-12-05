const Organization = () => {
    const fireStations = [
        { name: '서울소방재난본부', personnel: 8500, stations: 119 },
        { name: '경기소방재난본부', personnel: 7200, stations: 142 },
        { name: '부산소방재난본부', personnel: 3800, stations: 58 },
        { name: '인천소방본부', personnel: 3200, stations: 48 },
        { name: '대구소방안전본부', personnel: 2800, stations: 42 },
        { name: '경남소방본부', personnel: 3500, stations: 68 },
        { name: '경북소방본부', personnel: 3200, stations: 72 },
        { name: '대전소방본부', personnel: 2100, stations: 28 }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">조직 구조</h2>
                <p className="text-sm text-gray-600 mt-1">소방청 본부 및 전국 시도 소방본부</p>
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
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">소방청장</td>
                                <td className="px-6 py-4 text-sm text-gray-900">남화영</td>
                                <td className="px-6 py-4 text-sm text-gray-700">차관급, 2023.12.21 취임</td>
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
                                <td className="px-6 py-4 text-sm text-center text-gray-900">85명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">정책기획, 예산, 법무</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">소방정책국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">120명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">소방정책, 인력관리</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">소방산업과</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">95명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">소방산업 육성</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">119구조구급국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">150명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">구조·구급 정책</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">전국 시도 소방본부 (17개)</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">소방본부</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">소방공무원</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">소방서/센터</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {fireStations.map((dept, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{dept.name}</td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-900">{dept.personnel.toLocaleString()}명</td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-900">{dept.stations}개</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
