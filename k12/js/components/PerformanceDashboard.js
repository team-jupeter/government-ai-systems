// ============================================
// PerformanceDashboard 컴포넌트
// 성과 대시보드
// ============================================

function PerformanceDashboard() {
    return (
        <div>
            {/* 성과 대시보드 개요 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-trophy"></i>
                    <h2>성과 대시보드</h2>
                </div>

                <div style={{
                    padding: '32px',
                    background: 'linear-gradient(135deg, #43A047 0%, #388E3C 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    marginBottom: '32px'
                }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>
                        <i className="fas fa-chart-bar"></i> 검증된 교육 효과
                    </h2>
                    <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                        전국 500만 명의 K-12 학생 데이터 분석을 통해 
                        입증된 학습 효과와 비용 절감 효과를 확인하세요.
                    </p>
                </div>

                <div className="grid grid-4">
                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            전체 학생 수
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            500만
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>명</span>
                        </div>
                    </div>

                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            평균 성적 향상
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            +34
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            학습 만족도
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            94.7
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            비용 절감
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning-50)' }}>
                            45
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 학습 성과 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-graduation-cap"></i>
                    <h2>학습 성과 지표</h2>
                </div>

                <div className="grid grid-3">
                    {[
                        {
                            category: '학업 성취도',
                            metrics: [
                                { label: '평균 성적 향상', value: '+34%', desc: '기존 교육 방식 대비' },
                                { label: '상위권 진입률', value: '+52%', desc: '하위 25% 학생' },
                                { label: '학습 목표 달성률', value: '87.5%', desc: '설정 목표 완수' }
                            ],
                            color: 'var(--success-50)'
                        },
                        {
                            category: '학습 동기 및 태도',
                            metrics: [
                                { label: '학습 참여도', value: '+52%', desc: '게이미피케이션 효과' },
                                { label: '학습 지속률', value: '87.5%', desc: '중도 포기 감소' },
                                { label: '자기주도 학습', value: '+45%', desc: '메타인지 강화' }
                            ],
                            color: 'var(--primary-50)'
                        },
                        {
                            category: '21세기 역량',
                            metrics: [
                                { label: '문제 해결 능력', value: '+38%', desc: '프로젝트 참여' },
                                { label: '협업 능력', value: '+45%', desc: '사회적 학습' },
                                { label: '창의성', value: '+32%', desc: 'AI 도구 활용' }
                            ],
                            color: 'var(--warning-50)'
                        }
                    ].map((category, idx) => (
                        <div key={idx} style={{
                            padding: '24px',
                            background: 'white',
                            border: `2px solid ${category.color}`,
                            borderRadius: '12px'
                        }}>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: '600',
                                color: category.color,
                                marginBottom: '20px',
                                textAlign: 'center'
                            }}>
                                {category.category}
                            </h3>
                            {category.metrics.map((metric, midx) => (
                                <div key={midx} style={{
                                    padding: '16px',
                                    background: 'var(--gray-5)',
                                    borderRadius: '8px',
                                    marginBottom: '12px'
                                }}>
                                    <div style={{ fontSize: '13px', color: 'var(--gray-70)', marginBottom: '6px' }}>
                                        {metric.label}
                                    </div>
                                    <div style={{ fontSize: '28px', fontWeight: '700', color: category.color, marginBottom: '4px' }}>
                                        {metric.value}
                                    </div>
                                    <div style={{ fontSize: '12px', color: 'var(--gray-60)' }}>
                                        {metric.desc}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* 비용 효과 분석 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-dollar-sign"></i>
                    <h2>비용 효과 분석</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'white',
                    border: '2px solid var(--success-50)',
                    borderRadius: '12px',
                    marginBottom: '24px'
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--success-50)', marginBottom: '20px' }}>
                        <i className="fas fa-piggy-bank"></i> 학생 1인당 연간 비용 비교
                    </h3>

                    <div className="grid grid-2" style={{ gap: '20px' }}>
                        <div style={{
                            padding: '20px',
                            background: 'var(--error-5)',
                            border: '2px solid var(--error-50)',
                            borderRadius: '8px',
                            textAlign: 'center'
                        }}>
                            <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--error-50)', marginBottom: '16px' }}>
                                ❌ 기존 교육 방식
                            </h4>
                            <div style={{ fontSize: '48px', fontWeight: '700', color: 'var(--error-50)', marginBottom: '8px' }}>
                                ₩2.2M
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--gray-70)' }}>
                                학생 1인당 연간 교육 비용
                            </p>
                        </div>

                        <div style={{
                            padding: '20px',
                            background: 'var(--success-5)',
                            border: '2px solid var(--success-50)',
                            borderRadius: '8px',
                            textAlign: 'center'
                        }}>
                            <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--success-50)', marginBottom: '16px' }}>
                                ✅ AI 교육 시스템
                            </h4>
                            <div style={{ fontSize: '48px', fontWeight: '700', color: 'var(--success-50)', marginBottom: '8px' }}>
                                ₩1.2M
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--gray-70)' }}>
                                학생 1인당 연간 교육 비용
                            </p>
                        </div>
                    </div>

                    <div style={{
                        marginTop: '20px',
                        padding: '20px',
                        background: 'var(--success-50)',
                        color: 'white',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>
                            💰 연간 절감액: ₩1M / 학생 (45% 절감)
                        </div>
                        <div style={{ fontSize: '14px', opacity: 0.95 }}>
                            전국 500만 명 기준 연간 총 절감액: <strong>₩5조</strong>
                        </div>
                    </div>
                </div>

                <div className="grid grid-4" style={{ gap: '16px' }}>
                    {[
                        { item: '교사 인건비', saving: '-25%', amount: '₩550K' },
                        { item: '교재 및 자료', saving: '-60%', amount: '₩180K' },
                        { item: '시설 및 운영', saving: '-35%', amount: '₩140K' },
                        { item: 'AI 시스템', cost: '+₩130K', amount: '₩130K' }
                    ].map((item, idx) => (
                        <div key={idx} style={{
                            padding: '16px',
                            background: 'white',
                            border: '1px solid var(--gray-20)',
                            borderRadius: '8px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '13px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                                {item.item}
                            </div>
                            <div style={{
                                fontSize: '20px',
                                fontWeight: '700',
                                color: item.cost ? 'var(--primary-50)' : 'var(--success-50)',
                                marginBottom: '6px'
                            }}>
                                {item.saving || item.cost}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--gray-60)' }}>
                                {item.amount}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 사회적 영향 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-globe-asia"></i>
                    <h2>사회적 영향</h2>
                </div>

                <div className="grid grid-3">
                    {[
                        {
                            impact: '교육 격차 해소',
                            value: '68%',
                            desc: '지역/소득 격차 감소',
                            icon: '⚖️',
                            color: 'var(--success-50)'
                        },
                        {
                            impact: '교사 워라밸',
                            value: '+33%',
                            desc: '업무 시간 절감',
                            icon: '🧘',
                            color: 'var(--primary-50)'
                        },
                        {
                            impact: '탄소 배출 감소',
                            value: '-42%',
                            desc: '종이 교재 디지털화',
                            icon: '🌱',
                            color: 'var(--success-50)'
                        }
                    ].map((impact, idx) => (
                        <div key={idx} style={{
                            padding: '24px',
                            background: 'white',
                            border: `2px solid ${impact.color}`,
                            borderRadius: '12px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '48px', marginBottom: '12px' }}>{impact.icon}</div>
                            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                                {impact.impact}
                            </h4>
                            <div style={{ fontSize: '36px', fontWeight: '700', color: impact.color, marginBottom: '8px' }}>
                                {impact.value}
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--gray-70)' }}>
                                {impact.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ROI */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-chart-pie"></i>
                    <h2>투자 수익률 (ROI)</h2>
                </div>

                <div style={{
                    padding: '32px',
                    background: 'linear-gradient(135deg, #1976D2 0%, #1565C0 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    textAlign: 'center'
                }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>
                        <i className="fas fa-rocket"></i> 3년 누적 ROI
                    </h3>
                    <div style={{ fontSize: '64px', fontWeight: '700', marginBottom: '16px' }}>
                        320%
                    </div>
                    <p style={{ fontSize: '16px', lineHeight: '1.8', opacity: 0.95 }}>
                        초기 투자 대비 3.2배의 가치 창출<br/>
                        (교육 효과 향상 + 비용 절감 + 사회적 편익)
                    </p>
                </div>
            </div>
        </div>
    );
}

window.PerformanceDashboard = PerformanceDashboard;
