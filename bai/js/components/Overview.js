const Overview = () => {
    const stats = [
        { title: '오늘 감사 활동', value: '167건', subtitle: '회계검사 89건', icon: '🔍', color: 'red' },
        { title: 'AI 자동 분석', value: '94.3%', subtitle: '부정 징후 탐지', icon: '🤖', color: 'purple' },
        { title: '적발 금액', value: '234억원', subtitle: '회수 조치', icon: '💰', color: 'green' },
        { title: '징계 요구', value: '45건', subtitle: '직무감찰', icon: '⚖️', color: 'blue' }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-800 to-orange-800 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">감사원 AI 자동화 시스템</h2>
                <p className="text-lg text-red-100 mb-6">
                    국가의 세입·세출 결산 및 회계검사와 행정기관·공무원 직무 감찰을 수행하는 헌법기관으로,
                    국가데이터처(NDR)를 통해 모든 공공기관의 재정 집행을 실시간 감시합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">💡 법적 근거</div>
                        <div className="text-red-100">헌법 제97조, 감사원법</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">⚡ 적발 속도</div>
                        <div className="text-red-100">AI 이상거래 탐지 0.5초 (기존 대비 99.8% 단축)</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">🎯 정확도</div>
                        <div className="text-red-100">부정 징후 탐지 94.3%</div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">실시간 감사 현황</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">국가데이터처 연동 업무 흐름</h3>
                <div className="space-y-4">
                    <div className="border-l-4 border-red-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">1. Input 데이터 (NDR 인출)</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 모든 중앙행정기관·지방자치단체 세입·세출 내역</li>
                            <li>• 공공기관·공기업 재무제표 및 회계 장부</li>
                            <li>• 국가 계약 체결 내역 (조달청 연동)</li>
                            <li>• 공무원 인사·복무 기록</li>
                            <li>• 국민감사청구 및 신고 사항</li>
                            <li>• 언론 보도 및 제보 정보</li>
                        </ul>
                    </div>
                    
                    <div className="border-l-4 border-orange-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">2. Process (업무 처리)</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• AI가 이상 거래 패턴 자동 탐지 (금액 부풀리기, 허위 계약)</li>
                            <li>• 유사 사례 데이터베이스와 대조하여 부정 징후 분석</li>
                            <li>• 부처별 예산 집행률 및 집행 적정성 자동 평가</li>
                            <li>• 공무원 직무 이상 행위 패턴 탐지</li>
                            <li>• 감사 우선순위 자동 설정 (위험도 높은 기관 우선)</li>
                            <li>• 현장 실사 필요성 AI 판단 및 감사팀 자동 배정</li>
                        </ul>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">3. Output 데이터 (NDR 저장)</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 감사 결과 및 처분 요구서 (징계·변상·시정)</li>
                            <li>• 대통령·국회 결산 보고서</li>
                            <li>• 부정행위 적발 내역 및 환수 조치</li>
                            <li>• 제도 개선 권고 사항</li>
                            <li>• 공직자 징계 처분 기록</li>
                            <li>• 국민감사청구 처리 결과</li>
                        </ul>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">4. 투명성 보장 (오픈해시)</h4>
                        <p className="text-sm text-gray-600">
                            모든 감사 과정과 결과는 오픈해시 분산원장에 기록되어 
                            감사의 공정성과 투명성을 보장하며, 부정행위 재발을 방지합니다.
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">📊</div>
                        <h4 className="font-semibold text-gray-900 mb-2">회계검사</h4>
                        <p className="text-sm text-gray-600">
                            국가 세입·세출 결산 검사, 공공기관 재무제표 검증,
                            AI 기반 이상 거래 실시간 탐지로 재정 누수를 원천 차단합니다.
                        </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">⚖️</div>
                        <h4 className="font-semibold text-gray-900 mb-2">직무감찰</h4>
                        <p className="text-sm text-gray-600">
                            공무원 직무 수행 적정성 감찰, 부정·비위 행위 조사,
                            징계 및 변상 조치를 통해 공직 기강을 확립합니다.
                        </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">👥</div>
                        <h4 className="font-semibold text-gray-900 mb-2">국민감사청구</h4>
                        <p className="text-sm text-gray-600">
                            국민 300명 이상 연명으로 감사를 청구할 수 있으며,
                            AI가 청구 타당성을 사전 분석하여 신속히 처리합니다.
                        </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">📋</div>
                        <h4 className="font-semibold text-gray-900 mb-2">제도 개선 권고</h4>
                        <p className="text-sm text-gray-600">
                            반복되는 부정행위 패턴을 분석하여 제도적 허점을 발견하고,
                            각 부처에 제도 개선을 권고하여 근본적 해결을 유도합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
