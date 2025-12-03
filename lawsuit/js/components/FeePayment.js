const FeePayment = () => {
    const [claimAmount, setClaimAmount] = React.useState('');
    const [calculation, setCalculation] = React.useState(null);
    const [paymentMethod, setPaymentMethod] = React.useState('');
    const [isProcessing, setIsProcessing] = React.useState(false);

    const calculateFee = () => {
        const amount = parseInt(claimAmount) || 0;
        if (amount <= 0) {
            alert('청구 금액을 입력해주세요.');
            return;
        }

        let courtFee = 0;

        if (amount <= 10000000) {
            courtFee = amount * 0.005;
        } else if (amount <= 100000000) {
            courtFee = 50000 + (amount - 10000000) * 0.0045;
        } else if (amount <= 1000000000) {
            courtFee = 455000 + (amount - 100000000) * 0.004;
        } else {
            courtFee = 4055000 + (amount - 1000000000) * 0.0035;
        }

        courtFee = Math.max(Math.floor(courtFee), 1000);
        const serviceFee = 52800;
        const total = courtFee + serviceFee;

        const lawyerFee = Math.max(amount * 0.1, 3000000);
        const savings = lawyerFee - total;
        const savingsPercent = ((savings / lawyerFee) * 100).toFixed(1);

        setCalculation({
            claimAmount: amount,
            courtFee,
            serviceFee,
            total,
            lawyerFee,
            savings,
            savingsPercent
        });
    };

    const processPayment = () => {
        if (!paymentMethod) {
            alert('결제 방법을 선택해주세요.');
            return;
        }
        
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            alert('결제가 완료되었습니다. 서류 제출 단계로 이동합니다.');
        }, 2000);
    };

    return (
        <div className="p-6">
            <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-xl font-bold mb-4">
                        <i className="fas fa-calculator mr-2 text-blue-600"></i>소송 비용 계산기
                    </h2>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">청구 금액</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₩</span>
                                <input
                                    type="number"
                                    value={claimAmount}
                                    onChange={e => setClaimAmount(e.target.value)}
                                    placeholder="50000000"
                                    className="w-full border rounded-lg pl-10 pr-4 py-3 focus:border-blue-500 focus:outline-none text-lg"
                                />
                            </div>
                            {claimAmount && (
                                <p className="text-sm text-blue-600 mt-2">
                                    {parseInt(claimAmount).toLocaleString()}원
                                </p>
                            )}

                            <button 
                                onClick={calculateFee} 
                                className="w-full mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                            >
                                <i className="fas fa-calculator mr-2"></i>비용 계산
                            </button>

                            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h4 className="font-bold text-blue-800 mb-2">
                                    <i className="fas fa-info-circle mr-2"></i>인지대 계산 기준
                                </h4>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    <li>• 1,000만원 이하: 소가의 0.5%</li>
                                    <li>• 1,000만원~1억원: 5만원 + 초과분의 0.45%</li>
                                    <li>• 1억원~10억원: 45.5만원 + 초과분의 0.4%</li>
                                    <li>• 10억원 초과: 405.5만원 + 초과분의 0.35%</li>
                                </ul>
                            </div>
                        </div>

                        {calculation && (
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="font-bold text-lg mb-4">비용 내역</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">인지대</span>
                                        <span className="font-bold">₩{calculation.courtFee.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">송달료</span>
                                        <span className="font-bold">₩{calculation.serviceFee.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600 flex items-center gap-2">
                                            AI 서비스
                                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">무료</span>
                                        </span>
                                        <span className="font-bold text-green-600">₩0</span>
                                    </div>
                                    <div className="flex justify-between py-3 bg-blue-100 rounded-lg px-4 -mx-4">
                                        <span className="font-bold text-lg">총 비용</span>
                                        <span className="font-bold text-lg text-blue-600">
                                            ₩{calculation.total.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {calculation && (
                    <>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                                <h4 className="font-bold text-red-800 mb-4">
                                    <i className="fas fa-times-circle mr-2"></i>기존 변호사 비용
                                </h4>
                                <div className="text-3xl font-bold text-red-600 mb-2">
                                    ₩{calculation.lawyerFee.toLocaleString()}
                                </div>
                                <p className="text-sm text-red-500">착수금 + 성공보수 + 실비 예상</p>
                                <ul className="mt-4 text-sm text-red-600 space-y-1">
                                    <li>• 착수금: 300만원~</li>
                                    <li>• 성공보수: 인용액의 10~15%</li>
                                    <li>• 기타 실비: 50만원~</li>
                                </ul>
                            </div>
                            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                                <h4 className="font-bold text-green-800 mb-4">
                                    <i className="fas fa-check-circle mr-2"></i>AI 전자소송 비용
                                </h4>
                                <div className="text-3xl font-bold text-green-600 mb-2">
                                    ₩{calculation.total.toLocaleString()}
                                </div>
                                <p className="text-sm text-green-500">
                                    {calculation.savingsPercent}% 절감 
                                    (₩{calculation.savings.toLocaleString()} 절약)
                                </p>
                                <ul className="mt-4 text-sm text-green-600 space-y-1">
                                    <li>• AI 소장 작성: 무료</li>
                                    <li>• AI 승소율 예측: 무료</li>
                                    <li>• AI 모의재판: 무료</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="font-bold text-lg mb-4">
                                <i className="fas fa-credit-card mr-2 text-blue-600"></i>수수료 납부
                            </h3>
                            
                            <div className="grid grid-cols-4 gap-4 mb-6">
                                <button 
                                    onClick={() => setPaymentMethod('bank')}
                                    className={`p-4 border-2 rounded-lg text-center transition ${
                                        paymentMethod === 'bank' 
                                            ? 'border-blue-500 bg-blue-50' 
                                            : 'border-gray-200 hover:border-blue-300'
                                    }`}
                                >
                                    <i className="fas fa-university text-2xl text-blue-600 mb-2"></i>
                                    <p className="font-medium text-sm">계좌이체</p>
                                </button>
                                <button 
                                    onClick={() => setPaymentMethod('card')}
                                    className={`p-4 border-2 rounded-lg text-center transition ${
                                        paymentMethod === 'card' 
                                            ? 'border-blue-500 bg-blue-50' 
                                            : 'border-gray-200 hover:border-blue-300'
                                    }`}
                                >
                                    <i className="fas fa-credit-card text-2xl text-green-600 mb-2"></i>
                                    <p className="font-medium text-sm">신용카드</p>
                                </button>
                                <button 
                                    onClick={() => setPaymentMethod('simple')}
                                    className={`p-4 border-2 rounded-lg text-center transition ${
                                        paymentMethod === 'simple' 
                                            ? 'border-blue-500 bg-blue-50' 
                                            : 'border-gray-200 hover:border-blue-300'
                                    }`}
                                >
                                    <i className="fas fa-mobile-alt text-2xl text-purple-600 mb-2"></i>
                                    <p className="font-medium text-sm">간편결제</p>
                                </button>
                                <button 
                                    onClick={() => setPaymentMethod('virtual')}
                                    className={`p-4 border-2 rounded-lg text-center transition ${
                                        paymentMethod === 'virtual' 
                                            ? 'border-blue-500 bg-blue-50' 
                                            : 'border-gray-200 hover:border-blue-300'
                                    }`}
                                >
                                    <i className="fas fa-file-invoice text-2xl text-orange-600 mb-2"></i>
                                    <p className="font-medium text-sm">가상계좌</p>
                                </button>
                            </div>

                            {paymentMethod && (
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500">결제 금액</p>
                                            <p className="text-2xl font-bold text-blue-600">
                                                ₩{calculation.total.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">결제 방법</p>
                                            <p className="font-medium">
                                                {paymentMethod === 'bank' && '계좌이체'}
                                                {paymentMethod === 'card' && '신용카드'}
                                                {paymentMethod === 'simple' && '간편결제'}
                                                {paymentMethod === 'virtual' && '가상계좌'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button 
                                onClick={processPayment}
                                disabled={!paymentMethod || isProcessing}
                                className="w-full bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                            >
                                {isProcessing ? (
                                    <><i className="fas fa-spinner fa-spin mr-2"></i>결제 처리 중...</>
                                ) : (
                                    <><i className="fas fa-lock mr-2"></i>결제하기</>
                                )}
                            </button>

                            <p className="text-center text-sm text-gray-500 mt-4">
                                <i className="fas fa-shield-alt mr-1"></i>
                                안전한 결제를 위해 SSL 암호화가 적용됩니다.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
