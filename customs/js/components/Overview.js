const Overview = () => {
    const stats = [
        { title: '오늘 통관 처리', value: '3,456건', subtitle: '전일 대비 +8%', icon: '📦', color: 'blue' },
        { title: 'AI 자동 처리율', value: '78.5%', subtitle: '인간 승인 21.5%', icon: '🤖', color: 'purple' },
        { title: 'NDR 데이터 인출', value: '1,234건', subtitle: '평균 3.2MB/건', icon: '📥', color: 'green' },
        { title: '밀수 적발', value: '23건', subtitle: 'AI 탐지 19건', icon: '🚨', color: 'red' }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">관세청 AI 자동화 시스템</h2>
                <p className="text-lg text-teal-100 mb-6">
                    국가데이터처와 연동하여 수출입 통관, 관세 부과, 밀수 단속을 투명하게 처리하고, 
                    오픈해시 기술로 위변조 불가능한 감사 추적을 제공합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">💡 핵심 기술</div>
                        <div className="text-teal-100">OpenHash + DeepSeek R1 AI</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">⚡ 통관 속도</div>
                        <div className="text-teal-100">평균 1.8초/건 (기존 대비 92% 단축)</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">🛡️ 밀수 탐지</div>
                        <div className="text-teal-100">AI 정확도 96.7%</div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">실시간 업무 현황</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">시스템 아키텍처</h3>
                <div className="space-y-4">
                    <div className="border-l-4 border-teal-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">1. 국가데이터처 연동</h4>
                        <p className="text-sm text-gray-600">
                            수출입 신고서, 관세율 정보, 원산지 증명 등 모든 통관 데이터는 
                            국가데이터처(NDR)에 저장되며, 관세청은 필요 시 인출하여 처리합니다.
                        </p>
                    </div>
                    
                    <div className="border-l-4 border-cyan-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">2. AI 자동 통관 심사</h4>
                        <p className="text-sm text-gray-600">
                            DeepSeek R1 모델이 HS Code 분류, 관세율 적용, 밀수 의심 적하 탐지를 
                            자동으로 수행하며, 고위험 건은 인간 심사관이 검토합니다.
                        </p>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">3. 오픈해시 무결성 보장</h4>
                        <p className="text-sm text-gray-600">
                            모든 통관 절차는 오픈해시 분산원장에 기록되어 위변조가 불가능하며, 
                            FTA 원산지 검증도 투명하게 추적됩니다.
                        </p>
                    </div>
                    
                    <div className="border-l-4 border-red-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">4. 밀수 실시간 탐지</h4>
                        <p className="text-sm text-gray-600">
                            AI가 과거 밀수 패턴을 학습하여 의심 거래를 실시간 탐지하고, 
                            X-Ray 영상 분석으로 위장 적하를 자동 식별합니다.
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">🚢</div>
                        <h4 className="font-semibold text-gray-900 mb-2">자동 통관 심사</h4>
                        <p className="text-sm text-gray-600">
                            HS Code 자동 분류, 관세율 적용, 원산지 검증을 
                            AI가 자동으로 처리하여 통관 시간을 단축합니다.
                        </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">🔍</div>
                        <h4 className="font-semibold text-gray-900 mb-2">밀수 탐지 시스템</h4>
                        <p className="text-sm text-gray-600">
                            과거 밀수 패턴 학습 및 X-Ray 영상 분석으로 
                            위장 적하와 불법 반입을 실시간 탐지합니다.
                        </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">💰</div>
                        <h4 className="font-semibold text-gray-900 mb-2">관세 자동 부과</h4>
                        <p className="text-sm text-gray-600">
                            FTA 협정세율, 할당관세 등 복잡한 관세율을 
                            AI가 자동으로 계산하고 부과합니다.
                        </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">📊</div>
                        <h4 className="font-semibold text-gray-900 mb-2">무역 통계 분석</h4>
                        <p className="text-sm text-gray-600">
                            수출입 동향, 품목별 통계, 국가별 교역량을 
                            실시간으로 집계하고 분석합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
