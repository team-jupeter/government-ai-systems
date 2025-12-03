// 규제 준수 컴포넌트
const RegulationCompliance = () => {
    const [expandedLaw, setExpandedLaw] = React.useState(null);
    const [simulationStage, setSimulationStage] = React.useState(null);
    const [isRunning, setIsRunning] = React.useState(false);

    // 법률 검증 시스템
    const lawEnforcement = {
        fair_trade: {
            title: '공정거래법 자동 집행',
            icon: 'handshake',
            color: 'blue',
            description: '담합, 독과점, 불공정 거래 행위를 실시간 탐지하고 차단합니다.',
            violations: [
                {
                    type: '담합 (Cartel)',
                    detection: '동일 업종 사업자 간 가격 담합 패턴 탐지',
                    example: '3개 정유사가 동시에 동일한 가격으로 가격 인상',
                    mechanism: 'AI가 시계열 가격 데이터를 분석하여 비정상적 동조화 탐지',
                    action: '가격 인상 거래 즉시 차단 → 공정거래위원회 자동 신고'
                },
                {
                    type: '독과점 남용',
                    detection: '시장 지배적 지위 남용 행위 탐지',
                    example: '플랫폼 기업이 입점 업체에 불공정 수수료 부과',
                    mechanism: '거래 조건을 AI가 시장 평균과 비교하여 과도한 요구 탐지',
                    action: '불공정 거래 차단 → 대금 지불 불가'
                },
                {
                    type: '부당 염매 (Dumping)',
                    detection: '원가 이하 판매로 경쟁사 제거 시도',
                    example: '대형마트가 원가의 50%로 판매하여 소상공인 압박',
                    mechanism: '재무제표의 원가 데이터와 판매가 비교하여 원가 이하 판매 탐지',
                    action: '원가 이하 거래 차단 → 최소 판매가 강제'
                },
                {
                    type: '끼워팔기 (Tying)',
                    detection: '특정 상품 구매 시 다른 상품 강제 구매',
                    example: '스마트폰 구매 시 특정 통신사 가입 강제',
                    mechanism: '거래 조건에서 불필요한 결합 상품 탐지',
                    action: '결합 거래 분리 → 독립 구매만 허용'
                }
            ],
            technical: {
                algorithm: 'Time Series Correlation Analysis + Graph Neural Network',
                realtime: '0.015ms',
                accuracy: '98.7%'
            }
        },
        tax_law: {
            title: '세법 자동 집행',
            icon: 'file-invoice-dollar',
            color: 'green',
            description: '탈세, 조세 회피, 허위 세금계산서 발행을 원천 차단합니다.',
            violations: [
                {
                    type: '탈세 (Tax Evasion)',
                    detection: '소득 은닉 및 허위 신고 탐지',
                    example: '현금 거래로 매출 누락하여 소득세 회피',
                    mechanism: '모든 거래가 재무제표에 자동 기록되어 매출 누락 불가능',
                    action: '현금 거래 불가 (100% 디지털 화폐) → 탈세 원천 차단'
                },
                {
                    type: '허위 세금계산서',
                    detection: '실제 거래 없이 세금계산서 발행',
                    example: '가짜 매입으로 부가세 환급 시도',
                    mechanism: '세금계산서와 실제 거래 기록(재무제표)을 대조하여 불일치 탐지',
                    action: '허위 계산서 발행 차단 → 실제 거래만 계산서 발행'
                },
                {
                    type: '조세 피난처 이용',
                    detection: '조세 회피 목적의 해외 송금',
                    example: '페이퍼컴퍼니를 통한 소득 이전',
                    mechanism: 'AI가 거래 목적과 당사자 관계를 분석하여 조세 회피 의도 탐지',
                    action: '조세 회피 송금 차단 → 정상 세율 적용 후에만 송금 허용'
                },
                {
                    type: '가공 인건비',
                    detection: '허위 인건비로 비용 과대계상',
                    example: '실제 근무하지 않는 가족에게 급여 지급',
                    mechanism: '근무 기록(출퇴근, 업무 내역)과 급여를 대조하여 허위 인건비 탐지',
                    action: '허위 급여 지급 차단 → 실제 근무자만 급여 수령'
                }
            ],
            technical: {
                algorithm: 'Transaction Graph Analysis + Deep Learning',
                realtime: '0.001ms',
                accuracy: '99.9%'
            }
        },
        civil_law: {
            title: '민법 자동 집행',
            icon: 'balance-scale',
            color: 'purple',
            description: '계약 위반, 채무 불이행, 사기 거래를 사전에 방지합니다.',
            violations: [
                {
                    type: '계약 위반 (Breach of Contract)',
                    detection: '스마트 계약 조건 미충족',
                    example: '납품 계약에서 약속된 수량/품질 미달',
                    mechanism: '스마트 계약에 명시된 조건(수량, 품질, 기한)을 IoT 센서로 자동 검증',
                    action: '조건 미충족 시 대금 지불 보류 → 조건 충족 후 자동 지급'
                },
                {
                    type: '채무 불이행',
                    detection: '대출/외상 상환 능력 부족',
                    example: '월 소득 300만원인데 1억원 대출 신청',
                    mechanism: 'AI가 재무제표를 분석하여 상환 능력 실시간 평가',
                    action: '상환 불가능 대출 차단 → 상환 가능 금액만 대출 승인'
                },
                {
                    type: '사기 거래 (Fraud)',
                    detection: '허위 사실로 상대방 기망',
                    example: '가짜 명품을 진품으로 속여 판매',
                    mechanism: '상품 정보를 블록체인에 기록하고 AI로 진위 검증',
                    action: '허위 상품 거래 차단 → 인증된 상품만 거래 허용'
                },
                {
                    type: '소비자 피해',
                    detection: '약관 위반 또는 환불 거부',
                    example: '청약 철회 기간 내 환불 거부',
                    mechanism: '스마트 계약에 소비자 보호법 조항 자동 포함',
                    action: '환불 조건 충족 시 자동 환불 → 판매자 거부 불가'
                }
            ],
            technical: {
                algorithm: 'Smart Contract Verification + NLP',
                realtime: '0.01ms',
                accuracy: '99.2%'
            }
        },
        criminal_law: {
            title: '형법 자동 집행',
            icon: 'gavel',
            color: 'red',
            description: '횡령, 배임, 절도, 사기 등 경제 범죄를 사전 차단합니다.',
            violations: [
                {
                    type: '횡령 (Embezzlement)',
                    detection: '회사 자금의 사적 유용',
                    example: '재무팀장이 회사 계좌에서 개인 계좌로 1억원 이체',
                    mechanism: '직위와 계좌 접근 권한을 AI가 모니터링하여 비정상 이체 탐지',
                    action: '권한 외 이체 즉시 차단 → 수사 기관 자동 신고'
                },
                {
                    type: '배임 (Breach of Trust)',
                    detection: '업무상 임무 위배로 회사에 손해',
                    example: '임원이 경쟁사에 유리하게 계약 체결',
                    mechanism: 'AI가 계약 조건을 시장 평균과 비교하여 불리한 조건 탐지',
                    action: '불리한 계약 체결 차단 → 이사회 승인 요구'
                },
                {
                    type: '절도 (Theft)',
                    detection: '구매 기록 없는 물품 판매',
                    example: '도난 명품 시계를 중고 거래 사이트에 판매',
                    mechanism: '재무제표에서 구매 이력 검증 → 이력 없으면 차단',
                    action: '출처 불명 물품 판매 차단 → 경찰 자동 신고'
                },
                {
                    type: '사기 (Fraud)',
                    detection: '허위 사실로 재물 취득',
                    example: '폰지 사기 (신규 투자금으로 기존 투자자 수익 지급)',
                    mechanism: 'AI가 자금 흐름을 분석하여 폰지 구조 탐지',
                    action: '피라미드 구조 거래 차단 → 금융감독원 신고'
                }
            ],
            technical: {
                algorithm: 'Behavioral Analysis + Pattern Recognition',
                realtime: '0.015ms',
                accuracy: '97.8%'
            }
        }
    };

    // 위법 거래 시뮬레이션 케이스
    const violationCases = [
        {
            id: 1,
            type: 'fair_trade',
            title: '담합 시도',
            description: '3개 통신사가 동시에 요금제 가격 10% 인상',
            parties: ['A통신', 'B통신', 'C통신'],
            detection: '시계열 가격 분석으로 비정상적 동조화 탐지 (상관계수 0.98)',
            verdict: 'blocked'
        },
        {
            id: 2,
            type: 'tax_law',
            title: '허위 세금계산서',
            description: '실제 거래 없이 5천만원 세금계산서 발행',
            parties: ['A회사', 'B회사 (유령회사)'],
            detection: '세금계산서 발행 시 실제 거래 기록 부재 확인',
            verdict: 'blocked'
        },
        {
            id: 3,
            type: 'civil_law',
            title: '계약 위반',
            description: '납품 계약에서 약속된 수량의 50%만 납품하고 전액 요구',
            parties: ['공급업체', '구매업체'],
            detection: 'IoT 센서로 실제 납품량 확인 → 수량 미달',
            verdict: 'blocked'
        },
        {
            id: 4,
            type: 'criminal_law',
            title: '횡령 시도',
            description: '재무팀장이 회사 계좌에서 개인 계좌로 1억원 이체 시도',
            parties: ['재무팀장 김OO', '회사 계좌'],
            detection: '직위 권한 외 고액 이체 탐지 + 업무 시간 외 거래',
            verdict: 'blocked'
        }
    ];

    const startViolationSimulation = (violationCase) => {
        setIsRunning(true);
        setSimulationStage(null);

        // 1단계: 거래 시도
        setTimeout(() => {
            setSimulationStage({
                stage: 1,
                type: 'attempt',
                data: violationCase
            });
        }, 100);

        // 2단계: AI 검증
        setTimeout(() => {
            setSimulationStage({
                stage: 2,
                type: 'verification',
                data: violationCase
            });
        }, 2000);

        // 3단계: 차단
        setTimeout(() => {
            setSimulationStage({
                stage: 3,
                type: 'blocked',
                data: violationCase
            });
            setIsRunning(false);
        }, 4000);
    };

    const formatNumber = (num) => new Intl.NumberFormat('ko-KR').format(num);

    const getLawColor = (lawType) => {
        const colors = {
            fair_trade: 'blue',
            tax_law: 'green',
            civil_law: 'purple',
            criminal_law: 'red'
        };
        return colors[lawType] || 'gray';
    };

    return (
        <div className="space-y-8">
            {/* 개요 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-gov-blue pl-4">규제 준수 자동 시스템</h2>
                <div className="bg-gradient-to-r from-red-50 to-purple-50 rounded-lg p-6 border-l-4 border-red-500">
                    <p className="text-sm text-gray-800 mb-4">
                        <strong className="text-red-700">모든 위법 거래는 기술적으로 불가능</strong>합니다. 
                        AI가 매 거래마다 공정거래법, 세법, 민법, 형법을 실시간으로 검증하여, 
                        <strong className="text-purple-700"> 위법 거래는 대금 지불이 차단</strong>됩니다.
                        사후 처벌이 아닌 <strong className="text-blue-700">사전 예방</strong>으로 100% 준법을 강제합니다.
                    </p>
                    <div className="grid grid-cols-4 gap-3">
                        <div className="bg-white rounded-lg p-3 text-center shadow">
                            <div className="text-2xl font-bold text-red-700 mb-1">100%</div>
                            <div className="text-xs text-gray-600">준법 강제율</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center shadow">
                            <div className="text-2xl font-bold text-blue-700 mb-1">0.015ms</div>
                            <div className="text-xs text-gray-600">검증 속도</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center shadow">
                            <div className="text-2xl font-bold text-green-700 mb-1">사전</div>
                            <div className="text-xs text-gray-600">차단 방식</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center shadow">
                            <div className="text-2xl font-bold text-purple-700 mb-1">0건</div>
                            <div className="text-xs text-gray-600">위법 거래</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 핵심 원리 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-gov-blue pl-4">준법 강제 메커니즘</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white border-2 border-red-300 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white">
                                <i className="fas fa-search text-2xl"></i>
                            </div>
                            <h3 className="font-bold text-gray-900">1. 실시간 검증</h3>
                        </div>
                        <p className="text-sm text-gray-700">
                            매 거래마다 AI가 0.015ms 이내에 공정거래법, 세법, 민법, 형법 위반 여부를 검증합니다.
                        </p>
                    </div>
                    <div className="bg-white border-2 border-purple-300 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                                <i className="fas fa-ban text-2xl"></i>
                            </div>
                            <h3 className="font-bold text-gray-900">2. 자금 이동 차단</h3>
                        </div>
                        <p className="text-sm text-gray-700">
                            위법 거래로 판단되면 즉시 대금 지불이 차단됩니다. 디지털 화폐가 이동하지 않으므로 거래가 불가능합니다.
                        </p>
                    </div>
                    <div className="bg-white border-2 border-blue-300 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                                <i className="fas fa-bell text-2xl"></i>
                            </div>
                            <h3 className="font-bold text-gray-900">3. 자동 신고</h3>
                        </div>
                        <p className="text-sm text-gray-700">
                            차단된 거래는 관할 기관(공정위, 국세청, 경찰)에 자동으로 신고되어 수사가 시작됩니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* 법률별 검증 시스템 - 아코디언 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-gov-blue pl-4">법률별 자동 집행 시스템 (클릭하여 상세 보기)</h2>
                <div className="space-y-4">
                    {Object.keys(lawEnforcement).map((lawKey) => {
                        const law = lawEnforcement[lawKey];
                        return (
                            <div key={lawKey}>
                                <div
                                    onClick={() => setExpandedLaw(expandedLaw === lawKey ? null : lawKey)}
                                    className={`bg-white border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${
                                        expandedLaw === lawKey ? `border-${law.color}-500 shadow-lg` : 'border-gray-300'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-16 h-16 bg-${law.color}-600 rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                                            <i className={`fas fa-${law.icon} text-3xl`}></i>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">{law.title}</h3>
                                            <p className="text-sm text-gray-600">{law.description}</p>
                                        </div>
                                        <i className={`fas fa-chevron-${expandedLaw === lawKey ? 'up' : 'down'} text-gray-400 text-xl`}></i>
                                    </div>
                                </div>

                                {/* 상세 내용 */}
                                {expandedLaw === lawKey && (
                                    <div className="mt-2 bg-gray-50 rounded-lg p-6 border-2 border-gray-300 animate-slideDown">
                                        <div className="space-y-6">
                                            {/* 위반 유형 및 탐지 메커니즘 */}
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                    <i className={`fas fa-exclamation-triangle text-${law.color}-600`}></i>
                                                    주요 위반 유형 및 탐지 메커니즘
                                                </h4>
                                                <div className="space-y-3">
                                                    {law.violations.map((violation, idx) => (
                                                        <div key={idx} className="bg-white rounded-lg p-4 border-2 border-gray-300">
                                                            <div className="flex items-start gap-3 mb-3">
                                                                <div className={`w-8 h-8 bg-${law.color}-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
                                                                    {idx + 1}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="font-bold text-gray-900 mb-1">{violation.type}</div>
                                                                    <div className="text-sm text-gray-600 mb-2">{violation.detection}</div>
                                                                </div>
                                                            </div>
                                                            <div className="grid md:grid-cols-2 gap-3 text-sm">
                                                                <div className="bg-red-50 border border-red-300 rounded p-3">
                                                                    <div className="font-bold text-red-700 mb-1">위반 사례</div>
                                                                    <div className="text-gray-700">{violation.example}</div>
                                                                </div>
                                                                <div className="bg-blue-50 border border-blue-300 rounded p-3">
                                                                    <div className="font-bold text-blue-700 mb-1">탐지 메커니즘</div>
                                                                    <div className="text-gray-700">{violation.mechanism}</div>
                                                                </div>
                                                            </div>
                                                            <div className={`mt-3 bg-${law.color}-50 border border-${law.color}-300 rounded p-3`}>
                                                                <div className="flex items-center gap-2">
                                                                    <i className={`fas fa-shield-alt text-${law.color}-600`}></i>
                                                                    <span className="font-bold text-sm text-gray-900">차단 조치:</span>
                                                                    <span className="text-sm text-gray-700">{violation.action}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* 기술 사양 */}
                                            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border-2 border-purple-300">
                                                <h4 className="font-bold text-gray-900 mb-3">기술 사양</h4>
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div>
                                                        <div className="text-xs text-gray-600 mb-1">AI 알고리즘</div>
                                                        <div className="font-mono text-sm text-gray-900">{law.technical.algorithm}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-gray-600 mb-1">실시간 처리</div>
                                                        <div className="font-bold text-lg text-blue-700">{law.technical.realtime}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-gray-600 mb-1">탐지 정확도</div>
                                                        <div className="font-bold text-lg text-green-700">{law.technical.accuracy}</div>
                                                    </div>
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

            {/* 위법 거래 차단 시뮬레이션 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-gov-blue pl-4">위법 거래 차단 시뮬레이션</h2>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {violationCases.map((violationCase) => (
                        <button
                            key={violationCase.id}
                            onClick={() => !isRunning && startViolationSimulation(violationCase)}
                            disabled={isRunning}
                            className={`text-left bg-white border-2 border-${getLawColor(violationCase.type)}-300 rounded-lg p-4 transition-all ${
                                isRunning ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:border-' + getLawColor(violationCase.type) + '-500'
                            }`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <i className={`fas fa-exclamation-triangle text-${getLawColor(violationCase.type)}-600 text-xl`}></i>
                                <span className="font-bold text-gray-900">{violationCase.title}</span>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{violationCase.description}</p>
                            <div className="text-xs text-gray-600">
                                <strong>탐지:</strong> {violationCase.detection}
                            </div>
                        </button>
                    ))}
                </div>

                {/* 시뮬레이션 결과 */}
                {simulationStage && (
                    <div className="animate-slideDown">
                        {simulationStage.stage === 1 && (
                            <div className="bg-yellow-100 rounded-lg p-6 border-2 border-yellow-400">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">거래 시도 감지</h3>
                                        <p className="text-sm text-gray-600">AI가 거래 요청을 수신했습니다</p>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg p-4">
                                    <div className="font-bold text-gray-900 mb-2">{simulationStage.data.title}</div>
                                    <p className="text-sm text-gray-700">{simulationStage.data.description}</p>
                                </div>
                            </div>
                        )}

                        {simulationStage.stage === 2 && (
                            <div className="bg-blue-100 rounded-lg p-6 border-2 border-blue-400">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">AI 검증 진행 중</h3>
                                        <p className="text-sm text-gray-600">법률 위반 여부를 실시간 분석합니다</p>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <i className="fas fa-spinner fa-spin text-blue-600"></i>
                                        <span className="font-bold text-gray-900">분석 중...</span>
                                    </div>
                                    <div className="text-sm text-gray-700">
                                        <strong>탐지 내용:</strong> {simulationStage.data.detection}
                                    </div>
                                </div>
                            </div>
                        )}

                        {simulationStage.stage === 3 && (
                            <div className="bg-red-100 rounded-lg p-6 border-2 border-red-400">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">거래 차단 완료</h3>
                                        <p className="text-sm text-gray-600">위법 거래로 판단되어 대금 지불이 차단되었습니다</p>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <i className="fas fa-ban text-white text-3xl"></i>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-xl font-bold text-red-700 mb-2">거래 차단</h4>
                                            <p className="text-sm text-gray-700 mb-3">{simulationStage.data.description}</p>
                                            <div className="bg-red-50 rounded p-3 border border-red-300">
                                                <div className="font-bold text-sm text-red-900 mb-2">자동 조치 사항</div>
                                                <ul className="text-xs text-gray-700 space-y-1">
                                                    <li>✓ 대금 지불 즉시 차단 (디지털 화폐 이동 불가)</li>
                                                    <li>✓ 관할 기관 자동 신고 (공정위/국세청/경찰)</li>
                                                    <li>✓ <a href="http://100.30.14.224/openhash-system/" target="_blank" className="text-gov-blue underline">OpenHash</a>에 영구 기록</li>
                                                    <li>✓ 관련 계좌 모니터링 강화</li>
                                                    <li>✓ 수사 협조 자료 자동 생성</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* 경제적/사회적 효과 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-green-500 pl-4">경제적/사회적 효과</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {/* 경제적 효과 */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-3">경제적 효과</h3>
                        <div className="space-y-3">
                            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <i className="fas fa-chart-line text-green-600 text-2xl"></i>
                                    <div className="font-bold text-gray-900">탈세 방지</div>
                                </div>
                                <div className="text-3xl font-bold text-green-700 mb-1">+40조원/년</div>
                                <div className="text-sm text-gray-600">추가 세수 확보 (탈세율 0%)</div>
                            </div>
                            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <i className="fas fa-gavel text-blue-600 text-2xl"></i>
                                    <div className="font-bold text-gray-900">법 집행 비용</div>
                                </div>
                                <div className="text-3xl font-bold text-blue-700 mb-1">-80%</div>
                                <div className="text-sm text-gray-600">수사/재판 비용 절감</div>
                            </div>
                            <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <i className="fas fa-shield-alt text-purple-600 text-2xl"></i>
                                    <div className="font-bold text-gray-900">경제 범죄 피해</div>
                                </div>
                                <div className="text-3xl font-bold text-purple-700 mb-1">-95%</div>
                                <div className="text-sm text-gray-600">연간 30조원 피해 방지</div>
                            </div>
                        </div>
                    </div>

                    {/* 사회적 효과 */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-3">사회적 효과</h3>
                        <div className="space-y-3">
                            <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <i className="fas fa-balance-scale text-indigo-600"></i>
                                    <div className="font-bold text-gray-900">법 앞의 평등 실현</div>
                                </div>
                                <p className="text-sm text-gray-700">
                                    재력이나 권력에 관계없이 모든 사람이 동일하게 법의 적용을 받습니다.
                                </p>
                            </div>
                            <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <i className="fas fa-user-shield text-teal-600"></i>
                                    <div className="font-bold text-gray-900">소비자 보호 강화</div>
                                </div>
                                <p className="text-sm text-gray-700">
                                    사기, 불공정 거래가 기술적으로 불가능하여 소비자가 완벽하게 보호됩니다.
                                </p>
                            </div>
                            <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <i className="fas fa-handshake text-green-600"></i>
                                    <div className="font-bold text-gray-900">신뢰 사회 구축</div>
                                </div>
                                <p className="text-sm text-gray-700">
                                    모든 거래가 투명하고 합법적이므로 사회 전반에 신뢰가 형성됩니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 결론 */}
            <section>
                <div className="bg-gradient-to-r from-red-50 via-purple-50 to-blue-50 rounded-lg p-6 border-2 border-purple-400">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-lightbulb text-yellow-500"></i>
                        핵심 결론
                    </h3>
                    <div className="space-y-3 text-sm text-gray-800">
                        <p>
                            <strong className="text-red-700">디지털 화폐는 단순한 결제 수단이 아닙니다.</strong> 
                            모든 경제 활동에서 <strong className="text-purple-700">법과 규제의 준수를 기술적으로 강제</strong>하는 시스템입니다.
                        </p>
                        <p>
                            위법 거래는 대금 지불이 차단되어 <strong className="text-blue-700">실행이 불가능</strong>하므로, 
                            사후 처벌이 아닌 <strong className="text-green-700">사전 예방</strong>으로 범죄를 원천 차단합니다.
                        </p>
                        <p>
                            이는 <strong className="text-indigo-700">법치주의의 완성</strong>이며, 
                            모든 국민이 법 앞에 평등하고 <strong className="text-teal-700">신뢰할 수 있는 경제 시스템</strong>의 실현입니다.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

window.RegulationCompliance = RegulationCompliance;
