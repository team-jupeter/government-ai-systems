const { useState, useRef, useEffect } = React;

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! 인사혁신처 AI 상담 서비스입니다. 공무원 인사, 채용, 윤리, 복무, 연금 등에 대해 궁금하신 점을 질문해 주세요.'
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
        '공무원 승진 절차는?',
        '7급 공채 시험 일정은?',
        '공무원 연금 계산 방법은?',
        '재산공개 대상자는?'
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
        
        // 간단한 규칙 기반 응답 (실제로는 백엔드 API 호출)
        setTimeout(() => {
            let response = '';
            
            if (userMessage.includes('승진') || userMessage.includes('인사')) {
                response = '공무원 승진은 근무성적평정, 경력평정, 교육훈련평정을 종합하여 결정됩니다.\n\n주요 기준:\n• 근무성적평정 (70%)\n• 경력평정 (20%)\n• 교육훈련평정 (10%)\n\nAI가 자동으로 평가 자료를 분석하고 승진 추천 순위를 산정합니다.';
            } else if (userMessage.includes('시험') || userMessage.includes('채용') || userMessage.includes('공채')) {
                response = '국가공무원 채용 시험은 매년 정기적으로 실시됩니다.\n\n주요 시험:\n• 5급 공채 (행정고시)\n• 7급 공채\n• 9급 공채\n\n2025년 7급 공채 일정:\n• 원서접수: 3월\n• 필기시험: 5월\n• 면접시험: 7월\n\n자세한 일정은 사이버국가고시센터(gosi.kr)에서 확인하실 수 있습니다.';
            } else if (userMessage.includes('연금')) {
                response = '공무원 연금은 재직기간, 기준소득월액, 지급률을 기준으로 계산됩니다.\n\n계산식:\n기준소득월액 × (재직연수 × 1.9%) × 연금지급률\n\n수급 요건:\n• 20년 이상 재직 시 퇴직연금\n• 10년 이상 재직 시 조기퇴직연금\n• 장해연금, 유족연금 등 특수 사유\n\nAI가 자동으로 연금액을 정확하게 계산하여 제공합니다.';
            } else if (userMessage.includes('재산') || userMessage.includes('공개') || userMessage.includes('윤리')) {
                response = '공직자 재산공개는 공직자윤리법에 따라 실시됩니다.\n\n대상자:\n• 4급 이상 공무원\n• 고위공직자\n• 임명직 공무원 중 일정 직급 이상\n\n공개 내용:\n• 본인 및 배우자, 직계존비속 재산\n• 부동산, 예금, 주식, 채권 등\n• 연 1회 정기 공개\n\nAI가 재산변동 내역을 자동 분석하고 이상 징후를 탐지합니다.';
            } else if (userMessage.includes('복무') || userMessage.includes('근무')) {
                response = '공무원 복무 제도는 다양한 근무 형태를 지원합니다.\n\n주요 복무 제도:\n• 시차출퇴근제\n• 재택근무 (주 1-2회)\n• 육아휴직 (최대 3년)\n• 출산휴가 (90일)\n• 병가, 연가\n\nAI가 근무패턴을 분석하여 비정상 근무를 탐지하고 복무관리를 지원합니다.';
            } else if (userMessage.includes('교육') || userMessage.includes('훈련')) {
                response = '공무원 교육훈련은 국가공무원인재개발원에서 실시합니다.\n\n주요 교육:\n• 신규자 교육 (필수)\n• 승진자 교육 (필수)\n• AI 역량 교육 (2026년부터 의무)\n• 직무전문교육\n• 리더십 교육\n\n온라인 교육: 인재개발플랫폼(learning.go.kr)\n\nAI가 개인별 역량을 분석하여 맞춤형 교육과정을 추천합니다.';
            } else {
                response = '인사혁신처 AI 상담 서비스입니다.\n\n문의하실 수 있는 주제:\n• 공무원 인사 및 승진\n• 채용 시험 일정\n• 윤리 및 복무 관리\n• 연금 계산 및 수급\n• 교육훈련 과정\n\n구체적인 질문을 해주시면 더 자세한 안내를 드리겠습니다.';
            }
            
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsLoading(false);
        }, 1000);
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-700 to-green-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">AI 상담 서비스</h2>
                <p className="text-teal-100 text-sm">
                    DeepSeek R1 모델 기반으로 인사·채용·윤리·복무·연금 관련 질문에 답변합니다
                </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-4 ${
                                msg.role === 'user' 
                                    ? 'bg-teal-600 text-white' 
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
                                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                                    className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs hover:bg-teal-100 transition-colors"
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
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
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
                            구체적인 개인 상담은 인사혁신처 민원실(1588-9191)로 문의하시기 바랍니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIChat = AIChat;
