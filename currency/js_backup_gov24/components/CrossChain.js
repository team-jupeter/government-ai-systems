const CrossChain = ({ onShowModal }) => {
    const [formData, setFormData] = React.useState({
        source_chain: 'Ethereum',
        target_chain: 'Polygon',
        amount: 1000,
        asset_type: 'USDC'
    });
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const executeTransfer = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api-currency/crosschain/transfer', {
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

    const chains = ['Ethereum', 'Polygon', 'BSC', 'Avalanche', 'Solana'];
    const assets = ['USDC', 'USDT', 'DAI', 'WETH', 'WBTC'];

    return React.createElement('section', { className: 'py-16 px-4 bg-gray-900' },
        React.createElement('div', { className: 'max-w-6xl mx-auto' },
            React.createElement('div', { className: 'text-center mb-12' },
                React.createElement('h2', { className: 'text-3xl font-bold mb-4' },
                    React.createElement('i', { className: 'fas fa-link mr-3 text-cyan-400' }),
                    '크로스체인 자산 이동'
                ),
                React.createElement('p', { className: 'text-gray-400 max-w-2xl mx-auto' },
                    'Lock-and-Mint 프로토콜 | 60초 이내 원자적 전송 | 5개 체인 지원'
                )
            ),
            React.createElement('div', { className: 'max-w-2xl mx-auto' },
                React.createElement('div', { className: 'bg-gray-800 rounded-xl p-6 border border-gray-700' },
                    React.createElement('div', { className: 'grid grid-cols-5 gap-2 mb-6' },
                        chains.map(chain =>
                            React.createElement('div', { 
                                key: chain, 
                                className: `text-center p-2 rounded-lg text-xs ${formData.source_chain === chain || formData.target_chain === chain ? 'bg-cyan-600' : 'bg-gray-700'}`
                            }, chain)
                        )
                    ),
                    React.createElement('div', { className: 'grid grid-cols-2 gap-4 mb-4' },
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '출발 체인'),
                            React.createElement('select', {
                                value: formData.source_chain,
                                onChange: e => setFormData({...formData, source_chain: e.target.value}),
                                className: 'w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2'
                            },
                                chains.map(c => React.createElement('option', { key: c, value: c }, c))
                            )
                        ),
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '도착 체인'),
                            React.createElement('select', {
                                value: formData.target_chain,
                                onChange: e => setFormData({...formData, target_chain: e.target.value}),
                                className: 'w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2'
                            },
                                chains.map(c => React.createElement('option', { key: c, value: c }, c))
                            )
                        )
                    ),
                    React.createElement('div', { className: 'grid grid-cols-2 gap-4 mb-6' },
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '자산'),
                            React.createElement('select', {
                                value: formData.asset_type,
                                onChange: e => setFormData({...formData, asset_type: e.target.value}),
                                className: 'w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2'
                            },
                                assets.map(a => React.createElement('option', { key: a, value: a }, a))
                            )
                        ),
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '수량'),
                            React.createElement('input', {
                                type: 'number',
                                value: formData.amount,
                                onChange: e => setFormData({...formData, amount: parseInt(e.target.value) || 0}),
                                className: 'w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2'
                            })
                        )
                    ),
                    React.createElement('button', {
                        onClick: executeTransfer,
                        disabled: loading || formData.source_chain === formData.target_chain,
                        className: 'w-full py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 rounded-lg font-medium'
                    }, loading ? '전송 중...' : React.createElement('span', null,
                        React.createElement('i', { className: 'fas fa-exchange-alt mr-2' }),
                        '크로스체인 전송'
                    )),
                    result && !result.error && React.createElement('div', { className: 'mt-6 space-y-4' },
                        React.createElement('div', { className: 'p-4 bg-green-900/30 rounded-lg border border-green-500 text-center' },
                            React.createElement('div', { className: 'text-3xl mb-2' }, '✅'),
                            React.createElement('div', { className: 'text-green-400 font-bold' }, '전송 완료'),
                            React.createElement('div', { className: 'text-gray-400' },
                                result.transfer.amount, ' ', result.transfer.asset, ' → ', result.transfer.target_chain
                            )
                        ),
                        React.createElement('div', { className: 'grid grid-cols-2 gap-2 text-sm' },
                            React.createElement('div', { className: 'bg-gray-900 p-3 rounded' },
                                React.createElement('div', { className: 'text-gray-500' }, 'Lock TX'),
                                React.createElement('div', { className: 'hash-display' }, result.transactions.lock_tx)
                            ),
                            React.createElement('div', { className: 'bg-gray-900 p-3 rounded' },
                                React.createElement('div', { className: 'text-gray-500' }, 'Mint TX'),
                                React.createElement('div', { className: 'hash-display' }, result.transactions.mint_tx)
                            )
                        ),
                        React.createElement('div', { className: 'text-center text-sm text-gray-500' },
                            '소요 시간: ', result.performance.total_time_seconds, '초 (목표: 60초 이내)'
                        )
                    )
                )
            )
        )
    );
};
