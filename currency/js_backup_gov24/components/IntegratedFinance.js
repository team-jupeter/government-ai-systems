const IntegratedFinance = ({ onShowModal }) => {
    const [selectedService, setSelectedService] = React.useState('deposit');
    const [amount, setAmount] = React.useState(10000000);
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const executeService = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api-currency/finance/integrated-service', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ service_type: selectedService, amount })
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            setResult({ error: error.message });
        }
        setLoading(false);
    };

    const services = [
        { id: 'deposit', name: '예금', icon: 'fa-piggy-bank', color: 'blue', category: '은행' },
        { id: 'loan', name: '대출', icon: 'fa-hand-holding-usd', color: 'red', category: '은행' },
        { id: 'insurance', name: '보험', icon: 'fa-shield-alt', color: 'green', category: '보험' },
        { id: 'investment', name: '투자', icon: 'fa-chart-line', color: 'purple', category: '증권' },
        { id: 'pension', name: '연금', icon: 'fa-umbrella-beach', color: 'yellow', category: '증권' }
    ];

    return React.createElement('section', { className: 'py-16 px-4 bg-gray-800' },
        React.createElement('div', { className: 'max-w-6xl mx-auto' },
            React.createElement('div', { className: 'text-center mb-12' },
                React.createElement('h2', { className: 'text-3xl font-bold mb-4' },
                    React.createElement('i', { className: 'fas fa-university mr-3 text-indigo-400' }),
                    '통합 금융 서비스'
                ),
                React.createElement('p', { className: 'text-gray-400 max-w-2xl mx-auto' },
                    '은행·보험·증권 단일 플랫폼 | AI 최적화 추천 | 연간 492만원 절감 효과'
                )
            ),
            React.createElement('div', { className: 'grid grid-cols-5 gap-4 mb-8' },
                services.map(s =>
                    React.createElement('button', {
                        key: s.id,
                        onClick: () => setSelectedService(s.id),
                        className: `p-4 rounded-xl text-center transition-all ${selectedService === s.id ? `bg-${s.color}-600 ring-2 ring-${s.color}-400` : 'bg-gray-900 hover:bg-gray-700'}`
                    },
                        React.createElement('i', { className: `fas ${s.icon} text-2xl mb-2 ${selectedService === s.id ? 'text-white' : `text-${s.color}-400`}` }),
                        React.createElement('div', { className: 'font-bold' }, s.name),
                        React.createElement('div', { className: 'text-xs text-gray-400' }, s.category)
                    )
                )
            ),
            React.createElement('div', { className: 'max-w-xl mx-auto bg-gray-900 rounded-xl p-6 border border-gray-700' },
                React.createElement('div', { className: 'mb-4' },
                    React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '금액 (원)'),
                    React.createElement('input', {
                        type: 'number',
                        value: amount,
                        onChange: e => setAmount(parseInt(e.target.value) || 0),
                        className: 'w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-3 text-lg'
                    })
                ),
                React.createElement('button', {
                    onClick: executeService,
                    disabled: loading,
                    className: 'w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 rounded-lg font-medium'
                }, loading ? '처리 중...' : '서비스 시뮬레이션'),
                result?.service && React.createElement('div', { className: 'mt-6 space-y-4' },
                    React.createElement('div', { className: 'p-4 bg-indigo-900/30 rounded-lg border border-indigo-500/30 text-center' },
                        React.createElement('div', { className: 'text-gray-400 mb-1' }, result.service.name, ' (', result.service.category, ')'),
                        React.createElement('div', { className: 'text-3xl font-bold text-indigo-400' },
                            result.service.amount?.toLocaleString(), '원'
                        ),
                        React.createElement('div', { className: 'text-sm text-gray-400 mt-2' },
                            '연이율 ', result.service.annual_rate, ' → 예상 연수익 ',
                            React.createElement('span', { className: 'text-green-400 font-bold' },
                                result.service.expected_annual_return?.toLocaleString(), '원'
                            )
                        )
                    ),
                    React.createElement('div', { className: 'grid grid-cols-2 gap-3' },
                        React.createElement('div', { className: 'p-3 bg-gray-800 rounded-lg text-center' },
                            React.createElement('div', { className: 'text-xs text-gray-500' }, '개인 연간 절감'),
                            React.createElement('div', { className: 'text-lg font-bold text-green-400' },
                                result.cost_savings?.annual_personal_savings?.toLocaleString(), '원'
                            )
                        ),
                        React.createElement('div', { className: 'p-3 bg-gray-800 rounded-lg text-center' },
                            React.createElement('div', { className: 'text-xs text-gray-500' }, '기관 연간 절감'),
                            React.createElement('div', { className: 'text-lg font-bold text-green-400' },
                                (result.cost_savings?.annual_institution_savings / 100000000).toFixed(1), '억원'
                            )
                        )
                    ),
                    React.createElement('div', { className: 'flex items-center justify-center gap-4 text-sm text-gray-400' },
                        React.createElement('span', null, '✅ 은행-보험-증권 통합'),
                        React.createElement('span', null, '✅ AI 최적화'),
                        React.createElement('span', null, '✅ 단일 플랫폼')
                    )
                )
            )
        )
    );
};
