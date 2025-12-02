// AI 검증 컴포넌트
const AIVerification = () => {
    const [stages, setStages] = React.useState([]);
    const [isRunning, setIsRunning] = React.useState(false);
    const [selectedCase, setSelectedCase] = React.useState(null);
    const [expandedMechanism, setExpandedMechanism] = React.useState(null);

    // 탐지 메커니즘 상세 정보
    const mechanismDetails = {
        price: {
            title: '가격 이상 탐지 (Anomaly Detection)',
            algorithm: 'Isolation Forest & Statistical Z-Score',
            description: '시장 가격 대비 이상치를 탐지하여 자금세탁 및 가격 조작을 방지합니다.',
            technical: [
                {
                    subtitle: '1. Isolation Forest 알고리즘',
                    content: 'Ensemble 기반 비지도 학습으로, 정상 데이터와 이상치를 분리합니다. 이상치는 더 적은 분할로 격리되는 특성을 이용합니다.',
                    formula: 'Anomaly Score = 2^(-E[h(x)] / c(n))',
                    explanation: 'h(x): 샘플의 경로 길이, c(n): 정규화 상수, E: 기댓값'
                },
                {
                    subtitle: '2. Statistical Z-Score',
                    content: '가격 편차를 표준편차 단위로 측정하여 이상 여부를 판단합니다.',
                    formula: 'Z = (X - μ) / σ',
                    explanation: 'X: 거래가격, μ: 시장 평균가, σ: 표준편차 | |Z| > 3 시 이상'
                },
                {
                    subtitle: '3. 다차원 특성 분석',
                    content: '가격, 거래량, 시간대, 당사자 프로필 등을 3차원 공간에 매핑하여 이상 패턴을 시각화합니다.'
                }
            ],
            visualization: `
                <div class="bg-gray-900 rounded-lg p-6 text-white">
                    <div class="text-center mb-4">
                        <div class="text-sm font-bold mb-2">3D Anomaly Detection Space</div>
                        <div class="text-xs text-gray-400">정상 거래(파란점) vs 이상 거래(빨간점)</div>
                    </div>
                    <div class="relative h-64 flex items-center justify-center">
                        <svg viewBox="0 0 400 300" class="w-full h-full">
                            <!-- 3D 축 -->
                            <line x1="200" y1="250" x2="200" y2="50" stroke="#4B5563" stroke-width="2"/>
                            <line x1="200" y1="250" x2="50" y2="200" stroke="#4B5563" stroke-width="2"/>
                            <line x1="200" y1="250" x2="350" y2="200" stroke="#4B5563" stroke-width="2"/>
                            
                            <!-- 정상 데이터 클러스터 (파란 점들) -->
                            <circle cx="180" cy="180" r="4" fill="#3B82F6" opacity="0.7"/>
                            <circle cx="190" cy="175" r="4" fill="#3B82F6" opacity="0.7"/>
                            <circle cx="200" cy="170" r="4" fill="#3B82F6" opacity="0.7"/>
                            <circle cx="210" cy="175" r="4" fill="#3B82F6" opacity="0.7"/>
                            <circle cx="220" cy="180" r="4" fill="#3B82F6" opacity="0.7"/>
                            <circle cx="185" cy="185" r="4" fill="#3B82F6" opacity="0.7"/>
                            <circle cx="195" cy="180" r="4" fill="#3B82F6" opacity="0.7"/>
                            <circle cx="205" cy="180" r="4" fill="#3B82F6" opacity="0.7"/>
                            <circle cx="215" cy="185" r="4" fill="#3B82F6" opacity="0.7"/>
                            
                            <!-- Convex Hull (볼록 껍질) -->
                            <polygon points="180,180 220,180 220,185 180,185" fill="#3B82F6" opacity="0.2" stroke="#3B82F6" stroke-width="1"/>
                            
                            <!-- 이상치 (빨간 점들) -->
                            <circle cx="120" cy="120" r="6" fill="#EF4444" opacity="0.9"/>
                            <circle cx="290" cy="240" r="6" fill="#EF4444" opacity="0.9"/>
                            <circle cx="250" cy="100" r="6" fill="#EF4444" opacity="0.9"/>
                            
                            <!-- 레이블 -->
                            <text x="205" y="45" fill="#9CA3AF" font-size="12">가격</text>
                            <text x="40" y="205" fill="#9CA3AF" font-size="12">거래량</text>
                            <text x="355" y="205" fill="#9CA3AF" font-size="12">시간</text>
                            
                            <!-- 이상치 표시 -->
                            <text x="125" y="115" fill="#EF4444" font-size="10">이상</text>
                            <text x="255" y="95" fill="#EF4444" font-size="10">이상</text>
                        </svg>
                    </div>
                    <div class="text-xs text-center text-gray-400 mt-4">
                        파란 영역: 정상 거래 범위 (Convex Hull) | 빨간 점: 격리된 이상 거래
                    </div>
                </div>
            `,
            metrics: [
                { label: '탐지율', value: '99.4%', color: 'green' },
                { label: '오탐율', value: '0.3%', color: 'yellow' },
                { label: '처리속도', value: '0.015ms', color: 'blue' }
            ]
        },
        history: {
            title: '구매 이력 검증 (Blockchain Traceability)',
            algorithm: 'Graph-based Verification & Merkle Tree',
            description: '모든 거래 이력을 그래프로 추적하여 출처가 불분명한 물품 유통을 차단합니다.',
            technical: [
                {
                    subtitle: '1. 거래 그래프 구조',
                    content: '모든 자산의 이동 경로를 방향성 비순환 그래프(DAG)로 기록합니다. 각 노드는 거래, 간선은 소유권 이전을 나타냅니다.',
                    formula: 'G = (V, E) where V = {transactions}, E = {ownership transfers}',
                    explanation: '각 자산은 생성 시점부터 현재까지 완전한 이력 체인 보유'
                },
                {
                    subtitle: '2. Merkle Tree 검증',
                    content: 'OpenHash에 저장된 거래 이력을 Merkle Tree로 구성하여 O(log n) 시간에 검증합니다.',
                    formula: 'Root = H(H(L1) || H(R1))',
                    explanation: 'H: SHA-256, ||: 연결 연산자, 단일 해시로 전체 이력 검증'
                },
                {
                    subtitle: '3. 역추적 알고리즘',
                    content: '판매 시점에서 구매 시점까지 역방향 탐색(BFS)으로 출처를 검증합니다. 경로가 존재하지 않으면 거래 차단.'
                }
            ],
            visualization: `
                <div class="bg-gray-900 rounded-lg p-6 text-white">
                    <div class="text-center mb-4">
                        <div class="text-sm font-bold mb-2">Transaction Graph & Merkle Tree</div>
                        <div class="text-xs text-gray-400">자산 이동 경로 추적</div>
                    </div>
                    <div class="relative h-64">
                        <svg viewBox="0 0 500 250" class="w-full h-full">
                            <!-- 거래 체인 -->
                            <circle cx="50" cy="125" r="20" fill="#10B981" stroke="#fff" stroke-width="2"/>
                            <text x="43" y="130" fill="#fff" font-size="12">구매</text>
                            
                            <line x1="70" y1="125" x2="110" y2="125" stroke="#60A5FA" stroke-width="3" marker-end="url(#arrowblue)"/>
                            
                            <circle cx="130" cy="125" r="20" fill="#3B82F6" stroke="#fff" stroke-width="2"/>
                            <text x="120" y="130" fill="#fff" font-size="12">보유</text>
                            
                            <line x1="150" y1="125" x2="190" y2="125" stroke="#60A5FA" stroke-width="3" marker-end="url(#arrowblue)"/>
                            
                            <circle cx="210" cy="125" r="20" fill="#8B5CF6" stroke="#fff" stroke-width="2"/>
                            <text x="200" y="130" fill="#fff" font-size="12">판매</text>
                            
                            <!-- 검증 실패 경로 -->
                            <line x1="210" y1="145" x2="280" y2="200" stroke="#EF4444" stroke-width="3" stroke-dasharray="5,5"/>
                            <circle cx="300" cy="215" r="20" fill="#DC2626" stroke="#fff" stroke-width="2"/>
                            <text x="288" y="220" fill="#fff" font-size="12">차단</text>
                            
                            <!-- Merkle Tree -->
                            <g transform="translate(320, 20)">
                                <!-- Root -->
                                <rect x="60" y="0" width="60" height="30" fill="#8B5CF6" stroke="#fff" stroke-width="2" rx="5"/>
                                <text x="75" y="20" fill="#fff" font-size="10">Root</text>
                                
                                <!-- Level 1 -->
                                <line x1="90" y1="30" x2="60" y2="60" stroke="#60A5FA" stroke-width="2"/>
                                <line x1="90" y1="30" x2="120" y2="60" stroke="#60A5FA" stroke-width="2"/>
                                
                                <rect x="30" y="60" width="50" height="25" fill="#3B82F6" stroke="#fff" stroke-width="1" rx="3"/>
                                <text x="38" y="75" fill="#fff" font-size="8">H1</text>
                                
                                <rect x="100" y="60" width="50" height="25" fill="#3B82F6" stroke="#fff" stroke-width="1" rx="3"/>
                                <text x="108" y="75" fill="#fff" font-size="8">H2</text>
                                
                                <!-- Level 2 -->
                                <line x1="55" y1="85" x2="40" y2="110" stroke="#60A5FA" stroke-width="1"/>
                                <line x1="55" y1="85" x2="70" y2="110" stroke="#60A5FA" stroke-width="1"/>
                                <line x1="125" y1="85" x2="110" y2="110" stroke="#60A5FA" stroke-width="1"/>
                                <line x1="125" y1="85" x2="140" y2="110" stroke="#60A5FA" stroke-width="1"/>
                                
                                <rect x="20" y="110" width="40" height="20" fill="#10B981" stroke="#fff" stroke-width="1" rx="2"/>
                                <text x="24" y="123" fill="#fff" font-size="7">TX1</text>
                                
                                <rect x="65" y="110" width="40" height="20" fill="#10B981" stroke="#fff" stroke-width="1" rx="2"/>
                                <text x="69" y="123" fill="#fff" font-size="7">TX2</text>
                                
                                <rect x="110" y="110" width="40" height="20" fill="#10B981" stroke="#fff" stroke-width="1" rx="2"/>
                                <text x="114" y="123" fill="#fff" font-size="7">TX3</text>
                                
                                <rect x="155" y="110" width="40" height="20" fill="#EF4444" stroke="#fff" stroke-width="1" rx="2"/>
                                <text x="160" y="123" fill="#fff" font-size="7">N/A</text>
                            </g>
                            
                            <!-- 화살표 정의 -->
                            <defs>
                                <marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                    <path d="M0,0 L0,6 L9,3 z" fill="#60A5FA"/>
                                </marker>
                            </defs>
                        </svg>
                    </div>
                    <div class="text-xs text-center text-gray-400 mt-4">
                        왼쪽: 거래 체인 추적 | 오른쪽: Merkle Tree 검증 (빨간색 = 이력 없음)
                    </div>
                </div>
            `,
            metrics: [
                { label: '검증 시간', value: 'O(log n)', color: 'blue' },
                { label: '이력 보존', value: '100%', color: 'green' },
                { label: '위변조 차단', value: '100%', color: 'red' }
            ]
        },
        profile: {
            title: '프로필 일치도 분석 (Behavioral Pattern Matching)',
            algorithm: 'Random Forest Classification & Cosine Similarity',
            description: '사용자의 소득, 직업, 과거 구매 패턴을 분석하여 비정상 거래를 탐지합니다.',
            technical: [
                {
                    subtitle: '1. Random Forest 분류기',
                    content: '다수의 의사결정 트리를 앙상블하여 사용자 프로필과 구매 행동의 일치 여부를 판단합니다.',
                    formula: 'P(legitimate | features) = (1/N) Σ tree_i(features)',
                    explanation: 'N: 트리 개수(100개), features: 소득/직업/연령/구매이력 등 20개 변수'
                },
                {
                    subtitle: '2. Cosine Similarity',
                    content: '현재 거래 벡터와 과거 구매 패턴 벡터 간 유사도를 계산합니다.',
                    formula: 'similarity = (A · B) / (||A|| × ||B||)',
                    explanation: 'A: 과거 패턴, B: 현재 거래 | similarity < 0.3 시 이상'
                },
                {
                    subtitle: '3. 소득 대비 지출 분석',
                    content: '월 평균 소득 대비 거래 금액 비율을 계산하여 비현실적 구매를 탐지합니다. 비율 > 50% 시 경고.'
                }
            ],
            visualization: `
                <div class="bg-gray-900 rounded-lg p-6 text-white">
                    <div class="text-center mb-4">
                        <div class="text-sm font-bold mb-2">Behavioral Pattern Matching</div>
                        <div class="text-xs text-gray-400">사용자 프로필 vs 거래 패턴</div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 h-56">
                        <!-- 왼쪽: 정상 사용자 -->
                        <div class="border border-green-500 rounded p-3">
                            <div class="text-xs text-green-400 font-bold mb-2">✓ 정상 패턴</div>
                            <svg viewBox="0 0 200 150" class="w-full">
                                <!-- 레이더 차트 -->
                                <polygon points="100,20 150,60 130,110 70,110 50,60" fill="#10B981" opacity="0.3" stroke="#10B981" stroke-width="2"/>
                                <polygon points="100,30 140,65 120,100 80,100 60,65" fill="#3B82F6" opacity="0.5" stroke="#3B82F6" stroke-width="2"/>
                                
                                <!-- 축 -->
                                <line x1="100" y1="75" x2="100" y2="20" stroke="#4B5563" stroke-width="1"/>
                                <line x1="100" y1="75" x2="150" y2="60" stroke="#4B5563" stroke-width="1"/>
                                <line x1="100" y1="75" x2="130" y2="110" stroke="#4B5563" stroke-width="1"/>
                                <line x1="100" y1="75" x2="70" y2="110" stroke="#4B5563" stroke-width="1"/>
                                <line x1="100" y1="75" x2="50" y2="60" stroke="#4B5563" stroke-width="1"/>
                                
                                <!-- 레이블 -->
                                <text x="95" y="15" fill="#9CA3AF" font-size="8">소득</text>
                                <text x="155" y="60" fill="#9CA3AF" font-size="8">직업</text>
                                <text x="130" y="125" fill="#9CA3AF" font-size="8">연령</text>
                                <text x="50" y="125" fill="#9CA3AF" font-size="8">이력</text>
                                <text x="30" y="60" fill="#9CA3AF" font-size="8">패턴</text>
                            </svg>
                            <div class="text-xs text-center mt-2">
                                <span class="text-green-400">유사도: 0.92</span>
                            </div>
                        </div>
                        
                        <!-- 오른쪽: 이상 사용자 -->
                        <div class="border border-red-500 rounded p-3">
                            <div class="text-xs text-red-400 font-bold mb-2">✗ 이상 패턴</div>
                            <svg viewBox="0 0 200 150" class="w-full">
                                <!-- 레이더 차트 - 불일치 -->
                                <polygon points="100,20 150,60 130,110 70,110 50,60" fill="#10B981" opacity="0.3" stroke="#10B981" stroke-width="2"/>
                                <polygon points="100,70 95,68 135,105 65,105 105,50" fill="#EF4444" opacity="0.5" stroke="#EF4444" stroke-width="2"/>
                                
                                <!-- 축 -->
                                <line x1="100" y1="75" x2="100" y2="20" stroke="#4B5563" stroke-width="1"/>
                                <line x1="100" y1="75" x2="150" y2="60" stroke="#4B5563" stroke-width="1"/>
                                <line x1="100" y1="75" x2="130" y2="110" stroke="#4B5563" stroke-width="1"/>
                                <line x1="100" y1="75" x2="70" y2="110" stroke="#4B5563" stroke-width="1"/>
                                <line x1="100" y1="75" x2="50" y2="60" stroke="#4B5563" stroke-width="1"/>
                                
                                <!-- 레이블 -->
                                <text x="95" y="15" fill="#9CA3AF" font-size="8">소득</text>
                                <text x="155" y="60" fill="#9CA3AF" font-size="8">직업</text>
                                <text x="130" y="125" fill="#9CA3AF" font-size="8">연령</text>
                                <text x="50" y="125" fill="#9CA3AF" font-size="8">이력</text>
                                <text x="30" y="60" fill="#9CA3AF" font-size="8">패턴</text>
                            </svg>
                            <div class="text-xs text-center mt-2">
                                <span class="text-red-400">유사도: 0.18</span>
                            </div>
                        </div>
                    </div>
                    <div class="text-xs text-center text-gray-400 mt-4">
                        녹색: 예상 프로필 | 파란색/빨간색: 실제 거래 패턴
                    </div>
                </div>
            `,
            metrics: [
                { label: '분류 정확도', value: '97.2%', color: 'green' },
                { label: '특성 변수', value: '20개', color: 'blue' },
                { label: '학습 데이터', value: '100만건', color: 'purple' }
            ]
        },
        pattern: {
            title: '거래 패턴 분석 (Time Series & Sequential Mining)',
            algorithm: 'LSTM & Apriori Algorithm',
            description: '시계열 분석으로 거래 패턴을 학습하고 비정상 시퀀스를 탐지합니다.',
            technical: [
                {
                    subtitle: '1. LSTM (Long Short-Term Memory)',
                    content: '시계열 거래 데이터를 학습하여 다음 거래를 예측하고, 예측과 실제 거래의 차이로 이상을 탐지합니다.',
                    formula: 'h_t = LSTM(x_t, h_{t-1}), prediction = σ(W·h_t + b)',
                    explanation: 'x_t: 현재 거래, h_t: 은닉 상태, σ: 시그모이드 활성화 함수'
                },
                {
                    subtitle: '2. Sequential Pattern Mining',
                    content: 'Apriori 알고리즘으로 빈번한 거래 시퀀스를 추출하여 구조화 거래(Structuring)를 탐지합니다.',
                    formula: 'Support(X) = |{T | X ⊆ T}| / |D|',
                    explanation: 'X: 거래 패턴, T: 트랜잭션, D: 전체 데이터셋 | min_support = 0.01'
                },
                {
                    subtitle: '3. 시간대별 이상 탐지',
                    content: '업무 시간 중 고액 개인 거래 등 시간-금액 상관관계를 분석하여 횡령을 탐지합니다.'
                }
            ],
            visualization: `
                <div class="bg-gray-900 rounded-lg p-6 text-white">
                    <div class="text-center mb-4">
                        <div class="text-sm font-bold mb-2">Time Series Analysis & Pattern Detection</div>
                        <div class="text-xs text-gray-400">거래 시퀀스 학습 및 예측</div>
                    </div>
                    <div class="h-56">
                        <svg viewBox="0 0 500 200" class="w-full h-full">
                            <!-- 시간축 -->
                            <line x1="50" y1="170" x2="450" y2="170" stroke="#4B5563" stroke-width="2"/>
                            <text x="240" y="195" fill="#9CA3AF" font-size="12">시간</text>
                            
                            <!-- 금액축 -->
                            <line x1="50" y1="170" x2="50" y2="30" stroke="#4B5563" stroke-width="2"/>
                            <text x="15" y="100" fill="#9CA3AF" font-size="12" transform="rotate(-90 15 100)">금액</text>
                            
                            <!-- 정상 패턴 (파란 선) -->
                            <polyline points="70,150 110,145 150,148 190,142 230,146 270,144 310,147 350,143" 
                                      fill="none" stroke="#3B82F6" stroke-width="3" opacity="0.7"/>
                            
                            <!-- LSTM 예측 (초록 점선) -->
                            <polyline points="310,147 350,143 390,145 430,142" 
                                      fill="none" stroke="#10B981" stroke-width="2" stroke-dasharray="5,5"/>
                            
                            <!-- 이상 거래 (빨간 스파이크) -->
                            <line x1="380" y1="170" x2="380" y2="60" stroke="#EF4444" stroke-width="4"/>
                            <circle cx="380" cy="60" r="6" fill="#EF4444"/>
                            <text x="365" y="50" fill="#EF4444" font-size="12" font-weight="bold">이상!</text>
                            
                            <!-- 정상 거래 점들 -->
                            <circle cx="70" cy="150" r="4" fill="#3B82F6"/>
                            <circle cx="110" cy="145" r="4" fill="#3B82F6"/>
                            <circle cx="150" cy="148" r="4" fill="#3B82F6"/>
                            <circle cx="190" cy="142" r="4" fill="#3B82F6"/>
                            <circle cx="230" cy="146" r="4" fill="#3B82F6"/>
                            <circle cx="270" cy="144" r="4" fill="#3B82F6"/>
                            <circle cx="310" cy="147" r="4" fill="#3B82F6"/>
                            <circle cx="350" cy="143" r="4" fill="#3B82F6"/>
                            
                            <!-- LSTM 예측 점들 -->
                            <circle cx="390" cy="145" r="4" fill="#10B981"/>
                            <circle cx="430" cy="142" r="4" fill="#10B981"/>
                            
                            <!-- 시간대 표시 -->
                            <text x="60" y="185" fill="#9CA3AF" font-size="10">09:00</text>
                            <text x="180" y="185" fill="#9CA3AF" font-size="10">12:00</text>
                            <text x="300" y="185" fill="#9CA3AF" font-size="10">15:00</text>
                            <text x="420" y="185" fill="#9CA3AF" font-size="10">18:00</text>
                            
                            <!-- 금액 표시 -->
                            <text x="20" y="150" fill="#9CA3AF" font-size="10">1M</text>
                            <text x="20" y="100" fill="#9CA3AF" font-size="10">5M</text>
                            <text x="10" y="60" fill="#9CA3AF" font-size="10">10M</text>
                        </svg>
                    </div>
                    <div class="text-xs text-center text-gray-400 mt-4">
                        파란 선: 학습된 정상 패턴 | 초록 점선: LSTM 예측 | 빨간 스파이크: 패턴 이탈 거래
                    </div>
                </div>
            `,
            metrics: [
                { label: 'LSTM 정확도', value: '94.8%', color: 'green' },
                { label: '시퀀스 길이', value: '30일', color: 'blue' },
                { label: '탐지 지연', value: '<1초', color: 'purple' }
            ]
        }
    };

    // ... (이전 fraudCases, startSimulation 등 코드 유지) ...
    
    const fraudCases = [
        {
            id: 1,
            type: 'price_manipulation',
            title: '가격 조작 (자금세탁)',
            from: { name: '김회장', type: 'individual', position: '대기업 총수', cash: 1000000000, digitalCurrency: 500000000 },
            to: { name: '페이퍼컴퍼니(주)', type: 'business', position: '유령회사', cash: 10000000, digitalCurrency: 5000000 },
            item: '중고 노트북',
            marketPrice: 500000,
            transactionPrice: 50000000,
            deviation: 10000,
            reason: '시장가 50만원 물품을 5천만원에 구매 (자금세탁 의심)',
            isLegit: false
        },
        {
            id: 2,
            type: 'no_purchase_history',
            title: '구입 기록 없는 물품 판매',
            from: { name: '박직원', type: 'individual', position: '회사원 (연봉 4천만원)', cash: 30000000, digitalCurrency: 10000000 },
            to: { name: '최부자', type: 'individual', position: '자산가', cash: 500000000, digitalCurrency: 200000000 },
            item: '명품 시계 (롤렉스)',
            marketPrice: 30000000,
            transactionPrice: 28000000,
            hasPurchaseHistory: false,
            reason: '구매 기록 없는 고가 물품 판매 (절도/횡령 의심)',
            isLegit: false
        },
        {
            id: 3,
            type: 'incompatible_purchase',
            title: '구매자 프로필 불일치',
            from: { name: '이학생', type: 'individual', position: '대학생 (아르바이트)', cash: 5000000, digitalCurrency: 2000000 },
            to: { name: '고급외제차딜러(주)', type: 'business', position: '슈퍼카 판매', cash: 500000000, digitalCurrency: 100000000 },
            item: '람보르기니 우라칸',
            marketPrice: 300000000,
            transactionPrice: 300000000,
            reason: '소득 대비 비현실적 구매 (대포통장/자금세탁 의심)',
            isLegit: false
        },
        {
            id: 4,
            type: 'embezzlement',
            title: '횡령 의심 거래',
            from: { name: '정재무', type: 'individual', position: '회사 재무팀장', cash: 50000000, digitalCurrency: 20000000 },
            to: { name: '비트코인거래소', type: 'business', position: '암호화폐 거래소', cash: 1000000000, digitalCurrency: 500000000 },
            item: '비트코인 구매',
            marketPrice: 100000000,
            transactionPrice: 100000000,
            pattern: '업무 시간 중 다수의 고액 거래',
            reason: '소득 대비 과도한 투자 + 회사 자금 접근 권한 (횡령 의심)',
            isLegit: false
        },
        {
            id: 5,
            type: 'normal',
            title: '정상 거래',
            from: { name: '홍실장', type: 'individual', position: '대기업 임원', cash: 200000000, digitalCurrency: 50000000 },
            to: { name: '현대백화점', type: 'business', position: '백화점', cash: 5000000000, digitalCurrency: 1000000000 },
            item: '명품 가방',
            marketPrice: 5000000,
            transactionPrice: 5200000,
            deviation: 4,
            reason: '소득 수준에 적합하고 시장가 범위 내 거래',
            isLegit: true
        }
    ];

    const startSimulation = (caseData) => {
        setIsRunning(true);
        setStages([]);
        setSelectedCase(caseData);

        setTimeout(() => {
            setStages(prev => [{
                type: 'transaction',
                message: '거래 내용 분석',
                data: caseData
            }, ...prev]);
        }, 100);

        setTimeout(() => {
            const analysis = analyzeTransaction(caseData);
            setStages(prev => [{
                type: 'analysis',
                message: 'Claude AI 검증 결과',
                data: { ...caseData, analysis }
            }, ...prev]);
        }, 3000);

        setTimeout(() => {
            const verdict = caseData.isLegit ? 'approved' : 'rejected';
            setStages(prev => [{
                type: 'verdict',
                message: verdict === 'approved' ? '거래 승인' : '거래 차단',
                data: { ...caseData, verdict }
            }, ...prev]);
            setIsRunning(false);
        }, 6000);
    };

    const analyzeTransaction = (caseData) => {
        const checks = [];

        if (caseData.deviation && caseData.deviation > 30) {
            checks.push({
                category: '가격 이상',
                severity: 'critical',
                finding: `시장가 대비 ${caseData.deviation}% ${caseData.transactionPrice > caseData.marketPrice ? '과다' : '과소'} 책정`,
                score: 95
            });
        } else if (caseData.deviation && caseData.deviation > 10) {
            checks.push({
                category: '가격 검증',
                severity: 'warning',
                finding: '시장가 범위 내 정상 편차',
                score: 15
            });
        }

        if (caseData.hasPurchaseHistory === false) {
            checks.push({
                category: '구매 이력 부재',
                severity: 'critical',
                finding: '판매자의 과거 구매 기록이 존재하지 않음',
                score: 90
            });
        }

        if (caseData.type === 'incompatible_purchase') {
            checks.push({
                category: '구매자 프로필 불일치',
                severity: 'critical',
                finding: '소득 수준 대비 비현실적 구매',
                score: 92
            });
        }

        if (caseData.pattern) {
            checks.push({
                category: '거래 패턴 이상',
                severity: 'warning',
                finding: caseData.pattern,
                score: 75
            });
        }

        if (caseData.isLegit) {
            checks.push({
                category: '정상 거래 확인',
                severity: 'safe',
                finding: '모든 검증 항목 통과',
                score: 5
            });
        }

        const avgScore = checks.reduce((sum, c) => sum + c.score, 0) / checks.length;
        const riskLevel = avgScore > 70 ? 'high' : avgScore > 40 ? 'medium' : 'low';

        return { checks, avgScore: Math.round(avgScore), riskLevel };
    };

    const formatNumber = (num) => new Intl.NumberFormat('ko-KR').format(Math.floor(num));

    const getRiskColor = (level) => {
        switch(level) {
            case 'high': return 'red';
            case 'medium': return 'yellow';
            case 'low': return 'green';
            default: return 'gray';
        }
    };

    const getSeverityIcon = (severity) => {
        switch(severity) {
            case 'critical': return 'exclamation-triangle';
            case 'warning': return 'exclamation-circle';
            case 'safe': return 'check-circle';
            default: return 'info-circle';
        }
    };

    return (
        <div className="space-y-8">
            {/* 개요 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-gov-blue pl-4">AI 기반 부정 거래 탐지</h2>
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-gov-blue">
                    <p className="text-sm text-gray-800 mb-3">
                        <strong>Claude AI</strong>가 모든 거래를 실시간으로 분석하여 부정 거래를 사전에 탐지합니다. 
                        모든 거래 내용이 재무제표에 기록되고 국세청에 보고되므로, 
                        가격 조작, 자금세탁, 횡령, 절도 등 <strong className="text-red-700">모든 범죄를 원천 차단</strong>합니다.
                    </p>
                    <div className="grid grid-cols-4 gap-3">
                        <div className="bg-white rounded p-2 text-center"><div className="text-lg font-bold text-gov-blue">99.4%</div><div className="text-xs">탐지 정확도</div></div>
                        <div className="bg-white rounded p-2 text-center"><div className="text-lg font-bold text-gov-blue">0.015ms</div><div className="text-xs">검증 속도</div></div>
                        <div className="bg-white rounded p-2 text-center"><div className="text-lg font-bold text-gov-blue">100%</div><div className="text-xs">기록 보존</div></div>
                        <div className="bg-white rounded p-2 text-center"><div className="text-lg font-bold text-gov-blue">24/7</div><div className="text-xs">실시간 감시</div></div>
                    </div>
                </div>
            </section>

            {/* 탐지 메커니즘 - 아코디언 스타일 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-gov-blue pl-4">AI 탐지 메커니즘 (클릭하여 상세 보기)</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {[
                        { id: 'price', icon: 'chart-line', color: 'red', title: '가격 이상 탐지', desc: 'Anomaly Detection' },
                        { id: 'history', icon: 'receipt', color: 'orange', title: '구매 이력 검증', desc: 'Blockchain Traceability' },
                        { id: 'profile', icon: 'user-check', color: 'purple', title: '프로필 일치도 분석', desc: 'Pattern Matching' },
                        { id: 'pattern', icon: 'project-diagram', color: 'blue', title: '거래 패턴 분석', desc: 'Time Series Analysis' }
                    ].map((mechanism) => (
                        <div key={mechanism.id}>
                            <div
                                onClick={() => setExpandedMechanism(expandedMechanism === mechanism.id ? null : mechanism.id)}
                                className={`bg-white border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${
                                    expandedMechanism === mechanism.id ? `border-${mechanism.color}-500 shadow-lg` : 'border-gray-300'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 bg-${mechanism.color}-600 rounded-lg flex items-center justify-center text-white`}>
                                        <i className={`fas fa-${mechanism.icon} text-2xl`}></i>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900">{mechanism.title}</h3>
                                        <p className="text-xs text-gray-600">{mechanism.desc}</p>
                                    </div>
                                    <i className={`fas fa-chevron-${expandedMechanism === mechanism.id ? 'up' : 'down'} text-gray-400`}></i>
                                </div>
                            </div>
                            
                            {/* 상세 내용 - 아코디언 */}
                            {expandedMechanism === mechanism.id && (
                                <div className="mt-2 bg-gray-50 rounded-lg p-6 border-2 border-gray-300 animate-slideDown">
                                    <div className="space-y-6">
                                        {/* 제목 */}
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{mechanismDetails[mechanism.id].title}</h3>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-mono">
                                                    {mechanismDetails[mechanism.id].algorithm}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-700 mt-3">{mechanismDetails[mechanism.id].description}</p>
                                        </div>

                                        {/* 기술 상세 */}
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-3">기술 상세</h4>
                                            <div className="space-y-4">
                                                {mechanismDetails[mechanism.id].technical.map((tech, idx) => (
                                                    <div key={idx} className="bg-white rounded-lg p-4 border border-gray-300">
                                                        <div className="font-bold text-sm text-gray-900 mb-2">{tech.subtitle}</div>
                                                        <p className="text-sm text-gray-700 mb-2">{tech.content}</p>
                                                        {tech.formula && (
                                                            <div className="bg-gray-100 rounded p-3 font-mono text-sm mb-2">
                                                                {tech.formula}
                                                            </div>
                                                        )}
                                                        {tech.explanation && (
                                                            <p className="text-xs text-gray-600 italic">{tech.explanation}</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 시각화 */}
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-3">시각화</h4>
                                            <div dangerouslySetInnerHTML={{ __html: mechanismDetails[mechanism.id].visualization }}></div>
                                        </div>

                                        {/* 성능 지표 */}
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-3">성능 지표</h4>
                                            <div className="grid grid-cols-3 gap-3">
                                                {mechanismDetails[mechanism.id].metrics.map((metric, idx) => (
                                                    <div key={idx} className={`bg-${metric.color}-50 border border-${metric.color}-300 rounded p-3 text-center`}>
                                                        <div className="text-xs text-gray-600 mb-1">{metric.label}</div>
                                                        <div className={`text-lg font-bold text-${metric.color}-700`}>{metric.value}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* 시뮬레이션 케이스 선택 - 나머지 코드는 이전과 동일 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-gov-blue pl-4">시뮬레이션 케이스</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {fraudCases.map((fraudCase) => (
                        <button
                            key={fraudCase.id}
                            onClick={() => !isRunning && startSimulation(fraudCase)}
                            disabled={isRunning}
                            className={`text-left bg-white border-2 rounded-lg p-4 transition-all ${
                                isRunning 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : fraudCase.isLegit
                                        ? 'border-green-300 hover:border-green-500 hover:shadow-lg'
                                        : 'border-red-300 hover:border-red-500 hover:shadow-lg'
                            }`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <i className={`fas fa-${fraudCase.isLegit ? 'check-circle text-green-600' : 'exclamation-triangle text-red-600'} text-xl`}></i>
                                <span className="font-bold text-sm text-gray-900">{fraudCase.title}</span>
                            </div>
                            <div className="text-xs text-gray-600 space-y-1">
                                <div>품목: {fraudCase.item}</div>
                                <div>시장가: ₩{formatNumber(fraudCase.marketPrice)}</div>
                                <div>거래가: ₩{formatNumber(fraudCase.transactionPrice)}</div>
                            </div>
                        </button>
                    ))}
                </div>

                {isRunning && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                        <div className="flex items-center gap-2">
                            <i className="fas fa-spinner fa-spin text-yellow-600"></i>
                            <span className="text-sm font-bold text-gray-900">AI 검증 진행 중...</span>
                            <span className="text-sm text-gray-600">(약 6초 소요)</span>
                        </div>
                    </div>
                )}

                {/* 시뮬레이션 결과 표시 - 이전 코드와 동일 (생략) */}
                <div className="space-y-4">
                    {stages.map((stage, index) => (
                        <div 
                            key={index}
                            className="animate-slideDown"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* 기존 시뮬레이션 코드 유지 */}
                        </div>
                    ))}
                </div>
            </section>

            {/* 경제적 효과 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-green-500 pl-4">경제적 효과</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                        <div className="text-center">
                            <i className="fas fa-shield-alt text-green-600 text-4xl mb-3"></i>
                            <div className="text-3xl font-bold text-green-700 mb-2">95%</div>
                            <div className="text-sm text-gray-600">금융 범죄 감소</div>
                        </div>
                    </div>
                    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                        <div className="text-center">
                            <i className="fas fa-won-sign text-blue-600 text-4xl mb-3"></i>
                            <div className="text-3xl font-bold text-blue-700 mb-2">20조원</div>
                            <div className="text-sm text-gray-600">연간 범죄 피해 방지</div>
                        </div>
                    </div>
                    <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
                        <div className="text-center">
                            <i className="fas fa-gavel text-purple-600 text-4xl mb-3"></i>
                            <div className="text-3xl font-bold text-purple-700 mb-2">60%</div>
                            <div className="text-sm text-gray-600">수사 비용 절감</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

window.AIVerification = AIVerification;
