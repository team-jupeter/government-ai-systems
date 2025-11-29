const App = () => {
    const [currentPage, setCurrentPage] = React.useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const [showOpenHashModal, setShowOpenHashModal] = React.useState(false);

    const menuItems = [
        { id: 'dashboard', name: '대시보드', icon: 'fa-home' },
        { id: 'social-autonomous', name: '사회적 자율주행', icon: 'fa-project-diagram', badge: 'SIM' },
        { id: 'individual-autonomous', name: '개별 자율주행', icon: 'fa-link', badge: 'HASH' },
        { id: 'data-pollution', name: '데이터 오염 탐지', icon: 'fa-shield-virus', badge: 'AI' },
        { id: 'national', name: '국가 차량 현황', icon: 'fa-car', badge: 'LIVE' },
        { id: 'control', name: '중앙 관제 센터', icon: 'fa-server', badge: 'LIVE' },
        { id: 'routing', name: '실시간 경로 배정', icon: 'fa-route', badge: 'NEW' },
        { id: 'demand', name: '수요-차량 매칭', icon: 'fa-handshake', badge: 'LIVE' },
        { id: 'vehicle', name: '개별 차량 모니터링', icon: 'fa-car-side' },
        { id: 'regional', name: '광역 허브 (L3)', icon: 'fa-warehouse' },
        { id: 'city', name: '시군구 터미널 (L2)', icon: 'fa-city' },
        { id: 'passenger', name: '개인 이동 기록', icon: 'fa-lock' },
        { id: 'cargo', name: '화물 추적', icon: 'fa-truck', badge: 'LIVE' },
        { id: 'safety', name: '안전 경고', icon: 'fa-exclamation-triangle', badge: '⚠️' },
        { id: 'ai', name: 'AI 교통 상담', icon: 'fa-robot' },
        { id: 'openhash', name: 'OpenHash', icon: 'fa-link', badge: '검증됨' }
    ];

    const renderPage = () => {
        switch(currentPage) {
            case 'dashboard': return <Dashboard setCurrentPage={setCurrentPage} />;
            case 'social-autonomous': return <SocialAutonomous />;
            case 'individual-autonomous': return <IndividualAutonomous />;
            case 'data-pollution': return <DataPollutionDetection />;
            case 'national': return <NationalFleet />;
            case 'control': return <CentralControl />;
            case 'routing': return <LiveRouting />;
            case 'demand': return <DemandMatching />;
            case 'vehicle': return <VehicleMonitor />;
            case 'regional': return <RegionalHub />;
            case 'city': return <CityTerminal />;
            case 'passenger': return <PassengerPDV />;
            case 'cargo': return <CargoTracking />;
            case 'safety': return <SafetyAlert />;
            case 'ai': return <AIConsultant />;
            case 'openhash': return <OpenHashInfo />;
            default: return <Dashboard setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            {/* Top Banner */}
            <a href="http://100.30.14.224/openhash.html" target="_blank" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-2 px-4 text-center text-sm hover:opacity-90 block">
                <i className="fas fa-book-open mr-2"></i>
                <span className="font-medium">📘 오픈해시 설명서 - 데이터 진실성이 생명을 지킵니다</span>
            </a>
            
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className={(sidebarOpen ? 'w-64' : 'w-20') + ' bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col'}>
                    <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                                <i className="fas fa-car text-xl"></i>
                            </div>
                            {sidebarOpen && (
                                <div>
                                    <div className="font-bold text-sm">사회적 자율주행</div>
                                    <div className="text-xs text-indigo-400">OpenHash 기반</div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <nav className="flex-1 p-2 overflow-y-auto">
                        {menuItems.map(item => (
                            <button 
                                key={item.id} 
                                onClick={() => setCurrentPage(item.id)}
                                className={'w-full flex items-center space-x-3 px-4 py-3 rounded-xl mb-1 transition-all sidebar-item ' + (currentPage === item.id ? 'active' : '')}
                            >
                                <i className={'fas ' + item.icon + ' w-5'}></i>
                                {sidebarOpen && (
                                    <React.Fragment>
                                        <span className="flex-1 text-left text-sm">{item.name}</span>
                                        {item.badge && (
                                            <span className={'px-2 py-0.5 text-xs rounded-full ' + 
                                                (item.badge === 'LIVE' ? 'bg-green-500/20 text-green-400' : 
                                                 item.badge === 'NEW' ? 'bg-blue-500/20 text-blue-400' : 
                                                 item.badge === '⚠️' ? 'bg-yellow-500/20 text-yellow-400' :
                                                 'bg-indigo-500/20 text-indigo-400')}>
                                                {item.badge === 'LIVE' && <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1 pulse-dot"></span>}
                                                {item.badge}
                                            </span>
                                        )}
                                    </React.Fragment>
                                )}
                            </button>
                        ))}
                    </nav>
                    
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-4 border-t border-gray-700 hover:bg-gray-700">
                        <i className={'fas fa-chevron-' + (sidebarOpen ? 'left' : 'right')}></i>
                    </button>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-auto">
                    <header className="gradient-bg py-8 px-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold">🚗 OpenHash 기반 사회적 자율주행 교통 관제 시스템</h1>
                                    <p className="text-gray-300 mt-2">중앙 서버가 3백만 차량의 속도와 경로를 실시간 결정합니다</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <a href="/" className="bg-gray-700/50 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm">
                                        <i className="fas fa-arrow-left mr-2"></i>포털
                                    </a>
                                    <button onClick={() => setShowOpenHashModal(true)} className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/50 px-4 py-2 rounded-lg flex items-center">
                                        <i className="fas fa-shield-alt text-indigo-400 mr-2"></i>
                                        <span className="text-indigo-400 text-sm">무오류 교통 데이터</span>
                                        <span className="w-2 h-2 bg-green-400 rounded-full ml-2 pulse-dot"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>
                    
                    <div className="max-w-7xl mx-auto p-6">
                        {renderPage()}
                    </div>
                </main>
            </div>
            
            <FloatingFeaturePanel />
            <OpenHashModal isOpen={showOpenHashModal} onClose={() => setShowOpenHashModal(false)} />
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
