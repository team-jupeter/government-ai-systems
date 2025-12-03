import LAYER_STATISTICS from '../data/layerData.js';

const { useState } = React;

function ConsolidatedReports() {
  const [selectedLayer, setSelectedLayer] = useState(4);
  const [selectedView, setSelectedView] = useState('overview'); // overview, industry, employment, household, policy
  
  const layers = [
    { id: 1, name: 'Layer 1', label: '읍면동', data: LAYER_STATISTICS.layer1, color: '#3b82f6' },
    { id: 2, name: 'Layer 2', label: '시군구', data: LAYER_STATISTICS.layer2, color: '#10b981' },
    { id: 3, name: 'Layer 3', label: '광역시도', data: LAYER_STATISTICS.layer3, color: '#f59e0b' },
    { id: 4, name: 'Layer 4', label: '국가', data: LAYER_STATISTICS.layer4, color: '#ef4444' }
  ];
  
  const currentLayer = layers.find(l => l.id === selectedLayer);
  
  const views = [
    { id: 'overview', label: '종합 현황', icon: '📊' },
    { id: 'industry', label: '산업별 분석', icon: '🏭' },
    { id: 'employment', label: '고용 통계', icon: '👥' },
    { id: 'household', label: '가계 소득', icon: '💰' },
    { id: 'policy', label: 'AI 경제 정책', icon: '🤖' }
  ];
  
  return React.createElement('div', null,
    // 제목
    React.createElement('div', {
      style: {
        marginBottom: '40px',
        paddingBottom: '20px',
        borderBottom: '2px solid var(--primary-500)'
      }
    },
      React.createElement('h2', {
        style: {
          fontSize: '32px',
          fontWeight: '700',
          color: 'var(--gray-90)',
          marginBottom: '12px'
        }
      }, '결합 재무제표 및 경제 지표'),
      React.createElement('p', {
        style: {
          fontSize: '17px',
          color: 'var(--gray-70)',
          lineHeight: '1.8'
        }
      }, '6천만 개인 및 1천만 사업자의 재무제표를 자동 결합하여 읍면동부터 국가까지 4계층의 실시간 경제 통계를 생성합니다.')
    ),
    
    // Layer 선택
    React.createElement('div', {
      style: {
        marginBottom: '30px',
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap'
      }
    },
      layers.map(layer =>
        React.createElement('button', {
          key: layer.id,
          onClick: () => setSelectedLayer(layer.id),
          style: {
            padding: '12px 24px',
            backgroundColor: selectedLayer === layer.id ? layer.color : 'var(--gray-0)',
            color: selectedLayer === layer.id ? 'var(--gray-0)' : 'var(--gray-90)',
            border: `2px solid ${layer.color}`,
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'inherit'
          }
        }, `${layer.label} (${layer.data.name})`)
      )
    ),
    
    // 뷰 선택 탭
    React.createElement('div', {
      style: {
        marginBottom: '30px',
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        backgroundColor: 'var(--gray-10)',
        padding: '8px',
        borderRadius: '8px'
      }
    },
      views.map(view =>
        React.createElement('button', {
          key: view.id,
          onClick: () => setSelectedView(view.id),
          style: {
            padding: '10px 20px',
            backgroundColor: selectedView === view.id ? 'var(--gray-0)' : 'transparent',
            color: selectedView === view.id ? 'var(--primary-600)' : 'var(--gray-70)',
            border: 'none',
            borderRadius: '6px',
            fontSize: '15px',
            fontWeight: selectedView === view.id ? '600' : '500',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'inherit',
            boxShadow: selectedView === view.id ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
          }
        }, view.icon, ' ', view.label)
      )
    ),
    
    // 컨텐츠 영역
    currentLayer && React.createElement('div', null,
      selectedView === 'overview' && React.createElement(OverviewView, { layer: currentLayer }),
      selectedView === 'industry' && React.createElement(IndustryView, { layer: currentLayer }),
      selectedView === 'employment' && React.createElement(EmploymentView, { layer: currentLayer }),
      selectedView === 'household' && React.createElement(HouseholdView, { layer: currentLayer }),
      selectedView === 'policy' && React.createElement(PolicyView, { layer: currentLayer })
    )
  );
}

// 종합 현황 뷰
function OverviewView({ layer }) {
  return React.createElement('div', null,
    // 핵심 지표
    React.createElement('div', {
      style: {
        marginBottom: '40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px'
      }
    },
      React.createElement(StatCard, {
        label: '총 수익',
        value: formatNumber(layer.data.financials.totalRevenue),
        unit: '원',
        color: layer.color,
        icon: '📈',
        trend: '+3.2%'
      }),
      React.createElement(StatCard, {
        label: '순이익',
        value: formatNumber(layer.data.financials.netIncome),
        unit: '원',
        color: 'var(--success)',
        icon: '✨',
        trend: '+4.1%'
      }),
      React.createElement(StatCard, {
        label: 'GDP 성장률',
        value: layer.data.economicIndicators.gdpGrowth,
        unit: '%',
        color: 'var(--info)',
        icon: '📊',
        trend: '+0.3%p'
      }),
      React.createElement(StatCard, {
        label: '물가상승률',
        value: layer.data.economicIndicators.inflation,
        unit: '%',
        color: 'var(--warning)',
        icon: '💹',
        trend: '-0.2%p'
      })
    ),
    
    // 월별 추이 차트
    React.createElement('div', {
      style: {
        marginBottom: '40px',
        backgroundColor: 'var(--gray-0)',
        border: '1px solid var(--gray-30)',
        borderRadius: '8px',
        padding: '24px'
      }
    },
      React.createElement('h3', {
        style: {
          fontSize: '18px',
          fontWeight: '600',
          color: 'var(--gray-90)',
          marginBottom: '20px'
        }
      }, '📈 월별 경제 추이 (최근 7개월)'),
      
      React.createElement(TrendChart, {
        data: layer.data.monthlyTrend,
        color: layer.color
      })
    ),
    
    // 경제 지표 요약
    React.createElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px'
      }
    },
      React.createElement(IndicatorCard, {
        title: '신규 사업자',
        value: layer.data.economicIndicators.businessStartups.toLocaleString(),
        unit: '개',
        subtitle: '(월간)',
        color: 'var(--success)',
        icon: '🆕'
      }),
      React.createElement(IndicatorCard, {
        title: '폐업 사업자',
        value: layer.data.economicIndicators.businessClosures.toLocaleString(),
        unit: '개',
        subtitle: '(월간)',
        color: 'var(--danger)',
        icon: '🚫'
      }),
      React.createElement(IndicatorCard, {
        title: '부동산 평균가',
        value: formatNumber(layer.data.economicIndicators.realEstatePrice),
        unit: '원',
        subtitle: '(주거용)',
        color: 'var(--info)',
        icon: '🏠'
      }),
      React.createElement(IndicatorCard, {
        title: '소비자 신뢰지수',
        value: layer.data.economicIndicators.consumerConfidence,
        unit: '',
        subtitle: '(기준: 100)',
        color: 'var(--warning)',
        icon: '📊'
      })
    )
  );
}

// 산업별 분석 뷰
function IndustryView({ layer }) {
  return React.createElement('div', null,
    React.createElement('h3', {
      style: {
        fontSize: '24px',
        fontWeight: '600',
        color: 'var(--gray-90)',
        marginBottom: '24px'
      }
    }, '🏭 산업별 상세 분석'),
    
    React.createElement('p', {
      style: {
        fontSize: '16px',
        color: 'var(--gray-70)',
        marginBottom: '30px',
        lineHeight: '1.8'
      }
    }, '6천만 재무제표를 산업별로 자동 분류하여 각 업종의 실시간 경영 현황을 파악합니다.'),
    
    // 산업별 현황
    React.createElement('div', {
      style: {
        marginBottom: '40px',
        backgroundColor: 'var(--gray-0)',
        border: '1px solid var(--gray-30)',
        borderRadius: '8px',
        padding: '24px'
      }
    },
      React.createElement('h4', {
        style: {
          fontSize: '18px',
          fontWeight: '600',
          color: 'var(--gray-90)',
          marginBottom: '20px'
        }
      }, '산업별 사업자 수 및 매출'),
      
      React.createElement(IndustryBarChart, {
        data: layer.data.industryBreakdown,
        color: layer.color
      })
    ),
    
    // 산업별 상세 카드
    React.createElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }
    },
      layer.data.industryBreakdown.map((industry, idx) =>
        React.createElement(IndustryDetailCard, {
          key: idx,
          industry: industry,
          color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][idx]
        })
      )
    ),
    
    // AI 분석 인사이트
    React.createElement('div', {
      style: {
        marginTop: '40px',
        padding: '24px',
        backgroundColor: 'var(--primary-50)',
        border: '2px solid var(--primary-500)',
        borderRadius: '8px'
      }
    },
      React.createElement('h4', {
        style: {
          fontSize: '18px',
          fontWeight: '600',
          color: 'var(--primary-700)',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }
      }, '🤖 AI 산업 분석 인사이트'),
      
      React.createElement('ul', {
        style: {
          fontSize: '15px',
          lineHeight: '2',
          color: 'var(--gray-90)',
          paddingLeft: '24px'
        }
      },
        React.createElement('li', null, '자영업 매출이 전월 대비 2.3% 증가하여 소비 심리 회복 신호'),
        React.createElement('li', null, '중소기업 성장률 4.1%로 고용 창출 가능성 높음'),
        React.createElement('li', null, '중견기업 매출 감소(-1.2%)는 글로벌 공급망 이슈 영향'),
        React.createElement('li', null, '대기업은 안정적 성장(1.8%) 유지 중')
      )
    )
  );
}

// 고용 통계 뷰
function EmploymentView({ layer }) {
  const data = layer.data.employmentData;
  const totalLabor = data.employed + data.unemployed;
  
  return React.createElement('div', null,
    React.createElement('h3', {
      style: {
        fontSize: '24px',
        fontWeight: '600',
        color: 'var(--gray-90)',
        marginBottom: '24px'
      }
    }, '👥 고용 통계 및 노동시장 분석'),
    
    React.createElement('p', {
      style: {
        fontSize: '16px',
        color: 'var(--gray-70)',
        marginBottom: '30px',
        lineHeight: '1.8'
      }
    }, '개인 재무제표의 급여 수령 내역을 집계하여 실시간 고용 통계를 자동 생성합니다.'),
    
    // 핵심 고용 지표
    React.createElement('div', {
      style: {
        marginBottom: '40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px'
      }
    },
      React.createElement(IndicatorCard, {
        title: '취업자 수',
        value: data.employed.toLocaleString(),
        unit: '명',
        subtitle: `경제활동인구의 ${((data.employed/totalLabor)*100).toFixed(1)}%`,
        color: 'var(--success)',
        icon: '✅'
      }),
      React.createElement(IndicatorCard, {
        title: '실업자 수',
        value: data.unemployed.toLocaleString(),
        unit: '명',
        subtitle: `경제활동인구의 ${((data.unemployed/totalLabor)*100).toFixed(1)}%`,
        color: 'var(--danger)',
        icon: '❌'
      }),
      React.createElement(IndicatorCard, {
        title: '실업률',
        value: data.unemploymentRate,
        unit: '%',
        subtitle: '국제 권고 수준 이하',
        color: 'var(--info)',
        icon: '📊'
      }),
      React.createElement(IndicatorCard, {
        title: '평균 급여',
        value: (data.averageSalary/10000).toFixed(0),
        unit: '만원',
        subtitle: '(월 기준)',
        color: 'var(--warning)',
        icon: '💰'
      })
    ),
    
    // 고용 현황 시각화
    React.createElement('div', {
      style: {
        marginBottom: '40px',
        backgroundColor: 'var(--gray-0)',
        border: '1px solid var(--gray-30)',
        borderRadius: '8px',
        padding: '30px'
      }
    },
      React.createElement('h4', {
        style: {
          fontSize: '18px',
          fontWeight: '600',
          color: 'var(--gray-90)',
          marginBottom: '24px'
        }
      }, '고용 현황 분포'),
      
      React.createElement(EmploymentPieChart, {
        employed: data.employed,
        unemployed: data.unemployed
      })
    ),
    
    // AI 고용 정책 제안
    React.createElement('div', {
      style: {
        padding: '24px',
        backgroundColor: 'var(--success)',
        color: 'var(--gray-0)',
        borderRadius: '8px'
      }
    },
      React.createElement('h4', {
        style: {
          fontSize: '18px',
          fontWeight: '700',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }
      }, '🤖 AI 고용 정책 제안'),
      
      React.createElement('div', {
        style: {
          fontSize: '15px',
          lineHeight: '2'
        }
      },
        React.createElement('p', { style: { marginBottom: '12px' }}, 
          '✓ 실업률 3.6%는 완전고용 수준으로 양호한 상태입니다.'
        ),
        React.createElement('p', { style: { marginBottom: '12px' }}, 
          '✓ 자영업 종사자 증가 추세를 감안하여 창업 지원 정책 강화를 권고합니다.'
        ),
        React.createElement('p', null, 
          '✓ 평균 급여 상승률(+2.8%)이 물가상승률(+2.0%)을 상회하여 실질소득 증가 중입니다.'
        )
      )
    )
  );
}

// 가계 소득 뷰
function HouseholdView({ layer }) {
  const data = layer.data.householdIncome;
  
  return React.createElement('div', null,
    React.createElement('h3', {
      style: {
        fontSize: '24px',
        fontWeight: '600',
        color: 'var(--gray-90)',
        marginBottom: '24px'
      }
    }, '💰 가계 소득 분포 및 소득 불평등 지표'),
    
    React.createElement('p', {
      style: {
        fontSize: '16px',
        color: 'var(--gray-70)',
        marginBottom: '30px',
        lineHeight: '1.8'
      }
    }, '개인 재무제표의 소득 데이터를 익명화하여 집계한 가구당 소득 통계입니다.'),
    
    // 소득 분포 지표
    React.createElement('div', {
      style: {
        marginBottom: '40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px'
      }
    },
      React.createElement(IndicatorCard, {
        title: '평균 소득',
        value: (data.average/10000).toFixed(0),
        unit: '만원',
        subtitle: '(가구당 월간)',
        color: 'var(--primary-500)',
        icon: '💵'
      }),
      React.createElement(IndicatorCard, {
        title: '중위 소득',
        value: (data.median/10000).toFixed(0),
        unit: '만원',
        subtitle: '(상위 50% 기준)',
        color: 'var(--success)',
        icon: '📊'
      }),
      React.createElement(IndicatorCard, {
        title: '상위 10% 소득',
        value: (data.top10Percent/10000).toFixed(0),
        unit: '만원',
        subtitle: '(고소득층)',
        color: 'var(--warning)',
        icon: '💎'
      }),
      React.createElement(IndicatorCard, {
        title: '하위 10% 소득',
        value: (data.bottom10Percent/10000).toFixed(0),
        unit: '만원',
        subtitle: '(저소득층)',
        color: 'var(--danger)',
        icon: '📉'
      })
    ),
    
    // 지니계수
    React.createElement('div', {
      style: {
        marginBottom: '40px',
        padding: '24px',
        backgroundColor: 'var(--info)',
        color: 'var(--gray-0)',
        borderRadius: '8px'
      }
    },
      React.createElement('h4', {
        style: {
          fontSize: '20px',
          fontWeight: '700',
          marginBottom: '12px'
        }
      }, '📈 지니계수 (Gini Coefficient)'),
      
      React.createElement('div', {
        style: {
          fontSize: '48px',
          fontWeight: '700',
          marginBottom: '12px'
        }
      }, data.giniCoefficient.toFixed(2)),
      
      React.createElement('p', {
        style: {
          fontSize: '15px',
          lineHeight: '1.8'
        }
      }, 
        '0에 가까울수록 평등, 1에 가까울수록 불평등을 의미합니다. ',
        'OECD 평균(0.31) 대비 ', 
        data.giniCoefficient > 0.31 ? '다소 높은' : '낮은',
        ' 수준입니다.'
      )
    ),
    
    // 소득 분포 차트
    React.createElement('div', {
      style: {
        marginBottom: '40px',
        backgroundColor: 'var(--gray-0)',
        border: '1px solid var(--gray-30)',
        borderRadius: '8px',
        padding: '24px'
      }
    },
      React.createElement('h4', {
        style: {
          fontSize: '18px',
          fontWeight: '600',
          color: 'var(--gray-90)',
          marginBottom: '20px'
        }
      }, '소득 분위별 분포'),
      
      React.createElement(IncomeDistributionChart, {
        data: data
      })
    ),
    
    // AI 소득 정책 제안
    React.createElement('div', {
      style: {
        padding: '24px',
        backgroundColor: 'var(--warning)',
        color: 'var(--gray-0)',
        borderRadius: '8px'
      }
    },
      React.createElement('h4', {
        style: {
          fontSize: '18px',
          fontWeight: '700',
          marginBottom: '16px'
        }
      }, '🤖 AI 소득 정책 제안'),
      
      React.createElement('ul', {
        style: {
          fontSize: '15px',
          lineHeight: '2',
          paddingLeft: '24px'
        }
      },
        React.createElement('li', null, `지니계수 ${data.giniCoefficient}는 ${data.giniCoefficient > 0.35 ? '소득 불평등 해소를 위한 정책 강화가 필요합니다' : '적정 수준을 유지하고 있습니다'}`),
        React.createElement('li', null, '하위 10% 소득층 지원을 위한 근로장려금 확대 검토'),
        React.createElement('li', null, '중산층 육성을 위한 세제 혜택 및 주거 안정 정책 시행')
      )
    )
  );
}

// AI 경제 정책 뷰
function PolicyView({ layer }) {
  return React.createElement('div', null,
    React.createElement('h3', {
      style: {
        fontSize: '24px',
        fontWeight: '600',
        color: 'var(--gray-90)',
        marginBottom: '24px'
      }
    }, '🤖 AI 기반 경제 정책 수립 시스템'),
    
    React.createElement('p', {
      style: {
        fontSize: '16px',
        color: 'var(--gray-70)',
        marginBottom: '30px',
        lineHeight: '1.8'
      }
    }, '6천만 재무제표를 실시간 분석하여 AI가 자동으로 경제 정책을 수립하고 집행합니다.'),
    
    // 정책 수립 프로세스
    React.createElement('div', {
      style: {
        marginBottom: '40px',
        backgroundColor: 'var(--primary-50)',
        border: '2px solid var(--primary-500)',
        borderRadius: '12px',
        padding: '30px'
      }
    },
      React.createElement('h4', {
        style: {
          fontSize: '20px',
          fontWeight: '700',
          color: 'var(--primary-700)',
          marginBottom: '24px'
        }
      }, '📋 AI 정책 수립 프로세스'),
      
      React.createElement('div', {
        style: {
          display: 'grid',
          gap: '16px'
        }
      },
        React.createElement(PolicyStep, {
          step: 1,
          title: '데이터 수집',
          description: '6천만 재무제표로부터 실시간 경제 지표 자동 추출',
          icon: '📊'
        }),
        React.createElement(PolicyStep, {
          step: 2,
          title: '상황 분석',
          description: 'AI가 경제 현황을 다각도로 분석하여 문제점 파악',
          icon: '🔍'
        }),
        React.createElement(PolicyStep, {
          step: 3,
          title: '정책 시뮬레이션',
          description: '다양한 정책 시나리오를 시뮬레이션하여 최적안 도출',
          icon: '🎯'
        }),
        React.createElement(PolicyStep, {
          step: 4,
          title: '정책 집행',
          description: '선택된 정책을 자동으로 집행하고 효과 모니터링',
          icon: '⚡'
        })
      )
    ),
    
    // 현재 시행 중인 AI 정책
    React.createElement('div', {
      style: {
        marginBottom: '40px'
      }
    },
      React.createElement('h4', {
        style: {
          fontSize: '20px',
          fontWeight: '700',
          color: 'var(--gray-90)',
          marginBottom: '24px'
        }
      }, '✅ 현재 시행 중인 AI 경제 정책'),
      
      React.createElement('div', {
        style: {
          display: 'grid',
          gap: '16px'
        }
      },
        React.createElement(PolicyCard, {
          title: '자영업자 매출 증진 프로그램',
          status: '시행 중',
          description: '자영업 매출 감소 업종에 마케팅 지원금 자동 지급',
          impact: '대상: 1,200개 사업장, 예상 매출 증가: 15%',
          color: 'var(--success)'
        }),
        React.createElement(PolicyCard, {
          title: '청년 창업 지원 확대',
          status: '시행 중',
          description: '35세 이하 신규 창업자에게 무이자 대출 자동 승인',
          impact: '월 45건 신규 창업, 고용 창출: 180명',
          color: 'var(--info)'
        }),
        React.createElement(PolicyCard, {
          title: '저소득층 긴급 생활비 지원',
          status: '시행 중',
          description: '소득 하위 10% 가구에 생활비 자동 지급',
          impact: '대상: 1,200가구, 월 평균 50만원 지원',
          color: 'var(--warning)'
        })
      )
    ),
    
    // AI 정책 효과 예측
    React.createElement('div', {
      style: {
        padding: '30px',
        backgroundColor: 'var(--success)',
        color: 'var(--gray-0)',
        borderRadius: '12px'
      }
    },
      React.createElement('h4', {
        style: {
          fontSize: '20px',
          fontWeight: '700',
          marginBottom: '20px'
        }
      }, '📈 AI 정책 효과 예측 (향후 3개월)'),
      
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }
      },
        React.createElement(PredictionCard, {
          label: 'GDP 성장률',
          current: layer.data.economicIndicators.gdpGrowth,
          predicted: layer.data.economicIndicators.gdpGrowth + 0.5,
          unit: '%'
        }),
        React.createElement(PredictionCard, {
          label: '실업률',
          current: layer.data.employmentData.unemploymentRate,
          predicted: layer.data.employmentData.unemploymentRate - 0.3,
          unit: '%'
        }),
        React.createElement(PredictionCard, {
          label: '지니계수',
          current: layer.data.householdIncome.giniCoefficient,
          predicted: layer.data.householdIncome.giniCoefficient - 0.02,
          unit: ''
        })
      )
    )
  );
}

// 통계 카드
function StatCard({ label, value, unit, color, icon, trend }) {
  return React.createElement('div', {
    style: {
      padding: '20px',
      backgroundColor: 'var(--gray-0)',
      border: `2px solid ${color}`,
      borderRadius: '8px',
      textAlign: 'center'
    }
  },
    React.createElement('div', { style: { fontSize: '28px', marginBottom: '8px' }}, icon),
    React.createElement('div', {
      style: {
        fontSize: '20px',
        fontWeight: '700',
        color: color,
        marginBottom: '6px'
      }
    }, value, unit),
    React.createElement('div', {
      style: {
        fontSize: '14px',
        color: 'var(--gray-70)',
        fontWeight: '500',
        marginBottom: '4px'
      }
    }, label),
    trend && React.createElement('div', {
      style: {
        fontSize: '13px',
        color: trend.startsWith('+') ? 'var(--success)' : 'var(--danger)',
        fontWeight: '600'
      }
    }, trend)
  );
}

// 지표 카드
function IndicatorCard({ title, value, unit, subtitle, color, icon }) {
  return React.createElement('div', {
    style: {
      padding: '20px',
      backgroundColor: 'var(--gray-0)',
      border: `2px solid ${color}`,
      borderRadius: '8px'
    }
  },
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '12px'
      }
    },
      React.createElement('div', { style: { fontSize: '32px' }}, icon),
      React.createElement('div', {
        style: {
          fontSize: '14px',
          fontWeight: '600',
          color: 'var(--gray-70)'
        }
      }, title)
    ),
    React.createElement('div', {
      style: {
        fontSize: '28px',
        fontWeight: '700',
        color: color,
        marginBottom: '6px'
      }
    }, value, unit),
    React.createElement('div', {
      style: {
        fontSize: '13px',
        color: 'var(--gray-60)'
      }
    }, subtitle)
  );
}

// 추이 차트 (간단한 라인 차트)
function TrendChart({ data, color }) {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  
  return React.createElement('div', {
    style: {
      height: '300px',
      display: 'flex',
      alignItems: 'flex-end',
      gap: '8px',
      paddingTop: '20px'
    }
  },
    data.map((item, idx) =>
      React.createElement('div', {
        key: idx,
        style: {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }
      },
        React.createElement('div', {
          style: {
            width: '100%',
            height: `${(item.revenue / maxRevenue) * 250}px`,
            backgroundColor: color,
            borderRadius: '4px 4px 0 0',
            transition: 'all 0.3s',
            position: 'relative'
          },
          title: `${item.month}: ${formatNumber(item.revenue)}원`
        }),
        React.createElement('div', {
          style: {
            fontSize: '13px',
            color: 'var(--gray-70)',
            fontWeight: '500'
          }
        }, item.month)
      )
    )
  );
}

// 산업별 막대 차트
function IndustryBarChart({ data, color }) {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  
  return React.createElement('div', {
    style: {
      display: 'grid',
      gap: '16px'
    }
  },
    data.map((item, idx) =>
      React.createElement('div', {
        key: idx,
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }
      },
        React.createElement('div', {
          style: {
            width: '100px',
            fontSize: '14px',
            fontWeight: '600',
            color: 'var(--gray-90)',
            flexShrink: 0
          }
        }, item.industry),
        React.createElement('div', {
          style: {
            flex: 1,
            height: '40px',
            backgroundColor: color,
            borderRadius: '4px',
            width: `${(item.revenue / maxRevenue) * 100}%`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: '12px',
            color: 'var(--gray-0)',
            fontSize: '13px',
            fontWeight: '600',
            transition: 'all 0.3s'
          }
        }, formatNumber(item.revenue), '원')
      )
    )
  );
}

// 산업 상세 카드
function IndustryDetailCard({ industry, color }) {
  return React.createElement('div', {
    style: {
      padding: '20px',
      backgroundColor: 'var(--gray-0)',
      border: `2px solid ${color}`,
      borderRadius: '8px'
    }
  },
    React.createElement('h5', {
      style: {
        fontSize: '18px',
        fontWeight: '700',
        color: 'var(--gray-90)',
        marginBottom: '16px'
      }
    }, industry.industry),
    React.createElement('div', {
      style: {
        display: 'grid',
        gap: '12px'
      }
    },
      React.createElement(DataRow, { label: '사업자 수', value: industry.count.toLocaleString() + ' 개' }),
      React.createElement(DataRow, { label: '총 매출', value: formatNumber(industry.revenue) + ' 원' }),
      React.createElement(DataRow, {
        label: '성장률',
        value: industry.trend + '%',
        highlight: true,
        color: industry.trend > 0 ? 'var(--success)' : 'var(--danger)'
      })
    )
  );
}

// 고용 파이 차트 (간단한 비율 표시)
function EmploymentPieChart({ employed, unemployed }) {
  const total = employed + unemployed;
  const employedPercent = (employed / total * 100).toFixed(1);
  const unemployedPercent = (unemployed / total * 100).toFixed(1);
  
  return React.createElement('div', {
    style: {
      display: 'flex',
      gap: '40px',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
    React.createElement('div', {
      style: {
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: `conic-gradient(var(--success) 0% ${employedPercent}%, var(--danger) ${employedPercent}% 100%)`,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }
    }),
    React.createElement('div', {
      style: {
        display: 'grid',
        gap: '16px'
      }
    },
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }
      },
        React.createElement('div', {
          style: {
            width: '20px',
            height: '20px',
            backgroundColor: 'var(--success)',
            borderRadius: '4px'
          }
        }),
        React.createElement('div', null,
          React.createElement('div', {
            style: {
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--gray-90)'
            }
          }, '취업자'),
          React.createElement('div', {
            style: {
              fontSize: '14px',
              color: 'var(--gray-70)'
            }
          }, employed.toLocaleString(), '명 (', employedPercent, '%)')
        )
      ),
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }
      },
        React.createElement('div', {
          style: {
            width: '20px',
            height: '20px',
            backgroundColor: 'var(--danger)',
            borderRadius: '4px'
          }
        }),
        React.createElement('div', null,
          React.createElement('div', {
            style: {
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--gray-90)'
            }
          }, '실업자'),
          React.createElement('div', {
            style: {
              fontSize: '14px',
              color: 'var(--gray-70)'
            }
          }, unemployed.toLocaleString(), '명 (', unemployedPercent, '%)')
        )
      )
    )
  );
}

// 소득 분포 차트
function IncomeDistributionChart({ data }) {
  const items = [
    { label: '하위 10%', value: data.bottom10Percent, color: '#ef4444' },
    { label: '중위', value: data.median, color: '#3b82f6' },
    { label: '평균', value: data.average, color: '#10b981' },
    { label: '상위 10%', value: data.top10Percent, color: '#f59e0b' }
  ];
  
  const maxValue = Math.max(...items.map(i => i.value));
  
  return React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: '20px',
      height: '250px',
      paddingTop: '20px'
    }
  },
    items.map((item, idx) =>
      React.createElement('div', {
        key: idx,
        style: {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }
      },
        React.createElement('div', {
          style: {
            width: '100%',
            height: `${(item.value / maxValue) * 200}px`,
            backgroundColor: item.color,
            borderRadius: '4px 4px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gray-0)',
            fontSize: '13px',
            fontWeight: '600',
            flexDirection: 'column',
            gap: '4px'
          }
        },
          React.createElement('div', null, (item.value/10000).toFixed(0)),
          React.createElement('div', { style: { fontSize: '11px' }}, '만원')
        ),
        React.createElement('div', {
          style: {
            fontSize: '14px',
            fontWeight: '600',
            color: 'var(--gray-90)'
          }
        }, item.label)
      )
    )
  );
}

// 정책 단계
function PolicyStep({ step, title, description, icon }) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '16px',
      backgroundColor: 'var(--gray-0)',
      borderRadius: '8px',
      border: '1px solid var(--primary-300)'
    }
  },
    React.createElement('div', {
      style: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary-500)',
        color: 'var(--gray-0)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        fontWeight: '700',
        flexShrink: 0
      }
    }, step),
    React.createElement('div', {
      style: {
        fontSize: '32px',
        flexShrink: 0
      }
    }, icon),
    React.createElement('div', null,
      React.createElement('h6', {
        style: {
          fontSize: '16px',
          fontWeight: '600',
          color: 'var(--gray-90)',
          marginBottom: '4px'
        }
      }, title),
      React.createElement('p', {
        style: {
          fontSize: '14px',
          color: 'var(--gray-70)',
          lineHeight: '1.5'
        }
      }, description)
    )
  );
}

// 정책 카드
function PolicyCard({ title, status, description, impact, color }) {
  return React.createElement('div', {
    style: {
      padding: '20px',
      backgroundColor: 'var(--gray-0)',
      border: `2px solid ${color}`,
      borderRadius: '8px'
    }
  },
    React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }
    },
      React.createElement('h6', {
        style: {
          fontSize: '17px',
          fontWeight: '700',
          color: 'var(--gray-90)'
        }
      }, title),
      React.createElement('span', {
        style: {
          padding: '4px 12px',
          backgroundColor: color,
          color: 'var(--gray-0)',
          borderRadius: '12px',
          fontSize: '13px',
          fontWeight: '600'
        }
      }, status)
    ),
    React.createElement('p', {
      style: {
        fontSize: '14px',
        color: 'var(--gray-70)',
        lineHeight: '1.6',
        marginBottom: '12px'
      }
    }, description),
    React.createElement('div', {
      style: {
        padding: '12px',
        backgroundColor: `${color}15`,
        borderRadius: '6px',
        fontSize: '13px',
        color: 'var(--gray-90)',
        fontWeight: '500'
      }
    }, '📊 ', impact)
  );
}

// 예측 카드
function PredictionCard({ label, current, predicted, unit }) {
  const change = predicted - current;
  const isPositive = change > 0;
  
  return React.createElement('div', {
    style: {
      padding: '16px',
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: '8px'
    }
  },
    React.createElement('div', {
      style: {
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '8px'
      }
    }, label),
    React.createElement('div', {
      style: {
        fontSize: '24px',
        fontWeight: '700',
        marginBottom: '4px'
      }
    }, current.toFixed(2), unit, ' → ', predicted.toFixed(2), unit),
    React.createElement('div', {
      style: {
        fontSize: '13px',
        fontWeight: '600'
      }
    }, isPositive ? '▲' : '▼', ' ', Math.abs(change).toFixed(2), unit)
  );
}

// 데이터 행
function DataRow({ label, value, highlight = false, color = 'var(--gray-90)' }) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 0',
      borderBottom: '1px solid var(--gray-20)'
    }
  },
    React.createElement('span', {
      style: {
        fontSize: '14px',
        color: 'var(--gray-70)'
      }
    }, label),
    React.createElement('span', {
      style: {
        fontSize: '14px',
        fontWeight: highlight ? '700' : '500',
        color: highlight ? color : 'var(--gray-90)'
      }
    }, value)
  );
}

// 숫자 포맷 함수
function formatNumber(num) {
  if (num >= 1000000000000) {
    return (num / 1000000000000).toFixed(1) + '조';
  } else if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + '억';
  } else if (num >= 10000) {
    return (num / 10000).toFixed(1) + '만';
  }
  return num.toLocaleString();
}

export default ConsolidatedReports;
