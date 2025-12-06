const Architecture = () => {
    const layers = [
        {
            layer: 'Layer 4',
            number: 130,
            name: '국가 (National Level)',
            nodes: 'Cloud Archive - 영구 보존 계층',
            role: '전국 단위 데이터 통합, 장기 아카이빙, 최종 감사 추적',
            examples: '중앙정부 데이터센터, 국가 백본 네트워크',
            color: 'border-l-purple-600 bg-purple-50',
            icon: 'fa-flag'
        },
        {
            layer: 'Layer 3',
            number: 120,
            name: '광역시도 (Metropolitan/Provincial Level)',
            nodes: 'Core Engine - 중앙 처리 계층, Representative 노드',
            role: 'PBFT 합의 수행, 광역 단위 데이터 검증 및 집약',
            examples: '서울시, 경기도, 제주특별자치도 등 17개 광역자치단체',
            color: 'border-l-blue-600 bg-blue-50',
            icon: 'fa-city'
        },
        {
            layer: 'Layer 2',
            number: 110,
            name: '시군구 (City/County/District Level)',
            nodes: 'Edge Server - 지역 집약 계층',
            role: 'Merkle Tree 집약, 기초자치단체 단위 중간 검증',
            examples: '서울 강남구, 제주시, 부산 해운대구 등 226개 기초자치단체',
            color: 'border-l-green-600 bg-green-50',
            icon: 'fa-building'
        },
        {
            layer: 'Layer 1',
            number: 100,
            name: '읍면동 (Town/Township/Neighborhood Level)',
            nodes: 'Edge Device - 최하위 계층',
            role: '최일선 행정 단위, 1차 데이터 수집 및 검증',
            examples: '행정동 3,488개, 법정동 포함 시 더 세분화',
            color: 'border-l-yellow-600 bg-yellow-50',
            icon: 'fa-home'
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gov-text mb-4">4계층 아키텍처</h3>
                    <p className="text-gov-text-secondary">대한민국 행정 구역 체계를 활용한 계층적 분산 구조 (도 1)</p>
                </div>

                {/* Edge Device 설명 */}
                <div className="max-w-4xl mx-auto mb-8">
                    <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <i className="fas fa-mobile-alt text-3xl text-gray-600"></i>
                            <div>
                                <h4 className="text-lg font-bold text-gov-text">사용자 단말 (50)</h4>
                                <p className="text-sm text-gov-text-secondary">계층 구조 외부의 데이터 생성/소비 장치</p>
                            </div>
                        </div>
                        <div className="text-sm text-gov-text-secondary ml-12">
                            <p className="mb-2"><span className="font-medium text-gov-text">역할:</span> 스마트폰, 태블릿, IoT 센서 등 최종 사용자 디바이스에서 데이터 생성 및 해시 추출 후 Layer 1로 전송</p>
                            <p className="mb-2"><span className="font-medium text-gov-text">중요:</span> 원본 데이터는 사용자 단말에만 보관, 서버 계층에는 해시값(400)만 전송</p>
                            <p><span className="font-medium text-gov-text">예시:</span> 민원인 스마트폰, 공무원 업무용 단말, 정부24 앱, 각종 IoT 센서</p>
                        </div>
                    </div>
                </div>

                {/* 기존 4계층 구조 유지 */}
                <div className="max-w-4xl mx-auto space-y-4 mb-12">
                    {layers.map((layer, idx) => (
                        <div key={idx} className={`border-l-4 ${layer.color} rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow`}>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 flex items-center justify-center bg-gov-blue bg-opacity-10 rounded-full flex-shrink-0">
                                    <i className={`fas ${layer.icon} text-gov-blue text-xl`}></i>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="inline-block px-3 py-1 bg-gov-blue text-white text-sm font-bold rounded">
                                            {layer.layer}
                                        </span>
                                        <h4 className="text-lg font-bold text-gov-text">{layer.name}</h4>
                                        <span className="text-xs text-gov-text-secondary">도면 부호: {layer.number}</span>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-gov-text-secondary">
                                            <span className="font-medium text-gov-text">노드 구성:</span> {layer.nodes}
                                        </p>
                                        <p className="text-sm text-gov-text-secondary">
                                            <span className="font-medium text-gov-text">주요 역할:</span> {layer.role}
                                        </p>
                                        <p className="text-sm text-gov-text-secondary">
                                            <span className="font-medium text-gov-text">실제 사례:</span> {layer.examples}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 계층별 합의 메커니즘 테이블 - 새로 추가 */}
                <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-12">
                    <div className="bg-gov-blue text-white px-6 py-4">
                        <h4 className="text-lg font-bold flex items-center">
                            <i className="fas fa-handshake mr-3"></i>
                            계층별 합의 메커니즘 (도 6)
                        </h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b-2 border-gov-border bg-gray-50">
                                    <th className="text-left px-6 py-3 font-bold text-gov-text">계층</th>
                                    <th className="text-left px-6 py-3 font-bold text-gov-text">합의 방식</th>
                                    <th className="text-left px-6 py-3 font-bold text-gov-text">노드 구성</th>
                                    <th className="text-left px-6 py-3 font-bold text-gov-text">임계값</th>
                                    <th className="text-left px-6 py-3 font-bold text-gov-text">특징</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gov-border hover:bg-gray-50">
                                    <td className="px-6 py-4 font-bold text-gov-text">Layer 1 (100)</td>
                                    <td className="px-6 py-4">LPBFT</td>
                                    <td className="px-6 py-4 text-gov-text-secondary">읍면동 노드</td>
                                    <td className="px-6 py-4 text-gov-text-secondary">2f + 1</td>
                                    <td className="px-6 py-4 text-gov-text-secondary">경량 합의, 빠른 처리</td>
                                </tr>
                                <tr className="border-b border-gov-border hover:bg-gray-50">
                                    <td className="px-6 py-4 font-bold text-gov-text">Layer 2 (110)</td>
                                    <td className="px-6 py-4">LPBFT</td>
                                    <td className="px-6 py-4 text-gov-text-secondary">시군구 노드</td>
                                    <td className="px-6 py-4 text-gov-text-secondary">2f + 1</td>
                                    <td className="px-6 py-4 text-gov-text-secondary">Merkle Tree 집약</td>
                                </tr>
                                <tr className="border-b border-gov-border hover:bg-gray-50 bg-blue-50">
                                    <td className="px-6 py-4 font-bold text-gov-text">Layer 3 (120)</td>
                                    <td className="px-6 py-4 font-bold text-blue-700">PBFT 변형</td>
                                    <td className="px-6 py-4 text-gov-text-secondary">Representative 노드(210) 10개</td>
                                    <td className="px-6 py-4 font-bold text-blue-700">7-of-10</td>
                                    <td className="px-6 py-4 text-gov-text-secondary">최종 검증, 높은 신뢰도</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-bold text-gov-text">Layer 4 (130)</td>
                                    <td className="px-6 py-4">-</td>
                                    <td className="px-6 py-4 text-gov-text-secondary">Archive 노드</td>
                                    <td className="px-6 py-4 text-gov-text-secondary">-</td>
                                    <td className="px-6 py-4 text-gov-text-secondary">영구 보존 전용</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 border-t border-gov-border">
                        <p className="text-sm text-gov-text-secondary">
                            <strong>Byzantine Fault Tolerance:</strong> n ≥ 3f + 1 (n: 전체 노드, f: 악의적 노드), 합의 필요 응답: 2f + 1개
                        </p>
                    </div>
                </div>

                {/* Representative 노드 상세 테이블 - 새로 추가 */}
                <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-12">
                    <div className="bg-purple-600 text-white px-6 py-4">
                        <h4 className="text-lg font-bold flex items-center">
                            <i className="fas fa-users mr-3"></i>
                            Representative 노드 (210) - Layer 3 배치
                        </h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b border-gov-border">
                                    <th className="text-left px-6 py-4 bg-gray-50 font-bold text-gov-text" style={{width: '200px'}}>선정 기준</th>
                                    <td className="px-6 py-4 text-gov-text-secondary">Layer 2(110) 노드 중 상위 10% 처리량 + 지리적 분산 고려</td>
                                </tr>
                                <tr className="border-b border-gov-border">
                                    <th className="text-left px-6 py-4 bg-gray-50 font-bold text-gov-text">노드 수</th>
                                    <td className="px-6 py-4 text-gov-text-secondary">10개 (일 실시예, 시스템 규모에 따라 가변)</td>
                                </tr>
                                <tr className="border-b border-gov-border">
                                    <th className="text-left px-6 py-4 bg-gray-50 font-bold text-gov-text">합의 방식</th>
                                    <td className="px-6 py-4 text-gov-text-secondary">PBFT 변형, 7-of-10 임계값 (10개 중 7개 동의 필요)</td>
                                </tr>
                                <tr className="border-b border-gov-border">
                                    <th className="text-left px-6 py-4 bg-gray-50 font-bold text-gov-text">임기</th>
                                    <td className="px-6 py-4 text-gov-text-secondary">1주일 자동 재선정 (처리량 및 신뢰도 기반)</td>
                                </tr>
                                <tr className="border-b border-gov-border">
                                    <th className="text-left px-6 py-4 bg-gray-50 font-bold text-gov-text">키 관리</th>
                                    <td className="px-6 py-4 text-gov-text-secondary">Shamir 비밀 분산 (n=10, k=7) - 마스터 키를 10조각으로 분할, 7조각 필요</td>
                                </tr>
                                <tr>
                                    <th className="text-left px-6 py-4 bg-gray-50 font-bold text-gov-text">보안 특성</th>
                                    <td className="px-6 py-4 text-gov-text-secondary">k-1개(6개) 이하로는 정보 이론적으로 복원 불가능</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 계층 수 가변성 설명 - 새로 추가 */}
                <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-6 mb-12">
                    <div className="flex items-start gap-4">
                        <i className="fas fa-info-circle text-amber-600 text-2xl mt-1"></i>
                        <div>
                            <h4 className="text-lg font-bold text-amber-900 mb-3">계층 수 가변성</h4>
                            <p className="text-sm text-gov-text-secondary mb-2">
                                본 시스템의 계층 개수는 <strong>2개부터 N개까지 자유롭게 설정</strong> 가능합니다. 
                                4계층 구조는 한국 행정체계에 최적화된 일 실시예이며, 다른 국가나 조직의 구조에 맞게 조정 가능합니다.
                            </p>
                            <div className="grid md:grid-cols-3 gap-4 mt-4">
                                <div className="bg-white rounded p-3 border border-amber-300">
                                    <div className="font-bold text-gov-text mb-1">2계층 예시</div>
                                    <div className="text-xs text-gov-text-secondary">소규모 조직: Edge + Core</div>
                                </div>
                                <div className="bg-white rounded p-3 border border-amber-300">
                                    <div className="font-bold text-gov-text mb-1">4계층 예시</div>
                                    <div className="text-xs text-gov-text-secondary">한국: 읍면동 + 시군구 + 광역시도 + 국가</div>
                                </div>
                                <div className="bg-white rounded p-3 border border-amber-300">
                                    <div className="font-bold text-gov-text mb-1">N계층 예시</div>
                                    <div className="text-xs text-gov-text-secondary">글로벌: 지역 + 국가 + 대륙 + 글로벌 ...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AWS 실측 노드 수 테이블 - 새로 추가 */}
                <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-12">
                    <div className="bg-green-600 text-white px-6 py-4">
                        <h4 className="text-lg font-bold flex items-center">
                            <i className="fas fa-server mr-3"></i>
                            AWS 실측 노드 구성 예시 (동적 노드 관리 테스트)
                        </h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b-2 border-gov-border bg-gray-50">
                                    <th className="text-left px-6 py-3 font-bold text-gov-text">시점</th>
                                    <th className="text-center px-6 py-3 font-bold text-gov-text">Layer 1</th>
                                    <th className="text-center px-6 py-3 font-bold text-gov-text">Layer 2</th>
                                    <th className="text-center px-6 py-3 font-bold text-gov-text">Representative</th>
                                    <th className="text-center px-6 py-3 font-bold text-gov-text">총 노드</th>
                                    <th className="text-right px-6 py-3 font-bold text-gov-text">예상 TPS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gov-border hover:bg-gray-50">
                                    <td className="px-6 py-4 font-bold text-gov-text">초기(T0)</td>
                                    <td className="text-center px-6 py-4">3,400</td>
                                    <td className="text-center px-6 py-4">143</td>
                                    <td className="text-center px-6 py-4">8</td>
                                    <td className="text-center px-6 py-4 font-bold">3,551</td>
                                    <td className="text-right px-6 py-4">278,398</td>
                                </tr>
                                <tr className="border-b border-gov-border hover:bg-gray-50 bg-green-50">
                                    <td className="px-6 py-4 font-bold text-gov-text">베트남 진입(T1)</td>
                                    <td className="text-center px-6 py-4">+800</td>
                                    <td className="text-center px-6 py-4">+32</td>
                                    <td className="text-center px-6 py-4">+2</td>
                                    <td className="text-center px-6 py-4 font-bold">4,385</td>
                                    <td className="text-right px-6 py-4 font-bold text-green-700">343,784 (+23.5%)</td>
                                </tr>
                                <tr className="hover:bg-gray-50 bg-red-50">
                                    <td className="px-6 py-4 font-bold text-gov-text">싱가포르 퇴출(T2)</td>
                                    <td className="text-center px-6 py-4">-400</td>
                                    <td className="text-center px-6 py-4">-18</td>
                                    <td className="text-center px-6 py-4">-1</td>
                                    <td className="text-center px-6 py-4 font-bold">3,966</td>
                                    <td className="text-right px-6 py-4 font-bold text-red-700">310,934 (-9.6%)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 border-t border-gov-border">
                        <p className="text-sm text-gov-text-secondary">
                            <strong>주요 특징:</strong> 노드 수 변화 시 TPS 선형 증감, 무중단 재구성 (23.6ms ~ 8.98ms), 데이터 손실 0%
                        </p>
                    </div>
                </div>

                {/* 데이터 흐름 다이어그램 - 기존 유지 */}
                <div className="max-w-4xl mx-auto bg-gov-gray rounded-lg p-8 border-2 border-gov-blue">
                    <h4 className="text-xl font-bold text-gov-text mb-6 text-center">데이터 흐름 구조 (도 9)</h4>
                    <div className="space-y-3">
                        {['사용자 단말(50) - 스마트폰 등', 'Layer 1(100) - 읍면동', 'Layer 2(110) - 시군구', 'Layer 3(120) - 광역시도 + Representative(210)', 'Layer 4(130) - 국가'].map((item, idx) => (
                            <React.Fragment key={idx}>
                                <div className="bg-white rounded-lg p-4 text-center font-medium text-gov-text border border-gov-border">
                                    {item}
                                </div>
                                {idx < 4 && (
                                    <div className="flex justify-center">
                                        <i className="fas fa-arrow-down text-2xl text-gov-blue"></i>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <p className="text-sm text-gov-text-secondary text-center mt-6">
                        확률적 계층 선택(300): N = SHA256(SHA256(문서해시||타임스탬프)) mod 100
                    </p>
                </div>
            </div>
        </section>
    );
};
