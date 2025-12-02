const PaymentTransfer = () => {
    const [expandedSection, setExpandedSection] = React.useState(null);

    const paymentServices = [
        {
            id: 'domestic',
            icon: '🇰🇷',
            title: '국내 송금',
            description: 'FPGA 가속으로 0.015ms 초고속 처리, 수수료 무료',
            features: ['실시간 송금', '수수료 무료', '365일 24시간'],
            benefits: [
                { title: '초고속 처리', description: 'FPGA 하드웨어 가속으로 0.015ms 만에 송금 완료' },
                { title: '수수료 완전 무료', description: 'AI 자동화로 운영비 절감, 모든 송금 수수료 무료' },
                { title: '한도 제한 없음', description: '금액 제한 없이 필요한 만큼 송금 가능' },
                { title: '365일 가능', description: '주말, 공휴일 구분 없이 언제든 실시간 송금' }
            ]
        },
        {
            id: 'international',
            icon: '🌏',
            title: '해외 송금',
            description: '크로스보더 실시간 송금, 환율 우대 및 수수료 최소화',
            features: ['실시간 환전', '저렴한 수수료', '60초 도착'],
            benefits: [
                { title: '실시간 환율 적용', description: 'AI가 최적 환전 시점을 판단하여 유리한 환율 자동 적용' },
                { title: '크로스보더 네트워크', description: 'Lock-and-Mint 방식으로 60초 이내 해외 계좌 입금' },
                { title: '저렴한 수수료', description: '기존 은행 대비 80% 절감된 수수료 (0.2%)' },
                { title: '200개국 지원', description: '전 세계 주요 국가 모두 지원, 현지 통화 직접 입금' }
            ]
        },
        {
            id: 'autopay',
            icon: '🔄',
            title: '자동 이체',
            description: 'AI가 고객 패턴을 학습하여 최적 납부일과 금액을 자동 설정',
            features: ['AI 최적화', '잔액 부족 알림', '영수증 자동 저장'],
            benefits: [
                { title: 'AI 패턴 학습', description: '매월 지출 패턴을 분석하여 잔액이 부족하지 않은 날짜를 자동 선택' },
                { title: '우선순위 설정', description: '공과금, 대출, 보험 등 중요도에 따라 자동 이체 순서 조정' },
                { title: '잔액 부족 예측', description: '7일 전 잔액 부족 예상 시 AI가 사전 알림' },
                { title: '영수증 자동 관리', description: '모든 납부 내역을 카테고리별로 자동 분류 및 저장' }
            ]
        },
        {
            id: 'qrpay',
            icon: '📱',
            title: 'QR 간편결제',
            description: 'QR 코드 스캔만으로 즉시 결제, 포인트 자동 적립',
            features: ['즉시 결제', '포인트 적립', '할인 자동 적용'],
            benefits: [
                { title: '0.015ms 결제', description: 'QR 스캔 후 0.015ms 만에 결제 완료' },
                { title: '자동 포인트 적립', description: 'AI가 최대 혜택 카드를 자동 선택하여 포인트 최대화' },
                { title: '할인 쿠폰 자동 적용', description: '보유한 할인 쿠폰을 AI가 자동으로 찾아서 적용' },
                { title: '영수증 디지털화', description: '종이 영수증 없이 앱에서 자동 저장 및 관리' }
            ]
        }
    ];

    return (
        <div className="space-y-8 animate-slideDown">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                    <i className="fas fa-exchange-alt text-5xl"></i>
                    <div>
                        <h1 className="text-4xl font-bold mb-2">FPGA 결제·송금 시스템</h1>
                        <p className="text-xl text-blue-100">0.015ms 초고속 처리와 수수료 최소화</p>
                    </div>
                </div>
            </div>

            {/* 핵심 성능 */}
            <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">결제·송금 성능</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    <StatCard icon="⚡" title="처리 속도" value="0.015ms" subtitle="FPGA 가속" color="blue" />
                    <StatCard icon="🌍" title="해외 송금" value="60초" subtitle="크로스보더" color="green" />
                    <StatCard icon="💰" title="수수료" value="0~0.2%" subtitle="기존 은행 대비 80% 절감" color="purple" />
                    <StatCard icon="🔒" title="보안 성공률" value="99.9%" subtitle="사기 거래 차단" color="orange" />
                </div>
            </div>

            {/* 결제·송금 서비스 */}
            <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">결제·송금 서비스</h2>
                <div className="space-y-4">
                    {paymentServices.map(service => (
                        <ServiceCard
                            key={service.id}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                            features={service.features}
                            benefits={service.benefits}
                            onClick={() => setExpandedSection(expandedSection === service.id ? null : service.id)}
                            isExpanded={expandedSection === service.id}
                        />
                    ))}
                </div>
            </div>

            {/* FPGA 기술 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">FPGA 하드웨어 가속 기술</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                            <i className="fas fa-microchip text-bank-blue"></i>
                            병렬 처리
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• BN254 타원곡선 연산 병렬화</li>
                            <li>• 400MHz 이상 동작 주파수</li>
                            <li>• 1,757개 DSP 슬라이스 활용</li>
                            <li>• 1,685개 BRAM 블록 최적화</li>
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                            <i className="fas fa-bolt text-bank-blue"></i>
                            초고속 검증
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• 영지식 증명 0.015ms 생성</li>
                            <li>• 거래 서명 즉시 검증</li>
                            <li>• 이중 지불 실시간 차단</li>
                            <li>• 100,000 TPS 처리 능력</li>
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                            <i className="fas fa-leaf text-bank-blue"></i>
                            저전력 설계
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• GPU 대비 88.6% 전력 절감</li>
                            <li>• 친환경 금융 인프라</li>
                            <li>• 발열 최소화 설계</li>
                            <li>• 연간 전력비 95% 감소</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 크로스보더 네트워크 */}
            <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <i className="fas fa-globe text-green-600"></i>
                    글로벌 크로스보더 네트워크
                </h2>
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-xl text-center">
                        <div className="text-3xl mb-3">🔒</div>
                        <h3 className="font-bold mb-2">Lock</h3>
                        <p className="text-sm text-gray-600">출발지 체인에서 자산 잠금</p>
                        <div className="text-xs text-blue-600 mt-2">0.015ms</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl text-center">
                        <div className="text-3xl mb-3">✅</div>
                        <h3 className="font-bold mb-2">Verify</h3>
                        <p className="text-sm text-gray-600">영지식 증명으로 검증</p>
                        <div className="text-xs text-blue-600 mt-2">30초</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl text-center">
                        <div className="text-3xl mb-3">🪙</div>
                        <h3 className="font-bold mb-2">Mint</h3>
                        <p className="text-sm text-gray-600">도착지 체인에서 발행</p>
                        <div className="text-xs text-blue-600 mt-2">0.015ms</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl text-center">
                        <div className="text-3xl mb-3">💸</div>
                        <h3 className="font-bold mb-2">Transfer</h3>
                        <p className="text-sm text-gray-600">수취인 계좌 입금</p>
                        <div className="text-xs text-blue-600 mt-2">즉시</div>
                    </div>
                </div>
                <div className="mt-6 bg-white p-4 rounded-xl text-center">
                    <div className="text-sm text-gray-600">총 소요 시간</div>
                    <div className="text-3xl font-bold text-green-600 mt-1">60초 이내</div>
                    <div className="text-xs text-gray-500 mt-1">기존 은행 해외 송금: 1~3일</div>
                </div>
            </div>

            {/* 보안 시스템 */}
            <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <i className="fas fa-shield-alt text-red-600"></i>
                    실시간 보안 모니터링
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-3">이상 거래 탐지</h3>
                        <p className="text-sm text-gray-600 mb-4">AI가 실시간으로 거래 패턴을 분석하여 사기 의심 거래를 0.015ms에 차단</p>
                        <div className="text-2xl font-bold text-red-600">99.9%</div>
                        <div className="text-xs text-gray-500">탐지 성공률</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-3">다단계 인증</h3>
                        <p className="text-sm text-gray-600 mb-4">고액 거래 시 생체인증, OTP, 추가 비밀번호 등 다단계 인증 자동 적용</p>
                        <div className="text-2xl font-bold text-red-600">100%</div>
                        <div className="text-xs text-gray-500">계좌 도용 방지</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-3">거래 한도 관리</h3>
                        <p className="text-sm text-gray-600 mb-4">AI가 평소 거래 패턴을 학습하여 비정상적 금액 거래 시 자동 차단</p>
                        <div className="text-2xl font-bold text-red-600">95.4%</div>
                        <div className="text-xs text-gray-500">사기 피해 예방</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
