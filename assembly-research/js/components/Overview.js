const Overview = () => {
    return (
        <div className="space-y-6 animate-slide-in">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">🔬 국회입법조사처 OpenHash 시스템</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold text-orange-900 mb-3">기본 정보</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b"><td className="py-2 font-medium">처장</td><td>김하중</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">직원 수</td><td>123명</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">역할</td><td>입법 조사·연구</td></tr>
                                <tr><td className="py-2 font-medium">상세 정보</td><td><a href="https://www.nars.go.kr" target="_blank" className="text-orange-600 hover:underline">공식 홈페이지 →</a></td></tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold text-green-900 mb-3">OpenHash 처리 성능</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b"><td className="py-2 font-medium">TPS</td><td className="text-green-600 font-bold">513.6 tx/s</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">블록 생성</td><td>0.17초</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">검증 정확도</td><td>100%</td></tr>
                                <tr><td className="py-2 font-medium">조사 보고서</td><td>3,847건</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-600 p-6 rounded-lg">
                    <h3 className="font-bold text-xl text-orange-900 mb-4">🔗 OpenHash 핵심 기능</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">📝</div>
                            <h4 className="font-bold mb-2">입법 조사</h4>
                            <p className="text-sm text-gray-600">3,847건 보고서<br/>OpenHash 보존</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">🌍</div>
                            <h4 className="font-bold mb-2">해외 정책 분석</h4>
                            <p className="text-sm text-gray-600">주요국 사례<br/>AI 비교</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">📊</div>
                            <h4 className="font-bold mb-2">정책 영향 평가</h4>
                            <p className="text-sm text-gray-600">데이터 기반<br/>시뮬레이션</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid md:grid-cols-3 gap-4">
                    <div className="bg-white border-2 border-orange-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-orange-600">3,847</div>
                        <div className="text-sm text-gray-600 mt-1">OpenHash 검증 건수</div>
                    </div>
                    <div className="bg-white border-2 border-green-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-green-600">96.9%</div>
                        <div className="text-sm text-gray-600 mt-1">AI 정확도</div>
                    </div>
                    <div className="bg-white border-2 border-blue-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-blue-600">86%</div>
                        <div className="text-sm text-gray-600 mt-1">처리 시간 단축</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
