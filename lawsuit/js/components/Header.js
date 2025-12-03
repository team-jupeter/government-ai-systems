const Header = ({ currentUser, onReset }) => {
    const [systemStatus] = React.useState('정상');

    const handleLogoClick = () => {
        if (typeof onReset === 'function') {
            onReset();
        } else {
            window.location.reload();
        }
    };

    return (
        <header className="bg-white border-b shadow-sm">
            <div className="openhash-banner">
                <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
                    <a 
                        href="http://100.30.14.224/openhash-system/" 
                        target="_blank"
                        className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition font-medium"
                    >
                        <span className="text-lg">🔗</span>
                        <span>오픈해시 기술 설명서</span>
                        <i className="fas fa-external-link-alt text-xs ml-1"></i>
                    </a>
                    <div className="flex items-center gap-6 text-sm text-gray-200">
                        <span><i className="fas fa-file-alt mr-1 text-yellow-400"></i>소장 작성 <strong className="text-white">5.2분</strong></span>
                        <span><i className="fas fa-percentage mr-1 text-green-400"></i>비용 절감 <strong className="text-white">90%</strong></span>
                        <span><i className="fas fa-clock mr-1 text-blue-400"></i>증거 수집 <strong className="text-white">15초</strong></span>
                        <span><i className="fas fa-chart-line mr-1 text-purple-400"></i>승소율 <strong className="text-white">86.2%</strong></span>
                        <span><i className="fas fa-globe mr-1 text-cyan-400"></i>글로벌 <strong className="text-white">8개국</strong></span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div 
                        className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition"
                        onClick={handleLogoClick}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                                <i className="fas fa-balance-scale text-white text-xl"></i>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-800">AI 전자소송 시스템</h1>
                                <p className="text-sm text-gray-500">국가데이터처 통합 오픈해시 기반</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${systemStatus === '정상' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            <span className="text-sm text-gray-600">시스템 {systemStatus}</span>
                        </div>

                        <div className="flex items-center gap-3 pl-6 border-l">
                            <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                                <i className="fas fa-user text-blue-600"></i>
                            </div>
                            <div>
                                <p className="text-sm font-medium">{currentUser?.name || '사용자'}</p>
                                <p className="text-xs text-gray-500">{currentUser?.role || '일반'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
