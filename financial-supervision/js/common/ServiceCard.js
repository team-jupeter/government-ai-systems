// ============================================
// 서비스 카드 컴포넌트
// 금융감독 기능 카드
// ============================================

function ServiceCard({ 
    icon, 
    title, 
    description, 
    items = [], 
    badge,
    onClick,
    expanded = false 
}) {
    const [isExpanded, setIsExpanded] = React.useState(expanded);

    return (
        <div className="card" style={{ cursor: items.length > 0 ? 'pointer' : 'default' }}
             onClick={() => items.length > 0 && setIsExpanded(!isExpanded)}>
            
            {/* 카드 아이콘 */}
            <div style={{ 
                fontSize: '40px', 
                marginBottom: '16px',
                color: 'var(--primary-50)'
            }}>
                {icon}
            </div>
            
            {/* 카드 제목 */}
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '12px'
            }}>
                <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600',
                    color: 'var(--gray-90)'
                }}>
                    {title}
                </h3>
                
                {badge && (
                    <span style={{
                        background: 'var(--primary-5)',
                        color: 'var(--primary-50)',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600'
                    }}>
                        {badge}
                    </span>
                )}
            </div>
            
            {/* 카드 설명 */}
            <p style={{ 
                fontSize: '14px', 
                color: 'var(--gray-70)',
                lineHeight: '1.6',
                marginBottom: items.length > 0 ? '12px' : '0'
            }}>
                {description}
            </p>
            
            {/* 확장 가능한 아이템 목록 */}
            {items.length > 0 && (
                <>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px',
                        color: 'var(--primary-50)',
                        fontWeight: '500',
                        marginTop: '12px',
                        paddingTop: '12px',
                        borderTop: '1px solid var(--gray-20)'
                    }}>
                        <span>세부 항목 {items.length}개</span>
                        <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
                    </div>
                    
                    {isExpanded && (
                        <div style={{
                            marginTop: '16px',
                            paddingTop: '16px',
                            borderTop: '2px solid var(--primary-50)',
                            animation: 'fadeIn 0.3s ease-in'
                        }}>
                            <ul style={{ 
                                listStyle: 'none', 
                                padding: 0,
                                margin: 0
                            }}>
                                {items.map((item, index) => (
                                    <li key={index} style={{
                                        padding: '8px 0',
                                        fontSize: '14px',
                                        color: 'var(--gray-90)',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '8px'
                                    }}>
                                        <i className="fas fa-check-circle" style={{ 
                                            color: 'var(--success-50)',
                                            marginTop: '2px',
                                            fontSize: '16px'
                                        }}></i>
                                        <span style={{ flex: 1 }}>
                                            <strong style={{ fontWeight: '600' }}>{item.title}:</strong>
                                            {' '}
                                            <span style={{ color: 'var(--gray-70)' }}>{item.desc}</span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

// Export for use in other components
window.ServiceCard = ServiceCard;
