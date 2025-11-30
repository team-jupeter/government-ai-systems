const Header = () => {
    const stats = [
        { icon: '⚖️', value: '95.3%', sub: '예측 정확도', color: 'text-blue-600' },
        { icon: '🛡️', value: '100%', sub: '증거 보안', color: 'text-cyan-600' },
        { icon: '⚡', value: '2.1초', sub: '분석 속도', color: 'text-green-600' },
        { icon: '📊', value: '50만+', sub: '판례 분석', color: 'text-purple-600' }
    ];

    return (
        <div>
            <a href="http://100.30.14.224/openhash.html" target="_blank" className="block bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-3 px-4 text-center hover:opacity-90 transition-opacity">
                <span className="text-white font-semibold">📘 오픈해시 설명서 보기 →</span>
            </a>
            <header className="gradient-judicial py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="mb-6">
                        <div className="inline-block p-6 bg-white/20 rounded-full pulse-gov24">
                            <i className="fas fa-balance-scale text-6xl text-white"></i>
                        </div>
                    </div>
                    <div className="inline-block px-4 py-1 bg-white/25 rounded-full text-sm mb-4 text-white font-medium">
                        ⚖️ AI 예방적 사법 + OpenHash + 양자내성암호
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">AI 사법 시스템</h1>
                    <p className="text-lg text-white/95 mb-2 font-medium">분쟁을 예방하고 공정한 판결을 지원</p>
                    <p className="text-md text-white/90 mb-8">법원행정처·대법원 협력 | 전국 법원 통합</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {stats.map((s, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 card-hover transition-all shadow-md">
                                <div className="text-3xl mb-2">{s.icon}</div>
                                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                                <div className="text-sm text-gray-600 font-medium">{s.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </header>
            <div className="bg-white py-3 sticky top-0 z-40 border-b border-gray-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                    <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">
                        <i className="fas fa-arrow-left mr-2"></i>포털
                    </a>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-green-600 text-sm font-medium">사법 시스템 Online</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
