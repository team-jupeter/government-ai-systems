const IntroModal = ({ onClose, onDontShowAgain }) => {
    const [slide, setSlide] = React.useState(0);
    const features = [
        { icon: 'fa-robot', color: 'blue', title: 'AI 의사 사전 진단', desc: '병원 방문 전 AI가 증상을 분석하고 사전 진단을 수행합니다.' },
        { icon: 'fa-hospital', color: 'green', title: '스마트 병원 추천', desc: '거주지와 증상에 맞는 최적의 병원과 전문의를 추천합니다.' },
        { icon: 'fa-calendar-check', color: 'purple', title: '원클릭 예약', desc: '추천 병원에 즉시 예약하고 AI 진단 결과가 의료진에게 전송됩니다.' },
        { icon: 'fa-heartbeat', color: 'red', title: '24시간 생체 모니터링', desc: '스마트폰으로 체온, 맥박, 혈압 등을 실시간 모니터링합니다.' },
        { icon: 'fa-shield-alt', color: 'cyan', title: '개인정보금고 (PDV)', desc: '모든 건강정보는 OpenHash로 암호화되어 안전하게 보관됩니다.' },
        { icon: 'fa-notes-medical', color: 'yellow', title: '예방 의학 중심', desc: '치료보다 예방! AI가 질병을 사전에 예측하고 관리합니다.' }
    ];
    const f = features[slide];
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{backgroundColor:'rgba(0,0,0,0.85)'}}>
            <div className="bg-gray-900 rounded-2xl border border-gray-700 max-w-2xl w-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-900 to-cyan-900 p-6 border-b border-gray-700">
                    <div className="flex items-center space-x-4"><div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center"><i className="fas fa-hospital text-3xl text-white"></i></div><div><h2 className="text-2xl font-bold text-white">제주 권역 통합 의료 AI 시스템</h2><p className="text-blue-200 text-sm mt-1">OpenHash 기반 차세대 스마트 병원</p></div></div>
                </div>
                <div className="p-8">
                    <div className="flex items-start space-x-6">
                        <div className={`w-20 h-20 rounded-2xl bg-${f.color}-500/30 flex items-center justify-center`}><i className={`fas ${f.icon} text-4xl text-${f.color}-400`}></i></div>
                        <div><span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">{slide+1}/{features.length}</span><h3 className="text-2xl font-bold mt-2 mb-3">{f.title}</h3><p className="text-gray-300 text-lg">{f.desc}</p></div>
                    </div>
                    <div className="flex justify-center space-x-2 mt-8">{features.map((_,i)=>(<button key={i} onClick={()=>setSlide(i)} className={`w-3 h-3 rounded-full ${i===slide?'bg-blue-500 w-8':'bg-gray-600'}`}/>))}</div>
                </div>
                <div className="bg-gray-800/50 border-t border-gray-700 p-6 flex items-center justify-between">
                    <button onClick={onDontShowAgain} className="text-gray-400 hover:text-white text-sm"><i className="far fa-eye-slash mr-2"></i>다시 보지 않기</button>
                    <div className="flex space-x-3">
                        <button onClick={()=>setSlide(Math.max(0,slide-1))} disabled={slide===0} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 rounded-lg">이전</button>
                        {slide===features.length-1?(<button onClick={onClose} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium">시작하기</button>):(<button onClick={()=>setSlide(slide+1)} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">다음</button>)}
                    </div>
                </div>
            </div>
        </div>
    );
};
