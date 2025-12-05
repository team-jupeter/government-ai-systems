const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">질병관리청 개요</h2>
                <p className="text-sm text-gray-600 mt-1">감염병 예방·관리 및 국민건강 보호</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard 
                    title="직원" 
                    value="약 2,500명" 
                    icon="👨‍⚕️" 
                    color="cyan"
                    description="질병 관리 전문가"
                />
                <StatCard 
                    title="감염병 감시" 
                    value="80종" 
                    icon="🦠" 
                    color="cyan"
                    description="법정 감염병"
                />
                <StatCard 
                    title="예방접종" 
                    value="17종" 
                    icon="💉" 
                    color="cyan"
                    description="국가예방접종"
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
                                <td className="px-6 py-4 text-sm text-right text-gray-900">지영미 (차관급)</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">질병대응센터</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">6개</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">연간 예방접종</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-cyan-800">약 2,800만건</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">감염병 신고</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-cyan-800">약 150만건</td>
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
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">감염병 관리</td>
                                <td className="px-6 py-4 text-sm text-gray-700">감염병 감시, 역학조사, 대응체계 구축</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">예방접종</td>
                                <td className="px-6 py-4 text-sm text-gray-700">국가예방접종 사업 운영 및 관리</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">만성질환 관리</td>
                                <td className="px-6 py-4 text-sm text-gray-700">심뇌혈관질환, 암, 만성질환 예방</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">검역</td>
                                <td className="px-6 py-4 text-sm text-gray-700">국가 검역 및 해외감염병 대응</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <OpenHashBadge 
                totalBlocks="8,645,890"
                todayBlocks="128,000"
                verificationRate="100%"
            />
        </div>
    );
};
