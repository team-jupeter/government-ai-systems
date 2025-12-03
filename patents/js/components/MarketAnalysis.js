// MarketAnalysis 컴포넌트 - 시장 규모 및 사업성 분석
const MarketAnalysis = () => {
    const [techKeyword, setTechKeyword] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [activeTab, setActiveTab] = useState('domestic'); // domestic, global

    const industries = [
        { id: 'ai', name: 'AI/머신러닝', icon: '🤖' },
        { id: 'blockchain', name: '블록체인/분산원장', icon: '⛓️' },
        { id: 'iot', name: 'IoT/스마트기기', icon: '📱' },
        { id: 'biotech', name: '바이오/헬스케어', icon: '🧬' },
        { id: 'fintech', name: '핀테크/금융', icon: '💳' },
        { id: 'mobility', name: '모빌리티/자율주행', icon: '🚗' },
        { id: 'energy', name: '신재생에너지', icon: '⚡' },
        { id: 'semiconductor', name: '반도체/디스플레이', icon: '💾' }
    ];

    const runAnalysis = () => {
        if (!techKeyword.trim() || !selectedIndustry) {
            alert('기술 키워드와 산업 분야를 입력해주세요.');
            return;
        }

        setIsAnalyzing(true);

        setTimeout(() => {
            const industry = industries.find(i => i.id === selectedIndustry);
            
            setAnalysisResult({
                techKeyword,
                industry: industry?.name,
                analysisDate: new Date().toISOString().split('T')[0],
                
                // 국내 시장
                domesticMarket: {
                    currentSize: Math.floor(Math.random() * 5000) + 1000, // 억원
                    projectedSize: Math.floor(Math.random() * 15000) + 5000,
                    cagr: (Math.random() * 15 + 8).toFixed(1),
                    targetYear: 2028,
                    keyPlayers: [
                        { name: '삼성전자', share: Math.floor(Math.random() * 15) + 20 },
                        { name: 'LG전자', share: Math.floor(Math.random() * 10) + 12 },
                        { name: 'SK하이닉스', share: Math.floor(Math.random() * 8) + 8 },
                        { name: '네이버', share: Math.floor(Math.random() * 5) + 5 },
                        { name: '카카오', share: Math.floor(Math.random() * 5) + 4 }
                    ],
                    trends: [
                        'AI 융합 기술 수요 급증',
                        '정부 R&D 투자 확대',
                        '스타트업 생태계 성장',
                        '대기업 오픈이노베이션 활성화'
                    ],
                    opportunities: [
                        { area: '공공 부문', potential: 'high', desc: '정부 디지털 전환 정책' },
                        { area: '금융 부문', potential: 'high', desc: '마이데이터 사업 확대' },
                        { area: '제조업', potential: 'medium', desc: '스마트팩토리 도입' },
                        { area: '의료/헬스케어', potential: 'high', desc: '디지털 헬스케어 규제 완화' }
                    ]
                },

                // 글로벌 시장
                globalMarket: {
                    currentSize: Math.floor(Math.random() * 500) + 100, // 십억 달러
                    projectedSize: Math.floor(Math.random() * 1500) + 500,
                    cagr: (Math.random() * 20 + 12).toFixed(1),
                    targetYear: 2028,
                    regionalBreakdown: [
                        { region: '북미', share: 35, growth: 14.2 },
                        { region: '유럽', share: 25, growth: 12.8 },
                        { region: '아시아태평양', share: 32, growth: 18.5 },
                        { region: '기타', share: 8, growth: 10.2 }
                    ],
                    topCompanies: [
                        { name: 'Google', country: '🇺🇸', marketCap: '1.8T' },
                        { name: 'Microsoft', country: '🇺🇸', marketCap: '2.5T' },
                        { name: 'Amazon', country: '🇺🇸', marketCap: '1.5T' },
                        { name: 'Alibaba', country: '🇨🇳', marketCap: '200B' },
                        { name: 'SAP', country: '🇩🇪', marketCap: '180B' }
                    ],
                    entryBarriers: [
                        { barrier: '기술 장벽', level: 'high', desc: '핵심 원천기술 확보 필요' },
                        { barrier: '자본 장벽', level: 'medium', desc: '초기 R&D 투자 필요' },
                        { barrier: '규제 장벽', level: 'medium', desc: '국가별 상이한 규제' },
                        { barrier: '네트워크 효과', level: 'high', desc: '기존 플랫폼 지배력' }
                    ]
                },

                // 기술 경쟁력 분석
                techCompetitiveness: {
                    patentLandscape: {
                        totalPatents: Math.floor(Math.random() * 50000) + 10000,
                        recentGrowth: (Math.random() * 30 + 10).toFixed(1),
                        topApplicants: ['Samsung', 'IBM', 'Google', 'Microsoft', 'Alibaba'],
                        koreanShare: (Math.random() * 15 + 5).toFixed(1)
                    },
                    techReadiness: {
                        level: Math.floor(Math.random() * 3) + 6, // TRL 6-9
                        commercializationTime: Math.floor(Math.random() * 24) + 6 // 개월
                    }
                },

                // 사업화 추천
                recommendations: {
                    targetMarket: activeTab === 'domestic' ? '국내 우선 진출 후 아시아 확장' : '글로벌 동시 진출',
                    businessModel: [
                        { model: 'B2B SaaS', fit: 85, desc: '기업 대상 구독 서비스' },
                        { model: 'B2G', fit: 78, desc: '정부/공공기관 수주' },
                        { model: '라이선싱', fit: 72, desc: '기술 라이선스 수익' },
                        { model: '플랫폼', fit: 65, desc: '양면 시장 플랫폼' }
                    ],
                    investmentNeeded: {
                        seed: { min: 3, max: 10, unit: '억원' },
                        seriesA: { min: 30, max: 100, unit: '억원' },
                        seriesB: { min: 100, max: 500, unit: '억원' }
                    },
                    roi: {
                        breakEvenPeriod: Math.floor(Math.random() * 24) + 18, // 개월
                        expectedROI: Math.floor(Math.random() * 200) + 150 // %
                    }
                },

                // 오픈해시 활용 제안
                openHashAdvantage: {
                    title: '오픈해시 기술 활용 우위',
                    benefits: [
                        '선출원 시점 증명으로 IP 분쟁 사전 예방',
                        '블록체인 대비 98.5% 에너지 절감으로 ESG 경쟁력',
                        '글로벌 타임스탬프로 국제 우선권 주장 용이',
                        '데이터 무결성 보장으로 규제 대응력 강화'
                    ],
                    marketDifferentiation: '기존 블록체인 기반 솔루션 대비 비용/성능 우위'
                }
            });

            setIsAnalyzing(false);
        }, 2500);
    };

    const formatCurrency = (value, unit = '억원') => {
        return `${value.toLocaleString()}${unit}`;
    };

    const getPotentialColor = (potential) => {
        if (potential === 'high') return 'bg-green-100 text-green-700';
        if (potential === 'medium') return 'bg-yellow-100 text-yellow-700';
        return 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="space-y-6 pt-[140px]">
            {/* 페이지 타이틀 */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="text-3xl">📈</span>
                        시장 규모 및 사업성 분석
                    </h2>
                    <p className="text-gray-500">특허 기술의 시장 잠재력과 사업화 가능성을 분석합니다</p>
                </div>
            </div>

            {/* 검색 입력 */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">기술 키워드 *</label>
                        <input
                            type="text"
                            value={techKeyword}
                            onChange={(e) => setTechKeyword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                            placeholder="예: 오픈해시, 분산원장, AI 인증"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">산업 분야 *</label>
                        <select
                            value={selectedIndustry}
                            onChange={(e) => setSelectedIndustry(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">선택하세요</option>
                            {industries.map(ind => (
                                <option key={ind.id} value={ind.id}>{ind.icon} {ind.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-1 flex items-end">
                        <button
                            onClick={runAnalysis}
                            disabled={isAnalyzing}
                            className="w-full btn-kipo text-white py-3 rounded-lg font-medium disabled:opacity-50"
                        >
                            {isAnalyzing ? (
                                <span className="flex items-center justify-center gap-2">
                                    <i className="fas fa-spinner loading-spin"></i>분석 중...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    <i className="fas fa-chart-line"></i>시장 분석
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* 분석 결과 */}
            {analysisResult && (
                <div className="space-y-6">
                    {/* 탭 선택 */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveTab('domestic')}
                            className={`px-6 py-3 rounded-lg font-medium transition ${
                                activeTab === 'domestic'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            🇰🇷 국내 시장
                        </button>
                        <button
                            onClick={() => setActiveTab('global')}
                            className={`px-6 py-3 rounded-lg font-medium transition ${
                                activeTab === 'global'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            🌐 글로벌 시장
                        </button>
                    </div>

                    {/* 국내 시장 */}
                    {activeTab === 'domestic' && (
                        <div className="grid grid-cols-3 gap-6">
                            {/* 시장 규모 */}
                            <div className="col-span-2 bg-white rounded-xl p-6 shadow-sm">
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-chart-bar text-blue-600"></i>
                                    국내 시장 규모
                                </h3>
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                                        <div className="text-sm text-blue-600 mb-1">현재 시장 규모</div>
                                        <div className="text-3xl font-bold text-blue-700">
                                            {formatCurrency(analysisResult.domesticMarket.currentSize)}
                                        </div>
                                        <div className="text-xs text-gray-500">2024년 기준</div>
                                    </div>
                                    <div className="bg-green-50 rounded-xl p-4 text-center">
                                        <div className="text-sm text-green-600 mb-1">예상 시장 규모</div>
                                        <div className="text-3xl font-bold text-green-700">
                                            {formatCurrency(analysisResult.domesticMarket.projectedSize)}
                                        </div>
                                        <div className="text-xs text-gray-500">{analysisResult.domesticMarket.targetYear}년 전망</div>
                                    </div>
                                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                                        <div className="text-sm text-purple-600 mb-1">연평균 성장률</div>
                                        <div className="text-3xl font-bold text-purple-700">
                                            {analysisResult.domesticMarket.cagr}%
                                        </div>
                                        <div className="text-xs text-gray-500">CAGR</div>
                                    </div>
                                </div>

                                {/* 주요 플레이어 */}
                                <h4 className="font-medium text-gray-700 mb-3">주요 플레이어</h4>
                                <div className="space-y-2">
                                    {analysisResult.domesticMarket.keyPlayers.map((player, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <span className="w-24 text-sm text-gray-600">{player.name}</span>
                                            <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-blue-500"
                                                    style={{ width: `${player.share * 2}%` }}
                                                ></div>
                                            </div>
                                            <span className="w-12 text-sm text-gray-600 text-right">{player.share}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 시장 기회 */}
                            <div className="col-span-1 space-y-4">
                                <div className="bg-white rounded-xl p-5 shadow-sm">
                                    <h4 className="font-bold text-gray-800 mb-3">📊 시장 트렌드</h4>
                                    <ul className="space-y-2">
                                        {analysisResult.domesticMarket.trends.map((trend, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                                <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                                                {trend}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-white rounded-xl p-5 shadow-sm">
                                    <h4 className="font-bold text-gray-800 mb-3">🎯 진출 기회</h4>
                                    <div className="space-y-2">
                                        {analysisResult.domesticMarket.opportunities.map((opp, idx) => (
                                            <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-medium text-gray-700">{opp.area}</span>
                                                    <span className={`px-2 py-0.5 rounded text-xs ${getPotentialColor(opp.potential)}`}>
                                                        {opp.potential === 'high' ? '높음' : '중간'}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500">{opp.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 글로벌 시장 */}
                    {activeTab === 'global' && (
                        <div className="grid grid-cols-3 gap-6">
                            {/* 글로벌 시장 규모 */}
                            <div className="col-span-2 bg-white rounded-xl p-6 shadow-sm">
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <i className="fas fa-globe text-green-600"></i>
                                    글로벌 시장 규모
                                </h3>
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                                        <div className="text-sm text-blue-600 mb-1">현재 시장 규모</div>
                                        <div className="text-3xl font-bold text-blue-700">
                                            ${analysisResult.globalMarket.currentSize}B
                                        </div>
                                        <div className="text-xs text-gray-500">2024년 기준</div>
                                    </div>
                                    <div className="bg-green-50 rounded-xl p-4 text-center">
                                        <div className="text-sm text-green-600 mb-1">예상 시장 규모</div>
                                        <div className="text-3xl font-bold text-green-700">
                                            ${analysisResult.globalMarket.projectedSize}B
                                        </div>
                                        <div className="text-xs text-gray-500">{analysisResult.globalMarket.targetYear}년 전망</div>
                                    </div>
                                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                                        <div className="text-sm text-purple-600 mb-1">연평균 성장률</div>
                                        <div className="text-3xl font-bold text-purple-700">
                                            {analysisResult.globalMarket.cagr}%
                                        </div>
                                        <div className="text-xs text-gray-500">CAGR</div>
                                    </div>
                                </div>

                                {/* 지역별 점유율 */}
                                <h4 className="font-medium text-gray-700 mb-3">지역별 시장 점유율</h4>
                                <div className="grid grid-cols-4 gap-3">
                                    {analysisResult.globalMarket.regionalBreakdown.map((region, idx) => (
                                        <div key={idx} className="p-3 bg-gray-50 rounded-lg text-center">
                                            <div className="text-sm text-gray-600">{region.region}</div>
                                            <div className="text-2xl font-bold text-gray-800">{region.share}%</div>
                                            <div className="text-xs text-green-600">+{region.growth}% YoY</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 글로벌 경쟁사 & 진입장벽 */}
                            <div className="col-span-1 space-y-4">
                                <div className="bg-white rounded-xl p-5 shadow-sm">
                                    <h4 className="font-bold text-gray-800 mb-3">🏢 글로벌 리더</h4>
                                    <div className="space-y-2">
                                        {analysisResult.globalMarket.topCompanies.map((company, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                                <span className="flex items-center gap-2">
                                                    <span>{company.country}</span>
                                                    <span className="text-sm font-medium">{company.name}</span>
                                                </span>
                                                <span className="text-xs text-gray-500">${company.marketCap}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-5 shadow-sm">
                                    <h4 className="font-bold text-gray-800 mb-3">🚧 진입 장벽</h4>
                                    <div className="space-y-2">
                                        {analysisResult.globalMarket.entryBarriers.map((barrier, idx) => (
                                            <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-medium text-gray-700 text-sm">{barrier.barrier}</span>
                                                    <span className={`px-2 py-0.5 rounded text-xs ${
                                                        barrier.level === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        {barrier.level === 'high' ? '높음' : '중간'}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500">{barrier.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 사업화 추천 */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <i className="fas fa-lightbulb text-yellow-500"></i>
                                사업 모델 추천
                            </h3>
                            <div className="space-y-3">
                                {analysisResult.recommendations.businessModel.map((model, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-800">{model.model}</div>
                                            <div className="text-xs text-gray-500">{model.desc}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-lg font-bold ${model.fit >= 80 ? 'text-green-600' : model.fit >= 70 ? 'text-yellow-600' : 'text-gray-600'}`}>
                                                {model.fit}%
                                            </div>
                                            <div className="text-xs text-gray-500">적합도</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <i className="fas fa-coins text-yellow-500"></i>
                                투자 및 수익 전망
                            </h3>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="p-4 bg-blue-50 rounded-lg text-center">
                                    <div className="text-sm text-blue-600">손익분기점</div>
                                    <div className="text-2xl font-bold text-blue-700">
                                        {analysisResult.recommendations.roi.breakEvenPeriod}개월
                                    </div>
                                </div>
                                <div className="p-4 bg-green-50 rounded-lg text-center">
                                    <div className="text-sm text-green-600">예상 ROI</div>
                                    <div className="text-2xl font-bold text-green-700">
                                        {analysisResult.recommendations.roi.expectedROI}%
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between p-2 bg-gray-50 rounded">
                                    <span className="text-gray-600">Seed</span>
                                    <span className="font-medium">{analysisResult.recommendations.investmentNeeded.seed.min}-{analysisResult.recommendations.investmentNeeded.seed.max}억원</span>
                                </div>
                                <div className="flex justify-between p-2 bg-gray-50 rounded">
                                    <span className="text-gray-600">Series A</span>
                                    <span className="font-medium">{analysisResult.recommendations.investmentNeeded.seriesA.min}-{analysisResult.recommendations.investmentNeeded.seriesA.max}억원</span>
                                </div>
                                <div className="flex justify-between p-2 bg-gray-50 rounded">
                                    <span className="text-gray-600">Series B</span>
                                    <span className="font-medium">{analysisResult.recommendations.investmentNeeded.seriesB.min}-{analysisResult.recommendations.investmentNeeded.seriesB.max}억원</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 오픈해시 활용 제안 */}
                    <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 rounded-xl p-6 text-white">
                        <div className="flex items-start gap-4">
                            <div className="text-4xl">⛓️</div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                                    {analysisResult.openHashAdvantage.title}
                                </h3>
                                <p className="text-gray-300 mb-4">{analysisResult.openHashAdvantage.marketDifferentiation}</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {analysisResult.openHashAdvantage.benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm">
                                            <i className="fas fa-check text-yellow-400"></i>
                                            <span className="text-gray-200">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 분석 전 안내 */}
            {!analysisResult && !isAnalyzing && (
                <div className="bg-gray-50 rounded-xl p-12 text-center">
                    <div className="text-6xl mb-4">📈</div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">시장 분석을 시작하세요</h3>
                    <p className="text-gray-500">
                        기술 키워드와 산업 분야를 입력하면<br/>
                        국내/글로벌 시장 규모와 사업화 가능성을 분석합니다.
                    </p>
                </div>
            )}
        </div>
    );
};
