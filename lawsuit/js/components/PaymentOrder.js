const PaymentOrder = () => {
    const [step, setStep] = React.useState(1);
    const [formData, setFormData] = React.useState({
        creditor: { name: '', address: '', phone: '' },
        debtor: { name: '', address: '', phone: '' },
        claimAmount: '',
        claimReason: '',
        claimDate: '',
        evidence: []
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [result, setResult] = React.useState(null);

    const submitPaymentOrder = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setResult({
                orderNumber: '2025차12345',
                court: '서울중앙지방법원',
                submittedAt: new Date().toLocaleString('ko-KR'),
                expectedDate: '2025-12-10',
                courtFee: Math.floor(parseInt(formData.claimAmount) * 0.005 * 0.1),
                serviceFee: 5200
            });
            setIsSubmitting(false);
            setStep(3);
        }, 2500);
    };

    return (
        <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl font-bold mb-2">
                    <i className="fas fa-file-invoice-dollar mr-2 text-blue-600"></i>지급명령 신청
                </h2>
                <p className="text-gray-500 mb-6">
                    금전 채권을 간편하게 회수할 수 있는 간이절차입니다. 채무자가 이의하지 않으면 판결과 동일한 효력이 있습니다.
                </p>

                <div className="flex items-center justify-center gap-2 mb-8">
                    {['채권자/채무자 정보', '청구 내용', '신청 완료'].map((label, i) => (
                        <React.Fragment key={i}>
                            <div className={`flex items-center gap-2 ${step > i ? 'text-green-600' : step === i + 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                    step > i + 1 ? 'bg-green-600 text-white' : 
                                    step === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                                }`}>
                                    {step > i + 1 ? <i className="fas fa-check"></i> : i + 1}
                                </div>
                                <span className="text-sm font-medium">{label}</span>
                            </div>
                            {i < 2 && <div className={`w-16 h-0.5 ${step > i + 1 ? 'bg-green-600' : 'bg-gray-200'}`}></div>}
                        </React.Fragment>
                    ))}
                </div>

                {step === 1 && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                <h3 className="font-bold text-green-800 mb-4">
                                    <i className="fas fa-user mr-2"></i>채권자 (신청인)
                                </h3>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="성명/상호"
                                        value={formData.creditor.name}
                                        onChange={e => setFormData({...formData, creditor: {...formData.creditor, name: e.target.value}})}
                                        className="w-full border rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="주소"
                                        value={formData.creditor.address}
                                        onChange={e => setFormData({...formData, creditor: {...formData.creditor, address: e.target.value}})}
                                        className="w-full border rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="전화번호"
                                        value={formData.creditor.phone}
                                        onChange={e => setFormData({...formData, creditor: {...formData.creditor, phone: e.target.value}})}
                                        className="w-full border rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                                <h3 className="font-bold text-red-800 mb-4">
                                    <i className="fas fa-user-slash mr-2"></i>채무자 (상대방)
                                </h3>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="성명/상호"
                                        value={formData.debtor.name}
                                        onChange={e => setFormData({...formData, debtor: {...formData.debtor, name: e.target.value}})}
                                        className="w-full border rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="주소"
                                        value={formData.debtor.address}
                                        onChange={e => setFormData({...formData, debtor: {...formData.debtor, address: e.target.value}})}
                                        className="w-full border rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="전화번호"
                                        value={formData.debtor.phone}
                                        onChange={e => setFormData({...formData, debtor: {...formData.debtor, phone: e.target.value}})}
                                        className="w-full border rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button onClick={() => setStep(2)} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                다음 <i className="fas fa-arrow-right ml-2"></i>
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">청구 금액</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₩</span>
                                <input
                                    type="number"
                                    value={formData.claimAmount}
                                    onChange={e => setFormData({...formData, claimAmount: e.target.value})}
                                    placeholder="10000000"
                                    className="w-full border rounded-lg pl-10 pr-4 py-3 focus:border-blue-500 focus:outline-none text-lg"
                                />
                            </div>
                            {formData.claimAmount && (
                                <p className="text-sm text-blue-600 mt-1">{parseInt(formData.claimAmount).toLocaleString()}원</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">청구 원인</label>
                            <select 
                                value={formData.claimReason}
                                onChange={e => setFormData({...formData, claimReason: e.target.value})}
                                className="w-full border rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                            >
                                <option value="">청구 원인을 선택하세요</option>
                                <option value="loan">대여금 (금전 대여)</option>
                                <option value="sale">매매대금</option>
                                <option value="service">용역대금</option>
                                <option value="rent">임대료/관리비</option>
                                <option value="deposit">보증금</option>
                                <option value="wage">임금/퇴직금</option>
                                <option value="other">기타</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">청구 내용 상세</label>
                            <textarea
                                rows={4}
                                value={formData.claimDate}
                                onChange={e => setFormData({...formData, claimDate: e.target.value})}
                                placeholder="채권 발생 경위를 간략히 작성하세요. (예: 2024년 5월 1일 채무자에게 1,000만원을 대여하였으나, 변제기일인 2024년 11월 1일이 지나도록 변제받지 못함)"
                                className="w-full border rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                            <h4 className="font-medium mb-4">예상 비용</h4>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-white p-4 rounded-lg text-center">
                                    <div className="text-sm text-gray-500">인지대 (1/10)</div>
                                    <div className="text-lg font-bold text-blue-600">
                                        ₩{formData.claimAmount ? Math.floor(parseInt(formData.claimAmount) * 0.005 * 0.1).toLocaleString() : '-'}
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg text-center">
                                    <div className="text-sm text-gray-500">송달료</div>
                                    <div className="text-lg font-bold">₩5,200</div>
                                </div>
                                <div className="bg-white p-4 rounded-lg text-center">
                                    <div className="text-sm text-gray-500">합계</div>
                                    <div className="text-lg font-bold text-green-600">
                                        ₩{formData.claimAmount ? (Math.floor(parseInt(formData.claimAmount) * 0.005 * 0.1) + 5200).toLocaleString() : '-'}
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-3">
                                * 지급명령의 인지대는 소송 인지대의 1/10입니다. 채무자가 이의하여 소송으로 전환되면 나머지 인지대를 납부합니다.
                            </p>
                        </div>

                        <div className="flex justify-between">
                            <button onClick={() => setStep(1)} className="px-6 py-3 border rounded-lg hover:bg-gray-50">
                                <i className="fas fa-arrow-left mr-2"></i>이전
                            </button>
                            <button 
                                onClick={submitPaymentOrder}
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <><i className="fas fa-spinner fa-spin mr-2"></i>신청 처리 중...</>
                                ) : (
                                    <><i className="fas fa-paper-plane mr-2"></i>지급명령 신청</>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && result && (
                    <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <i className="fas fa-check text-4xl text-green-600"></i>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-green-600 mb-2">지급명령 신청 완료!</h3>
                            <p className="text-gray-500">접수가 정상적으로 완료되었습니다.</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6 text-left max-w-md mx-auto">
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">사건번호</span>
                                    <span className="font-bold text-blue-600">{result.orderNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">관할법원</span>
                                    <span>{result.court}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">신청일시</span>
                                    <span>{result.submittedAt}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">예상 발령일</span>
                                    <span>{result.expectedDate}</span>
                                </div>
                                <div className="flex justify-between pt-3 border-t">
                                    <span className="text-gray-500">납부 비용</span>
                                    <span className="font-bold">₩{(result.courtFee + result.serviceFee).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-6 text-left">
                            <h4 className="font-bold text-blue-800 mb-3">
                                <i className="fas fa-info-circle mr-2"></i>다음 절차 안내
                            </h4>
                            <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside">
                                <li>법원에서 지급명령을 발령합니다. (약 1~2주)</li>
                                <li>지급명령이 채무자에게 송달됩니다.</li>
                                <li>채무자가 2주 내 이의하지 않으면 확정됩니다.</li>
                                <li>확정 후 강제집행이 가능합니다.</li>
                            </ol>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button className="px-6 py-3 border rounded-lg hover:bg-gray-50">
                                <i className="fas fa-print mr-2"></i>접수증 출력
                            </button>
                            <button 
                                onClick={() => { setStep(1); setResult(null); setFormData({
                                    creditor: { name: '', address: '', phone: '' },
                                    debtor: { name: '', address: '', phone: '' },
                                    claimAmount: '',
                                    claimReason: '',
                                    claimDate: '',
                                    evidence: []
                                }); }}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                <i className="fas fa-plus mr-2"></i>새 신청
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
