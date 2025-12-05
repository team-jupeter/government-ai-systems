// ============================================
// StatCard 컴포넌트
// 통계 표시 카드
// ============================================

function StatCard({ title, value, unit, icon, trend, trendValue, type = 'primary' }) {
    const typeColors = {
        primary: 'var(--primary-50)',
        success: 'var(--success-50)',
        warning: 'var(--warning-50)',
        error: 'var(--error-50)'
    };

    const color = typeColors[type] || typeColors.primary;

    return (
        <div className={`stat-card ${type}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                        {title}
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: '700', color: color }}>
                        {value}
                        {unit && <span style={{ fontSize: '16px', marginLeft: '4px' }}>{unit}</span>}
                    </div>
                    {trend && trendValue && (
                        <div style={{ fontSize: '13px', color: 'var(--gray-50)', marginTop: '8px' }}>
                            <i className={`fas fa-arrow-${trend === 'up' ? 'up' : 'down'}`} 
                               style={{ color: trend === 'up' ? 'var(--success-50)' : 'var(--error-50)' }}></i>
                            {' '}{trendValue}
                        </div>
                    )}
                </div>
                {icon && (
                    <div style={{ fontSize: '32px', opacity: 0.3 }}>
                        <i className={`fas ${icon}`}></i>
                    </div>
                )}
            </div>
        </div>
    );
}

window.StatCard = StatCard;
