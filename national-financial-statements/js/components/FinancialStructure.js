import FINANCIAL_TEMPLATES from '../data/financialTemplates.js';

const { useState } = React;

function FinancialStructure() {
  const [expandedCard, setExpandedCard] = useState(null);
  
  const statements = [
    {
      id: 'income',
      data: FINANCIAL_TEMPLATES.incomeStatement,
      icon: '📈',
      color: 'var(--primary-500)'
    },
    {
      id: 'balance',
      data: FINANCIAL_TEMPLATES.balanceSheet,
      icon: '⚖️',
      color: 'var(--success)'
    },
    {
      id: 'cashflow',
      data: FINANCIAL_TEMPLATES.cashFlowStatement,
      icon: '💰',
      color: 'var(--info)'
    },
    {
      id: 'equity',
      data: FINANCIAL_TEMPLATES.equityStatement,
      icon: '📊',
      color: 'var(--warning)'
    },
    {
      id: 'retained',
      data: FINANCIAL_TEMPLATES.retainedEarningsStatement,
      icon: '💼',
      color: 'var(--secondary-500)'
    },
    {
      id: 'analysis',
      data: FINANCIAL_TEMPLATES.financialAnalysis,
      icon: '🔍',
      color: 'var(--danger)'
    }
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
      }, '재무제표 구성'),
      React.createElement('p', {
        style: {
          fontSize: '17px',
          color: 'var(--gray-70)',
          lineHeight: '1.8'
        }
      }, '개인과 기업의 프라이빗 데이터 금고에 저장되는 6가지 재무제표의 표준 양식과 역할을 소개합니다.')
    ),
    
    // 재무제표 그리드
    React.createElement('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '24px'
      }
    },
      statements.map(statement =>
        React.createElement(StatementCard, {
          key: statement.id,
          statement: statement,
          isExpanded: expandedCard === statement.id,
          onToggle: () => setExpandedCard(
            expandedCard === statement.id ? null : statement.id
          )
        })
      )
    )
  );
}

// 재무제표 카드 컴포넌트
function StatementCard({ statement, isExpanded, onToggle }) {
  const { id, data, icon, color } = statement;
  
  return React.createElement('div', {
    style: {
      backgroundColor: 'var(--gray-0)',
      border: `2px solid ${isExpanded ? color : 'var(--gray-30)'}`,
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'all 0.3s',
      boxShadow: isExpanded ? `0 8px 24px ${color}30` : 'none'
    }
  },
    // 헤더 (클릭 가능)
    React.createElement('button', {
      onClick: onToggle,
      style: {
        width: '100%',
        padding: '24px',
        backgroundColor: isExpanded ? `${color}15` : 'var(--gray-0)',
        border: 'none',
        textAlign: 'left',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        transition: 'background-color 0.2s',
        fontFamily: 'inherit'
      },
      onFocus: (e) => {
        e.currentTarget.style.outline = `2px solid ${color}`;
        e.currentTarget.style.outlineOffset = '-2px';
      },
      onBlur: (e) => {
        e.currentTarget.style.outline = 'none';
      }
    },
      React.createElement('div', {
        style: {
          fontSize: '48px',
          lineHeight: '1'
        }
      }, icon),
      
      React.createElement('div', { style: { flex: 1 }},
        React.createElement('h3', {
          style: {
            fontSize: '20px',
            fontWeight: '600',
            color: 'var(--gray-90)',
            marginBottom: '4px'
          }
        }, data.name),
        React.createElement('p', {
          style: {
            fontSize: '14px',
            color: 'var(--gray-70)',
            margin: 0
          }
        }, data.englishName)
      ),
      
      React.createElement('div', {
        style: {
          fontSize: '20px',
          color: color,
          transition: 'transform 0.3s',
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
        }
      }, '▼')
    ),
    
    // 컨텐츠 (확장 시 표시)
    React.createElement('div', {
      style: {
        maxHeight: isExpanded ? '2000px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.4s ease-in-out'
      }
    },
      React.createElement('div', {
        style: {
          padding: '24px',
          backgroundColor: 'var(--gray-10)',
          borderTop: `1px solid ${color}30`
        }
      },
        // 설명
        React.createElement('div', {
          style: { marginBottom: '20px' }
        },
          React.createElement('h4', {
            style: {
              fontSize: '16px',
              fontWeight: '600',
              color: color,
              marginBottom: '8px'
            }
          }, '설명'),
          React.createElement('p', {
            style: {
              fontSize: '15px',
              lineHeight: '1.6',
              color: 'var(--gray-70)'
            }
          }, data.description)
        ),
        
        // 목적
        React.createElement('div', {
          style: { marginBottom: '20px' }
        },
          React.createElement('h4', {
            style: {
              fontSize: '16px',
              fontWeight: '600',
              color: color,
              marginBottom: '8px'
            }
          }, '목적'),
          React.createElement('p', {
            style: {
              fontSize: '15px',
              lineHeight: '1.6',
              color: 'var(--gray-70)'
            }
          }, data.purpose)
        ),
        
        // 구조 (재무제표별 다르게 표시)
        renderStructure(data, color)
      )
    )
  );
}

// 구조 렌더링 함수
function renderStructure(data, color) {
  if (data.structure) {
    return React.createElement('div', null,
      React.createElement('h4', {
        style: {
          fontSize: '16px',
          fontWeight: '600',
          color: color,
          marginBottom: '12px'
        }
      }, '구조'),
      
      Object.entries(data.structure).map(([key, value]) => {
        if (typeof value === 'object' && value.label) {
          return React.createElement('div', {
            key: key,
            style: {
              marginBottom: '12px',
              padding: '12px',
              backgroundColor: 'var(--gray-0)',
              borderRadius: '6px',
              borderLeft: `3px solid ${color}`
            }
          },
            React.createElement('div', {
              style: {
                fontSize: '15px',
                fontWeight: '600',
                color: 'var(--gray-90)',
                marginBottom: '6px'
              }
            }, value.label),
            
            value.items && React.createElement('ul', {
              style: {
                margin: '8px 0 0 0',
                paddingLeft: '20px',
                fontSize: '14px',
                color: 'var(--gray-70)',
                lineHeight: '1.8'
              }
            },
              value.items.map((item, idx) =>
                React.createElement('li', { key: idx }, item)
              )
            ),
            
            value.formula && React.createElement('div', {
              style: {
                marginTop: '8px',
                padding: '8px',
                backgroundColor: `${color}10`,
                borderRadius: '4px',
                fontSize: '14px',
                color: color,
                fontWeight: '500'
              }
            }, '공식: ', value.formula)
          );
        }
        return null;
      })
    );
  }
  
  // 재무분석보고서의 카테고리 렌더링
  if (data.categories) {
    return React.createElement('div', null,
      React.createElement('h4', {
        style: {
          fontSize: '16px',
          fontWeight: '600',
          color: color,
          marginBottom: '12px'
        }
      }, '분석 항목'),
      
      Object.entries(data.categories).map(([key, category]) =>
        React.createElement('div', {
          key: key,
          style: {
            marginBottom: '16px',
            padding: '12px',
            backgroundColor: 'var(--gray-0)',
            borderRadius: '6px',
            borderLeft: `3px solid ${color}`
          }
        },
          React.createElement('div', {
            style: {
              fontSize: '15px',
              fontWeight: '600',
              color: 'var(--gray-90)',
              marginBottom: '8px'
            }
          }, category.label),
          
          category.ratios && React.createElement('div', {
            style: {
              display: 'grid',
              gap: '8px'
            }
          },
            category.ratios.map((ratio, idx) =>
              React.createElement('div', {
                key: idx,
                style: {
                  fontSize: '14px',
                  color: 'var(--gray-70)'
                }
              },
                React.createElement('strong', null, ratio.name, ': '),
                React.createElement('code', {
                  style: {
                    backgroundColor: `${color}10`,
                    padding: '2px 6px',
                    borderRadius: '3px',
                    fontSize: '13px',
                    color: color
                  }
                }, ratio.formula)
              )
            )
          )
        )
      )
    );
  }
  
  return null;
}

export default FinancialStructure;
