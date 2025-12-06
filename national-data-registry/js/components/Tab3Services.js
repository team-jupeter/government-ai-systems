function Tab3Services() {
    const services = [
        {
            name: '국가통계포털',
            code: 'KOSIS',
            icon: 'fa-chart-pie',
            desc: '모든 국가승인통계를 한 곳에서',
            features: ['1,200여 종 통계', '시계열 데이터', '통계표 다운로드', '맞춤형 통계'],
            url: 'https://kosis.kr'
        },
        {
            name: '통계지리정보서비스',
            code: 'SGIS',
            icon: 'fa-map-marked-alt',
            desc: '지도 위의 통계',
            features: ['센서스 데이터', '행정구역 경계', '주제도 작성', '공간 분석'],
            url: 'https://sgis.kostat.go.kr'
        },
        {
            name: '마이크로데이터',
            code: 'MDIS',
            icon: 'fa-database',
            desc: '원자료 기반 심층 분석',
            features: ['통계 원자료', '연구용 데이터', '온라인 분석', '맞춤형 집계'],
            url: 'https://mdis.kostat.go.kr'
        },
        {
            name: '통계데이터센터',
            code: 'SDC',
            icon: 'fa-server',
            desc: '공공·민간 데이터 융합',
            features: ['데이터 연계', '빅데이터 분석', '안전한 환경', '분석 지원'],
            url: 'https://data.kostat.go.kr'
        }
    ];

    const features = [
        { icon: 'fa-search', title: '통합 검색', desc: '모든 통계를 한 번에 검색' },
        { icon: 'fa-download', title: '데이터 다운로드', desc: '다양한 형식으로 제공' },
        { icon: 'fa-chart-line', title: '시각화', desc: '차트와 그래프로 표현' },
        { icon: 'fa-code', title: 'Open API', desc: '프로그램 방식 접근' },
        { icon: 'fa-calendar', title: '예약 구독', desc: '정기 발표 자동 수신' },
        { icon: 'fa-mobile-alt', title: '모바일', desc: '언제 어디서나 접근' }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h3 className="subsection-title">주요 통계 서비스</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    {services.map((service, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
                            <div className="bg-gradient-to-r from-gov-blue to-gov-blue-light text-white p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center space-x-3 mb-2">
                                            <i className={`fas ${service.icon} text-2xl`}></i>
                                            <h4 className="font-bold text-xl">{service.name}</h4>
                                        </div>
                                        <div className="text-sm opacity-90">{service.code}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-700 mb-4">{service.desc}</p>
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    {service.features.map((feature, i) => (
                                        <div key={i} className="flex items-center text-sm text-gray-600">
                                            <i className="fas fa-check-circle text-gov-blue mr-2 text-xs"></i>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                                <a href={service.url} target="_blank" rel="noopener noreferrer"
                                   className="inline-flex items-center text-gov-blue hover:text-gov-blue-light font-medium text-sm">
                                    서비스 바로가기 <i className="fas fa-external-link-alt ml-2"></i>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="subsection-title">서비스 기능</h3>
                <div className="grid md:grid-cols-3 gap-4">
                    {features.map((feature, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition">
                            <div className="bg-blue-50 text-gov-blue rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                                <i className={`fas ${feature.icon} text-2xl`}></i>
                            </div>
                            <h4 className="font-semibold text-gov-text mb-2">{feature.title}</h4>
                            <p className="text-sm text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-gov-blue rounded p-6">
                <div className="flex items-start">
                    <i className="fas fa-lightbulb text-gov-blue text-2xl mr-4 mt-1"></i>
                    <div>
                        <h4 className="font-semibold text-gov-text mb-2">데이터 활용 안내</h4>
                        <p className="text-sm text-gray-700 mb-3">
                            국가통계는 정부의 정책 수립과 학술 연구, 기업의 경영 전략 등 다양한 분야에서 활용됩니다.
                            모든 통계는 무료로 제공되며, 출처를 명시하면 자유롭게 이용할 수 있습니다.
                        </p>
                        <div className="flex items-center text-sm text-gov-blue font-medium">
                            <i className="fas fa-info-circle mr-2"></i>
                            데이터 이용 문의: 국가통계콜센터 (국번없이 110)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
