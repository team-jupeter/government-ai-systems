const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-700 to-emerald-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">농림축산식품부 소개</h2>
                <p className="text-green-100 text-sm">
                    농림축산식품부(Ministry of Agriculture, Food and Rural Affairs)는 농업·축산·식량·식품산업·농촌개발을 관장합니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">농가 수</p>
                            <p className="text-2xl font-bold text-green-700">100만호</p>
                            <p className="text-xs text-gray-500">전국</p>
                        </div>
                        <span className="text-3xl">🌾</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">농식품부 예산</p>
                            <p className="text-2xl font-bold text-emerald-700">20.5조원</p>
                            <p className="text-xs text-gray-500">2025년</p>
                        </div>
                        <span className="text-3xl">💰</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">경지면적</p>
                            <p className="text-2xl font-bold text-green-800">156만ha</p>
                            <p className="text-xs text-gray-500">논·밭</p>
                        </div>
                        <span className="text-3xl">🚜</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화</p>
                            <p className="text-2xl font-bold text-emerald-800">98.5%</p>
                            <p className="text-xs text-gray-500">DeepSeek R1</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-700">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🌾</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">농업 진흥</h4>
                                <p className="text-sm text-gray-600">
                                    농업직불금, 농업경영체 육성, 
                                    쌀·밭작물 생산, 스마트팜 보급
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-700">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🐄</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">축산 진흥</h4>
                                <p className="text-sm text-gray-600">
                                    축산농가 지원, 가축질병 방역, 
                                    한우·돼지·닭 육성, 축산물 안전관리
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🍚</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">식량·식품산업</h4>
                                <p className="text-sm text-gray-600">
                                    식량안보, 식품산업 육성, 
                                    농산물 품질관리, 식품안전
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-600">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🏡</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">농촌개발·유통</h4>
                                <p className="text-sm text-gray-600">
                                    농촌지역 개발, 귀농·귀촌 지원, 
                                    농산물 유통 개선, 농협 육성
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
                            <span className="text-2xl mr-3">💰</span>
                            <div>
                                <div className="font-semibold text-gray-900">농업직불금 지급</div>
                                <div className="text-sm text-gray-600">AI 기반 자격 심사·지급</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-green-700">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">🐄</span>
                            <div>
                                <div className="font-semibold text-gray-900">가축질병 관리</div>
                                <div className="text-sm text-gray-600">AI 실시간 질병 감시·예측</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-emerald-700">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">🌾</span>
                            <div>
                                <div className="font-semibold text-gray-900">농작물 재해보험</div>
                                <div className="text-sm text-gray-600">재해 피해 자동 산정·보상</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-green-800">98%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">📊</span>
                            <div>
                                <div className="font-semibold text-gray-900">농산물 가격 예측</div>
                                <div className="text-sm text-gray-600">AI 빅데이터 가격 분석</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-emerald-800">97%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">농업 현황</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-green-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-700">100만호</div>
                        <div className="text-sm text-gray-600">농가</div>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-emerald-700">50만호</div>
                        <div className="text-sm text-gray-600">축산농가</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">156만ha</div>
                        <div className="text-sm text-gray-600">경지면적</div>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-emerald-600">85조원</div>
                        <div className="text-sm text-gray-600">농업생산액</div>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">🎯 농정비전</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>지속가능한 농업 실현</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>농가소득 안정과 성장</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>안전한 먹거리 공급</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>활력있는 농촌 조성</span>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">🌟 핵심가치</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>안전 - 안전한 농축산물</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>혁신 - 스마트농업 확산</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>상생 - 농업인과 소비자</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>지속 - 환경친화 농업</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-700 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-green-900 mb-1">OpenHash 블록체인 기반</h4>
                        <p className="text-sm text-green-800">
                            모든 농업직불금·가축질병관리·재해보험은 OpenHash 블록체인에 기록되어 
                            투명하게 관리되며, DeepSeek R1 AI가 100만 농가 데이터를 실시간으로 분석하고 
                            최적의 농업정책을 제공합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
