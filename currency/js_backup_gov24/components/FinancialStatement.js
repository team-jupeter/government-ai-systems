const FinancialStatement = ({ onShowModal }) => {
    const [formData, setFormData] = React.useState({
        user_id: 'USER001',
        type: 'income',
        amount: 5000000,
        description: '급여 수령',
        prev_assets: 50000000,
        prev_liabilities: 10000000
    });
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const generateStatement = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api-currency/financial/generate-statement', {
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

    const transactionTypes = [
        { value: 'income', label: '수입 (급여, 매출 등)' },
        { value: 'expense', label: '지출 (비용)' },
        { value: 'loan', label: '차입 (대출)' }
    ];

    return React.createElement('section', { className: 'py-16 px-4 bg-gray-900' },
        React.createElement('div', { className: 'max-w-6xl mx-auto' },
            React.createElement('div', { className: 'text-center mb-12' },
                React.createElement('h2', { className: 'text-3xl font-bold mb-4' },
                    React.createElement('i', { className: 'fas fa-file-invoice-dollar mr-3 text-green-400' }),
                    '실시간 재무제표 자동 생성'
                ),
                React.createElement('p', { className: 'text-gray-400 max-w-2xl mx-auto' },
                    'AI 계정 분류 | 총자산=총부채+총자본 실시간 검증 | 분식회계 원천 차단'
                )
            ),
            React.createElement('div', { className: 'grid lg:grid-cols-2 gap-8' },
                React.createElement('div', { className: 'bg-gray-800 rounded-xl p-6 border border-gray-700' },
                    React.createElement('h3', { className: 'text-xl font-bold mb-6 text-green-400' },
                        React.createElement('i', { className: 'fas fa-edit mr-2' }),
                        '거래 입력'
                    ),
                    React.createElement('div', { className: 'space-y-4' },
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '거래 유형'),
                            React.createElement('select', {
                                value: formData.type,
                                onChange: e => setFormData({...formData, type: e.target.value}),
                                className: 'w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2'
                            },
                                transactionTypes.map(t => 
                                    React.createElement('option', { key: t.value, value: t.value }, t.label)
                                )
                            )
                        ),
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '금액 (원)'),
                            React.createElement('input', {
                                type: 'number',
                                value: formData.amount,
                                onChange: e => setFormData({...formData, amount: parseInt(e.target.value) || 0}),
                                className: 'w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2'
                            })
                        ),
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '거래 내용'),
                            React.createElement('input', {
                                type: 'text',
                                value: formData.description,
                                onChange: e => setFormData({...formData, description: e.target.value}),
                                className: 'w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2'
                            })
                        ),
                        React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
                            React.createElement('div', null,
                                React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '기존 총자산'),
                                React.createElement('input', {
                                    type: 'number',
                                    value: formData.prev_assets,
                                    onChange: e => setFormData({...formData, prev_assets: parseInt(e.target.value) || 0}),
                                    className: 'w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2'
                                })
                            ),
                            React.createElement('div', null,
                                React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '기존 총부채'),
                                React.createElement('input', {
                                    type: 'number',
                                    value: formData.prev_liabilities,
                                    onChange: e => setFormData({...formData, prev_liabilities: parseInt(e.target.value) || 0}),
                                    className: 'w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2'
                                })
                            )
                        )
                    ),
                    React.createElement('button', {
                        onClick: generateStatement,
                        disabled: loading,
                        className: 'w-full mt-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg font-medium'
                    }, loading ? '생성 중...' : '재무제표 자동 생성')
                ),
                React.createElement('div', { className: 'bg-gray-800 rounded-xl p-6 border border-gray-700' },
                    React.createElement('h3', { className: 'text-xl font-bold mb-6 text-blue-400' },
                        React.createElement('i', { className: 'fas fa-balance-scale mr-2' }),
                        '재무상태표'
                    ),
                    result?.statement ? React.createElement('div', { className: 'space-y-4' },
                        React.createElement('div', { 
                            className: `p-4 rounded-lg text-center ${result.statement.balance_sheet.balance_verified ? 'bg-green-900/30 border border-green-500' : 'bg-red-900/30 border border-red-500'}`
                        },
                            React.createElement('div', { className: 'text-2xl mb-2' }, 
                                result.statement.balance_sheet.balance_verified ? '✅' : '❌'
                            ),
                            React.createElement('div', { className: 'font-bold' }, 
                                result.statement.balance_sheet.balance_verified ? '대차균형 검증 완료' : '대차균형 오류'
                            ),
                            React.createElement('div', { className: 'text-xs text-gray-400 mt-1' },
                                '총자산 = 총부채 + 총자본'
                            )
                        ),
                        React.createElement('div', { className: 'space-y-2' },
                            React.createElement('div', { className: 'flex justify-between p-3 bg-blue-900/20 rounded' },
                                React.createElement('span', null, '총자산'),
                                React.createElement('span', { className: 'font-bold text-blue-400' },
                                    result.statement.balance_sheet.total_assets?.toLocaleString(), '원'
                                )
                            ),
                            React.createElement('div', { className: 'flex justify-between p-3 bg-red-900/20 rounded' },
                                React.createElement('span', null, '총부채'),
                                React.createElement('span', { className: 'font-bold text-red-400' },
                                    result.statement.balance_sheet.total_liabilities?.toLocaleString(), '원'
                                )
                            ),
                            React.createElement('div', { className: 'flex justify-between p-3 bg-green-900/20 rounded' },
                                React.createElement('span', null, '총자본'),
                                React.createElement('span', { className: 'font-bold text-green-400' },
                                    result.statement.balance_sheet.total_equity?.toLocaleString(), '원'
                                )
                            )
                        ),
                        React.createElement('div', { className: 'p-4 bg-gray-900 rounded-lg' },
                            React.createElement('div', { className: 'text-sm text-gray-500 mb-2' }, '복식부기 자동 분류'),
                            React.createElement('div', { className: 'grid grid-cols-2 gap-2 text-sm' },
                                React.createElement('div', null,
                                    React.createElement('span', { className: 'text-gray-500' }, '차변: '),
                                    React.createElement('span', { className: 'text-white' }, result.statement.transaction.debit_account)
                                ),
                                React.createElement('div', null,
                                    React.createElement('span', { className: 'text-gray-500' }, '대변: '),
                                    React.createElement('span', { className: 'text-white' }, result.statement.transaction.credit_account)
                                )
                            )
                        ),
                        React.createElement('div', { className: 'text-xs text-gray-500 text-center' },
                            '처리 시간: ', result.statement.processing.total_time_ms, 'ms | 정확도: ', result.statement.processing.accuracy
                        )
                    ) : React.createElement('div', { className: 'text-center text-gray-500 py-12' },
                        React.createElement('i', { className: 'fas fa-file-invoice text-4xl mb-4' }),
                        React.createElement('p', null, '거래를 입력하면 재무제표가 자동 생성됩니다')
                    )
                )
            )
        )
    );
};
