// ============================================
// LearningAnalytics 컴포넌트
// 학습 분석 시스템
// ============================================

function LearningAnalytics() {
    return (
        <div>
            {/* 학습 분석 개요 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-chart-line"></i>
                    <h2>학습 분석 시스템</h2>
                </div>

                <div style={{
                    padding: '32px',
                    background: 'linear-gradient(135deg, #00ACC1 0%, #00838F 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    marginBottom: '32px'
                }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>
                        <i className="fas fa-chart-area"></i> 데이터 기반 학습 최적화
                    </h2>
                    <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                        학습 데이터를 실시간으로 분석하여 패턴을 발견하고, 
                        예측 모델로 학습 성과를 향상시킵니다.
                    </p>
                </div>

                <div className="grid grid-4">
                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            분석 데이터
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            50억
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>건</span>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            예측 정확도
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            91.4
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            분석 주기
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning-50)' }}>
                            실시간
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            조기 개입 성공률
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            82.4
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 학습 분석 기능 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-microscope"></i>
                    <h2>학습 분석 핵심 기능</h2>
                </div>

                <div className="grid grid-2">
                    {[
                        {
                            title: '학습 패턴 분석',
                            icon: '📈',
                            description: '개인별 학습 행동 패턴을 AI가 자동 분석',
                            items: [
                                '학습 시간대 분석: 집중력이 높은 시간 파악',
                                '학습 속도 추적: 과목별/단원별 소요 시간',
                                '휴식 패턴: 최적 학습-휴식 비율 도출',
                                '반복 학습 주기: 효과적인 복습 타이밍',
                                '문제 풀이 전략: 접근 방식 분석',
                                '오답 패턴: 자주 틀리는 유형 파악'
                            ]
                        },
                        {
                            title: '성적 예측',
                            icon: '🔮',
                            description: '미래 학습 성과를 AI가 예측',
                            items: [
                                '시험 성적 예측 (정확도 91.4%)',
                                '학습 목표 달성 가능성 분석',
                                '취약 영역 조기 발견',
                                '필요한 학습 시간 계산',
                                '성적 향상 시뮬레이션',
                                '진학 가능성 예측'
                            ]
                        },
                        {
                            title: '취약 영역 발견',
                            icon: '🎯',
                            description: '학습에서 어려움을 겪는 부분을 자동으로 식별',
                            items: [
                                '개념별 이해도 측정',
                                '선수 학습 결손 파악',
                                '오개념 (Misconception) 발견',
                                '문제 유형별 정답률 분석',
                                '시간이 오래 걸리는 영역',
                                '반복 오답 집중 분석'
                            ]
                        },
                        {
                            title: '학습 전략 분석',
                            icon: '🧠',
                            description: '효과적인 학습 방법을 데이터로 검증',
                            items: [
                                '학습 방법별 효과 비교',
                                '최적 학습 전략 추천',
                                '학습 환경 분석 (소음, 조명 등)',
                                '집중력 유지 시간 측정',
                                '멀티태스킹 영향 분석',
                                '학습 도구 활용 패턴'
                            ]
                        },
                        {
                            title: '진도 추적',
                            icon: '📍',
                            description: '학습 진행 상황을 실시간으로 모니터링',
                            items: [
                                '과목별 진도율 시각화',
                                '학습 목표 대비 현재 위치',
                                '예정보다 빠른/느린 영역 파악',
                                '누적 학습 시간 추적',
                                '마일스톤 달성 현황',
                                '전체 커리큘럼 완성도'
                            ]
                        },
                        {
                            title: '비교 분석',
                            icon: '📊',
                            description: '또래 그룹과 비교하여 상대적 위치 파악',
                            items: [
                                '학년 평균 대비 위치',
                                '동일 학교 내 순위',
                                '전국 단위 백분위',
                                '과목별 상대 강약점',
                                '학습 속도 비교',
                                '시간 투입 대비 효율성'
                            ]
                        }
                    ].map((feature, idx) => (
                        <div key={idx} className="card">
                            <div style={{ fontSize: '64px', marginBottom: '16px', textAlign: 'center' }}>{feature.icon}</div>
                            <h3 style={{
                                fontSize: '20px',
                                fontWeight: '600',
                                marginBottom: '12px',
                                color: 'var(--primary-50)',
                                textAlign: 'center'
                            }}>
                                {feature.title}
                            </h3>
                            <p style={{
                                fontSize: '14px',
                                color: 'var(--gray-70)',
                                marginBottom: '16px',
                                textAlign: 'center',
                                fontWeight: '600'
                            }}>
                                {feature.description}
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {feature.items.map((item, iidx) => (
                                    <div key={iidx} style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '8px',
                                        padding: '10px',
                                        background: 'var(--gray-5)',
                                        borderRadius: '6px'
                                    }}>
                                        <i className="fas fa-chart-bar" style={{
                                            color: 'var(--primary-50)',
                                            fontSize: '12px',
                                            marginTop: '2px'
                                        }}></i>
                                        <span style={{ fontSize: '13px', color: 'var(--gray-80)', lineHeight: '1.5' }}>
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 시각화 대시보드 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-chart-pie"></i>
                    <h2>시각화 대시보드</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'white',
                    border: '2px solid var(--primary-50)',
                    borderRadius: '12px'
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary-50)', marginBottom: '20px' }}>
                        <i className="fas fa-desktop"></i> 한눈에 보는 학습 현황
                    </h3>
                    
                    <div className="grid grid-3" style={{ gap: '16px' }}>
                        {[
                            {
                                dashboard: '학생용 대시보드',
                                features: [
                                    '오늘의 학습 목표 및 진행률',
                                    '과목별 성취도 레이더 차트',
                                    '취약 영역 경고',
                                    '학습 시간 추이 그래프',
                                    '배지 및 보상 현황',
                                    '추천 학습 활동'
                                ],
                                icon: '👨‍🎓',
                                color: 'var(--primary-50)'
                            },
                            {
                                dashboard: '교사용 대시보드',
                                features: [
                                    '학급 전체 성취도 분포',
                                    '개별 학생 진도 모니터링',
                                    '조기 경고 학생 목록',
                                    '수업 효과성 분석',
                                    '평가 결과 통계',
                                    '학부모 상담 자료'
                                ],
                                icon: '👨‍🏫',
                                color: 'var(--success-50)'
                            },
                            {
                                dashboard: '학부모용 대시보드',
                                features: [
                                    '자녀 학습 요약 리포트',
                                    '과목별 성적 추이',
                                    '학습 시간 및 패턴',
                                    '교사 피드백',
                                    '학습 목표 달성 현황',
                                    '진로 상담 정보'
                                ],
                                icon: '👪',
                                color: 'var(--warning-50)'
                            }
                        ].map((dash, idx) => (
                            <div key={idx} style={{
                                padding: '20px',
                                background: 'var(--gray-5)',
                                borderRadius: '8px',
                                borderLeft: `4px solid ${dash.color}`
                            }}>
                                <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '12px' }}>
                                    {dash.icon}
                                </div>
                                <h4 style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: dash.color,
                                    marginBottom: '12px',
                                    textAlign: 'center'
                                }}>
                                    {dash.dashboard}
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {dash.features.map((feature, fidx) => (
                                        <div key={fidx} style={{
                                            fontSize: '12px',
                                            color: 'var(--gray-80)',
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '6px'
                                        }}>
                                            <i className="fas fa-check" style={{ color: dash.color, marginTop: '2px' }}></i>
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

window.LearningAnalytics = LearningAnalytics;
