const { useState } = React;

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! 방송미디어통신위원회 AI 상담 시스템입니다. 방송·미디어·통신 관련 궁금하신 점을 질문해주세요.'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const quickQuestions = [
        '방송 심의 기준은 무엇인가요?',
        '통신 서비스 민원은 어떻게 제기하나요?',
        'OTT 사업자 등록은 어떻게 하나요?',
        '불법 방송 신고는 어디에 하나요?'
    ];
    
    const handleSend = async () => {
        if (!input.trim()) return;
        
        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        
        // 시뮬레이션: 실제로는 /api/kcc/chat 엔드포인트 호출
        setTimeout(() => {
            const aiResponse = {
                role: 'assistant',
                content: `"${input}"에 대한 답변입니다. 실제 운영 시에는 Claude API를 통해 정확한 방송·통신 상담을 제공합니다. 국가데이터처에서 관련 법령과 사례를 인출하여 답변합니다.`
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
        }, 1500);
    };
    
    const handleQuickQuestion = (question) => {
        setInput(question);
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">AI 방송통신 상담</h2>
                <p className="text-lg text-indigo-100">
                    Claude API 기반 실시간 방송·통신 상담 서비스입니다.
                    국가데이터처의 법령 및 판례 데이터를 활용하여 정확한 답변을 제공합니다.
                </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">자주 묻는 질문</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {quickQuestions.map((q, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleQuickQuestion(q)}
                            className="text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-sm text-gray-700 transition-colors"
                        >
                            💬 {q}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-lg px-4 py-3 ${
                                    msg.role === 'user'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white border border-gray-200 text-gray-900'
                                }`}
                            >
                                {msg.role === 'assistant' && (
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className="text-xl">🤖</span>
                                        <span className="text-xs font-semibold text-gray-500">AI 상담원</span>
                                    </div>
                                )}
                                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="border-t border-gray-200 p-4 bg-white">
                    <div className="flex space-x-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="방송·통신 관련 질문을 입력하세요..."
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
                        >
                            전송
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        ⚠️ 본 AI 상담은 참고용이며, 정확한 방송·통신 상담은 전문가와 상담하시기 바랍니다.
                    </p>
                </div>
            </div>
        </div>
    );
};

window.AIChat = AIChat;
