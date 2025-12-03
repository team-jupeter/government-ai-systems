function Disclosure() {
    const [expandedCard, setExpandedCard] = React.useState(null);

    const stats = [
        { icon: 'fa-file-lines', title: '연간 공시 건수', value: '84,500', unit: '건', color: 'blue' },
        { icon: 'fa-clock', title: '평균 공시 시간', value: '5', unit: '분', color: 'green' },
        { icon: 'fa-shield-check', title: '무결성 보장', value: '100', unit: '%', color: 'purple' },
        { icon: 'fa-language', title: 'NLP 검증률', value: '99.2', unit: '%', color: 'yellow' }
    ];

    const features = [
        {
            icon: 'fa-bolt',
            title: '즉시 공시 자동화',
            description: '중요 사건 발생 시 AI가 공시 문구 자동 생성',
            details: [
                { subtitle: '사건 자동 탐지', content: '재무제표, 이사회 의사록, 계약서에서 공시 대상 사건을 AI가 실시간 식별' },
                { subtitle: '문구 자동 생성', content: 'GPT 기반 언어 모델이 법규에 맞는 공시 문구 자동 작성' },
                { subtitle: '5분 내 등록', content: '법무팀 승인 후 5분 이내에 공시 등록' }
            ]
        },
        {
            icon: 'fa-link',
            title: '블록체인 무결성 보장',
            description: '오픈해시 체인에 공시 해시 기록',
            details: [
                { subtitle: 'SHA-256 해시 저장', content: '공시 문서의 해시를 오픈해시 체인에 기록하여 사후 수정 차단' },
                { subtitle: '타임스탬프 검증', content: '공시 등록 시각이 블록체인에 영구 기록' },
                { subtitle: '수정 이력 추적', content: '공시 정정 시 원본과 수정본 해시를 모두 저장' }
            ]
        },
        {
            icon: 'fa-magnifying-glass',
            title: '허위공시 NLP 탐지',
            description: '자연어 처리로 모호한 표현, 과장, 누락 검출',
            details: [
                { subtitle: '명확성 점수', content: '불확실한 표현의 빈도를 계산하여 공시 명확성 평가' },
                { subtitle: '과장 탐지', content: '과장된 수식어를 찾아내고 객관적 데이터 요구' },
                { subtitle: '누락 확인', content: '계약금액, 계약상대방, 이행기한 등 필수 정보 누락 여부 자동 확인' }
            ]
        },
        {
            icon: 'fa-bell',
            title: '맞춤형 공시 알림',
            description: '투자자 관심 종목의 공시 실시간 통보',
            details: [
                { subtitle: '관심종목 설정', content: '투자자가 관심 종목을 등록하면 해당 종목 공시 발표 시 즉시 알림' },
                { subtitle: '중요도 필터링', content: 'AI가 공시의 주가 영향도를 평가하여 중요한 공시만 선별 알림' },
                { subtitle: '다채널 알림', content: '이메일, SMS, 앱 푸시, 카카오톡 등 선택한 채널로 공시 전달' }
            ]
        },
        {
            icon: 'fa-language',
            title: '다국어 공시 지원',
            description: '한국어 공시를 AI가 자동 번역',
            details: [
                { subtitle: '실시간 번역', content: '한국어 공시 등록 후 5분 이내에 3개 언어 번역본 자동 생성' },
                { subtitle: '금융 전문 번역', content: '금융 도메인 특화 번역 모델로 전문 용어 정확 번역' },
                { subtitle: '글로벌 투자자 지원', content: '외국인 투자자가 모국어로 공시 읽고 즉시 투자 결정' }
            ]
        },
        {
            icon: 'fa-chart-simple',
            title: '공시 영향 분석',
            description: 'AI가 공시의 주가 영향도 예측',
            details: [
                { subtitle: '과거 사례 학습', content: '유사한 공시 발표 후 주가 변동 패턴 학습' },
                { subtitle: '긍정·부정 분류', content: '감성 분석으로 공시가 긍정적인지 부정적인지 판단' },
                { subtitle: '신뢰도 표시', content: '예측의 신뢰도를 함께 제공' }
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

window.Disclosure = Disclosure;
