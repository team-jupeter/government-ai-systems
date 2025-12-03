// BusinessSupport 컴포넌트 - 사업화 지원 (기보, 컨소시엄)
const BusinessSupport = () => {
    const [activeSection, setActiveSection] = useState('kibo'); // kibo, consortium, funding
    const [companyInfo, setCompanyInfo] = useState({
        name: '',
        type: 'startup', // startup, sme, venture
        employees: '',
        revenue: '',
        techField: '',
        patentCount: ''
    });
    const [evaluationResult, setEvaluationResult] = useState(null);
    const [isEvaluating, setIsEvaluating] = useState(false);

    const sections = [
        { id: 'kibo', label: '기술보증기금 지원', icon: '🏦', desc: '기술신용보증, R&D 보증' },
        { id: 'consortium', label: '컨소시엄 구성', icon: '🤝', desc: '국내/글로벌 파트너십' },
        { id: 'funding', label: '투자 유치', icon: '💰', desc: 'VC, 정부 과제' }
    ];

    const kiboPrograms = [
        { id: 'tech-guarantee', name: '기술신용보증', limit: '30억원', rate: '1.0%~', period: '5년', fit: 92 },
        { id: 'venture-guarantee', name: '벤처기업 특별보증', limit: '50억원', rate: '0.8%~', period: '7년', fit: 88 },
        { id: 'ip-guarantee', name: 'IP담보보증', limit: '20억원', rate: '1.2%~', period: '5년', fit: 95 },
        { id: 'rd-guarantee', name: 'R&D 보증', limit: '10억원', rate: '0.5%~', period: '3년', fit: 85 },
        { id: 'scale-up', name: '스케일업 보증', limit: '100억원', rate: '0.7%~', period: '10년', fit: 78 }
    ];

    const consortiumPartners = {
        domestic: [
            { type: '대기업', examples: ['삼성전자', 'LG전자', 'SK'], benefit: '자금/인프라/판로' },
            { type: '공공기관', examples: ['ETRI', 'KIST', 'KAIST'], benefit: '공동연구/기술이전' },
            { type: '정부/지자체', examples: ['과기부', '중기부', '제주도'], benefit: '정책지원/시범사업' },
            { type: '금융기관', examples: ['기보', '신보', '산은'], benefit: '투자/보증/대출' }
        ],
        global: [
            { region: '북미', partners: ['Google', 'Microsoft', 'AWS'], approach: '기술 파트너십' },
            { region: '유럽', partners: ['SAP', 'Siemens', 'Bosch'], approach: '공동 R&D' },
            { region: '일본', partners: ['Sony', 'NTT', 'Fujitsu'], approach: '합작법인/라이선스' },
            { region: '동남아', partners: ['Grab', 'Gojek', 'Sea'], approach: '현지화 파트너' }
        ]
    };

    const fundingSources = [
        { type: 'VC', name: '벤처캐피탈', examples: ['소프트뱅크벤처스', '카카오벤처스', '알토스벤처스'], stage: 'Seed~Series B' },
        { type: 'CVC', name: '기업형 VC', examples: ['삼성벤처투자', 'LG테크놀로지벤처스', '현대차 ZER01NE'], stage: 'Series A~C' },
        { type: 'GOV', name: '정부 과제', examples: ['TIPS', 'IITP', '중기부 R&D'], stage: '창업~성장' },
        { type: 'GLOBAL', name: '해외 투자', examples: ['Sequoia', 'a16z', 'SoftBank Vision'], stage: 'Series B+' }
    ];

    const runEvaluation = () => {
        if (!companyInfo.name || !companyInfo.techField) {
            alert('회사명과 기술분야를 입력해주세요.');
            return;
        }

        setIsEvaluating(true);

        setTimeout(() => {
            setEvaluationResult({
                companyName: companyInfo.name,
                techGrade: ['AAA', 'AA', 'A', 'BBB'][Math.floor(Math.random() * 4)],
                creditScore: Math.floor(Math.random() * 200) + 700,
                techScore: Math.floor(Math.random() * 15) + 80,
                
                kiboEligibility: {
                    eligible: true,
                    maxAmount: Math.floor(Math.random() * 30) + 10,
                    recommendedPrograms: kiboPrograms.slice(0, 3),
                    requiredDocs: ['사업자등록증', '재무제표', '특허등록증', '기술사업계획서', '대표자 신용정보']
                },

                consortiumScore: {
                    readiness: Math.floor(Math.random() * 20) + 75,
                    attractiveness: Math.floor(Math.random() * 20) + 70,
                    recommendedPartners: [
                        { name: '삼성전자', type: '대기업', synergy: 85 },
                        { name: 'ETRI', type: '연구기관', synergy: 92 },
                        { name: '과기부', type: '정부', synergy: 78 }
                    ]
                },

                fundingPotential: {
                    stage: companyInfo.type === 'startup' ? 'Seed' : 'Series A',
                    targetAmount: Math.floor(Math.random() * 50) + 10,
                    valuationRange: { min: Math.floor(Math.random() * 50) + 30, max: Math.floor(Math.random() * 100) + 80 },
                    matchedInvestors: [
                        { name: '소프트뱅크벤처스', interest: 'high' },
                        { name: 'TIPS', interest: 'high' },
                        { name: '카카오벤처스', interest: 'medium' }
                    ]
                },

                openHashAdvantage: {
                    ipStrength: '+15%',
                    trustScore: '+20%',
                    globalReadiness: '+25%',
                    description: '오픈해시 기반 IP 포트폴리오는 기술보증 심사 시 가산점을 받을 수 있습니다.'
                }
            });

            setIsEvaluating(false);
        }, 2000);
    };

    return (
        <div className="space-y-6 pt-[140px]">
            {/* 페이지 타이틀 */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="text-3xl">🏢</span>
                        사업화 지원
                    </h2>
                    <p className="text-gray-500">기술보증기금 지원, 컨소시엄 구성, 투자 유치를 지원합니다</p>
                </div>
            </div>

            {/* 섹션 탭 */}
            <div className="flex gap-3">
                {sections.map(section => (
                    <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`flex-1 p-4 rounded-xl transition ${
                            activeSection === section.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <div className="text-2xl mb-1">{section.icon}</div>
                        <div className="font-medium">{section.label}</div>
                        <div className={`text-xs ${activeSection === section.id ? 'text-blue-200' : 'text-gray-500'}`}>
                            {section.desc}
                        </div>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* 좌측: 기업 정보 입력 */}
                <div className="col-span-1">
                    <div className="bg-white rounded-xl p-5 shadow-sm sticky top-[160px]">
                        <h3 className="font-bold text-gray-800 mb-4">기업 정보</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">회사명 *</label>
                                <input
                                    type="text"
                                    value={companyInfo.name}
                                    onChange={(e) => setCompanyInfo(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                    placeholder="(주)오픈해시"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">기업 유형</label>
                                <select
                                    value={companyInfo.type}
                                    onChange={(e) => setCompanyInfo(prev => ({ ...prev, type: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                >
                                    <option value="startup">스타트업 (3년 미만)</option>
                                    <option value="sme">중소기업</option>
                                    <option value="venture">벤처기업</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">기술분야 *</label>
                                <input
                                    type="text"
                                    value={companyInfo.techField}
                                    onChange={(e) => setCompanyInfo(prev => ({ ...prev, techField: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                    placeholder="블록체인/분산원장"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">직원 수</label>
                                    <input
                                        type="number"
                                        value={companyInfo.employees}
                                        onChange={(e) => setCompanyInfo(prev => ({ ...prev, employees: e.target.value }))}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                        placeholder="10"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">특허 수</label>
                                    <input
                                        type="number"
                                        value={companyInfo.patentCount}
                                        onChange={(e) => setCompanyInfo(prev => ({ ...prev, patentCount: e.target.value }))}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                        placeholder="5"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">연매출 (억원)</label>
                                <input
                                    type="number"
                                    value={companyInfo.revenue}
                                    onChange={(e) => setCompanyInfo(prev => ({ ...prev, revenue: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                    placeholder="10"
                                />
                            </div>
                            <button
                                onClick={runEvaluation}
                                disabled={isEvaluating}
                                className="w-full btn-kipo text-white py-3 rounded-lg font-medium disabled:opacity-50"
                            >
                                {isEvaluating ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <i className="fas fa-spinner loading-spin"></i>평가 중...
                                    </span>
                                ) : (
                                    <span>지원 자격 평가</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 우측: 섹션별 내용 */}
                <div className="col-span-2 space-y-4">
                    {/* 기술보증기금 */}
                    {activeSection === 'kibo' && (
                        <>
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <span>🏦</span>
                                    기술보증기금 지원 프로그램
                                </h3>
                                <div className="space-y-3">
                                    {kiboPrograms.map((program, idx) => (
                                        <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-medium text-gray-800">{program.name}</h4>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    program.fit >= 90 ? 'bg-green-100 text-green-700' :
                                                    program.fit >= 80 ? 'bg-blue-100 text-blue-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                    적합도 {program.fit}%
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500">보증한도:</span>
                                                    <span className="ml-2 font-medium">{program.limit}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">보증료율:</span>
                                                    <span className="ml-2 font-medium">{program.rate}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">보증기간:</span>
                                                    <span className="ml-2 font-medium">{program.period}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {evaluationResult && (
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                                    <h4 className="font-bold text-blue-800 mb-3">📋 기보 지원 자격 평가 결과</h4>
                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        <div className="bg-white rounded-lg p-3 text-center">
                                            <div className="text-sm text-gray-500">기술등급</div>
                                            <div className="text-2xl font-bold text-blue-600">{evaluationResult.techGrade}</div>
                                        </div>
                                        <div className="bg-white rounded-lg p-3 text-center">
                                            <div className="text-sm text-gray-500">기술점수</div>
                                            <div className="text-2xl font-bold text-blue-600">{evaluationResult.techScore}점</div>
                                        </div>
                                        <div className="bg-white rounded-lg p-3 text-center">
                                            <div className="text-sm text-gray-500">예상 보증한도</div>
                                            <div className="text-2xl font-bold text-green-600">{evaluationResult.kiboEligibility.maxAmount}억원</div>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3">
                                        <div className="text-sm text-gray-600 mb-2">필요 서류:</div>
                                        <div className="flex flex-wrap gap-2">
                                            {evaluationResult.kiboEligibility.requiredDocs.map((doc, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-gray-100 rounded text-xs">{doc}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* 컨소시엄 구성 */}
                    {activeSection === 'consortium' && (
                        <>
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <span>🇰🇷</span>
                                    국내 컨소시엄 파트너
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {consortiumPartners.domestic.map((partner, idx) => (
                                        <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                                            <h4 className="font-medium text-gray-800 mb-2">{partner.type}</h4>
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {partner.examples.map((ex, i) => (
                                                    <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{ex}</span>
                                                ))}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                <i className="fas fa-gift mr-1"></i>{partner.benefit}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <span>🌐</span>
                                    글로벌 컨소시엄 파트너
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {consortiumPartners.global.map((partner, idx) => (
                                        <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                                            <h4 className="font-medium text-gray-800 mb-2">{partner.region}</h4>
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {partner.partners.map((p, i) => (
                                                    <span key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">{p}</span>
                                                ))}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                <i className="fas fa-handshake mr-1"></i>{partner.approach}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {evaluationResult && (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                                    <h4 className="font-bold text-green-800 mb-3">🤝 컨소시엄 매칭 결과</h4>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="bg-white rounded-lg p-3 text-center">
                                            <div className="text-sm text-gray-500">컨소시엄 준비도</div>
                                            <div className="text-2xl font-bold text-green-600">{evaluationResult.consortiumScore.readiness}점</div>
                                        </div>
                                        <div className="bg-white rounded-lg p-3 text-center">
                                            <div className="text-sm text-gray-500">파트너 매력도</div>
                                            <div className="text-2xl font-bold text-green-600">{evaluationResult.consortiumScore.attractiveness}점</div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        {evaluationResult.consortiumScore.recommendedPartners.map((partner, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                                                <div>
                                                    <span className="font-medium">{partner.name}</span>
                                                    <span className="text-xs text-gray-500 ml-2">({partner.type})</span>
                                                </div>
                                                <span className="text-green-600 font-medium">시너지 {partner.synergy}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* 투자 유치 */}
                    {activeSection === 'funding' && (
                        <>
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <span>💰</span>
                                    투자 유치 채널
                                </h3>
                                <div className="space-y-4">
                                    {fundingSources.map((source, idx) => (
                                        <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-medium text-gray-800">{source.name}</h4>
                                                <span className="text-xs text-gray-500">{source.stage}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {source.examples.map((ex, i) => (
                                                    <span key={i} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm">{ex}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {evaluationResult && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                                    <h4 className="font-bold text-yellow-800 mb-3">💰 투자 유치 가능성</h4>
                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        <div className="bg-white rounded-lg p-3 text-center">
                                            <div className="text-sm text-gray-500">적합 단계</div>
                                            <div className="text-xl font-bold text-yellow-600">{evaluationResult.fundingPotential.stage}</div>
                                        </div>
                                        <div className="bg-white rounded-lg p-3 text-center">
                                            <div className="text-sm text-gray-500">목표 금액</div>
                                            <div className="text-xl font-bold text-yellow-600">{evaluationResult.fundingPotential.targetAmount}억원</div>
                                        </div>
                                        <div className="bg-white rounded-lg p-3 text-center">
                                            <div className="text-sm text-gray-500">예상 밸류</div>
                                            <div className="text-xl font-bold text-yellow-600">
                                                {evaluationResult.fundingPotential.valuationRange.min}-{evaluationResult.fundingPotential.valuationRange.max}억
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        {evaluationResult.fundingPotential.matchedInvestors.map((investor, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                                                <span className="font-medium">{investor.name}</span>
                                                <span className={`px-2 py-1 rounded text-xs ${
                                                    investor.interest === 'high' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                    관심도 {investor.interest === 'high' ? '높음' : '중간'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* 오픈해시 활용 이점 */}
                    {evaluationResult && (
                        <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 rounded-xl p-5 text-white">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-3xl">⛓️</span>
                                <h4 className="font-bold text-yellow-400">오픈해시 기술 활용 시 이점</h4>
                            </div>
                            <p className="text-gray-300 text-sm mb-4">{evaluationResult.openHashAdvantage.description}</p>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-white/10 rounded-lg p-3 text-center">
                                    <div className="text-yellow-400 font-bold">{evaluationResult.openHashAdvantage.ipStrength}</div>
                                    <div className="text-xs text-gray-300">IP 경쟁력</div>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3 text-center">
                                    <div className="text-yellow-400 font-bold">{evaluationResult.openHashAdvantage.trustScore}</div>
                                    <div className="text-xs text-gray-300">신뢰도 점수</div>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3 text-center">
                                    <div className="text-yellow-400 font-bold">{evaluationResult.openHashAdvantage.globalReadiness}</div>
                                    <div className="text-xs text-gray-300">글로벌 준비도</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
