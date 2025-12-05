const { useState, useRef, useEffect } = React;

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요. 국가정보원 AI 상담 시스템입니다. 간첩 신고, 테러 정보 제보, 사이버 위협 신고 등을 도와드립니다. 무엇을 도와드릴까요?'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    const quickQuestions = [
        { q: '간첩 신고는 어떻게 하나요?', icon: '🕵️' },
        { q: '사이버 공격 신고 방법', icon: '🛡️' },
        { q: '테러 정보 제보하기', icon: '⚠️' },
        { q: '산업기밀 유출 의심', icon: '🔍' }
    ];
    
    const handleSend = async () => {
        if (!input.trim()) return;
        
        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        
        try {
            const response = await fetch('/nis/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });
            
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            const assistantMessage = { 
                role: 'assistant', 
                content: data.response 
            };
            
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = { 
                role: 'assistant', 
                content: '죄송합니다. 일시적인 오류가 발생했습니다. 긴급한 경우 국가정보원 신고센터 111로 전화주시기 바랍니다.' 
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleQuickQuestion = (question) => {
        setInput(question);
    };
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    
    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">AI 상담 시스템</h2>
                <p className="text-red-100 text-sm">
                    간첩 신고, 테러 정보 제보, 사이버 위협 신고 등을 24시간 접수합니다
                </p>
            </div>
            
            {/* 신고 안내 */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">📞</span>
                    <div>
                        <h4 className="font-semibold text-yellow-900 mb-1">긴급 신고 센터</h4>
                        <p className="text-sm text-yellow-800 mb-2">
                            긴급하거나 중요한 정보는 국가정보원 신고센터로 직접 연락해주시기 바랍니다.
                        </p>
                        <div className="text-sm font-semibold text-yellow-900">
                            ☎️ 국가정보원 신고센터: 111 (24시간 운영)
                        </div>
                    </div>
                </div>
            </div>
            
            {/* 채팅 영역 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* 빠른 질문 */}
                {messages.length === 1 && (
                    <div className="p-4 bg-gray-50 border-b">
                        <p className="text-sm font-medium text-gray-700 mb-3">자주 묻는 질문</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {quickQuestions.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuickQuestion(item.q)}
                                    className="flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-left"
                                >
                                    <span className="text-xl mr-2">{item.icon}</span>
                                    <span className="text-sm text-gray-700">{item.q}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* 메시지 목록 */}
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-3/4 rounded-lg p-4 ${
                                    message.role === 'user'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-900'
                                }`}
                            >
                                {message.role === 'assistant' && (
                                    <div className="flex items-center mb-2">
                                        <span className="text-lg mr-2">🤖</span>
                                        <span className="font-semibold text-sm">AI 상담원</span>
                                    </div>
                                )}
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>
                        </div>
                    ))}
                    
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 rounded-lg p-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                </div>
                
                {/* 입력 영역 */}
                <div className="border-t p-4">
                    <div className="flex space-x-2">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="질문이나 신고 내용을 입력하세요..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            rows="2"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            전송
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Enter로 전송 | Shift+Enter로 줄바꿈
                    </p>
                </div>
            </div>
            
            {/* 신고 유형 안내 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
                    <div className="flex items-center mb-2">
                        <span className="text-2xl mr-2">🕵️</span>
                        <h4 className="font-semibold text-gray-900">간첩 신고</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                        북한 간첩 또는 간첩 의심 행위 신고
                    </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500">
                    <div className="flex items-center mb-2">
                        <span className="text-2xl mr-2">⚠️</span>
                        <h4 className="font-semibold text-gray-900">테러 정보</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                        테러 위협 정보 및 의심 활동 제보
                    </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
                    <div className="flex items-center mb-2">
                        <span className="text-2xl mr-2">🛡️</span>
                        <h4 className="font-semibold text-gray-900">사이버 위협</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                        사이버 공격, 해킹 시도 신고
                    </p>
                </div>
            </div>
            
            {/* 보안 안내 */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">개인정보 보호</h3>
                <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-start">
                        <span className="text-green-600 font-bold mr-2">✓</span>
                        <p>모든 대화 내용은 암호화되어 전송됩니다</p>
                    </div>
                    <div className="flex items-start">
                        <span className="text-green-600 font-bold mr-2">✓</span>
                        <p>제보자의 신원은 철저히 보호됩니다</p>
                    </div>
                    <div className="flex items-start">
                        <span className="text-green-600 font-bold mr-2">✓</span>
                        <p>익명 신고도 가능합니다</p>
                    </div>
                    <div className="flex items-start">
                        <span className="text-green-600 font-bold mr-2">✓</span>
                        <p>허위 신고 시 법적 책임이 있을 수 있습니다</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIChat = AIChat;
