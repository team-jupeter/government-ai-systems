const Header = ({ currentMenu, setCurrentMenu }) => {
    const menus = [
        { id: 'dashboard', name: '대시보드', icon: 'fa-chart-line' },
        { id: 'realtime', name: '실시간 징세', icon: 'fa-bolt', badge: 'LIVE' },
        { id: 'financial', name: '재무제표', icon: 'fa-file-invoice-dollar', badge: 'NEW' },
        { id: 'transactions', name: '거래 원장', icon: 'fa-exchange-alt', badge: 'LIVE' },
        { id: 'taxlaw', name: '세법 DB', icon: 'fa-balance-scale' },
        { id: 'layers', name: 'Layer 계층', icon: 'fa-layer-group' },
        { id: 'ai-agent', name: 'AI 세무상담', icon: 'fa-robot' },
        { id: 'taxpayer', name: '납세자 조회', icon: 'fa-user-tie' },
        { id: 'openhash', name: 'OpenHash', icon: 'fa-link' },
        { id: 'nts-finance', name: '국세청 재무', icon: 'fa-landmark', badge: 'LIVE' }
    ];

    return (
        <div>
            {/* 메인 헤더 */}
            <header className="gradient-bg py-8 px-4 border-b border-gray-700">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg glow-cyan">
                                <i className="fas fa-link text-2xl text-white"></i>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                    OpenHash 국세 행정 자동화 시스템
                                </h1>
                                <p className="text-gray-400 mt-1">
                                    5천만 국민 + 3백만 사업자 재무제표 실시간 자동화 | AI 기반 세무 처리
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* OpenHash 검증 배지 */}
                            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-4 py-2 flex items-center gap-2">
                                <i className="fas fa-link text-cyan-400"></i>
                                <span className="text-cyan-400 font-medium">OpenHash 검증됨</span>
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            </div>
                            {/* 포털 링크 */}
                            <a href="/" className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition flex items-center gap-2">
                                <i className="fas fa-home"></i>
                                <span>포털</span>
                            </a>
                        </div>
                    </div>
                    
                    {/* 핵심 지표 */}
                    <div className="grid grid-cols-4 gap-4 mt-6">
                        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                            <div className="text-gray-400 text-sm">오늘 징수액</div>
                            <div className="text-2xl font-bold text-green-400 number-ticker">₩ 1,247.3억</div>
                            <div className="text-xs text-green-500 mt-1">
                                <i className="fas fa-arrow-up mr-1"></i>12.4% vs 전일
                            </div>
                        </div>
                        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                            <div className="text-gray-400 text-sm">실시간 거래</div>
                            <div className="text-2xl font-bold text-cyan-400 number-ticker">374.76 TPS</div>
                            <div className="text-xs text-cyan-500 mt-1">
                                <i className="fas fa-bolt mr-1"></i>FPGA 가속 처리
                            </div>
                        </div>
                        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                            <div className="text-gray-400 text-sm">등록 납세자</div>
                            <div className="text-2xl font-bold text-purple-400 number-ticker">53,247,891</div>
                            <div className="text-xs text-purple-500 mt-1">
                                <i className="fas fa-users mr-1"></i>개인 5천만 + 사업자 3백만
                            </div>
                        </div>
                        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                            <div className="text-gray-400 text-sm">AI 탈세 탐지</div>
                            <div className="text-2xl font-bold text-yellow-400 number-ticker">99.2%</div>
                            <div className="text-xs text-yellow-500 mt-1">
                                <i className="fas fa-shield-alt mr-1"></i>0.033ms 탐지
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
            {/* 네비게이션 */}
            <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-1 overflow-x-auto py-2">
                        {menus.map(menu => (
                            <button
                                key={menu.id}
                                onClick={() => setCurrentMenu(menu.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                                    currentMenu === menu.id 
                                        ? 'bg-cyan-600 text-white' 
                                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                }`}
                            >
                                <i className={`fas ${menu.icon}`}></i>
                                <span>{menu.name}</span>
                                {menu.badge && (
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                        menu.badge === 'LIVE' ? 'bg-red-500 text-white animate-pulse' :
                                        menu.badge === 'NEW' ? 'bg-green-500 text-white' :
                                        'bg-gray-600 text-gray-300'
                                    }`}>
                                        {menu.badge}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>
        </div>
    );
};
