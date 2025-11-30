const AIConsultation = () => {
    return (
        <div className="section-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-comments text-blue-600 mr-3"></i>
                        AI 금융 상담
                    </h2>
                    <p className="text-lg text-gray-600">24/7 실시간 금융 전문가 상담</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-200">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                    <i className="fas fa-robot text-white text-xl"></i>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">AI 금융 상담원</div>
                                    <div className="text-sm text-green-600">● 상담 가능</div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
                                    안녕하세요! 통합 디지털 화폐 시스템 AI 상담원입니다. CBDC, 가상자산, 전자화폐 관련 문의사항이 있으시면 언제든 물어보세요.
                                </div>
                                <div className="bg-blue-50 rounded-lg p-4 text-gray-700 ml-12">
                                    CBDC와 가상자산의 차이점이 무엇인가요?
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
                                    좋은 질문입니다! CBDC(중앙은행 디지털화폐)는 한국은행이 발행하는 법정화폐로 원화와 1:1 가치가 보장됩니다. 가상자산은 민간이 발행하며 시장 가격에 따라 가치가 변동됩니다. 저희 플랫폼에서는 두 가지 모두 안전하게 보관하고 거래하실 수 있습니다.
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                placeholder="금융 관련 질문을 입력하세요..." 
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                            />
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                전송
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                        <div className="text-3xl mb-3">💬</div>
                        <div className="font-semibold text-gray-900 mb-2">실시간 답변</div>
                        <p className="text-sm text-gray-600">평균 응답 시간 3초</p>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                        <div className="text-3xl mb-3">🌐</div>
                        <div className="font-semibold text-gray-900 mb-2">다국어 지원</div>
                        <p className="text-sm text-gray-600">한/영/중/일 자동 번역</p>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                        <div className="text-3xl mb-3">🔒</div>
                        <div className="font-semibold text-gray-900 mb-2">개인정보 보호</div>
                        <p className="text-sm text-gray-600">암호화된 상담 내역</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
