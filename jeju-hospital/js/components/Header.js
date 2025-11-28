const Header = ({ patientId, onNavigate }) => {
    const [currentTime, setCurrentTime] = React.useState(new Date());
    
    React.useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="fixed top-0 left-64 right-0 h-16 bg-gray-800 border-b border-gray-700 z-40 flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
                <div>
                    <h1 className="text-lg font-bold flex items-center">
                        <i className="fas fa-link text-cyan-400 mr-2"></i>
                        <span className="text-cyan-400">OpenHash</span>
                        <span className="text-white ml-2">기반 의료 자동화 시스템</span>
                    </h1>
                    <p className="text-xs text-gray-400">제주특별자치도 권역 통합 의료 플랫폼 · 데이터 진실성 보장</p>
                </div>
            </div>
            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                    <i className="fas fa-link text-cyan-400 text-sm"></i>
                    <span className="text-xs text-cyan-400">OpenHash 검증됨</span>
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                </div>
                <div className="text-right">
                    <p className="text-sm font-mono">{currentTime.toLocaleTimeString('ko-KR')}</p>
                    <p className="text-xs text-gray-400">{currentTime.toLocaleDateString('ko-KR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="flex items-center space-x-3 pl-4 border-l border-gray-700">
                    <div className="text-right">
                        <p className="text-sm">{patientId}</p>
                        <p className="text-xs text-gray-400">환자 ID</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <i className="fas fa-user text-blue-400"></i>
                    </div>
                </div>
            </div>
        </header>
    );
};
