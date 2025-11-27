const LegislativeFeedback = () => {
    const [activeTab, setActiveTab] = React.useState('deviations');
    const [selectedDeviation, setSelectedDeviation] = React.useState(null);

    const deviations = [
        {
            id: 1,
            caseType: '제조물책임',
            icon: '🏭',
            koreaAvg: 35000000,
            oecdAvg: 850000000,
            zScore: -3.2,
            cases: 147,
            status: 'pending',
            recommendation: '징벌적 손해배상 제도 도입',
            relatedLaw: '제조물책임법 제3조',
            description: '동일 유형 사건에서 한국의 평균 배상액이 OECD 평균의 4.1%에 불과',
            proposedChange: '제조물의 결함으로 인한 피해에 대해 실손해의 3배까지 배상 가능하도록 개정'
        },
        {
            id: 2,
            caseType: '의료과실',
            icon: '🏥',
            koreaAvg: 48000000,
            oecdAvg: 420000000,
            zScore: -2.8,
            cases: 89,
            status: 'proposed',
            recommendation: '손해배상 산정 기준 현실화',
            relatedLaw: '의료법 제52조',
            description: '의료사고 피해자에 대한 배상이 선진국 대비 현저히 낮음',
            proposedChange: '위자료 산정 기준 상향 및 일실수입 계산 방식 개선'
        },
        {
            id: 3,
            caseType: '명예훼손 배상',
            icon: '📢',
            koreaAvg: 8000000,
            oecdAvg: 180000000,
            zScore: -3.5,
            cases: 234,
            status: 'reviewing',
            recommendation: '언론중재법 배상한도 상향',
            relatedLaw: '언론중재법 제30조',
            description: '언론에 의한 명예훼손 피해 배상이 억제효과를 갖기 어려운 수준',
            proposedChange: '징벌적 손해배상 도입 및 배상한도 폐지 검토'
        },
        {
            id: 4,
            caseType: '개인정보 유출',
            icon: '🔐',
            koreaAvg: 150000,
            oecdAvg: 25000000,
            zScore: -4.1,
            cases: 56,
            status: 'pending',
            recommendation: '개인정보보호법 제재 강화',
            relatedLaw: '개인정보보호법 제39조',
            description: '기업의 개인정보 유출에 대한 피해보상이 실질적이지 않음',
            proposedChange: '최소 배상액 제도 도입 및 집단소송 활성화'
        }
    ];

    const proposals = [
        {
            id: 'P2025-001',
            title: '제조물책임법 일부개정법률안',
            status: 'submitted',
            submittedDate: '2025-10-15',
            committee: '법제사법위원회',
            progress: 25,
            summary: '징벌적 손해배상 제도 도입을 통한 소비자 보호 강화'
        },
        {
            id: 'P2025-002',
            title: '의료법 일부개정법률안',
            status: 'reviewing',
            submittedDate: '2025-09-20',
            committee: '보건복지위원회',
            progress: 45,
            summary: '의료사고 피해자 배상 기준 현실화'
        },
        {
            id: 'P2025-003',
            title: '언론중재법 일부개정법률안',
            status: 'hearing',
            submittedDate: '2025-08-10',
            committee: '문화체육관광위원회',
            progress: 65,
            summary: '언론에 의한 명예훼손 피해구제 강화'
        }
    ];

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-700',
            proposed: 'bg-blue-100 text-blue-700',
            reviewing: 'bg-purple-100 text-purple-700',
            submitted: 'bg-orange-100 text-orange-700',
            hearing: 'bg-indigo-100 text-indigo-700',
            passed: 'bg-green-100 text-green-700'
        };
        const labels = {
            pending: '분석 중',
            proposed: '제안 준비',
            reviewing: '국회 심의',
            submitted: '제출 완료',
            hearing: '공청회 진행',
            passed: '통과'
        };
        return (
            <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    return (
        <div className="p-6">
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl p-6 text-white">
                    <div className="flex items-start gap-4">
                        <div className="text-4xl">🏛️</div>
                        <div>
                            <h2 className="text-xl font-bold mb-2">법제 환류 시스템</h2>
                            <p className="text-purple-100">
                                AI가 판결 결과를 OECD 8개국과 비교하여 한국 판결이 통계적으로 
                                유의미하게 이탈하는 경우(Z-score ±3.0)를 자동 탐지합니다.
                                이탈의 원인이 법률 자체의 한계에 있다면, 입법부에 법률 개정을 자동으로 제안합니다.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border">
                    <div className="border-b">
                        <div className="flex">
                            <button
                                onClick={() => setActiveTab('deviations')}
                                className={`px-6 py-4 font-medium transition ${
                                    activeTab === 'deviations'
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <i className="fas fa-exclamation-triangle mr-2"></i>
                                판결 이탈 탐지 ({deviations.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('proposals')}
                                className={`px-6 py-4 font-medium transition ${
                                    activeTab === 'proposals'
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <i className="fas fa-gavel mr-2"></i>
                                입법 제안 현황 ({proposals.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('process')}
                                className={`px-6 py-4 font-medium transition ${
                                    activeTab === 'process'
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <i className="fas fa-project-diagram mr-2"></i>
                                환류 프로세스
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        {activeTab === 'deviations' && (
                            <div className="space-y-4">
                                {deviations.map(d => (
                                    <div 
                                        key={d.id} 
                                        className={`border rounded-lg p-6 transition cursor-pointer ${
                                            selectedDeviation?.id === d.id 
                                                ? 'border-blue-500 bg-blue-50' 
                                                : 'hover:border-gray-300'
                                        }`}
                                        onClick={() => setSelectedDeviation(d)}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-3xl">{d.icon}</span>
                                                <div>
                                                    <h4 className="font-bold text-lg">{d.caseType}</h4>
                                                    <p className="text-sm text-gray-500">{d.relatedLaw}</p>
                                                </div>
                                                {getStatusBadge(d.status)}
                                            </div>
                                            <div className={`text-right ${Math.abs(d.zScore) >= 3 ? 'text-red-600' : 'text-yellow-600'}`}>
                                                <div className="text-2xl font-bold">Z = {d.zScore}</div>
                                                <div className="text-xs">통계적 이탈</div>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-4">{d.description}</p>

                                        <div className="grid grid-cols-3 gap-4 mb-4">
                                            <div className="bg-red-50 rounded-lg p-3 text-center">
                                                <div className="text-xs text-gray-500 mb-1">한국 평균</div>
                                                <div className="font-bold text-red-600">
                                                    ₩{d.koreaAvg.toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="bg-blue-50 rounded-lg p-3 text-center">
                                                <div className="text-xs text-gray-500 mb-1">OECD 평균</div>
                                                <div className="font-bold text-blue-600">
                                                    ₩{d.oecdAvg.toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-3 text-center">
                                                <div className="text-xs text-gray-500 mb-1">분석 사건</div>
                                                <div className="font-bold">{d.cases}건</div>
                                            </div>
                                        </div>

                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <i className="fas fa-lightbulb text-yellow-500"></i>
                                                <span className="font-medium text-yellow-800">AI 입법 권고</span>
                                            </div>
                                            <p className="text-sm text-yellow-700">{d.recommendation}</p>
                                        </div>

                                        {selectedDeviation?.id === d.id && (
                                            <div className="mt-4 pt-4 border-t">
                                                <h5 className="font-medium mb-2">제안 개정 내용</h5>
                                                <p className="text-sm text-gray-600 bg-white p-3 rounded border">
                                                    {d.proposedChange}
                                                </p>
                                                <div className="flex justify-end gap-3 mt-4">
                                                    <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
                                                        <i className="fas fa-chart-bar mr-2"></i>상세 분석
                                                    </button>
                                                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">
                                                        <i className="fas fa-gavel mr-2"></i>입법 제안 시작
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'proposals' && (
                            <div className="space-y-4">
                                {proposals.map(p => (
                                    <div key={p.id} className="border rounded-lg p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="text-sm text-gray-500">{p.id}</span>
                                                    {getStatusBadge(p.status)}
                                                </div>
                                                <h4 className="font-bold text-lg">{p.title}</h4>
                                                <p className="text-sm text-gray-500">
                                                    {p.committee} · 제출일: {p.submittedDate}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-blue-600">{p.progress}%</div>
                                                <div className="text-xs text-gray-500">진행률</div>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-4">{p.summary}</p>

                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-blue-600 rounded-full transition-all"
                                                style={{ width: `${p.progress}%` }}
                                            ></div>
                                        </div>

                                        <div className="flex justify-end gap-3 mt-4">
                                            <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
                                                <i className="fas fa-file-alt mr-2"></i>법률안 보기
                                            </button>
                                            <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
                                                <i className="fas fa-comments mr-2"></i>의견 제출
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'process' && (
                            <div>
                                <h3 className="font-bold text-lg mb-6">입법 환류 프로세스</h3>
                                <div className="flex items-start justify-between">
                                    {[
                                        { step: 1, title: '이탈 탐지', icon: 'fa-search', desc: 'AI 자동 분석', detail: 'Z-score ±3.0 기준' },
                                        { step: 2, title: '원인 분석', icon: 'fa-microscope', desc: '법률 vs 판례', detail: '법제 격차 진단' },
                                        { step: 3, title: '개정안 생성', icon: 'fa-file-alt', desc: 'AI 초안 작성', detail: '비교법적 검토' },
                                        { step: 4, title: '국회 제출', icon: 'fa-landmark', desc: '소관 위원회', detail: '의원 발의 연계' },
                                        { step: 5, title: '공론화', icon: 'fa-users', desc: '국민 의견수렴', detail: '6개월 공개 토론' },
                                        { step: 6, title: '법률 개정', icon: 'fa-check-circle', desc: '본회의 통과', detail: '시행령 정비' }
                                    ].map((s, i) => (
                                        <React.Fragment key={s.step}>
                                            <div className="text-center flex-1">
                                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                                    <i className={`fas ${s.icon} text-blue-600 text-xl`}></i>
                                                </div>
                                                <div className="font-bold text-sm">{s.title}</div>
                                                <div className="text-xs text-gray-500">{s.desc}</div>
                                                <div className="text-xs text-blue-600 mt-1">{s.detail}</div>
                                            </div>
                                            {i < 5 && (
                                                <div className="flex items-center pt-6">
                                                    <i className="fas fa-arrow-right text-gray-300"></i>
                                                </div>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>

                                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                                    <h4 className="font-bold mb-4">핵심 원칙</h4>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-white p-4 rounded-lg border">
                                            <div className="text-2xl mb-2">📊</div>
                                            <h5 className="font-medium mb-1">데이터 기반</h5>
                                            <p className="text-sm text-gray-600">
                                                2,480만 건 글로벌 판례 분석을 통한 객관적 이탈 탐지
                                            </p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border">
                                            <div className="text-2xl mb-2">🌍</div>
                                            <h5 className="font-medium mb-1">비교법적 접근</h5>
                                            <p className="text-sm text-gray-600">
                                                OECD 8개국 법제와의 체계적 비교 분석
                                            </p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border">
                                            <div className="text-2xl mb-2">👥</div>
                                            <h5 className="font-medium mb-1">민주적 공론화</h5>
                                            <p className="text-sm text-gray-600">
                                                6개월 국민 의견수렴을 통한 합의 형성
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
