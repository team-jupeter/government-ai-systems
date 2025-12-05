const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">해양경찰청 개요</h2>
                <p className="text-sm text-gray-600 mt-1">해양 안전 및 해양 치안 확립</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard 
                    title="해양경찰관" 
                    value="약 11,000명" 
                    icon="👮" 
                    color="blue"
                    description="해양 안전 수호"
                />
                <StatCard 
                    title="경비함정" 
                    value="약 320척" 
                    icon="🚢" 
                    color="blue"
                    description="대형·중형·소형함"
                />
                <StatCard 
                    title="항공기" 
                    value="26대" 
                    icon="🚁" 
                    color="blue"
                    description="헬기·고정익"
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
                                <td className="px-6 py-4 text-sm text-right text-gray-900">김종욱 (치안총감)</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">지방해양경찰청</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">8개 (서·중·남·동·제주·인천·평택·대산)</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">연간 구조</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-blue-900">약 12,000명</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">122 신고</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-blue-900">약 520,000건</td>
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
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">해양 경비</td>
                                <td className="px-6 py-4 text-sm text-gray-700">해상 치안 유지, 밀입국 단속</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">해양 구조</td>
                                <td className="px-6 py-4 text-sm text-gray-700">해양사고 수색·구조, 인명 구조</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">해양 오염</td>
                                <td className="px-6 py-4 text-sm text-gray-700">해양오염 방제, 환경보호</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">해양 범죄</td>
                                <td className="px-6 py-4 text-sm text-gray-700">밀수·밀항, 해상 강력범죄 수사</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <OpenHashBadge 
                totalBlocks="8,945,620"
                todayBlocks="132,000"
                verificationRate="100%"
            />
        </div>
    );
};
