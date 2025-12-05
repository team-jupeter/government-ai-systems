const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">👥 제22대 국회 법제사법위원회 조직 구성</h2>
            
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg shadow-lg">
                    <h3 className="font-bold text-xl mb-2">⚖️ 위원장</h3>
                    <p className="text-lg">정청래 의원 (더불어민주당, 4선)</p>
                    <p className="text-sm text-blue-100 mt-2">위원회 대표, 회의 주재, 의사 진행 총괄</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="border-l-4 border-blue-500 bg-blue-50 pl-4 p-4 rounded">
                        <h3 className="font-bold text-lg mb-2">간사 (더불어민주당)</h3>
                        <p className="text-gray-700 font-medium">김승원 의원</p>
                        <p className="text-sm text-gray-600 mt-1">위원회 업무 조정 및 의사 진행 보좌</p>
                    </div>
                    <div className="border-l-4 border-red-500 bg-red-50 pl-4 p-4 rounded">
                        <h3 className="font-bold text-lg mb-2">간사 (국민의힘)</h3>
                        <p className="text-gray-700 font-medium">공석</p>
                        <p className="text-sm text-gray-600 mt-1">야당 측 업무 조정 담당 (미선임)</p>
                    </div>
                </div>
                
                <div className="border-l-4 border-green-600 pl-4">
                    <h3 className="font-bold text-lg mb-3">위원 구성 (총 18명)</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="font-bold text-blue-900 mb-2">더불어민주당 (10명)</p>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• 김용민 (재선)</li>
                                <li>• 박균택 (초선)</li>
                                <li>• 박지원 (5선)</li>
                                <li>• 서영교 (4선)</li>
                                <li>• 이건태 (초선)</li>
                                <li>• 이성윤 (초선)</li>
                                <li>• 장경태 (재선)</li>
                                <li>• 전현희 (초선)</li>
                            </ul>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg">
                            <p className="font-bold text-red-900 mb-2">국민의힘 (7명)</p>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• 곽규택</li>
                                <li>• 박준태</li>
                                <li>• 송석준</li>
                                <li>• 유상범</li>
                                <li>• 장동혁</li>
                                <li>• 조배숙</li>
                                <li>• 주진우</li>
                            </ul>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <p className="font-bold text-purple-900 mb-2">조국혁신당 (1명)</p>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• 박은정</li>
                            </ul>
                            <p className="text-xs text-purple-700 mt-3">
                                <strong>법조인 비율:</strong> 66.6% (18명 중 12명)
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg mt-6">
                    <h3 className="font-bold text-xl mb-4">소관 기관 (6개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded shadow-sm border-l-4 border-blue-600">
                            <h4 className="font-bold text-blue-900 mb-1">⚖️ 법무부</h4>
                            <p className="text-sm text-gray-600">법무·검찰·교정 행정, 범죄예방, 인권보호</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm border-l-4 border-purple-600">
                            <h4 className="font-bold text-purple-900 mb-1">📜 법제처</h4>
                            <p className="text-sm text-gray-600">법령 입안·심사, 법제 업무 총괄, 법령 해석</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm border-l-4 border-green-600">
                            <h4 className="font-bold text-green-900 mb-1">🔍 감사원</h4>
                            <p className="text-sm text-gray-600">국가 회계 감사, 직무 감찰, 공무원 징계</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm border-l-4 border-red-600">
                            <h4 className="font-bold text-red-900 mb-1">⚖️ 헌법재판소</h4>
                            <p className="text-sm text-gray-600">위헌법률심판, 탄핵심판, 헌법소원</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm border-l-4 border-indigo-600">
                            <h4 className="font-bold text-indigo-900 mb-1">🏛️ 법원행정처</h4>
                            <p className="text-sm text-gray-600">사법행정 총괄, 법원 및 군사법원 관리</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm border-l-4 border-orange-600">
                            <h4 className="font-bold text-orange-900 mb-1">🔎 고위공직자범죄수사처</h4>
                            <p className="text-sm text-gray-600">고위공직자 범죄 수사 및 기소</p>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                    <h3 className="font-bold text-yellow-900 mb-2">💡 AI 자동화 조직 운영</h3>
                    <ul className="text-sm text-yellow-800 space-y-1">
                        <li>• 위원 출석률 및 발언 분석 자동화</li>
                        <li>• 소관 기관별 법안 자동 분류 및 배정</li>
                        <li>• 법조인 출신 위원의 전문성 활용 최적화</li>
                        <li>• OpenHash 기반 위원회 의사록 실시간 기록</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
