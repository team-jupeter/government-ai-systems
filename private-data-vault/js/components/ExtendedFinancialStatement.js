const ExtendedFinancialStatement = ({ onShowModal }) => {
    const [formData, setFormData] = React.useState({
        who: '',
        when: '',
        where: '',
        what: '',
        how: '',
        why: '',
        type: 'general',
        amount: '',
        counterparty: '',
        debit_account: '비용',
        credit_account: '현금'
    });
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api-private-data-vault/pdv/create-record', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    amount: parseFloat(formData.amount) || 0
                })
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            setResult({ error: '레코드 생성 실패: ' + error.message });
        }
        setLoading(false);
    };

    const sixWPrinciples = [
        { key: 'who', label: '누가 (Who)', icon: 'fa-user', placeholder: '예: 홍길동' },
        { key: 'when', label: '언제 (When)', icon: 'fa-clock', placeholder: '예: 2025-11-27 14:30' },
        { key: 'where', label: '어디서 (Where)', icon: 'fa-map-marker-alt', placeholder: '예: 서울시 강남구' },
        { key: 'what', label: '무엇을 (What)', icon: 'fa-box', placeholder: '예: 점심 식사' },
        { key: 'how', label: '어떻게 (How)', icon: 'fa-cogs', placeholder: '예: 신용카드 결제' },
        { key: 'why', label: '왜 (Why)', icon: 'fa-question-circle', placeholder: '예: 업무 미팅' }
    ];

    return React.createElement('section', { className: 'py-16 px-4 bg-gray-800' },
        React.createElement('div', { className: 'max-w-6xl mx-auto' },
            React.createElement('div', { className: 'text-center mb-12' },
                React.createElement('h2', { className: 'text-3xl font-bold mb-4' },
                    React.createElement('i', { className: 'fas fa-file-invoice-dollar mr-3 text-green-400' }),
                    '확장 재무제표'
                ),
                React.createElement('p', { className: 'text-gray-400 max-w-2xl mx-auto' },
                    '6하 원칙에 따라 모든 활동을 구조화하여 기록 | 금전 거래 시 자동 차변/대변 생성'
                )
            ),
            React.createElement('div', { className: 'grid lg:grid-cols-2 gap-8' },
                // 입력 폼
                React.createElement('div', { className: 'bg-gray-900 rounded-xl p-6 border border-gray-700' },
                    React.createElement('h3', { className: 'text-xl font-bold mb-6 text-green-400' },
                        React.createElement('i', { className: 'fas fa-edit mr-2' }),
                        '활동 기록 생성'
                    ),
                    // 6하 원칙 입력
                    React.createElement('div', { className: 'grid grid-cols-2 gap-4 mb-6' },
                        sixWPrinciples.map(field =>
                            React.createElement('div', { key: field.key },
                                React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' },
                                    React.createElement('i', { className: `fas ${field.icon} mr-1` }),
                                    field.label
                                ),
                                React.createElement('input', {
                                    type: 'text',
                                    value: formData[field.key],
                                    onChange: e => setFormData({...formData, [field.key]: e.target.value}),
                                    placeholder: field.placeholder,
                                    className: 'w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:border-green-500 focus:outline-none'
                                })
                            )
                        )
                    ),
                    // 거래 유형 및 금액
                    React.createElement('div', { className: 'grid grid-cols-2 gap-4 mb-6' },
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '거래 유형'),
                            React.createElement('select', {
                                value: formData.type,
                                onChange: e => setFormData({...formData, type: e.target.value}),
                                className: 'w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:border-green-500 focus:outline-none'
                            },
                                React.createElement('option', { value: 'general' }, '일반 활동'),
                                React.createElement('option', { value: 'financial' }, '금전 거래'),
                                React.createElement('option', { value: 'service' }, '서비스 거래'),
                                React.createElement('option', { value: 'information' }, '정보 교환')
                            )
                        ),
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '금액 (원)'),
                            React.createElement('input', {
                                type: 'number',
                                value: formData.amount,
                                onChange: e => setFormData({...formData, amount: e.target.value}),
                                placeholder: '0',
                                className: 'w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:border-green-500 focus:outline-none'
                            })
                        )
                    ),
                    // 상대방
                    React.createElement('div', { className: 'mb-6' },
                        React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '거래 상대방'),
                        React.createElement('input', {
                            type: 'text',
                            value: formData.counterparty,
                            onChange: e => setFormData({...formData, counterparty: e.target.value}),
                            placeholder: '예: ABC 마트',
                            className: 'w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:border-green-500 focus:outline-none'
                        })
                    ),
                    // 금전 거래 시 계정 선택
                    formData.type === 'financial' && React.createElement('div', { className: 'grid grid-cols-2 gap-4 mb-6 p-4 bg-green-900/20 rounded-lg border border-green-700' },
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-green-400 mb-1' }, '차변 계정'),
                            React.createElement('select', {
                                value: formData.debit_account,
                                onChange: e => setFormData({...formData, debit_account: e.target.value}),
                                className: 'w-full bg-gray-800 border border-green-600 rounded-lg px-3 py-2 text-sm'
                            },
                                React.createElement('option', { value: '비용' }, '비용'),
                                React.createElement('option', { value: '자산' }, '자산'),
                                React.createElement('option', { value: '식료품비' }, '식료품비'),
                                React.createElement('option', { value: '교통비' }, '교통비')
                            )
                        ),
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-green-400 mb-1' }, '대변 계정'),
                            React.createElement('select', {
                                value: formData.credit_account,
                                onChange: e => setFormData({...formData, credit_account: e.target.value}),
                                className: 'w-full bg-gray-800 border border-green-600 rounded-lg px-3 py-2 text-sm'
                            },
                                React.createElement('option', { value: '현금' }, '현금'),
                                React.createElement('option', { value: '예금' }, '예금'),
                                React.createElement('option', { value: '카드' }, '카드')
                            )
                        )
                    ),
                    React.createElement('button', {
                        onClick: handleSubmit,
                        disabled: loading,
                        className: 'w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors'
                    },
                        loading ? '처리 중...' : React.createElement('span', null,
                            React.createElement('i', { className: 'fas fa-plus-circle mr-2' }),
                            '레코드 생성 및 해시 등록'
                        )
                    )
                ),
                // 결과 표시
                React.createElement('div', { className: 'bg-gray-900 rounded-xl p-6 border border-gray-700' },
                    React.createElement('h3', { className: 'text-xl font-bold mb-6 text-blue-400' },
                        React.createElement('i', { className: 'fas fa-database mr-2' }),
                        '생성된 레코드'
                    ),
                    result ? (
                        result.error ? 
                            React.createElement('div', { className: 'text-red-400 p-4 bg-red-900/20 rounded-lg' }, result.error)
                        :
                            React.createElement('div', { className: 'space-y-4' },
                                React.createElement('div', { className: 'p-4 bg-gray-800 rounded-lg' },
                                    React.createElement('div', { className: 'text-xs text-gray-500 mb-1' }, 'Record ID'),
                                    React.createElement('div', { className: 'text-green-400 font-mono' }, result.record?.record_id)
                                ),
                                React.createElement('div', { className: 'grid grid-cols-2 gap-2 text-sm' },
                                    Object.entries(result.record || {}).filter(([k]) => 
                                        !['record_id', 'record_hash', 'debit', 'credit'].includes(k)
                                    ).map(([key, value]) =>
                                        React.createElement('div', { key, className: 'p-2 bg-gray-800 rounded' },
                                            React.createElement('span', { className: 'text-gray-500' }, key + ': '),
                                            React.createElement('span', { className: 'text-white' }, String(value) || '-')
                                        )
                                    )
                                ),
                                result.record?.debit && React.createElement('div', { className: 'p-4 bg-green-900/20 rounded-lg border border-green-700' },
                                    React.createElement('div', { className: 'text-green-400 font-bold mb-2' }, '복식부기'),
                                    React.createElement('div', { className: 'grid grid-cols-2 gap-4 text-sm' },
                                        React.createElement('div', null,
                                            React.createElement('span', { className: 'text-gray-400' }, '차변: '),
                                            React.createElement('span', { className: 'text-white' }, 
                                                `${result.record.debit.account} ${result.record.debit.amount?.toLocaleString()}원`
                                            )
                                        ),
                                        React.createElement('div', null,
                                            React.createElement('span', { className: 'text-gray-400' }, '대변: '),
                                            React.createElement('span', { className: 'text-white' }, 
                                                `${result.record.credit.account} ${result.record.credit.amount?.toLocaleString()}원`
                                            )
                                        )
                                    )
                                ),
                                React.createElement('div', { className: 'p-4 bg-blue-900/20 rounded-lg border border-blue-700' },
                                    React.createElement('div', { className: 'text-blue-400 font-bold mb-2' }, 
                                        React.createElement('i', { className: 'fas fa-link mr-2' }),
                                        '오픈해시 등록용 해시'
                                    ),
                                    React.createElement('div', { className: 'hash-display text-gray-300 bg-gray-800 p-2 rounded' },
                                        result.record?.record_hash
                                    ),
                                    React.createElement('div', { className: 'text-xs text-gray-500 mt-2' },
                                        '저장: ', result.storage, ' | 클라우드: ', result.cloud_storage
                                    )
                                )
                            )
                    ) : React.createElement('div', { className: 'text-center text-gray-500 py-12' },
                        React.createElement('i', { className: 'fas fa-inbox text-4xl mb-4' }),
                        React.createElement('p', null, '레코드를 생성하면 여기에 표시됩니다')
                    )
                )
            )
        )
    );
};
