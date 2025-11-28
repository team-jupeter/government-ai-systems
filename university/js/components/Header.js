const Header = ({ studentId, onResetTour, onNavigate }) => {
    const [showDropdown, setShowDropdown] = React.useState(false);

    const handleLogoClick = () => {
        if (onNavigate) {
            onNavigate('dashboard');
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-gray-900 border-b border-gray-800 z-40">
            <div className="flex items-center justify-between h-full px-6">
                {/* 로고 - 클릭 시 대시보드로 이동 */}
                <button 
                    onClick={handleLogoClick}
                    className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                >
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
                        <span className="text-xl">🎓</span>
                    </div>
                    <div className="text-left">
                        <h1 className="font-bold text-lg">AI 통합대학</h1>
                        <p className="text-xs text-gray-500">Integrated AI University</p>
                    </div>
                </button>

                {/* 검색바 */}
                <div className="flex-1 max-w-xl mx-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="강좌, 교수, 주제 검색..."
                            className="w-full bg-gray-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                    </div>
                </div>

                {/* 우측 메뉴 */}
                <div className="flex items-center space-x-4">
                    <button className="relative p-2 text-gray-400 hover:text-white">
                        <i className="fas fa-bell text-lg"></i>
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center space-x-3 bg-gray-800 rounded-full py-1 pl-1 pr-4 hover:bg-gray-700"
                        >
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                                <i className="fas fa-user text-sm"></i>
                            </div>
                            <span className="text-sm font-medium">김학생</span>
                            <i className="fas fa-chevron-down text-xs text-gray-500"></i>
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-lg border border-gray-700 py-2">
                                <div className="px-4 py-2 border-b border-gray-700">
                                    <p className="font-medium">김학생</p>
                                    <p className="text-xs text-gray-500">{studentId}</p>
                                </div>
                                <button
                                    onClick={() => { onResetTour(); setShowDropdown(false); }}
                                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center space-x-2"
                                >
                                    <i className="fas fa-info-circle text-blue-400"></i>
                                    <span>시스템 소개 다시 보기</span>
                                </button>
                                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-700">
                                    <i className="fas fa-cog mr-2 text-gray-500"></i>설정
                                </a>
                                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-700">
                                    <i className="fas fa-question-circle mr-2 text-gray-500"></i>도움말
                                </a>
                                <div className="border-t border-gray-700 mt-2 pt-2">
                                    <a href="#" className="block px-4 py-2 text-sm text-red-400 hover:bg-gray-700">
                                        <i className="fas fa-sign-out-alt mr-2"></i>로그아웃
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
