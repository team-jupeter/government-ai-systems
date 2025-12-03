const Comparison = () => {
    return (
        <section className="py-16 bg-gov-gray">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gov-text mb-4">블록체인 대비 성능 비교</h3>
                    <p className="text-gov-text-secondary">주요 블록체인 플랫폼과의 기술 비교 분석</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gov-blue text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left font-bold">비교 항목</th>
                                    <th className="px-6 py-4 text-center font-bold">Bitcoin</th>
                                    <th className="px-6 py-4 text-center font-bold">Ethereum</th>
                                    <th className="px-6 py-4 text-center font-bold">Solana</th>
                                    <th className="px-6 py-4 text-center font-bold bg-gov-blue-light">오픈해시</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gov-border">
                                <tr className="hover:bg-gov-gray">
                                    <td className="px-6 py-4 font-medium text-gov-text">초당 트랜잭션 (TPS)</td>
                                    <td className="px-6 py-4 text-center text-gov-text-secondary">7</td>
                                    <td className="px-6 py-4 text-center text-gov-text-secondary">30</td>
                                    <td className="px-6 py-4 text-center text-gov-text-secondary">65,000</td>
                                    <td className="px-6 py-4 text-center font-bold text-gov-blue bg-blue-50">4,240,000</td>
                                </tr>
                                <tr className="hover:bg-gov-gray">
                                    <td className="px-6 py-4 font-medium text-gov-text">에너지 소비 (트랜잭션당)</td>
                                    <td className="px-6 py-4 text-center text-gov-text-secondary">707 kWh</td>
                                    <td className="px-6 py-4 text-center text-gov-text-secondary">62.56 kWh</td>
                                    <td className="px-6 py-4 text-center text-gov-text-secondary">0.00051 kWh</td>
                                    <td className="px-6 py-4 text-center font-bold text-green-700 bg-green-50">0.000008 kWh</td>
                                </tr>
                                <tr className="hover:bg-gov-gray">
                                    <td className="px-6 py-4 font-medium text-gov-text">합의 알고리즘</td>
                                    <td className="px-6 py-4 text-center text-gov-text-secondary">PoW</td>
                                    <td className="px-6 py-4 text-center text-gov-text-secondary">PoS</td>
                                    <td className="px-6 py-4 text-center text-gov-text-secondary">PoH+PoS</td>
                                    <td className="px-6 py-4 text-center font-bold text-gov-blue bg-blue-50">LPBFT/PBFT</td>
                                </tr>
                                <tr className="hover:bg-gov-gray">
                                    <td className="px-6 py-4 font-medium text-gov-text">트랜잭션 확인 시간</td>
                                    <td className="px-6 py-4 text-center text-gov-text-secondary">60분</td>
                                    <td className="px-6 py-4 text-center text-gov-text-secondary">6분</td>
                                    <td className="px-6 py-4 text-center text-gov-text-secondary">0.4초</td>
                                    <td className="px-6 py-4 text-center font-bold text-gov-blue bg-blue-50">0.05초</td>
                                </tr>
                                <tr className="hover:bg-gov-gray">
                                    <td className="px-6 py-4 font-medium text-gov-text">양자컴퓨터 내성</td>
                                    <td className="px-6 py-4 text-center text-red-600">✕</td>
                                    <td className="px-6 py-4 text-center text-red-600">✕</td>
                                    <td className="px-6 py-4 text-center text-red-600">✕</td>
                                    <td className="px-6 py-4 text-center font-bold text-green-700 bg-green-50">✓ CRYSTALS</td>
                                </tr>
                                <tr className="hover:bg-gov-gray">
                                    <td className="px-6 py-4 font-medium text-gov-text">확장성</td>
                                    <td className="px-6 py-4 text-center text-gov-text-secondary">제한적</td>
                                    <td className="px-6 py-4 text-center text-gov-text-secondary">제한적</td>
                                    <td className="px-6 py-4 text-center text-gov-text-secondary">중간</td>
                                    <td className="px-6 py-4 text-center font-bold text-gov-blue bg-blue-50">선형 확장</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 주요 장점 요약 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="bg-white rounded-lg shadow-sm border-2 border-green-500 p-6 text-center">
                        <div className="text-4xl font-bold text-green-700 mb-2">98.5%</div>
                        <div className="text-sm text-gov-text-secondary">에너지 절감률</div>
                        <div className="text-xs text-gov-text-secondary mt-2">연간 119 TWh 절감</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border-2 border-blue-500 p-6 text-center">
                        <div className="text-4xl font-bold text-blue-700 mb-2">60만배</div>
                        <div className="text-sm text-gov-text-secondary">비트코인 대비 속도</div>
                        <div className="text-xs text-gov-text-secondary mt-2">7 TPS → 424만 TPS</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border-2 border-purple-500 p-6 text-center">
                        <div className="text-4xl font-bold text-purple-700 mb-2">0.05초</div>
                        <div className="text-sm text-gov-text-secondary">트랜잭션 확인 시간</div>
                        <div className="text-xs text-gov-text-secondary mt-2">실시간 처리 수준</div>
                    </div>
                </div>
            </div>
        </section>
    );
};
