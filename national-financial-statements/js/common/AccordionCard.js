// KRDS 기반 아코디언 카드 컴포넌트
const { useState } = React;

const AccordionCard = ({ title, summary, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div style={{
      backgroundColor: 'var(--gray-0)',
      border: '1px solid var(--gray-30)',
      borderRadius: '8px',
      marginBottom: '16px',
      overflow: 'hidden'
    }}>
      {/* 헤더 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '20px 24px',
          backgroundColor: isOpen ? 'var(--primary-50)' : 'var(--gray-0)',
          border: 'none',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'background-color 0.2s',
          fontFamily: 'inherit'
        }}
        onFocus={(e) => {
          e.currentTarget.style.outline = '2px solid var(--primary-500)';
          e.currentTarget.style.outlineOffset = '-2px';
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = 'none';
        }}
      >
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--gray-90)',
            marginBottom: '8px'
          }}>
            {title}
          </h3>
          {summary && (
            <p style={{
              fontSize: '15px',
              color: 'var(--gray-70)',
              margin: 0
            }}>
              {summary}
            </p>
          )}
        </div>
        
        <div style={{
          fontSize: '24px',
          color: 'var(--primary-500)',
          transition: 'transform 0.3s',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          marginLeft: '16px'
        }}>
          ▼
        </div>
      </button>
      
      {/* 컨텐츠 */}
      <div style={{
        maxHeight: isOpen ? '2000px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease-in-out'
      }}>
        <div style={{
          padding: '24px',
          borderTop: '1px solid var(--gray-20)',
          backgroundColor: 'var(--gray-10)'
        }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionCard;
