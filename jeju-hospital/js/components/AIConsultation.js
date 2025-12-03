const AIConsultation = () => {
    const [query, setQuery] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [statusMsg, setStatusMsg] = React.useState('');
    const examples = ['제주대병원 예약 방법은?','AI 진단은 어떻게 작동하나요?','프라이빗 금고란?','보건소 서비스는?'];
    const statusMessages = ['🔍 질문 분석 중...','📚 의료 데이터 검색 중...','🏥 제주 권역 정보 조회 중...','🤖 의료 AI 응답 생성 중...','✅ 답변 검토 중...'];
    const sendQuery = async (q) => {
        const question = q || query;
        if (!question.trim()) return;
        setMessages(prev => [...prev, {role:'user',content:question}]);
        setQuery(''); setLoading(true); setProgress(0); setStatusMsg(statusMessages[0]);
        let idx = 0;
        const interval = setInterval(() => {
            setProgress(prev => Math.min(prev + Math.random()*15+5, 90));
            idx = Math.min(idx+1, statusMessages.length-1);
            setStatusMsg(statusMessages[idx]);
        }, 2500);
        try {
            const res = await fetch('/api/jeju-hospital/ai-consultation',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query:question})});
            const data = await res.json();
            clearInterval(interval);
            setProgress(100); setStatusMsg('✅ 완료!');
            setTimeout(() => {
                setMessages(prev => [...prev, {role:'assistant',content:data.response||data.error,error:!!data.error}]);
                setLoading(false); setProgress(0);
            }, 500);
        } catch(e) {
            clearInterval(interval);
            setMessages(prev => [...prev, {role:'assistant',content:'오류 발생',error:true}]);
            setLoading(false); setProgress(0);
        }
    };
    return (
        <section className="py-16 px-4 bg-gray-900">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8"><h2 className="text-3xl font-bold mb-2"><i className="fas fa-comment-medical mr-3 text-blue-400"></i>AI 의료 상담</h2><p className="text-gray-400">제주 권역 의료 시스템에 대해 질문하세요</p></div>
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="h-80 overflow-y-auto p-4 space-y-3">
                        {messages.length===0 ? (
                            <div className="text-center py-8"><i className="fas fa-stethoscope text-4xl text-blue-400 opacity-50 mb-4"></i><p className="text-gray-400 mb-4">의료 시스템에 대해 질문하세요</p><div className="flex flex-wrap justify-center gap-2">{examples.map((q,i)=><button key={i} onClick={()=>sendQuery(q)} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">{q}</button>)}</div></div>
                        ) : messages.map((m,i)=>(
                            <div key={i} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}><div className={`max-w-[80%] p-3 rounded-xl text-sm whitespace-pre-wrap ${m.role==='user'?'bg-blue-600':m.error?'bg-red-900/30':'bg-gray-700'}`}>{m.content}</div></div>
                        ))}
                        {loading && (
                            <div className="flex justify-start"><div className="bg-gray-700 p-4 rounded-xl w-full max-w-[80%]">
                                <div className="flex items-center gap-3 mb-3"><div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"><i className="fas fa-robot text-sm"></i></div><span className="text-blue-400 font-medium">{statusMsg}</span></div>
                                <div className="w-full bg-gray-600 rounded-full h-2 mb-2"><div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all" style={{width:`${progress}%`}}></div></div>
                                <div className="text-xs text-gray-400 text-right">{Math.round(progress)}%</div>
                            </div></div>
                        )}
                    </div>
                    <div className="border-t border-gray-700 p-3 flex gap-2">
                        <input type="text" value={query} onChange={e=>setQuery(e.target.value)} onKeyPress={e=>e.key==='Enter'&&sendQuery()} placeholder="질문 입력..." disabled={loading} className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-3 py-2"/>
                        <button onClick={()=>sendQuery()} disabled={loading||!query.trim()} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg"><i className="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        </section>
    );
};
