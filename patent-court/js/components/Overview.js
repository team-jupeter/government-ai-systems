const Overview = () => {
    return (
        <div className="space-y-6 animate-slide-in">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">⚖️ 특허법원 OpenHash 시스템</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold text-orange-900 mb-3">기본 정보</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b"><td className="py-2 font-medium">소재지</td><td>대전광역시 (전국 관할)</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">등급</td><td>고등법원급 전문법원</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">역할</td><td>특허심결 취소소송 1심, 특허침해 2심</td></tr>
                                <tr><td className="py-2 font-medium">상세 정보</td><td><a href="https://patent.scourt.go.kr" target="_blank" className="text-orange-600 hover:underline">공식 홈페이지 →</a></td></tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                        <h3 className="font-bold text-green-900 mb-3">OpenHash 처리 성능</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b"><td className="py-2 font-medium">TPS</td><td className="text-green-600 font-bold">529.8 tx/s</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">블록 생성</td><td>0.16초</td></tr>
                                <tr className="border-b"><td className="py-2 font-medium">검증 정확도</td><td>100%</td></tr>
                                <tr><td className="py-2 font-medium">연간 사건</td><td>4,738건</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-600 p-6 rounded-lg">
                    <h3 className="font-bold text-xl text-orange-900 mb-4">🔗 OpenHash 핵심 기능</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">🔬</div>
                            <h4 className="font-bold mb-2">기술 분석 AI</h4>
                            <p className="text-sm text-gray-600">특허 기술 자동 분석<br/>선행기술 검색</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">📋</div>
                            <h4 className="font-bold mb-2">심결 검증 AI</h4>
                            <p className="text-sm text-gray-600">특허심판원 심결<br/>적법성 AI 검토</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="text-2xl mb-2">💡</div>
                            <h4 className="font-bold mb-2">침해 판단 AI</h4>
                            <p className="text-sm text-gray-600">특허침해 여부<br/>AI 분석</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid md:grid-cols-3 gap-4">
                    <div className="bg-white border-2 border-orange-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-orange-600">4,738</div>
                        <div className="text-sm text-gray-600 mt-1">연간 사건 건수</div>
                    </div>
                    <div className="bg-white border-2 border-green-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-green-600">99.1%</div>
                        <div className="text-sm text-gray-600 mt-1">AI 정확도</div>
                    </div>
                    <div className="bg-white border-2 border-amber-200 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-amber-600">92%</div>
                        <div className="text-sm text-gray-600 mt-1">처리 시간 단축</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
