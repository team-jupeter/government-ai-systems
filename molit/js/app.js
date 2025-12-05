const { useState } = React;

const NISApp = () => {
    const [activeTab, setActiveTab] = useState('overview');
    
    const tabs = [
        { id: 'overview', name: '시스템 개요', icon: '🛡️' },
        { id: 'organization', name: '조직 및 부서', icon: '🏢' },
        { id: 'logs', name: '실시간 정보 로그', icon: '📋' },
        { id: 'ndr', name: '국가데이터처 연동', icon: '🔗' },
        { id: 'openhash', name: '오픈해시 감사', icon: '🔐' },
        { id: 'ai', name: 'AI 자동화', icon: '🤖' },
        { id: 'statistics', name: '통계 및 성과', icon: '📊' },
        { id: 'chat', name: 'AI 상담', icon: '💬' }
    ];
    
    const renderContent = () => {
        switch(activeTab) {
            case 'overview': return <Overview />;
            case 'organization': return <Organization />;
            case 'logs': return <ActivityLogs />;
            case 'ndr': return <NDRIntegration />;
            case 'openhash': return <OpenHashAudit />;
            case 'ai': return <AIAutomation />;
            case 'statistics': return <Statistics />;
            case 'chat': return <AIChat />;
            default: return <Overview />;
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="nis-header">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">국토교통부 AI 자동화 시스템</h1>
                            <p className="text-gray-300 text-sm">
                                National Intelligence Service - OpenHash & AI Integration
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-300">실시간 정보 수집</div>
                            <div className="text-2xl font-bold">365건/일</div>
                        </div>
                    </div>
                </div>
            </header>
            
            <nav className="bg-white border-b shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex space-x-1 overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                                    activeTab === tab.id 
                                        ? 'tab-active' 
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>
            
            <main className="max-w-7xl mx-auto px-4 py-6">
                {renderContent()}
            </main>
            
            <footer className="bg-gray-800 text-white mt-12 py-8">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-sm text-gray-400">
                        © 2025 국토교통부 AI 자동화 시스템 | OpenHash 기반 무결성 보장
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                        본 시스템은 국가데이터처와 연동하여 모든 정보활동을 투명하게 기록합니다
                    </p>
                </div>
            </footer>
        </div>
    );
};

ReactDOM.render(<NISApp />, document.getElementById('root'));
