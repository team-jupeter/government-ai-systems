function StatCard({ icon, title, value, unit, trend, description, color = 'sec-blue' }) {
    const colorClasses = {
        'sec-blue': 'from-sec-blue to-sec-blue-light',
        'sec-green': 'from-green-600 to-green-500',
        'sec-red': 'from-red-600 to-red-500',
        'sec-gold': 'from-yellow-600 to-yellow-500'
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}>
                    <i className={`fas ${icon} text-white text-2xl`}></i>
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-sm font-semibold ${
                        trend > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                        <i className={`fas fa-arrow-${trend > 0 ? 'up' : 'down'}`}></i>
                        <span>{Math.abs(trend)}%</span>
                    </div>
                )}
            </div>
            <div className="mb-2">
                <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">{value}</span>
                    {unit && <span className="text-lg text-gray-500">{unit}</span>}
                </div>
            </div>
            {description && (
                <p className="text-sm text-gray-500 mt-2">{description}</p>
            )}
        </div>
    );
}
