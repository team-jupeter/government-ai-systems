const Overview = () => {
    return (
        <div className="space-y-6 animate-slide-in">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">🏛️ 대법원 OpenHash 시스템</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold text-purple-900 mb-3">기본 정보</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b"><td className="py-2 font-medium">대법원장</td><td>조희대</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">대법관</td><td>14명</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">역할</td><td>최고 사법기관</td></tr>
                                <tr><td className="py-2 font-medium">상세 정보</td><td><a href="https://www.scourt.go.kr" target="_blank" className="text-purple-600 hover:underline">공식 홈페이지 →</a></td></tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold text-green-900 mb-3">OpenHash 처리 성능</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b"><td className="py-2 font-medium">TPS</td><td className="text-green-600 font-bold">542.3 tx/s</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">블록 생성</td><td>0.13초</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">검증 정확도</td><td>100%</td></tr>
                                <tr><td className="py-2 font-medium">판결문</td><td>8.4M건</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 border-l-4 border-purple-600 p-6 rounded-lg">
                    <h3 className="font-bold text-xl text-purple-900 mb-4">🔗 OpenHash 핵심 기능</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">📜</div>
                            <h4 className="font-bold mb-2">판결문 보존</h4>
                            <p className="text-sm text-gray-600">8.4M건 판결문<br/>OpenHash 영구보존</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">🔍</div>
                            <h4 className="font-bold mb-2">판례 AI 검색</h4>
                            <p className="text-sm text-gray-600">유사 판례<br/>자동 추천</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">⚖️</div>
                            <h4 className="font-bold mb-2">양형 AI 분석</h4>
                            <p className="text-sm text-gray-600">과거 판례 기반<br/>양형 예측</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid md:grid-cols-3 gap-4">
                    <div className="bg-white border-2 border-purple-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-purple-600">2,847</div>
                        <div className="text-sm text-gray-600 mt-1">OpenHash 검증 건수</div>
                    </div>
                    <div className="bg-white border-2 border-green-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-green-600">99.2%</div>
                        <div className="text-sm text-gray-600 mt-1">AI 정확도</div>
                    </div>
                    <div className="bg-white border-2 border-blue-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-blue-600">93%</div>
                        <div className="text-sm text-gray-600 mt-1">처리 시간 단축</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
