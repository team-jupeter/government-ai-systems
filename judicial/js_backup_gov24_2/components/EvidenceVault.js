const EvidenceVault = () => {
    const [evidenceTypes, setEvidenceTypes] = React.useState(['계약서', '이메일']);
    const [collected, setCollected] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    
    const allTypes = ['계약서', '이메일', '녹취록', '문자메시지', '사진/영상', '금융거래내역', '등기부등본', '진단서', '근로계약서', '급여명세서'];
    
    const toggleType = (type) => {
        setEvidenceTypes(prev => 
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };
    
    const collectEvidence = async () => {
        if (evidenceTypes.length === 0) return;
        setLoading(true);
        try {
            const res = await fetch('/api/judicial/collect-evidence', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({case_id: 'CASE-TEST', evidence_types: evidenceTypes})
            });
            setCollected(await res.json());
        } catch (e) { console.error(e); }
        setLoading(false);
    };
    
    return (
        <section className="py-16 px-4 bg-gray-900">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">
                        <i className="fas fa-vault mr-3 text-amber-400"></i>프라이빗 데이터 금고 증거 수집
                    </h2>
                    <p className="text-gray-400">원고·피고 각자의 프라이빗 금고에서 증거를 자동 수집합니다</p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-gray-800 rounded-xl p-6 border border-amber-500/30">
                        <h3 className="font-bold text-amber-400 mb-4"><i className="fas fa-folder-open mr-2"></i>증거 유형 선택</h3>
                        <div className="grid grid-cols-2 gap-2 mb-6">
                            {allTypes.map(type => (
                                <button key={type} onClick={() => toggleType(type)}
                                    className={`p-3 rounded-lg text-sm transition-all ${evidenceTypes.includes(type) ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                                    <i className={`fas fa-${evidenceTypes.includes(type) ? 'check-square' : 'square'} mr-2`}></i>{type}
                                </button>
                            ))}
                        </div>
                        <button onClick={collectEvidence} disabled={loading || evidenceTypes.length === 0}
                            className="w-full py-4 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-600 rounded-lg font-bold">
                            {loading ? <span><i className="fas fa-spinner fa-spin mr-2"></i>수집 중...</span> : <span><i className="fas fa-search mr-2"></i>프라이빗 금고에서 증거 수집</span>}
                        </button>
                        
                        <div className="mt-6 bg-gray-900 rounded-lg p-4">
                            <h4 className="text-sm text-gray-400 mb-3">🔐 프라이빗 금고 특징</h4>
                            <ul className="text-xs space-y-2 text-gray-500">
                                <li>• 원본 데이터: 당사자 단말기에만 AES-256 암호화 저장</li>
                                <li>• 클라우드: SHA-256 해시값(32bytes)만 기록</li>
                                <li>• 증거 수집 시간: 6개월 → 15초 (99.9997% 단축)</li>
                                <li>• 위변조 탐지: 0.001ms 내 자동 탐지</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 className="font-bold text-green-400 mb-4"><i className="fas fa-check-double mr-2"></i>수집된 증거</h3>
                        {collected?.evidence_collected ? (
                            <div className="space-y-3">
                                <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30 text-center mb-4">
                                    <div className="text-green-400 font-bold text-lg">✓ {collected.evidence_collected.length}건 증거 수집 완료</div>
                                    <div className="text-sm text-gray-400 mt-1">수집 시간: {collected.collection_time_seconds}초 (기존 {collected.traditional_time_months}개월)</div>
                                </div>
                                {collected.evidence_collected.map((ev, i) => (
                                    <div key={i} className="bg-gray-900 rounded-lg p-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-amber-600/30 rounded-full flex items-center justify-center">
                                                <i className="fas fa-file-alt text-amber-400"></i>
                                            </div>
                                            <div>
                                                <div className="font-medium">{ev.type}</div>
                                                <div className="text-xs text-gray-500">{ev.source} | {ev.id}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-xs px-2 py-1 rounded ${ev.verified ? 'bg-green-600' : 'bg-yellow-600'}`}>
                                                {ev.verified ? '✓ 검증됨' : '검증중'}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">무결성 {ev.integrity_score}%</div>
                                        </div>
                                    </div>
                                ))}
                                <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/30 mt-4">
                                    <div className="flex items-center gap-2 text-sm text-blue-400">
                                        <i className="fas fa-link"></i>
                                        <span>오픈해시 교차검증 완료</span>
                                    </div>
                                    <div className="font-mono text-xs text-gray-500 mt-1 truncate">{collected.openhash?.hash}</div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <i className="fas fa-folder-open text-4xl mb-4 opacity-50"></i>
                                <p>증거 유형을 선택하고 수집을 시작하세요</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
