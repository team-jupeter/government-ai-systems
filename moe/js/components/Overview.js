const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">교육부 개요</h2>
                <p className="text-teal-100 text-sm">
                    모든 학생이 행복한 교육을 실현하는 부총리 소속 중앙행정기관입니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">교육예산</p>
                            <p className="text-2xl font-bold text-teal-600">97조원</p>
                            <p className="text-xs text-gray-500">2025년 기준</p>
                        </div>
                        <span className="text-3xl">📚</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">전국 학생</p>
                            <p className="text-2xl font-bold text-cyan-600">655만명</p>
                            <p className="text-xs text-gray-500">초중고대학</p>
                        </div>
                        <span className="text-3xl">👨‍🎓</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">학교 수</p>
                            <p className="text-2xl font-bold text-emerald-600">21,700개</p>
                            <p className="text-xs text-gray-500">초중고대학</p>
                        </div>
                        <span className="text-3xl">🏫</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화</p>
                            <p className="text-2xl font-bold text-sky-600">98.5%</p>
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
                            <p className="text-sm">2013년 3월 교육과학기술부를 개편하여 설립. 부총리가 장관을 겸직하며 대한민국 교육정책을 총괄·조정하는 핵심 부처입니다.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <span className="text-2xl mr-3">📋</span>
                        <div>
                            <h4 className="font-semibold text-gray-900">주요 업무</h4>
                            <p className="text-sm">인적자원개발정책 수립, 영유아 보육·교육(유보통합), 초·중등교육, 고등교육, 평생교육, 학술연구 진흥, 지방교육자치, 교육복지 확대를 수행합니다.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <span className="text-2xl mr-3">👥</span>
                        <div>
                            <h4 className="font-semibold text-gray-900">조직 구성</h4>
                            <p className="text-sm">부총리 겸 장관, 차관, 3실(기획조정·인재정책·책임교육정책) 11국 63과로 구성. 전국 17개 시도교육청과 176개 교육지원청을 운영합니다.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <span className="text-2xl mr-3">🌐</span>
                        <div>
                            <h4 className="font-semibold text-gray-900">국제 협력</h4>
                            <p className="text-sm">OECD 교육위원회, UNESCO, 한-ASEAN 교육협력, 재외동포 교육, 정부초청 외국인 장학생(GKS) 프로그램 등을 통해 글로벌 교육 협력을 주도합니다.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h3>
                    <div className="space-y-3">
                        <div className="flex items-start p-3 bg-teal-50 rounded-lg">
                            <span className="text-2xl mr-3">📖</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">초·중등교육</h4>
                                <p className="text-sm text-gray-600">교육과정, 무상교육, 교원양성, 학교안전</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-cyan-50 rounded-lg">
                            <span className="text-2xl mr-3">🎓</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">고등교육</h4>
                                <p className="text-sm text-gray-600">대학정책, 입학제도, 학술연구, 장학금</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-emerald-50 rounded-lg">
                            <span className="text-2xl mr-3">👶</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">유보통합</h4>
                                <p className="text-sm text-gray-600">유치원·어린이집 통합, 영유아 교육·보육</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-sky-50 rounded-lg">
                            <span className="text-2xl mr-3">💼</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">평생·직업교육</h4>
                                <p className="text-sm text-gray-600">평생학습, 직업교육, 성인문해교육</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">AI 자동화 현황</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">입학전형 분석</span>
                                <span className="text-sm font-medium text-teal-600">99%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-teal-600 h-2 rounded-full" style={{width: '99%'}}></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">교육통계 분석</span>
                                <span className="text-sm font-medium text-teal-600">99%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-teal-600 h-2 rounded-full" style={{width: '99%'}}></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">장학금 심사</span>
                                <span className="text-sm font-medium text-teal-600">98%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-teal-600 h-2 rounded-full" style={{width: '98%'}}></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">학교안전 모니터링</span>
                                <span className="text-sm font-medium text-teal-600">99%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-teal-600 h-2 rounded-full" style={{width: '99%'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-teal-50 border-l-4 border-teal-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">ℹ️</span>
                    <div>
                        <h4 className="font-semibold text-teal-900 mb-1">국민 참여</h4>
                        <p className="text-sm text-teal-800">
                            교육정책에 대한 국민 의견을 상시 수렴합니다. 
                            AI가 24시간 학교안전을 모니터링하고 입학전형을 분석합니다.
                            교육부 누리집(www.moe.go.kr)에서 더 자세한 정보를 확인하실 수 있습니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
