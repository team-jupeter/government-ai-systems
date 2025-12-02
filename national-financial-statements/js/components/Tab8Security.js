function Tab8Security() {
    const securityLayers = [
        {
            id: 1,
            name: 'Shamir\'s Secret Sharing',
            desc: '7-of-10 threshold 개인 키 분할',
            icon: 'fa-key',
            color: 'blue',
            details: [
                '국가데이터처 개인 키를 10개로 분할',
                '7개 이상 결합해야만 서명 생성 가능',
                '단일 노드 탈취로는 서명 불가능',
                '고가용성과 보안성 동시 확보'
            ]
        },
        {
            id: 2,
            name: 'CRYSTALS-Dilithium',
            desc: 'NIST Level 3 양자 내성 암호',
            icon: 'fa-shield-virus',
            color: 'purple',
            details: [
                'NIST Post-Quantum Cryptography 표준',
                'AES-192 상당 보안 강도',
                '양자컴퓨터 "Harvest now, decrypt later" 공격 방어',
                '국가통계 및 행정데이터 50년 보호'
            ]
        },
        {
            id: 3,
            name: 'BLS 다중 서명',
            desc: '계층 간 중간자 공격 방지',
            icon: 'fa-signature',
            color: 'green',
            details: [
                'BLS12-381 곡선 기반',
                '다중 서명을 하나로 집약 가능',
                'Layer 3에서 7/10 서명 검증',
                'MITM 공격 완벽 차단'
            ]
        },
        {
            id: 4,
            name: 'Hardware Security Module',
            desc: 'iOS Secure Enclave / Android Keystore',
            icon: 'fa-mobile-alt',
            color: 'orange',
            details: [
                '개인 단말기 하드웨어 보안',
                '키 추출 불가능 (Tamper-proof)',
                'ECDSA P-256 / BLS12-381',
                '생체인증과 통합'
            ]
        },
        {
            id: 5,
            name: 'Isolation Forest',
            desc: '실시간 이상 탐지',
            icon: 'fa-search',
            color: 'red',
            details: [
                'ML 기반 이상행위 탐지',
                '비정상 트래픽 패턴 식별',
                '즉시 차단 및 Layer 0 보고',
                '평균 탐지 시간: 0.3초'
            ]
        }
    ];

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-gov-blue p-4">
                <p className="text-sm text-gov-text">
                    <span className="font-bold text-gov-blue">다층 보안 메커니즘</span>으로 
                    국가 데이터 주권 및 개인정보를 <span className="font-bold text-gov-blue">50년 이상 안전하게 보호</span>합니다.
                </p>
            </div>

            {/* 보안 계층 */}
            <div className="space-y-3">
                {securityLayers.map((layer) => (
                    <div key={layer.id} className={`bg-${layer.color}-50 border-2 border-${layer.color}-500 rounded-lg p-4`}>
                        <div className="flex items-start space-x-3">
                            <div className={`bg-${layer.color}-100 p-3 rounded-lg`}>
                                <i className={`fas ${layer.icon} text-2xl text-${layer.color}-600`}></i>
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-base mb-1">{layer.name}</div>
                                <div className="text-sm text-gray-600 mb-3">{layer.desc}</div>
                                <ul className="space-y-1">
                                    {layer.details.map((detail, idx) => (
                                        <li key={idx} className="text-xs text-gray-700">• {detail}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 보안 강도 */}
            <div className="bg-purple-50 border-2 border-purple-500 rounded-lg p-4">
                <h4 className="text-base font-bold text-purple-700 mb-3">
                    <i className="fas fa-lock mr-2"></i>
                    양자컴퓨터 내구성
                </h4>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded text-center">
                        <div className="text-2xl font-bold text-purple-600">50년+</div>
                        <div className="text-xs text-gray-600">보안 내구성</div>
                    </div>
                    <div className="bg-white p-3 rounded text-center">
                        <div className="text-2xl font-bold text-purple-600">AES-192</div>
                        <div className="text-xs text-gray-600">상당 보안 강도</div>
                    </div>
                    <div className="bg-white p-3 rounded text-center">
                        <div className="text-2xl font-bold text-purple-600">0.3초</div>
                        <div className="text-xs text-gray-600">이상 탐지 시간</div>
                    </div>
                </div>
            </div>

            {/* 공격 방어 */}
            <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4">
                <h4 className="text-base font-bold text-red-700 mb-3">
                    <i className="fas fa-shield-alt mr-2"></i>
                    방어 가능한 공격 유형
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-white p-2 rounded flex items-center">
                        <i className="fas fa-check-circle text-green-600 mr-2"></i>
                        <span>양자컴퓨터 공격</span>
                    </div>
                    <div className="bg-white p-2 rounded flex items-center">
                        <i className="fas fa-check-circle text-green-600 mr-2"></i>
                        <span>중간자 공격 (MITM)</span>
                    </div>
                    <div className="bg-white p-2 rounded flex items-center">
                        <i className="fas fa-check-circle text-green-600 mr-2"></i>
                        <span>51% 공격</span>
                    </div>
                    <div className="bg-white p-2 rounded flex items-center">
                        <i className="fas fa-check-circle text-green-600 mr-2"></i>
                        <span>DDoS 공격</span>
                    </div>
                    <div className="bg-white p-2 rounded flex items-center">
                        <i className="fas fa-check-circle text-green-600 mr-2"></i>
                        <span>내부자 공격</span>
                    </div>
                    <div className="bg-white p-2 rounded flex items-center">
                        <i className="fas fa-check-circle text-green-600 mr-2"></i>
                        <span>사이드 채널 공격</span>
                    </div>
                </div>
            </div>

            {/* 보안 감사 */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                <h4 className="text-base font-bold text-green-700 mb-3">
                    <i className="fas fa-clipboard-check mr-2"></i>
                    정기 보안 감사
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>✅ <span className="font-bold">Layer 0 주기 감사</span>: 월 1회 전체 네트워크 보안 점검</li>
                    <li>✅ <span className="font-bold">침투 테스트</span>: 분기별 외부 화이트해커 침투 시도</li>
                    <li>✅ <span className="font-bold">키 로테이션</span>: 연 1회 암호화 키 갱신</li>
                    <li>✅ <span className="font-bold">취약점 스캔</span>: 주 1회 자동 취약점 검사</li>
                    <li>✅ <span className="font-bold">인증서 관리</span>: TLS 인증서 자동 갱신</li>
                </ul>
            </div>
        </div>
    );
}
