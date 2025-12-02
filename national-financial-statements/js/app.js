const { useState } = React;

function App() {
    const [activeTab, setActiveTab] = useState(0);
    const [showAIModal, setShowAIModal] = useState(false);

    const tabs = [
        { id: 0, name: '개요', icon: 'fa-home' },
        { id: 1, name: '5계층 구조', icon: 'fa-sitemap' },
        { id: 2, name: '확률적 선택', icon: 'fa-random' },
        { id: 3, name: 'AI 검증', icon: 'fa-robot' },
        { id: 4, name: '통계 신뢰성', icon: 'fa-chart-line' },
        { id: 5, name: '부처 연계', icon: 'fa-exchange-alt' },
        { id: 6, name: '데이터 주권', icon: 'fa-user-shield' },
        { id: 7, name: '성능', icon: 'fa-tachometer-alt' },
        { id: 8, name: '보안', icon: 'fa-shield-alt' },
        { id: 9, name: '비용 분석', icon: 'fa-calculator' },
        { id: 10, name: '국제 표준', icon: 'fa-globe' }
    ];

    const renderContent = () => {
        switch(activeTab) {
            case 0: return <Overview />;
            case 1: return <Tab1FiveLayer />;
            case 2: return <Tab2ProbabilisticLayer />;
            case 3: return <Tab3AIAgent />;
            case 4: return <Tab4StatisticsTrust />;
            case 5: return <Tab5DataLinkage />;
            case 6: return <Tab6DataSovereignty />;
            case 7: return <Tab7Performance />;
            case 8: return <Tab8Security />;
            case 9: return <Tab9CostAnalysis />;
            case 10: return <Tab10Standards />;
            default: return <Overview />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            <nav className="bg-white border-b-2 border-gov-blue sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap gap-1 py-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center px-3 py-2 rounded-md text-xs font-medium transition-all ${
                                    activeTab === tab.id
                                        ? 'bg-gov-blue text-white shadow-md'
                                        : 'bg-gray-50 text-gov-text hover:bg-gray-100 border border-gray-200'
                                }`}
                            >
                                <i className={`fas ${tab.icon} mr-1.5`}></i>
                                <span className="hidden sm:inline">{tab.name}</span>
                                <span className="sm:hidden">{tab.id === 0 ? '개요' : tab.id}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    {activeTab > 0 && (
                        <div className="mb-6 pb-4 border-b-2 border-gov-blue">
                            <h1 className="text-2xl font-bold text-gov-blue flex items-center">
                                <i className={`fas ${tabs[activeTab].icon} mr-3`}></i>
                                {activeTab}. {tabs[activeTab].name}
                            </h1>
                        </div>
                    )}
                    
                    <div className="tab-content">
                        {renderContent()}
                    </div>
                </div>
            </main>

            <Footer />

            <button
                onClick={() => setShowAIModal(true)}
                className="fixed bottom-6 right-6 z-50 bg-gov-blue text-white px-5 py-3 rounded-full font-bold hover:bg-gov-blue-light transition-all shadow-lg"
            >
                <i className="fas fa-robot mr-2"></i>
                <span className="hidden md:inline">AI 상담</span>
                <span className="md:hidden">AI</span>
            </button>

            {showAIModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                        <div className="bg-gov-blue text-white px-6 py-4 flex justify-between items-center">
                            <h3 className="text-xl font-bold">
                                <i className="fas fa-robot mr-2"></i>
                                AI 상담
                            </h3>
                            <button
                                onClick={() => setShowAIModal(false)}
                                className="text-white hover:text-gray-200 text-2xl"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto" style={{maxHeight: 'calc(90vh - 80px)'}}>
                            <AIConsultant />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
