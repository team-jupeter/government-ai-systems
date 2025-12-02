const EnergyCalculator = () => {
    const [nodes, setNodes] = React.useState(1000);
    const [transactions, setTransactions] = React.useState(100000);
    const [blockchainEnergy, setBlockchainEnergy] = React.useState(0);
    const [openhashEnergy, setOpenhashEnergy] = React.useState(0);
    const [savings, setSavings] = React.useState(0);

    React.useEffect(() => {
        // 블록체인 에너지 소비 (비트코인 기준: 121 TWh/년 ≈ 1,400 kWh/트랜잭션)
        const blockchainKwh = (transactions * 1400) / 1000; // MWh 단위
        setBlockchainEnergy(blockchainKwh);

        // 오픈해시 에너지 소비 (98.5% 절감)
        const openhashKwh = blockchainKwh * 0.015;
        setOpenhashEnergy(openhashKwh);

        // 절감량
        const saved = ((blockchainKwh - openhashKwh) / blockchainKwh * 100).toFixed(1);
        setSavings(saved);
    }, [nodes, transactions]);

    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-green-400 to-cyan-400 bg-clip-text text-transparent">
                    ⚡ 에너지 효율성 계산기
                </h2>
                <p className="text-gray-400 text-lg">오픈해시의 에너지 절감 효과를 직접 계산해보세요</p>
            </div>

            <div className="energy-calculator">
                <div className="energy-inputs">
                    <div className="input-group">
                        <label className="input-label">노드 수</label>
                        <input
                            type="number"
                            className="input-field"
                            value={nodes}
                            onChange={(e) => setNodes(parseInt(e.target.value) || 0)}
                            min="1"
                            max="100000"
                        />
                        <div className="text-xs text-gray-500 mt-2">{nodes.toLocaleString()} 개</div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">일일 트랜잭션 수</label>
                        <input
                            type="number"
                            className="input-field"
                            value={transactions}
                            onChange={(e) => setTransactions(parseInt(e.target.value) || 0)}
                            min="1"
                            max="10000000"
                        />
                        <div className="text-xs text-gray-500 mt-2">{transactions.toLocaleString()} 건</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-red-500 bg-opacity-10 border-2 border-red-500 border-opacity-30 rounded-2xl p-8 text-center">
                        <div className="text-red-400 text-sm mb-2">⛏️ 블록체인 (비트코인)</div>
                        <div className="text-5xl font-bold text-red-400 mb-2">
                            {blockchainEnergy.toFixed(1)}
                        </div>
                        <div className="text-gray-400 text-sm">MWh/일</div>
                        <div className="text-xs text-gray-500 mt-3">
                            연간 약 {(blockchainEnergy * 365 / 1000).toFixed(1)} GWh
                        </div>
                    </div>

                    <div className="bg-green-500 bg-opacity-10 border-2 border-green-500 border-opacity-30 rounded-2xl p-8 text-center">
                        <div className="text-green-400 text-sm mb-2">⛓️ 오픈해시</div>
                        <div className="text-5xl font-bold text-green-400 mb-2">
                            {openhashEnergy.toFixed(1)}
                        </div>
                        <div className="text-gray-400 text-sm">MWh/일</div>
                        <div className="text-xs text-gray-500 mt-3">
                            연간 약 {(openhashEnergy * 365 / 1000).toFixed(1)} GWh
                        </div>
                    </div>
                </div>

                <div className="energy-result mt-8">
                    <div className="text-gray-400 text-lg mb-3">💡 에너지 절감 효과</div>
                    <div className="energy-savings">{savings}%</div>
                    <div className="text-gray-300 text-lg mt-4">
                        연간 약 <span className="text-green-400 font-bold">
                            {((blockchainEnergy - openhashEnergy) * 365 / 1000).toFixed(1)} GWh
                        </span> 절감
                    </div>
                    <div className="text-sm text-gray-400 mt-3">
                        이는 약 {Math.round((blockchainEnergy - openhashEnergy) * 365 / 3.5)} 가구의 연간 전력 소비량과 같습니다
                    </div>
                </div>
            </div>
        </section>
    );
};
