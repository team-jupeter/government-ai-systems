const Organization = () => {
    const departments = [
        { name: '기후에너지정책실', staff: 285, desc: '기후·에너지 정책' },
        { name: '에너지전환정책실', staff: 268, desc: '전력·재생에너지' },
        { name: '물관리정책실', staff: 245, desc: '수자원·상하수도' },
        { name: '자연보전국', staff: 185, desc: '생태계·생물다양성' }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-700 to-lime-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">조직 구조</h2>
                <p className="text-green-100 text-sm">기후에너지환경부는 2차관제로 운영됩니다</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-sm text-gray-600">본부 인력</p>
                    <p className="text-2xl font-bold text-green-700">3,150명</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-sm text-gray-600">외청·소속기관</p>
                    <p className="text-2xl font-bold text-lime-700">24개</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-sm text-gray-600">AI 자동화율</p>
                    <p className="text-2xl font-bold text-green-800">98.7%</p>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">수뇌부</h3>
                <div className="space-y-3">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-700">
                        <div className="font-semibold text-gray-900">기후에너지환경부 장관</div>
                        <div className="text-sm text-gray-600 mt-1">김성환 장관 (2025.7~)</div>
                    </div>
                    <div className="p-4 bg-lime-50 rounded-lg border-l-4 border-lime-700">
                        <div className="font-semibold text-gray-900">제1차관 (환경)</div>
                        <div className="text-sm text-gray-700 mt-2">환경·물관리·자연보전 담당</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                        <div className="font-semibold text-gray-900">제2차관 (에너지)</div>
                        <div className="text-sm text-gray-700 mt-2">기후·에너지 전환 담당</div>
                    </div>
                </div>
            </div>
            
            <div className="space-y-4">
                {departments.map((dept, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-gradient-to-r from-green-600 to-lime-600 text-white p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-lg font-bold">{dept.name}</h4>
                                    <p className="text-sm text-green-100 mt-1">{dept.desc}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold">{dept.staff}명</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
window.Organization = Organization;
