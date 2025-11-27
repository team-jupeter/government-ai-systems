const PrecedentSearch = () => {
    const [query, setQuery] = React.useState('');
    const [filters, setFilters] = React.useState({
        country: 'all',
        court: 'all',
        year: 'all',
        caseType: 'all'
    });
    const [results, setResults] = React.useState(null);
    const [isSearching, setIsSearching] = React.useState(false);
    const [selectedCase, setSelectedCase] = React.useState(null);

    const searchPrecedents = () => {
        if (!query.trim()) {
            alert('검색어를 입력해주세요.');
            return;
        }
        
        setIsSearching(true);
        setTimeout(() => {
            setResults({
                total: 2847,
                items: [
                    {
                        id: '대법원 2024다12345',
                        date: '2024-09-15',
                        court: '대법원',
                        type: '민사',
                        title: '임대차보증금반환',
                        summary: '임대인의 보증금 반환 의무는 임차인의 목적물 반환과 동시이행 관계에 있으며, 임대인이 시설비를 공제하기 위해서는 임차인의 원상회복의무 위반이 입증되어야 한다.',
                        result: '원고 승소',
                        amount: '1억 2,000만원',
                        relevance: 96.8,
                        country: 'korea',
                        keyPoints: ['동시이행항변권', '원상회복의무', '시설비 공제 제한']
                    },
                    {
                        id: 'US 2024-CV-78901',
                        date: '2024-08-22',
                        court: 'California Superior Court',
                        type: 'Civil',
                        title: 'Security Deposit Return',
                        summary: 'Landlord must return security deposit within 21 days of lease termination. Deductions require itemized statement and receipts for actual damages beyond normal wear and tear.',
                        result: 'Plaintiff Won',
                        amount: '$85,000',
                        relevance: 89.2,
                        country: 'usa',
                        keyPoints: ['21-day rule', 'Itemized statement', 'Normal wear and tear']
                    },
                    {
                        id: '東京地判 令和6年(ワ)第12345号',
                        date: '2024-07-10',
                        court: '東京地方裁判所',
                        type: '民事',
                        title: '敷金返還請求',
                        summary: '賃借人に原状回復義務違反がない限り、賃貸人は敷金全額を返還しなければならない。通常の使用による損耗は原状回復義務の範囲外である。',
                        result: '原告勝訴',
                        amount: '800万円',
                        relevance: 85.7,
                        country: 'japan',
                        keyPoints: ['原状回復義務', '通常損耗', '敷金全額返還']
                    },
                    {
                        id: 'BGH VIII ZR 123/24',
                        date: '2024-06-05',
                        court: 'Bundesgerichtshof',
                        type: 'Zivilrecht',
                        title: 'Kautionsrückzahlung',
                        summary: 'Der Vermieter muss die Kaution innerhalb von sechs Monaten nach Beendigung des Mietverhältnisses zurückzahlen, sofern keine berechtigten Ansprüche bestehen.',
                        result: 'Kläger gewonnen',
                        amount: '€15,000',
                        relevance: 81.3,
                        country: 'germany',
                        keyPoints: ['6-Monats-Frist', 'Berechtigte Ansprüche', 'Kautionsabrechnung']
                    },
                    {
                        id: '서울고등법원 2024나56789',
                        date: '2024-05-20',
                        court: '서울고등법원',
                        type: '민사',
                        title: '손해배상(기)',
                        summary: '계약 위반으로 인한 손해배상에서 손해액은 통상손해와 특별손해로 구분되며, 특별손해는 예견가능성이 입증되어야 한다.',
                        result: '원고 일부 승소',
                        amount: '7,500만원',
                        relevance: 78.9,
                        country: 'korea',
                        keyPoints: ['통상손해', '특별손해', '예견가능성']
                    }
                ]
            });
            setIsSearching(false);
        }, 1500);
    };

    const getCountryFlag = (country) => {
        const flags = {
            korea: '🇰🇷', usa: '🇺🇸', japan: '🇯🇵', germany: '🇩🇪',
            uk: '🇬🇧', france: '🇫🇷', canada: '🇨🇦', australia: '🇦🇺'
        };
        return flags[country] || '🌍';
    };

    return (
        <div className="p-6">
            <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-xl font-bold mb-2">
                        <i className="fas fa-search mr-2 text-blue-600"></i>AI 판례 검색
                    </h2>
                    <p className="text-gray-500 mb-6">
                        OECD 8개국 2,480만 건 판례를 AI가 분석하여 유사 판례를 검색합니다.
                    </p>

                    <div className="flex gap-4 mb-4">
                        <input
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && searchPrecedents()}
                            placeholder="검색어 또는 사건 개요 입력 (예: 임대차보증금 반환 거부)"
                            className="flex-1 border rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />
                        <button 
                            onClick={searchPrecedents}
                            disabled={isSearching}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
                        >
                            {isSearching ? (
                                <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                                <i className="fas fa-search"></i>
                            )}
                            <span className="ml-2">검색</span>
                        </button>
                    </div>

                    <div className="flex gap-4 text-sm">
                        <select 
                            value={filters.country}
                            onChange={e => setFilters({...filters, country: e.target.value})}
                            className="border rounded px-3 py-2"
                        >
                            <option value="all">모든 국가</option>
                            <option value="korea">🇰🇷 한국</option>
                            <option value="usa">🇺🇸 미국</option>
                            <option value="japan">🇯🇵 일본</option>
                            <option value="germany">🇩🇪 독일</option>
                            <option value="uk">🇬🇧 영국</option>
                            <option value="france">🇫🇷 프랑스</option>
                        </select>
                        <select 
                            value={filters.court}
                            onChange={e => setFilters({...filters, court: e.target.value})}
                            className="border rounded px-3 py-2"
                        >
                            <option value="all">모든 법원</option>
                            <option value="supreme">대법원/최고법원</option>
                            <option value="high">고등법원/항소법원</option>
                            <option value="district">지방법원/1심법원</option>
                        </select>
                        <select 
                            value={filters.year}
                            onChange={e => setFilters({...filters, year: e.target.value})}
                            className="border rounded px-3 py-2"
                        >
                            <option value="all">모든 연도</option>
                            <option value="2024">2024년</option>
                            <option value="2023">2023년</option>
                            <option value="2022">2022년</option>
                            <option value="2021">2021년</option>
                            <option value="2020">2020년</option>
                        </select>
                        <select 
                            value={filters.caseType}
                            onChange={e => setFilters({...filters, caseType: e.target.value})}
                            className="border rounded px-3 py-2"
                        >
                            <option value="all">모든 유형</option>
                            <option value="civil">민사</option>
                            <option value="criminal">형사</option>
                            <option value="administrative">행정</option>
                            <option value="family">가사</option>
                        </select>
                    </div>
                </div>

                {results && (
                    <div className="bg-white rounded-xl shadow-sm border">
                        <div className="p-4 border-b flex justify-between items-center">
                            <span className="font-bold">
                                검색 결과: <span className="text-blue-600">{results.total.toLocaleString()}건</span>
                            </span>
                            <span className="text-sm text-gray-500">유사도 순 정렬</span>
                        </div>
                        
                        <div className="divide-y">
                            {results.items.map((item, i) => (
                                <div 
                                    key={i} 
                                    className="p-6 hover:bg-gray-50 transition cursor-pointer"
                                    onClick={() => setSelectedCase(item)}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="text-3xl">{getCountryFlag(item.country)}</div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="font-bold text-blue-600">{item.id}</span>
                                                <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">{item.type}</span>
                                                <span className="text-sm text-gray-500">{item.court}</span>
                                                <span className="text-sm text-gray-500">{item.date}</span>
                                            </div>
                                            <h4 className="font-medium mb-2">{item.title}</h4>
                                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.summary}</p>
                                            <div className="flex items-center gap-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    item.result.includes('승') || item.result.toLowerCase().includes('won') 
                                                        ? 'bg-green-100 text-green-700' 
                                                        : 'bg-red-100 text-red-700'
                                                }`}>
                                                    {item.result}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    인용액: <strong>{item.amount}</strong>
                                                </span>
                                                <span className="text-sm text-blue-600">
                                                    유사도: <strong>{item.relevance}%</strong>
                                                </span>
                                            </div>
                                            <div className="flex gap-2 mt-3">
                                                {item.keyPoints?.map((point, j) => (
                                                    <span key={j} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">
                                                        {point}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <button className="text-gray-400 hover:text-blue-600">
                                            <i className="fas fa-external-link-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t bg-gray-50 text-center">
                            <button className="text-blue-600 hover:underline">
                                더 많은 결과 보기 <i className="fas fa-chevron-down ml-1"></i>
                            </button>
                        </div>
                    </div>
                )}

                {selectedCase && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
                            <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{getCountryFlag(selectedCase.country)}</span>
                                    <div>
                                        <h3 className="font-bold">{selectedCase.id}</h3>
                                        <p className="text-sm text-gray-500">{selectedCase.court} · {selectedCase.date}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setSelectedCase(null)}
                                    className="text-gray-400 hover:text-gray-600 text-xl"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <h4 className="font-bold text-lg mb-2">{selectedCase.title}</h4>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        selectedCase.result.includes('승') || selectedCase.result.toLowerCase().includes('won')
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}>
                                        {selectedCase.result} · {selectedCase.amount}
                                    </span>
                                </div>
                                <div>
                                    <h5 className="font-medium text-gray-700 mb-2">판결 요지</h5>
                                    <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{selectedCase.summary}</p>
                                </div>
                                <div>
                                    <h5 className="font-medium text-gray-700 mb-2">핵심 키워드</h5>
                                    <div className="flex gap-2">
                                        {selectedCase.keyPoints?.map((point, i) => (
                                            <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                                {point}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-4 border-t flex gap-4">
                                    <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                                        <i className="fas fa-file-alt mr-2"></i>이 판례 인용하기
                                    </button>
                                    <button className="flex-1 border py-3 rounded-lg hover:bg-gray-50">
                                        <i className="fas fa-download mr-2"></i>전문 다운로드
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
