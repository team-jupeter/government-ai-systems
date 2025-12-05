const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">국가유산청 개요</h2>
                <p className="text-sm text-gray-600 mt-1">대한민국 국가유산의 보존·관리·활용</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard 
                    title="국가지정유산" 
                    value="4,300건" 
                    icon="🏯" 
                    color="amber"
                    description="국보·보물·사적 등"
                />
                <StatCard 
                    title="세계유산" 
                    value="16건" 
                    icon="🌍" 
                    color="amber"
                    description="UNESCO 등재"
                />
                <StatCard 
                    title="궁궐·왕릉" 
                    value="51개소" 
                    icon="👑" 
                    color="amber"
                    description="5대 궁궐, 40기 왕릉"
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
                                <td className="px-6 py-4 text-sm text-right text-gray-900">최응천 (차관급)</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">국보</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-amber-800">342건</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">보물</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-amber-800">2,195건</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">연간 방문객</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-amber-800">약 1,500만명</td>
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
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">유산 보존</td>
                                <td className="px-6 py-4 text-sm text-gray-700">국가유산 지정, 보존, 수리, 복원</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">궁궐 관리</td>
                                <td className="px-6 py-4 text-sm text-gray-700">경복궁, 창덕궁, 덕수궁, 창경궁, 경희궁 운영</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">왕릉 관리</td>
                                <td className="px-6 py-4 text-sm text-gray-700">조선왕릉 40기 보존 및 관리</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">세계유산</td>
                                <td className="px-6 py-4 text-sm text-gray-700">UNESCO 세계유산 등재 및 관리</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <OpenHashBadge 
                totalBlocks="7,845,320"
                todayBlocks="95,000"
                verificationRate="100%"
            />
        </div>
    );
};
