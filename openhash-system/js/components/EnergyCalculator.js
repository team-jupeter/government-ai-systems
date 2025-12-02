const EnergyCalculator = () => {
    const [txCount, setTxCount] = React.useState(1000000);
    const [compareTarget, setCompareTarget] = React.useState('bitcoin');
    const [savings, setSavings] = React.useState({ kwh: 0, percent: 0, households: 0 });

    const energyData = {
        bitcoin: { name: 'Bitcoin', kwhPerTx: 707 },
        ethereum: { name: 'Ethereum', kwhPerTx: 62.56 },
        solana: { name: 'Solana', kwhPerTx: 0.00051 }
    };

    const openhashKwh = 0.000008;

    React.useEffect(() => {
        const targetKwh = energyData[compareTarget].kwhPerTx;
        const totalSavings = (targetKwh - openhashKwh) * txCount;
        const percentSavings = ((targetKwh - openhashKwh) / targetKwh * 100).toFixed(2);
        const households = Math.round(totalSavings / 10); // 가구당 일일 약 10kWh 가정

        setSavings({
            kwh: totalSavings,
            percent: percentSavings,
            households: households
        });
    }, [txCount, compareTarget]);

    return (
        <section className="py-16 bg-gov-gray">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gov-text mb-4">에너지 절감 계산기</h3>
                    <p className="text-gov-text-secondary">오픈해시 도입 시 예상되는 에너지 절감 효과를 계산해보세요</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-sm border border-gov-border p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-sm font-bold text-gov-text mb-2">일일 트랜잭션 수</label>
                                <input
                                    type="number"
                                    value={txCount}
                                    onChange={(e) => setTxCount(parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-3 border border-gov-border rounded focus:outline-none focus:ring-2 focus:ring-gov-blue"
                                    min="1"
                                />
                                <div className="text-xs text-gov-text-secondary mt-1">{txCount.toLocaleString()} 건/일</div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gov-text mb-2">비교 대상 블록체인</label>
                                <select
                                    value={compareTarget}
                                    onChange={(e) => setCompareTarget(e.target.value)}
                                    className="w-full px-4 py-3 border border-gov-border rounded focus:outline-none focus:ring-2 focus:ring-gov-blue"
                                >
                                    <option value="bitcoin">Bitcoin (707 kWh/tx)</option>
                                    <option value="ethereum">Ethereum (62.56 kWh/tx)</option>
                                    <option value="solana">Solana (0.00051 kWh/tx)</option>
                                </select>
                            </div>
                        </div>

                        {/* 결과 표시 */}
                        <div className="bg-gov-blue bg-opacity-5 rounded-lg p-8 border-2 border-gov-blue">
                            <h4 className="text-lg font-bold text-gov-text mb-6 text-center">절감 효과 분석 결과</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-700 mb-2">
                                        {savings.kwh.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gov-text-secondary">kWh/일 절감</div>
                                </div>

                                <div className="text-center">
                                    <div className="text-3xl font-bold text-gov-blue mb-2">
                                        {savings.percent}%
                                    </div>
                                    <div className="text-sm text-gov-text-secondary">절감률</div>
                                </div>

                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-700 mb-2">
                                        {savings.households.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gov-text-secondary">가구 일일 전력량</div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gov-border text-center">
                                <p className="text-sm text-gov-text-secondary">
                                    연간 절감량: <span className="font-bold text-gov-blue">{(savings.kwh * 365 / 1000000).toFixed(2)} GWh</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
