// ClaimGenerator 컴포넌트 - 청구항 자동 생성
const ClaimGenerator = () => {
    const [inventionData, setInventionData] = useState({
        title: '',
        techField: '',
        problem: '',
        solution: '',
        components: '',
        effects: ''
    });
    const [generatedClaims, setGeneratedClaims] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [claimStyle, setClaimStyle] = useState('standard'); // standard, broad, narrow

    const claimStyles = [
        { id: 'broad', label: '넓은 권리범위', desc: '핵심 기술만 포함, 회피 어려움', icon: '🌐' },
        { id: 'standard', label: '표준 권리범위', desc: '균형잡힌 권리범위', icon: '⚖️' },
        { id: 'narrow', label: '좁은 권리범위', desc: '구체적, 등록 가능성 높음', icon: '🎯' }
    ];

    const generateClaims = async () => {
        if (!inventionData.title || !inventionData.solution) {
            alert('발명의 명칭과 기술적 해결수단을 입력해주세요.');
            return;
        }

        setIsGenerating(true);

        setTimeout(() => {
            const claims = [];
            
            // 독립 청구항 1 (물건)
            claims.push({
                number: 1,
                type: 'independent',
                category: 'product',
                text: generateProductClaim(inventionData, claimStyle)
            });

            // 종속 청구항 2-3
            claims.push({
                number: 2,
                type: 'dependent',
                category: 'product',
                baseClaimNumber: 1,
                text: `제1항에 있어서,\n상기 시스템은 오픈해시 기반의 타임스탬프 모듈을 더 포함하여 데이터 무결성을 검증하는 것을 특징으로 하는 ${inventionData.title}.`
            });

            claims.push({
                number: 3,
                type: 'dependent',
                category: 'product',
                baseClaimNumber: 1,
                text: `제1항에 있어서,\n상기 시스템은 AI 에이전트를 통해 자동화된 의사결정을 수행하는 것을 특징으로 하는 ${inventionData.title}.`
            });

            // 독립 청구항 4 (방법)
            claims.push({
                number: 4,
                type: 'independent',
                category: 'method',
                text: generateMethodClaim(inventionData, claimStyle)
            });

            // 종속 청구항 5-6
            claims.push({
                number: 5,
                type: 'dependent',
                category: 'method',
                baseClaimNumber: 4,
                text: `제4항에 있어서,\n상기 처리 단계는 분산 노드들 간의 합의 알고리즘을 통해 수행되는 것을 특징으로 하는 방법.`
            });

            claims.push({
                number: 6,
                type: 'dependent',
                category: 'method',
                baseClaimNumber: 4,
                text: `제4항에 있어서,\n상기 출력 단계 이후에 처리 결과를 블록체인 또는 오픈해시 네트워크에 기록하는 단계를 더 포함하는 것을 특징으로 하는 방법.`
            });

            setGeneratedClaims(claims);
            setIsGenerating(false);
        }, 2500);
    };

    const generateProductClaim = (data, style) => {
        const baseElements = data.solution.split(',').map(s => s.trim()).filter(s => s);
        
        let claimText = `${data.title}에 있어서,\n`;
        
        if (style === 'broad') {
            claimText += `${baseElements[0] || '데이터를 처리하는 처리부'}; 및\n`;
            claimText += `상기 처리부와 연동되는 제어부를 포함하는 것을 특징으로 하는 시스템.`;
        } else if (style === 'narrow') {
            claimText += baseElements.map((el, idx) => `${el}${idx < baseElements.length - 1 ? ';' : ''}`).join('\n');
            claimText += `\n을 포함하고,\n상기 각 구성요소는 네트워크를 통해 상호 연결되어 실시간으로 데이터를 교환하는 것을 특징으로 하는 시스템.`;
        } else {
            claimText += baseElements.slice(0, 3).map((el, idx) => `${el}${idx < 2 ? ';' : ''}`).join('\n');
            claimText += `\n을 포함하는 것을 특징으로 하는 시스템.`;
        }
        
        return claimText;
    };

    const generateMethodClaim = (data, style) => {
        let claimText = `${data.title}의 처리 방법에 있어서,\n`;
        
        claimText += `(a) 입력 데이터를 수신하는 단계;\n`;
        claimText += `(b) 상기 입력 데이터를 분석하여 처리하는 단계;\n`;
        claimText += `(c) 처리 결과를 검증하는 단계; 및\n`;
        claimText += `(d) 검증된 결과를 출력하는 단계\n`;
        claimText += `를 포함하는 것을 특징으로 하는 방법.`;
        
        return claimText;
    };

    const updateClaim = (index, newText) => {
        setGeneratedClaims(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], text: newText };
            return updated;
        });
    };

    const deleteClaim = (index) => {
        setGeneratedClaims(prev => prev.filter((_, idx) => idx !== index));
    };

    const addClaim = (type, category) => {
        const newNumber = generatedClaims.length + 1;
        const newClaim = {
            number: newNumber,
            type,
            category,
            baseClaimNumber: type === 'dependent' ? 1 : null,
            text: type === 'independent' 
                ? `[새 독립 청구항 ${newNumber}]\n\n여기에 청구항 내용을 작성하세요.`
                : `제1항에 있어서,\n\n[추가 기술적 특징을 작성하세요]\n\n을 특징으로 하는 시스템/방법.`
        };
        setGeneratedClaims(prev => [...prev, newClaim]);
    };

    return (
        <div className="space-y-6 pt-[140px]">
            {/* 페이지 타이틀 */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="text-3xl">📝</span>
                        AI 청구항 생성기
                    </h2>
                    <p className="text-gray-500">발명 내용을 입력하면 AI가 청구항을 자동 생성합니다</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* 좌측: 입력 영역 */}
                <div className="space-y-4">
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4">발명 정보 입력</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">발명의 명칭 *</label>
                                <input
                                    type="text"
                                    value={inventionData.title}
                                    onChange={(e) => setInventionData(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                    placeholder="예: 오픈해시 기반 데이터 무결성 검증 시스템"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">기술 분야</label>
                                <input
                                    type="text"
                                    value={inventionData.techField}
                                    onChange={(e) => setInventionData(prev => ({ ...prev, techField: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                    placeholder="예: 분산 원장 기술, 데이터 보안"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">해결 과제</label>
                                <textarea
                                    value={inventionData.problem}
                                    onChange={(e) => setInventionData(prev => ({ ...prev, problem: e.target.value }))}
                                    rows={2}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                    placeholder="기존 기술의 문제점..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">기술적 해결수단 *</label>
                                <textarea
                                    value={inventionData.solution}
                                    onChange={(e) => setInventionData(prev => ({ ...prev, solution: e.target.value }))}
                                    rows={3}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                    placeholder="예: 해시 생성 모듈, 타임스탬프 검증부, 분산 저장 노드"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">구성요소 (쉼표로 구분)</label>
                                <input
                                    type="text"
                                    value={inventionData.components}
                                    onChange={(e) => setInventionData(prev => ({ ...prev, components: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                    placeholder="예: 입력부, 처리부, 저장부, 출력부"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 청구항 스타일 선택 */}
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3">청구항 스타일</h4>
                        <div className="grid grid-cols-3 gap-3">
                            {claimStyles.map(style => (
                                <button
                                    key={style.id}
                                    onClick={() => setClaimStyle(style.id)}
                                    className={`p-3 rounded-lg border-2 transition text-center ${
                                        claimStyle === style.id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-blue-300'
                                    }`}
                                >
                                    <div className="text-2xl mb-1">{style.icon}</div>
                                    <div className="text-sm font-medium">{style.label}</div>
                                    <div className="text-xs text-gray-500">{style.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={generateClaims}
                        disabled={isGenerating}
                        className="w-full btn-kipo text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50"
                    >
                        {isGenerating ? (
                            <span className="flex items-center justify-center gap-2">
                                <i className="fas fa-spinner loading-spin"></i>
                                청구항 생성 중...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <i className="fas fa-magic"></i>
                                AI 청구항 생성
                            </span>
                        )}
                    </button>
                </div>

                {/* 우측: 생성된 청구항 */}
                <div className="space-y-4">
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-800">생성된 청구항</h3>
                            {generatedClaims.length > 0 && (
                                <span className="text-sm text-gray-500">{generatedClaims.length}개</span>
                            )}
                        </div>

                        {generatedClaims.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <div className="text-5xl mb-4">📝</div>
                                <p>발명 정보를 입력하고<br/>AI 청구항 생성 버튼을 클릭하세요</p>
                            </div>
                        ) : (
                            <div className="space-y-4 max-h-[600px] overflow-y-auto">
                                {generatedClaims.map((claim, idx) => (
                                    <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                                        <div className="bg-gray-50 px-4 py-2 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                                    claim.type === 'independent' 
                                                        ? 'bg-blue-100 text-blue-700' 
                                                        : 'bg-gray-200 text-gray-600'
                                                }`}>
                                                    {claim.type === 'independent' ? '독립항' : '종속항'}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded text-xs ${
                                                    claim.category === 'product'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-purple-100 text-purple-700'
                                                }`}>
                                                    {claim.category === 'product' ? '물건' : '방법'}
                                                </span>
                                                <span className="font-medium text-gray-800">청구항 {claim.number}</span>
                                            </div>
                                            <div className="flex gap-1">
                                                <button 
                                                    onClick={() => deleteClaim(idx)}
                                                    className="text-red-500 hover:text-red-700 p-1"
                                                >
                                                    <i className="fas fa-trash text-sm"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <textarea
                                            value={claim.text}
                                            onChange={(e) => updateClaim(idx, e.target.value)}
                                            rows={6}
                                            className="w-full px-4 py-3 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                                        />
                                    </div>
                                ))}

                                {/* 청구항 추가 버튼 */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => addClaim('independent', 'product')}
                                        className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-3 text-gray-500 hover:border-blue-400 hover:text-blue-600 transition text-sm"
                                    >
                                        <i className="fas fa-plus mr-1"></i> 독립항 추가
                                    </button>
                                    <button
                                        onClick={() => addClaim('dependent', 'product')}
                                        className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-3 text-gray-500 hover:border-blue-400 hover:text-blue-600 transition text-sm"
                                    >
                                        <i className="fas fa-plus mr-1"></i> 종속항 추가
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {generatedClaims.length > 0 && (
                        <div className="flex gap-3">
                            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition">
                                <i className="fas fa-download mr-2"></i>
                                명세서 다운로드
                            </button>
                            <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition">
                                <i className="fas fa-copy mr-2"></i>
                                클립보드 복사
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
