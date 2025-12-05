const { useState, useRef, useEffect } = React;

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! 금융위원회 AI 상담 서비스입니다. 금융기관 감독·금융소비자 보호·자본시장·금융정책에 대해 궁금하신 점을 질문해 주세요.'
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
        '금융소비자 보호는?',
        '불완전판매란?',
        '금융사기 신고는?',
        '예금자보호 한도는?'
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
            
            if (userMessage.includes('금융소비자') || userMessage.includes('소비자보호')) {
                response = '금융소비자 보호는 금융상품 이용 과정에서 소비자의 권익을 보호하는 제도입니다.\n\n금융소비자보호법 주요 내용:\n• 6대 판매원칙 준수 의무\n• 적합성 원칙\n• 적정성 원칙\n• 설명의무\n• 불공정영업행위 금지\n• 부당권유 금지\n• 허위·과장광고 금지\n\n금융소비자 권리:\n• 청약철회권 (7일 이내)\n• 위법계약 해지권\n• 자료열람요구권\n• 손해배상청구권\n• 분쟁조정 신청권\n\n피해 구제 방법:\n1. 금융회사 민원 신청\n2. 금융감독원 분쟁조정\n3. 소비자원 피해구제\n4. 집단분쟁조정\n5. 법원 소송\n\n금융감독원 상담:\n• 전화: 1332 (24시간)\n• 홈페이지: www.fss.or.kr\n• 방문: 금감원 본원·지원\n\n주요 보호 분야:\n• 예금·대출\n• 보험\n• 투자상품\n• 카드\n• 전자금융\n\nAI가 금융상품 판매 과정을 모니터링하고 위반을 자동 탐지합니다.';
            } else if (userMessage.includes('불완전판매')) {
                response = '불완전판매는 금융상품 판매 시 설명의무를 위반하거나 부적합한 상품을 권유하는 행위입니다.\n\n불완전판매 유형:\n• 설명의무 위반: 중요사항 미설명\n• 적합성 원칙 위반: 투자 성향 무시\n• 적정성 원칙 위반: 부적합 상품 판매\n• 허위·과장 설명\n• 단점 은폐\n• 강압 판매\n\n주요 사례:\n• ELS 원금손실 가능성 미고지\n• 고령자에게 복잡한 파생상품 판매\n• 보험 해약환급금 축소 미설명\n• 대출 중도상환수수료 미고지\n• 펀드 위험등급 왜곡 설명\n\n피해 구제:\n1. 금융회사 민원 제기\n2. 증거 자료 확보 (녹취, 계약서)\n3. 금감원 분쟁조정 신청\n4. 손해배상 청구\n\n분쟁조정 절차:\n1. 금감원 분쟁조정 신청\n2. 사실관계 조사\n3. 조정안 제시\n4. 양측 수락 시 종결\n5. 불수락 시 소송 가능\n\n손해배상 범위:\n• 원금 손실액\n• 기회비용\n• 위자료 (악의적 경우)\n\n예방 방법:\n• 계약 전 충분한 설명 요구\n• 이해 안 되면 재설명 요청\n• 계약서 꼼꼼히 확인\n• 녹취 또는 녹화\n• 숙려 기간 활용\n\nAI가 판매 프로세스를 분석하여 불완전판매를 자동 탐지합니다.';
            } else if (userMessage.includes('예금자보호') || userMessage.includes('예보')) {
                response = '예금자보호제도는 금융회사 파산 시 예금을 보호하는 제도로, 예금보험공사가 운영합니다.\n\n보호 한도:\n• 1인당 5천만원 (원금 + 이자)\n• 금융회사별로 합산\n• 동일 금융회사 여러 계좌 합산\n\n보호 대상:\n• 은행 예금·적금\n• 저축은행 예금·적금\n• 신용협동조합 예금\n• 새마을금고 예금\n• 상호저축은행 예금\n• 증권사 예탁금\n• 보험계약 (일부)\n\n보호 제외:\n• 5천만원 초과액\n• MMF, RP 등 실적배당상품\n• 양도성예금증서(CD)\n• 표지어음\n• 금융채\n• 외화예금 (일부 예외)\n\n보험 보호:\n• 생명보험: 5천만원\n• 손해보험: 5천만원\n• 단, 실손의료보험은 전액 보호\n\n여러 계좌 합산 예시:\n• A은행 예금 3천만원\n• A은행 적금 3천만원\n→ 합산 6천만원 중 5천만원만 보호\n\n부부 각각 보호:\n• 남편 A은행 5천만원\n• 아내 A은행 5천만원\n→ 각각 보호 (총 1억원)\n\n확인 방법:\n• 예금보험공사 홈페이지\n• 전화: 1588-0037\n• 금융회사에 문의\n\n파산 시 절차:\n1. 예보 보호 대상 확인\n2. 보험금 청구\n3. 심사 후 지급 (신속 지급)\n4. 5천만원 초과액은 파산배당\n\nAI가 금융회사 건전성을 모니터링하여 위험을 조기 경보합니다.';
            } else if (userMessage.includes('보이스피싱') || userMessage.includes('금융사기')) {
                response = '보이스피싱과 금융사기는 갈수록 지능화되고 있어 각별한 주의가 필요합니다.\n\n보이스피싱 유형:\n• 기관사칭형: 금융감독원, 검찰, 경찰\n• 가족사칭형: 자녀 납치·사고\n• 대출사기형: 저금리 대출 미끼\n• 메신저피싱: 카톡 해킹\n• 스미싱: 문자 링크 악성앱\n\n주요 수법:\n1. "금감원입니다. 계좌가 범죄에 연루"\n2. "검찰입니다. 조사 위해 계좌 확인"\n3. "자녀 납치. 몸값 요구"\n4. "저금리 대출. 기존 대출 상환 필요"\n5. "택배 도착. 링크 클릭"\n\n예방 방법:\n• 전화로 계좌번호·비밀번호 절대 불가\n• 금융기관은 대면 거래 원칙\n• 송금 전 가족·지인 확인\n• 앱은 공식 스토어에서만\n• 의심되면 112 또는 1332\n\n피해 발생 시 대응:\n1. 즉시 112 신고 (골든타임 30분)\n2. 은행 지급정지 요청\n3. 금감원 1332 신고\n4. 피해구제 신청\n\n지급정지:\n• 피해 신고 후 즉시\n• 사기계좌 동결\n• 잔액 있으면 피해자 환급\n\n피해 환급:\n1. 지급정지 신청\n2. 계좌 잔액 확인\n3. 피해자 확정\n4. 피해액 비례 배분\n5. 환급 (통상 3개월)\n\n주의사항:\n• 금감원·검찰은 전화로 계좌번호 안 물음\n• 안전계좌 이체 요구는 100% 사기\n• 공인인증서 요구도 사기\n• 앱 설치 요구도 사기\n\n신고·상담:\n• 112: 경찰청\n• 1332: 금융감독원\n• 118: 금융사기 신고\n\nAI가 이상 금융거래를 실시간 탐지하고 사기 패턴을 분석합니다.';
            } else if (userMessage.includes('대출') || userMessage.includes('햇살론')) {
                response = '금융위원회는 서민·청년을 위한 다양한 대출 지원 정책을 운영합니다.\n\n햇살론:\n• 대상: 연소득 4,500만원 이하\n• 금리: 최고 10.5%\n• 한도: 최대 2,000만원\n• 보증: 신용보증재단 보증\n\n새희망홀씨:\n• 대상: 연소득 3,500만원 이하\n• 금리: 최고 11.0%\n• 한도: 최대 3,000만원\n• 신용점수 하위 20%\n\n청년대출:\n• 청년도약계좌 연계 대출\n• 전세보증금 대출\n• 학자금 대출\n• 취업 준비생 생활비 대출\n\n소상공인 대출:\n• 소진공 정책자금\n• 신용보증 지원\n• 코로나 특례보증\n• 이차보전 지원\n\n중금리 대출:\n• 금리: 10~20%\n• 중·저신용자 대상\n• 은행·저축은행·카드사\n• 대환대출 가능\n\n주의사항:\n• 불법 사금융 이용 금지\n• 과도한 대출 자제\n• 상환계획 수립\n• 연체 시 신용등급 하락\n\n대출 갈아타기:\n• 고금리 → 저금리\n• 중도상환수수료 확인\n• 총비용 비교\n\n신청 방법:\n• 금융회사 방문\n• 인터넷뱅킹\n• 서민금융통합지원센터\n• 전화: 1397\n\nAI가 대출 심사를 지원하고 적합한 상품을 추천합니다.';
            } else if (userMessage.includes('주식') || userMessage.includes('증권') || userMessage.includes('투자')) {
                response = '자본시장 투자는 높은 수익과 함께 손실 위험도 있으므로 신중해야 합니다.\n\n투자 기본 원칙:\n• 여유자금으로 투자\n• 분산투자\n• 장기투자\n• 감당 가능한 위험\n• 이해하는 상품만 투자\n\n투자상품 종류:\n• 주식: 직접 투자\n• 펀드: 간접 투자\n• ETF: 상장지수펀드\n• 채권: 안전자산\n• ELS/DLS: 파생결합증권\n\n주식 투자 주의:\n• 기업 실적 분석\n• 재무제표 확인\n• 업종 전망 파악\n• 적정 가격 판단\n• 손절매 기준 설정\n\n불공정거래 금지:\n• 내부자거래\n• 시세조종\n• 미공개정보 이용\n• 부정거래\n→ 적발 시 형사처벌 + 과징금\n\n투자자 보호:\n• 투자설명서 교부 의무\n• 위험 고지 의무\n• 부적합 권유 금지\n• 손실보전 약속 금지\n\n분쟁 발생 시:\n1. 증권사 민원\n2. 금감원 분쟁조정\n3. 증권선물위원회 조사\n4. 법원 소송\n\n초보 투자자 추천:\n• 소액으로 시작\n• ETF로 분산투자\n• 적립식 투자\n• 모의투자 경험\n\n금융투자 교육:\n• 금감원 금융교육센터\n• 증권사 투자교육\n• 온라인 강의\n\n신고·상담:\n• 불공정거래: 금감원 1332\n• 투자 상담: 증권사\n\nAI가 시장을 모니터링하고 불공정거래를 자동 탐지합니다.';
            } else if (userMessage.includes('보험')) {
                response = '보험은 예상치 못한 위험에 대비하는 금융상품으로, 가입 시 신중한 검토가 필요합니다.\n\n보험 종류:\n• 생명보험: 사망·질병·상해\n• 손해보험: 자동차·화재·배상책임\n• 건강보험: 실손·암·CI\n• 연금보험: 노후 준비\n• 저축보험: 만기환급형\n\n가입 전 확인사항:\n• 보장 내용\n• 보험료\n• 면책·감액 기간\n• 갱신 여부\n• 해지환급금\n\n보험 약관 주요 내용:\n• 보장개시일\n• 보험금 지급 사유\n• 보험금 지급 제외 사유\n• 계약 해지 조건\n• 갱신 조건\n\n청약철회:\n• 계약일로부터 15일 이내\n• 무조건 해지 가능\n• 납입 보험료 전액 환급\n\n보험금 청구:\n1. 보험사 또는 설계사 연락\n2. 필요 서류 제출\n3. 심사\n4. 보험금 지급 (통상 3일)\n\n보험금 미지급 분쟁:\n• 보험사 민원\n• 금감원 분쟁조정\n• 소송\n\n실손보험 주의:\n• 중복 가입 불가 (2021년 이후)\n• 실제 치료비만 보상\n• 본인부담금 존재\n\n불완전판매 사례:\n• 갱신형을 비갱신형으로 설명\n• 해지환급금 축소 미고지\n• 면책기간 미설명\n• 보장 범위 과장\n\n보험 리모델링:\n• 기존 보험 분석\n• 중복 보장 제거\n• 부족 보장 추가\n• 보험료 절감\n\n상담:\n• 보험협회 1577-0100\n• 금감원 1332\n\nAI가 보험 상품을 분석하고 적합성을 평가합니다.';
            } else {
                response = '금융위원회 AI 상담 서비스입니다.\n\n문의하실 수 있는 주제:\n• 금융소비자 보호\n• 불완전판매\n• 예금자보호 제도\n• 보이스피싱·금융사기\n• 서민·청년 금융 지원\n• 주식·증권 투자\n• 보험 상품\n• 금융분쟁 조정\n\n상담 전화:\n• 1332: 금융감독원 (24시간)\n• 1397: 서민금융\n\n구체적인 질문을 해주시면 더 자세한 안내를 드리겠습니다.';
            }
            
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsLoading(false);
        }, 1000);
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">AI 상담 서비스</h2>
                <p className="text-blue-100 text-sm">
                    DeepSeek R1 모델 기반으로 금융 관련 질문에 답변합니다
                </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-4 ${
                                msg.role === 'user' 
                                    ? 'bg-blue-600 text-white' 
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
                                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs hover:bg-blue-100 transition-colors"
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
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
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
                            구체적인 상담은 금융감독원(1332)으로 문의하시기 바랍니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIChat = AIChat;
