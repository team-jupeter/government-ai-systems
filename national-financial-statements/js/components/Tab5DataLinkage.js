const { useState } = React;

function Tab5DataLinkage() {
    const [linkageRequest, setLinkageRequest] = useState({
        from: '보건복지부',
        to: '국세청',
        purpose: '기초생활수급자 소득 확인',
        legalBasis: '사회보장급여법 제37조'
    });
    const [linkageResult, setLinkageResult] = useState(null);

    const performLinkage = () => {
        const startTime = Date.now();
        
        setTimeout(() => {
            const endTime = Date.now();
            const linkageTime = ((endTime - startTime) / 1000).toFixed(1);
            
            setLinkageResult({
                success: true,
                linkageTime,
                aiVerificationTime: '2.3초',
                dataTransferred: '1,523건',
                anonymized: true,
                kAnonymity: 'k=5',
                costSaved: '450억원 → 0원',
                steps: [
                    { step: 1, name: 'API 요청', status: 'complete', time: '0.1초' },
                    { step: 2, name: 'AI 법규 검증', status: 'complete', time: '2.3초' },
                    { step: 3, name: 'ISO 표준 변환', status: 'complete', time: '1.2초' },
                    { step: 4, name: 'Layer 1 해시 조회', status: 'complete', time: '3.8초' },
                    { step: 5, name: 'k-익명성 적용', status: 'complete', time: '5.1초' },
                    { step: 6, name: '데이터 전달', status: 'complete', time: '2.5초' }
                ],
                totalTime: '15.0초',
                traditionalTime: '15개월 (450일)',
                improvement: '99.9997%'
            });
        }, 2000);
    };

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-gov-blue p-4">
                <p className="text-sm text-gov-text">
                    부처 간 개별 협약 없이 <span className="font-bold text-gov-blue">국가데이터처 Open API</span>를 통해 
                    데이터 연계를 자동화하여 <span className="font-bold text-gov-blue">연간 450억 원 → 0원</span>으로 절감합니다.
                </p>
            </div>

            {/* 연계 요청 */}
            <div>
                <h4 className="text-base font-bold text-gov-text mb-3">데이터 연계 요청</h4>
                <div className="bg-white border-2 border-gov-border rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">요청 부처</label>
                            <select
                                value={linkageRequest.from}
                                onChange={(e) => setLinkageRequest({...linkageRequest, from: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                            >
                                <option>보건복지부</option>
                                <option>국토교통부</option>
                                <option>교육부</option>
                                <option>고용노동부</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">제공 부처</label>
                            <select
                                value={linkageRequest.to}
                                onChange={(e) => setLinkageRequest({...linkageRequest, to: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                            >
                                <option>국세청</option>
                                <option>금융감독원</option>
                                <option>건강보험공단</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">연계 목적</label>
                        <input
                            type="text"
                            value={linkageRequest.purpose}
                            onChange={(e) => setLinkageRequest({...linkageRequest, purpose: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">법적 근거</label>
                        <select
                            value={linkageRequest.legalBasis}
                            onChange={(e) => setLinkageRequest({...linkageRequest, legalBasis: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        >
                            <option>사회보장급여법 제37조</option>
                            <option>전자정부법 제44조</option>
                            <option>통계법 제24조</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* 연계 실행 버튼 */}
            <button
                onClick={performLinkage}
                className="w-full bg-gov-blue text-white py-3 rounded-lg font-bold hover:bg-gov-blue-light text-sm"
            >
                <i className="fas fa-exchange-alt mr-2"></i>
                데이터 연계 실행
            </button>

            {/* 연계 결과 */}
            {linkageResult && (
                <div className="space-y-4">
                    {/* 처리 단계 */}
                    <div className="bg-white border-2 border-gov-border rounded-lg p-4">
                        <h5 className="font-bold text-sm mb-3">처리 단계</h5>
                        <div className="space-y-2">
                            {linkageResult.steps.map((step, idx) => (
                                <div key={idx} className="flex items-center justify-between p-2 bg-green-50 rounded">
                                    <div className="flex items-center space-x-2">
                                        <i className="fas fa-check-circle text-green-600"></i>
                                        <span className="text-sm font-semibold">{step.step}. {step.name}</span>
                                    </div>
                                    <span className="text-xs text-gray-600">{step.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 완료 */}
                    <div className="bg-green-50 border-4 border-green-500 rounded-lg p-6 text-center">
                        <i className="fas fa-check-circle text-6xl text-green-600 mb-3"></i>
                        <h5 className="text-2xl font-bold text-green-700 mb-2">
                            연계 완료: {linkageResult.totalTime}초
                        </h5>
                        <p className="text-sm text-gray-700">기존 15개월(450일) 대비 {linkageResult.improvement} 단축</p>
                        <div className="grid grid-cols-3 gap-3 mt-4">
                            <div className="bg-white rounded p-2">
                                <div className="text-xs text-gray-600">전송 건수</div>
                                <div className="font-bold">{linkageResult.dataTransferred}</div>
                            </div>
                            <div className="bg-white rounded p-2">
                                <div className="text-xs text-gray-600">익명화</div>
                                <div className="font-bold">{linkageResult.kAnonymity}</div>
                            </div>
                            <div className="bg-white rounded p-2">
                                <div className="text-xs text-gray-600">비용 절감</div>
                                <div className="font-bold text-green-600">{linkageResult.costSaved}</div>
                            </div>
                        </div>
                    </div>

                    {/* 비용 절감 */}
                    <div className="bg-purple-50 border-2 border-purple-500 rounded-lg p-4">
                        <h5 className="font-bold text-sm text-purple-700 mb-3">연간 비용 절감</h5>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <div className="text-xs text-gray-600 mb-1">기존 방식</div>
                                <div className="text-3xl font-bold text-red-600">450억원</div>
                                <div className="text-xs text-gray-500 mt-1">부처 간 개별 협약</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xs text-gray-600 mb-1">국가데이터처 방식</div>
                                <div className="text-3xl font-bold text-green-600">0원</div>
                                <div className="text-xs text-gray-500 mt-1">Open API 자동화</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 핵심 개념 */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                <h4 className="text-base font-bold text-green-700 mb-3">
                    <i className="fas fa-lightbulb mr-2"></i>
                    부처 간 연계의 핵심 장점
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>✅ <span className="font-bold">비용 절감</span>: 연간 450억 원 → 0원 (100% 절감)</li>
                    <li>✅ <span className="font-bold">속도</span>: 15개월 → 15초 (99.9997% 단축)</li>
                    <li>✅ <span className="font-bold">자동화</span>: 개별 협약 없이 API 자동 연계</li>
                    <li>✅ <span className="font-bold">프라이버시</span>: k-익명성(k=5) 자동 적용</li>
                    <li>✅ <span className="font-bold">감사</span>: 모든 연계 내역 Layer 0 기록</li>
                </ul>
            </div>
        </div>
    );
}
