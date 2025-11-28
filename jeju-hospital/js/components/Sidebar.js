const Sidebar = ({ currentPage, onNavigate }) => {
    const menuItems = [
        { id: 'dashboard', icon: 'fa-home', label: '대시보드' },
        { id: 'medical-status', icon: 'fa-chart-line', label: '의료 현황', badge: 'LIVE' },
        { id: 'smartwatch', icon: 'fa-watch', label: '생체감지 워치', badge: 'NEW' },
        { id: 'ai-doctor', icon: 'fa-user-md', label: 'AI 의사 상담' },
        { id: 'ai-nurse', icon: 'fa-user-nurse', label: 'AI 간호사' },
        { id: 'vital', icon: 'fa-heartbeat', label: '생체 모니터' },
        { id: 'pdv', icon: 'fa-shield-alt', label: '개인정보금고' },
        { id: 'appointment', icon: 'fa-calendar-check', label: '진료 예약' },
        { id: 'hospitals', icon: 'fa-hospital', label: '병원 정보' }
    ];
    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gray-800 border-r border-gray-700 z-50">
            <div className="p-4 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <i className="fas fa-hospital text-blue-400 text-xl"></i>
                    </div>
                    <div>
                        <p className="font-bold text-sm">제주 의료 AI</p>
                        <p className="text-xs text-gray-400">v3.0 OpenHash</p>
                    </div>
                </div>
            </div>
            <nav className="p-3 space-y-1">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all nav-item ${currentPage === item.id ? 'active bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-white'}`}
                    >
                        <div className="flex items-center space-x-3">
                            <i className={`fas ${item.icon} w-5`}></i>
                            <span className="text-sm">{item.label}</span>
                        </div>
                        {item.badge && (
                            <span className={`px-2 py-0.5 text-xs rounded-full ${item.badge === 'LIVE' ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-cyan-500/20 text-cyan-400'}`}>
                                {item.badge}
                            </span>
                        )}
                    </button>
                ))}
            </nav>
            <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-lg p-3 border border-cyan-500/30">
                    <div className="flex items-center space-x-2 mb-2">
                        <i className="fas fa-link text-cyan-400 text-sm"></i>
                        <span className="text-xs text-cyan-400">OpenHash 연동</span>
                    </div>
                    <p className="text-xs text-gray-400">데이터 무결성 보장</p>
                </div>
            </div>
        </aside>
    );
};
