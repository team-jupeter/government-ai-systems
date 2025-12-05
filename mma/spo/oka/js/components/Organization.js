const Organization = () => {
    const departments = [
        { name: '기획조정실', head: '실장', staff: 35, divisions: '기획담당관, 정보화담당관, 홍보담당관' },
        { name: '재외동포정책국', head: '국장', staff: 48, divisions: '동포정책과, 동포교육문화과, 동포청년과' },
        { name: '교류협력국', head: '국장', staff: 52, divisions: '교류협력과, 네트워크과, 국제협력과' },
        { name: '지원서비스국', head: '국장', staff: 42, divisions: '민원서비스과, 법률지원과, 복지지원과' }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">조직 구성</h2>
                <p className="text-sm text-gray-600 mt-1">재외동포청 조직 현황</p>
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
                            <td className="px-6 py-4 text-sm text-gray-900">이상덕</td>
                            <td className="px-6 py-4 text-sm text-gray-700">재외동포청 총괄 (차관급)</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">차장</td>
                            <td className="px-6 py-4 text-sm text-gray-900">김진수</td>
                            <td className="px-6 py-4 text-sm text-gray-700">재외동포 정책 총괄</td>
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
                                <td className="px-6 py-3 text-sm text-gray-700">1실 3국</td>
                                <td className="px-6 py-3 text-sm text-center font-semibold text-gray-900">177명</td>
                                <td className="px-6 py-3 text-sm text-gray-700">산하: 재외동포협력센터</td>
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
                        <div>동포 민원 자동 배정, 지원사업 자동 심사, AI 기반 네트워크 매칭</div>
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900 mb-2">블록체인 적용</div>
                        <div>민원 처리 이력 기록, 지원금 집행 투명화, 동포 정보 위변조 방지</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

(() => Organization)();
