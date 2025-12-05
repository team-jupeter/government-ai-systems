const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">성평등가족부 소개</h2>
                <p className="text-purple-100 text-sm">
                    성평등가족부(Ministry of Gender Equality and Family)는 성평등 실현과 가족 지원을 담당합니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">여성 경제활동 참가율</p>
                            <p className="text-2xl font-bold text-purple-600">54.5%</p>
                            <p className="text-xs text-gray-500">15-64세</p>
                        </div>
                        <span className="text-3xl">👩</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">다문화가족</p>
                            <p className="text-2xl font-bold text-pink-600">38만가구</p>
                            <p className="text-xs text-gray-500">2024년</p>
                        </div>
                        <span className="text-3xl">🌏</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">청소년</p>
                            <p className="text-2xl font-bold text-purple-700">585만명</p>
                            <p className="text-xs text-gray-500">9-24세</p>
                        </div>
                        <span className="text-3xl">👦</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화</p>
                            <p className="text-2xl font-bold text-pink-700">98.3%</p>
                            <p className="text-xs text-gray-500">DeepSeek R1</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">⚖️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">성평등 정책</h4>
                                <p className="text-sm text-gray-600">성차별 해소, 균형 고용, 여성 안전</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-600">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">👨‍👩‍👧‍👦</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">가족 정책</h4>
                                <p className="text-sm text-gray-600">다문화가족, 한부모가족, 가족상담</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">👦</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">청소년 정책</h4>
                                <p className="text-sm text-gray-600">청소년 활동·복지, 상담·보호</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🛡️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">여성 폭력 예방</h4>
                                <p className="text-sm text-gray-600">가정폭력·성폭력·성매매 예방</p>
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
                            <span className="text-2xl mr-3">👩</span>
                            <div>
                                <div className="font-semibold text-gray-900">성차별 사건 분석</div>
                                <div className="text-sm text-gray-600">AI 자동 사건 분류·분석</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-purple-600">99%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">👨‍👩‍👧‍👦</span>
                            <div>
                                <div className="font-semibold text-gray-900">다문화가족 지원</div>
                                <div className="text-sm text-gray-600">AI 맞춤형 프로그램 추천</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-pink-600">98%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">👦</span>
                            <div>
                                <div className="font-semibold text-gray-900">청소년 상담</div>
                                <div className="text-sm text-gray-600">AI 24시간 상담 서비스</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-purple-700">97%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">🛡️</span>
                            <div>
                                <div className="font-semibold text-gray-900">폭력 피해자 지원</div>
                                <div className="text-sm text-gray-600">AI 긴급 위험도 평가</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-pink-700">96%</div>
                            <div className="text-xs text-gray-500">자동화</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-purple-900 mb-1">OpenHash 블록체인 기반</h4>
                        <p className="text-sm text-purple-800">
                            모든 성차별사건·가족지원·폭력피해자상담은 OpenHash 블록체인에 기록되어 
                            안전하게 관리되며, DeepSeek R1 AI가 성평등 데이터를 분석하고 
                            맞춤형 정책을 제시합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
window.Overview = Overview;
