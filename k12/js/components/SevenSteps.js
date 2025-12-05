// ============================================
// SevenSteps 컴포넌트
// 7단계 학습 프로세스
// ============================================

function SevenSteps() {
    return (
        <div>
            {/* 7단계 프로세스 개요 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-stairs"></i>
                    <h2>7단계 학습 프로세스</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    marginBottom: '32px'
                }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>
                        <i className="fas fa-route"></i> 체계적이고 과학적인 학습 여정
                    </h3>
                    <p style={{ fontSize: '15px', lineHeight: '1.8' }}>
                        학습자 프로파일 생성부터 메타인지 강화까지, 7단계의 체계적인 프로세스로 
                        각 학생의 잠재력을 극대화하고 효과적인 학습을 지원합니다.
                    </p>
                </div>
            </div>

            {/* 7단계 상세 */}
            <div className="section">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {[
                        {
                            step: '1단계',
                            title: '학습자 프로파일 생성',
                            icon: '👤',
                            color: 'var(--primary-50)',
                            description: '개별 학습자의 특성, 선호도, 현재 수준을 종합적으로 분석',
                            features: [
                                '학습 스타일 분석: 시각형/청각형/체험형 자동 파악',
                                '인지 능력 평가: 논리적 사고, 창의성, 기억력 측정',
                                '선행 지식 평가: 현재 학습 수준 정확히 파악',
                                '학습 속도 분석: 개인별 최적 학습 페이스 결정',
                                '관심 분야 파악: 학습 동기 부여를 위한 흥미 영역 탐색'
                            ],
                            metrics: '초기 평가 정확도 94.7%'
                        },
                        {
                            step: '2단계',
                            title: '개인화 학습 경로 설계',
                            icon: '🗺️',
                            color: 'var(--success-50)',
                            description: '1단계 분석 결과를 바탕으로 맞춤형 학습 경로 자동 생성',
                            features: [
                                'AI 기반 커리큘럼 설계: 개인별 최적 학습 순서',
                                '목표 설정: 단기/중기/장기 학습 목표',
                                '마일스톤 설정: 주요 학습 체크포인트',
                                '대체 경로 준비: 어려움 발생 시 우회 경로',
                                '진도 조절: 이해도에 따라 속도 자동 조절'
                            ],
                            metrics: '학습 경로 만족도 91.2%'
                        },
                        {
                            step: '3단계',
                            title: '적응형 콘텐츠 제공',
                            icon: '📚',
                            color: 'var(--warning-50)',
                            description: '학습자 수준과 선호도에 맞춘 콘텐츠 실시간 생성 및 제공',
                            features: [
                                '난이도 자동 조절: 정답률 기반 실시간 조정',
                                '다양한 설명 방식: 텍스트, 영상, 인터랙티브 등',
                                '실생활 예시: 학습자 관심사 연계',
                                '반복 학습 최적화: 망각 곡선 기반 복습 타이밍',
                                '멀티미디어 활용: 시각/청각 자료 통합'
                            ],
                            metrics: '콘텐츠 이해도 87.9%'
                        },
                        {
                            step: '4단계',
                            title: '실시간 학습 모니터링',
                            icon: '📊',
                            color: 'var(--primary-50)',
                            description: '학습 과정을 실시간으로 추적하고 분석하여 즉각 대응',
                            features: [
                                '진도 추적: 실시간 학습 진행 상황 모니터링',
                                '이해도 측정: 문제 풀이 패턴 분석',
                                '집중도 분석: 학습 시간, 휴식 패턴 파악',
                                '어려움 감지: 취약 영역 자동 발견',
                                '알림 시스템: 학생/교사/학부모 실시간 알림'
                            ],
                            metrics: '조기 개입 성공률 82.4%'
                        },
                        {
                            step: '5단계',
                            title: '사회적 학습 촉진',
                            icon: '👥',
                            color: 'var(--success-50)',
                            description: '협업과 상호작용을 통한 효과적인 학습 경험 제공',
                            features: [
                                '또래 학습 그룹: 비슷한 수준/관심사 학생 매칭',
                                '협업 프로젝트: AI가 최적 팀 구성',
                                '토론 및 질의응답: 실시간 상호작용',
                                '상호 평가: 동료 피드백 시스템',
                                '멘토-멘티 연결: 선배-후배 학습 지원'
                            ],
                            metrics: '협업 학습 만족도 89.3%'
                        },
                        {
                            step: '6단계',
                            title: '적응형 평가',
                            icon: '✅',
                            color: 'var(--warning-50)',
                            description: '학습 수준에 맞춘 평가와 즉각적인 피드백 제공',
                            features: [
                                '동적 난이도 조절: 정답률 기반 문제 난이도 변경',
                                '즉각적 피드백: 문제 풀이 직후 상세 설명',
                                '오답 분석: 왜 틀렸는지 구체적 설명',
                                '강점/약점 파악: 영역별 성취도 분석',
                                '종합 역량 평가: 지식, 기능, 태도 전체 평가'
                            ],
                            metrics: '평가 정확도 93.1%'
                        },
                        {
                            step: '7단계',
                            title: '메타인지 강화',
                            icon: '🧠',
                            color: 'var(--primary-50)',
                            description: '자기주도 학습 능력을 키우고 학습 전략을 개선',
                            features: [
                                '학습 전략 분석: 효과적인 학습 방법 발견',
                                '자기 성찰 유도: 학습 과정 돌아보기',
                                '목표 설정 지원: 현실적인 목표 수립',
                                '시간 관리: 효율적인 학습 계획',
                                '자신감 향상: 성취 경험 강화'
                            ],
                            metrics: '자기주도 학습 능력 +45%'
                        }
                    ].map((process, idx) => (
                        <div key={idx} style={{
                            padding: '24px',
                            background: 'white',
                            borderRadius: '12px',
                            border: `3px solid ${process.color}`,
                            borderLeft: `8px solid ${process.color}`
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    background: process.color,
                                    color: 'white',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '36px',
                                    flexShrink: 0
                                }}>
                                    {process.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '14px', fontWeight: '600', color: process.color, marginBottom: '4px' }}>
                                        {process.step}
                                    </div>
                                    <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--gray-90)', marginBottom: '8px' }}>
                                        {process.title}
                                    </h3>
                                    <p style={{ fontSize: '14px', color: 'var(--gray-70)', lineHeight: '1.6' }}>
                                        {process.description}
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                                {process.features.map((feature, fidx) => (
                                    <div key={fidx} style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '10px',
                                        padding: '10px',
                                        background: 'var(--gray-5)',
                                        borderRadius: '6px'
                                    }}>
                                        <i className="fas fa-check-circle" style={{
                                            color: process.color,
                                            fontSize: '16px',
                                            marginTop: '2px'
                                        }}></i>
                                        <span style={{ fontSize: '14px', color: 'var(--gray-80)', lineHeight: '1.6' }}>
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div style={{
                                padding: '12px',
                                background: process.color,
                                color: 'white',
                                borderRadius: '6px',
                                textAlign: 'center',
                                fontWeight: '600',
                                fontSize: '14px'
                            }}>
                                📈 {process.metrics}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

window.SevenSteps = SevenSteps;
