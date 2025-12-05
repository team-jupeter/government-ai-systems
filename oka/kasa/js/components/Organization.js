const Organization = () => {
    const departments = [
        { name: '기획재정담당관', head: '담당관', staff: 28, divisions: '기획팀, 예산팀, 국제협력팀' },
        { name: '우주수송부문', head: '부문장', staff: 85, divisions: '한국형발사체프로그램, 재사용발사체프로그램' },
        { name: '인공위성부문', head: '부문장', staff: 92, divisions: '위성임무설계프로그램, 한국형위성항법프로그램' },
        { name: '우주과학탐사부문', head: '부문장', staff: 78, divisions: '우주탐사임무설계프로그램, 달착륙선프로그램' },
        { name: '항공혁신부문', head: '부문장', staff: 65, divisions: '항공혁신임무설계프로그램, AAM개발프로그램' }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">조직 구성</h2>
                <p className="text-sm text-gray-600 mt-1">우주항공청 조직 현황</p>
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
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">청장</td>
                            <td className="px-6 py-4 text-sm text-gray-900">윤영빈</td>
                            <td className="px-6 py-4 text-sm text-gray-700">우주항공청 총괄 (차관급)</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">차장</td>
                            <td className="px-6 py-4 text-sm text-gray-900">김재완</td>
                            <td className="px-6 py-4 text-sm text-gray-700">우주항공 정책 총괄</td>
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
                                <td className="px-6 py-3 text-sm text-gray-700">5개 부문</td>
                                <td className="px-6 py-3 text-sm text-center font-semibold text-gray-900">348명</td>
                                <td className="px-6 py-3 text-sm text-gray-700">산하기관: 항우연, 천문연</td>
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
                        <div>발사체 개발 인력 최적 배치, R&D 과제 자동 심사, AI 기반 전문인력 매칭</div>
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900 mb-2">블록체인 적용</div>
                        <div>연구 성과 이력 기록, 기술 자격 위변조 방지, 우주 자산 관리 투명성 확보</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

(() => Organization)();
