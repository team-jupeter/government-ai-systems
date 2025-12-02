const ComparisonSection = () => {
    const comparisons = [
        {
            title: '⛏️ 블록체인',
            metrics: [
                { label: '합의 메커니즘', value: '작업증명 / 지분증명' },
                { label: '에너지 소비', value: '121 TWh/년' },
                { label: '확장성', value: 'TPS 불변' },
                { label: '처리 속도', value: '느림 (합의 필요)' },
                { label: '진실성 보장', value: '기록 시점 보장' }
            ]
        },
        {
            title: '⛓️ 오픈해시',
            winner: true,
            metrics: [
                { label: '합의 메커니즘', value: '확률적 계층 선택' },
                { label: '에너지 소비', value: '1.8 TWh/년 (98.5%↓)' },
                { label: '확장성', value: '노드 비례 선형 증가' },
                { label: '처리 속도', value: '빠름 (즉시 기록)' },
                { label: '진실성 보장', value: '위변조 방지 (확률적)' }
            ]
        }
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-400 to-green-400 bg-clip-text text-transparent">
                    블록체인 vs 오픈해시
                </h2>
                <p className="text-gray-400 text-lg">기존 블록체인의 한계를 극복한 차세대 기술</p>
            </div>

            <div className="comparison-grid">
                {comparisons.map((item, idx) => (
                    <div key={idx} className={`comparison-card ${item.winner ? 'winner' : ''}`}>
                        <div className="comparison-title">
                            {item.title}
                            {item.winner && <span className="text-xl">✨</span>}
                        </div>
                        
                        {item.metrics.map((metric, i) => (
                            <div key={i} className="comparison-metric">
                                <span className="metric-label">{metric.label}</span>
                                <span className="metric-value">{metric.value}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <div className="inline-block bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 rounded-2xl p-6">
                    <p className="text-2xl font-bold text-green-400 mb-2">98.5% 에너지 절감</p>
                    <p className="text-gray-400">비트코인 대비 약 119 TWh/년 절감 효과</p>
                </div>
            </div>
        </section>
    );
};
