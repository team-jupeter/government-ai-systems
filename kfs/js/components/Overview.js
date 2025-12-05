const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">산림청 개요</h2>
                <p className="text-sm text-gray-600 mt-1">산림자원 보호·육성 및 산림정책 수립</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard 
                    title="산림 면적" 
                    value="630만ha" 
                    icon="🌲" 
                    color="green"
                    description="국토의 63%"
                />
                <StatCard 
                    title="지방산림청" 
                    value="5개" 
                    icon="🏢" 
                    color="green"
                    description="동부·서부·남부·북부·중부"
                />
                <StatCard 
                    title="국유림" 
                    value="155만ha" 
                    icon="🏔️" 
                    color="green"
                    description="전체 산림의 24%"
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
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">청장</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">임상섭 (차관급)</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">산림공무원</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">약 3,200명</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">연간 조림</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-green-800">약 25,000ha</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">산불 발생</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-green-800">약 620건</td>
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
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">산림 보호</td>
                                <td className="px-6 py-4 text-sm text-gray-700">산불 예방·진화, 산림병해충 방제</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">산림 경영</td>
                                <td className="px-6 py-4 text-sm text-gray-700">조림, 숲가꾸기, 목재 생산</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">산림 복지</td>
                                <td className="px-6 py-4 text-sm text-gray-700">국립공원 관리, 자연휴양림 운영</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">산림 산업</td>
                                <td className="px-6 py-4 text-sm text-gray-700">임산물 생산, 산림 일자리 창출</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <OpenHashBadge 
                totalBlocks="7,965,420"
                todayBlocks="112,000"
                verificationRate="100%"
            />
        </div>
    );
};
