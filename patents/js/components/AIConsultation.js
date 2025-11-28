// AIConsultation 컴포넌트 - Claude AI 상담
const AIConsultation = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! AI 특허 상담 서비스입니다. 발명 아이디어, 출원 절차, 청구항 작성 등 지식재산권 관련 모든 질문에 답변해 드립니다.\n\n무엇을 도와드릴까요?',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [consultationType, setConsultationType] = useState('general');
    const messagesEndRef = useRef(null);

    const consultationTypes = [
        { id: 'general', label: '일반 상담', icon: '💬' },
        { id: 'invention', label: '발명 상담', icon: '💡' },
        { id: 'claim', label: '청구항 검토', icon: '📝' },
        { id: 'prior-art', label: '선행기술', icon: '🔍' },
        { id: 'international', label: '해외 출원', icon: '🌐' }
    ];

    const quickQuestions = [
        '특허와 실용신안의 차이점이 무엇인가요?',
        '소프트웨어 발명도 특허를 받을 수 있나요?',
        '선행기술 조사는 어떻게 하나요?',
        '청구항을 넓게 작성하는 방법은?',
        '오픈해시 우선권 증명이 뭔가요?'
    ];

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage = {
            role: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // AI 응답 시뮬레이션 (실제로는 API 호출)
        setTimeout(() => {
            const responses = {
                '특허와 실용신안의 차이점이 무엇인가요?': `특허와 실용신안의 주요 차이점을 설명해 드리겠습니다:

**특허 (발명)**
- 보호 대상: 고도의 기술적 사상의 창작
- 권리 기간: 출원일로부터 20년
- 심사: 실체심사 필수
- 출원료: 약 46,000원
- 대상: 물건, 방법, 물질 등 모든 발명

**실용신안**
- 보호 대상: 물품의 형상·구조·조합에 관한 고안
- 권리 기간: 출원일로부터 10년
- 심사: 기초적 요건만 심사 (빠른 등록)
- 출원료: 약 20,000원
- 대상: 물품의 형상에 관한 것만

💡 **추천**: 혁신적 기술이라면 특허, 소규모 개선이라면 실용신안을 추천드립니다.`,
                
                '소프트웨어 발명도 특허를 받을 수 있나요?': `네, 소프트웨어 발명도 특허를 받을 수 있습니다!

**특허 가능한 소프트웨어 발명:**
- 하드웨어와 결합된 소프트웨어
- 구체적인 기술적 수단을 포함한 발명
- 산업상 이용가능성이 있는 발명

**청구항 작성 팁:**
1. "~하는 방법" 또는 "~하는 시스템" 형태로 작성
2. 컴퓨터, 프로세서, 메모리 등 하드웨어 요소 포함
3. 구체적인 처리 단계 명시

**예시 청구항:**
"컴퓨터에 의해 실행되는 데이터 처리 방법에 있어서,
(a) 입력 데이터를 수신하는 단계;
(b) 상기 데이터를 AI 모델로 분석하는 단계; 및
(c) 분석 결과를 출력하는 단계를 포함하는 방법."

⛓️ 오픈해시를 활용하면 소프트웨어 발명의 개발 시점을 증명할 수 있어 분쟁 시 유리합니다.`,

                '오픈해시 우선권 증명이 뭔가요?': `**오픈해시 우선권 증명**은 발명의 존재 시점을 기술적으로 증명하는 시스템입니다.

**핵심 원리:**
- 발명 내용의 해시값을 생성
- 타임스탬프와 함께 분산 저장
- 위변조가 불가능한 증거 생성

**장점:**
✅ 선출원주의에서 출원 전 발명 시점 증명
✅ 블록체인 대비 98.5% 에너지 절감
✅ 글로벌 우선권 주장에 활용 가능
✅ 직무발명 분쟁 시 증거로 활용

**활용 시나리오:**
1. 아이디어 단계에서 오픈해시 등록
2. 출원 준비 중 선행기술 공개 시 대응
3. 해외 출원 시 우선권 증명
4. 기술 유출 분쟁 시 증거 제출

🔗 지금 바로 우선권 증명을 등록하시겠습니까?`
            };

            let responseContent = responses[inputValue] || 
                `말씀하신 "${inputValue}"에 대해 답변드리겠습니다.\n\n이 질문은 ${consultationType === 'claim' ? '청구항 작성' : consultationType === 'prior-art' ? '선행기술 조사' : '지식재산권'} 관련 내용이네요. 구체적인 상황을 더 말씀해주시면 더 정확한 안내를 드릴 수 있습니다.\n\n추가 질문이 있으시면 말씀해주세요!`;

            const assistantMessage = {
                role: 'assistant',
                content: responseContent,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, assistantMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="space-y-6 pt-[140px]">
            {/* 페이지 타이틀 */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="text-3xl">🤖</span>
                        AI 특허 상담
                    </h2>
                    <p className="text-gray-500">Claude AI가 지식재산권 관련 상담을 도와드립니다</p>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
                {/* 좌측: 상담 유형 및 빠른 질문 */}
                <div className="col-span-1 space-y-4">
                    {/* 상담 유형 */}
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <h4 className="font-medium text-gray-800 mb-3">상담 유형</h4>
                        <div className="space-y-2">
                            {consultationTypes.map(type => (
                                <button
                                    key={type.id}
                                    onClick={() => setConsultationType(type.id)}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center gap-2 ${
                                        consultationType === type.id
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'hover:bg-gray-100 text-gray-600'
                                    }`}
                                >
                                    <span>{type.icon}</span>
                                    <span className="text-sm">{type.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 빠른 질문 */}
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <h4 className="font-medium text-gray-800 mb-3">자주 묻는 질문</h4>
                        <div className="space-y-2">
                            {quickQuestions.map((q, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setInputValue(q)}
                                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 우측: 채팅 영역 */}
                <div className="col-span-3 bg-white rounded-xl shadow-sm flex flex-col" style={{ height: 'calc(100vh - 280px)' }}>
                    {/* 채팅 헤더 */}
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                                <i className="fas fa-robot"></i>
                            </div>
                            <div>
                                <div className="font-medium text-gray-800">AI 특허 상담사</div>
                                <div className="text-xs text-green-600 flex items-center gap-1">
                                    <i className="fas fa-circle text-xs"></i>
                                    온라인
                                </div>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">
                            Claude AI 기반 | 응답시간 ~2초
                        </div>
                    </div>

                    {/* 메시지 영역 */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[80%] rounded-xl p-4 ${
                                    msg.role === 'user' 
                                        ? 'user-message' 
                                        : 'ai-message'
                                }`}>
                                    <div className="whitespace-pre-wrap text-gray-800">{msg.content}</div>
                                    <div className="text-xs text-gray-500 mt-2">
                                        {msg.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="ai-message rounded-xl p-4">
                                    <div className="flex items-center gap-2">
                                        <span className="typing-dot w-2 h-2 bg-blue-500 rounded-full"></span>
                                        <span className="typing-dot w-2 h-2 bg-blue-500 rounded-full"></span>
                                        <span className="typing-dot w-2 h-2 bg-blue-500 rounded-full"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* 입력 영역 */}
                    <div className="px-6 py-4 border-t border-gray-200">
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="질문을 입력하세요..."
                                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!inputValue.trim() || isTyping}
                                className="btn-kipo text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50"
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                        <div className="text-xs text-gray-500 mt-2 text-center">
                            AI 상담은 참고용이며, 최종 결정은 전문 변리사와 상담하세요
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
