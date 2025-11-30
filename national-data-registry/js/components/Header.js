const Header = () => {
    const stats = [
        { icon: '🏛️', value: '503만+', sub: '연결 노드', color: 'text-blue-600' },
        { icon: '⚡', value: '424만', sub: 'TPS', color: 'text-cyan-600' },
        { icon: '🔋', value: '98.5%', sub: '에너지 절감', color: 'text-green-600' },
        { icon: '⏱️', value: '2.3초', sub: '연계 검증', color: 'text-amber-600' }
    ];
    return (
        <div>
            <a href="http://100.30.14.224/openhash.html" target="_blank" className="block bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-3 px-4 text-center hover:opacity-90 transition-opacity">
                <span className="text-white font-semibold">📘 오픈해시 설명서 보기 →</span>
            </a>
            <header className="gradient-gov24 py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="mb-6">
                        <div className="inline-block p-6 bg-white/20 rounded-full pulse-gov24">
                            <i className="fas fa-database text-6xl text-white"></i>
                        </div>
                    </div>
                    <div className="inline-block px-4 py-1 bg-white/25 rounded-full text-sm mb-4 text-white font-medium">
                        ⛓️ OpenHash 5계층 + AI 멀티에이전트 + 양자내성암호
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">국가데이터처 통합 데이터 네트워크</h1>
                    <p className="text-lg text-white/95 mb-2 font-medium">공공·민간·개인 데이터를 하나의 통합 네트워크로 연결</p>
                    <p className="text-md text-white/90 mb-8">2025년 10월 1일 출범 | 국무총리 직속 차관급 중앙행정기관</p>
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
                        <span className="text-green-600 text-sm font-medium">통합 네트워크 Online</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
