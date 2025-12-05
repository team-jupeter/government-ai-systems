const Overview = () => {
    return (
        <div className="space-y-6 animate-slide-in">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">💼 정무위원회 개요</h2>
                <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                        정무위원회는 <strong className="text-blue-600">국무총리 직속 기관</strong>을 소관하는 상임위원회로,
                        금융위원회를 소관하여 "금융 상임위"로도 불립니다. 
                        공정거래, 금융감독, 개인정보보호, 국민권익 등 경제와 국민 생활에 직결된 핵심 분야를 담당합니다.
                    </p>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                        <p className="text-sm text-yellow-800">
                            <strong>💡 핵심 특징:</strong> 금융기업 및 대기업 감독 권한으로 인해 
                            국회 상임위 선호도 조사에서 4위를 차지할 만큼 인기가 높은 위원회입니다.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-bold text-blue-900 mb-2">주요 권한</h3>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• <strong>금융감독</strong> - 은행, 증권, 보험 감독</li>
                                <li>• <strong>공정거래</strong> - 독과점 규제, 담합 단속</li>
                                <li>• <strong>개인정보보호</strong> - 데이터 프라이버시 관리</li>
                                <li>• <strong>국민권익</strong> - 부패 방지, 민원 처리</li>
                            </ul>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <h3 className="font-bold text-purple-900 mb-2">소관 기관 (7개)</h3>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• 국무조정실</li>
                                <li>• 국무총리비서실</li>
                                <li>• 국가보훈부</li>
                                <li>• 공정거래위원회</li>
                                <li>• 금융위원회</li>
                                <li>• 국민권익위원회</li>
                                <li>• 개인정보보호위원회</li>
                            </ul>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="font-bold text-green-900 mb-2">AI 자동화 영역</h3>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• 금융거래 이상징후 탐지</li>
                                <li>• 담합·카르텔 AI 분석</li>
                                <li>• 개인정보 유출 자동 감지</li>
                                <li>• 민원 처리 자동화</li>
                                <li>• OpenHash 기반 투명성</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
                <StatCard title="연간 심사 법안" value="1,234건" icon="📋" />
                <StatCard title="금융감독 조치" value="487건" icon="💰" />
                <StatCard title="공정거래 제재" value="234건" icon="⚖️" />
                <StatCard title="AI 자동화율" value="81%" icon="🤖" />
            </div>
        </div>
    );
};
