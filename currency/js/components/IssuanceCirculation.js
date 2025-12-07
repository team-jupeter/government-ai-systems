// IssuanceCirculation.js - EGCT 발행과 유통 (BLS + UTXO 상세 + 수수료 무료)
const IssuanceCirculation = () => {
    const [p2pStep, setP2pStep] = React.useState(0);
    const [transactionData, setTransactionData] = React.useState({
        // 송신자 (Alice)
        senderName: 'Alice',
        senderPrivateKey: 'e8f32e723decf4051aefac8e2c93c9c5b214313817cdb01a1494b917c8436b35',
        senderPublicKey: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb8',
        senderBalance: 5000,
        
        // 수신자 (Bob)
        receiverName: 'Bob',
        receiverPublicKey: '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
        receiverBalance: 2000,
        
        // 거래 정보
        amount: 1000,
        timestamp: null,
        txHash: null,
        ecdsaSignature: null,
        blsSignature: null,
        utxoInputs: [],
        utxoOutputs: [],
        
        // 단계별 상태
        currentStep: 0,
        ledgerBefore: null,
        ledgerAfter: null
    });

    const [showDetails, setShowDetails] = React.useState({
        privateKey: false,
        signature: false,
        utxo: false,
        verification: false,
        ledger: false,
        bls: false
    });

    // SHA-256 해시 시뮬레이션
    const generateHash = (input) => {
        const str = typeof input === 'object' ? JSON.stringify(input) : String(input);
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).padStart(64, '0').substring(0, 64);
    };

    // ECDSA 서명 시뮬레이션 (secp256k1)
    const signTransactionECDSA = (privateKey, txData) => {
        const dataToSign = JSON.stringify(txData);
        const signature = generateHash(privateKey + dataToSign);
        return {
            r: signature.substring(0, 32),
            s: signature.substring(32, 64),
            v: 27,
            size: 65 // bytes
        };
    };

    // BLS 서명 시뮬레이션 (BLS12-381)
    const signTransactionBLS = (privateKey, txData) => {
        const dataToSign = JSON.stringify(txData);
        const signature = generateHash('BLS_' + privateKey + dataToSign);
        return {
            signature: signature.substring(0, 48), // 48 bytes
            publicKey: signature.substring(48, 96), // 96 bytes
            size: 48 // bytes
        };
    };

    // 거래 시뮬레이션 실행
    const runDetailedP2PDemo = async () => {
        setP2pStep(0);
        
        const timestamp = Date.now();
        const nonce = Math.floor(Math.random() * 1000000);
        
        // Step 1: Private Key로 디지털 서명 생성
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const txData = {
            from: transactionData.senderPublicKey,
            to: transactionData.receiverPublicKey,
            amount: transactionData.amount,
            timestamp: timestamp,
            nonce: nonce
        };
        
        const ecdsaSignature = signTransactionECDSA(transactionData.senderPrivateKey, txData);
        const blsSignature = signTransactionBLS(transactionData.senderPrivateKey, txData);
        const txHash = generateHash(txData);
        
        // UTXO 입력: Alice가 이전에 받았던 것들 (Alice 소유)
        const utxoInputs = [
            { 
                previousTxHash: generateHash('charlie_to_alice_tx1'), 
                outputIndex: 0, 
                amount: 3000,
                owner: 'Alice',
                ownerAddress: transactionData.senderPublicKey,
                scriptSig: ecdsaSignature.r.substring(0, 16),
                note: 'Alice가 Charlie로부터 받은 UTXO'
            },
            { 
                previousTxHash: generateHash('david_to_alice_tx2'), 
                outputIndex: 1, 
                amount: 2000,
                owner: 'Alice',
                ownerAddress: transactionData.senderPublicKey,
                scriptSig: ecdsaSignature.r.substring(16, 32),
                note: 'Alice가 David로부터 받은 UTXO'
            }
        ];
        
        // UTXO 출력: 새로 생성되는 것들 (Bob + Alice 잔돈)
        const utxoOutputs = [
            { 
                address: transactionData.receiverPublicKey,
                owner: 'Bob',
                amount: 1000,
                newOwnership: true,
                note: 'Bob이 받는 새 UTXO (Bob만 사용 가능)'
            },
            { 
                address: transactionData.senderPublicKey,
                owner: 'Alice',
                amount: 4000, // 5000 - 1000 = 4000 (수수료 없음!)
                newOwnership: true,
                note: 'Alice에게 돌아오는 잔돈 UTXO (Alice만 사용 가능)'
            }
        ];
        
        setTransactionData(prev => ({
            ...prev,
            timestamp,
            txHash,
            ecdsaSignature,
            blsSignature,
            utxoInputs,
            utxoOutputs,
            ledgerBefore: {
                [prev.senderPublicKey]: 5000,
                [prev.receiverPublicKey]: 2000
            }
        }));
        
        setP2pStep(1);
        
        // Step 2: 네트워크 브로드캐스트
        await new Promise(resolve => setTimeout(resolve, 1500));
        setP2pStep(2);
        
        // Step 3: AI 검증
        await new Promise(resolve => setTimeout(resolve, 1500));
        setP2pStep(3);
        
        // Step 4: OpenHash 기록 및 Ledger 갱신
        await new Promise(resolve => setTimeout(resolve, 1500));
        setTransactionData(prev => ({
            ...prev,
            senderBalance: prev.senderBalance - prev.amount, // 수수료 없음
            receiverBalance: prev.receiverBalance + prev.amount,
            ledgerAfter: {
                [prev.senderPublicKey]: 4000, // 5000 - 1000
                [prev.receiverPublicKey]: 3000 // 2000 + 1000
            }
        }));
        setP2pStep(4);
    };

    const resetSimulation = () => {
        setP2pStep(0);
        setTransactionData(prev => ({
            ...prev,
            senderBalance: 5000,
            receiverBalance: 2000,
            timestamp: null,
            txHash: null,
            ecdsaSignature: null,
            blsSignature: null,
            utxoInputs: [],
            utxoOutputs: [],
            currentStep: 0,
            ledgerBefore: null,
            ledgerAfter: null
        }));
        setShowDetails({
            privateKey: false,
            signature: false,
            utxo: false,
            verification: false,
            ledger: false,
            bls: false
        });
    };

    return (
        <div className="space-y-6">
            {/* 페이지 제목 */}
            <div className="border-l-4 border-gov-blue pl-4 py-2">
                <h2 className="text-2xl font-bold text-gov-text">EGCT 발행과 유통</h2>
                <p className="text-sm text-gray-600 mt-1">자산기반 디지털 화폐의 발행 구조 및 유통 체계</p>
            </div>

            {/* 기본 정보 테이블 */}
            <div className="bg-white border border-gray-300 overflow-hidden">
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-300">
                    <h3 className="text-lg font-bold text-gov-text">기본 정보</h3>
                </div>
                <div className="p-6">
                    <table className="w-full">
                        <tbody>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 bg-gray-50 font-medium text-gray-700 w-1/4">화폐명</th>
                                <td className="py-3 px-4">EGCT (단위: T)</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 bg-gray-50 font-medium text-gray-700">유형</th>
                                <td className="py-3 px-4">자산기반화폐 (Asset Based Currency)</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 bg-gray-50 font-medium text-gray-700">발행 주체</th>
                                <td className="py-3 px-4">AI City Inc. (ACI) - 대한민국 법인</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 bg-gray-50 font-medium text-gray-700">총 발행량</th>
                                <td className="py-3 px-4">100,000,000 T (1억 EGCT)</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 bg-gray-50 font-medium text-gray-700">발행 가격</th>
                                <td className="py-3 px-4">₩1,000 / 1T (시장에서 공정가치 결정)</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 bg-gray-50 font-medium text-gray-700">담보 가치</th>
                                <td className="py-3 px-4">약 10조원 (추정)</td>
                            </tr>
                            <tr>
                                <th className="text-left py-3 px-4 bg-gray-50 font-medium text-gray-700">거래 수수료</th>
                                <td className="py-3 px-4"><span className="font-bold text-green-600">0원 (무료)</span> - 국가/중앙은행 운영 모델</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 담보 자산 구성 */}
            <div className="bg-white border border-gray-300">
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-300">
                    <h3 className="text-lg font-bold text-gov-text">담보 자산 포트폴리오</h3>
                </div>
                <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { title: '특허 기술', items: ['OpenHash 분산원장 기술', 'FPGA 기반 AI 재무제표 검증', '민간 경쟁형 디지털 화폐 발행 시스템'] },
                            { title: '유가증권', items: ['국내외 주식', '채권', 'ELS/DLS 등 파생상품'] },
                            { title: '부동산', items: ['상업용 부동산', '주거용 부동산', '리츠(REITs)'] },
                            { title: '기타 자산', items: ['금, 은 등 귀금속', '국적화폐 (KRW, USD, EUR, JPY)', '제주 AI 교육도시 프로젝트'] }
                        ].map((category, idx) => (
                            <div key={idx} className="border border-gray-200 p-4">
                                <h4 className="font-bold text-gov-text mb-3">{category.title}</h4>
                                <ul className="space-y-1">
                                    {category.items.map((item, i) => (
                                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                            <span className="text-gov-blue mt-1">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 유통 단계 */}
            <div className="bg-white border border-gray-300">
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-300">
                    <h3 className="text-lg font-bold text-gov-text">유통 단계별 계획</h3>
                </div>
                <div className="p-6">
                    <div className="space-y-6">
                        {/* Phase 1 */}
                        <div className="border-l-4 border-blue-500 pl-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-blue-500 text-white px-3 py-1 text-sm font-bold">2026년</div>
                                <h4 className="font-bold text-gov-text">Phase 1: 국적화폐 교환</h4>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 p-4 mb-3">
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">•</span>
                                        <span>EGCT ↔ KRW, USD, EUR, JPY 실시간 교환 개시</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">•</span>
                                        <span>P2P 개인간 거래 시작 (수수료 0원)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">•</span>
                                        <span>OpenHash Layer 1-4 AWS 클라우드 환경 운영</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 font-bold">•</span>
                                        <span>시스템 안정성 검증 및 테스트 기간</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="text-sm text-gray-600">
                                <strong>목표:</strong> 디지털 화폐 거래 시스템 안정화 및 사용자 확대
                            </div>
                        </div>

                        {/* Phase 2 */}
                        <div className="border-l-4 border-green-600 pl-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-green-600 text-white px-3 py-1 text-sm font-bold">2027년</div>
                                <h4 className="font-bold text-gov-text">Phase 2: 물품 결제 개시</h4>
                            </div>
                            <div className="bg-green-50 border border-green-200 p-4 mb-3">
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold">•</span>
                                        <span>각종 물품 및 서비스 직접 구매 가능</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold">•</span>
                                        <span>부동산 등 물리적 자산과 교환</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold">•</span>
                                        <span>오프라인 가맹점 네트워크 확대</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold">•</span>
                                        <span>글로벌 결제 네트워크 연동</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="text-sm text-gray-600">
                                <strong>목표:</strong> 실물 경제와의 완전한 통합
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 디지털 서명 알고리즘 비교 */}
            <div className="bg-white border border-gray-300">
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-300">
                    <h3 className="text-lg font-bold text-gov-text">디지털 서명 알고리즘: ECDSA vs BLS</h3>
                </div>
                <div className="p-6 space-y-4">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <p className="text-sm text-gray-700 leading-relaxed">
                            OpenHash는 계층별로 최적의 서명 알고리즘을 적용합니다. 
                            Layer 1-3는 빠른 검증을 위해 ECDSA를 사용하고, Layer 4는 다중 서명 집계가 가능한 BLS를 사용합니다.
                        </p>
                    </div>

                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">구분</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">ECDSA (secp256k1)</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">BLS (BLS12-381)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-medium">서명 크기</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">64-65 bytes</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm font-bold text-green-700">48 bytes (26% 작음)</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-medium">공개키 크기</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm font-bold text-green-700">33/65 bytes (작음)</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">96 bytes</td>
                            </tr>
                            <tr className="bg-yellow-50">
                                <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-medium">서명 집계</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">불가능</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm font-bold text-green-700">가능 (핵심 장점!)</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-medium">검증 속도</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm font-bold text-green-700">빠름 (단일)</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm font-bold text-green-700">매우 빠름 (집계 시)</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-medium">사용처</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">Bitcoin, Ethereum 1.0</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">Ethereum 2.0, Chia</td>
                            </tr>
                            <tr className="bg-blue-50">
                                <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-medium">OpenHash 적용</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm font-bold">P2P 개인간 거래</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm font-bold">Layer 간 통신 및 합의</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="border border-blue-300 bg-blue-50 p-4">
                        <h4 className="font-bold text-blue-800 mb-2">BLS 서명 집계 예시</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                            <div><strong>시나리오:</strong> Layer 간 통신에서 1,000개 거래 합의</div>
                            <div className="grid md:grid-cols-2 gap-3 mt-2">
                                <div className="bg-white border border-red-200 p-3">
                                    <div className="font-bold text-red-700 mb-1">ECDSA 방식</div>
                                    <div className="text-xs space-y-1">
                                        <div>• 1,000개 서명 각각 검증</div>
                                        <div>• 검증 시간: 1,000회</div>
                                        <div>• 데이터 크기: 65KB</div>
                                    </div>
                                </div>
                                <div className="bg-white border border-green-200 p-3">
                                    <div className="font-bold text-green-700 mb-1">BLS 방식</div>
                                    <div className="text-xs space-y-1">
                                        <div>• 1,000개 서명 → 1개로 집계</div>
                                        <div>• 검증 시간: 1회만!</div>
                                        <div>• 데이터 크기: 48 bytes</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-green-100 border-l-4 border-green-500 p-2 mt-2">
                                <strong>효율:</strong> 검증 시간 99.9% 단축, 네트워크 대역폭 99.9% 절감
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* P2P 거래 메커니즘 - 상세 버전 */}
            <div className="bg-white border border-gray-300">
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-300">
                    <h3 className="text-lg font-bold text-gov-text">P2P 거래 메커니즘 (상세)</h3>
                </div>
                <div className="p-6 space-y-6">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <p className="text-sm text-gray-700 leading-relaxed">
                            EGCT는 비트코인의 P2P 거래 알고리즘을 채택하여 타원곡선 암호(ECDSA)와 UTXO 모델을 사용합니다. 
                            Private Key로 서명하고 Public Key로 검증하는 방식으로 안전한 거래를 보장하며, 
                            <strong className="text-green-700"> 국가/중앙은행 운영 모델이므로 거래 수수료가 없습니다.</strong>
                        </p>
                    </div>

                    {/* 거래 예시 설정 */}
                    <div className="border border-gray-300 bg-gray-50 p-4">
                        <h4 className="font-bold text-gov-text mb-3">거래 예시 시나리오</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white border border-blue-300 p-3">
                                <div className="font-bold text-blue-700 mb-2">송신자: {transactionData.senderName}</div>
                                <div className="text-xs space-y-1">
                                    <div><span className="font-medium">보유량:</span> {transactionData.senderBalance} T</div>
                                    <div><span className="font-medium">Public Key:</span> 
                                        <div className="font-mono text-xs break-all">{transactionData.senderPublicKey}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white border border-green-300 p-3">
                                <div className="font-bold text-green-700 mb-2">수신자: {transactionData.receiverName}</div>
                                <div className="text-xs space-y-1">
                                    <div><span className="font-medium">보유량:</span> {transactionData.receiverBalance} T</div>
                                    <div><span className="font-medium">Public Key:</span>
                                        <div className="font-mono text-xs break-all">{transactionData.receiverPublicKey}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 text-center bg-yellow-100 border border-yellow-300 p-2">
                            <span className="font-bold">거래 금액: {transactionData.amount} T</span>
                            <span className="text-sm text-green-700 ml-2 font-bold">(수수료: 0원 - 무료)</span>
                        </div>
                    </div>

                    {/* 시뮬레이션 컨트롤 */}
                    <div className="flex justify-center gap-3">
                        <button
                            onClick={runDetailedP2PDemo}
                            disabled={p2pStep > 0 && p2pStep < 4}
                            className="px-6 py-3 bg-gov-blue text-white font-bold hover:bg-gov-blue-light disabled:opacity-50 transition-colors"
                        >
                            {p2pStep > 0 && p2pStep < 4 ? '처리 중...' : '상세 시뮬레이션 시작'}
                        </button>
                        {p2pStep > 0 && (
                            <button
                                onClick={resetSimulation}
                                className="px-6 py-3 bg-gray-500 text-white font-bold hover:bg-gray-600 transition-colors"
                            >
                                초기화
                            </button>
                        )}
                    </div>

                    {/* 단계별 상세 정보 */}
                    {p2pStep >= 1 && (
                        <div className="space-y-4">
                            {/* Step 1: Private Key & 디지털 서명 */}
                            <div className="border-2 border-green-500 bg-green-50 p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-bold text-green-800">✓ Step 1: Private Key로 디지털 서명 생성</h4>
                                    <button
                                        onClick={() => setShowDetails(prev => ({...prev, privateKey: !prev.privateKey}))}
                                        className="text-xs px-3 py-1 bg-green-600 text-white hover:bg-green-700"
                                    >
                                        {showDetails.privateKey ? '숨기기' : '상세보기'}
                                    </button>
                                </div>
                                
                                {showDetails.privateKey && (
                                    <div className="bg-white border border-green-300 p-4 space-y-3">
                                        <div>
                                            <div className="text-sm font-bold text-gray-700 mb-1">1-1. Alice의 Private Key (비공개)</div>
                                            <div className="bg-red-50 border border-red-300 p-2 font-mono text-xs break-all">
                                                {transactionData.senderPrivateKey}
                                            </div>
                                            <div className="text-xs text-red-600 mt-1">⚠️ Private Key는 절대 외부에 노출되지 않습니다</div>
                                        </div>

                                        <div>
                                            <div className="text-sm font-bold text-gray-700 mb-1">1-2. 거래 데이터 구성</div>
                                            <div className="bg-gray-50 border border-gray-300 p-2 font-mono text-xs">
                                                <div>from: {transactionData.senderPublicKey}</div>
                                                <div>to: {transactionData.receiverPublicKey}</div>
                                                <div>amount: {transactionData.amount} T</div>
                                                <div className="text-green-700 font-bold">fee: 0 T (무료)</div>
                                                <div>timestamp: {transactionData.timestamp}</div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-sm font-bold text-gray-700 mb-1">1-3. ECDSA 디지털 서명 생성 (P2P 거래용)</div>
                                            <div className="bg-blue-50 border border-blue-300 p-3 space-y-2">
                                                <div className="text-xs">
                                                    <strong>알고리즘:</strong> Elliptic Curve Digital Signature Algorithm (secp256k1)
                                                </div>
                                                {transactionData.ecdsaSignature && (
                                                    <>
                                                        <div className="text-xs">
                                                            <strong>서명 r:</strong>
                                                            <div className="font-mono break-all">{transactionData.ecdsaSignature.r}</div>
                                                        </div>
                                                        <div className="text-xs">
                                                            <strong>서명 s:</strong>
                                                            <div className="font-mono break-all">{transactionData.ecdsaSignature.s}</div>
                                                        </div>
                                                        <div className="text-xs">
                                                            <strong>복구 ID (v):</strong> {transactionData.ecdsaSignature.v}
                                                        </div>
                                                        <div className="text-xs text-gray-600">
                                                            <strong>서명 크기:</strong> {transactionData.ecdsaSignature.size} bytes
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-sm font-bold text-gray-700 mb-1">1-4. BLS 디지털 서명 생성 (Layer 간 통신용)</div>
                                            <div className="bg-purple-50 border border-purple-300 p-3 space-y-2">
                                                <div className="text-xs">
                                                    <strong>알고리즘:</strong> Boneh-Lynn-Shacham (BLS12-381)
                                                </div>
                                                {transactionData.blsSignature && (
                                                    <>
                                                        <div className="text-xs">
                                                            <strong>서명:</strong>
                                                            <div className="font-mono break-all text-xs">{transactionData.blsSignature.signature}</div>
                                                        </div>
                                                        <div className="text-xs text-gray-600">
                                                            <strong>서명 크기:</strong> {transactionData.blsSignature.size} bytes (ECDSA보다 26% 작음)
                                                        </div>
                                                        <div className="text-xs text-green-700 font-bold">
                                                            ✓ 다중 서명 집계 가능 (Layer 간 통신 및 합의용)
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-sm font-bold text-gray-700 mb-1">1-5. UTXO 입력 (Alice가 소비하는 것)</div>
                                            <div className="text-xs text-gray-600 mb-2">
                                                Alice가 이전에 받은 UTXO를 입력으로 사용합니다. 이 UTXO들은 Alice만 사용할 수 있습니다.
                                            </div>
                                            <table className="w-full text-xs border border-gray-300">
                                                <thead>
                                                    <tr className="bg-gray-100">
                                                        <th className="border border-gray-300 px-2 py-1">이전 거래</th>
                                                        <th className="border border-gray-300 px-2 py-1">소유자</th>
                                                        <th className="border border-gray-300 px-2 py-1">금액</th>
                                                        <th className="border border-gray-300 px-2 py-1">비고</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {transactionData.utxoInputs.map((input, idx) => (
                                                        <tr key={idx} className="bg-blue-50">
                                                            <td className="border border-gray-300 px-2 py-1 font-mono">{input.previousTxHash.substring(0, 12)}...</td>
                                                            <td className="border border-gray-300 px-2 py-1 text-center font-bold text-blue-700">{input.owner}</td>
                                                            <td className="border border-gray-300 px-2 py-1 text-right">{input.amount} T</td>
                                                            <td className="border border-gray-300 px-2 py-1 text-xs">{input.note}</td>
                                                        </tr>
                                                    ))}
                                                    <tr className="bg-yellow-50 font-bold">
                                                        <td colSpan="2" className="border border-gray-300 px-2 py-1 text-right">입력 합계:</td>
                                                        <td className="border border-gray-300 px-2 py-1 text-right">
                                                            {transactionData.utxoInputs.reduce((sum, input) => sum + input.amount, 0)} T
                                                        </td>
                                                        <td className="border border-gray-300 px-2 py-1 text-xs text-red-600">이 UTXO들은 소멸됨</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div>
                                            <div className="text-sm font-bold text-gray-700 mb-1">1-6. UTXO 출력 (새로 생성되는 소유권)</div>
                                            <div className="text-xs text-gray-600 mb-2">
                                                새로운 UTXO가 생성되어 Bob과 Alice(잔돈)에게 분배됩니다. 각자의 Private Key로만 사용 가능합니다.
                                            </div>
                                            <table className="w-full text-xs border border-gray-300">
                                                <thead>
                                                    <tr className="bg-gray-100">
                                                        <th className="border border-gray-300 px-2 py-1">소유자</th>
                                                        <th className="border border-gray-300 px-2 py-1">주소</th>
                                                        <th className="border border-gray-300 px-2 py-1">금액</th>
                                                        <th className="border border-gray-300 px-2 py-1">비고</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {transactionData.utxoOutputs.map((output, idx) => (
                                                        <tr key={idx} className={output.owner === 'Bob' ? 'bg-green-50' : 'bg-blue-50'}>
                                                            <td className="border border-gray-300 px-2 py-1 text-center font-bold">{output.owner}</td>
                                                            <td className="border border-gray-300 px-2 py-1 font-mono text-xs">{output.address.substring(0, 16)}...</td>
                                                            <td className="border border-gray-300 px-2 py-1 text-right">{output.amount} T</td>
                                                            <td className="border border-gray-300 px-2 py-1 text-xs">{output.note}</td>
                                                        </tr>
                                                    ))}
                                                    <tr className="bg-green-100 font-bold">
                                                        <td colSpan="2" className="border border-gray-300 px-2 py-1 text-right">출력 합계:</td>
                                                        <td className="border border-gray-300 px-2 py-1 text-right">
                                                            {transactionData.utxoOutputs.reduce((sum, output) => sum + output.amount, 0)} T
                                                        </td>
                                                        <td className="border border-gray-300 px-2 py-1 text-xs text-green-700">수수료 0원</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="mt-2 bg-green-50 border-l-4 border-green-500 p-2 text-xs text-gray-700">
                                                <strong>입력 5,000 T = 출력 5,000 T</strong> - 국가 운영 모델이므로 수수료 없음!
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-sm font-bold text-gray-700 mb-1">1-7. UTXO 소유권 흐름도</div>
                                            <div className="bg-gray-50 border border-gray-300 p-3">
                                                <div className="space-y-2 text-xs">
                                                    <div className="bg-blue-100 border-l-4 border-blue-500 p-2">
                                                        <strong>입력 (Alice 소유):</strong> Charlie → Alice (3,000 T) + David → Alice (2,000 T)
                                                    </div>
                                                    <div className="text-center text-gray-600 font-bold">↓ Alice의 Private Key로 서명하여 소비 ↓</div>
                                                    <div className="bg-green-100 border-l-4 border-green-500 p-2">
                                                        <strong>출력 (새 소유권):</strong> Alice → Bob (1,000 T) + Alice → Alice (4,000 T 잔돈)
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-sm font-bold text-gray-700 mb-1">1-8. 거래 해시 (Transaction ID)</div>
                                            <div className="bg-gray-50 border border-gray-300 p-2 font-mono text-xs break-all">
                                                {transactionData.txHash}
                                            </div>
                                            <div className="text-xs text-gray-600 mt-1">
                                                SHA-256(거래 데이터) = 고유한 거래 식별자
                                            </div>
                                        </div>

                                        <div className="bg-blue-100 border-l-4 border-blue-500 p-3">
                                            <div className="text-sm font-bold text-blue-800">핵심 개념</div>
                                            <ul className="text-xs text-gray-700 mt-2 space-y-1">
                                                <li><strong>Private Key:</strong> 소유자만 알고 있는 비밀키로 UTXO를 "소비"할 수 있음</li>
                                                <li><strong>Public Key:</strong> 공개된 주소로 다른 사람이 UTXO를 보낼 수 있음</li>
                                                <li><strong>UTXO 입력:</strong> Alice가 소비하는 것 (Alice 소유였던 것들)</li>
                                                <li><strong>UTXO 출력:</strong> 새로 생성되는 것 (Bob + Alice 잔돈)</li>
                                                <li><strong>입력 UTXO:</strong> 영구 소멸 (이중 지불 방지)</li>
                                                <li><strong>출력 UTXO:</strong> 새 소유자가 다음 거래에서 입력으로 사용 가능</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Step 2: 네트워크 브로드캐스트 */}
                            {p2pStep >= 2 && (
                                <div className={`border-2 p-4 ${p2pStep >= 2 ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-bold text-green-800">✓ Step 2: P2P 네트워크 브로드캐스트</h4>
                                        <button
                                            onClick={() => setShowDetails(prev => ({...prev, signature: !prev.signature}))}
                                            className="text-xs px-3 py-1 bg-green-600 text-white hover:bg-green-700"
                                        >
                                            {showDetails.signature ? '숨기기' : '상세보기'}
                                        </button>
                                    </div>
                                    
                                    {showDetails.signature && (
                                        <div className="bg-white border border-green-300 p-4 space-y-3">
                                            <div>
                                                <div className="text-sm font-bold text-gray-700 mb-2">2-1. 거래 패킷 구성</div>
                                                <div className="bg-gray-50 border border-gray-300 p-3 space-y-2 text-xs font-mono">
                                                    <div><strong>Version:</strong> 1</div>
                                                    <div><strong>TxHash:</strong> {transactionData.txHash}</div>
                                                    <div><strong>Inputs:</strong> {transactionData.utxoInputs.length}개 (Alice 소유)</div>
                                                    <div><strong>Outputs:</strong> {transactionData.utxoOutputs.length}개 (Bob + Alice 잔돈)</div>
                                                    <div><strong>ECDSA Signature:</strong> 65 bytes</div>
                                                    <div><strong>BLS Signature:</strong> 48 bytes</div>
                                                    <div><strong>Timestamp:</strong> {transactionData.timestamp}</div>
                                                    <div className="text-green-600"><strong>패킷 크기:</strong> 약 256 bytes</div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-sm font-bold text-gray-700 mb-2">2-2. P2P 네트워크 전파</div>
                                                <div className="grid grid-cols-3 gap-2 text-xs">
                                                    {['Layer 1 Node #342', 'Layer 1 Node #587', 'Layer 1 Node #129', 
                                                      'Layer 2 Node #45', 'Layer 2 Node #78', 'Layer 3 Node #12'].map((node, idx) => (
                                                        <div key={idx} className="bg-blue-100 border border-blue-300 p-2 text-center">
                                                            <div className="font-bold">{node}</div>
                                                            <div className="text-green-600 mt-1">✓ 수신 완료</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="bg-blue-100 border-l-4 border-blue-500 p-3">
                                                <div className="text-xs text-gray-700">
                                                    <strong>전파 방식:</strong> Gossip Protocol - 각 노드가 연결된 피어에게 전송하여 
                                                    지수적으로 확산됩니다. 평균 3초 이내에 전체 네트워크에 도달합니다.
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Step 3: AI 검증 */}
                            {p2pStep >= 3 && (
                                <div className={`border-2 p-4 ${p2pStep >= 3 ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-bold text-green-800">✓ Step 3: FPGA 기반 AI 검증</h4>
                                        <button
                                            onClick={() => setShowDetails(prev => ({...prev, verification: !prev.verification}))}
                                            className="text-xs px-3 py-1 bg-green-600 text-white hover:bg-green-700"
                                        >
                                            {showDetails.verification ? '숨기기' : '상세보기'}
                                        </button>
                                    </div>
                                    
                                    {showDetails.verification && (
                                        <div className="bg-white border border-green-300 p-4 space-y-3">
                                            <div>
                                                <div className="text-sm font-bold text-gray-700 mb-2">3-1. 디지털 서명 검증</div>
                                                <div className="bg-gray-50 border border-gray-300 p-3 space-y-2 text-xs">
                                                    <div><strong>ECDSA 검증 (P2P):</strong> 서명 (r, s, v)로부터 Public Key 복구</div>
                                                    <div><strong>주소 일치:</strong> 복구된 Public Key가 Alice의 주소와 일치하는지 확인</div>
                                                    <div><strong>BLS 검증 (Layer 간):</strong> Layer 간 통신 서명 검증</div>
                                                    <div className="text-green-600 font-bold">✓ 서명 검증 성공 (0.008ms)</div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-sm font-bold text-gray-700 mb-2">3-2. UTXO 소유권 검증</div>
                                                <div className="bg-gray-50 border border-gray-300 p-3 space-y-2 text-xs">
                                                    <div><strong>입력 UTXO 확인:</strong> Alice 소유의 2개 UTXO가 실제로 존재하는지 확인</div>
                                                    <div><strong>이중 지불 검사:</strong> 동일 UTXO가 다른 거래에 사용되지 않았는지 확인</div>
                                                    <div><strong>잔액 검증:</strong> 입력 5,000 T = 출력 5,000 T (수수료 0원)</div>
                                                    <div className="text-green-600 font-bold">✓ UTXO 검증 성공 (0.012ms)</div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-sm font-bold text-gray-700 mb-2">3-3. AI 이상 거래 탐지</div>
                                                <div className="bg-gray-50 border border-gray-300 p-3">
                                                    <table className="w-full text-xs">
                                                        <thead>
                                                            <tr className="bg-gray-100">
                                                                <th className="border border-gray-300 px-2 py-1 text-left">검사 항목</th>
                                                                <th className="border border-gray-300 px-2 py-1 text-center">결과</th>
                                                                <th className="border border-gray-300 px-2 py-1 text-center">신뢰도</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="border border-gray-300 px-2 py-1">비정상 금액 패턴</td>
                                                                <td className="border border-gray-300 px-2 py-1 text-center text-green-600">정상</td>
                                                                <td className="border border-gray-300 px-2 py-1 text-center">99.8%</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-gray-300 px-2 py-1">의심스러운 주소</td>
                                                                <td className="border border-gray-300 px-2 py-1 text-center text-green-600">정상</td>
                                                                <td className="border border-gray-300 px-2 py-1 text-center">99.2%</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-gray-300 px-2 py-1">빠른 연속 거래</td>
                                                                <td className="border border-gray-300 px-2 py-1 text-center text-green-600">정상</td>
                                                                <td className="border border-gray-300 px-2 py-1 text-center">99.5%</td>
                                                            </tr>
                                                            <tr className="bg-green-50 font-bold">
                                                                <td className="border border-gray-300 px-2 py-1">종합 판정</td>
                                                                <td className="border border-gray-300 px-2 py-1 text-center text-green-600">승인</td>
                                                                <td className="border border-gray-300 px-2 py-1 text-center">99.4%</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <div className="text-xs text-green-600 font-bold mt-2">✓ AI 검증 완료 (0.012ms)</div>
                                                </div>
                                            </div>

                                            <div className="bg-blue-100 border-l-4 border-blue-500 p-3">
                                                <div className="text-xs text-gray-700">
                                                    <strong>처리 속도:</strong> FPGA 하드웨어 가속으로 총 0.032ms 이내 검증 완료 
                                                    (GPU 대비 353% 빠름, 전력 88.6% 절감)
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Step 4: OpenHash 기록 및 Ledger 갱신 */}
                            {p2pStep >= 4 && (
                                <div className="border-2 border-green-500 bg-green-50 p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-bold text-green-800">✓ Step 4: OpenHash 기록 및 Ledger 갱신</h4>
                                        <button
                                            onClick={() => setShowDetails(prev => ({...prev, ledger: !prev.ledger}))}
                                            className="text-xs px-3 py-1 bg-green-600 text-white hover:bg-green-700"
                                        >
                                            {showDetails.ledger ? '숨기기' : '상세보기'}
                                        </button>
                                    </div>
                                    
                                    {showDetails.ledger && (
                                        <div className="bg-white border border-green-300 p-4 space-y-3">
                                            <div>
                                                <div className="text-sm font-bold text-gray-700 mb-2">4-1. 확률적 계층 선택</div>
                                                <div className="bg-gray-50 border border-gray-300 p-3 space-y-2 text-xs">
                                                    <div><strong>SHA-256 재해싱:</strong> 거래 해시를 2회 재해싱</div>
                                                    <div><strong>확률 계산:</strong> 결과 mod 100</div>
                                                    <div className="text-blue-600 font-bold">→ Layer 1 선택 (70% 확률 구간)</div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-sm font-bold text-gray-700 mb-2">4-2. Ledger 상태 변경 (UTXO Set 업데이트)</div>
                                                <div className="grid md:grid-cols-2 gap-3">
                                                    <div>
                                                        <div className="bg-red-50 border border-red-300 p-2 mb-2">
                                                            <div className="text-xs font-bold text-red-700">변경 전 (Before)</div>
                                                        </div>
                                                        <table className="w-full text-xs border border-gray-300">
                                                            <thead>
                                                                <tr className="bg-gray-100">
                                                                    <th className="border border-gray-300 px-2 py-1 text-left">소유자</th>
                                                                    <th className="border border-gray-300 px-2 py-1 text-right">잔액</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td className="border border-gray-300 px-2 py-1">Alice</td>
                                                                    <td className="border border-gray-300 px-2 py-1 text-right">5,000 T</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="border border-gray-300 px-2 py-1">Bob</td>
                                                                    <td className="border border-gray-300 px-2 py-1 text-right">2,000 T</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    <div>
                                                        <div className="bg-green-50 border border-green-300 p-2 mb-2">
                                                            <div className="text-xs font-bold text-green-700">변경 후 (After)</div>
                                                        </div>
                                                        <table className="w-full text-xs border border-gray-300">
                                                            <thead>
                                                                <tr className="bg-gray-100">
                                                                    <th className="border border-gray-300 px-2 py-1 text-left">소유자</th>
                                                                    <th className="border border-gray-300 px-2 py-1 text-right">잔액</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr className="bg-yellow-50">
                                                                    <td className="border border-gray-300 px-2 py-1">Alice</td>
                                                                    <td className="border border-gray-300 px-2 py-1 text-right font-bold text-red-600">4,000 T ▼</td>
                                                                </tr>
                                                                <tr className="bg-green-50">
                                                                    <td className="border border-gray-300 px-2 py-1">Bob</td>
                                                                    <td className="border border-gray-300 px-2 py-1 text-right font-bold text-green-600">3,000 T ▲</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-sm font-bold text-gray-700 mb-2">4-3. UTXO Set 상세 변경</div>
                                                <div className="bg-gray-50 border border-gray-300 p-3 space-y-2 text-xs">
                                                    <div className="text-red-600"><strong>소멸된 UTXO (Spent):</strong></div>
                                                    <ul className="ml-4 space-y-1">
                                                        <li>• Alice의 UTXO #1: 3,000 T (Charlie로부터 받은 것) → SPENT</li>
                                                        <li>• Alice의 UTXO #2: 2,000 T (David로부터 받은 것) → SPENT</li>
                                                    </ul>
                                                    <div className="text-green-600 mt-2"><strong>생성된 UTXO (New):</strong></div>
                                                    <ul className="ml-4 space-y-1">
                                                        <li>• Bob의 새 UTXO: 1,000 T (Bob만 사용 가능)</li>
                                                        <li>• Alice의 잔돈 UTXO: 4,000 T (Alice만 사용 가능)</li>
                                                    </ul>
                                                    <div className="bg-green-50 border-l-4 border-green-500 p-2 mt-2">
                                                        <strong>수수료 없음:</strong> 입력 5,000 T = 출력 5,000 T (국가 운영 모델)
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-sm font-bold text-gray-700 mb-2">4-4. BLS 서명 집계 (Layer 간 통신)</div>
                                                <div className="bg-purple-50 border border-purple-300 p-3 space-y-2 text-xs">
                                                    <div><strong>시나리오:</strong> Layer 간 통신에서 1,000개 거래 합의</div>
                                                    <div><strong>ECDSA 방식:</strong> 1,000번 검증 필요</div>
                                                    <div className="text-green-700 font-bold"><strong>BLS 방식:</strong> 1,000개 서명을 1개로 집계 → 1번만 검증!</div>
                                                    <div className="bg-green-100 p-2 mt-1">
                                                        검증 시간: 99.9% 단축, 네트워크 대역폭: 99.9% 절감
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-sm font-bold text-gray-700 mb-2">4-5. Merkle Tree에 추가</div>
                                                <div className="bg-gray-50 border border-gray-300 p-3 text-xs">
                                                    <div className="mb-2"><strong>거래가 Merkle Tree의 Leaf로 추가됨</strong></div>
                                                    <div className="font-mono text-xs space-y-1">
                                                        <div>Leaf Hash: {transactionData.txHash?.substring(0, 32)}...</div>
                                                        <div>Branch Hash: (재계산됨)</div>
                                                        <div>Merkle Root: (업데이트됨)</div>
                                                    </div>
                                                    <div className="mt-2 text-green-600 font-bold">✓ 불변 기록 완료</div>
                                                </div>
                                            </div>

                                            <div className="bg-green-600 text-white p-4 text-center font-bold">
                                                ✓ 거래 완료! (총 소요 시간: 0.032ms, 수수료: 0원)
                                            </div>

                                            <div className="bg-blue-100 border-l-4 border-blue-500 p-3">
                                                <div className="text-xs text-gray-700">
                                                    <strong>핵심 차이점:</strong> 블록체인은 10분 이상 PoW 필요 + 수수료 부과, 
                                                    OpenHash는 확률적 계층 선택으로 0.032ms 내 즉시 확정 + 수수료 0원. 
                                                    에너지 소비 98.5% 절감 (121 TWh → 1.8 TWh/년)
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* 비교표 */}
                    {p2pStep === 0 && (
                        <div>
                            <h4 className="font-bold text-gov-text mb-3">비트코인 vs EGCT 비교</h4>
                            <table className="w-full border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2 text-left">구분</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">비트코인</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">EGCT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-medium">거래 생성</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm">ECDSA 디지털 서명</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm">ECDSA + BLS 서명 (동일)</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-medium">거래 모델</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm">UTXO 기반</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm">UTXO 기반 (동일)</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-medium">네트워크 전파</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm">P2P Gossip</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm">P2P Gossip (동일)</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-medium">검증 방식</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm">노드 독립 검증</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm">FPGA 기반 AI (0.032ms, 99.4%)</td>
                                    </tr>
                                    <tr className="bg-yellow-50">
                                        <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-medium">기록 방식</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm">블록체인 (PoW)</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm font-bold text-green-700">OpenHash (확률적 계층)</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-medium">처리 시간</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm">10분 이상</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm font-bold text-green-700">0.032ms (즉시)</td>
                                    </tr>
                                    <tr className="bg-green-50">
                                        <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-medium">거래 수수료</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm">필요 (채굴자 보상)</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm font-bold text-green-700">0원 (국가 운영)</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-medium">에너지 소비</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm">121 TWh/년</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm font-bold text-green-700">1.8 TWh/년 (98.5% 절감)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* AWS 테스트 환경 */}
            <div className="bg-white border border-gray-300">
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-300">
                    <h3 className="text-lg font-bold text-gov-text">2026년 AWS 테스트 환경</h3>
                </div>
                <div className="p-6">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                        <p className="text-sm text-gray-700">
                            2026년 1년간 EGCT의 OpenHash Layer 1, 2, 3, 4가 Amazon Web Services 클라우드 환경에서 운영되며, 
                            실제 거래 데이터를 통한 대규모 검증이 이루어집니다. <strong className="text-green-700">수수료 없이 운영됩니다.</strong>
                        </p>
                    </div>

                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">계층</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">노드 수</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">역할</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">서명 방식</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { layer: 'Layer 1', nodes: '800개', role: '읍면동급 (기초 처리)', sig: 'ECDSA' },
                                { layer: 'Layer 2', nodes: '32개', role: '시군구급 (중간 검증)', sig: 'ECDSA' },
                                { layer: 'Layer 3', nodes: '10개', role: '광역시도급 (상위 검증)', sig: 'ECDSA' },
                                { layer: 'Layer 4', nodes: '2개', role: '국가급 Representative (최종 합의)', sig: 'BLS 집계' }
                            ].map((item, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="border border-gray-300 px-4 py-2 font-medium">{item.layer}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">{item.nodes}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm">{item.role}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm">{item.sig}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-4 bg-gray-50 border border-gray-300 p-4">
                        <div className="text-sm text-gray-700 space-y-1">
                            <div><strong className="text-gov-text">검증 목표:</strong> 확률적 계층 선택 알고리즘의 안정성, 처리 속도, 
                            에너지 효율성을 실제 환경에서 검증하고, 2027년 물품 결제 서비스 시작을 위한 최적화를 수행합니다.</div>
                            <div><strong className="text-green-700">운영 모델:</strong> 국가/중앙은행이 네트워크를 직접 운영하므로 거래 수수료가 없습니다.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
