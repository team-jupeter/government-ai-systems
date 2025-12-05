const Organization = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">조직 구조</h2>
                <p className="text-purple-100 text-sm">성평등가족부는 2025년 10월 1일 확대 개편되었습니다</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-sm text-gray-600">본부 인력</p>
                    <p className="text-2xl font-bold text-purple-600">685명</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-sm text-gray-600">산하기관</p>
                    <p className="text-2xl font-bold text-pink-600">15개</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-sm text-gray-600">AI 자동화율</p>
                    <p className="text-2xl font-bold text-purple-700">98.3%</p>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">수뇌부</h3>
                <div className="space-y-3">
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600">
                        <div className="font-semibold text-gray-900">성평등가족부 장관</div>
                        <div className="text-sm text-gray-600 mt-1">원민경 장관 (2025.10~)</div>
                    </div>
                    <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-600">
                        <div className="font-semibold text-gray-900">차관</div>
                        <div className="text-sm text-gray-700 mt-2">성평등·가족·청소년 정책 총괄</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
window.Organization = Organization;
