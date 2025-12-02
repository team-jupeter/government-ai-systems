const StatCard = ({ icon, title, value, unit, color = "blue", trend, description }) => {
    const colorClasses = {
        blue: 'bg-blue-500/10 text-blue-600 border-blue-200',
        green: 'bg-green-500/10 text-green-600 border-green-200',
        purple: 'bg-purple-500/10 text-purple-600 border-purple-200',
        amber: 'bg-amber-500/10 text-amber-600 border-amber-200',
        red: 'bg-red-500/10 text-red-600 border-red-200'
    };
    return (
        <div className={`${colorClasses[color]} border-2 rounded-lg p-6 transition-all hover:shadow-lg`}>
            <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
                    <i className={`fas fa-${icon} text-xl`}></i>
                </div>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">{value}</span>
                {unit && <span className="text-lg text-gray-500">{unit}</span>}
            </div>
            {description && <p className="text-xs text-gray-500 mt-2">{description}</p>}
        </div>
    );
};
window.StatCard = StatCard;
