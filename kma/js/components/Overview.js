const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">기상청 개요</h2>
                <p className="text-sm text-gray-600 mt-1">기상·지진 관측 및 예보·특보 발표</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard 
                    title="기상관측소" 
                    value="696개소" 
                    icon="🌡️" 
                    color="sky"
                    description="전국 자동기상관측망"
                />
                <StatCard 
                    title="예보 발표" 
                    value="일 8회" 
                    icon="🌤️" 
                    color="sky"
                    description="동네예보 기준"
                />
                <StatCard 
                    title="직원" 
                    value="약 3,200명" 
                    icon="👥" 
                    color="sky"
                    description="기상 전문가"
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
                                <td className="px-6 py-4 text-sm text-right text-gray-900">장동언 (차관급)</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">지방기상청</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">6개 (관측소 45개)</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">기상레이더</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-sky-700">11개소</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">예보 정확도</td>
                                <td className="px-6 py-4 text-sm text-right font-semibold text-sky-700">90.2%</td>
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
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">기상 관측</td>
                                <td className="px-6 py-4 text-sm text-gray-700">온도, 강수량, 풍속 등 기상요소 관측</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">예보·특보</td>
                                <td className="px-6 py-4 text-sm text-gray-700">일기예보, 기상특보, 태풍 예보</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">지진 감시</td>
                                <td className="px-6 py-4 text-sm text-gray-700">지진·지진해일 관측 및 통보</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">기상 서비스</td>
                                <td className="px-6 py-4 text-sm text-gray-700">항공·해양·산악 등 특화 기상정보</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <OpenHashBadge 
                totalBlocks="9,125,450"
                todayBlocks="138,000"
                verificationRate="100%"
            />
        </div>
    );
};
