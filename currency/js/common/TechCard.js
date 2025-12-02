const TechCard = ({ icon, title, specs, color = "blue" }) => {
    const colorClasses = {
        blue: 'border-blue-500 bg-blue-50',
        green: 'border-green-500 bg-green-50',
        purple: 'border-purple-500 bg-purple-50',
        amber: 'border-amber-500 bg-amber-50'
    };
    const iconColorClasses = {
        blue: 'text-blue-600 bg-blue-100',
        green: 'text-green-600 bg-green-100',
        purple: 'text-purple-600 bg-purple-100',
        amber: 'text-amber-600 bg-amber-100'
    };
    return (
        <div className={`${colorClasses[color]} border-l-4 rounded-lg p-6 transition-all hover:shadow-md`}>
            <div className="flex items-start gap-4">
                <div className={`${iconColorClasses[color]} w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <i className={`fas fa-${icon} text-2xl`}></i>
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
                    <div className="space-y-2">
                        {specs.map((spec, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <i className="fas fa-check-circle text-green-600 mt-1 flex-shrink-0"></i>
                                <div className="flex-1">
                                    <span className="text-sm font-medium text-gray-700">{spec.label}:</span>
                                    <span className="text-sm text-gray-600 ml-2">{spec.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
window.TechCard = TechCard;
