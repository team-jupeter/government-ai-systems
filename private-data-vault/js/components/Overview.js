const { useState } = React;

function Overview() {
    const [expandedCard, setExpandedCard] = useState(null);

    const features = [
        {
            id: 0,
            icon: 'fa-user-shield',
            title: '개인정보 주권',
            desc: '원본 데이터는 오직 소유자만 보유',
            details: {
                subtitle: '완전한 데이터 소유권 보장',
                content: [
                    '모든 원본 데이터는 사용자의 단말기에만 AES-256으로 암호화되어 저장됩니다.',
                    '클라우드나 서버에는 SHA-256 해시값(32바이트)만 기록되어 원본 데이터는 절대 노출되지 않습니다.',
                    '사용자만이 복호화 키를 소유하며, 제3자는 사용자의 명시적 승인 없이 원본 데이터에 접근할 수 없습니다.',
                    'Master Key는 PBKDF2HMAC(SHA-256, 100,000 iterations)로 생성되어 Secure Enclave에 저장됩니다.'
                ],
                stats: [
                    { label: '암호화', value: 'AES-256-CBC' },
                    { label: '복호화 키 보관', value: 'Secure Enclave' },
                    { label: '클라우드 저장', value: '해시만 (32B)' }
                ]
            }
        },
        {
            id: 1,
            icon: 'fa-table',
            title: '확장 재무제표',
            desc: '6하 원칙 기반 모든 활동 기록',
            details: {
                subtitle: '체계적인 활동 기록 시스템',
                content: [
                    '6하 원칙(누가, 언제, 어디서, 무엇을, 어떻게, 왜)에 따라 모든 경제활동과 일상 활동을 구조화하여 기록합니다.',
                    '금전 거래의 경우 자동으로 복식부기(차변/대변) 구조가 생성되어 회계 투명성을 확보합니다.',
                    '거래 유형별(금전, 물품, 서비스, 정보, 일반 활동) 맞춤형 템플릿을 제공합니다.',
                    '모든 레코드는 타임스탬프와 함께 해시 체인으로 연결되어 위변조가 불가능합니다.'
                ],
                stats: [
                    { label: '기록 원칙', value: '6하 원칙' },
                    { label: '거래 유형', value: '5가지' },
                    { label: '무결성 보장', value: '해시 체인' }
                ]
            }
        },
        {
            id: 2,
            icon: 'fa-check-double',
            title: '교차 검증',
            desc: '거래 당사자 간 자동 검증',
            details: {
                subtitle: '실시간 허위 데이터 탐지',
                content: [
                    '거래의 양 당사자가 각각 기록한 데이터의 해시값을 자동으로 비교합니다.',
                    '금액, 날짜, 내용 등이 일치하지 않으면 즉시 불일치를 감지하고 경고를 발송합니다.',
                    '교차 검증 해시(Cross-Verification Hash)를 생성하여 양측의 합의를 증명합니다.',
                    'AWS 실증 실험에서 100만원 vs 50만원 거래 불일치를 0.1초 내 탐지했습니다.'
                ],
                stats: [
                    { label: '탐지 속도', value: '< 0.1초' },
                    { label: '정확도', value: '100%' },
                    { label: '허위 방지', value: '실시간' }
                ]
            }
        },
        {
            id: 3,
            icon: 'fa-certificate',
            title: '활동 증명',
            desc: '법적 증명력 있는 증명서 발급',
            details: {
                subtitle: '블록체인 수준의 법적 증명력',
                content: [
                    '재직, 소득, 학력, 의료, 거래 등 다양한 활동에 대한 공식 증명서를 발급합니다.',
                    'BLS 서명과 Merkle Proof를 통해 위변조 방지 및 검증 가능성을 보장합니다.',
                    '증명서는 고유 ID와 QR 코드를 포함하며, 온라인 검증 URL을 통해 즉시 확인 가능합니다.',
                    '해시 체인 기반으로 과거 레코드와의 연결성이 암호학적으로 증명됩니다.'
                ],
                stats: [
                    { label: '서명 방식', value: 'BLS + Merkle' },
                    { label: '법적 효력', value: '완전 보장' },
                    { label: '검증', value: 'QR + URL' }
                ]
            }
        },
        {
            id: 4,
            icon: 'fa-landmark',
            title: '당국 통보',
            desc: '해시값만 전송, 프라이버시 보호',
            details: {
                subtitle: '프라이버시를 지키는 투명성',
                content: [
                    '거래의 메타데이터를 분석하여 관련 법규(소득세법, 부가세법, 의료법 등)를 자동 확인합니다.',
                    '원본 데이터가 아닌 해시값과 최소한의 요약 정보만 해당 당국(국세청, 금융감독원 등)에 전송합니다.',
                    '개인 식별 정보는 익명화되며, RSA-4096 암호화 + TLS 1.3으로 안전하게 전송됩니다.',
                    '투명성과 프라이버시를 동시에 달성하여 탈세는 방지하되 개인정보는 완벽히 보호합니다.'
                ],
                stats: [
                    { label: '전송 내용', value: '해시 + 요약' },
                    { label: '암호화', value: 'RSA-4096' },
                    { label: '프라이버시', value: '100% 보호' }
                ]
            }
        },
        {
            id: 5,
            icon: 'fa-tachometer-alt',
            title: '초고속 처리',
            desc: '블록체인 대비 1,727~3,701배',
            details: {
                subtitle: 'AWS 실증 검증된 성능',
                content: [
                    '25,907 TPS (Transactions Per Second)를 달성하여 비트코인(7 TPS) 대비 3,701배, 이더리움(15 TPS) 대비 1,727배 빠릅니다.',
                    '트랜잭션 확인 시간은 0.05초로, 비트코인(60분)이나 이더리움(6분)과 비교가 불가능한 실시간 처리를 제공합니다.',
                    '4계층 구조(Edge Device 70%, Edge Server 20%, Core Engine 9%, Cloud Archive 1%)로 부하를 분산합니다.',
                    '에너지 효율은 98.5%로, 비트코인(121 TWh/년) 대비 1.8 TWh/년만 소비합니다.'
                ],
                stats: [
                    { label: 'TPS', value: '25,907+' },
                    { label: '확인 시간', value: '0.05초' },
                    { label: '에너지 절감', value: '98.5%' }
                ]
            }
        }
    ];

    const handleCardClick = (id) => {
        if (expandedCard === id) {
            setExpandedCard(null);
        } else {
            setExpandedCard(id);
        }
    };

    return (
        <div className="space-y-6">
            {/* 히어로 섹션 */}
            <div className="bg-gradient-to-r from-gov-blue to-gov-blue-light text-white rounded-lg shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-3">
                    오픈해시 기반 프라이빗 데이터 금고 (PDV)
                </h2>
                <p className="text-sm mb-4 opacity-90">
                    개인정보 주권을 보장하는 차세대 데이터 관리 시스템
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white bg-opacity-20 rounded p-3 text-center">
                        <div className="text-2xl font-bold">25,907+</div>
                        <div className="text-xs opacity-90">TPS</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded p-3 text-center">
                        <div className="text-2xl font-bold">98.5%</div>
                        <div className="text-xs opacity-90">에너지 절감</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded p-3 text-center">
                        <div className="text-2xl font-bold">98.9%</div>
                        <div className="text-xs opacity-90">정확도</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded p-3 text-center">
                        <div className="text-2xl font-bold">32B</div>
                        <div className="text-xs opacity-90">클라우드 저장</div>
                    </div>
                </div>
            </div>

            {/* 6대 핵심 기능 */}
            <div>
                <h3 className="text-lg font-bold text-gov-text mb-3">6대 핵심 기능</h3>
                
                {/* 첫 번째 행 (카드 0, 1, 2) */}
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

                {/* 확장 영역 (첫 행과 둘째 행 사이) */}
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

                            {/* 상세 내용 */}
                            <div className="space-y-3 mb-4">
                                {features[expandedCard].details.content.map((paragraph, idx) => (
                                    <p key={idx} className="text-sm text-gray-700 leading-relaxed">
                                        • {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* 통계 */}
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

                {/* 두 번째 행 (카드 3, 4, 5) */}
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
