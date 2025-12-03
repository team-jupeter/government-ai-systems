const CaseAnalysis = () => {
    const [selectedCase, setSelectedCase] = React.useState(null);

    const cases = [
        {
            id: 1,
            title: '임대차 분쟁',
            parties: '임차인 vs 임대인',
            amount: '2,000만원',
            probability: 78,
            risk: '중',
            recommendation: '조정 권고'
        },
        {
            id: 2,
            title: '근로계약 분쟁',
            parties: '근로자 vs 사용자',
            amount: '3,500만원',
            probability: 85,
            risk: '높음',
            recommendation: '소송 진행'
        }
    ];

    return (
        <div className="py-16 px-4" style={{backgroundColor: 'white'}}>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4" style={{color: '#212529'}}>
                        <i className="fas fa-gavel mr-3" style={{color: '#0046FF'}}></i>
                        사건 분석 시스템
                    </h2>
                    <p className="text-lg" style={{color: '#6b7280'}}>AI가 과거 판례를 분석하여 결과를 예측합니다</p>
                </div>

                <div className="grid gap-6">
                    {cases.map(c => (
                        <div key={c.id} className="rounded-xl p-6 card-hover shadow-md" style={{backgroundColor: 'white', border: '1px solid #e5e7eb'}}>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold mb-2" style={{color: '#212529'}}>{c.title}</h3>
                                    <p style={{color: '#6b7280'}}>{c.parties}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium`} style={{
                                    backgroundColor: c.risk === '높음' ? '#fee2e2' : c.risk === '중' ? '#fef3c7' : '#d1fae5',
                                    color: c.risk === '높음' ? '#991b1b' : c.risk === '중' ? '#92400e' : '#065f46'
                                }}>
                                    {c.risk} 위험
                                </span>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                                <div className="rounded-lg p-4" style={{backgroundColor: '#f9fafb', border: '1px solid #e5e7eb'}}>
                                    <div className="text-sm mb-1" style={{color: '#6b7280'}}>소송가액</div>
                                    <div className="text-lg font-bold" style={{color: '#212529'}}>{c.amount}</div>
                                </div>
                                <div className="rounded-lg p-4" style={{backgroundColor: '#eff6ff', border: '1px solid #bfdbfe'}}>
                                    <div className="text-sm mb-1" style={{color: '#6b7280'}}>승소 확률</div>
                                    <div className="text-lg font-bold" style={{color: '#0046FF'}}>{c.probability}%</div>
                                </div>
                                <div className="rounded-lg p-4" style={{backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0'}}>
                                    <div className="text-sm mb-1" style={{color: '#6b7280'}}>AI 추천</div>
                                    <div className="text-lg font-bold" style={{color: '#15803d'}}>{c.recommendation}</div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="flex justify-between text-sm mb-1">
                                    <span style={{color: '#6b7280'}}>승소 가능성</span>
                                    <span className="font-bold" style={{color: '#0046FF'}}>{c.probability}%</span>
                                </div>
                                <div className="w-full rounded-full h-3" style={{backgroundColor: '#e5e7eb'}}>
                                    <div 
                                        className="h-3 rounded-full transition-all"
                                        style={{width: `${c.probability}%`, backgroundColor: '#0046FF'}}
                                    ></div>
                                </div>
                            </div>

                            <button 
                                onClick={() => setSelectedCase(c)}
                                className="w-full px-4 py-2 rounded-lg transition-colors font-medium"
                                style={{backgroundColor: '#0046FF', color: 'white'}}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#0039CC'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#0046FF'}
                            >
                                상세 분석 보기
                            </button>
                        </div>
                    ))}
                </div>

                {selectedCase && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                        <div className="rounded-xl p-8 max-w-2xl w-full shadow-2xl" style={{backgroundColor: 'white'}}>
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-2xl font-bold" style={{color: '#212529'}}>{selectedCase.title}</h3>
                                <button 
                                    onClick={() => setSelectedCase(null)}
                                    style={{color: '#6b7280'}}
                                    onMouseOver={(e) => e.target.style.color = '#374151'}
                                    onMouseOut={(e) => e.target.style.color = '#6b7280'}
                                >
                                    <i className="fas fa-times text-xl"></i>
                                </button>
                            </div>
                            <div className="space-y-4" style={{color: '#374151'}}>
                                <p><strong>당사자:</strong> {selectedCase.parties}</p>
                                <p><strong>소송가액:</strong> {selectedCase.amount}</p>
                                <p><strong>승소 확률:</strong> {selectedCase.probability}%</p>
                                <p><strong>위험도:</strong> {selectedCase.risk}</p>
                                <p><strong>AI 추천:</strong> {selectedCase.recommendation}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
