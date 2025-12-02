const { useState } = React;

function Tab6DataSovereignty() {
    const [accessLog, setAccessLog] = useState([
        {
            timestamp: '2025-12-01 14:23:15',
            accessor: '김과장 (행정안전부)',
            document: '제주도청 환경보전 보고서',
            author: '이주무관 (제주도청)',
            reason: '정책 검토',
            level: '부서장급',
            approved: true
        },
        {
            timestamp: '2025-12-01 14:18:42',
            accessor: '박국장 (국가데이터처)',
            document: '국가기밀 문서 #2025-034',
            author: '최과장 (국방부)',
            reason: '감사 업무',
            level: '국가기밀취급인가',
            approved: true
        },
        {
            timestamp: '2025-12-01 14:12:30',
            accessor: '정대리 (인사과)',
            document: '인사 평가 자료',
            author: '이주무관 (제주도청)',
            reason: '승진 심사',
            level: '권한 없음',
            approved: false
        }
    ]);

    const [selectedAccess, setSelectedAccess] = useState(null);

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-gov-blue p-4">
                <p className="text-sm text-gov-text">
                    국가데이터처 시스템에서 <span className="font-bold text-gov-blue">모든 데이터의 소유자는 국가</span>입니다. 
                    공무원이 생산한 모든 데이터 원본은 <span className="font-bold text-gov-blue">국가데이터처 데이터베이스에 보관</span>되며, 
                    열람은 <span className="font-bold text-red-600">엄격히 제한</span>되고 모든 접근이 오픈해시로 기록됩니다.
                </p>
            </div>

            {/* 데이터 소유 구조 */}
            <div className="bg-white border-2 border-gov-border rounded-lg p-6">
                <h4 className="text-base font-bold text-gov-text mb-4 text-center">
                    국가데이터처 데이터 소유 및 보관 구조
                </h4>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4">
                        <div className="font-bold text-sm text-blue-700 mb-3 text-center">
                            <i className="fas fa-user-tie mr-2"></i>
                            공무원 (Edge)
                        </div>
                        <div className="text-xs space-y-2">
                            <div className="bg-white p-2 rounded">
                                <div className="font-semibold">데이터 생산</div>
                                <div className="text-gray-600">문서 작성 및 해시 생성</div>
                            </div>
                            <div className="bg-white p-2 rounded">
                                <div className="font-semibold">권한</div>
                                <div className="text-gray-600">생산 권한만 보유</div>
                            </div>
                            <div className="bg-white p-2 rounded">
                                <div className="font-semibold">소유권</div>
                                <div className="text-red-600 font-bold">없음</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                        <div className="font-bold text-sm text-green-700 mb-3 text-center">
                            <i className="fas fa-database mr-2"></i>
                            국가데이터처
                        </div>
                        <div className="text-xs space-y-2">
                            <div className="bg-white p-2 rounded">
                                <div className="font-semibold">원본 보관</div>
                                <div className="text-gray-600">AES-256 암호화 저장</div>
                            </div>
                            <div className="bg-white p-2 rounded">
                                <div className="font-semibold">해시 체인</div>
                                <div className="text-gray-600">오픈해시 무결성 검증</div>
                            </div>
                            <div className="bg-white p-2 rounded">
                                <div className="font-semibold">접근 통제</div>
                                <div className="text-gray-600">엄격한 권한 관리</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4">
                        <div className="font-bold text-sm text-red-700 mb-3 text-center">
                            <i className="fas fa-flag mr-2"></i>
                            국가 (소유자)
                        </div>
                        <div className="text-xs space-y-2">
                            <div className="bg-white p-2 rounded">
                                <div className="font-semibold">데이터 소유권</div>
                                <div className="text-gray-600">모든 공공데이터</div>
                            </div>
                            <div className="bg-white p-2 rounded">
                                <div className="font-semibold">최종 권한</div>
                                <div className="text-gray-600">국가데이터처 처장</div>
                            </div>
                            <div className="bg-white p-2 rounded">
                                <div className="font-semibold">공익성</div>
                                <div className="text-gray-600">국가 정책 수립</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 엄격한 접근 통제 */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-4 border-red-500 rounded-lg p-6">
                <h4 className="text-lg font-bold text-red-700 mb-4">
                    <i className="fas fa-lock mr-2"></i>
                    엄격한 접근 통제 체계
                </h4>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                        <div className="font-bold text-sm mb-3 text-red-600">
                            <i className="fas fa-shield-alt mr-2"></i>
                            국가기밀 (최고 등급)
                        </div>
                        <ul className="text-xs space-y-2 text-gray-700">
                            <li>✅ <span className="font-bold">접근 가능자</span>: 국가기밀취급인가자만</li>
                            <li>✅ <span className="font-bold">인가 절차</span>: 신원조사 + 보안서약</li>
                            <li>✅ <span className="font-bold">열람 기록</span>: 모든 접근 오픈해시 기록</li>
                            <li>✅ <span className="font-bold">유출 시</span>: 형법 제98조 (국가기밀 누설죄)</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                        <div className="font-bold text-sm mb-3 text-orange-600">
                            <i className="fas fa-user-lock mr-2"></i>
                            일반 업무 문서
                        </div>
                        <ul className="text-xs space-y-2 text-gray-700">
                            <li>✅ <span className="font-bold">접근 가능자</span>: 부서 책임자 + 직속 상급자</li>
                            <li>✅ <span className="font-bold">작성자 본인</span>: 열람 가능 (수정 불가)</li>
                            <li>✅ <span className="font-bold">타부서</span>: 공문 요청 + 승인 후 열람</li>
                            <li>✅ <span className="font-bold">열람 기록</span>: 시각, 이유, 승인자 기록</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 실시간 접근 로그 */}
            <div className="bg-white border-2 border-gov-border rounded-lg p-6">
                <h4 className="text-base font-bold text-gov-text mb-4">
                    <i className="fas fa-history mr-2"></i>
                    실시간 접근 로그 (오픈해시 기록)
                </h4>
                <div className="space-y-2">
                    {accessLog.map((log, idx) => (
                        <div
                            key={idx}
                            className={`rounded-lg p-4 border-l-4 cursor-pointer hover:shadow-md transition-all ${
                                log.approved
                                    ? 'bg-green-50 border-green-500'
                                    : 'bg-red-50 border-red-500'
                            }`}
                            onClick={() => setSelectedAccess(log)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                            log.approved
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}>
                                            {log.approved ? '승인됨' : '거부됨'}
                                        </span>
                                        <span className="font-bold text-sm">{log.accessor}</span>
                                    </div>
                                    <div className="text-xs text-gray-700 mb-1">
                                        문서: <span className="font-semibold">{log.document}</span>
                                    </div>
                                    <div className="text-xs text-gray-600">
                                        작성자: {log.author} | 사유: {log.reason} | 권한: {log.level}
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500 ml-2">
                                    {log.timestamp}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedAccess && (
                    <div className="mt-4 bg-blue-50 rounded-lg p-4 border-2 border-blue-500">
                        <div className="font-bold text-sm text-blue-700 mb-2">
                            <i className="fas fa-info-circle mr-2"></i>
                            접근 상세 정보
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                                <span className="text-gray-600">접근 시각:</span>
                                <span className="ml-2 font-semibold">{selectedAccess.timestamp}</span>
                            </div>
                            <div>
                                <span className="text-gray-600">접근자:</span>
                                <span className="ml-2 font-semibold">{selectedAccess.accessor}</span>
                            </div>
                            <div>
                                <span className="text-gray-600">문서:</span>
                                <span className="ml-2 font-semibold">{selectedAccess.document}</span>
                            </div>
                            <div>
                                <span className="text-gray-600">작성자:</span>
                                <span className="ml-2 font-semibold">{selectedAccess.author}</span>
                            </div>
                            <div>
                                <span className="text-gray-600">접근 이유:</span>
                                <span className="ml-2 font-semibold">{selectedAccess.reason}</span>
                            </div>
                            <div>
                                <span className="text-gray-600">권한 수준:</span>
                                <span className="ml-2 font-semibold">{selectedAccess.level}</span>
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-blue-600">
                            <i className="fas fa-link mr-1"></i>
                            오픈해시 체인: 0x7a8f...4e2c (Layer 4 기록)
                        </div>
                    </div>
                )}
            </div>

            {/* 권한 체계 */}
            <div className="bg-purple-50 border-2 border-purple-500 rounded-lg p-4">
                <h4 className="text-base font-bold text-purple-700 mb-3">
                    <i className="fas fa-sitemap mr-2"></i>
                    계층별 데이터 접근 권한
                </h4>
                <div className="space-y-2 text-sm">
                    <div className="bg-white rounded p-3 flex items-start space-x-3">
                        <div className="bg-red-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-red-600">1</span>
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold mb-1">국가데이터처 처장</div>
                            <div className="text-xs text-gray-700">
                                모든 데이터 접근 가능 (국가기밀 포함), 
                                접근 시 국무총리 승인 + 오픈해시 기록
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded p-3 flex items-start space-x-3">
                        <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-orange-600">2</span>
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold mb-1">부처 장관 / 차관</div>
                            <div className="text-xs text-gray-700">
                                소관 부처 전체 데이터 접근 가능, 
                                타부처는 공문 요청 필요
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded p-3 flex items-start space-x-3">
                        <div className="bg-yellow-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-yellow-600">3</span>
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold mb-1">기관장 (도지사, 시장 등)</div>
                            <div className="text-xs text-gray-700">
                                소관 기관 전체 데이터 접근 가능, 
                                열람 시각 및 이유 자동 기록
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded p-3 flex items-start space-x-3">
                        <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-green-600">4</span>
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold mb-1">부서장 (과장, 국장 등)</div>
                            <div className="text-xs text-gray-700">
                                소속 부서원이 작성한 문서만 접근 가능, 
                                승인 권한 보유
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded p-3 flex items-start space-x-3">
                        <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-blue-600">5</span>
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold mb-1">일반 공무원 (Edge)</div>
                            <div className="text-xs text-gray-700">
                                본인이 작성한 문서만 열람 가능 (수정 불가), 
                                타인 문서는 부서장 승인 필요
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 핵심 개념 */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                <h4 className="text-base font-bold text-green-700 mb-3">
                    <i className="fas fa-key mr-2"></i>
                    국가데이터처 데이터 주권의 핵심
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>✅ <span className="font-bold">소유권</span>: 모든 공공데이터의 소유자는 국가</li>
                    <li>✅ <span className="font-bold">원본 보관</span>: 국가데이터처 데이터베이스에 AES-256 암호화 저장</li>
                    <li>✅ <span className="font-bold">엄격한 통제</span>: 권한별 차등 접근, 모든 열람 오픈해시 기록</li>
                    <li>✅ <span className="font-bold">투명성</span>: 접근 시각, 이유, 승인자가 모두 기록되어 감사 가능</li>
                    <li>✅ <span className="font-bold">무결성</span>: 오픈해시로 데이터 변조 불가능</li>
                    <li>✅ <span className="font-bold">국가기밀</span>: 국가기밀취급인가자만 접근, 법적 보호</li>
                </ul>
            </div>
        </div>
    );
}
