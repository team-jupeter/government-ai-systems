const LAYER_STATISTICS = {
  layer1: {
    name: '종로1동',
    layer: 1,
    population: 12000,
    businesses: 1500,
    month: '2024년 11월',
    financials: {
      totalRevenue: 50000000000,
      totalExpenses: 35000000000,
      netIncome: 15000000000,
      totalAssets: 150000000000,
      totalLiabilities: 80000000000,
      equity: 70000000000
    },
    monthlyTrend: [
      { month: '5월', revenue: 45000000000, expenses: 32000000000, netIncome: 13000000000 },
      { month: '6월', revenue: 46500000000, expenses: 33000000000, netIncome: 13500000000 },
      { month: '7월', revenue: 47800000000, expenses: 33500000000, netIncome: 14300000000 },
      { month: '8월', revenue: 48500000000, expenses: 34000000000, netIncome: 14500000000 },
      { month: '9월', revenue: 49200000000, expenses: 34500000000, netIncome: 14700000000 },
      { month: '10월', revenue: 49800000000, expenses: 35000000000, netIncome: 14800000000 },
      { month: '11월', revenue: 50000000000, expenses: 35000000000, netIncome: 15000000000 }
    ],
    industryBreakdown: [
      { industry: '자영업', count: 850, revenue: 18000000000, trend: 2.3 },
      { industry: '중소기업', count: 420, revenue: 22000000000, trend: 4.1 },
      { industry: '중견기업', count: 180, revenue: 8000000000, trend: -1.2 },
      { industry: '대기업', count: 50, revenue: 2000000000, trend: 1.8 }
    ],
    employmentData: {
      employed: 8500,
      unemployed: 320,
      unemploymentRate: 3.6,
      averageSalary: 3800000
    },
    householdIncome: {
      average: 5200000,
      median: 4800000,
      top10Percent: 12000000,
      bottom10Percent: 2200000,
      giniCoefficient: 0.32
    },
    economicIndicators: {
      gdpGrowth: 2.8,
      inflation: 2.1,
      businessStartups: 45,
      businessClosures: 18,
      realEstatePrice: 850000000,
      consumerConfidence: 105.2
    }
  },
  layer2: {
    name: '종로구',
    layer: 2,
    population: 150000,
    businesses: 18000,
    month: '2024년 11월',
    financials: {
      totalRevenue: 600000000000,
      totalExpenses: 420000000000,
      netIncome: 180000000000,
      totalAssets: 1800000000000,
      totalLiabilities: 960000000000,
      equity: 840000000000
    },
    monthlyTrend: [
      { month: '5월', revenue: 540000000000, expenses: 385000000000, netIncome: 155000000000 },
      { month: '6월', revenue: 555000000000, expenses: 395000000000, netIncome: 160000000000 },
      { month: '7월', revenue: 570000000000, expenses: 400000000000, netIncome: 170000000000 },
      { month: '8월', revenue: 580000000000, expenses: 408000000000, netIncome: 172000000000 },
      { month: '9월', revenue: 590000000000, expenses: 412000000000, netIncome: 178000000000 },
      { month: '10월', revenue: 595000000000, expenses: 416000000000, netIncome: 179000000000 },
      { month: '11월', revenue: 600000000000, expenses: 420000000000, netIncome: 180000000000 }
    ],
    industryBreakdown: [
      { industry: '자영업', count: 10200, revenue: 216000000000, trend: 2.5 },
      { industry: '중소기업', count: 5040, revenue: 264000000000, trend: 3.8 },
      { industry: '중견기업', count: 2160, revenue: 96000000000, trend: 1.2 },
      { industry: '대기업', count: 600, revenue: 24000000000, trend: 2.1 }
    ],
    employmentData: {
      employed: 102000,
      unemployed: 3800,
      unemploymentRate: 3.6,
      averageSalary: 4200000
    },
    householdIncome: {
      average: 5800000,
      median: 5200000,
      top10Percent: 15000000,
      bottom10Percent: 2500000,
      giniCoefficient: 0.34
    },
    economicIndicators: {
      gdpGrowth: 3.1,
      inflation: 2.0,
      businessStartups: 540,
      businessClosures: 215,
      realEstatePrice: 920000000,
      consumerConfidence: 107.8
    }
  },
  layer3: {
    name: '서울특별시',
    layer: 3,
    population: 10000000,
    businesses: 1200000,
    month: '2024년 11월',
    financials: {
      totalRevenue: 40000000000000,
      totalExpenses: 28000000000000,
      netIncome: 12000000000000,
      totalAssets: 120000000000000,
      totalLiabilities: 64000000000000,
      equity: 56000000000000
    },
    monthlyTrend: [
      { month: '5월', revenue: 36000000000000, expenses: 25700000000000, netIncome: 10300000000000 },
      { month: '6월', revenue: 37000000000000, expenses: 26300000000000, netIncome: 10700000000000 },
      { month: '7월', revenue: 38000000000000, expenses: 26700000000000, netIncome: 11300000000000 },
      { month: '8월', revenue: 38600000000000, expenses: 27200000000000, netIncome: 11400000000000 },
      { month: '9월', revenue: 39300000000000, expenses: 27500000000000, netIncome: 11800000000000 },
      { month: '10월', revenue: 39800000000000, expenses: 27800000000000, netIncome: 12000000000000 },
      { month: '11월', revenue: 40000000000000, expenses: 28000000000000, netIncome: 12000000000000 }
    ],
    industryBreakdown: [
      { industry: '자영업', count: 680000, revenue: 14400000000000, trend: 2.2 },
      { industry: '중소기업', count: 336000, revenue: 17600000000000, trend: 3.5 },
      { industry: '중견기업', count: 144000, revenue: 6400000000000, trend: 1.8 },
      { industry: '대기업', count: 40000, revenue: 1600000000000, trend: 2.4 }
    ],
    employmentData: {
      employed: 6800000,
      unemployed: 254000,
      unemploymentRate: 3.6,
      averageSalary: 4800000
    },
    householdIncome: {
      average: 6500000,
      median: 5800000,
      top10Percent: 18000000,
      bottom10Percent: 2800000,
      giniCoefficient: 0.36
    },
    economicIndicators: {
      gdpGrowth: 3.3,
      inflation: 1.9,
      businessStartups: 36000,
      businessClosures: 14300,
      realEstatePrice: 1050000000,
      consumerConfidence: 110.5
    }
  },
  layer4: {
    name: '대한민국',
    layer: 4,
    population: 50000000,
    businesses: 10000000,
    month: '2024년 11월',
    financials: {
      totalRevenue: 500000000000000,
      totalExpenses: 350000000000000,
      netIncome: 150000000000000,
      totalAssets: 1500000000000000,
      totalLiabilities: 800000000000000,
      equity: 700000000000000
    },
    monthlyTrend: [
      { month: '5월', revenue: 450000000000000, expenses: 321000000000000, netIncome: 129000000000000 },
      { month: '6월', revenue: 462500000000000, expenses: 329000000000000, netIncome: 133500000000000 },
      { month: '7월', revenue: 475000000000000, expenses: 333500000000000, netIncome: 141500000000000 },
      { month: '8월', revenue: 482500000000000, expenses: 340000000000000, netIncome: 142500000000000 },
      { month: '9월', revenue: 491250000000000, expenses: 345000000000000, netIncome: 146250000000000 },
      { month: '10월', revenue: 497500000000000, expenses: 348000000000000, netIncome: 149500000000000 },
      { month: '11월', revenue: 500000000000000, expenses: 350000000000000, netIncome: 150000000000000 }
    ],
    industryBreakdown: [
      { industry: '자영업', count: 5666667, revenue: 180000000000000, trend: 2.0 },
      { industry: '중소기업', count: 2800000, revenue: 220000000000000, trend: 3.2 },
      { industry: '중견기업', count: 1200000, revenue: 80000000000000, trend: 2.1 },
      { industry: '대기업', count: 333333, revenue: 20000000000000, trend: 2.8 }
    ],
    employmentData: {
      employed: 34000000,
      unemployed: 1270000,
      unemploymentRate: 3.6,
      averageSalary: 3900000
    },
    householdIncome: {
      average: 5500000,
      median: 4900000,
      top10Percent: 16000000,
      bottom10Percent: 2400000,
      giniCoefficient: 0.35
    },
    economicIndicators: {
      gdpGrowth: 3.0,
      inflation: 2.0,
      businessStartups: 300000,
      businessClosures: 119000,
      realEstatePrice: 450000000,
      consumerConfidence: 108.7,
      exportGrowth: 5.2,
      importGrowth: 3.8,
      tradeBalance: 45000000000
    }
  }
};

export default LAYER_STATISTICS;
