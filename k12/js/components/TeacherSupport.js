// ============================================
// TeacherSupport 컴포넌트
// 교사 지원 시스템
// ============================================

function TeacherSupport() {
    return (
        <div>
            {/* 교사 지원 개요 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-chalkboard-teacher"></i>
                    <h2>교사 지원 시스템</h2>
                </div>

                <div style={{
                    padding: '32px',
                    background: 'linear-gradient(135deg, #5E35B1 0%, #4527A0 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    marginBottom: '32px'
                }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>
                        <i className="fas fa-hands-helping"></i> AI가 교사의 업무를 지원합니다
                    </h2>
                    <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                        행정 업무를 자동화하고 교육 활동을 지원하여 
                        교사가 학생 지도에 집중할 수 있도록 돕습니다.
                    </p>
                </div>

                <div className="grid grid-4">
                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            행정 업무 감소
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            40
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            채점 시간 절약
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            70
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            교사 만족도
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning-50)' }}>
                            92.3
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            수업 준비 시간
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            -35
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 교사 지원 기능 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-toolbox"></i>
                    <h2>교사 지원 핵심 기능</h2>
                </div>

                <div className="grid grid-2">
                    {[
                        {
                            title: '자동 채점 시스템',
                            icon: '✅',
                            description: 'AI가 객관식, 서술형, 코딩 문제를 자동으로 채점',
                            features: [
                                '객관식 자동 채점 (100% 정확도)',
                                '서술형 AI 채점 (정확도 94.2%)',
                                '코딩 과제 자동 실행 및 평가',
                                '채점 기준표 기반 공정 채점',
                                '부분 점수 자동 부여',
                                '교사 최종 확인 및 조정 가능'
                            ],
                            color: 'var(--success-50)'
                        },
                        {
                            title: '학생 진도 모니터링',
                            icon: '📊',
                            description: '학급 전체 및 개별 학생의 학습 현황을 한눈에',
                            features: [
                                '학급 전체 성취도 분포 시각화',
                                '개별 학생 상세 리포트',
                                '조기 경고 시스템 (학습 부진 감지)',
                                '출석 및 참여도 추적',
                                '과제 제출 현황',
                                '학습 시간 및 패턴 분석'
                            ],
                            color: 'var(--primary-50)'
                        },
                        {
                            title: '교육 자료 추천',
                            icon: '📚',
                            description: '수업에 필요한 최적의 교육 자료를 AI가 추천',
                            features: [
                                '단원별 우수 교육 자료 큐레이션',
                                '학생 수준에 맞는 자료 추천',
                                '멀티미디어 자료 (영상, 이미지, 인터랙티브)',
                                '실생활 연계 예시 제공',
                                '최신 교육 트렌드 반영',
                                '다른 교사 공유 자료 접근'
                            ],
                            color: 'var(--warning-50)'
                        },
                        {
                            title: '수업 계획 지원',
                            icon: '📝',
                            description: '효과적인 수업 계획 수립을 AI가 도와줌',
                            features: [
                                '학습 목표 기반 수업안 자동 생성',
                                '시간 배분 최적화',
                                '다양한 교수법 제안',
                                '평가 문항 자동 생성',
                                '차시별 연계성 확보',
                                '수정 및 개인화 쉬움'
                            ],
                            color: 'var(--success-50)'
                        },
                        {
                            title: '학부모 소통 자동화',
                            icon: '📧',
                            description: '학부모와의 소통을 간편하게',
                            features: [
                                '성적표 자동 생성 및 발송',
                                '개별 피드백 템플릿',
                                '상담 일정 자동 조율',
                                'FAQ 자동 응답',
                                '알림 메시지 자동 발송',
                                '학부모 질문 우선순위 분류'
                            ],
                            color: 'var(--primary-50)'
                        },
                        {
                            title: '행정 업무 자동화',
                            icon: '⚙️',
                            description: '반복적인 행정 업무를 AI가 처리',
                            features: [
                                '출결 관리 자동화',
                                '성적 입력 및 통계',
                                '보고서 자동 작성',
                                '학생부 기록 지원',
                                '공문 처리 보조',
                                '일정 관리 및 알림'
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

            {/* 교사 업무 효과 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-clock"></i>
                    <h2>교사 업무 시간 절약 효과</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'white',
                    border: '2px solid var(--success-50)',
                    borderRadius: '12px'
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--success-50)', marginBottom: '20px' }}>
                        <i className="fas fa-hourglass-half"></i> 주간 평균 업무 시간 비교
                    </h3>

                    <div className="grid grid-2" style={{ gap: '20px' }}>
                        <div style={{
                            padding: '20px',
                            background: 'var(--error-5)',
                            border: '2px solid var(--error-50)',
                            borderRadius: '8px'
                        }}>
                            <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--error-50)', marginBottom: '16px', textAlign: 'center' }}>
                                ❌ 기존 방식
                            </h4>
                            {[
                                { task: '수업 준비', time: '10시간' },
                                { task: '채점 및 평가', time: '8시간' },
                                { task: '행정 업무', time: '6시간' },
                                { task: '학부모 소통', time: '4시간' },
                                { task: '학생 상담', time: '5시간' }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    background: 'white',
                                    borderRadius: '6px',
                                    marginBottom: '8px'
                                }}>
                                    <span style={{ fontSize: '14px' }}>{item.task}</span>
                                    <strong style={{ fontSize: '14px', color: 'var(--error-50)' }}>{item.time}</strong>
                                </div>
                            ))}
                            <div style={{
                                marginTop: '16px',
                                padding: '12px',
                                background: 'var(--error-50)',
                                color: 'white',
                                borderRadius: '6px',
                                textAlign: 'center',
                                fontSize: '18px',
                                fontWeight: '700'
                            }}>
                                총 33시간/주
                            </div>
                        </div>

                        <div style={{
                            padding: '20px',
                            background: 'var(--success-5)',
                            border: '2px solid var(--success-50)',
                            borderRadius: '8px'
                        }}>
                            <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--success-50)', marginBottom: '16px', textAlign: 'center' }}>
                                ✅ AI 지원 방식
                            </h4>
                            {[
                                { task: '수업 준비', time: '6.5시간', saved: '-35%' },
                                { task: '채점 및 평가', time: '2.4시간', saved: '-70%' },
                                { task: '행정 업무', time: '3.6시간', saved: '-40%' },
                                { task: '학부모 소통', time: '2.4시간', saved: '-40%' },
                                { task: '학생 상담', time: '7시간', saved: '+40%' }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '10px',
                                    background: 'white',
                                    borderRadius: '6px',
                                    marginBottom: '8px'
                                }}>
                                    <span style={{ fontSize: '14px' }}>{item.task}</span>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <strong style={{ fontSize: '14px', color: 'var(--success-50)' }}>{item.time}</strong>
                                        <span style={{
                                            fontSize: '11px',
                                            padding: '2px 6px',
                                            background: item.saved.includes('+') ? 'var(--primary-50)' : 'var(--success-50)',
                                            color: 'white',
                                            borderRadius: '4px'
                                        }}>
                                            {item.saved}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <div style={{
                                marginTop: '16px',
                                padding: '12px',
                                background: 'var(--success-50)',
                                color: 'white',
                                borderRadius: '6px',
                                textAlign: 'center',
                                fontSize: '18px',
                                fontWeight: '700'
                            }}>
                                총 21.9시간/주 (33% 절감)
                            </div>
                        </div>
                    </div>

                    <div style={{
                        marginTop: '20px',
                        padding: '16px',
                        background: 'var(--primary-5)',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <i className="fas fa-lightbulb" style={{ fontSize: '24px', color: 'var(--primary-50)', marginBottom: '8px' }}></i>
                        <p style={{ fontSize: '14px', color: 'var(--gray-80)', lineHeight: '1.6' }}>
                            <strong>절약된 시간은 학생 개별 상담과 교육에 집중!</strong><br/>
                            교사는 본연의 교육 활동에 40% 더 많은 시간을 투입할 수 있습니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.TeacherSupport = TeacherSupport;
