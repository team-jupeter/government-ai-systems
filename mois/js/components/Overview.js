const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-700 to-orange-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">행정안전부 소개</h2>
                <p className="text-red-100 text-sm">
                    행정안전부(Ministry of the Interior and Safety)는 정부조직·전자정부·지방행정·재난안전을 관장합니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">지방자치단체</p>
                            <p className="text-2xl font-bold text-red-700">243개</p>
                            <p className="text-xs text-gray-500">시·도·시·군·구</p>
                        </div>
                        <span className="text-3xl">🏛️</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">행안부 예산</p>
                            <p className="text-2xl font-bold text-orange-700">75.8조원</p>
                            <p className="text-xs text-gray-500">2025년</p>
                        </div>
                        <span className="text-3xl">💰</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">경찰·소방</p>
                            <p className="text-2xl font-bold text-red-800">18만명</p>
                            <p className="text-xs text-gray-500">외청 인력</p>
                        </div>
                        <span className="text-3xl">👮</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화</p>
                            <p className="text-2xl font-bold text-orange-800">98.5%</p>
                            <p className="text-xs text-gray-500">DeepSeek R1</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-700">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🏢</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">정부조직·혁신</h4>
                                <p className="text-sm text-gray-600">
                                    정부조직·정원 관리, 정부혁신, 국무회의 서무, 
                                    법령·조약 공포, 정부청사 관리
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-700">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">💻</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">전자정부·디지털</h4>
                                <p className="text-sm text-gray-600">
                                    전자정부 구축·운영, 정보화 정책, 
                                    행정정보 공동이용, 공공데이터 개방
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-600">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🗺️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">지방행정·자치</h4>
                                <p className="text-sm text-gray-600">
                                    지방자치제도 운영, 지방행정 지원, 
                                    지방재정·세제, 낙후지역 지원
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-600">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🚨</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">재난·안전관리</h4>
                                <p className="text-sm text-gray-600">
                                    재난·안전정책 총괄, 비상대비, 
                                    민방위, 소방·안전관리, 재난대응
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
                            <span className="text-2xl mr-3">🏢</span>
                            <div>
                                <div className="font-semibold text-gray-900">정부조직 관리</div>
                                <div className="text-sm text-gray-600">AI 기반 조직·정원 자동 분석</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-red-700">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">💻</span>
                            <div>
                                <div className="font-semibold text-gray-900">전자정부 운영</div>
                                <div className="text-sm text-gray-600">정부24·민원24·AI 자동화</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-orange-700">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">🚨</span>
                            <div>
                                <div className="font-semibold text-gray-900">재난 모니터링</div>
                                <div className="text-sm text-gray-600">실시간 재난 감시·예측·대응</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-red-800">98%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">📊</span>
                            <div>
                                <div className="font-semibold text-gray-900">지방재정 분석</div>
                                <div className="text-sm text-gray-600">243개 지자체 재정 자동 분석</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-orange-800">97%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">지방자치단체 현황</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <div className="p-3 bg-red-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-red-700">17개</div>
                        <div className="text-sm text-gray-600">시·도</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-orange-700">75개</div>
                        <div className="text-sm text-gray-600">시</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-red-600">82개</div>
                        <div className="text-sm text-gray-600">군</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-orange-600">69개</div>
                        <div className="text-sm text-gray-600">자치구</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-red-800">243개</div>
                        <div className="text-sm text-gray-600">합계</div>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">🎯 행정비전</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>국민 중심 디지털정부</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>안전한 대한민국</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>자치분권·균형발전</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>혁신하는 정부</span>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">🌟 핵심가치</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>책임 - 국민 안전 최우선</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>혁신 - 디지털 행정혁신</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>협력 - 중앙·지방 협력</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>소통 - 열린 행정 구현</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-red-900 mb-1">OpenHash 블록체인 기반</h4>
                        <p className="text-sm text-red-800">
                            모든 정부조직·전자정부·지방재정·재난대응은 OpenHash 블록체인에 기록되어 
                            투명하게 관리되며, DeepSeek R1 AI가 243개 지자체 데이터를 실시간으로 분석하고 
                            최적의 행정서비스를 제공합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
