const TrialSimulation = () => {
    const [isRunning, setIsRunning] = React.useState(false);
    const [phase, setPhase] = React.useState(0);
    const [transcript, setTranscript] = React.useState([]);
    const [verdict, setVerdict] = React.useState(null);
    const [caseInfo, setCaseInfo] = React.useState({
        caseNumber: '2025가합12345',
        title: '손해배상(기) 청구',
        plaintiff: '홍길동',
        defendant: '(주)ABC',
        claimAmount: 50000000
    });

    const phases = [
        '재판 준비',
        '원고 측 주장',
        '피고 측 반론',
        '판사 질의',
        '최종 변론',
        '판결 선고'
    ];

    const startSimulation = async () => {
        setIsRunning(true);
        setTranscript([]);
        setVerdict(null);
        setPhase(0);

        const scripts = [
            { 
                role: 'judge', 
                icon: '👨‍⚖️', 
                name: 'AI 판사',
                color: 'purple',
                content: '재판을 시작하겠습니다. 사건번호 2025가합12345, 손해배상 청구 사건입니다. 원고 측 대리인, 청구 취지 및 원인을 진술하시기 바랍니다.' 
            },
            { 
                role: 'plaintiff', 
                icon: '👤', 
                name: 'AI 원고 변호사',
                color: 'green',
                content: '존경하는 재판장님, 원고는 피고 회사와 2024년 3월 1일 용역계약을 체결하고 계약금 5,000만원을 지급하였습니다. 계약에 따르면 피고는 2024년 6월 30일까지 용역을 완료해야 했으나, 피고는 아무런 이유 없이 용역 제공을 중단하였습니다. 이에 원고는 피고에게 계약금 반환 및 손해배상을 청구합니다. 갑 제1호증 계약서, 갑 제2호증 입금내역, 갑 제3호증 독촉 내용증명을 제출합니다.' 
            },
            { 
                role: 'defendant', 
                icon: '🏢', 
                name: 'AI 피고 변호사',
                color: 'red',
                content: '재판장님, 피고는 원고의 청구를 다툽니다. 피고가 용역을 중단한 것은 원고가 계약에서 정한 협조 의무를 이행하지 않았기 때문입니다. 계약서 제5조에 따르면 원고는 필요 자료를 14일 이내에 제공해야 했으나, 원고는 45일이 지나서야 불완전한 자료를 제공하였습니다. 이는 원고의 선행 의무 불이행으로, 피고에게 책임을 물을 수 없습니다. 을 제1호증 자료 요청 이메일, 을 제2호증 원고의 지연 회신 내역을 제출합니다.' 
            },
            { 
                role: 'judge', 
                icon: '👨‍⚖️', 
                name: 'AI 판사',
                color: 'purple',
                content: '원고 측에 질문합니다. 피고가 주장하는 자료 제공 지연에 대해 어떻게 답변하시겠습니까? 계약서상 협조 의무 조항의 구체적인 내용과, 자료 제공이 지연된 경위를 설명해 주시기 바랍니다.' 
            },
            { 
                role: 'plaintiff', 
                icon: '👤', 
                name: 'AI 원고 변호사',
                color: 'green',
                content: '재판장님, 자료 제공이 지연된 것은 인정합니다. 그러나 이는 피고가 계약 체결 후 추가 자료를 요청했기 때문입니다. 원계약에 없던 항목들이었습니다. 갑 제4호증 피고의 추가 요청 이메일을 보시면, 피고가 계약 범위를 벗어난 자료를 요구했음을 확인하실 수 있습니다. 또한 45일 지연은 피고 주장이고, 실제로는 28일이었습니다.' 
            },
            { 
                role: 'defendant', 
                icon: '🏢', 
                name: 'AI 피고 변호사',
                color: 'red',
                content: '원고의 주장에 반박합니다. 을 제3호증 업무 일지를 보시면, 추가 요청이 아닌 계약서 별첨에 명시된 필수 자료였음을 확인할 수 있습니다. 원고는 계약 내용을 정확히 파악하지 못한 것으로 보입니다.' 
            },
            { 
                role: 'judge', 
                icon: '👨‍⚖️', 
                name: 'AI 판사',
                color: 'purple',
                content: '양측의 주장을 잘 들었습니다. 마지막으로 각자 최종 의견을 진술해 주시기 바랍니다.' 
            },
            { 
                role: 'plaintiff', 
                icon: '👤', 
                name: 'AI 원고 변호사',
                color: 'green',
                content: '재판장님, 설령 원고에게 일부 지연이 있었다 하더라도, 피고가 일방적으로 계약을 중단한 것은 정당화되지 않습니다. 피고는 최소한 이행 최고 및 협의 절차를 거쳤어야 합니다. 원고의 청구를 인용하여 주시기 바랍니다.' 
            },
            { 
                role: 'defendant', 
                icon: '🏢', 
                name: 'AI 피고 변호사',
                color: 'red',
                content: '재판장님, 원고의 선행 의무 불이행이 명백한 이상, 피고의 용역 중단은 동시이행 항변권의 정당한 행사입니다. 원고의 청구를 기각하여 주시기 바랍니다.' 
            }
        ];

        for (let i = 0; i < scripts.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 2500));
            if (i === 0) setPhase(1);
            else if (i === 2) setPhase(2);
            else if (i === 3) setPhase(3);
            else if (i === 7) setPhase(4);
            setTranscript(prev => [...prev, scripts[i]]);
        }

        await new Promise(resolve => setTimeout(resolve, 3000));
        setPhase(5);
        
        setVerdict({
            result: '원고 일부 승소',
            amount: 35000000,
            reasoning: `【 판결 이유 】

1. 인정 사실
가. 원고와 피고는 2024. 3. 1. 용역계약을 체결하고, 원고는 피고에게 계약금 5,000만원을 지급하였다.
나. 피고는 2024. 5. 15. 용역 제공을 중단하였다.
다. 원고의 자료 제공은 계약상 기한보다 약 28일 지연되었다.

2. 판단
가. 원고의 협조의무 위반 여부
   계약서 제5조 및 별첨을 검토한 결과, 피고가 요청한 자료 중 일부는 원계약 범위를 벗어난 것으로 판단된다. 다만, 원고에게도 14일 이내 제공 의무가 있는 자료에 대한 지연이 있었으므로, 원고의 협조의무 일부 위반이 인정된다.

나. 피고의 계약 중단의 정당성
   원고의 협조의무 위반이 일부 인정되나, 피고가 별도의 이행 최고 없이 일방적으로 계약을 중단한 것은 신의칙에 반한다.

다. 손해배상의 범위
   과실상계를 적용하여 피고의 배상 범위를 70%로 제한함이 상당하다.

3. 결론
피고는 원고에게 금 35,000,000원 및 이에 대한 이 사건 소장 부본 송달 다음날부터 다 갚는 날까지 연 12%의 비율에 의한 지연손해금을 지급하라.`,
            confidence: 78.5,
            appealPossibility: 35
        });

        setIsRunning(false);
    };

    const getRoleStyle = (role) => {
        switch(role) {
            case 'judge': return 'bg-purple-50 border-l-4 border-purple-500';
            case 'plaintiff': return 'bg-green-50 border-l-4 border-green-500';
            case 'defendant': return 'bg-red-50 border-l-4 border-red-500';
            default: return 'bg-gray-50 border-l-4 border-gray-500';
        }
    };

    return (
        <div className="p-6">
            <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-xl font-bold mb-4">
                        <i className="fas fa-gavel mr-2 text-purple-600"></i>AI 모의재판 시뮬레이션
                    </h2>
                    <p className="text-gray-500 mb-6">
                        AI 판사, AI 변호사가 실제 재판을 시뮬레이션합니다. 예상 판결 결과를 미리 확인하세요.
                    </p>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h4 className="font-bold mb-3">사건 정보</h4>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                            <div><span className="text-gray-500">사건번호:</span> {caseInfo.caseNumber}</div>
                            <div><span className="text-gray-500">사건명:</span> {caseInfo.title}</div>
                            <div><span className="text-gray-500">원고:</span> {caseInfo.plaintiff}</div>
                            <div><span className="text-gray-500">피고:</span> {caseInfo.defendant}</div>
                        </div>
                    </div>

                    {!isRunning && !verdict && (
                        <button 
                            onClick={startSimulation} 
                            className="w-full bg-purple-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-purple-700"
                        >
                            <i className="fas fa-play-circle mr-2"></i>모의재판 시작
                        </button>
                    )}
                </div>

                {(isRunning || verdict) && (
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex items-center justify-between mb-6">
                            {phases.map((p, i) => (
                                <React.Fragment key={i}>
                                    <div className="flex flex-col items-center">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                                            phase > i ? 'bg-green-500 text-white' : 
                                            phase === i ? 'bg-purple-500 text-white animate-pulse' : 
                                            'bg-gray-200 text-gray-500'
                                        }`}>
                                            {phase > i ? <i className="fas fa-check"></i> : i + 1}
                                        </div>
                                        <span className="text-xs mt-1 text-gray-500">{p}</span>
                                    </div>
                                    {i < phases.length - 1 && (
                                        <div className={`flex-1 h-1 mx-2 rounded ${phase > i ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}

                {transcript.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h3 className="font-bold mb-4">
                            <i className="fas fa-scroll mr-2"></i>재판 기록
                        </h3>
                        <div className="space-y-4 max-h-[500px] overflow-y-auto">
                            {transcript.map((t, i) => (
                                <div key={i} className={`p-4 rounded-lg ${getRoleStyle(t.role)}`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-2xl">{t.icon}</span>
                                        <span className="font-bold">{t.name}</span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{t.content}</p>
                                </div>
                            ))}
                            {isRunning && (
                                <div className="flex items-center gap-2 text-gray-500 p-4">
                                    <i className="fas fa-spinner fa-spin"></i>
                                    <span>다음 발언 준비 중...</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {verdict && (
                    <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-8 text-white">
                        <div className="text-center mb-6">
                            <div className="text-5xl mb-4">⚖️</div>
                            <h3 className="text-2xl font-bold">판 결</h3>
                        </div>

                        <div className="bg-white/10 rounded-lg p-6 mb-6">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-purple-200 text-sm mb-1">판결 결과</div>
                                    <div className="text-xl font-bold">{verdict.result}</div>
                                </div>
                                <div>
                                    <div className="text-purple-200 text-sm mb-1">인용 금액</div>
                                    <div className="text-xl font-bold">₩{verdict.amount.toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-purple-200 text-sm mb-1">예측 신뢰도</div>
                                    <div className="text-xl font-bold">{verdict.confidence}%</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 rounded-lg p-6 mb-6">
                            <h4 className="font-bold mb-3">판결 이유</h4>
                            <pre className="text-sm whitespace-pre-wrap text-purple-100 font-sans leading-relaxed">
                                {verdict.reasoning}
                            </pre>
                        </div>

                        <div className="bg-yellow-500/20 rounded-lg p-4 mb-6">
                            <div className="flex items-center gap-2">
                                <i className="fas fa-exclamation-triangle text-yellow-300"></i>
                                <span className="text-yellow-100">
                                    항소 시 번복 가능성: <strong>{verdict.appealPossibility}%</strong>
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button 
                                onClick={() => { setVerdict(null); setTranscript([]); setPhase(0); }} 
                                className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg"
                            >
                                <i className="fas fa-redo mr-2"></i>다시 시뮬레이션
                            </button>
                            <button className="bg-white text-purple-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100">
                                <i className="fas fa-file-alt mr-2"></i>결과 저장
                            </button>
                            <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-bold">
                                <i className="fas fa-file-signature mr-2"></i>소장 작성하기
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
