const PDVManager = ({ patientId }) => {
    const [activeTab, setActiveTab] = React.useState('overview');
    const [isUnlocked, setIsUnlocked] = React.useState(false);
    const [unlockAnimation, setUnlockAnimation] = React.useState(false);

    // 환자 기본 정보
    const patientInfo = {
        id: patientId,
        name: '김건강',
        birthDate: '1968-03-15',
        age: 56,
        gender: '남성',
        bloodType: 'A형 Rh+',
        height: 172,
        weight: 74.5,
        bmi: 25.2,
        address: '제주특별자치도 제주시 연동 123-45',
        phone: '010-1234-5678',
        emergencyContact: '김배우자 (배우자) 010-8765-4321',
        occupation: {
            current: '퇴직 (2023~)',
            history: [
                { period: '2020-2023', job: '건설현장 관리자', risk: '분진, 소음 노출' },
                { period: '1995-2020', job: '건설회사 현장소장', risk: '고소작업, 중장비' },
                { period: '1990-1995', job: '건설현장 기술자', risk: '시멘트 분진, 석면 노출 가능성' }
            ]
        },
        insurance: '국민건강보험 (직장가입자→지역가입자)',
        registeredHospital: '제주대학교병원'
    };

    // 가족력
    const familyHistory = [
        { relation: '부', condition: '고혈압, 뇌졸중', age: '72세 사망', note: '뇌출혈로 사망' },
        { relation: '모', condition: '당뇨병, 고혈압', age: '78세 생존', note: '인슐린 투여 중' },
        { relation: '형', condition: '고혈압', age: '60세 생존', note: '약물 복용 중' },
        { relation: '여동생', condition: '특이사항 없음', age: '52세 생존', note: '' },
        { relation: '아들', condition: '특이사항 없음', age: '28세 생존', note: '' },
        { relation: '딸', condition: '갑상선기능저하', age: '25세 생존', note: '약물 복용 중' }
    ];

    // 과거 병력
    const medicalHistory = [
        { year: 2022, condition: '고혈압', hospital: '제주대학교병원', dept: '심장내과', doctor: '김심장', status: '현재 치료중', medication: '아모디핀 5mg 1일 1회' },
        { year: 2020, condition: '제2형 당뇨병', hospital: '제주대학교병원', dept: '내분비내과', doctor: '박당뇨', status: '현재 치료중', medication: '메트포르민 500mg 1일 2회' },
        { year: 2018, condition: '요추 추간판탈출증', hospital: '제주정형외과', dept: '정형외과', doctor: '이척추', status: '완치', medication: '물리치료 완료' },
        { year: 2015, condition: '위염', hospital: '제주의료원', dept: '소화기내과', doctor: '최위장', status: '완치', medication: '- ' },
        { year: 2010, condition: '대상포진', hospital: '제주피부과', dept: '피부과', doctor: '정피부', status: '완치', medication: '-' },
        { year: 2005, condition: '충수돌기염', hospital: '제주대학교병원', dept: '외과', doctor: '강외과', status: '수술 완치', medication: '충수절제술' },
        { year: 1998, condition: '골절 (우측 손목)', hospital: '서울병원', dept: '정형외과', doctor: '-', status: '완치', medication: '석고고정 6주' }
    ];

    // 알레르기 및 부작용
    const allergies = [
        { type: '약물', item: '페니실린', reaction: '두드러기, 호흡곤란', severity: '중증' },
        { type: '약물', item: '아스피린', reaction: '위장장애', severity: '경증' },
        { type: '음식', item: '갑각류 (새우, 게)', reaction: '두드러기', severity: '중등도' },
        { type: '기타', item: '조영제', reaction: '구역감', severity: '경증' }
    ];

    // 예방접종 기록
    const vaccinations = [
        { name: '코로나19 (화이자)', date: '2023-11-15', dose: '5차', hospital: '제주시보건소' },
        { name: '독감', date: '2023-10-20', dose: '연례', hospital: '제주의료원' },
        { name: '폐렴구균', date: '2021-05-10', dose: '1회', hospital: '제주대학교병원' },
        { name: '대상포진', date: '2020-03-15', dose: '1회', hospital: '제주시보건소' },
        { name: 'B형간염', date: '1995-06-20', dose: '3차 완료', hospital: '서울병원' },
        { name: '파상풍', date: '2018-08-10', dose: '추가', hospital: '제주의료원' }
    ];

    // 수술 이력
    const surgeries = [
        { year: 2005, name: '충수절제술', hospital: '제주대학교병원', anesthesia: '전신마취', complication: '없음' },
        { year: 2018, name: '요추 시술 (신경차단술)', hospital: '제주정형외과', anesthesia: '국소마취', complication: '없음' }
    ];

    // 건강검진 이력
    const checkupHistory = [
        { 
            year: 2024, date: '2024-03-15', hospital: '제주대학교병원',
            results: {
                height: 172, weight: 74.5, bmi: 25.2, waist: 88,
                bp: { sys: 138, dia: 88 }, glucose: { fasting: 126, hba1c: 6.8 },
                cholesterol: { total: 215, ldl: 142, hdl: 45, tg: 165 },
                liver: { ast: 32, alt: 38, ggt: 45 }, kidney: { creatinine: 1.1, gfr: 78 },
                findings: ['경도 지방간', '공복혈당 상승', 'LDL 콜레스테롤 경계']
            }
        },
        { 
            year: 2023, date: '2023-03-20', hospital: '제주대학교병원',
            results: {
                height: 172, weight: 76.2, bmi: 25.8, waist: 90,
                bp: { sys: 142, dia: 90 }, glucose: { fasting: 132, hba1c: 7.1 },
                cholesterol: { total: 228, ldl: 156, hdl: 42, tg: 178 },
                liver: { ast: 35, alt: 42, ggt: 52 }, kidney: { creatinine: 1.0, gfr: 82 },
                findings: ['경도 지방간', '당뇨 조절 필요', '이상지질혈증']
            }
        },
        {
            year: 2022, date: '2022-04-10', hospital: '제주의료원',
            results: {
                height: 172, weight: 78.5, bmi: 26.5, waist: 92,
                bp: { sys: 148, dia: 95 }, glucose: { fasting: 145, hba1c: 7.5 },
                cholesterol: { total: 242, ldl: 168, hdl: 38, tg: 195 },
                liver: { ast: 42, alt: 55, ggt: 68 }, kidney: { creatinine: 1.0, gfr: 85 },
                findings: ['중등도 지방간', '당뇨 조절 불량', '고혈압 진단']
            }
        }
    ];

    // 시계열 데이터 (출생~현재)
    const timeSeriesData = {
        // 성장 데이터 (유아기~청소년기)
        growth: [
            { age: 0, height: 50, weight: 3.2 },
            { age: 1, height: 75, weight: 10.5 },
            { age: 3, height: 95, weight: 14.2 },
            { age: 6, height: 115, weight: 21 },
            { age: 10, height: 138, weight: 32 },
            { age: 15, height: 168, weight: 58 },
            { age: 20, height: 172, weight: 68 },
            { age: 30, height: 172, weight: 70 },
            { age: 40, height: 172, weight: 72 },
            { age: 50, height: 172, weight: 76 },
            { age: 56, height: 172, weight: 74.5 }
        ],
        // 혈압 데이터 (성인기)
        bloodPressure: [
            { year: 2010, age: 42, sys: 125, dia: 82 },
            { year: 2012, age: 44, sys: 128, dia: 84 },
            { year: 2014, age: 46, sys: 132, dia: 85 },
            { year: 2016, age: 48, sys: 135, dia: 86 },
            { year: 2018, age: 50, sys: 140, dia: 88 },
            { year: 2020, age: 52, sys: 145, dia: 92 },
            { year: 2022, age: 54, sys: 148, dia: 95 },
            { year: 2023, age: 55, sys: 142, dia: 90 },
            { year: 2024, age: 56, sys: 138, dia: 88 }
        ],
        // 혈당 데이터
        glucose: [
            { year: 2015, fasting: 98, hba1c: 5.4 },
            { year: 2016, fasting: 102, hba1c: 5.6 },
            { year: 2017, fasting: 108, hba1c: 5.8 },
            { year: 2018, fasting: 115, hba1c: 6.1 },
            { year: 2019, fasting: 122, hba1c: 6.4 },
            { year: 2020, fasting: 138, hba1c: 7.2 },
            { year: 2021, fasting: 142, hba1c: 7.4 },
            { year: 2022, fasting: 145, hba1c: 7.5 },
            { year: 2023, fasting: 132, hba1c: 7.1 },
            { year: 2024, fasting: 126, hba1c: 6.8 }
        ],
        // 체중 변화 (최근 10년)
        weight: [
            { year: 2014, weight: 72 },
            { year: 2015, weight: 73 },
            { year: 2016, weight: 74 },
            { year: 2017, weight: 75 },
            { year: 2018, weight: 77 },
            { year: 2019, weight: 78 },
            { year: 2020, weight: 79 },
            { year: 2021, weight: 78 },
            { year: 2022, weight: 78.5 },
            { year: 2023, weight: 76.2 },
            { year: 2024, weight: 74.5 }
        ],
        // 콜레스테롤
        cholesterol: [
            { year: 2018, total: 205, ldl: 128, hdl: 48, tg: 145 },
            { year: 2019, total: 218, ldl: 138, hdl: 45, tg: 158 },
            { year: 2020, total: 235, ldl: 158, hdl: 42, tg: 175 },
            { year: 2021, total: 240, ldl: 165, hdl: 40, tg: 188 },
            { year: 2022, total: 242, ldl: 168, hdl: 38, tg: 195 },
            { year: 2023, total: 228, ldl: 156, hdl: 42, tg: 178 },
            { year: 2024, total: 215, ldl: 142, hdl: 45, tg: 165 }
        ]
    };

    // 현재 복용약
    const currentMedications = [
        { name: '아모디핀 5mg', purpose: '고혈압', dosage: '1일 1회 아침', prescriber: '김심장', hospital: '제주대학교병원', since: '2022-05' },
        { name: '메트포르민 500mg', purpose: '당뇨병', dosage: '1일 2회 아침저녁', prescriber: '박당뇨', hospital: '제주대학교병원', since: '2020-08' },
        { name: '아토르바스타틴 10mg', purpose: '고지혈증', dosage: '1일 1회 저녁', prescriber: '김심장', hospital: '제주대학교병원', since: '2022-06' },
        { name: '오메가3', purpose: '건강보조', dosage: '1일 1회', prescriber: '일반의약품', hospital: '-', since: '2023-01' }
    ];

    // 생활습관
    const lifestyle = {
        smoking: { status: '과거 흡연', detail: '1990-2015 (25년간, 1갑/일), 금연 9년차' },
        alcohol: { status: '사회적 음주', detail: '주 1-2회, 소주 1-2잔' },
        exercise: { status: '규칙적', detail: '매일 아침 걷기 30분, 주 2회 등산' },
        diet: { status: '식이요법 중', detail: '저염식, 당뇨식 (탄수화물 제한)' },
        sleep: { status: '양호', detail: '평균 6-7시간, 수면무호흡 의심 (배우자 진술)' }
    };

    // PDV 잠금 해제
    const handleUnlock = () => {
        setUnlockAnimation(true);
        setTimeout(() => {
            setIsUnlocked(true);
            setUnlockAnimation(false);
        }, 1500);
    };

    // 차트 컴포넌트 (간단한 라인 차트)
    const SimpleLineChart = ({ data, xKey, yKey, color, height = 150, showDots = true }) => {
        if (!data || data.length === 0) return null;
        const maxY = Math.max(...data.map(d => d[yKey])) * 1.1;
        const minY = Math.min(...data.map(d => d[yKey])) * 0.9;
        const range = maxY - minY;
        
        const points = data.map((d, i) => ({
            x: (i / (data.length - 1)) * 100,
            y: 100 - ((d[yKey] - minY) / range) * 100,
            value: d[yKey],
            label: d[xKey]
        }));
        
        const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

        return (
            <div style={{ height }}>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                    <defs>
                        <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
                            <stop offset="100%" stopColor={color} stopOpacity="0"/>
                        </linearGradient>
                    </defs>
                    <path d={`${pathD} L 100 100 L 0 100 Z`} fill={`url(#gradient-${color})`}/>
                    <path d={pathD} fill="none" stroke={color} strokeWidth="0.5"/>
                    {showDots && points.map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r="1" fill={color}/>
                    ))}
                </svg>
            </div>
        );
    };

    // 잠금 화면
    if (!isUnlocked) {
        return (
            <div className="flex items-center justify-center min-h-[600px]">
                <div className="text-center">
                    <div className={`w-32 h-32 mx-auto mb-6 rounded-full bg-cyan-500/20 border-4 border-cyan-500 flex items-center justify-center ${unlockAnimation ? 'animate-pulse' : ''}`}>
                        <i className={`fas ${unlockAnimation ? 'fa-lock-open' : 'fa-lock'} text-5xl text-cyan-400 ${unlockAnimation ? 'animate-bounce' : ''}`}></i>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">개인정보금고 (PDV)</h2>
                    <p className="text-gray-400 mb-6">Personal Data Vault - OpenHash 암호화</p>
                    <p className="text-sm text-gray-500 mb-8">환자 본인 인증이 필요합니다</p>
                    
                    <button
                        onClick={handleUnlock}
                        disabled={unlockAnimation}
                        className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-xl font-bold text-lg flex items-center space-x-3 mx-auto disabled:opacity-50"
                    >
                        <i className="fas fa-fingerprint text-2xl"></i>
                        <span>{unlockAnimation ? '인증 중...' : '생체 인증으로 열기'}</span>
                    </button>
                    
                    <div className="mt-8 flex justify-center space-x-8 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-shield-alt text-green-400"></i>
                            <span>AES-256 암호화</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-link text-cyan-400"></i>
                            <span>OpenHash 무결성</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-user-lock text-purple-400"></i>
                            <span>환자 주권 보장</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 메인 컨텐츠
    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center">
                        <i className="fas fa-shield-alt text-cyan-400 mr-3"></i>개인정보금고 (PDV)
                    </h1>
                    <p className="text-gray-400 mt-1">환자의 전체 의료 정보 - OpenHash 보호</p>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                        <i className="fas fa-lock-open mr-1"></i>열람 중
                    </span>
                    <button onClick={() => setIsUnlocked(false)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm">
                        <i className="fas fa-lock mr-2"></i>잠금
                    </button>
                </div>
            </div>

            {/* 환자 기본 정보 카드 */}
            <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-xl border border-cyan-500/30 p-6">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center text-4xl">
                            👨
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{patientInfo.name}</h2>
                            <p className="text-gray-400">{patientInfo.birthDate} ({patientInfo.age}세) · {patientInfo.gender}</p>
                            <div className="flex items-center space-x-4 mt-2">
                                <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-bold">{patientInfo.bloodType}</span>
                                <span className="text-sm text-gray-400">신장 {patientInfo.height}cm</span>
                                <span className="text-sm text-gray-400">체중 {patientInfo.weight}kg</span>
                                <span className="text-sm text-gray-400">BMI {patientInfo.bmi}</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right text-sm">
                        <p className="text-gray-400">환자 ID</p>
                        <p className="font-mono text-cyan-400">{patientInfo.id}</p>
                        <p className="text-gray-400 mt-2">등록 병원</p>
                        <p className="text-white">{patientInfo.registeredHospital}</p>
                    </div>
                </div>
            </div>

            {/* 탭 네비게이션 */}
            <div className="flex space-x-2 border-b border-gray-700 pb-2 overflow-x-auto">
                {[
                    { id: 'overview', label: '개요', icon: 'fa-home' },
                    { id: 'history', label: '병력', icon: 'fa-history' },
                    { id: 'charts', label: '건강추이', icon: 'fa-chart-line' },
                    { id: 'checkup', label: '검진결과', icon: 'fa-clipboard-list' },
                    { id: 'medication', label: '복용약', icon: 'fa-pills' },
                    { id: 'family', label: '가족력', icon: 'fa-users' },
                    { id: 'lifestyle', label: '생활습관', icon: 'fa-heartbeat' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-t-lg flex items-center space-x-2 whitespace-nowrap ${activeTab === tab.id ? 'bg-gray-800 text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
                    >
                        <i className={`fas ${tab.icon}`}></i>
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* 탭 컨텐츠 */}
            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 현재 진단 */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                        <h3 className="font-semibold mb-4 flex items-center"><i className="fas fa-stethoscope text-red-400 mr-2"></i>현재 진단</h3>
                        <div className="space-y-3">
                            {medicalHistory.filter(h => h.status === '현재 치료중').map((h, i) => (
                                <div key={i} className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                                    <p className="font-medium text-red-400">{h.condition}</p>
                                    <p className="text-xs text-gray-400">{h.year}년 진단 · {h.hospital}</p>
                                    <p className="text-xs text-gray-500 mt-1">{h.medication}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 알레르기 */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                        <h3 className="font-semibold mb-4 flex items-center"><i className="fas fa-exclamation-triangle text-yellow-400 mr-2"></i>알레르기/부작용</h3>
                        <div className="space-y-2">
                            {allergies.map((a, i) => (
                                <div key={i} className={`p-2 rounded-lg flex items-center justify-between ${a.severity === '중증' ? 'bg-red-500/20 border border-red-500/50' : a.severity === '중등도' ? 'bg-yellow-500/20 border border-yellow-500/50' : 'bg-gray-700/50 border border-gray-600'}`}>
                                    <div>
                                        <p className="font-medium">{a.item}</p>
                                        <p className="text-xs text-gray-400">{a.type} · {a.reaction}</p>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded ${a.severity === '중증' ? 'bg-red-500 text-white' : a.severity === '중등도' ? 'bg-yellow-500 text-black' : 'bg-gray-600'}`}>{a.severity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 직업력 */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                        <h3 className="font-semibold mb-4 flex items-center"><i className="fas fa-briefcase text-blue-400 mr-2"></i>직업력</h3>
                        <div className="space-y-2">
                            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                                <p className="font-medium text-blue-400">{patientInfo.occupation.current}</p>
                                <p className="text-xs text-gray-400">현재</p>
                            </div>
                            {patientInfo.occupation.history.map((job, i) => (
                                <div key={i} className="p-2 bg-gray-700/50 rounded-lg">
                                    <p className="text-sm">{job.job}</p>
                                    <p className="text-xs text-gray-400">{job.period}</p>
                                    {job.risk && <p className="text-xs text-orange-400 mt-1">⚠️ {job.risk}</p>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 최근 활력징후 */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                        <h3 className="font-semibold mb-4 flex items-center"><i className="fas fa-heartbeat text-pink-400 mr-2"></i>최근 활력징후</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-gray-700/50 rounded-lg text-center">
                                <p className="text-xs text-gray-400">혈압</p>
                                <p className="text-xl font-bold text-yellow-400">138/88</p>
                                <p className="text-xs text-gray-500">mmHg</p>
                            </div>
                            <div className="p-3 bg-gray-700/50 rounded-lg text-center">
                                <p className="text-xs text-gray-400">공복혈당</p>
                                <p className="text-xl font-bold text-orange-400">126</p>
                                <p className="text-xs text-gray-500">mg/dL</p>
                            </div>
                            <div className="p-3 bg-gray-700/50 rounded-lg text-center">
                                <p className="text-xs text-gray-400">HbA1c</p>
                                <p className="text-xl font-bold text-yellow-400">6.8%</p>
                                <p className="text-xs text-gray-500">당화혈색소</p>
                            </div>
                            <div className="p-3 bg-gray-700/50 rounded-lg text-center">
                                <p className="text-xs text-gray-400">BMI</p>
                                <p className="text-xl font-bold text-blue-400">25.2</p>
                                <p className="text-xs text-gray-500">과체중</p>
                            </div>
                        </div>
                    </div>

                    {/* 예방접종 */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                        <h3 className="font-semibold mb-4 flex items-center"><i className="fas fa-syringe text-green-400 mr-2"></i>예방접종</h3>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {vaccinations.map((v, i) => (
                                <div key={i} className="flex items-center justify-between p-2 bg-gray-700/50 rounded-lg">
                                    <div>
                                        <p className="text-sm font-medium">{v.name}</p>
                                        <p className="text-xs text-gray-400">{v.dose}</p>
                                    </div>
                                    <p className="text-xs text-gray-500">{v.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 수술 이력 */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                        <h3 className="font-semibold mb-4 flex items-center"><i className="fas fa-procedures text-purple-400 mr-2"></i>수술 이력</h3>
                        <div className="space-y-2">
                            {surgeries.map((s, i) => (
                                <div key={i} className="p-3 bg-gray-700/50 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium">{s.name}</p>
                                        <span className="text-xs text-gray-500">{s.year}년</span>
                                    </div>
                                    <p className="text-xs text-gray-400">{s.hospital} · {s.anesthesia}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'history' && (
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <h3 className="font-semibold mb-4">전체 병력</h3>
                    <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700"></div>
                        <div className="space-y-4">
                            {medicalHistory.map((h, i) => (
                                <div key={i} className="relative pl-10">
                                    <div className={`absolute left-2 w-5 h-5 rounded-full flex items-center justify-center ${h.status === '현재 치료중' ? 'bg-red-500' : 'bg-green-500'}`}>
                                        <i className={`fas ${h.status === '현재 치료중' ? 'fa-heartbeat' : 'fa-check'} text-xs text-white`}></i>
                                    </div>
                                    <div className={`p-4 rounded-lg border ${h.status === '현재 치료중' ? 'bg-red-500/10 border-red-500/30' : 'bg-gray-700/50 border-gray-600'}`}>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-bold text-lg">{h.condition}</p>
                                                <p className="text-sm text-gray-400">{h.hospital} · {h.dept} · {h.doctor} 전문의</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-bold text-gray-500">{h.year}</p>
                                                <span className={`text-xs px-2 py-1 rounded ${h.status === '현재 치료중' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>{h.status}</span>
                                            </div>
                                        </div>
                                        {h.medication !== '-' && <p className="text-sm text-cyan-400 mt-2"><i className="fas fa-pills mr-1"></i>{h.medication}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'charts' && (
                <div className="space-y-6">
                    {/* 성장 곡선 */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                        <h3 className="font-semibold mb-4"><i className="fas fa-child text-blue-400 mr-2"></i>성장 곡선 (출생~현재)</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-400 mb-2">신장 (cm)</p>
                                <SimpleLineChart data={timeSeriesData.growth} xKey="age" yKey="height" color="#3b82f6" height={120}/>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>출생</span><span>10세</span><span>20세</span><span>40세</span><span>현재</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 mb-2">체중 (kg)</p>
                                <SimpleLineChart data={timeSeriesData.growth} xKey="age" yKey="weight" color="#10b981" height={120}/>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>출생</span><span>10세</span><span>20세</span><span>40세</span><span>현재</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 혈압 추이 */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                        <h3 className="font-semibold mb-4"><i className="fas fa-heart text-red-400 mr-2"></i>혈압 변화 추이</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-400 mb-2">수축기 혈압 (mmHg)</p>
                                <SimpleLineChart data={timeSeriesData.bloodPressure} xKey="year" yKey="sys" color="#ef4444" height={120}/>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    {timeSeriesData.bloodPressure.map((d, i) => i % 2 === 0 && <span key={i}>{d.year}</span>)}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 mb-2">이완기 혈압 (mmHg)</p>
                                <SimpleLineChart data={timeSeriesData.bloodPressure} xKey="year" yKey="dia" color="#f97316" height={120}/>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    {timeSeriesData.bloodPressure.map((d, i) => i % 2 === 0 && <span key={i}>{d.year}</span>)}
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                            <p className="text-sm text-yellow-400"><i className="fas fa-info-circle mr-1"></i>2022년 고혈압 진단 후 약물 치료 시작 → 혈압 개선 추세</p>
                        </div>
                    </div>

                    {/* 혈당 추이 */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                        <h3 className="font-semibold mb-4"><i className="fas fa-tint text-purple-400 mr-2"></i>혈당 변화 추이</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-400 mb-2">공복혈당 (mg/dL)</p>
                                <SimpleLineChart data={timeSeriesData.glucose} xKey="year" yKey="fasting" color="#a855f7" height={120}/>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    {timeSeriesData.glucose.map((d, i) => i % 2 === 0 && <span key={i}>{d.year}</span>)}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 mb-2">당화혈색소 HbA1c (%)</p>
                                <SimpleLineChart data={timeSeriesData.glucose} xKey="year" yKey="hba1c" color="#ec4899" height={120}/>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    {timeSeriesData.glucose.map((d, i) => i % 2 === 0 && <span key={i}>{d.year}</span>)}
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                            <p className="text-sm text-orange-400"><i className="fas fa-info-circle mr-1"></i>2020년 당뇨 진단 후 관리 시작 → 최근 혈당 조절 개선</p>
                        </div>
                    </div>

                    {/* 체중/콜레스테롤 */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                            <h3 className="font-semibold mb-4"><i className="fas fa-weight text-green-400 mr-2"></i>체중 변화 (최근 10년)</h3>
                            <SimpleLineChart data={timeSeriesData.weight} xKey="year" yKey="weight" color="#10b981" height={150}/>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                {timeSeriesData.weight.filter((d, i) => i % 2 === 0).map((d, i) => <span key={i}>{d.year}</span>)}
                            </div>
                        </div>
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                            <h3 className="font-semibold mb-4"><i className="fas fa-bacon text-yellow-400 mr-2"></i>LDL 콜레스테롤</h3>
                            <SimpleLineChart data={timeSeriesData.cholesterol} xKey="year" yKey="ldl" color="#eab308" height={150}/>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                {timeSeriesData.cholesterol.map(d => <span key={d.year}>{d.year}</span>)}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'checkup' && (
                <div className="space-y-6">
                    {checkupHistory.map((checkup, i) => (
                        <div key={i} className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold"><i className="fas fa-clipboard-list text-blue-400 mr-2"></i>{checkup.year}년 건강검진</h3>
                                <span className="text-sm text-gray-400">{checkup.date} · {checkup.hospital}</span>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                <div className="p-3 bg-gray-700/50 rounded-lg">
                                    <p className="text-xs text-gray-400">신장/체중</p>
                                    <p className="font-bold">{checkup.results.height}cm / {checkup.results.weight}kg</p>
                                    <p className="text-xs text-gray-500">BMI {checkup.results.bmi}</p>
                                </div>
                                <div className="p-3 bg-gray-700/50 rounded-lg">
                                    <p className="text-xs text-gray-400">혈압</p>
                                    <p className={`font-bold ${checkup.results.bp.sys >= 140 ? 'text-red-400' : checkup.results.bp.sys >= 130 ? 'text-yellow-400' : 'text-green-400'}`}>{checkup.results.bp.sys}/{checkup.results.bp.dia}</p>
                                    <p className="text-xs text-gray-500">mmHg</p>
                                </div>
                                <div className="p-3 bg-gray-700/50 rounded-lg">
                                    <p className="text-xs text-gray-400">공복혈당</p>
                                    <p className={`font-bold ${checkup.results.glucose.fasting >= 126 ? 'text-red-400' : checkup.results.glucose.fasting >= 100 ? 'text-yellow-400' : 'text-green-400'}`}>{checkup.results.glucose.fasting}</p>
                                    <p className="text-xs text-gray-500">mg/dL (HbA1c: {checkup.results.glucose.hba1c}%)</p>
                                </div>
                                <div className="p-3 bg-gray-700/50 rounded-lg">
                                    <p className="text-xs text-gray-400">총콜레스테롤</p>
                                    <p className={`font-bold ${checkup.results.cholesterol.total >= 240 ? 'text-red-400' : checkup.results.cholesterol.total >= 200 ? 'text-yellow-400' : 'text-green-400'}`}>{checkup.results.cholesterol.total}</p>
                                    <p className="text-xs text-gray-500">LDL: {checkup.results.cholesterol.ldl}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                <div className="p-3 bg-gray-700/50 rounded-lg">
                                    <p className="text-xs text-gray-400">HDL</p>
                                    <p className={`font-bold ${checkup.results.cholesterol.hdl < 40 ? 'text-red-400' : 'text-green-400'}`}>{checkup.results.cholesterol.hdl}</p>
                                </div>
                                <div className="p-3 bg-gray-700/50 rounded-lg">
                                    <p className="text-xs text-gray-400">중성지방</p>
                                    <p className={`font-bold ${checkup.results.cholesterol.tg >= 150 ? 'text-yellow-400' : 'text-green-400'}`}>{checkup.results.cholesterol.tg}</p>
                                </div>
                                <div className="p-3 bg-gray-700/50 rounded-lg">
                                    <p className="text-xs text-gray-400">간기능 (AST/ALT)</p>
                                    <p className="font-bold">{checkup.results.liver.ast}/{checkup.results.liver.alt}</p>
                                </div>
                                <div className="p-3 bg-gray-700/50 rounded-lg">
                                    <p className="text-xs text-gray-400">신장기능 (GFR)</p>
                                    <p className={`font-bold ${checkup.results.kidney.gfr < 60 ? 'text-red-400' : 'text-green-400'}`}>{checkup.results.kidney.gfr}</p>
                                </div>
                            </div>
                            {checkup.results.findings.length > 0 && (
                                <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                                    <p className="text-sm text-yellow-400 font-medium mb-1">소견</p>
                                    <ul className="text-sm text-gray-300">
                                        {checkup.results.findings.map((f, j) => <li key={j}>· {f}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'medication' && (
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <h3 className="font-semibold mb-4"><i className="fas fa-pills text-blue-400 mr-2"></i>현재 복용 중인 약물</h3>
                    <div className="space-y-4">
                        {currentMedications.map((med, i) => (
                            <div key={i} className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="font-bold text-lg text-blue-400">{med.name}</p>
                                        <p className="text-gray-400">{med.purpose}</p>
                                    </div>
                                    <span className="text-sm text-gray-500">{med.since}~</span>
                                </div>
                                <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                                    <div><span className="text-gray-500">용법:</span> <span>{med.dosage}</span></div>
                                    <div><span className="text-gray-500">처방:</span> <span>{med.prescriber}</span></div>
                                    <div><span className="text-gray-500">병원:</span> <span>{med.hospital}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'family' && (
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <h3 className="font-semibold mb-4"><i className="fas fa-users text-purple-400 mr-2"></i>가족력</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {familyHistory.map((f, i) => (
                            <div key={i} className={`p-4 rounded-lg border ${f.condition !== '특이사항 없음' ? 'bg-orange-500/10 border-orange-500/30' : 'bg-gray-700/50 border-gray-600'}`}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-lg">{f.relation}</span>
                                    <span className="text-sm text-gray-400">{f.age}</span>
                                </div>
                                <p className={f.condition !== '특이사항 없음' ? 'text-orange-400' : 'text-gray-400'}>{f.condition}</p>
                                {f.note && <p className="text-xs text-gray-500 mt-1">{f.note}</p>}
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="font-medium text-red-400 mb-2"><i className="fas fa-exclamation-triangle mr-1"></i>가족력 요약 (의료진 참고)</p>
                        <ul className="text-sm text-gray-300 space-y-1">
                            <li>· 부계: 고혈압, 뇌졸중 (뇌출혈 사망)</li>
                            <li>· 모계: 당뇨병, 고혈압</li>
                            <li>· <strong>심뇌혈관 질환 고위험군</strong> - 적극적 관리 필요</li>
                        </ul>
                    </div>
                </div>
            )}

            {activeTab === 'lifestyle' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                        <h3 className="font-semibold mb-4"><i className="fas fa-smoking-ban text-red-400 mr-2"></i>흡연</h3>
                        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                            <p className="font-bold text-green-400">{lifestyle.smoking.status}</p>
                            <p className="text-sm text-gray-400 mt-1">{lifestyle.smoking.detail}</p>
                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                        <h3 className="font-semibold mb-4"><i className="fas fa-wine-glass text-purple-400 mr-2"></i>음주</h3>
                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                            <p className="font-bold text-yellow-400">{lifestyle.alcohol.status}</p>
                            <p className="text-sm text-gray-400 mt-1">{lifestyle.alcohol.detail}</p>
                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                        <h3 className="font-semibold mb-4"><i className="fas fa-running text-blue-400 mr-2"></i>운동</h3>
                        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                            <p className="font-bold text-blue-400">{lifestyle.exercise.status}</p>
                            <p className="text-sm text-gray-400 mt-1">{lifestyle.exercise.detail}</p>
                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                        <h3 className="font-semibold mb-4"><i className="fas fa-utensils text-orange-400 mr-2"></i>식이</h3>
                        <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                            <p className="font-bold text-orange-400">{lifestyle.diet.status}</p>
                            <p className="text-sm text-gray-400 mt-1">{lifestyle.diet.detail}</p>
                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 lg:col-span-2">
                        <h3 className="font-semibold mb-4"><i className="fas fa-bed text-indigo-400 mr-2"></i>수면</h3>
                        <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                            <p className="font-bold text-indigo-400">{lifestyle.sleep.status}</p>
                            <p className="text-sm text-gray-400 mt-1">{lifestyle.sleep.detail}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* OpenHash 인증 정보 */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <i className="fas fa-link text-cyan-400"></i>
                        <div>
                            <p className="text-sm font-medium">OpenHash 무결성 검증</p>
                            <p className="text-xs text-gray-500 font-mono">0x7a3f...8c2d · 마지막 업데이트: 2024-03-15 14:32:15</p>
                        </div>
                    </div>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                        <i className="fas fa-check-circle mr-1"></i>검증됨
                    </span>
                </div>
            </div>
        </div>
    );
};
