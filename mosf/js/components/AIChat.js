const { useState, useRef, useEffect } = React;

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! 기획재정부 AI 상담 서비스입니다. 예산·세제·경제정책·공공기관에 대해 궁금하신 점을 질문해 주세요.'
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
        '예산은 어떻게 짜나요?',
        '세금 어디에 쓰이나요?',
        '국민참여예산이란?',
        '국채는 왜 발행하나요?'
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
            
            if (userMessage.includes('예산') && (userMessage.includes('편성') || userMessage.includes('짜'))) {
                response = '국가예산은 1년 동안 국가가 필요한 돈을 계획하고 지출하는 것입니다.\n\n예산 편성 과정:\n1단계 (3~4월):\n• 각 부처 예산요구서 작성\n• 중장기 재정전망\n• 예산편성지침 마련\n\n2단계 (5~8월):\n• 부처별 예산요구\n• 기획재정부 심사\n• 부처와 협의\n• 국무회의 의결\n\n3단계 (9월):\n• 국회 제출\n• 예산결산특별위원회 심사\n• 상임위원회 예비심사\n• 본회의 의결\n\n4단계 (12월):\n• 확정 예산 공표\n• 다음연도 1월 1일부터 집행\n\n2025년 예산:\n• 총지출: 677조원\n• 복지: 225조원 (33%)\n• 교육: 97조원 (14%)\n• 국방: 59조원 (9%)\n• 일반·지방행정: 88조원 (13%)\n• 산업·중소기업: 35조원 (5%)\n• 보건·환경: 27조원 (4%)\n• 문화·체육·관광: 9조원 (1%)\n• 기타: 137조원 (21%)\n\n예산 원칙:\n• 재정건전성: 균형재정 추구\n• 투명성: 국민 공개\n• 효율성: 낭비 방지\n• 공정성: 형평성 고려\n\nAI 활용:\n• 부처 예산요구 자동분석\n• 유사사업 중복 자동탐지\n• 재정성과 자동평가\n• 예산집행 실시간 모니터링\n\n국민참여:\n• 국민참여예산제도\n• 예산안 공개\n• 의견수렴\n\nAI가 예산편성 과정 전반을 자동화하고 최적화합니다.';
            } else if (userMessage.includes('세금') || userMessage.includes('세제')) {
                response = '세금은 국가 운영에 필요한 재원을 국민이 공동으로 부담하는 것입니다.\n\n주요 세금 종류:\n국세 (국가):\n• 소득세: 개인 소득\n• 법인세: 기업 이익\n• 부가가치세: 소비\n• 개별소비세: 사치품\n• 상속·증여세\n• 종합부동산세\n\n지방세 (지자체):\n• 취득세\n• 재산세\n• 자동차세\n• 주민세\n\n세금 사용처 (2025년):\n• 복지: 225조원 (33%)\n  - 기초연금, 생계급여\n  - 건강보험 지원\n  - 보육·돌봄\n• 교육: 97조원 (14%)\n  - 초·중·고 무상교육\n  - 대학 지원\n  - 장학금\n• 국방: 59조원 (9%)\n  - 국방력 강화\n  - 병사 급여\n• 인프라: 35조원 (5%)\n  - 도로·철도\n  - 항만·공항\n\n세제 개편:\n• 공평과세: 탈루 방지\n• 세부담 완화: 중산층 지원\n• 경제활력: 기업투자 촉진\n\n세금 혜택:\n• 근로장려금: 저소득 근로자\n• 자녀장려금: 저소득 가구\n• 세액공제: 의료비, 교육비\n• 연말정산: 소득공제\n\n납세자 권리:\n• 세무조사 사전통지\n• 이의신청\n• 심판청구\n• 소송 제기\n\n상담:\n• 국세청 126\n• 홈택스 www.hometax.go.kr\n\nAI가 세수를 예측하고 세제개편안을 자동 분석합니다.';
            } else if (userMessage.includes('국민참여예산')) {
                response = '국민참여예산은 국민이 직접 예산 편성 과정에 참여하는 제도입니다.\n\n참여 방법:\n1. 제안 (연중):\n• 기획재정부 누리집 접속\n• "국민참여예산" 메뉴\n• 사업 아이디어 제안\n• 누구나 참여 가능\n\n2. 심사 (8~9월):\n• 전문가 검토\n• 실현가능성 평가\n• 우선순위 선정\n\n3. 투표 (10월):\n• 최종 후보 공개\n• 온라인 투표\n• 국민이 직접 선택\n\n4. 반영 (12월):\n• 선정 사업 예산반영\n• 다음연도 집행\n\n제안 분야:\n• 일자리·창업\n• 복지·보건\n• 교육·문화\n• 안전·환경\n• 농림·해양\n• 산업·중소기업\n\n2024년 사례:\n• 청년창업 지원 확대\n• 어린이집 CCTV 의무화\n• 재난안전 강화\n• 농어촌 인프라 개선\n\n참여 효과:\n• 국민 의견 반영\n• 재정 민주주의\n• 정책 투명성\n• 국민 만족도 향상\n\n제안 요건:\n• 실현 가능성\n• 공공성\n• 효과성\n• 지속가능성\n\n제외 대상:\n• 특정 개인·단체 이익\n• 법령 위반\n• 실현 불가능\n\n우수 제안:\n• 장관 표창\n• 예산 우선 반영\n• 정책 실명제\n\n문의:\n• 기획재정부 044-215-2710\n• 누리집: www.moef.go.kr\n\nAI가 제안을 자동 분류하고 실현가능성을 분석합니다.';
            } else if (userMessage.includes('국채')) {
                response = '국채는 정부가 재정자금 조달을 위해 발행하는 채권입니다.\n\n국채 발행 이유:\n• 세수 부족 보전\n• SOC 투자 재원\n• 경기부양 재원\n• 국가채무 차환\n\n국채 종류:\n국고채:\n• 만기: 2~30년\n• 이자: 연 2회 지급\n• 용도: 일반재정\n\n외평채:\n• 만기: 3~10년\n• 통화: 달러화 등\n• 용도: 외환보유액\n\n통안채:\n• 한국은행 발행\n• 용도: 통화조절\n\n발행 절차:\n1. 발행계획 수립\n2. 시장 수요조사\n3. 입찰 공고\n4. 경쟁입찰\n5. 낙찰자 결정\n6. 국채 발행\n\n2025년 현황:\n• 국가채무: 1,168조원\n• GDP 대비: 50.0%\n• 이자부담: 35조원\n• 신규 발행: 180조원\n\n국제 비교:\n• 일본: 264%\n• 미국: 123%\n• 영국: 101%\n• 독일: 67%\n• 한국: 50%\n→ 한국은 건전한 수준\n\n재정건전성:\n• 재정준칙 운영\n• 국가채무 한도\n• 균형재정 추구\n• 세입 확충\n\n국채 투자:\n• 안정성: 국가 보증\n• 유동성: 매매 용이\n• 수익성: 이자 수령\n• 증권사·은행 매수\n\n금리 영향:\n• 국채금리↑ → 대출금리↑\n• 국채금리↓ → 대출금리↓\n• 경제 전반 영향\n\n국채 보유:\n• 은행: 45%\n• 보험: 25%\n• 연기금: 20%\n• 외국인: 10%\n\nAI가 국채 수요를 예측하고 최적 발행 시기를 제시합니다.';
            } else if (userMessage.includes('공공기관')) {
                response = '공공기관은 국가·지방자치단체가 설립·운영하는 기관입니다.\n\n공공기관 분류:\n공기업:\n• 시장형: 한국전력, 인천공항\n• 준시장형: 도로공사, 수자원공사\n• 총 36개\n\n준정부기관:\n• 기금관리형: 국민연금, 근로복지공단\n• 위탁집행형: 한국장학재단, 건강보험심사평가원\n• 총 95개\n\n기타공공기관:\n• 총 239개\n→ 전체 370개 기관\n\n지정 요건:\n• 정부 출자·출연\n• 정부 재정지원 50% 이상\n• 임원 임면 시 정부 관여\n\n관리 감독:\n• 경영목표 수립\n• 경영실적 평가\n• 예산·결산 승인\n• 감사 실시\n• 임원 임명 승인\n\n경영평가:\n등급:\n• S: 우수 (상위 10%)\n• A: 양호 (상위 30%)\n• B: 보통 (40%)\n• C: 미흡 (하위 20%)\n• D, E: 부진\n\n평가 결과:\n• 성과급 차등\n• 기관장 연임 고려\n• 개선과제 부여\n\n공공기관 채용:\n• NCS 기반\n• 블라인드 채용\n• 스펙 초월\n• 취업지원포털: www.alio.go.kr\n\n정보 공개:\n• ALIO 시스템\n• 경영정보 공개\n• 채용정보\n• 입찰정보\n• 재무제표\n\n주요 개혁:\n• 방만경영 혁파\n• 부채 감축\n• 일자리 창출\n• 사회적 가치\n\n공공기관 문의:\n• 기획재정부 공공정책국\n• 044-215-5210\n• ALIO: www.alio.go.kr\n\nAI가 370개 공공기관을 실시간 모니터링하고 경영을 평가합니다.';
            } else {
                response = '기획재정부 AI 상담 서비스입니다.\n\n문의하실 수 있는 주제:\n• 예산 편성 과정\n• 세금 종류와 사용처\n• 국민참여예산\n• 국채 발행\n• 공공기관 관리\n• 재정건전성\n• 경제정책\n• ODA(공적개발원조)\n• 세제 개편\n• 국유재산 관리\n\n주요 연락처:\n• 대표: 044-215-2114\n• 국민참여예산: 044-215-2710\n• 세제실: 044-215-4110\n\n누리집: www.moef.go.kr\n\n구체적인 질문을 해주시면 더 자세한 안내를 드리겠습니다.';
            }
            
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsLoading(false);
        }, 1000);
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">AI 상담 서비스</h2>
                <p className="text-blue-100 text-sm">
                    DeepSeek R1 모델 기반으로 재정·경제정책 관련 질문에 답변합니다
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
                            구체적인 상담은 기획재정부(044-215-2114)로 문의하시기 바랍니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIChat = AIChat;
