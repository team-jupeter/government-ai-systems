const FloatingAssistant = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isMinimized, setIsMinimized] = React.useState(false);
    const [messages, setMessages] = React.useState([
        { role: 'assistant', content: '안녕하세요! 무엇을 도와드릴까요? 🚗' }
    ]);
    const [input, setInput] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/traffic/ai-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    context: 'social_autonomous_driving'
                })
            });

            if (!response.ok) throw new Error('API 오류');
            
            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        } catch (error) {
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: '죄송합니다. 오류가 발생했습니다. AI 교통 상담 메뉴에서 자세한 상담이 가능합니다.' 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg flex items-center justify-center hover:from-purple-500 hover:to-pink-500 transition z-50"
            >
                <i className="fas fa-robot text-xl"></i>
            </button>
        );
    }

    if (isMinimized) {
        return (
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsMinimized(false)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:from-purple-500 hover:to-pink-500 transition"
                >
                    <i className="fas fa-robot"></i>
                    <span className="text-sm">AI 상담</span>
                    <i className="fas fa-chevron-up"></i>
                </button>
            </div>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 w-80 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 z-50 flex flex-col max-h-[500px]">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <i className="fas fa-robot"></i>
                    <span className="font-bold">AI 상담</span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setIsMinimized(true)} className="hover:bg-white/20 w-8 h-8 rounded-full">
                        <i className="fas fa-minus"></i>
                    </button>
                    <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 w-8 h-8 rounded-full">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>

            {/* 메시지 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-xl p-3 text-sm ${
                            msg.role === 'user' ? 'bg-purple-600' : 'bg-gray-700'
                        }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-700 rounded-xl p-3">
                            <i className="fas fa-spinner fa-spin text-purple-400"></i>
                        </div>
                    </div>
                )}
            </div>

            {/* 입력 */}
            <div className="p-3 border-t border-gray-700">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="질문 입력..."
                        className="flex-1 bg-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none"
                        disabled={isLoading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading || !input.trim()}
                        className="bg-purple-600 px-3 py-2 rounded-lg hover:bg-purple-500 transition disabled:opacity-50"
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
