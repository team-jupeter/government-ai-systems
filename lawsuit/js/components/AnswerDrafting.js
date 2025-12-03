const AnswerDrafting = () => {
    const [caseNumber, setCaseNumber] = React.useState('');
    const [caseInfo, setCaseInfo] = React.useState(null);
    const [aiDraft, setAiDraft] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const searchCase = () => {
        setIsLoading(true);
        setTimeout(() => {
            setCaseInfo({
                caseNumber: caseNumber || '2025가합12345',
                court: '서울중앙지방법원',
                caseType: '민사',
                title: '손해배상(기) 청구',
                plaintiff: '홍길동',
                defendant: '(주)ABC (본인)',
                claimAmount: 50000000,
                claimSummary: '계약 불이행으로 인한 손해배상 청구',
                deadline: '2025-12-20',
                daysLeft: 23
            });
            setIsLoading(false);
        }, 1000);
    };

    const generateAnswer = () => {
        setIsLoading(true);
        setTimeout(() => {
            setAiDraft({
                title: '답 변 서',
                claimResponse: '원고의 청구를 기각한다.\n소송비용은 원고가 부담한다.\n라는 판결을 구합니다.',
                reasonResponse: `1. 원고 주장에 대한 답변

가. 계약 체결에 관하여
원고와 피고 사이에 2024년 3월 1일 계약이 체결된 사실은 인정합니다.

나. 채무불이행 주장에 관하여
피고가 채무를 불이행하였다는 원고의 주장은 부인합니다. 피고는 계약에 따른 모든 의무를 성실히 이행하였습니다.

다. 손해 발생 주장에 관하여
원고가 주장하는 손해의 발생 및 그 금액에 대하여 부인합니다.

2. 피고의 항변

가. 원고의 선행 의무 불이행
원고는 계약에 따른 선행 의무를 이행하지 않았으므로, 피고에게 의무 이행을 구할 수 없습니다.

나. 손해인과관계의 부존재
설령 피고에게 책임이 있다 하더라도, 원고가 주장하는 손해는 피고의 행위와 상당인과관계가 없습니다.`,
                evidence: [
                    '을 제1호증 - 계약서 사본',
                    '을 제2호증 - 이행 완료 증빙',
                    '을 제3호증 - 원고의 의무 불이행 증거'
                ],
                estimatedWinRate: 67.8
            });
            setIsLoading(false);
        }, 2500);
    };

    return (
        <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
                <h2 className="text-xl font-bold">
                    <i className="fas fa-reply mr-2 text-blue-600"></i>답변서 작성
                </h2>

                <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-bold mb-4">사건 검색</h3>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={caseNumber}
                            onChange={e => setCaseNumber(e.target.value)}
                            placeholder="사건번호 입력 (예: 2025가합12345)"
                            className="flex-1 border rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />
                        <button 
                            onClick={searchCase} 
                            disabled={isLoading}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                        >
                            <i className="fas fa-search mr-2"></i>검색
                        </button>
                    </div>
                </div>

                {caseInfo && (
                    <div className="border rounded-lg p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-lg">{caseInfo.caseNumber}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                caseInfo.daysLeft <= 7 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                                <i className="fas fa-clock mr-1"></i>
                                D-{caseInfo.daysLeft} (제출기한: {caseInfo.deadline})
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><span className="text-gray-500">법원:</span> {caseInfo.court}</div>
                            <div><span className="text-gray-500">사건명:</span> {caseInfo.title}</div>
                            <div><span className="text-gray-500">원고:</span> {caseInfo.plaintiff}</div>
                            <div><span className="text-gray-500">피고:</span> {caseInfo.defendant}</div>
                            <div><span className="text-gray-500">청구금액:</span> ₩{caseInfo.claimAmount?.toLocaleString()}</div>
                            <div><span className="text-gray-500">청구요지:</span> {caseInfo.claimSummary}</div>
                        </div>

                        <button 
                            onClick={generateAnswer} 
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                        >
                            {isLoading ? (
                                <><i className="fas fa-spinner fa-spin mr-2"></i>AI 답변서 생성 중...</>
                            ) : (
                                <><i className="fas fa-magic mr-2"></i>AI 답변서 자동 생성</>
                            )}
                        </button>
                    </div>
                )}

                {aiDraft && (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-xl p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-lg">AI 분석 결과</h3>
                                    <p className="text-green-100 text-sm">원고 청구에 대한 방어 전략 수립</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-4xl font-bold">{aiDraft.estimatedWinRate}%</div>
                                    <div className="text-green-200 text-sm">예상 승소 확률</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border rounded-xl p-6 space-y-6">
                            <h2 className="text-2xl font-bold text-center">{aiDraft.title}</h2>

                            <div>
                                <h4 className="font-bold mb-2">청구취지에 대한 답변</h4>
                                <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap text-sm">
                                    {aiDraft.claimResponse}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold mb-2">청구원인에 대한 답변</h4>
                                <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap text-sm">
                                    {aiDraft.reasonResponse}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold mb-2">입증방법</h4>
                                <ul className="list-disc list-inside text-sm">
                                    {aiDraft.evidence?.map((e, i) => <li key={i}>{e}</li>)}
                                </ul>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button className="px-6 py-3 border rounded-lg hover:bg-gray-50">
                                <i className="fas fa-edit mr-2"></i>수정하기
                            </button>
                            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700">
                                <i className="fas fa-check-circle mr-2"></i>최종 승인 및 제출
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
