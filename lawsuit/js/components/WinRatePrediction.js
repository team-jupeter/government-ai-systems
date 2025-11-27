const WinRatePrediction = () => {
    const [caseData, setCaseData] = React.useState('');
    const [prediction, setPrediction] = React.useState(null);
    const [isAnalyzing, setIsAnalyzing] = React.useState(false);

    const analyzePrediction = () => {
        if (!caseData.trim()) {
            alert('사건 개요를 입력해주세요.');
            return;
        }
        
        setIsAnalyzing(true);
        setTimeout(() => {
            setPrediction({
                winRate: 73.5,
                confidence: 87,
                brierScore: 0.145,
                aucRoc: 0.862,
                factors: {
                    positive: [
                        { factor: '계약서 증거 확보', weight: 25, score: 92 },
                        { factor: '입금 내역 존재', weight: 20, score: 88 },
                        { factor: '유사 판례 유리', weight: 30, score: 76 }
                    ],
                    negative: [
                        { factor: '피고의 항변 가능성', weight: 15, score: 45 },
                        { factor: '손해 입증 불확실', weight: 10, score: 32 }
                    ]
                },
                similarCases: [
                    { id: '2024다12345', court: '대법원', result: '원고 승', amount: '4,500만원', similarity: 94.2 },
                    { id: '2023다67890', court: '서울고등법원', result: '원고 일부 승', amount: '2,800만원', similarity: 87.5 },
                    { id: '2024가합11111', court: '서울중앙지방법원', result: '원고 승', amount: '5,200만원', similarity: 82.1 }
                ],
                globalComparison: {
                    korea: 73.5,
                    usa: 78.2,
                    japan: 71.8,
                    germany: 69.5,
                    uk: 74.1,
                    france: 70.3,
                    canada: 76.8,
                    australia: 72.4
                },
                recommendation: '증거가 충분하고 유사 판례가 유리하여 소송 진행을 권장합니다. 다만, 손해액 입증을 보강하면 인용액을 높일 수 있습니다.'
            });
            setIsAnalyzing(false);
        }, 3000);
    };

    const getCountryFlag = (country) => {
        const flags = {
            korea: '🇰🇷', usa: '🇺🇸', japan: '🇯🇵', germany: '🇩🇪',
            uk: '🇬🇧', france: '🇫🇷', canada: '🇨🇦', australia: '🇦🇺'
        };
        return flags[country] || '🌍';
    };

    const getCountryName = (country) => {
        const names = {
            korea: '한국', usa: '미국', japan: '일본', germany: '독일',
            uk: '영국', france: '프랑스', canada: '캐나다', australia: '호주'
        };
        return names[country] || country;
    };

    return (
        <div className="p-6">
            <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-xl font-bold mb-2">
                        <i className="fas fa-percentage mr-2 text-blue-600"></i>AI 승소율 예측
                    </h2>
                    <p className="text-gray-500 mb-6">
                        1,800만 건 통합 법률 데이터와 OECD 8개국 판례를 분석하여 승소 확률을 예측합니다.
                    </p>

                    <textarea
                        value={caseData}
                        onChange={e => setCaseData(e.target.value)}
                        rows={6}
                        className="w-full border rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none mb-4"
                        placeholder="사건 개요를 입력하세요...

예시: 2024년 3월 임대차계약 체결, 보증금 1억원 지급. 2025년 2월 계약 만료 후 보증금 반환 요청했으나 임대인이 시설비 명목으로 공제 주장하며 거부 중. 계약서, 입금내역, 독촉 문자 보유."
                    />

                    <button 
                        onClick={analyzePrediction}
                        disabled={isAnalyzing}
                        className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 text-lg"
                    >
                        {isAnalyzing ? (
                            <><i className="fas fa-spinner fa-spin mr-2"></i>AI 분석 중... (약 3초)</>
                        ) : (
                            <><i className="fas fa-chart-line mr-2"></i>승소율 분석 시작</>
                        )}
                    </button>
                </div>

                {prediction && (
                    <>
                        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
                            <div className="grid grid-cols-4 gap-8 text-center">
                                <div>
                                    <div className="text-5xl font-bold mb-2">{prediction.winRate}%</div>
                                    <div className="text-blue-200">예상 승소 확률</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold mb-2">{prediction.confidence}%</div>
                                    <div className="text-blue-200">신뢰도</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold mb-2">{prediction.brierScore}</div>
                                    <div className="text-blue-200">Brier Score</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold mb-2">{prediction.aucRoc}</div>
                                    <div className="text-blue-200">AUC-ROC</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                            <h4 className="font-bold text-green-800 mb-2">
                                <i className="fas fa-lightbulb mr-2"></i>AI 권고사항
                            </h4>
                            <p className="text-green-700">{prediction.recommendation}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl border p-6">
                                <h3 className="font-bold text-green-700 mb-4">
                                    <i className="fas fa-plus-circle mr-2"></i>유리한 요인
                                </h3>
                                <div className="space-y-4">
                                    {prediction.factors.positive.map((f, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>{f.factor}</span>
                                                <span className="text-green-600 font-medium">+{f.score}점</span>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-green-500 rounded-full transition-all"
                                                    style={{ width: `${f.score}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border p-6">
                                <h3 className="font-bold text-red-700 mb-4">
                                    <i className="fas fa-minus-circle mr-2"></i>불리한 요인
                                </h3>
                                <div className="space-y-4">
                                    {prediction.factors.negative.map((f, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>{f.factor}</span>
                                                <span className="text-red-600 font-medium">-{f.score}점</span>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-red-500 rounded-full transition-all"
                                                    style={{ width: `${f.score}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border p-6">
                            <h3 className="font-bold mb-4">
                                <i className="fas fa-balance-scale mr-2 text-blue-600"></i>유사 판례 (상위 3건)
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                {prediction.similarCases.map((c, i) => (
                                    <div key={i} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-blue-600">{c.id}</span>
                                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                                유사도 {c.similarity}%
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-500 mb-2">{c.court}</div>
                                        <div className={`font-bold ${c.result.includes('승') ? 'text-green-600' : 'text-red-600'}`}>
                                            {c.result}
                                        </div>
                                        <div className="text-sm text-gray-700 mt-1">인용액: {c.amount}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border p-6">
                            <h3 className="font-bold mb-4">
                                <i className="fas fa-globe mr-2 text-blue-600"></i>글로벌 승소율 비교 (OECD 8개국)
                            </h3>
                            <div className="space-y-3">
                                {Object.entries(prediction.globalComparison)
                                    .sort((a, b) => b[1] - a[1])
                                    .map(([country, rate]) => (
                                        <div key={country} className="flex items-center gap-4">
                                            <div className="w-8 text-center text-xl">{getCountryFlag(country)}</div>
                                            <div className="w-16 text-sm">{getCountryName(country)}</div>
                                            <div className="flex-1">
                                                <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full rounded-full transition-all ${
                                                            country === 'korea' ? 'bg-blue-600' : 'bg-gray-400'
                                                        }`}
                                                        style={{ width: `${rate}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div className={`w-16 text-right font-bold ${
                                                country === 'korea' ? 'text-blue-600' : 'text-gray-600'
                                            }`}>
                                                {rate}%
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button 
                                onClick={() => setPrediction(null)}
                                className="px-6 py-3 border rounded-lg hover:bg-gray-50"
                            >
                                <i className="fas fa-redo mr-2"></i>다시 분석
                            </button>
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                                <i className="fas fa-file-alt mr-2"></i>소장 작성하기
                            </button>
                            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700">
                                <i className="fas fa-gavel mr-2"></i>모의재판 시작
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
