function App() {
    const [activeTab, setActiveTab] = React.useState('overview');

    const tabs = [
        { id: 'overview', name: '개요', icon: 'fa-home' },
        { id: 'customer', name: 'AI 고객상담', icon: 'fa-headset' },
        { id: 'trading', name: '스마트트레이딩', icon: 'fa-chart-line' },
        { id: 'analysis', name: '투자분석', icon: 'fa-search-dollar' },
        { id: 'portfolio', name: '포트폴리오', icon: 'fa-briefcase' },
        { id: 'risk', name: '리스크관리', icon: 'fa-shield-halved' },
        { id: 'compliance', name: '컴플라이언스', icon: 'fa-balance-scale' },
        { id: 'backoffice', name: '백오피스', icon: 'fa-gears' },
        { id: 'ib', name: 'IB지원', icon: 'fa-handshake' },
        { id: 'dashboard', name: '성과대시보드', icon: 'fa-chart-pie' }
    ];

    const renderContent = () => {
        switch(activeTab) {
            case 'overview': return <Overview />;
            case 'customer': return <CustomerService />;
            case 'trading': return <SmartTrading />;
            case 'analysis': return <InvestmentAnalysis />;
            case 'portfolio': return <PortfolioMgmt />;
            case 'risk': return <RiskManagement />;
            case 'compliance': return <Compliance />;
            case 'backoffice': return <BackOffice />;
            case 'ib': return <IBSupport />;
            case 'dashboard': return <PerformanceDashboard />;
            default: return <Overview />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-sec-blue to-sec-blue-light text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-3">오픈해시 자율 증권 시스템</h1>
                    <p className="text-xl opacity-90">OpenHash 기반 차세대 증권 자동화 플랫폼</p>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="sticky top-0 z-40 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex overflow-x-auto py-4 gap-3">
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
