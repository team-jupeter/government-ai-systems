const ComplaintDrafting = () => {
    const [step, setStep] = React.useState(1);
    const [caseType, setCaseType] = React.useState('');
    const [formData, setFormData] = React.useState({
        plaintiff: { name: '', address: '', phone: '' },
        defendant: { name: '', address: '', phone: '' },
        claimAmount: '',
        facts: ''
    });
    const [aiDraft, setAiDraft] = React.useState(null);
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [chatMessages, setChatMessages] = React.useState([
        { role: 'ai', content: '안녕하세요! AI 법률 상담사입니다. 어떤 사건으로 소장을 작성하시겠습니까?' }
    ]);
    const [inputMessage, setInputMessage] = React.useState('');

    const caseTypes = [
        { id: 'damage', name: '손해배상', icon: '💰', desc: '계약 위반, 불법행위 등' },
        { id: 'contract', name: '계약이행', icon: '📝', desc: '계약 내용 이행 요구' },
        { id: 'rental', name: '임대차분쟁', icon: '🏠', desc: '보증금 반환 등' },
        { id: 'labor', name: '임금청구', icon: '👷', desc: '체불 임금, 퇴직금' },
        { id: 'divorce', name: '이혼소송', icon: '👨‍👩‍👧', desc: '이혼, 재산분할' },
        { id: 'payment', name: '지급명령', icon: '💳', desc: '금전 채권 회수' }
    ];

    const handleChat = () => {
        if (!inputMessage.trim()) return;
        setChatMessages(prev => [...prev, { role: 'user', content: inputMessage }]);
        setInputMessage('');
        
        setTimeout(() => {
            let response = '네, 말씀하신 내용을 이해했습니다. ';
            if (inputMessage.includes('보증금') || inputMessage.includes('임대')) {
                response = '임대차보증금 반환 사건이시군요. 계약서와 입금 내역이 있으시면 승소 가능성이 높습니다. 보증금 금액과 계약 만료일을 알려주세요.';
            } else if (inputMessage.includes('임금') || inputMessage.includes('월급')) {
                response = '임금 체불 사건이시군요. 근로계약서, 급여명세서, 출퇴근 기록이 있으면 유리합니다. 체불 기간과 금액을 알려주세요.';
            }
            setChatMessages(prev => [...prev, { role: 'ai', content: response }]);
        }, 1000);
    };

    const generateDraft = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const amount = parseInt(formData.claimAmount) || 50000000;
            setAiDraft({
                court: '서울중앙지방법원',
                title: caseTypes.find(c => c.id === caseType)?.name + ' 청구의 소',
                claimPurpose: `1. 피고는 원고에게 금 ${amount.toLocaleString()}원 및 이에 대한 지연손해금을 지급하라.\n2. 소송비용은 피고가 부담한다.\n3. 제1항은 가집행할 수 있다.`,
                claimReason: `1. 당사자의 지위\n원고와 피고는 계약 관계에 있습니다.\n\n2. 계약 체결 경위\n${formData.facts || '[사실관계 입력 필요]'}\n\n3. 피고의 채무불이행\n피고는 계약상 의무를 이행하지 않았습니다.\n\n4. 손해의 발생\n이로 인해 원고는 금 ${amount.toLocaleString()}원의 손해를 입었습니다.`,
                evidence: ['갑 제1호증 - 계약서', '갑 제2호증 - 입금 내역', '갑 제3호증 - 독촉 내역'],
                courtFee: Math.floor(amount * 0.005),
                serviceFee: 52800,
                winRate: Math.floor(Math.random() * 20) + 70
            });
            setIsGenerating(false);
            setStep(4);
        }, 2500);
    };

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-bold text-lg text-blue-800 mb-2">소장 작성 안내</h3>
                <p className="text-blue-700">AI가 사건 내용을 분석하여 소장을 자동 작성합니다. 사건 유형을 선택하거나 AI와 상담하세요.</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {caseTypes.map(ct => (
                    <button
                        key={ct.id}
                        onClick={() => { setCaseType(ct.id); setStep(2); }}
                        className={`p-4 rounded-xl border-2 text-left transition hover:shadow-lg ${
                            caseType === ct.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'
                        }`}
                    >
                        <span className="text-3xl">{ct.icon}</span>
                        <h4 className="font-bold mt-2">{ct.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{ct.desc}</p>
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl border shadow-sm">
                <div className="p-4 border-b bg-gray-50 rounded-t-xl">
                    <h3 className="font-bold">🤖 AI 상담으로 사건 정리하기</h3>
                </div>
                <div className="h-48 overflow-y-auto p-4 space-y-3">
                    {chatMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-3 ${
                                msg.role === 'user' ? 'bg-green-100 border-l-4 border-green-500' : 'bg-blue-50 border-l-4 border-blue-500'
                            }`}>
                                <p className="text-sm">{msg.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t flex gap-2">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={e => setInputMessage(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleChat()}
                        placeholder="사건 내용을 입력하세요..."
                        className="flex-1 border rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none"
                    />
                    <button onClick={handleChat} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                        전송
                    </button>
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-700">
                    <i className="fas fa-arrow-left text-xl"></i>
                </button>
                <h2 className="text-xl font-bold">당사자 정보 입력</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {caseTypes.find(c => c.id === caseType)?.name}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border p-6">
                    <h3 className="font-bold text-green-700 mb-4">👤 원고 (청구인)</h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="성명/상호"
                            value={formData.plaintiff.name}
                            onChange={e => setFormData({...formData, plaintiff: {...formData.plaintiff, name: e.target.value}})}
                            className="w-full border rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />
                        <input
                            type="text"
                            placeholder="주소"
                            value={formData.plaintiff.address}
                            onChange={e => setFormData({...formData, plaintiff: {...formData.plaintiff, address: e.target.value}})}
                            className="w-full border rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />
                        <input
                            type="text"
                            placeholder="전화번호"
                            value={formData.plaintiff.phone}
                            onChange={e => setFormData({...formData, plaintiff: {...formData.plaintiff, phone: e.target.value}})}
                            className="w-full border rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-xl border p-6">
                    <h3 className="font-bold text-red-700 mb-4">🏢 피고 (상대방)</h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="성명/상호"
                            value={formData.defendant.name}
                            onChange={e => setFormData({...formData, defendant: {...formData.defendant, name: e.target.value}})}
                            className="w-full border rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />
                        <input
                            type="text"
                            placeholder="주소"
                            value={formData.defendant.address}
                            onChange={e => setFormData({...formData, defendant: {...formData.defendant, address: e.target.value}})}
                            className="w-full border rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />
                        <input
                            type="text"
                            placeholder="전화번호"
                            value={formData.defendant.phone}
                            onChange={e => setFormData({...formData, defendant: {...formData.defendant, phone: e.target.value}})}
                            className="w-full border rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <button onClick={() => setStep(1)} className="px-6 py-3 border rounded-lg hover:bg-gray-50">이전</button>
                <button onClick={() => setStep(3)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                    다음 <i className="fas fa-arrow-right ml-2"></i>
                </button>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => setStep(2)} className="text-gray-500 hover:text-gray-700">
                    <i className="fas fa-arrow-left text-xl"></i>
                </button>
                <h2 className="text-xl font-bold">청구 내용 입력</h2>
            </div>

            <div className="bg-white rounded-xl border p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">청구 금액</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₩</span>
                        <input
                            type="number"
                            value={formData.claimAmount}
                            onChange={e => setFormData({...formData, claimAmount: e.target.value})}
                            className="w-full border rounded-lg pl-10 pr-4 py-3 focus:border-blue-500 focus:outline-none text-lg"
                            placeholder="50000000"
                        />
                    </div>
                    {formData.claimAmount && (
                        <p className="text-sm text-blue-600 mt-1">{parseInt(formData.claimAmount).toLocaleString()}원</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">사건 경위</label>
                    <textarea
                        value={formData.facts}
                        onChange={e => setFormData({...formData, facts: e.target.value})}
                        rows={6}
                        className="w-full border rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                        placeholder="사건의 경위를 자세히 입력해 주세요..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">증거 자료 업로드</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
                        <p className="text-gray-500">파일을 드래그하거나 클릭하여 업로드</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <button onClick={() => setStep(2)} className="px-6 py-3 border rounded-lg hover:bg-gray-50">이전</button>
                <button 
                    onClick={generateDraft} 
                    disabled={isGenerating}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                    {isGenerating ? (
                        <><i className="fas fa-spinner fa-spin"></i> AI 소장 생성 중...</>
                    ) : (
                        <><i className="fas fa-magic"></i> AI 소장 생성</>
                    )}
                </button>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => setStep(3)} className="text-gray-500 hover:text-gray-700">
                        <i className="fas fa-arrow-left text-xl"></i>
                    </button>
                    <h2 className="text-xl font-bold">AI 소장 검토</h2>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        <i className="fas fa-check mr-1"></i>생성 완료
                    </span>
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-lg">AI 승소율 예측</h3>
                        <p className="text-blue-200 text-sm">1,800만 건 판례 기반 분석</p>
                    </div>
                    <div className="text-right">
                        <div className="text-4xl font-bold">{aiDraft?.winRate}%</div>
                        <div className="text-blue-200 text-sm">예상 승소 확률</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border shadow-sm">
                <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                    <h3 className="font-bold"><i className="fas fa-file-alt mr-2"></i>소 장</h3>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
                            <i className="fas fa-edit mr-1"></i>수정
                        </button>
                        <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
                            <i className="fas fa-download mr-1"></i>다운로드
                        </button>
                    </div>
                </div>
                <div className="p-6 space-y-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">소 장</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-green-700 border-b pb-1 mb-2">원 고</h4>
                            <p>{formData.plaintiff.name || '홍길동'}</p>
                            <p className="text-sm text-gray-600">{formData.plaintiff.address || '서울특별시'}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-red-700 border-b pb-1 mb-2">피 고</h4>
                            <p>{formData.defendant.name || '(주)ABC'}</p>
                            <p className="text-sm text-gray-600">{formData.defendant.address || '서울특별시'}</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold border-b pb-1 mb-3">{aiDraft?.title}</h4>
                    </div>

                    <div>
                        <h4 className="font-bold mb-2">청 구 취 지</h4>
                        <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap text-sm">{aiDraft?.claimPurpose}</div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-2">청 구 원 인</h4>
                        <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap text-sm">{aiDraft?.claimReason}</div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-2">입 증 방 법</h4>
                        <ul className="list-disc list-inside text-sm">
                            {aiDraft?.evidence?.map((e, i) => <li key={i}>{e}</li>)}
                        </ul>
                    </div>

                    <div className="text-center pt-6 border-t">
                        <p>{new Date().toLocaleDateString('ko-KR')}</p>
                        <p className="mt-4">원고 {formData.plaintiff.name || '홍길동'} (인)</p>
                        <p className="mt-6 font-bold">{aiDraft?.court} 귀중</p>
                    </div>
                </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <h4 className="font-bold text-yellow-800 mb-4"><i className="fas fa-calculator mr-2"></i>예상 소송 비용</h4>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500">인지대</p>
                        <p className="text-xl font-bold">₩{aiDraft?.courtFee?.toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500">송달료</p>
                        <p className="text-xl font-bold">₩{aiDraft?.serviceFee?.toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-500">합계</p>
                        <p className="text-xl font-bold text-blue-600">
                            ₩{((aiDraft?.courtFee || 0) + (aiDraft?.serviceFee || 0)).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <button onClick={() => setStep(3)} className="px-6 py-3 border rounded-lg hover:bg-gray-50">다시 작성</button>
                <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600">
                    <i className="fas fa-gavel mr-2"></i>모의재판 시작
                </button>
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700">
                    <i className="fas fa-check-circle mr-2"></i>최종 승인 및 제출
                </button>
            </div>
        </div>
    );

    const ProgressIndicator = () => (
        <div className="flex items-center justify-center gap-2 mb-8">
            {[
                { num: 1, label: '유형 선택' },
                { num: 2, label: '당사자 정보' },
                { num: 3, label: '청구 내용' },
                { num: 4, label: 'AI 검토' }
            ].map((s, i) => (
                <React.Fragment key={s.num}>
                    <div className={`flex items-center gap-2 ${step >= s.num ? 'text-blue-600' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            step >= s.num ? 'bg-blue-600 text-white' : 'bg-gray-200'
                        }`}>
                            {step > s.num ? <i className="fas fa-check"></i> : s.num}
                        </div>
                        <span className="text-sm font-medium">{s.label}</span>
                    </div>
                    {i < 3 && <div className={`w-12 h-0.5 ${step > s.num ? 'bg-blue-600' : 'bg-gray-200'}`}></div>}
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
                <ProgressIndicator />
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderStep4()}
            </div>
        </div>
    );
};
