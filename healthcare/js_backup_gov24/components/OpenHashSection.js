const OpenHashSection = () => {
    const [layerDemo, setLayerDemo] = React.useState(null);
    const [isAnimating, setIsAnimating] = React.useState(false);

    const layers = [
        { num: 1, name: 'Edge Device', desc: '226개 시군구 보건소', prob: '70%', range: '0-69', color: 'teal' },
        { num: 2, name: 'Edge Server', desc: '43개 권역 대학병원', prob: '20%', range: '70-89', color: 'blue' },
        { num: 3, name: 'Core Engine', desc: '국가 의료정보원', prob: '9%', range: '90-98', color: 'purple' },
        { num: 4, name: 'Cloud Archive', desc: '영구 보관소', prob: '1%', range: '99', color: 'amber' }
    ];

    const runLayerDemo = async () => {
        setIsAnimating(true);
        setLayerDemo(null);
        
        try {
            const response = await fetch('/api-healthcare/openhash/select-layer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: `demo_${Date.now()}` })
            });
            const result = await response.json();
            setTimeout(() => {
                setLayerDemo(result);
                setIsAnimating(false);
            }, 1500);
        } catch (error) {
            console.error('Layer demo error:', error);
            // 오프라인 시뮬레이션
            const hash = Math.random().toString(16).slice(2, 66);
            const layerValue = Math.floor(Math.random() * 100);
            let selectedLayer;
            if (layerValue < 70) selectedLayer = layers[0];
            else if (layerValue < 90) selectedLayer = layers[1];
            else if (layerValue < 99) selectedLayer = layers[2];
            else selectedLayer = layers[3];
            
            setTimeout(() => {
                setLayerDemo({
                    original_hash: hash,
                    layer_value: layerValue,
                    selected_layer: { number: selectedLayer.num, name: selectedLayer.name, description: selectedLayer.desc }
                });
                setIsAnimating(false);
            }, 1500);
        }
    };

    return React.createElement('div', {
        id: 'openhash',
        className: 'py-16 px-4 bg-gray-800'
    },
        React.createElement('div', { className: 'max-w-6xl mx-auto' },
            React.createElement('div', { className: 'text-center mb-12' },
                React.createElement('h2', { className: 'text-3xl font-bold mb-4' }, '🔗 오픈해시 기술'),
                React.createElement('p', { className: 'text-gray-400 max-w-2xl mx-auto' },
                    'SHA-256 기반 확률적 계층 선택으로 블록체인 대비 98.5% 에너지 절감, 50,000 TPS 달성'
                )
            ),
            
            // 블록체인 vs 오픈해시 비교
            React.createElement('div', { className: 'grid md:grid-cols-2 gap-6 mb-12' },
                React.createElement('div', { className: 'bg-red-900/30 border border-red-500/30 rounded-xl p-6' },
                    React.createElement('h3', { className: 'text-xl font-bold text-red-400 mb-4' }, '❌ 기존 블록체인'),
                    React.createElement('ul', { className: 'space-y-3 text-gray-300' },
                        React.createElement('li', null, '• 연간 121 TWh 전력 소비 (아르헨티나 수준)'),
                        React.createElement('li', null, '• 비트코인 7 TPS, 이더리움 15 TPS'),
                        React.createElement('li', null, '• 높은 가스비 (건당 $5 이상)'),
                        React.createElement('li', null, '• 모든 데이터 공개로 프라이버시 침해')
                    )
                ),
                React.createElement('div', { className: 'bg-teal-900/30 border border-teal-500/30 rounded-xl p-6' },
                    React.createElement('h3', { className: 'text-xl font-bold text-teal-400 mb-4' }, '✅ 오픈해시'),
                    React.createElement('ul', { className: 'space-y-3 text-gray-300' },
                        React.createElement('li', null, '• 연간 1.8 TWh (98.5% 절감)'),
                        React.createElement('li', null, '• 50,000 TPS (3,300배 이상)'),
                        React.createElement('li', null, '• 월 490원/인 경제적 비용'),
                        React.createElement('li', null, '• 해시만 저장, 원본은 PDV에 보관')
                    )
                )
            ),
            
            // 4계층 구조 시각화
            React.createElement('div', { className: 'bg-gray-900 rounded-xl p-6 mb-8' },
                React.createElement('h3', { className: 'text-xl font-bold text-center mb-6' }, '📊 확률적 4계층 분산 구조'),
                React.createElement('div', { className: 'grid grid-cols-4 gap-4' },
                    layers.map((layer, i) =>
                        React.createElement('div', {
                            key: i,
                            className: `bg-${layer.color}-900/30 border border-${layer.color}-500/30 rounded-xl p-4 text-center ${layerDemo?.selected_layer?.number === layer.num ? 'ring-2 ring-' + layer.color + '-400 pulse-glow' : ''}`
                        },
                            React.createElement('div', { className: 'text-3xl mb-2' }, ['🏥', '🏛️', '🖥️', '☁️'][i]),
                            React.createElement('div', { className: `text-lg font-bold text-${layer.color}-400` }, `Layer ${layer.num}`),
                            React.createElement('div', { className: 'text-sm text-white' }, layer.name),
                            React.createElement('div', { className: 'text-xs text-gray-400 mt-1' }, layer.desc),
                            React.createElement('div', { className: `text-lg font-bold text-${layer.color}-300 mt-2` }, layer.prob),
                            React.createElement('div', { className: 'text-xs text-gray-500' }, `범위: ${layer.range}`)
                        )
                    )
                )
            ),
            
            // 계층 선택 데모
            React.createElement('div', { className: 'bg-gray-900 rounded-xl p-6' },
                React.createElement('div', { className: 'flex justify-between items-center mb-4' },
                    React.createElement('h3', { className: 'text-xl font-bold' }, '🎯 계층 선택 시뮬레이션'),
                    React.createElement('button', {
                        onClick: runLayerDemo,
                        disabled: isAnimating,
                        className: `px-4 py-2 rounded-lg font-semibold transition-all ${isAnimating ? 'bg-gray-600 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-500'}`
                    }, isAnimating ? '처리 중...' : '해시 생성 및 계층 선택')
                ),
                
                isAnimating && React.createElement('div', { className: 'text-center py-8' },
                    React.createElement('div', { className: 'text-4xl mb-4 animate-spin' }, '⚙️'),
                    React.createElement('p', { className: 'text-teal-400' }, 'SHA-256 재해싱 및 계층 선택 중...')
                ),
                
                layerDemo && !isAnimating && React.createElement('div', { className: 'space-y-4' },
                    React.createElement('div', { className: 'bg-gray-800 rounded-lg p-4' },
                        React.createElement('div', { className: 'text-sm text-gray-400 mb-1' }, '원본 해시 (SHA-256)'),
                        React.createElement('div', { className: 'font-mono text-teal-400 text-sm break-all' }, layerDemo.original_hash)
                    ),
                    React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
                        React.createElement('div', { className: 'bg-gray-800 rounded-lg p-4' },
                            React.createElement('div', { className: 'text-sm text-gray-400 mb-1' }, '계층 선택값'),
                            React.createElement('div', { className: 'text-2xl font-bold text-white' }, layerDemo.layer_value)
                        ),
                        React.createElement('div', { className: 'bg-teal-900/50 rounded-lg p-4' },
                            React.createElement('div', { className: 'text-sm text-gray-400 mb-1' }, '선택된 계층'),
                            React.createElement('div', { className: 'text-xl font-bold text-teal-400' }, 
                                `Layer ${layerDemo.selected_layer?.number}: ${layerDemo.selected_layer?.name}`
                            ),
                            React.createElement('div', { className: 'text-sm text-gray-300' }, layerDemo.selected_layer?.description)
                        )
                    )
                )
            )
        )
    );
};
