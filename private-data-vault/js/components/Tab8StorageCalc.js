const { useState } = React;

function Tab8StorageCalc() {
    const [input, setInput] = useState({
        transactionsPerYear: 1000,
        years: 10
    });
    const [result, setResult] = useState(null);

    const calculateStorage = () => {
        const total = input.transactionsPerYear * input.years;
        const hashSize = 32; // SHA-256 = 32 bytes
        const cloudBytes = total * hashSize;
        const traditionalBytes = total * 500; // 평균 500 bytes per record

        let cloudDisplay, traditionalDisplay;
        
        if (cloudBytes < 1024) {
            cloudDisplay = `${cloudBytes} bytes`;
        } else if (cloudBytes < 1024 * 1024) {
            cloudDisplay = `${(cloudBytes / 1024).toFixed(1)} KB`;
        } else if (cloudBytes < 1024 * 1024 * 1024) {
            cloudDisplay = `${(cloudBytes / (1024 * 1024)).toFixed(2)} MB`;
        } else {
            cloudDisplay = `${(cloudBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
        }

        if (traditionalBytes < 1024 * 1024) {
            traditionalDisplay = `${(traditionalBytes / 1024).toFixed(1)} KB`;
        } else if (traditionalBytes < 1024 * 1024 * 1024) {
            traditionalDisplay = `${(traditionalBytes / (1024 * 1024)).toFixed(1)} MB`;
        } else {
            traditionalDisplay = `${(traditionalBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
        }

        const savings = ((1 - cloudBytes / traditionalBytes) * 100).toFixed(1);

        setResult({
            total,
            cloudBytes,
            cloudDisplay,
            traditionalBytes,
            traditionalDisplay,
            savings
        });
    };

    const presets = [
        { name: '1년', perYear: 1000, years: 1 },
        { name: '10년', perYear: 1000, years: 10 },
        { name: '평생 (100년)', perYear: 1000, years: 100 },
        { name: '기업 (1년)', perYear: 100000, years: 1 }
    ];

    return (
        <div className="space-y-8">
            {/* 개요 */}
            <div className="bg-blue-50 border-l-4 border-gov-blue p-6">
                <h3 className="text-base font-bold text-gov-blue mb-4">
                    <i className="fas fa-calculator mr-2"></i>
                    저장 공간 계산기
                </h3>
                <p className="text-gov-text mb-4">
                    PDV 시스템은 클라우드에 <span className="font-bold text-gov-blue">해시값(32 bytes)만</span> 저장하므로, 
                    전통적 데이터베이스 대비 <span className="font-bold text-gov-blue">93.6% 저장 공간 절감</span>을 달성합니다.
                </p>
                <div className="bg-white rounded p-4">
                    <div className="font-semibold text-gov-blue mb-2">💾 저장 공간 효율성</div>
                    <div className="text-sm text-gov-text-secondary">
                        • 레코드당 클라우드 저장: <span className="font-bold">32 bytes</span> (SHA-256 해시)<br/>
                        • 전통적 DB: 평균 500 bytes/record<br/>
                        • 절감율: <span className="font-bold">93.6%</span>
                    </div>
                </div>
            </div>

            {/* 프리셋 */}
            <div>
                <h4 className="text-base font-bold text-gov-text mb-4">빠른 계산 (프리셋)</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {presets.map((preset, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setInput({ transactionsPerYear: preset.perYear, years: preset.years });
                                setResult(null);
                            }}
                            className="bg-white border-2 border-gov-border hover:border-gov-blue rounded-lg p-4 transition-all"
                        >
                            <div className="font-bold text-gov-blue">{preset.name}</div>
                            <div className="text-xs text-gray-600 mt-1">
                                연 {preset.perYear.toLocaleString()}건<br/>
                                {preset.years}년간
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* 계산 입력 */}
            <div>
                <h4 className="text-base font-bold text-gov-text mb-4">사용자 정의 계산</h4>
                <div className="bg-white border-2 border-gov-border rounded-lg p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gov-text mb-2">
                                연간 거래 건수
                            </label>
                            <input
                                type="number"
                                value={input.transactionsPerYear}
                                onChange={(e) => setInput({...input, transactionsPerYear: parseInt(e.target.value)})}
                                className="w-full px-4 py-2 border-2 border-gov-border rounded focus:border-gov-blue"
                            />
                            <div className="text-xs text-gray-600 mt-1">
                                예: 1,000 (개인), 100,000 (소기업), 1,000,000 (대기업)
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gov-text mb-2">
                                기간 (년)
                            </label>
                            <input
                                type="number"
                                value={input.years}
                                onChange={(e) => setInput({...input, years: parseInt(e.target.value)})}
                                className="w-full px-4 py-2 border-2 border-gov-border rounded focus:border-gov-blue"
                            />
                            <div className="text-xs text-gray-600 mt-1">
                                예: 1 (단기), 10 (중기), 100 (평생)
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={calculateStorage}
                        className="w-full mt-6 bg-gov-blue text-white py-3 rounded-lg font-bold hover:bg-gov-blue-light"
                    >
                        <i className="fas fa-calculator mr-2"></i>
                        저장 공간 계산
                    </button>
                </div>
            </div>

            {/* 계산 결과 */}
            {result && (
                <div className="space-y-6">
                    {/* 요약 */}
                    <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-6 text-center">
                        <div className="text-sm text-gray-600 mb-2">총 거래 건수</div>
                        <div className="text-4xl font-bold text-blue-600 mb-4">
                            {result.total.toLocaleString()}건
                        </div>
                        <div className="text-sm text-gray-600">
                            {input.transactionsPerYear.toLocaleString()}건/년 × {input.years}년
                        </div>
                    </div>

                    {/* 비교 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6">
                            <h5 className="font-bold text-red-700 mb-4 flex items-center">
                                <i className="fas fa-database mr-2"></i>
                                전통적 데이터베이스
                            </h5>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-red-600 mb-2">
                                    {result.traditionalDisplay}
                                </div>
                                <div className="text-sm text-gray-600">
                                    레코드당 500 bytes
                                </div>
                                <div className="text-xs text-gray-500 mt-2">
                                    {result.traditionalBytes.toLocaleString()} bytes
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
                            <h5 className="font-bold text-green-700 mb-4 flex items-center">
                                <i className="fas fa-cloud mr-2"></i>
                                PDV 클라우드 저장
                            </h5>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600 mb-2">
                                    {result.cloudDisplay}
                                </div>
                                <div className="text-sm text-gray-600">
                                    레코드당 32 bytes (해시)
                                </div>
                                <div className="text-xs text-gray-500 mt-2">
                                    {result.cloudBytes.toLocaleString()} bytes
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 절감 효과 */}
                    <div className="bg-purple-50 border-4 border-purple-500 rounded-lg p-8 text-center">
                        <div className="text-sm text-purple-700 mb-2">저장 공간 절감률</div>
                        <div className="text-6xl font-bold text-purple-600 mb-4">
                            {result.savings}%
                        </div>
                        <div className="text-lg text-gray-700">
                            약 <span className="font-bold">{(result.traditionalBytes / result.cloudBytes).toFixed(1)}배</span> 저장 공간 절감
                        </div>
                    </div>

                    {/* 상세 분석 */}
                    <div className="bg-white border-2 border-gov-border rounded-lg p-6">
                        <h5 className="font-bold text-gov-text mb-4">상세 분석</h5>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-gray-600">클라우드 저장 비용 절감</span>
                                <span className="font-bold text-green-600">
                                    약 {((result.traditionalBytes - result.cloudBytes) / (1024 * 1024)).toFixed(1)} MB 절약
                                </span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-gray-600">대역폭 절감</span>
                                <span className="font-bold text-green-600">
                                    {result.savings}% 감소
                                </span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-gray-600">백업 시간 단축</span>
                                <span className="font-bold text-green-600">
                                    약 {(result.traditionalBytes / result.cloudBytes).toFixed(1)}배 빠름
                                </span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-600">동기화 속도</span>
                                <span className="font-bold text-green-600">
                                    {result.savings}% 향상
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 실제 사례 */}
            <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-6">
                <h4 className="text-base font-bold text-yellow-700 mb-4">
                    <i className="fas fa-lightbulb mr-2"></i>
                    실제 사례
                </h4>
                <div className="space-y-3 text-sm text-gray-700">
                    <div className="bg-white p-3 rounded">
                        <div className="font-semibold">개인 (연 1,000건, 10년)</div>
                        <div>클라우드 저장: <span className="font-bold text-green-600">320 KB</span></div>
                        <div className="text-xs text-gray-600">전통적 DB 대비 93.6% 절감</div>
                    </div>
                    <div className="bg-white p-3 rounded">
                        <div className="font-semibold">소기업 (연 100,000건, 10년)</div>
                        <div>클라우드 저장: <span className="font-bold text-green-600">32 MB</span></div>
                        <div className="text-xs text-gray-600">전통적 DB: 500 MB</div>
                    </div>
                    <div className="bg-white p-3 rounded">
                        <div className="font-semibold">평생 기록 (연 1,000건, 100년)</div>
                        <div>클라우드 저장: <span className="font-bold text-green-600">3.2 MB</span></div>
                        <div className="text-xs text-gray-600">스마트폰 사진 1장보다 작음</div>
                    </div>
                </div>
            </div>

            {/* 핵심 개념 */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
                <h4 className="text-base font-bold text-green-700 mb-4">
                    <i className="fas fa-check-circle mr-2"></i>
                    저장 공간 효율의 핵심 장점
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>✅ <span className="font-bold">극소 저장</span>: 레코드당 32 bytes만</li>
                    <li>✅ <span className="font-bold">비용 절감</span>: 클라우드 저장 비용 93.6% 감소</li>
                    <li>✅ <span className="font-bold">빠른 동기화</span>: 데이터 크기 감소로 속도 향상</li>
                    <li>✅ <span className="font-bold">백업 효율</span>: 백업 시간 및 공간 최소화</li>
                    <li>✅ <span className="font-bold">평생 기록 가능</span>: 100년 기록도 수 MB만 차지</li>
                </ul>
            </div>
        </div>
    );
}
