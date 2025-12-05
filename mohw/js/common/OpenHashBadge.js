const OpenHashBadge = ({ type = 'verified' }) => {
    if (type === 'verified') {
        return (
            <span className="openhash-badge">
                <span className="mr-1">✓</span>
                오픈해시 검증됨
            </span>
        );
    } else if (type === 'classified') {
        return (
            <span className="classified-badge">
                <span className="mr-1">🔒</span>
                기밀
            </span>
        );
    }
    return null;
};

window.OpenHashBadge = OpenHashBadge;
