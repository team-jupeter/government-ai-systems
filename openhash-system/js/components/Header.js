const Header = () => {
    return (
        <header className="bg-white border-b-4 border-gov-blue shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* 로고 영역 */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gov-blue rounded flex items-center justify-center">
                            <i className="fas fa-link text-white text-xl"></i>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gov-blue">오픈해시(OpenHash)</h1>
                            <p className="text-xs text-gov-text-secondary">차세대 분산 신뢰 기술</p>
                        </div>
                    </div>

                    {/* 주요 지표 */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className="text-center px-4 py-2 bg-gov-gray rounded">
                            <div className="text-lg font-bold text-gov-blue">98.5%</div>
                            <div className="text-xs text-gov-text-secondary">에너지 절감</div>
                        </div>
                        <div className="text-center px-4 py-2 bg-gov-gray rounded">
                            <div className="text-lg font-bold text-gov-blue">424만+</div>
                            <div className="text-xs text-gov-text-secondary">TPS</div>
                        </div>
                        <div className="text-center px-4 py-2 bg-gov-gray rounded">
                            <div className="text-lg font-bold text-gov-blue">4계층</div>
                            <div className="text-xs text-gov-text-secondary">아키텍처</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
