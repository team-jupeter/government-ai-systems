const PerformanceDashboard = () => {
    // 처리 속도 비교 데이터
    const speedData = [
        { name: 'AI 자율은행', value: 0.015, display: '0.015ms' },
        { name: '일반 은행', value: 1000, display: '1,000ms' }
    ];

    // 비용 비교 데이터
    const costData = [
        { name: '인건비', ai: 15, traditional: 100 },
        { name: '운영비', ai: 10, traditional: 100 },
        { name: '시스템비', ai: 25, traditional: 100 }
    ];

    // 정확도 비교 데이터
    const accuracyData = [
        { name: '신용평가', ai: 99.4, traditional: 87.2 },
        { name: '사기탐지', ai: 99.4, traditional: 82.5 },
        { name: '리스크평가', ai: 98.5, traditional: 79.8 }
    ];

    return (
        <div className="space-y-8 animate-slideDown">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                    <i className="fas fa-tachometer-alt text-5xl"></i>
                    <div>
                        <h1 className="text-4xl font-bold mb-2">성능 비교 대시보드</h1>
                        <p className="text-xl text-gray-300">AI 자율 은행 vs 전통 은행 전면 비교</p>
                    </div>
                </div>
            </div>

            {/* 종합 성능 지표 */}
            <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">종합 성능 지표</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
                        <div className="text-sm mb-2">처리 속도</div>
                        <div className="text-4xl font-bold mb-2">66,667배</div>
                        <div className="text-xs opacity-90">빠름</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
                        <div className="text-sm mb-2">비용 절감</div>
                        <div className="text-4xl font-bold mb-2">85%</div>
                        <div className="text-xs opacity-90">인건비 기준</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
                        <div className="text-sm mb-2">정확도 향상</div>
                        <div className="text-4xl font-bold mb-2">+14%p</div>
                        <div className="text-xs opacity-90">신용평가 기준</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6">
                        <div className="text-sm mb-2">전력 절감</div>
                        <div className="text-4xl font-bold mb-2">88.6%</div>
                        <div className="text-xs opacity-90">GPU 대비</div>
                    </div>
                </div>
            </div>

            {/* 처리 속도 비교 */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">처리 속도 비교</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <ComparisonChart 
                            data={speedData}
                            type="bar"
                            dataKey1="value"
                            color1="#0052A3"
                        />
                    </div>
                    <div className="flex items-center">
                        <div className="w-full">
                            <div className="bg-blue-50 p-6 rounded-xl mb-4">
                                <h3 className="font-bold text-lg mb-3 text-blue-800">AI 자율 은행</h3>
                                <div className="text-4xl font-bold text-blue-600 mb-2">0.015ms</div>
                                <p className="text-sm text-gray-600">FPGA 하드웨어 가속으로 초고속 처리</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h3 className="font-bold text-lg mb-3 text-gray-800">일반 은행</h3>
                                <div className="text-4xl font-bold text-gray-600 mb-2">1,000ms</div>
                                <p className="text-sm text-gray-600">순차 처리 방식으로 대기시간 발생</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 비용 절감 효과 */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">비용 절감 효과</h2>
                <ComparisonChart 
                    data={costData}
                    type="bar"
                    dataKey1="ai"
                    dataKey2="traditional"
                    color1="#00A651"
                    color2="#DC2626"
                />
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-green-50 p-6 rounded-xl text-center">
                        <h3 className="font-bold text-lg mb-2">인건비 절감</h3>
                        <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                        <p className="text-sm text-gray-600">AI 자동화로 인력 최소화</p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-xl text-center">
                        <h3 className="font-bold text-lg mb-2">운영비 절감</h3>
                        <div className="text-3xl font-bold text-blue-600 mb-2">90%</div>
                        <p className="text-sm text-gray-600">무인 점포 운영</p>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-xl text-center">
                        <h3 className="font-bold text-lg mb-2">시스템비 절감</h3>
                        <div className="text-3xl font-bold text-purple-600 mb-2">75%</div>
                        <p className="text-sm text-gray-600">FPGA 저전력 설계</p>
                    </div>
                </div>
            </div>

            {/* 정확도 비교 */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">정확도 비교</h2>
                <ComparisonChart 
                    data={accuracyData}
                    type="bar"
                    dataKey1="ai"
                    dataKey2="traditional"
                    color1="#8B5CF6"
                    color2="#9CA3AF"
                />
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-purple-50 p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-3">신용평가</h3>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">AI 자율 은행</span>
                            <span className="text-xl font-bold text-purple-600">99.4%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">일반 은행</span>
                            <span className="text-xl font-bold text-gray-500">87.2%</span>
                        </div>
                        <div className="mt-3 text-xs text-green-600 font-semibold">+12.2%p 향상</div>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-3">사기탐지</h3>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">AI 자율 은행</span>
                            <span className="text-xl font-bold text-blue-600">99.4%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">일반 은행</span>
                            <span className="text-xl font-bold text-gray-500">82.5%</span>
                        </div>
                        <div className="mt-3 text-xs text-green-600 font-semibold">+16.9%p 향상</div>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-3">리스크평가</h3>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">AI 자율 은행</span>
                            <span className="text-xl font-bold text-green-600">98.5%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">일반 은행</span>
                            <span className="text-xl font-bold text-gray-500">79.8%</span>
                        </div>
                        <div className="mt-3 text-xs text-green-600 font-semibold">+18.7%p 향상</div>
                    </div>
                </div>
            </div>

            {/* 고객 혜택 */}
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 border-2 border-blue-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">고객 혜택 비교</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-xl mb-4 text-blue-600 flex items-center gap-2">
                            <i className="fas fa-robot"></i>
                            AI 자율 은행
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <i className="fas fa-check-circle text-green-500 text-xl mt-1"></i>
                                <div>
                                    <div className="font-semibold">수수료 무료</div>
                                    <div className="text-sm text-gray-600">송금, 이체, 조회 모두 무료</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="fas fa-check-circle text-green-500 text-xl mt-1"></i>
                                <div>
                                    <div className="font-semibold">최고 금리 보장</div>
                                    <div className="text-sm text-gray-600">AI가 최적 금리 자동 적용</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="fas fa-check-circle text-green-500 text-xl mt-1"></i>
                                <div>
                                    <div className="font-semibold">즉시 처리</div>
                                    <div className="text-sm text-gray-600">0.015ms 초고속 처리</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="fas fa-check-circle text-green-500 text-xl mt-1"></i>
                                <div>
                                    <div className="font-semibold">공정한 심사</div>
                                    <div className="text-sm text-gray-600">편향 없는 AI 평가</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-xl mb-4 text-gray-600 flex items-center gap-2">
                            <i className="fas fa-building"></i>
                            일반 은행
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <i className="fas fa-times-circle text-red-500 text-xl mt-1"></i>
                                <div>
                                    <div className="font-semibold">각종 수수료</div>
                                    <div className="text-sm text-gray-600">송금, 조회마다 수수료 부과</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="fas fa-times-circle text-red-500 text-xl mt-1"></i>
                                <div>
                                    <div className="font-semibold">낮은 금리</div>
                                    <div className="text-sm text-gray-600">높은 운영비로 금리 불리</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="fas fa-times-circle text-red-500 text-xl mt-1"></i>
                                <div>
                                    <div className="font-semibold">대기 시간</div>
                                    <div className="text-sm text-gray-600">수동 처리로 지연 발생</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="fas fa-times-circle text-red-500 text-xl mt-1"></i>
                                <div>
                                    <div className="font-semibold">주관적 심사</div>
                                    <div className="text-sm text-gray-600">담당자별 기준 상이</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 실증 데이터 */}
            <div className="bg-purple-50 rounded-2xl p-8 border-2 border-purple-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">실증실험 결과 (2025년 9월)</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-4">AWS 환경</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• 서버: AWS EC2 c5.24xlarge</li>
                            <li>• 테스트: 100,000 TPS 부하</li>
                            <li>• 기간: 2025년 9월 한 달</li>
                            <li>• 거래 건수: 총 2억 6천만 건</li>
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-4">성능 결과</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• 처리 속도: 0.015ms</li>
                            <li>• 검증 정확도: 99.4%</li>
                            <li>• 시스템 가용률: 99.99%</li>
                            <li>• 오류율: 0.01% 미만</li>
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-4">경제적 효과</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• 전력 절감: 88.6% (GPU 대비)</li>
                            <li>• 인건비 절감: 85%</li>
                            <li>• 고객 만족도: 97.2%</li>
                            <li>• ROI: 첫 해 280%</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
