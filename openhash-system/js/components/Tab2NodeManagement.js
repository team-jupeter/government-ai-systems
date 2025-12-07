const Tab2NodeManagement = () => {
    // 노드 진입 State
    const [currentStep1, setCurrentStep1] = React.useState(0);
    const [isRunning1, setIsRunning1] = React.useState(false);
    const [newNodeId, setNewNodeId] = React.useState('Node_5001');
    const [entryData, setEntryData] = React.useState({
        request: '',
        individualSignatures: [],
        aggregatedSignature: '',
        verified: false,
        nodeList: '',
        broadcast: ''
    });

    // 노드 탈퇴 State
    const [currentStep2, setCurrentStep2] = React.useState(0);
    const [isRunning2, setIsRunning2] = React.useState(false);
    const [exitNodeId, setExitNodeId] = React.useState('Node_4523');
    const [exitReason, setExitReason] = React.useState('이중 지불 시도 탐지');
    const [exitData, setExitData] = React.useState({
        notice: '',
        individualSignatures: [],
        aggregatedSignature: '',
        verified: false,
        removedNode: '',
        blacklist: ''
    });

    const sha256 = (text) => {
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        const hexHash = Math.abs(hash).toString(16).padStart(16, '0');
        return hexHash.repeat(4);
    };

    // BLS 서명 시뮬레이션 (48 bytes)
    const blsSign = (message, nodeId) => {
        const signature = sha256(message + nodeId).substring(0, 96); // 48 bytes = 96 hex chars
        return signature;
    };

    // BLS 서명 집계 시뮬레이션
    const blsAggregate = (signatures) => {
        // 실제로는 타원곡선 연산이지만, 시뮬레이션에서는 XOR
        let result = 0;
        signatures.forEach(sig => {
            for (let i = 0; i < sig.length; i += 8) {
                result ^= parseInt(sig.substring(i, i + 8), 16);
            }
        });
        return result.toString(16).padStart(96, '0');
    };

    // 노드 진입 시뮬레이션
    const runNodeEntry = async () => {
        if (!newNodeId.trim()) {
            alert('새 노드 ID를 입력하세요.');
            return;
        }

        setIsRunning1(true);
        setCurrentStep1(0);
        setEntryData({
            request: '',
            individualSignatures: [],
            aggregatedSignature: '',
            verified: false,
            nodeList: '',
            broadcast: ''
        });

        // 1단계: 진입 요청 생성
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep1(1);
        const request = {
            nodeId: newNodeId,
            publicKey: sha256(newNodeId + 'pubkey').substring(0, 64),
            timestamp: Date.now()
        };
        const requestStr = JSON.stringify(request);
        setEntryData(prev => ({ ...prev, request: requestStr }));

        // 2단계: 기존 노드들 개별 BLS 서명 (100개)
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep1(2);
        const signatures = [];
        for (let i = 1; i <= 100; i++) {
            signatures.push(blsSign(requestStr, 'Node_' + (4000 + i)));
        }
        setEntryData(prev => ({ ...prev, individualSignatures: signatures }));

        // 3단계: 서명 집계
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep1(3);
        const aggregated = blsAggregate(signatures);
        setEntryData(prev => ({ ...prev, aggregatedSignature: aggregated }));

        // 4단계: 집계 서명 검증
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep1(4);
        setEntryData(prev => ({ ...prev, verified: true }));

        // 5단계: 노드 목록 갱신
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep1(5);
        const nodeList = `Layer 1: 501개 노드 (${newNodeId} 추가됨)`;
        setEntryData(prev => ({ ...prev, nodeList }));

        // 6단계: 네트워크 브로드캐스트
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep1(6);
        const broadcast = `48 bytes 집계 서명 + ${newNodeId} 정보`;
        setEntryData(prev => ({ ...prev, broadcast }));

        setIsRunning1(false);
    };

    // 노드 탈퇴 시뮬레이션
    const runNodeExit = async () => {
        if (!exitNodeId.trim() || !exitReason.trim()) {
            alert('탈퇴 노드 ID와 사유를 입력하세요.');
            return;
        }

        setIsRunning2(true);
        setCurrentStep2(0);
        setExitData({
            notice: '',
            individualSignatures: [],
            aggregatedSignature: '',
            verified: false,
            removedNode: '',
            blacklist: ''
        });

        // 1단계: 탈퇴 공지 생성
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep2(1);
        const notice = {
            nodeId: exitNodeId,
            reason: exitReason,
            reportedBy: 'Node_4234, Node_4567, Node_4890',
            timestamp: Date.now()
        };
        const noticeStr = JSON.stringify(notice);
        setExitData(prev => ({ ...prev, notice: noticeStr }));

        // 2단계: 관련 노드들 BLS 서명 (200개)
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep2(2);
        const signatures = [];
        for (let i = 1; i <= 200; i++) {
            signatures.push(blsSign(noticeStr, 'Witness_' + i));
        }
        setExitData(prev => ({ ...prev, individualSignatures: signatures }));

        // 3단계: 서명 집계
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep2(3);
        const aggregated = blsAggregate(signatures);
        setExitData(prev => ({ ...prev, aggregatedSignature: aggregated }));

        // 4단계: 집계 서명 검증
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep2(4);
        setExitData(prev => ({ ...prev, verified: true }));

        // 5단계: 노드 목록에서 제거
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep2(5);
        const removedNode = `Layer 1: 499개 노드 (${exitNodeId} 제거됨)`;
        setExitData(prev => ({ ...prev, removedNode }));

        // 6단계: 블랙리스트 기록
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep2(6);
        const blacklist = `${exitNodeId}: ${exitReason} (48 bytes 집계 서명 포함)`;
        setExitData(prev => ({ ...prev, blacklist }));

        setIsRunning2(false);
    };

    const getSimValue1 = (stepNum) => {
        if (currentStep1 < stepNum) return '-';
        switch(stepNum) {
            case 1: return entryData.request.substring(0, 50) + '...';
            case 2: return `100개 서명 생성 (각 48 bytes) = 4,800 bytes`;
            case 3: return entryData.aggregatedSignature.substring(0, 40) + '... (48 bytes)';
            case 4: return entryData.verified ? '✓ 검증 성공' : '검증 중...';
            case 5: return entryData.nodeList;
            case 6: return entryData.broadcast;
            default: return '-';
        }
    };

    const getSimValue2 = (stepNum) => {
        if (currentStep2 < stepNum) return '-';
        switch(stepNum) {
            case 1: return exitData.notice.substring(0, 50) + '...';
            case 2: return `200개 서명 생성 (각 48 bytes) = 9,600 bytes`;
            case 3: return exitData.aggregatedSignature.substring(0, 40) + '... (48 bytes)';
            case 4: return exitData.verified ? '✓ 검증 성공 (200개 서명 일괄 확인)' : '검증 중...';
            case 5: return exitData.removedNode;
            case 6: return exitData.blacklist;
            default: return '-';
        }
    };

    const stepsEntry = [
        { num: 1, title: '진입 요청 생성', desc: '새 노드의 ID, 공개키, 타임스탬프를 포함한 진입 요청서 작성' },
        { num: 2, title: '기존 노드들 개별 BLS 서명', desc: '100개 기존 노드가 각각 48 bytes BLS 서명 생성 (총 4,800 bytes)' },
        { num: 3, title: 'BLS 서명 집계', desc: '100개 개별 서명을 1개의 48 bytes 집계 서명으로 압축 (100배 감소)' },
        { num: 4, title: '집계 서명 검증', desc: '단 1번의 검증으로 100개 서명 모두 확인 (페어링 연산)' },
        { num: 5, title: '노드 목록 갱신', desc: '새 노드를 Layer 노드 목록에 추가하고 전체 노드 수 업데이트' },
        { num: 6, title: '네트워크 브로드캐스트', desc: '48 bytes 집계 서명과 새 노드 정보만 전파 (7KB → 48B)' }
    ];

    const stepsExit = [
        { num: 1, title: '탈퇴 공지 생성', desc: '탈퇴 노드 ID, 사유, 보고 노드, 타임스탬프 포함' },
        { num: 2, title: '관련 노드들 BLS 서명', desc: '200개 증인 노드가 각각 48 bytes BLS 서명 생성 (총 9,600 bytes)' },
        { num: 3, title: 'BLS 서명 집계', desc: '200개 개별 서명을 1개의 48 bytes 집계 서명으로 압축 (200배 감소)' },
        { num: 4, title: '집계 서명 검증', desc: '단 1번의 검증으로 200개 서명 모두 확인 (O(1) 복잡도)' },
        { num: 5, title: '노드 목록에서 제거', desc: '악의적 노드를 Layer 노드 목록에서 완전 제거' },
        { num: 6, title: '블랙리스트 영구 기록', desc: '48 bytes 집계 서명과 함께 블랙리스트에 영구 저장 (14KB → 48B)' }
    ];

    return (
        <div>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .fade-in {
                    animation: fadeIn 0.5s ease-out;
                }
            `}</style>

            <div className="mb-8">
                <h4 className="text-2xl font-bold text-gov-text mb-3">동적 노드 진입/탈퇴 관리 (BLS 서명 기반)</h4>
                <p className="text-gov-text-secondary leading-relaxed">
                    BLS(Boneh-Lynn-Shacham) 서명을 활용하여 수백 개의 노드 승인을 단 48 bytes로 압축합니다. 
                    서명 집계를 통해 네트워크 트래픽을 100~200배 감소시키고, 검증 시간을 O(1)로 최적화합니다.
                </p>
            </div>

            {/* 섹션 1: 노드 진입 */}
            <div className="mb-12">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-400 rounded-lg p-6 mb-6">
                    <h5 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                        <i className="fas fa-sign-in-alt mr-3"></i>
                        노드 진입 (Node Entry)
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">새 노드 ID</label>
                            <input
                                type="text"
                                value={newNodeId}
                                onChange={(e) => setNewNodeId(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="예: Node_5001"
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={runNodeEntry}
                                disabled={isRunning1 || !newNodeId.trim()}
                                className="w-full px-6 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isRunning1 ? '진입 처리 중...' : '노드 진입 시뮬레이션 실행'}
                            </button>
                        </div>
                    </div>
                    <div className="bg-white rounded p-4 border border-blue-300">
                        <div className="text-xs text-gray-600 mb-2">
                            <strong>시나리오:</strong> Layer 1에 새 노드가 진입하려면 기존 100개 노드의 2/3 이상 승인 필요
                        </div>
                        <div className="text-xs text-gray-600">
                            <strong>BLS 효과:</strong> 100개 서명(7KB) → 집계 서명 1개(48B) = <span className="text-red-600 font-bold">145배 감소</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-6">
                    <div className="bg-blue-600 text-white px-6 py-4">
                        <h4 className="text-lg font-bold flex items-center">
                            <i className="fas fa-tasks mr-3"></i>노드 진입 프로세스 (BLS 서명 집계)
                        </h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b-2 border-gov-border bg-gray-50">
                                    <th className="text-center px-4 py-3 font-bold" style={{width: '80px'}}>단계</th>
                                    <th className="text-left px-4 py-3 font-bold">작업</th>
                                    <th className="text-left px-4 py-3 font-bold">설명</th>
                                    <th className="text-left px-4 py-3 font-bold" style={{width: '400px'}}>시뮬레이션</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stepsEntry.map((step, idx) => (
                                    <tr key={idx} className={'border-b hover:bg-gray-50 ' + (currentStep1 >= step.num ? 'bg-blue-50' : '')}>
                                        <td className="text-center px-4 py-3">
                                            <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm">{step.num}</span>
                                        </td>
                                        <td className="px-4 py-3 font-medium">{step.title}</td>
                                        <td className="px-4 py-3 text-gray-600">{step.desc}</td>
                                        <td className="text-left px-4 py-3">
                                            {currentStep1 >= step.num ? (
                                                <div className="flex items-center gap-2 fade-in">
                                                    <i className="fas fa-check-circle text-green-600"></i>
                                                    <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded break-all">
                                                        {getSimValue1(step.num)}
                                                    </span>
                                                </div>
                                            ) : currentStep1 === step.num - 1 && isRunning1 ? (
                                                <i className="fas fa-spinner fa-spin text-blue-600 text-xl"></i>
                                            ) : (
                                                <i className="fas fa-circle text-gray-300 text-xl"></i>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {currentStep1 >= 6 && (
                    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center fade-in">
                        <i className="fas fa-check-circle text-6xl text-green-600 mb-4"></i>
                        <div className="text-2xl font-bold text-green-900 mb-2">노드 진입 완료!</div>
                        <div className="text-sm text-green-700 mb-3">
                            {newNodeId}가 Layer 1에 성공적으로 추가되었습니다.
                        </div>
                        <div className="bg-white rounded p-3 inline-block">
                            <div className="text-xs text-gray-600">
                                <strong>데이터 절약:</strong> 4,800 bytes → 48 bytes (100배 감소)<br/>
                                <strong>검증 효율:</strong> 100번 검증 → 1번 검증 (100배 빠름)
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 구분선 */}
            <div className="border-t-4 border-gray-300 my-12"></div>

            {/* 섹션 2: 노드 탈퇴 */}
            <div className="mb-12">
                <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-400 rounded-lg p-6 mb-6">
                    <h5 className="text-xl font-bold text-red-900 mb-4 flex items-center">
                        <i className="fas fa-sign-out-alt mr-3"></i>
                        노드 탈퇴 (Node Exit)
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">탈퇴 노드 ID</label>
                            <input
                                type="text"
                                value={exitNodeId}
                                onChange={(e) => setExitNodeId(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="예: Node_4523"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">탈퇴 사유</label>
                            <input
                                type="text"
                                value={exitReason}
                                onChange={(e) => setExitReason(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="예: 이중 지불 시도 탐지"
                            />
                        </div>
                    </div>
                    <button
                        onClick={runNodeExit}
                        disabled={isRunning2 || !exitNodeId.trim() || !exitReason.trim()}
                        className="w-full px-6 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-700 disabled:opacity-50"
                    >
                        {isRunning2 ? '탈퇴 처리 중...' : '노드 탈퇴 시뮬레이션 실행'}
                    </button>
                    <div className="bg-white rounded p-4 border border-red-300 mt-4">
                        <div className="text-xs text-gray-600 mb-2">
                            <strong>시나리오:</strong> 악의적 행위가 탐지된 노드를 200개 증인 노드가 탈퇴 처리
                        </div>
                        <div className="text-xs text-gray-600">
                            <strong>BLS 효과:</strong> 200개 서명(14KB) → 집계 서명 1개(48B) = <span className="text-red-600 font-bold">291배 감소</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-6">
                    <div className="bg-red-600 text-white px-6 py-4">
                        <h4 className="text-lg font-bold flex items-center">
                            <i className="fas fa-tasks mr-3"></i>노드 탈퇴 프로세스 (BLS 서명 집계)
                        </h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b-2 border-gov-border bg-gray-50">
                                    <th className="text-center px-4 py-3 font-bold" style={{width: '80px'}}>단계</th>
                                    <th className="text-left px-4 py-3 font-bold">작업</th>
                                    <th className="text-left px-4 py-3 font-bold">설명</th>
                                    <th className="text-left px-4 py-3 font-bold" style={{width: '400px'}}>시뮬레이션</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stepsExit.map((step, idx) => (
                                    <tr key={idx} className={'border-b hover:bg-gray-50 ' + (currentStep2 >= step.num ? 'bg-red-50' : '')}>
                                        <td className="text-center px-4 py-3">
                                            <span className="inline-flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full font-bold text-sm">{step.num}</span>
                                        </td>
                                        <td className="px-4 py-3 font-medium">{step.title}</td>
                                        <td className="px-4 py-3 text-gray-600">{step.desc}</td>
                                        <td className="text-left px-4 py-3">
                                            {currentStep2 >= step.num ? (
                                                <div className="flex items-center gap-2 fade-in">
                                                    <i className="fas fa-check-circle text-green-600"></i>
                                                    <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded break-all">
                                                        {getSimValue2(step.num)}
                                                    </span>
                                                </div>
                                            ) : currentStep2 === step.num - 1 && isRunning2 ? (
                                                <i className="fas fa-spinner fa-spin text-red-600 text-xl"></i>
                                            ) : (
                                                <i className="fas fa-circle text-gray-300 text-xl"></i>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {currentStep2 >= 6 && (
                    <div className="bg-orange-50 border-2 border-orange-500 rounded-lg p-6 text-center fade-in">
                        <i className="fas fa-exclamation-triangle text-6xl text-orange-600 mb-4"></i>
                        <div className="text-2xl font-bold text-orange-900 mb-2">노드 탈퇴 완료!</div>
                        <div className="text-sm text-orange-700 mb-3">
                            {exitNodeId}가 "{exitReason}" 사유로 제거되었습니다.
                        </div>
                        <div className="bg-white rounded p-3 inline-block">
                            <div className="text-xs text-gray-600">
                                <strong>데이터 절약:</strong> 9,600 bytes → 48 bytes (200배 감소)<br/>
                                <strong>검증 효율:</strong> 200번 검증 → 1번 검증 (200배 빠름)<br/>
                                <strong>블랙리스트:</strong> 48 bytes로 영구 저장 (14KB 절약)
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
