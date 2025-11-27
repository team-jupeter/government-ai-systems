const App = () => {
    const [activeTab, setActiveTab] = React.useState('dashboard');
    const [activeSideMenu, setActiveSideMenu] = React.useState('overview');
    const [currentUser] = React.useState({ name: '홍길동', role: '일반 사용자' });

    const resetToHome = () => {
        setActiveTab('dashboard');
        setActiveSideMenu('overview');
    };

    const mainTabs = [
        { id: 'dashboard', label: '나의 사건', icon: 'fa-home' },
        { id: 'drafting', label: '서류 작성', icon: 'fa-file-alt' },
        { id: 'analysis', label: 'AI 분석', icon: 'fa-chart-line' },
        { id: 'simulation', label: '모의재판', icon: 'fa-gavel' },
        { id: 'consultation', label: 'AI 상담', icon: 'fa-comments' },
        { id: 'payment', label: '수수료/제출', icon: 'fa-credit-card' },
        { id: 'legislative', label: '법제 환류', icon: 'fa-landmark' }
    ];

    const sideMenus = {
        dashboard: [
            { id: 'overview', label: '사건 현황', icon: 'fa-tachometer-alt' },
            { id: 'cases', label: '진행중 사건', icon: 'fa-folder-open' },
            { id: 'schedule', label: '기일 관리', icon: 'fa-calendar-alt' },
            { id: 'notifications', label: '알림 서비스', icon: 'fa-bell' },
            { id: 'service', label: '전자송달', icon: 'fa-inbox' },
            { id: 'records', label: '기록열람', icon: 'fa-book-open' }
        ],
        drafting: [
            { id: 'complaint', label: '소장 작성', icon: 'fa-file-signature' },
            { id: 'answer', label: '답변서 작성', icon: 'fa-reply' },
            { id: 'brief', label: '준비서면 작성', icon: 'fa-file-contract' },
            { id: 'paymentorder', label: '지급명령 신청', icon: 'fa-file-invoice-dollar' },
            { id: 'drafts', label: '작성중 서류', icon: 'fa-edit' },
            { id: 'templates', label: '양식 모음', icon: 'fa-copy' }
        ],
        analysis: [
            { id: 'winrate', label: '승소율 예측', icon: 'fa-percentage' },
            { id: 'precedent', label: '판례 검색', icon: 'fa-search' },
            { id: 'global', label: '글로벌 비교', icon: 'fa-globe' },
            { id: 'cost', label: '비용 계산기', icon: 'fa-calculator' }
        ],
        simulation: [
            { id: 'trial', label: '모의재판 시작', icon: 'fa-play-circle' },
            { id: 'history', label: '시뮬레이션 기록', icon: 'fa-history' }
        ],
        consultation: [
            { id: 'chat', label: 'AI 상담', icon: 'fa-robot' },
            { id: 'history', label: '상담 기록', icon: 'fa-history' }
        ],
        payment: [
            { id: 'calculate', label: '수수료 계산', icon: 'fa-calculator' },
            { id: 'pay', label: '납부하기', icon: 'fa-credit-card' },
            { id: 'submit', label: '서류 제출', icon: 'fa-paper-plane' },
            { id: 'issuance', label: '문서 발급', icon: 'fa-file-certificate' }
        ],
        legislative: [
            { id: 'deviation', label: '판결 이탈 분석', icon: 'fa-exclamation-triangle' },
            { id: 'proposal', label: '입법 제안', icon: 'fa-gavel' },
            { id: 'tracking', label: '진행 현황', icon: 'fa-tasks' }
        ]
    };

    const renderContent = () => {
        switch(activeTab) {
            case 'dashboard':
                if (activeSideMenu === 'cases') return <CaseManagement />;
                if (activeSideMenu === 'notifications') return <NotificationService />;
                if (activeSideMenu === 'service') return <ElectronicService />;
                if (activeSideMenu === 'records') return <RecordViewer />;
                return <Dashboard subMenu={activeSideMenu} />;
            case 'drafting':
                if (activeSideMenu === 'complaint') return <ComplaintDrafting />;
                if (activeSideMenu === 'answer') return <AnswerDrafting />;
                if (activeSideMenu === 'brief') return <BriefDrafting />;
                if (activeSideMenu === 'paymentorder') return <PaymentOrder />;
                if (activeSideMenu === 'drafts') return <DraftDocuments />;
                return <ComplaintDrafting />;
            case 'analysis':
                if (activeSideMenu === 'winrate') return <WinRatePrediction />;
                if (activeSideMenu === 'precedent') return <PrecedentSearch />;
                if (activeSideMenu === 'global') return <GlobalComparison />;
                if (activeSideMenu === 'cost') return <FeePayment />;
                return <WinRatePrediction />;
            case 'simulation':
                return <TrialSimulation />;
            case 'consultation':
                return <AIConsultation />;
            case 'payment':
                if (activeSideMenu === 'issuance') return <DocumentIssuance />;
                return <FeePayment />;
            case 'legislative':
                return <LegislativeFeedback />;
            default:
                return <Dashboard subMenu={activeSideMenu} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header currentUser={currentUser} onReset={resetToHome} />
            
            <nav className="court-nav sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center">
                        {mainTabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setActiveSideMenu(sideMenus[tab.id]?.[0]?.id || '');
                                }}
                                className={`px-5 py-4 text-sm font-medium transition-all ${
                                    activeTab === tab.id 
                                        ? 'text-yellow-400 border-b-2 border-yellow-400' 
                                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                <i className={`fas ${tab.icon} mr-2`}></i>
                                {tab.label}
                            </button>
                        ))}
                        <a href="/" className="ml-auto px-4 py-4 text-gray-400 hover:text-white text-sm">
                            <i className="fas fa-arrow-left mr-2"></i>포털
                        </a>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto flex">
                <aside className="w-64 bg-white border-r min-h-screen py-4 flex-shrink-0">
                    <div className="px-4 mb-4">
                        <h3 className="text-sm font-bold text-gray-500 uppercase">
                            {mainTabs.find(t => t.id === activeTab)?.label}
                        </h3>
                    </div>
                    <nav>
                        {sideMenus[activeTab]?.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSideMenu(item.id)}
                                className={`w-full text-left px-4 py-3 flex items-center gap-3 text-gray-700 border-l-4 transition ${
                                    activeSideMenu === item.id 
                                        ? 'bg-blue-50 border-blue-600 font-medium' 
                                        : 'border-transparent hover:bg-gray-50'
                                }`}
                            >
                                <i className={`fas ${item.icon} text-gray-400 w-5`}></i>
                                {item.label}
                            </button>
                        ))}
                    </nav>
                    
                    <div className="mt-8 mx-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">🤖</span>
                            <span className="font-bold text-blue-800">AI 도우미</span>
                        </div>
                        <p className="text-sm text-blue-600 mb-3">
                            무엇을 도와드릴까요?
                        </p>
                        <button 
                            onClick={() => { setActiveTab('consultation'); setActiveSideMenu('chat'); }}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                        >
                            <i className="fas fa-comments mr-2"></i>상담 시작
                        </button>
                    </div>
                </aside>

                <main className="flex-1 min-w-0">
                    {renderContent()}
                </main>
            </div>

            <SystemExplainer />
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
