const Overview = () => (
    <div className="space-y-6 animate-slide-in">
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🏢 사법연수원 OpenHash 시스템</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="border rounded-lg p-4">
                    <h3 className="font-bold text-violet-900 mb-3">기본 정보</h3>
                    <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b"><td className="py-2 font-medium">설립</td><td>1971년</td></tr>
                            <tr className="border-b"><td className="py-2 font-medium">소재지</td><td>경기 고양 일산</td></tr>
                            <tr className="border-b"><td className="py-2 font-medium">역할</td><td>법관 연수</td></tr>
                            <tr><td className="py-2 font-medium">상세 정보</td><td><a href="https://www.scourt.go.kr" target="_blank" className="text-violet-600 hover:underline">공식 홈페이지 →</a></td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="border rounded-lg p-4">
                    <h3 className="font-bold text-green-900 mb-3">OpenHash 처리 성능</h3>
                    <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b"><td className="py-2 font-medium">TPS</td><td className="text-green-600 font-bold">541.6 tx/s</td></tr>
                            <tr className="border-b"><td className="py-2 font-medium">블록 생성</td><td>0.13초</td></tr>
                            <tr className="border-b"><td className="py-2 font-medium">검증 정확도</td><td>100%</td></tr>
                            <tr><td className="py-2 font-medium">연수 과정</td><td>2,847건</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 border-l-4 border-violet-600 p-6 rounded-lg">
                <h3 className="font-bold text-xl text-violet-900 mb-4">🔗 OpenHash 핵심 기능</h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded shadow-sm">
                        <div className="text-2xl mb-2">📚</div>
                        <h4 className="font-bold mb-2">AI 맞춤 교육</h4>
                        <p className="text-sm text-gray-600">법관 경력 분석<br/>최적 연수 과정</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                        <div className="text-2xl mb-2">🎓</div>
                        <h4 className="font-bold mb-2">교육 효과 AI 분석</h4>
                        <p className="text-sm text-gray-600">학습 성과 평가<br/>개선점 도출</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                        <div className="text-2xl mb-2">📊</div>
                        <h4 className="font-bold mb-2">판례 AI 교육</h4>
                        <p className="text-sm text-gray-600">최신 판례 자동 정리<br/>교육 자료 생성</p>
                    </div>
                </div>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-white border-2 border-violet-200 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-violet-600">2,847</div>
                    <div className="text-sm text-gray-600 mt-1">연간 연수 과정</div>
                </div>
                <div className="bg-white border-2 border-green-200 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">98.6%</div>
                    <div className="text-sm text-gray-600 mt-1">AI 정확도</div>
                </div>
                <div className="bg-white border-2 border-purple-200 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-purple-600">90%</div>
                    <div className="text-sm text-gray-600 mt-1">교육 효율 향상</div>
                </div>
            </div>
        </div>
    </div>
);
