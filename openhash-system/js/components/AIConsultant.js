const AIConsultant = () => {
    const [messages, setMessages] = React.useState([
        { role: 'assistant', content: '안녕하세요. 오픈해시 기술 상담 AI입니다. 궁금하신 점을 질문해주세요.' }
    ]);
    const [input, setInput] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const messagesEndRef = React.useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);

        try {
            const response = await fetch('/api/openhash-system/consultation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage })
            });

            if (!response.ok) throw new Error('API 오류');

            const data = await response.json();
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: data.response || '응답을 받지 못했습니다.' 
            }]);
        } catch (error) {
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
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gov-text mb-4">AI 기술 상담</h3>
                    <p className="text-gov-text-secondary">오픈해시 기술에 대해 궁금한 점을 질문하세요</p>
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border-2 border-gov-border overflow-hidden">
                    {/* 메시지 영역 */}
                    <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gov-gray">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] rounded-lg p-4 ${
                                    msg.role === 'user'
                                        ? 'bg-gov-blue text-white'
                                        : 'bg-white border border-gov-border text-gov-text'
                                }`}>
                                    <div className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gov-border rounded-lg p-4">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gov-blue rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gov-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-gov-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* 입력 영역 */}
                    <div className="p-4 bg-white border-t-2 border-gov-border">
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="질문을 입력하세요..."
                                disabled={loading}
                                className="flex-1 px-4 py-3 border border-gov-border rounded focus:outline-none focus:ring-2 focus:ring-gov-blue disabled:opacity-50"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={loading || !input.trim()}
                                className="px-6 py-3 bg-gov-blue text-white rounded font-bold hover:bg-gov-blue-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                전송
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
