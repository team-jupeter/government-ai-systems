const TaxAutomation = ({ onShowModal }) => {
    const [formData, setFormData] = React.useState({
        tax_type: 'income',
        income: 72000000,
        expenses: 12000000
    });
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const calculateTax = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api-currency/tax/calculate', {
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

    const taxTypes = [
        { value: 'income', label: '개인소득세', icon: 'fa-user' },
        { value: 'corporate', label: '법인세', icon: 'fa-building' },
        { value: 'vat', label: '부가가치세', icon: 'fa-receipt' }
    ];

    return React.createElement('section', { className: 'py-16 px-4 bg-gray-800' },
        React.createElement('div', { className: 'max-w-6xl mx-auto' },
            React.createElement('div', { className: 'text-center mb-12' },
                React.createElement('h2', { className: 'text-3xl font-bold mb-4' },
                    React.createElement('i', { className: 'fas fa-calculator mr-3 text-orange-400' }),
                    '자동 세무 처리'
                ),
                React.createElement('p', { className: 'text-gray-400 max-w-2xl mx-auto' },
                    '개인소득세·법인세·부가가치세 자동 계산 | 0.002ms 처리 | 자동 신고 준비'
                )
            ),
            React.createElement('div', { className: 'grid lg:grid-cols-2 gap-8' },
                React.createElement('div', { className: 'bg-gray-900 rounded-xl p-6 border border-gray-700' },
                    React.createElement('h3', { className: 'text-xl font-bold mb-6 text-orange-400' },
                        React.createElement('i', { className: 'fas fa-coins mr-2' }),
                        '세금 계산'
                    ),
                    React.createElement('div', { className: 'flex gap-2 mb-6' },
                        taxTypes.map(t =>
                            React.createElement('button', {
                                key: t.value,
                                onClick: () => setFormData({...formData, tax_type: t.value}),
                                className: `flex-1 py-2 px-3 rounded-lg text-sm ${formData.tax_type === t.value ? 'bg-orange-600' : 'bg-gray-700 hover:bg-gray-600'}`
                            },
                                React.createElement('i', { className: `fas ${t.icon} mr-1` }),
                                t.label
                            )
                        )
                    ),
                    React.createElement('div', { className: 'space-y-4' },
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, 
                                formData.tax_type === 'vat' ? '매출액 (원)' : '총수입 (원)'
                            ),
                            React.createElement('input', {
                                type: 'number',
                                value: formData.income,
                                onChange: e => setFormData({...formData, income: parseInt(e.target.value) || 0}),
                                className: 'w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2'
                            })
                        ),
                        formData.tax_type !== 'vat' && React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '필요경비/공제 (원)'),
                            React.createElement('input', {
                                type: 'number',
                                value: formData.expenses,
                                onChange: e => setFormData({...formData, expenses: parseInt(e.target.value) || 0}),
                                className: 'w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2'
                            })
                        )
                    ),
                    React.createElement('button', {
                        onClick: calculateTax,
                        disabled: loading,
                        className: 'w-full mt-6 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 rounded-lg font-medium'
                    }, loading ? '계산 중...' : '세금 자동 계산')
                ),
                React.createElement('div', { className: 'bg-gray-900 rounded-xl p-6 border border-gray-700' },
                    React.createElement('h3', { className: 'text-xl font-bold mb-6 text-green-400' },
                        React.createElement('i', { className: 'fas fa-file-alt mr-2' }),
                        '계산 결과'
                    ),
                    result?.tax_calculation ? React.createElement('div', { className: 'space-y-4' },
                        React.createElement('div', { className: 'p-6 bg-gradient-to-br from-orange-900/30 to-yellow-900/30 rounded-xl border border-orange-500/30 text-center' },
                            React.createElement('div', { className: 'text-gray-400 mb-2' }, '납부할 세금'),
                            React.createElement('div', { className: 'text-4xl font-bold text-orange-400' },
                                result.tax_calculation.tax_amount?.toLocaleString(), '원'
                            ),
                            React.createElement('div', { className: 'text-sm text-gray-500 mt-2' },
                                '세율: ', result.tax_calculation.tax_rate
                            )
                        ),
                        React.createElement('div', { className: 'space-y-2' },
                            React.createElement('div', { className: 'flex justify-between p-3 bg-gray-800 rounded' },
                                React.createElement('span', { className: 'text-gray-400' }, '총수입'),
                                React.createElement('span', null, result.tax_calculation.gross_income?.toLocaleString(), '원')
                            ),
                            result.tax_calculation.deductible_expenses > 0 && React.createElement('div', { className: 'flex justify-between p-3 bg-gray-800 rounded' },
                                React.createElement('span', { className: 'text-gray-400' }, '공제액'),
                                React.createElement('span', { className: 'text-green-400' }, '-', result.tax_calculation.deductible_expenses?.toLocaleString(), '원')
                            ),
                            React.createElement('div', { className: 'flex justify-between p-3 bg-gray-800 rounded' },
                                React.createElement('span', { className: 'text-gray-400' }, '과세표준'),
                                React.createElement('span', null, result.tax_calculation.taxable_income?.toLocaleString(), '원')
                            )
                        ),
                        React.createElement('div', { className: 'p-4 bg-green-900/20 rounded-lg border border-green-700' },
                            React.createElement('div', { className: 'flex items-center gap-2 text-green-400' },
                                React.createElement('i', { className: 'fas fa-check-circle' }),
                                React.createElement('span', { className: 'font-bold' }, '자동 신고 준비 완료')
                            ),
                            React.createElement('div', { className: 'text-xs text-gray-400 mt-1' },
                                '국세청 전자신고 형식 준비됨 | 처리시간: ', result.tax_calculation.processing_time_ms, 'ms'
                            )
                        )
                    ) : React.createElement('div', { className: 'text-center text-gray-500 py-12' },
                        React.createElement('i', { className: 'fas fa-calculator text-4xl mb-4' }),
                        React.createElement('p', null, '세금을 계산하면 결과가 표시됩니다')
                    )
                )
            )
        )
    );
};
