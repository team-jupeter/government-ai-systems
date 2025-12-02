const TechnicalTabs = () => {
    const [activeTab, setActiveTab] = React.useState(1);

    const tabs = [
        { id: 1, icon: '🎲', title: '확률적 계층 선택', desc: 'SHA-256 재해싱' },
        { id: 2, icon: '🚪', title: '노드 진입/탈퇴', desc: '동적 네트워크 관리' },
        { id: 3, icon: '🔗', title: 'Hash Chain 연동', desc: '계층간 상호 검증' },
        { id: 4, icon: '✅', title: '데이터 진실성', desc: 'Merkle Tree 검증' },
        { id: 5, icon: '🚨', title: '데이터 오염 탐지', desc: '위변조 방지' },
        { id: 6, icon: '🔐', title: '개인정보금고 PDV', desc: 'Privacy Data Vault' }
    ];

    return (
        <section className="py-16 bg-gov-gray">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gov-text mb-4">핵심 메커니즘</h3>
                    <p className="text-gov-text-secondary">오픈해시 기술의 6가지 핵심 동작 원리</p>
                </div>

                {/* 탭 네비게이션 */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`p-4 rounded-lg font-bold transition-all text-center ${
                                activeTab === tab.id
                                    ? 'bg-gov-blue text-white shadow-lg'
                                    : 'bg-white border-2 border-gov-border text-gov-text hover:border-gov-blue'
                            }`}
                        >
                            <div className="text-3xl mb-2">{tab.icon}</div>
                            <div className="text-sm font-bold mb-1">{tab.title}</div>
                            <div className="text-xs opacity-75">{tab.desc}</div>
                        </button>
                    ))}
                </div>

                {/* 탭 콘텐츠 */}
                <div className="bg-white rounded-lg shadow-sm border border-gov-border p-8 min-h-[600px]">
                    {activeTab === 1 && <Tab1ProbabilisticSelection />}
                    {activeTab === 2 && <Tab2NodeManagement />}
                    {activeTab === 3 && <Tab3HashChainInterlock />}
                    {activeTab === 4 && <Tab4DataIntegrity />}
                    {activeTab === 5 && <Tab5FraudDetection />}
                    {activeTab === 6 && <Tab6PDV />}
                </div>
            </div>
        </section>
    );
};
