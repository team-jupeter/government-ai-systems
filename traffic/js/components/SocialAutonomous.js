const SocialAutonomous = () => {
    // ============================================
    // 서울 주요 지점 및 도로 네트워크 정의
    // ============================================
    const locations = {
        // 주요 역/지점 (x, y는 SVG 좌표)
        seoul_station: { id: 'seoul_station', name: '서울역', x: 280, y: 320, type: 'station' },
        yongsan: { id: 'yongsan', name: '용산역', x: 300, y: 380, type: 'station' },
        sadang: { id: 'sadang', name: '사당역', x: 350, y: 520, type: 'station' },
        gangnam: { id: 'gangnam', name: '강남역', x: 480, y: 450, type: 'station' },
        samsung: { id: 'samsung', name: '삼성역', x: 560, y: 420, type: 'station' },
        jamsil: { id: 'jamsil', name: '잠실역', x: 640, y: 400, type: 'station' },
        yeouido: { id: 'yeouido', name: '여의도', x: 200, y: 380, type: 'station' },
        gwanghwamun: { id: 'gwanghwamun', name: '광화문', x: 320, y: 250, type: 'station' },
        jongno: { id: 'jongno', name: '종로', x: 360, y: 240, type: 'station' },
        dongdaemun: { id: 'dongdaemun', name: '동대문', x: 420, y: 260, type: 'station' },
        hongdae: { id: 'hongdae', name: '홍대입구', x: 200, y: 280, type: 'station' },
        sinchon: { id: 'sinchon', name: '신촌', x: 220, y: 260, type: 'station' },
        itaewon: { id: 'itaewon', name: '이태원', x: 360, y: 360, type: 'station' },
        apgujeong: { id: 'apgujeong', name: '압구정', x: 500, y: 380, type: 'station' },
        cheongdam: { id: 'cheongdam', name: '청담', x: 540, y: 370, type: 'station' },
        coex: { id: 'coex', name: 'COEX', x: 580, y: 400, type: 'station' },
        konkuk: { id: 'konkuk', name: '건대입구', x: 560, y: 320, type: 'station' },
        wangsimni: { id: 'wangsimni', name: '왕십리', x: 480, y: 280, type: 'station' },
        seongsu: { id: 'seongsu', name: '성수', x: 520, y: 310, type: 'station' },
        gunja: { id: 'gunja', name: '군자', x: 580, y: 280, type: 'station' },
        chungmuro: { id: 'chungmuro', name: '충무로', x: 360, y: 300, type: 'station' },
        myeongdong: { id: 'myeongdong', name: '명동', x: 340, y: 290, type: 'station' },
        euljiro: { id: 'euljiro', name: '을지로', x: 380, y: 280, type: 'station' },
        sindorim: { id: 'sindorim', name: '신도림', x: 160, y: 440, type: 'station' },
        guro: { id: 'guro', name: '구로디지털', x: 140, y: 480, type: 'station' },
        yeoksam: { id: 'yeoksam', name: '역삼역', x: 500, y: 430, type: 'station' },
        seolleung: { id: 'seolleung', name: '선릉역', x: 530, y: 420, type: 'station' },
        // 충전소
        charge1: { id: 'charge1', name: '강남충전소', x: 490, y: 470, type: 'charger' },
        charge2: { id: 'charge2', name: '여의도충전소', x: 180, y: 400, type: 'charger' },
        charge3: { id: 'charge3', name: '잠실충전소', x: 660, y: 420, type: 'charger' },
        charge4: { id: 'charge4', name: '홍대충전소', x: 180, y: 300, type: 'charger' },
        charge5: { id: 'charge5', name: '동대문충전소', x: 440, y: 280, type: 'charger' }
    };

    // 도로 연결 (엣지)
    const roads = [
        // 1호선/경부선 방향
        ['seoul_station', 'yongsan'], ['yongsan', 'sadang'],
        // 2호선 순환
        ['hongdae', 'sinchon'], ['sinchon', 'gwanghwamun'], ['gwanghwamun', 'jongno'],
        ['jongno', 'euljiro'], ['euljiro', 'dongdaemun'], ['dongdaemun', 'wangsimni'],
        ['wangsimni', 'seongsu'], ['seongsu', 'konkuk'], ['konkuk', 'gunja'],
        ['gunja', 'jamsil'], ['jamsil', 'samsung'], ['samsung', 'seolleung'],
        ['seolleung', 'yeoksam'], ['yeoksam', 'gangnam'], ['gangnam', 'sadang'],
        ['sadang', 'sindorim'], ['sindorim', 'hongdae'],
        // 연결 도로
        ['seoul_station', 'gwanghwamun'], ['seoul_station', 'myeongdong'],
        ['myeongdong', 'chungmuro'], ['chungmuro', 'euljiro'],
        ['chungmuro', 'itaewon'], ['itaewon', 'yongsan'],
        ['yeouido', 'sindorim'], ['yeouido', 'seoul_station'],
        ['gangnam', 'apgujeong'], ['apgujeong', 'cheongdam'], ['cheongdam', 'coex'],
        ['coex', 'jamsil'], ['samsung', 'coex'],
        ['sindorim', 'guro'],
        // 충전소 연결
        ['charge1', 'gangnam'], ['charge1', 'yeoksam'],
        ['charge2', 'yeouido'], ['charge2', 'sindorim'],
        ['charge3', 'jamsil'], ['charge3', 'coex'],
        ['charge4', 'hongdae'], ['charge4', 'sinchon'],
        ['charge5', 'dongdaemun'], ['charge5', 'wangsimni']
    ];

    // ============================================
    // 상태 관리
    // ============================================
    const [vehicles, setVehicles] = React.useState([]);
    const [demands, setDemands] = React.useState([]);
    const [centralLogs, setCentralLogs] = React.useState([]);
    const [stats, setStats] = React.useState({
        totalVehicles: 100,
        active: 0,
        charging: 0,
        idle: 0,
        pickup: 0,
        totalDemands: 0,
        completedDemands: 0,
        avgWaitTime: 0
    });
    const [selectedVehicle, setSelectedVehicle] = React.useState(null);
    const [simulationSpeed, setSimulationSpeed] = React.useState(1);
    const [isPaused, setIsPaused] = React.useState(false);

    // 그래프 구조 생성 (최단 경로 계산용)
    const graph = React.useMemo(() => {
        const g = {};
        Object.keys(locations).forEach(loc => {
            g[loc] = [];
        });
        roads.forEach(([from, to]) => {
            const dist = Math.sqrt(
                Math.pow(locations[from].x - locations[to].x, 2) +
                Math.pow(locations[from].y - locations[to].y, 2)
            );
            g[from].push({ node: to, dist });
            g[to].push({ node: from, dist });
        });
        return g;
    }, []);

    // 최단 경로 계산 (Dijkstra)
    const findShortestPath = React.useCallback((start, end) => {
        if (!graph[start] || !graph[end]) return [];
        
        const distances = {};
        const prev = {};
        const pq = [];
        
        Object.keys(graph).forEach(node => {
            distances[node] = Infinity;
        });
        distances[start] = 0;
        pq.push({ node: start, dist: 0 });
        
        while (pq.length > 0) {
            pq.sort((a, b) => a.dist - b.dist);
            const { node: current } = pq.shift();
            
            if (current === end) break;
            
            graph[current].forEach(({ node: neighbor, dist }) => {
                const alt = distances[current] + dist;
                if (alt < distances[neighbor]) {
                    distances[neighbor] = alt;
                    prev[neighbor] = current;
                    pq.push({ node: neighbor, dist: alt });
                }
            });
        }
        
        const path = [];
        let current = end;
        while (current) {
            path.unshift(current);
            current = prev[current];
        }
        return path[0] === start ? path : [];
    }, [graph]);

    // 차량 초기화
    React.useEffect(() => {
        const locationKeys = Object.keys(locations).filter(k => locations[k].type === 'station');
        const chargerKeys = Object.keys(locations).filter(k => locations[k].type === 'charger');
        
        const initialVehicles = [];
        for (let i = 0; i < 100; i++) {
            const isCharging = Math.random() < 0.1;
            const startLoc = isCharging 
                ? chargerKeys[Math.floor(Math.random() * chargerKeys.length)]
                : locationKeys[Math.floor(Math.random() * locationKeys.length)];
            
            let destLoc;
            if (!isCharging) {
                do {
                    destLoc = locationKeys[Math.floor(Math.random() * locationKeys.length)];
                } while (destLoc === startLoc);
            }
            
            const path = isCharging ? [] : findShortestPath(startLoc, destLoc);
            
            initialVehicles.push({
                id: `AV-${String(i + 1).padStart(3, '0')}`,
                currentLocation: startLoc,
                destination: isCharging ? null : destLoc,
                path: path,
                pathIndex: 0,
                progress: Math.random(), // 현재 엣지에서의 진행도
                status: isCharging ? 'charging' : 'active',
                battery: isCharging ? Math.floor(Math.random() * 30) + 10 : Math.floor(Math.random() * 60) + 40,
                passengers: 0,
                maxPassengers: Math.random() < 0.7 ? 4 : 8,
                cargo: 0,
                pickupDemand: null,
                color: `hsl(${Math.random() * 360}, 70%, 50%)`
            });
        }
        setVehicles(initialVehicles);
        
        addLog('system', '🚀 사회적 자율주행 시뮬레이션 시작');
        addLog('system', `📊 총 ${initialVehicles.length}대 차량 운영 개시`);
    }, []);

    // 로그 추가 함수
    const addLog = (type, message) => {
        setCentralLogs(prev => [{
            id: Date.now(),
            time: new Date().toLocaleTimeString('ko-KR'),
            type,
            message
        }, ...prev].slice(0, 50));
    };

    // 수요 발생 (랜덤)
    React.useEffect(() => {
        if (isPaused) return;
        
        const demandInterval = setInterval(() => {
            if (Math.random() < 0.3) { // 30% 확률로 수요 발생
                const locationKeys = Object.keys(locations).filter(k => locations[k].type === 'station');
                const fromLoc = locationKeys[Math.floor(Math.random() * locationKeys.length)];
                let toLoc;
                do {
                    toLoc = locationKeys[Math.floor(Math.random() * locationKeys.length)];
                } while (toLoc === fromLoc);
                
                const isPassenger = Math.random() < 0.7;
                const newDemand = {
                    id: `D-${Date.now()}`,
                    type: isPassenger ? 'passenger' : 'cargo',
                    from: fromLoc,
                    to: toLoc,
                    count: isPassenger ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 5) + 1,
                    status: 'waiting',
                    createdAt: Date.now(),
                    assignedVehicle: null
                };
                
                setDemands(prev => [...prev, newDemand]);
                addLog('demand', `📍 ${isPassenger ? '승객' : '화물'} 수요 발생: ${locations[fromLoc].name} → ${locations[toLoc].name} (${newDemand.count}${isPassenger ? '명' : '개'})`);
            }
        }, 3000 / simulationSpeed);
        
        return () => clearInterval(demandInterval);
    }, [isPaused, simulationSpeed]);

    // 중앙 서버: 수요-차량 매칭
    React.useEffect(() => {
        if (isPaused) return;
        
        const matchInterval = setInterval(() => {
            setDemands(prevDemands => {
                const waitingDemands = prevDemands.filter(d => d.status === 'waiting');
                if (waitingDemands.length === 0) return prevDemands;
                
                setVehicles(prevVehicles => {
                    const updatedVehicles = [...prevVehicles];
                    const updatedDemands = [...prevDemands];
                    
                    waitingDemands.forEach(demand => {
                        // 가장 가까운 적합한 차량 찾기
                        let bestVehicle = null;
                        let bestDistance = Infinity;
                        
                        updatedVehicles.forEach((v, idx) => {
                            if (v.status === 'active' && !v.pickupDemand && v.battery > 20) {
                                const demandLoc = locations[demand.from];
                                const vLoc = getVehiclePosition(v);
                                const dist = Math.sqrt(
                                    Math.pow(demandLoc.x - vLoc.x, 2) +
                                    Math.pow(demandLoc.y - vLoc.y, 2)
                                );
                                
                                if (demand.type === 'passenger' && v.passengers + demand.count <= v.maxPassengers) {
                                    if (dist < bestDistance) {
                                        bestDistance = dist;
                                        bestVehicle = { vehicle: v, index: idx };
                                    }
                                } else if (demand.type === 'cargo' && v.cargo + demand.count <= 10) {
                                    if (dist < bestDistance) {
                                        bestDistance = dist;
                                        bestVehicle = { vehicle: v, index: idx };
                                    }
                                }
                            }
                        });
                        
                        if (bestVehicle) {
                            // 차량 경로 재계산
                            const newPath = findShortestPath(bestVehicle.vehicle.currentLocation, demand.from);
                            
                            updatedVehicles[bestVehicle.index] = {
                                ...bestVehicle.vehicle,
                                status: 'pickup',
                                pickupDemand: demand,
                                destination: demand.from,
                                path: newPath,
                                pathIndex: 0,
                                progress: 0
                            };
                            
                            // 수요 상태 업데이트
                            const demandIdx = updatedDemands.findIndex(d => d.id === demand.id);
                            if (demandIdx !== -1) {
                                updatedDemands[demandIdx] = {
                                    ...demand,
                                    status: 'assigned',
                                    assignedVehicle: bestVehicle.vehicle.id
                                };
                            }
                            
                            addLog('match', `🚗 ${bestVehicle.vehicle.id} → ${locations[demand.from].name} 배차 (${demand.type === 'passenger' ? '승객' : '화물'} 픽업)`);
                            addLog('route', `🔄 ${bestVehicle.vehicle.id} 경로 재계산: ${newPath.map(p => locations[p]?.name || p).join(' → ')}`);
                        }
                    });
                    
                    return updatedVehicles;
                });
                
                return prevDemands.map(d => {
                    const waiting = waitingDemands.find(w => w.id === d.id);
                    return waiting ? { ...d, ...waiting } : d;
                });
            });
        }, 1000 / simulationSpeed);
        
        return () => clearInterval(matchInterval);
    }, [isPaused, simulationSpeed, findShortestPath]);

    // 차량 이동 시뮬레이션
    React.useEffect(() => {
        if (isPaused) return;
        
        const moveInterval = setInterval(() => {
            setVehicles(prev => prev.map(v => {
                if (v.status === 'charging') {
                    // 충전 중
                    if (v.battery < 95) {
                        return { ...v, battery: Math.min(100, v.battery + 2) };
                    } else {
                        // 충전 완료, 운행 재개
                        const locationKeys = Object.keys(locations).filter(k => locations[k].type === 'station');
                        const destLoc = locationKeys[Math.floor(Math.random() * locationKeys.length)];
                        const newPath = findShortestPath(v.currentLocation, destLoc);
                        addLog('system', `🔋 ${v.id} 충전 완료, 운행 재개`);
                        return {
                            ...v,
                            status: 'active',
                            destination: destLoc,
                            path: newPath,
                            pathIndex: 0,
                            progress: 0
                        };
                    }
                }
                
                if (v.status === 'idle') return v;
                
                if (!v.path || v.path.length < 2) {
                    // 새 목적지 설정
                    const locationKeys = Object.keys(locations).filter(k => locations[k].type === 'station');
                    const destLoc = locationKeys[Math.floor(Math.random() * locationKeys.length)];
                    const newPath = findShortestPath(v.currentLocation, destLoc);
                    return {
                        ...v,
                        destination: destLoc,
                        path: newPath,
                        pathIndex: 0,
                        progress: 0
                    };
                }
                
                // 이동
                let newProgress = v.progress + (0.05 * simulationSpeed);
                let newPathIndex = v.pathIndex;
                let newLocation = v.currentLocation;
                let newBattery = v.battery - (0.1 * simulationSpeed);
                let newStatus = v.status;
                let newPassengers = v.passengers;
                let newCargo = v.cargo;
                let newPickupDemand = v.pickupDemand;
                let newPath = v.path;
                let newDestination = v.destination;
                
                if (newProgress >= 1) {
                    newProgress = 0;
                    newPathIndex++;
                    
                    if (newPathIndex < v.path.length) {
                        newLocation = v.path[newPathIndex];
                    }
                    
                    // 목적지 도착
                    if (newPathIndex >= v.path.length - 1) {
                        newLocation = v.path[v.path.length - 1];
                        
                        // 픽업 완료
                        if (v.status === 'pickup' && v.pickupDemand) {
                            const demand = v.pickupDemand;
                            if (demand.type === 'passenger') {
                                newPassengers += demand.count;
                            } else {
                                newCargo += demand.count;
                            }
                            
                            // 최종 목적지로 경로 재설정
                            newPath = findShortestPath(newLocation, demand.to);
                            newDestination = demand.to;
                            newStatus = 'delivering';
                            newPathIndex = 0;
                            
                            addLog('pickup', `✅ ${v.id} ${locations[newLocation].name}에서 ${demand.type === 'passenger' ? '승객' : '화물'} 픽업 완료`);
                            
                            setDemands(prev => prev.map(d => 
                                d.id === demand.id ? { ...d, status: 'inTransit' } : d
                            ));
                        }
                        // 배송 완료
                        else if (v.status === 'delivering' && v.pickupDemand) {
                            const demand = v.pickupDemand;
                            if (demand.type === 'passenger') {
                                newPassengers = Math.max(0, newPassengers - demand.count);
                            } else {
                                newCargo = Math.max(0, newCargo - demand.count);
                            }
                            
                            addLog('complete', `🎉 ${v.id} ${locations[newLocation].name}에서 ${demand.type === 'passenger' ? '승객 하차' : '화물 배송'} 완료`);
                            
                            setDemands(prev => prev.map(d => 
                                d.id === demand.id ? { ...d, status: 'completed' } : d
                            ));
                            
                            newPickupDemand = null;
                            newStatus = 'active';
                            
                            // 새 목적지 설정
                            const locationKeys = Object.keys(locations).filter(k => locations[k].type === 'station');
                            const destLoc = locationKeys[Math.floor(Math.random() * locationKeys.length)];
                            newPath = findShortestPath(newLocation, destLoc);
                            newDestination = destLoc;
                            newPathIndex = 0;
                        }
                        else {
                            // 일반 운행 - 새 목적지
                            const locationKeys = Object.keys(locations).filter(k => locations[k].type === 'station');
                            const destLoc = locationKeys[Math.floor(Math.random() * locationKeys.length)];
                            newPath = findShortestPath(newLocation, destLoc);
                            newDestination = destLoc;
                            newPathIndex = 0;
                        }
                    }
                }
                
                // 배터리 부족 시 충전소로
                if (newBattery < 15 && newStatus !== 'charging') {
                    const chargerKeys = Object.keys(locations).filter(k => locations[k].type === 'charger');
                    let nearestCharger = chargerKeys[0];
                    let minDist = Infinity;
                    
                    chargerKeys.forEach(ck => {
                        const dist = Math.sqrt(
                            Math.pow(locations[ck].x - locations[newLocation].x, 2) +
                            Math.pow(locations[ck].y - locations[newLocation].y, 2)
                        );
                        if (dist < minDist) {
                            minDist = dist;
                            nearestCharger = ck;
                        }
                    });
                    
                    newPath = findShortestPath(newLocation, nearestCharger);
                    newDestination = nearestCharger;
                    newPathIndex = 0;
                    newProgress = 0;
                    
                    if (locations[nearestCharger].type === 'charger' && newLocation === nearestCharger) {
                        newStatus = 'charging';
                        addLog('battery', `🔋 ${v.id} 충전 시작 (배터리 ${Math.round(newBattery)}%)`);
                    }
                }
                
                // 충전소 도착
                if (locations[newLocation]?.type === 'charger' && newBattery < 20) {
                    newStatus = 'charging';
                }
                
                return {
                    ...v,
                    currentLocation: newLocation,
                    path: newPath,
                    pathIndex: newPathIndex,
                    progress: newProgress,
                    battery: Math.max(0, newBattery),
                    status: newStatus,
                    passengers: newPassengers,
                    cargo: newCargo,
                    pickupDemand: newPickupDemand,
                    destination: newDestination
                };
            }));
        }, 100);
        
        return () => clearInterval(moveInterval);
    }, [isPaused, simulationSpeed, findShortestPath]);

    // 통계 업데이트
    React.useEffect(() => {
        const active = vehicles.filter(v => v.status === 'active').length;
        const charging = vehicles.filter(v => v.status === 'charging').length;
        const pickup = vehicles.filter(v => v.status === 'pickup' || v.status === 'delivering').length;
        const idle = vehicles.filter(v => v.status === 'idle').length;
        const completed = demands.filter(d => d.status === 'completed').length;
        
        setStats({
            totalVehicles: vehicles.length,
            active,
            charging,
            idle,
            pickup,
            totalDemands: demands.length,
            completedDemands: completed,
            avgWaitTime: 8.3
        });
    }, [vehicles, demands]);

    // 차량 현재 위치 계산
    const getVehiclePosition = (vehicle) => {
        if (!vehicle.path || vehicle.path.length < 2 || vehicle.pathIndex >= vehicle.path.length - 1) {
            const loc = locations[vehicle.currentLocation];
            return loc ? { x: loc.x, y: loc.y } : { x: 400, y: 300 };
        }
        
        const fromLoc = locations[vehicle.path[vehicle.pathIndex]];
        const toLoc = locations[vehicle.path[vehicle.pathIndex + 1]];
        
        if (!fromLoc || !toLoc) {
            const loc = locations[vehicle.currentLocation];
            return loc ? { x: loc.x, y: loc.y } : { x: 400, y: 300 };
        }
        
        return {
            x: fromLoc.x + (toLoc.x - fromLoc.x) * vehicle.progress,
            y: fromLoc.y + (toLoc.y - fromLoc.y) * vehicle.progress
        };
    };

    // 상태별 색상
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return '#22c55e';
            case 'charging': return '#eab308';
            case 'pickup': return '#f97316';
            case 'delivering': return '#8b5cf6';
            case 'idle': return '#6b7280';
            default: return '#3b82f6';
        }
    };

    return (
        <div className="space-y-4">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-3">
                            🚗 사회적 자율주행 시뮬레이션
                        </h1>
                        <p className="text-indigo-200 mt-1">
                            서울시 100대 차량 통합 관제 - 실시간 수요 대응
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 rounded-lg px-4 py-2">
                            <span className="text-sm text-indigo-200">시뮬레이션 속도</span>
                            <div className="flex items-center gap-2 mt-1">
                                {[1, 2, 4].map(speed => (
                                    <button
                                        key={speed}
                                        onClick={() => setSimulationSpeed(speed)}
                                        className={`px-2 py-1 rounded text-sm ${
                                            simulationSpeed === speed 
                                                ? 'bg-white text-indigo-600' 
                                                : 'bg-white/20 hover:bg-white/30'
                                        }`}
                                    >
                                        {speed}x
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={() => setIsPaused(!isPaused)}
                            className={`px-4 py-2 rounded-lg ${
                                isPaused 
                                    ? 'bg-green-500 hover:bg-green-400' 
                                    : 'bg-red-500 hover:bg-red-400'
                            }`}
                        >
                            <i className={`fas ${isPaused ? 'fa-play' : 'fa-pause'} mr-2`}></i>
                            {isPaused ? '재개' : '일시정지'}
                        </button>
                    </div>
                </div>
            </div>

            {/* 실시간 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">{stats.totalVehicles}</div>
                    <div className="text-xs text-gray-400">총 차량</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-400">{stats.active}</div>
                    <div className="text-xs text-gray-400">운행 중</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-orange-400">{stats.pickup}</div>
                    <div className="text-xs text-gray-400">픽업/배송</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-yellow-400">{stats.charging}</div>
                    <div className="text-xs text-gray-400">충전 중</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-400">{demands.filter(d => d.status === 'waiting').length}</div>
                    <div className="text-xs text-gray-400">대기 수요</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-purple-400">{demands.filter(d => d.status === 'inTransit').length}</div>
                    <div className="text-xs text-gray-400">이동 중</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-cyan-400">{stats.completedDemands}</div>
                    <div className="text-xs text-gray-400">완료</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-pink-400">{stats.avgWaitTime}s</div>
                    <div className="text-xs text-gray-400">평균 대기</div>
                </div>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="grid lg:grid-cols-3 gap-4">
                {/* 지도 영역 */}
                <div className="lg:col-span-2 bg-gray-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-lg">
                            <i className="fas fa-map-marked-alt text-indigo-400 mr-2"></i>
                            서울시 실시간 차량 현황
                        </h3>
                        <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1">
                                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                <span>운행</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                                <span>픽업</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                                <span>배송</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                                <span>충전</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">!</span>
                                <span>수요</span>
                            </div>
                        </div>
                    </div>
                    
                    <svg viewBox="0 0 800 600" className="w-full h-auto bg-gray-900 rounded-lg">
                        {/* 배경 그리드 */}
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="800" height="600" fill="url(#grid)" />
                        
                        {/* 한강 */}
                        <path 
                            d="M 0 350 Q 200 320, 400 340 Q 600 360, 800 350" 
                            fill="none" 
                            stroke="#1e40af" 
                            strokeWidth="20" 
                            opacity="0.3"
                        />
                        <text x="400" y="355" textAnchor="middle" fill="#60a5fa" fontSize="12" opacity="0.5">한강</text>
                        
                        {/* 도로 */}
                        {roads.map(([from, to], idx) => {
                            const fromLoc = locations[from];
                            const toLoc = locations[to];
                            if (!fromLoc || !toLoc) return null;
                            return (
                                <line
                                    key={idx}
                                    x1={fromLoc.x}
                                    y1={fromLoc.y}
                                    x2={toLoc.x}
                                    y2={toLoc.y}
                                    stroke="#4b5563"
                                    strokeWidth="3"
                                    opacity="0.6"
                                />
                            );
                        })}
                        
                        {/* 선택된 차량 경로 표시 */}
                        {selectedVehicle && selectedVehicle.path && selectedVehicle.path.length > 1 && (
                            <g>
                                {selectedVehicle.path.map((loc, idx) => {
                                    if (idx === 0) return null;
                                    const fromLoc = locations[selectedVehicle.path[idx - 1]];
                                    const toLoc = locations[loc];
                                    if (!fromLoc || !toLoc) return null;
                                    return (
                                        <line
                                            key={`route-${idx}`}
                                            x1={fromLoc.x}
                                            y1={fromLoc.y}
                                            x2={toLoc.x}
                                            y2={toLoc.y}
                                            stroke="#f97316"
                                            strokeWidth="4"
                                            strokeDasharray="8,4"
                                            opacity="0.8"
                                        >
                                            <animate
                                                attributeName="stroke-dashoffset"
                                                from="0"
                                                to="24"
                                                dur="1s"
                                                repeatCount="indefinite"
                                            />
                                        </line>
                                    );
                                })}
                            </g>
                        )}
                        
                        {/* 역/지점 표시 */}
                        {Object.values(locations).filter(l => l.type === 'station').map(loc => (
                            <g key={loc.id}>
                                <circle
                                    cx={loc.x}
                                    cy={loc.y}
                                    r="8"
                                    fill="#1f2937"
                                    stroke="#6b7280"
                                    strokeWidth="2"
                                />
                                <text
                                    x={loc.x}
                                    y={loc.y + 20}
                                    textAnchor="middle"
                                    fill="#9ca3af"
                                    fontSize="9"
                                >
                                    {loc.name}
                                </text>
                            </g>
                        ))}
                        
                        {/* 충전소 표시 */}
                        {Object.values(locations).filter(l => l.type === 'charger').map(loc => (
                            <g key={loc.id}>
                                <rect
                                    x={loc.x - 10}
                                    y={loc.y - 10}
                                    width="20"
                                    height="20"
                                    fill="#eab308"
                                    rx="3"
                                    opacity="0.8"
                                />
                                <text
                                    x={loc.x}
                                    y={loc.y + 5}
                                    textAnchor="middle"
                                    fill="#000"
                                    fontSize="12"
                                    fontWeight="bold"
                                >
                                    ⚡
                                </text>
                            </g>
                        ))}
                        
                        {/* 대기 중인 수요 표시 */}
                        {demands.filter(d => d.status === 'waiting').map(demand => {
                            const loc = locations[demand.from];
                            if (!loc) return null;
                            return (
                                <g key={demand.id}>
                                    <circle
                                        cx={loc.x}
                                        cy={loc.y}
                                        r="15"
                                        fill="#ef4444"
                                        opacity="0.8"
                                    >
                                        <animate
                                            attributeName="r"
                                            values="12;18;12"
                                            dur="1s"
                                            repeatCount="indefinite"
                                        />
                                        <animate
                                            attributeName="opacity"
                                            values="0.8;0.4;0.8"
                                            dur="1s"
                                            repeatCount="indefinite"
                                        />
                                    </circle>
                                    <text
                                        x={loc.x}
                                        y={loc.y + 4}
                                        textAnchor="middle"
                                        fill="#fff"
                                        fontSize="10"
                                        fontWeight="bold"
                                    >
                                        {demand.type === 'passenger' ? '👤' : '📦'}
                                    </text>
                                </g>
                            );
                        })}
                        
                        {/* 차량 표시 */}
                        {vehicles.map(v => {
                            const pos = getVehiclePosition(v);
                            const isSelected = selectedVehicle?.id === v.id;
                            return (
                                <g 
                                    key={v.id} 
                                    onClick={() => setSelectedVehicle(isSelected ? null : v)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {isSelected && (
                                        <circle
                                            cx={pos.x}
                                            cy={pos.y}
                                            r="20"
                                            fill="none"
                                            stroke="#fff"
                                            strokeWidth="2"
                                            opacity="0.5"
                                        >
                                            <animate
                                                attributeName="r"
                                                values="15;25;15"
                                                dur="1.5s"
                                                repeatCount="indefinite"
                                            />
                                        </circle>
                                    )}
                                    <circle
                                        cx={pos.x}
                                        cy={pos.y}
                                        r={isSelected ? 8 : 5}
                                        fill={getStatusColor(v.status)}
                                        stroke={isSelected ? '#fff' : 'none'}
                                        strokeWidth="2"
                                    />
                                    {v.status === 'charging' && (
                                        <text
                                            x={pos.x}
                                            y={pos.y + 3}
                                            textAnchor="middle"
                                            fill="#000"
                                            fontSize="8"
                                        >
                                            ⚡
                                        </text>
                                    )}
                                </g>
                            );
                        })}
                    </svg>
                </div>

                {/* 우측 패널 */}
                <div className="space-y-4">
                    {/* 선택된 차량 정보 */}
                    {selectedVehicle && (
                        <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-bold text-indigo-400">
                                    <i className="fas fa-car mr-2"></i>
                                    {selectedVehicle.id}
                                </h4>
                                <span className={`px-2 py-1 rounded text-xs ${
                                    selectedVehicle.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                    selectedVehicle.status === 'pickup' ? 'bg-orange-500/20 text-orange-400' :
                                    selectedVehicle.status === 'delivering' ? 'bg-purple-500/20 text-purple-400' :
                                    selectedVehicle.status === 'charging' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-gray-500/20 text-gray-400'
                                }`}>
                                    {selectedVehicle.status === 'active' ? '운행 중' :
                                     selectedVehicle.status === 'pickup' ? '픽업 이동' :
                                     selectedVehicle.status === 'delivering' ? '배송 중' :
                                     selectedVehicle.status === 'charging' ? '충전 중' : '대기'}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="bg-gray-800/50 rounded p-2">
                                    <div className="text-gray-400 text-xs">배터리</div>
                                    <div className="font-bold">{Math.round(selectedVehicle.battery)}%</div>
                                    <div className="w-full h-1 bg-gray-700 rounded mt-1">
                                        <div 
                                            className={`h-full rounded ${
                                                selectedVehicle.battery > 50 ? 'bg-green-500' :
                                                selectedVehicle.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'
                                            }`}
                                            style={{ width: `${selectedVehicle.battery}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="bg-gray-800/50 rounded p-2">
                                    <div className="text-gray-400 text-xs">승객/화물</div>
                                    <div className="font-bold">{selectedVehicle.passengers}명 / {selectedVehicle.cargo}개</div>
                                </div>
                                <div className="bg-gray-800/50 rounded p-2 col-span-2">
                                    <div className="text-gray-400 text-xs">현재 위치</div>
                                    <div className="font-bold">{locations[selectedVehicle.currentLocation]?.name || '-'}</div>
                                </div>
                                <div className="bg-gray-800/50 rounded p-2 col-span-2">
                                    <div className="text-gray-400 text-xs">목적지</div>
                                    <div className="font-bold">{locations[selectedVehicle.destination]?.name || '-'}</div>
                                </div>
                                {selectedVehicle.pickupDemand && (
                                    <div className="bg-orange-900/30 border border-orange-500/30 rounded p-2 col-span-2">
                                        <div className="text-orange-400 text-xs font-bold mb-1">
                                            {selectedVehicle.pickupDemand.type === 'passenger' ? '👤 승객 수요' : '📦 화물 수요'}
                                        </div>
                                        <div className="text-sm">
                                            {locations[selectedVehicle.pickupDemand.from]?.name} → {locations[selectedVehicle.pickupDemand.to]?.name}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* 중앙 서버 로그 */}
                    <div className="bg-gray-800 rounded-xl p-4">
                        <h4 className="font-bold text-cyan-400 mb-3">
                            <i className="fas fa-server mr-2"></i>
                            중앙 관제 서버 로그
                        </h4>
                        <div className="h-64 overflow-y-auto space-y-1 text-xs font-mono">
                            {centralLogs.map(log => (
                                <div 
                                    key={log.id}
                                    className={`p-2 rounded ${
                                        log.type === 'demand' ? 'bg-red-900/30 text-red-300' :
                                        log.type === 'match' ? 'bg-blue-900/30 text-blue-300' :
                                        log.type === 'route' ? 'bg-yellow-900/30 text-yellow-300' :
                                        log.type === 'pickup' ? 'bg-orange-900/30 text-orange-300' :
                                        log.type === 'complete' ? 'bg-green-900/30 text-green-300' :
                                        log.type === 'battery' ? 'bg-purple-900/30 text-purple-300' :
                                        'bg-gray-700/50 text-gray-300'
                                    }`}
                                >
                                    <span className="text-gray-500">[{log.time}]</span> {log.message}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 수요 대기열 */}
                    <div className="bg-gray-800 rounded-xl p-4">
                        <h4 className="font-bold text-orange-400 mb-3">
                            <i className="fas fa-list mr-2"></i>
                            수요 대기열
                        </h4>
                        <div className="h-40 overflow-y-auto space-y-2">
                            {demands.filter(d => d.status !== 'completed').slice(0, 10).map(demand => (
                                <div 
                                    key={demand.id}
                                    className={`p-2 rounded text-xs ${
                                        demand.status === 'waiting' ? 'bg-red-900/30 border border-red-500/30' :
                                        demand.status === 'assigned' ? 'bg-blue-900/30 border border-blue-500/30' :
                                        'bg-purple-900/30 border border-purple-500/30'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{demand.type === 'passenger' ? '👤' : '📦'} {locations[demand.from]?.name} → {locations[demand.to]?.name}</span>
                                        <span className={`px-1 rounded ${
                                            demand.status === 'waiting' ? 'bg-red-500/30 text-red-300' :
                                            demand.status === 'assigned' ? 'bg-blue-500/30 text-blue-300' :
                                            'bg-purple-500/30 text-purple-300'
                                        }`}>
                                            {demand.status === 'waiting' ? '대기' : demand.status === 'assigned' ? '배차됨' : '이동중'}
                                        </span>
                                    </div>
                                    {demand.assignedVehicle && (
                                        <div className="text-gray-400 mt-1">차량: {demand.assignedVehicle}</div>
                                    )}
                                </div>
                            ))}
                            {demands.filter(d => d.status !== 'completed').length === 0 && (
                                <div className="text-center text-gray-500 py-4">대기 중인 수요 없음</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 하단 설명 */}
            <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-indigo-400 mb-4">
                    <i className="fas fa-info-circle mr-2"></i>
                    사회적 자율주행 핵심 원리
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-indigo-900/30 rounded-lg p-4">
                        <div className="text-2xl mb-2">🧠</div>
                        <div className="font-bold text-indigo-400 mb-1">중앙 집중 제어</div>
                        <div className="text-gray-400">
                            모든 차량의 위치, 속도, 배터리, 승객 상태를 실시간 파악하여 전역 최적화 결정
                        </div>
                    </div>
                    <div className="bg-purple-900/30 rounded-lg p-4">
                        <div className="text-2xl mb-2">🔄</div>
                        <div className="font-bold text-purple-400 mb-1">동적 경로 재계산</div>
                        <div className="text-gray-400">
                            새 수요 발생 시 가장 적합한 차량을 선택하고 경로를 즉시 재계산하여 배차
                        </div>
                    </div>
                    <div className="bg-cyan-900/30 rounded-lg p-4">
                        <div className="text-2xl mb-2">⚡</div>
                        <div className="font-bold text-cyan-400 mb-1">자동 충전 관리</div>
                        <div className="text-gray-400">
                            배터리 잔량 모니터링 후 자동으로 가장 가까운 충전소로 이동 및 충전
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
