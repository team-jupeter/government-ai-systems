const AIConsultation = () => {
    const [query, setQuery] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [statusMsg, setStatusMsg] = React.useState('');
    
    const examples = ['의약품 허가 절차는?', '임상시험 승인 기간은?', 'A2A 프로토콜이란?', '오픈해시 검증 원리는?'];
    
    const statusMessages = [
        '🔍 질문 분석 중...',
        '📚 관련 법령 검색 중...',
        '🏥 식약처 데이터베이스 조회 중...',
        '🤖 AI Agent 응답 생성 중...',
        '✅ 답변 최종 검토 중...'
    ];
    
    const sendQuery = async (q) => {
        const question = q || query;
        if (!question.trim()) return;
        setMessages(prev => [...prev, { role: 'user', content: question }]);
        setQuery(''); 
        setLoading(true);
        setProgress(0);
        setStatusMsg(statusMessages[0]);
        
        // 진행 상태 업데이트
        let msgIndex = 0;
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const newProgress = Math.min(prev + Math.random() * 15 + 5, 90);
                return newProgress;
            });
            msgIndex = Math.min(msgIndex + 1, statusMessages.length - 1);
            setStatusMsg(statusMessages[msgIndex]);
        }, 2500);
        
        try {
            const res = await fetch('/api/food-drug-safety/ai-consultation', { 
                method: 'POST', 
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({ query: question }) 
            });
            const data = await res.json();
            clearInterval(progressInterval);
            setProgress(100);
            setStatusMsg('✅ 완료!');
            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'assistant', content: data.response || data.error, error: !!data.error }]);
                setLoading(false);
                setProgress(0);
            }, 500);
        } catch (e) { 
            clearInterval(progressInterval);
            setMessages(prev => [...prev, { role: 'assistant', content: '오류가 발생했습니다.', error: true }]); 
            setLoading(false);
            setProgress(0);
        }
    };
    
    return (
        <section className="py-16 px-4 bg-gray-900">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2"><i className="fas fa-robot mr-3 text-green-400"></i>AI 상담</h2>
                    <p className="text-gray-400">식의약 안전 관련 무엇이든 물어보세요</p>
                </div>
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="h-80 overflow-y-auto p-4 space-y-3">
                        {messages.length === 0 ? (
                            <div className="text-center py-8">
                                <i className="fas fa-pills text-4xl text-green-400 opacity-50 mb-4"></i>
                                <p className="text-gray-400 mb-4">식의약 안전에 대해 질문하세요</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {examples.map((q, i) => (
                                        <button key={i} onClick={() => sendQuery(q)} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">{q}</button>
                                    ))}
                                </div>
                            </div>
                        ) : messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-xl text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-green-600' : msg.error ? 'bg-red-900/30' : 'bg-gray-700'}`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-700 p-4 rounded-xl w-full max-w-[80%]">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                            <i className="fas fa-robot text-sm"></i>
                                        </div>
                                        <span className="text-green-400 font-medium">{statusMsg}</span>
                                    </div>
                                    <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                                        <div 
                                            className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-500"
                                            style={{width: `${progress}%`}}
                                        ></div>
                                    </div>
                                    <div className="text-xs text-gray-400 text-right">{Math.round(progress)}%</div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="border-t border-gray-700 p-3 flex gap-2">
                        <input 
                            type="text" 
                            value={query} 
                            onChange={e => setQuery(e.target.value)} 
                            onKeyPress={e => e.key === 'Enter' && sendQuery()} 
                            placeholder="질문을 입력하세요..." 
                            disabled={loading} 
                            className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-3 py-2" 
                        />
                        <button 
                            onClick={() => sendQuery()} 
                            disabled={loading || !query.trim()} 
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg"
                        >
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
