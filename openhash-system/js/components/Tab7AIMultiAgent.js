const Tab7AIMultiAgent = () => {
    const [selectedAgent, setSelectedAgent] = React.useState('legal');
    const [analysisRunning, setAnalysisRunning] = React.useState(false);
    const [analysisResult, setAnalysisResult] = React.useState(null);

    const runAnalysis = () => {
        setAnalysisRunning(true);
        setAnalysisResult(null);
        
        setTimeout(() => {
            setAnalysisResult({
                legal: { score: 95, status: 'pass', reason: '금융거래법 제47조 준수' },
                explainability: { score: 88, topFeatures: ['거래금액', '시간대', '위치'] },
                anomaly: { score: 12, status: 'normal', risk: 'low' }
            });
            setAnalysisRunning(false);
        }, 2000);
    };

    return (
        <div>
            <div className="mb-8">
                <h4 className="text-2xl font-bold text-gov-text mb-3">AI 멀티에이전트 시스템</h4>
                <p className="text-gov-text-secondary leading-relaxed mb-4">
                    3개의 전문화된 AI 에이전트가 협업하여 트랜잭션의 적법성, 설명 가능성, 이상 여부를 종합 검증합니다.
                    각 에이전트는 독립적으로 판단하며, 데이터 신뢰도 체인을 통해 최종 신뢰 점수를 산출합니다.
                    이를 통해 자동화된 검증 프로세스를 제공하면서도 투명성과 해석 가능성을 보장합니다.
                </p>
            </div>

            {/* 3개 에이전트 개요 */}
            <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                <div className="bg-indigo-600 text-white px-6 py-4">
                    <h4 className="text-lg font-bold flex items-center">
                        <i className="fas fa-users mr-3"></i>
                        3개 전문 에이전트 구성
                    </h4>
                </div>
                <div className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* 법률 준수 에이전트 */}
                        <div 
                            onClick={() => setSelectedAgent('legal')}
                            className={`border-2 rounded-lg p-5 cursor-pointer transition-all ${
                                selectedAgent === 'legal' 
                                    ? 'border-blue-500 bg-blue-50' 
                                    : 'border-gray-300 hover:border-blue-300'
                            }`}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <i className="fas fa-gavel text-blue-600 text-xl"></i>
                                </div>
                                <div className="font-bold text-gov-text">법률 준수 검증</div>
                            </div>
                            <div className="text-sm text-gov-text-secondary space-y-2">
                                <p><strong>기술:</strong> LLM 기반</p>
                                <p><strong>학습 데이터:</strong> 판례 10만건 Fine-tuning</p>
                                <p><strong>역할:</strong> 거래 내용의 법률 규정 준수 판정</p>
                            </div>
                        </div>

                        {/* 설명 가능성 에이전트 */}
                        <div 
                            onClick={() => setSelectedAgent('explainability')}
                            className={`border-2 rounded-lg p-5 cursor-pointer transition-all ${
                                selectedAgent === 'explainability' 
                                    ? 'border-green-500 bg-green-50' 
                                    : 'border-gray-300 hover:border-green-300'
                            }`}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <i className="fas fa-search text-green-600 text-xl"></i>
                                </div>
                                <div className="font-bold text-gov-text">설명 가능성</div>
                            </div>
                            <div className="text-sm text-gov-text-secondary space-y-2">
                                <p><strong>기술:</strong> SHAP 분석</p>
                                <p><strong>기법:</strong> Shapley Additive exPlanations</p>
                                <p><strong>역할:</strong> AI 판단 근거를 투명하게 제공</p>
                            </div>
                        </div>

                        {/* 이상 탐지 에이전트 */}
                        <div 
                            onClick={() => setSelectedAgent('anomaly')}
                            className={`border-2 rounded-lg p-5 cursor-pointer transition-all ${
                                selectedAgent === 'anomaly' 
                                    ? 'border-red-500 bg-red-50' 
                                    : 'border-gray-300 hover:border-red-300'
                            }`}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                                </div>
                                <div className="font-bold text-gov-text">이상 탐지</div>
                            </div>
                            <div className="text-sm text-gov-text-secondary space-y-2">
                                <p><strong>기술:</strong> Isolation Forest</p>
                                <p><strong>방식:</strong> 비정상 거래 패턴 감지</p>
                                <p><strong>역할:</strong> 실시간 이상 행동 탐지</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 에이전트 상세 정보 */}
            <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                <div className={`text-white px-6 py-4 ${
                    selectedAgent === 'legal' ? 'bg-blue-600' :
                    selectedAgent === 'explainability' ? 'bg-green-600' :
                    'bg-red-600'
                }`}>
                    <h4 className="text-lg font-bold">
                        {selectedAgent === 'legal' && '법률 준수 검증 에이전트 상세'}
                        {selectedAgent === 'explainability' && '설명 가능성 에이전트 상세'}
                        {selectedAgent === 'anomaly' && '이상 탐지 에이전트 상세'}
                    </h4>
                </div>
                <div className="p-6">
                    {selectedAgent === 'legal' && (
                        <div className="space-y-4">
                            <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
                                <h6 className="font-bold text-blue-900 mb-2">🤖 LLM 기반 법률 판정</h6>
                                <ul className="text-sm space-y-2 text-gov-text-secondary">
                                    <li>• <strong>모델:</strong> GPT-4 기반 법률 특화 Fine-tuning</li>
                                    <li>• <strong>학습 데이터:</strong> 대법원 판례 10만건, 법률 조문 5만건</li>
                                    <li>• <strong>정확도:</strong> 95.3% (전문가 검증 기준)</li>
                                    <li>• <strong>응답 시간:</strong> 평균 120ms</li>
                                </ul>
                            </div>
                            <div className="bg-white border border-blue-300 rounded-lg p-4">
                                <h6 className="font-bold text-gov-text mb-2">검증 프로세스</h6>
                                <ol className="text-sm space-y-2 text-gov-text-secondary list-decimal list-inside">
                                    <li>트랜잭션 내용 추출 및 전처리</li>
                                    <li>관련 법률 조항 자동 검색 (벡터 임베딩)</li>
                                    <li>유사 판례 매칭 (코사인 유사도 > 0.85)</li>
                                    <li>LLM 종합 판정 (적법성 점수 0-100)</li>
                                    <li>근거 조항 및 판례 번호 제시</li>
                                </ol>
                            </div>
                        </div>
                    )}

                    {selectedAgent === 'explainability' && (
                        <div className="space-y-4">
                            <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                                <h6 className="font-bold text-green-900 mb-2">📊 SHAP (SHapley Additive exPlanations)</h6>
                                <ul className="text-sm space-y-2 text-gov-text-secondary">
                                    <li>• <strong>원리:</strong> 게임 이론의 Shapley Value를 ML에 적용</li>
                                    <li>• <strong>특징 기여도:</strong> 각 feature가 예측에 미치는 영향 정량화</li>
                                    <li>• <strong>모델 독립적:</strong> 모든 ML 모델에 적용 가능</li>
                                    <li>• <strong>시각화:</strong> Waterfall plot, Force plot 자동 생성</li>
                                </ul>
                            </div>
                            <div className="bg-white border border-green-300 rounded-lg p-4">
                                <h6 className="font-bold text-gov-text mb-2">설명 생성 예시</h6>
                                <div className="text-sm text-gov-text-secondary space-y-2">
                                    <p><strong>예측:</strong> 위험 거래 (확률 78%)</p>
                                    <p><strong>주요 기여 요인:</strong></p>
                                    <ul className="list-disc list-inside ml-4">
                                        <li>거래 금액 (500만원): +32%</li>
                                        <li>시간대 (새벽 3시): +25%</li>
                                        <li>해외 IP 접속: +21%</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedAgent === 'anomaly' && (
                        <div className="space-y-4">
                            <div className="bg-red-50 border border-red-300 rounded-lg p-4">
                                <h6 className="font-bold text-red-900 mb-2">🌲 Isolation Forest 알고리즘</h6>
                                <ul className="text-sm space-y-2 text-gov-text-secondary">
                                    <li>• <strong>원리:</strong> 이상치는 고립(isolation)이 쉽다는 가정</li>
                                    <li>• <strong>트리 구조:</strong> 랜덤 분할로 Binary Tree 생성</li>
                                    <li>• <strong>이상 점수:</strong> 경로 길이가 짧을수록 이상치</li>
                                    <li>• <strong>장점:</strong> 선형 시간 복잡도, 대규모 데이터 처리</li>
                                </ul>
                            </div>
                            <div className="bg-white border border-red-300 rounded-lg p-4">
                                <h6 className="font-bold text-gov-text mb-2">탐지 패턴</h6>
                                <ul className="text-sm space-y-2 text-gov-text-secondary">
                                    <li>• <strong>금액 이상:</strong> 평균 대비 10배 초과 거래</li>
                                    <li>• <strong>빈도 이상:</strong> 1시간 내 100건 이상</li>
                                    <li>• <strong>시간 이상:</strong> 비정상 시간대 (새벽 2-5시)</li>
                                    <li>• <strong>지역 이상:</strong> 단시간 내 지역 이동 불가능</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 데이터 신뢰도 체인 */}
            <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                <div className="bg-purple-600 text-white px-6 py-4">
                    <h4 className="text-lg font-bold flex items-center">
                        <i className="fas fa-link mr-3"></i>
                        데이터 신뢰도 체인
                    </h4>
                </div>
                <div className="p-6">
                    <div className="bg-purple-50 rounded-lg p-6 mb-6">
                        <h6 className="font-bold text-purple-900 mb-4">신뢰도 점수 계산 공식</h6>
                        <div className="text-center bg-white rounded p-4 border border-purple-300 mb-4">
                            <div className="font-mono text-lg text-purple-900">
                                최종 신뢰도 = (법률 준수 × 0.4) + (설명 가능성 × 0.3) + (정상 패턴 × 0.3)
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white rounded p-3 border border-purple-300">
                                <div className="text-sm font-bold text-purple-900 mb-1">법률 준수 (40%)</div>
                                <div className="text-xs text-gov-text-secondary">LLM 판정 점수</div>
                            </div>
                            <div className="bg-white rounded p-3 border border-purple-300">
                                <div className="text-sm font-bold text-purple-900 mb-1">설명 가능성 (30%)</div>
                                <div className="text-xs text-gov-text-secondary">SHAP 투명도 점수</div>
                            </div>
                            <div className="bg-white rounded p-3 border border-purple-300">
                                <div className="text-sm font-bold text-purple-900 mb-1">정상 패턴 (30%)</div>
                                <div className="text-xs text-gov-text-secondary">100 - 이상 점수</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-300 rounded-lg p-4">
                        <h6 className="font-bold text-amber-900 mb-2">💡 가중치 가변성</h6>
                        <p className="text-sm text-gov-text-secondary">
                            가중치(0.4, 0.3, 0.3)는 시스템 요구사항에 따라 조정 가능합니다. 
                            예: 금융권은 법률 준수 60%, 의료권은 설명 가능성 50% 등
                        </p>
                    </div>
                </div>
            </div>

            {/* 종합 분석 시뮬레이터 */}
            <div className="bg-gov-gray rounded-lg p-6 border border-gov-border mb-8">
                <h5 className="font-bold text-gov-text mb-4">AI 멀티에이전트 종합 분석 시뮬레이터</h5>
                <div className="bg-white rounded-lg p-6 mb-6">
                    <div className="mb-4">
                        <div className="font-bold text-gov-text mb-2">테스트 트랜잭션</div>
                        <div className="text-sm text-gov-text-secondary space-y-1">
                            <p>• 거래 금액: 2,500,000원</p>
                            <p>• 거래 시간: 14:35:22</p>
                            <p>• 거래 유형: 계좌이체</p>
                            <p>• 위치: 서울시 강남구</p>
                        </div>
                    </div>
                    <button
                        onClick={runAnalysis}
                        disabled={analysisRunning}
                        className="px-6 py-3 bg-gov-blue text-white rounded font-bold hover:bg-gov-blue-light disabled:opacity-50"
                    >
                        <i className="fas fa-play mr-2"></i>
                        {analysisRunning ? '분석 중...' : '종합 분석 시작'}
                    </button>
                </div>

                {analysisRunning && (
                    <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 text-center">
                        <i className="fas fa-spinner fa-spin text-3xl text-blue-600 mb-3"></i>
                        <div className="font-bold text-blue-800">3개 에이전트 동시 분석 중...</div>
                    </div>
                )}

                {analysisResult && !analysisRunning && (
                    <div className="space-y-4">
                        {/* 법률 준수 결과 */}
                        <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <i className="fas fa-gavel text-2xl text-blue-600"></i>
                                    <div className="font-bold text-blue-900">법률 준수 검증</div>
                                </div>
                                <div className="text-3xl font-bold text-blue-600">{analysisResult.legal.score}점</div>
                            </div>
                            <div className="text-sm text-gov-text-secondary">
                                <strong>판정:</strong> {analysisResult.legal.status === 'pass' ? '✓ 적법' : '✗ 부적법'}<br/>
                                <strong>근거:</strong> {analysisResult.legal.reason}
                            </div>
                        </div>

                        {/* 설명 가능성 결과 */}
                        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <i className="fas fa-search text-2xl text-green-600"></i>
                                    <div className="font-bold text-green-900">설명 가능성</div>
                                </div>
                                <div className="text-3xl font-bold text-green-600">{analysisResult.explainability.score}점</div>
                            </div>
                            <div className="text-sm text-gov-text-secondary">
                                <strong>주요 영향 요인:</strong> {analysisResult.explainability.topFeatures.join(', ')}
                            </div>
                        </div>

                        {/* 이상 탐지 결과 */}
                        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <i className="fas fa-check-circle text-2xl text-green-600"></i>
                                    <div className="font-bold text-green-900">이상 탐지</div>
                                </div>
                                <div className="text-3xl font-bold text-green-600">{analysisResult.anomaly.score}점</div>
                            </div>
                            <div className="text-sm text-gov-text-secondary">
                                <strong>상태:</strong> {analysisResult.anomaly.status === 'normal' ? '✓ 정상 패턴' : '✗ 이상 패턴'}<br/>
                                <strong>위험도:</strong> {analysisResult.anomaly.risk === 'low' ? '낮음' : '높음'}
                            </div>
                        </div>

                        {/* 최종 신뢰도 */}
                        <div className="bg-purple-50 border-2 border-purple-500 rounded-lg p-5">
                            <div className="text-center">
                                <div className="text-sm text-purple-700 mb-2">최종 데이터 신뢰도</div>
                                <div className="text-5xl font-bold text-purple-600 mb-2">
                                    {Math.round(analysisResult.legal.score * 0.4 + analysisResult.explainability.score * 0.3 + (100 - analysisResult.anomaly.score) * 0.3)}점
                                </div>
                                <div className="text-sm text-gov-text-secondary">
                                    (법률 40% + 설명 30% + 정상 30%)
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 에이전트 간 협업 구조 */}
            <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                <div className="bg-orange-600 text-white px-6 py-4">
                    <h4 className="text-lg font-bold flex items-center">
                        <i className="fas fa-network-wired mr-3"></i>
                        에이전트 간 협업 구조
                    </h4>
                </div>
                <div className="p-6">
                    <div className="text-center mb-6">
                        <div className="inline-block bg-orange-100 border-2 border-orange-500 rounded-lg px-6 py-3">
                            <div className="font-bold text-orange-900">트랜잭션 입력</div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                        {[
                            { name: '법률 준수', icon: 'fa-gavel', color: 'blue' },
                            { name: '설명 가능성', icon: 'fa-search', color: 'green' },
                            { name: '이상 탐지', icon: 'fa-exclamation-triangle', color: 'red' }
                        ].map((agent, idx) => (
                            <div key={idx} className="text-center">
                                <div className="w-2 h-12 bg-orange-300 mx-auto mb-3"></div>
                                <div className={`bg-${agent.color}-100 border-2 border-${agent.color}-500 rounded-lg p-4`}>
                                    <i className={`fas ${agent.icon} text-2xl text-${agent.color}-600 mb-2`}></i>
                                    <div className="font-bold text-gov-text text-sm">{agent.name}</div>
                                    <div className="text-xs text-gov-text-secondary mt-1">독립 분석</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <div className="flex justify-center gap-6 mb-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-2 h-12 bg-purple-300"></div>
                            ))}
                        </div>
                        <div className="inline-block bg-purple-100 border-2 border-purple-500 rounded-lg px-6 py-3">
                            <div className="font-bold text-purple-900">신뢰도 체인 종합</div>
                        </div>
                        <div className="w-2 h-12 bg-purple-300 mx-auto mt-3 mb-3"></div>
                        <div className="inline-block bg-green-100 border-2 border-green-500 rounded-lg px-6 py-3">
                            <div className="font-bold text-green-900">최종 판정 (0-100점)</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 핵심 특징 */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 text-center">
                    <i className="fas fa-robot text-3xl text-blue-600 mb-2"></i>
                    <div className="font-bold text-gov-text">LLM 기반</div>
                    <div className="text-xs text-gov-text-secondary mt-1">판례 10만건 학습</div>
                </div>
                <div className="bg-green-50 border border-green-300 rounded-lg p-4 text-center">
                    <i className="fas fa-eye text-3xl text-green-600 mb-2"></i>
                    <div className="font-bold text-gov-text">투명성</div>
                    <div className="text-xs text-gov-text-secondary mt-1">SHAP 설명 가능</div>
                </div>
                <div className="bg-red-50 border border-red-300 rounded-lg p-4 text-center">
                    <i className="fas fa-search text-3xl text-red-600 mb-2"></i>
                    <div className="font-bold text-gov-text">이상 탐지</div>
                    <div className="text-xs text-gov-text-secondary mt-1">Isolation Forest</div>
                </div>
            </div>
        </div>
    );
};
