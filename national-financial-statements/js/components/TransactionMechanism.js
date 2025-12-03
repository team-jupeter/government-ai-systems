import { SAMPLE_ENTITIES, SAMPLE_TRANSACTIONS } from '../data/sampleData.js';

const { useState, useEffect } = React;

function TransactionMechanism() {
  const [currentStep, setCurrentStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(SAMPLE_TRANSACTIONS[0]);
  const [simulationStage, setSimulationStage] = useState(null);
  
  const steps = ['거래 전', '거래 진행', '거래 완료'];
  
  // 거래 엔티티 찾기
  const fromEntity = [...SAMPLE_ENTITIES.individuals, ...SAMPLE_ENTITIES.businesses]
    .find(e => e.id === selectedTransaction.from);
  const toEntity = [...SAMPLE_ENTITIES.individuals, ...SAMPLE_ENTITIES.businesses]
    .find(e => e.id === selectedTransaction.to);
  
  // 재무 데이터 계산 함수
  const getFinancialData = (entity) => {
    if (entity.type === 'business') {
      return {
        revenue: entity.revenue || 0,
        expenses: (entity.revenue || 0) - (entity.netIncome || 0),
        netIncome: entity.netIncome || 0,
        assets: entity.totalAssets || 0,
        liabilities: entity.totalLiabilities || 0,
        equity: entity.equity || 0
      };
    } else {
      const income = entity.annualIncome || 0;
      return {
        revenue: income,
        expenses: income * 0.3,
        netIncome: income * 0.7,
        assets: entity.assets || 0,
        liabilities: entity.liabilities || 0,
        equity: entity.netWorth || 0
      };
    }
  };
  
  // 애니메이션 시작
  const startAnimation = () => {
    setAnimating(true);
    setCurrentStep(0);
    setSimulationStage('before-income');
    
    setTimeout(() => {
      setSimulationStage('transaction');
      setCurrentStep(1);
    }, 3000);
    
    setTimeout(() => {
      setSimulationStage('after-income');
      setCurrentStep(2);
    }, 6000);
    
    setTimeout(() => {
      setSimulationStage('after-balance');
    }, 9000);
    
    setTimeout(() => {
      setSimulationStage(null);
      setAnimating(false);
    }, 12000);
  };
  
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
      }, '거래 메커니즘'),
      React.createElement('p', {
        style: {
          fontSize: '17px',
          color: 'var(--gray-70)',
          lineHeight: '1.8'
        }
      }, '두 거래 당사자 간의 거래가 각자의 재무제표에 자동으로 기록되는 과정을 시뮬레이션으로 보여줍니다.')
    ),
    
    // 거래 선택
    React.createElement('div', {
      style: {
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: 'var(--gray-10)',
        borderRadius: '8px',
        border: '1px solid var(--gray-30)'
      }
    },
      React.createElement('h3', {
        style: {
          fontSize: '18px',
          fontWeight: '600',
          color: 'var(--gray-90)',
          marginBottom: '16px'
        }
      }, '거래 선택'),
      
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '12px'
        }
      },
        SAMPLE_TRANSACTIONS.map(tx =>
          React.createElement('button', {
            key: tx.id,
            onClick: () => {
              setSelectedTransaction(tx);
              setCurrentStep(0);
              setAnimating(false);
              setSimulationStage(null);
            },
            disabled: animating,
            style: {
              padding: '12px 16px',
              backgroundColor: selectedTransaction.id === tx.id ? 'var(--primary-500)' : 'var(--gray-0)',
              color: selectedTransaction.id === tx.id ? 'var(--gray-0)' : 'var(--gray-90)',
              border: `1px solid ${selectedTransaction.id === tx.id ? 'var(--primary-500)' : 'var(--gray-30)'}`,
              borderRadius: '6px',
              cursor: animating ? 'not-allowed' : 'pointer',
              fontSize: '15px',
              fontWeight: '500',
              textAlign: 'left',
              transition: 'all 0.2s',
              fontFamily: 'inherit',
              opacity: animating ? 0.5 : 1
            }
          },
            React.createElement('div', { style: { fontWeight: '600', marginBottom: '4px' }}, tx.type),
            React.createElement('div', { style: { fontSize: '14px', opacity: 0.8 }},
              (tx.amount || 0).toLocaleString(), '원'
            )
          )
        )
      )
    ),
    
    // 시뮬레이션 컨트롤
    React.createElement('div', {
      style: {
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'center',
        gap: '12px'
      }
    },
      React.createElement('button', {
        onClick: startAnimation,
        disabled: animating,
        style: {
          padding: '12px 32px',
          backgroundColor: animating ? 'var(--gray-50)' : 'var(--primary-500)',
          color: 'var(--gray-0)',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: animating ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
          fontFamily: 'inherit'
        }
      }, animating ? '시뮬레이션 진행 중...' : '시뮬레이션 시작'),
      
      React.createElement('button', {
        onClick: () => {
          setCurrentStep(0);
          setAnimating(false);
          setSimulationStage(null);
        },
        style: {
          padding: '12px 24px',
          backgroundColor: 'var(--gray-0)',
          color: 'var(--gray-90)',
          border: '1px solid var(--gray-30)',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s',
          fontFamily: 'inherit'
        }
      }, '초기화')
    ),
    
    // 진행 상태 표시
    React.createElement('div', {
      style: {
        marginBottom: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px'
      }
    },
      steps.map((step, index) =>
        React.createElement('div', {
          key: index,
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }
        },
          React.createElement('div', {
            style: {
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: index <= currentStep ? 'var(--primary-500)' : 'var(--gray-30)',
              color: 'var(--gray-0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600',
              transition: 'all 0.3s'
            }
          }, index + 1),
          
          React.createElement('span', {
            style: {
              fontSize: '16px',
              fontWeight: '500',
              color: index <= currentStep ? 'var(--primary-500)' : 'var(--gray-70)',
              transition: 'all 0.3s'
            }
          }, step),
          
          index < steps.length - 1 && React.createElement('div', {
            style: {
              width: '60px',
              height: '2px',
              backgroundColor: index < currentStep ? 'var(--primary-500)' : 'var(--gray-30)',
              transition: 'all 0.3s'
            }
          })
        )
      )
    ),
    
    // 시뮬레이션 화면
    simulationStage && fromEntity && toEntity && React.createElement('div', {
      style: {
        marginBottom: '40px',
        padding: '40px',
        backgroundColor: 'var(--gray-10)',
        borderRadius: '12px',
        border: '2px solid var(--primary-500)',
        minHeight: '600px'
      }
    },
      simulationStage === 'before-income' && React.createElement(BeforeIncomeStatement, {
        fromEntity: fromEntity,
        toEntity: toEntity,
        transaction: selectedTransaction,
        getFinancialData: getFinancialData
      }),
      
      simulationStage === 'transaction' && React.createElement(TransactionSlip, {
        fromEntity: fromEntity,
        toEntity: toEntity,
        transaction: selectedTransaction
      }),
      
      simulationStage === 'after-income' && React.createElement(AfterIncomeStatement, {
        fromEntity: fromEntity,
        toEntity: toEntity,
        transaction: selectedTransaction,
        getFinancialData: getFinancialData
      }),
      
      simulationStage === 'after-balance' && React.createElement(AfterBalanceSheet, {
        fromEntity: fromEntity,
        toEntity: toEntity,
        transaction: selectedTransaction,
        getFinancialData: getFinancialData
      })
    )
  );
}

// 거래 전 손익계산서
function BeforeIncomeStatement({ fromEntity, toEntity, transaction, getFinancialData }) {
  const fromData = getFinancialData(fromEntity);
  const toData = getFinancialData(toEntity);
  
  return React.createElement('div', {
    style: { animation: 'fadeIn 0.5s ease-in' }
  },
    React.createElement('h3', {
      style: {
        fontSize: '24px',
        fontWeight: '700',
        color: 'var(--primary-600)',
        marginBottom: '30px',
        textAlign: 'center'
      }
    }, '📊 거래 전 손익계산서'),
    
    React.createElement('p', {
      style: {
        fontSize: '16px',
        color: 'var(--gray-70)',
        marginBottom: '30px',
        textAlign: 'center'
      }
    }, '거래 당사자 각각의 거래 전 재무 상태를 확인합니다.'),
    
    React.createElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '30px'
      }
    },
      React.createElement(IncomeStatementCard, {
        entity: fromEntity,
        label: '송금자',
        revenue: fromData.revenue,
        expenses: fromData.expenses,
        netIncome: fromData.netIncome,
        beforeTransaction: true
      }),
      
      React.createElement(IncomeStatementCard, {
        entity: toEntity,
        label: '수령자',
        revenue: toData.revenue,
        expenses: toData.expenses,
        netIncome: toData.netIncome,
        beforeTransaction: true
      })
    )
  );
}

// 거래 전표
function TransactionSlip({ fromEntity, toEntity, transaction }) {
  return React.createElement('div', {
    style: { animation: 'fadeIn 0.5s ease-in' }
  },
    React.createElement('h3', {
      style: {
        fontSize: '24px',
        fontWeight: '700',
        color: 'var(--primary-600)',
        marginBottom: '30px',
        textAlign: 'center'
      }
    }, '📝 거래 데이터 작성'),
    
    React.createElement('p', {
      style: {
        fontSize: '16px',
        color: 'var(--gray-70)',
        marginBottom: '30px',
        textAlign: 'center'
      }
    }, '거래 내역을 전표에 기록하고 양측 금고에 동시에 저장합니다.'),
    
    React.createElement('div', {
      style: {
        maxWidth: '700px',
        margin: '0 auto',
        backgroundColor: 'var(--gray-0)',
        border: '3px solid var(--primary-500)',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 8px 24px rgba(25, 115, 255, 0.2)'
      }
    },
      React.createElement('h4', {
        style: {
          fontSize: '20px',
          fontWeight: '700',
          color: 'var(--gray-90)',
          marginBottom: '30px',
          textAlign: 'center',
          paddingBottom: '20px',
          borderBottom: '2px solid var(--gray-30)'
        }
      }, '거 래 전 표'),
      
      React.createElement('div', {
        style: {
          display: 'grid',
          gap: '20px'
        }
      },
        React.createElement(SlipRow, { label: '거래 일시', value: transaction.date + ' 14:35:22' }),
        React.createElement(SlipRow, { label: '거래 번호', value: transaction.id }),
        React.createElement(SlipRow, { label: '판매자', value: `${fromEntity.name} (${fromEntity.id})` }),
        React.createElement(SlipRow, { label: '구매자', value: `${toEntity.name} (${toEntity.id})` }),
        React.createElement(SlipRow, { label: '거래 품목', value: transaction.type }),
        React.createElement(SlipRow, { label: '단가', value: (transaction.amount || 0).toLocaleString() + ' 원' }),
        React.createElement(SlipRow, { label: '수량', value: '1' }),
        React.createElement(SlipRow, { 
          label: '거래 금액', 
          value: (transaction.amount || 0).toLocaleString() + ' 원',
          highlight: true
        }),
        React.createElement(SlipRow, { label: 'Hash', value: (transaction.hash || '').substring(0, 32) + '...' })
      )
    )
  );
}

// 거래 후 손익계산서
function AfterIncomeStatement({ fromEntity, toEntity, transaction, getFinancialData }) {
  const fromData = getFinancialData(fromEntity);
  const toData = getFinancialData(toEntity);
  const amount = transaction.amount || 0;
  
  return React.createElement('div', {
    style: { animation: 'fadeIn 0.5s ease-in' }
  },
    React.createElement('h3', {
      style: {
        fontSize: '24px',
        fontWeight: '700',
        color: 'var(--success)',
        marginBottom: '30px',
        textAlign: 'center'
      }
    }, '✅ 거래 후 손익계산서 (갱신됨)'),
    
    React.createElement('p', {
      style: {
        fontSize: '16px',
        color: 'var(--gray-70)',
        marginBottom: '30px',
        textAlign: 'center'
      }
    }, '거래가 완료되어 손익계산서가 자동으로 갱신되었습니다.'),
    
    React.createElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '30px'
      }
    },
      React.createElement(IncomeStatementCard, {
        entity: fromEntity,
        label: '송금자',
        revenue: fromData.revenue,
        expenses: fromData.expenses + amount,
        netIncome: fromData.netIncome - amount,
        beforeTransaction: false
      }),
      
      React.createElement(IncomeStatementCard, {
        entity: toEntity,
        label: '수령자',
        revenue: toData.revenue + amount,
        expenses: toData.expenses,
        netIncome: toData.netIncome + amount,
        beforeTransaction: false
      })
    )
  );
}

// 거래 후 대차대조표
function AfterBalanceSheet({ fromEntity, toEntity, transaction, getFinancialData }) {
  const fromData = getFinancialData(fromEntity);
  const toData = getFinancialData(toEntity);
  const amount = transaction.amount || 0;
  
  return React.createElement('div', {
    style: { animation: 'fadeIn 0.5s ease-in' }
  },
    React.createElement('h3', {
      style: {
        fontSize: '24px',
        fontWeight: '700',
        color: 'var(--info)',
        marginBottom: '30px',
        textAlign: 'center'
      }
    }, '📋 대차대조표 갱신'),
    
    React.createElement('p', {
      style: {
        fontSize: '16px',
        color: 'var(--gray-70)',
        marginBottom: '30px',
        textAlign: 'center'
      }
    }, '현금 및 현금성 자산이 변동되어 대차대조표도 자동 갱신되었습니다.'),
    
    React.createElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '30px'
      }
    },
      React.createElement(BalanceSheetCard, {
        entity: fromEntity,
        label: '송금자',
        assets: fromData.assets - amount,
        liabilities: fromData.liabilities,
        equity: fromData.equity - amount
      }),
      
      React.createElement(BalanceSheetCard, {
        entity: toEntity,
        label: '수령자',
        assets: toData.assets + amount,
        liabilities: toData.liabilities,
        equity: toData.equity + amount
      })
    )
  );
}

// 손익계산서 카드
function IncomeStatementCard({ entity, label, revenue, expenses, netIncome, beforeTransaction }) {
  return React.createElement('div', {
    style: {
      backgroundColor: 'var(--gray-0)',
      border: beforeTransaction ? '2px solid var(--gray-30)' : '3px solid var(--success)',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: beforeTransaction ? 'none' : '0 4px 12px rgba(40, 167, 69, 0.2)'
    }
  },
    React.createElement('h4', {
      style: {
        fontSize: '18px',
        fontWeight: '600',
        color: 'var(--gray-90)',
        marginBottom: '8px'
      }
    }, entity.name),
    
    React.createElement('p', {
      style: {
        fontSize: '14px',
        color: 'var(--gray-70)',
        marginBottom: '20px'
      }
    }, label, ' - ', entity.type === 'business' ? '사업자' : '개인'),
    
    React.createElement('table', {
      style: {
        width: '100%',
        borderCollapse: 'collapse'
      }
    },
      React.createElement('tbody', null,
        React.createElement(FinancialRow, { label: 'Ⅰ. 총 수익', value: revenue }),
        React.createElement(FinancialRow, { label: 'Ⅱ. 총 비용', value: expenses }),
        React.createElement(FinancialRow, { 
          label: 'Ⅲ. 순이익', 
          value: netIncome,
          highlight: true
        })
      )
    )
  );
}

// 대차대조표 카드
function BalanceSheetCard({ entity, label, assets, liabilities, equity }) {
  const isBalanced = Math.abs(assets - (liabilities + equity)) < 1;
  
  return React.createElement('div', {
    style: {
      backgroundColor: 'var(--gray-0)',
      border: '3px solid var(--info)',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 4px 12px rgba(23, 162, 184, 0.2)'
    }
  },
    React.createElement('h4', {
      style: {
        fontSize: '18px',
        fontWeight: '600',
        color: 'var(--gray-90)',
        marginBottom: '8px'
      }
    }, entity.name),
    
    React.createElement('p', {
      style: {
        fontSize: '14px',
        color: 'var(--gray-70)',
        marginBottom: '20px'
      }
    }, label, ' - ', entity.type === 'business' ? '사업자' : '개인'),
    
    React.createElement('table', {
      style: {
        width: '100%',
        borderCollapse: 'collapse'
      }
    },
      React.createElement('tbody', null,
        React.createElement(FinancialRow, { label: 'Ⅰ. 총 자산', value: assets, highlight: true }),
        React.createElement(FinancialRow, { label: 'Ⅱ. 총 부채', value: liabilities }),
        React.createElement(FinancialRow, { label: 'Ⅲ. 자본', value: equity }),
        React.createElement('tr', {
          style: {
            borderTop: '2px solid var(--primary-500)'
          }
        },
          React.createElement('td', {
            style: {
              padding: '12px 0',
              fontSize: '13px',
              color: 'var(--gray-70)',
              fontWeight: '500'
            }
          }, '검증:'),
          React.createElement('td', {
            style: {
              padding: '12px 0',
              fontSize: '13px',
              color: isBalanced ? 'var(--success)' : 'var(--danger)',
              fontWeight: '600',
              textAlign: 'right'
            }
          }, isBalanced ? '✅ 대차균형 일치' : '❌ 불일치')
        )
      )
    )
  );
}

// 재무제표 행
function FinancialRow({ label, value, highlight = false }) {
  const safeValue = value || 0;
  
  return React.createElement('tr', {
    style: {
      borderBottom: '1px solid var(--gray-20)'
    }
  },
    React.createElement('td', {
      style: {
        padding: '12px 0',
        fontSize: '15px',
        color: 'var(--gray-90)',
        fontWeight: highlight ? '600' : '400'
      }
    }, label),
    React.createElement('td', {
      style: {
        padding: '12px 0',
        fontSize: '15px',
        color: highlight ? 'var(--primary-600)' : 'var(--gray-90)',
        fontWeight: highlight ? '700' : '400',
        textAlign: 'right'
      }
    }, safeValue.toLocaleString(), ' 원')
  );
}

// 전표 행
function SlipRow({ label, value, highlight = false }) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '1px solid var(--gray-20)'
    }
  },
    React.createElement('span', {
      style: {
        fontSize: '15px',
        fontWeight: '600',
        color: 'var(--gray-70)'
      }
    }, label),
    React.createElement('span', {
      style: {
        fontSize: highlight ? '18px' : '15px',
        fontWeight: highlight ? '700' : '500',
        color: highlight ? 'var(--primary-600)' : 'var(--gray-90)',
        fontFamily: highlight ? 'monospace' : 'inherit'
      }
    }, value)
  );
}

export default TransactionMechanism;
