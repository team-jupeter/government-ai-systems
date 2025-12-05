const Overview = () => {
    return (
        <div className="space-y-6 animate-slide-in">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">⚖️ 법제사법위원회 OpenHash 시스템</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold text-blue-900 mb-3">기본 정보</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b"><td className="py-2 font-medium">위원장</td><td>정청래 (더불어민주당)</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">위원 수</td><td>18명</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">소관</td><td>법무부, 법제처, 감사원 등 6개</td></tr>
                                <tr><td className="py-2 font-medium">상세 정보</td><td><a href="https://likms.assembly.go.kr/bill" target="_blank" className="text-blue-600 hover:underline">공식 홈페이지 →</a></td></tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold text-green-900 mb-3">OpenHash 처리 성능</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b"><td className="py-2 font-medium">TPS</td><td className="text-green-600 font-bold">481.4 tx/s</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">블록 생성</td><td>0.19초</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">검증 정확도</td><td>100%</td></tr>
                                <tr><td className="py-2 font-medium">위헌 차단율</td><td>12건/년</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-600 p-6 rounded-lg">
                    <h3 className="font-bold text-xl text-purple-900 mb-4">🔗 OpenHash 핵심 기능</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">📜</div>
                            <h4 className="font-bold mb-2">법안 체계·자구 검토</h4>
                            <p className="text-sm text-gray-600">AI 1차 검토 89%<br/>처리 시간 73% 단축</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">⚠️</div>
                            <h4 className="font-bold mb-2">위헌 요소 AI 탐지</h4>
                            <p className="text-sm text-gray-600">헌재 판례 3.2만건<br/>실시간 매칭</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">🔍</div>
                            <h4 className="font-bold mb-2">법령 충돌 분석</h4>
                            <p className="text-sm text-gray-600">10,847개 법령 비교<br/>평균 1.3초</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid md:grid-cols-3 gap-4">
                    <div className="bg-white border-2 border-purple-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-purple-600">1,847</div>
                        <div className="text-sm text-gray-600 mt-1">OpenHash 검증 건수</div>
                    </div>
                    <div className="bg-white border-2 border-green-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-green-600">96.8%</div>
                        <div className="text-sm text-gray-600 mt-1">AI 정확도</div>
                    </div>
                    <div className="bg-white border-2 border-blue-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-blue-600">23일→6일</div>
                        <div className="text-sm text-gray-600 mt-1">평균 심사 기간</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
