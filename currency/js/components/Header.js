// 헤더 컴포넌트
const Header = () => {
    return (
        <header className="bg-gov-blue text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                            <i className="fas fa-coins text-gov-blue text-3xl"></i>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">
                                FPGA 및 AI 기반 통합 디지털 화폐 시스템
                            </h1>
                            <p className="text-blue-200 text-sm mt-1">
                                Ultra-High Speed and Low Power Integrated Digital Currency System
                            </p>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        <div className="text-right">
                            <div className="text-xs text-blue-200">처리 속도</div>
                            <div className="text-xl font-bold">0.015ms</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-blue-200">검증 정확도</div>
                            <div className="text-xl font-bold">99.4%</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-blue-200">전력 절감</div>
                            <div className="text-xl font-bold">88.6%</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

window.Header = Header;
