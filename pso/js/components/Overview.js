const Overview = () => {
    const stats = [
        { title: '오늘 정책보좌', value: '156건', subtitle: '각 부처 보고', icon: '📋', color: 'blue' },
        { title: 'AI 자동 분류', value: '84.2%', subtitle: '인간 검토 15.8%', icon: '🤖', color: 'purple' },
        { title: '국정과제 점검', value: '89건', subtitle: '진행률 확인', icon: '✅', color: 'green' },
        { title: '위기상황 대응', value: '12건', subtitle: '실시간 모니터링', icon: '🚨', color: 'red' }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">대통령비서실 AI 자동화 시스템</h2>
                <p className="text-lg text-blue-100 mb-6">
                    대통령의 직무를 보좌하는 최고 정책참모기관으로, 국가데이터처(NDR)를 통해 
                    각 부처의 정책보고를 취합하고 대통령의 국정 의사결정을 지원합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">💡 법적 근거</div>
                        <div className="text-blue-100">정부조직법 제14조</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">⚡ 처리 속도</div>
                        <div className="text-blue-100">정책보고 평균 2.3시간 (기존 대비 76% 단축)</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">🛡️ 정확도</div>
                        <div className="text-blue-100">AI 정책 분류 정확도 95.8%</div>
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">국가데이터처 연동 업무 흐름</h3>
                <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">1. Input 데이터 (NDR 인출)</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 각 부처 정책보고서 및 업무보고</li>
                            <li>• 국정현안 및 긴급사안 보고</li>
                            <li>• 국민청원 및 민원 데이터</li>
                            <li>• 위기관리 상황보고</li>
                            <li>• 언론 동향 및 여론 분석</li>
                        </ul>
                    </div>
                    
                    <div className="border-l-4 border-indigo-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">2. Process (업무 처리)</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• AI가 보고서를 자동 분류 및 우선순위 설정</li>
                            <li>• 수석비서관별 전문 영역으로 자동 배분</li>
                            <li>• 부처 간 정책 충돌 여부 자동 탐지</li>
                            <li>• 국정과제 진행률 실시간 추적</li>
                            <li>• 긴급도가 높은 사안은 즉시 대통령께 보고</li>
                        </ul>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">3. Output 데이터 (NDR 저장)</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 대통령 지시사항 및 결재 내용</li>
                            <li>• 정책 조정 결과 및 방향</li>
                            <li>• 부처 간 협의 결과</li>
                            <li>• 국정과제 점검 결과</li>
                            <li>• 위기관리 대응 기록</li>
                        </ul>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">4. 투명성 보장 (오픈해시)</h4>
                        <p className="text-sm text-gray-600">
                            모든 정책보좌 과정은 오픈해시 분산원장에 기록되어 
                            정책 결정의 투명성과 책임성을 확보합니다.
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">📊</div>
                        <h4 className="font-semibold text-gray-900 mb-2">정책 보좌</h4>
                        <p className="text-sm text-gray-600">
                            각 부처 정책을 종합하여 대통령의 국정 의사결정을 지원하고,
                            AI가 정책 우선순위와 부처 간 조율사항을 자동 분석합니다.
                        </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">🎯</div>
                        <h4 className="font-semibold text-gray-900 mb-2">국정과제 관리</h4>
                        <p className="text-sm text-gray-600">
                            대통령 공약 및 국정과제의 이행 상황을 실시간 추적하고,
                            지연되는 과제를 조기에 파악하여 독려합니다.
                        </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">👥</div>
                        <h4 className="font-semibold text-gray-900 mb-2">인사 관리</h4>
                        <p className="text-sm text-gray-600">
                            고위공직자 인사에 대한 검증 및 추천을 수행하며,
                            AI가 적임자 후보를 자동으로 추천합니다.
                        </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">🚨</div>
                        <h4 className="font-semibold text-gray-900 mb-2">위기관리</h4>
                        <p className="text-sm text-gray-600">
                            국가 위기 상황을 24시간 모니터링하고,
                            긴급 사안 발생 시 즉각 대응 체계를 가동합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
