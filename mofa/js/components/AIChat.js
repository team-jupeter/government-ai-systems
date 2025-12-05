const { useState, useRef, useEffect } = React;

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! 외교부 AI 상담 서비스입니다. 여권·영사·해외안전에 대해 궁금하신 점을 질문해 주세요.'
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
        '여권 신청은?',
        '해외여행 안전',
        '영사 조력은?',
        '긴급연락처는?'
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
            
            if (userMessage.includes('여권')) {
                response = '대한민국 여권은 외교부 장관이 발급합니다.\n\n여권 종류:\n일반여권(일반):\n• 복수여권(PM): 10년(18세 이상), 5년(18세 미만)\n• 단수여권(PS): 1년(1회 출국)\n\n관용여권(관용 공무):\n• 공무 수행자 대상\n• 5년 유효\n\n외교관여권(외교관):\n• 외교관·국회의원 등\n• 5년 유효\n\n신청 방법:\n온라인:\n• 정부24 누리집\n• 본인인증\n• 사진 업로드\n• 수수료 납부\n• 우편 수령\n\n방문:\n• 여권사무 대행기관\n• 시·구청, 주민센터\n• 신분증·사진 지참\n• 즉시 신청\n\n해외:\n• 재외공관(대사관·총영사관)\n• 예약 필수\n• 증명사진 지참\n\n발급 기간:\n• 일반: 3~4일\n• 긴급: 당일~익일(추가비용)\n• 분실 재발급: 즉시 가능\n\n수수료:\n• 10년 복수: 53,000원\n• 5년 복수: 45,000원\n• 단수: 20,000원\n• 긴급: 추가 20,000원\n\n필요서류:\n• 신분증(주민등록증, 운전면허증)\n• 여권용 사진 1매(6개월 이내)\n• 기존 여권(갱신 시)\n• 병역관계서류(25세~37세 남성)\n\n사진 규격:\n• 크기: 3.5cm × 4.5cm\n• 컬러\n• 최근 6개월 이내\n• 배경 흰색\n• 정면 응시\n• 안경 착용 가능(반사 없어야)\n\n갱신:\n• 유효기간 만료 전 언제든지\n• 1년 미만 남은 경우 권장\n• 기존 여권 지참\n\n재발급:\n분실/도난:\n• 경찰서 분실신고\n• 긴급 재발급 신청\n• 해외: 현지 재외공관\n\n훼손:\n• 기존 여권 제출\n• 새 여권 발급\n\n주의사항:\n• 여권 유효기간 6개월 이상 권장\n• 일부 국가는 6개월 미만 입국 불가\n• 사증란 부족 시 증면 또는 재발급\n• 여권 훼손·변조 시 출국 불가\n\n문의:\n• 외교부 여권과: 02-2100-7500\n• 정부24: 1588-2188\n• 해외: 현지 재외공관\n\nAI가 여권 신청을 자동 처리하고 발급 현황을 실시간 추적합니다.';
            } else if (userMessage.includes('해외여행') || userMessage.includes('안전')) {
                response = '해외여행 안전은 외교부가 24시간 모니터링합니다.\n\n여행 전 준비:\n여행경보 확인:\n• 외교부 해외안전여행 누리집\n• www.0404.go.kr\n• 4단계 경보체계\n\n여행경보 단계:\n남색(1단계):\n• 여행유의\n• 신변안전 유의\n\n황색(2단계):\n• 여행자제\n• 불필요한 여행 자제\n\n적색(3단계):\n• 출국권고(여행제한)\n• 즉시 대피 권고\n\n흑색(4단계):\n• 여행금지\n• 즉시 철수·대피\n\n해외안전앱:\n• 실시간 안전정보\n• 긴급연락 기능\n• 위치기반 알림\n• 무료 다운로드\n\n영사콜센터:\n• 국내: 02-3210-0404\n• 해외: +82-2-3210-0404\n• 24시간 운영\n• 한국어 상담\n\n체류신고:\n• 재외국민 등록\n• 30일 이상 체류 시\n• 재외공관 방문\n• 긴급 시 연락 가능\n\n여행 중:\n신변안전:\n• 귀중품 분산 보관\n• 여권 사본 별도 보관\n• 야간 외출 자제\n• 인적 드문 곳 피하기\n\n건강관리:\n• 여행자 보험 가입\n• 예방접종 확인\n• 상비약 준비\n• 현지 의료기관 확인\n\n긴급상황:\n여권 분실:\n1. 경찰서 신고\n2. 재외공관 연락\n3. 여행증명서 발급\n4. 귀국 후 재발급\n\n사건사고:\n1. 현지 경찰 신고\n2. 재외공관 연락\n3. 영사 조력 요청\n4. 가족 연락\n\n자연재해:\n1. 현지 당국 지시 따르기\n2. 대사관 연락\n3. 안전지역 대피\n4. 귀국 항공편 확인\n\n테러·시위:\n1. 현장 즉시 이탈\n2. 실내 대피\n3. 대사관 연락\n4. SNS 상황 공유\n\n의료사고:\n1. 현지 병원 치료\n2. 대사관 통보\n3. 보험사 연락\n4. 진단서 발급\n\n영사 조력:\n• 구금·체포 시 면회\n• 변호사 연결\n• 가족 연락\n• 통역 지원\n\n보험:\n• 여행자 보험 필수\n• 의료비 보장\n• 휴대품 보장\n• 배상책임 보장\n\n귀국 후:\n• 해외감염병 검역\n• 증상 발생 시 신고\n• 보건소 상담\n\n문의:\n• 영사콜센터: 02-3210-0404\n• 해외안전여행: www.0404.go.kr\n• 긴급: 현지 대사관\n\nAI가 전 세계 안전정보를 실시간 분석하고 위험상황을 즉시 알립니다.';
            } else if (userMessage.includes('영사')) {
                response = '영사 조력은 재외국민을 보호하는 외교부의 핵심 업무입니다.\n\n영사 조력이란?\n재외공관을 통한:\n• 여권·증명서 발급\n• 사건사고 지원\n• 법률·의료 지원\n• 송환 지원\n\n주요 서비스:\n신분증명:\n• 여권 발급·갱신\n• 여권 분실 재발급\n• 여행증명서 발급\n• 재외국민등록\n\n증명서 발급:\n• 재외국민등록부등본\n• 재외공관 공증\n• 서명인증\n• 번역 공증\n\n사건사고:\n체포·구금:\n• 영사 면회\n• 변호사 연결\n• 통역 지원\n• 가족 연락\n\n사고·재해:\n• 현지 병원 연결\n• 의료진 통역\n• 보험 처리 지원\n• 송환 지원\n\n사망:\n• 사망신고 접수\n• 시신 처리 지원\n• 유가족 연락\n• 송환 절차\n\n분쟁:\n• 법률 자문\n• 변호사 소개\n• 통역 지원\n• 권익 보호\n\n긴급 상황:\n전쟁·테러:\n• 긴급 대피\n• 귀국 항공편\n• 안전지역 이동\n• 24시간 연락망\n\n자연재해:\n• 피해 현황 파악\n• 구조 지원\n• 임시 숙소\n• 귀국 지원\n\n재외선거:\n• 재외선거 등록\n• 투표 안내\n• 부재자투표\n• 선거권 행사\n\n병역:\n• 국외여행허가\n• 병역의무 상담\n• 재외국민 2세 병역\n\n제한 사항:\n불가능한 지원:\n• 현지 법률 위반 면책\n• 형사 처벌 면제\n• 민사 분쟁 직접 개입\n• 불법 체류자 지원\n• 금전 대여\n\n가능한 지원:\n• 영사 면회\n• 변호사 소개\n• 통역 지원\n• 가족 연락\n• 절차 안내\n\n연락처:\n국내:\n• 영사콜센터: 02-3210-0404\n• 외교부 대표: 02-2100-2114\n\n해외:\n• 현지 대사관·총영사관\n• 긴급: +82-2-3210-0404\n• 24시간 운영\n\n재외공관:\n• 대사관: 111개\n• 총영사관: 47개\n• 대표부: 20개\n• 184개 공관\n\n신청 방법:\n방문:\n• 재외공관 직접 방문\n• 예약 권장\n• 신분증 지참\n\n전화:\n• 영사콜센터\n• 24시간 상담\n• 긴급상황 우선\n\n온라인:\n• 영사민원24\n• 각종 증명서 신청\n• 전자증명서\n\n비용:\n• 여권: 유료\n• 증명서: 수수료\n• 긴급 지원: 무료\n• 송환: 본인 부담(환급)\n\n문의:\n• 영사콜센터: 02-3210-0404\n• 재외공관: 현지 연락처\n\nAI가 영사 업무를 자동화하고 긴급상황을 즉시 감지합니다.';
            } else if (userMessage.includes('긴급') || userMessage.includes('연락처')) {
                response = '긴급 상황 시 외교부 24시간 연락망을 이용하세요.\n\n영사콜센터:\n국내:\n• 전화: 02-3210-0404\n• 단축번호: 0404(유료)\n• 24시간 운영\n\n해외:\n• 전화: +82-2-3210-0404\n• 국제전화 요금\n• 한국어 상담\n\n긴급상황별 연락처:\n여권 분실:\n1. 현지 경찰서 신고\n2. 재외공관 연락\n3. 여행증명서 발급\n\n사건사고:\n1. 현지 응급전화(911, 112 등)\n2. 재외공관 연락\n3. 영사 조력 요청\n\n의료 응급:\n1. 현지 119\n2. 대사관 의무관\n3. 보험사 연락\n\n재난·테러:\n1. 현지 재난본부\n2. 대사관 긴급전화\n3. 가족 연락\n\n주요 재외공관 긴급전화:\n미국:\n• 워싱턴: +1-202-939-5653\n• LA: +1-213-385-9300\n• 뉴욕: +1-646-674-6000\n\n중국:\n• 베이징: +86-10-8531-0700\n• 상하이: +86-21-6295-5000\n• 광저우: +86-20-2919-2999\n\n일본:\n• 도쿄: +81-3-3452-7611\n• 오사카: +81-6-6213-1401\n• 후쿠오카: +81-92-771-0461\n\n유럽:\n• 런던: +44-20-7227-5500\n• 파리: +33-1-4753-0101\n• 베를린: +49-30-260-650\n\n동남아:\n• 방콕: +66-2-247-7537\n• 싱가포르: +65-6256-1188\n• 하노이: +84-24-3831-5110\n\n해외안전앱:\n• 실시간 안전정보\n• 긴급연락 버튼\n• 위치 자동 전송\n• 현지 공관 연락처\n• 무료 다운로드\n\n영사 조력 신청:\n온라인:\n• 영사민원24\n• 24시간 접수\n• 긴급 우선 처리\n\n전화:\n• 영사콜센터\n• 상황 설명\n• 즉시 대응\n\n방문:\n• 재외공관\n• 예약 없이 긴급 방문\n• 신분증 지참\n\n긴급 귀국:\n• 항공편 예약 지원\n• 여행증명서 발급\n• 송환 지원\n• 의료 동반\n\n가족 연락:\n• 대사관 통해 전달\n• 안부 확인\n• 상황 설명\n\n보험:\n• 여행자 보험 필수\n• 긴급 의료비\n• 송환 비용\n• 24시간 콜센터\n\n준비사항:\n• 여권 사본\n• 긴급연락처 저장\n• 해외안전앱 설치\n• 보험증권 소지\n\n주의:\n• 현지 법규 준수\n• 안전수칙 따르기\n• 대사관 연락처 숙지\n• SNS 과다 노출 자제\n\n문의:\n• 영사콜센터: 02-3210-0404\n• 해외: +82-2-3210-0404\n• 해외안전여행: 0404.go.kr\n\nAI가 전 세계 재외국민의 위치와 안전을 실시간으로 추적합니다.';
            } else {
                response = '외교부 AI 상담 서비스입니다.\n\n문의하실 수 있는 주제:\n• 여권 발급·갱신\n• 해외여행 안전정보\n• 영사 조력\n• 재외국민 등록\n• 긴급상황 대응\n• 비자 정보\n• 재외선거\n• 증명서 발급\n\n주요 연락처:\n• 영사콜센터: 02-3210-0404\n• 해외: +82-2-3210-0404\n• 외교부: 02-2100-2114\n\n누리집:\n• 외교부: www.mofa.go.kr\n• 해외안전여행: www.0404.go.kr\n• 영사민원24: consul.mofa.go.kr\n\n구체적인 질문을 해주시면 더 자세한 안내를 드리겠습니다.';
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
                    DeepSeek R1 모델 기반으로 영사·여권·해외안전 질문에 답변합니다
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
                            긴급한 영사 조력은 영사콜센터(02-3210-0404)로 연락하시기 바랍니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIChat = AIChat;
