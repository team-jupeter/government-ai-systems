const Header = () => {
    const stats = [
        { icon: '📋', value: '52만건', sub: '연간 처리량', color: 'green' },
        { icon: '⚡', value: '68%', sub: '처리시간 단축', color: 'blue' },
        { icon: '💰', value: '1,247억', sub: '연간 절감액', color: 'yellow' },
        { icon: '🤖', value: '10개', sub: '특화 Agent', color: 'purple' }
    ];
    return (
        <div>
            <header className="gradient-mfds text-white py-16 px-4 relative overflow-hidden">
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <div className="mb-6"><div className="inline-block p-6 bg-green-500/20 rounded-full pulse-green"><i className="fas fa-pills text-6xl text-green-300"></i></div></div>
                    <div className="inline-block px-4 py-1 bg-green-500/30 rounded-full text-sm mb-4">🔗 OpenHash + DeepSeek R1 + A2A Protocol</div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">식품의약품안전처<br/>AI 업무 자동화 시스템</h1>
                    <p className="text-lg opacity-90 mb-2">MFDS AI-Powered Automation System</p>
                    <p className="text-md opacity-80 mb-8 max-w-3xl mx-auto">10대 우선 업무 자동화 | Agent 간 직접 통신 | 오픈해시 문서 검증 | 진화 알고리즘 최적화</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {stats.map((stat, i) => (<div key={i} className="bg-white/10 rounded-xl p-4 card-hover"><div className="text-3xl mb-2">{stat.icon}</div><div className="text-2xl font-bold text-green-300">{stat.value}</div><div className="text-sm opacity-80">{stat.sub}</div></div>))}
                    </div>
                </div>
            </header>
            <div className="bg-gray-800 py-3 sticky top-0 z-40 border-b border-gray-700">
                <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                    <a href="/" className="text-green-400 hover:text-green-300 flex items-center gap-2"><i className="fas fa-arrow-left"></i>포털로 돌아가기</a>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span><span className="text-green-400 text-sm">MFDS AI Online</span></div>
                </div>
            </div>
        </div>
    );
};
