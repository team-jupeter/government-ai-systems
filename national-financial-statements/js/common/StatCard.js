// KRDS 기반 통계 카드 컴포넌트
const StatCard = ({ label, value, unit = '', trend, icon, color = 'primary' }) => {
  const colorMap = {
    primary: 'var(--primary-500)',
    success: 'var(--success)',
    danger: 'var(--danger)',
    warning: 'var(--warning)',
    info: 'var(--info)'
  };
  
  const mainColor = colorMap[color] || colorMap.primary;
  
  return (
    <div style={{
      backgroundColor: 'var(--gray-0)',
      border: `2px solid ${mainColor}`,
      borderRadius: '8px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      {/* 라벨 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        {icon && (
          <span style={{ fontSize: '20px' }}>{icon}</span>
        )}
        <span style={{
          fontSize: '14px',
          fontWeight: '500',
          color: 'var(--gray-70)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {label}
        </span>
      </div>
      
      {/* 값 */}
      <div style={{
        fontSize: '28px',
        fontWeight: '700',
        color: mainColor,
        display: 'flex',
        alignItems: 'baseline',
        gap: '4px'
      }}>
        <span>{value}</span>
        {unit && (
          <span style={{
            fontSize: '16px',
            fontWeight: '500',
            color: 'var(--gray-70)'
          }}>
            {unit}
          </span>
        )}
      </div>
      
      {/* 트렌드 */}
      {trend && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          color: trend > 0 ? 'var(--success)' : trend < 0 ? 'var(--danger)' : 'var(--gray-70)'
        }}>
          <span>{trend > 0 ? '▲' : trend < 0 ? '▼' : '━'}</span>
          <span>{Math.abs(trend)}%</span>
          <span style={{ color: 'var(--gray-70)' }}>전월 대비</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
