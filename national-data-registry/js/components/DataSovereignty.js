const DataSovereignty = () => {
    const principles = [
        { 
            icon: '🔐', 
            title: '개인정보 자기결정권', 
            desc: '본인 데이터 접근·수정·삭제 권한',
            items: ['언제든 열람', '동의 철회', '이동 요청']
        },
        { 
            icon: '🛡️', 
            title: '데이터 주권 보장', 
            desc: '국가 데이터 보안 및 통제',
            items: ['국내 저장', '암호화 필수', '감사 추적']
        },
        { 
            icon: '⚖️', 
            title: '공정한 활용', 
            desc: '데이터 수익 공정 배분',
            items: ['가치 보상', '투명한 정산', '차별 금지']
        }
    ];

    return (
        <div className="section-gray py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-balance-scale text-blue-600 mr-3"></i>
                        데이터 주권과 윤리
                    </h2>
                    <p className="text-lg text-gray-600">개인의 권리와 공공의 이익이 조화된 데이터 생태계</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {principles.map((p, i) => (
                        <div key={i} className="bg-white rounded-xl p-6 card-hover shadow-md border border-gray-200">
                            <div className="text-5xl mb-4 text-center">{p.icon}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{p.title}</h3>
                            <p className="text-gray-600 mb-4 text-center">{p.desc}</p>
                            <ul className="space-y-2">
                                {p.items.map((item, j) => (
                                    <li key={j} className="text-sm text-gray-700 bg-gray-50 rounded-lg p-2">
                                        ✓ {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        <i className="fas fa-users text-blue-600 mr-2"></i>
                        다중 이해관계자 거버넌스
                    </h3>
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-3xl mb-2">👥</div>
                            <div className="font-semibold text-gray-900">시민대표</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-3xl mb-2">🏛️</div>
                            <div className="font-semibold text-gray-900">정부기관</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-3xl mb-2">🏢</div>
                            <div className="font-semibold text-gray-900">민간기업</div>
                        </div>
                        <div className="text-center p-4 bg-amber-50 rounded-lg">
                            <div className="text-3xl mb-2">🎓</div>
                            <div className="font-semibold text-gray-900">전문가</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
