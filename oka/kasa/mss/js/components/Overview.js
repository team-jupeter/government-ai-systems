const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">중소벤처기업부 AI 자동화 시스템</h2>
                <p className="text-sm text-gray-600 mt-1">Ministry of SMEs and Startups - OpenHash & AI Integration</p>
            </div>

            <div className="bg-white border rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">구분</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">수치</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">비고</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">중소기업 수</td>
                            <td className="px-6 py-4 text-sm text-right text-gray-900">7,650,000개</td>
                            <td className="px-6 py-4 text-sm text-gray-600">전체 기업의 99.9%</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">연간 창업기업</td>
                            <td className="px-6 py-4 text-sm text-right text-gray-900">1,460,000개</td>
                            <td className="px-6 py-4 text-sm text-gray-600">2024년 기준</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">벤처투자</td>
                            <td className="px-6 py-4 text-sm text-right text-gray-900">8.5조원</td>
                            <td className="px-6 py-4 text-sm text-gray-600">2024년 투자액</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">AI 자동화율</td>
                            <td className="px-6 py-4 text-sm text-right text-blue-700 font-semibold">98.7%</td>
                            <td className="px-6 py-4 text-sm text-gray-600">DeepSeek R1 기반</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">주요 기능</h3>
                <div className="bg-white border rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">중소기업 정책</h4>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>중소기업 정책 기획 및 총괄</li>
                                <li>중소기업 성장 지원</li>
                                <li>기술혁신 및 R&D 지원</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">창업·벤처 지원</h4>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>창업 활성화 및 생태계 조성</li>
                                <li>벤처기업 육성 및 투자 지원</li>
                                <li>스타트업 글로벌 진출 지원</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">상생협력</h4>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>대·중소기업 상생협력</li>
                                <li>공정거래 질서 확립</li>
                                <li>동반성장 펀드 운영</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">소상공인 지원</h4>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>소상공인 경영 안정 지원</li>
                                <li>전통시장 및 상점가 육성</li>
                                <li>소상공인 디지털 전환</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">AI 자동화 현황</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">업무 분야</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">자동화율</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">일일 처리량</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-900">창업지원 심사</td>
                                <td className="px-6 py-4 text-sm text-center text-blue-700 font-semibold">99%</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">2,450건</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-900">자금융자 처리</td>
                                <td className="px-6 py-4 text-sm text-center text-blue-700 font-semibold">98%</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">1,850건</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-900">판로개척 매칭</td>
                                <td className="px-6 py-4 text-sm text-center text-blue-700 font-semibold">99%</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">3,200건</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-900">벤처인증 심사</td>
                                <td className="px-6 py-4 text-sm text-center text-blue-700 font-semibold">97%</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">850건</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">OpenHash 블록체인 적용</h3>
                <div className="bg-white border rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                        <div>
                            <span className="font-semibold text-gray-900">적용 분야:</span>
                            <span className="text-gray-700 ml-2">창업지원금 집행, 융자 심사, 벤처인증 이력</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-900">데이터 무결성:</span>
                            <span className="text-blue-700 font-semibold ml-2">99.9%</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-900">처리 시간 단축:</span>
                            <span className="text-gray-700 ml-2">85% (15일 → 2일)</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-900">에너지 효율:</span>
                            <span className="text-gray-700 ml-2">98.5% 개선</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

(() => Overview)();
