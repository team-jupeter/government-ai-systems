const NDRIntegration = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🔗 국가데이터저장소(NDR) 연동</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="border-2 border-blue-200 rounded-lg p-5">
                    <h3 className="font-bold text-lg mb-4 text-blue-900">📥 수신 데이터</h3>
                    <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b"><td className="py-2">법안 정보</td><td className="text-right font-mono text-green-600">실시간</td></tr>
                            <tr className="border-b"><td className="py-2">상임위 의결</td><td className="text-right font-mono text-green-600">실시간</td></tr>
                            <tr className="border-b"><td className="py-2">예산안</td><td className="text-right font-mono text-green-600">실시간</td></tr>
                            <tr><td className="py-2">인사청문회</td><td className="text-right font-mono text-green-600">실시간</td></tr>
                        </tbody>
                    </table>
                </div>
                
                <div className="border-2 border-green-200 rounded-lg p-5">
                    <h3 className="font-bold text-lg mb-4 text-green-900">📤 송신 데이터</h3>
                    <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b"><td className="py-2">본회의 일정</td><td className="text-right font-mono text-blue-600">24회/일</td></tr>
                            <tr className="border-b"><td className="py-2">의사록</td><td className="text-right font-mono text-blue-600">847건/월</td></tr>
                            <tr className="border-b"><td className="py-2">투표 결과</td><td className="text-right font-mono text-blue-600">234건/월</td></tr>
                            <tr><td className="py-2">위원 변경</td><td className="text-right font-mono text-blue-600">12건/월</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-lg mb-4">⚡ 데이터 파이프라인</h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold">1</div>
                        <div className="flex-1 bg-white p-3 rounded shadow-sm">
                            <div className="font-bold text-sm">수신 & 검증</div>
                            <div className="text-xs text-gray-600 mt-1">NDR → OpenHash 무결성 검증 (0.23초)</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold">2</div>
                        <div className="flex-1 bg-white p-3 rounded shadow-sm">
                            <div className="font-bold text-sm">AI 분석 & 분류</div>
                            <div className="text-xs text-gray-600 mt-1">DeepSeek R1 자동 카테고리 분류 (1.2초)</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-bold">3</div>
                        <div className="flex-1 bg-white p-3 rounded shadow-sm">
                            <div className="font-bold text-sm">분산 저장</div>
                            <div className="text-xs text-gray-600 mt-1">24개 노드 동시 기록 (0.18초)</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-orange-600 text-white px-3 py-1 rounded text-sm font-bold">4</div>
                        <div className="flex-1 bg-white p-3 rounded shadow-sm">
                            <div className="font-bold text-sm">공개 & 알림</div>
                            <div className="text-xs text-gray-600 mt-1">위원 알림, 국민 공개 (즉시)</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">487.3</div>
                    <div className="text-xs text-gray-600 mt-1">TPS (초당 트랜잭션)</div>
                </div>
                <div className="bg-white border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">100%</div>
                    <div className="text-xs text-gray-600 mt-1">데이터 무결성</div>
                </div>
                <div className="bg-white border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">0.6초</div>
                    <div className="text-xs text-gray-600 mt-1">평균 동기화 시간</div>
                </div>
            </div>
        </div>
    );
};
