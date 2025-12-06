const Overview = () => {
    return (
        <div className="space-y-6 animate-slide-in">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">🍊 제주특별자치도 OpenHash 시스템</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold text-orange-900 mb-3">기본 정보</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b"><td className="py-2 font-medium">설립</td><td>2006년 (특별자치도 출범)</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">인구</td><td>약 68만명 (2024)</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">구조</td><td>단층제 (기초자치단체 없음)</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">행정시</td><td>제주시, 서귀포시</td></tr>
                                <tr><td className="py-2 font-medium">상세 정보</td><td><a href="https://www.jeju.go.kr" target="_blank" className="text-orange-600 hover:underline">공식 홈페이지 →</a></td></tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold text-green-900 mb-3">OpenHash 처리 성능</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b"><td className="py-2 font-medium">TPS</td><td className="text-green-600 font-bold">542.7 tx/s</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">블록 생성</td><td>0.11초</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">노드</td><td>15개 (도청 + 행정시 + 읍면)</td></tr>
                                <tr><td className="py-2 font-medium">행정구역</td><td>7읍 5면 31동</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-600 p-6 rounded-lg">
                    <h3 className="font-bold text-xl text-orange-900 mb-4">🔗 OpenHash 핵심 기능</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">✈️</div>
                            <h4 className="font-bold mb-2">관광 AI 관리</h4>
                            <p className="text-sm text-gray-600">관광객 동선 분석<br/>스마트 관광 추천</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">🍊</div>
                            <h4 className="font-bold mb-2">감귤 산업 AI</h4>
                            <p className="text-sm text-gray-600">스마트팜 자동화<br/>유통 AI 최적화</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">🌿</div>
                            <h4 className="font-bold mb-2">환경 AI 보호</h4>
                            <p className="text-sm text-gray-600">세계자연유산 모니터링<br/>생태계 AI 관리</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid md:grid-cols-3 gap-4">
                    <div className="bg-white border-2 border-orange-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-orange-600">1,547만</div>
                        <div className="text-sm text-gray-600 mt-1">연간 관광객 (2024)</div>
                    </div>
                    <div className="bg-white border-2 border-green-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-green-600">99.2%</div>
                        <div className="text-sm text-gray-600 mt-1">AI 정확도</div>
                    </div>
                    <div className="bg-white border-2 border-blue-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-blue-600">95%</div>
                        <div className="text-sm text-gray-600 mt-1">행정 효율 향상</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
