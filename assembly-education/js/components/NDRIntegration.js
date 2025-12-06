const NDRIntegration = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">🔗 국가데이터저장소(NDR) 연동</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="border-2 border-purple-200 rounded-lg p-5">
                <h3 className="font-bold text-lg mb-4 text-purple-900">📥 수신 데이터</h3>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b"><td className="py-2">학생 학적 정보</td><td className="text-right font-mono text-green-600">9.2M건</td></tr>
                        <tr className="border-b"><td className="py-2">학교 예산 집행</td><td className="text-right font-mono text-green-600">실시간</td></tr>
                        <tr className="border-b"><td className="py-2">교육과정 데이터</td><td className="text-right font-mono text-green-600">2,134건</td></tr>
                        <tr><td className="py-2">사교육비 통계</td><td className="text-right font-mono text-green-600">실시간</td></tr>
                    </tbody>
                </table>
            </div>
            
            <div className="border-2 border-green-200 rounded-lg p-5">
                <h3 className="font-bold text-lg mb-4 text-green-900">📤 송신 데이터</h3>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b"><td className="py-2">교육 법안 의결</td><td className="text-right font-mono text-blue-600">234건/년</td></tr>
                        <tr className="border-b"><td className="py-2">교육과정 검정</td><td className="text-right font-mono text-blue-600">89건/년</td></tr>
                        <tr className="border-b"><td className="py-2">학교 감사 결과</td><td className="text-right font-mono text-blue-600">실시간</td></tr>
                        <tr><td className="py-2">정책 권고안</td><td className="text-right font-mono text-blue-600">147건/년</td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">478.9</div>
                <div className="text-xs text-gray-600 mt-1">TPS (초당 트랜잭션)</div>
            </div>
            <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-xs text-gray-600 mt-1">학생 데이터 무결성</div>
            </div>
            <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">0.5초</div>
                <div className="text-xs text-gray-600 mt-1">평균 동기화 시간</div>
            </div>
        </div>
    </div>
);
