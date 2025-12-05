const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-800 to-green-900 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">국방부 소개</h2>
                <p className="text-green-100 text-sm">
                    국방부(Ministry of National Defense)는 국방정책 수립, 군령·군정 통합 관장, 국가안보 수호를 담당합니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">현역 병력</p>
                            <p className="text-2xl font-bold text-green-700">50만명</p>
                            <p className="text-xs text-gray-500">육·해·공군</p>
                        </div>
                        <span className="text-3xl">🪖</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">국방예산</p>
                            <p className="text-2xl font-bold text-green-800">59.6조원</p>
                            <p className="text-xs text-gray-500">2025년</p>
                        </div>
                        <span className="text-3xl">💰</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">예비군</p>
                            <p className="text-2xl font-bold text-lime-700">275만명</p>
                            <p className="text-xs text-gray-500">동원 가능</p>
                        </div>
                        <span className="text-3xl">🎖️</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화</p>
                            <p className="text-2xl font-bold text-emerald-700">98.2%</p>
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
                            <span className="text-2xl mr-3">🛡️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">국방정책 수립·시행</h4>
                                <p className="text-sm text-gray-600">
                                    국방정책 기획, 군사전략 수립, 국방개혁 추진, 
                                    군사력 건설, 방위력 개선, 국방중기계획
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-800">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">⚔️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">군령·군정 통합 관장</h4>
                                <p className="text-sm text-gray-600">
                                    합동참모본부 군령권, 육·해·공군 군정권 통합, 
                                    작전지휘, 부대편성, 교육훈련
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-lime-50 rounded-lg border-l-4 border-lime-700">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🤝</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">국방외교·국제협력</h4>
                                <p className="text-sm text-gray-600">
                                    한미동맹, 국방외교, 국제평화유지활동(PKO), 
                                    군사교류협력, 방산수출
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-700">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">👨‍✈️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">병영문화·복지</h4>
                                <p className="text-sm text-gray-600">
                                    병영문화 개선, 장병 복지, 군 인권, 
                                    병사 급여, 의무복무 제도 개선
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
                            <span className="text-2xl mr-3">🎯</span>
                            <div>
                                <div className="font-semibold text-gray-900">군사작전 시뮬레이션</div>
                                <div className="text-sm text-gray-600">AI 기반 전투 시나리오 분석</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-green-700">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">📡</span>
                            <div>
                                <div className="font-semibold text-gray-900">안보위협 탐지</div>
                                <div className="text-sm text-gray-600">실시간 위협 모니터링·분석</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-green-800">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">📋</span>
                            <div>
                                <div className="font-semibold text-gray-900">병력 관리</div>
                                <div className="text-sm text-gray-600">입·전역, 배치, 훈련 자동화</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-lime-700">98%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">🛠️</span>
                            <div>
                                <div className="font-semibold text-gray-900">군수·조달 관리</div>
                                <div className="text-sm text-gray-600">무기·장비 조달·유지 자동화</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-emerald-700">97%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">3군 구성</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                        <div className="text-4xl mb-2">🪖</div>
                        <div className="text-xl font-bold text-green-800">육군</div>
                        <div className="text-sm text-gray-600 mt-1">약 37만명</div>
                        <div className="text-xs text-gray-500 mt-1">지상 작전</div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                        <div className="text-4xl mb-2">⚓</div>
                        <div className="text-xl font-bold text-blue-800">해군·해병대</div>
                        <div className="text-sm text-gray-600 mt-1">약 7만명</div>
                        <div className="text-xs text-gray-500 mt-1">해상 작전</div>
                    </div>
                    <div className="p-4 bg-sky-50 rounded-lg text-center">
                        <div className="text-4xl mb-2">✈️</div>
                        <div className="text-xl font-bold text-sky-800">공군</div>
                        <div className="text-sm text-gray-600 mt-1">약 6만명</div>
                        <div className="text-xs text-gray-500 mt-1">항공 작전</div>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-green-700 to-green-800 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">🎯 국방목표</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>외부 군사위협 억제·격퇴</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>한반도 평화 정착</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>국가이익 수호</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>세계 평화 기여</span>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-gradient-to-r from-green-800 to-green-900 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">🌟 핵심가치</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>책임 - 국가안보 책임감</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>전문성 - 군사전문역량</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>헌신 - 국민을 위한 봉사</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>정의 - 정의롭고 강한 군대</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-green-900 mb-1">OpenHash 블록체인 기반</h4>
                        <p className="text-sm text-green-800">
                            모든 군사작전·병력관리·무기조달은 OpenHash 블록체인에 기록되어 
                            투명하게 관리되며, DeepSeek R1 AI가 안보위협을 실시간으로 분석하고 
                            최적의 작전계획을 수립합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
