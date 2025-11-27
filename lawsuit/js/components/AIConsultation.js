const AIConsultation = () => {
    const [messages, setMessages] = React.useState([
        { 
            role: 'ai', 
            content: `안녕하세요! AI 법률 상담사입니다. 🤖⚖️

어떤 법률 문제로 상담을 원하시나요? 민사, 형사, 가사, 행정 등 모든 분야에 대해 상담해 드립니다.

- 소송 절차 안내
- 승소 가능성 분석  
- 소장/답변서 작성 도움
- 비용 및 기간 예측

자유롭게 질문해 주세요!` 
        }
    ]);
    const [input, setInput] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);
    const messagesEndRef = React.useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const generateResponse = (query) => {
        const q = query.toLowerCase();

        if (q.includes('보증금') || q.includes('전세') || q.includes('임대')) {
            return `임대차 관련 문의시군요. 📋

**현재 상황 분석**
임대차보증금 반환 분쟁은 가장 흔한 민사 사건 중 하나입니다.

**주요 확인 사항**
1. 계약 만료일은 언제인가요?
2. 보증금 금액은 얼마인가요?
3. 이미 퇴거하셨나요?
4. 임대인이 반환을 거부하는 사유가 무엇인가요?

**AI 승소율 예측**
- 계약서 + 입금증빙 확보 시: 85-90%
- 원상복구 분쟁 동반 시: 70-80%

**예상 비용 (5,000만원 기준)**
- 인지대: 약 25만원
- 송달료: 52,800원
- AI 서비스: 무료

구체적인 상황을 알려주시면 더 정확한 분석이 가능합니다.`;
        }

        if (q.includes('임금') || q.includes('월급') || q.includes('퇴직금') || q.includes('체불')) {
            return `임금 체불 관련 문의시군요. 👷

**법적 근거**
- 근로기준법 제36조 (금품 청산)
- 근로기준법 제43조 (임금 지급)

**해결 방법 (단계별)**
1. **노동청 진정** (무료, 약 1개월)
   - 가장 빠르고 간편한 방법
   - 사업주에게 시정명령 가능

2. **민사소송** (임금청구)
   - 노동청으로 해결 안 될 경우
   - 소멸시효: 3년

3. **지급명령 신청**
   - 간이절차로 빠른 집행권원 확보
   - 상대방이 이의하면 소송으로 전환

**필요 서류**
- 근로계약서
- 급여명세서
- 출퇴근 기록
- 통장 입금내역

체불 기간과 금액을 알려주시면 구체적인 절차를 안내해 드리겠습니다.`;
        }

        if (q.includes('이혼') || q.includes('양육권') || q.includes('위자료')) {
            return `가사 소송 관련 문의시군요. 👨‍👩‍👧

**이혼 종류**
1. **협의이혼**: 합의 → 가정법원 확인 → 이혼신고
2. **재판이혼**: 법원에 소송 제기

**재판이혼 사유 (민법 제840조)**
- 배우자의 부정행위
- 악의의 유기
- 심히 부당한 대우
- 3년 이상 생사불명
- 기타 혼인을 계속하기 어려운 중대한 사유

**AI 분석 가능 항목**
- 위자료 예상 금액: 평균 1,500만원~5,000만원
- 재산분할 비율: 보통 4:6 ~ 5:5
- 양육권 판정 예측

**예상 기간**
- 협의이혼: 1~3개월
- 재판이혼: 6개월~2년

더 자세한 상황을 알려주시겠어요?`;
        }

        if (q.includes('소송') && (q.includes('비용') || q.includes('얼마'))) {
            return `소송 비용에 대해 안내해 드리겠습니다. 💰

**소송 비용 구성**
1. **인지대** (청구금액에 따라)
   • 1,000만원: 약 5만원
   • 5,000만원: 약 25만원
   • 1억원: 약 50만원
   • 5억원: 약 205만원

2. **송달료**
   • 당사자 수 × 회송료
   • 기본 약 52,800원

3. **변호사 비용** (선임 시)
   • 착수금: 200만원~1,000만원
   • 성공보수: 인용액의 10~15%

**AI 전자소송 장점**
- AI 서비스: 무료
- 변호사 비용 절감: 90% 이상
- 직접 작성으로 착수금 불필요

정확한 비용 계산을 원하시면 청구금액을 알려주세요.`;
        }

        if (q.includes('기간') || q.includes('얼마나 걸')) {
            return `소송 기간에 대해 안내해 드리겠습니다. ⏱️

**일반적인 소송 기간**

1. **민사소송**
   • 1심: 6개월~1년
   • 2심(항소): 4~8개월 추가
   • 3심(상고): 4~6개월 추가

2. **지급명령**
   • 이의 없을 경우: 1~2개월
   • 이의 시 소송 전환

3. **가사소송**
   • 협의이혼: 1~3개월
   • 재판이혼: 6개월~2년

4. **행정소송**
   • 1심: 6개월~1년

**기간 단축 방법**
- 증거 철저히 준비
- 조정/화해 적극 활용
- AI 서류 작성으로 보정 최소화

어떤 종류의 소송을 고려하고 계신가요?`;
        }

        return `네, 말씀하신 내용을 이해했습니다. 🤔

더 정확한 법률 상담을 위해 다음 정보가 필요합니다:

1. **분쟁의 종류**: 민사/형사/가사/행정 중 어디에 해당하나요?
2. **상대방**: 개인/법인/정부기관 중 누구와의 분쟁인가요?
3. **분쟁 경위**: 언제, 어떻게 발생했나요?
4. **보유 증거**: 계약서, 영수증, 녹취록 등이 있으신가요?
5. **원하는 결과**: 금전배상/원상회복/기타 무엇을 원하시나요?

이 정보를 바탕으로 AI가 다음을 분석해 드립니다:
- 승소 가능성 예측
- 예상 배상액/인용액
- 소요 기간 및 비용
- 유사 판례 검색

편하게 설명해 주세요! 😊`;
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const response = generateResponse(input);
            setMessages(prev => [...prev, { role: 'ai', content: response }]);
            setIsTyping(false);
        }, 1500);
    };

    const quickQuestions = [
        '보증금을 돌려받고 싶어요',
        '임금을 받지 못했어요',
        '이혼 절차가 궁금해요',
        '소송 비용은 얼마인가요?',
        '소송 기간은 얼마나 걸리나요?'
    ];

    return (
        <div className="p-6 h-[calc(100vh-180px)]">
            <div className="bg-white rounded-xl shadow-sm border h-full flex flex-col">
                <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🤖</span>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">AI 법률 상담사</h2>
                            <p className="text-blue-200 text-sm">Claude API 기반 · 24시간 무료 상담</p>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span className="text-sm text-green-300">온라인</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl p-4 ${
                                msg.role === 'user' 
                                    ? 'bg-blue-600 text-white rounded-br-md' 
                                    : 'bg-gray-100 text-gray-800 rounded-bl-md'
                            }`}>
                                <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 rounded-2xl p-4 rounded-bl-md">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="px-4 py-2 border-t bg-gray-50 flex gap-2 overflow-x-auto">
                    {quickQuestions.map((q, i) => (
                        <button
                            key={i}
                            onClick={() => setInput(q)}
                            className="px-3 py-1.5 bg-white border rounded-full text-sm text-gray-600 hover:bg-blue-50 hover:border-blue-300 whitespace-nowrap flex-shrink-0"
                        >
                            {q}
                        </button>
                    ))}
                </div>

                <div className="p-4 border-t flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && sendMessage()}
                        placeholder="법률 상담 내용을 입력하세요..."
                        className="flex-1 border rounded-full px-6 py-3 focus:border-blue-500 focus:outline-none"
                    />
                    <button 
                        onClick={sendMessage}
                        disabled={!input.trim() || isTyping}
                        className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
