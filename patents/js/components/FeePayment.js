// FeePayment 컴포넌트 - 수수료 납부
const FeePayment = () => {
    const [selectedFees, setSelectedFees] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);

    const pendingFees = [
        {
            id: 'FEE-2025-001',
            applicationId: 'KR10-2025-0001234',
            title: '오픈해시 기반 데이터 무결성 검증 시스템',
            type: 'examination',
            typeName: '심사청구료',
            amount: 187000,
            dueDate: '2025-12-15',
            urgent: false
        },
        {
            id: 'FEE-2025-002',
            applicationId: 'KR10-2025-0001122',
            title: 'AI 에이전트 기반 문서 자동 분류 방법',
            type: 'registration',
            typeName: '등록료 (1~3년차)',
            amount: 120000,
            dueDate: '2025-12-01',
            urgent: true
        },
        {
            id: 'FEE-2025-003',
            applicationId: 'KR40-2025-0000567',
            title: '스마트 IoT 디바이스 외관',
            type: 'annuity',
            typeName: '연차료 (4년차)',
            amount: 45000,
            dueDate: '2025-12-20',
            urgent: false
        }
    ];

    const paymentHistory = [
        { date: '2025-11-25', applicationId: 'KR10-2025-0001234', type: '출원료', amount: 46000, method: '신용카드' },
        { date: '2025-11-20', applicationId: 'KR10-2025-0001122', type: '심사청구료', amount: 203000, method: '계좌이체' },
        { date: '2025-11-15', applicationId: 'KR40-2025-0000567', type: '출원료', amount: 45000, method: '신용카드' },
        { date: '2025-10-28', applicationId: 'KR41-2025-0000345', type: '등록료', amount: 211000, method: '신용카드' }
    ];

    const feeSchedule = {
        patent: [
            { name: '출원료', base: 46000, perClaim: 0 },
            { name: '심사청구료', base: 143000, perClaim: 44000 },
            { name: '등록료 (1~3년)', base: 45000, perClaim: 19000 },
            { name: '연차료 (4년)', base: 40000, perClaim: 22000 },
            { name: '연차료 (5년)', base: 55000, perClaim: 24000 }
        ],
        utility: [
            { name: '출원료', base: 20000, perClaim: 0 },
            { name: '심사청구료', base: 71000, perClaim: 19000 },
            { name: '등록료 (1~3년)', base: 30000, perClaim: 13000 }
        ],
        design: [
            { name: '출원료', base: 45000, perClaim: 0 },
            { name: '심사청구료', base: 70000, perClaim: 0 },
            { name: '등록료', base: 75000, perClaim: 0 }
        ],
        trademark: [
            { name: '출원료 (1류)', base: 62000, perClaim: 0 },
            { name: '등록료 (10년)', base: 211000, perClaim: 0 },
            { name: '갱신료 (10년)', base: 310000, perClaim: 0 }
        ]
    };

    const toggleFeeSelection = (feeId) => {
        setSelectedFees(prev =>
            prev.includes(feeId)
                ? prev.filter(id => id !== feeId)
                : [...prev, feeId]
        );
    };

    const selectAllFees = () => {
        if (selectedFees.length === pendingFees.length) {
            setSelectedFees([]);
        } else {
            setSelectedFees(pendingFees.map(f => f.id));
        }
    };

    const getTotalAmount = () => {
        return pendingFees
            .filter(f => selectedFees.includes(f.id))
            .reduce((sum, f) => sum + f.amount, 0);
    };

    const processPayment = () => {
        if (selectedFees.length === 0) {
            alert('납부할 수수료를 선택해주세요.');
            return;
        }

        setIsProcessing(true);

        setTimeout(() => {
            alert(`${getTotalAmount().toLocaleString()}원 결제가 완료되었습니다.`);
            setSelectedFees([]);
            setIsProcessing(false);
        }, 2000);
    };

    return (
        <div className="space-y-6 pt-[140px]">
            {/* 페이지 타이틀 */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="text-3xl">💳</span>
                        수수료 납부
                    </h2>
                    <p className="text-gray-500">출원료, 심사청구료, 등록료 등을 납부합니다</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* 좌측: 미납 수수료 */}
                <div className="col-span-2 space-y-4">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="font-bold text-gray-800">미납 수수료</h3>
                            <button
                                onClick={selectAllFees}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                {selectedFees.length === pendingFees.length ? '전체 해제' : '전체 선택'}
                            </button>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {pendingFees.map((fee, idx) => (
                                <div
                                    key={idx}
                                    className={`p-5 hover:bg-gray-50 transition cursor-pointer ${
                                        selectedFees.includes(fee.id) ? 'bg-blue-50' : ''
                                    }`}
                                    onClick={() => toggleFeeSelection(fee.id)}
                                >
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedFees.includes(fee.id)}
                                            onChange={() => {}}
                                            className="w-5 h-5 rounded"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-mono text-sm text-gray-500">{fee.applicationId}</span>
                                                {fee.urgent && (
                                                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">
                                                        긴급
                                                    </span>
                                                )}
                                            </div>
                                            <h4 className="font-medium text-gray-800">{fee.title}</h4>
                                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                                <span>{fee.typeName}</span>
                                                <span>납부기한: {fee.dueDate}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-bold text-gray-800">
                                                {fee.amount.toLocaleString()}원
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 납부 내역 */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-200">
                            <h3 className="font-bold text-gray-800">최근 납부 내역</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-5 py-3 text-left text-gray-600">날짜</th>
                                        <th className="px-5 py-3 text-left text-gray-600">출원번호</th>
                                        <th className="px-5 py-3 text-left text-gray-600">수수료 종류</th>
                                        <th className="px-5 py-3 text-right text-gray-600">금액</th>
                                        <th className="px-5 py-3 text-left text-gray-600">결제수단</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {paymentHistory.map((payment, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-5 py-3">{payment.date}</td>
                                            <td className="px-5 py-3 font-mono text-gray-600">{payment.applicationId}</td>
                                            <td className="px-5 py-3">{payment.type}</td>
                                            <td className="px-5 py-3 text-right font-medium">{payment.amount.toLocaleString()}원</td>
                                            <td className="px-5 py-3 text-gray-600">{payment.method}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* 우측: 결제 */}
                <div className="col-span-1 space-y-4">
                    {/* 결제 요약 */}
                    <div className="bg-white rounded-xl p-5 shadow-sm sticky top-[160px]">
                        <h3 className="font-bold text-gray-800 mb-4">결제 정보</h3>
                        
                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">선택 건수</span>
                                <span className="font-medium">{selectedFees.length}건</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">합계 금액</span>
                                <span className="font-medium">{getTotalAmount().toLocaleString()}원</span>
                            </div>
                            <div className="border-t border-gray-200 pt-3 flex justify-between">
                                <span className="font-bold text-gray-800">결제 금액</span>
                                <span className="text-2xl font-bold text-blue-600">{getTotalAmount().toLocaleString()}원</span>
                            </div>
                        </div>

                        {/* 결제 수단 */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">결제 수단</label>
                            <div className="space-y-2">
                                {[
                                    { id: 'card', label: '신용/체크카드', icon: '💳' },
                                    { id: 'transfer', label: '계좌이체', icon: '🏦' },
                                    { id: 'virtual', label: '가상계좌', icon: '📱' }
                                ].map(method => (
                                    <label
                                        key={method.id}
                                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                                            paymentMethod === method.id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-blue-300'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method.id}
                                            checked={paymentMethod === method.id}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-4 h-4"
                                        />
                                        <span>{method.icon}</span>
                                        <span className="text-sm">{method.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={processPayment}
                            disabled={selectedFees.length === 0 || isProcessing}
                            className="w-full btn-submit text-white py-4 rounded-lg font-bold disabled:opacity-50"
                        >
                            {isProcessing ? (
                                <span className="flex items-center justify-center gap-2">
                                    <i className="fas fa-spinner loading-spin"></i>
                                    결제 처리 중...
                                </span>
                            ) : (
                                <span>{getTotalAmount().toLocaleString()}원 결제하기</span>
                            )}
                        </button>

                        <p className="text-xs text-gray-500 text-center mt-3">
                            결제 시 특허청에 자동으로 납부 확인됩니다
                        </p>
                    </div>

                    {/* 수수료 안내 */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <h4 className="font-medium text-blue-800 mb-2">💡 수수료 감면 안내</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                            <li>• 개인/중소기업: 70% 감면</li>
                            <li>• 직무발명 보상금 미지급: 50% 감면</li>
                            <li>• 국가유공자: 면제</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
