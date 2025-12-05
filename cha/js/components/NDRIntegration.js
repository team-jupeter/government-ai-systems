const NDRIntegration = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">국가데이터처 연동</h2>
                <p className="text-sm text-gray-600 mt-1">실시간 데이터 동기화</p>
            </div>

            <div className="bg-white border rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">시스템명</th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">연동 상태</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">데이터량</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">유산정보시스템</td>
                            <td className="px-6 py-4 text-sm text-center">
                                <span className="px-2 py-1 bg-amber-100 text-amber-900 rounded text-xs font-medium">정상</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-right text-gray-900">4,300,000건</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">보존관리시스템</td>
                            <td className="px-6 py-4 text-sm text-center">
                                <span className="px-2 py-1 bg-amber-100 text-amber-900 rounded text-xs font-medium">정상</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-right text-gray-900">18,500,000건</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">관람객관리시스템</td>
                            <td className="px-6 py-4 text-sm text-center">
                                <span className="px-2 py-1 bg-amber-100 text-amber-900 rounded text-xs font-medium">정상</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-right text-gray-900">15,000,000건</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
