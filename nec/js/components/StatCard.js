const StatCard = ({ title, value, subtitle, icon, color }) => {
    const colorClasses = {
        blue: 'from-blue-500 to-blue-600',
        purple: 'from-purple-500 to-purple-600',
        green: 'from-green-500 to-green-600',
        orange: 'from-orange-500 to-orange-600',
        red: 'from-red-500 to-red-600',
        indigo: 'from-indigo-500 to-indigo-600'
    };
    
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
                    <p className="text-sm text-gray-500">{subtitle}</p>
                </div>
                <div className={`text-4xl p-3 bg-gradient-to-br ${colorClasses[color] || colorClasses.blue} rounded-lg text-white`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

window.StatCard = StatCard;
