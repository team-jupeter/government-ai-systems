function Compliance() {
    const [expandedCard, setExpandedCard] = React.useState(null);


    const features = [
        {
            icon: 'fa-shield-halved',
            title: 'AML 자금세탁 방지',
            description: 'AI 기반 의심 거래 탐지',
            details: [
                { subtitle: '이상 패턴 탐지', content: '비정상적인 대량 입출금, 분산 거래 등 패턴 인식' },
                { subtitle: '고위험 고객 관리', content: '정치적 주요인물(PEP) 자동 식별 및 강화된 실사' },
                { subtitle: 'STR 자동 작성', content: '의심거래보고서를 AI가 자동 작성하여 금감원 제출' }
            ]
        },
        {
            icon: 'fa-user-shield',
            title: 'KYC 고객 확인',
            description: 'Know Your Customer 자동화',
            details: [
                { subtitle: '신원 확인', content: 'OCR로 신분증을 읽고 진위 여부 자동 검증' },
                { subtitle: '생체 인증', content: '얼굴 인식으로 본인 여부 확인' },
                { subtitle: '위험도 평가', content: '고객의 직업, 자금 출처, 거래 패턴으로 위험도 산출' }
            ]
        },
        {
            icon: 'fa-ban',
            title: '불공정거래 차단',
            description: '시세조종, 내부자거래 실시간 차단',
            details: [
                { subtitle: '시세조종 탐지', content: '허위 호가, 통정 매매 등 조작 패턴 AI 감지' },
                { subtitle: '내부자거래 차단', content: '임원 매매 시 미공개 정보 이용 여부 자동 확인' },
                { subtitle: '단기 차익 제한', content: '6개월 미만 단기 차익 거래를 사전 차단' }
            ]
        },
        {
            icon: 'fa-book',
            title: '규제 변경 자동 반영',
            description: '금융 법규 변경사항 즉시 적용',
            details: [
                { subtitle: '법령 크롤링', content: '금융위, 금감원 홈페이지를 매일 크롤링하여 법령 변경 감지' },
                { subtitle: '영향도 분석', content: '변경된 법령이 시스템에 미치는 영향 자동 분석' },
                { subtitle: '시스템 자동 업데이트', content: '규제 변경을 시스템에 즉시 반영' }
            ]
        },
        {
            icon: 'fa-file-invoice',
            title: '보고서 자동 생성',
            description: '금감원 제출 보고서 자동 작성',
            details: [
                { subtitle: '일일 보고', content: '매매 현황, 고객 예탁금 등 일일 보고서 자동 생성' },
                { subtitle: '월간 보고', content: '영업 실적, 리스크 현황 등 월간 보고서 작성' },
                { subtitle: '수시 보고', content: '대량 거래, 시스템 장애 등 수시 보고 자동화' }
            ]
        },
        {
            icon: 'fa-clock',
            title: '감사 추적',
            description: '모든 거래 내역 블록체인 기록',
            details: [
                { subtitle: '거래 이력 저장', content: '모든 주문, 체결, 취소 내역을 오픈해시 체인에 기록' },
                { subtitle: '접근 로그', content: '직원의 시스템 접근 이력을 타임스탬프와 함께 저장' },
                { subtitle: '변경 불가능', content: '블록체인 특성상 과거 기록 위변조 불가' }
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

window.Compliance = Compliance;
