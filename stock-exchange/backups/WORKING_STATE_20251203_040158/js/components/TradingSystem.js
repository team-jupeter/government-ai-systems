function TradingSystem() {
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [showPurchaseModal, setShowPurchaseModal] = React.useState(false);
    const [purchaseQuantity, setPurchaseQuantity] = React.useState(1);
    const [showTransactionAnimation, setShowTransactionAnimation] = React.useState(false);
    const [animationStep, setAnimationStep] = React.useState(0);

    // 금융 상품 카테고리
    const categories = [
        { id: 'stocks', name: '주식', icon: 'fa-chart-line', description: '지분 증권' },
        { id: 'bonds', name: '채권', icon: 'fa-file-contract', description: '고정 수익 증권' },
        { id: 'derivatives', name: '파생상품', icon: 'fa-chart-area', description: 'ELS/DLS 구조화 상품' },
        { id: 'futures', name: '선물', icon: 'fa-calendar-alt', description: '미래 가격 고정' },
        { id: 'options', name: '옵션', icon: 'fa-exchange-alt', description: '콜옵션/풋옵션' }
    ];

    // EGCT 그룹 전체 16개 자회사
    const egctCompanies = [
        {
            id: 'egct-bank',
            name: 'EGCT Bank',
            category: 'all',
            description: '종합 금융 서비스 제공 은행',
            founder: '김철수',
            foundedDate: '2018년 3월 15일',
            employees: 2847,
            marketCap: '12.5조원',
            ceo: '박영희',
            headquarters: '서울특별시 강남구 테헤란로 123',
            stock: { totalShares: 10000000, availableShares: 850000, price: 45000, fairValue: 42000, change: 7.1 },
            bond: { faceValue: 10000, couponRate: 4.2, ytm: 4.5, rating: 'AA+', maturity: '5년', issued: 5000000, available: 450000 },
            derivatives: { type: 'ELS', underlying: 'EGCT Bank 주식', maturity: '3년', earlyRedemption: '6개월', couponRate: 12.0, barrier: 60, principal: '원금비보장형', minInvest: 10000000 },
            futures: { underlying: 'EGCT Bank 주식 100주', contractPrice: 4500000, maturity: '3개월', leverage: 10, margin: 450000 },
            options: { call: { strikePrice: 50000, premium: 2500, maturity: '1개월' }, put: { strikePrice: 40000, premium: 1800, maturity: '1개월' } },
            financials: { revenue: '8.5조원', profit: '1.2조원', roe: 12.5, per: 11.2, pbr: 1.4, debt: '45.3조원', equity: '9.6조원' },
            detailLinks: [{ name: '재무제표', url: '#financials' }, { name: '사업보고서', url: '#business-report' }]
        },
        {
            id: 'egct-traffic',
            name: 'EGCT Social Autonomous Traffic and Logistics',
            category: 'all',
            description: '자율주행 교통 및 물류 시스템',
            founder: '이민호',
            foundedDate: '2019년 7월 22일',
            employees: 1523,
            marketCap: '8.3조원',
            ceo: '최수진',
            headquarters: '경기도 성남시 분당구 판교역로 235',
            stock: { totalShares: 8000000, availableShares: 620000, price: 78000, fairValue: 85000, change: -8.2 },
            bond: { faceValue: 10000, couponRate: 5.5, ytm: 5.8, rating: 'A+', maturity: '3년', issued: 3000000, available: 280000 },
            derivatives: { type: 'ELS', underlying: 'EGCT Traffic 주식', maturity: '2년', earlyRedemption: '6개월', couponRate: 15.0, barrier: 55, principal: '원금비보장형', minInvest: 10000000 },
            futures: { underlying: 'EGCT Traffic 주식 100주', contractPrice: 7800000, maturity: '3개월', leverage: 12, margin: 650000 },
            options: { call: { strikePrice: 85000, premium: 4200, maturity: '1개월' }, put: { strikePrice: 70000, premium: 3500, maturity: '1개월' } },
            financials: { revenue: '4.2조원', profit: '0.6조원', roe: 14.8, per: 13.8, pbr: 2.1, debt: '15.7조원', equity: '4.1조원' },
            detailLinks: [{ name: '재무제표', url: '#financials' }, { name: '사업보고서', url: '#business-report' }]
        },
        {
            id: 'egct-legal',
            name: 'EGCT Legal Service',
            category: 'all',
            description: 'AI 기반 법률 서비스',
            founder: '정다은',
            foundedDate: '2020년 1월 10일',
            employees: 892,
            marketCap: '3.2조원',
            ceo: '강민준',
            headquarters: '서울특별시 서초구 서초대로 301',
            stock: { totalShares: 5000000, availableShares: 380000, price: 125000, fairValue: 118000, change: 5.9 },
            bond: { faceValue: 10000, couponRate: 4.8, ytm: 5.1, rating: 'A', maturity: '3년', issued: 2000000, available: 180000 },
            derivatives: { type: 'DLS', underlying: 'EGCT Legal 주식', maturity: '2년', earlyRedemption: '6개월', couponRate: 10.0, barrier: 65, principal: '원금보장형', minInvest: 50000000 },
            futures: { underlying: 'EGCT Legal 주식 50주', contractPrice: 6250000, maturity: '3개월', leverage: 8, margin: 781250 },
            options: { call: { strikePrice: 130000, premium: 6500, maturity: '2개월' }, put: { strikePrice: 115000, premium: 5200, maturity: '2개월' } },
            financials: { revenue: '1.8조원', profit: '0.4조원', roe: 22.3, per: 8.0, pbr: 1.8, debt: '5.2조원', equity: '1.8조원' },
            detailLinks: [{ name: '재무제표', url: '#financials' }, { name: '사업보고서', url: '#business-report' }]
        },
        {
            id: 'egct-business',
            name: 'EGCT Business Service',
            category: 'all',
            description: '기업 컨설팅 및 업무 자동화',
            founder: '송지훈',
            foundedDate: '2019년 11월 5일',
            employees: 1156,
            marketCap: '4.8조원',
            ceo: '윤서연',
            headquarters: '서울특별시 영등포구 여의대로 108',
            stock: { totalShares: 6000000, availableShares: 480000, price: 88000, fairValue: 92000, change: -4.3 },
            bond: { faceValue: 10000, couponRate: 4.6, ytm: 4.9, rating: 'A+', maturity: '5년', issued: 2500000, available: 220000 },
            derivatives: { type: 'ELS', underlying: 'EGCT Business 주식', maturity: '3년', earlyRedemption: '6개월', couponRate: 11.0, barrier: 60, principal: '원금비보장형', minInvest: 10000000 },
            futures: { underlying: 'EGCT Business 주식 100주', contractPrice: 8800000, maturity: '3개월', leverage: 10, margin: 880000 },
            options: { call: { strikePrice: 95000, premium: 4400, maturity: '1개월' }, put: { strikePrice: 80000, premium: 3200, maturity: '1개월' } },
            financials: { revenue: '2.3조원', profit: '0.5조원', roe: 21.7, per: 9.6, pbr: 2.1, debt: '7.8조원', equity: '2.3조원' },
            detailLinks: [{ name: '재무제표', url: '#financials' }, { name: '사업보고서', url: '#business-report' }]
        },
        {
            id: 'egct-university',
            name: 'EGCT University',
            category: 'all',
            description: 'AI 교수 기반 고등교육',
            founder: '한지민',
            foundedDate: '2020년 3월 1일',
            employees: 1893,
            marketCap: '5.7조원',
            ceo: '임태양',
            headquarters: '서울특별시 관악구 관악로 1',
            stock: { totalShares: 7000000, availableShares: 520000, price: 92000, fairValue: 95000, change: -3.2 },
            bond: { faceValue: 10000, couponRate: 4.5, ytm: 4.7, rating: 'AA-', maturity: '7년', issued: 3500000, available: 310000 },
            derivatives: { type: 'ELS', underlying: 'EGCT University 주식', maturity: '3년', earlyRedemption: '6개월', couponRate: 10.5, barrier: 65, principal: '원금비보장형', minInvest: 10000000 },
            futures: { underlying: 'EGCT University 주식 100주', contractPrice: 9200000, maturity: '3개월', leverage: 10, margin: 920000 },
            options: { call: { strikePrice: 100000, premium: 4600, maturity: '1개월' }, put: { strikePrice: 85000, premium: 3800, maturity: '1개월' } },
            financials: { revenue: '2.1조원', profit: '0.5조원', roe: 18.5, per: 11.4, pbr: 2.1, debt: '8.5조원', equity: '2.7조원' },
            detailLinks: [{ name: '재무제표', url: '#financials' }, { name: '사업보고서', url: '#business-report' }]
        },
        {
            id: 'egct-k12',
            name: 'EGCT K12 Education',
            category: 'all',
            description: 'K-12 맞춤형 교육 플랫폼',
            founder: '오승훈',
            foundedDate: '2019년 9월 1일',
            employees: 1647,
            marketCap: '4.5조원',
            ceo: '신예진',
            headquarters: '서울특별시 강남구 선릉로 428',
            stock: { totalShares: 6500000, availableShares: 510000, price: 68000, fairValue: 72000, change: -5.6 },
            bond: { faceValue: 10000, couponRate: 5.0, ytm: 5.3, rating: 'A+', maturity: '5년', issued: 2800000, available: 240000 },
            derivatives: { type: 'ELS', underlying: 'EGCT K12 주식', maturity: '2년', earlyRedemption: '6개월', couponRate: 13.0, barrier: 55, principal: '원금비보장형', minInvest: 10000000 },
            futures: { underlying: 'EGCT K12 주식 100주', contractPrice: 6800000, maturity: '3개월', leverage: 12, margin: 566667 },
            options: { call: { strikePrice: 75000, premium: 3400, maturity: '1개월' }, put: { strikePrice: 60000, premium: 2800, maturity: '1개월' } },
            financials: { revenue: '1.9조원', profit: '0.3조원', roe: 15.2, per: 15.0, pbr: 2.3, debt: '6.8조원', equity: '2.0조원' },
            detailLinks: [{ name: '재무제표', url: '#financials' }, { name: '사업보고서', url: '#business-report' }]
        },
        {
            id: 'egct-healthcare',
            name: 'EGCT Healthcare',
            category: 'all',
            description: 'AI 진단 및 원격의료',
            founder: '장서윤',
            foundedDate: '2018년 5월 20일',
            employees: 2134,
            marketCap: '9.8조원',
            ceo: '배준호',
            headquarters: '서울특별시 송파구 올림픽로 300',
            stock: { totalShares: 9000000, availableShares: 680000, price: 156000, fairValue: 148000, change: 5.4 },
            bond: { faceValue: 10000, couponRate: 4.0, ytm: 4.2, rating: 'AA', maturity: '10년', issued: 4500000, available: 390000 },
            derivatives: { type: 'ELS', underlying: 'EGCT Healthcare 주식', maturity: '3년', earlyRedemption: '6개월', couponRate: 9.5, barrier: 65, principal: '원금비보장형', minInvest: 10000000 },
            futures: { underlying: 'EGCT Healthcare 주식 50주', contractPrice: 7800000, maturity: '3개월', leverage: 8, margin: 975000 },
            options: { call: { strikePrice: 165000, premium: 7800, maturity: '2개월' }, put: { strikePrice: 145000, premium: 6500, maturity: '2개월' } },
            financials: { revenue: '5.2조원', profit: '0.9조원', roe: 17.3, per: 10.9, pbr: 1.9, debt: '18.5조원', equity: '5.2조원' },
            detailLinks: [{ name: '재무제표', url: '#financials' }, { name: '사업보고서', url: '#business-report' }]
        },
        {
            id: 'egct-market',
            name: 'EGCT Market',
            category: 'all',
            description: '온라인 쇼핑 플랫폼',
            founder: '고은별',
            foundedDate: '2017년 6월 15일',
            employees: 3256,
            marketCap: '15.2조원',
            ceo: '나현우',
            headquarters: '서울특별시 중구 남대문로 63',
            stock: { totalShares: 12000000, availableShares: 920000, price: 210000, fairValue: 195000, change: 7.7 },
            bond: { faceValue: 10000, couponRate: 3.8, ytm: 4.0, rating: 'AA+', maturity: '5년', issued: 6000000, available: 520000 },
            derivatives: { type: 'ELS', underlying: 'EGCT Market 주식', maturity: '3년', earlyRedemption: '6개월', couponRate: 8.5, barrier: 70, principal: '원금비보장형', minInvest: 20000000 },
            futures: { underlying: 'EGCT Market 주식 50주', contractPrice: 10500000, maturity: '3개월', leverage: 8, margin: 1312500 },
            options: { call: { strikePrice: 220000, premium: 10500, maturity: '2개월' }, put: { strikePrice: 195000, premium: 8500, maturity: '2개월' } },
            financials: { revenue: '12.5조원', profit: '1.8조원', roe: 14.4, per: 8.4, pbr: 1.2, debt: '28.3조원', equity: '12.5조원' },
            detailLinks: [{ name: '재무제표', url: '#financials' }, { name: '사업보고서', url: '#business-report' }]
        },
        {
            id: 'egct-housing',
            name: 'EGCT Housing',
            category: 'all',
            description: '스마트 주거 솔루션',
            founder: '문재인',
            foundedDate: '2018년 8월 12일',
            employees: 2945,
            marketCap: '18.5조원',
            ceo: '서하늘',
            headquarters: '서울특별시 마포구 월드컵북로 396',
            stock: { totalShares: 15000000, availableShares: 1150000, price: 95000, fairValue: 102000, change: -6.9 },
            bond: { faceValue: 10000, couponRate: 4.3, ytm: 4.5, rating: 'AA', maturity: '15년', issued: 7500000, available: 620000 },
            derivatives: { type: 'ELS', underlying: 'EGCT Housing 주식', maturity: '3년', earlyRedemption: '6개월', couponRate: 11.5, barrier: 60, principal: '원금비보장형', minInvest: 10000000 },
            futures: { underlying: 'EGCT Housing 주식 100주', contractPrice: 9500000, maturity: '3개월', leverage: 10, margin: 950000 },
            options: { call: { strikePrice: 105000, premium: 4750, maturity: '1개월' }, put: { strikePrice: 85000, premium: 3900, maturity: '1개월' } },
            financials: { revenue: '8.8조원', profit: '1.5조원', roe: 17.0, per: 12.3, pbr: 2.1, debt: '52.3조원', equity: '8.8조원' },
            detailLinks: [{ name: '재무제표', url: '#financials' }, { name: '사업보고서', url: '#business-report' }]
        },
        {
            id: 'egct-catering',
            name: 'EGCT Public Catering System',
            category: 'all',
            description: '공공 급식 자동화 시스템',
            founder: '류지성',
            foundedDate: '2019년 4월 25일',
            employees: 1782,
            marketCap: '6.2조원',
            ceo: '안별이',
            headquarters: '서울특별시 용산구 한강대로 405',
            stock: { totalShares: 7500000, availableShares: 580000, price: 58000, fairValue: 62000, change: -6.5 },
            bond: { faceValue: 10000, couponRate: 5.2, ytm: 5.5, rating: 'A+', maturity: '5년', issued: 3000000, available: 260000 },
            derivatives: { type: 'ELS', underlying: 'EGCT Catering 주식', maturity: '2년', earlyRedemption: '6개월', couponRate: 14.0, barrier: 55, principal: '원금비보장형', minInvest: 10000000 },
            futures: { underlying: 'EGCT Catering 주식 100주', contractPrice: 5800000, maturity: '3개월', leverage: 12, margin: 483333 },
            options: { call: { strikePrice: 65000, premium: 2900, maturity: '1개월' }, put: { strikePrice: 50000, premium: 2400, maturity: '1개월' } },
            financials: { revenue: '3.5조원', profit: '0.4조원', roe: 11.4, per: 15.5, pbr: 1.8, debt: '9.8조원', equity: '3.5조원' },
            detailLinks: [{ name: '재무제표', url: '#financials' }, { name: '사업보고서', url: '#business-report' }]
        },
        {
            id: 'egct-ip',
            name: 'EGCT IP Service',
            category: 'all',
            description: '지적재산권 관리 및 특허 서비스',
            founder: '홍길동',
            foundedDate: '2020년 6월 10일',
            employees: 645,
            marketCap: '2.8조원',
            ceo: '김특허',
            headquarters: '대전광역시 유성구 대학로 291',
            stock: { totalShares: 4000000, availableShares: 320000, price: 135000, fairValue: 128000, change: 5.5 },
            bond: { faceValue: 10000, couponRate: 4.9, ytm: 5.2, rating: 'A', maturity: '3년', issued: 1800000, available: 150000 },
            derivatives: { type: 'DLS', underlying: 'EGCT IP 주식', maturity: '2년', earlyRedemption: '6개월', couponRate: 9.5, barrier: 65, principal: '원금보장형', minInvest: 30000000 },
            futures: { underlying: 'EGCT IP 주식 50주', contractPrice: 6750000, maturity: '3개월', leverage: 8, margin: 843750 },
            options: { call: { strikePrice: 145000, premium: 6750, maturity: '2개월' }, put: { strikePrice: 125000, premium: 5500, maturity: '2개월' } },
            financials: { revenue: '1.5조원', profit: '0.3조원', roe: 20.8, per: 9.3, pbr: 1.9, debt: '3.8조원', equity: '1.4조원' },
            detailLinks: [{ name: '재무제표', url: '#financials' }, { name: '사업보고서', url: '#business-report' }]
        },
        {
            id: 'egct-insurance',
            name: 'EGCT Insurance',
            category: 'all',
            description: 'AI 기반 보험 상품 설계',
            founder: '이보험',
            foundedDate: '2018년 10월 5일',
            employees: 1934,
            marketCap: '7.5조원',
            ceo: '박안전',
            headquarters: '서울특별시 종로구 종로 1',
            stock: { totalShares: 8500000, availableShares: 650000, price: 72000, fairValue: 75000, change: -4.0 },
            bond: { faceValue: 10000, couponRate: 4.4, ytm: 4.7, rating: 'AA-', maturity: '7년', issued: 3800000, available: 330000 },
            derivatives: { type: 'ELS', underlying: 'EGCT Insurance 주식', maturity: '3년', earlyRedemption: '6개월', couponRate: 10.0, barrier: 60, principal: '원금비보장형', minInvest: 10000000 },
            futures: { underlying: 'EGCT Insurance 주식 100주', contractPrice: 7200000, maturity: '3개월', leverage: 10, margin: 720000 },
            options: { call: { strikePrice: 78000, premium: 3600, maturity: '1개월' }, put: { strikePrice: 65000, premium: 2900, maturity: '1개월' } },
            financials: { revenue: '4.8조원', profit: '0.7조원', roe: 14.6, per: 10.7, pbr: 1.6, debt: '22.5조원', equity: '4.8조원' },
            detailLinks: [{ name: '재무제표', url: '#financials' }, { name: '사업보고서', url: '#business-report' }]
        },
        {
            id: 'egct-securities',
            name: 'EGCT Securities',
            category: 'all',
            description: '증권 중개 및 자산 관리',
            founder: '최증권',
            foundedDate: '2017년 12월 20일',
            employees: 2145,
            marketCap: '9.2조원',
            ceo: '정투자',
            headquarters: '서울특별시 영등포구 국제금융로 10',
            stock: { totalShares: 9500000, availableShares: 720000, price: 118000, fairValue: 112000, change: 5.4 },
            bond: { faceValue: 10000, couponRate: 4.1, ytm: 4.3, rating: 'AA', maturity: '5년', issued: 4200000, available: 360000 },
            derivatives: { type: 'ELS', underlying: 'EGCT Securities 주식', maturity: '3년', earlyRedemption: '6개월', couponRate: 9.0, barrier: 65, principal: '원금비보장형', minInvest: 15000000 },
            futures: { underlying: 'EGCT Securities 주식 100주', contractPrice: 11800000, maturity: '3개월', leverage: 10, margin: 1180000 },
            options: { call: { strikePrice: 125000, premium: 5900, maturity: '1개월' }, put: { strikePrice: 110000, premium: 4800, maturity: '1개월' } },
            financials: { revenue: '5.8조원', profit: '1.0조원', roe: 17.2, per: 9.2, pbr: 1.6, debt: '18.4조원', equity: '5.8조원' },
            detailLinks: [{ name: '재무제표', url: '#financials' }, { name: '사업보고서', url: '#business-report' }]
        },
        {
            id: 'egct-exchange',
            name: 'EGCT Exchange',
            category: 'all',
            description: '암호화폐 및 디지털 자산 거래소',
            founder: '강디지털',
            foundedDate: '2019년 2월 14일',
            employees: 1267,
            marketCap: '11.8조원',
            ceo: '윤블록체인',
            headquarters: '제주특별자치도 제주시 첨단로 242',
            stock: { totalShares: 10500000, availableShares: 820000, price: 165000, fairValue: 158000, change: 4.4 },
            bond: { faceValue: 10000, couponRate: 5.8, ytm: 6.1, rating: 'A+', maturity: '3년', issued: 4500000, available: 380000 },
            derivatives: { type: 'DLS', underlying: 'EGCT Exchange 주식', maturity: '2년', earlyRedemption: '6개월', couponRate: 13.5, barrier: 55, principal: '원금비보장형', minInvest: 20000000 },
            futures: { underlying: 'EGCT Exchange 주식 50주', contractPrice: 8250000, maturity: '3개월', leverage: 10, margin: 825000 },
            options: { call: { strikePrice: 175000, premium: 8250, maturity: '2개월' }, put: { strikePrice: 155000, premium: 6900, maturity: '2개월' } },
            financials: { revenue: '6.5조원', profit: '1.3조원', roe: 20.0, per: 9.1, pbr: 1.8, debt: '12.3조원', equity: '6.5조원' },
            detailLinks: [{ name: '재무제표', url: '#financials' }, { name: '사업보고서', url: '#business-report' }]
        },
        {
            id: 'egct-public',
            name: 'EGCT Public Service',
            category: 'all',
            description: '공공 행정 자동화 솔루션',
            founder: '서공공',
            foundedDate: '2020년 5월 18일',
            employees: 2567,
            marketCap: '10.5조원',
            ceo: '조행정',
            headquarters: '세종특별자치시 한누리대로 2130',
            stock: { totalShares: 11000000, availableShares: 850000, price: 85000, fairValue: 88000, change: -3.4 },
            bond: { faceValue: 10000, couponRate: 3.9, ytm: 4.1, rating: 'AA+', maturity: '10년', issued: 5500000, available: 470000 },
            derivatives: { type: 'ELS', underlying: 'EGCT Public 주식', maturity: '3년', earlyRedemption: '6개월', couponRate: 10.5, barrier: 65, principal: '원금비보장형', minInvest: 10000000 },
            futures: { underlying: 'EGCT Public 주식 100주', contractPrice: 8500000, maturity: '3개월', leverage: 10, margin: 850000 },
            options: { call: { strikePrice: 92000, premium: 4250, maturity: '1개월' }, put: { strikePrice: 78000, premium: 3500, maturity: '1개월' } },
            financials: { revenue: '5.2조원', profit: '0.8조원', roe: 15.4, per: 13.1, pbr: 2.0, debt: '15.8조원', equity: '5.2조원' },
            detailLinks: [{ name: '재무제표', url: '#financials' }, { name: '사업보고서', url: '#business-report' }]
        },
        {
            id: 'egct-dining',
            name: 'EGCT Dining Service',
            category: 'all',
            description: '외식 및 배달 플랫폼',
            founder: '배배달',
            foundedDate: '2018년 9월 8일',
            employees: 3124,
            marketCap: '13.6조원',
            ceo: '김맛있어',
            headquarters: '서울특별시 송파구 올림픽로 300',
            stock: { totalShares: 13000000, availableShares: 980000, price: 98000, fairValue: 95000, change: 3.2 },
            bond: { faceValue: 10000, couponRate: 4.7, ytm: 4.9, rating: 'AA-', maturity: '5년', issued: 5800000, available: 490000 },
            derivatives: { type: 'ELS', underlying: 'EGCT Dining 주식', maturity: '3년', earlyRedemption: '6개월', couponRate: 11.0, barrier: 60, principal: '원금비보장형', minInvest: 10000000 },
            futures: { underlying: 'EGCT Dining 주식 100주', contractPrice: 9800000, maturity: '3개월', leverage: 10, margin: 980000 },
            options: { call: { strikePrice: 105000, premium: 4900, maturity: '1개월' }, put: { strikePrice: 90000, premium: 4100, maturity: '1개월' } },
            financials: { revenue: '7.8조원', profit: '1.1조원', roe: 14.1, per: 12.4, pbr: 1.7, debt: '20.5조원', equity: '7.8조원' },
            detailLinks: [{ name: '재무제표', url: '#financials' }, { name: '사업보고서', url: '#business-report' }]
        }
    ];

    // 카테고리별 상품 표시 정보
    const getProductInfo = (company) => {
        switch(selectedCategory) {
            case 'stocks':
                return {
                    price: `₩${company.stock.price.toLocaleString()}`,
                    fairValue: `₩${company.stock.fairValue.toLocaleString()}`,
                    premium: `${company.stock.change >= 0 ? '+' : ''}${company.stock.change}%`,
                    available: `${company.stock.availableShares.toLocaleString()}주`
                };
            case 'bonds':
                return {
                    faceValue: `₩${company.bond.faceValue.toLocaleString()}`,
                    couponRate: `${company.bond.couponRate}%`,
                    ytm: `${company.bond.ytm}%`,
                    available: `${company.bond.available.toLocaleString()}장`
                };
            case 'derivatives':
                return {
                    type: company.derivatives.type,
                    couponRate: `연 ${company.derivatives.couponRate}%`,
                    maturity: company.derivatives.maturity,
                    barrier: `${company.derivatives.barrier}%`
                };
            case 'futures':
                return {
                    contractPrice: `₩${company.futures.contractPrice.toLocaleString()}`,
                    maturity: company.futures.maturity,
                    leverage: `${company.futures.leverage}배`,
                    margin: `₩${company.futures.margin.toLocaleString()}`
                };
            case 'options':
                return {
                    callStrike: `₩${company.options.call.strikePrice.toLocaleString()}`,
                    callPremium: `₩${company.options.call.premium.toLocaleString()}`,
                    putStrike: `₩${company.options.put.strikePrice.toLocaleString()}`,
                    putPremium: `₩${company.options.put.premium.toLocaleString()}`
                };
            default:
                return {};
        }
    };

    // 거래 애니메이션 실행
    const executePurchase = () => {
        setShowTransactionAnimation(true);
        setAnimationStep(0);
        setTimeout(() => setAnimationStep(1), 500);
        setTimeout(() => setAnimationStep(2), 1500);
        setTimeout(() => setAnimationStep(3), 2500);
        setTimeout(() => setAnimationStep(4), 3500);
        setTimeout(() => setAnimationStep(5), 4000);
        setTimeout(() => setAnimationStep(6), 4500);
        setTimeout(() => setAnimationStep(7), 5000);
        setTimeout(() => setAnimationStep(8), 5500);
    };

    const getPurchasePrice = () => {
        if (!selectedProduct) return 0;
        switch(selectedCategory) {
            case 'stocks': return selectedProduct.stock.price * purchaseQuantity;
            case 'bonds': return selectedProduct.bond.faceValue * purchaseQuantity;
            case 'derivatives': return selectedProduct.derivatives.minInvest;
            case 'futures': return selectedProduct.futures.margin * purchaseQuantity;
            case 'options': return selectedProduct.options.call.premium * purchaseQuantity;
            default: return 0;
        }
    };

    const getUnitLabel = () => {
        switch(selectedCategory) {
            case 'stocks': return '주';
            case 'bonds': return '장';
            case 'derivatives': return '계약';
            case 'futures': return '계약';
            case 'options': return '계약';
            default: return '';
        }
    };

    const totalAmount = getPurchasePrice();

    return React.createElement('div', { className: 'space-y-6' },
        // 정부 공식 배너
        React.createElement('div', { className: 'bg-blue-900 text-white py-2 px-4 text-sm' },
            '대한민국 공식 전자정부 서비스 | 오픈해시 증권거래소'
        ),

        // 헤더
        React.createElement('div', { className: 'bg-white border-b-4 border-blue-600 p-6' },
            React.createElement('h2', { className: 'text-2xl font-bold text-gray-900 mb-2' },
                '매매 체결 시스템'
            ),
            React.createElement('p', { className: 'text-base text-gray-700' },
                '누구나 증권 발행 및 거래 | AI 공정가격 산출 | 오픈해시 4계층 기록'
            )
        ),

        // 카테고리 선택
        !selectedCategory && React.createElement('div', { className: 'bg-white border border-gray-300 p-6' },
            React.createElement('h3', { className: 'text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200' },
                '금융 상품 카테고리'
            ),
            React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-5 gap-4' },
                categories.map(cat =>
                    React.createElement('button', {
                        key: cat.id,
                        className: 'border border-gray-300 hover:border-blue-600 hover:bg-blue-50 p-6 text-center transition-all',
                        onClick: () => setSelectedCategory(cat.id)
                    },
                        React.createElement('div', { className: 'text-blue-600 text-3xl mb-3' },
                            React.createElement('i', { className: `fas ${cat.icon}` })
                        ),
                        React.createElement('div', { className: 'text-base font-bold text-gray-900 mb-1' }, cat.name),
                        React.createElement('div', { className: 'text-sm text-gray-600' }, cat.description)
                    )
                )
            )
        ),

        // 상품 목록
        selectedCategory && !selectedProduct && React.createElement('div', {},
            React.createElement('div', { className: 'bg-white border border-gray-300 p-4 mb-4' },
                React.createElement('button', {
                    className: 'text-blue-600 hover:underline text-base font-semibold',
                    onClick: () => setSelectedCategory(null)
                }, '← 카테고리 선택으로')
            ),
            React.createElement('div', { className: 'bg-white border border-gray-300 p-6' },
                React.createElement('h3', { className: 'text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200' },
                    `EGCT 그룹 ${categories.find(c => c.id === selectedCategory)?.name} 상품 (총 ${egctCompanies.length}개)`
                ),
                React.createElement('table', { className: 'w-full border-collapse' },
                    React.createElement('thead', {},
                        React.createElement('tr', { className: 'bg-gray-100 border-b-2 border-gray-300' },
                            React.createElement('th', { className: 'text-left p-3 text-base font-bold text-gray-900' }, '기업명'),
                            React.createElement('th', { className: 'text-left p-3 text-base font-bold text-gray-900' }, '설명'),
                            React.createElement('th', { className: 'text-right p-3 text-base font-bold text-gray-900' }, '시가총액'),
                            selectedCategory === 'stocks' && React.createElement('th', { className: 'text-right p-3 text-base font-bold text-gray-900' }, '주가'),
                            selectedCategory === 'bonds' && React.createElement('th', { className: 'text-right p-3 text-base font-bold text-gray-900' }, '표면금리'),
                            selectedCategory === 'derivatives' && React.createElement('th', { className: 'text-right p-3 text-base font-bold text-gray-900' }, '수익률'),
                            selectedCategory === 'futures' && React.createElement('th', { className: 'text-right p-3 text-base font-bold text-gray-900' }, '계약가'),
                            selectedCategory === 'options' && React.createElement('th', { className: 'text-right p-3 text-base font-bold text-gray-900' }, '콜 행사가'),
                            React.createElement('th', { className: 'text-center p-3 text-base font-bold text-gray-900' }, '상세')
                        )
                    ),
                    React.createElement('tbody', {},
                        egctCompanies.map((company) => {
                            const info = getProductInfo(company);
                            return React.createElement('tr', { 
                                key: company.id,
                                className: 'border-b border-gray-200 hover:bg-gray-50'
                            },
                                React.createElement('td', { className: 'p-3 text-sm font-semibold text-gray-900' }, company.name),
                                React.createElement('td', { className: 'p-3 text-sm text-gray-700' }, company.description),
                                React.createElement('td', { className: 'p-3 text-sm text-right text-gray-900' }, company.marketCap),
                                selectedCategory === 'stocks' && React.createElement('td', { className: 'p-3 text-sm text-right font-semibold text-gray-900' }, info.price),
                                selectedCategory === 'bonds' && React.createElement('td', { className: 'p-3 text-sm text-right font-semibold text-blue-600' }, info.couponRate),
                                selectedCategory === 'derivatives' && React.createElement('td', { className: 'p-3 text-sm text-right font-semibold text-green-600' }, info.couponRate),
                                selectedCategory === 'futures' && React.createElement('td', { className: 'p-3 text-sm text-right font-semibold text-gray-900' }, info.contractPrice),
                                selectedCategory === 'options' && React.createElement('td', { className: 'p-3 text-sm text-right font-semibold text-gray-900' }, info.callStrike),
                                React.createElement('td', { className: 'p-3 text-center' },
                                    React.createElement('button', {
                                        className: 'bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700',
                                        onClick: () => setSelectedProduct(company)
                                    }, '상세보기')
                                )
                            );
                        })
                    )
                )
            )
        ),

        // 상품 상세 페이지
        selectedProduct && React.createElement('div', {},
            React.createElement('div', { className: 'bg-white border border-gray-300 p-4 mb-4' },
                React.createElement('button', {
                    className: 'text-blue-600 hover:underline text-base font-semibold',
                    onClick: () => setSelectedProduct(null)
                }, '← 목록으로')
            ),

            React.createElement('div', { className: 'bg-white border border-gray-300 p-6 mb-4' },
                React.createElement('h3', { className: 'text-xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-gray-200' }, 
                    selectedProduct.name
                ),
                React.createElement('p', { className: 'text-base text-gray-700 mb-4' }, selectedProduct.description),
                
                React.createElement('dl', { className: 'grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6' },
                    React.createElement('div', { className: 'border-l-4 border-blue-600 pl-3' },
                        React.createElement('dt', { className: 'text-gray-600 mb-1' }, '설립자'),
                        React.createElement('dd', { className: 'font-semibold text-gray-900' }, selectedProduct.founder)
                    ),
                    React.createElement('div', { className: 'border-l-4 border-blue-600 pl-3' },
                        React.createElement('dt', { className: 'text-gray-600 mb-1' }, 'CEO'),
                        React.createElement('dd', { className: 'font-semibold text-gray-900' }, selectedProduct.ceo)
                    ),
                    React.createElement('div', { className: 'border-l-4 border-blue-600 pl-3' },
                        React.createElement('dt', { className: 'text-gray-600 mb-1' }, '직원 수'),
                        React.createElement('dd', { className: 'font-semibold text-gray-900' }, `${selectedProduct.employees.toLocaleString()}명`)
                    ),
                    React.createElement('div', { className: 'border-l-4 border-blue-600 pl-3' },
                        React.createElement('dt', { className: 'text-gray-600 mb-1' }, '시가총액'),
                        React.createElement('dd', { className: 'font-semibold text-gray-900' }, selectedProduct.marketCap)
                    )
                ),

                React.createElement('button', {
                    className: 'w-full bg-blue-600 text-white py-3 text-base font-bold hover:bg-blue-700',
                    onClick: () => setShowPurchaseModal(true)
                }, '구매하기')
            )
        ),

        // 구매 모달
        showPurchaseModal && React.createElement('div', {
            className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
            onClick: () => setShowPurchaseModal(false)
        },
            React.createElement('div', {
                className: 'bg-white border-4 border-blue-600 max-w-xl w-full mx-4',
                onClick: (e) => e.stopPropagation()
            },
                React.createElement('div', { className: 'bg-blue-600 text-white p-4 flex justify-between items-center' },
                    React.createElement('h3', { className: 'text-lg font-bold' }, '구매 확인'),
                    React.createElement('button', {
                        className: 'text-white text-2xl hover:text-gray-200',
                        onClick: () => setShowPurchaseModal(false)
                    }, '×')
                ),

                React.createElement('div', { className: 'p-6 space-y-4' },
                    React.createElement('div', { className: 'bg-blue-50 border-2 border-blue-600 p-4' },
                        React.createElement('h4', { className: 'font-bold text-base mb-3' }, selectedProduct.name),
                        React.createElement('div', { className: 'text-sm' },
                            `${categories.find(c => c.id === selectedCategory)?.name} 상품`
                        )
                    ),

                    React.createElement('div', {},
                        React.createElement('label', { className: 'block text-sm font-bold text-gray-900 mb-2' }, `구매 수량 (${getUnitLabel()})`),
                        React.createElement('input', {
                            type: 'number',
                            min: 1,
                            value: purchaseQuantity,
                            onChange: (e) => setPurchaseQuantity(Math.max(1, parseInt(e.target.value) || 1)),
                            className: 'w-full px-3 py-2 border-2 border-gray-300 text-base font-semibold focus:border-blue-600 focus:outline-none'
                        })
                    ),

                    React.createElement('div', { className: 'bg-gray-50 border border-gray-300 p-4' },
                        React.createElement('div', { className: 'flex justify-between pt-2 border-t-2 border-gray-300' },
                            React.createElement('dt', { className: 'text-base font-bold' }, '총 금액'),
                            React.createElement('dd', { className: 'text-xl font-bold text-blue-600' }, `₩${totalAmount.toLocaleString()}`)
                        )
                    ),

                    React.createElement('button', {
                        className: 'w-full bg-blue-600 text-white py-3 text-base font-bold hover:bg-blue-700',
                        onClick: () => {
                            setShowPurchaseModal(false);
                            executePurchase();
                        }
                    }, '구매 승인')
                )
            )
        ),

        // 거래 애니메이션 (동일)
        showTransactionAnimation && React.createElement('div', {
            className: 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'
        },
            React.createElement('div', {
                className: 'bg-white border-4 border-blue-600 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto'
            },
                React.createElement('div', { className: 'bg-blue-600 text-white p-4' },
                    React.createElement('h3', { className: 'text-lg font-bold text-center' }, '거래 처리 중')
                ),

                React.createElement('div', { className: 'p-6 space-y-6' },
                    React.createElement('div', {},
                        React.createElement('h4', { className: 'font-bold text-base text-gray-900 mb-3 pb-2 border-b-2 border-gray-200' }, 
                            '1단계: 프라이빗 데이터 금고(PDV) 저장'
                        ),
                        
                        [
                            { name: '구매자 PDV', time: '0.15s' },
                            { name: '판매자 PDV', time: '0.18s' },
                            { name: '거래소 PDV', time: '0.12s' }
                        ].map((item, idx) =>
                            React.createElement('div', { 
                                key: idx,
                                className: `border-2 p-3 mb-2 flex items-center justify-between ${animationStep >= idx + 1 ? 'border-green-600 bg-green-50' : 'border-gray-200 bg-gray-50'}`
                            },
                                React.createElement('div', { className: 'flex items-center gap-2' },
                                    animationStep >= idx + 1 && React.createElement('span', { className: 'text-green-600' }, '✓'),
                                    React.createElement('span', { className: 'font-semibold text-sm' }, item.name)
                                ),
                                animationStep >= idx + 1 && React.createElement('span', { className: 'text-xs text-green-600 font-semibold' }, item.time)
                            )
                        )
                    ),

                    animationStep >= 4 && React.createElement('div', {},
                        React.createElement('h4', { className: 'font-bold text-base text-gray-900 mb-3 pb-2 border-b-2 border-gray-200' }, 
                            '2단계: 오픈해시 4계층 해시 기록'
                        ),
                        
                        [
                            { layer: 1, name: 'Edge Device', desc: '투자자 단말', hash: 'd3c2b1a0...' },
                            { layer: 2, name: 'Edge Server', desc: '통신사 서버', hash: 'e4d3c2b1...' },
                            { layer: 3, name: 'Core Engine', desc: 'PBFT 합의', hash: 'f5e4d3c2...' },
                            { layer: 4, name: 'Cloud Archive', desc: 'AWS S3', hash: 'a0f5e4d3...' }
                        ].map((item, idx) =>
                            React.createElement('div', { 
                                key: idx,
                                className: `border-2 p-3 mb-2 ${animationStep >= idx + 4 ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-gray-50'}`
                            },
                                React.createElement('div', { className: 'flex items-center gap-3 mb-1' },
                                    React.createElement('div', { className: 'w-8 h-8 bg-blue-600 text-white flex items-center justify-center text-sm font-bold' },
                                        `L${item.layer}`
                                    ),
                                    React.createElement('div', {},
                                        React.createElement('div', { className: 'font-semibold text-sm' }, item.name),
                                        React.createElement('div', { className: 'text-xs text-gray-600' }, item.desc)
                                    ),
                                    animationStep >= idx + 4 && React.createElement('span', { className: 'ml-auto text-blue-600' }, '✓')
                                ),
                                animationStep >= idx + 4 && React.createElement('div', { className: 'bg-white border border-gray-300 p-2 text-xs font-mono' },
                                    item.hash
                                )
                            )
                        )
                    ),

                    animationStep === 8 && React.createElement('div', { className: 'bg-green-50 border-2 border-green-600 p-6 text-center' },
                        React.createElement('div', { className: 'text-green-600 text-4xl mb-3' }, '✓'),
                        React.createElement('h4', { className: 'text-lg font-bold text-gray-900 mb-2' }, '거래 완료'),
                        React.createElement('p', { className: 'text-sm text-gray-700 mb-3' },
                            `${selectedProduct.name} ${categories.find(c => c.id === selectedCategory)?.name} ${purchaseQuantity}${getUnitLabel()}을(를) 구매했습니다.`
                        ),
                        React.createElement('div', { className: 'text-xs text-gray-600 space-y-1 mb-4' },
                            React.createElement('div', {}, '• 프라이빗 데이터 금고 3곳 저장 완료'),
                            React.createElement('div', {}, '• 오픈해시 4계층 해시 기록 완료'),
                            React.createElement('div', {}, '• 위변조 불가능 영구 보존')
                        ),
                        React.createElement('button', {
                            className: 'bg-blue-600 text-white px-6 py-2 text-sm font-bold hover:bg-blue-700',
                            onClick: () => {
                                setShowTransactionAnimation(false);
                                setAnimationStep(0);
                                setPurchaseQuantity(1);
                            }
                        }, '확인')
                    )
                )
            )
        )
    );
}
