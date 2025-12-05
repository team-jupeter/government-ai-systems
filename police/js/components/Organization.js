const Organization = () => {
    const localPolice = [
        { name: '서울지방경찰청', officers: 28500, stations: 31 },
        { name: '경기남부지방경찰청', officers: 12800, stations: 18 },
        { name: '경기북부지방경찰청', officers: 9500, stations: 14 },
        { name: '부산지방경찰청', officers: 8200, stations: 16 },
        { name: '인천지방경찰청', officers: 7800, stations: 13 },
        { name: '경남지방경찰청', officers: 6500, stations: 18 },
        { name: '경북지방경찰청', officers: 6200, stations: 23 },
        { name: '대구지방경찰청', officers: 5800, stations: 8 }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">조직 구조</h2>
                <p className="text-sm text-gray-600 mt-1">경찰청 본부 및 전국 지방경찰청</p>
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
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">경찰청장</td>
                                <td className="px-6 py-4 text-sm text-gray-900">조지호</td>
                                <td className="px-6 py-4 text-sm text-gray-700">제27대, 2024.10.21 취임</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">차장</td>
                                <td className="px-6 py-4 text-sm text-gray-900">윤희근</td>
                                <td className="px-6 py-4 text-sm text-gray-700">치안감</td>
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
                                <td className="px-6 py-4 text-sm text-center text-gray-900">120명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">정책기획, 예산, 법무</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">생활안전국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">180명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">지역경찰, 여성청소년</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">수사국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">220명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">형사수사, 과학수사</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">교통국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">150명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">교통안전, 운전면허</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">전국 지방경찰청 (18개)</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">지방경찰청</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">경찰관</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">경찰서</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {localPolice.map((dept, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{dept.name}</td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-900">{dept.officers.toLocaleString()}명</td>
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
