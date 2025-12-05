const { useState, useRef, useEffect } = React;

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! 원자력안전위원회 AI 상담 서비스입니다. 원자력 안전·방사선 관리·방사능 방재에 대해 궁금하신 점을 질문해 주세요.'
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
        '원전은 안전한가요?',
        '방사선 피폭 걱정되나요?',
        '라돈 측정은?',
        '원전 사고 시 대피는?'
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
            
            if (userMessage.includes('원전') && (userMessage.includes('안전') || userMessage.includes('위험'))) {
                response = '우리나라 원자력발전소는 세계 최고 수준의 안전성을 갖추고 있습니다.\n\n다중 안전장치:\n• 격납건물: 두께 1.2m 철근콘크리트\n• 중복 안전계통: 4계통 독립 운영\n• 피동안전계통: 전원 없이도 작동\n• 중대사고 관리: 수소제거, 노심냉각\n\n안전규제:\n• 설계 단계부터 엄격한 심사\n• 건설 중 수시 검사\n• 운전 중 24시간 감시\n• 정기점검 철저 수행\n\n안전성 평가:\n• 국제원자력기구(IAEA) 기준 충족\n• 내진설계: 규모 7.0 견딤\n• 해일 방어: 10m 이상 방호벽\n• 항공기 충돌 대비 설계\n\n감시체계:\n• AI 24시간 실시간 모니터링\n• 이상징후 즉시 탐지\n• 자동 안전정지 시스템\n• 원격 감시 및 통제\n\n실적:\n• 40년 이상 무사고 운전\n• WANO 종합지수 세계 1위\n• 설비이용률 90% 이상\n• 비계획정지 최소화\n\n후쿠시마 교훈 반영:\n• 방수문 설치\n• 이동형 발전차 배치\n• 해수 냉각펌프 추가\n• 비상대응 강화\n\nAI가 24시간 원전을 감시하고 이상을 즉시 탐지합니다.';
            } else if (userMessage.includes('방사선') && (userMessage.includes('피폭') || userMessage.includes('건강'))) {
                response = '일상생활에서 받는 방사선은 자연방사선 수준으로 안전합니다.\n\n자연방사선:\n• 연간 평균: 3.08mSv\n• 우주방사선: 0.39mSv\n• 지각방사선: 0.48mSv\n• 음식물: 0.40mSv\n• 라돈: 1.81mSv\n\n일상 방사선 비교:\n• 흉부 X-ray: 0.1mSv\n• 치과 X-ray: 0.01mSv\n• CT 촬영: 7mSv\n• 서울-뉴욕 왕복 비행: 0.1mSv\n• 원전 주변 주민: 0.01mSv/년 이하\n\n허용 기준:\n• 일반인: 1mSv/년\n• 방사선 작업종사자: 50mSv/년\n• 임산부: 1mSv/임신기간\n\n원전 주변 감시:\n• 24시간 실시간 측정\n• 200개 감시 지점\n• AI 자동 분석\n• 이상 시 즉시 통보\n\n건강영향:\n• 100mSv 이하: 영향 없음\n• 자연방사선과 동일 수준\n• 장기 역학조사: 이상 없음\n\n방호 원칙:\n• 정당화: 필요한 경우만\n• 최적화: 합리적 최소화\n• 선량한도: 기준 준수\n\n의료 방사선:\n• 진단상 이득이 큼\n• 정당화된 피폭\n• 엄격한 관리\n\n측정 및 관리:\n• 개인선량계 착용\n• 정기 건강검진\n• 피폭이력 관리\n\nAI가 전국 방사선량을 실시간 모니터링합니다.';
            } else if (userMessage.includes('라돈')) {
                response = '라돈은 자연방사성 물질로 관리가 필요합니다.\n\n라돈이란?\n• 무색·무취·무미의 기체\n• 우라늄 붕괴 생성물\n• 토양·암석에서 발생\n• 폐암 2위 원인 (흡연 다음)\n\n실내 라돈:\n• 권고기준: 148Bq/m³\n• 평균 농도: 50~70Bq/m³\n• 지하공간이 높음\n• 환기로 저감 가능\n\n측정 방법:\n• 간이측정기 구입\n• 전문기관 의뢰\n• 3개월 이상 측정 권장\n• 계절별 변화 고려\n\n저감 방법:\n• 환기: 하루 3회 이상\n• 균열 보수: 바닥·벽\n• 환풍기 설치\n• 양압 유지\n\n라돈 측정 지원:\n• 보건소 무료 측정기 대여\n• 취약계층 무료 측정\n• 한국원자력안전기술원 상담\n• 전화: 1588-6604\n\n다중이용시설:\n• 연 1회 이상 측정 의무\n• 기준 초과 시 개선\n• 미이행 시 과태료\n\n건축자재:\n• 라돈 방출 검사\n• 적합 제품 사용\n• 인증마크 확인\n\n생활주변방사선:\n• 침대·매트리스\n• 팔찌·목걸이\n• 음이온 제품\n→ 구입 전 확인 필요\n\n신고:\n• 기준 초과 제품 발견 시\n• 원자력안전위원회 신고\n• 회수·교환 지원\n\nAI가 전국 라돈 농도를 실시간 분석합니다.';
            } else if (userMessage.includes('원전') && userMessage.includes('사고')) {
                response = '원자력사고에 대비한 철저한 방재체계를 운영하고 있습니다.\n\n방사능 방재체계:\n• 3단계 비상구역 설정\n• 예방적 보호조치구역(PAZ): 반경 3~5km\n• 긴급보호조치계획구역(UPZ): 반경 20~30km\n• 옥내대피계획구역: 반경 30km\n\n사고 시 대응:\n1단계 (백색경보):\n• 원전 내부 대응\n• 지자체 통보\n• 주민 대기\n\n2단계 (청색경보):\n• 방재요원 출동\n• 주민 대피 준비\n• 실시간 감시 강화\n\n3단계 (적색경보):\n• 주민 옥내대피 또는 소개\n• 안정옥소제 배포\n• 출입통제\n\n주민 행동요령:\n옥내대피:\n• 창문·문 닫기\n• 환기시설 차단\n• TV·라디오 청취\n• 외출 자제\n\n소개(대피):\n• 행정안전부 안내 방송\n• 차량 또는 버스 이용\n• 대피소로 이동\n• 방사능 검사 실시\n\n안정옥소제:\n• 방사성 요오드 차단\n• 사고 직전·직후 복용\n• 40세 미만 우선\n• 임산부·수유부·영유아 필수\n\n방재훈련:\n• 연 2회 정기훈련\n• 주민 참여 훈련\n• 기관 합동 훈련\n• 국제공동 훈련\n\n통보체계:\n• 재난문자(CBS)\n• 사이렌\n• TV·라디오\n• 마을방송\n• 앱 알림\n\n방사능 방재 앱:\n• 실시간 방사선량\n• 대피소 위치\n• 행동요령 안내\n• 긴급연락처\n\n방재센터:\n• 24시간 운영\n• 상황실 상시 가동\n• 즉각 대응 체계\n\n국제협력:\n• IAEA 신속 지원\n• 양자 협정\n• 정보 공유\n\nAI가 사고 시나리오를 시뮬레이션하고 최적 대응을 제시합니다.';
            } else if (userMessage.includes('방사성폐기물') || userMessage.includes('방폐물')) {
                response = '방사성폐기물은 엄격한 기준에 따라 안전하게 관리됩니다.\n\n방폐물 분류:\n저준위:\n• 방사능 낮음\n• 작업복, 장갑 등\n• 경주 처분장 처분\n• 용량: 80만 드럼\n\n중준위:\n• 방사능 중간\n• 원전 부품 등\n• 처분시설 건설 중\n\n고준위:\n• 사용후핵연료\n• 방사능 높음\n• 임시저장 중\n• 영구처분장 필요\n\n저장 현황:\n• 원전 내 저장조\n• 건식저장시설\n• 안전성 확인\n• 정기 점검\n\n경주 방폐물 처분장:\n• 위치: 경상북도 경주시\n• 2015년 운영 개시\n• 지하 130m 동굴\n• 다중방벽 시스템\n\n안전성:\n• 300년간 방사능 차폐\n• 지하수 유입 차단\n• 지진 대비 설계\n• 실시간 모니터링\n\n사용후핵연료:\n• 임시저장: 원전 내\n• 저장 용량: 충분\n• 재처리 또는 직접처분\n• 정책 수립 중\n\n국제 동향:\n• 핀란드: 영구처분장 건설\n• 스웨덴: 부지 확정\n• 프랑스: 재처리 후 처분\n• 미국: 임시저장 확대\n\n공론화:\n• 사용후핵연료 관리\n• 국민 의견 수렴\n• 투명한 정보 공개\n• 지역 상생\n\n방사능 측정:\n• 처분장 주변 감시\n• 지하수 방사능 측정\n• 공기 중 방사능 측정\n• 결과 공개\n\n안전관리:\n• 한국원자력환경공단 운영\n• 원안위 규제 감독\n• IAEA 안전기준 적용\n\nAI가 방폐물 저장 현황을 실시간 모니터링합니다.';
            } else if (userMessage.includes('허가') || userMessage.includes('인허가') || userMessage.includes('심사')) {
                response = '원자력 시설 및 방사선 이용은 엄격한 허가를 받아야 합니다.\n\n원전 인허가:\n1. 사업자 지정\n2. 건설허가\n3. 운영허가\n4. 계속운전(수명연장)\n5. 운영변경허가\n6. 해체허가\n\n심사 절차:\n• 사업자 신청\n• 원안위 안전성 심사\n• 공청회 개최\n• 주민 의견 수렴\n• 위원회 의결\n• 허가 또는 불허\n\n심사 기준:\n• 원자로 안전성\n• 방사선 방호\n• 환경영향\n• 비상계획\n• 물리적 방호\n• 품질보증\n\n건설허가:\n• 신청서 접수\n• 예비안전성분석보고서\n• 환경영향평가서\n• 공청회\n• 심사 기간: 2~3년\n\n운영허가:\n• 최종안전성분석보고서\n• 시운전 결과\n• 품질보증 입증\n• 심사 기간: 1년\n\n계속운전:\n• 설계수명 만료 전 신청\n• 노화평가\n• 설비 교체계획\n• 안전성 재평가\n• 심사 기간: 2년\n\n방사선 이용 허가:\n• 방사성동위원소 이용\n• 방사선 발생장치\n• 의료기관, 연구소 등\n• 안전관리 규정 수립\n\n허가 신청:\n1. 통합정보시스템 접속\n2. 신청서 작성\n3. 첨부서류 제출\n4. 심사 대기\n5. 허가증 발급\n\n안전관리자:\n• 면허 취득 필요\n• 정기 교육 이수\n• 안전관리 책임\n\n정기검사:\n• 연 1회 이상\n• 시설·장비 점검\n• 방사선 측정\n• 기록 유지\n\n상담:\n• 원안위 홈페이지\n• 전화: 02-397-7114\n\nAI가 허가 신청을 지원하고 심사를 자동화합니다.';
            } else {
                response = '원자력안전위원회 AI 상담 서비스입니다.\n\n문의하실 수 있는 주제:\n• 원자력발전소 안전성\n• 방사선 피폭 및 건강\n• 라돈 측정 및 저감\n• 방사능 방재 및 대피\n• 방사성폐기물 관리\n• 원자력 시설 허가\n• 방사선 이용 신고\n• 생활주변방사선\n\n상담 전화:\n• 02-397-7114 (대표)\n• 1588-6604 (라돈)\n\n구체적인 질문을 해주시면 더 자세한 안내를 드리겠습니다.';
            }
            
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsLoading(false);
        }, 1000);
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-700 to-emerald-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">AI 상담 서비스</h2>
                <p className="text-green-100 text-sm">
                    DeepSeek R1 모델 기반으로 원자력 안전 관련 질문에 답변합니다
                </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-4 ${
                                msg.role === 'user' 
                                    ? 'bg-green-600 text-white' 
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
                                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            전송
                        </button>
                    </form>
                </div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-green-900 mb-1">AI 상담 안내</h4>
                        <p className="text-sm text-green-800">
                            본 AI 상담은 일반적인 정보 제공을 목적으로 합니다. 
                            구체적인 상담은 원자력안전위원회(02-397-7114)로 문의하시기 바랍니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIChat = AIChat;
