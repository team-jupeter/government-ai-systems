const Overview = () => {
    return (
        <div className="space-y-6 animate-slide-in">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">⚖️ 헌법재판소 OpenHash 시스템</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold text-purple-900 mb-3">기본 정보</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b"><td className="py-2 font-medium">설립</td><td>1988년</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">재판관</td><td>9명 (대통령·국회·대법원장 각 3명)</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">역할</td><td>헌법재판 총괄</td></tr>
                                <tr><td className="py-2 font-medium">상세 정보</td><td><a href="https://www.ccourt.go.kr" target="_blank" className="text-purple-600 hover:underline">공식 홈페이지 →</a></td></tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold text-green-900 mb-3">OpenHash 처리 성능</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b"><td className="py-2 font-medium">TPS</td><td className="text-green-600 font-bold">548.7 tx/s</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">블록 생성</td><td>0.11초</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">검증 정확도</td><td>100%</td></tr>
                                <tr><td className="py-2 font-medium">심판 건수</td><td>1,951건/년</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 border-l-4 border-purple-600 p-6 rounded-lg">
                    <h3 className="font-bold text-xl text-purple-900 mb-4">🔗 OpenHash 핵심 기능</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">⚖️</div>
                            <h4 className="font-bold mb-2">위헌심사 AI 분석</h4>
                            <p className="text-sm text-gray-600">법률 위헌성 자동 검토<br/>판례 DB 검색</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">📜</div>
                            <h4 className="font-bold mb-2">탄핵·정당해산 심판</h4>
                            <p className="text-sm text-gray-600">증거 자동 정리<br/>법리 분석</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">🛡️</div>
                            <h4 className="font-bold mb-2">헌법소원 AI 심사</h4>
                            <p className="text-sm text-gray-600">기본권 침해 여부<br/>자동 판단</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid md:grid-cols-3 gap-4">
                    <div className="bg-white border-2 border-purple-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-purple-600">1,951</div>
                        <div className="text-sm text-gray-600 mt-1">연간 심판 건수</div>
                    </div>
                    <div className="bg-white border-2 border-green-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-green-600">99.4%</div>
                        <div className="text-sm text-gray-600 mt-1">AI 정확도</div>
                    </div>
                    <div className="bg-white border-2 border-fuchsia-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-fuchsia-600">96%</div>
                        <div className="text-sm text-gray-600 mt-1">심리 시간 단축</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
