const { useState, useEffect } = React;

function Tab3AIAgent() {
    const [anomalies, setAnomalies] = useState([]);
    const [healthStatus, setHealthStatus] = useState({
        edge: { healthy: 9, warning: 1, critical: 0 },
        layer1: { healthy: 4, warning: 1, critical: 0 },
        layer2: { healthy: 2, warning: 0, critical: 0 },
        layer3: { healthy: 2, warning: 0, critical: 0 },
        layer4: { healthy: 1, warning: 0, critical: 0 }
    });

    // 실시간 이상 탐지 시뮬레이션
    useEffect(() => {
        const interval = setInterval(() => {
            const anomalyTypes = [
                {
                    type: 'high_frequency',
                    node: `직원${Math.floor(Math.random() * 10) + 1} (Edge)`,
                    description: '짧은 시간 내 과도한 Hash 발생',
                    threshold: '100회/분',
                    actual: `${120 + Math.floor(Math.random() * 50)}회/분`,
                    severity: 'warning',
                    action: 'Isolation Forest 분석 진행 중'
                },
                {
                    type: 'slow_response',
                    node: `Layer ${Math.floor(Math.random() * 3) + 1}`,
                    description: '응답 시간 지연',
                    threshold: '평균 18ms',
                    actual: `${45 + Math.floor(Math.random() * 30)}ms`,
                    severity: 'warning',
                    action: '네트워크 지연 패턴 분석'
                },
                {
                    type: 'low_frequency',
                    node: `직원${Math.floor(Math.random() * 10) + 1} (Edge)`,
                    description: 'Hash 발생 빈도 현저히 낮음',
                    threshold: '평균 10회/시간',
                    actual: `${1 + Math.floor(Math.random() * 3)}회/시간`,
                    severity: 'info',
                    action: '활동 패턴 모니터링'
                },
                {
                    type: 'signature_failure',
                    node: `Layer ${Math.floor(Math.random() * 4) + 1}`,
                    description: 'BLS 서명 검증 실패율 증가',
                    threshold: '< 5%',
                    actual: `${6 + Math.floor(Math.random() * 3)}%`,
                    severity: 'critical',
                    action: '즉시 연결 차단 및 블랙리스트 등재'
                }
            ];

            const newAnomaly = anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)];
            newAnomaly.timestamp = new Date().toLocaleTimeString('ko-KR');
            
            setAnomalies(prev => [newAnomaly, ...prev].slice(0, 5));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-gov-blue p-4">
                <p className="text-sm text-gov-text">
                    <span className="font-bold text-gov-blue">AI 검증 시스템</span>은 
                    오픈해시 네트워크의 건강을 지키는 파수꾼으로, 
                    <span className="font-bold">Isolation Forest 알고리즘</span>으로 이상을 탐지하고, 
                    상향식 감시(320)와 하향식 검증(310)으로 상호 건강성을 실시간 확인합니다.
                </p>
            </div>

            {/* 네트워크 건강 상태 */}
            <div className="bg-white border-2 border-gov-border rounded-lg p-6">
                <h4 className="text-base font-bold text-gov-text mb-4">
                    <i className="fas fa-heartbeat mr-2"></i>
                    네트워크 건강 상태 (실시간)
                </h4>
                <div className="grid grid-cols-5 gap-3">
                    {Object.entries(healthStatus).map(([layer, status]) => (
                        <div key={layer} className="bg-gray-50 rounded-lg p-3 text-center">
                            <div className="text-xs font-semibold text-gray-600 mb-2">
                                {layer === 'edge' ? 'Edge' : layer.toUpperCase()}
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-green-600">정상</span>
                                    <span className="font-bold text-green-600">{status.healthy}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-yellow-600">주의</span>
                                    <span className="font-bold text-yellow-600">{status.warning}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-red-600">위험</span>
                                    <span className="font-bold text-red-600">{status.critical}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 이상 탐지 현황 */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-4 border-red-500 rounded-lg p-6">
                <h4 className="text-lg font-bold text-red-700 mb-4">
                    <i className="fas fa-exclamation-triangle mr-2"></i>
                    실시간 이상 탐지 (Isolation Forest)
                </h4>
                <div className="space-y-3">
                    {anomalies.length === 0 ? (
                        <div className="text-center text-gray-500 py-4">
                            이상 징후 감지 중...
                        </div>
                    ) : (
                        anomalies.map((anomaly, idx) => (
                            <div key={idx} className={`bg-white rounded-lg p-4 border-l-4 ${
                                anomaly.severity === 'critical' ? 'border-red-500' :
                                anomaly.severity === 'warning' ? 'border-yellow-500' :
                                'border-blue-500'
                            }`}>
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                anomaly.severity === 'critical' ? 'bg-red-100 text-red-700' :
                                                anomaly.severity === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-blue-100 text-blue-700'
                                            }`}>
                                                {anomaly.severity === 'critical' ? '위험' :
                                                 anomaly.severity === 'warning' ? '주의' : '정보'}
                                            </span>
                                            <span className="font-bold text-sm">{anomaly.node}</span>
                                        </div>
                                        <div className="text-sm text-gray-700 mb-2">{anomaly.description}</div>
                                        <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                                            <div>
                                                <span className="text-gray-600">임계값: </span>
                                                <span className="font-semibold">{anomaly.threshold}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">실제값: </span>
                                                <span className="font-semibold text-red-600">{anomaly.actual}</span>
                                            </div>
                                        </div>
                                        <div className="text-xs text-blue-600">
                                            <i className="fas fa-cog mr-1"></i>
                                            {anomaly.action}
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500 ml-2">
                                        {anomaly.timestamp}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* AI 검증 메커니즘 */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                    <h4 className="text-base font-bold text-green-700 mb-3">
                        <i className="fas fa-arrow-up mr-2"></i>
                        상향식 감시 모듈 (320)
                    </h4>
                    <div className="text-xs space-y-2">
                        <div className="bg-white rounded p-2">
                            <div className="font-semibold mb-1">감시 대상</div>
                            <div className="text-gray-700">상위 계층 Representative 노드(210)의 비정상 동작</div>
                        </div>
                        <div className="bg-white rounded p-2">
                            <div className="font-semibold mb-1">검증 항목</div>
                            <ul className="text-gray-700 space-y-1">
                                <li>• 응답 지연 (평균 대비 3배 이상)</li>
                                <li>• BLS 서명 실패율 (5% 임계값)</li>
                                <li>• 데이터 불일치 탐지</li>
                                <li>• 네트워크 지연 패턴 분석</li>
                            </ul>
                        </div>
                        <div className="bg-white rounded p-2">
                            <div className="font-semibold mb-1">대응 조치</div>
                            <div className="text-gray-700">
                                이상 감지 시 <span className="font-bold text-red-600">즉시 연결 차단(620)</span>, 
                                정상 노드로 전환, 24시간 블랙리스트
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-purple-50 border-2 border-purple-500 rounded-lg p-4">
                    <h4 className="text-base font-bold text-purple-700 mb-3">
                        <i className="fas fa-arrow-down mr-2"></i>
                        하향식 검증 모듈 (310)
                    </h4>
                    <div className="text-xs space-y-2">
                        <div className="bg-white rounded p-2">
                            <div className="font-semibold mb-1">검증 대상</div>
                            <div className="text-gray-700">하위 계층 노드가 전송한 Hash 및 서명</div>
                        </div>
                        <div className="bg-white rounded p-2">
                            <div className="font-semibold mb-1">검증 항목</div>
                            <ul className="text-gray-700 space-y-1">
                                <li>• BLS 서명 검증 (쌍선형 사상)</li>
                                <li>• Merkle Proof 검증</li>
                                <li>• 타임스탬프 검증 (±5분)</li>
                                <li>• 데이터 무결성 확인</li>
                            </ul>
                        </div>
                        <div className="bg-white rounded p-2">
                            <div className="font-semibold mb-1">대응 조치</div>
                            <div className="text-gray-700">
                                검증 실패 시 <span className="font-bold text-red-600">즉시 격리(620)</span>, 
                                복구 시 7일 집중 모니터링
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Isolation Forest 이상 탐지 */}
            <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-4">
                <h4 className="text-base font-bold text-yellow-700 mb-3">
                    <i className="fas fa-brain mr-2"></i>
                    Isolation Forest 이상 탐지 알고리즘 (530)
                </h4>
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white rounded p-3">
                        <div className="font-semibold text-sm mb-2">과도한 Hash 발생</div>
                        <div className="text-xs text-gray-700">
                            짧은 시간(1분) 내 임계값(100회) 이상의 Hash 발생 시 
                            DDoS 공격 또는 비정상 동작으로 판단
                        </div>
                    </div>
                    <div className="bg-white rounded p-3">
                        <div className="font-semibold text-sm mb-2">응답 지연 패턴</div>
                        <div className="text-xs text-gray-700">
                            평균 응답 시간(18ms) 대비 3배 이상 지연 시 
                            네트워크 문제 또는 노드 과부하 판단
                        </div>
                    </div>
                    <div className="bg-white rounded p-3">
                        <div className="font-semibold text-sm mb-2">비정상 활동 패턴</div>
                        <div className="text-xs text-gray-700">
                            평균 대비 현저히 낮거나 높은 Hash 발생 빈도를 
                            ML 기반으로 실시간 탐지
                        </div>
                    </div>
                </div>
            </div>

            {/* Hash 교환 시 상호 건강성 확인 */}
            <div className="bg-indigo-50 border-2 border-indigo-500 rounded-lg p-4">
                <h4 className="text-base font-bold text-indigo-700 mb-3">
                    <i className="fas fa-exchange-alt mr-2"></i>
                    Hash 교환 시 상호 건강성 확인 프로세스
                </h4>
                <div className="space-y-2 text-sm">
                    <div className="bg-white rounded p-3 flex items-start space-x-3">
                        <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-blue-600">1</span>
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold mb-1">요청 시 검증 (Edge → Layer)</div>
                            <div className="text-xs text-gray-700">
                                Edge가 Hash 전송 시 타임스탬프 포함, Layer는 ±5분 범위 외 거부하여 
                                재전송 공격(Replay Attack) 방어
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded p-3 flex items-start space-x-3">
                        <div className="bg-red-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-red-600">2</span>
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold mb-1">응답 시 검증 (Layer → Edge)</div>
                            <div className="text-xs text-gray-700">
                                Layer가 BLS 서명 첨부하여 응답, Edge는 쌍선형 사상 
                                e(서명, g) = e(H(메시지), 공개키) 등식 확인
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded p-3 flex items-start space-x-3">
                        <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-green-600">3</span>
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold mb-1">지속적 모니터링</div>
                            <div className="text-xs text-gray-700">
                                모든 Hash 교환 시 응답 시간, 서명 검증률, 데이터 일관성을 
                                실시간 모니터링하여 이상 징후 즉시 탐지
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI 검증의 핵심 역할 */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                <h4 className="text-base font-bold text-green-700 mb-3">
                    <i className="fas fa-user-shield mr-2"></i>
                    AI 검증: 오픈해시 네트워크의 파수꾼
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>✅ <span className="font-bold">실시간 이상 탐지</span>: Isolation Forest로 비정상 패턴 즉시 감지</li>
                    <li>✅ <span className="font-bold">상호 건강성 확인</span>: 모든 Hash 교환 시 양방향 검증</li>
                    <li>✅ <span className="font-bold">자동 격리 조치</span>: 이상 노드 즉시 차단 및 블랙리스트 등재</li>
                    <li>✅ <span className="font-bold">예방적 모니터링</span>: 과도한/저조한 활동 패턴 사전 감지</li>
                    <li>✅ <span className="font-bold">네트워크 안정성</span>: 99.97% 합의 성공률 유지</li>
                </ul>
            </div>
        </div>
    );
}
