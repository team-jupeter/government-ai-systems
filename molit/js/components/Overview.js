const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-slate-700 to-gray-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">국토교통부 소개</h2>
                <p className="text-slate-200 text-sm">
                    국토교통부(Ministry of Land, Infrastructure and Transport)는 국토·교통·주택을 총괄합니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">주택보급률</p>
                            <p className="text-2xl font-bold text-slate-700">104.2%</p>
                            <p className="text-xs text-gray-500">2024년</p>
                        </div>
                        <span className="text-3xl">🏠</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">고속도로</p>
                            <p className="text-2xl font-bold text-gray-800">4,850km</p>
                            <p className="text-xs text-gray-500">총 연장</p>
                        </div>
                        <span className="text-3xl">🛣️</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">철도</p>
                            <p className="text-2xl font-bold text-slate-600">4,180km</p>
                            <p className="text-xs text-gray-500">총 연장</p>
                        </div>
                        <span className="text-3xl">🚄</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화</p>
                            <p className="text-2xl font-bold text-gray-700">98.8%</p>
                            <p className="text-xs text-gray-500">DeepSeek R1</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-slate-700">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🗺️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">국토정책</h4>
                                <p className="text-sm text-gray-600">국토계획, 지역개발, 산업입지</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-800">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🏘️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">주택·도시</h4>
                                <p className="text-sm text-gray-600">주택공급, 도시재생, 건축</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-slate-600">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🚗</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">교통</h4>
                                <p className="text-sm text-gray-600">도로, 철도, 항공, 물류</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-700">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🏗️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">건설·안전</h4>
                                <p className="text-sm text-gray-600">건설산업, 안전관리, 기술기준</p>
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
                            <span className="text-2xl mr-3">🏠</span>
                            <div>
                                <div className="font-semibold text-gray-900">주택청약 심사</div>
                                <div className="text-sm text-gray-600">AI 자격심사·당첨자 자동선정</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-slate-700">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">🚗</span>
                            <div>
                                <div className="font-semibold text-gray-900">교통량 예측</div>
                                <div className="text-sm text-gray-600">AI 실시간 교통 분석·예측</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-gray-800">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">🚄</span>
                            <div>
                                <div className="font-semibold text-gray-900">철도 운행관리</div>
                                <div className="text-sm text-gray-600">AI 열차 스케줄 최적화</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-slate-600">98%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">🏗️</span>
                            <div>
                                <div className="font-semibold text-gray-900">건설인허가</div>
                                <div className="text-sm text-gray-600">AI 건축허가 자동심사</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-gray-700">97%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-slate-50 border-l-4 border-slate-700 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-1">OpenHash 블록체인 기반</h4>
                        <p className="text-sm text-slate-800">
                            모든 주택청약·건축허가·교통관리는 OpenHash 블록체인에 기록되어 
                            투명하게 관리되며, DeepSeek R1 AI가 국토·교통·주택 데이터를 실시간으로 분석하고 
                            최적의 정책을 제시합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
window.Overview = Overview;
