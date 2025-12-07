// IntegratedFinance.js - 통합 금융 시스템
const IntegratedFinance = () => {
    const financialCategories = [
        {
            id: 'bank',
            name: '은행',
            icon: 'building-columns',
            color: 'blue',
            link: 'http://100.30.14.224/portal/bank.html'
        },
        {
            id: 'insurance',
            name: '보험',
            icon: 'shield-halved',
            color: 'green',
            link: 'http://100.30.14.224/portal/insurance.html'
        },
        {
            id: 'securities',
            name: '증권',
            icon: 'chart-line',
            color: 'purple',
            link: 'http://100.30.14.224/portal/securities.html'
        },
        {
            id: 'exchange',
            name: '거래소',
            icon: 'arrows-rotate',
            color: 'orange',
            link: 'http://100.30.14.224/portal/exchange.html'
        },
        {
            id: 'supervision',
            name: '감독',
            icon: 'gavel',
            color: 'red',
            link: 'http://100.30.14.224/portal/supervision.html'
        }
    ];

    return (
        <div className="space-y-6">
            {/* 페이지 제목 */}
            <div className="border-l-4 border-gov-blue pl-4 py-2">
                <h2 className="text-2xl font-bold text-gov-text">통합 금융 시스템</h2>
                <p className="text-sm text-gray-600 mt-1">EGCT 기반 금융 서비스 통합 플랫폼</p>
            </div>

            {/* 개요 */}
            <div className="bg-white border border-gray-300">
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-300">
                    <h3 className="text-lg font-bold text-gov-text">시스템 개요</h3>
                </div>
                <div className="p-6">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <p className="text-sm text-gray-700 leading-relaxed">
                            EGCT 디지털 화폐를 기반으로 은행, 보험, 증권, 거래소, 감독기관이 통합된 차세대 금융 플랫폼입니다. 
                            OpenHash 분산원장 기술과 FPGA 기반 AI 검증으로 안전하고 효율적인 금융 서비스를 제공합니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* 금융 카테고리 */}
            <div className="bg-white border border-gray-300">
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-300">
                    <h3 className="text-lg font-bold text-gov-text">금융 서비스 카테고리</h3>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {financialCategories.map((category) => (
                            
                                key={category.id}
                                href={category.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block border border-gray-300 hover:border-gov-blue transition-colors"
                            >
                                <div className="p-6 text-center">
                                    <div className="mb-4">
                                        <i className={`fas fa-${category.icon} text-4xl text-${category.color}-600`}></i>
                                    </div>
                                    <h4 className="text-lg font-bold text-gov-text mb-2">{category.name}</h4>
                                    <div className="text-xs text-gray-600">
                                        클릭하여 이동
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* 통합 금융의 장점 */}
            <div className="bg-white border border-gray-300">
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-300">
                    <h3 className="text-lg font-bold text-gov-text">통합 금융의 장점</h3>
                </div>
                <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                title: '실시간 결제',
                                items: [
                                    'EGCT 기반 즉시 송금 (수수료 0원)',
                                    'OpenHash 0.032ms 처리 속도',
                                    '24시간 365일 운영',
                                    '국내외 실시간 환전'
                                ]
                            },
                            {
                                title: '통합 관리',
                                items: [
                                    '은행·증권·보험 계좌 통합',
                                    '단일 플랫폼에서 전체 자산 조회',
                                    '통합 포트폴리오 관리',
                                    'AI 기반 자산 분석 및 추천'
                                ]
                            },
                            {
                                title: '높은 보안',
                                items: [
                                    'FPGA 기반 AI 검증 (99.4% 정확도)',
                                    'Hash Chain 융합으로 위변조 방지',
                                    'BLS 서명 집계로 Layer 간 안전한 통신',
                                    '양방향 검증 시스템 (5ms 내 이상 탐지)'
                                ]
                            },
                            {
                                title: '낮은 비용',
                                items: [
                                    '국가 운영 모델로 거래 수수료 0원',
                                    '에너지 소비 98.5% 절감',
                                    '중개 수수료 최소화',
                                    '운영 비용 절감으로 고객 혜택 증대'
                                ]
                            }
                        ].map((section, idx) => (
                            <div key={idx} className="border border-gray-300 p-4">
                                <h4 className="font-bold text-gov-text mb-3">{section.title}</h4>
                                <ul className="space-y-2">
                                    {section.items.map((item, i) => (
                                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                            <span className="text-gov-blue font-bold mt-1">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 기술 스택 */}
            <div className="bg-white border border-gray-300">
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-300">
                    <h3 className="text-lg font-bold text-gov-text">핵심 기술</h3>
                </div>
                <div className="p-6">
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">기술</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">설명</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">성능</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-medium">OpenHash</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">확률적 계층 선택 분산원장</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">481 TPS (실측)</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 font-medium">FPGA AI</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">하드웨어 가속 거래 검증</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">0.032ms, 99.4% 정확도</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-medium">BLS 서명</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">Layer 간 서명 집계</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">99.9% 대역폭 절감</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 font-medium">UTXO</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">비트코인 방식 거래 모델</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">이중 지불 방지</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 로드맵 */}
            <div className="bg-white border border-gray-300">
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-300">
                    <h3 className="text-lg font-bold text-gov-text">서비스 로드맵</h3>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        <div className="border-l-4 border-blue-500 pl-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="bg-blue-500 text-white px-3 py-1 text-sm font-bold">2026년</div>
                                <h4 className="font-bold text-gov-text">Phase 1: 화폐 교환 및 기본 금융</h4>
                            </div>
                            <div className="text-sm text-gray-700 space-y-1">
                                <div>• EGCT ↔ 국적화폐 실시간 교환</div>
                                <div>• 은행 계좌 통합 및 조회</div>
                                <div>• 기본 송금 및 결제 서비스</div>
                            </div>
                        </div>

                        <div className="border-l-4 border-green-600 pl-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="bg-green-600 text-white px-3 py-1 text-sm font-bold">2027년</div>
                                <h4 className="font-bold text-gov-text">Phase 2: 통합 금융 서비스</h4>
                            </div>
                            <div className="text-sm text-gray-700 space-y-1">
                                <div>• 증권·보험·거래소 통합</div>
                                <div>• 물품 및 서비스 결제</div>
                                <div>• AI 기반 자산 관리</div>
                                <div>• 글로벌 금융 네트워크 연동</div>
                            </div>
                        </div>

                        <div className="border-l-4 border-purple-600 pl-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="bg-purple-600 text-white px-3 py-1 text-sm font-bold">2028년</div>
                                <h4 className="font-bold text-gov-text">Phase 3: AI 금융 혁신</h4>
                            </div>
                            <div className="text-sm text-gray-700 space-y-1">
                                <div>• 완전 자동화된 포트폴리오 관리</div>
                                <div>• 실시간 리스크 분석 및 헤징</div>
                                <div>• 개인 맞춤형 금융 상품 자동 추천</div>
                                <div>• DeFi 통합 및 크로스체인 지원</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
