const NDRIntegration = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">🔗 국가데이터저장소(NDR) 연동</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="border-2 border-orange-200 rounded-lg p-5">
                <h3 className="font-bold text-lg mb-4 text-orange-900">📥 수신 데이터</h3>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b"><td className="py-2">조사 요청</td><td className="text-right font-mono text-green-600">3,847건/년</td></tr>
                        <tr className="border-b"><td className="py-2">국내 정책 자료</td><td className="text-right font-mono text-green-600">실시간</td></tr>
                        <tr className="border-b"><td className="py-2">해외 입법 사례</td><td className="text-right font-mono text-green-600">실시간</td></tr>
                        <tr><td className="py-2">통계 데이터</td><td className="text-right font-mono text-green-600">실시간</td></tr>
                    </tbody>
                </table>
            </div>
            
            <div className="border-2 border-green-200 rounded-lg p-5">
                <h3 className="font-bold text-lg mb-4 text-green-900">📤 송신 데이터</h3>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b"><td className="py-2">입법 조사 보고서</td><td className="text-right font-mono text-blue-600">3,847건/년</td></tr>
                        <tr className="border-b"><td className="py-2">정책 분석</td><td className="text-right font-mono text-blue-600">실시간</td></tr>
                        <tr className="border-b"><td className="py-2">영향 평가</td><td className="text-right font-mono text-blue-600">수시</td></tr>
                        <tr><td className="py-2">해외 사례 비교</td><td className="text-right font-mono text-blue-600">실시간</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">513.6</div>
                <div className="text-xs text-gray-600 mt-1">TPS (초당 트랜잭션)</div>
            </div>
            <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-xs text-gray-600 mt-1">보고서 무결성</div>
            </div>
            <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">0.6초</div>
                <div className="text-xs text-gray-600 mt-1">평균 동기화 시간</div>
            </div>
        </div>
    </div>
);
