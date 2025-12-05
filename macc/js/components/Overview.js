const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">행정중심복합도시건설청 개요</h2>
                <p className="text-sm text-gray-600 mt-1">세종특별자치시 건설 및 관리</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard 
                    title="세종시 면적" 
                    value="465.23㎢" 
                    icon="🏙️" 
                    color="orange"
                    description="전국 0.5%"
                />
                <StatCard 
                    title="인구" 
                    value="약 38만명" 
                    icon="👥" 
                    color="orange"
                    description="2024년 기준"
                />
                <StatCard 
                    title="직원" 
                    value="약 580명" 
                    icon="👨‍💼" 
                    color="orange"
                    description="도시 건설 전문가"
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
                                <td className="px-6 py-4 text-sm text-right text-gray-900">황명선 (차관급)</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">이전 완료 기관</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">47개 기관</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">총 사업비</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-orange-700">약 22.5조원</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">건설 진행률</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-orange-700">약 95%</td>
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
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">도시 건설</td>
                                <td className="px-6 py-4 text-sm text-gray-700">행정중심복합도시 건설 총괄</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">기관 이전</td>
                                <td className="px-6 py-4 text-sm text-gray-700">중앙행정기관 이전 지원</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">개발 사업</td>
                                <td className="px-6 py-4 text-sm text-gray-700">주택·산업·문화 개발</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">도시 관리</td>
                                <td className="px-6 py-4 text-sm text-gray-700">도시 운영·유지·관리</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <OpenHashBadge 
                totalBlocks="7,425,680"
                todayBlocks="98,000"
                verificationRate="100%"
            />
        </div>
    );
};
