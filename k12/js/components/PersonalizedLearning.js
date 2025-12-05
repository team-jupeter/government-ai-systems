// ============================================
// PersonalizedLearning 컴포넌트
// 개인화 학습 시스템
// ============================================

function PersonalizedLearning() {
    return (
        <div>
            {/* 개인화 학습 개요 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-user-graduate"></i>
                    <h2>개인화 학습 시스템</h2>
                </div>

                <div style={{
                    padding: '32px',
                    background: 'linear-gradient(135deg, #FB8C00 0%, #F57C00 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    marginBottom: '32px'
                }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>
                        <i className="fas fa-magic"></i> 모든 학생을 위한 맞춤형 교육
                    </h2>
                    <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                        각 학생의 학습 스타일, 속도, 선호도를 AI가 분석하여 
                        개인에게 최적화된 학습 경험을 제공합니다.
                    </p>
                </div>

                <div className="grid grid-4">
                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            학습 스타일
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            8
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>가지</span>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            성적 향상
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            34
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            학습 만족도
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning-50)' }}>
                            94.7
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            학습 지속률
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            87.5
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 개인화 요소 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-sliders-h"></i>
                    <h2>개인화 핵심 요소</h2>
                </div>

                <div className="grid grid-2">
                    {[
                        {
                            title: '학습 스타일 분석',
                            icon: '🎨',
                            description: '개인별 선호하는 학습 방식을 AI가 자동으로 파악',
                            details: [
                                '시각적 학습자: 그림, 도표, 영상 중심 콘텐츠',
                                '청각적 학습자: 음성 설명, 토론, 강의 중심',
                                '체험적 학습자: 실습, 실험, 프로젝트 중심',
                                '읽기/쓰기 학습자: 텍스트, 노트 정리 중심',
                                '논리적 학습자: 순차적, 구조화된 설명',
                                '사회적 학습자: 그룹 학습, 토론 선호',
                                '독립적 학습자: 개별 학습, 자기 주도적',
                                '복합형 학습자: 여러 방식 혼합'
                            ],
                            color: 'var(--primary-50)'
                        },
                        {
                            title: '적응형 난이도 조절',
                            icon: '📈',
                            description: '실시간 정답률 기반으로 문제 난이도 자동 조정',
                            details: [
                                '정답률 80% 이상: 난이도 상향 조정',
                                '정답률 50-80%: 현재 난이도 유지',
                                '정답률 50% 이하: 난이도 하향 조정',
                                '연속 오답: 선수 학습 추천',
                                '연속 정답: 도전 과제 제시',
                                '문제별 소요 시간 분석',
                                '오답 패턴 파악',
                                '최적 학습 구간 유지 (Zone of Proximal Development)'
                            ],
                            color: 'var(--success-50)'
                        },
                        {
                            title: '개인별 학습 속도',
                            icon: '⏱️',
                            description: '각자의 페이스에 맞춰 학습 진행',
                            details: [
                                '빠른 학습자: 심화 콘텐츠 제공',
                                '보통 학습자: 표준 커리큘럼',
                                '느린 학습자: 추가 설명 및 반복 학습',
                                '학습 시간 자유 선택',
                                '선수 학습 필요 시 자동 안내',
                                '마스터리 학습: 충분히 이해할 때까지',
                                '학습 휴식 시간 최적화',
                                '집중력 패턴 분석 및 반영'
                            ],
                            color: 'var(--warning-50)'
                        },
                        {
                            title: '강점/약점 분석',
                            icon: '🎯',
                            description: '학습 영역별 성취도를 분석하여 맞춤 학습',
                            details: [
                                '과목별 성취도 상세 분석',
                                '개념별 이해도 측정',
                                '취약 영역 집중 보완',
                                '강점 영역 더 발전시키기',
                                '학습 진행 상황 시각화',
                                '부모/교사에게 리포트 제공',
                                '장기 학습 추이 분석',
                                '동급생 대비 상대적 위치'
                            ],
                            color: 'var(--primary-50)'
                        },
                        {
                            title: '학습 선호도 반영',
                            icon: '❤️',
                            description: '학생의 관심사와 흥미를 학습에 연결',
                            details: [
                                '관심 분야 기반 예시 제공',
                                '좋아하는 주제로 학습 동기 부여',
                                '취미와 연결된 실생활 문제',
                                '진로 희망과 연계된 콘텐츠',
                                '선호하는 미디어 형식 사용',
                                '게임, 스포츠 등 흥미 요소 활용',
                                '개인 맞춤 보상 시스템',
                                '학습 환경 설정 (배경음악, 테마 등)'
                            ],
                            color: 'var(--success-50)'
                        },
                        {
                            title: '망각 곡선 기반 복습',
                            icon: '🔄',
                            description: '과학적 복습 타이밍으로 장기 기억 형성',
                            details: [
                                '에빙하우스 망각 곡선 적용',
                                '학습 후 1일, 3일, 7일, 14일 자동 복습',
                                '중요도에 따른 복습 빈도 조절',
                                '약한 개념 더 자주 복습',
                                '간격 반복 학습 (Spaced Repetition)',
                                '복습 알림 자동 발송',
                                '복습 효과 측정 및 조정',
                                '장기 기억 전환율 95% 이상'
                            ],
                            color: 'var(--warning-50)'
                        }
                    ].map((element, idx) => (
                        <div key={idx} className="card">
                            <div style={{ fontSize: '64px', marginBottom: '16px', textAlign: 'center' }}>{element.icon}</div>
                            <h3 style={{
                                fontSize: '20px',
                                fontWeight: '600',
                                marginBottom: '12px',
                                color: element.color,
                                textAlign: 'center'
                            }}>
                                {element.title}
                            </h3>
                            <p style={{
                                fontSize: '14px',
                                color: 'var(--gray-70)',
                                marginBottom: '16px',
                                textAlign: 'center',
                                fontWeight: '600'
                            }}>
                                {element.description}
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {element.details.map((detail, didx) => (
                                    <div key={didx} style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '8px',
                                        padding: '8px',
                                        background: 'var(--gray-5)',
                                        borderRadius: '4px'
                                    }}>
                                        <i className="fas fa-check" style={{
                                            color: element.color,
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

            {/* 개인화 학습 효과 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-trophy"></i>
                    <h2>검증된 학습 효과</h2>
                </div>

                <div className="grid grid-3">
                    {[
                        { metric: '평균 성적', improvement: '+34%', desc: '기존 교육 대비', color: 'var(--success-50)' },
                        { metric: '학습 완료율', improvement: '+52%', desc: '중도 포기 감소', color: 'var(--primary-50)' },
                        { metric: '학습 만족도', improvement: '94.7%', desc: '학생 설문조사', color: 'var(--warning-50)' }
                    ].map((effect, idx) => (
                        <div key={idx} style={{
                            padding: '24px',
                            background: 'white',
                            border: `2px solid ${effect.color}`,
                            borderRadius: '12px',
                            textAlign: 'center'
                        }}>
                            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                                {effect.metric}
                            </h4>
                            <div style={{ fontSize: '36px', fontWeight: '700', color: effect.color, marginBottom: '8px' }}>
                                {effect.improvement}
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

window.PersonalizedLearning = PersonalizedLearning;
