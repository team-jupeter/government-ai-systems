const { useState, useRef, useEffect } = React;

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! 행정안전부 AI 상담 서비스입니다. 정부24·재난안전·지방자치·전자정부에 대해 궁금하신 점을 질문해 주세요.'
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
        '정부24는?',
        '재난안전 신고',
        '민방위 훈련',
        '주민등록증 발급'
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
            
            if (userMessage.includes('정부24') || userMessage.includes('민원')) {
                response = '정부24는 정부 민원을 온라인으로 처리하는 통합 전자정부 서비스입니다.\n\n정부24란:\n개요:\n• 전자정부 통합 포털\n• 5,000여개 민원 처리\n• 24시간 서비스\n• PC·모바일 접속\n\n주요 서비스:\n증명서 발급:\n• 주민등록등본·초본\n• 가족관계증명서\n• 건축물대장\n• 토지대장\n• 차량등록증\n• 무료 즉시 발급\n\n민원 신청:\n• 각종 인허가\n• 보조금 신청\n• 복지 신청\n• 사업자등록\n\n생활정보:\n• 정부 정책\n• 생활정보\n• 법령·제도\n• 정부혜택\n\n이용 방법:\n회원가입:\n• 공동인증서\n• 간편인증(카카오 등)\n• 휴대폰 인증\n• 금융인증서\n\n민원 신청:\n1. 정부24 접속\n2. 민원 검색\n3. 신청서 작성\n4. 제출\n5. 처리 결과 확인\n\n증명서 발급:\n1. 로그인\n2. 증명서 선택\n3. 발급 신청\n4. PDF 다운로드\n5. 인쇄 또는 제출\n\n주요 민원:\n주민등록:\n• 전입신고\n• 세대 분리\n• 주민등록 재발급\n• 온라인 신청 가능\n\n차량:\n• 자동차 등록\n• 이전등록\n• 폐차\n• 번호판 재발급\n\n사업:\n• 사업자등록\n• 법인설립\n• 각종 인허가\n• 온라인 처리\n\n복지:\n• 기초생활수급\n• 장애인 복지\n• 노인 복지\n• 아동 수당\n\n모바일 앱:\n정부24 앱:\n• iOS·안드로드\n• 모바일 신분증\n• Push 알림\n• 민원 조회\n\n기능:\n• 증명서 발급\n• 민원 신청\n• 민원 진행상황\n• QR 코드 제출\n\n혜택:\n• 무료 이용\n• 24시간 서비스\n• 방문 불필요\n• 우편 발송 가능\n\n수수료:\n• 대부분 무료\n• 일부 유료(등기 등)\n• 방문보다 저렴\n\n처리 기간:\n• 즉시: 증명서\n• 3일: 간단 민원\n• 7~14일: 복잡 민원\n• 실시간 조회 가능\n\n고객센터:\n• 국번없이 110\n• 24시간 상담\n• 챗봇 상담\n• 이메일 문의\n\n문의:\n• 정부민원안내: 110\n• 정부24: www.gov.kr\n• 앱: 정부24 다운로드\n\nAI가 정부24 민원을 자동 처리하고 증명서를 즉시 발급합니다.';
            } else if (userMessage.includes('재난') || userMessage.includes('안전신고')) {
                response = '재난안전 신고는 생활 속 안전 위험요소를 신고하는 시스템입니다.\n\n안전신고:\n안전신고란:\n• 생활 속 안전 위험\n• 재난 징후\n• 시설물 위험\n• 국민 누구나 신고\n\n신고 방법:\n안전신고 앱:\n• 스마트폰 앱 설치\n• 사진·동영상 촬영\n• 위치 자동 기록\n• 실시간 접수\n\n전화 신고:\n• 국번없이 119\n• 재난안전상황실\n• 24시간 접수\n\n온라인:\n• 안전신문고 누리집\n• 생활불편신고\n• PC 접속 가능\n\n신고 대상:\n시설물:\n• 도로 파손\n• 인도 파손\n• 가로등 고장\n• 보안등 고장\n• 맨홀 파손\n\n교통:\n• 불법주차\n• 신호등 고장\n• 교통표지판 파손\n• 횡단보도 훼손\n\n환경:\n• 쓰레기 무단투기\n• 불법광고물\n• 소음·악취\n• 하천 오염\n\n재난:\n• 산사태 위험\n• 붕괴 위험\n• 화재 위험\n• 침수 위험\n\n범죄:\n• 범죄 예방\n• CCTV 사각지대\n• 어두운 골목\n\n처리 절차:\n1단계 - 신고:\n• 앱·전화·온라인\n• 사진 첨부\n• 위치 정보\n\n2단계 - 접수:\n• 자동 분류\n• 관할 기관 전달\n• SMS 접수 확인\n\n3단계 - 처리:\n• 현장 확인\n• 조치 이행\n• 처리 결과 통보\n\n4단계 - 완료:\n• 조치 완료\n• 사진 등록\n• 신고자 확인\n\n포상:\n우수 신고:\n• 포상금 지급\n• 최대 50만원\n• 안전문화 확산\n\n기준:\n• 위험 제거 기여\n• 사고 예방\n• 적극적 신고\n\n재난문자:\nCBS:\n• 긴급재난문자\n• 전국민 발송\n• 지역별 발송\n• 재난 발생 시\n\n내용:\n• 지진\n• 호우·태풍\n• 폭설·한파\n• 산불\n• 대형사고\n\n대피:\n• 대피 방법\n• 대피 장소\n• 행동 요령\n\n재난안전 앱:\n안전디딤돌:\n• 재난정보\n• 대피소 위치\n• 기상특보\n• 행동요령\n\nKT 재난안전:\n• 실시간 재난정보\n• 위치기반 알림\n\n생활안전지도:\n• 범죄 위험지도\n• 안전 등급\n• 안전시설\n\n문의:\n• 재난신고: 119\n• 안전신문고: 110\n• 행안부: 044-205-1234\n\nAI가 재난안전 신고를 자동 접수하고 관할 기관에 즉시 전달합니다.';
            } else if (userMessage.includes('민방위')) {
                response = '민방위는 전시·재난 대비 국민 방호 조직입니다.\n\n민방위란:\n목적:\n• 전시 국민 보호\n• 재난 대응\n• 피해 최소화\n• 응급 복구\n\n대상:\n편성:\n• 만 20~40세 남성\n• 지역·직장 단위\n• 예비군 제대자\n• 의무 편성\n\n면제:\n• 현역·예비군\n• 신체·정신 장애\n• 해외 장기체류\n• 전문직 일부\n\n민방위 훈련:\n연차별 훈련:\n1~4년차:\n• 연 4시간 집합교육\n• 연 1회 실시\n• 화생방·응급처치\n• 필수 참석\n\n5년차 이후:\n• 비상소집 훈련\n• 연 1회 1시간\n• 점호·교육\n\n훈련 내용:\n기본 교육:\n• 전시 행동요령\n• 대피 요령\n• 응급처치\n• 심폐소생술\n\n화생방:\n• 방독면 착용\n• 제독 요령\n• 오염지역 통과\n\n소화:\n• 소화기 사용\n• 초기 진화\n• 화재 대피\n\n불참 시:\n과태료:\n• 1차: 5만원\n• 2차: 10만원\n• 3차: 20만원\n• 불출석 시 부과\n\n정당 사유:\n• 질병·부상\n• 해외 출장\n• 재난·사고\n• 사전 신고 필수\n\n훈련 통지:\n• SMS 문자\n• 우편\n• 직장 공문\n• 2주 전 통지\n\n민방위 조직:\n지역민방위:\n• 읍·면·동 단위\n• 거주지 편성\n• 평상시 대기\n\n직장민방위:\n• 사업장 단위\n• 300명 이상\n• 자체 편성\n\n임무:\n평시:\n• 재난 대응\n• 화재 진압\n• 인명 구조\n• 응급 복구\n\n전시:\n• 주민 대피\n• 경보 전파\n• 등화관제\n• 교통통제\n• 응급 복구\n\n민방위 대피:\n대피소:\n• 전국 17,000개\n• 지하철역\n• 공공건물 지하\n• 아파트 지하주차장\n\n대피 요령:\n공습경보:\n• 즉시 대피\n• 지하 대피소\n• 문·창문 차폐\n• 라디오 청취\n\n화생방:\n• 방독면 착용\n• 실내 대피\n• 환기구 차폐\n• 제독 준비\n\n훈련 일정:\n• 연 1회\n• 3~11월 중\n• 평일 오후\n• 사전 통지\n\n문의:\n• 읍·면·동 주민센터\n• 시·군·구청\n• 행안부: 044-205-4312\n\nAI가 민방위 훈련 일정을 자동 관리하고 통지서를 발송합니다.';
            } else if (userMessage.includes('주민등록') || userMessage.includes('신분증')) {
                response = '주민등록증은 대한민국 국민의 신분증입니다.\n\n주민등록증:\n발급 대상:\n• 만 17세 이상\n• 대한민국 국민\n• 주민등록 된 자\n\n신청 방법:\n방문 신청:\n• 주민센터 방문\n• 신분확인\n• 사진 촬영\n• 지문 채취\n• 전자서명\n\n온라인 예약:\n• 정부24 접속\n• 방문 예약\n• 대기 시간 단축\n\n필요서류:\n• 신청서(주민센터 비치)\n• 사진 1매(주민센터 촬영)\n• 수수료 5,000원\n\n재발급:\n사유:\n• 분실·훼손\n• 주소 변경\n• 이름 변경\n• 사진 재촬영\n\n신청:\n• 주민센터 방문\n• 온라인 불가\n• 본인 직접 방문\n\n비용:\n• 최초: 5,000원\n• 재발급: 5,000원\n• 분실(3회 이상): 추가 비용\n\n발급 기간:\n• 신청 즉시 발급\n• 재발급: 2~3주\n• 긴급: 당일 가능\n\n주민등록 전입신고:\n의무:\n• 이사 후 14일 이내\n• 과태료 부과\n• 최대 5만원\n\n방법:\n방문:\n• 새 주소지 주민센터\n• 신분증 지참\n• 임대차계약서\n\n온라인:\n• 정부24 접속\n• 전자신고\n• 공동인증서\n• 즉시 처리\n\n확정일자:\n• 임대차 보호\n• 전입신고와 동시\n• 무료\n\n주민등록등본·초본:\n차이:\n등본:\n• 세대 전체\n• 세대주·세대원\n• 주소·전입일\n\n초본:\n• 개인\n• 주소 변동 이력\n• 과거 주소\n\n발급:\n온라인:\n• 정부24\n• 무료 즉시 발급\n• PDF 다운로드\n\n방문:\n• 주민센터\n• 무인발급기\n• 수수료 무료\n\n모바일 신분증:\n모바일 운전면허증:\n• 정부24 앱\n• QR코드\n• 신분 확인\n• 법적 효력\n\n기능:\n• 본인 확인\n• 은행·관공서\n• 면세점\n• 편의점(연령 확인)\n\n전자증명서:\n• 블록체인 기반\n• 위변조 불가\n• 즉시 확인\n\n문의:\n• 주민센터\n• 정부24: 110\n• 행안부: 044-205-3438\n\nAI가 주민등록 업무를 자동 처리하고 증명서를 즉시 발급합니다.';
            } else {
                response = '행정안전부 AI 상담 서비스입니다.\n\n문의하실 수 있는 주제:\n• 정부24 (민원·증명서)\n• 재난안전 (신고·대피)\n• 민방위 훈련\n• 주민등록 (전입·증명서)\n• 전자정부 서비스\n• 지방자치 제도\n• 안전신문고\n• 생활불편 신고\n\n주요 연락처:\n• 정부민원안내: 110\n• 재난신고: 119\n• 행안부: 044-205-1234\n\n누리집:\n• 행안부: www.mois.go.kr\n• 정부24: www.gov.kr\n• 안전신문고: www.safepeople.go.kr\n\n구체적인 질문을 해주시면 더 자세한 안내를 드리겠습니다.';
            }
            
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsLoading(false);
        }, 1000);
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-700 to-orange-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">AI 상담 서비스</h2>
                <p className="text-red-100 text-sm">
                    DeepSeek R1 모델 기반으로 행정안전 관련 질문에 답변합니다
                </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-4 ${
                                msg.role === 'user' 
                                    ? 'bg-red-700 text-white' 
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
                                    <div className="w-2 h-2 bg-red-700 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-red-700 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-red-700 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                                    className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs hover:bg-red-100 transition-colors"
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
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="px-6 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            전송
                        </button>
                    </form>
                </div>
            </div>
            
            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-red-900 mb-1">AI 상담 안내</h4>
                        <p className="text-sm text-red-800">
                            본 AI 상담은 일반적인 정보 제공을 목적으로 합니다. 
                            구체적인 상담은 정부민원안내(110) 또는 행안부(044-205-1234)로 문의하시기 바랍니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIChat = AIChat;
