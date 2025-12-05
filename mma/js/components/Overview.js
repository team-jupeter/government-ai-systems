const Overview = () => {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">병무청 AI 자동화 시스템</h2>
                <p className="text-sm text-gray-600 mt-1">Military Manpower Administration - OpenHash & AI Integration</p>
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
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">관리 병역자원</td>
                            <td className="px-6 py-4 text-sm text-right text-gray-900">804.7만명</td>
                            <td className="px-6 py-4 text-sm text-gray-600">전국 병역의무자</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">연간 입영 인원</td>
                            <td className="px-6 py-4 text-sm text-right text-gray-900">28만명</td>
                            <td className="px-6 py-4 text-sm text-gray-600">2024년 기준</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">지방병무청</td>
                            <td className="px-6 py-4 text-sm text-right text-gray-900">8개</td>
                            <td className="px-6 py-4 text-sm text-gray-600">전국 권역별</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">AI 자동화율</td>
                            <td className="px-6 py-4 text-sm text-right font-semibold" style={{color: '#65671f'}}>98.9%</td>
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
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">징집 및 소집</h4>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>병역판정검사 실시</li>
                                <li>현역·보충역 입영 통지</li>
                                <li>예비군 소집 관리</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">병역자원 관리</h4>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>병적 편입 및 관리</li>
                                <li>병역처분 결정</li>
                                <li>국외여행 허가</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">사회복무요원</h4>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>복무기관 배정</li>
                                <li>복무관리 및 지도</li>
                                <li>복무종료 처리</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">산업기능요원</h4>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>편입 지원 및 관리</li>
                                <li>복무현황 점검</li>
                                <li>편입취소 처리</li>
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
                                <td className="px-6 py-4 text-sm text-gray-900">병역판정검사 예약</td>
                                <td className="px-6 py-4 text-sm text-center font-semibold" style={{color: '#65671f'}}>99%</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">2,500건</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-900">입영통지서 발송</td>
                                <td className="px-6 py-4 text-sm text-center font-semibold" style={{color: '#65671f'}}>99%</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">1,200건</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-900">국외여행 허가</td>
                                <td className="px-6 py-4 text-sm text-center font-semibold" style={{color: '#65671f'}}>99%</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">8,500건</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-900">사회복무요원 관리</td>
                                <td className="px-6 py-4 text-sm text-center font-semibold" style={{color: '#65671f'}}>98%</td>
                                <td className="px-6 py-4 text-sm text-right text-gray-900">15,000건</td>
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
                            <span className="text-gray-700 ml-2">병역판정, 입영기록, 복무현황</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-900">데이터 무결성:</span>
                            <span className="font-semibold ml-2" style={{color: '#65671f'}}>100%</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-900">처리 시간 단축:</span>
                            <span className="text-gray-700 ml-2">88% (7일 → 0.84일)</span>
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
