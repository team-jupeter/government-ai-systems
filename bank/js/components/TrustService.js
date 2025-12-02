const TrustService = () => {
    const [expandedService, setExpandedService] = React.useState(null);

    const trustServices = [
        {
            id: 'inheritance',
            icon: '👨‍👩‍👧‍👦',
            title: '상속 신탁',
            description: 'AI가 상속세를 최소화하고 유언 내용을 자동 집행',
            features: ['자동 집행', '세금 최적화', '분쟁 방지'],
            benefits: [
                { title: '유언 자동 집행', description: '사망 확인 즉시 AI가 유언장에 따라 재산 분배 자동 처리' },
                { title: '상속세 최적화', description: 'AI가 증여와 상속을 조합하여 최소 세금 납부 방안 계산' },
                { title: '분쟁 사전 방지', description: '명확한 분배 기준과 근거를 자동 문서화하여 법적 분쟁 최소화' },
                { title: '부동산 자동 처리', description: '등기 이전, 매각 등 복잡한 절차를 AI가 자동 진행' }
            ]
        },
        {
            id: 'charity',
            icon: '❤️',
            title: '공익 신탁',
            description: '장학금, 재난 구호 등 공익 목적 자금을 투명하게 관리',
            features: ['투명한 집행', '자동 선정', '실시간 보고'],
            benefits: [
                { title: '투명한 자금 관리', description: '모든 입출금 내역을 블록체인에 기록하여 조작 불가능' },
                { title: 'AI 수혜자 선정', description: '객관적 기준에 따라 AI가 공정하게 장학생, 지원 대상 선정' },
                { title: '실시간 집행 보고', description: '기부자에게 자금 사용 내역을 실시간으로 투명하게 공개' },
                { title: '정기 감사 자동화', description: 'AI가 정기적으로 자금 집행의 적정성을 자동 감사' }
            ]
        },
        {
            id: 'retirement',
            icon: '🏖️',
            title: '연금 신탁',
            description: '은퇴 후 안정적인 생활을 위한 연금 자동 지급',
            features: ['생활비 자동 지급', '인플레이션 대응', '건강 연계'],
            benefits: [
                { title: '생활비 자동 지급', description: 'AI가 생활 패턴을 분석하여 매월 적정 금액을 자동 이체' },
                { title: '인플레이션 대응', description: '물가 상승률을 반영하여 지급액을 AI가 자동 조정' },
                { title: '건강 상태 연계', description: '의료비 증가 시 AI가 자동으로 추가 지급액 산정' },
                { title: '잔여 재산 상속', description: '사망 후 남은 재산을 미리 지정한 상속인에게 자동 이전' }
            ]
        },
        {
            id: 'special-needs',
            icon: '🤝',
            title: '특별 수요 신탁',
            description: '장애인, 미성년자 등 특별한 보호가 필요한 수익자를 위한 맞춤형 신탁',
            features: ['생활비 자동 관리', '의료비 우선 지급', '보호자 지정'],
            benefits: [
                { title: '생활비 자동 관리', description: 'AI가 수익자의 월별 필요 경비를 계산하여 적정 금액 지급' },
                { title: '의료비 우선 지급', description: '긴급 의료비 발생 시 한도 내에서 AI가 자동 승인 및 지급' },
                { title: '보호자 감독 기능', description: '지정된 보호자가 신탁 집행 내역을 실시간 모니터링' },
                { title: '부정 사용 차단', description: 'AI가 비정상적인 지출 패턴을 감지하여 자동 차단' }
            ]
        }
    ];

    return (
        <div className="space-y-8 animate-slideDown">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-teal-600 to-green-500 text-white rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                    <i className="fas fa-handshake text-5xl"></i>
                    <div>
                        <h1 className="text-4xl font-bold mb-2">AI 신탁 서비스</h1>
                        <p className="text-xl text-teal-100">재무제표 연동 자동화로 투명하고 효율적인 재산 관리</p>
                    </div>
                </div>
            </div>

            {/* 핵심 특징 */}
            <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">신탁 서비스 핵심 특징</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    <StatCard icon="🤖" title="자동 집행" value="100%" subtitle="AI 자동화" color="green" />
                    <StatCard icon="📊" title="투명성" value="완벽" subtitle="블록체인 기록" color="blue" />
                    <StatCard icon="⚖️" title="공정성" value="편향 제거" subtitle="객관적 기준" color="purple" />
                    <StatCard icon="💰" title="수수료" value="50% 절감" subtitle="기존 신탁 대비" color="orange" />
                </div>
            </div>

            {/* 신탁 상품 */}
            <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">신탁 상품</h2>
                <div className="space-y-4">
                    {trustServices.map(service => (
                        <ServiceCard
                            key={service.id}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                            features={service.features}
                            benefits={service.benefits}
                            onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                            isExpanded={expandedService === service.id}
                        />
                    ))}
                </div>
            </div>

            {/* 신탁 자동 집행 프로세스 */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border-2 border-green-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">신탁 자동 집행 프로세스</h2>
                <div className="grid md:grid-cols-5 gap-4">
                    <div className="bg-white p-6 rounded-xl text-center">
                        <div className="text-4xl mb-3">1️⃣</div>
                        <h3 className="font-bold mb-2">조건 감지</h3>
                        <p className="text-sm text-gray-600">AI가 신탁 집행 조건 충족 여부 실시간 모니터링</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl text-center">
                        <div className="text-4xl mb-3">2️⃣</div>
                        <h3 className="font-bold mb-2">금액 계산</h3>
                        <p className="text-sm text-gray-600">지급 대상과 금액을 AI가 자동 계산</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl text-center">
                        <div className="text-4xl mb-3">3️⃣</div>
                        <h3 className="font-bold mb-2">승인 처리</h3>
                        <p className="text-sm text-gray-600">다단계 검증 후 자동 승인</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl text-center">
                        <div className="text-4xl mb-3">4️⃣</div>
                        <h3 className="font-bold mb-2">자금 이체</h3>
                        <p className="text-sm text-gray-600">0.015ms 만에 수익자 계좌 입금</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl text-center">
                        <div className="text-4xl mb-3">5️⃣</div>
                        <h3 className="font-bold mb-2">기록 저장</h3>
                        <p className="text-sm text-gray-600">블록체인에 불변 기록</p>
                    </div>
                </div>
            </div>

            {/* 재무제표 연동 */}
            <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <i className="fas fa-file-invoice-dollar text-blue-600"></i>
                    재무제표 자동 연동
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-3">실시간 자산 현황</h3>
                        <p className="text-sm text-gray-600 mb-4">신탁 재산의 입출금이 발생할 때마다 재무제표가 자동 업데이트</p>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• 총자산 실시간 집계</li>
                            <li>• 부채 자동 반영</li>
                            <li>• 순자산 자동 계산</li>
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-3">투명한 집행 내역</h3>
                        <p className="text-sm text-gray-600 mb-4">모든 지급 내역이 재무제표에 자동 기록되어 조작 불가능</p>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• 지급 날짜/금액 기록</li>
                            <li>• 수익자별 집계</li>
                            <li>• 목적별 분류</li>
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-3">세무 자동 처리</h3>
                        <p className="text-sm text-gray-600 mb-4">상속세, 증여세 등 관련 세금을 AI가 자동 계산 및 신고</p>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• 상속세 자동 계산</li>
                            <li>• 증여세 자동 신고</li>
                            <li>• 소득세 원천징수</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 신탁 장점 */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">AI 신탁의 장점</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                            <i className="fas fa-piggy-bank text-bank-blue"></i>
                            비용 절감
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">AI 자동화로 인건비를 50% 절감하여 저렴한 수수료 제공</p>
                        <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center">
                            <div className="text-2xl font-bold">연 0.3%</div>
                            <div className="text-xs">기존 신탁: 연 0.6~1.0%</div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                            <i className="fas fa-clock text-bank-blue"></i>
                            신속한 처리
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">조건 충족 시 0.015ms 만에 자동 집행, 대기 시간 제로</p>
                        <div className="bg-blue-100 text-blue-700 p-3 rounded-lg text-center">
                            <div className="text-2xl font-bold">즉시</div>
                            <div className="text-xs">기존 신탁: 수일~수주 소요</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
