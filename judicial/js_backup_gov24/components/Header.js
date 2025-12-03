const Header = () => {
    const stats = [
        { icon: '⚖️', value: '91.7%', sub: '승소율 예측', color: 'yellow' },
        { icon: '💰', value: '90%', sub: '비용 절감', color: 'green' },
        { icon: '⏱️', value: '95%', sub: '시간 단축', color: 'cyan' },
        { icon: '🌐', value: '2,480만', sub: '글로벌 판례', color: 'purple' }
    ];
    return (
        <div>
            <header className="gradient-judicial py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="mb-6">
                        <div className="inline-block p-6 bg-yellow-500/20 rounded-full pulse-gold">
                            <i className="fas fa-balance-scale text-6xl text-yellow-400"></i>
                        </div>
                    </div>
                    <div className="inline-block px-4 py-1 bg-yellow-500/30 rounded-full text-sm mb-4">
                        ⛓️ OpenHash + AI 법률전문가 + Private Vault
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">AI 예방적 사법 시스템</h1>
                    <p className="text-lg opacity-90 mb-2">프라이빗 금고 증거수집 → AI 승소율 예측 → 글로벌 판례 비교</p>
                    <p className="text-md opacity-80 mb-8">한국·미국·중국·일본·유럽 8개국 2,480만 건 판례 분석</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {stats.map((s, i) => (
                            <div key={i} className="bg-white/10 rounded-xl p-4 card-hover transition-all">
                                <div className="text-3xl mb-2">{s.icon}</div>
                                <div className={`text-2xl font-bold text-${s.color}-400`}>{s.value}</div>
                                <div className="text-sm opacity-80">{s.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </header>
            
            <div className="bg-gray-800 py-3 sticky top-0 z-40 border-b border-gray-700">
                <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                    <a href="/" className="text-yellow-400 hover:text-yellow-300">
                        <i className="fas fa-arrow-left mr-2"></i>포털
                    </a>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-green-400 text-sm">AI 법률 시스템 Online</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
