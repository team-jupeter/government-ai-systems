function Overview() {
    const stats = [
        {
            icon: 'fa-users',
            title: '자동화 업무',
            value: '85',
            unit: '%',
            trend: 15,
            description: '전체 증권 업무의 85% 자동화 달성',
            color: 'sec-blue'
        },
        {
            icon: 'fa-clock',
            title: '처리 시간 단축',
            value: '78',
            unit: '%',
            trend: 23,
            description: '평균 업무 처리 시간 78% 감소',
            color: 'sec-green'
        },
        {
            icon: 'fa-coins',
            title: '운영 비용 절감',
            value: '42',
            unit: '%',
            trend: 12,
            description: '연간 운영 비용 42% 절감',
            color: 'sec-gold'
        },
        {
            icon: 'fa-chart-line',
            title: '고객 만족도',
            value: '4.8',
            unit: '/5.0',
            trend: 8,
            description: 'NPS 기반 고객 만족도',
            color: 'sec-blue'
        }
    ];

    const features = [
        {
            icon: 'fa-layer-group',
            title: '시스템 아키텍처',
            description: '마이크로서비스 기반 분산 처리 아키텍처',
            details: [
                '프론트오피스: 고객 상담, 트레이딩, 투자 분석',
                '미들오피스: 리스크 관리, 컴플라이언스, 성과 평가',
                '백오피스: 정산, 결제, 보고서 생성, 시스템 관리',
                'AI Engine: DeepSeek R1 기반 자연어 처리',
                'Data Lake: 실시간 데이터 처리 및 분석',
                'OpenHash: 거래 기록의 무결성 보장'
            ],
            benefits: [
                '99.9% 시스템 가동률',
                '50,000 TPS 처리',
                '2초 이내 응답',
                '무중단 서비스'
            ],
            technologies: ['Kubernetes', 'Kafka', 'Redis Cluster', 'PostgreSQL', 'React']
        },
        {
            icon: 'fa-microchip',
            title: 'DeepSeek R1 AI 엔진',
            description: '금융 도메인 특화 AI 모델',
            details: [
                '금융 용어 및 규제 최적화 학습',
                '50턴 대화 컨텍스트 유지',
                '감정 분석 및 적응적 응답',
                '실시간 시장 데이터 분석',
                '투자 전략 자동 생성',
                '리스크 예측 및 알림'
            ],
            benefits: [
                '92% 상담 성공률',
                '평균 2초 응답',
                '24/7 무중단',
                '다국어 지원'
            ],
            technologies: ['DeepSeek R1', 'PyTorch', 'Transformers', 'CUDA', 'TensorRT']
        },
        {
            icon: 'fa-link',
            title: 'OpenHash 분산원장',
            description: '블록체인 대안 기술로 에너지 효율 98.5% 향상',
            details: [
                '거래 기록의 변조 방지 및 투명성 보장',
                '에너지 소비: Bitcoin 대비 1/67 수준',
                '처리 속도: 초당 100,000+ 트랜잭션',
                '양자내성 암호화 적용',
                '실시간 감사 추적 가능',
                '규제 보고서 자동 생성'
            ],
            benefits: [
                '98.5% 에너지 절감',
                '100배 빠른 속도',
                '제로 다운타임',
                '완전한 투명성'
            ],
            technologies: ['OpenHash', 'ECDSA', 'SHA-3', 'Merkle Tree', 'Byzantine Fault Tolerance']
        },
        {
            icon: 'fa-shield-halved',
            title: '다층 보안 체계',
            description: '금융 1등급 보안 인증',
            details: [
                'OAuth 2.0 / OpenID Connect 인증',
                'JWT 기반 토큰 관리 및 자동 갱신',
                'RBAC 역할 기반 접근 제어',
                'MFA 다중 인증 시스템',
                'AES-256 저장 암호화',
                'TLS 1.3 전송 암호화'
            ],
            benefits: [
                '제로 보안 사고',
                '실시간 위협 탐지',
                'GDPR 완전 준수',
                '99.99% 가용성'
            ],
            technologies: ['OAuth 2.0', 'JWT', 'AES-256', 'TLS 1.3', 'HSM']
        },
        {
            icon: 'fa-database',
            title: '실시간 데이터 처리',
            description: 'Kafka 기반 스트리밍 아키텍처',
            details: [
                '초당 1TB 데이터 처리 능력',
                'Apache Kafka를 통한 이벤트 스트리밍',
                'Apache Flink 실시간 분석',
                'Redis Cluster 고속 캐싱',
                '멀티 리전 데이터 복제',
                '자동 백업 및 복구'
            ],
            benefits: [
                '1ms 이내 지연',
                '무손실 처리',
                '자동 스케일링',
                '실시간 분석'
            ],
            technologies: ['Kafka', 'Flink', 'Redis', 'Cassandra', 'HDFS']
        },
        {
            icon: 'fa-chart-pie',
            title: '통합 대시보드',
            description: '실시간 KPI 모니터링 및 알림',
            details: [
                '거래량, 수익, 비용 실시간 추적',
                '부서별 성과 지표 비교',
                'AI 자동화율 및 효율성 측정',
                '고객 만족도 및 이탈률 분석',
                '시스템 리소스 사용률 모니터링',
                '이상 징후 자동 탐지 및 알림'
            ],
            benefits: [
                '의사결정 시간 70% 단축',
                '예측 정확도 90%',
                '실시간 알림',
                '맞춤형 리포트'
            ],
            technologies: ['Grafana', 'Prometheus', 'ELK Stack', 'Tableau', 'Power BI']
        }
    ];

    const performanceData = [
        { name: '전통 방식', value: 100 },
        { name: 'AI 자동화', value: 420 }
    ];

    return (
        <div className="space-y-8">
            {/* Page Title */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    오픈해시 자율 증권 시스템 개요
                </h2>
                <p className="text-lg text-gray-600">
                    OpenHash 블록체인 대안 기술과 DeepSeek R1 AI로 구현한 완전 자동화 증권 플랫폼
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <StatCard key={idx} {...stat} />
                ))}
            </div>

            {/* Performance Comparison */}
            <ComparisonChart 
                type="bar"
                data={performanceData}
                title="처리 성능 비교"
                description="AI 자동화 시스템 vs 전통 방식 (처리량 기준)"
            />

            {/* Features Grid */}
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <i className="fas fa-cube text-sec-blue"></i>
                    핵심 구성 요소
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {features.map((feature, idx) => (
                        <FeatureCard key={idx} {...feature} />
                    ))}
                </div>
            </div>
        </div>
    );
}
