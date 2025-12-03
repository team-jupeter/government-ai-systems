// 재무제표 표준 양식 및 설명
const FINANCIAL_TEMPLATES = {
  // 손익계산서 (Income Statement)
  incomeStatement: {
    name: '손익계산서',
    englishName: 'Income Statement',
    description: '일정 기간 동안의 수익과 비용을 표시하여 순이익을 계산하는 재무제표',
    purpose: '기업의 수익성과 영업 성과를 평가',
    structure: {
      revenue: {
        label: '수익(매출)',
        items: ['매출액', '영업외수익', '기타수익']
      },
      expenses: {
        label: '비용',
        items: ['매출원가', '판매비와관리비', '영업외비용', '기타비용', '법인세']
      },
      netIncome: {
        label: '당기순이익',
        formula: '수익 - 비용'
      }
    }
  },
  
  // 대차대조표 (Balance Sheet)
  balanceSheet: {
    name: '대차대조표 (재무상태표)',
    englishName: 'Balance Sheet',
    description: '특정 시점의 자산, 부채, 자본을 표시하는 재무제표',
    purpose: '기업의 재무 상태와 지급 능력을 평가',
    structure: {
      assets: {
        label: '자산',
        items: ['유동자산', '비유동자산', '현금및현금성자산', '매출채권', '재고자산', '유형자산', '무형자산']
      },
      liabilities: {
        label: '부채',
        items: ['유동부채', '비유동부채', '매입채무', '단기차입금', '장기차입금', '사채']
      },
      equity: {
        label: '자본',
        items: ['자본금', '자본잉여금', '이익잉여금', '기타포괄손익누계액']
      },
      formula: '자산 = 부채 + 자본'
    }
  },
  
  // 현금흐름표 (Cash Flow Statement)
  cashFlowStatement: {
    name: '현금흐름표',
    englishName: 'Cash Flow Statement',
    description: '일정 기간 동안의 현금 유입과 유출을 표시하는 재무제표',
    purpose: '기업의 현금 창출 능력과 유동성을 평가',
    structure: {
      operating: {
        label: '영업활동 현금흐름',
        items: ['당기순이익', '감가상각비', '매출채권증감', '재고자산증감', '매입채무증감']
      },
      investing: {
        label: '투자활동 현금흐름',
        items: ['유형자산취득', '유형자산처분', '투자자산취득', '투자자산처분']
      },
      financing: {
        label: '재무활동 현금흐름',
        items: ['차입금증가', '차입금상환', '배당금지급', '자본금증가']
      }
    }
  },
  
  // 지분변동표 (Statement of Changes in Equity)
  equityStatement: {
    name: '지분변동표',
    englishName: 'Statement of Changes in Equity',
    description: '일정 기간 동안 자본의 변동 내역을 표시하는 재무제표',
    purpose: '자본의 구성 요소별 변동 원인과 규모를 파악',
    structure: {
      columns: ['기초잔액', '당기순이익', '배당금', '자본금증가', '기말잔액'],
      rows: ['자본금', '자본잉여금', '이익잉여금', '기타포괄손익누계액', '합계']
    }
  },
  
  // 이익잉여금처분계산서
  retainedEarningsStatement: {
    name: '이익잉여금처분계산서',
    englishName: 'Statement of Appropriation of Retained Earnings',
    description: '당기순이익의 처분 내역을 표시하는 재무제표',
    purpose: '이익의 배당 및 적립 내역을 명확히 함',
    structure: {
      beginningBalance: '기초 미처분이익잉여금',
      netIncome: '당기순이익',
      total: '합계',
      appropriation: {
        label: '이익잉여금처분액',
        items: ['이익준비금', '배당금', '임의적립금']
      },
      endingBalance: '기말 미처분이익잉여금'
    }
  },
  
  // 재무분석보고서
  financialAnalysis: {
    name: '재무분석보고서',
    englishName: 'Financial Analysis Report',
    description: '재무제표를 바탕으로 다양한 재무비율과 지표를 분석한 보고서',
    purpose: '기업의 수익성, 안정성, 활동성, 성장성을 종합 평가',
    categories: {
      profitability: {
        label: '수익성 비율',
        ratios: [
          { name: '매출액영업이익률', formula: '(영업이익 / 매출액) × 100' },
          { name: '매출액순이익률', formula: '(당기순이익 / 매출액) × 100' },
          { name: '총자산순이익률(ROA)', formula: '(당기순이익 / 총자산) × 100' },
          { name: '자기자본순이익률(ROE)', formula: '(당기순이익 / 자기자본) × 100' }
        ]
      },
      stability: {
        label: '안정성 비율',
        ratios: [
          { name: '유동비율', formula: '(유동자산 / 유동부채) × 100' },
          { name: '당좌비율', formula: '(당좌자산 / 유동부채) × 100' },
          { name: '부채비율', formula: '(부채총계 / 자기자본) × 100' },
          { name: '자기자본비율', formula: '(자기자본 / 총자산) × 100' }
        ]
      },
      activity: {
        label: '활동성 비율',
        ratios: [
          { name: '매출채권회전율', formula: '매출액 / 평균매출채권' },
          { name: '재고자산회전율', formula: '매출원가 / 평균재고자산' },
          { name: '총자산회전율', formula: '매출액 / 평균총자산' }
        ]
      },
      growth: {
        label: '성장성 비율',
        ratios: [
          { name: '매출액증가율', formula: '((당기매출액 - 전기매출액) / 전기매출액) × 100' },
          { name: '영업이익증가율', formula: '((당기영업이익 - 전기영업이익) / 전기영업이익) × 100' },
          { name: '순이익증가율', formula: '((당기순이익 - 전기순이익) / 전기순이익) × 100' }
        ]
      }
    }
  }
};

export default FINANCIAL_TEMPLATES;
