const Header = () => {
    const stats = [
        { icon: '🏛️', value: '도청', sub: '6실국 25과', color: 'blue' },
        { icon: '🏢', value: '시청', sub: '5국 20과', color: 'cyan' },
        { icon: '🏘️', value: '43개', sub: '읍면동 센터', color: 'green' },
        { icon: '⚡', value: '7초', sub: '처리시간', color: 'yellow' }
    ];
    return (
        <div>
            <header className="gradient-admin text-white py-16 px-4 relative overflow-hidden">
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <div className="mb-6"><div className="inline-block p-6 bg-blue-500/20 rounded-full pulse-blue"><i className="fas fa-landmark text-6xl text-blue-400"></i></div></div>
                    <div className="inline-block px-4 py-1 bg-blue-500/30 rounded-full text-sm mb-4">🔗 OpenHash + PDV + Currency 통합</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">통합 자치 행정 시스템</h1>
                    <p className="text-lg opacity-90 mb-2">Integrated Local Government Administration System</p>
                    <p className="text-md opacity-80 mb-8 max-w-3xl mx-auto">도청 · 시청 · 읍면동 주민센터 AI 통합 | 개인정보금고(PDV) 연동 | 처리시간 7일→7초</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {stats.map((stat, i) => (<div key={i} className="bg-white/10 rounded-xl p-4 card-hover"><div className="text-3xl mb-2">{stat.icon}</div><div className="text-2xl font-bold text-blue-400">{stat.value}</div><div className="text-sm opacity-80">{stat.sub}</div></div>))}
                    </div>
                </div>
            </header>
            <div className="bg-gray-800 py-3 sticky top-0 z-40 border-b border-gray-700">
                <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                    <a href="/" className="text-blue-400 hover:text-blue-300 flex items-center gap-2"><i className="fas fa-arrow-left"></i>포털로 돌아가기</a>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span><span className="text-green-400 text-sm">System Online</span></div>
                </div>
            </div>
        </div>
    );
};
