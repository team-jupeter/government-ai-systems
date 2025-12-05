const StatCard = ({ title, value, subtitle, icon, color = 'blue' }) => {
    const colorClasses = {
        blue: 'border-blue-500 bg-blue-50',
        purple: 'border-purple-500 bg-purple-50',
        green: 'border-green-500 bg-green-50',
        orange: 'border-orange-500 bg-orange-50',
        red: 'border-red-500 bg-red-50',
        gray: 'border-gray-500 bg-gray-50'
    };
    
    return (
        <div className={`${colorClasses[color]} border-l-4 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    {subtitle && (
                        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
                    )}
                </div>
                <div className="text-3xl ml-2">{icon}</div>
            </div>
        </div>
    );
};

window.StatCard = StatCard;
