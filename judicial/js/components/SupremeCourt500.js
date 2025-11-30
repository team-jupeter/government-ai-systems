const SupremeCourt500 = () => {
    const divisions = [
        {name: '제1부', field: '민사 일반', judges: 85, teams: 17},
        {name: '제2부', field: '상사/금융/보험', judges: 85, teams: 17},
        {name: '제3부', field: '부동산/건설/환경', judges: 85, teams: 17},
        {name: '제4부', field: '가사/상속/의료', judges: 80, teams: 16},
        {name: '제5부', field: '행정/조세/선거', judges: 80, teams: 16},
        {name: '제6부', field: '지재권/국제거래', judges: 80, teams: 16}
    ];
    
    const composition = [
        {type: '법관 출신', percent: 40, count: 200, color: 'blue'},
        {type: '변호사 출신', percent: 30, count: 150, color: 'green'},
        {type: '법학교수', percent: 15, count: 75, color: 'purple'},
        {type: '전문가', percent: 15, count: 75, color: 'orange'}
    ];
    
    const improvements = [
        {label: '대법관 수', before: '13명', after: '500명', color: 'cyan'},
        {label: '사건당 심리시간', before: '2.3시간', after: '18.7시간', color: 'green'},
        {label: '실질 심리율', before: '23%', after: '87%', color: 'yellow'},
        {label: '1인당 연간 사건', before: '615건', after: '130건', color: 'purple'}
    ];
    
    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">
                        <i className="fas fa-landmark mr-3 text-cyan-400"></i>대법원 500명 체제
                    </h2>
                    <p className="text-gray-500">소수 엘리트 중심 → 다원적 민주 사법으로 전환</p>
                </div>
                
                {/* 개선 지표 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {improvements.map((imp, i) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                            <div className="text-sm text-gray-500 mb-2">{imp.label}</div>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-red-400 line-through text-sm">{imp.before}</span>
                                <i className="fas fa-arrow-right text-gray-500"></i>
                                <span className={`text-${imp.color}-400 font-bold text-xl`}>{imp.after}</span>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* 6부 체제 */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
                    <h3 className="font-bold text-cyan-400 mb-4"><i className="fas fa-sitemap mr-2"></i>6부 체제 조직 구조</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {divisions.map((div, i) => (
                            <div key={i} className="bg-white rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-lg">{div.name}</span>
                                    <span className="px-2 py-1 bg-cyan-600/30 text-cyan-400 rounded text-xs">{div.judges}명</span>
                                </div>
                                <div className="text-sm text-gray-500">{div.field}</div>
                                <div className="text-xs text-gray-500 mt-1">{div.teams}개 재판부 (5인 합의)</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 p-3 bg-cyan-900/30 rounded-lg border border-cyan-500/30 text-center">
                        <span className="text-cyan-400 font-bold">전원합의체:</span>
                        <span className="text-gray-600 ml-2">헌법 쟁점 및 판례 변경 시 15인 선출 심리</span>
                    </div>
                </div>
                
                {/* 대법관 구성 */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="font-bold text-green-400 mb-4"><i className="fas fa-users mr-2"></i>대법관 구성 다양화</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {composition.map((c, i) => (
                            <div key={i} className="text-center">
                                <div className={`w-20 h-20 mx-auto rounded-full bg-${c.color}-600/30 flex items-center justify-center mb-2`}>
                                    <span className={`text-2xl font-bold text-${c.color}-400`}>{c.percent}%</span>
                                </div>
                                <div className="font-medium">{c.type}</div>
                                <div className="text-sm text-gray-500">{c.count}명</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-white rounded-lg p-3">
                            <div className="text-gray-500 mb-1">전문가 대법관 배치</div>
                            <div className="text-xs text-gray-500">의료(20), 건설(15), 금융(15), IT(10), 환경(5), 지재권(10)</div>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                            <div className="text-gray-500 mb-1">임기 및 정년</div>
                            <div className="text-xs text-gray-500">10년 단임제, 정년 70세 (현행 65세에서 상향)</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
