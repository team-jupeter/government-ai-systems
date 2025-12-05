// ============================================
// ServiceCard 컴포넌트
// 서비스 기능 표시 카드
// ============================================

function ServiceCard({ icon, title, description, items, badge, onClick, expanded }) {
    const [isExpanded, setIsExpanded] = React.useState(expanded || false);

    const handleToggle = () => {
        if (onClick) {
            onClick();
        } else {
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div className="card" style={{ cursor: items ? 'pointer' : 'default' }} onClick={items ? handleToggle : null}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ fontSize: '40px' }}>{icon}</div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--gray-90)' }}>
                            {title}
                        </h3>
                        {badge && (
                            <span style={{
                                padding: '4px 12px',
                                background: 'var(--primary-50)',
                                color: 'white',
                                borderRadius: '12px',
                                fontSize: '12px',
                                fontWeight: '600'
                            }}>
                                {badge}
                            </span>
                        )}
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--gray-70)', lineHeight: '1.6', marginBottom: '12px' }}>
                        {description}
                    </p>
                    {items && (
                        <div>
                            <div style={{ 
                                fontSize: '13px', 
                                color: 'var(--primary-50)', 
                                fontWeight: '600',
                                marginTop: '12px'
                            }}>
                                <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
                                {' '}{isExpanded ? '접기' : '자세히 보기'}
                            </div>
                            {isExpanded && (
                                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--gray-20)' }}>
                                    {items.map((item, idx) => (
                                        <div key={idx} style={{ 
                                            display: 'flex', 
                                            alignItems: 'flex-start', 
                                            gap: '8px',
                                            marginBottom: '12px'
                                        }}>
                                            <i className="fas fa-check-circle" style={{ 
                                                color: 'var(--success-50)', 
                                                marginTop: '2px',
                                                fontSize: '14px'
                                            }}></i>
                                            <span style={{ fontSize: '13px', color: 'var(--gray-70)', lineHeight: '1.5' }}>
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

window.ServiceCard = ServiceCard;
