const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">대검찰청 AI 자동화 시스템</h2>
                <p className="text-sm text-gray-600 mt-1">Supreme Prosecutors' Office - OpenHash & AI Integration</p>
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
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">전국 검사</td>
                            <td className="px-6 py-4 text-sm text-right text-gray-900">2,100명</td>
                            <td className="px-6 py-4 text-sm text-gray-600">대검·고검·지검·지청</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">지방검찰청</td>
                            <td className="px-6 py-4 text-sm text-right text-gray-900">18개</td>
                            <td className="px-6 py-4 text-sm text-gray-600">42개 지청 포함</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">연간 사건 처리</td>
                            <td className="px-6 py-4 text-sm text-right text-gray-900">280만건</td>
                            <td className="px-6 py-4 text-sm text-gray-600">2024년 기준</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">AI 자동화율</td>
                            <td className="px-6 py-4 text-sm text-right text-blue-900 font-semibold">99.2%</td>
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
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">범죄 수사</h4>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>대통령령으로 정한 범죄 수사</li>
                                <li>수사기관에 대한 지휘·감독</li>
                                <li>범죄정보 수집 및 분석</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">공소 제기 및 유지</h4>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>기소독점주의 원칙</li>
                                <li>공소유지 및 재판 참여</li>
                                <li>상고·재항고 처리</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">형 집행 감독</h4>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>형사 집행 지휘·감독</li>
                                <li>사면·감형·복권 처리</li>
                                <li>보호관찰 지휘</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">인권 보호</h4>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>범죄피해자 보호·지원</li>
                                <li>형사조정 업무</li>
                                <li>인권침해 예방 및 처리</li>
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
                                <td className="px-6 py-4 text-sm text-gray-900">사건 접수 및 배당</td>
                                <td className="px-6 py-4 text-sm text-center text-blue-900 font-semibold">99%</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">12,500건</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-900">사건 기록 분석</td>
                                <td className="px-6 py-4 text-sm text-center text-blue-900 font-semibold">99%</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">18,000건</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-900">공소장 작성 지원</td>
                                <td className="px-6 py-4 text-sm text-center text-blue-900 font-semibold">99%</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">3,800건</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-900">판례 검색 및 분석</td>
                                <td className="px-6 py-4 text-sm text-center text-blue-900 font-semibold">100%</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">25,000건</td>
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
                            <span className="text-gray-700 ml-2">수사 이력, 공소장, 증거물 관리</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-900">데이터 무결성:</span>
                            <span className="text-blue-900 font-semibold ml-2">100%</span>
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
