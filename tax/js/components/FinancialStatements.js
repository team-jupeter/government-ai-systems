const FinancialStatements = () => {
    const [activeTab, setActiveTab] = React.useState('income');
    const [selectedTaxpayer, setSelectedTaxpayer] = React.useState(null);
    const [taxpayerData, setTaxpayerData] = React.useState({});
    const [transactionLog, setTransactionLog] = React.useState([]);
    const [ntsFinancials, setNtsFinancials] = React.useState({
        revenue: 336500000000000,
        todayCollection: 124730000000,
        pendingRefunds: 8500000000000
    });
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [currentStep, setCurrentStep] = React.useState(null);
    const [showTransactionModal, setShowTransactionModal] = React.useState(false);
    const [transactionForm, setTransactionForm] = React.useState({
        from: '', to: '', type: 'sale', amount: 10000000, description: ''
    });
    
    // 새로운 상태: 거래 결과 모달 및 점멸 효과
    const [showResultModal, setShowResultModal] = React.useState(false);
    const [transactionResult, setTransactionResult] = React.useState(null);
    const [blinkingIds, setBlinkingIds] = React.useState([]);
    const [ntsBlinking, setNtsBlinking] = React.useState(false);

    // 데모 납세자 목록 (다양한 유형)
    const demoTaxpayers = [
        { id: 'P-KIM-0001', name: '김*호', type: '개인', category: 'individual', icon: 'fa-user', color: 'blue', business: '프리랜서 개발자', region: '서울' },
        { id: 'P-LEE-0002', name: '이*영', type: '개인', category: 'individual', icon: 'fa-user', color: 'blue', business: '유튜버/크리에이터', region: '경기' },
        { id: 'P-PARK-0003', name: '박*수', type: '개인', category: 'individual', icon: 'fa-user', color: 'blue', business: '부동산 임대업', region: '부산' },
        { id: 'C-TECH-1001', name: '(주)테크솔루션', type: '법인', category: 'corporation', icon: 'fa-building', color: 'purple', business: 'IT 서비스', region: '서울' },
        { id: 'C-FOOD-1002', name: '(주)맛나푸드', type: '법인', category: 'corporation', icon: 'fa-utensils', color: 'purple', business: '식품 제조', region: '경기' },
        { id: 'C-MANU-1003', name: '대한제조(주)', type: '법인', category: 'corporation', icon: 'fa-industry', color: 'purple', business: '기계 제조', region: '울산' },
        { id: 'G-JEJU-2001', name: '제주특별자치도', type: '정부기관', category: 'government', icon: 'fa-landmark', color: 'cyan', business: '지방자치단체', region: '제주' },
        { id: 'G-SEOUL-2002', name: '서울특별시', type: '정부기관', category: 'government', icon: 'fa-landmark', color: 'cyan', business: '지방자치단체', region: '서울' },
        { id: 'N-EDU-3001', name: '한국교육재단', type: '비영리', category: 'nonprofit', icon: 'fa-hand-holding-heart', color: 'green', business: '교육 지원', region: '서울' },
        { id: 'N-MED-3002', name: '대한의료봉사회', type: '비영리', category: 'nonprofit', icon: 'fa-heart', color: 'green', business: '의료 봉사', region: '대전' },
        { id: 'A-FARM-4001', name: '전국농업협동조합', type: '협회', category: 'association', icon: 'fa-users', color: 'yellow', business: '농업 협동조합', region: '세종' },
        { id: 'A-SME-4002', name: '중소기업중앙회', type: '협회', category: 'association', icon: 'fa-handshake', color: 'yellow', business: '중소기업 지원', region: '서울' }
    ];

    // 초기 재무제표 데이터 생성
    const generateInitialFinancials = (taxpayer) => {
        const baseMultiplier = {
            'individual': 1, 'corporation': 50, 'government': 1000, 'nonprofit': 10, 'association': 20
        }[taxpayer.category] || 1;
        const baseRevenue = (Math.random() * 500000000 + 100000000) * baseMultiplier;
        
        return {
            info: taxpayer,
            incomeStatement: {
                revenue: Math.floor(baseRevenue),
                costOfSales: Math.floor(baseRevenue * 0.55),
                grossProfit: Math.floor(baseRevenue * 0.45),
                operatingExpenses: Math.floor(baseRevenue * 0.25),
                operatingIncome: Math.floor(baseRevenue * 0.20),
                interestIncome: Math.floor(baseRevenue * 0.01),
                interestExpense: Math.floor(baseRevenue * 0.02),
                otherIncome: Math.floor(baseRevenue * 0.02),
                otherExpense: Math.floor(baseRevenue * 0.01),
                incomeBeforeTax: Math.floor(baseRevenue * 0.20),
                taxExpense: Math.floor(baseRevenue * 0.04),
                netIncome: Math.floor(baseRevenue * 0.16)
            },
            balanceSheet: {
                cashAndEquivalents: Math.floor(baseRevenue * 0.15),
                accountsReceivable: Math.floor(baseRevenue * 0.20),
                inventory: Math.floor(baseRevenue * 0.10),
                currentAssets: Math.floor(baseRevenue * 0.45),
                propertyPlantEquipment: Math.floor(baseRevenue * 0.80),
                intangibleAssets: Math.floor(baseRevenue * 0.15),
                nonCurrentAssets: Math.floor(baseRevenue * 1.00),
                totalAssets: Math.floor(baseRevenue * 1.45),
                accountsPayable: Math.floor(baseRevenue * 0.12),
                shortTermDebt: Math.floor(baseRevenue * 0.08),
                currentLiabilities: Math.floor(baseRevenue * 0.25),
                longTermDebt: Math.floor(baseRevenue * 0.30),
                nonCurrentLiabilities: Math.floor(baseRevenue * 0.35),
                totalLiabilities: Math.floor(baseRevenue * 0.60),
                capitalStock: Math.floor(baseRevenue * 0.50),
                retainedEarnings: Math.floor(baseRevenue * 0.35),
                totalEquity: Math.floor(baseRevenue * 0.85)
            },
            cashFlow: {
                operatingCashFlow: Math.floor(baseRevenue * 0.18),
                investingCashFlow: Math.floor(baseRevenue * -0.10),
                financingCashFlow: Math.floor(baseRevenue * -0.05),
                netCashChange: Math.floor(baseRevenue * 0.03),
                beginningCash: Math.floor(baseRevenue * 0.12),
                endingCash: Math.floor(baseRevenue * 0.15)
            },
            equityStatement: {
                beginningEquity: Math.floor(baseRevenue * 0.75),
                netIncome: Math.floor(baseRevenue * 0.16),
                dividends: Math.floor(baseRevenue * -0.05),
                otherChanges: Math.floor(baseRevenue * -0.01),
                endingEquity: Math.floor(baseRevenue * 0.85)
            },
            retainedEarnings: {
                beginningBalance: Math.floor(baseRevenue * 0.25),
                netIncome: Math.floor(baseRevenue * 0.16),
                dividends: Math.floor(baseRevenue * -0.05),
                legalReserve: Math.floor(baseRevenue * -0.01),
                endingBalance: Math.floor(baseRevenue * 0.35)
            },
            taxSummary: {
                incomeTax: Math.floor(baseRevenue * 0.04),
                vatCollected: Math.floor(baseRevenue * 0.10),
                vatPaid: Math.floor(baseRevenue * 0.06),
                vatPayable: Math.floor(baseRevenue * 0.04),
                withholdingTax: Math.floor(baseRevenue * 0.01),
                totalTaxPaid: Math.floor(baseRevenue * 0.08)
            },
            creditScore: (0.7 + Math.random() * 0.28).toFixed(2),
            lastUpdated: new Date().toISOString()
        };
    };

    React.useEffect(() => {
        const initialData = {};
        demoTaxpayers.forEach(tp => {
            initialData[tp.id] = generateInitialFinancials(tp);
        });
        setTaxpayerData(initialData);
    }, []);

    const formatKRW = (num) => {
        if (num === undefined || num === null) return '₩0';
        const absNum = Math.abs(num);
        const sign = num < 0 ? '-' : '';
        if (absNum >= 1000000000000) return sign + '₩' + (absNum / 1000000000000).toFixed(2) + '조';
        if (absNum >= 100000000) return sign + '₩' + (absNum / 100000000).toFixed(1) + '억';
        if (absNum >= 10000) return sign + '₩' + (absNum / 10000).toFixed(0) + '만';
        return sign + '₩' + absNum.toLocaleString();
    };

    const transactionTypes = {
        sale: { name: '상품/서비스 판매', taxLaw: '부가가치세법 제29조', taxRate: 0.10, taxType: 'VAT' },
        purchase: { name: '상품/서비스 구매', taxLaw: '부가가치세법 제37조', taxRate: 0.10, taxType: 'VAT' },
        salary: { name: '급여 지급', taxLaw: '소득세법 제127조', taxRate: 0.033, taxType: '원천세' },
        dividend: { name: '배당금 지급', taxLaw: '소득세법 제129조', taxRate: 0.154, taxType: '배당소득세' },
        rent: { name: '임대료 지급', taxLaw: '소득세법 제127조', taxRate: 0.11, taxType: '원천세' },
        service: { name: '용역 대가', taxLaw: '부가가치세법 제11조', taxRate: 0.10, taxType: 'VAT' },
        asset: { name: '자산 매각', taxLaw: '법인세법 제41조', taxRate: 0.22, taxType: '양도차익세' },
        donation: { name: '기부금', taxLaw: '법인세법 제24조', taxRate: 0, taxType: '비과세(공제)' }
    };

    // 거래 처리 (전체 프로세스 시뮬레이션)
    const processTransaction = async () => {
        if (!transactionForm.from || !transactionForm.to || transactionForm.from === transactionForm.to) {
            alert('거래 당사자를 올바르게 선택해주세요.');
            return;
        }

        setIsProcessing(true);
        setShowTransactionModal(false);

        const txType = transactionTypes[transactionForm.type];
        const amount = parseInt(transactionForm.amount);
        const taxAmount = Math.floor(amount * txType.taxRate);
        const txId = 'TX-' + Date.now().toString(36).toUpperCase();

        const sellerInfo = demoTaxpayers.find(t => t.id === transactionForm.from);
        const buyerInfo = demoTaxpayers.find(t => t.id === transactionForm.to);

        // 갱신될 항목 추적
        const sellerUpdates = {
            incomeStatement: ['revenue', 'grossProfit', 'operatingIncome', 'netIncome'],
            balanceSheet: ['cashAndEquivalents', 'accountsReceivable', 'totalAssets'],
            cashFlow: ['operatingCashFlow', 'endingCash'],
            taxSummary: ['vatCollected', 'vatPayable']
        };
        const buyerUpdates = {
            incomeStatement: ['costOfSales', 'grossProfit', 'operatingExpenses'],
            balanceSheet: ['cashAndEquivalents', 'inventory', 'totalAssets'],
            cashFlow: ['operatingCashFlow'],
            taxSummary: ['vatPaid']
        };

        const steps = [
            { id: 1, name: '거래 접수', desc: '디지털 서명 검증 중...' },
            { id: 2, name: '세법 검색', desc: `${txType.taxLaw} 조회 중...` },
            { id: 3, name: '세액 계산', desc: `${txType.taxType} ${(txType.taxRate * 100).toFixed(1)}% 적용` },
            { id: 4, name: '판매자 재무제표 갱신', desc: `${sellerInfo?.name} 반영` },
            { id: 5, name: '구매자 재무제표 갱신', desc: `${buyerInfo?.name} 반영` },
            { id: 6, name: 'OpenHash 검증', desc: 'Layer 1 노드 합의 중...' },
            { id: 7, name: '세금 징수', desc: `${formatKRW(taxAmount)} 징수` },
            { id: 8, name: '국세청 재무제표 갱신', desc: '실시간 반영 완료' }
        ];

        for (let i = 0; i < steps.length; i++) {
            setCurrentStep(steps[i]);
            await new Promise(resolve => setTimeout(resolve, 600));

            if (steps[i].id === 4) {
                setTaxpayerData(prev => {
                    const updated = { ...prev };
                    const seller = { ...updated[transactionForm.from] };
                    seller.incomeStatement = { ...seller.incomeStatement };
                    seller.balanceSheet = { ...seller.balanceSheet };
                    seller.cashFlow = { ...seller.cashFlow };
                    seller.taxSummary = { ...seller.taxSummary };
                    
                    seller.incomeStatement.revenue += amount;
                    seller.incomeStatement.grossProfit += Math.floor(amount * 0.4);
                    seller.incomeStatement.operatingIncome += Math.floor(amount * 0.2);
                    seller.incomeStatement.netIncome += Math.floor(amount * 0.15);
                    seller.balanceSheet.cashAndEquivalents += Math.floor(amount * 0.9);
                    seller.balanceSheet.accountsReceivable += Math.floor(amount * 0.1);
                    seller.balanceSheet.totalAssets += amount;
                    seller.taxSummary.vatCollected += Math.floor(amount * 0.1);
                    seller.taxSummary.vatPayable += Math.floor(amount * 0.1);
                    seller.cashFlow.operatingCashFlow += Math.floor(amount * 0.9);
                    seller.cashFlow.endingCash += Math.floor(amount * 0.9);
                    seller.lastUpdated = new Date().toISOString();
                    
                    updated[transactionForm.from] = seller;
                    return updated;
                });
            }

            if (steps[i].id === 5) {
                setTaxpayerData(prev => {
                    const updated = { ...prev };
                    const buyer = { ...updated[transactionForm.to] };
                    buyer.incomeStatement = { ...buyer.incomeStatement };
                    buyer.balanceSheet = { ...buyer.balanceSheet };
                    buyer.cashFlow = { ...buyer.cashFlow };
                    buyer.taxSummary = { ...buyer.taxSummary };
                    
                    buyer.incomeStatement.costOfSales += amount;
                    buyer.incomeStatement.grossProfit -= Math.floor(amount * 0.5);
                    buyer.incomeStatement.operatingExpenses += Math.floor(amount * 0.5);
                    buyer.balanceSheet.cashAndEquivalents -= amount;
                    buyer.balanceSheet.inventory += Math.floor(amount * 0.8);
                    buyer.taxSummary.vatPaid += Math.floor(amount * 0.1);
                    buyer.cashFlow.operatingCashFlow -= amount;
                    buyer.lastUpdated = new Date().toISOString();
                    
                    updated[transactionForm.to] = buyer;
                    return updated;
                });
            }

            if (steps[i].id === 8) {
                setNtsFinancials(prev => ({
                    ...prev,
                    todayCollection: prev.todayCollection + taxAmount,
                    revenue: prev.revenue + taxAmount
                }));
            }
        }

        // 거래 로그 추가
        const newLog = {
            id: txId,
            timestamp: new Date().toISOString(),
            from: transactionForm.from,
            fromName: sellerInfo?.name,
            to: transactionForm.to,
            toName: buyerInfo?.name,
            type: transactionForm.type,
            typeName: txType.name,
            amount: amount,
            taxLaw: txType.taxLaw,
            taxType: txType.taxType,
            taxRate: txType.taxRate,
            taxAmount: taxAmount,
            hash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
            status: 'completed'
        };
        setTransactionLog(prev => [newLog, ...prev]);

        // 거래 결과 설정
        setTransactionResult({
            txId,
            seller: sellerInfo,
            buyer: buyerInfo,
            amount,
            taxAmount,
            txType,
            sellerUpdates,
            buyerUpdates,
            timestamp: new Date().toISOString()
        });

        // 점멸 효과 시작
        setBlinkingIds([transactionForm.from, transactionForm.to]);
        setNtsBlinking(true);
        
        // 판매자 재무제표로 자동 전환
        setSelectedTaxpayer(transactionForm.from);
        setActiveTab('income');

        setCurrentStep(null);
        setIsProcessing(false);
        
        // 결과 모달 표시
        setShowResultModal(true);

        // 5초 후 점멸 효과 종료
        setTimeout(() => {
            setBlinkingIds([]);
            setNtsBlinking(false);
        }, 8000);

        setTransactionForm({ from: '', to: '', type: 'sale', amount: 10000000, description: '' });
    };

    const tabs = [
        { id: 'income', name: '손익계산서', icon: 'fa-chart-line', color: 'cyan' },
        { id: 'balance', name: '대차대조표', icon: 'fa-balance-scale', color: 'purple' },
        { id: 'cashflow', name: '현금흐름표', icon: 'fa-money-bill-wave', color: 'green' },
        { id: 'equity', name: '자본변동표', icon: 'fa-users', color: 'yellow' },
        { id: 'retained', name: '이익잉여금처분계산서', icon: 'fa-piggy-bank', color: 'pink' },
        { id: 'tax', name: '세금 요약', icon: 'fa-file-invoice-dollar', color: 'red' }
    ];

    const getCategoryStyle = (category) => {
        const styles = {
            individual: { bg: 'bg-blue-500/20', border: 'border-blue-500/30', text: 'text-blue-400' },
            corporation: { bg: 'bg-purple-500/20', border: 'border-purple-500/30', text: 'text-purple-400' },
            government: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400' },
            nonprofit: { bg: 'bg-green-500/20', border: 'border-green-500/30', text: 'text-green-400' },
            association: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', text: 'text-yellow-400' }
        };
        return styles[category] || styles.individual;
    };

    const selectedData = selectedTaxpayer ? taxpayerData[selectedTaxpayer] : null;

    const renderFinancialTable = (title, data, fields) => (
        <div className="bg-gray-700/50 rounded-xl p-4 mb-4">
            <h4 className="font-bold text-white mb-3">{title}</h4>
            <table className="w-full text-sm">
                <tbody>
                    {fields.map((field, idx) => (
                        <tr key={idx} className={`border-b border-gray-600 ${field.highlight ? 'bg-cyan-500/10' : ''}`}>
                            <td className={`py-2 ${field.indent ? 'pl-4' : ''} ${field.highlight ? 'font-bold text-cyan-400' : 'text-gray-300'}`}>
                                {field.label}
                            </td>
                            <td className={`py-2 text-right ${field.highlight ? 'font-bold text-cyan-400' : field.negative ? 'text-red-400' : 'text-white'}`}>
                                {field.negative && data[field.key] > 0 ? '(' : ''}{formatKRW(data[field.key])}{field.negative && data[field.key] > 0 ? ')' : ''}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    // 거래 결과 모달
    const TransactionResultModal = () => {
        if (!transactionResult) return null;
        
        const { seller, buyer, amount, taxAmount, txType, sellerUpdates, buyerUpdates, txId } = transactionResult;
        
        const formatUpdateList = (updates) => {
            const names = {
                revenue: '매출액', costOfSales: '매출원가', grossProfit: '매출총이익',
                operatingIncome: '영업이익', operatingExpenses: '판관비', netIncome: '당기순이익',
                cashAndEquivalents: '현금및현금성자산', accountsReceivable: '매출채권',
                inventory: '재고자산', totalAssets: '자산총계',
                operatingCashFlow: '영업활동현금흐름', endingCash: '기말현금',
                vatCollected: 'VAT예수금', vatPayable: 'VAT납부액', vatPaid: 'VAT대급금'
            };
            return updates.map(key => names[key] || key);
        };

        return (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowResultModal(false)}>
                <div className="bg-gray-900 rounded-3xl max-w-3xl w-full border border-green-500/30 shadow-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}>
                    {/* 헤더 */}
                    <div className="bg-gradient-to-r from-green-900 to-cyan-900 p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-green-500/30 rounded-2xl flex items-center justify-center">
                                <i className="fas fa-check-circle text-4xl text-green-400"></i>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">거래 처리 완료</h2>
                                <p className="text-green-300">모든 재무제표가 실시간으로 갱신되었습니다</p>
                                <p className="text-xs text-gray-400 mt-1">거래ID: {txId}</p>
                            </div>
                        </div>
                    </div>

                    {/* 거래 요약 */}
                    <div className="p-6 border-b border-gray-700">
                        <div className="flex items-center justify-center gap-6">
                            <div className="text-center">
                                <div className={`w-16 h-16 ${getCategoryStyle(seller.category).bg} rounded-2xl flex items-center justify-center mx-auto mb-2 animate-pulse`}>
                                    <i className={`fas ${seller.icon} text-2xl ${getCategoryStyle(seller.category).text}`}></i>
                                </div>
                                <div className="font-bold text-white">{seller.name}</div>
                                <div className="text-xs text-green-400">판매자 (공급자)</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-2xl font-bold text-cyan-400">{formatKRW(amount)}</div>
                                <i className="fas fa-arrow-right text-3xl text-cyan-500 my-2"></i>
                                <div className="text-sm text-gray-400">{txType.name}</div>
                            </div>
                            <div className="text-center">
                                <div className={`w-16 h-16 ${getCategoryStyle(buyer.category).bg} rounded-2xl flex items-center justify-center mx-auto mb-2 animate-pulse`}>
                                    <i className={`fas ${buyer.icon} text-2xl ${getCategoryStyle(buyer.category).text}`}></i>
                                </div>
                                <div className="font-bold text-white">{buyer.name}</div>
                                <div className="text-xs text-blue-400">구매자 (수요자)</div>
                            </div>
                        </div>
                    </div>

                    {/* 재무제표 갱신 상세 */}
                    <div className="p-6 space-y-4">
                        {/* 판매자 갱신 내역 */}
                        <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                            <div className="flex items-center gap-2 mb-3">
                                <i className="fas fa-arrow-up text-green-400"></i>
                                <span className="font-bold text-green-400">판매자 [{seller.name}] 재무제표 갱신</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="text-cyan-400 font-medium mb-1"><i className="fas fa-chart-line mr-1"></i>손익계산서</div>
                                    <div className="text-gray-300">{formatUpdateList(sellerUpdates.incomeStatement).join(', ')} 증가</div>
                                </div>
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="text-purple-400 font-medium mb-1"><i className="fas fa-balance-scale mr-1"></i>대차대조표</div>
                                    <div className="text-gray-300">{formatUpdateList(sellerUpdates.balanceSheet).join(', ')} 증가</div>
                                </div>
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="text-green-400 font-medium mb-1"><i className="fas fa-money-bill-wave mr-1"></i>현금흐름표</div>
                                    <div className="text-gray-300">{formatUpdateList(sellerUpdates.cashFlow).join(', ')} 증가</div>
                                </div>
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="text-red-400 font-medium mb-1"><i className="fas fa-file-invoice-dollar mr-1"></i>세금</div>
                                    <div className="text-gray-300">{formatUpdateList(sellerUpdates.taxSummary).join(', ')} 증가</div>
                                </div>
                            </div>
                        </div>

                        {/* 구매자 갱신 내역 */}
                        <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
                            <div className="flex items-center gap-2 mb-3">
                                <i className="fas fa-arrow-down text-blue-400"></i>
                                <span className="font-bold text-blue-400">구매자 [{buyer.name}] 재무제표 갱신</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="text-cyan-400 font-medium mb-1"><i className="fas fa-chart-line mr-1"></i>손익계산서</div>
                                    <div className="text-gray-300">{formatUpdateList(buyerUpdates.incomeStatement).join(', ')} 변동</div>
                                </div>
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="text-purple-400 font-medium mb-1"><i className="fas fa-balance-scale mr-1"></i>대차대조표</div>
                                    <div className="text-gray-300">{formatUpdateList(buyerUpdates.balanceSheet).join(', ')} 변동</div>
                                </div>
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="text-green-400 font-medium mb-1"><i className="fas fa-money-bill-wave mr-1"></i>현금흐름표</div>
                                    <div className="text-gray-300">{formatUpdateList(buyerUpdates.cashFlow).join(', ')} 감소</div>
                                </div>
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="text-red-400 font-medium mb-1"><i className="fas fa-file-invoice-dollar mr-1"></i>세금</div>
                                    <div className="text-gray-300">{formatUpdateList(buyerUpdates.taxSummary).join(', ')} 증가</div>
                                </div>
                            </div>
                        </div>

                        {/* 국세청 징수 */}
                        <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center animate-pulse">
                                        <i className="fas fa-landmark text-xl text-yellow-400"></i>
                                    </div>
                                    <div>
                                        <div className="font-bold text-yellow-400">국세청 세입 증가</div>
                                        <div className="text-sm text-gray-400">{txType.taxType} ({(txType.taxRate * 100).toFixed(1)}%)</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-yellow-400">+{formatKRW(taxAmount)}</div>
                                    <div className="text-xs text-gray-400">{txType.taxLaw}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 푸터 */}
                    <div className="p-6 bg-gray-800/50 border-t border-gray-700">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-400">
                                <i className="fas fa-link text-cyan-400 mr-1"></i>
                                OpenHash로 검증된 거래 | 위변조 불가능
                            </div>
                            <button onClick={() => setShowResultModal(false)}
                                className="bg-green-600 hover:bg-green-500 px-8 py-3 rounded-xl font-bold transition">
                                <i className="fas fa-check mr-2"></i>확인
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* 거래 결과 모달 */}
            {showResultModal && <TransactionResultModal />}

            {/* 처리 중 오버레이 */}
            {isProcessing && currentStep && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
                    <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-cyan-500/30">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-cog fa-spin text-3xl text-cyan-400"></i>
                            </div>
                            <h3 className="text-xl font-bold text-white">거래 처리 중</h3>
                        </div>
                        <div className="space-y-3">
                            {[1,2,3,4,5,6,7,8].map(step => (
                                <div key={step} className={`flex items-center gap-3 p-2 rounded-lg transition ${
                                    currentStep.id === step ? 'bg-cyan-500/20 border border-cyan-500/30' :
                                    currentStep.id > step ? 'bg-green-500/10' : 'bg-gray-700/50'
                                }`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                        currentStep.id === step ? 'bg-cyan-500 text-white' :
                                        currentStep.id > step ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-400'
                                    }`}>
                                        {currentStep.id > step ? <i className="fas fa-check"></i> : step}
                                    </div>
                                    <div className="flex-1">
                                        <div className={`font-medium ${currentStep.id >= step ? 'text-white' : 'text-gray-500'}`}>
                                            {['거래 접수', '세법 검색', '세액 계산', '판매자 재무제표', '구매자 재무제표', 'OpenHash 검증', '세금 징수', '국세청 반영'][step-1]}
                                        </div>
                                        {currentStep.id === step && (
                                            <div className="text-xs text-cyan-400">{currentStep.desc}</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* 거래 생성 모달 */}
            {showTransactionModal && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
                    <div className="bg-gray-800 rounded-2xl p-6 max-w-lg w-full mx-4 border border-gray-700">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold"><i className="fas fa-exchange-alt text-cyan-400 mr-2"></i>새 거래 생성</h3>
                            <button onClick={() => setShowTransactionModal(false)} className="text-gray-400 hover:text-white">
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">판매자 (공급자)</label>
                                <select value={transactionForm.from} onChange={(e) => setTransactionForm({...transactionForm, from: e.target.value})}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white">
                                    <option value="">선택하세요</option>
                                    {demoTaxpayers.map(tp => (
                                        <option key={tp.id} value={tp.id}>{tp.name} ({tp.type}) - {tp.id}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">구매자 (수요자)</label>
                                <select value={transactionForm.to} onChange={(e) => setTransactionForm({...transactionForm, to: e.target.value})}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white">
                                    <option value="">선택하세요</option>
                                    {demoTaxpayers.filter(tp => tp.id !== transactionForm.from).map(tp => (
                                        <option key={tp.id} value={tp.id}>{tp.name} ({tp.type}) - {tp.id}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">거래 유형</label>
                                <select value={transactionForm.type} onChange={(e) => setTransactionForm({...transactionForm, type: e.target.value})}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white">
                                    {Object.entries(transactionTypes).map(([key, val]) => (
                                        <option key={key} value={key}>{val.name} ({val.taxType} {(val.taxRate * 100).toFixed(1)}%)</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">거래 금액</label>
                                <input type="number" value={transactionForm.amount} 
                                    onChange={(e) => setTransactionForm({...transactionForm, amount: e.target.value})}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
                                    min="100000" step="100000" />
                                <div className="text-sm text-gray-400 mt-1">{formatKRW(transactionForm.amount)}</div>
                            </div>
                            {transactionForm.from && transactionForm.to && (
                                <div className="bg-gray-700/50 rounded-lg p-4">
                                    <div className="text-sm text-gray-400 mb-2">거래 요약</div>
                                    <div className="flex items-center gap-2 text-white">
                                        <span>{demoTaxpayers.find(t => t.id === transactionForm.from)?.name}</span>
                                        <i className="fas fa-arrow-right text-cyan-400"></i>
                                        <span>{demoTaxpayers.find(t => t.id === transactionForm.to)?.name}</span>
                                    </div>
                                    <div className="text-lg font-bold text-cyan-400 mt-2">{formatKRW(parseInt(transactionForm.amount))}</div>
                                    <div className="text-xs text-yellow-400 mt-1">적용 세법: {transactionTypes[transactionForm.type].taxLaw}</div>
                                    <div className="text-xs text-green-400">예상 세금: {formatKRW(Math.floor(parseInt(transactionForm.amount) * transactionTypes[transactionForm.type].taxRate))}</div>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowTransactionModal(false)}
                                className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg font-medium transition">취소</button>
                            <button onClick={processTransaction} disabled={!transactionForm.from || !transactionForm.to}
                                className="flex-1 bg-cyan-600 hover:bg-cyan-500 py-3 rounded-lg font-medium transition disabled:opacity-50">
                                <i className="fas fa-check mr-2"></i>거래 실행
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 상단: 납세자 선택 + 거래 버튼 + 국세청 요약 */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="col-span-3 bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold"><i className="fas fa-users text-cyan-400 mr-2"></i>데모 납세자 목록 (12개)</h3>
                        <button onClick={() => setShowTransactionModal(true)}
                            className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-lg text-sm font-medium transition">
                            <i className="fas fa-plus mr-2"></i>새 거래 생성
                        </button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {demoTaxpayers.map(tp => {
                            const style = getCategoryStyle(tp.category);
                            const isBlinking = blinkingIds.includes(tp.id);
                            return (
                                <button key={tp.id} onClick={() => setSelectedTaxpayer(tp.id)}
                                    className={`p-3 rounded-lg border text-left transition ${
                                        selectedTaxpayer === tp.id 
                                            ? style.bg + ' ' + style.border + ' ring-2 ring-cyan-500'
                                            : 'bg-gray-700/50 border-gray-600 hover:border-gray-500'
                                    } ${isBlinking ? 'animate-pulse ring-2 ring-green-500' : ''}`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <i className={`fas ${tp.icon} ${style.text} ${isBlinking ? 'animate-bounce' : ''}`}></i>
                                        <span className="font-medium text-white text-sm truncate">{tp.name}</span>
                                        {isBlinking && <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>}
                                    </div>
                                    <div className="text-xs text-gray-400">{tp.id}</div>
                                    <div className={`text-xs ${style.text}`}>{tp.type}</div>
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className={`bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-4 border ${ntsBlinking ? 'border-yellow-500 animate-pulse' : 'border-blue-500/30'}`}>
                    <div className="flex items-center gap-2 mb-3">
                        <i className={`fas fa-landmark text-blue-400 ${ntsBlinking ? 'animate-bounce' : ''}`}></i>
                        <span className="font-bold text-white">국세청 실시간</span>
                        {ntsBlinking && <span className="w-2 h-2 bg-yellow-500 rounded-full animate-ping"></span>}
                    </div>
                    <div className="space-y-2">
                        <div>
                            <div className="text-xs text-gray-400">오늘 징수액</div>
                            <div className={`text-lg font-bold ${ntsBlinking ? 'text-yellow-400 animate-pulse' : 'text-green-400'}`}>
                                {formatKRW(ntsFinancials.todayCollection)}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400">총 세수</div>
                            <div className="text-sm text-white">{formatKRW(ntsFinancials.revenue)}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* 재무제표 영역 */}
                <div className="col-span-2 bg-gray-800 rounded-2xl border border-gray-700">
                    <div className="flex border-b border-gray-700 overflow-x-auto">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition flex items-center gap-2 ${
                                    activeTab === tab.id ? 'bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-500' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                }`}>
                                <i className={`fas ${tab.icon}`}></i>
                                {tab.name}
                            </button>
                        ))}
                    </div>

                    {selectedData && (
                        <div className={`p-4 border-b border-gray-700 bg-gray-700/30 ${blinkingIds.includes(selectedTaxpayer) ? 'bg-green-500/10' : ''}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getCategoryStyle(selectedData.info.category).bg} ${blinkingIds.includes(selectedTaxpayer) ? 'animate-pulse' : ''}`}>
                                        <i className={`fas ${selectedData.info.icon} text-xl ${getCategoryStyle(selectedData.info.category).text}`}></i>
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">{selectedData.info.name}</div>
                                        <div className="text-sm text-gray-400">{selectedData.info.id} | {selectedData.info.type} | {selectedData.info.business}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="text-xs text-gray-400">신용도</div>
                                        <div className="text-lg font-bold text-green-400">{(selectedData.creditScore * 100).toFixed(0)}점</div>
                                    </div>
                                    <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
                                        <i className="fas fa-check-circle mr-1"></i>OpenHash 검증
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="p-6 max-h-[500px] overflow-y-auto">
                        {!selectedTaxpayer ? (
                            <div className="text-center py-12 text-gray-400">
                                <i className="fas fa-hand-pointer text-4xl mb-4"></i>
                                <p>위에서 납세자를 선택하면 재무제표가 표시됩니다</p>
                            </div>
                        ) : selectedData && (
                            <>
                                {activeTab === 'income' && renderFinancialTable('손익계산서', selectedData.incomeStatement, [
                                    { key: 'revenue', label: '매출액' },
                                    { key: 'costOfSales', label: '매출원가', negative: true },
                                    { key: 'grossProfit', label: '매출총이익', highlight: true },
                                    { key: 'operatingExpenses', label: '판매비와관리비', negative: true },
                                    { key: 'operatingIncome', label: '영업이익', highlight: true },
                                    { key: 'interestIncome', label: '이자수익', indent: true },
                                    { key: 'interestExpense', label: '이자비용', indent: true, negative: true },
                                    { key: 'incomeBeforeTax', label: '법인세비용차감전순이익', highlight: true },
                                    { key: 'taxExpense', label: '법인세비용', negative: true },
                                    { key: 'netIncome', label: '당기순이익', highlight: true }
                                ])}
                                {activeTab === 'balance' && (
                                    <div className="grid grid-cols-2 gap-4">
                                        {renderFinancialTable('자산', selectedData.balanceSheet, [
                                            { key: 'cashAndEquivalents', label: '현금및현금성자산', indent: true },
                                            { key: 'accountsReceivable', label: '매출채권', indent: true },
                                            { key: 'inventory', label: '재고자산', indent: true },
                                            { key: 'currentAssets', label: '유동자산', highlight: true },
                                            { key: 'propertyPlantEquipment', label: '유형자산', indent: true },
                                            { key: 'intangibleAssets', label: '무형자산', indent: true },
                                            { key: 'nonCurrentAssets', label: '비유동자산', highlight: true },
                                            { key: 'totalAssets', label: '자산총계', highlight: true }
                                        ])}
                                        {renderFinancialTable('부채 및 자본', selectedData.balanceSheet, [
                                            { key: 'accountsPayable', label: '매입채무', indent: true },
                                            { key: 'shortTermDebt', label: '단기차입금', indent: true },
                                            { key: 'currentLiabilities', label: '유동부채', highlight: true },
                                            { key: 'longTermDebt', label: '장기차입금', indent: true },
                                            { key: 'nonCurrentLiabilities', label: '비유동부채', highlight: true },
                                            { key: 'totalLiabilities', label: '부채총계', highlight: true },
                                            { key: 'capitalStock', label: '자본금', indent: true },
                                            { key: 'retainedEarnings', label: '이익잉여금', indent: true },
                                            { key: 'totalEquity', label: '자본총계', highlight: true }
                                        ])}
                                    </div>
                                )}
                                {activeTab === 'cashflow' && renderFinancialTable('현금흐름표', selectedData.cashFlow, [
                                    { key: 'operatingCashFlow', label: '영업활동 현금흐름', highlight: true },
                                    { key: 'investingCashFlow', label: '투자활동 현금흐름' },
                                    { key: 'financingCashFlow', label: '재무활동 현금흐름' },
                                    { key: 'netCashChange', label: '현금의 순증감', highlight: true },
                                    { key: 'beginningCash', label: '기초 현금' },
                                    { key: 'endingCash', label: '기말 현금', highlight: true }
                                ])}
                                {activeTab === 'equity' && renderFinancialTable('자본변동표', selectedData.equityStatement, [
                                    { key: 'beginningEquity', label: '기초 자본' },
                                    { key: 'netIncome', label: '당기순이익' },
                                    { key: 'dividends', label: '배당금', negative: true },
                                    { key: 'otherChanges', label: '기타 변동' },
                                    { key: 'endingEquity', label: '기말 자본', highlight: true }
                                ])}
                                {activeTab === 'retained' && renderFinancialTable('이익잉여금처분계산서', selectedData.retainedEarnings, [
                                    { key: 'beginningBalance', label: '처분전이익잉여금' },
                                    { key: 'netIncome', label: '당기순이익' },
                                    { key: 'dividends', label: '배당금', negative: true },
                                    { key: 'legalReserve', label: '이익준비금', negative: true },
                                    { key: 'endingBalance', label: '차기이월이익잉여금', highlight: true }
                                ])}
                                {activeTab === 'tax' && renderFinancialTable('세금 요약', selectedData.taxSummary, [
                                    { key: 'incomeTax', label: '법인세/소득세' },
                                    { key: 'vatCollected', label: '부가세 예수금' },
                                    { key: 'vatPaid', label: '부가세 대급금' },
                                    { key: 'vatPayable', label: '부가세 납부액', highlight: true },
                                    { key: 'withholdingTax', label: '원천세' },
                                    { key: 'totalTaxPaid', label: '총 납부 세금', highlight: true }
                                ])}
                            </>
                        )}
                    </div>
                </div>

                {/* 거래 로그 */}
                <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <i className="fas fa-history text-cyan-400"></i>
                        거래 처리 로그
                        {transactionLog.length > 0 && (
                            <span className="bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full text-xs">{transactionLog.length}</span>
                        )}
                    </h3>
                    <div className="space-y-3 max-h-[600px] overflow-y-auto">
                        {transactionLog.length === 0 ? (
                            <div className="text-center py-8 text-gray-400">
                                <i className="fas fa-exchange-alt text-3xl mb-3"></i>
                                <p className="text-sm">"새 거래 생성" 버튼을 클릭하여<br/>거래를 시작하세요</p>
                            </div>
                        ) : transactionLog.map((log, idx) => (
                            <div key={log.id} className={`p-3 rounded-xl border ${idx === 0 ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-gray-700/50 border-gray-600'}`}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-mono text-gray-400">{log.id}</span>
                                    <span className="text-xs text-green-400"><i className="fas fa-check-circle mr-1"></i>완료</span>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm text-white">{log.fromName}</span>
                                    <i className="fas fa-arrow-right text-cyan-400 text-xs"></i>
                                    <span className="text-sm text-white">{log.toName}</span>
                                </div>
                                <div className="text-lg font-bold text-white mb-1">{formatKRW(log.amount)}</div>
                                <div className="flex flex-wrap gap-1 mb-2">
                                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">{log.typeName}</span>
                                    <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">{log.taxLaw}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-green-400">세금: {formatKRW(log.taxAmount)}</span>
                                    <span className="text-gray-400">{new Date(log.timestamp).toLocaleTimeString('ko-KR')}</span>
                                </div>
                                <div className="text-xs text-gray-500 font-mono mt-1 truncate">Hash: {log.hash.substring(0, 24)}...</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
