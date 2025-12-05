// ============================================
// 보안 시스템 컴포넌트
// 양자내성 보안 및 이중 해시체인
// ============================================

function SecuritySystem() {
    return (
        <div>
            {/* 보안 현황 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-shield-alt"></i>
                    <h2>보안 시스템 현황</h2>
                </div>

                <div className="grid grid-4">
                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            보안 레벨
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            양자내성
                        </div>
                    </div>

                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            해시 알고리즘
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            SHA-256
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            침해 사고
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            0
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>건</span>
                        </div>
                    </div>

                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            암호화 강도
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            256
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>bit</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 양자내성 보안 - 간소화 버전 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-atom"></i>
                    <h2>양자내성 암호화</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'linear-gradient(135deg, #6B46C1 0%, #553C9A 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    marginBottom: '24px'
                }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>
                        <i className="fas fa-lock"></i> 양자컴퓨터 공격에도 안전한 하이브리드 암호화
                    </h3>
                    <p style={{ fontSize: '15px', lineHeight: '1.8' }}>
                        기존 ECDSA와 양자내성 CRYSTALS-Dilithium을 결합한 하이브리드 서명 방식으로 
                        현재와 미래의 모든 공격에 대응합니다.
                    </p>
                </div>

                <div className="grid grid-2">
                    <div className="card">
                        <div style={{ fontSize: '64px', marginBottom: '16px', textAlign: 'center' }}>🔐</div>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: 'var(--primary-50)', textAlign: 'center' }}>
                            ECDSA (현재 표준)
                        </h3>
                        <p style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '16px', textAlign: 'center' }}>
                            타원곡선 암호 / 256-bit / 클래식 컴퓨터 안전
                        </p>
                    </div>

                    <div className="card">
                        <div style={{ fontSize: '64px', marginBottom: '16px', textAlign: 'center' }}>⚛️</div>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: 'var(--success-50)', textAlign: 'center' }}>
                            CRYSTALS-Dilithium (양자내성)
                        </h3>
                        <p style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '16px', textAlign: 'center' }}>
                            격자 기반 암호 / 2,528-bit / 양자컴퓨터 안전
                        </p>
                    </div>
                </div>
            </div>

            {/* 이중 해시체인 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-link"></i>
                    <h2>이중 해시체인 구조</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'white',
                    border: '2px solid var(--primary-50)',
                    borderRadius: '12px'
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary-50)', marginBottom: '20px' }}>
                        <i className="fas fa-exchange-alt"></i> 소비자-판매자 상호 참조 구조
                    </h3>
                    
                    <p style={{ fontSize: '14px', color: 'var(--gray-70)', lineHeight: '1.8', marginBottom: '20px' }}>
                        소비자 해시체인과 판매자 해시체인이 서로를 참조하여 거래의 무결성을 이중으로 보장합니다.
                    </p>

                    <div className="grid grid-2" style={{ gap: '16px' }}>
                        <div style={{
                            padding: '20px',
                            background: 'var(--primary-5)',
                            border: '2px solid var(--primary-50)',
                            borderRadius: '8px'
                        }}>
                            <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--primary-50)', marginBottom: '12px' }}>
                                👤 소비자 해시체인
                            </h4>
                            <div style={{ fontSize: '13px', color: 'var(--gray-70)', lineHeight: '1.8' }}>
                                개인 단말에 저장된 구매 이력으로 판매자 해시체인을 참조합니다.
                            </div>
                        </div>

                        <div style={{
                            padding: '20px',
                            background: 'var(--success-5)',
                            border: '2px solid var(--success-50)',
                            borderRadius: '8px'
                        }}>
                            <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--success-50)', marginBottom: '12px' }}>
                                🏪 판매자 해시체인
                            </h4>
                            <div style={{ fontSize: '13px', color: 'var(--gray-70)', lineHeight: '1.8' }}>
                                OpenHash에 공개 저장된 판매 이력으로 소비자 해시체인을 참조합니다.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 추가 보안 기능 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-shield-virus"></i>
                    <h2>추가 보안 기능</h2>
                </div>

                <div className="grid grid-3">
                    {[
                        { feature: 'Merkle Proof 검증', icon: '🌳', desc: '데이터 무결성 즉시 검증', color: 'var(--primary-50)' },
                        { feature: '실시간 사기 탐지', icon: '🔍', desc: '이상 거래 자동 차단 (99.2%)', color: 'var(--error-50)' },
                        { feature: '다중 서명', icon: '✍️', desc: '고액 거래 다자 승인', color: 'var(--success-50)' },
                        { feature: '타임스탬프 증명', icon: '⏰', desc: '거래 시점 불변 기록', color: 'var(--warning-50)' },
                        { feature: '접근 제어', icon: '🔑', desc: '역할 기반 권한 관리', color: 'var(--primary-50)' },
                        { feature: '감사 로그', icon: '📝', desc: '모든 활동 추적 (7년 보관)', color: 'var(--success-50)' }
                    ].map((sec, idx) => (
                        <div key={idx} style={{
                            padding: '20px',
                            background: 'white',
                            border: `2px solid ${sec.color}`,
                            borderRadius: '12px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '48px', marginBottom: '12px' }}>{sec.icon}</div>
                            <h4 style={{ fontSize: '16px', fontWeight: '600', color: sec.color, marginBottom: '8px' }}>
                                {sec.feature}
                            </h4>
                            <p style={{ fontSize: '13px', color: 'var(--gray-70)' }}>
                                {sec.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

window.SecuritySystem = SecuritySystem;
