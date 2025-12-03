// LegislationProposal 컴포넌트 - 제도개선 제안 (예측 괴리 시 입법 프로세스)
const LegislationProposal = () => {
    const [activeTab, setActiveTab] = useState('discrepancy'); // discrepancy, proposals, feedback
    
    const discrepancyCases = [
        {
            id: 'DISC-2025-001',
            applicationId: 'KR10-2025-0000890',
            title: '블록체인 기반 전자투표 시스템',
            aiPrediction: 65,
            actualResult: 'rejected',
            expectedResult: 'borderline',
            discrepancyType: 'false_positive',
            rejectionReason: '진보성 결여 (제29조 제2항)',
            similarCases: {
                domestic: { granted: 12, rejected: 3 },
                us: { granted: 28, rejected: 5 },
                eu: { granted: 15, rejected: 8 }
            },
            analysisNote: '유사 기술의 해외 등록률(82%)과 국내 거절률 불일치',
            proposedAction: '전자투표 관련 발명의 진보성 판단 기준 명확화 필요',
            status: 'under_review',
            submittedDate: '2025-11-20'
        },
        {
            id: 'DISC-2025-002',
            applicationId: 'KR10-2025-0000456',
            title: 'AI 기반 의료 진단 보조 시스템',
            aiPrediction: 88,
            actualResult: 'rejected',
            expectedResult: 'granted',
            discrepancyType: 'significant_deviation',
            rejectionReason: '산업상 이용가능성 (제29조 제1항)',
            similarCases: {
                domestic: { granted: 8, rejected: 12 },
                us: { granted: 45, rejected: 8 },
                eu: { granted: 22, rejected: 6 }
            },
            analysisNote: 'AI 의료기기 관련 국내 규제가 해외 대비 엄격',
            proposedAction: 'AI 의료 발명의 산업상 이용가능성 판단 기준 완화 검토',
            status: 'proposal_drafted',
            submittedDate: '2025-11-18'
        }
    ];

    const legislationProposals = [
        {
            id: 'PROP-2025-001',
            title: 'AI 발명의 진보성 판단 기준 명확화',
            category: '심사기준',
            targetLaw: '특허·실용신안 심사기준 제3부 제3장',
            summary: 'AI/머신러닝 관련 발명의 진보성 판단 시 기술적 효과의 정량적 평가 기준 도입',
            background: 'AI 발명의 등록률이 해외(78%) 대비 국내(52%)가 현저히 낮음',
            proposedChanges: [
                '정량적 성능 개선(정확도, 처리속도 등) 시 진보성 인정 기준 신설',
                'AI 모델의 학습 데이터/방법론 차별화 시 진보성 인정',
                '해외 동일 발명 등록 시 우선 심사 절차 도입'
            ],
            expectedEffect: '국내 AI 특허 등록률 15~20% 향상 예상',
            status: 'submitted',
            supportCount: 1247,
            submittedDate: '2025-11-15',
            responseDate: null
        },
        {
            id: 'PROP-2025-002',
            title: '블록체인/분산원장 기술 심사기준 개선',
            category: '심사기준',
            targetLaw: '특허·실용신안 심사기준 제9부 제10장',
            summary: '블록체인 관련 발명의 소프트웨어 발명 해당 여부 판단 기준 완화',
            background: '분산원장 기술의 급속한 발전에 심사기준이 미반영',
            proposedChanges: [
                '합의 알고리즘 개선 발명의 기술적 사상 인정 범위 확대',
                '에너지 효율성 개선(오픈해시 등) 발명의 진보성 인정 기준 명확화',
                '탈중앙화 수준에 따른 차별적 심사 기준 도입'
            ],
            expectedEffect: '블록체인 특허 등록 소요 기간 30% 단축',
            status: 'reviewing',
            supportCount: 892,
            submittedDate: '2025-11-10',
            responseDate: '2025-11-25'
        }
    ];

    const getStatusBadge = (status) => {
        const badges = {
            under_review: { label: '검토중', class: 'bg-yellow-100 text-yellow-700' },
            proposal_drafted: { label: '제안서 작성', class: 'bg-blue-100 text-blue-700' },
            submitted: { label: '제출완료', class: 'bg-green-100 text-green-700' },
            reviewing: { label: '심의중', class: 'bg-purple-100 text-purple-700' },
            accepted: { label: '채택', class: 'bg-green-100 text-green-700' },
            rejected: { label: '반려', class: 'bg-red-100 text-red-700' }
        };
        return badges[status] || badges.under_review;
    };

    return (
        <div className="space-y-6 pt-[140px]">
            {/* 페이지 타이틀 */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="text-3xl">⚖️</span>
                        제도개선 제안
                    </h2>
                    <p className="text-gray-500">AI 예측과 실제 결과의 괴리를 분석하고 제도 개선을 제안합니다</p>
                </div>
            </div>

            {/* 소개 배너 */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
                <div className="flex items-start gap-4">
                    <div className="text-4xl">💡</div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">AI 기반 제도개선 피드백 시스템</h3>
                        <p className="text-purple-100 text-sm">
                            AI의 등록 예측과 실제 심사 결과가 현저히 다르거나, 국내외 유사 출원의 결과와 
                            차이가 있을 경우, 시스템이 자동으로 분석하여 제도 개선 제안서를 생성합니다.
                            이를 통해 심사 기준의 일관성과 예측 가능성을 높입니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* 탭 */}
            <div className="flex gap-2">
                {[
                    { id: 'discrepancy', label: '예측 괴리 사례', icon: 'fa-exclamation-triangle', count: discrepancyCases.length },
                    { id: 'proposals', label: '개선 제안서', icon: 'fa-file-alt', count: legislationProposals.length },
                    { id: 'feedback', label: '피드백 현황', icon: 'fa-comments', count: 0 }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 rounded-lg font-medium transition flex items-center gap-2 ${
                            activeTab === tab.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <i className={`fas ${tab.icon}`}></i>
                        {tab.label}
                        {tab.count > 0 && (
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                                activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
                            }`}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* 예측 괴리 사례 */}
            {activeTab === 'discrepancy' && (
                <div className="space-y-4">
                    {discrepancyCases.map((case_, idx) => {
                        const badge = getStatusBadge(case_.status);
                        
                        return (
                            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-mono text-sm text-gray-500">{case_.applicationId}</span>
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${badge.class}`}>
                                                {badge.label}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-gray-800">{case_.title}</h4>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500">AI 예측 vs 실제</div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-bold text-blue-600">{case_.aiPrediction}%</span>
                                            <span className="text-gray-400">→</span>
                                            <span className={`text-xl font-bold ${case_.actualResult === 'granted' ? 'text-green-600' : 'text-red-600'}`}>
                                                {case_.actualResult === 'granted' ? '등록' : '거절'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <div className="text-xs text-gray-500 mb-1">거절 사유</div>
                                        <div className="text-sm font-medium text-red-700">{case_.rejectionReason}</div>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <div className="text-xs text-gray-500 mb-1">유사 사례 (국내)</div>
                                        <div className="text-sm">
                                            등록 {case_.similarCases.domestic.granted}건 / 거절 {case_.similarCases.domestic.rejected}건
                                        </div>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <div className="text-xs text-gray-500 mb-1">유사 사례 (미국)</div>
                                        <div className="text-sm">
                                            등록 {case_.similarCases.us.granted}건 / 거절 {case_.similarCases.us.rejected}건
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                                    <div className="flex items-start gap-2">
                                        <i className="fas fa-lightbulb text-yellow-500 mt-1"></i>
                                        <div>
                                            <div className="font-medium text-yellow-800 mb-1">AI 분석 결과</div>
                                            <p className="text-sm text-yellow-700">{case_.analysisNote}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-start gap-2">
                                        <i className="fas fa-gavel text-blue-500 mt-1"></i>
                                        <div>
                                            <div className="font-medium text-blue-800 mb-1">제안 조치</div>
                                            <p className="text-sm text-blue-700">{case_.proposedAction}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-end gap-2">
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                                        상세 보기
                                    </button>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                                        제안서 생성
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* 개선 제안서 */}
            {activeTab === 'proposals' && (
                <div className="space-y-4">
                    {legislationProposals.map((proposal, idx) => {
                        const badge = getStatusBadge(proposal.status);
                        
                        return (
                            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                                                {proposal.category}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${badge.class}`}>
                                                {badge.label}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-gray-800 text-lg">{proposal.title}</h4>
                                        <p className="text-sm text-gray-500 mt-1">대상: {proposal.targetLaw}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-blue-600">{proposal.supportCount.toLocaleString()}</div>
                                        <div className="text-xs text-gray-500">지지 서명</div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="font-medium text-gray-700 mb-2">제안 요약</div>
                                    <p className="text-sm text-gray-600">{proposal.summary}</p>
                                </div>

                                <div className="mb-4">
                                    <div className="font-medium text-gray-700 mb-2">배경</div>
                                    <p className="text-sm text-gray-600">{proposal.background}</p>
                                </div>

                                <div className="mb-4">
                                    <div className="font-medium text-gray-700 mb-2">주요 변경 사항</div>
                                    <ul className="space-y-1">
                                        {proposal.proposedChanges.map((change, i) => (
                                            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                                <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                                                {change}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                                    <div className="text-sm">
                                        <span className="font-medium text-green-800">기대 효과: </span>
                                        <span className="text-green-700">{proposal.expectedEffect}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <div className="text-sm text-gray-500">
                                        제출일: {proposal.submittedDate}
                                        {proposal.responseDate && ` | 응답일: ${proposal.responseDate}`}
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                                            상세 보기
                                        </button>
                                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                                            지지 서명
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* 피드백 현황 */}
            {activeTab === 'feedback' && (
                <div className="bg-gray-50 rounded-xl p-12 text-center">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">피드백 현황</h3>
                    <p className="text-gray-500">
                        제출된 제안서에 대한 특허청의 피드백과<br/>
                        제도 개선 진행 현황을 확인할 수 있습니다.
                    </p>
                </div>
            )}
        </div>
    );
};
