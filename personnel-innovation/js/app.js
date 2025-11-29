const App = () => {
    const [currentPage, setCurrentPage] = React.useState('dashboard');
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
    const [showFloatingChat, setShowFloatingChat] = React.useState(false);
    const [systemStatus, setSystemStatus] = React.useState({
        workers: 30000000,
        activeNow: 24000000,
        tasksToday: 45000000,
        matchRate: 92.4
    });

    React.useEffect(() => {
        const updateStatus = () => {
            const hour = new Date().getHours();
            const isWorkHour = hour >= 9 && hour < 18;
            const baseActive = isWorkHour ? 24000000 : 8000000;
            setSystemStatus({
                workers: 30000000,
                activeNow: baseActive + Math.floor(Math.random() * 1000000),
                tasksToday: 45000000 + Math.floor(Math.random() * 5000000),
                matchRate: 92.4 + (Math.random() * 2 - 1)
            });
        };
        updateStatus();
        const interval = setInterval(updateStatus, 5000);
        return () => clearInterval(interval);
    }, []);

    const menuItems = [
        { id: 'dashboard', name: '대시보드', icon: 'fa-chart-pie', badge: null },
        { id: 'industry-analysis', name: '산업 동향 분석', icon: 'fa-industry', badge: 'NEW' },
        { id: 'divider-1', type: 'divider', label: '국가 노동인구 관리' },
        { id: 'national-workforce', name: '국가 노동인구', icon: 'fa-users', badge: 'LIVE' },
        { id: 'workforce-optimization', name: '인력 최적화 AI', icon: 'fa-brain', badge: 'AI' },
        { id: 'individual-corporation', name: '1인 법인 시스템', icon: 'fa-building-user', badge: 'NEW' },
        { id: 'divider-2', type: 'divider', label: '성과 측정 및 평가' },
        { id: 'performance-tracking', name: '업무 수행 기록', icon: 'fa-clipboard-list', badge: 'LIVE' },
        { id: 'attendance-log', name: '출퇴근 관리', icon: 'fa-clock', badge: null },
        { id: 'organization-performance', name: '기관 경영성과', icon: 'fa-building', badge: null },
        { id: 'individual-evaluation', name: '개인 성과 평가', icon: 'fa-user-check', badge: '🔒' },
        { id: 'divider-3', type: 'divider', label: '업무 할당 및 추천' },
        { id: 'job-matching', name: 'AI 직업 매칭', icon: 'fa-handshake', badge: 'AI' },
        { id: 'task-allocation', name: '업무 할당', icon: 'fa-tasks', badge: 'LIVE' },
        { id: 'career-recommendation', name: '경력 개발', icon: 'fa-route', badge: 'AI' },
        { id: 'divider-4', type: 'divider', label: '조직 계층별 뷰' },
        { id: 'regional-workforce', name: '광역 인력 (L3)', icon: 'fa-map', badge: null },
        { id: 'city-workforce', name: '시군구 인력 (L2)', icon: 'fa-city', badge: null },
        { id: 'micro-entity', name: '최소 단위 (L1)', icon: 'fa-user-tie', badge: null },
        { id: 'divider-5', type: 'divider', label: '개인정보 및 보안' },
        { id: 'personal-vault', name: '개인 정보 금고', icon: 'fa-vault', badge: '🔒' },
        { id: 'openhash-verification', name: 'OpenHash 검증', icon: 'fa-shield-halved', badge: '검증됨' },
        { id: 'divider-6', type: 'divider', label: 'AI 서비스' },
        { id: 'ai-consultant', name: 'AI 인사 상담', icon: 'fa-robot', badge: 'AI' }
    ];

    const renderPage = () => {
        switch(currentPage) {
            case 'dashboard': return <Dashboard systemStatus={systemStatus} setCurrentPage={setCurrentPage} />;
            case 'industry-analysis': return <IndustryAnalysis />;
            case 'national-workforce': return <NationalWorkforce />;
            case 'workforce-optimization': return <WorkforceOptimization />;
            case 'individual-corporation': return <IndividualCorporation />;
            case 'performance-tracking': return <PerformanceTracking />;
            case 'attendance-log': return <AttendanceLog />;
            case 'organization-performance': return <OrganizationPerformance />;
            case 'individual-evaluation': return <IndividualEvaluation />;
            case 'job-matching': return <JobMatching />;
            case 'task-allocation': return <TaskAllocation />;
            case 'career-recommendation': return <CareerRecommendation />;
            case 'regional-workforce': return <RegionalWorkforce />;
            case 'city-workforce': return <CityWorkforce />;
            case 'micro-entity': return <MicroEntity />;
            case 'personal-vault': return <PersonalVault />;
            case 'openhash-verification': return <OpenHashVerification />;
            case 'ai-consultant': return <AIConsultant />;
            default: return <Dashboard systemStatus={systemStatus} setCurrentPage={setCurrentPage} />;
        }
    };

    const getBadgeStyle = (badge) => {
        if (!badge) return '';
        const styles = {
            'LIVE': 'bg-red-500 text-white',
            'AI': 'bg-purple-500 text-white',
            'NEW': 'bg-green-500 text-white',
            '🔒': 'bg-yellow-500 text-black',
            '검증됨': 'bg-blue-500 text-white'
        };
        return styles[badge] || 'bg-gray-500 text-white';
    };

    const currentMenuItem = menuItems.find(m => m.id === currentPage);
    const currentPageName = currentMenuItem ? currentMenuItem.name : '대시보드';
    const sidebarWidth = sidebarCollapsed ? 'w-16' : 'w-72';
    const mainMargin = sidebarCollapsed ? 'ml-16' : 'ml-72';
    const chevronIcon = sidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left';

    return (
        <div className="flex min-h-screen bg-slate-900">
            <aside className={sidebarWidth + " bg-slate-800 border-r border-slate-700 flex flex-col transition-all duration-300 fixed h-full z-40"}>
                <div className="p-4 border-b border-slate-700">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-xl">
                            👥
                        </div>
                        {!sidebarCollapsed && (
                            <div>
                                <h1 className="text-lg font-bold text-white">인사혁신 시스템</h1>
                                <p className="text-xs text-slate-400">K-Governance</p>
                            </div>
                        )}
                    </div>
                </div>

                {!sidebarCollapsed && (
                    <div className="p-3 mx-3 mt-3 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">현재 근무 중</span>
                            <span className="text-green-400 font-bold">
                                {(systemStatus.activeNow / 1000000).toFixed(1)}M
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-1">
                            <span className="text-slate-400">매칭 정확도</span>
                            <span className="text-blue-400 font-bold">
                                {systemStatus.matchRate.toFixed(1)}%
                            </span>
                        </div>
                    </div>
                )}

                <nav className="flex-1 overflow-y-auto sidebar-scroll p-3">
                    {menuItems.map((item) => {
                        if (item.type === 'divider') {
                            if (sidebarCollapsed) {
                                return <div key={item.id} className="my-2 border-t border-slate-700" />;
                            }
                            return (
                                <div key={item.id} className="mt-4 mb-2 px-3">
                                    <span className="text-xs text-slate-500 uppercase tracking-wider">{item.label}</span>
                                </div>
                            );
                        }
                        const isActive = currentPage === item.id;
                        const btnClass = isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700';
                        return (
                            <button
                                key={item.id}
                                onClick={() => setCurrentPage(item.id)}
                                className={"w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all " + btnClass}
                                title={sidebarCollapsed ? item.name : ''}
                            >
                                <i className={"fas " + item.icon + " w-5 text-center"} />
                                {!sidebarCollapsed && (
                                    <span className="flex-1 text-left text-sm">{item.name}</span>
                                )}
                                {!sidebarCollapsed && item.badge && (
                                    <span className={"px-1.5 py-0.5 rounded text-xs " + getBadgeStyle(item.badge)}>{item.badge}</span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-3 border-t border-slate-700">
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-700 transition-all"
                    >
                        <i className={"fas " + chevronIcon} />
                        {!sidebarCollapsed && <span className="text-sm">접기</span>}
                    </button>
                    {sidebarCollapsed ? (
                        <a href="/" className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-700 transition-all mt-1">
                            <i className="fas fa-arrow-left" />
                        </a>
                    ) : (
                        <a href="/" className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-700 transition-all mt-1">
                            <i className="fas fa-arrow-left" />
                            <span className="text-sm">포털로 돌아가기</span>
                        </a>
                    )}
                </div>
            </aside>

            <main className={"flex-1 transition-all duration-300 " + mainMargin}>
                <header className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 px-6 py-4 sticky top-0 z-30">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-white">{currentPageName}</h2>
                            <p className="text-sm text-slate-400">대한민국 3천만 노동인구 통합 관리 시스템</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-full">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-green-400 text-sm">시스템 정상</span>
                            </div>
                            <button
                                onClick={() => setShowFloatingChat(!showFloatingChat)}
                                className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all"
                                title="AI 상담"
                            >
                                <i className="fas fa-robot" />
                            </button>
                        </div>
                    </div>
                </header>
                <div className="p-6">
                    {renderPage()}
                </div>
            </main>

            {showFloatingChat && <FloatingAssistant onClose={() => setShowFloatingChat(false)} />}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
