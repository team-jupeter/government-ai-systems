// RegistrationProbability 컴포넌트 - 등록 가능성 예측
const RegistrationProbability = () => {
    const [inventionData, setInventionData] = useState({
        title: '',
        techField: '',
        claims: '',
        priorArtDiff: '',
        applicantType: 'individual'
    });
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [comparisonMode, setComparisonMode] = useState(false);

    const techFields = [
        { id: 'ai', name: 'AI/머신러닝', avgRate: 68 },
        { id: 'blockchain', name: '블록체인', avgRate: 62 },
        { id: 'bio', name: '바이오/의료', avgRate: 58 },
        { id: 'electronics', name: '전기/전자', avgRate: 72 },
        { id: 'mechanical', name: '기계', avgRate: 75 },
        { id: 'software', name: '소프트웨어', avgRate: 65 }
    ];

    const runAnalysis = async () => {
        if (!inventionData.title || !inventionData.techField) {
            alert('발명의 명칭과 기술분야를 입력해주세요.');
            return;
        }

        setIsAnalyzing(true);

        setTimeout(() => {
            const baseRate = techFields.find(f => f.id === inventionData.techField)?.avgRate || 65;
            const variance = Math.floor(Math.random() * 20) - 10;
            const probability = Math.min(95, Math.max(40, baseRate + variance));

            setAnalysisResult({
                overallProbability: probability,
                confidence: Math.floor(Math.random() * 10) + 90,
                analysisTime: (Math.random() * 0.5 + 0.2).toFixed(3),
                
                // 세부 점수
                scores: {
                    novelty: Math.floor(Math.random() * 20) + 70,
                    inventiveStep: Math.floor(Math.random() * 25) + 65,
                    industrialApplicability: Math.floor(Math.random() * 10) + 85,
                    claimClarity: Math.floor(Math.random() * 15) + 75,
                    specification: Math.floor(Math.random() * 15) + 75
                },

                // 예상 거절 사유
                rejectionRisks: [
                    { code: '29조2항', reason: '신규성 결여', risk: Math.floor(Math.random() * 30) + 10, suggestion: '선행기술과의 차별점을 청구항에 명시하세요' },
                    { code: '29조2항', reason: '진보성 결여', risk: Math.floor(Math.random() * 40) + 20, suggestion: '기술적 효과를 구체적으로 기재하세요' },
                    { code: '42조3항', reason: '명세서 기재불비', risk: Math.floor(Math.random() * 20) + 5, suggestion: '실시예를 추가하여 구체성을 높이세요' },
                    { code: '42조4항', reason: '청구항 기재불비', risk: Math.floor(Math.random() * 25) + 10, suggestion: '청구항의 구성요소를 명확히 정의하세요' }
                ],

                // 유사 출원 통계
                similarApplications: {
                    total: Math.floor(Math.random() * 200) + 50,
                    granted: Math.floor(Math.random() * 100) + 30,
                    rejected: Math.floor(Math.random() * 50) + 10,
                    pending: Math.floor(Math.random() * 50) + 10,
                    avgExaminationPeriod: Math.floor(Math.random() * 6) + 12
                },

                // 심사관 분석
                examinerAnalysis: {
                    likelyExaminer: '기술심사1팀',
                    avgApprovalRate: Math.floor(Math.random() * 15) + 60,
                    avgOACount: (Math.random() * 1.5 + 0.5).toFixed(1),
                    keyFocus: ['청구항 명확성', '선행기술 대비 진보성']
                },

                // 개선 제안
                improvements: [
                    { priority: 'high', suggestion: '독립청구항의 기술적 특징을 더 구체화하세요', impact: '+8%' },
                    { priority: 'medium', suggestion: '종속청구항을 추가하여 권리범위를 확보하세요', impact: '+5%' },
                    { priority: 'medium', suggestion: '실시예에 구체적인 수치 데이터를 추가하세요', impact: '+4%' },
                    { priority: 'low', suggestion: '해외 선행기술 조사를 추가로 수행하세요', impact: '+2%' }
                ]
            });

            setIsAnalyzing(false);
        }, 2500);
    };

    const getProbabilityColor = (prob) => {
        if (prob >= 80) return { bg: 'bg-green-500', text: 'text-green-600', label: '높음' };
        if (prob >= 60) return { bg: 'bg-yellow-500', text: 'text-yellow-600', label: '보통' };
        return { bg: 'bg-red-500', text: 'text-red-600', label: '낮음' };
    };

    const getRiskColor = (risk) => {
        if (risk >= 40) return 'bg-red-100 text-red-700';
        if (risk >= 20) return 'bg-yellow-100 text-yellow-700';
        return 'bg-green-100 text-green-700';
    };

    return (
        <div className="space-y-6 pt-[140px]">
            {/* 페이지 타이틀 */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="text-3xl">📊</span>
                        등록 가능성 예측
                    </h2>
                    <p className="text-gray-500">AI가 특허 등록 가능성을 분석하고 개선점을 제안합니다</p>
                </div>
                <div className="text-sm text-gray-500">
                    <i className="fas fa-chart-line mr-1"></i>
                    예측 정확도: 94.7%
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* 좌측: 입력 영역 */}
                <div className="col-span-1 space-y-4">
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4">발명 정보</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">발명의 명칭 *</label>
                                <input
                                    type="text"
                                    value={inventionData.title}
                                    onChange={(e) => setInventionData(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                    placeholder="발명의 명칭을 입력하세요"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">기술분야 *</label>
                                <select
                                    value={inventionData.techField}
                                    onChange={(e) => setInventionData(prev => ({ ...prev, techField: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">선택하세요</option>
                                    {techFields.map(field => (
                                        <option key={field.id} value={field.id}>
                                            {field.name} (평균 등록률 {field.avgRate}%)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">핵심 청구항</label>
                                <textarea
                                    value={inventionData.claims}
                                    onChange={(e) => setInventionData(prev => ({ ...prev, claims: e.target.value }))}
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                    placeholder="청구항 1의 내용을 입력하세요"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">선행기술 대비 차별점</label>
                                <textarea
                                    value={inventionData.priorArtDiff}
                                    onChange={(e) => setInventionData(prev => ({ ...prev, priorArtDiff: e.target.value }))}
                                    rows={3}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                    placeholder="선행기술과의 차이점을 입력하세요"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">출원인 유형</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { id: 'individual', label: '개인' },
                                        { id: 'sme', label: '중소기업' },
                                        { id: 'large', label: '대기업' },
                                        { id: 'research', label: '연구기관' }
                                    ].map(type => (
                                        <button
                                            key={type.id}
                                            onClick={() => setInventionData(prev => ({ ...prev, applicantType: type.id }))}
                                            className={`px-3 py-2 rounded-lg text-sm transition ${
                                                inventionData.applicantType === type.id
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                        >
                                            {type.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={runAnalysis}
                            disabled={isAnalyzing}
                            className="w-full mt-4 btn-kipo text-white py-3 rounded-lg font-medium disabled:opacity-50"
                        >
                            {isAnalyzing ? (
                                <span className="flex items-center justify-center gap-2">
                                    <i className="fas fa-spinner loading-spin"></i>
                                    분석 중...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    <i className="fas fa-chart-bar"></i>
                                    등록 가능성 분석
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* 우측: 분석 결과 */}
                <div className="col-span-2 space-y-4">
                    {analysisResult ? (
                        <>
                            {/* 종합 점수 */}
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-1">등록 가능성</h3>
                                        <p className="text-sm text-gray-500">분석 시간: {analysisResult.analysisTime}초 | 신뢰도: {analysisResult.confidence}%</p>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-5xl font-bold ${getProbabilityColor(analysisResult.overallProbability).text}`}>
                                            {analysisResult.overallProbability}%
                                        </div>
                                        <div className={`text-sm ${getProbabilityColor(analysisResult.overallProbability).text}`}>
                                            {getProbabilityColor(analysisResult.overallProbability).label}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* 프로그레스 바 */}
                                <div className="mt-4 h-4 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full ${getProbabilityColor(analysisResult.overallProbability).bg} transition-all duration-1000`}
                                        style={{ width: `${analysisResult.overallProbability}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* 세부 점수 */}
                            <div className="bg-white rounded-xl p-5 shadow-sm">
                                <h4 className="font-bold text-gray-800 mb-4">세부 평가 항목</h4>
                                <div className="space-y-3">
                                    {[
                                        { key: 'novelty', label: '신규성', icon: '🆕' },
                                        { key: 'inventiveStep', label: '진보성', icon: '💡' },
                                        { key: 'industrialApplicability', label: '산업상 이용가능성', icon: '🏭' },
                                        { key: 'claimClarity', label: '청구항 명확성', icon: '📝' },
                                        { key: 'specification', label: '명세서 충실도', icon: '📄' }
                                    ].map(item => (
                                        <div key={item.key} className="flex items-center gap-3">
                                            <span className="text-xl w-8">{item.icon}</span>
                                            <span className="w-32 text-sm text-gray-600">{item.label}</span>
                                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full ${getProbabilityColor(analysisResult.scores[item.key]).bg}`}
                                                    style={{ width: `${analysisResult.scores[item.key]}%` }}
                                                ></div>
                                            </div>
                                            <span className={`w-12 text-right font-medium ${getProbabilityColor(analysisResult.scores[item.key]).text}`}>
                                                {analysisResult.scores[item.key]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 예상 거절 사유 */}
                            <div className="bg-white rounded-xl p-5 shadow-sm">
                                <h4 className="font-bold text-gray-800 mb-4">예상 거절 사유 및 대응 방안</h4>
                                <div className="space-y-3">
                                    {analysisResult.rejectionRisks.map((risk, idx) => (
                                        <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs px-2 py-1 bg-gray-200 rounded">{risk.code}</span>
                                                    <span className="font-medium text-gray-800">{risk.reason}</span>
                                                </div>
                                                <span className={`px-2 py-1 rounded text-sm font-medium ${getRiskColor(risk.risk)}`}>
                                                    위험도 {risk.risk}%
                                                </span>
                                            </div>
                                            <p className="text-sm text-blue-600">
                                                <i className="fas fa-lightbulb mr-1"></i>
                                                {risk.suggestion}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 개선 제안 */}
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                                <h4 className="font-bold text-blue-800 mb-4">
                                    <i className="fas fa-magic mr-2"></i>
                                    AI 개선 제안
                                </h4>
                                <div className="space-y-3">
                                    {analysisResult.improvements.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <span className={`w-2 h-2 rounded-full ${
                                                    item.priority === 'high' ? 'bg-red-500' :
                                                    item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                                }`}></span>
                                                <span className="text-gray-700">{item.suggestion}</span>
                                            </div>
                                            <span className="text-green-600 font-medium">{item.impact}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="bg-gray-50 rounded-xl p-12 text-center">
                            <div className="text-6xl mb-4">📊</div>
                            <h3 className="text-xl font-medium text-gray-700 mb-2">등록 가능성을 예측하세요</h3>
                            <p className="text-gray-500">
                                발명 정보를 입력하면 AI가 등록 가능성을 분석하고<br/>
                                예상 거절 사유와 개선점을 제안합니다.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
