const AssetManagement = () => {
    const [expandedService, setExpandedService] = React.useState(null);

    const assetServices = [
        {
            id: 'portfolio',
            icon: '📊',
            title: 'AI 포트폴리오 최적화',
            description: '개인별 위험 선호도와 투자 목표를 분석하여 최적 자산 배분',
            features: ['실시간 리밸런싱', '위험도 맞춤', 'ESG 투자'],
            benefits: [
                { title: '개인 맞춤형 배분', description: '나이, 소득, 목표 수익률을 고려한 AI 최적 배분 (주식 30~70%, 채권 20~50%, 대체투자 5~20%)' },
                { title: '자동 리밸런싱', description: '시장 변동 시 AI가 목표 비율 유지를 위해 자동 매매' },
                { title: '세금 최적화', description: '매매 시기와 금액을 조절하여 양도소득세 최소화' },
                { title: 'ESG 스크리닝', description: '환경·사회·지배구조 우수 기업만 선별 투자' }
            ]
        },
        {
            id: 'retirement',
            icon: '🏖️',
            title: '은퇴 설계',
            description: '은퇴 시점과 필요 자금을 계산하여 장기 투자 전략 수립',
            features: ['생애 주기 분석', '연금 최적화', '인플레이션 대응'],
            benefits: [
                { title: '은퇴 자금 계산', description: 'AI가 현재 자산, 예상 수명, 생활 수준을 고려하여 필요 금액 산정' },
                { title: '단계별 투자 전략', description: '30대 공격적 → 50대 중립 → 60대 보수적으로 자동 전환' },
                { title: '연금 최적화', description: '국민연금, 퇴직연금, 개인연금을 통합 분석하여 수령 시기 최적화' },
                { title: '장수 리스크 대비', description: '예상보다 오래 살 경우를 대비한 안전 자산 추가 배분' }
            ]
        },
        {
            id: 'wealth',
            icon: '💎',
            title: '고액 자산가 전용',
            description: '10억원 이상 자산가를 위한 프리미엄 자산관리 서비스',
            features: ['전담 AI 어드바이저', '대체투자', '세무 최적화'],
            benefits: [
                { title: '전담 AI 시스템', description: '개인별 AI 어드바이저가 24시간 시장 모니터링 및 투자 제안' },
                { title: '대체투자 접근', description: '헤지펀드, 프라이빗 에쿼티, 부동산 펀드 등 고수익 상품 소개' },
                { title: '상속·증여 설계', description: 'AI가 상속세 최소화 방안을 시뮬레이션하여 최적 증여 계획 수립' },
                { title: 'VIP 금융상품', description: '일반에 공개되지 않은 초우량 상품 우선 투자 기회' }
            ]
        },
        {
            id: 'education',
            icon: '🎓',
            title: '자녀 교육비 적립',
            description: '대학 등록금, 유학 비용을 목표로 한 장기 적립 프로그램',
            features: ['목표 기반 적립', '교육비 인플레이션 반영', '장학금 연계'],
            benefits: [
                { title: '대학 등록금 계산', description: 'AI가 자녀 나이와 목표 대학을 고려하여 필요 금액 자동 산출' },
                { title: '교육비 상승률 반영', description: '연평균 5% 상승률을 고려한 적립액 자동 조정' },
                { title: '장학금 정보 제공', description: 'AI가 자녀 성적과 특기를 분석하여 적합한 장학 프로그램 추천' },
                { title: '유학 자금 지원', description: '환율 변동을 고려한 외화 예금 자동 전환' }
            ]
        }
    ];

    return (
        <div className="space-y-8 animate-slideDown">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                    <i className="fas fa-wallet text-5xl"></i>
                    <div>
                        <h1 className="text-4xl font-bold mb-2">AI 자산관리 서비스</h1>
                        <p className="text-xl text-indigo-100">개인 맞춤형 포트폴리오 최적화와 장기 재무 설계</p>
                    </div>
                </div>
            </div>

            {/* 핵심 특징 */}
            <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">자산관리 핵심 특징</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    <StatCard icon="🤖" title="AI 분석" value="실시간" subtitle="시장 모니터링" color="indigo" />
                    <StatCard icon="📈" title="평균 수익률" value="연 8.2%" subtitle="최근 3년 기준" color="green" />
                    <StatCard icon="⚖️" title="리밸런싱" value="자동" subtitle="목표 비율 유지" color="blue" />
                    <StatCard icon="💰" title="최소 투자액" value="100만원" subtitle="누구나 이용 가능" color="purple" />
                </div>
            </div>

            {/* 자산관리 서비스 */}
            <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">자산관리 서비스</h2>
                <div className="space-y-4">
                    {assetServices.map(service => (
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

            {/* AI 투자 전략 */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">AI 투자 전략 수립 프로세스</h2>
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-xl text-center">
                        <div className="text-4xl mb-3">1️⃣</div>
                        <h3 className="font-bold mb-2">프로필 분석</h3>
                        <p className="text-sm text-gray-600">나이, 소득, 위험 선호도 분석</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl text-center">
                        <div className="text-4xl mb-3">2️⃣</div>
                        <h3 className="font-bold mb-2">목표 설정</h3>
                        <p className="text-sm text-gray-600">은퇴, 주택, 교육 등 목표 명확화</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl text-center">
                        <div className="text-4xl mb-3">3️⃣</div>
                        <h3 className="font-bold mb-2">자산 배분</h3>
                        <p className="text-sm text-gray-600">최적 포트폴리오 구성</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl text-center">
                        <div className="text-4xl mb-3">4️⃣</div>
                        <h3 className="font-bold mb-2">지속 관리</h3>
                        <p className="text-sm text-gray-600">실시간 모니터링 및 리밸런싱</p>
                    </div>
                </div>
            </div>

            {/* 위험 관리 */}
            <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <i className="fas fa-shield-alt text-red-600"></i>
                    AI 위험 관리 시스템
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-3">실시간 리스크 측정</h3>
                        <p className="text-sm text-gray-600 mb-4">VaR, CVaR 등 위험 지표를 실시간 계산하여 손실 가능성 모니터링</p>
                        <div className="text-xs text-gray-500">업데이트: 매 거래 시</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-3">자동 손절매</h3>
                        <p className="text-sm text-gray-600 mb-4">특정 자산이 설정한 손실 한도를 초과하면 AI가 자동 매도</p>
                        <div className="text-xs text-gray-500">기본 설정: -10%</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-3">분산 투자 강제</h3>
                        <p className="text-sm text-gray-600 mb-4">단일 자산에 과도한 집중 방지, 최대 30% 제한</p>
                        <div className="text-xs text-gray-500">리밸런싱: 주 1회</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
