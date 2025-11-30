const AIConsultation = () => {
    const [query, setQuery] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const exampleQuestions = [
        "대통령실 AI 자동화 시스템의 구조를 설명해주세요",
        "국가AI정책비서관실의 역할은 무엇인가요?",
        "부처간 AI 협업은 어떻게 이루어지나요?",
        "OpenHash 기반 데이터 무결성 검증이란?",
        "경제성장수석 산하 비서관실을 알려주세요"
    ];

    const handleSubmit = async () => {
        if (!query.trim() || loading) return;

        const userMessage = { role: 'user', content: query };
        setMessages(prev => [...prev, userMessage]);
        setLoading(true);
        setQuery('');

        try {
            const res = await fetch('/api/presidential-office/ai-consultation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });
            const data = await res.json();

            if (data.success) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: data.response,
                    hash: data.verification?.hash
                }]);
            } else {
                setMessages(prev => [...prev, {
                    role: 'error',
                    content: data.error || '응답 처리 중 오류가 발생했습니다.'
                }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'error',
                content: '서버 연결 오류가 발생했습니다.'
            }]);
        }

        setLoading(false);
    };

    return (
        <section className="py-12 px-4 bg-gray-800/50">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-2">
                    <i className="fas fa-comments mr-3 text-blue-500"></i>
                    AI 통합 상담 시스템
                </h2>
                <p className="text-gray-400 text-center mb-8">대통령실 전체 AI 에이전트와 상담하세요</p>

                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    {/* 메시지 영역 */}
                    <div className="h-96 overflow-y-auto p-6 space-y-4">
                        {messages.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 pulse-blue">
                                    <i className="fas fa-robot text-3xl"></i>
                                </div>
                                <h3 className="text-xl font-bold mb-2">대통령실 AI 상담 시스템</h3>
                                <p className="text-gray-400 text-sm mb-6">
                                    30개 AI 에이전트와 18개 정부부처가 협업하여 답변합니다
                                </p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {exampleQuestions.map((q, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setQuery(q)}
                                            className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg text-sm text-gray-300 transition-colors"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] rounded-xl p-4 ${
                                        msg.role === 'user' ? 'bg-blue-600' :
                                        msg.role === 'error' ? 'bg-red-900/50 border border-red-700' :
                                        'bg-gray-700'
                                    }`}>
                                        {msg.role !== 'user' && (
                                            <div className="flex items-center mb-2">
                                                <div className="w-6 h-6 bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-full flex items-center justify-center mr-2">
                                                    <i className="fas fa-landmark text-xs"></i>
                                                </div>
                                                <span className="text-yellow-400 text-sm font-semibold">대통령실 AI</span>
                                            </div>
                                        )}
                                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                        {msg.hash && (
                                            <p className="text-xs text-gray-500 mt-2 font-mono">
                                                <i className="fas fa-fingerprint mr-1"></i>
                                                {msg.hash.substring(0, 24)}...
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-700 rounded-xl p-4">
                                    <div className="flex items-center space-x-2">
                                        <i className="fas fa-spinner fa-spin text-blue-400"></i>
                                        <span className="text-gray-400 text-sm">AI가 응답을 생성하고 있습니다...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 입력 영역 */}
                    <div className="border-t border-gray-700 p-4">
                        <div className="flex space-x-3">
                            <input
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                                placeholder="질문을 입력하세요..."
                                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={loading || !query.trim()}
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 transition-all"
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            OpenHash 기반 무결성 검증 적용 | Claude AI 기반 응답
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
