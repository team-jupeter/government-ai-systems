function Listing() {
    const [expandedCard, setExpandedCard] = React.useState(null);

    const stats = [
        { icon: 'fa-building', title: '상장 기업', value: '2,847', unit: '개사', color: 'blue' },
        { icon: 'fa-clock', title: '평균 심사기간', value: '15', unit: '일', color: 'green' },
        { icon: 'fa-check-circle', title: 'AI 심사 정확도', value: '98.5', unit: '%', color: 'purple' },
        { icon: 'fa-calendar-plus', title: '연간 신규 상장', value: '147', unit: '개사', color: 'yellow' }
    ];

    const features = [
        {
            icon: 'fa-robot',
            title: 'AI 자동 상장심사',
            description: '기업 공개 심사 자동화',
            details: [
                { subtitle: '재무 요건 자동 검증', content: '자산총액, 자기자본, 영업이익 등 정량적 상장 요건 자동 검증' },
                { subtitle: '성장성 AI 평가', content: '과거 3년 매출·이익 증가율, 시장 점유율 변화 분석' },
                { subtitle: '리스크 요인 분석', content: '부채비율, 유동비율, 이자보상배율 종합 평가' }
            ]
        },
        {
            icon: 'fa-file-contract',
            title: '블록체인 재무제표 검증',
            description: '실시간 재무제표로 분식회계 차단',
            details: [
                { subtitle: '거래 기반 재무제표', content: '모든 매출·비용 거래가 디지털화폐로 기록되어 자동 재무제표 생성' },
                { subtitle: '교차 검증 시스템', content: '거래 상대방 재무제표와 교차 확인' },
                { subtitle: '감사 자동화', content: 'AI가 재무제표 이상 패턴 실시간 탐지' }
            ]
        },
        {
            icon: 'fa-sitemap',
            title: '기업지배구조 NLP 평가',
            description: '정관, 이사회 의사록 자연어 처리 분석',
            details: [
                { subtitle: '사외이사 독립성 검증', content: '사외이사와 경영진 간 금융·인적 연결고리 분석' },
                { subtitle: '의사결정 투명성', content: '이사회 의사록의 토론 깊이와 반대 의견 빈도 분석' },
                { subtitle: '소액주주 권리 보호', content: '정관에 집중투표제, 전자투표 등 조항 포함 여부 자동 확인' }
            ]
        },
        {
            icon: 'fa-chart-line',
            title: 'AI 수요 예측',
            description: '공모가와 상장 시기 최적 제안',
            details: [
                { subtitle: '시장 수요 분석', content: '유사 업종 IPO 사례와 현재 시장 분위기 학습' },
                { subtitle: '시기 최적화', content: '거시경제 지표, 업종별 투자 심리 종합하여 IPO 성공 확률 높은 시기 추천' },
                { subtitle: '주간사 선정 지원', content: '주간사 후보사들의 과거 IPO 실적과 평판 분석' }
            ]
        },
        {
            icon: 'fa-scale-balanced',
            title: '상장 유지 관리',
            description: '상장 후 지속적 요건 충족 모니터링',
            details: [
                { subtitle: '실시간 요건 검증', content: '분기별 재무제표 발표 시 자동으로 상장 유지 요건 검증' },
                { subtitle: '개선 기간 부여', content: '일시적 요건 미달 시 6개월~1년 개선 기간 부여' },
                { subtitle: '관리종목 지정', content: '재무 악화나 지배구조 문제 발생 시 관리종목 지정' }
            ]
        },
        {
            icon: 'fa-ban',
            title: '상장폐지 공정 심사',
            description: 'AI와 위원회 협력 상장폐지 결정',
            details: [
                { subtitle: 'AI 1차 평가', content: '정량적 요건을 AI가 자동 평가' },
                { subtitle: '위원회 최종 결정', content: '전문가 위원회가 경영 정상화 가능성 등 종합 심의' },
                { subtitle: '투자자 보호 조치', content: '상장폐지 확정 전 투자자 설명회 및 장외 거래 지원' }
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

window.Listing = Listing;
