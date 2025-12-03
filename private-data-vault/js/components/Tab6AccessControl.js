const { useState } = React;

function Tab6AccessControl() {
    const [masterKeyGenerated, setMasterKeyGenerated] = useState(false);
    const [sharesGenerated, setSharesGenerated] = useState(false);
    const [accessGranted, setAccessGranted] = useState(false);
    const [accessRequest, setAccessRequest] = useState({
        requester: '제3자 (은행)',
        purpose: '대출 심사',
        scope: '2024년 소득 정보만',
        duration: '7일',
        approved: false
    });

    const generateMasterKey = () => {
        setMasterKeyGenerated(true);
    };

    const generateShares = () => {
        setSharesGenerated(true);
    };

    const grantAccess = () => {
        setAccessRequest({...accessRequest, approved: true});
        setAccessGranted(true);
    };

    return (
        <div className="space-y-8">
            {/* 개요 */}
            <div className="bg-blue-50 border-l-4 border-gov-blue p-6">
                <h3 className="text-base font-bold text-gov-blue mb-4">
                    <i className="fas fa-key mr-2"></i>
                    접근 제어 & 키 관리 (도면 7)
                </h3>
                <p className="text-gov-text mb-4">
                    PDV 소유자의 <span className="font-bold text-gov-blue">명시적 권한 부여 없이는</span> 원본 데이터의 복호화 키에 접근할 수 없으며, 
                    권한 부여 시에도 <span className="font-bold text-gov-blue">시간 제한적, 범위 제한적 접근</span>만 허용합니다.
                </p>
                <div className="bg-white rounded p-4">
                    <div className="font-semibold text-gov-blue mb-2">📋 도면 7: 접근 제어 구조</div>
                    <div className="text-sm space-y-1 text-gov-text-secondary">
                        <div>1. 키 관리부(115): Master Key 생성 및 보호</div>
                        <div>2. PBKDF2HMAC (SHA-256, 100,000 iterations) 사용</div>
                        <div>3. Secure Enclave / Android Keystore 저장</div>
                        <div>4. 재해 복구부(116): Shamir 비밀 분산 (N개 조각, M개로 복구)</div>
                        <div>5. 접근 제어 모듈: 시간/범위 제한적 임시 키 발급</div>
                    </div>
                </div>
            </div>

            {/* Master Key 생성 */}
            <div>
                <h4 className="text-base font-bold text-gov-text mb-4">1. Master Key 생성</h4>
                <div className="bg-white border-2 border-gov-border rounded-lg p-6">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <i className="fas fa-fingerprint text-4xl text-gov-blue"></i>
                            <div className="flex-1">
                                <div className="font-semibold text-gov-text">생체인증 또는 비밀번호 입력</div>
                                <div className="text-sm text-gray-600">지문, 얼굴인식, 홍채 또는 강력한 비밀번호</div>
                            </div>
                        </div>

                        {!masterKeyGenerated ? (
                            <button
                                onClick={generateMasterKey}
                                className="w-full bg-gov-blue text-white py-3 rounded-lg font-bold hover:bg-gov-blue-light"
                            >
                                <i className="fas fa-key mr-2"></i>
                                PBKDF2HMAC로 Master Key 생성
                            </button>
                        ) : (
                            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                                <div className="font-semibold text-green-700 mb-2">
                                    ✓ Master Key 생성 완료
                                </div>
                                <div className="space-y-2 text-sm text-gray-700">
                                    <div>• 알고리즘: PBKDF2HMAC</div>
                                    <div>• 해시 함수: SHA-256</div>
                                    <div>• 반복 횟수: 100,000 iterations</div>
                                    <div>• 키 길이: 256 bits</div>
                                    <div className="mt-3 pt-3 border-t-2">
                                        <div className="font-mono text-xs break-all bg-white p-2 rounded">
                                            {Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 bg-blue-50 p-3 rounded">
                                    <div className="text-xs font-semibold text-blue-700">
                                        <i className="fas fa-shield-alt mr-1"></i>
                                        보안 저장소에 저장됨
                                    </div>
                                    <div className="text-xs text-gray-600 mt-1">
                                        iOS: Secure Enclave | Android: Keystore
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Shamir 비밀 분산 */}
            <div>
                <h4 className="text-base font-bold text-gov-text mb-4">2. Shamir 비밀 분산 (재해 복구)</h4>
                <div className="bg-white border-2 border-gov-border rounded-lg p-6">
                    <div className="mb-4">
                        <p className="text-sm text-gray-600">
                            Master Key를 N개 조각으로 분할, M개 이상 결합 시에만 복구 가능 (M &lt; N)
                        </p>
                        <div className="mt-2 text-sm">
                            <span className="font-semibold">설정:</span> N=5 (총 5개 조각), M=3 (3개로 복구 가능)
                        </div>
                    </div>

                    {!sharesGenerated ? (
                        <button
                            onClick={generateShares}
                            disabled={!masterKeyGenerated}
                            className={`w-full py-3 rounded-lg font-bold ${
                                masterKeyGenerated
                                    ? 'bg-gov-blue text-white hover:bg-gov-blue-light'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            <i className="fas fa-puzzle-piece mr-2"></i>
                            Shamir 비밀 분산 실행
                        </button>
                    ) : (
                        <div className="space-y-3">
                            {[
                                { id: 1, location: '단말기 (110)', icon: 'fa-mobile-alt', color: 'blue' },
                                { id: 2, location: '클라우드 백업', icon: 'fa-cloud', color: 'green' },
                                { id: 3, location: '외부 USB', icon: 'fa-usb', color: 'purple' },
                                { id: 4, location: '신뢰 가족', icon: 'fa-users', color: 'orange' },
                                { id: 5, location: '은행 금고', icon: 'fa-vault', color: 'red' }
                            ].map(share => (
                                <div key={share.id} className={`bg-${share.color}-50 border-2 border-${share.color}-500 rounded-lg p-4`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <i className={`fas ${share.icon} text-xl text-${share.color}-600`}></i>
                                            <div>
                                                <div className="font-semibold text-gray-700">조각 {share.id}</div>
                                                <div className="text-sm text-gray-600">{share.location}</div>
                                            </div>
                                        </div>
                                        <div className="text-xs font-mono bg-white px-2 py-1 rounded">
                                            Share-{share.id}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 mt-4">
                                <div className="text-sm text-green-700">
                                    <i className="fas fa-check-circle mr-2"></i>
                                    <span className="font-semibold">재해 복구 설정 완료</span>
                                </div>
                                <div className="text-xs text-gray-600 mt-2">
                                    • 단말기 분실/고장 시 3개 조각으로 Master Key 복구 가능<br/>
                                    • 2개 이하 조각만으로는 복구 불가능 (보안 유지)
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 제3자 접근 요청 */}
            <div>
                <h4 className="text-base font-bold text-gov-text mb-4">3. 제3자 접근 제어</h4>
                <div className="bg-white border-2 border-gov-border rounded-lg p-6">
                    <div className="mb-4">
                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                            <div className="font-semibold text-yellow-700">
                                <i className="fas fa-bell mr-2"></i>
                                새로운 접근 요청
                            </div>
                            <div className="text-sm text-gray-700 mt-2">
                                제3자가 귀하의 PDV 데이터에 접근을 요청했습니다.
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between py-2 border-b">
                                <span className="text-sm text-gray-600">요청자</span>
                                <span className="font-semibold">{accessRequest.requester}</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b">
                                <span className="text-sm text-gray-600">목적</span>
                                <span className="font-semibold">{accessRequest.purpose}</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b">
                                <span className="text-sm text-gray-600">접근 범위</span>
                                <span className="font-semibold">{accessRequest.scope}</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b">
                                <span className="text-sm text-gray-600">유효 기간</span>
                                <span className="font-semibold">{accessRequest.duration}</span>
                            </div>
                        </div>

                        {!accessGranted ? (
                            <div className="grid grid-cols-2 gap-3 mt-6">
                                <button className="bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600">
                                    <i className="fas fa-times mr-2"></i>
                                    거부
                                </button>
                                <button
                                    onClick={grantAccess}
                                    className="bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700"
                                >
                                    <i className="fas fa-check mr-2"></i>
                                    승인
                                </button>
                            </div>
                        ) : (
                            <div className="mt-6 bg-green-50 border-2 border-green-500 rounded-lg p-4">
                                <div className="font-semibold text-green-700 mb-2">
                                    <i className="fas fa-check-circle mr-2"></i>
                                    접근 권한 부여됨
                                </div>
                                <div className="space-y-2 text-sm text-gray-700">
                                    <div className="bg-white p-3 rounded">
                                        <div className="font-semibold mb-1">임시 복호화 키 발급</div>
                                        <div className="font-mono text-xs break-all bg-gray-50 p-2 rounded">
                                            temp_key_{Array(32).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-600">
                                        • 범위: {accessRequest.scope}만 복호화 가능<br/>
                                        • 유효기간: {accessRequest.duration}<br/>
                                        • 자동 폐기: 기간 만료 또는 즉시 취소 가능<br/>
                                        • 접근 로그: 모든 활동 기록됨
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 접근 로그 */}
            <div>
                <h4 className="text-base font-bold text-gov-text mb-4">4. 접근 감사 로그</h4>
                <div className="bg-white border-2 border-gov-border rounded-lg p-6">
                    <div className="text-sm text-gray-600 mb-3">
                        모든 데이터 접근 내역이 자동으로 기록됩니다
                    </div>
                    <div className="space-y-2">
                        {[
                            { time: '2025-01-15 14:23:45', who: '본인', action: '2024년 소득 데이터 조회', status: 'success' },
                            { time: '2025-01-14 09:15:22', who: '은행 (임시키)', action: '2024년 소득 데이터 조회', status: 'success' },
                            { time: '2025-01-13 16:45:11', who: '알 수 없음', action: '전체 데이터 접근 시도', status: 'blocked' }
                        ].map((log, idx) => (
                            <div key={idx} className={`p-3 rounded-lg ${
                                log.status === 'success' ? 'bg-green-50' : 'bg-red-50'
                            }`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-500">{log.time}</div>
                                        <div className="font-semibold text-sm">{log.who}</div>
                                        <div className="text-xs text-gray-600">{log.action}</div>
                                    </div>
                                    <div>
                                        {log.status === 'success' ? (
                                            <span className="text-green-600 text-xs">
                                                <i className="fas fa-check-circle"></i> 성공
                                            </span>
                                        ) : (
                                            <span className="text-red-600 text-xs">
                                                <i className="fas fa-ban"></i> 차단됨
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* AWS 실증 실험 */}
            <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-6">
                <h4 className="text-base font-bold text-yellow-700 mb-4">
                    <i className="fas fa-flask mr-2"></i>
                    AWS 실증 실험 결과
                </h4>
                <div className="bg-white p-4 rounded text-sm text-gray-700">
                    <div className="font-semibold mb-2">암호화/복호화 테스트 (약 620 bytes 레코드)</div>
                    <div className="space-y-1">
                        <div>• AES-256 암호화: <span className="font-bold text-green-600">성공</span></div>
                        <div>• 데이터 손실: <span className="font-bold text-green-600">0%</span></div>
                        <div>• 복호화 정확도: <span className="font-bold text-green-600">100%</span></div>
                        <div>• Master Key 보안: <span className="font-bold text-green-600">Secure Enclave 저장</span></div>
                        <div>• Shamir 복구: <span className="font-bold text-green-600">3/5 조각으로 정상 복구</span></div>
                    </div>
                </div>
            </div>

            {/* 핵심 개념 */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
                <h4 className="text-base font-bold text-green-700 mb-4">
                    <i className="fas fa-lightbulb mr-2"></i>
                    접근 제어의 핵심 장점
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>✅ <span className="font-bold">완전한 통제권</span>: 사용자만 Master Key 소유</li>
                    <li>✅ <span className="font-bold">재해 복구</span>: Shamir 분산으로 단말기 분실 대비</li>
                    <li>✅ <span className="font-bold">세밀한 권한</span>: 시간/범위 제한적 접근만 허용</li>
                    <li>✅ <span className="font-bold">완전한 감사</span>: 모든 접근 내역 자동 기록</li>
                    <li>✅ <span className="font-bold">즉시 취소</span>: 부여한 권한 언제든 회수 가능</li>
                </ul>
            </div>
        </div>
    );
}
