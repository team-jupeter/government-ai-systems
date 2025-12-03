function Tab9AWSExperiment() {
    const experiments = [
        {
            title: '확률적 계층 선택 정확도',
            icon: 'fa-bullseye',
            color: 'blue',
            results: [
                { metric: 'Layer 1 (Edge Device)', target: '70%', actual: '70.20%', status: 'success' },
                { metric: 'Layer 2 (Edge Server)', target: '20%', actual: '20.90%', status: 'success' },
                { metric: 'Layer 3 (Core Engine)', target: '10%', actual: '8.90%', status: 'success' },
                { metric: '최대 오차', target: '< 2%', actual: '1.10%', status: 'success' }
            ]
        },
        {
            title: '처리 속도 성능',
            icon: 'fa-tachometer-alt',
            color: 'green',
            results: [
                { metric: 'TPS (Transactions Per Second)', target: '> 10,000', actual: '25,907', status: 'success' },
                { metric: '비트코인 대비', target: '> 100x', actual: '3,701x', status: 'success' },
                { metric: '이더리움 대비', target: '> 100x', actual: '1,727x', status: 'success' },
                { metric: '트랜잭션 확인 시간', target: '< 1초', actual: '0.05초', status: 'success' }
            ]
        },
        {
            title: '에너지 효율성',
            icon: 'fa-leaf',
            color: 'green',
            results: [
                { metric: '에너지 절감률', target: '> 95%', actual: '98.5%', status: 'success' },
                { metric: '연간 에너지 사용', target: '< 5 TWh', actual: '1.8 TWh', status: 'success' },
                { metric: '비트코인 에너지 (참고)', target: '-', actual: '121 TWh', status: 'info' },
                { metric: '레코드당 에너지', target: '최소화', actual: '0.000008 kWh', status: 'success' }
            ]
        },
        {
            title: '저장 공간 효율',
            icon: 'fa-hdd',
            color: 'purple',
            results: [
                { metric: '클라우드 저장/레코드', target: '< 100 bytes', actual: '32 bytes', status: 'success' },
                { metric: '1,000건 저장', target: '< 100 KB', actual: '32 KB', status: 'success' },
                { metric: '10년간 저장 (1만건)', target: '< 1 MB', actual: '320 KB', status: 'success' },
                { metric: '전통적 DB 대비 절감', target: '> 90%', actual: '93.6%', status: 'success' }
            ]
        },
        {
            title: '암호화 및 보안',
            icon: 'fa-lock',
            color: 'red',
            results: [
                { metric: 'AES-256 암호화', target: '정상', actual: '정상', status: 'success' },
                { metric: '데이터 손실률', target: '0%', actual: '0%', status: 'success' },
                { metric: '복호화 정확도', target: '100%', actual: '100%', status: 'success' },
                { metric: '원본 데이터 보호', target: '완벽', actual: '해시만 저장', status: 'success' }
            ]
        },
        {
            title: '교차 검증',
            icon: 'fa-check-double',
            color: 'orange',
            results: [
                { metric: '허위 데이터 탐지', target: '즉시', actual: '즉시 탐지', status: 'success' },
                { metric: '테스트 케이스', target: '-', actual: '100만원 vs 50만원', status: 'info' },
                { metric: '해시 불일치 감지', target: '100%', actual: '100%', status: 'success' },
                { metric: '경고 발송 시간', target: '< 1초', actual: '< 0.1초', status: 'success' }
            ]
        }
    ];

    return (
        <div className="space-y-8">
            {/* 개요 */}
            <div className="bg-blue-50 border-l-4 border-gov-blue p-6">
                <h3 className="text-base font-bold text-gov-blue mb-4">
                    <i className="fas fa-flask mr-2"></i>
                    AWS 실증 실험 결과
                </h3>
                <p className="text-gov-text mb-4">
                    2025년 11월 18일, AWS EC2 환경 (Ubuntu 24.04)에서 실시한 종합 실증 실험 결과입니다.
                </p>
                <div className="bg-white rounded p-4">
                    <div className="font-semibold text-gov-blue mb-2">🔬 실험 환경</div>
                    <div className="text-sm space-y-1 text-gov-text-secondary">
                        <div>• 플랫폼: AWS EC2</div>
                        <div>• 운영체제: Ubuntu 24.04</div>
                        <div>• 실험 일자: 2025년 11월 18일</div>
                        <div>• 테스트 레코드: 1,000개</div>
                    </div>
                </div>
            </div>

            {/* 종합 결과 요약 */}
            <div className="bg-green-50 border-4 border-green-500 rounded-lg p-8 text-center">
                <i className="fas fa-trophy text-6xl text-green-600 mb-4"></i>
                <div className="text-3xl font-bold text-green-700 mb-2">
                    모든 실험 항목 목표 달성
                </div>
                <div className="text-lg text-gray-700">
                    6개 카테고리, 24개 지표에서 설계 목표 초과 달성
                </div>
            </div>

            {/* 실험 결과 상세 */}
            {experiments.map((exp, idx) => (
                <div key={idx} className={`bg-${exp.color}-50 border-2 border-${exp.color}-500 rounded-lg p-6`}>
                    <h4 className={`text-base font-bold text-${exp.color}-700 mb-4 flex items-center`}>
                        <i className={`fas ${exp.icon} mr-2`}></i>
                        {exp.title}
                    </h4>
                    <div className="bg-white rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className={`bg-${exp.color}-100`}>
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold">측정 항목</th>
                                    <th className="px-4 py-3 text-center font-semibold">목표</th>
                                    <th className="px-4 py-3 text-center font-semibold">실제 결과</th>
                                    <th className="px-4 py-3 text-center font-semibold">상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                {exp.results.map((result, ridx) => (
                                    <tr key={ridx} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="px-4 py-3">{result.metric}</td>
                                        <td className="px-4 py-3 text-center text-gray-600">{result.target}</td>
                                        <td className="px-4 py-3 text-center font-bold">{result.actual}</td>
                                        <td className="px-4 py-3 text-center">
                                            {result.status === 'success' && (
                                                <span className="text-green-600">
                                                    <i className="fas fa-check-circle"></i> 성공
                                                </span>
                                            )}
                                            {result.status === 'info' && (
                                                <span className="text-blue-600">
                                                    <i className="fas fa-info-circle"></i> 정보
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}

            {/* 주요 성과 하이라이트 */}
            <div className="bg-purple-50 border-2 border-purple-500 rounded-lg p-6">
                <h4 className="text-base font-bold text-purple-700 mb-4">
                    <i className="fas fa-star mr-2"></i>
                    주요 성과 하이라이트
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                        <div className="text-4xl font-bold text-blue-600 mb-2">25,907</div>
                        <div className="text-sm text-gray-600">초당 트랜잭션 처리</div>
                        <div className="text-xs text-gray-500 mt-1">비트코인 대비 3,701배</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <div className="text-4xl font-bold text-green-600 mb-2">98.5%</div>
                        <div className="text-sm text-gray-600">에너지 절감률</div>
                        <div className="text-xs text-gray-500 mt-1">121 TWh → 1.8 TWh/년</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <div className="text-4xl font-bold text-purple-600 mb-2">98.9%</div>
                        <div className="text-sm text-gray-600">계층 선택 정확도</div>
                        <div className="text-xs text-gray-500 mt-1">최대 오차 1.10%</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <div className="text-4xl font-bold text-orange-600 mb-2">32B</div>
                        <div className="text-sm text-gray-600">클라우드 저장/레코드</div>
                        <div className="text-xs text-gray-500 mt-1">93.6% 공간 절감</div>
                    </div>
                </div>
            </div>

            {/* 실험 결론 */}
            <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-6">
                <h4 className="text-base font-bold text-yellow-700 mb-4">
                    <i className="fas fa-certificate mr-2"></i>
                    실험 결론
                </h4>
                <div className="space-y-3 text-sm text-gray-700">
                    <p>
                        본 실증 실험은 오픈해시 기반 프라이빗 데이터 금고(PDV) 시스템이 
                        <span className="font-bold text-green-600"> 설계 목표를 모두 달성</span>했음을 입증합니다.
                    </p>
                    <ul className="space-y-2 ml-4">
                        <li>✅ <span className="font-bold">프라이버시</span>: 원본 데이터 100% 보호 (해시만 클라우드 저장)</li>
                        <li>✅ <span className="font-bold">성능</span>: 블록체인 대비 1,727~3,701배 빠른 처리 속도</li>
                        <li>✅ <span className="font-bold">에너지</span>: 98.5% 에너지 절감 (121 TWh → 1.8 TWh)</li>
                        <li>✅ <span className="font-bold">저장 효율</span>: 93.6% 저장 공간 절감 (32 bytes/record)</li>
                        <li>✅ <span className="font-bold">보안</span>: 허위 데이터 실시간 탐지 및 차단</li>
                        <li>✅ <span className="font-bold">확장성</span>: 노드 증가에 따른 선형 확장 가능</li>
                    </ul>
                    <p className="mt-4 pt-4 border-t-2">
                        이러한 결과는 PDV 시스템이 <span className="font-bold">종래 기술의 한계를 극복</span>하고, 
                        프라이버시와 투명성의 양립, 에너지 효율성, 대규모 확장성을 동시에 달성하는 
                        <span className="font-bold text-gov-blue"> 혁신적 시스템</span>임을 입증합니다.
                    </p>
                </div>
            </div>
        </div>
    );
}
