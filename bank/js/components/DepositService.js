const DepositService = () => {
    const [expandedSection, setExpandedSection] = React.useState(null);

    return (
        <div className="space-y-6 animate-slideDown">
            {/* 예금 개요 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <i className="fas fa-piggy-bank text-green-600 text-3xl"></i>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">예금 서비스</h1>
                        <p className="text-gray-600">재무제표 연동 실시간 예금 관리</p>
                    </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <i className="fas fa-info-circle text-blue-600"></i>
                        예금 계정 구조
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        예금 잔액은 <strong className="text-bank-blue">재무제표의 디지털 화폐 항목</strong>과 동일합니다. 
                        모든 입출금 거래는 재무제표를 실시간으로 갱신하며, 
                        거래 내역과 잔액 변동이 <strong className="text-green-600">오픈해시 4계층 구조</strong>에 불변 기록됩니다.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 mb-1">0.015ms</div>
                        <div className="text-sm text-gray-600">거래 처리</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 mb-1">실시간</div>
                        <div className="text-sm text-gray-600">재무제표 갱신</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 mb-1">100%</div>
                        <div className="text-sm text-gray-600">오픈해시 기록</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600 mb-1">무료</div>
                        <div className="text-sm text-gray-600">수수료</div>
                    </div>
                </div>
            </div>

            {/* 거래 흐름도 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">예금 거래 처리 흐름</h2>
                <div className="grid md:grid-cols-5 gap-3">
                    <div className="text-center p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
                        <div className="text-3xl mb-2">📱</div>
                        <div className="font-bold text-sm mb-1">1. 거래 요청</div>
                        <div className="text-xs text-gray-600">입금/출금 요청</div>
                    </div>
                    <div className="flex items-center justify-center">
                        <i className="fas fa-arrow-right text-gray-400 text-2xl"></i>
                    </div>
                    <div className="text-center p-4 border-2 border-green-200 rounded-lg bg-green-50">
                        <div className="text-3xl mb-2">📊</div>
                        <div className="font-bold text-sm mb-1">2. 재무제표 갱신</div>
                        <div className="text-xs text-gray-600">디지털화폐 증감</div>
                    </div>
                    <div className="flex items-center justify-center">
                        <i className="fas fa-arrow-right text-gray-400 text-2xl"></i>
                    </div>
                    <div className="text-center p-4 border-2 border-purple-200 rounded-lg bg-purple-50">
                        <div className="text-3xl mb-2">🔗</div>
                        <div className="font-bold text-sm mb-1">3. 오픈해시 기록</div>
                        <div className="text-xs text-gray-600">4계층 저장</div>
                    </div>
                </div>
                <div className="mt-4 text-center text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    <i className="fas fa-clock text-blue-600 mr-2"></i>
                    전체 프로세스 소요 시간: <strong className="text-bank-blue">0.015ms</strong>
                </div>
            </div>

            {/* 오픈해시 4계층 기록 구조 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                    <i className="fas fa-layer-group text-purple-600"></i>
                    오픈해시 4계층 기록 메커니즘
                </h2>
                
                <div className="mb-6">
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                        모든 예금 거래는 <strong>확률적 계층 선택(Probabilistic Layer Selection)</strong> 알고리즘을 통해 
                        4개의 독립적인 계층에 분산 저장됩니다. 이는 블록체인 대비 <strong className="text-green-600">98.5%의 에너지를 절감</strong>하면서도 
                        수학적으로 <strong className="text-purple-600">위변조가 불가능</strong>한 구조입니다.
                    </p>
                </div>

                {/* 4계층 시각화 */}
                <div className="space-y-4">
                    {/* Layer 4 */}
                    <div 
                        className="border-2 border-purple-300 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setExpandedSection(expandedSection === 'layer4' ? null : 'layer4')}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                                    L4
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">최종 검증층 (Layer 4)</h3>
                                    <p className="text-sm text-gray-600">글로벌 합의 및 최종 불변성 보장</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="text-sm text-gray-500">선택 확률</div>
                                    <div className="text-lg font-bold text-purple-600">6.25%</div>
                                </div>
                                <i className={`fas fa-chevron-${expandedSection === 'layer4' ? 'up' : 'down'} text-purple-600`}></i>
                            </div>
                        </div>
                        {expandedSection === 'layer4' && (
                            <div className="mt-4 pt-4 border-t border-purple-200 grid md:grid-cols-3 gap-3">
                                <div className="bg-purple-50 p-3 rounded">
                                    <div className="text-xs text-gray-600 mb-1">저장 주기</div>
                                    <div className="font-bold">매 16번째 거래</div>
                                </div>
                                <div className="bg-purple-50 p-3 rounded">
                                    <div className="text-xs text-gray-600 mb-1">검증 방식</div>
                                    <div className="font-bold">글로벌 합의</div>
                                </div>
                                <div className="bg-purple-50 p-3 rounded">
                                    <div className="text-xs text-gray-600 mb-1">보안 수준</div>
                                    <div className="font-bold text-green-600">최고</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Layer 3 */}
                    <div 
                        className="border-2 border-blue-300 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setExpandedSection(expandedSection === 'layer3' ? null : 'layer3')}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                    L3
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">블록 해시층 (Layer 3)</h3>
                                    <p className="text-sm text-gray-600">거래 묶음의 해시 체인 생성</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="text-sm text-gray-500">선택 확률</div>
                                    <div className="text-lg font-bold text-blue-600">12.5%</div>
                                </div>
                                <i className={`fas fa-chevron-${expandedSection === 'layer3' ? 'up' : 'down'} text-blue-600`}></i>
                            </div>
                        </div>
                        {expandedSection === 'layer3' && (
                            <div className="mt-4 pt-4 border-t border-blue-200 grid md:grid-cols-3 gap-3">
                                <div className="bg-blue-50 p-3 rounded">
                                    <div className="text-xs text-gray-600 mb-1">저장 주기</div>
                                    <div className="font-bold">매 8번째 거래</div>
                                </div>
                                <div className="bg-blue-50 p-3 rounded">
                                    <div className="text-xs text-gray-600 mb-1">검증 방식</div>
                                    <div className="font-bold">해시 체인</div>
                                </div>
                                <div className="bg-blue-50 p-3 rounded">
                                    <div className="text-xs text-gray-600 mb-1">보안 수준</div>
                                    <div className="font-bold text-green-600">높음</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Layer 2 */}
                    <div 
                        className="border-2 border-green-300 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setExpandedSection(expandedSection === 'layer2' ? null : 'layer2')}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                                    L2
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">거래 묶음층 (Layer 2)</h3>
                                    <p className="text-sm text-gray-600">확률적 선택으로 거래 그룹화</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="text-sm text-gray-500">선택 확률</div>
                                    <div className="text-lg font-bold text-green-600">25%</div>
                                </div>
                                <i className={`fas fa-chevron-${expandedSection === 'layer2' ? 'up' : 'down'} text-green-600`}></i>
                            </div>
                        </div>
                        {expandedSection === 'layer2' && (
                            <div className="mt-4 pt-4 border-t border-green-200 grid md:grid-cols-3 gap-3">
                                <div className="bg-green-50 p-3 rounded">
                                    <div className="text-xs text-gray-600 mb-1">저장 주기</div>
                                    <div className="font-bold">매 4번째 거래</div>
                                </div>
                                <div className="bg-green-50 p-3 rounded">
                                    <div className="text-xs text-gray-600 mb-1">검증 방식</div>
                                    <div className="font-bold">그룹 검증</div>
                                </div>
                                <div className="bg-green-50 p-3 rounded">
                                    <div className="text-xs text-gray-600 mb-1">보안 수준</div>
                                    <div className="font-bold text-green-600">중상</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Layer 1 */}
                    <div 
                        className="border-2 border-orange-300 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setExpandedSection(expandedSection === 'layer1' ? null : 'layer1')}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                                    L1
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">개별 거래층 (Layer 1)</h3>
                                    <p className="text-sm text-gray-600">모든 거래의 상세 내역 기록</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="text-sm text-gray-500">선택 확률</div>
                                    <div className="text-lg font-bold text-orange-600">100%</div>
                                </div>
                                <i className={`fas fa-chevron-${expandedSection === 'layer1' ? 'up' : 'down'} text-orange-600`}></i>
                            </div>
                        </div>
                        {expandedSection === 'layer1' && (
                            <div className="mt-4 pt-4 border-t border-orange-200 grid md:grid-cols-3 gap-3">
                                <div className="bg-orange-50 p-3 rounded">
                                    <div className="text-xs text-gray-600 mb-1">저장 주기</div>
                                    <div className="font-bold">모든 거래</div>
                                </div>
                                <div className="bg-orange-50 p-3 rounded">
                                    <div className="text-xs text-gray-600 mb-1">검증 방식</div>
                                    <div className="font-bold">즉시 검증</div>
                                </div>
                                <div className="bg-orange-50 p-3 rounded">
                                    <div className="text-xs text-gray-600 mb-1">보안 수준</div>
                                    <div className="font-bold text-green-600">기본</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 4계층 효과 */}
                <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <i className="fas fa-check-circle text-green-600"></i>
                        4계층 구조의 장점
                    </h3>
                    <div className="grid md:grid-cols-3 gap-3">
                        <div className="bg-white p-3 rounded border border-green-200">
                            <div className="flex items-center gap-2 mb-2">
                                <i className="fas fa-leaf text-green-600"></i>
                                <div className="font-bold text-sm">에너지 효율</div>
                            </div>
                            <div className="text-xs text-gray-600">블록체인 대비 98.5% 절감</div>
                        </div>
                        <div className="bg-white p-3 rounded border border-blue-200">
                            <div className="flex items-center gap-2 mb-2">
                                <i className="fas fa-shield-alt text-blue-600"></i>
                                <div className="font-bold text-sm">보안성</div>
                            </div>
                            <div className="text-xs text-gray-600">수학적 위변조 불가능</div>
                        </div>
                        <div className="bg-white p-3 rounded border border-purple-200">
                            <div className="flex items-center gap-2 mb-2">
                                <i className="fas fa-bolt text-purple-600"></i>
                                <div className="font-bold text-sm">처리 속도</div>
                            </div>
                            <div className="text-xs text-gray-600">0.015ms 초고속</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 재무제표 연동 설명 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                    <i className="fas fa-file-invoice-dollar text-blue-600"></i>
                    재무제표 실시간 연동
                </h2>
                
                <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <h3 className="font-bold mb-2 text-gray-900">예금 = 재무제표 디지털 화폐 항목</h3>
                        <p className="text-sm text-gray-700 leading-relaxed mb-3">
                            귀하의 예금 잔액은 개인 재무제표의 <strong className="text-bank-blue">"디지털 화폐"</strong> 항목에 표시됩니다. 
                            입금 시 자산이 증가하고, 출금 시 자산이 감소하며, 
                            대차균형 공식(<code className="bg-white px-2 py-1 rounded text-xs">총자산 = 총부채 + 총자본</code>)이 실시간으로 자동 검증됩니다.
                        </p>
                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="bg-white p-3 rounded border border-blue-200">
                                <div className="text-xs text-gray-500 mb-1">입금 시</div>
                                <div className="text-sm font-mono text-green-600">자산(디지털화폐) ↑ +금액</div>
                            </div>
                            <div className="bg-white p-3 rounded border border-blue-200">
                                <div className="text-xs text-gray-500 mb-1">출금 시</div>
                                <div className="text-sm font-mono text-red-600">자산(디지털화폐) ↓ -금액</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <i className="fas fa-sync text-green-600"></i>
                                <h4 className="font-bold text-sm">실시간 갱신</h4>
                            </div>
                            <p className="text-xs text-gray-600">거래 즉시 재무제표 자동 업데이트 (0.015ms)</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <i className="fas fa-balance-scale text-blue-600"></i>
                                <h4 className="font-bold text-sm">대차균형 검증</h4>
                            </div>
                            <p className="text-xs text-gray-600">AI가 회계 공식 일치 여부를 자동 확인</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <i className="fas fa-ban text-red-600"></i>
                                <h4 className="font-bold text-sm">분식 불가능</h4>
                            </div>
                            <p className="text-xs text-gray-600">오픈해시 기록으로 조작 원천 차단</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 예금 서비스 특징 */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200 p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">예금 서비스 특징</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                        <h3 className="font-bold mb-2 flex items-center gap-2">
                            <i className="fas fa-gift text-green-600"></i>
                            수수료 무료
                        </h3>
                        <p className="text-sm text-gray-600">입금, 출금, 조회 모든 서비스 완전 무료</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <h3 className="font-bold mb-2 flex items-center gap-2">
                            <i className="fas fa-bolt text-blue-600"></i>
                            실시간 처리
                        </h3>
                        <p className="text-sm text-gray-600">0.015ms 초고속 거래 처리</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <h3 className="font-bold mb-2 flex items-center gap-2">
                            <i className="fas fa-clock text-purple-600"></i>
                            24시간 서비스
                        </h3>
                        <p className="text-sm text-gray-600">연중무휴 실시간 입출금</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <h3 className="font-bold mb-2 flex items-center gap-2">
                            <i className="fas fa-shield-alt text-orange-600"></i>
                            완벽한 보안
                        </h3>
                        <p className="text-sm text-gray-600">PDV 암호화 + 오픈해시 기록</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
