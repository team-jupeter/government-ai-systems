const { useState } = React;

function Tab1ExtendedStatement() {
    const [transactionType, setTransactionType] = useState('financial');
    const [formData, setFormData] = useState({
        who: '홍길동',
        when: '2025-01-15 14:30',
        where: '서울시 강남구',
        what: '컨설팅 용역',
        how: '계좌이체',
        why: '업무 서비스 제공',
        amount: 1000000,
        counterparty: 'ABC 주식회사'
    });
    const [record, setRecord] = useState(null);

    const transactionTypes = [
        { id: 'financial', name: '금전 거래', icon: 'fa-won-sign' },
        { id: 'goods', name: '물품 거래', icon: 'fa-box' },
        { id: 'service', name: '서비스 거래', icon: 'fa-handshake' },
        { id: 'information', name: '정보 교환', icon: 'fa-info-circle' },
        { id: 'activity', name: '일반 활동', icon: 'fa-clipboard-list' }
    ];

    const generateRecord = () => {
        const newRecord = {
            ...formData,
            type: transactionType,
            timestamp: new Date().toISOString(),
            record_id: Math.random().toString(36).substr(2, 9)
        };

        if (transactionType === 'financial') {
            newRecord.debit = { account: '비용', amount: formData.amount };
            newRecord.credit = { account: '현금', amount: formData.amount };
        }

        const recordHash = Array(64).fill(0).map(() => 
            Math.floor(Math.random() * 16).toString(16)
        ).join('');
        newRecord.hash = recordHash;

        setRecord(newRecord);
    };

    return (
        <div className="space-y-6">
            {/* 개요 */}
            <div className="bg-blue-50 border-l-4 border-gov-blue p-4">
                <p className="text-sm text-gov-text">
                    확장 재무제표는 <span className="font-bold text-gov-blue">6하 원칙</span>(누가, 언제, 어디서, 무엇을, 어떻게, 왜)에 따라 
                    모든 경제활동과 일상 활동을 체계적으로 기록합니다.
                </p>
            </div>

            {/* 거래 유형 선택 */}
            <div>
                <h4 className="text-base font-bold text-gov-text mb-3">거래 유형 선택</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {transactionTypes.map(type => (
                        <button
                            key={type.id}
                            onClick={() => setTransactionType(type.id)}
                            className={`p-3 rounded-lg border-2 transition-all ${
                                transactionType === type.id
                                    ? 'border-gov-blue bg-blue-50 text-gov-blue'
                                    : 'border-gov-border bg-white hover:border-gov-blue-light'
                            }`}
                        >
                            <i className={`fas ${type.icon} text-lg mb-1`}></i>
                            <div className="text-xs font-medium">{type.name}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* 6하 원칙 입력 폼 */}
            <div>
                <h4 className="text-base font-bold text-gov-text mb-3">6하 원칙 입력</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gov-text mb-1">
                            <i className="fas fa-user text-gov-blue mr-1"></i> 누가 (Who)
                        </label>
                        <input
                            type="text"
                            value={formData.who}
                            onChange={(e) => setFormData({...formData, who: e.target.value})}
                            className="w-full px-3 py-2 border border-gov-border rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gov-text mb-1">
                            <i className="fas fa-clock text-gov-blue mr-1"></i> 언제 (When)
                        </label>
                        <input
                            type="text"
                            value={formData.when}
                            onChange={(e) => setFormData({...formData, when: e.target.value})}
                            className="w-full px-3 py-2 border border-gov-border rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gov-text mb-1">
                            <i className="fas fa-map-marker-alt text-gov-blue mr-1"></i> 어디서 (Where)
                        </label>
                        <input
                            type="text"
                            value={formData.where}
                            onChange={(e) => setFormData({...formData, where: e.target.value})}
                            className="w-full px-3 py-2 border border-gov-border rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gov-text mb-1">
                            <i className="fas fa-info-circle text-gov-blue mr-1"></i> 무엇을 (What)
                        </label>
                        <input
                            type="text"
                            value={formData.what}
                            onChange={(e) => setFormData({...formData, what: e.target.value})}
                            className="w-full px-3 py-2 border border-gov-border rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gov-text mb-1">
                            <i className="fas fa-cog text-gov-blue mr-1"></i> 어떻게 (How)
                        </label>
                        <input
                            type="text"
                            value={formData.how}
                            onChange={(e) => setFormData({...formData, how: e.target.value})}
                            className="w-full px-3 py-2 border border-gov-border rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gov-text mb-1">
                            <i className="fas fa-question-circle text-gov-blue mr-1"></i> 왜 (Why)
                        </label>
                        <input
                            type="text"
                            value={formData.why}
                            onChange={(e) => setFormData({...formData, why: e.target.value})}
                            className="w-full px-3 py-2 border border-gov-border rounded text-sm"
                        />
                    </div>
                </div>

                {transactionType === 'financial' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gov-text mb-1">
                                <i className="fas fa-won-sign text-gov-blue mr-1"></i> 금액
                            </label>
                            <input
                                type="number"
                                value={formData.amount}
                                onChange={(e) => setFormData({...formData, amount: parseInt(e.target.value)})}
                                className="w-full px-3 py-2 border border-gov-border rounded text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gov-text mb-1">
                                <i className="fas fa-building text-gov-blue mr-1"></i> 거래 상대방
                            </label>
                            <input
                                type="text"
                                value={formData.counterparty}
                                onChange={(e) => setFormData({...formData, counterparty: e.target.value})}
                                className="w-full px-3 py-2 border border-gov-border rounded text-sm"
                            />
                        </div>
                    </div>
                )}
            </div>

            <button
                onClick={generateRecord}
                className="w-full bg-gov-blue text-white py-3 rounded-lg font-bold hover:bg-gov-blue-light text-sm"
            >
                <i className="fas fa-save mr-2"></i>
                레코드 생성
            </button>

            {/* 생성된 레코드 */}
            {record && (
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                    <h5 className="font-bold text-green-700 mb-3 text-sm">
                        ✓ 레코드 생성 완료
                    </h5>
                    <div className="bg-white rounded p-3 mb-3">
                        <pre className="text-xs overflow-x-auto">{JSON.stringify(record, null, 2)}</pre>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                        <div className="text-xs font-semibold text-blue-700 mb-1">
                            오픈해시 시스템 저장
                        </div>
                        <div className="font-mono text-xs break-all text-gray-600">
                            {record.hash}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
