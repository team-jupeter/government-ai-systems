// PDV 금고 상세 모달
function PDVModal({ isOpen, onClose }) {
    if (!isOpen) return null;
    
    return React.createElement('div', {
        className: 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4',
        onClick: onClose
    },
        React.createElement('div', {
            className: 'bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto',
            onClick: (e) => e.stopPropagation()
        },
            React.createElement('div', { className: 'sticky top-0 bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6 rounded-t-2xl' },
                React.createElement('div', { className: 'flex justify-between items-center' },
                    React.createElement('h3', { className: 'text-3xl font-bold' }, '✅ PDV 금고 통합'),
                    React.createElement('button', {
                        onClick: onClose,
                        className: 'text-white hover:text-gray-200 text-3xl'
                    }, '×')
                )
            ),
            
            React.createElement('div', { className: 'p-8 space-y-6' },
                // 개요
                React.createElement('div', { className: 'bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg' },
                    React.createElement('h4', { className: 'text-xl font-bold text-green-800 mb-3' }, '🔐 프라이빗 데이터 금고란?'),
                    React.createElement('p', { className: 'text-gray-700 leading-relaxed' },
                        '출원인의 모든 개인정보와 활동 이력을 확장 재무제표 형식으로 본인 단말기에만 저장하고, ',
                        '무결성 검증을 위한 SHA-256 해시값만 오픈해시 네트워크에 기록하여 개인정보 주권을 보장하는 시스템입니다.'
                    )
                ),
                
                // 주요 기능
                React.createElement('div', {},
                    React.createElement('h4', { className: 'text-2xl font-bold text-gray-800 mb-4' }, '📋 특허 출원 시 자동화 기능'),
                    React.createElement('div', { className: 'grid md:grid-cols-2 gap-4' },
                        [
                            {
                                icon: '👤',
                                title: '출원인 정보 자동 인출',
                                desc: '이름, 주민등록번호, 주소, 연락처를 PDV에서 자동으로 가져와 수동 입력 불필요'
                            },
                            {
                                icon: '📜',
                                title: '과거 출원 이력 조회',
                                desc: '본인의 과거 특허·상표 출원 내역을 자동으로 불러와 중복 출원 방지'
                            },
                            {
                                icon: '🏢',
                                title: '대리인 정보 자동 연계',
                                desc: '거래 이력이 있는 특허법인·변리사 정보를 PDV에서 자동 제안'
                            },
                            {
                                icon: '💳',
                                title: '수수료 결제 정보',
                                desc: '출원료·심사료 자동 계산 및 결제 정보 연동 (교차 검증)'
                            }
                        ].map(item =>
                            React.createElement('div', {
                                key: item.title,
                                className: 'bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow'
                            },
                                React.createElement('div', { className: 'text-4xl mb-3' }, item.icon),
                                React.createElement('h5', { className: 'font-bold text-gray-800 mb-2' }, item.title),
                                React.createElement('p', { className: 'text-sm text-gray-600' }, item.desc)
                            )
                        )
                    )
                ),
                
                // 해시 전용 저장
                React.createElement('div', { className: 'bg-blue-50 rounded-xl p-6' },
                    React.createElement('h4', { className: 'text-xl font-bold text-blue-800 mb-3' }, '🔒 해시 전용 저장 (Hash-Only Storage)'),
                    React.createElement('div', { className: 'space-y-3 text-gray-700' },
                        React.createElement('p', {}, '✓ 원본 데이터: 출원인 단말기에만 AES-256-GCM 암호화 저장'),
                        React.createElement('p', {}, '✓ 클라우드: 32바이트 SHA-256 해시만 기록'),
                        React.createElement('p', {}, '✓ 제3자 접근 불가: 지식재산처도 원본 데이터를 볼 수 없음'),
                        React.createElement('p', {}, '✓ 법적 증명력: 해시 일치로 원본 무결성 증명')
                    )
                ),
                
                // 교차 검증
                React.createElement('div', {},
                    React.createElement('h4', { className: 'text-xl font-bold text-gray-800 mb-3' }, '🔄 거래 교차 검증'),
                    React.createElement('p', { className: 'text-gray-700 mb-3' },
                        '출원인과 특허법인(대리인) 양측의 PDV에 동일 거래가 기록되어 자동 교차 검증되며, ',
                        '수수료 납부도 금융기관 PDV와 연동하여 3자 검증이 이루어집니다.'
                    ),
                    React.createElement('div', { className: 'bg-gray-100 rounded-lg p-4 font-mono text-sm' },
                        React.createElement('p', {}, '출원인 PDV: "2025-11-23 변리사 OOO에게 출원 의뢰"'),
                        React.createElement('p', {}, '변리사 PDV: "2025-11-23 출원인 OOO로부터 출원 접수"'),
                        React.createElement('p', {}, '→ 해시 일치 확인 → 자동 검증 완료 ✓')
                    )
                ),
                
                // 개인정보 주권
                React.createElement('div', { className: 'bg-purple-50 rounded-xl p-6' },
                    React.createElement('h4', { className: 'text-xl font-bold text-purple-800 mb-3' }, '👑 개인정보 주권 보장'),
                    React.createElement('p', { className: 'text-gray-700' },
                        'GDPR, 개인정보보호법, AI 기본법을 준수하며, 출원인이 본인의 모든 데이터를 직접 소유·관리하고, ',
                        '언제든지 삭제·수정할 수 있는 완전한 자기결정권을 보장합니다.'
                    )
                )
            )
        )
    );
}

// 5계층 오픈해시 상세 모달
function OpenHashModal({ isOpen, onClose }) {
    if (!isOpen) return null;
    
    return React.createElement('div', {
        className: 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4',
        onClick: onClose
    },
        React.createElement('div', {
            className: 'bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto',
            onClick: (e) => e.stopPropagation()
        },
            React.createElement('div', { className: 'sticky top-0 bg-gradient-to-r from-indigo-600 to-blue-700 text-white p-6 rounded-t-2xl' },
                React.createElement('div', { className: 'flex justify-between items-center' },
                    React.createElement('h3', { className: 'text-3xl font-bold' }, '🌐 5계층 오픈해시'),
                    React.createElement('button', {
                        onClick: onClose,
                        className: 'text-white hover:text-gray-200 text-3xl'
                    }, '×')
                )
            ),
            
            React.createElement('div', { className: 'p-8 space-y-6' },
                // 개요
                React.createElement('div', { className: 'bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-lg' },
                    React.createElement('h4', { className: 'text-xl font-bold text-indigo-800 mb-3' }, '⚡ 블록체인 대비 98.5% 에너지 절감'),
                    React.createElement('p', { className: 'text-gray-700 leading-relaxed' },
                        'SHA-256 해시 체인 구조를 사용하되, Proof-of-Work나 Proof-of-Stake 없이 ',
                        '기존 통신 인프라(이동통신 기지국, 광역시도 센터)를 활용하여 에너지를 획기적으로 절감합니다.'
                    )
                ),
                
                // 5계층 구조
                React.createElement('div', {},
                    React.createElement('h4', { className: 'text-2xl font-bold text-gray-800 mb-4' }, '🏗️ 지식재산처 5계층 구조'),
                    React.createElement('div', { className: 'space-y-3' },
                        [
                            {
                                layer: 0,
                                name: '지식재산처 본청',
                                nodes: '3개',
                                color: 'from-red-500 to-red-600',
                                role: '최종 심사 승인, 정책 수립',
                                trust: '신뢰도 2.8',
                                detail: '대전 본청, 서울사무소, 특허심판원'
                            },
                            {
                                layer: 1,
                                name: '출원인 Edge',
                                nodes: '280,000개',
                                color: 'from-blue-500 to-blue-600',
                                role: '1차 출원 데이터 생성',
                                trust: '신뢰도 1.0',
                                detail: '기업 85,000 | 특허법인 2,500 | 대학 400 | 개인 192,100'
                            },
                            {
                                layer: 2,
                                name: '지역 심사국',
                                nodes: '4개',
                                color: 'from-green-500 to-green-600',
                                role: '권리별 심사 처리',
                                trust: '신뢰도 1.6',
                                detail: '전기통신, 기계금속건설, 화학생명공학, 상표디자인'
                            },
                            {
                                layer: 3,
                                name: '특허심판원',
                                nodes: '1개',
                                color: 'from-purple-500 to-purple-600',
                                role: '심판 판정, 법적 분쟁 해결',
                                trust: '신뢰도 2.2',
                                detail: '연간 약 5,800건 처리'
                            },
                            {
                                layer: 4,
                                name: '국가 아카이브',
                                nodes: '2개',
                                color: 'from-orange-500 to-orange-600',
                                role: '영구 보관, 국제 협력',
                                trust: '신뢰도 2.5',
                                detail: '국가기록원, WIPO 국제등록부'
                            }
                        ].map(layer =>
                            React.createElement('div', {
                                key: layer.layer,
                                className: `bg-gradient-to-r ${layer.color} rounded-xl p-5 text-white`
                            },
                                React.createElement('div', { className: 'flex justify-between items-center mb-2' },
                                    React.createElement('h5', { className: 'text-xl font-bold' }, `Layer ${layer.layer}: ${layer.name}`),
                                    React.createElement('span', { className: 'text-2xl font-black' }, layer.nodes)
                                ),
                                React.createElement('p', { className: 'text-sm opacity-90 mb-1' }, `${layer.role} (${layer.trust})`),
                                React.createElement('p', { className: 'text-xs opacity-80' }, layer.detail)
                            )
                        )
                    )
                ),
                
                // 위변조 방지
                React.createElement('div', { className: 'bg-red-50 rounded-xl p-6' },
                    React.createElement('h4', { className: 'text-xl font-bold text-red-800 mb-3' }, '🛡️ 출원서 위변조 영구 방지'),
                    React.createElement('div', { className: 'space-y-3 text-gray-700' },
                        React.createElement('p', {}, '1️⃣ 출원 즉시: 명세서·청구항·도면의 SHA-256 해시 생성 (32바이트)'),
                        React.createElement('p', {}, '2️⃣ ECDSA P-256 서명: 지식재산처 개인키로 디지털 서명'),
                        React.createElement('p', {}, '3️⃣ 5계층 전파: 137바이트 패킷이 모든 계층 노드에 0.18초 내 등록'),
                        React.createElement('p', {}, '4️⃣ 원본 암호화: AES-256-GCM으로 암호화하여 HSM에 보관'),
                        React.createElement('div', { className: 'bg-white rounded-lg p-4 mt-3' },
                            React.createElement('p', { className: 'font-semibold text-red-800' }, '🔒 위변조 시도 시:'),
                            React.createElement('p', { className: 'text-sm' }, '→ 해시 불일치 즉시 탐지 (0.18초)'),
                            React.createElement('p', { className: 'text-sm' }, '→ 280,000개 노드에서 교차 검증'),
                            React.createElement('p', { className: 'text-sm' }, '→ 원본 무결성 암호학적 증명')
                        )
                    )
                ),
                
                // 원자 시계 기반 타임스탬프
                React.createElement('div', { className: 'bg-yellow-50 rounded-xl p-6' },
                    React.createElement('h4', { className: 'text-xl font-bold text-yellow-800 mb-3' }, '⏱️ 원자 시계 기반 선출원주의'),
                    React.createElement('p', { className: 'text-gray-700 mb-3' },
                        '한국표준과학연구원(KRISS)의 원자 시계와 동기화하여 나노초 단위 정밀도로 출원 시각을 기록하며, ',
                        '이는 선출원주의(First-to-File) 원칙에 따른 우선권 판단의 결정적 근거가 됩니다.'
                    ),
                    React.createElement('div', { className: 'bg-white rounded-lg p-4 font-mono text-sm' },
                        React.createElement('p', {}, '출원 A: 2025-11-23T14:30:45.123456789 KST'),
                        React.createElement('p', {}, '출원 B: 2025-11-23T14:30:45.987654321 KST'),
                        React.createElement('p', { className: 'text-green-600 font-bold mt-2' }, '→ 출원 A가 0.864초 우선 (명확한 우선권 확정)')
                    )
                ),
                
                // 확률적 계층 선택
                React.createElement('div', {},
                    React.createElement('h4', { className: 'text-xl font-bold text-gray-800 mb-3' }, '🎲 확률적 계층 선택'),
                    React.createElement('p', { className: 'text-gray-700 mb-3' },
                        '문서 해시, 타임스탬프, 출원번호를 결합하여 SHA-256을 재적용하고, ',
                        '결과값의 상위 8바이트를 1000으로 나눈 나머지로 계층을 자동 선택합니다:'
                    ),
                    React.createElement('div', { className: 'bg-gray-100 rounded-lg p-4 space-y-2 text-sm' },
                        React.createElement('p', {}, '• 0~649 (65%): Layer 1 → 일반 상표·디자인 출원'),
                        React.createElement('p', {}, '• 650~899 (25%): Layer 2 → 특허 출원'),
                        React.createElement('p', {}, '• 900~999 (10%): Layer 3 → PCT 국제출원, 중요 심판'),
                        React.createElement('p', { className: 'text-orange-600 font-semibold' }, '• 수동 선택: Layer 4 → 특허법원 판결 (연 약 2,500건)')
                    )
                )
            )
        )
    );
}

// 다국가 평가 상세 모달
function MultiCountryModal({ isOpen, onClose }) {
    if (!isOpen) return null;
    
    return React.createElement('div', {
        className: 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4',
        onClick: onClose
    },
        React.createElement('div', {
            className: 'bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto',
            onClick: (e) => e.stopPropagation()
        },
            React.createElement('div', { className: 'sticky top-0 bg-gradient-to-r from-purple-600 to-pink-700 text-white p-6 rounded-t-2xl' },
                React.createElement('div', { className: 'flex justify-between items-center' },
                    React.createElement('h3', { className: 'text-3xl font-bold' }, '🌍 다국가 특허 평가'),
                    React.createElement('button', {
                        onClick: onClose,
                        className: 'text-white hover:text-gray-200 text-3xl'
                    }, '×')
                )
            ),
            
            React.createElement('div', { className: 'p-8 space-y-6' },
                // 개요
                React.createElement('div', { className: 'bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg' },
                    React.createElement('h4', { className: 'text-xl font-bold text-purple-800 mb-3' }, '🎯 AI 기반 5개국 특허 취득 가능성 분석'),
                    React.createElement('p', { className: 'text-gray-700 leading-relaxed' },
                        'DeepSeek R1 모델이 한국, 중국, 일본, 미국, 유럽 5개국의 특허법과 심사기준을 학습하여 ',
                        '각국에서의 특허 등록 가능성을 정량적으로 평가하고, 구체적인 법적 근거를 제시합니다.'
                    )
                ),
                
                // 국가별 평가 기준
                React.createElement('div', {},
                    React.createElement('h4', { className: 'text-2xl font-bold text-gray-800 mb-4' }, '⚖️ 국가별 특허법 및 심사 기준'),
                    React.createElement('div', { className: 'space-y-4' },
                        [
                            {
                                flag: '🇰🇷',
                                country: '대한민국',
                                laws: [
                                    '특허법 제29조 (신규성): 출원 전에 공지되거나 공연히 실시된 발명이 아닐 것',
                                    '특허법 제29조 제2항 (진보성): 통상의 기술자가 용이하게 발명할 수 없을 것',
                                    '특허법 제42조 (명세서 기재): 발명의 설명은 그 발명이 속하는 기술분야의 통상의 기술자가 용이하게 실시할 수 있도록 명확하고 상세하게 기재',
                                    '특허법 제33조 (출원권): 발명자 또는 승계인만 출원 가능'
                                ],
                                특징: 'PCT 국제출원 4위, 심사 처리기간 평균 11.0개월, 진보성 판단 엄격'
                            },
                            {
                                flag: '🇨🇳',
                                country: '중국',
                                laws: [
                                    '专利法 第22条 (신규성·창조성·실용성): 3가지 조건 충족 필요',
                                    '专利法 第26条 (명세서): 청구범위는 명세서의 지지를 받아야 함',
                                    '专利法 제5조 (공공질서 위반 금지): 사회공공이익에 반하지 않을 것'
                                ],
                                특징: 'CNIPA 세계 최다 출원국, 실용신안 제도 병행, 소프트웨어 특허 제한적'
                            },
                            {
                                flag: '🇯🇵',
                                country: '일본',
                                laws: [
                                    '特許法 第29条 (신규성·진보성): 공지기술 대비 신규성 및 진보성 요구',
                                    '特許法 第36条 (명세서): 실시 가능 요건 엄격',
                                    '特許法 제39조 (선원주의): 먼저 출원한 자에게 권리 부여'
                                ],
                                특징: 'JPO 높은 심사 품질, 보정 기회 제한적, 분할 출원 활발'
                            },
                            {
                                flag: '🇺🇸',
                                country: '미국',
                                laws: [
                                    '35 USC §101 (특허 적격성): 추상적 아이디어, 자연법칙, 자연현상은 특허 불가',
                                    '35 USC §102 (신규성): 선행기술 대비 신규할 것',
                                    '35 USC §103 (자명성): 통상의 기술자에게 자명하지 않을 것',
                                    '35 USC §112 (명세서): Written Description, Enablement, Best Mode'
                                ],
                                특징: 'USPTO 소프트웨어·비즈니스모델 특허 엄격 (Alice 판결), 특허심판위원회(PTAB) 무효심판'
                            },
                            {
                                flag: '🇪🇺',
                                country: '유럽',
                                laws: [
                                    'EPC Article 52 (특허 대상): 컴퓨터 프로그램, 수학적 방법은 "그 자체"로 특허 불가',
                                    'EPC Article 54 (신규성): 선행기술 state of the art 대비 신규할 것',
                                    'EPC Article 56 (진보성): 통상의 기술자에게 자명하지 않을 것 (Problem-Solution Approach)',
                                    'EPC Article 83 (실시 가능 요건): 충분한 개시 필요'
                                ],
                                특징: 'EPO 38개국 단일 절차, 소프트웨어 "기술적 기여" 입증 필수, 이의신청 제도'
                            }
                        ].map(item =>
                            React.createElement('div', {
                                key: item.country,
                                className: 'bg-white border-2 border-gray-300 rounded-xl p-6'
                            },
                                React.createElement('h5', { className: 'text-2xl font-bold text-gray-800 mb-3' },
                                    `${item.flag} ${item.country}`
                                ),
                                React.createElement('div', { className: 'space-y-2 mb-4' },
                                    item.laws.map((law, idx) =>
                                        React.createElement('p', {
                                            key: idx,
                                            className: 'text-sm text-gray-700 pl-4 border-l-2 border-blue-300'
                                        }, law)
                                    )
                                ),
                                React.createElement('div', { className: 'bg-blue-50 rounded-lg p-3' },
                                    React.createElement('p', { className: 'text-sm font-semibold text-blue-800' },
                                        `📌 특징: ${item.특징}`
                                    )
                                )
                            )
                        )
                    )
                ),
                
                // 평가 방법론
                React.createElement('div', { className: 'bg-green-50 rounded-xl p-6' },
                    React.createElement('h4', { className: 'text-xl font-bold text-green-800 mb-3' }, '🤖 AI 평가 방법론'),
                    React.createElement('div', { className: 'space-y-3 text-gray-700' },
                        React.createElement('p', {}, '1️⃣ 학습 데이터: 한국 28,000건, 중국 45,000건, 일본 32,000건, 미국 68,000건, 유럽 22,000건 심판 결정례 학습'),
                        React.createElement('p', {}, '2️⃣ 법령 매칭: 출원 발명의 기술 분야·청구항을 각국 특허법 조문과 매칭'),
                        React.createElement('p', {}, '3️⃣ 선행기술 검색: 글로벌 특허 DB (KIPRIS, CNIPA, JPO, USPTO, EPO) 교차 검색'),
                        React.createElement('p', {}, '4️⃣ 거절 사유 예측: 각국 심사기준에 따른 거절이유 가능성 분석'),
                        React.createElement('p', {}, '5️⃣ 등록 확률 산출: 과거 유사 사례의 등록률 + AI 판단 종합하여 % 산출'),
                        React.createElement('div', { className: 'bg-white rounded-lg p-4 mt-3' },
                            React.createElement('p', { className: 'font-semibold text-green-800 mb-2' }, '✅ 신뢰도 검증:'),
                            React.createElement('p', { className: 'text-sm' }, '• 한국 실제 등록률 대비 AI 예측 오차: ±3.2%'),
                            React.createElement('p', { className: 'text-sm' }, '• 과거 데이터 기반 정확도: 89.7%')
                        )
                    )
                ),
                
                // 평가 결과 예시
                React.createElement('div', {},
                    React.createElement('h4', { className: 'text-xl font-bold text-gray-800 mb-3' }, '📊 평가 결과 예시'),
                    React.createElement('div', { className: 'bg-gray-100 rounded-xl p-6' },
                        React.createElement('p', { className: 'font-semibold text-gray-800 mb-4' }, '발명: "AI 기반 자동 특허 심사 시스템"'),
                        React.createElement('div', { className: 'space-y-3' },
                            [
                                { country: '🇰🇷 한국', prob: 85, reason: '국내 선행기술 검색 결과 유사 출원 없음. 진보성 인정 가능' },
                                { country: '🇨🇳 중국', prob: 72, reason: '软件专利 심사 엄격. 하드웨어 연계 강조 필요' },
                                { country: '🇯🇵 일본', prob: 80, reason: '실시 가능 요건 충족. 보정 전략 필요' },
                                { country: '🇺🇸 미국', prob: 68, reason: 'Alice 판결 적용 위험. §101 기술적 개선 강조 필요' },
                                { country: '🇪🇺 유럽', prob: 65, reason: 'Technical contribution 입증 필요. 명확한 기술적 효과 제시' }
                            ].map(item =>
                                React.createElement('div', {
                                    key: item.country,
                                    className: 'bg-white rounded-lg p-4'
                                },
                                    React.createElement('div', { className: 'flex justify-between items-center mb-2' },
                                        React.createElement('span', { className: 'font-semibold' }, item.country),
                                        React.createElement('span', { className: 'text-2xl font-bold text-purple-600' }, `${item.prob}%`)
                                    ),
                                    React.createElement('p', { className: 'text-sm text-gray-600' }, `💡 ${item.reason}`)
                                )
                            )
                        )
                    )
                )
            )
        )
    );
}
