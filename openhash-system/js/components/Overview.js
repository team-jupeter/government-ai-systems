const Overview = () => {
    const [expandedCard, setExpandedCard] = React.useState(null);

    const features = [
        {
            icon: 'fa-shield-halved',
            title: '확률적 계층 선택',
            description: 'SHA-256 재해싱 기반 확률적 알고리즘으로 Layer 1(70%), Layer 2(20%), Layer 3(10%) 자동 분배',
            details: `
                <h5 class="font-bold text-gov-text mb-3">도 2 기반 7단계 프로세스</h5>
                <ol class="list-decimal list-inside space-y-2 text-gov-text-secondary mb-4">
                    <li>문서 내용 SHA-256 해싱 (32바이트)</li>
                    <li>타임스탬프 생성</li>
                    <li>문서해시 || 타임스탬프 연결 후 1차 재해싱</li>
                    <li>결과를 2차 재해싱</li>
                    <li>범위 변환: N = 결과 mod 100 (0~99)</li>
                    <li>확률 분포 비교: N<70→L1(70%), 70≤N<90→L2(20%), N≥90→L3(10%)</li>
                    <li>선택된 계층으로 전송</li>
                </ol>
                <div class="bg-amber-50 border border-amber-300 rounded p-4">
                    <p class="text-sm text-gov-text-secondary"><strong>보안:</strong> 공격자가 특정 계층을 예측할 확률 = 2<sup>-256</sup> (사실상 불가능)</p>
                    <p class="text-sm text-gov-text-secondary mt-2"><strong>중요:</strong> 확률 분포 수치(70%, 20%, 10%)는 시스템 요구사항에 따라 가변 가능한 설계 선택사항</p>
                </div>
            `
        },
        {
            icon: 'fa-bolt',
            title: '고성능 처리',
            description: '초당 424만 트랜잭션 처리, 비트코인 대비 60만배 이상 빠른 처리 속도',
            details: `
                <h5 class="font-bold text-gov-text mb-3">선형 확장 TPS (청구항 7)</h5>
                <table class="w-full text-sm mb-4">
                    <thead>
                        <tr class="border-b-2 border-gov-border bg-gray-50">
                            <th class="text-left px-4 py-2">노드 수</th>
                            <th class="text-right px-4 py-2">이론적 TPS</th>
                            <th class="text-right px-4 py-2">비트코인 대비</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b border-gov-border">
                            <td class="px-4 py-2 bg-green-50 font-bold">11개 (AWS 실측)</td>
                            <td class="text-right px-4 py-2">481.4 TPS</td>
                            <td class="text-right px-4 py-2 font-bold text-green-700">68.8배</td>
                        </tr>
                        <tr class="border-b border-gov-border">
                            <td class="px-4 py-2">100개</td>
                            <td class="text-right px-4 py-2">6,800 TPS</td>
                            <td class="text-right px-4 py-2">971배</td>
                        </tr>
                        <tr class="border-b border-gov-border">
                            <td class="px-4 py-2">1,000개</td>
                            <td class="text-right px-4 py-2">68,000 TPS</td>
                            <td class="text-right px-4 py-2">9,714배</td>
                        </tr>
                        <tr class="border-b border-gov-border">
                            <td class="px-4 py-2">10,000개</td>
                            <td class="text-right px-4 py-2">680,000 TPS</td>
                            <td class="text-right px-4 py-2">97,143배</td>
                        </tr>
                        <tr>
                            <td class="px-4 py-2 bg-blue-50 font-bold">100,000개 (10Gbps 제약)</td>
                            <td class="text-right px-4 py-2 font-bold">4,882,812 TPS</td>
                            <td class="text-right px-4 py-2 font-bold text-blue-700">697,544배</td>
                        </tr>
                    </tbody>
                </table>
                <p class="text-sm text-gov-text-secondary"><strong>공식:</strong> 전체 TPS = 노드 수 × 80 TPS × 0.85 (네트워크 효율)</p>
            `
        },
        {
            icon: 'fa-leaf',
            title: '에너지 효율',
            description: '작업증명/지분증명 불필요, 비트코인 대비 98.5% 에너지 절감 (121 TWh → 1.8 TWh/년)',
            details: `
                <h5 class="font-bold text-gov-text mb-3">에너지 소비 비교 (표 A-11)</h5>
                <table class="w-full text-sm mb-4">
                    <thead>
                        <tr class="border-b-2 border-gov-border bg-gray-50">
                            <th class="text-left px-4 py-2">항목</th>
                            <th class="text-right px-4 py-2">비트코인</th>
                            <th class="text-right px-4 py-2">오픈해시</th>
                            <th class="text-right px-4 py-2">개선</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b border-gov-border">
                            <td class="px-4 py-2 font-bold">연간 소비</td>
                            <td class="text-right px-4 py-2">121 TWh</td>
                            <td class="text-right px-4 py-2">1.8 TWh</td>
                            <td class="text-right px-4 py-2 font-bold text-green-700">98.5% 절감</td>
                        </tr>
                        <tr class="border-b border-gov-border">
                            <td class="px-4 py-2 font-bold">트랜잭션당</td>
                            <td class="text-right px-4 py-2">1,200 kWh</td>
                            <td class="text-right px-4 py-2">18 Wh</td>
                            <td class="text-right px-4 py-2 font-bold text-green-700">66,667배 효율</td>
                        </tr>
                        <tr>
                            <td class="px-4 py-2 font-bold">탄소 배출</td>
                            <td class="text-right px-4 py-2">65 메가톤 CO₂</td>
                            <td class="text-right px-4 py-2">~1 메가톤 CO₂</td>
                            <td class="text-right px-4 py-2 font-bold text-green-700">98.5% 감소</td>
                        </tr>
                    </tbody>
                </table>
                <p class="text-sm text-gov-text-secondary"><strong>이유:</strong> 작업증명(PoW) 및 지분증명(PoS) 불필요, 확률적 계층 선택(300)만으로 분산 합의</p>
            `
        },
        {
            icon: 'fa-arrows-up-down-left-right',
            title: '무한 확장성',
            description: '노드 수 증가에 비례하여 처리량 선형 증가, 병목 현상 없는 확장 가능 구조',
            details: `
                <h5 class="font-bold text-gov-text mb-3">동적 노드 관리 (도 5, 청구항 13-14)</h5>
                <div class="space-y-4 mb-4">
                    <div class="border border-gov-border rounded p-4">
                        <h6 class="font-bold text-gov-text mb-2">베트남 진입 사례 (AWS 실측)</h6>
                        <ul class="list-disc list-inside space-y-1 text-sm text-gov-text-secondary">
                            <li>추가 노드: +834개 (L1: 800개, L2: 32개, Representative: 2개)</li>
                            <li>TPS 증가: 278,398 → 343,784 (+23.5%)</li>
                            <li>PBFT 임계값 자동 조정: 5-of-8 → 7-of-10</li>
                            <li>재구성 시간: 23.6ms</li>
                            <li>다운타임: 0초 (무중단)</li>
                        </ul>
                    </div>
                    <div class="border border-gov-border rounded p-4">
                        <h6 class="font-bold text-gov-text mb-2">싱가포르 퇴출 사례 (AWS 실측)</h6>
                        <ul class="list-disc list-inside space-y-1 text-sm text-gov-text-secondary">
                            <li>제거 노드: -419개</li>
                            <li>TPS 감소: 343,784 → 310,934 (-9.6%)</li>
                            <li>데이터 손실: 0%</li>
                            <li>자동 재구성: 8.98ms</li>
                            <li>다운타임: 0초 (무중단)</li>
                        </ul>
                    </div>
                </div>
                <p class="text-sm text-gov-text-secondary"><strong>특징:</strong> 국가/기업/개인 단위 자유 진입/퇴출, 기존 네트워크 합의 불필요</p>
            `
        },
        {
            icon: 'fa-lock',
            title: '데이터 무결성',
            description: 'Merkle Tree 기반 검증, BLS 서명, 계층 간 상호 검증으로 위변조 방지',
            details: `
                <h5 class="font-bold text-gov-text mb-3">계층 간 상호 검증 (도 3)</h5>
                <div class="grid md:grid-cols-2 gap-4 mb-4">
                    <div class="border-2 border-blue-300 rounded p-4 bg-blue-50">
                        <h6 class="font-bold text-blue-900 mb-2">⬇ 하향식 검증 (310)</h6>
                        <ul class="list-disc list-inside space-y-1 text-sm text-gov-text-secondary">
                            <li>상위 → 하위 검증</li>
                            <li>BLS 서명(420) 검증</li>
                            <li>Merkle Proof(440) 검증</li>
                            <li>타임스탬프 ±5분 확인</li>
                            <li>실패 시 즉시 격리(620)</li>
                        </ul>
                    </div>
                    <div class="border-2 border-purple-300 rounded p-4 bg-purple-50">
                        <h6 class="font-bold text-purple-900 mb-2">⬆ 상향식 감시 (320)</h6>
                        <ul class="list-disc list-inside space-y-1 text-sm text-gov-text-secondary">
                            <li>하위 → 상위 감시</li>
                            <li>데이터 변조 탐지</li>
                            <li>합의 거부 탐지</li>
                            <li>네트워크 분리 감지</li>
                            <li>이상 시 즉시 차단</li>
                        </ul>
                    </div>
                </div>
                <div class="bg-green-50 border border-green-300 rounded p-4">
                    <p class="text-sm text-gov-text-secondary"><strong>오염 탐지 타임라인:</strong> 0ms 위변조 → 1ms 크로스체크 → 3ms Merkle 검증 → 5ms 격리 완료</p>
                </div>
            `
        },
        {
            icon: 'fa-microchip',
            title: '양자 내성',
            description: 'CRYSTALS-Dilithium 포스트퀀텀 암호화 적용, 미래 양자컴퓨터 공격 대비',
            details: `
                <h5 class="font-bold text-gov-text mb-3">포스트퀀텀 암호화</h5>
                <div class="space-y-4">
                    <div class="border border-gov-border rounded p-4">
                        <h6 class="font-bold text-gov-text mb-2">CRYSTALS-Dilithium</h6>
                        <ul class="list-disc list-inside space-y-1 text-sm text-gov-text-secondary">
                            <li>NIST 표준 포스트퀀텀 전자서명 알고리즘</li>
                            <li>격자 기반 암호화 (Lattice-based Cryptography)</li>
                            <li>양자컴퓨터 Shor 알고리즘 공격 불가능</li>
                            <li>서명 크기: 2.4KB, 검증 속도: 0.3ms</li>
                        </ul>
                    </div>
                    <div class="border border-gov-border rounded p-4">
                        <h6 class="font-bold text-gov-text mb-2">Shamir 비밀 분산 (Representative 노드)</h6>
                        <ul class="list-disc list-inside space-y-1 text-sm text-gov-text-secondary">
                            <li>n=10, k=7 설정 (10개 중 7개 필요)</li>
                            <li>Lagrange 보간법 기반 복원</li>
                            <li>k-1개 이하로는 정보 이론적으로 복원 불가능</li>
                            <li>Layer 3(120) Representative 노드(210)에 적용</li>
                        </ul>
                    </div>
                </div>
            `
        }
    ];

    const toggleCard = (index) => {
        setExpandedCard(expandedCard === index ? null : index);
    };

    return (
        <section className="py-16 bg-gov-gray">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                <HashTransmissionAnimation />
                    <h3 className="text-3xl font-bold text-gov-text mb-4">핵심 기술 특징</h3>
                    <p className="text-gov-text-secondary">기존 통신 인프라를 활용한 혁신적인 분산 신뢰 시스템</p>
                </div>

                {/* 클릭 가능한 6개 카드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {features.map((feature, idx) => (
                        <div key={idx}>
                            <div 
                                onClick={() => toggleCard(idx)}
                                className={`bg-white rounded-lg shadow-sm border-2 p-6 cursor-pointer transition-all ${
                                    expandedCard === idx 
                                        ? 'border-gov-blue shadow-lg' 
                                        : 'border-gov-border hover:shadow-md hover:border-gov-blue-lighter'
                                }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 bg-gov-blue bg-opacity-10 rounded-full flex items-center justify-center">
                                        <i className={`fas ${feature.icon} text-gov-blue text-xl`}></i>
                                    </div>
                                    <i className={`fas fa-chevron-${expandedCard === idx ? 'up' : 'down'} text-gov-blue`}></i>
                                </div>
                                <h4 className="text-lg font-bold text-gov-text mb-2">{feature.title}</h4>
                                <p className="text-sm text-gov-text-secondary leading-relaxed">{feature.description}</p>
                            </div>
                            
                            {/* 상세 설명 슬라이드 */}
                            {expandedCard === idx && (
                                <div className="mt-4 bg-white rounded-lg border-2 border-gov-blue p-6 animate-fadeIn">
                                    <div dangerouslySetInnerHTML={{ __html: feature.details }} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 특허 정보 테이블 */}
                <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-12">
                    <div className="bg-gov-blue text-white px-6 py-4">
                        <h4 className="text-lg font-bold flex items-center">
                            <i className="fas fa-file-contract mr-3"></i>
                            특허 출원 정보
                        </h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b border-gov-border">
                                    <th className="text-left px-6 py-4 bg-gray-50 font-bold text-gov-text" style={{width: '200px'}}>발명의 명칭</th>
                                    <td className="px-6 py-4 text-gov-text-secondary">확률적 계층 분산 기반 데이터 무결성 검증 시스템 및 그 운영 방법</td>
                                </tr>
                                <tr className="border-b border-gov-border">
                                    <th className="text-left px-6 py-4 bg-gray-50 font-bold text-gov-text">영문 명칭</th>
                                    <td className="px-6 py-4 text-gov-text-secondary">Probabilistic Layer Distribution-Based Data Integrity Verification System and Operating Method Thereof</td>
                                </tr>
                                <tr className="border-b border-gov-border">
                                    <th className="text-left px-6 py-4 bg-gray-50 font-bold text-gov-text">IPC 분류</th>
                                    <td className="px-6 py-4 text-gov-text-secondary">H04L 9/32, G06F 16/23, H04L 67/1097, G06N 20/00</td>
                                </tr>
                                <tr className="border-b border-gov-border">
                                    <th className="text-left px-6 py-4 bg-gray-50 font-bold text-gov-text">AWS 검증</th>
                                    <td className="px-6 py-4 text-gov-text-secondary">
                                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold mr-2">
                                            11개 노드 실측 481.4 TPS
                                        </span>
                                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                                            청구항 100% 검증 완료
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 무결성 vs 진실성 구분 테이블 */}
                <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-12">
                    <div className="bg-gov-blue text-white px-6 py-4">
                        <h4 className="text-lg font-bold flex items-center">
                            <i className="fas fa-balance-scale mr-3"></i>
                            데이터 무결성(Integrity) vs 진실성(Truthfulness)
                        </h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b-2 border-gov-border bg-gray-50">
                                    <th className="text-left px-6 py-4 font-bold text-gov-text" style={{width: '50%'}}>✅ 보장하는 것 (무결성)</th>
                                    <th className="text-left px-6 py-4 font-bold text-gov-text" style={{width: '50%'}}>❌ 보장하지 않는 것 (진실성)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gov-border">
                                    <td className="px-6 py-4 text-gov-text-secondary align-top">
                                        <div className="mb-2">
                                            <strong className="text-gov-text">해시값(400) 등록 시점 이후 위변조 방지</strong>
                                        </div>
                                        <div>SHA-256 암호학적 보장</div>
                                    </td>
                                    <td className="px-6 py-4 text-gov-text-secondary align-top bg-red-50">
                                        <div className="mb-2">
                                            <strong className="text-gov-text">기록 시점의 데이터 내용 진위 여부</strong>
                                        </div>
                                        <div>데이터 생산자의 신뢰도에 의존</div>
                                    </td>
                                </tr>
                                <tr className="border-b border-gov-border">
                                    <td className="px-6 py-4 text-gov-text-secondary align-top">
                                        <div className="mb-2">
                                            <strong className="text-gov-text">데이터 존재 증명</strong>
                                        </div>
                                        <div>특정 시점에 해당 데이터 존재 확인</div>
                                    </td>
                                    <td className="px-6 py-4 text-gov-text-secondary align-top bg-red-50">
                                        <div className="mb-2">
                                            <strong className="text-gov-text">데이터 생산자 신뢰도</strong>
                                        </div>
                                        <div>시스템 외부 요인</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-gov-text-secondary align-top">
                                        <div className="mb-2">
                                            <strong className="text-gov-text">시간적 선후 관계 증명</strong>
                                        </div>
                                        <div>타임스탬프 기반 순서 보장</div>
                                    </td>
                                    <td className="px-6 py-4 text-gov-text-secondary align-top bg-red-50">
                                        <div className="px-4 py-3 bg-amber-100 rounded border border-amber-400">
                                            <strong className="text-amber-900">💡 역할: 디지털 공증인</strong>
                                            <div className="text-xs mt-1 text-amber-800">전통적 공증인처럼 서명 시점만 증명</div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 border-t border-gov-border">
                        <p className="text-sm text-gov-text-secondary italic">
                            <strong>예시:</strong> 대법원 판결문(고신뢰 생산자)과 개인 일기장(저신뢰 생산자)은 동일한 무결성을 가지지만, 사회적 신뢰도는 생산자에 따라 상이함
                        </p>
                    </div>
                </div>

                {/* GitHub 링크 */}
                <div className="text-center">
                    <a 
                        href="https://github.com/team-jupeter/government-ai-systems" 
                        target="_blank"
                        className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                        <i className="fab fa-github text-xl mr-3"></i>
                        <span className="font-medium">GitHub 소스코드 저장소</span>
                        <i className="fas fa-external-link-alt ml-2 text-sm"></i>
                    </a>
                    <p className="text-sm text-gov-text-secondary mt-3">
                        확률적 계층 선택, 계층 간 검증, LPBFT 합의, 통합 테스트 코드 공개
                    </p>
                </div>
            </div>
        </section>
    );
};
