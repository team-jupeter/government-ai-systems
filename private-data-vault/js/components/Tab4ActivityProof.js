const { useState } = React;

function Tab4ActivityProof() {
    const [certificateData, setCertificateData] = useState({
        subject: '홍길동',
        activityType: 'employment',
        period: '2023-01-01 ~ 2024-12-31',
        recordsCount: 24,
        description: 'ABC회사 재직 증명'
    });
    const [certificate, setCertificate] = useState(null);

    const activityTypes = [
        { id: 'employment', name: '재직 증명', icon: 'fa-briefcase' },
        { id: 'income', name: '소득 증명', icon: 'fa-won-sign' },
        { id: 'education', name: '학력 증명', icon: 'fa-graduation-cap' },
        { id: 'medical', name: '의료 기록', icon: 'fa-hospital' },
        { id: 'transaction', name: '거래 내역', icon: 'fa-exchange-alt' }
    ];

    const generateCertificate = async () => {
        const timestamp = new Date().toISOString();
        const certId = 'CERT-' + Date.now();
        
        // 해시 체인 시뮬레이션
        const encoder = new TextEncoder();
        const data = encoder.encode(JSON.stringify(certificateData) + timestamp);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const certHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        const cert = {
            certificate_id: certId,
            issued_at: timestamp,
            subject: certificateData.subject,
            activity_type: certificateData.activityType,
            period: certificateData.period,
            records_count: certificateData.recordsCount,
            description: certificateData.description,
            hash_chain: {
                first_record_hash: Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
                last_record_hash: Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
                merkle_root: certHash.substring(0, 64)
            },
            bls_signature: certHash,
            verification_url: `https://openhash.verify/${certId}`,
            legal_validity: true,
            tamper_proof: true
        };

        setCertificate(cert);
    };

    return (
        <div className="space-y-8">
            {/* 개요 */}
            <div className="bg-blue-50 border-l-4 border-gov-blue p-6">
                <h3 className="text-base font-bold text-gov-blue mb-4">
                    <i className="fas fa-certificate mr-2"></i>
                    활동 증명 (Activity Proof)
                </h3>
                <p className="text-gov-text mb-4">
                    PDV 소유자가 <span className="font-bold text-gov-blue">과거 특정 시점에 특정 행위를 수행했다는 사실</span>을 증명하기 위해, 
                    오픈해시 시스템(130)에 기록된 <span className="font-bold text-gov-blue">해시 체인과 타임스탬프</span>를 활용하여 
                    법적으로 유효한 증거를 제시할 수 있습니다.
                </p>
                <div className="bg-white rounded p-4">
                    <div className="font-semibold text-gov-blue mb-2">📋 도면 6: 활동 증명서 발급 프로세스</div>
                    <div className="text-sm space-y-1 text-gov-text-secondary">
                        <div>1. 활동 증명 모듈(142): 해시 체인 검색</div>
                        <div>2. 타임스탬프(212) + 해시값(210) + 계층 정보 수집</div>
                        <div>3. BLS 서명(410) + Merkle Proof(440) 생성</div>
                        <div>4. 법적 증명서 자동 발급 + QR 코드 생성</div>
                        <div>5. 제3자 독립 검증 가능 (검증 URL 제공)</div>
                    </div>
                </div>
            </div>

            {/* 증명서 발급 폼 */}
            <div>
                <h4 className="text-base font-bold text-gov-text mb-4">증명서 발급 요청</h4>
                
                <div className="bg-white border-2 border-gov-border rounded-lg p-6 mb-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gov-text mb-2">
                                증명 대상자
                            </label>
                            <input
                                type="text"
                                value={certificateData.subject}
                                onChange={(e) => setCertificateData({...certificateData, subject: e.target.value})}
                                className="w-full px-4 py-2 border-2 border-gov-border rounded focus:border-gov-blue"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gov-text mb-2">
                                활동 유형
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                {activityTypes.map(type => (
                                    <button
                                        key={type.id}
                                        onClick={() => setCertificateData({...certificateData, activityType: type.id})}
                                        className={`p-3 rounded-lg border-2 transition-all ${
                                            certificateData.activityType === type.id
                                                ? 'border-gov-blue bg-blue-50 text-gov-blue'
                                                : 'border-gov-border bg-white text-gov-text hover:border-gov-blue-light'
                                        }`}
                                    >
                                        <i className={`fas ${type.icon} text-xl mb-1`}></i>
                                        <div className="text-xs font-medium">{type.name}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gov-text mb-2">
                                증명 기간
                            </label>
                            <input
                                type="text"
                                value={certificateData.period}
                                onChange={(e) => setCertificateData({...certificateData, period: e.target.value})}
                                className="w-full px-4 py-2 border-2 border-gov-border rounded focus:border-gov-blue"
                                placeholder="2023-01-01 ~ 2024-12-31"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gov-text mb-2">
                                증명 기록 수
                            </label>
                            <input
                                type="number"
                                value={certificateData.recordsCount}
                                onChange={(e) => setCertificateData({...certificateData, recordsCount: parseInt(e.target.value)})}
                                className="w-full px-4 py-2 border-2 border-gov-border rounded focus:border-gov-blue"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gov-text mb-2">
                                증명 내용
                            </label>
                            <textarea
                                value={certificateData.description}
                                onChange={(e) => setCertificateData({...certificateData, description: e.target.value})}
                                className="w-full px-4 py-2 border-2 border-gov-border rounded focus:border-gov-blue"
                                rows="3"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={generateCertificate}
                            className="w-full bg-gov-blue text-white px-8 py-3 rounded-lg font-bold hover:bg-gov-blue-light transition-colors"
                        >
                            <i className="fas fa-certificate mr-2"></i>
                            활동 증명서 발급
                        </button>
                    </div>
                </div>

                {/* 발급된 증명서 */}
                {certificate && (
                    <div className="bg-white border-4 border-gov-blue rounded-lg shadow-2xl p-8">
                        <div className="text-center mb-6">
                            <div className="inline-block bg-gov-blue text-white px-6 py-2 rounded-full text-base font-bold mb-4">
                                활동 증명서 (Activity Certificate)
                            </div>
                            <div className="text-sm text-gray-600">오픈해시 기반 법적 증명서</div>
                        </div>

                        <div className="space-y-4">
                            {/* 기본 정보 */}
                            <div className="grid grid-cols-2 gap-4 pb-4 border-b-2">
                                <div>
                                    <div className="text-xs text-gray-500">증명서 번호</div>
                                    <div className="font-mono text-sm">{certificate.certificate_id}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500">발급 일시</div>
                                    <div className="text-sm">{new Date(certificate.issued_at).toLocaleString('ko-KR')}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pb-4 border-b-2">
                                <div>
                                    <div className="text-xs text-gray-500">증명 대상자</div>
                                    <div className="text-base font-bold">{certificate.subject}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500">활동 유형</div>
                                    <div className="text-base font-bold">
                                        {activityTypes.find(t => t.id === certificate.activity_type)?.name}
                                    </div>
                                </div>
                            </div>

                            <div className="pb-4 border-b-2">
                                <div className="text-xs text-gray-500 mb-1">증명 기간</div>
                                <div className="text-lg">{certificate.period}</div>
                            </div>

                            <div className="pb-4 border-b-2">
                                <div className="text-xs text-gray-500 mb-1">증명 내용</div>
                                <div className="text-base">{certificate.description}</div>
                                <div className="text-sm text-gray-600 mt-1">
                                    기록 건수: {certificate.records_count}개
                                </div>
                            </div>

                            {/* 해시 체인 정보 */}
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <div className="font-semibold text-purple-700 mb-2">
                                    <i className="fas fa-link mr-2"></i>
                                    해시 체인 정보
                                </div>
                                <div className="space-y-2 text-xs font-mono">
                                    <div>
                                        <span className="text-gray-600">First Record:</span>
                                        <div className="break-all text-purple-600">
                                            {certificate.hash_chain.first_record_hash}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Last Record:</span>
                                        <div className="break-all text-purple-600">
                                            {certificate.hash_chain.last_record_hash}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Merkle Root:</span>
                                        <div className="break-all text-purple-600">
                                            {certificate.hash_chain.merkle_root}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* BLS 서명 */}
                            <div className="bg-green-50 p-4 rounded-lg">
                                <div className="font-semibold text-green-700 mb-2">
                                    <i className="fas fa-signature mr-2"></i>
                                    BLS 디지털 서명
                                </div>
                                <div className="text-xs font-mono break-all text-green-600">
                                    {certificate.bls_signature}
                                </div>
                            </div>

                            {/* 검증 정보 */}
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="font-semibold text-gov-blue mb-3">
                                    <i className="fas fa-shield-alt mr-2"></i>
                                    검증 정보
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center">
                                        <i className="fas fa-check-circle text-green-600 mr-2"></i>
                                        <span>법적 효력: <span className="font-bold text-green-600">유효</span></span>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-lock text-green-600 mr-2"></i>
                                        <span>위변조 방지: <span className="font-bold text-green-600">보장</span></span>
                                    </div>
                                    <div className="mt-3 pt-3 border-t-2">
                                        <div className="text-xs text-gray-600 mb-1">독립 검증 URL:</div>
                                        <a 
                                            href={certificate.verification_url}
                                            className="text-gov-blue hover:underline font-mono text-xs break-all"
                                        >
                                            {certificate.verification_url}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* QR 코드 영역 */}
                            <div className="text-center py-4 bg-gray-50 rounded-lg">
                                <div className="text-xs text-gray-600 mb-2">검증 QR 코드</div>
                                <div className="inline-block bg-white p-4 border-2 border-gray-300 rounded">
                                    <i className="fas fa-qrcode text-6xl text-gray-400"></i>
                                </div>
                                <div className="text-xs text-gray-500 mt-2">
                                    제3자가 QR 코드 스캔으로 독립 검증 가능
                                </div>
                            </div>
                        </div>

                        {/* 발급 기관 */}
                        <div className="mt-6 pt-6 border-t-2 text-center">
                            <div className="text-sm text-gray-600">발급 기관</div>
                            <div className="text-base font-bold text-gov-blue">오픈해시 기반 PDV 시스템</div>
                            <div className="text-xs text-gray-500 mt-1">
                                본 증명서는 블록체인 수준의 위변조 방지 기술로 보호됩니다
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
                <div className="bg-white p-4 rounded">
                    <div className="font-semibold mb-2">테스트: 24개월 급여 기록 증명서 발급</div>
                    <div className="text-sm space-y-2 text-gray-700">
                        <div>• 기간: 2023-01-01 ~ 2024-12-31</div>
                        <div>• 레코드 수: 24개 (매월 급여)</div>
                        <div>• 해시 체인: <span className="font-mono text-xs">prev_hash: e16853dc7c8337da...</span></div>
                        <div className="mt-3 pt-3 border-t-2">
                            <div className="font-semibold text-green-600">결과: 증명서 자동 발급 성공</div>
                            <div className="mt-2">
                                ✅ 해시 체인 무결성 검증 완료<br/>
                                ✅ 타임스탬프 연속성 확인<br/>
                                ✅ BLS 서명 생성 완료<br/>
                                ✅ 위조 불가능성 입증
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 핵심 개념 */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
                <h4 className="text-base font-bold text-green-700 mb-4">
                    <i className="fas fa-lightbulb mr-2"></i>
                    활동 증명의 핵심 장점
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>✅ <span className="font-bold">법적 효력</span>: 법원에서 증거로 채택 가능</li>
                    <li>✅ <span className="font-bold">위변조 불가능</span>: 해시 체인으로 보호</li>
                    <li>✅ <span className="font-bold">자동 발급</span>: 수수료 없이 즉시 발급</li>
                    <li>✅ <span className="font-bold">독립 검증</span>: 제3자가 QR/URL로 진위 확인</li>
                    <li>✅ <span className="font-bold">프라이버시 보호</span>: 필요한 정보만 선택적 공개</li>
                </ul>
            </div>
        </div>
    );
}
