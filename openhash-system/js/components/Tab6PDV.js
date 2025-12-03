const Tab6PDV = () => {
    const [isUnlocked, setIsUnlocked] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState('overview');

    const categories = [
        { id: 'overview', icon: 'fa-home', title: '개요' },
        { id: 'health', icon: 'fa-heartbeat', title: '건강정보' },
        { id: 'financial', icon: 'fa-won-sign', title: '금융정보' },
        { id: 'identity', icon: 'fa-id-card', title: '신원정보' },
        { id: 'activity', icon: 'fa-history', title: '활동기록' }
    ];

    const healthData = [
        { type: '진료기록', count: 24, updated: '2025-11-30' },
        { type: '처방전', count: 15, updated: '2025-11-28' },
        { type: '건강검진', count: 3, updated: '2025-10-15' }
    ];

    return (
        <div>
            <div className="mb-8">
                <h4 className="text-2xl font-bold text-gov-text mb-3">개인정보금고 (Privacy Data Vault, PDV)</h4>
                <p className="text-gov-text-secondary leading-relaxed mb-4">
                    개인이 자신의 데이터를 완전히 통제하는 암호화된 저장소입니다. 
                    오픈해시 기술로 데이터 무결성을 보장하며, 생체인증으로만 접근 가능합니다.
                    의료기록, 금융정보, 신원정보 등 민감한 개인정보를 안전하게 보관합니다.
                </p>
            </div>

            {/* 생체인증 */}
            {!isUnlocked ? (
                <div className="bg-gov-gray rounded-lg p-12 text-center border-2 border-gov-border">
                    <div className="w-24 h-24 bg-gov-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="fas fa-lock text-5xl text-gov-blue"></i>
                    </div>
                    <h5 className="text-2xl font-bold text-gov-text mb-4">개인정보금고 잠금 상태</h5>
                    <p className="text-gov-text-secondary mb-6">
                        생체 인증으로 금고를 열어주세요
                    </p>
                    <button
                        onClick={() => setIsUnlocked(true)}
                        className="px-8 py-4 bg-gov-blue text-white rounded-lg font-bold hover:bg-gov-blue-light"
                    >
                        <i className="fas fa-fingerprint mr-2 text-xl"></i>
                        생체 인증
                    </button>
                    <div className="mt-6 text-sm text-gov-text-secondary">
                        지원: 지문, 얼굴인식, 홍채인식
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* 잠금 해제 헤더 */}
                    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <i className="fas fa-unlock text-3xl text-green-600"></i>
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-green-800">금고 잠금 해제</div>
                                    <div className="text-sm text-green-600">생체 인증 완료 - 홍길동님</div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsUnlocked(false)}
                                className="px-4 py-2 bg-red-100 text-red-700 rounded font-bold hover:bg-red-200"
                            >
                                <i className="fas fa-lock mr-2"></i>
                                잠금
                            </button>
                        </div>
                    </div>

                    {/* 카테고리 탭 */}
                    <div className="flex gap-2 overflow-x-auto">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-3 rounded-lg font-bold whitespace-nowrap transition-colors ${
                                    selectedCategory === cat.id
                                        ? 'bg-gov-blue text-white'
                                        : 'bg-white border border-gov-border text-gov-text hover:bg-gov-gray'
                                }`}
                            >
                                <i className={`fas ${cat.icon} mr-2`}></i>
                                {cat.title}
                            </button>
                        ))}
                    </div>

                    {/* 컨텐츠 영역 */}
                    <div className="bg-white rounded-lg p-6 border border-gov-border">
                        {selectedCategory === 'overview' && (
                            <div>
                                <h5 className="text-xl font-bold text-gov-text mb-4">PDV 개요</h5>
                                <div className="grid md:grid-cols-3 gap-4 mb-6">
                                    <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 text-center">
                                        <div className="text-3xl font-bold text-blue-700">42</div>
                                        <div className="text-sm text-blue-600 mt-1">저장된 문서</div>
                                    </div>
                                    <div className="bg-green-50 border border-green-300 rounded-lg p-4 text-center">
                                        <div className="text-3xl font-bold text-green-700">15</div>
                                        <div className="text-sm text-green-600 mt-1">공유 중인 항목</div>
                                    </div>
                                    <div className="bg-purple-50 border border-purple-300 rounded-lg p-4 text-center">
                                        <div className="text-3xl font-bold text-purple-700">128</div>
                                        <div className="text-sm text-purple-600 mt-1">접근 기록</div>
                                    </div>
                                </div>

                                <div className="bg-gov-gray rounded-lg p-6">
                                    <h6 className="font-bold text-gov-text mb-3">주요 기능</h6>
                                    <ul className="space-y-2 text-sm text-gov-text">
                                        <li className="flex gap-2">
                                            <i className="fas fa-check text-green-600 mt-1"></i>
                                            <span><strong>완전한 통제권:</strong> 본인만 데이터 접근 및 공유 권한</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <i className="fas fa-check text-green-600 mt-1"></i>
                                            <span><strong>엔드투엔드 암호화:</strong> 전송 및 저장 시 암호화</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <i className="fas fa-check text-green-600 mt-1"></i>
                                            <span><strong>오픈해시 무결성:</strong> 모든 기록이 해시체인으로 검증</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <i className="fas fa-check text-green-600 mt-1"></i>
                                            <span><strong>세밀한 권한 관리:</strong> 문서별/기간별 공유 설정</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {selectedCategory === 'health' && (
                            <div>
                                <h5 className="text-xl font-bold text-gov-text mb-4">건강정보</h5>
                                <div className="space-y-3">
                                    {healthData.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 bg-gov-gray rounded-lg">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                                    <i className="fas fa-file-medical text-red-600 text-xl"></i>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gov-text">{item.type}</div>
                                                    <div className="text-sm text-gov-text-secondary">
                                                        {item.count}건 | 최근 업데이트: {item.updated}
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="px-4 py-2 bg-gov-blue text-white rounded font-bold hover:bg-gov-blue-light text-sm">
                                                상세보기
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 bg-blue-50 border border-blue-300 rounded-lg p-4">
                                    <div className="flex items-center gap-2 text-blue-800">
                                        <i className="fas fa-info-circle"></i>
                                        <span className="text-sm font-bold">
                                            의료기관과 공유 시 환자 동의 후 일회성 접근 권한 부여
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedCategory === 'financial' && (
                            <div className="text-center py-12">
                                <i className="fas fa-won-sign text-6xl text-gov-text-secondary mb-4"></i>
                                <div className="text-xl font-bold text-gov-text mb-2">금융정보</div>
                                <div className="text-gov-text-secondary">계좌정보, 거래내역, 신용정보 등</div>
                            </div>
                        )}

                        {selectedCategory === 'identity' && (
                            <div className="text-center py-12">
                                <i className="fas fa-id-card text-6xl text-gov-text-secondary mb-4"></i>
                                <div className="text-xl font-bold text-gov-text mb-2">신원정보</div>
                                <div className="text-gov-text-secondary">주민등록증, 운전면허증, 여권 등</div>
                            </div>
                        )}

                        {selectedCategory === 'activity' && (
                            <div className="text-center py-12">
                                <i className="fas fa-history text-6xl text-gov-text-secondary mb-4"></i>
                                <div className="text-xl font-bold text-gov-text mb-2">활동기록</div>
                                <div className="text-gov-text-secondary">접근 로그, 공유 이력, 변경 사항</div>
                            </div>
                        )}
                    </div>

                    {/* 보안 특징 */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-purple-50 border border-purple-300 rounded-lg p-4">
                            <h6 className="font-bold text-purple-800 mb-3">🔐 보안 메커니즘</h6>
                            <ul className="text-sm space-y-1 text-gov-text">
                                <li>• AES-256 암호화</li>
                                <li>• 다중 생체 인증 (지문/얼굴/홍채)</li>
                                <li>• 오픈해시 무결성 검증</li>
                                <li>• 포스트퀀텀 암호화 적용</li>
                            </ul>
                        </div>
                        <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                            <h6 className="font-bold text-green-800 mb-3">✓ 사용자 권한</h6>
                            <ul className="text-sm space-y-1 text-gov-text">
                                <li>• 본인만 데이터 열람 가능</li>
                                <li>• 공유 대상/기간 직접 설정</li>
                                <li>• 언제든 공유 철회 가능</li>
                                <li>• 모든 접근 기록 확인 가능</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
