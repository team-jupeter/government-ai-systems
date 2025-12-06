const NDRIntegration = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">🔗 국가데이터저장소(NDR) 연동</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="border-2 border-purple-200 rounded-lg p-5">
                <h3 className="font-bold text-lg mb-4 text-purple-900">📥 수신 데이터</h3>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b"><td className="py-2">위헌법률심판 제청</td><td className="text-right font-mono text-green-600">법원</td></tr>
                        <tr className="border-b"><td className="py-2">탄핵소추</td><td className="text-right font-mono text-green-600">국회</td></tr>
                        <tr className="border-b"><td className="py-2">정당해산심판 청구</td><td className="text-right font-mono text-green-600">정부</td></tr>
                        <tr><td className="py-2">헌법소원 청구</td><td className="text-right font-mono text-green-600">국민</td></tr>
                    </tbody>
                </table>
            </div>
            
            <div className="border-2 border-green-200 rounded-lg p-5">
                <h3 className="font-bold text-lg mb-4 text-green-900">📤 송신 데이터</h3>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b"><td className="py-2">위헌 결정</td><td className="text-right font-mono text-blue-600">법원·국회</td></tr>
                        <tr className="border-b"><td className="py-2">탄핵 결정</td><td className="text-right font-mono text-blue-600">대상 기관</td></tr>
                        <tr className="border-b"><td className="py-2">정당해산 결정</td><td className="text-right font-mono text-blue-600">선관위</td></tr>
                        <tr><td className="py-2">헌법소원 결정</td><td className="text-right font-mono text-blue-600">청구인</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">548.7</div>
                <div className="text-xs text-gray-600 mt-1">TPS (초당 트랜잭션)</div>
            </div>
            <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-xs text-gray-600 mt-1">데이터 무결성</div>
            </div>
            <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-fuchsia-600">0.3초</div>
                <div className="text-xs text-gray-600 mt-1">평균 동기화 시간</div>
            </div>
        </div>
    </div>
);
