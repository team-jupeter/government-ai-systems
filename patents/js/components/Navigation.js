// Navigation 컴포넌트 - 특허청 스타일 좌측 사이드바
const Navigation = ({ 
    menuStructure, 
    currentMenu, 
    currentSubmenu, 
    expandedMenus, 
    onMenuChange, 
    onToggleExpand 
}) => {
    return (
        <nav className="fixed left-0 top-[140px] bottom-0 w-64 kipo-sidebar overflow-y-auto z-40">
            {/* 사용자 정보 */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        AI
                    </div>
                    <div>
                        <div className="font-medium text-gray-800">AI 출원 대리인</div>
                        <div className="text-xs text-gray-500">Claude 기반 자동화</div>
                    </div>
                </div>
            </div>
            
            {/* 메뉴 목록 */}
            <div className="py-2">
                {menuStructure.map(menu => (
                    <div key={menu.id}>
                        {/* 메인 메뉴 아이템 */}
                        <div 
                            className={`sidebar-menu-item flex items-center justify-between ${
                                currentMenu === menu.id && !currentSubmenu ? 'active' : ''
                            }`}
                            onClick={() => {
                                if (menu.submenu) {
                                    onToggleExpand(menu.id);
                                } else {
                                    onMenuChange(menu.id);
                                }
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <i className={`fas ${menu.icon} text-gray-500 w-5`}></i>
                                <span className="text-gray-700">{menu.label}</span>
                            </div>
                            {menu.submenu && (
                                <i className={`fas fa-chevron-${expandedMenus.includes(menu.id) ? 'down' : 'right'} text-xs text-gray-400`}></i>
                            )}
                        </div>
                        
                        {/* 서브메뉴 */}
                        {menu.submenu && expandedMenus.includes(menu.id) && (
                            <div className="sidebar-submenu">
                                {menu.submenu.map(sub => (
                                    <div 
                                        key={sub.id}
                                        className={`sidebar-submenu-item flex items-center gap-2 ${
                                            currentSubmenu === sub.id ? 'active' : ''
                                        }`}
                                        onClick={() => onMenuChange(menu.id, sub.id)}
                                    >
                                        <span>{sub.icon}</span>
                                        <span>{sub.label}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            {/* 하단 정보 */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
                <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex items-center gap-2">
                        <i className="fas fa-circle text-green-500 text-xs"></i>
                        <span>AI 엔진 가동 중</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="fas fa-database text-blue-500 text-xs"></i>
                        <span>52,847,293건 DB 연동</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="fas fa-globe text-purple-500 text-xs"></i>
                        <span>KR/US/EU/CN/JP 연동</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};
