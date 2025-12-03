const OpenHashModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = React.useState('overview');
    const [animationStep, setAnimationStep] = React.useState(0);
    const [liveData, setLiveData] = React.useState({
        layer1Transactions: 847293,
        layer2Transactions: 42891,
        layer3Transactions: 8234,
        layer4Transactions: 412,
        verifiedVehicles: 2847523,
        blockedAttempts: 0,
        integrityScore: 100
    });

    // 애니메이션 및 실시간 데이터 갱신
    React.useEffect(() => {
        if (!isOpen) return;
        
        const animInterval = setInterval(() => {
            setAnimationStep(prev => (prev + 1) % 8);
        }, 1500);

        const dataInterval = setInterval(() => {
            setLiveData(prev => ({
                layer1Transactions: prev.layer1Transactions + Math.floor(Math.random() * 1000),
                layer2Transactions: prev.layer2Transactions + Math.floor(Math.random() * 50),
                layer3Transactions: prev.layer3Transactions + Math.floor(Math.random() * 10),
                layer4Transactions: prev.layer4Transactions + Math.floor(Math.random() * 2),
                verifiedVehicles: 2800000 + Math.floor(Math.random() * 100000),
                blockedAttempts: prev.blockedAttempts,
                integrityScore: 100
            }));
        }, 3000);

        return () => {
            clearInterval(animInterval);
            clearInterval(dataInterval);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const tabs = [
        { id: 'overview', name: '개요', icon: 'fa-info-circle' },
        { id: 'layers', name: '4계층 구조', icon: 'fa-layer-group' },
        { id: 'dataflow', name: '데이터 흐름', icon: 'fa-stream' },
        { id: 'verification', name: '검증 프로세스', icon: 'fa-shield-alt' },
        { id: 'protection', name: '위변조 방지', icon: 'fa-lock' }
    ];

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-gray-900 rounded-2xl max-w-6xl w-full border border-indigo-500/30 my-8 max-h-[90vh] overflow-hidden flex flex-col">
                {/* 헤더 */}
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                                <i className="fas fa-shield-alt text-2xl"></i>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">🚗 무오류 교통 데이터</h2>
                                <p className="text-indigo-200 text-sm">OpenHash 4계층 데이터 무결성 보장 시스템</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>

                {/* 탭 네비게이션 */}
                <div className="flex border-b border-gray-700 px-6 flex-shrink-0 overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition whitespace-nowrap ${
                                activeTab === tab.id
                                    ? 'border-indigo-500 text-indigo-400'
                                    : 'border-transparent text-gray-400 hover:text-gray-300'
                            }`}
                        >
                            <i className={`fas ${tab.icon}`}></i>
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* 콘텐츠 영역 */}
                <div className="flex-1 overflow-y-auto p-6">
                    
                    {/* 개요 탭 */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* 실시간 현황 */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gradient-to-br from-indigo-600/20 to-indigo-800/20 border border-indigo-500/30 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-indigo-400">{liveData.verifiedVehicles.toLocaleString()}</div>
                                    <div className="text-sm text-gray-400">검증된 차량</div>
                                    <div className="flex items-center justify-center gap-1 mt-1 text-xs text-green-400">
                                        <span className="w-2 h-2 bg-green-400 rounded-full pulse-dot"></span>
                                        실시간
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-green-400">{liveData.integrityScore}%</div>
                                    <div className="text-sm text-gray-400">데이터 무결성</div>
                                    <div className="text-xs text-green-400 mt-1">완벽한 상태</div>
                                </div>
                                <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-purple-400">{(liveData.layer1Transactions / 1000).toFixed(0)}K</div>
                                    <div className="text-sm text-gray-400">초당 트랜잭션</div>
                                    <div className="text-xs text-purple-400 mt-1">4계층 통합</div>
                                </div>
                                <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 border border-red-500/30 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-red-400">{liveData.blockedAttempts}</div>
                                    <div className="text-sm text-gray-400">위변조 시도 차단</div>
                                    <div className="text-xs text-red-400 mt-1">오늘 기준</div>
                                </div>
                            </div>

                            {/* 핵심 개념 */}
                            <div className="bg-gray-800/50 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-indigo-400 mb-4">
                                    <i className="fas fa-question-circle mr-2"></i>
                                    왜 데이터 진실성이 생명인가?
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4">
                                            <h4 className="font-bold text-red-400 mb-2">❌ 허위 데이터의 치명적 위험</h4>
                                            <div className="space-y-2 text-sm text-gray-400">
                                                <div className="flex items-start gap-2">
                                                    <span className="text-red-400">•</span>
                                                    <span><strong>잘못된 속도 정보</strong> → 시속 60km를 30km로 조작 → 후방 차량 추돌</span>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <span className="text-red-400">•</span>
                                                    <span><strong>허위 위치 데이터</strong> → 교차로 진입 시점 오류 → 측면 충돌</span>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <span className="text-red-400">•</span>
                                                    <span><strong>조작된 방향 정보</strong> → 경로 계산 오류 → 역주행 사고</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4">
                                            <h4 className="font-bold text-green-400 mb-2">✅ OpenHash의 보장</h4>
                                            <div className="space-y-2 text-sm text-gray-400">
                                                <div className="flex items-start gap-2">
                                                    <span className="text-green-400">•</span>
                                                    <span><strong>출처 증명</strong> → 모든 데이터의 생성 차량/장치 확인</span>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <span className="text-green-400">•</span>
                                                    <span><strong>전송 중 변조 감지</strong> → 1비트라도 변경 시 즉시 탐지</span>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <span className="text-green-400">•</span>
                                                    <span><strong>시간 순서 보장</strong> → 데이터 조작을 위한 시간 왜곡 불가</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 데이터 생성 주체 */}
                            <div className="bg-gray-800/50 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-cyan-400 mb-4">
                                    <i className="fas fa-database mr-2"></i>
                                    데이터 생성 주체
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg p-4">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="text-3xl">🚗</div>
                                            <div>
                                                <div className="font-bold">차량 탑재 장치</div>
                                                <div className="text-sm text-gray-400">300만대 자율주행 차량</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div className="bg-gray-800/50 rounded p-2">📍 GPS 위치</div>
                                            <div className="bg-gray-800/50 rounded p-2">⚡ 실시간 속도</div>
                                            <div className="bg-gray-800/50 rounded p-2">🧭 주행 방향</div>
                                            <div className="bg-gray-800/50 rounded p-2">🔋 배터리 상태</div>
                                            <div className="bg-gray-800/50 rounded p-2">👥 탑승 인원</div>
                                            <div className="bg-gray-800/50 rounded p-2">📦 적재 화물</div>
                                        </div>
                                    </div>
                                    <div className="bg-cyan-900/30 border border-cyan-500/30 rounded-lg p-4">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="text-3xl">🛣️</div>
                                            <div>
                                                <div className="font-bold">도로 인프라 장치</div>
                                                <div className="text-sm text-gray-400">주행보조장치 (UWB)</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div className="bg-gray-800/50 rounded p-2">📡 UWB 위치측정</div>
                                            <div className="bg-gray-800/50 rounded p-2">🛰️ RTK-GNSS 보정</div>
                                            <div className="bg-gray-800/50 rounded p-2">📷 카메라 인식</div>
                                            <div className="bg-gray-800/50 rounded p-2">🌡️ 도로 상태</div>
                                            <div className="bg-gray-800/50 rounded p-2">☀️ 태양광 발전량</div>
                                            <div className="bg-gray-800/50 rounded p-2">🚦 신호 상태</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 4계층 구조 탭 */}
                    {activeTab === 'layers' && (
                        <div className="space-y-6">
                            {/* 4계층 시각화 */}
                            <div className="bg-gray-800/50 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-indigo-400 mb-6 text-center">
                                    <i className="fas fa-layer-group mr-2"></i>
                                    OpenHash 적응형 4계층 구조
                                </h3>
                                
                                <div className="relative">
                                    {/* 계층 피라미드 */}
                                    <div className="flex flex-col items-center space-y-3">
                                        {/* Layer 4 - 국가 */}
                                        <div className={`w-32 transition-all duration-500 ${animationStep === 3 ? 'scale-110' : ''}`}>
                                            <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-3 text-center border-2 border-red-400">
                                                <div className="text-xs text-red-200">Layer 4</div>
                                                <div className="font-bold">국가</div>
                                                <div className="text-xs text-red-300">{liveData.layer4Transactions.toLocaleString()} tx</div>
                                            </div>
                                        </div>
                                        
                                        {/* Layer 3 - 광역 */}
                                        <div className={`w-48 transition-all duration-500 ${animationStep === 2 ? 'scale-110' : ''}`}>
                                            <div className="bg-gradient-to-r from-orange-600 to-orange-800 rounded-lg p-3 text-center border-2 border-orange-400">
                                                <div className="text-xs text-orange-200">Layer 3</div>
                                                <div className="font-bold">광역 (17개 시도)</div>
                                                <div className="text-xs text-orange-300">{liveData.layer3Transactions.toLocaleString()} tx</div>
                                            </div>
                                        </div>
                                        
                                        {/* Layer 2 - 시군구 */}
                                        <div className={`w-64 transition-all duration-500 ${animationStep === 1 ? 'scale-110' : ''}`}>
                                            <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-lg p-3 text-center border-2 border-yellow-400">
                                                <div className="text-xs text-yellow-200">Layer 2</div>
                                                <div className="font-bold">시군구 (226개)</div>
                                                <div className="text-xs text-yellow-300">{liveData.layer2Transactions.toLocaleString()} tx</div>
                                            </div>
                                        </div>
                                        
                                        {/* Layer 1 - 구/동 */}
                                        <div className={`w-80 transition-all duration-500 ${animationStep === 0 ? 'scale-110' : ''}`}>
                                            <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-3 text-center border-2 border-green-400">
                                                <div className="text-xs text-green-200">Layer 1</div>
                                                <div className="font-bold">구/동 (3,500개+)</div>
                                                <div className="text-xs text-green-300">{liveData.layer1Transactions.toLocaleString()} tx</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 연결선 애니메이션 */}
                                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-yellow-500 to-green-500 opacity-30 -translate-x-1/2"></div>
                                </div>
                            </div>

                            {/* 각 계층 상세 설명 */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center font-bold">1</span>
                                        <div>
                                            <div className="font-bold text-green-400">제1계층 노드 (구/동)</div>
                                            <div className="text-xs text-gray-400">전체 트랜잭션의 95% 처리</div>
                                        </div>
                                    </div>
                                    <ul className="text-sm text-gray-400 space-y-1">
                                        <li>• 개별 차량의 실시간 위치/속도/방향 데이터</li>
                                        <li>• 도로 구간별 주행보조장치 데이터</li>
                                        <li>• 가장 높은 처리 빈도, 가장 낮은 보안 수준</li>
                                    </ul>
                                </div>
                                
                                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center font-bold text-black">2</span>
                                        <div>
                                            <div className="font-bold text-yellow-400">제2계층 노드 (시군구)</div>
                                            <div className="text-xs text-gray-400">전체 트랜잭션의 4% 처리</div>
                                        </div>
                                    </div>
                                    <ul className="text-sm text-gray-400 space-y-1">
                                        <li>• 주요 교차로 집계 데이터</li>
                                        <li>• 시군구 전체 교통 흐름 데이터</li>
                                        <li>• 중간 처리 빈도, 중간 보안 수준</li>
                                    </ul>
                                </div>
                                
                                <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-bold">3</span>
                                        <div>
                                            <div className="font-bold text-orange-400">제3계층 노드 (광역)</div>
                                            <div className="text-xs text-gray-400">전체 트랜잭션의 0.9% 처리</div>
                                        </div>
                                    </div>
                                    <ul className="text-sm text-gray-400 space-y-1">
                                        <li>• 광역 교통 통계 데이터</li>
                                        <li>• 도시 간 이동 차량 데이터</li>
                                        <li>• 낮은 처리 빈도, 높은 보안 수준</li>
                                    </ul>
                                </div>
                                
                                <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center font-bold">4</span>
                                        <div>
                                            <div className="font-bold text-red-400">제4계층 노드 (국가)</div>
                                            <div className="text-xs text-gray-400">전체 트랜잭션의 0.1% 처리</div>
                                        </div>
                                    </div>
                                    <ul className="text-sm text-gray-400 space-y-1">
                                        <li>• 국가 교통 통계 및 정책 데이터</li>
                                        <li>• 교통 사고/사건 공식 기록</li>
                                        <li>• 가장 낮은 처리 빈도, 최고 보안 수준</li>
                                    </ul>
                                </div>
                            </div>

                            {/* 확률적 계층 선택 */}
                            <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-6">
                                <h4 className="font-bold text-indigo-400 mb-4">
                                    <i className="fas fa-random mr-2"></i>
                                    확률적 계층 선택 알고리즘
                                </h4>
                                <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
                                    <div className="text-gray-400">// 차량 데이터 기록 시</div>
                                    <div className="text-cyan-400">hash = SHA3(차량ID + 타임스탬프 + 지역코드)</div>
                                    <div className="text-yellow-400">random = hash[0:4] / 0xFFFFFFFF</div>
                                    <div className="text-green-400 mt-2">if (random {"<"} 0.95) → Layer 1 (95%)</div>
                                    <div className="text-yellow-400">else if (random {"<"} 0.99) → Layer 2 (4%)</div>
                                    <div className="text-orange-400">else if (random {"<"} 0.999) → Layer 3 (0.9%)</div>
                                    <div className="text-red-400">else → Layer 4 (0.1%)</div>
                                </div>
                                <p className="text-sm text-gray-400 mt-3">
                                    <i className="fas fa-info-circle text-indigo-400 mr-1"></i>
                                    암호학적 해시 기반 난수 생성으로 특정 계층 집중 공격 방지
                                </p>
                            </div>
                        </div>
                    )}

                    {/* 데이터 흐름 탭 */}
                    {activeTab === 'dataflow' && (
                        <div className="space-y-6">
                            {/* 차량 데이터 흐름 애니메이션 */}
                            <div className="bg-gray-800/50 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-cyan-400 mb-6 text-center">
                                    <i className="fas fa-stream mr-2"></i>
                                    차량 → 도로 → 오픈해시 데이터 흐름
                                </h3>

                                <div className="relative bg-gray-900 rounded-xl p-6 overflow-hidden">
                                    {/* 도로 배경 */}
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full h-16 bg-gray-700 flex items-center justify-center">
                                            <div className="w-full h-1 bg-yellow-500 opacity-50"></div>
                                        </div>
                                    </div>

                                    {/* 데이터 흐름 시각화 */}
                                    <div className="relative z-10 flex items-center justify-between">
                                        {/* 차량 */}
                                        <div className={`flex flex-col items-center transition-transform duration-500 ${animationStep % 2 === 0 ? 'translate-x-2' : ''}`}>
                                            <div className="text-5xl driving">🚗</div>
                                            <div className="bg-indigo-600 rounded-lg p-2 mt-2 text-xs">
                                                <div>AV-SEL-00142</div>
                                                <div className="text-indigo-300">위치: 37.5012, 127.0396</div>
                                                <div className="text-indigo-300">속도: 62 km/h</div>
                                            </div>
                                        </div>

                                        {/* 화살표 1 */}
                                        <div className="flex flex-col items-center">
                                            <div className={`text-2xl transition-opacity duration-500 ${animationStep % 4 < 2 ? 'opacity-100 text-cyan-400' : 'opacity-30'}`}>
                                                →→→
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1">UWB 통신</div>
                                        </div>

                                        {/* 주행보조장치 */}
                                        <div className="flex flex-col items-center">
                                            <div className={`text-4xl ${animationStep % 4 === 1 ? 'text-cyan-400' : ''}`}>📡</div>
                                            <div className="bg-cyan-600 rounded-lg p-2 mt-2 text-xs">
                                                <div>주행보조장치</div>
                                                <div className="text-cyan-300">UWB + RTK-GNSS</div>
                                                <div className="text-cyan-300">정밀도: ±2cm</div>
                                            </div>
                                        </div>

                                        {/* 화살표 2 */}
                                        <div className="flex flex-col items-center">
                                            <div className={`text-2xl transition-opacity duration-500 ${animationStep % 4 >= 2 ? 'opacity-100 text-purple-400' : 'opacity-30'}`}>
                                                →→→
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1">해시 전송</div>
                                        </div>

                                        {/* 오픈해시 네트워크 */}
                                        <div className="flex flex-col items-center">
                                            <div className={`text-4xl ${animationStep % 4 === 3 ? 'text-green-400' : ''}`}>🔗</div>
                                            <div className="bg-green-600 rounded-lg p-2 mt-2 text-xs">
                                                <div>OpenHash</div>
                                                <div className="text-green-300">Layer 1-4</div>
                                                <div className="text-green-300">무결성 100%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 삼중 위치 보정 */}
                            <div className="bg-gray-800/50 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-yellow-400 mb-4">
                                    <i className="fas fa-crosshairs mr-2"></i>
                                    삼중 위치 보정 메커니즘
                                </h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 text-center">
                                        <div className="text-3xl mb-2">📡</div>
                                        <div className="font-bold text-blue-400">UWB 위치측정</div>
                                        <div className="text-sm text-gray-400 mt-2">초광대역 무선 기술</div>
                                        <div className="text-xs text-blue-300 mt-1">정밀도: ±10cm</div>
                                        <div className="mt-2 bg-gray-800 rounded p-2 text-xs font-mono">
                                            hash_uwb = SHA3(uwb_data)
                                        </div>
                                    </div>
                                    <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4 text-center">
                                        <div className="text-3xl mb-2">🛰️</div>
                                        <div className="font-bold text-green-400">RTK-GNSS</div>
                                        <div className="text-sm text-gray-400 mt-2">실시간 이동측위</div>
                                        <div className="text-xs text-green-300 mt-1">정밀도: ±2cm</div>
                                        <div className="mt-2 bg-gray-800 rounded p-2 text-xs font-mono">
                                            hash_gnss = SHA3(gnss_data)
                                        </div>
                                    </div>
                                    <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4 text-center">
                                        <div className="text-3xl mb-2">📷</div>
                                        <div className="font-bold text-purple-400">카메라 인식</div>
                                        <div className="text-sm text-gray-400 mt-2">주행 표시선 인식</div>
                                        <div className="text-xs text-purple-300 mt-1">정밀도: ±5cm</div>
                                        <div className="mt-2 bg-gray-800 rounded p-2 text-xs font-mono">
                                            hash_cam = SHA3(cam_data)
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 bg-indigo-900/30 border border-indigo-500/30 rounded-lg p-4 text-center">
                                    <div className="font-bold text-indigo-400 mb-2">융합 위치 계산</div>
                                    <div className="font-mono text-sm bg-gray-800 rounded p-3">
                                        fusion_pos = weighted_avg(uwb, gnss, camera)<br/>
                                        <span className="text-green-400">final_hash = SHA3(fusion_pos + timestamp + vehicle_id)</span>
                                    </div>
                                    <div className="text-xs text-gray-400 mt-2">
                                        → 센티미터 단위 정밀 주행 + 모든 데이터 오픈해시 기록
                                    </div>
                                </div>
                            </div>

                            {/* 기록 데이터 구조 */}
                            <div className="bg-gray-800/50 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-green-400 mb-4">
                                    <i className="fas fa-file-alt mr-2"></i>
                                    차량 데이터 블록 구조
                                </h3>
                                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                                    <pre className="text-gray-300">
{`{
  "block_header": {
    "prev_hash": "0x3f2a8b1c...",     // 이전 블록 해시
    "timestamp": 1732903234789,       // 밀리초 단위 시간
    "layer": 1,                       // 기록 계층
    "node_id": "L1-SEL-GN-042"       // 노드 식별자
  },
  "vehicle_data": {
    "vehicle_id": "AV-SEL-00142",
    "position_hash": "0x7d4e...",     // 위치 좌표 해시
    "velocity_hash": "0x9a2f...",     // 속도/방향 해시
    "status_hash": "0x1b8c...",       // 배터리/탑승 해시
    "sensor_hash": "0x4e7d..."        // 센서 데이터 해시
  },
  "signature": "0x2c9f8a...",         // ECDSA 디지털 서명
  "trust_score": 99.97                // 신뢰도 점수
}`}
                                    </pre>
                                </div>
                                <p className="text-xs text-gray-400 mt-3">
                                    <i className="fas fa-shield-alt text-green-400 mr-1"></i>
                                    원본 데이터는 차량 블랙박스에만 저장, 오픈해시에는 해시값만 기록
                                </p>
                            </div>
                        </div>
                    )}

                    {/* 검증 프로세스 탭 */}
                    {activeTab === 'verification' && (
                        <div className="space-y-6">
                            {/* 6단계 검증 프로세스 */}
                            <div className="bg-gray-800/50 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-purple-400 mb-6 text-center">
                                    <i className="fas fa-tasks mr-2"></i>
                                    6단계 데이터 검증 프로세스
                                </h3>
                                <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
                                    {[
                                        { step: 1, title: '데이터 생성', desc: '차량/도로 장치', color: 'blue', icon: '📡' },
                                        { step: 2, title: '해시 생성', desc: 'SHA-3 256bit', color: 'indigo', icon: '🔐' },
                                        { step: 3, title: '분산 전송', desc: '계층별 노드로', color: 'purple', icon: '🌐' },
                                        { step: 4, title: '합의 검증', desc: '다중 노드 확인', color: 'pink', icon: '✓' },
                                        { step: 5, title: '타임스탬프', desc: '시간 증명 추가', color: 'red', icon: '⏱️' },
                                        { step: 6, title: '체인 연결', desc: '영구 기록 완료', color: 'orange', icon: '🔗' }
                                    ].map((item, idx) => (
                                        <div 
                                            key={item.step}
                                            className={`bg-${item.color}-900/30 border border-${item.color}-500/30 rounded-xl p-4 text-center transition-all duration-500 ${
                                                animationStep % 6 === idx ? 'scale-105 ring-2 ring-white/30' : ''
                                            }`}
                                        >
                                            <div className="text-3xl mb-2">{item.icon}</div>
                                            <div className={`w-8 h-8 bg-${item.color}-500 rounded-full flex items-center justify-center mx-auto mb-2 font-bold`}>
                                                {item.step}
                                            </div>
                                            <div className="font-bold text-sm">{item.title}</div>
                                            <div className="text-xs text-gray-400 mt-1">{item.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* AI 오염 탐지 */}
                            <div className="bg-gray-800/50 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-red-400 mb-4">
                                    <i className="fas fa-robot mr-2"></i>
                                    AI 기반 실시간 오염 탐지
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-2xl">🧠</span>
                                            <div className="font-bold text-indigo-400">CNN (합성곱 신경망)</div>
                                        </div>
                                        <div className="bg-gray-800 rounded p-3 mb-3">
                                            <div className="grid grid-cols-8 gap-0.5 mb-2">
                                                {Array(64).fill(0).map((_, i) => (
                                                    <div 
                                                        key={i} 
                                                        className={`w-3 h-3 rounded-sm ${Math.random() > 0.5 ? 'bg-white' : 'bg-gray-700'}`}
                                                    ></div>
                                                ))}
                                            </div>
                                            <div className="text-xs text-center text-gray-400">해시값 → 8x8 이미지 변환</div>
                                        </div>
                                        <ul className="text-sm text-gray-400 space-y-1">
                                            <li>• 정상 해시: 완전 무작위 패턴</li>
                                            <li>• 오염 해시: 규칙적 패턴 탐지</li>
                                        </ul>
                                    </div>
                                    <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-2xl">📈</span>
                                            <div className="font-bold text-purple-400">LSTM (장단기 메모리)</div>
                                        </div>
                                        <div className="bg-gray-800 rounded p-3 mb-3">
                                            <div className="flex items-end gap-1 h-12">
                                                {[3,5,2,7,4,6,3,5,8,4,6,2].map((h, i) => (
                                                    <div 
                                                        key={i}
                                                        className="flex-1 bg-purple-500 rounded-t"
                                                        style={{ height: `${h * 5}px` }}
                                                    ></div>
                                                ))}
                                            </div>
                                            <div className="text-xs text-center text-gray-400 mt-2">연속 해시값 변화량 시계열</div>
                                        </div>
                                        <ul className="text-sm text-gray-400 space-y-1">
                                            <li>• 정상: 무작위 변화량 분포</li>
                                            <li>• 오염: 비정상 패턴 예측</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-4 bg-red-900/30 border border-red-500/30 rounded-lg p-4 text-center">
                                    <div className="font-bold text-red-400 mb-2">융합 판정 (OR 조건)</div>
                                    <div className="text-sm text-gray-400">
                                        CNN 또는 LSTM 중 <strong>하나라도</strong> 오염 탐지 시 → 즉시 차단 및 복구
                                    </div>
                                </div>
                            </div>

                            {/* 신뢰도 계산 */}
                            <div className="bg-gray-800/50 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-cyan-400 mb-4">
                                    <i className="fas fa-calculator mr-2"></i>
                                    다차원 신뢰도 계산
                                </h3>
                                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-center">
                                    <div className="text-cyan-400 text-lg">
                                        신뢰도 = log(N) × W<sub>계층</sub> × T<sub>서명자</sub> × f(시간) × V<sub>교차검증</sub>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-5 gap-3 mt-4 text-xs">
                                    <div className="bg-gray-700/50 rounded p-2 text-center">
                                        <div className="font-bold text-cyan-400">log(N)</div>
                                        <div className="text-gray-400">네트워크 규모</div>
                                    </div>
                                    <div className="bg-gray-700/50 rounded p-2 text-center">
                                        <div className="font-bold text-yellow-400">W<sub>계층</sub></div>
                                        <div className="text-gray-400">계층 가중치</div>
                                    </div>
                                    <div className="bg-gray-700/50 rounded p-2 text-center">
                                        <div className="font-bold text-green-400">T<sub>서명자</sub></div>
                                        <div className="text-gray-400">서명자 신뢰도</div>
                                    </div>
                                    <div className="bg-gray-700/50 rounded p-2 text-center">
                                        <div className="font-bold text-purple-400">f(시간)</div>
                                        <div className="text-gray-400">시간 경과</div>
                                    </div>
                                    <div className="bg-gray-700/50 rounded p-2 text-center">
                                        <div className="font-bold text-pink-400">V<sub>교차</sub></div>
                                        <div className="text-gray-400">교차 검증</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 위변조 방지 탭 */}
                    {activeTab === 'protection' && (
                        <div className="space-y-6">
                            {/* 블록체인 대비 비교 */}
                            <div className="bg-gray-800/50 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-green-400 mb-4">
                                    <i className="fas fa-shield-alt mr-2"></i>
                                    기존 블록체인 vs OpenHash
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-gray-700">
                                                <th className="text-left py-3 px-4">구분</th>
                                                <th className="text-left py-3 px-4 text-red-400">작업증명 (PoW)</th>
                                                <th className="text-left py-3 px-4 text-yellow-400">지분증명 (PoS)</th>
                                                <th className="text-left py-3 px-4 text-green-400">OpenHash</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-400">
                                            <tr className="border-b border-gray-700/50">
                                                <td className="py-3 px-4 font-medium">처리 속도</td>
                                                <td className="py-3 px-4 text-red-400">7 tx/초</td>
                                                <td className="py-3 px-4 text-yellow-400">수천 tx/초</td>
                                                <td className="py-3 px-4 text-green-400 font-bold">수백만 tx/초</td>
                                            </tr>
                                            <tr className="border-b border-gray-700/50">
                                                <td className="py-3 px-4 font-medium">에너지 소비</td>
                                                <td className="py-3 px-4 text-red-400">극도로 높음</td>
                                                <td className="py-3 px-4 text-yellow-400">중간</td>
                                                <td className="py-3 px-4 text-green-400 font-bold">극도로 낮음</td>
                                            </tr>
                                            <tr className="border-b border-gray-700/50">
                                                <td className="py-3 px-4 font-medium">공격 요건</td>
                                                <td className="py-3 px-4 text-red-400">51% 해시파워</td>
                                                <td className="py-3 px-4 text-yellow-400">33% 지분</td>
                                                <td className="py-3 px-4 text-green-400 font-bold">51% 개인장치 동시 해킹</td>
                                            </tr>
                                            <tr className="border-b border-gray-700/50">
                                                <td className="py-3 px-4 font-medium">실시간 적합성</td>
                                                <td className="py-3 px-4 text-red-400">불가능</td>
                                                <td className="py-3 px-4 text-yellow-400">제한적</td>
                                                <td className="py-3 px-4 text-green-400 font-bold">최적</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 px-4 font-medium">자율주행 적용</td>
                                                <td className="py-3 px-4 text-red-400">❌ 부적합</td>
                                                <td className="py-3 px-4 text-yellow-400">⚠️ 한계</td>
                                                <td className="py-3 px-4 text-green-400 font-bold">✅ 최적</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* 물리적 분산 저장 */}
                            <div className="bg-gray-800/50 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-purple-400 mb-4">
                                    <i className="fas fa-database mr-2"></i>
                                    물리적 분산 저장 모델
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-gray-700/50 rounded-lg p-4">
                                        <div className="text-center mb-4">
                                            <div className="text-4xl mb-2">📱💻🚗☁️</div>
                                            <div className="font-bold">원본 데이터 저장 위치</div>
                                        </div>
                                        <ul className="text-sm text-gray-400 space-y-2">
                                            <li className="flex items-center gap-2">
                                                <span className="text-green-400">✓</span>
                                                차량 블랙박스 (원본)
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="text-green-400">✓</span>
                                                개인 스마트폰 (백업)
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="text-green-400">✓</span>
                                                개인용 컴퓨터 (백업)
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="text-green-400">✓</span>
                                                개인 클라우드 (백업)
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg p-4">
                                        <div className="text-center mb-4">
                                            <div className="text-4xl mb-2">🔗</div>
                                            <div className="font-bold text-indigo-400">OpenHash 네트워크</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-indigo-400 mb-2">해시값만 저장</div>
                                            <div className="text-sm text-gray-400">
                                                원본 데이터 크기와 무관하게<br/>
                                                고정 256bit 해시만 기록
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 과반수 공격 방어 */}
                            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-red-400 mb-4">
                                    <i className="fas fa-shield-virus mr-2"></i>
                                    51% 공격 방어 메커니즘
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-red-900/30 rounded-lg p-4">
                                        <div className="font-bold text-red-400 mb-2">❌ 기존 블록체인 공격</div>
                                        <div className="text-sm text-gray-400 mb-3">
                                            전체 해시파워의 51%만 장악하면 공격 성공
                                        </div>
                                        <div className="bg-gray-800 rounded p-3 text-center">
                                            <div className="text-3xl font-bold text-red-400">51%</div>
                                            <div className="text-xs text-gray-400">중앙집중화된 해시파워</div>
                                        </div>
                                    </div>
                                    <div className="bg-green-900/30 rounded-lg p-4">
                                        <div className="font-bold text-green-400 mb-2">✅ OpenHash 방어</div>
                                        <div className="text-sm text-gray-400 mb-3">
                                            300만대 차량의 51%를 동시 해킹해야 공격 성공
                                        </div>
                                        <div className="bg-gray-800 rounded p-3 text-center">
                                            <div className="text-3xl font-bold text-green-400">1,500,000대</div>
                                            <div className="text-xs text-gray-400">물리적으로 분산된 개별 장치</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 bg-gray-800 rounded-lg p-4 text-center">
                                    <div className="text-lg font-bold text-green-400 mb-2">공격 성공 확률</div>
                                    <div className="text-4xl font-bold text-green-400">≈ 0%</div>
                                    <div className="text-sm text-gray-400 mt-2">
                                        150만대의 서로 다른 보안 체계를 가진 장치를<br/>
                                        동시에 해킹하는 것은 수학적으로 불가능
                                    </div>
                                </div>
                            </div>

                            {/* 선별적 치유 프로세스 */}
                            <div className="bg-gray-800/50 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-cyan-400 mb-4">
                                    <i className="fas fa-first-aid mr-2"></i>
                                    선별적 치유 프로세스 (외과 수술 방식)
                                </h3>
                                <div className="grid md:grid-cols-4 gap-3">
                                    <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4 text-center">
                                        <div className="text-2xl mb-2">🔍</div>
                                        <div className="font-bold text-red-400">1. 오염 탐지</div>
                                        <div className="text-xs text-gray-400 mt-1">해시 연결성, 서명, 시간 순서 검증</div>
                                    </div>
                                    <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-4 text-center">
                                        <div className="text-2xl mb-2">🔒</div>
                                        <div className="font-bold text-yellow-400">2. 네트워크 격리</div>
                                        <div className="text-xs text-gray-400 mt-1">오염 부분만 0.001초 내 차단</div>
                                    </div>
                                    <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 text-center">
                                        <div className="text-2xl mb-2">🔄</div>
                                        <div className="font-bold text-blue-400">3. 데이터 복원</div>
                                        <div className="text-xs text-gray-400 mt-1">다수결 원칙으로 정상 데이터 선택</div>
                                    </div>
                                    <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4 text-center">
                                        <div className="text-2xl mb-2">✅</div>
                                        <div className="font-bold text-green-400">4. 네트워크 재연결</div>
                                        <div className="text-xs text-gray-400 mt-1">복구 완료 후 정상 운영</div>
                                    </div>
                                </div>
                                <div className="mt-4 bg-green-900/30 border border-green-500/30 rounded-lg p-4 text-center">
                                    <div className="font-bold text-green-400">핵심 장점</div>
                                    <div className="text-sm text-gray-400 mt-1">
                                        전체 시스템 중단 없이 오염 부분만 외과 수술처럼 제거 → <strong className="text-green-400">99.99% 가동률 유지</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 푸터 */}
                <div className="border-t border-gray-700 p-4 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="w-2 h-2 bg-green-400 rounded-full pulse-dot"></span>
                            <span>OpenHash 네트워크 정상 운영 중</span>
                        </div>
                        <a 
                            href="http://100.30.14.224/openhash-system/" 
                            target="_blank"
                            className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm transition"
                        >
                            <i className="fas fa-external-link-alt mr-2"></i>
                            OpenHash 시스템 상세 페이지
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
