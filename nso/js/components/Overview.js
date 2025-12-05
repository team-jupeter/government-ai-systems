const Overview = () => {
    const stats = [
        { title: '오늘 안보 보고', value: '89건', subtitle: '북한 동향 23건', icon: '🛡️', color: 'red' },
        { title: 'AI 위협 탐지', value: '92.7%', subtitle: '사전 예방', icon: '🤖', color: 'purple' },
        { title: 'NSC 회의', value: '3회', subtitle: '긴급 소집 1회', icon: '👥', color: 'blue' },
        { title: '국제 협력', value: '45건', subtitle: '주요국 협의', icon: '🌐', color: 'green' }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-900 to-rose-900 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">국가안보실 AI 자동화 시스템</h2>
                <p className="text-lg text-red-100 mb-6">
                    국가안보에 관한 대통령의 직무를 보좌하며, 국가데이터처(NDR)를 통해 
                    외교·국방·통일·경제안보 정보를 통합하여 국가 안보 위협을 실시간 탐지하고 대응합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">💡 법적 근거</div>
                        <div className="text-red-100">정부조직법 제15조, NSC법</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">⚡ 위협 탐지</div>
                        <div className="text-red-100">AI 사이버 위협 탐지 0.3초 (기존 대비 98% 단축)</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">🛡️ 정확도</div>
                        <div className="text-red-100">위협 탐지 정확도 96.2%</div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">실시간 안보 현황</h3>
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
                            <li>• 북한 군사 동향 및 미사일 발사 정보</li>
                            <li>• 주변국 군사 동향 (중국, 일본, 러시아)</li>
                            <li>• 사이버 공격 탐지 로그 (24시간 모니터링)</li>
                            <li>• 외교 정보 및 국제 정세 분석</li>
                            <li>• 경제 안보 위협 (첨단기술 유출, 공급망 위기)</li>
                            <li>• 국정원·국방부·외교부 정보 보고</li>
                        </ul>
                    </div>
                    
                    <div className="border-l-4 border-orange-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">2. Process (업무 처리)</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• AI가 다중 정보원을 통합하여 위협 수준 자동 평가</li>
                            <li>• 긴급도에 따라 즉시·일반·관찰 등급 자동 분류</li>
                            <li>• 유사 사례 패턴 매칭으로 대응 방안 자동 제시</li>
                            <li>• NSC 상임위원회 소집 필요성 AI 판단</li>
                            <li>• 국가위기관리센터 24시간 상황 모니터링</li>
                            <li>• 사이버 공격 발생 시 0.3초 내 자동 차단</li>
                        </ul>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">3. Output 데이터 (NDR 저장)</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 대통령 안보 브리핑 자료 및 결재 내용</li>
                            <li>• NSC 회의 결과 및 대응 지침</li>
                            <li>• 각 부처 안보 관련 지시사항</li>
                            <li>• 동맹국 공유 정보 (한미동맹, 한일, 한-나토)</li>
                            <li>• 사이버 공격 대응 로그 및 사후 분석</li>
                            <li>• 위기 대응 시나리오 및 훈련 결과</li>
                        </ul>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">4. 보안성 보장 (오픈해시)</h4>
                        <p className="text-sm text-gray-600">
                            모든 안보 정보는 최고 등급 암호화와 오픈해시 분산원장에 기록되어 
                            정보 유출과 위변조를 원천 차단하며, 접근 이력을 투명하게 추적합니다.
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">🎯</div>
                        <h4 className="font-semibold text-gray-900 mb-2">국가안전보장회의(NSC) 운영</h4>
                        <p className="text-sm text-gray-600">
                            대통령 주재 NSC 회의 및 실장 주재 상임위원회를 통해 
                            외교·국방·통일 정책을 심의하고 국가 안보 전략을 수립합니다.
                        </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">🚨</div>
                        <h4 className="font-semibold text-gray-900 mb-2">국가위기관리센터 24시간 운영</h4>
                        <p className="text-sm text-gray-600">
                            북한 도발, 사이버 공격, 테러 등 국가 위기 상황을 
                            실시간 모니터링하고 즉각 대응 체계를 가동합니다.
                        </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">🛡️</div>
                        <h4 className="font-semibold text-gray-900 mb-2">사이버 안보</h4>
                        <p className="text-sm text-gray-600">
                            국가 주요 인프라에 대한 사이버 공격을 AI로 실시간 탐지하고,
                            양자내성 암호로 국가 기밀을 보호합니다.
                        </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">💼</div>
                        <h4 className="font-semibold text-gray-900 mb-2">경제 안보</h4>
                        <p className="text-sm text-gray-600">
                            첨단기술 유출 방지, 공급망 안보, 핵심광물 확보 등 
                            경제 안보 위협을 사전에 차단합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
