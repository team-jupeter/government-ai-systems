const PolicyExecution = () => {
    const [policyType, setPolicyType] = React.useState('consumption_voucher');
    const [amount, setAmount] = React.useState(300000);
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const policies = [{ id: 'consumption_voucher', name: '소비쿠폰', icon: '🎫' }, { id: 'disaster_relief', name: '재난지원금', icon: '🆘' }, { id: 'child_allowance', name: '아동수당', icon: '👶' }, { id: 'basic_pension', name: '기초연금', icon: '👴' }];
    const executePolicy = async () => {
        setLoading(true); setProgress(0);
        const interval = setInterval(() => setProgress(p => Math.min(p + 20, 95)), 150);
        try {
            const response = await fetch('/api/local-admin/policy/execute', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ policy_type: policyType, amount }) });
            clearInterval(interval); setProgress(100);
            setResult(await response.json());
        } catch (e) { clearInterval(interval); setResult({ error: e.message }); }
        setLoading(false);
    };
    return (
        <section className="py-16 px-4 bg-gray-900">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8"><span className="text-xs bg-orange-600 text-white px-2 py-1 rounded-full mb-4 inline-block">중앙정부 연계</span><h2 className="text-3xl font-bold mb-4"><i className="fas fa-bolt mr-3 text-orange-400"></i>실시간 정책 집행</h2><p className="text-gray-400">중앙정부 정책 → 1초 이내 전 도민 집행</p></div>
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-gray-800 rounded-xl p-6 border border-orange-500/30"><h3 className="font-bold mb-4 text-orange-400">정책 설정</h3><div className="grid grid-cols-4 gap-2 mb-4">{policies.map(p => (<button key={p.id} onClick={() => setPolicyType(p.id)} className={`p-3 rounded-lg text-center ${policyType === p.id ? 'bg-orange-600' : 'bg-gray-700'}`}><div className="text-2xl">{p.icon}</div><div className="text-xs mt-1">{p.name}</div></button>))}</div><div className="mb-4"><label className="text-sm text-gray-400 block mb-1">1인당 지급액 (원)</label><input type="number" value={amount} onChange={e => setAmount(parseInt(e.target.value) || 0)} className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2" /></div><button onClick={executePolicy} disabled={loading} className="w-full py-4 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 rounded-lg font-bold text-lg">{loading ? '집행 중...' : '🚀 정책 즉시 집행'}</button>{loading && (<div className="mt-4"><div className="flex justify-between text-sm mb-1"><span>진행률</span><span>{progress}%</span></div><div className="w-full bg-gray-700 rounded-full h-2"><div className="bg-orange-500 h-2 rounded-full transition-all" style={{width: progress + '%'}}></div></div></div>)}</div>
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700"><h3 className="font-bold mb-4 text-green-400">집행 결과</h3>{result && !result.error ? (<div className="space-y-4"><div className="p-4 bg-green-900/30 rounded-lg border border-green-500 text-center"><div className="text-3xl mb-2">✅</div><div className="text-xl font-bold text-green-400">정책 집행 완료</div><div className="text-gray-400 text-sm mt-1">{result.execution?.processing_time_seconds}초 만에 완료</div></div><div className="grid grid-cols-2 gap-3"><div className="bg-gray-900 p-3 rounded text-center"><div className="text-xs text-gray-500">대상 인원</div><div className="text-xl font-bold text-blue-400">{result.execution?.target_population?.toLocaleString()}명</div></div><div className="bg-gray-900 p-3 rounded text-center"><div className="text-xs text-gray-500">총 집행액</div><div className="text-xl font-bold text-yellow-400">{(result.execution?.total_amount_distributed / 100000000).toFixed(1)}억원</div></div></div></div>) : (<div className="text-center text-gray-500 py-12"><i className="fas fa-rocket text-4xl mb-4 opacity-50"></i><p>정책 설정 후 집행하면 결과가 표시됩니다</p></div>)}</div>
                </div>
            </div>
        </section>
    );
};
