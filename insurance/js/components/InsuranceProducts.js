const InsuranceProducts = () => {
    const [selectedCategory, setSelectedCategory] = React.useState('all');
    const [selectedProduct, setSelectedProduct] = React.useState(null);

    const products = [
        // 건강보험 (3종)
        {
            id: 'health-medical',
            category: 'health',
            name: '실손의료보험',
            icon: '🏥',
            basePrice: 50000,
            maxDiscount: 40,
            coverage: {
                hospitalization: '입원 5천만원',
                outpatient: '통원 30만원',
                surgery: '수술 500만원',
                prescription: '처방 200만원'
            },
            pdvFactors: [
                { factor: '정기 검진', discount: 10 },
                { factor: '운동 습관', discount: 15 },
                { factor: '만성질환 관리', discount: 8 },
                { factor: '비흡연', discount: 7 }
            ],
            features: [
                '청구서류 0장',
                '0.015ms 처리',
                '즉시 입금',
                'AI 자동심사'
            ]
        },
        {
            id: 'health-cancer',
            category: 'health',
            name: '암보험',
            icon: '🎗️',
            basePrice: 80000,
            maxDiscount: 35,
            coverage: {
                general: '일반암 3천만원',
                major: '고액암 5천만원',
                surgery: '수술 1천만원',
                chemotherapy: '항암 2천만원'
            },
            pdvFactors: [
                { factor: '가족력 없음', discount: 12 },
                { factor: '정기 암검진', discount: 10 },
                { factor: '건강식 습관', discount: 8 },
                { factor: '비흡연·절주', discount: 15 }
            ],
            features: [
                '조기발견 인센티브',
                '재발암 보장',
                '치료비 선지급',
                'AI 예측모델'
            ]
        },
        {
            id: 'health-dental',
            category: 'health',
            name: '치아보험',
            icon: '🦷',
            basePrice: 30000,
            maxDiscount: 30,
            coverage: {
                implant: '임플란트 200만원',
                orthodontic: '교정 300만원',
                scaling: '스케일링 연2회',
                cavity: '충치 30만원'
            },
            pdvFactors: [
                { factor: '정기 스케일링', discount: 12 },
                { factor: '칫솔질 횟수', discount: 8 },
                { factor: '당분 제한', discount: 5 },
                { factor: '정기 검진', discount: 5 }
            ],
            features: [
                '예방관리 무료',
                'IoT 칫솔 연동',
                '자동 알림',
                'AI 구강건강점수'
            ]
        },
        // 자동차보험 (2종)
        {
            id: 'auto-comprehensive',
            category: 'auto',
            name: '종합자동차보험',
            icon: '🚗',
            basePrice: 120000,
            maxDiscount: 50,
            coverage: {
                personal1: '대인Ⅰ 무한',
                personal2: '대인Ⅱ 3억',
                property: '대물 2억',
                ownCar: '자차 차량가액'
            },
            pdvFactors: [
                { factor: '안전운전', discount: 20 },
                { factor: '주행거리', discount: 15 },
                { factor: '무사고', discount: 12 },
                { factor: '속도준수', discount: 8 }
            ],
            features: [
                'Pay As You Drive',
                '블랙박스 자동연동',
                'AI 책임비율 산정',
                '수리비 선지급'
            ]
        },
        {
            id: 'auto-liability',
            category: 'auto',
            name: '책임보험',
            icon: '🚙',
            basePrice: 50000,
            maxDiscount: 30,
            coverage: {
                personal1: '대인Ⅰ 무한',
                property: '대물 2천만',
                uninsured: '무보험차상해 2억',
                none: '자차 미보장'
            },
            pdvFactors: [
                { factor: '안전운전', discount: 15 },
                { factor: '주행거리', discount: 10 },
                { factor: '야간운전 제한', discount: 5 }
            ],
            features: [
                '의무보험 자동갱신',
                '저렴한 기본료',
                'PDV 보너스',
                '무사고 추가할인'
            ]
        },
        // 생명보험 (3종)
        {
            id: 'life-whole',
            category: 'life',
            name: '종신보험',
            icon: '❤️',
            basePrice: 150000,
            maxDiscount: 45,
            coverage: {
                death: '사망 1억',
                accidentDeath: '재해사망 2억',
                disability: '장해 1억',
                maturity: '만기환급 110%'
            },
            pdvFactors: [
                { factor: '건강점수 90+', discount: 20 },
                { factor: '안전직업', discount: 12 },
                { factor: '재무안정', discount: 8 },
                { factor: '위험활동 없음', discount: 5 }
            ],
            features: [
                '건강개선시 즉시인하',
                '납입면제',
                '중도인출',
                'AI 건강코칭'
            ]
        },
        {
            id: 'life-term',
            category: 'life',
            name: '정기보험',
            icon: '💚',
            basePrice: 80000,
            maxDiscount: 40,
            coverage: {
                death: '사망 3억',
                accidentDeath: '재해사망 6억',
                cancer: '암진단 5천만',
                critical: '3대질병 3천만'
            },
            pdvFactors: [
                { factor: '비흡연', discount: 15 },
                { factor: '검진 양호', discount: 12 },
                { factor: '안전 취미', discount: 8 },
                { factor: '가족력 양호', discount: 5 }
            ],
            features: [
                '저렴한 순수보장형',
                '갱신형/비갱신형',
                '기간 자유설정',
                '재언더라이팅'
            ]
        },
        {
            id: 'life-annuity',
            category: 'life',
            name: '연금보험',
            icon: '👴',
            basePrice: 200000,
            maxDiscount: 25,
            coverage: {
                pension: '월 200만 종신',
                death: '사망 110%',
                withdrawal: '중도인출 80%',
                additional: '추가납입 무제한'
            },
            pdvFactors: [
                { factor: '재무안정', discount: '+0.5%p 수익' },
                { factor: '장기가입', discount: 10 },
                { factor: '정기납입', discount: '+5% 보너스' },
                { factor: '건강유지', discount: '장수보너스' }
            ],
            features: [
                'AI 노후자금 시뮬레이션',
                '재무제표 연동',
                '유연한 납입',
                '수익률 투명공개'
            ]
        },
        // 손해보험 (2종)
        {
            id: 'property-fire',
            category: 'property',
            name: '화재보험',
            icon: '🔥',
            basePrice: 40000,
            maxDiscount: 35,
            coverage: {
                building: '건물 5억',
                furniture: '가재도구 1억',
                temporary: '임시거주비 일20만',
                liability: '배상책임 1억'
            },
            pdvFactors: [
                { factor: '화재예방설비', discount: 15 },
                { factor: '안전점검', discount: 10 },
                { factor: '지역안전도', discount: 7 },
                { factor: '외출패턴', discount: 3 }
            ],
            features: [
                'IoT 센서 무료',
                '자동신고',
                'AI 위험도 모니터링',
                '예방점검 추가할인'
            ]
        },
        {
            id: 'property-liability',
            category: 'property',
            name: '배상책임보험',
            icon: '⚖️',
            basePrice: 25000,
            maxDiscount: 30,
            coverage: {
                personal: '개인배상 3억',
                child: '자녀배상 1억',
                legal: '법률비용 500만',
                settlement: '합의금 2억'
            },
            pdvFactors: [
                { factor: '안전생활', discount: 12 },
                { factor: '위험활동 제한', discount: 10 },
                { factor: '재무안정', discount: 5 },
                { factor: '분쟁이력 없음', discount: 3 }
            ],
            features: [
                '법률상담 무료',
                'AI 책임비율 산정',
                '신속합의 24시간',
                '소송비용 선지급'
            ]
        }
    ];

    const categories = [
        { id: 'all', name: '전체', icon: '📋', color: 'gray' },
        { id: 'health', name: '건강보험', icon: '🏥', color: 'green' },
        { id: 'auto', name: '자동차', icon: '🚗', color: 'blue' },
        { id: 'life', name: '생명보험', icon: '❤️', color: 'purple' },
        { id: 'property', name: '손해보험', icon: '🏠', color: 'orange' }
    ];

    const filteredProducts = selectedCategory === 'all' 
        ? products 
        : products.filter(p => p.category === selectedCategory);

    const getCategoryColor = (category) => {
        const cat = categories.find(c => c.id === category);
        return cat ? cat.color : 'gray';
    };

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-2">
                    <i className="fas fa-shield-alt mr-2"></i>
                    보험 상품 (12종)
                </h2>
                <p className="text-green-100">
                    PDV 행동 데이터 기반으로 최대 60% 할인된 보험료로 가입 가능한 12개 보험 상품
                </p>
            </div>

            {/* 카테고리 선택 */}
            <div className="flex gap-3 overflow-x-auto pb-2">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => {
                            setSelectedCategory(cat.id);
                            setSelectedProduct(null);
                        }}
                        className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                            selectedCategory === cat.id
                                ? `bg-${cat.color}-600 text-white shadow-md`
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        <span className="mr-2">{cat.icon}</span>
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* 상품 그리드 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                    <div 
                        key={product.id}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer border-t-4"
                        style={{ borderColor: `var(--${getCategoryColor(product.category)}-500)` }}
                        onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)}
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-4xl">{product.icon}</span>
                                <span className={`text-${getCategoryColor(product.category)}-600 text-sm font-bold bg-${getCategoryColor(product.category)}-50 px-3 py-1 rounded-full`}>
                                    최대 {product.maxDiscount}% 할인
                                </span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                            
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-2xl font-bold text-gray-900">
                                    {(product.basePrice * (100 - product.maxDiscount) / 100).toLocaleString()}원
                                </span>
                                <span className="text-sm text-gray-400 line-through">
                                    {product.basePrice.toLocaleString()}원
                                </span>
                                <span className="text-xs text-gray-500">/월</span>
                            </div>

                            <div className="space-y-2 text-sm">
                                {Object.entries(product.coverage).map(([key, value], idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-gray-600">
                                        <i className="fas fa-check text-green-500"></i>
                                        {value}
                                    </div>
                                ))}
                            </div>

                            <button 
                                className={`w-full mt-4 py-2 rounded-lg font-bold transition-all bg-${getCategoryColor(product.category)}-600 text-white hover:bg-${getCategoryColor(product.category)}-700`}
                            >
                                상세보기
                            </button>
                        </div>

                        {/* 슬라이드 패널 */}
                        {selectedProduct === product.id && (
                            <div className="border-t bg-gray-50 p-6 animate-slideDown">
                                <div className="mb-4">
                                    <div className="font-bold text-gray-900 mb-2">PDV 할인 요인:</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {product.pdvFactors.map((factor, idx) => (
                                            <div key={idx} className="flex justify-between text-sm bg-white rounded p-2">
                                                <span className="text-gray-700">{factor.factor}</span>
                                                <span className={`font-bold text-${getCategoryColor(product.category)}-600`}>
                                                    {typeof factor.discount === 'number' ? `-${factor.discount}%` : factor.discount}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="font-bold text-gray-900 mb-2">주요 특징:</div>
                                    <div className="space-y-1">
                                        {product.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                                <i className="fas fa-star text-yellow-500"></i>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button className={`w-full py-3 rounded-lg font-bold text-white bg-${getCategoryColor(product.category)}-600 hover:bg-${getCategoryColor(product.category)}-700`}>
                                    <i className="fas fa-check-circle mr-2"></i>
                                    0.015ms 즉시 가입
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
