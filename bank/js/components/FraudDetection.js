const FraudDetection = () => {
    const [expandedThreat, setExpandedThreat] = React.useState(null);

    const threatTypes = [
        {
            id: 'phishing',
            icon: '🎣',
            title: '피싱 공격 탐지',
            description: 'AI가 의심스러운 링크와 이메일을 실시간 분석하여 차단',
            detection: '99.7%',
            details: [
                { metric: '탐지 속도', value: '0.015ms', desc: 'URL 패턴 실시간 분석' },
                { metric: '정확도', value: '99.7%', desc: '500만 건 학습 데이터' },
                { metric: '오탐률', value: '0.2%', desc: '정상 거래 보호' },
                { metric: '차단 건수', value: '월 15,000건', desc: '평균 차단 실적' }
            ],
            prevention: [
                '의심스러운 URL 패턴 실시간 감지',
                '발신자 도메인 진위 여부 자동 확인',
                '첨부파일 악성코드 스캔 (0.015ms)',
                '사용자에게 즉시 경고 알림 발송'
            ]
        },
        {
            id: 'account-takeover',
            icon: '🔓',
            title: '계좌 탈취 방어',
            description: '비정상적인 로그인 시도와 패턴 변화를 AI가 실시간 감지',
            detection: '98.9%',
            details: [
                { metric: '탐지 속도', value: '실시간', desc: '로그인 시도마다 검증' },
                { metric: '정확도', value: '98.9%', desc: '행동 패턴 분석' },
                { metric: '차단 성공률', value: '100%', desc: '추가 인증 요구' },
                { metric: '오탐률', value: '0.8%', desc: '사용자 불편 최소화' }
            ],
            prevention: [
                '평소와 다른 장소에서 로그인 시 감지',
                '로그인 시간대 패턴 이상 감지',
                '여러 기기에서 동시 로그인 시도 차단',
                '생체인증 또는 OTP 추가 요구'
            ]
        },
        {
            id: 'money-laundering',
            icon: '💸',
            title: '자금 세탁 방지',
            description: '비정상적인 자금 흐름과 구조화된 거래를 AI가 패턴 분석',
            detection: '97.5%',
            details: [
                { metric: '분석 속도', value: '0.015ms', desc: '거래당 실시간 검증' },
                { metric: '정확도', value: '97.5%', desc: 'LSTM 시계열 분석' },
                { metric: '탐지 패턴', value: '1,000+', desc: '자금세탁 유형 학습' },
                { metric: '신고 건수', value: '월 850건', desc: 'FIU 자동 신고' }
            ],
            prevention: [
                '단기간 다량의 입출금 패턴 감지',
                '소액 분산 입금 구조화 거래 탐지',
                '고위험 국가 송금 자동 검증',
                '금융정보분석원(FIU) 자동 신고'
            ]
        },
        {
            id: 'card-fraud',
            icon: '💳',
            title: '카드 부정 사용 차단',
            description: '카드 거래 패턴을 AI가 학습하여 도용 즉시 감지',
            detection: '99.2%',
            details: [
                { metric: '탐지 속도', value: '0.015ms', desc: '결제 승인 전 검증' },
                { metric: '정확도', value: '99.2%', desc: 'CNN 패턴 분석' },
                { metric: '차단 성공', value: '98.5%', desc: '승인 거부 및 알림' },
                { metric: '피해 금액', value: '연 2억원', desc: '피해 예방 실적' }
            ],
            prevention: [
                '평소와 다른 지역에서 사용 시 감지',
                '단시간 다량 결제 패턴 이상 탐지',
                '고액 결제 시 추가 인증 요구',
                'SMS 즉시 알림 및 거래 차단'
            ]
        }
    ];

    return (
        <div className="space-y-8 animate-slideDown">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                    <i className="fas fa-shield-alt text-5xl"></i>
                    <div>
                        <h1 className="text-4xl font-bold mb-2">AI 사기탐지 시스템</h1>
                        <p className="text-xl text-red-100">실시간 위협 감지와 적대적 공격 95% 방어</p>
                    </div>
                </div>
            </div>

            {/* 핵심 성능 */}
            <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">사기탐지 핵심 성능</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    <StatCard icon="🛡️" title="방어 성공률" value="95%" subtitle="적대적 공격 차단" color="red" />
                    <StatCard icon="⚡" title="탐지 속도" value="0.015ms" subtitle="실시간 검증" color="orange" />
                    <StatCard icon="🎯" title="정확도" value="99.4%" subtitle="AI 앙상블" color="green" />
                    <StatCard icon="📉" title="오탐률" value="0.6%" subtitle="정상 거래 보호" color="blue" />
                </div>
            </div>

            {/* 위협 유형별 대응 */}
            <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">위협 유형별 대응 시스템</h2>
                <div className="space-y-4">
                    {threatTypes.map(threat => (
                        <div key={threat.id} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
                            <div 
                                className="p-6 cursor-pointer hover:bg-gray-50"
                                onClick={() => setExpandedThreat(expandedThreat === threat.id ? null : threat.id)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <span className="text-5xl">{threat.icon}</span>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 mb-1">{threat.title}</h3>
                                            <p className="text-sm text-gray-600 mb-2">{threat.description}</p>
                                            <div className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                탐지율 {threat.detection}
                                            </div>
                                        </div>
                                    </div>
                                    <i className={`fas fa-chevron-${expandedThreat === threat.id ? 'up' : 'down'} text-red-600 text-xl`}></i>
                                </div>
                            </div>
                            
                            <div className={`accordion-content ${expandedThreat === threat.id ? 'open' : ''}`}>
                                {expandedThreat === threat.id && (
                                    <div className="px-6 pb-6 bg-red-50 border-t border-gray-200">
                                        {/* 성능 지표 */}
                                        <div className="mt-4 mb-6">
                                            <h4 className="font-bold text-gray-800 mb-3">성능 지표</h4>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {threat.details.map((detail, idx) => (
                                                    <div key={idx} className="bg-white p-4 rounded-lg">
                                                        <div className="text-xs text-gray-500 mb-1">{detail.metric}</div>
                                                        <div className="text-xl font-bold text-red-600 mb-1">{detail.value}</div>
                                                        <div className="text-xs text-gray-600">{detail.desc}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        {/* 예방 조치 */}
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-3">예방 조치</h4>
                                            <div className="grid md:grid-cols-2 gap-3">
                                                {threat.prevention.map((item, idx) => (
                                                    <div key={idx} className="bg-white p-3 rounded-lg flex items-start gap-2">
                                                        <i className="fas fa-check-circle text-green-500 mt-1"></i>
                                                        <span className="text-sm text-gray-700">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 적대적 공격 방어 */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <i className="fas fa-virus-slash text-red-600"></i>
                    적대적 공격 방어 시스템
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-3">입력 데이터 검증</h3>
                        <p className="text-sm text-gray-600 mb-4">AI 모델에 입력되는 모든 데이터를 사전 검증하여 조작된 데이터 차단</p>
                        <div className="text-2xl font-bold text-red-600">99.1%</div>
                        <div className="text-xs text-gray-500">검증 성공률</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-3">다중 모델 검증</h3>
                        <p className="text-sm text-gray-600 mb-4">BERT, CNN, LSTM 3개 모델이 독립적으로 검증하여 공격 무력화</p>
                        <div className="text-2xl font-bold text-red-600">95%</div>
                        <div className="text-xs text-gray-500">방어 성공률</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-3">이상치 탐지</h3>
                        <p className="text-sm text-gray-600 mb-4">정상 범위를 벗어난 입력값을 Isolation Forest 알고리즘으로 탐지</p>
                        <div className="text-2xl font-bold text-red-600">98.3%</div>
                        <div className="text-xs text-gray-500">이상치 탐지율</div>
                    </div>
                </div>
            </div>

            {/* 실시간 모니터링 */}
            <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <i className="fas fa-desktop text-blue-600"></i>
                    24시간 실시간 모니터링 체계
                </h2>
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-xl text-center">
                        <div className="text-4xl mb-3">📊</div>
                        <h3 className="font-bold mb-2">거래 모니터링</h3>
                        <p className="text-sm text-gray-600">모든 거래를 0.015ms에 실시간 검증</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl text-center">
                        <div className="text-4xl mb-3">🔔</div>
                        <h3 className="font-bold mb-2">즉시 알림</h3>
                        <p className="text-sm text-gray-600">의심 거래 감지 시 SMS/앱 푸시</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl text-center">
                        <div className="text-4xl mb-3">🚨</div>
                        <h3 className="font-bold mb-2">자동 차단</h3>
                        <p className="text-sm text-gray-600">고위험 거래 즉시 중단</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl text-center">
                        <div className="text-4xl mb-3">📞</div>
                        <h3 className="font-bold mb-2">고객 확인</h3>
                        <p className="text-sm text-gray-600">본인 확인 후 거래 승인</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
