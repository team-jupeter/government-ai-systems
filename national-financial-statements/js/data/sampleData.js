// 시뮬레이션용 샘플 개인 및 기업 데이터
const SAMPLE_ENTITIES = {
  individuals: [
    {
      id: 'P001',
      name: '김철수',
      type: 'individual',
      region: '종로1동',
      layer: 1,
      vault: {
        totalAssets: 150000000,
        totalLiabilities: 80000000,
        netWorth: 70000000,
        annualIncome: 48000000
      }
    },
    {
      id: 'P002',
      name: '이영희',
      type: 'individual',
      region: '명동',
      layer: 1,
      vault: {
        totalAssets: 200000000,
        totalLiabilities: 120000000,
        netWorth: 80000000,
        annualIncome: 60000000
      }
    },
    {
      id: 'P003',
      name: '박민수',
      type: 'individual',
      region: '강남역1동',
      layer: 1,
      vault: {
        totalAssets: 300000000,
        totalLiabilities: 150000000,
        netWorth: 150000000,
        annualIncome: 72000000
      }
    },
    {
      id: 'P004',
      name: '정수진',
      type: 'individual',
      region: '서초1동',
      layer: 1,
      vault: {
        totalAssets: 180000000,
        totalLiabilities: 90000000,
        netWorth: 90000000,
        annualIncome: 54000000
      }
    }
  ],
  
  businesses: [
    {
      id: 'B001',
      name: '테크스타트(주)',
      type: 'business',
      industry: 'IT',
      region: '종로구',
      layer: 2,
      employees: 150,
      vault: {
        totalAssets: 5000000000,
        totalLiabilities: 2000000000,
        equity: 3000000000,
        revenue: 8000000000,
        operatingIncome: 800000000,
        netIncome: 500000000
      }
    },
    {
      id: 'B002',
      name: '한국제조(주)',
      type: 'business',
      industry: '제조',
      region: '중구',
      layer: 2,
      employees: 500,
      vault: {
        totalAssets: 10000000000,
        totalLiabilities: 6000000000,
        equity: 4000000000,
        revenue: 15000000000,
        operatingIncome: 1200000000,
        netIncome: 800000000
      }
    },
    {
      id: 'B003',
      name: '서울유통(주)',
      type: 'business',
      industry: '유통',
      region: '강남구',
      layer: 2,
      employees: 300,
      vault: {
        totalAssets: 8000000000,
        totalLiabilities: 5000000000,
        equity: 3000000000,
        revenue: 20000000000,
        operatingIncome: 1000000000,
        netIncome: 600000000
      }
    },
    {
      id: 'B004',
      name: '금융서비스(주)',
      type: 'business',
      industry: '금융',
      region: '서초구',
      layer: 2,
      employees: 200,
      vault: {
        totalAssets: 50000000000,
        totalLiabilities: 45000000000,
        equity: 5000000000,
        revenue: 5000000000,
        operatingIncome: 1500000000,
        netIncome: 1000000000
      }
    },
    {
      id: 'B005',
      name: '건설개발(주)',
      type: 'business',
      industry: '건설',
      region: '종로구',
      layer: 2,
      employees: 800,
      vault: {
        totalAssets: 30000000000,
        totalLiabilities: 20000000000,
        equity: 10000000000,
        revenue: 25000000000,
        operatingIncome: 2000000000,
        netIncome: 1500000000
      }
    },
    {
      id: 'B006',
      name: '의료법인 서울병원',
      type: 'business',
      industry: '의료',
      region: '강남구',
      layer: 2,
      employees: 400,
      vault: {
        totalAssets: 15000000000,
        totalLiabilities: 8000000000,
        equity: 7000000000,
        revenue: 12000000000,
        operatingIncome: 1200000000,
        netIncome: 900000000
      }
    }
  ]
};

// 거래 시뮬레이션 데이터
const SAMPLE_TRANSACTIONS = [
  {
    id: 'T001',
    date: '2024-12-01T09:00:00',
    from: 'B001',
    to: 'P001',
    type: '급여',
    amount: 5000000,
    description: '11월 급여 지급',
    status: 'completed',
    hash: 'a1b2c3d4e5f6...'
  },
  {
    id: 'T002',
    date: '2024-12-02T14:30:00',
    from: 'B002',
    to: 'B001',
    type: '물품구매',
    amount: 50000000,
    description: '원자재 구매 대금',
    status: 'completed',
    hash: 'b2c3d4e5f6a1...'
  },
  {
    id: 'T003',
    date: '2024-12-03T16:45:00',
    from: 'P002',
    to: 'B003',
    type: '상품구매',
    amount: 150000,
    description: '온라인 쇼핑 결제',
    status: 'completed',
    hash: 'c3d4e5f6a1b2...'
  },
  {
    id: 'T004',
    date: '2024-12-04T11:20:00',
    from: 'B004',
    to: 'P003',
    type: '대출',
    amount: 100000000,
    description: '주택담보대출 실행',
    status: 'completed',
    hash: 'd4e5f6a1b2c3...'
  },
  {
    id: 'T005',
    date: '2024-12-05T10:15:00',
    from: 'P004',
    to: 'B006',
    type: '의료비',
    amount: 500000,
    description: '종합건강검진 비용',
    status: 'completed',
    hash: 'e5f6a1b2c3d4...'
  }
];

export { SAMPLE_ENTITIES, SAMPLE_TRANSACTIONS };
