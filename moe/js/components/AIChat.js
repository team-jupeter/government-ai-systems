const { useState, useRef, useEffect } = React;

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! 교육부 AI 상담 서비스입니다. 입시·장학금·학교정책·유보통합에 대해 궁금하신 점을 질문해 주세요.'
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
        '수능은 언제?',
        '국가장학금 신청은?',
        '고교학점제란?',
        '유보통합이란?'
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
            
            if (userMessage.includes('수능')) {
                response = '대학수학능력시험(수능)은 대학 입학을 위한 국가 시험입니다.\n\n2026학년도 수능:\n• 시험일: 2025년 11월 13일 (목)\n• 원서접수: 2025년 8월 말\n• 성적발표: 2025년 12월 초\n\n시험 영역:\n필수:\n• 국어\n• 수학\n• 영어\n• 한국사\n\n선택:\n• 탐구(사회/과학/직업 중 택2)\n• 제2외국어/한문 (택1)\n\n점수 체계:\n• 표준점수\n• 백분위\n• 등급 (9등급제)\n\n영어·한국사:\n• 절대평가\n• 등급만 표시\n\n응시 절차:\n1. 재학생: 학교 일괄 접수\n2. 졸업생: 개별 접수\n3. 응시료: 약 6만원\n4. 수험표 출력\n5. 시험 당일 응시\n\n시험 시간:\n• 1교시(국어): 08:40~10:00\n• 2교시(수학): 10:30~12:10\n• 3교시(영어): 13:10~14:20\n• 4교시(한국사/탐구): 14:50~\n• 5교시(제2외/한문): 17:05~\n\n유의사항:\n• 휴대폰 반입 금지\n• 신분증 지참 필수\n• 컴퓨터용 사인펜\n• 시계 지참 권장\n\n성적 활용:\n• 정시모집: 주요 전형자료\n• 수시모집: 최저학력기준\n• 대학별 반영비율 상이\n\n재수험:\n• 횟수 제한 없음\n• 졸업 후 응시 가능\n• 최근 3년 성적 활용\n\n문의:\n• 한국교육과정평가원\n• 전화: 1644-0600\n\nAI가 수능 성적을 자동 분석하고 대학 지원 전략을 제시합니다.';
            } else if (userMessage.includes('국가장학금') || userMessage.includes('장학금')) {
                response = '국가장학금은 대학생 등록금 부담을 줄이기 위한 정부 지원입니다.\n\n2025년 지원 규모:\n• 총 예산: 5.2조원\n• 수혜학생: 125만명\n• 1인당 최대: 연 700만원\n\n장학금 유형:\n1유형 (소득연계):\n• 기초생활수급자: 연 700만원\n• 1~3분위: 연 520만원\n• 4~6분위: 연 390~260만원\n• 7~8분위: 연 175~67.5만원\n\n2유형 (대학 자체):\n• 대학 재원 매칭\n• 성적우수 장학금\n• 저소득층 추가지원\n\n다자녀 장학금:\n• 3자녀 이상 가구\n• 소득 8분위 이하\n• 연 520만원\n\n지역인재 장학금:\n• 비수도권 대학\n• 지역 고교 졸업\n• 성적 기준 충족\n• 등록금 전액\n\n신청 방법:\n1. 한국장학재단 접속\n2. 회원가입·로그인\n3. 신청서 작성\n4. 가구원 동의\n5. 서류 제출\n\n신청 기간:\n• 1학기: 11~12월\n• 2학기: 5~6월\n• 재학생 재신청 필수\n\n선발 기준:\n소득:\n• 소득인정액 8분위 이하\n• 건강보험료 기준\n\n성적:\n• 직전학기 B학점(80점) 이상\n• 12학점 이상 이수\n• 1학년 1학기 제외\n\n지원 절차:\n1. 신청\n2. 소득심사\n3. 성적심사\n4. 선발\n5. 장학금 지급\n\n제출 서류:\n• 가족관계증명서\n• 주민등록등본\n• 소득·재산 증빙\n\n혜택:\n• 등록금 직접 감면\n• 생활비 대출 가능\n• 상환 부담 없음\n\n주의사항:\n• 허위신청 시 환수\n• 학점 미달 시 중단\n• 재신청 필수\n\n문의:\n• 한국장학재단 1599-2000\n• 누리집: www.kosaf.go.kr\n\nAI가 소득분위를 자동 계산하고 장학금 수혜액을 산정합니다.';
            } else if (userMessage.includes('고교학점제')) {
                response = '고교학점제는 학생이 진로에 따라 과목을 선택하여 이수하는 제도입니다.\n\n시행 시기:\n• 2025년: 전면 시행\n• 일반고·자공고 적용\n• 특목고·특성화고 포함\n\n주요 내용:\n학점 이수:\n• 졸업 학점: 192학점\n• 1학점: 16시수(50분)\n• 1학년: 64학점\n• 2~3학년: 128학점\n\n과목 선택:\n• 공통과목: 필수 이수\n• 일반선택: 자유 선택\n• 진로선택: 진로 맞춤\n• 융합선택: 융합 과목\n\n성취평가제:\n• A-B-C-D-E (5단계)\n• 절대평가\n• 석차 폐지\n• 최소학업성취 보장\n\n최소 성취수준:\n• E등급: 40% 미만\n• 미도달 시 보충이수\n• 재이수 또는 대체이수\n• 졸업 요건 충족 필요\n\n선택 과목:\n인문계열:\n• 문학, 심화국어\n• 사회문화, 윤리\n• 제2외국어\n\n자연계열:\n• 미적분, 기하\n• 물리학, 화학\n• 생명과학\n\n예체능:\n• 음악, 미술\n• 체육, 무용\n\n운영 방식:\n학교 내:\n• 다양한 과목 개설\n• 소인수 과목 운영\n• 블록타임제\n\n학교 밖:\n• 온라인 공동교육\n• 지역 공동교육과정\n• 대학 연계 과정\n\n진로 설계:\n1학년:\n• 진로 탐색\n• 적성 파악\n• 과목 선택 준비\n\n2~3학년:\n• 진로별 심화\n• 대학 전공 연계\n• 포트폴리오 구축\n\n대입 연계:\n• 학생부종합전형\n• 선택과목 이수내역\n• 진로 연계성 평가\n\n장점:\n• 진로 맞춤 교육\n• 학습 흥미 증대\n• 자기주도 학습\n• 대입 경쟁력 향상\n\n과제:\n• 교원 확보\n• 교실 공간\n• 시간표 편성\n• 학생 상담\n\n문의:\n• 교육부 02-6222-6060\n• 시도교육청\n\nAI가 학생 진로를 분석하고 최적 과목 조합을 추천합니다.';
            } else if (userMessage.includes('유보통합')) {
                response = '유보통합은 유치원과 어린이집을 통합하여 질 높은 영유아 교육·보육을 제공하는 정책입니다.\n\n추진 배경:\n• 이원화된 관리체계\n• 유치원: 교육부\n• 어린이집: 보건복지부\n→ 교육부로 일원화\n\n통합 목표:\n• 2024년: 영유아정책국 신설\n• 2025~2027년: 단계적 통합\n• 2028년: 완전 통합\n\n현황:\n유치원:\n• 수: 8,750개\n• 원아: 58만명\n• 교사: 5.2만명\n• 3~5세 교육\n\n어린이집:\n• 수: 28,500개\n• 원아: 127만명\n• 교사: 25만명\n• 0~5세 보육\n\n통합 내용:\n교육과정:\n• 0~5세 연계 교육\n• 누리과정 확대\n• 표준보육과정 통합\n\n교사 자격:\n• 유치원교사 1·2급\n• 보육교사 1·2·3급\n→ 통합 자격체계\n\n시설 기준:\n• 안전·위생 강화\n• 시설 기준 일원화\n• 실내외 놀이공간\n\n재정 지원:\n• 무상교육·보육\n• 부모 부담 경감\n• 질 향상 투자\n\n학부모 혜택:\n선택권 확대:\n• 기관 구분 없이 선택\n• 거주지 인근 이용\n• 대기 문제 완화\n\n비용 부담:\n• 0~5세 무상 지원\n• 소득별 차등 없음\n• 추가 비용 최소화\n\n교육 질:\n• 교사 전문성 강화\n• 프로그램 다양화\n• 안전 관리 철저\n\n교사 처우:\n급여:\n• 단계적 개선\n• 격차 해소\n• 처우 향상\n\n근무환경:\n• 근무시간 개선\n• 행정업무 경감\n• 쉼 시간 보장\n\n전문성:\n• 재교육 강화\n• 자격 연수\n• 경력 관리\n\n추진 과제:\n법령 정비:\n• 영유아교육법(가칭)\n• 관련 법령 통합\n\n조직 통합:\n• 관리 부처 일원화\n• 지자체 협력\n\n예산 확보:\n• 재정 투자 확대\n• 효율적 운영\n\n문의:\n• 교육부 영유아정책국\n• 전화: 044-203-6380\n\nAI가 전국 유치원·어린이집을 실시간 모니터링합니다.';
            } else {
                response = '교육부 AI 상담 서비스입니다.\n\n문의하실 수 있는 주제:\n• 수능 및 입시제도\n• 국가장학금 신청\n• 고교학점제\n• 유보통합\n• 초중등교육 정책\n• 학교안전\n• 교육복지\n• 평생교육\n• 교원정책\n\n주요 연락처:\n• 대표: 044-203-6114\n• 한국장학재단: 1599-2000\n• 수능: 1644-0600\n\n누리집: www.moe.go.kr\n\n구체적인 질문을 해주시면 더 자세한 안내를 드리겠습니다.';
            }
            
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsLoading(false);
        }, 1000);
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">AI 상담 서비스</h2>
                <p className="text-teal-100 text-sm">
                    DeepSeek R1 모델 기반으로 교육정책 관련 질문에 답변합니다
                </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-4 ${
                                msg.role === 'user' 
                                    ? 'bg-teal-600 text-white' 
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
                                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                                    className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs hover:bg-teal-100 transition-colors"
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
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            전송
                        </button>
                    </form>
                </div>
            </div>
            
            <div className="bg-teal-50 border-l-4 border-teal-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-teal-900 mb-1">AI 상담 안내</h4>
                        <p className="text-sm text-teal-800">
                            본 AI 상담은 일반적인 정보 제공을 목적으로 합니다. 
                            구체적인 상담은 교육부(044-203-6114)로 문의하시기 바랍니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIChat = AIChat;
