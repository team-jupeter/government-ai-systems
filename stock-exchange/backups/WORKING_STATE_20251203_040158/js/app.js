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
            case 'overview': return React.createElement(Overview);
            case 'trading': return React.createElement(TradingSystem);
            case 'market-making': return React.createElement(MarketMaking);
            case 'settlement': return React.createElement(Settlement);
            case 'surveillance': return React.createElement(Surveillance);
            case 'listing': return React.createElement(Listing);
            case 'disclosure': return React.createElement(Disclosure);
            case 'investor': return React.createElement(InvestorProtection);
            case 'market-data': return React.createElement(MarketData);
            case 'dashboard': return React.createElement(PerformanceDashboard);
            default: return React.createElement(Overview);
        }
    };

    return React.createElement('div', { className: 'min-h-screen bg-gray-50' },
        // Header
        React.createElement('header', { className: 'bg-white border-b-2 border-gray-200 sticky top-0 z-40' },
            React.createElement('div', { className: 'container mx-auto px-4' },
                React.createElement('div', { className: 'flex items-center justify-between py-4' },
                    React.createElement('div', {},
                        React.createElement('h1', { className: 'text-2xl font-bold text-blue-600' }, 
                            React.createElement('i', { className: 'fas fa-landmark mr-2' }),
                            '오픈해시 거래소'
                        ),
                        React.createElement('p', { className: 'text-sm text-gray-600' }, 
                            'OpenHash Exchange'
                        )
                    )
                )
            ),
            // Tab Navigation
            React.createElement('nav', { className: 'container mx-auto px-4' },
                React.createElement('div', { className: 'flex space-x-1 overflow-x-auto' },
                    tabs.map(tab =>
                        React.createElement('button', {
                            key: tab.id,
                            onClick: () => setActiveTab(tab.id),
                            className: `px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all ${
                                activeTab === tab.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`
                        },
                            React.createElement('i', { className: `fas ${tab.icon} mr-2` }),
                            tab.name
                        )
                    )
                )
            )
        ),

        // Main Content
        React.createElement('main', { className: 'container mx-auto px-4 py-8' },
            renderContent()
        )
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
