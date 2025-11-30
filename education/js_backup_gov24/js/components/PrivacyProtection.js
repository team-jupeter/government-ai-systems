const PrivacyProtection = () => {
    const protections = [
        {
            icon: '🔐',
            title: 'OpenHash 암호화',
            desc: '학습 데이터 분산 저장',
            tech: '양자내성 암호'
        },
        {
            icon: '👤',
            title: '익명화 처리',
            desc: '개인정보 제거 후 분석',
            tech: 'AI 학습용 가명 처리'
        },
        {
            icon: '✋',
            title: '자기결정권',
            desc: '데이터 공유 범위 직접 설정',
            tech: '세밀한 권한 관리'
        },
        {
            icon: '🗑️',
            title: '삭제 요구권',
            desc: '언제든 데이터 삭제 가능',
            tech: '즉시 완전 삭제'
        }
    ];

    const dataLayers = [
        { layer: '개인 학습 데이터', access: '본인만', storage: '개인 계층', encryption: '최고등급' },
        { layer: '익명 통계 데이터', access: '교육기관', storage: '공공 계층', encryption: '고등급' },
        { layer: 'AI 학습 데이터', access: 'AI 모델', storage: '연계 계층', encryption: '가명 처리' }
    ];

    return (
        <div className="section-gray py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-shield-alt text-blue-600 mr-3"></i>
                        개인정보 보호 시스템
                    </h2>
                    <p className="text-lg text-gray-600">OpenHash 기반 최고 수준의 프라이버시 보장</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {protections.map((p, i) => (
                        <div key={i} className="bg-white rounded-xl p-6 card-hover shadow-md border border-gray-200 text-center">
                            <div className="text-5xl mb-4">{p.icon}</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
                            <p className="text-sm text-gray-600 mb-3">{p.desc}</p>
                            <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
                                <span className="text-xs font-semibold text-blue-700">{p.tech}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        <i className="fas fa-layer-group text-blue-600 mr-2"></i>
                        3계층 데이터 관리
                    </h3>
                    <div className="space-y-4">
                        {dataLayers.map((layer, i) => (
                            <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                <div className="grid md:grid-cols-4 gap-4">
                                    <div>
                                        <div className="text-xs text-gray-600 mb-1">데이터 유형</div>
                                        <div className="font-semibold text-gray-900">{layer.layer}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-600 mb-1">접근 권한</div>
                                        <div className="font-semibold text-blue-600">{layer.access}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-600 mb-1">저장 위치</div>
                                        <div className="font-semibold text-green-600">{layer.storage}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-600 mb-1">보안 수준</div>
                                        <div className="font-semibold text-purple-600">{layer.encryption}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-gray-700">
                            <strong className="text-blue-700">OpenHash 5계층 구조:</strong> 개인·민간·공공·연계·검증 계층을 분리하여 데이터가 절대 혼합되지 않습니다. 각 계층은 독립된 암호키로 보호되며, 사용자만이 자신의 데이터를 완전히 통제할 수 있습니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
