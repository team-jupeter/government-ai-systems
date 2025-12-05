const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">재외동포청 AI 자동화 시스템</h2>
                <p className="text-sm text-gray-600 mt-1">Overseas Koreans Agency - OpenHash & AI Integration</p>
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
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">전 세계 재외동포</td>
                            <td className="px-6 py-4 text-sm text-right text-gray-900">750만명</td>
                            <td className="px-6 py-4 text-sm text-gray-600">180여 개국 거주</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">국내 체류 동포</td>
                            <td className="px-6 py-4 text-sm text-right text-gray-900">100만명</td>
                            <td className="px-6 py-4 text-sm text-gray-600">2024년 기준</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">세계 한인 단체</td>
                            <td className="px-6 py-4 text-sm text-right text-gray-900">10,000여개</td>
                            <td className="px-6 py-4 text-sm text-gray-600">글로벌 네트워크</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">AI 자동화율</td>
                            <td className="px-6 py-4 text-sm text-right text-green-700 font-semibold">98.8%</td>
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
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">동포 보듬기</h4>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>사할린·고려인 동포 지원</li>
                                <li>원폭피해 동포 초청</li>
                                <li>파독광부·간호사 지원</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">차세대 정체성 강화</h4>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>한국어 교육 프로그램</li>
                                <li>한국 방문 체험 프로그램</li>
                                <li>차세대 동포 교육</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">민원 원스톱 서비스</h4>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>영사·법무·병무 통합 민원</li>
                                <li>비대면 디지털 서비스</li>
                                <li>24시간 민원 처리</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">글로벌 네트워크</h4>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>세계 한인 단체 교류 협력</li>
                                <li>재외동포 네트워크 활성화</li>
                                <li>국제 협력 강화</li>
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
                                <td className="px-6 py-4 text-sm text-gray-900">영사 민원 처리</td>
                                <td className="px-6 py-4 text-sm text-center text-green-700 font-semibold">99%</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">8,500건</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-900">동포 정보 관리</td>
                                <td className="px-6 py-4 text-sm text-center text-green-700 font-semibold">99%</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">12,000건</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-900">지원사업 심사</td>
                                <td className="px-6 py-4 text-sm text-center text-green-700 font-semibold">98%</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">2,800건</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-900">네트워크 매칭</td>
                                <td className="px-6 py-4 text-sm text-center text-green-700 font-semibold">99%</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">4,200건</td>
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
                            <span className="text-gray-700 ml-2">민원 이력, 지원사업, 동포 네트워크</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-900">데이터 무결성:</span>
                            <span className="text-green-700 font-semibold ml-2">99.9%</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-900">처리 시간 단축:</span>
                            <span className="text-gray-700 ml-2">90% (10일 → 1일)</span>
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
