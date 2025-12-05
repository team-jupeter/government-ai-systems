const Overview = () => {
    return (
        <div className="space-y-6 animate-slide-in">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">🏛️ 국회운영위원회 개요</h2>
                <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                        국회운영위원회는 국회의 원활한 운영을 위한 핵심 상임위원회로, 
                        국회 회의 일정, 의사 진행, 위원회 구성 및 운영에 관한 사항을 심의합니다.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-bold text-blue-900 mb-2">주요 기능</h3>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• 국회 회의 일정 및 의사 진행 조정</li>
                                <li>• 위원회 구성 및 운영 관리</li>
                                <li>• 국회 예산안 및 결산 심사</li>
                                <li>• 국회사무처 소관 업무 감독</li>
                            </ul>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="font-bold text-green-900 mb-2">AI 자동화 영역</h3>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• 회의 일정 최적화 알고리즘</li>
                                <li>• 의안 심사 진행 상황 자동 추적</li>
                                <li>• 위원회 활동 데이터 분석</li>
                                <li>• OpenHash 기반 의사록 무결성 보장</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <StatCard title="처리 안건" value="2,847건" icon="📋" />
                <StatCard title="회의 개최" value="156회" icon="🏛️" />
                <StatCard title="AI 자동화율" value="73%" icon="🤖" />
            </div>
        </div>
    );
};
