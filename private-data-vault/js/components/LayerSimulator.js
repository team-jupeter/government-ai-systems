const LayerSimulator = ({ onShowModal }) => {
    const [inputData, setInputData] = React.useState('PDV 테스트 데이터 - 홍길동의 거래 기록');
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [stats, setStats] = React.useState({ layer1: 0, layer2: 0, layer3: 0, layer4: 0, total: 0 });

    const runSimulation = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api-private-data-vault/openhash/select-layer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: inputData, timestamp: new Date().toISOString() })
            });
            const data = await response.json();
            setResult(data);
            
            // 통계 업데이트
            const layer = data.selected_layer?.number;
            setStats(prev => ({
                layer1: prev.layer1 + (layer === 1 ? 1 : 0),
                layer2: prev.layer2 + (layer === 2 ? 1 : 0),
                layer3: prev.layer3 + (layer === 3 ? 1 : 0),
                layer4: prev.layer4 + (layer === 4 ? 1 : 0),
                total: prev.total + 1
            }));
        } catch (error) {
            setResult({ error: '시뮬레이션 실패: ' + error.message });
        }
        setLoading(false);
    };

    const runBatchSimulation = async () => {
        setLoading(true);
        setStats({ layer1: 0, layer2: 0, layer3: 0, layer4: 0, total: 0 });
        
        let newStats = { layer1: 0, layer2: 0, layer3: 0, layer4: 0, total: 0 };
        
        for (let i = 0; i < 100; i++) {
            try {
                const response = await fetch('/api-private-data-vault/openhash/select-layer', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        data: inputData + ' - 배치 ' + i, 
                        timestamp: new Date().toISOString(),
                        batch_id: i
                    })
                });
                const data = await response.json();
                const layer = data.selected_layer?.number;
                
                newStats.layer1 += (layer === 1 ? 1 : 0);
                newStats.layer2 += (layer === 2 ? 1 : 0);
                newStats.layer3 += (layer === 3 ? 1 : 0);
                newStats.layer4 += (layer === 4 ? 1 : 0);
                newStats.total += 1;
                
                if (i === 99) setResult(data);
            } catch (error) {
                console.error('Batch error:', error);
            }
        }
        
        setStats(newStats);
        setLoading(false);
    };

    const resetStats = () => {
        setStats({ layer1: 0, layer2: 0, layer3: 0, layer4: 0, total: 0 });
        setResult(null);
    };

    const layers = [
        { num: 1, name: 'Edge Device', target: 70, color: 'blue', icon: 'fa-mobile-alt', desc: '사용자 단말기' },
        { num: 2, name: 'Edge Server', target: 20, color: 'purple', icon: 'fa-server', desc: '지역 서버' },
        { num: 3, name: 'Core Engine', target: 9, color: 'yellow', icon: 'fa-cogs', desc: '핵심 엔진' },
        { num: 4, name: 'Cloud Archive', target: 1, color: 'green', icon: 'fa-cloud', desc: '영구 보존' }
    ];

    const getPercentage = (count) => stats.total > 0 ? ((count / stats.total) * 100).toFixed(1) : 0;

    return React.createElement('section', { className: 'py-16 px-4 bg-gray-900' },
        React.createElement('div', { className: 'max-w-6xl mx-auto' },
            React.createElement('div', { className: 'text-center mb-12' },
                React.createElement('h2', { className: 'text-3xl font-bold mb-4' },
                    React.createElement('i', { className: 'fas fa-layer-group mr-3 text-cyan-400' }),
                    '오픈해시 계층 선택 시뮬레이터'
                ),
                React.createElement('p', { className: 'text-gray-400 max-w-2xl mx-auto' },
                    'SHA-256 재해싱 기반 확률적 계층 선택 | 설계 목표: L1(70%) L2(20%) L3(9%) L4(1%)'
                )
            ),
            React.createElement('div', { className: 'grid lg:grid-cols-2 gap-8' },
                // 입력 및 제어
                React.createElement('div', { className: 'bg-gray-800 rounded-xl p-6 border border-gray-700' },
                    React.createElement('h3', { className: 'text-xl font-bold mb-6 text-cyan-400' },
                        React.createElement('i', { className: 'fas fa-play-circle mr-2' }),
                        '시뮬레이션 실행'
                    ),
                    React.createElement('div', { className: 'mb-6' },
                        React.createElement('label', { className: 'block text-sm text-gray-400 mb-2' }, '입력 데이터'),
                        React.createElement('textarea', {
                            value: inputData,
                            onChange: e => setInputData(e.target.value),
                            rows: 3,
                            className: 'w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 focus:border-cyan-500 focus:outline-none resize-none'
                        })
                    ),
                    React.createElement('div', { className: 'grid grid-cols-3 gap-3 mb-6' },
                        React.createElement('button', {
                            onClick: runSimulation,
                            disabled: loading,
                            className: 'py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors'
                        },
                            React.createElement('i', { className: 'fas fa-dice mr-2' }),
                            '1회 실행'
                        ),
                        React.createElement('button', {
                            onClick: runBatchSimulation,
                            disabled: loading,
                            className: 'py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors'
                        },
                            loading ? '실행 중...' : React.createElement('span', null,
                                React.createElement('i', { className: 'fas fa-sync mr-2' }),
                                '100회 배치'
                            )
                        ),
                        React.createElement('button', {
                            onClick: resetStats,
                            className: 'py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-colors'
                        },
                            React.createElement('i', { className: 'fas fa-redo mr-2' }),
                            '초기화'
                        )
                    ),
                    // 마지막 결과
                    result && !result.error && React.createElement('div', { className: 'bg-gray-900 rounded-lg p-4' },
                        React.createElement('div', { className: 'text-sm font-bold text-gray-400 mb-3' }, '마지막 실행 결과'),
                        React.createElement('div', { className: 'grid grid-cols-2 gap-3 text-sm mb-3' },
                            React.createElement('div', null,
                                React.createElement('span', { className: 'text-gray-500' }, 'Layer Value: '),
                                React.createElement('span', { className: 'text-cyan-400 font-mono' }, result.layer_value)
                            ),
                            React.createElement('div', null,
                                React.createElement('span', { className: 'text-gray-500' }, '선택 계층: '),
                                React.createElement('span', { className: 'text-white font-bold' }, 
                                    'Layer ', result.selected_layer?.number, ' (', result.selected_layer?.name, ')'
                                )
                            )
                        ),
                        React.createElement('div', { className: 'text-xs' },
                            React.createElement('div', { className: 'text-gray-500 mb-1' }, 'Final Hash:'),
                            React.createElement('div', { className: 'hash-display text-gray-400 bg-gray-800 p-2 rounded' },
                                result.final_hash
                            )
                        )
                    )
                ),
                // 통계 시각화
                React.createElement('div', { className: 'bg-gray-800 rounded-xl p-6 border border-gray-700' },
                    React.createElement('div', { className: 'flex justify-between items-center mb-6' },
                        React.createElement('h3', { className: 'text-xl font-bold text-green-400' },
                            React.createElement('i', { className: 'fas fa-chart-bar mr-2' }),
                            '계층 분포 통계'
                        ),
                        React.createElement('div', { className: 'text-sm text-gray-400' },
                            '총 실행: ', React.createElement('span', { className: 'text-white font-bold' }, stats.total), '회'
                        )
                    ),
                    React.createElement('div', { className: 'space-y-4' },
                        layers.map(layer => {
                            const count = stats[`layer${layer.num}`];
                            const pct = getPercentage(count);
                            const diff = (pct - layer.target).toFixed(1);
                            const barColor = {
                                blue: 'bg-blue-500',
                                purple: 'bg-purple-500',
                                yellow: 'bg-yellow-500',
                                green: 'bg-green-500'
                            }[layer.color];
                            
                            return React.createElement('div', { key: layer.num },
                                React.createElement('div', { className: 'flex justify-between items-center mb-1' },
                                    React.createElement('div', { className: 'flex items-center gap-2' },
                                        React.createElement('i', { className: `fas ${layer.icon} text-${layer.color}-400` }),
                                        React.createElement('span', { className: 'text-sm' }, 
                                            'L', layer.num, ' ', layer.name
                                        )
                                    ),
                                    React.createElement('div', { className: 'text-sm' },
                                        React.createElement('span', { className: 'text-white font-bold' }, pct, '%'),
                                        React.createElement('span', { className: 'text-gray-500' }, ' (목표: ', layer.target, '%)'),
                                        stats.total > 0 && React.createElement('span', { 
                                            className: `ml-2 ${Math.abs(diff) <= 3 ? 'text-green-400' : 'text-yellow-400'}`
                                        }, diff > 0 ? '+' : '', diff)
                                    )
                                ),
                                React.createElement('div', { className: 'h-6 bg-gray-700 rounded-full overflow-hidden' },
                                    React.createElement('div', {
                                        className: `h-full ${barColor} layer-bar flex items-center justify-end pr-2`,
                                        style: { width: `${Math.min(pct, 100)}%` }
                                    },
                                        pct > 5 && React.createElement('span', { className: 'text-xs font-bold text-white' }, count)
                                    )
                                )
                            );
                        })
                    ),
                    // AWS 실증 결과 비교
                    stats.total >= 100 && React.createElement('div', { className: 'mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-700' },
                        React.createElement('div', { className: 'text-sm font-bold text-blue-400 mb-2' },
                            React.createElement('i', { className: 'fas fa-flask mr-2' }),
                            'AWS 실증 실험 비교'
                        ),
                        React.createElement('div', { className: 'text-xs text-gray-400' },
                            'AWS 실험 결과 (1,000개): L1: 70.20%, L2: 20.90%, L3: 8.90%',
                            React.createElement('br'),
                            '설계 목표 대비 최대 오차: 1.10%'
                        )
                    )
                )
            )
        )
    );
};
