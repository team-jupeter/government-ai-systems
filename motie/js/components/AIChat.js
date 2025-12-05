const { useState, useRef, useEffect } = React;

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! 산업통상자원부 AI 상담 서비스입니다. 수출·FTA·에너지·산업기술에 대해 궁금하신 점을 질문해 주세요.'
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
        '수출 지원',
        'FTA 활용',
        '스마트공장',
        '에너지 절약'
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
            
            if (userMessage.includes('수출') || userMessage.includes('무역')) {
                response = '수출 지원은 중소·중견기업의 수출을 돕는 제도입니다.\n\n수출 지원:\n수출바우처:\n대상:\n• 중소·중견기업\n• 수출 희망 기업\n• 연 매출 1천억원 이하\n\n지원:\n• 최대 1억원\n• 마케팅·전시회·상담\n• 해외 광고·홍보\n• 80~100% 지원\n\n신청:\n• 무역협회·KOTRA\n• 온라인 신청\n• 수출계획서 제출\n\n무역금융:\n수출금융:\n• 수출입은행\n• 연 2~3%\n• 최대 300억원\n• 운영자금·설비자금\n\n무역보험:\n• 한국무역보험공사\n• 수출대금 미회수\n• 환변동 손실\n• 80~95% 보상\n\nKOTRA 지원:\n해외시장 조사:\n• 품목별 시장조사\n• 바이어 발굴\n• 수출상담회\n• 무료 지원\n\n해외지사:\n• 전세계 127개국\n• 현지 마케팅 지원\n• 바이어 매칭\n• 통역·번역\n\n온라인 수출:\n이커머스:\n• 아마존·알리바바\n• 입점 지원\n• 온라인 마케팅\n• 배송·결제 지원\n\nK-디지털:\n• 디지털 무역관\n• 온라인 전시회\n• 화상 상담\n\n문의:\n• 산업통상자원부: 044-203-4000\n• KOTRA: 1600-7119\n• 무역협회: 1566-5114\n\nAI가 수출기업을 발굴하고 맞춤형 지원을 제공합니다.';
            } else if (userMessage.includes('FTA') || userMessage.includes('원산지')) {
                response = 'FTA는 자유무역협정으로 관세 혜택을 받을 수 있습니다.\n\nFTA 활용:\nFTA 체결국:\n• 총 58개국\n• 미국·EU·중국·아세안\n• RCEP·영국·인도\n\n관세혜택:\n• 0~100% 관세 철폐\n• 품목별 상이\n• 원산지증명 필수\n\n원산지증명:\n발급:\n• 상공회의소\n• 세관\n• 자율발급 (인증수출자)\n• 온라인 신청\n\n요건:\n• 원산지 기준 충족\n• HS코드 확인\n• 부가가치 기준\n• 세번변경 기준\n\nFTA 포털:\nFTA-KOREA:\n• www.fta.go.kr\n• 관세율 조회\n• 원산지 판정\n• 품목분류\n\n활용:\n• 품목별 관세율\n• 협정문 검색\n• 원산지 판정\n• 교육·컨설팅\n\n컨설팅:\nFTA 활용:\n• 무료 컨설팅\n• 기업 방문상담\n• 원산지 검증 대응\n• 관세환급\n\n신청:\n• 관세청\n• 무역협회\n• KOTRA\n• 온라인 신청\n\n주의사항:\n원산지 위반:\n• 관세 추징\n• 가산세\n• 형사 처벌\n• 수출 제재\n\n검증:\n• 사후 검증\n• 서류 제출\n• 현지 실사\n\n문의:\n• FTA 종합지원센터: 1380\n• 관세청: 125\n• 무역협회: 1566-5114\n\nAI가 FTA 원산지를 자동 검증하고 최적 활용 방안을 제시합니다.';
            } else if (userMessage.includes('스마트공장') || userMessage.includes('제조혁신')) {
                response = '스마트공장은 제조업 혁신을 위한 지원사업입니다.\n\n스마트공장:\n지원대상:\n• 중소·중견 제조기업\n• 공장 보유\n• 3년 이상 사업\n\n지원내용:\n기초:\n• 최대 5천만원 (50%)\n• 생산관리 시스템\n• 설비 자동화\n\n중간1:\n• 최대 1억원 (50%)\n• MES·ERP 연계\n• 품질관리 시스템\n\n중간2:\n• 최대 1.5억원 (40%)\n• 전체 공정 자동화\n• 실시간 모니터링\n\n고도화:\n• 최대 2억원 (30%)\n• AI·빅데이터\n• 무인화 공장\n\n효과:\n생산성:\n• 30% 향상\n• 불량률 40% 감소\n• 납기 단축\n• 원가 절감\n\n신청:\n절차:\n1. 수준 진단\n2. 사업 신청\n3. 컨설팅\n4. 구축\n5. 성과 측정\n\n지원:\n• 스마트제조혁신추진단\n• 온라인 신청\n• 연중 상시\n\n로봇 도입:\n지원:\n• 협동로봇 (50%)\n• 최대 1억원\n• 중소기업\n\n효과:\n• 작업자 안전\n• 생산성 향상\n• 24시간 가동\n\n디지털 전환:\nDX 바우처:\n• 최대 1억원\n• 클라우드·빅데이터\n• AI·IoT 도입\n• 70~90% 지원\n\n스마트물류:\n• 자동 창고\n• 무인 운반\n• 재고 최적화\n\n문의:\n• 스마트제조혁신추진단: 1588-4633\n• 산업통상자원부: 044-203-4320\n• 중소벤처기업부\n\nAI가 기업별 맞춤형 스마트공장 전략을 제시합니다.';
            } else if (userMessage.includes('에너지') || userMessage.includes('전기요금')) {
                response = '에너지 절약과 신재생에너지 지원 정보입니다.\n\n에너지 지원:\n에너지진단:\n대상:\n• 연 2천toe 이상\n• 제조업·건물\n\n지원:\n• 무료 진단\n• 절감 방안 제시\n• 투자비 분석\n\n효과:\n• 에너지비 20% 절감\n• 온실가스 감축\n• 설비 개선\n\n신재생에너지:\n태양광:\n• 설치비 지원 (40%)\n• 주택·건물·공장\n• 발전수익\n• 20년 보장\n\nESS:\n• 에너지저장장치\n• 피크 관리\n• 전기요금 절감\n\n전기요금:\n산업용:\n• 기본요금 + 전력량\n• 계절별·시간대별\n• 최대수요 관리\n\n절감:\n• 심야전력 활용\n• 피크 회피\n• 역률 개선\n\n에너지효율:\n고효율기기:\n• 인증기기 구매\n• 보조금 지원\n• LED·인버터\n\n으뜸효율:\n• 최고등급 제품\n• 구매비 10% 환급\n• 가전·보일러\n\n온실가스:\n배출권거래:\n• 할당·거래\n• 감축 목표\n• 과징금\n\n감축:\n• 공정 개선\n• 연료 전환\n• 재생에너지\n\n전력수급:\nDR (수요반응):\n• 전력피크 감축\n• 참여 보상금\n• 자동 제어\n\n신청:\n• 한전\n• 전력거래소\n\n문의:\n• 에너지공단: 1670-7788\n• 한전: 123\n• 산업통상자원부: 044-203-5110\n\nAI가 실시간 전력수급을 예측하고 에너지 절감 방안을 제시합니다.';
            } else {
                response = '산업통상자원부 AI 상담 서비스입니다.\n\n문의 주제:\n• 수출 지원 (수출바우처·무역금융)\n• FTA 활용 (원산지증명·관세혜택)\n• 스마트공장 (제조혁신·로봇)\n• 에너지 (진단·신재생·요금)\n• 산업기술 R&D\n• 외국인투자\n\n주요 연락처:\n• 산업통상자원부: 044-203-4000\n• KOTRA: 1600-7119\n• FTA 센터: 1380\n• 스마트공장: 1588-4633\n• 에너지공단: 1670-7788\n\n누리집:\n• 산업부: www.motie.go.kr\n• KOTRA: www.kotra.or.kr\n• FTA: www.fta.go.kr\n\n구체적인 질문을 해주시면 더 자세한 안내를 드리겠습니다.';
            }
            
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsLoading(false);
        }, 1000);
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-800 to-indigo-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">AI 상담 서비스</h2>
                <p className="text-blue-100 text-sm">
                    DeepSeek R1 모델 기반으로 산업·통상·에너지 관련 질문에 답변합니다
                </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-4 ${
                                msg.role === 'user' 
                                    ? 'bg-blue-800 text-white' 
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
                                    <div className="w-2 h-2 bg-blue-800 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-blue-800 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-blue-800 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                                    className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-xs hover:bg-blue-100 transition-colors"
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
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="px-6 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            전송
                        </button>
                    </form>
                </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-800 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-blue-900 mb-1">AI 상담 안내</h4>
                        <p className="text-sm text-blue-800">
                            본 AI 상담은 일반적인 정보 제공을 목적으로 합니다. 
                            구체적인 상담은 산업통상자원부(044-203-4000) 또는 관련 기관으로 문의하시기 바랍니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIChat = AIChat;
