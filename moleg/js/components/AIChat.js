const { useState, useRef, useEffect } = React;

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! 법제처 AI 상담 서비스입니다. 법령 심사, 해석, 국가법령정보센터 이용 등에 대해 궁금하신 점을 질문해 주세요.'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    const quickQuestions = [
        '법령 심사 절차는?',
        '법령 해석 신청 방법은?',
        '국가법령정보센터 사용법은?',
        '알기 쉬운 법령이란?'
    ];
    
    const handleQuickQuestion = (question) => {
        setInput(question);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        
        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);
        
        setTimeout(() => {
            let response = '';
            
            if (userMessage.includes('심사') || userMessage.includes('법령안')) {
                response = '법령 심사는 법제처가 정부입법의 적법성과 타당성을 검토하는 과정입니다.\n\n심사 절차:\n1. 부처에서 법령안 제출\n2. AI 사전분석 (체계·자구·법리)\n3. 법제관 본심사\n4. 법제처장 결재\n5. 국무회의 상정\n\n심사 기준:\n• 상위법 적합성\n• 다른 법령과의 체계정합성\n• 규제영향분석\n• 알기 쉬운 법령 원칙\n\nAI가 법령안을 사전 분석하여 심사 시간을 85% 단축합니다.';
            } else if (userMessage.includes('해석') || userMessage.includes('법령해석')) {
                response = '법령 해석은 법령의 의미와 적용범위를 명확히 하는 업무입니다.\n\n신청 방법:\n• 온라인: 법제처 홈페이지\n• 공문: 법제처 법령해석국\n• 신청자격: 중앙행정기관, 지자체, 공공기관\n\n해석 절차:\n1. 해석 신청 접수\n2. AI 유사 사례 분석\n3. 법령해석심의위원회 심의\n4. 해석례 회신\n\n처리 기간: 30일 이내\n\nAI가 620만 건의 판례·해석례를 분석하여 일관된 해석을 지원합니다.';
            } else if (userMessage.includes('국가법령정보') || userMessage.includes('법령정보센터') || userMessage.includes('law.go.kr')) {
                response = '국가법령정보센터(www.law.go.kr)는 대한민국의 모든 법령정보를 제공하는 공식 사이트입니다.\n\n주요 기능:\n• 법령 검색 (620만 건)\n• 판례·해석례 검색\n• 자치법규 (조례·규칙)\n• 행정규칙\n• 법령 개정 연혁\n• 나만의 법령집\n\n검색 방법:\n• 법령명으로 검색\n• 조문 내용으로 검색\n• 생활분야별 검색\n\nAI 검색 기능으로 원하는 법령을 빠르게 찾을 수 있습니다.';
            } else if (userMessage.includes('알기 쉬운') || userMessage.includes('쉬운 법령')) {
                response = '알기 쉬운 법령 만들기는 국민이 이해하기 쉽게 법령을 작성하는 운동입니다.\n\n주요 원칙:\n• 한글 우선 사용\n• 짧은 문장 (40자 이내)\n• 능동형 문장\n• 일상 용어 사용\n• 불필요한 법령용어 지양\n\n개선 사례:\n"~하여야 한다" → "~해야 한다"\n"즉시" → "바로"\n"제출하여야" → "내야"\n\nAI가 어려운 법령 문장을 자동으로 찾아 쉬운 표현으로 개선을 제안합니다.';
            } else if (userMessage.includes('정부입법') || userMessage.includes('입법')) {
                response = '정부입법은 행정부가 법률안과 대통령령·총리령·부령을 제정하는 과정입니다.\n\n법제처 역할:\n• 정부입법 총괄·조정\n• 법령안 심사\n• 입법계획 수립 지원\n• 법제업무 교육\n\n입법 절차:\n1. 부처 입법계획 수립\n2. 법령안 작성\n3. 법제처 심사\n4. 국무회의 의결\n5. 대통령 재가/공포\n\nAI가 입법 일정을 관리하고 법령안 작성을 지원합니다.';
            } else if (userMessage.includes('자치법제') || userMessage.includes('조례')) {
                response = '자치법제는 지방자치단체의 조례와 규칙을 말합니다.\n\n법제처 지원:\n• 조례안 검토 지원\n• 법제업무 교육\n• 표준조례안 제공\n• 자치법규 정보 제공\n\n조례 제정 절차:\n1. 조례안 입안\n2. 법제담당관 검토\n3. 의회 제출\n4. 의회 심의·의결\n5. 단체장 공포\n\nAI가 전국 17개 광역·226개 기초자치단체의 조례를 분석하여 상위법 적합성을 검토합니다.';
            } else {
                response = '법제처 AI 상담 서비스입니다.\n\n문의하실 수 있는 주제:\n• 법령 심사 절차\n• 법령 해석 신청\n• 국가법령정보센터 이용\n• 알기 쉬운 법령 만들기\n• 정부입법 과정\n• 자치법제 지원\n\n구체적인 질문을 해주시면 더 자세한 안내를 드리겠습니다.';
            }
            
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsLoading(false);
        }, 1000);
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-700 to-yellow-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">AI 상담 서비스</h2>
                <p className="text-amber-100 text-sm">
                    DeepSeek R1 모델 기반으로 법령 심사·해석·정보 검색 관련 질문에 답변합니다
                </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-4 ${
                                msg.role === 'user' 
                                    ? 'bg-amber-600 text-white' 
                                    : 'bg-white border border-gray-200 text-gray-900'
                            }`}>
                                <div className="text-sm whitespace-pre-line">{msg.content}</div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                                <button
                                    key={index}
                                    onClick={() => handleQuickQuestion(q)}
                                    className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs hover:bg-amber-100 transition-colors"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="궁금하신 점을 질문해주세요..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            전송
                        </button>
                    </form>
                </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-blue-900 mb-1">AI 상담 안내</h4>
                        <p className="text-sm text-blue-800">
                            본 AI 상담은 일반적인 정보 제공을 목적으로 합니다. 
                            구체적인 법령 해석은 법제처 법령해석국(044-200-6711)으로 문의하시기 바랍니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIChat = AIChat;
