const Header = () => {
    return (
        <header className="gradient-bg text-gray-900 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center pulse-gov24">
                            <i className="fas fa-university text-2xl"></i>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">AI 통합대학</h1>
                            <p className="text-sm text-gray-900/90">OpenHash University</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                            <i className="fas fa-user-circle text-xl"></i>
                            <span className="font-medium">학생 님</span>
                        </div>
                        <button className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors">
                            <i className="fas fa-bell text-xl"></i>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
