// 통합 금융 컴포넌트
const IntegratedFinance = () => {
    const [expandedService, setExpandedService] = React.useState(null);

    // 금융 서비스 상세 정보
    const financialServices = {
        bank: {
            title: '디지털 은행',
            icon: 'university',
            color: 'blue',
            description: '디지털 화폐 자체가 은행 계좌이자 결제 수단으로 기능합니다.',
            url: 'http://100.30.14.224/digital-bank/',
            status: 'coming-soon',
            mechanisms: [
                {
                    subtitle: '1. 계좌 = 재무제표',
                    content: '모든 개인과 사업자의 재무제표가 곧 은행 계좌입니다. 별도의 계좌 개설이 필요 없으며, 재무제표의 "디지털화폐" 계정이 잔액을 나타냅니다.'
                },
                {
                    subtitle: '2. 송금 = 재무제표 갱신',
                    content: '송금은 두 당사자의 재무제표를 동시에 갱신하는 것입니다. 0.001ms 이내에 처리되며, 수수료는 0원입니다.'
                },
                {
                    subtitle: '3. 대출 = 스마트 계약',
                    content: '대출은 스마트 계약으로 자동 실행됩니다. AI가 신용도를 평가하고, 이자율을 자동 계산하며, 상환도 자동으로 처리됩니다.'
                },
                {
                    subtitle: '4. 예금 이자 = 시스템 수익 배당',
                    content: '시스템 운영 수익을 모든 사용자에게 비례 배분합니다. 별도의 예금 상품 없이 자동으로 이자가 적립됩니다.'
                }
            ],
            benefits: [
                '계좌 개설 불필요 (재무제표 = 계좌)',
                '송금 수수료 0원',
                '실시간 송금 (0.001ms)',
                '24시간 무중단 서비스',
                '지점 방문 불필요'
            ],
            comparison: {
                traditional: '은행 방문, 서류 제출, 계좌 개설 (1시간+)',
                digital: '재무제표 자동 생성 (즉시)'
            }
        },
        insurance: {
            title: '디지털 보험',
            icon: 'shield-alt',
            color: 'green',
            description: '스마트 계약 기반으로 보험 가입부터 보험금 지급까지 자동화됩니다.',
            url: 'http://100.30.14.224/digital-insurance/',
            status: 'coming-soon',
            mechanisms: [
                {
                    subtitle: '1. AI 기반 리스크 평가',
                    content: '가입자의 재무제표, 건강 데이터, 생활 패턴을 AI가 분석하여 정확한 보험료를 산정합니다. 과대/과소 책정이 없습니다.'
                },
                {
                    subtitle: '2. 스마트 계약 자동 실행',
                    content: '보험 조건 충족 시 (예: 병원 진료 기록 확인) 스마트 계약이 자동으로 보험금을 지급합니다. 서류 제출이나 심사가 불필요합니다.'
                },
                {
                    subtitle: '3. 보험금 즉시 지급',
                    content: 'OpenHash에 기록된 증빙 자료(진료 기록, 사고 기록 등)를 실시간 검증하여 0.001ms 이내에 보험금을 지급합니다.'
                },
                {
                    subtitle: '4. 보험 사기 방지',
                    content: '모든 거래와 의료 기록이 재무제표에 연동되어 보험 사기가 원천 차단됩니다. 허위 청구는 AI가 즉시 탐지합니다.'
                }
            ],
            benefits: [
                '가입 즉시 (AI 심사 0.1초)',
                '보험금 즉시 지급 (0.001ms)',
                '서류 제출 불필요',
                '보험 사기 0%',
                '공정한 보험료 (AI 산정)'
            ],
            comparison: {
                traditional: '서류 제출 → 심사 → 승인 (1주일+)',
                digital: 'AI 검증 → 즉시 지급 (0.001ms)'
            }
        },
        securities: {
            title: '디지털 증권',
            icon: 'chart-line',
            color: 'purple',
            description: '주식, 채권 등 모든 증권을 디지털 화폐로 거래하며, 결제가 즉시 완료됩니다.',
            url: 'http://100.30.14.224/digital-securities/',
            status: 'coming-soon',
            mechanisms: [
                {
                    subtitle: '1. 증권 = 재무제표 계정',
                    content: '주식, 채권, 펀드 등 모든 증권은 재무제표의 "투자자산" 계정에 기록됩니다. 별도의 증권 계좌가 불필요합니다.'
                },
                {
                    subtitle: '2. T+0 결제',
                    content: '거래 즉시 결제가 완료됩니다(T+0). 기존의 T+2 제도(거래 후 2일 결제)가 사라지고, 자금과 증권이 동시에 이동합니다.'
                },
                {
                    subtitle: '3. 24시간 거래',
                    content: '디지털 시스템이므로 24시간 365일 거래가 가능합니다. 장 마감 개념이 사라집니다.'
                },
                {
                    subtitle: '4. 소액 분할 거래',
                    content: '1주가 아닌 0.001주 단위로 거래 가능합니다. 고가 주식도 누구나 소액으로 투자할 수 있습니다.'
                }
            ],
            benefits: [
                'T+0 즉시 결제',
                '24시간 거래 가능',
                '소액 분할 투자 (0.001주)',
                '거래 수수료 최소화',
                '증권 계좌 개설 불필요'
            ],
            comparison: {
                traditional: '주문 → T+2 결제 → 출금 가능 (3일)',
                digital: '주문 → 즉시 결제 → 즉시 출금 (0.001ms)'
            }
        },
        exchange: {
            title: '디지털 거래소',
            icon: 'exchange-alt',
            color: 'orange',
            description: '중앙화/탈중앙화 거래소 기능을 통합하여 모든 자산을 자유롭게 교환합니다.',
            url: 'http://100.30.14.224/digital-exchange/',
            status: 'coming-soon',
            mechanisms: [
                {
                    subtitle: '1. 통합 자산 거래소',
                    content: '디지털 화폐, 주식, 채권, 부동산, 상품, 외환 등 모든 자산을 단일 플랫폼에서 거래합니다. 자산 간 교환이 자유롭습니다.'
                },
                {
                    subtitle: '2. AMM (Automated Market Maker)',
                    content: '유동성 풀을 활용한 자동 시장 조성으로 항상 거래가 가능합니다. 호가창 없이도 즉시 매매가 체결됩니다.'
                },
                {
                    subtitle: '3. 원자적 스왑 (Atomic Swap)',
                    content: '두 자산의 교환이 동시에 일어나거나 모두 취소됩니다. 한쪽만 실행되는 위험이 없습니다.'
                },
                {
                    subtitle: '4. 글로벌 유동성',
                    content: '전 세계 모든 거래소와 연결되어 최상의 가격으로 거래합니다. 지역적 가격 차이(Arbitrage)가 사라집니다.'
                }
            ],
            benefits: [
                '모든 자산 단일 플랫폼 거래',
                '24시간 유동성 보장',
                '거래 수수료 최소화',
                '원자적 스왑으로 안전성 보장',
                '글로벌 최적 가격'
            ],
            comparison: {
                traditional: '자산별 거래소 개별 가입 (주식, 코인, 외환 등)',
                digital: '단일 플랫폼에서 모든 자산 거래'
            }
        },
        regulator: {
            title: '디지털 금융감독',
            icon: 'gavel',
            color: 'red',
            description: 'AI가 모든 거래를 실시간 감시하여 불공정 거래를 즉시 탐지하고 차단합니다.',
            url: 'http://100.30.14.224/financial-regulator/',
            status: 'coming-soon',
            mechanisms: [
                {
                    subtitle: '1. 실시간 거래 감시',
                    content: 'AI가 모든 거래를 0.001ms 이내에 분석하여 시세 조종, 내부자 거래, 허위 공시 등을 즉시 탐지합니다.'
                },
                {
                    subtitle: '2. 자동 규제 집행',
                    content: '불공정 거래 탐지 시 거래를 즉시 차단하고, 관련 계좌를 동결하며, 금융감독원에 자동 신고합니다.'
                },
                {
                    subtitle: '3. 완전한 감사 추적',
                    content: '모든 거래가 OpenHash에 기록되어 사후 감사가 완벽합니다. 증거 인멸이 불가능합니다.'
                },
                {
                    subtitle: '4. 예방적 감독',
                    content: 'AI가 위험 패턴을 사전에 탐지하여 금융 위기를 예방합니다. 레버리지 과다, 집중 투자 등을 실시간 모니터링합니다.'
                }
            ],
            benefits: [
                '실시간 감시 (0.001ms)',
                '불공정 거래 즉시 차단',
                '100% 감사 추적 가능',
                '금융 위기 사전 예방',
                '자동 규제 집행'
            ],
            comparison: {
                traditional: '사후 조사 → 증거 수집 → 제재 (수개월~수년)',
                digital: '실시간 탐지 → 즉시 차단 → 자동 신고 (0.001ms)'
            }
        }
    };

    return (
        <div className="space-y-8">
            {/* 개요 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-gov-blue pl-4">통합 금융 시스템</h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border-l-4 border-gov-blue">
                    <p className="text-sm text-gray-800 mb-4">
                        <strong>디지털 화폐는 단순한 결제 수단이 아닙니다.</strong> 은행, 보험, 증권, 거래소, 금융감독 기능을 
                        <strong className="text-purple-700"> 하나의 시스템에 통합</strong>하여, 기존 금융 기관의 역할을 모두 수행합니다.
                        별도의 금융 기관 방문이나 계좌 개설 없이, <strong className="text-blue-700">재무제표만으로 모든 금융 서비스</strong>를 이용할 수 있습니다.
                    </p>
                    <div className="grid grid-cols-5 gap-3">
                        <div className="bg-white rounded-lg p-3 text-center shadow">
                            <i className="fas fa-university text-blue-600 text-2xl mb-2"></i>
                            <div className="text-xs font-bold">은행</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center shadow">
                            <i className="fas fa-shield-alt text-green-600 text-2xl mb-2"></i>
                            <div className="text-xs font-bold">보험</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center shadow">
                            <i className="fas fa-chart-line text-purple-600 text-2xl mb-2"></i>
                            <div className="text-xs font-bold">증권</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center shadow">
                            <i className="fas fa-exchange-alt text-orange-600 text-2xl mb-2"></i>
                            <div className="text-xs font-bold">거래소</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center shadow">
                            <i className="fas fa-gavel text-red-600 text-2xl mb-2"></i>
                            <div className="text-xs font-bold">감독</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 핵심 개념 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-gov-blue pl-4">왜 통합이 가능한가?</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white border-2 border-blue-300 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <i className="fas fa-microchip text-blue-600 text-3xl"></i>
                            <h3 className="font-bold text-gray-900">1. 모두 디지털</h3>
                        </div>
                        <p className="text-sm text-gray-700">
                            은행, 보험, 증권사 모두 이미 디지털 시스템입니다. 디지털 화폐도 디지털 시스템이므로 
                            <strong className="text-blue-700"> API 연동만으로 융합</strong>이 가능합니다.
                        </p>
                    </div>
                    <div className="bg-white border-2 border-green-300 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <i className="fas fa-file-invoice-dollar text-green-600 text-3xl"></i>
                            <h3 className="font-bold text-gray-900">2. 재무제표 = 모든 것</h3>
                        </div>
                        <p className="text-sm text-gray-700">
                            재무제표는 자산, 부채, 수익, 비용을 모두 포함합니다. 
                            <strong className="text-green-700"> 재무제표만 있으면 은행 계좌, 증권 계좌가 불필요</strong>합니다.
                        </p>
                    </div>
                    <div className="bg-white border-2 border-purple-300 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <i className="fas fa-robot text-purple-600 text-3xl"></i>
                            <h3 className="font-bold text-gray-900">3. AI 자동화</h3>
                        </div>
                        <p className="text-sm text-gray-700">
                            AI가 신용 평가, 리스크 관리, 감독을 자동으로 수행합니다. 
                            <strong className="text-purple-700"> 사람의 개입 없이 모든 금융 서비스</strong>가 작동합니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* 금융 서비스 카드 - 아코디언 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-gov-blue pl-4">통합 금융 서비스 (클릭하여 상세 보기)</h2>
                <div className="space-y-4">
                    {Object.keys(financialServices).map((serviceKey) => {
                        const service = financialServices[serviceKey];
                        return (
                            <div key={serviceKey}>
                                <div
                                    onClick={() => setExpandedService(expandedService === serviceKey ? null : serviceKey)}
                                    className={`bg-white border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${
                                        expandedService === serviceKey ? `border-${service.color}-500 shadow-lg` : 'border-gray-300'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-16 h-16 bg-${service.color}-600 rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                                            <i className={`fas fa-${service.icon} text-3xl`}></i>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">{service.title}</h3>
                                            <p className="text-sm text-gray-600">{service.description}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {service.status === 'coming-soon' && (
                                                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                                                    준비 중
                                                </span>
                                            )}
                                            <i className={`fas fa-chevron-${expandedService === serviceKey ? 'up' : 'down'} text-gray-400 text-xl`}></i>
                                        </div>
                                    </div>
                                </div>

                                {/* 상세 내용 - 아코디언 */}
                                {expandedService === serviceKey && (
                                    <div className="mt-2 bg-gray-50 rounded-lg p-6 border-2 border-gray-300 animate-slideDown">
                                        <div className="space-y-6">
                                            {/* 작동 메커니즘 */}
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                    <i className="fas fa-cog text-purple-600"></i>
                                                    작동 메커니즘
                                                </h4>
                                                <div className="space-y-3">
                                                    {service.mechanisms.map((mechanism, idx) => (
                                                        <div key={idx} className="bg-white rounded-lg p-4 border border-gray-300">
                                                            <div className="font-bold text-sm text-gray-900 mb-2">{mechanism.subtitle}</div>
                                                            <p className="text-sm text-gray-700">{mechanism.content}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* 주요 장점 */}
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                    <i className="fas fa-star text-yellow-500"></i>
                                                    주요 장점
                                                </h4>
                                                <div className="grid md:grid-cols-2 gap-3">
                                                    {service.benefits.map((benefit, idx) => (
                                                        <div key={idx} className={`bg-${service.color}-50 border border-${service.color}-300 rounded-lg p-3 flex items-center gap-2`}>
                                                            <i className={`fas fa-check-circle text-${service.color}-600`}></i>
                                                            <span className="text-sm text-gray-800">{benefit}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* 기존 vs 디지털 비교 */}
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                    <i className="fas fa-balance-scale text-blue-600"></i>
                                                    기존 시스템 vs 디지털 시스템
                                                </h4>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <i className="fas fa-times-circle text-red-600"></i>
                                                            <span className="font-bold text-red-700">기존 시스템</span>
                                                        </div>
                                                        <p className="text-sm text-gray-700">{service.comparison.traditional}</p>
                                                    </div>
                                                    <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <i className="fas fa-check-circle text-green-600"></i>
                                                            <span className="font-bold text-green-700">디지털 시스템</span>
                                                        </div>
                                                        <p className="text-sm text-gray-700">{service.comparison.digital}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 서비스 링크 */}
                                            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-4 border-2 border-blue-300">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="font-bold text-gray-900 mb-1">서비스 바로가기</div>
                                                        <div className="text-sm text-gray-600">
                                                            {service.status === 'coming-soon' 
                                                                ? '곧 서비스가 시작됩니다' 
                                                                : '지금 바로 이용하세요'}
                                                        </div>
                                                    </div>
                                                    <a 
                                                        href={service.url} 
                                                        target="_blank"
                                                        className={`px-6 py-3 rounded-lg font-bold transition-all ${
                                                            service.status === 'coming-soon'
                                                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                                                : `bg-${service.color}-600 text-white hover:bg-${service.color}-700`
                                                        }`}
                                                        onClick={(e) => service.status === 'coming-soon' && e.preventDefault()}
                                                    >
                                                        {service.status === 'coming-soon' ? (
                                                            <>
                                                                <i className="fas fa-clock mr-2"></i>
                                                                준비 중
                                                            </>
                                                        ) : (
                                                            <>
                                                                <i className="fas fa-arrow-right mr-2"></i>
                                                                이동하기
                                                            </>
                                                        )}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 통합의 경제적 효과 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-green-500 pl-4">통합의 경제적 효과</h2>
                <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 text-center">
                        <i className="fas fa-won-sign text-green-600 text-4xl mb-3"></i>
                        <div className="text-3xl font-bold text-green-700 mb-2">50조원</div>
                        <div className="text-sm text-gray-600">연간 금융 비용 절감</div>
                    </div>
                    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 text-center">
                        <i className="fas fa-clock text-blue-600 text-4xl mb-3"></i>
                        <div className="text-3xl font-bold text-blue-700 mb-2">99.9%</div>
                        <div className="text-sm text-gray-600">시간 절약</div>
                    </div>
                    <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4 text-center">
                        <i className="fas fa-users text-purple-600 text-4xl mb-3"></i>
                        <div className="text-3xl font-bold text-purple-700 mb-2">100%</div>
                        <div className="text-sm text-gray-600">금융 접근성</div>
                    </div>
                    <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4 text-center">
                        <i className="fas fa-shield-alt text-orange-600 text-4xl mb-3"></i>
                        <div className="text-3xl font-bold text-orange-700 mb-2">0건</div>
                        <div className="text-sm text-gray-600">금융 사고</div>
                    </div>
                </div>

                {/* 상세 분석 */}
                <div className="bg-white rounded-lg border-2 border-gray-300 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">비용 절감 상세 분석</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <span className="text-sm text-gray-700">은행 지점 운영비</span>
                            <span className="font-bold text-green-700">-20조원/년</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <span className="text-sm text-gray-700">보험 심사 인력</span>
                            <span className="font-bold text-green-700">-10조원/년</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <span className="text-sm text-gray-700">증권사 거래 수수료</span>
                            <span className="font-bold text-green-700">-15조원/년</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <span className="text-sm text-gray-700">금융감독 비용</span>
                            <span className="font-bold text-green-700">-5조원/년</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-100 rounded border-t-2 border-green-300 font-bold">
                            <span className="text-gray-900">총 절감액</span>
                            <span className="text-green-700 text-xl">-50조원/년</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 향후 계획 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-blue-500 pl-4">향후 서비스 계획</h2>
                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                    <div className="space-y-3 text-sm text-gray-800">
                        <div className="flex items-center gap-3">
                            <i className="fas fa-check-circle text-green-600"></i>
                            <span><strong>2025 Q1:</strong> 디지털 은행 베타 서비스 출시</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <i className="fas fa-check-circle text-green-600"></i>
                            <span><strong>2025 Q2:</strong> 디지털 보험 및 증권 서비스 시작</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <i className="fas fa-circle text-gray-400"></i>
                            <span><strong>2025 Q3:</strong> 디지털 거래소 오픈</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <i className="fas fa-circle text-gray-400"></i>
                            <span><strong>2025 Q4:</strong> AI 금융감독 시스템 전면 가동</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

window.IntegratedFinance = IntegratedFinance;
