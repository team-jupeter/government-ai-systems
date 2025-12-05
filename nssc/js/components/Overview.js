const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-700 to-emerald-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">원자력안전위원회 개요</h2>
                <p className="text-green-100 text-sm">
                    원자력의 안전한 이용을 위한 독립적인 안전규제 기관입니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">원전 안전점검</p>
                            <p className="text-2xl font-bold text-green-600">2,345건</p>
                            <p className="text-xs text-gray-500">AI 분석 98.5%</p>
                        </div>
                        <span className="text-3xl">⚛️</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">방사선 관리</p>
                            <p className="text-2xl font-bold text-emerald-600">6,789개소</p>
                            <p className="text-xs text-gray-500">실시간 모니터링</p>
                        </div>
                        <span className="text-3xl">☢️</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">허가 심사</p>
                            <p className="text-2xl font-bold text-teal-600">892건</p>
                            <p className="text-xs text-gray-500">평균 처리 45일</p>
                        </div>
                        <span className="text-3xl">📋</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">방재훈련</p>
                            <p className="text-2xl font-bold text-lime-600">124회</p>
                            <p className="text-xs text-gray-500">연간 정기훈련</p>
                        </div>
                        <span className="text-3xl">🚨</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">기관 소개</h3>
                <div className="space-y-4 text-gray-700">
                    <div className="flex items-start">
                        <span className="text-2xl mr-3">🏛️</span>
                        <div>
                            <h4 className="font-semibold text-gray-900">설립 및 독립성</h4>
                            <p className="text-sm">2011년 10월 26일 독립적인 원자력 안전규제 기관으로 출범. 국무총리 소속 차관급 중앙행정기관으로서 원자력 진흥 기관과 분리되어 독립적으로 안전규제 업무를 수행합니다.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <span className="text-2xl mr-3">📋</span>
                        <div>
                            <h4 className="font-semibold text-gray-900">주요 업무</h4>
                            <p className="text-sm">원자력발전소 설계·건설·운전·해체 전 단계 안전규제, 방사선이용기관 관리, 방사성폐기물 안전관리, 생활주변방사선 관리, 방사능방재체계 운영, 핵안보 및 핵비확산 활동을 수행합니다.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <span className="text-2xl mr-3">👥</span>
                        <div>
                            <h4 className="font-semibold text-gray-900">위원회 구성</h4>
                            <p className="text-sm">위원장(차관급) 1명, 부위원장 1명을 포함한 7~9명의 위원으로 구성. 원자력·환경·보건의료·과학기술·공공안전·법률·인문사회 등 다양한 분야 전문가로 구성되어 있습니다.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <span className="text-2xl mr-3">🌐</span>
                        <div>
                            <h4 className="font-semibold text-gray-900">국제 협력</h4>
                            <p className="text-sm">IAEA(국제원자력기구), OECD/NEA 등 국제기구와 긴밀히 협력하며, 후쿠시마 사고 이후 강화된 국제 안전기준을 국내에 적용하고 있습니다.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h3>
                    <div className="space-y-3">
                        <div className="flex items-start p-3 bg-green-50 rounded-lg">
                            <span className="text-2xl mr-3">⚛️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">원자력 안전규제</h4>
                                <p className="text-sm text-gray-600">원전 설계·건설·운전·해체 전 단계 안전 심사</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-emerald-50 rounded-lg">
                            <span className="text-2xl mr-3">☢️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">방사선 안전관리</h4>
                                <p className="text-sm text-gray-600">방사선이용기관·방사성폐기물 안전 관리</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-teal-50 rounded-lg">
                            <span className="text-2xl mr-3">🚨</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">방사능 방재</h4>
                                <p className="text-sm text-gray-600">원자력사고 대비 방재체계 운영·훈련</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-lime-50 rounded-lg">
                            <span className="text-2xl mr-3">🛡️</span>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">핵안보·비확산</h4>
                                <p className="text-sm text-gray-600">핵물질 방호, 핵비확산 국제협력</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">AI 자동화 현황</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">안전점검 자동분석</span>
                                <span className="text-sm font-medium text-green-600">98%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{width: '98%'}}></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">방사선 모니터링</span>
                                <span className="text-sm font-medium text-green-600">99%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{width: '99%'}}></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">허가심사 지원</span>
                                <span className="text-sm font-medium text-green-600">96%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{width: '96%'}}></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">사고예측 분석</span>
                                <span className="text-sm font-medium text-green-600">97%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{width: '97%'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">ℹ️</span>
                    <div>
                        <h4 className="font-semibold text-green-900 mb-1">핵심 가치</h4>
                        <p className="text-sm text-green-800">
                            <strong>전문성·독립성·투명성·공정성·신뢰성</strong>의 핵심가치를 바탕으로 
                            안전최우선 원칙으로 원자력 안전규제 업무를 수행합니다. 
                            AI가 24시간 실시간으로 전국 원자력시설을 모니터링하여 국민의 안전을 지킵니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
