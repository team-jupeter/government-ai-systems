const Organization = () => {
    const regionalOffices = [
        { name: '서울유산센터', staff: 185, sites: 328 },
        { name: '경기유산센터', staff: 142, sites: 287 },
        { name: '경주유산센터', staff: 95, sites: 156 },
        { name: '부여유산센터', staff: 78, sites: 98 },
        { name: '궁능유산본부', staff: 220, sites: 51 }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">조직 구조</h2>
                <p className="text-sm text-gray-600 mt-1">국가유산청 본부 및 지역 센터</p>
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
                                <td className="px-6 py-4 text-sm text-gray-900">최응천</td>
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
                                <td className="px-6 py-4 text-sm text-center text-gray-900">95명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">정책기획, 예산, 법무</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">유산보존국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">142명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">유산 지정·보존·수리</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">유산활용국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">128명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">관광·교육·문화행사</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">무형유산국</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">85명</td>
                                <td className="px-6 py-4 text-sm text-gray-700">무형문화재 보호·전승</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">지역 센터 및 본부</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">센터명</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">직원</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">관리 유산</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {regionalOffices.map((office, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{office.name}</td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-900">{office.staff}명</td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-900">{office.sites}개소</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
