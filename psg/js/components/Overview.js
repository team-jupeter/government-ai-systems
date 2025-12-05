const Overview = () => {
    const stats = [
        { title: '오늘 경호 활동', value: '234건', subtitle: '대통령 일정 18회', icon: '🛡️', color: 'blue' },
        { title: 'AI 위협 탐지', value: '99.2%', subtitle: '사전 차단', icon: '🤖', color: 'red' },
        { title: '경비 구역', value: '17개소', subtitle: '24시간 경비', icon: '🏢', color: 'green' },
        { title: '국빈 경호', value: '3회', subtitle: '외국 정상', icon: '🌐', color: 'purple' }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-gray-800 to-slate-900 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">대통령경호처 AI 자동화 시스템</h2>
                <p className="text-lg text-gray-100 mb-6">
                    대통령 등의 경호를 전담하는 국가기관으로, 국가데이터처(NDR)를 통해 
                    위협정보를 실시간 통합하여 대통령의 절대 안전을 보장합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">💡 법적 근거</div>
                        <div className="text-gray-100">정부조직법 제16조, 대통령 등 경호법</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">⚡ 대응 속도</div>
                        <div className="text-gray-100">위협 탐지 0.1초, 즉각 대응</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">🛡️ 정확도</div>
                        <div className="text-gray-100">AI 위협 판별 99.2%</div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">실시간 경호 현황</h3>
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
                            <li>• 대통령 일정 및 동선 정보</li>
                            <li>• 국정원·경찰청 위협 정보</li>
                            <li>• 행사장 CCTV 및 센서 데이터</li>
                            <li>• 참석자 신원 조회 결과</li>
                            <li>• 국빈 방문 일정 및 경호 요청</li>
                            <li>• 전직 대통령 경호 일정</li>
                        </ul>
                    </div>
                    
                    <div className="border-l-4 border-red-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">2. Process (업무 처리)</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• AI가 다중 센서 데이터를 통합하여 위협 자동 탐지</li>
                            <li>• 행사 전 경호 동선 시뮬레이션 및 최적화</li>
                            <li>• 참석자 신원 자동 검증 (블랙리스트 대조)</li>
                            <li>• 경호인력 자동 배치 최적화</li>
                            <li>• 돌발상황 시나리오별 대응 매뉴얼 자동 제시</li>
                            <li>• C.A.T.(대테러 특공대) 출동 필요성 AI 판단</li>
                        </ul>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">3. Output 데이터 (NDR 저장)</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 경호 활동 일지 및 특이사항</li>
                            <li>• 위협 탐지 및 대응 기록</li>
                            <li>• 행사별 경호 평가 보고서</li>
                            <li>• 경호 장비 및 차량 운용 기록</li>
                            <li>• 경호인력 배치 및 근무 기록</li>
                            <li>• 국빈 경호 협력 결과</li>
                        </ul>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">4. 보안성 보장 (오픈해시)</h4>
                        <p className="text-sm text-gray-600">
                            모든 경호 정보는 최고등급 암호화와 오픈해시 분산원장에 기록되어 
                            정보 유출을 원천 차단하며, 대통령 안전을 절대적으로 보장합니다.
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">👤</div>
                        <h4 className="font-semibold text-gray-900 mb-2">대통령 경호</h4>
                        <p className="text-sm text-gray-600">
                            대통령과 가족의 24시간 경호, 공식 행사 수행 경호,
                            AI 기반 동선 최적화로 안전을 보장합니다.
                        </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">🏛️</div>
                        <h4 className="font-semibold text-gray-900 mb-2">대통령실 경비</h4>
                        <p className="text-sm text-gray-600">
                            대통령실 및 주변 지역 24시간 경비,
                            군·경 경호부대(101경비단, 33헌병대 등) 통합 지휘합니다.
                        </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">🌏</div>
                        <h4 className="font-semibold text-gray-900 mb-2">국빈 경호</h4>
                        <p className="text-sm text-gray-600">
                            방한하는 외국 정상 및 행정수반 경호,
                            국제 프로토콜에 맞는 최고급 경호 서비스를 제공합니다.
                        </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">💥</div>
                        <h4 className="font-semibold text-gray-900 mb-2">대테러 작전</h4>
                        <p className="text-sm text-gray-600">
                            C.A.T.(707특임단 파견) 운영으로 테러 위협 대응,
                            화생방 공격 등 특수 위협에 대비합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
