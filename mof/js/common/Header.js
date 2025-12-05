const Header = () => {
    return (
        <header className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">MOF</span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">해양수산부</h1>
                            <p className="text-sm text-gray-600">Ministry of Oceans and Fisheries</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-600">DeepSeek R1 + OpenHash 기반</div>
                        <div className="text-lg font-semibold text-teal-600">AI 자동화율 98.5%</div>
                    </div>
                </div>
            </div>
        </header>
    );
};
