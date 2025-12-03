const AINurseChat = ({ patientId }) => {
    const [currentTime, setCurrentTime] = React.useState(new Date());
    const [selectedFacility, setSelectedFacility] = React.useState('all');
    const [selectedTask, setSelectedTask] = React.useState(null);
    const [taskLog, setTaskLog] = React.useState([]);

    // 의료시설 목록
    const facilities = [
        { id: 'jeju-univ', name: '제주대학교병원', type: '상급종합', icon: 'fa-hospital', color: 'blue' },
        { id: 'jeju-medical', name: '제주의료원', type: '종합병원', icon: 'fa-hospital-alt', color: 'green' },
        { id: 'seogwipo', name: '서귀포의료원', type: '종합병원', icon: 'fa-hospital-alt', color: 'purple' },
        { id: 'jeju-dental', name: '제주미소치과', type: '치과', icon: 'fa-tooth', color: 'cyan' },
        { id: 'jeju-health', name: '제주시보건소', type: '보건소', icon: 'fa-clinic-medical', color: 'teal' },
        { id: 'seogwipo-health', name: '서귀포보건소', type: '보건소', icon: 'fa-clinic-medical', color: 'orange' }
    ];

    // 환자 및 간호 업무 데이터
    const [nursingTasks, setNursingTasks] = React.useState([
        // 제주대학교병원
        {
            id: 'task-001',
            facility: 'jeju-univ',
            room: '313호',
            bed: 'A',
            patient: { name: '홍길동', age: 58, gender: '남', condition: '폐렴', doctor: '김철수 교수' },
            tasks: [
                { id: 't1', type: 'medication', time: '08:00', status: 'completed', desc: '세프트리악손 1g 정맥주사', detail: '항생제 투여 완료', completedAt: '08:02' },
                { id: 't2', type: 'infusion', time: '08:30', status: 'in-progress', desc: '생리식염수 1000ml 링겔', detail: '투입속도: 80ml/h', startedAt: '08:32', remaining: '650ml' },
                { id: 't3', type: 'medication', time: '12:00', status: 'pending', desc: '레보플록사신 500mg 경구', detail: '점심 식후 30분' },
                { id: 't4', type: 'vital', time: '14:00', status: 'pending', desc: '활력징후 측정', detail: '체온, 혈압, 맥박, 호흡' },
                { id: 't5', type: 'infusion', time: '16:00', status: 'pending', desc: '포도당 500ml + 비타민C', detail: '투입속도: 60ml/h' }
            ],
            alerts: [{ type: 'info', message: '링겔 잔량 650ml, 약 8시간 후 교체 필요' }]
        },
        {
            id: 'task-002',
            facility: 'jeju-univ',
            room: '315호',
            bed: 'B',
            patient: { name: '김영숙', age: 72, gender: '여', condition: '고관절 수술 후', doctor: '박정형 교수' },
            tasks: [
                { id: 't1', type: 'medication', time: '07:00', status: 'completed', desc: '타이레놀 650mg 경구', detail: '진통제 투여', completedAt: '07:05' },
                { id: 't2', type: 'wound', time: '09:00', status: 'in-progress', desc: '수술부위 드레싱', detail: '소독 및 거즈 교체', startedAt: '09:10' },
                { id: 't3', type: 'rehab', time: '10:30', status: 'pending', desc: '재활운동 보조', detail: '침상 운동 30분' },
                { id: 't4', type: 'vital', time: '13:00', status: 'pending', desc: '활력징후 측정', detail: '수술 후 모니터링' },
                { id: 't5', type: 'medication', time: '19:00', status: 'pending', desc: '헤파린 5000IU 피하주사', detail: '혈전예방' }
            ],
            alerts: [{ type: 'warning', message: '낙상 위험 환자 - 이동 시 보조 필수' }]
        },
        {
            id: 'task-003',
            facility: 'jeju-univ',
            room: 'ICU-02',
            bed: '',
            patient: { name: '이대한', age: 45, gender: '남', condition: '심근경색', doctor: '최심장 교수' },
            tasks: [
                { id: 't1', type: 'vital', time: '매시간', status: 'in-progress', desc: '활력징후 집중 모니터링', detail: 'ECG, SpO2, BP 연속측정', continuous: true },
                { id: 't2', type: 'infusion', time: '계속', status: 'in-progress', desc: '헤파린 지속주입', detail: '1000IU/h, aPTT 모니터링', continuous: true },
                { id: 't3', type: 'medication', time: '06:00', status: 'completed', desc: '아스피린 100mg', detail: '항혈소판제', completedAt: '06:05' },
                { id: 't4', type: 'lab', time: '10:00', status: 'pending', desc: '심장효소 채혈', detail: 'Troponin, CK-MB' },
                { id: 't5', type: 'care', time: '11:00', status: 'pending', desc: '구강간호', detail: '의식있는 상태' }
            ],
            alerts: [{ type: 'critical', message: '중환자 - 15분 간격 집중 관찰 중' }]
        },
        // 제주의료원
        {
            id: 'task-004',
            facility: 'jeju-medical',
            room: '205호',
            bed: '',
            patient: { name: '박순자', age: 68, gender: '여', condition: '당뇨 합병증', doctor: '정내과 과장' },
            tasks: [
                { id: 't1', type: 'glucose', time: '07:00', status: 'completed', desc: '공복 혈당 측정', detail: '결과: 156mg/dL', completedAt: '07:02', value: 156 },
                { id: 't2', type: 'medication', time: '07:30', status: 'completed', desc: '인슐린 노보라피드 8IU', detail: '식전 피하주사', completedAt: '07:28' },
                { id: 't3', type: 'meal', time: '08:00', status: 'completed', desc: '당뇨식 아침 배식', detail: '1800kcal 식단', completedAt: '08:00' },
                { id: 't4', type: 'glucose', time: '11:30', status: 'pending', desc: '식후 2시간 혈당', detail: '점심 전 측정' },
                { id: 't5', type: 'education', time: '14:00', status: 'pending', desc: '인슐린 자가주사 교육', detail: '퇴원 전 환자교육' }
            ],
            alerts: []
        },
        // 제주미소치과
        {
            id: 'task-005',
            facility: 'jeju-dental',
            room: '진료실2',
            bed: '',
            patient: { name: '최민준', age: 34, gender: '남', condition: '충치 치료', doctor: '김치과 원장' },
            tasks: [
                { id: 't1', type: 'prepare', time: '10:00', status: 'completed', desc: '진료 준비', detail: '기구 멸균, 거즈 준비', completedAt: '09:55' },
                { id: 't2', type: 'anesthesia', time: '10:15', status: 'in-progress', desc: '국소마취 보조', detail: '리도카인 1.8ml 준비완료', startedAt: '10:12' },
                { id: 't3', type: 'assist', time: '10:20', status: 'pending', desc: '충치 제거 보조', detail: '석션, 거즈 교환' },
                { id: 't4', type: 'material', time: '10:40', status: 'pending', desc: '레진 충전 준비', detail: 'A2 shade 레진' },
                { id: 't5', type: 'instruction', time: '11:00', status: 'pending', desc: '치료 후 주의사항 안내', detail: '마취 풀릴 때까지 식사 금지' }
            ],
            alerts: [{ type: 'info', message: '다음 환자 10:30 예약 - 스케일링' }]
        },
        // 제주시보건소
        {
            id: 'task-006',
            facility: 'jeju-health',
            room: '건강검진실',
            bed: '',
            patient: { name: '강건강', age: 55, gender: '남', condition: '건강검진', doctor: '이보건 의사' },
            tasks: [
                { id: 't1', type: 'reception', time: '09:00', status: 'completed', desc: '검진 접수 및 안내', detail: '금식 확인 완료', completedAt: '09:02' },
                { id: 't2', type: 'vital', time: '09:10', status: 'completed', desc: '신체계측', detail: '신장 172cm, 체중 78kg, BMI 26.4', completedAt: '09:15' },
                { id: 't3', type: 'vital', time: '09:20', status: 'in-progress', desc: '혈압 측정', detail: '안정 후 측정 중', startedAt: '09:18' },
                { id: 't4', type: 'lab', time: '09:30', status: 'pending', desc: '채혈', detail: '일반혈액, 간기능, 신기능, 지질' },
                { id: 't5', type: 'imaging', time: '09:45', status: 'pending', desc: '흉부 X-ray 안내', detail: '영상의학과 이동' }
            ],
            alerts: []
        },
        // 서귀포보건소
        {
            id: 'task-007',
            facility: 'seogwipo-health',
            room: '예방접종실',
            bed: '',
            patient: { name: '아기별', age: 1, gender: '여', condition: '영유아 예방접종', doctor: '박소아 의사' },
            tasks: [
                { id: 't1', type: 'check', time: '14:00', status: 'completed', desc: '예진 및 접종 전 확인', detail: '발열 없음, 컨디션 양호', completedAt: '14:05' },
                { id: 't2', type: 'medication', time: '14:10', status: 'in-progress', desc: 'DTaP 4차 접종', detail: '대퇴부 근육주사', startedAt: '14:12' },
                { id: 't3', type: 'observation', time: '14:15', status: 'pending', desc: '접종 후 관찰', detail: '30분간 이상반응 관찰' },
                { id: 't4', type: 'education', time: '14:45', status: 'pending', desc: '보호자 교육', detail: '접종 후 주의사항, 다음 일정 안내' },
                { id: 't5', type: 'document', time: '14:50', status: 'pending', desc: '예방접종 증명서 발급', detail: '전자문서 발급' }
            ],
            alerts: [{ type: 'info', message: '다음 접종: 12개월 - MMR, 수두' }]
        }
    ]);

    // AI 간호사 실시간 활동 로그
    const [aiActivities, setAiActivities] = React.useState([
        { time: '09:18:45', facility: '제주시보건소', action: '강건강 환자 혈압 측정 시작', status: 'active' },
        { time: '09:15:30', facility: '제주시보건소', action: '강건강 환자 신체계측 완료 - BMI 26.4 (과체중)', status: 'completed' },
        { time: '09:12:22', facility: '제주미소치과', action: '최민준 환자 국소마취 준비 완료', status: 'active' },
        { time: '09:10:15', facility: '제주대학교병원', action: '김영숙 환자 드레싱 시작 - 수술부위 상태 양호', status: 'active' },
        { time: '09:02:33', facility: '제주시보건소', action: '강건강 환자 건강검진 접수 완료', status: 'completed' },
        { time: '08:32:10', facility: '제주대학교병원', action: '홍길동 환자 생리식염수 1000ml 주입 시작', status: 'active' },
        { time: '08:02:45', facility: '제주대학교병원', action: '홍길동 환자 세프트리악손 1g 정맥주사 완료', status: 'completed' }
    ]);

    // 시간 업데이트
    React.useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // 실시간 업무 진행 시뮬레이션
    React.useEffect(() => {
        const interval = setInterval(() => {
            // 링겔 잔량 감소
            setNursingTasks(prev => prev.map(task => {
                if (task.id === 'task-001') {
                    const infusionTask = task.tasks.find(t => t.id === 't2');
                    if (infusionTask && infusionTask.status === 'in-progress') {
                        const currentRemaining = parseInt(infusionTask.remaining);
                        const newRemaining = Math.max(0, currentRemaining - Math.floor(Math.random() * 3 + 1));
                        return {
                            ...task,
                            tasks: task.tasks.map(t => t.id === 't2' ? { ...t, remaining: `${newRemaining}ml` } : t)
                        };
                    }
                }
                return task;
            }));

            // 새로운 활동 로그 추가 (랜덤)
            if (Math.random() > 0.7) {
                const activities = [
                    { facility: '제주대학교병원', action: '홍길동 환자 링겔 잔량 확인 - 정상 주입 중' },
                    { facility: '제주대학교병원', action: 'ICU 이대한 환자 활력징후 정상 범위 확인' },
                    { facility: '제주의료원', action: '박순자 환자 혈당 기록 PDV 저장 완료' },
                    { facility: '제주미소치과', action: '다음 환자 진료 준비 시작' },
                    { facility: '서귀포보건소', action: '아기별 영유아 예방접종 후 관찰 중' }
                ];
                const randomActivity = activities[Math.floor(Math.random() * activities.length)];
                setAiActivities(prev => [{
                    time: currentTime.toLocaleTimeString('ko-KR'),
                    ...randomActivity,
                    status: Math.random() > 0.5 ? 'active' : 'completed'
                }, ...prev.slice(0, 19)]);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [currentTime]);

    const getTaskIcon = (type) => {
        const icons = {
            medication: 'fa-pills',
            infusion: 'fa-prescription-bottle-medical',
            vital: 'fa-heartbeat',
            wound: 'fa-band-aid',
            rehab: 'fa-walking',
            lab: 'fa-vial',
            care: 'fa-hand-holding-medical',
            glucose: 'fa-tint',
            meal: 'fa-utensils',
            education: 'fa-chalkboard-teacher',
            prepare: 'fa-clipboard-check',
            anesthesia: 'fa-syringe',
            assist: 'fa-hands-helping',
            material: 'fa-box-open',
            instruction: 'fa-comment-medical',
            reception: 'fa-user-check',
            imaging: 'fa-x-ray',
            check: 'fa-stethoscope',
            observation: 'fa-eye',
            document: 'fa-file-medical'
        };
        return icons[type] || 'fa-tasks';
    };

    const getTaskColor = (type) => {
        const colors = {
            medication: 'blue',
            infusion: 'cyan',
            vital: 'red',
            wound: 'orange',
            rehab: 'green',
            lab: 'purple',
            care: 'pink',
            glucose: 'yellow',
            meal: 'amber',
            education: 'indigo',
            prepare: 'gray',
            anesthesia: 'red',
            assist: 'blue',
            material: 'teal',
            instruction: 'green',
            reception: 'blue',
            imaging: 'purple',
            check: 'cyan',
            observation: 'yellow',
            document: 'gray'
        };
        return colors[type] || 'gray';
    };

    const getStatusBadge = (status) => {
        switch(status) {
            case 'completed': return { bg: 'bg-green-500/20', text: 'text-green-400', label: '완료' };
            case 'in-progress': return { bg: 'bg-blue-500/20', text: 'text-blue-400', label: '진행중' };
            case 'pending': return { bg: 'bg-gray-500/20', text: 'text-gray-400', label: '대기' };
            default: return { bg: 'bg-gray-500/20', text: 'text-gray-400', label: status };
        }
    };

    const filteredTasks = selectedFacility === 'all' 
        ? nursingTasks 
        : nursingTasks.filter(t => t.facility === selectedFacility);

    const TaskDetailModal = ({ task, onClose }) => {
        if (!task) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backgroundColor: 'rgba(0,0,0,0.8)'}}>
                <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-2xl w-full max-h-[80vh] overflow-hidden">
                    <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                                <i className="fas fa-user-nurse text-2xl text-pink-400"></i>
                            </div>
                            <div>
                                <h3 className="font-bold">AI 간호사 업무 상세</h3>
                                <p className="text-sm text-gray-400">{facilities.find(f => f.id === task.facility)?.name} {task.room}</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-white"><i className="fas fa-times text-xl"></i></button>
                    </div>
                    <div className="p-4 overflow-y-auto max-h-[60vh]">
                        {/* 환자 정보 */}
                        <div className="bg-gray-700/50 rounded-xl p-4 mb-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-lg font-bold">{task.patient.name}</p>
                                    <p className="text-sm text-gray-400">{task.patient.age}세 / {task.patient.gender} / {task.patient.condition}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-400">담당의</p>
                                    <p className="text-blue-400">{task.patient.doctor}</p>
                                </div>
                            </div>
                        </div>

                        {/* 알림 */}
                        {task.alerts?.map((alert, i) => (
                            <div key={i} className={`mb-4 p-3 rounded-lg border ${alert.type === 'critical' ? 'bg-red-500/20 border-red-500/50' : alert.type === 'warning' ? 'bg-yellow-500/20 border-yellow-500/50' : 'bg-blue-500/20 border-blue-500/50'}`}>
                                <div className="flex items-center space-x-2">
                                    <i className={`fas fa-exclamation-triangle ${alert.type === 'critical' ? 'text-red-400' : alert.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'}`}></i>
                                    <span className="text-sm">{alert.message}</span>
                                </div>
                            </div>
                        ))}

                        {/* 업무 타임라인 */}
                        <h4 className="font-semibold mb-3">오늘의 간호 업무</h4>
                        <div className="space-y-3">
                            {task.tasks.map((t, i) => {
                                const status = getStatusBadge(t.status);
                                const color = getTaskColor(t.type);
                                return (
                                    <div key={i} className={`p-3 rounded-lg border ${t.status === 'in-progress' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-700/30'}`}>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-3">
                                                <div className={`w-10 h-10 rounded-lg bg-${color}-500/20 flex items-center justify-center flex-shrink-0`}>
                                                    <i className={`fas ${getTaskIcon(t.type)} text-${color}-400`}></i>
                                                </div>
                                                <div>
                                                    <p className="font-medium">{t.desc}</p>
                                                    <p className="text-sm text-gray-400">{t.detail}</p>
                                                    {t.completedAt && <p className="text-xs text-green-400 mt-1">완료: {t.completedAt}</p>}
                                                    {t.startedAt && <p className="text-xs text-blue-400 mt-1">시작: {t.startedAt}</p>}
                                                    {t.remaining && <p className="text-xs text-cyan-400 mt-1">잔량: {t.remaining}</p>}
                                                    {t.value && <p className="text-xs text-yellow-400 mt-1">측정값: {t.value}mg/dL</p>}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`px-2 py-1 rounded text-xs ${status.bg} ${status.text}`}>{status.label}</span>
                                                <p className="text-xs text-gray-500 mt-1">{t.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* 업무 상세 모달 */}
            {selectedTask && <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} />}

            {/* 헤더 */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center">
                        <i className="fas fa-user-nurse text-pink-400 mr-3"></i>AI 간호사
                    </h1>
                    <p className="text-gray-400 mt-1">의사 지시에 따른 환자별 간호 업무 실시간 모니터링</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-400">
                        <i className="fas fa-clock mr-2"></i>
                        {currentTime.toLocaleString('ko-KR')}
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-sm text-green-400">AI 간호사 가동중</span>
                    </div>
                </div>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-6 gap-4">
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <i className="fas fa-hospital text-blue-400"></i>
                        <span className="text-2xl font-bold">6</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">연결 시설</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <i className="fas fa-user-injured text-green-400"></i>
                        <span className="text-2xl font-bold">7</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">담당 환자</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <i className="fas fa-tasks text-purple-400"></i>
                        <span className="text-2xl font-bold">{nursingTasks.reduce((acc, t) => acc + t.tasks.length, 0)}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">전체 업무</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-green-500/30">
                    <div className="flex items-center justify-between">
                        <i className="fas fa-check-circle text-green-400"></i>
                        <span className="text-2xl font-bold text-green-400">{nursingTasks.reduce((acc, t) => acc + t.tasks.filter(tt => tt.status === 'completed').length, 0)}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">완료</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-blue-500/30">
                    <div className="flex items-center justify-between">
                        <i className="fas fa-spinner text-blue-400 animate-spin"></i>
                        <span className="text-2xl font-bold text-blue-400">{nursingTasks.reduce((acc, t) => acc + t.tasks.filter(tt => tt.status === 'in-progress').length, 0)}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">진행중</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <i className="fas fa-hourglass-half text-yellow-400"></i>
                        <span className="text-2xl font-bold text-yellow-400">{nursingTasks.reduce((acc, t) => acc + t.tasks.filter(tt => tt.status === 'pending').length, 0)}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">대기중</p>
                </div>
            </div>

            {/* 시설 필터 */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
                <button
                    onClick={() => setSelectedFacility('all')}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap ${selectedFacility === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                    전체 시설
                </button>
                {facilities.map(f => (
                    <button
                        key={f.id}
                        onClick={() => setSelectedFacility(f.id)}
                        className={`px-4 py-2 rounded-lg whitespace-nowrap flex items-center space-x-2 ${selectedFacility === f.id ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                        <i className={`fas ${f.icon}`}></i>
                        <span>{f.name}</span>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 환자별 간호 업무 */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-semibold flex items-center">
                        <i className="fas fa-clipboard-list text-pink-400 mr-2"></i>
                        환자별 간호 업무 현황
                    </h3>
                    <div className="space-y-4">
                        {filteredTasks.map(task => {
                            const facility = facilities.find(f => f.id === task.facility);
                            const completedCount = task.tasks.filter(t => t.status === 'completed').length;
                            const inProgressCount = task.tasks.filter(t => t.status === 'in-progress').length;
                            const hasAlert = task.alerts?.some(a => a.type === 'critical' || a.type === 'warning');
                            
                            return (
                                <div 
                                    key={task.id}
                                    onClick={() => setSelectedTask(task)}
                                    className={`bg-gray-800 rounded-xl border p-4 cursor-pointer hover:bg-gray-750 transition-all ${hasAlert ? 'border-yellow-500/50' : 'border-gray-700'}`}
                                >
                                    {/* 헤더 */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-12 h-12 rounded-xl bg-${facility?.color}-500/20 flex items-center justify-center`}>
                                                <i className={`fas ${facility?.icon} text-xl text-${facility?.color}-400`}></i>
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-bold">{task.patient.name}</span>
                                                    <span className="text-xs text-gray-400">({task.patient.age}세/{task.patient.gender})</span>
                                                    {hasAlert && <i className="fas fa-exclamation-triangle text-yellow-400 animate-pulse"></i>}
                                                </div>
                                                <p className="text-sm text-gray-400">{facility?.name} {task.room}{task.bed && ` ${task.bed}침대`}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs text-gray-500">{task.patient.condition}</span>
                                            <p className="text-xs text-blue-400">{task.patient.doctor}</p>
                                        </div>
                                    </div>

                                    {/* 진행률 */}
                                    <div className="mb-3">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-gray-400">업무 진행률</span>
                                            <span>{completedCount}/{task.tasks.length} 완료</span>
                                        </div>
                                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all" style={{width: `${(completedCount / task.tasks.length) * 100}%`}}></div>
                                        </div>
                                    </div>

                                    {/* 현재 진행중 업무 */}
                                    {inProgressCount > 0 && (
                                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2 mb-2">
                                            <p className="text-xs text-blue-400 mb-1"><i className="fas fa-play-circle mr-1"></i>현재 진행중</p>
                                            {task.tasks.filter(t => t.status === 'in-progress').map((t, i) => (
                                                <div key={i} className="flex items-center space-x-2 text-sm">
                                                    <i className={`fas ${getTaskIcon(t.type)} text-${getTaskColor(t.type)}-400`}></i>
                                                    <span>{t.desc}</span>
                                                    {t.remaining && <span className="text-cyan-400 text-xs">({t.remaining})</span>}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* 업무 미리보기 */}
                                    <div className="flex flex-wrap gap-2">
                                        {task.tasks.slice(0, 5).map((t, i) => {
                                            const status = getStatusBadge(t.status);
                                            return (
                                                <span key={i} className={`px-2 py-1 rounded text-xs ${status.bg} ${status.text} flex items-center space-x-1`}>
                                                    <i className={`fas ${getTaskIcon(t.type)}`}></i>
                                                    <span>{t.time}</span>
                                                </span>
                                            );
                                        })}
                                        {task.tasks.length > 5 && (
                                            <span className="px-2 py-1 rounded text-xs bg-gray-700 text-gray-400">+{task.tasks.length - 5}</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 실시간 활동 로그 */}
                <div className="space-y-4">
                    <h3 className="font-semibold flex items-center">
                        <i className="fas fa-stream text-cyan-400 mr-2"></i>
                        AI 간호사 실시간 활동
                    </h3>
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 h-[600px] overflow-y-auto">
                        <div className="space-y-3">
                            {aiActivities.map((activity, i) => (
                                <div key={i} className={`p-3 rounded-lg border-l-4 ${activity.status === 'active' ? 'bg-blue-500/10 border-blue-500' : 'bg-gray-700/50 border-green-500'}`}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-gray-400">{activity.time}</span>
                                        <span className={`text-xs ${activity.status === 'active' ? 'text-blue-400' : 'text-green-400'}`}>
                                            {activity.status === 'active' ? '진행중' : '완료'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-1">{activity.facility}</p>
                                    <p className="text-sm">{activity.action}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI 간호사 역할 설명 */}
                    <div className="bg-gradient-to-br from-pink-900/30 to-gray-800 rounded-xl border border-pink-500/30 p-4">
                        <h4 className="font-semibold mb-3 flex items-center">
                            <i className="fas fa-robot text-pink-400 mr-2"></i>AI 간호사 역할
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li className="flex items-start space-x-2">
                                <i className="fas fa-check text-green-400 mt-1"></i>
                                <span>의사 지시에 따른 투약 스케줄 관리</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <i className="fas fa-check text-green-400 mt-1"></i>
                                <span>링겔/주사 투여 시간 및 속도 모니터링</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <i className="fas fa-check text-green-400 mt-1"></i>
                                <span>활력징후 측정 일정 알림</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <i className="fas fa-check text-green-400 mt-1"></i>
                                <span>처치 준비물 체크리스트 제공</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <i className="fas fa-check text-green-400 mt-1"></i>
                                <span>환자 상태 이상 시 담당의 자동 알림</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
