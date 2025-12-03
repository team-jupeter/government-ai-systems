function StatCard({ icon, title, value, unit, color = 'blue', trend }) {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600 border-blue-200',
        green: 'bg-green-50 text-green-600 border-green-200',
        red: 'bg-red-50 text-red-600 border-red-200',
        yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
        purple: 'bg-purple-50 text-purple-600 border-purple-200'
    };

    return (
        <div className={`${colorClasses[color]} border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300`}>
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${color === 'blue' ? 'bg-blue-100' : color === 'green' ? 'bg-green-100' : color === 'red' ? 'bg-red-100' : color === 'yellow' ? 'bg-yellow-100' : 'bg-purple-100'}`}>
                    <i className={`fas ${icon} text-2xl`}></i>
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-sm font-semibold ${trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        <i className={`fas fa-arrow-${trend.direction}`}></i>
                        <span>{trend.value}</span>
                    </div>
                )}
            </div>
            <div className="text-sm font-medium opacity-75 mb-2">{title}</div>
            <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold">{value}</div>
                {unit && <div className="text-lg font-medium opacity-75">{unit}</div>}
            </div>
        </div>
    );
}

window.StatCard = StatCard;
