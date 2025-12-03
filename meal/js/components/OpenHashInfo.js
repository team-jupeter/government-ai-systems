const OpenHashInfo = () => {
    const [stats, setStats] = React.useState(null);

    React.useEffect(() => {
        fetch('/api/meal/openhash/stats')
            .then(r => r.json())
            .then(data => setStats(data));
        const interval = setInterval(() => {
            fetch('/api/meal/openhash/stats')
                .then(r => r.json())
                .then(data => setStats(data));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-xl p-6">
                <div className="flex items-center mb-4">
                    <i className="fas fa-link text-cyan-400 text-3xl mr-4"></i>
                    <div>
                        <h2 className="text-2xl font-bold">OpenHash 기술</h2>
                        <p className="text-gray-400">블록체인 대비 99.7% 에너지 절감, 25,000+ TPS</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-cyan-400">{stats?.tps?.toLocaleString() || '-'}</div>
                    <div className="text-sm text-gray-400">TPS</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-green-400">{stats?.data_integrity_rate || '-'}%</div>
                    <div className="text-sm text-gray-400">데이터 무결성</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-yellow-400">{stats?.energy_savings_vs_blockchain || '-'}%</div>
                    <div className="text-sm text-gray-400">에너지 절감</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-purple-400">{(stats?.daily_transactions / 1000000)?.toFixed(0) || '-'}M</div>
                    <div className="text-sm text-gray-400">일일 트랜잭션</div>
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">급식 시스템에서의 OpenHash 적용</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-700/50 rounded-lg p-4">
                        <div className="text-cyan-400 font-bold mb-2">🍱 급식 이력 검증</div>
                        <div className="text-sm text-gray-400">1.5억 식/일 급식 배송 및 수령 기록의 무결성 보장</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4">
                        <div className="text-green-400 font-bold mb-2">🥗 영양정보 인증</div>
                        <div className="text-sm text-gray-400">5차원 개인맞춤 영양분석 데이터의 진실성 검증</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4">
                        <div className="text-yellow-400 font-bold mb-2">🌾 식재료 추적</div>
                        <div className="text-sm text-gray-400">농장에서 식탁까지 전체 공급망 투명성 확보</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4">
                        <div className="text-purple-400 font-bold mb-2">🔒 PDV 연동</div>
                        <div className="text-sm text-gray-400">개인정보금고 기반 건강데이터 안전한 활용</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4">
                        <div className="text-red-400 font-bold mb-2">⚠️ 알레르기 경고</div>
                        <div className="text-sm text-gray-400">실시간 알레르기 성분 교차검증 시스템</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4">
                        <div className="text-blue-400 font-bold mb-2">📊 품질 모니터링</div>
                        <div className="text-sm text-gray-400">로봇셰프 조리 품질 실시간 검증</div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">계층별 해시 분포</h3>
                <div className="flex items-center space-x-4">
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <span>Layer 1 (Edge Device)</span>
                            <span className="text-cyan-400">{stats?.layer_distribution?.layer1 || 70}%</span>
                        </div>
                        <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-500" style={{ width: `${stats?.layer_distribution?.layer1 || 70}%` }}></div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <span>Layer 2 (Edge Server)</span>
                            <span className="text-blue-400">{stats?.layer_distribution?.layer2 || 21}%</span>
                        </div>
                        <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500" style={{ width: `${stats?.layer_distribution?.layer2 || 21}%` }}></div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <span>Layer 3 (Core Engine)</span>
                            <span className="text-purple-400">{stats?.layer_distribution?.layer3 || 9}%</span>
                        </div>
                        <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500" style={{ width: `${stats?.layer_distribution?.layer3 || 9}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <a href="/openhash-system/" className="inline-block bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-bold transition-all">
                    <i className="fas fa-external-link-alt mr-2"></i>OpenHash 기술 상세 보기
                </a>
            </div>
        </div>
    );
};
