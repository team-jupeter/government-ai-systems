const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">국가보훈부 소개</h2>
                <p className="text-purple-100 text-sm">
                    국가보훈부(Ministry of Patriots and Veterans Affairs)는 국가유공자 예우·제대군인 지원·보훈선양을 관장합니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">국가유공자</p>
                            <p className="text-2xl font-bold text-purple-800">90만명</p>
                            <p className="text-xs text-gray-500">유족 포함</p>
                        </div>
                        <span className="text-3xl">🎖️</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">보훈예산</p>
                            <p className="text-2xl font-bold text-indigo-800">6.2조원</p>
                            <p className="text-xs text-gray-500">2025년</p>
                        </div>
                        <span className="text-3xl">💰</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">국립묘지</p>
                            <p className="text-2xl font-bold text-purple-700">9개소</p>
                            <p className="text-xs text-gray-500">안장 약 26만위</p>
                        </div>
                        <span className="text-3xl">🏛️</span>
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
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-800">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🎖️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">국가유공자 예우</h4>
                                <p className="text-sm text-gray-600">
                                    독립유공자, 참전유공자, 전몰·순직군경, 
                                    공상군경, 4·19혁명유공자, 5·18민주유공자 등 보상·예우
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-800">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">👨‍✈️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">제대군인 지원</h4>
                                <p className="text-sm text-gray-600">
                                    제대군인 취업지원, 직업훈련, 창업지원, 
                                    진로상담, 심리상담, 사회복귀 지원
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-700">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🏥</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">보훈의료·복지</h4>
                                <p className="text-sm text-gray-600">
                                    보훈병원 진료, 위탁병원 의료지원, 
                                    보상금 지급, 생활조정수당, 주택·대부지원
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-700">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">📚</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">보훈선양·교육</h4>
                                <p className="text-sm text-gray-600">
                                    국립묘지 관리, 현충시설 운영, 
                                    보훈문화 확산, 나라사랑 교육, 기념사업
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
                            <span className="text-2xl mr-3">🎖️</span>
                            <div>
                                <div className="font-semibold text-gray-900">보훈급여 심사</div>
                                <div className="text-sm text-gray-600">AI 기반 보상금·수당 자동 산정</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-purple-800">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">👨‍✈️</span>
                            <div>
                                <div className="font-semibold text-gray-900">제대군인 상담</div>
                                <div className="text-sm text-gray-600">취업·진로·심리 AI 상담</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-indigo-800">98%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">🏥</span>
                            <div>
                                <div className="font-semibold text-gray-900">의료지원 관리</div>
                                <div className="text-sm text-gray-600">보훈병원·위탁병원 진료 관리</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-purple-700">98%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">🏛️</span>
                            <div>
                                <div className="font-semibold text-gray-900">국립묘지 운영</div>
                                <div className="text-sm text-gray-600">안장 신청·관리 자동화</div>
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">국가유공자 현황</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-purple-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-800">32만명</div>
                        <div className="text-sm text-gray-600">참전유공자</div>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-indigo-800">25만명</div>
                        <div className="text-sm text-gray-600">전몰·순직</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-700">18만명</div>
                        <div className="text-sm text-gray-600">공상군경</div>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-indigo-700">15만명</div>
                        <div className="text-sm text-gray-600">기타유공자</div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">국립묘지 현황</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-800">
                        <h4 className="font-semibold text-gray-900">국립서울현충원</h4>
                        <p className="text-sm text-gray-600 mt-1">서울 동작구 소재</p>
                        <p className="text-xs text-gray-500 mt-1">안장: 약 16만위</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-800">
                        <h4 className="font-semibold text-gray-900">국립대전현충원</h4>
                        <p className="text-sm text-gray-600 mt-1">대전 유성구 소재</p>
                        <p className="text-xs text-gray-500 mt-1">안장: 약 7만위</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-700">
                        <h4 className="font-semibold text-gray-900">국립호국원 6개소</h4>
                        <p className="text-sm text-gray-600 mt-1">임실·영천·이천 등</p>
                        <p className="text-xs text-gray-500 mt-1">안장: 약 3만위</p>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-purple-700 to-purple-800 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">🎯 보훈비전</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>국가가 끝까지 책임지는 보훈</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>영웅을 존중하고 기억하는 사회</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>제대군인 성공적 사회복귀</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>보훈문화 확산과 국민통합</span>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-700 to-indigo-800 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">🌟 핵심가치</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>책임 - 희생과 공헌에 보답</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>존중 - 영웅에 대한 경의</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>기억 - 역사의 계승과 전승</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>통합 - 국민과 함께하는 보훈</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="bg-purple-50 border-l-4 border-purple-800 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-purple-900 mb-1">OpenHash 블록체인 기반</h4>
                        <p className="text-sm text-purple-800">
                            모든 보훈급여·의료지원·제대군인지원은 OpenHash 블록체인에 기록되어 
                            투명하게 관리되며, DeepSeek R1 AI가 90만명 국가유공자 데이터를 실시간으로 분석하고 
                            최적의 보훈서비스를 제공합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
