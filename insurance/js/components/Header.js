const Header = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'overview', name: '개요', icon: 'fa-home' },
        { id: 'pdv', name: '개인정보금고(PDV)', icon: 'fa-lock' },
        { id: 'financial', name: '재무제표', icon: 'fa-chart-line' },
        { id: 'behavioral', name: '행동 기반 보험료', icon: 'fa-running' },
        { id: 'products', name: '보험 상품', icon: 'fa-shield-alt' },
        { id: 'underwriting', name: 'AI 언더라이팅', icon: 'fa-user-check' },
        { id: 'claim', name: '청구 처리', icon: 'fa-file-medical' },
        { id: 'fraud', name: '사기 탐지', icon: 'fa-search' },
        { id: 'performance', name: '성능 비교', icon: 'fa-tachometer-alt' }
    ];

    return (
        <header className="bg-gradient-to-r from-green-600 via-blue-600 to-green-600 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <i className="fas fa-shield-alt text-4xl"></i>
                        <div>
                            <h1 className="text-2xl font-bold">보험 시스템</h1>
                            <p className="text-sm text-green-100">PDV 기반 행동 연동 보험 플랫폼</p>
                        </div>
                    </div>
                    <div className="flex gap-4 text-sm">
                        <div className="text-center">
                            <div className="font-bold">0.015ms</div>
                            <div className="text-xs text-green-100">처리속도</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold">60%</div>
                            <div className="text-xs text-green-100">최대 할인</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold">98.7%</div>
                            <div className="text-xs text-green-100">사기 탐지</div>
                        </div>
                    </div>
                </div>
                
                <nav className="flex flex-wrap gap-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                activeTab === tab.id
                                    ? 'bg-white text-green-600 shadow-md'
                                    : 'bg-green-500 bg-opacity-20 hover:bg-opacity-30'
                            }`}
                        >
                            <i className={`fas ${tab.icon} mr-2`}></i>
                            {tab.name}
                        </button>
                    ))}
                </nav>
            </div>
        </header>
    );
};
