const { useState, useRef, useEffect } = React;

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! 국민권익위원회 AI 상담 서비스입니다. 고충민원·부패신고·행정심판·청렴도에 대해 궁금하신 점을 질문해 주세요.'
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
        '고충민원 신청 방법은?',
        '부패신고는 어떻게?',
        '행정심판 청구는?',
        '청탁금지법이란?'
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
            
            if (userMessage.includes('고충민원') || userMessage.includes('민원')) {
                response = '고충민원은 행정기관의 위법·부당한 처분이나 불합리한 제도로 인한 고충을 해결하는 제도입니다.\n\n신청 방법:\n1. 국민신문고(www.epeople.go.kr)\n2. 전화: 국번없이 110\n3. 방문: 정부합동민원센터\n4. 우편: 세종시 국민권익위원회\n\n처리 대상:\n• 행정기관의 위법·부당한 처분\n• 불합리한 행정제도\n• 공공기관의 불편사항\n• 민원 무응답·지연\n\n처리 절차:\n1. 민원 접수 (국민신문고)\n2. AI 자동 분류 및 배정\n3. 관계기관 조사\n4. 시정 권고 또는 의견 표명\n5. 제도개선 건의\n\n처리 기간: 60일 이내 (연장 가능)\n\n권익위 권한:\n• 시정 권고\n• 의견 표명\n• 제도개선 권고\n• 관계기관 통보\n\n신청 시 유의사항:\n• 구체적 사실 기재\n• 증빙 자료 첨부\n• 익명 신청 가능\n\nAI가 민원을 자동 분류하고 유사 사례를 검색합니다.';
            } else if (userMessage.includes('부패') && userMessage.includes('신고')) {
                response = '부패행위 신고는 공직자의 부정부패를 신고하는 제도로, 신고자는 법적으로 보호받습니다.\n\n신고 방법:\n1. 국민신문고 부패신고\n2. 청렴신문고 앱\n3. 전화: 044-200-7700\n4. 우편: 세종시 국민권익위원회\n5. 방문 신고\n\n부패행위 유형:\n• 금품·향응 수수\n• 공금 횡령·유용\n• 직권 남용\n• 알선·청탁\n• 공공재정 부정청구\n• 예산 낭비\n\n신고자 보호:\n• 신분 비밀 보장\n• 불이익 조치 금지\n• 신변 보호\n• 책임 감면·면제\n• 포상금 지급 (최대 30억원)\n\n신고 처리:\n1. 신고 접수 (익명 가능)\n2. AI 자동 분석\n3. 조사 또는 수사기관 이첩\n4. 조치 결과 통보\n5. 포상금 심사·지급\n\n포상금:\n• 환수금액의 최대 30%\n• 최대 30억원\n• 세금 면제\n\n공익신고:\n• 국민 생명·안전 위해 행위\n• 환경 파괴\n• 식품 안전 위반\n• 소비자 피해\n→ 공익신고자보호법 적용\n\n신고 시 주의:\n• 허위신고 금지 (처벌 대상)\n• 구체적 사실 기재\n• 증거 자료 첨부\n\nAI가 신고 내용을 분석하고 부패 위험도를 평가합니다.';
            } else if (userMessage.includes('행정심판')) {
                response = '행정심판은 행정기관의 위법·부당한 처분에 대해 불복하는 준사법적 구제절차입니다.\n\n청구 방법:\n1. 온라인: 행정심판 전자시스템\n2. 우편: 중앙행정심판위원회\n3. 방문: 정부세종청사 7동\n\n청구 대상:\n• 처분 취소·변경 (취소심판)\n• 위법한 부작위 (의무이행심판)\n• 부당결부 금지 위반 (무효확인)\n\n청구 기간:\n• 처분이 있음을 안 날부터 90일\n• 처분이 있은 날부터 180일\n\n심판 절차:\n1. 심판청구서 제출\n2. AI 유사 판례 검색\n3. 답변서 제출 (피청구인)\n4. 심리 (서면·구술)\n5. 재결 (60일 이내)\n\n재결 유형:\n• 인용: 청구 인정\n• 기각: 청구 기각\n• 각하: 부적법 각하\n\n재결 효력:\n• 처분청 기속 (인용 시)\n• 재판상 화해 효력\n• 불복 시 행정소송 가능\n\n행정심판 장점:\n• 무료 (수수료 없음)\n• 신속 (60일 이내)\n• 전문성 (위원회 심리)\n• 의무이행심판 가능\n\n청구 시 첨부:\n• 처분서 사본\n• 증거 자료\n• 위임장 (대리인)\n\n대리인:\n• 변호사\n• 가족\n• 지정된 자\n\nAI가 청구 내용을 분석하고 유사 판례를 자동 검색합니다.';
            } else if (userMessage.includes('청탁금지법') || userMessage.includes('김영란법')) {
                response = '청탁금지법(김영란법)은 부정청탁과 금품 수수를 금지하여 공직사회 청렴성을 확보하는 법입니다.\n\n적용 대상:\n• 공무원\n• 공직유관단체 임직원\n• 언론인\n• 사립학교 교직원\n• 사립학교법인 임직원\n\n금지 행위:\n1. 부정청탁 (14개 유형)\n2. 금품 수수\n3. 외부강의 초과 사례금\n\n금품 수수 금지:\n• 식사: 1회 3만원 초과 금지\n• 선물: 1회 5만원 초과 금지\n• 경조사비: 1회 10만원 초과 금지\n\n허용되는 경우:\n• 공개 행사 음식물\n• 통상적 선물 (5만원 이하)\n• 친족 간 거래\n• 직무 무관 사적 거래\n\n부정청탁 금지:\n• 인허가 청탁\n• 채용·승진 청탁\n• 계약 청탁\n• 징계·감사 면제 청탁\n• 수사·재판 청탁 등\n\n위반 시 제재:\n• 형사처벌: 3년 이하 징역, 3천만원 이하 벌금\n• 과태료: 금품 수수액의 2~5배\n• 징계: 파면·해임 등\n• 몰수·추징\n\n신고 방법:\n• 국민권익위원회\n• 해당 기관\n• 수사기관\n\n신고자 보호:\n• 신분 보장\n• 불이익 금지\n• 비밀 유지\n\n자진신고:\n• 처벌 감경\n• 신속한 조치\n\nAI가 청탁금지법 위반 여부를 자동 판단합니다.';
            } else if (userMessage.includes('청렴도')) {
                response = '공공기관 청렴도 측정은 부패 수준을 평가하고 개선하는 제도입니다.\n\n측정 대상:\n• 중앙행정기관\n• 지방자치단체\n• 공공기관\n• 교육청\n\n측정 방법:\n1. 외부청렴도\n   - 민원인 설문\n   - 업무관련자 설문\n2. 내부청렴도\n   - 소속 직원 설문\n3. 정책고객평가\n   - 정책 수혜자 설문\n\n설문 내용:\n• 금품·향응 수수\n• 부당한 업무처리\n• 공정성 인식\n• 청렴도 체감\n• 제도 개선\n\n측정 주기: 연 1회\n\n결과 활용:\n• 기관별 순위 공개\n• 낮은 기관 개선 권고\n• 우수 기관 포상\n• 인사·예산 반영\n\n청렴도 등급:\n• 1등급: 9.0 이상\n• 2등급: 8.0~9.0\n• 3등급: 7.0~8.0\n• 4등급: 6.0~7.0\n• 5등급: 6.0 미만\n\n개선 조치:\n• 부패 취약 분야 개선\n• 청렴 교육 강화\n• 내부 신고 제도 활성화\n• 투명성 제고\n\n청렴도 제고 방안:\n• 업무 프로세스 개선\n• 민원 처리 투명화\n• 부패 행위 처벌 강화\n• 청렴 문화 조성\n\n국민 참여:\n• 청렴도 설문 참여\n• 부패 신고\n• 제도개선 제안\n\nAI가 청렴도 데이터를 분석하고 부패 위험을 예측합니다.';
            } else if (userMessage.includes('제도개선') || userMessage.includes('정책')) {
                response = '제도개선은 불합리한 행정제도를 발굴하여 개선하는 국민권익위원회의 핵심 기능입니다.\n\n제도개선 절차:\n1. 민원 빅데이터 분석\n2. 불합리한 제도 발굴\n3. 관계기관 협의\n4. 개선 권고\n5. 이행 점검\n\n발굴 방법:\n• 민원 분석 (AI 활용)\n• 국민 제안\n• 현장 조사\n• 전문가 의견\n\n개선 대상:\n• 법령·규정\n• 행정 절차\n• 민원 처리 방식\n• 전산 시스템\n\n개선 권고 권한:\n• 법령 개정 권고\n• 제도 개선 권고\n• 의견 표명\n• 시정 조치 요구\n\n최근 개선 사례:\n• 민원 24 통합\n• 무인 민원발급기 확대\n• 민원서류 간소화\n• 온라인 신청 확대\n\n국민 제안:\n1. 국민신문고 접속\n2. 제도개선 제안\n3. AI 유사 제안 검색\n4. 심사·채택\n5. 결과 통보\n\n제안 포상:\n• 우수 제안 시상\n• 포상금 지급\n\n제도개선 효과:\n• 민원 감소\n• 행정 효율 향상\n• 국민 편의 증대\n• 예산 절감\n\nAI가 민원 데이터를 분석하여 제도개선 과제를 자동 발굴합니다.';
            } else if (userMessage.includes('국민신문고')) {
                response = '국민신문고는 정부 통합 민원 포털로, 국민권익위원회가 운영합니다.\n\n접속: www.epeople.go.kr\n\n주요 기능:\n1. 민원 신청\n   - 고충민원\n   - 행정심판\n   - 부패신고\n   - 공익신고\n\n2. 정책 제안\n   - 제도개선\n   - 정책 아이디어\n   - 규제 개혁\n\n3. 국민참여\n   - 정책 토론\n   - 설문조사\n   - 공청회\n\n4. 정보 공개\n   - 정보공개 청구\n   - 공개된 정보 열람\n\n민원 신청 절차:\n1. 회원 가입 (또는 비회원)\n2. 민원 유형 선택\n3. 내용 작성\n4. AI 자동 분류\n5. 담당 기관 배정\n6. 처리 결과 통보\n\n신청 시 장점:\n• 24시간 접수\n• 실시간 처리 현황\n• 모바일 신청 가능\n• 처리 기한 알림\n\n통합 처리:\n• 여러 기관 관련 민원도 1건 신청\n• 중복 신청 방지\n• 신속한 처리\n\n모바일 앱:\n• 국민신문고 앱\n• 청렴신문고 앱\n• 간편 신청\n• 알림 기능\n\n민원 조회:\n• 접수 확인\n• 처리 현황\n• 결과 확인\n• 만족도 평가\n\n국민신문고 110:\n• 전화 상담\n• 민원 안내\n• 접수 지원\n\nAI가 민원을 자동 분류하고 처리 방향을 제시합니다.';
            } else {
                response = '국민권익위원회 AI 상담 서비스입니다.\n\n문의하실 수 있는 주제:\n• 고충민원 신청\n• 부패행위 신고\n• 행정심판 청구\n• 청탁금지법\n• 청렴도 측정\n• 제도개선 제안\n• 국민신문고 이용\n\n상담 전화:\n• 110: 정부민원안내 (24시간)\n• 044-200-7700: 부패신고\n\n구체적인 질문을 해주시면 더 자세한 안내를 드리겠습니다.';
            }
            
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsLoading(false);
        }, 1000);
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-700 to-cyan-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">AI 상담 서비스</h2>
                <p className="text-teal-100 text-sm">
                    DeepSeek R1 모델 기반으로 국민권익 관련 질문에 답변합니다
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
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-blue-900 mb-1">AI 상담 안내</h4>
                        <p className="text-sm text-blue-800">
                            본 AI 상담은 일반적인 정보 제공을 목적으로 합니다. 
                            구체적인 상담은 국번없이 110으로 문의하시기 바랍니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIChat = AIChat;
