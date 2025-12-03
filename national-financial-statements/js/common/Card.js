// KRDS 기반 카드 컴포넌트
const Card = ({ title, description, icon, onClick, className = '' }) => {
  return (
    <div 
      className={`card ${className}`}
      onClick={onClick}
      style={{
        backgroundColor: 'var(--gray-0)',
        border: '1px solid var(--gray-30)',
        borderRadius: '8px',
        padding: '24px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(25, 115, 255, 0.15)';
          e.currentTarget.style.borderColor = 'var(--primary-500)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.borderColor = 'var(--gray-30)';
        }
      }}
    >
      {icon && (
        <div style={{
          fontSize: '32px',
          marginBottom: '16px',
          color: 'var(--primary-500)'
        }}>
          {icon}
        </div>
      )}
      
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: 'var(--gray-90)',
        marginBottom: '12px'
      }}>
        {title}
      </h3>
      
      {description && (
        <p style={{
          fontSize: '15px',
          lineHeight: '1.6',
          color: 'var(--gray-70)',
          flexGrow: 1
        }}>
          {description}
        </p>
      )}
    </div>
  );
};

export default Card;
