// 프로세스 스텝 애니메이션 컴포넌트 (별도 분리하여 부모 리렌더링 방지)
const ProcessStepsAnimation = () => {
    const [step, setStep] = React.useState(0);
    
    React.useEffect(() => {
        const interval = setInterval(() => {
            setStep(prev => (prev + 1) % 8);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const processSteps = [
        { icon: 'fa-exchange-alt', name: '거래 발생', color: 'blue', desc: '디지털 서명 생성' },
        { icon: 'fa-search', name: '세법 검색', color: 'purple', desc: '관련 조문 조회' },
        { icon: 'fa-calculator', name: '세액 계산', color: 'yellow', desc: '자동 세금 산출' },
        { icon: 'fa-file-invoice', name: '재무제표 갱신', color: 'green', desc: '양측 동시 반영' },
        { icon: 'fa-link', name: 'OpenHash 검증', color: 'cyan', desc: 'PBFT 합의' },
        { icon: 'fa-coins', name: '세금 징수', color: 'orange', desc: '자동 이체' },
        { icon: 'fa-landmark', name: '국세청 반영', color: 'pink', desc: '실시간 집계' },
        { icon: 'fa-check-circle', name: '완료', color: 'green', desc: '168바이트 블록 저장' }
    ];

    return (
        <div className="relative bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <div className="flex justify-between items-center relative">
                <div className="absolute top-8 left-0 right-0 h-1 bg-gray-700">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-green-500 transition-all duration-500"
                        style={{ width: `${(step + 1) * 12.5}%` }}></div>
                </div>
                
                {processSteps.map((s, idx) => (
                    <div key={idx} className="relative z-10 flex flex-col items-center">
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 ${
                            idx <= step 
                                ? `bg-${s.color}-500/30 border-2 border-${s.color}-400 scale-110`
                                : 'bg-gray-700/50 border border-gray-600'
                        }`}>
                            <i className={`fas ${s.icon} text-xl ${idx <= step ? `text-${s.color}-400` : 'text-gray-500'}`}></i>
                            {idx === step && (
                                <div className="absolute inset-0 border-2 border-cyan-400 rounded-xl animate-ping opacity-50"></div>
                            )}
                        </div>
                        <div className={`text-xs font-medium mt-2 ${idx <= step ? 'text-white' : 'text-gray-500'}`}>{s.name}</div>
                        <div className={`text-xs ${idx <= step ? `text-${s.color}-400` : 'text-gray-600'}`}>{s.desc}</div>
                    </div>
                ))}
            </div>
            
            <div className="mt-6 flex justify-center gap-8">
                <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">25.46<span className="text-sm">ms</span></div>
                    <div className="text-xs text-gray-400">PBFT 합의 시간</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">0.033<span className="text-sm">ms</span></div>
                    <div className="text-xs text-gray-400">AI 탐지 시간</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">168<span className="text-sm">bytes</span></div>
                    <div className="text-xs text-gray-400">블록 크기</div>
                </div>
            </div>
        </div>
    );
};

// 실시간 재무제표 Modal 컴포넌트 (별도 분리)
const RealtimeFinancialModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-gray-900 rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-y-auto border border-cyan-500/30 shadow-2xl" 
                onClick={(e) => e.stopPropagation()}>
                
                {/* 헤더 */}
                <div className="sticky top-0 z-10 relative bg-gradient-to-r from-cyan-900 via-blue-900 to-purple-900 p-8 rounded-t-3xl overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute w-64 h-64 bg-cyan-500/10 rounded-full -top-32 -left-32 animate-pulse"></div>
                        <div className="absolute w-48 h-48 bg-purple-500/10 rounded-full -bottom-24 -right-24 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    </div>
                    
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-cyan-500/30 rounded-2xl flex items-center justify-center relative">
                                <i className="fas fa-file-invoice-dollar text-4xl text-cyan-400"></i>
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                    <i className="fas fa-check text-white text-xs"></i>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white">OpenHash 실시간 재무제표 시스템</h2>
                                <p className="text-cyan-300 mt-1">5천만 국민 + 3백만 사업자의 재무제표를 자동 생성 · 실시간 갱신 · 완벽 검증</p>
                                <div className="flex gap-3 mt-2">
                                    <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs">374.76 TPS</span>
                                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">99.97% 안전성</span>
                                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs">88% 전력절감</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl p-2">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>

                {/* 핵심 강조 배너 */}
                <div className="p-6 bg-gradient-to-r from-green-900/40 via-cyan-900/40 to-green-900/40 border-b border-cyan-500/20">
                    <div className="text-center relative">
                        <div className="inline-flex items-center gap-4 bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/40 rounded-2xl px-8 py-5 relative overflow-hidden">
                            <div className="w-16 h-16 bg-green-500/30 rounded-full flex items-center justify-center relative">
                                <i className="fas fa-shield-alt text-3xl text-green-400"></i>
                            </div>
                            <div className="text-left relative">
                                <div className="text-3xl font-bold text-green-400 flex items-center gap-2">
                                    단 1원도 더 내거나 덜 낼 수 없습니다
                                    <i className="fas fa-lock text-xl"></i>
                                </div>
                                <div className="text-green-300 mt-1">모든 거래가 자동으로 재무제표에 반영되고, OpenHash로 검증되어 위변조가 원천 불가능합니다</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 본문 */}
                <div className="p-8">
                    {/* 거래 처리 플로우 애니메이션 */}
                    <div className="mb-10">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <i className="fas fa-project-diagram text-cyan-400"></i>
                            실시간 거래 처리 프로세스
                            <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs animate-pulse">LIVE</span>
                        </h3>
                        <ProcessStepsAnimation />
                    </div>

                    {/* 재무제표 자동 갱신 시각화 */}
                    <div className="mb-10">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <i className="fas fa-sync-alt text-green-400"></i>
                            재무제표 양방향 실시간 갱신
                        </h3>
                        
                        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                            <div className="flex items-center justify-between">
                                {/* 판매자 */}
                                <div className="w-64 bg-green-500/10 rounded-2xl p-4 border border-green-500/30">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                            <i className="fas fa-store text-xl text-green-400"></i>
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">판매자</div>
                                            <div className="text-xs text-green-400">공급자 (매출 발생)</div>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between"><span className="text-gray-400">매출액</span><span className="text-green-400">↑ 증가</span></div>
                                        <div className="flex justify-between"><span className="text-gray-400">현금</span><span className="text-green-400">↑ 증가</span></div>
                                        <div className="flex justify-between"><span className="text-gray-400">VAT 예수금</span><span className="text-green-400">↑ 증가</span></div>
                                        <div className="flex justify-between"><span className="text-gray-400">영업현금흐름</span><span className="text-green-400">↑ 증가</span></div>
                                    </div>
                                </div>

                                {/* 중앙: 거래 흐름 */}
                                <div className="flex-1 mx-6">
                                    <div className="relative">
                                        <div className="flex items-center justify-center mb-4">
                                            <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full">
                                                <i className="fas fa-box text-purple-400"></i>
                                                <span className="text-purple-400 text-sm">상품/서비스</span>
                                                <i className="fas fa-arrow-right text-purple-400 animate-pulse"></i>
                                            </div>
                                        </div>
                                        
                                        <div className="text-center py-4">
                                            <div className="text-3xl font-bold text-cyan-400">₩10,000,000</div>
                                            <div className="text-sm text-gray-400">거래 금액</div>
                                        </div>
                                        
                                        <div className="flex items-center justify-center mt-4">
                                            <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full">
                                                <i className="fas fa-arrow-left text-green-400 animate-pulse"></i>
                                                <span className="text-green-400 text-sm">대금 지급</span>
                                                <i className="fas fa-money-bill-wave text-green-400"></i>
                                            </div>
                                        </div>

                                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                                            <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full">
                                                <i className="fas fa-arrow-down text-yellow-400 animate-bounce"></i>
                                                <span className="text-yellow-400 text-sm">VAT ₩1,000,000</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 구매자 */}
                                <div className="w-64 bg-blue-500/10 rounded-2xl p-4 border border-blue-500/30">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                            <i className="fas fa-shopping-cart text-xl text-blue-400"></i>
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">구매자</div>
                                            <div className="text-xs text-blue-400">수요자 (비용 발생)</div>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between"><span className="text-gray-400">매입원가</span><span className="text-red-400">↑ 증가</span></div>
                                        <div className="flex justify-between"><span className="text-gray-400">현금</span><span className="text-red-400">↓ 감소</span></div>
                                        <div className="flex justify-between"><span className="text-gray-400">재고자산</span><span className="text-blue-400">↑ 증가</span></div>
                                        <div className="flex justify-between"><span className="text-gray-400">VAT 대급금</span><span className="text-blue-400">↑ 증가</span></div>
                                    </div>
                                </div>
                            </div>

                            {/* 국세청 */}
                            <div className="mt-12 flex justify-center">
                                <div className="w-80 bg-yellow-500/10 rounded-2xl p-4 border border-yellow-500/30">
                                    <div className="flex items-center gap-3">
                                        <div className="w-14 h-14 bg-yellow-500/20 rounded-xl flex items-center justify-center relative">
                                            <i className="fas fa-landmark text-2xl text-yellow-400"></i>
                                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                                <i className="fas fa-plus text-white text-xs"></i>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold text-white">국세청 재무제표</div>
                                            <div className="text-xs text-yellow-400">실시간 세입 반영</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-bold text-yellow-400">+₩1,000,000</div>
                                            <div className="text-xs text-gray-400">오늘 징수액 누적</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4계층 아키텍처 시각화 */}
                    <div className="mb-10">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <i className="fas fa-layer-group text-purple-400"></i>
                            4계층 분산 처리 아키텍처
                        </h3>
                        
                        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                            <div className="flex justify-center items-end gap-4 mb-6">
                                <div className="text-center">
                                    <div className="w-32 h-16 bg-gradient-to-t from-blue-600/30 to-blue-500/10 rounded-t-lg flex items-center justify-center border-t border-x border-blue-500/30 relative">
                                        <span className="text-white font-bold">L1 읍면동</span>
                                        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 text-xs text-blue-400">3,496</div>
                                    </div>
                                    <div className="text-xs text-blue-400 mt-1">65% 배정</div>
                                </div>
                                <div className="text-center">
                                    <div className="w-24 h-20 bg-gradient-to-t from-green-600/30 to-green-500/10 rounded-t-lg flex items-center justify-center border-t border-x border-green-500/30 relative">
                                        <span className="text-white font-bold">L2 시군구</span>
                                        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 text-xs text-green-400">226</div>
                                    </div>
                                    <div className="text-xs text-green-400 mt-1">25% 배정</div>
                                </div>
                                <div className="text-center">
                                    <div className="w-20 h-24 bg-gradient-to-t from-purple-600/30 to-purple-500/10 rounded-t-lg flex items-center justify-center border-t border-x border-purple-500/30 relative">
                                        <span className="text-white font-bold text-sm">L3 광역</span>
                                        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 text-xs text-purple-400">17</div>
                                    </div>
                                    <div className="text-xs text-purple-400 mt-1">9% 배정</div>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-28 bg-gradient-to-t from-cyan-600/30 to-cyan-500/10 rounded-t-lg flex items-center justify-center border-t border-x border-cyan-500/30 relative">
                                        <span className="text-white font-bold text-sm">L4</span>
                                        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 text-xs text-cyan-400">1</div>
                                    </div>
                                    <div className="text-xs text-cyan-400 mt-1">1% 배정</div>
                                </div>
                            </div>
                            
                            <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                                <div className="text-sm text-gray-400 mb-2">확률적 계층 배정 알고리즘</div>
                                <code className="text-cyan-400 bg-gray-800 px-4 py-2 rounded-lg text-sm">
                                    Layer = SHA256(tx_hash + timestamp + office_code) % 1000
                                </code>
                            </div>
                        </div>
                    </div>

                    {/* 기술 스펙 카드 */}
                    <div className="mb-10">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <i className="fas fa-microchip text-cyan-400"></i>
                            핵심 기술 사양
                        </h3>
                        
                        <div className="grid grid-cols-4 gap-4">
                            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-2xl p-5 border border-cyan-500/30">
                                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                                    <i className="fas fa-link text-2xl text-cyan-400"></i>
                                </div>
                                <h4 className="font-bold text-white mb-2">OpenHash 원장</h4>
                                <ul className="space-y-1 text-xs text-gray-300">
                                    <li><i className="fas fa-check text-green-400 mr-1"></i>168바이트 고정 블록</li>
                                    <li><i className="fas fa-check text-green-400 mr-1"></i>SHA-256 + ECDSA P-256</li>
                                    <li><i className="fas fa-check text-green-400 mr-1"></i>물리적 분산 저장</li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-5 border border-purple-500/30">
                                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                                    <i className="fas fa-bolt text-2xl text-purple-400"></i>
                                </div>
                                <h4 className="font-bold text-white mb-2">FPGA 가속</h4>
                                <ul className="space-y-1 text-xs text-gray-300">
                                    <li><i className="fas fa-check text-green-400 mr-1"></i>374.76 TPS 처리</li>
                                    <li><i className="fas fa-check text-green-400 mr-1"></i>88% 전력 절감</li>
                                    <li><i className="fas fa-check text-green-400 mr-1"></i>병렬 파이프라인</li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 rounded-2xl p-5 border border-green-500/30">
                                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                                    <i className="fas fa-brain text-2xl text-green-400"></i>
                                </div>
                                <h4 className="font-bold text-white mb-2">AI 탐지</h4>
                                <ul className="space-y-1 text-xs text-gray-300">
                                    <li><i className="fas fa-check text-green-400 mr-1"></i>DeepSeek R1 (671B)</li>
                                    <li><i className="fas fa-check text-green-400 mr-1"></i>99.2% 정확도</li>
                                    <li><i className="fas fa-check text-green-400 mr-1"></i>0.033ms 탐지</li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl p-5 border border-red-500/30">
                                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                                    <i className="fas fa-shield-alt text-2xl text-red-400"></i>
                                </div>
                                <h4 className="font-bold text-white mb-2">보안</h4>
                                <ul className="space-y-1 text-xs text-gray-300">
                                    <li><i className="fas fa-check text-green-400 mr-1"></i>10^-194M 해킹확률</li>
                                    <li><i className="fas fa-check text-green-400 mr-1"></i>PBFT 99.97%</li>
                                    <li><i className="fas fa-check text-green-400 mr-1"></i>양자내성 준비</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 블록 구조 */}
                    <div className="mb-10">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <i className="fas fa-cube text-yellow-400"></i>
                            168바이트 블록 구조
                        </h3>
                        
                        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                            <div className="flex gap-2 items-stretch h-24">
                                <div className="bg-gradient-to-b from-cyan-600 to-cyan-800 rounded-lg flex flex-col items-center justify-center px-4" style={{width: '27.4%'}}>
                                    <i className="fas fa-file-code text-white text-xl mb-1"></i>
                                    <span className="text-white font-bold text-sm">헤더</span>
                                    <span className="text-cyan-200 text-xs">46 bytes</span>
                                </div>
                                <div className="bg-gradient-to-b from-purple-600 to-purple-800 rounded-lg flex flex-col items-center justify-center px-4" style={{width: '42.9%'}}>
                                    <i className="fas fa-file-invoice-dollar text-white text-xl mb-1"></i>
                                    <span className="text-white font-bold text-sm">세무정보</span>
                                    <span className="text-purple-200 text-xs">72 bytes</span>
                                </div>
                                <div className="bg-gradient-to-b from-green-600 to-green-800 rounded-lg flex flex-col items-center justify-center px-4" style={{width: '29.7%'}}>
                                    <i className="fas fa-signature text-white text-xl mb-1"></i>
                                    <span className="text-white font-bold text-sm">서명</span>
                                    <span className="text-green-200 text-xs">50 bytes</span>
                                </div>
                            </div>
                            <div className="mt-6 text-center text-gray-400 text-sm">
                                <span className="bg-gray-700 px-4 py-2 rounded-lg">총 168 bytes (비트코인 1MB의 0.000016%)</span>
                            </div>
                        </div>
                    </div>

                    {/* 경제적 효과 */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <i className="fas fa-chart-pie text-green-400"></i>
                            경제적 효과
                        </h3>
                        
                        <div className="grid grid-cols-4 gap-4">
                            <div className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 rounded-xl p-5 text-center border border-green-500/20">
                                <div className="text-4xl font-bold text-green-400 mb-2">₩1,044억</div>
                                <div className="text-white font-medium">연간 운영비 절감</div>
                                <div className="text-xs text-gray-400 mt-1">64% 비용 절감</div>
                            </div>
                            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl p-5 text-center border border-cyan-500/20">
                                <div className="text-4xl font-bold text-cyan-400 mb-2">14개월</div>
                                <div className="text-white font-medium">투자 회수 기간</div>
                                <div className="text-xs text-gray-400 mt-1">ROI 달성</div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-5 text-center border border-purple-500/20">
                                <div className="text-4xl font-bold text-purple-400 mb-2">90%</div>
                                <div className="text-white font-medium">처리 시간 단축</div>
                                <div className="text-xs text-gray-400 mt-1">30일 → 2.8일</div>
                            </div>
                            <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-xl p-5 text-center border border-yellow-500/20">
                                <div className="text-4xl font-bold text-yellow-400 mb-2">87.3%</div>
                                <div className="text-white font-medium">업무 자동화율</div>
                                <div className="text-xs text-gray-400 mt-1">AI + OpenHash</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 푸터 */}
                <div className="sticky bottom-0 p-6 bg-gray-800 border-t border-gray-700 rounded-b-3xl">
                    <div className="flex items-center justify-between">
                        <a href="http://100.30.14.224/openhash-system/" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition">
                            <i className="fas fa-external-link-alt"></i>
                            <span>OpenHash 기술 상세 보기</span>
                        </a>
                        <button onClick={onClose}
                            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-8 py-3 rounded-xl font-bold transition">
                            <i className="fas fa-check mr-2"></i>확인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Header = ({ currentMenu, onMenuChange }) => {
    const [stats, setStats] = React.useState({
        todayCollection: 124730000000,
        tps: 374.76,
        taxpayers: 53247891,
        aiDetection: 99.2
    });
    const [showRealtimeModal, setShowRealtimeModal] = React.useState(false);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                todayCollection: prev.todayCollection + Math.floor(Math.random() * 50000000),
                tps: 350 + Math.random() * 50,
                taxpayers: prev.taxpayers + Math.floor(Math.random() * 10),
                aiDetection: 99.0 + Math.random() * 0.4
            }));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const formatKRW = (num) => {
        if (num >= 100000000) return (num / 100000000).toFixed(1) + '억';
        return num.toLocaleString();
    };

    const menus = [
        { id: 'dashboard', name: '대시보드', icon: 'fa-tachometer-alt' },
        { id: 'realtime', name: '실시간 징세', icon: 'fa-bolt', badge: 'LIVE' },
        { id: 'financial', name: '재무제표', icon: 'fa-file-invoice-dollar', badge: 'NEW' },
        { id: 'adjustment', name: '세금 조정', icon: 'fa-sliders-h', badge: 'NEW' },
        { id: 'ledger', name: '거래 원장', icon: 'fa-exchange-alt', badge: 'LIVE' },
        { id: 'taxlaw', name: '세법 DB', icon: 'fa-balance-scale' },
        { id: 'layer', name: 'Layer 계층', icon: 'fa-layer-group' },
        { id: 'ai', name: 'AI 상담', icon: 'fa-robot' },
        { id: 'taxpayer', name: '납세자 조회', icon: 'fa-search' },
        { id: 'verify', name: 'OpenHash 검증', icon: 'fa-shield-alt' },
        { id: 'nts', name: '국세청 재무', icon: 'fa-landmark', badge: 'LIVE' }
    ];

    return (
        <header>
            {/* 실시간 재무제표 Modal - 별도 컴포넌트로 분리 */}
            {showRealtimeModal && <RealtimeFinancialModal onClose={() => setShowRealtimeModal(false)} />}

            {/* OpenHash 배너 */}
            <div className="bg-gradient-to-r from-cyan-900 via-blue-900 to-purple-900 border-b border-cyan-500/30">
                <div className="max-w-7xl mx-auto px-4 py-2">
                    <a href="http://100.30.14.224/openhash-system/" target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 hover:opacity-80 transition">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-cyan-500/30 rounded-lg flex items-center justify-center">
                                <i className="fas fa-link text-cyan-400 text-sm"></i>
                            </div>
                            <span className="text-cyan-400 font-bold">OpenHash</span>
                        </div>
                        <span className="text-gray-300 text-sm">차세대 분산 원장 기술 | 블록체인의 한계를 넘어</span>
                        <span className="bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded text-xs">374.76 TPS</span>
                        <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs">99.97% 안전성</span>
                        <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded text-xs">88% 전력절감</span>
                        <i className="fas fa-external-link-alt text-gray-400 text-xs ml-2"></i>
                    </a>
                </div>
            </div>

            {/* 메인 헤더 */}
            <div className="gradient-bg border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* 로고 */}
                        <a href="/tax/" className="flex items-center gap-4 hover:opacity-80 transition cursor-pointer">
                            <div className="relative">
                                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg glow-cyan">
                                    <i className="fas fa-link text-2xl text-white"></i>
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                    OpenHash 국세 행정 자동화 시스템
                                </h1>
                                <p className="text-sm text-gray-400">
                                    5천만 국민 + 3백만 사업자 재무제표 실시간 자동화 | AI 기반 세무 처리
                                </p>
                            </div>
                        </a>

                        {/* 실시간 지표 */}
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-800/80 rounded-xl px-3 py-2 border border-gray-700">
                                <div className="text-xs text-gray-400">오늘 징수액</div>
                                <div className="text-lg font-bold text-green-400">₩{formatKRW(stats.todayCollection)}</div>
                            </div>
                            <div className="bg-gray-800/80 rounded-xl px-3 py-2 border border-gray-700">
                                <div className="text-xs text-gray-400">실시간 거래</div>
                                <div className="text-lg font-bold text-cyan-400">{stats.tps.toFixed(2)} TPS</div>
                            </div>
                            <div className="bg-gray-800/80 rounded-xl px-3 py-2 border border-gray-700">
                                <div className="text-xs text-gray-400">등록 납세자</div>
                                <div className="text-lg font-bold text-white">{stats.taxpayers.toLocaleString()}</div>
                            </div>
                            <div className="bg-gray-800/80 rounded-xl px-3 py-2 border border-gray-700">
                                <div className="text-xs text-gray-400">AI 탈세 탐지</div>
                                <div className="text-lg font-bold text-purple-400">{stats.aiDetection.toFixed(1)}%</div>
                            </div>
                            {/* 실시간 재무제표 버튼 */}
                            <button 
                                onClick={() => setShowRealtimeModal(true)}
                                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border border-cyan-500/50 rounded-xl px-5 py-2 flex items-center gap-3 transition cursor-pointer group min-w-[220px]"
                            >
                                <i className="fas fa-file-invoice-dollar text-xl text-cyan-300 group-hover:animate-pulse"></i>
                                <div className="text-left">
                                    <div className="text-xs text-cyan-200">OpenHash</div>
                                    <div className="text-sm font-bold text-white whitespace-nowrap">실시간 재무제표</div>
                                </div>
                                <i className="fas fa-info-circle text-cyan-300 ml-1"></i>
                            </button>
                        </div>
                    </div>

                    {/* 메뉴 */}
                    <nav className="mt-4 flex gap-2 flex-wrap">
                        {menus.map(menu => (
                            <button
                                key={menu.id}
                                onClick={() => onMenuChange(menu.id)}
                                className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                                    currentMenu === menu.id
                                        ? 'bg-cyan-600 text-white'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                <i className={`fas ${menu.icon}`}></i>
                                <span>{menu.name}</span>
                                {menu.badge && (
                                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                                        menu.badge === 'LIVE' ? 'bg-red-500 text-white animate-pulse' :
                                        menu.badge === 'NEW' ? 'bg-green-500 text-white' : 'bg-gray-600'
                                    }`}>{menu.badge}</span>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};
