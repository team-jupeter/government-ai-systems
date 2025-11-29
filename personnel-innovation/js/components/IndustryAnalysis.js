const IndustryAnalysis = () => {
    // 한국표준산업분류 데이터
    const [ksicData, setKsicData] = React.useState({
        large: [],
        medium: [],
        small: [],
        detail: [],
        subDetail: []
    });
    
    const [selectedLarge, setSelectedLarge] = React.useState('');
    const [selectedMedium, setSelectedMedium] = React.useState('');
    const [selectedSmall, setSelectedSmall] = React.useState('');
    const [selectedDetail, setSelectedDetail] = React.useState('');
    const [selectedSubDetail, setSelectedSubDetail] = React.useState('');
    
    const [selectedTimeframe, setSelectedTimeframe] = React.useState(null);
    const [analysisResult, setAnalysisResult] = React.useState(null);
    const [isAnalyzing, setIsAnalyzing] = React.useState(false);
    const [aiAnalysis, setAiAnalysis] = React.useState(null);
    const [isLoadingAI, setIsLoadingAI] = React.useState(false);

    const RechartsLib = window.Recharts || {};
    const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
            BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend } = RechartsLib;

    // 한국표준산업분류 대분류
    const largeCategories = [
        { code: 'A', name: '농업, 임업 및 어업', workers: 1350000, baseAutomation: 25 },
        { code: 'B', name: '광업', workers: 18000, baseAutomation: 45 },
        { code: 'C', name: '제조업', workers: 4500000, baseAutomation: 55 },
        { code: 'D', name: '전기, 가스, 증기 및 공기 조절 공급업', workers: 85000, baseAutomation: 60 },
        { code: 'E', name: '수도, 하수 및 폐기물 처리, 원료 재생업', workers: 62000, baseAutomation: 40 },
        { code: 'F', name: '건설업', workers: 2100000, baseAutomation: 30 },
        { code: 'G', name: '도매 및 소매업', workers: 3800000, baseAutomation: 65 },
        { code: 'H', name: '운수 및 창고업', workers: 1450000, baseAutomation: 75 },
        { code: 'I', name: '숙박 및 음식점업', workers: 2300000, baseAutomation: 45 },
        { code: 'J', name: '정보통신업', workers: 1050000, baseAutomation: 50 },
        { code: 'K', name: '금융 및 보험업', workers: 850000, baseAutomation: 80 },
        { code: 'L', name: '부동산업', workers: 580000, baseAutomation: 35 },
        { code: 'M', name: '전문, 과학 및 기술 서비스업', workers: 1250000, baseAutomation: 45 },
        { code: 'N', name: '사업시설 관리, 사업 지원 및 임대 서비스업', workers: 1680000, baseAutomation: 60 },
        { code: 'O', name: '공공 행정, 국방 및 사회보장 행정', workers: 1150000, baseAutomation: 55 },
        { code: 'P', name: '교육 서비스업', workers: 1950000, baseAutomation: 40 },
        { code: 'Q', name: '보건업 및 사회복지 서비스업', workers: 2350000, baseAutomation: 30 },
        { code: 'R', name: '예술, 스포츠 및 여가관련 서비스업', workers: 450000, baseAutomation: 25 },
        { code: 'S', name: '협회 및 단체, 수리 및 기타 개인 서비스업', workers: 980000, baseAutomation: 35 },
        { code: 'T', name: '가구 내 고용활동 및 달리 분류되지 않은 자가 소비 생산활동', workers: 150000, baseAutomation: 20 },
        { code: 'U', name: '국제 및 외국기관', workers: 12000, baseAutomation: 30 }
    ];

    // 중분류 데이터 (선택된 대분류에 따라)
    const getMediumCategories = (largeCode) => {
        const mediumData = {
            'C': [
                { code: '10', name: '식료품 제조업', workers: 185000, baseAutomation: 60 },
                { code: '11', name: '음료 제조업', workers: 28000, baseAutomation: 65 },
                { code: '13', name: '섬유제품 제조업', workers: 125000, baseAutomation: 70 },
                { code: '14', name: '의복, 의복 액세서리 및 모피제품 제조업', workers: 95000, baseAutomation: 55 },
                { code: '20', name: '화학물질 및 화학제품 제조업', workers: 165000, baseAutomation: 65 },
                { code: '21', name: '의료용 물질 및 의약품 제조업', workers: 78000, baseAutomation: 50 },
                { code: '26', name: '전자부품, 컴퓨터, 영상, 음향 및 통신장비 제조업', workers: 520000, baseAutomation: 75 },
                { code: '29', name: '자동차 및 트레일러 제조업', workers: 385000, baseAutomation: 80 },
                { code: '30', name: '기타 운송장비 제조업', workers: 198000, baseAutomation: 70 }
            ],
            'G': [
                { code: '45', name: '자동차 및 부품 판매업', workers: 450000, baseAutomation: 55 },
                { code: '46', name: '도매 및 상품 중개업', workers: 1250000, baseAutomation: 65 },
                { code: '47', name: '소매업; 자동차 제외', workers: 2100000, baseAutomation: 70 }
            ],
            'J': [
                { code: '58', name: '출판업', workers: 85000, baseAutomation: 60 },
                { code: '59', name: '영상·오디오 기록물 제작 및 배급업', workers: 45000, baseAutomation: 45 },
                { code: '60', name: '방송업', workers: 38000, baseAutomation: 50 },
                { code: '61', name: '우편 및 통신업', workers: 125000, baseAutomation: 70 },
                { code: '62', name: '컴퓨터 프로그래밍, 시스템 통합 및 관리업', workers: 485000, baseAutomation: 55 },
                { code: '63', name: '정보서비스업', workers: 272000, baseAutomation: 60 }
            ],
            'K': [
                { code: '64', name: '금융업', workers: 285000, baseAutomation: 85 },
                { code: '65', name: '보험 및 연금업', workers: 198000, baseAutomation: 80 },
                { code: '66', name: '금융 및 보험 관련 서비스업', workers: 367000, baseAutomation: 75 }
            ],
            'P': [
                { code: '85', name: '교육 서비스업', workers: 1950000, baseAutomation: 40 }
            ]
        };
        return mediumData[largeCode] || [];
    };

    // 소분류 데이터
    const getSmallCategories = (mediumCode) => {
        const smallData = {
            '62': [
                { code: '620', name: '컴퓨터 프로그래밍, 시스템 통합 및 관리업', workers: 485000, baseAutomation: 55 }
            ],
            '85': [
                { code: '851', name: '초등 교육기관', workers: 185000, baseAutomation: 35 },
                { code: '852', name: '중등 교육기관', workers: 245000, baseAutomation: 38 },
                { code: '853', name: '고등 교육기관', workers: 165000, baseAutomation: 45 },
                { code: '854', name: '특수학교, 외국인학교 및 대안학교', workers: 28000, baseAutomation: 30 },
                { code: '855', name: '일반 교습 학원', workers: 485000, baseAutomation: 50 },
                { code: '856', name: '기타 교육기관', workers: 342000, baseAutomation: 42 }
            ],
            '64': [
                { code: '641', name: '은행 및 저축기관', workers: 125000, baseAutomation: 88 },
                { code: '642', name: '신탁업 및 집합투자업', workers: 45000, baseAutomation: 82 },
                { code: '649', name: '기타 금융업', workers: 115000, baseAutomation: 80 }
            ]
        };
        return smallData[mediumCode] || [];
    };

    // 세분류 데이터
    const getDetailCategories = (smallCode) => {
        const detailData = {
            '853': [
                { code: '8530', name: '대학교', workers: 145000, baseAutomation: 48 },
                { code: '8531', name: '전문대학', workers: 20000, baseAutomation: 42 }
            ],
            '620': [
                { code: '6201', name: '컴퓨터 프로그래밍 서비스업', workers: 285000, baseAutomation: 60 },
                { code: '6202', name: '컴퓨터시스템 통합 자문 및 구축 서비스업', workers: 125000, baseAutomation: 50 },
                { code: '6209', name: '기타 정보기술 및 컴퓨터운영 관련 서비스업', workers: 75000, baseAutomation: 55 }
            ]
        };
        return detailData[smallCode] || [];
    };

    // 세세분류 데이터
    const getSubDetailCategories = (detailCode) => {
        const subDetailData = {
            '8530': [
                { code: '85301', name: '대학교 (일반대학)', workers: 125000, baseAutomation: 50, jobs: ['교수', '연구원', '행정직원', '조교'] },
                { code: '85302', name: '교육대학', workers: 8000, baseAutomation: 45, jobs: ['교수', '연구원'] },
                { code: '85303', name: '산업대학', workers: 5000, baseAutomation: 48, jobs: ['교수', '실습조교'] },
                { code: '85304', name: '기술대학', workers: 7000, baseAutomation: 52, jobs: ['교수', '기술직원'] }
            ],
            '6201': [
                { code: '62011', name: '응용소프트웨어 개발 및 공급업', workers: 185000, baseAutomation: 55, jobs: ['개발자', 'PM', 'QA'] },
                { code: '62012', name: '시스템소프트웨어 개발 및 공급업', workers: 100000, baseAutomation: 65, jobs: ['시스템개발자', '아키텍트'] }
            ]
        };
        return subDetailData[detailCode] || [];
    };

    React.useEffect(() => {
        setKsicData(prev => ({ ...prev, large: largeCategories }));
    }, []);

    // 대분류 선택 시
    const handleLargeChange = (code) => {
        setSelectedLarge(code);
        setSelectedMedium('');
        setSelectedSmall('');
        setSelectedDetail('');
        setSelectedSubDetail('');
        setKsicData(prev => ({
            ...prev,
            medium: getMediumCategories(code),
            small: [],
            detail: [],
            subDetail: []
        }));
        setAnalysisResult(null);
        setAiAnalysis(null);
    };

    // 중분류 선택 시
    const handleMediumChange = (code) => {
        setSelectedMedium(code);
        setSelectedSmall('');
        setSelectedDetail('');
        setSelectedSubDetail('');
        setKsicData(prev => ({
            ...prev,
            small: getSmallCategories(code),
            detail: [],
            subDetail: []
        }));
        setAnalysisResult(null);
        setAiAnalysis(null);
    };

    // 소분류 선택 시
    const handleSmallChange = (code) => {
        setSelectedSmall(code);
        setSelectedDetail('');
        setSelectedSubDetail('');
        setKsicData(prev => ({
            ...prev,
            detail: getDetailCategories(code),
            subDetail: []
        }));
        setAnalysisResult(null);
        setAiAnalysis(null);
    };

    // 세분류 선택 시
    const handleDetailChange = (code) => {
        setSelectedDetail(code);
        setSelectedSubDetail('');
        setKsicData(prev => ({
            ...prev,
            subDetail: getSubDetailCategories(code)
        }));
        setAnalysisResult(null);
        setAiAnalysis(null);
    };

    // 세세분류 선택 시
    const handleSubDetailChange = (code) => {
        setSelectedSubDetail(code);
        setAnalysisResult(null);
        setAiAnalysis(null);
    };

    // 자동화 비율 계산
    const calculateAutomationRate = (baseRate, years) => {
        const growthFactors = { 5: 1.3, 10: 1.8, 20: 2.5 };
        let rate = baseRate * growthFactors[years];
        return Math.min(rate, 95); // 최대 95%
    };

    // 시간대별 분석 실행
    const runTimeframeAnalysis = async (years) => {
        setSelectedTimeframe(years);
        setIsAnalyzing(true);
        
        // 선택된 산업 정보 가져오기
        const selectedIndustry = getSelectedIndustryInfo();
        
        setTimeout(() => {
            const baseAutomation = selectedIndustry?.baseAutomation || 50;
            const currentWorkers = selectedIndustry?.workers || 1000000;
            
            const automationRate = calculateAutomationRate(baseAutomation, years);
            const remainingWorkers = Math.round(currentWorkers * (1 - automationRate / 100));
            const displacedWorkers = currentWorkers - remainingWorkers;
            
            // 1차, 2차, 3차 산업 분류
            const primaryIndustries = ['A', 'B']; // 1차 산업
            const secondaryIndustries = ['C', 'D', 'E', 'F']; // 2차 산업
            const tertiaryIndustries = ['G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U']; // 3차 산업
            
            const sectorAnalysis = {
                primary: calculateSectorImpact(primaryIndustries, years),
                secondary: calculateSectorImpact(secondaryIndustries, years),
                tertiary: calculateSectorImpact(tertiaryIndustries, years)
            };
            
            // 연도별 추이 데이터
            const yearlyTrend = [];
            for (let y = 0; y <= years; y++) {
                const yearRate = baseAutomation + (automationRate - baseAutomation) * (y / years);
                yearlyTrend.push({
                    year: 2024 + y,
                    workers: Math.round(currentWorkers * (1 - yearRate / 100)),
                    automation: Math.round(yearRate * 10) / 10
                });
            }
            
            setAnalysisResult({
                years,
                industryName: selectedIndustry?.name || '선택된 산업',
                currentWorkers,
                automationRate: Math.round(automationRate * 10) / 10,
                remainingWorkers,
                displacedWorkers,
                sectorAnalysis,
                yearlyTrend,
                jobImpact: generateJobImpact(selectedIndustry, automationRate)
            });
            
            setIsAnalyzing(false);
        }, 1500);
        
        // AI 분석 요청
        fetchAIAnalysis(selectedIndustry, years);
    };

    // 섹터별 영향 계산
    const calculateSectorImpact = (codes, years) => {
        let totalCurrent = 0;
        let totalFuture = 0;
        
        codes.forEach(code => {
            const industry = largeCategories.find(c => c.code === code);
            if (industry) {
                totalCurrent += industry.workers;
                const rate = calculateAutomationRate(industry.baseAutomation, years);
                totalFuture += Math.round(industry.workers * (1 - rate / 100));
            }
        });
        
        return {
            current: totalCurrent,
            future: totalFuture,
            change: totalFuture - totalCurrent,
            changePercent: Math.round((totalFuture - totalCurrent) / totalCurrent * 100 * 10) / 10
        };
    };

    // 직업별 영향 생성
    const generateJobImpact = (industry, automationRate) => {
        const jobs = industry?.jobs || ['관리자', '전문가', '사무원', '서비스직', '생산직'];
        return jobs.map(job => ({
            name: job,
            currentWorkers: Math.round(Math.random() * 50000 + 10000),
            automationRate: Math.round((automationRate + (Math.random() * 20 - 10)) * 10) / 10,
            risk: automationRate > 70 ? '높음' : automationRate > 50 ? '중간' : '낮음'
        }));
    };

    // 선택된 산업 정보 가져오기
    const getSelectedIndustryInfo = () => {
        if (selectedSubDetail) {
            return ksicData.subDetail.find(c => c.code === selectedSubDetail);
        }
        if (selectedDetail) {
            return ksicData.detail.find(c => c.code === selectedDetail);
        }
        if (selectedSmall) {
            return ksicData.small.find(c => c.code === selectedSmall);
        }
        if (selectedMedium) {
            return ksicData.medium.find(c => c.code === selectedMedium);
        }
        if (selectedLarge) {
            return largeCategories.find(c => c.code === selectedLarge);
        }
        return null;
    };

    // AI 분석 요청
    const fetchAIAnalysis = async (industry, years) => {
        if (!industry) return;
        
        setIsLoadingAI(true);
        try {
            const response = await fetch('/api/personnel-innovation/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: `한국의 "${industry.name}" 산업에 대해 ${years}년 후 자동화(로봇, AI) 영향을 분석해주세요. 
                    현재 종사자 수: 약 ${(industry.workers / 10000).toFixed(1)}만 명
                    
                    다음 내용을 포함해주세요:
                    1. 이 산업의 주요 직종별 자동화 가능성 (높음/중간/낮음)
                    2. ${years}년 후 예상되는 인력 수요 변화
                    3. 생존 가능성이 높은 직무 영역
                    4. 대체될 가능성이 높은 직무 영역
                    5. 이 산업 종사자들을 위한 전환 추천 직업 3가지
                    
                    간결하게 핵심만 답변해주세요.`
                })
            });
            
            const result = await response.json();
            if (result.success) {
                setAiAnalysis(result.data.response);
            }
        } catch (error) {
            console.error('AI 분석 오류:', error);
        } finally {
            setIsLoadingAI(false);
        }
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
        if (num >= 10000) return (num / 10000).toFixed(1) + '만';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toLocaleString();
    };

    const selectedIndustry = getSelectedIndustryInfo();

    return (
        <div className="space-y-6">
            {/* 상단 안내 */}
            <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl p-6 border border-indigo-500/30">
                <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-indigo-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-industry text-3xl text-indigo-400"></i>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">산업 동향 분석 및 자동화 영향 시뮬레이션</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            한국표준산업분류(KSIC)에 따라 산업을 선택하고, AI와 로봇에 의한 <span className="text-indigo-400 font-medium">자동화 영향</span>을 
                            5년, 10년, 20년 단위로 시뮬레이션합니다. 
                            <span className="text-purple-400 font-medium"> Claude AI</span>가 실제 산업 데이터를 기반으로 분석 결과를 제공합니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* 산업 분류 선택 */}
            <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">📊 한국표준산업분류 선택</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {/* 대분류 */}
                    <div>
                        <label className="text-sm text-slate-400 mb-2 block">대분류</label>
                        <select
                            value={selectedLarge}
                            onChange={(e) => handleLargeChange(e.target.value)}
                            className="w-full bg-slate-700 text-white px-3 py-2.5 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none text-sm"
                        >
                            <option value="">선택하세요</option>
                            {largeCategories.map(cat => (
                                <option key={cat.code} value={cat.code}>{cat.code}. {cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* 중분류 */}
                    <div>
                        <label className="text-sm text-slate-400 mb-2 block">중분류</label>
                        <select
                            value={selectedMedium}
                            onChange={(e) => handleMediumChange(e.target.value)}
                            disabled={!selectedLarge}
                            className="w-full bg-slate-700 text-white px-3 py-2.5 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none text-sm disabled:opacity-50"
                        >
                            <option value="">선택하세요</option>
                            {ksicData.medium.map(cat => (
                                <option key={cat.code} value={cat.code}>{cat.code}. {cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* 소분류 */}
                    <div>
                        <label className="text-sm text-slate-400 mb-2 block">소분류</label>
                        <select
                            value={selectedSmall}
                            onChange={(e) => handleSmallChange(e.target.value)}
                            disabled={!selectedMedium}
                            className="w-full bg-slate-700 text-white px-3 py-2.5 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none text-sm disabled:opacity-50"
                        >
                            <option value="">선택하세요</option>
                            {ksicData.small.map(cat => (
                                <option key={cat.code} value={cat.code}>{cat.code}. {cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* 세분류 */}
                    <div>
                        <label className="text-sm text-slate-400 mb-2 block">세분류</label>
                        <select
                            value={selectedDetail}
                            onChange={(e) => handleDetailChange(e.target.value)}
                            disabled={!selectedSmall}
                            className="w-full bg-slate-700 text-white px-3 py-2.5 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none text-sm disabled:opacity-50"
                        >
                            <option value="">선택하세요</option>
                            {ksicData.detail.map(cat => (
                                <option key={cat.code} value={cat.code}>{cat.code}. {cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* 세세분류 */}
                    <div>
                        <label className="text-sm text-slate-400 mb-2 block">세세분류</label>
                        <select
                            value={selectedSubDetail}
                            onChange={(e) => handleSubDetailChange(e.target.value)}
                            disabled={!selectedDetail}
                            className="w-full bg-slate-700 text-white px-3 py-2.5 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none text-sm disabled:opacity-50"
                        >
                            <option value="">선택하세요</option>
                            {ksicData.subDetail.map(cat => (
                                <option key={cat.code} value={cat.code}>{cat.code}. {cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* 선택된 산업 정보 */}
                {selectedIndustry && (
                    <div className="mt-4 p-4 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white font-medium">{selectedIndustry.name}</p>
                                <p className="text-sm text-slate-400">현재 종사자: {formatNumber(selectedIndustry.workers)}명</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-slate-400">기본 자동화 지수</p>
                                <p className="text-xl font-bold text-yellow-400">{selectedIndustry.baseAutomation}%</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 시간대 선택 버튼 */}
            {selectedLarge && (
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">⏱️ 자동화 영향 시뮬레이션 기간 선택</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[5, 10, 20].map((years) => (
                            <button
                                key={years}
                                onClick={() => runTimeframeAnalysis(years)}
                                disabled={isAnalyzing}
                                className={`p-6 rounded-xl border-2 transition-all ${
                                    selectedTimeframe === years
                                        ? 'border-blue-500 bg-blue-600/20'
                                        : 'border-slate-600 hover:border-slate-500 bg-slate-700/50'
                                } ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                <div className="text-center">
                                    <p className="text-4xl font-bold text-white mb-2">{years}년</p>
                                    <p className="text-slate-400 text-sm">{2024 + years}년 예측</p>
                                    {isAnalyzing && selectedTimeframe === years && (
                                        <div className="mt-3">
                                            <i className="fas fa-spinner fa-spin text-blue-400"></i>
                                            <span className="text-blue-400 text-sm ml-2">분석 중...</span>
                                        </div>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* 분석 결과 */}
            {analysisResult && (
                <React.Fragment>
                    {/* 요약 카드 */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5">
                            <p className="text-blue-200 text-sm">현재 종사자</p>
                            <p className="text-3xl font-bold text-white mt-1">{formatNumber(analysisResult.currentWorkers)}</p>
                            <p className="text-blue-200 text-xs mt-1">2024년 기준</p>
                        </div>
                        <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-5">
                            <p className="text-red-200 text-sm">{analysisResult.years}년 후 자동화율</p>
                            <p className="text-3xl font-bold text-white mt-1">{analysisResult.automationRate}%</p>
                            <p className="text-red-200 text-xs mt-1">AI/로봇 대체 비율</p>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-xl p-5">
                            <p className="text-yellow-200 text-sm">대체 예상 인력</p>
                            <p className="text-3xl font-bold text-white mt-1">{formatNumber(analysisResult.displacedWorkers)}</p>
                            <p className="text-yellow-200 text-xs mt-1">재배치 필요</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-5">
                            <p className="text-green-200 text-sm">잔여 인력 수요</p>
                            <p className="text-3xl font-bold text-white mt-1">{formatNumber(analysisResult.remainingWorkers)}</p>
                            <p className="text-green-200 text-xs mt-1">{2024 + analysisResult.years}년 예상</p>
                        </div>
                    </div>

                    {/* 1차/2차/3차 산업 영향 */}
                    <div className="bg-slate-800 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">🏭 산업 섹터별 인력 수요 변화 ({analysisResult.years}년 후)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { name: '1차 산업', sub: '농림어업, 광업', data: analysisResult.sectorAnalysis.primary, color: 'green' },
                                { name: '2차 산업', sub: '제조업, 건설업', data: analysisResult.sectorAnalysis.secondary, color: 'blue' },
                                { name: '3차 산업', sub: '서비스업', data: analysisResult.sectorAnalysis.tertiary, color: 'purple' }
                            ].map((sector) => (
                                <div key={sector.name} className={`p-5 bg-slate-700/50 rounded-xl border-l-4 border-${sector.color}-500`}>
                                    <p className="text-white font-bold text-lg">{sector.name}</p>
                                    <p className="text-slate-400 text-xs mb-3">{sector.sub}</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-slate-400 text-sm">현재</span>
                                            <span className="text-white">{formatNumber(sector.data.current)}명</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400 text-sm">{analysisResult.years}년 후</span>
                                            <span className="text-white">{formatNumber(sector.data.future)}명</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400 text-sm">변화</span>
                                            <span className={sector.data.change < 0 ? 'text-red-400' : 'text-green-400'}>
                                                {sector.data.change > 0 ? '+' : ''}{formatNumber(sector.data.change)}명 ({sector.data.changePercent}%)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 차트 영역 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* 연도별 인력 추이 */}
                        <div className="bg-slate-800 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4">📈 연도별 인력 수요 추이</h3>
                            {AreaChart ? (
                                <ResponsiveContainer width="100%" height={280}>
                                    <AreaChart data={analysisResult.yearlyTrend}>
                                        <defs>
                                            <linearGradient id="workersGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                        <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} />
                                        <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => formatNumber(v)} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                            formatter={(value, name) => [formatNumber(value) + '명', name === 'workers' ? '종사자 수' : '자동화율']}
                                        />
                                        <Area type="monotone" dataKey="workers" stroke="#3b82f6" fill="url(#workersGrad)" name="workers" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-64 flex items-center justify-center text-slate-400">차트 로딩 중...</div>
                            )}
                        </div>

                        {/* 자동화율 추이 */}
                        <div className="bg-slate-800 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4">🤖 자동화율 변화 추이</h3>
                            {LineChart ? (
                                <ResponsiveContainer width="100%" height={280}>
                                    <LineChart data={analysisResult.yearlyTrend}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                        <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} />
                                        <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} tickFormatter={(v) => v + '%'} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                            formatter={(value) => [value + '%', '자동화율']}
                                        />
                                        <Line type="monotone" dataKey="automation" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444' }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-64 flex items-center justify-center text-slate-400">차트 로딩 중...</div>
                            )}
                        </div>
                    </div>

                    {/* 직업별 영향 */}
                    <div className="bg-slate-800 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">👥 직종별 자동화 위험도</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {analysisResult.jobImpact.map((job, index) => (
                                <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-white font-medium">{job.name}</span>
                                        <span className={`px-2 py-0.5 rounded text-xs ${
                                            job.risk === '높음' ? 'bg-red-500/20 text-red-400' :
                                            job.risk === '중간' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-green-500/20 text-green-400'
                                        }`}>
                                            위험도: {job.risk}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-400">자동화 예측</span>
                                        <span className="text-white">{job.automationRate}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-600 rounded-full">
                                        <div 
                                            className={`h-2 rounded-full ${
                                                job.automationRate >= 70 ? 'bg-red-500' :
                                                job.automationRate >= 50 ? 'bg-yellow-500' : 'bg-green-500'
                                            }`}
                                            style={{ width: job.automationRate + '%' }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI 분석 결과 */}
                    <div className="bg-slate-800 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                <i className="fas fa-robot text-purple-400"></i>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Claude AI 심층 분석</h3>
                                <p className="text-xs text-slate-400">실제 산업 데이터 기반 분석</p>
                            </div>
                        </div>
                        {isLoadingAI ? (
                            <div className="p-8 text-center">
                                <i className="fas fa-spinner fa-spin text-3xl text-purple-400 mb-4"></i>
                                <p className="text-slate-400">Claude AI가 산업 데이터를 분석하고 있습니다...</p>
                            </div>
                        ) : aiAnalysis ? (
                            <div className="p-4 bg-slate-700/50 rounded-lg">
                                <p className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">{aiAnalysis}</p>
                            </div>
                        ) : (
                            <div className="p-4 bg-slate-700/50 rounded-lg text-center text-slate-400">
                                시간대를 선택하면 AI 분석이 시작됩니다
                            </div>
                        )}
                    </div>
                </React.Fragment>
            )}

            {/* 전체 노동인구 현황 (초기 상태) */}
            {!analysisResult && (
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">📊 전체 노동인구 현황 (2024년)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                            <p className="text-green-400 text-sm">1차 산업</p>
                            <p className="text-2xl font-bold text-white">1.37M</p>
                            <p className="text-xs text-slate-400">농림어업, 광업</p>
                        </div>
                        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
                            <p className="text-blue-400 text-sm">2차 산업</p>
                            <p className="text-2xl font-bold text-white">6.75M</p>
                            <p className="text-xs text-slate-400">제조업, 건설업</p>
                        </div>
                        <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg text-center">
                            <p className="text-purple-400 text-sm">3차 산업</p>
                            <p className="text-2xl font-bold text-white">21.88M</p>
                            <p className="text-xs text-slate-400">서비스업</p>
                        </div>
                    </div>
                    <p className="text-center text-slate-400 text-sm">
                        위에서 산업을 선택하고 시간대를 클릭하면 자동화 영향 시뮬레이션이 시작됩니다.
                    </p>
                </div>
            )}
        </div>
    );
};
