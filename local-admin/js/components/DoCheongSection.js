const DoCheongSection = () => {
    const [doDepts, setDoDepts] = React.useState(null);
    const [siDepts, setSiDepts] = React.useState(null);
    const [selectedLevel, setSelectedLevel] = React.useState('do');
    const [selectedDept, setSelectedDept] = React.useState('');
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        fetch('/api/local-admin/do/departments').then(r => r.json()).then(setDoDepts);
        fetch('/api/local-admin/si/departments').then(r => r.json()).then(setSiDepts);
    }, []);
    const processRequest = async () => {
        setLoading(true);
        const endpoint = selectedLevel === 'do' ? '/api/local-admin/do/process' : '/api/local-admin/si/process';
        try {
            const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ department: selectedDept, task_type: 'general', citizen_pdv_id: 'PDV_' + Date.now() }) });
            setResult(await response.json());
        } catch (e) { setResult({ error: e.message }); }
        setLoading(false);
    };
    const currentDepts = selectedLevel === 'do' ? doDepts?.departments : siDepts?.departments;
    return (
        <section className="py-16 px-4 bg-gray-900">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8"><h2 className="text-3xl font-bold mb-4"><i className="fas fa-landmark mr-3 text-blue-400"></i>도청 · 시청 AI</h2><p className="text-gray-400">광역 및 기초자치단체 행정 업무 AI 자동화</p></div>
                <div className="flex justify-center gap-4 mb-8">
                    <button onClick={() => setSelectedLevel('do')} className={`px-6 py-3 rounded-lg font-bold ${selectedLevel === 'do' ? 'bg-blue-600' : 'bg-gray-700'}`}>🏛️ 도청 (6실국)</button>
                    <button onClick={() => setSelectedLevel('si')} className={`px-6 py-3 rounded-lg font-bold ${selectedLevel === 'si' ? 'bg-cyan-600' : 'bg-gray-700'}`}>🏢 시청 (5국)</button>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 className="font-bold mb-4 text-lg">{selectedLevel === 'do' ? '도청' : '시청'} 부서 선택</h3>
                        <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                            {currentDepts && Object.entries(currentDepts).map(([bureau, depts]) => (<div key={bureau} className="space-y-1"><div className="text-xs text-gray-500 font-bold">{bureau}</div>{Object.keys(depts).map(dept => (<button key={dept} onClick={() => setSelectedDept(dept)} className={`w-full text-left text-sm p-2 rounded ${selectedDept === dept ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}>{dept}</button>))}</div>))}
                        </div>
                        <button onClick={processRequest} disabled={loading || !selectedDept} className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg font-medium">{loading ? '처리 중...' : 'AI 업무 처리'}</button>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 className="font-bold mb-4 text-lg text-green-400"><i className="fas fa-check-circle mr-2"></i>처리 결과</h3>
                        {result && !result.error ? (<div className="space-y-4"><div className="p-4 bg-green-900/30 rounded-lg border border-green-500 text-center"><div className="text-3xl mb-2">✅</div><div className="text-green-400 font-bold text-xl">{result.result?.status}</div></div><div className="grid grid-cols-2 gap-3"><div className="bg-gray-900 p-3 rounded text-center"><div className="text-xs text-gray-500">AI 처리</div><div className="text-xl font-bold text-blue-400">{result.processing?.processing_time_seconds}초</div></div><div className="bg-gray-900 p-3 rounded text-center"><div className="text-xs text-gray-500">기존 소요</div><div className="text-xl font-bold text-red-400">{result.processing?.traditional_time_days}일</div></div></div><div className="p-3 bg-yellow-900/20 rounded text-center"><span className="text-yellow-400 font-bold">{result.processing?.efficiency_gain}</span> 효율 향상</div></div>) : (<div className="text-center text-gray-500 py-12"><i className="fas fa-landmark text-4xl mb-4"></i><p>부서 선택 후 처리하면 결과가 표시됩니다</p></div>)}
                    </div>
                </div>
            </div>
        </section>
    );
};
