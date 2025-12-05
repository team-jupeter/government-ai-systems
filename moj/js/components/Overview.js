const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">법무부 소개</h2>
                <p className="text-blue-100 text-sm">
                    법무부(Ministry of Justice)는 검찰·행형·인권옹호·출입국관리 등 법무에 관한 사무를 관장합니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">교정시설 수용</p>
                            <p className="text-2xl font-bold text-blue-800">4만명</p>
                            <p className="text-xs text-gray-500">교도소·구치소</p>
                        </div>
                        <span className="text-3xl">🏢</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">법무예산</p>
                            <p className="text-2xl font-bold text-indigo-800">9.2조원</p>
                            <p className="text-xs text-gray-500">2025년</p>
                        </div>
                        <span className="text-3xl">💰</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">출입국 심사</p>
                            <p className="text-2xl font-bold text-blue-700">5.8억건</p>
                            <p className="text-xs text-gray-500">연간 출입국</p>
                        </div>
                        <span className="text-3xl">✈️</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화</p>
                            <p className="text-2xl font-bold text-indigo-700">97.8%</p>
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
                            <span className="text-2xl mr-3">⚖️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">검찰·형사사법</h4>
                                <p className="text-sm text-gray-600">
                                    검찰 조직 관리, 형사사건 지휘·감독, 
                                    범죄피해자 구조, 국제형사사법 협력
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-800">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🏛️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">행형·교정</h4>
                                <p className="text-sm text-gray-600">
                                    교도소·구치소 운영, 수형자 처우·교화, 
                                    소년원 관리, 보호관찰·전자감독
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-700">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🌍</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">출입국·외국인정책</h4>
                                <p className="text-sm text-gray-600">
                                    출입국 심사·관리, 비자 발급, 난민 심사, 
                                    외국인 체류·귀화, 불법체류자 단속
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-700">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">👥</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">인권옹호·법률지원</h4>
                                <p className="text-sm text-gray-600">
                                    인권침해 조사·구제, 국선변호인 운영, 
                                    법률구조, 범죄피해자 지원
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
                            <span className="text-2xl mr-3">🔍</span>
                            <div>
                                <div className="font-semibold text-gray-900">범죄 수사 분석</div>
                                <div className="text-sm text-gray-600">AI 기반 범죄 패턴·증거 분석</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-blue-800">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">✈️</span>
                            <div>
                                <div className="font-semibold text-gray-900">출입국 심사</div>
                                <div className="text-sm text-gray-600">자동출입국 게이트·AI 심사</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-indigo-800">98%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">👮</span>
                            <div>
                                <div className="font-semibold text-gray-900">보호관찰 관리</div>
                                <div className="text-sm text-gray-600">전자감독·AI 위험도 평가</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-blue-700">97%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">📄</span>
                            <div>
                                <div className="font-semibold text-gray-900">법률 검토</div>
                                <div className="text-sm text-gray-600">법령·판례 자동 분석</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-purple-700">96%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">법무부 시설 현황</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-blue-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-800">54개</div>
                        <div className="text-sm text-gray-600">교도소·구치소</div>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-indigo-800">10개</div>
                        <div className="text-sm text-gray-600">소년원</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-800">60개</div>
                        <div className="text-sm text-gray-600">보호관찰소</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-700">76개</div>
                        <div className="text-sm text-gray-600">출입국사무소</div>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">⚖️ 법무비전</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>공정한 법집행</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>인권 보호·증진</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>범죄로부터 안전한 사회</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>법치주의 확립</span>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-800 to-indigo-900 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">🌟 핵심가치</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>정의 - 공정한 법 집행</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>인권 - 인간 존엄 존중</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>전문성 - 법률 전문역량</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>투명성 - 열린 법무행정</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-700 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-blue-900 mb-1">OpenHash 블록체인 기반</h4>
                        <p className="text-sm text-blue-800">
                            모든 범죄수사·교정처우·출입국심사는 OpenHash 블록체인에 기록되어 
                            투명하게 관리되며, DeepSeek R1 AI가 범죄 패턴을 실시간으로 분석하고 
                            재범을 방지합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
