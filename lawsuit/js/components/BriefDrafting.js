const BriefDrafting = () => {
    const [briefType, setBriefType] = React.useState('');
    const [caseNumber, setCaseNumber] = React.useState('');
    const [content, setContent] = React.useState('');
    const [aiDraft, setAiDraft] = React.useState(null);
    const [isGenerating, setIsGenerating] = React.useState(false);

    const briefTypes = [
        { id: 'argument', name: '주장 준비서면', icon: '📝', desc: '새로운 주장이나 반박' },
        { id: 'evidence', name: '증거 준비서면', icon: '📎', desc: '증거 설명 및 입증 취지' },
        { id: 'closing', name: '최종 준비서면', icon: '📋', desc: '변론종결 전 쟁점 정리' },
        { id: 'appeal', name: '항소이유서', icon: '⬆️', desc: '항소심 이유 설명' }
    ];

    const generateBrief = () => {
        if (!briefType || !content) {
            alert('준비서면 유형과 내용을 입력해주세요.');
            return;
        }
        
        setIsGenerating(true);
        setTimeout(() => {
            const selectedType = briefTypes.find(b => b.id === briefType);
            setAiDraft({
                title: selectedType?.name || '준비서면',
                caseNumber: caseNumber || '2025가합12345',
                court: '서울중앙지방법원',
                content: `1. 서론

본 준비서면은 원고(피고)의 주장에 대하여 다음과 같이 반박하고자 제출합니다.

2. 사실관계에 대한 정리

${content}

3. 법률적 검토

가. 관련 법률 조항
민법 제390조(채무불이행과 손해배상)에 따르면, 채무자가 채무의 내용에 좇은 이행을 하지 아니한 때에는 채권자는 손해배상을 청구할 수 있습니다.

나. 판례의 입장
대법원 2023다12345 판결에서는 "계약상 의무의 이행 여부는 계약의 목적과 내용, 당사자의 의사 등을 종합적으로 고려하여 판단하여야 한다"고 판시하였습니다.

다. 본 사안에의 적용
위 법리를 본 사안에 적용하면, [AI 분석 결과에 따른 법적 판단]

4. 결론

이상과 같은 이유로 원고(피고)의 주장은 이유 없으므로, 이를 배척하여 주시기 바랍니다.`,
                references: [
                    '대법원 2023다12345 판결',
                    '대법원 2022나67890 판결',
                    '민법 제390조',
                    '민사소송법 제273조'
                ],
                keyPoints: [
                    '상대방 주장의 논리적 모순점 지적',
                    '유리한 판례 3건 인용',
                    '증거에 기반한 사실관계 정리'
                ]
            });
            setIsGenerating(false);
        }, 2000);
    };

    return (
        <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
                <h2 className="text-xl font-bold">
                    <i className="fas fa-file-contract mr-2 text-blue-600"></i>준비서면 작성
                </h2>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-blue-700 text-sm">
                        <i className="fas fa-info-circle mr-2"></i>
                        준비서면은 변론기일 전에 주장과 증거를 정리하여 제출하는 서면입니다. 
                        AI가 법률적 논리를 구성하여 작성합니다.
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">준비서면 유형 선택</label>
                    <div className="grid grid-cols-4 gap-4">
                        {briefTypes.map(bt => (
                            <button
                                key={bt.id}
                                onClick={() => setBriefType(bt.id)}
                                className={`p-4 rounded-lg border-2 text-left transition ${
                                    briefType === bt.id 
                                        ? 'border-blue-500 bg-blue-50' 
                                        : 'border-gray-200 hover:border-blue-300'
                                }`}
                            >
                                <span className="text-2xl">{bt.icon}</span>
                                <h4 className="font-bold mt-2 text-sm">{bt.name}</h4>
                                <p className="text-xs text-gray-500 mt-1">{bt.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {briefType && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">사건번호</label>
                            <input
                                type="text"
                                value={caseNumber}
                                onChange={e => setCaseNumber(e.target.value)}
                                placeholder="2025가합12345"
                                className="w-full border rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                주장 내용 (AI가 법률적으로 정리합니다)
                            </label>
                            <textarea
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                rows={8}
                                className="w-full border rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                                placeholder="주장하고자 하는 내용을 자유롭게 입력하세요. AI가 법률적 논리를 구성하여 준비서면을 작성합니다.

예시:
- 상대방이 계약을 위반했다는 주장에 대해 반박하고 싶습니다.
- 우리 측에서 제출한 증거의 의미를 설명하고 싶습니다.
- 새로운 증거를 추가로 제출하려고 합니다."
                            />
                        </div>

                        <button 
                            onClick={generateBrief}
                            disabled={isGenerating}
                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                        >
                            {isGenerating ? (
                                <><i className="fas fa-spinner fa-spin mr-2"></i>AI 준비서면 생성 중...</>
                            ) : (
                                <><i className="fas fa-magic mr-2"></i>AI 준비서면 생성</>
                            )}
                        </button>
                    </div>
                )}

                {aiDraft && (
                    <div className="space-y-6 mt-8 pt-8 border-t">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold">
                                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                                AI 준비서면 생성 완료
                            </h3>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
                                    <i className="fas fa-edit mr-1"></i>수정
                                </button>
                                <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
                                    <i className="fas fa-download mr-1"></i>다운로드
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {aiDraft.keyPoints?.map((point, i) => (
                                <div key={i} className="bg-green-50 border border-green-200 rounded-lg p-3">
                                    <i className="fas fa-check text-green-500 mr-2"></i>
                                    <span className="text-sm text-green-700">{point}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gray-50 border rounded-xl p-6">
                            <div className="text-center mb-6">
                                <p className="text-sm text-gray-500">사건번호 {aiDraft.caseNumber}</p>
                                <h2 className="text-2xl font-bold mt-2">{aiDraft.title}</h2>
                            </div>

                            <div className="bg-white p-6 rounded-lg border whitespace-pre-wrap text-sm leading-relaxed">
                                {aiDraft.content}
                            </div>

                            <div className="mt-6 pt-6 border-t">
                                <h4 className="font-medium text-sm text-gray-500 mb-3">참고 판례 및 법률</h4>
                                <div className="flex flex-wrap gap-2">
                                    {aiDraft.references?.map((ref, i) => (
                                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                            {ref}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button 
                                onClick={() => setAiDraft(null)}
                                className="px-6 py-3 border rounded-lg hover:bg-gray-50"
                            >
                                다시 작성
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
