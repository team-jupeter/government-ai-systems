const FloatingFeaturePanel = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isMinimized, setIsMinimized] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState('features');
    const [chatMessages, setChatMessages] = React.useState([
        { type: 'ai', content: '안녕하세요! OpenHash 국가 급식 시스템 AI 상담사입니다. 급식 시스템에 대해 무엇이든 물어보세요! 🍱' }
    ]);
    const [inputText, setInputText] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const chatEndRef = React.useRef(null);

    // 자동 스크롤
    React.useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    const features = [
        {
            icon: '🍱',
            title: '5천만 국민 맞춤 급식',
            desc: '개인정보금고(PDV)의 식습관, 체중, 신장, 나이 데이터를 기반으로 5성급 호텔 수준의 맞춤형 도시락 제공',
            color: 'cyan'
        },
        {
            icon: '🔗',
            title: 'OpenHash 무결성 보장',
            desc: '출생부터 현재까지 모든 식사 기록을 위변조 불가능하게 저장. 블록체인 대비 99.7% 에너지 절감',
            color: 'green'
        },
        {
            icon: '🤖',
            title: '1,700대 로봇셰프',
            desc: '6축 로봇팔로 ±1℃ 온도 제어, ±3g 중량 제어. 100% 충돌방지율 달성',
            color: 'purple'
        },
        {
            icon: '🚗',
            title: '자율주행 배송 시스템',
            desc: '15,000대 차량이 지상(85%), 드론(10%), 지하터널(5%)로 전국 실시간 배송',
            color: 'yellow'
        },
        {
            icon: '📍',
            title: '실시간 위치 추적',
            desc: '스마트워치로 현재 위치 파악. 타지역 방문 시 해당 지역 급식센터에서 식사 제공',
            color: 'blue'
        },
        {
            icon: '📊',
            title: '5차원 영양분석',
            desc: '생체지표(35%), 활동수준(25%), 질병관리(20%), 기호문화(15%), 경제형평(5%)',
            color: 'pink'
        },
        {
            icon: '🏭',
            title: '4계층 인프라',
            desc: 'Layer 1(읍면동 조리) → Layer 2(시군구 배급) → Layer 3(광역 공급) → Layer 4(국가 관제)',
            color: 'indigo'
        },
        {
            icon: '🌾',
            title: '식재료 통합 관리',
            desc: '농협, 수협, 축협 연계. 주간 조달 계획 수립 및 실시간 재고 모니터링',
            color: 'orange'
        },
        {
            icon: '⚠️',
            title: '이상 징후 조기 감지',
            desc: '식습관 변화 패턴 분석으로 질병 징후 사전 파악. 78% 질병 조기 발견',
            color: 'red'
        },
        {
            icon: '💰',
            title: '경제적 혜택',
            desc: '5성급 호텔 품질을 8,000~12,000원에 제공. ROI 4,054.9% 달성',
            color: 'emerald'
        }
    ];

    const quickQuestions = [
        '급식 시스템 개요',
        '로봇셰프 기술',
        '영양분석 방식',
        '배송 시스템',
        'OpenHash란?',
        '알레르기 관리'
    ];

    const handleSendMessage = async () => {
        if (!inputText.trim() || isLoading) return;
        
        const userMsg = inputText.trim();
        setChatMessages(prev => [...prev, { type: 'user', content: userMsg }]);
        setInputText('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/meal/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg })
            });
            
            const data = await response.json();
            setChatMessages(prev => [...prev, { 
                type: 'ai', 
                content: data.response || '응답을 가져오는데 실패했습니다.' 
            }]);
        } catch (error) {
            console.error('Chat error:', error);
            setChatMessages(prev => [...prev, { 
                type: 'ai', 
                content: '죄송합니다. 네트워크 오류가 발생했습니다. 다시 시도해주세요.' 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    // 닫힌 상태: 플로팅 버튼만 표시
    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-6 bg-gradient-to-r from-emerald-500 to-cyan-500 w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all z-40 group"
                title="급식 시스템 특징"
            >
                <span className="text-2xl">🍱</span>
                <div className="absolute right-full mr-3 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
                    급식 시스템 특징
                </div>
            </button>
        );
    }

    // 최소화 상태
    if (isMinimized) {
        return (
            <div className="fixed bottom-24 right-6 z-40">
                <button
                    onClick={() => setIsMinimized(false)}
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 hover:scale-105 transition-all"
                >
                    <span>🍱</span>
                    <span className="font-medium">급식 시스템</span>
                    <i className="fas fa-chevron-up"></i>
                </button>
            </div>
        );
    }

    // 열린 상태: 전체 패널
    return (
        <div 
            className="fixed bottom-24 right-6 w-[420px] bg-gray-900 rounded-2xl shadow-2xl z-40 border border-gray-700 overflow-hidden"
            style={{ maxHeight: 'calc(100vh - 150px)' }}
        >
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="text-2xl mr-2">🍱</span>
                        <div>
                            <div className="font-bold">급식 시스템 특징</div>
                            <div className="text-xs text-emerald-100">OpenHash 기반 국가 급식</div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={() => setIsMinimized(true)}
                            className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-all"
                            title="최소화"
                        >
                            <i className="fas fa-minus text-sm"></i>
                        </button>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-all"
                            title="닫기"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* 탭 */}
            <div className="flex border-b border-gray-700">
                <button
                    onClick={() => setActiveTab('features')}
                    className={`flex-1 py-3 text-sm font-medium transition-all ${
                        activeTab === 'features' 
                            ? 'text-cyan-400 border-b-2 border-cyan-400' 
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    <i className="fas fa-list-ul mr-2"></i>특징
                </button>
                <button
                    onClick={() => setActiveTab('chat')}
                    className={`flex-1 py-3 text-sm font-medium transition-all ${
                        activeTab === 'chat' 
                            ? 'text-cyan-400 border-b-2 border-cyan-400' 
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    <i className="fas fa-comments mr-2"></i>AI 상담
                </button>
            </div>

            {/* 콘텐츠 */}
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 350px)' }}>
                {activeTab === 'features' ? (
                    <div className="p-4 space-y-3">
                        {features.map((feature, idx) => (
                            <div 
                                key={idx}
                                className={`bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-${feature.color}-500/50 transition-all`}
                            >
                                <div className="flex items-start">
                                    <span className="text-2xl mr-3">{feature.icon}</span>
                                    <div>
                                        <div className={`font-bold text-${feature.color}-400 mb-1`}>{feature.title}</div>
                                        <div className="text-sm text-gray-400 leading-relaxed">{feature.desc}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col" style={{ height: 'calc(100vh - 350px)' }}>
                        {/* 채팅 메시지 */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {chatMessages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3 rounded-xl ${
                                        msg.type === 'user' 
                                            ? 'bg-cyan-600 text-white' 
                                            : 'bg-gray-800 text-gray-200'
                                    }`}>
                                        <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-800 p-3 rounded-xl">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef}></div>
                        </div>

                        {/* 빠른 질문 */}
                        <div className="px-4 pb-2">
                            <div className="flex flex-wrap gap-2">
                                {quickQuestions.map((q, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setInputText(q)}
                                        className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-full text-gray-300 transition-all"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 입력창 */}
                        <div className="p-4 border-t border-gray-700">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="무엇이든 물어보세요..."
                                    className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-all"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={isLoading || !inputText.trim()}
                                    className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 rounded-xl transition-all"
                                >
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </div>
                            <div className="text-xs text-gray-500 mt-2 text-center">
                                <i className="fas fa-robot mr-1"></i>
                                Claude AI 기반 실시간 상담
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 탭이 features일 때만 하단에 AI 상담 유도 */}
            {activeTab === 'features' && (
                <div className="p-4 border-t border-gray-700 bg-gray-800/50">
                    <button
                        onClick={() => setActiveTab('chat')}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 py-3 rounded-xl font-medium hover:opacity-90 transition-all"
                    >
                        <i className="fas fa-comments mr-2"></i>
                        무엇이든 물어보세요 (AI 상담)
                    </button>
                </div>
            )}
        </div>
    );
};
