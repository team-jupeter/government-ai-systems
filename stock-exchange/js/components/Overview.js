function Overview() {
    const [expandedCard, setExpandedCard] = React.useState(null);

    const stats = [
        { icon: 'fa-bolt', title: '체결 속도', value: '0.015', unit: 'ms', color: 'blue' },
        { icon: 'fa-chart-line', title: '일일 거래량', value: '850만', unit: '건', color: 'green' },
        { icon: 'fa-building', title: '상장 기업', value: '2,847', unit: '개사', color: 'purple' },
        { icon: 'fa-globe', title: '시가총액', value: '2,450', unit: '조원', color: 'yellow' }
    ];

    const features = [
        {
            icon: 'fa-microchip',
            title: 'FPGA 기반 초고속 체결',
            description: '0.015ms 체결 속도',
            details: [
                {
                    subtitle: 'BN254 타원곡선 병렬 처리',
                    content: '64개 DSP 슬라이스를 활용한 암호학적 연산 가속으로 기존 시스템 대비 3,333배 빠른 처리'
                },
                {
                    subtitle: '412.3MHz 고속 동작',
                    content: 'Setup Time 2.31ns 달성으로 실시간 대량 주문 처리'
                },
                {
                    subtitle: 'HFT 지원',
                    content: '초단타 알고리즘 트레이딩을 위한 마이크로초 단위 호가 매칭'
                }
            ]
        },
        {
            icon: 'fa-shield-halved',
            title: 'AI 기반 시장감시',
            description: '불공정거래 실시간 탐지',
            details: [
                {
                    subtitle: '시세조종 패턴 인식',
                    content: 'BERT + CNN + LSTM 앙상블 모델로 96.8% 정확도의 이상거래 탐지'
                },
                {
                    subtitle: '내부자거래 추적',
                    content: '거래 이력과 공시 정보를 교차 분석하여 의심 거래 자동 식별'
                },
                {
                    subtitle: '작전세력 네트워크 분석',
                    content: '그래프 신경망으로 연관 계좌 네트워크 실시간 분석'
                }
            ]
        },
        {
            icon: 'fa-coins',
            title: 'T+0 디지털화폐 결제',
            description: '증권/자금 동시 즉시 결제',
            details: [
                {
                    subtitle: '실시간 DVP 결제',
                    content: '거래 체결과 동시에 증권과 자금이 즉시 이전되는 T+0 결제'
                },
                {
                    subtitle: '오픈해시 기반 무결성',
                    content: '블록체인 대비 98.5% 에너지 절감하면서 동일한 보안성 확보'
                },
                {
                    subtitle: '자율 금융 서비스 연동',
                    content: '은행, 보험, 증권 서비스가 통합된 자율 금융 생태계'
                }
            ]
        },
        {
            icon: 'fa-database',
            title: '프라이빗 데이터 금고 통합',
            description: '투자자 거래 정보 안전 보호',
            details: [
                {
                    subtitle: '확장 재무제표 자동 생성',
                    content: '모든 거래가 실시간으로 개인 재무제표에 반영되어 정확한 자산 현황 파악'
                },
                {
                    subtitle: '해시 전용 저장',
                    content: '원본 거래 데이터는 본인 단말기에만 저장, 클라우드에는 해시값만 기록'
                },
                {
                    subtitle: '교차 검증 시스템',
                    content: '거래 당사자 간 자동 교차 검증으로 분쟁 방지 및 투명성 확보'
                }
            ]
        },
        {
            icon: 'fa-list-check',
            title: 'AI 자동 상장심사',
            description: '기업 공개 심사 자동화',
            details: [
                {
                    subtitle: '재무제표 실시간 검증',
                    content: '블록체인 기반 재무제표로 분식회계 원천 차단 및 즉시 검증'
                },
                {
                    subtitle: '기업지배구조 평가',
                    content: 'NLP 기반 정관, 이사회 의사록 자동 분석으로 지배구조 점수 산출'
                },
                {
                    subtitle: '시장 수요 예측',
                    content: 'AI 수요 예측 모델로 적정 공모가와 상장 시기 제안'
                }
            ]
        },
        {
            icon: 'fa-bullhorn',
            title: '블록체인 기반 공시',
            description: '변조 불가능한 실시간 정보 공시',
            details: [
                {
                    subtitle: '즉시 공시 자동화',
                    content: '중요 사건 발생 시 AI가 공시 문구를 자동 생성하고 즉시 등록'
                },
                {
                    subtitle: '공시 무결성 보장',
                    content: '오픈해시 체인에 공시 해시 기록으로 사후 수정 불가'
                },
                {
                    subtitle: '허위공시 NLP 탐지',
                    content: '자연어 처리로 모호한 표현, 과장, 누락 사항 자동 검출'
                }
            ]
        }
    ];

    const performanceData = [
        { name: '한국거래소\n(OpenHash)', value: 0.015 },
        { name: 'NASDAQ', value: 5 },
        { name: 'NYSE', value: 8 },
        { name: '도쿄거래소', value: 12 },
        { name: '상하이거래소', value: 15 }
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">시스템 핵심 기능</h2>
                <div className="grid grid-cols-1 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            {...feature}
                            expanded={expandedCard === index}
                            onToggle={() => setExpandedCard(expandedCard === index ? null : index)}
                        />
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                    <i className="fas fa-chart-bar text-exchange-blue mr-2"></i>
                    글로벌 거래소 체결 속도 비교
                </h3>
                <div className="h-64">
                    <ComparisonChart 
                        title=""
                        data={performanceData}
                        dataKey="value"
                        nameKey="name"
                        unit="ms"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                    <i className="fas fa-network-wired text-exchange-blue mr-2"></i>
                    시스템 아키텍처
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-arrow-down text-3xl text-blue-600"></i>
                        </div>
                        <h4 className="font-bold mb-2">주문 접수</h4>
                        <p className="text-sm text-gray-600">투자자 주문<br/>증권사 중계</p>
                    </div>
                    <div className="text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-microchip text-3xl text-green-600"></i>
                        </div>
                        <h4 className="font-bold mb-2">FPGA 체결</h4>
                        <p className="text-sm text-gray-600">0.015ms 매칭<br/>AI 검증</p>
                    </div>
                    <div className="text-center">
                        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-coins text-3xl text-purple-600"></i>
                        </div>
                        <h4 className="font-bold mb-2">T+0 결제</h4>
                        <p className="text-sm text-gray-600">디지털화폐<br/>즉시 이체</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.Overview = Overview;
