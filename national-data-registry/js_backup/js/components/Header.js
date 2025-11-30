const Header = () => {
    const stats = [
        { icon: '🏛️', value: '503만+', sub: '연결 노드', color: 'blue' },
        { icon: '⚡', value: '424만', sub: 'TPS', color: 'cyan' },
        { icon: '🔋', value: '98.5%', sub: '에너지 절감', color: 'green' },
        { icon: '⏱️', value: '2.3초', sub: '연계 검증', color: 'yellow' }
    ];
    return (
        <div>
            <a href="http://100.30.14.224/openhash.html" target="_blank" className="block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 py-3 px-4 text-center hover:opacity-90 transition-opacity">
                <span className="text-white font-bold">📘 오픈해시 설명서 보기 →</span>
            </a>
            <header className="gradient-ndr py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="mb-6">
                        <div className="inline-block p-6 bg-blue-500/20 rounded-full pulse-blue">
                            <i className="fas fa-database text-6xl text-blue-400"></i>
                        </div>
                    </div>
                    <div className="inline-block px-4 py-1 bg-blue-500/30 rounded-full text-sm mb-4">
                        ⛓️ OpenHash 5계층 + AI 멀티에이전트 + 양자내성암호
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">국가데이터처 통합 데이터 네트워크</h1>
                    <p className="text-lg opacity-90 mb-2">공공·민간·개인 데이터를 하나의 통합 네트워크로 연결</p>
                    <p className="text-md opacity-80 mb-8">2025년 10월 1일 출범 | 국무총리 직속 차관급 중앙행정기관</p>
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
                    <a href="/" className="text-blue-400 hover:text-blue-300"><i className="fas fa-arrow-left mr-2"></i>포털</a>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-green-400 text-sm">통합 네트워크 Online</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
