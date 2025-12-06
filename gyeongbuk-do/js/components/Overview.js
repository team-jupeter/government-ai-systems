const Overview = () => (
    <div className="space-y-6 animate-slide-in">
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🏯 경상북도 OpenHash 시스템</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="border rounded-lg p-4">
                    <h3 className="font-bold text-blue-900 mb-3">기본 정보</h3>
                    <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b"><td className="py-2 font-medium">인구</td><td>약 264만명</td></tr>
                            <tr className="border-b"><td className="py-2 font-medium">특징</td><td>역사문화, 전통</td></tr>
                            <tr><td className="py-2 font-medium">TPS</td><td className="text-green-600 font-bold">540+ tx/s</td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="border rounded-lg p-4">
                    <h3 className="font-bold text-green-900 mb-3">OpenHash 성능</h3>
                    <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b"><td className="py-2 font-medium">블록 생성</td><td>0.1초</td></tr>
                            <tr className="border-b"><td className="py-2 font-medium">AI 정확도</td><td>99%+</td></tr>
                            <tr><td className="py-2 font-medium">효율 향상</td><td>95%+</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);
