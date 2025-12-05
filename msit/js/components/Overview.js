const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">과학기술정보통신부 개요</h2>
                <p className="text-purple-100 text-sm">
                    과학기술과 ICT로 미래를 선도하는 과학기술부총리 소속 중앙행정기관입니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">R&D 예산</p>
                            <p className="text-2xl font-bold text-purple-600">31조원</p>
                            <p className="text-xs text-gray-500">2025년 기준</p>
                        </div>
                        <span className="text-3xl">🔬</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">5G 가입자</p>
                            <p className="text-2xl font-bold text-indigo-600">3,450만</p>
                            <p className="text-xs text-gray-500">세계 1위 보급률</p>
                        </div>
                        <span className="text-3xl">📡</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">연구기관</p>
                            <p className="text-2xl font-bold text-violet-600">200+개</p>
                            <p className="text-xs text-gray-500">출연연·대학 등</p>
                        </div>
                        <span className="text-3xl">🏛️</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화</p>
                            <p className="text-2xl font-bold text-fuchsia-600">99.2%</p>
                            <p className="text-xs text-gray-500">정책분석·집행</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">기관 소개</h3>
                <div className="space-y-4 text-gray-700">
                    <div className="flex items-start">
                        <span className="text-2xl mr-3">🏛️</span>
                        <div>
                            <h4 className="font-semibold text-gray-900">설립 및 역사</h4>
                            <p className="text-sm">2017년 7월 미래창조과학부를 개편하여 설립. 과학기술부총리가 장관을 겸직하며 대한민국 과학기술과 ICT 정책을 총괄·조정하는 핵심 부처입니다.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <span className="text-2xl mr-3">📋</span>
                        <div>
                            <h4 className="font-semibold text-gray-900">주요 업무</h4>
                            <p className="text-sm">과학기술정책 수립·총괄·조정·평가, R&D 투자·관리, 과학기술인력 양성, 정보통신산업·방송 진흥, 전파관리, 우편사업, 국가정보화 기획·정보보호를 수행합니다.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <span className="text-2xl mr-3">👥</span>
                        <div>
                            <h4 className="font-semibold text-gray-900">조직 구성</h4>
                            <p className="text-sm">과학기술부총리 겸 장관, 제1차관(과학기술·R&D), 제2차관(ICT·방송), 과학기술혁신본부장(차관급), 3실 19국 70과로 구성. 우정사업본부, 국립과학관 등 소속기관 운영.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <span className="text-2xl mr-3">🌐</span>
                        <div>
                            <h4 className="font-semibold text-gray-900">국제 협력</h4>
                            <p className="text-sm">OECD 과학기술위원회, ITU(국제전기통신연합), 3GPP(이동통신표준), 양자·AI 국제공동연구 등을 통해 글로벌 과학기술·ICT 협력을 주도합니다.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h3>
                    <div className="space-y-3">
                        <div className="flex items-start p-3 bg-purple-50 rounded-lg">
                            <span className="text-2xl mr-3">🔬</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">과학기술 R&D</h4>
                                <p className="text-sm text-gray-600">국가R&D 31조원 투자, 기초연구·원천기술 개발</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-indigo-50 rounded-lg">
                            <span className="text-2xl mr-3">📡</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">정보통신·방송</h4>
                                <p className="text-sm text-gray-600">5G/6G, AI, 클라우드, 방송 진흥 정책</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-violet-50 rounded-lg">
                            <span className="text-2xl mr-3">🎓</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">과학기술인력 양성</h4>
                                <p className="text-sm text-gray-600">이공계 인재육성, 연구자 지원, 여성과학기술인</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-fuchsia-50 rounded-lg">
                            <span className="text-2xl mr-3">🔐</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">정보보호·사이버안보</h4>
                                <p className="text-sm text-gray-600">국가정보화, 개인정보보호, 사이버 안전</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">AI 자동화 현황</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">R&D 과제 평가</span>
                                <span className="text-sm font-medium text-purple-600">99%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full" style={{width: '99%'}}></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">전파 관리 모니터링</span>
                                <span className="text-sm font-medium text-purple-600">100%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full" style={{width: '100%'}}></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">정보보호 위협 탐지</span>
                                <span className="text-sm font-medium text-purple-600">99%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full" style={{width: '99%'}}></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">ICT 정책 분석</span>
                                <span className="text-sm font-medium text-purple-600">98%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full" style={{width: '98%'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">ℹ️</span>
                    <div>
                        <h4 className="font-semibold text-purple-900 mb-1">국민 참여</h4>
                        <p className="text-sm text-purple-800">
                            과학기술·ICT 정책에 대한 국민 의견을 상시 수렴합니다. 
                            AI가 24시간 R&D 과제를 모니터링하고 전파·정보보호를 관리합니다.
                            과학기술정보통신부 누리집(www.msit.go.kr)에서 더 자세한 정보를 확인하실 수 있습니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
