const Overview = () => (
    <div className="space-y-6 animate-slide-in">
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">⚖️ 양형위원회 OpenHash 시스템</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="border rounded-lg p-4">
                    <h3 className="font-bold text-purple-900 mb-3">기본 정보</h3>
                    <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b"><td className="py-2 font-medium">설립</td><td>2007년</td></tr>
                            <tr className="border-b"><td className="py-2 font-medium">위원</td><td>13명 (법관, 검사, 변호사, 교수 등)</td></tr>
                            <tr className="border-b"><td className="py-2 font-medium">역할</td><td>양형기준 수립</td></tr>
                            <tr><td className="py-2 font-medium">상세 정보</td><td><a href="https://sc.scourt.go.kr" target="_blank" className="text-purple-600 hover:underline">공식 홈페이지 →</a></td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="border rounded-lg p-4">
                    <h3 className="font-bold text-green-900 mb-3">OpenHash 처리 성능</h3>
                    <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b"><td className="py-2 font-medium">TPS</td><td className="text-green-600 font-bold">536.8 tx/s</td></tr>
                            <tr className="border-b"><td className="py-2 font-medium">블록 생성</td><td>0.14초</td></tr>
                            <tr className="border-b"><td className="py-2 font-medium">검증 정확도</td><td>100%</td></tr>
                            <tr><td className="py-2 font-medium">양형 기준</td><td>127개 죄종</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 border-l-4 border-purple-600 p-6 rounded-lg">
                <h3 className="font-bold text-xl text-purple-900 mb-4">🔗 OpenHash 핵심 기능</h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded shadow-sm">
                        <div className="text-2xl mb-2">📊</div>
                        <h4 className="font-bold mb-2">양형 AI 분석</h4>
                        <p className="text-sm text-gray-600">과거 판례 분석<br/>양형 패턴 도출</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                        <div className="text-2xl mb-2">⚖️</div>
                        <h4 className="font-bold mb-2">양형 기준 AI 수립</h4>
                        <p className="text-sm text-gray-600">죄종별 기준<br/>자동 생성</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                        <div className="text-2xl mb-2">🔍</div>
                        <h4 className="font-bold mb-2">양형 적정성 AI 검토</h4>
                        <p className="text-sm text-gray-600">개별 사건<br/>적정성 평가</p>
                    </div>
                </div>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-white border-2 border-purple-200 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-purple-600">127</div>
                    <div className="text-sm text-gray-600 mt-1">양형 기준 죄종</div>
                </div>
                <div className="bg-white border-2 border-green-200 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">99.7%</div>
                    <div className="text-sm text-gray-600 mt-1">AI 분석 정확도</div>
                </div>
                <div className="bg-white border-2 border-fuchsia-200 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-fuchsia-600">92%</div>
                    <div className="text-sm text-gray-600 mt-1">양형 적정성</div>
                </div>
            </div>
        </div>
    </div>
);
