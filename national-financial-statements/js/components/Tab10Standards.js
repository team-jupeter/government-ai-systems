function Tab10Standards() {
    const standards = [
        {
            id: 1,
            org: 'W3C',
            name: 'Decentralized Identifiers (DID) v1.0',
            icon: 'fa-id-card',
            color: 'blue',
            desc: '개인 노드 ID 발급 표준',
            compliance: '완전 준수',
            benefits: ['탈중앙화 신원 관리', 'Self-Sovereign Identity', '국제 상호운용성']
        },
        {
            id: 2,
            org: 'ITU-T',
            name: 'Y.4805 AI 기반 데이터 거버넌스',
            icon: 'fa-network-wired',
            color: 'green',
            desc: 'AI 데이터 거버넌스 국제 규격',
            compliance: '완전 준수',
            benefits: ['AI 윤리 준수', '데이터 품질 관리', 'ITU 회원국 호환']
        },
        {
            id: 3,
            org: 'ISO/IEC',
            name: '22989 빅데이터 품질 관리',
            icon: 'fa-certificate',
            color: 'purple',
            desc: '빅데이터 표준 프레임워크',
            compliance: '완전 준수',
            benefits: ['데이터 정확성', '일관성 보장', '국제 인증']
        },
        {
            id: 4,
            org: 'GDPR',
            name: 'EU 2016/679 개인정보보호',
            icon: 'fa-shield-alt',
            color: 'orange',
            desc: 'EU 개인정보보호 규정',
            compliance: 'EDPB 인증',
            benefits: ['EU 시민 보호', '국제 데이터 이전', 'Privacy by Design']
        },
        {
            id: 5,
            org: 'APEC',
            name: 'CBPR 국경 간 프라이버시',
            icon: 'fa-globe-asia',
            color: 'red',
            desc: 'APEC 개인정보 국제 이전',
            compliance: '완전 준수',
            benefits: ['아시아태평양 호환', '적법한 데이터 이전', '무역 활성화']
        },
        {
            id: 6,
            org: 'UN',
            name: 'Statistical Commission 국제 표준',
            icon: 'fa-chart-bar',
            color: 'cyan',
            desc: 'UN 국가통계 국제 표준',
            compliance: '완전 준수',
            benefits: ['국가통계 신뢰성', '국제 비교 가능', 'UN 승인']
        }
    ];

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-gov-blue p-4">
                <p className="text-sm text-gov-text">
                    <span className="font-bold text-gov-blue">6개 주요 국제 표준</span>을 준수하여 
                    국가데이터처가 <span className="font-bold text-gov-blue">국제 데이터 거버넌스의 모범 사례</span>로 인정받습니다.
                </p>
            </div>

            {/* 표준 목록 */}
            <div className="space-y-3">
                {standards.map((std) => (
                    <div key={std.id} className={`bg-${std.color}-50 border-2 border-${std.color}-500 rounded-lg p-4`}>
                        <div className="flex items-start space-x-3">
                            <div className={`bg-${std.color}-100 p-3 rounded-lg`}>
                                <i className={`fas ${std.icon} text-2xl text-${std.color}-600`}></i>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="font-bold text-base">{std.org} - {std.name}</div>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                        {std.compliance}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600 mb-2">{std.desc}</div>
                                <div className="flex flex-wrap gap-2">
                                    {std.benefits.map((benefit, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-white rounded text-xs border border-gray-300">
                                            {benefit}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 국제 인증 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-4 border-gov-blue rounded-lg p-6">
                <div className="text-center">
                    <i className="fas fa-award text-6xl text-gov-blue mb-3"></i>
                    <h4 className="text-xl font-bold text-gov-blue mb-2">
                        국제 표준 완전 준수
                    </h4>
                    <p className="text-sm text-gray-700">6개 주요 국제 표준 인증 획득</p>
                </div>
            </div>

            {/* 국제 협력 */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                <h4 className="text-base font-bold text-green-700 mb-3">
                    <i className="fas fa-handshake mr-2"></i>
                    국제 협력 및 상호운용성
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>✅ <span className="font-bold">EU 데이터 이전</span>: GDPR 인증으로 EU 시민 데이터 적법 처리</li>
                    <li>✅ <span className="font-bold">APEC 협력</span>: CBPR로 아시아태평양 21개국 데이터 교환</li>
                    <li>✅ <span className="font-bold">UN 통계</span>: 국가통계 국제 비교 및 신뢰도 향상</li>
                    <li>✅ <span className="font-bold">W3C DID</span>: 탈중앙화 신원으로 글로벌 호환성</li>
                    <li>✅ <span className="font-bold">ITU 규격</span>: AI 거버넌스 국제 모범 사례</li>
                </ul>
            </div>

            {/* 국제 경쟁력 */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">6개</div>
                    <div className="text-xs text-gray-600 mt-1">국제 표준 준수</div>
                </div>
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">100%</div>
                    <div className="text-xs text-gray-600 mt-1">준수율</div>
                </div>
                <div className="bg-purple-50 border-2 border-purple-500 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-purple-600">글로벌</div>
                    <div className="text-xs text-gray-600 mt-1">모범 사례</div>
                </div>
            </div>
        </div>
    );
}
