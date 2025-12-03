// KRDS 기반 국가 재무제표 시스템 설정
const CONFIG = {
  API_BASE_URL: '/api/national-financial-statements',
  
  // KRDS 색상 체계
  COLORS: {
    // Primary (정부 청색) - 주요 액션
    primary: {
      50: '#e8f1ff',
      100: '#d1e3ff',
      200: '#a3c7ff',
      300: '#75abff',
      400: '#478fff',
      500: '#1973ff', // 주 색상
      600: '#145acc',
      700: '#0f4299',
      800: '#0a2b66',
      900: '#051533'
    },
    // Secondary (정부 회색) - 보조 요소
    secondary: {
      50: '#f8f9fa',
      100: '#e9ecef',
      200: '#dee2e6',
      300: '#ced4da',
      400: '#adb5bd',
      500: '#6c757d', // 주 색상
      600: '#495057',
      700: '#343a40',
      800: '#212529',
      900: '#0d0f11'
    },
    // System Colors
    danger: '#dc3545',
    warning: '#ffc107',
    success: '#28a745',
    info: '#17a2b8',
    // Grayscale
    white: '#ffffff',
    black: '#000000',
    gray: {
      0: '#ffffff',
      10: '#f8f9fa',
      20: '#e9ecef',
      30: '#dee2e6',
      40: '#ced4da',
      50: '#adb5bd',
      60: '#6c757d',
      70: '#495057',
      80: '#343a40',
      90: '#212529',
      100: '#000000'
    }
  },
  
  // 인구 통계
  POPULATION: {
    individuals: 50000000,  // 5천만 명
    businesses: 10000000    // 1천만 사업자
  },
  
  // OpenHash Layer 확률 분포
  LAYER_PROBABILITIES: {
    layer1: 0.70,  // 읍면동 70%
    layer2: 0.20,  // 시군구 20%
    layer3: 0.08,  // 광역시도 8%
    layer4: 0.02   // 국가 2%
  },
  
  // 재무제표 유형
  FINANCIAL_STATEMENTS: {
    INCOME: '손익계산서',
    BALANCE: '대차대조표',
    CASHFLOW: '현금흐름표',
    EQUITY: '지분변동표',
    RETAINED_EARNINGS: '이익잉여금처분계산서',
    ANALYSIS: '재무분석보고서'
  },
  
  // 샘플 지역 (Layer 1~4)
  REGIONS: {
    layer1: ['종로1동', '명동', '강남역1동', '서초1동', '해운대1동'],
    layer2: ['종로구', '중구', '강남구', '서초구', '해운대구'],
    layer3: ['서울특별시', '부산광역시', '제주특별자치도'],
    layer4: ['대한민국']
  },
  
  // 타이포그래피 (KRDS 기준)
  TYPOGRAPHY: {
    fontFamily: 'Pretendard GOV, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif',
    baseFontSize: '17px', // KRDS 기본 크기
    lineHeight: '1.6'
  },
  
  // 접근성
  ACCESSIBILITY: {
    minContrastRatio: 4.5, // WCAG AA
    keyboardNavigation: true,
    screenReaderSupport: true
  }
};

export default CONFIG;
