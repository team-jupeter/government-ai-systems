const FPGASection = ({ onShowModal }) => {
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [formData, setFormData] = React.useState({
        sender: 'Alice',
        receiver: 'Bob',
        amount: 1000000
    });

    const generateZKP = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api-currency/fpga/zkp-generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            setResult({ error: error.message });
        }
        setLoading(false);
    };

    const specs = [
        { label: 'DSP 슬라이스', value: '1,757개', icon: 'fa-microchip' },
        { label: 'BRAM 블록', value: '1,685개', icon: 'fa-memory' },
        { label: '동작 주파수', value: '400MHz', icon: 'fa-wave-square' },
        { label: '전력 소모', value: '45W', icon: 'fa-bolt' }
    ];

    return React.createElement('section', { className: 'py-16 px-4 bg-gray-900' },
        React.createElement('div', { className: 'max-w-6xl mx-auto' },
            React.createElement('div', { className: 'text-center mb-12' },
                React.createElement('h2', { className: 'text-3xl font-bold mb-4' },
                    React.createElement('i', { className: 'fas fa-microchip mr-3 text-yellow-400' }),
                    'FPGA 기반 영지식 증명'
                ),
                React.createElement('p', { className: 'text-gray-400 max-w-2xl mx-auto' },
                    'BN254 타원곡선 페어링 연산 | 400MHz 하드웨어 가속 | GPU 대비 88.6% 전력 절감'
                )
            ),
            React.createElement('div', { className: 'grid lg:grid-cols-2 gap-8' },
                React.createElement('div', { className: 'bg-gray-800 rounded-xl p-6 border border-gray-700' },
                    React.createElement('h3', { className: 'text-xl font-bold mb-6 text-yellow-400' },
                        React.createElement('i', { className: 'fas fa-lock mr-2' }),
                        '영지식 증명 생성'
                    ),
                    React.createElement('div', { className: 'space-y-4 mb-6' },
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '송신자'),
                            React.createElement('input', {
                                type: 'text',
                                value: formData.sender,
                                onChange: e => setFormData({...formData, sender: e.target.value}),
                                className: 'w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2'
                            })
                        ),
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '수신자'),
                            React.createElement('input', {
                                type: 'text',
                                value: formData.receiver,
                                onChange: e => setFormData({...formData, receiver: e.target.value}),
                                className: 'w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2'
                            })
                        ),
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '금액 (원)'),
                            React.createElement('input', {
                                type: 'number',
                                value: formData.amount,
                                onChange: e => setFormData({...formData, amount: parseInt(e.target.value) || 0}),
                                className: 'w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2'
                            })
                        )
                    ),
                    React.createElement('button', {
                        onClick: generateZKP,
                        disabled: loading,
                        className: 'w-full py-3 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 rounded-lg font-medium'
                    }, loading ? '생성 중...' : 'ZKP 증명 생성'),
                    React.createElement('div', { className: 'grid grid-cols-2 gap-3 mt-6' },
                        specs.map((spec, i) =>
                            React.createElement('div', { key: i, className: 'bg-gray-900 rounded-lg p-3 text-center' },
                                React.createElement('i', { className: `fas ${spec.icon} text-yellow-400 mb-1` }),
                                React.createElement('div', { className: 'text-xs text-gray-500' }, spec.label),
                                React.createElement('div', { className: 'text-sm font-bold' }, spec.value)
                            )
                        )
                    )
                ),
                React.createElement('div', { className: 'bg-gray-800 rounded-xl p-6 border border-gray-700' },
                    React.createElement('h3', { className: 'text-xl font-bold mb-6 text-green-400' },
                        React.createElement('i', { className: 'fas fa-check-circle mr-2' }),
                        '생성 결과'
                    ),
                    result ? (
                        result.error ?
                            React.createElement('div', { className: 'text-red-400 p-4 bg-red-900/20 rounded-lg' }, result.error)
                        :
                            React.createElement('div', { className: 'space-y-4' },
                                React.createElement('div', { className: 'p-4 bg-green-900/20 rounded-lg border border-green-700 text-center' },
                                    React.createElement('div', { className: 'text-3xl mb-2' }, '✅'),
                                    React.createElement('div', { className: 'text-green-400 font-bold' }, 'ZKP 증명 생성 완료'),
                                    React.createElement('div', { className: 'text-2xl font-bold text-white mt-2' }, 
                                        result.processing_time_ms, 'ms'
                                    )
                                ),
                                React.createElement('div', { className: 'space-y-2' },
                                    ['pi_a', 'pi_b', 'pi_c'].map(key =>
                                        React.createElement('div', { key, className: 'bg-gray-900 p-2 rounded' },
                                            React.createElement('div', { className: 'text-xs text-gray-500' }, key),
                                            React.createElement('div', { className: 'hash-display text-gray-400' },
                                                result.zkp_proof?.[key]?.substring(0, 32) + '...'
                                            )
                                        )
                                    )
                                ),
                                React.createElement('div', { className: 'grid grid-cols-2 gap-2 text-sm' },
                                    React.createElement('div', { className: 'bg-gray-900 p-2 rounded text-center' },
                                        React.createElement('div', { className: 'text-gray-500' }, '전력 절감'),
                                        React.createElement('div', { className: 'text-green-400 font-bold' }, result.energy_saving_vs_gpu)
                                    ),
                                    React.createElement('div', { className: 'bg-gray-900 p-2 rounded text-center' },
                                        React.createElement('div', { className: 'text-gray-500' }, 'FPGA 주파수'),
                                        React.createElement('div', { className: 'text-yellow-400 font-bold' }, result.fpga_frequency)
                                    )
                                )
                            )
                    ) : React.createElement('div', { className: 'text-center text-gray-500 py-12' },
                        React.createElement('i', { className: 'fas fa-microchip text-4xl mb-4' }),
                        React.createElement('p', null, 'ZKP를 생성하면 결과가 표시됩니다')
                    )
                )
            )
        )
    );
};
