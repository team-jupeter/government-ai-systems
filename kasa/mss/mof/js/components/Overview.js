const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-3xl font-bold text-gray-900">해양수산부 개요</h2>
                <p className="text-gray-600 mt-2">Ministry of Oceans and Fisheries</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg p-6 text-white">
                    <div className="text-sm opacity-90">관할 해역</div>
                    <div className="text-3xl font-bold mt-2">447,000㎢</div>
                    <div className="text-sm mt-1">배타적 경제수역</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                    <div className="text-sm opacity-90">수산물 생산량</div>
                    <div className="text-3xl font-bold mt-2">335만톤</div>
                    <div className="text-sm mt-1">연간 생산량(2024)</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg p-6 text-white">
                    <div className="text-sm opacity-90">항만 물동량</div>
                    <div className="text-3xl font-bold mt-2">15.8억톤</div>
                    <div className="text-sm mt-1">연간 처리량(2024)</div>
                </div>
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-6 text-white">
                    <div className="text-sm opacity-90">AI 자동화율</div>
                    <div className="text-3xl font-bold mt-2">98.5%</div>
                    <div className="text-sm mt-1">DeepSeek R1 기반</div>
                </div>
            </div>

            <div className="bg-teal-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🌊 기관 소개</h3>
                <div className="text-gray-700 space-y-3 leading-relaxed">
                    <p>해양수산부는 <span className="font-semibold text-teal-700">해양정책, 수산, 어촌개발, 해운·항만, 해양환경</span> 등 해양 및 수산 관련 정책을 총괄하는 중앙행정기관입니다.</p>
                    <p>1996년 설립된 이래, 대한민국의 해양 영토 447,000㎢를 관리하며, 바다에서 새로운 가치를 창출하고 국민의 해양 복지 증진을 위해 노력하고 있습니다.</p>
                    <p>2025년 현재, <span className="font-semibold text-teal-700">DeepSeek R1 AI 에이전트와 OpenHash 블록체인</span>을 활용하여 수산물 유통, 항만 관리, 해양환경 감시 등 핵심 업무의 98.5%를 자동화하고 있습니다.</p>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 주요 기능</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-l-4 border-teal-500 bg-white p-4 rounded shadow-sm">
                        <h4 className="font-bold text-teal-700 mb-2">🐟 수산 정책</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>• 수산자원 관리 및 어업 허가</li>
                            <li>• 어촌 개발 및 어업인 복지</li>
                            <li>• 수산물 유통 및 품질 관리</li>
                            <li>• 양식업 육성 및 기술 개발</li>
                        </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 bg-white p-4 rounded shadow-sm">
                        <h4 className="font-bold text-blue-700 mb-2">🚢 해운·항만</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>• 해운 산업 육성 및 선박 관리</li>
                            <li>• 항만 건설 및 운영</li>
                            <li>• 해상 물류 체계 구축</li>
                            <li>• 선원 교육 및 자격 관리</li>
                        </ul>
                    </div>
                    <div className="border-l-4 border-cyan-500 bg-white p-4 rounded shadow-sm">
                        <h4 className="font-bold text-cyan-700 mb-2">🌊 해양 정책</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>• 해양 영토 관리 및 보호</li>
                            <li>• 해양자원 개발 및 조사</li>
                            <li>• 해양과학기술 연구개발</li>
                            <li>• 해양 레저·관광 진흥</li>
                        </ul>
                    </div>
                    <div className="border-l-4 border-indigo-500 bg-white p-4 rounded shadow-sm">
                        <h4 className="font-bold text-indigo-700 mb-2">♻️ 해양 환경</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>• 해양환경 보전 및 오염 방지</li>
                            <li>• 연안 관리 및 해양보호구역</li>
                            <li>• 해양생태계 복원</li>
                            <li>• 해양쓰레기 관리</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">🤖 AI 자동화 현황</h3>
                <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-bold text-teal-700 mb-3">자동화 업무</h4>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm text-gray-700">수산물 유통 관리</span>
                                        <span className="text-sm font-bold text-teal-600">99%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-teal-500 h-2 rounded-full" style={{width: '99%'}}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm text-gray-700">항만 물동량 처리</span>
                                        <span className="text-sm font-bold text-blue-600">99%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '99%'}}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm text-gray-700">해양환경 감시</span>
                                        <span className="text-sm font-bold text-cyan-600">98%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-cyan-500 h-2 rounded-full" style={{width: '98%'}}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm text-gray-700">어업 허가 심사</span>
                                        <span className="text-sm font-bold text-indigo-600">97%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-indigo-500 h-2 rounded-full" style={{width: '97%'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-blue-700 mb-3">AI 기술 적용</h4>
                            <ul className="text-sm text-gray-700 space-y-2">
                                <li className="flex items-start">
                                    <span className="text-teal-500 mr-2">✓</span>
                                    <span><strong>수산물 원산지 검증:</strong> 블록체인 기반 유통 이력 추적</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-teal-500 mr-2">✓</span>
                                    <span><strong>스마트 항만:</strong> 실시간 선박 입출항 자동 처리</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-teal-500 mr-2">✓</span>
                                    <span><strong>해양환경 AI 분석:</strong> 위성·센서 데이터 실시간 모니터링</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-teal-500 mr-2">✓</span>
                                    <span><strong>어장 예측 시스템:</strong> 해양 빅데이터 기반 어황 정보 제공</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">🔐 OpenHash 블록체인 적용</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <h4 className="font-bold text-blue-800 mb-2">적용 분야</h4>
                        <ul className="space-y-1 text-gray-700">
                            <li>• 수산물 원산지 및 유통 이력 관리</li>
                            <li>• 항만 물류 데이터 위변조 방지</li>
                            <li>• 선박 등록 및 검사 기록 보존</li>
                            <li>• 어업 허가 및 쿼터 관리</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-blue-800 mb-2">기대 효과</h4>
                        <ul className="space-y-1 text-gray-700">
                            <li>• 수산물 안전성 98.7% 향상</li>
                            <li>• 물류 처리 시간 65% 단축</li>
                            <li>• 행정 비용 72% 절감</li>
                            <li>• 에너지 효율 98.5% 개선</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

(() => Overview)();
