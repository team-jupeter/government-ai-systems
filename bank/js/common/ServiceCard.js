const ServiceCard = ({ icon, title, description, features, benefits, onClick, isExpanded }) => {
    return (
        <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden transition-all hover:shadow-xl">
            <div 
                className="p-6 cursor-pointer"
                onClick={onClick}
            >
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="text-5xl">{icon}</div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
                            <p className="text-sm text-gray-600">{description}</p>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} text-bank-blue text-xl transition-transform duration-300`}></i>
                    </div>
                </div>
                
                {features && features.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {features.map((feature, idx) => (
                            <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium">
                                {feature}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            
            <div className={`accordion-content ${isExpanded ? 'open' : ''}`}>
                {isExpanded && benefits && (
                    <div className="px-6 pb-6 pt-2 border-t border-gray-100 bg-gray-50">
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <i className="fas fa-check-circle text-green-500 text-lg mt-1"></i>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">{benefit.title}</h4>
                                        <p className="text-sm text-gray-600">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
