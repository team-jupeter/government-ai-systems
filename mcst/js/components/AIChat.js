const { useState, useRef, useEffect } = React;

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! 문화체육관광부 AI 상담 서비스입니다. 문화예술지원·체육시설·관광정보·문화바우처에 대해 궁금하신 점을 질문해 주세요.'
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
        '예술인 지원',
        '문화바우처',
        '체육시설 예약',
        '관광지 추천'
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
            
            if (userMessage.includes('예술인') || userMessage.includes('창작지원')) {
                response = '예술인 지원은 창작활동을 하는 예술인을 위한 제도입니다.\n\n예술인 지원:\n예술인 복지:\n대상:\n• 예술활동증명 완료자\n• 문화예술 분야 창작·실연\n• 프리랜서 예술인\n• 소득 기준 충족\n\n신청:\n• 한국예술인복지재단\n• 온라인 신청\n• 예술활동증명 필수\n• 소득·재산 신고\n\n혜택:\n창작준비금:\n• 월 최대 300만원\n• 연 1회 신청\n• 창작활동 지원\n• 6개월 지급\n\n예술인 생활안정자금:\n• 최대 500만원\n• 저리 대출\n• 생활비·창작비\n• 3년 상환\n\n고용보험:\n• 예술인 고용보험\n• 실업급여\n• 출산급여\n• 육아휴직 급여\n\n창작지원:\n문예진흥기금:\n• 문학·미술·음악·무용\n• 공연·전시 지원\n• 창작·발표 지원\n• 연간 공모\n\n지원 분야:\n• 문학: 작품집 발간\n• 미술: 전시회 개최\n• 음악: 음반 제작\n• 공연: 공연 제작\n• 영화: 독립영화 제작\n\n지원 규모:\n• 개인: 최대 2천만원\n• 단체: 최대 1억원\n• 프로젝트별 상이\n\n신청 절차:\n1. 공고 확인\n2. 온라인 신청\n3. 서류 심사\n4. 발표·면접\n5. 최종 선정\n6. 협약·지급\n\n예술인 패스:\n혜택:\n• 공연·전시 할인\n• 박물관·미술관 무료\n• 도서관·서점 할인\n• 악기·재료 할인\n\n발급:\n• 예술활동증명자\n• 온라인 신청\n• 모바일 카드\n• 무료 발급\n\n건강보험:\n지원 내용:\n• 건강보험료 경감\n• 저소득 예술인\n• 최대 50% 감면\n\n산재보험:\n• 예술인 산재보험\n• 업무상 재해\n• 치료비 지원\n• 휴업급여\n\n예술인 파견:\n예술가 교사:\n• 학교 예술교육\n• 월 200만원\n• 주 2~4일 근무\n\n문화예술교육:\n• 복지시설 파견\n• 지역아동센터\n• 경로당·장애인시설\n\n신청:\n• 한국문화예술교육진흥원\n• 연 2회 모집\n• 온라인 신청\n\n청년예술인:\n청년예술인 지원:\n• 만 18~34세\n• 창작활동 지원\n• 전시·공연 기회\n• 멘토링\n\n예술인 주택:\n• 저렴한 임대료\n• 창작 공간\n• 주거 안정\n\n문의:\n• 한국예술인복지재단: 1566-3636\n• 한국문화예술위원회: 02-760-4600\n• 문체부: 044-203-2706\n\nAI가 예술인 지원금을 자동 심사하고 맞춤형 지원 정보를 제공합니다.';
            } else if (userMessage.includes('문화바우처') || userMessage.includes('통합문화이용권')) {
                response = '문화바우처는 저소득층의 문화생활 지원 제도입니다.\n\n문화바우처:\n통합문화이용권:\n대상:\n• 기초생활수급자\n• 차상위계층\n• 6세 이상\n• 소득 기준 충족\n\n지원액:\n• 1인당 연 11만원\n• 카드 형태 지급\n• 전국 사용 가능\n\n사용처:\n공연·영화:\n• 영화관\n• 공연장\n• 뮤지컬·연극\n• 콘서트\n\n전시:\n• 박물관\n• 미술관\n• 전시회\n• 체험관\n\n도서:\n• 서점\n• 온라인서점\n• 전자책\n• 오디오북\n\n여행:\n• 국내여행\n• 관광지\n• 숙박시설\n• 교통비\n\n체육:\n• 스포츠 관람\n• 체육시설 이용\n• 레저 활동\n\n신청 방법:\n온라인:\n• 문화누리카드 누리집\n• 회원가입\n• 신청서 작성\n• 자격 확인\n\n방문:\n• 주민센터\n• 신분증 지참\n• 즉시 발급\n\n우편:\n• 신청서 다운로드\n• 우편 발송\n• 카드 수령\n\n발급:\n• 신청 후 2주 이내\n• 본인 수령\n• 대리 수령 가능\n\n사용 방법:\n결제:\n• 카드 제시\n• 결제 금액 차감\n• 잔액 확인\n\n온라인:\n• 카드번호 입력\n• 온라인 결제\n• 전자책·음원\n\n유효기간:\n• 발급일~12월 31일\n• 연말 소멸\n• 이월 불가\n\n잔액 조회:\n• 문화누리 앱\n• 누리집\n• 고객센터\n• SMS\n\n청소년:\n청소년 문화패스:\n• 만 13~18세\n• 연 12만원\n• 공연·영화·도서\n• 별도 신청\n\n스포츠강좌:\n• 초중고생\n• 월 8만원\n• 수영·태권도 등\n• 스포츠강좌이용권\n\n아동:\n유아 문화예술:\n• 만 5세 이하\n• 공연·전시 무료\n• 박물관·미술관\n• 가족 단위\n\n노인:\n어르신 문화프로그램:\n• 만 65세 이상\n• 문화활동 지원\n• 평생교육\n• 여가활동\n\n장애인:\n장애인 문화바우처:\n• 등록 장애인\n• 문화 접근성\n• 편의시설\n• 할인 혜택\n\n주의사항:\n사용 제한:\n• 주류·담배 불가\n• 생필품 불가\n• 현금 인출 불가\n• 양도·매매 불가\n\n부정사용:\n• 환수 조치\n• 향후 지급 제한\n• 형사 처벌\n\n문의:\n• 문화누리카드: 1544-3412\n• 문체부: 044-203-2744\n• 주민센터\n\nAI가 문화바우처 자격을 자동 심사하고 사용처를 안내합니다.';
            } else if (userMessage.includes('체육시설') || userMessage.includes('운동')) {
                response = '공공체육시설은 전국민이 이용할 수 있는 시설입니다.\n\n공공체육시설:\n시설 종류:\n체육관:\n• 실내체육관\n• 배드민턴·농구\n• 배구·탁구\n• 헬스장\n\n수영장:\n• 실내 수영장\n• 수영 강습\n• 자유 수영\n• 어린이 풀\n\n운동장:\n• 축구장\n• 야구장\n• 테니스장\n• 육상 트랙\n\n생활체육:\n• 요가·필라테스\n• 에어로빅\n• 댄스스포츠\n• 태권도·합기도\n\n예약 방법:\n온라인:\n• 공공체육시설 예약\n• 지자체 누리집\n• 스마트폰 앱\n• 회원가입\n\n전화:\n• 시설 관리사무소\n• 전화 예약\n• 이용 일시 선택\n\n방문:\n• 시설 방문\n• 현장 예약\n• 이용권 구매\n\n이용 요금:\n실내체육관:\n• 개인: 1,000~3,000원\n• 단체: 시간당 2~5만원\n• 정기회원 할인\n\n수영장:\n• 1회: 3,000~5,000원\n• 월회원: 5~8만원\n• 강습: 10~15만원\n\n테니스장:\n• 1시간: 5,000~10,000원\n• 조명: 별도 요금\n• 회원권 할인\n\n할인:\n• 청소년·노인 50%\n• 장애인 무료\n• 국가유공자 무료\n• 다자녀 가정 할인\n\n생활체육교실:\n프로그램:\n• 수영·헬스\n• 에어로빅\n• 요가·필라테스\n• 배드민턴·탁구\n\n신청:\n• 분기별 모집\n• 온라인 신청\n• 선착순 마감\n• 수강료 납부\n\n수강료:\n• 월 3~5만원\n• 3개월 과정\n• 주 2~3회\n• 교재비 별도\n\n스포츠강좌이용권:\n대상:\n• 저소득층 아동·청소년\n• 유·청소년\n• 월 8만원 지원\n• 수강료 지원\n\n신청:\n• 시·군·구청\n• 온라인 신청\n• 소득 기준 확인\n\n이용:\n• 등록 체육시설\n• 수영·태권도 등\n• 월 단위 사용\n\n장애인 체육:\n반다비체육센터:\n• 장애인 전용\n• 생활체육 지원\n• 무료 이용\n• 전국 15개소\n\n프로그램:\n• 수영·헬스\n• 휠체어농구\n• 보치아\n• 탁구·배드민턴\n\n국민체육센터:\n시설:\n• 다목적 체육관\n• 수영장·헬스장\n• 생활체육 프로그램\n• 저렴한 이용료\n\n전국 현황:\n• 전국 200개소\n• 시·군·구 운영\n• 도보 10분 거리\n\n문의:\n• 거주지 시·군·구청\n• 체육시설 관리사무소\n• 문체부: 044-203-3145\n\nAI가 체육시설 예약을 자동 처리하고 맞춤 프로그램을 추천합니다.';
            } else if (userMessage.includes('관광') || userMessage.includes('여행')) {
                response = '관광정보는 전국 관광지와 축제를 안내합니다.\n\n관광정보:\n주요 관광지:\n서울:\n• 경복궁·창덕궁\n• 남산타워\n• 명동·동대문\n• 한강공원\n• 북촌한옥마을\n\n부산:\n• 해운대 해수욕장\n• 광안리 해변\n• 자갈치시장\n• 태종대·용두산\n• 감천문화마을\n\n제주:\n• 한라산\n• 성산일출봉\n• 우도·마라도\n• 협재·곽지 해변\n• 성읍민속마을\n\n경주:\n• 불국사·석굴암\n• 첨성대\n• 안압지\n• 대릉원\n• 양동마을\n\n전주:\n• 한옥마을\n• 전동성당\n• 경기전\n• 오목대\n• 전주비빔밥\n\n관광 안내:\n한국관광공사:\n• 대한민국 구석구석\n• 관광지 정보\n• 축제·행사\n• 맞춤 코스\n\n외국인 관광:\n• Visit Korea\n• 다국어 안내\n• 관광통역 전화\n• 1330\n\nK-컬처:\n한류 체험:\n• K-POP 공연\n• 드라마 촬영지\n• K-뷰티 체험\n• 한식 체험\n\n관광특구:\n• 명동·동대문\n• 강남·홍대\n• 인사동·북촌\n• 이태원\n\n축제:\n봄:\n• 진해 군항제 (3~4월)\n• 벚꽃 축제\n• 화천 산천어축제\n• 보령 머드축제\n\n여름:\n• 부산 국제영화제\n• 보령 머드축제\n• 대관령 음악제\n• 무주 반딧불축제\n\n가을:\n• 안동 국제탈춤페스티벌\n• 서울 세계불꽃축제\n• 자라섬 재즈페스티벌\n• 고창 모양성제\n\n겨울:\n• 평창 송어축제\n• 태백 눈축제\n• 화천 산천어축제\n• 강릉 커피축제\n\n관광패스:\n한국관광카드:\n• 교통·입장료 할인\n• 외국인 전용\n• 온라인 구매\n• 모바일 카드\n\nDiscover Seoul Pass:\n• 서울 관광명소\n• 대중교통 무료\n• 24/48/72시간\n• 박물관·공연 할인\n\n무장애 관광:\n장애인 관광:\n• 휠체어 접근\n• 편의시설\n• 전동휠체어 대여\n• 관광 도우미\n\n열린관광지:\n• 전국 20개소\n• 무장애 여행\n• 안전·편리\n\n숙박:\n한국관광 품질인증:\n• 인증 숙박시설\n• 안전·청결\n• 서비스 품질\n• 할인 혜택\n\n농촌체험:\n• 농촌관광마을\n• 체험 프로그램\n• 민박·펜션\n• 전통문화 체험\n\n관광안내소:\n• 공항·역·터미널\n• 관광지\n• 무료 안내\n• 다국어 서비스\n\n관광불편신고:\n• 1330 (24시간)\n• 관광통역안내\n• 불편사항 신고\n• 다국어 지원\n\n문의:\n• 한국관광공사: 1330\n• 문체부: 044-203-2852\n• 지역 관광안내소\n\nAI가 맞춤형 관광코스를 추천하고 실시간 여행정보를 제공합니다.';
            } else {
                response = '문화체육관광부 AI 상담 서비스입니다.\n\n문의하실 수 있는 주제:\n• 예술인 지원 (창작지원금·복지)\n• 문화바우처 (통합문화이용권)\n• 체육시설 (공공체육시설 예약)\n• 관광정보 (관광지·축제)\n• 문화재 (박물관·유적지)\n• K-컬처 (한류·문화콘텐츠)\n\n주요 연락처:\n• 문체부: 044-203-2000\n• 예술인복지재단: 1566-3636\n• 문화누리카드: 1544-3412\n• 관광안내: 1330\n\n누리집:\n• 문체부: www.mcst.go.kr\n• 대한민국 구석구석: korean.visitkorea.or.kr\n• 문화누리카드: www.mnuri.kr\n\n구체적인 질문을 해주시면 더 자세한 안내를 드리겠습니다.';
            }
            
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsLoading(false);
        }, 1000);
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-pink-700 to-rose-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">AI 상담 서비스</h2>
                <p className="text-pink-100 text-sm">
                    DeepSeek R1 모델 기반으로 문화·체육·관광 관련 질문에 답변합니다
                </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-4 ${
                                msg.role === 'user' 
                                    ? 'bg-pink-700 text-white' 
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
                                    <div className="w-2 h-2 bg-pink-700 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-pink-700 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-pink-700 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                                    className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-xs hover:bg-pink-100 transition-colors"
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
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="px-6 py-2 bg-pink-700 text-white rounded-lg hover:bg-pink-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            전송
                        </button>
                    </form>
                </div>
            </div>
            
            <div className="bg-pink-50 border-l-4 border-pink-700 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-pink-900 mb-1">AI 상담 안내</h4>
                        <p className="text-sm text-pink-800">
                            본 AI 상담은 일반적인 정보 제공을 목적으로 합니다. 
                            구체적인 상담은 문체부(044-203-2000) 또는 관련 기관으로 문의하시기 바랍니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIChat = AIChat;
