const Statistics = () => {
    const monthlyData = [143, 156, 148, 167, 159, 174, 181, 176, 185, 193, 187, 178];
    const maxValue = Math.max(...monthlyData);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">📊 법제사법위원회 통계 대시보드</h2>
            
            <div className="grid md:grid-cols-5 gap-4">
                <StatCard title="연간 법안 심사" value="1,847건" icon="⚖️" />
                <StatCard title="체계자구 수정" value="3,241건" icon="✏️" />
                <StatCard title="위헌 차단" value="12건" icon="🚨" />
                <StatCard title="법안 통과율" value="87.3%" icon="✓" />
                <StatCard title="평균 심사일" value="23일" icon="⏱️" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-bold text-lg mb-4">📈 월별 법안 처리 현황 (2024)</h3>
                    <div className="h-64 flex items-end justify-around border-b-2 border-gray-300 gap-1">
                        {monthlyData.map((value, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center justify-end group">
                                <div className="text-xs font-semibold text-blue-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {value}건
                                </div>
                                <div 
                                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all rounded-t cursor-pointer" 
                                    style={{height: `${(value / maxValue) * 100}%`}}
                                    title={`${i+1}월: ${value}건`}
                                ></div>
                                <div className="text-xs text-gray-600 mt-1">{i+1}월</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                        <p>총 처리: <strong className="text-blue-600">2,047건</strong> | 평균: <strong className="text-blue-600">171건/월</strong></p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-bold text-lg mb-4">🏢 소관 기관별 법안 분포</h3>
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium">법무부</span>
                                <span className="text-blue-600 font-bold">687건 (37.2%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-blue-600 h-3 rounded-full" style={{width: '37.2%'}}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium">법제처</span>
                                <span className="text-purple-600 font-bold">423건 (22.9%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-purple-600 h-3 rounded-full" style={{width: '22.9%'}}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium">법원행정처</span>
                                <span className="text-indigo-600 font-bold">298건 (16.1%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-indigo-600 h-3 rounded-full" style={{width: '16.1%'}}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium">감사원</span>
                                <span className="text-green-600 font-bold">234건 (12.7%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-green-600 h-3 rounded-full" style={{width: '12.7%'}}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium">헌법재판소</span>
                                <span className="text-red-600 font-bold">156건 (8.4%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-red-600 h-3 rounded-full" style={{width: '8.4%'}}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium">공수처</span>
                                <span className="text-orange-600 font-bold">49건 (2.7%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-orange-600 h-3 rounded-full" style={{width: '2.7%'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-bold text-lg mb-4">📋 법안 유형별 통계</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                    54%
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">의원 발의</p>
                                    <p className="text-sm text-gray-600">997건</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                    31%
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">정부 제출</p>
                                    <p className="text-sm text-gray-600">573건</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                                    15%
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">위원회 대안</p>
                                    <p className="text-sm text-gray-600">277건</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-bold text-lg mb-4">⚖️ 심사 결과 분석</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded border-l-4 border-green-600">
                            <span className="font-medium">원안 가결</span>
                            <span className="text-2xl font-bold text-green-600">1,243건</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded border-l-4 border-blue-600">
                            <span className="font-medium">수정 가결</span>
                            <span className="text-2xl font-bold text-blue-600">369건</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded border-l-4 border-yellow-600">
                            <span className="font-medium">계류 중</span>
                            <span className="text-2xl font-bold text-yellow-600">187건</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded border-l-4 border-red-600">
                            <span className="font-medium">부결/폐기</span>
                            <span className="text-2xl font-bold text-red-600">48건</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg mb-4">🤖 AI 자동화 효율성 분석</h3>
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">AI 1차 검토율</p>
                        <p className="text-4xl font-bold text-blue-600">89%</p>
                        <p className="text-xs text-gray-500 mt-1">1,644건 / 1,847건</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">AI 권고 수용률</p>
                        <p className="text-4xl font-bold text-green-600">78%</p>
                        <p className="text-xs text-gray-500 mt-1">위원 재량 22%</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">처리 시간 단축</p>
                        <p className="text-4xl font-bold text-purple-600">73%</p>
                        <p className="text-xs text-gray-500 mt-1">23일 → 6일</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">비용 절감</p>
                        <p className="text-4xl font-bold text-orange-600">64%</p>
                        <p className="text-xs text-gray-500 mt-1">약 47억원 절감</p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-bold text-lg mb-4 text-red-600">🚨 위헌 요소 탐지</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between p-2 bg-red-50 rounded">
                            <span>기본권 침해</span>
                            <strong className="text-red-600">5건</strong>
                        </div>
                        <div className="flex justify-between p-2 bg-red-50 rounded">
                            <span>과잉금지 위반</span>
                            <strong className="text-red-600">3건</strong>
                        </div>
                        <div className="flex justify-between p-2 bg-red-50 rounded">
                            <span>평등권 침해</span>
                            <strong className="text-red-600">2건</strong>
                        </div>
                        <div className="flex justify-between p-2 bg-red-50 rounded">
                            <span>법률유보 위반</span>
                            <strong className="text-red-600">2건</strong>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-bold text-lg mb-4 text-purple-600">✏️ 체계자구 수정 유형</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between p-2 bg-purple-50 rounded">
                            <span>용어 통일</span>
                            <strong className="text-purple-600">1,247건</strong>
                        </div>
                        <div className="flex justify-between p-2 bg-purple-50 rounded">
                            <span>조문 번호 정렬</span>
                            <strong className="text-purple-600">892건</strong>
                        </div>
                        <div className="flex justify-between p-2 bg-purple-50 rounded">
                            <span>문법 수정</span>
                            <strong className="text-purple-600">634건</strong>
                        </div>
                        <div className="flex justify-between p-2 bg-purple-50 rounded">
                            <span>논리적 모순</span>
                            <strong className="text-purple-600">468건</strong>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-bold text-lg mb-4 text-blue-600">⏱️ 심사 기간 분석</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between p-2 bg-blue-50 rounded">
                            <span>1주 이내</span>
                            <strong className="text-blue-600">423건 (23%)</strong>
                        </div>
                        <div className="flex justify-between p-2 bg-blue-50 rounded">
                            <span>1-4주</span>
                            <strong className="text-blue-600">876건 (47%)</strong>
                        </div>
                        <div className="flex justify-between p-2 bg-blue-50 rounded">
                            <span>1-2개월</span>
                            <strong className="text-blue-600">398건 (22%)</strong>
                        </div>
                        <div className="flex justify-between p-2 bg-blue-50 rounded">
                            <span>2개월 이상</span>
                            <strong className="text-blue-600">150건 (8%)</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-5 rounded-lg">
                <h3 className="font-bold text-lg mb-2 text-blue-900">📊 주요 성과 요약</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                        <p className="text-gray-700 mb-1">✓ 체계·자구 심사를 통한 법률 완성도 향상</p>
                        <p className="text-xs text-gray-600">3,241건 수정으로 법령 체계 일관성 확보</p>
                    </div>
                    <div>
                        <p className="text-gray-700 mb-1">✓ AI 기반 위헌 요소 사전 차단</p>
                        <p className="text-xs text-gray-600">연 12건 위헌 법률 본회의 상정 전 차단</p>
                    </div>
                    <div>
                        <p className="text-gray-700 mb-1">✓ OpenHash 기반 투명성 확보</p>
                        <p className="text-xs text-gray-600">모든 심사 과정 위변조 불가능 기록</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
