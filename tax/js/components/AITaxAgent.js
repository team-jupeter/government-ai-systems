const AITaxAgent = () => {
    const [messages, setMessages] = React.useState([
        {
            role: 'assistant',
            content: '안녕하세요! OpenHash 기반 AI 세무상담 시스템입니다. 세금 신고, 절세 방법, 세법 해석 등 세무 관련 질문에 답변드립니다. 무엇이 궁금하신가요?',
            timestamp: new Date().toISOString()
        }
    ]);
    const [inputText, setInputText] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const chatEndRef = React.useRef(null);

    const quickQuestions = [
        '종합소득세 신고 방법 알려주세요',
        '법인세 세율이 어떻게 되나요?',
        '부가가치세 환급 조건이 무엇인가요?',
        '사업자 필요경비 인정 범위는?',
        '연말정산 공제 항목 알려주세요'
    ];

    React.useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!inputText.trim() || isLoading) return;
        
        const userMessage = { role: 'user', content: inputText, timestamp: new Date().toISOString() };
        setMessages(prev => [...prev, userMessage]);
        const query = inputText;
        setInputText('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/tax/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: query, history: messages.slice(-10) })
            });
            const data = await response.json();
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.response || '죄송합니다. 응답을 생성하는 데 문제가 발생했습니다.',
                timestamp: new Date().toISOString(),
                references: data.references || []
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
                timestamp: new Date().toISOString()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-4 gap-6">
                <div className="col-span-3 bg-gray-800 rounded-2xl border border-gray-700 flex flex-col h-[700px]">
                    <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                                <i className="fas fa-robot text-xl text-white"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">AI 세무상담 Agent</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                    <span>Claude AI 연결됨 | OpenHash 검증</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] ${msg.role === 'user' ? 'bg-cyan-600 rounded-2xl rounded-tr-md' : 'bg-gray-700 rounded-2xl rounded-tl-md'} p-4`}>
                                    {msg.role === 'assistant' && (
                                        <div className="flex items-center gap-2 mb-2">
                                            <i className="fas fa-robot text-cyan-400"></i>
                                            <span className="text-sm text-cyan-400 font-medium">AI 세무상담</span>
                                        </div>
                                    )}
                                    <div className="text-white whitespace-pre-wrap">{msg.content}</div>
                                    {msg.references && msg.references.length > 0 && (
                                        <div className="mt-3 pt-3 border-t border-gray-600">
                                            <div className="text-xs text-gray-400 mb-2">참조 세법</div>
                                            <div className="flex flex-wrap gap-2">
                                                {msg.references.map((ref, i) => (
                                                    <span key={i} className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">{ref}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div className="text-xs text-gray-400 mt-2">{new Date(msg.timestamp).toLocaleTimeString('ko-KR')}</div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-700 rounded-2xl rounded-tl-md p-4">
                                    <i className="fas fa-spinner fa-spin text-cyan-400 mr-2"></i>
                                    <span className="text-gray-400">AI가 답변을 생성하고 있습니다...</span>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                    <div className="p-4 border-t border-gray-700">
                        <div className="flex gap-3">
                            <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="세무 관련 질문을 입력하세요..."
                                className="flex-1 bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                disabled={isLoading} />
                            <button onClick={handleSend} disabled={isLoading || !inputText.trim()}
                                className="bg-cyan-600 hover:bg-cyan-500 px-6 py-3 rounded-xl font-medium transition disabled:opacity-50">
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
                        <h4 className="font-bold mb-3"><i className="fas fa-bolt text-yellow-400 mr-2"></i>빠른 질문</h4>
                        <div className="space-y-2">
                            {quickQuestions.map((q, idx) => (
                                <button key={idx} onClick={() => setInputText(q)}
                                    className="w-full text-left bg-gray-700 hover:bg-gray-600 rounded-lg px-3 py-2 text-sm text-gray-300 transition">{q}</button>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
                        <h4 className="font-bold mb-3"><i className="fas fa-brain text-purple-400 mr-2"></i>AI 역량</h4>
                        <div className="space-y-2 text-sm">
                            {['18개 세법 완전 학습', '30,000+ 판례/예규 참조', '실시간 세법 업데이트', '세액 자동 계산', '절세 전략 제안'].map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <i className="fas fa-check-circle text-green-400"></i>
                                    <span className="text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-yellow-900/20 rounded-2xl p-4 border border-yellow-500/30">
                        <h4 className="font-bold mb-2 text-yellow-400"><i className="fas fa-exclamation-triangle mr-2"></i>주의사항</h4>
                        <p className="text-sm text-yellow-200/80">AI 상담은 일반적인 세무 정보를 제공합니다. 구체적인 세무 처리는 관할 세무서나 세무사와 상담하세요.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
