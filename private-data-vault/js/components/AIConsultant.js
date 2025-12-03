const { useState, useRef, useEffect } = React;

function AIConsultant() {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! 오픈해시 기반 프라이빗 데이터 금고(PDV) 시스템 AI 상담입니다. 궁금하신 점을 질문해주세요.'
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const quickQuestions = [
        'PDV의 핵심 개념은?',
        '확장 재무제표란?',
        '교차 검증 원리는?',
        '블록체인과 차이점은?',
        'AWS 실증 결과는?'
    ];

    const sendMessage = async (messageText) => {
        const userMessage = messageText || input;
        if (!userMessage.trim()) return;

        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('/api/private-data-vault/consultation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: userMessage })
            });

            const data = await response.json();
            
            if (data.response) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: data.response
                }]);
            } else {
                throw new Error('응답 없음');
            }
        } catch (error) {
            console.error('AI 상담 오류:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 border-l-4 border-gov-blue p-6 mb-6">
                <h3 className="text-2xl font-bold text-gov-blue mb-2">
                    <i className="fas fa-robot mr-2"></i>
                    AI 상담
                </h3>
                <p className="text-gov-text">
                    PDV 시스템에 대해 궁금한 점을 질문해주세요. Claude AI가 답변해드립니다.
                </p>
            </div>

            {/* 빠른 질문 */}
            <div className="mb-6">
                <div className="text-sm font-medium text-gov-text mb-3">
                    <i className="fas fa-lightbulb mr-2"></i>
                    빠른 질문
                </div>
                <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((q, idx) => (
                        <button
                            key={idx}
                            onClick={() => sendMessage(q)}
                            disabled={loading}
                            className="px-4 py-2 bg-white border-2 border-gov-border rounded-full text-sm hover:border-gov-blue hover:text-gov-blue transition-colors disabled:opacity-50"
                        >
                            {q}
                        </button>
                    ))}
                </div>
            </div>

            {/* 대화 영역 */}
            <div className="bg-white border-2 border-gov-border rounded-lg shadow-lg mb-4">
                <div className="h-96 overflow-y-auto p-6 space-y-4">
                    {messages.map((message, idx) => (
                        <div
                            key={idx}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-3xl rounded-lg p-4 ${
                                    message.role === 'user'
                                        ? 'bg-gov-blue text-white'
                                        : 'bg-gray-100 text-gov-text'
                                }`}
                            >
                                {message.role === 'assistant' && (
                                    <div className="flex items-center mb-2">
                                        <i className="fas fa-robot text-gov-blue mr-2"></i>
                                        <span className="font-semibold text-gov-blue">AI 상담</span>
                                    </div>
                                )}
                                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 rounded-lg p-4">
                                <div className="flex items-center space-x-2">
                                    <i className="fas fa-spinner fa-spin text-gov-blue"></i>
                                    <span className="text-sm text-gray-600">답변 생성 중...</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* 입력 영역 */}
            <div className="bg-white border-2 border-gov-border rounded-lg shadow-lg p-4">
                <div className="flex space-x-3">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="PDV 시스템에 대해 질문해주세요..."
                        disabled={loading}
                        className="flex-1 px-4 py-2 border-2 border-gov-border rounded-lg resize-none focus:border-gov-blue disabled:opacity-50"
                        rows="2"
                    />
                    <button
                        onClick={() => sendMessage()}
                        disabled={loading || !input.trim()}
                        className="px-6 py-2 bg-gov-blue text-white rounded-lg font-bold hover:bg-gov-blue-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                    <i className="fas fa-info-circle mr-1"></i>
                    Enter: 전송 | Shift+Enter: 줄바꿈
                </div>
            </div>
        </div>
    );
}
