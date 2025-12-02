const StatCard = ({ icon, title, value, subtitle, trend, color = 'blue' }) => {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-700 border-blue-200',
        green: 'bg-green-50 text-green-700 border-green-200',
        purple: 'bg-purple-50 text-purple-700 border-purple-200',
        orange: 'bg-orange-50 text-orange-700 border-orange-200',
        red: 'bg-red-50 text-red-700 border-red-200',
        indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    };

    return (
        <div className={`${colorClasses[color]} border-2 rounded-xl p-6 transition-all hover:shadow-lg`}>
            <div className="flex items-center justify-between mb-3">
                <span className="text-4xl">{icon}</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">{title}</h3>
            <p className="text-3xl font-bold mb-1">{value}</p>
            {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
            {trend && (
                <div className="mt-3 flex items-center gap-1 text-xs">
                    <i className={`fas fa-arrow-${trend > 0 ? 'up' : 'down'} ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}></i>
                    <span className={trend > 0 ? 'text-green-600' : 'text-red-600'}>
                        {Math.abs(trend)}% {trend > 0 ? '증가' : '감소'}
                    </span>
                </div>
            )}
        </div>
    );
};
