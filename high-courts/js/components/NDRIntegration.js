const NDRIntegration = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">🔗 국가데이터저장소(NDR) 연동</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="border-2 border-blue-200 rounded-lg p-5">
                <h3 className="font-bold text-lg mb-4 text-blue-900">📥 수신 데이터</h3>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b"><td className="py-2">1심 판결문</td><td className="text-right font-mono text-green-600">41,263건/년</td></tr>
                        <tr className="border-b"><td className="py-2">항소장</td><td className="text-right font-mono text-green-600">실시간</td></tr>
                        <tr className="border-b"><td className="py-2">관련 판례</td><td className="text-right font-mono text-green-600">실시간</td></tr>
                        <tr><td className="py-2">증거 자료</td><td className="text-right font-mono text-green-600">실시간</td></tr>
                    </tbody>
                </table>
            </div>
            
            <div className="border-2 border-green-200 rounded-lg p-5">
                <h3 className="font-bold text-lg mb-4 text-green-900">📤 송신 데이터</h3>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b"><td className="py-2">항소심 판결</td><td className="text-right font-mono text-blue-600">41,263건/년</td></tr>
                        <tr className="border-b"><td className="py-2">파기환송 결정</td><td className="text-right font-mono text-blue-600">실시간</td></tr>
                        <tr className="border-b"><td className="py-2">항소심 판례</td><td className="text-right font-mono text-blue-600">실시간</td></tr>
                        <tr><td className="py-2">사법 통계</td><td className="text-right font-mono text-blue-600">월간</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">538.7</div>
                <div className="text-xs text-gray-600 mt-1">TPS (초당 트랜잭션)</div>
            </div>
            <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-xs text-gray-600 mt-1">판결문 무결성</div>
            </div>
            <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-cyan-600">0.6초</div>
                <div className="text-xs text-gray-600 mt-1">평균 동기화 시간</div>
            </div>
        </div>
    </div>
);
