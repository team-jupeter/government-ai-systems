const Header = () => {
    const stats = [
        { icon: '👨‍🎓', value: '500만+', sub: '초중고 학생', color: 'text-blue-600' },
        { icon: '🎯', value: '93.5%', sub: '학습 만족도', color: 'text-cyan-600' },
        { icon: '🤖', value: 'AI 교사', sub: '1:1 맞춤 지도', color: 'text-green-600' },
        { icon: '📊', value: '실시간', sub: '학습 분석', color: 'text-purple-600' }
    ];

    return (
        <div>
            <a href="http://100.30.14.224/openhash.html" target="_blank" className="block bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-3 px-4 text-center hover:opacity-90 transition-opacity">
                <span className="text-white font-semibold">📘 오픈해시 설명서 보기 →</span>
            </a>
            <header className="gradient-edu py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="mb-6">
                        <div className="inline-block p-6 bg-white/20 rounded-full pulse-gov24 float">
                            <i className="fas fa-school text-6xl text-white"></i>
                        </div>
                    </div>
                    <div className="inline-block px-4 py-1 bg-white/25 rounded-full text-sm mb-4 text-white font-medium">
                        🎓 초·중·고 통합 AI 교육 플랫폼 | OpenHash + 멀티에이전트
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">K-12 AI 교육 시스템</h1>
                    <p className="text-lg text-white/95 mb-2 font-medium">학생 한 명 한 명에게 맞춤형 AI 교사 배정</p>
                    <p className="text-md text-white/90 mb-8">교육부·시도교육청 협력 | 전국 초중고 적용</p>
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
                        <span className="text-green-600 text-sm font-medium">K-12 시스템 Online</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
