const Overview = () => {
    return (
        <div className="space-y-6 animate-slide-in">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">⚖️ 고등법원 OpenHash 시스템</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold text-blue-900 mb-3">기본 정보</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b"><td className="py-2 font-medium">설치 지역</td><td>6개 (서울, 수원, 대전, 대구, 부산, 광주)</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">원외재판부</td><td>7개 (춘천, 청주, 창원, 전주, 제주, 인천, 울산)</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">역할</td><td>항소심 (2심)</td></tr>
                                <tr><td className="py-2 font-medium">상세 정보</td><td><a href="https://www.scourt.go.kr" target="_blank" className="text-blue-600 hover:underline">공식 홈페이지 →</a></td></tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold text-green-900 mb-3">OpenHash 처리 성능</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b"><td className="py-2 font-medium">TPS</td><td className="text-green-600 font-bold">538.7 tx/s</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">블록 생성</td><td>0.14초</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">검증 정확도</td><td>100%</td></tr>
                                <tr><td className="py-2 font-medium">연간 항소</td><td>41,263건</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-600 p-6 rounded-lg">
                    <h3 className="font-bold text-xl text-blue-900 mb-4">🔗 OpenHash 핵심 기능</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">📑</div>
                            <h4 className="font-bold mb-2">항소심 판결 보존</h4>
                            <p className="text-sm text-gray-600">41,263건/년<br/>OpenHash 영구기록</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">🔍</div>
                            <h4 className="font-bold mb-2">AI 쟁점 분석</h4>
                            <p className="text-sm text-gray-600">1심 판결 검토<br/>쟁점 자동 추출</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">⚖️</div>
                            <h4 className="font-bold mb-2">유사 판례 AI 검색</h4>
                            <p className="text-sm text-gray-600">항소심 판례<br/>자동 추천</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid md:grid-cols-3 gap-4">
                    <div className="bg-white border-2 border-blue-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-blue-600">41,263</div>
                        <div className="text-sm text-gray-600 mt-1">연간 항소 건수</div>
                    </div>
                    <div className="bg-white border-2 border-green-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-green-600">98.7%</div>
                        <div className="text-sm text-gray-600 mt-1">AI 정확도</div>
                    </div>
                    <div className="bg-white border-2 border-cyan-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-cyan-600">91%</div>
                        <div className="text-sm text-gray-600 mt-1">처리 시간 단축</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
