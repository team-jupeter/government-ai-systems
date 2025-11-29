const OpenHashVerification = () => {
    const [verificationStats, setVerificationStats] = React.useState({
        totalBlocks: 4521893,
        verifiedToday: 48520000,
        avgTime: 0.82,
        successRate: 99.97
    });
    const [hashInput, setHashInput] = React.useState('');
    const [verifyResult, setVerifyResult] = React.useState(null);
    const [isVerifying, setIsVerifying] = React.useState(false);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setVerificationStats(prev => ({
                ...prev,
                totalBlocks: prev.totalBlocks + Math.floor(Math.random() * 5),
                verifiedToday: prev.verifiedToday + Math.floor(Math.random() * 500)
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
        return num.toLocaleString();
    };

    const verifyHash = async () => {
        setIsVerifying(true);
        setVerifyResult(null);
        
        setTimeout(() => {
            const randomHash = hashInput || Array.from({length: 64}, () => 
                '0123456789abcdef'[Math.floor(Math.random() * 16)]
            ).join('');
            
            setVerifyResult({
                hash: randomHash,
                verified: true,
                blockNumber: verificationStats.totalBlocks - Math.floor(Math.random() * 1000),
                layer: 'L' + (Math.floor(Math.random() * 4) + 1),
                timestamp: new Date().toISOString(),
                merkleRoot: Array.from({length: 64}, () => 
                    '0123456789abcdef'[Math.floor(Math.random() * 16)]
                ).join(''),
                verificationTime: (Math.random() * 2 + 0.5).toFixed(2)
            });
            setIsVerifying(false);
        }, 1500);
    };

    const layerInfo = [
        { layer: 'L1', name: '개인 계층', desc: '개별 사업체/1인 법인', color: 'text-purple-400', nodes: '7.36M' },
        { layer: 'L2', name: '시군구 계층', desc: '226개 기초자치단체', color: 'text-green-400', nodes: '226' },
        { layer: 'L3', name: '광역 계층', desc: '17개 광역시/도', color: 'text-blue-400', nodes: '17' },
        { layer: 'L4', name: '국가 계층', desc: '중앙 검증 노드', color: 'text-yellow-400', nodes: '1' }
    ];

    const recentVerifications = [
        { hash: 'a8f3...2d1e', type: '업무기록', layer: 'L1', time: '0.72ms', status: 'verified' },
        { hash: 'b2c1...9f4a', type: '출퇴근', layer: 'L2', time: '0.85ms', status: 'verified' },
        { hash: 'c9d4...7e2b', type: '성과평가', layer: 'L3', time: '1.12ms', status: 'verified' },
        { hash: 'd5e6...3c8f', type: '계약정보', layer: 'L1', time: '0.68ms', status: 'verified' },
        { hash: 'e7f8...1a9d', type: '급여정보', layer: 'L2', time: '0.91ms', status: 'verified' }
    ];

    return (
        <div className="space-y-6">
            {/* 상단 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5">
                    <p className="text-blue-200 text-sm">총 블록 수</p>
                    <p className="text-3xl font-bold text-white mt-1">{formatNumber(verificationStats.totalBlocks)}</p>
                    <p className="text-blue-200 text-xs mt-1">누적 생성</p>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-200 text-sm">오늘 검증</p>
                            <p className="text-3xl font-bold text-white mt-1">{formatNumber(verificationStats.verifiedToday)}</p>
                        </div>
                        <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-5">
                    <p className="text-purple-200 text-sm">평균 검증 시간</p>
                    <p className="text-3xl font-bold text-white mt-1">{verificationStats.avgTime}ms</p>
                    <p className="text-purple-200 text-xs mt-1">밀리초 단위</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-xl p-5">
                    <p className="text-yellow-200 text-sm">검증 성공률</p>
                    <p className="text-3xl font-bold text-white mt-1">{verificationStats.successRate}%</p>
                    <p className="text-yellow-200 text-xs mt-1">무결성 보장</p>
                </div>
            </div>

            {/* OpenHash 설명 */}
            <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded-xl p-6 border border-green-500/30">
                <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-shield-halved text-4xl text-green-400"></i>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">OpenHash 기술</h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-3">
                            OpenHash는 <span className="text-green-400 font-medium">블록체인의 대안</span>으로 개발된 분산 해시 검증 기술입니다.
                            4계층(L1-L4) 구조로 데이터 무결성을 보장하며, 기존 블록체인 대비 
                            <span className="text-blue-400 font-medium"> 1000배 빠른 처리 속도</span>와 
                            <span className="text-purple-400 font-medium"> 99.99% 에너지 절감</span>을 달성합니다.
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">무채굴 방식</span>
                            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">계층적 분산</span>
                            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">실시간 검증</span>
                            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">친환경</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 해시 검증 도구 */}
            <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">🔍 데이터 무결성 검증</h3>
                <div className="flex gap-3 mb-4">
                    <input
                        type="text"
                        value={hashInput}
                        onChange={(e) => setHashInput(e.target.value)}
                        placeholder="해시값 입력 (비워두면 샘플 생성)"
                        className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none font-mono text-sm"
                    />
                    <button
                        onClick={verifyHash}
                        disabled={isVerifying}
                        className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                            isVerifying
                                ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                    >
                        {isVerifying ? (
                            <React.Fragment>
                                <i className="fas fa-spinner fa-spin"></i>
                                <span>검증 중...</span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <i className="fas fa-check-circle"></i>
                                <span>검증하기</span>
                            </React.Fragment>
                        )}
                    </button>
                </div>

                {verifyResult && (
                    <div className="p-4 bg-green-900/30 border border-green-500/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <i className="fas fa-check-circle text-green-400 text-xl"></i>
                            <span className="text-green-400 font-medium">검증 완료</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <p className="text-slate-400">블록 번호</p>
                                <p className="text-white font-mono">#{verifyResult.blockNumber}</p>
                            </div>
                            <div>
                                <p className="text-slate-400">계층</p>
                                <p className="text-white">{verifyResult.layer}</p>
                            </div>
                            <div>
                                <p className="text-slate-400">검증 시간</p>
                                <p className="text-white">{verifyResult.verificationTime}ms</p>
                            </div>
                            <div>
                                <p className="text-slate-400">상태</p>
                                <p className="text-green-400">✓ 무결성 확인</p>
                            </div>
                        </div>
                        <div className="mt-3 p-2 bg-slate-800 rounded font-mono text-xs text-slate-400 break-all">
                            Hash: {verifyResult.hash}
                        </div>
                    </div>
                )}
            </div>

            {/* 4계층 구조 */}
            <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">🏗️ 4계층 분산 구조</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {layerInfo.map((layer) => (
                        <div key={layer.layer} className="p-4 bg-slate-700/50 rounded-lg text-center">
                            <div className={`text-3xl font-bold ${layer.color} mb-2`}>{layer.layer}</div>
                            <p className="text-white font-medium">{layer.name}</p>
                            <p className="text-xs text-slate-400 mt-1">{layer.desc}</p>
                            <p className={`text-sm ${layer.color} mt-2`}>{layer.nodes} 노드</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 최근 검증 기록 */}
            <div className="bg-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">최근 검증 기록</h3>
                    <span className="flex items-center gap-2 text-xs text-green-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        실시간
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-slate-700">
                                <th className="pb-3 text-slate-400 text-sm font-medium">해시</th>
                                <th className="pb-3 text-slate-400 text-sm font-medium">유형</th>
                                <th className="pb-3 text-slate-400 text-sm font-medium">계층</th>
                                <th className="pb-3 text-slate-400 text-sm font-medium">소요시간</th>
                                <th className="pb-3 text-slate-400 text-sm font-medium">상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentVerifications.map((v, index) => (
                                <tr key={index} className="border-b border-slate-700/50">
                                    <td className="py-3 font-mono text-sm text-blue-400">{v.hash}</td>
                                    <td className="py-3 text-sm text-white">{v.type}</td>
                                    <td className="py-3 text-sm text-slate-300">{v.layer}</td>
                                    <td className="py-3 text-sm text-slate-300">{v.time}</td>
                                    <td className="py-3">
                                        <span className="text-green-400"><i className="fas fa-check-circle"></i></span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
