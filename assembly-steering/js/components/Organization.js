const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">👥 조직 구성</h2>
            <div className="space-y-6">
                <div className="border-l-4 border-blue-600 pl-4">
                    <h3 className="font-bold text-lg mb-2">위원장</h3>
                    <p className="text-gray-600">위원회 대표 및 회의 주재</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-lg mb-2">간사 (여야 각 1인)</h3>
                    <p className="text-gray-600">위원회 업무 조정 및 의사 진행 보좌</p>
                </div>
                <div className="border-l-4 border-blue-400 pl-4">
                    <h3 className="font-bold text-lg mb-2">위원 (약 20인)</h3>
                    <p className="text-gray-600">안건 심사 및 의결 참여</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg mt-6">
                    <h3 className="font-bold mb-3">소관 부처</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center"><span className="text-blue-600 mr-2">▸</span> 국회사무처</li>
                        <li className="flex items-center"><span className="text-blue-600 mr-2">▸</span> 국회도서관</li>
                        <li className="flex items-center"><span className="text-blue-600 mr-2">▸</span> 국회예산정책처</li>
                        <li className="flex items-center"><span className="text-blue-600 mr-2">▸</span> 국회입법조사처</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
