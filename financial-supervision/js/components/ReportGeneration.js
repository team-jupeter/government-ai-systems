// ============================================
// 보고서 생성 컴포넌트
// AI 기반 감독 보고서 자동 작성
// ============================================

function ReportGeneration() {
    return (
        <div>
            {/* 보고서 현황 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-file-alt"></i>
                    <h2>자동 생성 보고서 현황</h2>
                </div>

                <div className="grid grid-4">
                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            금일 생성
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            247
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>건</span>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            월간 누적
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            6,839
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>건</span>
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            작성 시간
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning-50)' }}>
                            2.3
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>분</span>
                        </div>
                    </div>

                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            자동화율
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            95.7
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 보고서 유형 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-list"></i>
                    <h2>자동 생성 보고서 유형</h2>
                </div>

                <div className="grid grid-3">
                    {[
                        {
                            type: '일일 감독 보고서',
                            icon: '📅',
                            frequency: '매일 18:00 자동 생성',
                            contents: [
                                '전일 거래 통계 (은행/증권/보험)',
                                '이상거래 탐지 현황 및 조치 사항',
                                '금융기관 건전성 지표 변화',
                                '주요 리스크 지표 모니터링'
                            ],
                            recipients: '금융위원회, 금융감독원 간부',
                            format: 'PDF 20-30페이지'
                        },
                        {
                            type: '주간 트렌드 분석 보고서',
                            icon: '📊',
                            frequency: '매주 월요일 10:00',
                            contents: [
                                '주간 거래량 및 거래액 추이',
                                '업권별/지역별 통계 분석',
                                '이상거래 패턴 변화 분석',
                                '시장 리스크 요인 분석'
                            ],
                            recipients: '금융위원회 위원, 감독국장',
                            format: 'PDF 40-50페이지'
                        },
                        {
                            type: '월간 종합 감독 보고서',
                            icon: '📑',
                            frequency: '매월 1일 09:00',
                            contents: [
                                '월간 감독 활동 종합',
                                '금융기관별 건전성 평가',
                                '주요 제재 및 조치 사항',
                                '차월 감독 계획'
                            ],
                            recipients: '금융위원회 전체, 국회 제출',
                            format: 'PDF 80-100페이지'
                        },
                        {
                            type: '특별 검사 보고서',
                            icon: '🔍',
                            frequency: '이슈 발생 시 즉시',
                            contents: [
                                '검사 배경 및 목적',
                                '검사 결과 상세 분석',
                                '위반 사항 및 증거 자료',
                                '제재 및 시정 조치 권고'
                            ],
                            recipients: '금융위원회, 검찰/감사원',
                            format: 'PDF 가변 (50-200페이지)'
                        },
                        {
                            type: '리스크 조기 경보 보고서',
                            icon: '⚠️',
                            frequency: '경보 발생 시 즉시',
                            contents: [
                                '리스크 감지 시점 및 내용',
                                'AI 분석 결과 및 예측',
                                '과거 유사 사례 비교',
                                '긴급 대응 조치 권고'
                            ],
                            recipients: '금융위원장, 총리실',
                            format: 'PDF 10-20페이지 (긴급)'
                        },
                        {
                            type: '분기 통계 보고서',
                            icon: '📈',
                            frequency: '분기 말일 익일',
                            contents: [
                                '분기 금융 거래 통계',
                                '건전성 지표 추이 분석',
                                '규제 준수율 통계',
                                '국제 비교 분석'
                            ],
                            recipients: '금융위원회, 기획재정부',
                            format: 'PDF 60-80페이지'
                        }
                    ].map((report, idx) => (
                        <div key={idx} className="card">
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>{report.icon}</div>
                            <h3 style={{ 
                                fontSize: '18px', 
                                fontWeight: '600', 
                                marginBottom: '12px',
                                color: 'var(--primary-50)'
                            }}>
                                {report.type}
                            </h3>
                            
                            <div style={{
                                padding: '8px 12px',
                                background: 'var(--primary-5)',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: '600',
                                color: 'var(--primary-50)',
                                marginBottom: '16px',
                                textAlign: 'center'
                            }}>
                                {report.frequency}
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <div style={{ 
                                    fontSize: '13px', 
                                    fontWeight: '600', 
                                    color: 'var(--gray-90)',
                                    marginBottom: '8px'
                                }}>
                                    📋 주요 내용
                                </div>
                                <ul style={{ 
                                    fontSize: '12px', 
                                    color: 'var(--gray-70)', 
                                    lineHeight: '1.8',
                                    paddingLeft: '20px',
                                    margin: 0
                                }}>
                                    {report.contents.map((content, cidx) => (
                                        <li key={cidx}>{content}</li>
                                    ))}
                                </ul>
                            </div>

                            <div style={{
                                padding: '12px',
                                background: 'var(--gray-5)',
                                borderRadius: '6px',
                                fontSize: '12px'
                            }}>
                                <div style={{ marginBottom: '6px' }}>
                                    <strong>수신:</strong> {report.recipients}
                                </div>
                                <div>
                                    <strong>형식:</strong> {report.format}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* AI 보고서 작성 프로세스 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-robot"></i>
                    <h2>AI 보고서 작성 프로세스</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'white',
                    border: '2px solid var(--primary-50)',
                    borderRadius: '12px'
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary-50)', marginBottom: '20px' }}>
                        <i className="fas fa-magic"></i> LLM 기반 자동 보고서 생성 (4단계)
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            {
                                step: '1',
                                title: '데이터 수집',
                                desc: 'OpenHash에서 해당 기간의 모든 거래 데이터 및 감독 활동 로그를 수집합니다.',
                                detail: '평균 2,847만 건의 거래 데이터를 0.5초 내에 수집',
                                icon: 'fa-database',
                                color: 'var(--primary-50)'
                            },
                            {
                                step: '2',
                                title: '통계 분석',
                                desc: 'Python 기반 분석 엔진이 거래 통계, 건전성 지표, 이상거래 현황을 자동 계산합니다.',
                                detail: '47개 핵심 지표를 1.2초 내에 계산 완료',
                                icon: 'fa-chart-line',
                                color: 'var(--success-50)'
                            },
                            {
                                step: '3',
                                title: 'LLM 보고서 작성',
                                desc: 'DeepSeek-R1이 통계 데이터를 자연어로 해석하고, 전문적인 보고서 형식으로 작성합니다.',
                                detail: '30페이지 보고서를 1.8분 만에 작성',
                                icon: 'fa-pen-fancy',
                                color: 'var(--warning-50)'
                            },
                            {
                                step: '4',
                                title: '검토 및 배포',
                                desc: '인간 검토자가 최종 검토 후 승인하면 자동으로 수신자에게 발송됩니다.',
                                detail: '평균 검토 시간 10분, 이메일 자동 발송',
                                icon: 'fa-paper-plane',
                                color: 'var(--primary-50)'
                            }
                        ].map((process, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                gap: '20px',
                                padding: '20px',
                                background: 'var(--gray-5)',
                                borderRadius: '8px',
                                borderLeft: `4px solid ${process.color}`
                            }}>
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    background: process.color,
                                    color: 'white',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '24px',
                                    fontWeight: '700',
                                    flexShrink: 0
                                }}>
                                    {process.step}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                        <i className={`fas ${process.icon}`} style={{ fontSize: '20px', color: process.color }}></i>
                                        <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--gray-90)' }}>
                                            {process.title}
                                        </h4>
                                    </div>
                                    <p style={{ fontSize: '14px', color: 'var(--gray-70)', lineHeight: '1.6', marginBottom: '8px' }}>
                                        {process.desc}
                                    </p>
                                    <div style={{
                                        padding: '8px 12px',
                                        background: 'white',
                                        borderRadius: '6px',
                                        fontSize: '13px',
                                        color: process.color,
                                        fontWeight: '600'
                                    }}>
                                        ⏱️ {process.detail}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        marginTop: '20px',
                        padding: '16px',
                        background: 'var(--success-50)',
                        color: 'white',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <i className="fas fa-check-circle" style={{ fontSize: '24px' }}></i>
                        <div>
                            <strong style={{ fontSize: '15px' }}>기존 방식 대비 효율성</strong>
                            <p style={{ fontSize: '13px', marginTop: '4px', opacity: 0.95 }}>
                                인간 작성 시 평균 4시간 소요 → AI 자동 작성 2.3분 + 인간 검토 10분 = 
                                <strong> 총 12.3분으로 95% 시간 절감</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.ReportGeneration = ReportGeneration;
