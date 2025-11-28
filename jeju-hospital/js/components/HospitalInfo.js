const HospitalInfo = () => {
    const [selectedHospital, setSelectedHospital] = React.useState(null);
    const [activeTab, setActiveTab] = React.useState('doctors');
    const [currentTime, setCurrentTime] = React.useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // 병원 데이터
    const hospitals = [
        {
            id: 'jeju-univ',
            name: '제주대학교병원',
            type: '상급종합병원',
            color: 'blue',
            address: '제주시 아란13길 15',
            tel: '064-717-1114',
            beds: 750,
            established: 1986,
            rating: 4.5,
            reviews: 2847,
            doctors: [
                { name: '김철수', dept: '내과', position: '교수', specialty: '소화기내과', education: '서울대학교 의과대학', career: '25년', certifications: ['내과전문의', '소화기내시경세부전문의'], rating: 4.8, reviews: 342 },
                { name: '박영희', dept: '내과', position: '부교수', specialty: '호흡기내과', education: '연세대학교 의과대학', career: '18년', certifications: ['내과전문의', '호흡기세부전문의'], rating: 4.7, reviews: 256 },
                { name: '이정형', dept: '정형외과', position: '교수', specialty: '척추외과', education: '서울대학교 의과대학', career: '22년', certifications: ['정형외과전문의', '척추외과세부전문의'], rating: 4.9, reviews: 428 },
                { name: '정심장', dept: '심장내과', position: '교수', specialty: '관상동맥질환', education: '가톨릭대학교 의과대학', career: '20년', certifications: ['내과전문의', '심장내과세부전문의', '심혈관중재시술전문의'], rating: 4.8, reviews: 312 },
                { name: '최신경', dept: '신경외과', position: '부교수', specialty: '뇌혈관질환', education: '고려대학교 의과대학', career: '15년', certifications: ['신경외과전문의'], rating: 4.6, reviews: 189 },
                { name: '강소아', dept: '소아청소년과', position: '교수', specialty: '소아감염', education: '이화여자대학교 의과대학', career: '19년', certifications: ['소아청소년과전문의', '감염세부전문의'], rating: 4.7, reviews: 267 },
                { name: '윤산부', dept: '산부인과', position: '교수', specialty: '고위험임신', education: '서울대학교 의과대학', career: '23년', certifications: ['산부인과전문의', '모체태아의학세부전문의'], rating: 4.9, reviews: 398 },
                { name: '장응급', dept: '응급의학과', position: '조교수', specialty: '외상', education: '연세대학교 의과대학', career: '12년', certifications: ['응급의학과전문의', '외상전문의'], rating: 4.5, reviews: 156 }
            ],
            equipment: [
                { name: 'MRI 3.0T', category: '영상', total: 3, operational: 3, inUse: 2, utilization: 78 },
                { name: 'MRI 1.5T', category: '영상', total: 4, operational: 4, inUse: 3, utilization: 82 },
                { name: 'CT 128채널', category: '영상', total: 5, operational: 5, inUse: 4, utilization: 85 },
                { name: 'PET-CT', category: '영상', total: 2, operational: 2, inUse: 1, utilization: 65 },
                { name: 'X-Ray', category: '영상', total: 25, operational: 24, inUse: 18, utilization: 75 },
                { name: '초음파', category: '영상', total: 45, operational: 43, inUse: 32, utilization: 74 },
                { name: '혈관조영기', category: '시술', total: 4, operational: 4, inUse: 2, utilization: 58 },
                { name: '다빈치 로봇', category: '수술', total: 1, operational: 1, inUse: 1, utilization: 92 },
                { name: '수술실', category: '수술', total: 22, operational: 21, inUse: 15, utilization: 71 },
                { name: '인공호흡기', category: 'ICU', total: 45, operational: 42, inUse: 28, utilization: 67 },
                { name: 'ECMO', category: 'ICU', total: 4, operational: 4, inUse: 1, utilization: 25 },
                { name: '투석기', category: '치료', total: 32, operational: 30, inUse: 24, utilization: 80 }
            ],
            reviews_data: [
                { date: '2024-03-10', rating: 5, dept: '내과', comment: '친절하고 자세한 설명에 감사드립니다.', author: '김*희' },
                { date: '2024-03-08', rating: 4, dept: '정형외과', comment: '대기 시간이 좀 길었지만 진료는 만족합니다.', author: '박*수' },
                { date: '2024-03-05', rating: 5, dept: '심장내과', comment: '정심장 교수님 덕분에 건강을 되찾았습니다.', author: '이*정' },
                { date: '2024-03-01', rating: 4, dept: '응급실', comment: '응급 상황에서 빠른 대응 감사합니다.', author: '최*호' }
            ]
        },
        {
            id: 'jeju-med',
            name: '제주의료원',
            type: '종합병원',
            color: 'green',
            address: '제주시 도령로 65',
            tel: '064-786-7114',
            beds: 450,
            established: 1974,
            rating: 4.3,
            reviews: 1523,
            doctors: [
                { name: '박내과', dept: '내과', position: '과장', specialty: '순환기내과', education: '전남대학교 의과대학', career: '20년', certifications: ['내과전문의'], rating: 4.5, reviews: 234 },
                { name: '김외과', dept: '외과', position: '과장', specialty: '위장관외과', education: '제주대학교 의과대학', career: '18년', certifications: ['외과전문의'], rating: 4.4, reviews: 189 },
                { name: '이소아', dept: '소아청소년과', position: '과장', specialty: '소아호흡기', education: '경북대학교 의과대학', career: '15년', certifications: ['소아청소년과전문의'], rating: 4.6, reviews: 212 },
                { name: '정정형', dept: '정형외과', position: '과장', specialty: '관절', education: '부산대학교 의과대학', career: '17년', certifications: ['정형외과전문의'], rating: 4.5, reviews: 198 }
            ],
            equipment: [
                { name: 'MRI 1.5T', category: '영상', total: 2, operational: 2, inUse: 1, utilization: 72 },
                { name: 'CT 64채널', category: '영상', total: 3, operational: 3, inUse: 2, utilization: 78 },
                { name: 'X-Ray', category: '영상', total: 15, operational: 14, inUse: 10, utilization: 71 },
                { name: '초음파', category: '영상', total: 22, operational: 21, inUse: 15, utilization: 71 },
                { name: '수술실', category: '수술', total: 8, operational: 8, inUse: 5, utilization: 63 },
                { name: '인공호흡기', category: 'ICU', total: 18, operational: 17, inUse: 12, utilization: 71 },
                { name: '투석기', category: '치료', total: 15, operational: 14, inUse: 11, utilization: 79 }
            ],
            reviews_data: [
                { date: '2024-03-09', rating: 4, dept: '내과', comment: '지역 병원으로서 훌륭합니다.', author: '강*민' },
                { date: '2024-03-07', rating: 5, dept: '소아청소년과', comment: '아이가 무서워하지 않게 잘 봐주셨어요.', author: '윤*서' }
            ]
        },
        {
            id: 'seogwipo',
            name: '서귀포의료원',
            type: '종합병원',
            color: 'purple',
            address: '서귀포시 장수로 47',
            tel: '064-730-3114',
            beds: 300,
            established: 1984,
            rating: 4.2,
            reviews: 987,
            doctors: [
                { name: '최내과', dept: '내과', position: '과장', specialty: '내분비내과', education: '제주대학교 의과대학', career: '16년', certifications: ['내과전문의', '내분비세부전문의'], rating: 4.4, reviews: 156 },
                { name: '한외과', dept: '외과', position: '과장', specialty: '유방외과', education: '전북대학교 의과대학', career: '14년', certifications: ['외과전문의'], rating: 4.3, reviews: 132 },
                { name: '임산부', dept: '산부인과', position: '과장', specialty: '산과', education: '조선대학교 의과대학', career: '12년', certifications: ['산부인과전문의'], rating: 4.5, reviews: 178 }
            ],
            equipment: [
                { name: 'CT 64채널', category: '영상', total: 2, operational: 2, inUse: 1, utilization: 68 },
                { name: 'X-Ray', category: '영상', total: 10, operational: 10, inUse: 7, utilization: 70 },
                { name: '초음파', category: '영상', total: 15, operational: 14, inUse: 10, utilization: 71 },
                { name: '분만실', category: '산과', total: 3, operational: 3, inUse: 1, utilization: 45 },
                { name: '수술실', category: '수술', total: 5, operational: 5, inUse: 3, utilization: 60 },
                { name: '인공호흡기', category: 'ICU', total: 12, operational: 11, inUse: 7, utilization: 64 }
            ],
            reviews_data: [
                { date: '2024-03-08', rating: 5, dept: '산부인과', comment: '서귀포에서 출산하게 되어 다행이었습니다.', author: '장*우' }
            ]
        },
        {
            id: 'dental1',
            name: '제주미소치과',
            type: '치과',
            color: 'cyan',
            address: '제주시 중앙로 123',
            tel: '064-752-2828',
            beds: 0,
            established: 2010,
            rating: 4.6,
            reviews: 654,
            doctors: [
                { name: '김치과', dept: '일반진료', position: '원장', specialty: '보존치료', education: '서울대학교 치과대학', career: '15년', certifications: ['치과전문의'], rating: 4.7, reviews: 234 },
                { name: '박교정', dept: '교정과', position: '부원장', specialty: '성인교정', education: '연세대학교 치과대학', career: '12년', certifications: ['치과교정과전문의'], rating: 4.8, reviews: 189 },
                { name: '이임플', dept: '임플란트', position: '원장', specialty: '임플란트', education: '경희대학교 치과대학', career: '14년', certifications: ['구강악안면외과전문의'], rating: 4.6, reviews: 167 }
            ],
            equipment: [
                { name: '파노라마 X-Ray', category: '영상', total: 2, operational: 2, inUse: 1, utilization: 65 },
                { name: 'CT (치과용)', category: '영상', total: 1, operational: 1, inUse: 1, utilization: 78 },
                { name: '진료 유니트', category: '진료', total: 8, operational: 8, inUse: 6, utilization: 75 },
                { name: '임플란트 수술장비', category: '수술', total: 2, operational: 2, inUse: 1, utilization: 55 }
            ],
            reviews_data: [
                { date: '2024-03-10', rating: 5, dept: '일반진료', comment: '통증 없이 치료해주셨어요.', author: '한*아' },
                { date: '2024-03-06', rating: 4, dept: '교정과', comment: '교정 상담이 자세했습니다.', author: '송*진' }
            ]
        },
        {
            id: 'health1',
            name: '제주시보건소',
            type: '보건소',
            color: 'teal',
            address: '제주시 광양9길 10',
            tel: '064-728-4000',
            beds: 0,
            established: 1963,
            rating: 4.4,
            reviews: 432,
            doctors: [
                { name: '이보건', dept: '건강검진', position: '보건의료담당', specialty: '예방의학', education: '제주대학교 의과대학', career: '10년', certifications: ['예방의학전문의'], rating: 4.5, reviews: 123 },
                { name: '박예방', dept: '예방접종', position: '담당의', specialty: '감염내과', education: '전남대학교 의과대학', career: '8년', certifications: ['내과전문의'], rating: 4.4, reviews: 98 }
            ],
            equipment: [
                { name: 'X-Ray', category: '영상', total: 2, operational: 2, inUse: 1, utilization: 55 },
                { name: '혈압계', category: '검진', total: 10, operational: 10, inUse: 6, utilization: 60 },
                { name: '혈당측정기', category: '검진', total: 8, operational: 8, inUse: 4, utilization: 50 },
                { name: '체성분분석기', category: '검진', total: 2, operational: 2, inUse: 1, utilization: 45 }
            ],
            reviews_data: [
                { date: '2024-03-09', rating: 5, dept: '예방접종', comment: '무료 독감 예방접종 감사합니다.', author: '오*현' }
            ]
        }
    ];

    const selectedData = hospitals.find(h => h.id === selectedHospital) || hospitals[0];

    // 이용률 색상
    const getUtilColor = (util) => {
        if (util >= 80) return 'red';
        if (util >= 60) return 'yellow';
        return 'green';
    };

    // 별점 렌더링
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars.push(<i key={i} className="fas fa-star text-yellow-400"></i>);
            } else if (i - 0.5 <= rating) {
                stars.push(<i key={i} className="fas fa-star-half-alt text-yellow-400"></i>);
            } else {
                stars.push(<i key={i} className="far fa-star text-gray-600"></i>);
            }
        }
        return stars;
    };

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center">
                        <i className="fas fa-hospital text-blue-400 mr-3"></i>병원 정보
                    </h1>
                    <p className="text-gray-400 mt-1">제주 권역 의료시설 상세 정보</p>
                </div>
                <div className="text-sm text-gray-400">
                    <i className="fas fa-sync-alt animate-spin text-green-400 mr-2"></i>
                    실시간 업데이트
                </div>
            </div>

            {/* 병원 선택 */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
                {hospitals.map(h => (
                    <button
                        key={h.id}
                        onClick={() => setSelectedHospital(h.id)}
                        className={`px-4 py-3 rounded-xl whitespace-nowrap flex items-center space-x-2 transition-all ${
                            (selectedHospital || hospitals[0].id) === h.id 
                            ? `bg-${h.color}-600 text-white` 
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        <i className="fas fa-hospital"></i>
                        <span>{h.name}</span>
                        <span className="text-xs opacity-70">{h.type}</span>
                    </button>
                ))}
            </div>

            {/* 병원 기본 정보 */}
            <div className={`bg-gradient-to-r from-${selectedData.color}-900/30 to-gray-800 rounded-xl border border-${selectedData.color}-500/30 p-6`}>
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">{selectedData.name}</h2>
                        <p className="text-gray-400">{selectedData.type} · 설립 {selectedData.established}년</p>
                        <div className="mt-3 space-y-1 text-sm">
                            <p><i className="fas fa-map-marker-alt text-red-400 mr-2 w-4"></i>{selectedData.address}</p>
                            <p><i className="fas fa-phone text-green-400 mr-2 w-4"></i>{selectedData.tel}</p>
                            {selectedData.beds > 0 && <p><i className="fas fa-bed text-blue-400 mr-2 w-4"></i>병상 {selectedData.beds}개</p>}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center space-x-2">
                            {renderStars(selectedData.rating)}
                            <span className="text-2xl font-bold text-yellow-400">{selectedData.rating}</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">리뷰 {selectedData.reviews.toLocaleString()}개</p>
                    </div>
                </div>
            </div>

            {/* 탭 네비게이션 */}
            <div className="flex space-x-2 border-b border-gray-700 pb-2">
                {[
                    { id: 'doctors', label: '의료진', icon: 'fa-user-md' },
                    { id: 'equipment', label: '의료장비', icon: 'fa-x-ray' },
                    { id: 'reviews', label: '환자 평가', icon: 'fa-comments' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-t-lg flex items-center space-x-2 ${
                            activeTab === tab.id 
                            ? 'bg-gray-800 text-blue-400 border-b-2 border-blue-400' 
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                    >
                        <i className={`fas ${tab.icon}`}></i>
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* 탭 컨텐츠 */}
            {activeTab === 'doctors' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {selectedData.doctors.map((doc, i) => (
                            <div key={i} className="bg-gray-800 rounded-xl border border-gray-700 p-4 hover:border-blue-500/50 transition-all">
                                <div className="flex items-start space-x-4">
                                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center text-2xl">
                                        👨‍⚕️
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-bold text-lg">{doc.name} <span className="text-sm text-gray-400">{doc.position}</span></p>
                                                <p className="text-sm text-blue-400">{doc.dept} · {doc.specialty}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center space-x-1">
                                                    {renderStars(doc.rating)}
                                                </div>
                                                <p className="text-xs text-gray-400">리뷰 {doc.reviews}개</p>
                                            </div>
                                        </div>
                                        <div className="mt-3 space-y-1 text-sm">
                                            <p className="text-gray-400"><i className="fas fa-graduation-cap mr-2 text-purple-400"></i>{doc.education}</p>
                                            <p className="text-gray-400"><i className="fas fa-briefcase mr-2 text-green-400"></i>경력 {doc.career}</p>
                                        </div>
                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {doc.certifications.map((cert, j) => (
                                                <span key={j} className="px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300">{cert}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'equipment' && (
                <div className="space-y-6">
                    {/* 카테고리별 그룹화 */}
                    {['영상', '수술', 'ICU', '치료', '진료', '검진', '산과'].map(category => {
                        const items = selectedData.equipment.filter(e => e.category === category);
                        if (items.length === 0) return null;
                        return (
                            <div key={category} className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                                <h3 className="font-semibold mb-4 flex items-center">
                                    <i className={`fas ${
                                        category === '영상' ? 'fa-x-ray text-cyan-400' :
                                        category === '수술' ? 'fa-procedures text-red-400' :
                                        category === 'ICU' ? 'fa-bed-pulse text-purple-400' :
                                        category === '치료' ? 'fa-hand-holding-medical text-green-400' :
                                        'fa-stethoscope text-blue-400'
                                    } mr-2`}></i>
                                    {category} 장비
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {items.map((eq, i) => (
                                        <div key={i} className="p-3 bg-gray-700/50 rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium">{eq.name}</span>
                                                <span className={`text-xs px-2 py-0.5 rounded bg-${getUtilColor(eq.utilization)}-500/20 text-${getUtilColor(eq.utilization)}-400`}>
                                                    {eq.utilization}%
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm text-gray-400">
                                                <span>보유: {eq.total}대</span>
                                                <span>가동: {eq.operational}대</span>
                                                <span className="text-blue-400">사용중: {eq.inUse}대</span>
                                            </div>
                                            <div className="mt-2 h-2 bg-gray-600 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full bg-${getUtilColor(eq.utilization)}-500 rounded-full`} 
                                                    style={{width: `${eq.utilization}%`}}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {activeTab === 'reviews' && (
                <div className="space-y-4">
                    {/* 평점 요약 */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                        <div className="flex items-center space-x-8">
                            <div className="text-center">
                                <p className="text-5xl font-bold text-yellow-400">{selectedData.rating}</p>
                                <div className="flex justify-center mt-2">{renderStars(selectedData.rating)}</div>
                                <p className="text-sm text-gray-400 mt-1">{selectedData.reviews.toLocaleString()} 리뷰</p>
                            </div>
                            <div className="flex-1 space-y-2">
                                {[5, 4, 3, 2, 1].map(star => {
                                    const percent = star === 5 ? 65 : star === 4 ? 25 : star === 3 ? 7 : star === 2 ? 2 : 1;
                                    return (
                                        <div key={star} className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-400 w-8">{star}점</span>
                                            <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-yellow-500 rounded-full" style={{width: `${percent}%`}}></div>
                                            </div>
                                            <span className="text-sm text-gray-400 w-10">{percent}%</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* 리뷰 목록 */}
                    <div className="space-y-3">
                        {selectedData.reviews_data.map((review, i) => (
                            <div key={i} className="bg-gray-800 rounded-xl border border-gray-700 p-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium">{review.author}</span>
                                            <span className="text-xs text-gray-500">· {review.dept}</span>
                                        </div>
                                        <div className="flex items-center space-x-1 mt-1">
                                            {[...Array(5)].map((_, j) => (
                                                <i key={j} className={`fas fa-star text-sm ${j < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}></i>
                                            ))}
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500">{review.date}</span>
                                </div>
                                <p className="mt-2 text-gray-300">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
