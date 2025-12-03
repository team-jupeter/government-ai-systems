const { useState } = React;

function App() {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: '개요', icon: 'fa-home' },
        { id: 'trading', label: '매매체결시스템', icon: 'fa-bolt' },
        { id: 'market-making', label: '시장조성', icon: 'fa-water' },
        { id: 'settlement', label: '결제시스템', icon: 'fa-money-bill-transfer' },
        { id: 'surveillance', label: '시장감시', icon: 'fa-video' },
        { id: 'listing', label: '상장관리', icon: 'fa-list-check' },
        { id: 'disclosure', label: '정보공시', icon: 'fa-bullhorn' },
        { id: 'investor', label: '투자자보호', icon: 'fa-shield-halved' },
        { id: 'market-data', label: '시장데이터', icon: 'fa-database' },
        { id: 'dashboard', label: '성과대시보드', icon: 'fa-chart-pie' }
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
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">오픈해시 증권거래소</h2>
                    <p className="text-xl opacity-90">OpenHash 기반 초고속 거래 인프라</p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white shadow-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex overflow-x-auto hide-scrollbar">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-4 font-medium transition-all whitespace-nowrap border-b-2 ${
                                    activeTab === tab.id
                                        ? 'text-exchange-blue border-exchange-blue'
                                        : 'text-gray-600 border-transparent hover:text-exchange-blue hover:border-exchange-blue-light'
                                }`}
                            >
                                <i className={`fas ${tab.icon} mr-2`}></i>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {renderContent()}
            </main>

            <Footer />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
