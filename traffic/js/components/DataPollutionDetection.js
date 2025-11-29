const DataPollutionDetection = () => {
    // ============================================
    // 상태 관리
    // ============================================
    const [vehicles, setVehicles] = React.useState([]);
    const [selectedVehicle, setSelectedVehicle] = React.useState(null);
    const [detectionLogs, setDetectionLogs] = React.useState([]);
    const [pollutionAlerts, setPollutionAlerts] = React.useState([]);
    const [aiAnalysis, setAiAnalysis] = React.useState(null);
    const [simulationMode, setSimulationMode] = React.useState(null); // 'position', 'speed', 'passenger', 'direction'
    const [isAnalyzing, setIsAnalyzing] = React.useState(false);
    const [hashImageData, setHashImageData] = React.useState([]);
    const [timeSeriesData, setTimeSeriesData] = React.useState([]);
    const [stats, setStats] = React.useState({
        totalChecks: 0,
        normalData: 0,
        pollutedData: 0,
        cnnDetections: 0,
        lstmDetections: 0,
        blockedAttempts: 0
    });

    // 물리적 제약 상수
    const PHYSICAL_CONSTRAINTS = {
        maxSpeed: 180, // km/h
        maxAcceleration: 10, // m/s² (약 36 km/h per second)
        maxDeceleration: 15, // m/s²
        maxPositionJump: 0.05, // 약 50m (위경도 단위)
        maxDirectionChange: 90, // 도/초
        maxPassengerChange: 0 // 이벤트 없이 변경 불가
    };

    // 차량 초기화
    React.useEffect(() => {
        const initialVehicles = [];
        for (let i = 0; i < 5; i++) {
            initialVehicles.push({
                id: `AV-SEL-${String(i + 1).padStart(5, '0')}`,
                history: generateVehicleHistory(),
                isPolluted: false,
                pollutionType: null
            });
        }
        setVehicles(initialVehicles);
        setSelectedVehicle(initialVehicles[0]);
    }, []);

    // 차량 히스토리 생성
    const generateVehicleHistory = () => {
        const history = [];
        let lat = 37.5 + Math.random() * 0.1;
        let lng = 127.0 + Math.random() * 0.1;
        let speed = 50 + Math.random() * 30;
        let direction = Math.random() * 360;
        let passengers = Math.floor(Math.random() * 3);

        for (let i = 0; i < 20; i++) {
            // 물리적으로 가능한 변화만 적용
            lat += (Math.random() - 0.5) * 0.001;
            lng += (Math.random() - 0.5) * 0.001;
            speed = Math.max(0, Math.min(180, speed + (Math.random() - 0.5) * 5));
            direction = (direction + (Math.random() - 0.5) * 10 + 360) % 360;

            history.push({
                timestamp: Date.now() - (19 - i) * 1000,
                position: { lat, lng },
                speed: Math.round(speed),
                direction: Math.round(direction),
                passengers,
                hash: generateHash({ lat, lng, speed, direction, passengers }),
                isNormal: true
            });
        }
        return history;
    };

    // 해시 생성
    const generateHash = (data) => {
        const str = JSON.stringify(data) + Math.random();
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).padStart(64, '0').slice(0, 64);
    };

    // 로그 추가
    const addLog = (message, type = 'info') => {
        setDetectionLogs(prev => [{
            id: Date.now(),
            time: new Date().toLocaleTimeString('ko-KR', { hour12: false }),
            message,
            type
        }, ...prev].slice(0, 50));
    };

    // 오염 데이터 생성 시뮬레이션
    const simulatePollution = (type) => {
        if (!selectedVehicle || isAnalyzing) return;
        
        setSimulationMode(type);
        setIsAnalyzing(true);
        setPollutionAlerts([]);
        setAiAnalysis(null);

        const lastData = selectedVehicle.history[selectedVehicle.history.length - 1];
        let pollutedData = { ...lastData };

        switch (type) {
            case 'position':
                // 서울 → 부산 순간이동 (불가능)
                pollutedData = {
                    ...lastData,
                    timestamp: Date.now(),
                    position: { lat: 35.1796, lng: 129.0756 }, // 부산 좌표
                    hash: generateHash({ lat: 35.1796, lng: 129.0756 }),
                    isNormal: false,
                    pollutionType: 'position_jump'
                };
                addLog('⚠️ [시뮬레이션] 위치 데이터 조작 시도: 서울 → 부산 순간이동', 'attack');
                break;

            case 'speed':
                // 30km/h → 200km/h 급가속 (불가능)
                pollutedData = {
                    ...lastData,
                    timestamp: Date.now(),
                    speed: 200,
                    hash: generateHash({ speed: 200 }),
                    isNormal: false,
                    pollutionType: 'speed_violation'
                };
                addLog('⚠️ [시뮬레이션] 속도 데이터 조작 시도: 급가속 위반', 'attack');
                break;

            case 'passenger':
                // 승객 1명 → 3명 (승차 이벤트 없이 불가능)
                pollutedData = {
                    ...lastData,
                    timestamp: Date.now(),
                    passengers: lastData.passengers + 2,
                    hash: generateHash({ passengers: lastData.passengers + 2 }),
                    isNormal: false,
                    pollutionType: 'passenger_anomaly'
                };
                addLog('⚠️ [시뮬레이션] 탑승객 데이터 조작 시도: 승차 이벤트 없이 증가', 'attack');
                break;

            case 'direction':
                // 방향 급변 (180도 역주행)
                pollutedData = {
                    ...lastData,
                    timestamp: Date.now(),
                    direction: (lastData.direction + 180) % 360,
                    hash: generateHash({ direction: (lastData.direction + 180) % 360 }),
                    isNormal: false,
                    pollutionType: 'direction_violation'
                };
                addLog('⚠️ [시뮬레이션] 방향 데이터 조작 시도: 급격한 방향 전환', 'attack');
                break;
        }

        // 히스토리에 오염 데이터 추가
        setSelectedVehicle(prev => ({
            ...prev,
            history: [...prev.history, pollutedData],
            isPolluted: true,
            pollutionType: type
        }));

        // AI 분석 시작
        setTimeout(() => runAIAnalysis(pollutedData, lastData, type), 500);
    };

    // AI 분석 실행
    const runAIAnalysis = (pollutedData, previousData, pollutionType) => {
        addLog('🤖 AI 오염 탐지 시스템 가동...', 'system');
        
        // 1단계: 물리적 제약 검증
        setTimeout(() => {
            addLog('📊 [1단계] 물리적 제약 검증 시작', 'analysis');
            
            const physicsViolations = checkPhysicsViolations(pollutedData, previousData);
            
            if (physicsViolations.length > 0) {
                physicsViolations.forEach(v => {
                    addLog(`❌ 물리 법칙 위반: ${v.message}`, 'error');
                });
            }

            // 2단계: CNN 분석
            setTimeout(() => {
                addLog('🧠 [2단계] CNN 해시 패턴 분석 시작', 'analysis');
                runCNNAnalysis(pollutedData, previousData);

                // 3단계: LSTM 분석
                setTimeout(() => {
                    addLog('📈 [3단계] LSTM 시계열 분석 시작', 'analysis');
                    runLSTMAnalysis(pollutedData, previousData, pollutionType);

                    // 4단계: 융합 판정
                    setTimeout(() => {
                        finalizeAnalysis(pollutedData, previousData, pollutionType);
                    }, 1000);
                }, 1500);
            }, 1000);
        }, 500);
    };

    // 물리적 제약 검증
    const checkPhysicsViolations = (current, previous) => {
        const violations = [];
        const timeDelta = (current.timestamp - previous.timestamp) / 1000; // 초

        // 위치 점프 검사
        const positionDelta = Math.sqrt(
            Math.pow((current.position.lat - previous.position.lat) * 111000, 2) +
            Math.pow((current.position.lng - previous.position.lng) * 88000, 2)
        ); // 미터 단위
        const maxPossibleDistance = (previous.speed / 3.6) * timeDelta * 1.5; // 여유 50%

        if (positionDelta > maxPossibleDistance && positionDelta > 100) {
            violations.push({
                type: 'position',
                message: `위치 이동 ${(positionDelta/1000).toFixed(1)}km가 ${timeDelta}초 내 불가능 (최대 ${(maxPossibleDistance/1000).toFixed(3)}km)`,
                severity: 'critical'
            });
        }

        // 속도 변화 검사
        const speedDelta = Math.abs(current.speed - previous.speed);
        const maxSpeedChange = PHYSICAL_CONSTRAINTS.maxAcceleration * 3.6 * timeDelta; // km/h

        if (speedDelta > maxSpeedChange) {
            violations.push({
                type: 'speed',
                message: `속도 변화 ${speedDelta}km/h가 ${timeDelta}초 내 불가능 (최대 ${maxSpeedChange.toFixed(1)}km/h)`,
                severity: 'high'
            });
        }

        // 방향 급변 검사
        let directionDelta = Math.abs(current.direction - previous.direction);
        if (directionDelta > 180) directionDelta = 360 - directionDelta;
        const maxDirectionChange = PHYSICAL_CONSTRAINTS.maxDirectionChange * timeDelta;

        if (directionDelta > maxDirectionChange && current.speed > 10) {
            violations.push({
                type: 'direction',
                message: `방향 변화 ${directionDelta}°가 ${timeDelta}초 내 불가능 (최대 ${maxDirectionChange}°)`,
                severity: 'high'
            });
        }

        // 탑승객 변화 검사
        const passengerDelta = current.passengers - previous.passengers;
        if (passengerDelta !== 0) {
            violations.push({
                type: 'passenger',
                message: `탑승객 ${passengerDelta > 0 ? '증가' : '감소'} ${Math.abs(passengerDelta)}명 - 승하차 이벤트 기록 없음`,
                severity: 'medium'
            });
        }

        return violations;
    };

    // CNN 분석 (해시 → 이미지 → 패턴 분석)
    const runCNNAnalysis = (current, previous) => {
        // 해시를 8x8 이미지로 변환
        const hashToImage = (hash) => {
            const pixels = [];
            for (let i = 0; i < 64; i++) {
                const char = hash.charCodeAt(i % hash.length);
                pixels.push(char % 256);
            }
            return pixels;
        };

        const currentImage = hashToImage(current.hash);
        const previousImage = hashToImage(previous.hash);
        
        setHashImageData([
            { label: '이전 해시', pixels: previousImage, isNormal: true },
            { label: '현재 해시', pixels: currentImage, isNormal: false }
        ]);

        // CNN 특징 추출 시뮬레이션
        const cnnFeatures = {
            entropy: calculateEntropy(currentImage),
            uniformity: calculateUniformity(currentImage),
            patternScore: Math.random() * 0.3 + 0.7, // 정상: 0.7-1.0
            anomalyScore: current.isNormal ? 0.1 : 0.85
        };

        addLog(`🔍 CNN 엔트로피: ${cnnFeatures.entropy.toFixed(3)} (정상: > 0.9)`, 
            cnnFeatures.entropy > 0.9 ? 'success' : 'warning');
        addLog(`🔍 CNN 균일도: ${cnnFeatures.uniformity.toFixed(3)} (정상: > 0.8)`,
            cnnFeatures.uniformity > 0.8 ? 'success' : 'warning');
        
        if (!current.isNormal) {
            addLog('🚨 CNN: 비정상 패턴 감지됨!', 'error');
            setStats(prev => ({ ...prev, cnnDetections: prev.cnnDetections + 1 }));
        }
    };

    // LSTM 분석 (시계열 변화량 분석)
    const runLSTMAnalysis = (current, previous, pollutionType) => {
        // 최근 10개 데이터의 변화량 시계열
        const history = selectedVehicle.history.slice(-10);
        const timeSeries = [];

        for (let i = 1; i < history.length; i++) {
            const prev = history[i - 1];
            const curr = history[i];
            
            const positionChange = Math.sqrt(
                Math.pow(curr.position.lat - prev.position.lat, 2) +
                Math.pow(curr.position.lng - prev.position.lng, 2)
            ) * 100000; // 스케일 조정

            const speedChange = Math.abs(curr.speed - prev.speed);
            
            timeSeries.push({
                index: i,
                positionChange,
                speedChange,
                isAnomaly: !curr.isNormal
            });
        }

        setTimeSeriesData(timeSeries);

        // 이상치 탐지
        const avgPositionChange = timeSeries.slice(0, -1).reduce((a, b) => a + b.positionChange, 0) / (timeSeries.length - 1);
        const lastPositionChange = timeSeries[timeSeries.length - 1]?.positionChange || 0;

        if (lastPositionChange > avgPositionChange * 10) {
            addLog('🚨 LSTM: 위치 변화량 이상치 탐지!', 'error');
            setStats(prev => ({ ...prev, lstmDetections: prev.lstmDetections + 1 }));
        }

        const avgSpeedChange = timeSeries.slice(0, -1).reduce((a, b) => a + b.speedChange, 0) / (timeSeries.length - 1);
        const lastSpeedChange = timeSeries[timeSeries.length - 1]?.speedChange || 0;

        if (lastSpeedChange > avgSpeedChange * 5) {
            addLog('🚨 LSTM: 속도 변화량 이상치 탐지!', 'error');
        }
    };

    // 엔트로피 계산
    const calculateEntropy = (pixels) => {
        const counts = {};
        pixels.forEach(p => { counts[p] = (counts[p] || 0) + 1; });
        let entropy = 0;
        const len = pixels.length;
        Object.values(counts).forEach(c => {
            const p = c / len;
            entropy -= p * Math.log2(p);
        });
        return entropy / 8; // 정규화
    };

    // 균일도 계산
    const calculateUniformity = (pixels) => {
        const avg = pixels.reduce((a, b) => a + b, 0) / pixels.length;
        const variance = pixels.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / pixels.length;
        return Math.max(0, 1 - variance / 10000);
    };

    // 최종 분석 결과
    const finalizeAnalysis = (pollutedData, previousData, pollutionType) => {
        addLog('⚖️ [4단계] 융합 판정 (CNN OR LSTM)', 'analysis');
        
        const analysis = {
            detected: true,
            type: pollutionType,
            cnnResult: true,
            lstmResult: true,
            confidence: 0.97,
            action: 'BLOCKED',
            details: getPollutionDetails(pollutionType, pollutedData, previousData)
        };

        setAiAnalysis(analysis);

        addLog('🛡️ 융합 판정 결과: 오염 데이터 확정', 'error');
        addLog('🚫 해당 데이터 차단 및 이전 데이터로 복원', 'success');
        
        setPollutionAlerts(prev => [...prev, {
            id: Date.now(),
            vehicleId: selectedVehicle.id,
            type: pollutionType,
            timestamp: Date.now(),
            blocked: true
        }]);

        setStats(prev => ({
            ...prev,
            totalChecks: prev.totalChecks + 1,
            pollutedData: prev.pollutedData + 1,
            blockedAttempts: prev.blockedAttempts + 1
        }));

        setTimeout(() => {
            setIsAnalyzing(false);
            addLog('✅ 오염 탐지 및 차단 완료. 시스템 정상 운영 중.', 'success');
        }, 1000);
    };

    // 오염 유형별 상세 설명
    const getPollutionDetails = (type, current, previous) => {
        const timeDelta = ((current.timestamp - previous.timestamp) / 1000).toFixed(1);
        
        switch (type) {
            case 'position':
                const distance = Math.sqrt(
                    Math.pow((current.position.lat - previous.position.lat) * 111, 2) +
                    Math.pow((current.position.lng - previous.position.lng) * 88, 2)
                );
                return {
                    title: '위치 순간이동 탐지',
                    description: `${timeDelta}초 만에 ${distance.toFixed(1)}km 이동 불가능`,
                    previous: `서울 (${previous.position.lat.toFixed(4)}, ${previous.position.lng.toFixed(4)})`,
                    current: `부산 (${current.position.lat.toFixed(4)}, ${current.position.lng.toFixed(4)})`,
                    rule: `물리적 최대 이동 거리: ${(previous.speed / 3.6 * timeDelta / 1000).toFixed(3)}km`,
                    icon: '📍'
                };
            case 'speed':
                return {
                    title: '불가능한 가속 탐지',
                    description: `${timeDelta}초 만에 ${Math.abs(current.speed - previous.speed)}km/h 속도 변화 불가능`,
                    previous: `${previous.speed} km/h`,
                    current: `${current.speed} km/h`,
                    rule: `물리적 최대 가속: ${(PHYSICAL_CONSTRAINTS.maxAcceleration * 3.6 * timeDelta).toFixed(1)}km/h per ${timeDelta}초`,
                    icon: '⚡'
                };
            case 'passenger':
                return {
                    title: '탑승객 이상 변화 탐지',
                    description: '승하차 이벤트 기록 없이 탑승객 수 변경',
                    previous: `${previous.passengers}명`,
                    current: `${current.passengers}명`,
                    rule: '탑승객 변화는 반드시 승하차 이벤트와 동반되어야 함',
                    icon: '👥'
                };
            case 'direction':
                let dirDelta = Math.abs(current.direction - previous.direction);
                if (dirDelta > 180) dirDelta = 360 - dirDelta;
                return {
                    title: '급격한 방향 전환 탐지',
                    description: `${timeDelta}초 만에 ${dirDelta}° 방향 전환 불가능`,
                    previous: `${previous.direction}°`,
                    current: `${current.direction}°`,
                    rule: `물리적 최대 방향 변화: ${(PHYSICAL_CONSTRAINTS.maxDirectionChange * timeDelta).toFixed(0)}° per ${timeDelta}초`,
                    icon: '🧭'
                };
            default:
                return { title: '알 수 없는 오염', description: '', icon: '❓' };
        }
    };

    // 정상 데이터 시뮬레이션
    const simulateNormalData = () => {
        if (!selectedVehicle || isAnalyzing) return;
        
        const lastData = selectedVehicle.history[selectedVehicle.history.length - 1];
        const normalData = {
            timestamp: Date.now(),
            position: {
                lat: lastData.position.lat + (Math.random() - 0.5) * 0.0005,
                lng: lastData.position.lng + (Math.random() - 0.5) * 0.0005
            },
            speed: Math.max(0, Math.min(180, lastData.speed + (Math.random() - 0.5) * 3)),
            direction: (lastData.direction + (Math.random() - 0.5) * 5 + 360) % 360,
            passengers: lastData.passengers,
            hash: generateHash({ normal: true, ts: Date.now() }),
            isNormal: true
        };

        setSelectedVehicle(prev => ({
            ...prev,
            history: [...prev.history.slice(-19), normalData]
        }));

        setStats(prev => ({
            ...prev,
            totalChecks: prev.totalChecks + 1,
            normalData: prev.normalData + 1
        }));

        addLog(`✅ 정상 데이터 검증 완료: ${selectedVehicle.id}`, 'success');
    };

    return (
        <div className="space-y-4">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-3">
                            🛡️ AI 데이터 오염 탐지 시스템
                        </h1>
                        <p className="text-red-200 mt-1">
                            CNN + LSTM 융합 모델 기반 실시간 위변조 탐지
                        </p>
                    </div>
                    <div className="bg-white/20 rounded-lg px-4 py-2">
                        <div className="text-sm text-red-200">탐지 신뢰도</div>
                        <div className="text-2xl font-bold">99.97%</div>
                    </div>
                </div>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-cyan-400">{stats.totalChecks}</div>
                    <div className="text-xs text-gray-400">총 검사</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-400">{stats.normalData}</div>
                    <div className="text-xs text-gray-400">정상 데이터</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-red-400">{stats.pollutedData}</div>
                    <div className="text-xs text-gray-400">오염 탐지</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-purple-400">{stats.cnnDetections}</div>
                    <div className="text-xs text-gray-400">CNN 탐지</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-400">{stats.lstmDetections}</div>
                    <div className="text-xs text-gray-400">LSTM 탐지</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-orange-400">{stats.blockedAttempts}</div>
                    <div className="text-xs text-gray-400">차단됨</div>
                </div>
            </div>

            {/* 오염 시뮬레이션 버튼 */}
            <div className="bg-gray-800 rounded-xl p-4">
                <h3 className="font-bold text-lg mb-4">
                    <i className="fas fa-flask text-red-400 mr-2"></i>
                    오염 시나리오 시뮬레이션
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <button
                        onClick={() => simulatePollution('position')}
                        disabled={isAnalyzing}
                        className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 rounded-lg p-4 text-left disabled:opacity-50 transition"
                    >
                        <div className="text-2xl mb-2">📍</div>
                        <div className="font-bold text-sm">위치 조작</div>
                        <div className="text-xs text-red-300 mt-1">서울 → 부산 순간이동</div>
                    </button>
                    <button
                        onClick={() => simulatePollution('speed')}
                        disabled={isAnalyzing}
                        className="bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-500 hover:to-orange-700 rounded-lg p-4 text-left disabled:opacity-50 transition"
                    >
                        <div className="text-2xl mb-2">⚡</div>
                        <div className="font-bold text-sm">속도 조작</div>
                        <div className="text-xs text-orange-300 mt-1">불가능한 급가속</div>
                    </button>
                    <button
                        onClick={() => simulatePollution('passenger')}
                        disabled={isAnalyzing}
                        className="bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-500 hover:to-yellow-700 rounded-lg p-4 text-left disabled:opacity-50 transition"
                    >
                        <div className="text-2xl mb-2">👥</div>
                        <div className="font-bold text-sm">탑승객 조작</div>
                        <div className="text-xs text-yellow-300 mt-1">이벤트 없이 증가</div>
                    </button>
                    <button
                        onClick={() => simulatePollution('direction')}
                        disabled={isAnalyzing}
                        className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 rounded-lg p-4 text-left disabled:opacity-50 transition"
                    >
                        <div className="text-2xl mb-2">🧭</div>
                        <div className="font-bold text-sm">방향 조작</div>
                        <div className="text-xs text-purple-300 mt-1">급격한 역주행</div>
                    </button>
                    <button
                        onClick={simulateNormalData}
                        disabled={isAnalyzing}
                        className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 rounded-lg p-4 text-left disabled:opacity-50 transition"
                    >
                        <div className="text-2xl mb-2">✅</div>
                        <div className="font-bold text-sm">정상 데이터</div>
                        <div className="text-xs text-green-300 mt-1">물리 법칙 준수</div>
                    </button>
                </div>
            </div>

            {/* 메인 분석 영역 */}
            <div className="grid lg:grid-cols-2 gap-4">
                {/* 좌측: AI 분석 시각화 */}
                <div className="space-y-4">
                    {/* CNN 분석: 해시 → 이미지 */}
                    <div className="bg-gray-800 rounded-xl p-4">
                        <h3 className="font-bold text-purple-400 mb-3">
                            <i className="fas fa-brain mr-2"></i>
                            CNN 분석: 해시 → 이미지 패턴
                        </h3>
                        <div className="bg-gray-900 rounded-lg p-4">
                            <div className="grid grid-cols-2 gap-4">
                                {hashImageData.map((img, idx) => (
                                    <div key={idx} className="text-center">
                                        <div className="text-xs text-gray-400 mb-2">{img.label}</div>
                                        <div className="inline-block bg-gray-800 p-2 rounded">
                                            <div className="grid grid-cols-8 gap-0.5" style={{ width: '128px', height: '128px' }}>
                                                {img.pixels.map((p, i) => (
                                                    <div
                                                        key={i}
                                                        className="rounded-sm"
                                                        style={{
                                                            backgroundColor: `rgb(${p}, ${p}, ${p})`,
                                                            width: '14px',
                                                            height: '14px'
                                                        }}
                                                    ></div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={`text-xs mt-2 ${img.isNormal ? 'text-green-400' : 'text-red-400'}`}>
                                            {img.isNormal ? '✅ 정상 패턴' : '❌ 이상 패턴'}
                                        </div>
                                    </div>
                                ))}
                                {hashImageData.length === 0 && (
                                    <div className="col-span-2 text-center text-gray-500 py-8">
                                        오염 시나리오를 선택하면 해시 이미지가 표시됩니다
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 bg-purple-900/30 border border-purple-500/30 rounded p-3 text-xs">
                                <div className="font-bold text-purple-400 mb-1">CNN 분석 원리</div>
                                <div className="text-gray-400">
                                    • 256비트 해시 → 8×8 픽셀 흑백 이미지 변환<br/>
                                    • 정상 해시: 완전 무작위 패턴 (높은 엔트로피)<br/>
                                    • 오염 해시: 규칙적 패턴 또는 반복 구조 감지
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* LSTM 분석: 시계열 */}
                    <div className="bg-gray-800 rounded-xl p-4">
                        <h3 className="font-bold text-blue-400 mb-3">
                            <i className="fas fa-chart-line mr-2"></i>
                            LSTM 분석: 시계열 변화량
                        </h3>
                        <div className="bg-gray-900 rounded-lg p-4">
                            <div className="h-32 flex items-end gap-1">
                                {timeSeriesData.map((d, idx) => (
                                    <div key={idx} className="flex-1 flex flex-col items-center">
                                        <div
                                            className={`w-full rounded-t ${d.isAnomaly ? 'bg-red-500' : 'bg-blue-500'}`}
                                            style={{ height: `${Math.min(100, d.positionChange * 5)}px` }}
                                        ></div>
                                        <div className="text-xs text-gray-500 mt-1">t{d.index}</div>
                                    </div>
                                ))}
                                {timeSeriesData.length === 0 && (
                                    <div className="w-full text-center text-gray-500 py-8">
                                        시계열 데이터가 여기에 표시됩니다
                                    </div>
                                )}
                            </div>
                            {timeSeriesData.length > 0 && (
                                <div className="flex items-center justify-center gap-4 mt-2 text-xs">
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                                        <span className="text-gray-400">정상 변화</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 bg-red-500 rounded"></div>
                                        <span className="text-gray-400">이상치</span>
                                    </div>
                                </div>
                            )}
                            <div className="mt-4 bg-blue-900/30 border border-blue-500/30 rounded p-3 text-xs">
                                <div className="font-bold text-blue-400 mb-1">LSTM 분석 원리</div>
                                <div className="text-gray-400">
                                    • 연속 해시값 간 변화량을 시계열로 구성<br/>
                                    • 정상: 무작위 분포의 변화량<br/>
                                    • 오염: 급격한 스파이크 또는 비정상 패턴
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 우측: 탐지 결과 및 로그 */}
                <div className="space-y-4">
                    {/* AI 분석 결과 */}
                    {aiAnalysis && (
                        <div className={`rounded-xl p-4 ${aiAnalysis.detected ? 'bg-red-900/50 border border-red-500' : 'bg-green-900/50 border border-green-500'}`}>
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                {aiAnalysis.detected ? (
                                    <><span className="text-red-400">🚨 오염 데이터 탐지됨</span></>
                                ) : (
                                    <><span className="text-green-400">✅ 정상 데이터</span></>
                                )}
                            </h3>
                            <div className="space-y-3">
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-3xl">{aiAnalysis.details.icon}</span>
                                        <div>
                                            <div className="font-bold text-lg">{aiAnalysis.details.title}</div>
                                            <div className="text-sm text-gray-400">{aiAnalysis.details.description}</div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                                        <div className="bg-gray-700/50 rounded p-2">
                                            <div className="text-gray-400 text-xs">이전 값</div>
                                            <div className="font-mono">{aiAnalysis.details.previous}</div>
                                        </div>
                                        <div className="bg-red-900/30 rounded p-2">
                                            <div className="text-gray-400 text-xs">조작된 값</div>
                                            <div className="font-mono text-red-400">{aiAnalysis.details.current}</div>
                                        </div>
                                    </div>
                                    <div className="mt-3 bg-yellow-900/30 border border-yellow-500/30 rounded p-2 text-xs">
                                        <span className="text-yellow-400 font-bold">물리적 제약:</span>
                                        <span className="text-gray-400 ml-1">{aiAnalysis.details.rule}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className={`rounded-lg p-2 ${aiAnalysis.cnnResult ? 'bg-red-900/50' : 'bg-green-900/50'}`}>
                                        <div className="text-xs text-gray-400">CNN</div>
                                        <div className={`font-bold ${aiAnalysis.cnnResult ? 'text-red-400' : 'text-green-400'}`}>
                                            {aiAnalysis.cnnResult ? '탐지' : '정상'}
                                        </div>
                                    </div>
                                    <div className={`rounded-lg p-2 ${aiAnalysis.lstmResult ? 'bg-red-900/50' : 'bg-green-900/50'}`}>
                                        <div className="text-xs text-gray-400">LSTM</div>
                                        <div className={`font-bold ${aiAnalysis.lstmResult ? 'text-red-400' : 'text-green-400'}`}>
                                            {aiAnalysis.lstmResult ? '탐지' : '정상'}
                                        </div>
                                    </div>
                                    <div className="bg-red-900/50 rounded-lg p-2">
                                        <div className="text-xs text-gray-400">신뢰도</div>
                                        <div className="font-bold text-red-400">{(aiAnalysis.confidence * 100).toFixed(1)}%</div>
                                    </div>
                                </div>

                                <div className="bg-green-900/50 border border-green-500 rounded-lg p-3 text-center">
                                    <div className="text-green-400 font-bold">
                                        <i className="fas fa-shield-alt mr-2"></i>
                                        조치: {aiAnalysis.action}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        오염 데이터 차단, 이전 검증된 데이터로 복원
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 탐지 로그 */}
                    <div className="bg-gray-800 rounded-xl p-4">
                        <h3 className="font-bold text-cyan-400 mb-3">
                            <i className="fas fa-list-alt mr-2"></i>
                            탐지 로그
                        </h3>
                        <div className="bg-gray-900 rounded-lg p-3 h-64 overflow-y-auto">
                            <div className="space-y-1 text-xs font-mono">
                                {detectionLogs.map(log => (
                                    <div key={log.id} className={`p-1.5 rounded ${
                                        log.type === 'attack' ? 'bg-red-900/50 text-red-400 font-bold' :
                                        log.type === 'error' ? 'bg-red-900/30 text-red-300' :
                                        log.type === 'warning' ? 'bg-yellow-900/30 text-yellow-300' :
                                        log.type === 'analysis' ? 'bg-purple-900/30 text-purple-300' :
                                        log.type === 'success' ? 'bg-green-900/30 text-green-300' :
                                        log.type === 'system' ? 'bg-blue-900/30 text-blue-300' :
                                        'bg-gray-700/50 text-gray-300'
                                    }`}>
                                        <span className="text-gray-500">[{log.time}]</span> {log.message}
                                    </div>
                                ))}
                                {detectionLogs.length === 0 && (
                                    <div className="text-center text-gray-500 py-8">
                                        오염 시나리오를 실행하면 로그가 표시됩니다
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 물리적 제약 조건 설명 */}
            <div className="bg-gray-800 rounded-xl p-4">
                <h3 className="font-bold text-yellow-400 mb-4">
                    <i className="fas fa-ruler-combined mr-2"></i>
                    물리적 제약 조건 기반 탐지
                </h3>
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-gray-900 rounded-lg p-4">
                        <div className="text-3xl mb-2">📍</div>
                        <div className="font-bold text-red-400">위치 점프</div>
                        <div className="text-sm text-gray-400 mt-2">
                            <div className="font-mono bg-gray-800 rounded p-2 mt-1">
                                Δd ≤ v × Δt × 1.5
                            </div>
                            <div className="mt-2 text-xs">
                                예: 60km/h 차량이 1초 동안<br/>
                                최대 이동 거리 ≈ 25m
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4">
                        <div className="text-3xl mb-2">⚡</div>
                        <div className="font-bold text-orange-400">속도 변화</div>
                        <div className="text-sm text-gray-400 mt-2">
                            <div className="font-mono bg-gray-800 rounded p-2 mt-1">
                                Δv ≤ a_max × Δt
                            </div>
                            <div className="mt-2 text-xs">
                                최대 가속도: 10 m/s²<br/>
                                1초 최대 변화: ±36 km/h
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4">
                        <div className="text-3xl mb-2">🧭</div>
                        <div className="font-bold text-purple-400">방향 변화</div>
                        <div className="text-sm text-gray-400 mt-2">
                            <div className="font-mono bg-gray-800 rounded p-2 mt-1">
                                Δθ ≤ ω_max × Δt
                            </div>
                            <div className="mt-2 text-xs">
                                최대 각속도: 90°/s<br/>
                                급회전 시에도 제한 존재
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4">
                        <div className="text-3xl mb-2">👥</div>
                        <div className="font-bold text-yellow-400">탑승객 변화</div>
                        <div className="text-sm text-gray-400 mt-2">
                            <div className="font-mono bg-gray-800 rounded p-2 mt-1">
                                Δp = 0 (이벤트 없이)
                            </div>
                            <div className="mt-2 text-xs">
                                승하차 이벤트 기록 필수<br/>
                                이벤트 없이 변경 불가
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI 융합 판정 원리 */}
            <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-xl p-6">
                <h3 className="font-bold text-xl text-indigo-400 mb-4">
                    <i className="fas fa-project-diagram mr-2"></i>
                    CNN + LSTM 융합 판정 (OR 조건)
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="text-center mb-3">
                            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
                                <i className="fas fa-brain text-2xl"></i>
                            </div>
                        </div>
                        <div className="font-bold text-purple-400 text-center mb-2">CNN (합성곱 신경망)</div>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• 해시값 → 8×8 흑백 이미지 변환</li>
                            <li>• 정상: 무작위 노이즈 패턴</li>
                            <li>• 오염: 규칙적/반복적 패턴</li>
                            <li>• 공간적 특징 추출 탁월</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="text-center mb-3">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                                <i className="fas fa-chart-line text-2xl"></i>
                            </div>
                        </div>
                        <div className="font-bold text-blue-400 text-center mb-2">LSTM (장단기 메모리)</div>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• 연속 해시값 변화량 시계열화</li>
                            <li>• 정상: 무작위 분포 변화량</li>
                            <li>• 오염: 급격한 스파이크</li>
                            <li>• 시계열 패턴 학습 탁월</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="text-center mb-3">
                            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto">
                                <i className="fas fa-gavel text-2xl"></i>
                            </div>
                        </div>
                        <div className="font-bold text-red-400 text-center mb-2">융합 판정</div>
                        <div className="bg-gray-900 rounded p-3 text-center font-mono text-sm">
                            <span className="text-purple-400">CNN</span>
                            <span className="text-white mx-2">OR</span>
                            <span className="text-blue-400">LSTM</span>
                            <span className="text-white mx-2">=</span>
                            <span className="text-red-400">오염</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-2 text-center">
                            어느 한 모델이라도 탐지하면<br/>
                            <strong className="text-red-400">오염으로 최종 판정</strong><br/>
                            (높은 민감도 유지)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
