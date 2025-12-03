// AI 전자출원 시스템 - 메인 앱
const { useState, useEffect, useCallback } = React;

// API 베이스 URL
const API_BASE = '/api/patents';

// 메뉴 구조 정의
const MENU_STRUCTURE = [
    { id: 'dashboard', icon: 'fa-home', label: '대시보드', component: 'Dashboard' },
    { 
        id: 'application', 
        icon: 'fa-file-alt', 
        label: '출원하기',
        submenu: [
            { id: 'patent', label: '특허 (발명)', icon: '💡' },
            { id: 'utility', label: '실용신안', icon: '🔧' },
            { id: 'design', label: '디자인', icon: '🎨' },
            { id: 'trademark', label: '상표', icon: '™️' }
        ]
    },
    { id: 'ai-consultation', icon: 'fa-robot', label: 'AI 상담', component: 'AIConsultation' },
    { 
        id: 'research', 
        icon: 'fa-search', 
        label: '조사·분석',
        submenu: [
            { id: 'prior-art', label: '선행기술 조사', icon: '🔍' },
            { id: 'probability', label: '등록 가능성 예측', icon: '📊' },
            { id: 'global-cases', label: '국제 사례 검색', icon: '🌐' }
        ]
    },
    { 
        id: 'business', 
        icon: 'fa-chart-line', 
        label: '시장·사업화',
        submenu: [
            { id: 'market-analysis', label: '시장 규모 분석', icon: '📈' },
            { id: 'business-support', label: '사업화 지원', icon: '🏢' }
        ]
    },
    { id: 'openhash-timestamp', icon: 'fa-link', label: '우선권 증명', component: 'OpenHashTimestamp' },
    { 
        id: 'management', 
        icon: 'fa-folder', 
        label: '내 출원',
        submenu: [
            { id: 'my-applications', label: '출원 목록', icon: '📋' },
            { id: 'fee-payment', label: '수수료 납부', icon: '💳' }
        ]
    },
    { id: 'legislation', icon: 'fa-gavel', label: '제도개선', component: 'LegislationProposal' }
];

// IP 유형 정보
const IP_TYPES = {
    patent: { name: '특허 (발명)', icon: '💡', duration: '출원일로부터 20년', color: 'blue' },
    utility: { name: '실용신안', icon: '🔧', duration: '출원일로부터 10년', color: 'green' },
    design: { name: '디자인', icon: '🎨', duration: '설정등록일로부터 20년', color: 'purple' },
    trademark: { name: '상표', icon: '™️', duration: '10년 (갱신 가능)', color: 'orange' }
};

// 메인 앱 컴포넌트
const App = () => {
    const [currentMenu, setCurrentMenu] = useState('dashboard');
    const [currentSubmenu, setCurrentSubmenu] = useState(null);
    const [expandedMenus, setExpandedMenus] = useState(['application', 'research', 'business', 'management']);
    const [showExplainer, setShowExplainer] = useState(false);
    const [systemStatus, setSystemStatus] = useState({ online: true, lastUpdate: new Date() });
    const [notifications, setNotifications] = useState([]);

    // 메뉴 변경 핸들러
    const handleMenuChange = useCallback((menuId, submenuId = null) => {
        setCurrentMenu(menuId);
        setCurrentSubmenu(submenuId);
    }, []);

    // 메뉴 확장/축소 토글
    const toggleMenuExpand = useCallback((menuId) => {
        setExpandedMenus(prev => 
            prev.includes(menuId) 
                ? prev.filter(id => id !== menuId)
                : [...prev, menuId]
        );
    }, []);

    // 현재 컴포넌트 렌더링
    const renderCurrentComponent = () => {
        // 서브메뉴가 있는 경우
        if (currentSubmenu) {
            switch (currentSubmenu) {
                case 'patent':
                case 'utility':
                case 'design':
                case 'trademark':
                    return <PatentChatConsultation ipType={currentSubmenu} ipTypes={IP_TYPES} />;
                case 'prior-art':
                    return <PriorArtSearch />;
                case 'probability':
                    return <RegistrationProbability />;
                case 'global-cases':
                    return <GlobalCaseSearch />;
                case 'market-analysis':
                    return <MarketAnalysis />;
                case 'business-support':
                    return <BusinessSupport />;
                case 'my-applications':
                    return <MyApplications />;
                case 'fee-payment':
                    return <FeePayment />;
                default:
                    return <Dashboard />;
            }
        }

        // 메인 메뉴
        switch (currentMenu) {
            case 'dashboard':
                return <Dashboard onNavigate={handleMenuChange} />;
            case 'ai-consultation':
                return <AIConsultation />;
            case 'openhash-timestamp':
                return <OpenHashTimestamp />;
            case 'legislation':
                return <LegislationProposal />;
            default:
                return <Dashboard onNavigate={handleMenuChange} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* 헤더 */}
            <Header systemStatus={systemStatus} onNavigate={(menu) => { setCurrentMenu(menu); setCurrentSubmenu(null); }} />
            
            {/* 메인 레이아웃 */}
            <div className="flex">
                {/* 좌측 네비게이션 */}
                <Navigation 
                    menuStructure={MENU_STRUCTURE}
                    currentMenu={currentMenu}
                    currentSubmenu={currentSubmenu}
                    expandedMenus={expandedMenus}
                    onMenuChange={handleMenuChange}
                    onToggleExpand={toggleMenuExpand}
                />
                
                {/* 메인 콘텐츠 */}
                <main className="flex-1 p-6 ml-64">
                    <div className="max-w-7xl mx-auto">
                        {renderCurrentComponent()}
                    </div>
                </main>
            </div>
            
            {/* 플로팅 설명 버튼 */}
            <FloatingExplainer 
                isOpen={showExplainer} 
                onToggle={() => setShowExplainer(!showExplainer)} 
            />
        </div>
    );
};

// 앱 렌더링
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
