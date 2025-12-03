// GlobalCaseSearch 컴포넌트 - 국제 사례 검색
const GlobalCaseSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCountries, setSelectedCountries] = useState(['KR', 'US', 'EP', 'CN', 'JP']);
    const [caseType, setCaseType] = useState('all'); // all, granted, rejected, litigation
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [selectedCase, setSelectedCase] = useState(null);

    const countries = [
        { code: 'KR', name: '한국', flag: '🇰🇷', office: 'KIPO' },
        { code: 'US', name: '미국', flag: '🇺🇸', office: 'USPTO' },
        { code: 'EP', name: '유럽', flag: '🇪🇺', office: 'EPO' },
        { code: 'CN', name: '중국', flag: '🇨🇳', office: 'CNIPA' },
        { code: 'JP', name: '일본', flag: '🇯🇵', office: 'JPO' }
    ];

    const caseTypes = [
        { id: 'all', label: '전체', icon: '📋' },
        { id: 'granted', label: '등록 사례', icon: '✅' },
        { id: 'rejected', label: '거절 사례', icon: '❌' },
        { id: 'litigation', label: '소송 사례', icon: '⚖️' }
    ];

    const toggleCountry = (code) => {
        setSelectedCountries(prev =>
            prev.includes(code)
                ? prev.filter(c => c !== code)
                : [...prev, code]
        );
    };

    const performSearch = () => {
        if (!searchQuery.trim()) {
            alert('검색어를 입력해주세요.');
            return;
        }

        setIsSearching(true);

        setTimeout(() => {
            setSearchResults({
                totalCount: Math.floor(Math.random() * 300) + 50,
                searchTime: (Math.random() * 0.4 + 0.2).toFixed(3),
                cases: [
                    {
                        id: 'KR-2024-0001',
                        country: 'KR',
                        type: 'granted',
                        title: '블록체인 기반 전자문서 인증 시스템',
                        applicant: '삼성전자(주)',
                        applicationDate: '2023-03-15',
                        decisionDate: '2024-06-20',
                        examiner: '기술심사1팀',
                        claims: 15,
                        result: '등록결정',
                        keyFactors: ['명확한 청구항', '구체적 실시예', '선행기술 차별화'],
                        abstract: '본 발명은 블록체인 기술을 활용하여 전자문서의 진위를 인증하는 시스템에 관한 것으로...'
                    },
                    {
                        id: 'US-2023-0456',
                        country: 'US',
                        type: 'granted',
                        title: 'Distributed Ledger Based Authentication System',
                        applicant: 'Google LLC',
                        applicationDate: '2022-08-10',
                        decisionDate: '2024-02-15',
                        examiner: 'TC 2400',
                        claims: 22,
                        result: 'Allowed',
                        keyFactors: ['Novel hash algorithm', 'Specific technical implementation', 'Clear claim language'],
                        abstract: 'A system and method for authenticating digital documents using distributed ledger technology...'
                    },
                    {
                        id: 'EP-2023-0789',
                        country: 'EP',
                        type: 'rejected',
                        title: 'Data Integrity Verification Method',
                        applicant: 'SAP SE',
                        applicationDate: '2022-05-20',
                        decisionDate: '2024-01-10',
                        examiner: 'Examining Division',
                        claims: 18,
                        result: 'Refused',
                        rejectionReasons: ['Art. 54 (Lack of novelty)', 'Art. 56 (Lack of inventive step)'],
                        abstract: 'The present invention relates to a method for verifying data integrity...'
                    },
                    {
                        id: 'CN-2023-1234',
                        country: 'CN',
                        type: 'granted',
                        title: '基于区块链的数据认证方法',
                        applicant: '阿里巴巴集团',
                        applicationDate: '2022-11-05',
                        decisionDate: '2024-04-20',
                        examiner: '实质审查部',
                        claims: 12,
                        result: '授权',
                        keyFactors: ['创新性技术方案', '详细实施例', '明确的保护范围'],
                        abstract: '本发明涉及一种基于区块链技术的数据认证方法...'
                    },
                    {
                        id: 'JP-2023-5678',
                        country: 'JP',
                        type: 'litigation',
                        title: 'データ完全性検証システム',
                        applicant: 'Sony Corporation',
                        applicationDate: '2022-07-15',
                        decisionDate: '2024-03-25',
                        examiner: '特許庁審判部',
                        claims: 20,
                        result: '審決取消訴訟',
                        litigationDetails: { court: '知財高裁', caseNumber: '令和5年(行ケ)第10234号', status: '係属中' },
                        abstract: '本発明は、データの完全性を検証するためのシステムに関する...'
                    }
                ],
                statistics: {
                    byCountry: {
                        KR: { total: 85, granted: 62, rejected: 18, pending: 5 },
                        US: { total: 120, granted: 78, rejected: 32, pending: 10 },
                        EP: { total: 45, granted: 28, rejected: 15, pending: 2 },
                        CN: { total: 95, granted: 70, rejected: 20, pending: 5 },
                        JP: { total: 55, granted: 38, rejected: 12, pending: 5 }
                    },
                    avgExaminationPeriod: {
                        KR: 14.2,
                        US: 22.5,
                        EP: 36.8,
                        CN: 18.3,
                        JP: 15.7
                    }
                }
            });
            setIsSearching(false);
        }, 2000);
    };

    const getResultBadge = (result, type) => {
        if (type === 'granted') return { class: 'bg-green-100 text-green-700', icon: '✅' };
        if (type === 'rejected') return { class: 'bg-red-100 text-red-700', icon: '❌' };
        if (type === 'litigation') return { class: 'bg-purple-100 text-purple-700', icon: '⚖️' };
        return { class: 'bg-gray-100 text-gray-700', icon: '📋' };
    };

    return (
        <div className="space-y-6 pt-[140px]">
            {/* 페이지 타이틀 */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="text-3xl">🌐</span>
                        국제 사례 검색
                    </h2>
                    <p className="text-gray-500">전 세계 특허청의 심사/소송 사례를 검색하고 분석합니다</p>
                </div>
            </div>

            {/* 검색 영역 */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex gap-3 mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && performSearch()}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                        placeholder="기술 키워드 또는 특허번호를 입력하세요"
                    />
                    <button
                        onClick={performSearch}
                        disabled={isSearching}
                        className="btn-kipo text-white px-8 py-3 rounded-lg font-medium disabled:opacity-50"
                    >
                        {isSearching ? <i className="fas fa-spinner loading-spin"></i> : <><i className="fas fa-globe mr-2"></i>검색</>}
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* 국가 선택 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">검색 대상 국가</label>
                        <div className="flex flex-wrap gap-2">
                            {countries.map(country => (
                                <button
                                    key={country.code}
                                    onClick={() => toggleCountry(country.code)}
                                    className={`px-4 py-2 rounded-lg text-sm transition flex items-center gap-2 ${
                                        selectedCountries.includes(country.code)
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    <span>{country.flag}</span>
                                    <span>{country.name}</span>
                                    <span className="text-xs opacity-70">({country.office})</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 사례 유형 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">사례 유형</label>
                        <div className="flex gap-2">
                            {caseTypes.map(type => (
                                <button
                                    key={type.id}
                                    onClick={() => setCaseType(type.id)}
                                    className={`px-4 py-2 rounded-lg text-sm transition flex items-center gap-2 ${
                                        caseType === type.id
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    <span>{type.icon}</span>
                                    <span>{type.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 검색 결과 */}
            {searchResults && (
                <div className="grid grid-cols-3 gap-6">
                    {/* 좌측: 사례 목록 */}
                    <div className="col-span-2 space-y-4">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="px-5 py-3 border-b border-gray-200 flex items-center justify-between">
                                <h3 className="font-bold text-gray-800">
                                    검색 결과 ({searchResults.totalCount}건)
                                </h3>
                                <span className="text-sm text-gray-500">{searchResults.searchTime}초</span>
                            </div>
                            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                                {searchResults.cases.map((caseItem, idx) => {
                                    const country = countries.find(c => c.code === caseItem.country);
                                    const badge = getResultBadge(caseItem.result, caseItem.type);
                                    
                                    return (
                                        <div 
                                            key={idx} 
                                            className={`p-5 hover:bg-gray-50 cursor-pointer transition ${
                                                selectedCase?.id === caseItem.id ? 'bg-blue-50' : ''
                                            }`}
                                            onClick={() => setSelectedCase(caseItem)}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-lg">{country?.flag}</span>
                                                        <span className="font-mono text-sm text-gray-500">{caseItem.id}</span>
                                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${badge.class}`}>
                                                            {badge.icon} {caseItem.result}
                                                        </span>
                                                    </div>
                                                    <h4 className="font-medium text-gray-800 mb-1">{caseItem.title}</h4>
                                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                                        <span><i className="fas fa-building mr-1"></i>{caseItem.applicant}</span>
                                                        <span><i className="fas fa-calendar mr-1"></i>{caseItem.decisionDate}</span>
                                                        <span><i className="fas fa-list-ol mr-1"></i>청구항 {caseItem.claims}개</span>
                                                    </div>
                                                </div>
                                                <i className="fas fa-chevron-right text-gray-400"></i>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* 우측: 상세 정보 & 통계 */}
                    <div className="col-span-1 space-y-4">
                        {/* 선택된 사례 상세 */}
                        {selectedCase ? (
                            <div className="bg-white rounded-xl p-5 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-bold text-gray-800">사례 상세</h4>
                                    <button 
                                        onClick={() => setSelectedCase(null)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <span className="text-gray-500">출원인:</span>
                                        <span className="ml-2 font-medium">{selectedCase.applicant}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">출원일:</span>
                                        <span className="ml-2">{selectedCase.applicationDate}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">결정일:</span>
                                        <span className="ml-2">{selectedCase.decisionDate}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">심사관:</span>
                                        <span className="ml-2">{selectedCase.examiner}</span>
                                    </div>
                                    
                                    <div className="pt-3 border-t border-gray-200">
                                        <span className="text-gray-500 block mb-2">요약:</span>
                                        <p className="text-gray-700">{selectedCase.abstract}</p>
                                    </div>

                                    {selectedCase.keyFactors && (
                                        <div className="pt-3 border-t border-gray-200">
                                            <span className="text-gray-500 block mb-2">등록 핵심 요인:</span>
                                            <div className="flex flex-wrap gap-1">
                                                {selectedCase.keyFactors.map((factor, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                                        {factor}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {selectedCase.rejectionReasons && (
                                        <div className="pt-3 border-t border-gray-200">
                                            <span className="text-gray-500 block mb-2">거절 사유:</span>
                                            <div className="space-y-1">
                                                {selectedCase.rejectionReasons.map((reason, idx) => (
                                                    <div key={idx} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                                                        {reason}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gray-50 rounded-xl p-6 text-center">
                                <i className="fas fa-mouse-pointer text-3xl text-gray-400 mb-2"></i>
                                <p className="text-gray-500 text-sm">사례를 클릭하여 상세 정보를 확인하세요</p>
                            </div>
                        )}

                        {/* 국가별 통계 */}
                        <div className="bg-white rounded-xl p-5 shadow-sm">
                            <h4 className="font-bold text-gray-800 mb-4">국가별 통계</h4>
                            <div className="space-y-3">
                                {Object.entries(searchResults.statistics.byCountry).map(([code, stats]) => {
                                    const country = countries.find(c => c.code === code);
                                    const grantRate = Math.round((stats.granted / stats.total) * 100);
                                    
                                    return (
                                        <div key={code} className="p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="flex items-center gap-2">
                                                    <span>{country?.flag}</span>
                                                    <span className="font-medium">{country?.name}</span>
                                                </span>
                                                <span className="text-sm text-gray-500">{stats.total}건</span>
                                            </div>
                                            <div className="flex gap-1 h-2 rounded-full overflow-hidden">
                                                <div 
                                                    className="bg-green-500" 
                                                    style={{ width: `${(stats.granted / stats.total) * 100}%` }}
                                                ></div>
                                                <div 
                                                    className="bg-red-500" 
                                                    style={{ width: `${(stats.rejected / stats.total) * 100}%` }}
                                                ></div>
                                                <div 
                                                    className="bg-yellow-500" 
                                                    style={{ width: `${(stats.pending / stats.total) * 100}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                <span>등록률 {grantRate}%</span>
                                                <span>평균 {searchResults.statistics.avgExaminationPeriod[code]}개월</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 검색 전 안내 */}
            {!searchResults && !isSearching && (
                <div className="bg-gray-50 rounded-xl p-12 text-center">
                    <div className="text-6xl mb-4">🌐</div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">국제 사례를 검색하세요</h3>
                    <p className="text-gray-500 mb-6">
                        전 세계 특허청의 심사 결정례, 심판 결정례, 소송 판례를 검색합니다.<br/>
                        등록/거절 사례를 분석하여 출원 전략을 수립하세요.
                    </p>
                    <div className="flex justify-center gap-6">
                        {countries.map(country => (
                            <div key={country.code} className="text-center">
                                <div className="text-3xl mb-1">{country.flag}</div>
                                <div className="text-xs text-gray-500">{country.office}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
