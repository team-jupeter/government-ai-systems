function FeatureCard({ icon, title, description, details, expanded, onToggle }) {
    return (
        <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden feature-card">
            {/* 카드 헤더 - 클릭 가능 */}
            <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={onToggle}
            >
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 bg-gradient-to-br from-exchange-blue to-exchange-blue-light rounded-lg text-white">
                            <i className={`fas ${icon} text-2xl`}></i>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                            <p className="text-gray-600 leading-relaxed">{description}</p>
                        </div>
                    </div>
                    <button className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <i className={`fas fa-chevron-${expanded ? 'up' : 'down'} text-gray-400`}></i>
                    </button>
                </div>
            </div>

            {/* 아코디언 상세 내용 */}
            <div className={`accordion-content ${expanded ? 'open' : ''}`}>
                <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="pt-6 space-y-4">
                        {details && details.map((detail, index) => (
                            <div key={index} className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 bg-exchange-blue text-white rounded-full flex items-center justify-center text-sm font-bold">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-900 mb-1">{detail.subtitle}</div>
                                    <div className="text-gray-600 text-sm leading-relaxed">{detail.content}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

window.FeatureCard = FeatureCard;
