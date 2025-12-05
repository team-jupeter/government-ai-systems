const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">새만금개발청 개요</h2>
                <p className="text-sm text-gray-600 mt-1">세계 최대 간척지 새만금 개발</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard 
                    title="총 면적" 
                    value="409㎢" 
                    icon="🌊" 
                    color="sky"
                    description="세계 최대 간척지"
                />
                <StatCard 
                    title="매립 면적" 
                    value="283㎢" 
                    icon="🏗️" 
                    color="sky"
                    description="육지화 완료"
                />
                <StatCard 
                    title="직원" 
                    value="약 320명" 
                    icon="👥" 
                    color="sky"
                    description="개발 전문가"
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
                                <td className="px-6 py-4 text-sm text-right text-gray-900">김경안 (차관급)</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">방조제 길이</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">33.9km</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">총 사업비</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-sky-900">약 29조원</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">개발 진행률</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-sky-900">약 72%</td>
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
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">간척 개발</td>
                                <td className="px-6 py-4 text-sm text-gray-700">새만금 간척지 매립 및 개발</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">산업단지</td>
                                <td className="px-6 py-4 text-sm text-gray-700">신재생에너지, 첨단산업 단지</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">관광·레저</td>
                                <td className="px-6 py-4 text-sm text-gray-700">국제관광, 해양레저 개발</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">항만 건설</td>
                                <td className="px-6 py-4 text-sm text-gray-700">신항만 및 배후단지 조성</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <OpenHashBadge 
                totalBlocks="6,825,340"
                todayBlocks="88,000"
                verificationRate="100%"
            />
        </div>
    );
};
