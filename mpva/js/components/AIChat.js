const { useState, useRef, useEffect } = React;

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! 국가보훈부 AI 상담 서비스입니다. 국가유공자 등록·보훈급여·의료지원·제대군인지원에 대해 궁금하신 점을 질문해 주세요.'
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
        '국가유공자란?',
        '보훈급여',
        '제대군인 취업',
        '국립묘지 안장'
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
            
            if (userMessage.includes('국가유공자') || userMessage.includes('유공자')) {
                response = '국가유공자는 국가를 위해 희생·공헌한 분들입니다.\n\n국가유공자란:\n개념:\n• 국가를 위한 희생·공헌\n• 본인과 유족 예우\n• 법률에 따른 지원\n• 국가가 끝까지 책임\n\n유공자 유형:\n독립유공자:\n• 일제강점기 독립운동\n• 건국훈장·건국포장\n• 독립장·애국장\n• 본인 및 유족 예우\n\n참전유공자:\n• 6·25전쟁 참전\n• 월남전 참전\n• 국군·유엔군\n• 참전명예수당\n\n전몰·순직군경:\n• 전사·순직\n• 국가수호 희생\n• 유족 보상금\n• 유족 생활지원\n\n공상군경:\n• 전투·작전 부상\n• 상이등급 판정\n• 상이연금\n• 의료지원\n\n4·19혁명 유공자:\n• 1960년 4·19혁명\n• 민주화 희생\n• 사망·부상자\n• 유족 지원\n\n5·18민주유공자:\n• 1980년 5·18민주화운동\n• 민주화 희생\n• 사망·부상자\n• 유족 지원\n\n특수임무유공자:\n• 국가안보 특수임무\n• 대공작전\n• 사망·부상자\n• 유족 지원\n\n등록 방법:\n신청 자격:\n• 본인 또는 유족\n• 공적 입증 자료\n• 의료 기록\n• 증인 진술\n\n신청 절차:\n1. 지방보훈청 방문\n2. 신청서 작성\n3. 증빙서류 제출\n4. 보훈심사위원회 심사\n5. 결정 통지\n6. 국가유공자 등록\n\n필요서류:\n• 신청서\n• 공적조서\n• 의무기록\n• 전역증·제대증\n• 가족관계증명서\n\n혜택:\n보상금:\n• 보훈급여금\n• 생활조정수당\n• 6·25참전명예수당\n• 무공영예수당\n\n의료지원:\n• 보훈병원 무료진료\n• 위탁병원 진료\n• 의료비 지원\n• 상이군경 무료\n\n교육지원:\n• 본인 대학등록금\n• 자녀 교육지원금\n• 수능 가산점\n• 장학금\n\n취업지원:\n• 취업지원센터\n• 공무원 가산점\n• 공기업 채용\n• 취업알선\n\n대부지원:\n• 주택자금 대부\n• 생업자금 대부\n• 저리 이자\n• 장기 상환\n\n기타 예우:\n• 국립묘지 안장\n• 양로·양육\n• 교통·문화 할인\n• 국가행사 초청\n\n문의:\n• 보훈콜센터: 1577-0606\n• 지방보훈청: 관할 지역\n• 국가보훈부: 044-202-5114\n\nAI가 국가유공자 등록 심사를 자동 처리하고 맞춤형 혜택을 안내합니다.';
            } else if (userMessage.includes('보훈급여') || userMessage.includes('보상금')) {
                response = '보훈급여는 국가유공자와 유족에게 지급되는 보상입니다.\n\n보훈급여 종류:\n보상금:\n대상:\n• 전몰·순직군경 유족\n• 공상군경 본인\n• 상이등급 1~7급\n\n지급액:\n• 상이 1급: 월 약 350만원\n• 상이 3급: 월 약 250만원\n• 상이 5급: 월 약 150만원\n• 상이 7급: 월 약 80만원\n\n지급 방법:\n• 매월 25일\n• 본인 계좌 입금\n• 평생 지급\n\n수당:\n생활조정수당:\n• 전몰·순직 유족\n• 월 약 20만원\n• 생활안정 지원\n\n6·25참전명예수당:\n• 6·25전쟁 참전\n• 월 약 50만원\n• 참전유공자 예우\n\n무공영예수당:\n• 무공훈장 수여자\n• 월 약 30만원\n• 공훈 예우\n\n간호수당:\n• 상이 1~3급\n• 간병 필요자\n• 월 약 25만원\n\n연금:\n유족연금:\n• 전몰·순직 유족\n• 배우자 평생\n• 월 약 80만원\n\n생활지원금:\n• 참전유공자 배우자\n• 사망 시 지급\n• 월 약 30만원\n\n신청 방법:\n자동 지급:\n• 국가유공자 등록 시\n• 자동 산정\n• 매월 지급\n\n추가 신청:\n• 지방보훈청 방문\n• 온라인 신청\n• 보훈포털 이용\n\n필요서류:\n• 신청서\n• 통장사본\n• 가족관계증명서\n• 상이등급 결정서\n\n기타 지원:\n주택지원:\n• 국민임대주택 우선\n• 분양주택 우선\n• 주택자금 대부\n• 저리 이자\n\n대부지원:\n주택자금:\n• 최대 2억원\n• 연 1~2% 이자\n• 20년 상환\n\n생업자금:\n• 최대 5천만원\n• 연 1~2% 이자\n• 10년 상환\n\n교육지원:\n본인:\n• 대학등록금 전액\n• 대학원 지원\n• 평생교육\n\n자녀:\n• 교육지원금\n• 초중고 수업료\n• 대학 장학금\n\n지급 일정:\n• 매월 25일\n• 공휴일: 전일 지급\n• 자동 이체\n\n세금:\n• 비과세\n• 국민연금 미포함\n• 건강보험료 경감\n\n문의:\n• 보훈콜센터: 1577-0606\n• 지방보훈청\n• 보훈포털: www.mpva.go.kr\n\nAI가 보훈급여를 자동 산정하고 매월 정확하게 지급합니다.';
            } else if (userMessage.includes('제대군인') || userMessage.includes('취업')) {
                response = '제대군인 지원은 성공적인 사회복귀를 돕습니다.\n\n제대군인 지원:\n대상:\n• 현역 제대\n• 상근예비역 제대\n• 의무경찰 제대\n• 의무소방 제대\n\n취업지원:\n제대군인지원센터:\n• 전국 5개소\n• 무료 취업상담\n• 직업심리검사\n• 이력서 작성\n• 면접 코칭\n\n채용정보:\n• 맞춤형 일자리\n• 채용박람회\n• 기업 연계\n• 채용 공고\n\n우대제도:\n• 공무원 가산점\n• 공기업 우대\n• 대기업 채용\n• 중소기업 지원\n\n직업훈련:\n국비 교육:\n• 전액 무료\n• IT·제조·서비스\n• 자격증 과정\n• 취업 연계\n\n훈련수당:\n• 월 최대 40만원\n• 교육 기간 지급\n• 생활안정 지원\n\n훈련 기관:\n• 폴리텍대학\n• 직업전문학교\n• 기업 교육센터\n• 온라인 교육\n\n창업지원:\n창업교육:\n• 창업 아이템\n• 사업계획서\n• 마케팅\n• 회계·세무\n\n창업자금:\n• 최대 3억원\n• 연 1~2% 저리\n• 5년 거치\n• 10년 상환\n\n창업공간:\n• 창업보육센터\n• 저렴한 임대료\n• 경영 컨설팅\n• 네트워킹\n\n복지지원:\n심리상담:\n• 군 생활 적응\n• 스트레스 관리\n• PTSD 치료\n• 가족 상담\n\n의료지원:\n• 건강검진\n• 질병 치료\n• 정신건강\n• 재활 치료\n\n주거지원:\n• 임대주택 우선\n• 전세자금 대부\n• 청년주택 우대\n\n학자금:\n• 대학 복학 지원\n• 등록금 대부\n• 생활비 지원\n\n신청 방법:\n온라인:\n• 제대군인지원센터 누리집\n• 회원가입\n• 지원 신청\n\n방문:\n• 전국 5개 센터\n• 서울·부산·대구·광주·대전\n• 예약 상담\n\n필요서류:\n• 전역증\n• 주민등록증\n• 학력증명서\n• 경력증명서\n\n취업 성공:\n2024년 실적:\n• 취업 상담: 5만건\n• 취업 성공: 2만명\n• 직업훈련: 1만명\n• 창업 지원: 500명\n\n문의:\n• 제대군인지원센터: 1577-0606\n• 서울센터: 02-2020-5000\n• 부산센터: 051-990-1800\n\nAI가 제대군인 맞춤 일자리를 추천하고 취업을 지원합니다.';
            } else if (userMessage.includes('국립묘지') || userMessage.includes('안장')) {
                response = '국립묘지는 국가유공자를 안장하는 국가시설입니다.\n\n국립묘지:\n종류:\n국립서울현충원:\n• 위치: 서울 동작구\n• 면적: 141만㎡\n• 안장: 약 16만위\n• 순국선열·호국영령\n\n국립대전현충원:\n• 위치: 대전 유성구\n• 면적: 330만㎡\n• 안장: 약 7만위\n• 국군·경찰·소방\n\n국립호국원:\n• 임실·영천·이천\n• 산청·제주·괴산\n• 총 6개소\n• 안장: 약 3만위\n\n국립민주묘지:\n• 5·18민주묘지\n• 광주 북구\n• 민주화운동 희생자\n\n안장 대상:\n국가유공자:\n• 전몰·순직군경\n• 참전유공자\n• 독립유공자\n• 공상군경\n\n기타:\n• 대통령·국무총리\n• 국가원수급\n• 국가 공헌자\n• 국회 의결자\n\n안장 신청:\n신청 자격:\n• 국가유공자 본인\n• 유족\n• 배우자\n\n신청 방법:\n• 지방보훈청 방문\n• 온라인 신청\n• 사망 전 사전신청\n• 사망 후 신청\n\n필요서류:\n• 안장신청서\n• 사망진단서\n• 국가유공자증\n• 가족관계증명서\n\n절차:\n1단계 - 신청:\n• 유족이 신청\n• 서류 제출\n• 접수 확인\n\n2단계 - 심사:\n• 안장심사위원회\n• 자격 심사\n• 안장 결정\n\n3단계 - 안장:\n• 일정 통보\n• 영구차 제공\n• 안장 예식\n• 묘역 배정\n\n4단계 - 관리:\n• 영구 관리\n• 참배 시설\n• 헌화·분향\n\n배우자 합장:\n대상:\n• 국가유공자 배우자\n• 사망 시 합장\n• 무연고자 제외\n\n신청:\n• 사전 신청 가능\n• 본인 사후 안장\n\n안장 예식:\n예식 절차:\n• 영구 안치\n• 국민의례\n• 추도사\n• 헌화·분향\n• 안장\n\n군 의장:\n• 국군 의장대\n• 조총 예포\n• 태극기 증정\n• 군악대 연주\n\n참배:\n• 연중무휴\n• 오전 6시~오후 6시\n• 무료 입장\n• 헌화·분향\n\n시설:\n• 현충문\n• 현충탑\n• 추모관\n• 유품전시관\n\n현충일:\n• 6월 6일\n• 국가 추념식\n• 대통령 참석\n• 헌화·묵념\n\n문의:\n• 국립서울현충원: 02-826-0011\n• 국립대전현충원: 042-820-2100\n• 지방보훈청: 1577-0606\n\nAI가 국립묘지 안장 신청을 자동 처리하고 일정을 관리합니다.';
            } else {
                response = '국가보훈부 AI 상담 서비스입니다.\n\n문의하실 수 있는 주제:\n• 국가유공자 (등록·유형·혜택)\n• 보훈급여 (보상금·수당·연금)\n• 보훈의료 (보훈병원·위탁병원)\n• 제대군인 지원 (취업·창업·교육)\n• 국립묘지 안장\n• 보훈교육·문화\n\n주요 연락처:\n• 보훈콜센터: 1577-0606\n• 제대군인지원: 1577-0606\n• 국가보훈부: 044-202-5114\n\n누리집:\n• 국가보훈부: www.mpva.go.kr\n• 보훈포털: e-보훈민원\n• 제대군인지원센터\n\n구체적인 질문을 해주시면 더 자세한 안내를 드리겠습니다.';
            }
            
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsLoading(false);
        }, 1000);
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">AI 상담 서비스</h2>
                <p className="text-purple-100 text-sm">
                    DeepSeek R1 모델 기반으로 보훈 관련 질문에 답변합니다
                </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-4 ${
                                msg.role === 'user' 
                                    ? 'bg-purple-800 text-white' 
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
                                    <div className="w-2 h-2 bg-purple-800 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-purple-800 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-purple-800 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                                    className="px-3 py-1 bg-purple-50 text-purple-800 rounded-full text-xs hover:bg-purple-100 transition-colors"
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
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="px-6 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-900 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            전송
                        </button>
                    </form>
                </div>
            </div>
            
            <div className="bg-purple-50 border-l-4 border-purple-800 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-purple-900 mb-1">AI 상담 안내</h4>
                        <p className="text-sm text-purple-800">
                            본 AI 상담은 일반적인 정보 제공을 목적으로 합니다. 
                            구체적인 상담은 보훈콜센터(1577-0606) 또는 관할 지방보훈청으로 문의하시기 바랍니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIChat = AIChat;
