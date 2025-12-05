const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">👥 제22대 국회 정무위원회 조직 구성</h2>
            
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-lg shadow-lg">
                    <h3 className="font-bold text-xl mb-2">💼 위원장</h3>
                    <p className="text-lg">윤한홍 의원 (국민의힘, 3선)</p>
                    <p className="text-sm text-red-100 mt-2">전 행정고시 32회, 대통령실 인사비서관 역임</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="border-l-4 border-red-500 bg-red-50 pl-4 p-4 rounded">
                        <h3 className="font-bold text-lg mb-2">간사 (국민의힘)</h3>
                        <p className="text-gray-700 font-medium">(위원 중 선임 예정)</p>
                        <p className="text-sm text-gray-600 mt-1">여당 측 업무 조정</p>
                    </div>
                    <div className="border-l-4 border-blue-500 bg-blue-50 pl-4 p-4 rounded">
                        <h3 className="font-bold text-lg mb-2">간사 (더불어민주당)</h3>
                        <p className="text-gray-700 font-medium">(위원 중 선임 예정)</p>
                        <p className="text-sm text-gray-600 mt-1">야당 측 업무 조정</p>
                    </div>
                </div>
                
                <div className="border-l-4 border-green-600 pl-4">
                    <h3 className="font-bold text-lg mb-3">위원 구성 (총 24명)</h3>
                    <p className="text-sm text-gray-600 mb-3">금융·경제 전문가들이 다수 배치되어 있으며, 금융위원회 감독 역할 수행</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg mt-6">
                    <h3 className="font-bold text-xl mb-4">소관 기관 (7개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded shadow-sm border-l-4 border-blue-600">
                            <h4 className="font-bold text-blue-900 mb-1">🏛️ 국무조정실</h4>
                            <p className="text-sm text-gray-600">정부 정책 조정, 부처 간 협의</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm border-l-4 border-purple-600">
                            <h4 className="font-bold text-purple-900 mb-1">📝 국무총리비서실</h4>
                            <p className="text-sm text-gray-600">국무총리 비서 및 행정 지원</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm border-l-4 border-red-600">
                            <h4 className="font-bold text-red-900 mb-1">🎖️ 국가보훈부</h4>
                            <p className="text-sm text-gray-600">독립유공자, 국가유공자 예우 및 지원</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm border-l-4 border-green-600">
                            <h4 className="font-bold text-green-900 mb-1">⚖️ 공정거래위원회</h4>
                            <p className="text-sm text-gray-600">독과점 규제, 담합 단속, 소비자 보호</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm border-l-4 border-yellow-600">
                            <h4 className="font-bold text-yellow-900 mb-1">💰 금융위원회</h4>
                            <p className="text-sm text-gray-600">은행·증권·보험 감독, 금융정책</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm border-l-4 border-indigo-600">
                            <h4 className="font-bold text-indigo-900 mb-1">📢 국민권익위원회</h4>
                            <p className="text-sm text-gray-600">부패 방지, 민원 처리, 행정심판</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm border-l-4 border-orange-600">
                            <h4 className="font-bold text-orange-900 mb-1">🔒 개인정보보호위원회</h4>
                            <p className="text-sm text-gray-600">개인정보 보호, 데이터 프라이버시</p>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                    <h3 className="font-bold text-yellow-900 mb-2">💡 AI 자동화 조직 운영</h3>
                    <ul className="text-sm text-yellow-800 space-y-1">
                        <li>• 금융거래 빅데이터 실시간 분석</li>
                        <li>• 담합·카르텔 AI 탐지 시스템</li>
                        <li>• 개인정보 유출 자동 감지 및 경고</li>
                        <li>• OpenHash 기반 감독 과정 투명성 확보</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
