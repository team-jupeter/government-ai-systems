const NDRIntegration = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🔗 국가데이터저장소 연동</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-3 text-blue-600">연동 데이터</h3>
                    <ul className="space-y-2 text-sm">
                        <li>✓ 금융거래 데이터 (실시간)</li>
                        <li>✓ 공정거래 위반 사례</li>
                        <li>✓ 개인정보 보호 현황</li>
                        <li>✓ 국민 민원 처리 기록</li>
                    </ul>
                </div>
                <div className="border rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-3 text-green-600">OpenHash 검증</h3>
                    <ul className="space-y-2 text-sm">
                        <li>✓ 금융감독 조치 기록</li>
                        <li>✓ 과징금 부과 내역</li>
                        <li>✓ 위원회 의결 사항</li>
                        <li>✓ 위변조 방지 시스템</li>
                    </ul>
                </div>
            </div>
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                    <strong>연동 상태:</strong> <span className="text-green-600">● 정상 작동</span> | 
                    마지막 동기화: 2025-12-06 10:15:42
                </p>
            </div>
        </div>
    );
};
