const FinancialStatement = () => {
    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-2">
                    <i className="fas fa-chart-line mr-2"></i>
                    재무제표 연동
                </h2>
                <p className="text-blue-100">
                    오픈해시 기반 디지털화폐 재무제표와 연동하여 실시간 재무 상태를 반영한 보험료 산정
                </p>
            </div>

            {/* 핵심 기능 */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="text-blue-600 text-3xl mb-3">
                        <i className="fas fa-sync-alt"></i>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">실시간 연동</h3>
                    <p className="text-gray-600 text-sm">
                        디지털화폐 재무제표와 0.015ms마다 자동 동기화하여 
                        최신 재무 상태 반영
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="text-green-600 text-3xl mb-3">
                        <i className="fas fa-shield-alt"></i>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">자동 심사</h3>
                    <p className="text-gray-600 text-sm">
                        재무 안정성을 AI가 자동 평가하여 
                        언더라이팅 승인율 25% 향상
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="text-purple-600 text-3xl mb-3">
                        <i className="fas fa-percentage"></i>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">보험료 조정</h3>
                    <p className="text-gray-600 text-sm">
                        재무 상태에 따라 보험료 ±8% 자동 조정, 
                        재무 개선 시 즉시 할인
                    </p>
                </div>
            </div>

            {/* 재무제표 항목 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                    <i className="fas fa-file-invoice-dollar text-blue-600 mr-2"></i>
                    재무제표 연동 항목
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="border-l-4 border-blue-500 pl-4">
                        <div className="font-bold text-gray-900 mb-2">자산 항목</div>
                        <div className="space-y-1 text-sm text-gray-600">
                            <div>✓ 디지털화폐 잔액 (실시간)</div>
                            <div>✓ 부동산 자산 평가액</div>
                            <div>✓ 주식/채권 포트폴리오</div>
                            <div>✓ 기타 금융자산</div>
                        </div>
                    </div>

                    <div className="border-l-4 border-red-500 pl-4">
                        <div className="font-bold text-gray-900 mb-2">부채 항목</div>
                        <div className="space-y-1 text-sm text-gray-600">
                            <div>✓ 주택담보대출 잔액</div>
                            <div>✓ 신용대출 잔액</div>
                            <div>✓ 카드 결제 금액</div>
                            <div>✓ 기타 부채</div>
                        </div>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4">
                        <div className="font-bold text-gray-900 mb-2">수입 항목</div>
                        <div className="space-y-1 text-sm text-gray-600">
                            <div>✓ 월 급여 소득</div>
                            <div>✓ 사업 소득</div>
                            <div>✓ 투자 수익</div>
                            <div>✓ 기타 수입</div>
                        </div>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                        <div className="font-bold text-gray-900 mb-2">지출 항목</div>
                        <div className="space-y-1 text-sm text-gray-600">
                            <div>✓ 생활비</div>
                            <div>✓ 대출 이자</div>
                            <div>✓ 보험료</div>
                            <div>✓ 기타 지출</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 재무 지표 평가 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                    <i className="fas fa-calculator text-green-600 mr-2"></i>
                    AI 재무 지표 평가
                </h3>
                <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="font-bold text-gray-900">순자산 (Net Worth)</div>
                            <div className="text-green-600 font-bold">가중치 20%</div>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">총자산 - 총부채</div>
                        <div className="text-xs text-gray-500">
                            순자산이 높을수록 재무 안정성이 높아 보험료 할인
                        </div>
                    </div>

                    <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="font-bold text-gray-900">부채비율 (Debt Ratio)</div>
                            <div className="text-blue-600 font-bold">가중치 15%</div>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">총부채 ÷ 총자산 × 100</div>
                        <div className="text-xs text-gray-500">
                            30% 이하: 우수 | 30-50%: 양호 | 50-70%: 보통 | 70% 이상: 주의
                        </div>
                    </div>

                    <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="font-bold text-gray-900">소득 안정성</div>
                            <div className="text-purple-600 font-bold">가중치 15%</div>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">최근 12개월 소득 변동성 분석</div>
                        <div className="text-xs text-gray-500">
                            안정적인 소득일수록 보험료 할인
                        </div>
                    </div>

                    <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="font-bold text-gray-900">저축률 (Savings Rate)</div>
                            <div className="text-yellow-600 font-bold">가중치 10%</div>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">저축액 ÷ 소득 × 100</div>
                        <div className="text-xs text-gray-500">
                            20% 이상 저축 시 재무 관리 능력 우수로 평가
                        </div>
                    </div>
                </div>
            </div>

            {/* 보험료 조정 예시 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                    <i className="fas fa-chart-bar text-purple-600 mr-2"></i>
                    재무 상태별 보험료 조정
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-gray-300">
                                <th className="pb-3 text-left text-gray-700">재무 등급</th>
                                <th className="pb-3 text-left text-gray-700">순자산</th>
                                <th className="pb-3 text-left text-gray-700">부채비율</th>
                                <th className="pb-3 text-left text-gray-700">보험료 조정</th>
                                <th className="pb-3 text-left text-gray-700">예시</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="py-3 font-medium text-green-700">우수 (A+)</td>
                                <td className="py-3 text-gray-600">5억 이상</td>
                                <td className="py-3 text-gray-600">30% 이하</td>
                                <td className="py-3 text-green-600 font-bold">-8%</td>
                                <td className="py-3 text-gray-600">15만 → 13.8만</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-3 font-medium text-blue-700">양호 (A)</td>
                                <td className="py-3 text-gray-600">2-5억</td>
                                <td className="py-3 text-gray-600">30-50%</td>
                                <td className="py-3 text-blue-600 font-bold">-5%</td>
                                <td className="py-3 text-gray-600">15만 → 14.25만</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-3 font-medium text-gray-700">보통 (B)</td>
                                <td className="py-3 text-gray-600">5천-2억</td>
                                <td className="py-3 text-gray-600">50-70%</td>
                                <td className="py-3 text-gray-600 font-bold">0%</td>
                                <td className="py-3 text-gray-600">15만 → 15만</td>
                            </tr>
                            <tr>
                                <td className="py-3 font-medium text-red-700">주의 (C)</td>
                                <td className="py-3 text-gray-600">5천 이하</td>
                                <td className="py-3 text-gray-600">70% 이상</td>
                                <td className="py-3 text-red-600 font-bold">+8%</td>
                                <td className="py-3 text-gray-600">15만 → 16.2만</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 실시간 업데이트 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-lg font-bold mb-3 text-gray-900">
                    <i className="fas fa-bolt text-yellow-500 mr-2"></i>
                    실시간 보험료 업데이트
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                        <i className="fas fa-check text-green-600"></i>
                        <span>재무제표 변동 시 0.015ms 내 자동 반영</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="fas fa-check text-green-600"></i>
                        <span>대출 상환, 자산 증가 즉시 보험료 인하</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="fas fa-check text-green-600"></i>
                        <span>월말 재무 정산 시 다음 달 보험료 자동 조정</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="fas fa-check text-green-600"></i>
                        <span>재무 개선 노력에 대한 즉각적인 보상</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
