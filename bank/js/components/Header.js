const Header = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'overview', name: '개요', icon: 'home' },
        { id: 'financial', name: '재무제표', icon: 'file-invoice-dollar' },
        { id: 'deposit', name: '예금 서비스', icon: 'piggy-bank' },
        { id: 'credit', name: '신용평가 AI', icon: 'chart-line' },
        { id: 'loan', name: '대출 서비스', icon: 'hand-holding-usd' },
        { id: 'asset', name: '자산관리', icon: 'wallet' },
        { id: 'payment', name: '결제/송금', icon: 'exchange-alt' },
        { id: 'fraud', name: '사기탐지', icon: 'shield-alt' },
        { id: 'trust', name: '신탁 서비스', icon: 'handshake' },
        { id: 'performance', name: '성능 비교', icon: 'tachometer-alt' }
    ];

    return (
        <header className="bg-gradient-to-r from-bank-blue via-bank-blue-light to-bank-blue shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4">
                {/* 로고 및 타이틀 */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <i className="fas fa-university text-white text-3xl"></i>
                        <div>
                            <h1 className="text-2xl font-bold text-white">오픈해시 은행 시스템</h1>
                            <p className="text-sm text-blue-100">FPGA + AI 기반 차세대 금융 인프라</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <div className="text-xs text-blue-100 mb-1">처리 속도</div>
                            <div className="text-lg font-bold text-white">0.015ms</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <div className="text-xs text-blue-100 mb-1">검증 정확도</div>
                            <div className="text-lg font-bold text-white">99.4%</div>
                        </div>
                    </div>
                </div>

                {/* 탭 네비게이션 */}
                <nav className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium whitespace-nowrap
                                transition-all duration-200 flex-shrink-0
                                ${activeTab === tab.id 
                                    ? 'bg-white text-bank-blue shadow-lg' 
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                }
                            `}
                        >
                            <i className={`fas fa-${tab.icon} text-sm`}></i>
                            <span className="text-sm">{tab.name}</span>
                        </button>
                    ))}
                </nav>
            </div>
        </header>
    );
};
