function Overview() {
    const [selectedSection, setSelectedSection] = React.useState(null);

    // 거래소 핵심 프로세스
    const tradingProcess = [
        {
            step: 1,
            icon: 'fa-file-invoice',
            title: '재무제표 제출',
            description: '개인/단체가 증권 판매를 위해 재무제표 제출',
            details: [
                '손익계산서 (Income Statement)',
                '대차대조표 (Balance Sheet)', 
                '현금흐름표 (Cash Flow Statement)',
                '지분표 (Statement of Changes in Equity)',
                '이익잉여금처분계산서',
                '재무분석보고서 (Financial Reports)'
            ]
        },
        {
            step: 2,
            icon: 'fa-shield-halved',
            title: '오픈해시 검증',
            description: '제출된 재무제표의 진위를 오픈해시로 검증',
            details: [
                '위변조 불가능한 기록 메커니즘',
                'SHA-256 Double Hash 적용',
                '시간순 해시체인 연결',
                '분산 노드 교차 검증'
            ]
        },
        {
            step: 3,
            icon: 'fa-calculator',
            title: 'AI 공정가격 산출',
            description: 'AI Agent가 재무제표 분석하여 공정 가격 결정',
            details: [
                'DCF (Discounted Cash Flow) 분석',
                'PER (Price Earnings Ratio) 평가',
                'PBR (Price Book-value Ratio) 평가',
                'ROE, ROA 수익성 분석',
                '산업별 Valuation Multiple 적용'
            ]
        },
        {
            step: 4,
            icon: 'fa-tags',
            title: '가격 공시',
            description: '공정 가격과 판매 희망 가격 함께 공시',
            details: [
                'AI 산출 공정 가격 (Fair Value)',
                '판매자 희망 가격 (Ask Price)',
                '시간 경과 시 자동 가격 하락 옵션',
                '투명한 가격 비교 제공'
            ]
        },
        {
            step: 5,
            icon: 'fa-handshake',
            title: '구매자 결정',
            description: '구매자가 공정 가격 참조하여 구매 결정',
            details: [
                '공정 가격 대비 할인율 확인',
                '재무제표 직접 검토 가능',
                '위험 대비 수익률 계산',
                '즉시 체결 또는 대기'
            ]
        }
    ];

    // 재무분석 기법
    const analysisMethodology = [
        {
            category: '현금흐름 분석',
            method: 'DCF (Discounted Cash Flow)',
            formula: 'PV = CF₁/(1+r)¹ + CF₂/(1+r)² + ... + CFₙ/(1+r)ⁿ',
            description: '미래 현금흐름을 현재가치로 할인하여 기업 가치 산출'
        },
        {
            category: '수익성 평가',
            method: 'PER (Price Earnings Ratio)',
            formula: 'PER = 주가 / 주당순이익 (EPS)',
            description: '주가가 순이익 대비 몇 배인지 평가 (업종별 평균 비교)'
        },
        {
            category: '자산 가치 평가',
            method: 'PBR (Price Book-value Ratio)',
            formula: 'PBR = 주가 / 주당순자산 (BPS)',
            description: '주가가 순자산 대비 몇 배인지 평가 (저평가 발굴)'
        },
        {
            category: '수익률 분석',
            method: 'ROE (Return On Equity)',
            formula: 'ROE = 순이익 / 자기자본 × 100',
            description: '자기자본 대비 수익 창출 능력 평가'
        },
        {
            category: '현금 창출력',
            method: 'FCF (Free Cash Flow)',
            formula: 'FCF = 영업활동 현금흐름 - 자본적 지출',
            description: '실제 사용 가능한 현금 창출 능력 평가'
        }
    ];

    // AI Agent Fine-tuning 프로세스
    const aiTrainingProcess = [
        {
            phase: 'Phase 1',
            title: '데이터 수집',
            description: '과거 증권 발행 사례 및 재무제표 데이터 수집',
            details: '100만+ 기업/개인 재무제표, 10년+ 시계열 데이터'
        },
        {
            phase: 'Phase 2',
            title: 'Base Model 선택',
            description: 'DeepSeek R1 또는 Qwen3 기반 모델 선택',
            details: '금융 도메인 특화 언어 모델, 수학적 추론 능력 검증'
        },
        {
            phase: 'Phase 3',
            title: 'LoRA Fine-tuning',
            description: 'Low-Rank Adaptation으로 재무분석 능력 특화',
            details: 'Rank 8-16, Alpha 32, Target Modules: q_proj, v_proj'
        },
        {
            phase: 'Phase 4',
            title: 'RLHF 적용',
            description: '전문 애널리스트 피드백으로 강화학습',
            details: '50+ 전문가, 1,000+ 평가 케이스, PPO 알고리즘'
        },
        {
            phase: 'Phase 5',
            title: '검증 및 배포',
            description: '실제 데이터로 정확도 검증 후 배포',
            details: '목표 정확도 95%+, A/B 테스트, 지속적 모니터링'
        }
    ];

    return React.createElement('div', { className: 'space-y-8' },
        // 헤더
        React.createElement('div', { className: 'bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white' },
            React.createElement('h2', { className: 'text-3xl font-bold mb-4' }, 
                '🏛️ 오픈해시 증권거래소'
            ),
            React.createElement('p', { className: 'text-xl opacity-90 mb-2' },
                '누구나 증권을 발행하고 거래할 수 있는 완전 개방형 거래소'
            ),
            React.createElement('p', { className: 'text-lg opacity-80' },
                '재무제표 기반 AI 공정가격 산출 • 오픈해시 위변조 방지 • 투명한 가격 공시'
            )
        ),

        // 핵심 프로세스
        React.createElement('div', { className: 'bg-white rounded-xl border-2 border-gray-200 p-6' },
            React.createElement('h3', { className: 'text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3' },
                React.createElement('i', { className: 'fas fa-chart-line text-blue-600' }),
                '증권 발행 및 거래 프로세스'
            ),
            React.createElement('div', { className: 'space-y-6' },
                tradingProcess.map((process, index) => 
                    React.createElement('div', { 
                        key: index,
                        className: 'border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg cursor-pointer hover:bg-blue-100 transition-all',
                        onClick: () => setSelectedSection(selectedSection === `process-${index}` ? null : `process-${index}`)
                    },
                        React.createElement('div', { className: 'flex items-start gap-4' },
                            React.createElement('div', { className: 'flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold' },
                                process.step
                            ),
                            React.createElement('div', { className: 'flex-1' },
                                React.createElement('div', { className: 'flex items-center gap-3 mb-2' },
                                    React.createElement('i', { className: `fas ${process.icon} text-blue-600 text-xl` }),
                                    React.createElement('h4', { className: 'text-xl font-bold text-gray-900' }, process.title)
                                ),
                                React.createElement('p', { className: 'text-gray-700 mb-3' }, process.description),
                                selectedSection === `process-${index}` && React.createElement('div', { className: 'bg-white rounded-lg p-4 space-y-2' },
                                    process.details.map((detail, idx) =>
                                        React.createElement('div', { key: idx, className: 'flex items-start gap-2' },
                                            React.createElement('i', { className: 'fas fa-check text-green-600 mt-1' }),
                                            React.createElement('span', { className: 'text-gray-700' }, detail)
                                        )
                                    )
                                )
                            )
                        ),
                        index < tradingProcess.length - 1 && React.createElement('div', { className: 'ml-6 mt-4 mb-2' },
                            React.createElement('i', { className: 'fas fa-arrow-down text-blue-400 text-2xl' })
                        )
                    )
                )
            )
        ),

        // 재무분석 기법
        React.createElement('div', { className: 'bg-white rounded-xl border-2 border-gray-200 p-6' },
            React.createElement('h3', { className: 'text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3' },
                React.createElement('i', { className: 'fas fa-calculator text-green-600' }),
                '재무분석 기법 (AI 공정가격 산출)'
            ),
            React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' },
                analysisMethodology.map((method, index) =>
                    React.createElement('div', { 
                        key: index,
                        className: 'border-2 border-green-200 rounded-xl p-5 hover:border-green-400 transition-all cursor-pointer',
                        onClick: () => setSelectedSection(selectedSection === `method-${index}` ? null : `method-${index}`)
                    },
                        React.createElement('div', { className: 'mb-3' },
                            React.createElement('span', { className: 'text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full' },
                                method.category
                            )
                        ),
                        React.createElement('h4', { className: 'text-lg font-bold text-gray-900 mb-2' }, method.method),
                        React.createElement('div', { className: 'bg-gray-50 rounded-lg p-3 mb-3 font-mono text-sm text-gray-700 overflow-x-auto' },
                            method.formula
                        ),
                        React.createElement('p', { className: 'text-gray-600 text-sm' }, method.description)
                    )
                )
            )
        ),

        // AI Agent Fine-tuning
        React.createElement('div', { className: 'bg-white rounded-xl border-2 border-gray-200 p-6' },
            React.createElement('h3', { className: 'text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3' },
                React.createElement('i', { className: 'fas fa-brain text-purple-600' }),
                'AI Agent Fine-tuning (DeepSeek R1 / Qwen3)'
            ),
            React.createElement('div', { className: 'space-y-4' },
                aiTrainingProcess.map((phase, index) =>
                    React.createElement('div', { 
                        key: index,
                        className: 'flex items-start gap-4 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all'
                    },
                        React.createElement('div', { className: 'flex-shrink-0 w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-lg flex flex-col items-center justify-center' },
                            React.createElement('div', { className: 'text-xs font-semibold opacity-80' }, phase.phase),
                            React.createElement('div', { className: 'text-2xl font-bold' }, index + 1)
                        ),
                        React.createElement('div', { className: 'flex-1' },
                            React.createElement('h4', { className: 'text-lg font-bold text-gray-900 mb-1' }, phase.title),
                            React.createElement('p', { className: 'text-gray-700 mb-2' }, phase.description),
                            React.createElement('p', { className: 'text-sm text-gray-600 bg-white rounded px-3 py-2' }, phase.details)
                        ),
                        index < aiTrainingProcess.length - 1 && React.createElement('div', { className: 'absolute left-10 mt-24' },
                            React.createElement('i', { className: 'fas fa-arrow-down text-purple-400' })
                        )
                    )
                )
            )
        ),

        // 가격 결정 메커니즘
        React.createElement('div', { className: 'bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-300 p-6' },
            React.createElement('h3', { className: 'text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3' },
                React.createElement('i', { className: 'fas fa-balance-scale text-yellow-600' }),
                '가격 결정 및 매칭 메커니즘'
            ),
            React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-6' },
                React.createElement('div', { className: 'bg-white rounded-xl p-5 border-2 border-green-300' },
                    React.createElement('div', { className: 'text-center mb-4' },
                        React.createElement('i', { className: 'fas fa-robot text-green-600 text-4xl mb-2' }),
                        React.createElement('h4', { className: 'text-lg font-bold text-gray-900' }, 'AI 공정 가격')
                    ),
                    React.createElement('div', { className: 'text-center' },
                        React.createElement('div', { className: 'text-3xl font-bold text-green-600 mb-2' }, '₩125,000'),
                        React.createElement('p', { className: 'text-sm text-gray-600' }, '재무제표 분석 기반'),
                        React.createElement('p', { className: 'text-sm text-gray-600' }, 'DCF, PER, PBR 종합')
                    )
                ),
                React.createElement('div', { className: 'flex items-center justify-center' },
                    React.createElement('i', { className: 'fas fa-arrows-left-right text-4xl text-gray-400' })
                ),
                React.createElement('div', { className: 'bg-white rounded-xl p-5 border-2 border-blue-300' },
                    React.createElement('div', { className: 'text-center mb-4' },
                        React.createElement('i', { className: 'fas fa-user text-blue-600 text-4xl mb-2' }),
                        React.createElement('h4', { className: 'text-lg font-bold text-gray-900' }, '판매 희망 가격')
                    ),
                    React.createElement('div', { className: 'text-center' },
                        React.createElement('div', { className: 'text-3xl font-bold text-blue-600 mb-2' }, '₩150,000'),
                        React.createElement('p', { className: 'text-sm text-gray-600' }, '판매자 설정 가격'),
                        React.createElement('p', { className: 'text-sm text-orange-600 font-semibold' }, '시간 경과 시 ↓ 하락')
                    )
                )
            ),
            React.createElement('div', { className: 'mt-6 text-center p-4 bg-white rounded-lg' },
                React.createElement('p', { className: 'text-lg font-semibold text-gray-900 mb-2' },
                    '구매자 판단: 공정 가격 대비 ',
                    React.createElement('span', { className: 'text-red-600' }, '+20% 프리미엄'),
                    ' → 구매 여부 결정'
                ),
                React.createElement('p', { className: 'text-sm text-gray-600' },
                    '투명한 가격 비교로 합리적 투자 결정 지원'
                )
            )
        )
    );
}
