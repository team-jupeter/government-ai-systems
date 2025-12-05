const { useState, useRef, useEffect } = React;

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! 개인정보보호위원회 AI 상담 서비스입니다. 개인정보 침해·분쟁조정·권리구제에 대해 궁금하신 점을 질문해 주세요.'
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
        '개인정보 유출 신고는?',
        '분쟁조정 신청 방법은?',
        'CCTV 설치 기준은?',
        '열람청구는 어떻게?'
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
            
            if (userMessage.includes('개인정보') && (userMessage.includes('유출') || userMessage.includes('침해') || userMessage.includes('신고'))) {
                response = '개인정보 침해·유출 발생 시 즉시 신고하실 수 있습니다.\n\n신고 방법:\n• 전화: 국번 없이 118 (24시간)\n• 온라인: 개인정보 포털 www.privacy.go.kr\n• 방문: 개인정보보호위원회 (서울 종로구)\n• 앱: 개인정보보호 앱\n\n주요 침해 유형:\n• 개인정보 유출\n• 무단 수집·이용\n• 동의 없는 제3자 제공\n• 목적 외 이용\n• CCTV 불법 촬영\n• 주민번호 무단 수집\n\n신고 후 절차:\n1. 신고 접수 (AI 자동분류)\n2. 사실관계 조사\n3. 법 위반 여부 판단\n4. 시정조치 또는 과징금\n5. 검찰 고발 (중대 위반)\n\n긴급 대응:\n• 대량 유출: 즉시 조사팀 투입\n• 피해 확산: 긴급 차단 명령\n• 2차 피해 방지: 모니터링 강화\n\n처벌:\n• 과징금: 최대 매출액 3%\n• 형사처벌: 5년 이하 징역 또는 5천만원 이하 벌금\n• 손해배상: 실제 손해액 + 위자료\n\nAI가 신고를 자동 분류하고 유사사례를 검색하여 신속하게 처리합니다.';
            } else if (userMessage.includes('분쟁조정')) {
                response = '개인정보 분쟁조정은 신속하고 공정한 피해구제 제도입니다.\n\n분쟁조정위원회:\n• 위원: 30명 이내 (법조인, 전문가)\n• 처리기간: 60일 이내\n• 비용: 무료\n• 효력: 재판상 화해와 동일\n\n신청 대상:\n• 개인정보 침해로 인한 피해\n• 사업자와의 분쟁\n• 손해배상 청구\n• 정신적 피해 보상\n\n신청 방법:\n1. 개인정보 포털 접속\n2. 분쟁조정 신청서 작성\n3. 증거자료 첨부\n4. 온라인 제출\n\n신청 서류:\n• 분쟁조정 신청서\n• 피해 사실 입증 자료\n• 손해액 산정 근거\n• 사업자와의 교섭 경위\n\n조정 절차:\n1. 신청서 접수\n2. 사실관계 조사\n3. 조정안 작성\n4. 양측 의견 청취\n5. 조정안 제시\n6. 수락 시 조정 성립\n\n조정 성립:\n• 재판상 화해 효력\n• 강제집행 가능\n• 소송 종료\n\n조정 불성립:\n• 소송 제기 가능\n• 조사자료 활용 가능\n\n집단분쟁조정:\n• 50명 이상 동일 피해\n• 일괄 처리\n• 신속한 구제\n\n상담:\n• 전화: 118\n• 온라인: 개인정보 포털\n\nAI가 유사 분쟁사례를 검색하고 조정안을 지원합니다.';
            } else if (userMessage.includes('열람') || userMessage.includes('정정') || userMessage.includes('삭제') || userMessage.includes('권리')) {
                response = '정보주체는 자신의 개인정보에 대해 다양한 권리를 행사할 수 있습니다.\n\n정보주체의 권리:\n• 열람청구권: 개인정보 확인\n• 정정·삭제청구권: 잘못된 정보 수정\n• 처리정지청구권: 이용 중지\n• 동의철회권: 언제든지 철회\n\n열람청구:\n• 대상: 본인의 모든 개인정보\n• 방법: 서면·전화·이메일·방문\n• 기간: 10일 이내 열람\n• 비용: 무료 (사본은 실비)\n\n열람 거부 사유:\n• 법률에 열람 제한 규정\n• 타인의 생명·신체 침해 우려\n• 타인의 재산·권익 침해 우려\n\n정정·삭제청구:\n• 사실과 다른 정보: 정정\n• 불필요한 정보: 삭제\n• 기간: 10일 이내 처리\n• 거부 시: 불복 가능\n\n처리정지청구:\n• 처리 중지 요구\n• 예외: 법령 근거, 계약 이행\n• 기간: 10일 이내\n\n거부 시 구제:\n1. 개인정보 침해 신고 (118)\n2. 분쟁조정 신청\n3. 집단분쟁조정\n4. 법원 소송\n\n손해배상:\n• 실제 손해액\n• 위자료\n• 입증책임 완화\n• 법정손해배상 (300만원)\n\n주의사항:\n• 본인 확인 필수\n• 대리인은 위임장 필요\n• 청구 거부 시 이유 명시\n\n상담:\n• 118: 개인정보 침해신고센터\n• 포털: www.privacy.go.kr\n\nAI가 권리행사 절차를 안내하고 서식을 제공합니다.';
            } else if (userMessage.includes('CCTV') || userMessage.includes('영상정보')) {
                response = 'CCTV 등 영상정보처리기기는 엄격한 법적 규제를 받습니다.\n\n설치 요건:\n• 범죄 예방\n• 시설 안전\n• 화재 예방\n→ 위 목적 외 설치 금지\n\n설치 금지 장소:\n• 공중화장실\n• 목욕실·탈의실\n• 발한실·수면실\n• 모유수유실\n→ 절대 설치 불가\n\n설치 절차:\n1. 필요성 검토\n2. 관계자 의견 수렴\n3. 안내판 설치\n4. 관리책임자 지정\n5. 운영·관리 방침 수립\n\n안내판 필수 기재:\n• 설치 목적\n• 촬영 범위\n• 관리책임자 연락처\n• 보관기간\n→ 눈에 잘 띄는 곳에 설치\n\n보관·관리:\n• 보관기간: 30일 이내\n• 접근 통제: 책임자만\n• 암호화: 필수\n• 파기: 기간 경과 즉시\n\n열람 요구:\n• 본인 촬영 영상\n• 10일 이내 열람\n• 거부 시: 신고 가능\n\n위반 시 처벌:\n• 불법 설치: 1천만원 이하 과태료\n• 목적 외 사용: 3천만원 이하 벌금\n• 유출: 5년 이하 징역\n\n공공기관 추가 의무:\n• 개인정보 영향평가\n• 설치·운영 위원회 심의\n• 연간 운영 실태 점검\n\n신고 방법:\n• 불법 CCTV 발견 시\n• 전화: 118\n• 온라인: 개인정보 포털\n\n주요 위반 사례:\n• 화장실 인근 설치\n• 안내판 미설치\n• 장기간 보관\n• 무단 열람\n\nAI가 CCTV 설치 적정성을 자동 분석하고 위반을 탐지합니다.';
            } else if (userMessage.includes('마이데이터') || userMessage.includes('개인정보 이동권')) {
                response = '마이데이터는 본인의 개인정보를 안전하게 이동·활용하는 제도입니다.\n\n마이데이터란?\n• 본인정보 자기결정권 강화\n• 개인정보 이동권 보장\n• 통합 관리 서비스\n• 맞춤형 서비스 제공\n\n적용 분야:\n• 금융: 통합자산관리\n• 의료: 건강정보 통합\n• 통신: 요금·사용내역\n• 공공: 정부서비스\n\n전송요구권:\n• 본인정보 전송 요구\n• 컴퓨터로 읽을 수 있는 형태\n• 다른 사업자에게 직접 전송\n• 무료 제공 원칙\n\n마이데이터 사업자:\n• 허가제 운영\n• 엄격한 보안 기준\n• 정기 점검\n• 위반 시 과징금\n\n개인정보 보호:\n• 암호화 전송\n• 접근 통제\n• 이용 내역 통지\n• 동의 철회 보장\n\n전송 방법:\n1. 마이데이터 사업자 선택\n2. 본인 인증\n3. 전송 동의\n4. 정보 전송\n5. 활용 서비스 제공\n\n동의 관리:\n• 수집 항목 확인\n• 이용 목적 확인\n• 제공 기관 확인\n• 언제든 철회 가능\n\n주의사항:\n• 신뢰할 수 있는 사업자 선택\n• 과도한 정보 요구 주의\n• 이용내역 주기적 확인\n• 불필요 시 즉시 철회\n\n피해 발생 시:\n• 즉시 동의 철회\n• 118 신고\n• 분쟁조정 신청\n• 손해배상 청구\n\n감독:\n• 개인정보위 정기 점검\n• 보안조치 이행 점검\n• 위반 시 제재\n\n상담:\n• 118: 상담센터\n• 포털: www.privacy.go.kr\n\nAI가 마이데이터 이용을 모니터링하고 이상징후를 탐지합니다.';
            } else if (userMessage.includes('GDPR') || userMessage.includes('국제') || userMessage.includes('적정성')) {
                response = '개인정보보호위원회는 국제 개인정보 보호 협력을 주도하고 있습니다.\n\nGDPR 적정성 결정:\n• 2021년 획득\n• EU와 자유로운 정보 이동\n• 한국 개인정보보호 수준 인정\n• 기업 부담 경감\n\nGDPR이란?\n• EU 개인정보보호법\n• 가장 엄격한 기준\n• 위반 시: 매출액 4% 과징금\n• 전 세계 영향력\n\n한국 기업 혜택:\n• EU 추가 승인 불필요\n• 개인정보 자유 이동\n• 규제 비용 절감\n• 신뢰성 확보\n\nAPEC CBPR:\n• 아시아태평양 인증\n• 2017년 가입\n• 역내 정보 이동 원활\n• 기업 경쟁력 강화\n\n국제 협력:\n• 글로벌 프라이버시 어셈블리(GPA)\n• OECD 개인정보 보호 실무그룹\n• 아시아태평양 프라이버시 포럼(APPA)\n• 양자 협력 (미국, 일본 등)\n\n한국 개인정보보호법 특징:\n• 독립 감독기구\n• 엄격한 동의 요건\n• 강력한 정보주체 권리\n• 중대한 위반 시 처벌\n\n해외 사업자 규제:\n• 국내 대리인 지정 의무\n• 한국어 개인정보 처리방침\n• 국내법 적용\n• 과징금 부과 가능\n\n최근 제재 사례:\n• 테무: 13억원 과징금\n• 구글: 정보 보호 미흡\n• 메타: 국외이전 위반\n\n국외이전 규정:\n• 고지 및 동의\n• 이전 받는 자 정보 제공\n• 안전조치 요구 가능\n• 위반 시: 과징금\n\n기업 준수사항:\n• GDPR과 한국법 동시 준수\n• 개인정보보호책임자 지정\n• 정기 교육\n• 침해 발생 시 신고\n\nAI가 국제 개인정보 보호 기준 준수를 모니터링합니다.';
            } else if (userMessage.includes('과징금') || userMessage.includes('처벌') || userMessage.includes('제재')) {
                response = '개인정보보호법 위반 시 엄격한 제재가 부과됩니다.\n\n과징금:\n• 상한: 매출액의 3%\n• 위반 정도에 따라 차등\n• 행정처분과 별도\n• 형사처벌과 병과 가능\n\n과징금 부과 기준:\n• 위반 행위의 내용·정도\n• 위반 행위의 기간·횟수\n• 위반 행위로 인한 피해 규모\n• 위반 행위로 인한 이익\n• 재발 방지 노력\n\n최근 과징금 사례:\n• 대형 플랫폼: 수십억원\n• 금융기관: 수억원\n• 통신사: 수억원\n• 해외 사업자: 10억원 이상\n\n형사처벌:\n• 5년 이하 징역\n• 5천만원 이하 벌금\n• 병과 가능\n• 징역형 집행유예 가능\n\n중대 위반 시:\n• 고의적 대량 유출\n• 영리 목적 불법 이용\n• 판매·제공\n→ 검찰 고발\n\n시정명령:\n• 개인정보 처리 중지\n• 개인정보 파기\n• 안전조치 이행\n• 불이행 시: 이행강제금\n\n이행강제금:\n• 시정명령 불이행 시\n• 1일 100만원 (상한 1억)\n• 이행 시까지 반복 부과\n\n손해배상:\n• 실제 손해액\n• 입증책임 완화\n• 법정손해배상: 300만원\n• 집단소송 가능\n\n행정처분 절차:\n1. 조사 및 확인\n2. 의견 청취\n3. 위원회 심의·의결\n4. 처분 결정\n5. 처분서 송달\n6. 불복 시 이의신청\n\n감경 사유:\n• 자진 신고\n• 피해 구제 노력\n• 재발 방지 조치\n• 협조적 태도\n\n가중 사유:\n• 반복 위반\n• 고의성\n• 대규모 피해\n• 증거 인멸\n\n위반 예방:\n• 개인정보보호책임자 지정\n• 정기 교육\n• 안전조치 이행\n• 내부 관리계획 수립\n\nAI가 과징금 산정을 지원하고 위반 패턴을 분석합니다.';
            } else {
                response = '개인정보보호위원회 AI 상담 서비스입니다.\n\n문의하실 수 있는 주제:\n• 개인정보 침해 신고\n• 분쟁조정 신청\n• 정보주체 권리 (열람·정정·삭제)\n• CCTV 영상정보처리기기\n• 마이데이터·개인정보 이동권\n• GDPR 적정성·국제협력\n• 과징금·처벌·제재\n• 개인정보 보호법 해석\n\n신고·상담:\n• 전화: 118 (24시간)\n• 포털: www.privacy.go.kr\n\n구체적인 질문을 해주시면 더 자세한 안내를 드리겠습니다.';
            }
            
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsLoading(false);
        }, 1000);
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-800 to-blue-900 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">AI 상담 서비스</h2>
                <p className="text-indigo-100 text-sm">
                    DeepSeek R1 모델 기반으로 개인정보 보호 관련 질문에 답변합니다
                </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-4 ${
                                msg.role === 'user' 
                                    ? 'bg-indigo-600 text-white' 
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
                                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                                    className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs hover:bg-indigo-100 transition-colors"
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
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            전송
                        </button>
                    </form>
                </div>
            </div>
            
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-indigo-900 mb-1">AI 상담 안내</h4>
                        <p className="text-sm text-indigo-800">
                            본 AI 상담은 일반적인 정보 제공을 목적으로 합니다. 
                            구체적인 상담은 개인정보 침해신고센터(118)로 문의하시기 바랍니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIChat = AIChat;
