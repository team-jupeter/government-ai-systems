// ============================================
// 수요 예측 컴포넌트
// AI 기반 실시간 수요 예측 시스템
// ============================================

function DemandForecast() {
    return (
        <div>
            {/* 수요 예측 성능 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-chart-line"></i>
                    <h2>AI 수요 예측 시스템</h2>
                </div>

                <div className="grid grid-4">
                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            예측 정확도
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            89.7
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            예측 주기
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            7-30
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>일</span>
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            업데이트 주기
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning-50)' }}>
                            실시간
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            재고 최적화
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            34
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%↑</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI 모델 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-brain"></i>
                    <h2>수요 예측 AI 모델</h2>
                </div>

                <div className="grid grid-2">
                    {[
                        {
                            model: 'LSTM (Long Short-Term Memory)',
                            icon: '🧠',
                            purpose: '시계열 패턴 학습 및 장기 의존성 파악',
                            features: [
                                '과거 판매 데이터 시계열 분석',
                                '계절성 및 트렌드 자동 감지',
                                '7-30일 선행 수요 예측',
                                '정확도 89.7%'
                            ],
                            color: 'var(--primary-50)'
                        },
                        {
                            model: 'Prophet (Facebook)',
                            icon: '📈',
                            purpose: '다중 계절성 및 이벤트 효과 분석',
                            features: [
                                '주간/월간/연간 계절성 분해',
                                '명절/할인 이벤트 효과 반영',
                                '결측치 자동 처리',
                                '예측 구간 제공 (신뢰도 95%)'
                            ],
                            color: 'var(--success-50)'
                        },
                        {
                            model: 'XGBoost',
                            icon: '🌳',
                            purpose: '다변수 영향 요인 분석',
                            features: [
                                '가격/프로모션 영향 분석',
                                '경쟁사 가격 효과 반영',
                                '날씨/이벤트 등 외부 요인',
                                '특성 중요도 자동 계산'
                            ],
                            color: 'var(--warning-50)'
                        },
                        {
                            model: '앙상블 (Ensemble)',
                            icon: '🎯',
                            purpose: '다중 모델 통합으로 정확도 극대화',
                            features: [
                                'LSTM + Prophet + XGBoost 통합',
                                '가중평균 최적 조합',
                                '모델별 강점 활용',
                                '최종 정확도 89.7%'
                            ],
                            color: 'var(--primary-50)'
                        }
                    ].map((ai, idx) => (
                        <div key={idx} className="card">
                            <div style={{ fontSize: '48px', marginBottom: '16px', textAlign: 'center' }}>{ai.icon}</div>
                            <h3 style={{ 
                                fontSize: '18px', 
                                fontWeight: '600', 
                                marginBottom: '8px',
                                color: ai.color,
                                textAlign: 'center'
                            }}>
                                {ai.model}
                            </h3>
                            <p style={{ 
                                fontSize: '14px', 
                                color: 'var(--gray-70)', 
                                marginBottom: '16px',
                                textAlign: 'center',
                                padding: '8px',
                                background: 'var(--gray-5)',
                                borderRadius: '6px'
                            }}>
                                {ai.purpose}
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {ai.features.map((feature, fidx) => (
                                    <div key={fidx} style={{ 
                                        display: 'flex', 
                                        alignItems: 'flex-start', 
                                        gap: '8px'
                                    }}>
                                        <i className="fas fa-check-circle" style={{ 
                                            color: ai.color, 
                                            marginTop: '2px',
                                            fontSize: '14px'
                                        }}></i>
                                        <span style={{ fontSize: '13px', color: 'var(--gray-70)', lineHeight: '1.5' }}>
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 수요 예측 프로세스 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-cogs"></i>
                    <h2>수요 예측 프로세스</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'white',
                    border: '2px solid var(--primary-50)',
                    borderRadius: '12px'
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary-50)', marginBottom: '20px' }}>
                        <i className="fas fa-project-diagram"></i> 5단계 실시간 수요 예측
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            {
                                step: '1',
                                title: '데이터 수집',
                                desc: 'OpenHash에서 판매자 거래 이력 실시간 수집',
                                time: '실시간',
                                color: 'var(--primary-50)'
                            },
                            {
                                step: '2',
                                title: '전처리',
                                desc: '결측치 처리, 이상치 제거, 정규화',
                                time: '<1초',
                                color: 'var(--success-50)'
                            },
                            {
                                step: '3',
                                title: 'AI 예측',
                                desc: 'LSTM + Prophet + XGBoost 앙상블 모델 실행',
                                time: '2-3초',
                                color: 'var(--warning-50)'
                            },
                            {
                                step: '4',
                                title: '후처리',
                                desc: '예측 구간 생성, 신뢰도 계산',
                                time: '<1초',
                                color: 'var(--success-50)'
                            },
                            {
                                step: '5',
                                title: '적용',
                                desc: '재고 관리, 가격 책정, 프로모션 계획에 반영',
                                time: '즉시',
                                color: 'var(--primary-50)'
                            }
                        ].map((process, idx) => (
                            <div key={idx} style={{
                                padding: '16px',
                                background: 'var(--gray-5)',
                                borderRadius: '8px',
                                borderLeft: `4px solid ${process.color}`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px'
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: process.color,
                                    color: 'white',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    flexShrink: 0
                                }}>
                                    {process.step}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--gray-90)', marginBottom: '6px' }}>
                                        {process.title}
                                    </h4>
                                    <p style={{ fontSize: '13px', color: 'var(--gray-70)', marginBottom: '6px' }}>
                                        {process.desc}
                                    </p>
                                    <div style={{
                                        padding: '4px 10px',
                                        background: process.color,
                                        color: 'white',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        display: 'inline-block'
                                    }}>
                                        ⏱️ {process.time}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 비즈니스 가치 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-dollar-sign"></i>
                    <h2>비즈니스 가치</h2>
                </div>

                <div className="grid grid-3">
                    {[
                        {
                            metric: '재고 회전율',
                            improvement: '+34%',
                            desc: '정확한 수요 예측으로 과잉 재고 방지',
                            icon: '📦',
                            color: 'var(--success-50)'
                        },
                        {
                            metric: '품절 방지',
                            improvement: '-67%',
                            desc: '선행 예측으로 품절 상황 사전 대응',
                            icon: '✅',
                            color: 'var(--primary-50)'
                        },
                        {
                            metric: '마진 개선',
                            improvement: '+12.3%',
                            desc: '최적 가격 책정 및 프로모션 타이밍',
                            icon: '💰',
                            color: 'var(--warning-50)'
                        }
                    ].map((value, idx) => (
                        <div key={idx} style={{
                            padding: '24px',
                            background: 'white',
                            border: `2px solid ${value.color}`,
                            borderRadius: '12px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '48px', marginBottom: '12px' }}>{value.icon}</div>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--gray-90)', marginBottom: '8px' }}>
                                {value.metric}
                            </h3>
                            <div style={{ fontSize: '32px', fontWeight: '700', color: value.color, marginBottom: '12px' }}>
                                {value.improvement}
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--gray-70)', lineHeight: '1.5' }}>
                                {value.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

window.DemandForecast = DemandForecast;
