// PriorArtSearch 컴포넌트 - 선행기술 조사
const PriorArtSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('keyword'); // keyword, semantic, patent-number
    const [searchScope, setSearchScope] = useState(['KR', 'US', 'EP', 'CN', 'JP']);
    const [dateRange, setDateRange] = useState({ from: '', to: '' });
    const [techField, setTechField] = useState('all');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [selectedPatents, setSelectedPatents] = useState([]);

    const countries = [
        { code: 'KR', name: '한국', flag: '🇰🇷' },
        { code: 'US', name: '미국', flag: '🇺🇸' },
        { code: 'EP', name: '유럽', flag: '🇪🇺' },
        { code: 'CN', name: '중국', flag: '🇨🇳' },
        { code: 'JP', name: '일본', flag: '🇯🇵' },
        { code: 'PCT', name: 'PCT', flag: '🌐' }
    ];

    const techFields = [
        { id: 'all', name: '전체 분야' },
        { id: 'G06', name: 'G06 - 컴퓨팅/계산' },
        { id: 'H04', name: 'H04 - 전기통신' },
        { id: 'G16', name: 'G16 - 정보통신기술' },
        { id: 'A61', name: 'A61 - 의료/수의학' },
        { id: 'B60', name: 'B60 - 차량일반' },
        { id: 'C12', name: 'C12 - 생화학' }
    ];

    const toggleCountry = (code) => {
        setSearchScope(prev => 
            prev.includes(code) 
                ? prev.filter(c => c !== code)
                : [...prev, code]
        );
    };

    const performSearch = async () => {
        if (!searchQuery.trim()) {
            alert('검색어를 입력해주세요.');
            return;
        }

        setIsSearching(true);

        // 시뮬레이션 (실제로는 API 호출)
        setTimeout(() => {
            const mockResults = {
                totalCount: Math.floor(Math.random() * 500) + 50,
                searchTime: (Math.random() * 0.3 + 0.1).toFixed(3),
                patents: [
                    {
                        id: 'KR10-2024-0123456',
                        country: 'KR',
                        title: '블록체인 기반 데이터 무결성 검증 시스템',
                        titleEn: 'Blockchain-based Data Integrity Verification System',
                        applicant: '삼성전자(주)',
                        filingDate: '2024-03-15',
                        publicationDate: '2024-09-20',
                        ipc: 'G06F 21/64',
                        abstract: '본 발명은 블록체인 기술을 활용하여 데이터의 무결성을 검증하는 시스템에 관한 것으로...',
                        similarity: 78,
                        citations: 12,
                        status: 'published'
                    },
                    {
                        id: 'US2023/0456789',
                        country: 'US',
                        title: 'Distributed Ledger System for Document Authentication',
                        titleKo: '문서 인증을 위한 분산 원장 시스템',
                        applicant: 'IBM Corporation',
                        filingDate: '2023-06-20',
                        publicationDate: '2023-12-28',
                        ipc: 'G06F 21/62',
                        abstract: 'A system and method for authenticating documents using distributed ledger technology...',
                        similarity: 65,
                        citations: 28,
                        status: 'published'
                    },
                    {
                        id: 'CN115234567A',
                        country: 'CN',
                        title: '基于区块链的数据存证方法及系统',
                        titleEn: 'Blockchain-based Data Storage Method and System',
                        applicant: '阿里巴巴集团',
                        filingDate: '2023-01-10',
                        publicationDate: '2023-07-15',
                        ipc: 'G06F 16/27',
                        abstract: '本发明涉及一种基于区块链技术的数据存证方法...',
                        similarity: 58,
                        citations: 8,
                        status: 'granted'
                    },
                    {
                        id: 'EP4123456A1',
                        country: 'EP',
                        title: 'Timestamp Verification System Using Hash Chain',
                        titleKo: '해시 체인을 이용한 타임스탬프 검증 시스템',
                        applicant: 'SAP SE',
                        filingDate: '2022-11-05',
                        publicationDate: '2023-05-10',
                        ipc: 'H04L 9/32',
                        abstract: 'The present invention relates to a system for verifying timestamps using cryptographic hash chains...',
                        similarity: 72,
                        citations: 15,
                        status: 'published'
                    },
                    {
                        id: 'JP2024-012345',
                        country: 'JP',
                        title: 'データ完全性保証システム',
                        titleEn: 'Data Integrity Assurance System',
                        applicant: 'Sony Corporation',
                        filingDate: '2024-01-20',
                        publicationDate: '2024-07-25',
                        ipc: 'G06F 21/64',
                        abstract: '本発明は、データの完全性を保証するためのシステムに関する...',
                        similarity: 45,
                        citations: 5,
                        status: 'pending'
                    }
                ],
                analysis: {
                    avgSimilarity: 63.6,
                    highRiskCount: 2,
                    mediumRiskCount: 2,
                    lowRiskCount: 1,
                    keyTerms: ['블록체인', '해시', '무결성', '타임스탬프', '분산원장'],
                    recommendation: '선행기술과의 차별점을 명확히 하여 청구항을 작성하시기 바랍니다.'
                }
            };

            setSearchResults(mockResults);
            setIsSearching(false);
        }, 2000);
    };

    const togglePatentSelection = (patentId) => {
        setSelectedPatents(prev =>
            prev.includes(patentId)
                ? prev.filter(id => id !== patentId)
                : [...prev, patentId]
        );
    };

    const getSimilarityColor = (similarity) => {
        if (similarity >= 70) return 'text-red-600 bg-red-100';
        if (similarity >= 50) return 'text-yellow-600 bg-yellow-100';
        return 'text-green-600 bg-green-100';
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: { label: '심사중', class: 'bg-yellow-100 text-yellow-700' },
            published: { label: '공개', class: 'bg-blue-100 text-blue-700' },
            granted: { label: '등록', class: 'bg-green-100 text-green-700' }
        };
        return badges[status] || badges.pending;
    };

    return (
        <div className="space-y-6 pt-[140px]">
            {/* 페이지 타이틀 */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="text-3xl">🔍</span>
                        선행기술 조사
                    </h2>
                    <p className="text-gray-500">전 세계 5,200만 건 특허 DB에서 유사 기술을 검색합니다</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <i className="fas fa-database"></i>
                    <span>DB: 52,847,293건</span>
                    <span className="mx-2">|</span>
                    <span>검색속도: 0.3초</span>
                </div>
            </div>

            {/* 검색 영역 */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                {/* 검색 유형 선택 */}
                <div className="flex gap-4 mb-4">
                    {[
                        { id: 'keyword', label: '키워드 검색', icon: 'fa-key' },
                        { id: 'semantic', label: '의미론적 검색', icon: 'fa-brain' },
                        { id: 'patent-number', label: '특허번호 검색', icon: 'fa-hashtag' }
                    ].map(type => (
                        <button
                            key={type.id}
                            onClick={() => setSearchType(type.id)}
                            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                                searchType === type.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            <i className={`fas ${type.icon}`}></i>
                            {type.label}
                        </button>
                    ))}
                </div>

                {/* 검색 입력 */}
                <div className="flex gap-3 mb-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && performSearch()}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={
                                searchType === 'keyword' ? '검색 키워드를 입력하세요 (예: 블록체인 데이터 무결성)' :
                                searchType === 'semantic' ? '발명 내용을 자연어로 입력하세요' :
                                '특허번호를 입력하세요 (예: KR10-2024-0123456)'
                            }
                        />
                        {searchType === 'semantic' && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500">
                                <i className="fas fa-magic"></i> AI
                            </span>
                        )}
                    </div>
                    <button
                        onClick={performSearch}
                        disabled={isSearching}
                        className="btn-kipo text-white px-8 py-3 rounded-lg font-medium disabled:opacity-50"
                    >
                        {isSearching ? (
                            <i className="fas fa-spinner loading-spin"></i>
                        ) : (
                            <><i className="fas fa-search mr-2"></i>검색</>
                        )}
                    </button>
                </div>

                {/* 검색 옵션 */}
                <div className="grid grid-cols-3 gap-4">
                    {/* 검색 국가 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">검색 대상 국가</label>
                        <div className="flex flex-wrap gap-2">
                            {countries.map(country => (
                                <button
                                    key={country.code}
                                    onClick={() => toggleCountry(country.code)}
                                    className={`px-3 py-1 rounded-full text-sm transition ${
                                        searchScope.includes(country.code)
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {country.flag} {country.code}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 기술분야 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">기술분야 (IPC)</label>
                        <select
                            value={techField}
                            onChange={(e) => setTechField(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                            {techFields.map(field => (
                                <option key={field.id} value={field.id}>{field.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* 출원일 범위 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">출원일 범위</label>
                        <div className="flex gap-2">
                            <input
                                type="date"
                                value={dateRange.from}
                                onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            />
                            <span className="text-gray-400 self-center">~</span>
                            <input
                                type="date"
                                value={dateRange.to}
                                onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 검색 결과 */}
            {searchResults && (
                <div className="space-y-4">
                    {/* 결과 요약 */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="text-sm text-gray-500">검색 결과</div>
                            <div className="text-2xl font-bold text-gray-800">{searchResults.totalCount}건</div>
                            <div className="text-xs text-gray-400">{searchResults.searchTime}초</div>
                        </div>
                        <div className="bg-red-50 rounded-xl p-4 shadow-sm border border-red-200">
                            <div className="text-sm text-red-600">고위험 (70%+)</div>
                            <div className="text-2xl font-bold text-red-700">{searchResults.analysis.highRiskCount}건</div>
                            <div className="text-xs text-red-500">회피 설계 필요</div>
                        </div>
                        <div className="bg-yellow-50 rounded-xl p-4 shadow-sm border border-yellow-200">
                            <div className="text-sm text-yellow-600">주의 (50-69%)</div>
                            <div className="text-2xl font-bold text-yellow-700">{searchResults.analysis.mediumRiskCount}건</div>
                            <div className="text-xs text-yellow-500">차별화 필요</div>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200">
                            <div className="text-sm text-green-600">저위험 (50%-)</div>
                            <div className="text-2xl font-bold text-green-700">{searchResults.analysis.lowRiskCount}건</div>
                            <div className="text-xs text-green-500">참고용</div>
                        </div>
                    </div>

                    {/* AI 분석 */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <div className="text-2xl">🤖</div>
                            <div>
                                <h4 className="font-medium text-blue-800">AI 분석 결과</h4>
                                <p className="text-sm text-blue-700 mt-1">{searchResults.analysis.recommendation}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {searchResults.analysis.keyTerms.map((term, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                            #{term}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 특허 목록 */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="px-5 py-3 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="font-bold text-gray-800">검색 결과 ({searchResults.patents.length}건)</h3>
                            <div className="flex gap-2">
                                <button className="text-sm text-blue-600 hover:underline">
                                    <i className="fas fa-download mr-1"></i>결과 다운로드
                                </button>
                                {selectedPatents.length > 0 && (
                                    <button className="text-sm text-green-600 hover:underline">
                                        <i className="fas fa-chart-bar mr-1"></i>선택 비교 ({selectedPatents.length})
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {searchResults.patents.map((patent, idx) => {
                                const statusBadge = getStatusBadge(patent.status);
                                const country = countries.find(c => c.code === patent.country);
                                
                                return (
                                    <div key={idx} className="p-5 hover:bg-gray-50 transition">
                                        <div className="flex items-start gap-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedPatents.includes(patent.id)}
                                                onChange={() => togglePatentSelection(patent.id)}
                                                className="mt-1 w-4 h-4 rounded"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-lg">{country?.flag}</span>
                                                    <span className="font-mono text-sm text-gray-600">{patent.id}</span>
                                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusBadge.class}`}>
                                                        {statusBadge.label}
                                                    </span>
                                                    <span className="text-xs text-gray-400">{patent.ipc}</span>
                                                </div>
                                                <h4 className="font-medium text-gray-800 mb-1">{patent.title}</h4>
                                                {patent.titleKo && (
                                                    <p className="text-sm text-gray-600 mb-1">{patent.titleKo}</p>
                                                )}
                                                {patent.titleEn && patent.country === 'KR' && (
                                                    <p className="text-sm text-gray-500 mb-1">{patent.titleEn}</p>
                                                )}
                                                <p className="text-sm text-gray-500 line-clamp-2 mb-2">{patent.abstract}</p>
                                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                                    <span><i className="fas fa-building mr-1"></i>{patent.applicant}</span>
                                                    <span><i className="fas fa-calendar mr-1"></i>출원: {patent.filingDate}</span>
                                                    <span><i className="fas fa-quote-right mr-1"></i>인용: {patent.citations}회</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`px-3 py-1 rounded-lg font-bold ${getSimilarityColor(patent.similarity)}`}>
                                                    {patent.similarity}%
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">유사도</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* 검색 전 안내 */}
            {!searchResults && !isSearching && (
                <div className="bg-gray-50 rounded-xl p-12 text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">선행기술 검색을 시작하세요</h3>
                    <p className="text-gray-500 mb-6">
                        키워드, 자연어, 또는 특허번호로 검색할 수 있습니다.<br/>
                        AI가 유사도를 분석하여 위험도를 평가합니다.
                    </p>
                    <div className="flex justify-center gap-4 text-sm text-gray-400">
                        <span>🇰🇷 한국 특허</span>
                        <span>🇺🇸 미국 특허</span>
                        <span>🇪🇺 유럽 특허</span>
                        <span>🇨🇳 중국 특허</span>
                        <span>🇯🇵 일본 특허</span>
                    </div>
                </div>
            )}
        </div>
    );
};
