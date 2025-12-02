function FeatureCard({ icon, title, description, details, benefits, technologies }) {
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            {/* Card Header - Always Visible */}
            <div 
                className="p-6 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-sec-blue to-sec-blue-light flex items-center justify-center flex-shrink-0">
                            <i className={`fas ${icon} text-white text-xl`}></i>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                        </div>
                    </div>
                    <button className="ml-4 w-8 h-8 flex items-center justify-center text-sec-blue hover:bg-blue-50 rounded-lg transition-colors">
                        <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} transition-transform duration-300`}></i>
                    </button>
                </div>
            </div>

            {/* Expanded Content - Accordion */}
            {isExpanded && (
                <div className="px-6 pb-6 animate-slideDown">
                    <div className="pt-4 border-t border-gray-200">
                        {/* Details Section */}
                        {details && details.length > 0 && (
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <i className="fas fa-info-circle text-sec-blue"></i>
                                    상세 기능
                                </h4>
                                <ul className="space-y-2">
                                    {details.map((detail, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                            <i className="fas fa-check-circle text-sec-green mt-0.5"></i>
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Benefits Section */}
                        {benefits && benefits.length > 0 && (
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <i className="fas fa-chart-line text-sec-green"></i>
                                    기대 효과
                                </h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {benefits.map((benefit, idx) => (
                                        <div key={idx} className="bg-green-50 rounded-lg p-3">
                                            <div className="flex items-center gap-2">
                                                <i className="fas fa-arrow-trend-up text-sec-green"></i>
                                                <span className="text-sm font-medium text-gray-800">{benefit}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Technologies Section */}
                        {technologies && technologies.length > 0 && (
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <i className="fas fa-microchip text-sec-blue"></i>
                                    핵심 기술
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {technologies.map((tech, idx) => (
                                        <span 
                                            key={idx}
                                            className="px-3 py-1 bg-blue-50 text-sec-blue text-xs font-medium rounded-full border border-blue-200"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
