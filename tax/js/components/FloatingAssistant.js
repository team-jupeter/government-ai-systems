const FloatingAssistant = ({ onOpenChat }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState('features');
    const [chatMessages, setChatMessages] = React.useState([]);
    const [inputText, setInputText] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const chatEndRef = React.useRef(null);

    const features = [
        { icon: 'fa-bolt', title: '실시간 세금 징수', desc: '374.76 TPS로 전국 세금 거래 실시간 처리', color: 'cyan' },
        { icon: 'fa-file-invoice-dollar', title: '자동 재무제표', desc: '5천만 개인 + 3백만 사업자 재무제표 자동 생성/갱신', color: 'green' },
        { icon: 'fa-brain', title: 'AI 탈세 탐지', desc: '99.2% 정확도, 0.033ms 탐지 시간', color: 'purple' },
        { icon: 'fa-layer-group', title: '4계층 분산 처리', desc: '읍면동→시군구→광역시도→국가 계층적 취합', color: 'blue' },
        { icon: 'fa-link', title: 'OpenHash 검증', desc: '168바이트 블록, 해킹확률 10^-194,034,720', color: 'yellow' },
        { icon: 'fa-balance-scale', title: '세법 자동 적용', desc: '18개 세법, 30,000+ 판례/예규 실시간 검색', color: 'red' },
        { icon: 'fa-shield-alt', title: '완벽한 보안', desc: 'ECDSA P-256 서명 + PBFT 합의', color: 'pink' },
        { icon: 'fa-chart-line', title: '비용 절감', desc: '연간 1,044억원 (64%) 운영비 절감', color: 'orange' }
    ];

    const quickQuestions = [
        '종합소득세 신고 방법',
        '법인세 세율 안내',
        '부가가치세 환급 조건',
        '연말정산 공제 항목',
        '사업자 등록 절차'
    ];

    React.useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    const handleSendMessage = async () => {
        if (!inputText.trim() || isLoading) return;

        const userMsg = { role: 'user', content: inputText, timestamp: new Date().toISOString() };
        setChatMessages(prev => [...prev, userMsg]);
        const query = inputText;
        setInputText('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/tax/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: query, history: chatMessages.slice(-6) })
            });

            if (!response.ok) throw new Error('API 오류');

            const data = await response.json();
            setChatMessages(prev => [...prev, {
                role: 'assistant',
                content: data.response || '응답을 생성하지 못했습니다.',
                timestamp: new Date().toISOString(),
                references: data.references || []
            }]);
        } catch (error) {
            console.error('Chat error:', error);
            setChatMessages(prev => [...prev, {
                role: 'assistant',
                content: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
                timestamp: new Date().toISOString()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* 확장된 패널 */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-96 bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
                    {/* 헤더 */}
                    <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <i className="fas fa-robot text-white text-lg"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">AI 세무 도우미</h3>
                                    <div className="flex items-center gap-1 text-xs text-cyan-200">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                        Claude AI 연결됨
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        {/* 탭 */}
                        <div className="flex gap-2 mt-3">
                            <button onClick={() => setActiveTab('features')}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                                    activeTab === 'features' ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10'
                                }`}>
                                <i className="fas fa-star mr-1"></i>시스템 특징
                            </button>
                            <button onClick={() => setActiveTab('chat')}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                                    activeTab === 'chat' ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10'
                                }`}>
                                <i className="fas fa-comments mr-1"></i>AI 상담
                            </button>
                        </div>
                    </div>

                    {/* 특징 탭 */}
                    {activeTab === 'features' && (
                        <div className="p-4 max-h-96 overflow-y-auto">
                            <h4 className="text-sm font-bold text-gray-400 mb-3">OpenHash 국세청 AI 시스템 특징</h4>
                            <div className="space-y-3">
                                {features.map((f, idx) => (
                                    <div key={idx} className={`p-3 rounded-xl bg-${f.color}-500/10 border border-${f.color}-500/20 hover:border-${f.color}-500/40 transition cursor-pointer`}>
                                        <div className="flex items-start gap-3">
                                            <div className={`w-8 h-8 bg-${f.color}-500/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                                                <i className={`fas ${f.icon} text-${f.color}-400`}></i>
                                            </div>
                                            <div>
                                                <div className="font-medium text-white text-sm">{f.title}</div>
                                                <div className="text-xs text-gray-400 mt-0.5">{f.desc}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                                <div className="text-xs text-cyan-400 mb-2">더 자세한 정보는?</div>
                                <a href="http://100.30.14.224/openhash-system/" target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-white hover:text-cyan-400 transition">
                                    <i className="fas fa-link"></i>
                                    <span className="text-sm font-medium">OpenHash 기술 사이트 방문</span>
                                    <i className="fas fa-external-link-alt text-xs"></i>
                                </a>
                            </div>
                        </div>
                    )}

                    {/* 채팅 탭 */}
                    {activeTab === 'chat' && (
                        <div className="flex flex-col h-96">
                            {/* 채팅 메시지 */}
                            <div className="flex-1 p-4 overflow-y-auto space-y-3">
                                {chatMessages.length === 0 ? (
                                    <div className="text-center py-6">
                                        <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <i className="fas fa-comments text-2xl text-cyan-400"></i>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-4">무엇이든 물어보세요!</p>
                                        <div className="space-y-2">
                                            {quickQuestions.map((q, idx) => (
                                                <button key={idx} onClick={() => setInputText(q)}
                                                    className="block w-full text-left bg-gray-700/50 hover:bg-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 transition">
                                                    <i className="fas fa-arrow-right text-cyan-400 mr-2 text-xs"></i>{q}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {chatMessages.map((msg, idx) => (
                                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                                                    msg.role === 'user' 
                                                        ? 'bg-cyan-600 text-white rounded-tr-sm' 
                                                        : 'bg-gray-700 text-white rounded-tl-sm'
                                                }`}>
                                                    <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                                                    {msg.references && msg.references.length > 0 && (
                                                        <div className="mt-2 pt-2 border-t border-gray-600">
                                                            <div className="flex flex-wrap gap-1">
                                                                {msg.references.map((ref, i) => (
                                                                    <span key={i} className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">{ref}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        {isLoading && (
                                            <div className="flex justify-start">
                                                <div className="bg-gray-700 rounded-2xl rounded-tl-sm px-4 py-2">
                                                    <i className="fas fa-spinner fa-spin text-cyan-400 mr-2"></i>
                                                    <span className="text-sm text-gray-400">답변 생성 중...</span>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={chatEndRef} />
                                    </>
                                )}
                            </div>

                            {/* 입력 영역 */}
                            <div className="p-3 border-t border-gray-700">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="세무 관련 질문을 입력하세요..."
                                        className="flex-1 bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-500"
                                        disabled={isLoading}
                                    />
                                    <button onClick={handleSendMessage} disabled={isLoading || !inputText.trim()}
                                        className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-xl transition disabled:opacity-50">
                                        <i className="fas fa-paper-plane text-white"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* 플로팅 버튼 */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
                    isOpen 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 animate-bounce'
                }`}
                style={{ animationDuration: '2s' }}
            >
                <i className={`fas ${isOpen ? 'fa-times' : 'fa-headset'} text-2xl text-white`}></i>
            </button>
            
            {/* 툴팁 (닫혀있을 때만) */}
            {!isOpen && (
                <div className="absolute bottom-20 right-0 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
                    <span className="text-sm">무엇이든 물어보세요!</span>
                    <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-gray-800"></div>
                </div>
            )}
        </div>
    );
};
