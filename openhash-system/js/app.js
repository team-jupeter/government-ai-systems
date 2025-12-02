const { useState } = React;

function App() {
    const [activeSection, setActiveSection] = useState('overview');

    const menuItems = [
        { id: 'overview', icon: 'fa-home', title: '개요' },
        { id: 'architecture', icon: 'fa-sitemap', title: '4계층 아키텍처' },
        { id: 'tabs', icon: 'fa-layer-group', title: '핵심 메커니즘' },
        { id: 'comparison', icon: 'fa-chart-bar', title: '블록체인 비교' },
        { id: 'energy', icon: 'fa-leaf', title: '에너지 계산기' },
        { id: 'ai', icon: 'fa-robot', title: 'AI 상담' }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            {/* 네비게이션 메뉴 */}
            <nav className="bg-gov-gray border-b border-gov-border sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex overflow-x-auto">
                        {menuItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`px-6 py-4 font-medium whitespace-nowrap transition-colors border-b-4 ${
                                    activeSection === item.id
                                        ? 'border-gov-blue text-gov-blue bg-white'
                                        : 'border-transparent text-gov-text-secondary hover:text-gov-blue hover:bg-white'
                                }`}
                            >
                                <i className={`fas ${item.icon} mr-2`}></i>
                                {item.title}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* 콘텐츠 영역 */}
            <main>
                {activeSection === 'overview' && <Overview />}
                {activeSection === 'architecture' && <Architecture />}
                {activeSection === 'tabs' && <TechnicalTabs />}
                {activeSection === 'comparison' && <Comparison />}
                {activeSection === 'energy' && <EnergyCalculator />}
                {activeSection === 'ai' && <AIConsultant />}
            </main>

            <Footer />
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    React.createElement(App)
);
