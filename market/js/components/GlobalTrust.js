// ============================================
// 글로벌 신뢰 컴포넌트
// 7계층 분산 신뢰 시스템
// ============================================

function GlobalTrust() {
    return (
        <div>
            {/* 7계층 구조 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-layer-group"></i>
                    <h2>7계층 글로벌 분산 신뢰 시스템</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'linear-gradient(135deg, #0066CC 0%, #004C99 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    marginBottom: '24px'
                }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>
                        <i className="fas fa-globe"></i> 읍면동 → 글로벌까지 확장 가능한 구조
                    </h3>
                    <p style={{ fontSize: '15px', lineHeight: '1.8', opacity: 0.95 }}>
                        물리적으로 분산된 7계층 구조로 지역부터 글로벌까지 단계적 신뢰 형성을 구현합니다.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                        {
                            level: 'Level 1: 읍면동',
                            nodes: '3,500개',
                            coverage: '약 1만 명',
                            role: '기초 단위 거래 검증',
                            example: '마을 시장, 동네 상점',
                            color: 'var(--primary-50)'
                        },
                        {
                            level: 'Level 2: 시군구',
                            nodes: '230개',
                            coverage: '약 50만 명',
                            role: '지역 거래 집계',
                            example: '지역 시장, 중소 유통',
                            color: 'var(--success-50)'
                        },
                        {
                            level: 'Level 3: 광역시도',
                            nodes: '17개',
                            coverage: '약 300만 명',
                            role: '광역 거래 조정',
                            example: '광역 유통망, 대형마트',
                            color: 'var(--warning-50)'
                        },
                        {
                            level: 'Level 4: 국가',
                            nodes: '1개',
                            coverage: '5,200만 명',
                            role: '국가 거래 통합',
                            example: '전국 유통, 대기업',
                            color: 'var(--primary-50)'
                        },
                        {
                            level: 'Level 5: 지역권 (동아시아)',
                            nodes: '3개',
                            coverage: '약 15억 명',
                            role: '역내 무역 조정',
                            example: '한중일 FTA',
                            color: 'var(--success-50)'
                        },
                        {
                            level: 'Level 6: 대륙 (아시아)',
                            nodes: '1개',
                            coverage: '약 45억 명',
                            role: '대륙간 무역',
                            example: 'RCEP, ASEAN',
                            color: 'var(--warning-50)'
                        },
                        {
                            level: 'Level 7: 글로벌',
                            nodes: '1개',
                            coverage: '80억 명',
                            role: '전세계 거래 통합',
                            example: 'WTO, 글로벌 전자상거래',
                            color: 'var(--error-50)'
                        }
                    ].map((layer, idx) => (
                        <div key={idx} style={{
                            padding: '20px',
                            background: 'white',
                            borderRadius: '8px',
                            border: `2px solid ${layer.color}`,
                            borderLeft: `6px solid ${layer.color}`,
                            display: 'flex',
                            gap: '20px',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                background: layer.color,
                                color: 'white',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px',
                                fontWeight: '700',
                                flexShrink: 0
                            }}>
                                {idx + 1}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '18px', fontWeight: '600', color: layer.color, marginBottom: '8px' }}>
                                    {layer.level}
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', fontSize: '13px' }}>
                                    <div>
                                        <strong style={{ color: 'var(--gray-90)' }}>노드 수:</strong> {layer.nodes}
                                    </div>
                                    <div>
                                        <strong style={{ color: 'var(--gray-90)' }}>커버리지:</strong> {layer.coverage}
                                    </div>
                                    <div>
                                        <strong style={{ color: 'var(--gray-90)' }}>역할:</strong> {layer.role}
                                    </div>
                                    <div>
                                        <strong style={{ color: 'var(--gray-90)' }}>예시:</strong> {layer.example}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 확률적 계층 선택 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-random"></i>
                    <h2>확률적 계층 선택 알고리즘</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'white',
                    border: '2px solid var(--primary-50)',
                    borderRadius: '12px'
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary-50)', marginBottom: '20px' }}>
                        <i className="fas fa-chart-pie"></i> 카이제곱 검정 기반 편향 자동 교정
                    </h3>
                    
                    <p style={{ fontSize: '14px', color: 'var(--gray-70)', lineHeight: '1.8', marginBottom: '20px' }}>
                        거래 검증 시 특정 계층에 부하가 집중되지 않도록 확률적으로 계층을 선택하며, 
                        카이제곱 검정으로 편향을 자동 감지하고 교정합니다.
                    </p>

                    <div className="grid grid-3" style={{ gap: '16px' }}>
                        {[
                            {
                                step: '1단계: 초기 확률 설정',
                                desc: '각 계층에 균등 확률 할당 (1/7 ≈ 14.3%)',
                                icon: 'fa-equals'
                            },
                            {
                                step: '2단계: 부하 모니터링',
                                desc: '실시간 계층별 처리량 추적',
                                icon: 'fa-tachometer-alt'
                            },
                            {
                                step: '3단계: 편향 검정',
                                desc: '카이제곱 검정으로 편향 여부 판단',
                                icon: 'fa-balance-scale'
                            },
                            {
                                step: '4단계: 확률 조정',
                                desc: '과부하 계층 확률 감소, 여유 계층 증가',
                                icon: 'fa-sliders-h'
                            },
                            {
                                step: '5단계: 적용',
                                desc: '조정된 확률로 계층 선택',
                                icon: 'fa-play'
                            },
                            {
                                step: '6단계: 반복',
                                desc: '10초마다 재검정 및 조정',
                                icon: 'fa-sync'
                            }
                        ].map((step, idx) => (
                            <div key={idx} style={{
                                padding: '16px',
                                background: 'var(--gray-5)',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <i className={`fas ${step.icon}`} style={{ 
                                    fontSize: '32px', 
                                    color: 'var(--primary-50)',
                                    marginBottom: '12px'
                                }}></i>
                                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                                    {step.step}
                                </h4>
                                <p style={{ fontSize: '12px', color: 'var(--gray-70)', lineHeight: '1.5' }}>
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 물리적 데이터 주권 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-server"></i>
                    <h2>물리적 데이터 주권 구현</h2>
                </div>

                <div className="grid grid-2">
                    <div style={{
                        padding: '24px',
                        background: 'white',
                        border: '2px solid var(--success-50)',
                        borderRadius: '12px'
                    }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--success-50)', marginBottom: '16px' }}>
                            <i className="fas fa-mobile-alt"></i> 개인 단말 분산 저장
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { label: '실제 거래 데이터', location: '개인 스마트폰/PC' },
                                { label: '암호화 키', location: '개인 단말 (외부 유출 불가)' },
                                { label: '중앙 서버 저장', location: '해시값만 보관' },
                                { label: '데이터 소유권', location: '100% 개인' }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    padding: '12px',
                                    background: 'var(--success-50)',
                                    color: 'white',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <strong>{item.label}</strong>
                                    <span>{item.location}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{
                        padding: '24px',
                        background: 'white',
                        border: '2px solid var(--primary-50)',
                        borderRadius: '12px'
                    }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary-50)', marginBottom: '16px' }}>
                            <i className="fas fa-shield-alt"></i> 5단계 재해복구
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { time: '3초', method: '로컬 백업 복구' },
                                { time: '30초', method: '동일 계층 복구' },
                                { time: '5분', method: '상위 계층 복구' },
                                { time: '1시간', method: '국가 센터 복구' },
                                { time: '1주일', method: '글로벌 백업 복구' }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    padding: '12px',
                                    background: 'var(--gray-5)',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--primary-50)' }}>
                                        {item.time}
                                    </span>
                                    <span style={{ fontSize: '14px', color: 'var(--gray-70)' }}>
                                        {item.method}
                                    </span>
                                </div>
                            ))}
                            <div style={{
                                padding: '12px',
                                background: 'var(--success-50)',
                                color: 'white',
                                borderRadius: '6px',
                                textAlign: 'center',
                                fontWeight: '600'
                            }}>
                                ✓ 복구 성공률 98%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.GlobalTrust = GlobalTrust;
