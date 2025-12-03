function Tab9CostAnalysis() {
    const costData = {
        traditional: {
            initial: 850,
            yearly: 180,
            labor: 216,
            energy: 12.3,
            total5year: 2078
        },
        ndr: {
            initial: 420,
            yearly: 45,
            labor: 54,
            energy: 0.18,
            total5year: 615
        }
    };

    const savings = {
        total: 1463,
        percentage: 70.4
    };

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-gov-blue p-4">
                <p className="text-sm text-gov-text">
                    5년 TCO(총소유비용) <span className="font-bold text-gov-blue">1,463억 원 절감 (70.4%)</span>으로 
                    재정 효율성과 기술 우수성을 동시에 달성합니다.
                </p>
            </div>

            {/* 5년 TCO 비교 */}
            <div>
                <h4 className="text-base font-bold text-gov-text mb-3">5년 TCO 비교 (단위: 억 원)</h4>
                <div className="bg-white border-2 border-gov-border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gov-blue text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">항목</th>
                                <th className="px-4 py-3 text-center">기존 중앙DB</th>
                                <th className="px-4 py-3 text-center">국가데이터처</th>
                                <th className="px-4 py-3 text-center">절감액</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3">초기 구축비</td>
                                <td className="px-4 py-3 text-center">{costData.traditional.initial}억</td>
                                <td className="px-4 py-3 text-center text-green-600">{costData.ndr.initial}억</td>
                                <td className="px-4 py-3 text-center text-blue-600 font-bold">{costData.traditional.initial - costData.ndr.initial}억</td>
                            </tr>
                            <tr className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3">연간 운영비</td>
                                <td className="px-4 py-3 text-center">{costData.traditional.yearly}억</td>
                                <td className="px-4 py-3 text-center text-green-600">{costData.ndr.yearly}억</td>
                                <td className="px-4 py-3 text-center text-blue-600 font-bold">{costData.traditional.yearly - costData.ndr.yearly}억</td>
                            </tr>
                            <tr className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3">연간 인건비</td>
                                <td className="px-4 py-3 text-center">{costData.traditional.labor}억</td>
                                <td className="px-4 py-3 text-center text-green-600">{costData.ndr.labor}억</td>
                                <td className="px-4 py-3 text-center text-blue-600 font-bold">{costData.traditional.labor - costData.ndr.labor}억</td>
                            </tr>
                            <tr className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3">연간 에너지</td>
                                <td className="px-4 py-3 text-center">{costData.traditional.energy}억</td>
                                <td className="px-4 py-3 text-center text-green-600">{costData.ndr.energy}억</td>
                                <td className="px-4 py-3 text-center text-blue-600 font-bold">{(costData.traditional.energy - costData.ndr.energy).toFixed(2)}억</td>
                            </tr>
                            <tr className="bg-yellow-50 font-bold">
                                <td className="px-4 py-3">5년 TCO</td>
                                <td className="px-4 py-3 text-center text-red-600">{costData.traditional.total5year}억</td>
                                <td className="px-4 py-3 text-center text-green-600">{costData.ndr.total5year}억</td>
                                <td className="px-4 py-3 text-center text-blue-600">{savings.total}억</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 시각적 비교 */}
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6 text-center">
                    <div className="text-sm text-red-700 font-semibold mb-2">기존 중앙DB</div>
                    <div className="text-4xl font-bold text-red-600 mb-2">2,078억원</div>
                    <div className="text-xs text-gray-600">5년 TCO</div>
                </div>
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
                    <div className="text-sm text-green-700 font-semibold mb-2">국가데이터처</div>
                    <div className="text-4xl font-bold text-green-600 mb-2">615억원</div>
                    <div className="text-xs text-gray-600">5년 TCO</div>
                </div>
            </div>

            {/* 절감 효과 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-4 border-gov-blue rounded-lg p-6">
                <div className="text-center mb-4">
                    <i className="fas fa-piggy-bank text-6xl text-gov-blue mb-3"></i>
                    <h4 className="text-2xl font-bold text-gov-blue mb-2">
                        총 {savings.total}억원 절감
                    </h4>
                    <p className="text-lg text-gray-700">절감률: {savings.percentage}%</p>
                </div>
                <div className="grid grid-cols-4 gap-3 mt-4">
                    <div className="bg-white rounded p-3 text-center">
                        <div className="text-xs text-gray-600">구축비</div>
                        <div className="font-bold text-green-600">-430억</div>
                    </div>
                    <div className="bg-white rounded p-3 text-center">
                        <div className="text-xs text-gray-600">운영비</div>
                        <div className="font-bold text-green-600">-675억</div>
                    </div>
                    <div className="bg-white rounded p-3 text-center">
                        <div className="text-xs text-gray-600">인건비</div>
                        <div className="font-bold text-green-600">-810억</div>
                    </div>
                    <div className="bg-white rounded p-3 text-center">
                        <div className="text-xs text-gray-600">전력비</div>
                        <div className="font-bold text-green-600">-60억</div>
                    </div>
                </div>
            </div>

            {/* 에너지 절감 */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                <h4 className="text-base font-bold text-green-700 mb-3">
                    <i className="fas fa-leaf mr-2"></i>
                    에너지 효율성
                </h4>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded text-center">
                        <div className="text-2xl font-bold text-green-600">98.5%</div>
                        <div className="text-xs text-gray-600">에너지 절감</div>
                    </div>
                    <div className="bg-white p-3 rounded text-center">
                        <div className="text-2xl font-bold text-green-600">850→12</div>
                        <div className="text-xs text-gray-600">MWh/년</div>
                    </div>
                    <div className="bg-white p-3 rounded text-center">
                        <div className="text-2xl font-bold text-green-600">21만배</div>
                        <div className="text-xs text-gray-600">비트코인 대비</div>
                    </div>
                </div>
            </div>

            {/* 추가 절감 효과 */}
            <div className="bg-purple-50 border-2 border-purple-500 rounded-lg p-4">
                <h4 className="text-base font-bold text-purple-700 mb-3">
                    <i className="fas fa-chart-line mr-2"></i>
                    추가 경제적 효과
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>✅ <span className="font-bold">부처 연계 비용</span>: 연간 450억 원 → 0원</li>
                    <li>✅ <span className="font-bold">통계 생산 시간</span>: 8개월 → 실시간 (인건비 절감)</li>
                    <li>✅ <span className="font-bold">법규 준수 비용</span>: 연간 84억 → 0원 (AI 자동화)</li>
                    <li>✅ <span className="font-bold">중복 투자 방지</span>: 부처별 독립 시스템 통합</li>
                    <li>✅ <span className="font-bold">국민 편익</span>: 원스톱 서비스로 행정 효율 향상</li>
                </ul>
            </div>
        </div>
    );
}
