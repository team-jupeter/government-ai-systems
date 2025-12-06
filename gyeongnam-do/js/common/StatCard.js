const StatCard = ({ title, value, icon }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-600 text-sm">{title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
            </div>
            {icon && <span className="text-4xl">{icon}</span>}
        </div>
    </div>
);
