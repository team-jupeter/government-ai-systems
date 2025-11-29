const OpenHashInfo = () => {
    const [selectedSection, setSelectedSection] = React.useState('overview');

    const sections = [
        { id: 'overview', name: '개요', icon: 'fa-info-circle' },
        { id: 'traffic', name: '교통 데이터 적용', icon: 'fa-car' },
        { id: 'security', name: '보안 메커니즘', icon: 'fa-shield-alt' },
        { id: 'verification', name: '검증 프로세스', icon: 'fa-check-circle' }
    ];

    const trafficApplications = [
        { icon: '🚗', title: '차량 위치', desc: '모든 차량의 실시간 GPS 좌표를 암호학적으로 검증' },
        { icon: '⚡', title: '속도 데이터', desc: '차량 속도의 정확성 보장 - 허위 속도는 사고 유발' },
        { icon: '🗺️', title: '경로 명령', desc: '중앙 서버의 경로 지시가 변조되지 않았음을 증명' },
        { icon: '👤', title: '승객 매칭', desc: '승객-차량 배정 기록의 무결성 보장' },
        { icon: '📦', title: '화물 추적', desc: '화물 이동 경로 및 상태의 진실성 검증' },
        { icon: '🔧', title: '차량 상태', desc: '배터리, 센서, 정비 기록의 위변조 방지' }
    ];

    const verificationSteps = [
        { step: 1, title: '데이터 생성', desc: '차량/서버에서 데이터 생성', color: 'blue' },
        { step: 2, title: '해시 생성', desc: '데이터의 고유 디지털 지문 생성', color: 'indigo' },
        { step: 3, title: '분산 기록', desc: '17개 광역 노드에 동시 기록', color: 'purple' },
        { step: 4, title: '합의 검증', desc: '과반수 노드의 합의로 확정', color: 'pink' },
        { step: 5, title: '타임스탬프', desc: '변경 불가능한 시간 증명 추가', color: 'red' },
        { step: 6, title: '체인 연결', desc: '이전 기록과 암호학적 연결', color: 'orange' }
    ];

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border border-cyan-500/30 rounded-xl p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-link text-3xl"></i>
                </div>
                <h1 className="text-3xl font-bold mb-2">OpenHash</h1>
                <p className="text-gray-400 text-lg">데이터 진실성 보장 기술</p>
                <div className="mt-4 flex justify-center gap-4">
                    <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm">
                        <i className="fas fa-check-circle mr-2"></i>검증됨
                    </span>
                    <span className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-sm">
                        <i className="fas fa-clock mr-2"></i>실시간
                    </span>
                    <span className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm">
                        <i className="fas fa-network-wired mr-2"></i>분산 검증
                    </span>
                </div>
            </div>

            {/* 섹션 탭 */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {sections.map(section => (
                    <button
                        key={section.id}
                        onClick={() => setSelectedSection(section.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                            selectedSection === section.id
                                ? 'bg-cyan-600 text-white'
                                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                        }`}
                    >
                        <i className={`fas ${section.icon}`}></i>
                        {section.name}
                    </button>
                ))}
            </div>

            {/* 개요 섹션 */}
            {selectedSection === 'overview' && (
                <div className="space-y-6">
                    <div className="bg-gray-800 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-cyan-400 mb-4">왜 데이터 진실성이 중요한가?</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                                <h4 className="font-bold text-red-400 mb-2">❌ 허위 데이터의 위험</h4>
                                <ul className="text-sm text-gray-400 space-y-2">
                                    <li>• 잘못된 속도 정보 → 충돌 사고</li>
                                    <li>• 허위 위치 데이터 → 경로 혼선</li>
                                    <li>• 조작된 센서 값 → 안전 시스템 마비</li>
                                    <li>• 변조된 명령 → 차량 통제 불능</li>
                                </ul>
                            </div>
                            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                                <h4 className="font-bold text-green-400 mb-2">✅ OpenHash의 보장</h4>
                                <ul className="text-sm text-gray-400 space-y-2">
                                    <li>• 모든 데이터의 출처 증명</li>
                                    <li>• 전송 중 변조 즉시 감지</li>
                                    <li>• 시간 순서 보장</li>
                                    <li>• 영구적 감사 추적</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-cyan-400 mb-4">기존 시스템과의 비교</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-700">
                                        <th className="text-left py-3 px-4">구분</th>
                                        <th className="text-left py-3 px-4">기존 중앙 DB</th>
                                        <th className="text-left py-3 px-4">블록체인</th>
                                        <th className="text-left py-3 px-4 text-cyan-400">OpenHash</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-400">
                                    <tr className="border-b border-gray-700/50">
                                        <td className="py-3 px-4">처리 속도</td>
                                        <td className="py-3 px-4">빠름</td>
                                        <td className="py-3 px-4 text-red-400">느림 (수 초)</td>
                                        <td className="py-3 px-4 text-green-400">초고속 (0.001ms)</td>
                                    </tr>
                                    <tr className="border-b border-gray-700/50">
                                        <td className="py-3 px-4">위변조 방지</td>
                                        <td className="py-3 px-4 text-red-400">취약</td>
                                        <td className="py-3 px-4">강함</td>
                                        <td className="py-3 px-4 text-green-400">강함</td>
                                    </tr>
                                    <tr className="border-b border-gray-700/50">
                                        <td className="py-3 px-4">에너지 효율</td>
                                        <td className="py-3 px-4">높음</td>
                                        <td className="py-3 px-4 text-red-400">매우 낮음</td>
                                        <td className="py-3 px-4 text-green-400">높음</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4">실시간 적합성</td>
                                        <td className="py-3 px-4">가능</td>
                                        <td className="py-3 px-4 text-red-400">불가능</td>
                                        <td className="py-3 px-4 text-green-400">최적</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* 교통 데이터 적용 섹션 */}
            {selectedSection === 'traffic' && (
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-cyan-400 mb-6">교통 시스템 적용 영역</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {trafficApplications.map((app, idx) => (
                            <div key={idx} className="bg-gray-700/50 rounded-xl p-5 hover:bg-gray-700 transition">
                                <div className="text-4xl mb-3">{app.icon}</div>
                                <h4 className="font-bold text-lg mb-2">{app.title}</h4>
                                <p className="text-sm text-gray-400">{app.desc}</p>
                                <div className="mt-3 flex items-center gap-2 text-xs text-green-400">
                                    <i className="fas fa-shield-alt"></i>
                                    <span>OpenHash 검증됨</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 보안 메커니즘 섹션 */}
            {selectedSection === 'security' && (
                <div className="space-y-6">
                    <div className="bg-gray-800 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-cyan-400 mb-4">3중 보안 구조</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-xl p-5">
                                <div className="text-3xl mb-3">🔐</div>
                                <h4 className="font-bold text-indigo-400 mb-2">암호화 해시</h4>
                                <p className="text-sm text-gray-400">SHA-3 256bit 해시로 데이터 고유 지문 생성</p>
                            </div>
                            <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-5">
                                <div className="text-3xl mb-3">🌐</div>
                                <h4 className="font-bold text-purple-400 mb-2">분산 저장</h4>
                                <p className="text-sm text-gray-400">17개 광역 노드에 동시 분산 기록</p>
                            </div>
                            <div className="bg-pink-900/30 border border-pink-500/30 rounded-xl p-5">
                                <div className="text-3xl mb-3">⏱️</div>
                                <h4 className="font-bold text-pink-400 mb-2">시간 증명</h4>
                                <p className="text-sm text-gray-400">변경 불가능한 타임스탬프 체인</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-red-400 mb-4">
                            <i className="fas fa-exclamation-triangle mr-2"></i>
                            허위 데이터 차단 시나리오
                        </h3>
                        <div className="bg-gray-800/50 rounded-lg p-4">
                            <div className="font-mono text-sm space-y-2">
                                <div className="text-yellow-400">[12:34:56.789] 차량 AV-SEL-00142에서 속도 데이터 수신</div>
                                <div className="text-gray-400">[12:34:56.790] OpenHash 검증 시작...</div>
                                <div className="text-red-400">[12:34:56.791] ⚠️ 해시 불일치 감지! 원본: 0x3f2a... / 수신: 0x8b1c...</div>
                                <div className="text-red-400">[12:34:56.792] 🚨 허위 데이터 차단됨</div>
                                <div className="text-cyan-400">[12:34:56.793] 이전 검증된 데이터로 대체 적용</div>
                                <div className="text-green-400">[12:34:56.794] ✅ 안전 운행 유지</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 검증 프로세스 섹션 */}
            {selectedSection === 'verification' && (
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-cyan-400 mb-6">6단계 검증 프로세스</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {verificationSteps.map((step) => (
                            <div key={step.step} className={`bg-${step.color}-900/20 border border-${step.color}-500/30 rounded-xl p-5`}>
                                <div className={`w-10 h-10 bg-${step.color}-500 rounded-full flex items-center justify-center mb-3 text-lg font-bold`}>
                                    {step.step}
                                </div>
                                <h4 className="font-bold mb-2">{step.title}</h4>
                                <p className="text-sm text-gray-400">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 외부 링크 */}
            <div className="bg-gray-800 rounded-xl p-6 text-center">
                <p className="text-gray-400 mb-4">OpenHash 기술에 대한 더 자세한 정보</p>
                <a 
                    href="http://100.30.14.224/openhash-system/" 
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 rounded-lg hover:from-cyan-500 hover:to-blue-500 transition"
                >
                    <i className="fas fa-external-link-alt"></i>
                    OpenHash 시스템 상세 페이지
                </a>
            </div>
        </div>
    );
};
