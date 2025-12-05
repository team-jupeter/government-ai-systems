const Organization = () => {
    const regionalOffices = [
        { name: '서울지방기상청', staff: 420, offices: 8 },
        { name: '부산지방기상청', staff: 380, offices: 7 },
        { name: '광주지방기상청', staff: 340, offices: 6 },
        { name: '대전지방기상청', staff: 320, offices: 6 },
        { name: '강릉지방기상청', staff: 280, offices: 5 },
        { name: '제주지방기상청', staff: 260, offices: 4 }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">조직 구조</h2>
                <p className="text-sm text-gray-600 mt-1">기상청 본부 및 지방기상청</p>
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
                                <td className="px-6 py-4 text-sm text-gray-900">장동언</td>
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
                                <td className="px-6 py-4 text-sm text-center text-gray-900">112명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">정책기획, 예산, 국제협력</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">기상서비스진흥국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">145명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">기상서비스 정책·운영</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">예보국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">185명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">예보·특보 총괄</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">기상관측국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">168명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">관측망 운영·관리</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">기상레이더센터</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">95명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">레이더 관측·분석</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">지방기상청 (6개)</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">지방기상청</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">직원</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">관측소</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {regionalOffices.map((office, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{office.name}</td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-900">{office.staff}명</td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-900">{office.offices}개</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
