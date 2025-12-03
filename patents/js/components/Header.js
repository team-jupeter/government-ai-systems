// Header 컴포넌트 - 오픈해시 배너 포함
const Header = ({ systemStatus, onNavigate }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* 오픈해시 설명서 배너 */}
            <a 
                href="http://100.30.14.224/openhash.html" 
                target="_blank"
                className="block openhash-banner py-2 px-4 text-center hover:opacity-90 transition"
            >
                <div className="flex items-center justify-center gap-3">
                    <span className="text-yellow-400 font-bold">⛓️ 오픈해시 설명서</span>
                    <span className="text-gray-300 text-sm">|</span>
                    <span className="text-gray-300 text-sm">블록체인 대비 98.5% 에너지 절감, 선출원 우선권 증명의 새로운 표준</span>
                    <span className="text-yellow-400 text-sm">→ 자세히 보기</span>
                </div>
            </a>
            
            {/* 메인 헤더 */}
            <div className="kipo-header py-4 px-6 shadow-lg">
                <div className="max-w-full mx-auto flex items-center justify-between">
                    {/* 로고 영역 */}
                    <div className="flex items-center gap-4">
                        <a href="/" className="flex items-center gap-2 text-white hover:opacity-80 transition">
                            <i className="fas fa-arrow-left"></i>
                            <span className="text-sm">포털</span>
                        </a>
                        <div className="w-px h-8 bg-white/30"></div>
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
                            <div className="text-4xl">💡</div>
                            <div>
                                <h1 className="text-xl font-bold text-white cursor-pointer hover:text-yellow-300 transition">AI 전자출원 시스템</h1>
                                <p className="text-xs text-blue-200 cursor-pointer hover:text-yellow-300 transition">오픈해시 기반 지식재산권 통합 플랫폼</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* 중앙 상태 표시 */}
                    <div className="flex items-center gap-6">
                        <div className="openhash-badge px-4 py-2 rounded-full flex items-center gap-2">
                            <span className="text-yellow-400">⛓️</span>
                            <span className="text-white text-sm font-medium">OpenHash Powered</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                            <i className={`fas fa-circle text-xs ${systemStatus?.online ? 'text-green-400' : 'text-red-400'}`}></i>
                            <span>{systemStatus?.online ? '시스템 정상' : '점검 중'}</span>
                        </div>
                    </div>
                    
                    {/* 우측 메뉴 */}
                    <div className="flex items-center gap-4">
                        <div className="text-right text-white/80 text-sm">
                            <div>{currentTime.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</div>
                            <div className="text-xs">{currentTime.toLocaleTimeString('ko-KR')}</div>
                        </div>
                        <div className="w-px h-8 bg-white/30"></div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition">
                                <i className="fas fa-bell"></i>
                            </button>
                            <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition">
                                <i className="fas fa-user-circle text-xl"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* 퀵 액션 바 */}
            <div className="kipo-nav py-2 px-6">
                <div className="max-w-full mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-400">빠른 메뉴:</span>
                        <button className="text-blue-300 hover:text-white transition flex items-center gap-1">
                            <span>💡</span> 특허출원
                        </button>
                        <button className="text-blue-300 hover:text-white transition flex items-center gap-1">
                            <span>🔍</span> 선행기술조사
                        </button>
                        <button className="text-blue-300 hover:text-white transition flex items-center gap-1">
                            <span>⛓️</span> 우선권증명
                        </button>
                        <button className="text-blue-300 hover:text-white transition flex items-center gap-1">
                            <span>📈</span> 시장분석
                        </button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>DB: 5,200만 건</span>
                        <span>|</span>
                        <span>AI 분석: 0.3초</span>
                        <span>|</span>
                        <span>정확도: 95%</span>
                    </div>
                </div>
            </div>
        </header>
    );
};
