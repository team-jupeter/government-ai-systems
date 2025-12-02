const ChatSection = () => {
    const [messages, setMessages] = React.useState([
        { role: 'assistant', content: '안녕하세요! 오픈해시 기술에 대해 궁금하신 점을 물어보세요. 🤖' }
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

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: data.response 
            }]);
        } catch (error) {
            console.error('API 오류:', error);
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: '죄송합니다. 응답 중 오류가 발생했습니다. 다시 시도해주세요.' 
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
        <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    🤖 AI 상담
                </h2>
                <p className="text-gray-400 text-lg">오픈해시 기술 전문가 AI와 대화하세요</p>
            </div>

            <div className="max-w-4xl mx-auto bg-black bg-opacity-40 rounded-3xl border border-cyan-500 border-opacity-30 p-6 backdrop-blur-lg">
                <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] p-4 rounded-2xl ${
                                    msg.role === 'user'
                                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                                        : 'bg-white bg-opacity-10 text-gray-100'
                                }`}
                            >
                                <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-white bg-opacity-10 text-gray-100 p-4 rounded-2xl">
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="오픈해시에 대해 질문하세요..."
                        disabled={loading}
                        className="flex-1 bg-white bg-opacity-10 border border-cyan-500 border-opacity-30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 disabled:opacity-50"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={loading || !input.trim()}
                        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        전송
                    </button>
                </div>
            </div>
        </section>
    );
};
