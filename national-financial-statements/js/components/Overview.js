const { useState } = React;

function Overview() {
    const [expandedCard, setExpandedCard] = useState(null);

    const features = [
        {
            id: 0,
            icon: 'fa-sitemap',
            title: '5계층 하이브리드',
            desc: '국가데이터처 중심 503만+ 노드',
            details: {
                subtitle: '전국 통합 데이터 네트워크 구조',
                content: [
                    'Layer 0: 국가데이터처 통합 관리 센터 (대전·서울·부산) - 통계 기준 설정, 데이터 거버넌스, 정책 수립',
                    'Layer 1: 503만+ 노드 (중앙부처 18개, 지자체 226개, 병원 3,500개, 학교 24,000개, 교통 302개, 시장 1,500개, 개인 500만+)',
                    'Layer 2: 32개 광역시도/통신 Edge (17개 광역시도 + KT/SK/LG U+ 15개)',
                    'Layer 3: 10개 Representative Core (국가정보자원관리원, AWS GovCloud, Azure Government)',
                    'Layer 4: 국가·글로벌 Archive (국가기록원, AWS Glacier, Azure, Google Cloud)'
                ],
                stats: [
                    { label: '총 노드', value: '503만+' },
                    { label: '계층 구조', value: '5계층' },
                    { label: '전국 커버리지', value: '100%' }
                ]
            }
        },
        {
            id: 1,
            icon: 'fa-chart-network',
            title: '확률적 계층 선택',
            desc: '노드 타입별 동적 할당',
            details: {
                subtitle: 'SHA-512 기반 스마트 라우팅',
                content: [
                    '국가통계: Layer 0 직접 처리 (최고 우선순위) - 인구주택총조사, 경제활동인구조사 등',
                    '개인: Layer 1 95%, Layer 2 5% - 개인정보 주권 보장',
                    '기관: Layer 1 60%, Layer 2 25%, Layer 3 15% - 중요도별 차등 배치',
                    '민간중요(병원·학교): Layer 1 50%, Layer 2 30%, Layer 3 20%',
                    'Kolmogorov-Smirnov 테스트로 균등분포 검증 (p-value 0.87)'
                ],
                stats: [
                    { label: '알고리즘', value: 'SHA-512' },
                    { label: '균등분포', value: 'p=0.87' },
                    { label: '동적 스케일링', value: '실시간' }
                ]
            }
        },
        {
            id: 2,
            icon: 'fa-robot',
            title: 'AI 멀티에이전트',
            desc: 'PIPA/AI법/GDPR 자동 검증',
            details: {
                subtitle: 'Llama 3.1 Fine-tuned 법규 준수',
                content: [
                    'Llama 3.1 8B Instruct 모델 Fine-tuning (Learning Rate 2e-5, Batch Size 32)',
                    'PIPA 72개 조문, AI 기본법 53개 조문, 통계법 48개 조문, 전자정부법 87개 조문 학습',
                    'k-익명성(k=5) 자동 적용으로 준식별자 일반화',
                    '법적 준수 검증: 2.3초 (기존 14일 대비 99.998% 단축)',
                    'SHAP 분석으로 AI 판단 근거 설명 가능 (XAI)'
                ],
                stats: [
                    { label: '검증 시간', value: '2.3초' },
                    { label: '학습 법규', value: '260개 조문' },
                    { label: 'AI 모델', value: 'Llama 3.1' }
                ]
            }
        },
        {
            id: 3,
            icon: 'fa-shield-check',
            title: '통계 신뢰성',
            desc: '오픈해시 기록으로 독립성 보장',
            details: {
                subtitle: '정치적 압력 차단 메커니즘',
                content: [
                    '통계 생성 전 과정(조사 계획→응답 수집→집계→검증→승인)을 오픈해시에 타임스탬프 기록',
                    '정부 부처·청와대·대통령실의 통계 수정 요청을 Layer 0에서 기록 및 공개',
                    '국회 및 국민이 오픈해시 기록을 조회하여 투명하게 감시',
                    '국가데이터처 처장 BLS 서명으로 통계 신뢰성 국가 보증',
                    '통계 작성 독립성 지수를 오픈해시 기반으로 산출하여 국제 비교'
                ],
                stats: [
                    { label: '위변조', value: '불가능' },
                    { label: '투명성', value: '100%' },
                    { label: '신뢰도 향상', value: '+15%p' }
                ]
            }
        },
        {
            id: 4,
            icon: 'fa-exchange-alt',
            title: '부처 간 연계',
            desc: '450억원 → 0원 (비용 절감)',
            details: {
                subtitle: 'Open API 자동 연계',
                content: [
                    'AI 에이전트가 법적 근거(전자정부법, 사회보장급여법 등) 자동 검증',
                    'ISO/IEC 22989 빅데이터 표준에 따라 데이터 형식 자동 변환',
                    'k-익명성(k=5) 적용으로 개인정보 보호하며 실시간 전달 (평균 15초)',
                    '부처 간 개별 협약 없이 데이터 연계 자동화',
                    '연간 450억 원 비용을 0원으로 절감 (100% 절감)'
                ],
                stats: [
                    { label: '비용 절감', value: '450억→0원' },
                    { label: '연계 시간', value: '15초' },
                    { label: '자동화', value: '100%' }
                ]
            }
        },
        {
            id: 5,
            icon: 'fa-user-shield',
            title: '데이터 주권',
            desc: '개인정보 자기결정권 보장',
            details: {
                subtitle: '글로벌 플랫폼 대항 국가 주권',
                content: [
                    '개인 단말기에서 동의 기반으로만 데이터 해시(137 bytes) 전송',
                    '원본은 단말기에 보관, 국가데이터처는 해시만으로 통계 생성',
                    'PIPA 삭제권 행사 시 Layer 4 재조회 차단 (Merkle Tree로 무결성 유지)',
                    'GDPR Article 20 데이터 이동권: JSON 형식 export',
                    '글로벌 플랫폼의 개인정보 해외 반출 차단'
                ],
                stats: [
                    { label: '원본 보관', value: '단말기만' },
                    { label: '전송 크기', value: '137B' },
                    { label: 'GDPR 준수', value: '완전' }
                ]
            }
        }
    ];

    const handleCardClick = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    return (
        <div className="space-y-6">
            {/* 히어로 섹션 */}
            <div className="bg-gradient-to-r from-gov-blue to-gov-blue-light text-white rounded-lg shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-3">
                    오픈해시 기반 국가데이터처 통합 데이터 네트워크
                </h2>
                <p className="text-sm mb-4 opacity-90">
                    503만+ 노드를 5계층 하이브리드 구조로 통합하는 국가 데이터 인프라
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white bg-opacity-20 rounded p-3 text-center">
                        <div className="text-2xl font-bold">424만</div>
                        <div className="text-xs opacity-90">TPS</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded p-3 text-center">
                        <div className="text-2xl font-bold">2.3초</div>
                        <div className="text-xs opacity-90">법규 검증</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded p-3 text-center">
                        <div className="text-2xl font-bold">450억→0</div>
                        <div className="text-xs opacity-90">연계비용(원)</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded p-3 text-center">
                        <div className="text-2xl font-bold">98.5%</div>
                        <div className="text-xs opacity-90">에너지 절감</div>
                    </div>
                </div>
            </div>

            {/* 6대 핵심 기능 */}
            <div>
                <h3 className="text-lg font-bold text-gov-text mb-3">6대 핵심 기능</h3>
                
                {/* 첫 번째 행 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    {features.slice(0, 3).map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleCardClick(item.id)}
                            className={`bg-white border-2 rounded-lg p-4 hover:shadow-lg transition-all text-left ${
                                expandedCard === item.id
                                    ? 'border-gov-blue shadow-lg scale-105'
                                    : 'border-gov-border hover:border-gov-blue-light'
                            }`}
                        >
                            <div className="flex items-start space-x-3">
                                <div className={`p-2 rounded ${
                                    expandedCard === item.id ? 'bg-gov-blue' : 'bg-blue-50'
                                }`}>
                                    <i className={`fas ${item.icon} text-lg ${
                                        expandedCard === item.id ? 'text-white' : 'text-gov-blue'
                                    }`}></i>
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-sm text-gov-text">{item.title}</div>
                                    <div className="text-xs text-gray-600 mt-1">{item.desc}</div>
                                </div>
                                <i className={`fas fa-chevron-down text-gov-blue text-xs transition-transform ${
                                    expandedCard === item.id ? 'rotate-180' : ''
                                }`}></i>
                            </div>
                        </button>
                    ))}
                </div>

                {/* 확장 영역 */}
                <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        expandedCard !== null ? 'max-h-[600px] opacity-100 mb-3' : 'max-h-0 opacity-0'
                    }`}
                >
                    {expandedCard !== null && features[expandedCard] && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-gov-blue rounded-lg p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-bold text-gov-blue flex items-center">
                                    <i className={`fas ${features[expandedCard].icon} mr-2`}></i>
                                    {features[expandedCard].details.subtitle}
                                </h4>
                                <button
                                    onClick={() => setExpandedCard(null)}
                                    className="text-gov-blue hover:text-gov-blue-light"
                                >
                                    <i className="fas fa-times text-xl"></i>
                                </button>
                            </div>
                            <div className="space-y-3 mb-4">
                                {features[expandedCard].details.content.map((paragraph, idx) => (
                                    <p key={idx} className="text-sm text-gray-700 leading-relaxed">
                                        • {paragraph}
                                    </p>
                                ))}
                            </div>
                            <div className="grid grid-cols-3 gap-3 mt-4">
                                {features[expandedCard].details.stats.map((stat, idx) => (
                                    <div key={idx} className="bg-white rounded-lg p-3 text-center border border-gov-blue">
                                        <div className="text-xs text-gray-600 mb-1">{stat.label}</div>
                                        <div className="text-sm font-bold text-gov-blue">{stat.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* 두 번째 행 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {features.slice(3, 6).map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleCardClick(item.id)}
                            className={`bg-white border-2 rounded-lg p-4 hover:shadow-lg transition-all text-left ${
                                expandedCard === item.id
                                    ? 'border-gov-blue shadow-lg scale-105'
                                    : 'border-gov-border hover:border-gov-blue-light'
                            }`}
                        >
                            <div className="flex items-start space-x-3">
                                <div className={`p-2 rounded ${
                                    expandedCard === item.id ? 'bg-gov-blue' : 'bg-blue-50'
                                }`}>
                                    <i className={`fas ${item.icon} text-lg ${
                                        expandedCard === item.id ? 'text-white' : 'text-gov-blue'
                                    }`}></i>
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-sm text-gov-text">{item.title}</div>
                                    <div className="text-xs text-gray-600 mt-1">{item.desc}</div>
                                </div>
                                <i className={`fas fa-chevron-down text-gov-blue text-xs transition-transform ${
                                    expandedCard === item.id ? 'rotate-180' : ''
                                }`}></i>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
