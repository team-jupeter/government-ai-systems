// 시스템 개요 컴포넌트 (정부 표준 디자인)
const Overview = () => {
    const [expandedMetric, setExpandedMetric] = React.useState(null);
    const [expandedFeature, setExpandedFeature] = React.useState(null);
    const [expandedImpact, setExpandedImpact] = React.useState(null);
    const [expandedInnovation, setExpandedInnovation] = React.useState(false);

    const performanceMetrics = [
        { 
            icon: 'tachometer-alt', 
            title: '처리 속도', 
            value: '0.015ms',
            detail: {
                description: 'FPGA 기반 BN254 타원곡선 페어링 연산',
                specs: [
                    'BN254 페어링: 0.015ms',
                    '스칼라 곱셈: 0.008ms',
                    'SHA-256: 0.001ms',
                    'ECDSA 검증: 0.006ms'
                ],
                comparison: 'GPU 대비 8.8배, CPU 대비 6,333배 빠름'
            }
        },
        { 
            icon: 'check-circle', 
            title: '검증 정확도', 
            value: '99.4%',
            detail: {
                description: 'BERT+CNN+LSTM 앙상블 AI 검증',
                specs: [
                    '정확도: 99.4% (994/1,000)',
                    '정밀도: 98.0%',
                    '재현율: 99.5%',
                    'F1-Score: 98.5%'
                ],
                comparison: '2025년 9월 AWS 실증실험 결과'
            }
        },
        { 
            icon: 'leaf', 
            title: '전력 절감', 
            value: '88.6%',
            detail: {
                description: 'GPU 대비 전력 소비 88.6% 절감',
                specs: [
                    'FPGA: 15W',
                    'GPU: 132W',
                    'CPU: 95W',
                    'CO₂ 감축: 845kg/년'
                ],
                comparison: '친환경 저전력 설계'
            }
        },
        { 
            icon: 'server', 
            title: '처리량', 
            value: '100K TPS',
            detail: {
                description: '초당 100,000건 동시 처리',
                specs: [
                    '피크: 100,000 TPS',
                    '지연: 0.015ms',
                    '접속: 1,000,000명',
                    '가용성: 99.99%'
                ],
                comparison: '비트코인 대비 14,285배'
            }
        }
    ];

    const mainFeatures = [
        {
            icon: 'microchip',
            title: 'FPGA 하드웨어',
            value: '400MHz',
            detail: {
                overview: 'Xilinx Virtex UltraScale+ FPGA 기반 초고속 암호화',
                specs: [
                    '칩셋: VU9P',
                    '주파수: 400MHz+',
                    'DSP: 1,757개',
                    'BRAM: 1,685개'
                ],
                technology: '병렬 모듈러 곱셈, 파이프라인 구조'
            }
        },
        {
            icon: 'brain',
            title: 'AI 검증',
            value: '99.4%',
            detail: {
                overview: 'BERT+CNN+LSTM 앙상블 거래 검증',
                specs: [
                    'BERT: 0.008ms',
                    'CNN: 0.004ms',
                    'LSTM: 0.003ms',
                    '앙상블 의사결정'
                ],
                technology: '적대적 공격 방어 95%+'
            }
        },
        {
            icon: 'file-invoice',
            title: '재무제표',
            value: '실시간',
            detail: {
                overview: 'AI 기반 실시간 재무제표 자동 생성',
                specs: [
                    'AI 분류: 99%+',
                    '대차균형: 0.001ms',
                    '4대 재무제표',
                    '분식회계 탐지'
                ],
                technology: 'OpenHash 무결성 보장'
            }
        },
        {
            icon: 'calculator',
            title: '세무 자동화',
            value: '완전 자동',
            detail: {
                overview: '소득/비용부터 신고/납부까지 완전 자동화',
                specs: [
                    '개인세: 0.002ms',
                    '법인세: 0.003ms',
                    '부가세: 자동',
                    '글로벌 지원'
                ],
                technology: '가산세 방지, 자동 보관'
            }
        },
        {
            icon: 'link',
            title: '크로스체인',
            value: '60초',
            detail: {
                overview: 'Lock-and-Mint 방식 자산 이동',
                specs: [
                    'Ethereum: 15초',
                    'BSC: 3초',
                    'Polygon: 2초',
                    'ACID 보장'
                ],
                technology: '다중서명, 영지식증명'
            }
        },
        {
            icon: 'building-columns',
            title: '통합 금융',
            value: '3부문',
            detail: {
                overview: '은행+보험+증권 통합 서비스',
                specs: [
                    '은행: 예대출결제',
                    '보험: AI평가',
                    '증권: 포트폴리오',
                    'AI 신용평가'
                ],
                technology: '수수료 75-83% 절감'
            }
        }
    ];

    const economicImpact = [
        { 
            category: '개인', 
            value: '492만원',
            icon: 'user',
            detail: {
                breakdown: [
                    { item: '세무', amount: '100만원' },
                    { item: '금융', amount: '240만원' },
                    { item: '시간', amount: '152만원' }
                ],
                note: '4인 가족 연 2,000만원'
            }
        },
        { 
            category: '중소기업', 
            value: '2,580만원',
            icon: 'building',
            detail: {
                breakdown: [
                    { item: '세무회계', amount: '1,200만원' },
                    { item: '금융', amount: '980만원' },
                    { item: '인건비', amount: '400만원' }
                ],
                note: '직원 10명 기준'
            }
        },
        { 
            category: '금융기관', 
            value: '12.75억',
            icon: 'landmark',
            detail: {
                breakdown: [
                    { item: '인건비', amount: '7.5억' },
                    { item: '시스템', amount: '3.75억' },
                    { item: '컴플라이언스', amount: '1.5억' }
                ],
                note: '지점당 연간'
            }
        }
    ];

    const CompactCard = ({ icon, title, value, onClick, isExpanded }) => (
        <div 
            onClick={onClick}
            className={`bg-white border-2 rounded-lg p-4 cursor-pointer transition-all hover:border-gov-blue hover:shadow-md ${
                isExpanded ? 'border-gov-blue shadow-md' : 'border-gray-300'
            }`}
        >
            <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 bg-gov-blue rounded-lg flex items-center justify-center">
                    <i className={`fas fa-${icon} text-white text-xl`}></i>
                </div>
                <h3 className="text-sm font-bold text-gray-900">{title}</h3>
                <div className="text-lg font-bold text-gov-blue">{value}</div>
                <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} text-gray-400 text-sm`}></i>
            </div>
        </div>
    );

    return (
        <div className="space-y-12">
            {/* 핵심 성능 지표 */}
            <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-gov-blue pl-4">
                    핵심 성능 지표
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {performanceMetrics.map((metric, index) => (
                        <CompactCard
                            key={index}
                            {...metric}
                            onClick={() => setExpandedMetric(expandedMetric === index ? null : index)}
                            isExpanded={expandedMetric === index}
                        />
                    ))}
                </div>
                {expandedMetric !== null && (
                    <div className="mt-4 bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
                        <h4 className="font-bold text-lg text-gray-900 mb-3">
                            {performanceMetrics[expandedMetric].detail.description}
                        </h4>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h5 className="font-semibold text-gray-700 mb-2 text-sm">주요 사양</h5>
                                <div className="space-y-2">
                                    {performanceMetrics[expandedMetric].detail.specs.map((spec, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                            <span className="text-gov-blue">•</span>
                                            <span>{spec}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-blue-50 rounded p-4 border-l-4 border-gov-blue">
                                <p className="text-sm text-gray-700">
                                    <strong>비교:</strong> {performanceMetrics[expandedMetric].detail.comparison}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* 주요 기능 */}
            <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-gov-blue pl-4">
                    주요 기능
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {mainFeatures.map((feature, index) => (
                        <CompactCard
                            key={index}
                            {...feature}
                            onClick={() => setExpandedFeature(expandedFeature === index ? null : index)}
                            isExpanded={expandedFeature === index}
                        />
                    ))}
                </div>
                {expandedFeature !== null && (
                    <div className="mt-4 bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
                        <h4 className="font-bold text-lg text-gray-900 mb-3">
                            {mainFeatures[expandedFeature].detail.overview}
                        </h4>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h5 className="font-semibold text-gray-700 mb-2 text-sm">주요 사양</h5>
                                <div className="space-y-2">
                                    {mainFeatures[expandedFeature].detail.specs.map((spec, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                            <span className="text-gov-blue">•</span>
                                            <span>{spec}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-green-50 rounded p-4 border-l-4 border-green-600">
                                <p className="text-sm text-gray-700">
                                    <strong>핵심 기술:</strong> {mainFeatures[expandedFeature].detail.technology}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* 경제적 효과 */}
            <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-gov-blue pl-4">
                    경제적 효과 (연간 절감액)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {economicImpact.map((impact, index) => (
                        <CompactCard
                            key={index}
                            {...impact}
                            onClick={() => setExpandedImpact(expandedImpact === index ? null : index)}
                            isExpanded={expandedImpact === index}
                        />
                    ))}
                </div>
                {expandedImpact !== null && (
                    <div className="mt-4 bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
                        <h4 className="font-bold text-lg text-gray-900 mb-4">상세 절감 내역</h4>
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                            {economicImpact[expandedImpact].detail.breakdown.map((item, idx) => (
                                <div key={idx} className="bg-white border-2 border-gray-200 rounded p-4">
                                    <div className="text-sm font-semibold text-gray-700 mb-1">{item.item}</div>
                                    <div className="text-xl font-bold text-green-700">{item.amount}</div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-blue-50 rounded p-4 border-l-4 border-gov-blue">
                            <p className="text-sm text-gray-700">
                                <strong>참고:</strong> {economicImpact[expandedImpact].detail.note}
                            </p>
                        </div>
                    </div>
                )}
            </section>

            {/* 기술 혁신성 */}
            <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-gov-blue pl-4">
                    기술 혁신성
                </h2>
                <div 
                    onClick={() => setExpandedInnovation(!expandedInnovation)}
                    className={`bg-white border-2 rounded-lg p-6 cursor-pointer transition-all hover:border-gov-blue hover:shadow-md ${
                        expandedInnovation ? 'border-gov-blue shadow-md' : 'border-gray-300'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">기존 시스템의 한계 vs 본 시스템의 혁신</h3>
                            <p className="text-sm text-gray-600 mt-1">상세 비교 보기</p>
                        </div>
                        <i className={`fas fa-chevron-${expandedInnovation ? 'up' : 'down'} text-gray-400 text-xl`}></i>
                    </div>
                </div>
                {expandedInnovation && (
                    <div className="mt-4 bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-lg font-bold text-red-700 mb-4">기존 시스템의 한계</h4>
                                <div className="space-y-2">
                                    <div className="bg-white border-l-4 border-red-500 p-3 rounded">
                                        <p className="text-sm text-gray-800">비트코인: 초당 7건 (1-2초)</p>
                                    </div>
                                    <div className="bg-white border-l-4 border-red-500 p-3 rounded">
                                        <p className="text-sm text-gray-800">Meta Libra: 3-5초 처리</p>
                                    </div>
                                    <div className="bg-white border-l-4 border-orange-500 p-3 rounded">
                                        <p className="text-sm text-gray-800">기능 분산 운영</p>
                                    </div>
                                    <div className="bg-white border-l-4 border-red-500 p-3 rounded">
                                        <p className="text-sm text-gray-800">과도한 전력 (GPU 132W)</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-green-700 mb-4">본 시스템의 혁신</h4>
                                <div className="space-y-2">
                                    <div className="bg-white border-l-4 border-green-600 p-3 rounded">
                                        <p className="text-sm text-gray-800">0.015ms (3,333배 향상)</p>
                                    </div>
                                    <div className="bg-white border-l-4 border-green-600 p-3 rounded">
                                        <p className="text-sm text-gray-800">완전 자율 금융 통합</p>
                                    </div>
                                    <div className="bg-white border-l-4 border-green-600 p-3 rounded">
                                        <p className="text-sm text-gray-800">실시간 재무제표</p>
                                    </div>
                                    <div className="bg-white border-l-4 border-green-600 p-3 rounded">
                                        <p className="text-sm text-gray-800">88.6% 전력 절감 (15W)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

window.Overview = Overview;
