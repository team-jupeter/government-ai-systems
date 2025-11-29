const QualityEvaluation = () => {
    const [activeTab, setActiveTab] = React.useState('cooking');
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [showExitModal, setShowExitModal] = React.useState(null);
    const [animationTick, setAnimationTick] = React.useState(0);

    const RechartsLib = window.Recharts || {};
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } = RechartsLib;
    const chartsAvailable = BarChart && ResponsiveContainer;

    React.useEffect(() => {
        const interval = setInterval(() => {
            setAnimationTick(prev => (prev + 1) % 100);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // 등급 기준
    const gradeStandards = {
        'S': { min: 95, color: 'purple', label: '최우수', description: '업계 최고 수준' },
        'A': { min: 85, color: 'green', label: '우수', description: '기준 초과 달성' },
        'B': { min: 75, color: 'cyan', label: '양호', description: '기준 충족' },
        'C': { min: 65, color: 'yellow', label: '보통', description: '개선 권고' },
        'D': { min: 50, color: 'orange', label: '미흡', description: '시정 조치 필요' },
        'F': { min: 0, color: 'red', label: '부적합', description: '퇴출 대상' }
    };

    const getGrade = (score) => {
        if (score >= 95) return 'S';
        if (score >= 85) return 'A';
        if (score >= 75) return 'B';
        if (score >= 65) return 'C';
        if (score >= 50) return 'D';
        return 'F';
    };

    const getGradeStyle = (grade) => {
        const g = gradeStandards[grade];
        return 'text-' + g.color + '-400 bg-' + g.color + '-500/20 border-' + g.color + '-500/50';
    };

    // 조리 시설 평가 데이터
    const cookingFacilities = [
        { id: 'KIT-001', name: '서울 강남구 역삼1동 급식센터', region: '서울', scores: { hygiene: 98, equipment: 95, staff: 92, output: 96, safety: 97 }, totalScore: 95.6, trend: 'up', issues: 0, lastAudit: '2025-11-25' },
        { id: 'KIT-002', name: '서울 송파구 잠실3동 급식센터', region: '서울', scores: { hygiene: 92, equipment: 88, staff: 90, output: 94, safety: 91 }, totalScore: 91.0, trend: 'stable', issues: 1, lastAudit: '2025-11-24' },
        { id: 'KIT-003', name: '경기 성남시 분당1동 급식센터', region: '경기', scores: { hygiene: 88, equipment: 85, staff: 82, output: 86, safety: 89 }, totalScore: 86.0, trend: 'up', issues: 2, lastAudit: '2025-11-23' },
        { id: 'KIT-004', name: '부산 해운대구 우동 급식센터', region: '부산', scores: { hygiene: 78, equipment: 75, staff: 72, output: 80, safety: 76 }, totalScore: 76.2, trend: 'down', issues: 5, lastAudit: '2025-11-22' },
        { id: 'KIT-005', name: '대구 수성구 범어동 급식센터', region: '대구', scores: { hygiene: 68, equipment: 65, staff: 62, output: 70, safety: 66 }, totalScore: 66.2, trend: 'down', issues: 8, lastAudit: '2025-11-20' },
        { id: 'KIT-006', name: '인천 남동구 논현동 급식센터', region: '인천', scores: { hygiene: 52, equipment: 48, staff: 45, output: 55, safety: 50 }, totalScore: 50.0, trend: 'down', issues: 15, lastAudit: '2025-11-18' },
        { id: 'KIT-007', name: '광주 북구 운암동 급식센터', region: '광주', scores: { hygiene: 42, equipment: 38, staff: 35, output: 45, safety: 40 }, totalScore: 40.0, trend: 'down', issues: 22, lastAudit: '2025-11-15' }
    ];

    // 저장 시설 평가 데이터
    const storageFacilities = [
        { id: 'STR-001', name: '경기 화성 물류센터', type: '냉장/냉동', scores: { temperature: 98, humidity: 96, cleanliness: 94, capacity: 92, monitoring: 97 }, totalScore: 95.4, trend: 'stable', issues: 0, lastAudit: '2025-11-26' },
        { id: 'STR-002', name: '충남 천안 곡물창고', type: '상온', scores: { temperature: 90, humidity: 88, cleanliness: 85, capacity: 92, monitoring: 89 }, totalScore: 88.8, trend: 'up', issues: 1, lastAudit: '2025-11-25' },
        { id: 'STR-003', name: '전남 나주 농산물센터', type: '저온', scores: { temperature: 82, humidity: 78, cleanliness: 80, capacity: 85, monitoring: 79 }, totalScore: 80.8, trend: 'stable', issues: 3, lastAudit: '2025-11-24' },
        { id: 'STR-004', name: '경북 안동 축산물창고', type: '냉동', scores: { temperature: 72, humidity: 68, cleanliness: 70, capacity: 75, monitoring: 71 }, totalScore: 71.2, trend: 'down', issues: 6, lastAudit: '2025-11-22' },
        { id: 'STR-005', name: '강원 원주 물류창고', type: '복합', scores: { temperature: 58, humidity: 52, cleanliness: 55, capacity: 60, monitoring: 54 }, totalScore: 55.8, trend: 'down', issues: 12, lastAudit: '2025-11-18' },
        { id: 'STR-006', name: '제주 서귀포 수산물창고', type: '냉동', scores: { temperature: 45, humidity: 42, cleanliness: 40, capacity: 48, monitoring: 44 }, totalScore: 43.8, trend: 'down', issues: 18, lastAudit: '2025-11-12' }
    ];

    // 식량 생산 시설 평가
    const productionFacilities = [
        { id: 'PRD-001', name: '전남 해남 스마트팜', type: '농업', product: '배추', scores: { quality: 96, yield: 94, sustainability: 92, safety: 98, efficiency: 95 }, totalScore: 95.0, trend: 'up', issues: 0, lastAudit: '2025-11-25' },
        { id: 'PRD-002', name: '경북 안동 한우농장', type: '축산', product: '한우', scores: { quality: 92, yield: 88, sustainability: 85, safety: 94, efficiency: 90 }, totalScore: 89.8, trend: 'stable', issues: 1, lastAudit: '2025-11-24' },
        { id: 'PRD-003', name: '부산 기장 수산양식장', type: '수산', product: '광어', scores: { quality: 85, yield: 82, sustainability: 80, safety: 88, efficiency: 84 }, totalScore: 83.8, trend: 'up', issues: 2, lastAudit: '2025-11-23' },
        { id: 'PRD-004', name: '충남 당진 양돈농장', type: '축산', product: '돼지', scores: { quality: 75, yield: 72, sustainability: 68, safety: 78, efficiency: 74 }, totalScore: 73.4, trend: 'down', issues: 5, lastAudit: '2025-11-20' },
        { id: 'PRD-005', name: '전북 김제 미곡센터', type: '농업', product: '쌀', scores: { quality: 62, yield: 58, sustainability: 55, safety: 65, efficiency: 60 }, totalScore: 60.0, trend: 'down', issues: 9, lastAudit: '2025-11-15' },
        { id: 'PRD-006', name: '경남 함안 채소농장', type: '농업', product: '양파', scores: { quality: 48, yield: 45, sustainability: 42, safety: 52, efficiency: 46 }, totalScore: 46.6, trend: 'down', issues: 16, lastAudit: '2025-11-10' }
    ];

    // 도시락 품질 평가
    const lunchboxQuality = [
        { id: 'LBX-001', name: '프리미엄 한식 도시락', type: '한식', scores: { taste: 98, nutrition: 96, freshness: 97, presentation: 95, safety: 99 }, totalScore: 97.0, trend: 'stable', complaints: 0, dailyVolume: 125000 },
        { id: 'LBX-002', name: '건강 저염식 도시락', type: '건강식', scores: { taste: 92, nutrition: 98, freshness: 94, presentation: 88, safety: 96 }, totalScore: 93.6, trend: 'up', complaints: 2, dailyVolume: 85000 },
        { id: 'LBX-003', name: '어린이 영양 도시락', type: '아동식', scores: { taste: 95, nutrition: 94, freshness: 92, presentation: 96, safety: 98 }, totalScore: 95.0, trend: 'stable', complaints: 1, dailyVolume: 280000 },
        { id: 'LBX-004', name: '시니어 연식 도시락', type: '시니어', scores: { taste: 88, nutrition: 92, freshness: 86, presentation: 82, safety: 94 }, totalScore: 88.4, trend: 'up', complaints: 3, dailyVolume: 420000 },
        { id: 'LBX-005', name: '일반 급식 도시락', type: '일반식', scores: { taste: 78, nutrition: 75, freshness: 80, presentation: 72, safety: 85 }, totalScore: 78.0, trend: 'down', complaints: 15, dailyVolume: 1850000 },
        { id: 'LBX-006', name: '경제형 도시락', type: '경제형', scores: { taste: 65, nutrition: 62, freshness: 68, presentation: 58, safety: 75 }, totalScore: 65.6, trend: 'down', complaints: 45, dailyVolume: 520000 }
    ];

    // 식량 품목 품질 평가
    const foodItems = [
        { id: 'FOOD-001', name: '국내산 쌀', category: '곡류', origin: '전라북도', scores: { freshness: 98, safety: 99, nutrition: 96, taste: 97, certification: 100 }, totalScore: 98.0, trend: 'stable', rejectionRate: 0.1 },
        { id: 'FOOD-002', name: '한우 1등급', category: '육류', origin: '경상북도', scores: { freshness: 96, safety: 98, nutrition: 94, taste: 99, certification: 100 }, totalScore: 97.4, trend: 'stable', rejectionRate: 0.2 },
        { id: 'FOOD-003', name: '무항생제 계란', category: '난류', origin: '충청남도', scores: { freshness: 94, safety: 96, nutrition: 92, taste: 90, certification: 98 }, totalScore: 94.0, trend: 'up', rejectionRate: 0.5 },
        { id: 'FOOD-004', name: '유기농 배추', category: '채소', origin: '강원도', scores: { freshness: 92, safety: 94, nutrition: 90, taste: 88, certification: 96 }, totalScore: 92.0, trend: 'up', rejectionRate: 0.8 },
        { id: 'FOOD-005', name: '국내산 돼지고기', category: '육류', origin: '경기도', scores: { freshness: 85, safety: 88, nutrition: 82, taste: 86, certification: 90 }, totalScore: 86.2, trend: 'stable', rejectionRate: 1.2 },
        { id: 'FOOD-006', name: '양식 광어', category: '수산물', origin: '제주도', scores: { freshness: 78, safety: 82, nutrition: 75, taste: 80, certification: 85 }, totalScore: 80.0, trend: 'down', rejectionRate: 2.5 },
        { id: 'FOOD-007', name: '수입 오징어', category: '수산물', origin: '페루', scores: { freshness: 65, safety: 70, nutrition: 68, taste: 62, certification: 72 }, totalScore: 67.4, trend: 'down', rejectionRate: 5.8 },
        { id: 'FOOD-008', name: '중국산 마늘', category: '채소', origin: '중국', scores: { freshness: 55, safety: 58, nutrition: 52, taste: 50, certification: 60 }, totalScore: 55.0, trend: 'down', rejectionRate: 12.5 }
    ];

    // 인력 평가 데이터
    const staffEvaluation = [
        { id: 'STAFF-001', name: '김영호', role: '조리장', facility: 'KIT-001', scores: { skill: 98, hygiene: 96, attendance: 100, teamwork: 95, efficiency: 97 }, totalScore: 97.2, trend: 'stable', warnings: 0, tenure: '8년' },
        { id: 'STAFF-002', name: '이미경', role: '영양사', facility: 'KIT-002', scores: { skill: 92, hygiene: 94, attendance: 98, teamwork: 90, efficiency: 91 }, totalScore: 93.0, trend: 'up', warnings: 0, tenure: '5년' },
        { id: 'STAFF-003', name: '박준혁', role: '위생관리사', facility: 'KIT-003', scores: { skill: 85, hygiene: 92, attendance: 88, teamwork: 82, efficiency: 84 }, totalScore: 86.2, trend: 'stable', warnings: 1, tenure: '3년' },
        { id: 'STAFF-004', name: '최수연', role: '부조리장', facility: 'KIT-004', scores: { skill: 72, hygiene: 75, attendance: 70, teamwork: 68, efficiency: 71 }, totalScore: 71.2, trend: 'down', warnings: 3, tenure: '2년' },
        { id: 'STAFF-005', name: '정민우', role: '조리원', facility: 'KIT-005', scores: { skill: 58, hygiene: 55, attendance: 52, teamwork: 50, efficiency: 54 }, totalScore: 53.8, trend: 'down', warnings: 5, tenure: '1년' },
        { id: 'STAFF-006', name: '한지원', role: '배송기사', facility: 'KIT-006', scores: { skill: 45, hygiene: 42, attendance: 38, teamwork: 40, efficiency: 44 }, totalScore: 41.8, trend: 'down', warnings: 8, tenure: '6개월' }
    ];

    const getCurrentData = () => {
        switch(activeTab) {
            case 'cooking': return { data: cookingFacilities, type: '조리 시설', scoreLabels: ['위생', '장비', '인력', '생산량', '안전'] };
            case 'storage': return { data: storageFacilities, type: '저장 시설', scoreLabels: ['온도관리', '습도관리', '청결도', '용량', '모니터링'] };
            case 'production': return { data: productionFacilities, type: '생산 시설', scoreLabels: ['품질', '생산량', '지속가능성', '안전성', '효율성'] };
            case 'lunchbox': return { data: lunchboxQuality, type: '도시락', scoreLabels: ['맛', '영양', '신선도', '외관', '안전'] };
            case 'food': return { data: foodItems, type: '식량 품목', scoreLabels: ['신선도', '안전성', '영양', '맛', '인증'] };
            case 'staff': return { data: staffEvaluation, type: '인력', scoreLabels: ['숙련도', '위생', '출근', '협동', '효율'] };
            default: return { data: cookingFacilities, type: '조리 시설', scoreLabels: [] };
        }
    };

    const handleExit = (item) => {
        setShowExitModal(item);
    };

    const confirmExit = () => {
        alert('퇴출 절차가 시작되었습니다. 관련 부서에 통보됩니다.');
        setShowExitModal(null);
    };

    const tabConfig = [
        { id: 'cooking', name: '조리 시설', icon: '🍳', count: cookingFacilities.length },
        { id: 'storage', name: '저장 시설', icon: '🏭', count: storageFacilities.length },
        { id: 'production', name: '생산 시설', icon: '🌾', count: productionFacilities.length },
        { id: 'lunchbox', name: '도시락', icon: '🍱', count: lunchboxQuality.length },
        { id: 'food', name: '식량 품목', icon: '🥬', count: foodItems.length },
        { id: 'staff', name: '인력', icon: '👨‍🍳', count: staffEvaluation.length }
    ];

    const currentData = getCurrentData();

    // 통계 계산
    const stats = {
        total: currentData.data.length,
        excellent: currentData.data.filter(d => d.totalScore >= 85).length,
        warning: currentData.data.filter(d => d.totalScore >= 50 && d.totalScore < 65).length,
        exit: currentData.data.filter(d => d.totalScore < 50).length,
        avgScore: (currentData.data.reduce((sum, d) => sum + d.totalScore, 0) / currentData.data.length).toFixed(1)
    };

    return (
        <div className="space-y-6">
            {/* 퇴출 모달 */}
            {showExitModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-gray-900 rounded-2xl max-w-lg w-full border border-red-500/50">
                        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 rounded-t-2xl">
                            <h3 className="text-xl font-bold flex items-center">
                                <i className="fas fa-exclamation-triangle mr-3"></i>
                                퇴출 절차 확인
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
                                <div className="font-bold text-lg mb-2">{showExitModal.name}</div>
                                <div className="text-sm text-gray-400">평가 점수: <span className="text-red-400 font-bold">{showExitModal.totalScore}점 (F등급)</span></div>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="font-medium text-yellow-400">퇴출 절차:</div>
                                <div className="flex items-start space-x-2">
                                    <span className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center text-xs">1</span>
                                    <span>즉시 운영 중단 및 시설 폐쇄</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <span className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center text-xs">2</span>
                                    <span>관할 기관 통보 및 조사 착수</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <span className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center text-xs">3</span>
                                    <span>대체 시설/인력 배치</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <span className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center text-xs">4</span>
                                    <span>재허가 불가 명단 등록</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-700 flex justify-end space-x-3">
                            <button onClick={() => setShowExitModal(null)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">취소</button>
                            <button onClick={confirmExit} className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium">퇴출 확정</button>
                        </div>
                    </div>
                </div>
            )}

            {/* 헤더 */}
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="text-2xl font-bold">
                            <i className="fas fa-award text-purple-400 mr-2"></i>
                            품질 평가 체계
                        </h3>
                        <p className="text-gray-400 mt-1">시설, 인력, 식품의 종합 품질 평가 및 퇴출 관리</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <div className="text-sm text-gray-400">평가 기준일</div>
                            <div className="font-bold">2025년 11월 29일</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 등급 기준표 */}
            <div className="bg-gray-800 rounded-xl p-4">
                <h4 className="font-bold mb-3 text-sm">
                    <i className="fas fa-star text-yellow-400 mr-2"></i>등급 기준
                </h4>
                <div className="flex flex-wrap gap-2">
                    {Object.entries(gradeStandards).map(([grade, info]) => (
                        <div key={grade} className={'px-3 py-2 rounded-lg border ' + getGradeStyle(grade)}>
                            <span className="font-bold mr-2">{grade}</span>
                            <span className="text-sm">{info.min}점 이상</span>
                            <span className="text-xs ml-2 opacity-70">({info.label})</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 탭 메뉴 */}
            <div className="flex flex-wrap gap-2 bg-gray-800 rounded-xl p-2">
                {tabConfig.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                        className={'flex-1 min-w-[120px] py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2 ' + (activeTab === tab.id ? 'bg-purple-500 text-white' : 'text-gray-400 hover:bg-gray-700')}>
                        <span className="text-xl">{tab.icon}</span>
                        <span className="font-medium text-sm">{tab.name}</span>
                        <span className="px-2 py-0.5 bg-black/20 rounded-full text-xs">{tab.count}</span>
                    </button>
                ))}
            </div>

            {/* 요약 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">📊</div>
                    <div className="text-2xl font-bold text-cyan-400">{stats.total}</div>
                    <div className="text-sm text-gray-400">총 평가 대상</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">⭐</div>
                    <div className="text-2xl font-bold text-purple-400">{stats.avgScore}</div>
                    <div className="text-sm text-gray-400">평균 점수</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">🏆</div>
                    <div className="text-2xl font-bold text-green-400">{stats.excellent}</div>
                    <div className="text-sm text-gray-400">우수 (A이상)</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">⚠️</div>
                    <div className="text-2xl font-bold text-yellow-400">{stats.warning}</div>
                    <div className="text-sm text-gray-400">경고 (D등급)</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">🚫</div>
                    <div className="text-2xl font-bold text-red-400">{stats.exit}</div>
                    <div className="text-sm text-gray-400">퇴출 대상 (F)</div>
                </div>
            </div>

            {/* 평가 목록 */}
            <div className="space-y-4">
                {currentData.data.map((item, idx) => {
                    const grade = getGrade(item.totalScore);
                    const gradeInfo = gradeStandards[grade];
                    const isExit = grade === 'F';
                    const isWarning = grade === 'D';
                    const scoreKeys = Object.keys(item.scores);

                    return (
                        <div key={item.id} className={'bg-gray-800 rounded-xl overflow-hidden border ' + (isExit ? 'border-red-500/50' : isWarning ? 'border-yellow-500/30' : 'border-gray-700')}>
                            {/* 헤더 */}
                            <div className={'p-4 ' + (isExit ? 'bg-red-500/10' : isWarning ? 'bg-yellow-500/10' : '')}>
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex items-center space-x-4">
                                        <div className={'w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold border-2 ' + getGradeStyle(grade)}>
                                            {grade}
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 font-mono">{item.id}</div>
                                            <h4 className="text-lg font-bold">{item.name}</h4>
                                            <div className="text-sm text-gray-400">
                                                {item.type && <span className="mr-3">{item.type}</span>}
                                                {item.region && <span className="mr-3">{item.region}</span>}
                                                {item.product && <span className="mr-3">{item.product}</span>}
                                                {item.category && <span className="mr-3">{item.category}</span>}
                                                {item.role && <span className="mr-3">{item.role}</span>}
                                                {item.origin && <span>{item.origin}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        {/* 점수 */}
                                        <div className="text-right">
                                            <div className={'text-3xl font-bold text-' + gradeInfo.color + '-400'}>
                                                {item.totalScore.toFixed(1)}
                                            </div>
                                            <div className="text-xs text-gray-400">{gradeInfo.label}</div>
                                        </div>
                                        {/* 트렌드 */}
                                        <div className={'px-3 py-1 rounded-full text-xs ' + (item.trend === 'up' ? 'bg-green-500/20 text-green-400' : item.trend === 'down' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400')}>
                                            {item.trend === 'up' ? '↑ 상승' : item.trend === 'down' ? '↓ 하락' : '→ 유지'}
                                        </div>
                                        {/* 퇴출 버튼 */}
                                        {isExit && (
                                            <button onClick={() => handleExit(item)} className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium">
                                                <i className="fas fa-ban mr-2"></i>퇴출
                                            </button>
                                        )}
                                        {isWarning && (
                                            <button className="px-4 py-2 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 rounded-lg text-sm font-medium">
                                                <i className="fas fa-exclamation-circle mr-2"></i>시정요구
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* 세부 점수 */}
                            <div className="p-4 border-t border-gray-700">
                                <div className="grid grid-cols-5 gap-4">
                                    {scoreKeys.map((key, i) => {
                                        const score = item.scores[key];
                                        const label = currentData.scoreLabels[i] || key;
                                        return (
                                            <div key={key} className="text-center">
                                                <div className="text-xs text-gray-400 mb-1">{label}</div>
                                                <div className={'text-lg font-bold ' + (score >= 85 ? 'text-green-400' : score >= 65 ? 'text-yellow-400' : 'text-red-400')}>
                                                    {score}
                                                </div>
                                                <div className="h-2 bg-gray-700 rounded-full mt-1 overflow-hidden">
                                                    <div className={'h-full ' + (score >= 85 ? 'bg-green-500' : score >= 65 ? 'bg-yellow-500' : 'bg-red-500')}
                                                        style={{ width: score + '%' }}></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                {/* 추가 정보 */}
                                <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-400">
                                    {item.issues !== undefined && (
                                        <span><i className="fas fa-exclamation-triangle text-yellow-400 mr-1"></i>문제점: {item.issues}건</span>
                                    )}
                                    {item.warnings !== undefined && (
                                        <span><i className="fas fa-flag text-orange-400 mr-1"></i>경고: {item.warnings}회</span>
                                    )}
                                    {item.complaints !== undefined && (
                                        <span><i className="fas fa-comment-dots text-red-400 mr-1"></i>민원: {item.complaints}건</span>
                                    )}
                                    {item.rejectionRate !== undefined && (
                                        <span><i className="fas fa-times-circle text-red-400 mr-1"></i>반품률: {item.rejectionRate}%</span>
                                    )}
                                    {item.lastAudit && (
                                        <span><i className="fas fa-clipboard-check text-cyan-400 mr-1"></i>최근 감사: {item.lastAudit}</span>
                                    )}
                                    {item.tenure && (
                                        <span><i className="fas fa-clock text-purple-400 mr-1"></i>근속: {item.tenure}</span>
                                    )}
                                    {item.dailyVolume && (
                                        <span><i className="fas fa-box text-green-400 mr-1"></i>일 생산량: {item.dailyVolume.toLocaleString()}개</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 퇴출 메커니즘 설명 */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h4 className="font-bold mb-4">
                    <i className="fas fa-gavel text-red-400 mr-2"></i>
                    퇴출 메커니즘
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                        <div className="text-yellow-400 font-bold mb-2">1단계: 경고</div>
                        <div className="text-sm text-gray-400">D등급 (50-64점) 도달 시</div>
                        <ul className="text-xs text-gray-500 mt-2 space-y-1">
                            <li>• 시정 조치 명령</li>
                            <li>• 30일 개선 기한</li>
                            <li>• 주간 점검 실시</li>
                        </ul>
                    </div>
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                        <div className="text-orange-400 font-bold mb-2">2단계: 영업정지</div>
                        <div className="text-sm text-gray-400">개선 미이행 또는 재 하락</div>
                        <ul className="text-xs text-gray-500 mt-2 space-y-1">
                            <li>• 7일 영업 정지</li>
                            <li>• 전면 재점검</li>
                            <li>• 개선 계획 제출</li>
                        </ul>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                        <div className="text-red-400 font-bold mb-2">3단계: 퇴출</div>
                        <div className="text-sm text-gray-400">F등급 (50점 미만) 도달</div>
                        <ul className="text-xs text-gray-500 mt-2 space-y-1">
                            <li>• 즉시 운영 중단</li>
                            <li>• 허가 취소</li>
                            <li>• 대체 시설 배치</li>
                        </ul>
                    </div>
                    <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-4">
                        <div className="text-gray-300 font-bold mb-2">4단계: 블랙리스트</div>
                        <div className="text-sm text-gray-400">퇴출 이후 조치</div>
                        <ul className="text-xs text-gray-500 mt-2 space-y-1">
                            <li>• 재허가 불가 (5년)</li>
                            <li>• 관련 사업 참여 제한</li>
                            <li>• OpenHash 영구 기록</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* OpenHash 검증 */}
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <i className="fas fa-link text-cyan-400 text-xl mr-3"></i>
                        <div>
                            <div className="font-bold text-cyan-400">OpenHash 품질 기록</div>
                            <div className="text-sm text-gray-400">모든 평가 데이터가 위변조 불가능하게 기록됩니다</div>
                        </div>
                    </div>
                    <div className="text-sm text-gray-400">
                        마지막 동기화: {animationTick % 10}초 전
                    </div>
                </div>
            </div>
        </div>
    );
};
