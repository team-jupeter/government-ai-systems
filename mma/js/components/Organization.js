const Organization = () => {
    const departments = [
        { name: '기획조정관', head: '관리관', staff: 68, divisions: '기획재정담당관, 정보화담당관, 홍보담당관' },
        { name: '병역자원국', head: '국장', staff: 95, divisions: '병역정책과, 징병검사과, 입영동원과' },
        { name: '병역판정국', head: '국장', staff: 88, divisions: '병역판정과, 의료관리과, 심사지원과' },
        { name: '사회복무국', head: '국장', staff: 82, divisions: '복무관리과, 복무지원과, 복무감독과' },
        { name: '병역이행국', head: '국장', staff: 76, divisions: '병역이행과, 산업기능지원과, 국제협력과' }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">조직 구성</h2>
                <p className="text-sm text-gray-600 mt-1">병무청 조직 현황</p>
            </div>

            <div className="bg-white border rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">직위</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">성명</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">소관 업무</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">병무청장</td>
                            <td className="px-6 py-4 text-sm text-gray-900">홍소영</td>
                            <td className="px-6 py-4 text-sm text-gray-700">병무행정 총괄 (차관급, 최초 여성 청장)</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">차장</td>
                            <td className="px-6 py-4 text-sm text-gray-900">최규석</td>
                            <td className="px-6 py-4 text-sm text-gray-700">병무청장 보좌</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">본부 조직 (1관 4국)</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">부서명</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">책임자</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">인원</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">하부 조직</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {departments.map((dept, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{dept.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{dept.head}</td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-900">{dept.staff}명</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{dept.divisions}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-50 border-t">
                            <tr>
                                <td className="px-6 py-3 text-sm font-semibold text-gray-900">합계</td>
                                <td className="px-6 py-3 text-sm text-gray-700">1관 4국</td>
                                <td className="px-6 py-3 text-sm text-center font-semibold text-gray-900">409명</td>
                                <td className="px-6 py-3 text-sm text-gray-700">감사관 별도</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">지방병무청 (8개)</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">지방청명</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">관할 지역</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">인원</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">서울지방병무청</td>
                                <td className="px-6 py-4 text-sm text-gray-700">서울특별시</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">180명</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">경인지방병무청</td>
                                <td className="px-6 py-4 text-sm text-gray-700">인천광역시, 경기도</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">220명</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">부산·울산지방병무청</td>
                                <td className="px-6 py-4 text-sm text-gray-700">부산광역시, 울산광역시</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">150명</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">대구·경북지방병무청</td>
                                <td className="px-6 py-4 text-sm text-gray-700">대구광역시, 경상북도</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">165명</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">광주·전남지방병무청</td>
                                <td className="px-6 py-4 text-sm text-gray-700">광주광역시, 전라남도</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">135명</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">대전·충남지방병무청</td>
                                <td className="px-6 py-4 text-sm text-gray-700">대전광역시, 충청남도</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">125명</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">강원지방병무청</td>
                                <td className="px-6 py-4 text-sm text-gray-700">강원특별자치도</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">95명</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">제주지방병무청</td>
                                <td className="px-6 py-4 text-sm text-gray-700">제주특별자치도</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">75명</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-gray-50 border rounded-lg p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">AI 기반 조직 관리</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                    <div>
                        <div className="font-semibold text-gray-900 mb-2">자동화 기능</div>
                        <div>병역판정 자동 배정, 입영통지 발송, 복무관리, 국외여행 허가</div>
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900 mb-2">블록체인 적용</div>
                        <div>병적 기록 위변조 방지, 입영 이력 투명화, 복무 현황 실시간 기록</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

(() => Organization)();
