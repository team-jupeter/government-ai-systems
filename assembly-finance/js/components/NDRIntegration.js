const NDRIntegration = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">🔗 국가데이터저장소(NDR) 연동</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="border-2 border-blue-200 rounded-lg p-5">
                <h3 className="font-bold text-lg mb-4 text-blue-900">📥 수신 데이터</h3>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b"><td className="py-2">정부 예산안</td><td className="text-right font-mono text-green-600">677조원</td></tr>
                        <tr className="border-b"><td className="py-2">부처별 사업계획</td><td className="text-right font-mono text-green-600">3,847건</td></tr>
                        <tr className="border-b"><td className="py-2">세수 추계</td><td className="text-right font-mono text-green-600">실시간</td></tr>
                        <tr><td className="py-2">경제 지표</td><td className="text-right font-mono text-green-600">실시간</td></tr>
                    </tbody>
                </table>
            </div>
            
            <div className="border-2 border-green-200 rounded-lg p-5">
                <h3 className="font-bold text-lg mb-4 text-green-900">📤 송신 데이터</h3>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b"><td className="py-2">심사 완료 예산안</td><td className="text-right font-mono text-blue-600">→예결위</td></tr>
                        <tr className="border-b"><td className="py-2">세제 개편안</td><td className="text-right font-mono text-blue-600">247건/년</td></tr>
                        <tr className="border-b"><td className="py-2">경제 정책 의결</td><td className="text-right font-mono text-blue-600">189건/년</td></tr>
                        <tr><td className="py-2">통화정책 검토</td><td className="text-right font-mono text-blue-600">12회/년</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">502.8</div>
                <div className="text-xs text-gray-600 mt-1">TPS (초당 트랜잭션)</div>
            </div>
            <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-xs text-gray-600 mt-1">데이터 무결성</div>
            </div>
            <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">0.4초</div>
                <div className="text-xs text-gray-600 mt-1">평균 동기화 시간</div>
            </div>
        </div>
    </div>
);
