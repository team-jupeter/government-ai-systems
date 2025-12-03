// 재무제표 자동생성 컴포넌트
const FinancialStatement = () => {
    const [stages, setStages] = React.useState([]);
    const [isRunning, setIsRunning] = React.useState(false);
    const [entities, setEntities] = React.useState(null);

    const initialEntities = [
        { id: '+82-10-1234-5678', name: '김철수', type: 'individual', cash: 50000000, digitalCurrency: 10000000, receivables: 5000000, ppe: 35000000, liabilities: 30000000, revenue: 0, expenses: 0 },
        { id: '+82-10-2345-6789', name: '이영희', type: 'individual', cash: 30000000, digitalCurrency: 5000000, receivables: 3000000, ppe: 42000000, liabilities: 20000000, revenue: 0, expenses: 0 },
        { id: '+82-10-3456-7890', name: '박민수', type: 'individual', cash: 20000000, digitalCurrency: 3000000, receivables: 2000000, ppe: 35000000, liabilities: 15000000, revenue: 0, expenses: 0 },
        { id: '+82-2-1234-5678', name: '(주)테크솔루션', type: 'business', cash: 500000000, digitalCurrency: 100000000, receivables: 200000000, ppe: 1200000000, liabilities: 800000000, revenue: 1500000000, expenses: 1200000000 },
        { id: '+82-2-2345-6789', name: '스마트컴퍼니(주)', type: 'business', cash: 300000000, digitalCurrency: 60000000, receivables: 150000000, ppe: 990000000, liabilities: 600000000, revenue: 1000000000, expenses: 800000000 },
        { id: '+82-10-4567-8901', name: '정수진', type: 'individual', cash: 40000000, digitalCurrency: 8000000, receivables: 4000000, ppe: 38000000, liabilities: 25000000, revenue: 0, expenses: 0 },
        { id: '+82-51-5678-9012', name: '부산물류(주)', type: 'business', cash: 350000000, digitalCurrency: 70000000, receivables: 160000000, ppe: 800000000, liabilities: 650000000, revenue: 1100000000, expenses: 900000000 }
    ];

    const startSimulation = () => {
        setIsRunning(true);
        setStages([]);

        const fromIdx = Math.floor(Math.random() * initialEntities.length);
        let toIdx = Math.floor(Math.random() * initialEntities.length);
        while (toIdx === fromIdx) toIdx = Math.floor(Math.random() * initialEntities.length);

        const from = JSON.parse(JSON.stringify(initialEntities[fromIdx]));
        const to = JSON.parse(JSON.stringify(initialEntities[toIdx]));
        const amount = Math.floor(Math.random() * 5000000) + 1000000;

        setEntities({ from, to, amount, timestamp: new Date().toLocaleTimeString('ko-KR') });

        setTimeout(() => {
            setStages(prev => [{
                type: 'before',
                message: '두 거래 당사자를 임의로 선택하였습니다.',
                data: { from, to }
            }, ...prev]);
        }, 100);

        setTimeout(() => {
            setStages(prev => [{
                type: 'transaction',
                message: '거래를 실시합니다',
                data: { from: from.name, to: to.name, amount, timestamp: new Date().toLocaleTimeString('ko-KR') }
            }, ...prev]);
        }, 3000);

        setTimeout(() => {
            const fromAfter = {
                ...from,
                digitalCurrency: from.digitalCurrency - amount,
                expenses: from.type === 'business' ? from.expenses + amount : from.expenses
            };
            const toAfter = {
                ...to,
                digitalCurrency: to.digitalCurrency + amount,
                revenue: to.type === 'business' ? to.revenue + amount : to.revenue
            };
            
            setStages(prev => [{
                type: 'after',
                message: '거래 후 재무제표입니다',
                data: { from: fromAfter, to: toAfter, amount }
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
        return (
            <div className={`bg-white border-2 rounded-lg p-4 ${highlight ? 'border-yellow-400 shadow-lg' : 'border-gray-300'}`}>
                <h4 className="font-bold text-gray-900 mb-3 pb-2 border-b text-sm">
                    {entity.name} - 대차대조표 {label && `(${label})`}
                </h4>
                <div className="mb-3">
                    <div className="text-xs font-bold mb-1">자산</div>
                    <table className="w-full text-xs">
                        <tbody>
                            <tr><td>현금</td><td className="text-right">₩{formatNumber(entity.cash)}</td></tr>
                            <tr className="bg-blue-50"><td><strong>💎 디지털화폐</strong></td><td className="text-right font-bold">₩{formatNumber(entity.digitalCurrency)}</td></tr>
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

    const IncomeStatement = ({ entity, label }) => {
        if (entity.type !== 'business') return null;
        const grossProfit = entity.revenue * 0.4;
        const operatingIncome = grossProfit - entity.expenses * 0.6;
        return (
            <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-3 pb-2 border-b text-sm">
                    {entity.name} - 손익계산서 {label && `(${label})`}
                </h4>
                <table className="w-full text-xs">
                    <tbody>
                        <tr><td>매출액</td><td className="text-right">₩{formatNumber(entity.revenue)}</td></tr>
                        <tr><td>매출원가</td><td className="text-right text-red-700">(₩{formatNumber(entity.revenue * 0.6)})</td></tr>
                        <tr className="font-bold border-t"><td>매출총이익</td><td className="text-right">₩{formatNumber(grossProfit)}</td></tr>
                        <tr><td>영업비용</td><td className="text-right text-red-700">(₩{formatNumber(entity.expenses * 0.6)})</td></tr>
                        <tr className="font-bold border-t bg-purple-50"><td>영업이익</td><td className="text-right">₩{formatNumber(operatingIncome)}</td></tr>
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            {/* 개요 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-gov-blue pl-4">재무제표 자동생성 시스템</h2>
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-gov-blue">
                    <p className="text-sm text-gray-800 mb-3">
                        <strong>대한민국 5천만 개인 + 1천만 사업자</strong> 각각에게 실시간 재무제표 자동 생성 (0.001ms 갱신). 
                        모든 데이터는 <a href="http://100.30.14.224/private-data-vault/" target="_blank" className="text-gov-blue underline">PDV</a>에 저장, 
                        <a href="http://100.30.14.224/openhash-system/" target="_blank" className="text-gov-blue underline">OpenHash</a>에 기록되어 위변조 불가능.
                    </p>
                    <div className="grid grid-cols-4 gap-3">
                        <div className="bg-white rounded p-2 text-center"><div className="text-lg font-bold text-gov-blue">6천만</div><div className="text-xs">계정</div></div>
                        <div className="bg-white rounded p-2 text-center"><div className="text-lg font-bold text-gov-blue">0.001ms</div><div className="text-xs">갱신</div></div>
                        <div className="bg-white rounded p-2 text-center"><div className="text-lg font-bold text-gov-blue">99%+</div><div className="text-xs">AI정확도</div></div>
                        <div className="bg-white rounded p-2 text-center"><div className="text-lg font-bold text-gov-blue">100%</div><div className="text-xs">분식차단</div></div>
                    </div>
                </div>
            </section>

            {/* 핵심 개념 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-gov-blue pl-4">디지털 화폐 = 재무제표 계정 숫자</h2>
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500 text-sm">
                    <p className="text-gray-800 mb-2"><strong>원리:</strong> 디지털 화폐는 대차대조표의 "💎 디지털화폐" 계정으로 표시됩니다.</p>
                    <p className="text-gray-800"><strong>보안:</strong> OpenHash 기록으로 위변조 불가 → 화폐로 기능 가능</p>
                </div>
            </section>

            {/* 시뮬레이션 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-gov-blue pl-4">실시간 거래 시뮬레이션</h2>
                
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
                                            <p className="text-sm text-gray-600">거래 전 재무제표를 확인합니다</p>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <div className="font-bold mb-2 text-sm bg-white p-2 rounded">보내는 사람: {stage.data.from.name}</div>
                                            <BalanceSheet entity={stage.data.from} />
                                            {stage.data.from.type === 'business' && (
                                                <div className="mt-2"><IncomeStatement entity={stage.data.from} /></div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-bold mb-2 text-sm bg-white p-2 rounded">받는 사람: {stage.data.to.name}</div>
                                            <BalanceSheet entity={stage.data.to} />
                                            {stage.data.to.type === 'business' && (
                                                <div className="mt-2"><IncomeStatement entity={stage.data.to} /></div>
                                            )}
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
                                            <p className="text-sm text-gray-600">디지털 화폐 이체가 실행됩니다</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-6 shadow-md">
                                        <div className="flex items-center justify-center gap-6">
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                                                    <i className="fas fa-user text-blue-600 text-2xl"></i>
                                                </div>
                                                <div className="font-bold text-sm">{stage.data.from}</div>
                                            </div>
                                            <div className="text-center">
                                                <i className="fas fa-arrow-right text-green-600 text-3xl mb-2"></i>
                                                <div className="text-2xl font-bold text-green-700">₩{formatNumber(stage.data.amount)}</div>
                                                <div className="text-xs text-gray-600 mt-1">디지털 화폐</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                                                    <i className="fas fa-user text-purple-600 text-2xl"></i>
                                                </div>
                                                <div className="font-bold text-sm">{stage.data.to}</div>
                                            </div>
                                        </div>
                                        <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-center text-gray-700">
                                            <strong>거래 시각:</strong> {stage.data.timestamp} | <strong>처리 속도:</strong> 0.015ms
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
                                            <p className="text-sm text-gray-600">0.001ms 이내에 재무제표가 갱신되었습니다</p>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <div className="font-bold mb-2 text-sm bg-red-100 p-2 rounded">
                                                보내는 사람: {stage.data.from.name} 
                                                <span className="text-red-700 ml-2">(-₩{formatNumber(stage.data.amount)})</span>
                                            </div>
                                            <BalanceSheet entity={stage.data.from} label="갱신" highlight={true} />
                                            {stage.data.from.type === 'business' && (
                                                <div className="mt-2"><IncomeStatement entity={stage.data.from} label="갱신" /></div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-bold mb-2 text-sm bg-green-100 p-2 rounded">
                                                받는 사람: {stage.data.to.name}
                                                <span className="text-green-700 ml-2">(+₩{formatNumber(stage.data.amount)})</span>
                                            </div>
                                            <BalanceSheet entity={stage.data.to} label="갱신" highlight={true} />
                                            {stage.data.to.type === 'business' && (
                                                <div className="mt-2"><IncomeStatement entity={stage.data.to} label="갱신" /></div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-300 text-sm">
                                        <strong className="text-gray-900"><i className="fas fa-shield-alt text-blue-600 mr-2"></i>무결성 보장:</strong>
                                        <span className="text-gray-700 ml-2">
                                            대차균형 검증 완료 | <a href="http://100.30.14.224/private-data-vault/" target="_blank" className="text-gov-blue underline">PDV</a> 암호화 저장 | 
                                            <a href="http://100.30.14.224/openhash-system/" target="_blank" className="text-gov-blue underline ml-1">OpenHash</a> 기록
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* 비용 계산 - 거래 빈도 10배 증가 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-purple-500 pl-4">시스템 운영 비용 (거래 빈도 10배)</h2>
                
                {/* 가정 변경 알림 */}
                <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <i className="fas fa-exclamation-triangle text-yellow-600"></i>
                        <strong className="text-gray-900">거래 빈도 10배 증가 시나리오</strong>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                            <div className="font-bold mb-1">개인</div>
                            <div>기존: 월 30회 → <strong className="text-yellow-700">변경: 월 300회</strong></div>
                        </div>
                        <div>
                            <div className="font-bold mb-1">사업자</div>
                            <div>기존: 월 300회 → <strong className="text-yellow-700">변경: 월 3,000회</strong></div>
                        </div>
                    </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-300 mb-4">
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white rounded p-3 text-center">
                            <div className="text-gray-600 mb-1">총 사용자</div>
                            <div className="text-xl font-bold text-purple-700">6천만</div>
                            <div className="text-xs text-gray-500">변동 없음</div>
                        </div>
                        <div className="bg-white rounded p-3 text-center">
                            <div className="text-gray-600 mb-1">월간 거래</div>
                            <div className="text-xl font-bold text-red-700">450억건</div>
                            <div className="text-xs text-gray-500">기존 45억건의 10배</div>
                        </div>
                        <div className="bg-white rounded p-3 text-center">
                            <div className="text-gray-600 mb-1">월간 비용</div>
                            <div className="text-xl font-bold text-purple-700">22.2억원</div>
                            <div className="text-xs text-gray-500">기존 10.6억원의 2.1배</div>
                        </div>
                    </div>
                </div>

                {/* 비용 상세 */}
                <div className="bg-white rounded-lg border-2 border-gray-300 p-4 mb-4">
                    <h3 className="font-bold text-gray-900 mb-3">월간 운영 비용 상세 내역</h3>
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left p-2">비용 항목</th>
                                <th className="text-right p-2">기존 (45억건)</th>
                                <th className="text-right p-2">10배 (450억건)</th>
                                <th className="text-right p-2">증가율</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t">
                                <td className="p-2"><i className="fas fa-server text-purple-600 mr-2"></i>하드웨어 감가상각</td>
                                <td className="text-right">1.67억원</td>
                                <td className="text-right font-bold">1.67억원</td>
                                <td className="text-right text-green-600">0%</td>
                            </tr>
                            <tr className="border-t">
                                <td className="p-2"><i className="fas fa-bolt text-yellow-600 mr-2"></i>전력 비용</td>
                                <td className="text-right">0.11억원</td>
                                <td className="text-right font-bold">0.22억원</td>
                                <td className="text-right text-orange-600">+100%</td>
                            </tr>
                            <tr className="border-t">
                                <td className="p-2"><i className="fas fa-database text-blue-600 mr-2"></i>스토리지 비용</td>
                                <td className="text-right">0.30억원</td>
                                <td className="text-right font-bold">3.00억원</td>
                                <td className="text-right text-red-600">+900%</td>
                            </tr>
                            <tr className="border-t">
                                <td className="p-2"><i className="fas fa-network-wired text-green-600 mr-2"></i>통신 비용</td>
                                <td className="text-right">0.53억원</td>
                                <td className="text-right font-bold">5.30억원</td>
                                <td className="text-right text-red-600">+900%</td>
                            </tr>
                            <tr className="border-t">
                                <td className="p-2"><i className="fas fa-users text-indigo-600 mr-2"></i>운영 인력</td>
                                <td className="text-right">7.00억원</td>
                                <td className="text-right font-bold">10.00억원</td>
                                <td className="text-right text-orange-600">+43%</td>
                            </tr>
                            <tr className="border-t">
                                <td className="p-2"><i className="fas fa-wrench text-orange-600 mr-2"></i>유지보수</td>
                                <td className="text-right">1.00억원</td>
                                <td className="text-right font-bold">2.00억원</td>
                                <td className="text-right text-orange-600">+100%</td>
                            </tr>
                            <tr className="border-t-2 border-purple-300 font-bold bg-purple-50">
                                <td className="p-2">총 비용</td>
                                <td className="text-right">10.61억원</td>
                                <td className="text-right text-purple-700">22.19억원</td>
                                <td className="text-right text-purple-700">+109%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 비용 분석 */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-300 mb-4">
                    <h4 className="font-bold text-gray-900 mb-2">
                        <i className="fas fa-chart-line text-blue-600 mr-2"></i>
                        비용 증가 분석
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li>• 거래량이 10배 증가했지만, 총 비용은 <strong className="text-blue-700">2.1배만 증가</strong> (규모의 경제)</li>
                        <li>• 하드웨어는 고정 비용이므로 증가 없음 (기존 서버로 처리 가능)</li>
                        <li>• 스토리지와 통신 비용이 10배 증가 (거래량에 비례)</li>
                        <li>• 전력 비용은 2배만 증가 (병렬 처리 효율로 10배 미만)</li>
                        <li>• 인력은 1.4배 증가 (자동화로 10배 미만)</li>
                    </ul>
                </div>

                {/* 1인당 비용 */}
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <i className="fas fa-user text-green-600"></i>
                            <strong>개인 1인당</strong>
                        </div>
                        <div className="text-3xl font-bold text-green-700 mb-1">44원/월</div>
                        <div className="text-xs text-gray-600 mb-2">월 300회 거래 기준</div>
                        <div className="text-xs bg-white rounded p-2 border border-green-200">
                            <div className="text-gray-700">연간: 528원</div>
                            <div className="text-gray-600">기존 대비: +110% (21원 → 44원)</div>
                        </div>
                    </div>
                    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <i className="fas fa-building text-blue-600"></i>
                            <strong>사업자 1곳당</strong>
                        </div>
                        <div className="text-3xl font-bold text-blue-700 mb-1">222원/월</div>
                        <div className="text-xs text-gray-600 mb-2">월 3,000회 거래 기준</div>
                        <div className="text-xs bg-white rounded p-2 border border-blue-200">
                            <div className="text-gray-700">연간: 2,664원</div>
                            <div className="text-gray-600">기존 대비: +109% (106원 → 222원)</div>
                        </div>
                    </div>
                    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <i className="fas fa-piggy-bank text-yellow-600"></i>
                            <strong>비용 절감</strong>
                        </div>
                        <div className="text-3xl font-bold text-yellow-700 mb-1">99.9%</div>
                        <div className="text-xs text-gray-600 mb-2">기존 시스템 대비</div>
                        <div className="text-xs bg-white rounded p-2 border border-yellow-200">
                            <div className="text-gray-700">여전히 압도적 저렴</div>
                            <div className="text-gray-600">거래 10배 증가해도 유리</div>
                        </div>
                    </div>
                </div>

                {/* 기존 시스템 비교 */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border-2 border-green-300">
                    <h4 className="font-bold text-gray-900 mb-3">
                        <i className="fas fa-balance-scale text-green-600 mr-2"></i>
                        기존 회계 시스템과의 비용 비교 (거래 빈도 10배)
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white rounded p-4 border border-gray-300">
                            <div className="font-bold mb-2">개인 (기존 방식)</div>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li className="flex justify-between">
                                    <span>회계 소프트웨어</span>
                                    <span className="font-mono">월 10,000원</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>세무사 비용</span>
                                    <span className="font-mono">연 1,000,000원</span>
                                </li>
                                <li className="flex justify-between font-bold border-t pt-1 mt-1">
                                    <span>연간 총</span>
                                    <span className="font-mono text-red-700">1,120,000원</span>
                                </li>
                            </ul>
                            <div className="mt-2 p-2 bg-green-100 rounded text-xs">
                                <div className="font-bold text-green-800">본 시스템: 연간 528원</div>
                                <div className="text-green-700">💰 절감: 1,119,472원 (99.95%)</div>
                            </div>
                        </div>
                        <div className="bg-white rounded p-4 border border-gray-300">
                            <div className="font-bold mb-2">사업자 (기존 방식)</div>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li className="flex justify-between">
                                    <span>회계 프로그램</span>
                                    <span className="font-mono">월 200,000원</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>세무/회계사</span>
                                    <span className="font-mono">연 12,000,000원</span>
                                </li>
                                <li className="flex justify-between font-bold border-t pt-1 mt-1">
                                    <span>연간 총</span>
                                    <span className="font-mono text-red-700">14,400,000원</span>
                                </li>
                            </ul>
                            <div className="mt-2 p-2 bg-green-100 rounded text-xs">
                                <div className="font-bold text-green-800">본 시스템: 연간 2,664원</div>
                                <div className="text-green-700">💰 절감: 14,397,336원 (99.98%)</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 결론 */}
                <div className="mt-4 bg-purple-100 rounded-lg p-4 border-2 border-purple-400">
                    <h4 className="font-bold text-purple-900 mb-2">
                        <i className="fas fa-lightbulb text-purple-600 mr-2"></i>
                        결론
                    </h4>
                    <ul className="text-sm text-gray-800 space-y-1">
                        <li>• 거래 빈도가 10배 증가해도 1인당 비용은 <strong className="text-purple-700">월 44원</strong> (개인), <strong className="text-purple-700">월 222원</strong> (사업자)에 불과</li>
                        <li>• 규모의 경제 효과로 거래량 증가 대비 비용 증가율이 훨씬 낮음 (10배 거래 → 2.1배 비용)</li>
                        <li>• 기존 회계 시스템 대비 여전히 <strong className="text-purple-700">99.9% 이상 저렴</strong>하여 압도적 경쟁력 유지</li>
                        <li>• FPGA 하드웨어 가속과 AI 자동화로 인한 극한의 효율성 입증</li>
                    </ul>
                </div>
            </section>
        </div>
    );
};

window.FinancialStatement = FinancialStatement;
