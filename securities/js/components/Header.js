function Header() {
    return (
        <header className="bg-white shadow-md">
            {/* Top Bar */}
            <div className="bg-sec-blue text-white py-2">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-2">
                            <i className="fas fa-building"></i>
                            오픈해시 통합 금융 플랫폼
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="http://100.30.14.224/portal/systems.html" className="hover:text-sec-gold transition-colors">
                            <i className="fas fa-home mr-1"></i>
                            전체 시스템
                        </a>
                        <a href="http://100.30.14.224/bank/" className="hover:text-sec-gold transition-colors">
                            <i className="fas fa-university mr-1"></i>
                            은행 시스템
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-sec-blue to-sec-blue-light rounded-lg flex items-center justify-center">
                            <i className="fas fa-chart-line text-white text-2xl"></i>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">오픈해시 자율 증권 시스템</h1>
                            <p className="text-sm text-gray-600">OpenHash × DeepSeek R1</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <div className="text-xs text-gray-500">시스템 상태</div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="text-sm font-semibold text-green-600">정상 가동</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

window.Header = Header;
