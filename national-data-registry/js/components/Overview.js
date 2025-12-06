const { useState } = React;

function Overview() {
    const [expandedCard, setExpandedCard] = useState(null);

    const features = [
        {
            id: 0,
            icon: 'fa-chart-bar',
            title: '국가통계 생산',
            desc: '인구·경제·사회 통계 조사 및 발표',
            details: {
                subtitle: '신뢰할 수 있는 국가 기초 통계',
                content: [
                    '인구주택총조사, 경제활동인구조사, 가계동향조사 등 국가 핵심 통계를 생산합니다.',
                    '사회통계, 경제통계, 농어업통계 3대 분야를 중심으로 약 150여 종의 통계를 작성합니다.',
                    '소비자물가지수, GDP 기초자료 등 정책 결정의 근거가 되는 데이터를 제공합니다.',
                    '월간, 분기, 연간 등 조사 주기에 따라 체계적으로 통계를 생산·발표합니다.'
                ],
                stats: [
                    { label: '작성 통계', value: '150여 종' },
                    { label: '주요 분야', value: '사회·경제·농어업' },
                    { label: '조사 주기', value: '월/분기/연간' }
                ]
            }
        },
        {
            id: 1,
            icon: 'fa-network-wired',
            title: '데이터 총괄·조정',
            desc: '범정부 통계 표준화 및 품질 관리',
            details: {
                subtitle: '통일되고 신뢰할 수 있는 데이터 체계',
                content: [
                    '정부 각 부처에서 생산하는 통계의 기준을 설정하고 표준화합니다.',
                    '통계 작성 절차와 방법론을 검토하여 통계 품질을 관리합니다.',
                    '중복 통계를 정비하고 통계 간 정합성을 확보합니다.',
                    '범정부 데이터 거버넌스를 구축하여 데이터 기반 행정을 지원합니다.'
                ],
                stats: [
                    { label: '승인통계', value: '1,200여 종' },
                    { label: '작성기관', value: '400여 개' },
                    { label: '역할', value: '총괄·조정' }
                ]
            }
        },
        {
            id: 2,
            icon: 'fa-database',
            title: '데이터 연계·활용',
            desc: '국가통계 플랫폼 운영',
            details: {
                subtitle: '통합 데이터 서비스 제공',
                content: [
                    '국가통계포털(KOSIS)을 통해 모든 국가승인통계를 제공합니다.',
                    '통계지리정보서비스(SGIS)로 지도 기반 통계 시각화를 지원합니다.',
                    '마이크로데이터 통합서비스로 연구자의 심층 분석을 돕습니다.',
                    '통계데이터센터에서 공공·민간 데이터 융합 분석을 제공합니다.'
                ],
                stats: [
                    { label: 'KOSIS', value: '1,200종 통계' },
                    { label: 'SGIS', value: '지도 시각화' },
                    { label: '마이크로데이터', value: '원자료 제공' }
                ]
            }
        },
        {
            id: 3,
            icon: 'fa-share-nodes',
            title: '공공데이터 개방',
            desc: '데이터 민간 활용 촉진',
            details: {
                subtitle: '개방과 공유로 국민과 소통',
                content: [
                    '공공데이터의 제공 및 이용 활성화에 관한 법률에 따라 데이터를 개방합니다.',
                    '공공데이터포털을 통해 기계 판독 가능한 형태로 데이터를 제공합니다.',
                    '공공데이터 제공 책임관 및 전담팀을 운영하여 개방 업무를 추진합니다.',
                    'API, 파일 다운로드 등 다양한 방식으로 데이터 접근성을 높입니다.'
                ],
                stats: [
                    { label: '개방 방식', value: 'API/파일' },
                    { label: '데이터 형식', value: '기계 판독 가능' },
                    { label: '목표', value: '민간 활용 촉진' }
                ]
            }
        },
        {
            id: 4,
            icon: 'fa-globe',
            title: '국제 협력',
            desc: '글로벌 통계 네트워크',
            details: {
                subtitle: '세계 통계 발전에 기여',
                content: [
                    '2027년 제66차 국제통계협회(ISI) 세계통계대회를 부산에서 개최합니다.',
                    'UN, OECD 등 국제기구와 협력하여 통계 기준을 조화롭게 발전시킵니다.',
                    '개발도상국 통계 역량 강화를 위한 기술 지원을 제공합니다.',
                    '국제 통계 네트워크를 통해 최신 방법론과 기술을 공유합니다.'
                ],
                stats: [
                    { label: '2027년', value: 'ISI 대회 개최' },
                    { label: '협력', value: 'UN/OECD' },
                    { label: '역할', value: '기술 지원' }
                ]
            }
        },
        {
            id: 5,
            icon: 'fa-robot',
            title: 'AI 기반 통계 혁신',
            desc: 'OpenHash로 자동화·고도화',
            details: {
                subtitle: '차세대 통계 시스템',
                content: [
                    'AI 에이전트가 통계 작성, 검증, 분석 업무를 자동으로 수행합니다.',
                    'OpenHash 기술로 모든 통계 데이터의 무결성을 보장합니다.',
                    '빅데이터와 행정자료를 활용하여 통계 생산 비용을 절감합니다.',
                    '실시간 통계 업데이트와 예측 분석 기능을 제공합니다.'
                ],
                stats: [
                    { label: 'AI 정확도', value: '99.2%' },
                    { label: 'TPS', value: '542.7' },
                    { label: '효율화', value: '95%' }
                ]
            }
        }
    ];

    return (
        <div className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="section-title inline-block">국가데이터처 주요 기능</h2>
                    <p className="text-gov-text-secondary mt-4">
                        통계의 기준설정과 인구조사, 통계·데이터의 총괄·조정 및 각종 통계에 관한 사무를 관장합니다
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map(feature => (
                        <div key={feature.id} 
                             className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                             onClick={() => setExpandedCard(expandedCard === feature.id ? null : feature.id)}>
                            <div className="p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-gov-blue text-white rounded-lg p-3">
                                        <i className={`fas ${feature.icon} text-2xl`}></i>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-gov-text mb-2">{feature.title}</h3>
                                        <p className="text-sm text-gov-text-secondary">{feature.desc}</p>
                                    </div>
                                </div>

                                {expandedCard === feature.id && (
                                    <div className="mt-6 pt-6 border-t border-gray-200 animate-fadeIn">
                                        <h4 className="font-semibold text-gov-blue mb-3">{feature.details.subtitle}</h4>
                                        <ul className="space-y-2 mb-4">
                                            {feature.details.content.map((item, idx) => (
                                                <li key={idx} className="text-sm text-gray-700 flex items-start">
                                                    <i className="fas fa-check-circle text-gov-blue mt-1 mr-2 flex-shrink-0"></i>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100">
                                            {feature.details.stats.map((stat, idx) => (
                                                <div key={idx} className="text-center">
                                                    <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                                                    <div className="font-bold text-gov-blue text-sm">{stat.value}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
