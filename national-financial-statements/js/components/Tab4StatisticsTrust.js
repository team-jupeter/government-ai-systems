const { useState } = React;

function Tab4StatisticsTrust() {
    const [statisticsProcess, setStatisticsProcess] = useState([]);
    const [modificationRequest, setModificationRequest] = useState(null);

    const simulateStatisticsProcess = () => {
        const steps = [
            { step: 1, name: '조사 계획', actor: '국가데이터처', time: '2025-01-01 09:00', hash: 'a1b2c3d4...', status: 'recorded' },
            { step: 2, name: '응답 수집', actor: '조사 대상 (Layer 1)', time: '2025-01-15 18:00', hash: 'e5f6g7h8...', status: 'recorded' },
            { step: 3, name: '광역 집계', actor: 'Layer 2 (17개 광역)', time: '2025-01-16 12:00', hash: 'i9j0k1l2...', status: 'recorded' },
            { step: 4, name: '국가 검증', actor: 'Layer 3 (10개 Core)', time: '2025-01-17 10:00', hash: 'm3n4o5p6...', status: 'recorded' },
            { step: 5, name: '최종 승인', actor: '국가데이터처 처장 (BLS 서명)', time: '2025-01-18 14:00', hash: 'q7r8s9t0...', status: 'approved' }
        ];
        setStatisticsProcess(steps);
    };

    const simulateModificationRequest = () => {
        setModificationRequest({
            requester: '대통령실 정책실',
            requestTime: '2025-01-19 16:30',
            reason: '실업률 통계 수정 요청',
            originalValue: '3.2%',
            requestedValue: '2.8%',
            recorded: true,
            blockchainHash: 'u1v2w3x4y5z6a7b8c9d0...',
            publiclyVisible: true,
            congressNotified: true,
            result: 'rejected'
        });
    };

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-gov-blue p-4">
                <p className="text-sm text-gov-text">
                    통계 생성 전 과정을 <span className="font-bold text-gov-blue">오픈해시에 타임스탬프 기록</span>하여 
                    정치적 압력을 차단하고 통계 작성 독립성을 보장합니다.
                </p>
            </div>

            {/* 통계 생성 프로세스 시뮬레이션 */}
            <div>
                <h4 className="text-base font-bold text-gov-text mb-3">통계 생성 프로세스</h4>
                <button
                    onClick={simulateStatisticsProcess}
                    className="w-full bg-gov-blue text-white py-3 rounded-lg font-bold hover:bg-gov-blue-light text-sm mb-4"
                >
                    <i className="fas fa-play mr-2"></i>
                    통계 생성 프로세스 시뮬레이션
                </button>

                {statisticsProcess.length > 0 && (
                    <div className="space-y-3">
                        {statisticsProcess.map((step, idx) => (
                            <div key={idx} className="bg-white border-2 border-gov-border rounded-lg p-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                            <div className="bg-gov-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                                {step.step}
                                            </div>
                                            <div className="font-bold text-sm">{step.name}</div>
                                        </div>
                                        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                                            <div>
                                                <span className="text-gray-600">담당자:</span>
                                                <span className="ml-1 font-semibold">{step.actor}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">시각:</span>
                                                <span className="ml-1 font-semibold">{step.time}</span>
                                            </div>
                                        </div>
                                        <div className="mt-2 bg-gray-50 p-2 rounded">
                                            <div className="text-xs text-gray-600">오픈해시 해시</div>
                                            <div className="font-mono text-xs break-all">{step.hash}</div>
                                        </div>
                                    </div>
                                    <div className={`ml-4 px-3 py-1 rounded text-xs font-semibold ${
                                        step.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                    }`}>
                                        {step.status === 'approved' ? '승인됨' : '기록됨'}
                                    </div>
                                </div>
                                {idx < statisticsProcess.length - 1 && (
                                    <div className="flex justify-center mt-2">
                                        <i className="fas fa-arrow-down text-gray-400"></i>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 수정 요청 기록 */}
            <div>
                <h4 className="text-base font-bold text-gov-text mb-3">정치적 압력 차단 메커니즘</h4>
                <button
                    onClick={simulateModificationRequest}
                    className="w-full bg-yellow-600 text-white py-3 rounded-lg font-bold hover:bg-yellow-700 text-sm mb-4"
                >
                    <i className="fas fa-exclamation-triangle mr-2"></i>
                    통계 수정 요청 시뮬레이션
                </button>

                {modificationRequest && (
                    <div className="bg-red-50 border-4 border-red-500 rounded-lg p-6">
                        <div className="text-center mb-4">
                            <i className="fas fa-shield-alt text-6xl text-red-600 mb-3"></i>
                            <h5 className="text-xl font-bold text-red-700 mb-2">
                                통계 수정 요청 감지 및 기록
                            </h5>
                        </div>

                        <div className="bg-white rounded-lg p-4 space-y-3">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <div className="text-xs text-gray-600">요청자</div>
                                    <div className="font-bold text-red-600">{modificationRequest.requester}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-600">요청 시각</div>
                                    <div className="font-semibold">{modificationRequest.requestTime}</div>
                                </div>
                            </div>

                            <div className="border-t-2 pt-3">
                                <div className="text-xs text-gray-600 mb-1">요청 사유</div>
                                <div className="font-semibold">{modificationRequest.reason}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-blue-50 p-3 rounded">
                                    <div className="text-xs text-gray-600">원본 통계</div>
                                    <div className="text-lg font-bold text-blue-600">{modificationRequest.originalValue}</div>
                                </div>
                                <div className="bg-red-50 p-3 rounded">
                                    <div className="text-xs text-gray-600">요청 수정값</div>
                                    <div className="text-lg font-bold text-red-600">{modificationRequest.requestedValue}</div>
                                </div>
                            </div>

                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3">
                                <div className="font-bold text-sm text-yellow-700 mb-2">
                                    <i className="fas fa-check-circle mr-1"></i>
                                    오픈해시 기록 완료
                                </div>
                                <div className="text-xs space-y-1">
                                    <div>✓ 오픈해시 해시: <span className="font-mono">{modificationRequest.blockchainHash}</span></div>
                                    <div>✓ 국회 통보: 완료</div>
                                    <div>✓ 국민 공개: 즉시</div>
                                    <div>✓ 결과: <span className="font-bold text-red-600">거부됨 (통계 작성 독립성 보장)</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 효과 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 text-center">
                    <i className="fas fa-ban text-3xl text-green-600 mb-2"></i>
                    <div className="font-bold text-sm">위변조 불가능</div>
                    <div className="text-xs text-gray-600 mt-1">오픈해시 타임스탬프</div>
                </div>
                <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4 text-center">
                    <i className="fas fa-eye text-3xl text-blue-600 mb-2"></i>
                    <div className="font-bold text-sm">투명한 감시</div>
                    <div className="text-xs text-gray-600 mt-1">국회·국민 조회 가능</div>
                </div>
                <div className="bg-purple-50 border-2 border-purple-500 rounded-lg p-4 text-center">
                    <i className="fas fa-chart-line text-3xl text-purple-600 mb-2"></i>
                    <div className="font-bold text-sm">신뢰도 향상</div>
                    <div className="text-xs text-gray-600 mt-1">+15%p 국민 신뢰</div>
                </div>
            </div>

            {/* 핵심 개념 */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                <h4 className="text-base font-bold text-green-700 mb-3">
                    <i className="fas fa-lightbulb mr-2"></i>
                    통계 신뢰성 보장의 핵심
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>✅ <span className="font-bold">전 과정 기록</span>: 조사 계획부터 최종 승인까지 모든 단계</li>
                    <li>✅ <span className="font-bold">압력 차단</span>: 정부·청와대 수정 요청 자동 기록 및 공개</li>
                    <li>✅ <span className="font-bold">BLS 서명</span>: 국가데이터처 처장 서명으로 신뢰성 보증</li>
                    <li>✅ <span className="font-bold">국민 감시</span>: 오픈해시 조회로 투명성 확보</li>
                    <li>✅ <span className="font-bold">독립성 지수</span>: 오픈해시 기반 국제 비교 가능</li>
                </ul>
            </div>
        </div>
    );
}
