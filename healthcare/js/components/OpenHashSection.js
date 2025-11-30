const OpenHashSection = () => {
    const [layerDemo, setLayerDemo] = React.useState(null);
    const [isAnimating, setIsAnimating] = React.useState(false);

    // 4계층 정의 - 파란색 그라데이션으로 통일
    const layers = [
        { 
            num: 1, 
            name: 'Edge Device', 
            desc: '226개 시군구 보건소', 
            prob: '70%', 
            range: '0-69',
            bgColor: '#dbeafe',
            borderColor: '#93c5fd',
            textColor: '#1e40af'
        },
        { 
            num: 2, 
            name: 'Edge Server', 
            desc: '43개 권역 대학병원', 
            prob: '20%', 
            range: '70-89',
            bgColor: '#bfdbfe',
            borderColor: '#60a5fa',
            textColor: '#1e3a8a'
        },
        { 
            num: 3, 
            name: 'Core Engine', 
            desc: '국가 의료정보원', 
            prob: '9%', 
            range: '90-98',
            bgColor: '#93c5fd',
            borderColor: '#3b82f6',
            textColor: '#1e3a8a'
        },
        { 
            num: 4, 
            name: 'Cloud Archive', 
            desc: '영구 보관소', 
            prob: '1%', 
            range: '99',
            bgColor: '#60a5fa',
            borderColor: '#2563eb',
            textColor: '#1e3a8a'
        }
    ];

    const runLayerDemo = async () => {
        setIsAnimating(true);
        setLayerDemo(null);
        
        try {
            const response = await fetch('/api/healthcare/openhash/select-layer', {
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
                    rehash: hash.slice(0, 32),
                    layer_value: layerValue,
                    selected_layer: selectedLayer
                });
                setIsAnimating(false);
            }, 1500);
        }
    };

    return React.createElement('div', { 
        id: 'openhash',
        className: 'py-16 px-4',
        style: { backgroundColor: '#f8f9fa' }
    },
        React.createElement('div', { className: 'max-w-6xl mx-auto' },
            React.createElement('div', { className: 'text-center mb-12' },
                React.createElement('div', { className: 'inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4',
                    style: { backgroundColor: '#dbeafe', color: '#1e40af' }
                }, '🔐 OpenHash Technology'),
                React.createElement('h2', { 
                    className: 'text-3xl font-bold mb-4',
                    style: { color: '#212529' }
                }, '오픈해시 확률적 계층 선택'),
                React.createElement('p', { 
                    className: 'text-lg',
                    style: { color: '#6b7280' }
                }, 'SHA-256 기반 4계층 분산 저장 알고리즘')
            ),
            
            // 4계층 구조 시각화
            React.createElement('div', { 
                className: 'rounded-xl p-6 mb-8 shadow-md',
                style: { backgroundColor: 'white', border: '1px solid #e5e7eb' }
            },
                React.createElement('h3', { 
                    className: 'text-xl font-bold text-center mb-6',
                    style: { color: '#212529' }
                }, '📊 확률적 4계층 분산 구조'),
                React.createElement('div', { className: 'grid grid-cols-4 gap-4' },
                    layers.map((layer, i) =>
                        React.createElement('div', {
                            key: i,
                            className: `rounded-xl p-4 text-center card-hover ${layerDemo?.selected_layer?.num === layer.num ? 'ring-2 pulse-glow' : ''}`,
                            style: { 
                                backgroundColor: layer.bgColor,
                                border: `1px solid ${layer.borderColor}`,
                                ...(layerDemo?.selected_layer?.num === layer.num && {
                                    ringColor: layer.borderColor
                                })
                            }
                        },
                            React.createElement('div', { className: 'text-3xl mb-2' }, ['🏥', '🏛️', '🖥️', '☁️'][i]),
                            React.createElement('div', { 
                                className: 'text-lg font-bold',
                                style: { color: layer.textColor }
                            }, `Layer ${layer.num}`),
                            React.createElement('div', { 
                                className: 'text-sm',
                                style: { color: '#374151' }
                            }, layer.name),
                            React.createElement('div', { 
                                className: 'text-xs mt-1',
                                style: { color: '#6b7280' }
                            }, layer.desc),
                            React.createElement('div', { 
                                className: 'text-lg font-bold mt-2',
                                style: { color: layer.textColor }
                            }, layer.prob),
                            React.createElement('div', { 
                                className: 'text-xs',
                                style: { color: '#6b7280' }
                            }, `범위: ${layer.range}`)
                        )
                    )
                )
            ),
            
            // 계층 선택 데모
            React.createElement('div', { 
                className: 'rounded-xl p-6 shadow-md',
                style: { backgroundColor: 'white', border: '1px solid #e5e7eb' }
            },
                React.createElement('div', { className: 'flex justify-between items-center mb-4' },
                    React.createElement('h3', { 
                        className: 'text-xl font-bold',
                        style: { color: '#212529' }
                    }, '🎯 계층 선택 시뮬레이션'),
                    React.createElement('button', {
                        onClick: runLayerDemo,
                        disabled: isAnimating,
                        className: `px-4 py-2 rounded-lg font-semibold transition-all ${isAnimating ? 'cursor-not-allowed' : ''}`,
                        style: {
                            backgroundColor: isAnimating ? '#f3f4f6' : '#0046FF',
                            color: isAnimating ? '#9ca3af' : 'white'
                        },
                        onMouseOver: (e) => {
                            if (!isAnimating) e.target.style.backgroundColor = '#0039CC';
                        },
                        onMouseOut: (e) => {
                            if (!isAnimating) e.target.style.backgroundColor = '#0046FF';
                        }
                    }, isAnimating ? '처리 중...' : '해시 생성 및 계층 선택')
                ),
                
                isAnimating && React.createElement('div', { className: 'text-center py-8' },
                    React.createElement('div', { className: 'text-4xl mb-4 animate-spin' }, '⚙️'),
                    React.createElement('p', { style: { color: '#0046FF' } }, 'SHA-256 재해싱 및 계층 선택 중...')
                ),
                
                layerDemo && !isAnimating && React.createElement('div', { className: 'space-y-4' },
                    React.createElement('div', { 
                        className: 'rounded-lg p-4',
                        style: { backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }
                    },
                        React.createElement('div', { 
                            className: 'text-sm font-semibold mb-2',
                            style: { color: '#6b7280' }
                        }, '1️⃣ 원본 해시 (SHA-256)'),
                        React.createElement('div', { 
                            className: 'font-mono text-xs break-all',
                            style: { color: '#374151' }
                        }, layerDemo.original_hash)
                    ),
                    React.createElement('div', { 
                        className: 'rounded-lg p-4',
                        style: { backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }
                    },
                        React.createElement('div', { 
                            className: 'text-sm font-semibold mb-2',
                            style: { color: '#6b7280' }
                        }, '2️⃣ 재해시 (SHA-256)'),
                        React.createElement('div', { 
                            className: 'font-mono text-xs break-all',
                            style: { color: '#374151' }
                        }, layerDemo.rehash)
                    ),
                    React.createElement('div', { 
                        className: 'rounded-lg p-4',
                        style: { backgroundColor: '#dbeafe', border: '1px solid #93c5fd' }
                    },
                        React.createElement('div', { 
                            className: 'text-sm font-semibold mb-2',
                            style: { color: '#1e40af' }
                        }, '3️⃣ 계층 선택 결과'),
                        React.createElement('div', { className: 'flex justify-between items-center' },
                            React.createElement('span', { 
                                className: 'font-bold',
                                style: { color: '#0046FF' }
                            }, `Layer ${layerDemo.selected_layer.num} 선택`),
                            React.createElement('span', { 
                                className: 'text-sm',
                                style: { color: '#6b7280' }
                            }, `값: ${layerDemo.layer_value} (범위: ${layerDemo.selected_layer.range})`)
                        )
                    )
                )
            )
        )
    );
};
