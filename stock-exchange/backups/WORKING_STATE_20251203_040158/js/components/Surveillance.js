function Surveillance() {
    const [expandedCard, setExpandedCard] = React.useState(null);


    const features = [
        {
            icon: 'fa-chart-line',
            title: '시세조종 AI 탐지',
            description: 'BERT + CNN + LSTM 앙상블 96.8% 정확도',
            details: [
                { subtitle: 'BERT 언어 모델 분석', content: '768차원 임베딩으로 거래 설명 텍스트 의미 분석' },
                { subtitle: 'CNN 패턴 인식', content: '컨볼루션 신경망으로 호가·체결 데이터 패턴 추출' },
                { subtitle: 'LSTM 시계열 분석', content: '시간대별 거래 흐름 분석' }
            ]
        },
        {
            icon: 'fa-user-secret',
            title: '내부자거래 추적',
            description: '공시 정보와 거래 이력 교차 분석',
            details: [
                { subtitle: '공시 전후 거래 모니터링', content: '중요 공시 발표 전 특정인 대량 매수·매도 추적' },
                { subtitle: '임직원 거래 감시', content: '상장사 임직원과 가족의 자사주 거래 실시간 모니터링' },
                { subtitle: '네트워크 관계 분석', content: '그래프 신경망으로 의심 거래자와 임직원 연결고리 추적' }
            ]
        },
        {
            icon: 'fa-users',
            title: '작전세력 네트워크 분석',
            description: '연관 계좌 간 협력 매매 적발',
            details: [
                { subtitle: 'Graph Neural Network', content: '계좌 간 자금 흐름과 거래 패턴 유사성 분석' },
                { subtitle: '동시 매매 탐지', content: '여러 계좌가 동일 시간대 동일 종목 대량 매수 패턴 감지' },
                { subtitle: '차명 계좌 추적', content: 'IP 주소, 거래 단말기, 입금 계좌 종합 분석' }
            ]
        },
        {
            icon: 'fa-file-circle-xmark',
            title: '허위공시 NLP 탐지',
            description: '자연어 처리로 모호한 표현, 과장, 누락 검출',
            details: [
                { subtitle: '감성 분석', content: '공시 문구의 긍정·부정 톤 분석' },
                { subtitle: '모호성 점수', content: '불확실한 표현의 빈도 계산' },
                { subtitle: '과거 공시 대조', content: '동일 기업 과거 공시와 비교하여 논리적 일관성 검증' }
            ]
        },
        {
            icon: 'fa-bell',
            title: '이상거래 실시간 경보',
            description: '의심 거래 즉시 담당자 알림',
            details: [
                { subtitle: '의심도 점수 산출', content: 'AI 모델이 각 거래의 의심도를 0~100점으로 계산' },
                { subtitle: '다채널 알림', content: '이메일, SMS, 시스템 팝업으로 감시 담당자 통보' },
                { subtitle: '자동 매매 정지', content: '심각한 불공정거래 의심 시 해당 종목·계좌 거래 임시 정지' }
            ]
        },
        {
            icon: 'fa-database',
            title: '블록체인 감사 추적',
            description: '거래와 감시 이력을 오픈해시 체인에 기록',
            details: [
                { subtitle: '증거 보전', content: '의심 거래의 호가·체결·계좌 정보를 해시로 기록' },
                { subtitle: '감시 로그 저장', content: 'AI 의심도 점수, 경보 발송 시각, 담당자 조치 내역 기록' },
                { subtitle: '사후 검증 가능', content: '타임스탬프와 해시 체인으로 과거 시장 상황 재현' }
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

window.Surveillance = Surveillance;
