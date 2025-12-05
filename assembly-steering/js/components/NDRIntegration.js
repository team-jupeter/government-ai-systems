const NDRIntegration = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🔗 국가 데이터 저장소 연동</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-3 text-blue-600">연동 데이터</h3>
                    <ul className="space-y-2 text-sm">
                        <li>✓ 회의록 및 의사록</li>
                        <li>✓ 안건 심사 결과</li>
                        <li>✓ 위원회 의결 사항</li>
                        <li>✓ 출석 및 표결 기록</li>
                    </ul>
                </div>
                <div className="border rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-3 text-green-600">OpenHash 검증</h3>
                    <ul className="space-y-2 text-sm">
                        <li>✓ 실시간 데이터 무결성 검증</li>
                        <li>✓ 분산 저장 및 백업</li>
                        <li>✓ 위변조 방지 시스템</li>
                        <li>✓ 투명한 이력 관리</li>
                    </ul>
                </div>
            </div>
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                    <strong>연동 상태:</strong> <span className="text-green-600">● 정상 작동</span> | 
                    마지막 동기화: 2025-12-05 17:55:23
                </p>
            </div>
        </div>
    );
};
