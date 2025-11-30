const DataSovereignty = () => {
    const [selectedAction, setSelectedAction] = React.useState(null);
    const [processing, setProcessing] = React.useState(false);
    
    const rights = [
        { id: 'view', name: '데이터 조회', icon: '👁️', color: 'blue', law: '개인정보보호법',
          result: { storage: '개인 단말기 Edge Storage', cloud: '해시값(32B)만 저장', encryption: 'AES-256-GCM' } },
        { id: 'delete', name: '삭제권', icon: '🗑️', color: 'red', law: 'PIPA 삭제권',
          result: { action: 'Layer 4 재조회 차단', integrity: 'Merkle Tree 무결성 유지', time: '2.1초' } },
        { id: 'export', name: '이동권', icon: '📤', color: 'green', law: 'GDPR Article 20',
          result: { format: 'JSON export', targets: '다른 서비스/해외', signature: 'CRYSTALS-Dilithium' } },
        { id: 'objection', name: '이의제기', icon: '⚖️', color: 'purple', law: 'PIPA 37-2',
          result: { shap: 'AI 판단 근거 설명', factors: '법적근거 45%, 공익 35%', appeal: '이의신청 가능' } }
    ];
    
    const exerciseRight = (right) => { setProcessing(true); setSelectedAction(right); setTimeout(() => setProcessing(false), 1500); };
    
    return (
        <section className="py-16 px-4 bg-gray-900">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4"><i className="fas fa-user-shield mr-3 text-purple-400"></i>개인 데이터 주권 보장</h2>
                    <p className="text-gray-400">원본은 개인 단말기에만 | 클라우드는 해시(32B)만 보관</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="text-center">
                            <div className="w-24 h-24 mx-auto bg-blue-600/30 rounded-2xl flex items-center justify-center mb-4 border-2 border-blue-500">
                                <i className="fas fa-mobile-alt text-4xl text-blue-400"></i></div>
                            <h3 className="text-xl font-bold text-blue-400 mb-2">개인 단말기</h3>
                            <p className="text-sm text-gray-400">원본 데이터 (AES-256-GCM)</p>
                        </div>
                        <div className="text-center">
                            <div className="w-24 h-24 mx-auto bg-gray-700/50 rounded-2xl flex items-center justify-center mb-4 border-2 border-gray-600">
                                <i className="fas fa-cloud text-4xl text-gray-400"></i></div>
                            <h3 className="text-xl font-bold text-gray-400 mb-2">오픈해시 네트워크</h3>
                            <p className="text-sm text-gray-500">해시값만 저장 (32 bytes)</p>
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                    {rights.map(right => (
                        <button key={right.id} onClick={() => exerciseRight(right)} disabled={processing}
                            className={`p-6 rounded-xl border-2 text-left transition-all ${selectedAction?.id === right.id ? 'border-blue-500 bg-blue-900/30' : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}>
                            <div className="text-4xl mb-3">{right.icon}</div>
                            <h3 className="font-bold text-blue-400 mb-1">{right.name}</h3>
                            <p className="text-xs text-gray-500">{right.law}</p>
                        </button>
                    ))}
                </div>
                {selectedAction && (
                    <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-500/30">
                        {processing ? (<div className="text-center py-8"><i className="fas fa-spinner fa-spin text-4xl text-gray-400"></i><p className="mt-4">처리 중...</p></div>)
                        : (<div><h3 className="font-bold text-blue-400 mb-4"><i className="fas fa-check-circle mr-2"></i>{selectedAction.name} 완료</h3>
                            <div className="grid md:grid-cols-3 gap-4">{Object.entries(selectedAction.result).map(([k,v],i) => (
                                <div key={i} className="bg-gray-900 p-4 rounded-lg"><div className="text-xs text-gray-500 mb-1">{k}</div><div className="font-medium">{v}</div></div>))}</div></div>)}
                    </div>
                )}
            </div>
        </section>
    );
};
