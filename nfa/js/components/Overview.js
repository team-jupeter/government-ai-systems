const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">소방청 개요</h2>
                <p className="text-sm text-gray-600 mt-1">국민의 생명과 재산을 화재와 재난으로부터 보호</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard 
                    title="소방공무원" 
                    value="약 6만명" 
                    icon="🚒" 
                    color="red"
                    description="전국 소방 인력"
                />
                <StatCard 
                    title="소방서" 
                    value="1,274개" 
                    icon="🏢" 
                    color="red"
                    description="전국 소방서/안전센터"
                />
                <StatCard 
                    title="연간 119 신고" 
                    value="약 320만건" 
                    icon="📞" 
                    color="red"
                    description="화재·구조·구급"
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">주요 지표</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">구분</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">수치</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">소방청장</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">남화영 (차관급)</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">시도 소방본부</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">17개</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">연간 화재 발생</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-red-600">약 42,000건</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">구조 활동</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-red-600">약 82,000건</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">주요 기능</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">기능</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">상세 내용</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">화재 진압</td>
                                <td className="px-6 py-4 text-sm text-gray-700">화재 예방, 조사, 진압 및 피해 최소화</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">구조 활동</td>
                                <td className="px-6 py-4 text-sm text-gray-700">재난·사고 현장 인명 구조, 수색</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">구급 활동</td>
                                <td className="px-6 py-4 text-sm text-gray-700">응급환자 이송, 응급처치</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">안전 관리</td>
                                <td className="px-6 py-4 text-sm text-gray-700">소방시설 점검, 안전교육, 화재 예방</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <OpenHashBadge 
                totalBlocks="9,285,450"
                todayBlocks="125,000"
                verificationRate="100%"
            />
        </div>
    );
};
