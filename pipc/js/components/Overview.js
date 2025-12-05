const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-800 to-blue-900 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">개인정보보호위원회 개요</h2>
                <p className="text-indigo-100 text-sm">
                    개인정보 보호에 관한 사무를 독립적으로 수행하는 중앙행정기관입니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="오늘 침해조사" 
                    value="4,567건" 
                    subtitle="AI 자동분석 97.5%"
                    icon="🔍" 
                    color="indigo" 
                />
                <StatCard 
                    title="분쟁조정" 
                    value="892건" 
                    subtitle="평균 처리 18일"
                    icon="⚖️" 
                    color="blue" 
                />
                <StatCard 
                    title="과징금 부과" 
                    value="345건" 
                    subtitle="총 128억원"
                    icon="💰" 
                    color="purple" 
                />
                <StatCard 
                    title="신고 접수" 
                    value="8,234건" 
                    subtitle="118 콜센터"
                    icon="📞" 
                    color="cyan" 
                />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">기관 소개</h3>
                <div className="space-y-4 text-gray-700">
                    <div className="flex items-start">
                        <span className="text-2xl mr-3">🏛️</span>
                        <div>
                            <h4 className="font-semibold text-gray-900">설립 및 격상</h4>
                            <p className="text-sm">2011년 설립 → 2020년 8월 중앙행정기관 승격. 행정안전부·방송통신위원회·금융위원회의 개인정보 보호 기능을 통합하여 독립적인 장관급 기관으로 출범했습니다.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <span className="text-2xl mr-3">📋</span>
                        <div>
                            <h4 className="font-semibold text-gray-900">주요 업무</h4>
                            <p className="text-sm">개인정보 보호 법령·정책 수립, 침해조사 및 처분, 분쟁조정 및 권리구제, 과징금 부과, 개인정보 영향평가, 국제협력, 교육 및 홍보 등 개인정보 보호에 관한 모든 사무를 총괄합니다.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <span className="text-2xl mr-3">👥</span>
                        <div>
                            <h4 className="font-semibold text-gray-900">위원회 구성</h4>
                            <p className="text-sm">위원장(장관급) 1명, 부위원장(차관급) 1명, 비상임위원 7명으로 총 9명의 위원으로 구성. 위원은 개인정보 보호 전문가 중에서 여야 추천을 거쳐 대통령이 임명·위촉합니다.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <span className="text-2xl mr-3">🌐</span>
                        <div>
                            <h4 className="font-semibold text-gray-900">국제 협력</h4>
                            <p className="text-sm">GDPR 적정성 결정 획득(EU), APEC CBPR 인증, 글로벌 프라이버시 어셈블리(GPA) 참여 등 국제적 개인정보 보호 협력을 주도하고 있습니다.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h3>
                    <div className="space-y-3">
                        <div className="flex items-start p-3 bg-indigo-50 rounded-lg">
                            <span className="text-2xl mr-3">🔍</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">침해조사 및 처분</h4>
                                <p className="text-sm text-gray-600">개인정보 침해 신고 조사, 과징금 부과, 시정명령</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                            <span className="text-2xl mr-3">⚖️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">분쟁조정</h4>
                                <p className="text-sm text-gray-600">개인정보 분쟁조정위원회 운영, 피해구제</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-purple-50 rounded-lg">
                            <span className="text-2xl mr-3">📜</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">법령·정책</h4>
                                <p className="text-sm text-gray-600">개인정보 보호법 제·개정, 기본계획 수립</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-cyan-50 rounded-lg">
                            <span className="text-2xl mr-3">🌍</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">국제협력</h4>
                                <p className="text-sm text-gray-600">GDPR, APEC CBPR 등 국제 개인정보 보호 협력</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">AI 자동화 현황</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">신고 접수 자동분류</span>
                                <span className="text-sm font-medium text-indigo-600">99%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-indigo-600 h-2 rounded-full" style={{width: '99%'}}></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">침해사실 자동분석</span>
                                <span className="text-sm font-medium text-indigo-600">97%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-indigo-600 h-2 rounded-full" style={{width: '97%'}}></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">유사 사례 검색</span>
                                <span className="text-sm font-medium text-indigo-600">98%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-indigo-600 h-2 rounded-full" style={{width: '98%'}}></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">법령 적용 지원</span>
                                <span className="text-sm font-medium text-indigo-600">95%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-indigo-600 h-2 rounded-full" style={{width: '95%'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">📞</span>
                    <div>
                        <h4 className="font-semibold text-indigo-900 mb-1">개인정보 침해 신고</h4>
                        <p className="text-sm text-indigo-800">
                            개인정보 침해 신고는 국번 없이 <strong>118</strong>로 전화하거나 
                            개인정보 포털(www.privacy.go.kr)을 통해 접수할 수 있습니다.
                            모든 신고는 AI가 자동 분류하고 신속하게 처리됩니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
