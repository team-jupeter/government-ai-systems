const AIConsultant = () => {
    const [messages, setMessages] = React.useState([
        {
            role: 'assistant',
            content: '안녕하세요! 인사혁신 시스템 AI 상담사입니다. 업무 관리, 직업 매칭, 경력 개발, 성과 평가 등에 대해 무엇이든 물어보세요.'
        }
    ]);
    const [input, setInput] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const messagesEndRef = React.useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/personnel-innovation/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage })
            });
            const result = await response.json();
            
            if (result.success) {
                setMessages(prev => [...prev, { role: 'assistant', content: result.data.response }]);
            } else {
                setMessages(prev => [...prev, { 
                    role: 'assistant', 
                    content: '죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해 주세요.' 
                }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: '네트워크 오류가 발생했습니다. 연결 상태를 확인해 주세요.' 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const quickQuestions = [
        '나의 능력-적성 분석 결과를 알려주세요',
        '1인 법인 설립 절차가 궁금합니다',
        'AI 시대 경력 개발 방향은?',
        '개인 정보 금고란 무엇인가요?'
    ];

    return (
        <div className="space-y-6">
            {/* 상담 안내 */}
            <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-robot text-3xl text-purple-400"></i>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">AI 인사 상담</h3>
                        <p className="text-slate-300 text-sm">
                            Claude AI 기반의 전문 상담 서비스입니다. 업무 관리, 직업 매칭, 경력 개발, 
                            개인 정보 보호 등 인사혁신 시스템에 대한 모든 질문에 답변해 드립니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* 채팅 영역 */}
            <div className="bg-slate-800 rounded-xl overflow-hidden">
                {/* 메시지 영역 */}
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-3/4 p-4 rounded-xl ${
                                msg.role === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-700 text-slate-200'
                            }`}>
                                {msg.role === 'assistant' && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <i className="fas fa-robot text-purple-400"></i>
                                        <span className="text-xs text-purple-400 font-medium">AI 상담사</span>
                                    </div>
                                )}
                                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-slate-700 p-4 rounded-xl">
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-spinner fa-spin text-purple-400"></i>
                                    <span className="text-slate-400 text-sm">응답 생성 중...</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* 빠른 질문 */}
                <div className="px-4 py-2 border-t border-slate-700">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {quickQuestions.map((q, index) => (
                            <button
                                key={index}
                                onClick={() => setInput(q)}
                                className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-full text-xs text-slate-300 whitespace-nowrap transition-all"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 입력 영역 */}
                <div className="p-4 border-t border-slate-700">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="질문을 입력하세요..."
                            className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                            disabled={isLoading}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={isLoading || !input.trim()}
                            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                                isLoading || !input.trim()
                                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                            }`}
                        >
                            <i className="fas fa-paper-plane"></i>
                            <span>전송</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* 상담 주제 */}
            <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">📋 상담 가능 주제</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { icon: 'fa-clipboard-list', title: '업무 관리', desc: '5W1H 추적, 성과 기록' },
                        { icon: 'fa-handshake', title: '직업 매칭', desc: '능력-적성 기반 추천' },
                        { icon: 'fa-route', title: '경력 개발', desc: 'AI 경로 분석' },
                        { icon: 'fa-building-user', title: '1인 법인', desc: '설립 및 운영 안내' },
                        { icon: 'fa-vault', title: '정보 금고', desc: '개인 데이터 보호' },
                        { icon: 'fa-shield-halved', title: 'OpenHash', desc: '데이터 무결성' },
                        { icon: 'fa-chart-line', title: '성과 평가', desc: '평가 기준 안내' },
                        { icon: 'fa-users', title: '조직 관리', desc: '인력 배치 최적화' }
                    ].map((topic, index) => (
                        <div key={index} className="p-3 bg-slate-700/50 rounded-lg text-center hover:bg-slate-700 transition-all">
                            <i className={`fas ${topic.icon} text-xl text-purple-400 mb-2`}></i>
                            <p className="text-white text-sm font-medium">{topic.title}</p>
                            <p className="text-xs text-slate-400">{topic.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
