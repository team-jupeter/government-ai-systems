const HashTransmissionAnimation = () => {
    const [dots, setDots] = React.useState([]);
    const [probabilities, setProbabilities] = React.useState({
        layer1: 70,
        layer2: 20,
        layer3: 9,
        layer4: 1
    });
    const [probError, setProbError] = React.useState('');

    const devices = Array.from({ length: 10 }, (_, i) => ({ 
        id: i, 
        y: 10 + i * 8,
        type: i % 2 === 0 ? 'phone' : 'computer'
    }));
    
    const layers = {
        1: Array.from({ length: 5 }, (_, i) => ({ id: 'L1-' + i, layer: 1, y: 10 + i * 16 })),
        2: Array.from({ length: 3 }, (_, i) => ({ id: 'L2-' + i, layer: 2, y: 15 + i * 20 })),
        3: Array.from({ length: 2 }, (_, i) => ({ id: 'L3-' + i, layer: 3, y: 20 + i * 30 })),
        4: Array.from({ length: 2 }, (_, i) => ({ id: 'L4-' + i, layer: 4, y: 20 + i * 30 }))
    };

    const handleProbabilityChange = (layer, value) => {
        const numValue = parseInt(value) || 0;
        const newProbs = Object.assign({}, probabilities);
        newProbs[layer] = numValue;
        setProbabilities(newProbs);

        const sum = Object.values(newProbs).reduce((a, b) => a + b, 0);
        if (sum !== 100) {
            setProbError('합계: ' + sum + '% (100%여야 함)');
        } else {
            setProbError('');
        }
    };

    React.useEffect(() => {
        const sum = Object.values(probabilities).reduce((a, b) => a + b, 0);
        if (sum !== 100) return;

        let animationTimer;

        // selectLayer 함수를 useEffect 내부로 이동 (최신 probabilities 참조)
        const selectLayer = () => {
            const rand = Math.random() * 100;
            let cumulative = 0;
            cumulative += probabilities.layer1;
            if (rand < cumulative) return 1;
            cumulative += probabilities.layer2;
            if (rand < cumulative) return 2;
            cumulative += probabilities.layer3;
            if (rand < cumulative) return 3;
            return 4;
        };

        const selectNode = (layer) => {
            const nodes = layers[layer];
            return nodes[Math.floor(Math.random() * nodes.length)];
        };

        const runAnimation = () => {
            const device = devices[Math.floor(Math.random() * devices.length)];
            const layer = selectLayer(); // 최신 확률 적용
            const node = selectNode(layer);
            
            console.log('선택된 Layer:', layer, '| 확률 설정:', probabilities); // 디버깅용
            
            const fromX = 15;
            const fromY = device.y;
            const toX = 25 + layer * 20;
            const toY = node.y;

            // 파란색 점선 그리기 (스마트폰 → 노드)
            let count = 0;
            const blueInterval = setInterval(() => {
                count++;
                const progress = count / 100;
                const x = fromX + (toX - fromX) * progress;
                const y = fromY + (toY - fromY) * progress;
                
                setDots(prev => [...prev, { x: x, y: y, color: '#3B82F6' }]);

                if (count >= 100) {
                    clearInterval(blueInterval);
                    
                    // 파란색 점선 지우기
                    setTimeout(() => {
                        setDots([]);
                        
                        // 빨간색 점선 그리기 (노드 → 스마트폰)
                        let redCount = 0;
                        const redInterval = setInterval(() => {
                            redCount++;
                            const progress = redCount / 100;
                            const x = toX + (fromX - toX) * progress;
                            const y = toY + (fromY - toY) * progress;
                            
                            setDots(prev => [...prev, { x: x, y: y, color: '#EF4444' }]);

                            if (redCount >= 100) {
                                clearInterval(redInterval);
                                
                                // 빨간색 점선 지우고 다음 전송
                                setTimeout(() => {
                                    setDots([]);
                                    animationTimer = setTimeout(runAnimation, 500);
                                }, 100);
                            }
                        }, 10); // 0.01초
                    }, 100);
                }
            }, 10); // 0.01초
        };

        animationTimer = setTimeout(runAnimation, 500);
        return () => clearTimeout(animationTimer);
    }, [probabilities]); // probabilities 변경 시 재실행

    return React.createElement('div', { className: 'bg-white border border-gov-border rounded-lg p-6 mb-12' },
        React.createElement('h4', { className: 'text-xl font-bold text-gov-text text-center mb-4' },
            '확률적 계층 선택 실시간 시뮬레이션'
        ),
        
        React.createElement('div', { className: 'bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6' },
            React.createElement('div', { className: 'text-sm font-bold text-gov-text mb-3 text-center' },
                '계층별 전송 확률 설정'
            ),
            React.createElement('div', { className: 'grid grid-cols-2 md:grid-cols-4 gap-3' },
                [1, 2, 3, 4].map(layer =>
                    React.createElement('div', { 
                        key: layer, 
                        className: 'bg-white rounded p-3 border border-gray-300' 
                    },
                        React.createElement('label', { className: 'block text-xs font-bold text-gov-text mb-1' },
                            'Layer ' + layer
                        ),
                        React.createElement('div', { className: 'flex items-center gap-1' },
                            React.createElement('input', {
                                type: 'number',
                                min: 0,
                                max: 100,
                                value: probabilities['layer' + layer],
                                onFocus: (e) => e.target.select(),
                                onChange: (e) => handleProbabilityChange('layer' + layer, e.target.value),
                                className: 'w-full px-2 py-1 border border-gray-300 rounded text-center font-bold'
                            }),
                            React.createElement('span', { className: 'text-sm font-bold text-gov-text' }, '%')
                        )
                    )
                )
            ),
            probError && React.createElement('div', { className: 'mt-2 text-center text-sm font-bold text-red-600' },
                '⚠️ ' + probError
            ),
            !probError && React.createElement('div', { className: 'mt-2 text-center text-sm font-bold text-green-600' },
                '✓ 합계: 100%'
            )
        ),
        
        React.createElement('div', { className: 'w-full overflow-hidden' },
            React.createElement('svg', {
                viewBox: '0 0 120 90',
                className: 'w-full h-auto',
                preserveAspectRatio: 'xMidYMid meet',
                style: { maxHeight: '500px', minHeight: '300px' }
            },
                devices.map(device =>
                    React.createElement('g', { key: 'device-' + device.id },
                        device.type === 'phone' ?
                            React.createElement('g', null,
                                React.createElement('rect', { x: 13, y: device.y - 2, width: 4, height: 4, rx: 0.5, fill: '#F3F4F6', stroke: '#374151', strokeWidth: 0.3 }),
                                React.createElement('circle', { cx: 15, cy: device.y + 1.5, r: 0.3, fill: '#374151' }),
                                React.createElement('rect', { x: 14, y: device.y - 1.6, width: 2, height: 0.3, rx: 0.15, fill: '#374151' })
                            ) :
                            React.createElement('g', null,
                                React.createElement('rect', { x: 12, y: device.y - 1.8, width: 6, height: 3, rx: 0.3, fill: '#F3F4F6', stroke: '#374151', strokeWidth: 0.3 }),
                                React.createElement('line', { x1: 12, y1: device.y + 1.2, x2: 18, y2: device.y + 1.2, stroke: '#374151', strokeWidth: 0.3 }),
                                React.createElement('rect', { x: 13.5, y: device.y + 1.2, width: 3, height: 0.5, fill: '#374151' })
                            )
                    )
                ),
                
                [1, 2, 3, 4].map(layer =>
                    React.createElement('g', { key: 'layer-' + layer },
                        layers[layer].map(node =>
                            React.createElement('g', { 
                                key: node.id,
                                transform: 'translate(' + (25 + layer * 20) + ',' + node.y + ')'
                            },
                                React.createElement('polygon', {
                                    points: '-0.8,2 0.8,2 1.2,-2 -1.2,-2',
                                    fill: '#6B7280',
                                    stroke: '#374151',
                                    strokeWidth: 0.2
                                }),
                                React.createElement('circle', { cx: 0, cy: 0, r: 0.6, fill: '#374151' }),
                                React.createElement('path', { d: 'M -1.5,-0.5 Q -2,-0.5 -2.5,-0.8', fill: 'none', stroke: '#6B7280', strokeWidth: 0.25 }),
                                React.createElement('path', { d: 'M -1.8,0 Q -2.5,0 -3.2,-0.3', fill: 'none', stroke: '#6B7280', strokeWidth: 0.25 }),
                                React.createElement('path', { d: 'M -1.5,0.5 Q -2,0.5 -2.5,0.8', fill: 'none', stroke: '#6B7280', strokeWidth: 0.25 }),
                                React.createElement('path', { d: 'M 1.5,-0.5 Q 2,-0.5 2.5,-0.8', fill: 'none', stroke: '#6B7280', strokeWidth: 0.25 }),
                                React.createElement('path', { d: 'M 1.8,0 Q 2.5,0 3.2,-0.3', fill: 'none', stroke: '#6B7280', strokeWidth: 0.25 }),
                                React.createElement('path', { d: 'M 1.5,0.5 Q 2,0.5 2.5,0.8', fill: 'none', stroke: '#6B7280', strokeWidth: 0.25 }),
                                React.createElement('text', { x: 0, y: 4, textAnchor: 'middle', fontSize: 2.5, fill: '#374151', fontWeight: 600 }, 'L' + layer)
                            )
                        )
                    )
                ),
                
                dots.map((dot, idx) =>
                    React.createElement('circle', {
                        key: idx,
                        cx: dot.x,
                        cy: dot.y,
                        r: 0.3,
                        fill: dot.color
                    })
                )
            )
        ),
        
        React.createElement('div', { className: 'flex flex-wrap justify-center gap-6 mt-4 text-sm text-gov-text-secondary' },
            React.createElement('div', { className: 'flex items-center gap-2' },
                React.createElement('svg', { width: 40, height: 2 },
                    React.createElement('line', { x1: 0, y1: 1, x2: 40, y2: 1, stroke: '#3B82F6', strokeWidth: 2, strokeDasharray: '4,4' })
                ),
                React.createElement('span', null, 'Hash 전송 (1초)')
            ),
            React.createElement('div', { className: 'flex items-center gap-2' },
                React.createElement('svg', { width: 40, height: 2 },
                    React.createElement('line', { x1: 0, y1: 1, x2: 40, y2: 1, stroke: '#EF4444', strokeWidth: 2, strokeDasharray: '4,4' })
                ),
                React.createElement('span', null, 'Hash 응답 (1초)')
            )
        )
    );
};
