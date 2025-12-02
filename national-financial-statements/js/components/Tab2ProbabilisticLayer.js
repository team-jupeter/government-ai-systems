const { useState, useEffect, useRef } = React;

function Tab2ProbabilisticLayer() {
    const [activeConnections, setActiveConnections] = useState([]);
    const animationRef = useRef(null);
    
    // 노드 구조 정의 (왼쪽에서 오른쪽으로 배치)
    const nodes = {
        edge: Array.from({length: 10}, (_, i) => ({
            id: `edge-${i}`,
            x: 80,
            y: 80 + i * 55,
            label: `직원${i+1}`,
            color: '#3B82F6',
            layer: 0
        })),
        layer1: Array.from({length: 5}, (_, i) => ({
            id: `l1-${i}`,
            x: 280,
            y: 140 + i * 110,
            label: `부서${i+1}`,
            color: '#10B981',
            layer: 1
        })),
        layer2: Array.from({length: 2}, (_, i) => ({
            id: `l2-${i}`,
            x: 480,
            y: 240 + i * 180,
            label: `기관${i+1}`,
            color: '#8B5CF6',
            layer: 2
        })),
        layer3: Array.from({length: 2}, (_, i) => ({
            id: `l3-${i}`,
            x: 680,
            y: 240 + i * 180,
            label: `부처${i+1}`,
            color: '#F59E0B',
            layer: 3
        })),
        layer4: [{
            id: 'l4-0',
            x: 880,
            y: 330,
            label: '국가데이터처',
            color: '#EF4444',
            layer: 4
        }]
    };

    const allNodes = [
        ...nodes.edge,
        ...nodes.layer1,
        ...nodes.layer2,
        ...nodes.layer3,
        ...nodes.layer4
    ];

    // 연결 추가 함수 (순차적 실행)
    const addConnection = (from, to) => {
        const requestId = `req-${from.id}-${to.id}-${Date.now()}`;
        
        // 1단계: 왼쪽 → 오른쪽 (파란색 점선, Hash 전송)
        setActiveConnections(prev => [...prev, {
            id: requestId,
            from: from,
            to: to,
            color: 'blue',
            type: 'request',
            timestamp: Date.now()
        }]);

        // 1초 후 파란색 선 제거
        setTimeout(() => {
            setActiveConnections(prev => prev.filter(conn => conn.id !== requestId));
        }, 1000);

        // 2단계: 파란색이 도착한 후 (1초 후) 빨간색 응답 시작
        setTimeout(() => {
            const responseId = `res-${to.id}-${from.id}-${Date.now()}`;
            setActiveConnections(prev => [...prev, {
                id: responseId,
                from: to,
                to: from,
                color: 'red',
                type: 'response',
                timestamp: Date.now()
            }]);

            // 빨간색 선도 1초 후 제거
            setTimeout(() => {
                setActiveConnections(prev => prev.filter(conn => conn.id !== responseId));
            }, 1000);
        }, 1000); // 파란색 완료 후 빨간색 시작
    };

    // 애니메이션 루프
    useEffect(() => {
        const interval = setInterval(() => {
            const rand = Math.random();
            const edge = nodes.edge[Math.floor(Math.random() * nodes.edge.length)];
            
            // Edge에서 확률적으로 Layer 선택
            if (rand < 0.60) {
                // Edge → Layer 1 (60%)
                const l1 = nodes.layer1[Math.floor(Math.random() * nodes.layer1.length)];
                addConnection(edge, l1);
            } else if (rand < 0.85) {
                // Edge → Layer 2 (25%)
                const l2 = nodes.layer2[Math.floor(Math.random() * nodes.layer2.length)];
                addConnection(edge, l2);
            } else if (rand < 0.95) {
                // Edge → Layer 3 (10%)
                const l3 = nodes.layer3[Math.floor(Math.random() * nodes.layer3.length)];
                addConnection(edge, l3);
            } else {
                // Edge → Layer 4 (5%)
                const l4 = nodes.layer4[0];
                addConnection(edge, l4);
            }
        }, 2200); // 파란색(1초) + 빨간색(1초) + 여유(0.2초)

        // Layer 간 전파도 추가 (덜 빈번하게)
        const layerInterval = setInterval(() => {
            const rand = Math.random();
            
            if (rand < 0.4) {
                // Layer 1 → Layer 2
                const l1 = nodes.layer1[Math.floor(Math.random() * nodes.layer1.length)];
                const l2 = nodes.layer2[Math.floor(Math.random() * nodes.layer2.length)];
                addConnection(l1, l2);
            } else if (rand < 0.7) {
                // Layer 2 → Layer 3
                const l2 = nodes.layer2[Math.floor(Math.random() * nodes.layer2.length)];
                const l3 = nodes.layer3[Math.floor(Math.random() * nodes.layer3.length)];
                addConnection(l2, l3);
            } else {
                // Layer 3 → Layer 4
                const l3 = nodes.layer3[Math.floor(Math.random() * nodes.layer3.length)];
                const l4 = nodes.layer4[0];
                addConnection(l3, l4);
            }
        }, 3500);

        return () => {
            clearInterval(interval);
            clearInterval(layerInterval);
        };
    }, []);

    // Canvas 애니메이션
    useEffect(() => {
        const canvas = document.getElementById('hashChainCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const now = Date.now();
            
            activeConnections.forEach(conn => {
                const elapsed = now - conn.timestamp;
                const duration = 1000; // 1초
                const progress = Math.min(elapsed / duration, 1);
                
                // 현재 위치 계산
                const currentX = conn.from.x + (conn.to.x - conn.from.x) * progress;
                const currentY = conn.from.y + (conn.to.y - conn.from.y) * progress;
                
                // 점선 스타일
                ctx.setLineDash([8, 4]);
                ctx.lineWidth = 3;
                
                // 색상 설정 (파란색=요청, 빨간색=응답)
                if (conn.color === 'blue') {
                    ctx.strokeStyle = '#3B82F6';
                    ctx.shadowColor = '#3B82F6';
                    ctx.shadowBlur = 8;
                } else {
                    ctx.strokeStyle = '#EF4444';
                    ctx.shadowColor = '#EF4444';
                    ctx.shadowBlur = 8;
                }
                
                // 선 그리기
                ctx.beginPath();
                ctx.moveTo(conn.from.x, conn.from.y);
                ctx.lineTo(currentX, currentY);
                ctx.stroke();
                
                // 그림자 제거
                ctx.shadowBlur = 0;
                
                // 화살표 그리기 (진행 방향)
                if (progress > 0.1 && progress < 0.98) {
                    const angle = Math.atan2(conn.to.y - conn.from.y, conn.to.x - conn.from.x);
                    const arrowSize = 12;
                    
                    ctx.setLineDash([]);
                    ctx.fillStyle = conn.color === 'blue' ? '#3B82F6' : '#EF4444';
                    ctx.beginPath();
                    ctx.moveTo(currentX, currentY);
                    ctx.lineTo(
                        currentX - arrowSize * Math.cos(angle - Math.PI / 6),
                        currentY - arrowSize * Math.sin(angle - Math.PI / 6)
                    );
                    ctx.lineTo(
                        currentX - arrowSize * Math.cos(angle + Math.PI / 6),
                        currentY - arrowSize * Math.sin(angle + Math.PI / 6)
                    );
                    ctx.closePath();
                    ctx.fill();
                }
            });
            
            animationRef.current = requestAnimationFrame(animate);
        };
        
        animate();
        
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [activeConnections]);

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-gov-blue p-4">
                <p className="text-sm text-gov-text">
                    <span className="font-bold text-gov-blue">SHA-256 재해싱 기반 확률적 계층 선택</span>: 
                    Edge에서 생성된 해시가 <span className="font-bold text-green-600">Layer 1 (60%)</span>, 
                    <span className="font-bold text-purple-600"> Layer 2 (25%)</span>, 
                    <span className="font-bold text-orange-600"> Layer 3 (10%)</span>, 
                    <span className="font-bold text-red-600"> Layer 4 (5%)</span> 확률로 직접 전송됩니다.
                </p>
            </div>

            {/* 애니메이션 캔버스 */}
            <div className="bg-white border-2 border-gov-border rounded-lg p-6 relative" style={{height: '720px'}}>
                <h4 className="text-base font-bold text-gov-text mb-4 text-center">
                    확률적 계층 선택 실시간 애니메이션
                </h4>
                
                {/* 범례 */}
                <div className="absolute top-4 right-4 bg-gray-50 p-3 rounded border-2 border-gray-300 text-xs space-y-2 z-10">
                    <div className="flex items-center space-x-2">
                        <div className="w-12 h-1 bg-blue-500 rounded"></div>
                        <span className="font-semibold">Hash 전송 →</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-12 h-1 bg-red-500 rounded"></div>
                        <span className="font-semibold">← Hash 답신</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-2 pt-2 border-t">
                        Edge → 확률적 선택<br/>
                        Layer 1: 60%<br/>
                        Layer 2: 25%<br/>
                        Layer 3: 10%<br/>
                        Layer 4: 5%
                    </div>
                </div>

                {/* Canvas */}
                <div className="relative" style={{height: '650px'}}>
                    <canvas
                        id="hashChainCanvas"
                        width="1000"
                        height="650"
                        className="absolute top-0 left-0"
                    />

                    {/* SVG 노드 */}
                    <svg width="1000" height="650" className="absolute top-0 left-0" style={{pointerEvents: 'none'}}>
                        {/* 계층 라벨 */}
                        <text x="80" y="40" fontSize="13" fontWeight="bold" fill="#3B82F6">Edge</text>
                        <text x="80" y="55" fontSize="10" fill="#6B7280">(직원 단말기)</text>
                        
                        <text x="280" y="100" fontSize="13" fontWeight="bold" fill="#10B981">Layer 1</text>
                        <text x="280" y="115" fontSize="10" fill="#6B7280">(부서 60%)</text>
                        
                        <text x="480" y="200" fontSize="13" fontWeight="bold" fill="#8B5CF6">Layer 2</text>
                        <text x="480" y="215" fontSize="10" fill="#6B7280">(기관 25%)</text>
                        
                        <text x="680" y="200" fontSize="13" fontWeight="bold" fill="#F59E0B">Layer 3</text>
                        <text x="680" y="215" fontSize="10" fill="#6B7280">(부처 10%)</text>
                        
                        <text x="880" y="290" fontSize="13" fontWeight="bold" fill="#EF4444">Layer 4</text>
                        <text x="805" y="305" fontSize="10" fill="#6B7280">(국가데이터처 5%)</text>

                        {/* 노드 (반투명) */}
                        {allNodes.map(node => (
                            <g key={node.id} opacity="0.75">
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r="18"
                                    fill={node.color}
                                    stroke="#fff"
                                    strokeWidth="3"
                                />
                                <text
                                    x={node.x}
                                    y={node.y + 32}
                                    textAnchor="middle"
                                    fontSize="9"
                                    fill="#374151"
                                    fontWeight="500"
                                >
                                    {node.label}
                                </text>
                            </g>
                        ))}
                    </svg>
                </div>
            </div>

            {/* 확률 분포 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-4 border-gov-blue rounded-lg p-6">
                <h4 className="text-lg font-bold text-gov-blue mb-4">
                    <i className="fas fa-chart-pie mr-2"></i>
                    비대칭 확률 분포 (Edge에서 직접 선택)
                </h4>
                <div className="grid grid-cols-4 gap-3 mb-4">
                    <div className="bg-white rounded-lg p-4 text-center border-2 border-green-500">
                        <div className="text-3xl font-bold text-green-600">60%</div>
                        <div className="text-xs text-gray-600 mt-1">Layer 1 (부서)</div>
                        <div className="text-xs text-gray-500 mt-1">Edge → L1 직접</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center border-2 border-purple-500">
                        <div className="text-3xl font-bold text-purple-600">25%</div>
                        <div className="text-xs text-gray-600 mt-1">Layer 2 (기관)</div>
                        <div className="text-xs text-gray-500 mt-1">Edge → L2 직접</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center border-2 border-orange-500">
                        <div className="text-3xl font-bold text-orange-600">10%</div>
                        <div className="text-xs text-gray-600 mt-1">Layer 3 (부처)</div>
                        <div className="text-xs text-gray-500 mt-1">Edge → L3 직접</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center border-2 border-red-500">
                        <div className="text-3xl font-bold text-red-600">5%</div>
                        <div className="text-xs text-gray-600 mt-1">Layer 4 (국가데이터처)</div>
                        <div className="text-xs text-gray-500 mt-1">Edge → L4 직접</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                    <div className="text-sm font-semibold mb-2">SHA-256 재해싱 알고리즘</div>
                    <ol className="text-xs space-y-1 text-gray-700">
                        <li>① 문서 내용 SHA-256 해싱 → 32 bytes</li>
                        <li>② 타임스탬프 생성 및 연결</li>
                        <li>③ 1차 재해싱 (SHA-256)</li>
                        <li>④ 2차 재해싱 (SHA-256)</li>
                        <li>⑤ 0~100 범위로 변환</li>
                        <li>⑥ 확률 분포 비교: 0~60=L1, 60~85=L2, 85~95=L3, 95~100=L4</li>
                        <li>⑦ 선택된 Layer로 <span className="font-bold text-blue-600">직접</span> 해시 전송 (파란색 →)</li>
                        <li>⑧ Layer가 검증 후 응답 해시 답신 (빨간색 ←)</li>
                    </ol>
                </div>
            </div>

            {/* Hash Chain 연동 설명 */}
            <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-4">
                <h4 className="text-base font-bold text-yellow-700 mb-3">
                    <i className="fas fa-random mr-2"></i>
                    확률적 계층 선택의 핵심
                </h4>
                <div className="space-y-2 text-sm">
                    <div className="bg-white rounded p-3">
                        <div className="font-bold text-blue-600 mb-1">1. Edge에서 즉시 선택</div>
                        <div className="text-xs text-gray-700">
                            직원이 문서를 작성하면, SHA-256 재해싱으로 <span className="font-bold">0~100</span> 값을 얻고, 
                            이 값에 따라 Layer 1, 2, 3, 4 중 하나를 <span className="font-bold">즉시 선택</span>하여 
                            직접 전송합니다. (Layer 1을 거치지 않음)
                        </div>
                    </div>
                    <div className="bg-white rounded p-3">
                        <div className="font-bold text-green-600 mb-1">2. 부하 분산</div>
                        <div className="text-xs text-gray-700">
                            하위 계층(Layer 1)에 60% 집중, 상위 계층(Layer 4)에 5%만 할당하여 
                            자연스럽게 부하를 분산합니다.
                        </div>
                    </div>
                    <div className="bg-white rounded p-3">
                        <div className="font-bold text-purple-600 mb-1">3. Layer 간 상향 전파</div>
                        <div className="text-xs text-gray-700">
                            Layer 1 → Layer 2 → Layer 3 → Layer 4로 Merkle Root를 
                            주기적으로 상향 전파하여 전체 네트워크가 동기화됩니다.
                        </div>
                    </div>
                </div>
            </div>

            {/* 보안 특성 */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                <h4 className="text-base font-bold text-green-700 mb-3">
                    <i className="fas fa-shield-alt mr-2"></i>
                    확률적 계층 선택의 보안 특성
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>✅ <span className="font-bold">예측 불가능</span>: SHA-256으로 공격자가 계층 예측 불가 (2⁻²⁵⁶)</li>
                    <li>✅ <span className="font-bold">직접 전송</span>: Edge가 중간 Layer를 거치지 않고 목표 Layer에 직접 전송</li>
                    <li>✅ <span className="font-bold">자동 부하 분산</span>: 확률 분포로 자연스럽게 부하 분산</li>
                    <li>✅ <span className="font-bold">순차적 검증</span>: 요청 도착 → 검증 → 응답 순차 실행</li>
                    <li>✅ <span className="font-bold">에너지 효율</span>: PoW/PoS 없이 단순 해싱만으로 98.5% 절감</li>
                </ul>
            </div>
        </div>
    );
}
