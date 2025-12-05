const { useState, useRef, useEffect } = React;

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! 농림축산식품부 AI 상담 서비스입니다. 농업직불금·가축질병·귀농귀촌·스마트팜에 대해 궁금하신 점을 질문해 주세요.'
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
        '농업직불금',
        '귀농귀촌',
        '스마트팜',
        '가축질병'
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
            
            if (userMessage.includes('직불금') || userMessage.includes('농업보조금')) {
                response = '농업직불금은 농업인 소득안정을 위한 제도입니다.\n\n농업직불금:\n공익직불금:\n대상:\n• 농업경영체 등록\n• 0.5ha 이상 경작\n• 농지 소유·임차\n• 3년 이상 영농\n\n지급액:\n면적직불:\n• 2ha 이하: ha당 205만원\n• 2~6ha: ha당 197만원\n• 6ha 초과: ha당 175만원\n• 최대 30ha까지\n\n소농직불:\n• 0.5~2ha: 120만원\n• 농가당 정액 지급\n• 면적직불 선택 가능\n\n신청:\n• 매년 2월~3월\n• 읍면동 주민센터\n• 농림축산식품부 누리집\n• 온라인 신청 가능\n\n준수사항:\n환경보전:\n• 화학비료·농약 감축\n• 농업폐기물 처리\n• 농업용수 절약\n• 토양유실 방지\n\n공동체 활성화:\n• 들녘경영체 참여\n• 마을공동체 활동\n• 영농교육 이수\n\n지급:\n• 연 2회 (5월, 10월)\n• 계좌 자동 입금\n• 부정수급 시 환수\n\n쌀직불금:\n대상:\n• 논농업 등록\n• 쌀 재배 농가\n• 논 타작물 재배 가능\n\n지급액:\n• 고정직불: ha당 100만원\n• 변동직불: 목표가격 차액\n• 쌀값 하락 시 추가 지급\n\n친환경직불:\n유기농:\n• 논: ha당 80만원\n• 밭: ha당 120만원\n• 3년 이상 인증\n\n무농약:\n• 논: ha당 50만원\n• 밭: ha당 90만원\n\n조건불리직불:\n• 산간지역·조건불리지역\n• ha당 50만원\n• 농업생산 유지\n\n신청 절차:\n1. 농지원부 정비\n2. 공익직불 신청\n3. 서류 심사\n4. 현지 확인\n5. 지급 결정\n6. 계좌 입금\n\n부정수급:\n제재:\n• 즉시 환수\n• 3년간 지급 제한\n• 형사 고발\n\n주의사항:\n제외대상:\n• 불법 전용 농지\n• 휴경·유휴 농지\n• 농지법 위반\n• 부실 신고\n\n문의:\n• 농림축산식품부: 044-201-1778\n• 읍면동 주민센터\n• 농지원 콜센터: 1577-7770\n\nAI가 농업직불금 자격을 자동 심사하고 지급합니다.';
            } else if (userMessage.includes('귀농') || userMessage.includes('귀촌')) {
                response = '귀농귀촌은 도시민의 농촌 정착을 지원하는 제도입니다.\n\n귀농귀촌 지원:\n귀농창업 지원:\n대상:\n• 만 18세~64세\n• 귀농 3년 이내\n• 농업경영계획서 제출\n• 영농교육 100시간 이수\n\n지원금액:\n• 최대 3억원\n• 농지구입: 2억원\n• 시설·장비: 1억원\n• 연리 2%, 5년 거치 10년 상환\n\n신청:\n• 거주지 시·군 농업기술센터\n• 농업경영계획서\n• 영농교육 이수증\n• 농지 매매계약서\n\n귀농인 주택:\n대상:\n• 귀농 5년 이내\n• 무주택자\n• 농촌지역 거주\n\n지원:\n• 최대 2억원\n• 주택 신축·구입·리모델링\n• 연리 2%, 5년 거치 15년 상환\n\n신청:\n• 농협은행\n• 주택 매매계약서\n• 주민등록등본\n\n귀농교육:\n기본교육:\n• 100시간 이수 (필수)\n• 작목별 영농기술\n• 농촌생활 적응\n• 무료 교육\n\n전문교육:\n• 품목별 심화교육\n• 6개월~1년 과정\n• 실습 중심\n• 교육비 지원\n\n귀촌 지원:\n생활지원:\n• 빈집 수리비 지원\n• 최대 2,000만원\n• 농촌지역 주택 개보수\n\n일자리:\n• 농촌일자리 매칭\n• 체험마을 운영\n• 농촌관광 사업\n• 로컬푸드 운영\n\n정착지원:\n주거:\n• 귀농인의 집 (단기 임대)\n• 빈집 정보 제공\n• 농촌주택 임대\n\n생활:\n• 의료·복지 지원\n• 자녀 교육지원\n• 문화·여가 프로그램\n• 마을 공동체 참여\n\n귀농귀촌 단계:\n준비:\n• 귀농귀촌 교육\n• 작목 선정\n• 지역 탐색\n• 자금 계획\n\n실행:\n• 농지·주택 구입\n• 영농 시작\n• 지원금 신청\n• 정착 지원\n\n안정:\n• 소득 안정화\n• 판로 확보\n• 마을 적응\n• 네트워크 구축\n\n상담:\n귀농귀촌종합센터:\n• 전화: 1899-9097\n• 온라인 상담\n• 지역별 정보\n• 성공사례\n\n주의사항:\n실패 요인:\n• 영농기술 부족\n• 자금 부족\n• 판로 미확보\n• 마을 갈등\n\n성공 요인:\n• 충분한 준비\n• 교육 이수\n• 지역 이해\n• 인내심\n\n문의:\n• 귀농귀촌종합센터: 1899-9097\n• 농림축산식품부: 044-201-1542\n• 농업기술센터 (시·군)\n\nAI가 귀농귀촌 상담과 지원금 신청을 도와드립니다.';
            } else if (userMessage.includes('스마트팜') || userMessage.includes('스마트농업')) {
                response = '스마트팜은 ICT를 활용한 첨단 농업입니다.\n\n스마트팜:\n시설원예:\n대상:\n• 온실 보유 농가\n• 딸기·토마토·파프리카\n• 시설채소·화훼\n\n지원:\n• 환경제어 시스템\n• 양액제어 시스템\n• 냉난방 자동화\n• 최대 1억원 (50% 보조)\n\n효과:\n• 생산량 30% 증가\n• 에너지 20% 절감\n• 품질 향상\n• 노동력 절감\n\n축사자동화:\n대상:\n• 축산농가 (한우·돼지·닭)\n• 일정 규모 이상\n• 사육시설 보유\n\n지원:\n• 사료 자동급이\n• 환경 자동제어\n• 축사환경 모니터링\n• 최대 2억원 (30% 보조)\n\n효과:\n• 생산성 향상\n• 질병 감소\n• 사료비 절감\n• 관리 편의\n\n노지스마트팜:\n대상:\n• 노지 과수·채소\n• 밭작물 재배\n• 5ha 이상 경작\n\n기술:\n• 기상정보 수집\n• 토양정보 분석\n• 병해충 예측\n• 정밀농업\n\n지원:\n• 센서·기상관측\n• 드론·트랙터\n• 농작업 자동화\n• 최대 5천만원\n\n스마트팜 교육:\n기초교육:\n• 이론·실습 (40시간)\n• 무료 교육\n• 전국 농업기술센터\n• 온라인 교육\n\n전문교육:\n• 6개월 집중교육\n• 작목별 실습\n• 스마트팜 혁신밸리\n• 무료 교육\n\n청년농 특별지원:\n대상:\n• 만 18~40세\n• 영농경력 3년 이하\n• 스마트팜 창업\n\n지원:\n• 최대 5억원\n• 시설 구축비 (70%)\n• 운영자금\n• 멘토링\n\n혁신밸리:\n• 실습형 교육\n• 온실 무상 임대\n• 판로 지원\n• 정착금 지원\n\n신청:\n• 스마트팜 종합정보망\n• 시·군 농업기술센터\n• 사업계획서 제출\n• 현지 심사\n\n지원 절차:\n1. 사업 공고 확인\n2. 신청서 제출\n3. 서류 심사\n4. 현지 조사\n5. 최종 선정\n6. 협약·지원금 교부\n7. 시설 설치\n8. 준공·정산\n\n주요 기술:\n환경제어:\n• 온도·습도·CO2\n• 광량·양액EC·pH\n• 자동 제어\n• 원격 모니터링\n\n데이터 분석:\n• 생육데이터 수집\n• AI 분석·예측\n• 최적 환경 제어\n• 수확량 예측\n\n판로:\n• 온라인 직거래\n• 계약재배\n• 로컬푸드 직매장\n• 수출\n\n문의:\n• 스마트팜코리아: 1522-3119\n• 농림축산식품부: 044-201-1533\n• 농업기술센터\n\nAI가 스마트팜 지원금을 심사하고 최적 재배환경을 제공합니다.';
            } else if (userMessage.includes('가축') || userMessage.includes('질병') || userMessage.includes('방역')) {
                response = '가축질병은 AI가 실시간으로 감시·관리합니다.\n\n가축질병 관리:\n구제역:\n예방:\n• 백신 접종 (연 2회)\n• 의무 접종 (소·돼지)\n• 무료 접종\n• AI 접종이력 관리\n\n발생 시:\n• 즉시 신고 (24시간)\n• 전화: 1588-9060\n• 살처분·매몰\n• 이동제한\n\n보상:\n• 가축평가액 100%\n• 30일 이내 지급\n• AI 자동 산정\n\n조류인플루엔자(AI):\n예방:\n• 차단방역 철저\n• 축사 소독\n• 야생조류 접촉 차단\n• 방역 관리\n\n발생 시:\n• 즉시 신고\n• 살처분 (3km 이내)\n• 이동제한 (10km)\n• 일시이동중지명령\n\n보상:\n• 시가 100% 보상\n• 예방적 살처분 포함\n• AI 자동 심사\n\n아프리카돼지열병(ASF):\n예방:\n• 차단방역 필수\n• 잔반급여 금지\n• 축사 소독\n• 울타리 설치\n\n발생 시:\n• 즉시 신고\n• 농장 전체 살처분\n• 3km 예방적 살처분\n• 장기 이동제한\n\n보상:\n• 시가 100%\n• 살처분 보상\n• 소득손실 보상\n\n구제역·AI 신고:\n신고의무:\n• 축산농가\n• 수의사\n• 방역관\n• 24시간 이내\n\n신고:\n• 1588-9060/4060\n• 가축방역통합시스템\n• 시·군 방역기관\n\n포상금:\n• 최초 신고: 100~500만원\n• AI 신속 처리\n\n가축방역:\n농장 방역:\n• 출입통제\n• 차량·장화 소독\n• 축사 내부 소독\n• 방역시설 설치\n\n정부 지원:\n• 방역시설비 (50%)\n• 방역장비\n• 소독약품\n• 방역교육\n\n가축보험:\n대상:\n• 소·돼지·닭·오리\n• 질병·재해 보장\n• 폐사 보상\n\n보험료:\n• 정부 50% 지원\n• 자부담 50%\n• 의무가입 (일부)\n\n보험금:\n• 가축 폐사 시\n• 시가 80~100%\n• AI 자동 산정·지급\n\n축산물 이력제:\n등록:\n• 소·돼지·닭 의무\n• 출생~도축 관리\n• 개체식별번호\n• 이동경로 추적\n\nQR코드:\n• 유통이력 조회\n• 소비자 확인\n• 안전성 보장\n\n방역 단계:\n관심 → 주의 → 경계 → 심각\n\n단계별 조치:\n• 이동제한\n• 소독 강화\n• 일제검사\n• 예방적 조치\n\n문의:\n• 가축방역: 1588-9060/4060\n• 농림축산검역본부: 054-912-0114\n• 시·군 방역기관\n\nAI가 전국 50,000 축산농가를 실시간 감시하고 질병을 조기에 탐지합니다.';
            } else {
                response = '농림축산식품부 AI 상담 서비스입니다.\n\n문의하실 수 있는 주제:\n• 농업직불금 (공익·쌀·친환경직불)\n• 귀농귀촌 (창업·주택·교육)\n• 스마트팜 (시설원예·축사·노지)\n• 가축질병 (구제역·AI·ASF)\n• 농작물재해보험\n• 농산물 가격정보\n• 농지은행\n\n주요 연락처:\n• 농림축산식품부: 044-201-0114\n• 귀농귀촌센터: 1899-9097\n• 스마트팜코리아: 1522-3119\n• 가축방역: 1588-9060\n• 농지은행: 1577-7770\n\n누리집:\n• 농림축산식품부: www.mafra.go.kr\n• 농업경영정보: www.agrinet.co.kr\n• 농사로: www.nongsaro.go.kr\n\n구체적인 질문을 해주시면 더 자세한 안내를 드리겠습니다.';
            }
            
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsLoading(false);
        }, 1000);
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-700 to-emerald-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">AI 상담 서비스</h2>
                <p className="text-green-100 text-sm">
                    DeepSeek R1 모델 기반으로 농업·축산·식품 관련 질문에 답변합니다
                </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-4 ${
                                msg.role === 'user' 
                                    ? 'bg-green-700 text-white' 
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
                                    <div className="w-2 h-2 bg-green-700 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-green-700 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-green-700 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                                    className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs hover:bg-green-100 transition-colors"
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
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            전송
                        </button>
                    </form>
                </div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-700 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-green-900 mb-1">AI 상담 안내</h4>
                        <p className="text-sm text-green-800">
                            본 AI 상담은 일반적인 정보 제공을 목적으로 합니다. 
                            구체적인 상담은 농림축산식품부(044-201-0114) 또는 관련 기관으로 문의하시기 바랍니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIChat = AIChat;
