const AIConsultation = () => {
    return (
        <div className="py-16 px-4" style={{backgroundColor: 'white'}}>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4" style={{color: '#212529'}}>
                        <i className="fas fa-comments mr-3" style={{color: '#0046FF'}}></i>
                        AI 법률 상담
                    </h2>
                    <p className="text-lg" style={{color: '#6b7280'}}>24/7 실시간 법률 자문</p>
                </div>

                <div className="rounded-xl p-8" style={{background: 'linear-gradient(to bottom right, #eff6ff, #e0f2fe)', border: '1px solid #bfdbfe'}}>
                    <div className="max-w-2xl mx-auto">
                        <div className="rounded-lg p-6 shadow-md mb-6" style={{backgroundColor: 'white'}}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#0046FF'}}>
                                    <i className="fas fa-robot text-xl" style={{color: 'white'}}></i>
                                </div>
                                <div>
                                    <div className="font-semibold" style={{color: '#212529'}}>AI 법률 상담원</div>
                                    <div className="text-sm" style={{color: '#16a34a'}}>● 상담 가능</div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="rounded-lg p-4" style={{backgroundColor: '#f9fafb', color: '#374151'}}>
                                    안녕하세요! AI 법률 상담원입니다. 법률 분쟁, 소송 절차, 판례 검색 등 무엇이든 물어보세요.
                                </div>
                                <div className="rounded-lg p-4 ml-12" style={{backgroundColor: '#eff6ff', color: '#374151'}}>
                                    임대차 계약 분쟁에 대해 상담받고 싶습니다.
                                </div>
                                <div className="rounded-lg p-4" style={{backgroundColor: '#f9fafb', color: '#374151'}}>
                                    임대차 분쟁은 주택임대차보호법에 따라 처리됩니다. 구체적인 상황을 말씀해주시면 관련 판례와 예상 결과를 분석해드리겠습니다.
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                placeholder="법률 관련 질문을 입력하세요..." 
                                className="flex-1 px-4 py-3 rounded-lg focus:outline-none"
                                style={{border: '1px solid #d1d5db', color: '#212529'}}
                                onFocus={(e) => e.target.style.borderColor = '#0046FF'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                            <button 
                                className="px-6 py-3 rounded-lg font-medium transition-colors"
                                style={{backgroundColor: '#0046FF', color: 'white'}}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#0039CC'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#0046FF'}
                            >
                                전송
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 grid md:grid-cols-3 gap-6">
                    {[
                        { icon: 'fa-book', title: '판례 검색', desc: '50만+ 판례 데이터' },
                        { icon: 'fa-balance-scale', title: '소송 예측', desc: '승소율 95% 정확도' },
                        { icon: 'fa-file-alt', title: '서식 생성', desc: '자동 작성 지원' }
                    ].map((item, i) => (
                        <div key={i} className="rounded-lg p-6 shadow-sm text-center" style={{backgroundColor: 'white', border: '1px solid #e5e7eb'}}>
                            <div className="text-3xl mb-3">
                                <i className={`fas ${item.icon}`} style={{color: '#0046FF'}}></i>
                            </div>
                            <div className="font-semibold mb-2" style={{color: '#212529'}}>{item.title}</div>
                            <p className="text-sm" style={{color: '#6b7280'}}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
