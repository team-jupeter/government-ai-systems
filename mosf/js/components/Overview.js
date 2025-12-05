const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">기획재정부 개요</h2>
                <p className="text-blue-100 text-sm">
                    대한민국 경제·재정 정책을 총괄하는 경제부총리 소속 중앙행정기관입니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">2025년 예산</p>
                            <p className="text-2xl font-bold text-blue-600">677조원</p>
                            <p className="text-xs text-gray-500">AI 자동편성 98%</p>
                        </div>
                        <span className="text-3xl">💰</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">세수 관리</p>
                            <p className="text-2xl font-bold text-indigo-600">395조원</p>
                            <p className="text-xs text-gray-500">국세+관세</p>
                        </div>
                        <span className="text-3xl">📊</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">공공기관</p>
                            <p className="text-2xl font-bold text-purple-600">370개</p>
                            <p className="text-xs text-gray-500">실시간 감독</p>
                        </div>
                        <span className="text-3xl">🏢</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">국가채무</p>
                            <p className="text-2xl font-bold text-cyan-600">1,168조원</p>
                            <p className="text-xs text-gray-500">GDP 대비 50%</p>
                        </div>
                        <span className="text-3xl">📈</span>
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
                            <p className="text-sm">2008년 2월 재정경제부와 기획예산처를 통합하여 설립. 경제부총리가 장관을 겸직하며 대한민국 경제정책을 총괄·조정하는 최고 경제부처입니다.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <span className="text-2xl mr-3">📋</span>
                        <div>
                            <h4 className="font-semibold text-gray-900">주요 업무</h4>
                            <p className="text-sm">중장기 국가발전전략 수립, 경제·재정정책 총괄·조정, 예산·기금 편성·집행·성과관리, 세제·국고·외환 운영, 공공기관 관리, 경제협력·국유재산·민간투자 관리를 수행합니다.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <span className="text-2xl mr-3">👥</span>
                        <div>
                            <h4 className="font-semibold text-gray-900">조직 구성</h4>
                            <p className="text-sm">경제부총리 겸 장관, 제1차관(경제정책), 제2차관(재정·예산), 예산실, 11개 국으로 구성. 산하에 국세청·관세청·통계청·조달청·복권위원회를 두고 있습니다.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <span className="text-2xl mr-3">🌐</span>
                        <div>
                            <h4 className="font-semibold text-gray-900">국제 협력</h4>
                            <p className="text-sm">IMF, 세계은행, OECD, G20, APEC 등 국제경제기구와 협력. 한·미·일·중 등 주요국과 경제협력 및 FTA 추진, 개발도상국 ODA 지원을 주도합니다.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h3>
                    <div className="space-y-3">
                        <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                            <span className="text-2xl mr-3">💰</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">예산 편성·집행</h4>
                                <p className="text-sm text-gray-600">국가예산 편성, 기금운용, 재정성과 관리</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-indigo-50 rounded-lg">
                            <span className="text-2xl mr-3">📊</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">경제정책 수립</h4>
                                <p className="text-sm text-gray-600">거시경제정책, 경제협력, 산업정책 조정</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-purple-50 rounded-lg">
                            <span className="text-2xl mr-3">💳</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">세제·국고 운영</h4>
                                <p className="text-sm text-gray-600">세제 개편, 국고 관리, 국채 발행</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-cyan-50 rounded-lg">
                            <span className="text-2xl mr-3">🏢</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">공공기관 관리</h4>
                                <p className="text-sm text-gray-600">공공기관 지정·감독, 경영평가</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">AI 자동화 현황</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">예산편성 자동화</span>
                                <span className="text-sm font-medium text-blue-600">98%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{width: '98%'}}></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">세수 예측 분석</span>
                                <span className="text-sm font-medium text-blue-600">99%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{width: '99%'}}></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">재정성과 평가</span>
                                <span className="text-sm font-medium text-blue-600">97%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{width: '97%'}}></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">경제지표 모니터링</span>
                                <span className="text-sm font-medium text-blue-600">99%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{width: '99%'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">ℹ️</span>
                    <div>
                        <h4 className="font-semibold text-blue-900 mb-1">국민 참여</h4>
                        <p className="text-sm text-blue-800">
                            국민참여예산제도를 통해 예산 편성 과정에 국민이 직접 참여할 수 있습니다. 
                            AI가 24시간 경제지표를 모니터링하고 재정 운영의 투명성을 보장합니다.
                            기획재정부 누리집(www.moef.go.kr)에서 더 자세한 정보를 확인하실 수 있습니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
