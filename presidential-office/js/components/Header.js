const Header = () => {
    const [stats, setStats] = React.useState(null);
    const [showDataRegistry, setShowDataRegistry] = React.useState(false);

    React.useEffect(() => {
        fetch('/api/presidential-office/stats')
            .then(res => res.json())
            .then(data => data.success && setStats(data.stats))
            .catch(() => setStats({
                total_secretariats: 11,
                total_ai_agents: 30,
                connected_ministries: 18,
                system_status: "operational"
            }));
    }, []);

    return (
        <>
            {/* 상단 배너 - 오픈해시 설명서 링크 */}
            <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 py-2 px-4 text-center">
                <a
                    href="http://100.30.14.224/openhash.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
                >
                    <i className="fas fa-book-open"></i>
                    <span className="text-sm font-medium">OpenHash 기술 설명서 보기</span>
                    <i className="fas fa-external-link-alt text-xs"></i>
                </a>
            </div>

            <header className="gradient-presidential py-8 px-4 border-b-4 border-yellow-600 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center pulse-gold">
                                <i className="fas fa-landmark text-3xl text-blue-900"></i>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">대통령실 AI 자동화 시스템</h1>
                                <p className="text-blue-200 text-sm mt-1">Presidential Office AI Automation System</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {/* 국가데이터처 버튼 */}
                            <button
                                onClick={() => setShowDataRegistry(!showDataRegistry)}
                                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-all shadow-lg"
                            >
                                <i className="fas fa-database"></i>
                                <span className="font-semibold text-sm">국가데이터처</span>
                            </button>
                            <div className="text-right">
                                <p className="text-yellow-400 text-sm font-semibold">OpenHash 보안</p>
                                <p className="text-white text-xs">SHA3-256 무결성 검증</p>
                            </div>
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                    </div>

                    {stats && (
                        <div className="grid grid-cols-4 gap-4 mt-8">
                            <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                                <p className="text-3xl font-bold text-yellow-400">{stats.total_secretariats}</p>
                                <p className="text-blue-200 text-sm">수석비서관실</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                                <p className="text-3xl font-bold text-yellow-400">{stats.total_ai_agents}</p>
                                <p className="text-blue-200 text-sm">AI 에이전트</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                                <p className="text-3xl font-bold text-yellow-400">{stats.connected_ministries}</p>
                                <p className="text-blue-200 text-sm">연동 정부부처</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                                <p className="text-xl font-bold text-green-400">
                                    <i className="fas fa-check-circle mr-2"></i>운영중
                                </p>
                                <p className="text-blue-200 text-sm">시스템 상태</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* 국가데이터처 중요성 모달 */}
                {showDataRegistry && (
                    <div className="absolute top-full right-4 mt-2 w-96 bg-gray-800 border border-emerald-500 rounded-xl shadow-2xl z-50 overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 flex items-center justify-between">
                            <h3 className="font-bold flex items-center">
                                <i className="fas fa-database mr-2"></i>국가데이터처의 중요성
                            </h3>
                            <button onClick={() => setShowDataRegistry(false)} className="hover:bg-white/20 rounded p-1">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="bg-gray-700/50 rounded-lg p-3">
                                <h4 className="text-emerald-400 font-semibold mb-2">
                                    <i className="fas fa-sitemap mr-2"></i>데이터 허브 역할
                                </h4>
                                <p className="text-gray-300 text-sm">
                                    모든 정부 기관은 국가데이터처에 수집된 데이터를 가공하여
                                    새로운 데이터를 국가데이터처에 저장합니다.
                                </p>
                            </div>
                            <div className="bg-gray-700/50 rounded-lg p-3">
                                <h4 className="text-emerald-400 font-semibold mb-2">
                                    <i className="fas fa-shield-alt mr-2"></i>데이터 무결성 보장
                                </h4>
                                <p className="text-gray-300 text-sm">
                                    OpenHash 기술로 모든 데이터의 무결성을 검증하고,
                                    5계층 분산 아키텍처로 안전하게 보관합니다.
                                </p>
                            </div>
                            <div className="bg-gray-700/50 rounded-lg p-3">
                                <h4 className="text-emerald-400 font-semibold mb-2">
                                    <i className="fas fa-exchange-alt mr-2"></i>부처간 데이터 연계
                                </h4>
                                <p className="text-gray-300 text-sm">
                                    대통령실 AI 에이전트와 18개 정부부처가 국가데이터처를 통해
                                    실시간으로 데이터를 공유하고 협업합니다.
                                </p>
                            </div>
                            <a
                                href="/national-data-registry/"
                                className="block w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-center py-3 rounded-lg font-bold transition-all"
                            >
                                <i className="fas fa-arrow-right mr-2"></i>국가데이터처 바로가기
                            </a>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};
