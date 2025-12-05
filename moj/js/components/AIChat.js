const { useState, useRef, useEffect } = React;

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! 법무부 AI 상담 서비스입니다. 법률구조·출입국·교정·보호관찰에 대해 궁금하신 점을 질문해 주세요.'
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
        '법률구조는?',
        '출입국 절차',
        '범죄피해자 지원',
        '보호관찰이란?'
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
            
            if (userMessage.includes('법률구조') || userMessage.includes('무료법률')) {
                response = '법률구조는 경제적 어려움으로 법률서비스를 받지 못하는 분들을 지원합니다.\n\n법률구조란:\n대상:\n• 국민기초생활수급자\n• 차상위계층\n• 한부모가족\n• 장애인\n• 국가유공자\n• 월 소득 420만원 이하\n\n지원 내용:\n무료 법률상담:\n• 민사·가사·형사\n• 전화·방문·온라인\n• 변호사 상담\n• 24시간 상담 가능\n\n소송대리:\n• 민사소송\n• 가사소송\n• 형사변호\n• 행정소송\n• 변호사 선임비 무료\n\n법률문서 작성:\n• 소장·답변서\n• 계약서 검토\n• 내용증명\n• 각종 신청서\n\n신청 방법:\n방문:\n• 대한법률구조공단\n• 전국 18개 지부\n• 58개 출장소\n• 신분증 지참\n\n온라인:\n• 대한법률구조공단 누리집\n• www.klac.or.kr\n• 회원가입\n• 신청서 작성\n\n전화:\n• 국번없이 132\n• 24시간 상담\n• 평일 야간·주말 운영\n\n구비서류:\n기본:\n• 신분증\n• 주민등록등본\n• 가족관계증명서\n• 소득증명(해당자)\n\n사건별:\n민사:\n• 계약서\n• 증거자료\n• 관련 서류\n\n가사:\n• 혼인관계증명서\n• 재산 관련 서류\n\n형사:\n• 고소장·고발장\n• 수사기록\n• 증거자료\n\n지원 절차:\n1단계 - 상담:\n• 전화·방문 상담\n• 사건 내용 확인\n• 지원 가능 여부 검토\n\n2단계 - 신청:\n• 신청서 작성\n• 서류 제출\n• 심사\n\n3단계 - 심사:\n• 자격 심사\n• 사건 타당성 검토\n• 승인·불승인 결정\n\n4단계 - 지원:\n• 변호사 배정\n• 소송 진행\n• 법률 서비스 제공\n\n비용:\n• 상담: 무료\n• 소송대리: 무료\n• 인지대·송달료: 본인 부담\n• 승소 시 일부 부담 가능\n\n지원 범위:\n민사:\n• 금전·부동산 분쟁\n• 손해배상\n• 계약 분쟁\n• 채권추심\n\n가사:\n• 이혼·양육권\n• 재산분할\n• 위자료\n• 친권·면접교섭\n\n형사:\n• 형사변호\n• 고소·고발\n• 피해자 변호\n\n제외:\n• 재산 5억원 초과\n• 영리 목적\n• 부당 소송\n• 국가 상대 소송(일부)\n\n문의:\n• 대한법률구조공단: 132\n• 법무부: 1301\n• 누리집: www.klac.or.kr\n\nAI가 법률구조 신청을 자동 접수하고 적격 심사를 지원합니다.';
            } else if (userMessage.includes('출입국') || userMessage.includes('비자') || userMessage.includes('여권')) {
                response = '출입국은 대한민국 출국·입국과 외국인 체류를 관리합니다.\n\n출입국 절차:\n출국:\n1. 공항 도착\n2. 항공사 체크인\n3. 출국심사 (여권 제시)\n4. 탑승\n\n자동출입국:\n• 사전 등록 필요\n• 안면인식·지문\n• 무인 게이트\n• 평균 8초\n\n입국:\n1. 도착\n2. 입국심사 (여권·입국신고서)\n3. 세관신고\n4. 수하물 수령\n\n비자(사증):\n무비자:\n• 관광 목적\n• 90일 이내\n• 112개국\n• 미국·일본·EU 등\n\n비자 필요:\n• 중국·러시아 등\n• 장기 체류\n• 취업·유학\n\n비자 종류:\n관광·방문:\n• 단기방문(C-3)\n• 90일 이내\n• 관광·친지방문\n\n취업:\n• 비전문취업(E-9)\n• 전문인력(E-1~7)\n• 회사 초청장 필요\n\n유학:\n• 유학(D-2)\n• 어학연수(D-4)\n• 입학허가서 필요\n\n동거:\n• 결혼이민(F-6)\n• 재외동포(F-4)\n• 영주(F-5)\n\n신청 방법:\n해외:\n• 주한대사관·영사관\n• 비자 신청\n• 서류 제출\n• 심사 후 발급\n\n국내:\n• 출입국관리사무소\n• 체류 연장\n• 비자 변경\n\n온라인:\n• 하이코리아(hikorea.go.kr)\n• 전자비자\n• 체류 연장 신청\n\n필요서류:\n기본:\n• 여권\n• 신청서\n• 사진\n• 수수료\n\n추가(목적별):\n취업:\n• 초청장\n• 고용계약서\n• 사업자등록증\n\n유학:\n• 입학허가서\n• 재정증명\n• 학력증명\n\n결혼:\n• 혼인관계증명서\n• 배우자 신분증\n\n외국인 등록:\n대상:\n• 90일 초과 체류\n• 장기체류 비자\n\n신청:\n• 입국 후 90일 이내\n• 출입국사무소 방문\n• 외국인등록증 발급\n\n불법체류:\n처벌:\n• 강제퇴거\n• 입국금지 1~10년\n• 벌금\n\n자진출국:\n• 출국명령\n• 과태료 감면\n• 재입국 가능\n\n귀화:\n조건:\n• 5년 이상 거주\n• 생계유지 능력\n• 품행 단정\n• 한국어 능력\n• 국민 기본소양\n\n절차:\n• 귀화 신청\n• 심사 (1~2년)\n• 국적 취득\n• 주민등록\n\n문의:\n• 출입국콜센터: 1345\n• 하이코리아: hikorea.go.kr\n• 출입국사무소\n\nAI가 출입국 심사를 자동 처리하고 비자 발급을 지원합니다.';
            } else if (userMessage.includes('범죄피해자') || userMessage.includes('피해자 지원')) {
                response = '범죄피해자 지원은 범죄로 피해를 입은 분들을 보호·지원합니다.\n\n범죄피해자 지원:\n대상:\n• 범죄로 피해 입은 자\n• 유족\n• 가족\n\n지원 내용:\n구조금:\n대상:\n• 사망\n• 중상해\n• 성폭력\n• 재산범죄\n\n금액:\n• 사망: 최대 3,000만원\n• 중상해: 최대 2,000만원\n• 성폭력: 최대 3,000만원\n\n신청:\n• 피해 발생 후 3년 이내\n• 범죄피해구조심의회\n• 구조금 신청서\n\n무료 법률지원:\n• 국선변호사 선임\n• 법률상담\n• 소송대리\n• 형사재판 참여 지원\n\n의료지원:\n• 치료비 지원\n• 병원비 감면\n• 심리치료\n• PTSD 치료\n\n생활지원:\n긴급:\n• 긴급 생계비\n• 주거 지원\n• 자녀 학비\n\n장기:\n• 직업훈련\n• 취업 지원\n• 창업 지원\n\n신청 방법:\n방문:\n• 검찰청\n• 경찰서\n• 스마일센터\n\n온라인:\n• 범죄피해자지원센터\n• 온라인 신청\n\n전화:\n• 국번없이 1577-1295\n• 24시간 상담\n\n필요서류:\n• 신청서\n• 진단서(상해)\n• 사망진단서(사망)\n• 수사기록\n• 증거자료\n\n지원 절차:\n1단계 - 신고:\n• 경찰 신고\n• 피해 사실 확인\n\n2단계 - 신청:\n• 구조금 신청\n• 서류 제출\n\n3단계 - 심의:\n• 범죄피해구조심의회\n• 피해 정도 확인\n• 지급액 결정\n\n4단계 - 지급:\n• 구조금 지급\n• 의료비 지원\n• 법률 지원\n\n스마일센터:\n• 전국 39개소\n• 성폭력·가정폭력 피해자\n• 원스톱 지원\n• 무료\n\n서비스:\n• 의료 지원\n• 법률 지원\n• 상담\n• 심리치료\n\n해바라기센터:\n• 전국 39개소\n• 성폭력 피해자\n• 24시간 운영\n\n국선변호사:\n대상:\n• 성폭력 피해자\n• 아동 피해자\n• 장애인 피해자\n• 저소득층\n\n지원:\n• 무료 변호\n• 재판 동행\n• 법률 자문\n\n피해자 권리:\n• 진술권\n• 열람·등사권\n• 재판 참여권\n• 의견 진술권\n• 배상명령 신청\n\n2차 피해 방지:\n• 신원 보호\n• 비공개 재판\n• 증인 보호\n• 영상 증언\n\n문의:\n• 범죄피해자지원센터: 1577-1295\n• 스마일센터: 1899-3075\n• 해바라기센터: 117\n\nAI가 범죄피해자 구조금 신청을 자동 접수하고 지원 절차를 안내합니다.';
            } else if (userMessage.includes('보호관찰')) {
                response = '보호관찰은 범죄자의 재범을 방지하고 사회복귀를 돕습니다.\n\n보호관찰이란:\n정의:\n• 형 집행 유예\n• 가석방\n• 소년범\n• 사회 내 처우\n\n목적:\n• 재범 방지\n• 사회복귀 지원\n• 피해자 보호\n\n대상:\n성인:\n• 집행유예자\n• 가석방자\n• 치료감호 가종료자\n• 성폭력·아동학대 범죄자\n\n소년:\n• 보호처분 1호\n• 4호·5호·6호\n• 임시조치\n\n보호관찰 기간:\n• 집행유예: 1~5년\n• 가석방: 남은 형기\n• 소년: 1~2년\n• 연장 가능\n\n준수사항:\n일반:\n• 주거 제한\n• 여행 신고\n• 정기 출석\n• 보고 의무\n\n특별:\n성폭력:\n• 성충동 치료\n• 취업 제한\n• 거주지 제한\n• 심야 외출 금지\n\n약물:\n• 약물검사\n• 치료 프로그램\n\n음주:\n• 금주 명령\n• 음주 측정\n\n전자감독:\n대상:\n• 성폭력 범죄\n• 미성년자 유괴\n• 살인\n• 강도\n\n방법:\n• 전자발찌 부착\n• GPS 위치 추적\n• 24시간 모니터링\n• 이탈 시 즉시 대응\n\n기간:\n• 최대 30년\n• 법원 판결\n\n위반 시:\n경고:\n• 1차: 경고장\n• 2차: 서면 경고\n\n불이행:\n• 법원 통보\n• 집행유예 취소\n• 수감\n\n전자발찌 훼손:\n• 형사 처벌\n• 징역 3년 이하\n\n프로그램:\n성폭력:\n• 인지행동 치료\n• 성충동 약물치료\n• 분노조절\n\n약물:\n• 해독 치료\n• 재활 프로그램\n• 회복 모임\n\n가정폭력:\n• 분노조절\n• 가족상담\n• 심리치료\n\n알코올:\n• 단주 교육\n• AA 모임\n• 심리상담\n\n지원:\n취업:\n• 직업훈련\n• 취업 알선\n• 창업 지원\n\n주거:\n• 거주지 지원\n• 임시 주거\n\n교육:\n• 학력 인정\n• 검정고시\n• 자격증 취득\n\n가족:\n• 가족상담\n• 관계 회복\n\n보호관찰소:\n• 전국 60개소\n• 본소 18개\n• 지소 42개\n\n업무:\n• 정기 면담\n• 생활 지도\n• 준수사항 확인\n• 프로그램 운영\n\n문의:\n• 법무부: 1301\n• 보호관찰소\n• 위치추적센터: 1588-0075\n\nAI가 보호관찰 대상자를 자동 관리하고 재범 위험도를 평가합니다.';
            } else {
                response = '법무부 AI 상담 서비스입니다.\n\n문의하실 수 있는 주제:\n• 법률구조 (무료 법률 지원)\n• 출입국 (비자·여권·귀화)\n• 범죄피해자 지원\n• 보호관찰·전자감독\n• 교정 (수형자 면회)\n• 국선변호인\n• 외국인 체류\n• 난민 신청\n\n주요 연락처:\n• 법무부: 1301\n• 법률구조: 132\n• 출입국: 1345\n• 범죄피해자: 1577-1295\n\n누리집:\n• 법무부: www.moj.go.kr\n• 법률구조: www.klac.or.kr\n• 하이코리아: hikorea.go.kr\n\n구체적인 질문을 해주시면 더 자세한 안내를 드리겠습니다.';
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
                    DeepSeek R1 모델 기반으로 법무행정 관련 질문에 답변합니다
                </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-4 ${
                                msg.role === 'user' 
                                    ? 'bg-blue-800 text-white' 
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
                                    <div className="w-2 h-2 bg-blue-800 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-blue-800 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-blue-800 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                                    className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-xs hover:bg-blue-100 transition-colors"
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
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="px-6 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            전송
                        </button>
                    </form>
                </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-700 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-blue-900 mb-1">AI 상담 안내</h4>
                        <p className="text-sm text-blue-800">
                            본 AI 상담은 일반적인 정보 제공을 목적으로 합니다. 
                            구체적인 상담은 법무부(1301) 또는 해당 기관으로 문의하시기 바랍니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIChat = AIChat;
