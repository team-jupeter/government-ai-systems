const OpenHashModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-2xl max-w-3xl w-full border border-cyan-500/30">
                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">🍱 무오류 급식 데이터</h2>
                        <button onClick={onClose} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    <p className="text-gray-400">OpenHash 기반 위변조 불가능한 급식 기록 시스템</p>
                </div>
            </div>
        </div>
    );
};

const App = () => {
    const [currentPage, setCurrentPage] = React.useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const [showOpenHashModal, setShowOpenHashModal] = React.useState(false);

    const menuItems = [
        { id: 'dashboard', name: '대시보드', icon: 'fa-home' },
        { id: 'national', name: '국가 현황', icon: 'fa-flag', badge: 'LIVE' },
        { id: 'regional', name: '광역 공급 (L3)', icon: 'fa-warehouse' },
        { id: 'city', name: '시군구 배급 (L2)', icon: 'fa-city' },
        { id: 'local', name: '읍면동 조리 (L1)', icon: 'fa-utensils', badge: 'LIVE' },
        { id: 'tracker', name: '위치 추적', icon: 'fa-watch' },
        { id: 'delivery', name: '배송 차량', icon: 'fa-truck', badge: 'LIVE' },
        { id: 'nutrition', name: '개인 영양분석', icon: 'fa-lock' },
        { id: 'ingredient', name: '식재료 조달', icon: 'fa-shopping-basket' },
        { id: 'supply', name: '식재료 공급', icon: 'fa-seedling' },
        { id: 'kitchen', name: '조리 시설 현황', icon: 'fa-kitchen-set' },
        { id: 'production', name: '식량 생산 현황', icon: 'fa-tractor' },
        { id: 'quality', name: '품질 평가 체계', icon: 'fa-award' },
        { id: 'labor', name: '노동 자원 배정', icon: 'fa-users-cog', badge: 'NEW' },
        { id: 'openhash', name: 'OpenHash', icon: 'fa-link', badge: '검증됨' }
    ];

    const renderPage = () => {
        switch(currentPage) {
            case 'dashboard': return <Dashboard setCurrentPage={setCurrentPage} />;
            case 'national': return <NationalOverview />;
            case 'regional': return <RegionalSupply />;
            case 'city': return <CityDistribution />;
            case 'local': return <LocalKitchen />;
            case 'tracker': return <SmartWatchTracker />;
            case 'delivery': return <DeliveryFleet />;
            case 'nutrition': return <PDVNutrition />;
            case 'ingredient': return <IngredientPlan />;
            case 'supply': return <IngredientSupply />;
            case 'kitchen': return <KitchenFacility />;
            case 'production': return <FoodProduction />;
            case 'quality': return <QualityEvaluation />;
            case 'labor': return <LaborResource />;
            case 'openhash': return <OpenHashInfo />;
            default: return <Dashboard setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            <a href="http://100.30.14.224/openhash.html" target="_blank" className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 py-2 px-4 text-center text-sm hover:opacity-90 block">
                <i className="fas fa-book-open mr-2"></i><span className="font-medium">📘 오픈해시 설명서</span>
            </a>
            <div className="flex flex-1">
                <aside className={(sidebarOpen ? 'w-64' : 'w-20') + ' bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col'}>
                    <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                                <i className="fas fa-utensils text-xl"></i>
                            </div>
                            {sidebarOpen && (<div><div className="font-bold text-sm">국가 급식 시스템</div><div className="text-xs text-cyan-400">OpenHash 기반</div></div>)}
                        </div>
                    </div>
                    <nav className="flex-1 p-2 overflow-y-auto">
                        {menuItems.map(item => (
                            <button key={item.id} onClick={() => setCurrentPage(item.id)}
                                className={'w-full flex items-center space-x-3 px-4 py-3 rounded-xl mb-1 transition-all sidebar-item ' + (currentPage === item.id ? 'active' : '')}>
                                <i className={'fas ' + item.icon + ' w-5'}></i>
                                {sidebarOpen && (
                                    <React.Fragment>
                                        <span className="flex-1 text-left text-sm">{item.name}</span>
                                        {item.badge && (<span className={'px-2 py-0.5 text-xs rounded-full ' + (item.badge === 'LIVE' ? 'bg-green-500/20 text-green-400' : item.badge === 'NEW' ? 'bg-blue-500/20 text-blue-400' : 'bg-cyan-500/20 text-cyan-400')}>{item.badge}</span>)}
                                    </React.Fragment>
                                )}
                            </button>
                        ))}
                    </nav>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-4 border-t border-gray-700 hover:bg-gray-700">
                        <i className={'fas fa-chevron-' + (sidebarOpen ? 'left' : 'right')}></i>
                    </button>
                </aside>
                <main className="flex-1 overflow-auto">
                    <header className="gradient-bg py-8 px-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold">🍱 OpenHash 기반 국가 급식 자동화 시스템</h1>
                                    <p className="text-gray-300 mt-2">5천만 국민에게 5성급 호텔 수준의 맞춤형 도시락을 제공합니다</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <a href="/" className="bg-gray-700/50 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm"><i className="fas fa-arrow-left mr-2"></i>포털</a>
                                    <button onClick={() => setShowOpenHashModal(true)} className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 px-4 py-2 rounded-lg flex items-center">
                                        <i className="fas fa-shield-alt text-cyan-400 mr-2"></i><span className="text-cyan-400 text-sm">무오류 급식 데이터</span><span className="w-2 h-2 bg-green-400 rounded-full ml-2 pulse-dot"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="max-w-7xl mx-auto p-6">{renderPage()}</div>
                </main>
            </div>
            <FloatingFeaturePanel />
            <OpenHashModal isOpen={showOpenHashModal} onClose={() => setShowOpenHashModal(false)} />
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
