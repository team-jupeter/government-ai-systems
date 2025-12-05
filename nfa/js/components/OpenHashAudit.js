const OpenHashAudit = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">OpenHash 블록체인 감사</h2>
                <p className="text-sm text-gray-600 mt-1">투명한 소방 활동 기록</p>
            </div>

            <OpenHashBadge 
                totalBlocks="9,285,450"
                todayBlocks="125,000"
                verificationRate="100%"
            />

            <div className="bg-white border rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">항목</th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">수치</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">총 블록 수</td>
                            <td className="px-6 py-4 text-sm text-center text-gray-900">9,285,450</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">오늘 생성 블록</td>
                            <td className="px-6 py-4 text-sm text-center font-semibold text-red-600">125,000</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">검증 성공률</td>
                            <td className="px-6 py-4 text-sm text-center font-semibold text-red-600">100%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
