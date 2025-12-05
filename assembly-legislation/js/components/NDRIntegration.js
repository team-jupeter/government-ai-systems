const NDRIntegration = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🔗 국가데이터저장소(NDR) 연동</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="font-bold text-lg mb-4 text-blue-900">📥 수신 데이터</h3>
                    <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b"><td className="py-2">상임위 통과 법안</td><td className="text-right font-mono text-green-600">1,847건/년</td></tr>
                            <tr className="border-b"><td className="py-2">법무부 범죄통계</td><td className="text-right font-mono text-green-600">실시간</td></tr>
                            <tr className="border-b"><td className="py-2">법제처 법령 DB</td><td className="text-right font-mono text-green-600">10,847개</td></tr>
                            <tr><td className="py-2">헌재/대법원 판례</td><td className="text-right font-mono text-green-600">81.2만건</td></tr>
                        </tbody>
                    </table>
                </div>
                
                <div className="border-2 border-green-200 rounded-lg p-5">
                    <h3 className="font-bold text-lg mb-4 text-green-900">📤 송신 데이터</h3>
                    <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b"><td className="py-2">체계자구 수정</td><td className="text-right font-mono text-blue-600">3,241건/년</td></tr>
                            <tr className="border-b"><td className="py-2">최종 통과 법안</td><td className="text-right font-mono text-blue-600">856건/년</td></tr>
                            <tr className="border-b"><td className="py-2">위헌 요소 차단</td><td className="text-right font-mono text-blue-600">12건/년</td></tr>
                            <tr><td className="py-2">법령 충돌 분석</td><td className="text-right font-mono text-blue-600">실시간</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-lg mb-4">⚡ AI 자동화 파이프라인</h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-bold">1</div>
                        <div className="flex-1 bg-white p-3 rounded shadow-sm">
                            <div className="font-bold text-sm">체계·자구 AI 검토</div>
                            <div className="text-xs text-gray-600 mt-1">용어 일관성, 조문 번호, 문법 → Legal-BERT (1.2초)</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold">2</div>
                        <div className="flex-1 bg-white p-3 rounded shadow-sm">
                            <div className="font-bold text-sm">위헌 요소 AI 탐지</div>
                            <div className="text-xs text-gray-600 mt-1">헌법 조항 충돌, 기본권 침해 → Claude 4 (0.9초)</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold">3</div>
                        <div className="flex-1 bg-white p-3 rounded shadow-sm">
                            <div className="font-bold text-sm">법령 충돌 자동 분석</div>
                            <div className="text-xs text-gray-600 mt-1">10,847개 법령 실시간 비교 → DeepSeek R1 (1.3초)</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-orange-600 text-white px-3 py-1 rounded text-sm font-bold">4</div>
                        <div className="flex-1 bg-white p-3 rounded shadow-sm">
                            <div className="font-bold text-sm">OpenHash 분산 저장</div>
                            <div className="text-xs text-gray-600 mt-1">24개 노드 동시 기록, CRYSTALS-Dilithium 서명 (0.6초)</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">481.4</div>
                    <div className="text-xs text-gray-600 mt-1">TPS (초당 트랜잭션)</div>
                </div>
                <div className="bg-white border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">96.8%</div>
                    <div className="text-xs text-gray-600 mt-1">AI 정확도</div>
                </div>
                <div className="bg-white border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">73%</div>
                    <div className="text-xs text-gray-600 mt-1">처리 시간 단축</div>
                </div>
            </div>
        </div>
    );
};
