const KFSApp = () => {
    const [activeTab, setActiveTab] = React.useState('overview');

    const tabs = [
        { id: 'overview', name: '개요', icon: '🏛️' },
        { id: 'organization', name: '조직', icon: '👥' },
        { id: 'activityLogs', name: '실시간 로그', icon: '📊' },
        { id: 'aiAutomation', name: 'AI 자동화', icon: '🤖' },
        { id: 'statistics', name: '통계', icon: '📈' },
        { id: 'ndrIntegration', name: 'NDR 연동', icon: '🔗' },
        { id: 'openHashAudit', name: 'OpenHash 감사', icon: '🔐' },
        { id: 'aiChat', name: 'AI 상담', icon: '💬' }
    ];

    const renderContent = () => {
        switch(activeTab) {
            case 'overview': return <Overview />;
            case 'organization': return <Organization />;
            case 'activityLogs': return <ActivityLogs />;
            case 'aiAutomation': return <AIAutomation />;
            case 'statistics': return <Statistics />;
            case 'ndrIntegration': return <NDRIntegration />;
            case 'openHashAudit': return <OpenHashAudit />;
            case 'aiChat': return <AIChat />;
            default: return <Overview />;
        }
    };

    return (
        <div className="min-h-screen">
            <header className="kfs-header text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">산림청</h1>
                            <p className="text-green-100 mt-1">Korea Forest Service - AI 자동화 시스템</p>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-green-100">AI 자동화율</div>
                            <div className="text-3xl font-bold">99.1%</div>
                        </div>
                    </div>
                </div>
            </header>

            <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex space-x-1 overflow-x-auto py-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                                    activeTab === tab.id
                                        ? 'bg-green-800 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 py-8 animate-slide-in">
                {renderContent()}
            </main>

            <footer className="bg-gray-800 text-white mt-12">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                        <div>
                            <h3 className="font-semibold mb-2">산림청</h3>
                            <p className="text-gray-400">Korea Forest Service</p>
                            <p className="text-gray-400">산림청 (중앙행정기관)</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">연락처</h3>
                            <p className="text-gray-400">대표: 042-481-4000</p>
                            <p className="text-gray-400">산불신고: 119, 1688-3119</p>
                            <p className="text-gray-400">위치: 대전광역시 서구</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">기술 스택</h3>
                            <p className="text-gray-400">AI: DeepSeek R1</p>
                            <p className="text-gray-400">Blockchain: OpenHash</p>
                            <p className="text-gray-400">Data: 국가데이터처</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400 text-sm">
                        <p>© 2025 산림청. All rights reserved. Powered by DeepSeek R1 + OpenHash</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<KFSApp />);
