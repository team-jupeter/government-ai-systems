const Header = () => {
    return (
        <header className="bg-black bg-opacity-30 backdrop-blur-lg p-4 md:p-6 border-b border-cyan-500 border-opacity-30 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/50">
                        ⛓️
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                            OpenHash
                        </h1>
                        <p className="text-xs text-gray-400">차세대 분산 신뢰 기술</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-cyan-400">98.5%</div>
                            <div className="text-xs text-gray-400">에너지 절감</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-cyan-400">1000x</div>
                            <div className="text-xs text-gray-400">처리 속도</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-cyan-400">100%</div>
                            <div className="text-xs text-gray-400">무결성</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
