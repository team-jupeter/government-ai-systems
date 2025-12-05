const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-700 to-lime-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">기후에너지환경부 소개</h2>
                <p className="text-green-100 text-sm">
                    기후에너지환경부(Ministry of Environment)는 기후위기 대응과 탄소중립을 총괄합니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">온실가스 감축목표</p>
                            <p className="text-2xl font-bold text-green-700">40%</p>
                            <p className="text-xs text-gray-500">2030년 (2018년 대비)</p>
                        </div>
                        <span className="text-3xl">🌍</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">재생에너지 비중</p>
                            <p className="text-2xl font-bold text-lime-700">21.6%</p>
                            <p className="text-xs text-gray-500">2030년 목표</p>
                        </div>
                        <span className="text-3xl">⚡</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">탄소중립</p>
                            <p className="text-2xl font-bold text-green-800">2050년</p>
                            <p className="text-xs text-gray-500">Net-Zero</p>
                        </div>
                        <span className="text-3xl">🌱</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화</p>
                            <p className="text-2xl font-bold text-lime-800">98.7%</p>
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
                            <span className="text-2xl mr-3">🌍</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">기후위기 대응</h4>
                                <p className="text-sm text-gray-600">온실가스 감축, 탄소중립, 기후변화 적응</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-lime-50 rounded-lg border-l-4 border-lime-700">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">⚡</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">에너지 전환</h4>
                                <p className="text-sm text-gray-600">재생에너지 확대, 수소경제, 원전 안전</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🌿</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">환경보전</h4>
                                <p className="text-sm text-gray-600">대기질 개선, 물관리, 자연생태계 보호</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-lime-50 rounded-lg border-l-4 border-lime-600">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">♻️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">순환경제</h4>
                                <p className="text-sm text-gray-600">폐기물 감축, 자원순환, 화학물질 안전</p>
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
                            <span className="text-2xl mr-3">🌡️</span>
                            <div>
                                <div className="font-semibold text-gray-900">온실가스 배출 모니터링</div>
                                <div className="text-sm text-gray-600">AI 실시간 배출량 측정·분석</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-green-700">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">⚡</span>
                            <div>
                                <div className="font-semibold text-gray-900">재생에너지 발전 예측</div>
                                <div className="text-sm text-gray-600">AI 기반 태양광·풍력 발전량 예측</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-lime-700">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">💨</span>
                            <div>
                                <div className="font-semibold text-gray-900">대기질 예보</div>
                                <div className="text-sm text-gray-600">AI 미세먼지·오존 예측</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-green-800">98%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">💧</span>
                            <div>
                                <div className="font-semibold text-gray-900">수질 관리</div>
                                <div className="text-sm text-gray-600">AI 실시간 수질 모니터링</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-lime-800">97%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">🎯 2030 NDC</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>온실가스 40% 감축 (2018년 대비)</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>재생에너지 21.6% 달성</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>전기차 450만대 보급</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>수소경제 활성화</span>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-gradient-to-r from-lime-600 to-lime-700 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">🌟 2050 탄소중립</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Net-Zero 달성</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>재생에너지 70% 이상</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>탄소흡수원 확충</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>녹색산업 육성</span>
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
                            모든 온실가스배출·재생에너지발전·환경오염측정은 OpenHash 블록체인에 기록되어 
                            투명하게 관리되며, DeepSeek R1 AI가 기후·에너지·환경 데이터를 실시간으로 분석하고 
                            최적의 탄소중립 정책을 제시합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
window.Overview = Overview;
