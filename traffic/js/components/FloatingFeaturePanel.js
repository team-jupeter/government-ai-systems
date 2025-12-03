const FloatingFeaturePanel = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [systemStatus, setSystemStatus] = React.useState({
        vehicles: 2847523,
        requests: 15234,
        safety: 100,
        uptime: 99.99
    });

    // 실시간 갱신
    React.useEffect(() => {
        const interval = setInterval(() => {
            setSystemStatus({
                vehicles: 2800000 + Math.floor(Math.random() * 100000),
                requests: 10000 + Math.floor(Math.random() * 10000),
                safety: 100,
                uptime: 99.99
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <React.Fragment>
            {/* 플로팅 버튼 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 left-6 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg flex items-center justify-center hover:from-indigo-500 hover:to-purple-500 transition z-40"
            >
                <i className={`fas ${isOpen ? 'fa-times' : 'fa-chart-line'} text-xl`}></i>
            </button>

            {/* 패널 */}
            {isOpen && (
                <div className="fixed bottom-24 left-6 w-72 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 z-40 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
                        <h3 className="font-bold">실시간 시스템 현황</h3>
                        <p className="text-sm text-indigo-200">사회적 자율주행 관제</p>
                    </div>
                    
                    <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">운행 차량</span>
                            <span className="font-bold text-indigo-400">{systemStatus.vehicles.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">실시간 요청</span>
                            <span className="font-bold text-green-400">{systemStatus.requests.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">안전 지수</span>
                            <span className="font-bold text-cyan-400">{systemStatus.safety}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">시스템 가동률</span>
                            <span className="font-bold text-purple-400">{systemStatus.uptime}%</span>
                        </div>

                        <div className="pt-4 border-t border-gray-700">
                            <div className="flex items-center gap-2 text-green-400 text-sm">
                                <span className="w-2 h-2 bg-green-400 rounded-full pulse-dot"></span>
                                <span>모든 시스템 정상</span>
                            </div>
                        </div>

                        <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-xs text-indigo-400">
                                <i className="fas fa-shield-alt"></i>
                                <span>OpenHash 검증 활성</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 플로팅 AI 채팅 */}
            <FloatingAssistant />
        </React.Fragment>
    );
};
