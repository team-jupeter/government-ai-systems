const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">농촌진흥청 개요</h2>
                <p className="text-sm text-gray-600 mt-1">농업과학기술 개발 및 농촌 지원</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard 
                    title="연구인력" 
                    value="약 2,100명" 
                    icon="👨‍🔬" 
                    color="green"
                    description="농업 연구 전문가"
                />
                <StatCard 
                    title="연구과제" 
                    value="1,850건" 
                    icon="📋" 
                    color="green"
                    description="진행 중인 과제"
                />
                <StatCard 
                    title="기술보급" 
                    value="3,200건" 
                    icon="🌾" 
                    color="green"
                    description="연간 보급 건수"
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
                                <td className="px-6 py-4 text-sm text-right text-gray-900">조재호 (차관급)</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">연구소</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">10개 (본원 4개, 지역 6개)</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">개발 품종</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-green-700">누적 3,800종</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">특허 등록</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-green-700">누적 5,200건</td>
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
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">품종 개발</td>
                                <td className="px-6 py-4 text-sm text-gray-700">벼, 과수, 채소, 화훼 등 신품종 개발</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">농업기술 연구</td>
                                <td className="px-6 py-4 text-sm text-gray-700">스마트팜, 친환경농업, 기후변화 대응</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">기술 보급</td>
                                <td className="px-6 py-4 text-sm text-gray-700">농업인 교육, 기술 지도, 컨설팅</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">농촌 개발</td>
                                <td className="px-6 py-4 text-sm text-gray-700">농촌 생활환경 개선, 6차 산업 육성</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <OpenHashBadge 
                totalBlocks="8,125,680"
                todayBlocks="118,000"
                verificationRate="100%"
            />
        </div>
    );
};
