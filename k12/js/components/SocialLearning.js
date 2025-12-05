// ============================================
// SocialLearning 컴포넌트
// 사회적 학습 시스템
// ============================================

function SocialLearning() {
    return (
        <div>
            {/* 사회적 학습 개요 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-users"></i>
                    <h2>사회적 학습 시스템</h2>
                </div>

                <div style={{
                    padding: '32px',
                    background: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    marginBottom: '32px'
                }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>
                        <i className="fas fa-hands-helping"></i> 협업과 상호작용으로 함께 성장
                    </h2>
                    <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                        또래 학습, 협업 프로젝트, 멘토-멘티 매칭을 통해 
                        학생들이 서로 배우고 성장하는 환경을 제공합니다.
                    </p>
                </div>

                <div className="grid grid-4">
                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            활성 학습 그룹
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            25K
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>개</span>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            협업 학습 만족도
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            89.3
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            멘토-멘티 매칭
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning-50)' }}>
                            12K
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>쌍</span>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            그룹 프로젝트
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            8.5K
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>개</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 사회적 학습 기능 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-network-wired"></i>
                    <h2>사회적 학습 핵심 기능</h2>
                </div>

                <div className="grid grid-2">
                    {[
                        {
                            title: '또래 학습 네트워크',
                            icon: '👥',
                            description: 'AI가 비슷한 수준과 관심사의 학생들을 자동으로 연결',
                            features: [
                                '학습 수준 기반 그룹 형성 (상/중/하위 5% 내)',
                                '관심 분야별 스터디 그룹',
                                '학습 목표가 유사한 학생 매칭',
                                '그룹 크기 최적화 (3-5명)',
                                '활동성 기반 재편성',
                                '온라인/오프라인 병행 지원'
                            ],
                            color: 'var(--primary-50)'
                        },
                        {
                            title: '협업 프로젝트',
                            icon: '🤝',
                            description: 'AI가 최적의 팀을 구성하고 협업을 촉진',
                            features: [
                                '강점 보완형 팀 구성',
                                '역할 자동 분배 (리더, 연구, 발표 등)',
                                '프로젝트 진행 상황 추적',
                                '팀원 간 기여도 분석',
                                '갈등 조기 감지 및 중재',
                                '최종 결과물 자동 평가'
                            ],
                            color: 'var(--success-50)'
                        },
                        {
                            title: '실시간 협업 도구',
                            icon: '💻',
                            description: '효과적인 협업을 위한 통합 도구 제공',
                            features: [
                                '공유 화이트보드 (실시간 공동 작업)',
                                '그룹 채팅 및 화상회의',
                                '파일 공유 및 버전 관리',
                                '작업 일정 자동 조율',
                                '화면 공유 및 원격 협업',
                                '모바일 접근 지원'
                            ],
                            color: 'var(--warning-50)'
                        },
                        {
                            title: '상호 평가 시스템',
                            icon: '⭐',
                            description: '동료 간 피드백으로 학습 효과 극대화',
                            features: [
                                '동료 과제 상호 평가',
                                '건설적 피드백 가이드',
                                '익명 평가 옵션',
                                '평가 일관성 검증 (AI)',
                                '피드백 품질 점수',
                                '우수 평가자 인정'
                            ],
                            color: 'var(--primary-50)'
                        },
                        {
                            title: '멘토-멘티 매칭',
                            icon: '🎓',
                            description: '선배-후배 연결로 지식 전수 및 동기 부여',
                            features: [
                                'AI 기반 최적 매칭 (성격, 관심사)',
                                '학년별 멘토-멘티 프로그램',
                                '정기 멘토링 일정 관리',
                                '멘토링 활동 모니터링',
                                '멘토 교육 자료 제공',
                                '성공 사례 공유'
                            ],
                            color: 'var(--success-50)'
                        },
                        {
                            title: '토론 및 질의응답',
                            icon: '💬',
                            description: '활발한 상호작용으로 깊이 있는 학습',
                            features: [
                                '주제별 토론 포럼',
                                '실시간 Q&A 세션',
                                'AI 보조 답변 추천',
                                '우수 답변 큐레이션',
                                '토론 참여 포인트',
                                '전문가 초청 Q&A'
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
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {feature.features.map((item, iidx) => (
                                    <div key={iidx} style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '8px',
                                        padding: '10px',
                                        background: 'var(--gray-5)',
                                        borderRadius: '6px'
                                    }}>
                                        <i className="fas fa-check-circle" style={{
                                            color: feature.color,
                                            fontSize: '14px',
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

            {/* 사회적 학습 효과 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-chart-line"></i>
                    <h2>사회적 학습 효과</h2>
                </div>

                <div className="grid grid-3">
                    {[
                        {
                            metric: '학업 성취도',
                            value: '+28%',
                            desc: '협업 학습 참여 학생',
                            icon: '📈',
                            color: 'var(--success-50)'
                        },
                        {
                            metric: '의사소통 능력',
                            value: '+45%',
                            desc: '6개월 참여 학생',
                            icon: '💬',
                            color: 'var(--primary-50)'
                        },
                        {
                            metric: '문제 해결 능력',
                            value: '+38%',
                            desc: '프로젝트 참여 학생',
                            icon: '🧩',
                            color: 'var(--warning-50)'
                        }
                    ].map((effect, idx) => (
                        <div key={idx} style={{
                            padding: '24px',
                            background: 'white',
                            border: `2px solid ${effect.color}`,
                            borderRadius: '12px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '48px', marginBottom: '12px' }}>{effect.icon}</div>
                            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                                {effect.metric}
                            </h4>
                            <div style={{ fontSize: '36px', fontWeight: '700', color: effect.color, marginBottom: '8px' }}>
                                {effect.value}
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--gray-70)' }}>
                                {effect.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

window.SocialLearning = SocialLearning;
