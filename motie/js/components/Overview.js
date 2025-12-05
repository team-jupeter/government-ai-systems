const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-800 to-indigo-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">산업통상자원부 소개</h2>
                <p className="text-blue-100 text-sm">
                    산업통상자원부(Ministry of Trade, Industry and Energy)는 산업·통상·무역·에너지·자원을 관장합니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">수출액</p>
                            <p className="text-2xl font-bold text-blue-800">6,835억$</p>
                            <p className="text-xs text-gray-500">2024년</p>
                        </div>
                        <span className="text-3xl">🚢</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">산업부 예산</p>
                            <p className="text-2xl font-bold text-indigo-800">28.5조원</p>
                            <p className="text-xs text-gray-500">2025년</p>
                        </div>
                        <span className="text-3xl">💰</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">FTA 체결</p>
                            <p className="text-2xl font-bold text-blue-700">58개국</p>
                            <p className="text-xs text-gray-500">발효 중</p>
                        </div>
                        <span className="text-3xl">🌐</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화</p>
                            <p className="text-2xl font-bold text-indigo-700">98.8%</p>
                            <p className="text-xs text-gray-500">DeepSeek R1</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-800">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🏭</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">산업정책</h4>
                                <p className="text-sm text-gray-600">
                                    제조업 혁신, 신산업 육성, 
                                    산업기술 R&D, 스마트공장 보급
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-800">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🚢</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">무역·투자</h4>
                                <p className="text-sm text-gray-600">
                                    수출진흥, 무역금융, 
                                    외국인투자 유치, 해외시장 개척
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-700">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🌐</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">통상교섭</h4>
                                <p className="text-sm text-gray-600">
                                    FTA 협상·이행, 통상분쟁, 
                                    WTO 대응, 글로벌 통상질서
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-700">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">⚡</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">에너지·자원</h4>
                                <p className="text-sm text-gray-600">
                                    전력수급, 에너지효율, 
                                    신재생에너지, 자원개발
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">AI 자동화 현황</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">📊</span>
                            <div>
                                <div className="font-semibold text-gray-900">수출입 통관 자동화</div>
                                <div className="text-sm text-gray-600">AI 기반 자동 통관·검사</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-blue-800">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">🌐</span>
                            <div>
                                <div className="font-semibold text-gray-900">FTA 원산지 검증</div>
                                <div className="text-sm text-gray-600">AI 원산지 증명·검증</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-indigo-800">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">⚡</span>
                            <div>
                                <div className="font-semibold text-gray-900">전력수급 예측</div>
                                <div className="text-sm text-gray-600">AI 실시간 수급 분석</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-blue-700">98%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">🏭</span>
                            <div>
                                <div className="font-semibold text-gray-900">산업기술 R&D 심사</div>
                                <div className="text-sm text-gray-600">AI 과제 평가·선정</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-indigo-700">97%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">무역·산업 현황</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-blue-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-800">6,835억$</div>
                        <div className="text-sm text-gray-600">수출액</div>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-indigo-800">5,895억$</div>
                        <div className="text-sm text-gray-600">수입액</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-700">58개국</div>
                        <div className="text-sm text-gray-600">FTA</div>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-indigo-700">280억$</div>
                        <div className="text-sm text-gray-600">외국인투자</div>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">🎯 정책목표</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>수출 7천억불 달성</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>첨단산업 글로벌 경쟁력 확보</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>에너지 안정 공급체계 구축</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>통상강국 위상 강화</span>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-700 to-indigo-800 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">🌟 핵심가치</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>혁신 - 4차 산업혁명 선도</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>개방 - 자유무역 확대</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>안전 - 에너지 안보 확립</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>상생 - 대·중소기업 동반성장</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-800 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-blue-900 mb-1">OpenHash 블록체인 기반</h4>
                        <p className="text-sm text-blue-800">
                            모든 수출입통관·FTA원산지·전력거래는 OpenHash 블록체인에 기록되어 
                            투명하게 관리되며, DeepSeek R1 AI가 글로벌 무역데이터를 실시간으로 분석하고 
                            최적의 통상전략을 제공합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
