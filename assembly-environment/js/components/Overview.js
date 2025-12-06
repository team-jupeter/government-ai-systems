const Overview = () => {
    return (
        <div className="space-y-6 animate-slide-in">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">🌍 환경노동위원회 OpenHash 시스템</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold text-emerald-900 mb-3">기본 정보</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b"><td className="py-2 font-medium">위원장</td><td>강선우 (국민의힘)</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">위원 수</td><td>18명</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">소관</td><td>환경부, 고용노동부</td></tr>
                                <tr><td className="py-2 font-medium">상세 정보</td><td><a href="https://environment.na.go.kr" target="_blank" className="text-emerald-600 hover:underline">공식 홈페이지 →</a></td></tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold text-green-900 mb-3">OpenHash 처리 성능</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b"><td className="py-2 font-medium">TPS</td><td className="text-green-600 font-bold">503.9 tx/s</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">블록 생성</td><td>0.17초</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">검증 정확도</td><td>100%</td></tr>
                                <tr><td className="py-2 font-medium">탄소 배출</td><td>2.4M톤 추적</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-600 p-6 rounded-lg">
                    <h3 className="font-bold text-xl text-emerald-900 mb-4">🔗 OpenHash 핵심 기능</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">🌱</div>
                            <h4 className="font-bold mb-2">탄소 배출 추적</h4>
                            <p className="text-sm text-gray-600">2.4M톤 모니터링<br/>OpenHash 기록</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">👷</div>
                            <h4 className="font-bold mb-2">산업재해 투명성</h4>
                            <p className="text-sm text-gray-600">4,283건 추적<br/>위변조 방지</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">⏰</div>
                            <h4 className="font-bold mb-2">근로 조건 감독</h4>
                            <p className="text-sm text-gray-600">실시간 검사<br/>AI 자동화</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid md:grid-cols-3 gap-4">
                    <div className="bg-white border-2 border-emerald-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-emerald-600">3,184</div>
                        <div className="text-sm text-gray-600 mt-1">OpenHash 검증 건수</div>
                    </div>
                    <div className="bg-white border-2 border-green-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-green-600">94.8%</div>
                        <div className="text-sm text-gray-600 mt-1">AI 정확도</div>
                    </div>
                    <div className="bg-white border-2 border-blue-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-blue-600">79%</div>
                        <div className="text-sm text-gray-600 mt-1">처리 시간 단축</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
