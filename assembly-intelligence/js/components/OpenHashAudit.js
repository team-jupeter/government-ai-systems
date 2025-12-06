const OpenHashAudit = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">✓ OpenHash 블록체인 감사</h2>
        
        <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-6">
            <div className="flex items-center gap-3">
                <span className="text-3xl">✓</span>
                <div>
                    <p className="font-bold text-green-900 text-lg">블록체인 무결성: 정상</p>
                    <p className="text-sm text-gray-600 mt-1">전체 1,247건 트랜잭션 검증 완료 (최고 기밀 유지)</p>
                </div>
            </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-indigo-50 border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-indigo-600">1,247</div>
                <div className="text-xs text-gray-600 mt-1">검증된 정보 안건</div>
            </div>
            <div className="bg-green-50 border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">2,749</div>
                <div className="text-xs text-gray-600 mt-1">OpenHash 블록</div>
            </div>
            <div className="bg-blue-50 border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">14</div>
                <div className="text-xs text-gray-600 mt-1">활성 노드</div>
            </div>
            <div className="bg-purple-50 border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">0.21초</div>
                <div className="text-xs text-gray-600 mt-1">평균 검증 시간</div>
            </div>
        </div>

        <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-3">암호화 기술 스택</h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="bg-indigo-50 p-3 rounded">
                    <div className="font-bold text-indigo-900">양자내성 서명</div>
                    <div className="text-gray-600 text-xs mt-1">CRYSTALS-Dilithium (NIST PQC)</div>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                    <div className="font-bold text-blue-900">해시 함수</div>
                    <div className="text-gray-600 text-xs mt-1">SHA-3 (Keccak)</div>
                </div>
                <div className="bg-green-50 p-3 rounded">
                    <div className="font-bold text-green-900">대칭키 암호</div>
                    <div className="text-gray-600 text-xs mt-1">AES-256-GCM</div>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                    <div className="font-bold text-purple-900">머클 트리</div>
                    <div className="text-gray-600 text-xs mt-1">Binary Merkle Tree</div>
                </div>
            </div>
        </div>
    </div>
);
