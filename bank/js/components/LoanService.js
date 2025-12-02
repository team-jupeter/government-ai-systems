const LoanService = () => {
    const [expandedPanel, setExpandedPanel] = React.useState(null);
    const [simulationRunning, setSimulationRunning] = React.useState(false);
    
    // 시뮬레이션 상태
    const [bankData, setBankData] = React.useState({
        totalDeposits: 10000, // 억원
        reserveRatio: 7, // %
        reserves: 700, // 억원
        lendableAmount: 9300, // 억원
        totalLoans: 8500, // 억원
        utilizationRate: 91.4 // %
    });

    // 대출 배분
    const [loanAllocation, setLoanAllocation] = React.useState({
        corporate: { amount: 5100, ratio: 60, types: { credit: 1530, collateral: 2550, policy: 1020 } },
        individual: { amount: 3400, ratio: 40, types: { credit: 1020, mortgage: 2040, policy: 340 } }
    });

    // 시뮬레이션 실행
    const runSimulation = () => {
        setSimulationRunning(true);
        
        let iteration = 0;
        const interval = setInterval(() => {
            iteration++;
            
            // 예금 변동 시뮬레이션 (±5%)
            const depositChange = (Math.random() - 0.5) * 1000;
            const newDeposits = Math.max(8000, Math.min(12000, bankData.totalDeposits + depositChange));
            const newReserves = newDeposits * (bankData.reserveRatio / 100);
            const newLendable = newDeposits - newReserves;
            const newLoans = Math.min(newLendable * 0.95, bankData.totalLoans + (Math.random() - 0.5) * 500);
            
            setBankData({
                totalDeposits: Math.round(newDeposits),
                reserveRatio: bankData.reserveRatio,
                reserves: Math.round(newReserves),
                lendableAmount: Math.round(newLendable),
                totalLoans: Math.round(newLoans),
                utilizationRate: Math.round((newLoans / newLendable) * 1000) / 10
            });

            // AI 자동 배분
            const corporateRatio = 55 + Math.random() * 10; // 55-65%
            const individualRatio = 100 - corporateRatio;
            
            setLoanAllocation({
                corporate: {
                    amount: Math.round(newLoans * (corporateRatio / 100)),
                    ratio: Math.round(corporateRatio * 10) / 10,
                    types: {
                        credit: Math.round(newLoans * (corporateRatio / 100) * 0.3),
                        collateral: Math.round(newLoans * (corporateRatio / 100) * 0.5),
                        policy: Math.round(newLoans * (corporateRatio / 100) * 0.2)
                    }
                },
                individual: {
                    amount: Math.round(newLoans * (individualRatio / 100)),
                    ratio: Math.round(individualRatio * 10) / 10,
                    types: {
                        credit: Math.round(newLoans * (individualRatio / 100) * 0.3),
                        mortgage: Math.round(newLoans * (individualRatio / 100) * 0.6),
                        policy: Math.round(newLoans * (individualRatio / 100) * 0.1)
                    }
                }
            });

            if (iteration >= 30) {
                clearInterval(interval);
                setSimulationRunning(false);
            }
        }, 200);
    };

    const togglePanel = (panelId) => {
        setExpandedPanel(expandedPanel === panelId ? null : panelId);
    };

    return (
        <div className="space-y-6 animate-slideDown">
            {/* 헤더 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <i className="fas fa-hand-holding-usd text-blue-600 text-3xl"></i>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">AI 대출 배분 시스템</h1>
                        <p className="text-gray-600">예금 기반 지능형 대출 자산 최적 배분</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{bankData.totalDeposits.toLocaleString()}억</div>
                        <div className="text-sm text-gray-600">총 예금</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{bankData.reserves.toLocaleString()}억</div>
                        <div className="text-sm text-gray-600">지급준비금 ({bankData.reserveRatio}%)</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{bankData.lendableAmount.toLocaleString()}억</div>
                        <div className="text-sm text-gray-600">대출 가능 자금</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{bankData.utilizationRate}%</div>
                        <div className="text-sm text-gray-600">대출 가동률</div>
                    </div>
                </div>
            </div>

            {/* 대출 배분 흐름도 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                    <i className="fas fa-project-diagram text-blue-600"></i>
                    대출 배분 프로세스
                </h2>
                
                <div className="grid md:grid-cols-5 gap-3 mb-4">
                    <div className="text-center p-4 border-2 border-blue-200 rounded-lg bg-blue-50 relative">
                        <div className="text-3xl mb-2">💰</div>
                        <div className="font-bold text-sm mb-1">1. 총 예금</div>
                        <div className="text-2xl font-bold text-blue-600">{bankData.totalDeposits.toLocaleString()}억</div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                        <i className="fas fa-arrow-right text-gray-400 text-2xl animate-pulse"></i>
                    </div>
                    
                    <div className="text-center p-4 border-2 border-purple-200 rounded-lg bg-purple-50">
                        <div className="text-3xl mb-2">🏦</div>
                        <div className="font-bold text-sm mb-1">2. 지급준비금</div>
                        <div className="text-2xl font-bold text-purple-600">-{bankData.reserves.toLocaleString()}억</div>
                        <div className="text-xs text-gray-500 mt-1">({bankData.reserveRatio}% 법정비율)</div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                        <i className="fas fa-arrow-right text-gray-400 text-2xl animate-pulse"></i>
                    </div>
                    
                    <div className="text-center p-4 border-2 border-green-200 rounded-lg bg-green-50">
                        <div className="text-3xl mb-2">📊</div>
                        <div className="font-bold text-sm mb-1">3. AI 배분</div>
                        <div className="text-2xl font-bold text-green-600">{bankData.totalLoans.toLocaleString()}억</div>
                        <div className="text-xs text-gray-500 mt-1">실시간 최적화</div>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
                    <div className="flex items-start gap-2">
                        <i className="fas fa-lightbulb text-yellow-600 mt-1"></i>
                        <div>
                            <div className="font-bold text-gray-900 mb-1">지급준비금 제도</div>
                            <div className="text-gray-700">
                                금융기관이 예금자의 인출 요구에 대비하여 예금의 일정 비율({bankData.reserveRatio}%)을 중앙은행에 의무 예치하는 제도입니다. 
                                나머지 자금({100 - bankData.reserveRatio}%)만 대출로 활용 가능하며, 이를 통해 금융 시스템의 안정성을 확보합니다.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 실시간 시뮬레이션 */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-2 border-blue-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <i className="fas fa-chart-line text-blue-600"></i>
                        실시간 배분 시뮬레이션
                    </h2>
                    <button
                        onClick={runSimulation}
                        disabled={simulationRunning}
                        className={`px-6 py-2 rounded-lg font-bold transition-all ${
                            simulationRunning
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                    >
                        {simulationRunning ? (
                            <><i className="fas fa-spinner fa-spin mr-2"></i>시뮬레이션 실행 중...</>
                        ) : (
                            <><i className="fas fa-play mr-2"></i>시뮬레이션 시작</>
                        )}
                    </button>
                </div>

                {/* 대출 배분 현황 */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* 기업 대출 */}
                    <div className="bg-white rounded-lg border border-gray-200 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-lg text-blue-600">기업 대출</h3>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-blue-600">{loanAllocation.corporate.ratio}%</div>
                                <div className="text-sm text-gray-500">{loanAllocation.corporate.amount.toLocaleString()}억원</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                                <span className="text-sm text-gray-700">신용대출</span>
                                <span className="font-bold text-blue-600">{loanAllocation.corporate.types.credit.toLocaleString()}억</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                                <span className="text-sm text-gray-700">담보대출</span>
                                <span className="font-bold text-blue-600">{loanAllocation.corporate.types.collateral.toLocaleString()}억</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                                <span className="text-sm text-gray-700">정책대출</span>
                                <span className="font-bold text-blue-600">{loanAllocation.corporate.types.policy.toLocaleString()}억</span>
                            </div>
                        </div>
                    </div>

                    {/* 개인 대출 */}
                    <div className="bg-white rounded-lg border border-gray-200 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-lg text-green-600">개인 대출</h3>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-green-600">{loanAllocation.individual.ratio}%</div>
                                <div className="text-sm text-gray-500">{loanAllocation.individual.amount.toLocaleString()}억원</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                                <span className="text-sm text-gray-700">신용대출</span>
                                <span className="font-bold text-green-600">{loanAllocation.individual.types.credit.toLocaleString()}억</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                                <span className="text-sm text-gray-700">주택담보대출</span>
                                <span className="font-bold text-green-600">{loanAllocation.individual.types.mortgage.toLocaleString()}억</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                                <span className="text-sm text-gray-700">정책대출</span>
                                <span className="font-bold text-green-600">{loanAllocation.individual.types.policy.toLocaleString()}억</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="text-sm text-gray-700">
                        <i className="fas fa-info-circle text-blue-600 mr-2"></i>
                        AI가 실시간으로 경제 지표, 산업 동향, 신용 리스크를 분석하여 최적 배분 비율을 자동 조정합니다.
                        예금 증가 시 대출 가능 자금이 자동 확대되며, 리스크 가중치에 따라 배분이 재조정됩니다.
                    </div>
                </div>
            </div>

            {/* AI 자동 배분 메커니즘 카드 */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">AI 자동 배분 메커니즘</h2>

                {/* 카드 1: 예대율 관리 */}
                <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
                    <div
                        className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => togglePanel('loan-to-deposit')}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <i className="fas fa-percentage text-blue-600 text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">예대율 (LTD Ratio) 관리</h3>
                                    <p className="text-sm text-gray-600">대출 / 예금 비율 최적화</p>
                                </div>
                            </div>
                            <i className={`fas fa-chevron-${expandedPanel === 'loan-to-deposit' ? 'up' : 'down'} text-blue-600 text-xl`}></i>
                        </div>
                    </div>

                    <div className={`slide-panel ${expandedPanel === 'loan-to-deposit' ? 'open' : ''}`}>
                        <div className="p-6 bg-blue-50 border-t border-gray-200">
                            <h4 className="font-bold mb-3 text-gray-900">예대율 = (총 대출 / 총 예금) × 100</h4>
                            
                            <div className="bg-white rounded-lg p-4 mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-700">현재 예대율</span>
                                    <span className="text-2xl font-bold text-blue-600">
                                        {((bankData.totalLoans / bankData.totalDeposits) * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                                        style={{ width: `${Math.min((bankData.totalLoans / bankData.totalDeposits) * 100, 100)}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>0%</span>
                                    <span className="text-green-600 font-bold">최적: 85-95%</span>
                                    <span>100%</span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-3">
                                <div className="bg-white p-3 rounded border border-green-200">
                                    <div className="text-xs text-gray-600 mb-1">안전 범위</div>
                                    <div className="font-bold text-green-600">85-95%</div>
                                    <div className="text-xs text-gray-500 mt-1">유동성 확보</div>
                                </div>
                                <div className="bg-white p-3 rounded border border-yellow-200">
                                    <div className="text-xs text-gray-600 mb-1">주의 필요</div>
                                    <div className="font-bold text-yellow-600">95-100%</div>
                                    <div className="text-xs text-gray-500 mt-1">유동성 위험</div>
                                </div>
                                <div className="bg-white p-3 rounded border border-red-200">
                                    <div className="text-xs text-gray-600 mb-1">위험</div>
                                    <div className="font-bold text-red-600">100% 초과</div>
                                    <div className="text-xs text-gray-500 mt-1">즉시 조정</div>
                                </div>
                            </div>

                            <div className="mt-4 text-sm text-gray-700 leading-relaxed">
                                AI는 예대율을 실시간 모니터링하여 <strong>85-95%</strong> 안전 범위를 유지합니다. 
                                예금이 증가하면 대출 한도를 자동 확대하고, 예금이 감소하면 신규 대출을 제한하여 
                                유동성 위험을 사전 방지합니다.
                            </div>
                        </div>
                    </div>
                </div>

                {/* 카드 2: BIS 자기자본비율 */}
                <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
                    <div
                        className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => togglePanel('bis-ratio')}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <i className="fas fa-shield-alt text-purple-600 text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">BIS 자기자본비율</h3>
                                    <p className="text-sm text-gray-600">리스크 가중자산 대비 자본 비율</p>
                                </div>
                            </div>
                            <i className={`fas fa-chevron-${expandedPanel === 'bis-ratio' ? 'up' : 'down'} text-purple-600 text-xl`}></i>
                        </div>
                    </div>

                    <div className={`slide-panel ${expandedPanel === 'bis-ratio' ? 'open' : ''}`}>
                        <div className="p-6 bg-purple-50 border-t border-gray-200">
                            <h4 className="font-bold mb-3 text-gray-900">BIS 비율 = (자기자본 / 위험가중자산) × 100</h4>
                            
                            <div className="bg-white rounded-lg p-4 mb-4">
                                <div className="grid md:grid-cols-3 gap-4 mb-4">
                                    <div className="text-center">
                                        <div className="text-sm text-gray-600 mb-1">자기자본</div>
                                        <div className="text-xl font-bold text-purple-600">1,500억</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm text-gray-600 mb-1">위험가중자산</div>
                                        <div className="text-xl font-bold text-gray-900">10,200억</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm text-gray-600 mb-1">BIS 비율</div>
                                        <div className="text-2xl font-bold text-green-600">14.7%</div>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-purple-600 h-3 rounded-full transition-all duration-500"
                                        style={{ width: `${Math.min((14.7 / 20) * 100, 100)}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>0%</span>
                                    <span className="text-red-600 font-bold">최소: 8%</span>
                                    <span className="text-green-600 font-bold">권장: 10%+</span>
                                    <span>20%</span>
                                </div>
                            </div>

                            <div className="space-y-3 mb-4">
                                <h5 className="font-bold text-gray-900">위험 가중치 (Risk Weight)</h5>
                                <div className="grid md:grid-cols-2 gap-3">
                                    <div className="bg-white p-3 rounded border border-gray-200">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-700">국채</span>
                                            <span className="font-bold text-green-600">0%</span>
                                        </div>
                                        <div className="text-xs text-gray-500">무위험 자산</div>
                                    </div>
                                    <div className="bg-white p-3 rounded border border-gray-200">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-700">주택담보대출</span>
                                            <span className="font-bold text-blue-600">35%</span>
                                        </div>
                                        <div className="text-xs text-gray-500">저위험 담보</div>
                                    </div>
                                    <div className="bg-white p-3 rounded border border-gray-200">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-700">기업담보대출</span>
                                            <span className="font-bold text-yellow-600">50%</span>
                                        </div>
                                        <div className="text-xs text-gray-500">중위험</div>
                                    </div>
                                    <div className="bg-white p-3 rounded border border-gray-200">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-700">신용대출</span>
                                            <span className="font-bold text-red-600">100%</span>
                                        </div>
                                        <div className="text-xs text-gray-500">고위험</div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-sm text-gray-700 leading-relaxed">
                                AI는 각 대출의 <strong>신용등급과 담보 유무</strong>에 따라 위험 가중치를 자동 산정하고, 
                                BIS 비율이 <strong>10% 이상</strong>을 유지하도록 대출 승인을 조정합니다. 
                                자기자본이 부족하면 고위험 대출(신용대출)을 제한하고 저위험 대출(주택담보)을 우선 배분합니다.
                            </div>
                        </div>
                    </div>
                </div>

                {/* 카드 3: 신용대출 */}
                <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
                    <div
                        className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => togglePanel('credit-loan')}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <i className="fas fa-user-check text-green-600 text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">신용대출 (Unsecured Loan)</h3>
                                    <p className="text-sm text-gray-600">담보 없이 신용평가만으로 승인</p>
                                </div>
                            </div>
                            <i className={`fas fa-chevron-${expandedPanel === 'credit-loan' ? 'up' : 'down'} text-green-600 text-xl`}></i>
                        </div>
                    </div>

                    <div className={`slide-panel ${expandedPanel === 'credit-loan' ? 'open' : ''}`}>
                        <div className="p-6 bg-green-50 border-t border-gray-200">
                            <div className="grid md:grid-cols-2 gap-6 mb-4">
                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                    <h5 className="font-bold mb-3 text-gray-900">승인 기준</h5>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <i className="fas fa-check text-green-600"></i>
                                            <span>신용등급 A 이상 (850점+)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <i className="fas fa-check text-green-600"></i>
                                            <span>부채비율 50% 이하</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <i className="fas fa-check text-green-600"></i>
                                            <span>안정적 소득 증빙</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <i className="fas fa-check text-green-600"></i>
                                            <span>연체 이력 없음</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                    <h5 className="font-bold mb-3 text-gray-900">대출 조건</h5>
                                    <div className="space-y-3 text-sm">
                                        <div>
                                            <div className="text-gray-600 mb-1">금리</div>
                                            <div className="font-bold text-green-600">4.1% ~ 12.8%</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-600 mb-1">한도</div>
                                            <div className="font-bold text-gray-900">신용자산 범위 내</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-600 mb-1">승인 시간</div>
                                            <div className="font-bold text-blue-600">0.015ms</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 border-l-4 border-green-600">
                                <div className="font-bold text-gray-900 mb-2">AI 자동 배분 로직</div>
                                <div className="text-sm text-gray-700 leading-relaxed">
                                    신용대출은 담보가 없어 <strong>위험가중치 100%</strong>가 적용됩니다. 
                                    AI는 전체 대출 포트폴리오에서 신용대출 비중이 <strong>30% 이하</strong>를 유지하도록 배분하며, 
                                    신용등급이 높은 고객에게 우선 배정합니다. 경제 불황 시에는 자동으로 신용대출 비중을 축소합니다.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 카드 4: 담보대출 */}
                <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
                    <div
                        className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => togglePanel('collateral-loan')}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                    <i className="fas fa-home text-orange-600 text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">담보대출 (Secured Loan)</h3>
                                    <p className="text-sm text-gray-600">부동산·유가증권 담보 제공</p>
                                </div>
                            </div>
                            <i className={`fas fa-chevron-${expandedPanel === 'collateral-loan' ? 'up' : 'down'} text-orange-600 text-xl`}></i>
                        </div>
                    </div>

                    <div className={`slide-panel ${expandedPanel === 'collateral-loan' ? 'open' : ''}`}>
                        <div className="p-6 bg-orange-50 border-t border-gray-200">
                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                                <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                                    <div className="text-3xl mb-2">🏠</div>
                                    <div className="font-bold text-gray-900 mb-1">주택담보</div>
                                    <div className="text-sm text-gray-600 mb-2">LTV 최대 70%</div>
                                    <div className="text-lg font-bold text-orange-600">2.8-4.5%</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                                    <div className="text-3xl mb-2">🏢</div>
                                    <div className="font-bold text-gray-900 mb-1">상업용 부동산</div>
                                    <div className="text-sm text-gray-600 mb-2">LTV 최대 60%</div>
                                    <div className="text-lg font-bold text-orange-600">3.5-5.8%</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                                    <div className="text-3xl mb-2">📈</div>
                                    <div className="font-bold text-gray-900 mb-1">유가증권</div>
                                    <div className="text-sm text-gray-600 mb-2">LTV 최대 50%</div>
                                    <div className="text-lg font-bold text-orange-600">4.2-6.5%</div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                                <h5 className="font-bold mb-3 text-gray-900">LTV (Loan to Value) 계산</h5>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                        <span className="text-gray-700">담보 감정가</span>
                                        <span className="font-bold">5억원</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                        <span className="text-gray-700">LTV 비율</span>
                                        <span className="font-bold text-orange-600">70%</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-orange-50 rounded border border-orange-300">
                                        <span className="font-bold text-gray-900">최대 대출액</span>
                                        <span className="font-bold text-orange-600">3.5억원</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 border-l-4 border-orange-600">
                                <div className="font-bold text-gray-900 mb-2">AI 담보 가치 평가</div>
                                <div className="text-sm text-gray-700 leading-relaxed">
                                    AI가 <strong>실시간 부동산 시세, 거래 동향, 지역 개발 계획</strong>을 분석하여 담보 가치를 자동 산정합니다. 
                                    담보대출은 위험가중치 <strong>35-50%</strong>로 낮아 전체 대출의 <strong>50-60%</strong>를 배분합니다. 
                                    부동산 시장 과열 시 LTV를 자동 하향 조정하여 리스크를 관리합니다.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 카드 5: 정책대출 */}
                <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
                    <div
                        className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => togglePanel('policy-loan')}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <i className="fas fa-landmark text-red-600 text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">정책대출 (Policy Loan)</h3>
                                    <p className="text-sm text-gray-600">정부 지원 저금리 특별 대출</p>
                                </div>
                            </div>
                            <i className={`fas fa-chevron-${expandedPanel === 'policy-loan' ? 'up' : 'down'} text-red-600 text-xl`}></i>
                        </div>
                    </div>

                    <div className={`slide-panel ${expandedPanel === 'policy-loan' ? 'open' : ''}`}>
                        <div className="p-6 bg-red-50 border-t border-gray-200">
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                    <h5 className="font-bold mb-3 text-red-600">기업 정책대출</h5>
                                    <div className="space-y-2 text-sm">
                                        <div className="p-2 bg-gray-50 rounded">
                                            <div className="font-bold text-gray-900">중소기업 육성</div>
                                            <div className="text-gray-600">금리 2.5-3.5% | 최대 10억</div>
                                        </div>
                                        <div className="p-2 bg-gray-50 rounded">
                                            <div className="font-bold text-gray-900">스타트업 지원</div>
                                            <div className="text-gray-600">금리 2.0-3.0% | 최대 5억</div>
                                        </div>
                                        <div className="p-2 bg-gray-50 rounded">
                                            <div className="font-bold text-gray-900">수출 기업</div>
                                            <div className="text-gray-600">금리 1.8-2.8% | 최대 20억</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                    <h5 className="font-bold mb-3 text-red-600">개인 정책대출</h5>
                                    <div className="space-y-2 text-sm">
                                        <div className="p-2 bg-gray-50 rounded">
                                            <div className="font-bold text-gray-900">청년 전세대출</div>
                                            <div className="text-gray-600">금리 1.5-2.5% | 최대 2억</div>
                                        </div>
                                        <div className="p-2 bg-gray-50 rounded">
                                            <div className="font-bold text-gray-900">신혼부부 특례</div>
                                            <div className="text-gray-600">금리 1.7-2.3% | 최대 3억</div>
                                        </div>
                                        <div className="p-2 bg-gray-50 rounded">
                                            <div className="font-bold text-gray-900">학자금 대출</div>
                                            <div className="text-gray-600">금리 1.7-2.9% | 학비 전액</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 border-l-4 border-red-600">
                                <div className="font-bold text-gray-900 mb-2">AI 정책대출 배분</div>
                                <div className="text-sm text-gray-700 leading-relaxed">
                                    정책대출은 정부 재정으로 <strong>금리 보전</strong>을 받아 저금리로 제공됩니다. 
                                    AI가 정부 지침과 지원 예산을 실시간 반영하여 <strong>자격 요건 충족 고객</strong>에게 자동 배정합니다. 
                                    전체 대출의 <strong>10-15%</strong>를 정책대출로 배분하며, 경제 위기 시 비중을 확대합니다.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 경제학적 원리 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                    <i className="fas fa-graduation-cap text-purple-600"></i>
                    경제학적 원리
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-5 border border-gray-200">
                        <h3 className="font-bold text-lg mb-3 text-purple-600">화폐 승수 효과</h3>
                        <div className="text-sm text-gray-700 space-y-2">
                            <div>지급준비율이 <strong>{bankData.reserveRatio}%</strong>일 때, 화폐 승수는:</div>
                            <div className="bg-purple-50 p-3 rounded text-center">
                                <div className="text-xs text-gray-600 mb-1">승수 = 1 / 지급준비율</div>
                                <div className="text-2xl font-bold text-purple-600">
                                    {(1 / (bankData.reserveRatio / 100)).toFixed(2)}배
                                </div>
                            </div>
                            <div className="text-xs text-gray-600">
                                최초 예금 100억원이 있으면, 은행 시스템 전체에서 최대 
                                <strong className="text-purple-600"> {(100 * (1 / (bankData.reserveRatio / 100))).toFixed(0)}억원</strong>의 
                                통화 창출이 가능합니다.
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-5 border border-gray-200">
                        <h3 className="font-bold text-lg mb-3 text-pink-600">리스크 분산 원리</h3>
                        <div className="text-sm text-gray-700 space-y-2">
                            <div>AI가 대출을 다각화하여 포트폴리오 리스크를 최소화:</div>
                            <div className="space-y-1">
                                <div className="flex justify-between items-center p-2 bg-pink-50 rounded">
                                    <span>산업별 분산</span>
                                    <span className="font-bold text-pink-600">20개 업종</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-pink-50 rounded">
                                    <span>지역별 분산</span>
                                    <span className="font-bold text-pink-600">17개 시도</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-pink-50 rounded">
                                    <span>신용등급 분산</span>
                                    <span className="font-bold text-pink-600">AAA~BB</span>
                                </div>
                            </div>
                            <div className="text-xs text-gray-600">
                                <strong>포트폴리오 이론</strong>에 따라 상관관계가 낮은 대출을 조합하여 
                                전체 리스크를 개별 리스크의 합보다 낮게 유지합니다.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS for slide animation */}
            <style>{`
                .slide-panel {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .slide-panel.open {
                    max-height: 2000px;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
};
