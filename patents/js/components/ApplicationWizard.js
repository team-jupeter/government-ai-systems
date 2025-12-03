// ApplicationWizard 컴포넌트 - AI 출원서 작성 마법사
const ApplicationWizard = ({ ipType, ipTypes }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // 기본 정보
        applicantType: 'individual',
        applicantName: '',
        applicantId: '',
        applicantAddress: '',
        applicantEmail: '',
        applicantPhone: '',
        
        // 발명 정보
        inventionTitle: '',
        inventionTitleEn: '',
        techField: '',
        inventionSummary: '',
        technicalProblem: '',
        technicalSolution: '',
        technicalEffect: '',
        keywords: '',
        
        // 청구항
        claims: [],
        
        // 도면
        drawings: [],
        
        // 우선권
        priorityClaim: false,
        priorityCountry: '',
        priorityNumber: '',
        priorityDate: '',
        
        // 오픈해시
        openHashTimestamp: null,
        openHashHash: '',
        
        // 개인정보 금고 연동
        vaultConnected: false,
        vaultId: ''
    });
    
    const [aiAnalysis, setAiAnalysis] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [generatedClaims, setGeneratedClaims] = useState([]);
    const [isLoadingFromVault, setIsLoadingFromVault] = useState(false);

    const typeInfo = ipTypes[ipType] || ipTypes.patent;
    
    const steps = [
        { id: 1, title: '출원인 정보', icon: 'fa-user' },
        { id: 2, title: '발명 내용', icon: 'fa-lightbulb' },
        { id: 3, title: 'AI 분석', icon: 'fa-robot' },
        { id: 4, title: '청구항 생성', icon: 'fa-list-ol' },
        { id: 5, title: '우선권/오픈해시', icon: 'fa-link' },
        { id: 6, title: '검토 및 제출', icon: 'fa-paper-plane' }
    ];

    const techFields = [
        { id: 'ai', name: 'AI/머신러닝', icon: '🤖' },
        { id: 'blockchain', name: '블록체인/분산원장', icon: '⛓️' },
        { id: 'iot', name: 'IoT/스마트기기', icon: '📱' },
        { id: 'bio', name: '바이오/의료', icon: '🧬' },
        { id: 'energy', name: '에너지/환경', icon: '⚡' },
        { id: 'material', name: '신소재/화학', icon: '🧪' },
        { id: 'mechanical', name: '기계/자동차', icon: '⚙️' },
        { id: 'electronics', name: '전기/전자', icon: '💡' },
        { id: 'software', name: '소프트웨어', icon: '💻' },
        { id: 'design', name: '디자인/UX', icon: '🎨' }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // 개인정보 금고에서 출원인 정보 불러오기
    const loadFromVault = async () => {
        setIsLoadingFromVault(true);
        
        // 시뮬레이션 (실제로는 개인정보 금고 API 호출)
        setTimeout(() => {
            setFormData(prev => ({
                ...prev,
                applicantName: '홍길동',
                applicantId: '******-*******',
                applicantAddress: '제주특별자치도 제주시 첨단로 123',
                applicantEmail: 'hong@example.com',
                applicantPhone: '010-****-5678',
                applicantType: 'individual',
                vaultConnected: true,
                vaultId: 'VAULT_' + Math.random().toString(36).substring(2, 10).toUpperCase()
            }));
            setIsLoadingFromVault(false);
        }, 1500);
    };

    // AI 분석 실행
    const runAIAnalysis = async () => {
        setIsAnalyzing(true);
        
        setTimeout(() => {
            const noveltyScore = Math.floor(Math.random() * 25) + 70;
            const registrationProb = Math.floor(Math.random() * 20) + 75;
            
            setAiAnalysis({
                noveltyScore,
                registrationProbability: registrationProb,
                priorArtCount: Math.floor(Math.random() * 15) + 3,
                similarPatents: [
                    { number: 'KR10-2024-0012345', title: '유사 기술 특허 A', similarity: Math.floor(Math.random() * 20) + 40 },
                    { number: 'US2023/0123456', title: 'Similar Technology Patent B', similarity: Math.floor(Math.random() * 20) + 30 },
                    { number: 'CN112345678A', title: '相关技术专利 C', similarity: Math.floor(Math.random() * 20) + 25 }
                ],
                suggestions: [
                    noveltyScore < 80 ? '청구항의 기술적 특징을 더 구체화하세요' : '청구항 구성이 양호합니다',
                    '종속항을 추가하여 권리 범위를 확장하세요',
                    registrationProb < 85 ? '선행기술과의 차별점을 명확히 기재하세요' : '해외 출원도 검토하세요'
                ],
                marketPotential: {
                    domestic: Math.floor(Math.random() * 500) + 100,
                    global: Math.floor(Math.random() * 5000) + 1000
                },
                analysisTime: (Math.random() * 0.5 + 0.2).toFixed(3)
            });
            
            setIsAnalyzing(false);
        }, 2500);
    };

    // AI 청구항 생성
    const generateClaims = async () => {
        setIsAnalyzing(true);
        
        setTimeout(() => {
            setGeneratedClaims([
                {
                    type: 'independent',
                    number: 1,
                    text: `${formData.inventionTitle}에 있어서,\n${formData.technicalSolution}을 포함하는 것을 특징으로 하는 ${formData.techField ? techFields.find(f => f.id === formData.techField)?.name : ''} 관련 시스템.`
                },
                {
                    type: 'dependent',
                    number: 2,
                    text: `제1항에 있어서,\n상기 시스템은 오픈해시 기반 타임스탬프를 통해 데이터 무결성을 보장하는 것을 특징으로 하는 시스템.`
                },
                {
                    type: 'dependent',
                    number: 3,
                    text: `제1항에 있어서,\n상기 시스템은 AI 에이전트를 통해 자동화된 처리를 수행하는 것을 특징으로 하는 시스템.`
                },
                {
                    type: 'independent',
                    number: 4,
                    text: `${formData.inventionTitle}의 방법에 있어서,\n(a) 입력 데이터를 수신하는 단계;\n(b) ${formData.technicalSolution}을 수행하는 단계; 및\n(c) 처리 결과를 출력하는 단계를 포함하는 방법.`
                }
            ]);
            setIsAnalyzing(false);
        }, 2000);
    };

    // 오픈해시 타임스탬프 생성
    const generateOpenHashTimestamp = () => {
        const now = new Date();
        const hash = 'OH_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        
        setFormData(prev => ({
            ...prev,
            openHashTimestamp: now.toISOString(),
            openHashHash: hash.toUpperCase()
        }));
    };

    // 스텝 렌더링
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return renderApplicantStep();
            case 2:
                return renderInventionStep();
            case 3:
                return renderAIAnalysisStep();
            case 4:
                return renderClaimsStep();
            case 5:
                return renderPriorityStep();
            case 6:
                return renderReviewStep();
            default:
                return null;
        }
    };

    // Step 1: 출원인 정보 (개인정보 금고 연동)
    const renderApplicantStep = () => (
        <div className="space-y-6">
            {/* 개인정보 금고 연동 안내 */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-5 text-white">
                <div className="flex items-start gap-4">
                    <div className="text-4xl">🔐</div>
                    <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1">개인정보 금고에서 자동 불러오기</h4>
                        <p className="text-blue-100 text-sm mb-3">
                            개인정보 금고에서 출원인 정보를 안전하게 불러옵니다. 
                            신원 정보가 자동으로 검증되므로 <strong>수수료 감면을 위한 별도 증빙서류 제출이 불필요</strong>합니다.
                        </p>
                        {formData.vaultConnected ? (
                            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                                <i className="fas fa-check-circle text-green-300"></i>
                                <span className="text-sm">개인정보 금고 연동 완료 (ID: {formData.vaultId})</span>
                            </div>
                        ) : (
                            <button
                                onClick={loadFromVault}
                                disabled={isLoadingFromVault}
                                className="bg-white text-blue-600 px-5 py-2 rounded-lg font-medium hover:bg-blue-50 transition disabled:opacity-50"
                            >
                                {isLoadingFromVault ? (
                                    <span className="flex items-center gap-2">
                                        <i className="fas fa-spinner loading-spin"></i>
                                        연동 중...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <i className="fas fa-link"></i>
                                        개인정보 금고에서 불러오기
                                    </span>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* 수수료 감면 자동 적용 안내 */}
            {formData.vaultConnected && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <i className="fas fa-badge-check text-green-500 text-xl mt-0.5"></i>
                        <div>
                            <h5 className="font-medium text-green-800">수수료 감면 자동 적용</h5>
                            <p className="text-sm text-green-700 mt-1">
                                개인정보 금고의 신원 정보가 확인되어 출원인 유형에 따른 수수료 감면이 자동 적용됩니다.
                                별도의 증빙서류 제출이 필요 없습니다.
                            </p>
                            <div className="mt-2 flex gap-4 text-xs text-green-600">
                                <span>✓ 개인: 70% 감면</span>
                                <span>✓ 중소기업: 70% 감면</span>
                                <span>✓ 대학/연구소: 85% 감면</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">출원인 유형</label>
                <div className="grid grid-cols-4 gap-3">
                    {[
                        { id: 'individual', label: '개인', icon: '👤', discount: '70%' },
                        { id: 'corporation', label: '법인/기업', icon: '🏢', discount: '50%' },
                        { id: 'university', label: '대학/연구소', icon: '🎓', discount: '85%' },
                        { id: 'research', label: '공공기관', icon: '🏛️', discount: '100%' }
                    ].map(type => (
                        <button
                            key={type.id}
                            onClick={() => handleInputChange('applicantType', type.id)}
                            className={`p-4 rounded-lg border-2 transition ${
                                formData.applicantType === type.id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-blue-300'
                            }`}
                        >
                            <div className="text-2xl mb-1">{type.icon}</div>
                            <div className="text-sm font-medium">{type.label}</div>
                            <div className="text-xs text-green-600 mt-1">감면 {type.discount}</div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {formData.applicantType === 'individual' ? '성명' : '법인명'} *
                        {formData.vaultConnected && <span className="text-green-500 text-xs ml-2">✓ 금고 연동</span>}
                    </label>
                    <input
                        type="text"
                        value={formData.applicantName}
                        onChange={(e) => handleInputChange('applicantName', e.target.value)}
                        className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            formData.vaultConnected ? 'bg-gray-50 border-green-300' : 'border-gray-300'
                        }`}
                        placeholder={formData.applicantType === 'individual' ? '홍길동' : '(주)오픈해시'}
                        readOnly={formData.vaultConnected}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {formData.applicantType === 'individual' ? '주민등록번호' : '사업자등록번호'} *
                        {formData.vaultConnected && <span className="text-green-500 text-xs ml-2">✓ 보안 마스킹</span>}
                    </label>
                    <input
                        type="text"
                        value={formData.applicantId}
                        onChange={(e) => handleInputChange('applicantId', e.target.value)}
                        className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            formData.vaultConnected ? 'bg-gray-50 border-green-300' : 'border-gray-300'
                        }`}
                        placeholder={formData.applicantType === 'individual' ? '000000-0000000' : '000-00-00000'}
                        readOnly={formData.vaultConnected}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    주소 *
                    {formData.vaultConnected && <span className="text-green-500 text-xs ml-2">✓ 금고 연동</span>}
                </label>
                <input
                    type="text"
                    value={formData.applicantAddress}
                    onChange={(e) => handleInputChange('applicantAddress', e.target.value)}
                    className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formData.vaultConnected ? 'bg-gray-50 border-green-300' : 'border-gray-300'
                    }`}
                    placeholder="서울특별시 강남구..."
                    readOnly={formData.vaultConnected}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">이메일 *</label>
                    <input
                        type="email"
                        value={formData.applicantEmail}
                        onChange={(e) => handleInputChange('applicantEmail', e.target.value)}
                        className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            formData.vaultConnected ? 'bg-gray-50 border-green-300' : 'border-gray-300'
                        }`}
                        placeholder="example@email.com"
                        readOnly={formData.vaultConnected}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">연락처 *</label>
                    <input
                        type="tel"
                        value={formData.applicantPhone}
                        onChange={(e) => handleInputChange('applicantPhone', e.target.value)}
                        className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            formData.vaultConnected ? 'bg-gray-50 border-green-300' : 'border-gray-300'
                        }`}
                        placeholder="010-0000-0000"
                        readOnly={formData.vaultConnected}
                    />
                </div>
            </div>

            {!formData.vaultConnected && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                        <i className="fas fa-info-circle text-yellow-500 mt-0.5"></i>
                        <div className="text-sm text-yellow-800">
                            <strong>직접 입력 시 안내:</strong> 수수료 감면을 위해 신분증 사본, 사업자등록증 등 
                            증빙서류를 별도로 제출해야 합니다. 개인정보 금고 연동 시 자동 검증됩니다.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    // Step 2: 발명 내용
    const renderInventionStep = () => (
        <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 mb-2">🤖 AI 작성 지원</h4>
                <p className="text-sm text-purple-700">발명 내용을 입력하면 AI가 청구항과 명세서를 자동 생성합니다.</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">기술 분야 *</label>
                <div className="grid grid-cols-5 gap-2">
                    {techFields.map(field => (
                        <button
                            key={field.id}
                            onClick={() => handleInputChange('techField', field.id)}
                            className={`p-3 rounded-lg border transition text-sm ${
                                formData.techField === field.id
                                    ? 'border-purple-500 bg-purple-50'
                                    : 'border-gray-200 hover:border-purple-300'
                            }`}
                        >
                            <div className="text-xl mb-1">{field.icon}</div>
                            <div className="text-xs">{field.name}</div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">발명의 명칭 (국문) *</label>
                    <input
                        type="text"
                        value={formData.inventionTitle}
                        onChange={(e) => handleInputChange('inventionTitle', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="예: 오픈해시 기반 데이터 무결성 검증 시스템"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">발명의 명칭 (영문)</label>
                    <input
                        type="text"
                        value={formData.inventionTitleEn}
                        onChange={(e) => handleInputChange('inventionTitleEn', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="예: OpenHash-based Data Integrity Verification System"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">발명의 요약 *</label>
                <textarea
                    value={formData.inventionSummary}
                    onChange={(e) => handleInputChange('inventionSummary', e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="발명의 핵심 내용을 200자 내외로 요약해주세요..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">해결하고자 하는 기술적 과제 *</label>
                <textarea
                    value={formData.technicalProblem}
                    onChange={(e) => handleInputChange('technicalProblem', e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="기존 기술의 문제점과 해결하고자 하는 과제를 기재해주세요..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">기술적 해결 수단 *</label>
                <textarea
                    value={formData.technicalSolution}
                    onChange={(e) => handleInputChange('technicalSolution', e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="과제를 해결하기 위한 구체적인 기술적 수단을 기재해주세요..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">기술적 효과</label>
                <textarea
                    value={formData.technicalEffect}
                    onChange={(e) => handleInputChange('technicalEffect', e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="발명으로 인해 얻어지는 기술적 효과를 기재해주세요..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">핵심 키워드</label>
                <input
                    type="text"
                    value={formData.keywords}
                    onChange={(e) => handleInputChange('keywords', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="예: 오픈해시, 데이터무결성, 타임스탬프, AI에이전트"
                />
            </div>
        </div>
    );

    // Step 3: AI 분석
    const renderAIAnalysisStep = () => (
        <div className="space-y-6">
            {!aiAnalysis ? (
                <div className="text-center py-12">
                    {isAnalyzing ? (
                        <div>
                            <div className="text-6xl mb-4">🤖</div>
                            <div className="text-xl font-medium text-gray-700 mb-2">AI 분석 중...</div>
                            <div className="flex justify-center gap-1">
                                <span className="typing-dot w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="typing-dot w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="typing-dot w-2 h-2 bg-blue-500 rounded-full"></span>
                            </div>
                            <p className="text-sm text-gray-500 mt-4">선행기술 검색 및 등록 가능성 분석 중</p>
                        </div>
                    ) : (
                        <div>
                            <div className="text-6xl mb-4">🔍</div>
                            <div className="text-xl font-medium text-gray-700 mb-4">AI 특허 분석 준비 완료</div>
                            <p className="text-gray-500 mb-6">입력하신 발명 내용을 바탕으로 선행기술 조사 및 등록 가능성을 분석합니다.</p>
                            <button
                                onClick={runAIAnalysis}
                                className="btn-kipo text-white px-8 py-3 rounded-lg text-lg font-medium"
                            >
                                <i className="fas fa-play mr-2"></i>
                                AI 분석 시작
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
                            <div className="text-sm opacity-80">신규성 점수</div>
                            <div className="text-4xl font-bold">{aiAnalysis.noveltyScore}</div>
                            <div className="text-sm opacity-80">/ 100점</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white">
                            <div className="text-sm opacity-80">등록 가능성</div>
                            <div className="text-4xl font-bold">{aiAnalysis.registrationProbability}%</div>
                            <div className="text-sm opacity-80">예측 정확도 95%</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white">
                            <div className="text-sm opacity-80">분석 시간</div>
                            <div className="text-4xl font-bold">{aiAnalysis.analysisTime}s</div>
                            <div className="text-sm opacity-80">{aiAnalysis.priorArtCount}건 검색</div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <i className="fas fa-search text-blue-600"></i>
                            유사 선행기술 ({aiAnalysis.priorArtCount}건)
                        </h4>
                        <div className="space-y-3">
                            {aiAnalysis.similarPatents.map((patent, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <div className="text-xs text-gray-500">{patent.number}</div>
                                        <div className="font-medium">{patent.title}</div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        patent.similarity >= 60 ? 'bg-red-100 text-red-700' :
                                        patent.similarity >= 40 ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-green-100 text-green-700'
                                    }`}>
                                        유사도 {patent.similarity}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                        <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                            <i className="fas fa-lightbulb"></i>
                            AI 개선 제안
                        </h4>
                        <ul className="space-y-2">
                            {aiAnalysis.suggestions.map((suggestion, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-blue-700">
                                    <i className="fas fa-check-circle mt-1"></i>
                                    <span>{suggestion}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
                        <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                            <i className="fas fa-chart-line"></i>
                            시장 잠재력 (예상)
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-white rounded-lg">
                                <div className="text-sm text-gray-500">국내 시장</div>
                                <div className="text-2xl font-bold text-purple-600">{aiAnalysis.marketPotential.domestic}억 원</div>
                            </div>
                            <div className="text-center p-4 bg-white rounded-lg">
                                <div className="text-sm text-gray-500">글로벌 시장</div>
                                <div className="text-2xl font-bold text-purple-600">${aiAnalysis.marketPotential.global}M</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    // Step 4: 청구항 생성
    const renderClaimsStep = () => (
        <div className="space-y-6">
            {generatedClaims.length === 0 ? (
                <div className="text-center py-12">
                    {isAnalyzing ? (
                        <div>
                            <div className="text-6xl mb-4">📝</div>
                            <div className="text-xl font-medium text-gray-700 mb-2">청구항 생성 중...</div>
                            <div className="flex justify-center gap-1">
                                <span className="typing-dot w-2 h-2 bg-purple-500 rounded-full"></span>
                                <span className="typing-dot w-2 h-2 bg-purple-500 rounded-full"></span>
                                <span className="typing-dot w-2 h-2 bg-purple-500 rounded-full"></span>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="text-6xl mb-4">📝</div>
                            <div className="text-xl font-medium text-gray-700 mb-4">AI 청구항 생성</div>
                            <p className="text-gray-500 mb-6">발명 내용을 바탕으로 특허 청구항을 자동 생성합니다.</p>
                            <button
                                onClick={generateClaims}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition"
                            >
                                <i className="fas fa-magic mr-2"></i>
                                청구항 자동 생성
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-medium text-green-800 mb-2">✅ 청구항 {generatedClaims.length}개 생성 완료</h4>
                        <p className="text-sm text-green-700">생성된 청구항을 검토하고 필요시 수정해주세요.</p>
                    </div>
                    
                    {generatedClaims.map((claim, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        claim.type === 'independent' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                        {claim.type === 'independent' ? '독립항' : '종속항'}
                                    </span>
                                    <span className="font-bold text-gray-800">청구항 {claim.number}</span>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 text-gray-700 whitespace-pre-wrap text-sm">
                                {claim.text}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    // Step 5: 우선권/오픈해시
    const renderPriorityStep = () => (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 rounded-xl p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">⛓️</div>
                    <div>
                        <h3 className="text-xl font-bold text-yellow-400">오픈해시 우선권 증명</h3>
                        <p className="text-gray-300 text-sm">선출원주의 시대, 출원 시각을 기술적으로 증명합니다</p>
                    </div>
                </div>
                
                {formData.openHashTimestamp ? (
                    <div className="bg-white/10 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-300">타임스탬프</span>
                            <span className="font-mono text-yellow-400">{formData.openHashTimestamp}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-300">해시값</span>
                            <span className="font-mono text-green-400 text-sm">{formData.openHashHash}</span>
                        </div>
                        <div className="text-center pt-2">
                            <span className="text-green-400 text-sm"><i className="fas fa-check-circle mr-1"></i>우선권 증명 등록 완료</span>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={generateOpenHashTimestamp}
                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 py-3 rounded-lg font-bold transition"
                    >
                        <i className="fas fa-link mr-2"></i>
                        오픈해시 타임스탬프 생성
                    </button>
                )}
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                    <input
                        type="checkbox"
                        id="priorityClaim"
                        checked={formData.priorityClaim}
                        onChange={(e) => handleInputChange('priorityClaim', e.target.checked)}
                        className="w-5 h-5 rounded"
                    />
                    <label htmlFor="priorityClaim" className="font-medium text-gray-800">
                        조약에 의한 우선권 주장
                    </label>
                </div>
                
                {formData.priorityClaim && (
                    <div className="grid grid-cols-3 gap-4 pl-8">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">출원국</label>
                            <select
                                value={formData.priorityCountry}
                                onChange={(e) => handleInputChange('priorityCountry', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            >
                                <option value="">선택</option>
                                <option value="US">미국 (US)</option>
                                <option value="EP">유럽 (EP)</option>
                                <option value="CN">중국 (CN)</option>
                                <option value="JP">일본 (JP)</option>
                                <option value="PCT">PCT</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">출원번호</label>
                            <input
                                type="text"
                                value={formData.priorityNumber}
                                onChange={(e) => handleInputChange('priorityNumber', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                placeholder="출원번호"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">출원일</label>
                            <input
                                type="date"
                                value={formData.priorityDate}
                                onChange={(e) => handleInputChange('priorityDate', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    // Step 6: 검토 및 제출
    const renderReviewStep = () => (
        <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2">✅ 출원서 작성 완료</h4>
                <p className="text-sm text-green-700">아래 내용을 검토하고 제출해주세요. 최종 결정은 사람 변리사가 승인합니다.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                    <h4 className="font-bold text-gray-800">출원 요약</h4>
                </div>
                <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="text-sm text-gray-500">출원 유형</span>
                            <div className="font-medium">{typeInfo.icon} {typeInfo.name}</div>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">출원인</span>
                            <div className="font-medium">{formData.applicantName || '-'}</div>
                        </div>
                        <div className="col-span-2">
                            <span className="text-sm text-gray-500">발명의 명칭</span>
                            <div className="font-medium">{formData.inventionTitle || '-'}</div>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">청구항 수</span>
                            <div className="font-medium">{generatedClaims.length}개</div>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">등록 예측</span>
                            <div className="font-medium text-green-600">{aiAnalysis?.registrationProbability || '-'}%</div>
                        </div>
                    </div>
                    
                    {formData.vaultConnected && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-blue-800">
                                <i className="fas fa-shield-alt"></i>
                                <span className="font-medium">개인정보 금고 연동</span>
                            </div>
                            <p className="text-sm text-blue-700 mt-1">신원 확인 완료 - 수수료 감면 자동 적용</p>
                        </div>
                    )}
                    
                    {formData.openHashHash && (
                        <div className="bg-gray-900 text-white rounded-lg p-4">
                            <div className="text-sm text-yellow-400 mb-1">⛓️ 오픈해시 우선권 증명</div>
                            <div className="font-mono text-xs text-gray-300">{formData.openHashHash}</div>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h4 className="font-bold text-gray-800 mb-4">💳 예상 수수료</h4>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-600">출원료</span>
                        <span className="font-medium">46,000원</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">심사청구료 (청구항 {generatedClaims.length}개)</span>
                        <span className="font-medium">{(143000 + generatedClaims.length * 44000).toLocaleString()}원</span>
                    </div>
                    {formData.vaultConnected && (
                        <div className="flex justify-between text-green-600">
                            <span>감면 (70%)</span>
                            <span className="font-medium">-{Math.round((189000 + generatedClaims.length * 44000) * 0.7).toLocaleString()}원</span>
                        </div>
                    )}
                    <div className="border-t border-gray-200 pt-2 flex justify-between">
                        <span className="font-bold text-gray-800">최종 결제 금액</span>
                        <span className="font-bold text-blue-600">
                            {formData.vaultConnected 
                                ? Math.round((189000 + generatedClaims.length * 44000) * 0.3).toLocaleString()
                                : (189000 + generatedClaims.length * 44000).toLocaleString()
                            }원
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition">
                    <i className="fas fa-save mr-2"></i>
                    임시저장
                </button>
                <button className="flex-1 btn-submit text-white py-3 rounded-lg font-medium">
                    <i className="fas fa-paper-plane mr-2"></i>
                    변리사 승인 요청
                </button>
            </div>
        </div>
    );

    return (
        <div className="space-y-6 pt-[140px]">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="text-3xl">{typeInfo.icon}</span>
                        {typeInfo.name} 출원
                    </h2>
                    <p className="text-gray-500">AI가 출원서 작성을 도와드립니다 (권리기간: {typeInfo.duration})</p>
                </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                    {steps.map((step, idx) => (
                        <React.Fragment key={step.id}>
                            <div 
                                className={`flex flex-col items-center cursor-pointer ${
                                    currentStep === step.id ? 'text-blue-600' : 
                                    currentStep > step.id ? 'text-green-600' : 'text-gray-400'
                                }`}
                                onClick={() => currentStep > step.id && setCurrentStep(step.id)}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                                    currentStep === step.id ? 'bg-blue-600 text-white' :
                                    currentStep > step.id ? 'bg-green-500 text-white' : 'bg-gray-200'
                                }`}>
                                    {currentStep > step.id ? (
                                        <i className="fas fa-check"></i>
                                    ) : (
                                        <i className={`fas ${step.icon}`}></i>
                                    )}
                                </div>
                                <span className="text-xs font-medium">{step.title}</span>
                            </div>
                            {idx < steps.length - 1 && (
                                <div className={`flex-1 h-1 mx-2 rounded ${
                                    currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                                }`}></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
                {renderStep()}
            </div>

            <div className="flex justify-between">
                <button
                    onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                    disabled={currentStep === 1}
                    className={`px-6 py-2 rounded-lg font-medium ${
                        currentStep === 1 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    <i className="fas fa-arrow-left mr-2"></i>
                    이전
                </button>
                <button
                    onClick={() => setCurrentStep(prev => Math.min(6, prev + 1))}
                    disabled={currentStep === 6}
                    className={`px-6 py-2 rounded-lg font-medium ${
                        currentStep === 6
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'btn-kipo text-white'
                    }`}
                >
                    다음
                    <i className="fas fa-arrow-right ml-2"></i>
                </button>
            </div>
        </div>
    );
};
