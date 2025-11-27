const SystemExplainer = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    const features = [
        {
            icon: '🤖',
            title: 'AI 변호사 대리',
            desc: 'DeepSeek R1 기반 AI가 소장, 답변서, 준비서면 등 모든 소송 서류를 자동 작성합니다. 평균 5.2분 만에 완성됩니다.',
        },
        {
            icon: '📊',
            title: '승소율 예측',
            desc: '1,800만 건 통합 법률 데이터와 OECD 8개국 판례를 분석하여 승소 확률을 86.2% 정확도로 예측합니다.',
        },
        {
            icon: '⚖️',
            title: 'AI 모의재판',
            desc: 'AI 판사, AI 검사, AI 변호사가 실제 재판을 시뮬레이션하여 예상 결과를 미리 확인할 수 있습니다.',
        },
        {
            icon: '🔗',
            title: '오픈해시 증거관리',
            desc: '모든 증거와 서류가 오픈해시 5계층 구조에 기록되어 위변조가 불가능합니다. 블록체인 대비 98.5% 에너지 절감.',
        },
        {
            icon: '🌍',
            title: '글로벌 판례 비교',
            desc: '한국, 미국, 일본, 독일 등 8개국 2,480만 건 판례를 자동 비교하여 국제적 관점을 제공합니다.',
        },
        {
            icon: '🏛️',
            title: '법제 환류 시스템',
            desc: '판결이 글로벌 기준과 현저히 이탈할 경우 입법부에 자동으로 법률 개정을 제안합니다.',
        },
        {
            icon: '💰',
            title: '비용 90% 절감',
            desc: '기존 변호사 비용 500만원~3,000만원을 30만원~50만원으로 절감합니다. 인지대/송달료는 자동 계산 및 납부.',
        },
        {
            icon: '👤',
            title: '인간 최종 결정',
            desc: 'AI는 보조 역할만 합니다. 모든 서류 제출과 최종 결정은 반드시 사람이 승인합니다.',
        },
    ];
    
    const process = [
        { step: 1, title: '사건 상담', desc: 'AI와 대화하며 사건 내용 정리', time: '10분' },
        { step: 2, title: '서류 자동 작성', desc: 'AI가 소장/답변서 초안 생성', time: '5분' },
        { step: 3, title: '승소율 분석', desc: '글로벌 판례 기반 예측', time: '3분' },
        { step: 4, title: '모의재판', desc: 'AI 판사/검사/변호사 시뮬레이션', time: '15분' },
        { step: 5, title: '인간 검토', desc: '사용자가 최종 확인 및 수정', time: '자유' },
        { step: 6, title: '수수료 납부', desc: '인지대/송달료 자동 계산 및 납부', time: '1분' },
        { step: 7, title: '서류 제출', desc: '법원 전자소송 시스템에 자동 제출', time: '즉시' },
    ];
    
    return (
        <>
            {/* 플로팅 버튼 */}
            <button
                onClick={() => setIsOpen(true)}
                className="floating-btn bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-3"
            >
                <span className="text-2xl">❓</span>
                <span>AI 전자소송이란?</span>
            </button>
            
            {/* 모달 */}
            {isOpen && (
                <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
                    <div 
                        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* 헤더 */}
                        <div className="court-header text-white p-6 rounded-t-2xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="text-5xl">⚖️</span>
                                    <div>
                                        <h2 className="text-2xl font-bold">AI 전자소송 시스템</h2>
                                        <p className="text-blue-200">국가데이터처 통합 오픈해시 기반</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white text-2xl">
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div className="p-6 space-y-8">
                            {/* 개요 */}
                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                                <h3 className="font-bold text-lg text-blue-800 mb-3">
                                    <i className="fas fa-lightbulb mr-2"></i>AI 전자소송이란?
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    AI 전자소송 시스템은 <strong>변호사의 모든 업무를 AI가 대신</strong>하는 혁신적인 법률 서비스입니다. 
                                    소장 작성, 답변서 작성, 판례 검색, 승소율 예측까지 AI가 수행하며, 
                                    <strong>최종 결정은 항상 사람이 합니다</strong>. 
                                    기존 대법원 전자소송 시스템과 동일한 법적 효력을 가지면서, 
                                    비용은 90% 절감하고 시간은 95% 단축합니다.
                                </p>
                            </div>
                            
                            {/* 핵심 기능 */}
                            <div>
                                <h3 className="font-bold text-lg mb-4"><i className="fas fa-star mr-2 text-yellow-500"></i>핵심 기능</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {features.map((f, i) => (
                                        <div key={i} className="bg-gray-50 rounded-lg p-4 border hover:shadow-md transition">
                                            <div className="flex items-start gap-3">
                                                <span className="text-2xl">{f.icon}</span>
                                                <div>
                                                    <h4 className="font-bold text-gray-800">{f.title}</h4>
                                                    <p className="text-sm text-gray-600 mt-1">{f.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* 이용 절차 */}
                            <div>
                                <h3 className="font-bold text-lg mb-4"><i className="fas fa-list-ol mr-2 text-blue-500"></i>이용 절차</h3>
                                <div className="relative">
                                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200"></div>
                                    <div className="space-y-4">
                                        {process.map(p => (
                                            <div key={p.step} className="flex items-center gap-4 relative">
                                                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold z-10">
                                                    {p.step}
                                                </div>
                                                <div className="flex-1 bg-white rounded-lg p-4 border shadow-sm">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h4 className="font-bold">{p.title}</h4>
                                                            <p className="text-sm text-gray-500">{p.desc}</p>
                                                        </div>
                                                        <span className="text-blue-600 font-medium">{p.time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* 기존 방식 vs AI */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                                    <h4 className="font-bold text-red-800 mb-4">❌ 기존 방식</h4>
                                    <ul className="space-y-3 text-sm">
                                        <li className="flex justify-between"><span>변호사 비용</span><span className="text-red-600 font-bold">500만~3,000만원</span></li>
                                        <li className="flex justify-between"><span>소장 작성</span><span className="text-red-600 font-bold">10시간</span></li>
                                        <li className="flex justify-between"><span>증거 수집</span><span className="text-red-600 font-bold">6개월</span></li>
                                        <li className="flex justify-between"><span>판례 검색</span><span className="text-red-600 font-bold">수작업</span></li>
                                        <li className="flex justify-between"><span>글로벌 비교</span><span className="text-red-600 font-bold">불가능</span></li>
                                    </ul>
                                </div>
                                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                                    <h4 className="font-bold text-green-800 mb-4">✅ AI 전자소송</h4>
                                    <ul className="space-y-3 text-sm">
                                        <li className="flex justify-between"><span>시스템 비용</span><span className="text-green-600 font-bold">30만~50만원</span></li>
                                        <li className="flex justify-between"><span>소장 작성</span><span className="text-green-600 font-bold">5.2분</span></li>
                                        <li className="flex justify-between"><span>증거 수집</span><span className="text-green-600 font-bold">15초</span></li>
                                        <li className="flex justify-between"><span>판례 검색</span><span className="text-green-600 font-bold">AI 자동</span></li>
                                        <li className="flex justify-between"><span>글로벌 비교</span><span className="text-green-600 font-bold">8개국 실시간</span></li>
                                    </ul>
                                </div>
                            </div>
                            
                            {/* 주의사항 */}
                            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                                <h4 className="font-bold text-yellow-800 mb-3">
                                    <i className="fas fa-exclamation-triangle mr-2"></i>중요 안내
                                </h4>
                                <ul className="text-sm text-yellow-900 space-y-2">
                                    <li>• AI는 <strong>보조 도구</strong>입니다. 법적 책임은 사용자에게 있습니다.</li>
                                    <li>• 모든 서류는 <strong>반드시 사람이 최종 검토</strong> 후 제출하세요.</li>
                                    <li>• 복잡한 사건은 전문 변호사 상담을 권장합니다.</li>
                                    <li>• AI 예측은 참고용이며, 실제 판결과 다를 수 있습니다.</li>
                                </ul>
                            </div>
                            
                            {/* 닫기 버튼 */}
                            <div className="text-center">
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="btn-court text-white px-8 py-3 rounded-lg font-bold"
                                >
                                    확인했습니다
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
