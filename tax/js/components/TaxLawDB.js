const TaxLawDB = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const [selectedLaw, setSelectedLaw] = React.useState(null);
    const [activeCategory, setActiveCategory] = React.useState('all');
    const [isSearching, setIsSearching] = React.useState(false);

    const taxLaws = [
        { id: 1, code: '국세기본법', articles: 85, regulations: 89, category: 'basic', icon: 'fa-gavel' },
        { id: 2, code: '소득세법', articles: 174, regulations: 224, category: 'income', icon: 'fa-user' },
        { id: 3, code: '법인세법', articles: 122, regulations: 167, category: 'corporate', icon: 'fa-building' },
        { id: 4, code: '부가가치세법', articles: 74, regulations: 115, category: 'vat', icon: 'fa-shopping-cart' },
        { id: 5, code: '상속세 및 증여세법', articles: 87, regulations: 92, category: 'inheritance', icon: 'fa-gift' },
        { id: 6, code: '종합부동산세법', articles: 24, regulations: 28, category: 'property', icon: 'fa-home' },
        { id: 7, code: '개별소비세법', articles: 38, regulations: 45, category: 'consumption', icon: 'fa-glass-martini' },
        { id: 8, code: '주세법', articles: 42, regulations: 38, category: 'consumption', icon: 'fa-wine-bottle' },
        { id: 9, code: '인지세법', articles: 15, regulations: 12, category: 'transaction', icon: 'fa-stamp' },
        { id: 10, code: '증권거래세법', articles: 12, regulations: 8, category: 'transaction', icon: 'fa-chart-bar' },
        { id: 11, code: '교통·에너지·환경세법', articles: 18, regulations: 22, category: 'consumption', icon: 'fa-car' },
        { id: 12, code: '교육세법', articles: 8, regulations: 6, category: 'education', icon: 'fa-graduation-cap' },
        { id: 13, code: '농어촌특별세법', articles: 10, regulations: 8, category: 'special', icon: 'fa-seedling' },
        { id: 14, code: '조세특례제한법', articles: 146, regulations: 198, category: 'special', icon: 'fa-balance-scale-right' },
        { id: 15, code: '국제조세조정에관한법률', articles: 52, regulations: 78, category: 'international', icon: 'fa-globe' },
        { id: 16, code: '조세범처벌법', articles: 18, regulations: 15, category: 'penalty', icon: 'fa-exclamation-triangle' },
        { id: 17, code: '조세범처벌절차법', articles: 22, regulations: 18, category: 'penalty', icon: 'fa-gavel' },
        { id: 18, code: '세무사법', articles: 28, regulations: 35, category: 'profession', icon: 'fa-user-tie' }
    ];

    const categories = [
        { id: 'all', name: '전체', count: 18 },
        { id: 'basic', name: '기본법', count: 1 },
        { id: 'income', name: '소득세', count: 1 },
        { id: 'corporate', name: '법인세', count: 1 },
        { id: 'vat', name: '부가세', count: 1 },
        { id: 'inheritance', name: '상속증여', count: 1 },
        { id: 'property', name: '재산세', count: 1 },
        { id: 'consumption', name: '소비세', count: 3 },
        { id: 'transaction', name: '거래세', count: 2 },
        { id: 'international', name: '국제조세', count: 1 },
        { id: 'special', name: '특별법', count: 2 },
        { id: 'penalty', name: '처벌법', count: 2 }
    ];

    const sampleArticles = {
        '소득세법': [
            { num: '제14조', title: '과세표준의 계산', summary: '거주자의 종합소득에 대한 과세표준은 해당 과세기간의 총수입금액에서 필요경비를 공제한 금액...' },
            { num: '제20조', title: '근로소득', summary: '근로소득은 해당 과세기간에 발생한 다음 각 호의 소득으로 한다...' },
            { num: '제55조', title: '세율', summary: '거주자의 종합소득에 대한 소득세는 해당 연도의 종합소득과세표준에 다음의 세율을 적용하여 계산한다...' },
            { num: '제127조', title: '원천징수의무', summary: '국내에서 거주자나 비거주자에게 소득세를 원천징수하여 납부할 의무가 있는 자...' }
        ],
        '법인세법': [
            { num: '제13조', title: '각 사업연도의 소득', summary: '내국법인의 각 사업연도의 소득은 그 사업연도에 속하는 익금의 총액에서 손금의 총액을 공제한 금액으로 한다...' },
            { num: '제14조', title: '익금의 범위', summary: '익금은 자본 또는 출자의 납입 및 이 법에서 규정하는 것을 제외하고 해당 법인의 순자산을 증가시키는 거래로 인하여 발생하는 수익의 금액으로 한다...' },
            { num: '제19조', title: '손금의 범위', summary: '손금은 자본 또는 출자의 환급, 잉여금의 처분 및 이 법에서 규정하는 것을 제외하고 해당 법인의 순자산을 감소시키는 거래로 인하여 발생하는 손비의 금액으로 한다...' },
            { num: '제55조', title: '세율', summary: '내국법인의 각 사업연도의 소득에 대한 법인세는 과세표준에 일정 세율을 적용하여 계산한다...' }
        ],
        '부가가치세법': [
            { num: '제29조', title: '과세표준', summary: '재화 또는 용역의 공급에 대한 부가가치세의 과세표준은 해당 과세기간에 공급한 재화 또는 용역의 공급가액을 합한 금액으로 한다...' },
            { num: '제30조', title: '세율', summary: '부가가치세의 세율은 100분의 10으로 한다...' },
            { num: '제37조', title: '매입세액', summary: '사업자가 자기의 사업을 위하여 사용되었거나 사용될 재화 또는 용역의 공급에 대한 부가가치세액은 매출세액에서 공제한다...' }
        ]
    };

    const handleSearch = () => {
        if (!searchQuery.trim()) return;
        setIsSearching(true);
        
        setTimeout(() => {
            const results = [];
            taxLaws.forEach(law => {
                if (law.code.includes(searchQuery) || searchQuery.includes('세') || searchQuery.includes('법')) {
                    const articles = sampleArticles[law.code] || [];
                    articles.forEach(article => {
                        if (article.title.includes(searchQuery) || article.summary.includes(searchQuery) || law.code.includes(searchQuery)) {
                            results.push({
                                law: law.code,
                                ...article,
                                relevance: Math.random() * 0.3 + 0.7
                            });
                        }
                    });
                }
            });
            
            // 기본 결과 추가
            if (results.length === 0) {
                results.push(
                    { law: '소득세법', num: '제14조', title: '과세표준의 계산', relevance: 0.85 },
                    { law: '법인세법', num: '제13조', title: '각 사업연도의 소득', relevance: 0.78 },
                    { law: '부가가치세법', num: '제29조', title: '과세표준', relevance: 0.72 }
                );
            }
            
            setSearchResults(results.sort((a, b) => b.relevance - a.relevance).slice(0, 10));
            setIsSearching(false);
        }, 500);
    };

    const filteredLaws = activeCategory === 'all' 
        ? taxLaws 
        : taxLaws.filter(l => l.category === activeCategory);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* 검색 영역 */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <i className="fas fa-balance-scale text-yellow-400"></i>
                    세법 데이터베이스 검색
                </h3>
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="세법 조문, 키워드, 세목 등을 검색하세요..."
                        className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button
                        onClick={handleSearch}
                        disabled={isSearching}
                        className="bg-yellow-600 hover:bg-yellow-500 px-6 py-3 rounded-lg font-medium transition disabled:opacity-50"
                    >
                        {isSearching ? <i className="fas fa-spinner fa-spin"></i> : <><i className="fas fa-search mr-2"></i>검색</>}
                    </button>
                </div>
                
                {/* 검색 결과 */}
                {searchResults.length > 0 && (
                    <div className="mt-4 space-y-2">
                        <div className="text-sm text-gray-400 mb-2">검색 결과: {searchResults.length}건</div>
                        {searchResults.map((result, idx) => (
                            <div key={idx} className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">{result.law}</span>
                                        <span className="text-white font-medium">{result.num}</span>
                                        <span className="text-gray-300">{result.title}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-400">관련도: {(result.relevance * 100).toFixed(0)}%</span>
                                        <div className="w-16 h-1.5 bg-gray-600 rounded-full overflow-hidden">
                                            <div className="h-full bg-yellow-500" style={{width: `${result.relevance * 100}%`}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-4 gap-6">
                {/* 카테고리 사이드바 */}
                <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
                    <h4 className="text-lg font-bold mb-4">분류</h4>
                    <div className="space-y-1">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center justify-between ${
                                    activeCategory === cat.id
                                        ? 'bg-yellow-500/20 text-yellow-400'
                                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                <span>{cat.name}</span>
                                <span className="text-xs bg-gray-700 px-2 py-0.5 rounded-full">{cat.count}</span>
                            </button>
                        ))}
                    </div>
                    
                    {/* 통계 */}
                    <div className="mt-6 pt-4 border-t border-gray-700">
                        <h4 className="text-sm text-gray-400 mb-3">DB 통계</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">세법</span>
                                <span className="text-white">18개</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">조문</span>
                                <span className="text-white">976개</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">시행령</span>
                                <span className="text-white">352개</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">시행규칙</span>
                                <span className="text-white">487개</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">예규/판례</span>
                                <span className="text-white">612개</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 세법 목록 */}
                <div className="col-span-3 bg-gray-800 rounded-2xl border border-gray-700">
                    <div className="p-4 border-b border-gray-700">
                        <h3 className="text-xl font-bold">세법 목록</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 p-4">
                        {filteredLaws.map(law => (
                            <div 
                                key={law.id}
                                onClick={() => setSelectedLaw(selectedLaw?.id === law.id ? null : law)}
                                className={`p-4 rounded-xl border cursor-pointer transition ${
                                    selectedLaw?.id === law.id
                                        ? 'bg-yellow-500/10 border-yellow-500/30'
                                        : 'bg-gray-700/50 border-gray-600 hover:border-gray-500'
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                                        <i className={`fas ${law.icon} text-yellow-400`}></i>
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">{law.code}</div>
                                        <div className="text-xs text-gray-400">조문 {law.articles}개 | 시행령 {law.regulations}개</div>
                                    </div>
                                </div>
                                
                                {selectedLaw?.id === law.id && sampleArticles[law.code] && (
                                    <div className="mt-3 pt-3 border-t border-gray-600 space-y-2">
                                        {sampleArticles[law.code].slice(0, 3).map((article, idx) => (
                                            <div key={idx} className="text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-yellow-400">{article.num}</span>
                                                    <span className="text-white">{article.title}</span>
                                                </div>
                                                <div className="text-xs text-gray-400 mt-1 line-clamp-1">{article.summary}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
