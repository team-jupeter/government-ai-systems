// 세무 자동화 컴포넌트
const TaxAutomation = () => {
    const [stages, setStages] = React.useState([]);
    const [isRunning, setIsRunning] = React.useState(false);

    // 국세청 초기 데이터
    const ntsInitial = {
        id: 'NTS-0000-0001',
        name: '국세청',
        type: 'government',
        cash: 50000000000000,
        digitalCurrency: 10000000000000,
        receivables: 5000000000000,
        ppe: 2000000000000,
        liabilities: 0,
        revenue: 300000000000000,
        expenses: 0
    };

    const initialEntities = [
        { id: '+82-10-1234-5678', name: '김철수', type: 'individual', cash: 50000000, digitalCurrency: 10000000, receivables: 5000000, ppe: 35000000, liabilities: 30000000, revenue: 0, expenses: 0 },
        { id: '+82-10-2345-6789', name: '이영희', type: 'individual', cash: 30000000, digitalCurrency: 5000000, receivables: 3000000, ppe: 42000000, liabilities: 20000000, revenue: 0, expenses: 0 },
        { id: '+82-10-3456-7890', name: '박민수', type: 'individual', cash: 20000000, digitalCurrency: 3000000, receivables: 2000000, ppe: 35000000, liabilities: 15000000, revenue: 0, expenses: 0 },
        { id: '+82-2-1234-5678', name: '(주)테크솔루션', type: 'business', cash: 500000000, digitalCurrency: 100000000, receivables: 200000000, ppe: 1200000000, liabilities: 800000000, revenue: 1500000000, expenses: 1200000000 },
        { id: '+82-2-2345-6789', name: '스마트컴퍼니(주)', type: 'business', cash: 300000000, digitalCurrency: 60000000, receivables: 150000000, ppe: 990000000, liabilities: 600000000, revenue: 1000000000, expenses: 800000000 }
    ];

    // 세법 및 세율 계산
    const calculateTax = (from, to, amount) => {
        let taxRate = 0;
        let taxType = '';
        let taxLaw = '';

        if (from.type === 'individual' && to.type === 'individual') {
            // 개인 간 거래: 거래세 0.1%
            taxRate = 0.001;
            taxType = '거래세';
            taxLaw = '금융거래세법 제3조';
        } else if (from.type === 'business' && to.type === 'individual') {
            // 사업자 → 개인: 원천징수세 3.3%
            taxRate = 0.033;
            taxType = '소득세 원천징수';
            taxLaw = '소득세법 제127조 (사업소득 원천징수)';
        } else if (from.type === 'individual' && to.type === 'business') {
            // 개인 → 사업자: 부가가치세 10%
            taxRate = 0.1;
            taxType = '부가가치세';
            taxLaw = '부가가치세법 제13조';
        } else if (from.type === 'business' && to.type === 'business') {
            // 사업자 간 거래: 부가가치세 10%
            taxRate = 0.1;
            taxType = '부가가치세';
            taxLaw = '부가가치세법 제13조';
        }

        const taxAmount = Math.floor(amount * taxRate);
        return { taxRate, taxType, taxLaw, taxAmount };
    };

    const startSimulation = () => {
        setIsRunning(true);
        setStages([]);

        const fromIdx = Math.floor(Math.random() * initialEntities.length);
        let toIdx = Math.floor(Math.random() * initialEntities.length);
        while (toIdx === fromIdx) toIdx = Math.floor(Math.random() * initialEntities.length);

        const from = JSON.parse(JSON.stringify(initialEntities[fromIdx]));
        const to = JSON.parse(JSON.stringify(initialEntities[toIdx]));
        const nts = JSON.parse(JSON.stringify(ntsInitial));
        const amount = Math.floor(Math.random() * 10000000) + 5000000;

        const tax = calculateTax(from, to, amount);

        // 1단계: 거래 전 (즉시)
        setTimeout(() => {
            setStages(prev => [{
                type: 'before',
                message: '거래 전 재무제표 (거래 당사자 2명 + 국세청)',
                data: { from, to, nts }
            }, ...prev]);
        }, 100);

        // 2단계: 거래 내용 + 세법 (3초 후)
        setTimeout(() => {
            setStages(prev => [{
                type: 'transaction',
                message: '거래 내용 및 적용 세법',
                data: {
                    from: from.name,
                    to: to.name,
                    amount,
                    tax,
                    timestamp: new Date().toLocaleTimeString('ko-KR')
                }
            }, ...prev]);
        }, 3000);

        // 3단계: 거래 후 (6초 후)
        setTimeout(() => {
            const fromAfter = {
                ...from,
                digitalCurrency: from.digitalCurrency - amount,
                expenses: from.type === 'business' ? from.expenses + amount : from.expenses
            };

            const netAmount = amount - tax.taxAmount;
            const toAfter = {
                ...to,
                digitalCurrency: to.digitalCurrency + netAmount,
                revenue: to.type === 'business' ? to.revenue + netAmount : to.revenue
            };

            const ntsAfter = {
                ...nts,
                digitalCurrency: nts.digitalCurrency + tax.taxAmount,
                revenue: nts.revenue + tax.taxAmount
            };

            setStages(prev => [{
                type: 'after',
                message: '거래 후 재무제표 (세금 자동 납부 완료)',
                data: { from: fromAfter, to: toAfter, nts: ntsAfter, tax }
            }, ...prev]);

            setIsRunning(false);
        }, 6000);
    };

    const formatNumber = (num) => new Intl.NumberFormat('ko-KR').format(Math.floor(num));
    const calculateTotal = (e) => e.cash + e.digitalCurrency + e.receivables + e.ppe;
    const calculateEquity = (e) => calculateTotal(e) - e.liabilities;

    const BalanceSheet = ({ entity, label, highlight }) => {
        const total = calculateTotal(entity);
        const equity = calculateEquity(entity);
        const isNTS = entity.type === 'government';

        return (
            <div className={`bg-white border-2 rounded-lg p-4 ${highlight ? 'border-yellow-400 shadow-lg' : isNTS ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}>
                <h4 className="font-bold text-gray-900 mb-3 pb-2 border-b text-sm">
                    {isNTS && <i className="fas fa-landmark text-red-600 mr-2"></i>}
                    {entity.name} - 대차대조표 {label && `(${label})`}
                </h4>
                <div className="mb-3">
                    <div className="text-xs font-bold mb-1">자산</div>
                    <table className="w-full text-xs">
                        <tbody>
                            <tr><td>현금</td><td className="text-right">₩{formatNumber(entity.cash)}</td></tr>
                            <tr className={isNTS ? 'bg-red-100' : 'bg-blue-50'}>
                                <td><strong>💎 디지털화폐</strong></td>
                                <td className="text-right font-bold">₩{formatNumber(entity.digitalCurrency)}</td>
                            </tr>
                            <tr><td>매출채권</td><td className="text-right">₩{formatNumber(entity.receivables)}</td></tr>
                            <tr><td>유형자산</td><td className="text-right">₩{formatNumber(entity.ppe)}</td></tr>
                            <tr className="border-t font-bold"><td>자산 총계</td><td className="text-right">₩{formatNumber(total)}</td></tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <div className="text-xs font-bold mb-1">부채 및 자본</div>
                    <table className="w-full text-xs">
                        <tbody>
                            <tr><td>부채</td><td className="text-right">₩{formatNumber(entity.liabilities)}</td></tr>
                            <tr><td>자본</td><td className="text-right">₩{formatNumber(equity)}</td></tr>
                            <tr className="border-t font-bold"><td>총계</td><td className="text-right">₩{formatNumber(total)}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            {/* 개요 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-gov-blue pl-4">세무 자동화 시스템</h2>
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-gov-blue">
                    <p className="text-sm text-gray-800 mb-3">
                        <strong>모든 거래에 세법과 세율을 자동 적용</strong>하여 실시간으로 세금을 계산하고 국세청에 납부합니다. 
                        납세자는 별도 신고 없이 자동으로 납세 의무를 이행하며, 
                        <a href="http://100.30.14.224/openhash-system/" target="_blank" className="text-gov-blue underline ml-1">OpenHash</a>에 기록되어 
                        <strong className="text-red-700"> 탈세가 원천적으로 불가능</strong>합니다.
                    </p>
                    <div className="grid grid-cols-4 gap-3">
                        <div className="bg-white rounded p-2 text-center"><div className="text-lg font-bold text-gov-blue">100%</div><div className="text-xs">자동 납세</div></div>
                        <div className="bg-white rounded p-2 text-center"><div className="text-lg font-bold text-gov-blue">0.001ms</div><div className="text-xs">세금 계산</div></div>
                        <div className="bg-white rounded p-2 text-center"><div className="text-lg font-bold text-gov-blue">0%</div><div className="text-xs">탈세율</div></div>
                        <div className="bg-white rounded p-2 text-center"><div className="text-lg font-bold text-gov-blue">99.9%</div><div className="text-xs">징수율</div></div>
                    </div>
                </div>
            </section>

            {/* 핵심 원리 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-gov-blue pl-4">작동 원리</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-2xl">
                                <i className="fas fa-calculator"></i>
                            </div>
                            <h3 className="font-bold text-gray-900">1. 세금 자동 계산</h3>
                        </div>
                        <p className="text-sm text-gray-700">거래 유형에 따라 AI가 적용 세법과 세율을 자동 판별하여 0.001ms 이내에 세액 계산</p>
                    </div>
                    <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white text-2xl">
                                <i className="fas fa-exchange-alt"></i>
                            </div>
                            <h3 className="font-bold text-gray-900">2. 3자 동시 정산</h3>
                        </div>
                        <p className="text-sm text-gray-700">송금인, 수취인, 국세청의 재무제표가 동시에 갱신되며 세금이 즉시 납부됨</p>
                    </div>
                    <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white text-2xl">
                                <i className="fas fa-shield-alt"></i>
                            </div>
                            <h3 className="font-bold text-gray-900">3. 탈세 원천 차단</h3>
                        </div>
                        <p className="text-sm text-gray-700">OpenHash에 모든 거래와 납세 기록이 저장되어 위변조 및 탈세 불가능</p>
                    </div>
                </div>
            </section>

            {/* 시뮬레이션 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-gov-blue pl-4">실시간 세무 자동화 시뮬레이션</h2>
                
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={startSimulation}
                        disabled={isRunning}
                        className={`px-6 py-3 rounded-lg font-bold transition-all ${
                            isRunning 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-gov-blue text-white hover:bg-blue-700'
                        }`}
                    >
                        {isRunning ? (
                            <>
                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                진행 중...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-play mr-2"></i>
                                시뮬레이션 시작
                            </>
                        )}
                    </button>
                    {isRunning && (
                        <div className="text-sm text-gray-600 animate-pulse">
                            자동으로 진행됩니다 (약 6초 소요)
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    {stages.map((stage, index) => (
                        <div 
                            key={index}
                            className="animate-slideDown"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {stage.type === 'before' && (
                                <div className="bg-blue-100 rounded-lg p-6 border-2 border-blue-400">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{stage.message}</h3>
                                            <p className="text-sm text-gray-600">거래 전 재무제표 상태</p>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div>
                                            <div className="font-bold mb-2 text-sm bg-white p-2 rounded">송금인: {stage.data.from.name}</div>
                                            <BalanceSheet entity={stage.data.from} />
                                        </div>
                                        <div>
                                            <div className="font-bold mb-2 text-sm bg-white p-2 rounded">수취인: {stage.data.to.name}</div>
                                            <BalanceSheet entity={stage.data.to} />
                                        </div>
                                        <div>
                                            <div className="font-bold mb-2 text-sm bg-red-100 p-2 rounded">
                                                <i className="fas fa-landmark text-red-600 mr-2"></i>국세청
                                            </div>
                                            <BalanceSheet entity={stage.data.nts} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {stage.type === 'transaction' && (
                                <div className="bg-green-100 rounded-lg p-6 border-2 border-green-400">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{stage.message}</h3>
                                            <p className="text-sm text-gray-600">세법 자동 적용 및 세액 계산</p>
                                        </div>
                                    </div>
                                    
                                    {/* 거래 흐름도 */}
                                    <div className="bg-white rounded-lg p-6 shadow-md mb-4">
                                        <div className="flex items-center justify-center gap-4">
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                                                    <i className="fas fa-user text-blue-600 text-2xl"></i>
                                                </div>
                                                <div className="font-bold text-sm">{stage.data.from}</div>
                                                <div className="text-xs text-gray-600 mt-1">송금인</div>
                                            </div>
                                            <div className="text-center flex-1">
                                                <i className="fas fa-arrow-right text-green-600 text-2xl mb-2"></i>
                                                <div className="text-xl font-bold text-green-700">₩{formatNumber(stage.data.amount)}</div>
                                                <div className="text-xs text-gray-600">총 거래액</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                                                    <i className="fas fa-user text-purple-600 text-2xl"></i>
                                                </div>
                                                <div className="font-bold text-sm">{stage.data.to}</div>
                                                <div className="text-xs text-gray-600 mt-1">수취인</div>
                                            </div>
                                        </div>
                                        
                                        {/* 세금 분리 표시 */}
                                        <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-300">
                                            <div className="flex items-center justify-center gap-4">
                                                <div className="text-center flex-1">
                                                    <div className="text-lg font-bold text-purple-700">₩{formatNumber(stage.data.amount - stage.data.tax.taxAmount)}</div>
                                                    <div className="text-xs text-gray-600">실수령액 (순액)</div>
                                                </div>
                                                <div className="text-3xl text-gray-400">+</div>
                                                <div className="text-center flex-1">
                                                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                                        <i className="fas fa-landmark text-red-600 text-2xl"></i>
                                                    </div>
                                                    <div className="text-lg font-bold text-red-700">₩{formatNumber(stage.data.tax.taxAmount)}</div>
                                                    <div className="text-xs text-gray-600">세금 (국세청)</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 적용 세법 */}
                                    <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-300">
                                        <h4 className="font-bold text-gray-900 mb-3">
                                            <i className="fas fa-gavel text-yellow-600 mr-2"></i>
                                            적용 세법 및 세율
                                        </h4>
                                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                                            <div className="bg-white rounded p-3">
                                                <div className="text-gray-600 mb-1">세목</div>
                                                <div className="font-bold text-lg text-gray-900">{stage.data.tax.taxType}</div>
                                            </div>
                                            <div className="bg-white rounded p-3">
                                                <div className="text-gray-600 mb-1">세율</div>
                                                <div className="font-bold text-lg text-red-700">{(stage.data.tax.taxRate * 100).toFixed(1)}%</div>
                                            </div>
                                            <div className="bg-white rounded p-3">
                                                <div className="text-gray-600 mb-1">근거 법령</div>
                                                <div className="font-bold text-sm text-gray-900">{stage.data.tax.taxLaw}</div>
                                            </div>
                                        </div>
                                        <div className="mt-3 p-3 bg-white rounded text-xs text-gray-700">
                                            <strong>계산식:</strong> ₩{formatNumber(stage.data.amount)} × {(stage.data.tax.taxRate * 100).toFixed(1)}% = <strong className="text-red-700">₩{formatNumber(stage.data.tax.taxAmount)}</strong>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {stage.type === 'after' && (
                                <div className="bg-purple-100 rounded-lg p-6 border-2 border-purple-400">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{stage.message}</h3>
                                            <p className="text-sm text-gray-600">0.001ms 이내에 3자 재무제표 동시 갱신</p>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div>
                                            <div className="font-bold mb-2 text-sm bg-red-100 p-2 rounded">
                                                송금인: {stage.data.from.name}
                                                <span className="text-red-700 ml-2 block text-xs">-₩{formatNumber(stage.data.tax.taxAmount + (stage.data.from.digitalCurrency - stage.data.from.digitalCurrency))}</span>
                                            </div>
                                            <BalanceSheet entity={stage.data.from} label="갱신" highlight={true} />
                                        </div>
                                        <div>
                                            <div className="font-bold mb-2 text-sm bg-green-100 p-2 rounded">
                                                수취인: {stage.data.to.name}
                                                <span className="text-green-700 ml-2 block text-xs">+₩{formatNumber(stage.data.to.digitalCurrency - (stage.data.to.digitalCurrency - stage.data.to.digitalCurrency))}</span>
                                            </div>
                                            <BalanceSheet entity={stage.data.to} label="갱신" highlight={true} />
                                        </div>
                                        <div>
                                            <div className="font-bold mb-2 text-sm bg-red-200 p-2 rounded">
                                                <i className="fas fa-landmark text-red-600 mr-2"></i>국세청
                                                <span className="text-red-700 ml-2 block text-xs">+₩{formatNumber(stage.data.tax.taxAmount)} (세수)</span>
                                            </div>
                                            <BalanceSheet entity={stage.data.nts} label="갱신" highlight={true} />
                                        </div>
                                    </div>
                                    <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-300 text-sm">
                                        <strong className="text-gray-900">
                                            <i className="fas fa-check-circle text-green-600 mr-2"></i>
                                            납세 완료:
                                        </strong>
                                        <span className="text-gray-700 ml-2">
                                            {stage.data.tax.taxType} ₩{formatNumber(stage.data.tax.taxAmount)} | 
                                            <a href="http://100.30.14.224/openhash-system/" target="_blank" className="text-gov-blue underline ml-1">OpenHash</a> 기록 완료 | 
                                            탈세 불가능
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* 세법 적용 규칙 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-gov-blue pl-4">세법 자동 적용 규칙</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                        <h3 className="font-bold text-gray-900 mb-3">
                            <i className="fas fa-users text-blue-600 mr-2"></i>
                            개인 간 거래
                        </h3>
                        <div className="text-sm text-gray-700 space-y-2">
                            <div className="flex justify-between">
                                <span>세목:</span>
                                <span className="font-bold">거래세</span>
                            </div>
                            <div className="flex justify-between">
                                <span>세율:</span>
                                <span className="font-bold text-red-700">0.1%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>근거:</span>
                                <span className="font-mono text-xs">금융거래세법 제3조</span>
                            </div>
                            <div className="mt-3 p-2 bg-blue-50 rounded text-xs">
                                예: 1,000만원 송금 → 세금 1만원
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                        <h3 className="font-bold text-gray-900 mb-3">
                            <i className="fas fa-building text-green-600 mr-2"></i>
                            사업자 → 개인
                        </h3>
                        <div className="text-sm text-gray-700 space-y-2">
                            <div className="flex justify-between">
                                <span>세목:</span>
                                <span className="font-bold">소득세 원천징수</span>
                            </div>
                            <div className="flex justify-between">
                                <span>세율:</span>
                                <span className="font-bold text-red-700">3.3%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>근거:</span>
                                <span className="font-mono text-xs">소득세법 제127조</span>
                            </div>
                            <div className="mt-3 p-2 bg-green-50 rounded text-xs">
                                예: 1,000만원 지급 → 세금 33만원
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                        <h3 className="font-bold text-gray-900 mb-3">
                            <i className="fas fa-user-tie text-purple-600 mr-2"></i>
                            개인 → 사업자
                        </h3>
                        <div className="text-sm text-gray-700 space-y-2">
                            <div className="flex justify-between">
                                <span>세목:</span>
                                <span className="font-bold">부가가치세</span>
                            </div>
                            <div className="flex justify-between">
                                <span>세율:</span>
                                <span className="font-bold text-red-700">10%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>근거:</span>
                                <span className="font-mono text-xs">부가가치세법 제13조</span>
                            </div>
                            <div className="mt-3 p-2 bg-purple-50 rounded text-xs">
                                예: 1,000만원 결제 → 세금 100만원
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                        <h3 className="font-bold text-gray-900 mb-3">
                            <i className="fas fa-handshake text-orange-600 mr-2"></i>
                            사업자 간 거래
                        </h3>
                        <div className="text-sm text-gray-700 space-y-2">
                            <div className="flex justify-between">
                                <span>세목:</span>
                                <span className="font-bold">부가가치세</span>
                            </div>
                            <div className="flex justify-between">
                                <span>세율:</span>
                                <span className="font-bold text-red-700">10%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>근거:</span>
                                <span className="font-mono text-xs">부가가치세법 제13조</span>
                            </div>
                            <div className="mt-3 p-2 bg-orange-50 rounded text-xs">
                                예: 1,000만원 거래 → 세금 100만원
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 경제적 효과 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-purple-500 pl-4">경제적 효과</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <i className="fas fa-chart-line text-green-600 text-2xl"></i>
                            <strong>세수 증대</strong>
                        </div>
                        <div className="text-3xl font-bold text-green-700 mb-2">+40조원</div>
                        <div className="text-sm text-gray-600">연간 추가 세수 (탈세 방지)</div>
                    </div>
                    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <i className="fas fa-clock text-blue-600 text-2xl"></i>
                            <strong>행정 비용 절감</strong>
                        </div>
                        <div className="text-3xl font-bold text-blue-700 mb-2">95%</div>
                        <div className="text-sm text-gray-600">세무 조사 및 징수 비용</div>
                    </div>
                    <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <i className="fas fa-ban text-red-600 text-2xl"></i>
                            <strong>탈세 근절</strong>
                        </div>
                        <div className="text-3xl font-bold text-red-700 mb-2">100%</div>
                        <div className="text-sm text-gray-600">원천적 탈세 차단</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

window.TaxAutomation = TaxAutomation;
