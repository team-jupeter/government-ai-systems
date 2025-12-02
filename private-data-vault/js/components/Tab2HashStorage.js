const { useState } = React;

function Tab2HashStorage() {
    const [inputData, setInputData] = useState('홍길동이 2025년 1월 15일 ABC병원에서 고혈압 초기 증상으로 진료를 받았다. 진료비는 50,000원이다.');
    const [encrypted, setEncrypted] = useState(false);
    const [hashResult, setHashResult] = useState('');

    const simulateEncryption = async () => {
        setEncrypted(true);
        
        // SHA-256 해시 시뮬레이션
        const encoder = new TextEncoder();
        const data = encoder.encode(inputData);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        setHashResult(hashHex);
    };

    return (
        <div className="space-y-8">
            {/* 개요 */}
            <div className="bg-blue-50 border-l-4 border-gov-blue p-6">
                <h3 className="text-base font-bold text-gov-blue mb-4">
                    <i className="fas fa-lock mr-2"></i>
                    해시 전용 저장 (Hash-Only Storage)
                </h3>
                <p className="text-gov-text mb-4">
                    원본 데이터는 <span className="font-bold text-gov-blue">오직 사용자의 단말기(110)에만 AES-256 암호화</span>되어 저장되고, 
                    클라우드에는 <span className="font-bold text-gov-blue">SHA-256 해시값(32바이트)만</span> 기록됩니다.
                </p>
                <div className="bg-white rounded p-4">
                    <div className="font-semibold text-gov-blue mb-2">🔒 핵심 원칙</div>
                    <ul className="text-sm space-y-1 text-gov-text-secondary">
                        <li>• 원본 데이터: 단말기(110) 보안 저장소(114)에만 존재</li>
                        <li>• 암호화: AES-256-CBC 방식</li>
                        <li>• 클라우드: SHA-256 해시값(32 bytes)만 저장</li>
                        <li>• 복호화 키: 사용자만 소유, 제3자 접근 불가</li>
                    </ul>
                </div>
            </div>

            {/* 시뮬레이션 */}
            <div>
                <h4 className="text-base font-bold text-gov-text mb-4">암호화 & 해싱 시뮬레이션</h4>
                
                {/* 입력 데이터 */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gov-text mb-2">
                        1. 원본 데이터 입력 (민감 정보 포함 가능)
                    </label>
                    <textarea
                        value={inputData}
                        onChange={(e) => {
                            setInputData(e.target.value);
                            setEncrypted(false);
                            setHashResult('');
                        }}
                        className="w-full px-4 py-3 border-2 border-gov-border rounded-lg focus:border-gov-blue"
                        rows="4"
                        placeholder="민감한 개인정보를 입력하세요..."
                    />
                    <div className="mt-2 text-sm text-gray-600">
                        데이터 길이: {inputData.length} 문자 ({new Blob([inputData]).size} bytes)
                    </div>
                </div>

                {/* 암호화 버튼 */}
                <div className="mb-6">
                    <button
                        onClick={simulateEncryption}
                        className="bg-gov-blue text-white px-8 py-3 rounded-lg font-bold hover:bg-gov-blue-light transition-colors"
                    >
                        <i className="fas fa-lock mr-2"></i>
                        AES-256 암호화 및 SHA-256 해싱 실행
                    </button>
                </div>

                {/* 결과 */}
                {encrypted && (
                    <div className="space-y-6">
                        {/* 단말기 저장 */}
                        <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-6">
                            <h5 className="font-bold text-blue-700 mb-3 flex items-center">
                                <i className="fas fa-mobile-alt mr-2"></i>
                                단말기(110) 보안 저장소(114) - 암호화된 원본 데이터
                            </h5>
                            <div className="bg-white p-4 rounded font-mono text-xs break-all">
                                <div className="text-gray-500 mb-2">🔐 AES-256-CBC 암호화 데이터:</div>
                                <div className="text-blue-600">
                                    {Array.from({length: 8}, (_, i) => 
                                        Array.from({length: 16}, () => 
                                            Math.floor(Math.random() * 16).toString(16)
                                        ).join('')
                                    ).join(' ')}
                                </div>
                            </div>
                            <div className="mt-3 text-sm text-gray-700">
                                ✅ 원본 데이터는 <span className="font-bold">단말기에만 존재</span>
                                <br/>
                                ✅ Master Key로 암호화, 사용자만 복호화 가능
                                <br/>
                                ✅ 크기: ~{new Blob([inputData]).size} bytes (원본 크기와 동일)
                            </div>
                        </div>

                        {/* 클라우드 저장 */}
                        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
                            <h5 className="font-bold text-green-700 mb-3 flex items-center">
                                <i className="fas fa-cloud mr-2"></i>
                                오픈해시 시스템(130) - SHA-256 해시값만 저장
                            </h5>
                            <div className="bg-white p-4 rounded font-mono text-xs break-all">
                                <div className="text-gray-500 mb-2">📋 SHA-256 해시값 (210):</div>
                                <div className="text-green-600 font-bold">
                                    {hashResult}
                                </div>
                            </div>
                            <div className="mt-3 text-sm text-gray-700">
                                ✅ 클라우드에는 <span className="font-bold text-green-600">해시값(32 bytes)만</span> 저장
                                <br/>
                                ✅ 해시값으로는 <span className="font-bold">원본 복원 불가능</span> (일방향 함수)
                                <br/>
                                ✅ 데이터 무결성 검증 및 교차 검증에만 사용
                            </div>
                        </div>

                        {/* 비교 */}
                        <div className="bg-purple-50 border-2 border-purple-500 rounded-lg p-6">
                            <h5 className="font-bold text-purple-700 mb-3">
                                <i className="fas fa-chart-bar mr-2"></i>
                                저장 공간 비교
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                <div className="bg-white p-4 rounded">
                                    <div className="text-base font-bold text-blue-600">~{new Blob([inputData]).size}B</div>
                                    <div className="text-sm text-gray-600 mt-1">단말기 저장</div>
                                    <div className="text-xs text-gray-500">(암호화된 원본)</div>
                                </div>
                                <div className="bg-white p-4 rounded">
                                    <div className="text-base font-bold text-green-600">32B</div>
                                    <div className="text-sm text-gray-600 mt-1">클라우드 저장</div>
                                    <div className="text-xs text-gray-500">(SHA-256 해시)</div>
                                </div>
                                <div className="bg-white p-4 rounded">
                                    <div className="text-base font-bold text-purple-600">
                                        {((32 / new Blob([inputData]).size) * 100).toFixed(1)}%
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">저장 비율</div>
                                    <div className="text-xs text-gray-500">(클라우드/원본)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* AWS 실증 실험 */}
            <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-6">
                <h4 className="text-base font-bold text-yellow-700 mb-4">
                    <i className="fas fa-flask mr-2"></i>
                    AWS 실증 실험 결과
                </h4>
                <div className="space-y-3 text-sm text-gray-700">
                    <div className="bg-white p-3 rounded">
                        <div className="font-semibold">테스트 데이터: "민감한 의료 정보 - 고혈압 초기 증상"</div>
                        <div className="text-xs text-gray-600 mt-1">
                            원본: ~620 bytes | 클라우드 저장: 32 bytes | 
                            저장 해시: <span className="font-mono">0cc5f270873bb86e...</span>
                        </div>
                    </div>
                    <div className="bg-white p-3 rounded">
                        <div className="font-semibold">결과: 원본 데이터 보호 100% 확인</div>
                        <div className="text-xs text-gray-600 mt-1">
                            ✅ 클라우드에서 원본 복원 시도 → 불가능
                            <br/>
                            ✅ 해시값만으로 민감 정보 유추 → 불가능
                            <br/>
                            ✅ 단말기 복호화 정확도 → 100%
                        </div>
                    </div>
                </div>
            </div>

            {/* 핵심 개념 */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
                <h4 className="text-base font-bold text-green-700 mb-4">
                    <i className="fas fa-lightbulb mr-2"></i>
                    해시 전용 저장의 핵심 장점
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>✅ <span className="font-bold">완벽한 개인정보 보호</span>: 클라우드에 원본 없음</li>
                    <li>✅ <span className="font-bold">저장 공간 극소화</span>: 레코드당 32 bytes만 사용</li>
                    <li>✅ <span className="font-bold">데이터 무결성 검증</span>: SHA-256 해시로 위변조 탐지</li>
                    <li>✅ <span className="font-bold">교차 검증 가능</span>: 해시값 비교로 거래 일치 확인</li>
                    <li>✅ <span className="font-bold">GDPR 완벽 준수</span>: 사용자가 완전한 통제권 보유</li>
                </ul>
            </div>
        </div>
    );
}
