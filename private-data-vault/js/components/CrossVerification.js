const CrossVerification = ({ onShowModal }) => {
    const [partyA, setPartyA] = React.useState({ name: '개인 A', amount: 1000000, description: '컨설팅 비용' });
    const [partyB, setPartyB] = React.useState({ name: '법인 B', amount: 1000000, description: '컨설팅 비용' });
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const runVerification = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api-private-data-vault/pdv/cross-verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    party_a: partyA,
                    party_b: partyB
                })
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            setResult({ error: '검증 실패: ' + error.message });
        }
        setLoading(false);
    };

    const setMismatchExample = () => {
        setPartyA({ name: '개인 A', amount: 1000000, description: '컨설팅 비용' });
        setPartyB({ name: '법인 B', amount: 500000, description: '컨설팅 비용' });
        setResult(null);
    };

    const setMatchExample = () => {
        setPartyA({ name: '개인 A', amount: 1000000, description: '컨설팅 비용' });
        setPartyB({ name: '법인 B', amount: 1000000, description: '컨설팅 비용' });
        setResult(null);
    };

    return React.createElement('section', { className: 'py-16 px-4 bg-gray-900' },
        React.createElement('div', { className: 'max-w-6xl mx-auto' },
            React.createElement('div', { className: 'text-center mb-12' },
                React.createElement('h2', { className: 'text-3xl font-bold mb-4' },
                    React.createElement('i', { className: 'fas fa-check-double mr-3 text-yellow-400' }),
                    '교차 검증 시뮬레이터'
                ),
                React.createElement('p', { className: 'text-gray-400 max-w-2xl mx-auto' },
                    '거래 당사자 간 자동 교차 검증 | 허위 데이터 즉시 탐지 | AWS 실증 실험 검증 완료'
                )
            ),
            // 예제 버튼
            React.createElement('div', { className: 'flex justify-center gap-4 mb-8' },
                React.createElement('button', {
                    onClick: setMatchExample,
                    className: 'px-4 py-2 bg-green-600/30 hover:bg-green-600/50 border border-green-500 rounded-lg text-green-400 transition-colors'
                },
                    React.createElement('i', { className: 'fas fa-check mr-2' }),
                    '일치 예제'
                ),
                React.createElement('button', {
                    onClick: setMismatchExample,
                    className: 'px-4 py-2 bg-red-600/30 hover:bg-red-600/50 border border-red-500 rounded-lg text-red-400 transition-colors'
                },
                    React.createElement('i', { className: 'fas fa-times mr-2' }),
                    '불일치 예제 (허위 신고)'
                )
            ),
            React.createElement('div', { className: 'grid lg:grid-cols-3 gap-6' },
                // Party A 입력
                React.createElement('div', { className: 'bg-gray-800 rounded-xl p-6 border border-blue-500/30' },
                    React.createElement('div', { className: 'flex items-center gap-3 mb-6' },
                        React.createElement('div', { className: 'w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center' },
                            React.createElement('i', { className: 'fas fa-user text-blue-400 text-xl' })
                        ),
                        React.createElement('div', null,
                            React.createElement('h3', { className: 'font-bold text-blue-400' }, '개인 A의 PDV'),
                            React.createElement('p', { className: 'text-xs text-gray-500' }, '정직한 기록')
                        )
                    ),
                    React.createElement('div', { className: 'space-y-4' },
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '이름'),
                            React.createElement('input', {
                                type: 'text',
                                value: partyA.name,
                                onChange: e => setPartyA({...partyA, name: e.target.value}),
                                className: 'w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none'
                            })
                        ),
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '거래 금액 (원)'),
                            React.createElement('input', {
                                type: 'number',
                                value: partyA.amount,
                                onChange: e => setPartyA({...partyA, amount: parseInt(e.target.value) || 0}),
                                className: 'w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none'
                            })
                        ),
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '거래 내용'),
                            React.createElement('input', {
                                type: 'text',
                                value: partyA.description,
                                onChange: e => setPartyA({...partyA, description: e.target.value}),
                                className: 'w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:outline-none'
                            })
                        )
                    )
                ),
                // Party B 입력
                React.createElement('div', { className: 'bg-gray-800 rounded-xl p-6 border border-purple-500/30' },
                    React.createElement('div', { className: 'flex items-center gap-3 mb-6' },
                        React.createElement('div', { className: 'w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center' },
                            React.createElement('i', { className: 'fas fa-building text-purple-400 text-xl' })
                        ),
                        React.createElement('div', null,
                            React.createElement('h3', { className: 'font-bold text-purple-400' }, '법인 B의 PDV'),
                            React.createElement('p', { className: 'text-xs text-gray-500' }, '기록 확인 필요')
                        )
                    ),
                    React.createElement('div', { className: 'space-y-4' },
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '이름'),
                            React.createElement('input', {
                                type: 'text',
                                value: partyB.name,
                                onChange: e => setPartyB({...partyB, name: e.target.value}),
                                className: 'w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:border-purple-500 focus:outline-none'
                            })
                        ),
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '거래 금액 (원)'),
                            React.createElement('input', {
                                type: 'number',
                                value: partyB.amount,
                                onChange: e => setPartyB({...partyB, amount: parseInt(e.target.value) || 0}),
                                className: 'w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:border-purple-500 focus:outline-none'
                            })
                        ),
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '거래 내용'),
                            React.createElement('input', {
                                type: 'text',
                                value: partyB.description,
                                onChange: e => setPartyB({...partyB, description: e.target.value}),
                                className: 'w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:border-purple-500 focus:outline-none'
                            })
                        )
                    )
                ),
                // 결과
                React.createElement('div', { className: 'bg-gray-800 rounded-xl p-6 border border-gray-700' },
                    React.createElement('h3', { className: 'font-bold text-gray-300 mb-4' },
                        React.createElement('i', { className: 'fas fa-clipboard-check mr-2' }),
                        '교차 검증 결과'
                    ),
                    React.createElement('button', {
                        onClick: runVerification,
                        disabled: loading,
                        className: 'w-full py-3 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 rounded-lg font-medium mb-4 transition-colors'
                    },
                        loading ? '검증 중...' : React.createElement('span', null,
                            React.createElement('i', { className: 'fas fa-sync-alt mr-2' }),
                            '교차 검증 실행'
                        )
                    ),
                    result ? (
                        result.error ?
                            React.createElement('div', { className: 'text-red-400 p-3 bg-red-900/20 rounded-lg text-sm' }, result.error)
                        :
                            React.createElement('div', { className: 'space-y-3' },
                                React.createElement('div', { 
                                    className: `p-4 rounded-lg text-center ${result.status === 'success' ? 'bg-green-900/30 border border-green-500' : 'bg-red-900/30 border border-red-500'}`
                                },
                                    React.createElement('div', { className: 'text-3xl mb-2' }, 
                                        result.status === 'success' ? '✅' : '⚠️'
                                    ),
                                    React.createElement('div', { 
                                        className: `text-xl font-bold ${result.status === 'success' ? 'text-green-400' : 'text-red-400'}`
                                    }, result.verification_result)
                                ),
                                result.alert && React.createElement('div', { className: 'p-3 bg-red-900/20 rounded-lg text-red-300 text-sm' },
                                    React.createElement('div', { className: 'font-bold mb-1' }, result.alert),
                                    React.createElement('div', null, `A 기록: ${result.party_a_amount?.toLocaleString()}원`),
                                    React.createElement('div', null, `B 기록: ${result.party_b_amount?.toLocaleString()}원`),
                                    React.createElement('div', { className: 'mt-2 text-yellow-400' }, result.action)
                                ),
                                React.createElement('div', { className: 'text-xs space-y-1' },
                                    React.createElement('div', { className: 'text-gray-500' }, 'A 해시:'),
                                    React.createElement('div', { className: 'hash-display text-gray-400 bg-gray-900 p-1 rounded' }, 
                                        result.party_a_hash?.substring(0, 32) + '...'
                                    ),
                                    React.createElement('div', { className: 'text-gray-500 mt-2' }, 'B 해시:'),
                                    React.createElement('div', { className: 'hash-display text-gray-400 bg-gray-900 p-1 rounded' }, 
                                        result.party_b_hash?.substring(0, 32) + '...'
                                    )
                                )
                            )
                    ) : React.createElement('div', { className: 'text-center text-gray-500 py-6' },
                        React.createElement('i', { className: 'fas fa-balance-scale text-3xl mb-2' }),
                        React.createElement('p', { className: 'text-sm' }, '검증 버튼을 클릭하세요')
                    )
                )
            )
        )
    );
};
