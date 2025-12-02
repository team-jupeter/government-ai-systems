const CreditRating = () => {
    const [selectedTab, setSelectedTab] = React.useState('system');
    const [expandedSection, setExpandedSection] = React.useState(null);

    // 신용등급 기준
    const creditGrades = [
        { grade: 'AAA', range: '950-1000', rate: '2.5-3.2%', limit: '무제한', color: 'purple' },
        { grade: 'AA', range: '900-949', rate: '3.2-4.1%', limit: '5억원', color: 'blue' },
        { grade: 'A', range: '850-899', rate: '4.1-5.5%', limit: '3억원', color: 'green' },
        { grade: 'BBB', range: '800-849', rate: '5.5-7.2%', limit: '2억원', color: 'yellow' },
        { grade: 'BB', range: '750-799', rate: '7.2-9.5%', limit: '1억원', color: 'orange' },
        { grade: 'B', range: '700-749', rate: '9.5-12.8%', limit: '5천만원', color: 'red' },
        { grade: 'CCC 이하', range: '0-699', rate: '12.8%+', limit: '1천만원', color: 'gray' }
    ];

    // 개인 샘플: 김민수
    const individualSample = {
        name: '김민수',
        type: '개인',
        creditScore: 885,
        creditGrade: 'A',
        creditAsset: 280000000,
        financialStatement: {
            assets: {
                total: 450000000,
                cash: 85000000,
                digitalCurrency: 65000000,
                realEstate: 280000000,
                securities: 20000000
            },
            liabilities: {
                total: 120000000,
                mortgage: 100000000,
                creditCard: 15000000,
                etc: 5000000
            },
            equity: 330000000,
            income: {
                salary: 72000000,
                business: 0,
                investment: 8000000
            },
            expenses: {
                living: 36000000,
                loan: 12000000,
                etc: 6000000
            }
        }
    };

    // 사업자 샘플: 테크스타트(주)
    const businessSample = {
        name: '테크스타트(주)',
        type: '사업자',
        businessNumber: '123-81-45678',
        creditScore: 920,
        creditGrade: 'AA',
        creditAsset: 480000000,
        financialStatement: {
            assets: {
                total: 1850000000,
                cash: 320000000,
                digitalCurrency: 180000000,
                accountsReceivable: 420000000,
                inventory: 280000000,
                equipment: 480000000,
                intangible: 170000000
            },
            liabilities: {
                total: 720000000,
                accountsPayable: 180000000,
                shortTermLoan: 240000000,
                longTermLoan: 280000000,
                etc: 20000000
            },
            equity: 1130000000,
            revenue: 2400000000,
            operatingProfit: 380000000,
            netProfit: 285000000
        }
    };

    return (
        <div className="space-y-6 animate-slideDown">
            {/* 헤더 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <i className="fas fa-chart-line text-purple-600 text-3xl"></i>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">오픈해시 신용평가 AI</h1>
                        <p className="text-gray-600">6천만 재무제표 기반 실시간 상대평가 시스템</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 mb-1">6,000만</div>
                        <div className="text-sm text-gray-600">평가 대상</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 mb-1">0.015ms</div>
                        <div className="text-sm text-gray-600">평가 속도</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 mb-1">실시간</div>
                        <div className="text-sm text-gray-600">신용자산 갱신</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600 mb-1">100%</div>
                        <div className="text-sm text-gray-600">위변조 방지</div>
                    </div>
                </div>
            </div>

            {/* 탭 전환 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex border-b border-gray-200">
                    <button
                        onClick={() => setSelectedTab('system')}
                        className={`flex-1 px-6 py-3 font-medium transition-colors ${
                            selectedTab === 'system'
                                ? 'text-bank-blue border-b-2 border-bank-blue'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        평가 시스템
                    </button>
                    <button
                        onClick={() => setSelectedTab('individual')}
                        className={`flex-1 px-6 py-3 font-medium transition-colors ${
                            selectedTab === 'individual'
                                ? 'text-bank-blue border-b-2 border-bank-blue'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        개인 예시
                    </button>
                    <button
                        onClick={() => setSelectedTab('business')}
                        className={`flex-1 px-6 py-3 font-medium transition-colors ${
                            selectedTab === 'business'
                                ? 'text-bank-blue border-b-2 border-bank-blue'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        사업자 예시
                    </button>
                </div>

                <div className="p-6">
                    {/* 평가 시스템 */}
                    {selectedTab === 'system' && (
                        <div className="space-y-6">
                            {/* 6천만 재무제표 기반 */}
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                                <h2 className="text-xl font-bold mb-4 text-gray-900">6천만 재무제표 기반 신용평가</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-bold mb-3 flex items-center gap-2">
                                            <i className="fas fa-users text-blue-600"></i>
                                            평가 대상
                                        </h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="bg-white p-3 rounded border border-gray-200">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700">개인</span>
                                                    <span className="font-bold text-blue-600">5,000만 명</span>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">한국 전체 인구</div>
                                            </div>
                                            <div className="bg-white p-3 rounded border border-gray-200">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700">사업자</span>
                                                    <span className="font-bold text-purple-600">1,000만 개</span>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">개인사업자 + 법인</div>
                                            </div>
                                            <div className="bg-white p-3 rounded border border-green-200">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold text-gray-900">합계</span>
                                                    <span className="font-bold text-green-600">6,000만</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-bold mb-3 flex items-center gap-2">
                                            <i className="fas fa-file-alt text-purple-600"></i>
                                            재무제표 구성
                                        </h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="bg-white p-2 rounded border border-gray-200">
                                                <i className="fas fa-check text-green-600 mr-2"></i>
                                                손익계산서 (Income Statement)
                                            </div>
                                            <div className="bg-white p-2 rounded border border-gray-200">
                                                <i className="fas fa-check text-green-600 mr-2"></i>
                                                대차대조표 (Balance Sheet)
                                            </div>
                                            <div className="bg-white p-2 rounded border border-gray-200">
                                                <i className="fas fa-check text-green-600 mr-2"></i>
                                                현금흐름표 (Cash Flow)
                                            </div>
                                            <div className="bg-white p-2 rounded border border-gray-200">
                                                <i className="fas fa-check text-green-600 mr-2"></i>
                                                지분변동표 (Equity Statement)
                                            </div>
                                            <div className="bg-white p-2 rounded border border-gray-200">
                                                <i className="fas fa-check text-green-600 mr-2"></i>
                                                이익잉여금처분계산서
                                            </div>
                                            <div className="bg-white p-2 rounded border border-gray-200">
                                                <i className="fas fa-check text-green-600 mr-2"></i>
                                                재무분석보고서 (Financial Reports)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 오픈해시 상호연동 불변성 */}
                            <div className="bg-white rounded-lg border-2 border-purple-200 p-6">
                                <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                                    <i className="fas fa-link text-purple-600"></i>
                                    오픈해시 상호연동 불변성
                                </h2>
                                <p className="text-gray-700 mb-4 leading-relaxed">
                                    6천만 개의 재무제표는 <strong className="text-purple-600">오픈해시 4계층 구조</strong>로 기록되며, 
                                    모든 재무제표가 <strong className="text-blue-600">상호 연동</strong>되어 있습니다. 
                                    한 재무제표를 위변조하려면 연동된 모든 재무제표를 동시에 변조해야 하므로, 
                                    <strong className="text-green-600">수학적으로 위변조가 불가능</strong>합니다.
                                </p>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                                        <div className="text-3xl mb-2">🔗</div>
                                        <div className="font-bold mb-1">상호 연동</div>
                                        <div className="text-xs text-gray-600">6천만 재무제표 실시간 검증</div>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                                        <div className="text-3xl mb-2">🛡️</div>
                                        <div className="font-bold mb-1">위변조 불가</div>
                                        <div className="text-xs text-gray-600">오픈해시 4계층 기록</div>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg text-center">
                                        <div className="text-3xl mb-2">✅</div>
                                        <div className="font-bold mb-1">신뢰성 100%</div>
                                        <div className="text-xs text-gray-600">이상적 신용평가 기초</div>
                                    </div>
                                </div>
                            </div>

                            {/* 신용등급 체계 */}
                            <div>
                                <h2 className="text-xl font-bold mb-4 text-gray-900">신용등급 체계</h2>
                                <div className="space-y-2">
                                    {creditGrades.map((grade, idx) => (
                                        <div key={idx} className={`border-2 border-${grade.color}-200 rounded-lg p-4 bg-${grade.color}-50`}>
                                            <div className="grid md:grid-cols-4 gap-4 items-center">
                                                <div className="text-center">
                                                    <div className={`text-2xl font-bold text-${grade.color}-600`}>{grade.grade}</div>
                                                    <div className="text-xs text-gray-600">신용등급</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="font-bold text-gray-900">{grade.range}</div>
                                                    <div className="text-xs text-gray-600">신용점수</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="font-bold text-gray-900">{grade.rate}</div>
                                                    <div className="text-xs text-gray-600">대출금리</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="font-bold text-gray-900">{grade.limit}</div>
                                                    <div className="text-xs text-gray-600">대출한도</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 신용자산 개념 */}
                            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
                                <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                                    <i className="fas fa-coins text-green-600"></i>
                                    신용자산 (Credit Asset)
                                </h2>
                                <p className="text-gray-700 mb-4 leading-relaxed">
                                    신용등급에 따라 <strong className="text-blue-600">실시간으로 대출 가능금액</strong>이 결정되며, 
                                    이는 개인 및 사업자 재무제표의 <strong className="text-green-600">"신용자산"</strong> 항목에 표시됩니다. 
                                    신용자산은 재무제표가 갱신될 때마다 자동으로 재계산됩니다.
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                                        <h3 className="font-bold mb-2">계산 방식</h3>
                                        <div className="text-sm text-gray-700 space-y-1">
                                            <div>• 총자산, 부채비율 분석</div>
                                            <div>• 소득 안정성 평가</div>
                                            <div>• 현금흐름 건전성 검토</div>
                                            <div>• 6천만 재무제표 상대평가</div>
                                        </div>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                                        <h3 className="font-bold mb-2">갱신 주기</h3>
                                        <div className="text-sm text-gray-700 space-y-1">
                                            <div>• 거래 발생 시: 즉시 (0.015ms)</div>
                                            <div>• 소득 변동 시: 실시간</div>
                                            <div>• 자산 변동 시: 실시간</div>
                                            <div>• 정기 재평가: 매일 자정</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 개인 예시 */}
                    {selectedTab === 'individual' && (
                        <div className="space-y-6">
                            {/* 기본 정보 */}
                            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{individualSample.name}</h2>
                                        <p className="text-gray-600">{individualSample.type} | IT 기업 재직 중</p>
                                    </div>
                                    <div className="text-right">
                                        <div className={`inline-block px-6 py-3 bg-green-600 text-white rounded-lg text-3xl font-bold`}>
                                            {individualSample.creditGrade}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">신용등급</div>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-white p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-blue-600">{individualSample.creditScore}</div>
                                        <div className="text-sm text-gray-600">신용점수</div>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-green-600">
                                            {(individualSample.creditAsset / 100000000).toFixed(1)}억원
                                        </div>
                                        <div className="text-sm text-gray-600">신용자산 (대출한도)</div>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-purple-600">4.1-5.5%</div>
                                        <div className="text-sm text-gray-600">적용 금리</div>
                                    </div>
                                </div>
                            </div>

                            {/* 재무제표 */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* 자산 */}
                                <div className="bg-white rounded-lg border border-gray-200 p-5">
                                    <h3 className="font-bold text-lg mb-4 text-blue-600 flex items-center gap-2">
                                        <i className="fas fa-coins"></i>
                                        자산 (Assets)
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-gray-700">현금 및 예금</span>
                                            <span className="font-bold">{(individualSample.financialStatement.assets.cash / 10000).toLocaleString()}만원</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-gray-700">디지털 화폐</span>
                                            <span className="font-bold">{(individualSample.financialStatement.assets.digitalCurrency / 10000).toLocaleString()}만원</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-gray-700">부동산</span>
                                            <span className="font-bold">{(individualSample.financialStatement.assets.realEstate / 10000).toLocaleString()}만원</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-gray-700">유가증권</span>
                                            <span className="font-bold">{(individualSample.financialStatement.assets.securities / 10000).toLocaleString()}만원</span>
                                        </div>
                                        <div className="flex justify-between py-3 bg-blue-50 px-2 rounded mt-2">
                                            <span className="font-bold text-gray-900">총 자산</span>
                                            <span className="font-bold text-blue-600">{(individualSample.financialStatement.assets.total / 10000).toLocaleString()}만원</span>
                                        </div>
                                        <div className="flex justify-between py-3 bg-green-50 px-2 rounded border-2 border-green-300">
                                            <span className="font-bold text-gray-900">💎 신용자산</span>
                                            <span className="font-bold text-green-600">{(individualSample.creditAsset / 10000).toLocaleString()}만원</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 부채 및 자본 */}
                                <div className="bg-white rounded-lg border border-gray-200 p-5">
                                    <h3 className="font-bold text-lg mb-4 text-red-600 flex items-center gap-2">
                                        <i className="fas fa-credit-card"></i>
                                        부채 및 자본
                                    </h3>
                                    <div className="space-y-2 text-sm mb-4">
                                        <div className="font-bold text-gray-700 mb-2">부채 (Liabilities)</div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-gray-700">주택담보대출</span>
                                            <span className="font-bold">{(individualSample.financialStatement.liabilities.mortgage / 10000).toLocaleString()}만원</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-gray-700">신용카드</span>
                                            <span className="font-bold">{(individualSample.financialStatement.liabilities.creditCard / 10000).toLocaleString()}만원</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-gray-700">기타 부채</span>
                                            <span className="font-bold">{(individualSample.financialStatement.liabilities.etc / 10000).toLocaleString()}만원</span>
                                        </div>
                                        <div className="flex justify-between py-3 bg-red-50 px-2 rounded">
                                            <span className="font-bold text-gray-900">총 부채</span>
                                            <span className="font-bold text-red-600">{(individualSample.financialStatement.liabilities.total / 10000).toLocaleString()}만원</span>
                                        </div>
                                    </div>
                                    <div className="border-t-2 border-gray-300 pt-4">
                                        <div className="flex justify-between py-3 bg-green-50 px-2 rounded">
                                            <span className="font-bold text-gray-900">순자산 (자본)</span>
                                            <span className="font-bold text-green-600">{(individualSample.financialStatement.equity / 10000).toLocaleString()}만원</span>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-2 text-center">
                                            총자산 = 총부채 + 순자산 (대차균형)
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 손익 정보 */}
                            <div className="bg-white rounded-lg border border-gray-200 p-5">
                                <h3 className="font-bold text-lg mb-4 text-purple-600 flex items-center gap-2">
                                    <i className="fas fa-chart-line"></i>
                                    연간 소득 및 지출
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <div className="font-bold text-gray-700 mb-3">소득 (Income)</div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-gray-700">급여 소득</span>
                                                <span className="font-bold">{(individualSample.financialStatement.income.salary / 10000).toLocaleString()}만원</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-gray-700">투자 소득</span>
                                                <span className="font-bold">{(individualSample.financialStatement.income.investment / 10000).toLocaleString()}만원</span>
                                            </div>
                                            <div className="flex justify-between py-3 bg-green-50 px-2 rounded">
                                                <span className="font-bold text-gray-900">총 소득</span>
                                                <span className="font-bold text-green-600">{((individualSample.financialStatement.income.salary + individualSample.financialStatement.income.investment) / 10000).toLocaleString()}만원</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-700 mb-3">지출 (Expenses)</div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-gray-700">생활비</span>
                                                <span className="font-bold">{(individualSample.financialStatement.expenses.living / 10000).toLocaleString()}만원</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-gray-700">대출상환</span>
                                                <span className="font-bold">{(individualSample.financialStatement.expenses.loan / 10000).toLocaleString()}만원</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-gray-700">기타 지출</span>
                                                <span className="font-bold">{(individualSample.financialStatement.expenses.etc / 10000).toLocaleString()}만원</span>
                                            </div>
                                            <div className="flex justify-between py-3 bg-red-50 px-2 rounded">
                                                <span className="font-bold text-gray-900">총 지출</span>
                                                <span className="font-bold text-red-600">{((individualSample.financialStatement.expenses.living + individualSample.financialStatement.expenses.loan + individualSample.financialStatement.expenses.etc) / 10000).toLocaleString()}만원</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 사업자 예시 */}
                    {selectedTab === 'business' && (
                        <div className="space-y-6">
                            {/* 기본 정보 */}
                            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{businessSample.name}</h2>
                                        <p className="text-gray-600">{businessSample.type} | 사업자등록번호: {businessSample.businessNumber}</p>
                                        <p className="text-sm text-gray-500 mt-1">AI 솔루션 개발 및 공급</p>
                                    </div>
                                    <div className="text-right">
                                        <div className={`inline-block px-6 py-3 bg-blue-600 text-white rounded-lg text-3xl font-bold`}>
                                            {businessSample.creditGrade}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">신용등급</div>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-white p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-purple-600">{businessSample.creditScore}</div>
                                        <div className="text-sm text-gray-600">신용점수</div>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-green-600">
                                            {(businessSample.creditAsset / 100000000).toFixed(1)}억원
                                        </div>
                                        <div className="text-sm text-gray-600">신용자산 (대출한도)</div>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg text-center">
                                        <div className="text-2xl font-bold text-blue-600">3.2-4.1%</div>
                                        <div className="text-sm text-gray-600">적용 금리</div>
                                    </div>
                                </div>
                            </div>

                            {/* 재무상태표 */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* 자산 */}
                                <div className="bg-white rounded-lg border border-gray-200 p-5">
                                    <h3 className="font-bold text-lg mb-4 text-blue-600 flex items-center gap-2">
                                        <i className="fas fa-building"></i>
                                        자산 (Assets)
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-gray-700">현금 및 예금</span>
                                            <span className="font-bold">{(businessSample.financialStatement.assets.cash / 100000000).toFixed(1)}억</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-gray-700">디지털 화폐</span>
                                            <span className="font-bold">{(businessSample.financialStatement.assets.digitalCurrency / 100000000).toFixed(1)}억</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-gray-700">매출채권</span>
                                            <span className="font-bold">{(businessSample.financialStatement.assets.accountsReceivable / 100000000).toFixed(1)}억</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-gray-700">재고자산</span>
                                            <span className="font-bold">{(businessSample.financialStatement.assets.inventory / 100000000).toFixed(1)}억</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-gray-700">유형자산</span>
                                            <span className="font-bold">{(businessSample.financialStatement.assets.equipment / 100000000).toFixed(1)}억</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-gray-700">무형자산</span>
                                            <span className="font-bold">{(businessSample.financialStatement.assets.intangible / 100000000).toFixed(1)}억</span>
                                        </div>
                                        <div className="flex justify-between py-3 bg-blue-50 px-2 rounded mt-2">
                                            <span className="font-bold text-gray-900">총 자산</span>
                                            <span className="font-bold text-blue-600">{(businessSample.financialStatement.assets.total / 100000000).toFixed(1)}억원</span>
                                        </div>
                                        <div className="flex justify-between py-3 bg-green-50 px-2 rounded border-2 border-green-300">
                                            <span className="font-bold text-gray-900">💎 신용자산</span>
                                            <span className="font-bold text-green-600">{(businessSample.creditAsset / 100000000).toFixed(1)}억원</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 부채 및 자본 */}
                                <div className="bg-white rounded-lg border border-gray-200 p-5">
                                    <h3 className="font-bold text-lg mb-4 text-red-600 flex items-center gap-2">
                                        <i className="fas fa-file-invoice-dollar"></i>
                                        부채 및 자본
                                    </h3>
                                    <div className="space-y-2 text-sm mb-4">
                                        <div className="font-bold text-gray-700 mb-2">부채 (Liabilities)</div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-gray-700">매입채무</span>
                                            <span className="font-bold">{(businessSample.financialStatement.liabilities.accountsPayable / 100000000).toFixed(1)}억</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-gray-700">단기차입금</span>
                                            <span className="font-bold">{(businessSample.financialStatement.liabilities.shortTermLoan / 100000000).toFixed(1)}억</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-gray-700">장기차입금</span>
                                            <span className="font-bold">{(businessSample.financialStatement.liabilities.longTermLoan / 100000000).toFixed(1)}억</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="text-gray-700">기타 부채</span>
                                            <span className="font-bold">{(businessSample.financialStatement.liabilities.etc / 100000000).toFixed(1)}억</span>
                                        </div>
                                        <div className="flex justify-between py-3 bg-red-50 px-2 rounded">
                                            <span className="font-bold text-gray-900">총 부채</span>
                                            <span className="font-bold text-red-600">{(businessSample.financialStatement.liabilities.total / 100000000).toFixed(1)}억원</span>
                                        </div>
                                    </div>
                                    <div className="border-t-2 border-gray-300 pt-4">
                                        <div className="flex justify-between py-3 bg-green-50 px-2 rounded">
                                            <span className="font-bold text-gray-900">자본총계</span>
                                            <span className="font-bold text-green-600">{(businessSample.financialStatement.equity / 100000000).toFixed(1)}억원</span>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-2 text-center">
                                            자산총계 = 부채총계 + 자본총계
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 손익계산서 */}
                            <div className="bg-white rounded-lg border border-gray-200 p-5">
                                <h3 className="font-bold text-lg mb-4 text-purple-600 flex items-center gap-2">
                                    <i className="fas fa-chart-bar"></i>
                                    손익계산서 (연간)
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between py-3 bg-blue-50 px-4 rounded">
                                        <span className="font-bold text-gray-900">매출액</span>
                                        <span className="font-bold text-blue-600">{(businessSample.financialStatement.revenue / 100000000).toFixed(1)}억원</span>
                                    </div>
                                    <div className="flex justify-between py-3 bg-green-50 px-4 rounded">
                                        <span className="font-bold text-gray-900">영업이익</span>
                                        <span className="font-bold text-green-600">{(businessSample.financialStatement.operatingProfit / 100000000).toFixed(1)}억원</span>
                                    </div>
                                    <div className="flex justify-between py-3 bg-purple-50 px-4 rounded border-2 border-purple-300">
                                        <span className="font-bold text-gray-900">당기순이익</span>
                                        <span className="font-bold text-purple-600">{(businessSample.financialStatement.netProfit / 100000000).toFixed(1)}억원</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 mt-4 text-center text-sm">
                                        <div className="bg-gray-50 p-3 rounded">
                                            <div className="text-gray-600 mb-1">영업이익률</div>
                                            <div className="font-bold text-green-600">
                                                {((businessSample.financialStatement.operatingProfit / businessSample.financialStatement.revenue) * 100).toFixed(1)}%
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded">
                                            <div className="text-gray-600 mb-1">순이익률</div>
                                            <div className="font-bold text-purple-600">
                                                {((businessSample.financialStatement.netProfit / businessSample.financialStatement.revenue) * 100).toFixed(1)}%
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded">
                                            <div className="text-gray-600 mb-1">부채비율</div>
                                            <div className="font-bold text-blue-600">
                                                {((businessSample.financialStatement.liabilities.total / businessSample.financialStatement.equity) * 100).toFixed(1)}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
