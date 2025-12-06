const { useState } = React;

function TechnicalTabs() {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { id: 0, name: '통계 생산', icon: 'fa-chart-bar', component: 'Tab1Statistics' },
        { id: 1, name: '데이터 총괄', icon: 'fa-network-wired', component: 'Tab2Coordination' },
        { id: 2, name: '데이터 서비스', icon: 'fa-server', component: 'Tab3Services' },
        { id: 3, name: '공공데이터 개방', icon: 'fa-unlock', component: 'Tab4OpenData' },
        { id: 4, name: 'AI 자동화', icon: 'fa-robot', component: 'Tab5AIAutomation' }
    ];

    const renderTabContent = () => {
        switch(activeTab) {
            case 0: return <Tab1Statistics />;
            case 1: return <Tab2Coordination />;
            case 2: return <Tab3Services />;
            case 3: return <Tab4OpenData />;
            case 4: return <Tab5AIAutomation />;
            default: return <Tab1Statistics />;
        }
    };

    return (
        <div className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="section-title inline-block">업무 영역</h2>
                </div>

                {/* 탭 메뉴 */}
                <div className="bg-gray-100 rounded-lg p-2 mb-8 overflow-x-auto">
                    <div className="flex space-x-2 min-w-max">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition ${
                                    activeTab === tab.id
                                        ? 'bg-gov-blue text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <i className={`fas ${tab.icon}`}></i>
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 탭 컨텐츠 */}
                <div className="animate-fadeIn">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
}
