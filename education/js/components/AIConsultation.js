const AIConsultation = () => {
    const [query, setQuery] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const examples = ['7단계 프로세스란 무엇인가요?', '통합 효용 0.801의 의미는?', '실시간 진로 수정은 어떻게 하나요?', 'AI가 대체할 수 없는 직업은?'];
    const sendQuery = async (q) => {
        const question = q || query;
        if (!question.trim()) return;
        setMessages(prev => [...prev, { role: 'user', content: question }]);
        setQuery(''); setLoading(true);
        try {
            const res = await fetch('/api/education/ai-consultation', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ query: question }) });
            const data = await res.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.response || data.error, error: !!data.error }]);
        } catch (e) { setMessages(prev => [...prev, { role: 'assistant', content: '오류가 발생했습니다.', error: true }]); }
        setLoading(false);
    };
    return (
        <section className="py-16 px-4 bg-gray-900">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8"><h2 className="text-3xl font-bold mb-2"><i className="fas fa-robot mr-3 text-purple-400"></i>AI 교육 상담</h2><p className="text-gray-400">7단계 시스템에 대해 무엇이든 물어보세요</p></div>
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="h-80 overflow-y-auto p-4 space-y-3">{messages.length === 0 ? (<div className="text-center py-8"><i className="fas fa-graduation-cap text-4xl text-purple-400 opacity-50 mb-4"></i><p className="text-gray-400 mb-4">교육/진로에 대해 질문하세요</p><div className="flex flex-wrap justify-center gap-2">{examples.map((q, i) => (<button key={i} onClick={() => sendQuery(q)} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">{q}</button>))}</div></div>) : messages.map((msg, i) => (<div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] p-3 rounded-xl text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-purple-600' : msg.error ? 'bg-red-900/30' : 'bg-gray-700'}`}>{msg.content}</div></div>))}{loading && <div className="flex justify-start"><div className="bg-gray-700 p-3 rounded-xl text-purple-400">답변 생성 중...</div></div>}</div>
                    <div className="border-t border-gray-700 p-3 flex gap-2"><input type="text" value={query} onChange={e => setQuery(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendQuery()} placeholder="질문을 입력하세요..." disabled={loading} className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-3 py-2" /><button onClick={() => sendQuery()} disabled={loading || !query.trim()} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded-lg"><i className="fas fa-paper-plane"></i></button></div>
                </div>
            </div>
        </section>
    );
};
