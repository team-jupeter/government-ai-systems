const PerformanceDashboard = () => {
    const metrics = [
        {
            category: '가입 처리',
            traditional: { time: '3-7일', cost: '50,000원', docs: '5-10장', accuracy: '85%', satisfaction: '65%' },
            openhash: { time: '0.015ms', cost: '0원', docs: '0장', accuracy: '99.2%', satisfaction: '98.7%' },
            improvement: { time: '28,800,000배', cost: '100%', docs: '100%', accuracy: '+14.2%p', satisfaction: '+33.7%p' }
        },
        {
            category: '보험료',
            traditional: { base: '15만원/월', discount: '최대 10%', adjustment: '연 1회', transparency: '낮음', fairness: '60%' },
            openhash: { base: '9만원/월', discount: '최대 60%', adjustment: '실시간', transparency: '완전공개', fairness: '100%' },
            improvement: { base: '-40%', discount: '+50%p', adjustment: '365배', transparency: '100%', fairness: '+40%p' }
        },
        {
            category: '청구 처리',
            traditional: { submit: '1-3시간', review: '7-14일', payment: '3-5일', docs: '5-8장', satisfaction: '58%' },
            openhash: { submit: '자동', review: '0.015ms', payment: '즉시', docs: '0장', satisfaction: '98.7%' },
            improvement: { submit: '자동화', review: '116,640,000,000배', payment: '즉시', docs: '100%', satisfaction: '+40.7%p' }
        },
        {
            category: '사기 탐지',
            traditional: { rate: '12%', falsePositive: '8%', time: '수개월', annualLoss: '4.5조원', method: '사후조사' },
            openhash: { rate: '98.7%', falsePositive: '0.3%', time: '0.015ms', annualLoss: '580억원', method: '실시간AI' },
            improvement: { rate: '+86.7%p', falsePositive: '-7.7%p', time: '실시간', annualLoss: '-98.7%', method: '자동화' }
        }
    ];

    const costAnalysis = {
        traditional: { underwriting: 30000, claim: 25000, fraud: 15000, support: 10000, total: 80000 },
        openhash: { underwriting: 0, claim: 0, fraud: 1000, support: 1000, total: 2000 },
        savings: 78000,
        savingsRate: 97.5
    };

    const scenarios = [
        {
            title: '건강보험 가입',
            traditional: {
                steps: [
                    '상담 예약 (1-3일)',
                    '설계사 방문 상담 (1-2시간)',
                    '건강검진 예약 (3-7일)',
                    '건강검진 실시 (2-3시간)',
                    '검진 결과 대기 (3-7일)',
                    '서류 제출 (우편/방문)',
                    '언더라이팅 (5-10일)',
                    '승인/거절 통보'
                ],
                totalTime: '최대 30일',
                rating: 3
            },
            openhash: {
                steps: [
                    '앱/웹 접속',
                    '전화번호 인증',
                    '상품 선택',
                    'AI 언더라이팅 (0.015ms)',
                    '즉시 승인 및 가입 완료'
                ],
                totalTime: '3분',
                rating: 5
            }
        },
        {
            title: '병원 진료 후 청구',
            traditional: {
                steps: [
                    '병원 진료 및 수납',
                    '진단서/영수증 발급 요청',
                    '서류 스캔/복사',
                    '보험사 앱/우편 제출',
                    '접수 확인 (1-2일)',
                    '서류 보완 요청 (50% 확률)',
                    '심사 대기 (7-14일)',
                    '보험금 지급 (3-5일)'
                ],
                totalTime: '최대 21일',
                rating: 2
            },
            openhash: {
                steps: [
                    '병원 진료 및 수납',
                    'PDV 자동 제출 (0.003ms)',
                    'AI 자동 심사 (0.010ms)',
                    '보험금 즉시 입금 (0.001ms)'
                ],
                totalTime: '0.015ms',
                rating: 5
            }
        },
        {
            title: '자동차 사고 처리',
            traditional: {
                steps: [
                    '사고 발생',
                    '보험사 사고 접수 전화',
                    '블랙박스 영상 제출',
                    '현장 사진 제출',
                    '견적서 제출',
                    '과실 비율 협의 (1-3주)',
                    '수리비 심사 (5-10일)',
                    '보험금 지급'
                ],
                totalTime: '최대 40일',
                rating: 2
            },
            openhash: {
                steps: [
                    '사고 발생',
                    '블랙박스 PDV 자동 업로드',
                    'AI 과실 비율 산정 (0.010ms)',
                    '수리비 즉시 승인 (0.005ms)',
                    '렌터카 비용 선지급'
                ],
                totalTime: '15분',
                rating: 5
            }
        }
    ];

    const marketImpact = {
        current: {
            year: '2025년',
            totalPremium: '200조원',
            fraudLoss: '4.5조원',
            operatingCost: '30조원',
            satisfaction: '62%'
        },
        future: {
            year: '2030년 (오픈해시 50% 점유)',
            totalPremium: '120조원 (-40%)',
            fraudLoss: '0.15조원 (-98.7%)',
            operatingCost: '3조원 (-90%)',
            satisfaction: '95% (+33%p)'
        },
        impact: {
            savings: '80조원 (연간 보험료 절감 5년 누적)',
            fraudReduction: '98.7% (보험사기 적발률 향상)',
            efficiency: '27조원 (연간 운영비 절감)'
        }
    };

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-2">
                    <i className="fas fa-tachometer-alt mr-2"></i>
                    성능 비교 (전통 vs 오픈해시)
                </h2>
                <p className="text-purple-100">
                    처리 속도 28,800,000배, 비용 절감 97.5%, 최대 보험료 할인 60%, 고객 만족도 98.7%
                </p>
            </div>

            {/* 핵심 성능 지표 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">핵심 성능 지표 비교</h3>
                <div className="space-y-6">
                    {metrics.map((metric, idx) => (
                        <div key={idx} className="border rounded-lg p-4">
                            <div className="font-bold text-lg text-gray-900 mb-3">{metric.category}</div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left pb-2 text-gray-600">항목</th>
                                            <th className="text-left pb-2 text-gray-600">전통 보험</th>
                                            <th className="text-left pb-2 text-green-700">오픈해시</th>
                                            <th className="text-left pb-2 text-blue-700">개선도</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(metric.traditional).map((key, kidx) => (
                                            <tr key={kidx} className="border-b">
                                                <td className="py-2 font-medium text-gray-700 capitalize">{key}</td>
                                                <td className="py-2 text-gray-600">{metric.traditional[key]}</td>
                                                <td className="py-2 text-green-600 font-bold">{metric.openhash[key]}</td>
                                                <td className="py-2 text-blue-600 font-bold">{metric.improvement[key]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 비용 절감 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                    <i className="fas fa-chart-pie text-green-600 mr-2"></i>
                    비용 절감 분석 (건당 운영비)
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                        <div className="text-gray-600 mb-2">전통 보험</div>
                        <div className="text-4xl font-bold text-gray-900 mb-4">{costAnalysis.traditional.total.toLocaleString()}원</div>
                        <div className="space-y-1 text-sm text-gray-600">
                            <div>언더라이팅: {costAnalysis.traditional.underwriting.toLocaleString()}원</div>
                            <div>청구 처리: {costAnalysis.traditional.claim.toLocaleString()}원</div>
                            <div>사기 조사: {costAnalysis.traditional.fraud.toLocaleString()}원</div>
                            <div>고객 상담: {costAnalysis.traditional.support.toLocaleString()}원</div>
                        </div>
                    </div>

                    <div className="text-center p-6 bg-green-50 rounded-lg">
                        <div className="text-green-700 mb-2">오픈해시</div>
                        <div className="text-4xl font-bold text-green-600 mb-4">{costAnalysis.openhash.total.toLocaleString()}원</div>
                        <div className="space-y-1 text-sm text-green-700">
                            <div>언더라이팅: {costAnalysis.openhash.underwriting.toLocaleString()}원</div>
                            <div>청구 처리: {costAnalysis.openhash.claim.toLocaleString()}원</div>
                            <div>사기 조사: {costAnalysis.openhash.fraud.toLocaleString()}원</div>
                            <div>고객 상담: {costAnalysis.openhash.support.toLocaleString()}원</div>
                        </div>
                    </div>

                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                        <div className="text-blue-700 mb-2">절감액</div>
                        <div className="text-4xl font-bold text-blue-600 mb-4">{costAnalysis.savings.toLocaleString()}원</div>
                        <div className="text-6xl font-bold text-blue-600 mt-6">{costAnalysis.savingsRate}%</div>
                        <div className="text-sm text-blue-700 mt-2">건당 비용 절감</div>
                    </div>
                </div>
            </div>

            {/* 고객 경험 시나리오 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                    <i className="fas fa-user-clock text-purple-600 mr-2"></i>
                    고객 경험 시나리오 비교
                </h3>
                <div className="space-y-6">
                    {scenarios.map((scenario, idx) => (
                        <div key={idx} className="border rounded-lg p-4">
                            <div className="font-bold text-lg text-gray-900 mb-4">{scenario.title}</div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <div className="font-medium text-gray-700 mb-2">전통 보험</div>
                                    <div className="space-y-2 mb-3">
                                        {scenario.traditional.steps.map((step, sidx) => (
                                            <div key={sidx} className="text-sm text-gray-600 flex items-start gap-2">
                                                <span className="text-gray-400">{sidx + 1}.</span>
                                                <span>{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                        <span className="text-sm font-medium">총 소요 시간</span>
                                        <span className="text-red-600 font-bold">{scenario.traditional.totalTime}</span>
                                    </div>
                                    <div className="mt-2 text-center">
                                        {'★'.repeat(scenario.traditional.rating)}{'☆'.repeat(5 - scenario.traditional.rating)}
                                    </div>
                                </div>

                                <div>
                                    <div className="font-medium text-green-700 mb-2">오픈해시</div>
                                    <div className="space-y-2 mb-3">
                                        {scenario.openhash.steps.map((step, sidx) => (
                                            <div key={sidx} className="text-sm text-green-700 flex items-start gap-2">
                                                <span className="text-green-400">{sidx + 1}.</span>
                                                <span>{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                                        <span className="text-sm font-medium">총 소요 시간</span>
                                        <span className="text-green-600 font-bold">{scenario.openhash.totalTime}</span>
                                    </div>
                                    <div className="mt-2 text-center text-yellow-500">
                                        {'★'.repeat(scenario.openhash.rating)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 시장 영향 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                    <i className="fas fa-globe text-blue-600 mr-2"></i>
                    시장 영향 예측 (한국 보험 시장)
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="border rounded-lg p-4">
                        <div className="text-center mb-4">
                            <div className="text-lg font-bold text-gray-900">{marketImpact.current.year}</div>
                            <div className="text-sm text-gray-600">현재</div>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">총 보험료</span>
                                <span className="font-bold">{marketImpact.current.totalPremium}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">사기 손실</span>
                                <span className="font-bold text-red-600">{marketImpact.current.fraudLoss}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">운영비</span>
                                <span className="font-bold">{marketImpact.current.operatingCost}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">고객 만족도</span>
                                <span className="font-bold">{marketImpact.current.satisfaction}</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50">
                        <div className="text-center mb-4">
                            <div className="text-lg font-bold text-green-700">{marketImpact.future.year}</div>
                            <div className="text-sm text-green-600">예상</div>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">총 보험료</span>
                                <span className="font-bold text-green-600">{marketImpact.future.totalPremium}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">사기 손실</span>
                                <span className="font-bold text-green-600">{marketImpact.future.fraudLoss}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">운영비</span>
                                <span className="font-bold text-green-600">{marketImpact.future.operatingCost}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">고객 만족도</span>
                                <span className="font-bold text-green-600">{marketImpact.future.satisfaction}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="font-bold text-gray-900 mb-1">국민 부담 경감</div>
                        <div className="text-2xl font-bold text-blue-600">{marketImpact.impact.savings}</div>
                        <div className="text-xs text-gray-600 mt-1">연간 보험료 절감 5년 누적</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="font-bold text-gray-900 mb-1">사기 범죄 감소</div>
                        <div className="text-2xl font-bold text-green-600">{marketImpact.impact.fraudReduction}</div>
                        <div className="text-xs text-gray-600 mt-1">보험 사기 적발률 향상</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="font-bold text-gray-900 mb-1">산업 효율성</div>
                        <div className="text-2xl font-bold text-purple-600">{marketImpact.impact.efficiency}</div>
                        <div className="text-xs text-gray-600 mt-1">연간 운영비 절감</div>
                    </div>
                </div>
            </div>

            {/* 최종 요약 */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold mb-6">오픈해시 보험 시스템 최종 결론</h3>
                <div className="grid md:grid-cols-4 gap-6">
                    <div>
                        <div className="text-4xl font-bold mb-2">28,800,000배</div>
                        <div className="text-purple-100">처리 속도 향상</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">97.5%</div>
                        <div className="text-purple-100">비용 절감</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">60%</div>
                        <div className="text-purple-100">최대 보험료 할인</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">98.7%</div>
                        <div className="text-purple-100">고객 만족도</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
