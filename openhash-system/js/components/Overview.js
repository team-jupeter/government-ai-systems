const Overview = () => {
    const features = [
        {
            icon: 'fa-shield-halved',
            title: '확률적 계층 선택',
            description: 'SHA-256 재해싱 기반 확률적 알고리즘으로 Layer 1(70%), Layer 2(20%), Layer 3(10%) 자동 분배'
        },
        {
            icon: 'fa-bolt',
            title: '고성능 처리',
            description: '초당 424만 트랜잭션 처리, 비트코인 대비 60만배 이상 빠른 처리 속도'
        },
        {
            icon: 'fa-leaf',
            title: '에너지 효율',
            description: '작업증명/지분증명 불필요, 비트코인 대비 98.5% 에너지 절감 (121 TWh → 1.8 TWh/년)'
        },
        {
            icon: 'fa-arrows-up-down-left-right',
            title: '무한 확장성',
            description: '노드 수 증가에 비례하여 처리량 선형 증가, 병목 현상 없는 확장 가능 구조'
        },
        {
            icon: 'fa-lock',
            title: '데이터 무결성',
            description: 'Merkle Tree 기반 검증, BLS 서명, 계층 간 상호 검증으로 위변조 방지'
        },
        {
            icon: 'fa-microchip',
            title: '양자 내성',
            description: 'CRYSTALS-Dilithium 포스트퀀텀 암호화 적용, 미래 양자컴퓨터 공격 대비'
        }
    ];

    return (
        <section className="py-16 bg-gov-gray">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gov-text mb-4">핵심 기술 특징</h3>
                    <p className="text-gov-text-secondary">기존 통신 인프라를 활용한 혁신적인 분산 신뢰 시스템</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-sm border border-gov-border p-6 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-gov-blue bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                                <i className={`fas ${feature.icon} text-gov-blue text-xl`}></i>
                            </div>
                            <h4 className="text-lg font-bold text-gov-text mb-2">{feature.title}</h4>
                            <p className="text-sm text-gov-text-secondary leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
