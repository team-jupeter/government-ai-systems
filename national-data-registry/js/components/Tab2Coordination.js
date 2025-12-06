function Tab2Coordination() {
    const functions = [
        {
            title: '통계 기준 설정',
            icon: 'fa-ruler',
            items: [
                '통계 분류 기준 제정 및 관리',
                '통계 작성 기준 및 방법 표준화',
                '통계용어 및 개념 정의 통일',
                '국제 통계 기준과의 조화'
            ]
        },
        {
            title: '통계 품질 관리',
            icon: 'fa-certificate',
            items: [
                '통계 작성 기관 대상 품질 진단',
                '통계 작성 방법론 검토 및 개선',
                '통계 정합성 검증 및 조정',
                '통계 품질 평가 및 인증'
            ]
        },
        {
            title: '통계 승인·관리',
            icon: 'fa-stamp',
            items: [
                '국가승인통계 지정 및 관리',
                '통계 작성 계획 승인 및 변경',
                '통계 폐지 및 중단 관리',
                '통계 작성 실태 점검'
            ]
        },
        {
            title: '데이터 거버넌스',
            icon: 'fa-sitemap',
            items: [
                '범정부 데이터 전략 수립',
                '부처 간 데이터 연계 조정',
                '데이터 표준화 추진',
                '데이터 품질 관리 체계 구축'
            ]
        }
    ];

    const stats = [
        { label: '국가승인통계', value: '1,200여 종', icon: 'fa-check-circle' },
        { label: '통계작성기관', value: '400여 개', icon: 'fa-building' },
        { label: '연간 품질진단', value: '100여 건', icon: 'fa-clipboard-check' },
        { label: '통계분류체계', value: '20여 종', icon: 'fa-sitemap' }
    ];

    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-gov-blue to-gov-blue-light text-white rounded-lg p-6 shadow-lg">
                        <i className={`fas ${stat.icon} text-3xl mb-3 opacity-80`}></i>
                        <div className="text-2xl font-bold mb-1">{stat.value}</div>
                        <div className="text-sm opacity-90">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div>
                <h3 className="subsection-title">주요 업무</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    {functions.map((func, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                            <div className="flex items-center mb-4">
                                <div className="bg-gov-blue text-white rounded-lg p-3 mr-4">
                                    <i className={`fas ${func.icon} text-xl`}></i>
                                </div>
                                <h4 className="font-semibold text-lg text-gov-text">{func.title}</h4>
                            </div>
                            <ul className="space-y-2">
                                {func.items.map((item, i) => (
                                    <li key={i} className="text-sm text-gray-700 flex items-start">
                                        <i className="fas fa-angle-right text-gov-blue mr-2 mt-1"></i>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="subsection-title">통계 승인 절차</h3>
                <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 hidden md:block"></div>
                    <div className="grid md:grid-cols-5 gap-4 relative">
                        {['신청 접수', '검토·심사', '통계위원회', '승인 결정', '공표·관리'].map((step, idx) => (
                            <div key={idx} className="text-center">
                                <div className="bg-gov-blue text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 relative z-10 shadow-lg">
                                    <span className="font-bold text-xl">{idx + 1}</span>
                                </div>
                                <div className="font-medium text-sm text-gov-text">{step}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
