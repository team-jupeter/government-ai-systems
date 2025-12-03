const Overview = () => {
    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-4">오픈해시 보험 시스템</h2>
                <p className="text-lg text-green-50 mb-6">
                    PDV(개인정보금고) 기반 행동 데이터로 공정한 보험료를 산정하고, 
                    AI가 0.015ms 만에 자동 심사하여 서류 없이 즉시 지급하는 차세대 보험 플랫폼
                </p>
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold">0.015ms</div>
                        <div className="text-sm text-green-50">처리 속도</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold">60%</div>
                        <div className="text-sm text-green-50">최대 할인</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold">0장</div>
                        <div className="text-sm text-green-50">서류 제출</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold">98.7%</div>
                        <div className="text-sm text-green-50">사기 탐지율</div>
                    </div>
                </div>
            </div>

            {/* 핵심 기능 */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
                    <div className="text-green-600 text-4xl mb-4">
                        <i className="fas fa-lock"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">PDV 기반 보험료</h3>
                    <p className="text-gray-600 mb-4">
                        개인정보금고(PDV)의 건강, 운전, 생활 데이터를 분석하여 
                        개인별 맞춤 보험료 산정. 최대 60% 할인 가능.
                    </p>
                    <div className="text-sm text-gray-500">
                        <div>✓ 운동습관 -15%</div>
                        <div>✓ 안전운전 -20%</div>
                        <div>✓ 정기검진 -10%</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
                    <div className="text-blue-600 text-4xl mb-4">
                        <i className="fas fa-robot"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">AI 자동 심사</h3>
                    <p className="text-gray-600 mb-4">
                        DeepSeek R1 기반 AI 앙상블 모델이 0.015ms 만에 
                        언더라이팅 및 청구 심사. 99.2% 정확도.
                    </p>
                    <div className="text-sm text-gray-500">
                        <div>✓ 즉시 승인/거절</div>
                        <div>✓ 실시간 보험료 조정</div>
                        <div>✓ 편향 없는 공정 심사</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
                    <div className="text-purple-600 text-4xl mb-4">
                        <i className="fas fa-shield-alt"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">서류 0장 즉시 지급</h3>
                    <p className="text-gray-600 mb-4">
                        병원 방문/사고 발생 시 PDV가 자동으로 청구 제출. 
                        AI 심사 후 0.015ms 만에 보험금 입금.
                    </p>
                    <div className="text-sm text-gray-500">
                        <div>✓ 제출 서류 0장</div>
                        <div>✓ 자동 청구 처리</div>
                        <div>✓ 실시간 입금</div>
                    </div>
                </div>
            </div>

            {/* 보험 상품 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    <i className="fas fa-shield-alt text-green-600 mr-2"></i>
                    제공 보험 상품
                </h3>
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <div className="text-2xl mb-2">🏥</div>
                        <div className="font-bold text-gray-900">건강보험</div>
                        <div className="text-sm text-gray-600">실손의료, 암, 치아</div>
                    </div>
                    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <div className="text-2xl mb-2">🚗</div>
                        <div className="font-bold text-gray-900">자동차보험</div>
                        <div className="text-sm text-gray-600">종합, 책임보험</div>
                    </div>
                    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <div className="text-2xl mb-2">❤️</div>
                        <div className="font-bold text-gray-900">생명보험</div>
                        <div className="text-sm text-gray-600">종신, 정기, 연금</div>
                    </div>
                    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <div className="text-2xl mb-2">🏠</div>
                        <div className="font-bold text-gray-900">손해보험</div>
                        <div className="text-sm text-gray-600">화재, 배상책임</div>
                    </div>
                </div>
            </div>

            {/* 전통 vs 오픈해시 비교 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                    <i className="fas fa-balance-scale text-blue-600 mr-2"></i>
                    전통 보험 vs 오픈해시 보험
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b-2 border-gray-300">
                                <th className="pb-3 text-gray-700">구분</th>
                                <th className="pb-3 text-gray-700">전통 보험</th>
                                <th className="pb-3 text-green-700 font-bold">오픈해시 보험</th>
                                <th className="pb-3 text-blue-700">개선도</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="border-b">
                                <td className="py-3 font-medium">가입 처리</td>
                                <td className="py-3 text-gray-600">3-7일</td>
                                <td className="py-3 text-green-600 font-bold">0.015ms</td>
                                <td className="py-3 text-blue-600">28,800,000배</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-3 font-medium">보험료 할인</td>
                                <td className="py-3 text-gray-600">최대 10%</td>
                                <td className="py-3 text-green-600 font-bold">최대 60%</td>
                                <td className="py-3 text-blue-600">+50%p</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-3 font-medium">청구 서류</td>
                                <td className="py-3 text-gray-600">5-8장</td>
                                <td className="py-3 text-green-600 font-bold">0장</td>
                                <td className="py-3 text-blue-600">100% 절감</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-3 font-medium">청구 처리</td>
                                <td className="py-3 text-gray-600">7-14일</td>
                                <td className="py-3 text-green-600 font-bold">0.015ms</td>
                                <td className="py-3 text-blue-600">116,640,000,000배</td>
                            </tr>
                            <tr>
                                <td className="py-3 font-medium">사기 탐지율</td>
                                <td className="py-3 text-gray-600">12%</td>
                                <td className="py-3 text-green-600 font-bold">98.7%</td>
                                <td className="py-3 text-blue-600">+86.7%p</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
