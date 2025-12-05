const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-cyan-700 to-teal-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">보건복지부 소개</h2>
                <p className="text-cyan-100 text-sm">
                    보건복지부(Ministry of Health and Welfare)는 국민 건강과 복지 증진을 위한 정책을 관장합니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">건강보험 가입자</p>
                            <p className="text-2xl font-bold text-cyan-700">5,180만명</p>
                            <p className="text-xs text-gray-500">국민 99.8%</p>
                        </div>
                        <span className="text-3xl">🏥</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">복지부 예산</p>
                            <p className="text-2xl font-bold text-teal-700">96.5조원</p>
                            <p className="text-xs text-gray-500">2025년</p>
                        </div>
                        <span className="text-3xl">💰</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">기초생활수급자</p>
                            <p className="text-2xl font-bold text-cyan-800">280만명</p>
                            <p className="text-xs text-gray-500">기초보장</p>
                        </div>
                        <span className="text-3xl">🤝</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화</p>
                            <p className="text-2xl font-bold text-teal-800">98.9%</p>
                            <p className="text-xs text-gray-500">DeepSeek R1</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-700">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🏥</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">보건의료</h4>
                                <p className="text-sm text-gray-600">
                                    건강보험·의료급여, 공공의료, 
                                    질병예방·관리, 응급의료
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-700">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🤝</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">사회보장</h4>
                                <p className="text-sm text-gray-600">
                                    기초생활보장, 국민연금, 
                                    사회서비스, 자활지원
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-600">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">👶</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">인구·아동</h4>
                                <p className="text-sm text-gray-600">
                                    저출산 대응, 아동복지, 
                                    보육정책, 입양·가정위탁
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-600">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">👴</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">노인·장애인</h4>
                                <p className="text-sm text-gray-600">
                                    노인복지, 장애인복지, 
                                    요양서비스, 활동지원
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
                            <span className="text-2xl mr-3">💊</span>
                            <div>
                                <div className="font-semibold text-gray-900">건강보험 심사</div>
                                <div className="text-sm text-gray-600">AI 기반 진료비 자동 심사</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-cyan-700">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">🤝</span>
                            <div>
                                <div className="font-semibold text-gray-900">기초수급 심사</div>
                                <div className="text-sm text-gray-600">AI 소득·재산 자동 조사</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-teal-700">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">💰</span>
                            <div>
                                <div className="font-semibold text-gray-900">복지급여 지급</div>
                                <div className="text-sm text-gray-600">AI 자격 심사·급여 지급</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-cyan-800">98%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">🏥</span>
                            <div>
                                <div className="font-semibold text-gray-900">감염병 감시</div>
                                <div className="text-sm text-gray-600">AI 실시간 감염병 모니터링</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-teal-800">97%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">보건복지 현황</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-cyan-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-cyan-700">5,180만</div>
                        <div className="text-sm text-gray-600">건보가입자</div>
                    </div>
                    <div className="p-3 bg-teal-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-teal-700">280만명</div>
                        <div className="text-sm text-gray-600">기초수급자</div>
                    </div>
                    <div className="p-3 bg-cyan-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-cyan-600">920만명</div>
                        <div className="text-sm text-gray-600">노인인구</div>
                    </div>
                    <div className="p-3 bg-teal-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-teal-600">270만명</div>
                        <div className="text-sm text-gray-600">장애인</div>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">🎯 정책목표</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>건강한 삶 보장</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>든든한 사회안전망 구축</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>저출산·고령사회 대응</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>포용적 복지국가 실현</span>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">🌟 핵심가치</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>생명 - 국민 건강 최우선</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>평등 - 보편적 복지 실현</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>연대 - 더불어 사는 사회</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>안전 - 촘촘한 안전망</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="bg-cyan-50 border-l-4 border-cyan-700 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-cyan-900 mb-1">OpenHash 블록체인 기반</h4>
                        <p className="text-sm text-cyan-800">
                            모든 건강보험심사·기초수급자선정·복지급여는 OpenHash 블록체인에 기록되어 
                            투명하게 관리되며, DeepSeek R1 AI가 5,180만 국민의 보건복지 데이터를 실시간으로 분석하고 
                            맞춤형 복지서비스를 제공합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
