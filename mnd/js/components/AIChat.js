const { useState, useRef, useEffect } = React;

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! 국방부 AI 상담 서비스입니다. 병역·예비군·국방정책에 대해 궁금하신 점을 질문해 주세요.'
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
        '병역의무는?',
        '예비군 훈련',
        '입영 절차',
        '병역 면제는?'
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
            
            if (userMessage.includes('병역') || userMessage.includes('징병') || userMessage.includes('의무')) {
                response = '대한민국 국민 남성은 병역의무를 이행해야 합니다.\n\n병역의무:\n대상:\n• 대한민국 국민 남성\n• 만 18세~35세\n• 신체·정신 건강자\n\n복무 구분:\n현역:\n• 육군: 18개월\n• 해군·해병대: 20개월\n• 공군: 21개월\n• 의무경찰·의무소방: 폐지\n\n보충역:\n• 사회복무요원: 21개월\n• 산업기능요원: 34개월\n• 전문연구요원: 36개월\n\n입영 절차:\n1단계 - 병역판정검사:\n• 만 19세 되는 해\n• 신체검사\n• 1급~7급 판정\n• 1~3급: 현역\n• 4급: 보충역\n• 5급: 제2국민역\n• 6~7급: 면제\n\n2단계 - 입영통지서:\n• 입영 2개월 전 발송\n• 입영일·장소 안내\n• 준비물 안내\n\n3단계 - 입영:\n• 지정일에 지정 장소\n• 신병교육대 입소\n• 5주 기초훈련\n\n4단계 - 자대배치:\n• 특기 교육\n• 실무 부대 배치\n• 복무 시작\n\n입영연기:\n가능 사유:\n• 대학 재학\n• 질병·심신장애\n• 가족 부양\n• 형사재판 중\n\n신청:\n• 병무청 방문·온라인\n• 증빙서류 제출\n• 최대 만 28세까지\n\n복무 중:\n휴가:\n• 정기휴가: 연 10일\n• 포상휴가: 5일\n• 외출·외박\n\n급여:\n• 병장: 월 68만원(2025년)\n• 2026년: 150만원 목표\n• 복무기간 중 인상\n\n전역 후:\n예비군:\n• 의무 편성\n• 연 1~3회 훈련\n• 8년간\n\n민방위:\n• 예비군 해제 후\n• 만 40세까지\n• 연 4시간 교육\n\n문의:\n• 병무청: 1588-9090\n• 국방부: 1577-9090\n• 병무청 누리집\n\nAI가 병역의무 이행 과정을 자동으로 관리하고 입영 절차를 안내합니다.';
            } else if (userMessage.includes('예비군')) {
                response = '예비군은 전역 후 유사시 동원되는 전시 전력입니다.\n\n예비군이란:\n대상:\n• 현역 전역자\n• 보충역 소집해제자\n• 편입 시기: 전역 즉시\n• 기간: 8년\n\n편성:\n지역예비군:\n• 거주지 인근 부대\n• 동원 1~6순위\n• 평상시 훈련\n\n직장예비군:\n• 직장 단위 편성\n• 직장에서 훈련\n• 회사 협조 필요\n\n훈련:\n연차별 훈련:\n• 1~2년차: 3박4일 동원훈련\n• 3~4년차: 2일 작계훈련\n• 5~6년차: 1일 향방훈련\n• 7~8년차: 면제 또는 1일\n\n훈련 내용:\n• 사격훈련\n• 화생방훈련\n• 체력단련\n• 전술훈련\n\n불참 시:\n• 1차: 경고\n• 2차: 5일 미만 소집\n• 3차: 형사처벌(벌금)\n• 정당사유 없으면 처벌\n\n훈련 면제:\n정당 사유:\n• 질병·부상\n• 재난·재해\n• 직계가족 사망\n• 해외 체류\n• 국가행사 참여\n\n신청:\n• 예비군훈련 관리 누리집\n• 증빙서류 제출\n• 사전 신고 필수\n\n훈련 연기:\n• 업무·학업 사유\n• 1회 연기 가능\n• 온라인 신청\n\n훈련 보상:\n• 훈련비: 1일 2만원\n• 교통비 지급\n• 중식 제공\n• 산재보험 적용\n\n동원:\n동원명령:\n• 국가비상시\n• 전시·사변\n• 즉시 소집\n• 거부 시 처벌\n\n동원부대:\n• 편성부대 복귀\n• 군 복무 재개\n• 전시임무 수행\n\n유의사항:\n• 주소 변경 시 신고\n• 직장 변경 시 신고\n• 해외여행 30일 초과 시 신고\n• 훈련통지서 미수령 시 확인\n\n문의:\n• 예비군 관리단\n• 동사무소\n• 예비군훈련 누리집\n• 국방부: 1577-9090\n\nAI가 예비군 훈련 일정을 자동 관리하고 통지서를 발송합니다.';
            } else if (userMessage.includes('입영') || userMessage.includes('입대')) {
                response = '입영은 군 복무를 시작하는 첫 단계입니다.\n\n입영 절차:\n1단계 - 입영통지서 수령:\n시기:\n• 입영 2개월 전\n• 등기우편 발송\n• 미수령 시 병무청 확인\n\n내용:\n• 입영일\n• 입영 장소\n• 준비물\n• 교통편\n\n2단계 - 준비:\n준비물:\n필수:\n• 주민등록증(신분증)\n• 입영통지서\n• 도장(인감)\n• 신분증 사본\n\n개인용품:\n• 속옷 3~4벌\n• 양말 3~4켤레\n• 세면도구\n• 수건\n• 안경(필요 시)\n\n금지물품:\n• 휴대전화(반납)\n• 현금 50만원 초과\n• 날카로운 물품\n• 술·담배\n\n3단계 - 입영일:\n출발:\n• 지정 시간 엄수\n• 가족 동반 가능\n• 대중교통 이용 권장\n\n도착:\n• 신분 확인\n• 짐 검사\n• 입소 수속\n• 가족 작별\n\n4단계 - 신병교육대:\n기간:\n• 5주(육군 기준)\n• 해군·공군: 유사\n\n교육 내용:\n1주차:\n• 적응 훈련\n• 군 생활 소개\n• 내무생활\n\n2~3주차:\n• 제식훈련\n• 총검술\n• 체력단련\n\n4~5주차:\n• 사격훈련\n• 수류탄\n• 행군훈련\n• 수료식\n\n5단계 - 자대배치:\n특기:\n• 특기 부여\n• 교육 이수\n• 실무 부대 배치\n\n복무:\n• 18~21개월\n• 휴가·외출·외박\n• 복무 완료 후 전역\n\n입영연기:\n사유:\n• 대학 재학·입학\n• 질병·심신장애\n• 가족 부양\n• 생업 곤란\n\n신청:\n• 병무청 방문·온라인\n• 증빙서류 제출\n• 승인 후 연기\n• 최대 만 28세\n\n입영 불참:\n정당사유:\n• 질병으로 입원\n• 가족 사망\n• 재난·사고\n• 사전 신고 필수\n\n정당사유 없음:\n• 형사처벌(3년 이하 징역)\n• 입영기피\n• 즉시 소집\n\n혜택:\n• 군 복무 중 급여\n• 전역 후 취업 가산점\n• 병역특례 (해당자)\n• 학업·자격증 지원\n\n문의:\n• 병무청: 1588-9090\n• 국방부: 1577-9090\n• 병무청 누리집\n• 입영부대 연락처\n\nAI가 입영 절차를 자동 안내하고 준비사항을 알려드립니다.';
            } else if (userMessage.includes('면제') || userMessage.includes('불합격')) {
                response = '병역 면제는 신체·정신적 사유로 복무가 불가능한 경우 적용됩니다.\n\n병역판정검사:\n등급:\n• 1~3급: 현역\n• 4급: 보충역\n• 5급: 제2국민역(전시 근로)\n• 6급: 면제(재검 대상)\n• 7급: 면제(확정)\n\n신체검사:\n항목:\n• 키·몸무게\n• 시력·청력\n• 혈압·심장\n• 정신건강\n• X-ray 검사\n\n정신건강:\n• 우울증\n• 불안장애\n• 조현병\n• PTSD\n• 전문의 진단 필요\n\n면제 사유:\n신체:\n• 중증 질병\n• 장애\n• 키 146cm 미만\n• 몸무게 과다·과소\n• 시력 극도 불량\n\n정신:\n• 정신질환\n• 지적장애\n• 성격장애\n• 약물중독\n\n재검:\n6급:\n• 2년 후 재검\n• 치료 후 재판정\n• 호전 시 4~5급 가능\n\n재신청:\n• 건강 악화 시\n• 추가 질병 발생\n• 재검 신청 가능\n\n보충역:\n4급:\n• 사회복무요원\n• 21개월\n• 공공기관 근무\n• 출퇴근 복무\n\n배치:\n• 관공서\n• 복지시설\n• 학교\n• 우체국\n\n제2국민역:\n5급:\n• 평시 복무 면제\n• 전시 근로 소집\n• 민방위 면제\n\n의무:\n• 전시 동원\n• 후방 지원\n• 생산 활동\n\n병역면제:\n6급 (재검):\n• 2년 후 재검\n• 호전 가능성\n\n7급 (확정):\n• 영구 면제\n• 재검 없음\n\n확정 사유:\n• 중증 장애\n• 불치병\n• 복무 불가능\n\n이의신청:\n불복:\n• 판정 불만 시\n• 30일 내 신청\n• 재검사\n• 재판정\n\n구비서류:\n• 진단서\n• 의무기록\n• 검사 결과\n\n문의:\n• 병무청: 1588-9090\n• 지방병무청\n• 병무청 누리집\n\nAI가 병역판정검사 결과를 자동 분석하고 등급을 안내합니다.';
            } else {
                response = '국방부 AI 상담 서비스입니다.\n\n문의하실 수 있는 주제:\n• 병역의무 (입영·복무)\n• 예비군 훈련\n• 병역판정검사\n• 입영연기\n• 병역 면제\n• 보충역\n• 국방정책\n• 군 복무 혜택\n\n주요 연락처:\n• 병무청: 1588-9090\n• 국방부: 1577-9090\n• 국방콜센터: 1577-9090\n\n누리집:\n• 국방부: www.mnd.go.kr\n• 병무청: www.mma.go.kr\n\n구체적인 질문을 해주시면 더 자세한 안내를 드리겠습니다.';
            }
            
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsLoading(false);
        }, 1000);
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-800 to-green-900 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">AI 상담 서비스</h2>
                <p className="text-green-100 text-sm">
                    DeepSeek R1 모델 기반으로 병역·국방정책 관련 질문에 답변합니다
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
                                    className="px-3 py-1 bg-green-50 text-green-800 rounded-full text-xs hover:bg-green-100 transition-colors"
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
            
            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-green-900 mb-1">AI 상담 안내</h4>
                        <p className="text-sm text-green-800">
                            본 AI 상담은 일반적인 정보 제공을 목적으로 합니다. 
                            구체적인 상담은 병무청(1588-9090) 또는 국방콜센터(1577-9090)로 문의하시기 바랍니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIChat = AIChat;
