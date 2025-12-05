const OpenHashAudit = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">✓ OpenHash 감사 추적</h2>
        <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-600 p-4">
                <p className="font-bold text-green-900">블록체인 무결성: 정상</p>
                <p className="text-sm text-gray-600 mt-1">전체 2,847건 트랜잭션 검증 완료</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
                <StatCard title="검증된 회의록" value="1,234건" />
                <StatCard title="의결 기록" value="856건" />
                <StatCard title="Hash 체인" value="2,847블록" />
            </div>
        </div>
    </div>
);
