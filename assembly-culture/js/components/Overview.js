const Overview = () => {
    return (
        <div className="space-y-6 animate-slide-in">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">🎨 문화체육관광위원회 OpenHash 시스템</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold text-fuchsia-900 mb-3">기본 정보</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b"><td className="py-2 font-medium">위원장</td><td>서범수 (국민의힘)</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">위원 수</td><td>16명</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">소관</td><td>문체부</td></tr>
                                <tr><td className="py-2 font-medium">상세 정보</td><td><a href="https://culture.na.go.kr" target="_blank" className="text-fuchsia-600 hover:underline">공식 홈페이지 →</a></td></tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold text-green-900 mb-3">OpenHash 처리 성능</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b"><td className="py-2 font-medium">TPS</td><td className="text-green-600 font-bold">492.7 tx/s</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">블록 생성</td><td>0.18초</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">검증 정확도</td><td>100%</td></tr>
                                <tr><td className="py-2 font-medium">저작권 보호</td><td>4,892건</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-fuchsia-50 to-pink-50 border-l-4 border-fuchsia-600 p-6 rounded-lg">
                    <h3 className="font-bold text-xl text-fuchsia-900 mb-4">🔗 OpenHash 핵심 기능</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">🎬</div>
                            <h4 className="font-bold mb-2">문화 예산 투명성</h4>
                            <p className="text-sm text-gray-600">영화·공연 지원금<br/>OpenHash 추적</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">©️</div>
                            <h4 className="font-bold mb-2">저작권 AI 보호</h4>
                            <p className="text-sm text-gray-600">4,892건 침해<br/>자동 탐지</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">⚽</div>
                            <h4 className="font-bold mb-2">체육 예산 추적</h4>
                            <p className="text-sm text-gray-600">올림픽·월드컵<br/>실시간 감사</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid md:grid-cols-3 gap-4">
                    <div className="bg-white border-2 border-fuchsia-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-fuchsia-600">2,647</div>
                        <div className="text-sm text-gray-600 mt-1">OpenHash 검증 건수</div>
                    </div>
                    <div className="bg-white border-2 border-green-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-green-600">94.3%</div>
                        <div className="text-sm text-gray-600 mt-1">AI 정확도</div>
                    </div>
                    <div className="bg-white border-2 border-blue-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-blue-600">77%</div>
                        <div className="text-sm text-gray-600 mt-1">처리 시간 단축</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
