function Tab4OpenData() {
    const principles = [
        {
            icon: 'fa-unlock',
            title: '개방 원칙',
            items: ['원칙적 개방, 예외적 비공개', '기계 판독 가능 형식', '무료 제공 원칙', '상업적 이용 허용']
        },
        {
            icon: 'fa-shield-alt',
            title: '개인정보 보호',
            items: ['익명 처리 원칙', '통계적 비밀 보호', '재식별 불가 처리', '안전한 제공 환경']
        },
        {
            icon: 'fa-sync',
            title: '지속 관리',
            items: ['정기적 업데이트', '품질 관리 체계', '이용자 피드백 반영', '표준 준수']
        },
        {
            icon: 'fa-users',
            title: '민간 협력',
            items: ['활용 사례 발굴', '데이터 융합 지원', '공모전 개최', '생태계 조성']
        }
    ];

    const formats = [
        { name: 'CSV', icon: 'fa-file-csv', desc: '엑셀 호환 표 형식' },
        { name: 'JSON', icon: 'fa-file-code', desc: '웹 개발용 데이터' },
        { name: 'XML', icon: 'fa-code', desc: '구조화된 데이터' },
        { name: 'API', icon: 'fa-plug', desc: '실시간 연동' }
    ];

    const stats = [
        { value: '1,200+', label: '개방 통계', icon: 'fa-database' },
        { value: '20만+', label: '일평균 다운로드', icon: 'fa-download' },
        { value: '100+', label: 'Open API', icon: 'fa-code' },
        { value: '5억+', label: '연간 조회 수', icon: 'fa-eye' }
    ];

    return (
        <div className="space-y-8">
            <div className="bg-gradient-to-r from-gov-blue to-gov-blue-light text-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">공공데이터 개방 현황</h3>
                <div className="grid md:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                            <i className={`fas ${stat.icon} text-3xl mb-3 opacity-80`}></i>
                            <div className="text-3xl font-bold mb-1">{stat.value}</div>
                            <div className="text-sm opacity-90">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="subsection-title">개방 원칙</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {principles.map((principle, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow p-6">
                            <div className="bg-gov-blue text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                <i className={`fas ${principle.icon} text-xl`}></i>
                            </div>
                            <h4 className="font-semibold text-gov-text mb-3">{principle.title}</h4>
                            <ul className="space-y-2">
                                {principle.items.map((item, i) => (
                                    <li key={i} className="text-xs text-gray-600 flex items-start">
                                        <i className="fas fa-check text-gov-blue mr-2 text-xs mt-0.5"></i>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="subsection-title">제공 형식</h3>
                <div className="grid md:grid-cols-4 gap-4">
                    {formats.map((format, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition">
                            <i className={`fas ${format.icon} text-4xl text-gov-blue mb-3`}></i>
                            <h4 className="font-bold text-lg text-gov-text mb-2">{format.name}</h4>
                            <p className="text-sm text-gray-600">{format.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="subsection-title">활용 절차</h3>
                <div className="space-y-4">
                    {[
                        { step: '1', title: '데이터 검색', desc: '국가통계포털 또는 공공데이터포털에서 필요한 데이터 검색', icon: 'fa-search' },
                        { step: '2', title: '형식 선택', desc: 'CSV, JSON, XML, API 중 원하는 형식 선택', icon: 'fa-list' },
                        { step: '3', title: '다운로드/연동', desc: '파일 다운로드 또는 API 키 발급 후 연동', icon: 'fa-download' },
                        { step: '4', title: '활용·분석', desc: '데이터 분석, 시각화, 서비스 개발 등 자유롭게 활용', icon: 'fa-chart-line' }
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                            <div className="bg-gov-blue text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                                <span className="font-bold">{item.step}</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center mb-1">
                                    <i className={`fas ${item.icon} text-gov-blue mr-2`}></i>
                                    <h4 className="font-semibold text-gov-text">{item.title}</h4>
                                </div>
                                <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 rounded p-6">
                <div className="flex items-start">
                    <i className="fas fa-award text-green-600 text-2xl mr-4 mt-1"></i>
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-2">공공데이터 활용 지원</h4>
                        <p className="text-sm text-gray-700 mb-3">
                            국가데이터처는 공공데이터 활용 촉진을 위해 다양한 지원 프로그램을 운영합니다.
                        </p>
                        <ul className="space-y-1 text-sm text-gray-700">
                            <li>• 공공데이터 활용 공모전 (연 2회)</li>
                            <li>• 데이터 분석 교육 프로그램</li>
                            <li>• 우수 활용 사례 선정 및 시상</li>
                            <li>• 기술 지원 및 컨설팅</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
