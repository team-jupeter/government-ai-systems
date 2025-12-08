// 메인 앱 컴포넌트
const App = () => {
    const [currentTab, setCurrentTab] = React.useState('overview');

    const tabs = [
        
        { id: 'overview', name: '개요', icon: 'home', component: Overview },
        { id: 'issuance', name: '발행과 유통', icon: 'coins', component: IssuanceCirculation },
        { id: 'record', name: '기록', icon: 'database', component: RecordMechanism },
        { id: 'fpga', name: 'FPGA 하드웨어', icon: 'microchip', component: FPGAHardware },
        { id: 'financial', name: '재무제표', icon: 'file-invoice-dollar', component: FinancialStatement },
        { id: 'tax', name: '세무 자동화', icon: 'calculator', component: TaxAutomation },
        { id: 'integrated', name: '통합 금융', icon: 'layer-group', component: IntegratedFinance },
        { id: 'regulation', name: '규제 준수', icon: 'balance-scale', component: RegulationCompliance },
        { id: 'performance', name: '성능 비교', icon: 'chart-bar', component: PerformanceComparison },
        { id: 'consultation', name: 'AI 상담', icon: 'comments', component: AIConsultation },
        { id: 'ai-verification', name: 'AI 검증', icon: 'shield-alt', component: AIVerification }
    ];

    const currentTabData = tabs.find(t => t.id === currentTab);
    const CurrentComponent = currentTabData?.component;

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            {/* 탭 네비게이션 */}
            <div className="bg-white shadow-md sticky top-0 z-10">
                <div className="container mx-auto px-4">
                    <div className="flex overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setCurrentTab(tab.id)}
                                className={`px-6 py-4 font-semibold whitespace-nowrap transition-all border-b-4 ${
                                    currentTab === tab.id
                                        ? 'border-gov-blue text-gov-blue bg-blue-50'
                                        : 'border-transparent text-gray-600 hover:text-gov-blue hover:bg-gray-50'
                                }`}
                            >
                                <i className={`fas fa-${tab.icon} mr-2`}></i>
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 컨텐츠 영역 */}
            <div className="container mx-auto px-4 py-8">
                {CurrentComponent && <CurrentComponent />}
            </div>

            <Footer />
        </div>
    );
};

// 앱 렌더링
const root = ReactDOM.createRoot(document.getElementById("root")); root.render(<App />, document.getElementById('root'));
