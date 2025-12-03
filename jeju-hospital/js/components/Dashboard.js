const Dashboard = ({ patientId, onNavigate }) => {
    const [showSmartphone, setShowSmartphone] = React.useState(false);
    const [stats] = React.useState({
        totalPatients: 12847,
        activeMonitoring: 3421,
        aiConsultations: 892,
        emergencyAlerts: 3
    });

    return (
        <div className="space-y-6">
            {showSmartphone && <SmartphoneVital patientId={patientId} onClose={() => setShowSmartphone(false)} />}
            
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">대시보드</h1>
                    <p className="text-gray-400 mt-1">제주 권역 통합 의료 AI 시스템 현황</p>
                </div>
                <button 
                    onClick={() => setShowSmartphone(true)}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg font-medium flex items-center space-x-2"
                >
                    <i className="fas fa-mobile-alt"></i>
                    <span>생체감지 스마트폰</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="stat-card card-hover transition-all cursor-pointer" onClick={() => onNavigate('vital')}>
                    <div className="flex items-center justify-between">
                        <div><p className="text-gray-400 text-sm">실시간 모니터링</p><p className="text-2xl font-bold text-cyan-400 mt-1">{stats.activeMonitoring.toLocaleString()}</p></div>
                        <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center"><i className="fas fa-heartbeat text-cyan-400 text-xl"></i></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">24시간 바이탈 추적</p>
                </div>
                <div className="stat-card card-hover transition-all cursor-pointer" onClick={() => onNavigate('ai-doctor')}>
                    <div className="flex items-center justify-between">
                        <div><p className="text-gray-400 text-sm">AI 상담 (오늘)</p><p className="text-2xl font-bold text-blue-400 mt-1">{stats.aiConsultations}</p></div>
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center"><i className="fas fa-robot text-blue-400 text-xl"></i></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">사전 진단 완료</p>
                </div>
                <div className="stat-card card-hover transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                        <div><p className="text-gray-400 text-sm">총 등록 환자</p><p className="text-2xl font-bold text-green-400 mt-1">{stats.totalPatients.toLocaleString()}</p></div>
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center"><i className="fas fa-users text-green-400 text-xl"></i></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">제주 권역 전체</p>
                </div>
                <div className="stat-card card-hover transition-all cursor-pointer border-red-500/30">
                    <div className="flex items-center justify-between">
                        <div><p className="text-gray-400 text-sm">긴급 알림</p><p className="text-2xl font-bold text-red-400 mt-1">{stats.emergencyAlerts}</p></div>
                        <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center"><i className="fas fa-exclamation-triangle text-red-400 text-xl animate-pulse"></i></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">즉시 대응 필요</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                    <h3 className="font-semibold mb-4 flex items-center"><i className="fas fa-chart-line text-blue-400 mr-2"></i>시스템 특징</h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                            <i className="fas fa-user-md text-blue-400"></i>
                            <div><p className="text-sm font-medium">AI 의사 사전 진단</p><p className="text-xs text-gray-400">병원 방문 전 증상 분석</p></div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                            <i className="fas fa-hospital text-green-400"></i>
                            <div><p className="text-sm font-medium">스마트 병원 추천</p><p className="text-xs text-gray-400">거주지 기반 최적 병원 매칭</p></div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                            <i className="fas fa-file-medical text-purple-400"></i>
                            <div><p className="text-sm font-medium">진단서 사전 전송</p><p className="text-xs text-gray-400">담당 의료진에 AI 분석 결과 전달</p></div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                            <i className="fas fa-shield-alt text-cyan-400"></i>
                            <div><p className="text-sm font-medium">예방 의학 중심</p><p className="text-xs text-gray-400">질병 사전 예측 및 관리</p></div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                    <h3 className="font-semibold mb-4 flex items-center"><i className="fas fa-hospital text-green-400 mr-2"></i>연계 의료기관</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                            <div className="flex items-center space-x-3"><div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center"><i className="fas fa-h-square text-blue-400"></i></div><div><p className="text-sm font-medium">제주대학교병원</p><p className="text-xs text-gray-400">권역응급의료센터</p></div></div>
                            <span className="text-xs text-green-400"><i className="fas fa-circle text-xs mr-1"></i>연동</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                            <div className="flex items-center space-x-3"><div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center"><i className="fas fa-h-square text-green-400"></i></div><div><p className="text-sm font-medium">제주의료원</p><p className="text-xs text-gray-400">지역거점공공병원</p></div></div>
                            <span className="text-xs text-green-400"><i className="fas fa-circle text-xs mr-1"></i>연동</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                            <div className="flex items-center space-x-3"><div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center"><i className="fas fa-h-square text-purple-400"></i></div><div><p className="text-sm font-medium">서귀포의료원</p><p className="text-xs text-gray-400">서귀포권역 공공병원</p></div></div>
                            <span className="text-xs text-green-400"><i className="fas fa-circle text-xs mr-1"></i>연동</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
