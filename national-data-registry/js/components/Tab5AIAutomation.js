function Tab5AIAutomation() {
    const aiFeatures = [
        {
            icon: 'fa-robot',
            title: '자동 통계 생산',
            desc: 'AI가 설문 설계부터 분석까지 자동화',
            metrics: [
                { label: '처리 속도', value: '542.7 TPS' },
                { label: 'AI 정확도', value: '99.2%' },
                { label: '효율 향상', value: '95%' }
            ]
        },
        {
            icon: 'fa-brain',
            title: '지능형 데이터 검증',
            desc: '이상치 탐지 및 오류 자동 수정',
            metrics: [
                { label: '오류 탐지율', value: '99.8%' },
                { label: '자동 보정', value: '98.5%' },
                { label: '검증 시간', value: '-90%' }
            ]
        },
        {
            icon: 'fa-chart-network',
            title: '예측 분석',
            desc: '미래 트렌드 및 패턴 자동 예측',
            metrics: [
                { label: '예측 정확도', value: '96.3%' },
                { label: '분석 속도', value: '실시간' },
                { label: '활용 지표', value: '200+' }
            ]
        },
        {
            icon: 'fa-shield-check',
            title: 'OpenHash 무결성',
            desc: '블록체인 없이 데이터 무결성 보장',
            metrics: [
                { label: '해시 검증', value: '100%' },
                { label: '에너지 효율', value: '+99.9%' },
                { label: '저장 용량', value: '-99.98%' }
            ]
        }
    ];

    const architecture = [
        { layer: '사용자 인터페이스', icon: 'fa-desktop', color: 'blue' },
        { layer: 'AI 에이전트 레이어', icon: 'fa-robot', color: 'purple' },
        { layer: 'OpenHash 검증', icon: 'fa-shield', color: 'green' },
        { layer: '데이터 저장소', icon: 'fa-database', color: 'gray' }
    ];

    return (
        <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <i className="fas fa-magic mr-3"></i>
                    AI 기반 차세대 통계 시스템
                </h3>
                <p className="text-lg opacity-90">
                    OpenHash 기술과 AI 에이전트를 활용하여 통계 생산·검증·분석 업무를 완전 자동화합니다.
                </p>
            </div>

            <div>
                <h3 className="subsection-title">핵심 기능</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    {aiFeatures.map((feature, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6">
                                <div className="flex items-center space-x-3">
                                    <i className={`fas ${feature.icon} text-3xl`}></i>
                                    <div>
                                        <h4 className="font-bold text-xl">{feature.title}</h4>
                                        <p className="text-sm opacity-90 mt-1">{feature.desc}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-3 gap-4">
                                    {feature.metrics.map((metric, i) => (
                                        <div key={i} className="text-center">
                                            <div className="text-2xl font-bold text-purple-600">{metric.value}</div>
                                            <div className="text-xs text-gray-600 mt-1">{metric.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="subsection-title">시스템 아키텍처</h3>
                <div className="space-y-3">
                    {architecture.map((layer, idx) => (
                        <div key={idx} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                            <div className={`bg-${layer.color}-500 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0`}>
                                <i className={`fas ${layer.icon} text-xl`}></i>
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-gov-text">{layer.layer}</div>
                            </div>
                            {idx < architecture.length - 1 && (
                                <i className="fas fa-arrow-down text-gray-400"></i>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 rounded p-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <i className="fas fa-lightbulb text-blue-600 mr-2"></i>
                        OpenHash 기술의 장점
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                            <i className="fas fa-check-circle text-blue-600 mr-2 mt-1"></i>
                            <span><strong>에너지 효율:</strong> 블록체인 대비 99.9% 에너지 절감</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check-circle text-blue-600 mr-2 mt-1"></i>
                            <span><strong>저장 효율:</strong> 원본 대신 32바이트 해시만 저장</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check-circle text-blue-600 mr-2 mt-1"></i>
                            <span><strong>완벽한 검증:</strong> SHA-256 해시로 데이터 무결성 보장</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-check-circle text-blue-600 mr-2 mt-1"></i>
                            <span><strong>중앙화 가능:</strong> 정부 시스템에 최적화된 구조</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 rounded p-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <i className="fas fa-rocket text-purple-600 mr-2"></i>
                        기대 효과
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                            <i className="fas fa-star text-purple-600 mr-2 mt-1"></i>
                            <span><strong>업무 효율:</strong> 반복 작업 자동화로 인력 95% 절감</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-star text-purple-600 mr-2 mt-1"></i>
                            <span><strong>신속성:</strong> 통계 생산 주기 80% 단축</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-star text-purple-600 mr-2 mt-1"></i>
                            <span><strong>정확성:</strong> 인적 오류 제거로 품질 99.2% 달성</span>
                        </li>
                        <li className="flex items-start">
                            <i className="fas fa-star text-purple-600 mr-2 mt-1"></i>
                            <span><strong>투명성:</strong> 모든 과정이 검증 가능한 해시로 기록</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
