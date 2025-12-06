const Overview = () => {
    return (
        <div className="space-y-6 animate-slide-in">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">🔍 감사원 OpenHash 시스템</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold text-emerald-900 mb-3">기본 정보</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b"><td className="py-2 font-medium">설립</td><td>1963년</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">감사위원</td><td>7명 (원장 + 6명)</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">역할</td><td>회계검사·직무감찰</td></tr>
                                <tr><td className="py-2 font-medium">상세 정보</td><td><a href="https://www.bai.go.kr" target="_blank" className="text-emerald-600 hover:underline">공식 홈페이지 →</a></td></tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold text-green-900 mb-3">OpenHash 처리 성능</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b"><td className="py-2 font-medium">TPS</td><td className="text-green-600 font-bold">556.8 tx/s</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">블록 생성</td><td>0.09초</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">검증 정확도</td><td>100%</td></tr>
                                <tr><td className="py-2 font-medium">감사 건수</td><td>4,284건/년</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-600 p-6 rounded-lg">
                    <h3 className="font-bold text-xl text-emerald-900 mb-4">🔗 OpenHash 핵심 기능</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">💰</div>
                            <h4 className="font-bold mb-2">회계 AI 검사</h4>
                            <p className="text-sm text-gray-600">국가 세입·세출<br/>자동 검증</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">🔎</div>
                            <h4 className="font-bold mb-2">직무 AI 감찰</h4>
                            <p className="text-sm text-gray-600">공무원 비위<br/>자동 적발</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">📊</div>
                            <h4 className="font-bold mb-2">부정 AI 탐지</h4>
                            <p className="text-sm text-gray-600">이상 거래<br/>실시간 감지</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid md:grid-cols-3 gap-4">
                    <div className="bg-white border-2 border-emerald-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-emerald-600">4,284</div>
                        <div className="text-sm text-gray-600 mt-1">연간 감사 건수</div>
                    </div>
                    <div className="bg-white border-2 border-green-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-green-600">99.6%</div>
                        <div className="text-sm text-gray-600 mt-1">AI 정확도</div>
                    </div>
                    <div className="bg-white border-2 border-teal-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-teal-600">98%</div>
                        <div className="text-sm text-gray-600 mt-1">부정 적발률</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
