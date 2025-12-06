const Overview = () => {
    return (
        <div className="space-y-6 animate-slide-in">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">🗳️ 중앙선거관리위원회 OpenHash 시스템</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold text-sky-900 mb-3">기본 정보</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b"><td className="py-2 font-medium">설립</td><td>1963년</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">위원</td><td>9명 (대통령·국회·대법원장 각 3명)</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">역할</td><td>선거·국민투표 관리</td></tr>
                                <tr><td className="py-2 font-medium">상세 정보</td><td><a href="https://www.nec.go.kr" target="_blank" className="text-sky-600 hover:underline">공식 홈페이지 →</a></td></tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold text-green-900 mb-3">OpenHash 처리 성능</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b"><td className="py-2 font-medium">TPS</td><td className="text-green-600 font-bold">552.4 tx/s</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">블록 생성</td><td>0.10초</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">검증 정확도</td><td>100%</td></tr>
                                <tr><td className="py-2 font-medium">관리 위원회</td><td>3,771개</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-sky-50 to-blue-50 border-l-4 border-sky-600 p-6 rounded-lg">
                    <h3 className="font-bold text-xl text-sky-900 mb-4">🔗 OpenHash 핵심 기능</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">🗳️</div>
                            <h4 className="font-bold mb-2">선거 AI 모니터링</h4>
                            <p className="text-sm text-gray-600">부정선거 자동 감지<br/>실시간 개표 검증</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">💰</div>
                            <h4 className="font-bold mb-2">정치자금 AI 감시</h4>
                            <p className="text-sm text-gray-600">불법 정치자금<br/>자동 적발</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">🎯</div>
                            <h4 className="font-bold mb-2">정당 AI 관리</h4>
                            <p className="text-sm text-gray-600">정당 등록·해산<br/>자동 심사</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid md:grid-cols-3 gap-4">
                    <div className="bg-white border-2 border-sky-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-sky-600">3,771</div>
                        <div className="text-sm text-gray-600 mt-1">각급 선관위</div>
                    </div>
                    <div className="bg-white border-2 border-green-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-green-600">99.8%</div>
                        <div className="text-sm text-gray-600 mt-1">AI 정확도</div>
                    </div>
                    <div className="bg-white border-2 border-blue-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-blue-600">97%</div>
                        <div className="text-sm text-gray-600 mt-1">부정 감지율</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
