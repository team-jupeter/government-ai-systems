const { useState } = React;

function Tab7AuthorityNotification() {
    const [transaction, setTransaction] = useState({
        type: 'income',
        amount: 5000000,
        industry: 'consulting',
        date: '2025-01-15'
    });
    const [notificationResult, setNotificationResult] = useState(null);

    const transactionTypes = [
        { id: 'income', name: '소득', authority: '국세청', law: '소득세법' },
        { id: 'vat', name: '부가세', authority: '국세청', law: '부가가치세법' },
        { id: 'financial', name: '금융거래', authority: '금융감독원', law: '전자금융거래법' },
        { id: 'medical', name: '의료', authority: '보건복지부', law: '의료법' },
        { id: 'realEstate', name: '부동산', authority: '국토교통부', law: '부동산거래신고법' }
    ];

    const analyzeAndNotify = () => {
        const type = transactionTypes.find(t => t.id === transaction.type);
        
        const result = {
            law: type.law,
            authority: type.authority,
            hashValue: Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
            summaryInfo: {
                type: type.name,
                amountRange: transaction.amount >= 5000000 ? '500만원 이상' : '500만원 미만',
                industry: transaction.industry,
                timestamp: transaction.date,
                anonymizedId: 'USER-' + Math.random().toString(36).substring(7)
            },
            encrypted: true,
            originalProtected: true
        };

        setNotificationResult(result);
    };

    return (
        <div className="space-y-8">
            {/* 개요 */}
            <div className="bg-blue-50 border-l-4 border-gov-blue p-6">
                <h3 className="text-base font-bold text-gov-blue mb-4">
                    <i className="fas fa-landmark mr-2"></i>
                    당국 통보 시스템
                </h3>
                <p className="text-gov-text mb-4">
                    거래의 메타데이터를 분석하여 관련 법규를 확인하고, 
                    <span className="font-bold text-gov-blue"> 원본 데이터가 아닌 해시값과 요약 정보만</span>을 
                    해당 당국의 서버로 암호화하여 전송합니다.
                </p>
                <div className="bg-white rounded p-4">
                    <div className="font-semibold text-gov-blue mb-2">🏛️ 당국 통보 모듈 (141)</div>
                    <div className="text-sm space-y-1 text-gov-text-secondary">
                        <div>1. 법규 분석부: 거래 유형, 금액, 업종 분석</div>
                        <div>2. 당국 식별부: 국세청, 금융감독원, 보건복지부 등 결정</div>
                        <div>3. 정보 전송부: 해시값 + 최소 정보만 RSA-4096 암호화</div>
                        <div>4. 전송 프로토콜: HTTPS + TLS 1.3</div>
                    </div>
                </div>
            </div>

            {/* 거래 정보 입력 */}
            <div>
                <h4 className="text-base font-bold text-gov-text mb-4">거래 정보 입력</h4>
                <div className="bg-white border-2 border-gov-border rounded-lg p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gov-text mb-2">
                                거래 유형
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                {transactionTypes.map(type => (
                                    <button
                                        key={type.id}
                                        onClick={() => setTransaction({...transaction, type: type.id})}
                                        className={`p-3 rounded-lg border-2 transition-all ${
                                            transaction.type === type.id
                                                ? 'border-gov-blue bg-blue-50 text-gov-blue'
                                                : 'border-gov-border bg-white hover:border-gov-blue-light'
                                        }`}
                                    >
                                        <div className="font-medium text-sm">{type.name}</div>
                                        <div className="text-xs text-gray-500 mt-1">{type.authority}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gov-text mb-2">
                                거래 금액 (원)
                            </label>
                            <input
                                type="number"
                                value={transaction.amount}
                                onChange={(e) => setTransaction({...transaction, amount: parseInt(e.target.value)})}
                                className="w-full px-4 py-2 border-2 border-gov-border rounded focus:border-gov-blue"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gov-text mb-2">
                                업종 코드
                            </label>
                            <input
                                type="text"
                                value={transaction.industry}
                                onChange={(e) => setTransaction({...transaction, industry: e.target.value})}
                                className="w-full px-4 py-2 border-2 border-gov-border rounded focus:border-gov-blue"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gov-text mb-2">
                                거래 일자
                            </label>
                            <input
                                type="date"
                                value={transaction.date}
                                onChange={(e) => setTransaction({...transaction, date: e.target.value})}
                                className="w-full px-4 py-2 border-2 border-gov-border rounded focus:border-gov-blue"
                            />
                        </div>
                    </div>

                    <button
                        onClick={analyzeAndNotify}
                        className="w-full mt-6 bg-gov-blue text-white py-3 rounded-lg font-bold hover:bg-gov-blue-light"
                    >
                        <i className="fas fa-paper-plane mr-2"></i>
                        법규 분석 및 당국 통보
                    </button>
                </div>
            </div>

            {/* 통보 결과 */}
            {notificationResult && (
                <div className="space-y-6">
                    {/* 법규 분석 */}
                    <div className="bg-purple-50 border-2 border-purple-500 rounded-lg p-6">
                        <h5 className="font-bold text-purple-700 mb-4">
                            <i className="fas fa-balance-scale mr-2"></i>
                            법규 분석 결과
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded">
                                <div className="text-sm text-gray-600">적용 법규</div>
                                <div className="text-base font-bold text-purple-700">{notificationResult.law}</div>
                            </div>
                            <div className="bg-white p-4 rounded">
                                <div className="text-sm text-gray-600">관할 당국</div>
                                <div className="text-base font-bold text-purple-700">{notificationResult.authority}</div>
                            </div>
                        </div>
                    </div>

                    {/* 전송 정보 패킷 */}
                    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
                        <h5 className="font-bold text-green-700 mb-4">
                            <i className="fas fa-file-code mr-2"></i>
                            전송 정보 패킷 (최소 정보만 포함)
                        </h5>
                        <div className="space-y-3">
                            <div className="bg-white p-3 rounded">
                                <div className="text-xs text-gray-600">거래 해시값 (210)</div>
                                <div className="font-mono text-xs break-all text-green-600">
                                    {notificationResult.hashValue}
                                </div>
                            </div>
                            <div className="bg-white p-3 rounded">
                                <div className="text-xs text-gray-600 mb-2">요약 정보</div>
                                <div className="text-sm space-y-1">
                                    <div>• 거래 유형: {notificationResult.summaryInfo.type}</div>
                                    <div>• 금액 범위: {notificationResult.summaryInfo.amountRange}</div>
                                    <div>• 업종: {notificationResult.summaryInfo.industry}</div>
                                    <div>• 타임스탬프: {notificationResult.summaryInfo.timestamp}</div>
                                    <div>• 익명화 ID: {notificationResult.summaryInfo.anonymizedId}</div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 bg-blue-50 p-3 rounded">
                            <div className="text-xs font-semibold text-blue-700">
                                <i className="fas fa-shield-alt mr-2"></i>
                                프라이버시 보호
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                                ✓ 원본 데이터 미전송 (해시값만)<br/>
                                ✓ 개인정보 익명화<br/>
                                ✓ RSA-4096 암호화<br/>
                                ✓ HTTPS + TLS 1.3 전송
                            </div>
                        </div>
                    </div>

                    {/* 전송 완료 */}
                    <div className="bg-green-50 border-4 border-green-500 rounded-lg p-6 text-center">
                        <i className="fas fa-check-circle text-6xl text-green-600 mb-4"></i>
                        <div className="text-base font-bold text-green-700 mb-2">
                            당국 통보 완료
                        </div>
                        <div className="text-sm text-gray-700">
                            {notificationResult.authority}에 안전하게 전송되었습니다
                        </div>
                        <div className="mt-4 text-xs text-gray-600">
                            전송 시각: {new Date().toLocaleString('ko-KR')}<br/>
                            프로토콜: HTTPS + TLS 1.3<br/>
                            암호화: RSA-4096
                        </div>
                    </div>
                </div>
            )}

            {/* AWS 실증 실험 */}
            <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-6">
                <h4 className="text-base font-bold text-yellow-700 mb-4">
                    <i className="fas fa-flask mr-2"></i>
                    AWS 실증 실험 결과
                </h4>
                <div className="bg-white p-4 rounded text-sm text-gray-700">
                    <div className="font-semibold mb-2">민감 의료 정보 처리 테스트</div>
                    <div className="space-y-2">
                        <div>• 원본: "고혈압 초기 증상으로 진료"</div>
                        <div>• 클라우드 저장: <span className="font-mono text-xs">0cc5f270873bb86e...</span></div>
                        <div>• 보건복지부 통보: 해시값 + 거래유형(의료) + 금액범위</div>
                        <div className="mt-3 pt-3 border-t-2">
                            <span className="font-bold text-green-600">✓ 원본 데이터 보호 100% 확인</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 핵심 개념 */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
                <h4 className="text-base font-bold text-green-700 mb-4">
                    <i className="fas fa-lightbulb mr-2"></i>
                    당국 통보의 핵심 장점
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>✅ <span className="font-bold">프라이버시 보호</span>: 원본 데이터 미전송</li>
                    <li>✅ <span className="font-bold">자동 통보</span>: 법규에 따라 자동 전송</li>
                    <li>✅ <span className="font-bold">투명성 확보</span>: 탈세/범죄 방지</li>
                    <li>✅ <span className="font-bold">최소 정보</span>: 필요한 정보만 전송</li>
                    <li>✅ <span className="font-bold">암호화 전송</span>: RSA-4096 + TLS 1.3</li>
                </ul>
            </div>
        </div>
    );
}
