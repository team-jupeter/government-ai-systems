const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">우주항공청 AI 자동화 시스템</h2>
                <p className="text-sm text-gray-600 mt-1">Korea AeroSpace Administration - OpenHash & AI Integration</p>
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
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">누리호 발사 성공</td>
                            <td className="px-6 py-4 text-sm text-right text-gray-900">4회</td>
                            <td className="px-6 py-4 text-sm text-gray-600">2024년 11월 4차 발사 성공</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">발사체 개발 예산</td>
                            <td className="px-6 py-4 text-sm text-right text-gray-900">2.1조원</td>
                            <td className="px-6 py-4 text-sm text-gray-600">2024년 기준</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">참여 기업</td>
                            <td className="px-6 py-4 text-sm text-right text-gray-900">300여개</td>
                            <td className="px-6 py-4 text-sm text-gray-600">우주산업 생태계</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">AI 자동화율</td>
                            <td className="px-6 py-4 text-sm text-right text-blue-700 font-semibold">99.2%</td>
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
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">우주수송</h4>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>누리호 발사체 개발 및 운영</li>
                                <li>재사용발사체 기술 개발</li>
                                <li>차세대발사체(KSLV-III) 개발</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">인공위성</h4>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>한국형위성항법(KPS) 개발</li>
                                <li>초고해상도 위성 개발</li>
                                <li>초저궤도 위성 기술 연구</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">우주탐사</h4>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>다누리 달 궤도선 운영</li>
                                <li>2032년 달 착륙선 발사</li>
                                <li>2045년 화성 탐사 목표</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">항공혁신</h4>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>미래항공모빌리티(AAM) 개발</li>
                                <li>드론 산업 생태계 조성</li>
                                <li>항공 안전 기술 개발</li>
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
                                <td className="px-6 py-4 text-sm text-gray-900">발사체 데이터 분석</td>
                                <td className="px-6 py-4 text-sm text-center text-blue-700 font-semibold">99%</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">1.2TB</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-900">위성 관제 모니터링</td>
                                <td className="px-6 py-4 text-sm text-center text-blue-700 font-semibold">99%</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">850GB</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-900">우주환경 예측</td>
                                <td className="px-6 py-4 text-sm text-center text-blue-700 font-semibold">99%</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">480건</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-900">R&D 과제 심사</td>
                                <td className="px-6 py-4 text-sm text-center text-blue-700 font-semibold">100%</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">320건</td>
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
                            <span className="text-gray-700 ml-2">발사체 데이터, 위성 관제, 우주환경 데이터</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-900">데이터 무결성:</span>
                            <span className="text-blue-700 font-semibold ml-2">100%</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-900">처리 시간 단축:</span>
                            <span className="text-gray-700 ml-2">92% (30일 → 2.4일)</span>
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
