const AIVerification = ({ onShowModal }) => {
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const verifyTransaction = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api-currency/ai/verify-transaction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    transaction_id: 'TX' + Date.now(),
                    amount: Math.floor(Math.random() * 10000000),
                    type: 'transfer'
                })
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            setResult({ error: error.message });
        }
        setLoading(false);
    };

    const models = [
        { name: 'BERT', desc: '자연어 임베딩', color: 'blue', weight: '40%' },
        { name: 'CNN', desc: '패턴 추출', color: 'purple', weight: '35%' },
        { name: 'LSTM', desc: '시계열 분석', color: 'green', weight: '25%' }
    ];

    return React.createElement('section', { className: 'py-16 px-4 bg-gray-800' },
        React.createElement('div', { className: 'max-w-6xl mx-auto' },
            React.createElement('div', { className: 'text-center mb-12' },
                React.createElement('h2', { className: 'text-3xl font-bold mb-4' },
                    React.createElement('i', { className: 'fas fa-brain mr-3 text-purple-400' }),
                    'AI 앙상블 거래 검증'
                ),
                React.createElement('p', { className: 'text-gray-400 max-w-2xl mx-auto' },
                    'BERT + CNN + LSTM 앙상블 | 99.4% 정확도 | 0.015ms 처리 | 95% 적대적 공격 방어'
                )
            ),
            React.createElement('div', { className: 'grid lg:grid-cols-3 gap-6 mb-8' },
                models.map((model, i) =>
                    React.createElement('div', { 
                        key: i, 
                        className: `bg-gray-900 rounded-xl p-6 border border-${model.color}-500/30`
                    },
                        React.createElement('div', { className: `text-${model.color}-400 text-2xl font-bold mb-2` }, model.name),
                        React.createElement('p', { className: 'text-gray-400 text-sm mb-3' }, model.desc),
                        React.createElement('div', { className: 'flex justify-between items-center' },
                            React.createElement('span', { className: 'text-gray-500 text-sm' }, '가중치'),
                            React.createElement('span', { className: `text-${model.color}-400 font-bold` }, model.weight)
                        ),
                        result?.ai_scores && React.createElement('div', { className: 'mt-3 pt-3 border-t border-gray-700' },
                            React.createElement('div', { className: 'text-sm text-gray-500' }, '점수'),
                            React.createElement('div', { className: 'text-xl font-bold text-white' },
                                (result.ai_scores[model.name.toLowerCase() === 'bert' ? 'bert_embedding' : 
                                    model.name.toLowerCase() === 'cnn' ? 'cnn_pattern' : 'lstm_temporal'] * 100).toFixed(2) + '%'
                            )
                        )
                    )
                )
            ),
            React.createElement('div', { className: 'text-center mb-8' },
                React.createElement('button', {
                    onClick: verifyTransaction,
                    disabled: loading,
                    className: 'px-8 py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded-xl font-medium text-lg'
                }, loading ? '검증 중...' : React.createElement('span', null,
                    React.createElement('i', { className: 'fas fa-shield-alt mr-2' }),
                    '거래 검증 실행'
                ))
            ),
            result && !result.error && React.createElement('div', { className: 'bg-gray-900 rounded-xl p-6 border border-gray-700 max-w-2xl mx-auto' },
                React.createElement('div', { 
                    className: `text-center p-6 rounded-lg mb-4 ${result.verification_result === '승인' ? 'bg-green-900/30 border border-green-500' : 'bg-red-900/30 border border-red-500'}`
                },
                    React.createElement('div', { className: 'text-4xl mb-2' }, result.verification_result === '승인' ? '✅' : '❌'),
                    React.createElement('div', { className: `text-2xl font-bold ${result.verification_result === '승인' ? 'text-green-400' : 'text-red-400'}` },
                        result.verification_result
                    ),
                    React.createElement('div', { className: 'text-gray-400 mt-2' },
                        '처리 시간: ', result.processing_time_ms, 'ms'
                    )
                ),
                React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
                    React.createElement('div', { className: 'bg-gray-800 p-3 rounded text-center' },
                        React.createElement('div', { className: 'text-gray-500 text-sm' }, '의심도 점수'),
                        React.createElement('div', { className: 'text-xl font-bold' }, result.suspicion_score, '%')
                    ),
                    React.createElement('div', { className: 'bg-gray-800 p-3 rounded text-center' },
                        React.createElement('div', { className: 'text-gray-500 text-sm' }, '앙상블 점수'),
                        React.createElement('div', { className: 'text-xl font-bold text-green-400' }, 
                            (result.ai_scores?.ensemble_final * 100).toFixed(2), '%'
                        )
                    )
                )
            )
        )
    );
};
