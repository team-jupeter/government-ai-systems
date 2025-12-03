// ============================================
// 규제 준수 컴포넌트
// 금융법규 준수 모니터링
// ============================================

function RegulatoryCompliance() {
    return (
        <div>
            {/* 규제 준수 현황 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-balance-scale"></i>
                    <h2>규제 준수 모니터링 현황</h2>
                </div>

                <div className="grid grid-4">
                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            준수율
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            99.7
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            위반 건수
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning-50)' }}>
                            23
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>건</span>
                        </div>
                    </div>

                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            자동 검사
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            847
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>만건</span>
                        </div>
                    </div>

                    <div className="stat-card error">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            중대 위반
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--error-50)' }}>
                            3
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>건</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 주요 금융법규 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-gavel"></i>
                    <h2>AI 자동 검증 법규</h2>
                </div>

                <div className="grid grid-2">
                    {[
                        {
                            law: '자본시장법',
                            icon: '📈',
                            articles: [
                                { title: '불공정거래 금지 (176조)', check: '시세조종, 내부자거래, 부정거래 실시간 탐지' },
                                { title: '공시 의무 (159조)', check: '주요 경영사항 미공시 여부 자동 검사' },
                                { title: '시장질서 교란 (178조)', check: '허위 정보 유포, 시세 조종 행위 감시' }
                            ]
                        },
                        {
                            law: '은행법',
                            icon: '🏦',
                            articles: [
                                { title: '대출 규제 (35조)', check: '동일인 대출한도, 담보 비율 자동 검사' },
                                { title: '자기자본 규제 (34조)', check: 'BIS 비율 실시간 모니터링' },
                                { title: '이해관계자 거래 (37조)', check: '특수관계인 대출 여부 추적' }
                            ]
                        },
                        {
                            law: '보험업법',
                            icon: '🛡️',
                            articles: [
                                { title: '지급여력비율 (120조)', check: 'RBC 비율 150% 이상 유지 확인' },
                                { title: '보험료 산정 (183조)', check: '보험료 적정성 자동 검증' },
                                { title: '자산 운용 (106조)', check: '운용 한도 및 제한 준수 여부' }
                            ]
                        },
                        {
                            law: '금융소비자보호법',
                            icon: '👥',
                            articles: [
                                { title: '적합성 원칙 (17조)', check: '투자자 성향에 맞는 상품 판매 여부' },
                                { title: '적정성 원칙 (18조)', check: '고위험 상품 판매 시 확인 의무' },
                                { title: '설명 의무 (19조)', check: '금융상품 주요 내용 설명 이행' }
                            ]
                        }
                    ].map((regulation, idx) => (
                        <div key={idx} className="card">
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>{regulation.icon}</div>
                            <h3 style={{ 
                                fontSize: '18px', 
                                fontWeight: '600', 
                                marginBottom: '16px',
                                color: 'var(--primary-50)'
                            }}>
                                {regulation.law}
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {regulation.articles.map((article, aidx) => (
                                    <div key={aidx} style={{
                                        padding: '12px',
                                        background: 'var(--gray-5)',
                                        borderRadius: '8px',
                                        borderLeft: '3px solid var(--primary-50)'
                                    }}>
                                        <div style={{ 
                                            fontSize: '14px', 
                                            fontWeight: '600',
                                            color: 'var(--gray-90)',
                                            marginBottom: '6px'
                                        }}>
                                            {article.title}
                                        </div>
                                        <div style={{ 
                                            fontSize: '12px', 
                                            color: 'var(--gray-70)',
                                            lineHeight: '1.5'
                                        }}>
                                            <i className="fas fa-check" style={{ color: 'var(--success-50)', marginRight: '6px' }}></i>
                                            {article.check}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* LLM 기반 법률 준수 검증 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-brain"></i>
                    <h2>LLM 기반 법률 판정 시스템</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'white',
                    border: '2px solid var(--primary-50)',
                    borderRadius: '12px'
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary-50)', marginBottom: '20px' }}>
                        <i className="fas fa-robot"></i> DeepSeek-R1 기반 법률 에이전트
                    </h3>
                    
                    <div className="grid grid-3" style={{ gap: '16px', marginBottom: '20px' }}>
                        <div style={{ padding: '16px', background: 'var(--gray-5)', borderRadius: '8px' }}>
                            <h4 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '12px' }}>
                                <i className="fas fa-book"></i> 학습 데이터
                            </h4>
                            <ul style={{ fontSize: '13px', color: 'var(--gray-70)', lineHeight: '1.8', paddingLeft: '20px' }}>
                                <li>금융 관련 법률 전문 (27개 법률)</li>
                                <li>금융위 행정규칙 및 고시 (347개)</li>
                                <li>대법원 판례 10만 건</li>
                                <li>금융감독원 제재 사례 5만 건</li>
                            </ul>
                        </div>
                        
                        <div style={{ padding: '16px', background: 'var(--gray-5)', borderRadius: '8px' }}>
                            <h4 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '12px' }}>
                                <i className="fas fa-cog"></i> 작동 방식
                            </h4>
                            <ul style={{ fontSize: '13px', color: 'var(--gray-70)', lineHeight: '1.8', paddingLeft: '20px' }}>
                                <li>거래 데이터를 자연어로 변환</li>
                                <li>LLM이 관련 법조문 검색</li>
                                <li>위반 여부 자동 판정</li>
                                <li>판정 근거 및 법조문 제시</li>
                            </ul>
                        </div>
                        
                        <div style={{ padding: '16px', background: 'var(--gray-5)', borderRadius: '8px' }}>
                            <h4 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '12px' }}>
                                <i className="fas fa-chart-line"></i> 성능 지표
                            </h4>
                            <ul style={{ fontSize: '13px', color: 'var(--gray-70)', lineHeight: '1.8', paddingLeft: '20px' }}>
                                <li>판정 정확도: <strong>98.7%</strong></li>
                                <li>처리 속도: <strong>0.8초/건</strong></li>
                                <li>오탐률: <strong>0.3%</strong></li>
                                <li>설명 가능성: <strong>100%</strong></li>
                            </ul>
                        </div>
                    </div>

                    <div style={{
                        padding: '16px',
                        background: 'var(--success-50)',
                        color: 'white',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <i className="fas fa-lightbulb" style={{ fontSize: '24px' }}></i>
                        <div>
                            <strong style={{ fontSize: '15px' }}>인간 감독자 협업</strong>
                            <p style={{ fontSize: '13px', marginTop: '4px', opacity: 0.95 }}>
                                LLM이 위반 의심 거래를 1차 선별하고, 인간 전문가가 최종 판단하여 
                                정확도와 효율성을 모두 확보합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.RegulatoryCompliance = RegulatoryCompliance;
