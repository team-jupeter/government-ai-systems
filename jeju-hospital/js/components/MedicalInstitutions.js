const MedicalInstitutions = () => {
    const [data, setData] = React.useState(null);
    const [selectedHospital, setSelectedHospital] = React.useState(null);
    const [hospitalStatus, setHospitalStatus] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState('departments');
    
    React.useEffect(() => {
        fetch('/api/jeju-hospital/institutions').then(r=>r.json()).then(setData).catch(console.error);
    }, []);
    
    const fetchHospitalStatus = async (hospitalId) => {
        setLoading(true);
        setSelectedHospital(hospitalId);
        setActiveTab('departments');
        try {
            const res = await fetch(`/api/jeju-hospital/hospital-status/${hospitalId}`);
            const statusData = await res.json();
            setHospitalStatus(statusData);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };
    
    const closeModal = () => {
        setSelectedHospital(null);
        setHospitalStatus(null);
    };
    
    const refreshStatus = () => {
        if (selectedHospital) {
            fetchHospitalStatus(selectedHospital);
        }
    };
    
    if (!data) return <div className="py-16 text-center"><i className="fas fa-spinner fa-spin text-2xl"></i></div>;
    
    const hospitals = Object.entries(data.hospitals || {});
    const centers = Object.entries(data.health_centers || {});
    
    const getStatusColor = (rate) => {
        if (rate >= 90) return 'red';
        if (rate >= 70) return 'yellow';
        return 'green';
    };
    
    return (
        <section className="py-16 px-4 bg-gray-900">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">
                        <i className="fas fa-hospital mr-3 text-blue-400"></i>제주 권역 의료 네트워크
                    </h2>
                    <p className="text-gray-400">병원 카드를 클릭하면 실시간 현황을 확인할 수 있습니다</p>
                </div>
                
                {/* 병원 카드 */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    {hospitals.map(([id, h]) => (
                        <div 
                            key={id} 
                            onClick={() => fetchHospitalStatus(id)}
                            className="bg-gray-800 rounded-xl p-5 border border-gray-700 cursor-pointer hover:border-blue-500 hover:bg-gray-750 transition-all transform hover:scale-102 hover:shadow-xl"
                        >
                            <div className="flex justify-between mb-3">
                                <div>
                                    <h4 className="font-bold text-lg">{h.name}</h4>
                                    <span className="text-xs px-2 py-1 bg-blue-600/30 text-blue-300 rounded">{h.type}</span>
                                </div>
                                {h.emergency && (
                                    <span className="px-2 py-1 bg-red-600 text-xs rounded-full animate-pulse h-fit">응급실</span>
                                )}
                            </div>
                            <div className="space-y-2 text-sm text-gray-400">
                                <div><i className="fas fa-bed w-5"></i>{h.beds}병상</div>
                                <div><i className="fas fa-user-md w-5"></i>전문의 {h.specialists}명</div>
                                <div><i className="fas fa-stethoscope w-5"></i>{h.departments?.length || 0}개 진료과</div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-gray-700 text-center">
                                <span className="text-blue-400 text-sm">
                                    <i className="fas fa-chart-bar mr-1"></i>실시간 현황 보기
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* 보건소 목록 */}
                <h3 className="text-xl font-bold text-green-400 mb-4">
                    <i className="fas fa-clinic-medical mr-2"></i>보건소/보건지소
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {centers.map(([id, c]) => (
                        <div key={id} className="bg-gray-800 rounded-lg p-3 text-center hover:border-green-500 border border-gray-700 transition-all">
                            <div className="w-8 h-8 bg-green-600/30 rounded-full flex items-center justify-center mx-auto mb-1">
                                <i className="fas fa-plus text-green-400 text-xs"></i>
                            </div>
                            <div className="text-xs font-medium truncate">{c.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* 상세 현황 모달 */}
            {selectedHospital && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={closeModal}>
                    <div className="bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
                        {loading ? (
                            <div className="p-16 text-center">
                                <i className="fas fa-spinner fa-spin text-4xl text-blue-400 mb-4"></i>
                                <p className="text-gray-400">실시간 현황 조회 중...</p>
                            </div>
                        ) : hospitalStatus?.success ? (
                            <div>
                                {/* 모달 헤더 */}
                                <div className="bg-gradient-to-r from-blue-900 to-cyan-900 p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-2xl font-bold">{hospitalStatus.hospital.name}</h3>
                                            <p className="text-gray-300 text-sm mt-1">
                                                {hospitalStatus.hospital.type} | {hospitalStatus.hospital.address}
                                                {hospitalStatus.hospital.emergency && <span className="ml-2 px-2 py-0.5 bg-red-600 rounded text-xs">응급실 운영</span>}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={refreshStatus} className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
                                                <i className="fas fa-sync-alt mr-1"></i>새로고침
                                            </button>
                                            <button onClick={closeModal} className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* 요약 통계 */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                                        <div className="bg-white/10 rounded-lg p-3 text-center">
                                            <div className="text-2xl font-bold text-cyan-400">{hospitalStatus.summary.availableDoctorSlots}</div>
                                            <div className="text-xs text-gray-300">예약 가능 슬롯</div>
                                        </div>
                                        <div className="bg-white/10 rounded-lg p-3 text-center">
                                            <div className="text-2xl font-bold text-green-400">{hospitalStatus.summary.availableBeds}</div>
                                            <div className="text-xs text-gray-300">가용 병상</div>
                                        </div>
                                        <div className="bg-white/10 rounded-lg p-3 text-center">
                                            <div className={`text-2xl font-bold text-${getStatusColor(hospitalStatus.summary.occupancyRate)}-400`}>
                                                {hospitalStatus.summary.occupancyRate}%
                                            </div>
                                            <div className="text-xs text-gray-300">병상 가동률</div>
                                        </div>
                                        <div className="bg-white/10 rounded-lg p-3 text-center">
                                            <div className="text-2xl font-bold text-purple-400">{hospitalStatus.summary.availableEquipment}</div>
                                            <div className="text-xs text-gray-300">가용 장비</div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* 탭 메뉴 */}
                                <div className="border-b border-gray-700 px-6">
                                    <div className="flex gap-1">
                                        {[
                                            {id: 'departments', label: '진료과/의사', icon: 'user-md'},
                                            {id: 'equipment', label: '장비 현황', icon: 'x-ray'},
                                            {id: 'wards', label: '병실 현황', icon: 'bed'}
                                        ].map(tab => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`px-4 py-3 text-sm font-medium transition-colors ${
                                                    activeTab === tab.id 
                                                        ? 'text-blue-400 border-b-2 border-blue-400' 
                                                        : 'text-gray-400 hover:text-white'
                                                }`}
                                            >
                                                <i className={`fas fa-${tab.icon} mr-2`}></i>{tab.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* 탭 컨텐츠 */}
                                <div className="p-6 overflow-y-auto" style={{maxHeight: 'calc(90vh - 280px)'}}>
                                    {/* 진료과/의사 탭 */}
                                    {activeTab === 'departments' && (
                                        <div className="space-y-4">
                                            {hospitalStatus.departments.map((dept, i) => (
                                                <div key={i} className="bg-gray-800 rounded-xl p-4">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <div>
                                                            <h4 className="font-bold text-lg">{dept.name}</h4>
                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                {dept.specialties.map((s, j) => (
                                                                    <span key={j} className="text-xs px-2 py-0.5 bg-gray-700 text-gray-300 rounded">{s}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-sm">
                                                                <span className="text-green-400 font-bold">{dept.totalAvailableSlots}</span>
                                                                <span className="text-gray-500"> / {dept.totalAvailableSlots + dept.totalBookedSlots} 슬롯</span>
                                                            </div>
                                                            <div className="text-xs text-gray-500">대기 {dept.waitingPatients}명</div>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                                        {dept.doctors.map((doc, j) => (
                                                            <div key={j} className="bg-gray-900 rounded-lg p-3">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <div className="w-8 h-8 bg-blue-600/30 rounded-full flex items-center justify-center">
                                                                        <i className="fas fa-user-md text-blue-400 text-sm"></i>
                                                                    </div>
                                                                    <div>
                                                                        <div className="font-medium text-sm">{doc.name}</div>
                                                                        <div className="text-xs text-gray-500">{doc.position}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex justify-between text-xs mb-1">
                                                                    <span className="text-gray-400">예약</span>
                                                                    <span><span className="text-green-400">{doc.available}</span>/{doc.totalSlots}</span>
                                                                </div>
                                                                <div className="w-full bg-gray-700 rounded-full h-1.5">
                                                                    <div 
                                                                        className={`h-1.5 rounded-full ${doc.available > 5 ? 'bg-green-500' : doc.available > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                                        style={{width: `${(doc.booked / doc.totalSlots) * 100}%`}}
                                                                    ></div>
                                                                </div>
                                                                <div className="text-xs text-gray-500 mt-1">
                                                                    다음 가능: {doc.nextAvailable}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {/* 장비 현황 탭 */}
                                    {activeTab === 'equipment' && (
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {hospitalStatus.equipment.map((eq, i) => (
                                                <div key={i} className="bg-gray-800 rounded-xl p-4">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                                                eq.type === '영상' ? 'bg-purple-600/30' :
                                                                eq.type === '수술' ? 'bg-red-600/30' :
                                                                eq.type === '검사' ? 'bg-blue-600/30' : 'bg-green-600/30'
                                                            }`}>
                                                                <i className={`fas fa-${
                                                                    eq.type === '영상' ? 'x-ray' :
                                                                    eq.type === '수술' ? 'procedures' :
                                                                    eq.type === '검사' ? 'vial' : 'medkit'
                                                                } ${
                                                                    eq.type === '영상' ? 'text-purple-400' :
                                                                    eq.type === '수술' ? 'text-red-400' :
                                                                    eq.type === '검사' ? 'text-blue-400' : 'text-green-400'
                                                                }`}></i>
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold">{eq.name}</h4>
                                                                <div className="text-xs text-gray-500">{eq.type} 장비</div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-lg font-bold">
                                                                <span className="text-green-400">{eq.available}</span>
                                                                <span className="text-gray-500">/{eq.total}</span>
                                                            </div>
                                                            <div className="text-xs text-gray-500">가용/전체</div>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        {eq.units.map((unit, j) => (
                                                            <div key={j} className={`p-2 rounded text-center text-xs ${
                                                                unit.status === '가동중' ? 'bg-blue-900/50 border border-blue-500' :
                                                                unit.status === '예약됨' ? 'bg-yellow-900/50 border border-yellow-500' :
                                                                unit.status === '점검중' ? 'bg-red-900/50 border border-red-500' :
                                                                'bg-green-900/50 border border-green-500'
                                                            }`}>
                                                                <div className="font-medium">#{unit.unit}</div>
                                                                <div className={`${
                                                                    unit.status === '가동중' ? 'text-blue-400' :
                                                                    unit.status === '예약됨' ? 'text-yellow-400' :
                                                                    unit.status === '점검중' ? 'text-red-400' : 'text-green-400'
                                                                }`}>{unit.status}</div>
                                                                <div className="text-gray-500 truncate">{unit.nextAvailable}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {/* 병실 현황 탭 */}
                                    {activeTab === 'wards' && (
                                        <div className="space-y-4">
                                            {hospitalStatus.wards.map((ward, i) => (
                                                <div key={i} className="bg-gray-800 rounded-xl p-4">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <div>
                                                            <h4 className="font-bold text-lg flex items-center gap-2">
                                                                {ward.name}
                                                                <span className={`text-xs px-2 py-0.5 rounded ${
                                                                    ward.type === '중환자' ? 'bg-red-600' :
                                                                    ward.type === '응급' ? 'bg-orange-600' :
                                                                    ward.type === 'VIP' ? 'bg-purple-600' :
                                                                    ward.type === '특수' ? 'bg-blue-600' : 'bg-gray-600'
                                                                }`}>{ward.type}</span>
                                                            </h4>
                                                            <div className="text-sm text-gray-400">{ward.floors}</div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-2xl font-bold">
                                                                <span className={`text-${getStatusColor(ward.occupancyRate)}-400`}>{ward.available}</span>
                                                                <span className="text-gray-500 text-lg">/{ward.totalBeds}</span>
                                                            </div>
                                                            <div className="text-xs text-gray-500">가용/전체 병상</div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-2">
                                                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                                                            <span>병상 가동률</span>
                                                            <span className={`text-${getStatusColor(ward.occupancyRate)}-400`}>{ward.occupancyRate}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-700 rounded-full h-3">
                                                            <div 
                                                                className={`h-3 rounded-full bg-${getStatusColor(ward.occupancyRate)}-500 transition-all`}
                                                                style={{width: `${ward.occupancyRate}%`}}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                                                        <div className="bg-gray-900 rounded p-2">
                                                            <div className="text-blue-400 font-bold">{ward.todayAdmissions}</div>
                                                            <div className="text-xs text-gray-500">오늘 입원</div>
                                                        </div>
                                                        <div className="bg-gray-900 rounded p-2">
                                                            <div className="text-green-400 font-bold">{ward.todayDischarges}</div>
                                                            <div className="text-xs text-gray-500">오늘 퇴원</div>
                                                        </div>
                                                        <div className="bg-gray-900 rounded p-2">
                                                            <div className="text-yellow-400 font-bold">{ward.expectedDischarges}</div>
                                                            <div className="text-xs text-gray-500">퇴원 예정</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                
                                {/* 모달 푸터 */}
                                <div className="bg-gray-800 px-6 py-3 flex justify-between items-center text-sm">
                                    <div className="text-gray-500">
                                        <i className="fas fa-clock mr-1"></i>
                                        마지막 업데이트: {new Date(hospitalStatus.lastUpdated).toLocaleString()}
                                    </div>
                                    <div className="flex items-center gap-2 text-green-400">
                                        <i className="fas fa-link"></i>
                                        <span>오픈해시 검증됨</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-16 text-center text-red-400">
                                <i className="fas fa-exclamation-triangle text-4xl mb-4"></i>
                                <p>데이터를 불러오는데 실패했습니다</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};
