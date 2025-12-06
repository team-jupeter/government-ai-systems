const Overview = () => (
    <div className="space-y-6 animate-slide-in">
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🏢 사법정책연구원 OpenHash 시스템</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="border rounded-lg p-4">
                    <h3 className="font-bold text-indigo-900 mb-3">기본 정보</h3>
                    <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b"><td className="py-2 font-medium">설립</td><td>2004년</td></tr>
                            <tr className="border-b"><td className="py-2 font-medium">소재지</td><td>경기 고양 일산</td></tr>
                            <tr className="border-b"><td className="py-2 font-medium">역할</td><td>사법정책 연구</td></tr>
                            <tr><td className="py-2 font-medium">상세 정보</td><td><a href="https://www.scourt.go.kr" target="_blank" className="text-indigo-600 hover:underline">공식 홈페이지 →</a></td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="border rounded-lg p-4">
                    <h3 className="font-bold text-green-900 mb-3">OpenHash 처리 성능</h3>
                    <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b"><td className="py-2 font-medium">TPS</td><td className="text-green-600 font-bold">537.4 tx/s</td></tr>
                            <tr className="border-b"><td className="py-2 font-medium">블록 생성</td><td>0.14초</td></tr>
                            <tr className="border-b"><td className="py-2 font-medium">검증 정확도</td><td>100%</td></tr>
                            <tr><td className="py-2 font-medium">연구 보고서</td><td>1,247건</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-l-4 border-indigo-600 p-6 rounded-lg">
                <h3 className="font-bold text-xl text-indigo-900 mb-4">🔗 OpenHash 핵심 기능</h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded shadow-sm">
                        <div className="text-2xl mb-2">📊</div>
                        <h4 className="font-bold mb-2">정책 AI 분석</h4>
                        <p className="text-sm text-gray-600">사법정책 효과 분석<br/>개선안 도출</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                        <div className="text-2xl mb-2">🌏</div>
                        <h4 className="font-bold mb-2">해외 사례 AI 연구</h4>
                        <p className="text-sm text-gray-600">주요국 제도 비교<br/>시사점 도출</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                        <div className="text-2xl mb-2">📝</div>
                        <h4 className="font-bold mb-2">보고서 AI 작성</h4>
                        <p className="text-sm text-gray-600">연구 자료 자동 정리<br/>보고서 초안 생성</p>
                    </div>
                </div>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-white border-2 border-indigo-200 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-indigo-600">1,247</div>
                    <div className="text-sm text-gray-600 mt-1">연구 보고서</div>
                </div>
                <div className="bg-white border-2 border-green-200 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">97.8%</div>
                    <div className="text-sm text-gray-600 mt-1">AI 정확도</div>
                </div>
                <div className="bg-white border-2 border-blue-200 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">88%</div>
                    <div className="text-sm text-gray-600 mt-1">연구 효율 향상</div>
                </div>
            </div>
        </div>
    </div>
);
