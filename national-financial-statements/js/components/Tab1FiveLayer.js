function Tab1FiveLayer() {
    const layers = [
        {
            id: 'edge',
            name: 'Edge (공무원 단말기)',
            color: 'blue',
            icon: 'fa-mobile-alt',
            nodes: '500만+',
            example: '제주도청 공무원 개개인의 단말기',
            description: '최말단에서 데이터 생성 및 오픈해시 기록',
            functions: [
                '업무 문서 작성 및 해시 생성',
                '5W1H 메타데이터 자동 기록',
                '개인 전자서명 (CRYSTALS-Dilithium)',
                '상위 Layer로 해시 전송'
            ]
        },
        {
            id: 'layer1',
            name: 'Layer 1 (부서)',
            color: 'green',
            icon: 'fa-users',
            nodes: '50,000+',
            example: '제주도청 환경보전과, 관광진흥과 등',
            description: '부서 단위 데이터 취합 및 검증',
            functions: [
                '부서원 Edge 데이터 통합',
                '부서장 승인 및 서명',
                '부서 Merkle Tree 구성',
                'Layer 2로 해시 전송'
            ]
        },
        {
            id: 'layer2',
            name: 'Layer 2 (기관)',
            color: 'purple',
            icon: 'fa-building',
            nodes: '5,000+',
            example: '제주특별자치도청, 서울시청 등',
            description: '기관 단위 데이터 통합 관리',
            functions: [
                '소속 부서 데이터 통합',
                '기관장 최종 승인',
                '기관 정책 시행 기록',
                'Layer 3로 해시 전송'
            ]
        },
        {
            id: 'layer3',
            name: 'Layer 3 (부처)',
            color: 'orange',
            icon: 'fa-landmark',
            nodes: '50+',
            example: '행정안전부, 법무부, 국회 등',
            description: '중앙 부처 단위 정책 통합',
            functions: [
                '소관 기관 데이터 통합',
                '부처 정책 수립 및 시행',
                '입법/사법/행정 업무 기록',
                'Layer 4로 해시 전송'
            ]
        },
        {
            id: 'layer4',
            name: 'Layer 4 (국가데이터처)',
            color: 'red',
            icon: 'fa-server',
            nodes: '3개 (대전·서울·부산)',
            example: '국가데이터처 통합 관리 센터',
            description: '전국 공공데이터 통합 검색 및 분석',
            functions: [
                '전국 정부 기관 데이터 요약 저장',
                '5W1H 검색 인덱싱 (구글 방식)',
                'AI 분석 및 2차/3차 정보 추출',
                '국민 및 공무원 검색 서비스'
            ]
        }
    ];

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-gov-blue p-4">
                <p className="text-sm text-gov-text">
                    국가데이터처는 <span className="font-bold text-gov-blue">오픈해시 기술</span>로 
                    입법·사법·행정 업무를 <span className="font-bold text-gov-blue">Edge → Layer 1 → Layer 2 → Layer 3 → Layer 4</span>로 
                    연동하여 <span className="font-bold text-gov-blue">누가, 언제, 어디서, 무엇을, 어떻게, 왜</span> 데이터를 생산했는지 기록합니다.
                </p>
            </div>

            {/* 계층 구조 시각화 */}
            <div className="bg-white border-2 border-gov-border rounded-lg p-6">
                <h4 className="text-base font-bold text-gov-text mb-4 text-center">
                    오픈해시 계층 구조 (Edge → Layer 4)
                </h4>
                <div className="space-y-3">
                    {layers.reverse().map((layer, idx) => (
                        <div key={layer.id} className={`bg-${layer.color}-50 border-2 border-${layer.color}-500 rounded-lg p-4`}>
                            <div className="flex items-start space-x-4">
                                <div className={`bg-${layer.color}-100 p-3 rounded-lg`}>
                                    <i className={`fas ${layer.icon} text-2xl text-${layer.color}-600`}></i>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="font-bold text-base">{layer.name}</div>
                                        <div className="text-sm text-gray-600">노드: {layer.nodes}</div>
                                    </div>
                                    <div className="text-sm text-gray-700 mb-2">{layer.description}</div>
                                    <div className="bg-white rounded p-2 mb-2">
                                        <div className="text-xs text-gray-600">예시</div>
                                        <div className="text-sm font-semibold">{layer.example}</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {layer.functions.map((func, fidx) => (
                                            <div key={fidx} className="bg-white rounded p-2 text-xs">
                                                <i className="fas fa-check-circle text-green-600 mr-1"></i>
                                                {func}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 제주도청 예시 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-4 border-gov-blue rounded-lg p-6">
                <h4 className="text-lg font-bold text-gov-blue mb-4">
                    <i className="fas fa-map-marked-alt mr-2"></i>
                    실제 사례: 제주특별자치도청
                </h4>
                <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                        <div className="font-bold text-sm mb-2">Edge (공무원 단말기)</div>
                        <div className="text-sm">제주도청 환경보전과 김철수 주무관이 "한라산 생태계 조사 보고서" 작성</div>
                        <div className="text-xs text-gray-600 mt-1">→ SHA-256 해시 생성 + 전자서명 + 5W1H 메타데이터</div>
                    </div>
                    <div className="text-center text-2xl text-gray-400">↓</div>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                        <div className="font-bold text-sm mb-2">Layer 1 (부서: 환경보전과)</div>
                        <div className="text-sm">부서장 검토 및 승인 → 부서 Merkle Tree에 포함</div>
                    </div>
                    <div className="text-center text-2xl text-gray-400">↓</div>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                        <div className="font-bold text-sm mb-2">Layer 2 (기관: 제주특별자치도청)</div>
                        <div className="text-sm">도지사 최종 승인 → 도청 통합 해시 체인</div>
                    </div>
                    <div className="text-center text-2xl text-gray-400">↓</div>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                        <div className="font-bold text-sm mb-2">Layer 3 (부처: 행정안전부)</div>
                        <div className="text-sm">지방자치 정책 통합 → 전국 지자체 데이터 취합</div>
                    </div>
                    <div className="text-center text-2xl text-gray-400">↓</div>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                        <div className="font-bold text-sm mb-2">Layer 4 (국가데이터처)</div>
                        <div className="text-sm">전국 검색 인덱스에 등록 → AI 분석으로 환경 정책 트렌드 추출</div>
                    </div>
                </div>
            </div>

            {/* 5W1H 검색 기능 */}
            <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-4">
                <h4 className="text-base font-bold text-yellow-700 mb-3">
                    <i className="fas fa-search mr-2"></i>
                    5W1H 검색 기능 (구글 방식)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="bg-white rounded p-3">
                        <div className="font-bold text-sm text-yellow-700">Who (누가)</div>
                        <div className="text-xs text-gray-600">작성자, 승인자, 부서</div>
                    </div>
                    <div className="bg-white rounded p-3">
                        <div className="font-bold text-sm text-yellow-700">When (언제)</div>
                        <div className="text-xs text-gray-600">작성일시, 승인일시</div>
                    </div>
                    <div className="bg-white rounded p-3">
                        <div className="font-bold text-sm text-yellow-700">Where (어디서)</div>
                        <div className="text-xs text-gray-600">기관, 부서, 위치</div>
                    </div>
                    <div className="bg-white rounded p-3">
                        <div className="font-bold text-sm text-yellow-700">What (무엇을)</div>
                        <div className="text-xs text-gray-600">문서 제목, 내용 요약</div>
                    </div>
                    <div className="bg-white rounded p-3">
                        <div className="font-bold text-sm text-yellow-700">How (어떻게)</div>
                        <div className="text-xs text-gray-600">작성 방법, 처리 절차</div>
                    </div>
                    <div className="bg-white rounded p-3">
                        <div className="font-bold text-sm text-yellow-700">Why (왜)</div>
                        <div className="text-xs text-gray-600">목적, 정책 근거</div>
                    </div>
                </div>
            </div>

            {/* AI 분석 기능 */}
            <div className="bg-purple-50 border-2 border-purple-500 rounded-lg p-4">
                <h4 className="text-base font-bold text-purple-700 mb-3">
                    <i className="fas fa-brain mr-2"></i>
                    국가데이터처 AI 분석 기능
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>✅ <span className="font-bold">1차 정보</span>: 원본 문서 및 해시 체인</li>
                    <li>✅ <span className="font-bold">2차 정보</span>: 부처별/기관별 업무 통계 및 트렌드</li>
                    <li>✅ <span className="font-bold">3차 정보</span>: AI 예측 분석 (정책 효과, 예산 최적화)</li>
                    <li>✅ <span className="font-bold">검색 지원</span>: 자연어 질의로 관련 문서 즉시 검색</li>
                    <li>✅ <span className="font-bold">감사 지원</span>: 승인 과정 추적 및 이상 탐지</li>
                </ul>
            </div>

            {/* 핵심 개념 */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                <h4 className="text-base font-bold text-green-700 mb-3">
                    <i className="fas fa-lightbulb mr-2"></i>
                    오픈해시 계층 구조의 핵심
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>✅ <span className="font-bold">Edge 중심</span>: 공무원 개개인이 데이터 생산 주체</li>
                    <li>✅ <span className="font-bold">상향식 통합</span>: 부서 → 기관 → 부처 → 국가데이터처</li>
                    <li>✅ <span className="font-bold">해시 체인 연동</span>: 각 계층이 오픈해시로 연결</li>
                    <li>✅ <span className="font-bold">검색 최적화</span>: 5W1H 메타데이터 자동 인덱싱</li>
                    <li>✅ <span className="font-bold">AI 분석</span>: 대규모 공공데이터에서 인사이트 도출</li>
                </ul>
            </div>
        </div>
    );
}
