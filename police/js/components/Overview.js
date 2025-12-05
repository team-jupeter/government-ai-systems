const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">경찰청 개요</h2>
                <p className="text-sm text-gray-600 mt-1">대한민국 치안과 국민안전을 책임지는 행정기관</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard 
                    title="경찰관 수" 
                    value="약 12만명" 
                    icon="👮" 
                    color="blue"
                    description="전국 경찰 인력"
                />
                <StatCard 
                    title="지방경찰청" 
                    value="18개" 
                    icon="🏢" 
                    color="blue"
                    description="254개 경찰서"
                />
                <StatCard 
                    title="연간 112 신고" 
                    value="2,800만건" 
                    icon="📞" 
                    color="blue"
                    description="긴급 신고 접수"
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
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">경찰청장</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">조지호 (제27대)</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">차장</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">윤희근</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">연간 범죄 검거</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-blue-900">약 195만건</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">검거율</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-blue-900">96.8%</td>
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
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">치안 유지</td>
                                <td className="px-6 py-4 text-sm text-gray-700">국민 생명·신체·재산 보호, 공공 안녕 질서 유지</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">범죄 수사</td>
                                <td className="px-6 py-4 text-sm text-gray-700">형사 사건 수사, 증거 수집 및 분석, 범인 검거</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">112 신고 처리</td>
                                <td className="px-6 py-4 text-sm text-gray-700">긴급 신고 접수, 실시간 출동 지령</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">교통 관리</td>
                                <td className="px-6 py-4 text-sm text-gray-700">교통 단속, 사고 처리, 운전면허 관리</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <OpenHashBadge 
                totalBlocks="8,425,680"
                todayBlocks="159,600"
                verificationRate="100%"
            />
        </div>
    );
};
