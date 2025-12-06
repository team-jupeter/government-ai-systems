const NDRIntegration = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">🔗 국가데이터저장소(NDR) 연동</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="border-2 border-amber-200 rounded-lg p-5">
                <h3 className="font-bold text-lg mb-4 text-amber-900">📥 수신 데이터</h3>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b"><td className="py-2">부동산 거래</td><td className="text-right font-mono text-green-600">8.7M건</td></tr>
                        <tr className="border-b"><td className="py-2">교통 인프라</td><td className="text-right font-mono text-green-600">실시간</td></tr>
                        <tr className="border-b"><td className="py-2">건설 현장</td><td className="text-right font-mono text-green-600">4,561건/년</td></tr>
                        <tr><td className="py-2">도시 계획</td><td className="text-right font-mono text-green-600">실시간</td></tr>
                    </tbody>
                </table>
            </div>
            
            <div className="border-2 border-green-200 rounded-lg p-5">
                <h3 className="font-bold text-lg mb-4 text-green-900">📤 송신 데이터</h3>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b"><td className="py-2">부동산 정책</td><td className="text-right font-mono text-blue-600">실시간</td></tr>
                        <tr className="border-b"><td className="py-2">SOC 예산 배정</td><td className="text-right font-mono text-blue-600">4,561건/년</td></tr>
                        <tr className="border-b"><td className="py-2">건설 규제</td><td className="text-right font-mono text-blue-600">실시간</td></tr>
                        <tr><td className="py-2">교통 정책 의결</td><td className="text-right font-mono text-blue-600">389건/년</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-amber-600">509.2</div>
                <div className="text-xs text-gray-600 mt-1">TPS (초당 트랜잭션)</div>
            </div>
            <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-xs text-gray-600 mt-1">거래 무결성</div>
            </div>
            <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">0.4초</div>
                <div className="text-xs text-gray-600 mt-1">평균 동기화 시간</div>
            </div>
        </div>
    </div>
);
