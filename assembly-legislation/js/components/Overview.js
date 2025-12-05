const Overview = () => {
    return (
        <div className="space-y-6 animate-slide-in">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">⚖️ 법제사법위원회 개요</h2>
                <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                        법제사법위원회는 1948년 제헌국회부터 같은 명칭을 유지해온 가장 오래된 상임위원회로,
                        <strong className="text-blue-600"> 대한민국 국회에서 "사실상의 상원"</strong> 역할을 수행합니다.
                        모든 상임위원회를 통과한 법률안은 반드시 법사위의 체계·자구 심사를 거쳐야 하며,
                        이 과정에서 위헌 요소를 걸러내고 법률의 완성도를 높입니다.
                    </p>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                        <p className="text-sm text-yellow-800">
                            <strong>💡 핵심 특징:</strong> 법사위는 단순한 형식 심사가 아닌 실질적 심사를 수행하며,
                            법안이 "법사위를 통과했다"는 것은 곧 법안이 국회를 통과할 가능성이 매우 높다는 의미입니다.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-bold text-blue-900 mb-2">핵심 권한</h3>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• <strong>체계·자구 심사권</strong> - 모든 법안의 최종 관문</li>
                                <li>• <strong>탄핵 소추</strong> - 고위공직자 탄핵안 심사</li>
                                <li>• <strong>위헌 법률 방지</strong> - 연 10건 이상 사전 차단</li>
                                <li>• <strong>법률 체계 정합성</strong> - 기존 법령과의 충돌 방지</li>
                            </ul>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <h3 className="font-bold text-purple-900 mb-2">소관 기관 (6개)</h3>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• 법무부 (검찰·교정)</li>
                                <li>• 법제처 (법령 입안)</li>
                                <li>• 감사원 (국가 감사)</li>
                                <li>• 헌법재판소</li>
                                <li>• 법원행정처 (사법행정)</li>
                                <li>• 고위공직자범죄수사처</li>
                            </ul>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="font-bold text-green-900 mb-2">AI 자동화 영역</h3>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• 법안 체계·자구 자동 검토</li>
                                <li>• 위헌 요소 AI 탐지 시스템</li>
                                <li>• 법령 충돌 자동 분석</li>
                                <li>• 판례 DB 기반 법리 검토</li>
                                <li>• OpenHash 심사 과정 기록</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4">
                        <h3 className="font-bold text-red-900 mb-2">⚠️ 현재 쟁점</h3>
                        <p className="text-sm text-red-800">
                            체계·자구 심사권의 범위를 둘러싼 논란이 지속되고 있습니다. 
                            형식적 심사에 그쳐야 한다는 주장과 실질적 심사가 필요하다는 주장이 대립하며,
                            국회법 개정을 통해 60일 이상 계류 시 본회의 직접 상정이 가능하도록 보완되었습니다.
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
                <StatCard title="연간 심사 법안" value="1,847건" icon="📋" />
                <StatCard title="위헌 법률 차단" value="12건" icon="⚖️" />
                <StatCard title="AI 검토율" value="89%" icon="🤖" />
                <StatCard title="평균 심사일" value="23일" icon="⏱️" />
            </div>
        </div>
    );
};
