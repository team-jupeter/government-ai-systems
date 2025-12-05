const Organization = () => {
    const departments = [
        { name: '기획조정부', head: '검사장', staff: 85, divisions: '정책기획과, 정보통신과' },
        { name: '반부패부', head: '검사장', staff: 120, divisions: '반부패1·2·3과, 반부패기획관' },
        { name: '마약·조직범죄부', head: '검사장', staff: 95, divisions: '마약과, 조직범죄과, 범죄수익환수과' },
        { name: '형사부', head: '검사장', staff: 110, divisions: '형사1·2과' },
        { name: '공공수사부', head: '검사장', staff: 98, divisions: '공공1·2·3과' },
        { name: '공판송무부', head: '검사장', staff: 88, divisions: '공판과, 상고과' },
        { name: '과학수사부', head: '검사장', staff: 72, divisions: '과학수사기획관, 디지털포렌식' },
        { name: '인권옹호부', head: '검사장', staff: 65, divisions: '인권기획담당관, 인권감독담당관' }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">조직 구성</h2>
                <p className="text-sm text-gray-600 mt-1">대검찰청 조직 현황</p>
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
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">검찰총장</td>
                            <td className="px-6 py-4 text-sm text-gray-900">심우정</td>
                            <td className="px-6 py-4 text-sm text-gray-700">검찰 사무 총괄 (장관급, 임기 2년)</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">차장검사</td>
                            <td className="px-6 py-4 text-sm text-gray-900">이진동</td>
                            <td className="px-6 py-4 text-sm text-gray-700">검찰총장 보좌 (고검장급)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">본부 조직 (8개 부)</h3>
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
                                <td className="px-6 py-3 text-sm text-gray-700">8개 부</td>
                                <td className="px-6 py-3 text-sm text-center font-semibold text-gray-900">733명</td>
                                <td className="px-6 py-3 text-sm text-gray-700">감찰본부 별도</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">전국 검찰청</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">구분</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">수</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">비고</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">고등검찰청</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">5개</td>
                                <td className="px-6 py-4 text-sm text-gray-700">서울, 대구, 부산, 광주, 대전</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">지방검찰청</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">18개</td>
                                <td className="px-6 py-4 text-sm text-gray-700">서울중앙 외 17개 지검</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">지청</td>
                                <td className="px-6 py-4 text-sm text-center text-gray-900">42개</td>
                                <td className="px-6 py-4 text-sm text-gray-700">지방법원 지원 대응</td>
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
                        <div>사건 자동 배당, 판례 검색, 공소장 작성 지원, 증거 분석</div>
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900 mb-2">블록체인 적용</div>
                        <div>수사 이력 기록, 증거물 위변조 방지, 공소장 무결성 보장</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

(() => Organization)();
