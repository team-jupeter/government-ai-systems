const { useState } = React;

function App() {
    const [activeTab, setActiveTab] = useState(0);
    const [showAIModal, setShowAIModal] = useState(false);

    const tabs = [
        { id: 0, name: '개요', icon: 'fa-home', component: 'overview' },
        { id: 1, name: '확장 재무제표', icon: 'fa-table', component: 'tab1' },
        { id: 2, name: '해시 저장', icon: 'fa-shield-alt', component: 'tab2' },
        { id: 3, name: '교차 검증', icon: 'fa-check-double', component: 'tab3' },
        { id: 4, name: '활동 증명서', icon: 'fa-certificate', component: 'tab4' },
        { id: 5, name: '4계층 구조', icon: 'fa-layer-group', component: 'tab5' },
        { id: 6, name: '접근 제어', icon: 'fa-key', component: 'tab6' },
        { id: 7, name: '당국 통보', icon: 'fa-landmark', component: 'tab7' },
        { id: 8, name: '저장 공간', icon: 'fa-hdd', component: 'tab8' },
        { id: 9, name: 'AWS 실증', icon: 'fa-flask', component: 'tab9' },
        { id: 10, name: '비교 분석', icon: 'fa-balance-scale', component: 'tab10' }
    ];

    const renderContent = () => {
        switch(activeTab) {
            case 0: return <Overview />;
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
            default: return <Overview />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            {/* 탭 네비게이션 (정부 디자인) */}
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

            {/* 컨텐츠 영역 */}
            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    {/* 페이지 제목 */}
                    {activeTab > 0 && (
                        <div className="mb-6 pb-4 border-b-2 border-gov-blue">
                            <h1 className="text-2xl font-bold text-gov-blue flex items-center">
                                <i className={`fas ${tabs[activeTab].icon} mr-3`}></i>
                                {activeTab}. {tabs[activeTab].name}
                            </h1>
                        </div>
                    )}
                    
                    {/* 탭 컨텐츠 */}
                    <div className="tab-content">
                        {renderContent()}
                    </div>
                </div>
            </main>

            <Footer />

            {/* 플로팅 AI 상담 버튼 */}
            <button
                onClick={() => setShowAIModal(true)}
                className="fixed bottom-6 right-6 z-50 bg-gov-blue text-white px-5 py-3 rounded-full font-bold hover:bg-gov-blue-light transition-all shadow-lg"
            >
                <i className="fas fa-robot mr-2"></i>
                <span className="hidden md:inline">AI 상담</span>
                <span className="md:hidden">AI</span>
            </button>

            {/* AI 상담 모달 */}
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

// 앱 시작
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
