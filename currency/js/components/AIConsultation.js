const AIConsultation = ({ onShowModal }) => {
    const [query, setQuery] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const exampleQuestions = [
        'FPGA 영지식 증명의 장점은?',
        'AI 앙상블 검증 원리를 설명해주세요',
        '실시간 재무제표 자동 생성이란?',
        '자동 세무처리 기능은 어떻게 작동하나요?',
        '크로스체인 Lock-and-Mint 방식이란?'
    ];

    const sendQuery = async (q) => {
        const question = q || query;
        if (!question.trim()) return;

        setMessages(prev => [...prev, { role: 'user', content: question }]);
        setQuery('');
        setLoading(true);

        try {
            const response = await fetch('/api-currency/ai-consultation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: question })
            });
            const data = await response.json();
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: data.response || data.error,
                error: !!data.error
            }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: '오류가 발생했습니다.', error: true }]);
        }
        setLoading(false);
    };

    return React.createElement('section', { className: 'py-16 px-4 bg-gray-900' },
        React.createElement('div', { className: 'max-w-4xl mx-auto' },
            React.createElement('div', { className: 'text-center mb-8' },
                React.createElement('h2', { className: 'text-3xl font-bold mb-4' },
                    React.createElement('i', { className: 'fas fa-robot mr-3 text-yellow-400' }),
                    'AI 상담'
                ),
                React.createElement('p', { className: 'text-gray-400' },
                    'FPGA 및 AI 기반 통합 디지털 화폐 시스템에 대해 질문하세요'
                )
            ),
            React.createElement('div', { className: 'bg-gray-800 rounded-xl border border-gray-700 overflow-hidden' },
                React.createElement('div', { className: 'h-96 overflow-y-auto p-4 space-y-4' },
                    messages.length === 0 ?
                        React.createElement('div', { className: 'text-center py-12' },
                            React.createElement('i', { className: 'fas fa-coins text-5xl text-yellow-400 mb-4' }),
                            React.createElement('p', { className: 'text-gray-400 mb-6' }, '디지털 화폐 시스템에 대해 궁금한 점을 물어보세요'),
                            React.createElement('div', { className: 'flex flex-wrap justify-center gap-2' },
                                exampleQuestions.slice(0, 3).map((q, i) =>
                                    React.createElement('button', {
                                        key: i,
                                        onClick: () => sendQuery(q),
                                        className: 'px-3 py-2 bg-gray-700 hover:bg-yellow-600/30 rounded-lg text-sm'
                                    }, q)
                                )
                            )
                        )
                    :
                        messages.map((msg, i) =>
                            React.createElement('div', {
                                key: i,
                                className: `flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`
                            },
                                React.createElement('div', {
                                    className: `max-w-[80%] p-4 rounded-2xl ${
                                        msg.role === 'user' ? 'bg-yellow-600 rounded-br-md' :
                                        msg.error ? 'bg-red-900/30 border border-red-700 rounded-bl-md' :
                                        'bg-gray-700 rounded-bl-md'
                                    }`
                                },
                                    React.createElement('div', { className: 'text-sm whitespace-pre-wrap' }, msg.content)
                                )
                            )
                        ),
                    loading && React.createElement('div', { className: 'flex justify-start' },
                        React.createElement('div', { className: 'bg-gray-700 p-4 rounded-2xl rounded-bl-md' },
                            React.createElement('div', { className: 'flex gap-1' },
                                [0,1,2].map(i => React.createElement('div', {
                                    key: i,
                                    className: 'w-2 h-2 bg-yellow-400 rounded-full animate-bounce',
                                    style: { animationDelay: `${i * 0.1}s` }
                                }))
                            )
                        )
                    )
                ),
                React.createElement('div', { className: 'border-t border-gray-700 p-4' },
                    React.createElement('div', { className: 'flex gap-3' },
                        React.createElement('input', {
                            type: 'text',
                            value: query,
                            onChange: e => setQuery(e.target.value),
                            onKeyPress: e => e.key === 'Enter' && sendQuery(),
                            placeholder: '질문을 입력하세요...',
                            disabled: loading,
                            className: 'flex-1 bg-gray-900 border border-gray-600 rounded-xl px-4 py-3'
                        }),
                        React.createElement('button', {
                            onClick: () => sendQuery(),
                            disabled: loading || !query.trim(),
                            className: 'px-6 py-3 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 rounded-xl'
                        },
                            React.createElement('i', { className: 'fas fa-paper-plane' })
                        )
                    )
                )
            ),
            React.createElement('div', { className: 'mt-4 flex flex-wrap justify-center gap-2' },
                exampleQuestions.map((q, i) =>
                    React.createElement('button', {
                        key: i,
                        onClick: () => sendQuery(q),
                        disabled: loading,
                        className: 'px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-full text-xs'
                    }, q)
                )
            )
        )
    );
};
