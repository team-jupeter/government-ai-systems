const AIConsultation = () => {
    const [query, setQuery] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const examples = ['국가데이터처의 역할은?', '5계층 구조 설명해주세요', '부처 간 연계는 어떻게?', '개인정보 보호 방법은?'];
    
    const sendQuery = async (q) => {
        const question = q || query;
        if (!question.trim()) return;
        setMessages(prev => [...prev, { role: 'user', content: question }]);
        setQuery(''); setLoading(true);
        try {
            const res = await fetch('/api/national-data-registry/ai-consultation', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: question })
            });
            const data = await res.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.response || data.error }]);
        } catch (e) {
            setMessages(prev => [...prev, { role: 'assistant', content: '연결 오류가 발생했습니다.' }]);
        }
        setLoading(false);
    };
    
    return (
        <section className="py-16 px-4 bg-gray-800">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2"><i className="fas fa-comments mr-3 text-blue-400"></i>AI 상담</h2>
                    <p className="text-gray-400">국가데이터처에 대해 질문하세요</p>
                </div>
                <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="h-80 overflow-y-auto p-4 space-y-3">
                        {messages.length === 0 ? (
                            <div className="text-center py-8"><i className="fas fa-database text-4xl text-blue-400 opacity-50 mb-4"></i>
                                <p className="text-gray-400 mb-4">무엇이든 물어보세요</p>
                                <div className="flex flex-wrap justify-center gap-2">{examples.map((q, i) => (
                                    <button key={i} onClick={() => sendQuery(q)} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">{q}</button>))}</div>
                            </div>
                        ) : (messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-xl text-sm whitespace-pre-wrap ${m.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>{m.content}</div>
                            </div>)))}
                        {loading && <div className="flex justify-start"><div className="bg-gray-700 p-3 rounded-xl"><i className="fas fa-spinner fa-spin mr-2"></i>응답 생성 중...</div></div>}
                    </div>
                    <div className="border-t border-gray-700 p-3 flex gap-2">
                        <input type="text" value={query} onChange={e => setQuery(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendQuery()}
                            placeholder="질문 입력..." disabled={loading} className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2" />
                        <button onClick={() => sendQuery()} disabled={loading || !query.trim()} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg">
                            <i className="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        </section>
    );
};
