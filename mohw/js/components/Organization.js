const Organization = () => {
    const departments = [
        { name: '사회복지정책실', head: '실장(고위공무원)', staff: 245, description: '사회보장·복지', aiAutomation: 99, functions: ['기초생활보장', '사회서비스', '자활지원', '복지정책'] },
        { name: '보건의료정책실', head: '실장(고위공무원)', staff: 228, description: '건강보험·의료', aiAutomation: 99, functions: ['건강보험정책', '의료정책', '의료자원', '공공의료'] },
        { name: '인구정책실', head: '실장(고위공무원)', staff: 195, description: '저출산·고령', aiAutomation: 98, functions: ['저출산 대응', '아동복지', '노인복지', '인구정책'] },
        { name: '장애인정책국', head: '국장(고위공무원)', staff: 168, description: '장애인 복지', aiAutomation: 98, functions: ['장애인복지', '장애인권익', '재활지원', '활동지원'] }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-cyan-700 to-teal-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">조직 구조</h2>
                <p className="text-cyan-100 text-sm">보건복지부는 장관·차관(2명) 산하 4개 실·국으로 구성됩니다</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-sm text-gray-600">본부 인력</p>
                    <p className="text-2xl font-bold text-cyan-700">2,580명</p>
                    <span className="text-3xl">👥</span>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-sm text-gray-600">소속기관</p>
                    <p className="text-2xl font-bold text-teal-700">18개</p>
                    <span className="text-3xl">🏛️</span>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <p className="text-sm text-gray-600">AI 자동화율</p>
                    <p className="text-2xl font-bold text-cyan-800">98.9%</p>
                    <span className="text-3xl">🤖</span>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">수뇌부 구성</h3>
                <div className="space-y-3">
                    <div className="p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-700">
                        <div className="font-semibold text-gray-900">보건복지부장관 (국무위원)</div>
                        <div className="text-sm text-gray-600 mt-1">정은경 장관 (2025.7~)</div>
                        <div className="text-sm text-gray-700 mt-2">보건·의료·복지 총괄</div>
                    </div>
                    <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-700">
                        <div className="font-semibold text-gray-900">제1차관 (정무직)</div>
                        <div className="text-sm text-gray-700 mt-2">사회복지·인구·장애인 정책 담당</div>
                    </div>
                    <div className="p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-600">
                        <div className="font-semibold text-gray-900">제2차관 (정무직)</div>
                        <div className="text-sm text-gray-700 mt-2">보건의료·건강보험 정책 담당</div>
                    </div>
                </div>
            </div>
            
            <div className="space-y-4">
                {departments.map((dept, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-lg font-bold">{dept.name}</h4>
                                    <p className="text-sm text-cyan-100 mt-1">{dept.description}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold">{dept.staff}명</div>
                                    <div className="text-xs text-cyan-200">{dept.head}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">외청 (2개)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-700">
                        <h4 className="font-semibold text-gray-900">질병관리청</h4>
                        <p className="text-sm text-gray-600 mt-1">청장: 차관급</p>
                        <p className="text-xs text-gray-500 mt-1">감염병 예방·관리</p>
                    </div>
                    <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-700">
                        <h4 className="font-semibold text-gray-900">식품의약품안전처</h4>
                        <p className="text-sm text-gray-600 mt-1">처장: 차관급</p>
                        <p className="text-xs text-gray-500 mt-1">식품·의약품 안전</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
window.Organization = Organization;
