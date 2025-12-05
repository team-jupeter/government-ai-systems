const { useState, useRef, useEffect } = React;

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '안녕하세요! 식품의약품안전처 AI 상담 서비스입니다. 식품·의약품·의료기기·화장품의 안전 관리에 대해 궁금하신 점을 질문해 주세요.'
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
        '식품 리콜 절차는?',
        '의약품 허가 신청 방법은?',
        '의료기기 등급 분류는?',
        '화장품 안전 기준은?'
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
            
            if (userMessage.includes('리콜') || userMessage.includes('회수')) {
                response = '식품·의약품 리콜(회수)은 안전 문제가 발견된 제품을 시장에서 제거하는 조치입니다.\n\n리콜 절차:\n1. 위해 발생 또는 우려 확인\n2. 제조·수입업체에 회수 명령\n3. 회수 계획서 제출\n4. 회수 실시 및 진행상황 보고\n5. 회수 완료 확인\n\n리콜 등급:\n• 1등급: 생명·건강에 심각한 위해\n• 2등급: 일시적 위해 가능성\n• 3등급: 위해 가능성 낮음\n\nAI가 위해 정보를 실시간 모니터링하여 신속한 리콜 조치를 지원합니다.';
            } else if (userMessage.includes('의약품') && (userMessage.includes('허가') || userMessage.includes('승인'))) {
                response = '의약품 허가는 안전성·유효성을 검증하여 판매를 승인하는 과정입니다.\n\n허가 절차:\n1. 임상시험계획 승인 신청\n2. 임상 1~3상 시험 실시\n3. 품목허가 신청 (자료 제출)\n4. 식약처 심사 (안전성·유효성)\n5. 중앙약사심의위원회 심의\n6. 허가 결정\n\n제출 자료:\n• 기원·발견 및 개발 경위\n• 구조·물리화학적 성질\n• 안정성\n• 독성시험자료\n• 약리작용\n• 임상시험 성적\n\nAI가 방대한 임상자료를 분석하여 심사 기간을 단축합니다.';
            } else if (userMessage.includes('의료기기') && (userMessage.includes('등급') || userMessage.includes('분류'))) {
                response = '의료기기는 위험도에 따라 1~4등급으로 분류됩니다.\n\n등급 분류:\n• 1등급: 낮은 위험 (반창고, 청진기)\n  - 신고\n• 2등급: 중간 위험 (전자체온계, 콘택트렌즈)\n  - 인증 또는 허가\n• 3등급: 높은 위험 (주사기, 수술용기구)\n  - 허가\n• 4등급: 매우 높은 위험 (심장판막, 인공관절)\n  - 허가 (엄격 심사)\n\n허가 절차:\n• 1등급: 신고\n• 2~4등급: 기술문서 심사 → 허가\n\nAI가 의료기기의 위험도를 자동 분석하여 적절한 등급을 제안합니다.';
            } else if (userMessage.includes('화장품')) {
                response = '화장품은 안전성이 검증된 원료로 제조되어야 합니다.\n\n화장품 안전 기준:\n• 사용 금지 원료 (석면, 납 등)\n• 사용 제한 원료 (방부제, 자외선차단제)\n• 유해물질 기준 (중금속, 메탄올)\n\n심사 제도:\n• 기능성화장품: 심사 또는 보고\n  - 미백, 주름개선, 자외선차단\n• 일반화장품: 보고\n\n안전관리:\n• 전성분 표시 의무\n• 유통화장품 안전관리 기준\n• 제조·품질관리 기준 (CGMP)\n\nAI가 화장품 성분을 분석하여 유해물질 포함 여부를 즉시 판단합니다.';
            } else if (userMessage.includes('식품') && (userMessage.includes('첨가물') || userMessage.includes('안전'))) {
                response = '식품첨가물은 식품의 제조·가공·보존 과정에서 사용되는 물질입니다.\n\n식품첨가물 관리:\n• 안전성 평가 (독성시험)\n• 사용기준 설정 (ADI 기준)\n• 표시기준 준수\n\n주요 첨가물:\n• 보존료: 식품 부패 방지\n• 착색료: 색상 부여\n• 감미료: 단맛 부여\n• 산화방지제: 변질 방지\n\n안전 기준:\n• 일일섭취허용량(ADI) 설정\n• 사용량 제한\n• 유해물질 규격\n\nAI가 식품첨가물의 사용량을 분석하여 안전기준 준수 여부를 자동 확인합니다.';
            } else if (userMessage.includes('수입식품') || userMessage.includes('검역')) {
                response = '수입식품은 통관 전 안전성 검사를 거쳐야 합니다.\n\n수입식품 절차:\n1. 수입신고 (수입식품등 수입신고)\n2. 서류 심사 (위생증명서 등)\n3. 검사 여부 결정\n  - 정밀검사 대상 선정\n  - 무작위 표본검사\n4. 검사 실시 (잔류농약, 중금속 등)\n5. 통관 승인 또는 반송\n\n검사 항목:\n• 잔류농약\n• 동물용의약품\n• 중금속\n• 미생물\n• 방사능\n\n부적합 조치:\n• 반송, 폐기\n• 수입금지\n\nAI가 수입식품의 위해 이력을 분석하여 검사 대상을 효율적으로 선정합니다.';
            } else if (userMessage.includes('영양') || userMessage.includes('표시')) {
                response = '영양성분 표시는 소비자의 알 권리를 보장하는 제도입니다.\n\n표시 의무:\n• 대상: 모든 가공식품\n• 표시 항목:\n  - 열량\n  - 나트륨\n  - 탄수화물\n  - 당류\n  - 지방\n  - 트랜스지방\n  - 포화지방\n  - 콜레스테롤\n  - 단백질\n\n표시 방법:\n• 1회 제공량 기준\n• 영양소 함량\n• 영양소 기준치에 대한 비율(%)\n\n위반 시 제재:\n• 시정명령\n• 과징금\n• 영업정지\n\nAI가 영양성분표 정확성을 자동 검증하여 허위표시를 방지합니다.';
            } else {
                response = '식품의약품안전처 AI 상담 서비스입니다.\n\n문의하실 수 있는 주제:\n• 식품 안전 및 리콜\n• 의약품 허가·승인\n• 의료기기 등급 분류\n• 화장품 안전 기준\n• 식품첨가물\n• 수입식품 검역\n• 영양성분 표시\n\n구체적인 질문을 해주시면 더 자세한 안내를 드리겠습니다.';
            }
            
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsLoading(false);
        }, 1000);
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-700 to-pink-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">AI 상담 서비스</h2>
                <p className="text-red-100 text-sm">
                    DeepSeek R1 모델 기반으로 식·의약품 안전 관리 관련 질문에 답변합니다
                </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-4 ${
                                msg.role === 'user' 
                                    ? 'bg-red-600 text-white' 
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
                                    <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
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
                            구체적인 민원은 식약처 종합상담센터(1577-1255)로 문의하시기 바랍니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIChat = AIChat;
