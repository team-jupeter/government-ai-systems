const PrivateVault = () => {
    const [vault, setVault] = React.useState(null);
    const [verifyResult, setVerifyResult] = React.useState(null);
    React.useEffect(() => { fetch('/api/jeju-hospital/private-vault/status',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({})}).then(r=>r.json()).then(setVault); }, []);
    const verify = async () => {
        const res = await fetch('/api/jeju-hospital/openhash/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({hash:'test'})});
        setVerifyResult(await res.json());
    };
    const layers = [{id:'Layer3',name:'제주대학병원',color:'red'},{id:'Layer2',name:'의료원',color:'yellow'},{id:'Layer1',name:'보건소',color:'green'}];
    return (
        <section className="py-16 px-4 bg-gray-800">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8"><h2 className="text-3xl font-bold mb-4"><i className="fas fa-vault mr-3 text-amber-400"></i>프라이빗 데이터 금고</h2><p className="text-gray-400">의료 기록은 환자 단말기에만 저장 | 클라우드에는 해시만 기록</p></div>
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-gray-900 rounded-xl p-6 border border-amber-500/30">
                        <h3 className="font-bold text-amber-400 mb-4"><i className="fas fa-shield-alt mr-2"></i>금고 상태</h3>
                        {vault?.vault ? (
                            <div className="space-y-4">
                                <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30 flex items-center gap-4"><div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center"><i className="fas fa-lock text-xl"></i></div><div><div className="font-bold text-green-400">보안 상태: 정상</div><div className="text-sm text-gray-400">무결성 검증 완료</div></div></div>
                                <div className="bg-gray-800 p-4 rounded"><div className="flex justify-between mb-3"><span className="text-gray-400">총 기록</span><span className="text-2xl font-bold text-amber-400">{vault.vault.total_records}건</span></div><div className="grid grid-cols-2 gap-2">{vault.vault.categories && Object.entries(vault.vault.categories).map(([k,v])=><div key={k} className="bg-gray-900 p-2 rounded flex justify-between text-sm"><span className="text-gray-400">{k}</span><span>{v}</span></div>)}</div></div>
                                <div className="bg-gray-800 p-4 rounded"><div className="text-sm text-gray-400 mb-2">저장 위치</div><div className="flex items-center gap-3 p-2 bg-gray-900 rounded mb-2"><i className="fas fa-mobile-alt text-blue-400 w-6"></i><span className="flex-1">원본: 환자 단말기</span><span className="px-2 py-1 bg-blue-600 rounded text-xs">AES-256</span></div><div className="flex items-center gap-3 p-2 bg-gray-900 rounded"><i className="fas fa-cloud text-purple-400 w-6"></i><span className="flex-1">해시만: 오픈해시</span><span className="px-2 py-1 bg-purple-600 rounded text-xs">SHA-256</span></div></div>
                            </div>
                        ) : <div className="text-center py-8"><i className="fas fa-spinner fa-spin text-2xl text-amber-400"></i></div>}
                    </div>
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                        <h3 className="font-bold text-blue-400 mb-4"><i className="fas fa-layer-group mr-2"></i>오픈해시 3계층</h3>
                        <div className="space-y-3 mb-6">{layers.map(l=><div key={l.id} className={`p-4 rounded-lg border-l-4 border-${l.color}-500 bg-gray-800`}><div className="flex justify-between items-center"><div className="flex items-center gap-3"><div className={`w-10 h-10 bg-${l.color}-600/30 rounded-full flex items-center justify-center`}><i className={`fas fa-hospital text-${l.color}-400`}></i></div><div><div className="font-medium">{l.id}</div><div className="text-xs text-gray-400">{l.name}</div></div></div></div></div>)}</div>
                        <button onClick={verify} className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium mb-4"><i className="fas fa-check-double mr-2"></i>무결성 검증</button>
                        {verifyResult?.verification && <div className="bg-green-900/30 p-4 rounded border border-green-500"><div className="flex items-center gap-2 mb-2"><i className="fas fa-check-circle text-green-400"></i><span className="font-bold">검증 성공</span></div><div className="text-sm space-y-1"><div className="flex justify-between"><span className="text-gray-400">계층</span><span>{verifyResult.verification.layer}</span></div><div className="flex justify-between"><span className="text-gray-400">신뢰도</span><span className="text-green-400">{verifyResult.verification.trust_score}%</span></div><div className="flex justify-between"><span className="text-gray-400">검증시간</span><span>{verifyResult.verification.verification_time_ms}ms</span></div></div></div>}
                    </div>
                </div>
            </div>
        </section>
    );
};
