function App() {
    const [activeTab, setActiveTab] = React.useState('overview');

    const tabs = [
        { id: 'overview', name: '개요', icon: 'fa-home' },
        { id: 'trading', name: '매매체결시스템', icon: 'fa-bolt' },
        { id: 'market-making', name: '시장조성', icon: 'fa-water' },
        { id: 'settlement', name: '결제시스템', icon: 'fa-money-bill-transfer' },
        { id: 'surveillance', name: '시장감시', icon: 'fa-video' },
        { id: 'listing', name: '상장관리', icon: 'fa-list-check' },
        { id: 'disclosure', name: '정보공시', icon: 'fa-bullhorn' },
        { id: 'investor', name: '투자자보호', icon: 'fa-shield-halved' },
        { id: 'market-data', name: '시장데이터', icon: 'fa-database' },
        { id: 'dashboard', name: '성과대시보드', icon: 'fa-chart-pie' }
    ];

    const renderContent = () => {
        switch(activeTab) {
            case 'overview': return <Overview />;
            case 'trading': return <TradingSystem />;
            case 'market-making': return <MarketMaking />;
            case 'settlement': return <Settlement />;
            case 'surveillance': return <Surveillance />;
            case 'listing': return <Listing />;
            case 'disclosure': return <Disclosure />;
            case 'investor': return <InvestorProtection />;
            case 'market-data': return <MarketData />;
            case 'dashboard': return <PerformanceDashboard />;
            default: return <Overview />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-exchange-blue to-exchange-blue-light text-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-4 mb-4">
                        <i className="fas fa-building-columns text-5xl"></i>
                        <div>
                            <h1 className="text-5xl font-bold mb-2">오픈해시 증권거래소</h1>
                            <p className="text-2xl opacity-90">OpenHash 기반 초고속 거래 인프라</p>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-6 text-lg">
                        <div className="flex items-center gap-2">
                            <i className="fas fa-bolt text-yellow-300"></i>
                            <span>0.015ms 체결</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="fas fa-shield-halved text-green-300"></i>
                            <span>AI 시장감시</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="fas fa-coins text-yellow-300"></i>
                            <span>T+0 즉시결제</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="sticky top-0 z-40 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex overflow-x-auto py-4 gap-3 scrollbar-hide">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-200 ${
                                    activeTab === tab.id ? 'tab-active' : 'tab-inactive'
                                }`}
                            >
                                <i className={`fas ${tab.icon}`}></i>
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="animate-fadeIn">
                    {renderContent()}
                </div>
            </main>

            <Footer />
        </div>
    );
}

// React 18 방식으로 렌더링
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
