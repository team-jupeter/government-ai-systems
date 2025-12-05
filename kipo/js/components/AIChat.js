const { useState, useRef, useEffect } = React;

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! 지식재산처 AI 상담 서비스입니다. 특허·실용신안·디자인·상표 출원 및 심사에 대해 궁금하신 점을 질문해 주세요.'
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
        '특허 출원 방법은?',
        '상표 등록 절차는?',
        '디자인 보호 기간은?',
        'PCT 국제출원이란?'
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
            
            if (userMessage.includes('특허') && (userMessage.includes('출원') || userMessage.includes('신청'))) {
                response = '특허는 발명을 보호하는 권리로, 신규성·진보성·산업상 이용가능성이 있어야 합니다.\n\n출원 절차:\n1. 선행기술 조사 (유사 특허 확인)\n2. 명세서 작성 (발명의 내용)\n3. 특허 출원 (온라인/우편)\n4. 방식 심사 (서류 완비 확인)\n5. 실체 심사 (신규성·진보성 판단)\n6. 등록 결정 또는 거절\n\n필요 서류:\n• 특허출원서\n• 명세서\n• 도면\n• 요약서\n\n심사 기간: 약 10~18개월\n비용: 출원료 + 심사청구료 + 등록료\n\nAI가 선행기술 조사와 명세서 작성을 지원합니다.';
            } else if (userMessage.includes('상표') && (userMessage.includes('등록') || userMessage.includes('출원'))) {
                response = '상표는 상품이나 서비스를 식별하는 표시로, 식별력이 있어야 합니다.\n\n등록 절차:\n1. 상표 검색 (유사 상표 확인)\n2. 상표 출원 (지정상품 선택)\n3. 방식 심사\n4. 실체 심사 (식별력, 유사 여부)\n5. 출원공고 (2개월)\n6. 등록 결정\n\n상표 요건:\n• 식별력: 타 상품과 구별 가능\n• 독창성: 기존 상표와 비유사\n• 공공성: 공공질서 위배 금지\n\n보호 기간: 10년 (갱신 가능)\n심사 기간: 약 7~10개월\n\nAI가 유사 상표를 자동 검색하고 식별력을 판단합니다.';
            } else if (userMessage.includes('디자인')) {
                response = '디자인은 물품의 외관을 보호하는 권리로, 신규성과 창작성이 필요합니다.\n\n등록 절차:\n1. 디자인 검색 (유사 디자인 확인)\n2. 디자인 출원 (도면 제출)\n3. 방식 심사\n4. 실체 심사 (신규성, 창작성)\n5. 등록 결정\n\n디자인 요건:\n• 신규성: 공지되지 않은 디자인\n• 창작성: 통상의 디자이너가 쉽게 창작 불가\n• 공업상 이용가능성\n\n보호 기간: 20년\n심사 기간: 약 5~7개월\n\n디자인 종류:\n• 물품 디자인\n• 글꼴 디자인\n• 화면 디자인 (GUI)\n\nAI 이미지 인식으로 유사 디자인을 자동 검색합니다.';
            } else if (userMessage.includes('PCT') || userMessage.includes('국제출원')) {
                response = 'PCT(특허협력조약)는 하나의 출원으로 여러 국가에 특허를 출원하는 제도입니다.\n\nPCT 절차:\n1. PCT 국제출원 (한국 지식재산처)\n2. 국제조사 (선행기술 조사)\n3. 국제공개 (18개월 후)\n4. 국제예비심사 (선택)\n5. 국내단계 진입 (30/31개월)\n6. 각국 특허청 심사\n\nPCT 장점:\n• 출원 시기 유예 (30개월)\n• 비용 절감 (초기)\n• 전략적 판단 시간 확보\n\n가입국: 157개국 (2025년 기준)\n\n주요 국가:\n• 미국, 유럽, 중국, 일본\n• 한국, 독일, 영국 등\n\nAI가 국제출원 서류를 자동 검토하고 번역을 지원합니다.';
            } else if (userMessage.includes('실용신안')) {
                response = '실용신안은 물품의 형상·구조·조합에 관한 고안을 보호합니다.\n\n실용신안 vs 특허:\n• 보호 대상: 물품의 형상·구조 (특허는 방법도 가능)\n• 창작 수준: 특허보다 낮음\n• 보호 기간: 10년 (특허는 20년)\n• 심사: 무심사 등록 가능\n\n등록 절차:\n1. 실용신안 출원\n2. 방식 심사\n3. 무심사 등록 또는\n4. 실체 심사 (선택)\n5. 등록 결정\n\n심사 기간: 약 3~6개월\n\n적합한 경우:\n• 개량 발명\n• 빠른 권리 확보 필요\n• 라이프사이클 짧은 제품\n\nAI가 특허와 실용신안 중 적합한 권리를 추천합니다.';
            } else if (userMessage.includes('심판') || userMessage.includes('거절')) {
                response = '특허심판은 특허청의 결정에 불복하거나 권리의 유효성을 다투는 절차입니다.\n\n심판 종류:\n• 거절결정 불복심판: 거절된 출원에 불복\n• 무효심판: 등록된 권리의 무효 주장\n• 권리범위 확인심판: 침해 여부 판단\n• 정정심판: 명세서 오류 정정\n\n거절결정 불복심판:\n1. 거절결정 통지 (30일 내)\n2. 불복심판 청구\n3. 심판관 심리\n4. 심결 (등록/기각)\n5. 특허법원 소송 (불복 시)\n\n무효심판:\n• 누구나 청구 가능\n• 등록 후 언제든지\n• 신규성·진보성 흠결 주장\n\n심판 기간: 약 8~12개월\n\nAI가 유사 판례를 검색하고 심판 자료를 자동 구성합니다.';
            } else if (userMessage.includes('비용') || userMessage.includes('수수료')) {
                response = '지식재산권 출원·등록에는 각종 수수료가 발생합니다.\n\n특허 비용 (예시):\n• 출원료: 46,000원 + 청구항당 40,000원\n• 심사청구료: 140,000원 + 청구항당 44,000원\n• 등록료 (3년): 36,000원 + 청구항당 39,000원\n\n상표 비용:\n• 출원료: 62,000원 (1구분)\n• 등록료 (10년): 211,000원 (1구분)\n\n디자인 비용:\n• 출원료: 75,000원\n• 등록료 (20년): 456,000원\n\n감면 제도:\n• 개인·중소기업: 70% 감면\n• 기초생활수급자: 85% 감면\n• 국가유공자: 70% 감면\n\n온라인 출원: 5% 할인\n\n정확한 비용은 청구항 수, 지정상품 수에 따라 달라집니다.';
            } else if (userMessage.includes('침해') || userMessage.includes('분쟁')) {
                response = '특허 침해는 정당한 권리 없이 특허발명을 실시하는 행위입니다.\n\n침해 대응 방법:\n1. 경고장 발송\n2. 협상 (라이선스 계약)\n3. 특허심판원 권리범위 확인심판\n4. 법원 침해금지 가처분\n5. 민사소송 (손해배상)\n6. 형사고소\n\n침해 요건:\n• 특허권이 유효\n• 권리범위에 속함\n• 정당한 권한 없음\n\n손해배상:\n• 실시료 상당액\n• 침해자 이익\n• 특허권자 손해\n\n해외 침해 대응:\n• ITC 조사 (미국)\n• 통관 보류 신청\n• 현지 소송\n\n지식재산처 지식재산분쟁대응국이 국제 분쟁을 지원합니다.';
            } else {
                response = '지식재산처 AI 상담 서비스입니다.\n\n문의하실 수 있는 주제:\n• 특허 출원 및 심사\n• 상표 등록 절차\n• 디자인 보호\n• PCT 국제출원\n• 실용신안 등록\n• 특허심판\n• 출원 비용\n• 침해 분쟁 대응\n\n구체적인 질문을 해주시면 더 자세한 안내를 드리겠습니다.';
            }
            
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsLoading(false);
        }, 1000);
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-violet-700 to-purple-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">AI 상담 서비스</h2>
                <p className="text-violet-100 text-sm">
                    DeepSeek R1 모델 기반으로 특허·상표·디자인 관련 질문에 답변합니다
                </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-4 ${
                                msg.role === 'user' 
                                    ? 'bg-violet-600 text-white' 
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
                                    <div className="w-2 h-2 bg-violet-600 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-violet-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-violet-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                                    className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-xs hover:bg-violet-100 transition-colors"
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
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
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
                            구체적인 상담은 특허고객상담센터(1544-8080)로 문의하시기 바랍니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIChat = AIChat;
