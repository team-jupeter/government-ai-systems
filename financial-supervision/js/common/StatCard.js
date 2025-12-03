// ============================================
// 통계 카드 컴포넌트
// 금융감독 주요 지표 표시
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
        <div className="stat-card" style={{ borderLeftColor: color }}>
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '12px'
            }}>
                <span style={{ 
                    fontSize: '14px', 
                    color: 'var(--gray-70)',
                    fontWeight: '500'
                }}>
                    {title}
                </span>
                {icon && (
                    <i className={icon} style={{ 
                        fontSize: '20px', 
                        color: color 
                    }}></i>
                )}
            </div>
            
            <div style={{ 
                fontSize: '32px', 
                fontWeight: '700', 
                color: color,
                marginBottom: '8px',
                lineHeight: '1.2'
            }}>
                {value}
                {unit && (
                    <span style={{ 
                        fontSize: '16px', 
                        fontWeight: '600',
                        marginLeft: '4px',
                        color: 'var(--gray-70)'
                    }}>
                        {unit}
                    </span>
                )}
            </div>
            
            {trend && (
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px',
                    fontSize: '13px',
                    color: trend === 'up' ? 'var(--success-50)' : 'var(--error-50)'
                }}>
                    <i className={trend === 'up' ? 'fas fa-arrow-up' : 'fas fa-arrow-down'}></i>
                    <span>{trendValue}</span>
                    <span style={{ color: 'var(--gray-50)' }}>전월 대비</span>
                </div>
            )}
        </div>
    );
}

// Export for use in other components
window.StatCard = StatCard;
