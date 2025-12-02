const { useState } = React;

function TechnicalTabs() {
    const [activeTab, setActiveTab] = useState(1);

    const tabs = [
        { id: 1, name: '확장 재무제표', icon: 'fa-table' },
        { id: 2, name: '해시 전용 저장', icon: 'fa-shield-alt' },
        { id: 3, name: '교차 검증', icon: 'fa-check-double' },
        { id: 4, name: '활동 증명서', icon: 'fa-certificate' },
        { id: 5, name: '4계층 구조', icon: 'fa-layer-group' },
        { id: 6, name: '접근 제어', icon: 'fa-key' },
        { id: 7, name: '당국 통보', icon: 'fa-landmark' },
        { id: 8, name: '저장 공간', icon: 'fa-hdd' },
        { id: 9, name: 'AWS 실증', icon: 'fa-flask' },
        { id: 10, name: '블록체인 비교', icon: 'fa-balance-scale' }
    ];

    const renderTabContent = () => {
        switch(activeTab) {
            case 1: return <Tab1ExtendedStatement />;
            case 2: return <Tab2HashStorage />;
            case 3: return <Tab3CrossVerification />;
            case 4: return <Tab4ActivityProof />;
            case 5: return <Tab5FourLayers />;
            case 6: return <Tab6AccessControl />;
            case 7: return <Tab7AuthorityNotification />;
            case 8: return <Tab8StorageCalc />;
            case 9: return <Tab9AWSExperiment />;
            case 10: return <Tab10Comparison />;
            default: return <Tab1ExtendedStatement />;
        }
    };

    return (
        <div className="space-y-6">
            {/* 탭 네비게이션 */}
            <div className="bg-white rounded-lg shadow-lg p-4 sticky top-16 z-30">
                <div className="flex flex-wrap gap-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                                activeTab === tab.id
                                    ? 'bg-gov-blue text-white shadow-md'
                                    : 'bg-gray-100 text-gov-text hover:bg-gray-200'
                            }`}
                        >
                            <i className={`fas ${tab.icon} mr-2`}></i>
                            <span className="hidden md:inline">{tab.name}</span>
                            <span className="md:hidden">{tab.id}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 탭 컨텐츠 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                {renderTabContent()}
            </div>
        </div>
    );
}
