// ============================================
// AIAgents 컴포넌트
// 12개 특화 AI 에이전트
// ============================================

function AIAgents() {
    return (
        <div>
            {/* AI 에이전트 개요 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-robot"></i>
                    <h2>12개 특화 AI 에이전트</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'linear-gradient(135deg, #43A047 0%, #388E3C 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    marginBottom: '32px'
                }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>
                        <i className="fas fa-network-wired"></i> 전문화된 AI가 학습 전 과정 지원
                    </h3>
                    <p style={{ fontSize: '15px', lineHeight: '1.8' }}>
                        각 분야에 특화된 12개의 AI 에이전트가 협업하여 
                        학생, 교사, 학부모 모두에게 최적의 교육 경험을 제공합니다.
                    </p>
                </div>

                <div className="grid grid-4">
                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            운영 에이전트
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            12
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>개</span>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            처리 정확도
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            96.8
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            응답 시간
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning-50)' }}>
                            &lt;1
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>초</span>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            학생 만족도
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            93.4
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 에이전트 목록 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-users-cog"></i>
                    <h2>특화 AI 에이전트</h2>
                </div>

                <div className="grid grid-2">
                    {[
                        {
                            name: '학습 경로 추천 에이전트',
                            icon: '🎯',
                            model: 'Reinforcement Learning',
                            specialty: '개인별 최적 학습 경로 자동 설계',
                            tasks: [
                                '학습자 프로파일 기반 맞춤형 커리큘럼 생성',
                                '실시간 진도에 따른 경로 조정',
                                '선수 학습 자동 파악 및 연결',
                                '장기 학습 목표 달성 전략 수립'
                            ],
                            color: 'var(--primary-50)'
                        },
                        {
                            name: '콘텐츠 생성 에이전트',
                            icon: '✍️',
                            model: 'GPT-4 + Fine-tuning',
                            specialty: '학습자 수준에 맞는 교육 콘텐츠 자동 생성',
                            tasks: [
                                '난이도별 문제 자동 생성 (쉬움/보통/어려움)',
                                '설명 방식 다양화 (텍스트/영상/인터랙티브)',
                                '실생활 예시 자동 생성',
                                '학습자 관심사 기반 콘텐츠 개인화'
                            ],
                            color: 'var(--success-50)'
                        },
                        {
                            name: '평가 에이전트',
                            icon: '📝',
                            model: 'Item Response Theory + ML',
                            specialty: '적응형 평가 및 실시간 피드백',
                            tasks: [
                                '동적 난이도 조절 평가 (CAT)',
                                '즉각적 피드백 제공',
                                '오답 원인 분석 및 설명',
                                '종합 학습 성취도 평가'
                            ],
                            color: 'var(--warning-50)'
                        },
                        {
                            name: '피드백 에이전트',
                            icon: '💬',
                            model: 'NLP + Sentiment Analysis',
                            specialty: '맞춤형 피드백 및 격려',
                            tasks: [
                                '학습자 감정 상태 분석',
                                '긍정적 피드백 자동 생성',
                                '구체적인 개선 방향 제시',
                                '학습 동기 부여 메시지'
                            ],
                            color: 'var(--primary-50)'
                        },
                        {
                            name: '학습 동기 부여 에이전트',
                            icon: '🎮',
                            model: 'Gamification + Behavioral Psychology',
                            specialty: '게이미피케이션 및 보상 시스템',
                            tasks: [
                                '학습 목표 달성 시 보상 제공',
                                '배지, 포인트 시스템 관리',
                                '리더보드 및 도전 과제 생성',
                                '학습 습관 형성 지원'
                            ],
                            color: 'var(--success-50)'
                        },
                        {
                            name: '협업 촉진 에이전트',
                            icon: '🤝',
                            model: 'Social Network Analysis',
                            specialty: '또래 학습 네트워크 구성',
                            tasks: [
                                '학습 수준이 비슷한 학생끼리 그룹 형성',
                                '프로젝트 팀 최적 구성',
                                '협업 활동 모니터링 및 지원',
                                '그룹 내 역할 분담 추천'
                            ],
                            color: 'var(--warning-50)'
                        },
                        {
                            name: '학습 분석 에이전트',
                            icon: '📊',
                            model: 'Learning Analytics + Data Mining',
                            specialty: '학습 데이터 분석 및 예측',
                            tasks: [
                                '학습 패턴 분석 (시간, 속도, 집중도)',
                                '성적 예측 및 조기 경고',
                                '취약 영역 자동 발견',
                                '학습 전략 효과성 분석'
                            ],
                            color: 'var(--primary-50)'
                        },
                        {
                            name: '교사 지원 에이전트',
                            icon: '👨‍🏫',
                            model: 'Automated Grading + NLP',
                            specialty: 'AI 기반 교사 업무 지원',
                            tasks: [
                                '자동 채점 및 서술형 평가',
                                '학생 진도 리포트 자동 생성',
                                '교육 자료 추천',
                                '수업 계획 지원'
                            ],
                            color: 'var(--success-50)'
                        },
                        {
                            name: '학부모 소통 에이전트',
                            icon: '👪',
                            model: 'Communication AI',
                            specialty: '학부모-학교 소통 자동화',
                            tasks: [
                                '학습 진행 상황 주기적 알림',
                                '성적표 자동 생성 및 발송',
                                '상담 일정 조율',
                                '질문 응답 (FAQ 자동 답변)'
                            ],
                            color: 'var(--warning-50)'
                        },
                        {
                            name: '진로 상담 에이전트',
                            icon: '🎓',
                            model: 'Career Counseling AI',
                            specialty: 'AI 기반 진로 가이드',
                            tasks: [
                                '학생 강점/흥미 분석',
                                '적합한 진로 추천',
                                '대학/전공 정보 제공',
                                '진로 로드맵 작성 지원'
                            ],
                            color: 'var(--primary-50)'
                        },
                        {
                            name: '특수 교육 지원 에이전트',
                            icon: '🌟',
                            model: 'Inclusive Education AI',
                            specialty: '특수 교육 대상 학생 지원',
                            tasks: [
                                '학습 장애 조기 발견',
                                '개별화 교육 계획 (IEP) 수립',
                                '보조 기술 추천',
                                '특수 교육 자료 제공'
                            ],
                            color: 'var(--success-50)'
                        },
                        {
                            name: '언어 학습 에이전트',
                            icon: '🌐',
                            model: 'NLP + Speech Recognition',
                            specialty: '외국어 학습 전문 지원',
                            tasks: [
                                '발음 교정 (음성 인식)',
                                '문법 오류 자동 수정',
                                '맞춤형 대화 연습',
                                '다국어 번역 및 설명'
                            ],
                            color: 'var(--warning-50)'
                        }
                    ].map((agent, idx) => (
                        <div key={idx} className="card">
                            <div style={{ fontSize: '48px', marginBottom: '16px', textAlign: 'center' }}>{agent.icon}</div>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: '600',
                                marginBottom: '8px',
                                color: agent.color,
                                textAlign: 'center'
                            }}>
                                {agent.name}
                            </h3>

                            <div style={{
                                padding: '8px 12px',
                                background: 'var(--gray-5)',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '600',
                                color: 'var(--gray-70)',
                                marginBottom: '12px',
                                textAlign: 'center'
                            }}>
                                🤖 {agent.model}
                            </div>

                            <p style={{
                                fontSize: '14px',
                                color: 'var(--gray-90)',
                                fontWeight: '600',
                                marginBottom: '12px',
                                padding: '8px',
                                background: 'var(--primary-5)',
                                borderRadius: '6px',
                                textAlign: 'center'
                            }}>
                                {agent.specialty}
                            </p>

                            <div style={{ fontSize: '13px', color: 'var(--gray-70)', lineHeight: '1.8' }}>
                                {agent.tasks.map((task, tidx) => (
                                    <div key={tidx} style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '8px',
                                        marginBottom: '8px'
                                    }}>
                                        <i className="fas fa-check-circle" style={{
                                            color: agent.color,
                                            marginTop: '2px',
                                            fontSize: '14px'
                                        }}></i>
                                        <span>{task}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

window.AIAgents = AIAgents;
