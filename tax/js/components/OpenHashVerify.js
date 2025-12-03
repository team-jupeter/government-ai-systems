const OpenHashVerify = () => {
    const [verificationDemo, setVerificationDemo] = React.useState(null);
    const [isVerifying, setIsVerifying] = React.useState(false);

    const features = [
        { icon: 'fa-lock', title: '암호학적 무결성', desc: 'SHA-256 해시 + ECDSA P-256 디지털 서명으로 데이터 위변조 원천 차단' },
        { icon: 'fa-network-wired', title: '물리적 분산 저장', desc: '원본은 납세자 서버에, 해시만 OpenHash 네트워크에 저장하여 51% 공격 무력화' },
        { icon: 'fa-random', title: '확률적 계층 선택', desc: 'Layer 1~4 자동 배정으로 부하 분산 및 선형 확장성 확보' },
        { icon: 'fa-shield-alt', title: '내부자 공격 방어', desc: '해킹 확률 10^-194,034,720 수준으로 실질적 불가능' }
    ];

    const verificationSteps = [
        { step: 1, name: '거래 해시 생성', desc: '168바이트 블록에서 SHA-256 해시 추출' },
        { step: 2, name: '디지털 서명 검증', desc: 'ECDSA P-256으로 납세자/국세청 서명 검증' },
        { step: 3, name: 'Layer 노드 합의', desc: 'PBFT 알고리즘으로 3f+1 노드 합의 확인' },
        { step: 4, name: 'Hash Chain 연결', desc: '이전 블록 해시와 연결성 검증' },
        { step: 5, name: '타임스탬프 확인', desc: '마이크로초 정밀도 시간 증명 검증' },
        { step: 6, name: '최종 무결성 확정', desc: '모든 검증 통과 시 OpenHash 인증 완료' }
    ];

    const runVerificationDemo = () => {
        setIsVerifying(true);
        setVerificationDemo({ currentStep: 0, results: [] });
        
        let step = 0;
        const interval = setInterval(() => {
            step++;
            setVerificationDemo(prev => ({
                currentStep: step,
                results: [...prev.results, { step, success: true, time: (Math.random() * 0.02).toFixed(4) }]
            }));
            if (step >= 6) {
                clearInterval(interval);
                setIsVerifying(false);
            }
        }, 500);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-2xl p-8 border border-cyan-500/30 mb-8">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-cyan-500/20 rounded-2xl flex items-center justify-center">
                        <i className="fas fa-link text-4xl text-cyan-400"></i>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">OpenHash 기술</h1>
                        <p className="text-gray-300 max-w-2xl">
                            블록체인의 한계를 극복한 차세대 분산 원장 기술. 물리적 분산 저장과 확률적 계층 선택으로 
                            374.76 TPS 처리 성능, 99.97% 안전성, GPU 대비 88% 전력 절감을 달성합니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* 핵심 기능 */}
            <div className="grid grid-cols-4 gap-6 mb-8">
                {features.map((f, idx) => (
                    <div key={idx} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 card-hover">
                        <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                            <i className={`fas ${f.icon} text-xl text-cyan-400`}></i>
                        </div>
                        <h3 className="font-bold text-white mb-2">{f.title}</h3>
                        <p className="text-sm text-gray-400">{f.desc}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* 검증 프로세스 */}
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <i className="fas fa-check-double text-green-400"></i>
                        6단계 검증 프로세스
                    </h3>
                    <div className="space-y-4">
                        {verificationSteps.map((s, idx) => (
                            <div key={idx} className={`flex items-center gap-4 p-3 rounded-xl transition ${
                                verificationDemo && verificationDemo.currentStep >= s.step 
                                    ? 'bg-green-500/10 border border-green-500/30' 
                                    : 'bg-gray-700/50'
                            }`}>
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                                    verificationDemo && verificationDemo.currentStep >= s.step 
                                        ? 'bg-green-500 text-white' 
                                        : 'bg-gray-600 text-gray-400'
                                }`}>
                                    {verificationDemo && verificationDemo.currentStep >= s.step 
                                        ? <i className="fas fa-check"></i> 
                                        : s.step}
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-white">{s.name}</div>
                                    <div className="text-xs text-gray-400">{s.desc}</div>
                                </div>
                                {verificationDemo && verificationDemo.results[idx] && (
                                    <div className="text-xs text-green-400">{verificationDemo.results[idx].time}ms</div>
                                )}
                            </div>
                        ))}
                    </div>
                    <button onClick={runVerificationDemo} disabled={isVerifying}
                        className="w-full mt-6 bg-cyan-600 hover:bg-cyan-500 py-3 rounded-xl font-medium transition disabled:opacity-50">
                        {isVerifying ? <><i className="fas fa-spinner fa-spin mr-2"></i>검증 중...</> : <><i className="fas fa-play mr-2"></i>검증 데모 실행</>}
                    </button>
                </div>

                {/* 기술 사양 */}
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <i className="fas fa-microchip text-purple-400"></i>
                        기술 사양
                    </h3>
                    <div className="space-y-4">
                        <div className="bg-gray-700/50 rounded-xl p-4">
                            <div className="text-sm text-gray-400 mb-2">168바이트 블록 구조</div>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                                <div className="bg-blue-500/20 text-blue-400 p-2 rounded text-center">헤더 46B</div>
                                <div className="bg-green-500/20 text-green-400 p-2 rounded text-center">세무정보 72B</div>
                                <div className="bg-purple-500/20 text-purple-400 p-2 rounded text-center">서명 50B</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-700/50 rounded-xl p-4">
                                <div className="text-2xl font-bold text-cyan-400">374.76</div>
                                <div className="text-sm text-gray-400">TPS 처리량</div>
                            </div>
                            <div className="bg-gray-700/50 rounded-xl p-4">
                                <div className="text-2xl font-bold text-green-400">0.033ms</div>
                                <div className="text-sm text-gray-400">탐지 시간</div>
                            </div>
                            <div className="bg-gray-700/50 rounded-xl p-4">
                                <div className="text-2xl font-bold text-purple-400">99.97%</div>
                                <div className="text-sm text-gray-400">PBFT 안전성</div>
                            </div>
                            <div className="bg-gray-700/50 rounded-xl p-4">
                                <div className="text-2xl font-bold text-yellow-400">88%</div>
                                <div className="text-sm text-gray-400">전력 절감</div>
                            </div>
                        </div>
                        <div className="bg-gray-700/50 rounded-xl p-4">
                            <div className="text-sm text-gray-400 mb-2">보안 수준</div>
                            <div className="text-lg font-mono text-red-400">해킹 확률: 10<sup>-194,034,720</sup></div>
                            <div className="text-xs text-gray-500 mt-1">우주 전체 원자 수(10⁸⁰)보다 현저히 작음</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 블록체인 vs OpenHash */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mt-6">
                <h3 className="text-xl font-bold mb-6">기존 블록체인 vs OpenHash</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="text-left py-3 px-4 text-gray-400">비교 항목</th>
                                <th className="text-center py-3 px-4 text-gray-400">비트코인</th>
                                <th className="text-center py-3 px-4 text-gray-400">이더리움</th>
                                <th className="text-center py-3 px-4 text-cyan-400">OpenHash</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['처리량', '7 TPS', '15 TPS', '374.76 TPS'],
                                ['합의 시간', '10분', '15초', '25.46ms'],
                                ['저장 공간', '수백 TB', '수 TB', '수십 GB'],
                                ['전력 소모', '매우 높음', '높음', 'GPU 대비 88% 절감'],
                                ['51% 공격', '취약', '취약', '원천 차단']
                            ].map((row, idx) => (
                                <tr key={idx} className="border-b border-gray-700">
                                    <td className="py-3 px-4 text-white">{row[0]}</td>
                                    <td className="py-3 px-4 text-center text-red-400">{row[1]}</td>
                                    <td className="py-3 px-4 text-center text-yellow-400">{row[2]}</td>
                                    <td className="py-3 px-4 text-center text-green-400 font-bold">{row[3]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
