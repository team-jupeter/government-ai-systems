const { useState, useRef, useEffect } = React;

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! 공정거래위원회 AI 상담 서비스입니다. 불공정거래·담합·독과점·소비자 피해에 대해 궁금하신 점을 질문해 주세요.'
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
        '불공정거래 신고 방법은?',
        '담합 조사 절차는?',
        '소비자 피해 구제는?',
        '하도급 부당행위는?'
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
            
            if (userMessage.includes('불공정거래') && (userMessage.includes('신고') || userMessage.includes('방법'))) {
                response = '불공정거래행위는 공정한 거래를 저해하는 행위로, 신고할 수 있습니다.\n\n신고 방법:\n1. 온라인 신고: 공정위 홈페이지\n2. 전화 신고: 1372 (소비자상담센터)\n3. 방문 신고: 공정위 본부 또는 지방사무소\n4. 우편 신고: 세종시 공정거래위원회\n\n주요 불공정거래행위:\n• 거래거절: 정당한 이유 없이 거래 거부\n• 차별적 취급: 특정 사업자에게 불리한 조건\n• 경쟁사업자 배제: 다른 사업자의 거래 방해\n• 부당염매: 원가 이하 판매로 경쟁 제한\n• 끼워팔기: 원하지 않는 상품 강매\n• 거래강제: 불공정한 조건 강요\n\n신고 시 필요 자료:\n• 피해 사실 증명 자료\n• 거래 내역서\n• 계약서, 이메일 등\n\nAI가 신고 내용을 자동 분석하고 조사 여부를 판단합니다.';
            } else if (userMessage.includes('담합') || userMessage.includes('카르텔')) {
                response = '담합(카르텔)은 사업자 간 경쟁을 제한하는 합의로 엄격히 금지됩니다.\n\n담합의 유형:\n• 가격담합: 가격을 합의하여 결정\n• 입찰담합: 입찰에서 낙찰자 사전 결정\n• 시장분할: 지역이나 고객 분할\n• 생산량 제한: 공급량 조절로 가격 인상\n• 거래조건 합의: 거래 조건 통일\n\n조사 절차:\n1. 신고 접수 또는 직권 조사\n2. AI 시장 데이터 분석 (가격 동조화율)\n3. 현장 조사 (서류 압수, 관계자 조사)\n4. 심의·의결 (위원회)\n5. 시정조치 및 과징금 부과\n\n처벌:\n• 과징금: 위반 매출액의 최대 10%\n• 형사처벌: 3년 이하 징역 또는 2억원 이하 벌금\n• 손해배상: 피해자에게 3배 배상\n\n리니언시(자진신고 감면):\n• 1순위: 과징금·형벌 면제\n• 2순위: 50% 감경\n• 3순위: 30% 감경\n\nAI가 입찰 데이터를 분석하여 담합을 자동 탐지합니다.';
            } else if (userMessage.includes('소비자') && (userMessage.includes('피해') || userMessage.includes('구제'))) {
                response = '소비자 피해는 공정거래위원회와 한국소비자원에서 구제합니다.\n\n피해 구제 방법:\n1. 사업자와 직접 협의\n2. 1372 소비자상담센터 상담\n3. 한국소비자원 피해구제 신청\n4. 소비자분쟁조정위원회 조정 신청\n5. 소비자단체소송\n\n소비자분쟁조정:\n• 신청: 한국소비자원 또는 공정위\n• 비용: 무료\n• 기간: 30일 이내\n• 효력: 양측 수락 시 재판상 화해 효력\n\n주요 소비자 보호 분야:\n• 허위·과대광고\n• 약관의 불공정 조항\n• 제품 하자\n• 환불 거부\n• 개인정보 유출\n\n집단분쟁조정:\n• 50명 이상 동일 피해\n• 일괄 조정 가능\n• 신속한 피해 구제\n\n상담 전화:\n• 1372: 소비자상담센터 (24시간)\n• 국번없이 1372\n\nAI가 소비자 피해 유형을 분석하고 구제 방안을 제시합니다.';
            } else if (userMessage.includes('하도급')) {
                response = '하도급거래는 원사업자와 수급사업자 간 거래로, 불공정행위가 금지됩니다.\n\n주요 하도급 위반행위:\n• 부당한 하도급대금 결정: 원가 이하 단가\n• 하도급대금 감액: 일방적 대금 삭감\n• 물품 구매 강제: 원사업자 물품 강매\n• 기술자료 요구: 부당한 기술 유용\n• 부당 반품: 정당한 이유 없는 반품\n• 대금 지급 지연: 60일 초과 지연\n\n하도급대금 지급:\n• 제조: 60일 이내\n• 용역·건설: 검사 후 60일 이내\n• 어음: 90일 이내 만기\n\n위반 시 제재:\n• 시정명령\n• 과징금: 위반금액의 최대 3배\n• 형사처벌: 3년 이하 징역 또는 위반금액의 2배 이하 벌금\n• 손해배상: 지연이자 연 40%\n\n신고 방법:\n• 공정위 하도급 신고센터\n• 온라인: 공정위 홈페이지\n• 전화: 1372\n\n익명 신고 가능\n\nAI가 하도급 거래를 모니터링하고 위반을 자동 탐지합니다.';
            } else if (userMessage.includes('가맹') || userMessage.includes('프랜차이즈')) {
                response = '가맹사업은 가맹본부와 가맹점 간 관계로, 공정한 거래가 보장되어야 합니다.\n\n가맹사업법 주요 내용:\n• 정보공개서 제공: 계약 전 14일 전 제공 의무\n• 허위·과장 정보 제공 금지\n• 예상 매출액 근거 제시 의무\n• 가맹금 반환: 계약 취소 시\n\n불공정거래행위:\n• 부당한 영업시간 구속\n• 가맹점 판매가격 강제\n• 경쟁 가맹점 개설: 영업지역 침해\n• 부당한 원재료 구입 강제\n• 계약 갱신 거절: 정당한 이유 없이\n• 가맹금 미반환\n\n정보공개서 필수 항목:\n• 가맹본부 정보\n• 가맹점 현황\n• 영업표지 사용\n• 가맹금 내역\n• 예상 매출액과 근거\n• 교육·훈련\n\n위반 시 제재:\n• 시정명령\n• 과징금: 관련 매출액의 5% 이하\n• 형사처벌: 2년 이하 징역 또는 5천만원 이하 벌금\n\n신고: 공정위 가맹거래과 또는 1372\n\nAI가 가맹계약서를 분석하고 불공정 조항을 자동 검토합니다.';
            } else if (userMessage.includes('광고') || userMessage.includes('표시')) {
                response = '허위·과대광고는 소비자를 기만하는 행위로 엄격히 규제됩니다.\n\n표시·광고 위반 유형:\n• 허위·과대 표시광고: 사실과 다른 내용\n• 기만적 표시광고: 소비자를 속임\n• 부당한 비교광고: 경쟁사 비방\n• 비방광고: 경쟁사 명예 훼손\n\n주요 단속 분야:\n• 건강기능식품: 질병 치료 효능 과대\n• 화장품: 효과 과장\n• 다이어트 제품: 허위 체험담\n• 의료 서비스: 부당한 유인\n• 부동산: 허위 매물\n\n조사·처분:\n1. AI 자동 모니터링 (광고 24시간 감시)\n2. 위반 적발\n3. 시정명령 (광고 중지, 정정광고)\n4. 과징금: 관련 매출액의 5% 이하\n5. 형사고발: 악질적 위반\n\n정정광고:\n• 같은 매체, 같은 크기\n• "이전 광고는 사실과 달랐습니다"\n• 비용 사업자 부담\n\n과징금:\n• 매출액 기준\n• 최대 20억원\n• 매출 없으면 5억원 이하\n\n신고: 공정위 표시광고과 또는 1372\n\nAI가 온라인 광고를 24시간 모니터링하여 위반을 자동 탐지합니다.';
            } else if (userMessage.includes('기업결합') || userMessage.includes('M&A') || userMessage.includes('합병')) {
                response = '기업결합은 경쟁제한 효과가 있으면 금지되거나 조건부 승인됩니다.\n\n기업결합 심사 대상:\n• 자산·매출액 3천억원 이상\n• 상대회사 300억원 이상\n• 주식 취득, 합병, 영업양수 등\n\n심사 절차:\n1. 신고: 기업결합 30일 전\n2. 예비심사: 30일 (간이심사 15일)\n3. 본심사: 필요 시 90일\n4. 의결: 승인, 조건부 승인, 금지\n5. 이행: 시정조치 준수\n\n심사 기준:\n• 시장집중도: HHI 지수\n• 시장점유율 변화\n• 진입장벽\n• 효율성 증대 효과\n• 경쟁제한 가능성\n\n시정조치:\n• 사업 부문 매각\n• 특정 행위 금지\n• 기술 라이선스 제공\n• 공급좌석 유지 (항공)\n\n위반 시 제재:\n• 이행강제금: 일 5천만원\n• 과징금: 관련 매출액의 10% 이하\n• 형사처벌: 2년 이하 징역 또는 1억5천만원 이하 벌금\n\n간이심사 대상:\n• 시장점유율 합계 20% 미만\n• 수직·혼합결합\n\nAI가 시장 데이터를 분석하여 경쟁제한 효과를 자동 평가합니다.';
            } else if (userMessage.includes('독과점') || userMessage.includes('시장지배적')) {
                response = '시장지배적지위 남용은 독과점 사업자의 불공정한 행위를 규제합니다.\n\n시장지배적 사업자:\n• 시장점유율 50% 이상\n• 3개 사업자 75% 이상 (1위 10% 이상)\n• 공정위가 시장지배적 사업자로 지정\n\n남용 행위 유형:\n• 가격 남용: 부당하게 높은 가격\n• 출고 조절: 공급량 감소로 가격 인상\n• 부당 염매: 경쟁사 배제\n• 거래거절: 신규 사업자 진입 방해\n• 경쟁사업자 배제: 거래처 압박\n• 소비자 이익 저해\n\n위반 사례:\n• 포털: 검색 순위 조작\n• 플랫폼: 입점 업체 차별\n• 통신사: 경쟁사 회선 차단\n• 제약사: 복제약 시장 진입 방해\n\n조사·처분:\n1. 시장조사 (AI 가격 분석)\n2. 남용 행위 입증\n3. 시정명령\n4. 과징금: 관련 매출액의 최대 6%\n5. 형사고발: 악질적 위반\n\n과징금:\n• 최대 매출액의 6%\n• 반복 위반 시 가중\n\n시장구조 개선:\n• 진입규제 완화\n• 경쟁사 지원\n• 필수설비 공유 명령\n\nAI가 시장 데이터를 분석하여 남용 행위를 자동 탐지합니다.';
            } else {
                response = '공정거래위원회 AI 상담 서비스입니다.\n\n문의하실 수 있는 주제:\n• 불공정거래 신고\n• 담합(카르텔) 조사\n• 소비자 피해 구제\n• 하도급 불공정행위\n• 가맹사업 분쟁\n• 허위·과대광고\n• 기업결합 심사\n• 시장지배적지위 남용\n\n상담 전화:\n• 1372: 소비자상담센터 (24시간)\n\n구체적인 질문을 해주시면 더 자세한 안내를 드리겠습니다.';
            }
            
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsLoading(false);
        }, 1000);
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-700 to-amber-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">AI 상담 서비스</h2>
                <p className="text-orange-100 text-sm">
                    DeepSeek R1 모델 기반으로 공정거래 관련 질문에 답변합니다
                </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-4 ${
                                msg.role === 'user' 
                                    ? 'bg-orange-600 text-white' 
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
                                    <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                                    className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs hover:bg-orange-100 transition-colors"
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
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
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
                            구체적인 상담은 소비자상담센터(1372)로 문의하시기 바랍니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIChat = AIChat;
