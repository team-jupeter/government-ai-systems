const HashTransmissionAnimation = () => {
    const [dots, setDots] = React.useState([]);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [probabilities, setProbabilities] = React.useState({
        layer1: 70,
        layer2: 20,
        layer3: 9,
        layer4: 1
    });
    const [probError, setProbError] = React.useState('');

    const devices = [
        { id: 0, y: 10, type: 'phone' },
        { id: 1, y: 18, type: 'computer' },
        { id: 2, y: 26, type: 'phone' },
        { id: 3, y: 34, type: 'computer' },
        { id: 4, y: 42, type: 'phone' },
        { id: 5, y: 50, type: 'computer' },
        { id: 6, y: 58, type: 'phone' },
        { id: 7, y: 66, type: 'computer' },
        { id: 8, y: 74, type: 'phone' },
        { id: 9, y: 82, type: 'computer' }
    ];
    
    const layers = {
        1: [
            { id: 'L1-0', layer: 1, y: 10 },
            { id: 'L1-1', layer: 1, y: 26 },
            { id: 'L1-2', layer: 1, y: 42 },
            { id: 'L1-3', layer: 1, y: 58 },
            { id: 'L1-4', layer: 1, y: 74 }
        ],
        2: [
            { id: 'L2-0', layer: 2, y: 15 },
            { id: 'L2-1', layer: 2, y: 35 },
            { id: 'L2-2', layer: 2, y: 55 }
        ],
        3: [
            { id: 'L3-0', layer: 3, y: 20 },
            { id: 'L3-1', layer: 3, y: 50 }
        ],
        4: [
            { id: 'L4-0', layer: 4, y: 20 },
            { id: 'L4-1', layer: 4, y: 50 }
        ]
    };

    const handleProbabilityChange = (layer, value) => {
        const numValue = parseInt(value) || 0;
        const newProbs = { ...probabilities, [layer]: numValue };
        setProbabilities(newProbs);

        const sum = Object.values(newProbs).reduce((a, b) => a + b, 0);
        setProbError(sum !== 100 ? '합계: ' + sum + '% (100%여야 함)' : '');
    };

    React.useEffect(() => {
        if (!isAnimating) {
            setDots([]);
            return;
        }
        
        const sum = Object.values(probabilities).reduce((a, b) => a + b, 0);
        if (sum !== 100) return;

        let running = true;

        const selectLayer = () => {
            const rand = Math.random() * 100;
            if (rand < probabilities.layer1) return 1;
            if (rand < probabilities.layer1 + probabilities.layer2) return 2;
            if (rand < probabilities.layer1 + probabilities.layer2 + probabilities.layer3) return 3;
            return 4;
        };

        const animate = () => {
            if (!running) return;
            
            const device = devices[Math.floor(Math.random() * devices.length)];
            const layer = selectLayer();
            const layerNodes = layers[layer];
            const node = layerNodes[Math.floor(Math.random() * layerNodes.length)];
            
            const fromX = 15;
            const fromY = device.y;
            const toX = 25 + layer * 20;
            const toY = node.y;

            // 파란색 전송
            let count = 0;
            const blueInt = setInterval(() => {
                if (!running) {
                    clearInterval(blueInt);
                    return;
                }
                count++;
                setDots(prev => [...prev, {
                    x: fromX + (toX - fromX) * (count / 100),
                    y: fromY + (toY - fromY) * (count / 100),
                    color: '#3B82F6'
                }]);
                
                if (count >= 100) {
                    clearInterval(blueInt);
                    setTimeout(() => {
                        if (!running) return;
                        setDots([]);
                        
                        // 빨간색 응답
                        let redCount = 0;
                        const redInt = setInterval(() => {
                            if (!running) {
                                clearInterval(redInt);
                                return;
                            }
                            redCount++;
                            setDots(prev => [...prev, {
                                x: toX + (fromX - toX) * (redCount / 100),
                                y: toY + (fromY - toY) * (redCount / 100),
                                color: '#EF4444'
                            }]);
                            
                            if (redCount >= 100) {
                                clearInterval(redInt);
                                setTimeout(() => {
                                    if (!running) return;
                                    setDots([]);
                                    setTimeout(animate, 500);
                                }, 100);
                            }
                        }, 10);
                    }, 100);
                }
            }, 10);
        };

        setTimeout(animate, 500);
        
        return () => {
            running = false;
            setDots([]);
        };
    }, [isAnimating, probabilities]);

    return (
        <div className="bg-white border border-gov-border rounded-lg p-6 mb-12">
            <h4 className="text-xl font-bold text-gov-text text-center mb-4">
                확률적 계층 선택 실시간 시뮬레이션
            </h4>
            
            <div className="flex justify-center gap-3 mb-6">
                <button
                    onClick={() => setIsAnimating(true)}
                    disabled={isAnimating}
                    className="px-6 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
                >
                    <i className="fas fa-play"></i>
                    시작
                </button>
                <button
                    onClick={() => setIsAnimating(false)}
                    disabled={!isAnimating}
                    className="px-6 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
                >
                    <i className="fas fa-stop"></i>
                    정지
                </button>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <div className="text-sm font-bold text-gov-text mb-3 text-center">
                    계층별 전송 확률 설정
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map(layer => (
                        <div key={layer} className="bg-white rounded p-3 border border-gray-300">
                            <label className="block text-xs font-bold text-gov-text mb-1">
                                Layer {layer}
                            </label>
                            <div className="flex items-center gap-1">
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={probabilities['layer' + layer]}
                                    onFocus={(e) => e.target.select()}
                                    onChange={(e) => handleProbabilityChange('layer' + layer, e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-center font-bold"
                                />
                                <span className="text-sm font-bold text-gov-text">%</span>
                            </div>
                        </div>
                    ))}
                </div>
                {probError && (
                    <div className="mt-2 text-center text-sm font-bold text-red-600">
                        ⚠️ {probError}
                    </div>
                )}
                {!probError && (
                    <div className="mt-2 text-center text-sm font-bold text-green-600">
                        ✓ 합계: 100%
                    </div>
                )}
            </div>
            
            <div className="w-full overflow-hidden">
                <svg viewBox="0 0 120 90" className="w-full h-auto" preserveAspectRatio="xMidYMid meet" style={{ maxHeight: '500px', minHeight: '300px' }}>
                    {devices.map(device => (
                        <g key={'device-' + device.id}>
                            {device.type === 'phone' ? (
                                <g>
                                    <rect x="13" y={device.y - 2} width="4" height="4" rx="0.5" fill="#F3F4F6" stroke="#374151" strokeWidth="0.3" />
                                    <circle cx="15" cy={device.y + 1.5} r="0.3" fill="#374151" />
                                    <rect x="14" y={device.y - 1.6} width="2" height="0.3" rx="0.15" fill="#374151" />
                                </g>
                            ) : (
                                <g>
                                    <rect x="12" y={device.y - 1.8} width="6" height="3" rx="0.3" fill="#F3F4F6" stroke="#374151" strokeWidth="0.3" />
                                    <line x1="12" y1={device.y + 1.2} x2="18" y2={device.y + 1.2} stroke="#374151" strokeWidth="0.3" />
                                    <rect x="13.5" y={device.y + 1.2} width="3" height="0.5" fill="#374151" />
                                </g>
                            )}
                        </g>
                    ))}
                    
                    {[1, 2, 3, 4].map(layer =>
                        layers[layer].map(node => (
                            <g key={node.id} transform={'translate(' + (25 + layer * 20) + ',' + node.y + ')'}>
                                <polygon points="-0.8,2 0.8,2 1.2,-2 -1.2,-2" fill="#6B7280" stroke="#374151" strokeWidth="0.2" />
                                <circle cx="0" cy="0" r="0.6" fill="#374151" />
                                <path d="M -1.5,-0.5 Q -2,-0.5 -2.5,-0.8" fill="none" stroke="#6B7280" strokeWidth="0.25" />
                                <path d="M -1.8,0 Q -2.5,0 -3.2,-0.3" fill="none" stroke="#6B7280" strokeWidth="0.25" />
                                <path d="M -1.5,0.5 Q -2,0.5 -2.5,0.8" fill="none" stroke="#6B7280" strokeWidth="0.25" />
                                <path d="M 1.5,-0.5 Q 2,-0.5 2.5,-0.8" fill="none" stroke="#6B7280" strokeWidth="0.25" />
                                <path d="M 1.8,0 Q 2.5,0 3.2,-0.3" fill="none" stroke="#6B7280" strokeWidth="0.25" />
                                <path d="M 1.5,0.5 Q 2,0.5 2.5,0.8" fill="none" stroke="#6B7280" strokeWidth="0.25" />
                                <text x="0" y="4" textAnchor="middle" fontSize="2.5" fill="#374151" fontWeight="600">L{layer}</text>
                            </g>
                        ))
                    )}
                    
                    {dots.map((dot, idx) => (
                        <circle key={idx} cx={dot.x} cy={dot.y} r="0.3" fill={dot.color} />
                    ))}
                </svg>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm text-gov-text-secondary">
                <div className="flex items-center gap-2">
                    <svg width="40" height="2">
                        <line x1="0" y1="1" x2="40" y2="1" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4,4" />
                    </svg>
                    <span>Hash 전송 (1초)</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg width="40" height="2">
                        <line x1="0" y1="1" x2="40" y2="1" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,4" />
                    </svg>
                    <span>Hash 응답 (1초)</span>
                </div>
            </div>
        </div>
    );
};
