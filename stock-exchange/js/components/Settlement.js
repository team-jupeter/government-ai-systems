function Settlement() {
    const [expandedCard, setExpandedCard] = React.useState(null);

    const stats = [
        { icon: 'fa-clock', title: '결제 주기', value: 'T+0', unit: '즉시', color: 'blue' },
        { icon: 'fa-coins', title: '일일 결제액', value: '45', unit: '조원', color: 'green' },
        { icon: 'fa-shield-halved', title: '결제 성공률', value: '99.99', unit: '%', color: 'purple' },
        { icon: 'fa-bolt', title: '결제 처리속도', value: '0.015', unit: 'ms', color: 'yellow' }
    ];

    const features = [
        {
            icon: 'fa-coins',
            title: 'T+0 즉시 결제',
            description: '거래 체결과 동시에 증권과 자금 이전',
            details: [
                { subtitle: 'DVP (Delivery versus Payment)', content: '증권 인도와 대금 지급 동시 처리' },
                { subtitle: '디지털화폐 연동', content: 'FPGA 기반 디지털화폐 시스템 통합' },
                { subtitle: '원자적 트랜잭션', content: '증권 이전과 자금 지급이 하나의 트랜잭션' }
            ]
        },
        {
            icon: 'fa-link',
            title: '오픈해시 기반 무결성',
            description: '블록체인 대비 98.5% 에너지 절감',
            details: [
                { subtitle: 'SHA-256 재해싱 체인', content: '모든 결제 내역 해시를 오픈해시 체인에 기록' },
                { subtitle: '확률적 계층 분산', content: '기존 통신 인프라 활용 분산 검증' },
                { subtitle: '에너지 효율성', content: 'GPU 대비 88.6% 전력 절감' }
            ]
        },
        {
            icon: 'fa-database',
            title: '프라이빗 데이터 금고 연동',
            description: '거래 정보를 투자자 개인 단말기에 저장',
            details: [
                { subtitle: '확장 재무제표 자동 생성', content: '매매 체결 시 자동으로 개인 재무제표 업데이트' },
                { subtitle: '해시 전용 클라우드 저장', content: '원본 데이터는 본인 단말기, 클라우드에는 해시만 저장' },
                { subtitle: '교차 검증 시스템', content: '매수자와 매도자 거래 내역 해시 비교' }
            ]
        },
        {
            icon: 'fa-building-columns',
            title: '중앙예탁결제원 실시간 연동',
            description: '증권 명의 변경과 자금 이체 동시 처리',
            details: [
                { subtitle: '실시간 계좌 조회', content: '예탁결제원 API를 통한 증권 보유 현황 조회' },
                { subtitle: '명의개서 자동화', content: '체결 즉시 증권 명의 자동 변경' },
                { subtitle: '배당·의결권 즉시 반영', content: 'T+0 결제로 매수 당일부터 배당과 의결권 행사' }
            ]
        },
        {
            icon: 'fa-credit-card',
            title: '다중 결제수단 지원',
            description: '디지털화폐, 은행 계좌, 증권 담보',
            details: [
                { subtitle: '디지털화폐 우선', content: '디지털화폐 결제 시 수수료 50% 할인' },
                { subtitle: '은행 실시간 이체', content: '은행 API 연동 즉시 출금' },
                { subtitle: '증권 담보 대출', content: '보유 증권 담보 즉시 대출' }
            ]
        },
        {
            icon: 'fa-exclamation-triangle',
            title: '결제 실패 자동 처리',
            description: '자금 부족 시 자동 대응',
            details: [
                { subtitle: '사전 자금 검증', content: '주문 접수 시 잔액 미리 확인' },
                { subtitle: '자동 반대매매', content: '결제일 자금 부족 시 매수 증권 자동 매도' },
                { subtitle: '페널티 부과', content: '반복 결제 실패 시 거래 정지 및 과태료' }
            ]
        }
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

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
    );
}

window.Settlement = Settlement;
