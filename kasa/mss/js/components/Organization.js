const Organization = () => {
    const [selectedDept, setSelectedDept] = React.useState(null);

    const departments = [
        { name: '기획조정실', head: '실장', staff: 98, divisions: '정책기획관, 규제개혁법무담당관, 정보화담당관' },
        { name: '중소기업정책실', head: '실장', staff: 125, divisions: '중소기업전략기획관, 성장지원정책관, 지역기업정책관' },
        { name: '창업벤처혁신실', head: '실장', staff: 142, divisions: '창업진흥정책관, 벤처투자정책관, 글로벌창업정책관' },
        { name: '소상공인정책실', head: '실장', staff: 88, divisions: '소상공인정책관, 전통시장상권정책관, 소상공인지원정책관' }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">조직 구성</h2>
                <p className="text-sm text-gray-600 mt-1">중소벤처기업부 조직 현황</p>
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
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">장관</td>
                            <td className="px-6 py-4 text-sm text-gray-900">한성숙</td>
                            <td className="px-6 py-4 text-sm text-gray-700">중소벤처기업부 총괄</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">차관</td>
                            <td className="px-6 py-4 text-sm text-gray-900">노용석</td>
                            <td className="px-6 py-4 text-sm text-gray-700">중소벤처 정책 총괄</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">본부 조직</h3>
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
                                <td className="px-6 py-3 text-sm text-gray-700">4개 실</td>
                                <td className="px-6 py-3 text-sm text-center font-semibold text-gray-900">453명</td>
                                <td className="px-6 py-3 text-sm text-gray-700">지방청 9개소 별도</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div className="bg-gray-50 border rounded-lg p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">AI 기반 조직 관리</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                    <div>
                        <div className="font-semibold text-gray-900 mb-2">자동화 기능</div>
                        <div>실시간 인사 배치 최적화, 업무량 기반 인력 조정, AI 교육 추천, 성과 평가 자동 분석</div>
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900 mb-2">블록체인 적용</div>
                        <div>인사 발령 이력 기록, 자격증 위변조 방지, 성과 평가 투명성 확보</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

(() => Organization)();
