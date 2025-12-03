function InvestorProtection() {
    const [expandedCard, setExpandedCard] = React.useState(null);

    const stats = [
        { icon: 'fa-shield-halved', title: '보호 투자자', value: '1,247만', unit: '명', color: 'blue' },
        { icon: 'fa-wallet', title: '보호 자산', value: '847', unit: '조원', color: 'green' },
        { icon: 'fa-lock', title: '정보 암호화율', value: '100', unit: '%', color: 'purple' },
        { icon: 'fa-handshake', title: '분쟁 해결률', value: '94.5', unit: '%', color: 'yellow' }
    ];

    const features = [
        {
            icon: 'fa-vault',
            title: '프라이빗 데이터 금고',
            description: '투자자의 모든 거래 정보를 개인 단말기에 저장',
            details: [
                { subtitle: '확장 재무제표 자동 생성', content: '매매 체결 시 자동으로 개인 재무제표 업데이트' },
                { subtitle: '해시 전용 클라우드 저장', content: '원본 데이터는 투자자 스마트폰, 클라우드에는 검증용 해시만 기록' },
                { subtitle: '당사자 전용 접근', content: '본인과 명시적으로 권한을 부여받은 자만 복호화 키로 접근' }
            ]
        },
        {
            icon: 'fa-check-double',
            title: '교차 검증 시스템',
            description: '거래 당사자 간 기록 자동 대조',
            details: [
                { subtitle: '실시간 해시 비교', content: '매수자와 매도자가 각자 기록한 거래 내역의 해시를 즉시 비교' },
                { subtitle: '자동 분쟁 개시', content: '해시 불일치 발견 시 자동으로 중재 절차 시작' },
                { subtitle: '블록체인 증거 보전', content: '분쟁 발생 시점의 모든 거래 기록을 오픈해시 체인에 저장' }
            ]
        },
        {
            icon: 'fa-user-shield',
            title: '소액투자자 특별 보호',
            description: '1억원 이하 투자자에게 추가 보호장치 제공',
            details: [
                { subtitle: '집중투표제 자동 안내', content: '의결권 행사 시 집중투표제 활용법을 AI가 안내' },
                { subtitle: '대표소송 지원', content: '경영진의 위법행위 발견 시 소액주주들을 모아 대표소송 제기 지원' },
                { subtitle: '공매도 제한 종목 우대', content: '시가총액 하위 종목은 공매도 제한하여 소액투자자 보호' }
            ]
        },
        {
            icon: 'fa-scale-balanced',
            title: 'AI 분쟁 조정',
            description: '투자자 간 분쟁을 AI가 신속 조정',
            details: [
                { subtitle: '과거 판례 학습', content: 'AI가 수만 건의 과거 분쟁 사례를 학습하여 유사 사건의 조정안 즉시 제시' },
                { subtitle: '공정성 검증', content: '조정안이 양측에 공정한지 통계적으로 검증' },
                { subtitle: '30일 내 해결', content: 'AI 조정으로 평균 해결 기간을 90일에서 30일로 단축' }
            ]
        },
        {
            icon: 'fa-graduation-cap',
            title: '투자자 교육 프로그램',
            description: 'AI 맞춤형 투자 교육',
            details: [
                { subtitle: '수준별 커리큘럼', content: '투자자의 경험과 지식 수준을 AI가 평가하여 초급·중급·고급 맞춤 교육 제공' },
                { subtitle: '시뮬레이션 거래', content: '가상 자금으로 실전 같은 매매 연습' },
                { subtitle: '자격증 발급', content: '교육 이수 후 시험 통과하면 "인증 투자자" 자격 부여' }
            ]
        },
        {
            icon: 'fa-life-ring',
            title: '투자자 보상 기금',
            description: '증권사 파산 시 투자자 예탁금 보상',
            details: [
                { subtitle: '1인당 5천만원 보상', content: '증권사가 파산하더라도 투자자의 예탁금은 1인당 5천만원까지 보상기금에서 지급' },
                { subtitle: '분리 보관 의무', content: '증권사는 고객 예탁금을 자기 자산과 분리 보관' },
                { subtitle: '신속 지급', content: '파산 선고 후 30일 이내에 보상금 지급' }
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

window.InvestorProtection = InvestorProtection;
