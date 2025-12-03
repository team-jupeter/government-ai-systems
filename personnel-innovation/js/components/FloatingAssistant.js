const FloatingAssistant = ({ onClose }) => {
    const [messages, setMessages] = React.useState([
        { role: 'assistant', content: '안녕하세요! 무엇을 도와드릴까요?' }
    ]);
    const [input, setInput] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [isMinimized, setIsMinimized] = React.useState(false);
    const messagesEndRef = React.useRef(null);

    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/personnel-innovation/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage })
            });
            const result = await response.json();
            
            if (result.success) {
                setMessages(prev => [...prev, { role: 'assistant', content: result.data.response }]);
            } else {
                setMessages(prev => [...prev, { 
                    role: 'assistant', 
                    content: '죄송합니다. 잠시 후 다시 시도해 주세요.' 
                }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: '연결 오류가 발생했습니다.' 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    if (isMinimized) {
        return (
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsMinimized(false)}
                    className="w-14 h-14 bg-purple-600 hover:bg-purple-700 rounded-full shadow-lg flex items-center justify-center transition-all"
                >
                    <i className="fas fa-robot text-xl text-white"></i>
                </button>
            </div>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 w-80 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <i className="fas fa-robot text-white"></i>
                    <span className="text-white font-medium text-sm">AI 상담</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsMinimized(true)}
                        className="text-white/70 hover:text-white transition-all"
                    >
                        <i className="fas fa-minus"></i>
                    </button>
                    <button
                        onClick={onClose}
                        className="text-white/70 hover:text-white transition-all"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>

            {/* 메시지 영역 */}
            <div className="h-64 overflow-y-auto p-3 space-y-3">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-4/5 px-3 py-2 rounded-lg text-sm ${
                            msg.role === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-700 text-slate-200'
                        }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-slate-700 px-3 py-2 rounded-lg">
                            <i className="fas fa-spinner fa-spin text-purple-400"></i>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* 입력 영역 */}
            <div className="p-3 border-t border-slate-700">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="질문 입력..."
                        className="flex-1 bg-slate-700 text-white px-3 py-2 rounded-lg text-sm border border-slate-600 focus:border-purple-500 focus:outline-none"
                        disabled={isLoading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading || !input.trim()}
                        className={`px-3 py-2 rounded-lg ${
                            isLoading || !input.trim()
                                ? 'bg-slate-600 text-slate-400'
                                : 'bg-purple-600 hover:bg-purple-700 text-white'
                        }`}
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
