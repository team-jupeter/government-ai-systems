const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-pink-700 to-rose-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">문화체육관광부 소개</h2>
                <p className="text-pink-100 text-sm">
                    문화체육관광부(Ministry of Culture, Sports and Tourism)는 문화·예술·체육·관광·국정홍보를 관장합니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">문화예술 단체</p>
                            <p className="text-2xl font-bold text-pink-700">15,000개</p>
                            <p className="text-xs text-gray-500">전국</p>
                        </div>
                        <span className="text-3xl">🎭</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">문체부 예산</p>
                            <p className="text-2xl font-bold text-rose-700">8.5조원</p>
                            <p className="text-xs text-gray-500">2025년</p>
                        </div>
                        <span className="text-3xl">💰</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">관광객</p>
                            <p className="text-2xl font-bold text-pink-800">2,500만명</p>
                            <p className="text-xs text-gray-500">연간 외래관광</p>
                        </div>
                        <span className="text-3xl">✈️</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화</p>
                            <p className="text-2xl font-bold text-rose-800">98.2%</p>
                            <p className="text-xs text-gray-500">DeepSeek R1</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-700">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🎨</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">문화예술 진흥</h4>
                                <p className="text-sm text-gray-600">
                                    문화예술 지원, 박물관·도서관·공연장 운영, 
                                    예술인 지원, 문화콘텐츠 육성
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-700">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">⚽</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">체육 진흥</h4>
                                <p className="text-sm text-gray-600">
                                    생활체육·엘리트체육 육성, 체육시설 지원, 
                                    국제경기 개최, 체육인 지원
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-600">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🗺️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">관광 진흥</h4>
                                <p className="text-sm text-gray-600">
                                    관광산업 육성, 관광자원 개발, 
                                    외래관광객 유치, 한류 확산
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-600">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">📢</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">국정홍보·소통</h4>
                                <p className="text-sm text-gray-600">
                                    정부정책 홍보, 국정브리핑, 
                                    정부대변인, 언론·미디어 정책
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
                            <span className="text-2xl mr-3">🎨</span>
                            <div>
                                <div className="font-semibold text-gray-900">예술인 지원</div>
                                <div className="text-sm text-gray-600">AI 기반 창작지원금 자동 심사</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-pink-700">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">🗺️</span>
                            <div>
                                <div className="font-semibold text-gray-900">관광정보 제공</div>
                                <div className="text-sm text-gray-600">AI 관광가이드·추천 시스템</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-rose-700">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">⚽</span>
                            <div>
                                <div className="font-semibold text-gray-900">체육시설 관리</div>
                                <div className="text-sm text-gray-600">전국 체육시설 예약·운영 자동화</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-pink-800">98%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">📢</span>
                            <div>
                                <div className="font-semibold text-gray-900">국정홍보 분석</div>
                                <div className="text-sm text-gray-600">언론·여론 AI 분석 및 대응</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-rose-800">97%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">문화예술 현황</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-pink-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-pink-700">850개</div>
                        <div className="text-sm text-gray-600">박물관·미술관</div>
                    </div>
                    <div className="p-3 bg-rose-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-rose-700">1,200개</div>
                        <div className="text-sm text-gray-600">공공도서관</div>
                    </div>
                    <div className="p-3 bg-pink-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-pink-600">350개</div>
                        <div className="text-sm text-gray-600">공연장</div>
                    </div>
                    <div className="p-3 bg-rose-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-rose-600">250개</div>
                        <div className="text-sm text-gray-600">영화관</div>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">🎯 문화비전</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>문화가 있는 삶</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>세계일류 문화매력국가</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>K-컬처 글로벌 확산</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>국민과 함께하는 문화정책</span>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">🌟 핵심가치</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>창조 - 문화예술 창작 지원</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>향유 - 문화향유 기회 확대</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>소통 - 국민과 열린 소통</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>융합 - 문화·체육·관광 융합</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="bg-pink-50 border-l-4 border-pink-700 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-pink-900 mb-1">OpenHash 블록체인 기반</h4>
                        <p className="text-sm text-pink-800">
                            모든 문화예술지원·체육지원·관광진흥은 OpenHash 블록체인에 기록되어 
                            투명하게 관리되며, DeepSeek R1 AI가 15,000개 문화예술단체 데이터를 실시간으로 분석하고 
                            최적의 문화정책을 제공합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
