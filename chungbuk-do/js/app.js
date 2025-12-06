const App = () => {
    const [activeTab, setActiveTab] = React.useState('overview');
    const tabs = [
        { id: 'overview', name: '개요', icon: '🏔️' },
        { id: 'organization', name: '조직도', icon: '👥' },
        { id: 'logs', name: '활동 로그', icon: '📋' },
        { id: 'ndr', name: 'NDR 연동', icon: '🔗' },
        { id: 'audit', name: 'OpenHash 감사', icon: '✓' },
        { id: 'ai', name: 'AI 자동화', icon: '🤖' },
        { id: 'stats', name: '통계', icon: '📊' },
        { id: 'chat', name: 'AI 채팅', icon: '💬' }
    ];
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="header text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">충청북도 AI 자동화 시스템</h1>
                            <p className="text-blue-100 mt-2">Chungbuk AI Automation</p>
                        </div>
                        <OpenHashBadge />
                    </div>
                </div>
            </header>
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex space-x-1 overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-b-2 border-blue-600 text-blue-600'
                                        : 'text-gray-600 hover:text-blue-600'
                                }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto px-4 py-8">
                {activeTab === 'overview' && <Overview />}
                {activeTab === 'organization' && <Organization />}
                {activeTab === 'logs' && <ActivityLogs />}
                {activeTab === 'ndr' && <NDRIntegration />}
                {activeTab === 'audit' && <OpenHashAudit />}
                {activeTab === 'ai' && <AIAutomation />}
                {activeTab === 'stats' && <Statistics />}
                {activeTab === 'chat' && <AIChat />}
            </main>
        </div>
    );
};
ReactDOM.render(<App />, document.getElementById('root'));
