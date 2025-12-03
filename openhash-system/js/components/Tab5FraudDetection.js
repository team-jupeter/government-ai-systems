const Tab5FraudDetection = () => {
    const [monitoring, setMonitoring] = React.useState(false);
    const [detectedAnomalies, setDetectedAnomalies] = React.useState([]);
    const [systemStatus, setSystemStatus] = React.useState('normal');

    const startMonitoring = () => {
        setMonitoring(true);
        setDetectedAnomalies([]);
        setSystemStatus('monitoring');

        // 시뮬레이션: 3초 후 이상 탐지
        setTimeout(() => {
            setDetectedAnomalies([
                {
                    id: 1,
                    node: 'Layer 2 - 부산 해운대구',
                    type: '해시 불일치',
                    severity: 'high',
                    action: '자동 차단',
                    timestamp: new Date().toISOString()
                }
            ]);
            setSystemStatus('anomaly_detected');
        }, 3000);

        // 5초 후 정상화
        setTimeout(() => {
            setSystemStatus('resolved');
            setMonitoring(false);
        }, 5000);
    };

    return (
        <div>
            <div className="mb-8">
                <h4 className="text-2xl font-bold text-gov-text mb-3">데이터 오염 탐지 및 위변조 방지</h4>
                <p className="text-gov-text-secondary leading-relaxed mb-4">
                    이상 탐지 에이전트(530)는 Isolation Forest 알고리즘을 사용하여 비정상 패턴을 실시간 감지합니다.
                    위변조 시도가 탐지되면 즉시 해당 노드와의 연결을 차단하고 상위 계층에 보고합니다.
                </p>
            </div>

            {/* AI 멀티에이전트 시스템 */}
            <div className="bg-gov-gray rounded-lg p-6 mb-8 border border-gov-border">
                <h5 className="font-bold text-gov-text mb-4">AI 멀티에이전트 시스템 (도면 7)</h5>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border-2 border-blue-500">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <i className="fas fa-gavel text-blue-600 text-xl"></i>
                            </div>
                            <div className="font-bold text-gov-text">법률 준수 검증 (510)</div>
                        </div>
                        <div className="text-sm text-gov-text-secondary">
                            LLM 기반으로 거래 내용이 법률 규정을 준수하는지 실시간 판정
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border-2 border-green-500">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <i className="fas fa-search text-green-600 text-xl"></i>
                            </div>
                            <div className="font-bold text-gov-text">설명 가능성 (520)</div>
                        </div>
                        <div className="text-sm text-gov-text-secondary">
                            SHAP 분석으로 AI 판단 근거를 투명하게 제공
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border-2 border-red-500">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                            </div>
                            <div className="font-bold text-gov-text">이상 탐지 (530)</div>
                        </div>
                        <div className="text-sm text-gov-text-secondary">
                            Isolation Forest로 비정상 거래 패턴 실시간 감지
                        </div>
                    </div>
                </div>
            </div>

            {/* 실시간 모니터링 시뮬레이터 */}
            <div className="bg-white rounded-lg p-6 border border-gov-border mb-8">
                <h5 className="font-bold text-gov-text mb-4">실시간 이상 탐지 시뮬레이터</h5>
                
                <button
                    onClick={startMonitoring}
                    disabled={monitoring}
                    className="px-6 py-3 bg-gov-blue text-white rounded font-bold hover:bg-gov-blue-light disabled:opacity-50 mb-6"
                >
                    <i className="fas fa-play mr-2"></i>
                    모니터링 시작
                </button>

                {/* 시스템 상태 */}
                <div className={`rounded-lg p-6 mb-6 border-2 ${
                    systemStatus === 'normal' ? 'bg-gray-50 border-gray-300' :
                    systemStatus === 'monitoring' ? 'bg-blue-50 border-blue-500' :
                    systemStatus === 'anomaly_detected' ? 'bg-red-50 border-red-500' :
                    'bg-green-50 border-green-500'
                }`}>
                    <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                            systemStatus === 'normal' ? 'bg-gray-200' :
                            systemStatus === 'monitoring' ? 'bg-blue-200 animate-pulse' :
                            systemStatus === 'anomaly_detected' ? 'bg-red-200' :
                            'bg-green-200'
                        }`}>
                            <i className={`fas ${
                                systemStatus === 'normal' ? 'fa-shield-alt text-gray-600' :
                                systemStatus === 'monitoring' ? 'fa-radar text-blue-600' :
                                systemStatus === 'anomaly_detected' ? 'fa-exclamation-triangle text-red-600' :
                                'fa-check-circle text-green-600'
                            } text-3xl`}></i>
                        </div>
                        <div>
                            <div className="text-xl font-bold text-gov-text">
                                {systemStatus === 'normal' && '대기 중'}
                                {systemStatus === 'monitoring' && '모니터링 진행 중...'}
                                {systemStatus === 'anomaly_detected' && '⚠️ 이상 탐지!'}
                                {systemStatus === 'resolved' && '✓ 해결 완료'}
                            </div>
                            <div className="text-sm text-gov-text-secondary">
                                {systemStatus === 'normal' && '시스템 정상 상태'}
                                {systemStatus === 'monitoring' && 'AI 에이전트가 네트워크 감시 중'}
                                {systemStatus === 'anomaly_detected' && '위변조 시도 탐지 및 차단 조치'}
                                {systemStatus === 'resolved' && '악성 노드 격리 완료, 시스템 정상화'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 탐지된 이상 목록 */}
                {detectedAnomalies.length > 0 && (
                    <div className="space-y-3">
                        <h6 className="font-bold text-red-700">탐지된 이상 항목</h6>
                        {detectedAnomalies.map(anomaly => (
                            <div key={anomaly.id} className="bg-red-50 border-2 border-red-500 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <div className="font-bold text-red-800">{anomaly.node}</div>
                                        <div className="text-sm text-red-600">{anomaly.type}</div>
                                    </div>
                                    <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded">
                                        위험도: {anomaly.severity.toUpperCase()}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-red-700 font-medium">조치 사항:</span>
                                        <span className="ml-2 text-gov-text">{anomaly.action}</span>
                                    </div>
                                    <div>
                                        <span className="text-red-700 font-medium">탐지 시각:</span>
                                        <span className="ml-2 text-gov-text font-mono text-xs">
                                            {new Date(anomaly.timestamp).toLocaleString('ko-KR')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 위변조 방지 메커니즘 */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-purple-500 rounded-lg p-6 bg-purple-50">
                    <h5 className="font-bold text-purple-800 mb-4 flex items-center gap-2">
                        <i className="fas fa-lock"></i>
                        암호학적 보안
                    </h5>
                    <ul className="space-y-2 text-sm text-gov-text">
                        <li className="flex gap-2">
                            <i className="fas fa-check text-purple-600 mt-1"></i>
                            <span><strong>SHA-256 해싱:</strong> 원본 데이터 변조 즉시 탐지</span>
                        </li>
                        <li className="flex gap-2">
                            <i className="fas fa-check text-purple-600 mt-1"></i>
                            <span><strong>BLS 서명:</strong> 집약 가능한 디지털 서명</span>
                        </li>
                        <li className="flex gap-2">
                            <i className="fas fa-check text-purple-600 mt-1"></i>
                            <span><strong>CRYSTALS-Dilithium:</strong> 포스트퀀텀 암호화</span>
                        </li>
                        <li className="flex gap-2">
                            <i className="fas fa-check text-purple-600 mt-1"></i>
                            <span><strong>Merkle Tree:</strong> 효율적 무결성 검증</span>
                        </li>
                    </ul>
                </div>

                <div className="border-2 border-orange-500 rounded-lg p-6 bg-orange-50">
                    <h5 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
                        <i className="fas fa-network-wired"></i>
                        네트워크 방어
                    </h5>
                    <ul className="space-y-2 text-sm text-gov-text">
                        <li className="flex gap-2">
                            <i className="fas fa-check text-orange-600 mt-1"></i>
                            <span><strong>상향식 감시:</strong> 하위 노드가 상위 계층 검증</span>
                        </li>
                        <li className="flex gap-2">
                            <i className="fas fa-check text-orange-600 mt-1"></i>
                            <span><strong>자동 차단:</strong> 이상 노드 즉시 격리</span>
                        </li>
                        <li className="flex gap-2">
                            <i className="fas fa-check text-orange-600 mt-1"></i>
                            <span><strong>다수결 원칙:</strong> 복수 노드 합의로 판정</span>
                        </li>
                        <li className="flex gap-2">
                            <i className="fas fa-check text-orange-600 mt-1"></i>
                            <span><strong>실시간 모니터링:</strong> AI 에이전트 24/7 감시</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
