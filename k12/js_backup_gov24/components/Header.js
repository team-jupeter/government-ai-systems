const Header = () => {
    const stats = [
        { icon: '🎓', value: '1,200만', label: '학습자', color: 'blue' },
        { icon: '🤖', value: '10개', label: 'AI 교사', color: 'cyan' },
        { icon: '📈', value: '36.1%', label: '성취도 향상', color: 'green' },
        { icon: '🎯', value: '98.2%', label: '진로 매칭', color: 'yellow' }
    ];
    
    return (
        <div>
            {/* 오픈해시 설명서 배너 */}
            <a href="http://100.30.14.224/openhash.html" target="_blank" rel="noopener noreferrer"
                className="block bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500 py-3 px-4 text-center hover:from-yellow-500 hover:via-orange-400 hover:to-red-400 transition-all">
                <div className="flex items-center justify-center gap-3">
                    <span className="text-xl">📄</span>
                    <span className="font-bold">오픈해시 기술 설명서</span>
                    <span className="text-sm opacity-90">- 블록체인 대체 차세대 분산 신뢰 기술</span>
                    <i className="fas fa-external-link-alt ml-2"></i>
                </div>
            </a>
            
            <header className="gradient-edu py-12 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="mb-6">
                        <div className="inline-block p-5 bg-blue-500/20 rounded-full float">
                            <i className="fas fa-graduation-cap text-5xl text-blue-400"></i>
                        </div>
                    </div>
                    <div className="inline-block px-4 py-1 bg-blue-500/30 rounded-full text-sm mb-4">
                        🧠 7단계 개인-사회 통합 최적화 | AI 멀티에이전트 교육
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">K-12 AI 교육 시스템</h1>
                    <p className="text-lg opacity-90 mb-2">개인의 행복과 사회 전체 효용의 균형점을 찾는 AI 교육</p>
                    <p className="text-sm opacity-70 mb-6">과목별 AI 교사가 전국 1,200만 초중고 학생을 개별 지도</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        {stats.map((s, i) => (
                            <div key={i} className="bg-white/10 rounded-xl p-4 card-hover transition-all">
                                <div className="text-2xl mb-1">{s.icon}</div>
                                <div className={`text-xl font-bold text-${s.color}-400`}>{s.value}</div>
                                <div className="text-xs opacity-80">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </header>
            <div className="bg-gray-800 py-3 sticky top-0 z-40 border-b border-gray-700">
                <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                    <a href="/" className="text-blue-400 hover:text-blue-300">
                        <i className="fas fa-arrow-left mr-2"></i>포털
                    </a>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">7단계 프로세스 가동 중</span>
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};
