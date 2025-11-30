const Header = () => {
    const stats = [
        { icon: '🎯', value: '0.801', sub: '통합 효용', color: 'purple' },
        { icon: '👥', value: '10만명', sub: '학습자 규모', color: 'blue' },
        { icon: '⚡', value: '2.3분', sub: '진로수정 처리', color: 'green' },
        { icon: '🛡️', value: '100%', sub: '프라이버시 보호', color: 'pink' }
    ];
    return (
        <div>
            <header className="gradient-edu text-white py-16 px-4 relative overflow-hidden">
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <div className="mb-6"><div className="inline-block p-6 bg-purple-500/20 rounded-full pulse-purple"><i className="fas fa-graduation-cap text-6xl text-purple-300"></i></div></div>
                    <div className="inline-block px-4 py-1 bg-purple-500/30 rounded-full text-sm mb-4">🔗 7S-ISIO | Seven-Stage Individual-Social Integration Optimization</div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">7단계 개인-사회 통합 최적화<br/>AI 교육 시스템</h1>
                    <p className="text-lg opacity-90 mb-2">개인의 행복과 사회 전체 효용의 균형점을 찾아 최적화</p>
                    <p className="text-md opacity-80 mb-8 max-w-3xl mx-auto">인간 고유 업무 식별 | 실시간 진로 수정 | 고수준 프라이버시 보호 | 편향 탐지</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {stats.map((stat, i) => (<div key={i} className="bg-white/10 rounded-xl p-4 card-hover"><div className="text-3xl mb-2">{stat.icon}</div><div className="text-2xl font-bold text-purple-300">{stat.value}</div><div className="text-sm opacity-80">{stat.sub}</div></div>))}
                    </div>
                </div>
            </header>
            <div className="bg-gray-800 py-3 sticky top-0 z-40 border-b border-gray-700">
                <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                    <a href="/" className="text-purple-400 hover:text-purple-300 flex items-center gap-2"><i className="fas fa-arrow-left"></i>포털로 돌아가기</a>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span><span className="text-green-400 text-sm">7S-ISIO Online</span></div>
                </div>
            </div>
        </div>
    );
};
