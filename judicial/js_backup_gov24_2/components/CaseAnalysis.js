const CaseAnalysis = () => {
    const [description, setDescription] = React.useState('');
    const [caseType, setCaseType] = React.useState('civil');
    const [claimAmount, setClaimAmount] = React.useState(50000000);
    const [role, setRole] = React.useState('plaintiff');
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [statusMsg, setStatusMsg] = React.useState('');
    
    const caseTypes = [
        {id: 'civil', name: '민사소송', icon: '📋'},
        {id: 'criminal', name: '형사소송', icon: '🔒'},
        {id: 'administrative', name: '행정소송', icon: '🏛️'},
        {id: 'labor', name: '노동소송', icon: '👷'},
        {id: 'ip', name: '지식재산', icon: '💡'}
    ];
    
    const examples = [
        '임대차 보증금 1억원을 돌려받지 못하고 있습니다. 계약 만료 후 6개월이 지났습니다.',
        '회사에서 부당해고를 당했습니다. 3년간 근무했고 별다른 징계 이력이 없습니다.',
        '교통사고로 6개월 치료를 받았습니다. 상대방 보험사가 합의금을 너무 낮게 제시합니다.',
        '온라인에서 허위 사실로 명예가 훼손되었습니다. 게시물이 1만회 이상 조회되었습니다.'
    ];
    
    const statusMessages = [
        '🔍 사건 내용 분석 중...',
        '📚 관련 법률 조항 검색 중...',
        '🌐 글로벌 8개국 판례 비교 중...',
        '🤖 AI 승소율 예측 모델 실행 중...',
        '📊 유리/불리 요소 분석 중...',
        '✅ 최종 분석 결과 정리 중...'
    ];
    
    const analyzeCase = async () => {
        if (!description.trim()) return;
        setLoading(true);
        setProgress(0);
        setStatusMsg(statusMessages[0]);
        setResult(null);
        
        let msgIndex = 0;
        const interval = setInterval(() => {
            setProgress(prev => Math.min(prev + Math.random() * 12 + 5, 92));
            msgIndex = Math.min(msgIndex + 1, statusMessages.length - 1);
            setStatusMsg(statusMessages[msgIndex]);
        }, 2500);
        
        try {
            const res = await fetch('/api/judicial/case-analysis', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    description,
                    case_type: caseType,
                    claim_amount: parseInt(claimAmount),
                    role
                })
            });
            const data = await res.json();
            
            clearInterval(interval);
            setProgress(100);
            setStatusMsg('✅ 분석 완료!');
            
            setTimeout(() => {
                setResult(data);
                setLoading(false);
                setProgress(0);
            }, 600);
        } catch (e) {
            clearInterval(interval);
            console.error(e);
            setLoading(false);
            setProgress(0);
        }
    };
    
    const getWinProbColor = (prob) => {
        if (prob >= 70) return 'green';
        if (prob >= 50) return 'yellow';
        if (prob >= 30) return 'orange';
        return 'red';
    };
    
    return (
        <section className="py-16 px-4 bg-gray-800">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">
                        <i className="fas fa-gavel mr-3 text-yellow-400"></i>AI 사건 분석 & 승소율 예측
                    </h2>
                    <p className="text-gray-400">프라이빗 금고에서 증거를 수집하고 AI가 승소 가능성을 분석합니다</p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* 입력 폼 */}
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                        <h3 className="font-bold text-yellow-400 mb-4">
                            <i className="fas fa-file-alt mr-2"></i>사건 정보 입력
                        </h3>
                        
                        {/* 당사자 역할 */}
                        <div className="mb-4">
                            <label className="text-sm text-gray-400 block mb-2">당사자 역할</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setRole('plaintiff')}
                                    className={`p-3 rounded-lg font-medium transition-all ${
                                        role === 'plaintiff' 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                                >
                                    <i className="fas fa-user mr-2"></i>원고 (청구인)
                                </button>
                                <button
                                    onClick={() => setRole('defendant')}
                                    className={`p-3 rounded-lg font-medium transition-all ${
                                        role === 'defendant' 
                                            ? 'bg-red-600 text-white' 
                                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                                >
                                    <i className="fas fa-user-shield mr-2"></i>피고 (피청구인)
                                </button>
                            </div>
                        </div>
                        
                        {/* 사건 유형 */}
                        <div className="mb-4">
                            <label className="text-sm text-gray-400 block mb-2">사건 유형</label>
                            <div className="grid grid-cols-5 gap-2">
                                {caseTypes.map(ct => (
                                    <button
                                        key={ct.id}
                                        onClick={() => setCaseType(ct.id)}
                                        className={`p-2 rounded-lg text-center transition-all ${
                                            caseType === ct.id 
                                                ? 'bg-yellow-600 text-white' 
                                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                        }`}
                                    >
                                        <div className="text-xl mb-1">{ct.icon}</div>
                                        <div className="text-xs">{ct.name}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        {/* 청구금액 */}
                        <div className="mb-4">
                            <label className="text-sm text-gray-400 block mb-2">청구금액</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={claimAmount}
                                    onChange={e => setClaimAmount(e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 pr-12"
                                    placeholder="청구금액"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">원</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                {parseInt(claimAmount).toLocaleString()}원
                            </div>
                        </div>
                        
                        {/* 사건 설명 */}
                        <div className="mb-4">
                            <label className="text-sm text-gray-400 block mb-2">사건 설명</label>
                            <textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="사건의 경위와 상황을 자세히 설명해주세요..."
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 h-32 resize-none"
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {examples.map((ex, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setDescription(ex)}
                                        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors truncate max-w-xs"
                                    >
                                        {ex.substring(0, 25)}...
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <button
                            onClick={analyzeCase}
                            disabled={loading || !description.trim()}
                            className="w-full py-4 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 rounded-lg font-bold text-lg transition-colors"
                        >
                            {loading ? (
                                <span><i className="fas fa-spinner fa-spin mr-2"></i>AI 분석 중...</span>
                            ) : (
                                <span><i className="fas fa-search mr-2"></i>AI 사건 분석 시작</span>
                            )}
                        </button>
                        
                        {/* 진행 표시 */}
                        {loading && (
                            <div className="mt-4 bg-gray-800 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                                        <i className="fas fa-balance-scale"></i>
                                    </div>
                                    <span className="text-yellow-400 font-medium">{statusMsg}</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                                    <div 
                                        className="bg-gradient-to-r from-yellow-500 to-amber-400 h-3 rounded-full transition-all duration-500"
                                        style={{width: `${progress}%`}}
                                    ></div>
                                </div>
                                <div className="text-xs text-gray-400 text-right">{Math.round(progress)}%</div>
                            </div>
                        )}
                    </div>
                    
                    {/* 분석 결과 */}
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                        <h3 className="font-bold text-green-400 mb-4">
                            <i className="fas fa-chart-pie mr-2"></i>AI 분석 결과
                        </h3>
                        
                        {result?.analysis ? (
                            <div className="space-y-4">
                                {/* 사건 ID */}
                                <div className="bg-gray-800 p-3 rounded flex justify-between items-center">
                                    <span className="text-gray-400">분석 ID</span>
                                    <span className="font-mono text-cyan-400 text-sm">{result.analysis.id}</span>
                                </div>
                                
                                {/* 승소율 예측 - 핵심 */}
                                <div className={`bg-${getWinProbColor(result.analysis.win_probability)}-900/30 p-6 rounded-xl border border-${getWinProbColor(result.analysis.win_probability)}-500/50`}>
                                    <div className="text-center mb-4">
                                        <div className="text-sm text-gray-400 mb-2">AI 승소율 예측</div>
                                        <div className={`text-5xl font-bold text-${getWinProbColor(result.analysis.win_probability)}-400`}>
                                            {result.analysis.win_probability}%
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            95% 신뢰구간: {result.analysis.confidence_interval?.[0]}% ~ {result.analysis.confidence_interval?.[1]}%
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-4">
                                        <div 
                                            className={`bg-gradient-to-r from-${getWinProbColor(result.analysis.win_probability)}-600 to-${getWinProbColor(result.analysis.win_probability)}-400 h-4 rounded-full animate-bar`}
                                            style={{width: `${result.analysis.win_probability}%`}}
                                        ></div>
                                    </div>
                                </div>
                                
                                {/* 사건 요약 */}
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <div className="text-sm text-gray-400 mb-2">
                                        <i className="fas fa-file-alt mr-1"></i>사건 요약
                                    </div>
                                    <p className="text-sm">{result.analysis.case_summary}</p>
                                </div>
                                
                                {/* 유리/불리 요소 */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-green-900/30 p-3 rounded-lg border border-green-500/30">
                                        <div className="text-sm text-green-400 mb-2">
                                            <i className="fas fa-plus-circle mr-1"></i>유리한 요소
                                        </div>
                                        <ul className="text-xs space-y-1">
                                            {result.analysis.favorable_factors?.map((f, i) => (
                                                <li key={i} className="flex items-start gap-1">
                                                    <span className="text-green-400">✓</span>
                                                    <span>{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-red-900/30 p-3 rounded-lg border border-red-500/30">
                                        <div className="text-sm text-red-400 mb-2">
                                            <i className="fas fa-minus-circle mr-1"></i>불리한 요소
                                        </div>
                                        <ul className="text-xs space-y-1">
                                            {result.analysis.unfavorable_factors?.map((f, i) => (
                                                <li key={i} className="flex items-start gap-1">
                                                    <span className="text-red-400">✗</span>
                                                    <span>{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                
                                {/* 비용 정보 */}
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <div className="text-sm text-gray-400 mb-2">
                                        <i className="fas fa-won-sign mr-1"></i>예상 비용
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">인지대</span>
                                            <span className="text-yellow-400">{result.analysis.litigation_fee?.toLocaleString()}원</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">예상 기간</span>
                                            <span>{result.analysis.estimated_duration_months}개월</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* 글로벌 비교 */}
                                {result.global_comparison && (
                                    <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                                        <div className="text-sm text-purple-400 mb-2">
                                            <i className="fas fa-globe mr-1"></i>글로벌 판례 비교
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div>
                                                <span className="text-gray-500">한국 평균 배상:</span>
                                                <span className="ml-1">{result.global_comparison.korea_vs_global?.korea_avg_compensation?.toLocaleString()}원</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">OECD 평균:</span>
                                                <span className="ml-1">{result.global_comparison.korea_vs_global?.global_avg_compensation?.toLocaleString()}원</span>
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-2">
                                            Z-score: {result.global_comparison.korea_vs_global?.z_score} (한국이 글로벌 대비 낮음)
                                        </div>
                                    </div>
                                )}
                                
                                {/* 권장 조치 */}
                                <div className="bg-cyan-900/30 p-3 rounded-lg border border-cyan-500/30">
                                    <div className="text-sm text-cyan-400 mb-2">
                                        <i className="fas fa-lightbulb mr-1"></i>AI 권장 조치
                                    </div>
                                    <ul className="text-xs space-y-1">
                                        {result.analysis.recommended_actions?.map((a, i) => (
                                            <li key={i}>• {a}</li>
                                        ))}
                                    </ul>
                                </div>
                                
                                {/* 오픈해시 기록 */}
                                <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/30">
                                    <div className="flex items-center gap-2 text-sm text-blue-400">
                                        <i className="fas fa-link"></i>
                                        <span>오픈해시: {result.openhash?.layer} | 신뢰도 {result.openhash?.trust_score}%</span>
                                    </div>
                                    <div className="font-mono text-xs text-gray-500 mt-1 truncate">{result.openhash?.hash}</div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-16 text-gray-500">
                                <i className="fas fa-balance-scale text-5xl mb-4 opacity-50"></i>
                                <p className="text-lg">사건 정보를 입력하고 분석을 시작하세요</p>
                                <p className="text-sm mt-2">AI가 한국·미국·중국·일본·유럽 판례를<br/>비교하여 승소 가능성을 예측합니다</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
