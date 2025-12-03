const AIConsultant = () => {
    const [messages, setMessages] = React.useState([
        { role: 'assistant', content: '안녕하세요! 사회적 자율주행 교통 관제 시스템 AI 상담사입니다. 🚗\n\n다음과 같은 질문에 답변해 드릴 수 있습니다:\n\n• 사회적 자율주행 시스템 원리\n• 차량 배정 및 경로 문의\n• 요금 및 결제 안내\n• 안전 및 보안 관련 문의\n• OpenHash 기술 설명\n\n무엇을 도와드릴까요?' }
    ]);
    const [input, setInput] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const messagesEndRef = React.useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.\n\n기본 안내:\n• 사회적 자율주행은 중앙 서버가 모든 차량을 제어합니다\n• 개인 차량 소유 없이 필요할 때 호출합니다\n• 모든 데이터는 OpenHash로 보호됩니다' 
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

    const quickQuestions = [
        '사회적 자율주행이 뭔가요?',
        '기존 자율주행과 차이점은?',
        'OpenHash가 뭔가요?',
        '요금은 어떻게 되나요?',
        '안전은 보장되나요?'
    ];

    return (
        <div className="space-y-6">
            {/* 상담 소개 */}
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-xl p-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <i className="fas fa-robot text-2xl"></i>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">AI 교통 상담</h2>
                        <p className="text-gray-400">Claude AI 기반 실시간 상담 서비스</p>
                    </div>
                    <div className="ml-auto">
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full pulse-dot"></span>
                            온라인
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
                {/* 채팅 영역 */}
                <div className="md:col-span-3 bg-gray-800 rounded-xl flex flex-col h-[600px]">
                    {/* 메시지 목록 */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl p-4 ${
                                    msg.role === 'user'
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-700 text-gray-100'
                                }`}>
                                    {msg.role === 'assistant' && (
                                        <div className="flex items-center gap-2 mb-2 text-purple-400 text-sm">
                                            <i className="fas fa-robot"></i>
                                            <span>AI 상담사</span>
                                        </div>
                                    )}
                                    <div className="whitespace-pre-wrap">{msg.content}</div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-700 rounded-2xl p-4">
                                    <div className="flex items-center gap-2 text-purple-400">
                                        <i className="fas fa-spinner fa-spin"></i>
                                        <span>답변 생성 중...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* 입력 영역 */}
                    <div className="border-t border-gray-700 p-4">
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="질문을 입력하세요..."
                                className="flex-1 bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
                                disabled={isLoading}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={isLoading || !input.trim()}
                                className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition disabled:opacity-50"
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 빠른 질문 */}
                <div className="space-y-4">
                    <div className="bg-gray-800 rounded-xl p-4">
                        <h3 className="font-bold mb-3 text-sm text-gray-400">자주 묻는 질문</h3>
                        <div className="space-y-2">
                            {quickQuestions.map((q, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setInput(q)}
                                    className="w-full text-left bg-gray-700/50 hover:bg-gray-700 px-3 py-2 rounded-lg text-sm transition"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-xl p-4">
                        <h3 className="font-bold mb-3 text-sm text-gray-400">상담 분야</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-400">
                                <i className="fas fa-car text-indigo-400 w-5"></i>
                                <span>차량 배정/호출</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <i className="fas fa-route text-green-400 w-5"></i>
                                <span>경로/요금 안내</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <i className="fas fa-shield-alt text-red-400 w-5"></i>
                                <span>안전/보안</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <i className="fas fa-link text-cyan-400 w-5"></i>
                                <span>OpenHash 기술</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <i className="fas fa-question-circle text-yellow-400 w-5"></i>
                                <span>기타 문의</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-indigo-400 text-sm mb-2">
                            <i className="fas fa-info-circle"></i>
                            <span>안내</span>
                        </div>
                        <p className="text-xs text-gray-400">
                            이 AI 상담은 Claude API를 사용합니다. 개인정보는 상담 목적으로만 사용되며 OpenHash로 보호됩니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
