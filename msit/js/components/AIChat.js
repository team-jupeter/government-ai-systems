const { useState, useRef, useEffect } = React;

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! 과학기술정보통신부 AI 상담 서비스입니다. R&D·ICT·5G·정보보호·방송에 대해 궁금하신 점을 질문해 주세요.'
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
        'R&D 지원은?',
        '5G와 6G 차이는?',
        '사이버 보안은?',
        '연구비 신청은?'
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
            
            if (userMessage.includes('R&D') || userMessage.includes('연구') && userMessage.includes('지원')) {
                response = '국가R&D는 과학기술 발전을 위한 정부의 연구개발 지원입니다.\n\n2025년 R&D 예산:\n• 총 예산: 31조원\n• AI·반도체: 5조원\n• 바이오·헬스: 3.5조원\n• 우주·항공: 2조원\n• 탄소중립: 1.8조원\n• 기초연구: 2.2조원\n\n지원 분야:\n기초연구:\n• 개인연구: 연 2억원\n• 집단연구: 연 10억원\n• 중견연구: 연 5억원\n• SRC/ERC: 연 50억원\n\n원천기술:\n• 신약개발\n• AI 알고리즘\n• 양자컴퓨팅\n• 차세대 배터리\n\n신청 방법:\n1. NTIS 접속 (www.ntis.go.kr)\n2. 과제공고 확인\n3. 연구계획서 작성\n4. 온라인 제출\n5. 평가·선정\n\n평가 기준:\n• 연구목표 명확성: 30점\n• 연구방법 타당성: 30점\n• 연구자 역량: 20점\n• 연구 성과 기대: 20점\n\n연구비 사용:\n• 인건비: 50%\n• 장비·재료비: 30%\n• 출장·회의비: 10%\n• 간접비: 10%\n\n연구 관리:\n• 연차평가: 매년\n• 단계평가: 3년마다\n• 최종평가: 과제 종료 시\n\n성과 관리:\n• 논문발표 의무\n• 특허출원 장려\n• 기술이전 지원\n\n혜택:\n• 연구수당\n• 국제학회 지원\n• 장비공동이용\n\n문의:\n• 한국연구재단: 042-869-6114\n• NTIS: 1661-2805\n\nAI가 R&D 과제를 자동 평가하고 최적 배분을 제시합니다.';
            } else if (userMessage.includes('5G') || userMessage.includes('6G')) {
                response = '5G와 6G는 차세대 이동통신 기술입니다.\n\n5G (5세대):\n상용화: 2019년\n속도: 최대 20Gbps\n지연시간: 1ms\n동시접속: 100만대/km²\n\n특징:\n• 초고속: 4G의 20배\n• 초저지연: 실시간 제어\n• 초연결: IoT 대량 연결\n\n활용:\n• 자율주행차\n• 원격의료\n• 스마트공장\n• VR/AR\n\n국내 현황:\n• 가입자: 3,450만명\n• 보급률: 67%\n• 기지국: 32만개\n• 세계 1위 수준\n\n6G (6세대):\n목표 상용화: 2028~2030년\n속도: 최대 1Tbps (5G의 50배)\n지연시간: 0.1ms\n\n핵심 기술:\n• 테라헤르츠(THz) 통신\n• AI 네이티브\n• 홀로그램 통신\n• 공중·우주 통신\n\n특징:\n• 초실감: 홀로그램\n• 초정밀: cm급 위치\n• 초지능: AI 융합\n\n활용 전망:\n• 디지털트윈\n• 메타버스\n• 뇌-컴퓨터 인터페이스\n• 우주 인터넷\n\nR&D 투자:\n• 2025~2030년: 1.5조원\n• 핵심기술 12개 개발\n• 표준화 주도\n\n국제 협력:\n• 한-미 6G 공동연구\n• ITU 표준화 참여\n• 글로벌 특허 확보\n\n차이점:\n• 속도: 6G가 50배 빠름\n• 지연: 6G가 10배 짧음\n• 커버리지: 6G는 우주까지\n• 지능화: 6G는 AI 네이티브\n\nAI가 5G/6G 네트워크를 실시간 최적화합니다.';
            } else if (userMessage.includes('사이버') || userMessage.includes('보안') || userMessage.includes('정보보호')) {
                response = '사이버 보안은 정보자산을 보호하는 모든 활동입니다.\n\n국가 사이버안보:\n• 24시간 감시체계\n• 실시간 위협 탐지\n• 자동 차단 시스템\n\n주요 위협:\nDDoS 공격:\n• 대량 트래픽으로 마비\n• 초당 수백GB 공격\n• AI 자동 차단\n\n랜섬웨어:\n• 데이터 암호화\n• 금전 요구\n• 백업 필수\n\n피싱:\n• 가짜 사이트\n• 개인정보 탈취\n• 2차 인증 필수\n\nAPT 공격:\n• 지능형 지속 위협\n• 국가기관 표적\n• AI 탐지 필요\n\n보안 대책:\n개인:\n• 백신 최신 유지\n• 운영체제 업데이트\n• 강력한 비밀번호\n• 2단계 인증 설정\n• 의심 링크 클릭 금지\n\n기업:\n• 보안관제 24시간\n• 침입탐지시스템\n• 데이터 암호화\n• 정기 보안점검\n• 직원 보안교육\n\n정부 지원:\n중소기업:\n• 보안 컨설팅 무료\n• 보안장비 지원 70%\n• 보안인력 파견\n\n개인:\n• 백신 무료 배포\n• 보안교육 무료\n• 침해사고 신고센터\n\n신고:\n• 한국인터넷진흥원\n• 국번없이 118\n• 24시간 운영\n\n개인정보보호:\n• 최소 수집 원칙\n• 암호화 저장 의무\n• 유출 시 즉시 통보\n• 위반 시 과징금\n\n보안 인증:\n• ISMS: 정보보호관리체계\n• ISMS-P: 개인정보 포함\n• CC: 제품 보안성\n\n사이버 보험:\n• 해킹 피해 보상\n• 복구비용 지원\n• 손해배상 책임\n\nAI가 24시간 사이버 위협을 탐지하고 자동 차단합니다.';
            } else if (userMessage.includes('연구비') && userMessage.includes('신청')) {
                response = '연구비 신청은 NTIS를 통해 온라인으로 진행합니다.\n\n신청 절차:\n1단계: 공고 확인\n• NTIS 접속\n• 공고문 검색\n• 신청자격 확인\n• 지원분야 확인\n\n2단계: 준비\n• 연구계획서 작성\n• 참여연구원 구성\n• 예산계획 수립\n• 기관 승인 받기\n\n3단계: 제출\n• NTIS 로그인\n• 신청서 입력\n• 첨부파일 업로드\n• 기관장 승인\n\n4단계: 평가\n• 서류평가\n• 발표평가\n• 현장실사\n• 최종선정\n\n신청 자격:\n연구책임자:\n• 박사학위 소지자\n• 연구경력 3년 이상\n• 소속기관 재직자\n• 신용불량자 제외\n\n참여기관:\n• 대학\n• 정부출연연구소\n• 기업부설연구소\n• 중소기업\n\n필요 서류:\n• 연구계획서\n• 연구비 산출내역\n• 연구자 이력서\n• 참여동의서\n• 기관 추천서\n\n작성 요령:\n연구목표:\n• 구체적·측정 가능\n• 달성 가능한 목표\n• 기간 내 완료 가능\n\n연구내용:\n• 단계별 계획\n• 방법론 상세 기술\n• 예상 결과\n\n연구비:\n• 항목별 상세 산출\n• 근거 명확히 제시\n• 적정 규모\n\n평가 기준:\n• 연구목표 명확성: 30%\n• 연구방법 타당성: 30%\n• 연구자 역량: 20%\n• 기대효과: 20%\n\n선정 결과:\n• 신청 후 2~3개월\n• 이메일·문자 통보\n• NTIS 공지\n\n협약:\n• 선정 통보 후 1개월\n• 협약서 작성\n• 연구비 교부\n\n주의사항:\n• 중복 신청 불가\n• 허위 기재 시 제재\n• 마감시간 엄수\n\n문의:\n• NTIS: 1661-2805\n• 한국연구재단: 042-869-6114\n\nAI가 연구계획서를 자동 검토하고 개선점을 제시합니다.';
            } else if (userMessage.includes('방송') || userMessage.includes('OTT')) {
                response = '방송과 OTT는 영상콘텐츠를 전달하는 서비스입니다.\n\n방송 종류:\n지상파:\n• KBS, MBC, SBS\n• 무료 시청\n• 공익성 중시\n\n케이블:\n• 종합편성, 전문채널\n• 유료 가입\n• 다양한 장르\n\nIPTV:\n• 인터넷 기반\n• 양방향 서비스\n• VOD 제공\n\nOTT (Over-The-Top):\n넷플릭스:\n• 가입자 1,200만명\n• 오리지널 콘텐츠\n• 월 9,500~17,000원\n\n웨이브:\n• 국내 드라마 강점\n• 지상파 실시간\n• 월 7,900~13,900원\n\n티빙:\n• CJ ENM 콘텐츠\n• 예능 강점\n• 월 5,500~13,500원\n\n디즈니+:\n• 마블, 스타워즈\n• 가족 콘텐츠\n• 월 9,900원\n\n국내 현황:\n• OTT 가입자: 4,200만명\n• 시장규모: 2.5조원\n• 성장률: 연 15%\n\n정책:\n공정경쟁:\n• 망 사용료 합리화\n• 플랫폼 규제\n• 독과점 방지\n\n콘텐츠 육성:\n• 제작 지원금\n• 세제 혜택\n• 해외진출 지원\n\n이용자 보호:\n• 청소년 보호\n• 자동재생 규제\n• 환불규정\n\n미래 전망:\n• 글로벌 경쟁 심화\n• K-콘텐츠 강세\n• AI 추천 고도화\n• 인터랙티브 콘텐츠\n\n방송 신고:\n• 허위·과장 광고\n• 불법 콘텐츠\n• 방송통신심의위\n• 전화: 02-2179-2114\n\nAI가 시청자 취향을 분석하고 콘텐츠를 추천합니다.';
            } else {
                response = '과학기술정보통신부 AI 상담 서비스입니다.\n\n문의하실 수 있는 주제:\n• R&D 지원 및 신청\n• 5G/6G 이동통신\n• 사이버 보안·정보보호\n• 연구비 신청 방법\n• 방송·OTT 정책\n• 전파 관리\n• AI·반도체 정책\n• 과학기술인력 양성\n• 우정사업(우편)\n\n주요 연락처:\n• 대표: 044-202-4180\n• NTIS: 1661-2805\n• 사이버 신고: 118\n\n누리집: www.msit.go.kr\n\n구체적인 질문을 해주시면 더 자세한 안내를 드리겠습니다.';
            }
            
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsLoading(false);
        }, 1000);
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">AI 상담 서비스</h2>
                <p className="text-purple-100 text-sm">
                    DeepSeek R1 모델 기반으로 과학기술·ICT 관련 질문에 답변합니다
                </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-4 ${
                                msg.role === 'user' 
                                    ? 'bg-purple-600 text-white' 
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
                                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                                    className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs hover:bg-purple-100 transition-colors"
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
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            전송
                        </button>
                    </form>
                </div>
            </div>
            
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-purple-900 mb-1">AI 상담 안내</h4>
                        <p className="text-sm text-purple-800">
                            본 AI 상담은 일반적인 정보 제공을 목적으로 합니다. 
                            구체적인 상담은 과학기술정보통신부(044-202-4180)로 문의하시기 바랍니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIChat = AIChat;
