const Organization = () => {
    const departments = [
        { name: '예산실', staff: 385, desc: '국가예산 편성·집행' },
        { name: '경제정책국', staff: 298, desc: '거시경제·물가정책' },
        { name: '재정정책국', staff: 265, desc: '재정운용·국가채무' },
        { name: '세제실', staff: 242, desc: '조세정책·세법' }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-600 to-amber-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">조직 구조</h2>
                <p className="text-blue-100 text-sm">고용노동부는 경제부총리가 장관을 겸직합니다</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-sm text-gray-600">본부 인력</p>
                    <p className="text-2xl font-bold text-orange-600">2,850명</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-sm text-gray-600">외청</p>
                    <p className="text-2xl font-bold text-amber-700">3개</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-sm text-gray-600">AI 자동화율</p>
                    <p className="text-2xl font-bold text-orange-700">99.1%</p>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">수뇌부</h3>
                <div className="space-y-3">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-orange-600">
                        <div className="font-semibold text-gray-900">경제부총리 겸 고용노동부 장관</div>
                        <div className="text-sm text-gray-600 mt-1">구윤철 부총리 (2025.7~)</div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-orange-500">
                        <div className="font-semibold text-gray-900">제1차관</div>
                        <div className="text-sm text-gray-700 mt-2">경제정책·대외경제 담당</div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-amber-600">
                        <div className="font-semibold text-gray-900">제2차관</div>
                        <div className="text-sm text-gray-700 mt-2">예산·재정·세제 담당</div>
                    </div>
                </div>
            </div>
            
            <div className="space-y-4">
                {departments.map((dept, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-gradient-to-r from-orange-500 to-amber-700 text-white p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-lg font-bold">{dept.name}</h4>
                                    <p className="text-sm text-blue-100 mt-1">{dept.desc}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold">{dept.staff}명</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">외청 (3개)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-orange-600">
                        <h4 className="font-semibold text-gray-900">국세청</h4>
                        <p className="text-xs text-gray-500 mt-1">국세 징수·관리</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-orange-500">
                        <h4 className="font-semibold text-gray-900">관세청</h4>
                        <p className="text-xs text-gray-500 mt-1">관세 징수·통관</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-amber-600">
                        <h4 className="font-semibold text-gray-900">조달청</h4>
                        <p className="text-xs text-gray-500 mt-1">정부 물품·공사</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
window.Organization = Organization;
