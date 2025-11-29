const IndividualAutonomous = () => {
    // ============================================
    // 상태 관리
    // ============================================
    const [vehicle, setVehicle] = React.useState({
        id: 'AV-SEL-00142',
        position: { lat: 37.5012, lng: 127.0396, x: 100 },
        speed: 62,
        direction: 90, // 동쪽
        battery: 78,
        route: ['서울역', '숙대입구', '삼각지', '녹사평', '이태원', '한강진', '압구정'],
        currentRouteIndex: 2
    });
    
    const [sensorData, setSensorData] = React.useState({
        uwb: { distance: 2.34, accuracy: 0.02, lastUpdate: Date.now() },
        gnss: { lat: 37.5012, lng: 127.0396, accuracy: 0.01, lastUpdate: Date.now() },
        camera: { laneOffset: 0.03, confidence: 98.7, lastUpdate: Date.now() },
        fusion: { x: 127.0396, y: 37.5012, accuracy: 0.005, lastUpdate: Date.now() }
    });
    
    const [hashChain, setHashChain] = React.useState({
        layer1: [], // 읍면동
        layer2: [], // 시군구
        layer3: [], // 광역시도
        layer4: []  // 국가
    });
    
    const [currentHash, setCurrentHash] = React.useState(null);
    const [hashLogs, setHashLogs] = React.useState([]);
    const [transmissionLogs, setTransmissionLogs] = React.useState([]);
    const [stats, setStats] = React.useState({
        totalTransmissions: 0,
        layer1Hashes: 0,
        layer2Hashes: 0,
        layer3Hashes: 0,
        layer4Hashes: 0,
        integrityScore: 100,
        blockedAttempts: 0
    });
    
    const [animationPhase, setAnimationPhase] = React.useState(0);
    const [selectedLayer, setSelectedLayer] = React.useState(null);
    const [isPaused, setIsPaused] = React.useState(false);
    const [showAttackSimulation, setShowAttackSimulation] = React.useState(false);
    const [attackBlocked, setAttackBlocked] = React.useState(false);

    // 가상 해시 생성 함수
    const generateHash = (data) => {
        const str = JSON.stringify(data) + Date.now() + Math.random();
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).padStart(16, '0').slice(0, 16);
    };

    // 계층 선택 확률 (특허 명세서 기반)
    const selectLayer = () => {
        const random = Math.random();
        if (random < 0.95) return 1;      // 95% - Layer 1
        if (random < 0.99) return 2;      // 4% - Layer 2
        if (random < 0.999) return 3;     // 0.9% - Layer 3
        return 4;                          // 0.1% - Layer 4
    };

    // 로그 추가
    const addTransmissionLog = (message, type = 'info') => {
        setTransmissionLogs(prev => [{
            id: Date.now(),
            time: new Date().toLocaleTimeString('ko-KR', { hour12: false }),
            message,
            type
        }, ...prev].slice(0, 30));
    };

    const addHashLog = (message, layer) => {
        setHashLogs(prev => [{
            id: Date.now(),
            time: new Date().toLocaleTimeString('ko-KR', { hour12: false }),
            message,
            layer
        }, ...prev].slice(0, 20));
    };

    // 1초 간격 데이터 전송 시뮬레이션
    React.useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            // 차량 이동
            setVehicle(prev => {
                const newX = prev.position.x + 2;
                const newSpeed = 55 + Math.random() * 20;
                const newDirection = prev.direction + (Math.random() - 0.5) * 5;
                
                return {
                    ...prev,
                    position: {
                        ...prev.position,
                        x: newX > 700 ? 100 : newX,
                        lat: prev.position.lat + (Math.random() - 0.5) * 0.0001,
                        lng: prev.position.lng + 0.0002
                    },
                    speed: Math.round(newSpeed),
                    direction: newDirection
                };
            });

            // 센서 데이터 업데이트
            setSensorData(prev => ({
                uwb: {
                    distance: 2 + Math.random() * 1,
                    accuracy: 0.02 + Math.random() * 0.01,
                    lastUpdate: Date.now()
                },
                gnss: {
                    lat: 37.5012 + (Math.random() - 0.5) * 0.0001,
                    lng: 127.0396 + (Math.random() - 0.5) * 0.0001,
                    accuracy: 0.01 + Math.random() * 0.005,
                    lastUpdate: Date.now()
                },
                camera: {
                    laneOffset: (Math.random() - 0.5) * 0.1,
                    confidence: 95 + Math.random() * 5,
                    lastUpdate: Date.now()
                },
                fusion: {
                    x: 127.0396 + (Math.random() - 0.5) * 0.00005,
                    y: 37.5012 + (Math.random() - 0.5) * 0.00005,
                    accuracy: 0.005 + Math.random() * 0.002,
                    lastUpdate: Date.now()
                }
            }));

            // 애니메이션 단계 진행
            setAnimationPhase(prev => (prev + 1) % 8);

        }, 1000);

        return () => clearInterval(interval);
    }, [isPaused]);

    // 해시 생성 및 체인 연동 (별도 interval)
    React.useEffect(() => {
        if (isPaused) return;

        const hashInterval = setInterval(() => {
            // 데이터 패킷 구성
            const dataPacket = {
                vehicleId: vehicle.id,
                timestamp: Date.now(),
                position: vehicle.position,
                speed: vehicle.speed,
                direction: vehicle.direction,
                sensorFusion: sensorData.fusion
            };

            // 해시 생성
            const newHash = generateHash(dataPacket);
            setCurrentHash(newHash);

            // 계층 선택
            const layer = selectLayer();
            
            // 해시 체인에 추가
            const hashEntry = {
                hash: newHash,
                prevHash: null,
                timestamp: Date.now(),
                data: {
                    vehicleId: vehicle.id,
                    position: `${vehicle.position.lat.toFixed(4)}, ${vehicle.position.lng.toFixed(4)}`,
                    speed: vehicle.speed,
                    direction: Math.round(vehicle.direction)
                }
            };

            setHashChain(prev => {
                const layerKey = `layer${layer}`;
                const prevHashes = prev[layerKey];
                hashEntry.prevHash = prevHashes.length > 0 ? prevHashes[0].hash : '0'.repeat(16);
                
                return {
                    ...prev,
                    [layerKey]: [hashEntry, ...prevHashes].slice(0, 10)
                };
            });

            // 통계 업데이트
            setStats(prev => ({
                ...prev,
                totalTransmissions: prev.totalTransmissions + 1,
                [`layer${layer}Hashes`]: prev[`layer${layer}Hashes`] + 1
            }));

            // 로그 추가
            const layerNames = ['', '읍면동 (L1)', '시군구 (L2)', '광역시도 (L3)', '국가 (L4)'];
            addTransmissionLog(`📡 데이터 전송: 위치(${vehicle.position.lat.toFixed(4)}, ${vehicle.position.lng.toFixed(4)}), 속도(${vehicle.speed}km/h)`, 'data');
            addHashLog(`🔗 Hash ${newHash.slice(0, 8)}... → ${layerNames[layer]}`, layer);

        }, 1000);

        return () => clearInterval(hashInterval);
    }, [isPaused, vehicle, sensorData]);

    // 위변조 공격 시뮬레이션
    const simulateAttack = () => {
        setShowAttackSimulation(true);
        setAttackBlocked(false);
        
        addTransmissionLog('⚠️ [경고] 외부 위변조 시도 감지!', 'attack');
        addTransmissionLog('🔍 해시 무결성 검증 시작...', 'verify');
        
        setTimeout(() => {
            addTransmissionLog('❌ 해시 불일치 감지: 원본 0x3f2a... ≠ 수신 0x8b1c...', 'error');
            addTransmissionLog('🛡️ 위변조 데이터 차단됨', 'block');
            setAttackBlocked(true);
            setStats(prev => ({ ...prev, blockedAttempts: prev.blockedAttempts + 1 }));
            
            setTimeout(() => {
                addTransmissionLog('✅ 이전 검증된 데이터로 복원 완료', 'success');
                setShowAttackSimulation(false);
            }, 2000);
        }, 1500);
    };

    // 계층별 색상
    const layerColors = {
        1: { bg: 'from-green-600 to-green-800', border: 'border-green-500', text: 'text-green-400' },
        2: { bg: 'from-yellow-600 to-yellow-800', border: 'border-yellow-500', text: 'text-yellow-400' },
        3: { bg: 'from-orange-600 to-orange-800', border: 'border-orange-500', text: 'text-orange-400' },
        4: { bg: 'from-red-600 to-red-800', border: 'border-red-500', text: 'text-red-400' }
    };

    return (
        <div className="space-y-4">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-3">
                            🔗 개별 자율주행 + OpenHash 연동
                        </h1>
                        <p className="text-cyan-200 mt-1">
                            차량 데이터 → 주행보조장치 → 중앙서버 → 4계층 해시체인
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={simulateAttack}
                            disabled={showAttackSimulation}
                            className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg disabled:opacity-50"
                        >
                            <i className="fas fa-skull-crossbones mr-2"></i>
                            위변조 공격 시뮬레이션
                        </button>
                        <button
                            onClick={() => setIsPaused(!isPaused)}
                            className={`px-4 py-2 rounded-lg ${isPaused ? 'bg-green-500 hover:bg-green-400' : 'bg-gray-600 hover:bg-gray-500'}`}
                        >
                            <i className={`fas ${isPaused ? 'fa-play' : 'fa-pause'} mr-2`}></i>
                            {isPaused ? '재개' : '일시정지'}
                        </button>
                    </div>
                </div>
            </div>

            {/* 실시간 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-cyan-400">{stats.totalTransmissions}</div>
                    <div className="text-xs text-gray-400">총 전송</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-400">{stats.layer1Hashes}</div>
                    <div className="text-xs text-gray-400">L1 (읍면동)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-yellow-400">{stats.layer2Hashes}</div>
                    <div className="text-xs text-gray-400">L2 (시군구)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-orange-400">{stats.layer3Hashes}</div>
                    <div className="text-xs text-gray-400">L3 (광역)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-red-400">{stats.layer4Hashes}</div>
                    <div className="text-xs text-gray-400">L4 (국가)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-emerald-400">{stats.integrityScore}%</div>
                    <div className="text-xs text-gray-400">무결성</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-red-400">{stats.blockedAttempts}</div>
                    <div className="text-xs text-gray-400">차단된 공격</div>
                </div>
            </div>

            {/* 메인 시뮬레이션 영역 */}
            <div className="grid lg:grid-cols-2 gap-4">
                {/* 좌측: 차량 + 도로 + 주행보조장치 시뮬레이션 */}
                <div className="bg-gray-800 rounded-xl p-4">
                    <h3 className="font-bold text-lg mb-3">
                        <i className="fas fa-road text-cyan-400 mr-2"></i>
                        차량 - 주행보조장치 - 중앙서버 통신
                    </h3>
                    
                    <svg viewBox="0 0 800 400" className="w-full h-auto bg-gray-900 rounded-lg">
                        {/* 도로 */}
                        <rect x="50" y="150" width="700" height="80" fill="#374151" />
                        <line x1="50" y1="190" x2="750" y2="190" stroke="#fbbf24" strokeWidth="3" strokeDasharray="30,20" />
                        
                        {/* 태양광 패널 (도로 가장자리) */}
                        {[...Array(14)].map((_, i) => (
                            <g key={`panel-${i}`}>
                                <rect x={60 + i * 50} y="135" width="40" height="12" fill="#1e40af" opacity="0.7" />
                                <rect x={60 + i * 50} y="233" width="40" height="12" fill="#1e40af" opacity="0.7" />
                            </g>
                        ))}
                        
                        {/* 주행 표시선 */}
                        <line x1="50" y1="155" x2="750" y2="155" stroke="#fff" strokeWidth="2" />
                        <line x1="50" y1="225" x2="750" y2="225" stroke="#fff" strokeWidth="2" />
                        
                        {/* 주행보조장치 (UWB) */}
                        {[150, 350, 550].map((x, i) => (
                            <g key={`uwb-${i}`}>
                                <circle cx={x} cy="130" r="15" fill="#06b6d4" opacity="0.8">
                                    <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" />
                                </circle>
                                <text x={x} y="134" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">📡</text>
                                <text x={x} y="115" textAnchor="middle" fill="#06b6d4" fontSize="8">UWB</text>
                                
                                {/* 신호파 애니메이션 */}
                                {animationPhase % 3 === i && (
                                    <circle cx={x} cy="130" r="25" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.5">
                                        <animate attributeName="r" from="15" to="50" dur="1s" />
                                        <animate attributeName="opacity" from="0.5" to="0" dur="1s" />
                                    </circle>
                                )}
                            </g>
                        ))}
                        
                        {/* RTK-GNSS 기지국 */}
                        <g>
                            <rect x="680" y="50" width="40" height="60" fill="#8b5cf6" opacity="0.8" />
                            <polygon points="700,20 720,50 680,50" fill="#8b5cf6" />
                            <text x="700" y="40" textAnchor="middle" fill="#fff" fontSize="10">🛰️</text>
                            <text x="700" y="125" textAnchor="middle" fill="#8b5cf6" fontSize="9">RTK-GNSS</text>
                            
                            {/* 위성 신호 */}
                            <line x1="700" y1="50" x2={100 + vehicle.position.x} y2="180" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="5,5" opacity="0.5">
                                <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
                            </line>
                        </g>
                        
                        {/* 차량 */}
                        <g transform={`translate(${100 + vehicle.position.x}, 190)`}>
                            {/* 차량 본체 */}
                            <rect x="-30" y="-15" width="60" height="30" rx="8" fill="#3b82f6" />
                            <rect x="-25" y="-12" width="20" height="12" rx="3" fill="#60a5fa" opacity="0.7" />
                            <rect x="5" y="-12" width="15" height="12" rx="3" fill="#60a5fa" opacity="0.7" />
                            
                            {/* 센서 표시 */}
                            <circle cx="0" cy="-20" r="5" fill="#22c55e">
                                <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite" />
                            </circle>
                            
                            {/* 카메라 (전방) */}
                            <rect x="25" y="-5" width="8" height="10" fill="#f59e0b" />
                            
                            {/* 차량 ID */}
                            <text x="0" y="5" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">{vehicle.id}</text>
                        </g>
                        
                        {/* 데이터 전송 애니메이션 */}
                        {animationPhase >= 2 && animationPhase < 5 && (
                            <g>
                                {/* 차량 → 중앙서버 */}
                                <circle r="5" fill="#22c55e">
                                    <animateMotion dur="1s" repeatCount="1">
                                        <mpath href="#dataPath" />
                                    </animateMotion>
                                </circle>
                                <path id="dataPath" d={`M ${100 + vehicle.position.x} 170 Q 400 50 400 300`} fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
                            </g>
                        )}
                        
                        {/* 중앙 서버 */}
                        <g>
                            <rect x="360" y="280" width="80" height="50" rx="5" fill="#1f2937" stroke="#6366f1" strokeWidth="2" />
                            <text x="400" y="300" textAnchor="middle" fill="#6366f1" fontSize="10" fontWeight="bold">중앙 서버</text>
                            <text x="400" y="315" textAnchor="middle" fill="#a5b4fc" fontSize="8">AI 관제</text>
                            
                            {/* 서버 LED */}
                            <circle cx="375" y="320" r="3" fill="#22c55e">
                                <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="385" cy="320" r="3" fill="#22c55e">
                                <animate attributeName="opacity" values="0.3;1;0.3" dur="0.5s" repeatCount="indefinite" />
                            </circle>
                        </g>
                        
                        {/* 현재 해시 표시 */}
                        {currentHash && (
                            <g>
                                <rect x="280" y="345" width="240" height="35" rx="5" fill="#1e1e1e" stroke="#06b6d4" strokeWidth="1" />
                                <text x="400" y="358" textAnchor="middle" fill="#06b6d4" fontSize="8">현재 생성 해시</text>
                                <text x="400" y="372" textAnchor="middle" fill="#22d3ee" fontSize="11" fontFamily="monospace">0x{currentHash}</text>
                            </g>
                        )}
                        
                        {/* 공격 시뮬레이션 표시 */}
                        {showAttackSimulation && (
                            <g>
                                <rect x="200" y="100" width="200" height="60" rx="5" fill="#450a0a" stroke="#ef4444" strokeWidth="2">
                                    <animate attributeName="opacity" values="1;0.5;1" dur="0.3s" repeatCount="indefinite" />
                                </rect>
                                <text x="300" y="125" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">
                                    ⚠️ 위변조 시도 감지!
                                </text>
                                <text x="300" y="145" textAnchor="middle" fill="#fca5a5" fontSize="10">
                                    {attackBlocked ? '✅ 차단 완료' : '🔍 검증 중...'}
                                </text>
                            </g>
                        )}
                    </svg>
                    
                    {/* 센서 데이터 현황 */}
                    <div className="grid grid-cols-4 gap-2 mt-4 text-xs">
                        <div className="bg-cyan-900/30 border border-cyan-500/30 rounded p-2">
                            <div className="text-cyan-400 font-bold">📡 UWB</div>
                            <div className="text-gray-400">거리: {sensorData.uwb.distance.toFixed(2)}m</div>
                            <div className="text-gray-400">정밀도: ±{(sensorData.uwb.accuracy * 100).toFixed(0)}cm</div>
                        </div>
                        <div className="bg-purple-900/30 border border-purple-500/30 rounded p-2">
                            <div className="text-purple-400 font-bold">🛰️ RTK-GNSS</div>
                            <div className="text-gray-400">위도: {sensorData.gnss.lat.toFixed(4)}</div>
                            <div className="text-gray-400">정밀도: ±{(sensorData.gnss.accuracy * 100).toFixed(0)}cm</div>
                        </div>
                        <div className="bg-yellow-900/30 border border-yellow-500/30 rounded p-2">
                            <div className="text-yellow-400 font-bold">📷 카메라</div>
                            <div className="text-gray-400">편차: {(sensorData.camera.laneOffset * 100).toFixed(1)}cm</div>
                            <div className="text-gray-400">신뢰도: {sensorData.camera.confidence.toFixed(1)}%</div>
                        </div>
                        <div className="bg-green-900/30 border border-green-500/30 rounded p-2">
                            <div className="text-green-400 font-bold">🎯 융합 위치</div>
                            <div className="text-gray-400">X: {sensorData.fusion.x.toFixed(4)}</div>
                            <div className="text-gray-400">정밀도: ±{(sensorData.fusion.accuracy * 100).toFixed(1)}cm</div>
                        </div>
                    </div>
                </div>

                {/* 우측: OpenHash 4계층 시각화 */}
                <div className="bg-gray-800 rounded-xl p-4">
                    <h3 className="font-bold text-lg mb-3">
                        <i className="fas fa-layer-group text-indigo-400 mr-2"></i>
                        OpenHash 4계층 해시체인
                    </h3>
                    
                    {/* 4계층 피라미드 */}
                    <div className="relative bg-gray-900 rounded-lg p-4 mb-4">
                        <div className="flex flex-col items-center space-y-2">
                            {/* Layer 4 */}
                            <div 
                                className={`w-24 cursor-pointer transition-all ${selectedLayer === 4 ? 'scale-110' : ''}`}
                                onClick={() => setSelectedLayer(selectedLayer === 4 ? null : 4)}
                            >
                                <div className={`bg-gradient-to-r ${layerColors[4].bg} rounded-lg p-2 text-center border-2 ${hashChain.layer4.length > 0 && hashLogs[0]?.layer === 4 ? 'border-white animate-pulse' : 'border-red-400/50'}`}>
                                    <div className="text-xs text-red-200">Layer 4</div>
                                    <div className="font-bold text-sm">국가</div>
                                    <div className="text-xs text-red-300">{hashChain.layer4.length} blocks</div>
                                </div>
                            </div>
                            
                            {/* 연결선 */}
                            <div className="w-0.5 h-3 bg-gradient-to-b from-red-500 to-orange-500"></div>
                            
                            {/* Layer 3 */}
                            <div 
                                className={`w-36 cursor-pointer transition-all ${selectedLayer === 3 ? 'scale-110' : ''}`}
                                onClick={() => setSelectedLayer(selectedLayer === 3 ? null : 3)}
                            >
                                <div className={`bg-gradient-to-r ${layerColors[3].bg} rounded-lg p-2 text-center border-2 ${hashChain.layer3.length > 0 && hashLogs[0]?.layer === 3 ? 'border-white animate-pulse' : 'border-orange-400/50'}`}>
                                    <div className="text-xs text-orange-200">Layer 3</div>
                                    <div className="font-bold text-sm">광역시도 (17개)</div>
                                    <div className="text-xs text-orange-300">{hashChain.layer3.length} blocks</div>
                                </div>
                            </div>
                            
                            <div className="w-0.5 h-3 bg-gradient-to-b from-orange-500 to-yellow-500"></div>
                            
                            {/* Layer 2 */}
                            <div 
                                className={`w-48 cursor-pointer transition-all ${selectedLayer === 2 ? 'scale-110' : ''}`}
                                onClick={() => setSelectedLayer(selectedLayer === 2 ? null : 2)}
                            >
                                <div className={`bg-gradient-to-r ${layerColors[2].bg} rounded-lg p-2 text-center border-2 ${hashChain.layer2.length > 0 && hashLogs[0]?.layer === 2 ? 'border-white animate-pulse' : 'border-yellow-400/50'}`}>
                                    <div className="text-xs text-yellow-200">Layer 2</div>
                                    <div className="font-bold text-sm">시군구 (226개)</div>
                                    <div className="text-xs text-yellow-300">{hashChain.layer2.length} blocks</div>
                                </div>
                            </div>
                            
                            <div className="w-0.5 h-3 bg-gradient-to-b from-yellow-500 to-green-500"></div>
                            
                            {/* Layer 1 */}
                            <div 
                                className={`w-64 cursor-pointer transition-all ${selectedLayer === 1 ? 'scale-110' : ''}`}
                                onClick={() => setSelectedLayer(selectedLayer === 1 ? null : 1)}
                            >
                                <div className={`bg-gradient-to-r ${layerColors[1].bg} rounded-lg p-2 text-center border-2 ${hashChain.layer1.length > 0 && hashLogs[0]?.layer === 1 ? 'border-white animate-pulse' : 'border-green-400/50'}`}>
                                    <div className="text-xs text-green-200">Layer 1</div>
                                    <div className="font-bold text-sm">읍면동 (3,500개+)</div>
                                    <div className="text-xs text-green-300">{hashChain.layer1.length} blocks</div>
                                </div>
                            </div>
                        </div>
                        
                        {/* 확률 표시 */}
                        <div className="absolute right-2 top-2 text-xs text-gray-500">
                            <div>95% → L1</div>
                            <div>4% → L2</div>
                            <div>0.9% → L3</div>
                            <div>0.1% → L4</div>
                        </div>
                    </div>
                    
                    {/* 선택된 계층의 해시 체인 상세 */}
                    {selectedLayer && (
                        <div className={`bg-gray-900 rounded-lg p-3 mb-4 border ${layerColors[selectedLayer].border}`}>
                            <h4 className={`font-bold ${layerColors[selectedLayer].text} mb-2`}>
                                Layer {selectedLayer} 해시 체인
                            </h4>
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                                {hashChain[`layer${selectedLayer}`].map((entry, idx) => (
                                    <div key={idx} className="bg-gray-800 rounded p-2 text-xs font-mono">
                                        <div className="flex items-center justify-between">
                                            <span className={layerColors[selectedLayer].text}>#{hashChain[`layer${selectedLayer}`].length - idx}</span>
                                            <span className="text-gray-500">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                                        </div>
                                        <div className="text-cyan-400 mt-1">Hash: 0x{entry.hash}</div>
                                        <div className="text-gray-500">Prev: 0x{entry.prevHash.slice(0, 8)}...</div>
                                        <div className="text-gray-400 mt-1">
                                            {entry.data.vehicleId} | {entry.data.position} | {entry.data.speed}km/h
                                        </div>
                                    </div>
                                ))}
                                {hashChain[`layer${selectedLayer}`].length === 0 && (
                                    <div className="text-gray-500 text-center py-4">아직 기록 없음</div>
                                )}
                            </div>
                        </div>
                    )}
                    
                    {/* 해시 로그 */}
                    <div className="bg-gray-900 rounded-lg p-3">
                        <h4 className="font-bold text-indigo-400 mb-2 text-sm">
                            <i className="fas fa-stream mr-1"></i>
                            해시 생성 로그
                        </h4>
                        <div className="space-y-1 max-h-40 overflow-y-auto text-xs font-mono">
                            {hashLogs.map(log => (
                                <div key={log.id} className={`p-1.5 rounded ${
                                    log.layer === 1 ? 'bg-green-900/30 text-green-300' :
                                    log.layer === 2 ? 'bg-yellow-900/30 text-yellow-300' :
                                    log.layer === 3 ? 'bg-orange-900/30 text-orange-300' :
                                    'bg-red-900/30 text-red-300'
                                }`}>
                                    <span className="text-gray-500">[{log.time}]</span> {log.message}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 하단: 데이터 전송 로그 + 중요성 설명 */}
            <div className="grid lg:grid-cols-2 gap-4">
                {/* 데이터 전송 로그 */}
                <div className="bg-gray-800 rounded-xl p-4">
                    <h3 className="font-bold text-cyan-400 mb-3">
                        <i className="fas fa-broadcast-tower mr-2"></i>
                        1초 간격 데이터 전송 로그
                    </h3>
                    <div className="bg-gray-900 rounded-lg p-3 h-48 overflow-y-auto">
                        <div className="space-y-1 text-xs font-mono">
                            {transmissionLogs.map(log => (
                                <div key={log.id} className={`p-1.5 rounded ${
                                    log.type === 'data' ? 'bg-blue-900/30 text-blue-300' :
                                    log.type === 'attack' ? 'bg-red-900/50 text-red-400 font-bold' :
                                    log.type === 'verify' ? 'bg-yellow-900/30 text-yellow-300' :
                                    log.type === 'error' ? 'bg-red-900/30 text-red-300' :
                                    log.type === 'block' ? 'bg-orange-900/30 text-orange-300' :
                                    log.type === 'success' ? 'bg-green-900/30 text-green-300' :
                                    'bg-gray-700/50 text-gray-300'
                                }`}>
                                    <span className="text-gray-500">[{log.time}]</span> {log.message}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 데이터 무결성의 중요성 */}
                <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border border-red-500/30 rounded-xl p-4">
                    <h3 className="font-bold text-red-400 mb-3">
                        <i className="fas fa-exclamation-triangle mr-2"></i>
                        왜 데이터 무결성이 생명인가?
                    </h3>
                    <div className="space-y-3 text-sm">
                        <div className="bg-gray-800/50 rounded-lg p-3">
                            <div className="font-bold text-red-400 mb-1">❌ 허위 데이터의 치명적 결과</div>
                            <ul className="text-gray-400 space-y-1 text-xs">
                                <li>• <strong>속도 위변조</strong>: 시속 80km를 40km로 조작 → 후방 차량 추돌</li>
                                <li>• <strong>위치 위변조</strong>: GPS 좌표 조작 → 경로 계산 오류 → 충돌</li>
                                <li>• <strong>방향 위변조</strong>: 진행 방향 조작 → 역주행 사고</li>
                                <li>• <strong>해킹 공격</strong>: 차량 통제권 탈취 → 테러 악용 가능</li>
                            </ul>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-3">
                            <div className="font-bold text-green-400 mb-1">✅ OpenHash 4계층 보호</div>
                            <ul className="text-gray-400 space-y-1 text-xs">
                                <li>• <strong>1비트 변조도 탐지</strong>: 해시값 즉시 불일치</li>
                                <li>• <strong>4계층 교차 검증</strong>: 다중 노드에서 동시 확인</li>
                                <li>• <strong>시간 증명</strong>: 타임스탬프 조작 불가</li>
                                <li>• <strong>체인 연결</strong>: 이전 기록 변경 시 전체 체인 파괴</li>
                            </ul>
                        </div>
                        <div className="bg-indigo-900/30 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-indigo-400">
                                "자율주행에서 데이터 진실성은 <span className="text-red-400">생명</span>입니다"
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                                OpenHash는 모든 차량 데이터의 무결성을 암호학적으로 보장합니다
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 해시 데이터 구조 */}
            <div className="bg-gray-800 rounded-xl p-4">
                <h3 className="font-bold text-purple-400 mb-3">
                    <i className="fas fa-code mr-2"></i>
                    차량 데이터 해시 구조
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-900 rounded-lg p-4">
                        <div className="text-sm text-gray-400 mb-2">원본 데이터 (차량 블랙박스 저장)</div>
                        <pre className="text-xs font-mono text-cyan-400 overflow-x-auto">
{`{
  "vehicle_id": "${vehicle.id}",
  "timestamp": ${Date.now()},
  "position": {
    "lat": ${vehicle.position.lat.toFixed(6)},
    "lng": ${vehicle.position.lng.toFixed(6)}
  },
  "speed": ${vehicle.speed},
  "direction": ${Math.round(vehicle.direction)},
  "battery": ${vehicle.battery},
  "sensor_fusion": {
    "uwb": ${sensorData.uwb.distance.toFixed(3)},
    "gnss_accuracy": ${sensorData.gnss.accuracy.toFixed(4)},
    "camera_confidence": ${sensorData.camera.confidence.toFixed(1)}
  }
}`}
                        </pre>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4">
                        <div className="text-sm text-gray-400 mb-2">해시 블록 (OpenHash 네트워크 저장)</div>
                        <pre className="text-xs font-mono text-green-400 overflow-x-auto">
{`{
  "block_header": {
    "prev_hash": "0x${hashChain.layer1[1]?.hash || '0'.repeat(16)}",
    "timestamp": ${Date.now()},
    "layer": 1,
    "node_id": "L1-SEL-GN-042"
  },
  "data_hash": "0x${currentHash || '생성 중...'}",
  "signature": "ECDSA_P256(...)",
  "trust_score": 99.97
}`}
                        </pre>
                    </div>
                </div>
                <div className="mt-3 bg-indigo-900/30 border border-indigo-500/30 rounded-lg p-3 text-center text-sm">
                    <i className="fas fa-shield-alt text-indigo-400 mr-2"></i>
                    <span className="text-gray-400">원본 데이터는 차량에만 저장, OpenHash에는 </span>
                    <span className="text-indigo-400 font-bold">해시값만</span>
                    <span className="text-gray-400"> 기록 → 프라이버시 보호 + 무결성 검증</span>
                </div>
            </div>
        </div>
    );
};
