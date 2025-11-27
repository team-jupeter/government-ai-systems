const AIConsultation = ({ onShowModal }) => {
    const [query, setQuery] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const exampleQuestions = [
        'PDV 시스템이 개인정보를 어떻게 보호하나요?',
        '교차 검증으로 허위 신고를 어떻게 탐지하나요?',
        '활동 증명서의 법적 효력은 어떻게 보장되나요?',
        '블록체인과 오픈해시의 차이점은 무엇인가요?',
        '확장 재무제표란 무엇인가요?'
    ];

    const sendQuery = async (questionText) => {
        const q = questionText || query;
        if (!q.trim()) return;
        
        setMessages(prev => [...prev, { role: 'user', content: q }]);
        setQuery('');
        setLoading(true);
        
        try {
            const response = await fetch('/api-private-data-vault/ai-consultation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: q })
            });
            const data = await response.json();
            
            if (data.error) {
                setMessages(prev => [...prev, { 
                    role: 'assistant', 
                    content: '죄송합니다. 오류가 발생했습니다: ' + data.error,
                    error: true
                }]);
            } else {
                setMessages(prev => [...prev, { 
                    role: 'assistant', 
                    content: data.response 
                }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
                error: true
            }]);
        }
        setLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendQuery();
        }
    };

    const clearChat = () => {
        setMessages([]);
    };

    return React.createElement('section', { className: 'py-16 px-4 bg-gray-900' },
        React.createElement('div', { className: 'max-w-4xl mx-auto' },
            React.createElement('div', { className: 'text-center mb-8' },
                React.createElement('h2', { className: 'text-3xl font-bold mb-4' },
                    React.createElement('i', { className: 'fas fa-robot mr-3 text-teal-400' }),
                    'PDV AI 상담'
                ),
                React.createElement('p', { className: 'text-gray-400' },
                    '프라이빗 데이터 금고 시스템에 대해 무엇이든 물어보세요'
                )
            ),
            // 채팅 컨테이너
            React.createElement('div', { className: 'bg-gray-800 rounded-xl border border-gray-700 overflow-hidden' },
                // 메시지 영역
                React.createElement('div', { className: 'h-96 overflow-y-auto p-4 space-y-4' },
                    messages.length === 0 ? 
                        React.createElement('div', { className: 'text-center py-12' },
                            React.createElement('div', { className: 'w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4' },
                                React.createElement('i', { className: 'fas fa-shield-alt text-3xl text-teal-400' })
                            ),
                            React.createElement('p', { className: 'text-gray-400 mb-6' }, 'PDV 시스템에 대해 궁금한 점을 물어보세요'),
                            React.createElement('div', { className: 'flex flex-wrap justify-center gap-2' },
                                exampleQuestions.slice(0, 3).map((q, i) =>
                                    React.createElement('button', {
                                        key: i,
                                        onClick: () => sendQuery(q),
                                        className: 'px-3 py-2 bg-gray-700 hover:bg-teal-600/30 rounded-lg text-sm text-gray-300 hover:text-teal-300 transition-colors'
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
                                        msg.role === 'user' 
                                            ? 'bg-teal-600 text-white rounded-br-md' 
                                            : msg.error 
                                                ? 'bg-red-900/30 text-red-300 border border-red-700 rounded-bl-md'
                                                : 'bg-gray-700 text-gray-200 rounded-bl-md'
                                    }`
                                },
                                    msg.role === 'assistant' && React.createElement('div', { className: 'flex items-center gap-2 mb-2 text-xs text-gray-400' },
                                        React.createElement('i', { className: 'fas fa-robot' }),
                                        React.createElement('span', null, 'PDV AI')
                                    ),
                                    React.createElement('div', { 
                                        className: 'text-sm whitespace-pre-wrap',
                                        style: { lineHeight: '1.6' }
                                    }, msg.content)
                                )
                            )
                        ),
                    loading && React.createElement('div', { className: 'flex justify-start' },
                        React.createElement('div', { className: 'bg-gray-700 text-gray-200 p-4 rounded-2xl rounded-bl-md' },
                            React.createElement('div', { className: 'flex items-center gap-2' },
                                React.createElement('div', { className: 'w-2 h-2 bg-teal-400 rounded-full animate-bounce' }),
                                React.createElement('div', { className: 'w-2 h-2 bg-teal-400 rounded-full animate-bounce', style: { animationDelay: '0.1s' } }),
                                React.createElement('div', { className: 'w-2 h-2 bg-teal-400 rounded-full animate-bounce', style: { animationDelay: '0.2s' } })
                            )
                        )
                    )
                ),
                // 입력 영역
                React.createElement('div', { className: 'border-t border-gray-700 p-4' },
                    messages.length > 0 && React.createElement('div', { className: 'flex justify-end mb-2' },
                        React.createElement('button', {
                            onClick: clearChat,
                            className: 'text-xs text-gray-500 hover:text-gray-300'
                        },
                            React.createElement('i', { className: 'fas fa-trash-alt mr-1' }),
                            '대화 초기화'
                        )
                    ),
                    React.createElement('div', { className: 'flex gap-3' },
                        React.createElement('input', {
                            type: 'text',
                            value: query,
                            onChange: e => setQuery(e.target.value),
                            onKeyPress: handleKeyPress,
                            placeholder: 'PDV 시스템에 대해 질문하세요...',
                            disabled: loading,
                            className: 'flex-1 bg-gray-900 border border-gray-600 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none disabled:opacity-50'
                        }),
                        React.createElement('button', {
                            onClick: () => sendQuery(),
                            disabled: loading || !query.trim(),
                            className: 'px-6 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl font-medium transition-colors'
                        },
                            React.createElement('i', { className: 'fas fa-paper-plane' })
                        )
                    )
                )
            ),
            // 추가 예제 질문
            React.createElement('div', { className: 'mt-6' },
                React.createElement('div', { className: 'text-sm text-gray-500 mb-3 text-center' }, '예시 질문'),
                React.createElement('div', { className: 'flex flex-wrap justify-center gap-2' },
                    exampleQuestions.map((q, i) =>
                        React.createElement('button', {
                            key: i,
                            onClick: () => sendQuery(q),
                            disabled: loading,
                            className: 'px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full text-xs text-gray-400 hover:text-white transition-colors disabled:opacity-50'
                        }, q)
                    )
                )
            )
        )
    );
};
