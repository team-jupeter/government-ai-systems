const FinancialStatements = () => {
    const [activeTab, setActiveTab] = React.useState('income');
    const [searchId, setSearchId] = React.useState('');
    const [taxpayerData, setTaxpayerData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [realtimeUpdates, setRealtimeUpdates] = React.useState([]);

    // 시뮬레이션: 데모용 납세자 데이터
    const demoTaxpayers = [
        { id: 'P-7A3B2C1D', name: '김*호', type: '개인', business: '프리랜서 개발자' },
        { id: 'C-9E8F7G6H', name: '(주)테크솔루션', type: '법인', business: 'IT 서비스' },
        { id: 'P-5I4J3K2L', name: '박*영', type: '개인', business: '온라인 쇼핑몰' },
        { id: 'C-1M2N3O4P', name: '삼성전자(주)', type: '법인', business: '전자제품 제조' }
    ];

    const tabs = [
        { id: 'income', name: '손익계산서', icon: 'fa-chart-line', color: 'cyan' },
        { id: 'balance', name: '대차대조표', icon: 'fa-balance-scale', color: 'purple' },
        { id: 'cashflow', name: '현금흐름표', icon: 'fa-money-bill-wave', color: 'green' },
        { id: 'equity', name: '지분변동표', icon: 'fa-users', color: 'yellow' },
        { id: 'retained', name: '이익잉여금처분계산서', icon: 'fa-piggy-bank', color: 'pink' }
    ];

    // 실시간 재무제표 갱신 시뮬레이션
    React.useEffect(() => {
        const interval = setInterval(() => {
            const update = {
                id: `UPD-${Date.now()}`,
                taxpayerId: demoTaxpayers[Math.floor(Math.random() * demoTaxpayers.length)].id,
                type: ['매출', '매입', '급여', '임대료', '이자수익'][Math.floor(Math.random() * 5)],
                amount: Math.floor(Math.random() * 50000000) + 100000,
                timestamp: new Date().toISOString(),
                statements: ['income', 'balance', 'cashflow'][Math.floor(Math.random() * 3)]
            };
            setRealtimeUpdates(prev => [update, ...prev.slice(0, 9)]);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleSearch = async () => {
        if (!searchId.trim()) return;
        setIsLoading(true);
        
        // 시뮬레이션 데이터 생성
        const baseRevenue = Math.floor(Math.random() * 10000000000) + 100000000;
        
        setTimeout(() => {
            setTaxpayerData({
                id: searchId || 'P-DEMO1234',
                name: searchId.startsWith('C') ? '(주)데모기업' : '홍*동',
                type: searchId.startsWith('C') ? '법인' : '개인',
                creditScore: (0.7 + Math.random() * 0.28).toFixed(2),
                incomeStatement: {
                    revenue: baseRevenue,
                    costOfSales: Math.floor(baseRevenue * 0.55),
                    grossProfit: Math.floor(baseRevenue * 0.45),
                    operatingExpenses: Math.floor(baseRevenue * 0.25),
                    operatingIncome: Math.floor(baseRevenue * 0.20),
                    interestExpense: Math.floor(baseRevenue * 0.02),
                    taxExpense: Math.floor(baseRevenue * 0.04),
                    netIncome: Math.floor(baseRevenue * 0.14)
                },
                balanceSheet: {
                    currentAssets: Math.floor(baseRevenue * 0.4),
                    nonCurrentAssets: Math.floor(baseRevenue * 1.2),
                    totalAssets: Math.floor(baseRevenue * 1.6),
                    currentLiabilities: Math.floor(baseRevenue * 0.25),
                    nonCurrentLiabilities: Math.floor(baseRevenue * 0.45),
                    totalLiabilities: Math.floor(baseRevenue * 0.7),
                    equity: Math.floor(baseRevenue * 0.9)
                },
                cashFlow: {
                    operatingActivities: Math.floor(baseRevenue * 0.15),
                    investingActivities: Math.floor(baseRevenue * -0.08),
                    financingActivities: Math.floor(baseRevenue * -0.03),
                    netCashChange: Math.floor(baseRevenue * 0.04),
                    beginningCash: Math.floor(baseRevenue * 0.12),
                    endingCash: Math.floor(baseRevenue * 0.16)
                },
                equityStatement: {
                    beginningEquity: Math.floor(baseRevenue * 0.8),
                    netIncome: Math.floor(baseRevenue * 0.14),
                    dividends: Math.floor(baseRevenue * -0.04),
                    otherChanges: Math.floor(baseRevenue * 0.01),
                    endingEquity: Math.floor(baseRevenue * 0.91)
                },
                retainedEarnings: {
                    beginningBalance: Math.floor(baseRevenue * 0.5),
                    netIncome: Math.floor(baseRevenue * 0.14),
                    dividendsDeclared: Math.floor(baseRevenue * -0.04),
                    legalReserve: Math.floor(baseRevenue * -0.01),
                    endingBalance: Math.floor(baseRevenue * 0.59)
                },
                lastTransaction: new Date().toISOString(),
                openHashVerified: true
            });
            setIsLoading(false);
        }, 800);
    };

    const formatKRW = (num) => {
        if (num === undefined || num === null) return '₩0';
        const absNum = Math.abs(num);
        const sign = num < 0 ? '-' : '';
        if (absNum >= 100000000) return `${sign}₩${(absNum / 100000000).toFixed(1)}억`;
        if (absNum >= 10000) return `${sign}₩${(absNum / 10000).toFixed(0)}만`;
        return `${sign}₩${absNum.toLocaleString()}`;
    };

    const renderIncomeStatement = () => (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                <i className="fas fa-chart-line"></i> 손익계산서
            </h3>
            {taxpayerData && (
                <div className="bg-gray-700/50 rounded-xl p-6">
                    <table className="w-full">
                        <tbody className="divide-y divide-gray-600">
                            <tr className="hover:bg-gray-600/30">
                                <td className="py-3 text-gray-300">매출액</td>
                                <td className="py-3 text-right text-white font-medium">{formatKRW(taxpayerData.incomeStatement.revenue)}</td>
                            </tr>
                            <tr className="hover:bg-gray-600/30">
                                <td className="py-3 text-gray-300">매출원가</td>
                                <td className="py-3 text-right text-red-400">({formatKRW(taxpayerData.incomeStatement.costOfSales)})</td>
                            </tr>
                            <tr className="hover:bg-gray-600/30 bg-cyan-500/10">
                                <td className="py-3 text-cyan-400 font-bold">매출총이익</td>
                                <td className="py-3 text-right text-cyan-400 font-bold">{formatKRW(taxpayerData.incomeStatement.grossProfit)}</td>
                            </tr>
                            <tr className="hover:bg-gray-600/30">
                                <td className="py-3 text-gray-300">판매비와관리비</td>
                                <td className="py-3 text-right text-red-400">({formatKRW(taxpayerData.incomeStatement.operatingExpenses)})</td>
                            </tr>
                            <tr className="hover:bg-gray-600/30 bg-purple-500/10">
                                <td className="py-3 text-purple-400 font-bold">영업이익</td>
                                <td className="py-3 text-right text-purple-400 font-bold">{formatKRW(taxpayerData.incomeStatement.operatingIncome)}</td>
                            </tr>
                            <tr className="hover:bg-gray-600/30">
                                <td className="py-3 text-gray-300">이자비용</td>
                                <td className="py-3 text-right text-red-400">({formatKRW(taxpayerData.incomeStatement.interestExpense)})</td>
                            </tr>
                            <tr className="hover:bg-gray-600/30">
                                <td className="py-3 text-gray-300">법인세비용</td>
                                <td className="py-3 text-right text-red-400">({formatKRW(taxpayerData.incomeStatement.taxExpense)})</td>
                            </tr>
                            <tr className="hover:bg-gray-600/30 bg-green-500/10">
                                <td className="py-3 text-green-400 font-bold text-lg">당기순이익</td>
                                <td className="py-3 text-right text-green-400 font-bold text-lg">{formatKRW(taxpayerData.incomeStatement.netIncome)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

    const renderBalanceSheet = () => (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-purple-400 flex items-center gap-2">
                <i className="fas fa-balance-scale"></i> 대차대조표
            </h3>
            {taxpayerData && (
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-700/50 rounded-xl p-6">
                        <h4 className="text-lg font-bold text-blue-400 mb-4">자산</h4>
                        <table className="w-full">
                            <tbody className="divide-y divide-gray-600">
                                <tr><td className="py-2 text-gray-300">유동자산</td><td className="py-2 text-right text-white">{formatKRW(taxpayerData.balanceSheet.currentAssets)}</td></tr>
                                <tr><td className="py-2 text-gray-300">비유동자산</td><td className="py-2 text-right text-white">{formatKRW(taxpayerData.balanceSheet.nonCurrentAssets)}</td></tr>
                                <tr className="bg-blue-500/10"><td className="py-2 text-blue-400 font-bold">자산총계</td><td className="py-2 text-right text-blue-400 font-bold">{formatKRW(taxpayerData.balanceSheet.totalAssets)}</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-gray-700/50 rounded-xl p-6">
                        <h4 className="text-lg font-bold text-red-400 mb-4">부채 및 자본</h4>
                        <table className="w-full">
                            <tbody className="divide-y divide-gray-600">
                                <tr><td className="py-2 text-gray-300">유동부채</td><td className="py-2 text-right text-white">{formatKRW(taxpayerData.balanceSheet.currentLiabilities)}</td></tr>
                                <tr><td className="py-2 text-gray-300">비유동부채</td><td className="py-2 text-right text-white">{formatKRW(taxpayerData.balanceSheet.nonCurrentLiabilities)}</td></tr>
                                <tr className="bg-red-500/10"><td className="py-2 text-red-400 font-bold">부채총계</td><td className="py-2 text-right text-red-400 font-bold">{formatKRW(taxpayerData.balanceSheet.totalLiabilities)}</td></tr>
                                <tr className="bg-green-500/10"><td className="py-2 text-green-400 font-bold">자본총계</td><td className="py-2 text-right text-green-400 font-bold">{formatKRW(taxpayerData.balanceSheet.equity)}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );

    const renderCashFlow = () => (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-400 flex items-center gap-2">
                <i className="fas fa-money-bill-wave"></i> 현금흐름표
            </h3>
            {taxpayerData && (
                <div className="bg-gray-700/50 rounded-xl p-6">
                    <table className="w-full">
                        <tbody className="divide-y divide-gray-600">
                            <tr><td className="py-3 text-gray-300">영업활동 현금흐름</td><td className="py-3 text-right text-green-400 font-medium">{formatKRW(taxpayerData.cashFlow.operatingActivities)}</td></tr>
                            <tr><td className="py-3 text-gray-300">투자활동 현금흐름</td><td className="py-3 text-right text-red-400 font-medium">{formatKRW(taxpayerData.cashFlow.investingActivities)}</td></tr>
                            <tr><td className="py-3 text-gray-300">재무활동 현금흐름</td><td className="py-3 text-right text-red-400 font-medium">{formatKRW(taxpayerData.cashFlow.financingActivities)}</td></tr>
                            <tr className="bg-cyan-500/10"><td className="py-3 text-cyan-400 font-bold">현금의 순증감</td><td className="py-3 text-right text-cyan-400 font-bold">{formatKRW(taxpayerData.cashFlow.netCashChange)}</td></tr>
                            <tr><td className="py-3 text-gray-300">기초 현금</td><td className="py-3 text-right text-white">{formatKRW(taxpayerData.cashFlow.beginningCash)}</td></tr>
                            <tr className="bg-green-500/10"><td className="py-3 text-green-400 font-bold">기말 현금</td><td className="py-3 text-right text-green-400 font-bold">{formatKRW(taxpayerData.cashFlow.endingCash)}</td></tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

    const renderEquityStatement = () => (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-yellow-400 flex items-center gap-2">
                <i className="fas fa-users"></i> 자본변동표
            </h3>
            {taxpayerData && (
                <div className="bg-gray-700/50 rounded-xl p-6">
                    <table className="w-full">
                        <tbody className="divide-y divide-gray-600">
                            <tr><td className="py-3 text-gray-300">기초 자본</td><td className="py-3 text-right text-white">{formatKRW(taxpayerData.equityStatement.beginningEquity)}</td></tr>
                            <tr><td className="py-3 text-gray-300">당기순이익</td><td className="py-3 text-right text-green-400">{formatKRW(taxpayerData.equityStatement.netIncome)}</td></tr>
                            <tr><td className="py-3 text-gray-300">배당금</td><td className="py-3 text-right text-red-400">{formatKRW(taxpayerData.equityStatement.dividends)}</td></tr>
                            <tr><td className="py-3 text-gray-300">기타 변동</td><td className="py-3 text-right text-white">{formatKRW(taxpayerData.equityStatement.otherChanges)}</td></tr>
                            <tr className="bg-yellow-500/10"><td className="py-3 text-yellow-400 font-bold">기말 자본</td><td className="py-3 text-right text-yellow-400 font-bold">{formatKRW(taxpayerData.equityStatement.endingEquity)}</td></tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

    const renderRetainedEarnings = () => (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-pink-400 flex items-center gap-2">
                <i className="fas fa-piggy-bank"></i> 이익잉여금처분계산서
            </h3>
            {taxpayerData && (
                <div className="bg-gray-700/50 rounded-xl p-6">
                    <table className="w-full">
                        <tbody className="divide-y divide-gray-600">
                            <tr><td className="py-3 text-gray-300">처분전 이익잉여금</td><td className="py-3 text-right text-white">{formatKRW(taxpayerData.retainedEarnings.beginningBalance)}</td></tr>
                            <tr><td className="py-3 text-gray-300 pl-4">전기이월이익잉여금</td><td className="py-3 text-right text-gray-400">{formatKRW(taxpayerData.retainedEarnings.beginningBalance * 0.7)}</td></tr>
                            <tr><td className="py-3 text-gray-300 pl-4">당기순이익</td><td className="py-3 text-right text-green-400">{formatKRW(taxpayerData.retainedEarnings.netIncome)}</td></tr>
                            <tr className="bg-gray-600/30"><td className="py-3 text-gray-300 font-medium">이익잉여금 처분액</td><td className="py-3 text-right text-white"></td></tr>
                            <tr><td className="py-3 text-gray-300 pl-4">이익준비금</td><td className="py-3 text-right text-red-400">{formatKRW(taxpayerData.retainedEarnings.legalReserve)}</td></tr>
                            <tr><td className="py-3 text-gray-300 pl-4">배당금</td><td className="py-3 text-right text-red-400">{formatKRW(taxpayerData.retainedEarnings.dividendsDeclared)}</td></tr>
                            <tr className="bg-pink-500/10"><td className="py-3 text-pink-400 font-bold">차기이월이익잉여금</td><td className="py-3 text-right text-pink-400 font-bold">{formatKRW(taxpayerData.retainedEarnings.endingBalance)}</td></tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

    const renderTabContent = () => {
        if (!taxpayerData) {
            return (
                <div className="text-center py-12 text-gray-400">
                    <i className="fas fa-search text-4xl mb-4"></i>
                    <p>납세자 ID를 검색하여 재무제표를 조회하세요</p>
                </div>
            );
        }
        switch(activeTab) {
            case 'income': return renderIncomeStatement();
            case 'balance': return renderBalanceSheet();
            case 'cashflow': return renderCashFlow();
            case 'equity': return renderEquityStatement();
            case 'retained': return renderRetainedEarnings();
            default: return renderIncomeStatement();
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* 검색 영역 */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <label className="block text-sm text-gray-400 mb-2">납세자 ID 검색</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                                placeholder="예: P-7A3B2C1D 또는 C-9E8F7G6H"
                                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <button
                                onClick={handleSearch}
                                disabled={isLoading}
                                className="bg-cyan-600 hover:bg-cyan-500 px-6 py-3 rounded-lg font-medium transition disabled:opacity-50"
                            >
                                {isLoading ? <i className="fas fa-spinner fa-spin"></i> : <><i className="fas fa-search mr-2"></i>조회</>}
                            </button>
                        </div>
                    </div>
                    <div className="border-l border-gray-600 pl-4">
                        <label className="block text-sm text-gray-400 mb-2">빠른 선택</label>
                        <div className="flex gap-2">
                            {demoTaxpayers.slice(0, 3).map(tp => (
                                <button
                                    key={tp.id}
                                    onClick={() => { setSearchId(tp.id); }}
                                    className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg text-sm transition"
                                >
                                    {tp.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
                {/* 메인 재무제표 영역 */}
                <div className="col-span-3 bg-gray-800 rounded-2xl border border-gray-700">
                    {/* 탭 헤더 */}
                    <div className="flex border-b border-gray-700">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 px-4 py-4 text-sm font-medium transition flex items-center justify-center gap-2 ${
                                    activeTab === tab.id 
                                        ? `bg-${tab.color}-500/20 text-${tab.color}-400 border-b-2 border-${tab.color}-500` 
                                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                }`}
                            >
                                <i className={`fas ${tab.icon}`}></i>
                                <span className="hidden lg:inline">{tab.name}</span>
                            </button>
                        ))}
                    </div>
                    
                    {/* 납세자 정보 헤더 */}
                    {taxpayerData && (
                        <div className="p-4 border-b border-gray-700 bg-gray-700/30">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                        taxpayerData.type === '법인' ? 'bg-purple-500/20' : 'bg-blue-500/20'
                                    }`}>
                                        <i className={`fas ${taxpayerData.type === '법인' ? 'fa-building' : 'fa-user'} text-xl ${
                                            taxpayerData.type === '법인' ? 'text-purple-400' : 'text-blue-400'
                                        }`}></i>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-white">{taxpayerData.name}</div>
                                        <div className="text-sm text-gray-400">{taxpayerData.id} | {taxpayerData.type}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="text-xs text-gray-400">신용도</div>
                                        <div className={`text-lg font-bold ${
                                            taxpayerData.creditScore >= 0.9 ? 'text-green-400' :
                                            taxpayerData.creditScore >= 0.7 ? 'text-yellow-400' : 'text-red-400'
                                        }`}>
                                            {(taxpayerData.creditScore * 100).toFixed(0)}점
                                        </div>
                                    </div>
                                    <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                        <i className="fas fa-check-circle"></i>
                                        OpenHash 검증됨
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* 탭 콘텐츠 */}
                    <div className="p-6">
                        {renderTabContent()}
                    </div>
                </div>

                {/* 실시간 갱신 로그 */}
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        실시간 재무 갱신
                    </h3>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                        {realtimeUpdates.map((update, idx) => (
                            <div key={update.id} className={`p-3 rounded-lg ${idx === 0 ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-gray-700/50'}`}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-gray-400">{update.taxpayerId}</span>
                                    <span className="text-xs text-gray-500">{new Date(update.timestamp).toLocaleTimeString('ko-KR')}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-white">{update.type}</span>
                                    <span className={`text-sm font-medium ${update.type === '매출' || update.type === '이자수익' ? 'text-green-400' : 'text-red-400'}`}>
                                        {update.type === '매출' || update.type === '이자수익' ? '+' : '-'}{formatKRW(update.amount)}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    → {update.statements === 'income' ? '손익계산서' : update.statements === 'balance' ? '대차대조표' : '현금흐름표'} 반영
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
