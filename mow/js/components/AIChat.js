const { useState, useRef, useEffect } = React;
const AIChat = () => {
    const [messages, setMessages] = useState([{ role: 'assistant', content: '안녕하세요! 성평등가족부 AI 상담 서비스입니다. 예산·세제·경제정책에 대해 질문해 주세요.' }]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    
    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); };
    useEffect(() => { scrollToBottom(); }, [messages]);
    
    const quickQuestions = ['건강보험', '기초수급', '장애인복지', '노인장기요양'];
    const handleQuickQuestion = (question) => { setInput(question); };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);
        
        setTimeout(() => {
            let response = '성평등가족부 AI 상담 서비스입니다.\n\n문의 주제:\n• 건강보험 (가입·보험료·급여)\n• 기초생활보장 (수급자 선정·급여)\n• 의료급여 (1종·2종)\n• 노인장기요양 (등급판정·급여)\n• 장애인복지 (복지카드·활동지원)\n• 아동수당·양육수당\n\n주요 연락처:\n• 성평등가족부: 129\n• 건강보험공단: 1577-1000\n• 국민연금공단: 1355\n\n누리집:\n• 성평등가족부: www.mohw.go.kr\n• 복지로: www.bokjiro.go.kr\n\n구체적인 질문을 해주시면 더 자세한 안내를 드리겠습니다.';
            
            if (userMessage.includes('건강보험') || userMessage.includes('건보')) {
                response = '건강보험은 전 국민 의료보장 제도입니다.\n\n건강보험:\n가입:\n• 직장가입자: 근로자\n• 지역가입자: 자영업자\n• 피부양자: 소득 없는 가족\n\n보험료:\n직장: 월급의 7.09%\n지역: 소득·재산 기준\n\n급여:\n요양급여: 진료비 80~95%\n본인부담: 5~20%\n\n문의: 건강보험공단 1577-1000';
            }
            
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsLoading(false);
        }, 1000);
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">AI 상담 서비스</h2>
                <p className="text-blue-100 text-sm">DeepSeek R1 모델 기반으로 보건·복지 질문에 답변합니다</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-4 ${msg.role === 'user' ? 'bg-purple-500 text-white' : 'bg-white border border-gray-200 text-gray-900'}`}>
                                <div className="text-sm whitespace-pre-line">{msg.content}</div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                
                <div className="p-4 bg-white border-t border-gray-200">
                    <div className="mb-3">
                        <div className="text-xs font-medium text-gray-600 mb-2">자주 묻는 질문:</div>
                        <div className="flex flex-wrap gap-2">
                            {quickQuestions.map((q, index) => (
                                <button key={index} onClick={() => handleQuickQuestion(q)} className="px-3 py-1 bg-blue-50 text-purple-500 rounded-full text-xs hover:bg-blue-100 transition-colors">{q}</button>
                            ))}
                        </div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="궁금하신 점을 질문해주세요..." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" disabled={isLoading} />
                        <button type="submit" disabled={isLoading || !input.trim()} className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">전송</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
window.AIChat = AIChat;
