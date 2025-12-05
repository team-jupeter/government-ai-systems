const Organization = () => {
    const regionalOffices = [
        { name: '서해지방해양경찰청', staff: 1580, location: '인천' },
        { name: '중부지방해양경찰청', staff: 1420, location: '평택' },
        { name: '남해지방해양경찰청', staff: 1650, location: '여수' },
        { name: '동해지방해양경찰청', staff: 1380, location: '동해' },
        { name: '제주지방해양경찰청', staff: 980, location: '제주' }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">조직 구조</h2>
                <p className="text-sm text-gray-600 mt-1">해양경찰청 본부 및 지방청</p>
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
                                <td className="px-6 py-4 text-sm text-gray-900">김종욱</td>
                                <td className="px-6 py-4 text-sm text-gray-700">치안총감</td>
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
                                <td className="px-6 py-4 text-sm text-center text-gray-900">125명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">정책기획, 예산, 국제협력</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">경비국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">185명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">해상 경비, 해양 안보</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">수사정보국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">168명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">해양 범죄 수사</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">해양오염방제국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">142명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">해양오염 대응</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">해양안전국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">158명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">해양사고 예방, 안전관리</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">지방해양경찰청 (8개)</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">지방청</th>
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
