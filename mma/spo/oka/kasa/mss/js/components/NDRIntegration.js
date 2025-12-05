const NDRIntegration = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">국가데이터처 연동</h2>
                <p className="text-sm text-gray-600 mt-1">실시간 데이터 동기화 및 통합 관리</p>
            </div>

            <div className="bg-white border rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">시스템명</th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">연동 상태</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">데이터량</th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">최근 동기화</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">창업지원시스템</td>
                            <td className="px-6 py-4 text-sm text-center">
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">정상</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-right text-gray-900">5,280,000건</td>
                            <td className="px-6 py-4 text-sm text-center text-gray-600">1분 전</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">중소기업정책자금시스템</td>
                            <td className="px-6 py-4 text-sm text-center">
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">정상</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-right text-gray-900">12,450,000건</td>
                            <td className="px-6 py-4 text-sm text-center text-gray-600">2분 전</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">벤처기업확인시스템</td>
                            <td className="px-6 py-4 text-sm text-center">
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">정상</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-right text-gray-900">2,850,000건</td>
                            <td className="px-6 py-4 text-sm text-center text-gray-600">1분 전</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">소상공인지원시스템</td>
                            <td className="px-6 py-4 text-sm text-center">
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">정상</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-right text-gray-900">8,920,000건</td>
                            <td className="px-6 py-4 text-sm text-center text-gray-600">3분 전</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">데이터 품질 지표</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">항목</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">수치</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">평가</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">데이터 완전성</td>
                                <td className="px-6 py-4 text-sm text-center text-blue-700 font-semibold">99.9%</td>
                                <td className="px-6 py-4 text-sm text-gray-700">우수</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">데이터 정확성</td>
                                <td className="px-6 py-4 text-sm text-center text-blue-700 font-semibold">99.8%</td>
                                <td className="px-6 py-4 text-sm text-gray-700">우수</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">데이터 일관성</td>
                                <td className="px-6 py-4 text-sm text-center text-blue-700 font-semibold">99.7%</td>
                                <td className="px-6 py-4 text-sm text-gray-700">우수</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">평균 응답 시간</td>
                                <td className="px-6 py-4 text-sm text-center text-blue-700 font-semibold">0.2초</td>
                                <td className="px-6 py-4 text-sm text-gray-700">매우 빠름</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

(() => NDRIntegration)();
