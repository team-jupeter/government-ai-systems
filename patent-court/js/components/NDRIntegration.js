const NDRIntegration = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">🔗 국가데이터저장소(NDR) 연동</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="border-2 border-orange-200 rounded-lg p-5">
                <h3 className="font-bold text-lg mb-4 text-orange-900">📥 수신 데이터</h3>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b"><td className="py-2">특허심판원 심결</td><td className="text-right font-mono text-green-600">3,142건/년</td></tr>
                        <tr className="border-b"><td className="py-2">침해소송 항소</td><td className="text-right font-mono text-green-600">1,596건/년</td></tr>
                        <tr className="border-b"><td className="py-2">특허청 등록정보</td><td className="text-right font-mono text-green-600">실시간</td></tr>
                        <tr><td className="py-2">기술자료</td><td className="text-right font-mono text-green-600">실시간</td></tr>
                    </tbody>
                </table>
            </div>
            
            <div className="border-2 border-green-200 rounded-lg p-5">
                <h3 className="font-bold text-lg mb-4 text-green-900">📤 송신 데이터</h3>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b"><td className="py-2">심결취소 판결</td><td className="text-right font-mono text-blue-600">3,142건/년</td></tr>
                        <tr className="border-b"><td className="py-2">침해소송 판결</td><td className="text-right font-mono text-blue-600">1,596건/년</td></tr>
                        <tr className="border-b"><td className="py-2">특허 판례</td><td className="text-right font-mono text-blue-600">실시간</td></tr>
                        <tr><td className="py-2">통계 데이터</td><td className="text-right font-mono text-blue-600">월간</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">529.8</div>
                <div className="text-xs text-gray-600 mt-1">TPS (초당 트랜잭션)</div>
            </div>
            <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-xs text-gray-600 mt-1">판결문 무결성</div>
            </div>
            <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-amber-600">0.8초</div>
                <div className="text-xs text-gray-600 mt-1">평균 동기화 시간</div>
            </div>
        </div>
    </div>
);
