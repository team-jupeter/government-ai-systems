function BackOffice() {
    const [expandedCard, setExpandedCard] = React.useState(null);


    const features = [
        {
            icon: 'fa-calculator',
            title: '자동 정산',
            description: 'T+2 정산 자동화',
            details: [
                { subtitle: '매매 정산', content: '체결 건별 매수·매도 금액 자동 계산' },
                { subtitle: '수수료 계산', content: '거래 수수료, 제세금을 자동 산출' },
                { subtitle: '잔고 업데이트', content: '고객 계좌의 주식·현금 잔고를 실시간 반영' }
            ]
        },
        {
            icon: 'fa-money-bill-transfer',
            title: '자금 이체',
            description: '은행 연동 실시간 입출금',
            details: [
                { subtitle: '실시간 입금', content: '고객 입금 즉시 증권 계좌에 반영' },
                { subtitle: '출금 처리', content: '출금 신청 후 1시간 내 고객 은행 계좌로 송금' },
                { subtitle: '가상계좌', content: '고객별 전용 가상계좌 발급으로 입금 자동 매칭' }
            ]
        },
        {
            icon: 'fa-file-invoice',
            title: '세무 처리',
            description: '양도소득세, 배당소득세 자동 계산',
            details: [
                { subtitle: '양도소득세', content: '연간 양도차익 250만원 초과 시 자동 세금 계산' },
                { subtitle: '배당소득세', content: '배당금 지급 시 15.4% 원천징수' },
                { subtitle: '증권거래세', content: '주식 매도 시 0.23% 자동 공제' }
            ]
        },
        {
            icon: 'fa-chart-pie',
            title: '회계 처리',
            description: '복식부기 기반 회계 자동화',
            details: [
                { subtitle: '거래 분개', content: '모든 거래를 차변·대변으로 자동 분개' },
                { subtitle: '재무제표 생성', content: '월말, 분기말 재무제표를 자동 생성' },
                { subtitle: 'ERP 연동', content: '회계 시스템과 실시간 데이터 동기화' }
            ]
        },
        {
            icon: 'fa-file-alt',
            title: '보고서 생성',
            description: '고객 잔고 증명서, 손익 보고서 자동 발급',
            details: [
                { subtitle: '잔고 증명서', content: '고객 요청 시 즉시 PDF 발급' },
                { subtitle: '손익 계산서', content: '연간 매매 손익을 자동 집계' },
                { subtitle: '거래 내역서', content: '기간별 매매 내역을 상세히 제공' }
            ]
        },
        {
            icon: 'fa-database',
            title: '데이터 백업',
            description: '일일 백업 및 재해 복구',
            details: [
                { subtitle: '실시간 백업', content: '모든 거래 데이터를 실시간으로 이중화 저장' },
                { subtitle: '오프사이트 백업', content: '일일 데이터를 원격지 데이터센터에 백업' },
                { subtitle: '재해 복구', content: '장애 발생 시 1시간 이내 시스템 복구' }
            ]
        }
    ];

    return (
        <div className="space-y-8">

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

window.BackOffice = BackOffice;
