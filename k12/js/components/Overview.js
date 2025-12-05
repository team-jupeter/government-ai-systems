// ============================================
// Overview 컴포넌트 - 개요 탭
// K-12 AI 교육 시스템 소개
// ============================================

function Overview() {
    const StatCard = window.StatCard || (() => null);
    const ServiceCard = window.ServiceCard || (() => null);

    return (
        <div>
            {/* 시스템 소개 */}
            <div className="section">
                <div style={{
                    padding: '32px',
                    background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    marginBottom: '32px'
                }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>
                        <i className="fas fa-graduation-cap"></i> 7단계 개인-사회 통합 최적화 AI 교육 시스템
                    </h2>
                    <p style={{ fontSize: '16px', lineHeight: '1.8', opacity: 0.95 }}>
                        OpenHash 기반의 차세대 K-12 교육 플랫폼으로, 
                        <strong> 개인화된 학습 경로</strong>와 <strong>사회적 학습</strong>을 통합하여 
                        각 학생의 잠재력을 극대화합니다. 
                        12개의 특화 AI 에이전트가 학습 전 과정을 지원하며, 
                        실시간 학습 분석을 통해 최적의 교육 경험을 제공합니다.
                    </p>
                </div>

                {/* 주요 통계 */}
                <div className="grid grid-4">
                    <StatCard
                        title="전체 학생 수"
                        value="500"
                        unit="만 명"
                        icon="fa-user-graduate"
                        type="primary"
                        trend="up"
                        trendValue="전국 K-12"
                    />
                    <StatCard
                        title="학습 효과"
                        value="34"
                        unit="%"
                        icon="fa-chart-line"
                        type="success"
                        trend="up"
                        trendValue="평균 성적 향상"
                    />
                    <StatCard
                        title="교사 만족도"
                        value="92.3"
                        unit="%"
                        icon="fa-chalkboard-teacher"
                        type="success"
                        trend="up"
                        trendValue="4.6/5.0 평점"
                    />
                    <StatCard
                        title="학습 완료율"
                        value="87.5"
                        unit="%"
                        icon="fa-check-circle"
                        type="warning"
                        trend="up"
                        trendValue="과정 이수율"
                    />
                </div>
            </div>

            {/* 핵심 기술 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-cogs"></i>
                    <h2>핵심 기술</h2>
                </div>

                <div className="grid grid-2">
                    <ServiceCard
                        icon="📚"
                        title="7단계 학습 프로세스"
                        description="체계적인 7단계 프로세스로 학습자 프로파일부터 메타인지 강화까지"
                        badge="완전 자동화"
                        items={[
                            '1단계: 학습자 프로파일 생성 (학습 스타일, 선호도, 수준 분석)',
                            '2단계: 개인화 학습 경로 설계 (맞춤형 커리큘럼)',
                            '3단계: 적응형 콘텐츠 제공 (난이도 자동 조절)',
                            '4단계: 실시간 학습 모니터링 (진도 추적)',
                            '5단계: 사회적 학습 촉진 (협업 학습)',
                            '6단계: 적응형 평가 (실시간 피드백)',
                            '7단계: 메타인지 강화 (학습 전략 개선)'
                        ]}
                    />
                    <ServiceCard
                        icon="🤖"
                        title="12개 특화 AI 에이전트"
                        description="학습 전 과정을 지원하는 전문 AI 에이전트 시스템"
                        badge="12개 에이전트"
                        items={[
                            '학습 경로 추천: 개인별 최적 학습 경로 제시',
                            '콘텐츠 생성: 학습자 수준에 맞는 콘텐츠 자동 생성',
                            '평가 에이전트: 실시간 학습 평가 및 피드백',
                            '학습 동기 부여: 게이미피케이션 및 보상 시스템',
                            '협업 촉진: 또래 학습 네트워크 구성',
                            '진로 상담: AI 기반 진로 가이드 (+ 6개 더)'
                        ]}
                    />
                    <ServiceCard
                        icon="👤"
                        title="개인화 학습"
                        description="각 학생의 학습 스타일과 속도에 맞춘 맞춤형 교육"
                        badge="완전 개인화"
                        items={[
                            '학습 스타일 분석: 시각형/청각형/체험형 자동 파악',
                            '적응형 난이도: 실시간 난이도 조절 (정답률 기반)',
                            '개인별 학습 속도: 자신의 페이스로 학습',
                            '강점/약점 분석: 취약 영역 집중 보완',
                            '학습 선호도 반영: 관심사 기반 콘텐츠 추천'
                        ]}
                    />
                    <ServiceCard
                        icon="👥"
                        title="사회적 학습"
                        description="협업과 상호작용을 통한 효과적인 학습"
                        badge="협업 중심"
                        items={[
                            '또래 학습 네트워크: 비슷한 수준의 학생끼리 그룹 형성',
                            '그룹 프로젝트: AI가 최적 팀 구성',
                            '실시간 협업 도구: 화이트보드, 채팅, 화상회의',
                            '상호 평가 시스템: 동료 피드백',
                            '멘토-멘티 매칭: 선배-후배 연결'
                        ]}
                    />
                </div>
            </div>

            {/* OpenHash 기술 우위 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-shield-alt"></i>
                    <h2>OpenHash 프라이버시 보호</h2>
                </div>

                <div className="grid grid-4">
                    {[
                        {
                            metric: '학생 데이터',
                            value: '0건',
                            desc: '중앙 서버 저장',
                            icon: '🔒',
                            color: 'var(--success-50)'
                        },
                        {
                            metric: '암호화',
                            value: '256-bit',
                            desc: 'AES 암호화',
                            icon: '🛡️',
                            color: 'var(--primary-50)'
                        },
                        {
                            metric: 'GDPR',
                            value: '100%',
                            desc: '완벽 준수',
                            icon: '✅',
                            color: 'var(--success-50)'
                        },
                        {
                            metric: '데이터 주권',
                            value: '개인',
                            desc: '학생/학부모 소유',
                            icon: '👤',
                            color: 'var(--primary-50)'
                        }
                    ].map((item, idx) => (
                        <div key={idx} style={{
                            padding: '24px',
                            background: 'white',
                            border: `2px solid ${item.color}`,
                            borderRadius: '12px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '48px', marginBottom: '12px' }}>{item.icon}</div>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--gray-90)', marginBottom: '8px' }}>
                                {item.metric}
                            </h3>
                            <div style={{ fontSize: '28px', fontWeight: '700', color: item.color, marginBottom: '8px' }}>
                                {item.value}
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--gray-70)' }}>
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 학습 효과 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-chart-bar"></i>
                    <h2>검증된 학습 효과</h2>
                </div>

                <div className="grid grid-3">
                    {[
                        {
                            category: '학업 성취도',
                            improvement: '+34%',
                            desc: '평균 성적 향상',
                            details: '기존 교육 방식 대비 수학/과학 34% 향상',
                            color: 'var(--success-50)',
                            icon: '📈'
                        },
                        {
                            category: '학습 동기',
                            improvement: '+52%',
                            desc: '학습 참여도 증가',
                            details: '게이미피케이션 및 개인화로 동기 부여',
                            color: 'var(--warning-50)',
                            icon: '🎯'
                        },
                        {
                            category: '교사 업무',
                            improvement: '-40%',
                            desc: '행정 업무 감소',
                            details: 'AI 자동화로 교사는 교육에 집중',
                            color: 'var(--primary-50)',
                            icon: '⏱️'
                        }
                    ].map((effect, idx) => (
                        <div key={idx} style={{
                            padding: '24px',
                            background: 'white',
                            border: `2px solid ${effect.color}`,
                            borderRadius: '12px'
                        }}>
                            <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '12px' }}>
                                {effect.icon}
                            </div>
                            <h3 style={{ 
                                fontSize: '16px', 
                                fontWeight: '600', 
                                color: effect.color,
                                textAlign: 'center',
                                marginBottom: '8px'
                            }}>
                                {effect.category}
                            </h3>
                            <div style={{ 
                                fontSize: '36px', 
                                fontWeight: '700', 
                                color: effect.color,
                                textAlign: 'center',
                                marginBottom: '12px'
                            }}>
                                {effect.improvement}
                            </div>
                            <p style={{ 
                                fontSize: '14px', 
                                fontWeight: '600',
                                color: 'var(--gray-90)',
                                textAlign: 'center',
                                marginBottom: '12px'
                            }}>
                                {effect.desc}
                            </p>
                            <div style={{
                                padding: '10px',
                                background: 'var(--gray-5)',
                                borderRadius: '6px',
                                fontSize: '12px',
                                color: 'var(--gray-70)',
                                textAlign: 'center',
                                lineHeight: '1.5'
                            }}>
                                {effect.details}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

window.Overview = Overview;
