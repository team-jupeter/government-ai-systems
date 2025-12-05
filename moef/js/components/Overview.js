const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-600 to-amber-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">고용노동부 소개</h2>
                <p className="text-orange-100 text-sm">
                    고용노동부(Ministry of Employment and Labor)는 일자리 창출과 근로자 권익 보호를 담당합니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">고용보험 가입자</p>
                            <p className="text-2xl font-bold text-orange-600">1,480만명</p>
                            <p className="text-xs text-gray-500">전체 근로자</p>
                        </div>
                        <span className="text-3xl">👷</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">최저임금</p>
                            <p className="text-2xl font-bold text-amber-700">10,030원</p>
                            <p className="text-xs text-gray-500">2025년 (시급)</p>
                        </div>
                        <span className="text-3xl">💵</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">고용률</p>
                            <p className="text-2xl font-bold text-orange-700">63.5%</p>
                            <p className="text-xs text-gray-500">15-64세</p>
                        </div>
                        <span className="text-3xl">📊</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화</p>
                            <p className="text-2xl font-bold text-amber-800">98.6%</p>
                            <p className="text-xs text-gray-500">DeepSeek R1</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-600">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">💼</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">고용정책</h4>
                                <p className="text-sm text-gray-600">일자리 창출, 고용서비스, 직업훈련</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-700">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">⚖️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">노동정책</h4>
                                <p className="text-sm text-gray-600">근로기준, 노사관계, 최저임금</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🛡️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">고용보험</h4>
                                <p className="text-sm text-gray-600">실업급여, 육아휴직급여, 출산전후급여</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-600">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">⚠️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">산업안전</h4>
                                <p className="text-sm text-gray-600">산업재해 예방, 안전보건, 근로감독</p>
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
                            <span className="text-2xl mr-3">💵</span>
                            <div>
                                <div className="font-semibold text-gray-900">실업급여 심사</div>
                                <div className="text-sm text-gray-600">AI 구직활동 자동 인정</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-orange-600">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">👶</span>
                            <div>
                                <div className="font-semibold text-gray-900">육아휴직 급여 지급</div>
                                <div className="text-sm text-gray-600">AI 자격심사·급여 자동지급</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-amber-700">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">⚠️</span>
                            <div>
                                <div className="font-semibold text-gray-900">산재 심사·보상</div>
                                <div className="text-sm text-gray-600">AI 산재인정·보상금 자동산정</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-orange-700">98%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">🏢</span>
                            <div>
                                <div className="font-semibold text-gray-900">근로감독</div>
                                <div className="text-sm text-gray-600">AI 위법사업장 자동 탐지</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-amber-800">97%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-orange-900 mb-1">OpenHash 블록체인 기반</h4>
                        <p className="text-sm text-orange-800">
                            모든 실업급여·육아휴직급여·산재보상은 OpenHash 블록체인에 기록되어 
                            투명하게 관리되며, DeepSeek R1 AI가 1,480만 고용보험 가입자의 데이터를 실시간으로 분석하고 
                            최적의 고용서비스를 제공합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
window.Overview = Overview;
