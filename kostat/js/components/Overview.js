const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">통계청 개요</h2>
                <p className="text-sm text-gray-600 mt-1">국가통계 작성 및 통계정책 수립</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard 
                    title="국가통계" 
                    value="1,300종" 
                    icon="📊" 
                    color="blue"
                    description="승인통계"
                />
                <StatCard 
                    title="통계조사" 
                    value="450종" 
                    icon="📋" 
                    color="blue"
                    description="연간 실시"
                />
                <StatCard 
                    title="통계청 직원" 
                    value="약 3,800명" 
                    icon="👥" 
                    color="blue"
                    description="본청 및 지방청"
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
                                <td className="px-6 py-4 text-sm text-right text-gray-900">이형일 (차관급)</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">지방통계청</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">5개 (사무소 32개)</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">연간 조사 횟수</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-blue-900">약 450회</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">통계 데이터</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-blue-900">약 850억건</td>
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
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">인구통계</td>
                                <td className="px-6 py-4 text-sm text-gray-700">인구총조사, 인구동향조사</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">경제통계</td>
                                <td className="px-6 py-4 text-sm text-gray-700">경제활동인구조사, 물가통계</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">사회통계</td>
                                <td className="px-6 py-4 text-sm text-gray-700">가계동향조사, 사회조사</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">통계정책</td>
                                <td className="px-6 py-4 text-sm text-gray-700">통계기준 제정, 통계품질 관리</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <OpenHashBadge 
                totalBlocks="9,485,720"
                todayBlocks="145,000"
                verificationRate="100%"
            />
        </div>
    );
};
