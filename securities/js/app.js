const { useState } = React;

function App() {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: '개요', icon: 'fa-home', component: Overview },
        { id: 'credit-rating', label: '신용 평가', icon: 'fa-star', component: CreditRating },
        { id: 'securities-issuance', label: '증권 발행', icon: 'fa-file-invoice-dollar', component: SecuritiesIssuance },
        { id: 'smart-trading', label: '스마트 트레이딩', icon: 'fa-robot', component: SmartTrading },
        { id: 'investment-analysis', label: '투자 분석', icon: 'fa-chart-line', component: InvestmentAnalysis },
        { id: 'portfolio-mgmt', label: '포트폴리오 관리', icon: 'fa-briefcase', component: PortfolioMgmt },
        { id: 'risk-management', label: '리스크 관리', icon: 'fa-shield-halved', component: RiskManagement },
        { id: 'compliance', label: '컴플라이언스', icon: 'fa-gavel', component: Compliance },
        { id: 'back-office', label: '백오피스', icon: 'fa-cog', component: BackOffice },
        { id: 'ib-support', label: 'IB 지원', icon: 'fa-handshake', component: IBSupport },
        { id: 'dashboard', label: '성과 대시보드', icon: 'fa-chart-pie', component: PerformanceDashboard }
    ];

    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || Overview;

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-sec-blue to-sec-blue-light text-white py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">오픈해시 자율 증권 시스템</h2>
                    <p className="text-xl opacity-90">OpenHash PDV × DeepSeek R1 AI</p>
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
                                        ? 'text-sec-blue border-sec-blue'
                                        : 'text-gray-600 border-transparent hover:text-sec-blue hover:border-sec-blue-light'
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
                <ActiveComponent />
            </main>

            <Footer />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
