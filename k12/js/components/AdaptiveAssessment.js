// ============================================
// AdaptiveAssessment 컴포넌트
// 적응형 평가 시스템
// ============================================

function AdaptiveAssessment() {
    return (
        <div>
            {/* 적응형 평가 개요 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-clipboard-check"></i>
                    <h2>적응형 평가 시스템</h2>
                </div>

                <div style={{
                    padding: '32px',
                    background: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    marginBottom: '32px'
                }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>
                        <i className="fas fa-balance-scale-right"></i> 정확하고 공정한 학습 평가
                    </h2>
                    <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                        학생의 수준에 맞춰 난이도가 조절되는 평가로 
                        정확한 학습 성취도를 측정하고 즉각적인 피드백을 제공합니다.
                    </p>
                </div>

                <div className="grid grid-4">
                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            평가 정확도
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            93.1
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            피드백 속도
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            즉시
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            평가 문항 수
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning-50)' }}>
                            50만
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>개</span>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            학생 만족도
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            88.7
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 적응형 평가 기능 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-cogs"></i>
                    <h2>적응형 평가 핵심 기능</h2>
                </div>

                <div className="grid grid-2">
                    {[
                        {
                            title: '동적 난이도 조절 (CAT)',
                            icon: '🎚️',
                            description: 'Computerized Adaptive Testing - 실시간 난이도 자동 조정',
                            details: [
                                '정답 시: 더 어려운 문제 출제',
                                '오답 시: 더 쉬운 문제 출제',
                                '최적 난이도 자동 탐색',
                                '평가 문항 수 최소화 (15-20문항)',
                                '기존 고정형 평가 대비 50% 시간 절약',
                                'IRT (문항 반응 이론) 적용'
                            ],
                            color: 'var(--primary-50)'
                        },
                        {
                            title: '즉각적 피드백',
                            icon: '⚡',
                            description: '문제 풀이 직후 상세한 설명 제공',
                            details: [
                                '정답/오답 즉시 확인',
                                '오답 원인 상세 분석',
                                '올바른 풀이 과정 단계별 설명',
                                '관련 개념 복습 자료 링크',
                                '비슷한 유형 문제 추천',
                                '학습 팁 및 전략 제시'
                            ],
                            color: 'var(--success-50)'
                        },
                        {
                            title: '오답 분석',
                            icon: '🔍',
                            description: '왜 틀렸는지 구체적으로 분석',
                            details: [
                                '개념 이해 부족 vs 실수 구분',
                                '자주 하는 실수 패턴 파악',
                                '오개념 (Misconception) 발견',
                                '취약 영역 자동 식별',
                                '반복 오답 특별 관리',
                                '보충 학습 자료 자동 추천'
                            ],
                            color: 'var(--warning-50)'
                        },
                        {
                            title: '영역별 성취도 분석',
                            icon: '📊',
                            description: '세부 영역별 학습 수준 정밀 측정',
                            details: [
                                '과목별 세부 단원 성취도',
                                '개념별 이해도 점수',
                                '문제 유형별 정답률',
                                '시간대별 학습 효율',
                                '강점/약점 시각화',
                                '종합 학습 프로파일 생성'
                            ],
                            color: 'var(--primary-50)'
                        },
                        {
                            title: '종합 역량 평가',
                            icon: '🎯',
                            description: '지식, 기능, 태도를 통합 평가',
                            details: [
                                '인지적 영역: 지식, 이해, 적용, 분석, 종합, 평가',
                                '정의적 영역: 학습 태도, 동기, 흥미',
                                '심동적 영역: 실습, 실험, 프로젝트',
                                '문제 해결 능력 평가',
                                '창의성 및 비판적 사고',
                                '협업 및 의사소통 능력'
                            ],
                            color: 'var(--success-50)'
                        },
                        {
                            title: '공정성 보장',
                            icon: '⚖️',
                            description: '편향 없는 객관적 평가',
                            details: [
                                '문항 편향 자동 감지 및 제거',
                                '성별, 지역, 배경 무관 공정 평가',
                                '동등 난이도 문항으로 형평성 보장',
                                '평가 결과 통계적 검증',
                                '투명한 채점 기준',
                                '이의 제기 시스템'
                            ],
                            color: 'var(--warning-50)'
                        }
                    ].map((feature, idx) => (
                        <div key={idx} className="card">
                            <div style={{ fontSize: '64px', marginBottom: '16px', textAlign: 'center' }}>{feature.icon}</div>
                            <h3 style={{
                                fontSize: '20px',
                                fontWeight: '600',
                                marginBottom: '12px',
                                color: feature.color,
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
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {feature.details.map((detail, didx) => (
                                    <div key={didx} style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '8px',
                                        padding: '10px',
                                        background: 'var(--gray-5)',
                                        borderRadius: '6px'
                                    }}>
                                        <i className="fas fa-check" style={{
                                            color: feature.color,
                                            fontSize: '12px',
                                            marginTop: '2px'
                                        }}></i>
                                        <span style={{ fontSize: '13px', color: 'var(--gray-80)', lineHeight: '1.5' }}>
                                            {detail}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 평가 유형 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-list-check"></i>
                    <h2>다양한 평가 유형</h2>
                </div>

                <div className="grid grid-3">
                    {[
                        { type: '진단 평가', purpose: '사전 지식 수준 파악', timing: '학습 시작 전' },
                        { type: '형성 평가', purpose: '학습 과정 중 이해도 확인', timing: '학습 중 수시' },
                        { type: '총괄 평가', purpose: '최종 학습 성취도 측정', timing: '학습 완료 후' }
                    ].map((assessment, idx) => (
                        <div key={idx} style={{
                            padding: '20px',
                            background: 'white',
                            border: '2px solid var(--primary-50)',
                            borderRadius: '12px',
                            textAlign: 'center'
                        }}>
                            <h4 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary-50)', marginBottom: '12px' }}>
                                {assessment.type}
                            </h4>
                            <p style={{ fontSize: '14px', color: 'var(--gray-80)', marginBottom: '8px' }}>
                                <strong>목적:</strong> {assessment.purpose}
                            </p>
                            <p style={{ fontSize: '13px', color: 'var(--gray-70)' }}>
                                <strong>시기:</strong> {assessment.timing}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

window.AdaptiveAssessment = AdaptiveAssessment;
