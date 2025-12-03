const PrivateVaultSimulation = () => {
    const [activeSimulation, setActiveSimulation] = React.useState(null); // 'vault' or 'ndr'
    const [phase, setPhase] = React.useState(0);
    const [extractedData, setExtractedData] = React.useState([]);
    const [isRunning, setIsRunning] = React.useState(false);
    
    // 프라이빗 금고 시뮬레이션 데이터
    const vaultPhases = [
        { name: '금고 접근 인증', duration: 800 },
        { name: '원고 금고 스캔', duration: 1200 },
        { name: '피고 금고 스캔', duration: 1200 },
        { name: '증거 매칭 분석', duration: 1000 },
        { name: '해시 검증', duration: 600 },
        { name: '증거 추출 완료', duration: 500 }
    ];
    
    const plaintiffData = [
        { type: '계약서', date: '2024-03-15', desc: '임대차계약서 원본', support: '원고', hash: '0x7a3f...e2c1' },
        { type: '이메일', date: '2024-08-20', desc: '보증금 반환 요청 메일', support: '원고', hash: '0x9b2e...f4a8' },
        { type: '문자메시지', date: '2024-09-01', desc: '퇴거 통보 문자', support: '원고', hash: '0x3c7d...b1e5' },
        { type: '금융거래', date: '2024-03-15', desc: '보증금 이체 내역', support: '원고', hash: '0x5e1a...c3f2' },
        { type: '사진', date: '2024-09-30', desc: '퇴거 당시 집 상태 사진', support: '원고', hash: '0x8f4c...d2a7' }
    ];
    
    const defendantData = [
        { type: '수리내역', date: '2024-10-05', desc: '시설물 수리비 영수증', support: '피고', hash: '0x2d6b...a1c4' },
        { type: '사진', date: '2024-10-01', desc: '시설 파손 사진', support: '피고', hash: '0x4a9e...b3d8' },
        { type: '문자메시지', date: '2024-07-15', desc: '수리 요청 무시 증거', support: '피고', hash: '0x6c2f...e5a9' }
    ];
    
    // 국가데이터처 시뮬레이션 데이터
    const ndrPhases = [
        { name: 'API 인증 요청', duration: 600 },
        { name: 'Layer 0 접근', duration: 800 },
        { name: '공공 데이터 조회', duration: 1000 },
        { name: '민간 데이터 연계', duration: 1200 },
        { name: 'AI 법규 검증', duration: 800 },
        { name: '데이터 추출 완료', duration: 500 }
    ];
    
    const ndrSources = [
        { agency: '법원행정처', icon: '⚖️', data: '관련 판례 47건', layer: 'Layer 0' },
        { agency: '국세청', icon: '💰', data: '세금 납부 이력', layer: 'Layer 1' },
        { agency: '금융감독원', icon: '🏦', data: '금융 거래 내역', layer: 'Layer 1' },
        { agency: '건축물대장', icon: '🏢', data: '부동산 등기 정보', layer: 'Layer 1' },
        { agency: '국민건강보험', icon: '🏥', data: '주소지 변경 이력', layer: 'Layer 2' },
        { agency: '통신사', icon: '📱', data: '통화/문자 기록 메타', layer: 'Layer 2' },
        { agency: '은행', icon: '💳', data: '계좌 거래 내역', layer: 'Layer 1' },
        { agency: '경찰청', icon: '🚔', data: '신고 접수 이력', layer: 'Layer 1' }
    ];
    
    const ndrExtractedData = [
        { type: '판례', source: '법원행정처', desc: '유사 임대차 분쟁 판례 47건', relevance: 94 },
        { type: '세금', source: '국세청', desc: '피고 재산세 납부 기록', relevance: 78 },
        { type: '등기', source: '건축물대장', desc: '해당 부동산 소유권 이전 이력', relevance: 92 },
        { type: '금융', source: '금융감독원', desc: '보증금 입금 확인 기록', relevance: 98 },
        { type: '통신', source: '통신사', desc: '분쟁 기간 통화 기록 메타데이터', relevance: 65 }
    ];
    
    const runVaultSimulation = () => {
        setActiveSimulation('vault');
        setIsRunning(true);
        setPhase(0);
        setExtractedData([]);
        
        let currentPhase = 0;
        const allData = [...plaintiffData, ...defendantData];
        
        const runPhase = () => {
            if (currentPhase < vaultPhases.length) {
                setPhase(currentPhase);
                
                // 증거 추출 애니메이션
                if (currentPhase >= 1 && currentPhase <= 3) {
                    const startIdx = currentPhase === 1 ? 0 : (currentPhase === 2 ? plaintiffData.length : allData.length - 2);
                    const endIdx = currentPhase === 1 ? plaintiffData.length : (currentPhase === 2 ? allData.length - 2 : allData.length);
                    
                    for (let i = startIdx; i < endIdx; i++) {
                        setTimeout(() => {
                            setExtractedData(prev => [...prev, allData[i]]);
                        }, (i - startIdx) * 300);
                    }
                }
                
                setTimeout(() => {
                    currentPhase++;
                    runPhase();
                }, vaultPhases[currentPhase].duration);
            } else {
                setIsRunning(false);
            }
        };
        
        runPhase();
    };
    
    const runNDRSimulation = () => {
        setActiveSimulation('ndr');
        setIsRunning(true);
        setPhase(0);
        setExtractedData([]);
        
        let currentPhase = 0;
        
        const runPhase = () => {
            if (currentPhase < ndrPhases.length) {
                setPhase(currentPhase);
                
                if (currentPhase >= 2 && currentPhase <= 4) {
                    const dataToAdd = ndrExtractedData.slice(
                        (currentPhase - 2) * 2,
                        Math.min((currentPhase - 1) * 2, ndrExtractedData.length)
                    );
                    dataToAdd.forEach((d, i) => {
                        setTimeout(() => {
                            setExtractedData(prev => [...prev, d]);
                        }, i * 400);
                    });
                }
                
                setTimeout(() => {
                    currentPhase++;
                    runPhase();
                }, ndrPhases[currentPhase].duration);
            } else {
                setIsRunning(false);
            }
        };
        
        runPhase();
    };
    
    return (
        <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">
                        <i className="fas fa-database mr-3 text-amber-400"></i>증거 데이터 인출 시뮬레이션
                    </h2>
                    <p className="text-gray-500">원고·피고 프라이빗 금고 및 국가데이터처에서 소송 증거를 자동 수집합니다</p>
                </div>
                
                {/* 두 개의 버튼 */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <button
                        onClick={runVaultSimulation}
                        disabled={isRunning}
                        className={`p-6 rounded-xl border-2 transition-all ${
                            activeSimulation === 'vault' && isRunning
                                ? 'border-amber-500 bg-amber-900/30'
                                : 'border-amber-500/50 bg-gray-50 hover:bg-amber-900/20 hover:border-amber-400'
                        } ${isRunning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-16 h-16 bg-amber-600/30 rounded-full flex items-center justify-center">
                                <i className="fas fa-vault text-3xl text-amber-400"></i>
                            </div>
                            <div className="text-left">
                                <h3 className="text-xl font-bold text-amber-400">프라이빗 데이터 금고</h3>
                                <p className="text-sm text-gray-500">원고·피고 개인 금고에서 증거 인출</p>
                            </div>
                        </div>
                    </button>
                    
                    <button
                        onClick={runNDRSimulation}
                        disabled={isRunning}
                        className={`p-6 rounded-xl border-2 transition-all ${
                            activeSimulation === 'ndr' && isRunning
                                ? 'border-cyan-500 bg-cyan-900/30'
                                : 'border-cyan-500/50 bg-gray-50 hover:bg-cyan-900/20 hover:border-cyan-400'
                        } ${isRunning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-16 h-16 bg-cyan-600/30 rounded-full flex items-center justify-center">
                                <i className="fas fa-landmark text-3xl text-cyan-400"></i>
                            </div>
                            <div className="text-left">
                                <h3 className="text-xl font-bold text-cyan-400">국가데이터처 연계</h3>
                                <p className="text-sm text-gray-500">공공·민간 503만+ 노드에서 데이터 인출</p>
                            </div>
                        </div>
                    </button>
                </div>
                
                {/* 시뮬레이션 영역 */}
                {activeSimulation && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        {/* 프라이빗 금고 시뮬레이션 */}
                        {activeSimulation === 'vault' && (
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-amber-400 mb-4">
                                    <i className="fas fa-vault mr-2"></i>프라이빗 데이터 금고 증거 인출
                                </h3>
                                
                                {/* 진행 단계 */}
                                <div className="flex items-center justify-between mb-6 overflow-x-auto pb-2">
                                    {vaultPhases.map((p, i) => (
                                        <div key={i} className="flex items-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                                                i < phase ? 'bg-green-600 text-gray-900' :
                                                i === phase && isRunning ? 'bg-amber-600 text-gray-900 animate-pulse' :
                                                'bg-gray-100 text-gray-500'
                                            }`}>
                                                {i < phase ? '✓' : i + 1}
                                            </div>
                                            {i < vaultPhases.length - 1 && (
                                                <div className={`w-12 h-1 mx-1 ${i < phase ? 'bg-green-600' : 'bg-gray-100'}`}></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center text-sm text-gray-500 mb-6">
                                    {isRunning ? vaultPhases[phase]?.name : (phase >= vaultPhases.length ? '✅ 완료' : '대기 중')}
                                </div>
                                
                                {/* 금고 시각화 */}
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    {/* 원고 금고 */}
                                    <div className={`bg-blue-900/20 rounded-xl p-4 border transition-all ${
                                        phase >= 1 && phase <= 2 && isRunning ? 'border-blue-400 shadow-lg shadow-blue-500/20' : 'border-blue-500/30'
                                    }`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 bg-blue-600/30 rounded-lg flex items-center justify-center">
                                                <i className="fas fa-user text-2xl text-blue-400"></i>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-blue-400">원고 프라이빗 금고</h4>
                                                <p className="text-xs text-gray-500">AES-256-GCM 암호화</p>
                                            </div>
                                            {phase >= 1 && phase <= 2 && isRunning && (
                                                <div className="ml-auto">
                                                    <i className="fas fa-sync fa-spin text-blue-400"></i>
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            {plaintiffData.map((d, i) => (
                                                <div key={i} className={`flex items-center gap-2 p-2 rounded transition-all ${
                                                    extractedData.find(e => e.hash === d.hash) 
                                                        ? 'bg-blue-600/30 border border-blue-500/50' 
                                                        : 'bg-gray-50/50'
                                                }`}>
                                                    <i className={`fas fa-${d.type === '계약서' ? 'file-contract' : d.type === '이메일' ? 'envelope' : d.type === '문자메시지' ? 'comment' : d.type === '금융거래' ? 'credit-card' : 'image'} text-blue-400`}></i>
                                                    <span className="text-sm flex-1">{d.desc}</span>
                                                    {extractedData.find(e => e.hash === d.hash) && (
                                                        <i className="fas fa-check-circle text-green-400"></i>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* 피고 금고 */}
                                    <div className={`bg-red-900/20 rounded-xl p-4 border transition-all ${
                                        phase >= 2 && phase <= 3 && isRunning ? 'border-red-400 shadow-lg shadow-red-500/20' : 'border-red-500/30'
                                    }`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 bg-red-600/30 rounded-lg flex items-center justify-center">
                                                <i className="fas fa-user-shield text-2xl text-red-400"></i>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-red-400">피고 프라이빗 금고</h4>
                                                <p className="text-xs text-gray-500">AES-256-GCM 암호화</p>
                                            </div>
                                            {phase >= 2 && phase <= 3 && isRunning && (
                                                <div className="ml-auto">
                                                    <i className="fas fa-sync fa-spin text-red-400"></i>
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            {defendantData.map((d, i) => (
                                                <div key={i} className={`flex items-center gap-2 p-2 rounded transition-all ${
                                                    extractedData.find(e => e.hash === d.hash) 
                                                        ? 'bg-red-600/30 border border-red-500/50' 
                                                        : 'bg-gray-50/50'
                                                }`}>
                                                    <i className={`fas fa-${d.type === '수리내역' ? 'tools' : d.type === '사진' ? 'image' : 'comment'} text-red-400`}></i>
                                                    <span className="text-sm flex-1">{d.desc}</span>
                                                    {extractedData.find(e => e.hash === d.hash) && (
                                                        <i className="fas fa-check-circle text-green-400"></i>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* 추출 결과 */}
                                {extractedData.length > 0 && (
                                    <div className="bg-green-900/20 rounded-xl p-4 border border-green-500/30">
                                        <h4 className="font-bold text-green-400 mb-3">
                                            <i className="fas fa-check-double mr-2"></i>추출된 증거 ({extractedData.length}건)
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                            {extractedData.map((d, i) => (
                                                <div key={i} className={`p-2 rounded text-xs ${
                                                    d.support === '원고' ? 'bg-blue-900/30' : 'bg-red-900/30'
                                                }`}>
                                                    <div className="font-medium">{d.type}</div>
                                                    <div className="text-gray-500 truncate">{d.desc}</div>
                                                    <div className="font-mono text-gray-600 mt-1">{d.hash}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {/* 국가데이터처 시뮬레이션 */}
                        {activeSimulation === 'ndr' && (
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-cyan-400 mb-4">
                                    <i className="fas fa-landmark mr-2"></i>국가데이터처 데이터 인출
                                </h3>
                                
                                {/* 진행 단계 */}
                                <div className="flex items-center justify-between mb-6 overflow-x-auto pb-2">
                                    {ndrPhases.map((p, i) => (
                                        <div key={i} className="flex items-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                                                i < phase ? 'bg-green-600 text-gray-900' :
                                                i === phase && isRunning ? 'bg-cyan-600 text-gray-900 animate-pulse' :
                                                'bg-gray-100 text-gray-500'
                                            }`}>
                                                {i < phase ? '✓' : i + 1}
                                            </div>
                                            {i < ndrPhases.length - 1 && (
                                                <div className={`w-12 h-1 mx-1 ${i < phase ? 'bg-green-600' : 'bg-gray-100'}`}></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center text-sm text-gray-500 mb-6">
                                    {isRunning ? ndrPhases[phase]?.name : (phase >= ndrPhases.length ? '✅ 완료' : '대기 중')}
                                </div>
                                
                                {/* 5계층 구조 시각화 */}
                                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                                    <h4 className="text-sm font-bold text-gray-500 mb-4">오픈해시 5계층 구조</h4>
                                    <div className="space-y-3">
                                        {[
                                            { layer: 'Layer 0', name: '국가데이터처', nodes: '3 노드', color: 'yellow', active: phase >= 1 },
                                            { layer: 'Layer 1', name: '기관 Edge', nodes: '503만+ 노드', color: 'cyan', active: phase >= 2 },
                                            { layer: 'Layer 2', name: '광역시도 Edge', nodes: '32 노드', color: 'purple', active: phase >= 3 },
                                            { layer: 'Layer 3', name: '국가 Core', nodes: '10 노드', color: 'green', active: phase >= 4 },
                                            { layer: 'Layer 4', name: 'Archive', nodes: '영구보존', color: 'gray', active: phase >= 5 }
                                        ].map((l, i) => (
                                            <div key={i} className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                                                l.active && isRunning ? `bg-${l.color}-900/30 border border-${l.color}-500/50` : 'bg-white'
                                            }`}>
                                                <div className={`w-10 h-10 rounded-full bg-${l.color}-600/30 flex items-center justify-center`}>
                                                    <span className={`text-${l.color}-400 font-bold text-sm`}>{l.layer.slice(-1)}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium">{l.name}</div>
                                                    <div className="text-xs text-gray-500">{l.nodes}</div>
                                                </div>
                                                {l.active && isRunning && i <= phase && (
                                                    <i className={`fas fa-${i < phase ? 'check-circle text-green-400' : 'sync fa-spin text-' + l.color + '-400'}`}></i>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* 연계 기관 그리드 */}
                                <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-6">
                                    {ndrSources.map((s, i) => (
                                        <div key={i} className={`p-3 rounded-lg text-center transition-all ${
                                            phase >= 2 + Math.floor(i / 3) && isRunning 
                                                ? 'bg-cyan-900/30 border border-cyan-500/50 scale-105' 
                                                : 'bg-gray-50'
                                        }`}>
                                            <div className="text-2xl mb-1">{s.icon}</div>
                                            <div className="text-xs truncate">{s.agency}</div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* 추출 결과 */}
                                {extractedData.length > 0 && (
                                    <div className="bg-cyan-900/20 rounded-xl p-4 border border-cyan-500/30">
                                        <h4 className="font-bold text-cyan-400 mb-3">
                                            <i className="fas fa-download mr-2"></i>인출된 데이터 ({extractedData.length}건)
                                        </h4>
                                        <div className="space-y-2">
                                            {extractedData.map((d, i) => (
                                                <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                                    <div className="w-10 h-10 bg-cyan-600/30 rounded-full flex items-center justify-center">
                                                        <i className="fas fa-file-alt text-cyan-400"></i>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-medium">{d.desc}</div>
                                                        <div className="text-xs text-gray-500">{d.source}</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm text-green-400">관련도 {d.relevance}%</div>
                                                        <div className="w-20 h-2 bg-gray-100 rounded-full mt-1">
                                                            <div className="h-full bg-green-500 rounded-full" style={{width: `${d.relevance}%`}}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {/* 하단 정보 */}
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                            <div className="flex flex-wrap justify-between items-center gap-4 text-sm">
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-500">
                                        <i className="fas fa-clock mr-1"></i>
                                        기존 수집 시간: <span className="text-red-400 line-through">6개월</span>
                                    </span>
                                    <span className="text-green-400">
                                        → 현재: <span className="font-bold">15초</span> (99.9997% 단축)
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <i className="fas fa-shield-alt text-green-400"></i>
                                    <span>SHA-256 해시 검증 완료</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* 설명 카드 */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-amber-900/20 rounded-xl p-5 border border-amber-500/30">
                        <h4 className="font-bold text-amber-400 mb-3">
                            <i className="fas fa-vault mr-2"></i>프라이빗 데이터 금고란?
                        </h4>
                        <ul className="text-sm space-y-2 text-gray-600">
                            <li>• 개인 단말기에 AES-256-GCM으로 암호화 저장</li>
                            <li>• 클라우드에는 SHA-256 해시값(32bytes)만 기록</li>
                            <li>• 원고·피고 각자의 일상/업무 기록에서 증거 추출</li>
                            <li>• 위변조 탐지 시간: 0.001ms</li>
                        </ul>
                    </div>
                    <div className="bg-cyan-900/20 rounded-xl p-5 border border-cyan-500/30">
                        <h4 className="font-bold text-cyan-400 mb-3">
                            <i className="fas fa-landmark mr-2"></i>국가데이터처 연계란?
                        </h4>
                        <ul className="text-sm space-y-2 text-gray-600">
                            <li>• 공공 18개 부처 + 226개 지자체 데이터 통합</li>
                            <li>• 민간: 병원 3,500개, 학교 24,000개, 시장 1,500개</li>
                            <li>• 총 503만+ 노드에서 소송 관련 데이터 인출</li>
                            <li>• AI가 개인정보보호법 자동 검증 (2.3초)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};
