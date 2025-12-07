const TechnicalTabs = () => {
    const [activeTab, setActiveTab] = React.useState(0);

    const tabs = [
        '확률적 계층 선택',
        '단말기-Layer 연동',
        '동적 노드 관리',
        'Merkle Tree 연동',
        '계층 간 상호 검증',
        'LPBFT 합의',
        'Representative & Shamir',
        'AI 멀티에이전트',
        '오프라인 배치'
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
            <div className="bg-gov-blue text-white px-6 py-4">
                <h3 className="text-xl font-bold">핵심 메커니즘</h3>
            </div>
            
            <div className="border-b border-gov-border overflow-x-auto">
                <div className="flex min-w-max">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                                activeTab === index
                                    ? 'border-gov-blue text-gov-blue bg-blue-50'
                                    : 'border-transparent text-gov-text-secondary hover:text-gov-text hover:bg-gray-50'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6">
                {activeTab === 0 && <Tab1ProbabilisticSelection />}
                {activeTab === 1 && <Tab2DeviceLayerIntegration />}
                {activeTab === 2 && <Tab2NodeManagement />}
                {activeTab === 3 && <Tab3HashChainInterlock />}
                {activeTab === 4 && <Tab4DataIntegrity />}
                {activeTab === 5 && <Tab5FraudDetection />}
                {activeTab === 6 && <Tab6PDV />}
                {activeTab === 7 && <Tab7AIMultiAgent />}
                {activeTab === 8 && <Tab8OfflineBatch />}
            </div>
        </div>
    );
};
