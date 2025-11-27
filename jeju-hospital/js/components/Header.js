const Header = () => {
    const stats = [
        { icon: '🏥', value: '1,050', sub: '총 병상', color: 'blue' },
        { icon: '👨‍⚕️', value: '222', sub: '전문의', color: 'green' },
        { icon: '🤖', value: '94.7%', sub: 'AI 정확도', color: 'purple' },
        { icon: '🔒', value: '100%', sub: '프라이버시', color: 'cyan' }
    ];
    return (
        <div>
            <header className="gradient-medical py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="mb-6"><div className="inline-block p-6 bg-blue-500/20 rounded-full pulse-blue"><i className="fas fa-heartbeat text-6xl text-blue-300"></i></div></div>
                    <div className="inline-block px-4 py-1 bg-blue-500/30 rounded-full text-sm mb-4">🔗 OpenHash + AI 협진 + Private Vault</div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">제주 권역 의료 AI 협진 시스템</h1>
                    <p className="text-lg opacity-90 mb-2">보건소 AI 1차 진료 → 전문의 예약 → 사전 AI 소견 전달</p>
                    <p className="text-md opacity-80 mb-8">모든 의료 기록은 프라이빗 금고에 안전 보관</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {stats.map((s,i)=>(<div key={i} className="bg-white/10 rounded-xl p-4 card-hover transition-all"><div className="text-3xl mb-2">{s.icon}</div><div className={`text-2xl font-bold text-${s.color}-300`}>{s.value}</div><div className="text-sm opacity-80">{s.sub}</div></div>))}
                    </div>
                </div>
            </header>
            <div className="bg-gray-800 py-3 sticky top-0 z-40 border-b border-gray-700">
                <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                    <a href="/" className="text-blue-400 hover:text-blue-300"><i className="fas fa-arrow-left mr-2"></i>포털</a>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span><span className="text-green-400 text-sm">AI 협진 Online</span></div>
                </div>
            </div>
        </div>
    );
};
