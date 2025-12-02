const Overview = () => {
    const [expandedCard, setExpandedCard] = React.useState(null);

    const systemFeatures = [
        {
            id: 'phone-id',
            icon: '📱',
            title: '전화번호 기반 계정',
            description: '별도 가입 없이 전화번호만으로 즉시 계좌 개설',
            specs: [
                { label: '계정 ID', value: '휴대전화번호', desc: '본인인증 자동 완료' },
                { label: '계좌 개설', value: '즉시', desc: '0.015ms 처리' },
                { label: 'PDV 연동', value: '자동', desc: '개인정보금고 통합' },
                { label: '보안', value: 'FPGA 암호화', desc: '생체인증 지원' }
            ]
        },
        {
            id: 'pdv-integration',
            icon: '🔐',
            title: '개인정보금고(PDV) 통합',
            description: '은행 계좌 정보를 개인정보금고에 자동 저장',
            specs: [
                { label: '계좌 정보', value: '자동 저장', desc: 'PDV 실시간 동기화' },
                { label: '거래 내역', value: '완전 암호화', desc: '본인만 접근 가능' },
                { label: '재무제표', value: '통합 관리', desc: '자산 현황 일원화' },
                { label: '권한 제어', value: '사용자 설정', desc: '선택적 공유 가능' }
            ]
        },
        {
            id: 'openhash-record',
            icon: '📊',
            title: '오픈해시 불변 기록',
            description: '모든 거래를 4계층 구조로 영구 기록',
            specs: [
                { label: '거래 기록', value: '4계층 구조', desc: '확률적 계층 선택' },
                { label: '위변조 방지', value: '100%', desc: '수학적 보장' },
                { label: '에너지 효율', value: '98.5%', desc: '블록체인 대비' },
                { label: '조회 속도', value: '0.015ms', desc: '실시간 검증' }
            ]
        },
        {
            id: 'realtime-statement',
            icon: '💼',
            title: '실시간 재무제표 연동',
            description: '예금 계정은 재무제표의 디지털 화폐 항목',
            specs: [
                { label: '예금 잔액', value: '실시간 반영', desc: '재무제표 자동 갱신' },
                { label: '입출금', value: '즉시 기록', desc: '0.015ms 처리' },
                { label: '대차균형', value: '자동 검증', desc: '총자산=총부채+자본' },
                { label: '분식 방지', value: '구조적 차단', desc: '조작 불가능' }
            ]
        }
    ];

    return (
        <div className="space-y-6 animate-slideDown">
            {/* 시스템 소개 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-4">
                    <i className="fas fa-university text-bank-blue text-3xl"></i>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">오픈해시 은행 시스템</h1>
                        <p className="text-gray-600">FPGA + AI 기반 완전 자율 은행</p>
                    </div>
                </div>
                
                <div className="grid md:grid-cols-4 gap-4 mt-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-bank-blue mb-1">0.015ms</div>
                        <div className="text-sm text-gray-600">처리 속도</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 mb-1">99.4%</div>
                        <div className="text-sm text-gray-600">검증 정확도</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 mb-1">100%</div>
                        <div className="text-sm text-gray-600">거래 기록</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600 mb-1">88.6%</div>
                        <div className="text-sm text-gray-600">전력 절감</div>
                    </div>
                </div>
            </div>

            {/* 핵심 기능 */}
            <div>
                <h2 className="text-xl font-bold mb-4 text-gray-900">핵심 기능</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {systemFeatures.map(feature => (
                        <div key={feature.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div 
                                className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => setExpandedCard(expandedCard === feature.id ? null : feature.id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">{feature.icon}</span>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                                            <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                                        </div>
                                    </div>
                                    <i className={`fas fa-chevron-${expandedCard === feature.id ? 'up' : 'down'} text-bank-blue`}></i>
                                </div>
                            </div>
                            
                            <div className={`accordion-content ${expandedCard === feature.id ? 'open' : ''}`}>
                                {expandedCard === feature.id && (
                                    <div className="px-5 pb-5 bg-gray-50 border-t border-gray-200">
                                        <div className="grid grid-cols-2 gap-3 mt-4">
                                            {feature.specs.map((spec, idx) => (
                                                <div key={idx} className="bg-white p-3 rounded border border-gray-200">
                                                    <div className="text-xs text-gray-500 mb-1">{spec.label}</div>
                                                    <div className="text-base font-bold text-bank-blue mb-1">{spec.value}</div>
                                                    <div className="text-xs text-gray-600">{spec.desc}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 시스템 아키텍처 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">시스템 아키텍처</h2>
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-4 border border-gray-200 rounded-lg">
                        <div className="text-3xl mb-2">📱</div>
                        <div className="font-bold text-sm mb-1">전화번호 인증</div>
                        <div className="text-xs text-gray-600">본인확인 자동</div>
                    </div>
                    <div className="text-center p-4 border border-gray-200 rounded-lg">
                        <div className="text-3xl mb-2">🔐</div>
                        <div className="font-bold text-sm mb-1">PDV 저장</div>
                        <div className="text-xs text-gray-600">계좌정보 암호화</div>
                    </div>
                    <div className="text-center p-4 border border-gray-200 rounded-lg">
                        <div className="text-3xl mb-2">📊</div>
                        <div className="font-bold text-sm mb-1">재무제표 연동</div>
                        <div className="text-xs text-gray-600">실시간 갱신</div>
                    </div>
                    <div className="text-center p-4 border border-gray-200 rounded-lg">
                        <div className="text-3xl mb-2">🔗</div>
                        <div className="font-bold text-sm mb-1">오픈해시 기록</div>
                        <div className="text-xs text-gray-600">불변 증명</div>
                    </div>
                </div>
            </div>

            {/* 주요 특징 */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200 p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">주요 특징</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <i className="fas fa-bolt text-blue-600"></i>
                            <h3 className="font-bold">초고속 처리</h3>
                        </div>
                        <p className="text-sm text-gray-600">FPGA 하드웨어 가속으로 0.015ms 만에 거래 완료</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <i className="fas fa-shield-alt text-green-600"></i>
                            <h3 className="font-bold">완벽한 보안</h3>
                        </div>
                        <p className="text-sm text-gray-600">개인정보금고 연동으로 데이터 완전 암호화</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <i className="fas fa-check-circle text-purple-600"></i>
                            <h3 className="font-bold">투명한 기록</h3>
                        </div>
                        <p className="text-sm text-gray-600">오픈해시로 모든 거래를 불변 기록</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
