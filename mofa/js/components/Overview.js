const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">외교부 소개</h2>
                <p className="text-blue-100 text-sm">
                    외교부(Ministry of Foreign Affairs)는 대한민국 외교정책 수립·시행, 경제외교, 국제협력, 재외국민 보호를 담당합니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">재외공관</p>
                            <p className="text-2xl font-bold text-blue-600">184개</p>
                            <p className="text-xs text-gray-500">전 세계</p>
                        </div>
                        <span className="text-3xl">🌍</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">수교국</p>
                            <p className="text-2xl font-bold text-indigo-600">193개국</p>
                            <p className="text-xs text-gray-500">외교관계</p>
                        </div>
                        <span className="text-3xl">🤝</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">재외국민</p>
                            <p className="text-2xl font-bold text-purple-600">742만명</p>
                            <p className="text-xs text-gray-500">전 세계</p>
                        </div>
                        <span className="text-3xl">👥</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화</p>
                            <p className="text-2xl font-bold text-cyan-600">97.8%</p>
                            <p className="text-xs text-gray-500">DeepSeek R1</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🌐</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">외교정책 수립·시행</h4>
                                <p className="text-sm text-gray-600">
                                    양자·다자 외교정책 수립, 외교전략 기획, 국제정세 분석, 
                                    주요국 관계 관리, 정상·고위급 외교
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">💼</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">경제외교·국제협력</h4>
                                <p className="text-sm text-gray-600">
                                    경제외교 전략, FTA 협상 지원, 국제경제기구 협력, 
                                    개발협력(ODA), 에너지·자원 외교
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">📜</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">조약·국제협정</h4>
                                <p className="text-sm text-gray-600">
                                    조약 체결·비준, 국제협정 관리, 법률검토, 
                                    조약집 편찬, 국제법 자문
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-500">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🛡️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">재외국민 보호·지원</h4>
                                <p className="text-sm text-gray-600">
                                    재외국민 안전, 영사 조력, 여권 발급, 재외동포 정책, 
                                    위기상황 대응, 24시간 긴급연락센터 운영
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
                            <span className="text-2xl mr-3">📊</span>
                            <div>
                                <div className="font-semibold text-gray-900">국제정세 분석</div>
                                <div className="text-sm text-gray-600">실시간 전 세계 정세 분석</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">🗂️</span>
                            <div>
                                <div className="font-semibold text-gray-900">조약 관리</div>
                                <div className="text-sm text-gray-600">조약·협정 DB 자동 관리</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-indigo-600">98%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">👤</span>
                            <div>
                                <div className="font-semibold text-gray-900">영사 업무</div>
                                <div className="text-sm text-gray-600">여권 발급·갱신 자동화</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-purple-600">97%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">🚨</span>
                            <div>
                                <div className="font-semibold text-gray-900">재외국민 안전</div>
                                <div className="text-sm text-gray-600">위기상황 실시간 모니터링</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-cyan-600">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">재외공관 네트워크</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-blue-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">111개</div>
                        <div className="text-sm text-gray-600">대사관</div>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-indigo-600">47개</div>
                        <div className="text-sm text-gray-600">총영사관</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">20개</div>
                        <div className="text-sm text-gray-600">대표부</div>
                    </div>
                    <div className="p-3 bg-cyan-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-cyan-600">6개</div>
                        <div className="text-sm text-gray-600">분관</div>
                    </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                    전 세계 184개 재외공관을 통해 대한민국 국민을 보호하고 국익을 증진합니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">🎯 외교부 비전</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>국민과 함께하는 외교</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>평화와 번영의 한반도</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>세계 속의 대한민국</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>국격에 맞는 책임외교</span>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold mb-3">🌟 핵심가치</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>국익우선 - 국민의 이익 최우선</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>전문성 - 고도의 외교역량</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>창의성 - 미래지향적 외교</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>소통 - 국민과 함께</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-blue-900 mb-1">OpenHash 블록체인 기반</h4>
                        <p className="text-sm text-blue-800">
                            모든 외교문서·조약·영사업무는 OpenHash 블록체인에 기록되어 
                            위변조가 불가능하며, DeepSeek R1 AI가 실시간으로 국제정세를 분석하고 
                            재외국민 안전을 모니터링합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
