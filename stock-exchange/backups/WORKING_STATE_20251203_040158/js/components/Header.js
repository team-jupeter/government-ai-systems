function Header() {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* 로고 */}
                    <div className="flex items-center gap-4">
                        <i className="fas fa-building-columns text-4xl text-exchange-blue"></i>
                        <div>
                            <h1 className="text-2xl font-bold text-exchange-blue">오픈해시 거래소</h1>
                            <p className="text-sm text-gray-600">OpenHash Stock Exchange</p>
                        </div>
                    </div>

                    {/* 네비게이션 */}
                    <nav className="hidden md:flex items-center gap-6">
                        <a href="/portal/systems.html" className="text-gray-700 hover:text-exchange-blue transition-colors font-medium">
                            <i className="fas fa-home mr-2"></i>포털
                        </a>
                        <a href="/bank/" className="text-gray-700 hover:text-exchange-blue transition-colors font-medium">
                            <i className="fas fa-building-columns mr-2"></i>은행
                        </a>
                        <a href="/securities/" className="text-gray-700 hover:text-exchange-blue transition-colors font-medium">
                            <i className="fas fa-chart-line mr-2"></i>증권사
                        </a>
                        <a href="/currency/" className="text-gray-700 hover:text-exchange-blue transition-colors font-medium">
                            <i className="fas fa-coins mr-2"></i>디지털화폐
                        </a>
                    </nav>

                    {/* 실시간 지표 */}
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-xs text-gray-500">실시간 체결속도</div>
                            <div className="text-lg font-bold text-exchange-blue">0.015ms</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

window.Header = Header;
